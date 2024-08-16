import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes';
import articleRoutes from './routes/articleRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app: Express = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Knowledge Engineering API');
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

export default app;