import { fetchCategories, fetchProducts } from '/src/utils/api.js'; 

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    const desktopNavLinks = document.querySelectorAll(".desktop-nav ul li a");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav ul li a");
    const contentSections = document.querySelectorAll(".content-section");
    const addProductForm = document.getElementById("addProductForm");
    const categoriesContainer = document.getElementById("categories");
    const cancelButton = addProductForm?.querySelector('.btn-cancel');

    function hideAllSections() {
      contentSections.forEach((section) => {
        section.style.display = "none";
      });
    }

function showSection(id) {
  const target = document.getElementById(id);
  if (target) {
    target.style.display = "block";

    if (id === 'product-list') {
        loadProductList();
    } else if (id === 'category-list') {
    } else if (id === 'customer-list') {
    } else if (id === 'order-list') {
    }
  } else {
     console.warn(`Content section with id "${id}" not found in admin.html.`);
  }
}
async function loadCategories() {
      if (!categoriesContainer) {
          console.error("Category select container (#categories) not found in the DOM.");
          return; 
      }

      try {
        const categories = await fetchCategories(); 
        categoriesContainer.innerHTML = "";

        if (categories && categories.length > 0) {
            categoriesContainer.disabled = false; 
            const defaultOption = document.createElement("option");
            defaultOption.textContent = "Välj kategori";
            defaultOption.value = "";
            defaultOption.disabled = true;
            defaultOption.selected = true;
            categoriesContainer.appendChild(defaultOption);

            
            categories.forEach((category) => {
                const element = document.createElement("option");
                element.value = category.name;
                element.textContent = category.name; 
                categoriesContainer.appendChild(element);
            });
        } else {
             const defaultOption = document.createElement("option");
             defaultOption.textContent = "Inga kategorier tillgängliga";
             defaultOption.value = "";
             defaultOption.disabled = true;
             categoriesContainer.appendChild(defaultOption);
             categoriesContainer.disabled = true;
             console.log("No categories available or failed to load.");
        }
      } catch (error) {
        console.error("Error loading categories:", error);
         const errorOption = document.createElement("option");
         errorOption.textContent = "Kunde inte ladda kategorier";
         errorOption.value = "";
         errorOption.disabled = true;
         categoriesContainer.innerHTML = '';
         categoriesContainer.appendChild(errorOption);
         categoriesContainer.disabled = true;
      }
    }
  
// NAVIGATION //
    cards.forEach((card) => {
      card.addEventListener("click", () => {
      const targetSection = card.getAttribute("data-section");
    if (targetSection) {
        hideAllSections();
        showSection(targetSection);
    }
  });
});

    desktopNavLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetSection = link.getAttribute("data-section");
         if (targetSection) {
            hideAllSections();
            showSection(targetSection);
        }
      });
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            const targetSection = link.getAttribute('data-section'); 
            if (targetSection) {
                hideAllSections(); 
                showSection(targetSection);
            }
        });
    });
  
// PRODUKTLISTA //
async function loadProductList() {
  const tableBody = document.getElementById('productListBody');
  const errorElement = document.getElementById('productListError');

  if (!tableBody || !errorElement) {
      console.error("Product list table body or error element not found!");
      return;
  }

  tableBody.innerHTML = `<tr><td colspan="8" style="text-align: left;">Laddar produkter...</td></tr>`; 
  errorElement.textContent = '';
  errorElement.style.display = 'none';

  try {
      const products = await fetchProducts();
      tableBody.innerHTML = ''; 

      if (products && products.length > 0) {
          products.forEach(product => {
              const row = document.createElement('tr');

              const category = product.category || 'Ingen kategori';
              const title = product.title || 'Ingen titel';
              const producer = product.producer || '-';
              const weight = product.weight || '-';
              const description = product.description || '-'; 
              const price = typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'; 
              const productId = product._id || null; 
              const stock = product._stock || null; 

              row.innerHTML = `
                  <td>${category}</td>
                  <td>${title}</td>
                  <td>${producer}</td>
                  <td>${weight}</td>
                  <td>${description}</td> 
                  <td>${price}</td>
                  <td>${stock}</td>
                  <td>
                      <button class="btn-edit" data-id="${productId}" ${!productId ? 'disabled' : ''}>Redigera</button>
                      <button class="btn-delete" data-id="${productId}" ${!productId ? 'disabled' : ''}>Ta bort</button>
                  </td>
              `;
              
              tableBody.appendChild(row);
          });
      } else {
          tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center;">Inga produkter hittades.</td></tr>`;
      }

  } catch (error) {
      console.error("Error loading product list:", error);
      tableBody.innerHTML = '';
      errorElement.textContent = 'Kunde inte ladda produktlistan. Försök igen senare.';
      errorElement.style.display = 'block';
  }
}

// LÄGG TILL PRODUKT //
    if (addProductForm) {
      addProductForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Produkten har lagts till!"); 
      });
    }

  
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            hideAllSections();
             if(addProductForm) {
                 addProductForm.reset(); 
             }
        });
    }
  
loadCategories(); 
});