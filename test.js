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

const Writer = require('./src/Writer');


const writer = new Writer(process.stdout);
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