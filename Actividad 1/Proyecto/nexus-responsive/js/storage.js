function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(book) {
  const cart = getCart();
  const existingBook = cart.find(item => String(item.id) === String(book.id));

  if (existingBook) {
    existingBook.quantity = (existingBook.quantity || 1) + 1;
  } else {
    cart.push({
      id: book.id,
      title: book.title,
      author: book.author,
      price: Number(book.price) || 0,
      image:  getBookImage(book),
      quantity: 1
    });
  }

  saveCart(cart);
}

function removeFromCart(bookId) {
  const cart = getCart().filter(item => String(item.id) !== String(bookId));
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem("cart");
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((acc, item) => acc + ((item.price || 0) * (item.quantity || 1)), 0);
}

function getReservations() {
  return JSON.parse(localStorage.getItem("reservations")) || [];
}

function saveReservations(reservations) {
  localStorage.setItem("reservations", JSON.stringify(reservations));
}

function addReservation(book) {
  const reservations = getReservations();
  reservations.push({
    id: book.id,
    title: book.title,
    author: book.author,
    price: Number(book.price) || 0,
    image: book.image,
    reservedAt: new Date().toISOString()
  });
  saveReservations(reservations);
}