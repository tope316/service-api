import { ServiceSchema } from "moleculer"
import * as jwt from "jsonwebtoken"
import { Helper } from "../common/helper"
import { Logger } from "../common/logger"
import { Global } from "../common/global"
import Customer from '../data//model/Customer'
import { verifySync } from "@node-rs/bcrypt"

const AuthService: ServiceSchema = {
    name: "auth",
    version: 1,
    settings: {
        JWT_SECRET: process.env.JWT_SECRET || "W3Ar3Flatt3ningTheW0rld",
    },
    dependencies: [],
    actions: {
        authenticate: {
            async handler(ctx) {
                const logger = this.logger
                const response = Helper.response()
                try {

                    Logger.header(logger, "authenticate", ctx.params, ctx.params.username)

                    /***** MANDATORY PARAM VALIDATION ******/
                    if (!ctx.params.username) throw "Required field [username] is missing."
                    if (!ctx.params.password) throw "Required field [password] is missing."
                    if (!ctx.params.type) throw "Required field [type] is missing."

                    const type = ctx.params.type.toLocaleUpperCase()
                    if (!(['OPERATOR', 'USER'].includes(type.toLocaleUpperCase()))) throw "Parameter [type] allowed values are [USER], [OPERATOR]"

                    let user = null
                    if ((ctx.params.username == Global.OPERATOR_ID) && (ctx.params.password == Global.OPERATOR_PASSWORD) && (type == Global.OPERATOR_TYPE)) {
                        user = {
                            id: Global.OPERATOR_ID,
                            name: Global.OPERATOR_NAME,
                            type: type
                        }
                    }
                    else {
                        /** TODO  **/
                        const authUser = await Customer.findOne({
                            where: {
                              username: ctx.params.username
                            }
                          })
                          if (authUser) {
                            if (verifySync(ctx.params.password, authUser.password)) 
                            user = {
                                id: authUser.id,
                                name: authUser.name,
                                type: type
                            } 
                          }
                    }
                    if (user) {
                        response.data = {
                            token: this.generateToken(user),
                            user: user
                        }
                        Logger.success(logger, JSON.stringify(response.data.user))
                        Logger.footer(logger)
                        return response
                    }
                    else throw Global.RESPONSE_MESSAGE_UNAUTHORIZED
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
            }
        },
        verifyToken(ctx) {
            return this.verify(ctx.params.token, this.settings.JWT_SECRET)
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
                            return reject(err)
                        resolve(decoded)
                    })
                })
                    .then(decoded => {
                        if (decoded.id) return decoded
                    })
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
            }, this.settings.JWT_SECRET, { expiresIn: 604800 })
        },
    },

}

export = AuthService
