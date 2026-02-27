export const originalPrepareStackTrace: (err: Error, stackTraces: NodeJS.CallSite[]) => any;
export function prepareStackTraceRelative(error: any, callSites: any): string;
/** Switch to relative stack traces */
export function setRelativeStackTrace(): void;
/** switch to default (absolute) stack traces */
export function resetDefaultStackTrace(): void;
