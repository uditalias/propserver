import { isDefined, isFunction } from './utils';
import timeline from './timeline';

const ObserverStrategy = {
    None: 0,
    Target: 1,
    Getter: 2,
};

export default class PropertyObserver {
    constructor(target, property, callback) {
        this._firstValueReceived = false;
        this._next = this._next.bind(this);
        this._strategy = ObserverStrategy.None;
        this._subscription = null;
        this._currentValue = null;

        if (!callback) {
            this._initializeWithPropertyGetterFunction(target, property);
        } else {
            this._initializeWithTargetProperty(target, property, callback);
        }
    }

    _initializeWithPropertyGetterFunction(propertyGetter, callback) {
        if (!isFunction(propertyGetter) || !isFunction(callback)) {
            throw new TypeError('propserver: propertyGetter and callback must be functions');
        }

        this._strategy = ObserverStrategy.Getter;
        this._property = propertyGetter;
        this._callback = callback;
    }

    _initializeWithTargetProperty(target, property, callback) {
        if (!isDefined(target) || !isDefined(property)) {
            throw new TypeError('propserver: both target and property must be defined');
        }

        if (!callback || !isFunction(callback)) {
            throw new TypeError('propserver: callback must be a function');
        }

        this._strategy = ObserverStrategy.Target;
        this._target = target;
        this._property = property;
        this._callback = callback;
    }

    _next() {
        const nextValue = this._getValue();

        if (this._currentValue !== nextValue) {
            if (this._firstValueReceived) {
                this._callback(nextValue, this._currentValue);
            } else {
                this._firstValueReceived = true;
            }

            this._currentValue = nextValue;
        }
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
        if (this._subscription) {
            return;
        }

        this._subscription = timeline.subscribe(this._next);
    }

    disconnect() {
        if (this._subscription) {
            this._subscription();
            this._subscription = null;
        }

        this._firstValueReceived = false;
    }
}
