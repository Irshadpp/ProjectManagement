import { Project } from "../models";
import { IProjectService } from "./project.services.interface";

export class ProjectService implements IProjectService {
  async createProject(projectData: Partial<Project>): Promise<Project> {
    return Project.create(projectData);
  }

  async findProjectById(id: number): Promise<Project | null> {
    return Project.findByPk(id);
  }

  async updateProjectById(id: number, updateData: Partial<Project>): Promise<Project | null> {
    const project = await Project.findByPk(id);
    if (!project) return null;

    await project.update(updateData);
    return project;
  }

  async deleteProjectById(id: number): Promise<void> {
    const project = await Project.findByPk(id);
    if (project) {
      await project.destroy();
    }
  }

  async getAllProjects(): Promise<Project[]> {
    return Project.findAll();
  }

  async findProjectsByCreator(creatorId: number): Promise<Project[]> {
    return Project.findAll({ where: { creatorId } });
  }
}

export default new ProjectService();
