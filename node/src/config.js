// eslint-disable-next-line node/no-unpublished-require
require('dotenv').config({ path: '.env' });
const { logger } = require('./helpers/logger');

const checkConfig = () => {
  if (!process.env.HUBSPOT_API_KEY) {
    logger.error(
      'Please, set .env file with authorization api key, or use init command to authorize'
    );
    return false;
  }
  return true;
};

module.exports = {
  checkConfig,
};
