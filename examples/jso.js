(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jso"] = factory();
	else
		root["jso"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Config.js":
/*!***********************!*\
  !*** ./src/Config.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Config)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Config = /*#__PURE__*/function () {
  function Config() {
    _classCallCheck(this, Config);

    this.config = {};

    for (var i = 0; i < arguments.length; i++) {
      Object.assign(this.config, arguments[i]);
    } // enable pkce when token endpoint is provided


    if (this.config.token) this.config.use_pkce = true;
  }

  _createClass(Config, [{
    key: "has",
    value: function has(key) {
      var pointer = this.config;
      var splittedKeys = key.split('.');
      var i = 0;

      for (i = 0; i < splittedKeys.length; i++) {
        if (pointer.hasOwnProperty(splittedKeys[i])) {
          pointer = pointer[splittedKeys[i]];
        } else {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "getValue",
    value: function getValue(key, defaultValue, isRequired) {
      var isRequired = isRequired || false;
      var pointer = this.config;
      var splittedKeys = key.split('.');
      var i = 0;

      for (i = 0; i < splittedKeys.length; i++) {
        if (pointer.hasOwnProperty(splittedKeys[i])) {
          // console.log("POINTING TO " + splittedKeys[i]);
          pointer = pointer[splittedKeys[i]];
        } else {
          pointer = undefined;
          break;
        }
      }

      if (typeof pointer === 'undefined') {
        if (isRequired) {
          throw new Error("Configuration option [" + splittedKeys[i] + "] required but not provided.");
        }

        return defaultValue;
      }

      return pointer;
    }
  }]);

  return Config;
}();



/***/ }),

/***/ "./src/EventEmitter.js":
/*!*****************************!*\
  !*** ./src/EventEmitter.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EventEmitter)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EventEmitter = /*#__PURE__*/function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);
  }

  _createClass(EventEmitter, [{
    key: "on",
    value: function on(type, callback) {
      if (!this._callbacks) {
        this._callbacks = {};
      }

      if (!this._callbacks[type]) {
        this._callbacks[type] = [];
      }

      this._callbacks[type].push(callback);
    }
  }, {
    key: "emit",
    value: function emit(type) {
      if (!this._callbacks) {
        this._callbacks = {};
      }

      if (!this._callbacks[type]) {
        this._callbacks[type] = [];
      }

      var args = Array.prototype.slice.call(arguments, 1);

      for (var i = 0; i < this._callbacks[type].length; i++) {
        this._callbacks[type][i].apply(this, args);
      }
    }
  }]);

  return EventEmitter;
}();



/***/ }),

/***/ "./src/HTTP/Fetcher.js":
/*!*****************************!*\
  !*** ./src/HTTP/Fetcher.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Fetcher)
/* harmony export */ });
/* harmony import */ var _errors_ExpiredTokenError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors/ExpiredTokenError */ "./src/errors/ExpiredTokenError.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Fetcher = /*#__PURE__*/function () {
  function Fetcher(jso) {
    _classCallCheck(this, Fetcher);

    this.jso = jso;
  }

  _createClass(Fetcher, [{
    key: "_fetch",
    value: function _fetch(url, opts) {
      return fetch(url, opts).then(function (response) {
        if (response.status === 401) {
          throw new _errors_ExpiredTokenError__WEBPACK_IMPORTED_MODULE_0__.default();
        }

        return response;
      });
    }
  }, {
    key: "fetch",
    value: function fetch(url, opts, reccur) {
      var _this = this;

      reccur = reccur ? reccur : 0;

      if (reccur > 2) {
        throw new Error("Reccursion error. Expired tokens deleted and tried again multiple times.");
      }

      var getTokenOpts = {};
      var fetchOpts = {
        'mode': 'cors'
      };

      if (opts) {
        fetchOpts = opts;
        Object.assign(fetchOpts, opts);
      }

      if (opts && opts.jso) {
        Object.assign(getTokenOpts, opts.jso);
      }

      return this.jso.getToken(getTokenOpts).catch(function (err) {
        console.error("Error fetching token to use ", err);
      }).then(function (token) {
        // console.log("I got the token: ", token.access_token)
        if (!fetchOpts.headers) {
          fetchOpts.headers = {};
        }

        fetchOpts.headers.Authorization = 'Bearer ' + token.access_token;
        return _this._fetch(url, fetchOpts).catch(function (err) {
          if (err instanceof _errors_ExpiredTokenError__WEBPACK_IMPORTED_MODULE_0__.default) {
            console.error("Token was expired. Deleting all tokens for this provider and get a new one", err);

            _this.jso.wipeTokens();

            return _this.fetch(url, opts, reccur + 1);
          }
        });
      });
    }
  }]);

  return Fetcher;
}();



/***/ }),

