const { commandManager } = require('./src/index')
const CommandManager = new commandManager.createCommandManager(process.stdin, process.stdout);


CommandManager.registerCommand(new Command('info', 'info', 'Displays the info!', async () => {
    return 'INFO'
}));