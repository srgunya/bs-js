function filter() {

    function getFilter() {
        return fetch('/getFilter', {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bildPost())
            })
            .then(res => res.json())
            .then(res => {
                return res
            })
    }

    function sortFilter() {

        let min = document.querySelector('.filter__price_input_min');
        let max = document.querySelector('.filter__price_input_max');
        return getFilter().then(res => {
            sortWord(res.sex);
            sortWord(res.category);
            sortWord(res.color);
            sortWord(res.brand);
            res.size = sortSize(res.size);
            min.setAttribute('data', res.min);
            max.setAttribute('data', res.max);
            min.value = new Intl.NumberFormat("ru-RU").format(min.getAttribute('data'))
            max.value = new Intl.NumberFormat("ru-RU").format(max.getAttribute('data'))
            min.setAttribute('maxlength', max.value.length);
            max.setAttribute('maxlength', max.value.length);
            slider(min, max)
            return res
        })

        function sortWord(mas) {
            mas.sort((a, b) => {
                if (a.toLowerCase() < b.toLowerCase()) {
                    return -1;
                }
                if (a.toLowerCase() > b.toLowerCase()) {
                    return 1;
                }
                return 0;
            });
        }

        function sortSize(mas) {
            let int = [],
                str = [],
                US = [],
                EU = [],
                newMas = [];

            mas.forEach((el) => {
                if (!isNaN(el)) {
                    int.push(el)
                } else if (el.includes("US")) {
                    US.push(el)
                } else if (el.includes("EU")) {
                    EU.push(el)
                } else {
                    str.push(el)
                }
            })

            function sortUS(mas) {
                mas.sort(function (a, b) {
                    let x = a.slice('');
                    let y = b.slice('');
                    return parseInt(x[0] + x[1]) - parseInt(y[0] + y[1]);
                });
            }

            function sortStr(mas) {
                mas.sort(function (a, b) {
                    if (a == "XS" && b !== "XS") {
                        return -1
                    } else if (a !== "XS" && b == "XS") {
                        return 1
                    } else if (a == "S" && b !== "S") {
                        return -1
                    } else if (a !== "S" && b == "S") {
                        return 1
                    } else if (a == "M" && b !== "M") {
                        return -1
                    } else if (a !== "M" && b == "M") {
                        return 1
                    } else if (a == "L" && b !== "L") {
                        return -1
                    } else if (a !== "L" && b == "L") {
                        return 1
                    } else if (a == "XL" && b !== "XL") {
                        return -1
                    } else if (a !== "XL" && b == "XL") {
                        return 1
                    } else if (a == "XXL" && b !== "XXL") {
                        return -1
                    } else if (a !== "XXL" && b == "XXL") {
                        return 1
                    } else if (a == "ONE SIZE" && b !== "ONE SIZE") {
                        return -1
                    } else if (a !== "ONE SIZE" && b == "ONE SIZE") {
                        return 1
                    }
                })
            }
            sortUS(US)
            sortStr(str);
            int.sort();
            EU.sort();
            newMas.push(...int, ...US, ...EU, ...str);
            return newMas;
        }
    }

    function createFilter() {
        let filter__ul_sex = document.querySelector('.filter__ul_sex');
        let filter__ul_category = document.querySelector('.filter__ul_category');
        let filter__ul_color = document.querySelector('.filter__ul_color');
        let filter__ul_size = document.querySelector('.filter__ul_size');
        let filter__ul_brand = document.querySelector('.filter__ul_brand');

        sortFilter().then(res => {
            res.sex.forEach((el) => {
                filter__ul_sex.appendChild(creaLi(el));
            })
            res.category.forEach((el) => {
                filter__ul_category.appendChild(creaLi(el));
            })
            res.color.forEach((el) => {
                filter__ul_color.appendChild(creaLi(el));
            })
            res.size.forEach((el) => {
                filter__ul_size.appendChild(creaLi(el));
            })
            res.brand.forEach((el) => {
                filter__ul_brand.appendChild(creaLi(el));
            })
            let filter__label = document.querySelectorAll('.filter__label');
            filterPoisk(filter__label)
            let filter__checkbox = document.querySelectorAll('.filter__checkbox')
            filterClick(filter__checkbox)
        })

        function creaLi(el) {
            let li = document.createElement('li');
            li.className = 'filter__li'
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'filter__checkbox'
            checkbox.id = el
            let label = document.createElement('label');
            label.className = 'filter__label'
            label.textContent = el;
            label.setAttribute('for', el);
            li.appendChild(checkbox);
            li.appendChild(label);
            filterStart(li, checkbox)
            return li;
        }
    }
    createFilter()

    function slider(min, max) {

        let min_proc = min.getAttribute('data') * 100 / max.getAttribute('data')
        let slider = document.getElementById('slider');

        noUiSlider.create(slider, {
            start: [1, 100],
            behaviour: 'tap',
            step: 0.01,
            connect: true,
            range: {
                'min': min_proc,
                'max': 100
            }
        });

        slider.noUiSlider.on('slide', function (values) {
            min.value = new Intl.NumberFormat("ru-RU").format(Math.round((max.getAttribute('data') * values[0] / 100) / 100) * 100);
            max.value = new Intl.NumberFormat("ru-RU").format(Math.ceil((max.getAttribute('data') * values[1] / 100) / 100) * 100);
            if (values[0] == 1 || min_proc.toFixed(2) == values[0]) {
                min.value = new Intl.NumberFormat("ru-RU").format(min.getAttribute('data'))
            }
            if (+max.value.replaceAll(' ', '') > +max.getAttribute('data')) {
                max.value = new Intl.NumberFormat("ru-RU").format(max.getAttribute('data'))
            }
            if (+min.value.replaceAll(' ', '') > +max.getAttribute('data')) {
                min.value = new Intl.NumberFormat("ru-RU").format(max.getAttribute('data'))
            }
        });
        slider.noUiSlider.on('set', function (values) {
            if (+min.value.replaceAll(' ', '') != min.getAttribute('data') || +max.value.replaceAll(' ', '') != max.getAttribute('data')) {
                sbrosAnim('Сбросить фильтр')
            } else {
                sbrosAnim('Фильтр')
            }
        });
        slider.noUiSlider.on('change', function (values) {
            addPriceStart()
        });
    }
}
filter()

