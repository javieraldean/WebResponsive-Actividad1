// ===========================================================================
// Integrantes:
//	- Aguayo Caseres Stteffano 
//	- Aldean Morales Walter Javier 
// ===========================================================================

const BASE_URL = "https://mock.apidog.com/m1/1264304-1262085-default";
const APIDOG_TOKEN = "x7cyHy9uUKRiTeuFTasKuKM1qkDllGsN";

// ===========================================================================
// Generic methods
// ===========================================================================

function buildUrl(path) {
  const separator = path.includes("?") ? "&" : "?";
  return `${BASE_URL}${path}${separator}apidogToken=${APIDOG_TOKEN}`;
}

async function request(path, options = {}) {
  try {
    const response = await fetch(buildUrl(path), options);
    const text = await response.text();
    let data;
    try { data = text ? JSON.parse(text) : null; } 
    catch { data = text; }
    return { status: response.status, ok: response.ok, data };
  } catch (error) {
    return { status: 0, ok: false, data: { message: error.message } };
  }
}

function printResult(title, result) {
  console.log(`\n=== ${title} ===`);
  console.log("Status:", result.status);
  console.log("OK:", result.ok);
  console.log("Response:");
  console.dir(result.data, { depth: null });
}

// ===========================================================================
// Service → healthcheck
// ===========================================================================

async function testHealth() {
  const result = await request("/health");
  printResult("GET /health", result);
}

// ===========================================================================
// Service → auth & users
// ===========================================================================

async function testLogin() {
  const result = await request("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: "user@nexus.com",
      password: "123456"
    })
  });

  printResult("POST /auth/login", result);
}

async function testUserDetailSuccess() {
  const result = await request("/users/1");
  printResult("GET /users/1", result);
}

async function testUserDetailNotFound() {
  const result = await request("/users/101");
  printResult("GET /users/101", result);
}

// ===========================================================================
// Service → landing & library
// ===========================================================================

async function testLibraryLanding() {
  const result = await request("/library/landing");
  printResult("GET /library/landing", result);
}

async function testBestSellers() {
  const result = await request("/library/books/best-sellers");
  printResult("GET /library/books/best-sellers", result);
}

async function testCategories() {
  const result = await request("/library/categories");
  printResult("GET /library/categories", result);
}

async function testLibraryItems() {
  const result = await request("/library/items");
  printResult("GET /library/items", result);
}

async function testLibraryItemsWithFilters() {
  const result = await request(
    "/library/items?category=Tecnologia&year=2024&type=book&search=react"
  );
  printResult("GET /library/items?category=Tecnologia&year=2024&type=book&search=react con filtros", result);
}

async function testLibraryItemDetailSuccess() {
  const result = await request("/library/items/1");
  printResult("GET /library/items/1", result);
}

async function testLibraryItemDetailNotFound() {
  const result = await request("/library/items/2");
  printResult("GET /library/items/2 (404 esperado)", result);
}

// ===========================================================================
// Service → purchases & orders
// ===========================================================================

async function testUserPurchases() {
  const result = await request("/users/1/purchases");
  printResult("GET /users/1/purchases", result);
}

async function testCreateOrder() {
  const result = await request("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: 1,
      items: [
        {
          itemId: 1,
          quantity: 1
        },
        {
          itemId: 8,
          quantity: 2
        }
      ],
      total: 46.99
    })
  });

  printResult("POST /orders", result);
}

// ===========================================================================
// Service → coworking
// ===========================================================================

async function testCoworkingSpaces() {
  const result = await request("/coworking/spaces");
  printResult("GET /coworking/spaces", result);
}

async function testCoworkingSpaceDetailSuccess() {
  const result = await request("/coworking/spaces/2");
  printResult("GET /coworking/spaces/2", result);
}

async function testCoworkingSpaceDetailNotFound() {
  const result = await request("/coworking/spaces/5");
  printResult("GET /coworking/spaces/5 (404 esperado)", result);
}

async function testCreateCoworkingReservation() {
  const result = await request("/coworking/reservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: 1,
      spaceId: 2,
      date: "2026-04-22",
      startTime: "14:00",
      endTime: "16:00"
    })
  });

  printResult("POST /coworking/reservations", result);
}

async function testUserReservations() {
  const result = await request("/users/1/reservations");
  printResult("GET /users/1/reservations", result);
}

// ===========================================================================
// Execute all tests
// ===========================================================================

async function runAllTests() {
  console.log("====================================");
  console.log("  INICIO DE PRUEBAS NEXUS MOCK API  ");
  console.log("====================================");

  await testHealth();

  await testLogin();
  await testUserDetailSuccess();
  await testUserDetailNotFound();

  await testLibraryLanding();
  await testBestSellers();
  await testCategories();
  await testLibraryItems();
  await testLibraryItemsWithFilters();
  await testLibraryItemDetailSuccess();
  await testLibraryItemDetailNotFound();

  await testUserPurchases();
  await testCreateOrder();

  await testCoworkingSpaces();
  await testCoworkingSpaceDetailSuccess();
  await testCoworkingSpaceDetailNotFound();
  await testCreateCoworkingReservation();
  await testUserReservations();

  console.log("\n====================================");
  console.log("  FIN DE PRUEBAS NEXUS MOCK API  ");
  console.log("====================================");
}

runAllTests();