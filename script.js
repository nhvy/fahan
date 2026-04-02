(() => {
  const qs = (sel, el = document) => el.querySelector(sel);
  const qsa = (sel, el = document) => Array.from(el.querySelectorAll(sel));

  const navToggle = qs('.nav-toggle');
  const nav = qs('#site-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    qsa('a', nav).forEach((a) => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const slider = qs('[data-slider]');
  if (slider) {
    const slides = qsa('[data-slide]', slider);
    const dots = qsa('[data-dot]', slider);
    const prevBtn = qs('[data-prev]', slider);
    const nextBtn = qs('[data-next]', slider);

    let index = 0;
    let timer = null;

    const setActive = (nextIndex) => {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
      dots.forEach((d, i) => {
        const active = i === index;
        d.classList.toggle('is-active', active);
        d.setAttribute('aria-selected', active ? 'true' : 'false');
      });
    };

    const start = () => {
      stop();
      timer = window.setInterval(() => setActive(index + 1), 7000);
    };

    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = null;
    };

    prevBtn?.addEventListener('click', () => {
      setActive(index - 1);
      start();
    });

    nextBtn?.addEventListener('click', () => {
      setActive(index + 1);
      start();
    });

    dots.forEach((d, i) => {
      d.addEventListener('click', () => {
        setActive(i);
        start();
      });
    });

    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    window.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else start();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        setActive(index - 1);
        start();
      }
      if (e.key === 'ArrowRight') {
        setActive(index + 1);
        start();
      }
    });

    setActive(0);
    start();
  }

  const copyBtn = qs('[data-copy-account]');
  const copyStatus = qs('[data-copy-status]');
  const accountNumber = '5600666477';

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(accountNumber);
        if (copyStatus) copyStatus.textContent = 'Account number copied.';
      } catch {
        if (copyStatus) copyStatus.textContent = 'Copy failed. Please copy manually: ' + accountNumber;
      }

      window.setTimeout(() => {
        if (copyStatus) copyStatus.textContent = '';
      }, 3500);
    });
  }
})();
