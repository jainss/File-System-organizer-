const fs = require('fs');
const os = require('os');
const path = require('path');
const chalk = require('chalk');
function treeFn(dirpath) {
    let destpath;
    if (dirpath == undefined) {
        treehelper(process.cwd(), "");
        return;
    } else {
        let doespath = fs.existsSync(dirpath);
        if (doespath) {
            treehelper(dirpath, "");
        } else {
            console.log("Kindly Enter the right path ");
            return;
        }
    }
}

function treehelper(dirpath, indent) {
    let isfile = fs.lstatSync(dirpath).isFile();
    if (isfile) {
        let filename = path.basename(dirpath);
        console.log(chalk.yellowBright(indent + "├──" + filename));
    }
    else {
        let dirname = path.basename(dirpath);
        console.log(indent + "└──" + dirname);
        let childrenofdir = fs.readdirSync(dirpath);
        for (let i = 0; i < childrenofdir.length; i++) {
            let childpath = path.join(dirpath, childrenofdir[i]);
            treehelper(childpath, indent + "\t");
        }

    }
}

module.exports = { treekey: treeFn }