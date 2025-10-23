// services/tasks.service.ts
import { Tasks } from '../models/tasks.models';
import { ITask } from '../types/tasks.types';

export class TasksService {
  public async getTasks(): Promise<ITask[]> {
    const tasks = await Tasks.find().lean(); 
    return tasks.map(task => ({
      id: task._id.toString(),
      title: task.title,
      description: task.description,
      status: task.status,
    }));
  }

  public async createTask(taskData: Omit<ITask, 'id'>): Promise<ITask> {
    const createdTask = await Tasks.create(taskData);
    return {
      id: createdTask._id.toString(),
      title: createdTask.title,
      description: createdTask.description,
      status: createdTask.status,
    };
  }

  public async updateTask(task: ITask): Promise<ITask | null> {
    const { id, ...updateData } = task;
    const updatedTask = await Tasks.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).lean();

    if (!updatedTask) return null;

    return {
      id: updatedTask._id.toString(),
      title: updatedTask.title,
      description: updatedTask.description,
      status: updatedTask.status,
    };
  }

  public async deleteTask(taskId: string): Promise<boolean> {
    const result = await Tasks.findByIdAndDelete(taskId);
    return result !== null;
  }
}