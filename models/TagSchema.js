const mongoose = require('mongoose');
const tag = mongoose.Schema({
    title: String,
    description: String,
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('tag',tag);