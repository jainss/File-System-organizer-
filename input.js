#!/usr/bin/env node
const fs = require('fs');
const os = require('os');
const path = require('path');
const helpobj = require('./commands/help');
const treeobj = require('./commands/tree');
const organobj = require('./commands/organize');
const chalk = require('chalk');
let inputarr = process.argv.slice(2);
console.log(inputarr);
let command = inputarr[0];
switch (command) {
    case "help":
        helpobj.helpkey();
        break;
    case "tree":
        treeobj.treekey(inputarr[1]);
        break;
    case "organize":
        organobj.organkey(inputarr[1]);
        break;
    default:
        console.log(chalk.red("Please Input right command"));
        break;
}



