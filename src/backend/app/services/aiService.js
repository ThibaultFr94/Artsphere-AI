
(await import('dotenv')).config();

function headers(apiKey) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  }
}

const aiService = {
  generateText: (prompt) => 
    fetch(process.env.OPENAI_TEXT_URL, {
      method: "POST",
      headers: headers(process.env.OPENAI_TEXT_API_KEY),
      body: JSON.stringify({
        model: "gpt-4",
        temperature: 0.7,
        messages: [ {role: "user", content: prompt, } ],
      })
    }),

  generateImage: (prompt) => 
    fetch(process.env.OPENAI_IMAGE_URL, {
      method: "POST",
      headers: headers(process.env.OPENAI_IMAGE_API_KEY),
      body: JSON.stringify({
        prompt: prompt,
        n: 1,
        size: "256x256",
        response_format: "b64_json",
      })
    })
}

export default aiService;