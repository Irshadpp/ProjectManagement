import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../errors";
import taskService from "../services/task.service";
import { HttpStatusCode, sendResponse } from "../utils/send-response";

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.params;
    const projectIdNum = Number(projectId);
    if (!projectIdNum || !Number.isInteger(projectIdNum)) {
      throw new BadRequestError("Invalid or missing Project ID");
    }
    const newTask = await taskService.createTask({
      projectId: projectIdNum,
      ...req.body,
    });
    sendResponse(
      res,
      HttpStatusCode.CREATED,
      "Task created Successfully",
      newTask
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const fetchTasksByProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.params;
    const projectIdNum = Number(projectId);
    if (!projectIdNum || !Number.isInteger(projectIdNum)) {
      throw new BadRequestError("Invalid or missing Project ID");
    }
    const tasks = await taskService.findTasksByProject(projectIdNum);
    sendResponse(res, HttpStatusCode.OK, "Task fetched Successfully", tasks);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const editTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { taskId } = req.params;
    const taskIdNum = Number(taskId);
    if (!taskIdNum || !Number.isInteger(taskIdNum)) {
      throw new BadRequestError("Invalid or missing Project ID");
    }
    const updatedTask = await taskService.updateTaskById(taskIdNum, req.body);
    sendResponse(res, HttpStatusCode.OK, "Task updated Successfully", updatedTask);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { taskId } = req.params;
      const taskIdNum = Number(taskId);
      if (!taskIdNum || !Number.isInteger(taskIdNum)) {
        throw new BadRequestError("Invalid or missing Project ID");
      }
      const task = await taskService.findTaskById(taskIdNum);
      if(!task){
        throw new NotFoundError("Task not found")
      }
      await taskService.deleteTaskById(taskIdNum);
      sendResponse(res, HttpStatusCode.OK, "Task deleted Successfully");
    } catch (error) {
      console.log(error);
      next(error);
    }
  };