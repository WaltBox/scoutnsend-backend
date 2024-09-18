require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Ensure this is correctly set in .env
});

(async () => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // Use gpt-3.5-turbo or gpt-4o-mini
      messages: [{ role: "user", content: "Hello world!" }],
      max_tokens: 50,
    });

    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error("Error: ", error);
  }
})();
