document.addEventListener("DOMContentLoaded", async () => {
  updateCartCount();
  setupMobileMenu();
  loadFeaturedBooks();
});

function setupMobileMenu() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) { return; }
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

async function loadFeaturedBooks() {
  const featuredContainer = document.getElementById("featured-books");
  if (!featuredContainer) { return; }
  featuredContainer.innerHTML = `
    <section class="state-card state-card--loading">
      <div class="state-card__icon">⌛</div>
      <h2>Cargando destacados</h2>
      <p>Estamos preparando una selección de libros recomendados.</p>
      <div class="loading-dots" aria-hidden="true">
        <span></span><span></span><span></span>
      </div>
    </section>
  `;

  try {
    const books = await getBestSellers();
    if (!books || books.length === 0) {
      featuredContainer.innerHTML = `
        <section class="state-card state-card--info">
          <div class="state-card__icon">📚</div>
          <h2>Aún no hay destacados</h2>
          <p>Estamos preparando una selección de libros para mostrar en esta sección.</p>
        </section>
      `;
      return;
    }
    featuredContainer.innerHTML = books.slice(0, 3).map(createBookCard).join("");
  } catch (error) {
    console.error(error);
    featuredContainer.innerHTML = `
      <section class="state-card state-card--info">
        <div class="state-card__icon">📚</div>
        <h2>Destacados temporalmente no disponibles</h2>
        <p>La conexión con el servicio de libros aún se encuentra en proceso de configuración.</p>
      </section>
    `;
  }
}

function addToCartDirect(btn) {
  try {
    const book = JSON.parse(decodeURIComponent(btn.dataset.book));
    addToCart(book);
    updateCartCount();
    showMessage("Libro añadido al carrito correctamente.");
  } catch {
    showMessage("No fue posible añadir el libro al carrito.");
  }
}

function showMessage(text) {
  const msg = document.createElement("div");
  msg.className = "toast-message";
  msg.textContent = text;
  document.body.appendChild(msg);
  setTimeout(() => { msg.remove(); }, 2500);
}