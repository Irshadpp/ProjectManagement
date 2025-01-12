import { Project } from "../models";

export interface IProjectService {
  createProject(projectData: Partial<Project>): Promise<Project>;
  findProjectById(id: number): Promise<Project | null>;
  updateProjectById(id: number, updateData: Partial<Project>): Promise<Project | null>;
  deleteProjectById(id: number): Promise<void>;
  getAllProjects(): Promise<Project[]>;
  findProjectsByCreator(creatorId: number): Promise<Project[]>;
}
