declare namespace propserver {

    export interface PropertyObserver {
        observe: () => void;
        disconnect: () => void;
    }

    export function createObserver(target: any, property: string, callback: (prop?: any, prevProp?: any) => void): PropertyObserver;
    export function createObserver(propertyGetter: () => any, callback: (prop?: any, prevProp?: any) => void): PropertyObserver;
}

export = propserver;