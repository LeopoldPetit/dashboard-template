import { Router, Request, Response } from 'express';
import { pool } from '../db';

export const devopsRouter = Router();

devopsRouter.get('/overview', async (_req: Request, res: Response) => {
  const { rows } = await pool.query<{
    deploy_total: number; deploy_successful: number; deploy_failed: number;
    change_failure_rate: string; frequency_per_day: string; period_days: number;
    lead_time_avg_days: number;
    team_developers: number; team_devops: number; team_product_owner: number; team_cto: number;
  }>('SELECT * FROM devops_overview ORDER BY recorded_at DESC LIMIT 1');
  const r = rows[0];
  res.json({
    deployments: {
      total: r.deploy_total, successful: r.deploy_successful, failed: r.deploy_failed,
      changeFailureRate: Number(r.change_failure_rate),
      frequencyPerDay:   Number(r.frequency_per_day),
      periodDays:        r.period_days,
    },
    leadTime: { averageDays: r.lead_time_avg_days, unit: 'days' },
    team: {
      developers: r.team_developers, devops: r.team_devops,
      productOwner: r.team_product_owner, cto: r.team_cto,
    },
  });
});