function filterPoisk(filter__label) {
    let filter__input = document.querySelectorAll('.filter__input');
    let filter__img_x = document.querySelectorAll('.filter__img_x');
    let category = [],
        color = [],
        size = [],
        brand = [];

    filter__label.forEach((el) => {
        if (el.parentNode.parentNode.classList.contains('filter__ul_category')) {
            category.push(el)
        } else if (el.parentNode.parentNode.classList.contains('filter__ul_color')) {
            color.push(el)
        } else if (el.parentNode.parentNode.classList.contains('filter__ul_size')) {
            size.push(el)
        } else if (el.parentNode.parentNode.classList.contains('filter__ul_brand')) {
            brand.push(el)
        }
    })

    filter__input.forEach((el) => {
        el.oninput = () => {
            let label = initial(el);
            let filter__img_x = el.nextElementSibling;
            if (el.value == '') {
                filter__img_x.style.display = 'none';
            } else {
                filter__img_x.style.display = 'block';
            }
            let indx__label = 0;
            label.forEach((label) => {
                if (label.textContent.toLowerCase().includes(el.value.toLowerCase())) {
                    label.parentNode.style.display = 'flex';
                } else {
                    label.parentNode.style.display = 'none';
                    indx__label++
                }
            })
            let filter__info = el.parentNode.lastElementChild;
            let filter__info_span = filter__info.querySelector('span');
            if (indx__label == label.length) {
                filter__info.style.display = 'inline-block'
                filter__info_span.textContent = el.value
            } else {
                filter__info.style.display = 'none'
            }
        }
    })
    filter__img_x.forEach((el) => {
        el.onclick = () => {
            let li = initial(el);
            el.previousElementSibling.value = '';
            el.nextElementSibling.style.display = 'none'
            el.style.display = 'none';
            li.forEach((el) => {
                el.parentNode.style.display = 'flex';
            })
        }
    })

    function initial(el) {
        if (el.parentNode.nextElementSibling.classList.contains('filter__ul_category')) {
            return category;
        } else if (el.parentNode.nextElementSibling.classList.contains('filter__ul_color')) {
            return color;
        } else if (el.parentNode.nextElementSibling.classList.contains('filter__ul_size')) {
            return size;
        } else if (el.parentNode.nextElementSibling.classList.contains('filter__ul_brand')) {
            return brand
        }
    }
    let filter__price_input = document.querySelectorAll('.filter__price_input');
    filter__price_input.forEach((el) => {
        el.onkeypress = (e) => {
            if (!Number.isInteger(+e.code[e.code.length - 1])) {
                e.preventDefault()
            }
        }
        el.onkeyup = (e) => {
            if (e.code == 'ArrowLeft' || e.code == 'ArrowRight' || e.code == 'ArrowUp' || e.code == 'ArrowDown') {
                return false
            }
            el.value = el.value.replace(/[^\d]/g, '');
            el.value = new Intl.NumberFormat("ru-RU").format(el.value);
            if (+el.value.replaceAll(' ', '') > +filter__price_input[1].getAttribute('data')) {
                el.value = new Intl.NumberFormat("ru-RU").format(filter__price_input[1].getAttribute('data'))
            }
            let x = Math.round(filter__price_input[0].value.replaceAll(' ', '') / (filter__price_input[1].getAttribute('data') / 100));
            let y = Math.round(filter__price_input[1].value.replaceAll(' ', '') / (filter__price_input[1].getAttribute('data') / 100));
            if (+filter__price_input[0].value.replace(/\s+/g, '') <= +filter__price_input[0].getAttribute('data')) {
                x = 1;
            }
            sliderAnim(x, y)
            addPriceStart()
        }
    })
}

