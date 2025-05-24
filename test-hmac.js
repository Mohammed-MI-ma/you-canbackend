const crypto = require('crypto');

const CLIENT_SECRET = 'j5qROdoy4J1oAe9Q34t6FoeatbUz8jVERnlDiVRt';

// This is the raw query string WITHOUT the hmac param:
const rawQueryString = 'timestamp=1747694550&store=sunniest&seller=2b17145f-266b-4515-a7dc-2c7af529a8c9&locale=en&embedded=0';

// Parsed query object (excluding hmac)
const query = {
  timestamp: '1747694550',
  store: 'sunniest',
  seller: '2b17145f-266b-4515-a7dc-2c7af529a8c9',
  locale: 'en',
  embedded: '0',
};

// Example HMAC from request URL to compare against
const receivedHmac = '0dda12e6d9865bb749017db7dc150a42896e5ec5175af9ae3b5fe6756f8d840b';

// 1. Generate HMAC on raw query string (no sorting)
const generatedHmacRaw = crypto
  .createHmac('sha256', CLIENT_SECRET)
  .update(rawQueryString)
  .digest('hex');

// 2. Generate HMAC on sorted query string
const sortedMessage = Object.keys(query)
  .sort()
  .map(key => `${key}=${encodeURIComponent(query[key])}`)
  .join('&');

const generatedHmacSorted = crypto
  .createHmac('sha256', CLIENT_SECRET)
  .update(sortedMessage)
  .digest('hex');

console.log('Raw query string:', rawQueryString);
console.log('Sorted message string:', sortedMessage);
console.log('Received HMAC:', receivedHmac);
console.log('Generated HMAC (raw):', generatedHmacRaw);
console.log('Generated HMAC (sorted):', generatedHmacSorted);

console.log('\nComparisons:');
console.log('Matches received (raw)?', generatedHmacRaw === receivedHmac);
console.log('Matches received (sorted)?', generatedHmacSorted === receivedHmac);
