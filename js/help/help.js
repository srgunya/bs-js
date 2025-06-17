function help() {
    let help__req = document.querySelectorAll('.help__req');
    let help__res = document.querySelectorAll('.help__res');
    let resHeight = Array(help__res.length);

    let plus__span_col = document.querySelectorAll('.plus__span_col')

    window.onload = () => {
        help__res.forEach((el, i) => {
            resHeight[i] = el.offsetHeight
            el.style.height = 0;
            console.log(resHeight[i])
        })
        setTimeout(() => help__req[0].click(), 100)

    }

    help__req.forEach((el, i) => {
        el.onclick = () => {
            if (help__res[i].style.height == '0px') {
                help__res[i].style.height = resHeight[i] + 'px';
                plus__span_col[i].style.transform = 'rotate(0deg)';
            } else {
                help__res[i].style.height = 0;
                plus__span_col[i].style.transform = 'rotate(90deg)';
            }

        }
    })
}
help()
