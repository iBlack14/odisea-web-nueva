(() => {
  const form = document.getElementById('claims-form');
  if (!form) return;
  const status = document.getElementById('claims-status');
  const submit = document.getElementById('claims-submit');
  let csrf = '', token = '', receipt = '';
  const minor = document.getElementById('minor-check');
  minor.addEventListener('change', () => {
    document.getElementById('guardian-field').hidden = !minor.checked;
    form.elements.representante.required = minor.checked;
  });
  fetch('../reclamaciones.php', {cache: 'no-store'}).then(r => r.json()).then(data => {
    csrf = data.csrf;
    token = sessionStorage.getItem('claim-token') || crypto.randomUUID();
    sessionStorage.setItem('claim-token', token);
    if (data.provider) document.getElementById('provider-details').textContent = data.provider;
    submit.disabled = !data.ready;
    form.hidden = !data.ready;
    status.textContent = data.ready ? 'Completa los datos para registrar tu solicitud. Podrás guardar e imprimir tu constancia.' : 'El registro en línea no está disponible temporalmente. Comunícate por WhatsApp desde el botón de contacto para solicitar atención.';
  }).catch(() => { form.hidden = true; status.textContent = 'No se pudo conectar con el registro. Inténtalo nuevamente o utiliza los canales de contacto.'; });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    submit.disabled = true;
    status.textContent = 'Registrando tu solicitud…';
    const payload = new FormData(form); payload.set('csrf', csrf); payload.set('token', token);
    try {
      const response = await fetch(form.action, {method: 'POST', body: payload});
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || 'No se pudo registrar. Conserva tus datos y vuelve a intentarlo.');
      receipt = data.receipt;
      document.getElementById('claims-copy').textContent = receipt;
      document.getElementById('claims-receipt').hidden = false;
      form.hidden = true;
      sessionStorage.removeItem('claim-token');
      status.textContent = data.emailSent ? 'Solicitud registrada. Hemos solicitado el envío de una copia a tu correo. Guarda también esta constancia.' : 'Solicitud registrada. No se pudo enviar la copia por correo; descarga o imprime esta constancia. No es necesario volver a registrar tu solicitud.';
      document.getElementById('claims-receipt').scrollIntoView({behavior: 'smooth', block: 'start'});
    } catch (error) { status.textContent = error.message; submit.disabled = false; }
  });
  document.getElementById('claims-print').addEventListener('click', () => window.print());
  document.getElementById('claims-download').addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([receipt], {type: 'text/plain;charset=utf-8'}));
    const a = document.createElement('a'); a.href = url; a.download = 'constancia-reclamacion.txt'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
})();
