const express = require('express');
const router = express.Router();
const controller = require('../controllers/note')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
router.get('/', controller.get);
router.post('/createNote', upload.single('img'), controller.createNote);
router.post('/updateNote/:_id', upload.single('img'), controller.updateNote);
router.delete('/deleteNote/:_id', controller.deleteNote);

module.exports = router;