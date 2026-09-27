# Machine Learning Performance Benchmark & Model Audit
## MoSPI Infrastructure Project Predictive Early-Warning Engine
### Smart India Hackathon — Problem Statement 26103 (PS 26103)

---

## 1. Experimental Methodology & Evaluation Protocol

To deliver a government-grade predictive engine for the **Ministry of Statistics and Programme Implementation (MoSPI)**, the model development workflow strictly enforced rigorous machine learning practices:

1. **Strict Temporal Splitting**: The dataset was split chronologically by quarterly snapshot date. No future project snapshots were exposed during the training of earlier models.
2. **Untouched Test Dataset**: The final test partition remained completely frozen and uninspected until all model selection, hyperparameter tuning, and probability calibration decisions were finalized.
3. **Primary Evaluation Metric**: Because project delay and cost deterioration events are class-imbalanced, **Validation Precision-Recall Area Under the Curve (PR-AUC)** served as the primary optimization metric, supported by ROC-AUC, Brier score, and Expected Calibration Error (ECE).
4. **Probability Calibration**: Every candidate classifier was benchmarked against Platt Sigmoid Scaling and Isotonic Regression trained exclusively on **5-fold Out-Of-Fold (OOF)** predictions.

---

## 2. Model Family Hyperparameter Optimization

Across 5 strategic prediction horizons (3M, 6M, 12M, 15M, and 18M), **405 systematic optimization trials** were conducted across 5 competitive model families:

| Model Family | Search Space & Key Hyperparameters | Rationale for Problem Statement 26103 |
|---|---|---|
| **CatBoost** | `iterations` $\in [250, 450]$, `depth` $\in [4, 6]$, `learning_rate` $\in [0.03, 0.05]$, `l2_leaf_reg` $\in [3, 6]$, class weighting (`Balanced`, `None`) | Exceptional handling of high-cardinality categorical features (e.g. Ministry, implementing agency, state, sector). |
| **XGBoost** | `n_estimators` $\in [150, 300]$, `max_depth` $\in [4, 6]$, `learning_rate` $\in [0.03, 0.05]$, `subsample` $\in [0.7, 0.85]$, `scale_pos_weight` tuned to class imbalance | Robust gradient-boosted trees with explicit regularization ($\alpha, \lambda$) preventing overfitting on noisy telemetry. |
| **LightGBM** | `n_estimators` $\in [150, 300]$, `num_leaves` $\in [25, 45]$, `max_depth` $\in [5, 7]$, `min_child_samples` $\in [20, 40]$ | Fast histogram-based binning ideal for continuous financial ratios and velocity indicators. |
| **Random Forest** | `n_estimators` $\in [200, 250]$, `max_depth` $\in [8, 16]$, `min_samples_split` $\in [5, 10]$, `class_weight` (`balanced_subsample`) | Strong bagging baseline providing high variance reduction across fluctuating reporting quarters. |
| **Logistic Regression** | $C \in [0.01, 10.0]$, Penalties $\in [\text{L1}, \text{L2}]$, Solvers $\in [\text{liblinear}, \text{lbfgs}]$, `class_weight` $\in [\text{balanced}, \text{None}]$ | Parametric linear baseline ensuring that complex tree ensembles deliver demonstrable empirical lift. |

---

## 3. Classification Benchmark (Untouched Frozen Test Set)

The table below summarizes the frozen classification results across all 5 prediction horizons and 3 target definitions:

| Horizon | Target Phenomenon | Frozen Winning Model | Calibration | Val PR-AUC | Val ROC-AUC | Test PR-AUC | Test ROC-AUC | Test Brier Score | Test Log Loss | Test ECE |
|:---:|:---|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **3M** | `combined_deterioration` | `xgboost` | `none` | 0.3978 | 0.7646 | **0.6302** | **0.8023** | 0.1610 | 0.4866 | 0.0364 |
| **3M** | `schedule_deterioration` | `catboost` | `none` | 0.3922 | 0.7754 | **0.6591** | **0.8172** | 0.1550 | 0.4716 | 0.0523 |
| **3M** | `cost_deterioration` | `catboost` | `none` | 0.1105 | 0.7340 | **0.0213** | **0.6682** | 0.0276 | 0.1110 | 0.0421 |
| **6M** | `combined_deterioration` | `catboost` | `none` | 0.6416 | 0.7900 | **0.6461** | **0.6881** | 0.2478 | 0.6949 | 0.1528 |
| **6M** | `schedule_deterioration` | `catboost` | `isotonic` | 0.6410 | 0.8055 | **0.3880** | **0.6151** | 0.2284 | 0.6585 | 0.1268 |
| **6M** | `cost_deterioration` | `ensemble_val_weighted` | `none` | 0.1333 | 0.7311 | **0.4376** | **0.6840** | 0.2438 | 0.8583 | 0.2275 |
| **12M** | `combined_deterioration` | `catboost` | `none` | 0.7715 | 0.7584 | **0.9093** | **0.8197** | 0.1603 | 0.4991 | 0.1422 |
| **12M** | `schedule_deterioration` | `catboost` | `none` | 0.7136 | 0.7578 | **0.8904** | **0.8079** | 0.1675 | 0.5115 | 0.1092 |
| **12M** | `cost_deterioration` | `random_forest` | `none` | 0.3092 | 0.6954 | **0.4867** | **0.7178** | 0.2257 | 0.6844 | 0.1839 |
| **15M** | `combined_deterioration` | `xgboost` | `platt_sigmoid` | 0.8626 | 0.7853 | **0.8610** | **0.7579** | 0.2133 | 0.6167 | 0.2098 |
| **15M** | `schedule_deterioration` | `xgboost` | `platt_sigmoid` | 0.8611 | 0.7958 | **0.7545** | **0.7070** | 0.2267 | 0.6477 | 0.1301 |
| **15M** | `cost_deterioration` | `ensemble_val_weighted` | `platt_sigmoid` | 0.4090 | 0.7883 | **0.5004** | **0.6825** | 0.2714 | 0.9091 | 0.2473 |
| **18M** | `combined_deterioration` | `xgboost` | `none` | 0.8803 | 0.7837 | **0.8368** | **0.6566** | 0.2108 | 0.6085 | 0.1674 |
| **18M** | `schedule_deterioration` | `lightgbm` | `none` | 0.8812 | 0.8006 | **0.7236** | **0.5988** | 0.2479 | 0.6937 | 0.1660 |
| **18M** | `cost_deterioration` | `random_forest` | `platt_sigmoid` | 0.5052 | 0.8101 | **0.5550** | **0.6839** | 0.2603 | 0.8297 | 0.2225 |

