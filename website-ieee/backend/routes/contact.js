const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

// Submit contact form
router.post('/', async (req, res) => {
    const message = new ContactMessage(req.body);
    try {
        const newMessage = await message.save();
        res.status(201).json({ message: "Message received", data: newMessage });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
