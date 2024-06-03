// routes/analyticsRoutes.js
const express = require('express');
const router = express.Router();
const { recordImpression } = require('../controller/analyticsController');
const auth = require('../middleware/auth');

// @route POST api/analytics/impression
// @desc Record an impression
// @access Private
router.post('/impression', auth, recordImpression);

module.exports = router;
