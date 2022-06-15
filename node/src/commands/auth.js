const fs = require('fs');
const {
  createEnvironmentFile,
  getEnvironmentConfigPath,
} = require('../helpers/common');

const { promptUser, overwritePrompt } = require('../helpers/prompts');

const ACCESS_TOKEN_FLOW = {
  name: 'accessToken',
  message:
    'Enter the access token for your account (found at https://app.hubspot.com/l/private-apps):',
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
  const { accessToken } = await promptUser([ACCESS_TOKEN_FLOW]);

  createEnvironmentFile({
    ACCESS_TOKEN: accessToken || '',
  });
};

exports.builder = (yargs) => {
  return yargs;
};
