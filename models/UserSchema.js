const mongoose = require('mongoose');
const user = mongoose.Schema({
    firstName: String,
    lastName: String,
    email:  String,
    reservations:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "reservation"
        }
    ]
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('user',user);