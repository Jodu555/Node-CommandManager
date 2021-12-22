const { CommandManager, Command } = require('./src/index')

const commandManager = CommandManager.createCommandManager(process.stdin, process.stdout);

require('./test2');

commandManager.registerCommand(new Command('info', 'info', 'Displays the info!', async () => {
    return ['INFO', 'INFO', 'INFO']
}));

