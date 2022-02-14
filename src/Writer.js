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
        this.clearLines(l)
        this.stdout.cursorTo(0);
        this.stdout.write(data);
    }

    clearLines(n) {
        for (let i = 0; i < n; i++) {
            const y = i === 0 ? null : -1
            process.stdout.moveCursor(0, y)
            process.stdout.clearLine(1)
        }
        process.stdout.cursorTo(0)
    }
    end() {
        this.stdout.write('\n');
    }
}

module.exports = Writer;