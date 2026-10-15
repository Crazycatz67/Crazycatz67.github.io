// Portfolio behaviour: tiny, optional, no dependencies. Every page works without it
// (monogram shows, LinkedIn stays hidden, images stand in for videos).
//
// Owner settings — edit these two lines:
//   LINKEDIN_URL: paste the full https://www.linkedin.com/in/... URL to show the
//                 LinkedIn links (elements with [data-linkedin]); '' keeps them hidden.
//   PHOTO_URL:    set to 'assets/photo.jpg' once that file exists. Kept as a setting
//                 (not auto-probed) because probing a missing file logs a 404 in the
//                 console on every visit.
const LINKEDIN_URL = '';
const PHOTO_URL = '';

(function () {
  'use strict';

  if (LINKEDIN_URL) {
    document.querySelectorAll('[data-linkedin]').forEach(function (el) {
      el.querySelectorAll('a').forEach(function (a) { a.href = LINKEDIN_URL; });
      if (el.tagName === 'A') el.href = LINKEDIN_URL;
      el.hidden = false;
    });
  }

  // Photo replaces the "FA" monogram only after it actually loads, so a bad path
  // still leaves the monogram instead of a broken-image icon.
  if (PHOTO_URL) {
    document.querySelectorAll('[data-avatar]').forEach(function (box) {
      const img = new Image();
      img.alt = 'Photo of Farhan Amin';
      img.width = 288; img.height = 288;
      img.onload = function () { box.textContent = ''; box.appendChild(img); };
      // Pages live at different depths; data-root holds the relative path to the site root.
      img.src = (box.getAttribute('data-root') || '') + PHOTO_URL;
    });
  }

  // Demo videos (when the owner adds them) are written WITHOUT autoplay so nothing
  // moves before we know the user's motion preference; start them here, or give
  // reduced-motion users the poster plus controls.
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('video[data-demo]').forEach(function (v) {
    if (reduce.matches) {
      v.controls = true;
    } else {
      const p = v.play();
      if (p && p.catch) p.catch(function () { v.controls = true; });
    }
  });
})();
