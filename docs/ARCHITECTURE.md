# Technical System Architecture & Engineering Specifications
## MoSPI Infrastructure Predictive Early-Warning Platform (PAIMANA)
### Smart India Hackathon — Problem Statement 26103 (PS 26103)

---

## 1. Architectural Overview & Design Philosophy

The PAIMANA system is engineered to solve the systemic operational challenges identified in **SIH Problem Statement 26103**: transforming legacy, lag-indicator infrastructure project monitoring (MoSPI OCMS) into a proactive, multi-horizon predictive early-warning platform.

```
+-------------------------------------------------------------------------------+
|                             OFFICER CLIENT BROWSER                            |
|  +---------------------+  +----------------------+  +----------------------+  |
|  | Spatial India Map   |  | 18M Runway Graph     |  | 3-Layer AI Copilot   |  |
|  | (D3 Choropleth GIS) |  | (Split Curve + CI)   |  | (Groq GPTOSS-120B)   |  |
|  +---------------------+  +----------------------+  +----------------------+  |
+-------------------------------------------------------------------------------+
                                        | (HTTPS / WSS)
+-------------------------------------------------------------------------------+
|                            APPLICATION LAYER (VITE/REACT)                     |
|  - Tab Navigator & State Synchronizer (`App.jsx`)                             |
|  - Responsive Data Cache & Auto-Reconnect Bridge                              |
|  - Officer Dossier PDF Generator & Telemetry Audit Engine                     |
+-------------------------------------------------------------------------------+
                                        | (Direct TLS Serverless SQL)
+-------------------------------------------------------------------------------+
|                         SERVERLESS PERSISTENCE (NEON POSTGRES)                |
|  - Connection Pooling with zero-cold-start WebSockets                         |
|  - `national_projects`: 1,941 active projects with full ML inference vectors  |
|  - `state_summaries`: 35 States & UT aggregates                               |
|  - `ministry_summaries`: 35 Central Ministries & Departments                  |
+-------------------------------------------------------------------------------+
                                        ^
                                        | (Batch Production Ingestion)
+-------------------------------------------------------------------------------+
|                          OFFLINE ML & INFERENCE PIPELINE                      |
|  - 56,949 Quarterly Snapshots across 4,547 Unique Projects (2019-2026)        |
|  - 5 Prediction Horizons: 3M, 6M, 12M, 15M, 18M                               |
|  - CatBoost / XGBoost / LightGBM / Random Forest + Platt/Isotonic Calibration |
|  - Two-Stage Magnitude Hurdle Models for Delay Months & Cost Escalation       |
|  - TreeSHAP Explainability Vectors + 3,223 PAIMANA Issue Records Join         |
+-------------------------------------------------------------------------------+
```

---

## 2. Data Engineering & Preprocessing Pipeline

### 2.1 The Automated PDF Extraction & Ingestion Engine
Historically, MoSPI monitoring data is distributed as massive quarterly PDF review reports (running **800+ pages per quarter**, totaling **over 24,000+ pages across 7 years**) rather than machine-readable databases. PAIMANA implements an automated Python extraction engine:
- **36 Quarterly PDF Publications (2019–2026)**: Ingested and parsed over **24,000+ pages** (800+ pages per quarterly release) using coordinate projection tracking (`pdfplumber` / `PyMuPDF`) to handle multi-page tabular spillage without vertical gridlines.
- **Financial Normalization & Date Disambiguation**: Standardized diverse historical column schemas, currency units (converting Lakhs and Crores to uniform ₹ Crore), and calendar milestones.
- **Qualitative NLP Bottleneck Mining**: Regex and keyword taxonomies parsed narrative officer remarks to extract **3,223 verified qualitative issue records** (land acquisition disputes, forest clearances, contractor terminations) with exact page-level provenance.
- **Longitudinal Entity Resolution**: Linked 4,547 unique capital projects across 36 consecutive snapshot dates using sanitized OCMS codes and Levenshtein string matching ($\ge 0.92$ threshold).
- *For complete technical extraction specifications, see [`docs/DATA_EXTRACTION_PIPELINE.md`](DATA_EXTRACTION_PIPELINE.md).*

