function button(myMap) {
    let shopsButton__button = document.querySelectorAll('.shopsButton__button');
    let shopsMap = document.querySelector('.shopsMap');
    let shopsSlider = document.querySelectorAll('.shopsSlider');
    let shopsMap__li_toggle = document.querySelectorAll('.shopsMap__li_toggle');

    shopsButton__button.forEach((el, i) => {
        el.onclick = () => {
            if (!shopsButton__button[i].classList.contains('active')) {
                shopsButton__button[i].classList.add('active');
                shopsButton__button[i].style.backgroundColor = '#191919';
                shopsButton__button[i].style.color = 'white';
                shopsButton__button[i].textContent = 'Свернуть'
                if (i == 0) {
                    shopsMap__li_toggle[0].textContent = '300 м';
                    shopsMap__li_toggle[1].textContent = '50';
                    shopsMap__li_toggle[2].textContent = 'Мужской 90% / Женский 10%';
                    shopsMap__li_toggle[3].textContent = 'Premium';
                    shopsButton__button[i + 1].style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                    shopsButton__button[i + 1].style.color = 'black';
                    shopsButton__button[i + 1].textContent = 'Подробнее'
                    shopsButton__button[i + 1].classList.remove('active');
                    shopsSlider[0].classList.remove('display0');
                    shopsSlider[1].classList.add('display0');
                } else if (i == 1) {
                    shopsMap__li_toggle[0].textContent = '360 м';
                    shopsMap__li_toggle[1].textContent = '80';
                    shopsMap__li_toggle[2].textContent = 'Мужской 70% / Женский 30%';
                    shopsMap__li_toggle[3].textContent = 'Middle / Middle-Up';
                    shopsButton__button[i - 1].style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                    shopsButton__button[i - 1].style.color = 'black';
                    shopsButton__button[i - 1].textContent = 'Подробнее'
                    shopsButton__button[i - 1].classList.remove('active');
                    shopsSlider[1].classList.remove('display0');
                    shopsSlider[0].classList.add('display0');
                }
                shopsMap.classList.remove('display0');
            } else {
                shopsButton__button[i].style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                shopsButton__button[i].style.color = 'black';
                shopsButton__button[i].textContent = 'Подробнее'
                shopsButton__button[i].classList.remove('active');
                shopsMap.classList.add('display0');
                shopsSlider[i].classList.add('display0');
            }
            myMap.destroy();
            map();
        }
        el.onmouseenter = () => {
            if (el.classList.contains('active')) {
                el.style.opacity = 0.8;
            } else {
                el.style.backgroundColor = 'rgba(0, 0, 0, 0.11)';
            }
        }
        el.onmouseleave = () => {
            if (el.classList.contains('active')) {
                el.style.opacity = 1;
            } else {
                el.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
            }
        }
    })
}
button()
