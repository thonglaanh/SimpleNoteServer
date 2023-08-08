const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: String,
    color: String,
},
    {
        collection: 'categories',
        timestamps: true
    });

const CategoryModel = mongoose.model('categories', categorySchema);
module.exports = CategoryModel;
