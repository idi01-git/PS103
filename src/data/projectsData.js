// DRISHTI - PAIMANA Intelligence Mock Data Layer

export const MINISTRIES_DATA = [
  {
    id: "morth",
    name: "Ministry of Road Transport and Highways",
    code: "MoRTH",
    icon: "Truck",
    totalProjects: 142,
    ongoing: 88,
    completed: 34,
    delayed: 20,
    highRisk: 12,
    totalCostCr: 485000,
    description: "Development of national highway network, expressways, Bharatmala Pariyojana, and strategic border roads."
  },
  {
    id: "railways",
    name: "Ministry of Railways",
    code: "MoR",
    icon: "Train",
    totalProjects: 118,
    ongoing: 64,
    completed: 32,
    delayed: 22,
    highRisk: 15,
    totalCostCr: 620000,
    description: "Dedicated Freight Corridors, Vande Bharat expansion, High Speed Rail, and station redevelopment projects."
  },
  {
    id: "power",
    name: "Ministry of Power",
    code: "MoP",
    icon: "Zap",
    totalProjects: 76,
    ongoing: 42,
    completed: 24,
    delayed: 10,
    highRisk: 6,
    totalCostCr: 310000,
    description: "Ultra mega power projects, interstate transmission lines, grid modernization, and hydro power installations."
  },
  {
    id: "mnre",
    name: "Ministry of New and Renewable Energy",
    code: "MNRE",
    icon: "Sun",
    totalProjects: 64,
    ongoing: 45,
    completed: 14,
    delayed: 5,
    highRisk: 4,
    totalCostCr: 195000,
    description: "Solar Ultra Mega Parks, Green Hydrogen Mission, offshore wind corridors, and PM-KUSUM infrastructure."
  },
  {
    id: "ports",
    name: "Ministry of Ports, Shipping and Waterways",
    code: "MoPSW",
    icon: "Anchor",
    totalProjects: 52,
    ongoing: 30,
    completed: 15,
    delayed: 7,
    highRisk: 5,
    totalCostCr: 145000,
    description: "Sagarmala port modernization, inland waterways development, deep-sea transshipment hubs, and coastal shipping."
  },
  {
    id: "urban",
    name: "Ministry of Housing and Urban Affairs",
    code: "MoHUA",
    icon: "Building2",
    totalProjects: 94,
    ongoing: 58,
    completed: 22,
    delayed: 14,
    highRisk: 9,
    totalCostCr: 380000,
    description: "Metro Rail transit systems, Smart Cities Mission infrastructure, urban rejuvenation, and RRTS corridors."
  },
  {
    id: "aviation",
    name: "Ministry of Civil Aviation",
    code: "MoCA",
    icon: "Plane",
    totalProjects: 38,
    ongoing: 21,
    completed: 12,
    delayed: 5,
    highRisk: 3,
    totalCostCr: 88000,
    description: "Greenfield airports under UDAN, airport expansion, cargo hubs, and air navigation modernizations."
  },
  {
    id: "jalshakti",
    name: "Ministry of Jal Shakti",
    code: "MoJS",
    icon: "Droplets",
    totalProjects: 82,
    ongoing: 51,
    completed: 19,
    delayed: 12,
    highRisk: 8,
    totalCostCr: 210000,
    description: "Namami Gange rejuvenation, Jal Jeevan Mission rural piping, dam rehabilitation, and canal link systems."
  }
];

