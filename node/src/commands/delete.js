const _ = require('lodash');
const pluralize = require('pluralize');
const { AVAILABLE_OBJECT_TYPES } = require('../helpers/constants');
const { checkConfig } = require('../config');

const { archiveObject } = require('../sdk');

exports.command = 'delete <objectType> <objectId>';
exports.describe = 'Archive CRM object';

exports.handler = async (options) => {
  const { objectType, objectId } = options;

  if (!checkConfig()) {
    process.exit(1);
  }

  await archiveObject({
    objectType: pluralize(objectType),
    objectId,
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
