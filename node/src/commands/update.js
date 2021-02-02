const _ = require('lodash');
const pluralize = require('pluralize');
const { AVAILABLE_OBJECT_TYPES } = require('../helpers/constants');
const { cleanupDefaultArgs } = require('../helpers/common');
const { checkConfig } = require('../config');

const { updateObject } = require('../sdk');

exports.command = 'update <objectType> <objectId>';
exports.describe = 'Update CRM object';

exports.handler = async (options) => {
  const { objectType, objectId, ...properties } = options;

  if (!checkConfig()) {
    process.exit(1);
  }

  const res = await updateObject({
    objectType: pluralize(objectType),
    objectId,
    properties: cleanupDefaultArgs(properties),
  });
};

exports.builder = (yargs) => {
  yargs.positional('objectType', {
    describe: 'CRM object type',
    type: 'string',
    choices: Object.keys(AVAILABLE_OBJECT_TYPES),
  });

  yargs.positional('objectId', {
    describe: 'CRM object id',
    type: 'string',
  });
  return yargs;
};
