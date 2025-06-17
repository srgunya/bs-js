const express = require('express');
const router = express.Router()
const call = require('../controllers/call')

router.post('/call', call);

module.exports = router
