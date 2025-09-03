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
        <img src="${product.image}" alt="${product.name}" loading="lazy" style="width:220px;height:220px;object-fit:cover;">
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <div class="price">$${product.price.toFixed(2)}</div>
        <div class="product-review" style="margin:8px 0;padding:8px 12px;background:#f5f7fa;border-left:4px solid #007bff;font-style:italic;color:#333;font-size:1rem;box-shadow:0 1px 4px rgba(0,0,0,0.04);display:flex;align-items:center;">
          <span style="margin-right:8px;font-size:1.2em;color:#007bff;">&#9998;</span>${product.quickReview ? product.quickReview : ''}
        </div>
        <p class="description">${product.description || ''}</p>
        <button class="add-to-cart-btn" data-product-id="${product._id || product.id}">
          <i class="fas fa-shopping-cart"></i> Add to Cart
        </button>
        <button class="quick-review-btn" data-product-id="${product._id || product.id}">
          <i class="fas fa-eye"></i> Quick Review
        </button>
      </div>
    `;
    container.appendChild(el);
  });
}

// Usage example (to be placed in each product page):
// fetchProducts('documents').then(products => renderProducts(products, '.product-grid'));
