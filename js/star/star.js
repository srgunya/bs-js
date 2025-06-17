function star(item) {
    let izbran;
    if (!localStorage.getItem('izbran')) {
        izbran = [];
    } else {
        izbran = JSON.parse(localStorage.getItem('izbran'))
    }
    if (izbran.length == 0) {
        izbran.push(item)
    } else {
        let indx = 0;
        izbran.forEach((el, i) => {
            if (JSON.stringify(el) === JSON.stringify(item)) {
                izbran.splice(i, 1)
            } else {
                indx = indx + 1;
            }
            if (indx == i + 1 && i == izbran.length - 1) {
                izbran.push(item)
            }
        })
    }
    localStorage.setItem('izbran', JSON.stringify(izbran))
    let headerIcon__star_num = document.querySelector('.headerIcon__star_num')
    headerIcon__star_num.textContent = izbran.length
    if (izbran.length <= 0) {
        headerIcon__star_num.style.display = 'none'
    } else {
        headerIcon__star_num.style.display = 'flex'
    }
}

function starActive(id, item) {
    let izbran;
    let headerIcon__star_num = document.querySelector('.headerIcon__star_num')
    if (!localStorage.getItem('izbran')) {
        return false
    } else {
        izbran = JSON.parse(localStorage.getItem('izbran'))
    }
    if (izbran.length <= 0) {
        headerIcon__star_num.style.display = 'none'
    } else {
        headerIcon__star_num.style.display = 'flex'
    }
    headerIcon__star_num.textContent = izbran.length
    let clas;
    if (window.location.pathname.split('/')[1] == 'item' ||
        window.location.pathname == '/') {
        clas = '.carousel__buttonImg_star'
    } else if (window.location.pathname.split('/')[1] == 'list' ||
        window.location.pathname.split('/')[1] == 'wishlist') {
        clas = '.item__buttonImg_star'
    }
    if (item) {
        if (item.classList.contains('infoInfo__block')) {
            clas = '.infoInfo__star'
        }
        izbran.forEach((el) => {
            if (el.id == id) {
                item.querySelector(clas).classList.add('star_active')
            }
        })
    }

}

function starProverka(id, block) {
    let carousel__item = document.querySelectorAll('.carousel__item');
    let infoInfo__star = document.querySelector('.infoInfo__star')
    let itemBody = document.querySelector('.itemBody')
    if (block == 'item') {
        carousel__item.forEach((el) => {
            if (el.id == id && infoInfo__star.classList.contains('star_active')) {
                el.querySelector('.carousel__buttonImg_star').classList.add('star_active')
            } else if (el.id == id && !infoInfo__star.classList.contains('star_active')) {
                el.querySelector('.carousel__buttonImg_star').classList.remove('star_active')
            }
        })
    } else if (block == 'slider') {
        if (id == itemBody.id) {
            infoInfo__star.classList.toggle('star_active')
        }
    }
}
starActive()
