const categorySchema = require('../models/category')
class categoryController {
    get(req, res, next) {
        categorySchema.find({}).//trỏ đến key thôi nha
            then((data) => {
                res.json(data)
            })
    }
}
module.exports = new categoryController;