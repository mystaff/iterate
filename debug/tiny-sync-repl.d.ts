#!/usr/bin/env node
export = TinyREPL;
declare class TinyREPL {
    lines: string[];
    prevCursorRow: number;
    cursorRow: number;
    cursorCol: number;
    history: any[];
    historyIndex: number;
    savedInput: string;
    loadHistory(): void;
    saveHistory(command: any): void;
    isCommandReady(text: any): boolean;
    getCurrentText(): string;
    render(): void;
    insertChar(char: any, skipRender?: boolean): void;
    deleteChar(): void;
    deleteCharForward(): void;
    newLine(skipRender?: boolean): void;
    moveCursorLeft(): void;
    moveCursorRight(): void;
    moveCursorUp(): void;
    moveCursorDown(): void;
    navigateHistory(direction: any): void;
    issueCommand(text: any): void;
    handleEnter(): void;
    moveCursorToStart(): void;
    moveCursorToEnd(): void;
    start(): void;
}
