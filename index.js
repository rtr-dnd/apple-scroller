class appleScroller {
  constructor (container, sequence) {
    this.container = container
    this.imgs = sequence
    this.index = 0
    this.frameLength = 0
    this.img = new Image()
    this.html = document.documentElement
    this.preloadImages()
    this.initCanvas()
    this.addScrollListener()
  }
  check () {
    console.log(this.imgs)
    console.log(this.getFrame(0))
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

  initCanvas () {
    // clearing content
    this.container.innerHTML = ''
    const canvas = document.createElement('canvas')
    this.canvas = canvas
    this.container.appendChild(canvas)
    this.context = canvas.getContext('2d')

    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    this.img.src = this.getFrame(1)
    this.img.onload = () => {this.fillImage(this.img)}
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
      const scrollTop = this.html.scrollTop
      const maxScrollTop = this.container.scrollHeight - window.innerHeight
      const scrollFraction = Math.min(scrollTop / maxScrollTop, 1)
      this.index = Math.min(
        this.frameLength - 1,
        Math.ceil(scrollFraction * this.frameLength)
      )
      requestAnimationFrame(() => this.update(this.index + 1))
    })
  }
}

module.exports = appleScroller