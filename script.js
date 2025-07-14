document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopButton = document.querySelector('.scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) { // Show button after scrolling 200px
            scrollToTopButton.classList.add('show');
        } else {
            scrollToTopButton.classList.remove('show');
        }
    });

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll to top
        });
    });

    // Newsletter Form Validation
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (email === "") {
                alert("Please enter your email address.");
                return false;
            }

            // Basic email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address.");
                return false;
            }

            alert("Thank you for subscribing to our newsletter!");
            emailInput.value = ""; // Clear the input field
            return true;
        });
    }

    // Make entire blog card clickable
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        const link = card.querySelector('h3 a');
        if (link) {
            card.style.cursor = 'pointer'; // Indicate it's clickable
            card.addEventListener('click', () => {
                window.location.href = link.href; // Navigate to the blog post
            });
        }
    });

    // Burger menu functionality
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }

    // Blog Search Functionality
    const blogSearchInput = document.getElementById('blog-search');
    const blogGrid = document.querySelector('.blog-grid');
    const blogCardsArray = Array.from(document.querySelectorAll('.blog-card'));

    if (blogSearchInput && blogGrid) {
        blogSearchInput.addEventListener('keyup', (event) => {
            const searchTerm = event.target.value.toLowerCase();

            blogCardsArray.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const tag = card.querySelector('.tag').textContent.toLowerCase();

                if (title.includes(searchTerm) || tag.includes(searchTerm)) {
                    card.style.display = 'block'; // Show the card
                } else {
                    card.style.display = 'none'; // Hide the card
                }
            });
        });
    }

    // Load More Blogs functionality
    const loadMoreButton = document.getElementById('load-more-blogs');
    const hiddenBlogCards = Array.from(document.querySelectorAll('.blog-card.hidden'));
    let cardsToShow = 4; // Number of cards to show per click

    // Initially show the first few cards if they are hidden
    for (let i = 0; i < Math.min(cardsToShow, hiddenBlogCards.length); i++) {
        hiddenBlogCards[i].classList.remove('hidden');
    }

    if (loadMoreButton) {
        // Hide the button if there are no more hidden cards after initial display
        if (hiddenBlogCards.length <= cardsToShow) {
            loadMoreButton.style.display = 'none';
        }

        loadMoreButton.addEventListener('click', () => {
            const currentlyHiddenCards = Array.from(document.querySelectorAll('.blog-card.hidden'));
            let cardsRevealed = 0;

            for (let i = 0; i < currentlyHiddenCards.length && cardsRevealed < cardsToShow; i++) {
                currentlyHiddenCards[i].classList.remove('hidden');
                cardsRevealed++;
            }

            // Hide the button if all cards are now visible
            if (document.querySelectorAll('.blog-card.hidden').length === 0) {
                loadMoreButton.style.display = 'none';
            }
        });
    }
});
