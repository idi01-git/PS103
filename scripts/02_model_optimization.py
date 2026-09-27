import os
import time
import json
import warnings
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from catboost import CatBoostClassifier
from lightgbm import LGBMClassifier
from sklearn.metrics import (
    roc_auc_score, average_precision_score, precision_score,
    recall_score, f1_score, balanced_accuracy_score,
    brier_score_loss, log_loss
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

def evaluate_predictions(y_true, y_prob):
    # Determine best threshold for F1 on validation
    thresholds = np.linspace(0.05, 0.95, 19)
    best_f1 = -1.0
    best_thresh = 0.5
    for th in thresholds:
        y_pred = (y_prob >= th).astype(int)
        f = f1_score(y_true, y_pred, zero_division=0)
        if f > best_f1:
            best_f1 = f
            best_thresh = th
            
    y_pred_best = (y_prob >= best_thresh).astype(int)
    
    roc_auc = roc_auc_score(y_true, y_prob) if len(np.unique(y_true)) > 1 else 0.5
    pr_auc = average_precision_score(y_true, y_prob)
    brier = brier_score_loss(y_true, y_prob)
    ll = log_loss(y_true, np.clip(y_prob, 1e-15, 1 - 1e-15))
    ece = compute_ece(y_true, y_prob)
    
    prec = precision_score(y_true, y_pred_best, zero_division=0)
    rec = recall_score(y_true, y_pred_best, zero_division=0)
    bal_acc = balanced_accuracy_score(y_true, y_pred_best)
    
    return {
        "roc_auc": float(roc_auc),
        "pr_auc": float(pr_auc),
        "brier": float(brier),
        "logloss": float(ll),
        "ece": float(ece),
        "threshold": float(best_thresh),
        "f1": float(best_f1),
        "precision": float(prec),
        "recall": float(rec),
        "balanced_accuracy": float(bal_acc)
    }

def run_optimization():
    root = "data_bundle/SIH26103_project_data_bundle_v3_2_cost_corrected/06_feature_selection"
    out_dir = "outputs/07_5_optimization"
    os.makedirs(out_dir, exist_ok=True)
    
    horizons = ["3m", "6m", "12m", "15m", "18m"]
    target_bases = ["combined_deterioration", "schedule_deterioration", "cost_deterioration"]
    
    all_trials = []
    best_models = []
    
    print("=" * 80)
    print("STARTING STEP 7.5 RIGOROUS CLASSIFICATION HYPERPARAMETER SEARCH")
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
            
            n_pos = np.sum(y_tr == 1)
            n_neg = np.sum(y_tr == 0)
            pos_weight = float(n_neg / max(1, n_pos))
            train_prev = float(n_pos / len(y_tr))
            val_prev = float(np.mean(y_va))
            
            print(f"\n--- Target: {target_col} | Train N={len(y_tr)} (prev={train_prev:.3f}) | Val N={len(y_va)} (prev={val_prev:.3f}) ---")
            
            # Scaler for linear models
            scaler = StandardScaler()
            X_tr_scaled = scaler.fit_transform(X_tr)
            X_va_scaled = scaler.transform(X_va)
            
            problem_trials = []
            
            # 1. Logistic Regression
            lr_params_list = [
                {"C": 0.01, "solver": "lbfgs", "class_weight": None},
                {"C": 0.1, "solver": "lbfgs", "class_weight": None},
                {"C": 1.0, "solver": "lbfgs", "class_weight": None},
                {"C": 0.1, "solver": "lbfgs", "class_weight": "balanced"},
                {"C": 1.0, "solver": "lbfgs", "class_weight": "balanced"},
                {"C": 0.1, "penalty": "l1", "solver": "liblinear", "class_weight": None},
                {"C": 1.0, "penalty": "l1", "solver": "liblinear", "class_weight": None},
            ]
            for p in lr_params_list:
                t0 = time.time()
                clf = LogisticRegression(**p, max_iter=1000, random_state=42)
                clf.fit(X_tr_scaled, y_tr)
                fit_sec = time.time() - t0
                p_va = clf.predict_proba(X_va_scaled)[:, 1]
                metrics = evaluate_predictions(y_va, p_va)
                trial_res = {
                    "horizon": h, "target": t_base, "model_family": "logistic",
                    "params": json.dumps(p), "fit_seconds": fit_sec,
                    "train_prev": train_prev, "val_prev": val_prev,
                    **metrics
                }
                problem_trials.append(trial_res)
                all_trials.append(trial_res)

            # 2. Random Forest
            rf_params_list = [
                {"n_estimators": 200, "max_depth": 8, "min_samples_split": 5, "min_samples_leaf": 2, "class_weight": None},
                {"n_estimators": 250, "max_depth": 12, "min_samples_split": 5, "min_samples_leaf": 2, "class_weight": None},
                {"n_estimators": 250, "max_depth": 16, "min_samples_split": 10, "min_samples_leaf": 4, "class_weight": None},
                {"n_estimators": 200, "max_depth": 10, "min_samples_split": 5, "min_samples_leaf": 2, "class_weight": "balanced"},
                {"n_estimators": 250, "max_depth": 14, "min_samples_split": 10, "min_samples_leaf": 4, "class_weight": "balanced_subsample"},
            ]
            for p in rf_params_list:
                t0 = time.time()
                clf = RandomForestClassifier(**p, random_state=42, n_jobs=-1)
                clf.fit(X_tr, y_tr)
                fit_sec = time.time() - t0
                p_va = clf.predict_proba(X_va)[:, 1]
                metrics = evaluate_predictions(y_va, p_va)
                trial_res = {
                    "horizon": h, "target": t_base, "model_family": "random_forest",
                    "params": json.dumps(p), "fit_seconds": fit_sec,
                    "train_prev": train_prev, "val_prev": val_prev,
                    **metrics
                }
                problem_trials.append(trial_res)
                all_trials.append(trial_res)

            # 3. XGBoost
            xgb_params_list = [
                {"n_estimators": 150, "max_depth": 4, "learning_rate": 0.05, "subsample": 0.8, "colsample_bytree": 0.8, "scale_pos_weight": 1.0, "reg_alpha": 0.1, "reg_lambda": 1.0},
                {"n_estimators": 250, "max_depth": 5, "learning_rate": 0.03, "subsample": 0.8, "colsample_bytree": 0.8, "scale_pos_weight": 1.0, "reg_alpha": 0.5, "reg_lambda": 2.0},
                {"n_estimators": 250, "max_depth": 6, "learning_rate": 0.05, "subsample": 0.7, "colsample_bytree": 0.7, "scale_pos_weight": 1.0, "reg_alpha": 1.0, "reg_lambda": 3.0},
                {"n_estimators": 200, "max_depth": 4, "learning_rate": 0.05, "subsample": 0.8, "colsample_bytree": 0.8, "scale_pos_weight": min(pos_weight, 5.0), "reg_alpha": 0.5, "reg_lambda": 1.0},
                {"n_estimators": 300, "max_depth": 5, "learning_rate": 0.03, "subsample": 0.85, "colsample_bytree": 0.75, "scale_pos_weight": min(pos_weight, 3.0), "reg_alpha": 0.2, "reg_lambda": 1.5},
            ]
            for p in xgb_params_list:
                t0 = time.time()
                clf = XGBClassifier(**p, random_state=42, n_jobs=-1, eval_metric="logloss")
                clf.fit(X_tr, y_tr)
                fit_sec = time.time() - t0
                p_va = clf.predict_proba(X_va)[:, 1]
                metrics = evaluate_predictions(y_va, p_va)
                trial_res = {
                    "horizon": h, "target": t_base, "model_family": "xgboost",
                    "params": json.dumps(p), "fit_seconds": fit_sec,
                    "train_prev": train_prev, "val_prev": val_prev,
                    **metrics
                }
                problem_trials.append(trial_res)
                all_trials.append(trial_res)

            # 4. CatBoost
            cb_params_list = [
                {"iterations": 250, "depth": 4, "learning_rate": 0.05, "l2_leaf_reg": 3, "auto_class_weights": None},
                {"iterations": 350, "depth": 6, "learning_rate": 0.04, "l2_leaf_reg": 5, "auto_class_weights": None},
                {"iterations": 450, "depth": 5, "learning_rate": 0.03, "l2_leaf_reg": 4, "auto_class_weights": None},
                {"iterations": 300, "depth": 5, "learning_rate": 0.05, "l2_leaf_reg": 4, "auto_class_weights": "Balanced"},
                {"iterations": 400, "depth": 6, "learning_rate": 0.03, "l2_leaf_reg": 6, "auto_class_weights": "Balanced"},
            ]
            for p in cb_params_list:
                t0 = time.time()
                clf = CatBoostClassifier(**p, random_seed=42, verbose=0, thread_count=-1)
                clf.fit(X_tr, y_tr)
                fit_sec = time.time() - t0
                p_va = clf.predict_proba(X_va)[:, 1]
                metrics = evaluate_predictions(y_va, p_va)
                trial_res = {
                    "horizon": h, "target": t_base, "model_family": "catboost",
                    "params": json.dumps(p), "fit_seconds": fit_sec,
                    "train_prev": train_prev, "val_prev": val_prev,
                    **metrics
                }
                problem_trials.append(trial_res)
                all_trials.append(trial_res)

            # 5. LightGBM
            lgb_params_list = [
                {"n_estimators": 150, "num_leaves": 31, "max_depth": 5, "learning_rate": 0.05, "min_child_samples": 20, "subsample": 0.8, "colsample_bytree": 0.8, "reg_alpha": 0.1, "reg_lambda": 1.0},
                {"n_estimators": 250, "num_leaves": 45, "max_depth": 7, "learning_rate": 0.03, "min_child_samples": 30, "subsample": 0.8, "colsample_bytree": 0.8, "reg_alpha": 0.5, "reg_lambda": 2.0},
                {"n_estimators": 250, "num_leaves": 25, "max_depth": 5, "learning_rate": 0.05, "min_child_samples": 40, "subsample": 0.7, "colsample_bytree": 0.7, "reg_alpha": 1.0, "reg_lambda": 3.0},
                {"n_estimators": 200, "num_leaves": 31, "max_depth": 6, "learning_rate": 0.04, "min_child_samples": 25, "subsample": 0.85, "colsample_bytree": 0.75, "class_weight": "balanced"},
                {"n_estimators": 300, "num_leaves": 35, "max_depth": 6, "learning_rate": 0.03, "min_child_samples": 35, "subsample": 0.8, "colsample_bytree": 0.8, "reg_alpha": 0.2, "reg_lambda": 1.5},
            ]
            for p in lgb_params_list:
                t0 = time.time()
                clf = LGBMClassifier(**p, random_state=42, n_jobs=-1, verbose=-1)
                clf.fit(X_tr, y_tr)
                fit_sec = time.time() - t0
                p_va = clf.predict_proba(X_va)[:, 1]
                metrics = evaluate_predictions(y_va, p_va)
                trial_res = {
                    "horizon": h, "target": t_base, "model_family": "lightgbm",
                    "params": json.dumps(p), "fit_seconds": fit_sec,
                    "train_prev": train_prev, "val_prev": val_prev,
                    **metrics
                }
                problem_trials.append(trial_res)
                all_trials.append(trial_res)

            # Find best trial for each model family and overall for this target
            df_prob = pd.DataFrame(problem_trials)
            for fam in ["logistic", "random_forest", "xgboost", "catboost", "lightgbm"]:
                df_fam = df_prob[df_prob["model_family"] == fam]
                best_fam_idx = df_fam["pr_auc"].idxmax()
                best_fam_trial = df_fam.loc[best_fam_idx].to_dict()
                best_fam_trial["is_family_best"] = True
                best_models.append(best_fam_trial)

            best_overall_idx = df_prob["pr_auc"].idxmax()
            best_overall = df_prob.loc[best_overall_idx]
            print(f"  --> BEST MODEL: {best_overall['model_family']} | Val PR-AUC: {best_overall['pr_auc']:.4f} | ROC-AUC: {best_overall['roc_auc']:.4f} | Brier: {best_overall['brier']:.4f}")

    df_all = pd.DataFrame(all_trials)
    df_best = pd.DataFrame(best_models)
    
    df_all.to_csv(f"{out_dir}/all_classification_tuning_trials.csv", index=False)
    df_best.to_csv(f"{out_dir}/best_classification_by_family.csv", index=False)
    
    # Also save best overall per horizon & target
    best_overall_list = []
    for (h, t), grp in df_all.groupby(["horizon", "target"]):
        idx = grp["pr_auc"].idxmax()
        best_overall_list.append(grp.loc[idx])
    df_best_overall = pd.DataFrame(best_overall_list)
    df_best_overall.to_csv(f"{out_dir}/best_classification_overall_by_val_prauc.csv", index=False)
    
    print("\n" + "=" * 80)
    print("STEP 7.5 OPTIMIZATION COMPLETE!")
    print(f"Saved {len(df_all)} trials to {out_dir}/all_classification_tuning_trials.csv")
    print(f"Saved family bests to {out_dir}/best_classification_by_family.csv")
    print(f"Saved overall bests to {out_dir}/best_classification_overall_by_val_prauc.csv")
    print("=" * 80)

if __name__ == "__main__":
    run_optimization()
