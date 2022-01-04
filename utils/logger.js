const chalk = require("chalk").default;

/**
 * Logs an info message
 * @param {string} message
 */
module.exports.logInfo = (message) =>
  console.log(`${chalk.bgBlue("INFO")}: ${message}`);

/**
 * Logs a warning message
 * @param {string} message
 */
module.exports.logWarning = (message) =>
  console.log(`${chalk.bgYellow("WARNING")}: ${message}`);

/**
 * Logs an error message
 * @param {string} message
 */
module.exports.logErr = (message) =>
  console.log(`${chalk.bgRed("ERROR")}: ${message}`);
