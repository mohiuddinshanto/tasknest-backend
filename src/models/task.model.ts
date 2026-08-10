import { connectDB } from '../config/db';
import { ITask } from '../types/task.types';

export const getTaskCollection = async () => {
  const db = await connectDB();
  return db.collection<ITask>('tasks');
};