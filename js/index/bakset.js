function basket(element) {
    if (element) {
        basketAdd(element)
    } else {
        basketOpen()
    }

    function basketOpen() {
        let headerIcon__block_basket = document.querySelector('.headerIcon__block_basket');
        let basket = document.querySelector('.basket');
        let basketList__trash = document.querySelector('.basketList__trash')
        headerIcon__block_basket.onclick = () => {
            if (basket.classList.contains('display0')) {
                basket.classList.remove('display0');
                setTimeout(() => {
                    basket.classList.toggle('basket_anim');
                }, 1)
            } else {
                basket.classList.toggle('basket_anim');
                setTimeout(() => {
                    basket.classList.add('display0');
                }, 200)
            }
            basketVisible()
        }
        document.onclick = (e) => {
            if (headerIcon__block_basket.contains(e.target) ||
                e.target.classList.contains('basketItemBut__img_minus') ||
                e.target.classList.contains('basketItemBut__but_minus')
            ) {
                return false
            } else if (!basket.contains(e.target)) {
                basket.classList.remove('basket_anim');
                setTimeout(() => {
                    basket.classList.add('display0');
                }, 200)
            }
        }
        basketList__trash.onclick = () => {
            let basketItem = document.querySelectorAll('.basketItem');

            if (basketItem) {
                basketItem.forEach((el) => {
                    el.remove()
                    basketVisible()
                    saveBasket([])
                })
                if (window.location.pathname.split('/')[1] == 'item' ||
                    window.location.pathname.split('/')[1] == 'list' ||
                    window.location.pathname.split('/')[1] == 'wishlist' ||
                    window.location.pathname == '/') {
                    clearBasket()
                }
            }
        }

        if (localStorage.getItem('basket')) {
            let basket = JSON.parse(localStorage.getItem('basket'));
            basket.forEach((item) => {
                creaElem(item)
            })
        }
    }

    function basketVisible() {
        let basketItem = document.querySelector('.basketItem');
        let basketHide = document.querySelector('.basketHide');
        let basketVis = document.querySelector('.basketVis');
        let headerIcon__basket_num = document.querySelector('.headerIcon__basket_num');
        if (!basketItem) {
            basketHide.classList.remove('display0')
            basketVis.classList.add('display0')
            headerIcon__basket_num.style.display = 'none';
        } else {
            basketHide.classList.add('display0')
            basketVis.classList.remove('display0')
        }
    }

    function basketAdd(element) {
        let basket;
        if (!localStorage.getItem('basket')) {
            basket = []
        } else {
            basket = JSON.parse(localStorage.getItem('basket'))
        }
        let item = {};
        item.el = Object.assign({}, element);
        item.col = 1;
        if (basket.length == 0) {
            basket.push(item)
            saveBasket(basket)
            creaElem(item)
        } else {
            let indx = 0;
            basket.forEach((el, i) => {
                if (JSON.stringify(el.el) === JSON.stringify(element)) {
                    let basketItem = document.querySelectorAll('.basketItem')[i];
                    basketItem.querySelector('.basketItemBut__but_plus').click()
                } else {
                    indx = indx + 1;
                }
                if (indx == i + 1 && i == basket.length - 1) {
                    basket.push(item)
                    saveBasket(basket)
                    creaElem(item)
                }
            })
        }
    }

    function creaElem(item) {
        let basketList = document.querySelector('.basketList');
        let basketItem_clone = document.querySelector('.basketItem_clone');
        let basketItem = basketItem_clone.cloneNode(true);
        basketItem.className = 'basketItem'
        basketItem.setAttribute('id', item.el.id)
        basketItem.setAttribute('size', item.el.size)
        basketItem.querySelector('.basketItem__img').style.backgroundImage = 'url(' + item.el.img + ')';
        basketItem.querySelector('.basketItem__img').href = '/item/' + item.el.id;
        basketItem.querySelector('.basketItem__brand').textContent = item.el.brand;
        basketItem.querySelector('.basketItem__type').textContent = item.el.type;
        basketItem.querySelector('.basketItem__model').textContent = item.el.model;
        basketItem.querySelector('.basketItemBut__num').textContent = item.col;
        basketItem.querySelector('.basketItemBut__size').textContent = item.el.size;
        if (item.el.sale != 0) {
            let oldPrice = new Intl.NumberFormat("ru-RU").format(item.el.price * item.col) + ' ₽';
            let newPrice = new Intl.NumberFormat("ru-RU").format(Math.ceil((item.el.price - (item.el.price * item.el.sale / 100))) * item.col) + ' ₽';
            basketItem.querySelector('.basketItem__price_old').textContent = oldPrice;
            basketItem.querySelector('.basketItem__price_new').textContent = newPrice;
        } else {
            let newPrice = new Intl.NumberFormat("ru-RU").format(item.el.price * item.col) + ' ₽';
            basketItem.querySelector('.basketItem__price_new').textContent = newPrice;
            basketItem.querySelector('.basketItem__price').classList.remove('basketItem__price_sale');
        }
        basketList.appendChild(basketItem);
        replacePrice()
        replaceNum()
        minPlus(basketItem, item)
    }

    function replaceElem(basketItem, item) {
        let newPrice;
        let oldPrice;
        basketItem.querySelector('.basketItemBut__num').textContent = item.col
        if (basketItem.querySelector('.basketItem__price_old').textContent) {
            newPrice = new Intl.NumberFormat("ru-RU").format(Math.ceil((item.el.price - (item.el.price * item.el.sale / 100))) * item.col) + ' ₽';
            oldPrice = new Intl.NumberFormat("ru-RU").format(item.el.price * item.col) + ' ₽';
            basketItem.querySelector('.basketItem__price_new').textContent = newPrice
            basketItem.querySelector('.basketItem__price_old').textContent = oldPrice
        } else {
            newPrice = new Intl.NumberFormat("ru-RU").format(item.el.price * item.col) + ' ₽';
            basketItem.querySelector('.basketItem__price_new').textContent = newPrice
        }
        if (item.col <= 0) {
            basketItem.remove();
        }
        let basketButs__but_oform_price = document.querySelector('.basketButs__but_oform_price');
        replacePrice()
        replaceNum()
        newBasket(item)
        if (window.location.pathname.split('/')[1] == 'item' ||
            window.location.pathname.split('/')[1] == 'list' ||
            window.location.pathname.split('/')[1] == 'wishlist' ||
            window.location.pathname == '/') {
            butBasketItem(basketItem)
        }
    }

    function replacePrice() {
        let basketButs__but_oform_price = document.querySelector('.basketButs__but_oform_price');
        let basketItem__price_new = document.querySelectorAll('.basketItem__price_new');
        let dolya__price = document.querySelector('.dolya__price')
        let price = 0;
        let dolya = 0;
        basketItem__price_new.forEach((el) => {
            price = price + +el.textContent.replace(/[^\d]/g, '')
        })
        dolya = price / 4;
        basketButs__but_oform_price.textContent = new Intl.NumberFormat("ru-RU").format(price) + ' ₽';
        dolya__price.textContent = new Intl.NumberFormat("ru-RU").format(Math.round(dolya)) + ' ₽';
    }

    function replaceNum() {
        let basketItem = document.querySelectorAll('.basketItem');
        let basketList__col_num = document.querySelector('.basketList__col_num');
        let basketList__col_text = document.querySelector('.basketList__col_text');
        let headerIcon__basket_num = document.querySelector('.headerIcon__basket_num');
        let num = 0;
        basketItem.forEach((el) => {
            num = num + +el.querySelector('.basketItemBut__num').textContent
        })
        basketList__col_num.textContent = num;

        if (num % 10 == 1) {
            basketList__col_text.textContent = 'товар'
        } else if (num % 10 == 2 || num % 10 == 3 || num % 10 == 4) {
            basketList__col_text.textContent = 'товарa'
        } else {
            basketList__col_text.textContent = 'товаров'
        }
        if (num == 11 || num == 12 || num == 13 || num == 14) {
            basketList__col_text.textContent = 'товаров'
        }
        if (num != 0) {
            headerIcon__basket_num.textContent = num;
            headerIcon__basket_num.style.display = 'flex';
        }
    }

    function minPlus(basketItem, item) {
        basketItem.querySelector('.basketItemBut__but_minus').onclick = () => {
            item.col = item.col - 1;
            replaceElem(basketItem, item)
        }
        basketItem.querySelector('.basketItemBut__but_plus').onclick = () => {
            item.col = item.col + 1;
            replaceElem(basketItem, item)
        }
    }

    function newBasket(item) {
        let basket = JSON.parse(localStorage.getItem('basket'));
        for (let i = 0; i < basket.length; i++) {
            if (basket[i].el.id == item.el.id && basket[i].el.size == item.el.size) {
                basket[i] = item
            }
        }
        basket.forEach((el, i) => {
            if (el.col <= 0) {
                basket.splice(i, 1)
            }
        })
        saveBasket(basket)
    }

    function saveBasket(basket) {
        localStorage.setItem('basket', JSON.stringify(basket))
        basketVisible()
    }
}
basket()
