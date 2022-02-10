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


async function run(params) {
    for (let i = 0; i < 100; i += 10) {
        await sleep(500);
        printProgress(i)
    }
    console.log('Hallo2');
}

function printProgress(progress) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(progress + '%');
}

run();
console.log('Hallo');