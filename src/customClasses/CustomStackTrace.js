var isString = require('../typeCheckers/isString');
var isNumber = require('../typeCheckers/isNumber');
var isFunction = require('../typeCheckers/isFunction');

/**
 * A function which is used as a default substitute to handle cases where an
 * Error's call site array was not properly generated or its length was not
 * greater than 0. This function aims to produce a basic notification that
 * CallSite extraction failed.
 * @function stubbedNoOp
 * @returns {String} - A JSON object serving as a notification with one
 *  property: error whose value is a string describing that a stack trace could
 *  not be captured.
 */
function stubbedNoOp ( ) {

  return JSON.stringify({
    error: "Unable to capture stack trace information"
  });
}

/**
 * The constuctor for CustomStackTrace takes no arugments and is solely meant
 * to instantiate properties on the instance. Each property should be externally
 * set using the corresponding set function.
 * @class CustomStackTrace
 * @classdesc CustomStackTrace is a class which is meant to store and control-
 *  for top-frame values on a stack trace dump. This class can be stringified
 *  for representation in JSON.
 * @property {String} filePath - The file path of CallSite object
 * @property {Number} lineNumber - The line number of the CallSite object
 * @property {String} functionName - The function name of the CallSite object
 * @property {Function} stringifyStucturedCallList - A function which is meant
 *  to produce the JSON representation of the full stack trace.
 */
function CustomStackTrace ( ) {

  this.filePath = "";
  this.lineNumber = -1;
  this.functionName = "";
  this.stringifyStucturedCallList = stubbedNoOp;
}

/**
 * Sets the filePath property on the instance
 * @function setFilePath
 * @chainable
 * @param {String} filePath - the file path of the CallSite object
 * @returns {this} - returns the instance for chaining
 */
CustomStackTrace.prototype.setFilePath = function ( filePath ) {
  var filePathChecked = isString(filePath) ? filePath : "";

  this.filePath = filePathChecked;

  return this;
}

/**
 * Sets the lineNumber property on the instance
 * @function setLineNumber
 * @chainable
 * @param {Number} lineNumber - the line number of the CallSite object
 * @returns {this} - returns the instance for chaining
 */
CustomStackTrace.prototype.setLineNumber = function ( lineNumber ) {
  var lineNumberChecked = isNumber(lineNumber) ? lineNumber : -1;

  this.lineNumber = lineNumberChecked;

  return this;
}

/**
 * Sets the functionName property on the instance
 * @function setFunctionName
 * @chainable
 * @param {String} functionName - the function name of the CallSite object
 * @returns {this} - returns the instance for chaining
 */
CustomStackTrace.prototype.setFunctionName = function ( functionName ) {
  var functionNameChecked = isString(functionName) ? functionName : "";

  this.functionName = functionNameChecked;

  return this;
}

/**
 * Sets the stringifyStucturedCallList on the instance
 * @function setStringifyStructuredCallList
 * @chainable
 * @param {Function} op - the function to produce the JSON representation of
 *  the full stack trace
 * @returns {this} - returns the instance for chaining
 */
CustomStackTrace.prototype.setStringifyStructuredCallList = function ( op ) {
  var opChecked = isFunction(op) ? op : stubbedNoOp;

  this.stringifyStucturedCallList = opChecked;

  return this;
}

module.exports = CustomStackTrace;