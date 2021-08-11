const express = require('express');
const router = express.Router();
const { authRouter } = require('../components/auth');
const { advertisementRouter } = require('../components/advertisement');

router.use('/api', authRouter);
router.use('/api/advertisements', advertisementRouter);

module.exports = router;
