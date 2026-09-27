import { neon } from '@neondatabase/serverless';
import fs from 'fs';

async function main() {
  const env = fs.readFileSync('.env.local', 'utf8');
  const dbUrl = env.match(/DATABASE_URL="?([^"\r\n]+)"?/)[1];
  const sql = neon(dbUrl);

  console.time('fetch_all_4547');
  const rows = await sql`
    SELECT 
      p.project_id,
      p.project_name,
      p.agency,
      p.state,
      p.ministry,
      p.original_cost,
      p.anticipated_cost,
      p.cost_overrun_pct,
      p.delay_months,
      p.physical_progress,
      pred.risk_score as risk_score_18m,
      pred.risk_band as risk_band_18m,
      pred.predicted_delay_months as pred_delay_18m
    FROM projects p
    LEFT JOIN predictions pred ON p.project_id = pred.project_id AND pred.horizon = '18m'
    ORDER BY p.anticipated_cost DESC;
  `;
  console.timeEnd('fetch_all_4547');

  const jsonStr = JSON.stringify(rows);
  console.log('Total rows fetched:', rows.length);
  console.log('Raw JSON size in KB:', (jsonStr.length / 1024).toFixed(1), 'KB');
  console.log('Sample row:', rows[0]);
}

main().catch(console.error);
