class Writer {
    constructor(stdout) {
        this.stdout = stdout;
    }
    displayProgress(progress, max, type, steps = 1, symbols = null, appender = '') {
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
            str += '  ' + appender;
            this.deepSameLineClear(str);
        }
    }
    deepSameLineClear(data, l = 0) {
        this.stdout.clearLine();
        for (let i = 0; i < l; i++) {
            this.stdout.moveCursor(0, i);
            this.stdout.clearLine(1);
        }
        this.stdout.cursorTo(0);
        this.stdout.write(data);
    }
    end() {
        this.stdout.write('\n');
    }
}

module.exports = Writer;