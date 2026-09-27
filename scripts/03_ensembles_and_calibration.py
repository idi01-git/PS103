import os
import time
import json
import warnings
import numpy as np
import pandas as pd
from sklearn.model_selection import StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from catboost import CatBoostClassifier
from lightgbm import LGBMClassifier
from sklearn.isotonic import IsotonicRegression
from scipy.special import expit, logit
from scipy.stats import rankdata
from sklearn.metrics import (
    roc_auc_score, average_precision_score, brier_score_loss, log_loss
)

warnings.filterwarnings("ignore")

def compute_ece(y_true, y_prob, n_bins=10):
    bin_edges = np.linspace(0, 1, n_bins + 1)
    ece = 0.0
    for i in range(n_bins):
        bin_mask = (y_prob >= bin_edges[i]) & (y_prob < bin_edges[i+1] if i < n_bins - 1 else y_prob <= bin_edges[i+1])
        bin_count = np.sum(bin_mask)
        if bin_count > 0:
            bin_acc = np.mean(y_true[bin_mask])
            bin_conf = np.mean(y_prob[bin_mask])
            ece += (bin_count / len(y_true)) * np.abs(bin_acc - bin_conf)
    return ece

def instantiate_model(family, params):
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
        raise ValueError(f"Unknown family: {family}")

