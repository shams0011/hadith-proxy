export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=3600');

  const { path } = req.query;
  if (!path) return res.status(400).json({ error: 'path required' });

  try {
    const segments = Array.isArray(path) ? path.join('/') : path;
    const url = `https://alquranbd.com/api/hadith/${segments}`;
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch', details: e.message });
  }
}
