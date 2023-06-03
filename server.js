// Import necessary modules
const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// Initialize express app
const PORT = process.env.PORT || 1337;
const app = express();

// Configure and initialize OpenAI API
const openaiConfiguration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(openaiConfiguration);

// Apply middleware for CORS, logging, serving static files, and parsing JSON
app.use(cors());
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.json());

// Define endpoint for generating text with OpenAI API
// POST /api/completion
app.post('/api/completion', async (req, res) => {
  // Extract the prompt from the request body
  const prompt = req.body.prompt;

  // Define the messages array with a single user message containing the prompt
  // note: to add a system message, add another object to the array with role: 'assistant' before the `user` message.
  const messages = [{ role: 'user', content: prompt }];

  // Call the OpenAI API to create a chat completion
  const response = await openai.createChatCompletion({
    model: 'gpt-4', // specify the model to use
    messages,
    max_tokens: 150, // limit the response to an amount of tokens
    n: 1, // specify number of completions to generate
    temperature: 1, // control the randomness of the output, range of 0-2 where 2 is most random
  });

  // Extract the completion from the response data
  const { choices } = response.data;
  const { message } = choices[0];

  // Respond to the client with the generated message
  res.json({ message });
});

// Example of what the response from OpenAI looks like, with a user message of "hey!"
/*
  response.data = {
    id: 'chatcmpl-12345ABCDEF',
    object: 'chat.completion',
    created: 1685751608,
    model: 'gpt-4-0314',
    usage: {
      prompt_tokens: 9,
      completion_tokens: 9,
      total_tokens: 18 
    },
    choices: [
      {
        message: {
          role: 'assistant',
          content: 'Hello! How can I help you today?'
        },
        finish_reason: 'stop',
        index: 0
      }
    ]
  }
*/

// Start the server and log the port it is running on
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
