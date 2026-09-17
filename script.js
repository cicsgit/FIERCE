// theme toggle

function getTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light';
}

function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  try { localStorage.setItem('fierceTheme', theme); } catch (e) {}
}

function initThemeToggle() {
  // handles both the desktop and mobile drawer toggles
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    });
  });
}

// mobile hamburger nav

function initHamburger() {
  const btn    = document.getElementById('nav-hamburger');
  const drawer = document.getElementById('nav-drawer');
  const header = document.querySelector('.site-header');
  if (!btn || !drawer) return;

  function open() {
    drawer.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
  }

  function close() {
    drawer.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', () => {
    btn.getAttribute('aria-expanded') === 'true' ? close() : open();
  });

  // close on escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });

  // close if you click outside the header
  document.addEventListener('click', e => {
    if (header && !header.contains(e.target)) close();
  });

  // close when a link inside the drawer is clicked
  drawer.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
}

// scroll fade-in for sections

function initFadeIn() {
  const sections = document.querySelectorAll('.section');
  if (!sections.length) return;

  if (!('IntersectionObserver' in window)) {
    sections.forEach(s => s.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  sections.forEach(s => observer.observe(s));
}

// team card flip

function setCardState(card, flipped) {
  card.classList.toggle('is-flipped', flipped);
  card.setAttribute('aria-pressed', String(flipped));
  const front = card.querySelector('.person-front');
  const back  = card.querySelector('.person-back');
  if (front) front.setAttribute('aria-hidden', String(flipped));
  if (back)  back.setAttribute('aria-hidden',  String(!flipped));
}

function initTeamCards() {
  document.querySelectorAll('.person-card').forEach(card => {
    setCardState(card, false);
    card.addEventListener('click', () => {
      setCardState(card, !card.classList.contains('is-flipped'));
    });
  });
}

// count up animation for stats

function initCountUp() {
  const nums = document.querySelectorAll('[data-count]');
  if (!nums.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseInt(el.dataset.countDelay || '400', 10);
      observer.unobserve(el);

      setTimeout(() => {
        const target   = parseFloat(el.dataset.count);
        const suffix   = el.dataset.suffix || '';
        const prefix   = el.dataset.prefix || '';
        const duration = 1200;
        const t0       = performance.now();

        function tick(now) {
          const p = Math.min((now - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = prefix + Math.round(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      }, delay);
    });
  }, { threshold: 0.8 });

  nums.forEach(el => observer.observe(el));
}

// back to top button

function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// faq accordion with smooth height animation

function initFaqAnimation() {
  document.querySelectorAll('.faq details').forEach(detail => {
    const summary = detail.querySelector('summary');
    const body    = detail.querySelector('.faq-body');
    if (!summary || !body) return;

    summary.addEventListener('click', e => {
      e.preventDefault();

      if (detail.open) {
        // animate close
        body.style.height = body.scrollHeight + 'px';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          body.style.height = '0';
        }));
        body.addEventListener('transitionend', () => {
          detail.removeAttribute('open');
          body.style.height = '';
        }, { once: true });
      } else {
        // animate open
        detail.setAttribute('open', '');
        const h = body.scrollHeight;
        body.style.height = '0';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          body.style.height = h + 'px';
        }));
        body.addEventListener('transitionend', () => {
          body.style.height = '';
        }, { once: true });
      }
    });
  });
}

// lightbox for gallery photos

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const imgEl    = document.getElementById('lightbox-img');
  const backdrop = document.getElementById('lightbox-backdrop');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn  = document.getElementById('lightbox-prev');
  const nextBtn  = document.getElementById('lightbox-next');
  const counter  = document.getElementById('lightbox-counter');
  const items    = Array.from(document.querySelectorAll('.photo-grid-item img'));
  let current    = 0;

  function updateCounter() {
    if (counter) counter.textContent = (current + 1) + ' / ' + items.length;
  }

  function showImage(index, instant) {
    if (instant) {
      imgEl.src = items[index].src;
      imgEl.alt = items[index].alt;
      updateCounter();
      return;
    }
    imgEl.classList.add('is-switching');
    setTimeout(() => {
      imgEl.src = items[index].src;
      imgEl.alt = items[index].alt;
      imgEl.classList.remove('is-switching');
      updateCounter();
    }, 160);
  }

  function open(index) {
    current = index;
    showImage(current, true);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function prev() {
    current = (current - 1 + items.length) % items.length;
    showImage(current, false);
  }

  function next() {
    current = (current + 1) % items.length;
    showImage(current, false);
  }

  items.forEach((img, i) => {
    img.closest('.photo-grid-item').addEventListener('click', () => open(i));
  });

  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  prevBtn.addEventListener('click', e => { e.stopPropagation(); prev(); });
  nextBtn.addEventListener('click', e => { e.stopPropagation(); next(); });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
  });
}

// scroll progress bar at the top of the page

function initScrollProgress() {
  const root = document.documentElement;
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (root.scrollHeight - root.clientHeight) * 100;
    root.style.setProperty('--scroll-progress', Math.min(pct, 100) + '%');
  }, { passive: true });
}

// shrink nav when user scrolls down

function initNavScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 80);
  }, { passive: true });
}

// ripple effect on button clicks

function initRipple() {
  document.querySelectorAll('.btn, .cta-button').forEach(btn => {
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.addEventListener('click', function(e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top  = (e.clientY - rect.top)  + 'px';
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}

// adds page-loaded class to trigger hero entrance animations

function initPageLoad() {
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.documentElement.classList.add('page-loaded');
  }));
}

// set footer year dynamically

function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

// run everything on dom ready

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initHamburger();
  initFadeIn();
  initTeamCards();
  initCountUp();
  initBackToTop();
  initFaqAnimation();
  initLightbox();
  initYear();
  initScrollProgress();
  initNavScroll();
  initRipple();
  initPageLoad();
});
