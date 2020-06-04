# tiny-animator

[![CircleCI Status](https://circleci.com/gh/jamet-julien/tiny-animator.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/jamet-julien/tiny-animator)
![Codecov](https://img.shields.io/codecov/c/github/jamet-julien/tiny-animator)
[![npm](https://img.shields.io/npm/dt/tiny-animator.svg?style=flat-square)](https://www.npmjs.com/package/tiny-animator)
[![npm](https://img.shields.io/npm/v/tiny-animator.svg?style=flat-square)](https://www.npmjs.com/package/tiny-animator)
[![npm](https://img.shields.io/npm/l/tiny-animator.svg?style=flat-square)](https://github.com/jamet-julien/tiny-animator/blob/master/LICENSE)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> Make a interpolation between states' object with duration

## [Live example](https://codepen.io/jamet-julien)

-   [Install](#install)
-   [Importing](#importing)
-   [sample](#sample)

## Install <a id="install"></a>

`npm i tiny-animator --save`  
or  
`yarn add tiny-animator`

---

### Importing <a id="importing"></a>

```js
import Animator from "tiny-animator";
```

---

### Sample<a id="sample"></a>

> usage animator plugin

script.js file

```js
let coords = { x: 0, y: 0 };

let animate = Animator(
    coords,
    { x: 300, y: 300 },
    {
        duration: 1000,
        onComplete: () => {
            console.log("Animate completed !");
        }
    }
);

let start = null;

function play(timestamp) {
    if (start === null) start = timestamp;
    progress = timestamp - start;
    animate.update(progress);
    requestAnimationFrame(play);
}

requestAnimationFrame(play);
```

---

## Implement

```js
let animate = Animator(obj, target, params);
```

| argument | type     | Description                                                      |
| :------- | :------- | :--------------------------------------------------------------- |
| `obj`    | `object` | initial state use by reference ( ⚠️ don't use `const` to define) |
| `target` | `object` | final state                                                      |
| `params` | `object` | all params to use                                                |

### ARGUMENT : `params`

```js
const params = {
    duration: 1000,
    effect: (step) => step,
    onComplete: () => {
        console.log("Finiched");
    }
};
```

| argument     | type       | Description                                                       |
| :----------- | :--------- | :---------------------------------------------------------------- |
| `duration`   | `number`   | initial state use by reference ( ⚠️ don't use `const` to define)  |
| `effect`     | `function` | call every update to treat time ( easeIn, easeOut, reverse, ... ) |
| `onComplete` | `function` | call when duration                                                |

#### attribut `effect`

> Receive numbers range 0-1 and need send number range 0-1;

| number | description        |
| :----- | :----------------- |
| `0`    | initial state      |
| `...`  | intermediate state |
| `1`    | final state        |

##### Exemples

```js
const reverse = (num) => 1 - num;

const easeInOut = (num) => (Math.cos((num - 1) * Math.PI) + 1) / 2;

const easeIn = (num) => Math.abs(Math.log(num) / 2);

const easeOut = (num) => Math.log(num) / 2 + 1;
```

## Methods <a id="methods"></a>

### .restart() <a id="restart"></a>

> init animate and enable function `update`

```js
animate.restart();
```

### .stop() <a id="stop"></a>

> stop animate without launch `onComplete` and disable function `update`

```js
animate.stop();
```

### .update(`num`) <a id="update"></a>

> update state on the right time with current step

| argument | type     | Description  |
| :------- | :------- | :----------- |
| `num`    | `number` | step current |

```js
step++;
animate.update(step);
```
