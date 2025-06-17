function addPriceStart() {
    let min = document.querySelector('.filter__price_input_min');
    let max = document.querySelector('.filter__price_input_max');
    let value_min = min.value.replace(/[^\d]/g, '');
    let value_max = max.value.replace(/[^\d]/g, '');
    if (value_min != min.getAttribute('data') || value_max != max.getAttribute('data')) {
        addPrice(value_min, value_max)
    } else {
        addPrice()
    }
}

function addPrice(value_min, value_max) {
    let url = decodeURI(window.location.pathname);
    let row;
    let new_url;
    if (value_min && value_max) {
        if (!url.includes("price=")) {
            row = `price=${value_min},${value_max}`;
            new_url = (url + '/' + row);
        } else {
            let min = url.replace(/^.*\price=/g, '').replace(/\,.*/g, '');

            let min_str = 'price=' + min + ',';
            let re = new RegExp('^.*\\' + min_str, 'g');

            let max = url.replace(re, '').replace(/\/.*/g, '');
            new_url = url.replace(min_str, 'price=' + value_min + ',').replace(',' + max, ',' + value_max)
        }
    } else {
        row = url.replace(/^.*\price=/g, '').replace(/\/.*/g, '');
        new_url = url.replace('/price=' + row, '')
    }

    replaceList(new_url)
}

function addCategory(el) {
    let url = decodeURI(window.location.pathname);
    let category = el.nextSibling.textContent;
    let row;

    function proverkaCat(category) {
        if (url.includes(',' + category)) {
            row = url.replace(',' + category, '')
        } else if (url.includes('=' + category + ',')) {
            row = url.replace(category + ',', '')
        } else {
            if (url.includes('/sex=' + category)) {
                row = url.replace('/sex=' + category, '')

            } else if (url.includes('/category=' + category)) {
                row = url.replace('/category=' + category, '')

            } else if (url.includes('/color=' + category)) {
                row = url.replace('/color=' + category, '')

            } else if (url.includes('/size=' + category)) {
                row = url.replace('/size=' + category, '')

            } else if (url.includes('/brand=' + category)) {
                row = url.replace('/brand=' + category, '')
            }
        }
        return row
    }


    if (el.checked == true) {
        if (url.includes(category)) {
            return
        } else {
            let block = el.parentNode.parentNode.parentNode.querySelector('.filter__h2').textContent;
            let old_category;
            let new_category;
            if (proverkaUrl('Пол', 'sex')) {
                row = proverkaUrl('Пол', 'sex')

            } else if (proverkaUrl('Категория', 'category')) {
                row = proverkaUrl('Категория', 'category')

            } else if (proverkaUrl('Цвет', 'color')) {
                row = proverkaUrl('Цвет', 'color')

            } else if (proverkaUrl('Размер', 'size')) {
                row = proverkaUrl('Размер', 'size')

            } else if (proverkaUrl('Бренд', 'brand')) {
                row = proverkaUrl('Бренд', 'brand')

            }

            function proverkaUrl(block_name, url_name) {
                if (block == block_name) {
                    if (!url.includes(url_name)) {
                        row = url + '/' + url_name + '=' + category
                    } else {
                        let x = url.indexOf(url_name)
                        let slash = url.indexOf('/', x)
                        if (slash != -1) {
                            old_category = url.slice(x + url_name.length + 1, slash)
                        } else {
                            old_category = url.slice(x + url_name.length + 1)
                        }
                        new_category = old_category + ',' + category;
                        row = url.replace(old_category, new_category)
                    }
                    return row;
                }
            }
        }
    } else {
        row = proverkaCat(category)
    }
    replaceList(row)
}

function replaceList(new_url) {
    if (new_url.includes('page')) {
        let num = new_url.replace(/^.*\page=/g, '').replace(/\/.*/g, '');
        new_url = new_url.replace('/page=' + num, '')
    }
    history.pushState(null, null, new_url)
    pagiDel()
    pagi(true)
}

function pagiDel() {
    let pages = document.querySelector('.pages')
    let pages__but = document.querySelectorAll('.pages__but');
    pages__but.forEach((el) => {
        pages.removeChild(el);
    })
}

function filterStart(li, checkbox) {
    let url = decodeURI(window.location.pathname);
    let category = checkbox.getAttribute('id');
    if (url.includes(category + '!')) {
        li.classList.add('filter__li_dis');
        checkbox.checked = true;
        checkbox.disabled = true;
    }
    if (url.includes(category)) {
        checkbox.checked = true;
    }
}
addEventListener("popstate", function (e) {
    let filter__checkbox = document.querySelectorAll('.filter__checkbox');
    let url = decodeURI(window.location.pathname);
    filter__checkbox.forEach((el) => {
        let category = el.getAttribute('id')
        if (url.includes(category)) {
            el.checked = true;
        } else {
            el.checked = false;
        }
    })

}, false);

function filterReset() {
    let filter__checkbox = document.querySelectorAll('.filter__checkbox');
    let block = []
    let filter__ul = document.querySelectorAll('.filter__ul')
    filter__checkbox.forEach((el) => {
        if (el.checked == true) {
            block.push(el.parentNode.parentNode)
        }
    })
    block = [...new Set(block)];
}
