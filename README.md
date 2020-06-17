# apple-scroller
Implements fancy scroll animation, as seen in Apple website [like this](https://www.apple.com/airpods-pro/). 

[Live demo](https://apple-scroller.web.app/)

- Supports multiple scrolling content in single page.
- Preloads images to make animation smoother.
- Covers the entire screen. 

# Notes
- Animation rendered as sequential images
- The more image exists, the smoother the animation becomes
- Works fine with Node v14.4.0, Chrome 83.0.4103.97

## Installation
```
npm i apple-scroller
```

## Usage
```js
const appleScroller = require('apple-scroller')
require('apple-scroller/style.css') // necessary

import imgs from './assets/*.png'
// 1.png, 2.png, 3.png, ...

let container1 = document.getElementById('container1')
let appleScroll1 = new appleScroller(container1, imgs, '300vh')
// container div, img sequence, height of scroll area
// 200vh: short animation
// 500vh: long animation


document.getElementById('button').addEventListener('click', () => {appleScroll1.redraw(appleScroll1)})
// initializes view again.
// call when viewport size have changed.
// needs itself as argument for now.


// supports multiple scrolling element
let container2 = document.getElementById('container2')
let appleScroll2 = new appleScroller(container2, imgs, '1000vh')
```

## Credit
Inpired by the tutorial of [CSS Tricks](https://css-tricks.com/lets-make-one-of-those-fancy-scrolling-animations-used-on-apple-product-pages/). Thanks!