const { Command } = require('commander');
const taskManager = require('./taskManager');

const program = new Command();

program
    .command('add <task>')
    .description('Add a new task')
    .action((task) => {
        taskManager.addTask(task);
    });

program
    .command('update <taskId> <newDescription>')
    .description('Update a task')
    .action((taskId, newDescription) => {
        taskManager.updateTask(taskId, newDescription);
    });

program
    .command('list [status]')
    .description('List all tasks or tasks with a specific status')
    .action((status) => {
        taskManager.listTasks(status);
    });

program
    .command('mark-done <taskId>')
    .description('Mark a task as done')
    .action((taskId) => {
        taskManager.markTaskAsDone(taskId);
    });

program
    .command('mark-in-progress <taskId>')
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

program.parse(process.argv);
