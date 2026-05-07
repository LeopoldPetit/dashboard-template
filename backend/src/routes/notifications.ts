import { Router, Request, Response } from 'express';
import { pool } from '../db';

export const notificationsRouter = Router();

notificationsRouter.get('/', async (_req: Request, res: Response) => {
  const { rows } = await pool.query<{
    id: number; text: string; time_label: string; severity: string; is_read: boolean;
  }>('SELECT id, text, time_label, severity, is_read FROM notifications ORDER BY id');

  res.json({
    notifications: rows.map((r) => ({
      id: r.id, text: r.text, time: r.time_label, severity: r.severity,
    })),
    unreadCount: rows.filter((r) => !r.is_read).length,
  });
});
