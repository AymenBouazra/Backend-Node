const mongoose = require('mongoose');
const user = mongoose.Schema({
    firstName: String,
    lastName: String,
    email:  String,
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('user',user);