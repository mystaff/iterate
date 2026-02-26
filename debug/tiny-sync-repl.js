#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const HISTORY_FILE = path.join(__dirname, '.repl-history');
const MAX_HISTORY = 1000;
const PROMPT = '> ';

// ANSI escape codes
const ANSI = {
  clearLine: '\x1b[2K',
  clearDown: '\x1b[J',
  cursorUp: (n = 1) => `\x1b[${n}A`,
  cursorDown: (n = 1) => `\x1b[${n}B`,
  cursorLeft: (n = 1) => `\x1b[${n}D`,
  cursorRight: (n = 1) => `\x1b[${n}C`,
  cursorToCol: (col) => `\x1b[${col}G`,
  saveCursor: '\x1b[s',
  restoreCursor: '\x1b[u',
};

class TinyREPL {
  constructor() {
    this.lines = [''];
    this.prevCursorRow = 0;
    this.cursorRow = 0;
    this.cursorCol = 0;
    this.history = [];
    this.historyIndex = -1;
    this.savedInput = null;
    this.loadHistory();
  }

  loadHistory() {
    try {
      if (fs.existsSync(HISTORY_FILE)) {
        const content = fs.readFileSync(HISTORY_FILE, 'utf8');
        if (content.trim()) {
          this.history = JSON.parse(content);
        }
      }
    } catch (err) {
      // Ignore errors, start with empty history
      this.history = [];
    }
  }

  saveHistory(command) {
    try {
      if (command.trim()) {
        // Don't save if it duplicates the last stored command
        const lastCommand = this.history[this.history.length - 1];
        if (lastCommand !== command) {
          this.history.push(command);
          if (this.history.length > MAX_HISTORY) {
            this.history.shift();
          }
          fs.writeFileSync(HISTORY_FILE, JSON.stringify(this.history, null, 2), 'utf8');
        }
      }
    } catch (err) {
      // Ignore errors
    }
  }

  // Stub function to determine if command is ready
  isCommandReady(text) {
    // TODO: Implement actual logic to determine if command is complete
    // For now, returns true if line doesn't end with backslash or open brace
    const trimmed = text.trim();
    if (!trimmed) return true;
    
    // Simple heuristic: command is ready unless it ends with continuation characters
    if (trimmed.endsWith('\\')) return false;
    if (trimmed.endsWith('{')) return false;
    
    // Check for balanced braces/brackets/parens
    let braces = 0, brackets = 0, parens = 0;
    let inString = false;
    let stringChar = null;
    let escaped = false;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      
      if (escaped) {
        escaped = false;
        continue;
      }
      
      if (char === '\\') {
        escaped = true;
        continue;
      }
      
      if (char === '"' || char === "'" || char === '`') {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar) {
          inString = false;
          stringChar = null;
        }
        continue;
      }
      
      if (inString) continue;
      
