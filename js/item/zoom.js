function zoom(indx) {
    let zoom = document.querySelectorAll('.image-zoom');
    zoom.forEach(function (el) {
        el.addEventListener('click', function (e) {
            const target = e.target.closest('.image-zoom'),
                rect = target.getBoundingClientRect();
            target.classList.toggle('-active');
            if (indx == 'item') {
                target.style.setProperty('--image', `url(${target.querySelector('.bigImg__img').getAttribute('src')})`);
            } else if (indx == 'lupa') {
                if (!target.querySelector('.itemLupa')) {
                    return false
                } else {
                    target.style.setProperty('--image', `url(${target.querySelector('.itemLupa').getAttribute('src')})`);
                }
            }
            target.style.setProperty('--x', (Math.floor(((e.clientX - rect.left) / rect.width * 100) * 100) / 100) + '%');
            target.style.setProperty('--y', (Math.floor(((e.clientY - rect.top) / rect.height * 100) * 100) / 100) + '%');
            target.style.setProperty('--new-x', e.clientX - rect.left + 'px');
            target.style.setProperty('--new-y', e.clientY - rect.top + 'px');
            target.classList.toggle('-enter');
        });

        el.addEventListener('mouseenter', function (e) {
            const target = e.target.closest('.image-zoom');
            if (target.classList.contains('-active')) {
                target.classList.add('-enter');
            }
        });

        el.addEventListener('mousemove', function (e) {
            const target = e.target.closest('.image-zoom');
            if (target.classList.contains('-active')) {
                const rect = target.getBoundingClientRect();
                target.style.setProperty('--x', (Math.floor(((e.clientX - rect.left) / rect.width * 100) * 100) / 100) + '%');
                target.style.setProperty('--y', (Math.floor(((e.clientY - rect.top) / rect.height * 100) * 100) / 100) + '%');
                target.style.setProperty('--new-x', e.clientX - rect.left + 'px');
                target.style.setProperty('--new-y', e.clientY - rect.top + 'px');
            }
        });

        el.addEventListener('mouseleave', function (e) {
            let target = e.target.closest('.image-zoom');
            if (target.classList.contains('-active')) {
                target.classList.remove('-enter');
            }
        });
    });
}
