declare namespace propserver {
    export function createObserver(target: any, property: string, callback: (prop?: any, prevProp?: any) => {}): void;
    export function createObserver(propertyGetter: () => any, callback: (prop?: any, prevProp?: any) => {}): void;
}