const express = require('express');
const router = express.Router()


const {
    logoCount,
    getLogo,
    sliderCount,
    getSlider
} = require('../controllers/slider')


router.get('/logoCount', logoCount);
router.post(/.*logo$/, getLogo);
router.get('/sliderCount', sliderCount);
router.post(/.*slider$/, getSlider);





module.exports = router
