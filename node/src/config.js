// eslint-disable-next-line node/no-unpublished-require
require('dotenv').config({ path: '.env' });
const { logger } = require('./helpers/logger');

const checkConfig = () => {
  if (!process.env.ACCESS_TOKEN) {
    logger.error(
      'Please, set .env file with access token, or use init command to authorize'
    );
    return false;
  }
  return true;
};

module.exports = {
  checkConfig,
};
