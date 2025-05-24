const crypto = require('crypto');

const CLIENT_SECRET = process.env.CLIENT_SECRET || 'j5qROdoy4J1oAe9Q34t6FoeatbUz8jVERnlDiVRt';

function verifyHmacMiddleware(req, res, next) {
  const query = { ...req.query };

  if (!query.hmac) {
    return res.status(400).send('Missing HMAC');
  }

  const receivedHmac = query.hmac;
  delete query.hmac;

  const message = Object.keys(query)
    .sort()
    .map(key => `${key}=${encodeURIComponent(query[key])}`)
    .join('&');

  const generatedHmac = crypto
    .createHmac('sha256', CLIENT_SECRET)
    .update(message)
    .digest('hex');

  const valid = crypto.timingSafeEqual(
    Buffer.from(generatedHmac, 'hex'),
    Buffer.from(receivedHmac, 'hex')
  );

  if (!valid) {
    return res.status(401).send('Invalid HMAC — possible tampering');
  }

  // HMAC is valid, proceed to the next middleware or route handler
  next();
}

module.exports = verifyHmacMiddleware;
