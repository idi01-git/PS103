import os
import time
import json
import datetime
import warnings
import numpy as np
import pandas as pd
import shap
from sklearn.model_selection import StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import average_precision_score, roc_auc_score
from sklearn.linear_model import LogisticRegression, Ridge
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from xgboost import XGBClassifier, XGBRegressor
from catboost import CatBoostClassifier, CatBoostRegressor
from lightgbm import LGBMClassifier, LGBMRegressor
from sklearn.isotonic import IsotonicRegression
from scipy.special import logit

warnings.filterwarnings("ignore")

def instantiate_clf(family, params):
    if family == "logistic":
        return LogisticRegression(**params, max_iter=1000, random_state=42)
    elif family == "random_forest":
        return RandomForestClassifier(**params, random_state=42, n_jobs=-1)
    elif family == "xgboost":
        return XGBClassifier(**params, random_state=42, n_jobs=-1, eval_metric="logloss")
    elif family == "catboost":
        return CatBoostClassifier(**params, random_seed=42, verbose=0, thread_count=-1)
    elif family == "lightgbm":
        return LGBMClassifier(**params, random_state=42, n_jobs=-1, verbose=-1)
    else:
        raise ValueError(f"Unknown classifier family: {family}")

def instantiate_reg(family, params):
    if family == "ridge":
        return Ridge(**params, random_state=42)
    elif family == "random_forest":
        return RandomForestRegressor(**params, random_state=42, n_jobs=-1)
    elif family == "xgboost":
        return XGBRegressor(**params, random_state=42, n_jobs=-1)
    elif family == "catboost":
        return CatBoostRegressor(**params, random_seed=42, verbose=0, thread_count=-1)
    elif family == "lightgbm":
        return LGBMRegressor(**params, random_state=42, n_jobs=-1, verbose=-1)
    else:
        raise ValueError(f"Unknown regressor family: {family}")

def get_action_recommendation(top_factor_name, documented_issue):
    action_map = {
        "land_acquisition_issue": "Special Land Acquisition Officer (SLAO) escalation & district administration coordination for private/revenue land notification.",
        "forest_clearance_issue": "MoEFCC / Regional Empowered Committee Stage-I & Stage-II clearance escalation; Parivesh portal tracking.",
        "environment_clearance_issue": "State Pollution Control Board (SPCB) public hearing & Environmental Impact Assessment (EIA) compliance review.",
        "contractor_issue": "Contractor cash flow & machinery audit; invocation of milestone penalties or mobilization support.",
        "slow_progress_issue": "Formulation of detailed catch-up recovery schedule; workforce remobilization and multi-shift operations.",
        "funding_issue": "Budget outlay reallocation; sanction of revised cost estimates (RCE) by Standing Finance Committee (SFC).",
        "utility_shifting_issue": "Joint inter-agency inspection with State DISCOM / municipal authority for water pipeline & power line shifting.",
        "tender_issue": "Expedited re-tendering / RFP restructuring; easing restrictive qualification criteria to boost vendor participation.",
        "work_on_hold_issue": "Dispute resolution board (DRB) activation; local administration mediation on site access.",
        "law_order_issue": "State Home Department coordination; site security deployment.",
        "geological_issue": "Geotechnical investigation review; specialized rock stabilization & tunneling consultancy.",
        "covid_issue": "Contractual time-extension audit without financial liability."
    }
    
    # Check if documented issue matches
    if documented_issue in action_map:
        return action_map[documented_issue]
        
    # Check top contributing factor name
    for k, act in action_map.items():
        if k in top_factor_name.lower():
            return act
            
    if "slip" in top_factor_name.lower() or "delay" in top_factor_name.lower():
        return "Schedule acceleration recovery plan; critical path review and resource re-allocation."
    elif "cost" in top_factor_name.lower() or "expenditure" in top_factor_name.lower():
        return "Financial audit on item-rate escalation; strict expenditure milestone oversight."
    else:
        return "Project trajectory monitoring escalation: physical progress verification audit recommended based on observed dynamics."

