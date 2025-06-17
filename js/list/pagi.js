function pagi(filter) {

    let cords = ['scrollX', 'scrollY'];
    window.addEventListener('unload', e => cords.forEach(cord => sessionStorage[cord] = window[cord]));

    if (performance.navigation.type == 1) {
        setTimeout(() => window.scroll(...cords.map(cord => sessionStorage[cord])), 100)
    }

    addEventListener("popstate", function (e) {
        start()
        setTimeout(() => window.scrollTo(0, 0), 100)
    }, false);

    let colItem = document.querySelector('.colItem_one').textContent;

    function getColBut() {
        return fetch('/itemsCount', {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bildPost())
            })
            .then(res => {
                return res.json()
            })
    }

    getColBut().then(res => {
        res = res[0]['COUNT(*)']
        res = Math.ceil(res / colItem);
        let pages = document.querySelector('.pages');
        let escho = document.querySelector('.escho');
        let pages__but_right = document.querySelector('.pages__but_right');
        for (let i = 1; i <= res; i++) {
            if (res == 1) {
                pages.style.display = 'none'
                escho.style.display = 'none'
            } else {
                pages.style.display = 'flex'
                escho.style.display = 'flex'
            }
            let pages__but = document.createElement('a');
            pages__but.href = 'javascript://';
            if (i == 1) {
                pages__but.className = 'pages__but pages__but_active';
            } else {
                pages__but.className = 'pages__but';

            }
            pages__but.textContent = i;
            pages.appendChild(pages__but);
            if (i >= 6) {
                pages__but.style.display = 'none';
            }
        }
        if (res >= 6) {
            pages__but_right.style.display = 'flex'
        } else {
            pages__but_right.style.display = 'none'
        }
        pagiOnclick()
        start(filter)
    })

    function numClick(el, i, func, filter) {
        if (filter != true) {
            window.scrollTo(0, 0)
        }
        let itemsCont = document.querySelector('.items')
        let colItem = document.querySelector('.colItem').textContent;
        itemsCont.innerHTML = '';
        if (i == 0) {
            filter == true ? items(colItem, 0, null, true) : items(colItem, 0)
        } else {
            filter == true ? items(colItem, colItem * i, null, true) : items(colItem, colItem * i)
        }
        setTimeout(() => {
            let pages__but_active = document.querySelector('.pages__but_active');
            if (pages__but_active) {
                pages__but_active.classList.remove('pages__but_active')
            }
            el.classList.add('pages__but_active')
            pagiDisplay()
        }, 100)
        if (func == 1) {
            history.pushState(null, null, window.location.pathname.split('/page=')[0] + '/page=' + el.textContent)
        }

    }

    function start(filter) {
        let url = window.location.href;
        let num = url.indexOf('page=')
        if (num == -1) {
            num = 1
        } else {
            num = url.split('=').pop()
        }
        if (filter == true) {
            num = 1
        }
        let pages__but = document.querySelectorAll('.pages__but')
        if (pages__but.length == 0) {
            let items = document.querySelector('.items');
            items.innerHTML = '';
        }
        for (let i = 0; i < pages__but.length; i++) {
            if (pages__but[i].textContent == num) {
                numClick(pages__but[i], i, null, filter)
                return
            }
        }
    }

    function pagiOnclick(cords) {
        let pages__but_right = document.querySelector('.pages__but_right');
        let pages__but_left = document.querySelector('.pages__but_left');
        let pages__but = document.querySelectorAll('.pages__but')
        let escho = document.querySelector('.escho')
        let colItem = document.querySelector('.colItem').textContent;

        pages__but.forEach((el, i) => {
            el.onclick = () => {
                numClick(el, i, 1)
            }
        })

        pages__but_right.onclick = () => {
            window.scrollTo(0, 0)
            for (let i = 0; i < pages__but.length; i++) {
                if (pages__but[i].classList.contains('pages__but_active')) {
                    pages__but[i + 1].click()
                }
            }
        }
        pages__but_left.onclick = () => {
            window.scrollTo(0, 0)
            pages__but.forEach((el, i) => {
                if (el.classList.contains('pages__but_active')) {
                    pages__but[i - 1].click()
                }
            })
        }
        escho.onclick = () => {
            let pages__but_active = document.querySelector('.pages__but_active').textContent;
            items(colItem, colItem * pages__but_active)
            setTimeout(() => {
                for (let i = 0; i < pages__but.length; i++) {
                    if (pages__but[i].classList.contains('pages__but_active')) {
                        pages__but[i].classList.remove('pages__but_active')
                        pages__but[i + 1].classList.add('pages__but_active')
                        pagiDisplay()
                        break
                    }
                }
            }, 100)
            history.pushState(null, null, window.location.pathname.split('/page=')[0] + '/page=' + (+pages__but_active + 1))
        }
    }

    function pagiDisplay() {
        let pages__but = document.querySelectorAll('.pages__but');
        let pages__but_active = document.querySelector('.pages__but_active');
        let pages__but_right = document.querySelector('.pages__but_right');
        let pages__but_left = document.querySelector('.pages__but_left');
        let escho = document.querySelector('.escho')
        if (pages__but_active && pages__but_active.textContent >= 4) {
            pages__but.forEach((el, i) => {
                el.style.display = 'none';
            })
            pages__but.forEach((el, i) => {
                if (el.classList.contains('pages__but_active')) {
                    el.style.display = 'flex';
                    pages__but[i - 1].style.display = 'flex';
                    pages__but[i - 2].style.display = 'flex';
                    if (pages__but[i + 1]) {
                        pages__but[i + 1].style.display = 'flex';
                    } else if (pages__but[i - 4]) {
                        pages__but[i - 4].style.display = 'flex';
                    }
                    if (pages__but[i + 2]) {
                        pages__but[i + 2].style.display = 'flex';
                    } else if (pages__but[i - 3]) {
                        pages__but[i - 3].style.display = 'flex';
                    }

                }
            })
        } else if (pages__but_active && pages__but_active.textContent < 4) {
            pages__but.forEach((el, i) => {
                el.style.display = 'none';
            })
            if (pages__but[0]) {
                pages__but[0].style.display = 'flex';
            }
            if (pages__but[1]) {
                pages__but[1].style.display = 'flex';
            }
            if (pages__but[2]) {
                pages__but[2].style.display = 'flex';
            }
            if (pages__but[3]) {
                pages__but[3].style.display = 'flex';
            }
            if (pages__but[4]) {
                pages__but[4].style.display = 'flex';
            }
        }

        if (pages__but_active && pages__but_active.textContent > 1) {
            pages__but_left.style.display = 'flex';
        } else {
            pages__but_left.style.display = 'none';
        }

        if (pages__but_active && pages__but_active.textContent == pages__but[pages__but.length - 1].textContent) {
            pages__but_right.style.display = 'none';
            escho.style.display = 'none';
        } else {
            pages__but_right.style.display = 'flex';
            escho.style.display = 'flex';
        }
    }
}
pagi()
