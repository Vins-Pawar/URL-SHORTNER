const express = require('express');
const { handleCreateNewShortUrl, handleRedirectUrl, handleGetAnalytics } = require('../controllers/url')

const router = express.Router();

router.post('/', handleCreateNewShortUrl)
router.get('/:shortid', handleRedirectUrl)
router.get('/analytics/:shortid', handleGetAnalytics)

module.exports = router;