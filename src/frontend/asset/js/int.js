
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
      "invent an original name for a pixel art inspired by multiple videos games around the world,you can be inspire by all this words :   Radiance, Glitch,  Brawl, Peak, Playbook, Classics, Realm, Sprites,  Prestige,  Rendition, Glyphs, Brilliance, Craft, Paragon, Glimmer, Beacon, Reflection,  Pioneers, Legacy,, Grid,  Resurgence, Cubes,  Prism,  Blossom, Gem,  Pulse, Code Chronicles ,2 words max.";
    artSphereApi.ai.generateText(prompt)
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
        return int;
      })
      .then((int) => {
        artSphereApi.ai.generateImage(3, int, generatePromptInt(int))
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
            document.getElementById(
              "int-img"
            ).src = `data:image/png;base64,${data.data[0].b64_json}`;
            saveImageToLocalStorage(
              document.getElementById("int-result").textContent,
              `data:image/png;base64,${data.data[0].b64_json}`,
              types[3]
            );
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