/***/ "./src/HTTP/FetcherJQuery.js":
/*!***********************************!*\
  !*** ./src/HTTP/FetcherJQuery.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FetcherJQuery)
/* harmony export */ });
/* harmony import */ var _errors_ExpiredTokenError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors/ExpiredTokenError */ "./src/errors/ExpiredTokenError.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var FetcherJQuery = /*#__PURE__*/function () {
  function FetcherJQuery(jso, jquery) {
    _classCallCheck(this, FetcherJQuery);

    this.jso = jso;
    this.jquery = jquery;
  }

  _createClass(FetcherJQuery, [{
    key: "_fetch",
    value: function _fetch(url, opts) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        opts.done = resolve;

        opts.fail = function (jqXHR, textStatus, errorThrown) {
          var status = parseInt(textStatus, 10);

          if (status === 401) {
            _this.jso.wipeTokens();

            return reject(new _errors_ExpiredTokenError__WEBPACK_IMPORTED_MODULE_0__.default());
          }

          return reject(errorThrown);
        };

        return _this.jquery.ajax(url, opts);
      });
    }
  }, {
    key: "fetch",
    value: function fetch(url, opts, reccur) {
      var _this2 = this;

      reccur = reccur ? reccur : 0;

      if (reccur > 2) {
        throw new Error("Reccursion error. Expired tokens deleted and tried again multiple times.");
      }

      var getTokenOpts = {};
      var fetchOpts = {
        'mode': 'cors'
      };

      if (opts) {
        fetchOpts = opts;
        Object.assign(fetchOpts, opts);
      }

      if (opts && opts.jso) {
        Object.assign(getTokenOpts, opts.jso);
      }

      return this.jso.getToken(getTokenOpts).catch(function (err) {
        console.error("Error fetching token to use ", err);
      }).then(function (token) {
        // console.log("I got the token: ", token.access_token)
        if (!fetchOpts.headers) {
          fetchOpts.headers = {};
        }

        fetchOpts.headers.Authorization = 'Bearer ' + token.access_token;
        return _this2._fetch(url, fetchOpts).catch(function (err) {
          if (err instanceof _errors_ExpiredTokenError__WEBPACK_IMPORTED_MODULE_0__.default) {
            console.error("Token was expired. Deleting all tokens for this provider and get a new one", err);

            _this2.jso.wipeTokens();

            return _this2.fetch(url, opts, reccur + 1);
          }
        });
      });
    }
  }]);

  return FetcherJQuery;
}();



/***/ }),

/***/ "./src/Loaders/BasicLoader.js":
/*!************************************!*\
  !*** ./src/Loaders/BasicLoader.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BasicLoader)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BasicLoader = /*#__PURE__*/function () {
  function BasicLoader(url) {
    _classCallCheck(this, BasicLoader);

    console.log("Initializing a loader with url " + url);
    this.url = url;
  }

  _createClass(BasicLoader, [{
    key: "execute",
    value: function execute() {}
  }]);

  return BasicLoader;
}();



/***/ }),

/***/ "./src/Loaders/HTTPRedirect.js":
/*!*************************************!*\
  !*** ./src/Loaders/HTTPRedirect.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HTTPRedirect)
/* harmony export */ });
/* harmony import */ var _BasicLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicLoader */ "./src/Loaders/BasicLoader.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var HTTPRedirect = /*#__PURE__*/function (_BasicLoader) {
  _inherits(HTTPRedirect, _BasicLoader);

  var _super = _createSuper(HTTPRedirect);

  function HTTPRedirect() {
    _classCallCheck(this, HTTPRedirect);

    return _super.apply(this, arguments);
  }

  _createClass(HTTPRedirect, [{
    key: "execute",
    value: function execute() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        window.location = _this.url;
      });
    }
  }]);

  return HTTPRedirect;
}(_BasicLoader__WEBPACK_IMPORTED_MODULE_0__.default);



/***/ }),

/***/ "./src/Loaders/IFrameActive.js":
/*!*************************************!*\
  !*** ./src/Loaders/IFrameActive.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IFrameActive)
/* harmony export */ });
/* harmony import */ var _BasicLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicLoader */ "./src/Loaders/BasicLoader.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var IFrameActive = /*#__PURE__*/function (_BasicLoader) {
  _inherits(IFrameActive, _BasicLoader);

  var _super = _createSuper(IFrameActive);

  function IFrameActive() {
    _classCallCheck(this, IFrameActive);

    return _super.apply(this, arguments);
  }

  _createClass(IFrameActive, [{
    key: "execute",
    value: function execute() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        /*
        // Create IE + others compatible event handler
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent"
        var eventer = window[eventMethod]
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message"
        */
        // Using a specific expected name for now.  Would be better if the loader constructor also passed in
        //  "opts" structure, so each loader might add specific initialization properties necessary fo the
        //  particular loader
        var theIframe = document.getElementById("jsoActiveIframe");

        function doIframeLoad() {
          var oWin = theIframe.contentWindow; // When page is loaded try to post a message to it to get back the message

          try {
            theIframe.contentWindow.postMessage("JSO", window.location.origin);
          } catch (e) {// do nothing if this window is from a different domain and it fails
          } // In case we need to send a post message to the loaded iframe window before it
          // can send us a message

        }

        theIframe.addEventListener("load", doIframeLoad, true);

        var messageReceiver = function messageReceiver(event) {
          // Check origin
          if (event.origin != location.origin) return;
          var url = event.data.toString();

          if (-1 != url.indexOf("?code=")) {
            resolve(url);
          }
        }; // Setup call back function to receive postMessage from page loaded in iframe


        window.addEventListener("message", messageReceiver, false);
        theIframe.setAttribute("src", _this.url);

        if (window.focus) {
          if (theIframe.contentWindow) {
            theIframe.contentWindow.focus();
          }
        }
      });
    }
  }]);

  return IFrameActive;
}(_BasicLoader__WEBPACK_IMPORTED_MODULE_0__.default);



/***/ }),

