const path = require("path");

const tagAlias = {
    各种云服务的callback: "Callback",
    充值中心: "Recharge",
    用户的钱包: "wallet",
    "增加推币相关接口,": "rewardCoins",
    "达人(会员)相关接口": "Members",
    "店铺 Author:陆离": "Mall",
};

const urls = [[ "https://sx.api.mengtuiapp.com/swagger/swagger.json",""]];
const outputPath = path.join(__dirname, "../services");
const outputPathCopy = path.join(__dirname, "../servicesCopy");

module.exports = {
    tagAlias,
    urls,
    outputPath,
    outputPathCopy,
};
