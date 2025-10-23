import { useState } from "react";
import { deleteTask, updateTask } from "../api/task";
import type { ITask } from "../types/task";

interface Props {
  tasks: ITask[];
  onTaskUpdated: () => void;
  onEditTask: (task: ITask) => void;
}

export default function TaskList({ tasks, onTaskUpdated, onEditTask }: Props) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleDelete = async (id?: string) => {
    if (!id) return;
    
    setDeletingId(id);
    try {
      await deleteTask(id);
      onTaskUpdated();
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggle = async (task: ITask) => {
    if (!task.id) return;
    
    setTogglingId(task.id);
    try {
      await updateTask(task.id, { ...task, status: !task.status });
      onTaskUpdated();
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    } finally {
      setTogglingId(null);
    }
  };

  const getStatusBadge = (status: boolean) => {
    return status ? (
      <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
        Completada
      </span>
    ) : (
      <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30">
        Pendiente
      </span>
    );
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-400 mb-2">
          No hay tareas
        </h3>
        <p className="text-gray-500">
          ¡Comienza agregando tu primera tarea!
        </p>
      </div>
    );
  }

  // Separar tareas completadas y pendientes
  const pendingTasks = tasks.filter(task => !task.status);
  const completedTasks = tasks.filter(task => task.status);

  const renderTaskCard = (task: ITask) => (
    <div
      key={task.id}
      className={`p-5 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
        task.status 
          ? "border-green-500/30 bg-green-500/5" 
          : "border-gray-600 bg-gray-800/40 hover:border-purple-500/50"
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <h2 className={`text-lg font-bold wrap-break-word flex-1 ${
          task.status ? "line-through text-gray-400" : "text-white"
        }`}>
          {task.title}
        </h2>
        {getStatusBadge(task.status)}
      </div>
      
      {task.description && (
        <p className={`text-gray-300 mb-4 wrap-break-word ${
          task.status ? "line-through" : ""
        }`}>
          {task.description}
        </p>
      )}

      <div className="flex justify-between items-center pt-3 border-t border-gray-700/50">
        <button
          onClick={() => handleToggle(task)}
          disabled={togglingId === task.id}
          className="text-sm text-purple-400 hover:text-purple-300 disabled:opacity-50 transition-colors flex items-center gap-1"
        >
          {togglingId === task.id ? (
            <div className="w-3 h-3 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
          ) : null}
          {task.status ? "Reabrir" : "Completar"}
        </button>

        <div className="flex gap-3">
          <button
            onClick={() => onEditTask(task)}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
        Editar
          </button>
          <button
            onClick={() => handleDelete(task.id)}
            disabled={deletingId === task.id}
            className="text-sm text-red-400 hover:text-red-300 disabled:opacity-50 transition-colors flex items-center gap-1"
          >
            {deletingId === task.id ? (
              <div className="w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
            ) : null}
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-8">
      {/* Tareas pendientes */}
      {pendingTasks.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
            <span>Tareas Pendientes</span>
            <span className="text-sm bg-yellow-500/20 px-2 py-1 rounded-full">
              {pendingTasks.length}
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {pendingTasks.map(renderTaskCard)}
          </div>
        </div>
      )}

      {/* Tareas completadas */}
      {completedTasks.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-2">
            <span>Tareas Completadas</span>
            <span className="text-sm bg-green-500/20 px-2 py-1 rounded-full">
              {completedTasks.length}
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4 opacity-80">
            {completedTasks.map(renderTaskCard)}
          </div>
        </div>
      )}
    </div>
  );
}