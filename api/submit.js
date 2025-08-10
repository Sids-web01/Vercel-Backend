module.exports = async (req, res) => {
  // Allow requests from any origin (for testing)
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { name, id, password } = req.body;

  if (!name || !id || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbwIr2PwpG1NrqnpEZpBJTJzMPvKrxMK6hhtDtqFlCrXRTwohjpQIxwJUGgIPjqtp1-o9A/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, id, password }),
    });

    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to send data to Google Sheets' });
    }

    const data = await response.json();
    return res.status(200).json({ message: 'Success', data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
