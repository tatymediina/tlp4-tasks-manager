import { useEffect, useState } from "react";
import { getAllTasks } from "./api/task";
import type { ITask } from "./types/task";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [editingTask, setEditingTask] = useState<ITask | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const data = await getAllTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error al cargar las tareas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleEditTask = (task: ITask) => {
    setEditingTask(task);
    // Scroll suave al formulario
    document.getElementById('task-form')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Gestor de Tareas
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Organiza tus tareas de forma eficiente. Crea, edita y marca como completadas tus actividades diarias.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <div className="lg:col-span-1">
            <div id="task-form">
              <TaskForm 
                onTaskCreated={loadTasks} 
                editingTask={editingTask}
                onCancelEdit={handleCancelEdit}
              />
            </div>
          </div>

          {/* Lista de tareas */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              <TaskList 
                tasks={tasks} 
                onTaskUpdated={loadTasks}
                onEditTask={handleEditTask}
              />
            )}
          </div>
        </div>

        {/* Stats footer */}
        <footer className="mt-12 pt-6 border-t border-gray-800">
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span>Pendientes: {tasks.filter(t => !t.status).length}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Completadas: {tasks.filter(t => t.status).length}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Total: {tasks.length}</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}