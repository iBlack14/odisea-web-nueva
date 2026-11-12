// Local development equivalent of domain-check.php. Credentials stay on the server.
const cache = new Map();
let requests = [];
module.exports = async function checkDomain(req, res) {
  const reply = (status, body) => { res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(body)); };
  if (req.method !== 'GET') return reply(405, { error: 'method' });
  const domain = (new URL(req.url, 'http://localhost').searchParams.get('domain') || '').trim().toLowerCase();
  if (domain.length > 253 || !/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/.test(domain)) return reply(400, { error: 'invalid' });
  const key = process.env.SPACESHIP_API_KEY, secret = process.env.SPACESHIP_API_SECRET;
  if (!key || !secret) return reply(503, { error: 'configuration' });
  const now = Date.now();
  for (const [name, value] of cache) if (now - value.time >= 300000) cache.delete(name);
  if (cache.has(domain)) return reply(200, { domain, result: cache.get(domain).result });
  requests = requests.filter(time => now - time < 30000);
  if (requests.length >= 25) return reply(429, { error: 'rate_limit' });
  requests.push(now);
  try {
    const response = await fetch('https://spaceship.dev/api/v1/domains/' + encodeURIComponent(domain) + '/available', {
      headers: { 'X-API-Key': key, 'X-API-Secret': secret, Accept: 'application/json' },
      signal: AbortSignal.timeout(8000), redirect: 'error'
    });
    const data = await response.json();
    if (!response.ok || !['available', 'taken'].includes(data.result)) return reply(response.status === 429 ? 429 : 502, { error: 'provider' });
    cache.set(domain, { time: now, result: data.result });
    reply(200, { domain, result: data.result });
  } catch { reply(502, { error: 'provider' }); }
};
