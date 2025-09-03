// product-api.js
// Reusable script to fetch and render products from backend API

async function fetchProducts(category = null) {
  let url = 'https://backend-crqd.onrender.com/products';
  if (category) url += `?category=${encodeURIComponent(category)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch products');
  return await res.json();
}

function renderProducts(products, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.innerHTML = '';
  products.forEach(product => {
    const el = document.createElement('article');
    el.className = 'product-card';
    el.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <div class="price">$${product.price.toFixed(2)}</div>
        <p class="description">${product.description || ''}</p>
        <button class="add-to-cart-btn" data-product-id="${product.id}">
          <i class="fas fa-shopping-cart"></i> Add to Cart
        </button>
      </div>
    `;
    container.appendChild(el);
  });
}

// Usage example (to be placed in each product page):
// fetchProducts('documents').then(products => renderProducts(products, '.product-grid'));
