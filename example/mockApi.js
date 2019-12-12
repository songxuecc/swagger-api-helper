const express = require("express");
const { mock } = require("../lib");
const app = express();
const urls = [ "https://sx.api.mengtuiapp.com/swagger/swagger.json" ];
mock(app, {
    basePath: "/api",
    urls,
    fetchOptions: {
        headers: {
            Authorization: "Basic YWRtaW46dENmcWU4JEph",
        },
    },
});


// webpack
// const { mock } = require('swagger-api-helper');
// devServer: {
//     before: app => {
//         mock(app, {
//             basePath: '/api',
//             urls,
//         });
//     },
// },