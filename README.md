# propserver 🧙
### Responsive property observation for JavaScript


Observe object properties for real time changes, get notified when the propery change.

## What is it good for

Sometimes you want to be notified on each frame about a property change so you can handle things in a more responsive way.  
Consider when you have an element on a page, and you want
to check its `offsetTop` property so you know when the element is inside the viewport.
You can observe the element `offetTop` propserver and be notified on each frame when the property changed.

**This module should be used on the client side. don't use it with node**

## Install
Install via npm with
```sh
$ npm install --save propserver
```

## Creating property observer
```javascript
import { createObserver } from "propserver";

// get notified when $anything.offsetTop is changes
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

| Name | Type | Required | Description |
| - | - | - | - |
| target | Object | true | the target that holds the property |
| property | String | true | the property to observe on the target |
| callback | Function | true | a callback function to be called when the target property changes    `function (newValue, oldValue) {}` |

**createObserver(propertyGetter, callback)**

| Name | Type | Required | Description |
| - | - | - | - |
| property getter | Function | true | a function to get the property |
| callback | Function | true | a callback function to be called when the property changes  `function (newValue, oldValue) {}` |

The second option to create observer with property getter function. this method is for cases where
you want to run a function to get the value, like where the property is not a direct property of your target.  
Here is a property getter example:

```javascript
() => {
    const { top } = target.getBoundingClientRect();
    return top;
}
```