/***/ "./src/Loaders/IFramePassive.js":
/*!**************************************!*\
  !*** ./src/Loaders/IFramePassive.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IFramePassive)
/* harmony export */ });
/* harmony import */ var _BasicLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicLoader */ "./src/Loaders/BasicLoader.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var IFramePassive = /*#__PURE__*/function (_BasicLoader) {
  _inherits(IFramePassive, _BasicLoader);

  var _super = _createSuper(IFramePassive);

  function IFramePassive(url) {
    var _this;

    _classCallCheck(this, IFramePassive);

    _this = _super.call(this, url);
    _this.timeout = 5000;
    _this.callback = null;
    _this.isCompleted = false;
    _this.id = 'jso_passive_iframe_' + _utils__WEBPACK_IMPORTED_MODULE_1__.default.uuid(); // Create IE + others compatible event handler

    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    _this.iframe = document.createElement('iframe');

    _this.iframe.setAttribute('id', _this.id);

    _this.iframe.setAttribute('src', url);

    _this.iframe.addEventListener('load', function (e) {
      var object = null;

      try {
        if (_this.iframe.contentWindow.location.hash) {
          var encodedHash = _this.iframe.contentWindow.location.hash.substring(1);

          object = _utils__WEBPACK_IMPORTED_MODULE_1__.default.parseQueryString(encodedHash);
        } else if (_this.iframe.contentWindow.location.search) {
          var _encodedHash = _this.iframe.contentWindow.location.search.substring(1);

          object = _utils__WEBPACK_IMPORTED_MODULE_1__.default.parseQueryString(_encodedHash);
        }

        if (object !== null) {
          _this._completed(object);
        } else {
          _this._failed(new Error("Failed to obtain response value from iframe"));
        }
      } catch (err) {// Most likely not able to access the content window because of same-origin policy.
        //
        // Ignore this error, as this is likely to happen during the SSO redirect loop, but the load
        // event may be triggered multiple times, so it is not neccessary a problem that the first is not
        // accessible.
      }
    });

    return _this;
  }

  _createClass(IFramePassive, [{
    key: "execute",
    value: function execute() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.callback = resolve;
        _this2.errorCallback = reject;
        document.getElementsByTagName('body')[0].appendChild(_this2.iframe);
        setTimeout(function () {
          _this2._failed(new Error("Loading iframe timed out"));
        }, _this2.timeout);
      });
    }
  }, {
    key: "_cleanup",
    value: function _cleanup() {
      var element = document.getElementById(this.id);
      element.parentNode.removeChild(element);
    }
  }, {
    key: "_failed",
    value: function _failed(err) {
      if (!this.isCompleted) {
        if (this.errorCallback && typeof this.errorCallback === 'function') {
          this.errorCallback(err);
        }

        this.isCompleted = true;

        this._cleanup();
      }
    }
  }, {
    key: "_completed",
    value: function _completed(response) {
      if (!this.isCompleted) {
        if (this.callback && typeof this.callback === 'function') {
          this.callback(response);
        }

        this.isCompleted = true;

        this._cleanup();
      }
    }
  }]);

  return IFramePassive;
}(_BasicLoader__WEBPACK_IMPORTED_MODULE_0__.default);



/***/ }),

/***/ "./src/Loaders/Popup.js":
/*!******************************!*\
  !*** ./src/Loaders/Popup.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Popup)
/* harmony export */ });
/* harmony import */ var _BasicLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicLoader */ "./src/Loaders/BasicLoader.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var Popup = /*#__PURE__*/function (_BasicLoader) {
  _inherits(Popup, _BasicLoader);

  var _super = _createSuper(Popup);

  function Popup() {
    _classCallCheck(this, Popup);

    return _super.apply(this, arguments);
  }

  _createClass(Popup, [{
    key: "execute",
    value: function execute() {
      var _this = this;

      /*
      * In the popup's scripts, running on <http://example.org>:
      */
      return new Promise(function (resolve, reject) {
        // window.addEventListener("jso_message", function(event) {
        // 	console.log("Sent a message to event.origin " + event.origin + " and got the following in response:")
        // 	console.log("<em>", event.data, "</em>")
        // 	var url = newwindow.location.href
        // 	// console.error("Popup location is ", url, newwindow.location)
        //   resolve(url)
        // })
        window.popupCompleted = function () {
          var url = newwindow.location.href;
          resolve(url);
        };

        var w = 400;
        var h = 600;
        var left = screen.width / 2 - w / 2;
        var top = screen.height / 2 - h / 2;
        var newwindow = window.open(_this.url, 'jso-popup-auth', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

        if (newwindow === null) {
          throw new Error("Error loading popup window");
        }

        if (window.focus) {
          newwindow.focus();
        }
      });
    }
  }]);

  return Popup;
}(_BasicLoader__WEBPACK_IMPORTED_MODULE_0__.default);



/***/ }),

/***/ "./src/errors/Error.js":
/*!*****************************!*\
  !*** ./src/errors/Error.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Error)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Error = /*#__PURE__*/function () {
  function Error(props) {
    _classCallCheck(this, Error);

    for (var key in props) {
      this[key] = props[key];
    }
  }

  _createClass(Error, [{
    key: "set",
    value: function set(key, value) {
      this[key] = value;
      return this;
    }
  }]);

  return Error;
}();



/***/ }),

/***/ "./src/errors/ExpiredTokenError.js":
/*!*****************************************!*\
  !*** ./src/errors/ExpiredTokenError.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ExpiredTokenError)
/* harmony export */ });
/* harmony import */ var _Error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Error */ "./src/errors/Error.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var ExpiredTokenError = /*#__PURE__*/function (_Error) {
  _inherits(ExpiredTokenError, _Error);

  var _super = _createSuper(ExpiredTokenError);

  function ExpiredTokenError() {
    _classCallCheck(this, ExpiredTokenError);

    return _super.apply(this, arguments);
  }

  return ExpiredTokenError;
}(_Error__WEBPACK_IMPORTED_MODULE_0__.default);



/***/ }),

