const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = 'todo.db';

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title text, 
            dueDate text, 
            priority text, 
            completed BOOLEAN NOT NULL CHECK (completed IN (0, 1)) DEFAULT 0
            )`, 
        (err) => {
            if (err) {
            } else {
                const insert = 'INSERT INTO tasks (title, dueDate, priority, completed) VALUES (?,?,?,?)';
                db.run(insert, ["Sample Task", "2024-01-01", "High", 0]);
            }
        });  
    }
});

module.exports = db;
