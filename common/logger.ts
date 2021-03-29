import chalk from "chalk"

export class Logger { 

    static header(logger, method, params, identity): void {
        logger.info('') 
        logger.info(chalk.whiteBright("**********************************"))
        logger.info(chalk.whiteBright("*******"), chalk.bgYellowBright.blackBright("   SERVICE CALL   "), chalk.whiteBright("*******"))
        logger.info(chalk.whiteBright("**********************************"))
        logger.info(chalk.yellowBright("Method:"), chalk.cyanBright(method))
        logger.info(chalk.yellowBright("Parameter:"), chalk.cyanBright(`${JSON.stringify(params)}`))
        logger.info(chalk.yellowBright("Identity:"), chalk.cyanBright(`${JSON.stringify(identity)}`))
        logger.info(chalk.whiteBright("**********************************"))
    }
 
    static info(logger, text): void {
        logger.info(chalk.greenBright(text))
    }    

    static success(logger, text): void {
        logger.info(chalk.bgGreen.whiteBright("SUCCESS: " + text))
    }  

    static error(logger, text): void {
        logger.error(chalk.bgRed.whiteBright("ERROR: " + text))
    }  

    static footer(logger): void {
        logger.info(chalk.whiteBright("**********************************"))
        logger.info('')
    }    
 } 