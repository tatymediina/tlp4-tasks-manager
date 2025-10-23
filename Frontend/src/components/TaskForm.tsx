import { useState, useEffect } from "react";
import { createTask, updateTask } from "../api/task";
import type { ITask } from "../types/task";

interface Props {
  onTaskCreated: () => void;
  editingTask?: ITask | null;
  onCancelEdit?: () => void;
}

export default function TaskForm({ onTaskCreated, editingTask, onCancelEdit }: Props) {
  const [form, setForm] = useState<ITask>({
    title: "",
    description: "",
    status: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Efecto para cargar la tarea cuando se está editando
  useEffect(() => {
    if (editingTask) {
      setForm(editingTask);
    } else {
      setForm({ title: "", description: "", status: false });
    }
  }, [editingTask]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    setIsLoading(true);
    try {
      if (editingTask?.id) {
        await updateTask(editingTask.id, form);
      } else {
        await createTask(form);
      }
      setForm({ title: "", description: "", status: false });
      onTaskCreated();
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setForm({ title: "", description: "", status: false });
    onCancelEdit?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col gap-4"
    >
      <h2 className="text-xl font-bold text-purple-400">
        {editingTask ? "Editar Tarea" : "Nueva Tarea"}
      </h2>
      
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-medium text-gray-300">
          Título *
        </label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="¿Qué necesitas hacer?"
          className="p-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
          required
          maxLength={100}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-sm font-medium text-gray-300">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Agrega detalles importantes..."
          rows={3}
          className="p-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-none"
          maxLength={500}
        />
        <div className="text-xs text-gray-400 text-right">
          {form.description.length}/500
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isLoading || !form.title.trim()}
          className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {editingTask ? "Guardando..." : "Creando..."}
            </>
          ) : (
            <>
              <span>{editingTask ? "Guardar" : "Agregar"}</span>
            </>
          )}
        </button>

        {editingTask && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={isLoading}
            className="px-6 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-600 transition-all py-3 rounded-lg font-semibold text-white"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}