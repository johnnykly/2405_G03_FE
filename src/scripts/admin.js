import { 
  fetchCategories, fetchProducts, fetchUsers, 
  addProduct, deleteProduct, fetchProductById, updateProduct 
} from '/src/utils/api.js'; 

document.addEventListener("DOMContentLoaded", () => {
  let isEditMode = false;         
  let editingProductId = null;    

  const cards = document.querySelectorAll(".card");
  const desktopNavLinks = document.querySelectorAll(".desktop-nav ul li a");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav ul li a");
  const contentSections = document.querySelectorAll(".content-section");
  const addProductForm = document.getElementById("addProductForm");
  const categoriesContainer = document.getElementById("categories");
  const cancelButton = addProductForm?.querySelector('.btn-cancel');
  const productListTableBody = document.getElementById('productListBody'); 
  const addProductSubmitButton = addProductForm?.querySelector('button[type="submit"]');

  function hideAllSections() {
    contentSections.forEach((section) => {
      section.style.display = "none";
    });
  }

  function showSection(id) {
    const target = document.getElementById(id);
    if (target) {
      hideAllSections(); 
      target.style.display = "block";
      if (id === 'product-list') { loadProductList(); } 
      else if (id === 'category-list') { loadCategoryList(); } 
      else if (id === 'customer-list') { loadCustomerList(); } 
      else if (id === 'order-list') {  }
      
  
      if (id !== 'product-add') {
          resetEditMode();
      }

    } else { console.warn(`Content section with id "${id}" not found.`); }
  }
  
  
  function resetEditMode() {
      isEditMode = false;
      editingProductId = null;
      if (addProductSubmitButton) {
           addProductSubmitButton.textContent = 'Lägg till produkt';
      }
      if (addProductForm) {
          addProductForm.reset();
      }
      const hiddenInput = addProductForm?.querySelector('input[name="editProductId"]');
      if (hiddenInput) hiddenInput.remove();
  }


  async function loadCategories() {
        if (!categoriesContainer) { return; }
        try { 
           const categories = await fetchCategories(); categoriesContainer.innerHTML = ""; 
           if (categories && categories.length > 0) { categoriesContainer.disabled = false; const defaultOption = document.createElement("option"); defaultOption.textContent = "Välj kategori"; defaultOption.value = ""; defaultOption.disabled = true; defaultOption.selected = true; categoriesContainer.appendChild(defaultOption); categories.forEach((category) => { const element = document.createElement("option"); element.value = category.name; element.textContent = category.name; categoriesContainer.appendChild(element); });
           } else { const defaultOption = document.createElement("option"); defaultOption.textContent = "Inga kategorier tillgängliga"; defaultOption.value = ""; defaultOption.disabled = true; categoriesContainer.appendChild(defaultOption); categoriesContainer.disabled = true; console.log("No categories available."); }
        } catch (error) { console.error("Error loading categories:", error); const errorOption = document.createElement("option"); errorOption.textContent = "Kunde inte ladda kategorier"; errorOption.value = ""; errorOption.disabled = true; categoriesContainer.innerHTML = ''; categoriesContainer.appendChild(errorOption); categoriesContainer.disabled = true; }
  }

  async function loadCategoryList() {
    const tableBody = document.getElementById('categoryListBody'); const errorElement = document.getElementById('categoryListError');
    if (!tableBody || !errorElement) { return; }
    tableBody.innerHTML = `<tr><td colspan="3" style="text-align: center;">Laddar kategorier...</td></tr>`; 
    errorElement.textContent = ''; errorElement.style.display = 'none';
    try {
        const categories = await fetchCategories(); tableBody.innerHTML = ''; 
        if (categories && categories.length > 0) { categories.forEach(category => { const row = document.createElement('tr'); const name = category.name || 'Ingen namn'; const description = category.description || '-'; const categoryId = category._id || null; row.innerHTML = `<td>${name}</td><td>${description}</td><td> <button class="btn-edit-category" data-id="${categoryId}" ${!categoryId ? 'disabled' : ''} title="Requires API endpoint">Redigera</button> <button class="btn-delete-category" data-id="${categoryId}" ${!categoryId ? 'disabled' : ''} title="Requires API endpoint">Ta bort</button> </td>`; tableBody.appendChild(row); });
        } else { tableBody.innerHTML = `<tr><td colspan="3" style="text-align: center;">Inga kategorier hittades.</td></tr>`; }
    } catch (error) { console.error("Error loading category list:", error); tableBody.innerHTML = ''; errorElement.textContent = 'Kunde inte ladda kategorilistan.'; errorElement.style.display = 'block'; }
  }

  async function loadProductList() {
    const tableBody = document.getElementById('productListBody'); const errorElement = document.getElementById('productListError');
    if (!tableBody || !errorElement) { return; }
    tableBody.innerHTML = `<tr><td colspan="8" style="text-align: left;">Laddar produkter...</td></tr>`; 
    errorElement.textContent = ''; errorElement.style.display = 'none';
    try {
        const products = await fetchProducts(); tableBody.innerHTML = ''; 
        if (products && products.length > 0) { products.forEach(product => { const row = document.createElement('tr'); const category = product.category || 'Ingen kategori'; const title = product.title || 'Ingen titel'; const producer = product.producer || '-'; const weight = product.weight || '-'; const description = product.description || '-'; const price = typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'; const productId = product._id || null; const stock = product.stock !== undefined && product.stock !== null ? product.stock : '-'; row.innerHTML = `<td>${category}</td><td>${title}</td><td>${producer}</td><td>${weight}</td><td>${description}</td><td>${price}</td><td>${stock}</td><td><button class="btn-edit" data-id="${productId}" ${!productId ? 'disabled' : ''}>Redigera</button> <button class="btn-delete" data-id="${productId}" ${!productId ? 'disabled' : ''}>Ta bort</button></td>`; tableBody.appendChild(row); });
        } else { tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center;">Inga produkter hittades.</td></tr>`; }
    } catch (error) { console.error("Error loading product list:", error); tableBody.innerHTML = ''; errorElement.textContent = 'Kunde inte ladda produktlistan.'; errorElement.style.display = 'block'; }
  }

  async function loadCustomerList() {
      const tableBody = document.getElementById('customerListBody'); const errorElement = document.getElementById('customerListError');
      if (!tableBody || !errorElement) { return; }
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center;">Laddar kunder...</td></tr>`; 
      errorElement.textContent = ''; errorElement.style.display = 'none';
      try { 
          const users = await fetchUsers(); tableBody.innerHTML = ''; 
          if (users && users.length > 0) { users.forEach(user => { const row = document.createElement('tr'); const firstName = user.firstName || '-'; const lastName = user.lastName || '-'; const email = user.email || '-'; const isAdmin = user.isAdmin ? 'Ja' : 'Nej'; const registeredDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('sv-SE') : '-'; const userId = user._id || null; row.innerHTML = `<td>${firstName}</td><td>${lastName}</td><td>${email}</td><td>${isAdmin}</td><td>${registeredDate}</td><td> <button class="btn-edit-customer" data-id="${userId}" ${!userId ? 'disabled' : ''} title="Requires API endpoint">Redigera</button> <button class="btn-delete-customer" data-id="${userId}" ${!userId ? 'disabled' : ''} title="Requires API endpoint">Ta bort</button></td>`; tableBody.appendChild(row); });
          } else { tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center;">Inga kunder hittades.</td></tr>`; }
      } catch (error) { console.error("Error loading customer list:", error); tableBody.innerHTML = ''; errorElement.textContent = 'Kunde inte ladda kundlistan.'; errorElement.style.display = 'block';}
  }


  async function handleDeleteProduct(productId) {
      console.log(`handleDeleteProduct called for ID: ${productId}`);
      if (typeof deleteProduct !== 'function') { alert("Fel: deleteProduct function missing."); return; }
      try {
          const result = await deleteProduct(productId); 
          if (result.success) { alert(`Produkt ${productId} borttagen!`); loadProductList(); } 
          else { const errorMsg = result.error?.message || 'Okänt fel'; const statusMsg = result.status ? ` (${result.status})` : ''; alert(`Kunde inte ta bort produkt ${productId}: ${errorMsg}${statusMsg}`); }
      } catch (error) { console.error(`Error in handleDeleteProduct:`, error); alert(`Fel vid borttagning.`); }
  }

  async function handleEditProduct(productId) {
      console.log(`handleEditProduct called for ID: ${productId}`);
      if (!productId) return;

      const product = await fetchProductById(productId);

      if (!product) {
          alert(`Kunde inte hämta produktdata för ID: ${productId}`);
          return;
      }

      const titleInput = document.getElementById('productTitle');
      const categorySelect = document.getElementById('categories');
      const producerInput = document.getElementById('productProducer');
      const weightInput = document.getElementById('productWeight');
      const descriptionTextarea = document.getElementById('productDescription');
      const priceInput = document.getElementById('forsaljningspris');
      const stockInput = document.getElementById('lager'); 
      const imageInput = document.getElementById('productImage');

      if (titleInput) titleInput.value = product.title || '';
      if (categorySelect) categorySelect.value = product.category || '';
      if (producerInput) producerInput.value = product.producer || '';
      if (weightInput) weightInput.value = product.weight || '';
      if (descriptionTextarea) descriptionTextarea.value = product.description || '';
      if (priceInput) priceInput.value = product.price || '';
      if (stockInput) stockInput.value = product.stock !== undefined && product.stock !== null ? product.stock : '';
      if (imageInput) imageInput.value = product.image || '';


      isEditMode = true;
      editingProductId = productId;

       if (addProductSubmitButton) {
           addProductSubmitButton.textContent = 'Uppdatera produkt';
       }

      showSection('product-add'); 
      addProductForm?.scrollIntoView({ behavior: 'smooth' });
  }


  cards.forEach((card) => { card.addEventListener("click", () => { const target = card.getAttribute("data-section"); if(target) { showSection(target); } }); });
  desktopNavLinks.forEach((link) => { link.addEventListener("click", (e) => { e.preventDefault(); const target = link.getAttribute("data-section"); if(target) { showSection(target); } }); });
  mobileNavLinks.forEach(link => { link.addEventListener('click', (e) => { e.preventDefault(); const target = link.getAttribute('data-section'); if(target) { showSection(target); } }); });

  if (addProductForm) {
    addProductForm.addEventListener("submit", async (e) => { 
      e.preventDefault(); 
      
      const titleInput = document.getElementById('productTitle');
      const categorySelect = document.getElementById('categories');
      const producerInput = document.getElementById('productProducer');
      const weightInput = document.getElementById('productWeight');
      const descriptionTextarea = document.getElementById('productDescription');
      const priceInput = document.getElementById('forsaljningspris');
      const stockInput = document.getElementById('lager'); 
      const imageInput = document.getElementById('productImage');

      if (!titleInput?.value || !categorySelect?.value || !priceInput?.value) {
           alert('Fyll i åtminstone Titel, Kategori och Pris.');
           return; 
       }
      const productData = {
        title: titleInput.value.trim(),
        category: categorySelect.value, 
        producer: producerInput.value.trim(),
        weight: weightInput.value.trim(), 
        description: descriptionTextarea.value.trim(),
        price: parseFloat(priceInput.value) || 0, 
        stock: parseInt(stockInput.value) || 0, 
        image: imageInput.value.trim() 
      };
      console.log("Form submitted. Edit Mode:", isEditMode, "Data:", productData);


      if (isEditMode && editingProductId) {
           console.log(`Attempting to update product ID: ${editingProductId}`);
           try {
               const result = await updateProduct(editingProductId, productData); 
               if (result.success) {
                   alert(`Produkt ${editingProductId} uppdaterad!`);
                   resetEditMode();
                   showSection('product-list');
               } else {
                   const errorMsg = result.error?.message || 'Okänt fel från API';
                   const statusMsg = result.status ? ` (Status: ${result.status})` : '';
                   alert(`Kunde inte uppdatera produkt: ${errorMsg}${statusMsg}`);
               }
           } catch (error) {
               console.error("Error updating product:", error);
               alert("Ett nätverksfel eller annat fel inträffade vid uppdatering.");
           }

      } else {
          console.log("Attempting to call addProduct API...");
          try {
            const result = await addProduct(productData);
            if (result.success) {
              alert("Produkt tillagd!"); 
              resetEditMode();
              showSection('product-list');
            } else {
              const errorMsg = result.error?.message || 'Okänt fel från API';
              const statusMsg = result.status ? ` (Status: ${result.status})` : '';
              alert(`Kunde inte lägga till produkt: ${errorMsg}${statusMsg}`);
            }
          } catch (error) {
             console.error("Error submitting product:", error);
             alert("Ett nätverksfel eller annat fel inträffade vid tillägg.");
          }
      }
    });
  }

  if (cancelButton) {
      cancelButton.addEventListener('click', () => {
          resetEditMode();
          hideAllSections(); 
      });
  }

  if (productListTableBody) {
      productListTableBody.addEventListener('click', (event) => {
          const target = event.target; 

          const editButton = target.closest('.btn-edit'); 
          if (editButton) {
              const productId = editButton.getAttribute('data-id');
              handleEditProduct(productId); 
              return; 
          }

          const deleteButton = target.closest('.btn-delete');
          if (deleteButton) {
              const productId = deleteButton.getAttribute('data-id');
              if (confirm(`Är du säker på att du vill ta bort produkt ${productId}?`)) {
                 handleDeleteProduct(productId); 
              }
              return; 
          }
      });
  }


  loadCategories();
})