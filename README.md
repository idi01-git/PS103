<div align="center">

# 🏛️ PAIMANA // MoSPI Infrastructure Intelligence Platform
### AI/ML-Powered Predictive Early-Warning, Multi-Horizon Risk Runway & Officer Decision Copilot
**Smart India Hackathon Submission — Problem Statement ID: 26103 (PS 26103)**  
*Ministry of Statistics and Programme Implementation (MoSPI) | Online Central Monitoring System (OCMS)*

[![React](https://img.shields.io/badge/Frontend-React%2018%20%7C%20Vite%205-blue.svg)](https://reactjs.org/)
[![Database](https://img.shields.io/badge/Database-Neon%20Serverless%20Postgres-00e599.svg)](https://neon.tech/)
[![ML Engine](https://img.shields.io/badge/ML%20Engine-CatBoost%20%7C%20XGBoost%20%7C%20LightGBM-ff6b6b.svg)](https://catboost.ai/)
[![LLM Decision](https://img.shields.io/badge/AI%20Copilot-Groq%20GPTOSS--120B-orange.svg)](https://groq.com/)
[![Audit Status](https://img.shields.io/badge/Integrity%20Audit-24%2F24%20Checks%20Passed-emerald.svg)](#24-point-integrity-audit)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

[Live Demonstration](#live-demonstration) • [System Architecture](#system-architecture) • [ML Performance Benchmark](#machine-learning-benchmark) • [Installation & Setup](#getting-started) • [Documentation](docs/ARCHITECTURE.md)

---

</div>

## 📌 Executive Summary

India's national infrastructure pipeline involves thousands of concurrent capital projects across 35+ Ministries and Departments, representing over **₹32 Lakh Crore** in sanctioned capital. However, administrative monitoring systems (such as MoSPI OCMS) historically rely on lag-indicator reporting and static milestone updates, leading to systemic blind spots where delay risks compound unnoticed until scheduled completion deadlines elapse.

**PAIMANA (Predictive Analytics & Infrastructure Monitoring with Actionable National Architecture)** solves **SIH Problem Statement 26103** by replacing passive retrospective tracking with an authoritative, **three-layer predictive early-warning platform**:

1. **Statistical EVM Baseline (Layer 1)**: Real-time Earned Value Management computing Cost Performance Index (CPI), Schedule Performance Index (SPI), Cost/Schedule Variance, and Cash Burn Velocity per rupee spent.
2. **Multi-Horizon Machine Learning Runway (Layer 2)**: Rigorously calibrated ensembles (CatBoost, XGBoost, LightGBM, and Random Forest) forecasting schedule deterioration and cost overrun risks across **3-month, 6-month, 12-month, 15-month, and 18-month** forward horizons, coupled with **TreeSHAP explainability** linking predictions directly to administrative field records.
3. **Executive Officer Decision Copilot (Layer 3)**: A decision-support assistant powered by **GPTOSS-120B on Groq**, synthesizing quantitative EVM baselines, ML uncertainty envelopes, and verified field citations into actionable 30-day intervention memos aligned with **PM-GatiShakti** inter-ministerial protocols.

---

## 🎯 Problem Statement Alignment (PS 26103)

| SIH 26103 Requirement | PAIMANA Production Implementation |
|---|---|
| **Authoritative National Dataset** | Trained, validated, and evaluated on **56,949 quarterly project snapshots** across **4,547 unique capital projects** from official MoSPI OCMS records (100% real empirical data, 0 synthetic rows). |
| **Multi-Horizon Forecasting** | Independent classification and magnitude models for **3M, 6M, 12M, 15M, and 18M** forward runway horizons. |
| **Early Warning & Bottleneck Detection** | Multi-class risk categorization (`Normal`, `Watchlist`, `Critical`) with 84.2% bottleneck detection accuracy and ROC-AUC up to 0.82. |
| **Root-Cause Explainability** | Non-causal TreeSHAP factor attributions combined with exact joins to **3,223 verified PAIMANA quarterly issue records**. |
| **Operational Feasibility for Officers** | Interactive GIS Choropleth Map, side-by-side split runway graph with uncertainty intervals, and 1-click executive PDF dossier generation. |
| **Zero Data Leakage / Audit Standard** | **24 / 24 Automated Integrity Checks Passed**: strict temporal split isolation, zero target leakage, and single frozen test set evaluation. |

---

## 🏗️ System Architecture

```mermaid
flowchart TB
    subgraph DataIngestion["1. DATA LAYER (MoSPI OCMS & PAIMANA)"]
        D1["56,949 Quarterly Snapshots<br/>4,547 Infrastructure Projects"] --> D2["Temporal Feature Pipeline<br/>(112 Features / Horizon)"]
        D2 --> D3["Train / Validation / Frozen Test Split<br/>(Strict Temporal Isolation)"]
    end

    subgraph MLEngine["2. MULTI-HORIZON ML ENSEMBLE ENGINE"]
        M1["Hyperparameter Optimization<br/>(405 Trials across 5 Families)"]
        M2["Calibrated Classification Ensembles<br/>(CatBoost + XGBoost + Platt Sigmoid)"]
        M3["Two-Stage Magnitude Regressors<br/>(Log1p Cost Overrun & Delay Months)"]
        M4["Explainable AI (TreeSHAP)<br/>+ 3,223 Issue Evidence Joins"]
        D3 --> M1 --> M2 & M3 --> M4
    end

    subgraph ThreeLayerIntelligence["3. THREE-LAYER DECISION COPILOT"]
        L1["Layer 1: Statistical EVM Baseline<br/>(CPI, SPI, Burn Velocity, Variance)"]
        L2["Layer 2: ML Multi-Horizon Forecast<br/>(3M - 18M Predictive Runway)"]
        L3["Layer 3: GPTOSS-120B Assistant<br/>(Groq-accelerated Executive Memos)"]
    end

    subgraph FrontendPlatform["4. PRODUCTION WEB PLATFORM"]
        F1["Interactive India Map<br/>(Choropleth + 4-Metric Ranking)"]
        F2["Project Portfolio Directory<br/>(1,941 Live Monitored Projects)"]
        F3["Split-View Runway Graph<br/>(Official Baseline vs ML Forecast)"]
        F4["Executive PDF Dossier Exporter<br/>(Printable MoSPI Reports)"]
    end

    subgraph BackendStorage["5. PERSISTENCE & SERVING"]
        DB[("Neon Serverless PostgreSQL<br/>Indexed JSONB + Connection Pooling")]
    end

    M4 --> ThreeLayerIntelligence
    ThreeLayerIntelligence --> DB
    DB <--> FrontendPlatform
```

---

## ✨ Key Platform Features

### 1. Spatial National Choropleth Map & State Telemetry
- **Interactive SVG Canvas**: Full All-India spatial visualization calibrated to official Survey of India boundary representations.
- **Dynamic 4-Metric Ranking Switcher**: Instant live re-sorting by:
  - `Projects`: Volume of monitored capital initiatives.
  - `Capital`: Total sanctioned capex (formatted in Indian Crore / Lakh Crore notation).
  - `Delayed`: Active projects experiencing scheduled deadline breaches.
  - `Risk`: High-risk critical initiatives flagged by ML predictive models.
- **Zero-Friction State Exploration**: Hovering activates active border highlights and telemetry cards; clicking smoothly navigates directly to the state's filtered project portfolio.
- **Dedicated Union Territory Markers**: Specialized precision coordinates for Delhi, Chandigarh, Puducherry, Lakshadweep, Goa, and Daman & Diu.

### 2. 18-Month Predictive Split Runway Graph
- **Baseline vs. ML Divergence**: Visualizes the trajectory between administrative schedule projections and CatBoost/RandomForest forecasted completion dates across 3M, 6M, 12M, 15M, and 18M forward horizons.
- **Confidence Intervals (P10–P90)**: Shaded statistical uncertainty ribbons communicating risk bounds to project directors.
- **Interactive Horizon Scrubber**: Inspect milestone confidence, anticipated additional delay months, and cost escalation at any point in the runway.

### 3. 3-Layer AI Decision Copilot
- **Layer 1 (Statistical EVM)**: Automatically derives Earned Value (EV), Planned Value (PV), Actual Cost (AC), Cost Variance (CV), Schedule Variance (SV), CPI, SPI, and Critical Ratio.
- **Layer 2 (ML Explainability)**: Exposes top TreeSHAP risk factors (contractor dispute weight, environmental clearance hurdles, land acquisition lag) correlated with historical precedents.
- **Layer 3 (Groq GPTOSS-120B Copilot)**: Generates quantitative decision-support memos, root-cause audits, and PM-GatiShakti inter-ministerial resolution protocols with isolated container scrolling that prevents page sliding.

### 4. MoSPI Field Telemetry & Audit Integrity System
- **Transparent Historical Caveats**: Flags and explains anomalous reporting progressions in complex multi-decade megaprojects (e.g. Kudankulam Nuclear Power Plant Units 3–6) with citations directly from MoSPI quarterly PDF releases (2019 to 2026).
- **Data Integrity Status Badges**: Identifies continuous monthly reporting pacing vs. stale quarterly filings.

### 5. Automated Executive Dossier Exporter
- Generates publication-grade executive project intelligence briefs, SHAP risk driver summaries, and state portfolio reports ready for Ministry review meetings.

---

## 📊 Machine Learning Benchmark

Model selection was conducted strictly using **Validation PR-AUC** (with secondary monitoring on ROC-AUC, Brier score, and log-loss). The test dataset remained frozen and unexposed until final evaluation.

### Classification Models (Delay & Deterioration Early-Warning)

| Horizon | Target Quantity | Selected Frozen Model | Calibration Technique | Val PR-AUC | Val ROC-AUC | Test PR-AUC | Test ROC-AUC | Test Brier Score |
|:---:|:---|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| **3M** | `combined_deterioration` | `xgboost` | `none` | **0.3978** | 0.7646 | **0.6302** | 0.8023 | 0.1610 |
| **3M** | `schedule_deterioration` | `catboost` | `none` | **0.3922** | 0.7754 | **0.6591** | 0.8172 | 0.1550 |
| **3M** | `cost_deterioration` | `catboost` | `none` | **0.1105** | 0.7340 | **0.0213** | 0.6682 | 0.0276 |
| **6M** | `combined_deterioration` | `catboost` | `none` | **0.6416** | 0.7900 | **0.6461** | 0.6881 | 0.2478 |
| **6M** | `schedule_deterioration` | `catboost` | `isotonic` | **0.6410** | 0.8055 | **0.3880** | 0.6151 | 0.2284 |
| **6M** | `cost_deterioration` | `ensemble_val_weighted_tree` | `none` | **0.1333** | 0.7311 | **0.4376** | 0.6840 | 0.2438 |
| **12M** | `combined_deterioration` | `catboost` | `none` | **0.7715** | 0.7584 | **0.9093** | 0.8197 | 0.1603 |
| **12M** | `schedule_deterioration` | `catboost` | `none` | **0.7136** | 0.7578 | **0.8904** | 0.8079 | 0.1675 |
| **12M** | `cost_deterioration` | `random_forest` | `none` | **0.3092** | 0.6954 | **0.4867** | 0.7178 | 0.2257 |
| **15M** | `combined_deterioration` | `xgboost` | `platt_sigmoid` | **0.8626** | 0.7853 | **0.8610** | 0.7579 | 0.2133 |
| **15M** | `schedule_deterioration` | `xgboost` | `platt_sigmoid` | **0.8611** | 0.7958 | **0.7545** | 0.7070 | 0.2267 |
| **15M** | `cost_deterioration` | `ensemble_val_weighted_tree` | `platt_sigmoid` | **0.4090** | 0.7883 | **0.5004** | 0.6825 | 0.2714 |
| **18M** | `combined_deterioration` | `xgboost` | `none` | **0.8803** | 0.7837 | **0.8368** | 0.6566 | 0.2108 |
| **18M** | `schedule_deterioration` | `lightgbm` | `none` | **0.8812** | 0.8006 | **0.7236** | 0.5988 | 0.2479 |
| **18M** | `cost_deterioration` | `random_forest` | `platt_sigmoid` | **0.5052** | 0.8101 | **0.5550** | 0.6839 | 0.2603 |

### Magnitude Models (Continuous Delay Months & Cost Increase %)

| Horizon | Target Metric | Model Architecture | Transform | Test MAE | Test Median AE | Test P90 Error |
|:---:|:---|:---|:---:|:---:|:---:|:---:|
| **3M** | `additional_delay_months` | `lightgbm` (Direct) | `raw` | **3.69 Mo** | 0.49 Mo | 10.90 Mo |
| **3M** | `cost_increase_pct` | `lightgbm` (Direct) | `raw` | **0.48%** | 0.02% | 0.17% |
| **6M** | `additional_delay_months` | `lightgbm` (Direct) | `log1p` | **4.33 Mo** | 1.62 Mo | 10.18 Mo |
| **6M** | `cost_increase_pct` | `lightgbm` (Direct) | `raw` | **11.78%** | 0.04% | 31.01% |
| **12M** | `additional_delay_months` | `lightgbm` (Direct) | `log1p` | **6.07 Mo** | 3.40 Mo | 12.72 Mo |
| **12M** | `cost_increase_pct` | `ridge` (Direct) | `log1p` | **12.58%** | 0.20% | 32.52% |
| **15M** | `additional_delay_months` | `xgboost` (Two-Stage) | `log1p` | **6.72 Mo** | 4.68 Mo | 12.79 Mo |
| **15M** | `cost_increase_pct` | `lightgbm` (Direct) | `log1p` | **13.99%** | 0.46% | 37.93% |
| **18M** | `additional_delay_months` | `xgboost` (Two-Stage) | `log1p` | **7.52 Mo** | 5.61 Mo | 14.11 Mo |
| **18M** | `cost_increase_pct` | `lightgbm` (Direct) | `log1p` | **15.15%** | 0.61% | 42.10% |

---

## 🛡️ 24-Point Integrity Audit

To satisfy the highest standards of regulatory compliance for government intelligence tools, PAIMANA enforces **24 automated automated verification checks** (`scripts/08_final_audit_and_report.py`):

```json
{
  "check_01_no_future_leakage": "PASS - Zero future-dated feature columns detected across 112 features.",
  "check_02_no_target_leakage": "PASS - Zero target column leakage detected in feature space.",
  "check_03_no_test_set_tuning": "PASS - Model selection derived strictly from validation PR-AUC/Brier.",
  "check_04_no_nan_inf_in_predictions": "PASS - Complete numerical outputs across all 4,547 projects.",
  "check_05_no_missing_required_features": "PASS - Feature definitions verified across all inference files.",
  "check_06_correct_feature_ordering": "PASS - Canonical feature vector indices preserved.",
  "check_07_correct_model_to_horizon_mapping": "PASS - Unique models calibrated per individual horizon.",
  "check_08_correct_target_to_horizon_mapping": "PASS - All 15 classification & 10 regression targets matched.",
  "check_09_correct_calibration_mapping": "PASS - Fitted strictly on 5-fold training out-of-fold data.",
  "check_10_correct_project_ids": "PASS - 100% matched to authoritative MoSPI OCMS corpus.",
  "check_11_correct_snapshot_dates": "PASS - Valid bounds verified (2019-06-30 to 2026-03-31).",
  "check_12_correct_3m_definition": "PASS - Exact calendar quarter mapping verified.",
  "check_13_correct_multihorizon_definitions": "PASS - 6M, 12M, 15M, 18M targets aligned.",
  "check_14_correct_issue_evidence_joins": "PASS - 3,223 verified PAIMANA records linked without duplicates.",
  "check_15_no_duplicate_project_snapshots": "PASS - Zero duplicate primary keys.",
  "check_16_non_negative_delays": "PASS - Magnitude predictions post-clipped at >= 0.0.",
  "check_17_monotonicity_sanity": "PASS - Horizon risk increases monotonically with runway distance.",
  "check_18_confidence_intervals_valid": "PASS - P10 <= Median <= P90 verified across all forecasts.",
  "check_19_evm_consistency": "PASS - Mathematical consistency between CPI, SPI, AC, EV, and PV verified.",
  "check_20_currency_scale_correctness": "PASS - Crore scale verified with zero unit conversion drift.",
  "check_21_shap_sum_to_margin": "PASS - Additivity property verified within tolerance.",
  "check_22_api_key_security": "PASS - Zero plain-text credentials in repository; masked storage.",
  "check_23_serverless_resilience": "PASS - Neon PostgreSQL connection pool auto-reconnection active.",
  "check_24_browser_compatibility": "PASS - Zero viewport jitter; isolated container scrolling."
}
```

---

## 💻 Tech Stack

### Web Application & User Interface
- **Framework**: [React 18](https://reactjs.org/) + [Vite 5](https://vitejs.dev/) (Sub-second HMR & optimized production tree-shaking)
- **Styling**: [TailwindCSS 3.4](https://tailwindcss.com/) + Custom Design Tokens (Subtle glassmorphism, geometric typography, MoSPI Government design standard)
- **Spatial Geospatial Mapping**: [D3.js (d3-geo)](https://d3js.org/) + Hand-optimized India GeoJSON topology
- **Interactive Visualizations**: [Recharts](https://recharts.org/) + Pure SVG Rendering
- **Icons & Motion**: [Lucide React](https://lucide.dev/) + [Framer Motion](https://www.framer.com/motion/)

### Persistence & Data Serving
- **Primary Database**: [Neon Serverless PostgreSQL](https://neon.tech/) (`@neondatabase/serverless`)
- **Data Formats**: High-performance JSONB storage + Indexed relational schemas (`national_projects`, `state_summaries`, `ministry_summaries`)
- **Offline / Resilience Fallback**: Synchronized in-memory static datasets (`projectsData.js`) ensuring 100% platform availability even during connectivity interruptions

### Machine Learning & Artificial Intelligence
- **Gradient Boosted Decision Trees**: [CatBoost](https://catboost.ai/), [XGBoost](https://xgboost.readthedocs.io/), [LightGBM](https://lightgbm.readthedocs.io/)
- **Ensembles & Calibration**: Scikit-Learn Platt Sigmoid & Isotonic Regression
- **Explainable AI**: TreeSHAP (SHapley Additive exPlanations)
- **Executive Copilot Engine**: [Groq Cloud](https://groq.com/) API running open-weights **GPTOSS-120B** with streaming officer memo synthesis

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Python** *(Optional, for retraining ML models)*: v3.10+

### 1. Clone the Repository
```bash
git clone https://github.com/idi01-git/PS103.git
cd PS103
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory (refer to `.env.example`):
```env
# Neon Serverless PostgreSQL Connection String (Optional, fallback provided)
DATABASE_URL=postgresql://user:password@ep-sample.ap-southeast-1.aws.neon.tech/paimana?sslmode=require

# Groq Cloud API Key for Layer 3 Decision Copilot (Optional)
VITE_GROQ_API_KEY=gsk_your_groq_api_key_here
```

> **Note**: PAIMANA includes automatic fallback datasets and built-in API token handling. The web application runs fully out-of-the-box even without external cloud credentials!

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Production Build
```bash
npm run build
npm run preview
```

---

## 📂 Repository Directory Layout

```
PS103/
├── data_bundle/               # Authoritative MoSPI raw & feature-selected datasets (v3.2)
├── docs/                      # Comprehensive technical documentation
│   ├── ARCHITECTURE.md        # Complete system design & data pipeline specifications
│   ├── MODEL_PERFORMANCE.md   # Exact test/validation metrics & calibration benchmarks
│   └── USER_GUIDE.md          # Officer user manual & platform walkthrough
├── outputs/                   # Machine learning artifacts & frozen model decisions
│   ├── 07_5_optimization/     # Model tuning trials, calibration benchmarks & decisions
│   └── 08_production_inference/ # Master inference dataset & 24-point audit report
├── public/                    # Static assets & government typography
├── scripts/                   # Python ML training & Node.js DB synchronization scripts
│   ├── 00_extract_bundle.py   # Dataset unbundling & SHA256 checksum verification
│   ├── 02_model_optimization.py # Hyperparameter tuning across 5 model families
│   ├── 03_ensembles_and_calibration.py # OOF ensemble construction & Brier minimization
│   ├── 04_magnitude_models.py # Two-stage log1p delay & cost overrun regressors
│   ├── 05_freeze_and_test_eval.py # Single frozen test evaluation
│   ├── 06_production_inference.py # Full master inference batch generation
│   ├── 08_final_audit_and_report.py # Automated 24-point integrity audit runner
│   ├── bulk_seed_all_neon.js  # Neon DB population script
│   └── verify_neondb_service.js # Live database healthcheck script
├── src/                       # Frontend application source code
│   ├── components/            # UI components (IndiaMap, ProjectListing, Copilot, etc.)
│   ├── data/                  # Static geojson and pre-computed project aggregates
│   ├── services/              # Neon DB and Groq LLM integration services
│   ├── utils/                 # Indian currency formatters & motion tokens
│   ├── App.jsx                # Main application orchestrator & tab router
│   ├── main.jsx               # Application entrypoint
│   └── index.css              # Global styles & Tailwind directives
├── index.html                 # HTML shell with accessibility and SEO tags
├── package.json               # Node.js project manifest & scripts
├── tailwind.config.js         # Custom government design palette & typography
├── vercel.json                # Production deployment configuration
└── vite.config.js             # Vite configuration with chunk splitting
```

---

## 👥 Smart India Hackathon Submission Details

- **Problem Statement ID**: `26103` (`PS 26103` / `PS103`)
- **Theme**: Transportation, Infrastructure & Logistics / Smart Governance
- **Target Organization**: Ministry of Statistics and Programme Implementation (MoSPI), Government of India
- **Repository**: [https://github.com/idi01-git/PS103](https://github.com/idi01-git/PS103)

---

<div align="center">
  <sub>Developed for Smart India Hackathon. Dedicated to transparent, data-driven national infrastructure delivery for India.</sub>
</div>
