const { commandManager, Command } = require('./src/index')
const CommandManager = new commandManager(process.stdin, process.stdout);


CommandManager.registerCommand(new Command('info', 'info', 'Displays the info!', async () => {
    return 'INFO'
}));