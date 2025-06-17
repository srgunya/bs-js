const express = require('express');
const router = express.Router()

const getFilter = require('../controllers/filter')


router.post('/getFilter', getFilter);


module.exports = router
