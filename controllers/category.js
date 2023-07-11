const categorySchema = require('../models/category')
class categoryController {
    get(req, res, next) {
        categorySchema.find({}).populate('user').//trỏ đến key thôi nha
            then((data) => {
                res.json(data)
            })
    }
}
module.exports = new categoryController;