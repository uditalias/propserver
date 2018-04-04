import { raf } from "../src/utils";
import timeline from '../src/timeline';

describe('timeline', () => {
    it('should be defined', () => {
        expect(timeline).toBeDefined();
        expect(timeline.subscribe).toBeDefined();
    });

    it('should call all subscribed listeners', (done) => {
        const listener1 = jest.fn(() => { });
        const listener2 = jest.fn(() => { });

        timeline.subscribe(listener1);
        timeline.subscribe(listener2);

        raf(() => {
            expect(listener1).toBeCalled();
            expect(listener2).toBeCalled();

            done();
        });
    });

    it('should unsubscribe all listeners', () => {
        const listener1 = jest.fn(() => { });
        const listener2 = jest.fn(() => { });

        timeline.subscribe(listener1)();
        timeline.subscribe(listener2)();

        raf(() => {
            expect(listener1).toBeCalled();
            expect(listener2).toBeCalled();

            done();
        });
    });

    it('should throw TypeError if subscribe listener is not a function', () => {
        const throwable = () => timeline.subscribe(false);

        expect(throwable).toThrowError("propserver: listener must be a function");
    });
});