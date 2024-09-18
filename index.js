
require('dotenv').config();
const express = require('express');


console.log('API Key:', process.env.OPENAI_API_KEY);
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('ScoutNSend Backend is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Import and use the scouter routes
const scouterRoutes = require('./routes/scouter');  // Adjust the path if needed
app.use('/scouter', scouterRoutes);
