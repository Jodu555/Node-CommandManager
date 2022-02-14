const { CommandManager, Command } = require('./src/index')

const commandManager = CommandManager.createCommandManager(process.stdin, process.stdout);

require('./test2');

commandManager.registerCommand(new Command('info', 'info', 'Displays the info!', (command, [...args], scope) => {
    //Do Some code here
    console.log(args, scope);
    return ['INFO', 'INFO', 'INFO']
}));


const sleep = time => new Promise((resolve, reject) => setTimeout(() => resolve(), time));


const writer = commandManager.getWriter();
async function run(params) {
    for (let i = 0; i < 101; i += 1) {
        await sleep(50);
        writer.displayProgress(i, 100, 1, 2);
    }
    writer.end();
    console.log('Hallo2');

    // writer.deepSameLineClear('Hallo 123');
    // await sleep(1000);
    // writer.deepSameLineClear('Hallo 456');
    // await sleep(1000);
    // writer.deepSameLineClear(`Hallo 123.2\nTEST 123.2`);
    // await sleep(1000);
    // writer.deepSameLineClear(`Hallo 456.2\nTEST 456.2`, 2);
    // writer.end();
}


run();
// console.log('Hallo');
