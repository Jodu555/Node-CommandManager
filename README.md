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

### Create a command manager! 

```javascript
const { CommandManager, Command } = require('@jodu555/command-manager');
//                                              Pass here the standard pipe you want to use
const commandManager = CommandManager.createCommandManager(process.stdin, process.stdout);
```