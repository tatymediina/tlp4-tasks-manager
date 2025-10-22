import { Router } from 'express';

import { TasksController,} from '../controllers/tasks.controller.js';

const router = Router();
const tasksController = new TasksController();
router.get('/tasks', tasksController.getTasks) 
router.post('/tasks', tasksController.createTask)
router.put('/tasks/:id', tasksController.updateTask)
router.delete('/tasks/:id', tasksController.deleteTask)

export { router}