"use strict";
/* Public APIS */
const RandomsRoute_1 = require("./lib/RandomsRoute");
const server_1 = require("./lib/internals/server");
const middlewares_1 = require("./lib/internals/middlewares");
module.exports = {
    Route: RandomsRoute_1.Route, useMiddlewares: server_1.useMiddlewares, runServer: server_1.runServer, MiddleWares: middlewares_1.MiddleWares
};
