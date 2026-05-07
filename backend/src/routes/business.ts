import { Router, Request, Response } from 'express';
import { pool } from '../db';

export const businessRouter = Router();

businessRouter.get('/overview', async (_req: Request, res: Response) => {
  const { rows } = await pool.query<{
    revenue_total: string; revenue_currency: string; revenue_period: string;
    arpu_value: string; arpu_currency: string; subscription_price: string;
    conv_visitors: number; conv_new_subs: number; conv_rate: string;
    churn_users: number; churn_rate: string; retention_rate: string;
  }>('SELECT * FROM business_overview ORDER BY recorded_at DESC LIMIT 1');
  const r = rows[0];
  res.json({
    revenue: { total: Number(r.revenue_total), currency: r.revenue_currency, period: r.revenue_period },
    arpu: { value: Number(r.arpu_value), currency: r.arpu_currency },
    subscriptionPrice: Number(r.subscription_price),
    conversions: { visitors: r.conv_visitors, newSubscriptions: r.conv_new_subs, conversionRate: Number(r.conv_rate) },
    churn: { churnedUsers: r.churn_users, churnRate: Number(r.churn_rate), retentionRate: Number(r.retention_rate) },
  });
});

businessRouter.get('/users', async (_req: Request, res: Response) => {
  const [users, evolution] = await Promise.all([
    pool.query<{
      total: number; active_monthly: number; start_of_month: number;
      end_of_month: number; new_this_month: number; churned_this_month: number;
    }>('SELECT total, active_monthly, start_of_month, end_of_month, new_this_month, churned_this_month FROM business_users ORDER BY recorded_at DESC LIMIT 1'),
    pool.query<{ label: string; value: number }>(
      'SELECT label, value FROM business_user_evolution ORDER BY id',
    ),
  ]);
  const u = users.rows[0];
  res.json({
    users: {
      total: u.total, activeMonthly: u.active_monthly,
      startOfMonth: u.start_of_month, endOfMonth: u.end_of_month,
      newThisMonth: u.new_this_month, churnedThisMonth: u.churned_this_month,
    },
    evolution: evolution.rows.map((r) => ({ label: r.label, value: r.value })),
  });
});
