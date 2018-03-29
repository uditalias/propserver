import PropertyObserver from './PropertyObserver';

function createObserver(target, property, callback) {
    return new PropertyObserver(target, property, callback);
}

export default createObserver;
export { createObserver };
