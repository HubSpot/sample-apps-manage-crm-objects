const _ = require('lodash');
const pluralize = require('pluralize');
const { AVAILABLE_OBJECT_TYPES } = require('../helpers/constants');
const { cleanupDefaultArgs } = require('../helpers/common');
const { checkConfig } = require('../config');

const { createObject } = require('../sdk');

exports.command = 'create <objectType>';
exports.describe = 'Create CRM object';

exports.handler = async (options) => {
  const { objectType, ...properties } = options;

  if (!checkConfig()) {
    process.exit(1);
  }

  await createObject({
    objectType: pluralize(objectType),
    properties: cleanupDefaultArgs(properties),
  });
};

exports.builder = (yargs) => {
  yargs.positional('objectType', {
    describe: 'CRM object type',
    type: 'string',
    choices: Object.keys(AVAILABLE_OBJECT_TYPES),
    coerce: (arg) => arg.toLowerCase(),
  });
  return yargs;
};
