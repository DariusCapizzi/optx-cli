#!/usr/bin/env node

const program = require('commander')
const path = require('path')
const winston = require('winston')
const optcliPackage = require(path.join(__dirname, '../', 'package.json'))

const loadCmd = (cmd) => {
  const self = this
  return function () {
    require(`../lib/cmd/${cmd}`).apply(self, arguments)
  }
}

// Default log level
winston.level = 'info'
function increaseVerbosity (v) {
  winston.level = 'debug'
}

program
  .version(optcliPackage.version)
  .usage(` - ${optcliPackage.description}`)
  .description(optcliPackage.description)
  .option('-v --verbose', 'show debug output', increaseVerbosity)

program
  .command('init [project_id]')
  .description('Initialize an optimizely project.')
  .option('-r --remote', 'initialize from remote project')
  .option('-j --jquery', 'include jquery (local project only)')
  .action(loadCmd('init-project'))

program
  .command('experiment <folder> <description> <url>')
  .description('Create Local Experiment')
  .action(loadCmd('create-experiment'))

program
  .command('variation <experiment> <folder> <description>')
  .description('Create Local Variation')
  .action(loadCmd('create-variation'))

program
  .command('host <path> [port]')
  .option('-s --ssl', 'SSL')
  .option('-o --open', 'Open the localhost index page')
  .description('Host variation locally')
  .action(loadCmd('host'))

program
  .command('push-experiment <path>')
  .option('-i --iterate', 'Push experiment and iterate through all variations')
  .description('Push an experiment to Optimizely')
  .action(loadCmd('push-experiment'))

program
  .command('push-variation <path>')
  .description(
    'Push a variation to Optimizely (experiment must be pushed first)')
  .action(loadCmd('push-variation'))

program
  .command('set-token [token]')
  .description('Set the optimizely API token in a project folder')
  .action(loadCmd('set-token'))

// Show help if no arguments are passed
if (!process.argv.slice(2).length) {
  program._name = process.argv[1]
  program._name = program._name.substr(program._name.lastIndexOf('/') + 1)
  program.outputHelp()
}

program.parse(process.argv)
