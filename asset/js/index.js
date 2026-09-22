 /* ==================== THEME TOGGLE (LIGHT / DARK) ==================== */
    const themeToggle = document.getElementById('themeToggle');
    const htmlEl = document.documentElement;

    function getInitialTheme() {
      const stored = localStorage.getItem('theme');
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
      htmlEl.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }

    applyTheme(getInitialTheme());

    themeToggle?.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });

    /* ==================== MENÚ MÓVIL ==================== */
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    navToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks?.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });

    /* ==================== FILTRO PROYECTOS ==================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
          const cats = card.dataset.category.split(' ');
          const match = filter === 'all' || cats.includes(filter);
          card.style.display = match ? '' : 'none';
        });
      });
    });

    /* ==================== FORMULARIO ==================== */
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');

    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const servicio = document.getElementById('servicio').value;
      const mensaje = document.getElementById('mensaje').value;

      const texto = `Hola New Level Developers 👋%0A%0A*Nombre:* ${encodeURIComponent(nombre)}%0A*Email:* ${encodeURIComponent(email)}%0A*Servicio:* ${encodeURIComponent(servicio)}%0A%0A*Mensaje:*%0A${encodeURIComponent(mensaje)}`;
      window.open(`https://wa.me/584241871113?text=${texto}`, '_blank');

      feedback.classList.add('show');
      form.reset();

      setTimeout(() => feedback.classList.remove('show'), 5000);
    });

    /* ==================== REVEAL ON SCROLL ==================== */
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    /* ==================== LINK ACTIVO EN NAV ==================== */
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
          });
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(s => navObserver.observe(s));