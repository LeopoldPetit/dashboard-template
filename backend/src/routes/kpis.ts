import { Router, Request, Response } from 'express';
import { pool } from '../db';

export const kpisRouter = Router();

kpisRouter.get('/summary', async (_req: Request, res: Response) => {
  const [summaryRes, metricsRes] = await Promise.all([
    pool.query<{
      id: number; generated_at: string; period: string;
      company: string; global_status: string;
    }>('SELECT id, generated_at, period, company, global_status FROM kpi_summary ORDER BY generated_at DESC LIMIT 1'),
    pool.query<{
      domain: string; metric_key: string; value: string;
      unit: string; status: string; threshold: string | null;
      summary_id: number;
    }>('SELECT summary_id, domain, metric_key, value, unit, status, threshold FROM kpi_metrics ORDER BY id'),
  ]);

  const s = summaryRes.rows[0];
  const metricsByDomain: Record<string, Record<string, unknown>> = {};

  for (const m of metricsRes.rows.filter((r) => r.summary_id === s.id)) {
    if (!metricsByDomain[m.domain]) metricsByDomain[m.domain] = {};
    metricsByDomain[m.domain][m.metric_key] = {
      value:     Number(m.value),
      unit:      m.unit,
      status:    m.status,
      ...(m.threshold !== null ? { threshold: Number(m.threshold) } : {}),
    };
  }

  res.json({
    generatedAt:  s.generated_at,
    period:       s.period,
    company:      s.company,
    globalStatus: s.global_status,
    ...metricsByDomain,
  });
});
