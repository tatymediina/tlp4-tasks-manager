import { Request, Response } from "express";
import { TasksService } from "../services/tasks.service";
import { ITask } from "../types/tasks.types";

const tasksService = new TasksService();

export class TasksController {
  public async getTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await tasksService.getTasks();
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
      res.status(500).json({ message: "Error al obtener las tareas" });
    }
  }

  public async createTask(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, status } = req.body;

      if (!title || !description) {
        res
          .status(400)
          .json({ message: "title y description son obligatorios" });
        return;
      }

      const taskData = { title, description, status: Boolean(status) };
      const createdTask = await tasksService.createTask(taskData);
      res.status(201).json(createdTask);
    } catch (error) {
      console.error("Error al crear las tareas:", error);
      res.status(500).json({ message: "Error al crear la tarea" });
    }
  }

  public async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;

      if (!id) {
        res.status(400).json({ message: "ID de tarea es requerido" });
        return;
      }

      if (
        title === undefined &&
        description === undefined &&
        status === undefined
      ) {
        res
          .status(400)
          .json({ message: "Al menos un campo debe actualizarse" });
        return;
      }

      const taskToUpdate: ITask = {
        id,
        title: title ?? "",
        description: description ?? "",
        status: status ?? false,
      };

      const updatedTask = await tasksService.updateTask(taskToUpdate);
      if (!updatedTask) {
        res.status(404).json({ message: "Tarea no encontrada" });
        return;
      }

      res.status(200).json(updatedTask);
    } catch (error) {
      console.error("Error al editar la tarea", error);
      res.status(500).json({ message: "Error al actualizar la tarea" });
    }
  }

  public async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: "ID de tarea es requerido" });
        return;
      }

      const result = await tasksService.deleteTask(id);
      if (!result) {
        res.status(404).json({ message: "Tarea no encontrada" });
        return;
      }

      res.status(200).json({ message: "Tarea eliminada correctamente" });
    } catch (error) {
      console.error("Error al eliminar la tarea", error);
      res.status(500).json({ message: "Error al eliminar la tarea" });
    }
  }
}
