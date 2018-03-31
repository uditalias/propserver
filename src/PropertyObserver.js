import { raf, caf, isDefined, isFunction } from './utils';

const ObserverStrategy = Object.freeze({
    None: 0,
    Target: 1,
    Getter: 2,
});

export default class PropertyObserver {
    constructor(target, property, callback) {
        this._observed = false;
        this._rafId = null;
        this._watch = this._watch.bind(this);
        this._strategy = ObserverStrategy.None;

        if (!callback) {
            this._initializeWithPropertyGetterFunction(target, property);
        } else {
            this._initializeWithTargetProperty(target, property, callback);
        }
    }

    _initializeWithPropertyGetterFunction(propertyGetter, callback) {
        if (!isFunction(propertyGetter) || !isFunction(callback)) {
            throw new TypeError('PropertyObserver: propertyGetter and callback must be functions');
        }

        this._strategy = ObserverStrategy.Getter;
        this._property = propertyGetter;
        this._callback = callback;
    }

    _initializeWithTargetProperty(target, property, callback) {
        if (!isDefined(target) || !isDefined(property)) {
            throw new TypeError('PropertyObserver: both target and property must be defined');
        }

        if (!callback || !isFunction(callback)) {
            throw new TypeError('PropertyObserver: callback must be a function');
        }

        this._strategy = ObserverStrategy.Target;
        this._target = target;
        this._property = property;
        this._callback = callback;
    }

    _watch() {
        const nextValue = this._getValue();

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

    _getValue() {
        switch (this._strategy) {
            case ObserverStrategy.Getter:
                return this._property();
            case ObserverStrategy.Target:
                return this._target[this._property];
            default:
                return null;
        }
    }

    observe() {
        this._rafId = raf(this._watch);
    }

    disconnect() {
        caf(this._rafId);
        this._rafId = null;
        this._observed = false;
    }
}
