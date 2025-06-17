const express = require('express');
const router = express.Router()

const pagi = require('../controllers/pagi')

router.post('/itemsCount', pagi);

module.exports = router