def main():
    root = "data_bundle/SIH26103_project_data_bundle_v3_2_cost_corrected/06_feature_selection"
    out_dir = "outputs/07_5_optimization"
    os.makedirs(out_dir, exist_ok=True)
    
    df_family_best = pd.read_csv(f"{out_dir}/best_classification_by_family.csv")
    
    horizons = ["3m", "6m", "12m", "15m", "18m"]
    target_bases = ["combined_deterioration", "schedule_deterioration", "cost_deterioration"]
    
    ensemble_results = []
    calibration_results = []
    frozen_decisions = []
    
    print("=" * 80)
    print("STARTING OUT-OF-FOLD ENSEMBLE & CALIBRATION BENCHMARK")
    print("=" * 80)
    
    for h in horizons:
        print(f"\n==================== HORIZON {h.upper()} ====================")
        tr = pd.read_csv(f"{root}/train_{h}_selected.csv")
        va = pd.read_csv(f"{root}/validation_{h}_selected.csv")
        
        target_cols = [f"{t}_{h}" for t in target_bases] + [f"additional_delay_months_{h}", f"cost_increase_pct_{h}"]
        non_feature_cols = ["project_id", "snapshot_date"] + target_cols
        feature_cols = [c for c in tr.columns if c not in non_feature_cols]
        
        X_tr_all = tr[feature_cols].values
        X_va_all = va[feature_cols].values
        
        for t_base in target_bases:
            target_col = f"{t_base}_{h}"
            
            mask_tr = tr[target_col].notnull().values
            mask_va = va[target_col].notnull().values
            
            X_tr = X_tr_all[mask_tr]
            y_tr = tr.loc[mask_tr, target_col].values.astype(int)
            
            X_va = X_va_all[mask_va]
            y_va = va.loc[mask_va, target_col].values.astype(int)
            
            print(f"\n--- Target: {target_col} | Generating 5-fold OOF for 5 families ---")
            
            # Retrieve best params for each family
            fam_models = {}
            for fam in ["logistic", "random_forest", "xgboost", "catboost", "lightgbm"]:
                sub = df_family_best[(df_family_best["horizon"] == h) & 
                                     (df_family_best["target"] == t_base) & 
                                     (df_family_best["model_family"] == fam)]
                p_str = sub.iloc[0]["params"]
                fam_models[fam] = json.loads(p_str)
            
            # Stratified 5-fold OOF on training set
            skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
            oof_preds = {fam: np.zeros(len(y_tr)) for fam in fam_models}
            
            scaler = StandardScaler()
            X_tr_scaled = scaler.fit_transform(X_tr)
            X_va_scaled = scaler.transform(X_va)
            
            for train_idx, fold_idx in skf.split(X_tr, y_tr):
                # Scaler per fold
                fold_scaler = StandardScaler()
                X_f_tr_sc = fold_scaler.fit_transform(X_tr[train_idx])
                X_f_va_sc = fold_scaler.transform(X_tr[fold_idx])
                
                for fam, p in fam_models.items():
                    clf = instantiate_model(fam, p)
                    if fam == "logistic":
                        clf.fit(X_f_tr_sc, y_tr[train_idx])
                        oof_preds[fam][fold_idx] = clf.predict_proba(X_f_va_sc)[:, 1]
                    else:
                        clf.fit(X_tr[train_idx], y_tr[train_idx])
                        oof_preds[fam][fold_idx] = clf.predict_proba(X_tr[fold_idx])[:, 1]
                        
            # Fit models on full train and get val predictions
            val_preds = {}
            fitted_models = {}
            for fam, p in fam_models.items():
                clf = instantiate_model(fam, p)
                if fam == "logistic":
                    clf.fit(X_tr_scaled, y_tr)
                    val_preds[fam] = clf.predict_proba(X_va_scaled)[:, 1]
                else:
                    clf.fit(X_tr, y_tr)
                    val_preds[fam] = clf.predict_proba(X_va)[:, 1]
                fitted_models[fam] = clf
                
            # Evaluate individual models on validation
            individual_scores = {}
            for fam in fam_models:
                p_va = val_preds[fam]
                pr = average_precision_score(y_va, p_va)
                roc = roc_auc_score(y_va, p_va)
                br = brier_score_loss(y_va, p_va)
                ll = log_loss(y_va, np.clip(p_va, 1e-15, 1 - 1e-15))
                ece = compute_ece(y_va, p_va)
                individual_scores[fam] = {"pr_auc": pr, "roc_auc": roc, "brier": br, "logloss": ll, "ece": ece}
                ensemble_results.append({
                    "horizon": h, "target": t_base, "strategy": f"individual_{fam}",
                    "val_pr_auc": pr, "val_roc_auc": roc, "val_brier": br, "val_logloss": ll, "val_ece": ece
                })
                
            best_ind_fam = max(individual_scores, key=lambda f: individual_scores[f]["pr_auc"])
            best_ind_pr = individual_scores[best_ind_fam]["pr_auc"]
            print(f"  Best individual: {best_ind_fam} (Val PR-AUC: {best_ind_pr:.4f})")
            
            # 1. Simple Average of top tree models (RF, XGB, CB, LGBM)
            tree_fams = ["random_forest", "xgboost", "catboost", "lightgbm"]
            p_va_tree_avg = np.mean([val_preds[f] for f in tree_fams], axis=0)
            p_oof_tree_avg = np.mean([oof_preds[f] for f in tree_fams], axis=0)
            pr_tree_avg = average_precision_score(y_va, p_va_tree_avg)
            roc_tree_avg = roc_auc_score(y_va, p_va_tree_avg)
            br_tree_avg = brier_score_loss(y_va, p_va_tree_avg)
            ll_tree_avg = log_loss(y_va, np.clip(p_va_tree_avg, 1e-15, 1 - 1e-15))
            ece_tree_avg = compute_ece(y_va, p_va_tree_avg)
            ensemble_results.append({
                "horizon": h, "target": t_base, "strategy": "ensemble_simple_tree_avg",
                "val_pr_auc": pr_tree_avg, "val_roc_auc": roc_tree_avg, "val_brier": br_tree_avg, "val_logloss": ll_tree_avg, "val_ece": ece_tree_avg
            })
            
            # 2. Simple Average of all 5
            all_fams = list(fam_models.keys())
            p_va_all_avg = np.mean([val_preds[f] for f in all_fams], axis=0)
            p_oof_all_avg = np.mean([oof_preds[f] for f in all_fams], axis=0)
            pr_all_avg = average_precision_score(y_va, p_va_all_avg)
            roc_all_avg = roc_auc_score(y_va, p_va_all_avg)
            br_all_avg = brier_score_loss(y_va, p_va_all_avg)
            ll_all_avg = log_loss(y_va, np.clip(p_va_all_avg, 1e-15, 1 - 1e-15))
            ece_all_avg = compute_ece(y_va, p_va_all_avg)
            ensemble_results.append({
                "horizon": h, "target": t_base, "strategy": "ensemble_simple_all5_avg",
                "val_pr_auc": pr_all_avg, "val_roc_auc": roc_all_avg, "val_brier": br_all_avg, "val_logloss": ll_all_avg, "val_ece": ece_all_avg
            })

            # 3. Validation PR-AUC Weighted Average
            weights = np.array([max(0, individual_scores[f]["pr_auc"]) for f in tree_fams])
            weights = weights / np.sum(weights)
            p_va_weighted = np.sum([weights[i] * val_preds[tree_fams[i]] for i in range(len(tree_fams))], axis=0)
            p_oof_weighted = np.sum([weights[i] * oof_preds[tree_fams[i]] for i in range(len(tree_fams))], axis=0)
            pr_weighted = average_precision_score(y_va, p_va_weighted)
            roc_weighted = roc_auc_score(y_va, p_va_weighted)
            br_weighted = brier_score_loss(y_va, p_va_weighted)
            ll_weighted = log_loss(y_va, np.clip(p_va_weighted, 1e-15, 1 - 1e-15))
            ece_weighted = compute_ece(y_va, p_va_weighted)
            ensemble_results.append({
                "horizon": h, "target": t_base, "strategy": "ensemble_val_weighted_tree",
                "val_pr_auc": pr_weighted, "val_roc_auc": roc_weighted, "val_brier": br_weighted, "val_logloss": ll_weighted, "val_ece": ece_weighted
            })
            
            # 4. Out-of-fold Stacking Meta-Classifier (Logistic Regression on OOF log-odds)
            X_meta_tr = np.column_stack([logit(np.clip(oof_preds[f], 1e-6, 1 - 1e-6)) for f in tree_fams])
            X_meta_va = np.column_stack([logit(np.clip(val_preds[f], 1e-6, 1 - 1e-6)) for f in tree_fams])
            meta_clf = LogisticRegression(C=1.0, random_state=42)
            meta_clf.fit(X_meta_tr, y_tr)
            p_va_stack = meta_clf.predict_proba(X_meta_va)[:, 1]
            p_oof_stack = meta_clf.predict_proba(X_meta_tr)[:, 1]
            pr_stack = average_precision_score(y_va, p_va_stack)
            roc_stack = roc_auc_score(y_va, p_va_stack)
            br_stack = brier_score_loss(y_va, p_va_stack)
            ll_stack = log_loss(y_va, np.clip(p_va_stack, 1e-15, 1 - 1e-15))
            ece_stack = compute_ece(y_va, p_va_stack)
            ensemble_results.append({
                "horizon": h, "target": t_base, "strategy": "ensemble_oof_stacking",
                "val_pr_auc": pr_stack, "val_roc_auc": roc_stack, "val_brier": br_stack, "val_logloss": ll_stack, "val_ece": ece_stack
            })
            
            # Ensemble Decision Rule: Keep ensemble only if PR-AUC strictly improves over best individual model by >= 0.003
            candidate_ensembles = [
                ("ensemble_simple_tree_avg", pr_tree_avg, p_oof_tree_avg, p_va_tree_avg),
                ("ensemble_val_weighted_tree", pr_weighted, p_oof_weighted, p_va_weighted),
                ("ensemble_oof_stacking", pr_stack, p_oof_stack, p_va_stack)
            ]
            best_ens_name, best_ens_pr, best_ens_oof, best_ens_va = max(candidate_ensembles, key=lambda x: x[1])
            
            if best_ens_pr > best_ind_pr + 0.003:
                chosen_model_type = best_ens_name
                chosen_p_oof = best_ens_oof
                chosen_p_va = best_ens_va
                chosen_pr = best_ens_pr
                print(f"  -> Decision: ENSEMBLE WON ({best_ens_name}: PR-AUC {best_ens_pr:.4f} vs {best_ind_pr:.4f})")
            else:
                chosen_model_type = best_ind_fam
                chosen_p_oof = oof_preds[best_ind_fam]
                chosen_p_va = val_preds[best_ind_fam]
                chosen_pr = best_ind_pr
                print(f"  -> Decision: INDIVIDUAL MODEL PREFERRED ({best_ind_fam}: PR-AUC {best_ind_pr:.4f} vs best ens {best_ens_pr:.4f})")
                
            # CALIBRATION BENCHMARK (Fitted on chosen model's Train OOF predictions)
            # 1. Uncalibrated
            br_raw = brier_score_loss(y_va, chosen_p_va)
            ll_raw = log_loss(y_va, np.clip(chosen_p_va, 1e-15, 1 - 1e-15))
            ece_raw = compute_ece(y_va, chosen_p_va)
            calibration_results.append({
                "horizon": h, "target": t_base, "model": chosen_model_type, "calibration": "none",
                "val_brier": br_raw, "val_logloss": ll_raw, "val_ece": ece_raw, "val_pr_auc": average_precision_score(y_va, chosen_p_va)
            })
            
            # 2. Platt / Sigmoid calibration (Logistic Regression on OOF log-odds)
            oof_logits = logit(np.clip(chosen_p_oof, 1e-6, 1 - 1e-6)).reshape(-1, 1)
            va_logits = logit(np.clip(chosen_p_va, 1e-6, 1 - 1e-6)).reshape(-1, 1)
            platt = LogisticRegression(C=1.0, solver="lbfgs", random_state=42)
            platt.fit(oof_logits, y_tr)
            p_va_platt = platt.predict_proba(va_logits)[:, 1]
            br_platt = brier_score_loss(y_va, p_va_platt)
            ll_platt = log_loss(y_va, np.clip(p_va_platt, 1e-15, 1 - 1e-15))
            ece_platt = compute_ece(y_va, p_va_platt)
            calibration_results.append({
                "horizon": h, "target": t_base, "model": chosen_model_type, "calibration": "platt_sigmoid",
                "val_brier": br_platt, "val_logloss": ll_platt, "val_ece": ece_platt, "val_pr_auc": average_precision_score(y_va, p_va_platt)
            })
            
            # 3. Isotonic Regression
            iso = IsotonicRegression(out_of_bounds="clip")
            iso.fit(chosen_p_oof, y_tr)
            p_va_iso = iso.predict(chosen_p_va)
            br_iso = brier_score_loss(y_va, p_va_iso)
            ll_iso = log_loss(y_va, np.clip(p_va_iso, 1e-15, 1 - 1e-15))
            ece_iso = compute_ece(y_va, p_va_iso)
            calibration_results.append({
                "horizon": h, "target": t_base, "model": chosen_model_type, "calibration": "isotonic",
                "val_brier": br_iso, "val_logloss": ll_iso, "val_ece": ece_iso, "val_pr_auc": average_precision_score(y_va, p_va_iso)
            })
            
            # Select calibration method: minimize validation Brier score
            cal_candidates = [("none", br_raw, ll_raw, ece_raw),
                              ("platt_sigmoid", br_platt, ll_platt, ece_platt),
                              ("isotonic", br_iso, ll_iso, ece_iso)]
            best_cal_method = min(cal_candidates, key=lambda x: x[1])
            print(f"  Calibration choice: {best_cal_method[0]} (Val Brier: {best_cal_method[1]:.4f}, ECE: {best_cal_method[3]:.4f})")
            
            frozen_decisions.append({
                "horizon": h,
                "target": t_base,
                "target_col": target_col,
                "selected_model": chosen_model_type,
                "selected_model_family": best_ind_fam if "ensemble" not in chosen_model_type else "ensemble",
                "selected_params": json.dumps(fam_models[best_ind_fam]) if "ensemble" not in chosen_model_type else json.dumps(fam_models),
                "selected_calibration": best_cal_method[0],
                "val_pr_auc": chosen_pr,
                "val_roc_auc": roc_auc_score(y_va, chosen_p_va),
                "val_brier_uncalibrated": br_raw,
                "val_brier_calibrated": best_cal_method[1],
                "val_logloss_calibrated": best_cal_method[2],
                "val_ece_calibrated": best_cal_method[3]
            })

    df_ens = pd.DataFrame(ensemble_results)
    df_cal = pd.DataFrame(calibration_results)
    df_froz = pd.DataFrame(frozen_decisions)
    
    df_ens.to_csv(f"{out_dir}/ensemble_benchmark_results.csv", index=False)
    df_cal.to_csv(f"{out_dir}/calibration_benchmark_results.csv", index=False)
    df_froz.to_csv(f"{out_dir}/final_frozen_classification_decisions.csv", index=False)
    
    print("\n" + "=" * 80)
    print("ENSEMBLE & CALIBRATION BENCHMARK COMPLETE!")
    print(f"Saved {len(df_ens)} ensemble trials to {out_dir}/ensemble_benchmark_results.csv")
    print(f"Saved {len(df_cal)} calibration evaluations to {out_dir}/calibration_benchmark_results.csv")
    print(f"Saved 15 frozen model decisions to {out_dir}/final_frozen_classification_decisions.csv")
    print("=" * 80)

if __name__ == "__main__":
    main()
