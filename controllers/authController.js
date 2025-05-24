const axios = require('axios');
const { CLIENT_ID, SECRET, REDIRECT_URI, CLIENT_SECRET } = require('../config');

const login = (req, res) => {
  const clientId = CLIENT_ID;
  const redirectUri = encodeURIComponent(REDIRECT_URI);
  const scope = encodeURIComponent('*');
  const authUrl = `https://seller-area.youcan.shop/admin/oauth/authorize?scope=${scope}&response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
  
  res.redirect(authUrl);
};

const callback = async (req, res) => {
  const { code, store, seller } = req.query;

  if (!code) {
    return res.status(400).send('Missing authorization code');
  }

  try {
    const response = await axios.post('https://api.youcan.shop/oauth/token', {
      grant_type: 'authorization_code',
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
    });

    const { access_token } = response.data;

    // Store token and optional fields
    req.session.accessToken = access_token;
    req.session.store = store || null;
    req.session.seller = seller || null;

    console.log('✅ Access token received');
res.redirect(`http://localhost:3000/dashboard?success=true`);
  } catch (error) {
    console.error('OAuth token exchange failed:', error.response?.data || error.message);
    res.status(500).send('Token exchange failed. Check server logs.');
  }
};

module.exports = { login, callback };