function filterClick(checkbox) {
    let filter__span = document.querySelectorAll('.filter__span');
    let filter__sbros = document.querySelector('.filter__sbros');
    filter__span.forEach((el, i, mas) => {
        el.onclick = () => {
            let min = document.querySelector('.filter__price_input_min');
            let max = document.querySelector('.filter__price_input_max');
            let li = el.parentNode.parentNode.lastElementChild.childNodes;
            li.forEach((li, i, arr) => {
                if (li.firstElementChild.checked == true) {
                    li.firstElementChild.checked = false
                }
            })
            el.style.display = 'none';
            let indx__span = 0;
            mas.forEach((el) => {
                if (window.getComputedStyle(el).display == 'none') {
                    indx__span++
                    if (indx__span == mas.length) {
                        if (min.value.replaceAll(' ', '') == min.getAttribute('data') &&
                            max.value.replaceAll(' ', '') == max.getAttribute('data')) {
                            sbrosAnim('Фильтр')
                        }
                    }
                }
            })
        }
    })
    checkbox.forEach((el, i, mas) => {
        el.onclick = () => {
            let li = el.parentNode.parentNode.childNodes;
            let indx = 0;
            li.forEach((el) => {
                if (el.querySelector('.filter__checkbox').checked) {
                    el.parentNode.parentNode.firstElementChild.lastElementChild.style.display = 'block'
                } else {
                    indx++
                }
                if (indx == li.length) {
                    el.parentNode.parentNode.firstElementChild.lastElementChild.style.display = 'none'
                }
            })
            let indx__sbros = 0;
            mas.forEach((checkbox) => {
                if (!checkbox.checked) {
                    indx__sbros++
                    if (indx__sbros == mas.length) {
                        sbrosAnim('Фильтр')
                    }
                }
                if (indx__sbros == mas.length - 1 && el.checked) {
                    sbrosAnim('Сбросить фильтр')
                }
            })
            addCategory(el)
            filterReset()
        }
    })
    filter__sbros.onclick = () => {
        checkbox.forEach((el) => {
            if (!JSON.parse(sessionStorage.getItem('url').includes(el.getAttribute('id')))) {
                el.checked = false;
            }
        })
        filter__span.forEach((el) => {
            el.style.display = 'none';
        })
        sbrosAnim('Фильтр')
        sliderAnim(1, 100)
        let filter__price_input = document.querySelectorAll('.filter__price_input');
        let min = document.querySelector('.filter__price_input_min');
        let max = document.querySelector('.filter__price_input_max');
        filter__price_input[0].value = new Intl.NumberFormat("ru-RU").format(min.getAttribute('data'));
        filter__price_input[1].value = new Intl.NumberFormat("ru-RU").format(max.getAttribute('data'));
    }
}

function sbrosAnim(x) {
    let filter__h1 = document.querySelector('.filter__h1');
    let filter__sbros = document.querySelector('.filter__sbros');
    if (filter__h1.textContent == x) {
        return false;
    }
    filter__sbros.style.zIndex = -1;
    filter__sbros.style.opacity = 0;
    setTimeout(() => {
        if (x == 'Фильтр') {
            filter__sbros.classList.remove('filter__sbros_active');
        } else if (x == 'Сбросить фильтр') {
            filter__sbros.classList.add('filter__sbros_active');
        }
        filter__h1.textContent = x
        filter__sbros.style.opacity = 1;
        filter__sbros.style.zIndex = 'inherit';
    }, 300)
}

function sliderAnim(x, y) {
    let slider = document.getElementById('slider');
    slider.noUiSlider.set([x, y]);
}
