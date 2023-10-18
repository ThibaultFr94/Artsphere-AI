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
      "Generate a distinct two-word title for a canvas, channeling the essence of legendary masterpieces. Blend adjectives like ethereal, timeless, evocative, vibrant, haunting, serene, luminous, melancholic, surreal, passionate, muted, radiant, transcendent, bold, dreamy, stark, and introspective with artistic elements or concepts. two words maximum.";

    artSphereApi.ai
      .generateText(prompt)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        const paint = data.choices[0].message.content;
        document.getElementById("paint-result").textContent = paint.replace(
          /"/g,
          ""
        );
        return paint;
      })
      .catch((error) => {
        console.error(error);
        alert(error);
      })
      .then((paint) => {
        artSphereApi.ai
          .generateImage(2, paint, generatePromptPaint(paint))
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
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
