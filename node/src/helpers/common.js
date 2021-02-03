const _ = require('lodash');
const fs = require('fs');
const { logger } = require('./logger');

const logResponse = (data) => {
  logger.log('Response from API', JSON.stringify(data, null, 1));
};

const cleanupDefaultArgs = (args) =>
  _.omit(args, ['_', 'object-type', '$0', 'object-id']);

const handleError = (e) => {
  if (_.isEqual(e.message, 'HTTP request failed')) {
    const errorMessage = JSON.stringify(e, null, 2);
    logger.error(errorMessage);
  } else {
    logger.error(e);
  }
};

const jsonToEnv = (json) => {
  const variables = [];
  Object.entries(json).forEach(([key, value]) => {
    variables.push(`${key}=${value}`);
  });
  return variables.join('\n');
};

const getEnvironmentConfigPath = () => {
  return `${process.cwd()}/.env`;
};

const createEnvironmentFile = (config) => {
  const path = getEnvironmentConfigPath();

  if (fs.existsSync(path)) {
    logger.log(`The .env file at ${path} already exists`);
    return;
  }

  try {
    logger.debug(`Writing current config to ${path}`);
    fs.writeFileSync(path, jsonToEnv(config));
  } catch (err) {
    logger.error(err);
  }
};

module.exports = {
  logResponse,
  handleError,
  createEnvironmentFile,
  getEnvironmentConfigPath,
  cleanupDefaultArgs,
};
