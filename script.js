const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  navToggle.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

function updateStickyBook() {
  const stickyBook = document.getElementById('stickyBook');
  if (!stickyBook) return;

  const hero = document.querySelector('.hero');
  if (hero) {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    stickyBook.classList.toggle('visible', window.scrollY > heroBottom - 200);
  }

  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner && getComputedStyle(cookieBanner).display !== 'none') {
    stickyBook.style.bottom = (cookieBanner.offsetHeight + 12) + 'px';
  } else {
    stickyBook.style.bottom = '';
  }
}

window.updateStickyBook = updateStickyBook;
window.addEventListener('scroll', updateStickyBook);
window.addEventListener('resize', updateStickyBook);
updateStickyBook();

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
}
