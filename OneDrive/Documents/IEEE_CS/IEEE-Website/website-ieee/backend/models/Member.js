const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true }, // e.g., 'Chair', 'Member', 'Secretary'
    isExecutive: { type: Boolean, default: false },
    department: { type: String },
    year: { type: String },
    email: { type: String },
    linkedin: { type: String },
    image: { type: String },
    bio: { type: String }
});

module.exports = mongoose.model('Member', MemberSchema);
