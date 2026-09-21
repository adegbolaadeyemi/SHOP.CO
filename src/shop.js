const menuIcon = document.getElementById("menu-icon");
const mobileNav = document.getElementById("mobile-nav");
const cancelIcon = document.getElementById("cancel-icon");
menuIcon.addEventListener("click", function () {
  mobileNav.style.display = "flex";
});
cancelIcon.addEventListener("click", function () {
  mobileNav.style.display = "none";
});

// CHANGE IMAGE
function changeImage(image) {
  document.getElementById("mainImage").src = image;
}

// QUANTITY
let quantity = 1;

function increaseQuantity() {
  quantity++;
  document.getElementById("quantity").textContent = quantity;
}

function decreaseQuantity() {
  if (quantity > 1) {
    quantity--;
    document.getElementById("quantity").textContent = quantity;
  }
}

// SIZE
function selectSize(button) {
  document.querySelectorAll(".size").forEach((size) => {
    size.classList.remove("bg-[#1f2937]", "text-white");

    size.classList.add("bg-gray-100", "text-gray-500");
  });

  button.classList.remove("bg-gray-100", "text-gray-500");

  button.classList.add("bg-[#000000]", "text-white");
}

// COLOR
function selectColor(button) {
  document.querySelectorAll(".color").forEach((color) => {
    color.classList.remove("border-2", "border-[#1f2937]");

    color.innerHTML = "";
  });

  button.classList.add("border-2", "border-[#1f2937]");

  button.innerHTML = '<span class="text-white">✓</span>';
}

// TABS
function showTab(tabName, button) {
  document.querySelectorAll(".tabContent").forEach((tab) => {
    tab.classList.add("hidden");
  });

  document.getElementById(tabName).classList.remove("hidden");

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove(
      "border-b-2",
      "border-[#1f2937]",
      "font-semibold",
      "text-[#1f2937]",
    );

    tab.classList.add("text-gray-400");
  });

  button.classList.remove("text-gray-400");

  button.classList.add(
    "border-b-2",
    "border-[#1f2937]",
    "font-semibold",
    "text-[#1f2937]",
  );
}

// YOU MIGHT ALSO LIKE
const arrivedProducts = [
  {
    name: "T-shirt with tape details",
    img: "./asset/Frame 32 (a).png",
    price: 212,
    rating: 4.0,
  },
  {
    name: "Skinny fit jeans",
    img: "./asset/Frame 33(a).png",
    price: 145,
    rating: 3.5,
  },
  {
    name: "Checkered shirt",
    img: "./asset/Frame 34(a).png",
    price: 180,
    rating: 4.5,
  },
  {
    name: "Sleeve Striped T-shirt",
    img: "./asset/Frame 38(a).png",
    price: 150,
    rating: 5.0,
  },
];
const newArrivals = document.getElementById("new-arrivals");
newArrivals.innerHTML = arrivedProducts
  .map(function (product) {
    return `
<div class="newarrivals">
  <div class= "bg-[#F0EEED]  rounded-2xl mb-5 hover:scale-105 transition duration-300"> <img src="${product.img}" alt="${product.name}"/></div>
  <h2 class="text-xs md:text-lg font-bold">${product.name}</h2>
  <div class="flex items-center gap-2 text-xs md:text-xl">
  <div style="color: gold;">
   ★★★★★
  </div>
     <p style="font-size: 14px; line-height: 1.5">${product.rating}<span class="text-block/40">/5</span></p></div>
     <div class="flex md:gap-48 gap-15">
     <div class="text-2xl font-bold text-black">$${product.price}</div>
     <button class="md:text-4xl font-bold text-2xl w-8 h-8 md:h-12 md:w-12 border text-white bg-black rounded-full">+</button>
     </div>
 </div>
     `;
  })
  .join("");
