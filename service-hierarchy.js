// Arrange existing service content at build time, preserving each page's design.
module.exports = function organizeService(html) {
  const main = /(<main\b[^>]*>)([\s\S]*?)(<\/main>)/i.exec(html);
  if (!main) return html;
  const source = main[2]
    .replace(/<!-- SERVICE-NAV:START -->[\s\S]*?<!-- SERVICE-NAV:END -->/g, '')
    .replace(/<!-- SERVICE-(?:RELATED|PRICING):(?:START|END) -->/g, '');
  // Skip comments and raw-text elements so demo markup inside scripts is untouched.
  const tokens = /<!--[\s\S]*?-->|<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>|<\/?section\b[^>]*>/gi;
  const sections = [];
  let depth = 0, start = 0, previousEnd = 0;
  for (const token of source.matchAll(tokens)) {
    if (!/^<\/?section\b/i.test(token[0])) continue;
    if (/^<section/i.test(token[0])) {
      if (depth++ === 0) start = token.index;
    } else if (--depth === 0) {
      const end = token.index + token[0].length;
      sections.push({ before: source.slice(previousEnd, start), content: source.slice(start, end), index: sections.length });
      previousEnd = end;
    }
  }
  if (depth !== 0 || sections.length < 3) throw new Error('Unable to organize service sections');
  const text = value => value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const entries = [];
  for (const section of sections) {
    const opening = section.content.match(/^<section\b[^>]*>/i)[0];
    const classes = opening.match(/class="([^"]*)"/)?.[1] || '';
    const title = text(section.content.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/i)?.[1] || '');
    let order = 35, label;
    if (section.index === 0) order = 0;
    else if (/stats/.test(classes)) order = 10;
    else if (/overview|sys-context/.test(classes)) { order = 20; label = 'Resumen'; }
    else if (/features|capabilities/.test(classes)) { order = 30; label = 'Qué incluye'; }
    else if (/showcase/.test(classes)) { order = 40; label = 'Vista previa'; }
    else if (/technologies|stack|architecture/.test(classes) || /Tecnologías e integraciones/i.test(title)) order = 50;
    else if (/guide|sys-team/.test(classes)) order = 60;
    else if (/process/.test(classes) || /puesta en marcha|paso a paso|cómo trabajamos/i.test(title)) { order = 70; label = 'Cómo trabajamos'; }
    else if (/service-pricing-section/.test(classes)) { order = 80; label = 'Precios'; }
    else if (/faq/.test(classes) || /preguntas frecuentes|resolvemos tus dudas/i.test(title)) { order = 90; label = 'Preguntas'; }
    else if (/service-related/.test(classes)) order = 110;
    else if (/contact|mail-cta|sys-final/.test(classes) || /class="cta-banner"/.test(section.content)) order = 100;
    else if (/¿Ya tienes/.test(title)) order = 65;
    // The custom mail page uses a plain section for its overview.
    if (order === 35 && !entries.some(entry => entry.label === 'Resumen')) { order = 20; label = 'Resumen'; }
    section.order = order;
    let updatedOpening = /\bdata-service-order="/.test(opening)
      ? opening.replace(/data-service-order="[^"]*"/, `data-service-order="${order}"`)
      : opening.replace(/>$/, ` data-service-order="${order}">`);
    if (label && !entries.some(entry => entry.label === label)) {
      const id = opening.match(/\bid="([^"]*)"/)?.[1] || `servicio-seccion-${order}`;
      if (!/\bid="/.test(opening)) updatedOpening = updatedOpening.replace(/>$/, ` id="${id}">`);
      entries.push({ order, label, id });
    }
    section.content = section.content.replace(opening, updatedOpening);
    if (order === 110) section.content = `<!-- SERVICE-RELATED:START -->${section.content}<!-- SERVICE-RELATED:END -->`;
  }
  entries.sort((a, b) => a.order - b.order);
  const nav = `<!-- SERVICE-NAV:START --><nav class="service-chapter-nav" aria-label="Secciones de este servicio"><div class="container"><span class="service-chapter-label">Explora este servicio</span><ol>${entries.map((entry, index) => `<li><a href="#${entry.id}"><span aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>${entry.label}</a></li>`).join('')}</ol></div></nav><!-- SERVICE-NAV:END -->`;
  sections.sort((a, b) => a.order - b.order || a.index - b.index);
  const body = sections.map((section, index) => section.before + section.content + (index === 0 ? nav : '')).join('') + source.slice(previousEnd);
  return html.replace(main[0], () => main[1] + body + main[3]);
};
