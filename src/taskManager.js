const fs = require('fs-extra');
const path = require('path');

class TaskManager {
    constructor() {
        this.tasksFilePath = path.join(__dirname, '../data/tasks.json');
    }

    loadTasks() {
        if (fs.existsSync(this.tasksFilePath)) {
            try {
                return fs.readJsonSync(this.tasksFilePath);
            } catch (err) {
                console.error('Error reading tasks file:', err);
                return [];
            }
        }
        return [];
    }

    saveTasks(tasks) {
        fs.writeJsonSync(this.tasksFilePath, tasks, { spaces: 2 });
    }

    addTask(description) {
        const tasks = this.loadTasks();
        const newTask = {
            id: tasks.length + 1,
            description,
            status: 'todo',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        tasks.push(newTask);
        this.saveTasks(tasks);
        console.log(`Task added: ${description}`);
    }

    updateTask(taskId, newDescription) {
        const tasks = this.loadTasks();
        const task = tasks.find(t => t.id === parseInt(taskId, 10));
        if (task) {
            task.description = newDescription;
            task.updatedAt = new Date();
            this.saveTasks(tasks);
            console.log(`Task ${taskId} updated`);
        } else {
            console.log(`Task ${taskId} not found`);
        }
    }

    listTasks(status) {
        const tasks = this.loadTasks();
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
    }

    markTaskAsDone(taskId) {
        const tasks = this.loadTasks();
        const task = tasks.find(t => t.id === parseInt(taskId, 10));
        if (task) {
            task.status = 'done';
            task.updatedAt = new Date();
            this.saveTasks(tasks);
            console.log(`Task ${taskId} marked as done`);
        } else {
            console.log(`Task ${taskId} not found`);
        }
    }

    markTaskAsInProgress(taskId) {
        const tasks = this.loadTasks();
        const task = tasks.find(t => t.id === parseInt(taskId, 10));
        if (task) {
            task.status = 'in-progress';
            task.updatedAt = new Date();
            this.saveTasks(tasks);
            console.log(`Task ${taskId} marked as in progress`);
        } else {
            console.log(`Task ${taskId} not found`);
        }
    }

    deleteTask(taskId) {
        const tasks = this.loadTasks();
        const index = tasks.findIndex(t => t.id === parseInt(taskId, 10));
        if (index !== -1) {
            tasks[index].updatedAt = new Date();
            tasks.splice(index, 1);
            this.saveTasks(tasks);
            console.log(`Task ${taskId} deleted`);
        } else {
            console.log(`Task ${taskId} not found`);
        }
    }
}

module.exports = TaskManager;
