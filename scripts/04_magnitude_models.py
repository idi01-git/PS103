import os
import time
import json
import warnings
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge, HuberRegressor
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor
from catboost import CatBoostRegressor
from lightgbm import LGBMRegressor
from sklearn.metrics import mean_absolute_error, root_mean_squared_error, r2_score

warnings.filterwarnings("ignore")

def compute_regression_metrics(y_true, y_pred):
    # Ensure no negative predictions for non-negative physical quantities
    y_pred_clipped = np.maximum(0.0, y_pred)
    mae = mean_absolute_error(y_true, y_pred_clipped)
    rmse = root_mean_squared_error(y_true, y_pred_clipped)
    r2 = r2_score(y_true, y_pred_clipped)
    med_ae = float(np.median(np.abs(y_true - y_pred_clipped)))
    bias = float(np.mean(y_pred_clipped - y_true))
    errors = np.abs(y_true - y_pred_clipped)
    p90_err = float(np.percentile(errors, 90))
    p95_err = float(np.percentile(errors, 95))
    p99_err = float(np.percentile(errors, 99))
    max_err = float(np.max(errors))
    
    return {
        "mae": float(mae),
        "rmse": float(rmse),
        "r2": float(r2),
        "med_ae": med_ae,
        "bias": bias,
        "p90_err": p90_err,
        "p95_err": p95_err,
        "p99_err": p99_err,
        "max_err": max_err
    }

def instantiate_regressor(family, p):
    if family == "ridge":
        return Ridge(**p, random_state=42)
    elif family == "random_forest":
        return RandomForestRegressor(**p, random_state=42, n_jobs=-1)
    elif family == "xgboost":
        return XGBRegressor(**p, random_state=42, n_jobs=-1)
    elif family == "catboost":
        return CatBoostRegressor(**p, random_seed=42, verbose=0, thread_count=-1)
    elif family == "lightgbm":
        return LGBMRegressor(**p, random_state=42, n_jobs=-1, verbose=-1)
    else:
        raise ValueError(f"Unknown family: {family}")

