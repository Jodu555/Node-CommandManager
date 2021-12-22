class Command {
    constructor(command, usage, description, callback) {
        this.ID = this.generateID();
        this.command = command;
        this.usage = usage;
        this.description = description;
        this.callback = callback;
    }
    generateID() {
        const min = 999999,
            max = 9999999999;
        return Math.floor(
            Math.random() * (max - min) + min
        )
    }
}