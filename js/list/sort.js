function sort() {
    let sort__li = document.querySelectorAll('.sort__li');
    let sort__ul = document.querySelectorAll('.sort__ul')

    function sortStart() {
        let height0 = sort__ul[0].offsetHeight + 'px';
        let height1 = sort__ul[1].offsetHeight + 'px';
        sort__ul.forEach((el, i) => {
            let sort__img = el.querySelector('.sort__img');
            el.style.height = sort__li[0].offsetHeight + 'px';
            el.onmouseenter = () => {
                if (i == 0) {
                    el.style.height = height0

                } else if (i == 1) {
                    el.style.height = height1
                }

                sort__img.style.transform = 'rotate(-180deg)';
            }
            el.onmouseleave = () => {
                el.style.height = sort__li[0].offsetHeight + 'px';
                sort__img.style.transform = 'rotate(0deg)';
            }
        })
    }
    sortStart()

    sort__li.forEach((li) => {
        li.onclick = () => {
            li.parentNode.querySelectorAll('.sort__li').forEach((el, i) => {
                el.classList.remove('sort__li_active');
            })
            li.classList.add('sort__li_active')
            if (li.parentNode.classList.contains('sort__ul_one')) {
                let colItem_one = document.querySelector('.colItem_one');
                colItem_one.textContent = li.querySelector('.colItem').textContent
            }
            if (li.parentNode.classList.contains('sort__ul_two')) {
                let sort__span_slovo = document.querySelector('.sort__span_slovo');
                sort__span_slovo.textContent = li.textContent
            }
        }
    })
    sort__ul.forEach((el) => {
        el.querySelectorAll('.sort__li')[0].onclick = () => {
            return false
        }
    })
}
sort()
