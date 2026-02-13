const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String },
    location: { type: String },
    description: { type: String },
    type: { type: String, enum: ['Workshop', 'Seminar', 'Competition', 'Social'], default: 'Workshop' },
    image: { type: String }, // URL or placeholder identifier
    registrationLink: { type: String }
});

module.exports = mongoose.model('Event', EventSchema);
