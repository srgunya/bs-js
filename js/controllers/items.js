const bs = require('./db')


const getItems = (req, res) => {
    let sex, category, color, size, brand, clas, price, sale;
    let query;

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
        query = `SELECT * FROM item LIMIT ${req.body.LIMIT} OFFSET ${req.body.OFFSET}`
    } else if (req.body.sale == 'all') {
        query = `SELECT * FROM item WHERE sale !=0 LIMIT ${req.body.LIMIT} OFFSET ${req.body.OFFSET}`
    } else {
        query = `SELECT *, price * (1 - sale / 100) AS discounted_price
                 FROM item 
                 WHERE ${price} 
                 ${sex} 
                 AND ${category} 
                 AND ${color} 
                 AND ${size} 
                 AND ${brand} 
                 AND ${clas} 
                 ${sale}
                 LIMIT ${req.body.LIMIT} OFFSET ${req.body.OFFSET}`
    }
    bs.query(query, (err, result, field) => {
        res.send(result);
    })
}

module.exports = getItems
