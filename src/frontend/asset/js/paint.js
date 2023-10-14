
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
      "Invent a name for a painting inspired by great paintings of great painters, 2 words max.";
      artSphereApi.ai.generateText(prompt)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const paint = data.choices[0].message.content;
        document.getElementById("paint-result").textContent = paint.replace(
          /"/g,
          ""
        );
        return paint;
      })
        .then((paint) => {
          artSphereApi.ai.generateImage(2, paint, generatePromptPaint(paint))
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
            document.getElementById(
              "paint-img"
            ).src = `data:image/png;base64,${data.data[0].b64_json}`;
            saveImageToLocalStorage(
              document.getElementById("paint-result").textContent,
              `data:image/png;base64,${data.data[0].b64_json}`,
              types[2]
            );
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
