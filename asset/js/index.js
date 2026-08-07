    document.addEventListener('DOMContentLoaded', function() {
      const form = document.getElementById('contactForm');
      const feedback = document.getElementById('formFeedback');

        form.addEventListener('submit', function(e) {
        e.preventDefault();
        feedback.style.display = 'block';
        feedback.style.color = '#0a7e3d';
        feedback.innerHTML = '✅ ¡Mensaje enviado con éxito! Te responderemos pronto.';
        form.reset();
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 5000);
        });
    });