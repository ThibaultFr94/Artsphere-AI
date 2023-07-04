import {
  OPENAI_TEXT_URL,
  OPENAI_IMAGE_URL,
  OPENAI_TEXT_API_KEY,
  OPENAI_IMAGE_API_KEY,
} from "./module_env.js";
import { generatePromptPaint, saveImageToLocalStorage, imagerequestBody } from "./service.js";
import { types } from "./type.js";


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("paint-btn").addEventListener("click", generatePaint);

  function generatePaint() {
    let img = document.getElementById("paint-img");
    if (!img.classList.contains("paint-img-hidden"))
      img.classList.add("paint-img-hidden");
    document.getElementById("paint-result").textContent = "";

    let divImg = document.getElementById("div-img");
    divImg.classList.add("loader");
   

    const prompt =
      "Invent a name for a painting inspired by great paintings of this century "
    const requestBodyText = {
      messages:[{
        role: "user",
        content: prompt
      }],
      temperature: 0.7,
      model: "gpt-3.5-turbo"
    };

    fetch(OPENAI_TEXT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_TEXT_API_KEY}`,
      },
      body: JSON.stringify(requestBodyText),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const paint = data.choices[0].message.content
        document.getElementById("paint-result").textContent = paint.replace(/"/g, "");
       
        imagerequestBody.prompt = generatePromptPaint(paint);
        return paint;
      })
      .then((paint) => {
        fetch(OPENAI_IMAGE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_IMAGE_API_KEY}`,
          },
          body: JSON.stringify(imagerequestBody),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            divImg.classList.remove("loader");
            img.classList.remove("paint-img-hidden");
            img.classList.add("paint-img-visible");
            document.getElementById("paint-img").src = `data:image/png;base64,${data.data[0].b64_json}`;
            saveImageToLocalStorage(document.getElementById("paint-result").textContent, `data:image/png;base64,${data.data[0].b64_json}`, types[2])
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
