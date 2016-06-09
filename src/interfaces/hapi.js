var ErrorMessage = require('../customClasses/ErrorMessage.js');
var hapiRequestInformationExtractor = require('../requestInformationExtractors/hapiRequestInformationExtractor.js');
var errorHandlerRouter = require('../errorHandlerRouter.js');

/**
 * The Hapi error handler function serves simply to create an error message
 * and begin that error message on the path of correct population.
 * @function hapiErrorHandler
 * @param {Object} req - The Hapi request object
 * @param {Any} err - The error input
 * @param {Object} config - the env configuration
 * @returns {ErrorMessage} - a partially or fully populated instance of
 *  ErrorMessage
 */
function hapiErrorHandler ( req, err, config ) {

  var em = new ErrorMessage()
    .consumeRequestInformation(hapiRequestInformationExtractor(req))
    .setServiceContext(
      config.serviceContext.service
      , config.serviceContext.version
    );

  errorHandlerRouter(err, em);

  return em;
}

/**
 * The register function serves to attach the hapiErrorHandler to specific
 * points in the hapi request-response lifecycle. Namely: it attaches to the
 * 'request-error' event in Hapi which is emitted when a plugin or receiver
 * throws an error while executing and the 'onPreResponse' event to intercept
 * error code carrying requests before they are sent back to the client so that
 * the errors can be logged to the Error Reporting API.
 * @function hapiRegisterFunction
 * @param {AuthClient} client - A bound reference to the auth client for
 *  communication with the Google Error API
 * @param {Object} config - the environmental configuration
 * @param {Hapi.Server} server - A Hapi server instance
 * @param {Object} options - The server configuration options object
 * @param {Function} next - The Hapi callback to move execution to the next
 *  plugin
 * @returns {Undefined} - returns the execution of the next callback
 */
function hapiRegisterFunction ( client, config, server, options, next ) {

  server.on(
    'request-error'
    , ( req, err ) => {

      var em = hapiErrorHandler(req, err, config);
      client.sendError(em);
    }
  );

  server.ext(
    "onPreResponse"
    , function ( request, reply ) {

      var em = null;
      if ( request.response.isBoom ) {
        em = hapiErrorHandler(
          request
          , new Error(request.response.message)
          , config
        );
        client.sendError(em);
      }

      reply.continue();
    }
  );

  return next();
}

/**
 * The handler setup function serves to create the actual Hapi plugin object
 * which consists of some basic Hapi metadata and a bound instance of the
 * hapiRegisterFunction which is bound to a null context and two initial
 * arugments: an inited client which the handler will use to send information
 * back to Error Reporting API and an object which contains the environmental
 * configuration.
 * @param {AuthClient} client - an inited auth client instance
 * @param {Object} config - the environmental configuration
 * @returns {Object} - the actual Hapi plugin
 */
function handlerSetup ( client, config ) {
  var hapiPlugin = {
    register: hapiRegisterFunction.bind(null, client, config)
  };

  hapiPlugin.register.attributes = {
    name: 'stackdriverErrorReportingPlugin'
    , version: '0.0.1'
  };

  return hapiPlugin;
}

module.exports = handlerSetup;