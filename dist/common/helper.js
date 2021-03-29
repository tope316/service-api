"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
const ResponseData_1 = require("../data/model/ResponseData");
class Helper {
    static response() {
        const response = new ResponseData_1.ResponseData();
        response.data = "<no data>";
        response.description = Helper.RESPONSE_SUCCESS;
        return response;
    }
}
exports.Helper = Helper;
Helper.RESPONSE_SUCCESS = "SUCCESS";
Helper.RESPONSE_FAILED = "FAILED";
//# sourceMappingURL=helper.js.map