export const PROJECTS_MASTER = [
  {
    id: "PRJ-2026-MH-001",
    name: "Mumbai Trans Harbour Link (MTHL) Expressway Extension & Feeder Network",
    shortName: "MTHL Feeder Expressway",
    state: "Maharashtra",
    district: "Raigad & Mumbai Suburban",
    region: "Western",
    ministry: "Ministry of Road Transport and Highways",
    department: "National Highways Authority of India (NHAI)",
    sector: "Highways & Expressways",
    category: "Strategic Mega Infrastructure",
    estimatedCost: 17843,
    approvedCost: 17843,
    currentCost: 19450, // Cost Overrun
    costOverrunCr: 1607,
    startDate: "2021-04-15",
    targetCompletion: "2026-03-31",
    expectedCompletion: "2026-11-30",
    timeDelayMonths: 8,
    status: "Delayed",
    progressPercent: 74,
    riskLevel: "High",
    riskScore: 78,
    riskBreakdown: {
      costOverrunRisk: 82,
      timeDelayRisk: 75,
      progressRisk: 68,
      adminDependencyRisk: 86
    },
    shapFactors: [
      { factor: "Inter-Departmental Land Clearance", impact: 32, category: "Administrative", description: "Delay in forest land diversion clearance from Navi Mumbai Urban Development Authority." },
      { factor: "Coastal Regulation Zone (CRZ) Clearance", impact: 24, category: "Environmental", description: "Additional environmental mitigation stipulations for mangrove protection." },
      { factor: "Steel & Cement Price Inflation", impact: 18, category: "Cost Overrun", description: "Surge in raw material input prices during 2024-2025 financial year." },
      { factor: "Utility Relocation Delay", impact: 14, category: "Execution", description: "Underground high-tension electrical cables relocation delayed by 6 months." },
      { factor: "Contractor Equipment Allocation", impact: 12, category: "Vendor", description: "Shortage of heavy marine piling rigs during monsoon season." }
    ],
    progressHistory: [
      { month: "Jan 2025", planned: 55, actual: 52, plannedCost: 11000, actualCost: 11200 },
      { month: "Mar 2025", planned: 62, actual: 58, plannedCost: 12500, actualCost: 13000 },
      { month: "May 2025", planned: 68, actual: 63, plannedCost: 13800, actualCost: 14600 },
      { month: "Jul 2025", planned: 74, actual: 67, plannedCost: 15100, actualCost: 16200 },
      { month: "Sep 2025", planned: 80, actual: 70, plannedCost: 16400, actualCost: 17800 },
      { month: "Nov 2025", planned: 86, actual: 74, plannedCost: 17500, actualCost: 19450 }
    ],
    dependencyNetwork: {
      nodes: [
        { id: "MTHL-CORE", label: "MTHL Main Sea Bridge", type: "project", status: "completed" },
        { id: "CIDCO-LAND", label: "CIDCO Land Acquisition", type: "department", status: "completed" },
        { id: "MCGM-WATER", label: "MCGM Water Pipeline Shift", type: "clearance", status: "completed" },
        { id: "MOEF-CRZ", label: "MoEFCC Coastal Clearance", type: "approval", status: "blocked" },
        { id: "NH-48-LINK", label: "NH-48 Interchange Junction", type: "project", status: "pending" },
        { id: "PORT-CONNECT", label: "JNPT Freight Corridor Link", type: "project", status: "pending" }
      ],
      links: [
        { source: "MTHL-CORE", target: "CIDCO-LAND", label: "Right of Way" },
        { source: "CIDCO-LAND", target: "MCGM-WATER", label: "Utility Shift" },
        { source: "MCGM-WATER", target: "MOEF-CRZ", label: "Eco-Clearance" },
        { source: "MOEF-CRZ", target: "NH-48-LINK", label: "Approval Required" },
        { source: "NH-48-LINK", target: "PORT-CONNECT", label: "Feeder Alignment" }
      ]
    },
    changeHistory: [
      { id: "CHg-901", timestamp: "2026-08-28 14:32", updatedBy: "Rajesh Sharma", role: "Project Officer - NHAI", field: "Progress %", previousValue: "71%", newValue: "74%", reason: "Girder launching completed over Sector 4", refDoc: "NHAI/MH/MTHL/2026/DOC-408.pdf" },
      { id: "CHg-882", timestamp: "2026-07-14 11:15", updatedBy: "Sunita Verma", role: "Superintending Engineer", field: "Expected Completion", previousValue: "31 Aug 2026", newValue: "30 Nov 2026", reason: "Monsoon extension and tidal restriction", refDoc: "NHAI/MH/MTHL/CORR-112.pdf" },
      { id: "CHg-754", timestamp: "2026-04-02 09:45", updatedBy: "Anil K. Mehta", role: "Joint Secretary - MoRTH", field: "Current Revised Cost", previousValue: "₹17,843 Cr", newValue: "₹19,450 Cr", reason: "Cabinet Committee approval for extra span width", refDoc: "CCEA/APPROVAL/2026/889.pdf" }
    ]
  },
  {
    id: "PRJ-2026-UP-002",
    name: "Ganga Expressway Phase-I (Meerut to Prayagraj 594 km)",
    shortName: "Ganga Expressway Phase-I",
    state: "Uttar Pradesh",
    district: "Meerut to Prayagraj (12 Districts)",
    region: "Northern",
    ministry: "Ministry of Road Transport and Highways",
    department: "UP Expressways Industrial Development Authority (UPEIDA)",
    sector: "Highways & Expressways",
    category: "State Mega Expressway",
    estimatedCost: 36230,
    approvedCost: 36230,
    currentCost: 37100,
    costOverrunCr: 870,
    startDate: "2021-12-18",
    targetCompletion: "2026-12-31",
    expectedCompletion: "2026-12-31",
    timeDelayMonths: 0,
    status: "Ongoing",
    progressPercent: 88,
    riskLevel: "Medium",
    riskScore: 42,
    riskBreakdown: {
      costOverrunRisk: 45,
      timeDelayRisk: 38,
      progressRisk: 35,
      adminDependencyRisk: 50
    },
    shapFactors: [
      { factor: "Airstrip Emergency Section Runway Earthwork", impact: 28, category: "Execution", description: "Special compaction required for 3.5km emergency landing strip." },
      { factor: "Monsoon River Basin Inundation", impact: 22, category: "Terrain", description: "Floodwaters in Ganga basin required extra embankment elevation." },
      { factor: "Railway Overbridge (ROB) Fabrication", impact: 20, category: "Inter-Agency", description: "Design clearance for 6 ROB spans across North Central Railway tracks." }
    ],
    progressHistory: [
      { month: "Jan 2025", planned: 65, actual: 67, plannedCost: 23000, actualCost: 23200 },
      { month: "Mar 2025", planned: 72, actual: 74, plannedCost: 26000, actualCost: 26100 },
      { month: "May 2025", planned: 78, actual: 80, plannedCost: 28500, actualCost: 28800 },
      { month: "Jul 2025", planned: 84, actual: 85, plannedCost: 31000, actualCost: 31400 },
      { month: "Sep 2025", planned: 88, actual: 88, plannedCost: 33000, actualCost: 33600 }
    ],
    dependencyNetwork: {
      nodes: [
        { id: "LAND-ACQ", label: "12-District Land Handover", type: "department", status: "completed" },
        { id: "ROB-NCR", label: "Railway Overbridge Approvals", type: "approval", status: "completed" },
        { id: "AIR-STRIP", label: "IAF Airstrip Signoff", type: "clearance", status: "completed" },
        { id: "PAVEMENT", label: "Bituminous Paving Phase", type: "project", status: "pending" }
      ],
      links: [
        { source: "LAND-ACQ", target: "ROB-NCR", label: "Site Access" },
        { source: "ROB-NCR", target: "AIR-STRIP", label: "Inter-Agency Sync" },
        { source: "AIR-STRIP", target: "PAVEMENT", label: "Final Surface" }
      ]
    },
    changeHistory: [
      { id: "CHg-102", timestamp: "2026-09-01 10:00", updatedBy: "Virendra Singh", role: "Chief Engineer - UPEIDA", field: "Progress %", previousValue: "85%", newValue: "88%", reason: "Asphalt wearing course completed Package 3", refDoc: "UPEIDA/GE/2026/89.pdf" }
    ]
  },
  {
    id: "PRJ-2026-TN-003",
    name: "Chennai Metro Rail Project Phase-II (Corridor 3, 4 & 5)",
    shortName: "Chennai Metro Phase-II",
    state: "Tamil Nadu",
    district: "Chennai & Kanchipuram",
    region: "Southern",
    ministry: "Ministry of Housing and Urban Affairs",
    department: "Chennai Metro Rail Limited (CMRL)",
    sector: "Urban Transit & Metro",
    category: "Urban Infrastructure",
    estimatedCost: 61843,
    approvedCost: 61843,
    currentCost: 64200,
    costOverrunCr: 2357,
    startDate: "2020-11-20",
    targetCompletion: "2027-06-30",
    expectedCompletion: "2028-03-31",
    timeDelayMonths: 9,
    status: "Delayed",
    progressPercent: 58,
    riskLevel: "Critical",
    riskScore: 89,
    riskBreakdown: {
      costOverrunRisk: 91,
      timeDelayRisk: 88,
      progressRisk: 84,
      adminDependencyRisk: 92
    },
    shapFactors: [
      { factor: "Hard Rock Tunnelling TBM Breakdown", impact: 36, category: "Technical", description: "Charnockite rock stratum caused heavy cutterhead wear in Tunnel Boring Machines." },
      { factor: "Central Assistance Allocation Delay", impact: 26, category: "Financial", description: "Lag in disbursement of equity contribution under 50:50 joint venture." },
      { factor: "Dense Urban Traffic Diversion Permissions", impact: 22, category: "Municipal", description: "Traffic police restrictions on peak hour station cavern construction." },
      { factor: "Heritage & Archaeological Restrictions", impact: 16, category: "Regulatory", description: "Proximity to protected monuments required non-vibrational excavation." }
    ],
    progressHistory: [
      { month: "Jan 2025", planned: 48, actual: 44, plannedCost: 28000, actualCost: 31000 },
      { month: "Mar 2025", planned: 53, actual: 48, plannedCost: 32000, actualCost: 35500 },
      { month: "May 2025", planned: 58, actual: 51, plannedCost: 36000, actualCost: 40200 },
      { month: "Jul 2025", planned: 64, actual: 54, plannedCost: 40000, actualCost: 45000 },
      { month: "Sep 2025", planned: 70, actual: 58, plannedCost: 44000, actualCost: 50100 }
    ],
    dependencyNetwork: {
      nodes: [
        { id: "TBM-PACKAGE", label: "Underground TBM Procurement", type: "project", status: "completed" },
        { id: "STATE-EQUITY", label: "State Equity Transfer", type: "department", status: "completed" },
        { id: "CENTRAL-FUND", label: "MoHUA Union Disbursement", type: "approval", status: "pending" },
        { id: "TRAFFIC-NOC", label: "Chennai Traffic NOC", type: "clearance", status: "blocked" },
        { id: "SYSTEMS-TRACK", label: "Ballastless Track Laying", type: "project", status: "pending" }
      ],
      links: [
        { source: "TBM-PACKAGE", target: "STATE-EQUITY", label: "Funding Match" },
        { source: "STATE-EQUITY", target: "CENTRAL-FUND", label: "Matching Grant" },
        { source: "CENTRAL-FUND", target: "TRAFFIC-NOC", label: "Civic Alignment" },
        { source: "TRAFFIC-NOC", target: "SYSTEMS-TRACK", label: "Cavern Access" }
      ]
    },
    changeHistory: [
      { id: "CHg-341", timestamp: "2026-08-10 16:20", updatedBy: "S. K. Ramanathan", role: "Director Projects - CMRL", field: "Risk Level", previousValue: "High", newValue: "Critical", reason: "TBM-4 cutterhead failure under Adyar River", refDoc: "CMRL/P2/TBM/2026-09.pdf" }
    ]
  },
  {
    id: "PRJ-2026-GJ-004",
    name: "Dholera Special Investment Region (DSIR) Smart City Infrastructure Phase-1",
    shortName: "Dholera SIR Smart City",
    state: "Gujarat",
    district: "Ahmedabad",
    region: "Western",
    ministry: "Ministry of Housing and Urban Affairs",
    department: "National Industrial Corridor Development Corporation (NICDC)",
    sector: "Smart Cities & Industrial Parks",
    category: "Industrial Corridor",
    estimatedCost: 19800,
    approvedCost: 19800,
    currentCost: 19800,
    costOverrunCr: 0,
    startDate: "2019-03-10",
    targetCompletion: "2026-10-31",
    expectedCompletion: "2026-10-31",
    timeDelayMonths: 0,
    status: "Ongoing",
    progressPercent: 91,
    riskLevel: "Low",
    riskScore: 22,
    riskBreakdown: {
      costOverrunRisk: 18,
      timeDelayRisk: 20,
      progressRisk: 22,
      adminDependencyRisk: 25
    },
    shapFactors: [
      { factor: "Utility Duct Integration", impact: 40, category: "Execution", description: "Plug-and-play underground utility trunking completed on schedule." },
      { factor: "Solar Plant Substation Sync", impact: 35, category: "Power", description: "500MW solar grid sync operational ahead of industrial plot allotment." }
    ],
    progressHistory: [
      { month: "Jan 2025", planned: 80, actual: 82, plannedCost: 15500, actualCost: 15400 },
      { month: "Mar 2025", planned: 83, actual: 85, plannedCost: 16500, actualCost: 16400 },
      { month: "May 2025", planned: 86, actual: 87, plannedCost: 17500, actualCost: 17400 },
      { month: "Jul 2025", planned: 89, actual: 89, plannedCost: 18500, actualCost: 18500 },
      { month: "Sep 2025", planned: 92, actual: 91, plannedCost: 19500, actualCost: 19400 }
    ],
    dependencyNetwork: {
      nodes: [
        { id: "TRUNK-INFRA", label: "Trunk Infrastructure Package", type: "project", status: "completed" },
        { id: "EXPRESSWAY-LINK", label: "Ahmedabad-Dholera Expressway", type: "project", status: "completed" },
        { id: "SUBSTATION", label: "220kV Grid Substation", type: "clearance", status: "completed" }
      ],
      links: [
        { source: "TRUNK-INFRA", target: "EXPRESSWAY-LINK", label: "Connectivity" },
        { source: "EXPRESSWAY-LINK", target: "SUBSTATION", label: "Power Integration" }
      ]
    },
    changeHistory: [
      { id: "CHg-501", timestamp: "2026-07-22 11:30", updatedBy: "J. P. Patel", role: "General Manager - DSIRDA", field: "Progress %", previousValue: "89%", newValue: "91%", reason: "Water treatment plant SCADA commissioning completed", refDoc: "DSIR/WTP/SCADA/2026.pdf" }
    ]
  },
  {
    id: "PRJ-2026-KA-005",
    name: "Bengaluru Suburban Rail Project (BSRP) Corridors 1-4",
    shortName: "Bengaluru Suburban Rail",
    state: "Karnataka",
    district: "Bengaluru Urban & Rural",
    region: "Southern",
    ministry: "Ministry of Railways",
    department: "Rail Infrastructure Development Company (Karnataka) Limited (K-RIDE)",
    sector: "Railways & Commuter Transit",
    category: "Urban Mass Transit",
    estimatedCost: 15767,
    approvedCost: 15767,
    currentCost: 17200,
    costOverrunCr: 1433,
    startDate: "2022-08-15",
    targetCompletion: "2027-12-31",
    expectedCompletion: "2028-11-30",
    timeDelayMonths: 11,
    status: "Delayed",
    progressPercent: 38,
    riskLevel: "High",
    riskScore: 81,
    riskBreakdown: {
      costOverrunRisk: 78,
      timeDelayRisk: 84,
      progressRisk: 82,
      adminDependencyRisk: 80
    },
    shapFactors: [
      { factor: "South Western Railway Track Handover Delay", impact: 35, category: "Inter-Agency", description: "Delay in operational track sharing agreement with Indian Railways." },
      { factor: "Defense Land Acquisition at Jalahalli & Hebbal", impact: 28, category: "Land", description: "Prolonged clearance procedure for Ministry of Defense land parcels." },
      { factor: "Contractor Reprocurement for Corridor 2", impact: 20, category: "Vendor", description: "Termination of non-performing civil works contractor." }
    ],
    progressHistory: [
      { month: "Jan 2025", planned: 32, actual: 26, plannedCost: 4500, actualCost: 4800 },
      { month: "Mar 2025", planned: 37, actual: 29, plannedCost: 5500, actualCost: 6100 },
      { month: "May 2025", planned: 42, actual: 32, plannedCost: 6500, actualCost: 7300 },
      { month: "Jul 2025", planned: 47, actual: 35, plannedCost: 7500, actualCost: 8600 },
      { month: "Sep 2025", planned: 52, actual: 38, plannedCost: 8500, actualCost: 9900 }
    ],
    dependencyNetwork: {
      nodes: [
        { id: "SWR-TRACK", label: "South Western Railway Clearance", type: "approval", status: "blocked" },
        { id: "MOD-LAND", label: "Ministry of Defense Land NOC", type: "clearance", status: "blocked" },
        { id: "BBMP-DRAIN", label: "BBMP Drain Relocation", type: "department", status: "pending" }
      ],
      links: [
        { source: "SWR-TRACK", target: "MOD-LAND", label: "Joint Survey" },
        { source: "MOD-LAND", target: "BBMP-DRAIN", label: "Civil Access" }
      ]
    },
    changeHistory: [
      { id: "CHg-119", timestamp: "2026-06-15 15:40", updatedBy: "B. S. Murthy", role: "Chief Project Manager - K-RIDE", field: "Expected Completion", previousValue: "31 Dec 2027", newValue: "30 Nov 2028", reason: "Re-tendering process for Package C2 civil works", refDoc: "KRIDE/BSRP/TENDER/2026/04.pdf" }
    ]
  },
  {
    id: "PRJ-2026-WB-006",
    name: "Kolkata Metro East-West Corridor Extension (Howrah Maidan to Salt Lake Sector V)",
    shortName: "Kolkata Metro East-West",
    state: "West Bengal",
    district: "Kolkata & Howrah",
    region: "Eastern",
    ministry: "Ministry of Railways",
    department: "Kolkata Metro Rail Corporation Limited (KMRCL)",
    sector: "Urban Transit & Metro",
    category: "Strategic Urban Rail",
    estimatedCost: 8575,
    approvedCost: 8575,
    currentCost: 8575,
    costOverrunCr: 0,
    startDate: "2018-05-10",
    targetCompletion: "2026-06-30",
    expectedCompletion: "2026-06-30",
    timeDelayMonths: 0,
    status: "Completed",
    progressPercent: 100,
    riskLevel: "Low",
    riskScore: 12,
    riskBreakdown: {
      costOverrunRisk: 10,
      timeDelayRisk: 12,
      progressRisk: 10,
      adminDependencyRisk: 15
    },
    shapFactors: [
      { factor: "Underwater Tunnelling under Hooghly River", impact: 50, category: "Milestone", description: "Successfully commissioned India's first underwater metro tunnel." }
    ],
    progressHistory: [
      { month: "Jan 2025", planned: 96, actual: 96, plannedCost: 8200, actualCost: 8200 },
      { month: "Mar 2025", planned: 98, actual: 98, plannedCost: 8400, actualCost: 8400 },
      { month: "May 2025", planned: 100, actual: 100, plannedCost: 8575, actualCost: 8575 }
    ],
    dependencyNetwork: {
      nodes: [
        { id: "HOOGHLY-TUNNEL", label: "Hooghly River Tunnel", type: "project", status: "completed" },
        { id: "CRS-INSPECT", label: "Commissioner of Railway Safety Inspection", type: "approval", status: "completed" }
      ],
      links: [
        { source: "HOOGHLY-TUNNEL", target: "CRS-INSPECT", label: "Safety Signoff" }
      ]
    },
    changeHistory: [
      { id: "CHg-009", timestamp: "2026-05-30 18:00", updatedBy: "Subhashis Roy", role: "Managing Director - KMRCL", field: "Status", previousValue: "Ongoing", newValue: "Completed", reason: "CRS safety certificate awarded and full commercial operations launched", refDoc: "KMRCL/CRS/CERT/2026/01.pdf" }
    ]
  },
  {
    id: "PRJ-2026-BR-007",
    name: "Kosi-Mechi Inter-State River Interlinking Project",
    shortName: "Kosi-Mechi River Link",
    state: "Bihar",
    district: "Supaul, Araria, Kishanganj & Purnea",
    region: "Eastern",
    ministry: "Ministry of Jal Shakti",
    department: "Water Resources Department Bihar",
    sector: "Irrigation & River Interlinking",
    category: "National Project",
    estimatedCost: 4900,
    approvedCost: 4900,
    currentCost: 5450,
    costOverrunCr: 550,
    startDate: "2022-03-01",
    targetCompletion: "2027-03-31",
    expectedCompletion: "2027-11-30",
    timeDelayMonths: 8,
    status: "Delayed",
    progressPercent: 46,
    riskLevel: "High",
    riskScore: 76,
    riskBreakdown: {
      costOverrunRisk: 74,
      timeDelayRisk: 78,
      progressRisk: 72,
      adminDependencyRisk: 80
    },
    shapFactors: [
      { factor: "Monsoon Flood Siltation Removal", impact: 38, category: "Environmental", description: "Heavy silt loads during Bihar floods damaged canal embankments." },
      { factor: "Agricultural Land Compensation Disputes", impact: 30, category: "Land", description: "Local landholder court stay orders in Araria district." }
    ],
    progressHistory: [
      { month: "Jan 2025", planned: 40, actual: 36, plannedCost: 2000, actualCost: 2150 },
      { month: "May 2025", planned: 48, actual: 41, plannedCost: 2500, actualCost: 2800 },
      { month: "Sep 2025", planned: 55, actual: 46, plannedCost: 3000, actualCost: 3500 }
    ],
    dependencyNetwork: {
      nodes: [
        { id: "CANAL-DIG", label: "Main Eastern Kosi Canal Earthwork", type: "project", status: "pending" },
        { id: "LAND-AWARD", label: "Land Acquisition Award Araria", type: "department", status: "blocked" }
      ],
      links: [
        { source: "LAND-AWARD", target: "CANAL-DIG", label: "Clearance" }
      ]
    },
    changeHistory: [
      { id: "CHg-712", timestamp: "2026-07-04 12:10", updatedBy: "Manoj Kumar", role: "Executive Engineer - WRD Bihar", field: "Progress %", previousValue: "43%", newValue: "46%", reason: "Canal lining finished in Reach-2", refDoc: "WRD/BR/KM/2026/44.pdf" }
    ]
  },
  {
    id: "PRJ-2026-RJ-008",
    name: "Barmer Refinery & Petrochemical Complex (HPCL Rajasthan Refinery)",
    shortName: "Barmer Petrochemical Complex",
    state: "Rajasthan",
    district: "Barmer",
    region: "Northern",
    ministry: "Ministry of Petroleum and Natural Gas",
    department: "HPCL Rajasthan Refinery Limited (HRRL)",
    sector: "Petroleum & Chemicals",
    category: "Industrial Infrastructure",
    estimatedCost: 72937,
    approvedCost: 72937,
    currentCost: 72937,
    costOverrunCr: 0,
    startDate: "2018-01-16",
    targetCompletion: "2026-12-31",
    expectedCompletion: "2026-12-31",
    timeDelayMonths: 0,
    status: "Ongoing",
    progressPercent: 94,
    riskLevel: "Low",
    riskScore: 28,
    riskBreakdown: {
      costOverrunRisk: 25,
      timeDelayRisk: 30,
      progressRisk: 26,
      adminDependencyRisk: 30
    },
    shapFactors: [
      { factor: "Desalination Water Pipeline Commissioning", impact: 45, category: "Utility", description: "212 km water line from Jodhpur fully charged and tested." }
    ],
    progressHistory: [
      { month: "Jan 2025", planned: 88, actual: 89, plannedCost: 64000, actualCost: 64000 },
      { month: "May 2025", planned: 92, actual: 92, plannedCost: 68000, actualCost: 68000 },
      { month: "Sep 2025", planned: 95, actual: 94, plannedCost: 71000, actualCost: 71000 }
    ],
    dependencyNetwork: {
      nodes: [
        { id: "WATER-PIPE", label: "Jodhpur Water Pipeline", type: "project", status: "completed" },
        { id: "CRUDE-UNIT", label: "Crude Distillation Unit (CDU)", type: "project", status: "completed" }
      ],
      links: [
        { source: "WATER-PIPE", target: "CRUDE-UNIT", label: "Cooling Supply" }
      ]
    },
    changeHistory: [
      { id: "CHg-988", timestamp: "2026-08-30 17:15", updatedBy: "R. C. Bishnoi", role: "Director Operations - HRRL", field: "Progress %", previousValue: "92%", newValue: "94%", reason: "Fluid Catalytic Cracking Unit pre-commissioned", refDoc: "HRRL/BMR/2026/88.pdf" }
    ]
  },
  {
    id: "PRJ-2026-OD-009",
    name: "Paradip Port Western Dock Expansion & Deep Draft Navigation",
    shortName: "Paradip Port Western Dock",
    state: "Odisha",
    district: "Jagatsinghpur",
    region: "Eastern",
    ministry: "Ministry of Ports, Shipping and Waterways",
    department: "Paradip Port Authority (PPA)",
    sector: "Ports & Maritime",
    category: "Maritime Trade Infrastructure",
    estimatedCost: 3004,
    approvedCost: 3004,
    currentCost: 3004,
    costOverrunCr: 0,
    startDate: "2021-09-01",
    targetCompletion: "2026-08-31",
    expectedCompletion: "2026-08-31",
    timeDelayMonths: 0,
    status: "Completed",
    progressPercent: 100,
    riskLevel: "Low",
    riskScore: 10,
    riskBreakdown: {
      costOverrunRisk: 8,
      timeDelayRisk: 10,
      progressRisk: 10,
      adminDependencyRisk: 12
    },
    shapFactors: [
      { factor: "Capital Dredging Deepening to 18m", impact: 60, category: "Milestone", description: "Enabled Capesize vessel berthing at Western Dock." }
    ],
    progressHistory: [
      { month: "Jan 2025", planned: 92, actual: 93, plannedCost: 2800, actualCost: 2800 },
      { month: "May 2025", planned: 98, actual: 99, plannedCost: 2950, actualCost: 2950 },
      { month: "Aug 2025", planned: 100, actual: 100, plannedCost: 3004, actualCost: 3004 }
    ],
    dependencyNetwork: {
      nodes: [
        { id: "DREDGE-CAP", label: "Capital Dredging Work", type: "project", status: "completed" },
        { id: "BERTH-CONST", label: "Breakwater Quay Construction", type: "project", status: "completed" }
      ],
      links: [
        { source: "DREDGE-CAP", target: "BERTH-CONST", label: "Draft Capability" }
      ]
    },
    changeHistory: [
      { id: "CHg-601", timestamp: "2026-08-31 16:00", updatedBy: "P. K. Sahoo", role: "Chief Mechanical Engineer - PPA", field: "Status", previousValue: "Ongoing", newValue: "Completed", reason: "First Capesize coal vessel successfully berthed", refDoc: "PPA/OPS/2026/091.pdf" }
    ]
  },
  {
    id: "PRJ-2026-AS-010",
    name: "Guwahati-North Guwahati Twin-Tower Extra Dosed Cable Bridge over Brahmaputra",
    shortName: "Guwahati Brahmaputra Bridge",
    state: "Assam",
    district: "Kamrup & Kamrup Metropolitan",
    region: "North Eastern",
    ministry: "Ministry of Road Transport and Highways",
    department: "Public Works Roads Department (PWRD) Assam",
    sector: "Highways & Expressways",
    category: "State Mega Bridge",
    estimatedCost: 2608,
    approvedCost: 2608,
    currentCost: 2890,
    costOverrunCr: 282,
    startDate: "2019-08-14",
    targetCompletion: "2026-04-30",
    expectedCompletion: "2026-12-31",
    timeDelayMonths: 8,
    status: "Delayed",
    progressPercent: 82,
    riskLevel: "High",
    riskScore: 74,
    riskBreakdown: {
      costOverrunRisk: 72,
      timeDelayRisk: 76,
      progressRisk: 70,
      adminDependencyRisk: 78
    },
    shapFactors: [
      { factor: "High Velocity Brahmaputra Currents", impact: 42, category: "Environmental", description: "Strong monsoon river currents restricted deep foundation caisson work." },
      { factor: "Cable Stay Structural Steel Testing", impact: 30, category: "Quality", description: "Third-party fatigue testing delayed by international lab backlog." }
    ],
    progressHistory: [
      { month: "Jan 2025", planned: 78, actual: 72, plannedCost: 2000, actualCost: 2150 },
      { month: "May 2025", planned: 84, actual: 77, plannedCost: 2300, actualCost: 2500 },
      { month: "Sep 2025", planned: 90, actual: 82, plannedCost: 2600, actualCost: 2890 }
    ],
    dependencyNetwork: {
      nodes: [
        { id: "CAISSON-P1", label: "Pier 1 Deep Foundation", type: "project", status: "completed" },
        { id: "CABLE-STAY", label: "Extradosed Cable Tensioning", type: "project", status: "pending" }
      ],
      links: [
        { source: "CAISSON-P1", target: "CABLE-STAY", label: "Superstructure" }
      ]
    },
    changeHistory: [
      { id: "CHg-441", timestamp: "2026-08-18 10:20", updatedBy: "D. K. Sarma", role: "Chief Engineer PWRD Assam", field: "Progress %", previousValue: "79%", newValue: "82%", reason: "Tower 2 stay cable segment 12 anchored", refDoc: "PWRD/AS/GB/2026/12.pdf" }
    ]
  },
  {
    id: "PRJ-2026-TS-011",
    name: "Hyderabad Regional Ring Road (RRR) Northern Part (158 km Expressway)",
    shortName: "Hyderabad Regional Ring Road",
    state: "Telangana",
    district: "Sangareddy, Medak, Siddipet, Yadadri Bhuvanagiri",
    region: "Southern",
    ministry: "Ministry of Road Transport and Highways",
    department: "National Highways Authority of India (NHAI)",
    sector: "Highways & Expressways",
    category: "Greenfield Expressway",
    estimatedCost: 13125,
    approvedCost: 13125,
    currentCost: 13125,
    costOverrunCr: 0,
    startDate: "2023-01-10",
    targetCompletion: "2027-06-30",
    expectedCompletion: "2027-06-30",
    timeDelayMonths: 0,
    status: "Ongoing",
    progressPercent: 52,
    riskLevel: "Medium",
    riskScore: 48,
    riskBreakdown: {
      costOverrunRisk: 42,
      timeDelayRisk: 50,
      progressRisk: 45,
      adminDependencyRisk: 55
    },
    shapFactors: [
      { factor: "JNTU Highway Alignment Mapping", impact: 38, category: "Planning", description: "3D LiDAR land mapping completed for 4-lane access controlled corridor." }
    ],
    progressHistory: [
      { month: "Jan 2025", planned: 38, actual: 39, plannedCost: 4800, actualCost: 4800 },
      { month: "May 2025", planned: 45, actual: 46, plannedCost: 5800, actualCost: 5800 },
      { month: "Sep 2025", planned: 52, actual: 52, plannedCost: 6800, actualCost: 6800 }
    ],
    dependencyNetwork: {
      nodes: [
        { id: "NHAI-3D", label: "LiDAR Survey Alignment", type: "project", status: "completed" },
        { id: "PACKAGE-1-4", label: "Civil Works Package 1-4", type: "project", status: "pending" }
      ],
      links: [
        { source: "NHAI-3D", target: "PACKAGE-1-4", label: "Ground Clearing" }
      ]
    },
    changeHistory: [
      { id: "CHg-801", timestamp: "2026-08-05 14:00", updatedBy: "K. V. Rao", role: "Project Director NHAI Hyderabad", field: "Progress %", previousValue: "48%", newValue: "52%", reason: "Earthwork completed Package 2", refDoc: "NHAI/RRR/HYD/2026/02.pdf" }
    ]
  },
  {
    id: "PRJ-2026-AP-012",
    name: "Polavaram Irrigation Project Headworks & Right Main Canal",
    shortName: "Polavaram Irrigation Project",
    state: "Andhra Pradesh",
    district: "Eluru & East Godavari",
    region: "Southern",
    ministry: "Ministry of Jal Shakti",
    department: "Polavaram Project Authority (PPA)",
    sector: "Irrigation & River Interlinking",
    category: "National Mega Project",
    estimatedCost: 55548,
    approvedCost: 55548,
    currentCost: 58900,
    costOverrunCr: 3352,
    startDate: "2016-04-01",
    targetCompletion: "2026-06-30",
    expectedCompletion: "2027-03-31",
    timeDelayMonths: 9,
    status: "Delayed",
    progressPercent: 78,
    riskLevel: "High",
    riskScore: 82,
    riskBreakdown: {
      costOverrunRisk: 84,
      timeDelayRisk: 86,
      progressRisk: 75,
      adminDependencyRisk: 83
    },
    shapFactors: [
      { factor: "Dam Diaphragm Wall Rehabilitation", impact: 40, category: "Technical", description: "Scour damage repair under Earth-cum-Rockfill (ECRF) dam gap." },
      { factor: "R&R Colony Construction Delay", impact: 32, category: "Social", description: "Resettlement housing for displaced tribal families in submergence zone." }
    ],
    progressHistory: [
      { month: "Jan 2025", planned: 72, actual: 68, plannedCost: 40000, actualCost: 43000 },
      { month: "May 2025", planned: 77, actual: 73, plannedCost: 43000, actualCost: 47000 },
      { month: "Sep 2025", planned: 82, actual: 78, plannedCost: 46000, actualCost: 51000 }
    ],
    dependencyNetwork: {
      nodes: [
        { id: "ECRF-GAP", label: "ECRF Dam Gap 1 Filling", type: "project", status: "pending" },
        { id: "RR-COLONY", label: "Rehab Colony Handover", type: "department", status: "blocked" }
      ],
      links: [
        { source: "RR-COLONY", target: "ECRF-GAP", label: "Submergence Clearance" }
      ]
    },
    changeHistory: [
      { id: "CHg-222", timestamp: "2026-08-20 11:45", updatedBy: "C. H. Srinivas", role: "Chief Engineer Polavaram", field: "Progress %", previousValue: "76%", newValue: "78%", reason: "Spillway radial gates installation 48/52 complete", refDoc: "PPA/POL/2026/48.pdf" }
    ]
  },
  {
    id: "PRJ-2026-JK-013",
    name: "Udhampur-Srinagar-Baramulla Rail Link (USBRL) Rail Connectivity",
    shortName: "USBRL Kashmir Rail Link",
    state: "Jammu and Kashmir",
    district: "Reasi, Ramban & Srinagar",
    region: "Northern",
    ministry: "Ministry of Railways",
    department: "Northern Railway",
    sector: "Railways & Alpine Transport",
    category: "National Strategic Project",
    estimatedCost: 37012,
    approvedCost: 37012,
    currentCost: 37012,
    costOverrunCr: 0,
    startDate: "2002-07-01",
    targetCompletion: "2026-05-31",
    expectedCompletion: "2026-05-31",
    timeDelayMonths: 0,
    status: "Completed",
    progressPercent: 100,
    riskLevel: "Low",
    riskScore: 15,
    riskBreakdown: {
      costOverrunRisk: 12,
      timeDelayRisk: 15,
      progressRisk: 10,
      adminDependencyRisk: 18
    },
    shapFactors: [
      { factor: "Chenab Arch Bridge Engineering Victory", impact: 70, category: "Milestone", description: "Highest railway arch bridge in the world fully tested with ballastless tracks." }
    ],
    progressHistory: [
      { month: "Jan 2025", planned: 97, actual: 97, plannedCost: 36000, actualCost: 36000 },
      { month: "Mar 2025", planned: 99, actual: 99, plannedCost: 36800, actualCost: 36800 },
      { month: "May 2025", planned: 100, actual: 100, plannedCost: 37012, actualCost: 37012 }
    ],
    dependencyNetwork: {
      nodes: [
        { id: "CHENAB-ARCH", label: "Chenab Bridge Arch", type: "project", status: "completed" },
        { id: "ANJI-CABLE", label: "Anji Khad Cable Stay Bridge", type: "project", status: "completed" }
      ],
      links: [
        { source: "CHENAB-ARCH", target: "ANJI-CABLE", label: "Corridor Link" }
      ]
    },
    changeHistory: [
      { id: "CHg-001", timestamp: "2026-05-31 12:00", updatedBy: "A. K. Sharma", role: "General Manager Northern Railway", field: "Status", previousValue: "Ongoing", newValue: "Completed", reason: "Vande Bharat train trial successfully run from Katra to Srinagar", refDoc: "NR/USBRL/COMP/2026.pdf" }
    ]
  },
  {
    id: "PRJ-2026-DL-014",
    name: "Delhi-Meerut Regional Rapid Transit System (RRTS) Priority & Main Corridor",
    shortName: "Delhi-Meerut RRTS Namo Bharat",
    state: "Delhi",
    district: "East Delhi & Central Delhi",
    region: "Northern",
    ministry: "Ministry of Housing and Urban Affairs",
    department: "National Capital Region Transport Corporation (NCRTC)",
    sector: "Urban Transit & Metro",
    category: "Regional High-Speed Rail",
    estimatedCost: 30274,
    approvedCost: 30274,
    currentCost: 30274,
    costOverrunCr: 0,
    startDate: "2019-06-01",
    targetCompletion: "2026-06-30",
    expectedCompletion: "2026-06-30",
    timeDelayMonths: 0,
    status: "Completed",
    progressPercent: 100,
    riskLevel: "Low",
    riskScore: 14,
    riskBreakdown: {
      costOverrunRisk: 10,
      timeDelayRisk: 14,
      progressRisk: 12,
      adminDependencyRisk: 15
    },
    shapFactors: [
      { factor: "Namo Bharat Rapid Rail Commissioning", impact: 65, category: "Milestone", description: "Entire 82 km stretch from Sarai Kale Khan to Meerut South commissioned." }
    ],
    progressHistory: [
      { month: "Jan 2025", planned: 94, actual: 95, plannedCost: 28500, actualCost: 28500 },
      { month: "May 2025", planned: 100, actual: 100, plannedCost: 30274, actualCost: 30274 }
    ],
    dependencyNetwork: {
      nodes: [
        { id: "SARAI-HUB", label: "Sarai Kale Khan Multi-Modal Transit", type: "project", status: "completed" },
        { id: "MEERUT-METRO", label: "Meerut Local Transit Segment", type: "project", status: "completed" }
      ],
      links: [
        { source: "SARAI-HUB", target: "MEERUT-METRO", label: "Seamless Rail" }
      ]
    },
    changeHistory: [
      { id: "CHg-050", timestamp: "2026-06-30 15:30", updatedBy: "V. K. Singh", role: "Managing Director NCRTC", field: "Status", previousValue: "Ongoing", newValue: "Completed", reason: "Full corridor operations flagged off", refDoc: "NCRTC/RRTS/2026/99.pdf" }
    ]
  },
  {
    id: "PRJ-2026-MP-015",
    name: "Kewra-Rewa Solar Ultra Mega Power Park Phase-2 (1500 MW)",
    shortName: "Rewa Ultra Solar Park Phase-2",
    state: "Madhya Pradesh",
    district: "Rewa",
    region: "Central",
    ministry: "Ministry of New and Renewable Energy",
    department: "Rewa Ultra Mega Solar Limited (RUMSL)",
    sector: "Renewable Energy & Solar",
    category: "Green Energy Corridor",
    estimatedCost: 7500,
    approvedCost: 7500,
    currentCost: 7500,
    costOverrunCr: 0,
    startDate: "2022-02-10",
    targetCompletion: "2026-09-30",
    expectedCompletion: "2026-09-30",
    timeDelayMonths: 0,
    status: "Ongoing",
    progressPercent: 96,
    riskLevel: "Low",
    riskScore: 18,
    riskBreakdown: {
      costOverrunRisk: 15,
      timeDelayRisk: 18,
      progressRisk: 15,
      adminDependencyRisk: 20
    },
    shapFactors: [
      { factor: "Bifacial Solar Module Grid Test", impact: 55, category: "Tech", description: "Bifacial PV modules successfully sync with PGCIL grid." }
    ],
    progressHistory: [
      { month: "Jan 2025", planned: 85, actual: 87, plannedCost: 6400, actualCost: 6400 },
      { month: "May 2025", planned: 92, actual: 93, plannedCost: 7000, actualCost: 7000 },
      { month: "Sep 2025", planned: 96, actual: 96, plannedCost: 7500, actualCost: 7500 }
    ],
    dependencyNetwork: {
      nodes: [
        { id: "RUMSL-GRID", label: "765kV Substation Sync", type: "approval", status: "completed" },
        { id: "PV-BLOCK-3", label: "Block 3 Inverter Station", type: "project", status: "completed" }
      ],
      links: [
        { source: "PV-BLOCK-3", target: "RUMSL-GRID", label: "Power Evacuation" }
      ]
    },
    changeHistory: [
      { id: "CHg-909", timestamp: "2026-09-02 11:00", updatedBy: "S. K. Gupta", role: "CEO RUMSL", field: "Progress %", previousValue: "94%", newValue: "96%", reason: "1400MW capacity connected to ISTS", refDoc: "RUMSL/MP/SOLAR/2026.pdf" }
    ]
  },
  {
    id: "PRJ-2026-KL-016",
    name: "Vizhinjam International Deepwater Multipurpose Transshipment Seaport Phase-2",
    shortName: "Vizhinjam Transshipment Port",
    state: "Kerala",
    district: "Thiruvananthapuram",
    region: "Southern",
    ministry: "Ministry of Ports, Shipping and Waterways",
    department: "Vizhinjam International Seaport Limited (VISL)",
    sector: "Ports & Maritime",
    category: "Deepwater Transshipment Hub",
    estimatedCost: 7700,
    approvedCost: 7700,
    currentCost: 8100,
    costOverrunCr: 400,
    startDate: "2017-12-05",
    targetCompletion: "2026-11-30",
    expectedCompletion: "2027-02-28",
    timeDelayMonths: 3,
    status: "Delayed",
    progressPercent: 89,
    riskLevel: "Medium",
    riskScore: 54,
    riskBreakdown: {
      costOverrunRisk: 52,
      timeDelayRisk: 58,
      progressRisk: 50,
      adminDependencyRisk: 56
    },
    shapFactors: [
      { factor: "Breakwater Armour Rock Supply Shortage", impact: 38, category: "Materials", description: "Quarrying restrictions in Western Ghats slowed breakwater extension." }
    ],
    progressHistory: [
      { month: "Jan 2025", planned: 80, actual: 78, plannedCost: 6100, actualCost: 6300 },
      { month: "May 2025", planned: 86, actual: 84, plannedCost: 6800, actualCost: 7100 },
      { month: "Sep 2025", planned: 92, actual: 89, plannedCost: 7400, actualCost: 8100 }
    ],
    dependencyNetwork: {
      nodes: [
        { id: "ARMOUR-ROCK", label: "Breakwater 3.1km Cap", type: "project", status: "pending" },
        { id: "CRANE-STIFF", label: "Automated Quay Cranes (STS)", type: "project", status: "completed" }
      ],
      links: [
        { source: "ARMOUR-ROCK", target: "CRANE-STIFF", label: "Basin Protection" }
      ]
    },
    changeHistory: [
      { id: "CHg-303", timestamp: "2026-08-14 09:30", updatedBy: "K. Jayakumar", role: "MD VISL Kerala", field: "Progress %", previousValue: "87%", newValue: "89%", reason: "Automated container yard crane calibration complete", refDoc: "VISL/KL/PORT/2026/89.pdf" }
    ]
  }
];

