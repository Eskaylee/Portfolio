const express = require('express');
const router = express.Router();
let controller = require('./controller');

router.post('/', async (req, res) => {
    try {
        let { name, email, message } = req.body; 

        let createMessage = await controller.sendMessage(name, email, message); 
        if (createMessage.error === false) {
            console.log(`${createMessage.data} sent from backend to frontend`);
            res.status(200).json(createMessage);
        } else {
            console.log(`Error sending message from backend to frontend`);
            res.status(400).json({ error: true,
            message: 'Error sending message from backend to frontend or maybe turn on your data' });
        }
    } catch (error) {
        console.log(`Error occurred at the server on our end: ${error.message}`);
        res.status(500).json({ error: true, message: 'Error occurred at the server on our end' });
    }
});

module.exports = router;
