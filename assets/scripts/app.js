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
