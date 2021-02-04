#!/usr/bin/env node

const yargs = require('yargs');

const authCommand = require('../src/commands/auth');
const getCommand = require('../src/commands/get');
const createCommand = require('../src/commands/create');
const updateCommand = require('../src/commands/update');
const deleteCommand = require('../src/commands/delete');
const propertiesCommand = require('../src/commands/properties');
const { logger } = require('../src/helpers/logger');

yargs
  .usage('Sample app that interacts with Hubspot CRM objects')
  .exitProcess(false)
  .fail((msg, err, yargs) => {
    if (msg === null) {
      yargs.showHelp();
      process.exit(0);
    } else {
      logger.error(msg);
      process.exit(1);
    }
  })
  .command(authCommand)
  .command(getCommand)
  .command(createCommand)
  .command(updateCommand)
  .command(deleteCommand)
  .command(propertiesCommand)
  .help()
  .recommendCommands()
  .demandCommand(1, '')
  .strictCommands().argv;
