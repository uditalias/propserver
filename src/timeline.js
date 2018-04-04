import { raf, caf, isFunction, triggerUnsafe } from './utils';

const listeners = [];
let playing = false;
let rafId;

function tick() {
    rafId = raf(tick);
    listeners.map(triggerUnsafe);
}

function play() {
    if (playing) {
        return;
    }

    playing = true;
    rafId = raf(tick);
}

function stop() {
    caf(rafId);
    playing = false;
}

function subscriptionFactory(listener) {
    const lsnrIdx = listeners.push(listener) - 1;

    return () => {
        listeners.splice(lsnrIdx, 1);
        if (listeners.length === 0) {
            stop();
        }
    };
}

function subscribe(listener) {
    if (!isFunction(listener)) {
        throw new TypeError('propserver: listener must be a function');
    }

    const subscription = subscriptionFactory(listener);

    play();

    return subscription;
}

export default { subscribe };
