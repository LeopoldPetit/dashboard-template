import { Router, Request, Response } from 'express';
import { pool } from '../db';

export const dashboardRouter = Router();

dashboardRouter.get('/overview', async (_req: Request, res: Response) => {
  const [kpis, requestVolume, weeklyDeploys, recentActivity] = await Promise.all([
    pool.query<{
      title: string; value: string; unit: string | null;
      status: string; trend: string | null; description: string | null;
    }>('SELECT title, value, unit, status, trend, description FROM dashboard_kpis ORDER BY id'),
    pool.query<{ time_label: string; requests: number }>(
      'SELECT time_label, requests FROM dashboard_request_volume ORDER BY id',
    ),
    pool.query<{ day_label: string; deploys: number; failures: number }>(
      'SELECT day_label, deploys, failures FROM dashboard_weekly_deploys ORDER BY id',
    ),
    pool.query<{ label: string; time_label: string; severity: string }>(
      'SELECT label, time_label, severity FROM dashboard_recent_activity ORDER BY id',
    ),
  ]);

  res.json({
    kpis: kpis.rows.map((r) => ({
      title: r.title, value: Number(r.value), unit: r.unit,
      status: r.status, trend: r.trend !== null ? Number(r.trend) : undefined,
      description: r.description ?? undefined,
    })),
    requestVolume: requestVolume.rows.map((r) => ({ time: r.time_label, requests: r.requests })),
    weeklyDeploys: weeklyDeploys.rows.map((r) => ({ day: r.day_label, deploys: r.deploys, failures: r.failures })),
    recentActivity: recentActivity.rows.map((r) => ({ label: r.label, time: r.time_label, severity: r.severity })),
  });
});
