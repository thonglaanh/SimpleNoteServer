require('dotenv').config();
const express = require('express');
const app = express();
const route = require('./routes');
const bodyParser = require('body-parser');
const db = require('./db/index')
app.use(express.json());
app.use('/uploads', express.static('uploads'))


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
db.connect();



route(app);//Phải đặt cuối gần listen
app.listen(process.env.PORT, () => {
    console.log('Server started on http://localhost:' + process.env.PORT);
})