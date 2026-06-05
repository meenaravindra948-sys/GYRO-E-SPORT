document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    
    // Transparent to solid frosted glass on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Simple Mobile Menu Toggle Action
    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            // For full implementation, you would toggle a specific mobile class
            // Here we provide visual feedback for the demo
            mobileMenuBtn.style.color = mobileMenuBtn.style.color === 'var(--gold)' ? 'var(--text-main)' : 'var(--gold)';
            alert("Mobile navigation menu toggle triggered!");
        });
    }
});