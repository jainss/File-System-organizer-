const fs = require('fs');
const os = require('os');
const path = require('path');
const chalk = require('chalk');
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}
function orgaFn(dirpath) {
    // Input the directory By The user 
    let destpath;
    if (dirpath == undefined) {
        destpath = process.cwd();
        return;
    } else {
        let doespath = fs.existsSync(dirpath);
        if (doespath) {
            // Now organize the file in directory create organize_file
            destpath = path.join(dirpath, "organized_files");
            if (fs.existsSync(destpath) == false) {
                fs.mkdirSync(destpath);
            }
        } else {
            console.log(chalk.red("Kindly Enter the right path "));
            return;
        }
    }
    //call the funtion for organize file
    organizehelper(dirpath, destpath);
}
function organizehelper(scr, dest) {
    let childnames = fs.readdirSync(scr);
    for (let i = 0; i < childnames.length; i++) {
        let childadress = path.join(scr, childnames[i]);
        let isfile = fs.lstatSync(childadress).isFile();
        if (isfile) {
            // console.log(childnames[i]);
            let category = getcategory(childnames[i]);
            console.log(chalk.greenBright(childnames[i], "Belong To -->", category));
            // Now we have to copy the file 
            sendfile(childadress, dest, category);
        }
    }
    // console.log(childnames);
}

function sendfile(childadress, dest, category) {
    let categorypath = path.join(dest, category);
    if (fs.existsSync(categorypath) == false) {
        fs.mkdirSync(categorypath);
    }
    let findname = path.basename(childadress);
    let filepath = path.join(categorypath, findname);
    fs.copyFileSync(childadress, filepath);
    console.log(findname, " Copied to ", category);
}

function getcategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1);
    for (let type in types) {
        let tyarr = types[type];
        for (let i = 0; i < tyarr.length; i++) {
            if (ext == tyarr[i]) {
                return type;
            }
        }
    }
    return "Other";
}

module.exports = { organkey: orgaFn }