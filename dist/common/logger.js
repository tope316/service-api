"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
class Logger {
    static header(logger, method, params, identity) {
        logger.info('');
        logger.info(chalk_1.default.whiteBright("**********************************"));
        logger.info(chalk_1.default.whiteBright("*******"), chalk_1.default.bgYellowBright.blackBright("   SERVICE CALL   "), chalk_1.default.whiteBright("*******"));
        logger.info(chalk_1.default.whiteBright("**********************************"));
        logger.info(chalk_1.default.yellowBright("Method:"), chalk_1.default.cyanBright(method));
        logger.info(chalk_1.default.yellowBright("Parameter:"), chalk_1.default.cyanBright(`${JSON.stringify(params)}`));
        logger.info(chalk_1.default.yellowBright("Identity:"), chalk_1.default.cyanBright(`${JSON.stringify(identity)}`));
        logger.info(chalk_1.default.whiteBright("**********************************"));
    }
    static info(logger, text) {
        logger.info(chalk_1.default.greenBright(text));
    }
    static success(logger, text) {
        logger.info(chalk_1.default.bgGreen.whiteBright("SUCCESS: " + text));
    }
    static error(logger, text) {
        logger.error(chalk_1.default.bgRed.whiteBright("ERROR: " + text));
    }
    static footer(logger) {
        logger.info(chalk_1.default.whiteBright("**********************************"));
        logger.info('');
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map