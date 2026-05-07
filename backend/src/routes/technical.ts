import { Router, Request, Response } from 'express';
import { pool } from '../db';

export const technicalRouter = Router();

// GET /api/technical/overview
technicalRouter.get('/overview', async (_req: Request, res: Response) => {
  const { rows } = await pool.query<{
    total_requests: string; error_requests: string; error_rate: string;
    uptime_total_hours: string; uptime_downtime_h: string; uptime_percent: string;
    mttr_avg_hours: string; rt_average_ms: number; rt_p95_ms: number;
  }>(`SELECT total_requests, error_requests, error_rate,
         uptime_total_hours, uptime_downtime_h, uptime_percent,
         mttr_avg_hours, rt_average_ms, rt_p95_ms
      FROM technical_overview ORDER BY recorded_at DESC LIMIT 1`);
  const r = rows[0];
  res.json({
    totalRequests: Number(r.total_requests),
    errorRequests: Number(r.error_requests),
    errorRate:     Number(r.error_rate),
    uptime: {
      totalHours:    Number(r.uptime_total_hours),
      downtimeHours: Number(r.uptime_downtime_h),
      uptimePercent: Number(r.uptime_percent),
    },
    mttr: { averageHours: Number(r.mttr_avg_hours), unit: 'hours' },
    responseTimes: { average: r.rt_average_ms, p95: r.rt_p95_ms, unit: 'ms' },
  });
});

// GET /api/technical/incidents
technicalRouter.get('/incidents', async (_req: Request, res: Response) => {
  const [incidents, summary] = await Promise.all([
    pool.query<{
      id: number; title: string; duration_hours: string;
      duration_minutes: number; severity: string; status: string;
    }>('SELECT id, title, duration_hours, duration_minutes, severity, status FROM technical_incidents ORDER BY id'),
    pool.query<{
      total: number; total_downtime_hours: string; mttr_hours: string; period_days: number;
    }>('SELECT total, total_downtime_hours, mttr_hours, period_days FROM technical_incidents_summary ORDER BY recorded_at DESC LIMIT 1'),
  ]);
  const s = summary.rows[0];
  res.json({
    incidents: incidents.rows.map((r) => ({
      id: r.id, title: r.title,
      durationHours: Number(r.duration_hours), durationMinutes: r.duration_minutes,
      severity: r.severity, status: r.status,
    })),
    summary: {
      total: s.total, totalDowntimeHours: Number(s.total_downtime_hours),
      mttrHours: Number(s.mttr_hours), periodDays: s.period_days,
    },
  });
});

// GET /api/technical/response-times
technicalRouter.get('/response-times', async (_req: Request, res: Response) => {
  const [samples, stats] = await Promise.all([
    pool.query<{ sample_index: number; ms: number }>(
      'SELECT sample_index, ms FROM technical_response_time_samples ORDER BY sample_index',
    ),
    pool.query<{
      min_ms: number; max_ms: number; average_ms: number;
      p50_ms: number; p90_ms: number; p95_ms: number;
    }>('SELECT min_ms, max_ms, average_ms, p50_ms, p90_ms, p95_ms FROM technical_response_time_stats ORDER BY recorded_at DESC LIMIT 1'),
  ]);
  const s = stats.rows[0];
  res.json({
    samples: samples.rows.map((r) => ({ index: r.sample_index, ms: r.ms })),
    stats: { min: s.min_ms, max: s.max_ms, average: s.average_ms, p50: s.p50_ms, p90: s.p90_ms, p95: s.p95_ms, unit: 'ms' },
  });
});
