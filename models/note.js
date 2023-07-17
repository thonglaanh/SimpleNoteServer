const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: String,
    content: String,
    img: String,
    color: String,
    startDate: Date,
    endDate: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
},
    {
        collection: 'notes',
        timestamps: true

    });

const NoteModel = mongoose.model('notes', noteSchema);
module.exports = NoteModel;
