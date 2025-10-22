import { useEffect, useState } from 'react';
import './index.css'
import { getAllTasks, createTask, updateTask, deleteTask } from './api/task';

function App() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    const getTasks = async () => {
     try {
      const tasks = await getAllTasks();
      setTasks(tasks)
     } catch (error) {
       console.log(error);
       throw new Error('Error al obtener las tareas');
     }
    }
    getTasks();
    
  },[])


  
  return (
    <>
      <div className='bg-purple flex-1'>
        <h1 className='text-center font-bold text-3xl m-4'>Gestor de tareas</h1>
        
      </div>
       
    </>
  )
}

export default App
