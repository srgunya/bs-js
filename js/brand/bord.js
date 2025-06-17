function bord() {
    let bord__ul = document.querySelectorAll('.bord__ul');
    let bord__block = document.querySelectorAll('.bord__block');
    let alpha__div = document.querySelectorAll('.alpha__div');
    let bord__a = document.querySelectorAll('.bord__a');

    bord__ul.forEach((el, i) => {
        if (el.firstElementChild.textContent == '') {
            bord__block[i].style.display = 'none';
            alpha__div[i].classList.add('alpha__div_hide')
        }
    })
    bord__a.forEach((el) => {
        if (el.href == 'javascript:void(0)') {
            el.classList.add('bord__a_hide')
        }
    })
    alpha__div.forEach((el, i) => {
        if (!el.classList.contains('alpha__div_hide')) {
            el.onclick = () => {
                let x = document.querySelector('.alpha__wrap').getBoundingClientRect();
                window.scrollBy({
                    top: bord__block[i].offsetTop - x.height - 20 - window.pageYOffset,
                    behavior: 'smooth'
                });
            }
        }

    })

}
bord()
