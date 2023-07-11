const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: String,
    color: String,
    img: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
},
    {
        collection: 'categories',
        timestamps: true
    });

const CategoryModel = mongoose.model('categories', categorySchema);
module.exports = CategoryModel;
