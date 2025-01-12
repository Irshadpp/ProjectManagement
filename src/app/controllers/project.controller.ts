import { NextFunction, Request, Response } from "express";
import projectService from "../services/project.service";
import { HttpStatusCode, sendResponse } from "../utils/send-response";
import { BadRequestError } from "../errors";

export const createProject = async (req: Request, res:Response, next: NextFunction) =>{
    try {
        const creatorId = req.user?.id
        const newProject = await projectService.createProject({creatorId,...req.body});
        sendResponse(res, HttpStatusCode.CREATED, "Project created successfully", newProject)
    } catch (error) {
        next(error);
    }
}

export const editProject = async (req: Request, res:Response, next: NextFunction) =>{
    try {
        const {projectId} = req.params;
        const id = Number(projectId);
            if (!id || !Number.isInteger(id)) {
              throw new BadRequestError("Invalid or missing User ID");
            }
        const updatedProject = projectService.updateProjectById(id, req.body);
        sendResponse(res, HttpStatusCode.CREATED, "Project created successfully", updatedProject)
    } catch (error) {
        next(error);
    }
}

export const fetchAllProjects = async (req: Request, res:Response, next: NextFunction) =>{
    try {
       const projects = await projectService.getAllProjects();
        sendResponse(res, HttpStatusCode.CREATED, "Project created successfully", projects)
    } catch (error) {
        next(error);
    }
}
