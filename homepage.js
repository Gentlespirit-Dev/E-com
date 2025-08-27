document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const plusBtn = document.querySelector('.plus-btn');
    const minusBtn = document.querySelector('.minus-btn');
    const quantityDisplay = document.querySelector('.quantity-display');
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    const cartIcon = document.querySelector('.cart-icon');
    const cartDropdown = document.querySelector('.cart-dropdown');
    const cartItemsCount = document.querySelector('.cart-items-count');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const cartItemDetails = document.querySelector('.cart-item-details');
    const cartItemQuantity = document.querySelector('.cart-item-quantity');
    const cartItemTotal = document.querySelector('.cart-item-total');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const deleteIcon = document.querySelector('.delete-icon');
    const lightboxModal = document.querySelector('.lightbox-modal');
    const closeLightbox = document.querySelector('.close-lightbox');
    const lightboxMainImage = document.querySelector('.lightbox-main-image');
    const lightboxThumbnails = document.querySelectorAll('.lightbox-thumbnail');
    const lightboxPrevBtn = document.querySelector('.lightbox-prev-btn');
    const lightboxNextBtn = document.querySelector('.lightbox-next-btn');

    let currentQuantity = 0;
    let currentLightboxImageIndex = 0;
    const images = ['images/image-product-1.jpg', 'images/image-product-2.jpg', 'images/image-product-3.jpg', 'images/image-product-4.jpg'];

    // Product Gallery Interaction
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
            mainImage.src = thumbnail.dataset.image;
        });
    });

    // Quantity Selector
    plusBtn.addEventListener('click', () => {
        currentQuantity++;
        quantityDisplay.textContent = currentQuantity;
    });

    minusBtn.addEventListener('click', () => {
        if (currentQuantity > 0) {
            currentQuantity--;
            quantityDisplay.textContent = currentQuantity;
        }
    });

    // Add to Cart Logic
    addToCartBtn.addEventListener('click', () => {
        if (currentQuantity > 0) {
            cartItemsCount.textContent = currentQuantity;
            cartItemsCount.style.display = 'block';
            emptyCartMessage.style.display = 'none';
            cartItemDetails.classList.add('active');
            checkoutBtn.classList.add('active');
            cartItemQuantity.textContent = currentQuantity;
            const total = (125 * currentQuantity).toFixed(2);
            cartItemTotal.textContent = `$${total}`;
        }
    });

    // Cart Dropdown
    cartIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        cartDropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!cartDropdown.contains(e.target) && !cartIcon.contains(e.target)) {
            cartDropdown.classList.remove('active');
        }
    });

    // Delete Item from Cart
    deleteIcon.addEventListener('click', () => {
        cartItemsCount.style.display = 'none';
        cartItemsCount.textContent = '0';
        emptyCartMessage.style.display = 'block';
        cartItemDetails.classList.remove('active');
        checkoutBtn.classList.remove('active');
        currentQuantity = 0;
        quantityDisplay.textContent = 0;
    });

    // Lightbox Functionality
    mainImage.addEventListener('click', () => {
        lightboxModal.classList.add('active');
        // Set initial lightbox image based on active thumbnail
        const activeThumbnail = document.querySelector('.thumbnail.active');
        if (activeThumbnail) {
            lightboxMainImage.src = activeThumbnail.dataset.image;
            currentLightboxImageIndex = Array.from(thumbnails).indexOf(activeThumbnail);
            updateLightboxThumbnails();
        }
    });

    closeLightbox.addEventListener('click', () => {
        lightboxModal.classList.remove('active');
    });

    // Lightbox Thumbnail Clicks
    lightboxThumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            currentLightboxImageIndex = index;
            lightboxMainImage.src = images[currentLightboxImageIndex];
            updateLightboxThumbnails();
        });
    });

    // Lightbox Navigation
    lightboxPrevBtn.addEventListener('click', () => {
        currentLightboxImageIndex--;
        if (currentLightboxImageIndex < 0) {
            currentLightboxImageIndex = images.length - 1;
        }
        lightboxMainImage.src = images[currentLightboxImageIndex];
        updateLightboxThumbnails();
    });

    lightboxNextBtn.addEventListener('click', () => {
        currentLightboxImageIndex++;
        if (currentLightboxImageIndex >= images.length) {
            currentLightboxImageIndex = 0;
        }
        lightboxMainImage.src = images[currentLightboxImageIndex];
        updateLightboxThumbnails();
    });

    function updateLightboxThumbnails() {
        lightboxThumbnails.forEach(t => t.classList.remove('active'));
        lightboxThumbnails[currentLightboxImageIndex].classList.add('active');
    }
});