export async function saveImageToLocalStorage(promptResult, b64_json, type) {
    // On récupére les images déjà enregistrées 
    const existingImages = JSON.parse(localStorage.getItem('images') || '[]');
    // On ajoute la nouvelle image
    existingImages.push({ type: type, promptResult: promptResult, base64: b64_json});
    // On enregistre les images 
    localStorage.setItem('images', JSON.stringify(existingImages));
  }


export function shuffle(arr) {
  return Array(arr.length).fill(null)
      .map((_, i) => [Math.random(), i])
      .sort(([a], [b]) => a - b)
      .map(([, i]) => arr[i])
}


export function shuffleNorman(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}