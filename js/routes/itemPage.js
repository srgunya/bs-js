const express = require('express');
const router = express.Router()

const itemPage = require('../controllers/itemPage')


router.post('/getPage', itemPage);


module.exports = router
