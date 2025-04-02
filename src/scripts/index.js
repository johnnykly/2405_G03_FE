const API_BASE = "https://grupp-3.vercel.app/api";
let allProducts = [];

fetchProducts();
setupSidebarToggle();
setupModals();
setupSearch();
setupFilterButtons();

async function fetchProducts() {
  try {
    const response = await fetch(`${API_BASE}/products`);
    if (!response.ok) throw new Error("Kunde inte hämta produkter");
    const products = await response.json();
    allProducts = normalizeProducts(products);
    renderByCategory(allProducts);
  } catch (error) {
    console.error(error);
    document.getElementById("products").innerHTML = "<p>Fel vid hämtning av produkter.</p>";
  }
}

function normalizeProducts(data) {
  return data.map(p => ({
    "Product-title": p.title,
    "Product-description": p.description,
    "Product-price": p.price.toFixed(2),
    "Product-weight": p.weight,
    "Product-producer": p.producer,
    "Product-category": p.category,
    "Product-image-url": p.image || "./src/images/products/placeholder.jpg",
    "Matsmart-url": "#"
  }));
}

function renderByCategory(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";
  const categories = [...new Set(products.map(p => p["Product-category"]))];

  categories.forEach(category => {
    const heading = document.createElement("h2");
    heading.textContent = category;
    container.appendChild(heading);

    const row = document.createElement("div");
    row.className = "product-row";
    products
      .filter(p => p["Product-category"] === category)
      .forEach(p => row.appendChild(createProductCard(p)));

    container.appendChild(row);
  });
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${product["Product-image-url"]}" alt="${product["Product-title"]}" onerror="this.onerror=null;this.src='./src/images/products/placeholder.jpg';" />
    <h3>${product["Product-title"]}</h3>
    <h4>${product["Product-description"]}</h4>
    <p><strong>${product["Product-price"]} kr</strong></p>
    <p class="product-meta">${product["Product-weight"]} · ${product["Product-producer"]}</p>
    <a href="${product["Matsmart-url"]}" target="_blank">
      <button>Lägg i kundvagn</button>
    </a>
  `;
  return card;
}

function setupSearch() {
  const input = document.getElementById("searchInput");
  input?.addEventListener("input", () => {
    const keyword = input.value.toLowerCase();
    const filtered = allProducts.filter(p =>
      p["Product-title"].toLowerCase().includes(keyword)
    );
    renderByCategory(filtered);
  });
}

function setupFilterButtons() {
  document.getElementById("filterBtn")?.addEventListener("click", renderCategoryModal);
  document.getElementById("priceFilterBtn")?.addEventListener("click", renderPriceModal);
}

function setupModals() {
  window.addEventListener("click", e => {
    const modal = document.getElementById("filterModal");
    if (e.target === modal) {
      modal.classList.add("hidden");
      modal.classList.remove("show");
    }
  });
}

function renderCategoryModal() {
  const modal = document.getElementById("filterModal");
  const categories = [...new Set(allProducts.map(p => p["Product-category"]))];
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn modal-close-btn">&times;</span>
      <h3>Välj kategori</h3>
      <ul id="categoryList">
        <li><button data-category="all">Alla</button></li>
        ${categories.map(cat => `<li><button data-category="${cat}">${cat}</button></li>`).join("")}
      </ul>
    </div>
  `;
  modal.classList.replace("hidden", "show");

  modal.querySelectorAll("#categoryList button").forEach(btn => {
    btn.addEventListener("click", e => {
      const cat = e.target.dataset.category;
      const filtered = cat === "all" ? allProducts : allProducts.filter(p => p["Product-category"] === cat);
      renderByCategory(filtered);
      modal.classList.replace("show", "hidden");
    });
  });

  modal.querySelector(".modal-close-btn")?.addEventListener("click", () => {
    modal.classList.replace("show", "hidden");
  });
}

function renderPriceModal() {
  const modal = document.getElementById("filterModal");
  const ranges = [
    { label: "1–20 kr", min: 1, max: 20 },
    { label: "21–40 kr", min: 21, max: 40 },
    { label: "41–60 kr", min: 41, max: 60 },
    { label: "61–100 kr", min: 61, max: 100 },
    { label: "101–180 kr", min: 101, max: 180 }
  ];
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn modal-close-btn">&times;</span>
      <h3>Välj prisintervall</h3>
      <ul id="priceList">
        <li><button data-min="0" data-max="10000">Alla</button></li>
        ${ranges.map(r => `<li><button data-min="${r.min}" data-max="${r.max}">${r.label}</button></li>`).join("")}
      </ul>
    </div>
  `;
  modal.classList.replace("hidden", "show");

  modal.querySelectorAll("#priceList button").forEach(btn => {
    btn.addEventListener("click", e => {
      const min = parseFloat(e.target.dataset.min);
      const max = parseFloat(e.target.dataset.max);
      const filtered = allProducts.filter(p => {
        const price = parseFloat(p["Product-price"].replace(",", "."));
        return price >= min && price <= max;
      });
      renderByCategory(filtered);
      modal.classList.replace("show", "hidden");
    });
  });

  modal.querySelector(".modal-close-btn")?.addEventListener("click", () => {
    modal.classList.replace("show", "hidden");
  });
}

function setupSidebarToggle() {
  document.getElementById("togglesidebar")?.addEventListener("click", () => {
    document.getElementById("sidebar")?.classList.toggle("show");
  });
}
