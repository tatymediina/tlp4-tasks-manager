import type { ITask } from "../types/task";

const URI = "/api/tasks";

export const getAllTasks = async () => {
  try {
    const response = await fetch(URI);
    if (!response.ok) throw new Error("Error al obtener las tareas");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener las tareas");
  }
};

export const createTask = async (task: ITask) => {
  try {
    const response = await fetch(URI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error("Error al crear la tarea");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear la tarea");
  }
};

export const updateTask = async (id: string, task: ITask) => {
  try {
    const response = await fetch(`${URI}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error("Error al editar las tareas");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al editar las tareas");
  }
};

export const deleteTask = async (id: string) => {
  try {
    const response = await fetch(`${URI}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar la tarea");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al eliminar la tarea");
  }
};
