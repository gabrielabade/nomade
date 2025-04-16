document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    // Ensure the event listener is properly attached
    mobileMenuBtn.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default behavior
      e.stopPropagation(); // Stop event from bubbling up
      
      // Toggle the navigation menu
      navLinks.classList.toggle('open');
      
      // Update the menu button icon and accessibility attributes
      if (navLinks.classList.contains('open')) {
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevent scrolling while menu is open
      } else {
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Re-enable scrolling
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (window.innerWidth <= 768 &&
          navLinks.classList.contains('open') &&
          !navLinks.contains(event.target) &&
          !mobileMenuBtn.contains(event.target)) {
        navLinks.classList.remove('open');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking a navigation link
    document.querySelectorAll('.nav-link, .mobile-social-pill').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('open');
          mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });
  }
});

// Efeito de confete
function criarConfete() {
  const pixContainer = document.querySelector('.pix-container');

  for (let i = 0; i < 50; i++) {
    const confete = document.createElement('div');
    confete.classList.add('confete');

    const cores = ['#4D77FF', '#FF4D6D', '#FFA447', '#02C39A'];
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];

    confete.style.backgroundColor = corAleatoria;
    confete.style.left = Math.random() * 100 + '%';
    confete.style.width = Math.random() * 8 + 3 + 'px';
    confete.style.height = Math.random() * 4 + 2 + 'px';
    confete.style.opacity = Math.random() + 0.5;
    confete.style.animation = `confete ${Math.random() * 2 + 1}s ease-in forwards`;

    pixContainer.appendChild(confete);
    setTimeout(() => confete.remove(), 3000);
  }
}

// Debounce
function debounce(func, wait = 100) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}