import { raf, caf, isDefined, isFunction } from './utils';

export default class PropertyObserver {
    constructor(target, property, callback) {
        if (!isDefined(target) || !isDefined(property)) {
            throw new TypeError('PropertyObserver: both target and property must be defined');
        }

        if (!callback || !isFunction(callback)) {
            throw new TypeError('PropertyObserver: callback must be a function');
        }

        this._watch = this._watch.bind(this);
        this._observed = false;
        this._target = target;
        this._property = property;
        this._rafId = null;
        this._callback = callback;
    }

    _watch() {
        const nextValue = this._target[this._property];

        if (this._currentValue !== nextValue) {
            if (this._observed) {
                this._callback(nextValue, this._currentValue);
            } else {
                this._observed = true;
            }

            this._currentValue = nextValue;
        }

        this._rafId = raf(this._watch);
    }

    observe() {
        this._rafId = raf(this._watch);
    }

    disconnect() {
        this._observed = false;
        caf(this._rafId);
        this._rafId = null;
    }
}
