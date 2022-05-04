const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  username: process.env.API_URL,
  password: process.env.API_KEY
};
