document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();

  // Mobile navigation drawer toggle
  const menuIcon = document.getElementById("menu-icon");
  const mobileNav = document.getElementById("mobile-nav");
  const cancelIcon = document.getElementById("cancel-icon");

  if (menuIcon && mobileNav && cancelIcon) {
    menuIcon.addEventListener("click", () => {
      mobileNav.style.display = "flex";
    });
    cancelIcon.addEventListener("click", () => {
      mobileNav.style.display = "none";
    });
  }
  // SEARCH INPUT
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
  // Mobile filter sidebar drawer toggle
  const filterIcon = document.getElementById("filter-icon");
  const mobileSidebar = document.getElementById("mobile-sidebar");
  const clearIcon = document.getElementById("clear-icon");
  const applyMobileFilter = document.getElementById("apply-mobile-filter");

  if (filterIcon && mobileSidebar) {
    filterIcon.addEventListener("click", () => {
      mobileSidebar.style.display = "flex";
    });
    if (clearIcon) {
      clearIcon.addEventListener("click", () => {
        mobileSidebar.style.display = "none";
      });
    }
    if (applyMobileFilter) {
      applyMobileFilter.addEventListener("click", () => {
        mobileSidebar.style.display = "none";
      });
    }
  }

  // Dynamic Range Slider Movement Sync
  const priceRanges = document.querySelectorAll(".price-range");
  const priceVals = document.querySelectorAll(".price-val");

  priceRanges.forEach((range) => {
    range.addEventListener("input", (e) => {
      priceVals.forEach((val) => {
        val.textContent = `$${e.target.value}`;
      });
    });
  });

  // Size Button Selector
  const sizeButtons = document.querySelectorAll(".size-btn");
  sizeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      sizeButtons.forEach((b) => {
        b.classList.remove("bg-black", "text-white");
        b.classList.add("bg-[#F0F0F0]", "text-gray-600");
      });
      btn.classList.remove("bg-[#F0F0F0]", "text-gray-600");
      btn.classList.add("bg-black", "text-white");
    });
  });
});

// Color button selection
function selectColor(button) {
  document.querySelectorAll(".color-btn").forEach((btn) => {
    btn.innerHTML = "";
    btn.classList.remove("ring-2", "ring-offset-2", "ring-black");
  });
  button.classList.add("ring-2", "ring-offset-2", "ring-black");
  const isLight =
    button.classList.contains("bg-white") ||
    button.classList.contains("bg-yellow-400");
  button.innerHTML = `<span class="${isLight ? "text-black" : "text-white"} text-xs font-bold">✓</span>`;
}

// Add to Cart Logic using localStorage
function addToCart(title, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find((item) => item.title === title);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ title, price, image, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
  `Added "${title}" to your cart!`;
}

// Update badge count displayed on top-right cart icon
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const badge = document.getElementById("cart-count");

  if (badge) {
    badge.textContent = totalCount;
  }
}
function addToCart(product) {
  // 1. Get current cart items or default to empty array
  let cart = [];
  try {
    const savedCart = localStorage.getItem("shopco_cart");
    if (savedCart) {
      cart = JSON.parse(savedCart);
    }
  } catch (e) {
    console.error("Error loading cart", e);
  }

  // 2. Check if item already exists in cart (matching name, size, and color)
  const existingIndex = cart.findIndex(
    (item) =>
      item.name === product.name &&
      item.size === product.size &&
      item.color === product.color,
  );

  if (existingIndex > -1) {
    // Increment quantity if it already exists
    cart[existingIndex].quantity =
      (cart[existingIndex].quantity || 1) + (product.quantity || 1);
  } else {
    // Otherwise add new product
    cart.push({
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.size || "Medium",
      color: product.color || "Default",
      quantity: product.quantity || 1,
    });
  }

  // 3. Save back to localStorage
  localStorage.setItem("shopco_cart", JSON.stringify(cart));
  ("Item added to cart!");
}
function addToCart(name, price, image, size = "Medium", color = "Default") {
  // 1. Get existing cart items from LocalStorage
  let cart = [];
  try {
    const savedCart = localStorage.getItem("shopco_cart");
    if (savedCart) {
      cart = JSON.parse(savedCart);
    }
  } catch (e) {
    console.error("Error loading cart:", e);
  }

  // 2. Clean and format the price (handles strings like "$120" or raw numbers)
  const numericPrice =
    typeof price === "string"
      ? parseFloat(price.replace(/[^0-9.]/g, "")) || 0
      : Number(price) || 0;

  // 3. Check if the product is already in the cart
  const existingIndex = cart.findIndex(
    (item) =>
      (item.name || item.title) === name &&
      item.size === size &&
      item.color === color,
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
  } else {
    // 4. Push exact property names that cart.js expects
    cart.push({
      name: name,
      price: numericPrice,
      image: image,
      size: size,
      color: color,
      quantity: 1,
    });
  }

  // 5. Save back to LocalStorage
  localStorage.setItem("shopco_cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}
