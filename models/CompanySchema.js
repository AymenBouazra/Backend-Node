const mongoose = require('mongoose');
const company = mongoose.Schema({
    companyName: String,
    companyDescription: String,
    email: String,
    password: String,
    role: {type: String, default: 'Admin'},
    photo: String,
    events:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "event"
        }
    ]
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('company',company);