### 2.2 The Authoritative MoSPI OCMS Dataset
The training and validation corpus utilizes the corrected **v3.2 data bundle (`SIH26103_project_data_bundle_v3_2_cost_corrected.zip`)**:
- **Temporal Span**: Q1 2019–20 through Q4 2025–26 (quarterly snapshots dated through 2026-03-31).
- **Volume**: 56,949 longitudinal project observation rows.
- **Entities**: 4,547 unique Central Sector infrastructure projects costing ₹150 Crore and above.
- **Empirical Authenticity**: 100% genuine administrative records; zero synthetic or imputed dummy rows.

### 2.2 Feature Selection & Temporal Isolation
To prevent any future target leakage (one of the critical failure modes in predictive time-series models), feature sets were curated through a strict temporal audit:
- **Feature Space**: 112 features (3M), 109 features (6M), 107 features (12M), 110 features (15M), 110 features (18M).
- **Leakage Prevention**: All features are strictly contemporaneous or historical with respect to the snapshot timestamp $T_0$. All post-$T_0$ financial disbursements, post-$T_0$ milestone approvals, and target columns (`schedule_deterioration`, `cost_deterioration`, etc.) are isolated and purged from the input matrix.
- **Key Feature Categories**:
  1. *Physical & Financial Velocity*: Ratio of expenditure to anticipated cost, physical progress percentage velocity over past 2 and 4 quarters.
  2. *Earned Value Indicators*: CPI, SPI, Cost Variance (CV), Schedule Variance (SV), To-Complete Performance Index (TCPI).
  3. *Institutional Profile*: Sanctioning Ministry, implementing agency, project type (Greenfield vs. Brownfield), nodal state, and sector-specific risk baselines.
  4. *Delay & Escalation History*: Cumulative delay months accumulated to date, ratio of current cost to original approved cost, revision counts.
  5. *Field Telemetry & Administrative Records*: Linked indicators of land acquisition status, forest/environmental clearances, contractor dispute flags, and law-and-order encumbrances.

---

## 3. The 3-Layer Decision-Support Architecture

PAIMANA's flagship analytical innovation is the **Three-Layer Decision Framework**, which provides infrastructure executives with progressive depth—from deterministic statistics to explainable AI and executive LLM memos:

```
[ LAYER 1: DETERMINISTIC ]  -->  [ LAYER 2: PREDICTIVE ML ]  -->  [ LAYER 3: EXECUTIVE LLM ]
Earned Value Management          Calibrated Gradient Boosted       Groq GPTOSS-120B Copilot
- CPI & SPI Indexes              - 3M to 18M Runway Forecasts      - Plain-English Executive Memos
- Cost & Schedule Variance       - TreeSHAP Risk Attribution       - PM-GatiShakti Protocol Actions
- Cash Burn Velocity             - Two-Stage Delay Regressors      - Isolated Container Scrolling
```

### Layer 1: Earned Value Management (EVM) Baseline
Derives standard ANSI/PMI-compliant project accounting metrics computed dynamically from active project financial attributes:
- **Planned Value ($PV$)**: Expected spend baseline given elapsed project schedule.
- **Earned Value ($EV$)**: Value of physical work completed to date:
  $$EV = \text{Current Approved Cost} \times \left(\frac{\text{Physical Progress \%}}{100}\right)$$
- **Actual Cost ($AC$)**: Cumulative expenditure booked to date.
- **Cost Performance Index ($CPI$)**: Efficiency of capital deployment:
  $$CPI = \frac{EV}{AC}$$
  *(A $CPI < 1.0$ indicates capital over-expenditure per unit of physical output).*
- **Schedule Performance Index ($SPI$)**: Efficiency of timeline pacing:
  $$SPI = \frac{EV}{PV}$$
  *(An $SPI < 1.0$ indicates timeline slippage against administrative milestones).*
- **Cash Burn Velocity**: Net monthly financial burn rate compared against physical milestone completion rate.

### Layer 2: Multi-Horizon Machine Learning Ensembles
Provides forward-looking risk probabilities across 5 distinct strategic horizons (3M, 6M, 12M, 15M, 18M):
- **Classification Engine**: Predicts probabilities of:
  - `schedule_deterioration`: Project schedule slips further beyond current baseline.
  - `cost_deterioration`: Project anticipates further budget escalation.
  - `combined_deterioration`: Joint compound risk of cost and timeline failure.
- **Two-Stage Hurdle Magnitude Regression**:
  To address the extreme skew in delay months (many projects have 0 additional delay, while distressed projects have long tails up to 100+ months):
  $$\hat{Y}_{\text{delay}} = P(\text{delay} > 0) \times \exp\left(\hat{f}_{\text{regress}}(\mathbf{x})\right) - 1$$
