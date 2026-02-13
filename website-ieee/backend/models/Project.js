const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, enum: ['Hardware', 'Software', 'Research'], required: true },
    teamMembers: [{ type: String }],
    description: { type: String },
    technologies: [{ type: String }],
    image: { type: String },
    githubLink: { type: String },
    demoLink: { type: String },
    isFeatured: { type: Boolean, default: false }
});

module.exports = mongoose.model('Project', ProjectSchema);
