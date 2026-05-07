import { Router, Request, Response } from 'express';
import { pool } from '../db';

export const projectRouter = Router();

projectRouter.get('/overview', async (_req: Request, res: Response) => {
  const { rows } = await pool.query<{
    bugs_detected: number; bugs_fixed: number; bugs_open: number; fix_rate: string;
    features_delivered: number; bug_rate: string; period: string;
  }>('SELECT bugs_detected, bugs_fixed, bugs_open, fix_rate, features_delivered, bug_rate, period FROM project_overview ORDER BY recorded_at DESC LIMIT 1');
  const r = rows[0];
  res.json({
    bugs: { detected: r.bugs_detected, fixed: r.bugs_fixed, open: r.bugs_open, fixRate: Number(r.fix_rate) },
    features: { delivered: r.features_delivered, bugRate: Number(r.bug_rate) },
    period: r.period,
  });
});

projectRouter.get('/sprints', async (_req: Request, res: Response) => {
  const [sprints, summary] = await Promise.all([
    pool.query<{
      sprint_id: number; name: string; short_name: string;
      story_points_planned: number; story_points_done: number;
      velocity_percent: string; status: string;
    }>('SELECT sprint_id, name, short_name, story_points_planned, story_points_done, velocity_percent, status FROM project_sprints ORDER BY sprint_id'),
    pool.query<{
      total_planned: number; total_done: number;
      average_velocity_percent: string; trend: string;
    }>('SELECT total_planned, total_done, average_velocity_percent, trend FROM project_sprints_summary ORDER BY recorded_at DESC LIMIT 1'),
  ]);
  const s = summary.rows[0];
  res.json({
    sprints: sprints.rows.map((r) => ({
      id: r.sprint_id, name: r.name, shortName: r.short_name,
      storyPointsPlanned: r.story_points_planned, storyPointsDone: r.story_points_done,
      velocityPercent: Number(r.velocity_percent), status: r.status,
    })),
    summary: {
      totalPlanned: s.total_planned, totalDone: s.total_done,
      averageVelocityPercent: Number(s.average_velocity_percent), trend: s.trend,
    },
  });
});
