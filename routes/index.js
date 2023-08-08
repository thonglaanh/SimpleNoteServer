
const noteRoute = require('./note');
const categoryRoute = require('./category');
function route(app) {
    app.use('/note', noteRoute);
    app.use('/category', categoryRoute);
}
module.exports = route;