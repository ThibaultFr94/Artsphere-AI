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
      "Inspired by diverse street art globally, craft a unique, concise graffiti name. Combine and morph elements from two randomly selected words: Alleys, Pulse, Atlas, Mural, Spectrum, Unity, Global, Graff, Wall, Wanderlust, Symphony, Tagged, Tapestry, Vivid, Voyage, Cosmic, Canvas, Alley, Anthology, Spray, Saga, World, Walls, Glimpses, Painted, Planet, Odyssey, Stories. Be creative!";

    artSphereApi.ai
      .generateText(prompt)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        const graff = data.choices[0].message.content;
        document.getElementById("graff-result").textContent = graff.replace(
          /"/g,
          ""
        );
        return graff;
      })
      .catch((error) => {
        console.error(error);
        alert(error);
      })
      .then((graff) => {
        artSphereApi.ai
          .generateImage(1, graff, generatePromptGraff(graff))
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
          });
      });
  }
});
