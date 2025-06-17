const bs = require('./db')

const getFilter = (req, res) => {
    let sex, category, color, size, brand, clas, price, sale;
    let query

    function getStrReq(req, str) {
        let x;
        if (req) {
            x = req.map((el) => {
                return `'${el}'`
            })
            x = x.join(', ')
            x = `${str} IN (${x})`
        } else {
            x = `${str} LIKE '%'`
        }
        return x
    }

    sex = getStrReq(req.body.sex, 'sex')
    category = getStrReq(req.body.category, 'category')
    color = getStrReq(req.body.color, 'color')
    size = getStrReq(req.body.size, 'size')
    brand = getStrReq(req.body.brand, 'brand')
    clas = getStrReq(req.body.clas, 'class')

    if (req.body.min && req.body.max) {
        price = `CEILING(price * (1 - sale / 100)) BETWEEN ${req.body.min} AND ${req.body.max} AND`
    } else {
        price = ''
    }

    if (req.body.sale == true) {
        sale = `AND sale != 0`
    } else if (!req.body.sale) {
        sale = ''
    }

    if (req.body.new == 'all') {
        query = `SELECT * FROM item`
    } else if (req.body.sale == 'all') {
        query = `SELECT * FROM item WHERE sale !=0`
    } else {
        query = `SELECT *
                 FROM item 
                 WHERE ${price} 
                 ${sex} 
                 AND ${category} 
                 AND ${color} 
                 AND ${size} 
                 AND ${brand} 
                 AND ${clas}
                 ${sale}`
    }
    bs.query(query, (err, result, field) => {
        let body = {
            sex: [],
            category: [],
            color: [],
            size: [],
            brand: [],
            min: [],
            max: []
        }
        let price = [];
        result.forEach((el) => {
            body.sex.push(el.sex);
            body.category.push(el.category);
            body.color.push(el.color);
            body.brand.push(el.brand);
            if (el.size.indexOf(',')) {
                el.size.split(',').forEach((el) => {
                    body.size.push(el)
                })
            } else {
                body.size.push(el.size)
            }

            if (el.sale != 0) {
                let price_sale = Math.ceil(el.price - (el.price * el.sale / 100))
                price.push(price_sale)
            } else {
                price.push(el.price);
            }
        })
        body.sex = Array.from(new Set(body.sex))
        body.category = Array.from(new Set(body.category))
        body.color = Array.from(new Set(body.color))
        body.size = Array.from(new Set(body.size))
        body.brand = Array.from(new Set(body.brand))
        body.min = Math.min.apply(null, price);
        body.max = Math.max.apply(null, price);
        res.send(body);
    })
}

module.exports = getFilter
