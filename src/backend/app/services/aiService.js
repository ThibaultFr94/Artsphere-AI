import artRepository from '../sql/artRepository.js';
(await import('dotenv')).config();

async function getPendingTimeMinutes(currentUser) {   
  if(currentUser.authenticated) {
    return true;
  }
  else {
    const currentDate = new Date();
    const lastGenerated = await artRepository.getLastGeneratedDate(currentUser.ip);
    if(!lastGenerated) {
      return true;
    }
    const generatedDate = new Date(lastGenerated.generation_date);
    const minuteDelay = (currentDate - generatedDate) / 60_000;
    return minuteDelay > 5 ? 0 : 5 - minuteDelay;
  }
}

const aiService = {
  generateText: async (prompt, currentUser) => {
    const pendingTime = await getPendingTimeMinutes(currentUser);
    if(pendingTime > 0) {
      throw new Error(`Too many requests, pending ${pendingTime} min`);
    }
    else {
      const response = await fetch(process.env.OPENAI_TEXT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_TEXT_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          temperature: 0.7,
          messages: [ {role: "user", content: prompt, } ],
        })
      });
      return await response.json();
    }
  },

  generateImage: async (typeId, title, prompt, currentUser) => {
    const pendingTime = await getPendingTimeMinutes(currentUser);
    if(pendingTime) {
      throw new Error(`Too many requests, pending ${pendingTime} min`);
    }
    else {
      const response = await fetch(process.env.OPENAI_IMAGE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_IMAGE_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          n: 1,
          size: "512x512",
          response_format: "b64_json",
        })
      })
      const image = await response.json();
      const b64 = image.data[0].b64_json;
      if(image.data[0].b64_json) {
        await artRepository.create(
          currentUser.id || null,
          currentUser.ip || null,
          title || null,
          b64 || null,
          typeId || null,
          new Date());
      }
      return image;
    }
  }
    
}

export default aiService;