// Generates aggregated state metrics for all 36 States/UTs in India GeoJSON
export function getStateAggregates() {
  const map = {};
  
  // Base list matching exact GeoJSON st_nm properties
  const allStates = [
    'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam',
    'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir',
    'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
    'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  // Default synthetic baseline for states without high-detail projects yet
  const defaults = {
    'Maharashtra': { totalProjects: 34, ongoing: 18, completed: 10, delayed: 6, highRisk: 4, totalCost: 148500 },
    'Uttar Pradesh': { totalProjects: 42, ongoing: 26, completed: 11, delayed: 5, highRisk: 3, totalCost: 189200 },
    'Tamil Nadu': { totalProjects: 28, ongoing: 14, completed: 8, delayed: 6, highRisk: 4, totalCost: 112000 },
    'Gujarat': { totalProjects: 31, ongoing: 17, completed: 12, delayed: 2, highRisk: 1, totalCost: 135400 },
    'Karnataka': { totalProjects: 29, ongoing: 15, completed: 8, delayed: 6, highRisk: 4, totalCost: 104500 },
    'West Bengal': { totalProjects: 22, ongoing: 10, completed: 9, delayed: 3, highRisk: 2, totalCost: 68900 },
    'Bihar': { totalProjects: 26, ongoing: 14, completed: 6, delayed: 6, highRisk: 5, totalCost: 74200 },
    'Rajasthan': { totalProjects: 25, ongoing: 13, completed: 9, delayed: 3, highRisk: 1, totalCost: 98400 },
    'Odisha': { totalProjects: 24, ongoing: 12, completed: 9, delayed: 3, highRisk: 1, totalCost: 82100 },
    'Assam': { totalProjects: 18, ongoing: 10, completed: 4, delayed: 4, highRisk: 3, totalCost: 45600 },
    'Telangana': { totalProjects: 21, ongoing: 12, completed: 7, delayed: 2, highRisk: 1, totalCost: 79800 },
    'Andhra Pradesh': { totalProjects: 27, ongoing: 14, completed: 7, delayed: 6, highRisk: 4, totalCost: 124000 },
    'Jammu and Kashmir': { totalProjects: 16, ongoing: 7, completed: 6, delayed: 3, highRisk: 2, totalCost: 59300 },
    'Delhi': { totalProjects: 19, ongoing: 9, completed: 8, delayed: 2, highRisk: 1, totalCost: 62000 },
    'Madhya Pradesh': { totalProjects: 28, ongoing: 16, completed: 9, delayed: 3, highRisk: 1, totalCost: 92300 },
    'Kerala': { totalProjects: 17, ongoing: 9, completed: 5, delayed: 3, highRisk: 2, totalCost: 48900 },
    'Punjab': { totalProjects: 15, ongoing: 8, completed: 5, delayed: 2, highRisk: 1, totalCost: 39400 },
    'Haryana': { totalProjects: 18, ongoing: 10, completed: 6, delayed: 2, highRisk: 1, totalCost: 51200 },
    'Chhattisgarh': { totalProjects: 16, ongoing: 9, completed: 5, delayed: 2, highRisk: 1, totalCost: 42100 },
    'Jharkhand': { totalProjects: 14, ongoing: 8, completed: 4, delayed: 2, highRisk: 2, totalCost: 38700 },
    'Uttarakhand': { totalProjects: 13, ongoing: 7, completed: 4, delayed: 2, highRisk: 1, totalCost: 34500 },
    'Himachal Pradesh': { totalProjects: 11, ongoing: 6, completed: 3, delayed: 2, highRisk: 1, totalCost: 28900 }
  };

  allStates.forEach(st => {
    if (defaults[st]) {
      map[st] = { stateName: st, ...defaults[st] };
    } else {
      map[st] = {
        stateName: st,
        totalProjects: Math.floor(Math.random() * 8) + 4,
        ongoing: Math.floor(Math.random() * 5) + 2,
        completed: Math.floor(Math.random() * 3) + 1,
        delayed: Math.floor(Math.random() * 3),
        highRisk: Math.floor(Math.random() * 2),
        totalCost: Math.floor(Math.random() * 15000) + 5000
      };
    }
  });

  return map;
}

export function getOverallPlatformStats() {
  const states = getStateAggregates();
  let totalProjects = 0;
  let ongoing = 0;
  let completed = 0;
  let delayed = 0;
  let highRisk = 0;
  let totalCost = 0;

  Object.values(states).forEach(s => {
    totalProjects += s.totalProjects;
    ongoing += s.ongoing;
    completed += s.completed;
    delayed += s.delayed;
    highRisk += s.highRisk;
    totalCost += s.totalCost;
  });

  return {
    totalProjects,
    ongoing,
    completed,
    delayed,
    highRisk,
    totalCostLakhCr: (totalCost / 100000).toFixed(2),
    totalCostCr: totalCost
  };
}

export function calculateDashboardSummary(projects = PROJECTS_MASTER) {
  const totalProjects = projects.length;
  let ongoing = 0;
  let completed = 0;
  let delayed = 0;
  let highRisk = 0;
  let totalOriginalCost = 0;
  let totalRevisedCost = 0;
  let totalExpenditure = 0;
  let totalProgressSum = 0;

  projects.forEach(p => {
    if (p.status === 'Completed') completed++;
    else if (p.status === 'Delayed') delayed++;
    else ongoing++;

    if (p.riskLevel === 'High' || p.riskLevel === 'Critical') highRisk++;

    const orig = p.approvedCost || p.estimatedCost || 0;
    const rev = p.currentCost || orig;
    const exp = p.expenditure !== undefined ? p.expenditure : Math.round(rev * ((p.progressPercent || 0) / 100));

    totalOriginalCost += orig;
    totalRevisedCost += rev;
    totalExpenditure += exp;
    totalProgressSum += (p.progressPercent || 0);
  });

  const averageProgress = totalProjects > 0 ? Math.round(totalProgressSum / totalProjects) : 0;

  return {
    totalProjects,
    ongoing,
    completed,
    delayed,
    highRisk,
    totalOriginalCost,
    totalRevisedCost,
    totalExpenditure,
    averageProgress
  };
}

