const swagger = require("../../lib");
var path = require("path");

const swaggerGenerate = swagger.generate;
const genenerate = async (urls, outputPath, tagAlias) => {
    await swaggerGenerate({
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
        hasExtraFetchOptions: false,
        renderFunction: options => {
            return `
            export async function ${options.name}(payload: ${options.payloadType}) {\n\treturn fetch<${options.responseType}>(\`${options.method.toLocaleUpperCase()}\` , \`${options.url.replace(
                "$",
                ""
            )}\` , payload)\r}`;
        },
        importRequest: filename => {
            const relativePath = path.join(path.relative(filename, outputPath), "utils");
            return `import { fetch } from '${relativePath}';`;
        },
    });
};
module.exports = { genenerate };
