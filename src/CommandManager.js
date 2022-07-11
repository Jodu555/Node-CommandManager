//INFO: fixStdoutFor function from: https://stackoverflow.com/questions/10606814/readline-with-console-log-in-the-background
const Command = require('./Command');
const Writer = require('./Writer');
let commandManager;

class CommandManager {
    constructor(streamIn, streamOut) {
        this.streamIn = streamIn;
        this.streamOut = streamOut;
        this.commands = new Map();
        this.writer = new Writer(this.streamOut);
        this.init();
    }

    init() {
        const cli = require('readline').createInterface(this.streamIn, this.streamOut);
        this.fixStdoutFor(cli);
        cli.setPrompt("> ", 2);
        cli.on('line', (line) => {
            this.callCommand(line, 'USER');
            cli.prompt();
        });

        // this.streamIn.on("keypress", (...args) => {
        //     console.log("keypress", args);
        // });

        cli.prompt();
        this.initializeDefaultCommands();
        this.getAllCommandsWithoutAliases();

        process.on('exit', () => {
            //TODO: here put the shutdown hook for log files etc.
        });
    }

    getWriter() {
        return this.writer;
    }

    callCommand(line, scope = 'SYSTEM') {
        let backmessage;
        const command = line.split(' ')[0].toLowerCase().trim();
        if (this.commands.has(command))
            backmessage = this.commands.get(command).callback(command, line.split(' '), scope);
        if (backmessage) {
            Promise.resolve(backmessage).then((message) => {
                if (Array.isArray(message))
                    message.forEach(msg => console.log(msg));
                if (!Array.isArray(message))
                    console.log(message);
            })
        }
    }

    getAllCommandsWithoutAliases() {
        const validIds = [];
        const finalCommands = [];
        this.commands.forEach(e1 => {
            if (!validIds.includes(e1.ID)) {
                validIds.push(e1.ID);
                finalCommands.push(e1);
            }
        });
        return finalCommands;
    }

    initializeDefaultCommands() {
        this.registerCommand(new Command('help', 'help', 'Description', (command, args, sender) => {
            console.log('------------------- HELP -------------------');
            console.log(' ');
            this.getAllCommandsWithoutAliases().forEach(command => {
                console.log('=> ' + (Array.isArray(command.command) ? command.command.join(', ') : command.command) + ' : ' + command.usage + ' : ' + command.description);
            });
            console.log(' ');
            console.log('------------------- HELP -------------------');
        }));

        this.registerCommand(new Command(['clear', 'c'], 'Clear', 'Clears the complete Node console!', (command, [...args], scope) => {
            console.log('\x1Bc');
        }));
    }
    disableDefaultCommands() {
        this.unregisterCommand('help');
        this.unregisterCommand('clear');
    }

    fixStdoutFor(cli) {
        const oldStdout = process.stdout;
        const newStdout = Object.create(oldStdout);
        newStdout.write = function () {
            cli.output.write('\x1b[2K\r');
            const result = oldStdout.write.apply(
                this,
                Array.prototype.slice.call(arguments)
            );
            cli._refreshLine();
            return result;
        }
        process.__defineGetter__('stdout', function () { return newStdout; });
    }

    /**
     * @param  {Command} command
     */
    registerCommand(command) {
        if (typeof command.command === 'string')
            this.commands.set(command.command.toLowerCase(), command);
        if (Array.isArray(command.command))
            command.command.forEach(commands => this.commands.set(commands.toLowerCase(), command));
    }
    /**
     * @param  {String} command
     */
    unregisterCommand(command) {
        let deletionID;
        this.commands.forEach((v, k) => {
            if (command.toLowerCase() == k.toLowerCase()) {
                deletionID = v.ID;
            }
        });
        this.deleteCommand(Number(deletionID));
    }
    /**
     * @param  {Number} ID
     */
    deleteCommand(ID) {
        const temp = new Map();
        this.commands.forEach((v, k) => {
            if (v.ID != ID) {
                temp.set(k, v);
            }
        });
        this.commands = temp;
    }
}

function createCommandManager(streamIn, streamOut) {
    this.commandManager = new CommandManager(streamIn, streamOut);
    return this.commandManager;
}

function getCommandManager() {
    return this.commandManager;
}

module.exports = {
    createCommandManager,
    getCommandManager,
};