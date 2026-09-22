/* =========================================================
   Claudia Meier — Lebensbegleiterin
   ========================================================= */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------
     Navigation
     ------------------------------------------------------ */
  var nav    = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var links  = document.getElementById('navLinks');

  toggle.addEventListener('click', function () {
    var open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    links.classList.toggle('is-open', !open);
  });
  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      toggle.setAttribute('aria-expanded', 'false');
      links.classList.remove('is-open');
    }
  });

  /* ------------------------------------------------------
     The hero stage

     The photograph is pinned for the length of the stage.
     It starts sharp and bright; as the stage travels it
     scales a little, blurs, loses a touch of opacity, and a
     warm wash rises over it — so the section below appears
     to emerge from the softened photograph rather than
     replacing it.

     Everything reads from one eased value, --p (0 → 1). The
     three headline lines leave at slightly different rates
     and the tagline goes first, which keeps the exit from
     feeling mechanical.
     ------------------------------------------------------ */
  var root  = document.documentElement;
  var stage = document.getElementById('top');
  var type  = document.querySelector('.hero__type');
  var lines = [].slice.call(document.querySelectorAll('.hero__title span'));
  var tag   = document.querySelector('.hero__tag');

  var travel  = 1;
  var ticking = false;
  var lastP   = -1;

  function measure() {
    /* how far the page scrolls while the stage stays pinned */
    travel = Math.max(1, stage.offsetHeight - window.innerHeight);
  }

  function frame() {
    ticking = false;

    var y = window.pageYOffset || root.scrollTop;
    var raw = Math.min(1, Math.max(0, y / travel));
    /* ease-in-out: nothing happens for the first few pixels, and it
       settles rather than stopping dead */
    /* a gentle S: the photograph holds sharp a moment longer at the top,
       then settles rather than stopping dead */
    var p = raw * raw * (3 - 2 * raw);

    if (p !== lastP) {
      root.style.setProperty('--p', p.toFixed(4));
      lastP = p;
    }

    nav.classList.toggle('is-set', y > window.innerHeight * 0.12);

    if (reduced) return;

    /* the block drifts up as a whole … */
    if (type) type.style.transform = 'translate3d(0,' + (-46 * p).toFixed(2) + 'px,0)';

    /* … and each line adds a little of its own, the last leaving first */
    for (var i = 0; i < lines.length; i++) {
      var lag  = 1 + i * 0.22;
      var fade = Math.max(0, 1 - p * (1.05 + i * 0.26));
      lines[i].style.transform = 'translate3d(0,' + (-20 * p * lag).toFixed(2) + 'px,0)';
      lines[i].style.opacity   = fade.toFixed(3);
    }

    /* the tagline goes before the headline does */
    if (tag) {
      tag.style.opacity   = Math.max(0, 1 - p * 2.4).toFixed(3);
      tag.style.transform = 'translate3d(0,' + (-14 * p).toFixed(2) + 'px,0)';
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(frame);
  }

  measure();
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { measure(); onScroll(); });

  /* ------------------------------------------------------
     Section reveals
     ------------------------------------------------------ */
  var items = document.querySelectorAll('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(items, function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var sibs = [].slice.call(el.parentNode.querySelectorAll('.reveal'));
        el.style.transitionDelay = Math.min(sibs.indexOf(el), 5) * 65 + 'ms';
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
