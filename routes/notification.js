const express = require('express');
const router = express.Router();
const controller = require('../controllers/notification')
router.get('/', controller.get)
router.post('/create', controller.create)
module.exports = router;