---

## 4. Probability Calibration Analysis

Accurate probabilities are critical for government decision-makers. A raw probability of 70% must correspond to an empirical event frequency of ~70%.

- **Platt Sigmoid Scaling**: Re-scales raw margin scores using a logistic regression fit on OOF validation predictions:
  $$P(Y=1 \mid f(\mathbf{x})) = \frac{1}{1 + \exp(A \cdot f(\mathbf{x}) + B)}$$
- **Isotonic Regression**: Non-parametric piecewise constant isotonic fit minimizing squared error without assuming a sigmoid curve.
- **Results**: Platt Sigmoid reduced Brier score on `15m_combined` from 0.1743 to 0.1732, on `15m_cost` from 0.1031 to 0.0985, and on `18m_cost` from 0.1029 to 0.0997. Isotonic regression significantly reduced Brier score on `6m_schedule` by **+0.0254** (from 0.1885 down to 0.1631).

---

## 5. Magnitude Modeling (Two-Stage Hurdle Architecture)

Predicting the continuous magnitude of project delays (additional delay months) and cost escalation (cost increase %) presents a severe zero-inflation challenge: a large proportion of projects incur zero additional delay over a 3-month window, but distressed initiatives experience heavy right-skewed tails.

### The Two-Stage Formulation
1. **Stage 1 (Hurdle Classifier)**: A calibrated classifier $M_1$ predicts the probability of positive deterioration $p = P(\Delta > 0 \mid \mathbf{x})$.
2. **Stage 2 (Conditional Regressor)**: A continuous regressor $M_2$ trained exclusively on cases with $\Delta > 0$ models the conditional magnitude in log space:
   $$\hat{y}_{\log} = M_2(\mathbf{x})$$
3. **Compound Expected Value**:
   $$\hat{Y} = p \times \max\left(0, \exp(\hat{y}_{\log}) - 1\right)$$

### Magnitude Model Test Results

| Horizon | Quantity | Frozen Model | Architecture | Transform | Test MAE | Test Median AE | Test P90 Error |
|:---:|:---|:---|:---:|:---:|:---:|:---:|:---:|
| **3M** | `additional_delay_months` | `lightgbm` | `direct` | `raw` | **3.69 Mo** | 0.49 Mo | 10.90 Mo |
| **3M** | `cost_increase_pct` | `lightgbm` | `direct` | `raw` | **0.48%** | 0.02% | 0.17% |
| **6M** | `additional_delay_months` | `lightgbm` | `direct` | `log1p` | **4.33 Mo** | 1.62 Mo | 10.18 Mo |
| **6M** | `cost_increase_pct` | `lightgbm` | `direct` | `raw` | **11.78%** | 0.04% | 31.01% |
| **12M** | `additional_delay_months` | `lightgbm` | `direct` | `log1p` | **6.07 Mo** | 3.40 Mo | 12.72 Mo |
| **12M** | `cost_increase_pct` | `ridge` | `direct` | `log1p` | **12.58%** | 0.20% | 32.52% |
| **15M** | `additional_delay_months` | `xgboost` | `two_stage` | `log1p` | **6.72 Mo** | 4.68 Mo | 12.79 Mo |
| **15M** | `cost_increase_pct` | `lightgbm` | `direct` | `log1p` | **13.99%** | 0.46% | 37.93% |
| **18M** | `additional_delay_months` | `xgboost` | `two_stage` | `log1p` | **7.52 Mo** | 5.61 Mo | 14.11 Mo |
| **18M** | `cost_increase_pct` | `lightgbm` | `direct` | `log1p` | **15.15%** | 0.61% | 42.10% |

---

## 6. Explainable AI & TreeSHAP Attribution

To ensure transparency and eliminate "black-box" concerns during Ministry audits, PAIMANA computes exact **TreeSHAP values** for every project prediction:
- **Additivity Property**: The sum of SHAP feature attributions equals the difference between the model's prediction and the expected baseline:
  $$f(\mathbf{x}) = \phi_0 + \sum_{i=1}^{M} \phi_i(\mathbf{x})$$
- **Top Correlated Risk Drivers**:
  1. `financial_physical_burn_gap`: Divergence between financial expenditure pace and verified physical progress.
  2. `cumulative_delay_months_lag`: Past delay history as a non-linear compounding risk accelerator.
  3. `state_nodal_clearance_index`: Geospatial delay factor associated with regional land acquisition pacing.
  4. `contractor_dispute_indicator`: Administrative flags indicating active arbitration or tender retendering.
  5. `environmental_forest_clearance_pending`: Regulatory clearances pending across inter-state corridors.
