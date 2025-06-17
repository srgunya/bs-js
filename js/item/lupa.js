function lupa(item) {
    let block = document.querySelector('.lupa')
    block.setAttribute('id', item.id)
    slider()
    info()
    addBusket(item, block)

    function slider() {
        creaSlider(item.img);
        item.photo.split(',').forEach((url) => {
            creaSlider(url)
        })
        sliderStart()

        function creaSlider(url) {
            let sliderLupa = block.querySelector('.sliderLupa');
            let image_zoom = document.createElement('div');
            image_zoom.className = 'image-zoom'
            let itemLupa = document.createElement('div');
            itemLupa.className = 'itemLupa';
            itemLupa.setAttribute('src', url)
            itemLupa.style.backgroundImage = 'url(' + url + ')';
            let image_zoom_block = document.createElement('div');
            image_zoom_block.className = 'image-zoom-block'
            image_zoom.appendChild(itemLupa)
            image_zoom.appendChild(image_zoom_block)
            sliderLupa.appendChild(image_zoom)
        }

        function creaDots(dots) {
            let owl_dots = dots
            if (owl_dots.length > 0) {
                owl_dots.forEach((el, i) => {
                    let shadow = document.createElement('div');
                    shadow.className = 'dot__shadow';
                    el.appendChild(shadow)
                    if (i == 0) {
                        el.style.backgroundImage = 'url(' + item.img + ')';
                    } else {
                        el.style.backgroundImage = 'url(' + item.photo.split(',')[i - 1] + ')';
                    }
                })
            }
        }

        function sliderStart() {
            $('.sliderLupa').owlCarousel({
                loop: false,
                slideTransition: 'ease',
                nav: false,
                dots: true,
                responsive: {
                    0: {
                        items: 1,
                        margin: 0,
                        slideBy: 1,
                        smartSpeed: 200
                    }
                }
            })
            zoom('lupa')
            let dots = block.querySelector('.sliderLupa').querySelector('.owl-dots').querySelectorAll('span')
            creaDots(dots)
        }
    }

    function info() {
        let lupa__link_item = block.querySelector('.lupa__link_item');
        lupa__link_item.href = '/item/' + item.id;
        let info__name = block.querySelector('.info__name');
        info__name.textContent = item.brand;
        let typeModel__type = block.querySelector('.typeModel__type');
        typeModel__type.textContent = item.type;
        let typeModel__model = block.querySelector('.typeModel__model');
        typeModel__model.textContent = item.model
        size()
        price()

        function size() {
            let size = item.size.split(',');
            let infoSize = block.querySelector('.infoSize')
            size.forEach((size, i) => {
                let infoSize__size = document.createElement('div');
                infoSize__size.className = 'infoSize__size'
                infoSize__size.textContent = size
                infoSize.appendChild(infoSize__size)
                if (i == 0) {
                    infoSize__size.classList.add('infoSize__size_active')
                }
            })
            if (size.length < 4) {
                infoSize.style.justifyContent = 'center'
            } else {
                infoSize.style.justifyContent = 'flex-start'
            }
            [...infoSize.children].forEach((el, i, arr) => {
                el.onclick = () => {
                    let active = block.querySelector('.infoSize__size_active');
                    arr.forEach((el) => el.classList.remove('infoSize__size_active'))
                    el.classList.add('infoSize__size_active')
                    let addBusket__size = block.querySelector('.addBusket__size');
                    addBusket__size.textContent = el.textContent;
                    if (!active.classList.contains('infoSize__size_active')) {
                        addBusket(item, block)
                    }
                }
            });
            [...infoSize.children][0].click()
        }

        function price() {
            let info_price_new = block.querySelector('.info_price_new');
            let info_price_old = block.querySelector('.info_price_old');
            let info_price_proc = block.querySelector('.info_price_proc');
            let infoPrice = block.querySelector('.infoPrice');
            let infoDolya__price = block.querySelector('.infoDolya__price');
            if (item.sale != 0) {
                info_price_new.textContent = new Intl.NumberFormat("ru-RU").format(Math.ceil(item.price - (item.price * item.sale / 100))) + ' ₽';
                info_price_old.textContent = new Intl.NumberFormat("ru-RU").format(item.price) + ' ₽';
                info_price_proc.textContent = '–' + item.sale + '%';
                infoDolya__price.textContent = 'по ' + new Intl.NumberFormat("ru-RU").format(Math.round((item.price - (item.price * item.sale / 100)) / 4)) + ' ₽';
                infoPrice.classList.add('infoPrice_sale');
            } else {
                info_price_new.textContent = new Intl.NumberFormat("ru-RU").format(item.price) + ' ₽';
                info_price_old.textContent = '';
                info_price_proc.textContent = '';
                infoPrice.classList.remove('infoPrice_sale');
                infoDolya__price.textContent = 'по ' + new Intl.NumberFormat("ru-RU").format(Math.round(item.price / 4)) + ' ₽';
            }
        }
    }

}

function lupaClick() {
    let carousel__buttonImg_lupa;
    if (window.location.pathname.split('/')[1] == 'item' ||
        window.location.pathname == '/') {
        carousel__buttonImg_lupa = document.querySelectorAll('.carousel__buttonImg_lupa');
    } else if (window.location.pathname.split('/')[1] == 'list' ||
        window.location.pathname.split('/')[1] == 'wishlist') {
        carousel__buttonImg_lupa = document.querySelectorAll('.item__buttonImg_lupa');
    }
    let body = document.querySelector('body');
    let header = document.querySelector('header');
    let lupa__close = document.querySelector('.lupa__close');
    let lupa = document.querySelector('.lupa');
    let lupa__cont = document.querySelector('.lupa__cont')
    carousel__buttonImg_lupa.forEach((el) => {
        el.onclick = () => {
            body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px';
            header.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px';
            body.style.overflow = 'hidden';
            lupa.classList.add('lupa_open')
            lupa.style.display = 'flex'
            setTimeout(() => {
                lupa.style.opacity = 1
                setTimeout(() => {
                    lupa__cont.style.bottom = 0;
                    lupa__cont.style.opacity = 1;
                }, 100)
            }, 100)
        }
    })

    lupa__close.onclick = lupaClose;
    lupa.onclick = (e) => {
        if (e.target == lupa) {
            lupaClose()
        }
    }

    function lupaClose() {
        lupa.classList.remove('lupa_open')
        lupa__cont.style.bottom = -65.8327847268 + 'vw';
        lupa__cont.style.opacity = 0;
        lupa.style.opacity = 0
        setTimeout(() => {
            lupa.style.display = 'none';
            body.style.paddingRight = 0;
            header.style.paddingRight = 0;
            body.style.overflow = 'inherit';
        }, 200)
        setTimeout(() => {
            let slider = document.querySelector('.sliderLupa')
            $('.sliderLupa').owlCarousel('destroy')
            while (slider.firstChild) {
                slider.removeChild(slider.firstChild);
            }
            let infoSize = lupa.querySelector('.infoSize');
            while (infoSize.firstChild) {
                infoSize.removeChild(infoSize.firstChild);
            }
        }, 300)

    }
}
if (window.location.pathname.split('/')[1] == 'item' ||
    window.location.pathname == '/') {
    lupaClick()
}
