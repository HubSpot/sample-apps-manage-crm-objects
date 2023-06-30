const _ = require('lodash');
const { AVAILABLE_OBJECT_TYPES } = require('../helpers/constants');
const { checkConfig } = require('../config');

const { getProperties } = require('../sdk');

exports.command = 'properties <objectType>';
exports.describe = 'Get CRM object properties';

exports.handler = async (options) => {
  if (!checkConfig()) {
    process.exit(1);
  }
  const { objectType } = options;
  const res = await getProperties({ objectType });
  console.table(
    res.map((item) => _.pick(item, ['name', 'label', 'type', 'groupName']))
  );
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
  return yargs;
};
