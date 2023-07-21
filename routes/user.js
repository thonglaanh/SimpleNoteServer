const express = require('express');
const router = express.Router();
const controller = require('../controllers/user')
const middleware = require('../middlerware/middleware')
router.post('/login', controller.login)
router.get('/logout', controller.logout)
router.post('/register', controller.register)
router.get('/', middleware, controller.get)
router.post('/changePass', middleware, controller.changePass);
router.post('/changeProfile/:_id', middleware, controller.changeProfile);



module.exports = router;