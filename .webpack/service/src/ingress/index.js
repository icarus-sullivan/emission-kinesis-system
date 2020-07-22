(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ingress/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ingress/index.js":
/*!******************************!*\
  !*** ./src/ingress/index.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst {\n  wrapper\n} = __webpack_require__(/*! @teleology/lambda-api */ \"@teleology/lambda-api\");\n\nconst {\n  v4: uuid\n} = __webpack_require__(/*! uuid */ \"uuid\");\n\nconst kinesis = __webpack_require__(/*! ../kinesis */ \"./src/kinesis/index.js\");\n\nconst stream = kinesis({\n  streamName: process.env.FIREHOSE_NAME\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (wrapper(async ({\n  data\n}) => {\n  const {\n    id = uuid(),\n    eventType,\n    eventPayload\n  } = data; // Write to kinesis\n\n  await stream.write({\n    id,\n    content: {\n      type,\n      payload\n    }\n  });\n  return {\n    statusCode: '200',\n    body: ''\n  };\n}));\n\n//# sourceURL=webpack:///./src/ingress/index.js?");

/***/ }),

/***/ "./src/kinesis/index.js":
/*!******************************!*\
  !*** ./src/kinesis/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const AWS = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n\nconst K = new AWS.Kinesis({\n  apiVersion: '2013-12-02'\n});\n\nconst batchRecordMap = ({\n  id,\n  content\n}) => ({\n  Data: Buffer.isBuffer(content) || typeof content === 'string' ? content : JSON.stringify(content),\n  PartitionKey: id\n}); // Proxy batch write to Kinesis\n\n\nconst batch = ({\n  streamName,\n  items\n}) => K.putRecords({\n  Records: items.map(batchRecordMap),\n  StreamName: streamName\n}).promise(); // Set up kinesis factory, initialize w/streamName\n\n\nmodule.exports = ({\n  streamName\n}) => ({\n  write: async arg => batch({\n    streamName,\n    items: Array.isArray(arg) ? arg : [arg]\n  })\n});\n\n//# sourceURL=webpack:///./src/kinesis/index.js?");

/***/ }),

/***/ "@teleology/lambda-api":
/*!****************************************!*\
  !*** external "@teleology/lambda-api" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@teleology/lambda-api\");\n\n//# sourceURL=webpack:///external_%22@teleology/lambda-api%22?");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"aws-sdk\");\n\n//# sourceURL=webpack:///external_%22aws-sdk%22?");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"uuid\");\n\n//# sourceURL=webpack:///external_%22uuid%22?");

/***/ })

/******/ })));