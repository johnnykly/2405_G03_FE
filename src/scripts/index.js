import { fetchProducts, fetchCategories } from "../utils/api.js";

//document.addEventListener("DOMContentLoaded", loadCategories);
let selectedCategory = "Alla kategorier";
loadCategories();

document.querySelectorAll("#categorylist").forEach((btn) => {
  //console.log(btn);
  btn.addEventListener("click", (e) => {
    selectedCategory = e.target.id;
    //selectedCategory = e.target.innerHTML;
    console.log(selectedCategory);
    //selectedCategory = "alla";
    filterProducts(selectedCategory);
  });
});

filterProducts(selectedCategory);

// Function to fetch and render products
async function loadCategories() {
  const categoriesContainer = document.querySelector("#categorylist");
  categoriesContainer.innerHTML = "<p>Loading category...</p>"; // Temporary message while loading

  try {
    const categories = await fetchCategories();
    console.log(categories);
    categoriesContainer.innerHTML = ""; // Clear loading text
    if (categories.length > 0) {
      const element = document.createElement("div");
      element.className = "Alla kategorier";
      element.innerHTML = `<button id="Alla kategorier">Alla kategorier</button>`;
      categoriesContainer.appendChild(element);
      categories.forEach((category) => {
        //const categoriesList = createCategoriesList(category);
        const element = document.createElement("div");
        element.className = category.name.replace("Hem & Hushåll", "Hem & hushåll").replace("Snacks & Godis", "Snacks och godis");
        element.innerHTML = `<button id="${category.name.replace("Hem & Hushåll", "Hem & hushåll").replace("Snacks & Godis", "Snacks och godis")}">${category.name.replace("Hem & Hushåll", "Hem & hushåll").replace("Snacks & Godis", "Snacks och godis")}</button>`;
        categoriesContainer.appendChild(element);
      });
    } else {
      categoriesContainer.innerHTML = "<p>No categories available.</p>";
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    categoriesContainer.innerHTML = "<p>Failed to load categories.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadProducts);

async function filterProducts(category) {
  const products = await fetchProducts();
  //console.log(products);
  //console.log(category);
  if (category === "Alla kategorier" || category === "") {
    let filterdProducts = products.filter((prod) => prod.category);
    loadProducts(filterdProducts);
    console.log(filterdProducts);
    //return filterdProducts;
  } else {
    let filterdProducts = products.filter((prod) => prod.category === category);
    loadProducts(filterdProducts);
    console.log(filterdProducts);
    //return filterdProducts;
  }
}

// Function to fetch and render products
async function loadProducts(filterdProducts) {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "<p>Loading products...</p>"; // Temporary message while loading

  try {
    //const products = await fetchProducts();
    //const products = await filterProducts(category);
    let products = filterdProducts;
    productsContainer.innerHTML = ""; // Clear loading text
    if (products.length > 0) {
      products.forEach((product) => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
      });
    } else {
      productsContainer.innerHTML = "<p>No products available.</p>";
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    productsContainer.innerHTML = "<p>Failed to load products.</p>";
  }
}

// Function to create an individual product card
function createProductCard(product) {
  const element = document.createElement("div");
  element.className = "product-card";

  element.innerHTML = `
    <img src="${product.image}" alt="${product.title}"
      onerror="this.onerror=null; this.src='./src/images/products/placeholder.jpg';" />
    <h3>${product.title}</h3>
    <p>${product.price.toFixed(2)} kr</p>
    <button class="add-to-cart-btn">Add to Cart</button>
  `;

  element.querySelector(".add-to-cart-btn").addEventListener("click", () => {
    
    alert(`Adding ${product.name} to cart\nFunctionality not implemented yet`);
  });

  return element;
}

// Function to toggle sidemenu on mobile view
const togglesidebar = document.getElementById("togglesidebar");
togglesidebar.addEventListener("click", mySidebarToggle);

function mySidebarToggle() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("show");
}
