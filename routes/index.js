
const noteRoute = require('./note');
const categoryRoute = require('./category');
const notificationRoute = require('./notification');
function route(app) {
    app.use('/note', noteRoute);
    app.use('/category', categoryRoute);
    app.use('/notification', notificationRoute);
}
module.exports = route;