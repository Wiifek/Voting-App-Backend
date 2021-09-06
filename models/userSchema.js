const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String },
        password: { type: String },
        address: { type: String },
        phone: { type: String },
        pollsTopics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Poll' }],
        pollsVoted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Poll' }]
    }, {
    timestamps: true,
    versionKey: false
}
);

module.exports = mongoose.model('User', userSchema)