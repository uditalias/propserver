import { isFunction, isDefined, isString, triggerUnsafe, raf, caf } from '../src/utils';

describe('utils', () => {
    describe('isFunction', () => {
        it('should return true if subject is a function', () => {
            expect(isFunction(() => { })).toBe(true);
            expect(isFunction(() => { })).toBe(true);
        });

        it('should return false if subject is not a function', () => {
            expect(isFunction(undefined)).toBe(false);
            expect(isFunction(null)).toBe(false);
            expect(isFunction('')).toBe(false);
            expect(isFunction('test')).toBe(false);
            expect(isFunction(false)).toBe(false);
            expect(isFunction(true)).toBe(false);
            expect(isFunction(1)).toBe(false);
        });
    });

    describe('isDefined', () => {
        it('should return true if subject is defined', () => {
            expect(isDefined('')).toBe(true);
            expect(isDefined(false)).toBe(true);
            expect(isDefined(0)).toBe(true);
            expect(isDefined('Hello')).toBe(true);
            expect(isDefined(1)).toBe(true);
            expect(isDefined(true)).toBe(true);
            expect(isDefined(() => { })).toBe(true);
        });

        it('should return false if subject is not defined', () => {
            let a;
            expect(isDefined(undefined)).toBe(false);
            expect(isDefined(a)).toBe(false);
            expect(isDefined((() => { })())).toBe(false);
        });
    });

    describe('isString', () => {
        it('should return true if subject is string', () => {
            expect(isDefined('')).toBe(true);
            expect(isDefined((1).toString())).toBe(true);
            expect(isDefined(('Hello').toString())).toBe(true);
        });

        it('should return false if subject is not a string', () => {
            expect(isString(undefined)).toBe(false);
            expect(isString(1)).toBe(false);
            expect(isString(() => { })).toBe(false);
        });
    });

    describe('animation frame', () => {
        it('should render request animation frame', () => {
            const frame = jest.fn();

            raf(frame);

            raf(() => {
                expect(frame).toHaveBeenCalled();
            });
        });

        it('should cancel request animation frame', () => {
            const frame = jest.fn();
            const rafId = raf(frame);

            caf(rafId);

            raf(() => {
                expect(frame).toHaveBeenCalledTimes(0);
            });
        });
    });

    describe('trigger unsafe', () => {
        it('should trigger function', () => {
            const func = jest.fn(() => { });

            triggerUnsafe(func);

            expect(func).toBeCalled();
        });

        it('should throw error when argument is not a function', () => {
            const throwable = () => triggerUnsafe(false);

            expect(throwable).toThrow();
        });
    });
});