- **Explainable AI (TreeSHAP)**: Extracts exact Shapley values identifying the top 5 factors inflating the project's risk score, directly correlated with 3,223 verified MoSPI field records.

### Layer 3: Executive LLM Decision Copilot
Powered by open-weights **GPTOSS-120B hosted on Groq Cloud** for high-throughput, low-latency inference:
- Context Injection: Synthesizes Layer 1 EVM metrics, Layer 2 ML runway probabilities, TreeSHAP risk factors, and project metadata into a structured system prompt.
- Generation Objectives:
  1. Executive Health Check & Financial Trajectory.
  2. Root-Cause Breakdown of on-ground impediments.
  3. Telemetry Blindspots & Missing Field Records Audit.
  4. Specific 30-Day Executive Action Plan aligned with the **PM-GatiShakti National Master Plan** inter-ministerial resolution protocol.
- **UX Engineering**: Employs container-isolated smooth scrolling (`chatContainerRef.current.scrollTo`) so generating responses or typing prompts never causes outer page sliding or viewport jump.

---

## 4. Database Schema & Serverless Persistence

The platform utilizes **Neon Serverless PostgreSQL** with WebSocket pooling via `@neondatabase/serverless`:

```sql
-- Core Projects Table
CREATE TABLE IF NOT EXISTS national_projects (
    id VARCHAR(64) PRIMARY KEY,
    raw_id VARCHAR(64) NOT NULL,
    name TEXT NOT NULL,
    ministry TEXT NOT NULL,
    sector TEXT NOT NULL,
    state TEXT NOT NULL,
    status TEXT NOT NULL,
    original_cost NUMERIC(12, 2),
    current_cost NUMERIC(12, 2),
    expenditure NUMERIC(12, 2),
    physical_progress NUMERIC(5, 2),
    original_date DATE,
    revised_date DATE,
    anticipated_date DATE,
    delay_months INTEGER DEFAULT 0,
    cost_overrun_cr NUMERIC(12, 2) DEFAULT 0,
    risk_score INTEGER DEFAULT 0,
    risk_category VARCHAR(32) DEFAULT 'Normal',
    ml_forecast JSONB,
    shap_factors JSONB,
    historical_snapshots JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- State Aggregates Summary Table (Spatial Telemetry)
CREATE TABLE IF NOT EXISTS state_summaries (
    state VARCHAR(128) PRIMARY KEY,
    total_projects INTEGER NOT NULL DEFAULT 0,
    total_cost NUMERIC(14, 2) NOT NULL DEFAULT 0,
    delayed INTEGER NOT NULL DEFAULT 0,
    high_risk INTEGER NOT NULL DEFAULT 0,
    on_time INTEGER NOT NULL DEFAULT 0,
    ongoing INTEGER NOT NULL DEFAULT 0,
    completed INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Ministry Aggregates Summary Table
CREATE TABLE IF NOT EXISTS ministry_summaries (
    ministry VARCHAR(256) PRIMARY KEY,
    total_projects INTEGER NOT NULL DEFAULT 0,
    total_cost NUMERIC(14, 2) NOT NULL DEFAULT 0,
    delayed INTEGER NOT NULL DEFAULT 0,
    high_risk INTEGER NOT NULL DEFAULT 0,
    sectors JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Sub-Millisecond Search & Geospatial Filtering
CREATE INDEX IF NOT EXISTS idx_projects_state ON national_projects(state);
CREATE INDEX IF NOT EXISTS idx_projects_ministry ON national_projects(ministry);
CREATE INDEX IF NOT EXISTS idx_projects_status ON national_projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_risk_score ON national_projects(risk_score DESC);
CREATE INDEX IF NOT EXISTS idx_projects_ml_forecast ON national_projects USING gin(ml_forecast);
```

---

## 5. Security, Resilience & Fallback Architecture

1. **Zero Credential Exposure**: Environment variables are strictly namespaced (`VITE_GROQ_API_KEY`, `DATABASE_URL`). Production code leverages client-side masked storage and fallback tokens with no hardcoded plaintext keys.
2. **Dual-Tier Offline Resilience**: If external database connections experience downtime or rate limiting, the platform automatically switches to its bundled immutable offline dataset (`projectsData.js`), ensuring zero downtime during Ministry evaluations or field usage.
3. **Strict Content Security**: All SVG geospatial elements are sanitized and rendered natively with D3 path generators without third-party iframe dependencies.
