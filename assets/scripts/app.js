// location tods

const locationBtns = document.querySelectorAll('.main__location-dot'),
    locationEl = document.querySelectorAll('.main__location-item');

window.addEventListener('load', function () {
    let deviceWidth = window.innerWidth;
    if (deviceWidth >= 768) {
        locationBtns.forEach((btn) => {
            btn.addEventListener('click', function () {
                const parent = this.closest('.main__location-el'),
                    parentEl = parent.querySelector('.main__location-item')

                if (parentEl.classList.contains('active')) {
                    parentEl.classList.remove('active');
                }
                else {
                    for (let i = 0; i < locationEl.length; i++) {
                        locationEl[i].classList.remove('active')
                    }
                    parentEl.classList.add('active');
                }
            })
        })
    }
})

const catalogBtns = document.querySelectorAll('.main__catalog-btn'),
    catalogViews = document.querySelectorAll('.main__catalog-views');

catalogBtns.forEach((el, i) => {
    el.addEventListener('click', (e) => {
        let attr = e.target.getAttribute('data-category');
        if (e.target.hasAttribute('data-category')) {
            for (let i = 0; i < catalogViews.length; i++) {
                catalogBtns[i].classList.remove('active');
                catalogViews[i].classList.remove('active');
            }
            el.classList.add('active');
            catalogViews[attr].classList.add('active');
        }
    })
})

class Slider {
    constructor({ el, direction, time, autoplay, interval }) {
        this.slider = document.querySelector(el);
        this.sliderLine = this.slider.querySelector('.slider__line')
        this.slides = [...this.sliderLine.children]
        this.dir = direction.toUpperCase() === 'Y' ? 'Y' : 'X'
        this.timeMove = time || 1000
        this.interval = this.timeMove + 1000 < interval ? interval : this.timeMove + 3000
        this.prev = this.slider.querySelector('.slider__prev')
        this.next = this.slider.querySelector('.slider__next')
        this.positionSlide = this.slider.querySelector('.slide__info-version')
        this.length = this.slider.querySelector('.slide__info-length')
        this.width = this.sliderLine.clientWidth
        this.height = this.sliderLine.clientHeight
        this.moveSize = this.dir == 'X' ? this.width : this.height
        this.activeSlide = 0;
        this.length.innerHTML = this.slides.length
        this.sliderLine.style = `
        position:relative;
        height:${this.height}px;
        overflow:hidden
       `
        this.slides.forEach((sl, i) => {
            sl.style = `
                position:absolute;
                height:${this.height}px;
                width:${this.width}px;
            `
            if (i !== this.activeSlide) {
                sl.style.transform = `translate${this.dir}(${this.moveSize}px)`
            }
            if (i == this.slides.length - 1) {
                sl.style.transform = `translate${this.dir}(-${this.moveSize}px)`
            }
        })

        this.prev.onclick = () => this.move(this.prev)
        this.next.onclick = () => this.move(this.next)

        if (autoplay) {
            let intervalId = setInterval(() => this.move(this.next), this.interval);

            this.slider.addEventListener('mouseenter', () => {
                clearInterval(intervalId)
            })

            this.slider.addEventListener('mouseleave', () => {
                intervalId = setInterval(() => this.move(this.next), this.interval);
            })
        }
    }

    move(btn) {
        this.prev.disabled = true
        this.next.disabled = true
        setTimeout(() => {
            this.prev.disabled = false
            this.next.disabled = false
        }, this.timeMove);
        let btnLeftOrRight = btn == this.next ? this.moveSize * -1 : this.moveSize

        this.slides.forEach((sl, i) => {
            sl.style.transition = '0ms'
            if (i !== this.activeSlide) {
                sl.style.transform = `translate${this.dir}(${btnLeftOrRight * -1}px)`
            }
        })

        this.slides[this.activeSlide].style.transition = this.timeMove + 'ms'
        this.slides[this.activeSlide].style.transform = `translate${this.dir}(${btnLeftOrRight}px)`

        if (btn == this.next) {
            this.activeSlide++
            if (this.activeSlide >= this.slides.length) {
                this.activeSlide = 0
            }
        } else if (btn == this.prev) {
            this.activeSlide--
            if (this.activeSlide < 0) {
                this.activeSlide = this.slides.length - 1
            }
        }
        this.slides[this.activeSlide].style.transition = this.timeMove + 'ms'
        this.slides[this.activeSlide].style.transform = `translate${this.dir}(0px)`

        this.positionSlide.innerHTML = `${this.activeSlide + 1}/`
    }

}


const slider1 = new Slider({
    el: '#slider1',
    direction: 'X',
    time: 1000,
    autoplay: true,
    interval: 5000
})
const slider2 = new Slider({
    el: '#slider2',
    direction: 'X',
    time: 1000,
    autoplay: true,
    interval: 5000
})
const slider3 = new Slider({
    el: '#slider3',
    direction: 'X',
    time: 1000,
    autoplay: true,
    interval: 5000
})
