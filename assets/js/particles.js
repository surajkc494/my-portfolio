/* Particles.js initialization for the hero section. */
document.addEventListener('DOMContentLoaded', () => {
  if (window.particlesJS) {
    particlesJS('heroParticles', {
      particles: {
        number: { value: 70, density: { enable: true, value_area: 900 } },
        color: { value: ['#00d4ff', '#76e3ff', '#ffffff'] },
        shape: { type: 'circle' },
        opacity: { value: 0.3, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 160, color: '#00d4ff', opacity: 0.12, width: 1 },
        move: { enable: true, speed: 1.2, direction: 'none', random: false, straight: false, attract: { enable: false } },
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { grab: { distance: 180, line_linked: { opacity: 0.25 } }, push: { particles_nb: 4 } },
      },
      retina_detect: true,
    });
  }
});
