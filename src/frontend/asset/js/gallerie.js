
function init() {
  artSphereApi.ai.list()
    .then((existingImages) => existingImages.json())
    .then((existingImages) => {
      let graff = existingImages.filter((img) => img.type_id === 1);
      let art = existingImages.filter((img) => img.type_id === 2);
      let design = existingImages.filter((img) => img.type_id === 3);

      // if (graff.length > 4) {
      //   graff = shuffle(graff);
      // }
      // if (art.length > 4) {
      //   art = shuffle(art);
      // }
      // if (design.length > 4) {
      //   design = shuffle(design);
      // }

      graff.slice(-4).forEach((element, id) => {
        document.getElementById(`g${id}`).src = `data:image/png;base64,${element.image}`;
      });
      art.slice(-4).forEach((element, id) => {
        document.getElementById(`a${id}`).src = `data:image/png;base64,${element.image}`;
      });
      design.slice(-4).forEach((element, id) => {
        document.getElementById(`d${id}`).src = `data:image/png;base64,${element.image}`;
      });

    });
}

function onClickShuffle(type, letter) {
  const existingImages = JSON.parse(localStorage.getItem("images") || "[]");
  const filterType = shuffle(existingImages.filter((img) => img.type === types[type]));

  filterType.slice(-4).forEach((element, id) => {
    document.getElementById(`${letter}${id}`).src = element.base64;
    console.log(type, letter)
  });
}

init();

document.getElementById("shuffle-graff").addEventListener("click", function () {
  onClickShuffle(1, "g")
});

document.getElementById("shuffle-art").addEventListener("click", function () {
  onClickShuffle(2, "a")
});

document.getElementById("shuffle-design").addEventListener("click", function () {
  onClickShuffle(3, "d")
});

