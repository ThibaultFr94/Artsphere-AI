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
      "invent an original SHORT name for a graffiti inspired by multiple street art around the world,choose randomly and mix 2 words in this list :  Alleys, Pulse, Atlas, Mural,  Spectrum,  Unity, Global Graff, Wall Wanderlust, Symphony, Tagged Tapestry, Vivid Voyage, Cosmic Canvas, Alley Anthology, Spray Saga, World Walls, Glimpses, Painted Planet,  Odyssey,Stories.";
    
artSphereApi.ai.generateText(prompt)
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
        return graff;
      })
      .then((graff) => {

        artSphereApi.ai.generateImage(1, graff,generatePromptGraff(graff))
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
