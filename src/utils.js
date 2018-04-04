export function isDefined(subject) {
    return typeof (subject) !== 'undefined';
}

export function isFunction(subject) {
    return typeof (subject) === 'function';
}

export function isString(subject) {
    return typeof (subject) === 'string';
}

export function raf(fn) {
    return window.requestAnimationFrame(fn);
}

export function caf(rafId) {
    return window.cancelAnimationFrame(rafId);
}

export function triggerUnsafe(fn) {
    fn();
}
