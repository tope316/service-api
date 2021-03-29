"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jwt = __importStar(require("jsonwebtoken"));
const helper_1 = require("../common/helper");
const logger_1 = require("../common/logger");
const global_1 = require("../common/global");
const Customer_1 = __importDefault(require("../data//model/Customer"));
const bcrypt_1 = require("@node-rs/bcrypt");
const AuthService = {
    name: "auth",
    version: 1,
    settings: {
        JWT_SECRET: process.env.JWT_SECRET || "W3Ar3Flatt3ningTheW0rld",
    },
    dependencies: [],
    actions: {
        authenticate: {
            async handler(ctx) {
                const logger = this.logger;
                const response = helper_1.Helper.response();
                try {
                    logger_1.Logger.header(logger, "authenticate", ctx.params, ctx.params.username);
                    /***** MANDATORY PARAM VALIDATION ******/
                    if (!ctx.params.username)
                        throw "Required field [username] is missing.";
                    if (!ctx.params.password)
                        throw "Required field [password] is missing.";
                    if (!ctx.params.type)
                        throw "Required field [type] is missing.";
                    const type = ctx.params.type.toLocaleUpperCase();
                    if (!(['OPERATOR', 'USER'].includes(type.toLocaleUpperCase())))
                        throw "Parameter [type] allowed values are [USER], [OPERATOR]";
                    let user = null;
                    if ((ctx.params.username == global_1.Global.OPERATOR_ID) && (ctx.params.password == global_1.Global.OPERATOR_PASSWORD) && (type == global_1.Global.OPERATOR_TYPE)) {
                        user = {
                            id: global_1.Global.OPERATOR_ID,
                            name: global_1.Global.OPERATOR_NAME,
                            type: type
                        };
                    }
                    else {
                        /** TODO  **/
                        const authUser = await Customer_1.default.findOne({
                            where: {
                                username: ctx.params.username
                            }
                        });
                        if (authUser) {
                            if (bcrypt_1.verifySync(ctx.params.password, authUser.password))
                                user = {
                                    id: authUser.id,
                                    name: authUser.name,
                                    type: type
                                };
                        }
                    }
                    if (user) {
                        response.data = {
                            token: this.generateToken(user),
                            user: user
                        };
                        logger_1.Logger.success(logger, JSON.stringify(response.data.user));
                        logger_1.Logger.footer(logger);
                        return response;
                    }
                    else
                        throw global_1.Global.RESPONSE_MESSAGE_UNAUTHORIZED;
                }
                catch (error) {
                    response.code = -100;
                    response.description = global_1.Global.RESPONSE_MESSAGE_FAILED;
                    response.data = error;
                }
                if (response.code == 100) {
                    if (response.data instanceof Object)
                        logger_1.Logger.success(logger, JSON.stringify(response.data));
                    else
                        logger_1.Logger.success(logger, response.data);
                }
                else
                    logger_1.Logger.error(logger, response.data);
                logger_1.Logger.footer(logger);
                return response;
            }
        },
        verifyToken(ctx) {
            return this.verify(ctx.params.token, this.settings.JWT_SECRET);
        },
        resolveToken: {
            cache: {
                keys: ["token"],
                ttl: 60 * 60 // 1 hour
            },
            params: {
                token: "string"
            },
            handler(ctx) {
                return new this.Promise((resolve, reject) => {
                    jwt.verify(ctx.params.token, this.settings.JWT_SECRET, (err, decoded) => {
                        if (err)
                            return reject(err);
                        resolve(decoded);
                    });
                })
                    .then(decoded => {
                    if (decoded.id)
                        return decoded;
                });
            }
        },
    },
    methods: {
        generateToken(user) {
            return jwt.sign({
                id: user.id,
                name: user.name,
                alias: user.alias,
                avatar: user.avatar,
                type: user.type
            }, this.settings.JWT_SECRET, { expiresIn: 604800 });
        },
    },
};
module.exports = AuthService;
//# sourceMappingURL=auth.service.js.map