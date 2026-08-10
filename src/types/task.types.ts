import { ObjectId } from 'mongodb';

export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in_progress' | 'completed';

export interface ITask {
  _id?: ObjectId;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  dueDate?: string;
  createdAt: Date;
  updatedAt: Date;
}