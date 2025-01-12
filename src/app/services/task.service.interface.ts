import { Task } from "../models";

export interface ITaskService {
  createTask(taskData: Partial<Task>): Promise<Task>;
  findTaskById(id: number): Promise<Task | null>;
  updateTaskById(id: number, updateData: Partial<Task>): Promise<Task | null>;
  deleteTaskById(id: number): Promise<void>;
  findTasksByProject(projectId: number): Promise<Task[]>;
}
