const express = require('express');
const router = express.Router();
const { ClientData } = require('../models');
const { OpenAI } = require('openai');  // Correct import

// Initialize OpenAI API with the key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Make sure your API key is in .env
});

// Route to create a new client entry (Scouter adds data)
router.post('/add-client', async (req, res) => {
  const { name, industry, message, email, scouterId } = req.body;
  if (!name || !industry || !message || !email || !scouterId) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newClient = await ClientData.create({
      name,
      industry,
      message,
      email,
      scouterId
    });
    res.status(201).json(newClient);
  } catch (error) {
    console.error('Error creating client data:', error);
    res.status(500).json({ error: 'Unable to create client data' });
  }
});

// Route to get all client data (Senders view data)
router.get('/clients', async (req, res) => {
  try {
    const clients = await ClientData.findAll();
    if (clients.length === 0) {
      return res.status(404).json({ message: 'No client data found' });
    }
    res.json(clients);
  } catch (error) {
    console.error('Error retrieving client data:', error);
    res.status(500).json({ error: 'Unable to retrieve client data' });
  }
});

// Route to enhance message using GPT
router.post('/enhance-message', async (req, res) => {
    const { message } = req.body;
  
    if (!message) {
      return res.status(400).json({ error: 'Message content is required' });
    }
  
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",  // You can replace with "gpt-4o-mini" or another model
        messages: [{ role: "user", content: `Improve this email message: ${message}` }],
        max_tokens: 100,
      });
  
      const enhancedMessage = response.choices[0].message.content.trim();
      res.json({ enhancedMessage });
    } catch (error) {
      console.error('Error enhancing message:', error);
      res.status(500).json({ error: 'Unable to enhance message' });
    }
  });
  

module.exports = router;
