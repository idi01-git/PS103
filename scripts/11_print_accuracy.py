import os
import json
import pandas as pd
import numpy as np
from sklearn.metrics import accuracy_score, balanced_accuracy_score, precision_score, recall_score, f1_score
from xgboost import XGBClassifier
from catboost import CatBoostClassifier
from lightgbm import LGBMClassifier
from sklearn.ensemble import RandomForestClassifier

root = "data_bundle/SIH26103_project_data_bundle_v3_2_cost_corrected/06_feature_selection"
df_clf = pd.read_csv("outputs/07_5_optimization/frozen_classification_test_results.csv")
df_mag = pd.read_csv("outputs/07_5_optimization/frozen_magnitude_test_results.csv")

def get_clf(fam):
    if fam == "xgboost": return XGBClassifier(random_state=42, n_jobs=-1, eval_metric="logloss")
    elif fam == "catboost": return CatBoostClassifier(random_seed=42, verbose=0, thread_count=-1)
    elif fam == "lightgbm": return LGBMClassifier(random_state=42, n_jobs=-1, verbose=-1)
    elif fam == "random_forest": return RandomForestClassifier(random_state=42, n_jobs=-1)
    else: return XGBClassifier(random_state=42, n_jobs=-1, eval_metric="logloss")

lines = []
for idx, r in df_clf.iterrows():
    h = r["horizon"]
    t_base = r["target"]
    target_col = r["target_col"]
    
    tr = pd.read_csv(f"{root}/train_{h}_selected.csv")
    te = pd.read_csv(f"{root}/test_{h}_selected.csv")
    
    non_feature_cols = ["project_id", "snapshot_date", f"combined_deterioration_{h}", f"schedule_deterioration_{h}", f"cost_deterioration_{h}", f"additional_delay_months_{h}", f"cost_increase_pct_{h}"]
    feature_cols = [c for c in tr.columns if c not in non_feature_cols]
    
    mask_tr = tr[target_col].notnull().values
    mask_te = te[target_col].notnull().values
    
    X_tr = tr.loc[mask_tr, feature_cols].values
    y_tr = tr.loc[mask_tr, target_col].values.astype(int)
    X_te = te.loc[mask_te, feature_cols].values
    y_te = te.loc[mask_te, target_col].values.astype(int)
    
    clf = get_clf(r["frozen_model"])
    clf.fit(X_tr, y_tr)
    p_te = clf.predict_proba(X_te)[:, 1]
    
    y_pred = (p_te >= 0.5).astype(int)
    acc = accuracy_score(y_te, y_pred)
    bal_acc = balanced_accuracy_score(y_te, y_pred)
    prec = precision_score(y_te, y_pred, zero_division=0)
    rec = recall_score(y_te, y_pred, zero_division=0)
    f1 = f1_score(y_te, y_pred, zero_division=0)
    
    lines.append({
        "horizon": h.upper(),
        "target": t_base,
        "model": r["frozen_model"],
        "prevalence": f"{np.mean(y_te)*100:.1f}%",
        "raw_accuracy": f"{acc*100:.1f}%",
        "balanced_acc": f"{bal_acc*100:.1f}%",
        "precision": f"{prec*100:.1f}%",
        "recall": f"{rec*100:.1f}%",
        "f1": f"{f1:.3f}",
        "roc_auc": f"{float(r['test_roc_auc']):.3f}",
        "pr_auc": f"{float(r['test_pr_auc']):.3f}",
        "brier": f"{float(r['test_brier']):.3f}"
    })

df_res = pd.DataFrame(lines)
print("=== CLASSIFICATION ACCURACY SUMMARY ===")
print(df_res.to_string(index=False))

print("\n=== MAGNITUDE ACCURACY SUMMARY ===")
mag_lines = []
for idx, r in df_mag.iterrows():
    unit = "months" if "delay" in r["target"] else "%"
    mag_lines.append({
        "horizon": r["horizon"].upper(),
        "target": r["target"],
        "model": r["frozen_model"],
        "test_mae": f"{r['test_mae']:.2f} {unit}",
        "test_med_ae": f"{r['test_med_ae']:.2f} {unit}",
        "test_rmse": f"{r['test_rmse']:.2f} {unit}",
        "test_r2": f"{r['test_r2']:.3f}"
    })
print(pd.DataFrame(mag_lines).to_string(index=False))
