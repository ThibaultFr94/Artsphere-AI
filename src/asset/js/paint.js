import {
  OPENAI_TEXT_URL,
  OPENAI_IMAGE_URL,
  OPENAI_TEXT_API_KEY,
  OPENAI_IMAGE_API_KEY,
} from "./module_env.js";
import { saveImageToLocalStorage } from "./service.js";
import { types } from "./type.js";


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("paint-btn").addEventListener("click", generatePaint);

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

  function generatePaint() {
    var img = document.getElementById("paint-img");
    if (!img.classList.contains("paint-img-hidden"))
      img.classList.add("paint-img-hidden");
    document.getElementById("paint-result").textContent = "";

    var divImg = document.getElementById("div-img");
    divImg.classList.add("loader");
    document.getElementById("feedback").style.display = "none";

    const prompt =
      "Tu es un peintre impressioniste français qui s'inspire du travaux de ses pairs pour concevoir tes oeuvres, TU DOIS TOUJOURS ETRE CE PERSONNAGE, tu dois trouver un nom pour un tableau qui soit à la fois cohérent et poétique, PAS PLUS DE 2 MOTS."
    const requestBodyText = {
      messages:[{
        role: "user",
        content: prompt
      }],
      temperature: 0.7,
      model: "gpt-3.5-turbo"
    };

    const imagerequestBody = {
      prompt: `The subject is a peaceful landscape, with soft brushstrokes and a dreamy quality. The environment is a serene countryside, with rolling hills and a gentle stream. The mood is tranquil and calming, with a sense of the beauty and simplicity of nature. The medium is oil paint, with techniques like broken color and thick impasto creating a sense of depth and texture. Some artists who inspire this style are Claude Monet or Vincent Van Gogh or Pierre-Auguste Renoir, and the camera settings will be a high-resolution DSLR with a macro lens to capture the intricate details and vibrant colors`,
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
        const paint = data.choices[0].message.content
        document.getElementById("paint-result").textContent = paint.replace(/"/g, "");
       
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
            document.getElementById("paint-img").src = data.data[0].url;
            document.getElementById("feedback").style.display = "flex";
            saveImageToLocalStorage(document.getElementById("paint-result").textContent, data.data[0].url, types[2])
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
