import { createObserver } from '../src';

describe('propserver', () => {
    it('should create new instance of PropertyObserver', () => {
        const target = {
            width: 100,
            height: 100,
        };

        const observer = createObserver(target, 'width', () => { });

        expect(observer).toBeDefined();
        expect(typeof (observer.disconnect)).toBe('function');
    });

    it('should observe target property changes with PropertyObserver', (done) => {
        const target = {
            scrollHeight: 100,
            scrollWidth: 100,
        };

        // eslint-disable-next-line
        const callback = jest.fn((size, prevSize) => {

        });

        const observer = createObserver(target, 'scrollHeight', callback);

        observer.observe();

        setTimeout(() => {
            target.scrollHeight = 130;

            setTimeout(() => {
                expect(callback).toBeCalledWith(130, 100);

                observer.disconnect();

                done();
            });
        });
    });

    it('should disconnect PropertyObserver before observed after property changed', (done) => {
        const target = {
            scrollHeight: 100,
            scrollWidth: 100,
        };

        // eslint-disable-next-line
        const callback = jest.fn((size, prevSize) => {

        });

        const observer = createObserver(target, 'scrollHeight', callback);

        observer.observe();

        setTimeout(() => {
            observer.disconnect();

            target.scrollHeight = 130;

            setTimeout(() => {
                expect(callback).toHaveBeenCalledTimes(0);

                done();
            });
        });
    });

    it('should observe property by getter function', (done) => {
        const propertyFetcher = jest.fn(() => 1);

        const callback = jest.fn(() => {

        });

        const observer = createObserver(propertyFetcher, callback);

        observer.observe();

        setTimeout(() => {
            expect(observer).toBeDefined();
            expect(propertyFetcher).toBeCalled();
            expect(callback).toHaveBeenCalledTimes(0);

            observer.disconnect();

            done();
        });
    });

    it('should throw TypeError if target is not defined', () => {
        const throwable = () => createObserver(undefined, '', () => { });

        expect(throwable).toThrowError('PropertyObserver: both target and property must be defined');
    });

    it('should throw TypeError if property getter or callback aren\'t functions', () => {
        const target = () => { };

        const throwable = () => createObserver(target, 'scrollHeight');

        expect(throwable).toThrowError('PropertyObserver: propertyGetter and callback must be functions');
    });
});
