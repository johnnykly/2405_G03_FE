//import { fetchCategories } from "/src/utils/api.js";

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    const desktopNavLinks = document.querySelectorAll(".desktop-nav ul li a");
    const contentSections = document.querySelectorAll(".content-section");
    const bottomNavParents = document.querySelectorAll(".has-submenu");
    const bottomNavSubLinks = document.querySelectorAll(".sub-menu li a");
    
async function fetchCategories() {
  //! DONT USE THIS IN PRODUCTION
  const url = `https://grupp-3.vercel.app/api/categories`;
  const response = await fetch(url);
  if(response.ok){
    const data = await response.json();
    return data;
  }
  return [];    
}

async function loadCategories() {
  const categoriesContainer = document.getElementById("categories");

  try {
    const categories = await fetchCategories();
    categoriesContainer.innerHTML = ""; // Clear loading text

    if (categories.length > 0) {
      categories.forEach((category) => {
          const element = document.createElement("option");
          element.innerHTML = category.name;
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

 loadCategories()

    function hideAllSections() {
      contentSections.forEach((section) => {
        section.style.display = "none";
      });
    }
  
    function showSection(id) {
      const target = document.getElementById(id);
      if (target) {
        target.style.display = "block";
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        hideAllSections();
        const targetSection = card.getAttribute("data-section");
        showSection(targetSection);
      });
    });
  
    desktopNavLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        hideAllSections();
        const targetSection = link.getAttribute("data-section");
        showSection(targetSection);
      });
    });
  
    function attachSubmenuEvents() {
      bottomNavParents.forEach((parentLi) => {
        const parentLink = parentLi.querySelector("a");
  
  
        if (window.innerWidth <= 1024) {
          
          parentLink.addEventListener("click", (e) => {
            e.preventDefault();
            
            bottomNavParents.forEach((li) => {
              if (li !== parentLi) li.classList.remove("open");
            });
            
            parentLi.classList.toggle("open");
          });
        } else {
          
          parentLi.addEventListener("mouseenter", () => {
            parentLi.classList.add("open");
          });
          parentLi.addEventListener("mouseleave", () => {
            parentLi.classList.remove("open");
          });
          
          parentLink.addEventListener("click", (e) => {
            e.preventDefault();
          });
        }
      });
    }
  
    attachSubmenuEvents();
  
    
    bottomNavSubLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        hideAllSections();
        const targetSection = link.getAttribute("data-section");
        showSection(targetSection);
        
        const parentLi = link.closest(".has-submenu");
        if (parentLi) {
          parentLi.classList.remove("open");
        }
      });
    });
  
    
    const addProductForm = document.getElementById("addProductForm");
    if (addProductForm) {
      addProductForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Produkten har lagts till (dummy funktion)!");
        addProductForm.reset();
      });
    }
})