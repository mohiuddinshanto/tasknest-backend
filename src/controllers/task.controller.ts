import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getTaskCollection } from '../models/task.model';

// 1. Get All Tasks (With Search, Priority & Status Filter)
export const getTasks = async (req: Request, res: Response) => {
  const tasksCollection = await getTaskCollection();
  const { search, priority, status } = req.query;

  let query: any = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  if (priority) {
    query.priority = priority;
  }

  if (status) {
    query.status = status;
  }

  const tasks = await tasksCollection.find(query).sort({ createdAt: -1 }).toArray();
  res.send(tasks);
};

// 2. Get Single Task By ID
export const getTaskById = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const tasksCollection = await getTaskCollection();
  const query = { _id: new ObjectId(id) };
  const task = await tasksCollection.findOne(query);
  res.send(task);
};

// 3. Create Task
export const createTask = async (req: Request, res: Response) => {
  const tasksCollection = await getTaskCollection();
  const task = req.body;

  task.createdAt = new Date();
  task.updatedAt = new Date();

  const result = await tasksCollection.insertOne(task);
  res.send(result);
};

// 4. Update Task
export const updateTask = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const tasksCollection = await getTaskCollection();
  const updatedTask = req.body;

  const filter = { _id: new ObjectId(id) };
  const updatedDoc = {
    $set: {
      ...updatedTask,
      updatedAt: new Date(),
    },
  };

  const result = await tasksCollection.updateOne(filter, updatedDoc);
  res.send(result);
};

// 5. Delete Task
export const deleteTask = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const tasksCollection = await getTaskCollection();
  const query = { _id: new ObjectId(id) };
  const result = await tasksCollection.deleteOne(query);
  res.send(result);
};