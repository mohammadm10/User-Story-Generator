import fetch from 'isomorphic-fetch';

export default async function API (input: string) {

    const prompt = `Please provide me a user story in the Given, When, Then format for this requirement: ${input}`;
    const apiKey = process.env.REACT_APP_API_KEY
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
        return message;
      }
  
    } catch (error) {
      console.error('An error has occured: ' + error);
    }
}