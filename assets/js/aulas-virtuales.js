/**
 * ODISEACLOUD — Aulas Virtuales & eLearning (Servicio 05)
 * Lógica interactiva para pestañas de mockup (Campus, En Vivo, Certificados),
 * simulación de evaluación y sincronización de acordeón FAQ.
 */
(() => {
  'use strict';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const stage = document.querySelector('.av-demo-stage');
  const tabs = [...document.querySelectorAll('[data-av-view]')];
  let active = 'campus';
  let revision = 0;
  let animations = [];

  const cancel = () => {
    animations.forEach(a => a.cancel());
    animations = [];
  };

  const animate = (element, frames, options) => {
    if (!element) return Promise.resolve();
    const animation = element.animate(frames, options);
    animations.push(animation);
    return animation.finished.catch(() => {});
  };

  const enter = panel => {
    if (!panel) return Promise.resolve();
    const targets = [...panel.querySelectorAll(
      '.av-browser-frame, .av-live-stage, .av-eval-card, .av-cert-card, ' +
      '.av-course, .av-live-banner, .av-live-pip-teacher'
    )].filter(e => e.getClientRects().length);

    return Promise.all(targets.map((element, index) => animate(element, [
      { opacity: 0, transform: 'translateY(16px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], {
      duration: 480,
      delay: Math.min(index, 6) * 45,
      easing: 'cubic-bezier(.22, 1, .36, 1)',
      fill: 'backwards'
    })));
  };

  async function select(tab) {
    if (!tab || active === tab.dataset.avView) return;
    active = tab.dataset.avView;
    const current = ++revision;
    cancel();

    tabs.forEach(button => {
      const isSelected = button === tab;
      button.setAttribute('aria-selected', String(isSelected));
      button.tabIndex = isSelected ? 0 : -1;
    });

    const oldPanel = stage ? stage.querySelector('.av-demo-panel:not([hidden])') : null;
    if (oldPanel && !reduced.matches) {
      await animate(oldPanel, [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(-8px)' }
      ], { duration: 140, fill: 'forwards', easing: 'ease-in' });
    }

    if (current !== revision) return;
    cancel();

    const next = document.getElementById(`av-panel-${active}`);
    if (stage) {
      stage.querySelectorAll('.av-demo-panel').forEach(panel => {
        panel.hidden = panel !== next;
      });
    }

    if (!reduced.matches && next) {
      await enter(next);
    }
    if (current === revision) cancel();
  }

  // Event listeners para las pestañas
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      const direction = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
      if (!direction) return;
      event.preventDefault();
      const nextTab = tabs[(index + direction + tabs.length) % tabs.length];
      nextTab.focus();
      select(nextTab);
    });
  });

  // Escucha cambios en preferencias de movimiento
  reduced.addEventListener('change', () => {
    if (!reduced.matches) return;
    ++revision;
    cancel();
    if (stage) {
      stage.querySelectorAll('.av-demo-panel').forEach(panel => {
        panel.hidden = panel.id !== `av-panel-${active}`;
      });
    }
  });

  // Simulación interactiva de examen en pestaña de evaluaciones
  document.querySelectorAll('.av-eval-option').forEach(option => {
    option.addEventListener('click', () => {
      const parent = option.closest('.av-eval-options');
      if (parent) {
        parent.querySelectorAll('.av-eval-option').forEach(opt => opt.classList.remove('selected'));
      }
      option.classList.add('selected');
    });
  });

  // Interacciones de la clase en vivo tipo Google Meet / Zoom
  document.querySelectorAll('.av-dock-circle-btn, .av-hero-ctl, .av-meet-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('btn-mic')) {
        const isMuted = btn.classList.toggle('muted');
        btn.classList.toggle('active', !isMuted);
        btn.title = isMuted ? 'Micrófono silenciado' : 'Micrófono activo';
      } else if (btn.classList.contains('btn-hand')) {
        const isRaised = btn.classList.toggle('hand-active');
        const badges = document.querySelectorAll('.av-meet-tile.student-camila .hand-icon, .av-hero-student-tile .hand-badge');
        badges.forEach(b => { b.style.display = isRaised ? 'block' : 'none'; });
      } else if (btn.classList.contains('btn-reaction')) {
        const emojis = ['👏', '❤️', '🎉', '🔥', '💡'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        const floatEl = document.createElement('div');
        floatEl.textContent = randomEmoji;
        floatEl.style.cssText = 'position:fixed; pointer-events:none; z-index:9999; font-size:26px; animation:avFloatHeart 1s ease-out forwards;';
        const rect = btn.getBoundingClientRect();
        floatEl.style.left = `${rect.left + rect.width / 2 - 13}px`;
        floatEl.style.top = `${rect.top - 12}px`;
        document.body.appendChild(floatEl);
        setTimeout(() => floatEl.remove(), 1000);
      }
    });
  });

  // Pestañas internas del panel de clase en vivo (Chat vs Encuestas)
  document.querySelectorAll('.av-meet-tab-item').forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      const parent = tabBtn.closest('.av-meet-sidebar-col');
      if (!parent) return;
      parent.querySelectorAll('.av-meet-tab-item').forEach(b => b.classList.remove('active'));
      tabBtn.classList.add('active');
      const target = tabBtn.dataset.meetTab;
      const chatView = parent.querySelector('.av-meet-chat-container');
      const pollView = parent.querySelector('.av-meet-poll-container');
      if (chatView && pollView) {
        chatView.style.display = target === 'chat' ? 'flex' : 'none';
        pollView.style.display = target === 'polls' ? 'flex' : 'none';
      }
    });
  });

  // Simulación de verificación interactiva del código QR
  document.querySelectorAll('.av-qr-verify-action-btn, .av-qr-visual-box, .av-hero-chip.bottom').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
      const toast = document.createElement('div');
      toast.className = 'av-qr-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 28px;
        right: 28px;
        background: #0f172a;
        color: #ffffff;
        border: 1.5px solid #10b981;
        box-shadow: 0 16px 40px rgba(0,0,0,0.4);
        padding: 16px 20px;
        border-radius: 14px;
        z-index: 10000;
        font-family: var(--font-main);
        display: flex;
        align-items: center;
        gap: 14px;
        animation: avFloatY 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      `;
      toast.innerHTML = `
        <div style="width:36px; height:36px; border-radius:50%; background:#10b981; color:#fff; display:flex; align-items:center; justify-content:center; flex:none;">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div>
          <b style="display:block; font-size:0.88rem; color:#34d399; margin-bottom:2px;">✦ Certificado 100% Auténtico y Verificado</b>
          <span style="font-size:0.76rem; color:#cbd5e1; display:block;">Estudiante: Alonso Gabriel Castro • ID: ODS-2026-9812-PE</span>
          <span style="font-size:0.68rem; color:#94a3b8; font-family:monospace;">SHA256: 7f83b1657ff1...26d9069 • Validez Oficial Permanente</span>
        </div>
        <button style="background:none; border:none; color:#94a3b8; cursor:pointer; font-size:1.1rem; padding:4px;" onclick="this.parentElement.remove()">✕</button>
      `;
      document.body.appendChild(toast);
      setTimeout(() => {
        if (toast.parentElement) {
          toast.style.opacity = '0';
          toast.style.transition = 'opacity 0.4s ease';
          setTimeout(() => toast.remove(), 400);
        }
      }, 5000);
    });
  });

  // Animaciones de entrada por IntersectionObserver
  if (!reduced.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (entry.target === stage) {
          if (revision === 0) {
            enter(stage.querySelector('.av-demo-panel:not([hidden])'));
          }
          return;
        }
        animate(entry.target, [
          { opacity: 0, transform: 'translateY(20px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], {
          duration: 600,
          fill: 'backwards',
          easing: 'cubic-bezier(.22, 1, .36, 1)'
        });
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(
      '.av-demo-stage, .av-features .feature-card, .av-technologies .tech-badge, ' +
      '.av-page .workflow-card, .av-overview-layout'
    ).forEach(el => observer.observe(el));
  }
})();
