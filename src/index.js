const { Command } = require('commander');
const TaskManager = require('./taskManager');

const program = new Command();
const taskManager = new TaskManager();

program
    .command('add <description>')
    .description('Add a new task')
    .action((description) => {
        taskManager.addTask(description);
    });

program
    .command('list [status]')
    .description('List all tasks or tasks with a specific status')
    .action((status) => {
        taskManager.listTasks(status);
    });

program
    .command('done <taskId>')
    .description('Mark a task as done')
    .action((taskId) => {
        taskManager.markTaskAsDone(taskId);
    });

program
    .command('in-progress <taskId>')
    .description('Mark a task as in progress')
    .action((taskId) => {
        taskManager.markTaskAsInProgress(taskId);
    });

program
    .command('delete <taskId>')
    .description('Delete a task')
    .action((taskId) => {
        taskManager.deleteTask(taskId);
    });

program
    .command('update <taskId> <newDescription>')
    .description('Update a task')
    .action((taskId, newDescription) => {
        taskManager.updateTask(taskId, newDescription);
    });

program.parse(process.argv);
