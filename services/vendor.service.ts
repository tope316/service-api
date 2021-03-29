"use strict"
import { ServiceSchema } from "moleculer"
import { Helper } from "../common/helper"
import { Global } from "../common/global"
import { Logger } from "../common/logger"
import { hashSync } from "@node-rs/bcrypt"
import { connection } from '../data/connection/Connection'
import Vendor from '../data/model/Vendor'
import { v4 } from 'uuid'

const VendorService: ServiceSchema = {
    name: "vendor",
    version: 1,
    settings: {
    },
    dependencies: [],
    actions: {
        async addVendor(ctx) {
            const logger = this.logger
            const response = Helper.response()
            try {
                Logger.header(logger, "addVendor", ctx.params, ctx.meta.user.id)

                /***** MANDATORY PARAM VALIDATION ******/
                if (!ctx.params.Company_Code) throw "Required field [Company_Code] is missing."

                const id = v4().toUpperCase()
                const result = await Vendor.create({
                    id: id,
                    Company_Code: ctx.params.Company_Code,
                    Company: ctx.params.Company,
                    Building: ctx.params.Building,
                    Street: ctx.params.Street,
                    Area: ctx.params.Area,
                    Country: ctx.params.Country,
                    Remarks: ctx.params.Remarks,
                    Phone: ctx.params.Phone,
                    Fax: ctx.params.Fax,
                    Telex: ctx.params.Telex,
                    Contact: ctx.params.Contact,
                    Position: ctx.params.Position,
                    Last_Txn: ctx.params.Last_Txn,
                    Last_Pay: ctx.params.Last_Pay,
                    Credit_Limit: ctx.params.Credit_Limit,
                    Due_Method: ctx.params.Due_Method,
                    Due_Day: ctx.params.Due_Day,
                    Include: ctx.params.Include,
                    LastAccessed: ctx.params.LastAccessed,
                    InpUser: ctx.params.InpUser,
                    EditUser: ctx.params.EditUser,
                    coy_id: ctx.params.coy_id,
                    mon_offset: ctx.params.mon_offset,
                    arap_category: ctx.params.arap_category,
                    paycode: ctx.params.paycode,
                    currency: ctx.params.currency,
                    creditdate: ctx.params.creditdate,
                    orig_currency: ctx.params.orig_currency,
                    doc_currency: ctx.params.doc_currency,
                    warehouse_code: ctx.params.warehouse_code,
                    shipto_code: ctx.params.shipto_code,
                    BusinessType: ctx.params.BusinessType,
                    email: ctx.params.email,
                    category_code: ctx.params.category_code
                })

                this.broker.metrics.increment("sioi.vendor.registration", 1)  /* METRICS */

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
        async queryVendor(ctx) {
            const logger = this.logger
            const response = Helper.response()
            try {
                Logger.header(logger, "queryVendor", ctx.params, ctx.meta.user.id)

                /***** MANDATORY PARAM VALIDATION ******/
                if (!ctx.params.id) throw "Required field [id] is missing."
                const result = await Vendor.findByPk(ctx.params.id)
                
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
        async editVendor(ctx) {
            const logger = this.logger
            const response = Helper.response()
            try {
                Logger.header(logger, "editVendor", ctx.params, ctx.meta.user.id)

                /***** MANDATORY PARAM VALIDATION ******/
                if (!ctx.params.id) throw "Required field [id] is missing."
                if (!ctx.params.Company_Code) throw "Required field [Company_Code] is missing."

                const result = await Vendor.update({
                    Company_Code: ctx.params.Company_Code,
                    Company: ctx.params.Company,
                    Building: ctx.params.Building,
                    Street: ctx.params.Street,
                    Area: ctx.params.Area,
                    Country: ctx.params.Country,
                    Remarks: ctx.params.Remarks,
                    Phone: ctx.params.Phone,
                    Fax: ctx.params.Fax,
                    Telex: ctx.params.Telex,
                    Contact: ctx.params.Contact,
                    Position: ctx.params.Position,
                    Last_Txn: ctx.params.Last_Txn,
                    Last_Pay: ctx.params.Last_Pay,
                    Credit_Limit: ctx.params.Credit_Limit,
                    Due_Method: ctx.params.Due_Method,
                    Due_Day: ctx.params.Due_Day,
                    Include: ctx.params.Include,
                    LastAccessed: ctx.params.LastAccessed,
                    InpUser: ctx.params.InpUser,
                    EditUser: ctx.params.EditUser,
                    coy_id: ctx.params.coy_id,
                    mon_offset: ctx.params.mon_offset,
                    arap_category: ctx.params.arap_category,
                    paycode: ctx.params.paycode,
                    currency: ctx.params.currency,
                    creditdate: ctx.params.creditdate,
                    orig_currency: ctx.params.orig_currency,
                    doc_currency: ctx.params.doc_currency,
                    warehouse_code: ctx.params.warehouse_code,
                    shipto_code: ctx.params.shipto_code,
                    BusinessType: ctx.params.BusinessType,
                    email: ctx.params.email,
                    category_code: ctx.params.category_code
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
        async deleteVendor(ctx) {
            const logger = this.logger
            const response = Helper.response()
            try {
                Logger.header(logger, "deleteVendor", ctx.params, ctx.meta.user.id)

                /***** MANDATORY PARAM VALIDATION ******/
                if (!ctx.params.id) throw "Required field [id] is missing."
                const result = await Vendor.destroy({
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
        async queryAllVendor(ctx) {
            const logger = this.logger
            const response = Helper.response()
            try {
                Logger.header(logger, "queryAllVendor", '', ctx.meta.user.id)

                const result = await Vendor.findAll()
                
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
        "vendor::node": {
            handler(payload) {
                Logger.info(this.logger, `Event: "vendor::node" -> ${payload}`)
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
            name: "sioi.vendor.registration", 
            description: "New Vendor Registration", 
            unit: "request",
            rate: false /* If true, compute 1 minute rate */
        });
    }
}

export = VendorService
