import express, { Application } from 'express';
import cors from 'cors';
import { getTasks, getTaskById, createTask, updateTask, deleteTask } from './controllers/task.controller';
import { errorHandler } from './middleware/error.middleware';

const app: Application = express();

app.use(cors());
app.use(express.json());

// Task Routes
app.get('/api/tasks', getTasks);
app.get('/api/tasks/:id', getTaskById);
app.post('/api/tasks', createTask);
app.patch('/api/tasks/:id', updateTask);
app.delete('/api/tasks/:id', deleteTask);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('TaskNest Backend Server Running');
});

// Global Error Handler Middleware
app.use(errorHandler);

export default app;