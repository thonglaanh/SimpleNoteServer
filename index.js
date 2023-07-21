require('dotenv').config();
const express = require('express');
const app = express();
const route = require('./routes');
const bodyParser = require('body-parser');
const db = require('./db/index')
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use('/uploads', express.static('uploads'))


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
db.connect();


route(app);//Phải đặt cuối gần listen
app.listen(process.env.PORT, () => {
    console.log('Server started on http://localhost:' + process.env.PORT);
})