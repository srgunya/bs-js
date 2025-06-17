function getCount() {
    fetch('/' + encodeURI("logoCount"))
        .then(res => res.json())
        .then(res => {
            let count = res[0]['COUNT(*)'];
            sliderData(count, 'logo')
        })
    fetch('/' + encodeURI("sliderCount"))
        .then(res => res.json())
        .then(res => {
            let count = res[0]['COUNT(*)'];
            sliderData(count, 'new')
            sliderData(count, 'pop')
        })
}

function getItem(x, slider) {
    return fetch('/' + encodeURI(slider), {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(x)
        })
        .then(res => res.json())
        .then(res => {
            return res
        })
}
getCount();

function sliderData(count, slider) {

    let ids;
    if (slider == 'logo') {
        ids = Array(40);
    } else if (slider == 'new' || slider == 'pop') {
        ids = Array(20);
    }

    function getRandomInt(count) {
        let min = 1;
        let max = count;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    for (let i = 0; i < ids.length;) {
        let rndm = getRandomInt(count);
        if (ids.indexOf(rndm) == -1) {
            ids[i] = rndm;
            i++
        }
    }

    if (slider == 'logo') {
        let logoCarousel__img = document.querySelectorAll('.carousel__img_logo');

        getItem(ids, 'logo').then(res => {
            res.forEach((logo, i) => {
                logoCarousel__img[i].style.backgroundImage = 'url(' + logo.logo + ')';
                logoCarousel__img[i].href = '/list/' + 'brand=' + logo.brand + '!';
            })
        })
    } else if (slider == 'new' || slider == 'pop') {

        let parent;

        if (slider == 'new') {
            parent = document.querySelector('.newCarousel');
        } else if (slider == 'pop') {
            parent = document.querySelector('.popCarousel');
        }
        let carousel__item = parent.querySelectorAll('.carousel__item');

        getItem(ids, 'slider').then(res => {
            res.forEach((res, i) => {
                carousel__item[i].href = '/item/' + res.id
                carousel__item[i].querySelector('.carousel__img').style.backgroundImage = 'url(' + res.img + ')';
                carousel__item[i].querySelector('.carousel__brand').textContent = res.brand;
                carousel__item[i].querySelector('.carousel__type').textContent = res.type;
                carousel__item[i].querySelector('.carousel__model').textContent = res.model;
                carousel__item[i].querySelector('.carousel__price').textContent = new Intl.NumberFormat("ru-RU").format(res.price) + ' ₽';
                carousel__item[i].querySelector('.priceDolya__price').textContent += new Intl.NumberFormat("ru-RU").format(Math.round(res.price / 4)) + ' ₽';
                if (res.sale != 0) {
                    let item__price_sale = carousel__item[i].querySelector('.carousel__price').cloneNode(true)
                    item__price_sale.classList.add('item__price_sale');
                    let item__sale = document.createElement('div');
                    item__sale.className = 'item__sale';
                    let item__proc = document.createElement('div');
                    item__proc.className = 'item__proc';
                    item__proc.textContent = '\u00A0–' + res.sale + '%';
                    let item__price_new = document.createElement('div');
                    item__price_new.className = 'item__price_new';
                    item__price_new.className = 'item__price_new';
                    item__price_new.textContent = new Intl.NumberFormat("ru-RU").format(Math.ceil(res.price - (res.price * res.sale / 100))) + ' ₽';
                    item__sale.appendChild(item__price_sale);
                    item__sale.appendChild(item__proc);
                    item__sale.appendChild(item__price_new);
                    carousel__item[i].querySelector('.carousel__price').replaceWith(item__sale);
                    carousel__item[i].querySelector('.priceDolya__price').textContent = '\u00A0' + new Intl.NumberFormat("ru-RU").format(Math.round((res.price - (res.price * res.sale / 100)) / 4)) + ' ₽';
                }
                carousel__item[i].querySelector('.carousel__buttonImg_lupa').onmouseup = () => {
                    lupa(res)
                }
                carousel__item[i].querySelector('.carousel__buttonImg_star').onclick = () => {
                    carousel__item[i].querySelector('.carousel__buttonImg_star').classList.toggle('star_active')
                    star(res)
                }
                carousel__item[i].onclick = (e) => {
                    if (e.target.classList.contains('carousel__buttonImg')) {
                        e.preventDefault()
                    }
                }
                starActive(res.id, carousel__item[i])
            })
        })
    }
}

function sliderStart() {
    $('.logoCarousel').owlCarousel({
        loop: false,
        slideTransition: 'linear',
        nav: true,
        dots: false,
        navText: ['<div class="arrow arrow_left">', '<div class="arrow arrow_right">'],
        responsive: {
            0: {
                items: 1,
                margin: 0,
                slideBy: 1,
                smartSpeed: 300
            }
        }
    })
    $('.newCarousel').owlCarousel({
        loop: false,
        slideTransition: 'linear',
        nav: true,
        dots: false,
        navText: ['<div class="arrow arrow_left">', '<div class="arrow arrow_right">'],
        responsive: {
            0: {
                items: 1,
                margin: 0,
                slideBy: 1,
                smartSpeed: 300
            }
        }
    })
    $('.popCarousel').owlCarousel({
        loop: false,
        slideTransition: 'linear',
        nav: true,
        dots: false,
        navText: ['<div class="arrow arrow_left">', '<div class="arrow arrow_right">'],
        responsive: {
            0: {
                items: 1,
                margin: 0,
                slideBy: 1,
                smartSpeed: 300
            }
        }
    })
}
sliderStart()

sliderOptions('logo');
sliderOptions('new');
sliderOptions('pop');
