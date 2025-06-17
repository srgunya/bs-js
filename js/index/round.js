function roundNav() {
    let round__round = document.querySelector('.round__round');
    let round__img_wrap = document.querySelectorAll('.round__img_wrap');
    let round__cont = document.querySelector('.round__cont');
    let round__but_one = document.querySelector('.round__but_one');
    let round__but_two = document.querySelector('.round__but_two');
    let round__block_two = document.querySelector('.round__block_two');
    let roundData__but = document.querySelector('.roundData__but');
    let round__h2_span = document.querySelector('.round__h2_span');
    let roundDay__day_span = document.querySelector('.roundDay__day_span');
    let tel = document.querySelector('.tel');

    let round_click = document.querySelector('.round_click');
    round_click.onclick = () => round__round.click();

    round__round.onclick = () => {
        round__cont.style.display = 'block';
        setTimeout(() => {
            round__cont.style.opacity = 1;
            round__cont.style.bottom = 0.6583278473 + 'vw';
        }, 1);
        let audio = document.querySelector('.audio');
        audio.currentTime = 0;
        audio.play();
        $(".tel").mask("+7 (999) 999-9999");
    }
    round__img_wrap[0].onclick = () => {
        round__cont.style.opacity = 0;
        round__cont.style.bottom = -1.9749835418 + 'vw';

        setTimeout(() => {
            round__cont.style.display = 'none';
            document.querySelector('.tel').value = '';
            round__block_two.style.opacity = 0;
            round__block_two.style.left = 2.6333113891 + 'vw';
            round__block_two.style.display = 'none';
            round__img_wrap[1].style.opacity = 0;
            round__img_wrap[1].style.display = 'none';
            round__h2_span.textContent = 'через 60 секунд';
            roundDay__day_span.textContent = 'Сегодня';
        }, 300);
        resetData()
    }
    round__img_wrap[1].onclick = () => {
        round__block_two.style.left = 2.6333113891 + 'vw';
        round__block_two.style.opacity = 0;
        round__img_wrap[1].style.opacity = 0;
        setTimeout(() => {
            round__block_two.style.display = 'none';
            roundDay__day_span.textContent = 'Сегодня';
        }, 300);
    }
    round__but_two.onclick = () => {
        round__block_two.style.display = 'block';
        round__img_wrap[1].style.display = 'flex';
        setTimeout(() => {
            round__block_two.style.left = 0;
            round__block_two.style.opacity = 1;
            round__img_wrap[1].style.opacity = 1;
        }, 100);
        roundData();
    }
    round__but_one.onclick = () => {
        if (tel.value) {
            let body = {
                kogda: round__h2_span.textContent,
                telephone: tel.value
            }
            fetch('/call', {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
        }
    }

    roundData__but.onclick = () => {
        let roundTime__block = document.querySelectorAll('.roundTime__block.active');
        let roundDay__day_span = document.querySelector('.roundDay__day_span');
        round__h2_span.textContent = roundDay__day_span.textContent + ' в ' + roundTime__block[0].getAttribute('data') + ':' + roundTime__block[1].getAttribute('data');
        round__img_wrap[1].click();
        roundDay__day_span.textContent = 'Сегодня';
    }
}
roundNav()

function roundDay() {
    let roundDay = document.querySelector('.roundDay');
    let roundDay__img = document.querySelector('.roundDay__img');
    let roundDay__day = document.querySelectorAll('.roundDay__day');
    let roundDay__day_span = document.querySelector('.roundDay__day_span');

    roundDay.onclick = () => {
        if (roundDay.classList.contains('open')) {
            roundDay.style.height = 3.2916392363 + 'vw';
            roundDay.classList.remove('open');
            roundDay__img.style.transform = 'rotate(0deg)'
            roundDay__day.forEach((el, i) => {
                el.style.backgroundColor = 'white';
                el.onmouseover = () => {
                    return
                }
                el.onmouseout = () => {
                    return
                }

            })
            roundData()
        } else {
            roundDay.style.height = 'auto';
            roundDay.classList.add('open');
            roundDay__img.style.transform = 'rotate(180deg)'
            roundDay__day[0].style.backgroundColor = 'rgba(0, 0, 0, .05)';
            roundDay__day.forEach((el, i) => {
                el.onmouseover = () => {
                    el.style.backgroundColor = 'rgba(0, 0, 0, .05)';
                }
                el.onmouseout = () => {
                    el.style.backgroundColor = 'white';
                }
                el.onclick = () => {
                    roundDay__day_span.textContent = roundDay__day[i].textContent;
                }
            })
            roundDay__day_span.textContent = 'Сегодня';
        }
    }
}
roundDay()

function roundTime() {
    let roundTime__block_one = document.querySelector('.roundTime__cont_one').querySelectorAll('.roundTime__block');
    let roundTime__block_two = document.querySelector('.roundTime__cont_two').querySelectorAll('.roundTime__block');

    let x = -2.896642528;
    let a = 0;
    let y = -2.896642528;
    let b = 0;

    $('.roundTime__cont_one').bind('mousewheel', function (event) {
        event.preventDefault();
        if (event.originalEvent.wheelDelta >= 0) {
            //вверх
            let active = document.querySelector('.roundTime__block_hourse.active');
            if (roundTime__block_one[0].classList.contains('active') || window.getComputedStyle(active.previousElementSibling).display == 'none') {
                return false;
            }
            for (let i = 0; i < roundTime__block_one.length; i++) {
                if (roundTime__block_one[i].classList.contains('active')) {
                    roundTime__block_one[i].classList.remove('active');
                    roundTime__block_one[i - 1].classList.add('active');
                    break;
                }
            }
            if (a == 0) {
                x = x + 2.896642528 + 2.896642528
                a = 1;
            } else {
                x = x + 2.896642528;
            }
            this.querySelectorAll('.roundTime__block').forEach((el, i) => {
                el.style.top = x + 'vw';
            })
            if (isFinite(roundScroll())) {
                y = roundScroll()
            }
        } else {
            //вниз
            if (roundTime__block_one[roundTime__block_one.length - 1].classList.contains('active')) {
                return false;
            }
            for (let i = 0; i < roundTime__block_one.length; i++) {
                if (roundTime__block_one[i].classList.contains('active')) {
                    roundTime__block_one[i].classList.remove('active');
                    roundTime__block_one[i + 1].classList.add('active');
                    break;
                }
            }
            if (a == 1) {
                x = x - 2.896642528;
                a = 0;
            }
            this.querySelectorAll('.roundTime__block').forEach((el, i) => {
                el.style.top = x + 'vw';
            })
            x = x - 2.896642528;
            if (isFinite(roundScroll('вниз'))) {
                y = roundScroll('вниз')
            }
        }
    });
    $('.roundTime__cont_two').bind('mousewheel', function (event) {
        event.preventDefault();
        if (event.originalEvent.wheelDelta >= 0) {
            //вверх
            let active = document.querySelector('.roundTime__block_min.active');
            if (roundTime__block_two[0].classList.contains('active') || window.getComputedStyle(active.previousElementSibling).display == 'none') {
                return false;
            }

            for (let i = 0; i < roundTime__block_two.length; i++) {
                if (roundTime__block_two[i].classList.contains('active')) {
                    roundTime__block_two[i].classList.remove('active');
                    roundTime__block_two[i - 1].classList.add('active');
                    break;
                }
            }
            if (b == 0) {
                y = y + 2.896642528 + 2.896642528
                b = 1;
            } else {
                y = y + 2.896642528;
            }
            this.querySelectorAll('.roundTime__block').forEach((el, i) => {
                el.style.top = y + 'vw';
            })

        } else {
            //вниз
            if (roundTime__block_two[roundTime__block_two.length - 1].classList.contains('active')) {
                return false;
            }

            for (let i = 0; i < roundTime__block_two.length; i++) {
                if (roundTime__block_two[i].classList.contains('active')) {
                    roundTime__block_two[i].classList.remove('active');
                    roundTime__block_two[i + 1].classList.add('active');
                    break;
                }
            }
            if (b == 1) {
                y = y - 2.896642528;
                b = 0;
            }
            this.querySelectorAll('.roundTime__block').forEach((el, i) => {
                el.style.top = y + 'vw';
            })
            y = y - 2.896642528;
        }
    });
}
roundTime()

function roundData() {
    let hour = new Date().getHours();
    let min = new Date().getMinutes();
    let roundTime__block_hourse = document.querySelectorAll('.roundTime__block_hourse');
    let roundTime__block_min = document.querySelectorAll('.roundTime__block_min');
    let roundDay__day_span = document.querySelector('.roundDay__day_span').textContent.replace(/\n/g, '').replaceAll(' ', '');
    let active;


    let roundTime__cont = document.querySelector('.roundTime');
    let roundTime__close = document.querySelector('.roundTime__close');
    let roundData__but_wrap = document.querySelector('.roundData__but_wrap');
    if (roundDay__day_span == 'Сегодня' &&
        roundTime__block_hourse[roundTime__block_hourse.length - 1].getAttribute('data') < hour ||
        roundDay__day_span == 'Сегодня' &&
        roundTime__block_hourse[roundTime__block_hourse.length - 1].getAttribute('data') == hour &&
        roundTime__block_min[roundTime__block_min.length - 1].getAttribute('data') == min) {
        roundTime__cont.style.display = 'none';
        roundData__but_wrap.style.display = 'none';
        roundTime__close.style.display = 'flex';
        let roundTime__close_a = document.querySelector('.roundTime__close_a');
        roundTime__close_a.onclick = () => {
            let roundDay__day = document.querySelectorAll('.roundDay__day')
            roundDay__day[1].click();
            roundDay__day[1].click();
        }
        return false
    } else {
        roundTime__cont.style.display = 'flex';
        roundData__but_wrap.style.display = 'flex';
        roundTime__close.style.display = 'none';
    }

    if (roundDay__day_span == 'Сегодня') {


        roundTime__block_hourse.forEach((el, i) => {
            el.classList.remove('active')
            el.style.top = 0;
            if (el.getAttribute('data') < hour) {
                el.style.display = 'none'
            }
        })

        for (let i = 0; i < roundTime__block_hourse.length; i++) {
            if (window.getComputedStyle(roundTime__block_hourse[i]).display != 'none') {
                roundTime__block_hourse[i].classList.add('active')
                active = roundTime__block_hourse[i];
                break
            }
        }


        if (active.getAttribute('data') == hour) {
            roundTime__block_min.forEach((el, i) => {
                el.classList.remove('active')
                el.style.top = 0;
                if (el.getAttribute('data') <= min) {
                    el.style.display = 'none'
                }
            })
        }

        for (let i = 0; i < roundTime__block_min.length; i++) {
            if (window.getComputedStyle(roundTime__block_min[i]).display != 'none') {
                roundTime__block_min[i].classList.add('active')
                break
            }
        }

        if (active.getAttribute('data') == hour &&
            window.getComputedStyle(roundTime__block_min[roundTime__block_min.length - 1]).display == 'none') {
            active.style.display = 'none';
            active.classList.remove('active')
            active.nextElementSibling.classList.add('active')
            roundScroll()
        }
        resetData()
    } else {
        let roundTime__block = document.querySelectorAll('.roundTime__block');
        roundTime__block.forEach((el) => {
            el.style.display = 'flex';
            el.classList.remove('active');
            el.style.top = 0;
        })
        roundTime__block_hourse[0].classList.add('active');
        roundTime__block_min[0].classList.add('active');
        resetData()
    }
}

function roundScroll(kuda) {
    let hour = new Date().getHours();
    let roundTime__block = document.querySelectorAll('.roundTime__block');
    let roundTime__block_hourse = document.querySelectorAll('.roundTime__block_hourse');
    let roundTime__block_min = document.querySelectorAll('.roundTime__block_min');
    let roundDay__day_span = document.querySelector('.roundDay__day_span').textContent.replace(/\n/g, '').replaceAll(' ', '');
    let active = document.querySelector('.roundTime__block_hourse.active');

    if (active.getAttribute('data') == hour && roundDay__day_span == 'Сегодня') {
        roundTime__block.forEach((el) => {
            el.style.top = 0;
        })
        setTimeout(roundData, 300)
        return -2.896642528
    } else if (active.getAttribute('data') == hour + 1 && roundDay__day_span == 'Сегодня' && kuda == 'вниз') {
        roundTime__block_min.forEach((el) => {
            el.style.display = 'flex';
            el.classList.remove('active');
            setTimeout(() => el.style.top = 0, 1)
        })
        roundTime__block_min[0].classList.add('active')
        return -2.896642528
    }
}

function resetData() {
    let roundTime__block = document.querySelectorAll('.roundTime__block');
    roundTime__block.forEach((el) => {
        el.style.top = 0;
    })
    let roundTime__wrap = document.querySelector('.roundTime__wrap');
    let clone = roundTime__wrap.cloneNode(true);
    roundTime__wrap.replaceWith(clone)
    roundTime()
}
