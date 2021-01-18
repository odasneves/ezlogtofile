class ApolloLogger {
  constructor(logger) {
    this.log = logger;
  }

  requestDidStart() {
    const logger = this.log;
    const start = new Date().getTime();
    return {
      willSendResponse({ request }) {
        const end = new Date().getTime();
        logger.info('HTTP POST GRAPHQL - ' + (end - start) + 'ms ' +
          request.query.replace(/(\r\n|\n|\r|\t| +)/gm, ' '));
      }
    }
  }
}

module.exports = ApolloLogger;
