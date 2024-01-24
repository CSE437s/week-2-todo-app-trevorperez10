document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function loadTasks() {
    fetch('/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            renderTasks(tasks);
        })
        .catch(error => {
            console.error('Error fetching tasks:', error);
        });
}

function addTask() {
    const taskTitle = document.getElementById('newTaskTitle').value;
    const taskDueDate = document.getElementById('newTaskDueDate').value;
    const taskPriority = document.getElementById('newTaskPriority').value;

    const taskData = {
        title: taskTitle,
        dueDate: taskDueDate,
        priority: taskPriority
    };

    fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData)
    })
    .then(response => response.json())
    .then(data => {
        loadTasks(); 
        clearInputFields();
    })
    .catch(error => console.error('Error adding task:', error));
}

function clearInputFields() {
    document.getElementById('newTaskTitle').value = '';
    document.getElementById('newTaskDueDate').value = '';
    document.getElementById('newTaskPriority').value = '';
}

function renderTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${task.id}, this)">
            ${task.title} - Due: ${task.dueDate || 'No due date'} - Priority: ${task.priority || 'No priority'}
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        if (task.completed) {
            li.classList.add('completed');
        }
        taskList.appendChild(li);
    });
}

function toggleComplete(id, checkboxElem) {
    const completed = checkboxElem.checked;

    fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed })
    })
    .then(response => response.json())
    .then(() => {
        loadTasks(); 
    })
    .catch(error => console.error('Error updating task:', error));
}

function deleteTask(id) {
    fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
        loadTasks(); 
    })
    .catch(error => console.error('Error deleting task:', error));
}
