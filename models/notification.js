const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    note: { type: mongoose.Schema.Types.ObjectId, ref: 'notes' },

},
    {
        collection: 'notifications',
        timestamps: true
    });

const NotificationModel = mongoose.model('notifications', notificationSchema);
module.exports = NotificationModel;
