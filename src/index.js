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
    .command('list')
    .description('List all tasks')
    .action(() => {
        taskManager.listTasks();
    });

program
    .command('done <taskId>')
    .description('Mark a task as done')
    .action((taskId) => {
        taskManager.markTaskAsDone(taskId);
    });

program
    .command('delete <taskId>')
    .description('Delete a task')
    .action((taskId) => {
        taskManager.deleteTask(taskId);
    });

program.parse(process.argv);
