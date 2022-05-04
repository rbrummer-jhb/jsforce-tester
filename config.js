const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  username: process.env.SFUSER,
  password: process.env.PASSWORD
};
