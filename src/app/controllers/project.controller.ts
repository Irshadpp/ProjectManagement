import { NextFunction, Request, Response } from "express";
import projectService from "../services/project.service";
import { HttpStatusCode, sendResponse } from "../utils/send-response";
import { BadRequestError, NotFoundError } from "../errors";
import userService from "../services/user.service";

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const creatorId = req.user?.id;
    const newProject = await projectService.createProject({
      creatorId,
      ...req.body,
    });
    sendResponse(
      res,
      HttpStatusCode.CREATED,
      "Project created successfully",
      newProject
    );
  } catch (error) {
    next(error);
  }
};

export const editProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.params;
    const id = Number(projectId);
    if (!id || !Number.isInteger(id)) {
      throw new BadRequestError("Invalid or missing User ID");
    }
    const updatedProject = projectService.updateProjectById(id, req.body);
    sendResponse(
      res,
      HttpStatusCode.CREATED,
      "Project created successfully",
      updatedProject
    );
  } catch (error) {
    next(error);
  }
};

export const fetchAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await projectService.getAllProjects();
    sendResponse(
      res,
      HttpStatusCode.CREATED,
      "Projects fetched successfully",
      projects
    );
  } catch (error) {
    next(error);
  }
};

export const fetchProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.params;
    const id = Number(projectId);
    if (!id || !Number.isInteger(id)) {
      throw new BadRequestError("Invalid or missing User ID");
    }
    const project = await projectService.findProjectById(id);
    if (!project) {
      throw new NotFoundError("Project not found");
    }
    sendResponse(
      res,
      HttpStatusCode.CREATED,
      "Project fetched successfully",
      project
    );
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.params;
    const id = Number(projectId);

    if (!id || !Number.isInteger(id)) {
      throw new BadRequestError("Invalid or missing Project ID");
    }

    const project = await projectService.findProjectById(id);
    if (!project) {
      throw new NotFoundError("Project not found");
    }

    await projectService.deleteProjectById(id);

    sendResponse(res, HttpStatusCode.OK, "Project deleted successfully");
  } catch (error) {
    next(error);
  }
};


export const assignUserToProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const {projectId} = req.params;
      const { userId } = req.body;
  
      const userIdNum = Number(userId);
      const projectIdNum = Number(projectId);
      if (!userIdNum || !Number.isInteger(userIdNum)) {
        throw new BadRequestError("Invalid or missing User ID");
      }
      if (!projectIdNum || !Number.isInteger(projectIdNum)) {
        throw new BadRequestError("Invalid or missing Project ID");
      }

      const user = await userService.findUserById(userIdNum);
      if (!user) {
        throw new NotFoundError("User not found");
      }
  
      const project = await projectService.findProjectById(projectIdNum);
      if (!project) {
        throw new NotFoundError("Project not found");
      }
  
      // Assign user to project
      await user.addProject(project); // Sequelize helper method
  
      // Send response
      sendResponse(
        res,
        HttpStatusCode.OK,
        "User assigned to project successfully"
      );
    } catch (error) {
      next(error);
    }
  };
  