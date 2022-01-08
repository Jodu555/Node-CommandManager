# Node-CommandManager
A Simple Command Manager API in NodeJS! 
In which you can define Commands to do certain things! 
Then the end user can type these into the console to trigger certain code

## Features

  * Handles all registered Commands
  * Handles Async Code execution in commands
  * Automatically implements a help command
  * Nice Developer Experience

## Usage

### Create a command manager

```javascript
const { CommandManager, Command } = require('@jodu555/commandmanager');
//                                              Pass here the standard pipe you want to use
const commandManager = CommandManager.createCommandManager(process.stdin, process.stdout);
```

### Create Commands

```javascript
//                                        the command  A Usage Info with arguments       A Description what the command does
commandManager.registerCommand(new Command('addUser', 'addUser <Name> <Street> [City]', 'Adds a user', (command, [...args], scope) => {
    // command: The initial command: addUser
    // args: The Arguments including the command at index 0
    // scope: The Scope this command was run can either be user or system

    
    //Do your code here

    //Return whatever the command should output
    //Can be an Array
    return ['User Added:', '', 'Name: NAME'];
    //Or just a String
    return 'User Added Successfully';
}));
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



## Todo
* [x] Implement so you can call a command with code
  * [x] Implement the System / Code scope