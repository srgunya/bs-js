function openMenu() {
    let headerNav__li = document.querySelectorAll('.headerNav__li');
    let menuCont = document.querySelectorAll('.menuCont');
    let menu = document.querySelector('.menu');

    for (let i = 0; i < headerNav__li.length; i++) {

        headerNav__li[i].onmouseenter = () => {
            menuCont[i].classList.remove('menuCont_display-none');
            headerNav__li[i].classList.add('headerNav__li_hover');
            menu.classList.add('menu_opacity-1');
        }

        headerNav__li[i].onmouseleave = (el) => {
            if (el.target === headerNav__li[i] && el.relatedTarget === menuCont[i]) {
                return false
            }
            if (event.relatedTarget == document.getElementsByTagName('html')[0]) {
                return false
            }

            closeMenu(i, el)
        }

        menuCont[i].onmouseleave = (el) => {
            if (event.relatedTarget == document.getElementsByTagName('html')[0]) {
                return false
            }
            closeMenu(i, el)
        }

    }

    function closeMenu(i, el) {
        headerNav__li[i].classList.remove('headerNav__li_hover');
        if (!el.relatedTarget.classList.contains('headerNav__li')) {
            menu.classList.remove('menu_opacity-1');
            setTimeout(() => {
                if (!menu.classList.contains('menu_opacity-1')) {
                    menuCont[i].classList.add('menuCont_display-none')
                }

            }, 300)
        } else {
            menuCont[i].classList.add('menuCont_display-none');
        }
    }
}
openMenu()
