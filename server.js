const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();
const openaiConfiguration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(openaiConfiguration);

// Enable CORS for all routes
app.use(cors());

// Log all requests
app.use(morgan('tiny'));

// Serve static files from the "public" directory
app.use(express.static('public'));
app.use(express.json());

app.get('/api/completion', async (req, res) => {
  const prompt = req.body.prompt;
  const messages = [{ role: 'user', content: prompt }];
  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages,
    maxTokens: 150,
    n: 1,
    temperature: 1,
  });
  res.json(response.data.choices[0].text.trim());
});

const PORT = process.env.PORT || 1337;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));