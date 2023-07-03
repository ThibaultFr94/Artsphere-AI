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
  return `The subject will be an impressionist art. The medium is acrylic paint,  We will use a Van Gogh-inspired color palette, with colorfull pattern ,using the style of Edouard Manet, Gustav Klimt and Rembrandt. We will focus on capturing the essence of the name : ${paint}`
}

export function generatePromptInt(int) {
  return `A beautiful and stylishly designed interior.For the interior design wide angle, we can use the name "Designscape" to capture the broad scope of the project. We'll use a combination of Claymotion and Unreal Engine to create a stunning 3D rendering that brings the space to life.

  In terms of design style, we can incorporate elements of modernism, inspired by the work of Frank Lloyd Wright, I. M. Pei, and John Lautner, as well as the iconic Palm Springs aesthetic of Arthur Elrod. By blending these styles, we can create a unique and timeless design that is both functional and beautiful, based on this name : ${int}`
}