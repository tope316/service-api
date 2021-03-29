"use strict";
const ApiGateway = require("moleculer-web");
const { UnAuthorizedError } = ApiGateway.Errors;
const ApiService = {
    name: "gateway",
    version: 1,
    mixins: [ApiGateway],
    settings: {
        port: process.env.PORT || 3000,
        /*https: {
             key: fs.readFileSync('ssl/private.key'),
             cert: fs.readFileSync('ssl/certificate.crt'),
             ca: fs.readFileSync('ssl/ca_bundle.crt'),
         },*/
        path: "/api",
        cors: {
            origin: "*",
            methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
            maxAge: 3600
        },
        routes: [
            {
                path: "/v1/core",
                authorization: false,
                bodyParsers: {
                    json: true
                },
                aliases: {
                    "GET node": "v1.core.nodeInfo",
                },
                whitelist: [
                    "**",
                ],
            },
            {
                path: "/v1/secure",
                authorization: true,
                bodyParsers: {
                    json: true
                },
                aliases: {
                    "GET user": "v1.core.userInfo",
                    "GET connection": "v1.core.connection",
                    "GET customer": "v1.core.queryCustomer",
                    "POST customer": "v1.core.saveCustomer",
                },
                whitelist: [
                    "**",
                ],
            },
            {
                path: "/v1/auth",
                authorization: false,
                bodyParsers: {
                    json: true
                },
                aliases: {
                    "POST /": "v1.auth.authenticate"
                },
                whitelist: [
                    "**",
                ],
            }
        ],
        assets: {
            folder: "public",
        },
    },
    methods: {
        /**
        * Authorize the request
        *
        * @param {Context} ctx
        * @param {Object} route
        * @param {IncomingRequest} req
        * @returns {Promise}
        */
        authorize(ctx, route, req) {
            let token;
            if (req.headers.authorization) {
                let type = req.headers.authorization.split(" ")[0];
                if (type === "Token" || type === "Bearer")
                    token = req.headers.authorization.split(" ")[1];
            }
            return this.Promise.resolve(token)
                .then(token => {
                if (token) {
                    return ctx.call("v1.auth.resolveToken", { token })
                        .then(user => {
                        if (user) {
                            this.logger.info("Authenticated via JWT: ", user.name);
                            ctx.meta.user = user;
                            ctx.meta.token = token;
                        }
                        return user;
                    })
                        .catch(err => {
                        return Promise.reject(new UnAuthorizedError("Authorization Token Invalid", { token: token }));
                    });
                }
                else
                    return Promise.reject(new UnAuthorizedError("No Authorization Token", { token: token }));
            })
                .then(user => {
                if (req.$action.auth == "required" && !user)
                    return Promise.reject(new UnAuthorizedError("Authorization Token Invalid", { token: token }));
            });
        },
    },
};
module.exports = ApiService;
//# sourceMappingURL=gateway.service.js.map