const menuIcon = document.getElementById("menu-icon");
const mobileNav = document.getElementById("mobile-nav");
const cancelIcon = document.getElementById("cancel-icon");
const container = document.getElementById("testimonialContainer");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
menuIcon.addEventListener("click", function () {
  mobileNav.style.display = "flex";
});
cancelIcon.addEventListener("click", function () {
  mobileNav.style.display = "none";
});
nextBtn.addEventListener("click", () => {
  container.scrollBy({
    left: container.clientWidth,
    behavior: "smooth",
  });
});
prevBtn.addEventListener("click", () => {
  container.scrollBy({
    left: -container.clientWidth,
    behavior: "smooth",
  });
});

const arrivedProducts = [
  {
    name: "T-shirt with tape details",
    img: "./asset/image/Frame 32.png",
    price: 120,
    rating: 4.5,
  },
  {
    name: "Skinny fit jeans",
    img: "./asset/Frame 33.png",
    price: 240,
    rating: 3.5,
  },
  {
    name: "Checkered shirt",
    img: "./asset/Frame 34.png",
    price: 180,
    rating: 4.5,
  },
  {
    name: "Sleeve Striped T-shirt",
    img: "./asset/Frame 38.png",
    price: 130,
    rating: 4.5,
  },
];
const newArrivals = document.getElementById("new-arrivals");
newArrivals.innerHTML = arrivedProducts
  .map(function (product) {
    return `
<div class="newarrivals">
  <div class= "bg-[#F0EEED] rounded-2xl mb-5 hover:scale-105 transition duration-300"> <img src="${product.img}" alt="${product.name}"/></div>
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
// TOP SELLINGS
const sellingProducts = [
  {
    name: "Vertical Striped Shirt",
    img: "./asset/Frame 32(1).png",
    price: 212,
    rating: 5.0,
  },
  {
    name: "Courage Graphic T-shirt",
    img: "./asset/Frame 33(1).png",
    price: 145,
    rating: 4.0,
  },
  {
    name: "Loose Fit Bermuda Shorts",
    img: "./asset/Frame 34(1).png",
    price: 80,
    rating: 3.0,
  },
  {
    name: "Faded Skinny Jeans",
    img: "./asset/Frame 38(1).png",
    price: 210,
    rating: 4.5,
  },
];
const topSellings = document.getElementById("top-sellings");
topSellings.innerHTML = sellingProducts
  .map(function (product) {
    return `
<div class="topsellings">
  <div class= "rounded-2xl hover:scale-105 transition duration-300"> <img src="${product.img}" alt="${product.name}"/></div>
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
