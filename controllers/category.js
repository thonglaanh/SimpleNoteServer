const categorySchema = require('../models/category')
class categoryController {
    get(req, res, next) {
        categorySchema.find({}).//trỏ đến key thôi nha
            then((data) => {
                res.json(data)
            })
    }
    create = async (req, res, next) => {
        const formData = req.body;
        console.log(req.body);
        categorySchema.create(formData).then(() => {
            console.log('success');
        }).catch((err) => {
            console.log('failed ' + err);
        })
    }

}
module.exports = new categoryController;