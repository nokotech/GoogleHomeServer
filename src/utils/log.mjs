import log4js from 'log4js';

log4js.configure({
  appenders: {
    // console: {  type: 'file', filename: './debug.log' }
    console: {  type: 'console' }
  },
  categories: {
    default: { appenders: ['console'], level: 'debug' },
  }
});
const logger = log4js.getLogger('system');

export default {
  info: p => logger.info(p),
  warn: p => logger.warn(p),
  error: p => logger.error(p),
  express: log4js.connectLogger(log4js.getLogger('system'), { level: log4js.levels.INFO }),
  json: p => JSON.stringify(p)
};
