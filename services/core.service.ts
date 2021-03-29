"use strict"
import { ServiceSchema } from "moleculer"
import { Helper } from "../common/helper"
import { Global } from "../common/global"
import { Logger } from "../common/logger"
import { hashSync } from "@node-rs/bcrypt"
import { connection } from '../data/connection/Connection'
import Customer from '../data//model/Customer'
import { v4 } from 'uuid'

const CoreService: ServiceSchema = {
    name: "core",
    version: 1,
    settings: {
    },
    dependencies: [],
    actions: {
        async nodeInfo(ctx) {
            const logger = this.logger
            const response = Helper.response()
            Logger.header(logger, "nodeInfo", ctx.params, "")
            if (response.code == 100) {
                if (response.data instanceof Object) Logger.success(logger, JSON.stringify(response.data))
                else Logger.success(logger, ctx.broker.nodeID)
            }
            Logger.footer(logger)
            response.data = {
                node: ctx.broker.nodeID
            }
            return response
        },
        async userInfo(ctx) {
            const logger = this.logger
            const response = Helper.response()
            try {
                Logger.header(logger, "userInfo", ctx.params, ctx.meta.user.id)
                response.data = {
                    id: ctx.meta.user.id,
                    name: ctx.meta.user.name
                }
            } catch (error) {
                response.code = -100
                response.description = Global.RESPONSE_MESSAGE_FAILED
                response.data = error
            }
            if (response.code == 100) {
                if (response.data instanceof Object) Logger.success(logger, JSON.stringify(response.data))
                else Logger.success(logger, response.data)
            }
            else Logger.error(logger, response.data)
            Logger.footer(logger)
            return response
        },
        async connection(ctx) {
            const logger = this.logger
            const response = Helper.response()
            try {
                Logger.header(logger, "connection", ctx.params, ctx.meta.user.id)
                response.data = await connection.authenticate()
            } catch (error) {
                response.code = -100
                response.description = Global.RESPONSE_MESSAGE_FAILED
                response.data = error
            }
            if (response.code == 100) {
                if (response.data instanceof Object) Logger.success(logger, JSON.stringify(response.data))
                else Logger.success(logger, response.data)
            }
            else Logger.error(logger, response.data)
            Logger.footer(logger)
            return response
        },
        async saveCustomer(ctx) {
            const logger = this.logger
            const response = Helper.response()
            try {
                Logger.header(logger, "saveCustomer", ctx.params, ctx.meta.user.id)

                /***** MANDATORY PARAM VALIDATION ******/
                if (!ctx.params.name) throw "Required field [name] is missing."
                if (!ctx.params.email) throw "Required field [email] is missing."
                if (!ctx.params.mobile) throw "Required field [mobile] is missing."
                if (!ctx.params.username) throw "Required field [username] is missing."
                if (!ctx.params.password) throw "Required field [password] is missing."
                if (!ctx.params.department) throw "Required field [department] is missing."
                if (!ctx.params.notes) throw "Required field [notes] is missing."

                const id = v4().toUpperCase()
                const result = await Customer.create({
                    id: id,
                    name: ctx.params.name,
                    email: ctx.params.email,
                    mobile: ctx.params.mobile,
                    username: ctx.params.username,
                    password: hashSync(ctx.params.password, Global.CRYPTO_SALTROUNDS),
                    department: ctx.params.department,
                    notes: ctx.params.notes
                })

                this.broker.metrics.increment("sioi.customer.registration", 1)  /* METRICS */

                response.data = id
            } catch (error) {
                response.code = -100
                response.description = Global.RESPONSE_MESSAGE_FAILED
                if (error.original.sqlMessage) response.data =  error.original.sqlMessage
                else response.data = error
            }
            if (response.code == 100) {
                if (response.data instanceof Object) Logger.success(logger, JSON.stringify(response.data))
                else Logger.success(logger, response.data)
            }
            else Logger.error(logger, response.data)
            Logger.footer(logger)
            return response
        },
        async queryCustomer(ctx) {
            const logger = this.logger
            const response = Helper.response()
            try {
                Logger.header(logger, "queryCustomer", ctx.params, ctx.meta.user.id)

                /***** MANDATORY PARAM VALIDATION ******/
                if (!ctx.params.id) throw "Required field [id] is missing."
                const result = await Customer.findByPk(ctx.params.id)
                
                response.data = result == null ? Global.RESPONSE_MESSAGE_EMPTY : result
            } catch (error) {
                response.code = -100
                response.description = Global.RESPONSE_MESSAGE_FAILED
                if (error.original.sqlMessage) response.data =  error.original.sqlMessage
                else response.data = error
            }
            if (response.code == 100) {
                if (response.data instanceof Object) Logger.success(logger, JSON.stringify(response.data))
                else Logger.success(logger, response.data)
            }
            else Logger.error(logger, response.data)
            Logger.footer(logger)
            return response
        },
        //** ADD NEW ACTIONS HERE **/
        async editCustomer(ctx) {
            const logger = this.logger
            const response = Helper.response()
            try {
                Logger.header(logger, "editCustomer", ctx.params, ctx.meta.user.id)

                /***** MANDATORY PARAM VALIDATION ******/
                if (!ctx.params.id) throw "Required field [id] is missing."
                if (!ctx.params.name) throw "Required field [name] is missing."
                if (!ctx.params.email) throw "Required field [email] is missing."
                if (!ctx.params.mobile) throw "Required field [mobile] is missing."
                if (!ctx.params.username) throw "Required field [username] is missing."
                if (!ctx.params.password) throw "Required field [password] is missing."
                if (!ctx.params.department) throw "Required field [department] is missing."
                if (!ctx.params.notes) throw "Required field [notes] is missing."

                const result = await Customer.update({
                    name: ctx.params.name,
                    email: ctx.params.email,
                    mobile: ctx.params.mobile,
                    username: ctx.params.username,
                    password: hashSync(ctx.params.password, Global.CRYPTO_SALTROUNDS),
                    department: ctx.params.department,
                    notes: ctx.params.notes
                    },{
                        where: {
                            id: ctx.params.id
                          }
                })

                response.data = ctx.params.id
            } catch (error) {
                response.code = -100
                response.description = Global.RESPONSE_MESSAGE_FAILED
                if (error.original.sqlMessage) response.data =  error.original.sqlMessage
                else response.data = error
            }
            if (response.code == 100) {
                if (response.data instanceof Object) Logger.success(logger, JSON.stringify(response.data))
                else Logger.success(logger, response.data)
            }
            else Logger.error(logger, response.data)
            Logger.footer(logger)
            return response
        },
        async deleteCustomer(ctx) {
            const logger = this.logger
            const response = Helper.response()
            try {
                Logger.header(logger, "deleteCustomer", ctx.params, ctx.meta.user.id)

                /***** MANDATORY PARAM VALIDATION ******/
                if (!ctx.params.id) throw "Required field [id] is missing."
                const result = await Customer.destroy({
                    where: {
                      id: ctx.params.id
                    }
                  })
                
                response.data = result == null ? Global.RESPONSE_MESSAGE_EMPTY : result
            } catch (error) {
                response.code = -100
                response.description = Global.RESPONSE_MESSAGE_FAILED
                if (error.original.sqlMessage) response.data =  error.original.sqlMessage
                else response.data = error
            }
            if (response.code == 100) {
                if (response.data instanceof Object) Logger.success(logger, JSON.stringify(response.data))
                else Logger.success(logger, response.data)
            }
            else Logger.error(logger, response.data)
            Logger.footer(logger)
            return response
        },
    },
    events: {
        "core::node": {
            handler(payload) {
                Logger.info(this.logger, `Event: "core::node" -> ${payload}`)
            }
        }
    },
    methods: {
        cleanupList(object) {
            const data = []
            for (let item of object.items) {
                delete item.class
                delete item._id
                delete item._rev
            }
            return object
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
}

export = CoreService
