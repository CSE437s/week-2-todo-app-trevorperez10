const db = require('../database.js');

class TaskModel {
    getAll(callback) {
        const query = "SELECT * FROM tasks";
        db.all(query, [], (err, rows) => {
            callback(err, rows);
        });
    }

    getById(id, callback) {
        const query = "SELECT * FROM tasks WHERE id = ?";
        db.get(query, [id], (err, row) => {
            callback(err, row);
        });
    }

    create(task, callback) {
        const { title, dueDate, priority } = task;
        const query = `INSERT INTO tasks (title, dueDate, priority, completed) VALUES (?, ?, ?, 0)`;
        db.run(query, [title, dueDate, priority], function(err) {
            callback(err, { id: this.lastID });
        });
    }

    update(id, task, callback) {
        const { title, dueDate, priority, completed } = task;
        const query = `UPDATE tasks SET title = ?, dueDate = ?, priority = ?, completed = ? WHERE id = ?`;
        db.run(query, [title, dueDate, priority, completed, id], function(err) {
            callback(err);
        });
    }

    delete(id, callback) {
        const query = "DELETE FROM tasks WHERE id = ?";
        db.run(query, [id], function(err) {
            callback(err);
        });
    }
}

module.exports = TaskModel;
