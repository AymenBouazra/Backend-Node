const mongoose = require('mongoose');
const tag = mongoose.Schema({
    title: String,
    Description: String,
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('tag',tag);