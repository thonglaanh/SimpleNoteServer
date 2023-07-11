const mongooes = require('mongoose')
async function connect() {
    try {
        await mongooes.connect('mongodb://127.0.0.1:27017/projectNote');
        console.log('Connect mongodb success')
    } catch (error) {
        console.log('Connect mongodb failer')
    }
}
module.exports = { connect };