def main():
    root = "data_bundle/SIH26103_project_data_bundle_v3_2_cost_corrected/06_feature_selection"
    out_dir = "outputs/07_5_optimization"
    os.makedirs(out_dir, exist_ok=True)
    
    horizons = ["3m", "6m", "12m", "15m", "18m"]
    mag_targets = [
        ("additional_delay_months", "schedule_deterioration"),
        ("cost_increase_pct", "cost_deterioration")
    ]
    
    all_mag_results = []
    selected_mag_models = []
    
    print("=" * 80)
    print("STARTING STEP 7.5 RIGOROUS MAGNITUDE MODELING (SCHEDULE DELAY & COST OVERRUN %)")
    print("=" * 80)
    
    for h in horizons:
        print(f"\n==================== HORIZON {h.upper()} ====================")
        tr = pd.read_csv(f"{root}/train_{h}_selected.csv")
        va = pd.read_csv(f"{root}/validation_{h}_selected.csv")
        
        target_cols = [f"{t}_{h}" for t in ["combined_deterioration", "schedule_deterioration", "cost_deterioration", "additional_delay_months", "cost_increase_pct"]]
        non_feature_cols = ["project_id", "snapshot_date"] + target_cols
        feature_cols = [c for c in tr.columns if c not in non_feature_cols]
        
        X_tr_all = tr[feature_cols].values
        X_va_all = va[feature_cols].values
        
        scaler = StandardScaler()
        X_tr_scaled = scaler.fit_transform(X_tr_all)
        X_va_scaled = scaler.transform(X_va_all)
        
        for mag_base, det_base in mag_targets:
            mag_col = f"{mag_base}_{h}"
            det_col = f"{det_base}_{h}"
            
            mask_tr = tr[mag_col].notnull().values
            mask_va = va[mag_col].notnull().values
            
            X_tr = X_tr_all[mask_tr]
            y_tr = tr.loc[mask_tr, mag_col].values.astype(float)
            
            X_va = X_va_all[mask_va]
            y_va = va.loc[mask_va, mag_col].values.astype(float)
            
            # Binary indicator for two-stage model
            y_tr_det = (y_tr > 0).astype(int)
            y_va_det = (y_va > 0).astype(int)
            
            # Positive-only subset for Stage 2 conditional regressor
            pos_mask_tr = y_tr > 0
            pos_mask_va = y_va > 0
            
            X_tr_pos = X_tr[pos_mask_tr]
            y_tr_pos = y_tr[pos_mask_tr]
            
            print(f"\n--- Target: {mag_col} | Train N={len(y_tr)} (pos={np.sum(pos_mask_tr)}) | Val N={len(y_va)} (pos={np.sum(pos_mask_va)}) ---")
            
            # Load the winning Stage 1 classifier probabilities on validation
            from lightgbm import LGBMClassifier
            from xgboost import XGBClassifier
            from catboost import CatBoostClassifier
            # Train a strong Stage 1 classifier to predict P(Y > 0)
            stage1_clf = LGBMClassifier(n_estimators=150, num_leaves=31, learning_rate=0.04, random_state=42, n_jobs=-1, verbose=-1)
            stage1_clf.fit(X_tr, y_tr_det)
            p_va_det = stage1_clf.predict_proba(X_va)[:, 1]
            
            reg_configs = [
                # Family, params, transform, is_two_stage
                ("ridge", {"alpha": 10.0}, "raw", False),
                ("ridge", {"alpha": 10.0}, "log1p", False),
                ("lightgbm", {"n_estimators": 200, "num_leaves": 31, "learning_rate": 0.04, "subsample": 0.8}, "raw", False),
                ("lightgbm", {"n_estimators": 200, "num_leaves": 31, "learning_rate": 0.04, "subsample": 0.8}, "log1p", False),
                ("lightgbm", {"n_estimators": 200, "num_leaves": 31, "learning_rate": 0.04, "objective": "huber"}, "raw", False),
                ("xgboost", {"n_estimators": 200, "max_depth": 5, "learning_rate": 0.04, "subsample": 0.8}, "raw", False),
                ("xgboost", {"n_estimators": 200, "max_depth": 5, "learning_rate": 0.04, "subsample": 0.8}, "log1p", False),
                ("catboost", {"iterations": 300, "depth": 5, "learning_rate": 0.04}, "raw", False),
                ("catboost", {"iterations": 300, "depth": 5, "learning_rate": 0.04}, "log1p", False),
                ("random_forest", {"n_estimators": 150, "max_depth": 12}, "raw", False),
                ("random_forest", {"n_estimators": 150, "max_depth": 12}, "log1p", False),
                
                # Two-Stage Architecture models (Conditional on Y > 0)
                ("lightgbm", {"n_estimators": 150, "num_leaves": 25, "learning_rate": 0.04, "subsample": 0.8}, "raw", True),
                ("lightgbm", {"n_estimators": 150, "num_leaves": 25, "learning_rate": 0.04, "subsample": 0.8}, "log1p", True),
                ("xgboost", {"n_estimators": 150, "max_depth": 5, "learning_rate": 0.04, "subsample": 0.8}, "raw", True),
                ("xgboost", {"n_estimators": 150, "max_depth": 5, "learning_rate": 0.04, "subsample": 0.8}, "log1p", True),
                ("catboost", {"iterations": 250, "depth": 5, "learning_rate": 0.04}, "log1p", True),
            ]
            
            problem_results = []
            
            for fam, p, trans, is_two_stage in reg_configs:
                t0 = time.time()
                reg = instantiate_regressor(fam, p)
                
                if not is_two_stage:
                    # Direct regressor on all data
                    y_tr_fit = np.log1p(np.maximum(0.0, y_tr)) if trans == "log1p" else y_tr
                    if fam == "ridge":
                        reg.fit(scaler.fit_transform(X_tr), y_tr_fit)
                        pred_va_raw = reg.predict(scaler.transform(X_va))
                    else:
                        reg.fit(X_tr, y_tr_fit)
                        pred_va_raw = reg.predict(X_va)
                        
                    if trans == "log1p":
                        pred_va_uncond = np.expm1(np.maximum(0.0, pred_va_raw))
                    else:
                        pred_va_uncond = np.maximum(0.0, pred_va_raw)
                        
                    pred_va_cond = pred_va_uncond # in direct model, conditional = unconditional
                else:
                    # Two-stage model: train stage 2 conditional regressor only on positive overrun cases
                    y_tr_fit = np.log1p(np.maximum(0.0, y_tr_pos)) if trans == "log1p" else y_tr_pos
                    if fam == "ridge":
                        reg.fit(scaler.fit_transform(X_tr_pos), y_tr_fit)
                        pred_va_raw = reg.predict(scaler.transform(X_va))
                    else:
                        reg.fit(X_tr_pos, y_tr_fit)
                        pred_va_raw = reg.predict(X_va)
                        
                    if trans == "log1p":
                        pred_va_cond = np.expm1(np.maximum(0.0, pred_va_raw))
                    else:
                        pred_va_cond = np.maximum(0.0, pred_va_raw)
                        
                    # Unconditional expected magnitude = P(deterioration > 0) * E[magnitude | deterioration > 0]
                    pred_va_uncond = p_va_det * pred_va_cond
                    
                fit_sec = time.time() - t0
                
                # Evaluate unconditional expected magnitude vs actual target on validation
                metrics = compute_regression_metrics(y_va, pred_va_uncond)
                
                # Also evaluate conditional accuracy on positive cases
                if np.sum(pos_mask_va) > 0:
                    metrics_cond = compute_regression_metrics(y_va[pos_mask_va], pred_va_cond[pos_mask_va])
                    cond_mae = metrics_cond["mae"]
                    cond_rmse = metrics_cond["rmse"]
                else:
                    cond_mae = np.nan
                    cond_rmse = np.nan
                    
                row = {
                    "horizon": h,
                    "target": mag_base,
                    "target_col": mag_col,
                    "model_family": fam,
                    "params": json.dumps(p),
                    "transform": trans,
                    "architecture": "two_stage" if is_two_stage else "direct",
                    "fit_seconds": fit_sec,
                    "cond_val_mae": cond_mae,
                    "cond_val_rmse": cond_rmse,
                    **metrics
                }
                problem_results.append(row)
                all_mag_results.append(row)
                
            df_prob = pd.DataFrame(problem_results)
            # Select model minimizing validation MAE
            best_idx = df_prob["mae"].idxmin()
            best_row = df_prob.loc[best_idx]
            print(f"  --> BEST MODEL: {best_row['model_family']} ({best_row['architecture']}, {best_row['transform']}) | Val MAE: {best_row['mae']:.2f} | RMSE: {best_row['rmse']:.2f} | MedAE: {best_row['med_ae']:.2f} | R2: {best_row['r2']:.4f}")
            selected_mag_models.append(best_row.to_dict())

    df_all_mag = pd.DataFrame(all_mag_results)
    df_sel_mag = pd.DataFrame(selected_mag_models)
    
    df_all_mag.to_csv(f"{out_dir}/all_magnitude_benchmark_results.csv", index=False)
    df_sel_mag.to_csv(f"{out_dir}/final_frozen_magnitude_decisions.csv", index=False)
    
    print("\n" + "=" * 80)
    print("STEP 7.5 MAGNITUDE MODELING COMPLETE!")
    print(f"Saved {len(df_all_mag)} magnitude trials to {out_dir}/all_magnitude_benchmark_results.csv")
    print(f"Saved 10 frozen magnitude model decisions to {out_dir}/final_frozen_magnitude_decisions.csv")
    print("=" * 80)

if __name__ == "__main__":
    main()
