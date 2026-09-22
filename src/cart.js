// ==========================================
// 1. MOBILE MENU NAVIGATION TOGGLE
// ==========================================
const menuIcon = document.getElementById("menu-icon");
const mobileNav = document.getElementById("mobile-nav");
const cancelIcon = document.getElementById("cancel-icon");

if (menuIcon && mobileNav && cancelIcon) {
  menuIcon.addEventListener("click", function () {
    mobileNav.classList.remove("hidden");
    mobileNav.classList.add("flex");
  });
  cancelIcon.addEventListener("click", function () {
    mobileNav.classList.add("hidden");
    mobileNav.classList.remove("flex");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");

  if (searchInput) {
    // 1. Real-time filtering as you type
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();

      // Target product cards on your category/shop page
      const productCards = document.querySelectorAll("main .group");

      productCards.forEach((card) => {
        // Get product title text inside the card
        const titleElement = card.querySelector("h3");
        if (titleElement) {
          const titleText = titleElement.textContent.toLowerCase();
          if (titleText.includes(query)) {
            card.style.display = "block"; // Show item
          } else {
            card.style.display = "none"; // Hide item
          }
        }
      });
    });

    // 2. Redirect on Enter key (Optional: useful if user presses Enter on another page)
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && searchInput.value.trim() !== "") {
        const query = encodeURIComponent(searchInput.value.trim());
        // Redirect to shop page with query string if not already there
        if (
          !window.location.pathname.includes("category.html") &&
          !window.location.pathname.includes("shop.html")
        ) {
          window.location.href = `./category.html?search=${query}`;
        }
      }
    });
  }
});

// ==========================================
// 2. SHARED CART STORAGE & TRACKING LOGIC
// ==========================================

/**
 * Gets cart items from LocalStorage
 */
