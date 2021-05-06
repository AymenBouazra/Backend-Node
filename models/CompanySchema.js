const mongoose = require('mongoose');
const company = mongoose.Schema({
    companyName: String,
    companyDescription: String,
    email: String,
    password: String,
    role: {type: String, default: 'Admin'},
    photo:{type: String, default:'http://localhost:3000/uploads/1620218385328.png'},
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