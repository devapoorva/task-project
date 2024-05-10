import { ErrorHandler } from "../middleware/error.js";
import ApiResponse from "../response/response.js";
import Task from "../models/Task.js";

export const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({});
        res.json(ApiResponse.success("all tasks", tasks));
    } catch (err) {
        console.log(`${err}`)
        next(new ErrorHandler(400, "Not Found"));
    }
}

export const getTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task == null) {
            res.json(ApiResponse.success("task data", task))
        } else {
            res.status(404).json(ApiResponse.error('Task not found'));
        }
    } catch (err) {
        next(new ErrorHandler(404, err.message));
    }
}

export const createTask = async (req, res, next) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate
    });
    try {
        const newTask = await task.save();
        res.status(201).json(ApiResponse.success('Task created successfully', newTask));
    } catch (err) {
        next(new ErrorHandler(404, err.message));
    }
}

export const updateTask = async (req, res, next) => {
    try{
        let task = await Task.findById(req.params.id);
        if (task == null) {
            return res.status(404).json(ApiResponse.error('Task not found'));
        }
        if (req.body.title != null) {
            task.title = req.body.title;
        }
        if (req.body.description != null) {
            task.description = req.body.description;
        }
        if (req.body.dueDate != null) {
            task.dueDate = req.body.dueDate;
        }
        task.updatedAt = Date.now;
        const updatedTask = await task.save();
        res.status(200).json(ApiResponse.success('Task updated successfully', updatedTask));
    }catch(err){
        next(new ErrorHandler(404, err.message));
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task == null) {
            return res.status(404).json(ApiResponse.error('Task not found'));
        }
        await task.remove();
        res.json(ApiResponse.success('Task deleted successfully'));
    } catch (err) {
        next(new ErrorHandler(400, err.message));
    }
}