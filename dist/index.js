"use strict";
/* Public APIS */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddleWares = exports.runServer = exports.useMiddlewares = void 0;
const RandomsRoute_1 = require("./lib/RandomsRoute");
var server_1 = require("./lib/internals/server");
Object.defineProperty(exports, "useMiddlewares", { enumerable: true, get: function () { return server_1.useMiddlewares; } });
Object.defineProperty(exports, "runServer", { enumerable: true, get: function () { return server_1.runServer; } });
var middlewares_1 = require("./lib/internals/middlewares");
Object.defineProperty(exports, "MiddleWares", { enumerable: true, get: function () { return middlewares_1.MiddleWares; } });
exports.default = RandomsRoute_1.Route;
