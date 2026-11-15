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

  // 2. Ventana flotante de contacto: fallback sincronizado con el botón, incluso si el script defer se retrasa.
  const floatingContact = document.querySelector('[data-floating-contact]');
  if (floatingContact && !floatingContact.dataset.contactReady) {
    floatingContact.dataset.contactReady = 'true';
    const contactToggle = floatingContact.querySelector('[data-floating-toggle]');
    const contactPanel = floatingContact.querySelector('.floating-contact-panel');
    const contactClose = floatingContact.querySelector('[data-floating-close]');
    const setContactOpen = (open, restoreFocus = false) => {
      floatingContact.classList.toggle('is-open', open);
      contactToggle?.setAttribute('aria-expanded', String(open));
      contactToggle?.setAttribute('aria-label', open ? 'Cerrar ventana de contacto' : 'Abrir ventana de contacto por WhatsApp');
      contactPanel?.setAttribute('aria-hidden', String(!open));
      if (contactPanel) contactPanel.inert = !open;
      if (restoreFocus) contactToggle?.focus({ preventScroll: true });
    };
    contactToggle?.addEventListener('click', () => setContactOpen(!floatingContact.classList.contains('is-open')));
    contactClose?.addEventListener('click', () => {
      floatingContact.dataset.contactDismissed = 'true';
      setContactOpen(false, true);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && floatingContact.classList.contains('is-open')) setContactOpen(false, true);
    });
    document.addEventListener('click', event => {
      if (floatingContact.classList.contains('is-open') && !floatingContact.contains(event.target)) setContactOpen(false);
    });
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.setTimeout(() => {
        if (!floatingContact.dataset.contactDismissed && !floatingContact.classList.contains('is-open')) setContactOpen(true);
      }, 2000);
    }
    contactToggle?.addEventListener('click', () => {
      if (floatingContact.classList.contains('is-open')) floatingContact.dataset.contactDismissed = 'true';
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item, index) => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      const answer = item.querySelector('.faq-answer');
      questionBtn.type = 'button';
      questionBtn.id ||= 'faq-question-' + index;
      questionBtn.setAttribute('aria-expanded', String(item.classList.contains('active')));
      if (answer) {
        answer.id ||= 'faq-answer-' + index;
        questionBtn.setAttribute('aria-controls', answer.id);
        answer.setAttribute('aria-labelledby', questionBtn.id);
      }
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Cerrar otros acordeones si se desea
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        });
        if (!isActive) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
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

  // 6. Formulario de Contacto Seguro con Protección Anti-Bot Multicapa
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && formFeedback) {
    let tokenPromise = null;
    let tokenAcquiredAt = 0;

    // Obtener token firmado de seguridad (HMAC-SHA256) desde el backend
    const fetchSecurityToken = async () => {
      try {
        const actionUrl = contactForm.getAttribute('action') || 'contact.php';
        const tokenUrl = actionUrl + (actionUrl.includes('?') ? '&' : '?') + 'action=token';
        const res = await fetch(tokenUrl, { cache: 'no-store' });
        const data = await res.json();
        if (data && data.success && data.token && data.timestamp) {
          const tsInput = document.getElementById('form_timestamp');
          const tokInput = document.getElementById('form_security_token');
          if (tsInput) tsInput.value = data.timestamp;
          if (tokInput) tokInput.value = data.token;
          tokenAcquiredAt = Date.now();
          return data;
        }
      } catch (err) {
        console.warn('Seguridad: no se pudo obtener token previo', err);
      }
      return null;
    };

    // Pre-cargar token en cuanto la página esté lista o ante primera interacción
    fetchSecurityToken();
    ['focusin', 'mouseenter', 'touchstart'].forEach(evt => {
      contactForm.addEventListener(evt, () => {
        // Renovar si pasaron más de 30 minutos
        if (!tokenAcquiredAt || (Date.now() - tokenAcquiredAt > 1800000)) {
          fetchSecurityToken();
        }
      }, { once: true, passive: true });
    });

    let contactSubmitting = false;
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (contactSubmitting) return;

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';

      formFeedback.style.display = 'block';
      formFeedback.style.backgroundColor = 'rgba(14, 165, 233, 0.12)';
      formFeedback.style.color = '#0369a1';
      formFeedback.style.border = '1px solid #0ea5e9';
      formFeedback.innerHTML = '<span>Verificando seguridad y enviando tu consulta...</span>';

      contactSubmitting = true;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Enviando...</span>';
      }

      try {
        // Asegurar que el token esté presente
        const tokInput = document.getElementById('form_security_token');
        if (!tokInput || !tokInput.value) {
          await fetchSecurityToken();
        }

        // Si el usuario llenó con un gestor ultrarrápido en menos de 3.2 segundos desde la carga del token,
        // esperar el breve remanente para respetar el time-lock de contact.php sin molestar al usuario real
        if (tokenAcquiredAt > 0) {
          const elapsedMs = Date.now() - tokenAcquiredAt;
          if (elapsedMs < 3200) {
            await new Promise(resolve => setTimeout(resolve, 3200 - elapsedMs));
          }
        }

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
          formFeedback.innerHTML = '<strong>¡Mensaje recibido con éxito!</strong> ' + (result.message || 'Nos pondremos en contacto contigo a la brevedad.');

          const selectedService = serviceSelect ? serviceSelect.value : 'General';
          if (typeof window.odiseaTrackEvent === 'function') {
            window.odiseaTrackEvent('generate_lead', {
              event_category: 'Conversión',
              event_label: 'Formulario: ' + selectedService,
              method: 'Formulario Web',
              service: selectedService
            });
          }

          contactForm.reset();
          if (typeof updateWhatsappFromSelect === 'function') {
            updateWhatsappFromSelect();
          }
          // Obtener token fresco para siguiente envío
          setTimeout(fetchSecurityToken, 1000);
        } else {
          const errMsg = (result && result.message) ? result.message : 'No se pudo enviar el mensaje.';
          formFeedback.style.display = 'block';
          formFeedback.style.backgroundColor = 'rgba(239, 68, 68, 0.12)';
          formFeedback.style.color = '#991b1b';
          formFeedback.style.border = '1px solid #ef4444';
          formFeedback.textContent = errMsg;

          // Si el token expiró o fue inválido, renovarlo silenciosamente
          fetchSecurityToken();
        }
      } catch (err) {
        console.error('Error al enviar formulario:', err);
        const email = document.getElementById('email') ? document.getElementById('email').value : '';
        const nombre = document.getElementById('nombre') ? document.getElementById('nombre').value : '';
        const servicio = serviceSelect ? serviceSelect.value : 'Consulta General';
        const mensaje = document.getElementById('mensaje') ? document.getElementById('mensaje').value : '';
        
        let mailtoUrl = 'mailto:contacto@odiseacloud.com';
        if (typeof getMailtoUrl === 'function') {
          mailtoUrl = getMailtoUrl('Consulta desde web: ' + servicio, 'Nombre: ' + nombre + '\nCorreo: ' + email + '\n\nMensaje:\n' + mensaje);
        }

        formFeedback.style.display = 'block';
        formFeedback.style.backgroundColor = '#FEF3C7';
        formFeedback.style.color = '#92400E';
        formFeedback.style.border = '1px solid #F59E0B';
        formFeedback.innerHTML = 'Hubo una dificultad de red al procesar tu consulta. Puedes <a href="' + mailtoUrl + '" style="text-decoration: underline; font-weight: bold; color: #92400E;">hacer clic aquí para enviar por correo directo</a> o escribirnos vía WhatsApp.';
      } finally {
        contactSubmitting = false;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    });
  }
});
