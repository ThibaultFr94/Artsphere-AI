import {
  OPENAI_TEXT_URL,
  OPENAI_IMAGE_URL,
  OPENAI_TEXT_API_KEY,
  OPENAI_IMAGE_API_KEY,
} from "./module_env.js";
import { saveImageToLocalStorage } from "./service.js";
import { types } from "./type.js";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("int-btn").addEventListener("click", generateInt);

  let stars = document.querySelectorAll(".star");
  let rating = 0;
  for (let i = 0; i < stars.length; i++) {
    stars[i].addEventListener("click", function () {
      console.log("Star " + (i + 1) + " clicked!");
      rating = i + 1;

      for (let j = 0; j < stars.length; j++) {
        if (j < rating) {
          stars[j].classList.add("highlight");
        } else {
          stars[j].classList.remove("highlight");
        }
      }
      document
        .getElementById("submit-feedback")
        .addEventListener("click", submitFeedback);
      submitFeedback();
    });
  }

  function generateInt() {
    let img = document.getElementById("int-img");
    if (!img.classList.contains("int-img-hidden"))
      img.classList.add("int-img-hidden");
    document.getElementById("int-result").textContent = "";

    let divImg = document.getElementById("div-img");
    divImg.classList.add("loader");
    document.getElementById("feedback").style.display = "none";

    const prompt =
      "Tu es un designer pour décoration d'intérieur , tu dois trouver un nom pour une décoration d'interieure, PAS PLUS DE 2 MOTS.";
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
      prompt: `A beautiful and stylishly designed interior. The subject is a modern living space, with clean lines and a minimalist aesthetic. The environment is a spacious, open-concept apartment, with large windows and natural light. The mood is sophisticated and elegant, with a sense of simplicity and understated luxury. The medium is interior design, with techniques like color blocking and strategic furniture placement creating a sense of flow and harmony. Some interior designers who inspire this style are Kelly Wearstler and Nate Berkus, and the camera settings will be a high-quality DSLR with a wide-angle lens to capture the spaciousness and details of the design, based on ${int} name`,
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
        imagerequestBody.prompt = generatePrompt(int);
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
            document.getElementById("feedback").style.display = "flex";
            saveImageToLocalStorage(document.getElementById("int-result").textContent, data.data[0].url, types[3])
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  function submitFeedback() {
    let feedback = document.getElementById("comment").value;
    document.getElementById("feedback").style.display = "none";
    if (rating > 0) {
      console.log("Note : " + rating + ", Feedback : " + feedback);
    }
  }
});
