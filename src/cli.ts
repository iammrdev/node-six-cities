#!/usr/bin/env node

import CLIApplication from './app/cli-application.js';
import VersionCommand from './cli-command/version-command.js';
import HelpCommand from './cli-command/help-command.js';
import ImportCommand from './cli-command/import-command.js';
import GenerateCommand from './cli-command/generate-command.js';

const cli = new CLIApplication();
cli.registerCommands([
  new HelpCommand, new VersionCommand, new ImportCommand, new GenerateCommand
]);
cli.processCommand(process.argv);
