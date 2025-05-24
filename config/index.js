require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
module.exports = {
  DB: process.env[`DB_URI_${process.env.NODE_ENV.toUpperCase()}`],
  SECRET: process.env[`SECRET_${process.env.NODE_ENV.toUpperCase()}`],
  CLIENT_ID: process.env[`CLIENT_ID_${process.env.NODE_ENV.toUpperCase()}`],
  CLIENT_SECRET:
    process.env[`CLIENT_SECRET_${process.env.NODE_ENV.toUpperCase()}`],
  REDIRECT_URI:
    process.env[`REDIRECT_URI_${process.env.NODE_ENV.toUpperCase()}`],
};
