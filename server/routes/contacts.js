const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET /api/contacts - View all contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/contacts - Submit contact form
router.post('/', async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ message: 'Please provide name, email, and phone' });
    }

    const contact = new Contact({
        name,
        email,
        phone,
        message,
    });

    try {
        const newContact = await contact.save();
        res.status(201).json(newContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /api/contacts/:id - Delete a contact
router.delete('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        await contact.deleteOne();
        res.json({ message: 'Contact deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
