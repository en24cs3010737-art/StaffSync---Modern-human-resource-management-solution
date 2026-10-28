import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

// Phase 1 smoke endpoint. Feature routes and database-backed health checks are added later.
app.get('/api/v1/health', (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      service: 'staffsync-api',
      status: 'ok',
      phase: 'foundation',
      database: 'not-connected-in-phase-1',
    },
  });
});

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: { code: 'NOT_FOUND', message: 'The requested resource was not found.' },
  });
});

export default app;
