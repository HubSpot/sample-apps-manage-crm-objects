const inquirer = require('inquirer');

const promptUser = async (promptConfig) => {
  const prompt = inquirer.createPromptModule();
  return prompt(promptConfig);
};

const overwritePrompt = (path) => {
  return inquirer.prompt({
    type: 'confirm',
    name: 'overwrite',
    message: `The file '${path}' already exists. Overwrite?`,
    default: false,
  });
};

module.exports = {
  promptUser,
  overwritePrompt,
};
