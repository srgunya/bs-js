    function getItem() {
        let id = window.location.href.split('/').slice(-1)[0]
        let body = {
            id: id
        }
        return fetch('/getPage', {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(res => {
                res = res[0]
                return res
            })
    }

    function item() {
        let block = document.querySelector('.itemBody');

        getItem().then(res => {
            block.setAttribute('id', res.id)
            addBusket(res, block)
            creaButImg(res.img)
            creaBigImg(res.img)
            res.photo.split(',').forEach((url) => {
                creaButImg(url)
                creaBigImg(url)
            })
            let info__name = document.querySelector('.info__name');
            info__name.textContent = res.brand
            let typeModel__type = document.querySelector('.typeModel__type');
            typeModel__type.textContent = res.type;
            let typeModel__model = document.querySelector('.typeModel__model');
            typeModel__model.textContent = res.model;
            let infoSize = document.querySelector('.infoSize')
            res.size.split(',').forEach((el) => {
                let infoSize__size = document.createElement('div');
                infoSize__size.className = 'infoSize__size';
                infoSize__size.textContent = el
                infoSize.appendChild(infoSize__size)
                infoSize = document.querySelector('.infoSize')
            })
            size(infoSize, res);
            let info_price_new = document.querySelector('.info_price_new');
            let info_price_old = document.querySelector('.info_price_old');
            let info_price_proc = document.querySelector('.info_price_proc');
            let infoPrice = document.querySelector('.infoPrice');
            let infoDolya__price = document.querySelector('.infoDolya__price');
            if (res.sale != 0) {
                info_price_new.textContent = new Intl.NumberFormat("ru-RU").format(Math.ceil(res.price - (res.price * res.sale / 100))) + ' ₽';
                info_price_old.textContent = new Intl.NumberFormat("ru-RU").format(res.price) + ' ₽';
                info_price_proc.textContent = '–' + res.sale + '%';
                infoDolya__price.textContent = 'по ' + new Intl.NumberFormat("ru-RU").format(Math.round((res.price - (res.price * res.sale / 100)) / 4)) + ' ₽';
                infoPrice.classList.add('infoPrice_sale');
            } else {
                info_price_new.textContent = new Intl.NumberFormat("ru-RU").format(res.price) + ' ₽';
                infoDolya__price.textContent = 'по ' + new Intl.NumberFormat("ru-RU").format(Math.round(res.price / 4)) + ' ₽';
            }
            let infoInfo__cod_cod = document.querySelector('.infoInfo__cod_cod');
            infoInfo__cod_cod.textContent = res.id
            let info__bolshe_span = document.querySelector('.info__bolshe_span');
            info__bolshe_span.textContent = res.brand;
            let info__bolshe = document.querySelector('.info__bolshe');
            info__bolshe.href = '/list/' + 'brand=' + res.brand + '!'
            let opisanie__ul = document.querySelector('.opisanie__ul');
            res.info.split(',').forEach((el) => {
                let opisanie__li = document.createElement('li');
                opisanie__li.className = 'opisanie__li';
                opisanie__li.textContent = el;
                opisanie__ul.appendChild(opisanie__li)
            })
            zoom('item')
            let izb = document.querySelector('.infoInfo__block_star')
            izb.onclick = () => {
                izb.querySelector('.infoInfo__star').classList.toggle('star_active')
                star(res)
                starProverka(res.id, 'item')
            }
            starActive(res.id, izb)
        })

        function creaButImg(url) {
            let butImg = document.querySelector('.butImg');
            let butImg__img = document.createElement('div');
            butImg__img.className = 'butImg__img';
            butImg__img.style.backgroundImage = 'url(' + url + ')';
            let butImg__img_shadow = document.createElement('div');
            butImg__img_shadow.className = 'butImg__img_shadow';
            butImg__img.appendChild(butImg__img_shadow);
            butImg.appendChild(butImg__img);
            butImgClick(butImg__img)
        }

        function creaBigImg(url) {
            let bigImg = document.querySelector('.bigImg');
            let image_zoom = document.createElement('div');
            image_zoom.className = 'image-zoom'
            let bigImg__img = document.createElement('div');
            bigImg__img.className = 'bigImg__img';
            bigImg__img.setAttribute('src', url)
            bigImg__img.style.backgroundImage = 'url(' + url + ')';
            let image_zoom_block = document.createElement('div');
            image_zoom_block.className = 'image-zoom-block'
            image_zoom.appendChild(bigImg__img)
            image_zoom.appendChild(image_zoom_block)
            bigImg.appendChild(image_zoom)
            scroll(image_zoom)
        }

        function size(infoSize, res) {
            let addBusket__size = document.querySelector('.addBusket__size')
            let x = infoSize.children.length;
            if (x <= 3) {
                infoSize.style.justifyContent = 'center'
            }
            infoSize.children[0].classList.add('infoSize__size_active');
            addBusket__size.textContent = infoSize.children[0].textContent;
        [...infoSize.children].forEach((el) => {
                el.onclick = (e) => {
                    let active = document.querySelector('.infoSize__size_active');
                    [...infoSize.children].forEach((el) => {
                        el.classList.remove('infoSize__size_active')
                    })
                    el.classList.add('infoSize__size_active')
                    addBusket__size.textContent = el.textContent;
                    if (!active.classList.contains('infoSize__size_active')) {
                        addBusket(res, block)
                    }
                }
            });
            [...infoSize.children][0].click()
        }

        function copy() {
            let infoInfo__cod_block_wrap = document.querySelector('.infoInfo__cod_block_wrap');
            let infoInfo__block_cod = document.querySelector('.infoInfo__block_cod');
            infoInfo__block_cod.onclick = click;

            function click() {
                infoInfo__block_cod.onclick = false;
                infoInfo__cod_block_wrap.style.display = 'flex';
                setTimeout(() => {
                    infoInfo__cod_block_wrap.style.opacity = 1;
                    infoInfo__cod_block_wrap.style.top = -2.6333113891 + 'vw';
                }, 100)
                setTimeout(() => {
                    infoInfo__cod_block_wrap.style.opacity = 0;
                    infoInfo__cod_block_wrap.style.top = -3.2916392363 + 'vw';
                    setTimeout(() => {
                        infoInfo__cod_block_wrap.style.display = 'none';
                        infoInfo__block_cod.onclick = click;
                    }, 300)
                }, 1000)
                navigator.clipboard.writeText(document.querySelector(".infoInfo__cod_cod").innerText)

            }
        }
        copy()

        function opisanie() {
            let infoInfo__block_opisanie = document.querySelector('.infoInfo__block_opisanie');
            let opisanie__ul = document.querySelector('.opisanie__ul');
            let height__opisanie;
            let infoInfo__plus_col = document.querySelector('.infoInfo__plus_col');
            window.onload = () => {
                height__opisanie = opisanie__ul.offsetHeight;
                opisanie__ul.style.display = 'none';
                opisanie__ul.style.height = 0;
                opisanie__ul.classList.add('opisanie__ul_close');
            }
            infoInfo__block_opisanie.onclick = () => {
                if (opisanie__ul.classList.contains('opisanie__ul_close')) {
                    opisanie__ul.style.display = 'block';
                    infoInfo__plus_col.style.transform = 'rotate(0deg)'
                    setTimeout(() => {
                        opisanie__ul.style.marginBottom = 2.3041474654 + 'vw';
                        opisanie__ul.style.height = height__opisanie + 'px';
                    }, 100)
                    opisanie__ul.classList.remove('opisanie__ul_close');
                } else {
                    opisanie__ul.style.height = 0;
                    opisanie__ul.style.marginBottom = 0;
                    infoInfo__plus_col.style.transform = 'rotate(90deg)'
                    setTimeout(() => {
                        opisanie__ul.style.display = 'none';
                    }, 300)
                    opisanie__ul.classList.add('opisanie__ul_close');
                }
            }
        }
        opisanie()
    }
    item()

    function butImgClick(el) {
        el.onclick = (e) => {
            let butImg__img = document.querySelectorAll('.butImg__img');
            butImg__img.forEach((el) => {
                el.classList.remove('butImg__img_active')
            })
            el.classList.add('butImg__img_active')

            let node = e.target.parentNode.parentNode;
            let indx = [...node.children].indexOf(e.target.parentNode)
            let bigImg__img = document.querySelectorAll('.image-zoom');
            let header = document.querySelector('.header').getBoundingClientRect();
            window.scrollBy({
                top: bigImg__img[indx].offsetTop - window.pageYOffset - header.height,
                behavior: 'smooth'
            });
        }
    }

    function scroll(el) {
        let butImg__img = document.querySelectorAll('.butImg__img')
        let bigImg = document.querySelector('.bigImg');
        let indx = [...bigImg.children].indexOf(el);
        let x = document.querySelectorAll('.bigImg__img')[0].offsetHeight / 1.5;

        // Получаем нужный элемент
        var element = el;
        var Visible = function (target) {
            // Все позиции элемента
            var targetPosition = {
                    top: window.pageYOffset + target.getBoundingClientRect().top,
                    left: window.pageXOffset + target.getBoundingClientRect().left,
                    right: window.pageXOffset + target.getBoundingClientRect().right,
                    bottom: window.pageYOffset + target.getBoundingClientRect().bottom
                },
                // Получаем позиции окна
                windowPosition = {
                    top: window.pageYOffset,
                    left: window.pageXOffset,
                    right: window.pageXOffset + document.documentElement.clientWidth,
                    bottom: window.pageYOffset + document.documentElement.clientHeight
                };

            if (targetPosition.bottom > windowPosition.top + x && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
                targetPosition.top + x < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
                targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
                targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
                // Если элемент полностью видно, то запускаем следующий код
                butImg__img[indx].classList.add('butImg__img_active')
            } else {
                // Если элемент не видно, то запускаем этот код
                butImg__img[indx].classList.remove('butImg__img_active')
            };
        };

        // Запускаем функцию при прокрутке страницы
        window.addEventListener('scroll', function () {
            Visible(element);
        });

        // А также запустим функцию сразу. А то вдруг, элемент изначально видно
        Visible(element);
    }
