// import { fetchProducts } from "../utils/api.js"; // API (enable later)
import dummyProducts from "../data/products-dummy.js";

// Elements
const container = document.getElementById("products");
const searchInput = document.getElementById("searchInput");
const filterBtn = document.querySelector(".filter-bar button");
const priceBtn = document.querySelector(".price-filter-bar button");
const filterModal = document.getElementById("filterModal");
const togglesidebar = document.getElementById("togglesidebar");

// Sidebar toggle (for mobile)
togglesidebar?.addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("show");
});

// Product rendering logic
let currentProducts = [...dummyProducts];
renderByCategory(currentProducts);

// Search
searchInput?.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = dummyProducts.filter((p) =>
    p["Product-title"].toLowerCase().includes(keyword)
  );
  renderByCategory(filtered);
});

// Category filter
filterBtn?.addEventListener("click", () => {
  renderCategoryModal();
});

// Price filter
priceBtn?.addEventListener("click", () => {
  renderPriceModal();
});

// Modal close on outside click
window.addEventListener("click", (e) => {
  if (e.target === filterModal) {
    filterModal.classList.add("hidden");
    filterModal.classList.remove("show");
  }
});

// Render by category
function renderByCategory(products) {
  container.innerHTML = "";
  const categories = [...new Set(products.map((p) => p["Category"]))];

  categories.forEach((category) => {
    const heading = document.createElement("h2");
    heading.textContent = category;
    container.appendChild(heading);

    const row = document.createElement("div");
    row.className = "product-row";

    const items = products.filter((p) => p["Category"] === category);
    items.forEach((product) => {
      row.appendChild(createProductCard(product));
    });

    container.appendChild(row);
  });
}

// Create product card (for dummyProducts)
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <img src="${product["Product-image-url"]}" alt="${product["Product-title"]}"
         onerror="this.onerror=null; this.src='./src/images/products/placeholder.jpg';" />
    <h3>${product["Product-title"]}</h3>
    <h4>${product["Product-description"]}</h4>
    <p><strong>${product["Product-price"]}</strong></p>
    <p class="product-meta">${product["Product-weight"]} &middot; ${product["Product-producer"]}</p>
    <a href="${product["Matsmart-url"]}" target="_blank">
      <button>Lägg i kundvagn</button>
    </a>
  `;

  return card;
}

// Category filter modal
function renderCategoryModal() {
  filterModal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn modal-close-btn">&times;</span>
      <h3>Välj kategori</h3>
      <ul id="categoryList">
        <li><button data-category="all">Alla</button></li>
        ${[...new Set(dummyProducts.map((p) => p.Category))]
          .map(
            (cat) => `<li><button data-category="${cat}">${cat}</button></li>`
          )
          .join("")}
      </ul>
    </div>
  `;
  filterModal.classList.remove("hidden");
  filterModal.classList.add("show");

  document.querySelectorAll("#categoryList button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const selectedCategory = e.target.dataset.category;
      const filtered =
        selectedCategory === "all"
          ? dummyProducts
          : dummyProducts.filter((p) => p["Category"] === selectedCategory);
      renderByCategory(filtered);
      filterModal.classList.add("hidden");
      filterModal.classList.remove("show");
    });
  });

  const closeBtn = document.querySelector(".modal-close-btn");
  closeBtn?.addEventListener("click", () => {
    filterModal.classList.add("hidden");
    filterModal.classList.remove("show");
  });
}

// Price filter modal
function renderPriceModal() {
  const priceRanges = [
    { label: "1–20 kr", min: 1, max: 20 },
    { label: "21–40 kr", min: 21, max: 40 },
    { label: "41–60 kr", min: 41, max: 60 },
    { label: "61–100 kr", min: 61, max: 100 },
    { label: "101–180 kr", min: 101, max: 180 },
  ];

  filterModal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn modal-close-btn">&times;</span>
      <h3>Välj prisintervall</h3>
      <ul id="priceList">
        <li><button data-min="0" data-max="10000">Alla</button></li>
        ${priceRanges
          .map(
            (range) =>
              `<li><button data-min="${range.min}" data-max="${range.max}">${range.label}</button></li>`
          )
          .join("")}
      </ul>
    </div>
  `;
  filterModal.classList.remove("hidden");
  filterModal.classList.add("show");

  document.querySelectorAll("#priceList button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const min = parseInt(e.target.dataset.min);
      const max = parseInt(e.target.dataset.max);
      const filtered = dummyProducts.filter((p) => {
        const price = parseFloat(p["Product-price"].replace(",", "."));
        return price >= min && price <= max;
      });
      renderByCategory(filtered);
      filterModal.classList.add("hidden");
      filterModal.classList.remove("show");
    });
  });

  const closeBtn = document.querySelector(".modal-close-btn");
  closeBtn?.addEventListener("click", () => {
    filterModal.classList.add("hidden");
    filterModal.classList.remove("show");
  });
}

/*
To enable backend API later, uncomment and use this:
async function loadProducts() {
  const container = document.getElementById("products");
  container.innerHTML = "<p>Loading products...</p>";

  try {
    const products = await fetchProducts();
    container.innerHTML = "";
    if (products.length > 0) {
      renderByCategory(products);
    } else {
      container.innerHTML = "<p>No products available.</p>";
    }
  } catch (err) {
    console.error("Error fetching products:", err);
    container.innerHTML = "<p>Failed to load products.</p>";
  }
}
*/
