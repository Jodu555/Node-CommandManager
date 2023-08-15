const { CommandManager, Command } = require('./src/index');

const commandManager = CommandManager.getCommandManager();

commandManager.registerCommand(
	new Command('info2', 'info2', 'Displays the second info!', () => {
		return 'INFO !!2!!';
	})
);
