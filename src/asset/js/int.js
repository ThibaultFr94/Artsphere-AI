import {
  OPENAI_TEXT_URL,
  OPENAI_IMAGE_URL,
  OPENAI_TEXT_API_KEY,
  OPENAI_IMAGE_API_KEY,
} from "./module_env.js";
import { generatePromptInt, saveImageToLocalStorage } from "./service.js";
import { types } from "./type.js";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("int-btn").addEventListener("click", generateInt);


  function generateInt() {
    let img = document.getElementById("int-img");
    if (!img.classList.contains("int-img-hidden"))
      img.classList.add("int-img-hidden");
    document.getElementById("int-result").textContent = "";

    let divImg = document.getElementById("div-img");
    divImg.classList.add("loader");

    const prompt =
      "You are an interior designer , invent a short name for an interior design  Modernism, Frank Lloyd Wright, Arthur Elrod, I. M. Pei, John Lautner ";
    const requestBodyText = {
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      model: "gpt-3.5-turbo",
    };

    const imagerequestBody = {
      prompt: "",
      n: 1,
      size: "256x256",
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
        const int = data.choices[0].message.content;
        document.getElementById("int-result").textContent = int.replace(
          /"/g,
          ""
        );
        imagerequestBody.prompt = generatePromptInt(int);
        return int;
      })
      .then((int) => {
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
            img.classList.remove("int-img-hidden");
            img.classList.add("int-img-visible");
            document.getElementById("int-img").src = data.data[0].url;
            saveImageToLocalStorage(document.getElementById("int-result").textContent, data.data[0].url, types[3])
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
