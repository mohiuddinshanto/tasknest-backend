import express, { Application } from 'express';
import cors from 'cors';
import taskRoutes from './routes/task.routes';
import { errorHandler } from './middleware/error.middleware';

const app: Application = express();

app.use(cors());
app.use(express.json());

// Main Routes
app.use('/api/tasks', taskRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('TaskNest Backend Server Running');
});

// Global Error Handler Middleware
app.use(errorHandler);

export default app;