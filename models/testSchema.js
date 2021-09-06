const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestSchema = new Schema({
    expire_at: {type: Date, default: Date.now, expires: 86400} 
})

module.exports = mongoose.model('Test', TestSchema)