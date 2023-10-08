// todo injection de vite_api


function fetchApi(method, urlPath, body) {
  return fetch(`http://localhost:3000/${urlPath}`, {
    method: method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("artsphere-token")}`
    }
  })
}

export const artSphereApi = {
  ai: {
    generateText: (prompt) =>
      fetchApi('GET', `ai/generateText/${prompt}`),

    generateImage: (prompt) =>
      fetchApi('GET', `ai/generateImage/${prompt}`),
  },

  users: {
    list: () =>
      fetchApi('GET', `users/list`)
        .then(response => response.json()),

    register: (email, password) =>
      fetchApi('POST', `users/register`, { email, password }),

    login: (email, password) =>
      fetchApi('POST', `users/login`, { email, password })
        .then(response => response.json())
        .then(json => localStorage.setItem("artsphere-token", json.token)),

    currentUser: () =>
      fetchApi('GET', `users/current`)
        .then(response => response.json())
  }
}