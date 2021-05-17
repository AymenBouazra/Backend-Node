const mongoose = require('mongoose');
const path = require('path')

const reservation = mongoose.Schema({
    reservedfName: String,
    reservedlName: String,
    reservedEmail: String,
    
    directory: {type : String , default : path.resolve('./tickets')}
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('reservation',reservation);