/***/ "./src/errors/OAuthResponseError.js":
/*!******************************************!*\
  !*** ./src/errors/OAuthResponseError.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OAuthResponseError)
/* harmony export */ });
/* harmony import */ var _Error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Error */ "./src/errors/Error.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var OAuthResponseError = /*#__PURE__*/function (_Error) {
  _inherits(OAuthResponseError, _Error);

  var _super = _createSuper(OAuthResponseError);

  function OAuthResponseError() {
    _classCallCheck(this, OAuthResponseError);

    return _super.apply(this, arguments);
  }

  _createClass(OAuthResponseError, [{
    key: "toString",
    value: function toString() {
      var header = this.error || 'unknown';
      var descr = this.error_description || 'unknown';
      return 'OAuthResponseError: [' + header + ']: ' + descr;
    }
  }]);

  return OAuthResponseError;
}(_Error__WEBPACK_IMPORTED_MODULE_0__.default);



/***/ }),

/***/ "./src/store-session.js":
/*!******************************!*\
  !*** ./src/store-session.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Store = /*#__PURE__*/function () {
  function Store() {
    _classCallCheck(this, Store);
  }
  /*
  	saveState stores an object with an Identifier.
  	TODO: Ensure that both sessionStorage and JSON encoding has fallbacks for ancient browsers.
  	In the state object, we put the request object, plus these parameters:
  	  * restoreHash
  	  * connector_name
  	  * scopes
  	 */


  _createClass(Store, [{
    key: "saveState",
    value: function saveState(state, obj) {
      sessionStorage.setItem("state-" + state, JSON.stringify(obj));
    }
    /**
     * getStage()  returns the state object, but also removes it.
     * @type {Object}
     */

  }, {
    key: "getState",
    value: function getState(state) {
      // log("getState (" + state+ ")");
      var obj = JSON.parse(sessionStorage.getItem("state-" + state));
      sessionStorage.removeItem("state-" + state);
      return obj;
    }
    /*
     * Checks if a token, has includes a specific scope.
     * If token has no scope at all, false is returned.
     */

  }, {
    key: "hasScope",
    value: function hasScope(token, scope) {
      var i;
      if (!token.scopes) return false;

      for (i = 0; i < token.scopes.length; i++) {
        if (token.scopes[i] === scope) return true;
      }

      return false;
    }
    /*
     * Takes an array of tokens, and removes the ones that
     * are expired, and the ones that do not meet a scopes requirement.
     */

  }, {
    key: "filterTokens",
    value: function filterTokens(tokens, scopes) {
      var i,
          j,
          result = [],
          now = _utils__WEBPACK_IMPORTED_MODULE_0__.default.epoch(),
          usethis;
      if (!scopes) scopes = [];

      for (i = 0; i < tokens.length; i++) {
        usethis = true; // Filter out expired tokens. Tokens that is expired in 1 second from now.

        if (tokens[i].expires && tokens[i].expires < now + 1) usethis = false; // Filter out this token if not all scope requirements are met

        for (j = 0; j < scopes.length; j++) {
          if (!this.hasScope(tokens[i], scopes[j])) usethis = false;
        }

        if (usethis) result.push(tokens[i]);
      }

      return result;
    }
    /*
     * saveTokens() stores a list of tokens for a provider.
    		Usually the tokens stored are a plain Access token plus:
    	  * expires : time that the token expires
    	  * connector_name: the provider of the access token?
    	  * scopes: an array with the scopes (not string)
     */

  }, {
    key: "saveTokens",
    value: function saveTokens(provider, tokens) {
      // log("Save Tokens (" + provider+ ")");
      sessionStorage.setItem("tokens-" + provider, JSON.stringify(tokens));
    }
  }, {
    key: "getTokens",
    value: function getTokens(provider) {
      // log("Get Tokens (" + provider+ ")");
      var tokens = JSON.parse(sessionStorage.getItem("tokens-" + provider));
      if (!tokens) tokens = [];
      _utils__WEBPACK_IMPORTED_MODULE_0__.default.log("Token found when loooking up provider " + provider + " in store " + window.location.href, tokens);
      return tokens;
    }
  }, {
    key: "wipeTokens",
    value: function wipeTokens(provider) {
      sessionStorage.removeItem("tokens-" + provider);
    }
    /*
     * Save a single token for a provider.
     * This also cleans up expired tokens for the same provider.
     */

  }, {
    key: "saveToken",
    value: function saveToken(provider, token) {
      var tokens = this.getTokens(provider);
      tokens = this.filterTokens(tokens);
      tokens.push(token);
      this.saveTokens(provider, tokens);
    }
    /*
     * Get a token if exists for a provider with a set of scopes.
     * The scopes parameter is OPTIONAL.
     */

  }, {
    key: "getToken",
    value: function getToken(provider, scopes) {
      var tokens = this.getTokens(provider);
      tokens = this.filterTokens(tokens, scopes);
      if (tokens.length < 1) return null;
      return tokens[0];
    }
  }]);

  return Store;
}();

var s = new Store();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (s);

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var utils = {};
/*
 * Returns epoch, seconds since 1970.
 * Used for calculation of expire times.
 */

utils.epoch = function () {
  return Math.round(new Date().getTime() / 1000.0);
};

utils.debug = false;
/*
 * Returns a random string used for state
 */

utils.uuid = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};
/*
 * Takes a full url as input and expect it to have an encoded response
 * object as eigther a query string or an encoded fragment.
 * Returns the decoded object, or throws an error if no query string or fragment.
 */


utils.getResponseFromURL = function (url) {
  if (url.indexOf('#') !== -1) {
    return utils.parseQueryString(url.substring(url.indexOf('#') + 1));
  } else if (url.indexOf('?') !== -1) {
    return utils.parseQueryString(url.substring(url.indexOf('?') + 1));
  }

  return {};
};

