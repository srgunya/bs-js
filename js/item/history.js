function history() {
    let sliderMas
    if (!localStorage.getItem('history')) {
        sliderMas = []
    } else {
        sliderMas = JSON.parse(localStorage.getItem('history'))
    }
    getItem().then(res => {
        sliderMas.forEach((el, i) => {
            if (JSON.stringify(el) === JSON.stringify(res)) {
                sliderMas.splice(i, 1)
            }
        })
        sliderMas.unshift(res)
        if (sliderMas.length == 21) {
            sliderMas.pop()
        }
        localStorage.setItem('history', JSON.stringify(sliderMas))
        creaHist(JSON.parse(localStorage.getItem('history')))
    })
}

function creaHist(elems) {
    let carousel__item = document.querySelectorAll('.carousel__item');
    elems.forEach((el, i) => {
        carousel__item[i].setAttribute('id', el.id)
        carousel__item[i].href = '/item/' + el.id;
        carousel__item[i].querySelector('.carousel__img').style.backgroundImage = 'url(' + el.img + ')';
        carousel__item[i].querySelector('.carousel__brand').textContent = el.brand;
        carousel__item[i].querySelector('.carousel__type').textContent = el.type;
        carousel__item[i].querySelector('.carousel__model').textContent = el.model;
        carousel__item[i].querySelector('.carousel__price').textContent = new Intl.NumberFormat("ru-RU").format(el.price) + ' ₽';
        carousel__item[i].querySelector('.priceDolya__price').textContent += new Intl.NumberFormat("ru-RU").format(Math.round(el.price / 4)) + ' ₽';
        if (el.sale != 0) {
            let item__price_sale = carousel__item[i].querySelector('.carousel__price').cloneNode(true)
            item__price_sale.classList.add('item__price_sale');
            let item__sale = document.createElement('div');
            item__sale.className = 'item__sale';
            let item__proc = document.createElement('div');
            item__proc.className = 'item__proc';
            item__proc.textContent = '\u00A0–' + el.sale + '%';
            let item__price_new = document.createElement('div');
            item__price_new.className = 'item__price_new';
            item__price_new.className = 'item__price_new';
            item__price_new.textContent = new Intl.NumberFormat("ru-RU").format(Math.ceil(el.price - (el.price * el.sale / 100))) + ' ₽';
            item__sale.appendChild(item__price_sale);
            item__sale.appendChild(item__proc);
            item__sale.appendChild(item__price_new);
            carousel__item[i].querySelector('.carousel__price').replaceWith(item__sale);
            carousel__item[i].querySelector('.priceDolya__price').textContent = '\u00A0' + new Intl.NumberFormat("ru-RU").format(Math.round((el.price - (el.price * el.sale / 100)) / 4)) + ' ₽';
        }
        carousel__item[i].querySelector('.carousel__buttonImg_lupa').onmouseup = () => {
            lupa(el)
        }
        carousel__item[i].querySelector('.carousel__buttonImg_star').onclick = () => {
            carousel__item[i].querySelector('.carousel__buttonImg_star').classList.toggle('star_active')
            star(el)
            starProverka(el.id, 'slider')
        }
        carousel__item[i].onclick = (e) => {
            if (e.target.classList.contains('carousel__buttonImg')) {
                e.preventDefault()
            }
        }
        starActive(el.id, carousel__item[i])
    })
    carousel__item.forEach((el) => {
        if (el.querySelector('.carousel__brand').textContent == '') {
            el.remove()
        }
    })
    sliderStart()
    sliderOptions('hist');

}
history()

function sliderStart() {
    let touchDrag;
    let carousel__item = document.querySelectorAll('.carousel__item');
    if (carousel__item.length < 6) {
        touchDrag = false
    } else {
        touchDrag = true
    }
    let options = {
        loop: false,
        slideTransition: 'linear',
        nav: true,
        dots: false,
        touchDrag: touchDrag,
        navText: ['<div class="arrow arrow_left">', '<div class="arrow arrow_right">'],
        responsive: {
            0: {
                items: 5,
                margin: 0,
                slideBy: 5,
                smartSpeed: 60,
            }
        }
    }

    // Empty object where we can store current item's index before drag
    var transient = {};

    var events = {
        onDrag: onDrag.bind(transient),
        onDragged: onDragged.bind(transient)
    };

    $('.histCarousel').owlCarousel(Object.assign(options, events));

    function onDrag(event) {
        this.initialCurrent = event.relatedTarget.current();
    }

    function onDragged(event) {
        var owl = event.relatedTarget;
        var draggedCurrent = owl.current();

        //        моё
        let parent = document.querySelector('.histCarousel');
        let arrow_right = parent.querySelector('.arrow_right');
        let arrow_left = parent.querySelector('.arrow_left');
        let start = document.querySelector('.sliderCount__span_start');
        let end = document.querySelector('.sliderCount__span_end');
        //        моё

        if (draggedCurrent > this.initialCurrent) {
            //            моё
            start.textContent = +start.textContent + 1;
            arrow_left.style.opacity = 1;
            if (+start.textContent >= +end.textContent) {
                start.textContent = end.textContent;
                arrow_right.style.opacity = .1;
            }
            //            моё
            owl.current(this.initialCurrent);
            owl.next();
        } else if (draggedCurrent < this.initialCurrent) {
            //            моё
            start.textContent = +start.textContent - 1;
            arrow_right.style.opacity = 1;
            if (+start.textContent <= 1) {
                start.textContent = 1;
                arrow_left.style.opacity = .1;
            }
            //            моё
            owl.current(this.initialCurrent);
            owl.prev();
        }
    }
}
