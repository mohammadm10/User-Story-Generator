import express from 'express';
import fetch from 'isomorphic-fetch';
import { config } from './config';

const app = express();
const port = 5000;

app.get('/api/:input', async (req, res) => {

  const input = req.params.input;
  const prompt = `Please provide me a user story in the Given, When, Then format for this requirement: ${input}`;
  const apiKey = config.apiKey
  const model = 'gpt-3.5-turbo';

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: prompt }],
      }),
    });

    const data = await response.json();
    console.log('API Response:', data);

    if (data.choices && data.choices.length > 0) {
      const message = data.choices[0].message.content.trim();
      res.setHeader('Content-Type', 'application/json');
      res.json({ message });
    } else {
      res.status(500).json({ error: 'Unexpected response from OpenAI API' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
