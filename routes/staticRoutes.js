const express = require('express');
const { checkForAuthentication, restrictTo } = require('../middlewares/auth')


const URL = require('../models/url')
const router = express.Router();

router.get('/admin/urls', restrictTo(['ADMIN']), async (req, res) => {
    const allUrls = await URL.find({})
    res.render('home', {
        urls: allUrls
    });
})

router.get('/', restrictTo(['NORMAL', 'ADMIN']), async (req, res) => {
    // if (!req.user) return res.redirect('/login')

    //show the urls which are created by user
    const allUrls = await URL.find({ createdBy: req.user?._id })
    res.render('home', {
        urls: allUrls
    });
})

router.get('/signup', (req, res) => {
    return res.render('signup')
})

router.get('/login', (req, res) => {
    return res.render('login')
})
module.exports = router;