function creaItems() {
    let izbran;
    if (localStorage.getItem('izbran')) {
        izbran = JSON.parse(localStorage.getItem('izbran'))
    }
    visible()
    items(null, null, izbran)
    zindex()

    function visible() {
        let star__null = document.querySelector('.star__null')
        let items = document.querySelector('.items');
        let star__h2 = document.querySelector('.star__h2');
        if (izbran.length > 0) {
            star__null.classList.add('display0')
        } else {
            star__h2.classList.add('display0')
            items.classList.add('display0')
        }
    }

    function zindex() {
        let item = document.querySelectorAll('.item');
        item = [...item].reverse()
        let indx = 1
        item.forEach((el) => {
            el.style.zIndex = indx;
            indx++
        })
    }

    let item__buttonImg_star = document.querySelectorAll('.item__buttonImg_star');
    item__buttonImg_star.forEach((el) => {
        el.addEventListener('click', () => {
            if (!el.classList.contains('star_active')) {
                el.parentNode.parentNode.classList.add('item_del')
            } else {
                el.parentNode.parentNode.classList.remove('item_del')
            }
        })
    })
}
creaItems()
