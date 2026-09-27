// PAIMANA - Real MoSPI OCMS Capital Projects with Production Model Inference
// Generated from v3.2.1-optimized-production | Total Curated: 65

export const REAL_PROJECTS_MASTER = [
  {
    "id": "OCMS-180100078",
    "rawId": "180100078",
    "name": "Loktak D/S Hep(Nhpc)",
    "shortName": "Loktak D/S Hep",
    "state": "Manipur",
    "district": "Manipur Regional Corridor",
    "region": "North-Eastern",
    "ministry": "Ministry of Power",
    "department": "Central Electricity Authority / CPSUs",
    "sector": "Power & Transmission",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 579,
    "approvedCost": 579,
    "currentCost": 1311,
    "costOverrunCr": 732,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 5,
    "riskLevel": "Low",
    "riskScore": 16.3,
    "riskBreakdown": {
      "costOverrunRisk": 4,
      "timeDelayRisk": 15,
      "progressRisk": 13,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Required Progress Per 30D",
        "impact": 1.5,
        "category": "Execution Pace",
        "description": "Model attribution +0.149 associated with prediction runway.",
        "featureValue": 3000.0
      },
      {
        "factor": "Expenditure Acceleration Per 30D",
        "impact": 1.3,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.135 associated with prediction runway.",
        "featureValue": -5.3
      },
      {
        "factor": "Time Overrun Revised Months (Missing Reporting)",
        "impact": 0.7,
        "category": "Project Feature",
        "description": "Model attribution +0.066 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Expenditure Acceleration Per 30D (Missing Reporting)",
        "impact": 0.5,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.051 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Project Age Months",
        "impact": 0.4,
        "category": "Project Feature",
        "description": "Model attribution +0.040 associated with prediction runway.",
        "featureValue": 270.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 231,
        "actualCost": 551
      },
      {
        "month": "Snapshot -9M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 318,
        "actualCost": 760
      },
      {
        "month": "Snapshot -6M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 405,
        "actualCost": 970
      },
      {
        "month": "Snapshot -3M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 492,
        "actualCost": 1180
      },
      {
        "month": "Current Snapshot",
        "planned": 10,
        "actual": 5,
        "plannedCost": 579,
        "actualCost": 1311
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-180100078",
          "label": "Loktak D/S Hep(Nhpc)...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-0",
          "label": "NATIONAL HYDRO-ELECTRIC P",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-0",
          "label": "Land Acquisition Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-180100078",
          "target": "AGENCY-0",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-180100078",
          "target": "ISSUE-0",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "land_acquisition_issue",
    "supportingEvidence": "Documented in official report 2019-20_Q1_Apr-Jun.pdf (p. 188): \"rs of NHPC who was incharge of Loktak HEP was brutally killed by the militants on 12th January, 2000. Though infrastructure activities like land acquisition,...\"",
    "recommendedAction": "Special Land Acquisition Officer (SLAO) escalation & district administration coordination for private/revenue land notification.",
    "multiHorizonRisk": {
      "3m": 16.3,
      "6m": 37.5,
      "12m": 70.5,
      "15m": 71.5,
      "18m": 59.8
    },
    "multiHorizonDelay": {
      "3m": 0.2,
      "6m": 3.9,
      "12m": 5.7,
      "15m": 62.2,
      "18m": 43.6
    },
    "multiHorizonCostInc": {
      "3m": 0.03,
      "6m": 0.11,
      "12m": 0.79,
      "15m": 3.67,
      "18m": 1.84
    }
  },
  {
    "id": "OCMS-180100210",
    "rawId": "180100210",
    "name": "Parbati Hep (4X200 Mw) (Nhpc) Ii",
    "shortName": "Parbati Hep",
    "state": "Himachal Pradesh",
    "district": "Himachal Pradesh Regional Corridor",
    "region": "Northern",
    "ministry": "Ministry of Power",
    "department": "Central Electricity Authority / CPSUs",
    "sector": "Power & Transmission",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 3920,
    "approvedCost": 3920,
    "currentCost": 13045,
    "costOverrunCr": 9125,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 100,
    "riskLevel": "Low",
    "riskScore": 12.3,
    "riskBreakdown": {
      "costOverrunRisk": 6,
      "timeDelayRisk": 9,
      "progressRisk": 10,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Forecast Cost Acceleration Per 30D",
        "impact": 1.2,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.120 associated with prediction runway.",
        "featureValue": -71.8
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 1.1,
        "category": "Execution Pace",
        "description": "Model attribution +0.112 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Project Age Months",
        "impact": 1.0,
        "category": "Project Feature",
        "description": "Model attribution +0.096 associated with prediction runway.",
        "featureValue": 273.0
      },
      {
        "factor": "Progress Velocity Historical Std",
        "impact": 0.9,
        "category": "Execution Pace",
        "description": "Model attribution +0.093 associated with prediction runway.",
        "featureValue": 0.22
      },
      {
        "factor": "Prev Physical Progress",
        "impact": 0.7,
        "category": "Execution Pace",
        "description": "Model attribution +0.066 associated with prediction runway.",
        "featureValue": 100.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 75,
        "actual": 70,
        "plannedCost": 1568,
        "actualCost": 5479
      },
      {
        "month": "Snapshot -9M",
        "planned": 82,
        "actual": 78,
        "plannedCost": 2156,
        "actualCost": 7566
      },
      {
        "month": "Snapshot -6M",
        "planned": 88,
        "actual": 85,
        "plannedCost": 2744,
        "actualCost": 9653
      },
      {
        "month": "Snapshot -3M",
        "planned": 95,
        "actual": 93,
        "plannedCost": 3332,
        "actualCost": 11740
      },
      {
        "month": "Current Snapshot",
        "planned": 100,
        "actual": 100,
        "plannedCost": 3920,
        "actualCost": 13045
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-180100210",
          "label": "Parbati Hep (4X200 Mw) (Nhpc...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-1",
          "label": "NHPC",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-1",
          "label": "Contractor Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-180100210",
          "target": "AGENCY-1",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-180100210",
          "target": "ISSUE-1",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "contractor_issue",
    "supportingEvidence": "Documented in official report 2019-20_Q2_Jul-Sep.pdf (p. 204): \"T Excavation (91%) & 26792 m lining (85%) completed. 3.Subsequent to termination of M/s HJV, TBM excavation resumed since 16.10.2015 by new contractor i.e M/s Gammon \u2013CMC JV and 1929.5 m advancement so far has been made. 4.Contract of M/s Valecha, fo...\"",
    "recommendedAction": "Contractor cash flow & machinery audit; invocation of milestone penalties or mobilization support.",
    "multiHorizonRisk": {
      "3m": 12.3,
      "6m": 23.1,
      "12m": 28.2,
      "15m": 26.8,
      "18m": 39.1
    },
    "multiHorizonDelay": {
      "3m": 0.4,
      "6m": 0.9,
      "12m": 0.4,
      "15m": 1.6,
      "18m": 1.8
    },
    "multiHorizonCostInc": {
      "3m": 0.04,
      "6m": 0.13,
      "12m": 0.72,
      "15m": 1.47,
      "18m": 1.2
    }
  },
  {
    "id": "OCMS-180100242",
    "rawId": "180100242",
    "name": "Barh Stpp(3X660Mw) Ntpc",
    "shortName": "Barh Stpp",
    "state": "Bihar",
    "district": "Bihar Regional Corridor",
    "region": "Eastern",
    "ministry": "Ministry of Power",
    "department": "Central Electricity Authority / CPSUs",
    "sector": "Power & Transmission",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 8693,
    "approvedCost": 8693,
    "currentCost": 21312,
    "costOverrunCr": 12619,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 95,
    "riskLevel": "Medium",
    "riskScore": 37.5,
    "riskBreakdown": {
      "costOverrunRisk": 10,
      "timeDelayRisk": 32,
      "progressRisk": 30,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Prev Physical Progress",
        "impact": 1.9,
        "category": "Execution Pace",
        "description": "Model attribution +0.190 associated with prediction runway.",
        "featureValue": 95.0
      },
      {
        "factor": "Catchup Pressure",
        "impact": 1.4,
        "category": "Execution Pace",
        "description": "Model attribution +0.143 associated with prediction runway.",
        "featureValue": 150.0
      },
      {
        "factor": "Days To Forecast Completion",
        "impact": 1.2,
        "category": "Timeline",
        "description": "Model attribution +0.121 associated with prediction runway.",
        "featureValue": -121.0
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 1.0,
        "category": "Execution Pace",
        "description": "Model attribution +0.102 associated with prediction runway.",
        "featureValue": 150.0
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 1.0,
        "category": "Execution Pace",
        "description": "Model attribution +0.096 associated with prediction runway.",
        "featureValue": 0.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 70,
        "actual": 65,
        "plannedCost": 3477,
        "actualCost": 8951
      },
      {
        "month": "Snapshot -9M",
        "planned": 77,
        "actual": 73,
        "plannedCost": 4781,
        "actualCost": 12361
      },
      {
        "month": "Snapshot -6M",
        "planned": 83,
        "actual": 80,
        "plannedCost": 6085,
        "actualCost": 15771
      },
      {
        "month": "Snapshot -3M",
        "planned": 90,
        "actual": 88,
        "plannedCost": 7389,
        "actualCost": 19181
      },
      {
        "month": "Current Snapshot",
        "planned": 100,
        "actual": 95,
        "plannedCost": 8693,
        "actualCost": 21312
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-180100242",
          "label": "Barh Stpp(3X660Mw) Ntpc...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-2",
          "label": "NTPC",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-2",
          "label": "Land Acquisition Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-180100242",
          "target": "AGENCY-2",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-180100242",
          "target": "ISSUE-2",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "land_acquisition_issue",
    "supportingEvidence": "Documented in official report 2019-20_Q2_Jul-Sep.pdf (p. 206): \"taking considerable time. - Due to US sanction on Power Machines, Russia, balance TG supplies and works are getting delayed. - Delay due to land acquisition / physical possession in past. - Law & Order issues in past. - Abnormal Heavy Rain Fall in Ye...\"",
    "recommendedAction": "Special Land Acquisition Officer (SLAO) escalation & district administration coordination for private/revenue land notification.",
    "multiHorizonRisk": {
      "3m": 37.5,
      "6m": 56.4,
      "12m": 66.3,
      "15m": 67.0,
      "18m": 76.2
    },
    "multiHorizonDelay": {
      "3m": 1.8,
      "6m": 3.8,
      "12m": 5.6,
      "15m": 6.9,
      "18m": 8.7
    },
    "multiHorizonCostInc": {
      "3m": 0.12,
      "6m": 0.22,
      "12m": 0.25,
      "15m": 0.26,
      "18m": 0.85
    }
  },
  {
    "id": "OCMS-180100258",
    "rawId": "180100258",
    "name": "Kunadankulam App Trans System (Pgcil)",
    "shortName": "Kunadankulam App Trans System",
    "state": "Tamil Nadu",
    "district": "Tamil Nadu Regional Corridor",
    "region": "Southern",
    "ministry": "Ministry of Heavy Industries",
    "department": "Department of Heavy Industry",
    "sector": "Industrial Infrastructure",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 1779,
    "approvedCost": 1779,
    "currentCost": 2187,
    "costOverrunCr": 408,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2026-12-31",
    "timeDelayMonths": 133,
    "status": "Delayed",
    "progressPercent": 100,
    "riskLevel": "Low",
    "riskScore": 8.3,
    "riskBreakdown": {
      "costOverrunRisk": 4,
      "timeDelayRisk": 6,
      "progressRisk": 7,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Project Age Months",
        "impact": 1.5,
        "category": "Project Feature",
        "description": "Model attribution +0.154 associated with prediction runway.",
        "featureValue": 178.0
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 1.2,
        "category": "Execution Pace",
        "description": "Model attribution +0.124 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Baseline Cost",
        "impact": 0.7,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.072 associated with prediction runway.",
        "featureValue": 1779.29
      },
      {
        "factor": "Time Overrun Original Months",
        "impact": 0.4,
        "category": "Project Feature",
        "description": "Model attribution +0.039 associated with prediction runway.",
        "featureValue": 133.0
      },
      {
        "factor": "Schedule Slip Current Months",
        "impact": 0.4,
        "category": "Timeline",
        "description": "Model attribution +0.036 associated with prediction runway.",
        "featureValue": 133.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 75,
        "actual": 70,
        "plannedCost": 712,
        "actualCost": 919
      },
      {
        "month": "Snapshot -9M",
        "planned": 82,
        "actual": 78,
        "plannedCost": 979,
        "actualCost": 1269
      },
      {
        "month": "Snapshot -6M",
        "planned": 88,
        "actual": 85,
        "plannedCost": 1246,
        "actualCost": 1619
      },
      {
        "month": "Snapshot -3M",
        "planned": 95,
        "actual": 93,
        "plannedCost": 1512,
        "actualCost": 1969
      },
      {
        "month": "Current Snapshot",
        "planned": 100,
        "actual": 100,
        "plannedCost": 1779,
        "actualCost": 2187
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-180100258",
          "label": "Kunadankulam App Trans Syste...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-3",
          "label": "27",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-3",
          "label": "Row Rou Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-180100258",
          "target": "AGENCY-3",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-180100258",
          "target": "ISSUE-3",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "row_rou_issue",
    "supportingEvidence": "Documented in official report 2019-20_Q2_Jul-Sep.pdf (p. 218): \"-Completed Status: 08 out of 09 elements completed. Implementation of balance 01 line (Edamon-Muvattupuzha line) was affected due to severe ROW problem (long pending) in Kerala. With the intervention of Govt. of Kerala, issue has been resolved. Ist c...\"",
    "recommendedAction": "Project trajectory monitoring escalation: physical progress verification audit recommended based on observed dynamics.",
    "multiHorizonRisk": {
      "3m": 8.3,
      "6m": 19.4,
      "12m": 32.8,
      "15m": 38.5,
      "18m": 45.2
    },
    "multiHorizonDelay": {
      "3m": 0.2,
      "6m": 1.3,
      "12m": 1.6,
      "15m": 4.7,
      "18m": 4.3
    },
    "multiHorizonCostInc": {
      "3m": 0.0,
      "6m": 0.04,
      "12m": 0.0,
      "15m": 0.48,
      "18m": 1.01
    }
  },
  {
    "id": "OCMS-220100133",
    "rawId": "220100133",
    "name": "Udhampur-Srinagar-Baramulla (Nl),Nr",
    "shortName": "Udhampur-Srinagar-Baramulla",
    "state": "Jammu And Kashmir",
    "district": "Jammu And Kashmir Regional Corridor",
    "region": "Northern",
    "ministry": "Ministry of Heavy Industries",
    "department": "Department of Heavy Industry",
    "sector": "Industrial Infrastructure",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 37012,
    "approvedCost": 37012,
    "currentCost": 43780,
    "costOverrunCr": 6768,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 100,
    "riskLevel": "Low",
    "riskScore": 8.1,
    "riskBreakdown": {
      "costOverrunRisk": 3,
      "timeDelayRisk": 6,
      "progressRisk": 6,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 1.0,
        "category": "Execution Pace",
        "description": "Model attribution +0.097 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Prev Physical Progress",
        "impact": 0.9,
        "category": "Execution Pace",
        "description": "Model attribution +0.089 associated with prediction runway.",
        "featureValue": 100.0
      },
      {
        "factor": "Project Age Months",
        "impact": 0.8,
        "category": "Project Feature",
        "description": "Model attribution +0.078 associated with prediction runway.",
        "featureValue": 363.0
      },
      {
        "factor": "Expenditure Acceleration Per 30D",
        "impact": 0.5,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.050 associated with prediction runway.",
        "featureValue": -8.27
      },
      {
        "factor": "Expenditure Ratio Forecast",
        "impact": 0.5,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.045 associated with prediction runway.",
        "featureValue": 0.97
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 75,
        "actual": 70,
        "plannedCost": 14805,
        "actualCost": 18388
      },
      {
        "month": "Snapshot -9M",
        "planned": 82,
        "actual": 78,
        "plannedCost": 20357,
        "actualCost": 25392
      },
      {
        "month": "Snapshot -6M",
        "planned": 88,
        "actual": 85,
        "plannedCost": 25908,
        "actualCost": 32397
      },
      {
        "month": "Snapshot -3M",
        "planned": 95,
        "actual": 93,
        "plannedCost": 31460,
        "actualCost": 39402
      },
      {
        "month": "Current Snapshot",
        "planned": 100,
        "actual": 100,
        "plannedCost": 37012,
        "actualCost": 43780
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100133",
          "label": "Udhampur-Srinagar-Baramulla ...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-4",
          "label": "NR",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-4",
          "label": "Geological Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100133",
          "target": "AGENCY-4",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-220100133",
          "target": "ISSUE-4",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "geological_issue",
    "supportingEvidence": "Documented in official report 2019-20_Q1_Apr-Jun.pdf (p. 327): \"mpur- Katra (25 km) sections are completed. Work Status: The work on Katra- Banihal (111km) is very tedious, both in terms of logistics and geological strata, has been undertaken by three agencies viz. Northern Railway (5 km), Konkan Railway (35 km) ...\"",
    "recommendedAction": "Geotechnical investigation review; specialized rock stabilization & tunneling consultancy.",
    "multiHorizonRisk": {
      "3m": 8.1,
      "6m": 19.3,
      "12m": 17.1,
      "15m": 23.2,
      "18m": 22.7
    },
    "multiHorizonDelay": {
      "3m": 0.2,
      "6m": 0.1,
      "12m": 0.4,
      "15m": 1.2,
      "18m": 0.8
    },
    "multiHorizonCostInc": {
      "3m": 0.07,
      "6m": 0.09,
      "12m": 2.06,
      "15m": 0.7,
      "18m": 0.9
    }
  },
  {
    "id": "OCMS-220100135",
    "rawId": "220100135",
    "name": "New Bg Rly Line From Eklakhi-Balurghat Including Gazole-Itahar(Nl),Nefr",
    "shortName": "New Bg Rly Line From Eklakhi-Balurg",
    "state": "West Bengal",
    "district": "West Bengal Regional Corridor",
    "region": "Eastern",
    "ministry": "Ministry of Railways",
    "department": "Railway Board & Zonal Railways",
    "sector": "Railways & DFC",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 297,
    "approvedCost": 297,
    "currentCost": 614,
    "costOverrunCr": 317,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 5,
    "riskLevel": "Low",
    "riskScore": 12.1,
    "riskBreakdown": {
      "costOverrunRisk": 4,
      "timeDelayRisk": 11,
      "progressRisk": 10,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Catchup Pressure",
        "impact": 1.2,
        "category": "Execution Pace",
        "description": "Model attribution +0.121 associated with prediction runway.",
        "featureValue": 3001.4
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 0.6,
        "category": "Execution Pace",
        "description": "Model attribution +0.056 associated with prediction runway.",
        "featureValue": 3000.0
      },
      {
        "factor": "Expenditure Acceleration Per 30D (Missing Reporting)",
        "impact": 0.5,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.050 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Progress Velocity Historical Std",
        "impact": 0.2,
        "category": "Execution Pace",
        "description": "Model attribution +0.022 associated with prediction runway.",
        "featureValue": 0.44
      },
      {
        "factor": "Evidence Rows",
        "impact": 0.2,
        "category": "Administrative",
        "description": "Model attribution +0.018 associated with prediction runway.",
        "featureValue": 1.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 119,
        "actualCost": 258
      },
      {
        "month": "Snapshot -9M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 164,
        "actualCost": 356
      },
      {
        "month": "Snapshot -6M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 208,
        "actualCost": 454
      },
      {
        "month": "Snapshot -3M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 253,
        "actualCost": 553
      },
      {
        "month": "Current Snapshot",
        "planned": 10,
        "actual": 5,
        "plannedCost": 297,
        "actualCost": 614
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100135",
          "label": "New Bg Rly Line From Eklakhi...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-5",
          "label": "NORTH EAST FRONTIER RAILW",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-5",
          "label": "Land Acquisition Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100135",
          "target": "AGENCY-5",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-220100135",
          "target": "ISSUE-5",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "land_acquisition_issue",
    "supportingEvidence": "Documented in official report 2022-23_Q1_Apr-Jun.pdf (p. 275): \"Issues: 103.321 Hect out of 150.442 Hect is not yet handed over. Land for 10 Km length (47.121 Hect.) already handed over to Railways. Action taken: 10 Km land have been received in Malda District and estimation submitted for tender. For the rest por...\"",
    "recommendedAction": "Special Land Acquisition Officer (SLAO) escalation & district administration coordination for private/revenue land notification.",
    "multiHorizonRisk": {
      "3m": 12.1,
      "6m": 11.7,
      "12m": 37.7,
      "15m": 55.9,
      "18m": 45.7
    },
    "multiHorizonDelay": {
      "3m": 0.1,
      "6m": 0.4,
      "12m": 3.4,
      "15m": 30.9,
      "18m": 32.4
    },
    "multiHorizonCostInc": {
      "3m": 0.03,
      "6m": 0.03,
      "12m": 2.3,
      "15m": 0.49,
      "18m": 0.47
    }
  },
  {
    "id": "OCMS-220100149",
    "rawId": "220100149",
    "name": "Dalli-Rajhara - Raoghat(Part Of Dalli-Rajhara-Jagdalpur),Nl,Rvnl",
    "shortName": "Dalli-Rajhara - Raoghat",
    "state": "Secr",
    "district": "Secr Regional Corridor",
    "region": "National",
    "ministry": "Ministry of Heavy Industries",
    "department": "Department of Heavy Industry",
    "sector": "Industrial Infrastructure",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 632,
    "approvedCost": 632,
    "currentCost": 1195,
    "costOverrunCr": 563,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2026-12-31",
    "timeDelayMonths": 78,
    "status": "Delayed",
    "progressPercent": 48,
    "riskLevel": "Medium",
    "riskScore": 37.0,
    "riskBreakdown": {
      "costOverrunRisk": 4,
      "timeDelayRisk": 39,
      "progressRisk": 30,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Days To Forecast Completion",
        "impact": 6.3,
        "category": "Timeline",
        "description": "Model attribution +0.627 associated with prediction runway.",
        "featureValue": -29.0
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 1.4,
        "category": "Execution Pace",
        "description": "Model attribution +0.141 associated with prediction runway.",
        "featureValue": 1560.0
      },
      {
        "factor": "Schedule Slip Current Months",
        "impact": 1.1,
        "category": "Timeline",
        "description": "Model attribution +0.109 associated with prediction runway.",
        "featureValue": 78.0
      },
      {
        "factor": "Snapshot Gap Days",
        "impact": 0.8,
        "category": "Timeline",
        "description": "Model attribution +0.085 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Outlay Current Fy",
        "impact": 0.6,
        "category": "Project Feature",
        "description": "Model attribution +0.064 associated with prediction runway.",
        "featureValue": 500.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 23,
        "actual": 18,
        "plannedCost": 253,
        "actualCost": 502
      },
      {
        "month": "Snapshot -9M",
        "planned": 30,
        "actual": 26,
        "plannedCost": 347,
        "actualCost": 693
      },
      {
        "month": "Snapshot -6M",
        "planned": 36,
        "actual": 33,
        "plannedCost": 442,
        "actualCost": 884
      },
      {
        "month": "Snapshot -3M",
        "planned": 43,
        "actual": 41,
        "plannedCost": 537,
        "actualCost": 1076
      },
      {
        "month": "Current Snapshot",
        "planned": 53,
        "actual": 48,
        "plannedCost": 632,
        "actualCost": 1195
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100149",
          "label": "Dalli-Rajhara - Raoghat(Part...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-6",
          "label": "219",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-6",
          "label": "Contractor Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100149",
          "target": "AGENCY-6",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-220100149",
          "target": "ISSUE-6",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "contractor_issue",
    "supportingEvidence": "Documented in official report 2019-20_Q1_Apr-Jun.pdf (p. 338): \"DALLI-RAJHARA - RAOGHAT(PART OF DALLI-RAJHARA-JAGDALPUR),NL,RVNL, SECR, CHHATISGARH, 235 KM Contract for roadbed & bridges for the phase Ist between Dalli- Rajhara to Keoti (42Km) awarded on 20.10.09 and for Phase-II between Keoti and Rowghat (53.4 K...\"",
    "recommendedAction": "Contractor cash flow & machinery audit; invocation of milestone penalties or mobilization support.",
    "multiHorizonRisk": {
      "3m": 37.0,
      "6m": 54.5,
      "12m": 56.8,
      "15m": 55.8,
      "18m": 68.7
    },
    "multiHorizonDelay": {
      "3m": 0.9,
      "6m": 2.7,
      "12m": 6.0,
      "15m": 13.4,
      "18m": 19.9
    },
    "multiHorizonCostInc": {
      "3m": 0.08,
      "6m": 0.13,
      "12m": 1.26,
      "15m": 0.52,
      "18m": 2.17
    }
  },
  {
    "id": "OCMS-220100181",
    "rawId": "220100181",
    "name": "Ahmednagar - Beed - Parli - Vaijnath New Broad Gauge Line Railway Project [261.3 Km]",
    "shortName": "Ahmednagar - Beed - Parli - Vaijnat",
    "state": "Maharashtra",
    "district": "Maharashtra Regional Corridor",
    "region": "Western",
    "ministry": "Ministry of Railways",
    "department": "Railway Board & Zonal Railways",
    "sector": "Railways & DFC",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 2539,
    "approvedCost": 2539,
    "currentCost": 2539,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 98,
    "riskLevel": "Medium",
    "riskScore": 57.9,
    "riskBreakdown": {
      "costOverrunRisk": 16,
      "timeDelayRisk": 39,
      "progressRisk": 46,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Days To Forecast Completion",
        "impact": 5.6,
        "category": "Timeline",
        "description": "Model attribution +0.564 associated with prediction runway.",
        "featureValue": -30.0
      },
      {
        "factor": "Anticipated Cost (Missing Reporting)",
        "impact": 4.3,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.427 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 1.8,
        "category": "Execution Pace",
        "description": "Model attribution +0.185 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Prev Physical Progress",
        "impact": 1.7,
        "category": "Execution Pace",
        "description": "Model attribution +0.165 associated with prediction runway.",
        "featureValue": 98.0
      },
      {
        "factor": "Project Age Months",
        "impact": 1.4,
        "category": "Project Feature",
        "description": "Model attribution +0.137 associated with prediction runway.",
        "featureValue": 326.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 73,
        "actual": 68,
        "plannedCost": 1015,
        "actualCost": 1066
      },
      {
        "month": "Snapshot -9M",
        "planned": 80,
        "actual": 76,
        "plannedCost": 1396,
        "actualCost": 1472
      },
      {
        "month": "Snapshot -6M",
        "planned": 86,
        "actual": 83,
        "plannedCost": 1777,
        "actualCost": 1879
      },
      {
        "month": "Snapshot -3M",
        "planned": 93,
        "actual": 91,
        "plannedCost": 2158,
        "actualCost": 2285
      },
      {
        "month": "Current Snapshot",
        "planned": 100,
        "actual": 98,
        "plannedCost": 2539,
        "actualCost": 2539
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100181",
          "label": "Ahmednagar - Beed - Parli - ...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-7",
          "label": "Central Railway [CR] - II",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-7",
          "label": "Land Acquisition Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100181",
          "target": "AGENCY-7",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-220100181",
          "target": "ISSUE-7",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "land_acquisition_issue",
    "supportingEvidence": "Documented in official report 2019-20_Q1_Apr-Jun.pdf (p. 245): \"ayandoh : 11.57 km track linking completed. Naraydoh - Parli (246.25km) State authorities (Govt of Maharashtra) are being pursued for early land acquisition....\"",
    "recommendedAction": "Special Land Acquisition Officer (SLAO) escalation & district administration coordination for private/revenue land notification.",
    "multiHorizonRisk": {
      "3m": 57.9,
      "6m": 70.1,
      "12m": 74.0,
      "15m": 49.5,
      "18m": 61.1
    },
    "multiHorizonDelay": {
      "3m": 1.4,
      "6m": 4.6,
      "12m": 4.7,
      "15m": 3.0,
      "18m": 3.2
    },
    "multiHorizonCostInc": {
      "3m": 0.3,
      "6m": 0.32,
      "12m": 3.66,
      "15m": 1.05,
      "18m": 3.29
    }
  },
  {
    "id": "OCMS-220100188",
    "rawId": "220100188",
    "name": "Nangaldam-Talwara(Nl),Nr",
    "shortName": "Nangaldam-Talwara",
    "state": "Multi State",
    "district": "Multi State Regional Corridor",
    "region": "National",
    "ministry": "Ministry of Heavy Industries",
    "department": "Department of Heavy Industry",
    "sector": "Industrial Infrastructure",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 2018,
    "approvedCost": 2018,
    "currentCost": 2018,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 75,
    "riskLevel": "Low",
    "riskScore": 16.3,
    "riskBreakdown": {
      "costOverrunRisk": 5,
      "timeDelayRisk": 7,
      "progressRisk": 13,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Forecast Vs Revised Completion Days",
        "impact": 1.5,
        "category": "Timeline",
        "description": "Model attribution +0.146 associated with prediction runway.",
        "featureValue": 151.0
      },
      {
        "factor": "Project Age Months",
        "impact": 1.4,
        "category": "Project Feature",
        "description": "Model attribution +0.140 associated with prediction runway.",
        "featureValue": 531.0
      },
      {
        "factor": "Forecast Cost Velocity Historical Std",
        "impact": 1.1,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.107 associated with prediction runway.",
        "featureValue": 17.16
      },
      {
        "factor": "Prev Physical Progress",
        "impact": 1.0,
        "category": "Execution Pace",
        "description": "Model attribution +0.097 associated with prediction runway.",
        "featureValue": 75.0
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 0.9,
        "category": "Execution Pace",
        "description": "Model attribution +0.089 associated with prediction runway.",
        "featureValue": 0.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 50,
        "actual": 45,
        "plannedCost": 807,
        "actualCost": 848
      },
      {
        "month": "Snapshot -9M",
        "planned": 57,
        "actual": 53,
        "plannedCost": 1110,
        "actualCost": 1170
      },
      {
        "month": "Snapshot -6M",
        "planned": 63,
        "actual": 60,
        "plannedCost": 1413,
        "actualCost": 1493
      },
      {
        "month": "Snapshot -3M",
        "planned": 70,
        "actual": 68,
        "plannedCost": 1715,
        "actualCost": 1816
      },
      {
        "month": "Current Snapshot",
        "planned": 80,
        "actual": 75,
        "plannedCost": 2018,
        "actualCost": 2018
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100188",
          "label": "Nangaldam-Talwara(Nl),Nr...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-8",
          "label": "NR",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-8",
          "label": "Land Acquisition Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100188",
          "target": "AGENCY-8",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-220100188",
          "target": "ISSUE-8",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "land_acquisition_issue",
    "supportingEvidence": "Documented in official report 2019-20_Q4_Jan-Mar.pdf (p. 335): \"A(NL),NR, MULTI STATE 1)60 km length already commissioned out of total 113 km including Mukerian-Talwara section. 2)Out of remaining length land is available only in 29 km in old section of Mukerian-Talwaraand in balance section of 24 km land acquisi...\"",
    "recommendedAction": "Special Land Acquisition Officer (SLAO) escalation & district administration coordination for private/revenue land notification.",
    "multiHorizonRisk": {
      "3m": 16.3,
      "6m": 34.6,
      "12m": 60.3,
      "15m": 75.4,
      "18m": 85.9
    },
    "multiHorizonDelay": {
      "3m": 0.1,
      "6m": 0.6,
      "12m": 1.6,
      "15m": 5.2,
      "18m": 5.8
    },
    "multiHorizonCostInc": {
      "3m": 0.0,
      "6m": 0.1,
      "12m": 2.15,
      "15m": 3.73,
      "18m": 12.22
    }
  },
  {
    "id": "OCMS-220100193",
    "rawId": "220100193",
    "name": "Hubli-Ankola(Nl),Swr",
    "shortName": "Hubli-Ankola",
    "state": "Karnataka",
    "district": "Karnataka Regional Corridor",
    "region": "Southern",
    "ministry": "Ministry of Heavy Industries",
    "department": "Department of Heavy Industry",
    "sector": "Industrial Infrastructure",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 2315,
    "approvedCost": 2315,
    "currentCost": 5174,
    "costOverrunCr": 2859,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 5,
    "riskLevel": "Low",
    "riskScore": 9.8,
    "riskBreakdown": {
      "costOverrunRisk": 4,
      "timeDelayRisk": 6,
      "progressRisk": 8,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Project Age Months",
        "impact": 2.5,
        "category": "Project Feature",
        "description": "Model attribution +0.253 associated with prediction runway.",
        "featureValue": 320.0
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 1.0,
        "category": "Execution Pace",
        "description": "Model attribution +0.099 associated with prediction runway.",
        "featureValue": 7.64
      },
      {
        "factor": "Remaining Forecast Cost",
        "impact": 0.8,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.075 associated with prediction runway.",
        "featureValue": 5014.81
      },
      {
        "factor": "Snapshot Gap Days",
        "impact": 0.7,
        "category": "Timeline",
        "description": "Model attribution +0.072 associated with prediction runway.",
        "featureValue": 184.0
      },
      {
        "factor": "Schedule Slip Current Months",
        "impact": 0.4,
        "category": "Timeline",
        "description": "Model attribution +0.036 associated with prediction runway.",
        "featureValue": 5.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 926,
        "actualCost": 2173
      },
      {
        "month": "Snapshot -9M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 1273,
        "actualCost": 3001
      },
      {
        "month": "Snapshot -6M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 1620,
        "actualCost": 3829
      },
      {
        "month": "Snapshot -3M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 1968,
        "actualCost": 4657
      },
      {
        "month": "Current Snapshot",
        "planned": 10,
        "actual": 5,
        "plannedCost": 2315,
        "actualCost": 5174
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100193",
          "label": "Hubli-Ankola(Nl),Swr...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-9",
          "label": "SWR",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-9",
          "label": "Land Acquisition Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100193",
          "target": "AGENCY-9",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-220100193",
          "target": "ISSUE-9",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "land_acquisition_issue",
    "supportingEvidence": "Documented in official report 2020-21_Q1_Apr-Jun.pdf (p. 372): \"KARNATAKA Project was sanctioned in 1997-98 at a cost of Rs.483.15 Crore and anticipated cost of project is Rs.3750 Crores. Requirement of land for the project has been reduced after several round of review from 965 Ha to 595 Ha. Project has gone thr...\"",
    "recommendedAction": "Special Land Acquisition Officer (SLAO) escalation & district administration coordination for private/revenue land notification.",
    "multiHorizonRisk": {
      "3m": 9.8,
      "6m": 15.4,
      "12m": 32.1,
      "15m": 21.5,
      "18m": 25.0
    },
    "multiHorizonDelay": {
      "3m": 0.0,
      "6m": 0.6,
      "12m": 1.3,
      "15m": 6.8,
      "18m": 3.8
    },
    "multiHorizonCostInc": {
      "3m": 0.03,
      "6m": 0.08,
      "12m": 1.11,
      "15m": 0.74,
      "18m": 0.86
    }
  },
  {
    "id": "OCMS-220100205",
    "rawId": "220100205",
    "name": "Muneerabad- Mahaboobnagar(Nl ),Scr",
    "shortName": "Muneerabad- Mahaboobnagar",
    "state": "Multi State",
    "district": "Multi State Regional Corridor",
    "region": "National",
    "ministry": "Ministry of Heavy Industries",
    "department": "Department of Heavy Industry",
    "sector": "Industrial Infrastructure",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 1723,
    "approvedCost": 1723,
    "currentCost": 3382,
    "costOverrunCr": 1659,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 100,
    "riskLevel": "Low",
    "riskScore": 6.1,
    "riskBreakdown": {
      "costOverrunRisk": 3,
      "timeDelayRisk": 4,
      "progressRisk": 5,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 0.9,
        "category": "Execution Pace",
        "description": "Model attribution +0.089 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Project Age Months",
        "impact": 0.9,
        "category": "Project Feature",
        "description": "Model attribution +0.086 associated with prediction runway.",
        "featureValue": 326.0
      },
      {
        "factor": "Baseline Cost",
        "impact": 0.5,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.054 associated with prediction runway.",
        "featureValue": 1723.0
      },
      {
        "factor": "Forecast Vs Revised Completion Days (Missing Reporting)",
        "impact": 0.5,
        "category": "Timeline",
        "description": "Model attribution +0.046 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Schedule Slip Current Months",
        "impact": 0.4,
        "category": "Timeline",
        "description": "Model attribution +0.039 associated with prediction runway.",
        "featureValue": 275.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 75,
        "actual": 70,
        "plannedCost": 689,
        "actualCost": 1420
      },
      {
        "month": "Snapshot -9M",
        "planned": 82,
        "actual": 78,
        "plannedCost": 948,
        "actualCost": 1961
      },
      {
        "month": "Snapshot -6M",
        "planned": 88,
        "actual": 85,
        "plannedCost": 1206,
        "actualCost": 2502
      },
      {
        "month": "Snapshot -3M",
        "planned": 95,
        "actual": 93,
        "plannedCost": 1465,
        "actualCost": 3044
      },
      {
        "month": "Current Snapshot",
        "planned": 100,
        "actual": 100,
        "plannedCost": 1723,
        "actualCost": 3382
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100205",
          "label": "Muneerabad- Mahaboobnagar(Nl...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-10",
          "label": "SCR",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-10",
          "label": "Land Acquisition Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100205",
          "target": "AGENCY-10",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-220100205",
          "target": "ISSUE-10",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "land_acquisition_issue",
    "supportingEvidence": "Documented in official report 2020-21_Q4_Jan-Mar.pdf (p. 303): \"(SCR: 652.18, SWR: 547.68 761.40) Cr SWR : GINIGERA - RAICHUR NEW BG LINE PROJECT: This project is with cost sharing of 50:50 with GoK incl land cost. Land acq details - Total Land required 980 Ha. Land acquired till date - 534 Ha Progress - The proj...\"",
    "recommendedAction": "Special Land Acquisition Officer (SLAO) escalation & district administration coordination for private/revenue land notification.",
    "multiHorizonRisk": {
      "3m": 6.1,
      "6m": 25.8,
      "12m": 33.6,
      "15m": 32.1,
      "18m": 25.7
    },
    "multiHorizonDelay": {
      "3m": 0.0,
      "6m": 1.6,
      "12m": 3.7,
      "15m": 3.2,
      "18m": 2.9
    },
    "multiHorizonCostInc": {
      "3m": 0.0,
      "6m": 0.16,
      "12m": 0.0,
      "15m": 0.34,
      "18m": 0.36
    }
  },
  {
    "id": "OCMS-220100208",
    "rawId": "220100208",
    "name": "Howrah-Amta-Champadanga Nl (Ser)",
    "shortName": "Howrah-Amta-Champadanga Nl",
    "state": "West Bengal",
    "district": "West Bengal Regional Corridor",
    "region": "Eastern",
    "ministry": "Ministry of Railways",
    "department": "Railway Board & Zonal Railways",
    "sector": "Railways & DFC",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 393,
    "approvedCost": 393,
    "currentCost": 1026,
    "costOverrunCr": 633,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 57,
    "riskLevel": "Low",
    "riskScore": 12.3,
    "riskBreakdown": {
      "costOverrunRisk": 2,
      "timeDelayRisk": 11,
      "progressRisk": 10,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Prev Physical Progress",
        "impact": 1.2,
        "category": "Execution Pace",
        "description": "Model attribution +0.120 associated with prediction runway.",
        "featureValue": 57.0
      },
      {
        "factor": "Catchup Pressure",
        "impact": 1.2,
        "category": "Execution Pace",
        "description": "Model attribution +0.115 associated with prediction runway.",
        "featureValue": 1290.0
      },
      {
        "factor": "Days To Forecast Completion",
        "impact": 1.0,
        "category": "Timeline",
        "description": "Model attribution +0.102 associated with prediction runway.",
        "featureValue": -5600.0
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 0.7,
        "category": "Execution Pace",
        "description": "Model attribution +0.068 associated with prediction runway.",
        "featureValue": 1290.0
      },
      {
        "factor": "Expenditure Acceleration Per 30D (Missing Reporting)",
        "impact": 0.5,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.052 associated with prediction runway.",
        "featureValue": 0.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 32,
        "actual": 27,
        "plannedCost": 157,
        "actualCost": 431
      },
      {
        "month": "Snapshot -9M",
        "planned": 39,
        "actual": 35,
        "plannedCost": 216,
        "actualCost": 595
      },
      {
        "month": "Snapshot -6M",
        "planned": 45,
        "actual": 42,
        "plannedCost": 275,
        "actualCost": 759
      },
      {
        "month": "Snapshot -3M",
        "planned": 52,
        "actual": 50,
        "plannedCost": 334,
        "actualCost": 923
      },
      {
        "month": "Current Snapshot",
        "planned": 62,
        "actual": 57,
        "plannedCost": 393,
        "actualCost": 1026
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100208",
          "label": "Howrah-Amta-Champadanga Nl (...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-11",
          "label": "SOUTH EASTERN RAILWAY",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-11",
          "label": "Land Acquisition Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100208",
          "target": "AGENCY-11",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-220100208",
          "target": "ISSUE-11",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "land_acquisition_issue",
    "supportingEvidence": "Documented in official report 2022-23_Q1_Apr-Jun.pdf (p. 313): \"Howrah-Amta {42 Km): Commissioned. Balance portion of Project stalled due to land acquisition problem. State Govt. did not acquire land even deposit of full demand of Rs. 23.62 cr. ME advised to CS/Govt of West Bengal to provide land to the Railway o...\"",
    "recommendedAction": "Special Land Acquisition Officer (SLAO) escalation & district administration coordination for private/revenue land notification.",
    "multiHorizonRisk": {
      "3m": 12.3,
      "6m": 20.0,
      "12m": 56.3,
      "15m": 74.4,
      "18m": 61.1
    },
    "multiHorizonDelay": {
      "3m": 0.4,
      "6m": 0.5,
      "12m": 1.1,
      "15m": 40.4,
      "18m": 83.6
    },
    "multiHorizonCostInc": {
      "3m": 0.02,
      "6m": 0.08,
      "12m": 1.79,
      "15m": 0.16,
      "18m": 0.62
    }
  },
  {
    "id": "OCMS-220100220",
    "rawId": "220100220",
    "name": "Macherla-Nalgonda(Nl)(Scr)",
    "shortName": "Macherla-Nalgonda",
    "state": "Telangana",
    "district": "Telangana Regional Corridor",
    "region": "Southern",
    "ministry": "Ministry of Railways",
    "department": "Railway Board & Zonal Railways",
    "sector": "Railways & DFC",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 458,
    "approvedCost": 458,
    "currentCost": 458,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 5,
    "riskLevel": "High",
    "riskScore": 92.7,
    "riskBreakdown": {
      "costOverrunRisk": 97,
      "timeDelayRisk": 17,
      "progressRisk": 74,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Remaining Months (Missing Reporting)",
        "impact": 25.5,
        "category": "Project Feature",
        "description": "Model attribution +2.550 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Days To Forecast Completion",
        "impact": 10.7,
        "category": "Timeline",
        "description": "Model attribution +1.073 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 2.0,
        "category": "Execution Pace",
        "description": "Model attribution +0.200 associated with prediction runway.",
        "featureValue": 7.64
      },
      {
        "factor": "Catchup Pressure",
        "impact": 0.6,
        "category": "Execution Pace",
        "description": "Model attribution +0.063 associated with prediction runway.",
        "featureValue": 6.66
      },
      {
        "factor": "Project Age Months",
        "impact": 0.6,
        "category": "Project Feature",
        "description": "Model attribution +0.061 associated with prediction runway.",
        "featureValue": 287.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 183,
        "actualCost": 192
      },
      {
        "month": "Snapshot -9M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 252,
        "actualCost": 266
      },
      {
        "month": "Snapshot -6M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 321,
        "actualCost": 339
      },
      {
        "month": "Snapshot -3M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 390,
        "actualCost": 412
      },
      {
        "month": "Current Snapshot",
        "planned": 10,
        "actual": 5,
        "plannedCost": 458,
        "actualCost": 458
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100220",
          "label": "Macherla-Nalgonda(Nl)(Scr)...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-12",
          "label": "SOUTH CENTRAL RAILWAY",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-12",
          "label": "Land Acquisition Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100220",
          "target": "AGENCY-12",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-220100220",
          "target": "ISSUE-12",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "land_acquisition_issue",
    "supportingEvidence": "Documented in official report 2019-20_Q1_Apr-Jun.pdf (p. 351): \"MACHERLA-NALGONDA(NL)(SCR), NALGONDA, TELANGANA, 76 KM Present status: Detailed estimate sanctioned by Board in September 2011. Land Acquisition and fixing of alignment under process. The project has been identified as \"Special Railway Project\" withi...\"",
    "recommendedAction": "Special Land Acquisition Officer (SLAO) escalation & district administration coordination for private/revenue land notification.",
    "multiHorizonRisk": {
      "3m": 92.7,
      "6m": 7.2,
      "12m": 14.3,
      "15m": 10.2,
      "18m": 20.2
    },
    "multiHorizonDelay": {
      "3m": 0.5,
      "6m": 1.7,
      "12m": 6.8,
      "15m": 25.3,
      "18m": 26.3
    },
    "multiHorizonCostInc": {
      "3m": 8.65,
      "6m": 0.03,
      "12m": 1.2,
      "15m": 0.83,
      "18m": 0.95
    }
  },
  {
    "id": "OCMS-220100222",
    "rawId": "220100222",
    "name": "Koderma-Ranchi Via Barkakana (Nl),Ecr",
    "shortName": "Koderma-Ranchi Via Barkakana",
    "state": "Jharkhand",
    "district": "Jharkhand Regional Corridor",
    "region": "Eastern",
    "ministry": "Ministry of Railways",
    "department": "Railway Board & Zonal Railways",
    "sector": "Railways & DFC",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 1033,
    "approvedCost": 1033,
    "currentCost": 3800,
    "costOverrunCr": 2767,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 100,
    "riskLevel": "Low",
    "riskScore": 10.6,
    "riskBreakdown": {
      "costOverrunRisk": 13,
      "timeDelayRisk": 7,
      "progressRisk": 8,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Prev Physical Progress",
        "impact": 0.9,
        "category": "Execution Pace",
        "description": "Model attribution +0.095 associated with prediction runway.",
        "featureValue": 93.0
      },
      {
        "factor": "Project Age Months",
        "impact": 0.9,
        "category": "Project Feature",
        "description": "Model attribution +0.089 associated with prediction runway.",
        "featureValue": 291.0
      },
      {
        "factor": "Expenditure Ratio Forecast",
        "impact": 0.8,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.085 associated with prediction runway.",
        "featureValue": 1.02
      },
      {
        "factor": "Progress Velocity Historical Std",
        "impact": 0.7,
        "category": "Execution Pace",
        "description": "Model attribution +0.074 associated with prediction runway.",
        "featureValue": 0.89
      },
      {
        "factor": "Expenditure Ratio Original",
        "impact": 0.5,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.047 associated with prediction runway.",
        "featureValue": 3.76
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 75,
        "actual": 70,
        "plannedCost": 413,
        "actualCost": 1596
      },
      {
        "month": "Snapshot -9M",
        "planned": 82,
        "actual": 78,
        "plannedCost": 568,
        "actualCost": 2204
      },
      {
        "month": "Snapshot -6M",
        "planned": 88,
        "actual": 85,
        "plannedCost": 723,
        "actualCost": 2812
      },
      {
        "month": "Snapshot -3M",
        "planned": 95,
        "actual": 93,
        "plannedCost": 878,
        "actualCost": 3420
      },
      {
        "month": "Current Snapshot",
        "planned": 100,
        "actual": 100,
        "plannedCost": 1033,
        "actualCost": 3800
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100222",
          "label": "Koderma-Ranchi Via Barkakana...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-13",
          "label": "EAST CENTRAL RAILWAYS",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-13",
          "label": "Land Acquisition Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100222",
          "target": "AGENCY-13",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-220100222",
          "target": "ISSUE-13",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "land_acquisition_issue",
    "supportingEvidence": "Documented in official report 2019-20_Q1_Apr-Jun.pdf (p. 258): \"The original date of commissioning is July 2005 but anticipated date of commissioning is not provided. FLS completed. Estimate sanctioned. Land acquisition completed in Koderma, Hazaribagh and Chatra district. Present Status: Earthwork : 508.88 lac c...\"",
    "recommendedAction": "Special Land Acquisition Officer (SLAO) escalation & district administration coordination for private/revenue land notification.",
    "multiHorizonRisk": {
      "3m": 10.6,
      "6m": 22.8,
      "12m": 40.9,
      "15m": 72.2,
      "18m": 74.4
    },
    "multiHorizonDelay": {
      "3m": 0.0,
      "6m": 0.0,
      "12m": 0.6,
      "15m": 2.7,
      "18m": 4.3
    },
    "multiHorizonCostInc": {
      "3m": 0.34,
      "6m": 0.39,
      "12m": 1.65,
      "15m": 0.67,
      "18m": 2.25
    }
  },
  {
    "id": "OCMS-220100252",
    "rawId": "220100252",
    "name": "Angamali-Sabarimala (N.L.)(Sr)",
    "shortName": "Angamali-Sabarimala",
    "state": "Kerala",
    "district": "Kerala Regional Corridor",
    "region": "Southern",
    "ministry": "Ministry of Railways",
    "department": "Railway Board & Zonal Railways",
    "sector": "Railways & DFC",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 1566,
    "approvedCost": 1566,
    "currentCost": 2816,
    "costOverrunCr": 1250,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 6,
    "riskLevel": "High",
    "riskScore": 92.7,
    "riskBreakdown": {
      "costOverrunRisk": 97,
      "timeDelayRisk": 20,
      "progressRisk": 74,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Remaining Months (Missing Reporting)",
        "impact": 24.5,
        "category": "Project Feature",
        "description": "Model attribution +2.454 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Days To Forecast Completion",
        "impact": 9.7,
        "category": "Timeline",
        "description": "Model attribution +0.969 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 1.6,
        "category": "Execution Pace",
        "description": "Model attribution +0.160 associated with prediction runway.",
        "featureValue": 7.64
      },
      {
        "factor": "Project Age Months",
        "impact": 1.0,
        "category": "Project Feature",
        "description": "Model attribution +0.097 associated with prediction runway.",
        "featureValue": 284.0
      },
      {
        "factor": "Remaining Forecast Cost",
        "impact": 0.8,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.079 associated with prediction runway.",
        "featureValue": 2551.32
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 626,
        "actualCost": 1183
      },
      {
        "month": "Snapshot -9M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 861,
        "actualCost": 1633
      },
      {
        "month": "Snapshot -6M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 1096,
        "actualCost": 2084
      },
      {
        "month": "Snapshot -3M",
        "planned": 1,
        "actual": 0,
        "plannedCost": 1331,
        "actualCost": 2534
      },
      {
        "month": "Current Snapshot",
        "planned": 11,
        "actual": 6,
        "plannedCost": 1566,
        "actualCost": 2816
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100252",
          "label": "Angamali-Sabarimala (N.L.)(S...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-14",
          "label": "SOUTHERN RAILWAY",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-14",
          "label": "Land Acquisition Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100252",
          "target": "AGENCY-14",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-220100252",
          "target": "ISSUE-14",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "land_acquisition_issue",
    "supportingEvidence": "Documented in official report 2020-21_Q1_Apr-Jun.pdf (p. 381): \"ANGAMALI-SABARIMALA (N.L.)(SR), (SR), KERALA The section between Angamali & Kaladi can be opened only after balance land is handed over and sorting out the local issues by Kerala State Government. Commissioning of balance length between Kaladi and Er...\"",
    "recommendedAction": "Special Land Acquisition Officer (SLAO) escalation & district administration coordination for private/revenue land notification.",
    "multiHorizonRisk": {
      "3m": 92.7,
      "6m": 7.3,
      "12m": 17.0,
      "15m": 8.2,
      "18m": 23.1
    },
    "multiHorizonDelay": {
      "3m": 0.6,
      "6m": 2.6,
      "12m": 8.1,
      "15m": 22.0,
      "18m": 25.1
    },
    "multiHorizonCostInc": {
      "3m": 7.89,
      "6m": 0.1,
      "12m": 1.09,
      "15m": 1.27,
      "18m": 1.28
    }
  },
  {
    "id": "OCMS-220100262",
    "rawId": "220100262",
    "name": "Tiruchirappali-Nagore-Karaikkal(Sr)(Gc)",
    "shortName": "Tiruchirappali-Nagore-Karaikkal",
    "state": "Tamil Nadu",
    "district": "Tamil Nadu Regional Corridor",
    "region": "Southern",
    "ministry": "Ministry of Railways",
    "department": "Railway Board & Zonal Railways",
    "sector": "Railways & DFC",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 1250,
    "approvedCost": 1250,
    "currentCost": 1549,
    "costOverrunCr": 299,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 5,
    "riskLevel": "Low",
    "riskScore": 11.7,
    "riskBreakdown": {
      "costOverrunRisk": 3,
      "timeDelayRisk": 10,
      "progressRisk": 9,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Prev Physical Progress",
        "impact": 1.0,
        "category": "Execution Pace",
        "description": "Model attribution +0.103 associated with prediction runway.",
        "featureValue": 77.0
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 0.8,
        "category": "Execution Pace",
        "description": "Model attribution +0.083 associated with prediction runway.",
        "featureValue": 7.64
      },
      {
        "factor": "Project Age Months",
        "impact": 0.3,
        "category": "Project Feature",
        "description": "Model attribution +0.034 associated with prediction runway.",
        "featureValue": 54.0
      },
      {
        "factor": "Forecast Cost Velocity Historical Std",
        "impact": 0.3,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.031 associated with prediction runway.",
        "featureValue": 64.98
      },
      {
        "factor": "Anticipated Cost",
        "impact": 0.3,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.030 associated with prediction runway.",
        "featureValue": 1549.09
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 500,
        "actualCost": 651
      },
      {
        "month": "Snapshot -9M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 688,
        "actualCost": 898
      },
      {
        "month": "Snapshot -6M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 875,
        "actualCost": 1146
      },
      {
        "month": "Snapshot -3M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 1062,
        "actualCost": 1394
      },
      {
        "month": "Current Snapshot",
        "planned": 10,
        "actual": 5,
        "plannedCost": 1250,
        "actualCost": 1549
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100262",
          "label": "Tiruchirappali-Nagore-Karaik...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-15",
          "label": "SOUTHERN RAILWAY",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-15",
          "label": "Land Acquisition Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100262",
          "target": "AGENCY-15",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-220100262",
          "target": "ISSUE-15",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "land_acquisition_issue",
    "supportingEvidence": "Documented in official report 2020-21_Q1_Apr-Jun.pdf (p. 380): \"m-Thirukuvalai-Tiruturaipundi NL (38 Km) and Peralam-Karaikal New Line (23 km). In Nagappattinam-Thirukuvalai-Tiruturaipundi NL section,the land acquisition was completed in 2013-14. Now, earthwork & bridge works are in progress and targeted for comp...\"",
    "recommendedAction": "Special Land Acquisition Officer (SLAO) escalation & district administration coordination for private/revenue land notification.",
    "multiHorizonRisk": {
      "3m": 11.7,
      "6m": 24.7,
      "12m": 49.0,
      "15m": 61.6,
      "18m": 62.2
    },
    "multiHorizonDelay": {
      "3m": 0.0,
      "6m": 0.6,
      "12m": 1.8,
      "15m": 3.7,
      "18m": 6.0
    },
    "multiHorizonCostInc": {
      "3m": 0.03,
      "6m": 0.04,
      "12m": 0.35,
      "15m": 0.45,
      "18m": 0.87
    }
  },
  {
    "id": "OCMS-220100265",
    "rawId": "220100265",
    "name": "Kotapalli - Narasapur New Line",
    "shortName": "Kotapalli - Narasapur New Line",
    "state": "Andhra Pradesh",
    "district": "Andhra Pradesh Regional Corridor",
    "region": "Southern",
    "ministry": "Ministry of Railways",
    "department": "Railway Board & Zonal Railways",
    "sector": "Railways & DFC",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 2501,
    "approvedCost": 2501,
    "currentCost": 2501,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 30,
    "riskLevel": "Low",
    "riskScore": 24.1,
    "riskBreakdown": {
      "costOverrunRisk": 9,
      "timeDelayRisk": 16,
      "progressRisk": 19,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Anticipated Cost (Missing Reporting)",
        "impact": 4.0,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.397 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Project Age Months",
        "impact": 2.8,
        "category": "Project Feature",
        "description": "Model attribution +0.283 associated with prediction runway.",
        "featureValue": 204.0
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 2.0,
        "category": "Execution Pace",
        "description": "Model attribution +0.197 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Baseline Cost",
        "impact": 0.8,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.079 associated with prediction runway.",
        "featureValue": 2501.0
      },
      {
        "factor": "Remaining Forecast Cost",
        "impact": 0.7,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.072 associated with prediction runway.",
        "featureValue": 1083.73
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 5,
        "actual": 0,
        "plannedCost": 1000,
        "actualCost": 1050
      },
      {
        "month": "Snapshot -9M",
        "planned": 12,
        "actual": 8,
        "plannedCost": 1376,
        "actualCost": 1451
      },
      {
        "month": "Snapshot -6M",
        "planned": 18,
        "actual": 15,
        "plannedCost": 1751,
        "actualCost": 1851
      },
      {
        "month": "Snapshot -3M",
        "planned": 25,
        "actual": 23,
        "plannedCost": 2126,
        "actualCost": 2251
      },
      {
        "month": "Current Snapshot",
        "planned": 35,
        "actual": 30,
        "plannedCost": 2501,
        "actualCost": 2501
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100265",
          "label": "Kotapalli - Narasapur New Li...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-16",
          "label": "South Central Railway [SC",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-16",
          "label": "Land Acquisition Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100265",
          "target": "AGENCY-16",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-220100265",
          "target": "ISSUE-16",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "land_acquisition_issue",
    "supportingEvidence": "Documented in official report 2019-20_Q4_Jan-Mar.pdf (p. 355): \"evised estimate for Rs. 2120.16 cr is sanctioned by Railway Board vide their letter no. 2001/W-2/SC/NL/KN/pt dtd. 24.10.17.Bridge works and land acquisition works are in progress...\"",
    "recommendedAction": "Special Land Acquisition Officer (SLAO) escalation & district administration coordination for private/revenue land notification.",
    "multiHorizonRisk": {
      "3m": 24.1,
      "6m": 40.2,
      "12m": 57.7,
      "15m": 66.1,
      "18m": 81.6
    },
    "multiHorizonDelay": {
      "3m": 0.1,
      "6m": 1.3,
      "12m": 3.2,
      "15m": 11.6,
      "18m": 9.2
    },
    "multiHorizonCostInc": {
      "3m": 0.14,
      "6m": 0.4,
      "12m": 2.48,
      "15m": 1.52,
      "18m": 3.35
    }
  },
  {
    "id": "OCMS-220100266",
    "rawId": "220100266",
    "name": "New Maynaguri To Jogighopa Via Changrabandha (Nl),Nefr",
    "shortName": "New Maynaguri To Jogighopa Via Chan",
    "state": "Multi State",
    "district": "Multi State Regional Corridor",
    "region": "National",
    "ministry": "Ministry of Railways",
    "department": "Railway Board & Zonal Railways",
    "sector": "Railways & DFC",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 1180,
    "approvedCost": 1180,
    "currentCost": 4541,
    "costOverrunCr": 3361,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2026-12-31",
    "timeDelayMonths": 156,
    "status": "Delayed",
    "progressPercent": 100,
    "riskLevel": "Low",
    "riskScore": 17.8,
    "riskBreakdown": {
      "costOverrunRisk": 5,
      "timeDelayRisk": 9,
      "progressRisk": 14,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Prev Physical Progress",
        "impact": 0.9,
        "category": "Execution Pace",
        "description": "Model attribution +0.094 associated with prediction runway.",
        "featureValue": 99.85
      },
      {
        "factor": "Expenditure Velocity Per 30D",
        "impact": 0.7,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.071 associated with prediction runway.",
        "featureValue": 15.56
      },
      {
        "factor": "Project Age Months",
        "impact": 0.6,
        "category": "Project Feature",
        "description": "Model attribution +0.061 associated with prediction runway.",
        "featureValue": 263.0
      },
      {
        "factor": "Schedule Slip Current Months",
        "impact": 0.6,
        "category": "Timeline",
        "description": "Model attribution +0.058 associated with prediction runway.",
        "featureValue": 156.0
      },
      {
        "factor": "Expenditure Acceleration Per 30D",
        "impact": 0.5,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.050 associated with prediction runway.",
        "featureValue": -3.09
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 75,
        "actual": 70,
        "plannedCost": 472,
        "actualCost": 1907
      },
      {
        "month": "Snapshot -9M",
        "planned": 82,
        "actual": 78,
        "plannedCost": 649,
        "actualCost": 2634
      },
      {
        "month": "Snapshot -6M",
        "planned": 88,
        "actual": 85,
        "plannedCost": 826,
        "actualCost": 3361
      },
      {
        "month": "Snapshot -3M",
        "planned": 95,
        "actual": 93,
        "plannedCost": 1003,
        "actualCost": 4087
      },
      {
        "month": "Current Snapshot",
        "planned": 100,
        "actual": 100,
        "plannedCost": 1180,
        "actualCost": 4541
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100266",
          "label": "New Maynaguri To Jogighopa V...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-17",
          "label": "NORTH EAST FRONTIER RAILW",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-17",
          "label": "Covid Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100266",
          "target": "AGENCY-17",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-220100266",
          "target": "ISSUE-17",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "covid_issue",
    "supportingEvidence": "Documented in official report 2020-21_Q2_Jul-Sep.pdf (p. 223): \"(ix) Ph-VI: Alamganj-Bilasipara (26.14 Km): CRS inspection done on 28.03.2019 and Authorisation received @100 kmph on 30.03.2019 (x) Due to COVID-19 pandemic and continuous heavy rain in Assam upto September 2020, the progress of work suffered badly....\"",
    "recommendedAction": "Contractual time-extension audit without financial liability.",
    "multiHorizonRisk": {
      "3m": 17.8,
      "6m": 29.1,
      "12m": 65.2,
      "15m": 75.6,
      "18m": 78.9
    },
    "multiHorizonDelay": {
      "3m": 0.3,
      "6m": 0.3,
      "12m": 2.1,
      "15m": 4.2,
      "18m": 4.9
    },
    "multiHorizonCostInc": {
      "3m": 0.06,
      "6m": 0.13,
      "12m": 1.55,
      "15m": 0.86,
      "18m": 0.97
    }
  },
  {
    "id": "OCMS-220100272",
    "rawId": "220100272",
    "name": "Tarakeshwar-Bishnupur New Line [82.47 Km]",
    "shortName": "Tarakeshwar-Bishnupur New Line [82.",
    "state": "West Bengal",
    "district": "West Bengal Regional Corridor",
    "region": "Eastern",
    "ministry": "Ministry of Railways",
    "department": "Railway Board & Zonal Railways",
    "sector": "Railways & DFC",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 1189,
    "approvedCost": 1189,
    "currentCost": 1189,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 97,
    "riskLevel": "Medium",
    "riskScore": 46.3,
    "riskBreakdown": {
      "costOverrunRisk": 12,
      "timeDelayRisk": 46,
      "progressRisk": 37,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Anticipated Cost (Missing Reporting)",
        "impact": 4.3,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.429 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 2.0,
        "category": "Execution Pace",
        "description": "Model attribution +0.201 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Project Age Months",
        "impact": 1.5,
        "category": "Project Feature",
        "description": "Model attribution +0.154 associated with prediction runway.",
        "featureValue": 300.0
      },
      {
        "factor": "Prev Physical Progress",
        "impact": 1.4,
        "category": "Execution Pace",
        "description": "Model attribution +0.141 associated with prediction runway.",
        "featureValue": 96.0
      },
      {
        "factor": "Catchup Pressure",
        "impact": 1.4,
        "category": "Execution Pace",
        "description": "Model attribution +0.139 associated with prediction runway.",
        "featureValue": 98.94
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 72,
        "actual": 67,
        "plannedCost": 476,
        "actualCost": 499
      },
      {
        "month": "Snapshot -9M",
        "planned": 79,
        "actual": 75,
        "plannedCost": 654,
        "actualCost": 690
      },
      {
        "month": "Snapshot -6M",
        "planned": 85,
        "actual": 82,
        "plannedCost": 832,
        "actualCost": 880
      },
      {
        "month": "Snapshot -3M",
        "planned": 92,
        "actual": 90,
        "plannedCost": 1011,
        "actualCost": 1070
      },
      {
        "month": "Current Snapshot",
        "planned": 100,
        "actual": 97,
        "plannedCost": 1189,
        "actualCost": 1189
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100272",
          "label": "Tarakeshwar-Bishnupur New Li...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-18",
          "label": "Eastern Railway [ER] - I",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-18",
          "label": "Land Acquisition Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100272",
          "target": "AGENCY-18",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-220100272",
          "target": "ISSUE-18",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "land_acquisition_issue",
    "supportingEvidence": "Documented in official report 2019-20_Q1_Apr-Jun.pdf (p. 278): \"4-15 - Goghat- Kamarpukur (5.50 km) - Almost completed except station of Kamarpukur.Land is available. - Kamarpukur- Mayonapur (20.35 km) - Land acquisition is in progress. - Tarakeshwar to Dhaniakhali (19 km) - Sanctioned as MM (costing Rs. 133.58 c...\"",
    "recommendedAction": "Special Land Acquisition Officer (SLAO) escalation & district administration coordination for private/revenue land notification.",
    "multiHorizonRisk": {
      "3m": 46.3,
      "6m": 76.4,
      "12m": 66.8,
      "15m": 66.7,
      "18m": 60.2
    },
    "multiHorizonDelay": {
      "3m": 0.9,
      "6m": 3.6,
      "12m": 6.2,
      "15m": 5.8,
      "18m": 5.5
    },
    "multiHorizonCostInc": {
      "3m": 0.08,
      "6m": 0.38,
      "12m": 2.81,
      "15m": 0.43,
      "18m": 0.6
    }
  },
  {
    "id": "OCMS-220100284",
    "rawId": "220100284",
    "name": "Khurda-Bolangir New Broad Gauge Rail Link [301Km]",
    "shortName": "Khurda-Bolangir New Broad Gauge Rai",
    "state": "Odisha",
    "district": "Odisha Regional Corridor",
    "region": "Eastern",
    "ministry": "Ministry of Railways",
    "department": "Railway Board & Zonal Railways",
    "sector": "Railways & DFC",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 3792,
    "approvedCost": 3792,
    "currentCost": 3792,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 92,
    "riskLevel": "Low",
    "riskScore": 29.5,
    "riskBreakdown": {
      "costOverrunRisk": 12,
      "timeDelayRisk": 11,
      "progressRisk": 24,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Anticipated Cost (Missing Reporting)",
        "impact": 4.3,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.427 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Project Age Months",
        "impact": 2.4,
        "category": "Project Feature",
        "description": "Model attribution +0.237 associated with prediction runway.",
        "featureValue": 384.0
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 1.9,
        "category": "Execution Pace",
        "description": "Model attribution +0.186 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Prev Physical Progress",
        "impact": 1.1,
        "category": "Execution Pace",
        "description": "Model attribution +0.108 associated with prediction runway.",
        "featureValue": 91.0
      },
      {
        "factor": "Expenditure Ratio Forecast",
        "impact": 1.0,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.102 associated with prediction runway.",
        "featureValue": 1.1
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 67,
        "actual": 62,
        "plannedCost": 1517,
        "actualCost": 1593
      },
      {
        "month": "Snapshot -9M",
        "planned": 74,
        "actual": 70,
        "plannedCost": 2086,
        "actualCost": 2199
      },
      {
        "month": "Snapshot -6M",
        "planned": 80,
        "actual": 77,
        "plannedCost": 2654,
        "actualCost": 2806
      },
      {
        "month": "Snapshot -3M",
        "planned": 87,
        "actual": 85,
        "plannedCost": 3223,
        "actualCost": 3413
      },
      {
        "month": "Current Snapshot",
        "planned": 97,
        "actual": 92,
        "plannedCost": 3792,
        "actualCost": 3792
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100284",
          "label": "Khurda-Bolangir New Broad Ga...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-19",
          "label": "East Coast Railway [ECoR]",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-19",
          "label": "Forest Clearance Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100284",
          "target": "AGENCY-19",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-220100284",
          "target": "ISSUE-19",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "forest_clearance_issue",
    "supportingEvidence": "Documented in official report 2019-20_Q4_Jan-Mar.pdf (p. 285): \"ed in 2019-20= 11.925 Km (Nayagarh- Mahipur on 26.12.2019.) Anticipated date of commissioning is subject to availability of entire land and forest clearance by Dec 2020....\"",
    "recommendedAction": "MoEFCC / Regional Empowered Committee Stage-I & Stage-II clearance escalation; Parivesh portal tracking.",
    "multiHorizonRisk": {
      "3m": 29.5,
      "6m": 56.2,
      "12m": 75.7,
      "15m": 75.9,
      "18m": 84.7
    },
    "multiHorizonDelay": {
      "3m": 0.2,
      "6m": 1.4,
      "12m": 4.1,
      "15m": 5.0,
      "18m": 6.3
    },
    "multiHorizonCostInc": {
      "3m": 0.18,
      "6m": 0.29,
      "12m": 4.86,
      "15m": 0.67,
      "18m": 4.21
    }
  },
  {
    "id": "OCMS-220100285",
    "rawId": "220100285",
    "name": "Haridaspur-Paradeep(Nl)",
    "shortName": "Haridaspur-Paradeep",
    "state": "Odisha",
    "district": "Odisha Regional Corridor",
    "region": "Eastern",
    "ministry": "Ministry of Railways",
    "department": "Railway Board & Zonal Railways",
    "sector": "Railways & DFC",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 1186,
    "approvedCost": 1186,
    "currentCost": 2397,
    "costOverrunCr": 1211,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 100,
    "riskLevel": "Low",
    "riskScore": 6.5,
    "riskBreakdown": {
      "costOverrunRisk": 3,
      "timeDelayRisk": 3,
      "progressRisk": 5,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Project Age Months",
        "impact": 0.9,
        "category": "Project Feature",
        "description": "Model attribution +0.091 associated with prediction runway.",
        "featureValue": 305.0
      },
      {
        "factor": "Expenditure Velocity Per 30D",
        "impact": 0.6,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.063 associated with prediction runway.",
        "featureValue": 80.19
      },
      {
        "factor": "Snapshot Gap Days",
        "impact": 0.6,
        "category": "Timeline",
        "description": "Model attribution +0.062 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Forecast Vs Revised Completion Days (Missing Reporting)",
        "impact": 0.5,
        "category": "Timeline",
        "description": "Model attribution +0.051 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Schedule Slip Current Months",
        "impact": 0.4,
        "category": "Timeline",
        "description": "Model attribution +0.044 associated with prediction runway.",
        "featureValue": 31.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 75,
        "actual": 70,
        "plannedCost": 474,
        "actualCost": 1007
      },
      {
        "month": "Snapshot -9M",
        "planned": 82,
        "actual": 78,
        "plannedCost": 652,
        "actualCost": 1390
      },
      {
        "month": "Snapshot -6M",
        "planned": 88,
        "actual": 85,
        "plannedCost": 830,
        "actualCost": 1774
      },
      {
        "month": "Snapshot -3M",
        "planned": 95,
        "actual": 93,
        "plannedCost": 1008,
        "actualCost": 2157
      },
      {
        "month": "Current Snapshot",
        "planned": 100,
        "actual": 100,
        "plannedCost": 1186,
        "actualCost": 2397
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100285",
          "label": "Haridaspur-Paradeep(Nl)...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-20",
          "label": "RAIL VIKAS NIGAM LTD.",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-20",
          "label": "Land Acquisition Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100285",
          "target": "AGENCY-20",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-220100285",
          "target": "ISSUE-20",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "land_acquisition_issue",
    "supportingEvidence": "Documented in official report 2019-20_Q2_Jul-Sep.pdf (p. 343): \"major & minor bridges was awarded in June-2007. The contrct was terminated in Oct-10 as contractor stopped work citing non availability of land as the land looser were demanding more compensation and not allowing work. The contract for 2 Important br...\"",
    "recommendedAction": "Special Land Acquisition Officer (SLAO) escalation & district administration coordination for private/revenue land notification.",
    "multiHorizonRisk": {
      "3m": 6.5,
      "6m": 11.9,
      "12m": 34.7,
      "15m": 58.7,
      "18m": 68.7
    },
    "multiHorizonDelay": {
      "3m": 0.0,
      "6m": 0.5,
      "12m": 0.9,
      "15m": 7.3,
      "18m": 6.7
    },
    "multiHorizonCostInc": {
      "3m": 0.07,
      "6m": 0.18,
      "12m": 1.54,
      "15m": 0.41,
      "18m": 0.85
    }
  },
  {
    "id": "OCMS-220100288",
    "rawId": "220100288",
    "name": "Jiribam-Imphal New Line Project",
    "shortName": "Jiribam-Imphal New Line Project",
    "state": "Manipur",
    "district": "Manipur Regional Corridor",
    "region": "North-Eastern",
    "ministry": "Ministry of Railways",
    "department": "Railway Board & Zonal Railways",
    "sector": "Railways & DFC",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 14323,
    "approvedCost": 14323,
    "currentCost": 14323,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 72,
    "riskLevel": "Low",
    "riskScore": 21.5,
    "riskBreakdown": {
      "costOverrunRisk": 6,
      "timeDelayRisk": 9,
      "progressRisk": 17,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Anticipated Cost (Missing Reporting)",
        "impact": 3.6,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.361 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Project Age Months",
        "impact": 2.8,
        "category": "Project Feature",
        "description": "Model attribution +0.277 associated with prediction runway.",
        "featureValue": 156.0
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 1.8,
        "category": "Execution Pace",
        "description": "Model attribution +0.184 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Prev Physical Progress",
        "impact": 1.1,
        "category": "Execution Pace",
        "description": "Model attribution +0.112 associated with prediction runway.",
        "featureValue": 71.0
      },
      {
        "factor": "Prev Forecast Cost",
        "impact": 0.8,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.084 associated with prediction runway.",
        "featureValue": 21885.9
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 47,
        "actual": 42,
        "plannedCost": 5729,
        "actualCost": 6016
      },
      {
        "month": "Snapshot -9M",
        "planned": 54,
        "actual": 50,
        "plannedCost": 7878,
        "actualCost": 8307
      },
      {
        "month": "Snapshot -6M",
        "planned": 60,
        "actual": 57,
        "plannedCost": 10026,
        "actualCost": 10599
      },
      {
        "month": "Snapshot -3M",
        "planned": 67,
        "actual": 65,
        "plannedCost": 12175,
        "actualCost": 12891
      },
      {
        "month": "Current Snapshot",
        "planned": 77,
        "actual": 72,
        "plannedCost": 14323,
        "actualCost": 14323
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100288",
          "label": "Jiribam-Imphal New Line Proj...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-21",
          "label": "Northeast Frontier Railwa",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-21",
          "label": "Land Acquisition Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100288",
          "target": "AGENCY-21",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-220100288",
          "target": "ISSUE-21",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "land_acquisition_issue",
    "supportingEvidence": "Documented in official report 2019-20_Q1_Apr-Jun.pdf (p. 302): \"NIPUR Present Status: Progress for Jiribam-Imphal (Entire section) section: - 9 Nos. of Tunnels in Jiribam-Tupul section completed. - 85.3% land acquisition, 85.61% earthwork, 16.25 % formation, 35% minor bridges, 52.67 % Tunnel work, 10.85% Track li...\"",
    "recommendedAction": "Special Land Acquisition Officer (SLAO) escalation & district administration coordination for private/revenue land notification.",
    "multiHorizonRisk": {
      "3m": 21.5,
      "6m": 34.0,
      "12m": 42.9,
      "15m": 38.4,
      "18m": 62.3
    },
    "multiHorizonDelay": {
      "3m": 0.1,
      "6m": 0.6,
      "12m": 1.3,
      "15m": 5.3,
      "18m": 4.0
    },
    "multiHorizonCostInc": {
      "3m": 0.12,
      "6m": 0.35,
      "12m": 2.6,
      "15m": 0.67,
      "18m": 1.03
    }
  },
  {
    "id": "OCMS-220100311",
    "rawId": "220100311",
    "name": "Daniawan-Biharsarif (Nl), Ecr",
    "shortName": "Daniawan-Biharsarif",
    "state": "Bihar",
    "district": "Bihar Regional Corridor",
    "region": "Eastern",
    "ministry": "Ministry of Railways",
    "department": "Railway Board & Zonal Railways",
    "sector": "Railways & DFC",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 407,
    "approvedCost": 407,
    "currentCost": 339,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 5,
    "riskLevel": "High",
    "riskScore": 91.8,
    "riskBreakdown": {
      "costOverrunRisk": 94,
      "timeDelayRisk": 22,
      "progressRisk": 73,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Remaining Months (Missing Reporting)",
        "impact": 24.5,
        "category": "Project Feature",
        "description": "Model attribution +2.447 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Days To Forecast Completion",
        "impact": 9.8,
        "category": "Timeline",
        "description": "Model attribution +0.981 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Cost Overrun Revised Pct",
        "impact": 1.3,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.135 associated with prediction runway.",
        "featureValue": -16.69
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 1.3,
        "category": "Execution Pace",
        "description": "Model attribution +0.130 associated with prediction runway.",
        "featureValue": 7.64
      },
      {
        "factor": "Snapshot Gap Days",
        "impact": 0.8,
        "category": "Timeline",
        "description": "Model attribution +0.084 associated with prediction runway.",
        "featureValue": 92.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 163,
        "actualCost": 142
      },
      {
        "month": "Snapshot -9M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 224,
        "actualCost": 197
      },
      {
        "month": "Snapshot -6M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 285,
        "actualCost": 251
      },
      {
        "month": "Snapshot -3M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 346,
        "actualCost": 305
      },
      {
        "month": "Current Snapshot",
        "planned": 10,
        "actual": 5,
        "plannedCost": 407,
        "actualCost": 339
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100311",
          "label": "Daniawan-Biharsarif (Nl), Ec...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-22",
          "label": "EAST CENTRAL RAILWAYS",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-22",
          "label": "Land Acquisition Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100311",
          "target": "AGENCY-22",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-220100311",
          "target": "ISSUE-22",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "land_acquisition_issue",
    "supportingEvidence": "Documented in official report 2019-20_Q2_Jul-Sep.pdf (p. 275): \".The original date of commissioning and anticipated date of commissioning is not provided. Present Status: Final Location Survey completed. Land acquisition 368.24 Hectare has been completed and possession has been given in 2 villages of Patna distri...\"",
    "recommendedAction": "Special Land Acquisition Officer (SLAO) escalation & district administration coordination for private/revenue land notification.",
    "multiHorizonRisk": {
      "3m": 91.8,
      "6m": 8.8,
      "12m": 10.8,
      "15m": 11.3,
      "18m": 44.7
    },
    "multiHorizonDelay": {
      "3m": 0.4,
      "6m": 2.2,
      "12m": 2.9,
      "15m": 9.6,
      "18m": 11.4
    },
    "multiHorizonCostInc": {
      "3m": 8.62,
      "6m": 0.23,
      "12m": 1.25,
      "15m": 7.09,
      "18m": 4.06
    }
  },
  {
    "id": "OCMS-220100314",
    "rawId": "220100314",
    "name": "Ramganjmandi-Bhopal New Line Project [276.50 Km]",
    "shortName": "Ramganjmandi-Bhopal New Line Projec",
    "state": "Multi-States (Madhya Pradesh",
    "district": "Multi-States (Madhya Pradesh Regional Corridor",
    "region": "National",
    "ministry": "Ministry of Railways",
    "department": "Railway Board & Zonal Railways",
    "sector": "Railways & DFC",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 3032,
    "approvedCost": 3032,
    "currentCost": 3032,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 81,
    "riskLevel": "Medium",
    "riskScore": 31.1,
    "riskBreakdown": {
      "costOverrunRisk": 13,
      "timeDelayRisk": 13,
      "progressRisk": 25,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Anticipated Cost (Missing Reporting)",
        "impact": 3.8,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.375 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Project Age Months",
        "impact": 2.4,
        "category": "Project Feature",
        "description": "Model attribution +0.236 associated with prediction runway.",
        "featureValue": 300.0
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 1.8,
        "category": "Execution Pace",
        "description": "Model attribution +0.184 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Expenditure Acceleration Per 30D",
        "impact": 1.8,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.178 associated with prediction runway.",
        "featureValue": -131.54
      },
      {
        "factor": "Prev Physical Progress",
        "impact": 1.0,
        "category": "Execution Pace",
        "description": "Model attribution +0.104 associated with prediction runway.",
        "featureValue": 80.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 56,
        "actual": 51,
        "plannedCost": 1213,
        "actualCost": 1273
      },
      {
        "month": "Snapshot -9M",
        "planned": 63,
        "actual": 59,
        "plannedCost": 1668,
        "actualCost": 1759
      },
      {
        "month": "Snapshot -6M",
        "planned": 69,
        "actual": 66,
        "plannedCost": 2122,
        "actualCost": 2244
      },
      {
        "month": "Snapshot -3M",
        "planned": 76,
        "actual": 74,
        "plannedCost": 2577,
        "actualCost": 2729
      },
      {
        "month": "Current Snapshot",
        "planned": 86,
        "actual": 81,
        "plannedCost": 3032,
        "actualCost": 3032
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100314",
          "label": "Ramganjmandi-Bhopal New Line...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-23",
          "label": "West Central Railway [WCR",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-23",
          "label": "Land Acquisition Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100314",
          "target": "AGENCY-23",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-220100314",
          "target": "ISSUE-23",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "land_acquisition_issue",
    "supportingEvidence": "Documented in official report 2019-20_Q1_Apr-Jun.pdf (p. 393): \"is now Rs 1225.9 crore. Present status: - Ramganjmandi -Jhalawar: Passenger train started. -Formation work beyond Jhalawar is in progress. Land acquisition is completed beyond Jhalawar city upto km 109. - Reply awaited from Govt. of Rajashtan & MP fo...\"",
    "recommendedAction": "Special Land Acquisition Officer (SLAO) escalation & district administration coordination for private/revenue land notification.",
    "multiHorizonRisk": {
      "3m": 31.1,
      "6m": 55.4,
      "12m": 66.1,
      "15m": 77.0,
      "18m": 84.4
    },
    "multiHorizonDelay": {
      "3m": 0.1,
      "6m": 1.0,
      "12m": 3.2,
      "15m": 7.4,
      "18m": 6.3
    },
    "multiHorizonCostInc": {
      "3m": 0.11,
      "6m": 0.4,
      "12m": 3.32,
      "15m": 1.63,
      "18m": 2.69
    }
  },
  {
    "id": "OCMS-220100317",
    "rawId": "220100317",
    "name": "Kichha-Khatima (Nl) - Ner",
    "shortName": "Kichha-Khatima",
    "state": "Uttarakhand",
    "district": "Uttarakhand Regional Corridor",
    "region": "Northern",
    "ministry": "Ministry of Railways",
    "department": "Railway Board & Zonal Railways",
    "sector": "Railways & DFC",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 142,
    "approvedCost": 142,
    "currentCost": 228,
    "costOverrunCr": 86,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 5,
    "riskLevel": "High",
    "riskScore": 90.4,
    "riskBreakdown": {
      "costOverrunRisk": 95,
      "timeDelayRisk": 16,
      "progressRisk": 72,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Remaining Months (Missing Reporting)",
        "impact": 26.4,
        "category": "Project Feature",
        "description": "Model attribution +2.635 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Days To Forecast Completion",
        "impact": 10.4,
        "category": "Timeline",
        "description": "Model attribution +1.041 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 1.9,
        "category": "Execution Pace",
        "description": "Model attribution +0.185 associated with prediction runway.",
        "featureValue": 7.64
      },
      {
        "factor": "Project Age Months",
        "impact": 0.8,
        "category": "Project Feature",
        "description": "Model attribution +0.082 associated with prediction runway.",
        "featureValue": 230.0
      },
      {
        "factor": "Schedule Slip Current Months",
        "impact": 0.6,
        "category": "Timeline",
        "description": "Model attribution +0.060 associated with prediction runway.",
        "featureValue": 5.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 57,
        "actualCost": 96
      },
      {
        "month": "Snapshot -9M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 78,
        "actualCost": 132
      },
      {
        "month": "Snapshot -6M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 100,
        "actualCost": 169
      },
      {
        "month": "Snapshot -3M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 121,
        "actualCost": 206
      },
      {
        "month": "Current Snapshot",
        "planned": 10,
        "actual": 5,
        "plannedCost": 142,
        "actualCost": 228
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100317",
          "label": "Kichha-Khatima (Nl) - Ner...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-24",
          "label": "NORTH EASTERN RAILWAY",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-24",
          "label": "Land Acquisition Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100317",
          "target": "AGENCY-24",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-220100317",
          "target": "ISSUE-24",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "land_acquisition_issue",
    "supportingEvidence": "Documented in official report 2019-20_Q1_Apr-Jun.pdf (p. 313): \"of Uttranchal has been completed and approved by GM. Part detailed estimated for Rs.142.45 crore sanctioned by Railway Board on 17.11.2006. Land acquisition work is in progress and has to be given free of cost by Uttranchal Government....\"",
    "recommendedAction": "Special Land Acquisition Officer (SLAO) escalation & district administration coordination for private/revenue land notification.",
    "multiHorizonRisk": {
      "3m": 90.4,
      "6m": 6.1,
      "12m": 16.4,
      "15m": 8.8,
      "18m": 13.6
    },
    "multiHorizonDelay": {
      "3m": 0.3,
      "6m": 1.1,
      "12m": 4.0,
      "15m": 11.7,
      "18m": 11.4
    },
    "multiHorizonCostInc": {
      "3m": 8.42,
      "6m": 0.08,
      "12m": 0.97,
      "15m": 0.25,
      "18m": 0.11
    }
  },
  {
    "id": "OCMS-220100324",
    "rawId": "220100324",
    "name": "Chhindwara - Nagpur (Gc)(Secr)",
    "shortName": "Chhindwara - Nagpur",
    "state": "Madhya Pradesh",
    "district": "Madhya Pradesh Regional Corridor",
    "region": "Central",
    "ministry": "Ministry of Railways",
    "department": "Railway Board & Zonal Railways",
    "sector": "Railways & DFC",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 384,
    "approvedCost": 384,
    "currentCost": 1512,
    "costOverrunCr": 1128,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 100,
    "riskLevel": "Low",
    "riskScore": 7.6,
    "riskBreakdown": {
      "costOverrunRisk": 3,
      "timeDelayRisk": 6,
      "progressRisk": 6,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Project Age Months",
        "impact": 1.1,
        "category": "Project Feature",
        "description": "Model attribution +0.114 associated with prediction runway.",
        "featureValue": 197.0
      },
      {
        "factor": "Snapshot Gap Days",
        "impact": 0.7,
        "category": "Timeline",
        "description": "Model attribution +0.067 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Expenditure Ratio Forecast",
        "impact": 0.5,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.053 associated with prediction runway.",
        "featureValue": 0.96
      },
      {
        "factor": "Expenditure Acceleration Per 30D (Missing Reporting)",
        "impact": 0.4,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.041 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Expenditure Velocity Per 30D",
        "impact": 0.4,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.038 associated with prediction runway.",
        "featureValue": 10.37
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 75,
        "actual": 70,
        "plannedCost": 154,
        "actualCost": 635
      },
      {
        "month": "Snapshot -9M",
        "planned": 82,
        "actual": 78,
        "plannedCost": 211,
        "actualCost": 877
      },
      {
        "month": "Snapshot -6M",
        "planned": 88,
        "actual": 85,
        "plannedCost": 269,
        "actualCost": 1119
      },
      {
        "month": "Snapshot -3M",
        "planned": 95,
        "actual": 93,
        "plannedCost": 326,
        "actualCost": 1360
      },
      {
        "month": "Current Snapshot",
        "planned": 100,
        "actual": 100,
        "plannedCost": 384,
        "actualCost": 1512
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100324",
          "label": "Chhindwara - Nagpur (Gc)(Sec...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-25",
          "label": "SOUTH EAST CENTRAL RAILWA",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-25",
          "label": "Forest Clearance Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100324",
          "target": "AGENCY-25",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-220100324",
          "target": "ISSUE-25",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "forest_clearance_issue",
    "supportingEvidence": "Documented in official report 2019-20_Q4_Jan-Mar.pdf (p. 362): \"(GC)(SECR), MADHYA PRADESH i) Out of total length of 149.52 Km 95 Km in Madhya Pradesh and 55 Km in Maharashtra State. ii) Delay in getting forest clearance. iii) Inadequate allotment of funds prion 2014-15....\"",
    "recommendedAction": "MoEFCC / Regional Empowered Committee Stage-I & Stage-II clearance escalation; Parivesh portal tracking.",
    "multiHorizonRisk": {
      "3m": 7.6,
      "6m": 15.5,
      "12m": 36.4,
      "15m": 39.3,
      "18m": 54.0
    },
    "multiHorizonDelay": {
      "3m": 0.0,
      "6m": 0.2,
      "12m": 0.7,
      "15m": 4.5,
      "18m": 5.4
    },
    "multiHorizonCostInc": {
      "3m": 0.0,
      "6m": 0.0,
      "12m": 1.26,
      "15m": 0.28,
      "18m": 0.54
    }
  },
  {
    "id": "OCMS-220100325",
    "rawId": "220100325",
    "name": "Sukinda Road - Angul (Nl)(Ecor)",
    "shortName": "Sukinda Road - Angul",
    "state": "Odisha",
    "district": "Odisha Regional Corridor",
    "region": "Eastern",
    "ministry": "Ministry of Railways",
    "department": "Railway Board & Zonal Railways",
    "sector": "Railways & DFC",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 1250,
    "approvedCost": 1250,
    "currentCost": 2441,
    "costOverrunCr": 1191,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 5,
    "riskLevel": "Low",
    "riskScore": 22.6,
    "riskBreakdown": {
      "costOverrunRisk": 11,
      "timeDelayRisk": 18,
      "progressRisk": 18,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Expenditure Acceleration Per 30D",
        "impact": 1.2,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.122 associated with prediction runway.",
        "featureValue": -5.8
      },
      {
        "factor": "Days To Forecast Completion",
        "impact": 1.0,
        "category": "Timeline",
        "description": "Model attribution +0.098 associated with prediction runway.",
        "featureValue": -121.0
      },
      {
        "factor": "Expenditure Ratio Forecast",
        "impact": 0.9,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.090 associated with prediction runway.",
        "featureValue": 1.02
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 0.6,
        "category": "Execution Pace",
        "description": "Model attribution +0.056 associated with prediction runway.",
        "featureValue": 7.64
      },
      {
        "factor": "Expenditure Velocity Per 30D",
        "impact": 0.6,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.055 associated with prediction runway.",
        "featureValue": 19.28
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 500,
        "actualCost": 1025
      },
      {
        "month": "Snapshot -9M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 688,
        "actualCost": 1416
      },
      {
        "month": "Snapshot -6M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 875,
        "actualCost": 1806
      },
      {
        "month": "Snapshot -3M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 1062,
        "actualCost": 2196
      },
      {
        "month": "Current Snapshot",
        "planned": 10,
        "actual": 5,
        "plannedCost": 1250,
        "actualCost": 2441
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100325",
          "label": "Sukinda Road - Angul (Nl)(Ec...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-26",
          "label": "RAIL VIKAS NIGAM LTD.",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-26",
          "label": "Land Acquisition Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100325",
          "target": "AGENCY-26",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-220100325",
          "target": "ISSUE-26",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "land_acquisition_issue",
    "supportingEvidence": "Documented in official report 2019-20_Q1_Apr-Jun.pdf (p. 339): \"rder) and two major bidges on Rengali Left Canal (3 x 45.7 m steel girder) has been awarded on 30.05.2011. Further tendering is held up for Land acquisition....\"",
    "recommendedAction": "Special Land Acquisition Officer (SLAO) escalation & district administration coordination for private/revenue land notification.",
    "multiHorizonRisk": {
      "3m": 22.6,
      "6m": 53.9,
      "12m": 73.8,
      "15m": 70.4,
      "18m": 69.9
    },
    "multiHorizonDelay": {
      "3m": 0.3,
      "6m": 1.9,
      "12m": 5.1,
      "15m": 11.4,
      "18m": 9.7
    },
    "multiHorizonCostInc": {
      "3m": 0.8,
      "6m": 0.26,
      "12m": 0.81,
      "15m": 1.24,
      "18m": 2.28
    }
  },
  {
    "id": "OCMS-220100328",
    "rawId": "220100328",
    "name": "Talcher-Bimlagarh New Railway Line",
    "shortName": "Talcher-Bimlagarh New Railway Line",
    "state": "Odisha",
    "district": "Odisha Regional Corridor",
    "region": "Eastern",
    "ministry": "Ministry of Railways",
    "department": "Railway Board & Zonal Railways",
    "sector": "Railways & DFC",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 1928,
    "approvedCost": 1928,
    "currentCost": 1928,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 54,
    "riskLevel": "Low",
    "riskScore": 22.3,
    "riskBreakdown": {
      "costOverrunRisk": 29,
      "timeDelayRisk": 10,
      "progressRisk": 18,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Anticipated Cost (Missing Reporting)",
        "impact": 3.4,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.338 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Project Age Months",
        "impact": 2.5,
        "category": "Project Feature",
        "description": "Model attribution +0.245 associated with prediction runway.",
        "featureValue": 264.0
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 1.8,
        "category": "Execution Pace",
        "description": "Model attribution +0.180 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Expenditure Ratio Forecast",
        "impact": 1.4,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.140 associated with prediction runway.",
        "featureValue": 1.08
      },
      {
        "factor": "Schedule Slip Current Months",
        "impact": 0.9,
        "category": "Timeline",
        "description": "Model attribution +0.087 associated with prediction runway.",
        "featureValue": 48.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 29,
        "actual": 24,
        "plannedCost": 771,
        "actualCost": 810
      },
      {
        "month": "Snapshot -9M",
        "planned": 36,
        "actual": 32,
        "plannedCost": 1060,
        "actualCost": 1118
      },
      {
        "month": "Snapshot -6M",
        "planned": 42,
        "actual": 39,
        "plannedCost": 1350,
        "actualCost": 1427
      },
      {
        "month": "Snapshot -3M",
        "planned": 49,
        "actual": 47,
        "plannedCost": 1639,
        "actualCost": 1735
      },
      {
        "month": "Current Snapshot",
        "planned": 59,
        "actual": 54,
        "plannedCost": 1928,
        "actualCost": 1928
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100328",
          "label": "Talcher-Bimlagarh New Railwa...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-27",
          "label": "East Coast Railway [ECoR]",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-27",
          "label": "Land Acquisition Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100328",
          "target": "AGENCY-27",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-220100328",
          "target": "ISSUE-27",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "land_acquisition_issue",
    "supportingEvidence": "Documented in official report 2019-20_Q1_Apr-Jun.pdf (p. 272): \"project is now Rs 811.36 crore. The original date of commissioning and anticipated date of commissioning is not provided. Present status: - Land acquisition & minor bridge works are in progress. Diversion of forest land is in process. Stage-I clearan...\"",
    "recommendedAction": "Special Land Acquisition Officer (SLAO) escalation & district administration coordination for private/revenue land notification.",
    "multiHorizonRisk": {
      "3m": 22.3,
      "6m": 47.9,
      "12m": 62.5,
      "15m": 46.4,
      "18m": 61.7
    },
    "multiHorizonDelay": {
      "3m": 0.0,
      "6m": 1.0,
      "12m": 1.7,
      "15m": 4.2,
      "18m": 2.8
    },
    "multiHorizonCostInc": {
      "3m": 0.21,
      "6m": 2.08,
      "12m": 3.07,
      "15m": 15.65,
      "18m": 43.83
    }
  },
  {
    "id": "OCMS-N02000027",
    "rawId": "N02000027",
    "name": "Rajasthan Atomic Power Project -7 And 8 (2X700 Mw)",
    "shortName": "Rajasthan Atomic Power Project -7 A",
    "state": "Rajasthan",
    "district": "Rajasthan Regional Corridor",
    "region": "Northern",
    "ministry": "Ministry of Coal",
    "department": "Coal India Limited (CIL)",
    "sector": "Coal & Mining",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 12320,
    "approvedCost": 12320,
    "currentCost": 22924,
    "costOverrunCr": 10604,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 5,
    "riskLevel": "Low",
    "riskScore": 24.7,
    "riskBreakdown": {
      "costOverrunRisk": 11,
      "timeDelayRisk": 13,
      "progressRisk": 20,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Project Age Months",
        "impact": 2.6,
        "category": "Project Feature",
        "description": "Model attribution +0.256 associated with prediction runway.",
        "featureValue": 182.0
      },
      {
        "factor": "Catchup Pressure",
        "impact": 1.4,
        "category": "Execution Pace",
        "description": "Model attribution +0.141 associated with prediction runway.",
        "featureValue": 34.79
      },
      {
        "factor": "Prev Physical Progress",
        "impact": 1.1,
        "category": "Execution Pace",
        "description": "Model attribution +0.106 associated with prediction runway.",
        "featureValue": 93.54
      },
      {
        "factor": "Expenditure Acceleration Per 30D",
        "impact": 1.1,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.106 associated with prediction runway.",
        "featureValue": -58.8
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 1.0,
        "category": "Execution Pace",
        "description": "Model attribution +0.097 associated with prediction runway.",
        "featureValue": 0.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 4928,
        "actualCost": 9628
      },
      {
        "month": "Snapshot -9M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 6776,
        "actualCost": 13296
      },
      {
        "month": "Snapshot -6M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 8624,
        "actualCost": 16964
      },
      {
        "month": "Snapshot -3M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 10472,
        "actualCost": 20632
      },
      {
        "month": "Current Snapshot",
        "planned": 10,
        "actual": 5,
        "plannedCost": 12320,
        "actualCost": 22924
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N02000027",
          "label": "Rajasthan Atomic Power Proje...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-28",
          "label": "NPCIL",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-28",
          "label": "Covid Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-N02000027",
          "target": "AGENCY-28",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-N02000027",
          "target": "ISSUE-28",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "covid_issue",
    "supportingEvidence": "Documented in official report 2021-22_Q2_Jul-Sep.pdf (p. 29): \"7.The Financial figures are provisional and rounded off. 8. Covid-19 second wave impact. 9.Delay reasons and action taken are mentioned in hard copy due to space constraint in this window. KUDANKULAM NUCLEAR POWER PROJECT UNIT-3 AND 4 4...\"",
    "recommendedAction": "Contractual time-extension audit without financial liability.",
    "multiHorizonRisk": {
      "3m": 24.7,
      "6m": 32.5,
      "12m": 44.7,
      "15m": 69.1,
      "18m": 63.5
    },
    "multiHorizonDelay": {
      "3m": 0.1,
      "6m": 1.1,
      "12m": 1.6,
      "15m": 6.5,
      "18m": 5.0
    },
    "multiHorizonCostInc": {
      "3m": 0.09,
      "6m": 0.58,
      "12m": 0.87,
      "15m": 1.47,
      "18m": 0.74
    }
  },
  {
    "id": "OCMS-N02000028",
    "rawId": "N02000028",
    "name": "Kudankulam Nuclear Power Project Unit-3 And 4",
    "shortName": "Kudankulam Nuclear Power Project Un",
    "state": "Tamil Nadu",
    "district": "Tamil Nadu Regional Corridor",
    "region": "Southern",
    "ministry": "Ministry of Coal",
    "department": "Coal India Limited (CIL)",
    "sector": "Coal & Mining",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 39849,
    "approvedCost": 39849,
    "currentCost": 68893,
    "costOverrunCr": 29044,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 5,
    "riskLevel": "Low",
    "riskScore": 24.6,
    "riskBreakdown": {
      "costOverrunRisk": 10,
      "timeDelayRisk": 13,
      "progressRisk": 20,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Project Age Months",
        "impact": 2.1,
        "category": "Project Feature",
        "description": "Model attribution +0.213 associated with prediction runway.",
        "featureValue": 141.0
      },
      {
        "factor": "Expenditure Acceleration Per 30D",
        "impact": 1.7,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.169 associated with prediction runway.",
        "featureValue": -174.81
      },
      {
        "factor": "Catchup Pressure",
        "impact": 1.4,
        "category": "Execution Pace",
        "description": "Model attribution +0.142 associated with prediction runway.",
        "featureValue": 28.54
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 1.0,
        "category": "Execution Pace",
        "description": "Model attribution +0.097 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Prev Physical Progress",
        "impact": 0.9,
        "category": "Execution Pace",
        "description": "Model attribution +0.094 associated with prediction runway.",
        "featureValue": 73.8
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 15940,
        "actualCost": 28935
      },
      {
        "month": "Snapshot -9M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 21917,
        "actualCost": 39958
      },
      {
        "month": "Snapshot -6M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 27894,
        "actualCost": 50981
      },
      {
        "month": "Snapshot -3M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 33872,
        "actualCost": 62004
      },
      {
        "month": "Current Snapshot",
        "planned": 10,
        "actual": 5,
        "plannedCost": 39849,
        "actualCost": 68893
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N02000028",
          "label": "Kudankulam Nuclear Power Pro...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-29",
          "label": "NPCIL",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-29",
          "label": "Utility Shifting Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-N02000028",
          "target": "AGENCY-29",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-N02000028",
          "target": "ISSUE-29",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "utility_shifting_issue",
    "supportingEvidence": "Documented in official report 2020-21_Q2_Jul-Sep.pdf (p. 35): \"s with cost overrun) 4. Projects with both time and cost overrun : 0 5. Main reasons for delay: o Delays in handing over of site as well as shifting of utilities.. o Design changes due to change in base parameters. Comparison of Original Cost, Antici...\"",
    "recommendedAction": "Joint inter-agency inspection with State DISCOM / municipal authority for water pipeline & power line shifting.",
    "multiHorizonRisk": {
      "3m": 24.6,
      "6m": 22.3,
      "12m": 37.3,
      "15m": 62.2,
      "18m": 43.6
    },
    "multiHorizonDelay": {
      "3m": 0.2,
      "6m": 0.6,
      "12m": 0.4,
      "15m": 6.3,
      "18m": 3.2
    },
    "multiHorizonCostInc": {
      "3m": 0.13,
      "6m": 0.26,
      "12m": 3.63,
      "15m": 1.7,
      "18m": 1.66
    }
  },
  {
    "id": "OCMS-N02000029",
    "rawId": "N02000029",
    "name": "Kudankulam Nuclear Power Project 5 And 6",
    "shortName": "Kudankulam Nuclear Power Project 5 ",
    "state": "Tamil Nadu",
    "district": "Tamil Nadu Regional Corridor",
    "region": "Southern",
    "ministry": "Ministry of Coal",
    "department": "Coal India Limited (CIL)",
    "sector": "Coal & Mining",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 49621,
    "approvedCost": 49621,
    "currentCost": 49621,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 5,
    "riskLevel": "Low",
    "riskScore": 15.7,
    "riskBreakdown": {
      "costOverrunRisk": 6,
      "timeDelayRisk": 8,
      "progressRisk": 13,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Project Age Months",
        "impact": 1.5,
        "category": "Project Feature",
        "description": "Model attribution +0.153 associated with prediction runway.",
        "featureValue": 90.0
      },
      {
        "factor": "Expenditure Acceleration Per 30D",
        "impact": 1.3,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.126 associated with prediction runway.",
        "featureValue": -154.61
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 1.1,
        "category": "Execution Pace",
        "description": "Model attribution +0.110 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Catchup Pressure",
        "impact": 1.0,
        "category": "Execution Pace",
        "description": "Model attribution +0.101 associated with prediction runway.",
        "featureValue": 13.01
      },
      {
        "factor": "Prev Forecast Cost",
        "impact": 0.7,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.072 associated with prediction runway.",
        "featureValue": 49621.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 19848,
        "actualCost": 20841
      },
      {
        "month": "Snapshot -9M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 27292,
        "actualCost": 28780
      },
      {
        "month": "Snapshot -6M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 34735,
        "actualCost": 36720
      },
      {
        "month": "Snapshot -3M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 42178,
        "actualCost": 44659
      },
      {
        "month": "Current Snapshot",
        "planned": 10,
        "actual": 5,
        "plannedCost": 49621,
        "actualCost": 49621
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N02000029",
          "label": "Kudankulam Nuclear Power Pro...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-30",
          "label": "NPCIL",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-30",
          "label": "Utility Shifting Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-N02000029",
          "target": "AGENCY-30",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-N02000029",
          "target": "ISSUE-30",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "utility_shifting_issue",
    "supportingEvidence": "Documented in official report 2021-22_Q3_Oct-Dec.pdf (p. 31): \"cts that are facing cost overruns. Original cost of these 4 projects 5. Main reasons for delay: o Delays in handing over of site as well as shifting of utilities.. o Design changes due to change in base parameters. Comparison of Original Cost, Antici...\"",
    "recommendedAction": "Joint inter-agency inspection with State DISCOM / municipal authority for water pipeline & power line shifting.",
    "multiHorizonRisk": {
      "3m": 15.7,
      "6m": 16.1,
      "12m": 27.6,
      "15m": 40.7,
      "18m": 37.2
    },
    "multiHorizonDelay": {
      "3m": 0.1,
      "6m": 0.4,
      "12m": 0.3,
      "15m": 3.2,
      "18m": 2.6
    },
    "multiHorizonCostInc": {
      "3m": 0.0,
      "6m": 0.04,
      "12m": 0.74,
      "15m": 0.4,
      "18m": 0.66
    }
  },
  {
    "id": "OCMS-N04000077",
    "rawId": "N04000077",
    "name": "Ccs International Airport , Lucknow",
    "shortName": "Ccs International Airport , Lucknow",
    "state": "Uttar Pradesh",
    "district": "Uttar Pradesh Regional Corridor",
    "region": "Northern",
    "ministry": "Ministry of Civil Aviation",
    "department": "Airports Authority of India (AAI)",
    "sector": "Civil Aviation",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 1383,
    "approvedCost": 1383,
    "currentCost": 3292,
    "costOverrunCr": 1909,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 81,
    "riskLevel": "Low",
    "riskScore": 15.6,
    "riskBreakdown": {
      "costOverrunRisk": 5,
      "timeDelayRisk": 9,
      "progressRisk": 12,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Project Age Months",
        "impact": 1.5,
        "category": "Project Feature",
        "description": "Model attribution +0.145 associated with prediction runway.",
        "featureValue": 84.0
      },
      {
        "factor": "Prev Physical Progress",
        "impact": 1.0,
        "category": "Execution Pace",
        "description": "Model attribution +0.100 associated with prediction runway.",
        "featureValue": 80.37
      },
      {
        "factor": "Schedule Slip Current Months",
        "impact": 0.8,
        "category": "Timeline",
        "description": "Model attribution +0.082 associated with prediction runway.",
        "featureValue": 61.0
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 0.8,
        "category": "Execution Pace",
        "description": "Model attribution +0.081 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Expenditure Acceleration Per 30D",
        "impact": 0.6,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.059 associated with prediction runway.",
        "featureValue": -6.15
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 56,
        "actual": 51,
        "plannedCost": 553,
        "actualCost": 1383
      },
      {
        "month": "Snapshot -9M",
        "planned": 63,
        "actual": 59,
        "plannedCost": 761,
        "actualCost": 1909
      },
      {
        "month": "Snapshot -6M",
        "planned": 69,
        "actual": 66,
        "plannedCost": 968,
        "actualCost": 2436
      },
      {
        "month": "Snapshot -3M",
        "planned": 76,
        "actual": 74,
        "plannedCost": 1176,
        "actualCost": 2963
      },
      {
        "month": "Current Snapshot",
        "planned": 86,
        "actual": 81,
        "plannedCost": 1383,
        "actualCost": 3292
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N04000077",
          "label": "Ccs International Airport , ...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-31",
          "label": "AAI",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-31",
          "label": "Environment Clearance Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-N04000077",
          "target": "AGENCY-31",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-N04000077",
          "target": "ISSUE-31",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "environment_clearance_issue",
    "supportingEvidence": "Documented in official report 2021-22_Q2_Jul-Sep.pdf (p. 38): \"he Cabinet Committee on Economic Affairs(CCEA) conveyed the approval of the Project vide their OM No. CCEA/14/2018(i) dated 04/05/2018. The Environmental clearance was granted by Ministry of Environment, Forest and Climate Change vide letter no. 10-4...\"",
    "recommendedAction": "State Pollution Control Board (SPCB) public hearing & Environmental Impact Assessment (EIA) compliance review.",
    "multiHorizonRisk": {
      "3m": 15.6,
      "6m": 32.8,
      "12m": 60.3,
      "15m": 85.3,
      "18m": 90.8
    },
    "multiHorizonDelay": {
      "3m": 0.2,
      "6m": 0.7,
      "12m": 2.4,
      "15m": 4.3,
      "18m": 7.7
    },
    "multiHorizonCostInc": {
      "3m": 0.0,
      "6m": 0.15,
      "12m": 0.18,
      "15m": 1.33,
      "18m": 1.79
    }
  },
  {
    "id": "OCMS-N04000078",
    "rawId": "N04000078",
    "name": "Construction Of Terminal Building & Associated Works At Leh Airport, Ladakh",
    "shortName": "Construction Of Terminal Building &",
    "state": "Ladakh",
    "district": "Ladakh Regional Corridor",
    "region": "National",
    "ministry": "Ministry of Ports, Shipping and Waterways",
    "department": "Major Port Authorities",
    "sector": "Ports & Shipping",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 480,
    "approvedCost": 480,
    "currentCost": 480,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 79,
    "riskLevel": "Medium",
    "riskScore": 53.4,
    "riskBreakdown": {
      "costOverrunRisk": 7,
      "timeDelayRisk": 30,
      "progressRisk": 43,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Days To Forecast Completion",
        "impact": 6.0,
        "category": "Timeline",
        "description": "Model attribution +0.598 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Anticipated Cost (Missing Reporting)",
        "impact": 3.8,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.378 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 2.0,
        "category": "Execution Pace",
        "description": "Model attribution +0.199 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Project Age Months",
        "impact": 1.6,
        "category": "Project Feature",
        "description": "Model attribution +0.163 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Prev Physical Progress",
        "impact": 1.0,
        "category": "Execution Pace",
        "description": "Model attribution +0.103 associated with prediction runway.",
        "featureValue": 78.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 54,
        "actual": 49,
        "plannedCost": 192,
        "actualCost": 202
      },
      {
        "month": "Snapshot -9M",
        "planned": 61,
        "actual": 57,
        "plannedCost": 264,
        "actualCost": 278
      },
      {
        "month": "Snapshot -6M",
        "planned": 67,
        "actual": 64,
        "plannedCost": 336,
        "actualCost": 355
      },
      {
        "month": "Snapshot -3M",
        "planned": 74,
        "actual": 72,
        "plannedCost": 408,
        "actualCost": 432
      },
      {
        "month": "Current Snapshot",
        "planned": 84,
        "actual": 79,
        "plannedCost": 480,
        "actualCost": 480
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N04000078",
          "label": "Construction Of Terminal Bui...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-32",
          "label": "Airport Authority of Indi",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-32",
          "label": "Contractor Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-N04000078",
          "target": "AGENCY-32",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-N04000078",
          "target": "ISSUE-32",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "contractor_issue",
    "supportingEvidence": "Documented in official report 2021-22_Q1_Apr-Jun.pdf (p. 40): \"1. Owner : Airports Authority of India (AAI) 2. PMC: Engineers India Limited (EIL) 3. Contractor: M/s Shapoorji Pallonji & Co. Pvt. Ltd. (SPCPL) 4. NTB Designed for 1.6 Million Annual passenger capacity/800 Peak hour passengers 5. Passenger boarding ...\"",
    "recommendedAction": "Contractor cash flow & machinery audit; invocation of milestone penalties or mobilization support.",
    "multiHorizonRisk": {
      "3m": 53.4,
      "6m": 77.8,
      "12m": 84.9,
      "15m": 89.1,
      "18m": 83.8
    },
    "multiHorizonDelay": {
      "3m": 1.0,
      "6m": 3.9,
      "12m": 6.8,
      "15m": 9.5,
      "18m": 10.5
    },
    "multiHorizonCostInc": {
      "3m": 0.04,
      "6m": 0.15,
      "12m": 1.36,
      "15m": 0.57,
      "18m": 1.09
    }
  },
  {
    "id": "OCMS-N04000081",
    "rawId": "N04000081",
    "name": "Airside Capacity Enhancement Of Nsbi Airport, Kolkata",
    "shortName": "Airside Capacity Enhancement Of Nsb",
    "state": "West Bengal",
    "district": "West Bengal Regional Corridor",
    "region": "Eastern",
    "ministry": "Ministry of Civil Aviation",
    "department": "Airports Authority of India (AAI)",
    "sector": "Civil Aviation",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 390,
    "approvedCost": 390,
    "currentCost": 397,
    "costOverrunCr": 7,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 100,
    "riskLevel": "Low",
    "riskScore": 10.1,
    "riskBreakdown": {
      "costOverrunRisk": 5,
      "timeDelayRisk": 5,
      "progressRisk": 8,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Prev Physical Progress",
        "impact": 1.2,
        "category": "Execution Pace",
        "description": "Model attribution +0.119 associated with prediction runway.",
        "featureValue": 100.0
      },
      {
        "factor": "Expenditure Ratio Forecast",
        "impact": 1.0,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.096 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 0.9,
        "category": "Execution Pace",
        "description": "Model attribution +0.091 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Project Age Months",
        "impact": 0.8,
        "category": "Project Feature",
        "description": "Model attribution +0.076 associated with prediction runway.",
        "featureValue": 77.0
      },
      {
        "factor": "Remaining Forecast Cost",
        "impact": 0.4,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.044 associated with prediction runway.",
        "featureValue": 0.39
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 75,
        "actual": 70,
        "plannedCost": 156,
        "actualCost": 167
      },
      {
        "month": "Snapshot -9M",
        "planned": 82,
        "actual": 78,
        "plannedCost": 214,
        "actualCost": 230
      },
      {
        "month": "Snapshot -6M",
        "planned": 88,
        "actual": 85,
        "plannedCost": 273,
        "actualCost": 294
      },
      {
        "month": "Snapshot -3M",
        "planned": 95,
        "actual": 93,
        "plannedCost": 331,
        "actualCost": 357
      },
      {
        "month": "Current Snapshot",
        "planned": 100,
        "actual": 100,
        "plannedCost": 390,
        "actualCost": 397
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N04000081",
          "label": "Airside Capacity Enhancement...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-33",
          "label": "AAI",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-33",
          "label": "Land Acquisition Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-N04000081",
          "target": "AGENCY-33",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-N04000081",
          "target": "ISSUE-33",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "land_acquisition_issue",
    "supportingEvidence": "Documented in official report 2020-21_Q2_Jul-Sep.pdf (p. 44): \"delay : \u2022 Delay in obtaining Environmental clearance and Forest clearance as well as delay in permitting mining in forest areas, \u2022 Delay in Land acquisition, \u2022 R & R issues, \u2022 Law & Order problem, \u2022 Delay in equipment supply, \u2022 Delay due to adverse g...\"",
    "recommendedAction": "Special Land Acquisition Officer (SLAO) escalation & district administration coordination for private/revenue land notification.",
    "multiHorizonRisk": {
      "3m": 10.1,
      "6m": 14.9,
      "12m": 33.1,
      "15m": 19.9,
      "18m": 29.8
    },
    "multiHorizonDelay": {
      "3m": 0.1,
      "6m": 1.5,
      "12m": 1.2,
      "15m": 1.9,
      "18m": 2.6
    },
    "multiHorizonCostInc": {
      "3m": 0.01,
      "6m": 0.18,
      "12m": 0.27,
      "15m": 0.35,
      "18m": 0.53
    }
  },
  {
    "id": "OCMS-N04000082",
    "rawId": "N04000082",
    "name": "Construction Of New Domestic Terminal Building [Phase-I And Ii] And Other Allied Structures At Jpni Airport, Patna",
    "shortName": "Construction Of New Domestic Termin",
    "state": "Bihar",
    "district": "Bihar Regional Corridor",
    "region": "Eastern",
    "ministry": "Ministry of Ports, Shipping and Waterways",
    "department": "Major Port Authorities",
    "sector": "Ports & Shipping",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 1217,
    "approvedCost": 1217,
    "currentCost": 1217,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 98,
    "riskLevel": "Medium",
    "riskScore": 46.5,
    "riskBreakdown": {
      "costOverrunRisk": 20,
      "timeDelayRisk": 32,
      "progressRisk": 37,
      "adminDependencyRisk": 85
    },
    "shapFactors": [
      {
        "factor": "Days To Forecast Completion",
        "impact": 5.6,
        "category": "Timeline",
        "description": "Model attribution +0.565 associated with prediction runway.",
        "featureValue": 31.0
      },
      {
        "factor": "Anticipated Cost (Missing Reporting)",
        "impact": 3.9,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.392 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 2.1,
        "category": "Execution Pace",
        "description": "Model attribution +0.207 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Project Age Months",
        "impact": 1.7,
        "category": "Project Feature",
        "description": "Model attribution +0.166 associated with prediction runway.",
        "featureValue": 89.0
      },
      {
        "factor": "Prev Physical Progress",
        "impact": 1.3,
        "category": "Execution Pace",
        "description": "Model attribution +0.135 associated with prediction runway.",
        "featureValue": 97.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 73,
        "actual": 68,
        "plannedCost": 487,
        "actualCost": 511
      },
      {
        "month": "Snapshot -9M",
        "planned": 80,
        "actual": 76,
        "plannedCost": 669,
        "actualCost": 706
      },
      {
        "month": "Snapshot -6M",
        "planned": 86,
        "actual": 83,
        "plannedCost": 852,
        "actualCost": 901
      },
      {
        "month": "Snapshot -3M",
        "planned": 93,
        "actual": 91,
        "plannedCost": 1034,
        "actualCost": 1095
      },
      {
        "month": "Current Snapshot",
        "planned": 100,
        "actual": 98,
        "plannedCost": 1217,
        "actualCost": 1217
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N04000082",
          "label": "Construction Of New Domestic...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-34",
          "label": "Airport Authority of Indi",
          "type": "department",
          "status": "completed"
        },
        {
          "id": "ISSUE-34",
          "label": "Slow Progress Issue",
          "type": "clearance",
          "status": "blocked"
        }
      ],
      "links": [
        {
          "source": "PRJ-N04000082",
          "target": "AGENCY-34",
          "label": "Executing Agency"
        },
        {
          "source": "PRJ-N04000082",
          "target": "ISSUE-34",
          "label": "Documented Bottleneck"
        }
      ]
    },
    "documentedIssueType": "slow_progress_issue",
    "supportingEvidence": "Documented in official report 2022-23_Q1_Apr-Jun.pdf (p. 40): \"Package -1 : Work of Cargo bulding on hold NOW RESOLVED, ATC tower and fire station work in progress. Work progress slow due to lockdown for pandemic Covid-19 and continous rain in month of June to Mid Sep 2021. Package -2: Due to non finalzation of ...\"",
    "recommendedAction": "Formulation of detailed catch-up recovery schedule; workforce remobilization and multi-shift operations.",
    "multiHorizonRisk": {
      "3m": 46.5,
      "6m": 66.0,
      "12m": 72.5,
      "15m": 63.6,
      "18m": 63.0
    },
    "multiHorizonDelay": {
      "3m": 1.3,
      "6m": 2.0,
      "12m": 3.4,
      "15m": 6.2,
      "18m": 5.3
    },
    "multiHorizonCostInc": {
      "3m": 0.32,
      "6m": 0.98,
      "12m": 1.77,
      "15m": 1.71,
      "18m": 2.2
    }
  },
  {
    "id": "OCMS-220100318",
    "rawId": "220100318",
    "name": "Etawah-Mainpuri (Nl),Ncr",
    "shortName": "Etawah-Mainpuri",
    "state": "Uttar Pradesh",
    "district": "Uttar Pradesh Regional Corridor",
    "region": "Northern",
    "ministry": "Ministry of Railways",
    "department": "Railway Board & Zonal Railways",
    "sector": "Railways & DFC",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 1250,
    "approvedCost": 1250,
    "currentCost": 346,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 5,
    "riskLevel": "High",
    "riskScore": 94.1,
    "riskBreakdown": {
      "costOverrunRisk": 98,
      "timeDelayRisk": 22,
      "progressRisk": 75,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Remaining Months (Missing Reporting)",
        "impact": 25.6,
        "category": "Project Feature",
        "description": "Model attribution +2.559 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Days To Forecast Completion",
        "impact": 10.0,
        "category": "Timeline",
        "description": "Model attribution +0.996 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 1.7,
        "category": "Execution Pace",
        "description": "Model attribution +0.169 associated with prediction runway.",
        "featureValue": 7.64
      },
      {
        "factor": "Expenditure Ratio Forecast",
        "impact": 1.1,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.112 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Snapshot Gap Days",
        "impact": 0.8,
        "category": "Timeline",
        "description": "Model attribution +0.084 associated with prediction runway.",
        "featureValue": 92.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 500,
        "actualCost": 145
      },
      {
        "month": "Snapshot -9M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 688,
        "actualCost": 201
      },
      {
        "month": "Snapshot -6M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 875,
        "actualCost": 256
      },
      {
        "month": "Snapshot -3M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 1062,
        "actualCost": 311
      },
      {
        "month": "Current Snapshot",
        "planned": 10,
        "actual": 5,
        "plannedCost": 1250,
        "actualCost": 346
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100318",
          "label": "Etawah-Mainpuri (Nl),Ncr...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-35",
          "label": "NORTH CENTRAL RAILWAY",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100318",
          "target": "AGENCY-35",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Project trajectory monitoring escalation: physical progress verification audit recommended based on observed dynamics.",
    "multiHorizonRisk": {
      "3m": 94.1,
      "6m": 8.9,
      "12m": 11.9,
      "15m": 25.0,
      "18m": 18.1
    },
    "multiHorizonDelay": {
      "3m": 0.7,
      "6m": 2.6,
      "12m": 3.4,
      "15m": 6.9,
      "18m": 8.7
    },
    "multiHorizonCostInc": {
      "3m": 8.34,
      "6m": 0.13,
      "12m": 0.82,
      "15m": 0.82,
      "18m": 0.79
    }
  },
  {
    "id": "OCMS-220100327",
    "rawId": "220100327",
    "name": "Khurda Road - Barang 3Rd Line (Dl) (Ecor)",
    "shortName": "Khurda Road - Barang 3Rd Line",
    "state": "Odisha",
    "district": "Odisha Regional Corridor",
    "region": "Eastern",
    "ministry": "Ministry of Railways",
    "department": "Railway Board & Zonal Railways",
    "sector": "Railways & DFC",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 133,
    "approvedCost": 133,
    "currentCost": 133,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 5,
    "riskLevel": "High",
    "riskScore": 78.8,
    "riskBreakdown": {
      "costOverrunRisk": 88,
      "timeDelayRisk": 10,
      "progressRisk": 63,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Forecast Cost Change Pct Since Prev",
        "impact": 13.6,
        "category": "Cost Dynamics",
        "description": "Model attribution +1.355 associated with prediction runway.",
        "featureValue": -52.19
      },
      {
        "factor": "Anticipated Cost (Missing Reporting)",
        "impact": 4.6,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.463 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Days To Forecast Completion",
        "impact": 3.0,
        "category": "Timeline",
        "description": "Model attribution +0.295 associated with prediction runway.",
        "featureValue": -183.0
      },
      {
        "factor": "Forecast Cost Acceleration Per 30D",
        "impact": 2.0,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.204 associated with prediction runway.",
        "featureValue": -24.03
      },
      {
        "factor": "Project Age Months",
        "impact": 1.9,
        "category": "Project Feature",
        "description": "Model attribution +0.186 associated with prediction runway.",
        "featureValue": 284.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 53,
        "actualCost": 56
      },
      {
        "month": "Snapshot -9M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 73,
        "actualCost": 77
      },
      {
        "month": "Snapshot -6M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 93,
        "actualCost": 99
      },
      {
        "month": "Snapshot -3M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 113,
        "actualCost": 120
      },
      {
        "month": "Current Snapshot",
        "planned": 10,
        "actual": 5,
        "plannedCost": 133,
        "actualCost": 133
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100327",
          "label": "Khurda Road - Barang 3Rd Lin...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-36",
          "label": "RVNL",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100327",
          "target": "AGENCY-36",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Financial audit on item-rate escalation; strict expenditure milestone oversight.",
    "multiHorizonRisk": {
      "3m": 78.8,
      "6m": 91.9,
      "12m": 90.0,
      "15m": 87.6,
      "18m": 90.6
    },
    "multiHorizonDelay": {
      "3m": 0.3,
      "6m": 2.4,
      "12m": 2.4,
      "15m": 4.5,
      "18m": 6.6
    },
    "multiHorizonCostInc": {
      "3m": 7.25,
      "6m": 8.4,
      "12m": 0.67,
      "15m": 117.74,
      "18m": 154.13
    }
  },
  {
    "id": "OCMS-N06000147",
    "rawId": "N06000147",
    "name": "Kalyanikhani 6 Incline Project",
    "shortName": "Kalyanikhani 6 Incline Project",
    "state": "Telangana",
    "district": "Telangana Regional Corridor",
    "region": "Southern",
    "ministry": "Ministry of Heavy Industries",
    "department": "Department of Heavy Industry",
    "sector": "Industrial Infrastructure",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 1250,
    "approvedCost": 1250,
    "currentCost": 478,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 5,
    "riskLevel": "High",
    "riskScore": 92.5,
    "riskBreakdown": {
      "costOverrunRisk": 96,
      "timeDelayRisk": 17,
      "progressRisk": 74,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Remaining Months (Missing Reporting)",
        "impact": 26.3,
        "category": "Project Feature",
        "description": "Model attribution +2.631 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Days To Forecast Completion",
        "impact": 10.7,
        "category": "Timeline",
        "description": "Model attribution +1.071 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 1.8,
        "category": "Execution Pace",
        "description": "Model attribution +0.184 associated with prediction runway.",
        "featureValue": 7.64
      },
      {
        "factor": "Snapshot Gap Days",
        "impact": 0.7,
        "category": "Timeline",
        "description": "Model attribution +0.071 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Schedule Slip Current Months",
        "impact": 0.7,
        "category": "Timeline",
        "description": "Model attribution +0.071 associated with prediction runway.",
        "featureValue": 5.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 500,
        "actualCost": 201
      },
      {
        "month": "Snapshot -9M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 688,
        "actualCost": 277
      },
      {
        "month": "Snapshot -6M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 875,
        "actualCost": 353
      },
      {
        "month": "Snapshot -3M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 1062,
        "actualCost": 430
      },
      {
        "month": "Current Snapshot",
        "planned": 10,
        "actual": 5,
        "plannedCost": 1250,
        "actualCost": 478
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N06000147",
          "label": "Kalyanikhani 6 Incline Proje...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-37",
          "label": "SINGARENI COLLIERS COMPAN",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-N06000147",
          "target": "AGENCY-37",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Project trajectory monitoring escalation: physical progress verification audit recommended based on observed dynamics.",
    "multiHorizonRisk": {
      "3m": 92.5,
      "6m": 6.5,
      "12m": 12.6,
      "15m": 9.1,
      "18m": 25.7
    },
    "multiHorizonDelay": {
      "3m": 0.4,
      "6m": 1.3,
      "12m": 6.2,
      "15m": 12.6,
      "18m": 15.1
    },
    "multiHorizonCostInc": {
      "3m": 8.65,
      "6m": 0.02,
      "12m": 0.33,
      "15m": 0.44,
      "18m": 0.39
    }
  },
  {
    "id": "OCMS-N06000174",
    "rawId": "N06000174",
    "name": "Rampuram Shaft Block",
    "shortName": "Rampuram Shaft Block",
    "state": "Telangana",
    "district": "Telangana Regional Corridor",
    "region": "Southern",
    "ministry": "Ministry of Heavy Industries",
    "department": "Department of Heavy Industry",
    "sector": "Industrial Infrastructure",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 432,
    "approvedCost": 432,
    "currentCost": 432,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 5,
    "riskLevel": "High",
    "riskScore": 93.3,
    "riskBreakdown": {
      "costOverrunRisk": 96,
      "timeDelayRisk": 17,
      "progressRisk": 75,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Remaining Months (Missing Reporting)",
        "impact": 25.9,
        "category": "Project Feature",
        "description": "Model attribution +2.587 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Days To Forecast Completion",
        "impact": 11.0,
        "category": "Timeline",
        "description": "Model attribution +1.095 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 2.0,
        "category": "Execution Pace",
        "description": "Model attribution +0.203 associated with prediction runway.",
        "featureValue": 7.64
      },
      {
        "factor": "Snapshot Gap Days",
        "impact": 0.7,
        "category": "Timeline",
        "description": "Model attribution +0.073 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Schedule Slip Current Months",
        "impact": 0.7,
        "category": "Timeline",
        "description": "Model attribution +0.070 associated with prediction runway.",
        "featureValue": 5.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 173,
        "actualCost": 181
      },
      {
        "month": "Snapshot -9M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 238,
        "actualCost": 251
      },
      {
        "month": "Snapshot -6M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 302,
        "actualCost": 320
      },
      {
        "month": "Snapshot -3M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 367,
        "actualCost": 389
      },
      {
        "month": "Current Snapshot",
        "planned": 10,
        "actual": 5,
        "plannedCost": 432,
        "actualCost": 432
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N06000174",
          "label": "Rampuram Shaft Block...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-38",
          "label": "SINGARENI COLLIERS COMPAN",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-N06000174",
          "target": "AGENCY-38",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Project trajectory monitoring escalation: physical progress verification audit recommended based on observed dynamics.",
    "multiHorizonRisk": {
      "3m": 93.3,
      "6m": 6.5,
      "12m": 11.8,
      "15m": 7.6,
      "18m": 9.7
    },
    "multiHorizonDelay": {
      "3m": 0.6,
      "6m": 2.2,
      "12m": 5.7,
      "15m": 18.1,
      "18m": 20.5
    },
    "multiHorizonCostInc": {
      "3m": 8.73,
      "6m": 0.02,
      "12m": 0.35,
      "15m": 0.24,
      "18m": 0.32
    }
  },
  {
    "id": "OCMS-N06000175",
    "rawId": "N06000175",
    "name": "Sravanapalli Opencast Project",
    "shortName": "Sravanapalli Opencast Project",
    "state": "Telangana",
    "district": "Telangana Regional Corridor",
    "region": "Southern",
    "ministry": "Ministry of Heavy Industries",
    "department": "Department of Heavy Industry",
    "sector": "Industrial Infrastructure",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 413,
    "approvedCost": 413,
    "currentCost": 413,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 5,
    "riskLevel": "High",
    "riskScore": 90.5,
    "riskBreakdown": {
      "costOverrunRisk": 95,
      "timeDelayRisk": 12,
      "progressRisk": 72,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Remaining Months (Missing Reporting)",
        "impact": 27.1,
        "category": "Project Feature",
        "description": "Model attribution +2.710 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Days To Forecast Completion",
        "impact": 11.1,
        "category": "Timeline",
        "description": "Model attribution +1.114 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 1.7,
        "category": "Execution Pace",
        "description": "Model attribution +0.172 associated with prediction runway.",
        "featureValue": 7.64
      },
      {
        "factor": "Schedule Slip Current Months",
        "impact": 0.8,
        "category": "Timeline",
        "description": "Model attribution +0.078 associated with prediction runway.",
        "featureValue": 5.0
      },
      {
        "factor": "Snapshot Gap Days",
        "impact": 0.6,
        "category": "Timeline",
        "description": "Model attribution +0.055 associated with prediction runway.",
        "featureValue": 183.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 165,
        "actualCost": 173
      },
      {
        "month": "Snapshot -9M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 227,
        "actualCost": 239
      },
      {
        "month": "Snapshot -6M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 289,
        "actualCost": 305
      },
      {
        "month": "Snapshot -3M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 351,
        "actualCost": 371
      },
      {
        "month": "Current Snapshot",
        "planned": 10,
        "actual": 5,
        "plannedCost": 413,
        "actualCost": 413
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N06000175",
          "label": "Sravanapalli Opencast Projec...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-39",
          "label": "SINGARENI COLLIERS COMPAN",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-N06000175",
          "target": "AGENCY-39",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Project trajectory monitoring escalation: physical progress verification audit recommended based on observed dynamics.",
    "multiHorizonRisk": {
      "3m": 90.5,
      "6m": 4.5,
      "12m": 7.5,
      "15m": 4.4,
      "18m": 4.4
    },
    "multiHorizonDelay": {
      "3m": 0.3,
      "6m": 1.0,
      "12m": 4.0,
      "15m": 10.8,
      "18m": 13.8
    },
    "multiHorizonCostInc": {
      "3m": 8.26,
      "6m": 0.02,
      "12m": 0.15,
      "15m": 0.24,
      "18m": 0.26
    }
  },
  {
    "id": "OCMS-N06000202",
    "rawId": "N06000202",
    "name": "Godavarikhani Coal Mine - 5",
    "shortName": "Godavarikhani Coal Mine - 5",
    "state": "Telangana",
    "district": "Telangana Regional Corridor",
    "region": "Southern",
    "ministry": "Ministry of Heavy Industries",
    "department": "Department of Heavy Industry",
    "sector": "Industrial Infrastructure",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 607,
    "approvedCost": 607,
    "currentCost": 607,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 71,
    "riskLevel": "High",
    "riskScore": 67.3,
    "riskBreakdown": {
      "costOverrunRisk": 4,
      "timeDelayRisk": 49,
      "progressRisk": 54,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Days To Forecast Completion",
        "impact": 7.0,
        "category": "Timeline",
        "description": "Model attribution +0.705 associated with prediction runway.",
        "featureValue": -30.0
      },
      {
        "factor": "Anticipated Cost (Missing Reporting)",
        "impact": 4.2,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.419 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 2.3,
        "category": "Execution Pace",
        "description": "Model attribution +0.231 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Catchup Pressure",
        "impact": 2.0,
        "category": "Execution Pace",
        "description": "Model attribution +0.199 associated with prediction runway.",
        "featureValue": 870.0
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 1.7,
        "category": "Execution Pace",
        "description": "Model attribution +0.172 associated with prediction runway.",
        "featureValue": 870.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 46,
        "actual": 41,
        "plannedCost": 243,
        "actualCost": 255
      },
      {
        "month": "Snapshot -9M",
        "planned": 53,
        "actual": 49,
        "plannedCost": 334,
        "actualCost": 352
      },
      {
        "month": "Snapshot -6M",
        "planned": 59,
        "actual": 56,
        "plannedCost": 425,
        "actualCost": 449
      },
      {
        "month": "Snapshot -3M",
        "planned": 66,
        "actual": 64,
        "plannedCost": 516,
        "actualCost": 546
      },
      {
        "month": "Current Snapshot",
        "planned": 76,
        "actual": 71,
        "plannedCost": 607,
        "actualCost": 607
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N06000202",
          "label": "Godavarikhani Coal Mine - 5...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-40",
          "label": "Singareni Collieries Comp",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-N06000202",
          "target": "AGENCY-40",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Project trajectory monitoring escalation: physical progress verification audit recommended based on observed dynamics.",
    "multiHorizonRisk": {
      "3m": 67.3,
      "6m": 64.3,
      "12m": 72.3,
      "15m": 68.0,
      "18m": 70.1
    },
    "multiHorizonDelay": {
      "3m": 2.1,
      "6m": 4.1,
      "12m": 7.0,
      "15m": 11.3,
      "18m": 12.9
    },
    "multiHorizonCostInc": {
      "3m": 0.09,
      "6m": 0.23,
      "12m": 1.21,
      "15m": 0.3,
      "18m": 0.4
    }
  },
  {
    "id": "OCMS-N09000001",
    "rawId": "N09000001",
    "name": "National Film Heritage Mission",
    "shortName": "National Film Heritage Mission",
    "state": "Maharashtra",
    "district": "Maharashtra Regional Corridor",
    "region": "Western",
    "ministry": "Ministry of Heavy Industries",
    "department": "Department of Heavy Industry",
    "sector": "Industrial Infrastructure",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 597,
    "approvedCost": 597,
    "currentCost": 597,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 5,
    "riskLevel": "High",
    "riskScore": 89.0,
    "riskBreakdown": {
      "costOverrunRisk": 97,
      "timeDelayRisk": 8,
      "progressRisk": 71,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Remaining Months (Missing Reporting)",
        "impact": 26.5,
        "category": "Project Feature",
        "description": "Model attribution +2.654 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Days To Forecast Completion",
        "impact": 10.4,
        "category": "Timeline",
        "description": "Model attribution +1.037 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 1.4,
        "category": "Execution Pace",
        "description": "Model attribution +0.137 associated with prediction runway.",
        "featureValue": 7.64
      },
      {
        "factor": "Anticipated Cost (Missing Reporting)",
        "impact": 1.0,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.102 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Schedule Slip Current Months",
        "impact": 0.7,
        "category": "Timeline",
        "description": "Model attribution +0.074 associated with prediction runway.",
        "featureValue": 5.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 239,
        "actualCost": 251
      },
      {
        "month": "Snapshot -9M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 329,
        "actualCost": 346
      },
      {
        "month": "Snapshot -6M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 418,
        "actualCost": 442
      },
      {
        "month": "Snapshot -3M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 508,
        "actualCost": 538
      },
      {
        "month": "Current Snapshot",
        "planned": 10,
        "actual": 5,
        "plannedCost": 597,
        "actualCost": 597
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N09000001",
          "label": "National Film Heritage Missi...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-41",
          "label": "NFAI",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-N09000001",
          "target": "AGENCY-41",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Project trajectory monitoring escalation: physical progress verification audit recommended based on observed dynamics.",
    "multiHorizonRisk": {
      "3m": 89.0,
      "6m": 11.3,
      "12m": 19.5,
      "15m": 6.9,
      "18m": 15.1
    },
    "multiHorizonDelay": {
      "3m": 0.1,
      "6m": 1.2,
      "12m": 4.0,
      "15m": 10.6,
      "18m": 13.1
    },
    "multiHorizonCostInc": {
      "3m": 8.24,
      "6m": 0.17,
      "12m": 1.54,
      "15m": 0.87,
      "18m": 0.76
    }
  },
  {
    "id": "OCMS-N12000104",
    "rawId": "N12000104",
    "name": "Hall Under Rgka",
    "shortName": "Hall Under Rgka",
    "state": "Andhra Pradesh",
    "district": "Andhra Pradesh Regional Corridor",
    "region": "Southern",
    "ministry": "Ministry of Heavy Industries",
    "department": "Department of Heavy Industry",
    "sector": "Industrial Infrastructure",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 232,
    "approvedCost": 232,
    "currentCost": 232,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 5,
    "riskLevel": "High",
    "riskScore": 89.8,
    "riskBreakdown": {
      "costOverrunRisk": 95,
      "timeDelayRisk": 11,
      "progressRisk": 72,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Remaining Months (Missing Reporting)",
        "impact": 26.8,
        "category": "Project Feature",
        "description": "Model attribution +2.677 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Days To Forecast Completion",
        "impact": 10.9,
        "category": "Timeline",
        "description": "Model attribution +1.093 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 1.8,
        "category": "Execution Pace",
        "description": "Model attribution +0.176 associated with prediction runway.",
        "featureValue": 7.64
      },
      {
        "factor": "Schedule Slip Current Months",
        "impact": 0.7,
        "category": "Timeline",
        "description": "Model attribution +0.070 associated with prediction runway.",
        "featureValue": 5.0
      },
      {
        "factor": "Project Age Months",
        "impact": 0.4,
        "category": "Project Feature",
        "description": "Model attribution +0.042 associated with prediction runway.",
        "featureValue": 68.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 93,
        "actualCost": 97
      },
      {
        "month": "Snapshot -9M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 128,
        "actualCost": 135
      },
      {
        "month": "Snapshot -6M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 162,
        "actualCost": 172
      },
      {
        "month": "Snapshot -3M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 197,
        "actualCost": 209
      },
      {
        "month": "Current Snapshot",
        "planned": 10,
        "actual": 5,
        "plannedCost": 232,
        "actualCost": 232
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N12000104",
          "label": "Hall Under Rgka...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-42",
          "label": "61",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-N12000104",
          "target": "AGENCY-42",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Project trajectory monitoring escalation: physical progress verification audit recommended based on observed dynamics.",
    "multiHorizonRisk": {
      "3m": 89.8,
      "6m": 7.6,
      "12m": 10.7,
      "15m": 8.3,
      "18m": 16.7
    },
    "multiHorizonDelay": {
      "3m": 0.3,
      "6m": 1.1,
      "12m": 2.4,
      "15m": 11.5,
      "18m": 12.9
    },
    "multiHorizonCostInc": {
      "3m": 8.37,
      "6m": 0.03,
      "12m": 0.16,
      "15m": 0.43,
      "18m": 0.79
    }
  },
  {
    "id": "OCMS-N12000106",
    "rawId": "N12000106",
    "name": "Construction Of Campus And Building For Niper At Gandhinagar, Gujarat",
    "shortName": "Construction Of Campus And Building",
    "state": "Gujarat",
    "district": "Gujarat Regional Corridor",
    "region": "Western",
    "ministry": "Ministry of Heavy Industries",
    "department": "Department of Heavy Industry",
    "sector": "Industrial Infrastructure",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 175,
    "approvedCost": 175,
    "currentCost": 175,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 5,
    "riskLevel": "High",
    "riskScore": 88.3,
    "riskBreakdown": {
      "costOverrunRisk": 95,
      "timeDelayRisk": 6,
      "progressRisk": 71,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Remaining Months (Missing Reporting)",
        "impact": 26.9,
        "category": "Project Feature",
        "description": "Model attribution +2.692 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Days To Forecast Completion",
        "impact": 10.5,
        "category": "Timeline",
        "description": "Model attribution +1.049 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 1.3,
        "category": "Execution Pace",
        "description": "Model attribution +0.134 associated with prediction runway.",
        "featureValue": 7.64
      },
      {
        "factor": "Project Age Months",
        "impact": 1.2,
        "category": "Project Feature",
        "description": "Model attribution +0.119 associated with prediction runway.",
        "featureValue": 83.0
      },
      {
        "factor": "Anticipated Cost (Missing Reporting)",
        "impact": 1.0,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.102 associated with prediction runway.",
        "featureValue": 1.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 70,
        "actualCost": 74
      },
      {
        "month": "Snapshot -9M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 96,
        "actualCost": 102
      },
      {
        "month": "Snapshot -6M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 122,
        "actualCost": 130
      },
      {
        "month": "Snapshot -3M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 149,
        "actualCost": 158
      },
      {
        "month": "Current Snapshot",
        "planned": 10,
        "actual": 5,
        "plannedCost": 175,
        "actualCost": 175
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N12000106",
          "label": "Construction Of Campus And B...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-43",
          "label": "HSCL",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-N12000106",
          "target": "AGENCY-43",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Project trajectory monitoring escalation: physical progress verification audit recommended based on observed dynamics.",
    "multiHorizonRisk": {
      "3m": 88.3,
      "6m": 5.6,
      "12m": 12.9,
      "15m": 8.8,
      "18m": 17.1
    },
    "multiHorizonDelay": {
      "3m": 0.0,
      "6m": 0.9,
      "12m": 3.8,
      "15m": 10.6,
      "18m": 15.6
    },
    "multiHorizonCostInc": {
      "3m": 8.29,
      "6m": 0.05,
      "12m": 1.0,
      "15m": 0.44,
      "18m": 0.62
    }
  },
  {
    "id": "OCMS-N12000124",
    "rawId": "N12000124",
    "name": "Nmdc Slurry Pipeline Project Phase-1",
    "shortName": "Nmdc Slurry Pipeline Project Phase-",
    "state": "Chhattisgarh",
    "district": "Chhattisgarh Regional Corridor",
    "region": "Central",
    "ministry": "Ministry of Heavy Industries",
    "department": "Department of Heavy Industry",
    "sector": "Industrial Infrastructure",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 2907,
    "approvedCost": 2907,
    "currentCost": 2907,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 94,
    "riskLevel": "High",
    "riskScore": 68.2,
    "riskBreakdown": {
      "costOverrunRisk": 6,
      "timeDelayRisk": 55,
      "progressRisk": 55,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Days To Forecast Completion",
        "impact": 6.6,
        "category": "Timeline",
        "description": "Model attribution +0.658 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Anticipated Cost (Missing Reporting)",
        "impact": 4.3,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.432 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 2.0,
        "category": "Execution Pace",
        "description": "Model attribution +0.198 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Catchup Pressure",
        "impact": 1.6,
        "category": "Execution Pace",
        "description": "Model attribution +0.159 associated with prediction runway.",
        "featureValue": 179.03
      },
      {
        "factor": "Project Age Months",
        "impact": 1.4,
        "category": "Project Feature",
        "description": "Model attribution +0.141 associated with prediction runway.",
        "featureValue": 124.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 69,
        "actual": 64,
        "plannedCost": 1163,
        "actualCost": 1221
      },
      {
        "month": "Snapshot -9M",
        "planned": 76,
        "actual": 72,
        "plannedCost": 1599,
        "actualCost": 1686
      },
      {
        "month": "Snapshot -6M",
        "planned": 82,
        "actual": 79,
        "plannedCost": 2035,
        "actualCost": 2151
      },
      {
        "month": "Snapshot -3M",
        "planned": 89,
        "actual": 87,
        "plannedCost": 2471,
        "actualCost": 2616
      },
      {
        "month": "Current Snapshot",
        "planned": 99,
        "actual": 94,
        "plannedCost": 2907,
        "actualCost": 2907
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N12000124",
          "label": "Nmdc Slurry Pipeline Project...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-44",
          "label": "National Mineral Developm",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-N12000124",
          "target": "AGENCY-44",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Project trajectory monitoring escalation: physical progress verification audit recommended based on observed dynamics.",
    "multiHorizonRisk": {
      "3m": 68.2,
      "6m": 84.5,
      "12m": 80.3,
      "15m": 79.9,
      "18m": 78.2
    },
    "multiHorizonDelay": {
      "3m": 2.1,
      "6m": 7.1,
      "12m": 10.6,
      "15m": 13.8,
      "18m": 12.3
    },
    "multiHorizonCostInc": {
      "3m": 0.15,
      "6m": 0.39,
      "12m": 1.78,
      "15m": 0.56,
      "18m": 0.46
    }
  },
  {
    "id": "OCMS-N16000209",
    "rawId": "N16000209",
    "name": "50 Mw Capacity Wind Power Project Under Phase Ii",
    "shortName": "50 Mw Capacity Wind Power Project U",
    "state": "Rajasthan",
    "district": "Rajasthan Regional Corridor",
    "region": "Northern",
    "ministry": "Ministry of Petroleum and Natural Gas",
    "department": "Petroleum Planning & Analysis Cell",
    "sector": "Petroleum & Natural Gas",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 310,
    "approvedCost": 310,
    "currentCost": 310,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 5,
    "riskLevel": "High",
    "riskScore": 70.5,
    "riskBreakdown": {
      "costOverrunRisk": 81,
      "timeDelayRisk": 4,
      "progressRisk": 56,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Forecast Cost Change Pct Since Prev",
        "impact": 15.1,
        "category": "Cost Dynamics",
        "description": "Model attribution +1.515 associated with prediction runway.",
        "featureValue": -16.22
      },
      {
        "factor": "Anticipated Cost (Missing Reporting)",
        "impact": 4.7,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.472 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Days To Forecast Completion",
        "impact": 4.0,
        "category": "Timeline",
        "description": "Model attribution +0.398 associated with prediction runway.",
        "featureValue": -2496.0
      },
      {
        "factor": "Project Age Months",
        "impact": 2.0,
        "category": "Project Feature",
        "description": "Model attribution +0.196 associated with prediction runway.",
        "featureValue": 97.0
      },
      {
        "factor": "Snapshot Gap Days",
        "impact": 0.7,
        "category": "Timeline",
        "description": "Model attribution +0.067 associated with prediction runway.",
        "featureValue": 92.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 124,
        "actualCost": 130
      },
      {
        "month": "Snapshot -9M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 170,
        "actualCost": 180
      },
      {
        "month": "Snapshot -6M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 217,
        "actualCost": 229
      },
      {
        "month": "Snapshot -3M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 264,
        "actualCost": 279
      },
      {
        "month": "Current Snapshot",
        "planned": 10,
        "actual": 5,
        "plannedCost": 310,
        "actualCost": 310
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N16000209",
          "label": "50 Mw Capacity Wind Power Pr...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-45",
          "label": "HPCL",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-N16000209",
          "target": "AGENCY-45",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Financial audit on item-rate escalation; strict expenditure milestone oversight.",
    "multiHorizonRisk": {
      "3m": 70.5,
      "6m": 56.9,
      "12m": 70.7,
      "15m": 71.2,
      "18m": 81.4
    },
    "multiHorizonDelay": {
      "3m": 0.0,
      "6m": 0.5,
      "12m": 2.3,
      "15m": 17.8,
      "18m": 22.8
    },
    "multiHorizonCostInc": {
      "3m": 6.0,
      "6m": 8.19,
      "12m": 1.05,
      "15m": 6.86,
      "18m": 22.27
    }
  },
  {
    "id": "OCMS-N16000255",
    "rawId": "N16000255",
    "name": "Nan",
    "shortName": "Nan",
    "state": "Karnataka",
    "district": "Karnataka Regional Corridor",
    "region": "Southern",
    "ministry": "Ministry of Heavy Industries",
    "department": "Department of Heavy Industry",
    "sector": "Industrial Infrastructure",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 1250,
    "approvedCost": 1250,
    "currentCost": 185,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 5,
    "riskLevel": "High",
    "riskScore": 89.9,
    "riskBreakdown": {
      "costOverrunRisk": 97,
      "timeDelayRisk": 13,
      "progressRisk": 72,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Remaining Months (Missing Reporting)",
        "impact": 26.5,
        "category": "Project Feature",
        "description": "Model attribution +2.647 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Days To Forecast Completion",
        "impact": 10.7,
        "category": "Timeline",
        "description": "Model attribution +1.074 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 1.4,
        "category": "Execution Pace",
        "description": "Model attribution +0.144 associated with prediction runway.",
        "featureValue": 7.64
      },
      {
        "factor": "Schedule Slip Current Months",
        "impact": 0.8,
        "category": "Timeline",
        "description": "Model attribution +0.080 associated with prediction runway.",
        "featureValue": 5.0
      },
      {
        "factor": "Snapshot Gap Days",
        "impact": 0.6,
        "category": "Timeline",
        "description": "Model attribution +0.064 associated with prediction runway.",
        "featureValue": 183.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 500,
        "actualCost": 78
      },
      {
        "month": "Snapshot -9M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 688,
        "actualCost": 107
      },
      {
        "month": "Snapshot -6M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 875,
        "actualCost": 137
      },
      {
        "month": "Snapshot -3M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 1062,
        "actualCost": 166
      },
      {
        "month": "Current Snapshot",
        "planned": 10,
        "actual": 5,
        "plannedCost": 1250,
        "actualCost": 185
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N16000255",
          "label": "Nan...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-46",
          "label": "MANGALORE REFINERY AND PE",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-N16000255",
          "target": "AGENCY-46",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Project trajectory monitoring escalation: physical progress verification audit recommended based on observed dynamics.",
    "multiHorizonRisk": {
      "3m": 89.9,
      "6m": 7.6,
      "12m": 10.9,
      "15m": 23.7,
      "18m": 41.1
    },
    "multiHorizonDelay": {
      "3m": 0.7,
      "6m": 1.0,
      "12m": 2.7,
      "15m": 7.0,
      "18m": 10.4
    },
    "multiHorizonCostInc": {
      "3m": 8.73,
      "6m": 0.08,
      "12m": 0.64,
      "15m": 1.08,
      "18m": 0.57
    }
  },
  {
    "id": "OCMS-N22000094",
    "rawId": "N22000094",
    "name": "Electrification Of Khurja-Meerut-Saharanpur And G'Bad-Meerut",
    "shortName": "Electrification Of Khurja-Meerut-Sa",
    "state": "Uttar Pradesh",
    "district": "Uttar Pradesh Regional Corridor",
    "region": "Northern",
    "ministry": "Ministry of Railways",
    "department": "Railway Board & Zonal Railways",
    "sector": "Railways & DFC",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 1250,
    "approvedCost": 1250,
    "currentCost": 275,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 5,
    "riskLevel": "High",
    "riskScore": 91.6,
    "riskBreakdown": {
      "costOverrunRisk": 96,
      "timeDelayRisk": 19,
      "progressRisk": 73,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Remaining Months (Missing Reporting)",
        "impact": 26.3,
        "category": "Project Feature",
        "description": "Model attribution +2.634 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Days To Forecast Completion",
        "impact": 10.8,
        "category": "Timeline",
        "description": "Model attribution +1.085 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 1.7,
        "category": "Execution Pace",
        "description": "Model attribution +0.172 associated with prediction runway.",
        "featureValue": 7.64
      },
      {
        "factor": "Schedule Slip Current Months",
        "impact": 0.6,
        "category": "Timeline",
        "description": "Model attribution +0.057 associated with prediction runway.",
        "featureValue": 5.0
      },
      {
        "factor": "Forecast Completion Date Days Movement",
        "impact": 0.5,
        "category": "Timeline",
        "description": "Model attribution +0.049 associated with prediction runway.",
        "featureValue": 0.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 500,
        "actualCost": 116
      },
      {
        "month": "Snapshot -9M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 688,
        "actualCost": 160
      },
      {
        "month": "Snapshot -6M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 875,
        "actualCost": 204
      },
      {
        "month": "Snapshot -3M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 1062,
        "actualCost": 248
      },
      {
        "month": "Current Snapshot",
        "planned": 10,
        "actual": 5,
        "plannedCost": 1250,
        "actualCost": 275
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N22000094",
          "label": "Electrification Of Khurja-Me...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-47",
          "label": "RAILWAY ELECTRIFICATION",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-N22000094",
          "target": "AGENCY-47",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Project trajectory monitoring escalation: physical progress verification audit recommended based on observed dynamics.",
    "multiHorizonRisk": {
      "3m": 91.6,
      "6m": 6.9,
      "12m": 18.1,
      "15m": 13.1,
      "18m": 16.7
    },
    "multiHorizonDelay": {
      "3m": 0.7,
      "6m": 1.4,
      "12m": 5.9,
      "15m": 10.3,
      "18m": 11.4
    },
    "multiHorizonCostInc": {
      "3m": 8.63,
      "6m": 0.08,
      "12m": 0.55,
      "15m": 0.44,
      "18m": 0.61
    }
  },
  {
    "id": "OCMS-N22000099",
    "rawId": "N22000099",
    "name": "Agartala Sabroom, Nl, Nefr",
    "shortName": "Agartala Sabroom, Nl, Nefr",
    "state": "Tripura",
    "district": "Tripura Regional Corridor",
    "region": "North-Eastern",
    "ministry": "Ministry of Heavy Industries",
    "department": "Department of Heavy Industry",
    "sector": "Industrial Infrastructure",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 1250,
    "approvedCost": 1250,
    "currentCost": 1250,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 5,
    "riskLevel": "High",
    "riskScore": 90.1,
    "riskBreakdown": {
      "costOverrunRisk": 96,
      "timeDelayRisk": 8,
      "progressRisk": 72,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Remaining Months (Missing Reporting)",
        "impact": 26.5,
        "category": "Project Feature",
        "description": "Model attribution +2.652 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Days To Forecast Completion",
        "impact": 10.3,
        "category": "Timeline",
        "description": "Model attribution +1.034 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Anticipated Cost (Missing Reporting)",
        "impact": 1.5,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.154 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 1.4,
        "category": "Execution Pace",
        "description": "Model attribution +0.138 associated with prediction runway.",
        "featureValue": 7.64
      },
      {
        "factor": "Schedule Slip Current Months",
        "impact": 0.7,
        "category": "Timeline",
        "description": "Model attribution +0.074 associated with prediction runway.",
        "featureValue": 5.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 500,
        "actualCost": 525
      },
      {
        "month": "Snapshot -9M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 688,
        "actualCost": 725
      },
      {
        "month": "Snapshot -6M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 875,
        "actualCost": 925
      },
      {
        "month": "Snapshot -3M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 1062,
        "actualCost": 1125
      },
      {
        "month": "Current Snapshot",
        "planned": 10,
        "actual": 5,
        "plannedCost": 1250,
        "actualCost": 1250
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N22000099",
          "label": "Agartala Sabroom, Nl, Nefr...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-48",
          "label": "141",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-N22000099",
          "target": "AGENCY-48",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Project trajectory monitoring escalation: physical progress verification audit recommended based on observed dynamics.",
    "multiHorizonRisk": {
      "3m": 90.1,
      "6m": 11.0,
      "12m": 12.7,
      "15m": 8.0,
      "18m": 15.4
    },
    "multiHorizonDelay": {
      "3m": 0.3,
      "6m": 1.2,
      "12m": 4.2,
      "15m": 10.2,
      "18m": 13.2
    },
    "multiHorizonCostInc": {
      "3m": 8.21,
      "6m": 0.03,
      "12m": 0.61,
      "15m": 0.59,
      "18m": 0.55
    }
  },
  {
    "id": "OCMS-N22000101",
    "rawId": "N22000101",
    "name": "Kishanganj Jalalgarh, Nl, Nefr",
    "shortName": "Kishanganj Jalalgarh, Nl, Nefr",
    "state": "Bihar",
    "district": "Bihar Regional Corridor",
    "region": "Eastern",
    "ministry": "Ministry of Railways",
    "department": "Railway Board & Zonal Railways",
    "sector": "Railways & DFC",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 1250,
    "approvedCost": 1250,
    "currentCost": 360,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 5,
    "riskLevel": "High",
    "riskScore": 92.3,
    "riskBreakdown": {
      "costOverrunRisk": 96,
      "timeDelayRisk": 18,
      "progressRisk": 74,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Remaining Months (Missing Reporting)",
        "impact": 26.0,
        "category": "Project Feature",
        "description": "Model attribution +2.601 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Days To Forecast Completion",
        "impact": 11.2,
        "category": "Timeline",
        "description": "Model attribution +1.115 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 2.0,
        "category": "Execution Pace",
        "description": "Model attribution +0.203 associated with prediction runway.",
        "featureValue": 7.64
      },
      {
        "factor": "Schedule Slip Current Months",
        "impact": 0.6,
        "category": "Timeline",
        "description": "Model attribution +0.063 associated with prediction runway.",
        "featureValue": 5.0
      },
      {
        "factor": "Catchup Pressure",
        "impact": 0.6,
        "category": "Execution Pace",
        "description": "Model attribution +0.057 associated with prediction runway.",
        "featureValue": 6.66
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 500,
        "actualCost": 151
      },
      {
        "month": "Snapshot -9M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 688,
        "actualCost": 209
      },
      {
        "month": "Snapshot -6M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 875,
        "actualCost": 266
      },
      {
        "month": "Snapshot -3M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 1062,
        "actualCost": 324
      },
      {
        "month": "Current Snapshot",
        "planned": 10,
        "actual": 5,
        "plannedCost": 1250,
        "actualCost": 360
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N22000101",
          "label": "Kishanganj Jalalgarh, Nl, Ne...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-49",
          "label": "NORTH EAST FRONTIER RAILW",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-N22000101",
          "target": "AGENCY-49",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Project trajectory monitoring escalation: physical progress verification audit recommended based on observed dynamics.",
    "multiHorizonRisk": {
      "3m": 92.3,
      "6m": 6.6,
      "12m": 17.0,
      "15m": 15.9,
      "18m": 20.8
    },
    "multiHorizonDelay": {
      "3m": 0.7,
      "6m": 1.5,
      "12m": 7.7,
      "15m": 13.8,
      "18m": 17.0
    },
    "multiHorizonCostInc": {
      "3m": 8.73,
      "6m": 0.02,
      "12m": 0.37,
      "15m": 0.32,
      "18m": 0.52
    }
  },
  {
    "id": "OCMS-060100092",
    "rawId": "060100092",
    "name": "Kulda Ocp (Mahanadi Coalfields Ltd)",
    "shortName": "Kulda Ocp",
    "state": "Odisha",
    "district": "Odisha Regional Corridor",
    "region": "Eastern",
    "ministry": "Ministry of Coal",
    "department": "Coal India Limited (CIL)",
    "sector": "Coal & Mining",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 303,
    "approvedCost": 303,
    "currentCost": 303,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2026-12-31",
    "timeDelayMonths": 120,
    "status": "Delayed",
    "progressPercent": 92,
    "riskLevel": "Medium",
    "riskScore": 35.0,
    "riskBreakdown": {
      "costOverrunRisk": 6,
      "timeDelayRisk": 34,
      "progressRisk": 28,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Required Progress Per 30D",
        "impact": 1.8,
        "category": "Execution Pace",
        "description": "Model attribution +0.178 associated with prediction runway.",
        "featureValue": 240.0
      },
      {
        "factor": "Catchup Pressure",
        "impact": 1.8,
        "category": "Execution Pace",
        "description": "Model attribution +0.177 associated with prediction runway.",
        "featureValue": 240.0
      },
      {
        "factor": "Prev Physical Progress",
        "impact": 1.4,
        "category": "Execution Pace",
        "description": "Model attribution +0.140 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Snapshot Gap Days",
        "impact": 1.4,
        "category": "Timeline",
        "description": "Model attribution +0.138 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Schedule Slip Current Months",
        "impact": 1.0,
        "category": "Timeline",
        "description": "Model attribution +0.101 associated with prediction runway.",
        "featureValue": 120.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 67,
        "actual": 62,
        "plannedCost": 121,
        "actualCost": 127
      },
      {
        "month": "Snapshot -9M",
        "planned": 74,
        "actual": 70,
        "plannedCost": 167,
        "actualCost": 176
      },
      {
        "month": "Snapshot -6M",
        "planned": 80,
        "actual": 77,
        "plannedCost": 212,
        "actualCost": 224
      },
      {
        "month": "Snapshot -3M",
        "planned": 87,
        "actual": 85,
        "plannedCost": 258,
        "actualCost": 273
      },
      {
        "month": "Current Snapshot",
        "planned": 97,
        "actual": 92,
        "plannedCost": 303,
        "actualCost": 303
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-060100092",
          "label": "Kulda Ocp (Mahanadi Coalfiel...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-50",
          "label": "MAHANADI COAL FIELDS LIMI",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-060100092",
          "target": "AGENCY-50",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Project trajectory monitoring escalation: physical progress verification audit recommended based on observed dynamics.",
    "multiHorizonRisk": {
      "3m": 35.0,
      "6m": 44.9,
      "12m": 66.0,
      "15m": 79.7,
      "18m": 76.8
    },
    "multiHorizonDelay": {
      "3m": 0.8,
      "6m": 3.5,
      "12m": 6.0,
      "15m": 11.2,
      "18m": 16.5
    },
    "multiHorizonCostInc": {
      "3m": 0.04,
      "6m": 0.1,
      "12m": 0.94,
      "15m": 0.44,
      "18m": 0.18
    }
  },
  {
    "id": "OCMS-180100221",
    "rawId": "180100221",
    "name": "Subansiri Lower He Project [2000 Mw]",
    "shortName": "Subansiri Lower He Project [2000 Mw",
    "state": "Multi-States (Arunachal Pradesh",
    "district": "Multi-States (Arunachal Pradesh Regional Corridor",
    "region": "National",
    "ministry": "Ministry of Power",
    "department": "Central Electricity Authority / CPSUs",
    "sector": "Power & Transmission",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 6285,
    "approvedCost": 6285,
    "currentCost": 6285,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 98,
    "riskLevel": "Medium",
    "riskScore": 58.5,
    "riskBreakdown": {
      "costOverrunRisk": 22,
      "timeDelayRisk": 50,
      "progressRisk": 47,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Days To Forecast Completion",
        "impact": 6.2,
        "category": "Timeline",
        "description": "Model attribution +0.618 associated with prediction runway.",
        "featureValue": 31.0
      },
      {
        "factor": "Anticipated Cost (Missing Reporting)",
        "impact": 3.8,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.377 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 1.8,
        "category": "Execution Pace",
        "description": "Model attribution +0.185 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Project Age Months",
        "impact": 1.6,
        "category": "Project Feature",
        "description": "Model attribution +0.157 associated with prediction runway.",
        "featureValue": 270.0
      },
      {
        "factor": "Expenditure Acceleration Per 30D",
        "impact": 1.3,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.131 associated with prediction runway.",
        "featureValue": -115.47
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 73,
        "actual": 68,
        "plannedCost": 2514,
        "actualCost": 2640
      },
      {
        "month": "Snapshot -9M",
        "planned": 80,
        "actual": 76,
        "plannedCost": 3457,
        "actualCost": 3645
      },
      {
        "month": "Snapshot -6M",
        "planned": 86,
        "actual": 83,
        "plannedCost": 4400,
        "actualCost": 4651
      },
      {
        "month": "Snapshot -3M",
        "planned": 93,
        "actual": 91,
        "plannedCost": 5343,
        "actualCost": 5657
      },
      {
        "month": "Current Snapshot",
        "planned": 100,
        "actual": 98,
        "plannedCost": 6285,
        "actualCost": 6285
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-180100221",
          "label": "Subansiri Lower He Project [...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-51",
          "label": "National Hydroelectric Po",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-180100221",
          "target": "AGENCY-51",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Project trajectory monitoring escalation: physical progress verification audit recommended based on observed dynamics.",
    "multiHorizonRisk": {
      "3m": 58.5,
      "6m": 83.0,
      "12m": 70.7,
      "15m": 62.8,
      "18m": 82.5
    },
    "multiHorizonDelay": {
      "3m": 1.9,
      "6m": 2.7,
      "12m": 2.8,
      "15m": 4.1,
      "18m": 3.9
    },
    "multiHorizonCostInc": {
      "3m": 0.6,
      "6m": 1.17,
      "12m": 3.26,
      "15m": 0.79,
      "18m": 3.05
    }
  },
  {
    "id": "OCMS-220100118",
    "rawId": "220100118",
    "name": "Amravati-Narkher Nl(Cr)",
    "shortName": "Amravati-Narkher Nl",
    "state": "Maharashtra",
    "district": "Maharashtra Regional Corridor",
    "region": "Western",
    "ministry": "Ministry of Heavy Industries",
    "department": "Department of Heavy Industry",
    "sector": "Industrial Infrastructure",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 663,
    "approvedCost": 663,
    "currentCost": 859,
    "costOverrunCr": 196,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2026-12-31",
    "timeDelayMonths": 240,
    "status": "Delayed",
    "progressPercent": 95,
    "riskLevel": "Medium",
    "riskScore": 44.5,
    "riskBreakdown": {
      "costOverrunRisk": 3,
      "timeDelayRisk": 48,
      "progressRisk": 36,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Days To Forecast Completion",
        "impact": 6.0,
        "category": "Timeline",
        "description": "Model attribution +0.599 associated with prediction runway.",
        "featureValue": -29.0
      },
      {
        "factor": "Forecast Vs Revised Completion Days",
        "impact": 2.8,
        "category": "Timeline",
        "description": "Model attribution +0.278 associated with prediction runway.",
        "featureValue": -183.0
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 1.5,
        "category": "Execution Pace",
        "description": "Model attribution +0.149 associated with prediction runway.",
        "featureValue": 150.0
      },
      {
        "factor": "Snapshot Gap Days",
        "impact": 1.1,
        "category": "Timeline",
        "description": "Model attribution +0.111 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Expenditure Per Progress Pct",
        "impact": 0.9,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.092 associated with prediction runway.",
        "featureValue": 0.15
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 70,
        "actual": 65,
        "plannedCost": 265,
        "actualCost": 361
      },
      {
        "month": "Snapshot -9M",
        "planned": 77,
        "actual": 73,
        "plannedCost": 365,
        "actualCost": 498
      },
      {
        "month": "Snapshot -6M",
        "planned": 83,
        "actual": 80,
        "plannedCost": 464,
        "actualCost": 636
      },
      {
        "month": "Snapshot -3M",
        "planned": 90,
        "actual": 88,
        "plannedCost": 564,
        "actualCost": 773
      },
      {
        "month": "Current Snapshot",
        "planned": 100,
        "actual": 95,
        "plannedCost": 663,
        "actualCost": 859
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100118",
          "label": "Amravati-Narkher Nl(Cr)...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-52",
          "label": "1",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100118",
          "target": "AGENCY-52",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Project trajectory monitoring escalation: physical progress verification audit recommended based on observed dynamics.",
    "multiHorizonRisk": {
      "3m": 44.5,
      "6m": 63.3,
      "12m": 60.1,
      "15m": 67.7,
      "18m": 69.8
    },
    "multiHorizonDelay": {
      "3m": 1.3,
      "6m": 4.7,
      "12m": 7.4,
      "15m": 22.8,
      "18m": 13.9
    },
    "multiHorizonCostInc": {
      "3m": 0.01,
      "6m": 0.1,
      "12m": 0.24,
      "15m": 0.94,
      "18m": 1.04
    }
  },
  {
    "id": "OCMS-220100247",
    "rawId": "220100247",
    "name": "Katihar - Jogbani (Gc)(Nefr)",
    "shortName": "Katihar - Jogbani",
    "state": "Bihar",
    "district": "Bihar Regional Corridor",
    "region": "Eastern",
    "ministry": "Ministry of Heavy Industries",
    "department": "Department of Heavy Industry",
    "sector": "Industrial Infrastructure",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 792,
    "approvedCost": 792,
    "currentCost": 1320,
    "costOverrunCr": 528,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2026-12-31",
    "timeDelayMonths": 102,
    "status": "Delayed",
    "progressPercent": 17,
    "riskLevel": "Medium",
    "riskScore": 35.3,
    "riskBreakdown": {
      "costOverrunRisk": 5,
      "timeDelayRisk": 22,
      "progressRisk": 28,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Days To Forecast Completion",
        "impact": 6.4,
        "category": "Timeline",
        "description": "Model attribution +0.642 associated with prediction runway.",
        "featureValue": -29.0
      },
      {
        "factor": "Project Age Months",
        "impact": 1.6,
        "category": "Project Feature",
        "description": "Model attribution +0.159 associated with prediction runway.",
        "featureValue": 213.0
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 1.4,
        "category": "Execution Pace",
        "description": "Model attribution +0.141 associated with prediction runway.",
        "featureValue": 2478.3
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 1.2,
        "category": "Execution Pace",
        "description": "Model attribution +0.123 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Schedule Slip Current Months",
        "impact": 1.0,
        "category": "Timeline",
        "description": "Model attribution +0.096 associated with prediction runway.",
        "featureValue": 102.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 317,
        "actualCost": 554
      },
      {
        "month": "Snapshot -9M",
        "planned": 0,
        "actual": 0,
        "plannedCost": 436,
        "actualCost": 766
      },
      {
        "month": "Snapshot -6M",
        "planned": 5,
        "actual": 2,
        "plannedCost": 555,
        "actualCost": 977
      },
      {
        "month": "Snapshot -3M",
        "planned": 12,
        "actual": 10,
        "plannedCost": 674,
        "actualCost": 1188
      },
      {
        "month": "Current Snapshot",
        "planned": 22,
        "actual": 17,
        "plannedCost": 792,
        "actualCost": 1320
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100247",
          "label": "Katihar - Jogbani (Gc)(Nefr)...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-53",
          "label": "133",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100247",
          "target": "AGENCY-53",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Project trajectory monitoring escalation: physical progress verification audit recommended based on observed dynamics.",
    "multiHorizonRisk": {
      "3m": 35.3,
      "6m": 35.5,
      "12m": 41.0,
      "15m": 39.0,
      "18m": 55.9
    },
    "multiHorizonDelay": {
      "3m": 0.4,
      "6m": 0.7,
      "12m": 1.6,
      "15m": 6.4,
      "18m": 12.9
    },
    "multiHorizonCostInc": {
      "3m": 0.02,
      "6m": 0.04,
      "12m": 0.29,
      "15m": 0.27,
      "18m": 0.74
    }
  },
  {
    "id": "OCMS-220100257",
    "rawId": "220100257",
    "name": "Khagaria-Kusheshwar Asthan [42Km] New Line Project",
    "shortName": "Khagaria-Kusheshwar Asthan [42Km] N",
    "state": "Bihar",
    "district": "Bihar Regional Corridor",
    "region": "Eastern",
    "ministry": "Ministry of Railways",
    "department": "Railway Board & Zonal Railways",
    "sector": "Railways & DFC",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 614,
    "approvedCost": 614,
    "currentCost": 614,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 56,
    "riskLevel": "Medium",
    "riskScore": 36.4,
    "riskBreakdown": {
      "costOverrunRisk": 6,
      "timeDelayRisk": 19,
      "progressRisk": 29,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Anticipated Cost (Missing Reporting)",
        "impact": 4.1,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.408 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 2.3,
        "category": "Execution Pace",
        "description": "Model attribution +0.226 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Project Age Months",
        "impact": 1.9,
        "category": "Project Feature",
        "description": "Model attribution +0.193 associated with prediction runway.",
        "featureValue": 83.0
      },
      {
        "factor": "Schedule Slip Current Months",
        "impact": 0.7,
        "category": "Timeline",
        "description": "Model attribution +0.074 associated with prediction runway.",
        "featureValue": 27.0
      },
      {
        "factor": "Prev Forecast Cost",
        "impact": 0.7,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.068 associated with prediction runway.",
        "featureValue": 1384.16
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 31,
        "actual": 26,
        "plannedCost": 246,
        "actualCost": 258
      },
      {
        "month": "Snapshot -9M",
        "planned": 38,
        "actual": 34,
        "plannedCost": 338,
        "actualCost": 356
      },
      {
        "month": "Snapshot -6M",
        "planned": 44,
        "actual": 41,
        "plannedCost": 430,
        "actualCost": 454
      },
      {
        "month": "Snapshot -3M",
        "planned": 51,
        "actual": 49,
        "plannedCost": 522,
        "actualCost": 553
      },
      {
        "month": "Current Snapshot",
        "planned": 61,
        "actual": 56,
        "plannedCost": 614,
        "actualCost": 614
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100257",
          "label": "Khagaria-Kusheshwar Asthan [...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-54",
          "label": "East Central Railway [ECR",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100257",
          "target": "AGENCY-54",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Financial audit on item-rate escalation; strict expenditure milestone oversight.",
    "multiHorizonRisk": {
      "3m": 36.4,
      "6m": 44.6,
      "12m": 73.6,
      "15m": 85.4,
      "18m": 86.1
    },
    "multiHorizonDelay": {
      "3m": 0.3,
      "6m": 1.5,
      "12m": 4.5,
      "15m": 9.3,
      "18m": 11.4
    },
    "multiHorizonCostInc": {
      "3m": 0.12,
      "6m": 0.17,
      "12m": 1.37,
      "15m": 0.17,
      "18m": 0.52
    }
  },
  {
    "id": "OCMS-220100303",
    "rawId": "220100303",
    "name": "Hajipur-Sagauli New Line",
    "shortName": "Hajipur-Sagauli New Line",
    "state": "Bihar",
    "district": "Bihar Regional Corridor",
    "region": "Eastern",
    "ministry": "Ministry of Railways",
    "department": "Railway Board & Zonal Railways",
    "sector": "Railways & DFC",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 2067,
    "approvedCost": 2067,
    "currentCost": 2067,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 75,
    "riskLevel": "Medium",
    "riskScore": 42.1,
    "riskBreakdown": {
      "costOverrunRisk": 21,
      "timeDelayRisk": 26,
      "progressRisk": 34,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Anticipated Cost (Missing Reporting)",
        "impact": 4.2,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.423 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Project Age Months",
        "impact": 2.8,
        "category": "Project Feature",
        "description": "Model attribution +0.281 associated with prediction runway.",
        "featureValue": 221.0
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 2.0,
        "category": "Execution Pace",
        "description": "Model attribution +0.203 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Expenditure Ratio Forecast",
        "impact": 1.2,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.124 associated with prediction runway.",
        "featureValue": 0.98
      },
      {
        "factor": "Cumulative Expenditure",
        "impact": 0.8,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.083 associated with prediction runway.",
        "featureValue": 2043.33
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 50,
        "actual": 45,
        "plannedCost": 827,
        "actualCost": 868
      },
      {
        "month": "Snapshot -9M",
        "planned": 57,
        "actual": 53,
        "plannedCost": 1137,
        "actualCost": 1199
      },
      {
        "month": "Snapshot -6M",
        "planned": 63,
        "actual": 60,
        "plannedCost": 1447,
        "actualCost": 1530
      },
      {
        "month": "Snapshot -3M",
        "planned": 70,
        "actual": 68,
        "plannedCost": 1757,
        "actualCost": 1860
      },
      {
        "month": "Current Snapshot",
        "planned": 80,
        "actual": 75,
        "plannedCost": 2067,
        "actualCost": 2067
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100303",
          "label": "Hajipur-Sagauli New Line...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-55",
          "label": "East Central Railway [ECR",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100303",
          "target": "AGENCY-55",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Financial audit on item-rate escalation; strict expenditure milestone oversight.",
    "multiHorizonRisk": {
      "3m": 42.1,
      "6m": 62.8,
      "12m": 81.6,
      "15m": 82.9,
      "18m": 86.7
    },
    "multiHorizonDelay": {
      "3m": 0.2,
      "6m": 1.7,
      "12m": 6.6,
      "15m": 8.4,
      "18m": 8.6
    },
    "multiHorizonCostInc": {
      "3m": 0.45,
      "6m": 1.13,
      "12m": 2.12,
      "15m": 1.22,
      "18m": 2.16
    }
  },
  {
    "id": "OCMS-220100305",
    "rawId": "220100305",
    "name": "Koderma-Tilaiya New Line",
    "shortName": "Koderma-Tilaiya New Line",
    "state": "Multi-States (Bihar",
    "district": "Multi-States (Bihar Regional Corridor",
    "region": "National",
    "ministry": "Ministry of Railways",
    "department": "Railway Board & Zonal Railways",
    "sector": "Railways & DFC",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 1626,
    "approvedCost": 1626,
    "currentCost": 1626,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 95,
    "riskLevel": "Medium",
    "riskScore": 55.7,
    "riskBreakdown": {
      "costOverrunRisk": 14,
      "timeDelayRisk": 52,
      "progressRisk": 45,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Anticipated Cost (Missing Reporting)",
        "impact": 4.3,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.435 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 2.0,
        "category": "Execution Pace",
        "description": "Model attribution +0.197 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Prev Physical Progress",
        "impact": 1.7,
        "category": "Execution Pace",
        "description": "Model attribution +0.167 associated with prediction runway.",
        "featureValue": 95.0
      },
      {
        "factor": "Catchup Pressure",
        "impact": 1.6,
        "category": "Execution Pace",
        "description": "Model attribution +0.161 associated with prediction runway.",
        "featureValue": 137.61
      },
      {
        "factor": "Project Age Months",
        "impact": 1.4,
        "category": "Project Feature",
        "description": "Model attribution +0.140 associated with prediction runway.",
        "featureValue": 256.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 70,
        "actual": 65,
        "plannedCost": 650,
        "actualCost": 683
      },
      {
        "month": "Snapshot -9M",
        "planned": 77,
        "actual": 73,
        "plannedCost": 894,
        "actualCost": 943
      },
      {
        "month": "Snapshot -6M",
        "planned": 83,
        "actual": 80,
        "plannedCost": 1138,
        "actualCost": 1203
      },
      {
        "month": "Snapshot -3M",
        "planned": 90,
        "actual": 88,
        "plannedCost": 1382,
        "actualCost": 1463
      },
      {
        "month": "Current Snapshot",
        "planned": 100,
        "actual": 95,
        "plannedCost": 1626,
        "actualCost": 1626
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-220100305",
          "label": "Koderma-Tilaiya New Line...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-56",
          "label": "East Central Railway [ECR",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-220100305",
          "target": "AGENCY-56",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Financial audit on item-rate escalation; strict expenditure milestone oversight.",
    "multiHorizonRisk": {
      "3m": 55.7,
      "6m": 80.4,
      "12m": 75.8,
      "15m": 77.5,
      "18m": 74.4
    },
    "multiHorizonDelay": {
      "3m": 1.4,
      "6m": 5.8,
      "12m": 8.8,
      "15m": 8.4,
      "18m": 9.3
    },
    "multiHorizonCostInc": {
      "3m": 0.09,
      "6m": 0.42,
      "12m": 2.95,
      "15m": 0.5,
      "18m": 1.17
    }
  },
  {
    "id": "OCMS-N04000083",
    "rawId": "N04000083",
    "name": "Guwahati Airport New Integrated Terminal Building Construction Project",
    "shortName": "Guwahati Airport New Integrated Ter",
    "state": "Assam",
    "district": "Assam Regional Corridor",
    "region": "North-Eastern",
    "ministry": "Ministry of Ports, Shipping and Waterways",
    "department": "Major Port Authorities",
    "sector": "Ports & Shipping",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 1712,
    "approvedCost": 1712,
    "currentCost": 1712,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 97,
    "riskLevel": "Medium",
    "riskScore": 40.8,
    "riskBreakdown": {
      "costOverrunRisk": 29,
      "timeDelayRisk": 22,
      "progressRisk": 33,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Days To Forecast Completion",
        "impact": 5.8,
        "category": "Timeline",
        "description": "Model attribution +0.583 associated with prediction runway.",
        "featureValue": 62.0
      },
      {
        "factor": "Anticipated Cost (Missing Reporting)",
        "impact": 3.9,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.387 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 1.8,
        "category": "Execution Pace",
        "description": "Model attribution +0.185 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Project Age Months",
        "impact": 1.6,
        "category": "Project Feature",
        "description": "Model attribution +0.165 associated with prediction runway.",
        "featureValue": 111.0
      },
      {
        "factor": "Expenditure Acceleration Per 30D",
        "impact": 1.0,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.099 associated with prediction runway.",
        "featureValue": -25.16
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 72,
        "actual": 67,
        "plannedCost": 685,
        "actualCost": 719
      },
      {
        "month": "Snapshot -9M",
        "planned": 79,
        "actual": 75,
        "plannedCost": 942,
        "actualCost": 993
      },
      {
        "month": "Snapshot -6M",
        "planned": 85,
        "actual": 82,
        "plannedCost": 1198,
        "actualCost": 1267
      },
      {
        "month": "Snapshot -3M",
        "planned": 92,
        "actual": 90,
        "plannedCost": 1455,
        "actualCost": 1541
      },
      {
        "month": "Current Snapshot",
        "planned": 100,
        "actual": 97,
        "plannedCost": 1712,
        "actualCost": 1712
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N04000083",
          "label": "Guwahati Airport New Integra...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-57",
          "label": "Adani Airport Holdings Li",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-N04000083",
          "target": "AGENCY-57",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Project trajectory monitoring escalation: physical progress verification audit recommended based on observed dynamics.",
    "multiHorizonRisk": {
      "3m": 40.8,
      "6m": 77.5,
      "12m": 74.5,
      "15m": 73.8,
      "18m": 76.8
    },
    "multiHorizonDelay": {
      "3m": 1.5,
      "6m": 3.0,
      "12m": 4.2,
      "15m": 4.3,
      "18m": 3.7
    },
    "multiHorizonCostInc": {
      "3m": 0.49,
      "6m": 0.43,
      "12m": 2.18,
      "15m": 2.13,
      "18m": 2.19
    }
  },
  {
    "id": "OCMS-N04000091",
    "rawId": "N04000091",
    "name": "Construction Of New Integrated Terminal Building And Associated Works Including Apron To Park 3 Code E Type Of Aircraft Or 6 Code C Type Of Aircraft At Vijayawada Airport.",
    "shortName": "Construction Of New Integrated Term",
    "state": "Andhra Pradesh",
    "district": "Andhra Pradesh Regional Corridor",
    "region": "Southern",
    "ministry": "Ministry of Ports, Shipping and Waterways",
    "department": "Major Port Authorities",
    "sector": "Ports & Shipping",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 612,
    "approvedCost": 612,
    "currentCost": 612,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 87,
    "riskLevel": "Medium",
    "riskScore": 48.2,
    "riskBreakdown": {
      "costOverrunRisk": 5,
      "timeDelayRisk": 29,
      "progressRisk": 39,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Days To Forecast Completion",
        "impact": 6.3,
        "category": "Timeline",
        "description": "Model attribution +0.629 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Anticipated Cost (Missing Reporting)",
        "impact": 3.7,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.371 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 2.3,
        "category": "Execution Pace",
        "description": "Model attribution +0.232 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Project Age Months",
        "impact": 1.2,
        "category": "Project Feature",
        "description": "Model attribution +0.124 associated with prediction runway.",
        "featureValue": 69.0
      },
      {
        "factor": "Prev Physical Progress",
        "impact": 1.1,
        "category": "Execution Pace",
        "description": "Model attribution +0.115 associated with prediction runway.",
        "featureValue": 87.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 62,
        "actual": 57,
        "plannedCost": 245,
        "actualCost": 257
      },
      {
        "month": "Snapshot -9M",
        "planned": 69,
        "actual": 65,
        "plannedCost": 336,
        "actualCost": 355
      },
      {
        "month": "Snapshot -6M",
        "planned": 75,
        "actual": 72,
        "plannedCost": 428,
        "actualCost": 453
      },
      {
        "month": "Snapshot -3M",
        "planned": 82,
        "actual": 80,
        "plannedCost": 520,
        "actualCost": 551
      },
      {
        "month": "Current Snapshot",
        "planned": 92,
        "actual": 87,
        "plannedCost": 612,
        "actualCost": 612
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N04000091",
          "label": "Construction Of New Integrat...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-58",
          "label": "Airport Authority of Indi",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-N04000091",
          "target": "AGENCY-58",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Project trajectory monitoring escalation: physical progress verification audit recommended based on observed dynamics.",
    "multiHorizonRisk": {
      "3m": 48.2,
      "6m": 54.4,
      "12m": 76.1,
      "15m": 78.8,
      "18m": 72.0
    },
    "multiHorizonDelay": {
      "3m": 0.9,
      "6m": 2.4,
      "12m": 6.4,
      "15m": 8.9,
      "18m": 9.0
    },
    "multiHorizonCostInc": {
      "3m": 0.04,
      "6m": 0.13,
      "12m": 1.35,
      "15m": 0.54,
      "18m": 0.96
    }
  },
  {
    "id": "OCMS-N04000101",
    "rawId": "N04000101",
    "name": "Construction Of New Passenger Terminal Building For Domestic Operations At Jodhpur Airport.",
    "shortName": "Construction Of New Passenger Termi",
    "state": "Rajasthan",
    "district": "Rajasthan Regional Corridor",
    "region": "Northern",
    "ministry": "Ministry of Ports, Shipping and Waterways",
    "department": "Major Port Authorities",
    "sector": "Ports & Shipping",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 480,
    "approvedCost": 480,
    "currentCost": 480,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 97,
    "riskLevel": "Medium",
    "riskScore": 54.9,
    "riskBreakdown": {
      "costOverrunRisk": 2,
      "timeDelayRisk": 56,
      "progressRisk": 44,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Days To Forecast Completion",
        "impact": 6.5,
        "category": "Timeline",
        "description": "Model attribution +0.654 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Anticipated Cost (Missing Reporting)",
        "impact": 3.1,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.313 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 1.7,
        "category": "Execution Pace",
        "description": "Model attribution +0.165 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Catchup Pressure",
        "impact": 1.5,
        "category": "Execution Pace",
        "description": "Model attribution +0.153 associated with prediction runway.",
        "featureValue": 77.23
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 1.4,
        "category": "Execution Pace",
        "description": "Model attribution +0.138 associated with prediction runway.",
        "featureValue": 79.5
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 72,
        "actual": 67,
        "plannedCost": 192,
        "actualCost": 202
      },
      {
        "month": "Snapshot -9M",
        "planned": 79,
        "actual": 75,
        "plannedCost": 264,
        "actualCost": 278
      },
      {
        "month": "Snapshot -6M",
        "planned": 85,
        "actual": 82,
        "plannedCost": 336,
        "actualCost": 355
      },
      {
        "month": "Snapshot -3M",
        "planned": 92,
        "actual": 90,
        "plannedCost": 408,
        "actualCost": 432
      },
      {
        "month": "Current Snapshot",
        "planned": 100,
        "actual": 97,
        "plannedCost": 480,
        "actualCost": 480
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N04000101",
          "label": "Construction Of New Passenge...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-59",
          "label": "Airport Authority of Indi",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-N04000101",
          "target": "AGENCY-59",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Project trajectory monitoring escalation: physical progress verification audit recommended based on observed dynamics.",
    "multiHorizonRisk": {
      "3m": 54.9,
      "6m": 66.3,
      "12m": 72.4,
      "15m": 78.4,
      "18m": 58.1
    },
    "multiHorizonDelay": {
      "3m": 2.0,
      "6m": 2.6,
      "12m": 5.1,
      "15m": 8.1,
      "18m": 5.4
    },
    "multiHorizonCostInc": {
      "3m": 0.08,
      "6m": 0.08,
      "12m": 1.24,
      "15m": 0.06,
      "18m": 0.28
    }
  },
  {
    "id": "OCMS-N04000105",
    "rawId": "N04000105",
    "name": "Construction Of New Domestic Terminal Building And Miscellaneous Works At Belagavi Airport.",
    "shortName": "Construction Of New Domestic Termin",
    "state": "Karnataka",
    "district": "Karnataka Regional Corridor",
    "region": "Southern",
    "ministry": "Ministry of Ports, Shipping and Waterways",
    "department": "Major Port Authorities",
    "sector": "Ports & Shipping",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 322,
    "approvedCost": 322,
    "currentCost": 322,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 82,
    "riskLevel": "Medium",
    "riskScore": 41.3,
    "riskBreakdown": {
      "costOverrunRisk": 1,
      "timeDelayRisk": 38,
      "progressRisk": 33,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Days To Forecast Completion",
        "impact": 6.9,
        "category": "Timeline",
        "description": "Model attribution +0.694 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Anticipated Cost (Missing Reporting)",
        "impact": 2.6,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.263 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Catchup Pressure",
        "impact": 2.0,
        "category": "Execution Pace",
        "description": "Model attribution +0.197 associated with prediction runway.",
        "featureValue": 536.13
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 1.7,
        "category": "Execution Pace",
        "description": "Model attribution +0.172 associated with prediction runway.",
        "featureValue": 540.0
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 1.5,
        "category": "Execution Pace",
        "description": "Model attribution +0.148 associated with prediction runway.",
        "featureValue": 0.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 57,
        "actual": 52,
        "plannedCost": 129,
        "actualCost": 135
      },
      {
        "month": "Snapshot -9M",
        "planned": 64,
        "actual": 60,
        "plannedCost": 177,
        "actualCost": 187
      },
      {
        "month": "Snapshot -6M",
        "planned": 70,
        "actual": 67,
        "plannedCost": 226,
        "actualCost": 239
      },
      {
        "month": "Snapshot -3M",
        "planned": 77,
        "actual": 75,
        "plannedCost": 274,
        "actualCost": 290
      },
      {
        "month": "Current Snapshot",
        "planned": 87,
        "actual": 82,
        "plannedCost": 322,
        "actualCost": 322
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N04000105",
          "label": "Construction Of New Domestic...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-60",
          "label": "Airport Authority of Indi",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-N04000105",
          "target": "AGENCY-60",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Project trajectory monitoring escalation: physical progress verification audit recommended based on observed dynamics.",
    "multiHorizonRisk": {
      "3m": 41.3,
      "6m": 54.1,
      "12m": 65.6,
      "15m": 55.1,
      "18m": 38.1
    },
    "multiHorizonDelay": {
      "3m": 2.2,
      "6m": 2.1,
      "12m": 5.4,
      "15m": 6.0,
      "18m": 4.3
    },
    "multiHorizonCostInc": {
      "3m": 0.02,
      "6m": 0.02,
      "12m": 1.2,
      "15m": 0.04,
      "18m": 0.07
    }
  },
  {
    "id": "OCMS-N04000110",
    "rawId": "N04000110",
    "name": "Modernization Of Chennai Airport, Phase Ii, Part 2",
    "shortName": "Modernization Of Chennai Airport, P",
    "state": "Tamil Nadu",
    "district": "Tamil Nadu Regional Corridor",
    "region": "Southern",
    "ministry": "Ministry of Ports, Shipping and Waterways",
    "department": "Major Port Authorities",
    "sector": "Ports & Shipping",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 1207,
    "approvedCost": 1207,
    "currentCost": 1207,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 35,
    "riskLevel": "Medium",
    "riskScore": 39.5,
    "riskBreakdown": {
      "costOverrunRisk": 6,
      "timeDelayRisk": 20,
      "progressRisk": 32,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Anticipated Cost (Missing Reporting)",
        "impact": 4.0,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.405 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Project Age Months",
        "impact": 2.4,
        "category": "Project Feature",
        "description": "Model attribution +0.236 associated with prediction runway.",
        "featureValue": 94.0
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 2.2,
        "category": "Execution Pace",
        "description": "Model attribution +0.223 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Expenditure Acceleration Per 30D",
        "impact": 0.9,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.094 associated with prediction runway.",
        "featureValue": -3.98
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 0.7,
        "category": "Execution Pace",
        "description": "Model attribution +0.073 associated with prediction runway.",
        "featureValue": 7.96
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 10,
        "actual": 5,
        "plannedCost": 483,
        "actualCost": 507
      },
      {
        "month": "Snapshot -9M",
        "planned": 17,
        "actual": 13,
        "plannedCost": 664,
        "actualCost": 700
      },
      {
        "month": "Snapshot -6M",
        "planned": 23,
        "actual": 20,
        "plannedCost": 845,
        "actualCost": 893
      },
      {
        "month": "Snapshot -3M",
        "planned": 30,
        "actual": 28,
        "plannedCost": 1026,
        "actualCost": 1086
      },
      {
        "month": "Current Snapshot",
        "planned": 40,
        "actual": 35,
        "plannedCost": 1207,
        "actualCost": 1207
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N04000110",
          "label": "Modernization Of Chennai Air...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-61",
          "label": "Airport Authority of Indi",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-N04000110",
          "target": "AGENCY-61",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Financial audit on item-rate escalation; strict expenditure milestone oversight.",
    "multiHorizonRisk": {
      "3m": 39.5,
      "6m": 48.9,
      "12m": 81.6,
      "15m": 86.6,
      "18m": 84.5
    },
    "multiHorizonDelay": {
      "3m": 0.3,
      "6m": 1.7,
      "12m": 6.5,
      "15m": 11.5,
      "18m": 11.2
    },
    "multiHorizonCostInc": {
      "3m": 0.12,
      "6m": 0.24,
      "12m": 1.6,
      "15m": 0.48,
      "18m": 0.55
    }
  },
  {
    "id": "OCMS-N04000112",
    "rawId": "N04000112",
    "name": "Development Of New Civil Enclave And Associated Works At Darbhanga Airport",
    "shortName": "Development Of New Civil Enclave An",
    "state": "Bihar",
    "district": "Bihar Regional Corridor",
    "region": "Eastern",
    "ministry": "Ministry of Ports, Shipping and Waterways",
    "department": "Major Port Authorities",
    "sector": "Ports & Shipping",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 912,
    "approvedCost": 912,
    "currentCost": 912,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2025-12-31",
    "timeDelayMonths": 0,
    "status": "Ongoing",
    "progressPercent": 61,
    "riskLevel": "Medium",
    "riskScore": 36.7,
    "riskBreakdown": {
      "costOverrunRisk": 2,
      "timeDelayRisk": 31,
      "progressRisk": 29,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Days To Forecast Completion",
        "impact": 5.9,
        "category": "Timeline",
        "description": "Model attribution +0.588 associated with prediction runway.",
        "featureValue": 92.0
      },
      {
        "factor": "Anticipated Cost (Missing Reporting)",
        "impact": 2.4,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.236 associated with prediction runway.",
        "featureValue": 1.0
      },
      {
        "factor": "Physical Progress (Missing Reporting)",
        "impact": 1.8,
        "category": "Execution Pace",
        "description": "Model attribution +0.178 associated with prediction runway.",
        "featureValue": 0.0
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 1.4,
        "category": "Execution Pace",
        "description": "Model attribution +0.136 associated with prediction runway.",
        "featureValue": 12.72
      },
      {
        "factor": "Prev Physical Progress",
        "impact": 1.1,
        "category": "Execution Pace",
        "description": "Model attribution +0.112 associated with prediction runway.",
        "featureValue": 57.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 36,
        "actual": 31,
        "plannedCost": 365,
        "actualCost": 383
      },
      {
        "month": "Snapshot -9M",
        "planned": 43,
        "actual": 39,
        "plannedCost": 501,
        "actualCost": 529
      },
      {
        "month": "Snapshot -6M",
        "planned": 49,
        "actual": 46,
        "plannedCost": 638,
        "actualCost": 675
      },
      {
        "month": "Snapshot -3M",
        "planned": 56,
        "actual": 54,
        "plannedCost": 775,
        "actualCost": 820
      },
      {
        "month": "Current Snapshot",
        "planned": 66,
        "actual": 61,
        "plannedCost": 912,
        "actualCost": 912
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N04000112",
          "label": "Development Of New Civil Enc...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-62",
          "label": "Airport Authority of Indi",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-N04000112",
          "target": "AGENCY-62",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Project trajectory monitoring escalation: physical progress verification audit recommended based on observed dynamics.",
    "multiHorizonRisk": {
      "3m": 36.7,
      "6m": 55.3,
      "12m": 71.2,
      "15m": 73.1,
      "18m": 60.4
    },
    "multiHorizonDelay": {
      "3m": 0.4,
      "6m": 3.2,
      "12m": 7.1,
      "15m": 9.4,
      "18m": 8.3
    },
    "multiHorizonCostInc": {
      "3m": 0.15,
      "6m": 0.09,
      "12m": 1.06,
      "15m": 0.02,
      "18m": 0.18
    }
  },
  {
    "id": "OCMS-N06000099",
    "rawId": "N06000099",
    "name": "Baroud Oc Expansion (Rce)- 3Mty",
    "shortName": "Baroud Oc Expansion",
    "state": "Chhatisgarh",
    "district": "Chhatisgarh Regional Corridor",
    "region": "National",
    "ministry": "Ministry of Coal",
    "department": "Coal India Limited (CIL)",
    "sector": "Coal & Mining",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 259,
    "approvedCost": 259,
    "currentCost": 259,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2026-12-31",
    "timeDelayMonths": 60,
    "status": "Delayed",
    "progressPercent": 90,
    "riskLevel": "Medium",
    "riskScore": 37.8,
    "riskBreakdown": {
      "costOverrunRisk": 1,
      "timeDelayRisk": 40,
      "progressRisk": 30,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Days To Forecast Completion",
        "impact": 7.1,
        "category": "Timeline",
        "description": "Model attribution +0.706 associated with prediction runway.",
        "featureValue": -30.0
      },
      {
        "factor": "Catchup Pressure",
        "impact": 1.7,
        "category": "Execution Pace",
        "description": "Model attribution +0.175 associated with prediction runway.",
        "featureValue": 300.0
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 1.5,
        "category": "Execution Pace",
        "description": "Model attribution +0.152 associated with prediction runway.",
        "featureValue": 300.0
      },
      {
        "factor": "Prev Physical Progress",
        "impact": 1.0,
        "category": "Execution Pace",
        "description": "Model attribution +0.100 associated with prediction runway.",
        "featureValue": 90.0
      },
      {
        "factor": "Schedule Slip Current Months",
        "impact": 0.8,
        "category": "Timeline",
        "description": "Model attribution +0.084 associated with prediction runway.",
        "featureValue": 60.0
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 65,
        "actual": 60,
        "plannedCost": 103,
        "actualCost": 109
      },
      {
        "month": "Snapshot -9M",
        "planned": 72,
        "actual": 68,
        "plannedCost": 142,
        "actualCost": 150
      },
      {
        "month": "Snapshot -6M",
        "planned": 78,
        "actual": 75,
        "plannedCost": 181,
        "actualCost": 191
      },
      {
        "month": "Snapshot -3M",
        "planned": 85,
        "actual": 83,
        "plannedCost": 220,
        "actualCost": 233
      },
      {
        "month": "Current Snapshot",
        "planned": 95,
        "actual": 90,
        "plannedCost": 259,
        "actualCost": 259
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N06000099",
          "label": "Baroud Oc Expansion (Rce)- 3...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-63",
          "label": "SOUTH-EASTERN COAL FIELDS",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-N06000099",
          "target": "AGENCY-63",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Project trajectory monitoring escalation: physical progress verification audit recommended based on observed dynamics.",
    "multiHorizonRisk": {
      "3m": 37.8,
      "6m": 62.3,
      "12m": 82.1,
      "15m": 86.3,
      "18m": 91.9
    },
    "multiHorizonDelay": {
      "3m": 2.3,
      "6m": 3.4,
      "12m": 7.9,
      "15m": 15.1,
      "18m": 15.8
    },
    "multiHorizonCostInc": {
      "3m": 0.01,
      "6m": 0.02,
      "12m": 0.62,
      "15m": 0.29,
      "18m": 0.12
    }
  },
  {
    "id": "OCMS-N06000100",
    "rawId": "N06000100",
    "name": "Rg Oc -Iii Extension (Phase -Ii) Project",
    "shortName": "Rg Oc -Iii Extension",
    "state": "Telangana",
    "district": "Telangana Regional Corridor",
    "region": "Southern",
    "ministry": "Ministry of Heavy Industries",
    "department": "Department of Heavy Industry",
    "sector": "Industrial Infrastructure",
    "category": "Centrally Monitored Capital Infrastructure",
    "estimatedCost": 365,
    "approvedCost": 365,
    "currentCost": 365,
    "costOverrunCr": 0,
    "startDate": "2020-04-01",
    "targetCompletion": "2025-12-31",
    "expectedCompletion": "2026-12-31",
    "timeDelayMonths": 57,
    "status": "Delayed",
    "progressPercent": 95,
    "riskLevel": "Medium",
    "riskScore": 36.8,
    "riskBreakdown": {
      "costOverrunRisk": 2,
      "timeDelayRisk": 34,
      "progressRisk": 29,
      "adminDependencyRisk": 30
    },
    "shapFactors": [
      {
        "factor": "Days To Forecast Completion",
        "impact": 2.0,
        "category": "Timeline",
        "description": "Model attribution +0.203 associated with prediction runway.",
        "featureValue": -121.0
      },
      {
        "factor": "Catchup Pressure",
        "impact": 1.7,
        "category": "Execution Pace",
        "description": "Model attribution +0.172 associated with prediction runway.",
        "featureValue": 145.05
      },
      {
        "factor": "Required Progress Per 30D",
        "impact": 1.5,
        "category": "Execution Pace",
        "description": "Model attribution +0.147 associated with prediction runway.",
        "featureValue": 150.0
      },
      {
        "factor": "Prev Physical Progress",
        "impact": 1.4,
        "category": "Execution Pace",
        "description": "Model attribution +0.144 associated with prediction runway.",
        "featureValue": 80.0
      },
      {
        "factor": "Expenditure Per Progress Pct",
        "impact": 1.0,
        "category": "Cost Dynamics",
        "description": "Model attribution +0.103 associated with prediction runway.",
        "featureValue": 0.02
      }
    ],
    "progressHistory": [
      {
        "month": "Snapshot -12M",
        "planned": 70,
        "actual": 65,
        "plannedCost": 146,
        "actualCost": 153
      },
      {
        "month": "Snapshot -9M",
        "planned": 77,
        "actual": 73,
        "plannedCost": 201,
        "actualCost": 212
      },
      {
        "month": "Snapshot -6M",
        "planned": 83,
        "actual": 80,
        "plannedCost": 256,
        "actualCost": 270
      },
      {
        "month": "Snapshot -3M",
        "planned": 90,
        "actual": 88,
        "plannedCost": 310,
        "actualCost": 329
      },
      {
        "month": "Current Snapshot",
        "planned": 100,
        "actual": 95,
        "plannedCost": 365,
        "actualCost": 365
      }
    ],
    "dependencyNetwork": {
      "nodes": [
        {
          "id": "PRJ-N06000100",
          "label": "Rg Oc -Iii Extension (Phase ...",
          "type": "project",
          "status": "ongoing"
        },
        {
          "id": "AGENCY-64",
          "label": "56",
          "type": "department",
          "status": "completed"
        }
      ],
      "links": [
        {
          "source": "PRJ-N06000100",
          "target": "AGENCY-64",
          "label": "Executing Agency"
        }
      ]
    },
    "documentedIssueType": "None",
    "supportingEvidence": "No direct documentary evidence was found for this factor in the available records.",
    "recommendedAction": "Project trajectory monitoring escalation: physical progress verification audit recommended based on observed dynamics.",
    "multiHorizonRisk": {
      "3m": 36.8,
      "6m": 47.6,
      "12m": 66.4,
      "15m": 79.0,
      "18m": 79.7
    },
    "multiHorizonDelay": {
      "3m": 1.0,
      "6m": 3.7,
      "12m": 10.2,
      "15m": 23.0,
      "18m": 26.1
    },
    "multiHorizonCostInc": {
      "3m": 0.02,
      "6m": 0.05,
      "12m": 0.13,
      "15m": 0.85,
      "18m": 1.58
    }
  }
];
