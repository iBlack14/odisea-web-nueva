/**
 * ODISEACLOUD — Lógica JavaScript Principal
 * Interacciones, Sticky Navbar, Menú Móvil, Filtros y Acordeón FAQ
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Sticky Effect
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileBackdrop = document.querySelector('.mobile-menu-backdrop');
  const mobileCloseBtn = document.querySelector('.mobile-close-btn');

  function openMobileMenu() {
    if (mobileMenu && mobileBackdrop) {
      mobileMenu.classList.add('open');
      mobileBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    if (mobileMenu && mobileBackdrop) {
      mobileMenu.classList.remove('open');
      mobileBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Cerrar otros acordeones si se desea
        faqItems.forEach(otherItem => otherItem.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 4. Filtro de Categorías en Servicios y Portafolio
  const filterBtns = document.querySelectorAll('.filter-btn');
  const filterItems = document.querySelectorAll('[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const targetCategory = btn.getAttribute('data-filter');

      filterItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (targetCategory === 'all' || itemCategory === targetCategory) {
          item.style.display = '';
          setTimeout(() => { item.style.opacity = '1'; }, 10);
        } else {
          item.style.display = 'none';
          item.style.opacity = '0';
        }
      });
    });
  });

  // 5. Selector Dinámico en Formulario de Contacto
  const serviceSelect = document.getElementById('contact-service-select');
  const dynamicWhatsappBtn = document.getElementById('contact-dynamic-whatsapp');

  if (serviceSelect && dynamicWhatsappBtn) {
    const updateWhatsappFromSelect = () => {
      const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
      const customMsg = selectedOption.getAttribute('data-msg') || ODISEA_CONFIG.defaultMessages.general;
      dynamicWhatsappBtn.setAttribute('href', getWhatsAppUrl(customMsg));
    };

    serviceSelect.addEventListener('change', updateWhatsappFromSelect);
    updateWhatsappFromSelect(); // Inicial
  }

  // 6. Envío Asíncrono de Formulario de Contacto y Medición de Conversión
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';

      formFeedback.style.display = 'none';
      formFeedback.className = '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Enviando mensaje...</span>`;
      }

      try {
        const formData = new FormData(contactForm);
        const actionUrl = contactForm.getAttribute('action') || 'contact.php';
        const response = await fetch(actionUrl, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        const result = await response.json().catch(() => null);

        if (response.ok && result && result.success) {
          formFeedback.style.display = 'block';
          formFeedback.style.backgroundColor = 'rgba(5, 150, 105, 0.12)';
          formFeedback.style.color = '#065f46';
          formFeedback.style.border = '1px solid #059669';
          formFeedback.textContent = result.message || '¡Mensaje enviado con éxito! Te responderemos a la brevedad.';

          const selectedService = serviceSelect ? serviceSelect.value : 'General';
          if (typeof window.odiseaTrackEvent === 'function') {
            window.odiseaTrackEvent('generate_lead', {
              event_category: 'Conversión',
              event_label: `Formulario: ${selectedService}`,
              method: 'Formulario Web',
              service: selectedService
            });
          }

          contactForm.reset();
          if (typeof updateWhatsappFromSelect === 'function') {
            updateWhatsappFromSelect();
          }
        } else {
          const errMsg = (result && result.message) ? result.message : 'No se pudo enviar el mensaje. Por favor intenta por WhatsApp o correo directo.';
          formFeedback.style.display = 'block';
          formFeedback.style.backgroundColor = 'rgba(239, 68, 68, 0.12)';
          formFeedback.style.color = '#991b1b';
          formFeedback.style.border = '1px solid #ef4444';
          formFeedback.textContent = errMsg;
        }
      } catch (err) {
        formFeedback.style.display = 'block';
        formFeedback.style.backgroundColor = 'rgba(239, 68, 68, 0.12)';
        formFeedback.style.color = '#991b1b';
        formFeedback.style.border = '1px solid #ef4444';
        formFeedback.textContent = 'Ocurrió un error al conectar con el servidor. Por favor, contáctanos directamente por WhatsApp.';
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    });
  }
});
