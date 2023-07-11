const Note = require('../models/note');

class noteController {
    get(req, res, next) {
        Note.find({}).populate('user').populate('category').then((data) => {
            res.json(data);
        }).catch((error) => {
            next(error);
        });
    }
}

module.exports = new noteController();
