const fs = require("fs");
const chalk = require("chalk");
const { tagAlias, urls, outputPath, outputPathCopy } = require("./utils/config");
const { FindFile, removeFolder } = require("./utils/files");
const { genenerate } = require("./utils/genenerate.js");
const log = console.log;

const genApi = async () => {
    try {
        const targetDirname = process.argv[2];
        if (targetDirname) {
            await genenerate(urls, outputPathCopy, tagAlias);
            const fileDisplay = new FindFile();
            const copyFilePath = await fileDisplay.find(outputPathCopy, targetDirname);
            const deleteFilePath = await fileDisplay.find(outputPath, targetDirname);
            fs.unlinkSync(deleteFilePath);
            const copy = fs
                .createReadStream(copyFilePath)
                .pipe(fs.createWriteStream(deleteFilePath));
            copy.on("finish", () => {
                removeFolder(outputPathCopy);
            });
        } else {
            genenerate(urls, outputPath, tagAlias);
        }
    } catch (e) {
        log(chalk.red(e));
    }
};

genApi();
