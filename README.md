# <img src='https://raw.githubusercontent.com/uditalias/propserver/master/assets/propserver.png' height='100' alt='Propserver Logo' />

### Responsive property observation for JavaScript

![propserver](https://img.shields.io/npm/v/propserver.svg?style=flat-square)
[![Travis](https://img.shields.io/travis/uditalias/propserver.svg?style=flat-square)](https://travis-ci.org/uditalias/propserver)


## What is it good for?

Sometimes you want to be notified on each frame about a property change so you can handle things in a more responsive way. Consider when you have an element on a page, and you want to check its `offsetTop` property so you know when the element is inside/outside the viewport. You can observe the element's `offsetTop` with propserver and be notified when it changes.

**This module should be used on the client side**

## Install
Install via npm with
```sh
$ npm install --save propserver
```

## What makes it responsive?

As you know, calling `requestAnimationFrame` to request an animation frame helps us to optimize operations and
queries on the DOM, since the browser waits for the next frame to render in order to run our callbacks. However,
when requesting many animation frames synchronously, the browser will stack all the repeated request animation frames.  
When you create more than one observer, all animation frames are managed in a timeline so only one `requestAnimationFrame` gets called. 

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

Factory function to create a property observer.

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

The second way to create an observer is with a property-getter function. This method is for cases where
you want to run a function to get the value, like where the property is not a direct property of your target.  
Here is a property-getter example:

```javascript
() => {
    const { top } = target.getBoundingClientRect();
    return top;
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
