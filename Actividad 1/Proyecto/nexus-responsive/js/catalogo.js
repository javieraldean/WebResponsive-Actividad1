let allBooks = [];
let filteredBooks = [];

document.addEventListener("DOMContentLoaded", async () => {
  const booksContainer = document.getElementById("books-list");
  const resultsCount = document.getElementById("results-count");

  if (!booksContainer) return;

  renderCatalogLoadingState();

  if (resultsCount) {
    resultsCount.textContent = "Cargando catálogo...";
  }

  try {
    allBooks = await getBooks();
    filteredBooks = [...allBooks];

    populateCategoryFilter(allBooks);
    renderBooks(filteredBooks);
    bindCatalogEvents();
  } catch (error) {
    console.error("ERROR API:", error);
    renderCatalogUnavailableState();

    if (resultsCount) {
      resultsCount.textContent = "Catálogo temporalmente no disponible";
    }
  }
});

function populateCategoryFilter(books) {
  const categoryFilter = document.getElementById("category-filter");
  if (!categoryFilter) return;

  const categories = [...new Set(books.map(book => book.category).filter(Boolean))];

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function bindCatalogEvents() {
  const searchInput = document.getElementById("search-input");
  const categoryFilter = document.getElementById("category-filter");
  const priceFilter = document.getElementById("price-filter");
  const clearFiltersButton = document.getElementById("clear-filters");

  searchInput?.addEventListener("input", applyFilters);
  categoryFilter?.addEventListener("change", applyFilters);
  priceFilter?.addEventListener("change", applyFilters);
  clearFiltersButton?.addEventListener("click", clearFilters);
}

function applyFilters() {
  const searchValue = document.getElementById("search-input")?.value.trim().toLowerCase() || "";
  const categoryValue = document.getElementById("category-filter")?.value || "";
  const priceValue = document.getElementById("price-filter")?.value || "";

  filteredBooks = allBooks.filter(book => {
    const matchesSearch =
      !searchValue ||
      (book.title && book.title.toLowerCase().includes(searchValue)) ||
      (book.author && book.author.toLowerCase().includes(searchValue));

    const matchesCategory =
      !categoryValue || book.category === categoryValue;

    const price = Number(book.price) || 0;
    let matchesPrice = true;

    if (priceValue === "0-20") {
      matchesPrice = price <= 20;
    } else if (priceValue === "20-40") {
      matchesPrice = price > 20 && price <= 40;
    } else if (priceValue === "40+") {
      matchesPrice = price > 40;
    }

    return matchesSearch && matchesCategory && matchesPrice;
  });

  renderBooks(filteredBooks);
}

function clearFilters() {
  const searchInput = document.getElementById("search-input");
  const categoryFilter = document.getElementById("category-filter");
  const priceFilter = document.getElementById("price-filter");

  if (searchInput) searchInput.value = "";
  if (categoryFilter) categoryFilter.value = "";
  if (priceFilter) priceFilter.value = "";

  filteredBooks = [...allBooks];
  renderBooks(filteredBooks);
}

function renderBooks(books) {
  const booksContainer = document.getElementById("books-list");
  const resultsCount = document.getElementById("results-count");
  const emptyState = document.getElementById("empty-state");

  if (!booksContainer) return;

  resultsCount.textContent = `Mostrando ${books.length} libro(s)`;

  if (books.length === 0) {
    booksContainer.innerHTML = `
      <section class="state-card state-card--info">
        <div class="state-card__icon">🔎</div>
        <h2>No encontramos libros</h2>
        <p>
          No hay resultados que coincidan con tu búsqueda o con los filtros seleccionados.
        </p>
        <p class="state-card__hint">
          Prueba cambiando la categoría, el precio o el texto de búsqueda.
        </p>
      </section>
    `;
    emptyState?.classList.add("hidden");
    return;
  }

  emptyState?.classList.add("hidden");
  booksContainer.innerHTML = books.map(createBookCard).join("");
}

function renderCatalogLoadingState() {
  const booksContainer = document.getElementById("books-list");
  const emptyState = document.getElementById("empty-state");

  if (!booksContainer) return;

  emptyState?.classList.add("hidden");

  booksContainer.innerHTML = `
    <section class="state-card state-card--loading" aria-live="polite">
      <div class="state-card__icon">⌛</div>
      <h2>Cargando catálogo</h2>
      <p>
        Estamos preparando la información de los libros para mostrarte
        el contenido disponible.
      </p>
      <p class="state-card__hint">
        Esto puede tardar unos segundos mientras se establece la conexión con el servicio.
      </p>
      <div class="loading-dots" aria-hidden="true">
        <span></span><span></span><span></span>
      </div>
    </section>
  `;
}

function renderCatalogUnavailableState() {
  const booksContainer = document.getElementById("books-list");
  const emptyState = document.getElementById("empty-state");

  if (!booksContainer) return;

  emptyState?.classList.add("hidden");

  booksContainer.innerHTML = `
    <section class="state-card state-card--info" aria-live="polite">
      <div class="state-card__icon">📚</div>
      <h2>Estamos preparando el catálogo</h2>
      <p>
        En este momento no es posible mostrar los libros porque la conexión
        con el servicio aún se encuentra en proceso de configuración.
      </p>
      <p class="state-card__hint">
        Puedes volver a intentarlo más tarde o seguir explorando el resto de la aplicación.
      </p>
      <div class="state-card__actions">
        <a href="index.html" class="btn btn-secondary">Volver al inicio</a>
      </div>
    </section>
  `;
}