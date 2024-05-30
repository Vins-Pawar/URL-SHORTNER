const mongoose = require('mongoose')
const URL = require('../models/url')
const generateShortId = require('ssid');

async function handleCreateNewShortUrl(req, res) {
    const body = req.body;
    const shortId = generateShortId();
    // console.log(body.url);
    if (!body.url)
        return res.status(400).json({ Error: 'URL is required' })

    // console.log(req.user);
    // console.log(req.user._id.toString());

    await URL.create({
        shortID: shortId,
        redirectUrl: body.url,
        visitedHistory: [],
        createdBy: req.user._id,
    })

    return res.render('home', { id: shortId })
    // return res.status(201).json({ msg: 'sucessful', id: shortId });
}

async function handleRedirectUrl(req, res) {
    const shortid = req.params.shortid;

    if (!shortid)
        return res.status.json({ error: 'short id is required' })

    const enrty = await URL.findOneAndUpdate({
        shortID: shortid
    }, {
        $push: {
            visitedHistory: {
                timestamp: Date.now()
            }
        }
    })

    res.redirect(enrty.redirectUrl)
}

async function handleGetAnalytics(req, res) {
    const shortID = req.params.shortid

    if (!shortID)
        return res.status(400).json({ error: 'short id is required' })

    const data = await URL.findOne({
        shortID
    })
    if (data === null)
        return res.status(400).json({ msg: `no record found for shortId ${shortID}` })

    return res.status(200).json({
        totalVisit: data.visitedHistory.length,
        visitedHistory: data.visitedHistory
    })
}

module.exports = { handleCreateNewShortUrl, handleRedirectUrl, handleGetAnalytics }