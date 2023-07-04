import { types } from "./type.js";
import { shuffle } from "./service.js";

function init() {
  const existingImages = JSON.parse(localStorage.getItem("images") || "[]");

  let graff = existingImages.filter((img) => img.type === types[1]);
  let art = existingImages.filter((img) => img.type === types[2]);
  let design = existingImages.filter((img) => img.type === types[3]);

  if(graff.length > 4){
    graff = shuffle(graff);
  }
  if(art.length > 4){
    art = shuffle(art);
  }
  if(design.length > 4){
    design = shuffle(design);
  }
  graff.slice(-4).forEach((element, id) => {
    document.getElementById(`g${id}`).src = element.base64;
  });
  art.slice(-4).forEach((element, id) => {
    document.getElementById(`a${id}`).src = element.base64;
  });
  design.slice(-4).forEach((element, id) => {
    document.getElementById(`d${id}`).src = element.base64;
  });
}

init();

document.getElementById('shuffle').addEventListener('click', init);
