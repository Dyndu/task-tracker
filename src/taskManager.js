const fs = require('fs-extra');
const path = require('path');

const tasksFilePath = path.join(__dirname, '../data/tasks.json');

const loadTasks = () => {
    if (fs.existsSync(tasksFilePath)) {
        try {
            return fs.readJsonSync(tasksFilePath);
        } catch (err) {
            console.error('Error reading tasks file:', err);
            return [];
        }
    }
    return [];
};

const saveTasks = (tasks) => {
    fs.writeJsonSync(tasksFilePath, tasks, { spaces: 2 });
};

const addTask = (task) => {
    const tasks = loadTasks();
    const newTask = { id: tasks.length + 1, task, done: false };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`Task added: ${task}`);
};

const listTasks = () => {
    const tasks = loadTasks();
    tasks.forEach(({ id, task, done }) => {
        console.log(`${id}. [${done ? 'x' : ' '}] ${task}`);
    });
};

const markTaskAsDone = (taskId) => {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === parseInt(taskId, 10));
    if (task) {
        task.done = true;
        saveTasks(tasks);
        console.log(`Task ${taskId} marked as done`);
    } else {
        console.log(`Task ${taskId} not found`);
    }
};

const deleteTask = (taskId) => {
    const tasks = loadTasks();
    const index = tasks.findIndex(t => t.id === parseInt(taskId, 10));
    if (index !== -1) {
        tasks.splice(index, 1);
        saveTasks(tasks);
        console.log(`Task ${taskId} deleted`);
    } else {
        console.log(`Task ${taskId} not found`);
    }
};

module.exports = {
    addTask,
    listTasks,
    markTaskAsDone,
    deleteTask
};