utils.parseQueryString = function (qs) {
  var e,
      a = /\+/g,
      // Regex for replacing addition symbol with a space
  r = /([^&;=]+)=?([^&;]*)/g,
      d = function d(s) {
    return decodeURIComponent(s.replace(a, " "));
  },
      q = qs,
      urlParams = {};
  /* jshint ignore:start */


  while (e = r.exec(q)) {
    urlParams[d(e[1])] = d(e[2]);
  }

  ;
  /* jshint ignore:end */

  return urlParams;
};
/**
 * Utility: scopeList(scopes )
 * Takes a list of scopes that might be overlapping, and removed duplicates,
 * then concatenates the list by spaces and returns a string.
 *
 * @param  {[type]} scopes [description]
 * @return {[type]}        [description]
 */


utils.scopeList = function (scopes) {
  return utils.uniqueList(scopes).join(' ');
};

utils.uniqueList = function (items) {
  var uniqueItems = {};
  var resultItems = [];

  for (var i = 0; i < items.length; i++) {
    uniqueItems[items[i]] = 1;
  }

  for (var key in uniqueItems) {
    if (uniqueItems.hasOwnProperty(key)) {
      resultItems.push(key);
    }
  }

  return resultItems;
};
/**
 * A log wrapper, that only logs if logging is turned on in the config
 * @param  {string} msg Log message
 */


utils.log = function (msg) {
  if (!console) return;
  if (!console.log) return;
  if (!utils.debug) return;
  var args = Array.prototype.slice.call(arguments);
  args.unshift('[JSO]');
  console.log.apply(console, args);
};

utils.encodeQS = function (params) {
  var res = '';
  var k,
      i = 0;

  for (k in params) {
    res += (i++ === 0 ? '' : '&') + encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
  }

  return res;
};
/*
 * Takes an URL as input and a params object.
 * Each property in the params is added to the url as query string parameters
 */


utils.encodeURL = function (url, params) {
  var res = url;
  var k,
      i = 0;
  var firstSeparator = url.indexOf("?") === -1 ? '?' : '&';

  for (k in params) {
    res += (i++ === 0 ? firstSeparator : '&') + encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
  }

  return res;
};

utils.sha256Hash = function (str) {
  return window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
}; // Base64 encode


utils.encode64 = function (buff) {
  return btoa(new Uint8Array(buff).reduce(function (s, b) {
    return s + String.fromCharCode(b);
  }, ''));
};
/* 
 * Base64 url safe encoding of an array
 */


utils.base64UrlSafeEncode = function (buf) {
  var s = utils.encode64(buf).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  return s;
};
/* Calc code verifier if necessary
 */


utils.getCodeChallenge = function (code_verifier) {
  return utils.sha256Hash(code_verifier).then(function (hashed) {
    return utils.base64UrlSafeEncode(hashed);
  }).catch(function (error) {
    utils.log(error);
  }).finally(function () {
    return null;
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (utils);

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"jso","version":"4.1.2","description":"OAuth 2.0 implementation in Javascript","main":"dist/jso.js","module":"src/JSO.js","scripts":{"test":"true","preversion":"npm test","version":"npm run build && git add -A dist","postversion":"git push && git push --tags && npm publish","build":"webpack --mode production --config webpack.config.js","start":"webpack --mode development --config webpack.start.config.js && npx http-server examples -o -p 3000 -c-1"},"repository":{"type":"git","url":"https://github.com/vrseraphin/jso.git"},"keywords":["oauth","authentication","authorization","rest","api","ajax","jquery"],"files":["src"],"eslintConfig":{"env":{"es6":true,"browser":true,"node":false}},"devDependencies":{"@babel/core":"^7.12.9","@babel/preset-env":"^7.12.7","@babel/preset-react":"^7.12.7","@babel/preset-typescript":"^7.12.7","@babel/runtime":"^7.12.5","@types/core-js":"^2.5.4","babel-loader":"^8.2.2","qunit":"^2.13.0","webpack":"^5.10.0","webpack-cli":"^4.2.0"},"author":"Andreas Åkre Solberg","license":"LGPL-2.1","bugs":{"url":"https://github.com/andreassolberg/jso/issues"},"homepage":"https://github.com/andreassolberg/jso","dependencies":{}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/JSO.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JSO": () => (/* binding */ JSO),
/* harmony export */   "BasicLoader": () => (/* reexport safe */ _Loaders_BasicLoader__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "HTTPRedirect": () => (/* reexport safe */ _Loaders_HTTPRedirect__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "Popup": () => (/* reexport safe */ _Loaders_Popup__WEBPACK_IMPORTED_MODULE_6__.default),
/* harmony export */   "IFramePassive": () => (/* reexport safe */ _Loaders_IFramePassive__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "IFrameActive": () => (/* reexport safe */ _Loaders_IFrameActive__WEBPACK_IMPORTED_MODULE_5__.default),
/* harmony export */   "Fetcher": () => (/* reexport safe */ _HTTP_Fetcher__WEBPACK_IMPORTED_MODULE_7__.default),
/* harmony export */   "FetcherJQuery": () => (/* reexport safe */ _HTTP_FetcherJQuery__WEBPACK_IMPORTED_MODULE_8__.default)
/* harmony export */ });
/* harmony import */ var _store_session__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store-session */ "./src/store-session.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _Loaders_BasicLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Loaders/BasicLoader */ "./src/Loaders/BasicLoader.js");
/* harmony import */ var _Loaders_HTTPRedirect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Loaders/HTTPRedirect */ "./src/Loaders/HTTPRedirect.js");
/* harmony import */ var _Loaders_IFramePassive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Loaders/IFramePassive */ "./src/Loaders/IFramePassive.js");
/* harmony import */ var _Loaders_IFrameActive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Loaders/IFrameActive */ "./src/Loaders/IFrameActive.js");
/* harmony import */ var _Loaders_Popup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Loaders/Popup */ "./src/Loaders/Popup.js");
/* harmony import */ var _HTTP_Fetcher__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HTTP/Fetcher */ "./src/HTTP/Fetcher.js");
/* harmony import */ var _HTTP_FetcherJQuery__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./HTTP/FetcherJQuery */ "./src/HTTP/FetcherJQuery.js");
/* harmony import */ var _errors_OAuthResponseError__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./errors/OAuthResponseError */ "./src/errors/OAuthResponseError.js");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Config */ "./src/Config.js");
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./EventEmitter */ "./src/EventEmitter.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * JSO - Javascript OAuth Library
 * 	Version 4.0
 *  UNINETT AS - http://uninett.no
 *  Author: Andreas Åkre Solberg <andreas.solberg@uninett.no>
 *  Licence: Simplified BSD Licence
 *
 *  Documentation available at: https://github.com/andreassolberg/jso
 */

 // Work in progress
