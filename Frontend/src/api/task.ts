import type { ITask } from "../types/task";

const URI = 'http://localhost:3402/api/tasks';

export const getAllTasks = async () => {
    try {
        const response = await fetch(`${URI}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }

        });

        const data = response.json();

        if(!response.ok){
            throw new Error('Error al obtener las tareas');
        }
        return data;
        
    } catch (error) {
        console.log(error);
       throw new Error('Error al obtener las tareas');
    }
}

export const createTask = async (task: ITask) => {
    try {
        const response = await fetch(`${URI}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Error al crear la tarea');
    }

}

export const deleteTask = async (id: string) => {
    try {
        const response = await fetch(`${URI}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Error al eliminar la tarea');
    }
}

export const updateTask = async (id: string, task:ITask) => {
    try {
        const response = await fetch(`${URI}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Error al actualizar la tarea');
    }
}