const Notification = require('../models/notification')
class notificationController {
    get(req, res, next) {
        Notification.find({}).populate('note').
            then((data) => {
                res.json(data)
            })
    }
    create = async (req, res, next) => {
        const formData = req.body;
        console.log(req.body);
        Notification.create(formData).then(() => {
            console.log('success');
        }).catch((err) => {
            console.log('failed ' + err);
        })
    }

}
module.exports = new notificationController;