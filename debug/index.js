const path = require('node:path');
const util = require('node:util');
const child_process = require('node:child_process');
const inspector = require('node:inspector');
const Iterate = require('../iterate');

const commonOptions = {};

let debuggerSession;

/* c8 ignore start */

function externalDebuggerSession() {
  debuggerSession = new inspector.Session();
  debuggerSession.connect();
  debuggerSession.post('Debugger.enable');
}

const rxStackLocation = /(?:at | \()(?<location>[^()]+:\d+:\d+)\)?(?:\n|$)/g;

function getCallStackFileLocation(lineNumber) {
  lineNumber++;
  for (const line of new Error().stack.matchAll(rxStackLocation)) {
    if (!(lineNumber--)) { return line.groups.location; }
  }
  return null;
}

const stdinSyncUserInputScript = path.resolve(__dirname, 'tiny-sync-repl.js');

function stdinSyncUserInput() {
  const response = child_process.spawnSync(
    process.execPath,
    [stdinSyncUserInputScript],
    { stdio: ['inherit', 'pipe', 'inherit'] },
  );
  if (response.status) { throw new Error(`REPL error: process exited with code ${response.status}`); }
  if (response.signal) { throw new Error(`REPL error: process exited with signal ${response.signal}`); }
  const line = response.stdout.toString('utf-8');
  return line;
}

let runtimeDebuggerCommandProcessor;

const runtimeDebuggerHint = '\nPress <ENTER> to continue. Type `help()` to show available commands\n'
  + 'Hit <Ctrl+C> or <Ctrl+D> to terminate the process\n';
const runtimeDebuggerPrompt = '> ';

const runtimeDebuggerConfirmExit = '\nPress Ctrl+C or Ctrl+D once again to exit\n';

function runtimeDebugger(scope = {}, { hint, prompt, syncInputCallback, commandProcessor } = {}) {
  if (!hint) { hint = runtimeDebuggerHint; }
  if (!prompt) { prompt = runtimeDebuggerPrompt; }
  if (!syncInputCallback) { syncInputCallback = stdinSyncUserInput; }
  if (!commandProcessor) { commandProcessor = runtimeDebuggerCommandProcessor; }

  const { args, context } = scope; // eslint-disable-line
  process.stderr.write(hint);
  while (true) {
    process.stderr.write(prompt);
    const command = syncInputCallback();
    if (command) {
      debugOptions.confirmExit = false;
    } else {
      if (debugOptions.confirmExit) { 
        process.stderr.write('Process terminated\n');
        process.exit(2);
      } else {
        process.stderr.write(runtimeDebuggerConfirmExit);
        debugOptions.confirmExit = true;
      }
    }
    if (command === '\n') { return; }
    try {
      const result = commandProcessor(command);
      if (result != null) { process.stderr.write(`${result}\n`); }
      if (debugOptions.pass || commonOptions.passAll) { return; }
    } catch(error) {
      process.stderr.write(`${error.stack ?? error}\n`);
      process.stderr.write(hint);
    }
  }
}

const debugInspectOptions = {
  depth: 2,
  colors: true,
  showHidden: false,
  maxArrayLength: 5,
  maxStringLength: 24,
  compact: 5,
  sorted: true,
  getters: false,
  numericSeparator: true,
};

function debug(scopeCallback, options = {}) {
  if (!options.condition) { options.condition = () => true; }
  if (!options.resultCallback) { options.resultCallback = (v) => v; }
  if (options.callStackDepth == null) { options.callStackDepth = 1; }

  let location = getCallStackFileLocation(options.callStackDepth);
  if (location) { location = path.relative('.', location); }
  options.location = location;

  return function _debug(...args) {
    if (options.pass || commonOptions.passAll || !options.condition(args, this)) { return args[0]; }
    const inspect = (value, indent = 0) => (
      util.inspect(value, debugInspectOptions).replaceAll('\n', `\n${' '.repeat(indent)}`)
    );

    process.stderr.write(`\ncontext = ${inspect(this)}\n`);

    if (args.length === 4 && args[2] instanceof Iterate) { // this is most likely iterate mapping callback
      [global.value, global.index, global.iterate, global.mappings] = args;
      process.stderr.write('\nargs = [\n'
        + `  [0]: value = ${inspect(global.value, 2)}\n`
        + `  [1]: index = ${inspect(global.index, 2)}\n`
        + `  [2]: iterate = ${inspect(global.iterate, 2)}\n`
        + `  [3]: mappings = ${inspect(global.mappings, 2)}\n`
        + ']\n');
    } else {
      process.stderr.write('\nargs = [\n');
      let n = 0;
      for (const arg of args) { process.stderr.write(`\n  [${n++}]: ${inspect(arg, 2)}\n`); }
      process.stderr.write(']\n');
    }

    process.stderr.write(`\n[Iterate Debug] @ ${location || '<unknown>'}\n`);

    const isDebugging = inspector.url();

    let result;
    global.debugOptions = options;
    global.args = args;
    global.context = this;

    if (isDebugging) {
      externalDebuggerSession();
      if (scopeCallback) {
        debuggerSession.post('Debugger.pause', scopeCallback.bind(this, args, this));
      }
    } else {
      runtimeDebugger({ args, context: this });
      if (scopeCallback) {
        scopeCallback.call(this, args, this);
      }
    }
    result = options.resultCallback.call(this, ...args);
    try {
      return result;
    } finally {
      if (isDebugging && !scopeCallback) {
        debuggerSession.post('Debugger.pause');
      }
    }
  };
}

function help() { // eslint-disable-line
  process.stderr.write(
    'pass() -- disable debugging break at current code position\n'
    + 'passAll() -- disable debugging break at all code positions\n'
  );
}

function pass() { // eslint-disable-line
  debugOptions.pass = true;
  process.stderr.write(`Debugging break at code ${debugOptions.location} is disabled\n`);
}

function passAll() { // eslint-disable-line
  commonOptions.passAll = true;
  process.stderr.write(`Debugging breaks are disabled\n`);
}

function createDebuggerCommandsClosure(_) {
  runtimeDebuggerCommandProcessor = (command) => {
    const result = eval(command);
    if (result === undefined) { return result; }
    const display = util.inspect(result, false, Infinity, true);
    return display;
  };
}

/* c8 ignore stop */

module.exports = {
  debug,
  createDebuggerCommandsClosure,
};
