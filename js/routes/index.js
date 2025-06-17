const express = require('express');
const router = express.Router()
const path = require('path');



const sliderRouter = require('./slider')
const itemRouter = require('./items')
const filterRouter = require('./filter')
const itemPageRouter = require('./itemPage')
const callRouter = require('./call')
const pagi = require('./pagi')


router.use('/', sliderRouter)
router.use('/', itemRouter)
router.use('/', filterRouter)
router.use('/', itemPageRouter)
router.use('/', callRouter)
router.use('/', pagi)


router.get('/', (req, res) => res.sendFile(path.resolve('html/index.html')));
router.get('/contact', (req, res) => res.sendFile(path.resolve('html/contact.html')));
router.get('/shops', (req, res) => res.sendFile(path.resolve('html/shops.html')));
router.get('/loyalnost', (req, res) => res.sendFile(path.resolve('html/loyalnost.html')));
router.get('/partners', (req, res) => res.sendFile(path.resolve('html/partners.html')));
router.get('/loya', (req, res) => res.sendFile(path.resolve('html/help/loya.html')));
router.get('/soglashenie', (req, res) => res.sendFile(path.resolve('html/help/soglashenie.html')));
router.get('/politika', (req, res) => res.sendFile(path.resolve('html/help/politika.html')));
router.get('/faq', (req, res) => res.sendFile(path.resolve('html/faq.html')));
router.get('/brand', (req, res) => res.sendFile(path.resolve('html/brand.html')));
router.get(/^\/list\//, (req, res) => res.sendFile(path.resolve('html/list.html')));
router.get('/item/:id', (req, res) => res.sendFile(path.resolve('html/item.html')));
router.get('/wishlist', (req, res) => res.sendFile(path.resolve('html/star.html')));
router.get('/faq/:id', function (req, res) {
    if (req.params.id == '1') {
        res.sendFile(path.resolve('html/help/one.html'));
    } else if (req.params.id == '2') {
        res.sendFile(path.resolve('html/help/two.html'));
    } else if (req.params.id == '3') {
        res.sendFile(path.resolve('html/help/three.html'));
    } else if (req.params.id == '4') {
        res.sendFile(path.resolve('html/help/four.html'));
    } else if (req.params.id == '5') {
        res.sendFile(path.resolve('html/help/five.html'));
    } else if (req.params.id == '6') {
        res.sendFile(path.resolve('html/help/six.html'));
    }
});



module.exports = router
