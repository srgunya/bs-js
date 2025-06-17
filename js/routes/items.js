const express = require('express');
const router = express.Router()

const getItems = require('../controllers/items')



router.post('/getItems', getItems);





module.exports = router
