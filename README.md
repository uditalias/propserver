# propserver 🧙
### Responsive property observation for JavaScript


Observe object properties for changes in real time, get notified when the propery change with prev and next values.

## Install
Install via npm with
```sh
$ npm install --save propserver
```

## How to use the observer
```javascript
import { createObserver } from "propserver";

// get notified when $anything.offsetTop changes
function callback(value, prevValue) {
    console.log(value, prevValue);
}

// create property ovserver
const observer = createObserver($anything, "offsetTop", callback);

// start observing for $anything.offsetTop changes
observer.observe();

// disconnect the observer when you finish
observer.disconnect();
```

## API

**createObserver(target, property, callback)**

Factory function to create property observer.

| param | type | required | description |
| - | - | - | - |
| target | Object | true | the target that holds the property |
| property | String | true | the property to observe on the target |
| callback | Function | true | a callback function to be called when the target property changes  `function(newValue, oldValue) {} ` |