// import Authentication from './Authentication/Authentication'







 // import ExpiredTokenError from './errors/ExpiredTokenError'
// import HTTPError from './errors/HTTPError'





var package_json = __webpack_require__(/*! ../package.json */ "./package.json");

var default_config = {
  lifetime: 3600,
  response_type: 'token'
};

var JSO = /*#__PURE__*/function (_EventEmitter) {
  _inherits(JSO, _EventEmitter);

  var _super = _createSuper(JSO);

  function JSO(config) {
    var _this;

    _classCallCheck(this, JSO);

    _this = _super.call(this);

    _this.configure(config);

    _this.connector_name = _this.getconnector_name();
    _this.Loader = _Loaders_Popup__WEBPACK_IMPORTED_MODULE_6__.default; // HTTPRedirect;

    _this.store = _store_session__WEBPACK_IMPORTED_MODULE_0__.default;
    _this.callbacks = {};

    if (_this.config.getValue('debug', false)) {
      _utils__WEBPACK_IMPORTED_MODULE_1__.default.debug = true;
    }

    return _this;
  }

  _createClass(JSO, [{
    key: "configure",
    value: function configure(config) {
      this.config = new _Config__WEBPACK_IMPORTED_MODULE_10__.default(default_config, config);
    } // Experimental, nothing but default store exists yet. Not documented.

  }, {
    key: "setStore",
    value: function setStore(newstore) {
      this.store = newstore;
    }
  }, {
    key: "setLoader",
    value: function setLoader(loader) {
      if (typeof loader === "function") {
        this.Loader = loader;
      } else {
        throw new Error("loader MUST be an instance of the JSO BasicLoader");
      }
    }
    /**
     * We need to get an identifier to represent this OAuth provider.
     * The JSO construction option connector_name is preferred, if not provided
     * we construct a concatentaion of authorization url and client_id.
     * @return {[type]} [description]
     */

  }, {
    key: "getconnector_name",
    value: function getconnector_name() {
      var c = this.config.getValue('connector_name', null);

      if (c !== null) {
        return c;
      }

      var client_id = this.config.getValue('client_id', null, true);
      var authorization = this.config.getValue('authorization', null, true);
      return authorization + '|' + client_id;
    }
    /**
     * If the callback has already successfully parsed a token response, call this.
     * @return {[type]} [description]
     */

  }, {
    key: "processTokenResponse",
    value: function processTokenResponse(atoken) {
      var state;

      if (atoken.state) {
        state = this.store.getState(atoken.state);
      } else {
        throw new Error("Could not get state from storage.");
      }

      if (!state) {
        throw new Error("Could not retrieve state");
      }

      if (!state.connector_name) {
        throw new Error("Could not get connector_name from state");
      }

      _utils__WEBPACK_IMPORTED_MODULE_1__.default.log("processTokenResponse ", atoken, "");
      return this.processReceivedToken(atoken, state);
    }
  }, {
    key: "processReceivedToken",
    value: function processReceivedToken(atoken, state) {
      /*
      	 * Decide when this token should expire.
      	 * Priority fallback:
      	 * 1. Access token expires_in
      	 * 2. Life time in config (may be false = permanent...)
      	 * 3. Specific permanent scope.
      	 * 4. Default library lifetime:
      	 */
      var now = _utils__WEBPACK_IMPORTED_MODULE_1__.default.epoch();
      atoken.received = now;

      if (atoken.expires_in) {
        atoken.expires = now + parseInt(atoken.expires_in, 10);
        atoken.expires_in = parseInt(atoken.expires_in, 10);
      } else if (this.config.getValue('default_lifetime', null) === false) {
        atoken.expires = null;
      } else if (this.config.has('permanent_scope')) {
        if (!this.store.hasScope(atoken, this.config.getValue('permanent_scope'))) {
          atoken.expires = null;
        }
      } else if (this.config.has('default_lifetime')) {
        atoken.expires = now + this.config.getValue('default_lifetime');
      } else {
        atoken.expires = now + 3600;
      }
      /*
       * Handle scopes for this token
       */


      if (atoken.scope) {
        atoken.scopes = atoken.scope.split(" ");
        delete atoken.scope;
      } else if (state.scopes) {
        atoken.scopes = state.scopes;
      } else {
        atoken.scopes = [];
      }

      _utils__WEBPACK_IMPORTED_MODULE_1__.default.log("processTokenResponse completed ", atoken, "");
      this.store.saveToken(state.connector_name, atoken); // create non bubbling named-signal event

      var signal = new CustomEvent("signal-token-received", {
        bubbles: false,
        detail: atoken
      });
      document.dispatchEvent(signal);
      return atoken;
    }
  }, {
    key: "processAuthorizationCodeResponse",
    value: function processAuthorizationCodeResponse(object) {
      var _this2 = this;

      // this.emit('authorizationCode', object)
      var state;

      if (object.state) {
        state = this.store.getState(object.state);

        if (state === null) {
          throw new Error("Could not find retrieve state object.");
        }
      } else {
        throw new Error("Could not find state paramter from callback.");
      }

      console.log("state", state);

      if (!this.config.has('token')) {
        _utils__WEBPACK_IMPORTED_MODULE_1__.default.log("Received an authorization code. Will not process it as the config option [token] endpoint is not set. If you would like to process the code yourself, please subscribe to the [authorizationCode] event");
        return;
      }

      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
      var tokenRequest = {
        'grant_type': 'authorization_code',
        'client_id': this.config.getValue('client_id'),
        'code': object.code
      };

      if (this.config.getValue('use_pkce', false)) {
        // Also include the original created code_verifier
        tokenRequest.code_verifier = state.code_verifier;
      }

      if (state.hasOwnProperty('redirect_uri')) {
        tokenRequest.redirect_uri = state.redirect_uri;
      }

      var opts = {
        mode: 'cors',
        headers: headers,
        method: 'POST',
        // or 'PUT'
        body: _utils__WEBPACK_IMPORTED_MODULE_1__.default.encodeQS(tokenRequest) // data can be `string` or {object}!

      };
      return fetch(this.config.getValue('token'), opts).then(function (httpResponse) {
        return httpResponse.json();
      }).then(function (tokenResponse) {
        _utils__WEBPACK_IMPORTED_MODULE_1__.default.log("Received response on token endpoint ", tokenResponse, "");
        return _this2.processReceivedToken(tokenResponse, state);
      }); // throw new Exception("Implementation of authorization code flow is not yet implemented. Instead use the implicit grant flow")
    }
  }, {
    key: "processErrorResponse",
    value: function processErrorResponse(err) {
      var state;

      if (err.state) {
        state = this.store.getState(err.state);
      } else {
        throw new Error("Could not get [state] and no default connector_name is provided.");
      }

      if (!state) {
        throw new Error("Could not retrieve state");
      }

      if (!state.connector_name) {
        throw new Error("Could not get connector_name from state");
      }

      if (state.restoreHash) {
        window.location.hash = state.restoreHash;
      } else {
        window.location.hash = '';
      }

      return new _errors_OAuthResponseError__WEBPACK_IMPORTED_MODULE_9__.default(err);
    }
    /**
     * Check if the hash contains an access token.
     * And if it do, extract the state, compare with
     * config, and store the access token for later use.
     *
     * The url parameter is optional. Used with phonegap and
     * childbrowser when the jso context is not receiving the response,
     * instead the response is received on a child browser.
     */

  }, {
    key: "callback",
    value: function callback(data) {
      debugger;
      var response = null;

      if (_typeof(data) === 'object') {
        response = data;
      } else if (typeof data === 'string') {
        response = _utils__WEBPACK_IMPORTED_MODULE_1__.default.getResponseFromURL(data);
      } else if (typeof data === 'undefined') {
        response = _utils__WEBPACK_IMPORTED_MODULE_1__.default.getResponseFromURL(window.location.href);
      } else {
        // no response provided.
        return;
      }

      _utils__WEBPACK_IMPORTED_MODULE_1__.default.log('Receving response in callback', response);

      if (response.hasOwnProperty("access_token")) {
        return this.processTokenResponse(response);
      } else if (response.hasOwnProperty("code")) {
        return this.processAuthorizationCodeResponse(response);
      } else if (response.hasOwnProperty("error")) {
        throw this.processErrorResponse(response);
      }
    }
  }, {
    key: "dump",
    value: function dump() {
      var tokens = this.store.getTokens(this.connector_name);
      var x = {
        "connector_name": this.connector_name,
        "tokens": tokens,
        "config": this.config
      };
      return x;
    }
  }, {
    key: "_getRequestScopes",
    value: function _getRequestScopes(opts) {
      var scopes = [],
          i;
      /*
       * Calculate which scopes to request, based upon provider config and request config.
       */

      if (this.config.has('scopes.request')) {
        var s = this.config.getValue('scopes.request');

        for (i = 0; i < s.length; i++) {
          scopes.push(s[i]);
        }
      }

      if (opts && opts.scopes && opts.scopes.request) {
        for (i = 0; i < opts.scopes.request.length; i++) {
          scopes.push(opts.scopes.request[i]);
        }
      }

      return _utils__WEBPACK_IMPORTED_MODULE_1__.default.uniqueList(scopes);
    }
  }, {
    key: "_getRequiredScopes",
    value: function _getRequiredScopes(opts) {
      var scopes = [],
          i;
      /*
       * Calculate which scopes to request, based upon provider config and request config.
       */

      if (this.config.has('scopes.require')) {
        var s = this.config.getValue('scopes.require');

        for (i = 0; i < s.length; i++) {
          scopes.push(s[i]);
        }
      }

      if (opts && opts.scopes && opts.scopes.require) {
        for (i = 0; i < opts.scopes.require.length; i++) {
          scopes.push(opts.scopes.require[i]);
        }
      }

      return _utils__WEBPACK_IMPORTED_MODULE_1__.default.uniqueList(scopes);
    }
  }, {
    key: "getToken",
    value: function getToken(opts) {
      return this.store.getToken(this.connector_name, this.config.config.scopes);
    }
    /*
     * 2nd portion of authorize method.  Was put into its own method to cope with an optional async path that happens when
     *  use_pkce is specified
     */

  }, {
    key: "_authorize2",
    value: function _authorize2(request, code_verifier, scopes) {
      var _this3 = this;

      var authorization = this.config.getValue('authorization', null, true);
      _utils__WEBPACK_IMPORTED_MODULE_1__.default.log("Debug Authentication request object", JSON.stringify(request, undefined, 2));
      var authurl = _utils__WEBPACK_IMPORTED_MODULE_1__.default.encodeURL(authorization, request); // After authurl has been established, some other state is stored within the request object which is persisted
      // Keep generated code_verifier around as we need to send it with the code challenge to retrieve token

      var bUsePKCE = this.config.getValue('use_pkce', false);

      if (bUsePKCE) {
        request.code_verifier = code_verifier;
      } // We'd like to cache the hash for not loosing Application state.
      // With the implciit grant flow, the hash will be replaced with the access
      // token when we return after authorization.


      if (window.location.hash) {
        request.restoreHash = window.location.hash;
      }

      request.connector_name = this.connector_name; // If there were specific scopes established, save within state

      if (scopes) {
        request.scopes = scopes;
      }

      _utils__WEBPACK_IMPORTED_MODULE_1__.default.log("Saving state [" + request.state + "]");
      _utils__WEBPACK_IMPORTED_MODULE_1__.default.log(JSON.parse(JSON.stringify(request)));
      var loader = this.Loader;
      this.store.saveState(request.state, request);
      return this.gotoAuthorizeURL(authurl, loader).then(function (response) {
        debugger; // when is that reached ??

        if (response !== true) {
          return _this3.callback(response);
        }
      });
    }
    /**
     * Send authorization request.
     *
     * @param  {[type]} opts These options matches the ones sent in the "oauth" property of the ajax settings in the request.
     * @return {[type]}      [description]
     */

  }, {
    key: "authorize",
    value: function authorize() {
      var _this4 = this;

      var request, scopes;
      var authorization = this.config.getValue('authorization', null, true);
      var client_id = this.config.getValue('client_id', null, true);
      var use_pkce = this.config.getValue('use_pkce', false);
      var openid = false;
      _utils__WEBPACK_IMPORTED_MODULE_1__.default.log("About to send an authorization request to this endpoint", authorization);
      request = {};
      request.state = _utils__WEBPACK_IMPORTED_MODULE_1__.default.uuid();
      request.response_type = this.config.getValue('response_type', 'id_token token');
      if (use_pkce) request.response_type = 'code';

      if (this.config.has('redirect_uri')) {
        request.redirect_uri = this.config.getValue('redirect_uri', '');
      }

      request.client_id = client_id;
      /*
       * Calculate which scopes to request, based upon provider config and request config.
       */

      scopes = this.config.config.scopes;
      openid = scopes.includes('openid');

      if (scopes.length > 0) {
        request.scope = _utils__WEBPACK_IMPORTED_MODULE_1__.default.scopeList(scopes);
      }

      _utils__WEBPACK_IMPORTED_MODULE_1__.default.log("Running in mode: " + (openid ? 'OpenID Connect mode' : 'OAuth mode'));

      if (openid && !request.hasOwnProperty('redirect_uri')) {
        throw new Error('An OpenID Request requires a redirect_uri to be set. Please add to configuration. A redirect_uri is not required for plain OAuth');
      }

      if (openid) {
        request.nonce = _utils__WEBPACK_IMPORTED_MODULE_1__.default.uuid();
      } // If pkce is being utilized, create random code_verifier and create challenge


      var cv = null;

      if (use_pkce) {
        if (!window.crypto) {
          throw new Error('Browser crypto APIs are not available');
        } // RFC 7636 says the random string should be between 43 and 128 chars
        // Use 64 char buf for now


        var buf = new Uint8Array(64);
        window.crypto.getRandomValues(buf);
        cv = _utils__WEBPACK_IMPORTED_MODULE_1__.default.base64UrlSafeEncode(buf);
        _utils__WEBPACK_IMPORTED_MODULE_1__.default.getCodeChallenge(cv).then(function (cc) {
          request.code_challenge = cc; //Generate string sequence

          request.code_challenge_method = "S256";
          return _this4._authorize2(request, cv, scopes);
        });
      } else {
        return this._authorize2(request, cv, scopes);
      }
    }
  }, {
    key: "gotoAuthorizeURL",
    value: function gotoAuthorizeURL(url, Loader) {
      return new Promise(function (resolve, reject) {
        if (Loader !== null && typeof Loader === 'function') {
          var loader = new Loader(url);

          if (!(loader instanceof _Loaders_BasicLoader__WEBPACK_IMPORTED_MODULE_2__.default)) {
            throw new Error("JSO selected Loader is not an instance of BasicLoader.");
          }

          resolve(loader.execute());
        } else {
          reject(new Error('Cannot redirect to authorization endpoint because of missing redirect handler'));
        }
      });
    }
  }, {
    key: "wipeTokens",
    value: function wipeTokens() {
      this.store.wipeTokens(this.connector_name);
    }
  }]);

  return JSO;
}(_EventEmitter__WEBPACK_IMPORTED_MODULE_11__.default); // Object.assign(JSO.prototype, new EventEmitter({}))


 // Work in progress
// Authentication
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=jso.js.map