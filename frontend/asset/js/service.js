export async function saveImageToLocalStorage(promptResult, b64_json, type) {
  const existingImages = JSON.parse(localStorage.getItem("images") || "[]");
  existingImages.push({
    type: type,
    promptResult: promptResult,
    base64: b64_json,
  });
  localStorage.setItem("images", JSON.stringify(existingImages));
}

export function shuffle(arr) {
  return Array(arr.length)
    .fill(null)
    .map((_, i) => [Math.random(), i])
    .sort(([a], [b]) => a - b)
    .map(([, i]) => arr[i]);
}

export function shuffleNorman(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function generatePromptGraff(graff) {
  return `The subject is a graffiti. It's bold, intricate, colorfull. The medium is spray paint, with techniques like stenciling and dripping adding texture and depth. Some artists who inspire this style are Banksy and Shepard Fairey, switch each time, based on this name : ${graff}`;
}

export function generatePromptPaint(paint) {
  return `The subject will be a painting art. a beautiful landscape, amazing color ,using the style of Edouard Manet,  Rembrandt Harmenszoon van Rijn.  ${paint} is his name`;
}

export function generatePromptInt(int) {
  return `Let's create a pixel art. The subject includes  a variety of pixel art style. The environment is a sunny day with a clear blue sky. The mood is peaceful, tranquil, and calming. The artistic medium is pixel art, using warm and natural colors to bring out the beauty of the forest. Techniques include layering, shading, and perspective. The inspiration comes from the works of Mark Ferrari, Kyle Fewell, and the pixel art movement. Camera type is not applicable.${int}`;
}

export const imagerequestBody = {
  prompt: "",
  n: 1,
  size: "256x256",
  response_format: "b64_json",
};