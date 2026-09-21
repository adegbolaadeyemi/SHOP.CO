// ==========================================
// STATE VARIABLES FOR MAIN PRODUCT
// ==========================================
let currentTitle = "One Life Graphic T-Shirt";
let currentPrice = 260;
let selectedColor = "Olive";
let selectedSize = "Large";
let currentQuantity = 1;
let currentImagePath = "./asset/image 1 (1).png";

// Related Products Data
const relatedProducts = [
  {
    id: 1,
    title: "Polo with Contrast Trim",
    price: 212,
    originalPrice: 242,
    discount: "-20%",
    rating: 4.0,
    image: "./asset/Frame 32 (a).png",
  },
  {
    id: 2,
    title: "Gradient Graphic T-shirt",
    price: 145,
    originalPrice: null,
    discount: null,
    rating: 3.5,
    image: "./asset/Frame 33(a).png",
  },
  {
    id: 3,
    title: "Polo with Tipping Details",
    price: 180,
    originalPrice: null,
    discount: null,
    rating: 4.5,
    image: "./asset/Frame 34(a).png",
  },
  {
    id: 4,
    title: "Black Striped T-shirt",
    price: 120,
    originalPrice: 150,
    discount: "-30%",
    rating: 5.0,
    image: "./asset/Frame 38(a).png",
  },
];

// ==========================================
// 1. IMAGE CHANGING FUNCTIONALITY
// ==========================================
function changeImage(button, imagePath) {
  const mainImage = document.getElementById("mainImage");
  if (mainImage) {
    mainImage.src = imagePath;
    currentImagePath = imagePath;
  }

  // Active border styling for thumbnails
  document.querySelectorAll(".thumbnail-btn").forEach((btn) => {
    btn.classList.remove("");
    btn.classList.add("border-transparent");
  });
  if (button) {
    button.classList.remove("border-transparent");
    button.classList.add("border-black");
  }
}

// ==========================================
// 2. QUANTITY CONTROLS
// ==========================================
function increaseQuantity() {
  currentQuantity++;
  const qtyElem = document.getElementById("quantity");
  if (qtyElem) qtyElem.innerText = currentQuantity;
}

function decreaseQuantity() {
  if (currentQuantity > 1) {
    currentQuantity--;
    const qtyElem = document.getElementById("quantity");
    if (qtyElem) qtyElem.innerText = currentQuantity;
  }
}

// ==========================================
// 3. COLOR SELECTION
// ==========================================
function selectColor(btn, colorName) {
  selectedColor = colorName;
  document.querySelectorAll(".color-btn").forEach((b) => {
    b.classList.remove("ring-2", "ring-offset-2", "ring-black");
    b.innerText = "";
  });
  if (btn) {
    btn.classList.add("ring-2", "ring-offset-2", "ring-black");
    btn.innerText = "✓";
  }
}

// ==========================================
// 4. SIZE SELECTION
// ==========================================
function selectSize(btn) {
  if (!btn) return;
  selectedSize = btn.innerText.trim();
  document.querySelectorAll(".size-btn").forEach((b) => {
    b.classList.remove("bg-black", "text-white");
    b.classList.add("bg-[#F0F0F0]", "text-gray-600");
  });
  btn.classList.remove("bg-[#F0F0F0]", "text-gray-600");
  btn.classList.add("bg-black", "text-white");
}

// ==========================================
// 5. ADD TO CART LOGIC (Works with cart.js)
// ==========================================

// Add Main Product to Cart
function addMainProductToCart() {
  const productPayload = {
    id: `main-${Date.now()}`,
    name: currentTitle,
    price: currentPrice,
    color: selectedColor,
    size: selectedSize,
    quantity: currentQuantity,
    image: currentImagePath,
  };

  if (typeof window.addToCart === "function") {
    window.addToCart(productPayload);
  }

  // Reset Quantity Counter
  currentQuantity = 1;
  const qtyElem = document.getElementById("quantity");
  if (qtyElem) qtyElem.innerText = 1;
}

// Add Related Product to Cart
function addRelatedToCart(title, price, image) {
  const relatedPayload = {
    id: `rel-${Date.now()}`,
    name: title,
    price: price,
    color: "Default",
    size: "Medium",
    quantity: 1,
    image: image,
  };

  if (typeof window.addToCart === "function") {
    window.addToCart(relatedPayload);
  }
}

// ==========================================
// 6. TABS SWITCHING
// ==========================================
function showTab(tabId, element) {
  document.querySelectorAll(".tabContent").forEach((content) => {
    content.classList.add("hidden");
  });

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove(
      "border-b-2",
      "border-black",
      "text-black",
      "font-semibold",
    );
    btn.classList.add("text-gray-400", "font-medium");
  });

  const targetTab = document.getElementById(tabId);
  if (targetTab) targetTab.classList.remove("hidden");

  if (element) {
    element.classList.remove("text-gray-400", "font-medium");
    element.classList.add(
      "border-b-2",
      "border-black",
      "text-black",
      "font-semibold",
    );
  }
}

// ==========================================
// 7. RENDER "YOU MIGHT ALSO LIKE" CARDS
// ==========================================
function renderRelatedProducts() {
  const container = document.getElementById("related-products");
  if (!container) return;

  container.innerHTML = relatedProducts
    .map((product) => {
      const fullStars = Math.floor(product.rating);
      const hasHalfStar = product.rating % 1 !== 0;
      let starMarkup = "★".repeat(fullStars);
      if (hasHalfStar) starMarkup += "☆";

      const safeTitle = product.title.replace(/'/g, "\\'");

      return `
        <div class="flex flex-col gap-2 justify-between bg-white p-3 rounded-2xl border border-gray-100 hover:shadow-md transition">
          <div>
            <div class="bg-[#F0EEED] rounded-xl overflow-hidden aspect-square flex items-center justify-center p-4 relative group">
              <img src="${product.image}" alt="${product.title}" class="w-full h-full object-contain group-hover:scale-105 transition duration-300" />
            </div>
            <h3 class="font-bold text-sm md:text-base mt-3 line-clamp-1">${product.title}</h3>
            <div class="flex items-center gap-2 my-1">
              <span class="text-yellow-400 text-sm">${starMarkup}</span>
              <span class="text-xs text-gray-500">${product.rating}/5</span>
            </div>
            <div class="flex items-center gap-2 mb-3">
              <span class="text-lg font-bold">$${product.price}</span>
              ${
                product.originalPrice
                  ? `<span class="text-sm text-gray-400 line-through">$${product.originalPrice}</span>`
                  : ""
              }
              ${
                product.discount
                  ? `<span class="bg-red-100 text-red-500 text-xs px-2 py-0.5 rounded-full font-semibold">${product.discount}</span>`
                  : ""
              }
            </div>
          </div>
          <button
            onclick="addRelatedToCart('${safeTitle}', ${product.price}, '${product.image}')"
            class="w-full py-2 px-4 bg-black text-white rounded-full text-xs font-semibold hover:bg-gray-800 transition cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      `;
    })
    .join("");
}

// ==========================================
// 8. PAGE INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  renderRelatedProducts();

  // Attach event listener for the Main Product Add-to-Cart button
  const mainAddToCartBtn = document.getElementById("add-to-cart-btn");
  if (mainAddToCartBtn) {
    mainAddToCartBtn.addEventListener("click", addMainProductToCart);
  }
});
