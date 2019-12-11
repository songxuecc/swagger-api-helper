const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const swagger = require("../lib");
const swaggerGenerate = swagger.generate;
const { tagAlias, urls, outputPath, outputPathCopy } = require("./config");
const { removeFolder, FileDisplay } = require("./utils/findFilePath");
const log = console.log;
// 生成全部模块
const genApi = async outputPath => {
    const message = await swaggerGenerate({
        // swagger json url 地址
        urls,
        // 生成的文件 输入路径
        outputPath,
        // 用作生成文件的 别名
        tagAlias,
        // 请求 swagger json url 的参数配置，设置请求权限等
        fetchOptions: {
            headers: {
                Authorization: "Basic YWRtaW46dENmcWU4JEph",
            },
        },
        // 返回 导入 request 的字符串, request 用来发请求的方法
        importRequest: filename => {
            const relativePath = path.join(path.relative(filename, outputPath), "utils");
            return `import { request } from '${relativePath}';`;
        },
        // 返回 导入 request 的字符串, request 用来发请求的方法
        importStringify: filename => {
            const relativePath = path.join(path.relative(filename, outputPath), "utils");
            return `import { stringify } from '${relativePath}';`;
        },
    });
};

// 生成指定模块
// 查找要改变的文件 返回路径并删除文件
// 生成文件 储存生成的文件 并查找要更改的新的生成的文件路径
// 将新的文件写入指定文件夹
// log 书写成功
// log(chalk.blue(targetDirname) + 'World' + chalk.red('!'));

const gen = async () => {
    try {
        const targetDirname = process.argv[2];
        if (targetDirname) {
            await genApi(outputPathCopy);
            const fileDisplay = new FileDisplay();
            const copyFilePath = await fileDisplay.find(outputPathCopy, targetDirname);
            const deleteFilePath = await fileDisplay.find(outputPath, targetDirname);
            fs.unlinkSync(deleteFilePath)
            const copy = fs.createReadStream(copyFilePath).pipe(
                fs.createWriteStream(deleteFilePath)
            )
            copy.on('finish',()=>{
                removeFolder(outputPathCopy)
            })
        } else {
            genApi(outputPath);
        }
    } catch (e) {
        log(chalk.red(e));
    }
};

gen();
