var isString = require('../typeCheckers/isString.js');
var isNumber = require('../typeCheckers/isNumber.js');

/**
 * The constructor for RequestInformationContainer does not take any arugments
 * and is solely meant to allocate several properties on the instance. The
 * constructor will init properties which closely relate to the ErrorMessage
 * context.httpRequest object properties. The properties on the instance should
 * be set through there corresponding setters as these will enforce type
 * validation around input.
 * @class RequestInformationContainer
 * @classdesc RequestInformationContainer is a class which is meant to
 * standardize and contain values corresponding to request information around
 * an error-inducing request. This class is meant to be a temporary container
 * for request information and essentially a standardized interface consumed by
 * the ErrorMessage class itself.
 * @property {String} url - The route/url that the request addressed
 * @property {String} method - The method that the request used
 * @property {String} referrer - The referrer of the request
 * @property {String} userAgent - The user-agent of the requester
 * @property {String} remoteAddress - The IP address of the requester
 * @property {Number} statusCode - The response status code
 */
function RequestInformationContainer ( ) {

  this.url = "";
  this.method = "";
  this.referrer = "";
  this.userAgent = "";
  this.remoteAddress = "";
  this.statusCode = 0;
}

/**
 * Sets the url property on the instance.
 * @chainable
 * @param {String} url - the url of the request
 * @returns {this} - returns the instance for chaining
 */
RequestInformationContainer.prototype.setUrl = function ( url ) {
  var urlChecked = isString(url) ? url : "";

  this.url = urlChecked;

  return this;
}

/**
 * Sets the method property on the instance.
 * @chainable
 * @param {String} method - the method of the request
 * @returns {this} - returns the instance for chaining
 */
RequestInformationContainer.prototype.setMethod = function ( method ) {
  var methodChecked = isString(method) ? method : "";

  this.method = methodChecked;

  return this;
}

/**
 * Sets the referrer property on the instance.
 * @chainable
 * @param {String} referrer - the referrer of the request
 * @returns {this} - returns the instance for chaining
 */
RequestInformationContainer.prototype.setReferrer = function ( referrer ) {
  var referrerChecked = isString(referrer) ? referrer : "";

  this.referrer = referrerChecked;

  return this;
}

/**
 * Sets the userAgent property on the instance.
 * @chainable
 * @param {String} userAgent - the user agent committing the request
 * @returns {this} - returns the instance for chaining
 */
RequestInformationContainer.prototype.setUserAgent = function ( userAgent ) {
  var userAgentChecked = isString(userAgent) ? userAgent : "";

  this.userAgent = userAgentChecked;

  return this;
}

/**
 * Sets the remoteAddress property on the instance.
 * @chainable
 * @param {String} remoteIp - the remote IP of the requester
 * @returns {this} - returns the instance for chaining
 */
RequestInformationContainer.prototype.setRemoteAddress = function ( remoteIp ) {
  var remoteIpChecked = isString(remoteIp) ? remoteIp : "";

  this.remoteAddress = remoteIpChecked;

  return this;
}

/**
 * Sets the statusCode property on the instance.
 * @chainable
 * @param {Number} statusCode - the status code of the response to the request
 * @returns {this} - returns the instance for chaining
 */
RequestInformationContainer.prototype.setStatusCode = function ( statusCode ) {
  var statusCodeChecked = isNumber(statusCode) ? statusCode : "";

  this.statusCode = statusCodeChecked;

  return this;
}

module.exports = RequestInformationContainer;