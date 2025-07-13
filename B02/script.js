// Product data
const products = [
    {
        id: 1,
        title: "Premium Prescription Drugs",
        price: "0.5 BTC",
        image: "https://via.placeholder.com/300x200",
        category: "prescription",
        description: "High-quality prescription medications",
        stock: 50,
        rating: 4.8,
        reviews: 120,
        vendor: "TrustedPharma",
        shipping: "Worldwide Express"
    },
    {
        id: 2,
        title: "Over-the-Counter Medications",
        price: "0.3 BTC",
        image: "https://via.placeholder.com/300x200",
        category: "otc",
        description: "Common OTC medications",
        stock: 100,
        rating: 4.5,
        reviews: 85,
        vendor: "MediStore",
        shipping: "Standard Shipping"
    },
    {
        id: 3,
        title: "Premium Supplements",
        price: "0.2 BTC",
        image: "https://via.placeholder.com/300x200",
        category: "supplements",
        description: "High-quality supplements",
        stock: 75,
        rating: 4.9,
        reviews: 200,
        vendor: "HealthPlus",
        shipping: "Express Shipping"
    },
    {
        id: 4,
        title: "Medical Equipment",
        price: "0.4 BTC",
        image: "https://via.placeholder.com/300x200",
        category: "equipment",
        description: "Professional medical equipment",
        stock: 30,
        rating: 4.7,
        reviews: 150,
        vendor: "MediTech",
        shipping: "Worldwide Express"
    }
];

let cart = [];
let wishlist = [];

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const featuredProducts = document.getElementById('featuredProducts');
const cartModal = document.getElementById('cartModal');
const cartCount = document.querySelector('.cart-count');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.getElementById('cartTotal');
const cartBtn = document.querySelector('.cart-btn');

function init() {
    displayProducts(products);
    setupEventListeners();
    setupCategoryCards();
}

function displayProducts(productsToShow) {
    featuredProducts.innerHTML = '';
    
    productsToShow.forEach(product => {
        const isInWishlist = wishlist.some(item => item.id === product.id);
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-badge ${product.stock < 40 ? 'low-stock' : ''}">${product.stock < 40 ? 'Low Stock' : 'In Stock'}</div>
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <button class="wishlist-btn-product ${isInWishlist ? 'active' : ''}" onclick="toggleWishlist(${product.id})">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-meta">
                    <span class="product-rating">
                        <i class="fas fa-star"></i> ${product.rating} (${product.reviews})
                    </span>
                    <span class="product-vendor">${product.vendor}</span>
                </div>
                <div class="product-price-container">
                    <p class="product-price">${product.price}</p>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
        
        productCard.addEventListener('click', (e) => {
            if (!e.target.closest('.add-to-cart-btn') && !e.target.closest('.wishlist-btn-product')) {
                showProductDetails(product);
            }
        });
        
        featuredProducts.appendChild(productCard);
    });
}

function showProductDetails(product) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <div class="modal-grid">
                <div class="modal-image-container">
                    <img src="${product.image}" alt="${product.title}" class="modal-image">
                </div>
                <div class="modal-info">
                    <h2>${product.title}</h2>
                    <p class="modal-description">${product.description}</p>
                    <div class="modal-meta">
                        <p><strong>Vendor:</strong> ${product.vendor}</p>
                        <p><strong>Rating:</strong> ${product.rating} (${product.reviews} reviews)</p>
                        <p><strong>Shipping:</strong> ${product.shipping}</p>
                        <p><strong>Stock:</strong> ${product.stock} units</p>
                    </div>
                    <p class="modal-price">${product.price}</p>
                    <div class="modal-actions">
                        <button class="buy-button" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button class="wishlist-button">
                            <i class="fas fa-heart"></i> Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.remove();
    
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCart();
        showNotification(`${product.title} added to cart!`);
    }
}

function updateCart() {
    cartCount.textContent = cart.length;
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                <p>${item.price}</p>
            </div>
            <button onclick="removeFromCart(${item.id})" class="remove-btn">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
    
    // Calculate total
    const total = cart.reduce((sum, item) => {
        return sum + parseFloat(item.price);
    }, 0);
    
    cartTotal.textContent = `${total.toFixed(2)} BTC`;
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        const removedItem = cart.splice(index, 1)[0];
        updateCart();
        showNotification(`${removedItem.title} removed from cart`);
    }
}

function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    const index = wishlist.findIndex(item => item.id === productId);
    
    if (index === -1) {
        wishlist.push(product);
        showNotification(`${product.title} added to wishlist!`);
    } else {
        wishlist.splice(index, 1);
        showNotification(`${product.title} removed from wishlist`);
    }
    
    updateWishlistUI();
    updateWishlistModal();
}

function updateWishlistUI() {
    const wishlistBtn = document.querySelector('.wishlist-btn');
    wishlistBtn.innerHTML = `
        <i class="fas fa-heart ${wishlist.length > 0 ? 'active' : ''}"></i>
        ${wishlist.length > 0 ? `<span class="wishlist-count">${wishlist.length}</span>` : ''}
    `;
}

function updateWishlistModal() {
    const wishlistItems = document.querySelector('.wishlist-items');
    if (!wishlistItems) return;

    wishlistItems.innerHTML = wishlist.map(item => `
        <div class="wishlist-item">
            <img src="${item.image}" alt="${item.title}">
            <div class="wishlist-item-info">
                <h3 class="wishlist-item-title">${item.title}</h3>
                <p class="wishlist-item-price">${item.price}</p>
                <div class="wishlist-item-actions">
                    <button class="add-to-cart" onclick="addToCart(${item.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="remove" onclick="toggleWishlist(${item.id})">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 3000);
    }, 3000);
}

function setupEventListeners() {
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    categoryFilter.addEventListener('change', handleFilter);
    sortFilter.addEventListener('change', handleFilter);

    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('active');
    });

    const closeCartBtn = document.querySelector('.close-cart-btn');
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', () => {
            cartModal.classList.remove('active');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });
}

function setupCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            categoryFilter.value = category;
            handleFilter();
            
            categoryCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });
}

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.vendor.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
}

function handleFilter() {
    const category = categoryFilter.value;
    const sortBy = sortFilter.value;
    
    let filteredProducts = [...products];
    
    if (category) {
        filteredProducts = filteredProducts.filter(product => 
            product.category === category
        );
    }
    
    // Apply sorting
    switch(sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
    }
    
    displayProducts(filteredProducts);
}

// Add some animation effects
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseout', () => {
        card.style.transform = 'scale(1)';
    });
});

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', init); 