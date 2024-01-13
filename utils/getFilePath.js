const yargs = require('yargs');

function getFilePath() {
   const options = yargs
   .usage('\nindex <путь к файлу> ')
   .help(true).argv;
   return options._[0] || null;
}


module.exports = {
   getFilePath,
};
