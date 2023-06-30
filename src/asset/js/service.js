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

export function generatePromptGraff(graff) {
  return `The subject is a graffiti. It's bold, intricate, colorfull. The medium is spray paint, with techniques like stenciling and dripping adding texture and depth. Some artists who inspire this style are Banksy and Shepard Fairey, switch each time, based on this name : ${graff}`
}

export function generatePromptPaint(paint) {
  return `The subject is a peaceful landscape, with soft brushstrokes and a dreamy quality. The environment is a serene countryside, with rolling hills and a gentle stream. The mood is tranquil and calming, with a sense of the beauty and simplicity of nature. The medium is oil paint, with techniques like broken color and thick impasto creating a sense of depth and texture. Some artists who inspire this style are Claude Monet or Vincent Van Gogh or Pierre-Auguste Renoir, and the camera settings will be a high-resolution DSLR with a macro lens to capture the intricate details and vibrant colors, based on this name : ${paint}`
}

export function generatePromptInt(int) {
  return `A beautiful and stylishly designed interior. The subject is a modern living space, with clean lines and a minimalist aesthetic. The environment is a spacious, open-concept apartment, with large windows and natural light. The mood is sophisticated and elegant, with a sense of simplicity and understated luxury. The medium is interior design, with techniques like color blocking and strategic furniture placement creating a sense of flow and harmony. Some interior designers who inspire this style are Kelly Wearstler and Nate Berkus, and the camera settings will be a high-quality DSLR with a wide-angle lens to capture the spaciousness and details of the design, based on this name : ${int}`
}