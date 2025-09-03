// Professional E-commerce Product Management
"use strict";

// Product data and management
const productData = {
  all: [
    {
      id: 'passport',
      name: 'Grade A Passports',
      category: 'documents',
      price: 1250,
      originalPrice: 1500,
      discount: 17,
      rating: 5,
      reviews: 124,
      image: 'sideimage.jpg'
    },
    {
      id: 'clone-card',
      name: 'Premium Clone Card',
      category: 'cards',
      price: 1500,
      originalPrice: 1600,
      discount: 6,
      rating: 5,
      reviews: 89,
      image: 'logo.png'
    }
  ]
};

// Initialize product filters when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  initializeProductFilters();
  initializeCartFunctionality();
});

function initializeProductFilters() {
  const filterButtons = document.querySelectorAll('.category-filter');
  const productGrid = document.querySelector('.product-grid');

  if (!filterButtons.length || !productGrid) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.dataset.category;

      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Filter products
      filterProducts(category);
    });
  });
}

function filterProducts(category) {
  const products = document.querySelectorAll('.product-card, .product');

  products.forEach(product => {
    if (category === 'all') {
      product.style.display = 'block';
    } else {
      const productCategory = product.dataset.category ||
        product.querySelector('.product-category')?.textContent.toLowerCase().replace(/\s+/g, '-');

      if (productCategory && productCategory.includes(category)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    }
  });
}

function initializeCartFunctionality() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn, .btn.add');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();

      // Add visual feedback
      const originalText = this.textContent;
      this.textContent = 'Added!';
      this.style.background = '#28a745';

      // Reset after 2 seconds
      setTimeout(() => {
        this.textContent = originalText;
        this.style.background = '';
      }, 2000);

      // Update cart count
      updateCartCount();
    });
  });
}

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    const currentCount = parseInt(cartCount.textContent) || 0;
    cartCount.textContent = currentCount + 1;
  }
}