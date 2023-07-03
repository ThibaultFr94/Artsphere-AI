import {
  OPENAI_TEXT_URL,
  OPENAI_IMAGE_URL,
  OPENAI_TEXT_API_KEY,
  OPENAI_IMAGE_API_KEY,
} from "./module_env.js";
import { generatePromptGraff, saveImageToLocalStorage } from "./service.js";
import { types } from "./type.js";

const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

let cursor = {
  x: null,
  y: null,
};

canvas.addEventListener("mousemove", function (e) {
  cursor.x = e.x;
  cursor.y = e.y;
});

let particlesArray;
let mouse = {
  x: null,
  y: null,
  radius: (canvas.height / 70) * (canvas.width / 70) * 0.2,
};

window.addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  mouse.radius = 0.5;
});

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }
  draw() {
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.size
    );

    gradient.addColorStop(0, "#86bef6");
    gradient.addColorStop(0.2, "#6db5fe");
    gradient.addColorStop(0.6, "#49a4ff");
    gradient.addColorStop(1, "#1a8cff");

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = gradient;
    ctx.fill();
  }
  update() {
    let button = document.getElementById("graff-btn");
    let buttonRect = button.getBoundingClientRect();
    if (
      this.x > buttonRect.left &&
      this.x < buttonRect.right &&
      this.y > buttonRect.top &&
      this.y < buttonRect.bottom
    ) {
      this.directionX = -this.directionX;
      this.directionY = -this.directionY;
    }
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.directionY = -this.directionY;
    }
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;

    const maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    if (distance < mouse.radius + this.size) {
      this.x -= forceDirectionX * force * 100;
      this.y -= forceDirectionY * force * 100;
    } else {
      this.x += this.directionX;
      this.y += this.directionY;
    }
    let directionX = forceDirectionX * force * this.size;
    let directionY = forceDirectionY * force * this.size;

    if (distance < mouse.radius + this.size) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      this.x += this.directionX;
      this.y += this.directionY;
    }

    this.draw();
  }
}
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
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  particlesArray.map(item =>{
    item.update();
  })
}

init();
animate();

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
      "invent a name for a graffiti inspired by street art around the world";
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
      response_format: "b64_json"
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
            document.getElementById("graff-img").src = `data:image/png;base64,${data.data[0].b64_json}`;
            saveImageToLocalStorage(document.getElementById("graff-result").textContent, `data:image/png;base64,${data.data[0].b64_json}`, types[1])
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});

