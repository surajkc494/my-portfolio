/* Main interaction script for the portfolio experience */

document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const scrollAlpha = document.getElementById('scrollTop');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const filterButtons = document.querySelectorAll('.filter-button');
  const cards = document.querySelectorAll('.project-card[data-tags]');
  const certOverlay = document.getElementById('certificateModal');
  const certClose = document.getElementById('certificateModalClose');
  const certImage = document.getElementById('certificateModalImage');
  const certDownload = document.getElementById('certificateModalDownload');

  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 650);
    AOS.init({ duration: 900, easing: 'ease-out-cubic', once: true, mirror: false });
  });

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll('.reveal').forEach((element) => sectionObserver.observe(element));

  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const value = parseInt(entry.target.dataset.target, 10);
          const duration = 1400;
          let start = 0;
          const step = Math.ceil(value / (duration / 16));

          const animate = () => {
            start += step;
            entry.target.textContent = start >= value ? `${value}${entry.target.dataset.suffix || ''}` : `${start}${entry.target.dataset.suffix || ''}`;
            if (start < value) {
              requestAnimationFrame(animate);
            }
          };

          animate();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  const skillFills = document.querySelectorAll('.skill-fill');

  function getSkillGradient(width) {
    if (width >= 90) {
      return 'linear-gradient(135deg, #00d4ff, #7effff)';
    }
    if (width >= 75) {
      return 'linear-gradient(135deg, #66e2ff, #00b5ff)';
    }
    if (width >= 60) {
      return 'linear-gradient(135deg, #f3d44e, #f18f45)';
    }
    return 'linear-gradient(135deg, #ff5e7a, #ffb86c)';
  }

  function getSkillTrackBackground(width) {
    if (width >= 90) {
      return 'rgba(29, 217, 255, 0.52)';
    }
    if (width >= 75) {
      return 'rgba(102, 226, 255, 0.14)';
    }
    if (width >= 60) {
      return 'rgba(243, 212, 78, 0.14)';
    }
    return 'rgba(255, 94, 94, 0.29)';
  }

  function animateSkillBars() {
    skillFills.forEach((fill) => {
      const widthValue = parseInt(fill.dataset.width, 10) || 0;
      const track = fill.parentElement;
      fill.style.width = `${widthValue}%`;
      fill.style.background = getSkillGradient(widthValue);
      track.style.background = getSkillTrackBackground(widthValue);
    });
  }

  const skillsSection = document.querySelector('.skills-card');
  if (skillsSection) {
    const skillObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateSkillBars();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    skillObserver.observe(skillsSection);
  } else {
    animateSkillBars();
  }

  function highlightNav() {
    const offset = window.scrollY + 120;
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const id = section.getAttribute('id');

      if (offset >= sectionTop && offset < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.toggle(link.getAttribute('href') === `#${id}`, true);
          if (link.getAttribute('href') !== `#${id}`) link.classList.remove('active');
        });
      }
    });
  }

  window.addEventListener('scroll', () => {
    highlightNav();
    const visible = window.scrollY > 520;
    scrollAlpha.classList.toggle('visible', visible);
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;

      cards.forEach((card) => {
        const tags = card.dataset.tags.split(' ');
        const isVisible = filter === 'all' || tags.includes(filter);
        card.closest('.project-grid > .project-card, .project-grid > div')?.classList.toggle('hidden', !isVisible);
        card.style.display = isVisible ? '' : 'none';
      });
    });
  });

  if (certClose) {
    certClose.addEventListener('click', closeCertificateModal);
    certOverlay.addEventListener('click', (event) => {
      if (event.target === certOverlay) closeCertificateModal();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && certOverlay.classList.contains('open')) {
        closeCertificateModal();
      }
    });
  }

  const certificateButtons = document.querySelectorAll('[data-certificate-src]');
  certificateButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const src = button.dataset.certificateSrc;
      openCertificateModal(src);
    });
  });

  function openCertificateModal(src) {
    certImage.src = src;
    certDownload.href = src;
    certOverlay.classList.add('open');
    document.documentElement.classList.add('no-scroll');
  }

  function closeCertificateModal() {
    certOverlay.classList.remove('open');
    certImage.src = '';
    document.documentElement.classList.remove('no-scroll');
  }

  window.openCertificateModal = openCertificateModal;
});
