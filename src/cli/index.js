import commander from 'commander';

const program = commander;

program
  .command('init', 'initialize');

program.parse(process.argv);