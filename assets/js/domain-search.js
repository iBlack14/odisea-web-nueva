document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('domain-search-form');
  if (!form) return;
  const input = document.getElementById('domain-name');
  const result = document.getElementById('domain-search-result');
  const contact = document.getElementById('domain-search-contact');
  const button = form.querySelector('button');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    contact.hidden = true;
    result.hidden = false;
    let name = input.value.trim().toLowerCase().replace(/\.$/, '');
    const exact = name.includes('.');
    try {
      if (!name || /[\s/:?#@\\]/.test(name)) throw Error();
      name = new URL('https://' + name).hostname;
      if (name.length > 245 || !name.split('.').every(label => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label)) || (exact && !/^[a-z]{2,63}$/.test(name.split('.').at(-1)))) throw Error();
    } catch {
      result.textContent = 'Escribe una marca o dominio válido, como soytimmy o soytimmy.com, sin enlaces ni espacios.';
      input.focus(); return;
    }
    const extensions = ['com', 'net', 'org', 'io', 'co', 'online', 'site', 'store', 'tech', 'app'];
    const domains = exact ? [name] : extensions.map(ext => name + '.' + ext);
    button.disabled = true;
    button.textContent = 'Consultando…';
    form.setAttribute('aria-busy', 'true');
    result.replaceChildren();
    const heading = document.createElement('p');
    heading.className = 'domain-results-heading';
    heading.textContent = exact ? 'Resultado para tu dominio' : '10 sugerencias para tu marca';
    result.append(heading);
    const filters = document.createElement('div'); filters.className = 'domain-result-filters';
    filters.setAttribute('role', 'group'); filters.setAttribute('aria-label', 'Filtrar resultados');
    result.append(filters);
    let activeFilter = 'all';
    const filterButtons = [];
    const empty = document.createElement('p'); empty.className = 'domain-filter-empty'; empty.hidden = true;
    const applyFilter = () => {
      let visible = 0;
      rows.forEach(({row}) => {
        row.hidden = activeFilter !== 'all' && row.dataset.state !== activeFilter;
        if (!row.hidden) visible++;
      });
      filterButtons.forEach(({element, value, label}) => {
        element.setAttribute('aria-pressed', String(activeFilter === value));
        const count = value === 'all' ? rows.length : rows.filter(({row}) => row.dataset.state === value).length;
        element.textContent = label + ' (' + count + ')';
      });
      empty.hidden = visible !== 0;
      empty.textContent = 'No hay resultados en este filtro.';
    };
    for (const [value, label] of [['all','Todas'],['available','Disponibles'],['taken','Ocupadas'],['unknown','Sin verificar']]) {
      const element = document.createElement('button'); element.type = 'button';
      element.addEventListener('click', () => {activeFilter = value; applyFilter();});
      filterButtons.push({element,value,label}); filters.append(element);
    }
    const rows = domains.map(domain => {
      const row = document.createElement('div'); row.className = 'domain-result-row';
      row.dataset.state = 'pending';
      const title = document.createElement('strong'); title.textContent = domain;
      const status = document.createElement('span'); status.textContent = 'Consultando…';
      row.append(title, status); result.append(row);
      return {domain,row,status};
    });
    result.append(empty); applyFilter();
    const note = document.createElement('p');
    note.className = 'domain-search-hint';
    note.textContent = 'La disponibilidad se confirma al completar el registro. Puedes buscar otra extensión escribiendo el dominio completo.';
    result.append(note);
    try {
      await Promise.allSettled(rows.map(async ({domain,row,status}) => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 12000);
        try {
          const response = await fetch('/domain-check.php?domain=' + encodeURIComponent(domain), {signal:controller.signal, headers:{Accept:'application/json'}});
          const data = await response.json();
          if (response.ok && data.result === 'available') {
            row.dataset.state = 'available';
            status.textContent = 'Disponible'; status.className = 'domain-status-available';
            const link = document.createElement('a'); link.className = 'btn btn-primary'; link.textContent = 'Solicitar';
            link.href = 'https://wa.me/51994282396?text=' + encodeURIComponent('Hola, OdiseaCloud. Quisiera registrar ' + domain + '.');
            link.target = '_blank'; link.rel = 'noopener noreferrer'; row.append(link);
          } else if (response.ok && data.result === 'taken') {
            row.dataset.state = 'taken';
            status.textContent = 'No disponible';
          } else {
            row.dataset.state = 'unknown';
            status.textContent = response.status === 429 ? 'Espera un momento y vuelve a buscar' : 'Sin verificar · consultar por WhatsApp';
          }
        } catch { row.dataset.state = 'unknown'; status.textContent = 'Sin verificar · consultar por WhatsApp'; }
        finally { clearTimeout(timeout); applyFilter(); }
      }));
    } finally {
      button.disabled = false; button.textContent = 'Buscar dominio'; form.removeAttribute('aria-busy');
      contact.href = 'https://wa.me/51994282396?text=' + encodeURIComponent('Hola, OdiseaCloud. Quisiera asesoría para elegir un dominio para ' + name + '.');
      contact.textContent = '¿Necesitas ayuda o trasladar tu dominio? Escríbenos'; contact.hidden = false;
    }
  });
  const initialQuery = new URLSearchParams(window.location.search).get('q');
  if (initialQuery) {
    input.value = initialQuery.slice(0, 245);
    form.requestSubmit();
  }
});
