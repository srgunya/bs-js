function slider() {
    let shopsSlider_one = document.querySelector('.shopsSlider_one');
    let shopsSlider_two = document.querySelector('.shopsSlider_two');

    shopsSlider_one.querySelectorAll('.slider__img').forEach((el, i) => {
        el.style.backgroundImage = 'url(' + '../../img/shops/store_' + '1_' + (i + 1) + '.jpg)';
    })
    shopsSlider_two.querySelectorAll('.slider__img').forEach((el, i) => {
        el.style.backgroundImage = 'url(' + '../../img/shops/store_' + '2_' + (i + 1) + '.jpg)';
    })

    function sliderInit() {
        $('.owl-carousel').owlCarousel({
            loop: true,
            slideTransition: 'linear',
            nav: false,
            dots: true,
            responsive: {
                0: {
                    items: 1,
                    margin: 0,
                    slideBy: 1,
                    smartSpeed: 250
                }
            }
        })
    }

    function dots() {
        shopsSlider_one.querySelectorAll('.owl-dot').forEach((el, i) => {
            el.style.backgroundImage = 'url(' + '../../img/shops/store_' + '1_' + (i + 1) + '.jpg)';
        })
        shopsSlider_two.querySelectorAll('.owl-dot').forEach((el, i) => {
            el.style.backgroundImage = 'url(' + '../../img/shops/store_' + '2_' + (i + 1) + '.jpg)';
        })
    }

    sliderInit()
    dots()
}


slider()
