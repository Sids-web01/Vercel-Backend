const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method allowed' });
  }

  const { name, id } = req.body;

  if (!name || !id) {
    return res.status(400).json({ error: 'Name and ID are required' });
  }

  try {
    const response = await fetch('YOUR_APPS_SCRIPT_WEB_APP_URL', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, id })
    });

    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to send data to Google Sheets' });
    }

    return res.status(200).json({ message: 'Data sent successfully!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
