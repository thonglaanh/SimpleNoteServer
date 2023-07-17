const express = require('express');
const router = express.Router();
const controller = require('../controllers/note')
const middleware = require('../middlerware/middleware')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
router.get('/', middleware, controller.get);
router.post('/createNote', middleware, upload.single('img'), controller.createNote);
router.post('/updateNote/:_id', middleware, upload.single('img'), controller.updateNote);
router.delete('/deleteNote/:_id', middleware, controller.deleteNote);

module.exports = router;