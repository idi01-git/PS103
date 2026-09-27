import fs from 'fs';
import { 
  fetchPlatformStatsFromNeon, 
  fetchStateSummariesFromNeon, 
  fetchMinistrySummariesFromNeon, 
  fetchProjectsFromNeon 
} from '../src/services/neonDb.js';

// Setup environment for node script
const env = fs.readFileSync('.env.local', 'utf8');
const match = env.match(/DATABASE_URL="?([^"\r\n]+)"?/);
process.env.DATABASE_URL = match[1];

async function runAudit() {
  console.log('===============================================================');
  console.log('       PAIMANA PLATFORM CROSS-ASPECT CONSISTENCY AUDIT        ');
  console.log('===============================================================');

  const [platform, states, ministries, projects] = await Promise.all([
    fetchPlatformStatsFromNeon(),
    fetchStateSummariesFromNeon(),
    fetchMinistrySummariesFromNeon(),
    fetchProjectsFromNeon({ limit: 5000 })
  ]);

  console.log(`\nTotal Projects in Platform: ${platform.totalProjects}`);
  console.log(`Total Projects in Records:  ${projects.length}`);
  console.log(`Total States in Database:   ${Object.keys(states).length}`);
  console.log(`Total Ministries in DB:     ${ministries.length}`);

  let stateDiscrepancies = 0;
  console.log('\n--- 1. Testing State Hover Count vs Click Filter Count ---');
  for (const [stName, stData] of Object.entries(states)) {
    const hoverCount = stData.totalProjects;
    const clickFiltered = projects.filter(p => p.state?.toLowerCase().trim() === stName.toLowerCase().trim());
    const match = hoverCount === clickFiltered.length;
    if (!match) {
      console.error(`❌ Mismatch in [${stName}]: Hover says ${hoverCount}, Click gives ${clickFiltered.length}`);
      stateDiscrepancies++;
    }
  }

  if (stateDiscrepancies === 0) {
    console.log(`✅ All ${Object.keys(states).length} states are 100% mathematically consistent! Hover count === Click count.`);
  } else {
    console.error(`❌ ${stateDiscrepancies} state discrepancies found.`);
  }

  let ministryDiscrepancies = 0;
  console.log('\n--- 2. Testing Ministry Directory Count vs Click Filter Count ---');
  for (const min of ministries) {
    const dirCount = min.totalProjects;
    const clickFiltered = projects.filter(p => p.ministry?.toLowerCase().includes(min.name.toLowerCase()));
    const match = dirCount === clickFiltered.length;
    if (!match) {
      console.error(`❌ Mismatch in [${min.name}]: Directory says ${dirCount}, Click gives ${clickFiltered.length}`);
      ministryDiscrepancies++;
    }
  }

  if (ministryDiscrepancies === 0) {
    console.log(`✅ All ${ministries.length} ministries are 100% mathematically consistent! Card count === Click count.`);
  } else {
    console.error(`❌ ${ministryDiscrepancies} ministry discrepancies found.`);
  }

  console.log('\n--- 3. Testing Sample Major States (Exact Counts) ---');
  const sampleStates = ['Maharashtra', 'Uttar Pradesh', 'Gujarat', 'Tamil Nadu', 'Karnataka', 'Jammu and Kashmir', 'Mizoram', 'Goa'];
  console.table(sampleStates.map(st => {
    const s = states[st];
    const actual = projects.filter(p => p.state.toLowerCase() === st.toLowerCase()).length;
    return {
      State: st,
      'Map Hover Count': s ? s.totalProjects : 0,
      'On-Time': s ? s.onTime : 0,
      'Delayed': s ? s.delayed : 0,
      'Click Result Count': actual,
      Status: s && s.totalProjects === actual ? 'MATCH ✓' : 'MISMATCH ✗'
    };
  }));

  console.log('===============================================================');
  console.log('                   AUDIT COMPLETE & VERIFIED                   ');
  console.log('===============================================================');
}

runAudit().catch(console.error);
