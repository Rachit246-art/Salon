/* ============================================
   LUMIÈRE BEAUTY SALON – script.js
   ============================================ */

/* ---- Page Loader ---- */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('page-loader');
    if (loader) loader.classList.add('hidden');
  }, 2000);
});

/* ---- GSAP + ScrollTrigger ---- */
gsap.registerPlugin(ScrollTrigger);

/* ---- Scroll Progress Bar ---- */
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('scroll-progress').style.width = (scrollTop / docHeight * 100) + '%';
});

/* ---- Sticky Navbar ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ---- Active Nav on Scroll ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

/* ---- Smooth Scroll ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      const collapse = document.getElementById('navMenu');
      if (collapse && collapse.classList.contains('show')) {
        bootstrap.Collapse.getInstance(collapse)?.hide();
      }
    }
  });
});

/* ---- Typed Text Animation ---- */
function initTyped() {
  const words = ['Pure Art', 'Elegance', 'Confidence', 'Radiance', 'You'];
  const el = document.querySelector('.typed-text');
  if (!el) return;
  let wordIndex = 0, charIndex = 0, isDeleting = false;

  function type() {
    const current = words[wordIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }
    let speed = isDeleting ? 60 : 110;
    if (!isDeleting && charIndex === current.length) {
      speed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 400;
    }
    setTimeout(type, speed);
  }
  setTimeout(type, 2200);
}

/* ---- Hero Entrance (GSAP) ---- */
function initHeroAnimations() {
  const tl = gsap.timeline({ delay: 2.1 });
  tl.fromTo('.hero-badge',     { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    .fromTo('.hero-title',     { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
    .fromTo('.hero-desc',      { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    .fromTo('.hero-btns',      { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    .fromTo('.hero-stats',     { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    .fromTo('.hero-visual',    { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }, '-=0.7')
    .fromTo('.hero-scroll-hint', { opacity: 0 },      { opacity: 1, duration: 0.5 }, '-=0.2');
}

/* ---- Scroll-Triggered Animations ---- */
function initAnimations() {
  document.querySelectorAll('[data-gsap="fade-up"]').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: 0.8,
      delay: parseFloat(el.dataset.delay || 0),
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });
  document.querySelectorAll('[data-gsap="fade-right"]').forEach(el => {
    gsap.fromTo(el, { opacity: 0, x: -60 }, {
      opacity: 1, x: 0, duration: 0.9,
      delay: parseFloat(el.dataset.delay || 0),
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
    });
  });
  document.querySelectorAll('[data-gsap="fade-left"]').forEach(el => {
    gsap.fromTo(el, { opacity: 0, x: 60 }, {
      opacity: 1, x: 0, duration: 0.9,
      delay: parseFloat(el.dataset.delay || 0),
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
    });
  });
}

/* ---- Counter Animation ---- */
function initCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: parseInt(el.dataset.count), duration: 2.2, ease: 'power2.out',
          onUpdate: function () { el.textContent = Math.round(this.targets()[0].val).toLocaleString(); }
        });
      }
    });
  });
}

/* ---- Swiper Testimonials ---- */
function initSwiper() {
  new Swiper('.testimonials-swiper', {
    slidesPerView: 1, spaceBetween: 24, loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
  });
}

/* ---- Portfolio Filter ---- */
function initPortfolioFilter() {
  const btns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.port-item');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      items.forEach(item => {
        if (filter === 'all' || item.dataset.cat === filter) {
          item.classList.remove('hidden');
          gsap.fromTo(item, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' });
        } else {
          gsap.to(item, { opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in', onComplete: () => item.classList.add('hidden') });
        }
      });
    });
  });
}

/* ---- Back to Top ---- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400));
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---- Service Card Glow ---- */
function initServiceGlow() {
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      const glow = card.querySelector('.service-glow');
      if (glow) glow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(201,169,110,0.14), transparent 60%)`;
    });
  });
}

/* ---- Navbar Toggler Animation ---- */
function initTogglerAnim() {
  const toggler = document.querySelector('.navbar-toggler');
  const spans = toggler?.querySelectorAll('span');
  if (!toggler || !spans) return;
  toggler.addEventListener('click', () => {
    const isOpen = toggler.getAttribute('aria-expanded') === 'true';
    if (!isOpen) {
      gsap.to(spans[0], { rotation: 45, y: 7, duration: 0.3 });
      gsap.to(spans[1], { opacity: 0, duration: 0.2 });
      gsap.to(spans[2], { rotation: -45, y: -7, duration: 0.3 });
    } else {
      gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
      gsap.to(spans[1], { opacity: 1, duration: 0.2 });
      gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
    }
  });
}

/* ---- Parallax on Hero Shapes ---- */
function initParallax() {
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    gsap.to('.shape-1', { x: x * 1.2, y: y * 1.2, duration: 1.5, ease: 'power1.out' });
    gsap.to('.shape-2', { x: -x * 0.8, y: -y * 0.8, duration: 1.5, ease: 'power1.out' });
    gsap.to('.shape-3', { x: x * 0.5, y: y * 0.5, duration: 1.5, ease: 'power1.out' });
  });
}

/* ---- Init All ---- */
document.addEventListener('DOMContentLoaded', () => {
  initTyped();
  initHeroAnimations();
  initAnimations();
  initCounters();
  initSwiper();
  initPortfolioFilter();
  initBackToTop();
  initServiceGlow();
  initTogglerAnim();
  initParallax();
});
