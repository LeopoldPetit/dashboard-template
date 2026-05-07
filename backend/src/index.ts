import express from 'express';
import cors from 'cors';

import { technicalRouter }   from './routes/technical';
import { projectRouter }     from './routes/project';
import { devopsRouter }      from './routes/devops';
import { businessRouter }    from './routes/business';
import { dashboardRouter }   from './routes/dashboard';
import { notificationsRouter } from './routes/notifications';
import { kpisRouter }        from './routes/kpis';

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());

app.use('/api/technical',    technicalRouter);
app.use('/api/project',      projectRouter);
app.use('/api/devops',       devopsRouter);
app.use('/api/business',     businessRouter);
app.use('/api/dashboard',    dashboardRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/kpis',         kpisRouter);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.info(`StreamFlow API listening on http://localhost:${PORT}`);
});
