const mongoose = require('mongoose');
const reservation = mongoose.Schema({
    firstName: String,
    lastName: String,
    email:  String,
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('reservation',reservation);