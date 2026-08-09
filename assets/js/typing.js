/* Typed.js initialization for the hero typewriter effect. */
document.addEventListener('DOMContentLoaded', () => {
  if (window.Typed) {
    new Typed('#typewriterText', {
      strings: ['AI Engineer', 'Full Stack Developer', 'Problem Solver', 'Computer Science Undergraduate'],
      typeSpeed: 80,
      backSpeed: 40,
      backDelay: 1500,
      loop: true,
      showCursor: false,
      smartBackspace: true,
    });
  }
});
