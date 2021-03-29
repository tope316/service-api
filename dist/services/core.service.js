"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const helper_1 = require("../common/helper");
const global_1 = require("../common/global");
const logger_1 = require("../common/logger");
const bcrypt_1 = require("@node-rs/bcrypt");
const Connection_1 = require("../data/connection/Connection");
const Customer_1 = __importDefault(require("../data//model/Customer"));
const uuid_1 = require("uuid");
const CoreService = {
    name: "core",
    version: 1,
    settings: {},
    dependencies: [],
    actions: {
        async nodeInfo(ctx) {
            const logger = this.logger;
            const response = helper_1.Helper.response();
            logger_1.Logger.header(logger, "nodeInfo", ctx.params, "");
            if (response.code == 100) {
                if (response.data instanceof Object)
                    logger_1.Logger.success(logger, JSON.stringify(response.data));
                else
                    logger_1.Logger.success(logger, ctx.broker.nodeID);
            }
            logger_1.Logger.footer(logger);
            response.data = {
                node: ctx.broker.nodeID
            };
            return response;
        },
        async userInfo(ctx) {
            const logger = this.logger;
            const response = helper_1.Helper.response();
            try {
                logger_1.Logger.header(logger, "userInfo", ctx.params, ctx.meta.user.id);
                response.data = {
                    id: ctx.meta.user.id,
                    name: ctx.meta.user.name
                };
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
        },
        async connection(ctx) {
            const logger = this.logger;
            const response = helper_1.Helper.response();
            try {
                logger_1.Logger.header(logger, "connection", ctx.params, ctx.meta.user.id);
                response.data = await Connection_1.connection.authenticate();
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
        },
        async saveCustomer(ctx) {
            const logger = this.logger;
            const response = helper_1.Helper.response();
            try {
                logger_1.Logger.header(logger, "saveCustomer", ctx.params, ctx.meta.user.id);
                /***** MANDATORY PARAM VALIDATION ******/
                if (!ctx.params.name)
                    throw "Required field [name] is missing.";
                if (!ctx.params.email)
                    throw "Required field [email] is missing.";
                if (!ctx.params.mobile)
                    throw "Required field [mobile] is missing.";
                if (!ctx.params.username)
                    throw "Required field [username] is missing.";
                if (!ctx.params.password)
                    throw "Required field [password] is missing.";
                if (!ctx.params.department)
                    throw "Required field [department] is missing.";
                if (!ctx.params.notes)
                    throw "Required field [notes] is missing.";
                const id = uuid_1.v4().toUpperCase();
                const result = await Customer_1.default.create({
                    id: id,
                    name: ctx.params.name,
                    email: ctx.params.email,
                    mobile: ctx.params.mobile,
                    username: ctx.params.username,
                    password: bcrypt_1.hashSync(ctx.params.password, global_1.Global.CRYPTO_SALTROUNDS),
                    department: ctx.params.department,
                    notes: ctx.params.notes
                });
                this.broker.metrics.increment("sioi.customer.registration", 1); /* METRICS */
                response.data = id;
            }
            catch (error) {
                response.code = -100;
                response.description = global_1.Global.RESPONSE_MESSAGE_FAILED;
                if (error.original.sqlMessage)
                    response.data = error.original.sqlMessage;
                else
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
        },
        async queryCustomer(ctx) {
            const logger = this.logger;
            const response = helper_1.Helper.response();
            try {
                logger_1.Logger.header(logger, "queryCustomer", ctx.params, ctx.meta.user.id);
                /***** MANDATORY PARAM VALIDATION ******/
                if (!ctx.params.id)
                    throw "Required field [id] is missing.";
                const result = await Customer_1.default.findByPk(ctx.params.id);
                response.data = result == null ? global_1.Global.RESPONSE_MESSAGE_EMPTY : result;
            }
            catch (error) {
                response.code = -100;
                response.description = global_1.Global.RESPONSE_MESSAGE_FAILED;
                if (error.original.sqlMessage)
                    response.data = error.original.sqlMessage;
                else
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
        },
    },
    events: {
        "core::node": {
            handler(payload) {
                logger_1.Logger.info(this.logger, `Event: "core::node" -> ${payload}`);
            }
        }
    },
    methods: {
        cleanupList(object) {
            const data = [];
            for (let item of object.items) {
                delete item.class;
                delete item._id;
                delete item._rev;
            }
            return object;
        },
    },
    created() {
        this.broker.metrics.register({
            type: "counter",
            name: "sioi.customer.registration",
            description: "New Customer Registration",
            unit: "request",
            rate: false /* If true, compute 1 minute rate */
        });
    }
};
module.exports = CoreService;
//# sourceMappingURL=core.service.js.map