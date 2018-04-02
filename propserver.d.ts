declare namespace propserver {

    export interface PropertyObserver {
        observe: () => {};
        disconnect: () => {};
    }

    export function createObserver(target: any, property: string, callback: (prop?: any, prevProp?: any) => {}): PropertyObserver;
    export function createObserver(propertyGetter: () => any, callback: (prop?: any, prevProp?: any) => {}): PropertyObserver;
}

export = propserver;