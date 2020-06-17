# apple-scroller
Implements fancy scroll animation, as seen in Apple website [like this](https://www.apple.com/airpods-pro/). 

## usage
    const appleScroller = require('apple-scroller')
    require('apple-scroller/style.css') // necessary

    import imgs from './assets/*.png'
    // 1.png, 2.png, 3.png, ...

    let container1 = document.getElementById('container1')
    let appleScroll1 = new appleScroller(container1, imgs, '300vh')
    // container div, img sequence, height of scroll area

    document.getElementById('button').addEventListener('click', () => {appleScroll1.redraw(appleScroll1)})
    // initializes view again.
    // call when viewport size have changed.
    // needs itself as argument for now.