import fs from 'fs';
import { neon } from '@neondatabase/serverless';

async function testQueries() {
  const env = fs.readFileSync('.env.local', 'utf8');
  const dbUrl = env.match(/DATABASE_URL="?([^"\r\n]+)"?/)[1];
  const sql = neon(dbUrl);

  console.log('--- 1. Testing State Aggregates from Neon ---');
  const stateAggs = await sql`
    SELECT 
      state,
      COUNT(*) as total_projects,
      ROUND(SUM(anticipated_cost), 0) as total_amount_cr,
      COUNT(CASE WHEN delay_months <= 0 THEN 1 END) as on_time_projects,
      COUNT(CASE WHEN delay_months > 0 THEN 1 END) as delayed_projects
    FROM projects
    GROUP BY state
    ORDER BY total_projects DESC
    LIMIT 5;
  `;
  console.table(stateAggs);

  console.log('\n--- 2. Testing Project Search from Neon ---');
  const sampleProjects = await sql`
    SELECT p.project_id, p.project_name, p.state, p.ministry, p.anticipated_cost, p.delay_months,
           pred.risk_score as risk_score_18m, pred.predicted_delay_months as pred_delay_18m
    FROM projects p
    LEFT JOIN predictions pred ON p.project_id = pred.project_id AND pred.horizon = '18m'
    LIMIT 3;
  `;
  console.table(sampleProjects);

  console.log('\n--- 3. Testing Single Project Multi-Horizon Forecasts ---');
  const singleProj = sampleProjects[0]?.project_id;
  if (singleProj) {
    const preds = await sql`
      SELECT horizon, forecast_date, risk_score, risk_band, predicted_delay_months, predicted_cost_increase_pct
      FROM predictions
      WHERE project_id = ${singleProj}
      ORDER BY 
        CASE horizon 
          WHEN '3m' THEN 1 
          WHEN '6m' THEN 2 
          WHEN '12m' THEN 3 
          WHEN '18m' THEN 4 
          ELSE 5 
        END;
    `;
    console.log(`Predictions for Project ${singleProj}:`);
    console.table(preds);
  }
}

testQueries().catch(console.error);
