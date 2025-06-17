function sliderOptions(slider) {
    let parent;
    if (slider == 'logo') {
        parent = document.querySelector('.logoCarousel');
    } else if (slider == 'new') {
        parent = document.querySelector('.newCarousel');
    } else if (slider == 'pop') {
        parent = document.querySelector('.popCarousel');
    } else if (slider == 'hist') {
        parent = document.querySelector('.histCarousel');
    }

    let owl_nav = parent.querySelector('.owl-nav');

    let sliderName = document.createElement('span');
    if (slider == 'logo') {
        sliderName.textContent = "Популярные бренды";
    } else if (slider == 'new') {
        sliderName.textContent = "Новые поступления";
    } else if (slider == 'pop') {
        sliderName.textContent = "Популярные товары";
    }
    sliderName.className = 'sliderName';
    owl_nav.appendChild(sliderName);

    let sliderCount = document.createElement('div');
    sliderCount.className = 'sliderCount'
    let start = document.createElement('span');
    start.className = 'sliderCount__span sliderCount__span_start'
    start.textContent = 1;
    let slash = document.createElement('span');
    slash.textContent = '/';
    slash.className = 'sliderCount__span sliderCount__span_slash'
    let end = document.createElement('span');
    if (document.querySelector('.histCarousel')) {
        let carousel__item = document.querySelectorAll('.carousel__item').length;
        end.textContent = Math.ceil(carousel__item / 5);
    } else {
        end.textContent = 4;
    }
    end.className = 'sliderCount__span sliderCount__span_end'
    sliderCount.appendChild(start);
    sliderCount.appendChild(slash);
    sliderCount.appendChild(end);
    owl_nav.appendChild(sliderCount);


    let owl_next = parent.querySelector('.owl-next');
    let owl_prev = parent.querySelector('.owl-prev');
    let arrow_right = parent.querySelector('.arrow_right');
    let arrow_left = parent.querySelector('.arrow_left');
    owl_next.onclick = function () {
        start.textContent = +start.textContent + 1;
        arrow_left.style.opacity = 1;
        if (+start.textContent >= +end.textContent) {
            start.textContent = end.textContent;
            arrow_right.style.opacity = .1;
        }
    }
    owl_prev.onclick = function () {
        start.textContent = +start.textContent - 1;
        arrow_right.style.opacity = 1;
        if (+start.textContent <= 1) {
            start.textContent = 1;
            arrow_left.style.opacity = .1;
        }
    }
}
