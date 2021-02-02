const fs = require('fs');
const {
  createEnvironmentFile,
  getEnvironmentConfigPath,
} = require('../helpers/common');
const { API_KEY_REGEX } = require('../helpers/constants');

const { promptUser, overwritePrompt } = require('../helpers/prompts');

const API_KEY_FLOW = {
  name: 'apiKey',
  message:
    'Enter the API key for your account (found at https://app.hubspot.com/l/api-key):',
  validate(val) {
    if (!API_KEY_REGEX.test(val)) {
      return 'You did not enter a valid API key. Please try again.';
    }
    return true;
  },
};

exports.command = 'init';
exports.describe = `initialize .env file for a HubSpot account`;

exports.handler = async () => {
  const path = getEnvironmentConfigPath();
  if (fs.existsSync(path)) {
    const { overwrite } = await overwritePrompt(path);
    if (overwrite) {
      fs.rmSync(path);
    } else {
      return;
    }
  }
  const { apiKey } = await promptUser([API_KEY_FLOW]);

  createEnvironmentFile({
    HUBSPOT_API_KEY: apiKey || '',
  });
};

exports.builder = (yargs) => {
  return yargs;
};
