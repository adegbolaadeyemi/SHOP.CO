const menuIcon = document.getElementById("menu-icon");
const mobileNav = document.getElementById("mobile-nav");
const cancelIcon = document.getElementById("cancel-icon");

menuIcon?.addEventListener("click", () => mobileNav.classList.remove("hidden"));
cancelIcon?.addEventListener("click", () => mobileNav.classList.add("hidden"));

// Testimonial Scroll Controls
const container = document.getElementById("testimonialContainer");
document.getElementById("nextBtn")?.addEventListener("click", () => {
  container.scrollBy({ left: 320, behavior: "smooth" });
});
document.getElementById("prevBtn")?.addEventListener("click", () => {
  container.scrollBy({ left: -320, behavior: "smooth" });
});

// SEARCH INPUT
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");

  if (searchInput) {
    // 1. Real-time filtering as you type
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();

      // Target product cards on your category/shop page
      const productCards = document.querySelectorAll("main .img");

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

// Product Data Sets
const arrivedProducts = [
  {
    id: 1,
    name: "T-shirt with Tape Details",
    image: "./asset/image/Frame 32.png",
    price: 120,
    originalPrice: null,
    discount: null,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Skinny Fit Jeans",
    image: "./asset/Frame 33.png",
    price: 240,
    originalPrice: 260,
    discount: "-20%",
    rating: 3.5,
  },
  {
    id: 3,
    name: "Checkered Shirt",
    image: "./asset/Frame 34.png",
    price: 180,
    originalPrice: null,
    discount: null,
    rating: 4.5,
  },
  {
    id: 4,
    name: "Sleeve Striped T-shirt",
    image: "./asset/Frame 38.png",
    price: 130,
    originalPrice: 160,
    discount: "-30%",
    rating: 4.5,
  },
];

const sellingProducts = [
  {
    id: 5,
    name: "Vertical Striped Shirt",
    image: "./asset/Frame 32(1).png",
    price: 212,
    originalPrice: 232,
    discount: "-20%",
    rating: 5.0,
  },
  {
    id: 6,
    name: "Courage Graphic T-shirt",
    image: "./asset/Frame 33(1).png",
    price: 145,
    originalPrice: null,
    discount: null,
    rating: 4.0,
  },
  {
    id: 7,
    name: "Loose Fit Bermuda Shorts",
    image: "./asset/Frame 34(1).png",
    price: 80,
    originalPrice: null,
    discount: null,
    rating: 3.0,
  },
  {
    id: 8,
    name: "Faded Skinny Jeans",
    image: "./asset/Frame 38(1).png",
    price: 210,
    originalPrice: null,
    discount: null,
    rating: 4.5,
  },
];

const allProducts = [...arrivedProducts, ...sellingProducts];

// Product Card Renderer Function
function renderProductCard(product) {
  return `
    <div class="flex flex-col justify-between group">
      <div class="img bg-[#F0EEED] rounded-2xl p-4 mb-3 relative overflow-hidden flex items-center justify-center h-48 md:h-64">
        <img src="${product.image}" alt="${product.name}" class="max-h-full object-contain group-hover:scale-105 transition duration-300" />
      </div>
      <h3 class="font-bold text-sm md:text-base text-black truncate mb-1">${product.name}</h3>
      
      <!-- Rating -->
      <div class="flex items-center gap-2 mb-2 text-xs md:text-sm">
        <span class="text-yellow-400">★★★★★</span>
        <span class="text-gray-600 font-medium">${product.rating}<span class="text-gray-400">/5</span></span>
      </div>

      <!-- Price & Action -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-lg md:text-xl font-bold">$${product.price}</span>
          ${product.originalPrice ? `<span class="text-gray-400 line-through text-sm font-bold">$${product.originalPrice}</span>` : ""}
          ${product.discount ? `<span class="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-medium">${product.discount}</span>` : ""}
        </div>
        <button onclick="addToCartById(${product.id})" class="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition cursor-pointer">
          +
        </button>
      </div>
    </div>
  `;
}

// Inject Products into DOM
const newArrivals = document.getElementById("new-arrivals");
if (newArrivals) {
  newArrivals.innerHTML = arrivedProducts.map(renderProductCard).join("");
}

const topSellings = document.getElementById("top-sellings");
if (topSellings) {
  topSellings.innerHTML = sellingProducts.map(renderProductCard).join("");
}

// Add to Cart by Product ID (for home page cards)
function addToCartById(productId) {
  const product = allProducts.find((p) => p.id === productId);
  if (!product) return;

  addToCartItem(
    product.name,
    product.price,
    product.image,
    "Medium",
    "Default",
  );
}

// Core Add-To-Cart Function (saves standardized properties for cart.js)
function addToCartItem(name, price, image, size = "Medium", color = "Default") {
  let cart = [];
  try {
    const savedCart = localStorage.getItem("shopco_cart");
    if (savedCart) {
      cart = JSON.parse(savedCart);
    }
  } catch (e) {
    console.error("Error loading cart:", e);
  }

  const numericPrice =
    typeof price === "string"
      ? parseFloat(price.replace(/[^0-9.]/g, "")) || 0
      : Number(price) || 0;

  const existingIndex = cart.findIndex(
    (item) => item.name === name && item.size === size && item.color === color,
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
  } else {
    cart.push({
      name: name,
      price: numericPrice,
      image: image,
      size: size,
      color: color,
      quantity: 1,
    });
  }

  // Save to BOTH local storage keys for maximum compatibility
  localStorage.setItem("shopco_cart", JSON.stringify(cart));
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartBadge();
  alert(`${name} added to cart!`);
}

// Badge Counter Update
function updateCartBadge() {
  let cart = [];
  try {
    const savedCart =
      localStorage.getItem("shopco_cart") || localStorage.getItem("cart");
    if (savedCart) {
      cart = JSON.parse(savedCart);
    }
  } catch (e) {
    console.error("Error reading cart", e);
  }

  const totalCount = cart.reduce(
    (sum, item) => sum + (Number(item.quantity) || 1),
    0,
  );
  const badge = document.getElementById("cart-count");

  if (badge) {
    if (totalCount > 0) {
      badge.textContent = totalCount;
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  }
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
