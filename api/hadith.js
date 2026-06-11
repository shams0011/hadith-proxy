export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

  if (req.method === 'OPTIONS') return res.status(200).end();

  let { path } = req.query;
  if (!path) return res.status(400).json({ error: 'path required' });

  const segments = Array.isArray(path) ? path.join('/') : path;
  const targetUrl = `http://www.alquranbd.com/api/hadith/${segments}`;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      }
    });
    if (!response.ok) {
      return res.status(response.status).json({ error: `Error: ${response.status}` });
    }
    const data = await response.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
