import { Request, Response, NextFunction } from 'express';
import { ObjectId, Filter } from 'mongodb';
import { getTaskCollection } from '../models/task.model';
import { ITask } from '../types/task.types';

// 1. Get All Tasks (With Search, Priority & Status Filter)
export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const tasksCollection = await getTaskCollection();
    const { search, priority, status } = req.query;

    const filter: Filter<ITask> = {};

    if (search && typeof search === 'string') {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (priority && typeof priority === 'string') {
      filter.priority = priority as ITask['priority'];
    }

    if (status && typeof status === 'string') {
      filter.status = status as ITask['status'];
    }

    const tasks = await tasksCollection
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// 2. Get Single Task By ID
export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };

    if (!id || !ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid or missing Task ID' });
      return;
    }

    const tasksCollection = await getTaskCollection();
    const task = await tasksCollection.findOne({ _id: new ObjectId(id) });

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// 3. Create Task
export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const tasksCollection = await getTaskCollection();
    const taskData: Omit<ITask, '_id' | 'createdAt' | 'updatedAt'> = req.body;

    const newTask: ITask = {
      ...taskData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await tasksCollection.insertOne(newTask);
    res.status(201).json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    next(error);
  }
};

// 4. Update Task
export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };

    if (!id || !ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid or missing Task ID' });
      return;
    }

    const tasksCollection = await getTaskCollection();
    const updatedFields: Partial<ITask> = req.body;

    const result = await tasksCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updatedFields, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res
      .status(200)
      .json({ success: true, modifiedCount: result.modifiedCount });
  } catch (error) {
    next(error);
  }
};

// 5. Delete Task
export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };

    if (!id || !ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid or missing Task ID' });
      return;
    }

    const tasksCollection = await getTaskCollection();
    const result = await tasksCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res
      .status(200)
      .json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};