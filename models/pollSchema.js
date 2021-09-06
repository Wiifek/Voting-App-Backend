const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
    option: String,
    votes: {
        type: Number,
        default: 0
    }
});

const pollSchema = new Schema({
    title: { type: String },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    options: [optionSchema],
    voted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    created: {
        type: Date,
        default: Date.now
    }

}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Poll', pollSchema)