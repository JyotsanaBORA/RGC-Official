'use client';

import { useEffect } from 'react';

export default function ClientScripts() {
  useEffect(() => {
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = matchMedia('(pointer: fine)').matches;

    document.getElementById('preloader')?.remove();

    // ── Sticky nav + progress bar + back-to-top ────────────
    const nav = document.getElementById('nav');
    const progressBar = document.getElementById('progressBar');
    const toTop = document.getElementById('toTop');

    const onScroll = () => {
      const y = window.scrollY;
      if (nav) nav.classList.toggle('is-scrolled', y > 40);
      if (toTop) toTop.classList.toggle('is-show', y > 600);
      if (progressBar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = max > 0 ? `${(y / max) * 100}%` : '0%';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // ── Mobile menu ─────────────────────────────────────────
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (toggle && links) {
      const handleToggle = () => {
        const open = links.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(open));
      };
      toggle.addEventListener('click', handleToggle);
      links.querySelectorAll('a').forEach(a =>
        a.addEventListener('click', () => {
          links.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        })
      );
    }

    // ── Services dropdown ────────────────────────────────────
    const dropdownEl = document.getElementById('navServicesDropdown');
    if (dropdownEl) {
      const dropBtn = dropdownEl.querySelector('.nav__dropdown-toggle');

      const openDropdown = () => {
        dropdownEl.classList.add('is-open');
        dropBtn.setAttribute('aria-expanded', 'true');
      };
      const closeDropdown = () => {
        dropdownEl.classList.remove('is-open');
        dropBtn.setAttribute('aria-expanded', 'false');
      };

      // Click toggle — prevent navigation, toggle dropdown on all devices
      dropBtn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        dropdownEl.classList.contains('is-open') ? closeDropdown() : openDropdown();
      });

      // Desktop: open on hover, close when pointer leaves the whole dropdown
      dropdownEl.addEventListener('mouseenter', () => {
        if (matchMedia('(pointer: fine)').matches) openDropdown();
      });
      dropdownEl.addEventListener('mouseleave', () => {
        if (matchMedia('(pointer: fine)').matches) closeDropdown();
      });

      // Close when a menu item is clicked
      dropdownEl.querySelectorAll('.nav__dropdown-menu a').forEach(a => {
        a.addEventListener('click', () => {
          closeDropdown();
          if (links) {
            links.classList.remove('is-open');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
          }
        });
      });

      // Close when clicking outside
      document.addEventListener('click', e => {
        if (!dropdownEl.contains(e.target)) closeDropdown();
      });

      // Close on Escape
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeDropdown();
      });
    }

    document.querySelectorAll('.reveal, .img-reveal').forEach(el => el.classList.add('is-visible'));

    // ── Testimonial slider ───────────────────────────────────
    const track = document.getElementById('tsliderTrack');
    const dotsWrap = document.getElementById('tDots');
    if (track && dotsWrap) {
      const cards = track.children.length;
      let current = 0, timer;
      for (let i = 0; i < cards; i++) {
        const dot = document.createElement('button');
        dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      }
      function goTo(i) {
        current = (i + cards) % cards;
        track.style.transform = `translateX(-${current * 100}%)`;
        dotsWrap.querySelectorAll('button').forEach((d, idx) => d.classList.toggle('is-active', idx === current));
        restartAuto();
      }
      function restartAuto() { clearInterval(timer); timer = setInterval(() => goTo(current + 1), 6000); }
      document.getElementById('tPrev')?.addEventListener('click', () => goTo(current - 1));
      document.getElementById('tNext')?.addEventListener('click', () => goTo(current + 1));
      goTo(0);
    }

    // ── Hero glow follow ─────────────────────────────────────
    const hero = document.querySelector('.hero');
    const glow = document.getElementById('heroGlow');
    if (hero && glow && finePointer) {
      hero.addEventListener('mousemove', e => {
        const r = hero.getBoundingClientRect();
        glow.style.setProperty('--mx', `${e.clientX - r.left}px`);
        glow.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    }

    // Hover transforms are handled in CSS to keep first render fast and stable.

    if (reducedMotion) {
      return () => { window.removeEventListener('scroll', onScroll); };
    }

    /* ═══════════════════════════════════════════════════════
       ANIME.JS — counters · edge stagger · about reveal
    ═══════════════════════════════════════════════════════ */

    // Stats counters — native easeOutExpo countup
    document.querySelectorAll('.stat__num').forEach(el => {
      const obs = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        const target = parseInt(el.dataset.count, 10);
        if (isNaN(target)) return;
        const duration = 1800;
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          el.textContent = Math.round(target * ease);
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }, { threshold: 0.6 });
      obs.observe(el);
    });

    // Edge grid items — stagger timeline
    const edgeGrid = document.querySelector('.edge__grid');
      edgeGrid?.querySelectorAll('.edge__item').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.classList.add('is-visible');
      });

    // About left text — staggered line-by-line
    const aboutLeft = document.querySelector('.about__left');
    if (aboutLeft) {
      const els = [...aboutLeft.querySelectorAll('.eyebrow, .section__title, .lead, .muted, .link-arrow')];
        els.forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'none';
          el.classList.add('is-visible');
        });
    }

    document.querySelectorAll('.tcard, .hero__title .w, .hero__content, .gallery__track img, .section__title, .ct-form-wrap').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.classList.add('is-visible');
    });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return null;
}
