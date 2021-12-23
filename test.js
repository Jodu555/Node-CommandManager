const { CommandManager, Command } = require('./src/index')

const commandManager = CommandManager.createCommandManager(process.stdin, process.stdout);

require('./test2');

commandManager.registerCommand(new Command('info', 'info', 'Displays the info!', (command, [...args], scope) => {
    //Do Some code here
    console.log(args, scope);
    return ['INFO', 'INFO', 'INFO']
}));

commandManager.callCommand('info hallo123 123');