def main():
    bundle_root = "data_bundle/SIH26103_project_data_bundle_v3_2_cost_corrected"
    feat_dir = f"{bundle_root}/06_feature_selection"
    out_dir = "outputs/08_production_inference"
    os.makedirs(out_dir, exist_ok=True)
    
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    model_version = "v3.2.1-optimized-production"
    
    print("=" * 80)
    print(f"STARTING STEP 8 PRODUCTION INFERENCE PIPELINE ({model_version})")
    print("=" * 80)
    
    # 1. Load Clean Snapshots to identify each project's latest snapshot
    cs_cols = ["project_id", "snapshot_date", "project_name", "agency", "state", "original_cost", "anticipated_cost", "cost_overrun_original_pct", "time_overrun_original_months", "physical_progress"]
    cs = pd.read_csv(f"{bundle_root}/02_cost_correction/SIH26103_clean_snapshots_cost_corrected_v3_2.csv", usecols=cs_cols)
    latest_idx = cs.groupby("project_id")["snapshot_date"].idxmax()
    latest_cs = cs.loc[latest_idx].copy()
    total_projects = len(latest_cs)
    print(f"Identified latest available snapshots for {total_projects} projects (Date range: {latest_cs['snapshot_date'].min()} to {latest_cs['snapshot_date'].max()})")
    
    # 2. Load Documentary Evidence
    ev = pd.read_csv(f"{bundle_root}/01_issue_integrated/SIH26103_issue_evidence_v3_conservative.csv")
    print(f"Loaded {len(ev)} verified PAIMANA issue evidence records across {ev['project_id'].nunique()} projects.")
    
    # Build fast lookup for evidence by (project_id, snapshot_date) or project_id
    evidence_lookup = {}
    for _, row in ev.iterrows():
        p_id = row["project_id"]
        s_date = str(row["snapshot_date"])
        issue = str(row["issue"])
        txt = str(row["evidence_text"])
        src = str(row["source_file"])
        page = str(row["source_page"])
        
        entry = {
            "issue": issue,
            "evidence_text": txt,
            "source_file": src,
            "source_page": page,
            "snapshot_date": s_date
        }
        
        # Key by (project_id, snapshot_date)
        k_exact = (p_id, s_date)
        if k_exact not in evidence_lookup:
            evidence_lookup[k_exact] = []
        evidence_lookup[k_exact].append(entry)
        
        # Key by project_id for latest fallback
        if p_id not in evidence_lookup:
            evidence_lookup[p_id] = []
        evidence_lookup[p_id].append(entry)

    # 3. Load Frozen Model Decisions
    df_froz_clf = pd.read_csv("outputs/07_5_optimization/final_frozen_classification_decisions.csv")
    df_froz_mag = pd.read_csv("outputs/07_5_optimization/final_frozen_magnitude_decisions.csv")
    df_fam_best = pd.read_csv("outputs/07_5_optimization/best_classification_by_family.csv")
    
    horizons = ["3m", "6m", "12m", "15m", "18m"]
    
    # Master dictionary to store project inference records
    # project_id -> dict of properties
    project_records = {}
    for _, row in latest_cs.iterrows():
        pid = row["project_id"]
        project_records[pid] = {
            "project_id": pid,
            "snapshot_date": row["snapshot_date"],
            "project_name": str(row["project_name"]),
            "agency": str(row["agency"]),
            "state": str(row["state"]),
            "original_cost": float(row["original_cost"]) if pd.notnull(row["original_cost"]) else 0.0,
            "anticipated_cost": float(row["anticipated_cost"]) if pd.notnull(row["anticipated_cost"]) else 0.0,
            "cost_overrun_pct_current": float(row["cost_overrun_original_pct"]) if pd.notnull(row["cost_overrun_original_pct"]) else 0.0,
            "delay_months_current": float(row["time_overrun_original_months"]) if pd.notnull(row["time_overrun_original_months"]) else 0.0,
            "physical_progress": float(row["physical_progress"]) if pd.notnull(row["physical_progress"]) else 0.0,
            "prediction_status": "AVAILABLE",
            "model_version": model_version,
            "prediction_timestamp": timestamp
        }

    # Store detailed SHAP entries
    shap_records = []
    
    # Process each horizon
    for h in horizons:
        print(f"\nProcessing Horizon {h.upper()} inference across {total_projects} projects...")
        tr = pd.read_csv(f"{feat_dir}/train_{h}_selected.csv")
        va = pd.read_csv(f"{feat_dir}/validation_{h}_selected.csv")
        inf = pd.read_csv(f"{feat_dir}/inference_only_{h}_selected.csv")
        
        target_cols = [f"{t}_{h}" for t in ["combined_deterioration", "schedule_deterioration", "cost_deterioration", "additional_delay_months", "cost_increase_pct"]]
        non_feature_cols = ["project_id", "snapshot_date"] + target_cols
        feature_cols = [c for c in tr.columns if c not in non_feature_cols]
        
        # Merge inference rows with latest_cs to extract exactly the latest snapshot row per project
        inf_latest = pd.merge(latest_cs[["project_id", "snapshot_date"]], inf, on=["project_id", "snapshot_date"], how="inner")
        
        # Ensure project ordering is consistent
        inf_latest = inf_latest.sort_values("project_id").reset_index(drop=True)
        pids = inf_latest["project_id"].values
        X_inf = inf_latest[feature_cols].values
        
        # Fit classification models for each target
        clf_preds = {}
        clf_models = {}
        for t_base in ["combined_deterioration", "schedule_deterioration", "cost_deterioration"]:
            target_col = f"{t_base}_{h}"
            row_clf = df_froz_clf[(df_froz_clf["horizon"] == h) & (df_froz_clf["target"] == t_base)].iloc[0]
            sel_model = row_clf["selected_model"]
            cal_method = row_clf["selected_calibration"]
            
            mask_tr = tr[target_col].notnull().values
            X_tr = tr.loc[mask_tr, feature_cols].values
            y_tr = tr.loc[mask_tr, target_col].values.astype(int)
            
            scaler = StandardScaler()
            X_tr_sc = scaler.fit_transform(X_tr)
            X_inf_sc = scaler.transform(X_inf)
            
            if "ensemble" in sel_model:
                tree_fams = ["random_forest", "xgboost", "catboost", "lightgbm"]
                ens_preds_list = []
                fitted_ens_clfs = {}
                for fam in tree_fams:
                    p_str = df_fam_best[(df_fam_best["horizon"] == h) & (df_fam_best["target"] == t_base) & (df_fam_best["model_family"] == fam)].iloc[0]["params"]
                    clf = instantiate_clf(fam, json.loads(p_str))
                    clf.fit(X_tr, y_tr)
                    fitted_ens_clfs[fam] = clf
                    ens_preds_list.append(clf.predict_proba(X_inf)[:, 1])
                    
                # Validation weights
                va_mask = va[target_col].notnull().values
                X_va_t = va.loc[va_mask, feature_cols].values
                y_va_t = va.loc[va_mask, target_col].values.astype(int)
                w_list = [max(0, average_precision_score(y_va_t, fitted_ens_clfs[f].predict_proba(X_va_t)[:, 1])) for f in tree_fams]
                weights = np.array(w_list) / sum(w_list)
                raw_prob = np.sum([weights[i] * ens_preds_list[i] for i in range(len(tree_fams))], axis=0)
                clf_models[t_base] = fitted_ens_clfs[tree_fams[0]] # primary tree for shap
            else:
                fam = row_clf["selected_model_family"]
                params = json.loads(row_clf["selected_params"])
                clf = instantiate_clf(fam, params)
                if fam == "logistic":
                    clf.fit(X_tr_sc, y_tr)
                    raw_prob = clf.predict_proba(X_inf_sc)[:, 1]
                else:
                    clf.fit(X_tr, y_tr)
                    raw_prob = clf.predict_proba(X_inf)[:, 1]
                clf_models[t_base] = clf
                
            # Calibration
            if cal_method == "platt_sigmoid":
                # Compute OOF to fit Platt
                skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
                oof_p = np.zeros(len(y_tr))
                for tr_idx, fo_idx in skf.split(X_tr, y_tr):
                    fam = row_clf["selected_model_family"] if "ensemble" not in sel_model else "xgboost"
                    p_str = row_clf["selected_params"] if "ensemble" not in sel_model else df_fam_best[(df_fam_best["horizon"] == h) & (df_fam_best["target"] == t_base) & (df_fam_best["model_family"] == fam)].iloc[0]["params"]
                    clf_f = instantiate_clf(fam, json.loads(p_str))
                    clf_f.fit(X_tr[tr_idx], y_tr[tr_idx])
                    oof_p[fo_idx] = clf_f.predict_proba(X_tr[fo_idx])[:, 1]
                platt = LogisticRegression(C=1.0, solver="lbfgs", random_state=42)
                platt.fit(logit(np.clip(oof_p, 1e-6, 1 - 1e-6)).reshape(-1, 1), y_tr)
                final_prob = platt.predict_proba(logit(np.clip(raw_prob, 1e-6, 1 - 1e-6)).reshape(-1, 1))[:, 1]
            elif cal_method == "isotonic":
                skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
                oof_p = np.zeros(len(y_tr))
                for tr_idx, fo_idx in skf.split(X_tr, y_tr):
                    fam = row_clf["selected_model_family"]
                    clf_f = instantiate_clf(fam, json.loads(row_clf["selected_params"]))
                    clf_f.fit(X_tr[tr_idx], y_tr[tr_idx])
                    oof_p[fo_idx] = clf_f.predict_proba(X_tr[fo_idx])[:, 1]
                iso = IsotonicRegression(out_of_bounds="clip")
                iso.fit(oof_p, y_tr)
                final_prob = iso.predict(raw_prob)
            else:
                final_prob = raw_prob
                
            clf_preds[t_base] = final_prob

        # Fit magnitude models
        mag_preds = {}
        for mag_base in ["additional_delay_months", "cost_increase_pct"]:
            mag_col = f"{mag_base}_{h}"
            row_mag = df_froz_mag[(df_froz_mag["horizon"] == h) & (df_froz_mag["target"] == mag_base)].iloc[0]
            fam = row_mag["model_family"]
            params = json.loads(row_mag["params"])
            trans = row_mag["transform"]
            arch = row_mag["architecture"]
            
            mask_tr = tr[mag_col].notnull().values
            X_tr = tr.loc[mask_tr, feature_cols].values
            y_tr = tr.loc[mask_tr, mag_col].values.astype(float)
            
            scaler = StandardScaler()
            X_tr_sc = scaler.fit_transform(X_tr)
            X_inf_sc = scaler.transform(X_inf)
            
            reg = instantiate_reg(fam, params)
            if arch == "direct":
                y_tr_fit = np.log1p(np.maximum(0.0, y_tr)) if trans == "log1p" else y_tr
                if fam == "ridge":
                    reg.fit(X_tr_sc, y_tr_fit)
                    pred_raw = reg.predict(X_inf_sc)
                else:
                    reg.fit(X_tr, y_tr_fit)
                    pred_raw = reg.predict(X_inf)
                pred_uncond = np.expm1(np.maximum(0.0, pred_raw)) if trans == "log1p" else np.maximum(0.0, pred_raw)
            else:
                pos_mask_tr = y_tr > 0
                y_tr_pos = y_tr[pos_mask_tr]
                X_tr_pos = X_tr[pos_mask_tr]
                y_tr_pos_fit = np.log1p(np.maximum(0.0, y_tr_pos)) if trans == "log1p" else y_tr_pos
                reg.fit(X_tr_pos, y_tr_pos_fit)
                pred_cond = np.expm1(np.maximum(0.0, reg.predict(X_inf))) if trans == "log1p" else np.maximum(0.0, reg.predict(X_inf))
                
                # Corresponding probability of deterioration
                prob_det = clf_preds["schedule_deterioration"] if "delay" in mag_base else clf_preds["cost_deterioration"]
                pred_uncond = prob_det * pred_cond
                
            mag_preds[mag_base] = np.maximum(0.0, pred_uncond)

        # Compute SHAP for the Combined Deterioration model on this horizon
        primary_model = clf_models["combined_deterioration"]
        explainer = shap.TreeExplainer(primary_model)
        shap_values = explainer.shap_values(X_inf)
        if isinstance(shap_values, list) and len(shap_values) == 2:
            shap_values = shap_values[1] # positive class
            
        # Store predictions per project for this horizon
        for idx in range(len(pids)):
            pid = pids[idx]
            comb_p = float(np.clip(clf_preds["combined_deterioration"][idx], 0.0, 1.0))
            sched_p = float(np.clip(clf_preds["schedule_deterioration"][idx], 0.0, 1.0))
            cost_p = float(np.clip(clf_preds["cost_deterioration"][idx], 0.0, 1.0))
            
            # Formulate Calibrated Risk Score from 0 to 100
            # Primary risk score is calibrated combined deterioration probability scaled to 0-100
            risk_score = round(comb_p * 100.0, 1)
            risk_band = "High" if risk_score >= 65.0 else ("Medium" if risk_score >= 30.0 else "Low")
            
            delay_pred = round(float(mag_preds["additional_delay_months"][idx]), 1)
            cost_inc_pred = round(float(mag_preds["cost_increase_pct"][idx]), 2)
            
            project_records[pid][f"combined_prob_{h}"] = round(comb_p, 4)
            project_records[pid][f"schedule_prob_{h}"] = round(sched_p, 4)
            project_records[pid][f"cost_prob_{h}"] = round(cost_p, 4)
            project_records[pid][f"risk_score_{h}"] = risk_score
            project_records[pid][f"risk_band_{h}"] = risk_band
            project_records[pid][f"predicted_delay_months_{h}"] = delay_pred
            project_records[pid][f"predicted_cost_increase_pct_{h}"] = cost_inc_pred
            project_records[pid][f"model_name_{h}"] = df_froz_clf[(df_froz_clf["horizon"] == h) & (df_froz_clf["target"] == "combined_deterioration")].iloc[0]["selected_model"]

            # Extract SHAP top 5 positive and negative contributors
            proj_shap = shap_values[idx]
            proj_feat_vals = X_inf[idx]
            
            pos_indices = np.where(proj_shap > 0)[0]
            pos_sorted = pos_indices[np.argsort(-proj_shap[pos_indices])][:5]
            
            neg_indices = np.where(proj_shap < 0)[0]
            neg_sorted = neg_indices[np.argsort(proj_shap[neg_indices])][:5]
            
            top_pos_factors = []
            for fi in pos_sorted:
                top_pos_factors.append({
                    "feature": feature_cols[fi],
                    "shap_value": round(float(proj_shap[fi]), 4),
                    "feature_value": round(float(proj_feat_vals[fi]), 2),
                    "direction": "contributes toward higher predicted risk"
                })
                
            top_neg_factors = []
            for fi in neg_sorted:
                top_neg_factors.append({
                    "feature": feature_cols[fi],
                    "shap_value": round(float(proj_shap[fi]), 4),
                    "feature_value": round(float(proj_feat_vals[fi]), 2),
                    "direction": "contributes toward lower predicted risk"
                })
                
            # If horizon is 3M (primary near-term operational alert) or 6M, attach top factors to master record
            if h == "3m":
                project_records[pid]["top_positive_factors_3m"] = top_pos_factors
                project_records[pid]["top_negative_factors_3m"] = top_neg_factors
                
                # Link Evidence
                s_date = project_records[pid]["snapshot_date"]
                ev_list = evidence_lookup.get((pid, s_date), evidence_lookup.get(pid, []))
                
                if len(ev_list) > 0:
                    primary_ev = ev_list[0]
                    doc_evidence_text = f"Documented in official report {primary_ev['source_file']} (p. {primary_ev['source_page']}): \"{primary_ev['evidence_text'][:250]}...\""
                    doc_issue_type = primary_ev["issue"]
                else:
                    doc_evidence_text = "No direct documentary evidence was found for this factor in the available records."
                    doc_issue_type = "None"
                    
                top_feat_name = top_pos_factors[0]["feature"] if len(top_pos_factors) > 0 else ""
                action_rec = get_action_recommendation(top_feat_name, doc_issue_type)
                
                project_records[pid]["supporting_evidence"] = doc_evidence_text
                project_records[pid]["documented_issue_type"] = doc_issue_type
                project_records[pid]["recommended_action"] = action_rec
                
                # Flat columns for top 5 factors
                for f_rank in range(5):
                    if f_rank < len(top_pos_factors):
                        project_records[pid][f"top_factor_{f_rank+1}"] = top_pos_factors[f_rank]["feature"]
                        project_records[pid][f"top_factor_{f_rank+1}_shap"] = top_pos_factors[f_rank]["shap_value"]
                        project_records[pid][f"top_factor_{f_rank+1}_val"] = top_pos_factors[f_rank]["feature_value"]
                    else:
                        project_records[pid][f"top_factor_{f_rank+1}"] = ""
                        project_records[pid][f"top_factor_{f_rank+1}_shap"] = 0.0
                        project_records[pid][f"top_factor_{f_rank+1}_val"] = 0.0

    # 4. Save Master Outputs
    df_master = pd.DataFrame(list(project_records.values()))
    
    # Clean JSON serialization helper
    def convert_for_json(obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        elif isinstance(obj, (np.float32, np.float64)):
            return float(obj)
        elif isinstance(obj, (np.int32, np.int64)):
            return int(obj)
        elif isinstance(obj, dict):
            return {k: convert_for_json(v) for k, v in obj.items()}
        elif isinstance(obj, list):
            return [convert_for_json(v) for v in obj]
        return obj

    master_dict_list = [convert_for_json(v) for v in project_records.values()]
    
    df_master.to_csv(f"{out_dir}/SIH26103_step8_project_inference_master.csv", index=False)
    with open(f"{out_dir}/SIH26103_step8_project_inference_master.json", "w", encoding="utf-8") as f:
        json.dump(master_dict_list, f, indent=2)
        
    # Also save formatted version for the Website React UI
    web_data_dir = "src/data"
    os.makedirs(web_data_dir, exist_ok=True)
    with open(f"{web_data_dir}/realProjectsInference.json", "w", encoding="utf-8") as f:
        json.dump(master_dict_list, f, indent=2)
        
    print("\n" + "=" * 80)
    print("STEP 8 PRODUCTION INFERENCE PIPELINE COMPLETE!")
    print(f"Total projects processed: {len(df_master)}")
    print(f"Risk Score Distribution (3M):")
    print(df_master["risk_band_3m"].value_counts())
    print(f"Saved master CSV to: {out_dir}/SIH26103_step8_project_inference_master.csv")
    print(f"Saved master JSON to: {out_dir}/SIH26103_step8_project_inference_master.json")
    print(f"Saved React UI dataset to: {web_data_dir}/realProjectsInference.json")
    print("=" * 80)

if __name__ == "__main__":
    main()
