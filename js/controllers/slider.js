const bs = require('./db')

const logoCount = (req, res) => {
    let query = `SELECT COUNT(*) FROM logo`;
    bs.query(query, (err, result, field) => {
        res.send(result);
    })
}

const getLogo = (req, res) => {
    let ids = req.body
    let logos = [];

    ids.forEach((id, i, arr) => {
        let query = `SELECT * FROM logo WHERE id = '${id}'`;
        bs.query(query, (err, result, field) => {
            logos.push(result[0])
            if (arr.length == i + 1) {
                res.send(logos);
            }
        })
    })
}

const sliderCount = (req, res) => {
    let query = `SELECT COUNT(*) FROM item`;
    bs.query(query, (err, result, field) => {
        res.send(result);
    })
}

const getSlider = (req, res) => {
    let ids = req.body
    let items = [];

    ids.forEach((id, i, arr) => {
        let query = `SELECT * FROM item WHERE id = '${id}'`;
        bs.query(query, (err, result, field) => {
            items.push(result[0])
            if (arr.length == i + 1) {
                res.send(items);
            }
        })
    })
}

module.exports = {
    logoCount,
    getLogo,
    sliderCount,
    getSlider
}
