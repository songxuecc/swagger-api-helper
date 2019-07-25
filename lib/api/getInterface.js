"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getRefModelTitle_1 = __importDefault(require("./getRefModelTitle"));
var isTypes_1 = require("./isTypes");
var typeMap_1 = __importDefault(require("./typeMap"));
/**
 *
 * @param {object} schema { type: string, properties: schema, items: schema[]， title: string, description: string, required: string[], example: string }
 */
function loopInterface(schema, level, translateLongToString) {
    if (level === void 0) { level = 1; }
    if (translateLongToString === void 0) { translateLongToString = false; }
    var type = schema.type, properties = schema.properties, items = schema.items, required = schema.required;
    var getFullType = function (model) {
        if (!model)
            return 'any\t// 解析该字段出错 请联系后台修改格式';
        var tabs = new Array(level).fill('\t').join('');
        var items = Object.keys(model).map(function (key) {
            var target = model[key];
            var isRequired = Array.isArray(required) ? required.indexOf(key) > -1 : required;
            return "" + tabs + key + (isRequired ? '' : '?') + ": " + loopInterface(target, level + 1, translateLongToString) + "\t" + renderDescription(target);
        });
        return "{\n" + items.join('\n') + "\n" + new Array(level - 1).fill('\t').join('') + "}";
    };
    switch (type) {
        case 'array':
            if (schema.$$ref)
                return "Array<" + getRefModelTitle_1.default(schema) + ">";
            return "Array<" + loopInterface(items, level) + ">";
        case 'object':
            if (schema.$$ref)
                return getRefModelTitle_1.default(schema);
            return getFullType(properties);
        case 'integer':
            return isTypes_1.isLong(schema) && translateLongToString ? 'string' : 'number';
        case 'string':
            if (isTypes_1.isEnum(schema))
                return schema.enum.map(function (item) { return "'" + item + "'"; }).join(' | ');
        case 'boolean':
        case 'file':
        default:
            return typeMap_1.default[type];
    }
}
/**
 * 注释中返回字段的描述信息
 * @param {object} target
 */
function renderDescription(target) {
    var description = target.description ? target.description : '';
    var example = target.example ? "example: " + JSON.stringify(target.example) : '';
    var defaultValue = target.default ? "default: " + target.default : '';
    var allowEmptyValue = target.allowEmptyValue ? "allowEmptyValue: " + target.allowEmptyValue : '';
    var result = [description, example, defaultValue, allowEmptyValue];
    return result.some(function (item) { return item !== ''; }) ? "// " + result.join(' ') : '';
}
exports.default = loopInterface;
//# sourceMappingURL=getInterface.js.map