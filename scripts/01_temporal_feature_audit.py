import os
import pandas as pd

def main():
    root = "data_bundle/SIH26103_project_data_bundle_v3_2_cost_corrected/06_feature_selection"
    horizons = ["3m", "6m", "12m", "15m", "18m"]
    
    trajectory_keywords = [
        "velocity", "acceleration", "slip", "pressure", "ratio", "age",
        "trend", "consecutive", "persistence", "persistent", "recurrence",
        "first", "latest", "time_since", "revision", "growth", "change"
    ]
    
    print("=" * 60)
    print("STAGE 1: TEMPORAL FEATURE AUDIT")
    print("=" * 60)
    
    for h in horizons:
        feat_path = os.path.join(root, f"selected_features_{h}.csv")
        df_feat = pd.read_csv(feat_path)
        feat_names = df_feat.iloc[:, 0].tolist()
        print(f"\nHorizon {h.upper()}: Total {len(feat_names)} selected features")
        
        trajectory_matches = [f for f in feat_names if any(kw in f.lower() for kw in trajectory_keywords)]
        print(f"  Trajectory & Temporal Dynamics Features found: {len(trajectory_matches)}")
        print(f"  Sample trajectory features: {trajectory_matches[:8]}")
        
        # Check target leakage: any feature mentioning target names
        leak_candidates = [f for f in feat_names if "deterioration" in f.lower() or "additional_delay" in f.lower() or "cost_increase" in f.lower()]
        if leak_candidates:
            print(f"  ALERT: Potential target leak in feature names: {leak_candidates}")
        else:
            print("  Leakage check: ZERO target leakage keywords detected in selected features.")

if __name__ == "__main__":
    main()