function getCart() {
  try {
    const savedCart =
      localStorage.getItem("shopco_cart") || localStorage.getItem("cart");
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (e) {
    console.error("Error reading cart from localStorage", e);
  }

  // Fallback default items if cart is completely empty on first visit
  const defaultItems = [
    {
      id: "prod-1",
      name: "Gradient Graphic T-shirt",
      size: "Large",
      color: "White",
      price: 145,
      quantity: 1,
      image: "",
    },
    {
      id: "prod-2",
      name: "Polo with Tipping Details",
      size: "Medium",
      color: "Red",
      price: 180,
      quantity: 1,
      image: "",
    },
    {
      id: "prod-3",
      name: "Black Striped T-shirt",
      size: "Medium",
      color: "Black",
      price: 120,
      quantity: 1,
      image: "",
    },
    {
      id: "prod-4",
      name: "Checkered Shirt",
      size: "Large",
      color: "Blue",
      price: 180,
      quantity: 1,
      image: "",
    },
  ];
  saveCart(defaultItems);
  return defaultItems;
}

/**
 * Saves cart array back to LocalStorage and updates badge
 */
function saveCart(cart) {
  localStorage.setItem("shopco_cart", JSON.stringify(cart));
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge(cart);
}

/**
 * Updates navbar cart counter badge across all pages
 */
function updateCartBadge(cart) {
  const cartBadge = document.getElementById("cart-count");
  if (!cartBadge) return;

  const currentCart = cart || getCart();
  const totalCount = currentCart.reduce(
    (sum, item) => sum + (Number(item.quantity || item.qty || item.count) || 1),
    0,
  );

  if (totalCount > 0) {
    cartBadge.textContent = totalCount;
    cartBadge.classList.remove("hidden");
  } else {
    cartBadge.classList.add("hidden");
  }
}

/**
 * ADD TO CART FUNCTION
 * Call this from product/shop page buttons to add products to cart.
 */
function addToCart(product) {
  const cart = getCart();

  // Normalize product properties
  const newProduct = {
    id: product.id || `prod-${Date.now()}`,
    name: product.name || product.title || "Unnamed Product",
    price:
      typeof product.price === "string"
        ? parseFloat(product.price.replace(/[^0-9.]/g, "")) || 0
        : Number(product.price || 0),
    size: product.size || "Medium",
    color: product.color || "Default",
    quantity: Number(product.quantity || product.qty) || 1,
    image: product.image || product.img || "https://via.placeholder.com/150",
  };

  // Check if item already exists in cart with same size & color
  const existingIndex = cart.findIndex(
    (item) =>
      (item.id === newProduct.id || item.name === newProduct.name) &&
      item.size === newProduct.size &&
      item.color === newProduct.color,
  );

  if (existingIndex > -1) {
    // Increment existing item quantity
    const existingQty =
      Number(cart[existingIndex].quantity || cart[existingIndex].qty) || 1;
    cart[existingIndex].quantity = existingQty + newProduct.quantity;
  } else {
    // Add new item to cart
    cart.push(newProduct);
  }

  // Save cart & refresh badge count
  saveCart(cart);

  alert(`${newProduct.name} added to cart!`);
}

// Global window attachment so inline `onclick="addToCart(...)"` works if used in HTML
window.addToCart = addToCart;

// ==========================================
// 3. CART PAGE RENDERING & INTERACTION LOGIC
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // Update header badge on initial page load
  updateCartBadge();

  // Inject CSS fallback for desktop side-by-side layout
  const style = document.createElement("style");
  style.textContent = `
    #cart-component .flex-col.lg\\:flex-row {
      display: flex !important;
      flex-direction: column !important;
      box-sizing: border-box !important;
    }
    @media (min-width: 1024px) {
      #cart-component .flex-col.lg\\:flex-row {
        flex-direction: row !important;
        align-items: flex-start !important;
      }
      #cart-items-list {
        width: 60% !important;
        max-width: 60% !important;
        box-sizing: border-box !important;
      }
      #cart-component .lg\\:w-\\[40\\%\\] {
        width: 38% !important;
        max-width: 38% !important;
        box-sizing: border-box !important;
      }
    }
  `;
  document.head.appendChild(style);

  const cartContainer =
    document.getElementById("cart-component") || document.body;
  const itemsList = document.getElementById("cart-items-list");
  const subtotalEl = document.getElementById("subtotal-val");
  const discountEl = document.getElementById("discount-val");
  const deliveryEl = document.getElementById("delivery-val");
  const totalEl = document.getElementById("total-val");
  const applyPromoBtn = document.getElementById("apply-promo-btn");
  const promoInput = document.getElementById("promo-input");

  let discountPercent = 20;

  function renderCart() {
    if (!itemsList) return; // Exit if not on cart page
    const cart = getCart();
    itemsList.innerHTML = "";

    if (!cart || cart.length === 0) {
      itemsList.innerHTML = `
        <div class="text-center py-12">
          <p class="text-gray-500 text-sm mb-4">Your cart is empty.</p>
          <a href="./shop.html" class="inline-block bg-black text-white px-6 py-3 rounded-full text-xs font-semibold hover:bg-gray-800 transition">
            Continue Shopping
          </a>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = "$0";
      if (discountEl) discountEl.textContent = "-$0";
      if (deliveryEl) deliveryEl.textContent = "$0";
      if (totalEl) totalEl.textContent = "$0";
      updateCartBadge(cart);
      return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
      const itemName =
        item.name || item.title || item.productName || "Unnamed Product";
      const rawPrice = item.price ?? item.cost ?? item.amount ?? 0;
      const itemPrice =
        typeof rawPrice === "string"
          ? parseFloat(rawPrice.replace(/[^0-9.]/g, "")) || 0
          : Number(rawPrice);

      const itemQty = Number(item.quantity || item.qty || item.count) || 1;
      const itemImg =
        item.image || item.img || item.src || "https://via.placeholder.com/150";
      const itemSize = item.size || item.productSize || "Standard";
      const itemColor = item.color || item.productColor || "Default";
      const itemId = item.id || `item-${index}`;

      subtotal += itemPrice * itemQty;

      const itemHTML = `
        <div class="cart-item flex gap-4 items-center py-4 border-b border-gray-100 last:border-b-0" data-index="${index}" data-id="${itemId}">
          <div class="w-20 h-20 sm:w-24 sm:h-24 bg-[#F0EEED] rounded-xl flex-shrink-0 flex items-center justify-center p-2">
            <img src="${itemImg}" alt="${itemName}" class="max-h-full max-w-full object-contain rounded-lg" />
          </div>
          <div class="flex-1 flex flex-col justify-between h-20 sm:h-24 min-w-0">
            <div class="flex justify-between items-start gap-2">
              <div class="min-w-0">
                <h3 class="font-bold text-sm sm:text-base leading-tight truncate">${itemName}</h3>
                <p class="text-xs text-gray-500 mt-0.5">Size: <span class="text-gray-700">${itemSize}</span></p>
                <p class="text-xs text-gray-500 mt-0.5">Color: <span class="text-gray-700">${itemColor}</span></p>
              </div>
              <button class="delete-btn text-red-500 hover:text-red-700 cursor-pointer flex-shrink-0 pt-0.5 text-base" aria-label="Delete item">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>

            <div class="flex justify-between items-end mt-1">
              <span class="text-lg sm:text-xl font-bold">$${itemPrice}</span>
              <div class="bg-[#F0F0F0] rounded-full px-3 py-1 flex items-center gap-3 text-xs sm:text-sm font-bold">
                <button class="decrease-btn text-gray-500 hover:text-black cursor-pointer px-1">-</button>
                <span class="item-qty">${itemQty}</span>
                <button class="increase-btn text-gray-500 hover:text-black cursor-pointer px-1">+</button>
              </div>
            </div>
          </div>
        </div>
      `;
      itemsList.insertAdjacentHTML("beforeend", itemHTML);
    });

    const discountAmount = (subtotal * discountPercent) / 100;
    const deliveryFee = subtotal > 0 ? 15 : 0;
    const total = subtotal - discountAmount + deliveryFee;

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString()}`;
    if (discountEl)
      discountEl.textContent = `-$${Math.round(discountAmount).toLocaleString()}`;
    if (deliveryEl) deliveryEl.textContent = `$${deliveryFee}`;
    if (totalEl) totalEl.textContent = `$${Math.round(total).toLocaleString()}`;

    updateCartBadge(cart);
  }

  // Event listener for quantity changes and deletions on cart page
  if (cartContainer) {
    cartContainer.addEventListener("click", (e) => {
      const itemEl = e.target.closest(".cart-item");
      if (!itemEl) return;
      const index = parseInt(itemEl.getAttribute("data-index"), 10);
      let cart = getCart();

      if (isNaN(index) || !cart[index]) return;

      if (e.target.closest(".increase-btn")) {
        const currentQty = Number(cart[index].quantity || cart[index].qty) || 1;
        cart[index].quantity = currentQty + 1;
      } else if (e.target.closest(".decrease-btn")) {
        const currentQty = Number(cart[index].quantity || cart[index].qty) || 1;
        if (currentQty > 1) {
          cart[index].quantity = currentQty - 1;
        }
      } else if (e.target.closest(".delete-btn")) {
        cart.splice(index, 1);
      }

      saveCart(cart);
      renderCart();
    });
  }

  // Promo Code listener
  if (applyPromoBtn && promoInput) {
    applyPromoBtn.addEventListener("click", () => {
      const code = promoInput.value.trim().toUpperCase();
      if (code === "DISCOUNT20" || code === "SHOP20") {
        discountPercent = 20;
        alert("20% Promo code applied!");
      } else if (code.length > 0) {
        alert("Invalid promo code.");
      }
      renderCart();
    });
  }

  // Initial render on cart page
  renderCart();

  // ==========================================
  // 4. AUTOMATIC CLICK HANDLERS FOR SHOP/PRODUCT PAGES
  // ==========================================
  document.addEventListener("click", (e) => {
    // Automatically catch clicks on any button with `.add-to-cart-btn` class
    const btn = e.target.closest(".add-to-cart-btn");
    if (!btn) return;

    // Try finding data attributes directly on button or product container card
    const card =
      btn.closest(".product-card") || btn.closest("[data-product-id]");

    if (card) {
      const product = {
        id: card.dataset.productId || card.dataset.id,
        name: card.querySelector(".product-title, h3, h2")?.innerText.trim(),
        price: card.querySelector(".product-price, .price")?.innerText.trim(),
        image: card.querySelector("img")?.src,
        size: card.querySelector(".selected-size")?.innerText || "Medium",
        color: card.querySelector(".selected-color")?.innerText || "Default",
        quantity: parseInt(
          document.getElementById("quantity-input")?.value || "1",
          10,
        ),
      };
      addToCart(product);
    }
  });
});
