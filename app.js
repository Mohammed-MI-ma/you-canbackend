require('dotenv').config();
const express = require('express');
const session = require('express-session');
const crypto = require('crypto');

const authRoutes = require('./routes/authRoutes');
const { SECRET, CLIENT_SECRET } = require('./config');

const app = express();

function verifyHmac(rawQueryString, receivedHmac) {
  // Compute HMAC on the raw query string (excluding hmac itself)
  const generatedHmac = crypto
    .createHmac('sha256', CLIENT_SECRET)
    .update(rawQueryString)
    .digest('hex');

  return generatedHmac === receivedHmac;
}


app.use(express.json());

app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use('/auth', authRoutes);
// Example usage in Express middleware
app.get('/', (req, res) => {
  const url = require('url');
  const parsedUrl = url.parse(req.originalUrl);

  const queryParams = new URLSearchParams(parsedUrl.query);
  const receivedHmac = queryParams.get('hmac');
  queryParams.delete('hmac');

  const rawQueryString = queryParams.toString();

  if (!verifyHmac(rawQueryString, receivedHmac)) {
    return res.status(401).send('❌ Invalid HMAC – possible tampering');
  }

  console.log('✅ HMAC validated');

  // Redirect to frontend with all query params
  const fullQuery = new URLSearchParams(req.query).toString();
  res.redirect(`http://localhost:3000/?${fullQuery}`);
});


module.exports = app;
