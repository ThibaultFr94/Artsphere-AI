import {
  OPENAI_TEXT_URL,
  OPENAI_IMAGE_URL,
  OPENAI_TEXT_API_KEY,
  OPENAI_IMAGE_API_KEY,
} from "./module_env.js";
import {
  generatePromptGraff,
  saveImageToLocalStorage,
  imagerequestBody,
} from "./service.js";
import { types } from "./type.js";

function init() {
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 4000;
  for (let i = 0; i < numberOfParticles * 2; i++) {
    let size = Math.random() * 1 + 1;
    let x = Math.random() * (innerWidth - size * 1) + size;
    let y = Math.random() * innerHeight;
    let directionX = Math.random() * 5 - 2.5;
    let directionY = Math.random() * 5 - 2.5;
    let color = "#8C5523";

    particlesArray.push(
      new Particle(x, y, directionX, directionY, size, color)
    );
  }
}



document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("graff-btn").addEventListener("click", generateGraff);

  function generateGraff() {
    let img = document.getElementById("graff-img");
    if (!img.classList.contains("graff-img-hidden"))
      img.classList.add("graff-img-hidden");
    document.getElementById("graff-result").textContent = "";

    let divImg = document.getElementById("div-img");
    divImg.classList.add("loader");

    const prompt =
      "invent an original name for a graffiti inspired by multiple street art around the world,mix Echoed Alleys, Painted Pulse, Artful Atlas, Mural Mingle, Spray Spectrum, Urban Unity, Global Graff, Wall Wanderlust, Street Symphony, Tagged Tapestry, Vivid Voyage, Metro Mural, Cosmic Canvas, Alley Anthology, Spray Saga, World Walls, Global Glimpses, Painted Planet, Urban Odyssey, Street Stories.2 words max";
    const requestBodyText = {
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      model: "gpt-4",
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
        const graff = data.choices[0].message.content;
        document.getElementById("graff-result").textContent = graff.replace(
          /"/g,
          ""
        );
        imagerequestBody.prompt = generatePromptGraff(graff);
        return graff;
      })
      .then((graff) => {
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
            img.classList.remove("graff-img-hidden");
            img.classList.add("graff-img-visible");
            document.getElementById(
              "graff-img"
            ).src = `data:image/png;base64,${data.data[0].b64_json}`;
            saveImageToLocalStorage(
              document.getElementById("graff-result").textContent,
              `data:image/png;base64,${data.data[0].b64_json}`,
              types[1]
            );
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
