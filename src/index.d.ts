declare module '@jodu555/commandmanager' {
    interface IOverCommandManager {
        createCommandManager: (streamIn, streamOut) => CommandManagerClass;
        getCommandManager: () => CommandManagerClass;
    }

    type CommandCallback = (command: string, args: string[], scope: string) => void;

    class Command {
        ID: number;
        command: string | string[];
        usage: string;
        description: string;
        callback: CommandCallback;
        constructor(command: string | string[], usage: string, description: string, callback: CommandCallback);
    }

    class CommandManagerClass {
        streamIn: any;
        streamOut: any;
        commands: Map<string, Command>;
        cli: any;
        writer: Writer;
        refresh: () => void;
        callCommand: (line: string, scope: string) => void;
        getAllCommandsWithoutAliases: () => Command[];
        initializeDefaultCommands: () => void;
        disableDefaultCommands: () => void;
        registerCommand: (command: Command) => void;
        unregisterCommand: (command: string) => void;
        deleteCommand: (ID: number) => void;
        getWriter: () => Writer;
    }

    interface SymbolsObject {
        leftBorder: string;
        rightBorder: string;
        loaded: string;
        notLoaded: string;
    }

    class Writer {
        commandManager: CommandManagerClass;
        stdout: any;
        displayProgress: (progress: number, max: number, type: number, steps?: number, smybols?: SymbolsObject, appender?: string) => void;
        deepSameLineClear: (data: string, l: number) => void;
        clearLines: (n: number) => void;
        end: () => void;
    }

    export let CommandManager: IOverCommandManager;

    export { Command };
}