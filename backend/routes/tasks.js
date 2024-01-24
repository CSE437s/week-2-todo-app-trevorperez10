const express = require('express');
const router = express.Router();
const TaskModel = require('../models/taskmodel'); 
const taskModel = new TaskModel();

router.get('/', (req, res) => {
    taskModel.getAll((err, tasks) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(tasks);
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    taskModel.getById(id, (err, task) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(task);
    });
});

router.post('/', (req, res) => {
    taskModel.create(req.body, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Task added successfully', taskId: result.id });
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    taskModel.update(id, req.body, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Task updated successfully' });
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    taskModel.delete(id, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Task deleted successfully' });
    });
});

module.exports = router;
