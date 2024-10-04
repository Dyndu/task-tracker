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

const addTask = (description) => {
    const tasks = loadTasks();
    const newTask = {
        id: tasks.length + 1,
        description,
        status: 'todo',
        createdAt: new Date(),
        updatedAt: new Date()
    };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`Task added: ${description}`);
};

const updateTask = (taskId, newDescription) => {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === parseInt(taskId, 10));
    if (task) {
        task.description = newDescription;
        task.updatedAt = new Date();
        saveTasks(tasks);
        console.log(`Task ${taskId} updated`);
    } else {
        console.log(`Task ${taskId} not found`);
    }
};

const listTasks = (status) => {
    const tasks = loadTasks();
    if (status) {
        const filteredTasks = tasks.filter(t => t.status === status);
        filteredTasks.forEach(({ id, description, status, createdAt, updatedAt }) => {
            const statusSymbol = status === 'done' ? '[✓]' : status === 'in-progress' ? '[➜]' : '[•]';
            console.log(`${id}. ${statusSymbol} ${description} (${status}) - Created: ${createdAt}, Updated: ${updatedAt}`);
        });
    } else {
        tasks.forEach(({ id, description, status, createdAt, updatedAt }) => {
            const statusSymbol = status === 'done' ? '[✓]' : status === 'in-progress' ? '[➜]' : '[•]';
            console.log(`${id}. ${statusSymbol} ${description} (${status}) - Created: ${createdAt}, Updated: ${updatedAt}`);
        });
    }
};

const markTaskAsDone = (taskId) => {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === parseInt(taskId, 10));
    if (task) {
        task.status = 'done';
        task.updatedAt = new Date();
        saveTasks(tasks);
        console.log(`Task ${taskId} marked as done`);
    } else {
        console.log(`Task ${taskId} not found`);
    }
};

const markTaskAsInProgress = (taskId) => {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === parseInt(taskId, 10));
    if (task) {
        task.status = 'in-progress';
        task.updatedAt = new Date();
        saveTasks(tasks);
        console.log(`Task ${taskId} marked as in progress`);
    } else {
        console.log(`Task ${taskId} not found`);
    }
};

const deleteTask = (taskId) => {
    const tasks = loadTasks();
    const index = tasks.findIndex(t => t.id === parseInt(taskId, 10));
    if (index !== -1) {
        tasks[index].updatedAt = new Date();
        tasks.splice(index, 1);
        saveTasks(tasks);
        console.log(`Task ${taskId} deleted`);
    } else {
        console.log(`Task ${taskId} not found`);
    }
};

module.exports = {
    addTask,
    updateTask,
    listTasks,
    markTaskAsDone,
    markTaskAsInProgress,
    deleteTask
};
