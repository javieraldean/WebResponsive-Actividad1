function buildApiUrl(path) {
  const separator = path.includes("?") ? "&" : "?";
  return `${API_BASE_URL}${path}${separator}apidogToken=${APIDOG_TOKEN}`;
}

async function apiRequest(path, options = {}) {
  try {
    const response = await fetch(buildApiUrl(path), options);
    const text = await response.text();
    let data;
    try { data = text ? JSON.parse(text) : null; } 
    catch { data = text; }
    if (!response.ok) { throw new Error(data?.message || "No se pudo obtener la información del servicio."); }
    return data;
  } catch (error) { console.error("API ERROR:", error); throw error; }
}

async function getBooks() {
  const data = await apiRequest("/library/items");
  if (Array.isArray(data)) { return data; }
  if (Array.isArray(data.items)) { return data.items; }
  if (Array.isArray(data.data)) { return data.data; }
  if (Array.isArray(data.results)) { return data.results; }
  return [];
}

async function getBestSellers() {
  const data = await apiRequest("/library/books/best-sellers");
  if (Array.isArray(data)) { return data; }
  if (Array.isArray(data.items)) { return data.items; }
  if (Array.isArray(data.data)) { return data.data; }
  return [];
}

async function getCategories() {
  const data = await apiRequest("/library/categories");
  if (Array.isArray(data)) { return data; }
  if (Array.isArray(data.categories)) { return data.categories; }
  if (Array.isArray(data.data)) { return data.data; }
  return [];
}

async function getBookById(id) {
  return await apiRequest(`/library/items/${id}`);
}

async function createOrder(order) {
  return await apiRequest("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  });
}