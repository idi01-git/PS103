# Officer User Manual & Operational Walkthrough
## MoSPI Infrastructure Predictive Early-Warning Platform (PAIMANA)
### Smart India Hackathon — Problem Statement 26103 (PS 26103)

---

## 1. Introduction & User Personas

PAIMANA is designed for three distinct operational roles within the infrastructure governance ecosystem:

| User Role | Key Objectives | Primary Platform Views |
|---|---|---|
| **Ministry Secretaries & Executive Leadership** | National portfolio health surveillance, capital exposure oversight, macro bottleneck identification. | Spatial India Map, National Portfolio Cards, Executive Dossier Export. |
| **Project Directors & Implementing Agencies** | Timeline slippage early warning, 18-month forward runway planning, 30-day intervention memos. | 18M Predictive Split Graph, 3-Layer Decision Copilot, EVM Baseline. |
| **MoSPI Monitoring Cell & OCMS Auditors** | Data integrity verification, historical caveat inspection, inter-ministerial resolution under PM-GatiShakti. | Telemetry Audit Log, TreeSHAP Risk Vectors, MoSPI Reporting Caveat. |

---

## 2. Navigating the Platform

### 2.1 The Global Navigation Bar (Top Chrome)
The platform header provides immediate, zero-distraction access across four primary modules:
- **`Overview`**: National portfolio summary cards, macro indicators, and the interactive spatial map.
- **`Projects`**: The comprehensive 1,941-project directory with full-text search and multi-dimensional filters.
- **`Ministries`**: Dedicated breakdown across 35 Central Ministries & Departments.
- **`Dossier`**: Deep-dive analytical view for an individual project (EVM, ML Runway, Copilot, Audit Log).
- **`Quick Search (`/` or `Ctrl+K`)`**: Instantly focus the search input from anywhere in the application.

---

## 3. Operational Module Walkthrough

### 3.1 Spatial Surveillance: Interactive India Project Map
Located on the Overview page, the Interactive Map offers a geospatial choropleth perspective of infrastructure distribution:

1. **Inspecting a State**:
   - Hover your cursor over any state polygon. The state border illuminates in vivid blue (`#0070f3`), and a floating telemetry card appears tracking your cursor.
   - The card displays: Total Projects, Total Sanctioned Capex, On-Time vs. Delayed split, and High-Risk exposure count.
2. **Switching Metrics (4-Tab Switcher)**:
   - Click `[ Projects ]` to view project concentration by volume.
   - Click `[ Capital ]` to visualize capex intensity across states.
   - Click `[ Delayed ]` to isolate states with high timeline delay frequency.
   - Click `[ Risk ]` to identify geographic clusters with severe ML-predicted deterioration.
3. **Filtering by State**:
   - Click directly on any state polygon or its corresponding entry in the ranking sidebar.
   - The platform will navigate immediately to the Project Directory, pre-filtered to show only projects situated within that state.
4. **Union Territories & Corridors**:
   - Small Union Territories (Delhi, Chandigarh, Puducherry, Lakshadweep, Goa, Daman & Diu) feature dedicated coordinate circle badges for easy selection.
   - Click the **National & Multi-State Corridors** banner to explore inter-state initiatives (e.g. Dedicated Freight Corridors, National Highway packages).

---

### 3.2 Project Intelligence Directory & Multi-Faceted Filters
The Project Directory (`/projects`) aggregates 1,941 live monitored projects:

1. **Multi-Faceted Search**:
   - Type project keywords (e.g. *"NH-44"*, *"Metro"*, *"Kudankulam"*, *"Rishikesh"*) into the search field.
   - Filter simultaneously by **State**, **Ministry**, **Sector**, or **Risk Status** (`Normal`, `Watchlist`, `Critical`).
2. **Layout Toggle (Split View vs. Table View)**:
   - **Side-by-Side Split View**: Click any project row on the left to preview its telemetry card and risk runway on the right without leaving the directory.
   - **Dense Table View**: Switch to the tabular spreadsheet view for quick multi-column comparisons and sorting.
