const mongoose = require('mongoose');
const event = mongoose.Schema({
    eventName: String,
    eventDescription: String,
    startDate: Date,
    endDate: Date,
    startTime: Date,
    endTime: Date,
    photo: String,
    price: String,
    availableTicketNumber: Number,
    eventType: String,
    location: String,
    tags:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "tag"
        }
    ]
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('event',event);