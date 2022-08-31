
class Command {

    /**
     * The Command execute Callback
     *
     * @callback commandCallback
     * @param {String} command - The command itself.
     * @param {[String]} args - All the arguments with the command on index 0.
     * @param {String} scope - The scope, in wich the command got executed.
     */

    /**
     * @param  {String} command
     * @param  {String} usage
     * @param  {String} description
     * @param  {commandCallback} callback
     */
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

module.exports = Command;