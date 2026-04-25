document.addEventListener("DOMContentLoaded", () => {
  renderCartPage();
  renderReservations();

  document.getElementById("clear-cart-btn")?.addEventListener("click", () => {
    clearCart();
    renderCartPage();
    updateCartCount();
  });

  document.getElementById("checkout-btn")?.addEventListener("click", async () => {
    const cart = getCart();
    if (cart.length === 0) { alert("Tu carrito está vacío."); return; }
    const order = {
      userId: 1,
      items: cart.map(item => ({
        itemId: item.id,
        quantity: item.quantity || 1
      })),
      total: getCartTotal()
    };

    try {
      await createOrder(order);
      alert("Compra registrada correctamente en el servicio mock.");
      clearCart();
      renderCartPage();
      updateCartCount();
    } catch (error) {
      alert("No fue posible registrar la compra. Inténtalo más tarde.");
    }
  });
});

function renderCartPage() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartEmpty = document.getElementById("cart-empty");
  const summaryCount = document.getElementById("summary-count");
  const summaryTotal = document.getElementById("summary-total");

  if (!cartItemsContainer) return;

  const cart = getCart();

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "";
    cartEmpty?.classList.remove("hidden");
    if (summaryCount) summaryCount.textContent = "0";
    if (summaryTotal) summaryTotal.textContent = "0.00 €";
    return;
  }

  cartEmpty?.classList.add("hidden");

  cartItemsContainer.innerHTML = cart.map(item => `
    <article class="cart-item">
      <div class="cart-item__media">
        <img src="${item.image || 'assets/img/books/book-placeholder.jpg'}" alt="Portada del libro ${escapeHtml(item.title)}">
      </div>

      <div class="cart-item__info">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.author || "Autor no disponible")}</p>
        <p>${formatPrice(item.price)}</p>
      </div>

      <div class="cart-item__actions">
        <p>Cantidad: ${item.quantity || 1}</p>
        <p>Subtotal: ${formatPrice((item.price || 0) * (item.quantity || 1))}</p>
        <button class="btn btn-link" type="button" onclick="removeCartItem('${item.id}')">Eliminar</button>
      </div>
    </article>
  `).join("");

  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const totalPrice = getCartTotal();

  if (summaryCount) summaryCount.textContent = String(totalItems);
  if (summaryTotal) summaryTotal.textContent = formatPrice(totalPrice);
}

function removeCartItem(bookId) {
  removeFromCart(bookId);
  renderCartPage();
  updateCartCount();
}

function renderReservations() {
  const reservationsList = document.getElementById("reservations-list");
  const reservationsEmpty = document.getElementById("reservations-empty");

  if (!reservationsList) return;

  const reservations = getReservations();

  if (reservations.length === 0) {
    reservationsList.innerHTML = "";
    reservationsEmpty?.classList.remove("hidden");
    return;
  }

  reservationsEmpty?.classList.add("hidden");

  reservationsList.innerHTML = reservations.map(item => `
    <article class="reservation-item">
      <div class="reservation-item__media">
        <img src="${item.image || 'assets/img/books/book-placeholder.jpg'}" alt="Portada del libro ${escapeHtml(item.title)}">
      </div>

      <div class="reservation-item__info">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.author || "Autor no disponible")}</p>
        <p>Reserva registrada localmente</p>
      </div>
    </article>
  `).join("");
}