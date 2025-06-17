function cloudItem() {
    let infoInfo__block_vozvrat = document.querySelector('.infoInfo__block_vozvrat');
    let infoInfo__block_dostavka = document.querySelector('.infoInfo__block_dostavka');
    let but = [];
    let itemBody__shadow = document.querySelector('.itemBody__shadow')

    but.push(infoInfo__block_vozvrat);
    but.push(infoInfo__block_dostavka);


    let dostavka = document.querySelector('.dostavka');
    let vozvrat = document.querySelector('.vozvrat');
    let body = document.querySelector('body');
    let header = document.querySelector('header');
    but.forEach((el) => {
        el.onclick = () => {
            body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px';
            header.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px';
            body.style.overflow = 'hidden';
            itemBody__shadow.style.display = 'flex';
            setTimeout(() => {
                itemBody__shadow.style.opacity = 1;
            }, 100)
            if (el == infoInfo__block_dostavka) {
                dostavka.style.display = 'block';
                dostavka.classList.add('cloud_active');
                setTimeout(() => {
                    dostavka.style.bottom = 0;
                }, 300)
            } else if (el == infoInfo__block_vozvrat) {
                vozvrat.style.display = 'block';
                vozvrat.classList.add('cloud_active');
                setTimeout(() => {
                    vozvrat.style.bottom = 0;
                }, 300)
            }
        }
    })

    let vozvrat__close = document.querySelector('.vozvrat__close');
    let dostavka__close = document.querySelector('.dostavka__close');
    let close = []

    close.push(vozvrat__close);
    close.push(dostavka__close);

    close.forEach((el) => {
        el.onclick = () => {
            body.style.paddingRight = 0;
            header.style.paddingRight = 0;
            body.style.overflow = 'inherit';
            if (el == vozvrat__close) {
                vozvrat.classList.remove('cloud_active');
                vozvrat.style.bottom = -65.8327847268 + 'vw';
                itemBody__shadow.style.opacity = 0;
                setTimeout(() => {
                    vozvrat.style.display = 'none';
                    itemBody__shadow.style.display = 'none';
                }, 300)
            } else if (el == dostavka__close) {
                dostavka.classList.remove('cloud_active');
                dostavka.style.bottom = -65.8327847268 + 'vw';
                itemBody__shadow.style.opacity = 0;
                setTimeout(() => {
                    dostavka.style.display = 'none';
                    itemBody__shadow.style.display = 'none';
                }, 300)
            }
        }
    })
    itemBody__shadow.onclick = (e) => {
        if (e.target == itemBody__shadow) {
            body.style.paddingRight = 0;
            header.style.paddingRight = 0;
            body.style.overflow = 'inherit';
            let cloud_active = document.querySelector('.cloud_active');
            cloud_active.style.bottom = -65.8327847268 + 'vw';
            itemBody__shadow.style.opacity = 0;
            setTimeout(() => {
                cloud_active.style.display = 'none';
                itemBody__shadow.style.display = 'none';
            }, 300)
            cloud_active.classList.remove('cloud_active')
        }
    }
}
cloudItem()
