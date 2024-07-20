document.addEventListener("DOMContentLoaded", function () {
  // Sélectionne tous les éléments de produit
  const productContainer = document.querySelector(".product-container");
  const subtotalElement = document.getElementById("subtotal");
  const totalElement = document.getElementById("total");

  // Fonction pour mettre à jour le sous-total et le total
  function updateTotal() {
    let subtotal = 0;
    // Parcourt chaque élément de produit
    productContainer.querySelectorAll(".product-item").forEach((item) => {
      // Récupère le prix du produit et la quantité
      const price = parseFloat(item.getAttribute("data-price"));
      const quantity = parseInt(item.querySelector(".quantity").textContent);
      // Calcule le sous-total
      subtotal += price * quantity;
    });
    // Met à jour les éléments de sous-total et total
    subtotalElement.textContent = subtotal.toFixed(2);
    totalElement.textContent = subtotal.toFixed(2);
  }

  // Fonction pour gérer le clic sur le bouton "+" et "-"
  function handleQuantityChange() {
    // Ajoute les écouteurs d'événements pour chaque produit
    productContainer.querySelectorAll(".product-item").forEach((item) => {
      const plusBtn = item.querySelector(".plus");
      const minusBtn = item.querySelector(".minus");
      const quantityElement = item.querySelector(".quantity");
      const heartBtn = item.querySelector(".heart-btn");
      const removeBtn = item.querySelector(".remove-btn");

      // Augmente la quantité au clic du bouton "+"
      plusBtn.addEventListener("click", () => {
        let quantity = parseInt(quantityElement.textContent);
        quantity++;
        quantityElement.textContent = quantity;
        updateTotal();
      });

      // Diminue la quantité au clic du bouton "-"
      minusBtn.addEventListener("click", () => {
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 1) {
          quantity--;
          quantityElement.textContent = quantity;
          updateTotal();
        }
      });

      // Ajoute ou retire la classe "liked" au clic du bouton cœur
      heartBtn.addEventListener("click", () => {
        heartBtn.classList.toggle("liked");
      });

      // Supprime l'élément de produit au clic du bouton "Supprimer"
      removeBtn.addEventListener("click", () => {
        // Récupère le prix de l'article avant de le supprimer
        const price = parseFloat(item.getAttribute("data-price"));
        // Supprime l'élément du DOM
        item.remove();
        // Met à jour le total après la suppression
        updateTotal();
      });
    });
  }

  // Initialisation des boutons de quantité et de suppression
  handleQuantityChange();

  // Mise à jour du total lors du chargement initial
  updateTotal();
});