      if (char === '{') braces++;
      if (char === '}') braces--;
      if (char === '[') brackets++;
      if (char === ']') brackets--;
      if (char === '(') parens++;
      if (char === ')') parens--;
    }
    
    return braces === 0 && brackets === 0 && parens === 0 && !inString;
  }

  getCurrentText() {
    return this.lines.join('\n');
  }

  render() {
    // Move cursor to beginning of input
    if (this.prevCursorRow > 0) {
      process.stderr.write(ANSI.cursorUp(this.prevCursorRow));
    }

    process.stderr.write('\r');
    
    // Clear all lines
    process.stderr.write(ANSI.clearDown);
    
    // Render all lines
    for (let i = 0; i < this.lines.length; i++) {
      if (i > 0) process.stderr.write('\n');
      if (i === 0) process.stderr.write(PROMPT);
      process.stderr.write(this.lines[i]);
    }
    
    // Position cursor
    const targetRow = this.cursorRow;
    const currentRow = this.lines.length - 1;
    
    if (currentRow > targetRow) {
      process.stderr.write(ANSI.cursorUp(currentRow - targetRow));
    }
    
    process.stderr.write('\r');
    const offset = (this.cursorRow === 0 ? PROMPT.length : 0);
    if (this.cursorCol + offset > 0) {
      process.stderr.write(ANSI.cursorRight(this.cursorCol + offset));
    }
  }

  insertChar(char, skipRender = false) {
    const line = this.lines[this.cursorRow];
    this.lines[this.cursorRow] = 
      line.slice(0, this.cursorCol) + char + line.slice(this.cursorCol);
    this.cursorCol++;
    if (!skipRender) {
      this.render();
    }
  }

  deleteChar() {
    if (this.cursorCol > 0) {
      const line = this.lines[this.cursorRow];
      this.lines[this.cursorRow] = 
        line.slice(0, this.cursorCol - 1) + line.slice(this.cursorCol);
      this.cursorCol--;
      this.render();
    } else if (this.cursorRow > 0) {
      // Join with previous line
      const currentLine = this.lines[this.cursorRow];
      this.cursorRow--;
      this.cursorCol = this.lines[this.cursorRow].length;
      this.lines[this.cursorRow] += currentLine;
      this.lines.splice(this.cursorRow + 1, 1);
      this.render();
    }
  }

  deleteCharForward() {
    const line = this.lines[this.cursorRow];
    if (this.cursorCol < line.length) {
      this.lines[this.cursorRow] = 
        line.slice(0, this.cursorCol) + line.slice(this.cursorCol + 1);
      this.render();
    } else if (this.cursorRow < this.lines.length - 1) {
      // Join with next line
      this.lines[this.cursorRow] += this.lines[this.cursorRow + 1];
      this.lines.splice(this.cursorRow + 1, 1);
      this.render();
    }
  }

  newLine(skipRender = false) {
    const line = this.lines[this.cursorRow];
    const afterCursor = line.slice(this.cursorCol);
    this.lines[this.cursorRow] = line.slice(0, this.cursorCol);
    this.cursorRow++;
    this.lines.splice(this.cursorRow, 0, afterCursor);
    this.cursorCol = 0;
    if (!skipRender) {
      this.render();
    }
  }

  moveCursorLeft() {
    if (this.cursorCol > 0) {
      this.cursorCol--;
      process.stderr.write(ANSI.cursorLeft());
    } else if (this.cursorRow > 0) {
      this.cursorRow--;
      this.cursorCol = this.lines[this.cursorRow].length;
      this.render();
    }
  }

  moveCursorRight() {
    const line = this.lines[this.cursorRow];
    if (this.cursorCol < line.length) {
      this.cursorCol++;
      process.stderr.write(ANSI.cursorRight());
    } else if (this.cursorRow < this.lines.length - 1) {
      this.cursorRow++;
      this.cursorCol = 0;
      this.render();
    }
  }

  moveCursorUp() {
    if (this.cursorRow > 0) {
      this.cursorRow--;
      const line = this.lines[this.cursorRow];
      if (this.cursorCol > line.length) {
        this.cursorCol = line.length;
      }
      this.render();
    } else {
      // Navigate history
      this.navigateHistory(1);
    }
  }

  moveCursorDown() {
    if (this.cursorRow < this.lines.length - 1) {
      this.cursorRow++;
      const line = this.lines[this.cursorRow];
      if (this.cursorCol > line.length) {
        this.cursorCol = line.length;
      }
      this.render();
    } else {
      // Navigate history
      this.navigateHistory(-1);
    }
  }

  navigateHistory(direction) {
    if (this.history.length === 0) return;
    
    // Save current input when first navigating history
    if (this.historyIndex === -1) {
      this.savedInput = this.getCurrentText();
    }
    
    // Calculate new index
    const newIndex = this.historyIndex + direction;
    
    if (newIndex < -1) {
      // Can't go before history
      return;
    }
    
    if (newIndex >= this.history.length) {
      // Can't go beyond history
      return;
    }
    
    this.historyIndex = newIndex;
    
    if (this.historyIndex === -1) {
      // Restore saved input
      this.lines = this.savedInput.split('\n');
      this.savedInput = null;
    } else {
      // Load from history
      const historyText = this.history[this.history.length - 1 - this.historyIndex];
      this.lines = historyText.split('\n');
    }
    
    // Move cursor to start/end
    this.cursorRow = (direction > 0) ? 0 : this.lines.length - 1;
    this.cursorCol = this.lines[this.cursorRow].length;
    this.render();
  }

  issueCommand(text) {
    console.log(text);
    process.exit(0);
  }

  handleEnter() {
    const text = this.getCurrentText();
    
    if (this.isCommandReady(text)) {
      // Command is ready - output and exit
      process.stderr.write('\n');
      this.saveHistory(text);
      this.issueCommand(text);
    } else {
      // Continue multiline
      this.newLine();
    }
  }

  moveCursorToStart() {
    this.cursorCol = 0;
    this.render();
  }

  moveCursorToEnd() {
    this.cursorCol = this.lines[this.cursorRow].length;
    this.render();
  }

  start() {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', (key) => {
      this.prevCursorRow = this.cursorRow;

      // Handle Ctrl+C
      if (key === '\u0003') {
        process.stderr.write('\n');
        process.exit(0);
      }
      
      // Handle Ctrl+D
      if (key === '\u0004') {
        if (this.getCurrentText().trim()) {
          process.stderr.write('\n');
          process.exit(0);
        } else {
          process.stderr.write('\n');
          process.exit(0);
        }
      }

      // Handle escape sequences
      if (key.startsWith('\x1b')) {
        if (key === '\x1b[A') { // Up arrow
          this.moveCursorUp();
        } else if (key === '\x1b[B') { // Down arrow
          this.moveCursorDown();
        } else if (key === '\x1b[C') { // Right arrow
          this.moveCursorRight();
        } else if (key === '\x1b[D') { // Left arrow
          this.moveCursorLeft();
        } else if (key === '\x1b[H' || key === '\x1b[1~') { // Home
          this.moveCursorToStart();
        } else if (key === '\x1b[F' || key === '\x1b[4~') { // End
          this.moveCursorToEnd();
        } else if (key === '\x1b[3~') { // Delete
          this.deleteCharForward();
        }
        return;
      }

      // Handle Enter
      if (key === '\r' || key === '\n') {
        this.handleEnter();
        return;
      }

      // Handle backspace
      if (key === '\x7f' || key === '\b') {
        this.deleteChar();
        return;
      }

      // Handle Ctrl+A (beginning of line)
      if (key === '\u0001') {
        this.moveCursorToStart();
        return;
      }

      // Handle Ctrl+E (end of line)
      if (key === '\u0005') {
        this.moveCursorToEnd();
        return;
      }

      // Handle paste (multi-character input)
      if (key.length > 1 && !key.startsWith('\x1b')) {
        // This is pasted text (not an escape sequence)
        for (const char of key) {
          if (char >= ' ' || char === '\n' || char === '\r') {
            if (char === '\n' || char === '\r') {
              this.newLine(true);  // skip render during batch
            } else {
              this.insertChar(char, true);  // skip render during batch
            }
          }
        }
        this.render();  // render once at the end
        return;
      }

      // Handle regular characters
      if (key.length === 1 && key >= ' ') {
        this.insertChar(key);
      }
    });

    // Initial render
    this.render();
  }
}

// Start the REPL
if (require.main === module) {
  const repl = new TinyREPL();
  repl.start();
}

module.exports = TinyREPL;
