document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskTitle = document.getElementById('newTaskTitle').value;
    const taskDueDate = document.getElementById('newTaskDueDate').value;
    const taskPriority = document.getElementById('newTaskPriority').value;

    if (taskTitle === '') {
        alert('Please enter a task title.');
        return;
    }

    const task = {
        id: Date.now(),
        title: taskTitle,
        dueDate: taskDueDate,
        priority: taskPriority,
        completed: false
    };

    let tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
    renderTasks();
    clearInputFields();
}

function clearInputFields() {
    document.getElementById('newTaskTitle').value = '';
    document.getElementById('newTaskDueDate').value = '';
    document.getElementById('newTaskPriority').value = '';
}

function getTasks() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const tasks = getTasks();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${task.id})">
            ${task.title} - Due: ${task.dueDate || 'No due date'} - Priority: ${task.priority || 'No priority'}
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        if (task.completed) {
            li.classList.add('completed');
        }
        taskList.appendChild(li);
    });
}

function toggleComplete(id) {
    let tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveTasks(tasks);
    renderTasks();
}

function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
    renderTasks();
}

function loadTasks() {
    renderTasks();
}
