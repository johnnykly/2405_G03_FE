export function getBaseUrl() {
  if (!window.location.href.includes('localhost')) {
    return "https://grupp-3.vercel.app/"
  }
  return "http://localhost:3000/";
}


export async function fetchProducts(endpoint = "api/products") {
  const url = `${getBaseUrl()}${endpoint}`;
  const response = await fetch(url);
  if(response.ok){
    const data = await response.json();
    return data;
  }
  return [];    
}

export async function fetchCategories(endpoint = "api/categories") {
  const url = `${getBaseUrl()}${endpoint}`;
  const response = await fetch(url);
  if(response.ok){
    const data = await response.json();
    return data;
  }
  return [];    
}