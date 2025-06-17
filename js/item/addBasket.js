function addBusket(el, bl) {
    let block = bl;
    let addBusket = block.querySelector('.addBusket')
    let plusMin = block.querySelector('.plusMin')
    let infoSize__size = block.querySelectorAll('.infoSize__size');
    let plusMin__block_min = block.querySelector('.plusMin__block_min');
    let plusMin__block_plus = block.querySelector('.plusMin__block_plus');
    let element = structuredClone(el)

    let interval = setInterval(() => {
        anim()
    }, 100)

    addBusket.onclick = () => {
        butItemOpen()
        creaElem()
        let url = window.location.pathname.split('/');
        if (block.id == url[url.length - 1] && block.classList.contains('lupa')) {
            addBusketHistory()
        }
    }

    plusMin__block_min.onclick = () => plusMinClick('.basketItemBut__but_minus')
    plusMin__block_plus.onclick = () => plusMinClick('.basketItemBut__but_plus')

    function creaElem() {
        let infoSize__size_active = block.querySelector('.infoSize__size_active')
        element.size = infoSize__size_active.textContent;
        basket(element)
        numText(element)
    }

    function numText(element) {
        let plusMin__block_num_span = block.querySelector('.plusMin__block_num_span');
        let basket = JSON.parse(localStorage.getItem('basket'))
        basket.forEach((item) => {
            if (JSON.stringify(item.el) == JSON.stringify(element)) {
                plusMin__block_num_span.textContent = item.col
            }
        })
    }

    function plusMinClick(clas) {
        let size = block.querySelector('.infoSize__size_active');
        if (size) {
            let basketItem = document.querySelectorAll('.basketItem');
            let id = element.id
            let plusMin__block_num_span = block.querySelectorAll('.plusMin__block_num_span');
            basketItem.forEach((el) => {
                if (el.getAttribute('id') == id && el.getAttribute('size') == size.textContent) {
                    el.querySelector(clas).click()
                    let url = window.location.pathname.split('/');
                    if (el.querySelector('.basketItemBut__num').textContent <= 0) {
                        if (block.id == url[url.length - 1] && block.classList.contains('lupa')) {
                            addBusketHistory(el.querySelector('.basketItemBut__num').textContent)
                        }
                        butItemClose()
                        butItemClose(document.querySelector('.lupa'))
                    } else {
                        if (block.id == url[url.length - 1] && block.classList.contains('lupa')) {
                            addBusketHistory(el.querySelector('.basketItemBut__num').textContent)
                        }
                        plusMin__block_num_span.textContent = el.querySelector('.basketItemBut__num').textContent;
                    }
                }
            })
        }
    }

    function anim() {
        let infoSize__size_active = block.querySelector('.infoSize__size_active')
        if (infoSize__size_active) {
            element.size = infoSize__size_active.textContent;
            let indx = 0;
            let basketItem = document.querySelectorAll('.basketItem');
            basketItem.forEach((el, i) => {
                if (el.getAttribute('id') == element.id && el.getAttribute('size') == element.size) {
                    indx = indx + 1;
                    butItemOpen()
                    numText(element)
                }
                if (i == basketItem.length - 1 && indx == 0) {
                    butItemClose()
                }
            })
            clearInterval(interval)
        }
    }


}

function butBasketItem(basketItem) {
    let lupa = document.querySelector('.lupa');
    let block;
    if (lupa.classList.contains('lupa_open')) {
        block = lupa
    } else {
        block = document.querySelector('.itemBody')
    }
    if (window.location.pathname.split('/')[1] == 'wishlist' ||
        window.location.pathname.split('/')[1] == 'list' ||
        window.location.pathname == '/') {
        block = lupa
        if (basketItem.querySelector('.basketItemBut__num').textContent <= 0) {
            butItemClose(document.querySelector('.lupa'))
            return false
        }
    }
    let id = block.getAttribute('id');
    let size = block.querySelector('.infoSize__size_active').textContent;
    let plusMin__block_num_span = block.querySelector('.plusMin__block_num_span');
    if (basketItem.getAttribute('id') == id && basketItem.getAttribute('size') == size) {
        if (basketItem.querySelector('.basketItemBut__num').textContent <= 0) {
            butItemClose()
            butItemClose(document.querySelector('.lupa'))
        } else {
            plusMin__block_num_span.textContent = basketItem.querySelector('.basketItemBut__num').textContent;
        }
    }
}

function butItemOpen(cont) {
    let lupa = document.querySelector('.lupa');
    let block;
    if (lupa.classList.contains('lupa_open')) {
        block = lupa
    } else {
        block = document.querySelector('.itemBody')
    }
    if (cont) {
        block = cont;
    }
    let addBusket = block.querySelector('.addBusket');
    let plusMin = block.querySelector('.plusMin')
    addBusket.style.opacity = 0;
    addBusket.classList.add('display0')
    plusMin.classList.remove('display0')
    setTimeout(() => plusMin.classList.add('plusMin_anim'), 100)
}

function butItemClose(cont) {
    let lupa = document.querySelector('.lupa');
    let block;
    if (lupa.classList.contains('lupa_open')) {
        block = lupa
    } else {
        block = document.querySelector('.itemBody')
    }
    if (cont) {
        block = cont;
    }
    let plusMin = block.querySelector('.plusMin')
    let addBusket = block.querySelector('.addBusket')
    plusMin.classList.remove('plusMin_anim')
    setTimeout(() => {
        addBusket.classList.remove('display0')
        plusMin.classList.add('display0')
        setTimeout(() => addBusket.style.opacity = 1, 100)
    }, 250)
}

function clearBasket() {
    let plusMin = document.querySelectorAll('.plusMin')
    let addBusket = document.querySelectorAll('.addBusket')
    plusMin.forEach((el) => el.classList.remove('plusMin_anim'))
    setTimeout(() => {
        addBusket.forEach((el) => el.classList.remove('display0'))
        plusMin.forEach((el) => el.classList.add('display0'))
        setTimeout(() => addBusket.forEach((el) => el.style.opacity = 1), 100)
    }, 250)
}

function addBusketHistory(num) {
    let itemBody = document.querySelector('.itemBody')
    let active_lupa = document.querySelector('.lupa').querySelector('.infoSize__size_active')
    let active_item = document.querySelector('.itemBody').querySelector('.infoSize__size_active')
    let plusMin__block_num_span = document.querySelector('.itemBody').querySelector('.plusMin__block_num_span');
    let basket = JSON.parse(localStorage.getItem('basket'));
    basket.forEach((item) => {
        if (item.el.size == active_lupa.textContent && active_lupa.textContent == active_item.textContent) {
            butItemOpen(itemBody)
            plusMin__block_num_span.textContent = item.col
        }
    })
    if (num <= 0 && active_lupa.textContent == active_item.textContent) {
        butItemClose(itemBody)
    }
    if (!num && active_lupa.textContent == active_item.textContent) {
        butItemOpen(itemBody)
    }
}
