/* Health Mate website — small, dependency-free interactions. */
(function () {
  'use strict';

  /* ---- Mobile nav ---- */
  var toggle = document.querySelector('.nav-toggle');
  var links  = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Sticky header shadow + back-to-top visibility ---- */
  var header = document.querySelector('.site-header');
  var toTop  = document.querySelector('.to-top');

  var onScroll = function () {
    var y = window.scrollY;
    if (header) header.classList.toggle('is-stuck', y > 8);
    if (toTop)  toTop.classList.toggle('show', y > 700);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Scrollspy: highlight the nav link for the section in view ----
     Everything lives on one page now, so the nav is the only orientation
     cue the reader gets. */
  var navAnchors = [].slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  var spied = navAnchors
    .map(function (a) {
      var el = document.querySelector(a.getAttribute('href'));
      return el ? { link: a, section: el } : null;
    })
    .filter(Boolean);

  if (spied.length) {
    var setActive = function (link) {
      navAnchors.forEach(function (a) { a.removeAttribute('aria-current'); });
      if (link) link.setAttribute('aria-current', 'page');
    };

    var spy = function () {
      var probe = window.scrollY + 140;   // just under the sticky header
      var current = null;
      spied.forEach(function (entry) {
        if (entry.section.offsetTop <= probe) current = entry.link;
      });
      // Bottom of the page: always light up the last section.
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
        current = spied[spied.length - 1].link;
      }
      setActive(current);
    };

    window.addEventListener('scroll', spy, { passive: true });
    window.addEventListener('resize', spy);
    spy();
  }

  /* ---- Current year in the footer ---- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---- Reveal on scroll ---- */
  var revealables = document.querySelectorAll('.reveal');
  if (!revealables.length) return;

  if (!('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

  revealables.forEach(function (el, i) {
    el.style.transitionDelay = Math.min(i % 4, 3) * 70 + 'ms';
    io.observe(el);
  });
})();
