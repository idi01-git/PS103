import { neon } from '@neondatabase/serverless';
import fs from 'fs';

async function testEnhancedNeon() {
  const env = fs.readFileSync('.env.local', 'utf8');
  const dbUrl = env.match(/DATABASE_URL="?([^"\r\n]+)"?/)[1];
  const sql = neon(dbUrl);

  const ministries = await sql`
    SELECT * FROM ministry_summaries ORDER BY total_cost_cr DESC;
  `;
  console.log(`Fetched ${ministries.length} ministries from Neon.`);
  console.table(ministries.slice(0, 5));

  const states = await sql`
    SELECT * FROM state_summaries ORDER BY total_projects DESC LIMIT 5;
  `;
  console.log(`Fetched top states from Neon:`);
  console.table(states);

  const projects = await sql`
    SELECT p.*, pred.risk_score as risk_score_18m, pred.risk_band as risk_band_18m, pred.predicted_delay_months as pred_delay_18m
    FROM projects p
    LEFT JOIN predictions pred ON p.project_id = pred.project_id AND pred.horizon = '18m'
    WHERE p.state = 'Maharashtra'
    ORDER BY p.anticipated_cost DESC
    LIMIT 3;
  `;
  console.log(`Fetched sample Maharashtra projects from Neon:`);
  console.table(projects.map(p => ({ id: p.project_id, name: p.project_name.slice(0, 40), cost: p.anticipated_cost, delay: p.delay_months, risk: p.risk_score_18m })));
}

testEnhancedNeon().catch(console.error);
