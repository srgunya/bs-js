function items(LIMIT, OFFSET, mas, filter) {

    function getItems(LIMIT, OFFSET) {
        return fetch('/getItems', {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bildPost(LIMIT, OFFSET))
            })
            .then(res => res.json())
            .then(res => {
                return res
            })
    }
    if (!mas || mas.length == 0) {
        getItems(LIMIT, OFFSET).then(res => creaItem(res))
    } else {
        creaItem(mas)
    }

    function creaItem(res) {
        let items = document.querySelector('.items');
        if (filter == true) {
            items.innerHTML = '';
        }
        res.forEach((el, i, arr) => {
            let item = document.createElement('a');
            item.href = '/item/' + el.id;
            item.className = 'item';
            item.setAttribute('id', el.id)
            let item__img = document.createElement('div');
            item__img.className = 'item__img';
            item__img.style.backgroundImage = 'url(' + el.img + ')';
            let item__brand = document.createElement('div');
            item__brand.className = 'item__brand';
            item__brand.textContent = el.brand;
            let item__type = document.createElement('div');
            item__type.className = 'item__type';
            item__type.textContent = el.type;
            let item__model = document.createElement('div');
            item__model.className = 'item__model';
            item__model.textContent = el.model;
            let item__price = document.createElement('div');
            let item__sale;
            let item__proc;
            let item__price_new;
            if (el.sale != 0) {
                item__price.className = 'item__price item__price_sale';
                item__sale = document.createElement('div');
                item__sale.className = 'item__sale';
                item__proc = document.createElement('div');
                item__proc.className = 'item__proc'
                item__proc.textContent = '\u00A0–' + el.sale + '%';
                item__price_new = document.createElement('div');
                item__price_new.className = 'item__price_new';
                item__price_new.textContent = new Intl.NumberFormat("ru-RU").format(Math.ceil(el.price - (el.price * el.sale / 100))) + ' ₽';

            } else {
                item__price.className = 'item__price';
            }
            item__price.textContent = new Intl.NumberFormat("ru-RU").format(el.price) + ' ₽';
            let priceDolya = document.createElement('div');
            priceDolya.className = 'priceDolya';
            let priceDolya__img = document.createElement('div');
            priceDolya__img.className = 'priceDolya__img';
            priceDolya.appendChild(priceDolya__img);
            let priceDolya__text = document.createElement('span');
            priceDolya__text.className = 'priceDolya__text';
            priceDolya__text.textContent = 'Долями по';
            priceDolya.appendChild(priceDolya__text);
            let priceDolya__price = document.createElement('span');
            priceDolya__price.className = 'priceDolya__price';
            if (el.sale != 0) {
                priceDolya__price.textContent = '\u00A0' + new Intl.NumberFormat("ru-RU").format(Math.round((el.price - (el.price * el.sale / 100)) / 4)) + ' ₽';
            } else {
                priceDolya__price.textContent = '\u00A0' + new Intl.NumberFormat("ru-RU").format(Math.round(el.price / 4)) + ' ₽';
            }

            priceDolya.appendChild(priceDolya__price);
            let item__shadow = document.createElement('div');
            item__shadow.className = 'item__shadow';
            let item__button = document.createElement('div');
            item__button.className = 'item__button';
            let item__buttonImg_star = document.createElement('div');
            item__buttonImg_star.className = 'item__buttonImg item__buttonImg_star';
            item__button.appendChild(item__buttonImg_star);
            let item__buttonImg_lupa = document.createElement('div');
            item__buttonImg_lupa.className = 'item__buttonImg item__buttonImg_lupa';
            item__button.appendChild(item__buttonImg_lupa);
            let size = document.createElement('div');
            size.className = 'itemSize';
            el.size.split(',').forEach((a, i) => {
                let sizeDiv = document.createElement('div');
                sizeDiv.className = 'itemSize__div';
                let sizeDiv__size = document.createElement('span');
                sizeDiv__size.className = 'itemSize__size'
                sizeDiv__size.textContent = a;
                let img = document.createElement('div');
                img.className = 'itemSize__img';
                img.style.backgroundImage = 'url(../../img/slider/ok.svg)';
                sizeDiv.appendChild(sizeDiv__size);
                sizeDiv.appendChild(img);
                size.appendChild(sizeDiv);
                sizeClick(sizeDiv, el)
            })
            item__shadow.appendChild(size);
            item.appendChild(item__img);
            item.appendChild(item__brand);
            item.appendChild(item__type);
            item.appendChild(item__model);
            if (item__sale) {
                item__sale.appendChild(item__price);
                item__sale.appendChild(item__proc);
                item__sale.appendChild(item__price_new);
                item.appendChild(item__sale);
            } else {
                item.appendChild(item__price);
            }
            item.appendChild(priceDolya);
            item.appendChild(item__shadow);
            item.appendChild(item__button);
            items.appendChild(item);
            shadowAnim(item, item__shadow, size, mas)
            starActive(el.id, item)
            item.querySelector('.item__buttonImg_lupa').onmouseup = () => {
                lupa(el)
            }
            item.querySelector('.item__buttonImg_star').onclick = () => {
                item.querySelector('.item__buttonImg_star').classList.toggle('star_active')
                star(el)
            }
            item.onclick = (e) => {
                if (e.target.classList.contains('item__buttonImg')) {
                    e.preventDefault()
                }
            }
            if (i == arr.length - 1) {
                lupaClick()
            }
        })
    }
}

function shadowAnim(item, item__shadow, size, mas) {
    if (size.querySelectorAll('.itemSize__div').length <= 3) {
        size.style.justifyContent = 'center';
    }
    item.onmouseenter = () => {
        if (mas) {
            item__shadow.querySelector('.itemSize').style.display = 'flex';
            setTimeout(() => item__shadow.style.height = item.offsetHeight + size.offsetHeight + 'px', 1)
        } else {
            item__shadow.style.height = item.offsetHeight + size.offsetHeight + 'px';
        }
    }
    item.onmouseleave = () => {
        if (mas) {
            item__shadow.style.height = 100 + '%';
            item__shadow.querySelector('.itemSize').style.display = 'none'
        } else {
            item__shadow.style.height = 95 + '%';
        }

    }
}

function sizeClick(sizeDiv, el) {
    sizeDiv.onclick = (e) => {
        e.preventDefault()
        elCrea(e, el);
        anim(e);
    }

    function anim(e) {
        sizeDiv.onclick = (e) => {
            e.preventDefault()
            return false
        }
        let img = sizeDiv.querySelector('.itemSize__img');
        sizeDiv.style.color = 'rgba(0, 0, 0, 0)';
        img.style.opacity = 1;
        setTimeout(() => {
            img.style.opacity = 0;
            setTimeout(() => {
                sizeDiv.style.color = 'black';
                sizeDiv.onclick = (e) => {
                    e.preventDefault()
                    elCrea(e, el)
                    anim(e);
                }
            }, 800)
        }, 800)
    }

    function elCrea(e, el) {
        let element = Object.assign({}, el);
        element.size = e.target.parentNode.firstChild.textContent
        basket(element)
    }
}
