const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    img: String
},
    {
        collection: 'users',
        timestamps: true

    });

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;
