import { Mockjs } from 'mockjs';
export declare const enum Type {
    object = "object",
    number = "number",
    integer = "integer",
    array = "array",
    string = "string"
}
export interface Tag {
    description: string;
    name: string;
    example: any;
    format: Format;
    $ref: string;
}
export interface Info {
    description: string;
    title: string;
    version: string;
}
export interface Definitions {
    [ModelName: string]: Definition;
}
export interface Properties {
    [propertyName: string]: Schema;
}
export interface Definition {
    type: Type;
    title: string;
    properties: Properties;
}
export declare type Methods = 'delete' | 'get' | 'post' | 'put';
export declare const enum In {
    header = "header",
    query = "query",
    body = "body",
    path = "path",
    formData = "formData"
}
export declare type Format = string | 'int64' | 'date-time';
export interface BaseParameter<T = In> {
    default?: any;
    format?: Format;
    description: string;
    in: T;
    name: string;
    required: boolean;
    type?: Type;
    allowEmptyValue?: boolean;
}
export interface Schema {
    enum?: string[];
    type?: Type;
    $$ref?: string;
    items?: Schema;
    properties?: Properties;
    additionalProperties?: Schema;
}
export interface ArrayParameter extends BaseParameter {
    type: Type.array;
    collectionFormat: string;
    items: Schema;
}
export interface ObjectParameter extends BaseParameter {
    schema: Schema;
    type: undefined;
}
export declare type Parameter<T = In> = BaseParameter<T> | ArrayParameter | ObjectParameter;
export interface Response {
    description: string;
    schema?: Schema;
}
export declare type Path = {
    consumes?: string[];
    deprecated: boolean;
    operationId: string;
    parameters: Parameter[];
    produces: string[];
    responses: {
        [key: number]: Response;
    };
    summary: string;
    tags: string[];
    __originalOperationId?: string;
};
export interface Paths {
    [pathName: string]: {
        [method in Methods]?: Path;
    };
}
export interface SwaggerJson {
    basePath: string;
    definitions: Definitions;
    host: string;
    swagger: string;
    tags: Tag[];
    info: Info;
    paths: Paths;
}
export interface SwaggerResponse {
    url: string;
    riginalSpec: any;
    spec: SwaggerJson;
}
export interface CustomPath extends Path {
    pathKey: string;
    url: string;
    parametersInPath?: Parameter<In.path>[];
    parametersInQuery?: Parameter<In.query>[];
    parametersInBody?: Parameter<In.body>[];
    parametersInFormData?: Parameter<In.formData>[];
    parametersInHeader?: Parameter<In.header>[];
}
export interface SwaggerModel {
    [tagName: string]: {
        name: string;
        description: string;
        paths: CustomPath[];
    };
}
export declare type PropertyResolver = (dataKey: string, type: Type, Mock: Mockjs) => any;
export declare type ResultResolver = (payload: {
    url: string;
    method: Methods;
    path: string;
    swaggerPath: Path;
}) => any;
export declare type Url = string | [string, // swagger url
string];
export interface Options {
    enableWatcher?: boolean;
    urls?: Url[];
    propertyResolver?: PropertyResolver;
    resultResolver?: ResultResolver;
    basePath?: string;
}