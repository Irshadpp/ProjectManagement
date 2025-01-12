import { Task } from "../models";
import { ITaskService } from "./task.service.interface";

export class TaskService implements ITaskService {
  async createTask(taskData: Partial<Task>): Promise<Task> {
    return Task.create(taskData);
  }

  async findTaskById(id: number): Promise<Task | null> {
    return Task.findByPk(id);
  }

  async updateTaskById(id: number, updateData: Partial<Task>): Promise<Task | null> {
    const task = await Task.findByPk(id);
    if (!task) return null;

    await task.update(updateData);
    return task;
  }

  async deleteTaskById(id: number): Promise<void> {
    const task = await Task.findByPk(id);
    if (task) {
      await task.destroy();
    }
  }

  async findTasksByProject(projectId: number): Promise<Task[]> {
    return Task.findAll({ where: { projectId } });
  }
}

export default new TaskService();
