# Node-CommandManager

A Simple Command Manager API in NodeJS!
In which you can define Commands to do certain things!
Then the end user can type these into the console to trigger certain code

## Features

- Handles all registered Commands
- Handles Async Code execution in commands
- Automatically implements a help command
- Nice Developer Experience

## Usage

### Create a command manager

```javascript
const { CommandManager, Command } = require('@jodu555/commandmanager');
//                                              Pass here the standard pipe you want to use
const commandManager = CommandManager.createCommandManager(process.stdin, process.stdout);
```

### Create Commands

```javascript
commandManager.registerCommand(
	new Command(
		'addUser', // The Command
		'addUser <Name> <Street> [City]', // A Usage Info with arguments
		'Adds a user', // A Description what the command does
		(command, [...args], scope) => {
			// command: The initial command: addUser
			// args: The Arguments including the command at index 0
			// scope: The Scope this command was run can either be user or system

			//Do your code here

			//Return whatever the command should output
			//Can be an Array
			return ['User Added:', '', 'Name: NAME'];
			//Or just a String
			return 'User Added Successfully';
		}
	)
);
```

## Alias Support

```javascript
commandManager.registerCommand(
	new Command(
		['here', 'you', 'can', 'put', 'all', 'the', 'aliases'],
		'Usage',
		'Description',
		(command, [...args], scope) => {}
	)
);
```

## Unregister Commands

```javascript
commandManager.unregisterCommand('clear'); // Here you can put the command name or any alias
```

### Work with the commandManager in other classes | PUT this before you acces the commandManager anywhere

```javascript
const { CommandManager, Command } = require('@jodu555/commandmanager');

const commandManager = CommandManager.getCommandManager();
commandManager. //some other function like registerCommand
```

### Call A specific command with code

```javascript
commandManager.callCommand('command argu ments', 'YOUR scope! Default: System');
```

### More To Know

```javascript
//If you dont want the two default commands: "help" & "clear" then you can call:

commandManager.disableDefaultCommands();

//If you now decide you want them back use:

commandManager.initializeDefaultCommands();
```

## Projects using this API

<!--- [Monitoring-System](https://github.com/Jodu555/MonitoringSystem-Slave)!-->

- [Backup-System](https://github.com/Jodu555/BackupSystem)
- [Auto-Deployer](https://github.com/Jodu555/Auto-Deployer)

## Todo

- [ ] Document all the system with jsdoc so the usage gets nicer
- [x] Implement so you can call a command with code
  - [x] Implement the System / Code scope
- [x] Implement a Command Alias
  - [x] Make the one alias to multiple aliases
  - [x] Implement the alias usage into the Readme
- [ ] Implement a shutdown hook to maybe cleanup some commands
