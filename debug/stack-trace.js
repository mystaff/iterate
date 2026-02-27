const path = require('path');

// Store the original prepareStackTrace to allow chaining or restoration
const originalPrepareStackTrace = Error.prepareStackTrace;

function prepareStackTraceRelative(error, callSites) {
  const cwd = process.cwd(); // Get the current working directory

  // Format each call site in the stack trace
  const stack = callSites.map(site => {
    const file = site.getFileName();
    let relativeFile = file;

    // If the file path is absolute, make it relative to the CWD
    if (path.isAbsolute(file)) {
      relativeFile = path.relative(cwd, file); // Calculate the relative path
      if (relativeFile.length > 0 && relativeFile[0] !== '.') {
        relativeFile = './' + relativeFile; // Prepend './' if it doesn't start with it
      }
    }

    const functionName = site.getFunctionName();
    const methodName = site.getMethodName();
    const typeName = site.getTypeName();
    const line = site.getLineNumber();
    const column = site.getColumnNumber();

    // Build the function/method name with proper formatting
    let name = '';

    // Add type name if present (e.g., "Function")
    if (typeName && typeName !== 'Object') {
      name += typeName + '.';
    }

    // Add the function name
    if (functionName) {
      name += functionName;

      // Add [as methodName] only if the method name differs from the function's method part
      if (methodName && methodName !== functionName && !functionName.endsWith(`.${methodName}`)) {
        name += ` [as ${methodName}]`;
      }
    } else if (methodName) {
      name += methodName;
    } else {
      name = '<anonymous>';
    }

    // Format the line as you want it to appear
    return `    at ${name} (${relativeFile}:${line}:${column})`;
  });

  // Join the lines and prepend the error message
  return `${error.name}: ${error.message}\n${stack.join('\n')}`;
}

/** Switch to relative stack traces */
function setRelativeStackTrace() {
  Error.prepareStackTrace = prepareStackTraceRelative;
}

/** switch to default (absolute) stack traces */
function resetDefaultStackTrace() {
  Error.prepareStackTrace = originalPrepareStackTrace;
}

module.exports = {
  originalPrepareStackTrace,
  prepareStackTraceRelative,

  setRelativeStackTrace,
  resetDefaultStackTrace,
};
