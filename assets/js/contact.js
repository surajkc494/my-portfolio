/* Contact form interaction and submission feedback. */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    setTimeout(() => {
      submitButton.textContent = 'Send Message';
      submitButton.disabled = false;
      form.reset();
      successMessage.style.display = 'inline-block';
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 3200);
    }, 1400);
  });
});
