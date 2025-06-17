function bildPost(LIMIT, OFFSET) {
    let url = decodeURI(window.location.href);
    let url_mas = url.split('/')
    let body = {};


    if (url_mas[url_mas.length - 1] == 'new') {
        body.new = 'all'
    } else if (url_mas[url_mas.length - 1] == 'sale') {
        body.sale = 'all'
    }
    if (url.indexOf('/sale/') != -1) {
        body.sale = true
    }

    function setStrPost(str, num) {
        if (url.includes(str)) {
            let x = url.indexOf(str)
            let slash = url.indexOf('/', x)
            if (slash == -1) {
                slash = undefined
            }
            let mas = url.slice(x + num, slash).split(',')
            mas = mas.map((el) => {
                if (el.includes('!')) {
                    el = el.slice(0, -1)
                }
                return el
            })
            return mas;
        }
    }

    body.sex = setStrPost('sex', 'sex'.length + 1)
    body.category = setStrPost('category', 'category'.length + 1)
    body.color = setStrPost('color', 'color'.length + 1)
    body.size = setStrPost('size', 'size'.length + 1)
    body.brand = setStrPost('brand', 'brand'.length + 1)
    body.clas = setStrPost('clas', 'clas'.length + 1)

    body.min = +url.replace(/^.*\price=/g, '').replace(/\,.*/g, '');
    let min_str = 'price=' + body.min + ',';
    let re = new RegExp('^.*\\' + min_str, 'g');
    body.max = +url.replace(re, '').replace(/\/.*/g, '');

    body.LIMIT = LIMIT;
    body.OFFSET = OFFSET;
    return body
}
