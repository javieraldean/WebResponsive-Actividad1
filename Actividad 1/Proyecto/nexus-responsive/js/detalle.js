document.addEventListener("DOMContentLoaded", async () => {
  const detailContainer = document.getElementById("book-detail-content");
  const relatedContainer = document.getElementById("related-books-list");

  if (!detailContainer) return;

  const params = new URLSearchParams(window.location.search);
  const bookId = params.get("id");

  if (!bookId) {
    detailContainer.innerHTML = `<p>No se recibió el identificador del libro.</p>`;
    return;
  }

  try {
    const book = await getBookById(bookId);
    renderBookDetail(book);

    if (relatedContainer) {
      const books = await getBooks();
      const relatedBooks = books
        .filter(item => String(item.id) !== String(book.id))
        .filter(item => item.category === book.category || item.author === book.author)
        .slice(0, 3);

      if (relatedBooks.length > 0) {
        relatedContainer.innerHTML = relatedBooks.map(createBookCard).join("");
      } else {
        relatedContainer.innerHTML = books
          .filter(item => String(item.id) !== String(book.id))
          .slice(0, 3)
          .map(createBookCard)
          .join("");
      }
    }
  } catch (error) {
    console.error(error);
    detailContainer.innerHTML = `<p>No fue posible cargar el detalle del libro.</p>`;
  }
});

function renderBookDetail(book) {
  const container = document.getElementById("book-detail-content");
  const image = getBookImage(book);

  container.innerHTML = `
    <div class="detail-layout">
      <div class="detail-media">
        <img src="${image}" alt="${escapeHtml(book.title)}">
      </div>
      <div class="detail-info">
        <span class="detail-category">${escapeHtml(book.category || "General")}</span>
        <h1 class="detail-title">${escapeHtml(book.title)}</h1>
        <div class="detail-meta">
          <p class="detail-author">${escapeHtml(book.author || "Autor no disponible")}</p>
          <p class="detail-price">${formatPrice(book.price)}</p>
        </div>
        <p class="detail-description">
          ${escapeHtml(book.description || "Este libro forma parte del catálogo académico de Nexus, orientado al aprendizaje, desarrollo profesional y crecimiento personal.")}
        </p>
        <div class="detail-actions">
          <button class="btn btn-primary" id="add-to-cart-btn">Comprar</button>
          <button class="btn btn-secondary" id="reserve-book-btn">Reservar</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById("add-to-cart-btn").addEventListener("click", () => {
    addToCart(book);
    updateCartCount();
    alert("Libro añadido al carrito");
  });

  document.getElementById("reserve-book-btn").addEventListener("click", () => {
    addReservation(book);
    alert("Libro reservado");
  });
}