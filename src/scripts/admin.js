// admin.js (including Customer List functionality)

// Assuming path works for your setup, adjust if needed (e.g., '../utils/api.js')
import { fetchCategories, fetchProducts, fetchUsers } from '/src/utils/api.js'; // Added fetchUsers

document.addEventListener("DOMContentLoaded", () => {
    // --- Element Selections ---
    const cards = document.querySelectorAll(".card");
    const desktopNavLinks = document.querySelectorAll(".desktop-nav ul li a");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav ul li a");
    const contentSections = document.querySelectorAll(".content-section");
    const addProductForm = document.getElementById("addProductForm");
    const categoriesContainer = document.getElementById("categories");
    const cancelButton = addProductForm?.querySelector('.btn-cancel');

    // --- Helper Functions ---
    function hideAllSections() {
      contentSections.forEach((section) => {
        section.style.display = "none";
      });
    }

    function showSection(id) {
      const target = document.getElementById(id);
      if (target) {
        target.style.display = "block";

        // --- Trigger data loading based on section ID ---
        if (id === 'product-list') {
            loadProductList();
        } else if (id === 'category-list') {
            loadCategoryList(); 
        } else if (id === 'customer-list') {
            loadCustomerList(); // <-- ADDED THIS CALL
        } else if (id === 'order-list') {
             // loadOrderList(); // Placeholder
        }
        // --- End trigger data loading ---

      } else {
         console.warn(`Content section with id "${id}" not found in admin.html.`);
      }
    }

    // --- Data Loading Functions ---
    async function loadCategories() {
          // Code for loading categories into dropdown (as before)
          if (!categoriesContainer) {
              console.error("Category select container (#categories) not found in the DOM.");
              return; 
          }
          try {
            const categories = await fetchCategories(); 
            categoriesContainer.innerHTML = ""; 
            if (categories && categories.length > 0) {
                categoriesContainer.disabled = false; 
                const defaultOption = document.createElement("option"); // ... (rest of dropdown population)
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
            } else { // ... (handle empty categories)
                 const defaultOption = document.createElement("option");
                 defaultOption.textContent = "Inga kategorier tillgängliga";
                 defaultOption.value = "";
                 defaultOption.disabled = true;
                 categoriesContainer.appendChild(defaultOption);
                 categoriesContainer.disabled = true;
                 console.log("No categories available or failed to load.");
            }
          } catch (error) { // ... (handle error loading categories)
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
  
    async function loadCategoryList() {
      // Code for loading category list table (as before)
      const tableBody = document.getElementById('categoryListBody');
      const errorElement = document.getElementById('categoryListError');
      if (!tableBody || !errorElement) { /*...*/ return; }
      tableBody.innerHTML = `<tr><td colspan="3" style="text-align: center;">Laddar kategorier...</td></tr>`; 
      errorElement.textContent = ''; errorElement.style.display = 'none';
      try {
          const categories = await fetchCategories();
          tableBody.innerHTML = ''; 
          if (categories && categories.length > 0) {
              categories.forEach(category => { // ... (rest of category row creation)
                  const row = document.createElement('tr');
                  const name = category.name || 'Ingen namn';
                  const description = category.description || '-'; 
                  const categoryId = category._id || null; 
                  row.innerHTML = `
                      <td>${name}</td>
                      <td>${description}</td>
                      <td>
                          <button class="btn-edit-category" data-id="${categoryId}" ${!categoryId ? 'disabled' : ''} title="Requires API endpoint">Redigera</button>
                          <button class="btn-delete-category" data-id="${categoryId}" ${!categoryId ? 'disabled' : ''} title="Requires API endpoint">Ta bort</button>
                      </td>
                  `;
                  tableBody.appendChild(row);
              });
          } else { /* handle empty */ tableBody.innerHTML = `<tr><td colspan="3" style="text-align: center;">Inga kategorier hittades.</td></tr>`; }
      } catch (error) { /* handle error */ console.error("Error loading category list:", error); /*...*/ }
    }

    async function loadProductList() {
      // Code for loading product list table (as before)
      const tableBody = document.getElementById('productListBody');
      const errorElement = document.getElementById('productListError');
      if (!tableBody || !errorElement) { /*...*/ return; }
      tableBody.innerHTML = `<tr><td colspan="8" style="text-align: left;">Laddar produkter...</td></tr>`; 
      errorElement.textContent = ''; errorElement.style.display = 'none';
      try {
          const products = await fetchProducts();
          tableBody.innerHTML = ''; 
          if (products && products.length > 0) {
              products.forEach(product => { // ... (rest of product row creation including stock)
                  const row = document.createElement('tr'); /*...*/
                  const category = product.category || 'Ingen kategori';
                  const title = product.title || 'Ingen titel';
                  const producer = product.producer || '-';
                  const weight = product.weight || '-';
                  const description = product.description || '-'; 
                  const price = typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'; 
                  const productId = product._id || null; 
                  const stock = product.stock !== undefined && product.stock !== null ? product.stock : '-'; 
                  row.innerHTML = `
                      <td>${category}</td><td>${title}</td><td>${producer}</td><td>${weight}</td>
                      <td>${description}</td><td>${price}</td><td>${stock}</td>
                      <td>
                          <button class="btn-edit" data-id="${productId}" ${!productId ? 'disabled' : ''}>Redigera</button>
                          <button class="btn-delete" data-id="${productId}" ${!productId ? 'disabled' : ''}>Ta bort</button>
                      </td>`;
                  tableBody.appendChild(row);
              });
          } else { /* handle empty */ tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center;">Inga produkter hittades.</td></tr>`; }
      } catch (error) { /* handle error */ console.error("Error loading product list:", error); /*...*/ }
    }

    // --- NEW FUNCTION for Customer List ---
    async function loadCustomerList() {
        const tableBody = document.getElementById('customerListBody');
        const errorElement = document.getElementById('customerListError');

        if (!tableBody || !errorElement) {
            console.error("Customer list table body or error element not found!");
            return;
        }

        // 1. Set Loading State & Clear Errors (6 columns: FName, LName, Email, Admin, RegDate, Actions)
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center;">Laddar kunder...</td></tr>`; 
        errorElement.textContent = '';
        errorElement.style.display = 'none';

        try {
            // 2. Fetch Users (Customers) - Assumes fetchUsers uses GET /api/users
            const users = await fetchUsers();

            // 3. Clear Loading State
            tableBody.innerHTML = ''; 

            // 4. Render Users or No Users Message
            if (users && users.length > 0) {
                users.forEach(user => {
                    const row = document.createElement('tr');

                    // Extract data (assuming API doesn't send password hash!)
                    const firstName = user.firstName || '-';
                    const lastName = user.lastName || '-';
                    const email = user.email || '-';
                    const isAdmin = user.isAdmin ? 'Ja' : 'Nej'; // Format boolean
                    // Format timestamp
                    const registeredDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('sv-SE') : '-'; 
                    const userId = user._id || null; 

                    row.innerHTML = `
                        <td>${firstName}</td>
                        <td>${lastName}</td>
                        <td>${email}</td>
                        <td>${isAdmin}</td>
                        <td>${registeredDate}</td>
                        <td>
                            <button class="btn-edit-customer" data-id="${userId}" ${!userId ? 'disabled' : ''} title="Requires API endpoint">Redigera</button>
                            <button class="btn-delete-customer" data-id="${userId}" ${!userId ? 'disabled' : ''} title="Requires API endpoint">Ta bort</button>
                        </td>
                    `;
                    // NOTE: Edit/Delete buttons are placeholders. 
                    // Functionality requires backend API endpoints for user PUT/DELETE.
                    
                    tableBody.appendChild(row);
                });
            } else {
                tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center;">Inga kunder hittades.</td></tr>`;
            }

        } catch (error) {
            // 5. Handle Fetch Errors
            console.error("Error loading customer list:", error);
            tableBody.innerHTML = ''; // Clear loading state
            errorElement.textContent = 'Kunde inte ladda kundlistan. Försök igen senare.';
            errorElement.style.display = 'block';
        }
    }


    // --- Event Listeners (Navigation, Forms) ---
    // Listener for top cards
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const targetSection = card.getAttribute("data-section");
        if (targetSection) {
            hideAllSections(); // Hide first
            showSection(targetSection); // Then show (and load)
        }
      });
    });
  
    // Listener for sidebar desktop navigation links
    desktopNavLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetSection = link.getAttribute("data-section");
         if (targetSection) {
            hideAllSections(); // Hide first
            showSection(targetSection); // Then show (and load)
        }
      });
    });

    // Listener for bottom mobile navigation links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            const targetSection = link.getAttribute('data-section'); 
            if (targetSection) {
                hideAllSections(); // Hide first
                showSection(targetSection); // Then show (and load)
            }
        });
    });
  
    // Listener for Add Product form submission
    if (addProductForm) {
      addProductForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Placeholder - Task 6
        alert("Produkten har lagts till! (Placeholder)"); 
      });
    }
  
    // Listener for Add Product form Cancel button
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            hideAllSections();
             if(addProductForm) {
                 addProductForm.reset(); 
             }
             // Optional: Show a default view?
             // showSection('dashboard-section-id'); 
        });
    }
  
    // --- Initial Setup Calls ---
    loadCategories(); // Load categories for the dropdown initially

}); // --- End of DOMContentLoaded Listener ---