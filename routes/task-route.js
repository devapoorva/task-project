import express from 'express';
import { getTasks, getTask, createTask, updateTask, deleteTask } from '../controller/task-controller.js';

const taskRouter = express.Router();
taskRouter.get('/', getTasks);
taskRouter.get('/:id', getTask);
taskRouter.post('/', createTask);
taskRouter.put('/:id', updateTask);
taskRouter.delete('/:id', deleteTask);

export default taskRouter;