3. **Opening the Full Project Dossier**:
   - Click **"Inspect Full Dossier →"** to launch the comprehensive analytical view.

---

### 3.3 The 18-Month Predictive Split Runway Graph
Inside the Project Dossier, the **18M Predictive Split Runway** tab isolates the divergence between the official administrative timeline and the machine learning model forecast:

```
Completion
   Date ^                                   [ P90 Pessimistic Bound ]
        |                                 . - - - - - - - - - - - - -
        |                             . '      ★ CatBoost Forecast (18M)
        |                         . '        . - - - - - - - - - - - -
        |                     . '          . '  [ P10 Optimistic Bound ]
        |                 . '          . '
        |  ●------------●'---------●-'----------------------------->
      T0 (Current)    3M        6M        12M       15M       18M Horizon
         [ Official Administrative Milestone Baseline ]
```

1. **Official Baseline Curve (Black Line)**: The administrative completion milestones recorded in MoSPI OCMS.
2. **Predictive AI Curve (Blue Dotted Line)**: The ensemble model's empirical forecasted completion trajectory across 3M, 6M, 12M, 15M, and 18M horizons.
3. **Statistical Uncertainty Envelope (P10–P90 Shaded Band)**: Communicates the statistical confidence bounds around the projection.
4. **Hover Telemetry**: Move your mouse across the timeline to view exact anticipated delay months, probability of cost escalation, and confidence scores at each quarterly waypoint.

---

### 3.4 3-Layer AI Decision Copilot (Layer 3 LLM)
Accessible under the **3-Layer AI Decision Copilot** tab:

1. **Layer 1 (Statistical EVM)**:
   - Review Cost Performance Index ($CPI$) and Schedule Performance Index ($SPI$).
   - Identify whether cost escalation is driven by capital inefficiency ($CPI < 1.0$) or timeline prolongation ($SPI < 1.0$).
2. **Layer 2 (ML Explainability & TreeSHAP)**:
   - Review the top 5 contributing risk drivers (e.g. land acquisition disputes, forest clearance hold-ups, contractor liquidity constraints).
3. **Layer 3 (Executive AI Assistant)**:
   - Click **"Generate Executive Diagnostic Brief"** to synthesize a complete 4-part memorandum:
     1. Executive Health Check & Financial Trajectory.
     2. On-Ground Bottlenecks & Root Causes.
     3. Telemetry Blindspots & Missing Field Records.
     4. 30-Day Executive Action Plan aligned with **PM-GatiShakti**.
   - Use the **Officer Decision-Support Inquiries** chips to ask specific operational questions (e.g. *"Why are CPI & SPI falling?"*, *"Draft Action Memo for Director"*).
   - Enter custom queries in the chat input. Notice that all scrolling remains strictly isolated within the chat container, ensuring your browser window never slides or jumps.

---

### 3.5 MoSPI Reporting Caveat & Audit Trail
Located at the bottom of the Project Dossier:
- **Historical Snapshot Progression**: Inspects past quarterly filings to detect reporting anomalies (e.g. projects with delayed progress reporting despite heavy capital expenditure).
- **Kudankulam Nuclear Power Project Benchmark**: For complex multi-decade nuclear installations, the platform presents verified historical quarterly snapshots directly citing official MoSPI PDF releases (2019 to 2026), providing complete transparency for government auditors.

---

### 3.6 Exporting Executive Reports & PDF Dossiers
1. Click the **"Export Report"** button in the Dossier header or top navigation.
2. Select your desired report format:
   - **Comprehensive Project Intelligence Report (Full Dossier)**.
   - **Explainable AI Risk & SHAP Analysis Report**.
   - **Physical Progress & Financial Expenditure Report**.
   - **Complete Project Audit Trail Log**.
   - **State Executive Portfolio Report**.
3. The system formats and prepares the report for high-resolution printing or PDF export.
