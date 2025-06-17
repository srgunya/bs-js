const bs = require('./db')

const itemPage = (req, res) => {
    let query = `SELECT * FROM item WHERE id = '${req.body.id}'`;
    bs.query(query, (err, result, field) => {
        res.send(result);
    })
}

module.exports = itemPage
