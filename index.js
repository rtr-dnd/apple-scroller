class appleScroller {

  constructor (wrapper, imgs, scrollHeight) {

    this.wrapper = wrapper
    this.imgs = imgs

    // height of scroll area. don't use different units between these
    this.scrollHeight = scrollHeight

    this.index = 0
    this.frameLength = 0
    this.img = new Image()
    this.html = document.documentElement
    this.preloadImages()
    this.initContainer()
    this.initCanvas()

    this.img.src = this.getFrame(1)
    this.img.onload = () => {this.fillImage(this.img)}
    this.addScrollListener()
  }

  getFrame (index) {
    return this.imgs[index.toString()]
  }
  preloadImages () {
    Object.keys(this.imgs).forEach((key, ind) => {
      const img = new Image
      img.src = this.getFrame(ind)
      this.frameLength += 1
    })
  }

  initContainer () {
    this.wrapper.innerHTML = ''
    this.container = document.createElement('div')
    this.wrapper.appendChild(this.container)
    this.container.classList.add('apple-scroller-container')
    this.wrapper.style.height = this.scrollHeight
    this.container.style.height = this.scrollHeight
  }
  initCanvas () {
    const canvas = document.createElement('canvas')
    this.canvas = canvas
    this.container.appendChild(canvas)
    this.canvas.classList.add('apple-scroller-canvas')
    this.context = canvas.getContext('2d')

    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }

  fillImage (img) {
    let scale = Math.max(this.canvas.width/img.width, this.canvas.height/img.height)
    this.context.drawImage(img, 0, 0, img.width*scale, img.height*scale)
  }
  update (idx) {
    this.img.src = this.getFrame(idx)
    this.fillImage(this.img)
  }

  addScrollListener () {
    window.addEventListener('scroll', () => {
      const scrollTop = Math.max(this.html.scrollTop - this.wrapper.offsetTop, 0)
      const maxScrollTop = this.container.scrollHeight - window.innerHeight
      const scrollFraction = Math.min(scrollTop / maxScrollTop, 1)
      this.index = Math.min(
        this.frameLength - 1,
        Math.ceil(scrollFraction * this.frameLength)
      )
      requestAnimationFrame(() => this.update(this.index + 1))
    })
  }

  redraw (self) {
    self.initContainer()
    self.initCanvas()
    self.addScrollListener()
    this.img.src = this.getFrame(this.index)
    this.img.onload = () => {this.fillImage(this.img)}
  }
}

module.exports = appleScroller