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
      "Craft a unique pixel art name drawing inspiration from global video games. Blend elements from words like Radiance, Glitch, Brawl, Peak, Playbook, Classics, Realm, Sprites, Prestige, Rendition, Glyphs, Brilliance, Craft, Glimmer, Beacon, Reflection, Pioneers, Legacy, Grid, Resurgence, Cubes, Prism, Blossom, Gem, Pulse, Code, and Chronicles. Limit is 2 words.";

    artSphereApi.ai
      .generateText(prompt)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        const int = data.choices[0].message.content;
        document.getElementById("int-result").textContent = int.replace(
          /"/g,
          ""
        );
        return int;
      })
      .catch((error) => {
        console.error(error);
        alert(error);
      })
      .then((int) => {
        artSphereApi.ai
          .generateImage(3, int, generatePromptInt(int))
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
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
