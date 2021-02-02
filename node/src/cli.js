#!/usr/bin/env node

const yargs = require('yargs');

const authCommand = require('./commands/auth');
const getCommand = require('./commands/get');
const createCommand = require('./commands/create');
const updateCommand = require('./commands/update');
const deleteCommand = require('./commands/delete');
const propertiesCommand = require('./commands/properties');
const { logger } = require('./helpers/logger');

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
  .demandCommand(
    1,
    'You need at least one command before moving on. Please use --help to find out available commands'
  )
  .strictCommands().argv;
