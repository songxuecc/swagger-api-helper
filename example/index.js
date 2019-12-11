const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { fetchSwaggerJson } = require('../lib/utils');
const swagger = require('../lib');
const swaggerMock = swagger.mock;
const swaggerGenerate = swagger.generate;

const app = express();

const urls = [ [ "https://sx.api.mengtuiapp.com/swagger/swagger.json", "" ] ];
const outputPath = path.join(__dirname, "./services");

const tagAlias = {
    '各种云服务的callback': "Callback" ,
    '充值中心':'Recharge',
    '用户的钱包':'wallet',
    '增加推币相关接口,':'rewardCoins',
    '达人(会员)相关接口':'Members',
    '店铺 Author:陆离':'Mall',
};


swaggerGenerate({
    // swagger json url 地址
    urls,
    // 生成的文件 输入路径
    outputPath,
    // 用作生成文件的 别名
    tagAlias,
    // 请求 swagger json url 的参数配置，设置请求权限等
    fetchOptions: {
        headers: {
            Authorization: 'Basic YWRtaW46dENmcWU4JEph',
        },
    },
}).then(message => {
    console.log(message);
});


// parse application/json
// app.use(bodyParser.json());
// 可以访问 http://localhost:3000/api/v2/pet/findByStatus 测试
// swaggerMock(app, {
//     fetchOptions: {
//         headers: {
//             Authorization: "Basic YWRtaW46dENmcWU4JEph",
//         },
//     },
//     basePath: "/api",
//     urls: urls.map(url => url[0]),
// });

// app.get("/genApi", (req, res) => {
//     swaggerGenerate({
//         urls,
//         outputPath,
//         hasExtraFetchOptions: true,
//         tagAlias,
//         importExtraFetchOptions: filename => {
//             const relativePath = path.join(path.relative(filename, outputPath), "utils");
//             return `import { ExtraFetchOptions } from '${relativePath}';`;
//         },
//         importStringify: filename => {
//             const relativePath = path.join(path.relative(filename, outputPath), "utils");
//             return `import { stringify } from '${relativePath}';`;
//         },
//         importRequest: filename => {
//             const relativePath = path.join(path.relative(filename, outputPath), "utils");
//             return `import { request } from '${relativePath}';`;
//         },
//     }).then(message => {
//         res.json(message);
//     });
// });

// app.get("/swaggerJson", (req, res) => {
//     fetchSwaggerJson(urls[0][0]).then(data => {
//         res.json(data);
//     });
// });

// app.get("/v2/swaggerJson", (req, res) => {
//     fetchSwaggerJson(urls[1][0]).then(data => {
//         res.json(data);
//     });
// });

// app.listen(3000);
