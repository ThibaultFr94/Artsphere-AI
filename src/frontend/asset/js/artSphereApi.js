// Interactions avec l'API Artsphere et Définitions des Types par section

const types = {
  1: "section graff",
  2: "section art",
  3: "section design",
};

// Parametrage de la fonction fetch
function fetchApi(method, urlPath, body) {
  return fetch(`${ArtsphereApiUrl}/${urlPath}`, {
    method: method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("artsphere-token")}`,
    },
  });
}

// 
const artSphereApi = {
  ai: {
    generateText: (prompt) => fetchApi("GET", `ai/generateText/${prompt}`),

    generateImage: (typeId, title, prompt) =>
      fetchApi("POST", `ai/generateImage`, { typeId, title, prompt }),

    list: () => fetchApi("GET", `ai/list`),
  },

  users: {
    register: (email, password) =>
      fetchApi("POST", `users/register`, { email, password }),

    login: (email, password) =>
      fetchApi("POST", `users/login`, { email, password })
        .then((response) => response.json())
        .then((json) => {
          localStorage.setItem("artsphere-token", json.token);
          localStorage.setItem("artsphere-username", json.username);
        }),

    currentUser: () =>
      fetchApi("GET", `users/current`).then((response) => response.json()),
  },
};
