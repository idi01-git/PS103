import os
import time
import json
import warnings
import numpy as np
import pandas as pd
from sklearn.model_selection import StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression, Ridge
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from xgboost import XGBClassifier, XGBRegressor
from catboost import CatBoostClassifier, CatBoostRegressor
from lightgbm import LGBMClassifier, LGBMRegressor
from sklearn.isotonic import IsotonicRegression
from scipy.special import logit
from sklearn.metrics import (
    roc_auc_score, average_precision_score, precision_score,
    recall_score, f1_score, balanced_accuracy_score,
    brier_score_loss, log_loss,
    mean_absolute_error, root_mean_squared_error, r2_score
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

def main():
    root = "data_bundle/SIH26103_project_data_bundle_v3_2_cost_corrected/06_feature_selection"
    out_dir = "outputs/07_5_optimization"
    os.makedirs(out_dir, exist_ok=True)
    
    df_froz_clf = pd.read_csv(f"{out_dir}/final_frozen_classification_decisions.csv")
    df_froz_mag = pd.read_csv(f"{out_dir}/final_frozen_magnitude_decisions.csv")
    
    horizons = ["3m", "6m", "12m", "15m", "18m"]
    
    test_clf_results = []
    test_mag_results = []
    
    print("=" * 80)
    print("EXECUTING SINGLE UNTOUCHED TEST SET EVALUATION ON FROZEN MODELS")
    print("=" * 80)
    
    # -------------------------------------------------------------
    # 1. CLASSIFICATION TEST EVALUATION
    # -------------------------------------------------------------
    print("\n>>> CLASSIFICATION ON TEST SPLIT <<<")
    for idx, row in df_froz_clf.iterrows():
        h = row["horizon"]
        t_base = row["target"]
        target_col = row["target_col"]
        sel_model = row["selected_model"]
        cal_method = row["selected_calibration"]
        
        tr = pd.read_csv(f"{root}/train_{h}_selected.csv")
        va = pd.read_csv(f"{root}/validation_{h}_selected.csv")
        te = pd.read_csv(f"{root}/test_{h}_selected.csv")
        
        target_cols = [f"{t}_{h}" for t in ["combined_deterioration", "schedule_deterioration", "cost_deterioration", "additional_delay_months", "cost_increase_pct"]]
        non_feature_cols = ["project_id", "snapshot_date"] + target_cols
        feature_cols = [c for c in tr.columns if c not in non_feature_cols]
        
        mask_tr = tr[target_col].notnull().values
        mask_va = va[target_col].notnull().values
        mask_te = te[target_col].notnull().values
        
        X_tr = tr.loc[mask_tr, feature_cols].values
        y_tr = tr.loc[mask_tr, target_col].values.astype(int)
        
        X_va = va.loc[mask_va, feature_cols].values
        y_va = va.loc[mask_va, target_col].values.astype(int)
        
        X_te = te.loc[mask_te, feature_cols].values
        y_te = te.loc[mask_te, target_col].values.astype(int)
        
        scaler = StandardScaler()
        X_tr_sc = scaler.fit_transform(X_tr)
        X_va_sc = scaler.transform(X_va)
        X_te_sc = scaler.transform(X_te)
        
        # Fit base model(s)
        if "ensemble" in sel_model:
            # We used validation-weighted tree ensemble
            tree_fams = ["random_forest", "xgboost", "catboost", "lightgbm"]
            df_fam_best = pd.read_csv(f"{out_dir}/best_classification_by_family.csv")
            fam_clfs = {}
            fam_val_preds = {}
            fam_te_preds = {}
            for fam in tree_fams:
                p_str = df_fam_best[(df_fam_best["horizon"] == h) & (df_fam_best["target"] == t_base) & (df_fam_best["model_family"] == fam)].iloc[0]["params"]
                clf = instantiate_clf(fam, json.loads(p_str))
                clf.fit(X_tr, y_tr)
                fam_clfs[fam] = clf
                fam_val_preds[fam] = clf.predict_proba(X_va)[:, 1]
                fam_te_preds[fam] = clf.predict_proba(X_te)[:, 1]
            
            weights = np.array([max(0, average_precision_score(y_va, fam_val_preds[f])) for f in tree_fams])
            weights = weights / np.sum(weights)
            raw_p_te = np.sum([weights[i] * fam_te_preds[tree_fams[i]] for i in range(len(tree_fams))], axis=0)
            raw_p_va = np.sum([weights[i] * fam_val_preds[tree_fams[i]] for i in range(len(tree_fams))], axis=0)
            
            # Calibration if selected
            if cal_method == "platt_sigmoid":
                # Fit platt on OOF
                skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
                oof_p = np.zeros(len(y_tr))
                for tr_idx, fo_idx in skf.split(X_tr, y_tr):
                    sub_f_preds = []
                    for fam in tree_fams:
                        p_str = df_fam_best[(df_fam_best["horizon"] == h) & (df_fam_best["target"] == t_base) & (df_fam_best["model_family"] == fam)].iloc[0]["params"]
                        clf_f = instantiate_clf(fam, json.loads(p_str))
                        clf_f.fit(X_tr[tr_idx], y_tr[tr_idx])
                        sub_f_preds.append(clf_f.predict_proba(X_tr[fo_idx])[:, 1])
                    oof_p[fo_idx] = np.sum([weights[i] * sub_f_preds[i] for i in range(len(tree_fams))], axis=0)
                
                platt = LogisticRegression(C=1.0, solver="lbfgs", random_state=42)
                platt.fit(logit(np.clip(oof_p, 1e-6, 1 - 1e-6)).reshape(-1, 1), y_tr)
                final_p_te = platt.predict_proba(logit(np.clip(raw_p_te, 1e-6, 1 - 1e-6)).reshape(-1, 1))[:, 1]
            else:
                final_p_te = raw_p_te
        else:
            # Single individual model
            fam = row["selected_model_family"]
            params = json.loads(row["selected_params"])
            clf = instantiate_clf(fam, params)
            if fam == "logistic":
                clf.fit(X_tr_sc, y_tr)
                raw_p_te = clf.predict_proba(X_te_sc)[:, 1]
            else:
                clf.fit(X_tr, y_tr)
                raw_p_te = clf.predict_proba(X_te)[:, 1]
                
            if cal_method == "platt_sigmoid":
                # Compute OOF to fit Platt
                skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
                oof_p = np.zeros(len(y_tr))
                for tr_idx, fo_idx in skf.split(X_tr, y_tr):
                    clf_f = instantiate_clf(fam, params)
                    if fam == "logistic":
                        clf_f.fit(X_tr_sc[tr_idx], y_tr[tr_idx])
                        oof_p[fo_idx] = clf_f.predict_proba(X_tr_sc[fo_idx])[:, 1]
                    else:
                        clf_f.fit(X_tr[tr_idx], y_tr[tr_idx])
                        oof_p[fo_idx] = clf_f.predict_proba(X_tr[fo_idx])[:, 1]
                platt = LogisticRegression(C=1.0, solver="lbfgs", random_state=42)
                platt.fit(logit(np.clip(oof_p, 1e-6, 1 - 1e-6)).reshape(-1, 1), y_tr)
                final_p_te = platt.predict_proba(logit(np.clip(raw_p_te, 1e-6, 1 - 1e-6)).reshape(-1, 1))[:, 1]
            elif cal_method == "isotonic":
                skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
                oof_p = np.zeros(len(y_tr))
                for tr_idx, fo_idx in skf.split(X_tr, y_tr):
                    clf_f = instantiate_clf(fam, params)
                    clf_f.fit(X_tr[tr_idx], y_tr[tr_idx])
                    oof_p[fo_idx] = clf_f.predict_proba(X_tr[fo_idx])[:, 1]
                iso = IsotonicRegression(out_of_bounds="clip")
                iso.fit(oof_p, y_tr)
                final_p_te = iso.predict(raw_p_te)
            else:
                final_p_te = raw_p_te
                
        # Evaluate on Test
        test_roc = roc_auc_score(y_te, final_p_te)
        test_pr = average_precision_score(y_te, final_p_te)
        test_br = brier_score_loss(y_te, final_p_te)
        test_ll = log_loss(y_te, np.clip(final_p_te, 1e-15, 1 - 1e-15))
        test_ece = compute_ece(y_te, final_p_te)
        
        print(f"  {target_col:28s} | Frozen: {sel_model:26s} (cal={cal_method:13s}) | Test PR-AUC: {test_pr:.4f} | ROC-AUC: {test_roc:.4f} | Brier: {test_br:.4f} | ECE: {test_ece:.4f}")
        
        test_clf_results.append({
            "horizon": h,
            "target": t_base,
            "target_col": target_col,
            "frozen_model": sel_model,
            "calibration": cal_method,
            "val_pr_auc": row["val_pr_auc"],
            "val_roc_auc": row["val_roc_auc"],
            "val_brier": row["val_brier_calibrated"],
            "val_ece": row["val_ece_calibrated"],
            "test_pr_auc": test_pr,
            "test_roc_auc": test_roc,
            "test_brier": test_br,
            "test_logloss": test_ll,
            "test_ece": test_ece,
            "test_prevalence": float(np.mean(y_te))
        })

    # -------------------------------------------------------------
    # 2. MAGNITUDE TEST EVALUATION
    # -------------------------------------------------------------
    print("\n>>> MAGNITUDE ON TEST SPLIT <<<")
    for idx, row in df_froz_mag.iterrows():
        h = row["horizon"]
        mag_base = row["target"]
        mag_col = row["target_col"]
        fam = row["model_family"]
        params = json.loads(row["params"])
        trans = row["transform"]
        arch = row["architecture"]
        
        tr = pd.read_csv(f"{root}/train_{h}_selected.csv")
        te = pd.read_csv(f"{root}/test_{h}_selected.csv")
        
        target_cols = [f"{t}_{h}" for t in ["combined_deterioration", "schedule_deterioration", "cost_deterioration", "additional_delay_months", "cost_increase_pct"]]
        non_feature_cols = ["project_id", "snapshot_date"] + target_cols
        feature_cols = [c for c in tr.columns if c not in non_feature_cols]
        
        mask_tr = tr[mag_col].notnull().values
        mask_te = te[mag_col].notnull().values
        
        X_tr = tr.loc[mask_tr, feature_cols].values
        y_tr = tr.loc[mask_tr, mag_col].values.astype(float)
        
        X_te = te.loc[mask_te, feature_cols].values
        y_te = te.loc[mask_te, mag_col].values.astype(float)
        
        scaler = StandardScaler()
        X_tr_sc = scaler.fit_transform(X_tr)
        X_te_sc = scaler.transform(X_te)
        
        reg = instantiate_reg(fam, params)
        
        if arch == "direct":
            y_tr_fit = np.log1p(np.maximum(0.0, y_tr)) if trans == "log1p" else y_tr
            if fam == "ridge":
                reg.fit(X_tr_sc, y_tr_fit)
                p_te_raw = reg.predict(X_te_sc)
            else:
                reg.fit(X_tr, y_tr_fit)
                p_te_raw = reg.predict(X_te)
                
            pred_te = np.expm1(np.maximum(0.0, p_te_raw)) if trans == "log1p" else np.maximum(0.0, p_te_raw)
        else:
            # Two-stage
            pos_mask_tr = y_tr > 0
            y_tr_det = pos_mask_tr.astype(int)
            
            # Stage 1: Classifier for probability of overrun
            stage1_clf = LGBMClassifier(n_estimators=150, num_leaves=31, learning_rate=0.04, random_state=42, n_jobs=-1, verbose=-1)
            stage1_clf.fit(X_tr, y_tr_det)
            p_te_det = stage1_clf.predict_proba(X_te)[:, 1]
            
            # Stage 2: Conditional regressor on positive cases
            X_tr_pos = X_tr[pos_mask_tr]
            y_tr_pos = y_tr[pos_mask_tr]
            y_tr_pos_fit = np.log1p(np.maximum(0.0, y_tr_pos)) if trans == "log1p" else y_tr_pos
            reg.fit(X_tr_pos, y_tr_pos_fit)
            p_te_cond_raw = reg.predict(X_te)
            p_te_cond = np.expm1(np.maximum(0.0, p_te_cond_raw)) if trans == "log1p" else np.maximum(0.0, p_te_cond_raw)
            
            pred_te = p_te_det * p_te_cond
            
        pred_te = np.maximum(0.0, pred_te)
        test_mae = mean_absolute_error(y_te, pred_te)
        test_rmse = root_mean_squared_error(y_te, pred_te)
        test_r2 = r2_score(y_te, pred_te)
        test_med_ae = float(np.median(np.abs(y_te - pred_te)))
        test_bias = float(np.mean(pred_te - y_te))
        errs = np.abs(y_te - pred_te)
        p90_err = float(np.percentile(errs, 90))
        p99_err = float(np.percentile(errs, 99))
        max_err = float(np.max(errs))
        
        print(f"  {mag_col:28s} | Frozen: {fam:10s} ({arch}, {trans:5s}) | Test MAE: {test_mae:6.2f} | RMSE: {test_rmse:6.2f} | MedAE: {test_med_ae:6.2f} | R2: {test_r2:7.4f}")
        
        test_mag_results.append({
            "horizon": h,
            "target": mag_base,
            "target_col": mag_col,
            "frozen_model": fam,
            "architecture": arch,
            "transform": trans,
            "val_mae": row["mae"],
            "val_rmse": row["rmse"],
            "val_r2": row["r2"],
            "test_mae": test_mae,
            "test_rmse": test_rmse,
            "test_r2": test_r2,
            "test_med_ae": test_med_ae,
            "test_bias": test_bias,
            "test_p90_err": p90_err,
            "test_p99_err": p99_err,
            "test_max_err": max_err
        })

    df_test_clf = pd.DataFrame(test_clf_results)
    df_test_mag = pd.DataFrame(test_mag_results)
    
    df_test_clf.to_csv(f"{out_dir}/frozen_classification_test_results.csv", index=False)
    df_test_mag.to_csv(f"{out_dir}/frozen_magnitude_test_results.csv", index=False)
    
    print("\n" + "=" * 80)
    print("UNTOUCHED TEST EVALUATION COMPLETE!")
    print(f"Saved frozen classification test metrics to {out_dir}/frozen_classification_test_results.csv")
    print(f"Saved frozen magnitude test metrics to {out_dir}/frozen_magnitude_test_results.csv")
    print("=" * 80)

if __name__ == "__main__":
    main()
