const axios = require('axios');

const youcanApi = axios.create({
  baseURL: 'https://seller-area.youcan.shop/admin/api',
  timeout: 5000,
});

const getStoreData = async (accessToken) => {
  const response = await youcanApi.get('/store', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

module.exports = { getStoreData };
