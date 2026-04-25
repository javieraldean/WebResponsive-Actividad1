function formatPrice(price) {
  const numericPrice = Number(price) || 0;
  return `${numericPrice.toFixed(2)} €`;
}

function escapeHtml(text) {
  if (text === null || text === undefined) return "";
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createBookCard(book) {
  const id = book.id ?? "";
  const title = escapeHtml(book.title || "Sin título");
  const author = escapeHtml(book.author || "Autor no disponible");
  const category = escapeHtml(book.category || "General");
  const image = getBookImage(book);
  const price = formatPrice(book.price);

  return `
    <article class="book-card">
      <a href="detalle.html?id=${id}" class="book-card__image-link">
        <img src="${image}" alt="Portada de ${title}" class="book-card__image">
      </a>
      <div class="book-card__content">      
        <span class="book-card__category">${category}</span>
        <h3 class="book-card__title">${title}</h3>
        <p class="book-card__author">${author}</p>
        <div class="book-card__footer">
          <p class="book-card__price">${price}</p>
          <button class="btn btn-primary btn-sm"
            onclick="addBookToCartFromCard(${id})">
            Añadir
          </button>
        </div>
      </div>
    </article>
  `;
}

function getBookImage(book) {
   const availableImagesById = {
    1: "assets/img/books/book-1.jpg",
    2: "assets/img/books/book-2.jpg",
    3: "assets/img/books/book-3.jpg",
    4: "assets/img/books/book-4.jpg",
    8: "assets/img/books/book-8.jpg"
  };
  return availableImagesById[book.id] || "assets/img/books/book-placeholder.jpg";
}

function updateCartCount() {
  const countElement = document.getElementById("cart-count");
  if (!countElement) { return; }
  const cart = getCart();
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  countElement.textContent = totalItems;
}