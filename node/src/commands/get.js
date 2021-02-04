const _ = require('lodash');
const pluralize = require('pluralize');
const { AVAILABLE_OBJECT_TYPES } = require('../helpers/constants');
const { checkConfig } = require('../config');
const { logger } = require('../helpers/logger');

const { getObject, getAllObjects } = require('../sdk');

exports.command = 'get <objectType> [objectId]';
exports.describe = 'Get CRM object';

exports.handler = async (options) => {
  const { objectType, objectId, all, query } = options;

  if (!all && !objectId) {
    logger.error(
      'Please, specify Object Id, or use --all flag for getting all objects'
    );
    process.exit(1);
  }
  if (!checkConfig()) {
    process.exit(1);
  }

  if (all) {
    const res = await getAllObjects({
      objectType: pluralize(objectType),
      query,
    });
    logger.log(res);
  } else {
    await getObject({ objectType: pluralize(objectType), objectId });
  }
};

exports.builder = (yargs) => {
  yargs.positional('objectType', {
    describe: 'CRM object type',
    type: 'string',
    choices: [
      ...Object.values(AVAILABLE_OBJECT_TYPES),
      ...Object.keys(AVAILABLE_OBJECT_TYPES),
    ].sort(),
    coerce: (arg) => arg.toLowerCase(),
  });

  yargs.positional('objectId', {
    describe: 'CRM object id',
    type: 'string',
  });

  yargs.option('query', {
    alias: 'q',
    describe: 'searching filter for getting list of objects',
    type: 'string',
  });

  yargs.option('all', {
    alias: 'a',
    describe: 'Get all objects',
    type: 'boolean',
  });
  return yargs;
};
