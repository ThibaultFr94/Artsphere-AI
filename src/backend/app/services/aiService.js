
(await import('dotenv')).config();

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.OPENAI_TEXT_API_KEY}`,
};

const aiService = {
  generateText: (prompt, currentUser) => 
    !currentUser || !currentUser.gptVersion
      ? Promise.reject("User do not have access to a GPT version")
      : fetch(process.env.OPENAI_TEXT_URL, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            model: currentUser.gptVersion,
            temperature: 0.7,
            messages: [ {role: "user", content: prompt, } ],
          })
      }),

  generateImage: (prompt) => 
    !currentUser || !currentUser.gptVersion
      ? Promise.reject("User do not have access to a GPT version")
      : fetch(process.env.OPENAI_IMAGE_URL, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            prompt: prompt,
            n: 1,
            size: "256x256",
            response_format: "b64_json",
          })
        })
}

export default aiService;