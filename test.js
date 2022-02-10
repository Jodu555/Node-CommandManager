// const { CommandManager, Command } = require('./src/index')

// const commandManager = CommandManager.createCommandManager(process.stdin, process.stdout);

// require('./test2');

// commandManager.registerCommand(new Command('info', 'info', 'Displays the info!', (command, [...args], scope) => {
//     //Do Some code here
//     console.log(args, scope);
//     return ['INFO', 'INFO', 'INFO']
// }));

// commandManager.callCommand('info hallo123 123');


const sleep = time => new Promise((resolve, reject) => setTimeout(() => resolve(), time));

class Writer {
    constructor(stdout) {

    }
    displayProgress(progress, max, type, steps = 1, symbols = null) {
        if (!symbols) symbols = {
            leftBorder: '[',
            rightBorder: ']',
            loaded: '#',
            notLoaded: '-'
        };

        if (type == 0) {
            this.deepSameLineClear(progress + '%');
        } else if (type == 1) {
            let str = symbols.leftBorder + ' ';
            const chars = max / steps;
            const width = Math.floor(progress / steps);
            str += Array(width).join(symbols.loaded);
            str += Array(chars - width).join(symbols.notLoaded);
            str += ' ' + symbols.rightBorder;
            str += ' ' + progress + '%';
            this.deepSameLineClear(str);
        }
    }
    deepSameLineClear(data) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(data);
    }
    end() {
        process.stdout.write('\n');
    }
}


const writer = new Writer();
async function run(params) {
    for (let i = 0; i < 101; i += 1) {
        await sleep(50);
        writer.displayProgress(i, 100, 1, 2);
    }
    writer.end();
    console.log('Hallo2');
}


run();
console.log('Hallo');