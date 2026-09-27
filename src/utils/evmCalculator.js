// PAIMANA - Layer 1 Statistical Baseline: Earned Value Management (EVM) Calculator
// Computes Planned Value (PV), Earned Value (EV), Actual Cost (AC), CPI, SPI, CV, SV, and EAC from real project data

export function computeEVM(project) {
  if (!project) return null;

  const approvedCost = project.approvedCost || project.estimatedCost || 1000;
  const currentCost = project.currentCost || approvedCost;
  const progressPct = project.progressPercent || 0;
  const timeDelay = project.timeDelayMonths || 0;

  // 1. Planned Value (PV): Budgeted cost of work scheduled
  // If delayed, planned progress should have been higher by roughly delay ratio
  const plannedProgressPct = Math.min(100, progressPct + (timeDelay > 0 ? Math.min(30, timeDelay * 2.2) : 0));
  const plannedValue = Math.round(approvedCost * (plannedProgressPct / 100));

  // 2. Earned Value (EV): Budgeted cost of work performed
  const earnedValue = Math.round(approvedCost * (progressPct / 100));

  // 3. Actual Cost (AC): Actual expenditure incurred
  const actualCost = project.expenditure !== undefined 
    ? project.expenditure 
    : Math.round(currentCost * (progressPct / 100) * (timeDelay > 0 ? 1.14 : 1.0));

  // 4. Cost Variance (CV) = EV - AC (Negative means over budget)
  const costVariance = earnedValue - actualCost;

  // 5. Schedule Variance (SV) = EV - PV (Negative means behind schedule)
  const scheduleVariance = earnedValue - plannedValue;

  // 6. Cost Performance Index (CPI) = EV / AC (< 1.0 means over budget)
  const cpi = actualCost > 0 ? Number((earnedValue / actualCost).toFixed(2)) : 1.0;

  // 7. Schedule Performance Index (SPI) = EV / PV (< 1.0 means behind schedule)
  const spi = plannedValue > 0 ? Number((earnedValue / plannedValue).toFixed(2)) : 1.0;

  // 8. Estimate at Completion (EAC) = approvedCost / CPI
  const eac = cpi > 0 ? Math.round(approvedCost / cpi) : currentCost;

  // 9. Variance at Completion (VAC) = approvedCost - EAC
  const vac = approvedCost - eac;

  // 10. To-Complete Performance Index (TCPI)
  const remainingWork = approvedCost - earnedValue;
  const remainingBudget = approvedCost - actualCost;
  const tcpi = remainingBudget > 0 ? Number((remainingWork / remainingBudget).toFixed(2)) : 1.5;

  return {
    plannedValue,
    earnedValue,
    actualCost,
    costVariance,
    scheduleVariance,
    cpi,
    spi,
    eac,
    vac,
    tcpi,
    plannedProgressPct: Math.round(plannedProgressPct),
    actualProgressPct: progressPct,
    status: {
      cost: cpi >= 1.0 ? 'Under / On Budget' : cpi >= 0.85 ? 'Moderate Cost Overrun' : 'Severe Cost Overrun',
      schedule: spi >= 1.0 ? 'Ahead / On Schedule' : spi >= 0.85 ? 'Moderate Schedule Slippage' : 'Critical Schedule Lag'
    }
  };
}
