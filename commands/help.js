const chalk = require('chalk');
function helpFn() {
    console.log(chalk.white(`List of all command :-
                       1."node input.js help"
                       2."node input.js tree "dirpath""
                       3."node input.js organize "dirpath""
                `));
}
module.exports = {
    helpkey: helpFn
}