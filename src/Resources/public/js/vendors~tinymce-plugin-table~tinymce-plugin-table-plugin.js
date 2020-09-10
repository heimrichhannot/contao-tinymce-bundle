(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~tinymce-plugin-table~tinymce-plugin-table-plugin"],{

/***/ "./node_modules/tinymce/plugins/table/plugin.js":
/*!******************************************************!*\
  !*** ./node_modules/tinymce/plugins/table/plugin.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.4.2 (2020-08-17)
 */
(function (domGlobals) {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var noop = function () {
    };
    var compose = function (fa, fb) {
      return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return fa(fb.apply(null, args));
      };
    };
    var compose1 = function (fbc, fab) {
      return function (a) {
        return fbc(fab(a));
      };
    };
    var constant = function (value) {
      return function () {
        return value;
      };
    };
    var identity = function (x) {
      return x;
    };
    function curry(fn) {
      var initialArgs = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        initialArgs[_i - 1] = arguments[_i];
      }
      return function () {
        var restArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          restArgs[_i] = arguments[_i];
        }
        var all = initialArgs.concat(restArgs);
        return fn.apply(null, all);
      };
    }
    var not = function (f) {
      return function (t) {
        return !f(t);
      };
    };
    var die = function (msg) {
      return function () {
        throw new Error(msg);
      };
    };
    var never = constant(false);
    var always = constant(true);

    var none = function () {
      return NONE;
    };
    var NONE = function () {
      var eq = function (o) {
        return o.isNone();
      };
      var call = function (thunk) {
        return thunk();
      };
      var id = function (n) {
        return n;
      };
      var me = {
        fold: function (n, _s) {
          return n();
        },
        is: never,
        isSome: never,
        isNone: always,
        getOr: id,
        getOrThunk: call,
        getOrDie: function (msg) {
          throw new Error(msg || 'error: getOrDie called on none.');
        },
        getOrNull: constant(null),
        getOrUndefined: constant(undefined),
        or: id,
        orThunk: call,
        map: none,
        each: noop,
        bind: none,
        exists: never,
        forall: always,
        filter: none,
        equals: eq,
        equals_: eq,
        toArray: function () {
          return [];
        },
        toString: constant('none()')
      };
      return me;
    }();
    var some = function (a) {
      var constant_a = constant(a);
      var self = function () {
        return me;
      };
      var bind = function (f) {
        return f(a);
      };
      var me = {
        fold: function (n, s) {
          return s(a);
        },
        is: function (v) {
          return a === v;
        },
        isSome: always,
        isNone: never,
        getOr: constant_a,
        getOrThunk: constant_a,
        getOrDie: constant_a,
        getOrNull: constant_a,
        getOrUndefined: constant_a,
        or: self,
        orThunk: self,
        map: function (f) {
          return some(f(a));
        },
        each: function (f) {
          f(a);
        },
        bind: bind,
        exists: bind,
        forall: bind,
        filter: function (f) {
          return f(a) ? me : NONE;
        },
        toArray: function () {
          return [a];
        },
        toString: function () {
          return 'some(' + a + ')';
        },
        equals: function (o) {
          return o.is(a);
        },
        equals_: function (o, elementEq) {
          return o.fold(never, function (b) {
            return elementEq(a, b);
          });
        }
      };
      return me;
    };
    var from = function (value) {
      return value === null || value === undefined ? NONE : some(value);
    };
    var Option = {
      some: some,
      none: none,
      from: from
    };

    var typeOf = function (x) {
      var t = typeof x;
      if (x === null) {
        return 'null';
      } else if (t === 'object' && (Array.prototype.isPrototypeOf(x) || x.constructor && x.constructor.name === 'Array')) {
        return 'array';
      } else if (t === 'object' && (String.prototype.isPrototypeOf(x) || x.constructor && x.constructor.name === 'String')) {
        return 'string';
      } else {
        return t;
      }
    };
    var isType = function (type) {
      return function (value) {
        return typeOf(value) === type;
      };
    };
    var isSimpleType = function (type) {
      return function (value) {
        return typeof value === type;
      };
    };
    var isString = isType('string');
    var isObject = isType('object');
    var isArray = isType('array');
    var isBoolean = isSimpleType('boolean');
    var isNullable = function (a) {
      return a === null || a === undefined;
    };
    var isNonNullable = function (a) {
      return !isNullable(a);
    };
    var isFunction = isSimpleType('function');
    var isNumber = isSimpleType('number');

    var nativeSlice = Array.prototype.slice;
    var nativeIndexOf = Array.prototype.indexOf;
    var nativePush = Array.prototype.push;
    var rawIndexOf = function (ts, t) {
      return nativeIndexOf.call(ts, t);
    };
    var contains = function (xs, x) {
      return rawIndexOf(xs, x) > -1;
    };
    var exists = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          return true;
        }
      }
      return false;
    };
    var range = function (num, f) {
      var r = [];
      for (var i = 0; i < num; i++) {
        r.push(f(i));
      }
      return r;
    };
    var map = function (xs, f) {
      var len = xs.length;
      var r = new Array(len);
      for (var i = 0; i < len; i++) {
        var x = xs[i];
        r[i] = f(x, i);
      }
      return r;
    };
    var each = function (xs, f) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        f(x, i);
      }
    };
    var eachr = function (xs, f) {
      for (var i = xs.length - 1; i >= 0; i--) {
        var x = xs[i];
        f(x, i);
      }
    };
    var filter = function (xs, pred) {
      var r = [];
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          r.push(x);
        }
      }
      return r;
    };
    var foldr = function (xs, f, acc) {
      eachr(xs, function (x) {
        acc = f(acc, x);
      });
      return acc;
    };
    var foldl = function (xs, f, acc) {
      each(xs, function (x) {
        acc = f(acc, x);
      });
      return acc;
    };
    var findUntil = function (xs, pred, until) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          return Option.some(x);
        } else if (until(x, i)) {
          break;
        }
      }
      return Option.none();
    };
    var find = function (xs, pred) {
      return findUntil(xs, pred, never);
    };
    var findIndex = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          return Option.some(i);
        }
      }
      return Option.none();
    };
    var flatten = function (xs) {
      var r = [];
      for (var i = 0, len = xs.length; i < len; ++i) {
        if (!isArray(xs[i])) {
          throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs);
        }
        nativePush.apply(r, xs[i]);
      }
      return r;
    };
    var bind = function (xs, f) {
      return flatten(map(xs, f));
    };
    var forall = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; ++i) {
        var x = xs[i];
        if (pred(x, i) !== true) {
          return false;
        }
      }
      return true;
    };
    var reverse = function (xs) {
      var r = nativeSlice.call(xs, 0);
      r.reverse();
      return r;
    };
    var head = function (xs) {
      return xs.length === 0 ? Option.none() : Option.some(xs[0]);
    };
    var last = function (xs) {
      return xs.length === 0 ? Option.none() : Option.some(xs[xs.length - 1]);
    };
    var findMap = function (arr, f) {
      for (var i = 0; i < arr.length; i++) {
        var r = f(arr[i], i);
        if (r.isSome()) {
          return r;
        }
      }
      return Option.none();
    };

    var keys = Object.keys;
    var hasOwnProperty = Object.hasOwnProperty;
    var each$1 = function (obj, f) {
      var props = keys(obj);
      for (var k = 0, len = props.length; k < len; k++) {
        var i = props[k];
        var x = obj[i];
        f(x, i);
      }
    };
    var map$1 = function (obj, f) {
      return tupleMap(obj, function (x, i) {
        return {
          k: i,
          v: f(x, i)
        };
      });
    };
    var tupleMap = function (obj, f) {
      var r = {};
      each$1(obj, function (x, i) {
        var tuple = f(x, i);
        r[tuple.k] = tuple.v;
      });
      return r;
    };
    var objAcc = function (r) {
      return function (x, i) {
        r[i] = x;
      };
    };
    var internalFilter = function (obj, pred, onTrue, onFalse) {
      var r = {};
      each$1(obj, function (x, i) {
        (pred(x, i) ? onTrue : onFalse)(x, i);
      });
      return r;
    };
    var filter$1 = function (obj, pred) {
      var t = {};
      internalFilter(obj, pred, objAcc(t), noop);
      return t;
    };
    var get = function (obj, key) {
      return has(obj, key) ? Option.from(obj[key]) : Option.none();
    };
    var has = function (obj, key) {
      return hasOwnProperty.call(obj, key);
    };

    var Global = typeof domGlobals.window !== 'undefined' ? domGlobals.window : Function('return this;')();

    var COMMENT = 8;
    var DOCUMENT = 9;
    var DOCUMENT_FRAGMENT = 11;
    var ELEMENT = 1;
    var TEXT = 3;

    var name = function (element) {
      var r = element.dom().nodeName;
      return r.toLowerCase();
    };
    var type = function (element) {
      return element.dom().nodeType;
    };
    var isType$1 = function (t) {
      return function (element) {
        return type(element) === t;
      };
    };
    var isComment = function (element) {
      return type(element) === COMMENT || name(element) === '#comment';
    };
    var isElement = isType$1(ELEMENT);
    var isText = isType$1(TEXT);
    var isDocument = isType$1(DOCUMENT);
    var isDocumentFragment = isType$1(DOCUMENT_FRAGMENT);

    var rawSet = function (dom, key, value) {
      if (isString(value) || isBoolean(value) || isNumber(value)) {
        dom.setAttribute(key, value + '');
      } else {
        domGlobals.console.error('Invalid call to Attr.set. Key ', key, ':: Value ', value, ':: Element ', dom);
        throw new Error('Attribute value was not simple');
      }
    };
    var set = function (element, key, value) {
      rawSet(element.dom(), key, value);
    };
    var setAll = function (element, attrs) {
      var dom = element.dom();
      each$1(attrs, function (v, k) {
        rawSet(dom, k, v);
      });
    };
    var get$1 = function (element, key) {
      var v = element.dom().getAttribute(key);
      return v === null ? undefined : v;
    };
    var getOpt = function (element, key) {
      return Option.from(get$1(element, key));
    };
    var has$1 = function (element, key) {
      var dom = element.dom();
      return dom && dom.hasAttribute ? dom.hasAttribute(key) : false;
    };
    var remove = function (element, key) {
      element.dom().removeAttribute(key);
    };
    var clone = function (element) {
      return foldl(element.dom().attributes, function (acc, attr) {
        acc[attr.name] = attr.value;
        return acc;
      }, {});
    };

    var checkRange = function (str, substr, start) {
      return substr === '' || str.length >= substr.length && str.substr(start, start + substr.length) === substr;
    };
    var contains$1 = function (str, substr) {
      return str.indexOf(substr) !== -1;
    };
    var startsWith = function (str, prefix) {
      return checkRange(str, prefix, 0);
    };
    var endsWith = function (str, suffix) {
      return checkRange(str, suffix, str.length - suffix.length);
    };
    var blank = function (r) {
      return function (s) {
        return s.replace(r, '');
      };
    };
    var trim = blank(/^\s+|\s+$/g);
    var isNotEmpty = function (s) {
      return s.length > 0;
    };

    var isSupported = function (dom) {
      return dom.style !== undefined && isFunction(dom.style.getPropertyValue);
    };

    var fromHtml = function (html, scope) {
      var doc = scope || domGlobals.document;
      var div = doc.createElement('div');
      div.innerHTML = html;
      if (!div.hasChildNodes() || div.childNodes.length > 1) {
        domGlobals.console.error('HTML does not have a single root node', html);
        throw new Error('HTML must have a single root node');
      }
      return fromDom(div.childNodes[0]);
    };
    var fromTag = function (tag, scope) {
      var doc = scope || domGlobals.document;
      var node = doc.createElement(tag);
      return fromDom(node);
    };
    var fromText = function (text, scope) {
      var doc = scope || domGlobals.document;
      var node = doc.createTextNode(text);
      return fromDom(node);
    };
    var fromDom = function (node) {
      if (node === null || node === undefined) {
        throw new Error('Node cannot be null or undefined');
      }
      return { dom: constant(node) };
    };
    var fromPoint = function (docElm, x, y) {
      var doc = docElm.dom();
      return Option.from(doc.elementFromPoint(x, y)).map(fromDom);
    };
    var Element = {
      fromHtml: fromHtml,
      fromTag: fromTag,
      fromText: fromText,
      fromDom: fromDom,
      fromPoint: fromPoint
    };

    var compareDocumentPosition = function (a, b, match) {
      return (a.compareDocumentPosition(b) & match) !== 0;
    };
    var documentPositionContainedBy = function (a, b) {
      return compareDocumentPosition(a, b, domGlobals.Node.DOCUMENT_POSITION_CONTAINED_BY);
    };

    var __assign = function () {
      __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };

    var cached = function (f) {
      var called = false;
      var r;
      return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (!called) {
          called = true;
          r = f.apply(null, args);
        }
        return r;
      };
    };

    var firstMatch = function (regexes, s) {
      for (var i = 0; i < regexes.length; i++) {
        var x = regexes[i];
        if (x.test(s)) {
          return x;
        }
      }
      return undefined;
    };
    var find$1 = function (regexes, agent) {
      var r = firstMatch(regexes, agent);
      if (!r) {
        return {
          major: 0,
          minor: 0
        };
      }
      var group = function (i) {
        return Number(agent.replace(r, '$' + i));
      };
      return nu(group(1), group(2));
    };
    var detect = function (versionRegexes, agent) {
      var cleanedAgent = String(agent).toLowerCase();
      if (versionRegexes.length === 0) {
        return unknown();
      }
      return find$1(versionRegexes, cleanedAgent);
    };
    var unknown = function () {
      return nu(0, 0);
    };
    var nu = function (major, minor) {
      return {
        major: major,
        minor: minor
      };
    };
    var Version = {
      nu: nu,
      detect: detect,
      unknown: unknown
    };

    var edge = 'Edge';
    var chrome = 'Chrome';
    var ie = 'IE';
    var opera = 'Opera';
    var firefox = 'Firefox';
    var safari = 'Safari';
    var unknown$1 = function () {
      return nu$1({
        current: undefined,
        version: Version.unknown()
      });
    };
    var nu$1 = function (info) {
      var current = info.current;
      var version = info.version;
      var isBrowser = function (name) {
        return function () {
          return current === name;
        };
      };
      return {
        current: current,
        version: version,
        isEdge: isBrowser(edge),
        isChrome: isBrowser(chrome),
        isIE: isBrowser(ie),
        isOpera: isBrowser(opera),
        isFirefox: isBrowser(firefox),
        isSafari: isBrowser(safari)
      };
    };
    var Browser = {
      unknown: unknown$1,
      nu: nu$1,
      edge: constant(edge),
      chrome: constant(chrome),
      ie: constant(ie),
      opera: constant(opera),
      firefox: constant(firefox),
      safari: constant(safari)
    };

    var windows = 'Windows';
    var ios = 'iOS';
    var android = 'Android';
    var linux = 'Linux';
    var osx = 'OSX';
    var solaris = 'Solaris';
    var freebsd = 'FreeBSD';
    var chromeos = 'ChromeOS';
    var unknown$2 = function () {
      return nu$2({
        current: undefined,
        version: Version.unknown()
      });
    };
    var nu$2 = function (info) {
      var current = info.current;
      var version = info.version;
      var isOS = function (name) {
        return function () {
          return current === name;
        };
      };
      return {
        current: current,
        version: version,
        isWindows: isOS(windows),
        isiOS: isOS(ios),
        isAndroid: isOS(android),
        isOSX: isOS(osx),
        isLinux: isOS(linux),
        isSolaris: isOS(solaris),
        isFreeBSD: isOS(freebsd),
        isChromeOS: isOS(chromeos)
      };
    };
    var OperatingSystem = {
      unknown: unknown$2,
      nu: nu$2,
      windows: constant(windows),
      ios: constant(ios),
      android: constant(android),
      linux: constant(linux),
      osx: constant(osx),
      solaris: constant(solaris),
      freebsd: constant(freebsd),
      chromeos: constant(chromeos)
    };

    var DeviceType = function (os, browser, userAgent, mediaMatch) {
      var isiPad = os.isiOS() && /ipad/i.test(userAgent) === true;
      var isiPhone = os.isiOS() && !isiPad;
      var isMobile = os.isiOS() || os.isAndroid();
      var isTouch = isMobile || mediaMatch('(pointer:coarse)');
      var isTablet = isiPad || !isiPhone && isMobile && mediaMatch('(min-device-width:768px)');
      var isPhone = isiPhone || isMobile && !isTablet;
      var iOSwebview = browser.isSafari() && os.isiOS() && /safari/i.test(userAgent) === false;
      var isDesktop = !isPhone && !isTablet && !iOSwebview;
      return {
        isiPad: constant(isiPad),
        isiPhone: constant(isiPhone),
        isTablet: constant(isTablet),
        isPhone: constant(isPhone),
        isTouch: constant(isTouch),
        isAndroid: os.isAndroid,
        isiOS: os.isiOS,
        isWebView: constant(iOSwebview),
        isDesktop: constant(isDesktop)
      };
    };

    var detect$1 = function (candidates, userAgent) {
      var agent = String(userAgent).toLowerCase();
      return find(candidates, function (candidate) {
        return candidate.search(agent);
      });
    };
    var detectBrowser = function (browsers, userAgent) {
      return detect$1(browsers, userAgent).map(function (browser) {
        var version = Version.detect(browser.versionRegexes, userAgent);
        return {
          current: browser.name,
          version: version
        };
      });
    };
    var detectOs = function (oses, userAgent) {
      return detect$1(oses, userAgent).map(function (os) {
        var version = Version.detect(os.versionRegexes, userAgent);
        return {
          current: os.name,
          version: version
        };
      });
    };
    var UaString = {
      detectBrowser: detectBrowser,
      detectOs: detectOs
    };

    var normalVersionRegex = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/;
    var checkContains = function (target) {
      return function (uastring) {
        return contains$1(uastring, target);
      };
    };
    var browsers = [
      {
        name: 'Edge',
        versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
        search: function (uastring) {
          return contains$1(uastring, 'edge/') && contains$1(uastring, 'chrome') && contains$1(uastring, 'safari') && contains$1(uastring, 'applewebkit');
        }
      },
      {
        name: 'Chrome',
        versionRegexes: [
          /.*?chrome\/([0-9]+)\.([0-9]+).*/,
          normalVersionRegex
        ],
        search: function (uastring) {
          return contains$1(uastring, 'chrome') && !contains$1(uastring, 'chromeframe');
        }
      },
      {
        name: 'IE',
        versionRegexes: [
          /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
          /.*?rv:([0-9]+)\.([0-9]+).*/
        ],
        search: function (uastring) {
          return contains$1(uastring, 'msie') || contains$1(uastring, 'trident');
        }
      },
      {
        name: 'Opera',
        versionRegexes: [
          normalVersionRegex,
          /.*?opera\/([0-9]+)\.([0-9]+).*/
        ],
        search: checkContains('opera')
      },
      {
        name: 'Firefox',
        versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
        search: checkContains('firefox')
      },
      {
        name: 'Safari',
        versionRegexes: [
          normalVersionRegex,
          /.*?cpu os ([0-9]+)_([0-9]+).*/
        ],
        search: function (uastring) {
          return (contains$1(uastring, 'safari') || contains$1(uastring, 'mobile/')) && contains$1(uastring, 'applewebkit');
        }
      }
    ];
    var oses = [
      {
        name: 'Windows',
        search: checkContains('win'),
        versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
      },
      {
        name: 'iOS',
        search: function (uastring) {
          return contains$1(uastring, 'iphone') || contains$1(uastring, 'ipad');
        },
        versionRegexes: [
          /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
          /.*cpu os ([0-9]+)_([0-9]+).*/,
          /.*cpu iphone os ([0-9]+)_([0-9]+).*/
        ]
      },
      {
        name: 'Android',
        search: checkContains('android'),
        versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
      },
      {
        name: 'OSX',
        search: checkContains('mac os x'),
        versionRegexes: [/.*?mac\ os\ x\ ?([0-9]+)_([0-9]+).*/]
      },
      {
        name: 'Linux',
        search: checkContains('linux'),
        versionRegexes: []
      },
      {
        name: 'Solaris',
        search: checkContains('sunos'),
        versionRegexes: []
      },
      {
        name: 'FreeBSD',
        search: checkContains('freebsd'),
        versionRegexes: []
      },
      {
        name: 'ChromeOS',
        search: checkContains('cros'),
        versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/]
      }
    ];
    var PlatformInfo = {
      browsers: constant(browsers),
      oses: constant(oses)
    };

    var detect$2 = function (userAgent, mediaMatch) {
      var browsers = PlatformInfo.browsers();
      var oses = PlatformInfo.oses();
      var browser = UaString.detectBrowser(browsers, userAgent).fold(Browser.unknown, Browser.nu);
      var os = UaString.detectOs(oses, userAgent).fold(OperatingSystem.unknown, OperatingSystem.nu);
      var deviceType = DeviceType(os, browser, userAgent, mediaMatch);
      return {
        browser: browser,
        os: os,
        deviceType: deviceType
      };
    };
    var PlatformDetection = { detect: detect$2 };

    var mediaMatch = function (query) {
      return domGlobals.window.matchMedia(query).matches;
    };
    var platform = cached(function () {
      return PlatformDetection.detect(domGlobals.navigator.userAgent, mediaMatch);
    });
    var detect$3 = function () {
      return platform();
    };

    var is = function (element, selector) {
      var dom = element.dom();
      if (dom.nodeType !== ELEMENT) {
        return false;
      } else {
        var elem = dom;
        if (elem.matches !== undefined) {
          return elem.matches(selector);
        } else if (elem.msMatchesSelector !== undefined) {
          return elem.msMatchesSelector(selector);
        } else if (elem.webkitMatchesSelector !== undefined) {
          return elem.webkitMatchesSelector(selector);
        } else if (elem.mozMatchesSelector !== undefined) {
          return elem.mozMatchesSelector(selector);
        } else {
          throw new Error('Browser lacks native selectors');
        }
      }
    };
    var bypassSelector = function (dom) {
      return dom.nodeType !== ELEMENT && dom.nodeType !== DOCUMENT && dom.nodeType !== DOCUMENT_FRAGMENT || dom.childElementCount === 0;
    };
    var all = function (selector, scope) {
      var base = scope === undefined ? domGlobals.document : scope.dom();
      return bypassSelector(base) ? [] : map(base.querySelectorAll(selector), Element.fromDom);
    };
    var one = function (selector, scope) {
      var base = scope === undefined ? domGlobals.document : scope.dom();
      return bypassSelector(base) ? Option.none() : Option.from(base.querySelector(selector)).map(Element.fromDom);
    };

    var eq = function (e1, e2) {
      return e1.dom() === e2.dom();
    };
    var regularContains = function (e1, e2) {
      var d1 = e1.dom();
      var d2 = e2.dom();
      return d1 === d2 ? false : d1.contains(d2);
    };
    var ieContains = function (e1, e2) {
      return documentPositionContainedBy(e1.dom(), e2.dom());
    };
    var contains$2 = function (e1, e2) {
      return detect$3().browser.isIE() ? ieContains(e1, e2) : regularContains(e1, e2);
    };
    var is$1 = is;

    var owner = function (element) {
      return Element.fromDom(element.dom().ownerDocument);
    };
    var documentOrOwner = function (dos) {
      return isDocument(dos) ? dos : owner(dos);
    };
    var defaultView = function (element) {
      return Element.fromDom(element.dom().ownerDocument.defaultView);
    };
    var parent = function (element) {
      return Option.from(element.dom().parentNode).map(Element.fromDom);
    };
    var parents = function (element, isRoot) {
      var stop = isFunction(isRoot) ? isRoot : never;
      var dom = element.dom();
      var ret = [];
      while (dom.parentNode !== null && dom.parentNode !== undefined) {
        var rawParent = dom.parentNode;
        var p = Element.fromDom(rawParent);
        ret.push(p);
        if (stop(p) === true) {
          break;
        } else {
          dom = rawParent;
        }
      }
      return ret;
    };
    var offsetParent = function (element) {
      return Option.from(element.dom().offsetParent).map(Element.fromDom);
    };
    var prevSibling = function (element) {
      return Option.from(element.dom().previousSibling).map(Element.fromDom);
    };
    var nextSibling = function (element) {
      return Option.from(element.dom().nextSibling).map(Element.fromDom);
    };
    var children = function (element) {
      return map(element.dom().childNodes, Element.fromDom);
    };
    var child = function (element, index) {
      var cs = element.dom().childNodes;
      return Option.from(cs[index]).map(Element.fromDom);
    };
    var firstChild = function (element) {
      return child(element, 0);
    };

    var isShadowRoot = function (dos) {
      return isDocumentFragment(dos);
    };
    var supported = isFunction(domGlobals.Element.prototype.attachShadow) && isFunction(domGlobals.Node.prototype.getRootNode);
    var isSupported$1 = constant(supported);
    var getRootNode = supported ? function (e) {
      return Element.fromDom(e.dom().getRootNode());
    } : documentOrOwner;
    var getShadowRoot = function (e) {
      var r = getRootNode(e);
      return isShadowRoot(r) ? Option.some(r) : Option.none();
    };
    var getShadowHost = function (e) {
      return Element.fromDom(e.dom().host);
    };
    var getOriginalEventTarget = function (event) {
      if (isSupported$1() && isNonNullable(event.target)) {
        var el = Element.fromDom(event.target);
        if (isElement(el) && isOpenShadowHost(Element.fromDom(event.target))) {
          var eventAny = event;
          if (eventAny.composed && eventAny.composedPath) {
            var composedPath = eventAny.composedPath();
            if (composedPath) {
              return head(composedPath);
            }
          }
        }
      }
      return Option.from(event.target);
    };
    var isOpenShadowHost = function (element) {
      return isNonNullable(element.dom().shadowRoot);
    };

    var inBody = function (element) {
      var dom = isText(element) ? element.dom().parentNode : element.dom();
      if (dom === undefined || dom === null || dom.ownerDocument === null) {
        return false;
      }
      return getShadowRoot(Element.fromDom(dom)).fold(function () {
        return dom.ownerDocument.body.contains(dom);
      }, compose1(inBody, getShadowHost));
    };
    var body = function () {
      return getBody(Element.fromDom(domGlobals.document));
    };
    var getBody = function (doc) {
      var b = doc.dom().body;
      if (b === null || b === undefined) {
        throw new Error('Body is not available yet');
      }
      return Element.fromDom(b);
    };

    var internalSet = function (dom, property, value) {
      if (!isString(value)) {
        domGlobals.console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
        throw new Error('CSS value must be a string: ' + value);
      }
      if (isSupported(dom)) {
        dom.style.setProperty(property, value);
      }
    };
    var internalRemove = function (dom, property) {
      if (isSupported(dom)) {
        dom.style.removeProperty(property);
      }
    };
    var set$1 = function (element, property, value) {
      var dom = element.dom();
      internalSet(dom, property, value);
    };
    var setAll$1 = function (element, css) {
      var dom = element.dom();
      each$1(css, function (v, k) {
        internalSet(dom, k, v);
      });
    };
    var get$2 = function (element, property) {
      var dom = element.dom();
      var styles = domGlobals.window.getComputedStyle(dom);
      var r = styles.getPropertyValue(property);
      return r === '' && !inBody(element) ? getUnsafeProperty(dom, property) : r;
    };
    var getUnsafeProperty = function (dom, property) {
      return isSupported(dom) ? dom.style.getPropertyValue(property) : '';
    };
    var getRaw = function (element, property) {
      var dom = element.dom();
      var raw = getUnsafeProperty(dom, property);
      return Option.from(raw).filter(function (r) {
        return r.length > 0;
      });
    };
    var remove$1 = function (element, property) {
      var dom = element.dom();
      internalRemove(dom, property);
      if (getOpt(element, 'style').map(trim).is('')) {
        remove(element, 'style');
      }
    };
    var copy = function (source, target) {
      var sourceDom = source.dom();
      var targetDom = target.dom();
      if (isSupported(sourceDom) && isSupported(targetDom)) {
        targetDom.style.cssText = sourceDom.style.cssText;
      }
    };

    var before = function (marker, element) {
      var parent$1 = parent(marker);
      parent$1.each(function (v) {
        v.dom().insertBefore(element.dom(), marker.dom());
      });
    };
    var after = function (marker, element) {
      var sibling = nextSibling(marker);
      sibling.fold(function () {
        var parent$1 = parent(marker);
        parent$1.each(function (v) {
          append(v, element);
        });
      }, function (v) {
        before(v, element);
      });
    };
    var prepend = function (parent, element) {
      var firstChild$1 = firstChild(parent);
      firstChild$1.fold(function () {
        append(parent, element);
      }, function (v) {
        parent.dom().insertBefore(element.dom(), v.dom());
      });
    };
    var append = function (parent, element) {
      parent.dom().appendChild(element.dom());
    };
    var wrap = function (element, wrapper) {
      before(element, wrapper);
      append(wrapper, element);
    };

    var before$1 = function (marker, elements) {
      each(elements, function (x) {
        before(marker, x);
      });
    };
    var after$1 = function (marker, elements) {
      each(elements, function (x, i) {
        var e = i === 0 ? marker : elements[i - 1];
        after(e, x);
      });
    };
    var append$1 = function (parent, elements) {
      each(elements, function (x) {
        append(parent, x);
      });
    };

    var empty = function (element) {
      element.dom().textContent = '';
      each(children(element), function (rogue) {
        remove$2(rogue);
      });
    };
    var remove$2 = function (element) {
      var dom = element.dom();
      if (dom.parentNode !== null) {
        dom.parentNode.removeChild(dom);
      }
    };
    var unwrap = function (wrapper) {
      var children$1 = children(wrapper);
      if (children$1.length > 0) {
        before$1(wrapper, children$1);
      }
      remove$2(wrapper);
    };

    var grid = function (rows, columns) {
      return {
        rows: constant(rows),
        columns: constant(columns)
      };
    };
    var address = function (row, column) {
      return {
        row: constant(row),
        column: constant(column)
      };
    };
    var detail = function (element, rowspan, colspan) {
      return {
        element: constant(element),
        rowspan: constant(rowspan),
        colspan: constant(colspan)
      };
    };
    var detailnew = function (element, rowspan, colspan, isNew) {
      return {
        element: constant(element),
        rowspan: constant(rowspan),
        colspan: constant(colspan),
        isNew: constant(isNew)
      };
    };
    var extended = function (element, rowspan, colspan, row, column) {
      return {
        element: constant(element),
        rowspan: constant(rowspan),
        colspan: constant(colspan),
        row: constant(row),
        column: constant(column)
      };
    };
    var rowdata = function (element, cells, section) {
      return {
        element: constant(element),
        cells: constant(cells),
        section: constant(section)
      };
    };
    var elementnew = function (element, isNew) {
      return {
        element: constant(element),
        isNew: constant(isNew)
      };
    };
    var rowdatanew = function (element, cells, section, isNew) {
      return {
        element: constant(element),
        cells: constant(cells),
        section: constant(section),
        isNew: constant(isNew)
      };
    };
    var rowcells = function (cells, section) {
      return {
        cells: constant(cells),
        section: constant(section)
      };
    };
    var rowdetails = function (details, section) {
      return {
        details: constant(details),
        section: constant(section)
      };
    };
    var bounds = function (startRow, startCol, finishRow, finishCol) {
      return {
        startRow: constant(startRow),
        startCol: constant(startCol),
        finishRow: constant(finishRow),
        finishCol: constant(finishCol)
      };
    };

    var ancestors = function (scope, predicate, isRoot) {
      return filter(parents(scope, isRoot), predicate);
    };
    var children$1 = function (scope, predicate) {
      return filter(children(scope), predicate);
    };
    var descendants = function (scope, predicate) {
      var result = [];
      each(children(scope), function (x) {
        if (predicate(x)) {
          result = result.concat([x]);
        }
        result = result.concat(descendants(x, predicate));
      });
      return result;
    };

    var ancestors$1 = function (scope, selector, isRoot) {
      return ancestors(scope, function (e) {
        return is(e, selector);
      }, isRoot);
    };
    var children$2 = function (scope, selector) {
      return children$1(scope, function (e) {
        return is(e, selector);
      });
    };
    var descendants$1 = function (scope, selector) {
      return all(selector, scope);
    };

    function ClosestOrAncestor (is, ancestor, scope, a, isRoot) {
      return is(scope, a) ? Option.some(scope) : isFunction(isRoot) && isRoot(scope) ? Option.none() : ancestor(scope, a, isRoot);
    }

    var ancestor = function (scope, predicate, isRoot) {
      var element = scope.dom();
      var stop = isFunction(isRoot) ? isRoot : constant(false);
      while (element.parentNode) {
        element = element.parentNode;
        var el = Element.fromDom(element);
        if (predicate(el)) {
          return Option.some(el);
        } else if (stop(el)) {
          break;
        }
      }
      return Option.none();
    };
    var closest = function (scope, predicate, isRoot) {
      var is = function (s, test) {
        return test(s);
      };
      return ClosestOrAncestor(is, ancestor, scope, predicate, isRoot);
    };
    var child$1 = function (scope, predicate) {
      var pred = function (node) {
        return predicate(Element.fromDom(node));
      };
      var result = find(scope.dom().childNodes, pred);
      return result.map(Element.fromDom);
    };
    var descendant = function (scope, predicate) {
      var descend = function (node) {
        for (var i = 0; i < node.childNodes.length; i++) {
          var child_1 = Element.fromDom(node.childNodes[i]);
          if (predicate(child_1)) {
            return Option.some(child_1);
          }
          var res = descend(node.childNodes[i]);
          if (res.isSome()) {
            return res;
          }
        }
        return Option.none();
      };
      return descend(scope.dom());
    };

    var ancestor$1 = function (scope, selector, isRoot) {
      return ancestor(scope, function (e) {
        return is(e, selector);
      }, isRoot);
    };
    var child$2 = function (scope, selector) {
      return child$1(scope, function (e) {
        return is(e, selector);
      });
    };
    var descendant$1 = function (scope, selector) {
      return one(selector, scope);
    };
    var closest$1 = function (scope, selector, isRoot) {
      var is$1 = function (element, selector) {
        return is(element, selector);
      };
      return ClosestOrAncestor(is$1, ancestor$1, scope, selector, isRoot);
    };

    var getAttrValue = function (cell, name, fallback) {
      if (fallback === void 0) {
        fallback = 0;
      }
      return getOpt(cell, name).map(function (value) {
        return parseInt(value, 10);
      }).getOr(fallback);
    };
    var getSpan = function (cell, type) {
      return getAttrValue(cell, type, 1);
    };
    var hasColspan = function (cell) {
      return getSpan(cell, 'colspan') > 1;
    };
    var hasRowspan = function (cell) {
      return getSpan(cell, 'rowspan') > 1;
    };
    var getCssValue = function (element, property) {
      return parseInt(get$2(element, property), 10);
    };
    var minWidth = constant(10);
    var minHeight = constant(10);

    var firstLayer = function (scope, selector) {
      return filterFirstLayer(scope, selector, constant(true));
    };
    var filterFirstLayer = function (scope, selector, predicate) {
      return bind(children(scope), function (x) {
        return is(x, selector) ? predicate(x) ? [x] : [] : filterFirstLayer(x, selector, predicate);
      });
    };

    var lookup = function (tags, element, isRoot) {
      if (isRoot === void 0) {
        isRoot = never;
      }
      if (isRoot(element)) {
        return Option.none();
      }
      if (contains(tags, name(element))) {
        return Option.some(element);
      }
      var isRootOrUpperTable = function (elm) {
        return is(elm, 'table') || isRoot(elm);
      };
      return ancestor$1(element, tags.join(','), isRootOrUpperTable);
    };
    var cell = function (element, isRoot) {
      return lookup([
        'td',
        'th'
      ], element, isRoot);
    };
    var cells = function (ancestor) {
      return firstLayer(ancestor, 'th,td');
    };
    var table = function (element, isRoot) {
      return closest$1(element, 'table', isRoot);
    };
    var rows = function (ancestor) {
      return firstLayer(ancestor, 'tr');
    };

    var fromTable = function (table) {
      var rows$1 = rows(table);
      return map(rows$1, function (row) {
        var element = row;
        var parent$1 = parent(element);
        var parentSection = parent$1.map(function (p) {
          var parentName = name(p);
          return parentName === 'tfoot' || parentName === 'thead' || parentName === 'tbody' ? parentName : 'tbody';
        }).getOr('tbody');
        var cells$1 = map(cells(row), function (cell) {
          var rowspan = getAttrValue(cell, 'rowspan', 1);
          var colspan = getAttrValue(cell, 'colspan', 1);
          return detail(cell, rowspan, colspan);
        });
        return rowdata(element, cells$1, parentSection);
      });
    };
    var fromPastedRows = function (rows, example) {
      return map(rows, function (row) {
        var cells$1 = map(cells(row), function (cell) {
          var rowspan = getAttrValue(cell, 'rowspan', 1);
          var colspan = getAttrValue(cell, 'colspan', 1);
          return detail(cell, rowspan, colspan);
        });
        return rowdata(row, cells$1, example.section());
      });
    };

    var key = function (row, column) {
      return row + ',' + column;
    };
    var getAt = function (warehouse, row, column) {
      var raw = warehouse.access[key(row, column)];
      return raw !== undefined ? Option.some(raw) : Option.none();
    };
    var findItem = function (warehouse, item, comparator) {
      var filtered = filterItems(warehouse, function (detail) {
        return comparator(item, detail.element());
      });
      return filtered.length > 0 ? Option.some(filtered[0]) : Option.none();
    };
    var filterItems = function (warehouse, predicate) {
      var all = bind(warehouse.all, function (r) {
        return r.cells();
      });
      return filter(all, predicate);
    };
    var generate = function (list) {
      var access = {};
      var cells = [];
      var maxRows = list.length;
      var maxColumns = 0;
      each(list, function (details, r) {
        var currentRow = [];
        each(details.cells(), function (detail) {
          var start = 0;
          while (access[key(r, start)] !== undefined) {
            start++;
          }
          var current = extended(detail.element(), detail.rowspan(), detail.colspan(), r, start);
          for (var i = 0; i < detail.colspan(); i++) {
            for (var j = 0; j < detail.rowspan(); j++) {
              var cr = r + j;
              var cc = start + i;
              var newpos = key(cr, cc);
              access[newpos] = current;
              maxColumns = Math.max(maxColumns, cc + 1);
            }
          }
          currentRow.push(current);
        });
        cells.push(rowdata(details.element(), currentRow, details.section()));
      });
      var grid$1 = grid(maxRows, maxColumns);
      return {
        grid: grid$1,
        access: access,
        all: cells
      };
    };
    var fromTable$1 = function (table) {
      var list = fromTable(table);
      return generate(list);
    };
    var justCells = function (warehouse) {
      var rows = map(warehouse.all, function (w) {
        return w.cells();
      });
      return flatten(rows);
    };
    var Warehouse = {
      fromTable: fromTable$1,
      generate: generate,
      getAt: getAt,
      findItem: findItem,
      filterItems: filterItems,
      justCells: justCells
    };

    var statsStruct = function (minRow, minCol, maxRow, maxCol) {
      return {
        minRow: minRow,
        minCol: minCol,
        maxRow: maxRow,
        maxCol: maxCol
      };
    };
    var findSelectedStats = function (house, isSelected) {
      var totalColumns = house.grid.columns();
      var totalRows = house.grid.rows();
      var minRow = totalRows;
      var minCol = totalColumns;
      var maxRow = 0;
      var maxCol = 0;
      each$1(house.access, function (detail) {
        if (isSelected(detail)) {
          var startRow = detail.row();
          var endRow = startRow + detail.rowspan() - 1;
          var startCol = detail.column();
          var endCol = startCol + detail.colspan() - 1;
          if (startRow < minRow) {
            minRow = startRow;
          } else if (endRow > maxRow) {
            maxRow = endRow;
          }
          if (startCol < minCol) {
            minCol = startCol;
          } else if (endCol > maxCol) {
            maxCol = endCol;
          }
        }
      });
      return statsStruct(minRow, minCol, maxRow, maxCol);
    };
    var makeCell = function (list, seenSelected, rowIndex) {
      var row = list[rowIndex].element();
      var td = Element.fromTag('td');
      append(td, Element.fromTag('br'));
      var f = seenSelected ? append : prepend;
      f(row, td);
    };
    var fillInGaps = function (list, house, stats, isSelected) {
      var totalColumns = house.grid.columns();
      var totalRows = house.grid.rows();
      for (var i = 0; i < totalRows; i++) {
        var seenSelected = false;
        for (var j = 0; j < totalColumns; j++) {
          if (!(i < stats.minRow || i > stats.maxRow || j < stats.minCol || j > stats.maxCol)) {
            var needCell = Warehouse.getAt(house, i, j).filter(isSelected).isNone();
            if (needCell) {
              makeCell(list, seenSelected, i);
            } else {
              seenSelected = true;
            }
          }
        }
      }
    };
    var clean = function (table, stats) {
      var emptyRows = filter(firstLayer(table, 'tr'), function (row) {
        return row.dom().childElementCount === 0;
      });
      each(emptyRows, remove$2);
      if (stats.minCol === stats.maxCol || stats.minRow === stats.maxRow) {
        each(firstLayer(table, 'th,td'), function (cell) {
          remove(cell, 'rowspan');
          remove(cell, 'colspan');
        });
      }
      remove(table, 'width');
      remove(table, 'height');
      remove$1(table, 'width');
      remove$1(table, 'height');
    };
    var extract = function (table, selectedSelector) {
      var isSelected = function (detail) {
        return is(detail.element(), selectedSelector);
      };
      var list = fromTable(table);
      var house = Warehouse.generate(list);
      var stats = findSelectedStats(house, isSelected);
      var selector = 'th:not(' + selectedSelector + ')' + ',td:not(' + selectedSelector + ')';
      var unselectedCells = filterFirstLayer(table, 'th,td', function (cell) {
        return is(cell, selector);
      });
      each(unselectedCells, remove$2);
      fillInGaps(list, house, stats, isSelected);
      clean(table, stats);
      return table;
    };

    var nbsp = '\xA0';

    function NodeValue (is, name) {
      var get = function (element) {
        if (!is(element)) {
          throw new Error('Can only get ' + name + ' value of a ' + name + ' node');
        }
        return getOption(element).getOr('');
      };
      var getOption = function (element) {
        return is(element) ? Option.from(element.dom().nodeValue) : Option.none();
      };
      var set = function (element, value) {
        if (!is(element)) {
          throw new Error('Can only set raw ' + name + ' value of a ' + name + ' node');
        }
        element.dom().nodeValue = value;
      };
      return {
        get: get,
        getOption: getOption,
        set: set
      };
    }

    var api = NodeValue(isText, 'text');
    var get$3 = function (element) {
      return api.get(element);
    };
    var getOption = function (element) {
      return api.getOption(element);
    };
    var set$2 = function (element, value) {
      return api.set(element, value);
    };

    var getEnd = function (element) {
      return name(element) === 'img' ? 1 : getOption(element).fold(function () {
        return children(element).length;
      }, function (v) {
        return v.length;
      });
    };
    var isTextNodeWithCursorPosition = function (el) {
      return getOption(el).filter(function (text) {
        return text.trim().length !== 0 || text.indexOf(nbsp) > -1;
      }).isSome();
    };
    var elementsWithCursorPosition = [
      'img',
      'br'
    ];
    var isCursorPosition = function (elem) {
      var hasCursorPosition = isTextNodeWithCursorPosition(elem);
      return hasCursorPosition || contains(elementsWithCursorPosition, name(elem));
    };

    var first = function (element) {
      return descendant(element, isCursorPosition);
    };
    var last$1 = function (element) {
      return descendantRtl(element, isCursorPosition);
    };
    var descendantRtl = function (scope, predicate) {
      var descend = function (element) {
        var children$1 = children(element);
        for (var i = children$1.length - 1; i >= 0; i--) {
          var child = children$1[i];
          if (predicate(child)) {
            return Option.some(child);
          }
          var res = descend(child);
          if (res.isSome()) {
            return res;
          }
        }
        return Option.none();
      };
      return descend(scope);
    };

    var clone$1 = function (original, isDeep) {
      return Element.fromDom(original.dom().cloneNode(isDeep));
    };
    var shallow = function (original) {
      return clone$1(original, false);
    };
    var deep = function (original) {
      return clone$1(original, true);
    };
    var shallowAs = function (original, tag) {
      var nu = Element.fromTag(tag);
      var attributes = clone(original);
      setAll(nu, attributes);
      return nu;
    };
    var copy$1 = function (original, tag) {
      var nu = shallowAs(original, tag);
      var cloneChildren = children(deep(original));
      append$1(nu, cloneChildren);
      return nu;
    };

    var createCell = function () {
      var td = Element.fromTag('td');
      append(td, Element.fromTag('br'));
      return td;
    };
    var replace = function (cell, tag, attrs) {
      var replica = copy$1(cell, tag);
      each$1(attrs, function (v, k) {
        if (v === null) {
          remove(replica, k);
        } else {
          set(replica, k, v);
        }
      });
      return replica;
    };
    var pasteReplace = function (cell) {
      return cell;
    };
    var newRow = function (doc) {
      return function () {
        return Element.fromTag('tr', doc.dom());
      };
    };
    var cloneFormats = function (oldCell, newCell, formats) {
      var first$1 = first(oldCell);
      return first$1.map(function (firstText) {
        var formatSelector = formats.join(',');
        var parents = ancestors$1(firstText, formatSelector, function (element) {
          return eq(element, oldCell);
        });
        return foldr(parents, function (last, parent) {
          var clonedFormat = shallow(parent);
          remove(clonedFormat, 'contenteditable');
          append(last, clonedFormat);
          return clonedFormat;
        }, newCell);
      }).getOr(newCell);
    };
    var cellOperations = function (mutate, doc, formatsToClone) {
      var newCell = function (prev) {
        var docu = owner(prev.element());
        var td = Element.fromTag(name(prev.element()), docu.dom());
        var formats = formatsToClone.getOr([
          'strong',
          'em',
          'b',
          'i',
          'span',
          'font',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'p',
          'div'
        ]);
        var lastNode = formats.length > 0 ? cloneFormats(prev.element(), td, formats) : td;
        append(lastNode, Element.fromTag('br'));
        copy(prev.element(), td);
        remove$1(td, 'height');
        if (prev.colspan() !== 1) {
          remove$1(prev.element(), 'width');
        }
        mutate(prev.element(), td);
        return td;
      };
      return {
        row: newRow(doc),
        cell: newCell,
        replace: replace,
        gap: createCell
      };
    };
    var paste = function (doc) {
      return {
        row: newRow(doc),
        cell: createCell,
        replace: pasteReplace,
        gap: createCell
      };
    };

    var fromHtml$1 = function (html, scope) {
      var doc = scope || domGlobals.document;
      var div = doc.createElement('div');
      div.innerHTML = html;
      return children(Element.fromDom(div));
    };
    var fromDom$1 = function (nodes) {
      return map(nodes, Element.fromDom);
    };

    var inSelection = function (bounds, detail) {
      var leftEdge = detail.column();
      var rightEdge = detail.column() + detail.colspan() - 1;
      var topEdge = detail.row();
      var bottomEdge = detail.row() + detail.rowspan() - 1;
      return leftEdge <= bounds.finishCol() && rightEdge >= bounds.startCol() && (topEdge <= bounds.finishRow() && bottomEdge >= bounds.startRow());
    };
    var isWithin = function (bounds, detail) {
      return detail.column() >= bounds.startCol() && detail.column() + detail.colspan() - 1 <= bounds.finishCol() && detail.row() >= bounds.startRow() && detail.row() + detail.rowspan() - 1 <= bounds.finishRow();
    };
    var isRectangular = function (warehouse, bounds) {
      var isRect = true;
      var detailIsWithin = curry(isWithin, bounds);
      for (var i = bounds.startRow(); i <= bounds.finishRow(); i++) {
        for (var j = bounds.startCol(); j <= bounds.finishCol(); j++) {
          isRect = isRect && Warehouse.getAt(warehouse, i, j).exists(detailIsWithin);
        }
      }
      return isRect ? Option.some(bounds) : Option.none();
    };

    var getBounds = function (detailA, detailB) {
      return bounds(Math.min(detailA.row(), detailB.row()), Math.min(detailA.column(), detailB.column()), Math.max(detailA.row() + detailA.rowspan() - 1, detailB.row() + detailB.rowspan() - 1), Math.max(detailA.column() + detailA.colspan() - 1, detailB.column() + detailB.colspan() - 1));
    };
    var getAnyBox = function (warehouse, startCell, finishCell) {
      var startCoords = Warehouse.findItem(warehouse, startCell, eq);
      var finishCoords = Warehouse.findItem(warehouse, finishCell, eq);
      return startCoords.bind(function (sc) {
        return finishCoords.map(function (fc) {
          return getBounds(sc, fc);
        });
      });
    };
    var getBox = function (warehouse, startCell, finishCell) {
      return getAnyBox(warehouse, startCell, finishCell).bind(function (bounds) {
        return isRectangular(warehouse, bounds);
      });
    };

    var moveBy = function (warehouse, cell, row, column) {
      return Warehouse.findItem(warehouse, cell, eq).bind(function (detail) {
        var startRow = row > 0 ? detail.row() + detail.rowspan() - 1 : detail.row();
        var startCol = column > 0 ? detail.column() + detail.colspan() - 1 : detail.column();
        var dest = Warehouse.getAt(warehouse, startRow + row, startCol + column);
        return dest.map(function (d) {
          return d.element();
        });
      });
    };
    var intercepts = function (warehouse, start, finish) {
      return getAnyBox(warehouse, start, finish).map(function (bounds) {
        var inside = Warehouse.filterItems(warehouse, curry(inSelection, bounds));
        return map(inside, function (detail) {
          return detail.element();
        });
      });
    };
    var parentCell = function (warehouse, innerCell) {
      var isContainedBy = function (c1, c2) {
        return contains$2(c2, c1);
      };
      return Warehouse.findItem(warehouse, innerCell, isContainedBy).map(function (detail) {
        return detail.element();
      });
    };

    var moveBy$1 = function (cell, deltaRow, deltaColumn) {
      return table(cell).bind(function (table) {
        var warehouse = getWarehouse(table);
        return moveBy(warehouse, cell, deltaRow, deltaColumn);
      });
    };
    var intercepts$1 = function (table, first, last) {
      var warehouse = getWarehouse(table);
      return intercepts(warehouse, first, last);
    };
    var nestedIntercepts = function (table, first, firstTable, last, lastTable) {
      var warehouse = getWarehouse(table);
      var optStartCell = eq(table, firstTable) ? Option.some(first) : parentCell(warehouse, first);
      var optLastCell = eq(table, lastTable) ? Option.some(last) : parentCell(warehouse, last);
      return optStartCell.bind(function (startCell) {
        return optLastCell.bind(function (lastCell) {
          return intercepts(warehouse, startCell, lastCell);
        });
      });
    };
    var getBox$1 = function (table, first, last) {
      var warehouse = getWarehouse(table);
      return getBox(warehouse, first, last);
    };
    var getWarehouse = Warehouse.fromTable;

    var TagBoundaries = [
      'body',
      'p',
      'div',
      'article',
      'aside',
      'figcaption',
      'figure',
      'footer',
      'header',
      'nav',
      'section',
      'ol',
      'ul',
      'li',
      'table',
      'thead',
      'tbody',
      'tfoot',
      'caption',
      'tr',
      'td',
      'th',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'pre',
      'address'
    ];

    function DomUniverse () {
      var clone$1 = function (element) {
        return Element.fromDom(element.dom().cloneNode(false));
      };
      var document = function (element) {
        return element.dom().ownerDocument;
      };
      var isBoundary = function (element) {
        if (!isElement(element)) {
          return false;
        }
        if (name(element) === 'body') {
          return true;
        }
        return contains(TagBoundaries, name(element));
      };
      var isEmptyTag = function (element) {
        if (!isElement(element)) {
          return false;
        }
        return contains([
          'br',
          'img',
          'hr',
          'input'
        ], name(element));
      };
      var isNonEditable = function (element) {
        return isElement(element) && get$1(element, 'contenteditable') === 'false';
      };
      var comparePosition = function (element, other) {
        return element.dom().compareDocumentPosition(other.dom());
      };
      var copyAttributesTo = function (source, destination) {
        var as = clone(source);
        setAll(destination, as);
      };
      return {
        up: constant({
          selector: ancestor$1,
          closest: closest$1,
          predicate: ancestor,
          all: parents
        }),
        down: constant({
          selector: descendants$1,
          predicate: descendants
        }),
        styles: constant({
          get: get$2,
          getRaw: getRaw,
          set: set$1,
          remove: remove$1
        }),
        attrs: constant({
          get: get$1,
          set: set,
          remove: remove,
          copyTo: copyAttributesTo
        }),
        insert: constant({
          before: before,
          after: after,
          afterAll: after$1,
          append: append,
          appendAll: append$1,
          prepend: prepend,
          wrap: wrap
        }),
        remove: constant({
          unwrap: unwrap,
          remove: remove$2
        }),
        create: constant({
          nu: Element.fromTag,
          clone: clone$1,
          text: Element.fromText
        }),
        query: constant({
          comparePosition: comparePosition,
          prevSibling: prevSibling,
          nextSibling: nextSibling
        }),
        property: constant({
          children: children,
          name: name,
          parent: parent,
          document: document,
          isText: isText,
          isComment: isComment,
          isElement: isElement,
          getText: get$3,
          setText: set$2,
          isBoundary: isBoundary,
          isEmptyTag: isEmptyTag,
          isNonEditable: isNonEditable
        }),
        eq: eq,
        is: is$1
      };
    }

    var all$1 = function (universe, look, elements, f) {
      var head = elements[0];
      var tail = elements.slice(1);
      return f(universe, look, head, tail);
    };
    var oneAll = function (universe, look, elements) {
      return elements.length > 0 ? all$1(universe, look, elements, unsafeOne) : Option.none();
    };
    var unsafeOne = function (universe, look, head, tail) {
      var start = look(universe, head);
      return foldr(tail, function (b, a) {
        var current = look(universe, a);
        return commonElement(universe, b, current);
      }, start);
    };
    var commonElement = function (universe, start, end) {
      return start.bind(function (s) {
        return end.filter(curry(universe.eq, s));
      });
    };

    var eq$1 = function (universe, item) {
      return curry(universe.eq, item);
    };
    var ancestors$2 = function (universe, start, end, isRoot) {
      if (isRoot === void 0) {
        isRoot = never;
      }
      var ps1 = [start].concat(universe.up().all(start));
      var ps2 = [end].concat(universe.up().all(end));
      var prune = function (path) {
        var index = findIndex(path, isRoot);
        return index.fold(function () {
          return path;
        }, function (ind) {
          return path.slice(0, ind + 1);
        });
      };
      var pruned1 = prune(ps1);
      var pruned2 = prune(ps2);
      var shared = find(pruned1, function (x) {
        return exists(pruned2, eq$1(universe, x));
      });
      return {
        firstpath: constant(pruned1),
        secondpath: constant(pruned2),
        shared: constant(shared)
      };
    };

    var sharedOne = oneAll;
    var ancestors$3 = ancestors$2;

    var universe = DomUniverse();
    var sharedOne$1 = function (look, elements) {
      return sharedOne(universe, function (_universe, element) {
        return look(element);
      }, elements);
    };
    var ancestors$4 = function (start, finish, isRoot) {
      return ancestors$3(universe, start, finish, isRoot);
    };

    var lookupTable = function (container) {
      return ancestor$1(container, 'table');
    };
    var identify = function (start, finish, isRoot) {
      var getIsRoot = function (rootTable) {
        return function (element) {
          return isRoot !== undefined && isRoot(element) || eq(element, rootTable);
        };
      };
      if (eq(start, finish)) {
        return Option.some({
          boxes: Option.some([start]),
          start: start,
          finish: finish
        });
      } else {
        return lookupTable(start).bind(function (startTable) {
          return lookupTable(finish).bind(function (finishTable) {
            if (eq(startTable, finishTable)) {
              return Option.some({
                boxes: intercepts$1(startTable, start, finish),
                start: start,
                finish: finish
              });
            } else if (contains$2(startTable, finishTable)) {
              var ancestorCells = ancestors$1(finish, 'td,th', getIsRoot(startTable));
              var finishCell = ancestorCells.length > 0 ? ancestorCells[ancestorCells.length - 1] : finish;
              return Option.some({
                boxes: nestedIntercepts(startTable, start, startTable, finish, finishTable),
                start: start,
                finish: finishCell
              });
            } else if (contains$2(finishTable, startTable)) {
              var ancestorCells = ancestors$1(start, 'td,th', getIsRoot(finishTable));
              var startCell = ancestorCells.length > 0 ? ancestorCells[ancestorCells.length - 1] : start;
              return Option.some({
                boxes: nestedIntercepts(finishTable, start, startTable, finish, finishTable),
                start: start,
                finish: startCell
              });
            } else {
              return ancestors$4(start, finish).shared().bind(function (lca) {
                return closest$1(lca, 'table', isRoot).bind(function (lcaTable) {
                  var finishAncestorCells = ancestors$1(finish, 'td,th', getIsRoot(lcaTable));
                  var finishCell = finishAncestorCells.length > 0 ? finishAncestorCells[finishAncestorCells.length - 1] : finish;
                  var startAncestorCells = ancestors$1(start, 'td,th', getIsRoot(lcaTable));
                  var startCell = startAncestorCells.length > 0 ? startAncestorCells[startAncestorCells.length - 1] : start;
                  return Option.some({
                    boxes: nestedIntercepts(lcaTable, start, startTable, finish, finishTable),
                    start: startCell,
                    finish: finishCell
                  });
                });
              });
            }
          });
        });
      }
    };
    var retrieve = function (container, selector) {
      var sels = descendants$1(container, selector);
      return sels.length > 0 ? Option.some(sels) : Option.none();
    };
    var getLast = function (boxes, lastSelectedSelector) {
      return find(boxes, function (box) {
        return is(box, lastSelectedSelector);
      });
    };
    var getEdges = function (container, firstSelectedSelector, lastSelectedSelector) {
      return descendant$1(container, firstSelectedSelector).bind(function (first) {
        return descendant$1(container, lastSelectedSelector).bind(function (last) {
          return sharedOne$1(lookupTable, [
            first,
            last
          ]).map(function (tbl) {
            return {
              first: constant(first),
              last: constant(last),
              table: constant(tbl)
            };
          });
        });
      });
    };
    var expandTo = function (finish, firstSelectedSelector) {
      return ancestor$1(finish, 'table').bind(function (table) {
        return descendant$1(table, firstSelectedSelector).bind(function (start) {
          return identify(start, finish).bind(function (identified) {
            return identified.boxes.map(function (boxes) {
              return {
                boxes: boxes,
                start: identified.start,
                finish: identified.finish
              };
            });
          });
        });
      });
    };
    var shiftSelection = function (boxes, deltaRow, deltaColumn, firstSelectedSelector, lastSelectedSelector) {
      return getLast(boxes, lastSelectedSelector).bind(function (last) {
        return moveBy$1(last, deltaRow, deltaColumn).bind(function (finish) {
          return expandTo(finish, firstSelectedSelector);
        });
      });
    };

    var retrieve$1 = function (container, selector) {
      return retrieve(container, selector);
    };
    var retrieveBox = function (container, firstSelectedSelector, lastSelectedSelector) {
      return getEdges(container, firstSelectedSelector, lastSelectedSelector).bind(function (edges) {
        var isRoot = function (ancestor) {
          return eq(container, ancestor);
        };
        var firstAncestor = ancestor$1(edges.first(), 'thead,tfoot,tbody,table', isRoot);
        var lastAncestor = ancestor$1(edges.last(), 'thead,tfoot,tbody,table', isRoot);
        return firstAncestor.bind(function (fA) {
          return lastAncestor.bind(function (lA) {
            return eq(fA, lA) ? getBox$1(edges.table(), edges.first(), edges.last()) : Option.none();
          });
        });
      });
    };

    var strSelected = 'data-mce-selected';
    var strSelectedSelector = 'td[' + strSelected + '],th[' + strSelected + ']';
    var strAttributeSelector = '[' + strSelected + ']';
    var strFirstSelected = 'data-mce-first-selected';
    var strFirstSelectedSelector = 'td[' + strFirstSelected + '],th[' + strFirstSelected + ']';
    var strLastSelected = 'data-mce-last-selected';
    var strLastSelectedSelector = 'td[' + strLastSelected + '],th[' + strLastSelected + ']';
    var selected = strSelected;
    var selectedSelector = strSelectedSelector;
    var attributeSelector = strAttributeSelector;
    var firstSelected = strFirstSelected;
    var firstSelectedSelector = strFirstSelectedSelector;
    var lastSelected = strLastSelected;
    var lastSelectedSelector = strLastSelectedSelector;

    var Ephemera = /*#__PURE__*/Object.freeze({
        __proto__: null,
        selected: selected,
        selectedSelector: selectedSelector,
        attributeSelector: attributeSelector,
        firstSelected: firstSelected,
        firstSelectedSelector: firstSelectedSelector,
        lastSelected: lastSelected,
        lastSelectedSelector: lastSelectedSelector
    });

    var generate$1 = function (cases) {
      if (!isArray(cases)) {
        throw new Error('cases must be an array');
      }
      if (cases.length === 0) {
        throw new Error('there must be at least one case');
      }
      var constructors = [];
      var adt = {};
      each(cases, function (acase, count) {
        var keys$1 = keys(acase);
        if (keys$1.length !== 1) {
          throw new Error('one and only one name per case');
        }
        var key = keys$1[0];
        var value = acase[key];
        if (adt[key] !== undefined) {
          throw new Error('duplicate key detected:' + key);
        } else if (key === 'cata') {
          throw new Error('cannot have a case named cata (sorry)');
        } else if (!isArray(value)) {
          throw new Error('case arguments must be an array');
        }
        constructors.push(key);
        adt[key] = function () {
          var argLength = arguments.length;
          if (argLength !== value.length) {
            throw new Error('Wrong number of arguments to case ' + key + '. Expected ' + value.length + ' (' + value + '), got ' + argLength);
          }
          var args = new Array(argLength);
          for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i];
          }
          var match = function (branches) {
            var branchKeys = keys(branches);
            if (constructors.length !== branchKeys.length) {
              throw new Error('Wrong number of arguments to match. Expected: ' + constructors.join(',') + '\nActual: ' + branchKeys.join(','));
            }
            var allReqd = forall(constructors, function (reqKey) {
              return contains(branchKeys, reqKey);
            });
            if (!allReqd) {
              throw new Error('Not all branches were specified when using match. Specified: ' + branchKeys.join(', ') + '\nRequired: ' + constructors.join(', '));
            }
            return branches[key].apply(null, args);
          };
          return {
            fold: function () {
              if (arguments.length !== cases.length) {
                throw new Error('Wrong number of arguments to fold. Expected ' + cases.length + ', got ' + arguments.length);
              }
              var target = arguments[count];
              return target.apply(null, args);
            },
            match: match,
            log: function (label) {
              domGlobals.console.log(label, {
                constructors: constructors,
                constructor: key,
                params: args
              });
            }
          };
        };
      });
      return adt;
    };
    var Adt = { generate: generate$1 };

    var type$1 = Adt.generate([
      { none: [] },
      { multiple: ['elements'] },
      { single: ['selection'] }
    ]);
    var cata = function (subject, onNone, onMultiple, onSingle) {
      return subject.fold(onNone, onMultiple, onSingle);
    };
    var none$1 = type$1.none;
    var multiple = type$1.multiple;
    var single = type$1.single;

    var selection = function (cell, selections) {
      return cata(selections.get(), constant([]), identity, constant([cell]));
    };
    var unmergable = function (cell, selections) {
      var hasSpan = function (elem) {
        return has$1(elem, 'rowspan') && parseInt(get$1(elem, 'rowspan'), 10) > 1 || has$1(elem, 'colspan') && parseInt(get$1(elem, 'colspan'), 10) > 1;
      };
      var candidates = selection(cell, selections);
      return candidates.length > 0 && forall(candidates, hasSpan) ? Option.some(candidates) : Option.none();
    };
    var mergable = function (table, selections) {
      return cata(selections.get(), Option.none, function (cells, _env) {
        if (cells.length === 0) {
          return Option.none();
        }
        return retrieveBox(table, firstSelectedSelector, lastSelectedSelector).bind(function (bounds) {
          return cells.length > 1 ? Option.some({
            bounds: constant(bounds),
            cells: constant(cells)
          }) : Option.none();
        });
      }, Option.none);
    };

    var noMenu = function (cell) {
      return {
        element: constant(cell),
        mergable: Option.none,
        unmergable: Option.none,
        selection: constant([cell])
      };
    };
    var forMenu = function (selections, table, cell) {
      return {
        element: constant(cell),
        mergable: constant(mergable(table, selections)),
        unmergable: constant(unmergable(cell, selections)),
        selection: constant(selection(cell, selections))
      };
    };
    var paste$1 = function (element, clipboard, generators) {
      return {
        element: constant(element),
        clipboard: constant(clipboard),
        generators: constant(generators)
      };
    };
    var pasteRows = function (selections, cell, clipboard, generators) {
      return {
        selection: constant(selection(cell, selections)),
        clipboard: constant(clipboard),
        generators: constant(generators)
      };
    };

    var extractSelected = function (cells) {
      return table(cells[0]).map(deep).map(function (replica) {
        return [extract(replica, attributeSelector)];
      });
    };
    var serializeElements = function (editor, elements) {
      return map(elements, function (elm) {
        return editor.selection.serializer.serialize(elm.dom(), {});
      }).join('');
    };
    var getTextContent = function (elements) {
      return map(elements, function (element) {
        return element.dom().innerText;
      }).join('');
    };
    var registerEvents = function (editor, selections, actions, cellSelection) {
      editor.on('BeforeGetContent', function (e) {
        var multiCellContext = function (cells) {
          e.preventDefault();
          extractSelected(cells).each(function (elements) {
            e.content = e.format === 'text' ? getTextContent(elements) : serializeElements(editor, elements);
          });
        };
        if (e.selection === true) {
          cata(selections.get(), noop, multiCellContext, noop);
        }
      });
      editor.on('BeforeSetContent', function (e) {
        if (e.selection === true && e.paste === true) {
          var cellOpt = Option.from(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
          cellOpt.each(function (domCell) {
            var cell = Element.fromDom(domCell);
            table(cell).each(function (table) {
              var elements = filter(fromHtml$1(e.content), function (content) {
                return name(content) !== 'meta';
              });
              var isTable = function (elm) {
                return name(elm) === 'table';
              };
              if (elements.length === 1 && isTable(elements[0])) {
                e.preventDefault();
                var doc = Element.fromDom(editor.getDoc());
                var generators = paste(doc);
                var targets = paste$1(cell, elements[0], generators);
                actions.pasteCells(table, targets).each(function (rng) {
                  editor.selection.setRng(rng);
                  editor.focus();
                  cellSelection.clear(table);
                });
              }
            });
          });
        }
      });
    };

    var r = function (left, top) {
      var translate = function (x, y) {
        return r(left + x, top + y);
      };
      return {
        left: constant(left),
        top: constant(top),
        translate: translate
      };
    };
    var Position = r;

    var boxPosition = function (dom) {
      var box = dom.getBoundingClientRect();
      return Position(box.left, box.top);
    };
    var firstDefinedOrZero = function (a, b) {
      if (a !== undefined) {
        return a;
      } else {
        return b !== undefined ? b : 0;
      }
    };
    var absolute = function (element) {
      var doc = element.dom().ownerDocument;
      var body = doc.body;
      var win = doc.defaultView;
      var html = doc.documentElement;
      if (body === element.dom()) {
        return Position(body.offsetLeft, body.offsetTop);
      }
      var scrollTop = firstDefinedOrZero(win.pageYOffset, html.scrollTop);
      var scrollLeft = firstDefinedOrZero(win.pageXOffset, html.scrollLeft);
      var clientTop = firstDefinedOrZero(html.clientTop, body.clientTop);
      var clientLeft = firstDefinedOrZero(html.clientLeft, body.clientLeft);
      return viewport(element).translate(scrollLeft - clientLeft, scrollTop - clientTop);
    };
    var viewport = function (element) {
      var dom = element.dom();
      var doc = dom.ownerDocument;
      var body = doc.body;
      if (body === dom) {
        return Position(body.offsetLeft, body.offsetTop);
      }
      if (!inBody(element)) {
        return Position(0, 0);
      }
      return boxPosition(dom);
    };

    var only = function (element) {
      var parent = Option.from(element.dom().documentElement).map(Element.fromDom).getOr(element);
      return {
        parent: constant(parent),
        view: constant(element),
        origin: constant(Position(0, 0))
      };
    };
    var detached = function (editable, chrome) {
      var origin = function () {
        return absolute(chrome);
      };
      return {
        parent: constant(chrome),
        view: constant(editable),
        origin: origin
      };
    };
    var body$1 = function (editable, chrome) {
      return {
        parent: constant(chrome),
        view: constant(editable),
        origin: constant(Position(0, 0))
      };
    };
    var ResizeWire = {
      only: only,
      detached: detached,
      body: body$1
    };

    function Dimension (name, getOffset) {
      var set = function (element, h) {
        if (!isNumber(h) && !h.match(/^[0-9]+$/)) {
          throw new Error(name + '.set accepts only positive integer values. Value was ' + h);
        }
        var dom = element.dom();
        if (isSupported(dom)) {
          dom.style[name] = h + 'px';
        }
      };
      var get = function (element) {
        var r = getOffset(element);
        if (r <= 0 || r === null) {
          var css = get$2(element, name);
          return parseFloat(css) || 0;
        }
        return r;
      };
      var getOuter = get;
      var aggregate = function (element, properties) {
        return foldl(properties, function (acc, property) {
          var val = get$2(element, property);
          var value = val === undefined ? 0 : parseInt(val, 10);
          return isNaN(value) ? acc : acc + value;
        }, 0);
      };
      var max = function (element, value, properties) {
        var cumulativeInclusions = aggregate(element, properties);
        var absoluteMax = value > cumulativeInclusions ? value - cumulativeInclusions : 0;
        return absoluteMax;
      };
      return {
        set: set,
        get: get,
        getOuter: getOuter,
        aggregate: aggregate,
        max: max
      };
    }

    var api$1 = Dimension('height', function (element) {
      var dom = element.dom();
      return inBody(element) ? dom.getBoundingClientRect().height : dom.offsetHeight;
    });
    var get$4 = function (element) {
      return api$1.get(element);
    };
    var getOuter = function (element) {
      return api$1.getOuter(element);
    };

    var api$2 = Dimension('width', function (element) {
      return element.dom().offsetWidth;
    });
    var get$5 = function (element) {
      return api$2.get(element);
    };
    var getOuter$1 = function (element) {
      return api$2.getOuter(element);
    };

    var rowInfo = function (row, y) {
      return {
        row: row,
        y: y
      };
    };
    var colInfo = function (col, x) {
      return {
        col: col,
        x: x
      };
    };
    var rtlEdge = function (cell) {
      var pos = absolute(cell);
      return pos.left() + getOuter$1(cell);
    };
    var ltrEdge = function (cell) {
      return absolute(cell).left();
    };
    var getLeftEdge = function (index, cell) {
      return colInfo(index, ltrEdge(cell));
    };
    var getRightEdge = function (index, cell) {
      return colInfo(index, rtlEdge(cell));
    };
    var getTop = function (cell) {
      return absolute(cell).top();
    };
    var getTopEdge = function (index, cell) {
      return rowInfo(index, getTop(cell));
    };
    var getBottomEdge = function (index, cell) {
      return rowInfo(index, getTop(cell) + getOuter(cell));
    };
    var findPositions = function (getInnerEdge, getOuterEdge, array) {
      if (array.length === 0) {
        return [];
      }
      var lines = map(array.slice(1), function (cellOption, index) {
        return cellOption.map(function (cell) {
          return getInnerEdge(index, cell);
        });
      });
      var lastLine = array[array.length - 1].map(function (cell) {
        return getOuterEdge(array.length - 1, cell);
      });
      return lines.concat([lastLine]);
    };
    var negate = function (step) {
      return -step;
    };
    var height = {
      delta: identity,
      positions: function (optElements) {
        return findPositions(getTopEdge, getBottomEdge, optElements);
      },
      edge: getTop
    };
    var ltr = {
      delta: identity,
      edge: ltrEdge,
      positions: function (optElements) {
        return findPositions(getLeftEdge, getRightEdge, optElements);
      }
    };
    var rtl = {
      delta: negate,
      edge: rtlEdge,
      positions: function (optElements) {
        return findPositions(getRightEdge, getLeftEdge, optElements);
      }
    };

    var columns = function (warehouse) {
      var grid = warehouse.grid;
      var cols = range(grid.columns(), identity);
      var rowsArr = range(grid.rows(), identity);
      return map(cols, function (col) {
        var getBlock = function () {
          return bind(rowsArr, function (r) {
            return Warehouse.getAt(warehouse, r, col).filter(function (detail) {
              return detail.column() === col;
            }).fold(constant([]), function (detail) {
              return [detail];
            });
          });
        };
        var isSingle = function (detail) {
          return detail.colspan() === 1;
        };
        var getFallback = function () {
          return Warehouse.getAt(warehouse, 0, col);
        };
        return decide(getBlock, isSingle, getFallback);
      });
    };
    var decide = function (getBlock, isSingle, getFallback) {
      var inBlock = getBlock();
      var singleInBlock = find(inBlock, isSingle);
      var detailOption = singleInBlock.orThunk(function () {
        return Option.from(inBlock[0]).orThunk(getFallback);
      });
      return detailOption.map(function (detail) {
        return detail.element();
      });
    };
    var rows$1 = function (warehouse) {
      var grid = warehouse.grid;
      var rowsArr = range(grid.rows(), identity);
      var cols = range(grid.columns(), identity);
      return map(rowsArr, function (row) {
        var getBlock = function () {
          return bind(cols, function (c) {
            return Warehouse.getAt(warehouse, row, c).filter(function (detail) {
              return detail.row() === row;
            }).fold(constant([]), function (detail) {
              return [detail];
            });
          });
        };
        var isSingle = function (detail) {
          return detail.rowspan() === 1;
        };
        var getFallback = function () {
          return Warehouse.getAt(warehouse, row, 0);
        };
        return decide(getBlock, isSingle, getFallback);
      });
    };

    var deduce = function (xs, index) {
      if (index < 0 || index >= xs.length - 1) {
        return Option.none();
      }
      var current = xs[index].fold(function () {
        var rest = reverse(xs.slice(0, index));
        return findMap(rest, function (a, i) {
          return a.map(function (aa) {
            return {
              value: aa,
              delta: i + 1
            };
          });
        });
      }, function (c) {
        return Option.some({
          value: c,
          delta: 0
        });
      });
      var next = xs[index + 1].fold(function () {
        var rest = xs.slice(index + 1);
        return findMap(rest, function (a, i) {
          return a.map(function (aa) {
            return {
              value: aa,
              delta: i + 1
            };
          });
        });
      }, function (n) {
        return Option.some({
          value: n,
          delta: 1
        });
      });
      return current.bind(function (c) {
        return next.map(function (n) {
          var extras = n.delta + c.delta;
          return Math.abs(n.value - c.value) / extras;
        });
      });
    };

    var needManualCalc = function () {
      var browser = detect$3().browser;
      return browser.isIE() || browser.isEdge();
    };
    var toNumber = function (px, fallback) {
      var num = parseFloat(px);
      return isNaN(num) ? fallback : num;
    };
    var getProp = function (elm, name, fallback) {
      return toNumber(get$2(elm, name), fallback);
    };
    var getCalculatedHeight = function (cell) {
      var height = cell.dom().getBoundingClientRect().height;
      var boxSizing = get$2(cell, 'box-sizing');
      if (boxSizing === 'border-box') {
        return height;
      } else {
        var paddingTop = getProp(cell, 'padding-top', 0);
        var paddingBottom = getProp(cell, 'padding-bottom', 0);
        var borderTop = getProp(cell, 'border-top-width', 0);
        var borderBottom = getProp(cell, 'border-bottom-width', 0);
        var borders = borderTop + borderBottom;
        return height - paddingTop - paddingBottom - borders;
      }
    };
    var getCalculatedWidth = function (cell) {
      var width = cell.dom().getBoundingClientRect().width;
      var boxSizing = get$2(cell, 'box-sizing');
      if (boxSizing === 'border-box') {
        return width;
      } else {
        var paddingLeft = getProp(cell, 'padding-left', 0);
        var paddingRight = getProp(cell, 'padding-right', 0);
        var borderLeft = getProp(cell, 'border-left-width', 0);
        var borderRight = getProp(cell, 'border-right-width', 0);
        var borders = borderLeft + borderRight;
        return width - paddingLeft - paddingRight - borders;
      }
    };
    var getHeight = function (cell) {
      return needManualCalc() ? getCalculatedHeight(cell) : getProp(cell, 'height', get$4(cell));
    };
    var getWidth = function (cell) {
      return needManualCalc() ? getCalculatedWidth(cell) : getProp(cell, 'width', get$5(cell));
    };

    var rGenericSizeRegex = /(\d+(\.\d+)?)(\w|%)*/;
    var rPercentageBasedSizeRegex = /(\d+(\.\d+)?)%/;
    var rPixelBasedSizeRegex = /(\d+(\.\d+)?)px|em/;
    var getPercentSize = function (elm, getter) {
      var relativeParent = offsetParent(elm).getOr(getBody(owner(elm)));
      return getter(elm) / getter(relativeParent) * 100;
    };
    var setPixelWidth = function (cell, amount) {
      set$1(cell, 'width', amount + 'px');
    };
    var setPercentageWidth = function (cell, amount) {
      set$1(cell, 'width', amount + '%');
    };
    var setHeight = function (cell, amount) {
      set$1(cell, 'height', amount + 'px');
    };
    var getHeightValue = function (cell) {
      return getRaw(cell, 'height').getOrThunk(function () {
        return getHeight(cell) + 'px';
      });
    };
    var convert = function (cell, number, getter, setter) {
      var newSize = table(cell).map(function (table) {
        var total = getter(table);
        return Math.floor(number / 100 * total);
      }).getOr(number);
      setter(cell, newSize);
      return newSize;
    };
    var normalizePixelSize = function (value, cell, getter, setter) {
      var number = parseInt(value, 10);
      return endsWith(value, '%') && name(cell) !== 'table' ? convert(cell, number, getter, setter) : number;
    };
    var getTotalHeight = function (cell) {
      var value = getHeightValue(cell);
      if (!value) {
        return get$4(cell);
      }
      return normalizePixelSize(value, cell, get$4, setHeight);
    };
    var get$6 = function (cell, type, f) {
      var v = f(cell);
      var span = getSpan(cell, type);
      return v / span;
    };
    var getRawWidth = function (element) {
      var cssWidth = getRaw(element, 'width');
      return cssWidth.fold(function () {
        return Option.from(get$1(element, 'width'));
      }, function (width) {
        return Option.some(width);
      });
    };
    var normalizePercentageWidth = function (cellWidth, tableSize) {
      return cellWidth / tableSize.pixelWidth() * 100;
    };
    var choosePercentageSize = function (element, width, tableSize) {
      var percentMatch = rPercentageBasedSizeRegex.exec(width);
      if (percentMatch !== null) {
        return parseFloat(percentMatch[1]);
      } else {
        var intWidth = getWidth(element);
        return normalizePercentageWidth(intWidth, tableSize);
      }
    };
    var getPercentageWidth = function (cell, tableSize) {
      var width = getRawWidth(cell);
      return width.fold(function () {
        var intWidth = get$5(cell);
        return normalizePercentageWidth(intWidth, tableSize);
      }, function (w) {
        return choosePercentageSize(cell, w, tableSize);
      });
    };
    var normalizePixelWidth = function (cellWidth, tableSize) {
      return cellWidth / 100 * tableSize.pixelWidth();
    };
    var choosePixelSize = function (element, width, tableSize) {
      var pixelMatch = rPixelBasedSizeRegex.exec(width);
      if (pixelMatch !== null) {
        return parseInt(pixelMatch[1], 10);
      }
      var percentMatch = rPercentageBasedSizeRegex.exec(width);
      if (percentMatch !== null) {
        var floatWidth = parseFloat(percentMatch[1]);
        return normalizePixelWidth(floatWidth, tableSize);
      }
      return getWidth(element);
    };
    var getPixelWidth = function (cell, tableSize) {
      var width = getRawWidth(cell);
      return width.fold(function () {
        return getWidth(cell);
      }, function (w) {
        return choosePixelSize(cell, w, tableSize);
      });
    };
    var getHeight$1 = function (cell) {
      return get$6(cell, 'rowspan', getTotalHeight);
    };
    var getGenericWidth = function (cell) {
      var width = getRawWidth(cell);
      return width.bind(function (w) {
        var match = rGenericSizeRegex.exec(w);
        if (match !== null) {
          return Option.some({
            width: constant(parseFloat(match[1])),
            unit: constant(match[3])
          });
        } else {
          return Option.none();
        }
      });
    };
    var setGenericWidth = function (cell, amount, unit) {
      set$1(cell, 'width', amount + unit);
    };
    var getPixelTableWidth = function (table) {
      return get$5(table) + 'px';
    };
    var getPercentTableWidth = function (table) {
      return getPercentSize(table, get$5) + '%';
    };
    var isPercentSizing = function (table) {
      return getRawWidth(table).exists(function (size) {
        return rPercentageBasedSizeRegex.test(size);
      });
    };
    var isPixelSizing = function (table) {
      return getRawWidth(table).exists(function (size) {
        return rPixelBasedSizeRegex.test(size);
      });
    };
    var isNoneSizing = function (table) {
      return getRawWidth(table).isNone();
    };
    var percentageBasedSizeRegex = constant(rPercentageBasedSizeRegex);
    var pixelBasedSizeRegex = constant(rPixelBasedSizeRegex);

    var getRaw$1 = function (cell, property, getter) {
      return getRaw(cell, property).fold(function () {
        return getter(cell) + 'px';
      }, function (raw) {
        return raw;
      });
    };
    var getRawW = function (cell, tableSize) {
      return getRaw$1(cell, 'width', function (e) {
        return getPixelWidth(e, tableSize);
      });
    };
    var getRawH = function (cell) {
      return getRaw$1(cell, 'height', getHeight$1);
    };
    var getWidthFrom = function (warehouse, direction, getWidth, fallback, tableSize) {
      var columns$1 = columns(warehouse);
      var backups = map(columns$1, function (cellOption) {
        return cellOption.map(direction.edge);
      });
      return map(columns$1, function (cellOption, c) {
        var columnCell = cellOption.filter(not(hasColspan));
        return columnCell.fold(function () {
          var deduced = deduce(backups, c);
          return fallback(deduced);
        }, function (cell) {
          return getWidth(cell, tableSize);
        });
      });
    };
    var getDeduced = function (deduced) {
      return deduced.map(function (d) {
        return d + 'px';
      }).getOr('');
    };
    var getRawWidths = function (warehouse, direction, tableSize) {
      return getWidthFrom(warehouse, direction, getRawW, getDeduced, tableSize);
    };
    var getPercentageWidths = function (warehouse, direction, tableSize) {
      return getWidthFrom(warehouse, direction, getPercentageWidth, function (deduced) {
        return deduced.fold(function () {
          return tableSize.minCellWidth();
        }, function (cellWidth) {
          return cellWidth / tableSize.pixelWidth() * 100;
        });
      }, tableSize);
    };
    var getPixelWidths = function (warehouse, direction, tableSize) {
      return getWidthFrom(warehouse, direction, getPixelWidth, function (deduced) {
        return deduced.getOrThunk(tableSize.minCellWidth);
      }, tableSize);
    };
    var getHeightFrom = function (warehouse, direction, getHeight, fallback) {
      var rows = rows$1(warehouse);
      var backups = map(rows, function (cellOption) {
        return cellOption.map(direction.edge);
      });
      return map(rows, function (cellOption, c) {
        var rowCell = cellOption.filter(not(hasRowspan));
        return rowCell.fold(function () {
          var deduced = deduce(backups, c);
          return fallback(deduced);
        }, function (cell) {
          return getHeight(cell);
        });
      });
    };
    var getPixelHeights = function (warehouse, direction) {
      return getHeightFrom(warehouse, direction, getHeight$1, function (deduced) {
        return deduced.getOrThunk(minHeight);
      });
    };
    var getRawHeights = function (warehouse, direction) {
      return getHeightFrom(warehouse, direction, getRawH, getDeduced);
    };

    var adt = Adt.generate([
      { invalid: ['raw'] },
      { pixels: ['value'] },
      { percent: ['value'] }
    ]);
    var validateFor = function (suffix, type, value) {
      var rawAmount = value.substring(0, value.length - suffix.length);
      var amount = parseFloat(rawAmount);
      return rawAmount === amount.toString() ? type(amount) : adt.invalid(value);
    };
    var from$1 = function (value) {
      if (endsWith(value, '%')) {
        return validateFor('%', adt.percent, value);
      }
      if (endsWith(value, 'px')) {
        return validateFor('px', adt.pixels, value);
      }
      return adt.invalid(value);
    };
    var Size = __assign(__assign({}, adt), { from: from$1 });

    var redistributeToPercent = function (widths, totalWidth) {
      return map(widths, function (w) {
        var colType = Size.from(w);
        return colType.fold(function () {
          return w;
        }, function (px) {
          var ratio = px / totalWidth * 100;
          return ratio + '%';
        }, function (pc) {
          return pc + '%';
        });
      });
    };
    var redistributeToPx = function (widths, totalWidth, newTotalWidth) {
      var scale = newTotalWidth / totalWidth;
      return map(widths, function (w) {
        var colType = Size.from(w);
        return colType.fold(function () {
          return w;
        }, function (px) {
          return px * scale + 'px';
        }, function (pc) {
          return pc / 100 * newTotalWidth + 'px';
        });
      });
    };
    var redistributeEmpty = function (newWidthType, columns) {
      var f = newWidthType.fold(function () {
        return constant('');
      }, function (px) {
        var num = px / columns;
        return constant(num + 'px');
      }, function (pc) {
        var num = pc / columns;
        return constant(num + 'px');
      });
      return range(columns, f);
    };
    var redistributeValues = function (newWidthType, widths, totalWidth) {
      return newWidthType.fold(function () {
        return widths;
      }, function (px) {
        return redistributeToPx(widths, totalWidth, px);
      }, function (_pc) {
        return redistributeToPercent(widths, totalWidth);
      });
    };
    var redistribute = function (widths, totalWidth, newWidth) {
      var newType = Size.from(newWidth);
      var floats = forall(widths, function (s) {
        return s === '0px';
      }) ? redistributeEmpty(newType, widths.length) : redistributeValues(newType, widths, totalWidth);
      return normalize(floats);
    };
    var sum = function (values, fallback) {
      if (values.length === 0) {
        return fallback;
      }
      return foldr(values, function (rest, v) {
        return Size.from(v).fold(constant(0), identity, identity) + rest;
      }, 0);
    };
    var roundDown = function (num, unit) {
      var floored = Math.floor(num);
      return {
        value: floored + unit,
        remainder: num - floored
      };
    };
    var add = function (value, amount) {
      return Size.from(value).fold(constant(value), function (px) {
        return px + amount + 'px';
      }, function (pc) {
        return pc + amount + '%';
      });
    };
    var normalize = function (values) {
      if (values.length === 0) {
        return values;
      }
      var scan = foldr(values, function (rest, value) {
        var info = Size.from(value).fold(function () {
          return {
            value: value,
            remainder: 0
          };
        }, function (num) {
          return roundDown(num, 'px');
        }, function (num) {
          return {
            value: num + '%',
            remainder: 0
          };
        });
        return {
          output: [info.value].concat(rest.output),
          remainder: rest.remainder + info.remainder
        };
      }, {
        output: [],
        remainder: 0
      });
      var r = scan.output;
      return r.slice(0, r.length - 1).concat([add(r[r.length - 1], Math.round(scan.remainder))]);
    };
    var validate = Size.from;

    var redistributeToW = function (newWidths, cells, unit) {
      each(cells, function (cell) {
        var widths = newWidths.slice(cell.column(), cell.colspan() + cell.column());
        var w = sum(widths, minWidth());
        set$1(cell.element(), 'width', w + unit);
      });
    };
    var redistributeToH = function (newHeights, rows, cells, unit) {
      each(cells, function (cell) {
        var heights = newHeights.slice(cell.row(), cell.rowspan() + cell.row());
        var h = sum(heights, minHeight());
        set$1(cell.element(), 'height', h + unit);
      });
      each(rows, function (row, i) {
        set$1(row.element(), 'height', newHeights[i]);
      });
    };
    var getUnit = function (newSize) {
      return validate(newSize).fold(constant('px'), constant('px'), constant('%'));
    };
    var redistribute$1 = function (table, optWidth, optHeight, direction, tableSize) {
      var warehouse = Warehouse.fromTable(table);
      var rows = warehouse.all;
      var cells = Warehouse.justCells(warehouse);
      optWidth.each(function (newWidth) {
        var wUnit = getUnit(newWidth);
        var totalWidth = get$5(table);
        var oldWidths = getRawWidths(warehouse, direction, tableSize);
        var nuWidths = redistribute(oldWidths, totalWidth, newWidth);
        redistributeToW(nuWidths, cells, wUnit);
        set$1(table, 'width', newWidth);
      });
      optHeight.each(function (newHeight) {
        var hUnit = getUnit(newHeight);
        var totalHeight = get$4(table);
        var oldHeights = getRawHeights(warehouse, height);
        var nuHeights = redistribute(oldHeights, totalHeight, newHeight);
        redistributeToH(nuHeights, rows, cells, hUnit);
        set$1(table, 'height', newHeight);
      });
    };
    var isPercentSizing$1 = isPercentSizing;
    var isPixelSizing$1 = isPixelSizing;
    var isNoneSizing$1 = isNoneSizing;
    var getPercentTableWidth$1 = getPercentTableWidth;

    var ResizeDirection = {
      ltr: ltr,
      rtl: rtl
    };

    var TableDirection = function (directionAt) {
      var auto = function (table) {
        return directionAt(table).isRtl() ? ResizeDirection.rtl : ResizeDirection.ltr;
      };
      var delta = function (amount, table) {
        return auto(table).delta(amount, table);
      };
      var positions = function (cols, table) {
        return auto(table).positions(cols, table);
      };
      var edge = function (cell) {
        return auto(cell).edge(cell);
      };
      return {
        delta: delta,
        edge: edge,
        positions: positions
      };
    };

    var Immutable = function () {
      var fields = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        fields[_i] = arguments[_i];
      }
      return function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          values[_i] = arguments[_i];
        }
        if (fields.length !== values.length) {
          throw new Error('Wrong number of arguments to struct. Expected "[' + fields.length + ']", got ' + values.length + ' arguments');
        }
        var struct = {};
        each(fields, function (name, i) {
          struct[name] = constant(values[i]);
        });
        return struct;
      };
    };

    var Event = function (fields) {
      var struct = Immutable.apply(null, fields);
      var handlers = [];
      var bind = function (handler) {
        if (handler === undefined) {
          throw new Error('Event bind error: undefined handler');
        }
        handlers.push(handler);
      };
      var unbind = function (handler) {
        handlers = filter(handlers, function (h) {
          return h !== handler;
        });
      };
      var trigger = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var event = struct.apply(null, args);
        each(handlers, function (handler) {
          handler(event);
        });
      };
      return {
        bind: bind,
        unbind: unbind,
        trigger: trigger
      };
    };

    var create = function (typeDefs) {
      var registry = map$1(typeDefs, function (event) {
        return {
          bind: event.bind,
          unbind: event.unbind
        };
      });
      var trigger = map$1(typeDefs, function (event) {
        return event.trigger;
      });
      return {
        registry: registry,
        trigger: trigger
      };
    };

    var adt$1 = Adt.generate([
      { none: [] },
      { only: ['index'] },
      {
        left: [
          'index',
          'next'
        ]
      },
      {
        middle: [
          'prev',
          'index',
          'next'
        ]
      },
      {
        right: [
          'prev',
          'index'
        ]
      }
    ]);
    var ColumnContext = __assign({}, adt$1);

    var neighbours = function (input, index) {
      if (input.length === 0) {
        return ColumnContext.none();
      }
      if (input.length === 1) {
        return ColumnContext.only(0);
      }
      if (index === 0) {
        return ColumnContext.left(0, 1);
      }
      if (index === input.length - 1) {
        return ColumnContext.right(index - 1, index);
      }
      if (index > 0 && index < input.length - 1) {
        return ColumnContext.middle(index - 1, index, index + 1);
      }
      return ColumnContext.none();
    };
    var determine = function (input, column, step, tableSize) {
      var result = input.slice(0);
      var context = neighbours(input, column);
      var zero = function (array) {
        return map(array, constant(0));
      };
      var onNone = constant(zero(result));
      var onOnly = function (index) {
        return tableSize.singleColumnWidth(result[index], step);
      };
      var onChange = function (index, next) {
        if (step >= 0) {
          var newNext = Math.max(tableSize.minCellWidth(), result[next] - step);
          return zero(result.slice(0, index)).concat([
            step,
            newNext - result[next]
          ]).concat(zero(result.slice(next + 1)));
        } else {
          var newThis = Math.max(tableSize.minCellWidth(), result[index] + step);
          var diffx = result[index] - newThis;
          return zero(result.slice(0, index)).concat([
            newThis - result[index],
            diffx
          ]).concat(zero(result.slice(next + 1)));
        }
      };
      var onLeft = onChange;
      var onMiddle = function (_prev, index, next) {
        return onChange(index, next);
      };
      var onRight = function (_prev, index) {
        if (step >= 0) {
          return zero(result.slice(0, index)).concat([step]);
        } else {
          var size = Math.max(tableSize.minCellWidth(), result[index] + step);
          return zero(result.slice(0, index)).concat([size - result[index]]);
        }
      };
      return context.fold(onNone, onOnly, onLeft, onMiddle, onRight);
    };

    var total = function (start, end, measures) {
      var r = 0;
      for (var i = start; i < end; i++) {
        r += measures[i] !== undefined ? measures[i] : 0;
      }
      return r;
    };
    var recalculateWidth = function (warehouse, widths) {
      var all = Warehouse.justCells(warehouse);
      return map(all, function (cell) {
        var width = total(cell.column(), cell.column() + cell.colspan(), widths);
        return {
          element: cell.element(),
          width: width,
          colspan: cell.colspan()
        };
      });
    };
    var recalculateHeight = function (warehouse, heights) {
      var all = Warehouse.justCells(warehouse);
      return map(all, function (cell) {
        var height = total(cell.row(), cell.row() + cell.rowspan(), heights);
        return {
          element: cell.element,
          height: constant(height),
          rowspan: cell.rowspan
        };
      });
    };
    var matchRowHeight = function (warehouse, heights) {
      return map(warehouse.all, function (row, i) {
        return {
          element: row.element,
          height: constant(heights[i])
        };
      });
    };

    var sumUp = function (newSize) {
      return foldr(newSize, function (b, a) {
        return b + a;
      }, 0);
    };
    var adjustWidth = function (table, delta, index, direction, tableSize) {
      var step = tableSize.getCellDelta(delta);
      var warehouse = Warehouse.fromTable(table);
      var widths = tableSize.getWidths(warehouse, direction, tableSize);
      var deltas = determine(widths, index, step, tableSize);
      var newWidths = map(deltas, function (dx, i) {
        return dx + widths[i];
      });
      var newSizes = recalculateWidth(warehouse, newWidths);
      each(newSizes, function (cell) {
        tableSize.setElementWidth(cell.element, cell.width);
      });
      if (index === warehouse.grid.columns() - 1) {
        tableSize.adjustTableWidth(step);
      }
    };
    var adjustHeight = function (table, delta, index, direction) {
      var warehouse = Warehouse.fromTable(table);
      var heights = getPixelHeights(warehouse, direction);
      var newHeights = map(heights, function (dy, i) {
        return index === i ? Math.max(delta + dy, minHeight()) : dy;
      });
      var newCellSizes = recalculateHeight(warehouse, newHeights);
      var newRowSizes = matchRowHeight(warehouse, newHeights);
      each(newRowSizes, function (row) {
        setHeight(row.element(), row.height());
      });
      each(newCellSizes, function (cell) {
        setHeight(cell.element(), cell.height());
      });
      var total = sumUp(newHeights);
      setHeight(table, total);
    };
    var adjustWidthTo = function (table, list, direction, tableSize) {
      var warehouse = Warehouse.generate(list);
      var widths = tableSize.getWidths(warehouse, direction, tableSize);
      var newSizes = recalculateWidth(warehouse, widths);
      each(newSizes, function (cell) {
        tableSize.setElementWidth(cell.element, cell.width);
      });
    };

    var mkEvent = function (target, x, y, stop, prevent, kill, raw) {
      return {
        target: constant(target),
        x: constant(x),
        y: constant(y),
        stop: stop,
        prevent: prevent,
        kill: kill,
        raw: constant(raw)
      };
    };
    var fromRawEvent = function (rawEvent) {
      var target = Element.fromDom(getOriginalEventTarget(rawEvent).getOr(rawEvent.target));
      var stop = function () {
        return rawEvent.stopPropagation();
      };
      var prevent = function () {
        return rawEvent.preventDefault();
      };
      var kill = compose(prevent, stop);
      return mkEvent(target, rawEvent.clientX, rawEvent.clientY, stop, prevent, kill, rawEvent);
    };
    var handle = function (filter, handler) {
      return function (rawEvent) {
        if (filter(rawEvent)) {
          handler(fromRawEvent(rawEvent));
        }
      };
    };
    var binder = function (element, event, filter, handler, useCapture) {
      var wrapped = handle(filter, handler);
      element.dom().addEventListener(event, wrapped, useCapture);
      return { unbind: curry(unbind, element, event, wrapped, useCapture) };
    };
    var bind$1 = function (element, event, filter, handler) {
      return binder(element, event, filter, handler, false);
    };
    var unbind = function (element, event, handler, useCapture) {
      element.dom().removeEventListener(event, handler, useCapture);
    };

    var filter$2 = constant(true);
    var bind$2 = function (element, event, handler) {
      return bind$1(element, event, filter$2, handler);
    };
    var fromRawEvent$1 = fromRawEvent;

    var read = function (element, attr) {
      var value = get$1(element, attr);
      return value === undefined || value === '' ? [] : value.split(' ');
    };
    var add$1 = function (element, attr, id) {
      var old = read(element, attr);
      var nu = old.concat([id]);
      set(element, attr, nu.join(' '));
      return true;
    };
    var remove$3 = function (element, attr, id) {
      var nu = filter(read(element, attr), function (v) {
        return v !== id;
      });
      if (nu.length > 0) {
        set(element, attr, nu.join(' '));
      } else {
        remove(element, attr);
      }
      return false;
    };

    var supports = function (element) {
      return element.dom().classList !== undefined;
    };
    var get$7 = function (element) {
      return read(element, 'class');
    };
    var add$2 = function (element, clazz) {
      return add$1(element, 'class', clazz);
    };
    var remove$4 = function (element, clazz) {
      return remove$3(element, 'class', clazz);
    };

    var add$3 = function (element, clazz) {
      if (supports(element)) {
        element.dom().classList.add(clazz);
      } else {
        add$2(element, clazz);
      }
    };
    var cleanClass = function (element) {
      var classList = supports(element) ? element.dom().classList : get$7(element);
      if (classList.length === 0) {
        remove(element, 'class');
      }
    };
    var remove$5 = function (element, clazz) {
      if (supports(element)) {
        var classList = element.dom().classList;
        classList.remove(clazz);
      } else {
        remove$4(element, clazz);
      }
      cleanClass(element);
    };
    var has$2 = function (element, clazz) {
      return supports(element) && element.dom().classList.contains(clazz);
    };

    var css = function (namespace) {
      var dashNamespace = namespace.replace(/\./g, '-');
      var resolve = function (str) {
        return dashNamespace + '-' + str;
      };
      return { resolve: resolve };
    };

    var styles = css('ephox-dragster');
    var resolve = styles.resolve;

    var Blocker = function (options) {
      var settings = __assign({ layerClass: resolve('blocker') }, options);
      var div = Element.fromTag('div');
      set(div, 'role', 'presentation');
      setAll$1(div, {
        position: 'fixed',
        left: '0px',
        top: '0px',
        width: '100%',
        height: '100%'
      });
      add$3(div, resolve('blocker'));
      add$3(div, settings.layerClass);
      var element = function () {
        return div;
      };
      var destroy = function () {
        remove$2(div);
      };
      return {
        element: element,
        destroy: destroy
      };
    };

    var sort = function (arr) {
      return arr.slice(0).sort();
    };
    var reqMessage = function (required, keys) {
      throw new Error('All required keys (' + sort(required).join(', ') + ') were not specified. Specified keys were: ' + sort(keys).join(', ') + '.');
    };
    var unsuppMessage = function (unsupported) {
      throw new Error('Unsupported keys for object: ' + sort(unsupported).join(', '));
    };
    var validateStrArr = function (label, array) {
      if (!isArray(array)) {
        throw new Error('The ' + label + ' fields must be an array. Was: ' + array + '.');
      }
      each(array, function (a) {
        if (!isString(a)) {
          throw new Error('The value ' + a + ' in the ' + label + ' fields was not a string.');
        }
      });
    };
    var invalidTypeMessage = function (incorrect, type) {
      throw new Error('All values need to be of type: ' + type + '. Keys (' + sort(incorrect).join(', ') + ') were not.');
    };
    var checkDupes = function (everything) {
      var sorted = sort(everything);
      var dupe = find(sorted, function (s, i) {
        return i < sorted.length - 1 && s === sorted[i + 1];
      });
      dupe.each(function (d) {
        throw new Error('The field: ' + d + ' occurs more than once in the combined fields: [' + sorted.join(', ') + '].');
      });
    };

    var base = function (handleUnsupported, required) {
      return baseWith(handleUnsupported, required, {
        validate: isFunction,
        label: 'function'
      });
    };
    var baseWith = function (handleUnsupported, required, pred) {
      if (required.length === 0) {
        throw new Error('You must specify at least one required field.');
      }
      validateStrArr('required', required);
      checkDupes(required);
      return function (obj) {
        var keys$1 = keys(obj);
        var allReqd = forall(required, function (req) {
          return contains(keys$1, req);
        });
        if (!allReqd) {
          reqMessage(required, keys$1);
        }
        handleUnsupported(required, keys$1);
        var invalidKeys = filter(required, function (key) {
          return !pred.validate(obj[key], key);
        });
        if (invalidKeys.length > 0) {
          invalidTypeMessage(invalidKeys, pred.label);
        }
        return obj;
      };
    };
    var handleExact = function (required, keys) {
      var unsupported = filter(keys, function (key) {
        return !contains(required, key);
      });
      if (unsupported.length > 0) {
        unsuppMessage(unsupported);
      }
    };
    var exactly = function (required) {
      return base(handleExact, required);
    };

    var DragMode = exactly([
      'compare',
      'extract',
      'mutate',
      'sink'
    ]);
    var DragSink = exactly([
      'element',
      'start',
      'stop',
      'destroy'
    ]);
    var DragApi = exactly([
      'forceDrop',
      'drop',
      'move',
      'delayDrop'
    ]);

    var compare = function (old, nu) {
      return Position(nu.left() - old.left(), nu.top() - old.top());
    };
    var extract$1 = function (event) {
      return Option.some(Position(event.x(), event.y()));
    };
    var mutate = function (mutation, info) {
      mutation.mutate(info.left(), info.top());
    };
    var sink = function (dragApi, settings) {
      var blocker = Blocker(settings);
      var mdown = bind$2(blocker.element(), 'mousedown', dragApi.forceDrop);
      var mup = bind$2(blocker.element(), 'mouseup', dragApi.drop);
      var mmove = bind$2(blocker.element(), 'mousemove', dragApi.move);
      var mout = bind$2(blocker.element(), 'mouseout', dragApi.delayDrop);
      var destroy = function () {
        blocker.destroy();
        mup.unbind();
        mmove.unbind();
        mout.unbind();
        mdown.unbind();
      };
      var start = function (parent) {
        append(parent, blocker.element());
      };
      var stop = function () {
        remove$2(blocker.element());
      };
      return DragSink({
        element: blocker.element,
        start: start,
        stop: stop,
        destroy: destroy
      });
    };
    var MouseDrag = DragMode({
      compare: compare,
      extract: extract$1,
      sink: sink,
      mutate: mutate
    });

    var last$2 = function (fn, rate) {
      var timer = null;
      var cancel = function () {
        if (timer !== null) {
          domGlobals.clearTimeout(timer);
          timer = null;
        }
      };
      var throttle = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (timer !== null) {
          domGlobals.clearTimeout(timer);
        }
        timer = domGlobals.setTimeout(function () {
          fn.apply(null, args);
          timer = null;
        }, rate);
      };
      return {
        cancel: cancel,
        throttle: throttle
      };
    };

    function InDrag () {
      var previous = Option.none();
      var reset = function () {
        previous = Option.none();
      };
      var update = function (mode, nu) {
        var result = previous.map(function (old) {
          return mode.compare(old, nu);
        });
        previous = Option.some(nu);
        return result;
      };
      var onEvent = function (event, mode) {
        var dataOption = mode.extract(event);
        dataOption.each(function (data) {
          var offset = update(mode, data);
          offset.each(function (d) {
            events.trigger.move(d);
          });
        });
      };
      var events = create({ move: Event(['info']) });
      return {
        onEvent: onEvent,
        reset: reset,
        events: events.registry
      };
    }

    function NoDrag () {
      return {
        onEvent: noop,
        reset: noop
      };
    }

    function Movement () {
      var noDragState = NoDrag();
      var inDragState = InDrag();
      var dragState = noDragState;
      var on = function () {
        dragState.reset();
        dragState = inDragState;
      };
      var off = function () {
        dragState.reset();
        dragState = noDragState;
      };
      var onEvent = function (event, mode) {
        dragState.onEvent(event, mode);
      };
      var isOn = function () {
        return dragState === inDragState;
      };
      return {
        on: on,
        off: off,
        isOn: isOn,
        onEvent: onEvent,
        events: inDragState.events
      };
    }

    var setup = function (mutation, mode, settings) {
      var active = false;
      var events = create({
        start: Event([]),
        stop: Event([])
      });
      var movement = Movement();
      var drop = function () {
        sink.stop();
        if (movement.isOn()) {
          movement.off();
          events.trigger.stop();
        }
      };
      var throttledDrop = last$2(drop, 200);
      var go = function (parent) {
        sink.start(parent);
        movement.on();
        events.trigger.start();
      };
      var mousemove = function (event) {
        throttledDrop.cancel();
        movement.onEvent(event, mode);
      };
      movement.events.move.bind(function (event) {
        mode.mutate(mutation, event.info());
      });
      var on = function () {
        active = true;
      };
      var off = function () {
        active = false;
      };
      var runIfActive = function (f) {
        return function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          if (active) {
            f.apply(null, args);
          }
        };
      };
      var sink = mode.sink(DragApi({
        forceDrop: drop,
        drop: runIfActive(drop),
        move: runIfActive(mousemove),
        delayDrop: runIfActive(throttledDrop.throttle)
      }), settings);
      var destroy = function () {
        sink.destroy();
      };
      return {
        element: sink.element,
        go: go,
        on: on,
        off: off,
        destroy: destroy,
        events: events.registry
      };
    };

    var transform = function (mutation, settings) {
      if (settings === void 0) {
        settings = {};
      }
      var mode = settings.mode !== undefined ? settings.mode : MouseDrag;
      return setup(mutation, mode, settings);
    };

    var isContentEditableTrue = function (elm) {
      return get$1(elm, 'contenteditable') === 'true';
    };
    var findClosestContentEditable = function (target, isRoot) {
      return closest$1(target, '[contenteditable]', isRoot);
    };

    var styles$1 = css('ephox-snooker');
    var resolve$1 = styles$1.resolve;

    var Mutation = function () {
      var events = create({
        drag: Event([
          'xDelta',
          'yDelta'
        ])
      });
      var mutate = function (x, y) {
        events.trigger.drag(x, y);
      };
      return {
        mutate: mutate,
        events: events.registry
      };
    };

    var BarMutation = function () {
      var events = create({
        drag: Event([
          'xDelta',
          'yDelta',
          'target'
        ])
      });
      var target = Option.none();
      var delegate = Mutation();
      delegate.events.drag.bind(function (event) {
        target.each(function (t) {
          events.trigger.drag(event.xDelta(), event.yDelta(), t);
        });
      });
      var assign = function (t) {
        target = Option.some(t);
      };
      var get = function () {
        return target;
      };
      return {
        assign: assign,
        get: get,
        mutate: delegate.mutate,
        events: events.registry
      };
    };

    var col = function (column, x, y, w, h) {
      var bar = Element.fromTag('div');
      setAll$1(bar, {
        position: 'absolute',
        left: x - w / 2 + 'px',
        top: y + 'px',
        height: h + 'px',
        width: w + 'px'
      });
      setAll(bar, {
        'data-column': column,
        'role': 'presentation'
      });
      return bar;
    };
    var row = function (r, x, y, w, h) {
      var bar = Element.fromTag('div');
      setAll$1(bar, {
        position: 'absolute',
        left: x + 'px',
        top: y - h / 2 + 'px',
        height: h + 'px',
        width: w + 'px'
      });
      setAll(bar, {
        'data-row': r,
        'role': 'presentation'
      });
      return bar;
    };

    var resizeBar = resolve$1('resizer-bar');
    var resizeRowBar = resolve$1('resizer-rows');
    var resizeColBar = resolve$1('resizer-cols');
    var BAR_THICKNESS = 7;
    var destroy = function (wire) {
      var previous = descendants$1(wire.parent(), '.' + resizeBar);
      each(previous, remove$2);
    };
    var drawBar = function (wire, positions, create) {
      var origin = wire.origin();
      each(positions, function (cpOption) {
        cpOption.each(function (cp) {
          var bar = create(origin, cp);
          add$3(bar, resizeBar);
          append(wire.parent(), bar);
        });
      });
    };
    var refreshCol = function (wire, colPositions, position, tableHeight) {
      drawBar(wire, colPositions, function (origin, cp) {
        var colBar = col(cp.col, cp.x - origin.left(), position.top() - origin.top(), BAR_THICKNESS, tableHeight);
        add$3(colBar, resizeColBar);
        return colBar;
      });
    };
    var refreshRow = function (wire, rowPositions, position, tableWidth) {
      drawBar(wire, rowPositions, function (origin, cp) {
        var rowBar = row(cp.row, position.left() - origin.left(), cp.y - origin.top(), tableWidth, BAR_THICKNESS);
        add$3(rowBar, resizeRowBar);
        return rowBar;
      });
    };
    var refreshGrid = function (wire, table, rows, cols, hdirection, vdirection) {
      var position = absolute(table);
      var rowPositions = rows.length > 0 ? hdirection.positions(rows, table) : [];
      refreshRow(wire, rowPositions, position, getOuter$1(table));
      var colPositions = cols.length > 0 ? vdirection.positions(cols, table) : [];
      refreshCol(wire, colPositions, position, getOuter(table));
    };
    var refresh = function (wire, table, hdirection, vdirection) {
      destroy(wire);
      var warehouse = Warehouse.fromTable(table);
      var rows = rows$1(warehouse);
      var cols = columns(warehouse);
      refreshGrid(wire, table, rows, cols, hdirection, vdirection);
    };
    var each$2 = function (wire, f) {
      var bars = descendants$1(wire.parent(), '.' + resizeBar);
      each(bars, f);
    };
    var hide = function (wire) {
      each$2(wire, function (bar) {
        set$1(bar, 'display', 'none');
      });
    };
    var show = function (wire) {
      each$2(wire, function (bar) {
        set$1(bar, 'display', 'block');
      });
    };
    var isRowBar = function (element) {
      return has$2(element, resizeRowBar);
    };
    var isColBar = function (element) {
      return has$2(element, resizeColBar);
    };

    var resizeBarDragging = resolve$1('resizer-bar-dragging');
    var BarManager = function (wire, direction, hdirection) {
      var mutation = BarMutation();
      var resizing = transform(mutation, {});
      var hoverTable = Option.none();
      var getResizer = function (element, type) {
        return Option.from(get$1(element, type));
      };
      mutation.events.drag.bind(function (event) {
        getResizer(event.target(), 'data-row').each(function (_dataRow) {
          var currentRow = getCssValue(event.target(), 'top');
          set$1(event.target(), 'top', currentRow + event.yDelta() + 'px');
        });
        getResizer(event.target(), 'data-column').each(function (_dataCol) {
          var currentCol = getCssValue(event.target(), 'left');
          set$1(event.target(), 'left', currentCol + event.xDelta() + 'px');
        });
      });
      var getDelta = function (target, dir) {
        var newX = getCssValue(target, dir);
        var oldX = getAttrValue(target, 'data-initial-' + dir, 0);
        return newX - oldX;
      };
      resizing.events.stop.bind(function () {
        mutation.get().each(function (target) {
          hoverTable.each(function (table) {
            getResizer(target, 'data-row').each(function (row) {
              var delta = getDelta(target, 'top');
              remove(target, 'data-initial-top');
              events.trigger.adjustHeight(table, delta, parseInt(row, 10));
            });
            getResizer(target, 'data-column').each(function (column) {
              var delta = getDelta(target, 'left');
              remove(target, 'data-initial-left');
              events.trigger.adjustWidth(table, delta, parseInt(column, 10));
            });
            refresh(wire, table, hdirection, direction);
          });
        });
      });
      var handler = function (target, dir) {
        events.trigger.startAdjust();
        mutation.assign(target);
        set(target, 'data-initial-' + dir, getCssValue(target, dir));
        add$3(target, resizeBarDragging);
        set$1(target, 'opacity', '0.2');
        resizing.go(wire.parent());
      };
      var mousedown = bind$2(wire.parent(), 'mousedown', function (event) {
        if (isRowBar(event.target())) {
          handler(event.target(), 'top');
        }
        if (isColBar(event.target())) {
          handler(event.target(), 'left');
        }
      });
      var isRoot = function (e) {
        return eq(e, wire.view());
      };
      var findClosestEditableTable = function (target) {
        return closest$1(target, 'table', isRoot).filter(function (table) {
          return findClosestContentEditable(table, isRoot).exists(isContentEditableTrue);
        });
      };
      var mouseover = bind$2(wire.view(), 'mouseover', function (event) {
        findClosestEditableTable(event.target()).fold(function () {
          if (inBody(event.target())) {
            destroy(wire);
          }
        }, function (table) {
          hoverTable = Option.some(table);
          refresh(wire, table, hdirection, direction);
        });
      });
      var destroy$1 = function () {
        mousedown.unbind();
        mouseover.unbind();
        resizing.destroy();
        destroy(wire);
      };
      var refresh$1 = function (tbl) {
        refresh(wire, tbl, hdirection, direction);
      };
      var events = create({
        adjustHeight: Event([
          'table',
          'delta',
          'row'
        ]),
        adjustWidth: Event([
          'table',
          'delta',
          'column'
        ]),
        startAdjust: Event([])
      });
      return {
        destroy: destroy$1,
        refresh: refresh$1,
        on: resizing.on,
        off: resizing.off,
        hideBars: curry(hide, wire),
        showBars: curry(show, wire),
        events: events.registry
      };
    };

    var create$1 = function (wire, vdirection, lazySizing) {
      var hdirection = height;
      var manager = BarManager(wire, vdirection, hdirection);
      var events = create({
        beforeResize: Event(['table']),
        afterResize: Event(['table']),
        startDrag: Event([])
      });
      manager.events.adjustHeight.bind(function (event) {
        var table = event.table();
        events.trigger.beforeResize(table);
        var delta = hdirection.delta(event.delta(), table);
        adjustHeight(table, delta, event.row(), hdirection);
        events.trigger.afterResize(table);
      });
      manager.events.startAdjust.bind(function (_event) {
        events.trigger.startDrag();
      });
      manager.events.adjustWidth.bind(function (event) {
        var table = event.table();
        events.trigger.beforeResize(table);
        var delta = vdirection.delta(event.delta(), table);
        var tableSize = lazySizing(table);
        adjustWidth(table, delta, event.column(), vdirection, tableSize);
        events.trigger.afterResize(table);
      });
      return {
        on: manager.on,
        off: manager.off,
        hideBars: manager.hideBars,
        showBars: manager.showBars,
        destroy: manager.destroy,
        events: events.registry
      };
    };
    var TableResize = { create: create$1 };

    var fireNewRow = function (editor, row) {
      return editor.fire('newrow', { node: row });
    };
    var fireNewCell = function (editor, cell) {
      return editor.fire('newcell', { node: cell });
    };
    var fireObjectResizeStart = function (editor, target, width, height) {
      editor.fire('ObjectResizeStart', {
        target: target,
        width: width,
        height: height
      });
    };
    var fireObjectResized = function (editor, target, width, height) {
      editor.fire('ObjectResized', {
        target: target,
        width: width,
        height: height
      });
    };
    var fireTableSelectionChange = function (editor, cells, start, finish, otherCells) {
      editor.fire('TableSelectionChange', {
        cells: cells,
        start: start,
        finish: finish,
        otherCells: otherCells
      });
    };
    var fireTableSelectionClear = function (editor) {
      editor.fire('TableSelectionClear');
    };

    var defaultTableToolbar = 'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol';
    var defaultStyles = {
      'border-collapse': 'collapse',
      'width': '100%'
    };
    var determineDefaultStyles = function (editor) {
      if (isPixelsForced(editor)) {
        var editorWidth = editor.getBody().offsetWidth;
        return __assign(__assign({}, defaultStyles), { width: editorWidth + 'px' });
      } else if (isResponsiveForced(editor)) {
        return filter$1(defaultStyles, function (_value, key) {
          return key !== 'width';
        });
      } else {
        return defaultStyles;
      }
    };
    var defaultAttributes = { border: '1' };
    var getTableSizingMode = function (editor) {
      return editor.getParam('table_sizing_mode', 'auto');
    };
    var getTableResponseWidth = function (editor) {
      return editor.getParam('table_responsive_width');
    };
    var getDefaultAttributes = function (editor) {
      return editor.getParam('table_default_attributes', defaultAttributes, 'object');
    };
    var getDefaultStyles = function (editor) {
      return editor.getParam('table_default_styles', determineDefaultStyles(editor), 'object');
    };
    var hasTableResizeBars = function (editor) {
      return editor.getParam('table_resize_bars', true, 'boolean');
    };
    var hasTabNavigation = function (editor) {
      return editor.getParam('table_tab_navigation', true, 'boolean');
    };
    var hasAdvancedCellTab = function (editor) {
      return editor.getParam('table_cell_advtab', true, 'boolean');
    };
    var hasAdvancedRowTab = function (editor) {
      return editor.getParam('table_row_advtab', true, 'boolean');
    };
    var hasAdvancedTableTab = function (editor) {
      return editor.getParam('table_advtab', true, 'boolean');
    };
    var hasAppearanceOptions = function (editor) {
      return editor.getParam('table_appearance_options', true, 'boolean');
    };
    var hasTableGrid = function (editor) {
      return editor.getParam('table_grid', true, 'boolean');
    };
    var shouldStyleWithCss = function (editor) {
      return editor.getParam('table_style_by_css', false, 'boolean');
    };
    var getCellClassList = function (editor) {
      return editor.getParam('table_cell_class_list', [], 'array');
    };
    var getRowClassList = function (editor) {
      return editor.getParam('table_row_class_list', [], 'array');
    };
    var getTableClassList = function (editor) {
      return editor.getParam('table_class_list', [], 'array');
    };
    var isPercentagesForced = function (editor) {
      return getTableSizingMode(editor) === 'relative' || getTableResponseWidth(editor) === true;
    };
    var isPixelsForced = function (editor) {
      return getTableSizingMode(editor) === 'fixed' || getTableResponseWidth(editor) === false;
    };
    var isResponsiveForced = function (editor) {
      return getTableSizingMode(editor) === 'responsive';
    };
    var getToolbar = function (editor) {
      return editor.getParam('table_toolbar', defaultTableToolbar);
    };
    var getTableHeaderType = function (editor) {
      var defaultValue = 'section';
      var value = editor.getParam('table_header_type', defaultValue, 'string');
      var validValues = [
        'section',
        'cells',
        'sectionCells',
        'auto'
      ];
      if (!contains(validValues, value)) {
        return defaultValue;
      } else {
        return value;
      }
    };
    var getCloneElements = function (editor) {
      var cloneElements = editor.getParam('table_clone_elements');
      if (isString(cloneElements)) {
        return Option.some(cloneElements.split(/[ ,]/));
      } else if (Array.isArray(cloneElements)) {
        return Option.some(cloneElements);
      } else {
        return Option.none();
      }
    };
    var hasObjectResizing = function (editor) {
      var objectResizing = editor.getParam('object_resizing', true);
      return isString(objectResizing) ? objectResizing === 'table' : objectResizing;
    };

    var getNodeName = function (elm) {
      return elm.nodeName.toLowerCase();
    };
    var getBody$1 = function (editor) {
      return Element.fromDom(editor.getBody());
    };
    var getPixelWidth$1 = function (elm) {
      return elm.getBoundingClientRect().width;
    };
    var getPixelHeight = function (elm) {
      return elm.getBoundingClientRect().height;
    };
    var getIsRoot = function (editor) {
      return function (element) {
        return eq(element, getBody$1(editor));
      };
    };
    var removePxSuffix = function (size) {
      return size ? size.replace(/px$/, '') : '';
    };
    var addPxSuffix = function (size) {
      return /^\d+(\.\d+)?$/.test(size) ? size + 'px' : size;
    };
    var removeDataStyle = function (table) {
      remove(table, 'data-mce-style');
      each(cells(table), function (cell) {
        return remove(cell, 'data-mce-style');
      });
    };
    var getRawWidth$1 = function (editor, elm) {
      var raw = editor.dom.getStyle(elm, 'width') || editor.dom.getAttrib(elm, 'width');
      return Option.from(raw).filter(isNotEmpty);
    };
    var isPercentage = function (value) {
      return /^(\d+(\.\d+)?)%$/.test(value);
    };

    var getDirection = function (element) {
      return get$2(element, 'direction') === 'rtl' ? 'rtl' : 'ltr';
    };

    var ltr$1 = { isRtl: constant(false) };
    var rtl$1 = { isRtl: constant(true) };
    var directionAt = function (element) {
      var dir = getDirection(element);
      return dir === 'rtl' ? rtl$1 : ltr$1;
    };

    var Cell = function (initial) {
      var value = initial;
      var get = function () {
        return value;
      };
      var set = function (v) {
        value = v;
      };
      return {
        get: get,
        set: set
      };
    };

    var noneSize = function (table) {
      var getWidth = function () {
        return get$5(table);
      };
      var zero = constant(0);
      return {
        width: getWidth,
        pixelWidth: getWidth,
        getWidths: getPixelWidths,
        getCellDelta: zero,
        singleColumnWidth: constant([0]),
        minCellWidth: zero,
        setElementWidth: noop,
        adjustTableWidth: noop,
        label: 'none'
      };
    };
    var percentageSize = function (initialWidth, table) {
      var floatWidth = Cell(parseFloat(initialWidth));
      var pixelWidth = Cell(get$5(table));
      var getCellDelta = function (delta) {
        return delta / pixelWidth.get() * 100;
      };
      var singleColumnWidth = function (w, _delta) {
        return [100 - w];
      };
      var minCellWidth = function () {
        return minWidth() / pixelWidth.get() * 100;
      };
      var adjustTableWidth = function (delta) {
        var currentWidth = floatWidth.get();
        var change = delta / 100 * currentWidth;
        var newWidth = currentWidth + change;
        setPercentageWidth(table, newWidth);
        floatWidth.set(newWidth);
        pixelWidth.set(get$5(table));
      };
      return {
        width: floatWidth.get,
        pixelWidth: pixelWidth.get,
        getWidths: getPercentageWidths,
        getCellDelta: getCellDelta,
        singleColumnWidth: singleColumnWidth,
        minCellWidth: minCellWidth,
        setElementWidth: setPercentageWidth,
        adjustTableWidth: adjustTableWidth,
        label: 'percent'
      };
    };
    var pixelSize = function (initialWidth, table) {
      var width = Cell(initialWidth);
      var getWidth = width.get;
      var getCellDelta = identity;
      var singleColumnWidth = function (w, delta) {
        var newNext = Math.max(minWidth(), w + delta);
        return [newNext - w];
      };
      var adjustTableWidth = function (delta) {
        var newWidth = getWidth() + delta;
        setPixelWidth(table, newWidth);
        width.set(newWidth);
      };
      return {
        width: getWidth,
        pixelWidth: getWidth,
        getWidths: getPixelWidths,
        getCellDelta: getCellDelta,
        singleColumnWidth: singleColumnWidth,
        minCellWidth: minWidth,
        setElementWidth: setPixelWidth,
        adjustTableWidth: adjustTableWidth,
        label: 'pixel'
      };
    };
    var chooseSize = function (element, width) {
      var percentMatch = percentageBasedSizeRegex().exec(width);
      if (percentMatch !== null) {
        return percentageSize(percentMatch[1], element);
      }
      var pixelMatch = pixelBasedSizeRegex().exec(width);
      if (pixelMatch !== null) {
        var intWidth = parseInt(pixelMatch[1], 10);
        return pixelSize(intWidth, element);
      }
      var fallbackWidth = get$5(element);
      return pixelSize(fallbackWidth, element);
    };
    var getTableSize = function (table) {
      var width = getRawWidth(table);
      return width.fold(function () {
        return noneSize(table);
      }, function (w) {
        return chooseSize(table, w);
      });
    };
    var TableSize = {
      getTableSize: getTableSize,
      pixelSize: pixelSize,
      percentageSize: percentageSize,
      noneSize: noneSize
    };

    var get$8 = function (editor, table) {
      if (isPercentagesForced(editor)) {
        var width = getRawWidth$1(editor, table.dom()).filter(isPercentage).getOrThunk(function () {
          return getPercentTableWidth$1(table);
        });
        return TableSize.percentageSize(width, table);
      } else if (isPixelsForced(editor)) {
        return TableSize.pixelSize(get$5(table), table);
      } else {
        return TableSize.getTableSize(table);
      }
    };

    var cleanupLegacyAttributes = function (element) {
      remove(element, 'width');
    };
    var convertToPercentSize = function (table, direction, tableSize) {
      var newWidth = getPercentTableWidth(table);
      redistribute$1(table, Option.some(newWidth), Option.none(), direction, tableSize);
      cleanupLegacyAttributes(table);
    };
    var convertToPixelSize = function (table, direction, tableSize) {
      var newWidth = getPixelTableWidth(table);
      redistribute$1(table, Option.some(newWidth), Option.none(), direction, tableSize);
      cleanupLegacyAttributes(table);
    };
    var convertToNoneSize = function (table) {
      remove$1(table, 'width');
      each(cells(table), function (cell) {
        remove$1(cell, 'width');
        cleanupLegacyAttributes(cell);
      });
      cleanupLegacyAttributes(table);
    };

    var enforcePercentage = function (editor, table) {
      var direction = TableDirection(directionAt);
      var tableSizing = get$8(editor, table);
      convertToPercentSize(table, direction, tableSizing);
    };
    var enforcePixels = function (editor, table) {
      var direction = TableDirection(directionAt);
      var tableSizing = get$8(editor, table);
      convertToPixelSize(table, direction, tableSizing);
    };
    var enforceNone = convertToNoneSize;
    var syncPixels = function (table) {
      each(cells(table), function (cell) {
        var computedWidth = get$2(cell, 'width');
        set$1(cell, 'width', computedWidth);
        remove(cell, 'width');
      });
    };

    var createContainer = function () {
      var container = Element.fromTag('div');
      setAll$1(container, {
        position: 'static',
        height: '0',
        width: '0',
        padding: '0',
        margin: '0',
        border: '0'
      });
      append(body(), container);
      return container;
    };
    var get$9 = function (editor, _container) {
      return editor.inline ? ResizeWire.body(getBody$1(editor), createContainer()) : ResizeWire.only(Element.fromDom(editor.getDoc()));
    };
    var remove$6 = function (editor, wire) {
      if (editor.inline) {
        remove$2(wire.parent());
      }
    };

    var getResizeHandler = function (editor) {
      var selectionRng = Option.none();
      var resize = Option.none();
      var wire = Option.none();
      var startW;
      var startRawW;
      var isTable = function (elm) {
        return elm.nodeName === 'TABLE';
      };
      var lazyResize = function () {
        return resize;
      };
      var lazyWire = function () {
        return wire.getOr(ResizeWire.only(Element.fromDom(editor.getBody())));
      };
      var destroy = function () {
        resize.each(function (sz) {
          sz.destroy();
        });
        wire.each(function (w) {
          remove$6(editor, w);
        });
      };
      editor.on('init', function () {
        var direction = TableDirection(directionAt);
        var rawWire = get$9(editor);
        wire = Option.some(rawWire);
        if (hasObjectResizing(editor) && hasTableResizeBars(editor)) {
          var lazySizing = function (table) {
            return get$8(editor, table);
          };
          var sz = TableResize.create(rawWire, direction, lazySizing);
          sz.on();
          sz.events.startDrag.bind(function (_event) {
            selectionRng = Option.some(editor.selection.getRng());
          });
          sz.events.beforeResize.bind(function (event) {
            var rawTable = event.table().dom();
            fireObjectResizeStart(editor, rawTable, getPixelWidth$1(rawTable), getPixelHeight(rawTable));
          });
          sz.events.afterResize.bind(function (event) {
            var table = event.table();
            var rawTable = table.dom();
            removeDataStyle(table);
            selectionRng.each(function (rng) {
              editor.selection.setRng(rng);
              editor.focus();
            });
            fireObjectResized(editor, rawTable, getPixelWidth$1(rawTable), getPixelHeight(rawTable));
            editor.undoManager.add();
          });
          resize = Option.some(sz);
        }
      });
      editor.on('ObjectResizeStart', function (e) {
        var targetElm = e.target;
        if (isTable(targetElm)) {
          var table = Element.fromDom(targetElm);
          if (!isPixelSizing$1(table) && isPixelsForced(editor)) {
            enforcePixels(editor, table);
          } else if (!isPercentSizing$1(table) && isPercentagesForced(editor)) {
            enforcePercentage(editor, table);
          }
          startW = e.width;
          startRawW = getRawWidth$1(editor, targetElm).getOr('');
        }
      });
      editor.on('ObjectResized', function (e) {
        var targetElm = e.target;
        if (isTable(targetElm)) {
          var table = Element.fromDom(targetElm);
          if (startRawW === '' || !isPercentage(startRawW) && isResponsiveForced(editor)) {
            enforcePercentage(editor, table);
          } else if (isPercentage(startRawW)) {
            var percentW = parseFloat(startRawW.replace('%', ''));
            var targetPercentW = e.width * percentW / startW;
            set$1(table, 'width', targetPercentW + '%');
          } else {
            syncPixels(table);
          }
          removeDataStyle(table);
        }
      });
      editor.on('SwitchMode', function () {
        lazyResize().each(function (resize) {
          if (editor.mode.isReadOnly()) {
            resize.hideBars();
          } else {
            resize.showBars();
          }
        });
      });
      return {
        lazyResize: lazyResize,
        lazyWire: lazyWire,
        destroy: destroy
      };
    };

    var point = function (element, offset) {
      return {
        element: constant(element),
        offset: constant(offset)
      };
    };

    var scan = function (universe, element, direction) {
      if (universe.property().isText(element) && universe.property().getText(element).trim().length === 0 || universe.property().isComment(element)) {
        return direction(element).bind(function (elem) {
          return scan(universe, elem, direction).orThunk(function () {
            return Option.some(elem);
          });
        });
      } else {
        return Option.none();
      }
    };
    var toEnd = function (universe, element) {
      if (universe.property().isText(element)) {
        return universe.property().getText(element).length;
      }
      var children = universe.property().children(element);
      return children.length;
    };
    var freefallRtl = function (universe, element) {
      var candidate = scan(universe, element, universe.query().prevSibling).getOr(element);
      if (universe.property().isText(candidate)) {
        return point(candidate, toEnd(universe, candidate));
      }
      var children = universe.property().children(candidate);
      return children.length > 0 ? freefallRtl(universe, children[children.length - 1]) : point(candidate, toEnd(universe, candidate));
    };

    var freefallRtl$1 = freefallRtl;

    var universe$1 = DomUniverse();
    var freefallRtl$2 = function (element) {
      return freefallRtl$1(universe$1, element);
    };

    var halve = function (main, other) {
      var width = getGenericWidth(main);
      width.each(function (w) {
        var newWidth = w.width() / 2;
        setGenericWidth(main, newWidth, w.unit());
        setGenericWidth(other, newWidth, w.unit());
      });
    };

    var getGridSize = function (table) {
      var warehouse = Warehouse.fromTable(table);
      return warehouse.grid;
    };

    var cat = function (arr) {
      var r = [];
      var push = function (x) {
        r.push(x);
      };
      for (var i = 0; i < arr.length; i++) {
        arr[i].each(push);
      }
      return r;
    };
    var lift2 = function (oa, ob, f) {
      return oa.isSome() && ob.isSome() ? Option.some(f(oa.getOrDie(), ob.getOrDie())) : Option.none();
    };

    var setIfNot = function (element, property, value, ignore) {
      if (value === ignore) {
        remove(element, property);
      } else {
        set(element, property, value);
      }
    };
    var render = function (table, grid) {
      var newRows = [];
      var newCells = [];
      var insertThead = last(children$2(table, 'caption,colgroup')).fold(function () {
        return curry(prepend, table);
      }, function (c) {
        return curry(after, c);
      });
      var renderSection = function (gridSection, sectionName) {
        var section = child$2(table, sectionName).getOrThunk(function () {
          var tb = Element.fromTag(sectionName, owner(table).dom());
          sectionName === 'thead' ? insertThead(tb) : append(table, tb);
          return tb;
        });
        empty(section);
        var rows = map(gridSection, function (row) {
          if (row.isNew()) {
            newRows.push(row.element());
          }
          var tr = row.element();
          empty(tr);
          each(row.cells(), function (cell) {
            if (cell.isNew()) {
              newCells.push(cell.element());
            }
            setIfNot(cell.element(), 'colspan', cell.colspan(), 1);
            setIfNot(cell.element(), 'rowspan', cell.rowspan(), 1);
            append(tr, cell.element());
          });
          return tr;
        });
        append$1(section, rows);
      };
      var removeSection = function (sectionName) {
        child$2(table, sectionName).each(remove$2);
      };
      var renderOrRemoveSection = function (gridSection, sectionName) {
        if (gridSection.length > 0) {
          renderSection(gridSection, sectionName);
        } else {
          removeSection(sectionName);
        }
      };
      var headSection = [];
      var bodySection = [];
      var footSection = [];
      each(grid, function (row) {
        switch (row.section()) {
        case 'thead':
          headSection.push(row);
          break;
        case 'tbody':
          bodySection.push(row);
          break;
        case 'tfoot':
          footSection.push(row);
          break;
        }
      });
      renderOrRemoveSection(headSection, 'thead');
      renderOrRemoveSection(bodySection, 'tbody');
      renderOrRemoveSection(footSection, 'tfoot');
      return {
        newRows: newRows,
        newCells: newCells
      };
    };
    var copy$2 = function (grid) {
      return map(grid, function (row) {
        var tr = shallow(row.element());
        each(row.cells(), function (cell) {
          var clonedCell = deep(cell.element());
          setIfNot(clonedCell, 'colspan', cell.colspan(), 1);
          setIfNot(clonedCell, 'rowspan', cell.rowspan(), 1);
          append(tr, clonedCell);
        });
        return tr;
      });
    };

    var addCell = function (gridRow, index, cell) {
      var cells = gridRow.cells();
      var before = cells.slice(0, index);
      var after = cells.slice(index);
      var newCells = before.concat([cell]).concat(after);
      return setCells(gridRow, newCells);
    };
    var mutateCell = function (gridRow, index, cell) {
      var cells = gridRow.cells();
      cells[index] = cell;
    };
    var setCells = function (gridRow, cells) {
      return rowcells(cells, gridRow.section());
    };
    var mapCells = function (gridRow, f) {
      var cells = gridRow.cells();
      var r = map(cells, f);
      return rowcells(r, gridRow.section());
    };
    var getCell = function (gridRow, index) {
      return gridRow.cells()[index];
    };
    var getCellElement = function (gridRow, index) {
      return getCell(gridRow, index).element();
    };
    var cellLength = function (gridRow) {
      return gridRow.cells().length;
    };

    var getColumn = function (grid, index) {
      return map(grid, function (row) {
        return getCell(row, index);
      });
    };
    var getRow = function (grid, index) {
      return grid[index];
    };
    var findDiff = function (xs, comp) {
      if (xs.length === 0) {
        return 0;
      }
      var first = xs[0];
      var index = findIndex(xs, function (x) {
        return !comp(first.element(), x.element());
      });
      return index.fold(function () {
        return xs.length;
      }, function (ind) {
        return ind;
      });
    };
    var subgrid = function (grid, row, column, comparator) {
      var restOfRow = getRow(grid, row).cells().slice(column);
      var endColIndex = findDiff(restOfRow, comparator);
      var restOfColumn = getColumn(grid, column).slice(row);
      var endRowIndex = findDiff(restOfColumn, comparator);
      return {
        colspan: endColIndex,
        rowspan: endRowIndex
      };
    };

    var toDetails = function (grid, comparator) {
      var seen = map(grid, function (row) {
        return map(row.cells(), function () {
          return false;
        });
      });
      var updateSeen = function (ri, ci, rowspan, colspan) {
        for (var r = ri; r < ri + rowspan; r++) {
          for (var c = ci; c < ci + colspan; c++) {
            seen[r][c] = true;
          }
        }
      };
      return map(grid, function (row, ri) {
        var details = bind(row.cells(), function (cell, ci) {
          if (seen[ri][ci] === false) {
            var result = subgrid(grid, ri, ci, comparator);
            updateSeen(ri, ci, result.rowspan, result.colspan);
            return [detailnew(cell.element(), result.rowspan, result.colspan, cell.isNew())];
          } else {
            return [];
          }
        });
        return rowdetails(details, row.section());
      });
    };
    var toGrid = function (warehouse, generators, isNew) {
      var grid = [];
      for (var i = 0; i < warehouse.grid.rows(); i++) {
        var rowCells = [];
        for (var j = 0; j < warehouse.grid.columns(); j++) {
          var element = Warehouse.getAt(warehouse, i, j).map(function (item) {
            return elementnew(item.element(), isNew);
          }).getOrThunk(function () {
            return elementnew(generators.gap(), true);
          });
          rowCells.push(element);
        }
        var row = rowcells(rowCells, warehouse.all[i].section());
        grid.push(row);
      }
      return grid;
    };

    var fromWarehouse = function (warehouse, generators) {
      return toGrid(warehouse, generators, false);
    };
    var deriveRows = function (rendered, generators) {
      var findRow = function (details) {
        var rowOfCells = findMap(details, function (detail) {
          return parent(detail.element()).map(function (row) {
            var isNew = parent(row).isNone();
            return elementnew(row, isNew);
          });
        });
        return rowOfCells.getOrThunk(function () {
          return elementnew(generators.row(), true);
        });
      };
      return map(rendered, function (details) {
        var row = findRow(details.details());
        return rowdatanew(row.element(), details.details(), details.section(), row.isNew());
      });
    };
    var toDetailList = function (grid, generators) {
      var rendered = toDetails(grid, eq);
      return deriveRows(rendered, generators);
    };
    var findInWarehouse = function (warehouse, element) {
      return findMap(warehouse.all, function (r) {
        return find(r.cells(), function (e) {
          return eq(element, e.element());
        });
      });
    };
    var run = function (operation, extract, adjustment, postAction, genWrappers) {
      return function (wire, table, target, generators, direction, sizing) {
        var warehouse = Warehouse.fromTable(table);
        var output = extract(warehouse, target).map(function (info) {
          var model = fromWarehouse(warehouse, generators);
          var result = operation(model, info, eq, genWrappers(generators));
          var grid = toDetailList(result.grid(), generators);
          return {
            grid: constant(grid),
            cursor: result.cursor
          };
        });
        return output.fold(function () {
          return Option.none();
        }, function (out) {
          var newElements = render(table, out.grid());
          var tableSizing = Option.from(sizing).getOrThunk(function () {
            return TableSize.getTableSize(table);
          });
          adjustment(table, out.grid(), direction, tableSizing);
          postAction(table);
          refresh(wire, table, height, direction);
          return Option.some({
            cursor: out.cursor,
            newRows: constant(newElements.newRows),
            newCells: constant(newElements.newCells)
          });
        });
      };
    };
    var onCell = function (warehouse, target) {
      return cell(target.element()).bind(function (cell) {
        return findInWarehouse(warehouse, cell);
      });
    };
    var onPaste = function (warehouse, target) {
      return cell(target.element()).bind(function (cell) {
        return findInWarehouse(warehouse, cell).map(function (details) {
          var value = __assign(__assign({}, details), {
            generators: target.generators,
            clipboard: target.clipboard
          });
          return value;
        });
      });
    };
    var onPasteByEditor = function (warehouse, target) {
      var details = map(target.selection(), function (cell$1) {
        return cell(cell$1).bind(function (lc) {
          return findInWarehouse(warehouse, lc);
        });
      });
      var cells = cat(details);
      return cells.length > 0 ? Option.some({
        cells: cells,
        generators: target.generators,
        clipboard: target.clipboard
      }) : Option.none();
    };
    var onMergable = function (_warehouse, target) {
      return target.mergable();
    };
    var onUnmergable = function (_warehouse, target) {
      return target.unmergable();
    };
    var onCells = function (warehouse, target) {
      var details = map(target.selection(), function (cell$1) {
        return cell(cell$1).bind(function (lc) {
          return findInWarehouse(warehouse, lc);
        });
      });
      var cells = cat(details);
      return cells.length > 0 ? Option.some(cells) : Option.none();
    };

    var merge = function (grid, bounds, comparator, substitution) {
      if (grid.length === 0) {
        return grid;
      }
      for (var i = bounds.startRow(); i <= bounds.finishRow(); i++) {
        for (var j = bounds.startCol(); j <= bounds.finishCol(); j++) {
          mutateCell(grid[i], j, elementnew(substitution(), false));
        }
      }
      return grid;
    };
    var unmerge = function (grid, target, comparator, substitution) {
      var first = true;
      for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < cellLength(grid[0]); j++) {
          var current = getCellElement(grid[i], j);
          var isToReplace = comparator(current, target);
          if (isToReplace === true && first === false) {
            mutateCell(grid[i], j, elementnew(substitution(), true));
          } else if (isToReplace === true) {
            first = false;
          }
        }
      }
      return grid;
    };
    var uniqueCells = function (row, comparator) {
      return foldl(row, function (rest, cell) {
        return exists(rest, function (currentCell) {
          return comparator(currentCell.element(), cell.element());
        }) ? rest : rest.concat([cell]);
      }, []);
    };
    var splitCols = function (grid, index, comparator, substitution) {
      if (index > 0 && index < grid[0].cells().length) {
        each(grid, function (row) {
          var prevCell = row.cells()[index - 1];
          var current = row.cells()[index];
          var isToReplace = comparator(current.element(), prevCell.element());
          if (isToReplace) {
            mutateCell(row, index, elementnew(substitution(), true));
          }
        });
      }
      return grid;
    };
    var splitRows = function (grid, index, comparator, substitution) {
      if (index > 0 && index < grid.length) {
        var rowPrevCells = grid[index - 1].cells();
        var cells = uniqueCells(rowPrevCells, comparator);
        each(cells, function (cell) {
          var replacement = Option.none();
          var _loop_1 = function (i) {
            var _loop_2 = function (j) {
              var current = grid[i].cells()[j];
              var isToReplace = comparator(current.element(), cell.element());
              if (isToReplace) {
                if (replacement.isNone()) {
                  replacement = Option.some(substitution());
                }
                replacement.each(function (sub) {
                  mutateCell(grid[i], j, elementnew(sub, true));
                });
              }
            };
            for (var j = 0; j < cellLength(grid[0]); j++) {
              _loop_2(j);
            }
          };
          for (var i = index; i < grid.length; i++) {
            _loop_1(i);
          }
        });
      }
      return grid;
    };

    var value = function (o) {
      var is = function (v) {
        return o === v;
      };
      var or = function (_opt) {
        return value(o);
      };
      var orThunk = function (_f) {
        return value(o);
      };
      var map = function (f) {
        return value(f(o));
      };
      var mapError = function (_f) {
        return value(o);
      };
      var each = function (f) {
        f(o);
      };
      var bind = function (f) {
        return f(o);
      };
      var fold = function (_, onValue) {
        return onValue(o);
      };
      var exists = function (f) {
        return f(o);
      };
      var forall = function (f) {
        return f(o);
      };
      var toOption = function () {
        return Option.some(o);
      };
      return {
        is: is,
        isValue: always,
        isError: never,
        getOr: constant(o),
        getOrThunk: constant(o),
        getOrDie: constant(o),
        or: or,
        orThunk: orThunk,
        fold: fold,
        map: map,
        mapError: mapError,
        each: each,
        bind: bind,
        exists: exists,
        forall: forall,
        toOption: toOption
      };
    };
    var error = function (message) {
      var getOrThunk = function (f) {
        return f();
      };
      var getOrDie = function () {
        return die(String(message))();
      };
      var or = function (opt) {
        return opt;
      };
      var orThunk = function (f) {
        return f();
      };
      var map = function (_f) {
        return error(message);
      };
      var mapError = function (f) {
        return error(f(message));
      };
      var bind = function (_f) {
        return error(message);
      };
      var fold = function (onError, _) {
        return onError(message);
      };
      return {
        is: never,
        isValue: never,
        isError: always,
        getOr: identity,
        getOrThunk: getOrThunk,
        getOrDie: getOrDie,
        or: or,
        orThunk: orThunk,
        fold: fold,
        map: map,
        mapError: mapError,
        each: noop,
        bind: bind,
        exists: never,
        forall: always,
        toOption: Option.none
      };
    };
    var fromOption = function (opt, err) {
      return opt.fold(function () {
        return error(err);
      }, value);
    };
    var Result = {
      value: value,
      error: error,
      fromOption: fromOption
    };

    var measure = function (startAddress, gridA, gridB) {
      if (startAddress.row() >= gridA.length || startAddress.column() > cellLength(gridA[0])) {
        return Result.error('invalid start address out of table bounds, row: ' + startAddress.row() + ', column: ' + startAddress.column());
      }
      var rowRemainder = gridA.slice(startAddress.row());
      var colRemainder = rowRemainder[0].cells().slice(startAddress.column());
      var colRequired = cellLength(gridB[0]);
      var rowRequired = gridB.length;
      return Result.value({
        rowDelta: rowRemainder.length - rowRequired,
        colDelta: colRemainder.length - colRequired
      });
    };
    var measureWidth = function (gridA, gridB) {
      var colLengthA = cellLength(gridA[0]);
      var colLengthB = cellLength(gridB[0]);
      return {
        rowDelta: 0,
        colDelta: colLengthA - colLengthB
      };
    };
    var measureHeight = function (gridA, gridB) {
      var rowLengthA = gridA.length;
      var rowLengthB = gridB.length;
      return {
        rowDelta: rowLengthA - rowLengthB,
        colDelta: 0
      };
    };
    var fill = function (cells, generator) {
      return map(cells, function () {
        return elementnew(generator.cell(), true);
      });
    };
    var rowFill = function (grid, amount, generator) {
      return grid.concat(range(amount, function () {
        return setCells(grid[grid.length - 1], fill(grid[grid.length - 1].cells(), generator));
      }));
    };
    var colFill = function (grid, amount, generator) {
      return map(grid, function (row) {
        return setCells(row, row.cells().concat(fill(range(amount, identity), generator)));
      });
    };
    var tailor = function (gridA, delta, generator) {
      var fillCols = delta.colDelta < 0 ? colFill : identity;
      var fillRows = delta.rowDelta < 0 ? rowFill : identity;
      var modifiedCols = fillCols(gridA, Math.abs(delta.colDelta), generator);
      return fillRows(modifiedCols, Math.abs(delta.rowDelta), generator);
    };

    var isSpanning = function (grid, row, col, comparator) {
      var candidate = getCell(grid[row], col);
      var matching = curry(comparator, candidate.element());
      var currentRow = grid[row];
      return grid.length > 1 && cellLength(currentRow) > 1 && (col > 0 && matching(getCellElement(currentRow, col - 1)) || col < currentRow.cells().length - 1 && matching(getCellElement(currentRow, col + 1)) || row > 0 && matching(getCellElement(grid[row - 1], col)) || row < grid.length - 1 && matching(getCellElement(grid[row + 1], col)));
    };
    var mergeTables = function (startAddress, gridA, gridB, generator, comparator) {
      var startRow = startAddress.row();
      var startCol = startAddress.column();
      var mergeHeight = gridB.length;
      var mergeWidth = cellLength(gridB[0]);
      var endRow = startRow + mergeHeight;
      var endCol = startCol + mergeWidth;
      for (var r = startRow; r < endRow; r++) {
        for (var c = startCol; c < endCol; c++) {
          if (isSpanning(gridA, r, c, comparator)) {
            unmerge(gridA, getCellElement(gridA[r], c), comparator, generator.cell);
          }
          var newCell = getCellElement(gridB[r - startRow], c - startCol);
          var replacement = generator.replace(newCell);
          mutateCell(gridA[r], c, elementnew(replacement, true));
        }
      }
      return gridA;
    };
    var merge$1 = function (startAddress, gridA, gridB, generator, comparator) {
      var result = measure(startAddress, gridA, gridB);
      return result.map(function (delta) {
        var fittedGrid = tailor(gridA, delta, generator);
        return mergeTables(startAddress, fittedGrid, gridB, generator, comparator);
      });
    };
    var insertCols = function (index, gridA, gridB, generator, comparator) {
      splitCols(gridA, index, comparator, generator.cell);
      var delta = measureHeight(gridB, gridA);
      var fittedNewGrid = tailor(gridB, delta, generator);
      var secondDelta = measureHeight(gridA, fittedNewGrid);
      var fittedOldGrid = tailor(gridA, secondDelta, generator);
      return map(fittedOldGrid, function (gridRow, i) {
        var newCells = gridRow.cells().slice(0, index).concat(fittedNewGrid[i].cells()).concat(gridRow.cells().slice(index, gridRow.cells().length));
        return setCells(gridRow, newCells);
      });
    };
    var insertRows = function (index, gridA, gridB, generator, comparator) {
      splitRows(gridA, index, comparator, generator.cell);
      var delta = measureWidth(gridB, gridA);
      var fittedNewGrid = tailor(gridB, delta, generator);
      var secondDelta = measureWidth(gridA, fittedNewGrid);
      var fittedOldGrid = tailor(gridA, secondDelta, generator);
      return fittedOldGrid.slice(0, index).concat(fittedNewGrid).concat(fittedOldGrid.slice(index, fittedOldGrid.length));
    };

    var insertRowAt = function (grid, index, example, comparator, substitution) {
      var before = grid.slice(0, index);
      var after = grid.slice(index);
      var between = mapCells(grid[example], function (ex, c) {
        var withinSpan = index > 0 && index < grid.length && comparator(getCellElement(grid[index - 1], c), getCellElement(grid[index], c));
        var ret = withinSpan ? getCell(grid[index], c) : elementnew(substitution(ex.element(), comparator), true);
        return ret;
      });
      return before.concat([between]).concat(after);
    };
    var insertColumnAt = function (grid, index, example, comparator, substitution) {
      return map(grid, function (row) {
        var withinSpan = index > 0 && index < cellLength(row) && comparator(getCellElement(row, index - 1), getCellElement(row, index));
        var sub = withinSpan ? getCell(row, index) : elementnew(substitution(getCellElement(row, example), comparator), true);
        return addCell(row, index, sub);
      });
    };
    var deleteColumnsAt = function (grid, start, finish) {
      var rows = map(grid, function (row) {
        var cells = row.cells().slice(0, start).concat(row.cells().slice(finish + 1));
        return rowcells(cells, row.section());
      });
      return filter(rows, function (row) {
        return row.cells().length > 0;
      });
    };
    var deleteRowsAt = function (grid, start, finish) {
      return grid.slice(0, start).concat(grid.slice(finish + 1));
    };

    var replaceIn = function (grid, targets, comparator, substitution) {
      var isTarget = function (cell) {
        return exists(targets, function (target) {
          return comparator(cell.element(), target.element());
        });
      };
      return map(grid, function (row) {
        return mapCells(row, function (cell) {
          return isTarget(cell) ? elementnew(substitution(cell.element(), comparator), true) : cell;
        });
      });
    };
    var notStartRow = function (grid, rowIndex, colIndex, comparator) {
      return getCellElement(grid[rowIndex], colIndex) !== undefined && (rowIndex > 0 && comparator(getCellElement(grid[rowIndex - 1], colIndex), getCellElement(grid[rowIndex], colIndex)));
    };
    var notStartColumn = function (row, index, comparator) {
      return index > 0 && comparator(getCellElement(row, index - 1), getCellElement(row, index));
    };
    var replaceColumn = function (grid, index, comparator, substitution) {
      var targets = bind(grid, function (row, i) {
        var alreadyAdded = notStartRow(grid, i, index, comparator) || notStartColumn(row, index, comparator);
        return alreadyAdded ? [] : [getCell(row, index)];
      });
      return replaceIn(grid, targets, comparator, substitution);
    };
    var replaceRow = function (grid, index, comparator, substitution) {
      var targetRow = grid[index];
      var targets = bind(targetRow.cells(), function (item, i) {
        var alreadyAdded = notStartRow(grid, index, i, comparator) || notStartColumn(targetRow, i, comparator);
        return alreadyAdded ? [] : [item];
      });
      return replaceIn(grid, targets, comparator, substitution);
    };

    var verifyGenerators = exactly([
      'cell',
      'row',
      'replace',
      'gap'
    ]);
    var elementToData = function (element) {
      var colspan = getAttrValue(element, 'colspan', 1);
      var rowspan = getAttrValue(element, 'rowspan', 1);
      return {
        element: constant(element),
        colspan: constant(colspan),
        rowspan: constant(rowspan)
      };
    };
    var modification = function (generators, toData) {
      if (toData === void 0) {
        toData = elementToData;
      }
      verifyGenerators(generators);
      var position = Cell(Option.none());
      var nu = function (data) {
        return generators.cell(data);
      };
      var nuFrom = function (element) {
        var data = toData(element);
        return nu(data);
      };
      var add = function (element) {
        var replacement = nuFrom(element);
        if (position.get().isNone()) {
          position.set(Option.some(replacement));
        }
        recent = Option.some({
          item: element,
          replacement: replacement
        });
        return replacement;
      };
      var recent = Option.none();
      var getOrInit = function (element, comparator) {
        return recent.fold(function () {
          return add(element);
        }, function (p) {
          return comparator(element, p.item) ? p.replacement : add(element);
        });
      };
      return {
        getOrInit: getOrInit,
        cursor: position.get
      };
    };
    var transform$1 = function (scope, tag) {
      return function (generators) {
        var position = Cell(Option.none());
        verifyGenerators(generators);
        var list = [];
        var find$1 = function (element, comparator) {
          return find(list, function (x) {
            return comparator(x.item, element);
          });
        };
        var makeNew = function (element) {
          var attrs = { scope: scope };
          var cell = generators.replace(element, tag, attrs);
          list.push({
            item: element,
            sub: cell
          });
          if (position.get().isNone()) {
            position.set(Option.some(cell));
          }
          return cell;
        };
        var replaceOrInit = function (element, comparator) {
          return find$1(element, comparator).fold(function () {
            return makeNew(element);
          }, function (p) {
            return comparator(element, p.item) ? p.sub : makeNew(element);
          });
        };
        return {
          replaceOrInit: replaceOrInit,
          cursor: position.get
        };
      };
    };
    var merging = function (generators) {
      verifyGenerators(generators);
      var position = Cell(Option.none());
      var combine = function (cell) {
        if (position.get().isNone()) {
          position.set(Option.some(cell));
        }
        return function () {
          var raw = generators.cell({
            element: constant(cell),
            colspan: constant(1),
            rowspan: constant(1)
          });
          remove$1(raw, 'width');
          remove$1(cell, 'width');
          return raw;
        };
      };
      return {
        combine: combine,
        cursor: position.get
      };
    };
    var Generators = {
      modification: modification,
      transform: transform$1,
      merging: merging
    };

    var blockList = [
      'body',
      'p',
      'div',
      'article',
      'aside',
      'figcaption',
      'figure',
      'footer',
      'header',
      'nav',
      'section',
      'ol',
      'ul',
      'table',
      'thead',
      'tfoot',
      'tbody',
      'caption',
      'tr',
      'td',
      'th',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'pre',
      'address'
    ];
    var isList = function (universe, item) {
      var tagName = universe.property().name(item);
      return contains([
        'ol',
        'ul'
      ], tagName);
    };
    var isBlock = function (universe, item) {
      var tagName = universe.property().name(item);
      return contains(blockList, tagName);
    };
    var isEmptyTag = function (universe, item) {
      return contains([
        'br',
        'img',
        'hr',
        'input'
      ], universe.property().name(item));
    };

    var universe$2 = DomUniverse();
    var isBlock$1 = function (element) {
      return isBlock(universe$2, element);
    };
    var isList$1 = function (element) {
      return isList(universe$2, element);
    };
    var isEmptyTag$1 = function (element) {
      return isEmptyTag(universe$2, element);
    };

    var merge$2 = function (cells) {
      var isBr = function (el) {
        return name(el) === 'br';
      };
      var advancedBr = function (children) {
        return forall(children, function (c) {
          return isBr(c) || isText(c) && get$3(c).trim().length === 0;
        });
      };
      var isListItem = function (el) {
        return name(el) === 'li' || ancestor(el, isList$1).isSome();
      };
      var siblingIsBlock = function (el) {
        return nextSibling(el).map(function (rightSibling) {
          if (isBlock$1(rightSibling)) {
            return true;
          }
          if (isEmptyTag$1(rightSibling)) {
            return name(rightSibling) === 'img' ? false : true;
          }
          return false;
        }).getOr(false);
      };
      var markCell = function (cell) {
        return last$1(cell).bind(function (rightEdge) {
          var rightSiblingIsBlock = siblingIsBlock(rightEdge);
          return parent(rightEdge).map(function (parent) {
            return rightSiblingIsBlock === true || isListItem(parent) || isBr(rightEdge) || isBlock$1(parent) && !eq(cell, parent) ? [] : [Element.fromTag('br')];
          });
        }).getOr([]);
      };
      var markContent = function () {
        var content = bind(cells, function (cell) {
          var children$1 = children(cell);
          return advancedBr(children$1) ? [] : children$1.concat(markCell(cell));
        });
        return content.length === 0 ? [Element.fromTag('br')] : content;
      };
      var contents = markContent();
      empty(cells[0]);
      append$1(cells[0], contents);
    };

    var prune = function (table) {
      var cells$1 = cells(table);
      if (cells$1.length === 0) {
        remove$2(table);
      }
    };
    var outcome = function (grid, cursor) {
      return {
        grid: constant(grid),
        cursor: constant(cursor)
      };
    };
    var elementFromGrid = function (grid, row, column) {
      return findIn(grid, row, column).orThunk(function () {
        return findIn(grid, 0, 0);
      });
    };
    var findIn = function (grid, row, column) {
      return Option.from(grid[row]).bind(function (r) {
        return Option.from(r.cells()[column]).bind(function (c) {
          return Option.from(c.element());
        });
      });
    };
    var bundle = function (grid, row, column) {
      return outcome(grid, findIn(grid, row, column));
    };
    var uniqueRows = function (details) {
      return foldl(details, function (rest, detail) {
        return exists(rest, function (currentDetail) {
          return currentDetail.row() === detail.row();
        }) ? rest : rest.concat([detail]);
      }, []).sort(function (detailA, detailB) {
        return detailA.row() - detailB.row();
      });
    };
    var uniqueColumns = function (details) {
      return foldl(details, function (rest, detail) {
        return exists(rest, function (currentDetail) {
          return currentDetail.column() === detail.column();
        }) ? rest : rest.concat([detail]);
      }, []).sort(function (detailA, detailB) {
        return detailA.column() - detailB.column();
      });
    };
    var opInsertRowsBefore = function (grid, details, comparator, genWrappers) {
      var example = details[0].row();
      var targetIndex = details[0].row();
      var rows = uniqueRows(details);
      var newGrid = foldl(rows, function (newG, _row) {
        return insertRowAt(newG, targetIndex, example, comparator, genWrappers.getOrInit);
      }, grid);
      return bundle(newGrid, targetIndex, details[0].column());
    };
    var opInsertRowsAfter = function (grid, details, comparator, genWrappers) {
      var rows = uniqueRows(details);
      var example = rows[rows.length - 1].row();
      var targetIndex = rows[rows.length - 1].row() + rows[rows.length - 1].rowspan();
      var newGrid = foldl(rows, function (newG, _row) {
        return insertRowAt(newG, targetIndex, example, comparator, genWrappers.getOrInit);
      }, grid);
      return bundle(newGrid, targetIndex, details[0].column());
    };
    var opInsertColumnsBefore = function (grid, details, comparator, genWrappers) {
      var columns = uniqueColumns(details);
      var example = columns[0].column();
      var targetIndex = columns[0].column();
      var newGrid = foldl(columns, function (newG, _row) {
        return insertColumnAt(newG, targetIndex, example, comparator, genWrappers.getOrInit);
      }, grid);
      return bundle(newGrid, details[0].row(), targetIndex);
    };
    var opInsertColumnsAfter = function (grid, details, comparator, genWrappers) {
      var example = details[details.length - 1].column();
      var targetIndex = details[details.length - 1].column() + details[details.length - 1].colspan();
      var columns = uniqueColumns(details);
      var newGrid = foldl(columns, function (newG, _row) {
        return insertColumnAt(newG, targetIndex, example, comparator, genWrappers.getOrInit);
      }, grid);
      return bundle(newGrid, details[0].row(), targetIndex);
    };
    var opMakeRowHeader = function (grid, detail, comparator, genWrappers) {
      var newGrid = replaceRow(grid, detail.row(), comparator, genWrappers.replaceOrInit);
      return bundle(newGrid, detail.row(), detail.column());
    };
    var opMakeColumnHeader = function (grid, detail, comparator, genWrappers) {
      var newGrid = replaceColumn(grid, detail.column(), comparator, genWrappers.replaceOrInit);
      return bundle(newGrid, detail.row(), detail.column());
    };
    var opUnmakeRowHeader = function (grid, detail, comparator, genWrappers) {
      var newGrid = replaceRow(grid, detail.row(), comparator, genWrappers.replaceOrInit);
      return bundle(newGrid, detail.row(), detail.column());
    };
    var opUnmakeColumnHeader = function (grid, detail, comparator, genWrappers) {
      var newGrid = replaceColumn(grid, detail.column(), comparator, genWrappers.replaceOrInit);
      return bundle(newGrid, detail.row(), detail.column());
    };
    var opEraseColumns = function (grid, details, _comparator, _genWrappers) {
      var columns = uniqueColumns(details);
      var newGrid = deleteColumnsAt(grid, columns[0].column(), columns[columns.length - 1].column());
      var cursor = elementFromGrid(newGrid, details[0].row(), details[0].column());
      return outcome(newGrid, cursor);
    };
    var opEraseRows = function (grid, details, _comparator, _genWrappers) {
      var rows = uniqueRows(details);
      var newGrid = deleteRowsAt(grid, rows[0].row(), rows[rows.length - 1].row());
      var cursor = elementFromGrid(newGrid, details[0].row(), details[0].column());
      return outcome(newGrid, cursor);
    };
    var opMergeCells = function (grid, mergable, comparator, _genWrappers) {
      var cells = mergable.cells();
      merge$2(cells);
      var newGrid = merge(grid, mergable.bounds(), comparator, constant(cells[0]));
      return outcome(newGrid, Option.from(cells[0]));
    };
    var opUnmergeCells = function (grid, unmergable, comparator, genWrappers) {
      var newGrid = foldr(unmergable, function (b, cell) {
        return unmerge(b, cell, comparator, genWrappers.combine(cell));
      }, grid);
      return outcome(newGrid, Option.from(unmergable[0]));
    };
    var opPasteCells = function (grid, pasteDetails, comparator, _genWrappers) {
      var gridify = function (table, generators) {
        var wh = Warehouse.fromTable(table);
        return toGrid(wh, generators, true);
      };
      var gridB = gridify(pasteDetails.clipboard(), pasteDetails.generators());
      var startAddress = address(pasteDetails.row(), pasteDetails.column());
      var mergedGrid = merge$1(startAddress, grid, gridB, pasteDetails.generators(), comparator);
      return mergedGrid.fold(function () {
        return outcome(grid, Option.some(pasteDetails.element()));
      }, function (nuGrid) {
        var cursor = elementFromGrid(nuGrid, pasteDetails.row(), pasteDetails.column());
        return outcome(nuGrid, cursor);
      });
    };
    var gridifyRows = function (rows, generators, example) {
      var pasteDetails = fromPastedRows(rows, example);
      var wh = Warehouse.generate(pasteDetails);
      return toGrid(wh, generators, true);
    };
    var opPasteColsBefore = function (grid, pasteDetails, comparator, _genWrappers) {
      var example = grid[pasteDetails.cells[0].row()];
      var index = pasteDetails.cells[0].column();
      var gridB = gridifyRows(pasteDetails.clipboard(), pasteDetails.generators(), example);
      var mergedGrid = insertCols(index, grid, gridB, pasteDetails.generators(), comparator);
      var cursor = elementFromGrid(mergedGrid, pasteDetails.cells[0].row(), pasteDetails.cells[0].column());
      return outcome(mergedGrid, cursor);
    };
    var opPasteColsAfter = function (grid, pasteDetails, comparator, _genWrappers) {
      var example = grid[pasteDetails.cells[0].row()];
      var index = pasteDetails.cells[pasteDetails.cells.length - 1].column() + pasteDetails.cells[pasteDetails.cells.length - 1].colspan();
      var gridB = gridifyRows(pasteDetails.clipboard(), pasteDetails.generators(), example);
      var mergedGrid = insertCols(index, grid, gridB, pasteDetails.generators(), comparator);
      var cursor = elementFromGrid(mergedGrid, pasteDetails.cells[0].row(), pasteDetails.cells[0].column());
      return outcome(mergedGrid, cursor);
    };
    var opPasteRowsBefore = function (grid, pasteDetails, comparator, _genWrappers) {
      var example = grid[pasteDetails.cells[0].row()];
      var index = pasteDetails.cells[0].row();
      var gridB = gridifyRows(pasteDetails.clipboard(), pasteDetails.generators(), example);
      var mergedGrid = insertRows(index, grid, gridB, pasteDetails.generators(), comparator);
      var cursor = elementFromGrid(mergedGrid, pasteDetails.cells[0].row(), pasteDetails.cells[0].column());
      return outcome(mergedGrid, cursor);
    };
    var opPasteRowsAfter = function (grid, pasteDetails, comparator, _genWrappers) {
      var example = grid[pasteDetails.cells[0].row()];
      var index = pasteDetails.cells[pasteDetails.cells.length - 1].row() + pasteDetails.cells[pasteDetails.cells.length - 1].rowspan();
      var gridB = gridifyRows(pasteDetails.clipboard(), pasteDetails.generators(), example);
      var mergedGrid = insertRows(index, grid, gridB, pasteDetails.generators(), comparator);
      var cursor = elementFromGrid(mergedGrid, pasteDetails.cells[0].row(), pasteDetails.cells[0].column());
      return outcome(mergedGrid, cursor);
    };
    var opGetColumnType = function (table, target) {
      var house = Warehouse.fromTable(table);
      var details = onCells(house, target);
      return details.bind(function (selectedCells) {
        var lastSelectedCell = selectedCells[selectedCells.length - 1];
        var minColRange = selectedCells[0].column();
        var maxColRange = lastSelectedCell.column() + lastSelectedCell.colspan();
        var selectedColumnCells = flatten(map(house.all, function (row) {
          return filter(row.cells(), function (cell) {
            return cell.column() >= minColRange && cell.column() < maxColRange;
          });
        }));
        return getCellsType(selectedColumnCells, function (cell) {
          return name(cell.element()) === 'th';
        });
      }).getOr('');
    };
    var getCellsType = function (cells, headerPred) {
      var headerCells = filter(cells, headerPred);
      if (headerCells.length === 0) {
        return Option.some('td');
      } else if (headerCells.length === cells.length) {
        return Option.some('th');
      } else {
        return Option.none();
      }
    };
    var resize = adjustWidthTo;
    var insertRowsBefore = run(opInsertRowsBefore, onCells, noop, noop, Generators.modification);
    var insertRowsAfter = run(opInsertRowsAfter, onCells, noop, noop, Generators.modification);
    var insertColumnsBefore = run(opInsertColumnsBefore, onCells, resize, noop, Generators.modification);
    var insertColumnsAfter = run(opInsertColumnsAfter, onCells, resize, noop, Generators.modification);
    var eraseColumns = run(opEraseColumns, onCells, resize, prune, Generators.modification);
    var eraseRows = run(opEraseRows, onCells, noop, prune, Generators.modification);
    var makeColumnHeader = run(opMakeColumnHeader, onCell, noop, noop, Generators.transform('row', 'th'));
    var unmakeColumnHeader = run(opUnmakeColumnHeader, onCell, noop, noop, Generators.transform(null, 'td'));
    var makeRowHeader = run(opMakeRowHeader, onCell, noop, noop, Generators.transform('col', 'th'));
    var unmakeRowHeader = run(opUnmakeRowHeader, onCell, noop, noop, Generators.transform(null, 'td'));
    var mergeCells = run(opMergeCells, onMergable, noop, noop, Generators.merging);
    var unmergeCells = run(opUnmergeCells, onUnmergable, resize, noop, Generators.merging);
    var pasteCells = run(opPasteCells, onPaste, resize, noop, Generators.modification);
    var pasteColsBefore = run(opPasteColsBefore, onPasteByEditor, noop, noop, Generators.modification);
    var pasteColsAfter = run(opPasteColsAfter, onPasteByEditor, noop, noop, Generators.modification);
    var pasteRowsBefore = run(opPasteRowsBefore, onPasteByEditor, noop, noop, Generators.modification);
    var pasteRowsAfter = run(opPasteRowsAfter, onPasteByEditor, noop, noop, Generators.modification);
    var getColumnType = opGetColumnType;

    var getSection = function (elm) {
      return getNodeName(elm.parentNode);
    };
    var mapSectionNameToType = function (section) {
      if (section === 'thead') {
        return 'header';
      } else if (section === 'tfoot') {
        return 'footer';
      } else {
        return 'body';
      }
    };
    var detectHeaderRow = function (editor, elm) {
      var isThead = getSection(elm) === 'thead';
      var areAllCellsThs = !exists(elm.cells, function (c) {
        return getNodeName(c) !== 'th';
      });
      return isThead || areAllCellsThs ? Option.some({
        thead: isThead,
        ths: areAllCellsThs
      }) : Option.none();
    };
    var getRowType = function (editor, elm) {
      return mapSectionNameToType(detectHeaderRow(editor, elm).fold(function () {
        return getSection(elm);
      }, function (_rowConfig) {
        return 'thead';
      }));
    };
    var switchRowSection = function (dom, rowElm, newSectionName) {
      var tableElm = dom.getParent(rowElm, 'table');
      var oldSectionElm = rowElm.parentNode;
      var oldSectionName = getNodeName(oldSectionElm);
      if (newSectionName !== oldSectionName) {
        var sectionElm_1 = dom.select(newSectionName, tableElm)[0];
        if (!sectionElm_1) {
          sectionElm_1 = dom.create(newSectionName);
          var firstTableChild_1 = tableElm.firstChild;
          if (newSectionName === 'thead') {
            last(children$2(Element.fromDom(tableElm), 'caption,colgroup')).fold(function () {
              return tableElm.insertBefore(sectionElm_1, firstTableChild_1);
            }, function (c) {
              return dom.insertAfter(sectionElm_1, c.dom());
            });
          } else {
            tableElm.appendChild(sectionElm_1);
          }
        }
        if (newSectionName === 'tbody' && oldSectionName === 'thead' && sectionElm_1.firstChild) {
          sectionElm_1.insertBefore(rowElm, sectionElm_1.firstChild);
        } else {
          sectionElm_1.appendChild(rowElm);
        }
        if (!oldSectionElm.hasChildNodes()) {
          dom.remove(oldSectionElm);
        }
      }
    };
    var switchCellType = function (dom, cells, newCellType, scope) {
      return each(cells, function (c) {
        var newCell = getNodeName(c) !== newCellType ? dom.rename(c, newCellType) : c;
        dom.setAttrib(newCell, 'scope', scope);
      });
    };
    var switchSectionType = function (editor, rowElm, newType) {
      var determineHeaderRowType = function () {
        var allTableRows = table(Element.fromDom(rowElm.cells[0])).map(function (table) {
          return rows(table);
        }).getOr([]);
        return findMap(allTableRows, function (row) {
          return detectHeaderRow(editor, row.dom());
        }).map(function (detectedType) {
          if (detectedType.thead && detectedType.ths) {
            return 'sectionCells';
          } else {
            return detectedType.thead ? 'section' : 'cells';
          }
        }).getOr('section');
      };
      var dom = editor.dom;
      if (newType === 'header') {
        var headerRowTypeSetting = getTableHeaderType(editor);
        var headerRowType = headerRowTypeSetting === 'auto' ? determineHeaderRowType() : headerRowTypeSetting;
        switchCellType(dom, rowElm.cells, headerRowType === 'section' ? 'td' : 'th', 'col');
        switchRowSection(dom, rowElm, headerRowType === 'cells' ? 'tbody' : 'thead');
      } else {
        switchCellType(dom, rowElm.cells, 'td', null);
        switchRowSection(dom, rowElm, newType === 'footer' ? 'tfoot' : 'tbody');
      }
    };

    var Selections = function (editor) {
      var get = function () {
        var body = getBody$1(editor);
        return retrieve$1(body, selectedSelector).fold(function () {
          if (editor.selection.getStart() === undefined) {
            return none$1();
          } else {
            return single(editor.selection);
          }
        }, function (cells) {
          return multiple(cells);
        });
      };
      return { get: get };
    };

    var getSelectionStartFromSelector = function (selector) {
      return function (editor) {
        return Option.from(editor.dom.getParent(editor.selection.getStart(), selector)).map(function (n) {
          return Element.fromDom(n);
        });
      };
    };
    var getSelectionStartCell = getSelectionStartFromSelector('th,td');
    var getSelectionStartCellOrCaption = getSelectionStartFromSelector('th,td,caption');
    var getCellsFromSelection = function (editor) {
      return getSelectionStartCell(editor).map(function (cell) {
        return selection(cell, Selections(editor));
      }).map(function (cells) {
        return map(cells, function (cell) {
          return cell.dom();
        });
      }).getOr([]);
    };
    var getRowsFromSelection = function (editor) {
      var cellOpt = getSelectionStartCell(editor);
      var rowsOpt = cellOpt.bind(function (cell) {
        return table(cell);
      }).map(function (table) {
        return rows(table);
      }).map(function (rows) {
        return map(rows, function (row) {
          return row.dom();
        });
      });
      return lift2(cellOpt, rowsOpt, function (cell, rows) {
        return filter(rows, function (row) {
          return exists(row.cells, function (rowCell) {
            return editor.dom.getAttrib(rowCell, selected) === '1' || rowCell === cell.dom();
          });
        });
      }).getOr([]);
    };

    var TableActions = function (editor, lazyWire) {
      var isTableBody = function (editor) {
        return name(getBody$1(editor)) === 'table';
      };
      var lastRowGuard = function (table) {
        return isTableBody(editor) === false || getGridSize(table).rows() > 1;
      };
      var lastColumnGuard = function (table) {
        return isTableBody(editor) === false || getGridSize(table).columns() > 1;
      };
      var cloneFormats = getCloneElements(editor);
      var execute = function (operation, guard, mutate, lazyWire) {
        return function (table, target) {
          removeDataStyle(table);
          var wire = lazyWire();
          var doc = Element.fromDom(editor.getDoc());
          var direction = TableDirection(directionAt);
          var generators = cellOperations(mutate, doc, cloneFormats);
          var sizing = get$8(editor, table);
          return guard(table) ? operation(wire, table, target, generators, direction, sizing).bind(function (result) {
            each(result.newRows(), function (row) {
              fireNewRow(editor, row.dom());
            });
            each(result.newCells(), function (cell) {
              fireNewCell(editor, cell.dom());
            });
            return result.cursor().map(function (cell) {
              var des = freefallRtl$2(cell);
              var rng = editor.dom.createRng();
              rng.setStart(des.element().dom(), des.offset());
              rng.setEnd(des.element().dom(), des.offset());
              return rng;
            });
          }) : Option.none();
        };
      };
      var deleteRow = execute(eraseRows, lastRowGuard, noop, lazyWire);
      var deleteColumn = execute(eraseColumns, lastColumnGuard, noop, lazyWire);
      var insertRowsBefore$1 = execute(insertRowsBefore, always, noop, lazyWire);
      var insertRowsAfter$1 = execute(insertRowsAfter, always, noop, lazyWire);
      var insertColumnsBefore$1 = execute(insertColumnsBefore, always, halve, lazyWire);
      var insertColumnsAfter$1 = execute(insertColumnsAfter, always, halve, lazyWire);
      var mergeCells$1 = execute(mergeCells, always, noop, lazyWire);
      var unmergeCells$1 = execute(unmergeCells, always, noop, lazyWire);
      var pasteColsBefore$1 = execute(pasteColsBefore, always, noop, lazyWire);
      var pasteColsAfter$1 = execute(pasteColsAfter, always, noop, lazyWire);
      var pasteRowsBefore$1 = execute(pasteRowsBefore, always, noop, lazyWire);
      var pasteRowsAfter$1 = execute(pasteRowsAfter, always, noop, lazyWire);
      var pasteCells$1 = execute(pasteCells, always, noop, lazyWire);
      var extractType = function (args, validTypes) {
        return get(args, 'type').filter(function (type) {
          return contains(validTypes, type);
        });
      };
      var setTableCellType = function (editor, args) {
        return extractType(args, [
          'td',
          'th'
        ]).each(function (type) {
          switchCellType(editor.dom, getCellsFromSelection(editor), type, null);
        });
      };
      var setTableRowType = function (editor, args) {
        return extractType(args, [
          'header',
          'body',
          'footer'
        ]).each(function (type) {
          map(getRowsFromSelection(editor), function (row) {
            return switchSectionType(editor, row, type);
          });
        });
      };
      var makeColumnHeader$1 = execute(makeColumnHeader, always, noop, lazyWire);
      var unmakeColumnHeader$1 = execute(unmakeColumnHeader, always, noop, lazyWire);
      var getTableRowType = function (editor) {
        var rows = getRowsFromSelection(editor);
        if (rows.length > 0) {
          var rowTypes = map(rows, function (r) {
            return getRowType(editor, r);
          });
          var hasHeader = contains(rowTypes, 'header');
          var hasFooter = contains(rowTypes, 'footer');
          if (!hasHeader && !hasFooter) {
            return 'body';
          } else {
            var hasBody = contains(rowTypes, 'body');
            if (hasHeader && !hasBody && !hasFooter) {
              return 'header';
            } else if (!hasHeader && !hasBody && hasFooter) {
              return 'footer';
            } else {
              return '';
            }
          }
        }
      };
      var getTableCellType = function (editor) {
        return getCellsType(getCellsFromSelection(editor), function (cell) {
          return getNodeName(cell) === 'th';
        }).getOr('');
      };
      var getTableColType = getColumnType;
      return {
        deleteRow: deleteRow,
        deleteColumn: deleteColumn,
        insertRowsBefore: insertRowsBefore$1,
        insertRowsAfter: insertRowsAfter$1,
        insertColumnsBefore: insertColumnsBefore$1,
        insertColumnsAfter: insertColumnsAfter$1,
        mergeCells: mergeCells$1,
        unmergeCells: unmergeCells$1,
        pasteColsBefore: pasteColsBefore$1,
        pasteColsAfter: pasteColsAfter$1,
        pasteRowsBefore: pasteRowsBefore$1,
        pasteRowsAfter: pasteRowsAfter$1,
        pasteCells: pasteCells$1,
        setTableCellType: setTableCellType,
        setTableRowType: setTableRowType,
        makeColumnHeader: makeColumnHeader$1,
        unmakeColumnHeader: unmakeColumnHeader$1,
        getTableRowType: getTableRowType,
        getTableCellType: getTableCellType,
        getTableColType: getTableColType
      };
    };

    var DefaultRenderOptions = {
      styles: {
        'border-collapse': 'collapse',
        'width': '100%'
      },
      attributes: { border: '1' }
    };
    var tableHeaderCell = function () {
      return Element.fromTag('th');
    };
    var tableCell = function () {
      return Element.fromTag('td');
    };
    var createRow = function (columns, rowHeaders, columnHeaders, rowIndex) {
      var tr = Element.fromTag('tr');
      for (var j = 0; j < columns; j++) {
        var td = rowIndex < rowHeaders || j < columnHeaders ? tableHeaderCell() : tableCell();
        if (j < columnHeaders) {
          set(td, 'scope', 'row');
        }
        if (rowIndex < rowHeaders) {
          set(td, 'scope', 'col');
        }
        append(td, Element.fromTag('br'));
        append(tr, td);
      }
      return tr;
    };
    var createRows = function (rows, columns, rowHeaders, columnHeaders) {
      return range(rows, function (r) {
        return createRow(columns, rowHeaders, columnHeaders, r);
      });
    };
    var render$1 = function (rows, columns, rowHeaders, columnHeaders, headerType, renderOpts) {
      if (renderOpts === void 0) {
        renderOpts = DefaultRenderOptions;
      }
      var table = Element.fromTag('table');
      var rowHeadersGoInThead = headerType !== 'cells';
      setAll$1(table, renderOpts.styles);
      setAll(table, renderOpts.attributes);
      var actualRowHeaders = Math.min(rows, rowHeaders);
      if (rowHeadersGoInThead && rowHeaders > 0) {
        var thead = Element.fromTag('thead');
        append(table, thead);
        var theadRowHeaders = headerType === 'sectionCells' ? actualRowHeaders : 0;
        var theadRows = createRows(rowHeaders, columns, theadRowHeaders, columnHeaders);
        append$1(thead, theadRows);
      }
      var tbody = Element.fromTag('tbody');
      append(table, tbody);
      var numRows = rowHeadersGoInThead ? rows - actualRowHeaders : rows;
      var numRowHeaders = rowHeadersGoInThead ? 0 : rowHeaders;
      var tbodyRows = createRows(numRows, columns, numRowHeaders, columnHeaders);
      append$1(tbody, tbodyRows);
      return table;
    };

    var get$a = function (element) {
      return element.dom().innerHTML;
    };
    var getOuter$2 = function (element) {
      var container = Element.fromTag('div');
      var clone = Element.fromDom(element.dom().cloneNode(true));
      append(container, clone);
      return get$a(container);
    };

    var placeCaretInCell = function (editor, cell) {
      editor.selection.select(cell.dom(), true);
      editor.selection.collapse(true);
    };
    var selectFirstCellInTable = function (editor, tableElm) {
      descendant$1(tableElm, 'td,th').each(curry(placeCaretInCell, editor));
    };
    var fireEvents = function (editor, table) {
      each(descendants$1(table, 'tr'), function (row) {
        fireNewRow(editor, row.dom());
        each(descendants$1(row, 'th,td'), function (cell) {
          fireNewCell(editor, cell.dom());
        });
      });
    };
    var isPercentage$1 = function (width) {
      return isString(width) && width.indexOf('%') !== -1;
    };
    var insert = function (editor, columns, rows, colHeaders, rowHeaders) {
      var defaultStyles = getDefaultStyles(editor);
      var options = {
        styles: defaultStyles,
        attributes: getDefaultAttributes(editor)
      };
      var table = render$1(rows, columns, rowHeaders, colHeaders, getTableHeaderType(editor), options);
      set(table, 'data-mce-id', '__mce');
      var html = getOuter$2(table);
      editor.insertContent(html);
      return descendant$1(getBody$1(editor), 'table[data-mce-id="__mce"]').map(function (table) {
        if (isPixelsForced(editor)) {
          enforcePixels(editor, table);
        } else if (isResponsiveForced(editor)) {
          enforceNone(table);
        } else if (isPercentagesForced(editor) || isPercentage$1(defaultStyles.width)) {
          enforcePercentage(editor, table);
        }
        removeDataStyle(table);
        remove(table, 'data-mce-id');
        fireEvents(editor, table);
        selectFirstCellInTable(editor, table);
        return table.dom();
      }).getOr(null);
    };
    var insertTableWithDataValidation = function (editor, rows, columns, options, errorMsg) {
      if (options === void 0) {
        options = {};
      }
      var checkInput = function (val) {
        return isNumber(val) && val > 0;
      };
      if (checkInput(rows) && checkInput(columns)) {
        var headerRows = options.headerRows || 0;
        var headerColumns = options.headerColumns || 0;
        return insert(editor, columns, rows, headerColumns, headerRows);
      } else {
        console.error(errorMsg);
        return null;
      }
    };

    var getClipboardElements = function (getClipboard) {
      return function () {
        return getClipboard().fold(function () {
          return [];
        }, function (elems) {
          return map(elems, function (e) {
            return e.dom();
          });
        });
      };
    };
    var setClipboardElements = function (setClipboard) {
      return function (elems) {
        var elmsOpt = elems.length > 0 ? Option.some(fromDom$1(elems)) : Option.none();
        setClipboard(elmsOpt);
      };
    };
    var getApi = function (editor, clipboard, resizeHandler, selectionTargets) {
      return {
        insertTable: function (columns, rows, options) {
          if (options === void 0) {
            options = {};
          }
          return insertTableWithDataValidation(editor, rows, columns, options, 'Invalid values for insertTable - rows and columns values are required to insert a table.');
        },
        setClipboardRows: setClipboardElements(clipboard.setRows),
        getClipboardRows: getClipboardElements(clipboard.getRows),
        setClipboardCols: setClipboardElements(clipboard.setColumns),
        getClipboardCols: getClipboardElements(clipboard.getColumns),
        resizeHandler: resizeHandler,
        selectionTargets: selectionTargets
      };
    };

    var constrainSpan = function (element, property, value) {
      var currentColspan = getSpan(element, property);
      if (value === 1 || currentColspan <= 1) {
        remove(element, property);
      } else {
        set(element, property, Math.min(value, currentColspan));
      }
    };
    var copyCols = function (table, target) {
      var house = Warehouse.fromTable(table);
      var details = onCells(house, target);
      return details.map(function (selectedCells) {
        var lastSelectedCell = selectedCells[selectedCells.length - 1];
        var minColRange = selectedCells[0].column();
        var maxColRange = lastSelectedCell.column() + lastSelectedCell.colspan();
        return map(house.all, function (row) {
          var cellsToCopy = filter(row.cells(), function (cell) {
            return cell.column() >= minColRange && cell.column() < maxColRange;
          });
          var copiedCells = map(cellsToCopy, function (cell) {
            var clonedCell = deep(cell.element());
            constrainSpan(clonedCell, 'colspan', maxColRange - minColRange);
            return clonedCell;
          });
          var fakeTR = Element.fromTag('tr');
          append$1(fakeTR, copiedCells);
          return fakeTR;
        });
      });
    };

    var copyRows = function (table, target, generators) {
      var house = Warehouse.fromTable(table);
      var details = onCells(house, target);
      return details.map(function (selectedCells) {
        var grid = toGrid(house, generators, false);
        var slicedGrid = grid.slice(selectedCells[0].row(), selectedCells[selectedCells.length - 1].row() + selectedCells[selectedCells.length - 1].rowspan());
        var slicedDetails = toDetailList(slicedGrid, generators);
        return copy$2(slicedDetails);
      });
    };

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var getTDTHOverallStyle = function (dom, elm, name) {
      var cells = dom.select('td,th', elm);
      var firstChildStyle;
      var checkChildren = function (firstChildStyle, elms) {
        for (var i = 0; i < elms.length; i++) {
          var currentStyle = dom.getStyle(elms[i], name);
          if (typeof firstChildStyle === 'undefined') {
            firstChildStyle = currentStyle;
          }
          if (firstChildStyle !== currentStyle) {
            return '';
          }
        }
        return firstChildStyle;
      };
      return checkChildren(firstChildStyle, cells);
    };
    var applyAlign = function (editor, elm, name) {
      if (name) {
        editor.formatter.apply('align' + name, {}, elm);
      }
    };
    var applyVAlign = function (editor, elm, name) {
      if (name) {
        editor.formatter.apply('valign' + name, {}, elm);
      }
    };
    var unApplyAlign = function (editor, elm) {
      global$1.each('left center right'.split(' '), function (name) {
        editor.formatter.remove('align' + name, {}, elm);
      });
    };
    var unApplyVAlign = function (editor, elm) {
      global$1.each('top middle bottom'.split(' '), function (name) {
        editor.formatter.remove('valign' + name, {}, elm);
      });
    };

    var buildListItems = function (inputList, startItems) {
      var appendItems = function (values, acc) {
        return acc.concat(map(values, function (item) {
          return {
            text: item.text || item.title,
            value: item.value
          };
        }));
      };
      return appendItems(inputList, startItems || []);
    };
    var rgbToHex = function (dom) {
      return function (value) {
        return startsWith(value, 'rgb') ? dom.toHex(value) : value;
      };
    };
    var extractAdvancedStyles = function (dom, elm) {
      var element = Element.fromDom(elm);
      return {
        borderwidth: getRaw(element, 'border-width').getOr(''),
        borderstyle: getRaw(element, 'border-style').getOr(''),
        bordercolor: getRaw(element, 'border-color').map(rgbToHex(dom)).getOr(''),
        backgroundcolor: getRaw(element, 'background-color').map(rgbToHex(dom)).getOr('')
      };
    };
    var getSharedValues = function (data) {
      var baseData = data[0];
      var comparisonData = data.slice(1);
      each(comparisonData, function (items) {
        each(keys(baseData), function (key) {
          each$1(items, function (itemValue, itemKey) {
            var comparisonValue = baseData[key];
            if (comparisonValue !== '' && key === itemKey) {
              if (comparisonValue !== itemValue) {
                baseData[key] = '';
              }
            }
          });
        });
      });
      return baseData;
    };
    var getAdvancedTab = function (dialogName) {
      var advTabItems = [
        {
          name: 'borderstyle',
          type: 'selectbox',
          label: 'Border style',
          items: [
            {
              text: 'Select...',
              value: ''
            },
            {
              text: 'Solid',
              value: 'solid'
            },
            {
              text: 'Dotted',
              value: 'dotted'
            },
            {
              text: 'Dashed',
              value: 'dashed'
            },
            {
              text: 'Double',
              value: 'double'
            },
            {
              text: 'Groove',
              value: 'groove'
            },
            {
              text: 'Ridge',
              value: 'ridge'
            },
            {
              text: 'Inset',
              value: 'inset'
            },
            {
              text: 'Outset',
              value: 'outset'
            },
            {
              text: 'None',
              value: 'none'
            },
            {
              text: 'Hidden',
              value: 'hidden'
            }
          ]
        },
        {
          name: 'bordercolor',
          type: 'colorinput',
          label: 'Border color'
        },
        {
          name: 'backgroundcolor',
          type: 'colorinput',
          label: 'Background color'
        }
      ];
      var borderWidth = {
        name: 'borderwidth',
        type: 'input',
        label: 'Border width'
      };
      var items = dialogName === 'cell' ? [borderWidth].concat(advTabItems) : advTabItems;
      return {
        title: 'Advanced',
        name: 'advanced',
        items: items
      };
    };
    var getAlignment = function (formats, formatName, editor, elm) {
      return find(formats, function (name) {
        return editor.formatter.matchNode(elm, formatName + name);
      }).getOr('');
    };
    var getHAlignment = curry(getAlignment, [
      'left',
      'center',
      'right'
    ], 'align');
    var getVAlignment = curry(getAlignment, [
      'top',
      'middle',
      'bottom'
    ], 'valign');
    var extractDataFromSettings = function (editor, hasAdvTableTab) {
      var style = getDefaultStyles(editor);
      var attrs = getDefaultAttributes(editor);
      var extractAdvancedStyleData = function (dom) {
        return {
          borderstyle: get(style, 'border-style').getOr(''),
          bordercolor: rgbToHex(dom)(get(style, 'border-color').getOr('')),
          backgroundcolor: rgbToHex(dom)(get(style, 'background-color').getOr(''))
        };
      };
      var defaultData = {
        height: '',
        width: '100%',
        cellspacing: '',
        cellpadding: '',
        caption: false,
        class: '',
        align: '',
        border: ''
      };
      var getBorder = function () {
        var borderWidth = style['border-width'];
        if (shouldStyleWithCss(editor) && borderWidth) {
          return { border: borderWidth };
        }
        return get(attrs, 'border').fold(function () {
          return {};
        }, function (border) {
          return { border: border };
        });
      };
      var advStyle = hasAdvTableTab ? extractAdvancedStyleData(editor.dom) : {};
      var getCellPaddingCellSpacing = function () {
        var spacing = get(style, 'border-spacing').or(get(attrs, 'cellspacing')).fold(function () {
          return {};
        }, function (cellspacing) {
          return { cellspacing: cellspacing };
        });
        var padding = get(style, 'border-padding').or(get(attrs, 'cellpadding')).fold(function () {
          return {};
        }, function (cellpadding) {
          return { cellpadding: cellpadding };
        });
        return __assign(__assign({}, spacing), padding);
      };
      var data = __assign(__assign(__assign(__assign(__assign(__assign({}, defaultData), style), attrs), advStyle), getBorder()), getCellPaddingCellSpacing());
      return data;
    };
    var extractDataFromTableElement = function (editor, elm, hasAdvTableTab) {
      var getBorder = function (dom, elm) {
        var optBorderWidth = getRaw(Element.fromDom(elm), 'border-width');
        if (shouldStyleWithCss(editor) && optBorderWidth.isSome()) {
          return optBorderWidth.getOr('');
        }
        return dom.getAttrib(elm, 'border') || getTDTHOverallStyle(editor.dom, elm, 'border-width') || getTDTHOverallStyle(editor.dom, elm, 'border');
      };
      var dom = editor.dom;
      return __assign({
        width: dom.getStyle(elm, 'width') || dom.getAttrib(elm, 'width'),
        height: dom.getStyle(elm, 'height') || dom.getAttrib(elm, 'height'),
        cellspacing: dom.getStyle(elm, 'border-spacing') || dom.getAttrib(elm, 'cellspacing'),
        cellpadding: dom.getAttrib(elm, 'cellpadding') || getTDTHOverallStyle(editor.dom, elm, 'padding'),
        border: getBorder(dom, elm),
        caption: !!dom.select('caption', elm)[0],
        class: dom.getAttrib(elm, 'class', ''),
        align: getHAlignment(editor, elm)
      }, hasAdvTableTab ? extractAdvancedStyles(dom, elm) : {});
    };
    var extractDataFromRowElement = function (editor, elm, hasAdvancedRowTab) {
      var dom = editor.dom;
      return __assign({
        height: dom.getStyle(elm, 'height') || dom.getAttrib(elm, 'height'),
        scope: dom.getAttrib(elm, 'scope'),
        class: dom.getAttrib(elm, 'class', ''),
        type: getRowType(editor, elm),
        align: getHAlignment(editor, elm)
      }, hasAdvancedRowTab ? extractAdvancedStyles(dom, elm) : {});
    };
    var extractDataFromCellElement = function (editor, elm, hasAdvancedCellTab) {
      var dom = editor.dom;
      return __assign({
        width: dom.getStyle(elm, 'width') || dom.getAttrib(elm, 'width'),
        height: dom.getStyle(elm, 'height') || dom.getAttrib(elm, 'height'),
        scope: dom.getAttrib(elm, 'scope'),
        celltype: getNodeName(elm),
        class: dom.getAttrib(elm, 'class', ''),
        halign: getHAlignment(editor, elm),
        valign: getVAlignment(editor, elm)
      }, hasAdvancedCellTab ? extractAdvancedStyles(dom, elm) : {});
    };

    var getClassList = function (editor) {
      var classes = buildListItems(getCellClassList(editor));
      if (classes.length > 0) {
        return Option.some({
          name: 'class',
          type: 'selectbox',
          label: 'Class',
          items: classes
        });
      }
      return Option.none();
    };
    var children$3 = [
      {
        name: 'width',
        type: 'input',
        label: 'Width'
      },
      {
        name: 'height',
        type: 'input',
        label: 'Height'
      },
      {
        name: 'celltype',
        type: 'selectbox',
        label: 'Cell type',
        items: [
          {
            text: 'Cell',
            value: 'td'
          },
          {
            text: 'Header cell',
            value: 'th'
          }
        ]
      },
      {
        name: 'scope',
        type: 'selectbox',
        label: 'Scope',
        items: [
          {
            text: 'None',
            value: ''
          },
          {
            text: 'Row',
            value: 'row'
          },
          {
            text: 'Column',
            value: 'col'
          },
          {
            text: 'Row group',
            value: 'rowgroup'
          },
          {
            text: 'Column group',
            value: 'colgroup'
          }
        ]
      },
      {
        name: 'halign',
        type: 'selectbox',
        label: 'H Align',
        items: [
          {
            text: 'None',
            value: ''
          },
          {
            text: 'Left',
            value: 'left'
          },
          {
            text: 'Center',
            value: 'center'
          },
          {
            text: 'Right',
            value: 'right'
          }
        ]
      },
      {
        name: 'valign',
        type: 'selectbox',
        label: 'V Align',
        items: [
          {
            text: 'None',
            value: ''
          },
          {
            text: 'Top',
            value: 'top'
          },
          {
            text: 'Middle',
            value: 'middle'
          },
          {
            text: 'Bottom',
            value: 'bottom'
          }
        ]
      }
    ];
    var getItems = function (editor) {
      return getClassList(editor).fold(function () {
        return children$3;
      }, function (classlist) {
        return children$3.concat(classlist);
      });
    };

    var modifiers = function (testTruthy) {
      return function (editor, node) {
        var dom = editor.dom;
        var setAttrib = function (attr, value) {
          if (!testTruthy || value) {
            dom.setAttrib(node, attr, value);
          }
        };
        var setStyle = function (prop, value) {
          if (!testTruthy || value) {
            dom.setStyle(node, prop, value);
          }
        };
        var setFormat = function (formatName, value) {
          if (!testTruthy || value) {
            if (value === '') {
              editor.formatter.remove(formatName, { value: null }, node, true);
            } else {
              editor.formatter.apply(formatName, { value: value }, node);
            }
          }
        };
        return {
          setAttrib: setAttrib,
          setStyle: setStyle,
          setFormat: setFormat
        };
      };
    };
    var DomModifier = {
      normal: modifiers(false),
      ifTruthy: modifiers(true)
    };

    var updateSimpleProps = function (modifier, data) {
      modifier.setAttrib('scope', data.scope);
      modifier.setAttrib('class', data.class);
      modifier.setStyle('width', addPxSuffix(data.width));
      modifier.setStyle('height', addPxSuffix(data.height));
    };
    var updateAdvancedProps = function (modifier, data) {
      modifier.setFormat('tablecellbackgroundcolor', data.backgroundcolor);
      modifier.setFormat('tablecellbordercolor', data.bordercolor);
      modifier.setFormat('tablecellborderstyle', data.borderstyle);
      modifier.setFormat('tablecellborderwidth', addPxSuffix(data.borderwidth));
    };
    var applyCellData = function (editor, cells, data) {
      var dom = editor.dom;
      var isSingleCell = cells.length === 1;
      each(cells, function (cell) {
        var cellElm = data.celltype && getNodeName(cell) !== data.celltype ? dom.rename(cell, data.celltype) : cell;
        var modifier = isSingleCell ? DomModifier.normal(editor, cellElm) : DomModifier.ifTruthy(editor, cellElm);
        updateSimpleProps(modifier, data);
        if (hasAdvancedCellTab(editor)) {
          updateAdvancedProps(modifier, data);
        }
        if (isSingleCell) {
          unApplyAlign(editor, cellElm);
          unApplyVAlign(editor, cellElm);
        }
        if (data.halign) {
          applyAlign(editor, cellElm, data.halign);
        }
        if (data.valign) {
          applyVAlign(editor, cellElm, data.valign);
        }
      });
    };
    var onSubmitCellForm = function (editor, cells, api) {
      var data = api.getData();
      api.close();
      editor.undoManager.transact(function () {
        applyCellData(editor, cells, data);
        editor.focus();
      });
    };
    var open = function (editor) {
      var cells = getCellsFromSelection(editor);
      if (cells.length === 0) {
        return;
      }
      var cellsData = map(cells, function (cellElm) {
        return extractDataFromCellElement(editor, cellElm, hasAdvancedCellTab(editor));
      });
      var data = getSharedValues(cellsData);
      var dialogTabPanel = {
        type: 'tabpanel',
        tabs: [
          {
            title: 'General',
            name: 'general',
            items: getItems(editor)
          },
          getAdvancedTab('cell')
        ]
      };
      var dialogPanel = {
        type: 'panel',
        items: [{
            type: 'grid',
            columns: 2,
            items: getItems(editor)
          }]
      };
      editor.windowManager.open({
        title: 'Cell Properties',
        size: 'normal',
        body: hasAdvancedCellTab(editor) ? dialogTabPanel : dialogPanel,
        buttons: [
          {
            type: 'cancel',
            name: 'cancel',
            text: 'Cancel'
          },
          {
            type: 'submit',
            name: 'save',
            text: 'Save',
            primary: true
          }
        ],
        initialData: data,
        onSubmit: curry(onSubmitCellForm, editor, cells)
      });
    };

    var getClassList$1 = function (editor) {
      var classes = buildListItems(getRowClassList(editor));
      if (classes.length > 0) {
        return Option.some({
          name: 'class',
          type: 'selectbox',
          label: 'Class',
          items: classes
        });
      }
      return Option.none();
    };
    var formChildren = [
      {
        type: 'selectbox',
        name: 'type',
        label: 'Row type',
        items: [
          {
            text: 'Header',
            value: 'header'
          },
          {
            text: 'Body',
            value: 'body'
          },
          {
            text: 'Footer',
            value: 'footer'
          }
        ]
      },
      {
        type: 'selectbox',
        name: 'align',
        label: 'Alignment',
        items: [
          {
            text: 'None',
            value: ''
          },
          {
            text: 'Left',
            value: 'left'
          },
          {
            text: 'Center',
            value: 'center'
          },
          {
            text: 'Right',
            value: 'right'
          }
        ]
      },
      {
        label: 'Height',
        name: 'height',
        type: 'input'
      }
    ];
    var getItems$1 = function (editor) {
      return getClassList$1(editor).fold(function () {
        return formChildren;
      }, function (classes) {
        return formChildren.concat(classes);
      });
    };

    var updateSimpleProps$1 = function (modifier, data) {
      modifier.setAttrib('scope', data.scope);
      modifier.setAttrib('class', data.class);
      modifier.setStyle('height', addPxSuffix(data.height));
    };
    var updateAdvancedProps$1 = function (modifier, data) {
      modifier.setStyle('background-color', data.backgroundcolor);
      modifier.setStyle('border-color', data.bordercolor);
      modifier.setStyle('border-style', data.borderstyle);
    };
    var applyRowData = function (editor, rows, oldData, data) {
      var isSingleRow = rows.length === 1;
      each(rows, function (rowElm) {
        if (data.type !== getNodeName(rowElm.parentNode)) {
          switchSectionType(editor, rowElm, data.type);
        }
        var modifier = isSingleRow ? DomModifier.normal(editor, rowElm) : DomModifier.ifTruthy(editor, rowElm);
        updateSimpleProps$1(modifier, data);
        if (hasAdvancedRowTab(editor)) {
          updateAdvancedProps$1(modifier, data);
        }
        if (data.align !== oldData.align) {
          unApplyAlign(editor, rowElm);
          applyAlign(editor, rowElm, data.align);
        }
      });
    };
    var onSubmitRowForm = function (editor, rows, oldData, api) {
      var data = api.getData();
      api.close();
      editor.undoManager.transact(function () {
        applyRowData(editor, rows, oldData, data);
        editor.focus();
      });
    };
    var open$1 = function (editor) {
      var rows = getRowsFromSelection(editor);
      if (rows.length === 0) {
        return;
      }
      var rowsData = map(rows, function (rowElm) {
        return extractDataFromRowElement(editor, rowElm, hasAdvancedRowTab(editor));
      });
      var data = getSharedValues(rowsData);
      var dialogTabPanel = {
        type: 'tabpanel',
        tabs: [
          {
            title: 'General',
            name: 'general',
            items: getItems$1(editor)
          },
          getAdvancedTab('row')
        ]
      };
      var dialogPanel = {
        type: 'panel',
        items: [{
            type: 'grid',
            columns: 2,
            items: getItems$1(editor)
          }]
      };
      editor.windowManager.open({
        title: 'Row Properties',
        size: 'normal',
        body: hasAdvancedRowTab(editor) ? dialogTabPanel : dialogPanel,
        buttons: [
          {
            type: 'cancel',
            name: 'cancel',
            text: 'Cancel'
          },
          {
            type: 'submit',
            name: 'save',
            text: 'Save',
            primary: true
          }
        ],
        initialData: data,
        onSubmit: curry(onSubmitRowForm, editor, rows, data)
      });
    };

    var global$2 = tinymce.util.Tools.resolve('tinymce.Env');

    var getItems$2 = function (editor, classes, insertNewTable) {
      var rowColCountItems = !insertNewTable ? [] : [
        {
          type: 'input',
          name: 'cols',
          label: 'Cols',
          inputMode: 'numeric'
        },
        {
          type: 'input',
          name: 'rows',
          label: 'Rows',
          inputMode: 'numeric'
        }
      ];
      var alwaysItems = [
        {
          type: 'input',
          name: 'width',
          label: 'Width'
        },
        {
          type: 'input',
          name: 'height',
          label: 'Height'
        }
      ];
      var appearanceItems = hasAppearanceOptions(editor) ? [
        {
          type: 'input',
          name: 'cellspacing',
          label: 'Cell spacing',
          inputMode: 'numeric'
        },
        {
          type: 'input',
          name: 'cellpadding',
          label: 'Cell padding',
          inputMode: 'numeric'
        },
        {
          type: 'input',
          name: 'border',
          label: 'Border width'
        },
        {
          type: 'label',
          label: 'Caption',
          items: [{
              type: 'checkbox',
              name: 'caption',
              label: 'Show caption'
            }]
        }
      ] : [];
      var alignmentItem = [{
          type: 'selectbox',
          name: 'align',
          label: 'Alignment',
          items: [
            {
              text: 'None',
              value: ''
            },
            {
              text: 'Left',
              value: 'left'
            },
            {
              text: 'Center',
              value: 'center'
            },
            {
              text: 'Right',
              value: 'right'
            }
          ]
        }];
      var classListItem = classes.length > 0 ? [{
          type: 'selectbox',
          name: 'class',
          label: 'Class',
          items: classes
        }] : [];
      return rowColCountItems.concat(alwaysItems).concat(appearanceItems).concat(alignmentItem).concat(classListItem);
    };

    var styleTDTH = function (dom, elm, name, value) {
      if (elm.tagName === 'TD' || elm.tagName === 'TH') {
        if (isString(name)) {
          dom.setStyle(elm, name, value);
        } else {
          dom.setStyle(elm, name);
        }
      } else {
        if (elm.children) {
          for (var i = 0; i < elm.children.length; i++) {
            styleTDTH(dom, elm.children[i], name, value);
          }
        }
      }
    };
    var applyDataToElement = function (editor, tableElm, data) {
      var dom = editor.dom;
      var attrs = {};
      var styles = {};
      attrs.class = data.class;
      styles.height = addPxSuffix(data.height);
      if (dom.getAttrib(tableElm, 'width') && !shouldStyleWithCss(editor)) {
        attrs.width = removePxSuffix(data.width);
      } else {
        styles.width = addPxSuffix(data.width);
      }
      if (shouldStyleWithCss(editor)) {
        styles['border-width'] = addPxSuffix(data.border);
        styles['border-spacing'] = addPxSuffix(data.cellspacing);
      } else {
        attrs.border = data.border;
        attrs.cellpadding = data.cellpadding;
        attrs.cellspacing = data.cellspacing;
      }
      if (shouldStyleWithCss(editor) && tableElm.children) {
        for (var i = 0; i < tableElm.children.length; i++) {
          styleTDTH(dom, tableElm.children[i], {
            'border-width': addPxSuffix(data.border),
            'padding': addPxSuffix(data.cellpadding)
          });
          if (hasAdvancedTableTab(editor)) {
            styleTDTH(dom, tableElm.children[i], { 'border-color': data.bordercolor });
          }
        }
      }
      if (hasAdvancedTableTab(editor)) {
        styles['background-color'] = data.backgroundcolor;
        styles['border-color'] = data.bordercolor;
        styles['border-style'] = data.borderstyle;
      }
      attrs.style = dom.serializeStyle(__assign(__assign({}, getDefaultStyles(editor)), styles));
      dom.setAttribs(tableElm, __assign(__assign({}, getDefaultAttributes(editor)), attrs));
    };
    var onSubmitTableForm = function (editor, tableElm, api) {
      var dom = editor.dom;
      var captionElm;
      var data = api.getData();
      api.close();
      if (data.class === '') {
        delete data.class;
      }
      editor.undoManager.transact(function () {
        if (!tableElm) {
          var cols = parseInt(data.cols, 10) || 1;
          var rows = parseInt(data.rows, 10) || 1;
          tableElm = insert(editor, cols, rows, 0, 0);
        }
        applyDataToElement(editor, tableElm, data);
        captionElm = dom.select('caption', tableElm)[0];
        if (captionElm && !data.caption) {
          dom.remove(captionElm);
        }
        if (!captionElm && data.caption) {
          captionElm = dom.create('caption');
          captionElm.innerHTML = !global$2.ie ? '<br data-mce-bogus="1"/>' : nbsp;
          tableElm.insertBefore(captionElm, tableElm.firstChild);
        }
        if (data.align === '') {
          unApplyAlign(editor, tableElm);
        } else {
          applyAlign(editor, tableElm, data.align);
        }
        editor.focus();
        editor.addVisual();
      });
    };
    var open$2 = function (editor, insertNewTable) {
      var dom = editor.dom;
      var tableElm;
      var data = extractDataFromSettings(editor, hasAdvancedTableTab(editor));
      if (insertNewTable === false) {
        tableElm = dom.getParent(editor.selection.getStart(), 'table');
        if (tableElm) {
          data = extractDataFromTableElement(editor, tableElm, hasAdvancedTableTab(editor));
        } else {
          if (hasAdvancedTableTab(editor)) {
            data.borderstyle = '';
            data.bordercolor = '';
            data.backgroundcolor = '';
          }
        }
      } else {
        data.cols = '1';
        data.rows = '1';
        if (hasAdvancedTableTab(editor)) {
          data.borderstyle = '';
          data.bordercolor = '';
          data.backgroundcolor = '';
        }
      }
      var classes = buildListItems(getTableClassList(editor));
      if (classes.length > 0) {
        if (data.class) {
          data.class = data.class.replace(/\s*mce\-item\-table\s*/g, '');
        }
      }
      var generalPanel = {
        type: 'grid',
        columns: 2,
        items: getItems$2(editor, classes, insertNewTable)
      };
      var nonAdvancedForm = function () {
        return {
          type: 'panel',
          items: [generalPanel]
        };
      };
      var advancedForm = function () {
        return {
          type: 'tabpanel',
          tabs: [
            {
              title: 'General',
              name: 'general',
              items: [generalPanel]
            },
            getAdvancedTab('table')
          ]
        };
      };
      var dialogBody = hasAdvancedTableTab(editor) ? advancedForm() : nonAdvancedForm();
      editor.windowManager.open({
        title: 'Table Properties',
        size: 'normal',
        body: dialogBody,
        onSubmit: curry(onSubmitTableForm, editor, tableElm),
        buttons: [
          {
            type: 'cancel',
            name: 'cancel',
            text: 'Cancel'
          },
          {
            type: 'submit',
            name: 'save',
            text: 'Save',
            primary: true
          }
        ],
        initialData: data
      });
    };

    var registerCommands = function (editor, actions, cellSelection, selections, clipboard) {
      var isRoot = getIsRoot(editor);
      var eraseTable = function () {
        return getSelectionStartCellOrCaption(editor).each(function (cellOrCaption) {
          table(cellOrCaption, isRoot).filter(not(isRoot)).each(function (table) {
            var cursor = Element.fromText('');
            after(table, cursor);
            remove$2(table);
            if (editor.dom.isEmpty(editor.getBody())) {
              editor.setContent('');
              editor.selection.setCursorLocation();
            } else {
              var rng = editor.dom.createRng();
              rng.setStart(cursor.dom(), 0);
              rng.setEnd(cursor.dom(), 0);
              editor.selection.setRng(rng);
              editor.nodeChanged();
            }
          });
        });
      };
      var setSizingMode = function (sizing) {
        return getSelectionStartCellOrCaption(editor).each(function (cellOrCaption) {
          var isForcedSizing = isResponsiveForced(editor) || isPixelsForced(editor) || isPercentagesForced(editor);
          if (!isForcedSizing) {
            table(cellOrCaption, isRoot).each(function (table) {
              if (sizing === 'relative' && !isPercentSizing$1(table)) {
                enforcePercentage(editor, table);
              } else if (sizing === 'fixed' && !isPixelSizing$1(table)) {
                enforcePixels(editor, table);
              } else if (sizing === 'responsive' && !isNoneSizing$1(table)) {
                enforceNone(table);
              }
              removeDataStyle(table);
            });
          }
        });
      };
      var getTableFromCell = function (cell) {
        return table(cell, isRoot);
      };
      var actOnSelection = function (execute) {
        return getSelectionStartCell(editor).each(function (cell) {
          getTableFromCell(cell).each(function (table) {
            var targets = forMenu(selections, table, cell);
            execute(table, targets).each(function (rng) {
              editor.selection.setRng(rng);
              editor.focus();
              cellSelection.clear(table);
              removeDataStyle(table);
            });
          });
        });
      };
      var copyRowSelection = function () {
        return getSelectionStartCell(editor).map(function (cell) {
          return getTableFromCell(cell).bind(function (table) {
            var targets = forMenu(selections, table, cell);
            var generators = cellOperations(noop, Element.fromDom(editor.getDoc()), Option.none());
            return copyRows(table, targets, generators);
          });
        });
      };
      var copyColSelection = function () {
        return getSelectionStartCell(editor).map(function (cell) {
          return getTableFromCell(cell).bind(function (table) {
            var targets = forMenu(selections, table, cell);
            return copyCols(table, targets);
          });
        });
      };
      var pasteOnSelection = function (execute, getRows) {
        return getRows().each(function (rows) {
          var clonedRows = map(rows, function (row) {
            return deep(row);
          });
          getSelectionStartCell(editor).each(function (cell) {
            return getTableFromCell(cell).each(function (table) {
              var generators = paste(Element.fromDom(editor.getDoc()));
              var targets = pasteRows(selections, cell, clonedRows, generators);
              execute(table, targets).each(function (rng) {
                editor.selection.setRng(rng);
                editor.focus();
                cellSelection.clear(table);
              });
            });
          });
        });
      };
      each$1({
        mceTableSplitCells: function () {
          return actOnSelection(actions.unmergeCells);
        },
        mceTableMergeCells: function () {
          return actOnSelection(actions.mergeCells);
        },
        mceTableInsertRowBefore: function () {
          return actOnSelection(actions.insertRowsBefore);
        },
        mceTableInsertRowAfter: function () {
          return actOnSelection(actions.insertRowsAfter);
        },
        mceTableInsertColBefore: function () {
          return actOnSelection(actions.insertColumnsBefore);
        },
        mceTableInsertColAfter: function () {
          return actOnSelection(actions.insertColumnsAfter);
        },
        mceTableDeleteCol: function () {
          return actOnSelection(actions.deleteColumn);
        },
        mceTableDeleteRow: function () {
          return actOnSelection(actions.deleteRow);
        },
        mceTableCutCol: function (_grid) {
          return copyColSelection().each(function (selection) {
            clipboard.setColumns(selection);
            actOnSelection(actions.deleteColumn);
          });
        },
        mceTableCutRow: function (_grid) {
          return copyRowSelection().each(function (selection) {
            clipboard.setRows(selection);
            actOnSelection(actions.deleteRow);
          });
        },
        mceTableCopyCol: function (_grid) {
          return copyColSelection().each(function (selection) {
            return clipboard.setColumns(selection);
          });
        },
        mceTableCopyRow: function (_grid) {
          return copyRowSelection().each(function (selection) {
            return clipboard.setRows(selection);
          });
        },
        mceTablePasteColBefore: function (_grid) {
          return pasteOnSelection(actions.pasteColsBefore, clipboard.getColumns);
        },
        mceTablePasteColAfter: function (_grid) {
          return pasteOnSelection(actions.pasteColsAfter, clipboard.getColumns);
        },
        mceTablePasteRowBefore: function (_grid) {
          return pasteOnSelection(actions.pasteRowsBefore, clipboard.getRows);
        },
        mceTablePasteRowAfter: function (_grid) {
          return pasteOnSelection(actions.pasteRowsAfter, clipboard.getRows);
        },
        mceTableDelete: eraseTable,
        mceTableSizingMode: function (ui, sizing) {
          return setSizingMode(sizing);
        }
      }, function (func, name) {
        return editor.addCommand(name, func);
      });
      each$1({
        mceTableCellType: function (_ui, args) {
          return actions.setTableCellType(editor, args);
        },
        mceTableRowType: function (_ui, args) {
          return actions.setTableRowType(editor, args);
        }
      }, function (func, name) {
        return editor.addCommand(name, func);
      });
      editor.addCommand('mceTableColType', function (_ui, args) {
        return get(args, 'type').each(function (type) {
          return actOnSelection(type === 'th' ? actions.makeColumnHeader : actions.unmakeColumnHeader);
        });
      });
      each$1({
        mceTableProps: curry(open$2, editor, false),
        mceTableRowProps: curry(open$1, editor),
        mceTableCellProps: curry(open, editor)
      }, function (func, name) {
        return editor.addCommand(name, function () {
          return func();
        });
      });
      editor.addCommand('mceInsertTable', function (_ui, args) {
        if (isObject(args) && keys(args).length > 0) {
          insertTableWithDataValidation(editor, args.rows, args.columns, args.options, 'Invalid values for mceInsertTable - rows and columns values are required to insert a table.');
        } else {
          open$2(editor, true);
        }
      });
      editor.addCommand('mceTableApplyCellStyle', function (_ui, args) {
        if (!isObject(args)) {
          return;
        }
        var cells = getCellsFromSelection(editor);
        if (cells.length === 0) {
          return;
        }
        each$1(args, function (value, style) {
          var formatName = 'tablecell' + style.toLowerCase().replace('-', '');
          if (editor.formatter.has(formatName) && isString(value)) {
            each(cells, function (cell) {
              DomModifier.normal(editor, cell).setFormat(formatName, value);
            });
          }
        });
      });
    };

    var registerQueryCommands = function (editor, actions, selections) {
      var isRoot = getIsRoot(editor);
      var getTableFromCell = function (cell) {
        return table(cell, isRoot);
      };
      each$1({
        mceTableRowType: function () {
          return actions.getTableRowType(editor);
        },
        mceTableCellType: function () {
          return actions.getTableCellType(editor);
        },
        mceTableColType: function () {
          return getSelectionStartCell(editor).bind(function (cell) {
            return getTableFromCell(cell).map(function (table) {
              var targets = forMenu(selections, table, cell);
              return actions.getTableColType(table, targets);
            });
          }).getOr('');
        }
      }, function (func, name) {
        return editor.addQueryValueHandler(name, func);
      });
    };

    var Clipboard = function () {
      var rows = Cell(Option.none());
      var cols = Cell(Option.none());
      var clearClipboard = function (clipboard) {
        clipboard.set(Option.none());
      };
      return {
        getRows: rows.get,
        setRows: function (r) {
          rows.set(r);
          clearClipboard(cols);
        },
        clearRows: function () {
          return clearClipboard(rows);
        },
        getColumns: cols.get,
        setColumns: function (c) {
          cols.set(c);
          clearClipboard(rows);
        },
        clearColumns: function () {
          return clearClipboard(cols);
        }
      };
    };

    var adt$2 = Adt.generate([
      { none: ['current'] },
      { first: ['current'] },
      {
        middle: [
          'current',
          'target'
        ]
      },
      { last: ['current'] }
    ]);
    var none$2 = function (current) {
      if (current === void 0) {
        current = undefined;
      }
      return adt$2.none(current);
    };
    var CellLocation = __assign(__assign({}, adt$2), { none: none$2 });

    var detect$4 = function (current, isRoot) {
      return table(current, isRoot).bind(function (table) {
        var all = cells(table);
        var index = findIndex(all, function (x) {
          return eq(current, x);
        });
        return index.map(function (index) {
          return {
            index: index,
            all: all
          };
        });
      });
    };
    var next = function (current, isRoot) {
      var detection = detect$4(current, isRoot);
      return detection.fold(function () {
        return CellLocation.none(current);
      }, function (info) {
        return info.index + 1 < info.all.length ? CellLocation.middle(current, info.all[info.index + 1]) : CellLocation.last(current);
      });
    };
    var prev = function (current, isRoot) {
      var detection = detect$4(current, isRoot);
      return detection.fold(function () {
        return CellLocation.none();
      }, function (info) {
        return info.index - 1 >= 0 ? CellLocation.middle(current, info.all[info.index - 1]) : CellLocation.first(current);
      });
    };

    var create$2 = function (start, soffset, finish, foffset) {
      return {
        start: constant(start),
        soffset: constant(soffset),
        finish: constant(finish),
        foffset: constant(foffset)
      };
    };
    var SimRange = { create: create$2 };

    var adt$3 = Adt.generate([
      { before: ['element'] },
      {
        on: [
          'element',
          'offset'
        ]
      },
      { after: ['element'] }
    ]);
    var cata$1 = function (subject, onBefore, onOn, onAfter) {
      return subject.fold(onBefore, onOn, onAfter);
    };
    var getStart = function (situ) {
      return situ.fold(identity, identity, identity);
    };
    var before$2 = adt$3.before;
    var on = adt$3.on;
    var after$2 = adt$3.after;
    var Situ = {
      before: before$2,
      on: on,
      after: after$2,
      cata: cata$1,
      getStart: getStart
    };

    var adt$4 = Adt.generate([
      { domRange: ['rng'] },
      {
        relative: [
          'startSitu',
          'finishSitu'
        ]
      },
      {
        exact: [
          'start',
          'soffset',
          'finish',
          'foffset'
        ]
      }
    ]);
    var exactFromRange = function (simRange) {
      return adt$4.exact(simRange.start(), simRange.soffset(), simRange.finish(), simRange.foffset());
    };
    var getStart$1 = function (selection) {
      return selection.match({
        domRange: function (rng) {
          return Element.fromDom(rng.startContainer);
        },
        relative: function (startSitu, _finishSitu) {
          return Situ.getStart(startSitu);
        },
        exact: function (start, _soffset, _finish, _foffset) {
          return start;
        }
      });
    };
    var domRange = adt$4.domRange;
    var relative = adt$4.relative;
    var exact = adt$4.exact;
    var getWin = function (selection) {
      var start = getStart$1(selection);
      return defaultView(start);
    };
    var range$1 = SimRange.create;
    var Selection = {
      domRange: domRange,
      relative: relative,
      exact: exact,
      exactFromRange: exactFromRange,
      getWin: getWin,
      range: range$1
    };

    var selectNodeContents = function (win, element) {
      var rng = win.document.createRange();
      selectNodeContentsUsing(rng, element);
      return rng;
    };
    var selectNodeContentsUsing = function (rng, element) {
      return rng.selectNodeContents(element.dom());
    };
    var setStart = function (rng, situ) {
      situ.fold(function (e) {
        rng.setStartBefore(e.dom());
      }, function (e, o) {
        rng.setStart(e.dom(), o);
      }, function (e) {
        rng.setStartAfter(e.dom());
      });
    };
    var setFinish = function (rng, situ) {
      situ.fold(function (e) {
        rng.setEndBefore(e.dom());
      }, function (e, o) {
        rng.setEnd(e.dom(), o);
      }, function (e) {
        rng.setEndAfter(e.dom());
      });
    };
    var relativeToNative = function (win, startSitu, finishSitu) {
      var range = win.document.createRange();
      setStart(range, startSitu);
      setFinish(range, finishSitu);
      return range;
    };
    var exactToNative = function (win, start, soffset, finish, foffset) {
      var rng = win.document.createRange();
      rng.setStart(start.dom(), soffset);
      rng.setEnd(finish.dom(), foffset);
      return rng;
    };
    var toRect = function (rect) {
      return {
        left: constant(rect.left),
        top: constant(rect.top),
        right: constant(rect.right),
        bottom: constant(rect.bottom),
        width: constant(rect.width),
        height: constant(rect.height)
      };
    };
    var getFirstRect = function (rng) {
      var rects = rng.getClientRects();
      var rect = rects.length > 0 ? rects[0] : rng.getBoundingClientRect();
      return rect.width > 0 || rect.height > 0 ? Option.some(rect).map(toRect) : Option.none();
    };

    var adt$5 = Adt.generate([
      {
        ltr: [
          'start',
          'soffset',
          'finish',
          'foffset'
        ]
      },
      {
        rtl: [
          'start',
          'soffset',
          'finish',
          'foffset'
        ]
      }
    ]);
    var fromRange = function (win, type, range) {
      return type(Element.fromDom(range.startContainer), range.startOffset, Element.fromDom(range.endContainer), range.endOffset);
    };
    var getRanges = function (win, selection) {
      return selection.match({
        domRange: function (rng) {
          return {
            ltr: constant(rng),
            rtl: Option.none
          };
        },
        relative: function (startSitu, finishSitu) {
          return {
            ltr: cached(function () {
              return relativeToNative(win, startSitu, finishSitu);
            }),
            rtl: cached(function () {
              return Option.some(relativeToNative(win, finishSitu, startSitu));
            })
          };
        },
        exact: function (start, soffset, finish, foffset) {
          return {
            ltr: cached(function () {
              return exactToNative(win, start, soffset, finish, foffset);
            }),
            rtl: cached(function () {
              return Option.some(exactToNative(win, finish, foffset, start, soffset));
            })
          };
        }
      });
    };
    var doDiagnose = function (win, ranges) {
      var rng = ranges.ltr();
      if (rng.collapsed) {
        var reversed = ranges.rtl().filter(function (rev) {
          return rev.collapsed === false;
        });
        return reversed.map(function (rev) {
          return adt$5.rtl(Element.fromDom(rev.endContainer), rev.endOffset, Element.fromDom(rev.startContainer), rev.startOffset);
        }).getOrThunk(function () {
          return fromRange(win, adt$5.ltr, rng);
        });
      } else {
        return fromRange(win, adt$5.ltr, rng);
      }
    };
    var diagnose = function (win, selection) {
      var ranges = getRanges(win, selection);
      return doDiagnose(win, ranges);
    };
    var asLtrRange = function (win, selection) {
      var diagnosis = diagnose(win, selection);
      return diagnosis.match({
        ltr: function (start, soffset, finish, foffset) {
          var rng = win.document.createRange();
          rng.setStart(start.dom(), soffset);
          rng.setEnd(finish.dom(), foffset);
          return rng;
        },
        rtl: function (start, soffset, finish, foffset) {
          var rng = win.document.createRange();
          rng.setStart(finish.dom(), foffset);
          rng.setEnd(start.dom(), soffset);
          return rng;
        }
      });
    };
    var ltr$2 = adt$5.ltr;
    var rtl$2 = adt$5.rtl;

    var searchForPoint = function (rectForOffset, x, y, maxX, length) {
      if (length === 0) {
        return 0;
      } else if (x === maxX) {
        return length - 1;
      }
      var xDelta = maxX;
      for (var i = 1; i < length; i++) {
        var rect = rectForOffset(i);
        var curDeltaX = Math.abs(x - rect.left);
        if (y <= rect.bottom) {
          if (y < rect.top || curDeltaX > xDelta) {
            return i - 1;
          } else {
            xDelta = curDeltaX;
          }
        }
      }
      return 0;
    };
    var inRect = function (rect, x, y) {
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    };

    var locateOffset = function (doc, textnode, x, y, rect) {
      var rangeForOffset = function (o) {
        var r = doc.dom().createRange();
        r.setStart(textnode.dom(), o);
        r.collapse(true);
        return r;
      };
      var rectForOffset = function (o) {
        var r = rangeForOffset(o);
        return r.getBoundingClientRect();
      };
      var length = get$3(textnode).length;
      var offset = searchForPoint(rectForOffset, x, y, rect.right, length);
      return rangeForOffset(offset);
    };
    var locate = function (doc, node, x, y) {
      var r = doc.dom().createRange();
      r.selectNode(node.dom());
      var rects = r.getClientRects();
      var foundRect = findMap(rects, function (rect) {
        return inRect(rect, x, y) ? Option.some(rect) : Option.none();
      });
      return foundRect.map(function (rect) {
        return locateOffset(doc, node, x, y, rect);
      });
    };

    var searchInChildren = function (doc, node, x, y) {
      var r = doc.dom().createRange();
      var nodes = children(node);
      return findMap(nodes, function (n) {
        r.selectNode(n.dom());
        return inRect(r.getBoundingClientRect(), x, y) ? locateNode(doc, n, x, y) : Option.none();
      });
    };
    var locateNode = function (doc, node, x, y) {
      return isText(node) ? locate(doc, node, x, y) : searchInChildren(doc, node, x, y);
    };
    var locate$1 = function (doc, node, x, y) {
      var r = doc.dom().createRange();
      r.selectNode(node.dom());
      var rect = r.getBoundingClientRect();
      var boundedX = Math.max(rect.left, Math.min(rect.right, x));
      var boundedY = Math.max(rect.top, Math.min(rect.bottom, y));
      return locateNode(doc, node, boundedX, boundedY);
    };

    var COLLAPSE_TO_LEFT = true;
    var COLLAPSE_TO_RIGHT = false;
    var getCollapseDirection = function (rect, x) {
      return x - rect.left < rect.right - x ? COLLAPSE_TO_LEFT : COLLAPSE_TO_RIGHT;
    };
    var createCollapsedNode = function (doc, target, collapseDirection) {
      var r = doc.dom().createRange();
      r.selectNode(target.dom());
      r.collapse(collapseDirection);
      return r;
    };
    var locateInElement = function (doc, node, x) {
      var cursorRange = doc.dom().createRange();
      cursorRange.selectNode(node.dom());
      var rect = cursorRange.getBoundingClientRect();
      var collapseDirection = getCollapseDirection(rect, x);
      var f = collapseDirection === COLLAPSE_TO_LEFT ? first : last$1;
      return f(node).map(function (target) {
        return createCollapsedNode(doc, target, collapseDirection);
      });
    };
    var locateInEmpty = function (doc, node, x) {
      var rect = node.dom().getBoundingClientRect();
      var collapseDirection = getCollapseDirection(rect, x);
      return Option.some(createCollapsedNode(doc, node, collapseDirection));
    };
    var search = function (doc, node, x) {
      var f = children(node).length === 0 ? locateInEmpty : locateInElement;
      return f(doc, node, x);
    };

    var caretPositionFromPoint = function (doc, x, y) {
      return Option.from(doc.dom().caretPositionFromPoint(x, y)).bind(function (pos) {
        if (pos.offsetNode === null) {
          return Option.none();
        }
        var r = doc.dom().createRange();
        r.setStart(pos.offsetNode, pos.offset);
        r.collapse();
        return Option.some(r);
      });
    };
    var caretRangeFromPoint = function (doc, x, y) {
      return Option.from(doc.dom().caretRangeFromPoint(x, y));
    };
    var searchTextNodes = function (doc, node, x, y) {
      var r = doc.dom().createRange();
      r.selectNode(node.dom());
      var rect = r.getBoundingClientRect();
      var boundedX = Math.max(rect.left, Math.min(rect.right, x));
      var boundedY = Math.max(rect.top, Math.min(rect.bottom, y));
      return locate$1(doc, node, boundedX, boundedY);
    };
    var searchFromPoint = function (doc, x, y) {
      return Element.fromPoint(doc, x, y).bind(function (elem) {
        var fallback = function () {
          return search(doc, elem, x);
        };
        return children(elem).length === 0 ? fallback() : searchTextNodes(doc, elem, x, y).orThunk(fallback);
      });
    };
    var availableSearch = document.caretPositionFromPoint ? caretPositionFromPoint : document.caretRangeFromPoint ? caretRangeFromPoint : searchFromPoint;
    var fromPoint$1 = function (win, x, y) {
      var doc = Element.fromDom(win.document);
      return availableSearch(doc, x, y).map(function (rng) {
        return SimRange.create(Element.fromDom(rng.startContainer), rng.startOffset, Element.fromDom(rng.endContainer), rng.endOffset);
      });
    };

    var beforeSpecial = function (element, offset) {
      var name$1 = name(element);
      if ('input' === name$1) {
        return Situ.after(element);
      } else if (!contains([
          'br',
          'img'
        ], name$1)) {
        return Situ.on(element, offset);
      } else {
        return offset === 0 ? Situ.before(element) : Situ.after(element);
      }
    };
    var preprocessRelative = function (startSitu, finishSitu) {
      var start = startSitu.fold(Situ.before, beforeSpecial, Situ.after);
      var finish = finishSitu.fold(Situ.before, beforeSpecial, Situ.after);
      return Selection.relative(start, finish);
    };
    var preprocessExact = function (start, soffset, finish, foffset) {
      var startSitu = beforeSpecial(start, soffset);
      var finishSitu = beforeSpecial(finish, foffset);
      return Selection.relative(startSitu, finishSitu);
    };
    var preprocess = function (selection) {
      return selection.match({
        domRange: function (rng) {
          var start = Element.fromDom(rng.startContainer);
          var finish = Element.fromDom(rng.endContainer);
          return preprocessExact(start, rng.startOffset, finish, rng.endOffset);
        },
        relative: preprocessRelative,
        exact: preprocessExact
      });
    };

    var makeRange = function (start, soffset, finish, foffset) {
      var doc = owner(start);
      var rng = doc.dom().createRange();
      rng.setStart(start.dom(), soffset);
      rng.setEnd(finish.dom(), foffset);
      return rng;
    };
    var after$3 = function (start, soffset, finish, foffset) {
      var r = makeRange(start, soffset, finish, foffset);
      var same = eq(start, finish) && soffset === foffset;
      return r.collapsed && !same;
    };

    var doSetNativeRange = function (win, rng) {
      Option.from(win.getSelection()).each(function (selection) {
        selection.removeAllRanges();
        selection.addRange(rng);
      });
    };
    var doSetRange = function (win, start, soffset, finish, foffset) {
      var rng = exactToNative(win, start, soffset, finish, foffset);
      doSetNativeRange(win, rng);
    };
    var setLegacyRtlRange = function (win, selection, start, soffset, finish, foffset) {
      selection.collapse(start.dom(), soffset);
      selection.extend(finish.dom(), foffset);
    };
    var setRangeFromRelative = function (win, relative) {
      return diagnose(win, relative).match({
        ltr: function (start, soffset, finish, foffset) {
          doSetRange(win, start, soffset, finish, foffset);
        },
        rtl: function (start, soffset, finish, foffset) {
          var selection = win.getSelection();
          if (selection.setBaseAndExtent) {
            selection.setBaseAndExtent(start.dom(), soffset, finish.dom(), foffset);
          } else if (selection.extend) {
            try {
              setLegacyRtlRange(win, selection, start, soffset, finish, foffset);
            } catch (e) {
              doSetRange(win, finish, foffset, start, soffset);
            }
          } else {
            doSetRange(win, finish, foffset, start, soffset);
          }
        }
      });
    };
    var setExact = function (win, start, soffset, finish, foffset) {
      var relative = preprocessExact(start, soffset, finish, foffset);
      setRangeFromRelative(win, relative);
    };
    var setRelative = function (win, startSitu, finishSitu) {
      var relative = preprocessRelative(startSitu, finishSitu);
      setRangeFromRelative(win, relative);
    };
    var toNative = function (selection) {
      var win = Selection.getWin(selection).dom();
      var getDomRange = function (start, soffset, finish, foffset) {
        return exactToNative(win, start, soffset, finish, foffset);
      };
      var filtered = preprocess(selection);
      return diagnose(win, filtered).match({
        ltr: getDomRange,
        rtl: getDomRange
      });
    };
    var readRange = function (selection) {
      if (selection.rangeCount > 0) {
        var firstRng = selection.getRangeAt(0);
        var lastRng = selection.getRangeAt(selection.rangeCount - 1);
        return Option.some(SimRange.create(Element.fromDom(firstRng.startContainer), firstRng.startOffset, Element.fromDom(lastRng.endContainer), lastRng.endOffset));
      } else {
        return Option.none();
      }
    };
    var doGetExact = function (selection) {
      var anchor = Element.fromDom(selection.anchorNode);
      var focus = Element.fromDom(selection.focusNode);
      return after$3(anchor, selection.anchorOffset, focus, selection.focusOffset) ? Option.some(SimRange.create(anchor, selection.anchorOffset, focus, selection.focusOffset)) : readRange(selection);
    };
    var setToElement = function (win, element) {
      var rng = selectNodeContents(win, element);
      doSetNativeRange(win, rng);
    };
    var getExact = function (win) {
      return Option.from(win.getSelection()).filter(function (sel) {
        return sel.rangeCount > 0;
      }).bind(doGetExact);
    };
    var get$b = function (win) {
      return getExact(win).map(function (range) {
        return Selection.exact(range.start(), range.soffset(), range.finish(), range.foffset());
      });
    };
    var getFirstRect$1 = function (win, selection) {
      var rng = asLtrRange(win, selection);
      return getFirstRect(rng);
    };
    var getAtPoint = function (win, x, y) {
      return fromPoint$1(win, x, y);
    };
    var clear = function (win) {
      var selection = win.getSelection();
      selection.removeAllRanges();
    };

    var global$3 = tinymce.util.Tools.resolve('tinymce.util.VK');

    var forward = function (editor, isRoot, cell, lazyWire) {
      return go(editor, isRoot, next(cell), lazyWire);
    };
    var backward = function (editor, isRoot, cell, lazyWire) {
      return go(editor, isRoot, prev(cell), lazyWire);
    };
    var getCellFirstCursorPosition = function (editor, cell) {
      var selection = Selection.exact(cell, 0, cell, 0);
      return toNative(selection);
    };
    var getNewRowCursorPosition = function (editor, table) {
      var rows = descendants$1(table, 'tr');
      return last(rows).bind(function (last) {
        return descendant$1(last, 'td,th').map(function (first) {
          return getCellFirstCursorPosition(editor, first);
        });
      });
    };
    var go = function (editor, isRoot, cell, actions, _lazyWire) {
      return cell.fold(Option.none, Option.none, function (current, next) {
        return first(next).map(function (cell) {
          return getCellFirstCursorPosition(editor, cell);
        });
      }, function (current) {
        return table(current, isRoot).bind(function (table) {
          var targets = noMenu(current);
          editor.undoManager.transact(function () {
            actions.insertRowsAfter(table, targets);
          });
          return getNewRowCursorPosition(editor, table);
        });
      });
    };
    var rootElements = [
      'table',
      'li',
      'dl'
    ];
    var handle$1 = function (event, editor, actions, lazyWire) {
      if (event.keyCode === global$3.TAB) {
        var body_1 = getBody$1(editor);
        var isRoot_1 = function (element) {
          var name$1 = name(element);
          return eq(element, body_1) || contains(rootElements, name$1);
        };
        var rng = editor.selection.getRng();
        if (rng.collapsed) {
          var start = Element.fromDom(rng.startContainer);
          cell(start, isRoot_1).each(function (cell) {
            event.preventDefault();
            var navigation = event.shiftKey ? backward : forward;
            var rng = navigation(editor, isRoot_1, cell, actions, lazyWire);
            rng.each(function (range) {
              editor.selection.setRng(range);
            });
          });
        }
      }
    };

    var create$3 = function (selection, kill) {
      return {
        selection: constant(selection),
        kill: constant(kill)
      };
    };
    var Response = { create: create$3 };

    var create$4 = function (start, soffset, finish, foffset) {
      return {
        start: constant(Situ.on(start, soffset)),
        finish: constant(Situ.on(finish, foffset))
      };
    };
    var Situs = { create: create$4 };

    var convertToRange = function (win, selection) {
      var rng = asLtrRange(win, selection);
      return SimRange.create(Element.fromDom(rng.startContainer), rng.startOffset, Element.fromDom(rng.endContainer), rng.endOffset);
    };
    var makeSitus = Situs.create;

    var sync = function (container, isRoot, start, soffset, finish, foffset, selectRange) {
      if (!(eq(start, finish) && soffset === foffset)) {
        return closest$1(start, 'td,th', isRoot).bind(function (s) {
          return closest$1(finish, 'td,th', isRoot).bind(function (f) {
            return detect$5(container, isRoot, s, f, selectRange);
          });
        });
      } else {
        return Option.none();
      }
    };
    var detect$5 = function (container, isRoot, start, finish, selectRange) {
      if (!eq(start, finish)) {
        return identify(start, finish, isRoot).bind(function (cellSel) {
          var boxes = cellSel.boxes.getOr([]);
          if (boxes.length > 0) {
            selectRange(container, boxes, cellSel.start, cellSel.finish);
            return Option.some(Response.create(Option.some(makeSitus(start, 0, start, getEnd(start))), true));
          } else {
            return Option.none();
          }
        });
      } else {
        return Option.none();
      }
    };
    var update = function (rows, columns, container, selected, annotations) {
      var updateSelection = function (newSels) {
        annotations.clearBeforeUpdate(container);
        annotations.selectRange(container, newSels.boxes, newSels.start, newSels.finish);
        return newSels.boxes;
      };
      return shiftSelection(selected, rows, columns, annotations.firstSelectedSelector, annotations.lastSelectedSelector).map(updateSelection);
    };

    var traverse = function (item, mode) {
      return {
        item: constant(item),
        mode: constant(mode)
      };
    };
    var backtrack = function (universe, item, _direction, transition) {
      if (transition === void 0) {
        transition = sidestep;
      }
      return universe.property().parent(item).map(function (p) {
        return traverse(p, transition);
      });
    };
    var sidestep = function (universe, item, direction, transition) {
      if (transition === void 0) {
        transition = advance;
      }
      return direction.sibling(universe, item).map(function (p) {
        return traverse(p, transition);
      });
    };
    var advance = function (universe, item, direction, transition) {
      if (transition === void 0) {
        transition = advance;
      }
      var children = universe.property().children(item);
      var result = direction.first(children);
      return result.map(function (r) {
        return traverse(r, transition);
      });
    };
    var successors = [
      {
        current: backtrack,
        next: sidestep,
        fallback: Option.none()
      },
      {
        current: sidestep,
        next: advance,
        fallback: Option.some(backtrack)
      },
      {
        current: advance,
        next: advance,
        fallback: Option.some(sidestep)
      }
    ];
    var go$1 = function (universe, item, mode, direction, rules) {
      if (rules === void 0) {
        rules = successors;
      }
      var ruleOpt = find(rules, function (succ) {
        return succ.current === mode;
      });
      return ruleOpt.bind(function (rule) {
        return rule.current(universe, item, direction, rule.next).orThunk(function () {
          return rule.fallback.bind(function (fb) {
            return go$1(universe, item, fb, direction);
          });
        });
      });
    };

    var left = function () {
      var sibling = function (universe, item) {
        return universe.query().prevSibling(item);
      };
      var first = function (children) {
        return children.length > 0 ? Option.some(children[children.length - 1]) : Option.none();
      };
      return {
        sibling: sibling,
        first: first
      };
    };
    var right = function () {
      var sibling = function (universe, item) {
        return universe.query().nextSibling(item);
      };
      var first = function (children) {
        return children.length > 0 ? Option.some(children[0]) : Option.none();
      };
      return {
        sibling: sibling,
        first: first
      };
    };
    var Walkers = {
      left: left,
      right: right
    };

    var hone = function (universe, item, predicate, mode, direction, isRoot) {
      var next = go$1(universe, item, mode, direction);
      return next.bind(function (n) {
        if (isRoot(n.item())) {
          return Option.none();
        } else {
          return predicate(n.item()) ? Option.some(n.item()) : hone(universe, n.item(), predicate, n.mode(), direction, isRoot);
        }
      });
    };
    var left$1 = function (universe, item, predicate, isRoot) {
      return hone(universe, item, predicate, sidestep, Walkers.left(), isRoot);
    };
    var right$1 = function (universe, item, predicate, isRoot) {
      return hone(universe, item, predicate, sidestep, Walkers.right(), isRoot);
    };

    var isLeaf = function (universe) {
      return function (element) {
        return universe.property().children(element).length === 0;
      };
    };
    var before$3 = function (universe, item, isRoot) {
      return seekLeft(universe, item, isLeaf(universe), isRoot);
    };
    var after$4 = function (universe, item, isRoot) {
      return seekRight(universe, item, isLeaf(universe), isRoot);
    };
    var seekLeft = left$1;
    var seekRight = right$1;

    var universe$3 = DomUniverse();
    var before$4 = function (element, isRoot) {
      return before$3(universe$3, element, isRoot);
    };
    var after$5 = function (element, isRoot) {
      return after$4(universe$3, element, isRoot);
    };
    var seekLeft$1 = function (element, predicate, isRoot) {
      return seekLeft(universe$3, element, predicate, isRoot);
    };
    var seekRight$1 = function (element, predicate, isRoot) {
      return seekRight(universe$3, element, predicate, isRoot);
    };

    var ancestor$2 = function (scope, predicate, isRoot) {
      return ancestor(scope, predicate, isRoot).isSome();
    };

    var adt$6 = Adt.generate([
      { none: ['message'] },
      { success: [] },
      { failedUp: ['cell'] },
      { failedDown: ['cell'] }
    ]);
    var isOverlapping = function (bridge, before, after) {
      var beforeBounds = bridge.getRect(before);
      var afterBounds = bridge.getRect(after);
      return afterBounds.right > beforeBounds.left && afterBounds.left < beforeBounds.right;
    };
    var isRow = function (elem) {
      return closest$1(elem, 'tr');
    };
    var verify = function (bridge, before, beforeOffset, after, afterOffset, failure, isRoot) {
      return closest$1(after, 'td,th', isRoot).bind(function (afterCell) {
        return closest$1(before, 'td,th', isRoot).map(function (beforeCell) {
          if (!eq(afterCell, beforeCell)) {
            return sharedOne$1(isRow, [
              afterCell,
              beforeCell
            ]).fold(function () {
              return isOverlapping(bridge, beforeCell, afterCell) ? adt$6.success() : failure(beforeCell);
            }, function (_sharedRow) {
              return failure(beforeCell);
            });
          } else {
            return eq(after, afterCell) && getEnd(afterCell) === afterOffset ? failure(beforeCell) : adt$6.none('in same cell');
          }
        });
      }).getOr(adt$6.none('default'));
    };
    var cata$2 = function (subject, onNone, onSuccess, onFailedUp, onFailedDown) {
      return subject.fold(onNone, onSuccess, onFailedUp, onFailedDown);
    };
    var BeforeAfter = __assign(__assign({}, adt$6), {
      verify: verify,
      cata: cata$2
    });

    var inParent = function (parent, children, element, index) {
      return {
        parent: constant(parent),
        children: constant(children),
        element: constant(element),
        index: constant(index)
      };
    };
    var indexInParent = function (element) {
      return parent(element).bind(function (parent) {
        var children$1 = children(parent);
        return indexOf(children$1, element).map(function (index) {
          return inParent(parent, children$1, element, index);
        });
      });
    };
    var indexOf = function (elements, element) {
      return findIndex(elements, curry(eq, element));
    };

    var isBr = function (elem) {
      return name(elem) === 'br';
    };
    var gatherer = function (cand, gather, isRoot) {
      return gather(cand, isRoot).bind(function (target) {
        return isText(target) && get$3(target).trim().length === 0 ? gatherer(target, gather, isRoot) : Option.some(target);
      });
    };
    var handleBr = function (isRoot, element, direction) {
      return direction.traverse(element).orThunk(function () {
        return gatherer(element, direction.gather, isRoot);
      }).map(direction.relative);
    };
    var findBr = function (element, offset) {
      return child(element, offset).filter(isBr).orThunk(function () {
        return child(element, offset - 1).filter(isBr);
      });
    };
    var handleParent = function (isRoot, element, offset, direction) {
      return findBr(element, offset).bind(function (br) {
        return direction.traverse(br).fold(function () {
          return gatherer(br, direction.gather, isRoot).map(direction.relative);
        }, function (adjacent) {
          return indexInParent(adjacent).map(function (info) {
            return Situ.on(info.parent(), info.index());
          });
        });
      });
    };
    var tryBr = function (isRoot, element, offset, direction) {
      var target = isBr(element) ? handleBr(isRoot, element, direction) : handleParent(isRoot, element, offset, direction);
      return target.map(function (tgt) {
        return {
          start: constant(tgt),
          finish: constant(tgt)
        };
      });
    };
    var process = function (analysis) {
      return BeforeAfter.cata(analysis, function (_message) {
        return Option.none();
      }, function () {
        return Option.none();
      }, function (cell) {
        return Option.some(point(cell, 0));
      }, function (cell) {
        return Option.some(point(cell, getEnd(cell)));
      });
    };

    var moveDown = function (caret, amount) {
      return {
        left: caret.left,
        top: caret.top + amount,
        right: caret.right,
        bottom: caret.bottom + amount
      };
    };
    var moveUp = function (caret, amount) {
      return {
        left: caret.left,
        top: caret.top - amount,
        right: caret.right,
        bottom: caret.bottom - amount
      };
    };
    var translate = function (caret, xDelta, yDelta) {
      return {
        left: caret.left + xDelta,
        top: caret.top + yDelta,
        right: caret.right + xDelta,
        bottom: caret.bottom + yDelta
      };
    };
    var getTop$1 = function (caret) {
      return caret.top;
    };
    var getBottom = function (caret) {
      return caret.bottom;
    };

    var getPartialBox = function (bridge, element, offset) {
      if (offset >= 0 && offset < getEnd(element)) {
        return bridge.getRangedRect(element, offset, element, offset + 1);
      } else if (offset > 0) {
        return bridge.getRangedRect(element, offset - 1, element, offset);
      }
      return Option.none();
    };
    var toCaret = function (rect) {
      return {
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom
      };
    };
    var getElemBox = function (bridge, element) {
      return Option.some(bridge.getRect(element));
    };
    var getBoxAt = function (bridge, element, offset) {
      if (isElement(element)) {
        return getElemBox(bridge, element).map(toCaret);
      } else if (isText(element)) {
        return getPartialBox(bridge, element, offset).map(toCaret);
      } else {
        return Option.none();
      }
    };
    var getEntireBox = function (bridge, element) {
      if (isElement(element)) {
        return getElemBox(bridge, element).map(toCaret);
      } else if (isText(element)) {
        return bridge.getRangedRect(element, 0, element, getEnd(element)).map(toCaret);
      } else {
        return Option.none();
      }
    };

    var JUMP_SIZE = 5;
    var NUM_RETRIES = 100;
    var adt$7 = Adt.generate([
      { none: [] },
      { retry: ['caret'] }
    ]);
    var isOutside = function (caret, box) {
      return caret.left < box.left || Math.abs(box.right - caret.left) < 1 || caret.left > box.right;
    };
    var inOutsideBlock = function (bridge, element, caret) {
      return closest(element, isBlock$1).fold(constant(false), function (cell) {
        return getEntireBox(bridge, cell).exists(function (box) {
          return isOutside(caret, box);
        });
      });
    };
    var adjustDown = function (bridge, element, guessBox, original, caret) {
      var lowerCaret = moveDown(caret, JUMP_SIZE);
      if (Math.abs(guessBox.bottom - original.bottom) < 1) {
        return adt$7.retry(lowerCaret);
      } else if (guessBox.top > caret.bottom) {
        return adt$7.retry(lowerCaret);
      } else if (guessBox.top === caret.bottom) {
        return adt$7.retry(moveDown(caret, 1));
      } else {
        return inOutsideBlock(bridge, element, caret) ? adt$7.retry(translate(lowerCaret, JUMP_SIZE, 0)) : adt$7.none();
      }
    };
    var adjustUp = function (bridge, element, guessBox, original, caret) {
      var higherCaret = moveUp(caret, JUMP_SIZE);
      if (Math.abs(guessBox.top - original.top) < 1) {
        return adt$7.retry(higherCaret);
      } else if (guessBox.bottom < caret.top) {
        return adt$7.retry(higherCaret);
      } else if (guessBox.bottom === caret.top) {
        return adt$7.retry(moveUp(caret, 1));
      } else {
        return inOutsideBlock(bridge, element, caret) ? adt$7.retry(translate(higherCaret, JUMP_SIZE, 0)) : adt$7.none();
      }
    };
    var upMovement = {
      point: getTop$1,
      adjuster: adjustUp,
      move: moveUp,
      gather: before$4
    };
    var downMovement = {
      point: getBottom,
      adjuster: adjustDown,
      move: moveDown,
      gather: after$5
    };
    var isAtTable = function (bridge, x, y) {
      return bridge.elementFromPoint(x, y).filter(function (elm) {
        return name(elm) === 'table';
      }).isSome();
    };
    var adjustForTable = function (bridge, movement, original, caret, numRetries) {
      return adjustTil(bridge, movement, original, movement.move(caret, JUMP_SIZE), numRetries);
    };
    var adjustTil = function (bridge, movement, original, caret, numRetries) {
      if (numRetries === 0) {
        return Option.some(caret);
      }
      if (isAtTable(bridge, caret.left, movement.point(caret))) {
        return adjustForTable(bridge, movement, original, caret, numRetries - 1);
      }
      return bridge.situsFromPoint(caret.left, movement.point(caret)).bind(function (guess) {
        return guess.start().fold(Option.none, function (element) {
          return getEntireBox(bridge, element).bind(function (guessBox) {
            return movement.adjuster(bridge, element, guessBox, original, caret).fold(Option.none, function (newCaret) {
              return adjustTil(bridge, movement, original, newCaret, numRetries - 1);
            });
          }).orThunk(function () {
            return Option.some(caret);
          });
        }, Option.none);
      });
    };
    var ieTryDown = function (bridge, caret) {
      return bridge.situsFromPoint(caret.left, caret.bottom + JUMP_SIZE);
    };
    var ieTryUp = function (bridge, caret) {
      return bridge.situsFromPoint(caret.left, caret.top - JUMP_SIZE);
    };
    var checkScroll = function (movement, adjusted, bridge) {
      if (movement.point(adjusted) > bridge.getInnerHeight()) {
        return Option.some(movement.point(adjusted) - bridge.getInnerHeight());
      } else if (movement.point(adjusted) < 0) {
        return Option.some(-movement.point(adjusted));
      } else {
        return Option.none();
      }
    };
    var retry = function (movement, bridge, caret) {
      var moved = movement.move(caret, JUMP_SIZE);
      var adjusted = adjustTil(bridge, movement, caret, moved, NUM_RETRIES).getOr(moved);
      return checkScroll(movement, adjusted, bridge).fold(function () {
        return bridge.situsFromPoint(adjusted.left, movement.point(adjusted));
      }, function (delta) {
        bridge.scrollBy(0, delta);
        return bridge.situsFromPoint(adjusted.left, movement.point(adjusted) - delta);
      });
    };
    var Retries = {
      tryUp: curry(retry, upMovement),
      tryDown: curry(retry, downMovement),
      ieTryUp: ieTryUp,
      ieTryDown: ieTryDown,
      getJumpSize: constant(JUMP_SIZE)
    };

    var MAX_RETRIES = 20;
    var findSpot = function (bridge, isRoot, direction) {
      return bridge.getSelection().bind(function (sel) {
        return tryBr(isRoot, sel.finish(), sel.foffset(), direction).fold(function () {
          return Option.some(point(sel.finish(), sel.foffset()));
        }, function (brNeighbour) {
          var range = bridge.fromSitus(brNeighbour);
          var analysis = BeforeAfter.verify(bridge, sel.finish(), sel.foffset(), range.finish(), range.foffset(), direction.failure, isRoot);
          return process(analysis);
        });
      });
    };
    var scan$1 = function (bridge, isRoot, element, offset, direction, numRetries) {
      if (numRetries === 0) {
        return Option.none();
      }
      return tryCursor(bridge, isRoot, element, offset, direction).bind(function (situs) {
        var range = bridge.fromSitus(situs);
        var analysis = BeforeAfter.verify(bridge, element, offset, range.finish(), range.foffset(), direction.failure, isRoot);
        return BeforeAfter.cata(analysis, function () {
          return Option.none();
        }, function () {
          return Option.some(situs);
        }, function (cell) {
          if (eq(element, cell) && offset === 0) {
            return tryAgain(bridge, element, offset, moveUp, direction);
          } else {
            return scan$1(bridge, isRoot, cell, 0, direction, numRetries - 1);
          }
        }, function (cell) {
          if (eq(element, cell) && offset === getEnd(cell)) {
            return tryAgain(bridge, element, offset, moveDown, direction);
          } else {
            return scan$1(bridge, isRoot, cell, getEnd(cell), direction, numRetries - 1);
          }
        });
      });
    };
    var tryAgain = function (bridge, element, offset, move, direction) {
      return getBoxAt(bridge, element, offset).bind(function (box) {
        return tryAt(bridge, direction, move(box, Retries.getJumpSize()));
      });
    };
    var tryAt = function (bridge, direction, box) {
      var browser = detect$3().browser;
      if (browser.isChrome() || browser.isSafari() || browser.isFirefox() || browser.isEdge()) {
        return direction.otherRetry(bridge, box);
      } else if (browser.isIE()) {
        return direction.ieRetry(bridge, box);
      } else {
        return Option.none();
      }
    };
    var tryCursor = function (bridge, isRoot, element, offset, direction) {
      return getBoxAt(bridge, element, offset).bind(function (box) {
        return tryAt(bridge, direction, box);
      });
    };
    var handle$2 = function (bridge, isRoot, direction) {
      return findSpot(bridge, isRoot, direction).bind(function (spot) {
        return scan$1(bridge, isRoot, spot.element(), spot.offset(), direction, MAX_RETRIES).map(bridge.fromSitus);
      });
    };

    var inSameTable = function (elem, table) {
      return ancestor$2(elem, function (e) {
        return parent(e).exists(function (p) {
          return eq(p, table);
        });
      });
    };
    var simulate = function (bridge, isRoot, direction, initial, anchor) {
      return closest$1(initial, 'td,th', isRoot).bind(function (start) {
        return closest$1(start, 'table', isRoot).bind(function (table) {
          if (!inSameTable(anchor, table)) {
            return Option.none();
          }
          return handle$2(bridge, isRoot, direction).bind(function (range) {
            return closest$1(range.finish(), 'td,th', isRoot).map(function (finish) {
              return {
                start: constant(start),
                finish: constant(finish),
                range: constant(range)
              };
            });
          });
        });
      });
    };
    var navigate = function (bridge, isRoot, direction, initial, anchor, precheck) {
      if (detect$3().browser.isIE()) {
        return Option.none();
      } else {
        return precheck(initial, isRoot).orThunk(function () {
          return simulate(bridge, isRoot, direction, initial, anchor).map(function (info) {
            var range = info.range();
            return Response.create(Option.some(makeSitus(range.start(), range.soffset(), range.finish(), range.foffset())), true);
          });
        });
      }
    };
    var firstUpCheck = function (initial, isRoot) {
      return closest$1(initial, 'tr', isRoot).bind(function (startRow) {
        return closest$1(startRow, 'table', isRoot).bind(function (table) {
          var rows = descendants$1(table, 'tr');
          if (eq(startRow, rows[0])) {
            return seekLeft$1(table, function (element) {
              return last$1(element).isSome();
            }, isRoot).map(function (last) {
              var lastOffset = getEnd(last);
              return Response.create(Option.some(makeSitus(last, lastOffset, last, lastOffset)), true);
            });
          } else {
            return Option.none();
          }
        });
      });
    };
    var lastDownCheck = function (initial, isRoot) {
      return closest$1(initial, 'tr', isRoot).bind(function (startRow) {
        return closest$1(startRow, 'table', isRoot).bind(function (table) {
          var rows = descendants$1(table, 'tr');
          if (eq(startRow, rows[rows.length - 1])) {
            return seekRight$1(table, function (element) {
              return first(element).isSome();
            }, isRoot).map(function (first) {
              return Response.create(Option.some(makeSitus(first, 0, first, 0)), true);
            });
          } else {
            return Option.none();
          }
        });
      });
    };
    var select = function (bridge, container, isRoot, direction, initial, anchor, selectRange) {
      return simulate(bridge, isRoot, direction, initial, anchor).bind(function (info) {
        return detect$5(container, isRoot, info.start(), info.finish(), selectRange);
      });
    };

    var findCell = function (target, isRoot) {
      return closest$1(target, 'td,th', isRoot);
    };
    function MouseSelection (bridge, container, isRoot, annotations) {
      var cursor = Option.none();
      var clearState = function () {
        cursor = Option.none();
      };
      var mousedown = function (event) {
        annotations.clear(container);
        cursor = findCell(event.target(), isRoot);
      };
      var mouseover = function (event) {
        cursor.each(function (start) {
          annotations.clearBeforeUpdate(container);
          findCell(event.target(), isRoot).each(function (finish) {
            identify(start, finish, isRoot).each(function (cellSel) {
              var boxes = cellSel.boxes.getOr([]);
              if (boxes.length > 1 || boxes.length === 1 && !eq(start, finish)) {
                annotations.selectRange(container, boxes, cellSel.start, cellSel.finish);
                bridge.selectContents(finish);
              }
            });
          });
        });
      };
      var mouseup = function (_event) {
        cursor.each(clearState);
      };
      return {
        mousedown: mousedown,
        mouseover: mouseover,
        mouseup: mouseup
      };
    }

    var down = {
      traverse: nextSibling,
      gather: after$5,
      relative: Situ.before,
      otherRetry: Retries.tryDown,
      ieRetry: Retries.ieTryDown,
      failure: BeforeAfter.failedDown
    };
    var up = {
      traverse: prevSibling,
      gather: before$4,
      relative: Situ.before,
      otherRetry: Retries.tryUp,
      ieRetry: Retries.ieTryUp,
      failure: BeforeAfter.failedUp
    };

    var isKey = function (key) {
      return function (keycode) {
        return keycode === key;
      };
    };
    var isUp = isKey(38);
    var isDown = isKey(40);
    var isNavigation = function (keycode) {
      return keycode >= 37 && keycode <= 40;
    };
    var ltr$3 = {
      isBackward: isKey(37),
      isForward: isKey(39)
    };
    var rtl$3 = {
      isBackward: isKey(39),
      isForward: isKey(37)
    };

    var toRaw = function (sr) {
      return {
        left: sr.left(),
        top: sr.top(),
        right: sr.right(),
        bottom: sr.bottom(),
        width: sr.width(),
        height: sr.height()
      };
    };
    var Rect = { toRaw: toRaw };

    var get$c = function (_DOC) {
      var doc = _DOC !== undefined ? _DOC.dom() : domGlobals.document;
      var x = doc.body.scrollLeft || doc.documentElement.scrollLeft;
      var y = doc.body.scrollTop || doc.documentElement.scrollTop;
      return Position(x, y);
    };
    var by = function (x, y, _DOC) {
      var doc = _DOC !== undefined ? _DOC.dom() : domGlobals.document;
      var win = doc.defaultView;
      win.scrollBy(x, y);
    };

    var WindowBridge = function (win) {
      var elementFromPoint = function (x, y) {
        return Element.fromPoint(Element.fromDom(win.document), x, y);
      };
      var getRect = function (element) {
        return element.dom().getBoundingClientRect();
      };
      var getRangedRect = function (start, soffset, finish, foffset) {
        var sel = Selection.exact(start, soffset, finish, foffset);
        return getFirstRect$1(win, sel).map(Rect.toRaw);
      };
      var getSelection = function () {
        return get$b(win).map(function (exactAdt) {
          return convertToRange(win, exactAdt);
        });
      };
      var fromSitus = function (situs) {
        var relative = Selection.relative(situs.start(), situs.finish());
        return convertToRange(win, relative);
      };
      var situsFromPoint = function (x, y) {
        return getAtPoint(win, x, y).map(function (exact) {
          return Situs.create(exact.start(), exact.soffset(), exact.finish(), exact.foffset());
        });
      };
      var clearSelection = function () {
        clear(win);
      };
      var collapseSelection = function (toStart) {
        if (toStart === void 0) {
          toStart = false;
        }
        get$b(win).each(function (sel) {
          return sel.fold(function (rng) {
            return rng.collapse(toStart);
          }, function (startSitu, finishSitu) {
            var situ = toStart ? startSitu : finishSitu;
            setRelative(win, situ, situ);
          }, function (start, soffset, finish, foffset) {
            var node = toStart ? start : finish;
            var offset = toStart ? soffset : foffset;
            setExact(win, node, offset, node, offset);
          });
        });
      };
      var selectContents = function (element) {
        setToElement(win, element);
      };
      var setSelection = function (sel) {
        setExact(win, sel.start(), sel.soffset(), sel.finish(), sel.foffset());
      };
      var setRelativeSelection = function (start, finish) {
        setRelative(win, start, finish);
      };
      var getInnerHeight = function () {
        return win.innerHeight;
      };
      var getScrollY = function () {
        var pos = get$c(Element.fromDom(win.document));
        return pos.top();
      };
      var scrollBy = function (x, y) {
        by(x, y, Element.fromDom(win.document));
      };
      return {
        elementFromPoint: elementFromPoint,
        getRect: getRect,
        getRangedRect: getRangedRect,
        getSelection: getSelection,
        fromSitus: fromSitus,
        situsFromPoint: situsFromPoint,
        clearSelection: clearSelection,
        collapseSelection: collapseSelection,
        setSelection: setSelection,
        setRelativeSelection: setRelativeSelection,
        selectContents: selectContents,
        getInnerHeight: getInnerHeight,
        getScrollY: getScrollY,
        scrollBy: scrollBy
      };
    };

    var rc = function (rows, cols) {
      return {
        rows: rows,
        cols: cols
      };
    };
    var mouse = function (win, container, isRoot, annotations) {
      var bridge = WindowBridge(win);
      var handlers = MouseSelection(bridge, container, isRoot, annotations);
      return {
        mousedown: handlers.mousedown,
        mouseover: handlers.mouseover,
        mouseup: handlers.mouseup
      };
    };
    var keyboard = function (win, container, isRoot, annotations) {
      var bridge = WindowBridge(win);
      var clearToNavigate = function () {
        annotations.clear(container);
        return Option.none();
      };
      var keydown = function (event, start, soffset, finish, foffset, direction) {
        var realEvent = event.raw();
        var keycode = realEvent.which;
        var shiftKey = realEvent.shiftKey === true;
        var handler = retrieve(container, annotations.selectedSelector).fold(function () {
          if (isDown(keycode) && shiftKey) {
            return curry(select, bridge, container, isRoot, down, finish, start, annotations.selectRange);
          } else if (isUp(keycode) && shiftKey) {
            return curry(select, bridge, container, isRoot, up, finish, start, annotations.selectRange);
          } else if (isDown(keycode)) {
            return curry(navigate, bridge, isRoot, down, finish, start, lastDownCheck);
          } else if (isUp(keycode)) {
            return curry(navigate, bridge, isRoot, up, finish, start, firstUpCheck);
          } else {
            return Option.none;
          }
        }, function (selected) {
          var update$1 = function (attempts) {
            return function () {
              var navigation = findMap(attempts, function (delta) {
                return update(delta.rows, delta.cols, container, selected, annotations);
              });
              return navigation.fold(function () {
                return getEdges(container, annotations.firstSelectedSelector, annotations.lastSelectedSelector).map(function (edges) {
                  var relative = isDown(keycode) || direction.isForward(keycode) ? Situ.after : Situ.before;
                  bridge.setRelativeSelection(Situ.on(edges.first(), 0), relative(edges.table()));
                  annotations.clear(container);
                  return Response.create(Option.none(), true);
                });
              }, function (_) {
                return Option.some(Response.create(Option.none(), true));
              });
            };
          };
          if (isDown(keycode) && shiftKey) {
            return update$1([rc(+1, 0)]);
          } else if (isUp(keycode) && shiftKey) {
            return update$1([rc(-1, 0)]);
          } else if (direction.isBackward(keycode) && shiftKey) {
            return update$1([
              rc(0, -1),
              rc(-1, 0)
            ]);
          } else if (direction.isForward(keycode) && shiftKey) {
            return update$1([
              rc(0, +1),
              rc(+1, 0)
            ]);
          } else if (isNavigation(keycode) && shiftKey === false) {
            return clearToNavigate;
          } else {
            return Option.none;
          }
        });
        return handler();
      };
      var keyup = function (event, start, soffset, finish, foffset) {
        return retrieve(container, annotations.selectedSelector).fold(function () {
          var realEvent = event.raw();
          var keycode = realEvent.which;
          var shiftKey = realEvent.shiftKey === true;
          if (shiftKey === false) {
            return Option.none();
          }
          if (isNavigation(keycode)) {
            return sync(container, isRoot, start, soffset, finish, foffset, annotations.selectRange);
          } else {
            return Option.none();
          }
        }, Option.none);
      };
      return {
        keydown: keydown,
        keyup: keyup
      };
    };
    var external = function (win, container, isRoot, annotations) {
      var bridge = WindowBridge(win);
      return function (start, finish) {
        annotations.clearBeforeUpdate(container);
        identify(start, finish, isRoot).each(function (cellSel) {
          var boxes = cellSel.boxes.getOr([]);
          annotations.selectRange(container, boxes, cellSel.start, cellSel.finish);
          bridge.selectContents(finish);
          bridge.collapseSelection();
        });
      };
    };

    var remove$7 = function (element, classes) {
      each(classes, function (x) {
        remove$5(element, x);
      });
    };

    var addClass = function (clazz) {
      return function (element) {
        add$3(element, clazz);
      };
    };
    var removeClasses = function (classes) {
      return function (element) {
        remove$7(element, classes);
      };
    };

    var byClass = function (ephemera) {
      var addSelectionClass = addClass(ephemera.selected);
      var removeSelectionClasses = removeClasses([
        ephemera.selected,
        ephemera.lastSelected,
        ephemera.firstSelected
      ]);
      var clear = function (container) {
        var sels = descendants$1(container, ephemera.selectedSelector);
        each(sels, removeSelectionClasses);
      };
      var selectRange = function (container, cells, start, finish) {
        clear(container);
        each(cells, addSelectionClass);
        add$3(start, ephemera.firstSelected);
        add$3(finish, ephemera.lastSelected);
      };
      return {
        clearBeforeUpdate: clear,
        clear: clear,
        selectRange: selectRange,
        selectedSelector: ephemera.selectedSelector,
        firstSelectedSelector: ephemera.firstSelectedSelector,
        lastSelectedSelector: ephemera.lastSelectedSelector
      };
    };
    var byAttr = function (ephemera, onSelection, onClear) {
      var removeSelectionAttributes = function (element) {
        remove(element, ephemera.selected);
        remove(element, ephemera.firstSelected);
        remove(element, ephemera.lastSelected);
      };
      var addSelectionAttribute = function (element) {
        set(element, ephemera.selected, '1');
      };
      var clear = function (container) {
        clearBeforeUpdate(container);
        onClear();
      };
      var clearBeforeUpdate = function (container) {
        var sels = descendants$1(container, ephemera.selectedSelector);
        each(sels, removeSelectionAttributes);
      };
      var selectRange = function (container, cells, start, finish) {
        clear(container);
        each(cells, addSelectionAttribute);
        set(start, ephemera.firstSelected, '1');
        set(finish, ephemera.lastSelected, '1');
        onSelection(cells, start, finish);
      };
      return {
        clearBeforeUpdate: clearBeforeUpdate,
        clear: clear,
        selectRange: selectRange,
        selectedSelector: ephemera.selectedSelector,
        firstSelectedSelector: ephemera.firstSelectedSelector,
        lastSelectedSelector: ephemera.lastSelectedSelector
      };
    };
    var SelectionAnnotation = {
      byClass: byClass,
      byAttr: byAttr
    };

    var getUpOrLeftCells = function (grid, selectedCells, generators) {
      var upGrid = grid.slice(0, selectedCells[selectedCells.length - 1].row() + 1);
      var upDetails = toDetailList(upGrid, generators);
      return bind(upDetails, function (detail) {
        var slicedCells = detail.cells().slice(0, selectedCells[selectedCells.length - 1].column() + 1);
        return map(slicedCells, function (cell) {
          return cell.element();
        });
      });
    };
    var getDownOrRightCells = function (grid, selectedCells, generators) {
      var downGrid = grid.slice(selectedCells[0].row() + selectedCells[0].rowspan() - 1, grid.length);
      var downDetails = toDetailList(downGrid, generators);
      return bind(downDetails, function (detail) {
        var slicedCells = detail.cells().slice(selectedCells[0].column() + selectedCells[0].colspan() - 1, +detail.cells().length);
        return map(slicedCells, function (cell) {
          return cell.element();
        });
      });
    };
    var getOtherCells = function (table, target, generators) {
      var house = Warehouse.fromTable(table);
      var details = onCells(house, target);
      return details.map(function (selectedCells) {
        var grid = toGrid(house, generators, false);
        var upOrLeftCells = getUpOrLeftCells(grid, selectedCells, generators);
        var downOrRightCells = getDownOrRightCells(grid, selectedCells, generators);
        return {
          upOrLeftCells: upOrLeftCells,
          downOrRightCells: downOrRightCells
        };
      });
    };

    var hasInternalTarget = function (e) {
      return has$2(Element.fromDom(e.target), 'ephox-snooker-resizer-bar') === false;
    };
    function CellSelection (editor, lazyResize, selectionTargets) {
      var onSelection = function (cells, start, finish) {
        selectionTargets.targets().each(function (targets) {
          var tableOpt = table(start);
          tableOpt.each(function (table) {
            var cloneFormats = getCloneElements(editor);
            var generators = cellOperations(noop, Element.fromDom(editor.getDoc()), cloneFormats);
            var otherCells = getOtherCells(table, targets, generators);
            fireTableSelectionChange(editor, cells, start, finish, otherCells);
          });
        });
      };
      var onClear = function () {
        return fireTableSelectionClear(editor);
      };
      var annotations = SelectionAnnotation.byAttr(Ephemera, onSelection, onClear);
      editor.on('init', function (_e) {
        var win = editor.getWin();
        var body = getBody$1(editor);
        var isRoot = getIsRoot(editor);
        var syncSelection = function () {
          var sel = editor.selection;
          var start = Element.fromDom(sel.getStart());
          var end = Element.fromDom(sel.getEnd());
          var shared = sharedOne$1(table, [
            start,
            end
          ]);
          shared.fold(function () {
            return annotations.clear(body);
          }, noop);
        };
        var mouseHandlers = mouse(win, body, isRoot, annotations);
        var keyHandlers = keyboard(win, body, isRoot, annotations);
        var external$1 = external(win, body, isRoot, annotations);
        var hasShiftKey = function (event) {
          return event.raw().shiftKey === true;
        };
        editor.on('TableSelectorChange', function (e) {
          return external$1(e.start, e.finish);
        });
        var handleResponse = function (event, response) {
          if (!hasShiftKey(event)) {
            return;
          }
          if (response.kill()) {
            event.kill();
          }
          response.selection().each(function (ns) {
            var relative = Selection.relative(ns.start(), ns.finish());
            var rng = asLtrRange(win, relative);
            editor.selection.setRng(rng);
          });
        };
        var keyup = function (event) {
          var wrappedEvent = fromRawEvent$1(event);
          if (wrappedEvent.raw().shiftKey && isNavigation(wrappedEvent.raw().which)) {
            var rng = editor.selection.getRng();
            var start = Element.fromDom(rng.startContainer);
            var end = Element.fromDom(rng.endContainer);
            keyHandlers.keyup(wrappedEvent, start, rng.startOffset, end, rng.endOffset).each(function (response) {
              handleResponse(wrappedEvent, response);
            });
          }
        };
        var keydown = function (event) {
          var wrappedEvent = fromRawEvent$1(event);
          lazyResize().each(function (resize) {
            return resize.hideBars();
          });
          var rng = editor.selection.getRng();
          var startContainer = Element.fromDom(editor.selection.getStart());
          var start = Element.fromDom(rng.startContainer);
          var end = Element.fromDom(rng.endContainer);
          var direction = directionAt(startContainer).isRtl() ? rtl$3 : ltr$3;
          keyHandlers.keydown(wrappedEvent, start, rng.startOffset, end, rng.endOffset, direction).each(function (response) {
            handleResponse(wrappedEvent, response);
          });
          lazyResize().each(function (resize) {
            return resize.showBars();
          });
        };
        var isLeftMouse = function (raw) {
          return raw.button === 0;
        };
        var isLeftButtonPressed = function (raw) {
          if (raw.buttons === undefined) {
            return true;
          }
          if (global$2.browser.isEdge() && raw.buttons === 0) {
            return true;
          }
          return (raw.buttons & 1) !== 0;
        };
        var mouseDown = function (e) {
          if (isLeftMouse(e) && hasInternalTarget(e)) {
            mouseHandlers.mousedown(fromRawEvent$1(e));
          }
        };
        var mouseOver = function (e) {
          if (isLeftButtonPressed(e) && hasInternalTarget(e)) {
            mouseHandlers.mouseover(fromRawEvent$1(e));
          }
        };
        var mouseUp = function (e) {
          if (isLeftMouse(e) && hasInternalTarget(e)) {
            mouseHandlers.mouseup(fromRawEvent$1(e));
          }
        };
        var getDoubleTap = function () {
          var lastTarget = Cell(Element.fromDom(body));
          var lastTimeStamp = Cell(0);
          var touchEnd = function (t) {
            var target = Element.fromDom(t.target);
            if (name(target) === 'td' || name(target) === 'th') {
              var lT = lastTarget.get();
              var lTS = lastTimeStamp.get();
              if (eq(lT, target) && t.timeStamp - lTS < 300) {
                t.preventDefault();
                external$1(target, target);
              }
            }
            lastTarget.set(target);
            lastTimeStamp.set(t.timeStamp);
          };
          return { touchEnd: touchEnd };
        };
        var doubleTap = getDoubleTap();
        editor.on('mousedown', mouseDown);
        editor.on('mouseover', mouseOver);
        editor.on('mouseup', mouseUp);
        editor.on('touchend', doubleTap.touchEnd);
        editor.on('keyup', keyup);
        editor.on('keydown', keydown);
        editor.on('NodeChange', syncSelection);
      });
      return { clear: annotations.clear };
    }

    var getSelectionTargets = function (editor, selections) {
      var targets = Cell(Option.none());
      var changeHandlers = Cell([]);
      var findTargets = function () {
        return getSelectionStartCellOrCaption(editor).bind(function (cellOrCaption) {
          var table$1 = table(cellOrCaption);
          var isCaption = function (elem) {
            return name(elem) === 'caption';
          };
          return table$1.map(function (table) {
            if (isCaption(cellOrCaption)) {
              return noMenu(cellOrCaption);
            } else {
              return forMenu(selections, table, cellOrCaption);
            }
          });
        });
      };
      var resetTargets = function () {
        targets.set(cached(findTargets)());
        each(changeHandlers.get(), function (handler) {
          return handler();
        });
      };
      var onSetup = function (api, isDisabled) {
        var handler = function () {
          return targets.get().fold(function () {
            api.setDisabled(true);
          }, function (targets) {
            api.setDisabled(isDisabled(targets));
          });
        };
        handler();
        changeHandlers.set(changeHandlers.get().concat([handler]));
        return function () {
          changeHandlers.set(filter(changeHandlers.get(), function (h) {
            return h !== handler;
          }));
        };
      };
      var onSetupTable = function (api) {
        return onSetup(api, function (_) {
          return false;
        });
      };
      var onSetupCellOrRow = function (api) {
        return onSetup(api, function (targets) {
          return name(targets.element()) === 'caption';
        });
      };
      var onSetupPasteable = function (getClipboardData) {
        return function (api) {
          return onSetup(api, function (targets) {
            return name(targets.element()) === 'caption' || getClipboardData().isNone();
          });
        };
      };
      var onSetupMergeable = function (api) {
        return onSetup(api, function (targets) {
          return targets.mergable().isNone();
        });
      };
      var onSetupUnmergeable = function (api) {
        return onSetup(api, function (targets) {
          return targets.unmergable().isNone();
        });
      };
      editor.on('NodeChange ExecCommand TableSelectorChange', resetTargets);
      return {
        onSetupTable: onSetupTable,
        onSetupCellOrRow: onSetupCellOrRow,
        onSetupPasteable: onSetupPasteable,
        onSetupMergeable: onSetupMergeable,
        onSetupUnmergeable: onSetupUnmergeable,
        resetTargets: resetTargets,
        targets: function () {
          return targets.get();
        }
      };
    };

    var addButtons = function (editor, selectionTargets, clipboard) {
      editor.ui.registry.addMenuButton('table', {
        tooltip: 'Table',
        icon: 'table',
        fetch: function (callback) {
          return callback('inserttable | cell row column | advtablesort | tableprops deletetable');
        }
      });
      var cmd = function (command) {
        return function () {
          return editor.execCommand(command);
        };
      };
      editor.ui.registry.addButton('tableprops', {
        tooltip: 'Table properties',
        onAction: cmd('mceTableProps'),
        icon: 'table',
        onSetup: selectionTargets.onSetupTable
      });
      editor.ui.registry.addButton('tabledelete', {
        tooltip: 'Delete table',
        onAction: cmd('mceTableDelete'),
        icon: 'table-delete-table',
        onSetup: selectionTargets.onSetupTable
      });
      editor.ui.registry.addButton('tablecellprops', {
        tooltip: 'Cell properties',
        onAction: cmd('mceTableCellProps'),
        icon: 'table-cell-properties',
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addButton('tablemergecells', {
        tooltip: 'Merge cells',
        onAction: cmd('mceTableMergeCells'),
        icon: 'table-merge-cells',
        onSetup: selectionTargets.onSetupMergeable
      });
      editor.ui.registry.addButton('tablesplitcells', {
        tooltip: 'Split cell',
        onAction: cmd('mceTableSplitCells'),
        icon: 'table-split-cells',
        onSetup: selectionTargets.onSetupUnmergeable
      });
      editor.ui.registry.addButton('tableinsertrowbefore', {
        tooltip: 'Insert row before',
        onAction: cmd('mceTableInsertRowBefore'),
        icon: 'table-insert-row-above',
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addButton('tableinsertrowafter', {
        tooltip: 'Insert row after',
        onAction: cmd('mceTableInsertRowAfter'),
        icon: 'table-insert-row-after',
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addButton('tabledeleterow', {
        tooltip: 'Delete row',
        onAction: cmd('mceTableDeleteRow'),
        icon: 'table-delete-row',
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addButton('tablerowprops', {
        tooltip: 'Row properties',
        onAction: cmd('mceTableRowProps'),
        icon: 'table-row-properties',
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addButton('tableinsertcolbefore', {
        tooltip: 'Insert column before',
        onAction: cmd('mceTableInsertColBefore'),
        icon: 'table-insert-column-before',
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addButton('tableinsertcolafter', {
        tooltip: 'Insert column after',
        onAction: cmd('mceTableInsertColAfter'),
        icon: 'table-insert-column-after',
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addButton('tabledeletecol', {
        tooltip: 'Delete column',
        onAction: cmd('mceTableDeleteCol'),
        icon: 'table-delete-column',
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addButton('tablecutrow', {
        tooltip: 'Cut row',
        icon: 'cut-row',
        onAction: cmd('mceTableCutRow'),
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addButton('tablecopyrow', {
        tooltip: 'Copy row',
        icon: 'duplicate-row',
        onAction: cmd('mceTableCopyRow'),
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addButton('tablepasterowbefore', {
        tooltip: 'Paste row before',
        icon: 'paste-row-before',
        onAction: cmd('mceTablePasteRowBefore'),
        onSetup: selectionTargets.onSetupPasteable(clipboard.getRows)
      });
      editor.ui.registry.addButton('tablepasterowafter', {
        tooltip: 'Paste row after',
        icon: 'paste-row-after',
        onAction: cmd('mceTablePasteRowAfter'),
        onSetup: selectionTargets.onSetupPasteable(clipboard.getRows)
      });
      editor.ui.registry.addButton('tablecutcol', {
        tooltip: 'Cut column',
        icon: 'cut-column',
        onAction: cmd('mceTableCutCol'),
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addButton('tablecopycol', {
        tooltip: 'Copy column',
        icon: 'duplicate-column',
        onAction: cmd('mceTableCopyCol'),
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addButton('tablepastecolbefore', {
        tooltip: 'Paste column before',
        icon: 'paste-column-before',
        onAction: cmd('mceTablePasteColBefore'),
        onSetup: selectionTargets.onSetupPasteable(clipboard.getColumns)
      });
      editor.ui.registry.addButton('tablepastecolafter', {
        tooltip: 'Paste column after',
        icon: 'paste-column-after',
        onAction: cmd('mceTablePasteColAfter'),
        onSetup: selectionTargets.onSetupPasteable(clipboard.getColumns)
      });
      editor.ui.registry.addButton('tableinsertdialog', {
        tooltip: 'Insert table',
        onAction: cmd('mceInsertTable'),
        icon: 'table'
      });
    };
    var addToolbars = function (editor) {
      var isTable = function (table) {
        return editor.dom.is(table, 'table') && editor.getBody().contains(table);
      };
      var toolbar = getToolbar(editor);
      if (toolbar.length > 0) {
        editor.ui.registry.addContextToolbar('table', {
          predicate: isTable,
          items: toolbar,
          scope: 'node',
          position: 'node'
        });
      }
    };

    var addMenuItems = function (editor, selectionTargets, clipboard) {
      var cmd = function (command) {
        return function () {
          return editor.execCommand(command);
        };
      };
      var insertTableAction = function (_a) {
        var numRows = _a.numRows, numColumns = _a.numColumns;
        editor.undoManager.transact(function () {
          insert(editor, numColumns, numRows, 0, 0);
        });
        editor.addVisual();
      };
      var tableProperties = {
        text: 'Table properties',
        onSetup: selectionTargets.onSetupTable,
        onAction: cmd('mceTableProps')
      };
      var deleteTable = {
        text: 'Delete table',
        icon: 'table-delete-table',
        onSetup: selectionTargets.onSetupTable,
        onAction: cmd('mceTableDelete')
      };
      editor.ui.registry.addMenuItem('tableinsertrowbefore', {
        text: 'Insert row before',
        icon: 'table-insert-row-above',
        onAction: cmd('mceTableInsertRowBefore'),
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addMenuItem('tableinsertrowafter', {
        text: 'Insert row after',
        icon: 'table-insert-row-after',
        onAction: cmd('mceTableInsertRowAfter'),
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addMenuItem('tabledeleterow', {
        text: 'Delete row',
        icon: 'table-delete-row',
        onAction: cmd('mceTableDeleteRow'),
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addMenuItem('tablerowprops', {
        text: 'Row properties',
        icon: 'table-row-properties',
        onAction: cmd('mceTableRowProps'),
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addMenuItem('tablecutrow', {
        text: 'Cut row',
        icon: 'cut-row',
        onAction: cmd('mceTableCutRow'),
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addMenuItem('tablecopyrow', {
        text: 'Copy row',
        icon: 'duplicate-row',
        onAction: cmd('mceTableCopyRow'),
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addMenuItem('tablepasterowbefore', {
        text: 'Paste row before',
        icon: 'paste-row-before',
        onAction: cmd('mceTablePasteRowBefore'),
        onSetup: selectionTargets.onSetupPasteable(clipboard.getRows)
      });
      editor.ui.registry.addMenuItem('tablepasterowafter', {
        text: 'Paste row after',
        icon: 'paste-row-after',
        onAction: cmd('mceTablePasteRowAfter'),
        onSetup: selectionTargets.onSetupPasteable(clipboard.getRows)
      });
      var row = {
        type: 'nestedmenuitem',
        text: 'Row',
        getSubmenuItems: function () {
          return 'tableinsertrowbefore tableinsertrowafter tabledeleterow tablerowprops | tablecutrow tablecopyrow tablepasterowbefore tablepasterowafter';
        }
      };
      editor.ui.registry.addMenuItem('tableinsertcolumnbefore', {
        text: 'Insert column before',
        icon: 'table-insert-column-before',
        onAction: cmd('mceTableInsertColBefore'),
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addMenuItem('tableinsertcolumnafter', {
        text: 'Insert column after',
        icon: 'table-insert-column-after',
        onAction: cmd('mceTableInsertColAfter'),
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addMenuItem('tabledeletecolumn', {
        text: 'Delete column',
        icon: 'table-delete-column',
        onAction: cmd('mceTableDeleteCol'),
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addMenuItem('tablecutcolumn', {
        text: 'Cut column',
        icon: 'cut-column',
        onAction: cmd('mceTableCutCol'),
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addMenuItem('tablecopycolumn', {
        text: 'Copy column',
        icon: 'duplicate-column',
        onAction: cmd('mceTableCopyCol'),
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addMenuItem('tablepastecolumnbefore', {
        text: 'Paste column before',
        icon: 'paste-column-before',
        onAction: cmd('mceTablePasteColBefore'),
        onSetup: selectionTargets.onSetupPasteable(clipboard.getColumns)
      });
      editor.ui.registry.addMenuItem('tablepastecolumnafter', {
        text: 'Paste column after',
        icon: 'paste-column-after',
        onAction: cmd('mceTablePasteColAfter'),
        onSetup: selectionTargets.onSetupPasteable(clipboard.getColumns)
      });
      var column = {
        type: 'nestedmenuitem',
        text: 'Column',
        getSubmenuItems: function () {
          return 'tableinsertcolumnbefore tableinsertcolumnafter tabledeletecolumn';
        }
      };
      editor.ui.registry.addMenuItem('tablecellprops', {
        text: 'Cell properties',
        icon: 'table-cell-properties',
        onAction: cmd('mceTableCellProps'),
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addMenuItem('tablemergecells', {
        text: 'Merge cells',
        icon: 'table-merge-cells',
        onAction: cmd('mceTableMergeCells'),
        onSetup: selectionTargets.onSetupMergeable
      });
      editor.ui.registry.addMenuItem('tablesplitcells', {
        text: 'Split cell',
        icon: 'table-split-cells',
        onAction: cmd('mceTableSplitCells'),
        onSetup: selectionTargets.onSetupUnmergeable
      });
      var cell = {
        type: 'nestedmenuitem',
        text: 'Cell',
        getSubmenuItems: function () {
          return 'tablecellprops tablemergecells tablesplitcells';
        }
      };
      if (hasTableGrid(editor) === false) {
        editor.ui.registry.addMenuItem('inserttable', {
          text: 'Table',
          icon: 'table',
          onAction: cmd('mceInsertTable')
        });
      } else {
        editor.ui.registry.addNestedMenuItem('inserttable', {
          text: 'Table',
          icon: 'table',
          getSubmenuItems: function () {
            return [{
                type: 'fancymenuitem',
                fancytype: 'inserttable',
                onAction: insertTableAction
              }];
          }
        });
      }
      editor.ui.registry.addMenuItem('inserttabledialog', {
        text: 'Insert table',
        icon: 'table',
        onAction: cmd('mceInsertTable')
      });
      editor.ui.registry.addMenuItem('tableprops', tableProperties);
      editor.ui.registry.addMenuItem('deletetable', deleteTable);
      editor.ui.registry.addNestedMenuItem('row', row);
      editor.ui.registry.addNestedMenuItem('column', column);
      editor.ui.registry.addNestedMenuItem('cell', cell);
      editor.ui.registry.addContextMenu('table', {
        update: function () {
          selectionTargets.resetTargets();
          return selectionTargets.targets().fold(function () {
            return '';
          }, function (targets) {
            if (name(targets.element()) === 'caption') {
              return 'tableprops deletetable';
            } else {
              return 'cell row column | advtablesort | tableprops deletetable';
            }
          });
        }
      });
    };

    var cellFormats = {
      tablecellbackgroundcolor: {
        selector: 'td,th',
        styles: { backgroundColor: '%value' },
        remove_similar: true
      },
      tablecellbordercolor: {
        selector: 'td,th',
        styles: { borderColor: '%value' },
        remove_similar: true
      },
      tablecellborderstyle: {
        selector: 'td,th',
        styles: { borderStyle: '%value' },
        remove_similar: true
      },
      tablecellborderwidth: {
        selector: 'td,th',
        styles: { borderWidth: '%value' },
        remove_similar: true
      }
    };
    var registerFormats = function (editor) {
      editor.formatter.register(cellFormats);
    };

    function Plugin(editor) {
      var selections = Selections(editor);
      var selectionTargets = getSelectionTargets(editor, selections);
      var resizeHandler = getResizeHandler(editor);
      var cellSelection = CellSelection(editor, resizeHandler.lazyResize, selectionTargets);
      var actions = TableActions(editor, resizeHandler.lazyWire);
      var clipboard = Clipboard();
      registerCommands(editor, actions, cellSelection, selections, clipboard);
      registerQueryCommands(editor, actions, selections);
      registerEvents(editor, selections, actions, cellSelection);
      addMenuItems(editor, selectionTargets, clipboard);
      addButtons(editor, selectionTargets, clipboard);
      addToolbars(editor);
      editor.on('PreInit', function () {
        editor.serializer.addTempAttr(firstSelected);
        editor.serializer.addTempAttr(lastSelected);
        registerFormats(editor);
      });
      if (hasTabNavigation(editor)) {
        editor.on('keydown', function (e) {
          handle$1(e, editor, actions, resizeHandler.lazyWire);
        });
      }
      editor.on('remove', function () {
        resizeHandler.destroy();
      });
      return getApi(editor, clipboard, resizeHandler, selectionTargets);
    }
    function Plugin$1 () {
      global.add('table', Plugin);
    }

    Plugin$1();

}(window));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL3RhYmxlL3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHVCQUF1QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFNBQVM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsU0FBUztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLFFBQVE7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFNBQVM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsU0FBUztBQUMvQztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFNBQVM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFNBQVM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxTQUFTO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxTQUFTO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0dBQXNHOztBQUV0RztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxJQUFJO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0RBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixvQkFBb0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsNEJBQTRCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixzQkFBc0I7QUFDL0MsMkJBQTJCLHNCQUFzQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGVBQWU7QUFDcEM7QUFDQSx1QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsUUFBUTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMseUJBQXlCO0FBQzlELHVDQUF1Qyx5QkFBeUI7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQixpQkFBaUI7QUFDakIsZUFBZTtBQUNmO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFdBQVc7QUFDWCxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVCxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsaUJBQWlCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsZUFBZTs7QUFFZjtBQUNBLE9BQU8sV0FBVztBQUNsQixPQUFPLHlCQUF5QjtBQUNoQyxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNULE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLGtFQUFrRTtBQUNsRSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2IsV0FBVztBQUNYO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPLG1CQUFtQjtBQUMxQixPQUFPLG9CQUFvQjtBQUMzQixPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLFNBQVMsZUFBZTs7QUFFM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQix1QkFBdUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE9BQU8sV0FBVztBQUNsQixPQUFPLGtCQUFrQjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBeUIsU0FBUztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsK0JBQStCLGlDQUFpQztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBLDJCQUEyQix3QkFBd0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsdUJBQXVCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qjs7QUFFdkI7QUFDQSxvQ0FBb0MsWUFBWTtBQUNoRDtBQUNBO0FBQ0EscUNBQXFDLGFBQWE7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLG1CQUFtQiw0QkFBNEI7QUFDbEYsT0FBTztBQUNQO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUI7QUFDakIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLHdCQUF3QixrQkFBa0I7QUFDMUMsMEJBQTBCLGtCQUFrQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQkFBMkI7QUFDaEQ7QUFDQSx1QkFBdUIsOEJBQThCO0FBQ3JEO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHlCQUF5QjtBQUM5RCx1Q0FBdUMseUJBQXlCO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGlCQUFpQjtBQUN0Qyx1QkFBdUIseUJBQXlCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsMkJBQTJCLHlCQUF5QjtBQUNwRDtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsaUJBQWlCO0FBQzlDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsWUFBWTtBQUN4Qyw4QkFBOEIsWUFBWTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsY0FBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNULE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGFBQWE7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixpQkFBaUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25ELE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxrQkFBa0I7QUFDbEIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Qsa0JBQWtCO0FBQ2xCLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNULGtCQUFrQjtBQUNsQixTQUFTO0FBQ1QsbUNBQW1DO0FBQ25DO0FBQ0EseUVBQXlFO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLHVEQUF1RDtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLDBEQUEwRDtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTywyREFBMkQ7QUFDbEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELGNBQWM7QUFDakUsYUFBYTtBQUNiLGtEQUFrRCxlQUFlO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLHlCQUF5Qix5QkFBeUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDhCQUE4QjtBQUNyRDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxrREFBa0QsbUNBQW1DO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQ7QUFDM0QsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsYUFBYTtBQUNiLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsV0FBVztBQUNYO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTyxvQkFBb0I7QUFDM0IsT0FBTyxxQkFBcUI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsV0FBVyxlQUFlOztBQUVyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9COztBQUVwQjtBQUNBLE9BQU8sc0JBQXNCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPLG9CQUFvQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFlBQVk7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1QsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPLG9CQUFvQjtBQUMzQixPQUFPLGNBQWM7QUFDckIsT0FBTyxxQkFBcUI7QUFDNUIsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixXQUFXO0FBQ1g7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTyxXQUFXO0FBQ2xCLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsV0FBVztBQUNYLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjs7QUFFaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsZUFBZTtBQUNmO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLGNBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiw0QkFBNEI7QUFDN0M7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLGlCQUFpQix3QkFBd0I7QUFDekM7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLGlCQUFpQix3QkFBd0I7QUFDekM7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLGlCQUFpQix3QkFBd0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUMiLCJmaWxlIjoidmVuZG9yc350aW55bWNlLXBsdWdpbi10YWJsZX50aW55bWNlLXBsdWdpbi10YWJsZS1wbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqXG4gKiBWZXJzaW9uOiA1LjQuMiAoMjAyMC0wOC0xNylcbiAqL1xuKGZ1bmN0aW9uIChkb21HbG9iYWxzKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIGdsb2JhbCA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLlBsdWdpbk1hbmFnZXInKTtcblxuICAgIHZhciBub29wID0gZnVuY3Rpb24gKCkge1xuICAgIH07XG4gICAgdmFyIGNvbXBvc2UgPSBmdW5jdGlvbiAoZmEsIGZiKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmEoZmIuYXBwbHkobnVsbCwgYXJncykpO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBjb21wb3NlMSA9IGZ1bmN0aW9uIChmYmMsIGZhYikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICAgIHJldHVybiBmYmMoZmFiKGEpKTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgY29uc3RhbnQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgaWRlbnRpdHkgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgcmV0dXJuIHg7XG4gICAgfTtcbiAgICBmdW5jdGlvbiBjdXJyeShmbikge1xuICAgICAgdmFyIGluaXRpYWxBcmdzID0gW107XG4gICAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBpbml0aWFsQXJnc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXN0QXJncyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgIHJlc3RBcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFsbCA9IGluaXRpYWxBcmdzLmNvbmNhdChyZXN0QXJncyk7XG4gICAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBhbGwpO1xuICAgICAgfTtcbiAgICB9XG4gICAgdmFyIG5vdCA9IGZ1bmN0aW9uIChmKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuICFmKHQpO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBkaWUgPSBmdW5jdGlvbiAobXNnKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgbmV2ZXIgPSBjb25zdGFudChmYWxzZSk7XG4gICAgdmFyIGFsd2F5cyA9IGNvbnN0YW50KHRydWUpO1xuXG4gICAgdmFyIG5vbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gTk9ORTtcbiAgICB9O1xuICAgIHZhciBOT05FID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGVxID0gZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgcmV0dXJuIG8uaXNOb25lKCk7XG4gICAgICB9O1xuICAgICAgdmFyIGNhbGwgPSBmdW5jdGlvbiAodGh1bmspIHtcbiAgICAgICAgcmV0dXJuIHRodW5rKCk7XG4gICAgICB9O1xuICAgICAgdmFyIGlkID0gZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgcmV0dXJuIG47XG4gICAgICB9O1xuICAgICAgdmFyIG1lID0ge1xuICAgICAgICBmb2xkOiBmdW5jdGlvbiAobiwgX3MpIHtcbiAgICAgICAgICByZXR1cm4gbigpO1xuICAgICAgICB9LFxuICAgICAgICBpczogbmV2ZXIsXG4gICAgICAgIGlzU29tZTogbmV2ZXIsXG4gICAgICAgIGlzTm9uZTogYWx3YXlzLFxuICAgICAgICBnZXRPcjogaWQsXG4gICAgICAgIGdldE9yVGh1bms6IGNhbGwsXG4gICAgICAgIGdldE9yRGllOiBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyB8fCAnZXJyb3I6IGdldE9yRGllIGNhbGxlZCBvbiBub25lLicpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRPck51bGw6IGNvbnN0YW50KG51bGwpLFxuICAgICAgICBnZXRPclVuZGVmaW5lZDogY29uc3RhbnQodW5kZWZpbmVkKSxcbiAgICAgICAgb3I6IGlkLFxuICAgICAgICBvclRodW5rOiBjYWxsLFxuICAgICAgICBtYXA6IG5vbmUsXG4gICAgICAgIGVhY2g6IG5vb3AsXG4gICAgICAgIGJpbmQ6IG5vbmUsXG4gICAgICAgIGV4aXN0czogbmV2ZXIsXG4gICAgICAgIGZvcmFsbDogYWx3YXlzLFxuICAgICAgICBmaWx0ZXI6IG5vbmUsXG4gICAgICAgIGVxdWFsczogZXEsXG4gICAgICAgIGVxdWFsc186IGVxLFxuICAgICAgICB0b0FycmF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9LFxuICAgICAgICB0b1N0cmluZzogY29uc3RhbnQoJ25vbmUoKScpXG4gICAgICB9O1xuICAgICAgcmV0dXJuIG1lO1xuICAgIH0oKTtcbiAgICB2YXIgc29tZSA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICB2YXIgY29uc3RhbnRfYSA9IGNvbnN0YW50KGEpO1xuICAgICAgdmFyIHNlbGYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBtZTtcbiAgICAgIH07XG4gICAgICB2YXIgYmluZCA9IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHJldHVybiBmKGEpO1xuICAgICAgfTtcbiAgICAgIHZhciBtZSA9IHtcbiAgICAgICAgZm9sZDogZnVuY3Rpb24gKG4sIHMpIHtcbiAgICAgICAgICByZXR1cm4gcyhhKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXM6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgcmV0dXJuIGEgPT09IHY7XG4gICAgICAgIH0sXG4gICAgICAgIGlzU29tZTogYWx3YXlzLFxuICAgICAgICBpc05vbmU6IG5ldmVyLFxuICAgICAgICBnZXRPcjogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JUaHVuazogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JEaWU6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yTnVsbDogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JVbmRlZmluZWQ6IGNvbnN0YW50X2EsXG4gICAgICAgIG9yOiBzZWxmLFxuICAgICAgICBvclRodW5rOiBzZWxmLFxuICAgICAgICBtYXA6IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgcmV0dXJuIHNvbWUoZihhKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVhY2g6IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgZihhKTtcbiAgICAgICAgfSxcbiAgICAgICAgYmluZDogYmluZCxcbiAgICAgICAgZXhpc3RzOiBiaW5kLFxuICAgICAgICBmb3JhbGw6IGJpbmQsXG4gICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICByZXR1cm4gZihhKSA/IG1lIDogTk9ORTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9BcnJheTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBbYV07XG4gICAgICAgIH0sXG4gICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuICdzb21lKCcgKyBhICsgJyknO1xuICAgICAgICB9LFxuICAgICAgICBlcXVhbHM6IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgICAgcmV0dXJuIG8uaXMoYSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVxdWFsc186IGZ1bmN0aW9uIChvLCBlbGVtZW50RXEpIHtcbiAgICAgICAgICByZXR1cm4gby5mb2xkKG5ldmVyLCBmdW5jdGlvbiAoYikge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRFcShhLCBiKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiBtZTtcbiAgICB9O1xuICAgIHZhciBmcm9tID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCA/IE5PTkUgOiBzb21lKHZhbHVlKTtcbiAgICB9O1xuICAgIHZhciBPcHRpb24gPSB7XG4gICAgICBzb21lOiBzb21lLFxuICAgICAgbm9uZTogbm9uZSxcbiAgICAgIGZyb206IGZyb21cbiAgICB9O1xuXG4gICAgdmFyIHR5cGVPZiA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICB2YXIgdCA9IHR5cGVvZiB4O1xuICAgICAgaWYgKHggPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICdudWxsJztcbiAgICAgIH0gZWxzZSBpZiAodCA9PT0gJ29iamVjdCcgJiYgKEFycmF5LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKHgpIHx8IHguY29uc3RydWN0b3IgJiYgeC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnQXJyYXknKSkge1xuICAgICAgICByZXR1cm4gJ2FycmF5JztcbiAgICAgIH0gZWxzZSBpZiAodCA9PT0gJ29iamVjdCcgJiYgKFN0cmluZy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZih4KSB8fCB4LmNvbnN0cnVjdG9yICYmIHguY29uc3RydWN0b3IubmFtZSA9PT0gJ1N0cmluZycpKSB7XG4gICAgICAgIHJldHVybiAnc3RyaW5nJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0O1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGlzVHlwZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0eXBlT2YodmFsdWUpID09PSB0eXBlO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBpc1NpbXBsZVR5cGUgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSB0eXBlO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBpc1N0cmluZyA9IGlzVHlwZSgnc3RyaW5nJyk7XG4gICAgdmFyIGlzT2JqZWN0ID0gaXNUeXBlKCdvYmplY3QnKTtcbiAgICB2YXIgaXNBcnJheSA9IGlzVHlwZSgnYXJyYXknKTtcbiAgICB2YXIgaXNCb29sZWFuID0gaXNTaW1wbGVUeXBlKCdib29sZWFuJyk7XG4gICAgdmFyIGlzTnVsbGFibGUgPSBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGEgPT09IG51bGwgfHwgYSA9PT0gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgdmFyIGlzTm9uTnVsbGFibGUgPSBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuICFpc051bGxhYmxlKGEpO1xuICAgIH07XG4gICAgdmFyIGlzRnVuY3Rpb24gPSBpc1NpbXBsZVR5cGUoJ2Z1bmN0aW9uJyk7XG4gICAgdmFyIGlzTnVtYmVyID0gaXNTaW1wbGVUeXBlKCdudW1iZXInKTtcblxuICAgIHZhciBuYXRpdmVTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbiAgICB2YXIgbmF0aXZlSW5kZXhPZiA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mO1xuICAgIHZhciBuYXRpdmVQdXNoID0gQXJyYXkucHJvdG90eXBlLnB1c2g7XG4gICAgdmFyIHJhd0luZGV4T2YgPSBmdW5jdGlvbiAodHMsIHQpIHtcbiAgICAgIHJldHVybiBuYXRpdmVJbmRleE9mLmNhbGwodHMsIHQpO1xuICAgIH07XG4gICAgdmFyIGNvbnRhaW5zID0gZnVuY3Rpb24gKHhzLCB4KSB7XG4gICAgICByZXR1cm4gcmF3SW5kZXhPZih4cywgeCkgPiAtMTtcbiAgICB9O1xuICAgIHZhciBleGlzdHMgPSBmdW5jdGlvbiAoeHMsIHByZWQpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB4cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgeCA9IHhzW2ldO1xuICAgICAgICBpZiAocHJlZCh4LCBpKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICB2YXIgcmFuZ2UgPSBmdW5jdGlvbiAobnVtLCBmKSB7XG4gICAgICB2YXIgciA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgICAgICByLnB1c2goZihpKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcjtcbiAgICB9O1xuICAgIHZhciBtYXAgPSBmdW5jdGlvbiAoeHMsIGYpIHtcbiAgICAgIHZhciBsZW4gPSB4cy5sZW5ndGg7XG4gICAgICB2YXIgciA9IG5ldyBBcnJheShsZW4pO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgeCA9IHhzW2ldO1xuICAgICAgICByW2ldID0gZih4LCBpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByO1xuICAgIH07XG4gICAgdmFyIGVhY2ggPSBmdW5jdGlvbiAoeHMsIGYpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB4cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgeCA9IHhzW2ldO1xuICAgICAgICBmKHgsIGkpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGVhY2hyID0gZnVuY3Rpb24gKHhzLCBmKSB7XG4gICAgICBmb3IgKHZhciBpID0geHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgdmFyIHggPSB4c1tpXTtcbiAgICAgICAgZih4LCBpKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBmaWx0ZXIgPSBmdW5jdGlvbiAoeHMsIHByZWQpIHtcbiAgICAgIHZhciByID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0geHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHggPSB4c1tpXTtcbiAgICAgICAgaWYgKHByZWQoeCwgaSkpIHtcbiAgICAgICAgICByLnB1c2goeCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByO1xuICAgIH07XG4gICAgdmFyIGZvbGRyID0gZnVuY3Rpb24gKHhzLCBmLCBhY2MpIHtcbiAgICAgIGVhY2hyKHhzLCBmdW5jdGlvbiAoeCkge1xuICAgICAgICBhY2MgPSBmKGFjYywgeCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfTtcbiAgICB2YXIgZm9sZGwgPSBmdW5jdGlvbiAoeHMsIGYsIGFjYykge1xuICAgICAgZWFjaCh4cywgZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgYWNjID0gZihhY2MsIHgpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH07XG4gICAgdmFyIGZpbmRVbnRpbCA9IGZ1bmN0aW9uICh4cywgcHJlZCwgdW50aWwpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB4cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgeCA9IHhzW2ldO1xuICAgICAgICBpZiAocHJlZCh4LCBpKSkge1xuICAgICAgICAgIHJldHVybiBPcHRpb24uc29tZSh4KTtcbiAgICAgICAgfSBlbHNlIGlmICh1bnRpbCh4LCBpKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gT3B0aW9uLm5vbmUoKTtcbiAgICB9O1xuICAgIHZhciBmaW5kID0gZnVuY3Rpb24gKHhzLCBwcmVkKSB7XG4gICAgICByZXR1cm4gZmluZFVudGlsKHhzLCBwcmVkLCBuZXZlcik7XG4gICAgfTtcbiAgICB2YXIgZmluZEluZGV4ID0gZnVuY3Rpb24gKHhzLCBwcmVkKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0geHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHggPSB4c1tpXTtcbiAgICAgICAgaWYgKHByZWQoeCwgaSkpIHtcbiAgICAgICAgICByZXR1cm4gT3B0aW9uLnNvbWUoaSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgIH07XG4gICAgdmFyIGZsYXR0ZW4gPSBmdW5jdGlvbiAoeHMpIHtcbiAgICAgIHZhciByID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0geHMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgaWYgKCFpc0FycmF5KHhzW2ldKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXJyLmZsYXR0ZW4gaXRlbSAnICsgaSArICcgd2FzIG5vdCBhbiBhcnJheSwgaW5wdXQ6ICcgKyB4cyk7XG4gICAgICAgIH1cbiAgICAgICAgbmF0aXZlUHVzaC5hcHBseShyLCB4c1tpXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcjtcbiAgICB9O1xuICAgIHZhciBiaW5kID0gZnVuY3Rpb24gKHhzLCBmKSB7XG4gICAgICByZXR1cm4gZmxhdHRlbihtYXAoeHMsIGYpKTtcbiAgICB9O1xuICAgIHZhciBmb3JhbGwgPSBmdW5jdGlvbiAoeHMsIHByZWQpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB4cy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICB2YXIgeCA9IHhzW2ldO1xuICAgICAgICBpZiAocHJlZCh4LCBpKSAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICB2YXIgcmV2ZXJzZSA9IGZ1bmN0aW9uICh4cykge1xuICAgICAgdmFyIHIgPSBuYXRpdmVTbGljZS5jYWxsKHhzLCAwKTtcbiAgICAgIHIucmV2ZXJzZSgpO1xuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcbiAgICB2YXIgaGVhZCA9IGZ1bmN0aW9uICh4cykge1xuICAgICAgcmV0dXJuIHhzLmxlbmd0aCA9PT0gMCA/IE9wdGlvbi5ub25lKCkgOiBPcHRpb24uc29tZSh4c1swXSk7XG4gICAgfTtcbiAgICB2YXIgbGFzdCA9IGZ1bmN0aW9uICh4cykge1xuICAgICAgcmV0dXJuIHhzLmxlbmd0aCA9PT0gMCA/IE9wdGlvbi5ub25lKCkgOiBPcHRpb24uc29tZSh4c1t4cy5sZW5ndGggLSAxXSk7XG4gICAgfTtcbiAgICB2YXIgZmluZE1hcCA9IGZ1bmN0aW9uIChhcnIsIGYpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciByID0gZihhcnJbaV0sIGkpO1xuICAgICAgICBpZiAoci5pc1NvbWUoKSkge1xuICAgICAgICAgIHJldHVybiByO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gT3B0aW9uLm5vbmUoKTtcbiAgICB9O1xuXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cztcbiAgICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QuaGFzT3duUHJvcGVydHk7XG4gICAgdmFyIGVhY2gkMSA9IGZ1bmN0aW9uIChvYmosIGYpIHtcbiAgICAgIHZhciBwcm9wcyA9IGtleXMob2JqKTtcbiAgICAgIGZvciAodmFyIGsgPSAwLCBsZW4gPSBwcm9wcy5sZW5ndGg7IGsgPCBsZW47IGsrKykge1xuICAgICAgICB2YXIgaSA9IHByb3BzW2tdO1xuICAgICAgICB2YXIgeCA9IG9ialtpXTtcbiAgICAgICAgZih4LCBpKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBtYXAkMSA9IGZ1bmN0aW9uIChvYmosIGYpIHtcbiAgICAgIHJldHVybiB0dXBsZU1hcChvYmosIGZ1bmN0aW9uICh4LCBpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgazogaSxcbiAgICAgICAgICB2OiBmKHgsIGkpXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciB0dXBsZU1hcCA9IGZ1bmN0aW9uIChvYmosIGYpIHtcbiAgICAgIHZhciByID0ge307XG4gICAgICBlYWNoJDEob2JqLCBmdW5jdGlvbiAoeCwgaSkge1xuICAgICAgICB2YXIgdHVwbGUgPSBmKHgsIGkpO1xuICAgICAgICByW3R1cGxlLmtdID0gdHVwbGUudjtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcbiAgICB2YXIgb2JqQWNjID0gZnVuY3Rpb24gKHIpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoeCwgaSkge1xuICAgICAgICByW2ldID0geDtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgaW50ZXJuYWxGaWx0ZXIgPSBmdW5jdGlvbiAob2JqLCBwcmVkLCBvblRydWUsIG9uRmFsc2UpIHtcbiAgICAgIHZhciByID0ge307XG4gICAgICBlYWNoJDEob2JqLCBmdW5jdGlvbiAoeCwgaSkge1xuICAgICAgICAocHJlZCh4LCBpKSA/IG9uVHJ1ZSA6IG9uRmFsc2UpKHgsIGkpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcjtcbiAgICB9O1xuICAgIHZhciBmaWx0ZXIkMSA9IGZ1bmN0aW9uIChvYmosIHByZWQpIHtcbiAgICAgIHZhciB0ID0ge307XG4gICAgICBpbnRlcm5hbEZpbHRlcihvYmosIHByZWQsIG9iakFjYyh0KSwgbm9vcCk7XG4gICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHZhciBnZXQgPSBmdW5jdGlvbiAob2JqLCBrZXkpIHtcbiAgICAgIHJldHVybiBoYXMob2JqLCBrZXkpID8gT3B0aW9uLmZyb20ob2JqW2tleV0pIDogT3B0aW9uLm5vbmUoKTtcbiAgICB9O1xuICAgIHZhciBoYXMgPSBmdW5jdGlvbiAob2JqLCBrZXkpIHtcbiAgICAgIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbiAgICB9O1xuXG4gICAgdmFyIEdsb2JhbCA9IHR5cGVvZiBkb21HbG9iYWxzLndpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyBkb21HbG9iYWxzLndpbmRvdyA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpczsnKSgpO1xuXG4gICAgdmFyIENPTU1FTlQgPSA4O1xuICAgIHZhciBET0NVTUVOVCA9IDk7XG4gICAgdmFyIERPQ1VNRU5UX0ZSQUdNRU5UID0gMTE7XG4gICAgdmFyIEVMRU1FTlQgPSAxO1xuICAgIHZhciBURVhUID0gMztcblxuICAgIHZhciBuYW1lID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHZhciByID0gZWxlbWVudC5kb20oKS5ub2RlTmFtZTtcbiAgICAgIHJldHVybiByLnRvTG93ZXJDYXNlKCk7XG4gICAgfTtcbiAgICB2YXIgdHlwZSA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gZWxlbWVudC5kb20oKS5ub2RlVHlwZTtcbiAgICB9O1xuICAgIHZhciBpc1R5cGUkMSA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHR5cGUoZWxlbWVudCkgPT09IHQ7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGlzQ29tbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gdHlwZShlbGVtZW50KSA9PT0gQ09NTUVOVCB8fCBuYW1lKGVsZW1lbnQpID09PSAnI2NvbW1lbnQnO1xuICAgIH07XG4gICAgdmFyIGlzRWxlbWVudCA9IGlzVHlwZSQxKEVMRU1FTlQpO1xuICAgIHZhciBpc1RleHQgPSBpc1R5cGUkMShURVhUKTtcbiAgICB2YXIgaXNEb2N1bWVudCA9IGlzVHlwZSQxKERPQ1VNRU5UKTtcbiAgICB2YXIgaXNEb2N1bWVudEZyYWdtZW50ID0gaXNUeXBlJDEoRE9DVU1FTlRfRlJBR01FTlQpO1xuXG4gICAgdmFyIHJhd1NldCA9IGZ1bmN0aW9uIChkb20sIGtleSwgdmFsdWUpIHtcbiAgICAgIGlmIChpc1N0cmluZyh2YWx1ZSkgfHwgaXNCb29sZWFuKHZhbHVlKSB8fCBpc051bWJlcih2YWx1ZSkpIHtcbiAgICAgICAgZG9tLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlICsgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9tR2xvYmFscy5jb25zb2xlLmVycm9yKCdJbnZhbGlkIGNhbGwgdG8gQXR0ci5zZXQuIEtleSAnLCBrZXksICc6OiBWYWx1ZSAnLCB2YWx1ZSwgJzo6IEVsZW1lbnQgJywgZG9tKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdHRyaWJ1dGUgdmFsdWUgd2FzIG5vdCBzaW1wbGUnKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBzZXQgPSBmdW5jdGlvbiAoZWxlbWVudCwga2V5LCB2YWx1ZSkge1xuICAgICAgcmF3U2V0KGVsZW1lbnQuZG9tKCksIGtleSwgdmFsdWUpO1xuICAgIH07XG4gICAgdmFyIHNldEFsbCA9IGZ1bmN0aW9uIChlbGVtZW50LCBhdHRycykge1xuICAgICAgdmFyIGRvbSA9IGVsZW1lbnQuZG9tKCk7XG4gICAgICBlYWNoJDEoYXR0cnMsIGZ1bmN0aW9uICh2LCBrKSB7XG4gICAgICAgIHJhd1NldChkb20sIGssIHYpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgZ2V0JDEgPSBmdW5jdGlvbiAoZWxlbWVudCwga2V5KSB7XG4gICAgICB2YXIgdiA9IGVsZW1lbnQuZG9tKCkuZ2V0QXR0cmlidXRlKGtleSk7XG4gICAgICByZXR1cm4gdiA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IHY7XG4gICAgfTtcbiAgICB2YXIgZ2V0T3B0ID0gZnVuY3Rpb24gKGVsZW1lbnQsIGtleSkge1xuICAgICAgcmV0dXJuIE9wdGlvbi5mcm9tKGdldCQxKGVsZW1lbnQsIGtleSkpO1xuICAgIH07XG4gICAgdmFyIGhhcyQxID0gZnVuY3Rpb24gKGVsZW1lbnQsIGtleSkge1xuICAgICAgdmFyIGRvbSA9IGVsZW1lbnQuZG9tKCk7XG4gICAgICByZXR1cm4gZG9tICYmIGRvbS5oYXNBdHRyaWJ1dGUgPyBkb20uaGFzQXR0cmlidXRlKGtleSkgOiBmYWxzZTtcbiAgICB9O1xuICAgIHZhciByZW1vdmUgPSBmdW5jdGlvbiAoZWxlbWVudCwga2V5KSB7XG4gICAgICBlbGVtZW50LmRvbSgpLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xuICAgIH07XG4gICAgdmFyIGNsb25lID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBmb2xkbChlbGVtZW50LmRvbSgpLmF0dHJpYnV0ZXMsIGZ1bmN0aW9uIChhY2MsIGF0dHIpIHtcbiAgICAgICAgYWNjW2F0dHIubmFtZV0gPSBhdHRyLnZhbHVlO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30pO1xuICAgIH07XG5cbiAgICB2YXIgY2hlY2tSYW5nZSA9IGZ1bmN0aW9uIChzdHIsIHN1YnN0ciwgc3RhcnQpIHtcbiAgICAgIHJldHVybiBzdWJzdHIgPT09ICcnIHx8IHN0ci5sZW5ndGggPj0gc3Vic3RyLmxlbmd0aCAmJiBzdHIuc3Vic3RyKHN0YXJ0LCBzdGFydCArIHN1YnN0ci5sZW5ndGgpID09PSBzdWJzdHI7XG4gICAgfTtcbiAgICB2YXIgY29udGFpbnMkMSA9IGZ1bmN0aW9uIChzdHIsIHN1YnN0cikge1xuICAgICAgcmV0dXJuIHN0ci5pbmRleE9mKHN1YnN0cikgIT09IC0xO1xuICAgIH07XG4gICAgdmFyIHN0YXJ0c1dpdGggPSBmdW5jdGlvbiAoc3RyLCBwcmVmaXgpIHtcbiAgICAgIHJldHVybiBjaGVja1JhbmdlKHN0ciwgcHJlZml4LCAwKTtcbiAgICB9O1xuICAgIHZhciBlbmRzV2l0aCA9IGZ1bmN0aW9uIChzdHIsIHN1ZmZpeCkge1xuICAgICAgcmV0dXJuIGNoZWNrUmFuZ2Uoc3RyLCBzdWZmaXgsIHN0ci5sZW5ndGggLSBzdWZmaXgubGVuZ3RoKTtcbiAgICB9O1xuICAgIHZhciBibGFuayA9IGZ1bmN0aW9uIChyKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgcmV0dXJuIHMucmVwbGFjZShyLCAnJyk7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHRyaW0gPSBibGFuaygvXlxccyt8XFxzKyQvZyk7XG4gICAgdmFyIGlzTm90RW1wdHkgPSBmdW5jdGlvbiAocykge1xuICAgICAgcmV0dXJuIHMubGVuZ3RoID4gMDtcbiAgICB9O1xuXG4gICAgdmFyIGlzU3VwcG9ydGVkID0gZnVuY3Rpb24gKGRvbSkge1xuICAgICAgcmV0dXJuIGRvbS5zdHlsZSAhPT0gdW5kZWZpbmVkICYmIGlzRnVuY3Rpb24oZG9tLnN0eWxlLmdldFByb3BlcnR5VmFsdWUpO1xuICAgIH07XG5cbiAgICB2YXIgZnJvbUh0bWwgPSBmdW5jdGlvbiAoaHRtbCwgc2NvcGUpIHtcbiAgICAgIHZhciBkb2MgPSBzY29wZSB8fCBkb21HbG9iYWxzLmRvY3VtZW50O1xuICAgICAgdmFyIGRpdiA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGRpdi5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgaWYgKCFkaXYuaGFzQ2hpbGROb2RlcygpIHx8IGRpdi5jaGlsZE5vZGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZG9tR2xvYmFscy5jb25zb2xlLmVycm9yKCdIVE1MIGRvZXMgbm90IGhhdmUgYSBzaW5nbGUgcm9vdCBub2RlJywgaHRtbCk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSFRNTCBtdXN0IGhhdmUgYSBzaW5nbGUgcm9vdCBub2RlJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZnJvbURvbShkaXYuY2hpbGROb2Rlc1swXSk7XG4gICAgfTtcbiAgICB2YXIgZnJvbVRhZyA9IGZ1bmN0aW9uICh0YWcsIHNjb3BlKSB7XG4gICAgICB2YXIgZG9jID0gc2NvcGUgfHwgZG9tR2xvYmFscy5kb2N1bWVudDtcbiAgICAgIHZhciBub2RlID0gZG9jLmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAgIHJldHVybiBmcm9tRG9tKG5vZGUpO1xuICAgIH07XG4gICAgdmFyIGZyb21UZXh0ID0gZnVuY3Rpb24gKHRleHQsIHNjb3BlKSB7XG4gICAgICB2YXIgZG9jID0gc2NvcGUgfHwgZG9tR2xvYmFscy5kb2N1bWVudDtcbiAgICAgIHZhciBub2RlID0gZG9jLmNyZWF0ZVRleHROb2RlKHRleHQpO1xuICAgICAgcmV0dXJuIGZyb21Eb20obm9kZSk7XG4gICAgfTtcbiAgICB2YXIgZnJvbURvbSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICBpZiAobm9kZSA9PT0gbnVsbCB8fCBub2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb2RlIGNhbm5vdCBiZSBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgZG9tOiBjb25zdGFudChub2RlKSB9O1xuICAgIH07XG4gICAgdmFyIGZyb21Qb2ludCA9IGZ1bmN0aW9uIChkb2NFbG0sIHgsIHkpIHtcbiAgICAgIHZhciBkb2MgPSBkb2NFbG0uZG9tKCk7XG4gICAgICByZXR1cm4gT3B0aW9uLmZyb20oZG9jLmVsZW1lbnRGcm9tUG9pbnQoeCwgeSkpLm1hcChmcm9tRG9tKTtcbiAgICB9O1xuICAgIHZhciBFbGVtZW50ID0ge1xuICAgICAgZnJvbUh0bWw6IGZyb21IdG1sLFxuICAgICAgZnJvbVRhZzogZnJvbVRhZyxcbiAgICAgIGZyb21UZXh0OiBmcm9tVGV4dCxcbiAgICAgIGZyb21Eb206IGZyb21Eb20sXG4gICAgICBmcm9tUG9pbnQ6IGZyb21Qb2ludFxuICAgIH07XG5cbiAgICB2YXIgY29tcGFyZURvY3VtZW50UG9zaXRpb24gPSBmdW5jdGlvbiAoYSwgYiwgbWF0Y2gpIHtcbiAgICAgIHJldHVybiAoYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihiKSAmIG1hdGNoKSAhPT0gMDtcbiAgICB9O1xuICAgIHZhciBkb2N1bWVudFBvc2l0aW9uQ29udGFpbmVkQnkgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKGEsIGIsIGRvbUdsb2JhbHMuTm9kZS5ET0NVTUVOVF9QT1NJVElPTl9DT05UQUlORURfQlkpO1xuICAgIH07XG5cbiAgICB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgIGZvciAodmFyIHAgaW4gcylcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgICAgfTtcbiAgICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICB2YXIgY2FjaGVkID0gZnVuY3Rpb24gKGYpIHtcbiAgICAgIHZhciBjYWxsZWQgPSBmYWxzZTtcbiAgICAgIHZhciByO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjYWxsZWQpIHtcbiAgICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgICAgIHIgPSBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByO1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIGZpcnN0TWF0Y2ggPSBmdW5jdGlvbiAocmVnZXhlcywgcykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWdleGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB4ID0gcmVnZXhlc1tpXTtcbiAgICAgICAgaWYgKHgudGVzdChzKSkge1xuICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgdmFyIGZpbmQkMSA9IGZ1bmN0aW9uIChyZWdleGVzLCBhZ2VudCkge1xuICAgICAgdmFyIHIgPSBmaXJzdE1hdGNoKHJlZ2V4ZXMsIGFnZW50KTtcbiAgICAgIGlmICghcikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG1ham9yOiAwLFxuICAgICAgICAgIG1pbm9yOiAwXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICB2YXIgZ3JvdXAgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICByZXR1cm4gTnVtYmVyKGFnZW50LnJlcGxhY2UociwgJyQnICsgaSkpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBudShncm91cCgxKSwgZ3JvdXAoMikpO1xuICAgIH07XG4gICAgdmFyIGRldGVjdCA9IGZ1bmN0aW9uICh2ZXJzaW9uUmVnZXhlcywgYWdlbnQpIHtcbiAgICAgIHZhciBjbGVhbmVkQWdlbnQgPSBTdHJpbmcoYWdlbnQpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAodmVyc2lvblJlZ2V4ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiB1bmtub3duKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmluZCQxKHZlcnNpb25SZWdleGVzLCBjbGVhbmVkQWdlbnQpO1xuICAgIH07XG4gICAgdmFyIHVua25vd24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbnUoMCwgMCk7XG4gICAgfTtcbiAgICB2YXIgbnUgPSBmdW5jdGlvbiAobWFqb3IsIG1pbm9yKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtYWpvcjogbWFqb3IsXG4gICAgICAgIG1pbm9yOiBtaW5vclxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBWZXJzaW9uID0ge1xuICAgICAgbnU6IG51LFxuICAgICAgZGV0ZWN0OiBkZXRlY3QsXG4gICAgICB1bmtub3duOiB1bmtub3duXG4gICAgfTtcblxuICAgIHZhciBlZGdlID0gJ0VkZ2UnO1xuICAgIHZhciBjaHJvbWUgPSAnQ2hyb21lJztcbiAgICB2YXIgaWUgPSAnSUUnO1xuICAgIHZhciBvcGVyYSA9ICdPcGVyYSc7XG4gICAgdmFyIGZpcmVmb3ggPSAnRmlyZWZveCc7XG4gICAgdmFyIHNhZmFyaSA9ICdTYWZhcmknO1xuICAgIHZhciB1bmtub3duJDEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbnUkMSh7XG4gICAgICAgIGN1cnJlbnQ6IHVuZGVmaW5lZCxcbiAgICAgICAgdmVyc2lvbjogVmVyc2lvbi51bmtub3duKClcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIG51JDEgPSBmdW5jdGlvbiAoaW5mbykge1xuICAgICAgdmFyIGN1cnJlbnQgPSBpbmZvLmN1cnJlbnQ7XG4gICAgICB2YXIgdmVyc2lvbiA9IGluZm8udmVyc2lvbjtcbiAgICAgIHZhciBpc0Jyb3dzZXIgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBjdXJyZW50ID09PSBuYW1lO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGN1cnJlbnQ6IGN1cnJlbnQsXG4gICAgICAgIHZlcnNpb246IHZlcnNpb24sXG4gICAgICAgIGlzRWRnZTogaXNCcm93c2VyKGVkZ2UpLFxuICAgICAgICBpc0Nocm9tZTogaXNCcm93c2VyKGNocm9tZSksXG4gICAgICAgIGlzSUU6IGlzQnJvd3NlcihpZSksXG4gICAgICAgIGlzT3BlcmE6IGlzQnJvd3NlcihvcGVyYSksXG4gICAgICAgIGlzRmlyZWZveDogaXNCcm93c2VyKGZpcmVmb3gpLFxuICAgICAgICBpc1NhZmFyaTogaXNCcm93c2VyKHNhZmFyaSlcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgQnJvd3NlciA9IHtcbiAgICAgIHVua25vd246IHVua25vd24kMSxcbiAgICAgIG51OiBudSQxLFxuICAgICAgZWRnZTogY29uc3RhbnQoZWRnZSksXG4gICAgICBjaHJvbWU6IGNvbnN0YW50KGNocm9tZSksXG4gICAgICBpZTogY29uc3RhbnQoaWUpLFxuICAgICAgb3BlcmE6IGNvbnN0YW50KG9wZXJhKSxcbiAgICAgIGZpcmVmb3g6IGNvbnN0YW50KGZpcmVmb3gpLFxuICAgICAgc2FmYXJpOiBjb25zdGFudChzYWZhcmkpXG4gICAgfTtcblxuICAgIHZhciB3aW5kb3dzID0gJ1dpbmRvd3MnO1xuICAgIHZhciBpb3MgPSAnaU9TJztcbiAgICB2YXIgYW5kcm9pZCA9ICdBbmRyb2lkJztcbiAgICB2YXIgbGludXggPSAnTGludXgnO1xuICAgIHZhciBvc3ggPSAnT1NYJztcbiAgICB2YXIgc29sYXJpcyA9ICdTb2xhcmlzJztcbiAgICB2YXIgZnJlZWJzZCA9ICdGcmVlQlNEJztcbiAgICB2YXIgY2hyb21lb3MgPSAnQ2hyb21lT1MnO1xuICAgIHZhciB1bmtub3duJDIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbnUkMih7XG4gICAgICAgIGN1cnJlbnQ6IHVuZGVmaW5lZCxcbiAgICAgICAgdmVyc2lvbjogVmVyc2lvbi51bmtub3duKClcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIG51JDIgPSBmdW5jdGlvbiAoaW5mbykge1xuICAgICAgdmFyIGN1cnJlbnQgPSBpbmZvLmN1cnJlbnQ7XG4gICAgICB2YXIgdmVyc2lvbiA9IGluZm8udmVyc2lvbjtcbiAgICAgIHZhciBpc09TID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gY3VycmVudCA9PT0gbmFtZTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjdXJyZW50OiBjdXJyZW50LFxuICAgICAgICB2ZXJzaW9uOiB2ZXJzaW9uLFxuICAgICAgICBpc1dpbmRvd3M6IGlzT1Mod2luZG93cyksXG4gICAgICAgIGlzaU9TOiBpc09TKGlvcyksXG4gICAgICAgIGlzQW5kcm9pZDogaXNPUyhhbmRyb2lkKSxcbiAgICAgICAgaXNPU1g6IGlzT1Mob3N4KSxcbiAgICAgICAgaXNMaW51eDogaXNPUyhsaW51eCksXG4gICAgICAgIGlzU29sYXJpczogaXNPUyhzb2xhcmlzKSxcbiAgICAgICAgaXNGcmVlQlNEOiBpc09TKGZyZWVic2QpLFxuICAgICAgICBpc0Nocm9tZU9TOiBpc09TKGNocm9tZW9zKVxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBPcGVyYXRpbmdTeXN0ZW0gPSB7XG4gICAgICB1bmtub3duOiB1bmtub3duJDIsXG4gICAgICBudTogbnUkMixcbiAgICAgIHdpbmRvd3M6IGNvbnN0YW50KHdpbmRvd3MpLFxuICAgICAgaW9zOiBjb25zdGFudChpb3MpLFxuICAgICAgYW5kcm9pZDogY29uc3RhbnQoYW5kcm9pZCksXG4gICAgICBsaW51eDogY29uc3RhbnQobGludXgpLFxuICAgICAgb3N4OiBjb25zdGFudChvc3gpLFxuICAgICAgc29sYXJpczogY29uc3RhbnQoc29sYXJpcyksXG4gICAgICBmcmVlYnNkOiBjb25zdGFudChmcmVlYnNkKSxcbiAgICAgIGNocm9tZW9zOiBjb25zdGFudChjaHJvbWVvcylcbiAgICB9O1xuXG4gICAgdmFyIERldmljZVR5cGUgPSBmdW5jdGlvbiAob3MsIGJyb3dzZXIsIHVzZXJBZ2VudCwgbWVkaWFNYXRjaCkge1xuICAgICAgdmFyIGlzaVBhZCA9IG9zLmlzaU9TKCkgJiYgL2lwYWQvaS50ZXN0KHVzZXJBZ2VudCkgPT09IHRydWU7XG4gICAgICB2YXIgaXNpUGhvbmUgPSBvcy5pc2lPUygpICYmICFpc2lQYWQ7XG4gICAgICB2YXIgaXNNb2JpbGUgPSBvcy5pc2lPUygpIHx8IG9zLmlzQW5kcm9pZCgpO1xuICAgICAgdmFyIGlzVG91Y2ggPSBpc01vYmlsZSB8fCBtZWRpYU1hdGNoKCcocG9pbnRlcjpjb2Fyc2UpJyk7XG4gICAgICB2YXIgaXNUYWJsZXQgPSBpc2lQYWQgfHwgIWlzaVBob25lICYmIGlzTW9iaWxlICYmIG1lZGlhTWF0Y2goJyhtaW4tZGV2aWNlLXdpZHRoOjc2OHB4KScpO1xuICAgICAgdmFyIGlzUGhvbmUgPSBpc2lQaG9uZSB8fCBpc01vYmlsZSAmJiAhaXNUYWJsZXQ7XG4gICAgICB2YXIgaU9Td2VidmlldyA9IGJyb3dzZXIuaXNTYWZhcmkoKSAmJiBvcy5pc2lPUygpICYmIC9zYWZhcmkvaS50ZXN0KHVzZXJBZ2VudCkgPT09IGZhbHNlO1xuICAgICAgdmFyIGlzRGVza3RvcCA9ICFpc1Bob25lICYmICFpc1RhYmxldCAmJiAhaU9Td2VidmlldztcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzaVBhZDogY29uc3RhbnQoaXNpUGFkKSxcbiAgICAgICAgaXNpUGhvbmU6IGNvbnN0YW50KGlzaVBob25lKSxcbiAgICAgICAgaXNUYWJsZXQ6IGNvbnN0YW50KGlzVGFibGV0KSxcbiAgICAgICAgaXNQaG9uZTogY29uc3RhbnQoaXNQaG9uZSksXG4gICAgICAgIGlzVG91Y2g6IGNvbnN0YW50KGlzVG91Y2gpLFxuICAgICAgICBpc0FuZHJvaWQ6IG9zLmlzQW5kcm9pZCxcbiAgICAgICAgaXNpT1M6IG9zLmlzaU9TLFxuICAgICAgICBpc1dlYlZpZXc6IGNvbnN0YW50KGlPU3dlYnZpZXcpLFxuICAgICAgICBpc0Rlc2t0b3A6IGNvbnN0YW50KGlzRGVza3RvcClcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciBkZXRlY3QkMSA9IGZ1bmN0aW9uIChjYW5kaWRhdGVzLCB1c2VyQWdlbnQpIHtcbiAgICAgIHZhciBhZ2VudCA9IFN0cmluZyh1c2VyQWdlbnQpLnRvTG93ZXJDYXNlKCk7XG4gICAgICByZXR1cm4gZmluZChjYW5kaWRhdGVzLCBmdW5jdGlvbiAoY2FuZGlkYXRlKSB7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUuc2VhcmNoKGFnZW50KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGRldGVjdEJyb3dzZXIgPSBmdW5jdGlvbiAoYnJvd3NlcnMsIHVzZXJBZ2VudCkge1xuICAgICAgcmV0dXJuIGRldGVjdCQxKGJyb3dzZXJzLCB1c2VyQWdlbnQpLm1hcChmdW5jdGlvbiAoYnJvd3Nlcikge1xuICAgICAgICB2YXIgdmVyc2lvbiA9IFZlcnNpb24uZGV0ZWN0KGJyb3dzZXIudmVyc2lvblJlZ2V4ZXMsIHVzZXJBZ2VudCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY3VycmVudDogYnJvd3Nlci5uYW1lLFxuICAgICAgICAgIHZlcnNpb246IHZlcnNpb25cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGRldGVjdE9zID0gZnVuY3Rpb24gKG9zZXMsIHVzZXJBZ2VudCkge1xuICAgICAgcmV0dXJuIGRldGVjdCQxKG9zZXMsIHVzZXJBZ2VudCkubWFwKGZ1bmN0aW9uIChvcykge1xuICAgICAgICB2YXIgdmVyc2lvbiA9IFZlcnNpb24uZGV0ZWN0KG9zLnZlcnNpb25SZWdleGVzLCB1c2VyQWdlbnQpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGN1cnJlbnQ6IG9zLm5hbWUsXG4gICAgICAgICAgdmVyc2lvbjogdmVyc2lvblxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgVWFTdHJpbmcgPSB7XG4gICAgICBkZXRlY3RCcm93c2VyOiBkZXRlY3RCcm93c2VyLFxuICAgICAgZGV0ZWN0T3M6IGRldGVjdE9zXG4gICAgfTtcblxuICAgIHZhciBub3JtYWxWZXJzaW9uUmVnZXggPSAvLio/dmVyc2lvblxcL1xcID8oWzAtOV0rKVxcLihbMC05XSspLiovO1xuICAgIHZhciBjaGVja0NvbnRhaW5zID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh1YXN0cmluZykge1xuICAgICAgICByZXR1cm4gY29udGFpbnMkMSh1YXN0cmluZywgdGFyZ2V0KTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgYnJvd3NlcnMgPSBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdFZGdlJyxcbiAgICAgICAgdmVyc2lvblJlZ2V4ZXM6IFsvLio/ZWRnZVxcLyA/KFswLTldKylcXC4oWzAtOV0rKSQvXSxcbiAgICAgICAgc2VhcmNoOiBmdW5jdGlvbiAodWFzdHJpbmcpIHtcbiAgICAgICAgICByZXR1cm4gY29udGFpbnMkMSh1YXN0cmluZywgJ2VkZ2UvJykgJiYgY29udGFpbnMkMSh1YXN0cmluZywgJ2Nocm9tZScpICYmIGNvbnRhaW5zJDEodWFzdHJpbmcsICdzYWZhcmknKSAmJiBjb250YWlucyQxKHVhc3RyaW5nLCAnYXBwbGV3ZWJraXQnKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0Nocm9tZScsXG4gICAgICAgIHZlcnNpb25SZWdleGVzOiBbXG4gICAgICAgICAgLy4qP2Nocm9tZVxcLyhbMC05XSspXFwuKFswLTldKykuKi8sXG4gICAgICAgICAgbm9ybWFsVmVyc2lvblJlZ2V4XG4gICAgICAgIF0sXG4gICAgICAgIHNlYXJjaDogZnVuY3Rpb24gKHVhc3RyaW5nKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnRhaW5zJDEodWFzdHJpbmcsICdjaHJvbWUnKSAmJiAhY29udGFpbnMkMSh1YXN0cmluZywgJ2Nocm9tZWZyYW1lJyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdJRScsXG4gICAgICAgIHZlcnNpb25SZWdleGVzOiBbXG4gICAgICAgICAgLy4qP21zaWVcXCA/KFswLTldKylcXC4oWzAtOV0rKS4qLyxcbiAgICAgICAgICAvLio/cnY6KFswLTldKylcXC4oWzAtOV0rKS4qL1xuICAgICAgICBdLFxuICAgICAgICBzZWFyY2g6IGZ1bmN0aW9uICh1YXN0cmluZykge1xuICAgICAgICAgIHJldHVybiBjb250YWlucyQxKHVhc3RyaW5nLCAnbXNpZScpIHx8IGNvbnRhaW5zJDEodWFzdHJpbmcsICd0cmlkZW50Jyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdPcGVyYScsXG4gICAgICAgIHZlcnNpb25SZWdleGVzOiBbXG4gICAgICAgICAgbm9ybWFsVmVyc2lvblJlZ2V4LFxuICAgICAgICAgIC8uKj9vcGVyYVxcLyhbMC05XSspXFwuKFswLTldKykuKi9cbiAgICAgICAgXSxcbiAgICAgICAgc2VhcmNoOiBjaGVja0NvbnRhaW5zKCdvcGVyYScpXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnRmlyZWZveCcsXG4gICAgICAgIHZlcnNpb25SZWdleGVzOiBbLy4qP2ZpcmVmb3hcXC9cXCA/KFswLTldKylcXC4oWzAtOV0rKS4qL10sXG4gICAgICAgIHNlYXJjaDogY2hlY2tDb250YWlucygnZmlyZWZveCcpXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnU2FmYXJpJyxcbiAgICAgICAgdmVyc2lvblJlZ2V4ZXM6IFtcbiAgICAgICAgICBub3JtYWxWZXJzaW9uUmVnZXgsXG4gICAgICAgICAgLy4qP2NwdSBvcyAoWzAtOV0rKV8oWzAtOV0rKS4qL1xuICAgICAgICBdLFxuICAgICAgICBzZWFyY2g6IGZ1bmN0aW9uICh1YXN0cmluZykge1xuICAgICAgICAgIHJldHVybiAoY29udGFpbnMkMSh1YXN0cmluZywgJ3NhZmFyaScpIHx8IGNvbnRhaW5zJDEodWFzdHJpbmcsICdtb2JpbGUvJykpICYmIGNvbnRhaW5zJDEodWFzdHJpbmcsICdhcHBsZXdlYmtpdCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgXTtcbiAgICB2YXIgb3NlcyA9IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1dpbmRvd3MnLFxuICAgICAgICBzZWFyY2g6IGNoZWNrQ29udGFpbnMoJ3dpbicpLFxuICAgICAgICB2ZXJzaW9uUmVnZXhlczogWy8uKj93aW5kb3dzXFwgbnRcXCA/KFswLTldKylcXC4oWzAtOV0rKS4qL11cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdpT1MnLFxuICAgICAgICBzZWFyY2g6IGZ1bmN0aW9uICh1YXN0cmluZykge1xuICAgICAgICAgIHJldHVybiBjb250YWlucyQxKHVhc3RyaW5nLCAnaXBob25lJykgfHwgY29udGFpbnMkMSh1YXN0cmluZywgJ2lwYWQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgdmVyc2lvblJlZ2V4ZXM6IFtcbiAgICAgICAgICAvLio/dmVyc2lvblxcL1xcID8oWzAtOV0rKVxcLihbMC05XSspLiovLFxuICAgICAgICAgIC8uKmNwdSBvcyAoWzAtOV0rKV8oWzAtOV0rKS4qLyxcbiAgICAgICAgICAvLipjcHUgaXBob25lIG9zIChbMC05XSspXyhbMC05XSspLiovXG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdBbmRyb2lkJyxcbiAgICAgICAgc2VhcmNoOiBjaGVja0NvbnRhaW5zKCdhbmRyb2lkJyksXG4gICAgICAgIHZlcnNpb25SZWdleGVzOiBbLy4qP2FuZHJvaWRcXCA/KFswLTldKylcXC4oWzAtOV0rKS4qL11cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdPU1gnLFxuICAgICAgICBzZWFyY2g6IGNoZWNrQ29udGFpbnMoJ21hYyBvcyB4JyksXG4gICAgICAgIHZlcnNpb25SZWdleGVzOiBbLy4qP21hY1xcIG9zXFwgeFxcID8oWzAtOV0rKV8oWzAtOV0rKS4qL11cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdMaW51eCcsXG4gICAgICAgIHNlYXJjaDogY2hlY2tDb250YWlucygnbGludXgnKSxcbiAgICAgICAgdmVyc2lvblJlZ2V4ZXM6IFtdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnU29sYXJpcycsXG4gICAgICAgIHNlYXJjaDogY2hlY2tDb250YWlucygnc3Vub3MnKSxcbiAgICAgICAgdmVyc2lvblJlZ2V4ZXM6IFtdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnRnJlZUJTRCcsXG4gICAgICAgIHNlYXJjaDogY2hlY2tDb250YWlucygnZnJlZWJzZCcpLFxuICAgICAgICB2ZXJzaW9uUmVnZXhlczogW11cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdDaHJvbWVPUycsXG4gICAgICAgIHNlYXJjaDogY2hlY2tDb250YWlucygnY3JvcycpLFxuICAgICAgICB2ZXJzaW9uUmVnZXhlczogWy8uKj9jaHJvbWVcXC8oWzAtOV0rKVxcLihbMC05XSspLiovXVxuICAgICAgfVxuICAgIF07XG4gICAgdmFyIFBsYXRmb3JtSW5mbyA9IHtcbiAgICAgIGJyb3dzZXJzOiBjb25zdGFudChicm93c2VycyksXG4gICAgICBvc2VzOiBjb25zdGFudChvc2VzKVxuICAgIH07XG5cbiAgICB2YXIgZGV0ZWN0JDIgPSBmdW5jdGlvbiAodXNlckFnZW50LCBtZWRpYU1hdGNoKSB7XG4gICAgICB2YXIgYnJvd3NlcnMgPSBQbGF0Zm9ybUluZm8uYnJvd3NlcnMoKTtcbiAgICAgIHZhciBvc2VzID0gUGxhdGZvcm1JbmZvLm9zZXMoKTtcbiAgICAgIHZhciBicm93c2VyID0gVWFTdHJpbmcuZGV0ZWN0QnJvd3Nlcihicm93c2VycywgdXNlckFnZW50KS5mb2xkKEJyb3dzZXIudW5rbm93biwgQnJvd3Nlci5udSk7XG4gICAgICB2YXIgb3MgPSBVYVN0cmluZy5kZXRlY3RPcyhvc2VzLCB1c2VyQWdlbnQpLmZvbGQoT3BlcmF0aW5nU3lzdGVtLnVua25vd24sIE9wZXJhdGluZ1N5c3RlbS5udSk7XG4gICAgICB2YXIgZGV2aWNlVHlwZSA9IERldmljZVR5cGUob3MsIGJyb3dzZXIsIHVzZXJBZ2VudCwgbWVkaWFNYXRjaCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBicm93c2VyOiBicm93c2VyLFxuICAgICAgICBvczogb3MsXG4gICAgICAgIGRldmljZVR5cGU6IGRldmljZVR5cGVcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgUGxhdGZvcm1EZXRlY3Rpb24gPSB7IGRldGVjdDogZGV0ZWN0JDIgfTtcblxuICAgIHZhciBtZWRpYU1hdGNoID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICByZXR1cm4gZG9tR2xvYmFscy53aW5kb3cubWF0Y2hNZWRpYShxdWVyeSkubWF0Y2hlcztcbiAgICB9O1xuICAgIHZhciBwbGF0Zm9ybSA9IGNhY2hlZChmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gUGxhdGZvcm1EZXRlY3Rpb24uZGV0ZWN0KGRvbUdsb2JhbHMubmF2aWdhdG9yLnVzZXJBZ2VudCwgbWVkaWFNYXRjaCk7XG4gICAgfSk7XG4gICAgdmFyIGRldGVjdCQzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHBsYXRmb3JtKCk7XG4gICAgfTtcblxuICAgIHZhciBpcyA9IGZ1bmN0aW9uIChlbGVtZW50LCBzZWxlY3Rvcikge1xuICAgICAgdmFyIGRvbSA9IGVsZW1lbnQuZG9tKCk7XG4gICAgICBpZiAoZG9tLm5vZGVUeXBlICE9PSBFTEVNRU5UKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBlbGVtID0gZG9tO1xuICAgICAgICBpZiAoZWxlbS5tYXRjaGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gZWxlbS5tYXRjaGVzKHNlbGVjdG9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtLm1zTWF0Y2hlc1NlbGVjdG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gZWxlbS5tc01hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBlbGVtLndlYmtpdE1hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbS5tb3pNYXRjaGVzU2VsZWN0b3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBlbGVtLm1vek1hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCcm93c2VyIGxhY2tzIG5hdGl2ZSBzZWxlY3RvcnMnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGJ5cGFzc1NlbGVjdG9yID0gZnVuY3Rpb24gKGRvbSkge1xuICAgICAgcmV0dXJuIGRvbS5ub2RlVHlwZSAhPT0gRUxFTUVOVCAmJiBkb20ubm9kZVR5cGUgIT09IERPQ1VNRU5UICYmIGRvbS5ub2RlVHlwZSAhPT0gRE9DVU1FTlRfRlJBR01FTlQgfHwgZG9tLmNoaWxkRWxlbWVudENvdW50ID09PSAwO1xuICAgIH07XG4gICAgdmFyIGFsbCA9IGZ1bmN0aW9uIChzZWxlY3Rvciwgc2NvcGUpIHtcbiAgICAgIHZhciBiYXNlID0gc2NvcGUgPT09IHVuZGVmaW5lZCA/IGRvbUdsb2JhbHMuZG9jdW1lbnQgOiBzY29wZS5kb20oKTtcbiAgICAgIHJldHVybiBieXBhc3NTZWxlY3RvcihiYXNlKSA/IFtdIDogbWFwKGJhc2UucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvciksIEVsZW1lbnQuZnJvbURvbSk7XG4gICAgfTtcbiAgICB2YXIgb25lID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBzY29wZSkge1xuICAgICAgdmFyIGJhc2UgPSBzY29wZSA9PT0gdW5kZWZpbmVkID8gZG9tR2xvYmFscy5kb2N1bWVudCA6IHNjb3BlLmRvbSgpO1xuICAgICAgcmV0dXJuIGJ5cGFzc1NlbGVjdG9yKGJhc2UpID8gT3B0aW9uLm5vbmUoKSA6IE9wdGlvbi5mcm9tKGJhc2UucXVlcnlTZWxlY3RvcihzZWxlY3RvcikpLm1hcChFbGVtZW50LmZyb21Eb20pO1xuICAgIH07XG5cbiAgICB2YXIgZXEgPSBmdW5jdGlvbiAoZTEsIGUyKSB7XG4gICAgICByZXR1cm4gZTEuZG9tKCkgPT09IGUyLmRvbSgpO1xuICAgIH07XG4gICAgdmFyIHJlZ3VsYXJDb250YWlucyA9IGZ1bmN0aW9uIChlMSwgZTIpIHtcbiAgICAgIHZhciBkMSA9IGUxLmRvbSgpO1xuICAgICAgdmFyIGQyID0gZTIuZG9tKCk7XG4gICAgICByZXR1cm4gZDEgPT09IGQyID8gZmFsc2UgOiBkMS5jb250YWlucyhkMik7XG4gICAgfTtcbiAgICB2YXIgaWVDb250YWlucyA9IGZ1bmN0aW9uIChlMSwgZTIpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudFBvc2l0aW9uQ29udGFpbmVkQnkoZTEuZG9tKCksIGUyLmRvbSgpKTtcbiAgICB9O1xuICAgIHZhciBjb250YWlucyQyID0gZnVuY3Rpb24gKGUxLCBlMikge1xuICAgICAgcmV0dXJuIGRldGVjdCQzKCkuYnJvd3Nlci5pc0lFKCkgPyBpZUNvbnRhaW5zKGUxLCBlMikgOiByZWd1bGFyQ29udGFpbnMoZTEsIGUyKTtcbiAgICB9O1xuICAgIHZhciBpcyQxID0gaXM7XG5cbiAgICB2YXIgb3duZXIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIEVsZW1lbnQuZnJvbURvbShlbGVtZW50LmRvbSgpLm93bmVyRG9jdW1lbnQpO1xuICAgIH07XG4gICAgdmFyIGRvY3VtZW50T3JPd25lciA9IGZ1bmN0aW9uIChkb3MpIHtcbiAgICAgIHJldHVybiBpc0RvY3VtZW50KGRvcykgPyBkb3MgOiBvd25lcihkb3MpO1xuICAgIH07XG4gICAgdmFyIGRlZmF1bHRWaWV3ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBFbGVtZW50LmZyb21Eb20oZWxlbWVudC5kb20oKS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3KTtcbiAgICB9O1xuICAgIHZhciBwYXJlbnQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIE9wdGlvbi5mcm9tKGVsZW1lbnQuZG9tKCkucGFyZW50Tm9kZSkubWFwKEVsZW1lbnQuZnJvbURvbSk7XG4gICAgfTtcbiAgICB2YXIgcGFyZW50cyA9IGZ1bmN0aW9uIChlbGVtZW50LCBpc1Jvb3QpIHtcbiAgICAgIHZhciBzdG9wID0gaXNGdW5jdGlvbihpc1Jvb3QpID8gaXNSb290IDogbmV2ZXI7XG4gICAgICB2YXIgZG9tID0gZWxlbWVudC5kb20oKTtcbiAgICAgIHZhciByZXQgPSBbXTtcbiAgICAgIHdoaWxlIChkb20ucGFyZW50Tm9kZSAhPT0gbnVsbCAmJiBkb20ucGFyZW50Tm9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciByYXdQYXJlbnQgPSBkb20ucGFyZW50Tm9kZTtcbiAgICAgICAgdmFyIHAgPSBFbGVtZW50LmZyb21Eb20ocmF3UGFyZW50KTtcbiAgICAgICAgcmV0LnB1c2gocCk7XG4gICAgICAgIGlmIChzdG9wKHApID09PSB0cnVlKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9tID0gcmF3UGFyZW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH07XG4gICAgdmFyIG9mZnNldFBhcmVudCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gT3B0aW9uLmZyb20oZWxlbWVudC5kb20oKS5vZmZzZXRQYXJlbnQpLm1hcChFbGVtZW50LmZyb21Eb20pO1xuICAgIH07XG4gICAgdmFyIHByZXZTaWJsaW5nID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBPcHRpb24uZnJvbShlbGVtZW50LmRvbSgpLnByZXZpb3VzU2libGluZykubWFwKEVsZW1lbnQuZnJvbURvbSk7XG4gICAgfTtcbiAgICB2YXIgbmV4dFNpYmxpbmcgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIE9wdGlvbi5mcm9tKGVsZW1lbnQuZG9tKCkubmV4dFNpYmxpbmcpLm1hcChFbGVtZW50LmZyb21Eb20pO1xuICAgIH07XG4gICAgdmFyIGNoaWxkcmVuID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBtYXAoZWxlbWVudC5kb20oKS5jaGlsZE5vZGVzLCBFbGVtZW50LmZyb21Eb20pO1xuICAgIH07XG4gICAgdmFyIGNoaWxkID0gZnVuY3Rpb24gKGVsZW1lbnQsIGluZGV4KSB7XG4gICAgICB2YXIgY3MgPSBlbGVtZW50LmRvbSgpLmNoaWxkTm9kZXM7XG4gICAgICByZXR1cm4gT3B0aW9uLmZyb20oY3NbaW5kZXhdKS5tYXAoRWxlbWVudC5mcm9tRG9tKTtcbiAgICB9O1xuICAgIHZhciBmaXJzdENoaWxkID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBjaGlsZChlbGVtZW50LCAwKTtcbiAgICB9O1xuXG4gICAgdmFyIGlzU2hhZG93Um9vdCA9IGZ1bmN0aW9uIChkb3MpIHtcbiAgICAgIHJldHVybiBpc0RvY3VtZW50RnJhZ21lbnQoZG9zKTtcbiAgICB9O1xuICAgIHZhciBzdXBwb3J0ZWQgPSBpc0Z1bmN0aW9uKGRvbUdsb2JhbHMuRWxlbWVudC5wcm90b3R5cGUuYXR0YWNoU2hhZG93KSAmJiBpc0Z1bmN0aW9uKGRvbUdsb2JhbHMuTm9kZS5wcm90b3R5cGUuZ2V0Um9vdE5vZGUpO1xuICAgIHZhciBpc1N1cHBvcnRlZCQxID0gY29uc3RhbnQoc3VwcG9ydGVkKTtcbiAgICB2YXIgZ2V0Um9vdE5vZGUgPSBzdXBwb3J0ZWQgPyBmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIEVsZW1lbnQuZnJvbURvbShlLmRvbSgpLmdldFJvb3ROb2RlKCkpO1xuICAgIH0gOiBkb2N1bWVudE9yT3duZXI7XG4gICAgdmFyIGdldFNoYWRvd1Jvb3QgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyIHIgPSBnZXRSb290Tm9kZShlKTtcbiAgICAgIHJldHVybiBpc1NoYWRvd1Jvb3QocikgPyBPcHRpb24uc29tZShyKSA6IE9wdGlvbi5ub25lKCk7XG4gICAgfTtcbiAgICB2YXIgZ2V0U2hhZG93SG9zdCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gRWxlbWVudC5mcm9tRG9tKGUuZG9tKCkuaG9zdCk7XG4gICAgfTtcbiAgICB2YXIgZ2V0T3JpZ2luYWxFdmVudFRhcmdldCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgaWYgKGlzU3VwcG9ydGVkJDEoKSAmJiBpc05vbk51bGxhYmxlKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgdmFyIGVsID0gRWxlbWVudC5mcm9tRG9tKGV2ZW50LnRhcmdldCk7XG4gICAgICAgIGlmIChpc0VsZW1lbnQoZWwpICYmIGlzT3BlblNoYWRvd0hvc3QoRWxlbWVudC5mcm9tRG9tKGV2ZW50LnRhcmdldCkpKSB7XG4gICAgICAgICAgdmFyIGV2ZW50QW55ID0gZXZlbnQ7XG4gICAgICAgICAgaWYgKGV2ZW50QW55LmNvbXBvc2VkICYmIGV2ZW50QW55LmNvbXBvc2VkUGF0aCkge1xuICAgICAgICAgICAgdmFyIGNvbXBvc2VkUGF0aCA9IGV2ZW50QW55LmNvbXBvc2VkUGF0aCgpO1xuICAgICAgICAgICAgaWYgKGNvbXBvc2VkUGF0aCkge1xuICAgICAgICAgICAgICByZXR1cm4gaGVhZChjb21wb3NlZFBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIE9wdGlvbi5mcm9tKGV2ZW50LnRhcmdldCk7XG4gICAgfTtcbiAgICB2YXIgaXNPcGVuU2hhZG93SG9zdCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gaXNOb25OdWxsYWJsZShlbGVtZW50LmRvbSgpLnNoYWRvd1Jvb3QpO1xuICAgIH07XG5cbiAgICB2YXIgaW5Cb2R5ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHZhciBkb20gPSBpc1RleHQoZWxlbWVudCkgPyBlbGVtZW50LmRvbSgpLnBhcmVudE5vZGUgOiBlbGVtZW50LmRvbSgpO1xuICAgICAgaWYgKGRvbSA9PT0gdW5kZWZpbmVkIHx8IGRvbSA9PT0gbnVsbCB8fCBkb20ub3duZXJEb2N1bWVudCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gZ2V0U2hhZG93Um9vdChFbGVtZW50LmZyb21Eb20oZG9tKSkuZm9sZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBkb20ub3duZXJEb2N1bWVudC5ib2R5LmNvbnRhaW5zKGRvbSk7XG4gICAgICB9LCBjb21wb3NlMShpbkJvZHksIGdldFNoYWRvd0hvc3QpKTtcbiAgICB9O1xuICAgIHZhciBib2R5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGdldEJvZHkoRWxlbWVudC5mcm9tRG9tKGRvbUdsb2JhbHMuZG9jdW1lbnQpKTtcbiAgICB9O1xuICAgIHZhciBnZXRCb2R5ID0gZnVuY3Rpb24gKGRvYykge1xuICAgICAgdmFyIGIgPSBkb2MuZG9tKCkuYm9keTtcbiAgICAgIGlmIChiID09PSBudWxsIHx8IGIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JvZHkgaXMgbm90IGF2YWlsYWJsZSB5ZXQnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBFbGVtZW50LmZyb21Eb20oYik7XG4gICAgfTtcblxuICAgIHZhciBpbnRlcm5hbFNldCA9IGZ1bmN0aW9uIChkb20sIHByb3BlcnR5LCB2YWx1ZSkge1xuICAgICAgaWYgKCFpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgZG9tR2xvYmFscy5jb25zb2xlLmVycm9yKCdJbnZhbGlkIGNhbGwgdG8gQ1NTLnNldC4gUHJvcGVydHkgJywgcHJvcGVydHksICc6OiBWYWx1ZSAnLCB2YWx1ZSwgJzo6IEVsZW1lbnQgJywgZG9tKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDU1MgdmFsdWUgbXVzdCBiZSBhIHN0cmluZzogJyArIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1N1cHBvcnRlZChkb20pKSB7XG4gICAgICAgIGRvbS5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGludGVybmFsUmVtb3ZlID0gZnVuY3Rpb24gKGRvbSwgcHJvcGVydHkpIHtcbiAgICAgIGlmIChpc1N1cHBvcnRlZChkb20pKSB7XG4gICAgICAgIGRvbS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShwcm9wZXJ0eSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgc2V0JDEgPSBmdW5jdGlvbiAoZWxlbWVudCwgcHJvcGVydHksIHZhbHVlKSB7XG4gICAgICB2YXIgZG9tID0gZWxlbWVudC5kb20oKTtcbiAgICAgIGludGVybmFsU2V0KGRvbSwgcHJvcGVydHksIHZhbHVlKTtcbiAgICB9O1xuICAgIHZhciBzZXRBbGwkMSA9IGZ1bmN0aW9uIChlbGVtZW50LCBjc3MpIHtcbiAgICAgIHZhciBkb20gPSBlbGVtZW50LmRvbSgpO1xuICAgICAgZWFjaCQxKGNzcywgZnVuY3Rpb24gKHYsIGspIHtcbiAgICAgICAgaW50ZXJuYWxTZXQoZG9tLCBrLCB2KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGdldCQyID0gZnVuY3Rpb24gKGVsZW1lbnQsIHByb3BlcnR5KSB7XG4gICAgICB2YXIgZG9tID0gZWxlbWVudC5kb20oKTtcbiAgICAgIHZhciBzdHlsZXMgPSBkb21HbG9iYWxzLndpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvbSk7XG4gICAgICB2YXIgciA9IHN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KTtcbiAgICAgIHJldHVybiByID09PSAnJyAmJiAhaW5Cb2R5KGVsZW1lbnQpID8gZ2V0VW5zYWZlUHJvcGVydHkoZG9tLCBwcm9wZXJ0eSkgOiByO1xuICAgIH07XG4gICAgdmFyIGdldFVuc2FmZVByb3BlcnR5ID0gZnVuY3Rpb24gKGRvbSwgcHJvcGVydHkpIHtcbiAgICAgIHJldHVybiBpc1N1cHBvcnRlZChkb20pID8gZG9tLnN0eWxlLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpIDogJyc7XG4gICAgfTtcbiAgICB2YXIgZ2V0UmF3ID0gZnVuY3Rpb24gKGVsZW1lbnQsIHByb3BlcnR5KSB7XG4gICAgICB2YXIgZG9tID0gZWxlbWVudC5kb20oKTtcbiAgICAgIHZhciByYXcgPSBnZXRVbnNhZmVQcm9wZXJ0eShkb20sIHByb3BlcnR5KTtcbiAgICAgIHJldHVybiBPcHRpb24uZnJvbShyYXcpLmZpbHRlcihmdW5jdGlvbiAocikge1xuICAgICAgICByZXR1cm4gci5sZW5ndGggPiAwO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgcmVtb3ZlJDEgPSBmdW5jdGlvbiAoZWxlbWVudCwgcHJvcGVydHkpIHtcbiAgICAgIHZhciBkb20gPSBlbGVtZW50LmRvbSgpO1xuICAgICAgaW50ZXJuYWxSZW1vdmUoZG9tLCBwcm9wZXJ0eSk7XG4gICAgICBpZiAoZ2V0T3B0KGVsZW1lbnQsICdzdHlsZScpLm1hcCh0cmltKS5pcygnJykpIHtcbiAgICAgICAgcmVtb3ZlKGVsZW1lbnQsICdzdHlsZScpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGNvcHkgPSBmdW5jdGlvbiAoc291cmNlLCB0YXJnZXQpIHtcbiAgICAgIHZhciBzb3VyY2VEb20gPSBzb3VyY2UuZG9tKCk7XG4gICAgICB2YXIgdGFyZ2V0RG9tID0gdGFyZ2V0LmRvbSgpO1xuICAgICAgaWYgKGlzU3VwcG9ydGVkKHNvdXJjZURvbSkgJiYgaXNTdXBwb3J0ZWQodGFyZ2V0RG9tKSkge1xuICAgICAgICB0YXJnZXREb20uc3R5bGUuY3NzVGV4dCA9IHNvdXJjZURvbS5zdHlsZS5jc3NUZXh0O1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgYmVmb3JlID0gZnVuY3Rpb24gKG1hcmtlciwgZWxlbWVudCkge1xuICAgICAgdmFyIHBhcmVudCQxID0gcGFyZW50KG1hcmtlcik7XG4gICAgICBwYXJlbnQkMS5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHYuZG9tKCkuaW5zZXJ0QmVmb3JlKGVsZW1lbnQuZG9tKCksIG1hcmtlci5kb20oKSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBhZnRlciA9IGZ1bmN0aW9uIChtYXJrZXIsIGVsZW1lbnQpIHtcbiAgICAgIHZhciBzaWJsaW5nID0gbmV4dFNpYmxpbmcobWFya2VyKTtcbiAgICAgIHNpYmxpbmcuZm9sZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwYXJlbnQkMSA9IHBhcmVudChtYXJrZXIpO1xuICAgICAgICBwYXJlbnQkMS5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgYXBwZW5kKHYsIGVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH0sIGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIGJlZm9yZSh2LCBlbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHByZXBlbmQgPSBmdW5jdGlvbiAocGFyZW50LCBlbGVtZW50KSB7XG4gICAgICB2YXIgZmlyc3RDaGlsZCQxID0gZmlyc3RDaGlsZChwYXJlbnQpO1xuICAgICAgZmlyc3RDaGlsZCQxLmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICBhcHBlbmQocGFyZW50LCBlbGVtZW50KTtcbiAgICAgIH0sIGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHBhcmVudC5kb20oKS5pbnNlcnRCZWZvcmUoZWxlbWVudC5kb20oKSwgdi5kb20oKSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBhcHBlbmQgPSBmdW5jdGlvbiAocGFyZW50LCBlbGVtZW50KSB7XG4gICAgICBwYXJlbnQuZG9tKCkuYXBwZW5kQ2hpbGQoZWxlbWVudC5kb20oKSk7XG4gICAgfTtcbiAgICB2YXIgd3JhcCA9IGZ1bmN0aW9uIChlbGVtZW50LCB3cmFwcGVyKSB7XG4gICAgICBiZWZvcmUoZWxlbWVudCwgd3JhcHBlcik7XG4gICAgICBhcHBlbmQod3JhcHBlciwgZWxlbWVudCk7XG4gICAgfTtcblxuICAgIHZhciBiZWZvcmUkMSA9IGZ1bmN0aW9uIChtYXJrZXIsIGVsZW1lbnRzKSB7XG4gICAgICBlYWNoKGVsZW1lbnRzLCBmdW5jdGlvbiAoeCkge1xuICAgICAgICBiZWZvcmUobWFya2VyLCB4KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGFmdGVyJDEgPSBmdW5jdGlvbiAobWFya2VyLCBlbGVtZW50cykge1xuICAgICAgZWFjaChlbGVtZW50cywgZnVuY3Rpb24gKHgsIGkpIHtcbiAgICAgICAgdmFyIGUgPSBpID09PSAwID8gbWFya2VyIDogZWxlbWVudHNbaSAtIDFdO1xuICAgICAgICBhZnRlcihlLCB4KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGFwcGVuZCQxID0gZnVuY3Rpb24gKHBhcmVudCwgZWxlbWVudHMpIHtcbiAgICAgIGVhY2goZWxlbWVudHMsIGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGFwcGVuZChwYXJlbnQsIHgpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBlbXB0eSA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LmRvbSgpLnRleHRDb250ZW50ID0gJyc7XG4gICAgICBlYWNoKGNoaWxkcmVuKGVsZW1lbnQpLCBmdW5jdGlvbiAocm9ndWUpIHtcbiAgICAgICAgcmVtb3ZlJDIocm9ndWUpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgcmVtb3ZlJDIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgdmFyIGRvbSA9IGVsZW1lbnQuZG9tKCk7XG4gICAgICBpZiAoZG9tLnBhcmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgZG9tLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZG9tKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciB1bndyYXAgPSBmdW5jdGlvbiAod3JhcHBlcikge1xuICAgICAgdmFyIGNoaWxkcmVuJDEgPSBjaGlsZHJlbih3cmFwcGVyKTtcbiAgICAgIGlmIChjaGlsZHJlbiQxLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYmVmb3JlJDEod3JhcHBlciwgY2hpbGRyZW4kMSk7XG4gICAgICB9XG4gICAgICByZW1vdmUkMih3cmFwcGVyKTtcbiAgICB9O1xuXG4gICAgdmFyIGdyaWQgPSBmdW5jdGlvbiAocm93cywgY29sdW1ucykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcm93czogY29uc3RhbnQocm93cyksXG4gICAgICAgIGNvbHVtbnM6IGNvbnN0YW50KGNvbHVtbnMpXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGFkZHJlc3MgPSBmdW5jdGlvbiAocm93LCBjb2x1bW4pIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJvdzogY29uc3RhbnQocm93KSxcbiAgICAgICAgY29sdW1uOiBjb25zdGFudChjb2x1bW4pXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGRldGFpbCA9IGZ1bmN0aW9uIChlbGVtZW50LCByb3dzcGFuLCBjb2xzcGFuKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBlbGVtZW50OiBjb25zdGFudChlbGVtZW50KSxcbiAgICAgICAgcm93c3BhbjogY29uc3RhbnQocm93c3BhbiksXG4gICAgICAgIGNvbHNwYW46IGNvbnN0YW50KGNvbHNwYW4pXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGRldGFpbG5ldyA9IGZ1bmN0aW9uIChlbGVtZW50LCByb3dzcGFuLCBjb2xzcGFuLCBpc05ldykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZWxlbWVudDogY29uc3RhbnQoZWxlbWVudCksXG4gICAgICAgIHJvd3NwYW46IGNvbnN0YW50KHJvd3NwYW4pLFxuICAgICAgICBjb2xzcGFuOiBjb25zdGFudChjb2xzcGFuKSxcbiAgICAgICAgaXNOZXc6IGNvbnN0YW50KGlzTmV3KVxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBleHRlbmRlZCA9IGZ1bmN0aW9uIChlbGVtZW50LCByb3dzcGFuLCBjb2xzcGFuLCByb3csIGNvbHVtbikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZWxlbWVudDogY29uc3RhbnQoZWxlbWVudCksXG4gICAgICAgIHJvd3NwYW46IGNvbnN0YW50KHJvd3NwYW4pLFxuICAgICAgICBjb2xzcGFuOiBjb25zdGFudChjb2xzcGFuKSxcbiAgICAgICAgcm93OiBjb25zdGFudChyb3cpLFxuICAgICAgICBjb2x1bW46IGNvbnN0YW50KGNvbHVtbilcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgcm93ZGF0YSA9IGZ1bmN0aW9uIChlbGVtZW50LCBjZWxscywgc2VjdGlvbikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZWxlbWVudDogY29uc3RhbnQoZWxlbWVudCksXG4gICAgICAgIGNlbGxzOiBjb25zdGFudChjZWxscyksXG4gICAgICAgIHNlY3Rpb246IGNvbnN0YW50KHNlY3Rpb24pXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGVsZW1lbnRuZXcgPSBmdW5jdGlvbiAoZWxlbWVudCwgaXNOZXcpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGVsZW1lbnQ6IGNvbnN0YW50KGVsZW1lbnQpLFxuICAgICAgICBpc05ldzogY29uc3RhbnQoaXNOZXcpXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHJvd2RhdGFuZXcgPSBmdW5jdGlvbiAoZWxlbWVudCwgY2VsbHMsIHNlY3Rpb24sIGlzTmV3KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBlbGVtZW50OiBjb25zdGFudChlbGVtZW50KSxcbiAgICAgICAgY2VsbHM6IGNvbnN0YW50KGNlbGxzKSxcbiAgICAgICAgc2VjdGlvbjogY29uc3RhbnQoc2VjdGlvbiksXG4gICAgICAgIGlzTmV3OiBjb25zdGFudChpc05ldylcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgcm93Y2VsbHMgPSBmdW5jdGlvbiAoY2VsbHMsIHNlY3Rpb24pIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNlbGxzOiBjb25zdGFudChjZWxscyksXG4gICAgICAgIHNlY3Rpb246IGNvbnN0YW50KHNlY3Rpb24pXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHJvd2RldGFpbHMgPSBmdW5jdGlvbiAoZGV0YWlscywgc2VjdGlvbikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGV0YWlsczogY29uc3RhbnQoZGV0YWlscyksXG4gICAgICAgIHNlY3Rpb246IGNvbnN0YW50KHNlY3Rpb24pXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGJvdW5kcyA9IGZ1bmN0aW9uIChzdGFydFJvdywgc3RhcnRDb2wsIGZpbmlzaFJvdywgZmluaXNoQ29sKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGFydFJvdzogY29uc3RhbnQoc3RhcnRSb3cpLFxuICAgICAgICBzdGFydENvbDogY29uc3RhbnQoc3RhcnRDb2wpLFxuICAgICAgICBmaW5pc2hSb3c6IGNvbnN0YW50KGZpbmlzaFJvdyksXG4gICAgICAgIGZpbmlzaENvbDogY29uc3RhbnQoZmluaXNoQ29sKVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIGFuY2VzdG9ycyA9IGZ1bmN0aW9uIChzY29wZSwgcHJlZGljYXRlLCBpc1Jvb3QpIHtcbiAgICAgIHJldHVybiBmaWx0ZXIocGFyZW50cyhzY29wZSwgaXNSb290KSwgcHJlZGljYXRlKTtcbiAgICB9O1xuICAgIHZhciBjaGlsZHJlbiQxID0gZnVuY3Rpb24gKHNjb3BlLCBwcmVkaWNhdGUpIHtcbiAgICAgIHJldHVybiBmaWx0ZXIoY2hpbGRyZW4oc2NvcGUpLCBwcmVkaWNhdGUpO1xuICAgIH07XG4gICAgdmFyIGRlc2NlbmRhbnRzID0gZnVuY3Rpb24gKHNjb3BlLCBwcmVkaWNhdGUpIHtcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgIGVhY2goY2hpbGRyZW4oc2NvcGUpLCBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAocHJlZGljYXRlKHgpKSB7XG4gICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmNvbmNhdChbeF0pO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoZGVzY2VuZGFudHMoeCwgcHJlZGljYXRlKSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxuICAgIHZhciBhbmNlc3RvcnMkMSA9IGZ1bmN0aW9uIChzY29wZSwgc2VsZWN0b3IsIGlzUm9vdCkge1xuICAgICAgcmV0dXJuIGFuY2VzdG9ycyhzY29wZSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgcmV0dXJuIGlzKGUsIHNlbGVjdG9yKTtcbiAgICAgIH0sIGlzUm9vdCk7XG4gICAgfTtcbiAgICB2YXIgY2hpbGRyZW4kMiA9IGZ1bmN0aW9uIChzY29wZSwgc2VsZWN0b3IpIHtcbiAgICAgIHJldHVybiBjaGlsZHJlbiQxKHNjb3BlLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXR1cm4gaXMoZSwgc2VsZWN0b3IpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgZGVzY2VuZGFudHMkMSA9IGZ1bmN0aW9uIChzY29wZSwgc2VsZWN0b3IpIHtcbiAgICAgIHJldHVybiBhbGwoc2VsZWN0b3IsIHNjb3BlKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gQ2xvc2VzdE9yQW5jZXN0b3IgKGlzLCBhbmNlc3Rvciwgc2NvcGUsIGEsIGlzUm9vdCkge1xuICAgICAgcmV0dXJuIGlzKHNjb3BlLCBhKSA/IE9wdGlvbi5zb21lKHNjb3BlKSA6IGlzRnVuY3Rpb24oaXNSb290KSAmJiBpc1Jvb3Qoc2NvcGUpID8gT3B0aW9uLm5vbmUoKSA6IGFuY2VzdG9yKHNjb3BlLCBhLCBpc1Jvb3QpO1xuICAgIH1cblxuICAgIHZhciBhbmNlc3RvciA9IGZ1bmN0aW9uIChzY29wZSwgcHJlZGljYXRlLCBpc1Jvb3QpIHtcbiAgICAgIHZhciBlbGVtZW50ID0gc2NvcGUuZG9tKCk7XG4gICAgICB2YXIgc3RvcCA9IGlzRnVuY3Rpb24oaXNSb290KSA/IGlzUm9vdCA6IGNvbnN0YW50KGZhbHNlKTtcbiAgICAgIHdoaWxlIChlbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgdmFyIGVsID0gRWxlbWVudC5mcm9tRG9tKGVsZW1lbnQpO1xuICAgICAgICBpZiAocHJlZGljYXRlKGVsKSkge1xuICAgICAgICAgIHJldHVybiBPcHRpb24uc29tZShlbCk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RvcChlbCkpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIE9wdGlvbi5ub25lKCk7XG4gICAgfTtcbiAgICB2YXIgY2xvc2VzdCA9IGZ1bmN0aW9uIChzY29wZSwgcHJlZGljYXRlLCBpc1Jvb3QpIHtcbiAgICAgIHZhciBpcyA9IGZ1bmN0aW9uIChzLCB0ZXN0KSB7XG4gICAgICAgIHJldHVybiB0ZXN0KHMpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBDbG9zZXN0T3JBbmNlc3RvcihpcywgYW5jZXN0b3IsIHNjb3BlLCBwcmVkaWNhdGUsIGlzUm9vdCk7XG4gICAgfTtcbiAgICB2YXIgY2hpbGQkMSA9IGZ1bmN0aW9uIChzY29wZSwgcHJlZGljYXRlKSB7XG4gICAgICB2YXIgcHJlZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHJldHVybiBwcmVkaWNhdGUoRWxlbWVudC5mcm9tRG9tKG5vZGUpKTtcbiAgICAgIH07XG4gICAgICB2YXIgcmVzdWx0ID0gZmluZChzY29wZS5kb20oKS5jaGlsZE5vZGVzLCBwcmVkKTtcbiAgICAgIHJldHVybiByZXN1bHQubWFwKEVsZW1lbnQuZnJvbURvbSk7XG4gICAgfTtcbiAgICB2YXIgZGVzY2VuZGFudCA9IGZ1bmN0aW9uIChzY29wZSwgcHJlZGljYXRlKSB7XG4gICAgICB2YXIgZGVzY2VuZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGNoaWxkXzEgPSBFbGVtZW50LmZyb21Eb20obm9kZS5jaGlsZE5vZGVzW2ldKTtcbiAgICAgICAgICBpZiAocHJlZGljYXRlKGNoaWxkXzEpKSB7XG4gICAgICAgICAgICByZXR1cm4gT3B0aW9uLnNvbWUoY2hpbGRfMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciByZXMgPSBkZXNjZW5kKG5vZGUuY2hpbGROb2Rlc1tpXSk7XG4gICAgICAgICAgaWYgKHJlcy5pc1NvbWUoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE9wdGlvbi5ub25lKCk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIGRlc2NlbmQoc2NvcGUuZG9tKCkpO1xuICAgIH07XG5cbiAgICB2YXIgYW5jZXN0b3IkMSA9IGZ1bmN0aW9uIChzY29wZSwgc2VsZWN0b3IsIGlzUm9vdCkge1xuICAgICAgcmV0dXJuIGFuY2VzdG9yKHNjb3BlLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXR1cm4gaXMoZSwgc2VsZWN0b3IpO1xuICAgICAgfSwgaXNSb290KTtcbiAgICB9O1xuICAgIHZhciBjaGlsZCQyID0gZnVuY3Rpb24gKHNjb3BlLCBzZWxlY3Rvcikge1xuICAgICAgcmV0dXJuIGNoaWxkJDEoc2NvcGUsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJldHVybiBpcyhlLCBzZWxlY3Rvcik7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBkZXNjZW5kYW50JDEgPSBmdW5jdGlvbiAoc2NvcGUsIHNlbGVjdG9yKSB7XG4gICAgICByZXR1cm4gb25lKHNlbGVjdG9yLCBzY29wZSk7XG4gICAgfTtcbiAgICB2YXIgY2xvc2VzdCQxID0gZnVuY3Rpb24gKHNjb3BlLCBzZWxlY3RvciwgaXNSb290KSB7XG4gICAgICB2YXIgaXMkMSA9IGZ1bmN0aW9uIChlbGVtZW50LCBzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gaXMoZWxlbWVudCwgc2VsZWN0b3IpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBDbG9zZXN0T3JBbmNlc3RvcihpcyQxLCBhbmNlc3RvciQxLCBzY29wZSwgc2VsZWN0b3IsIGlzUm9vdCk7XG4gICAgfTtcblxuICAgIHZhciBnZXRBdHRyVmFsdWUgPSBmdW5jdGlvbiAoY2VsbCwgbmFtZSwgZmFsbGJhY2spIHtcbiAgICAgIGlmIChmYWxsYmFjayA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGZhbGxiYWNrID0gMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBnZXRPcHQoY2VsbCwgbmFtZSkubWFwKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICAgIH0pLmdldE9yKGZhbGxiYWNrKTtcbiAgICB9O1xuICAgIHZhciBnZXRTcGFuID0gZnVuY3Rpb24gKGNlbGwsIHR5cGUpIHtcbiAgICAgIHJldHVybiBnZXRBdHRyVmFsdWUoY2VsbCwgdHlwZSwgMSk7XG4gICAgfTtcbiAgICB2YXIgaGFzQ29sc3BhbiA9IGZ1bmN0aW9uIChjZWxsKSB7XG4gICAgICByZXR1cm4gZ2V0U3BhbihjZWxsLCAnY29sc3BhbicpID4gMTtcbiAgICB9O1xuICAgIHZhciBoYXNSb3dzcGFuID0gZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgIHJldHVybiBnZXRTcGFuKGNlbGwsICdyb3dzcGFuJykgPiAxO1xuICAgIH07XG4gICAgdmFyIGdldENzc1ZhbHVlID0gZnVuY3Rpb24gKGVsZW1lbnQsIHByb3BlcnR5KSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQoZ2V0JDIoZWxlbWVudCwgcHJvcGVydHkpLCAxMCk7XG4gICAgfTtcbiAgICB2YXIgbWluV2lkdGggPSBjb25zdGFudCgxMCk7XG4gICAgdmFyIG1pbkhlaWdodCA9IGNvbnN0YW50KDEwKTtcblxuICAgIHZhciBmaXJzdExheWVyID0gZnVuY3Rpb24gKHNjb3BlLCBzZWxlY3Rvcikge1xuICAgICAgcmV0dXJuIGZpbHRlckZpcnN0TGF5ZXIoc2NvcGUsIHNlbGVjdG9yLCBjb25zdGFudCh0cnVlKSk7XG4gICAgfTtcbiAgICB2YXIgZmlsdGVyRmlyc3RMYXllciA9IGZ1bmN0aW9uIChzY29wZSwgc2VsZWN0b3IsIHByZWRpY2F0ZSkge1xuICAgICAgcmV0dXJuIGJpbmQoY2hpbGRyZW4oc2NvcGUpLCBmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4gaXMoeCwgc2VsZWN0b3IpID8gcHJlZGljYXRlKHgpID8gW3hdIDogW10gOiBmaWx0ZXJGaXJzdExheWVyKHgsIHNlbGVjdG9yLCBwcmVkaWNhdGUpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBsb29rdXAgPSBmdW5jdGlvbiAodGFncywgZWxlbWVudCwgaXNSb290KSB7XG4gICAgICBpZiAoaXNSb290ID09PSB2b2lkIDApIHtcbiAgICAgICAgaXNSb290ID0gbmV2ZXI7XG4gICAgICB9XG4gICAgICBpZiAoaXNSb290KGVsZW1lbnQpKSB7XG4gICAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgICAgfVxuICAgICAgaWYgKGNvbnRhaW5zKHRhZ3MsIG5hbWUoZWxlbWVudCkpKSB7XG4gICAgICAgIHJldHVybiBPcHRpb24uc29tZShlbGVtZW50KTtcbiAgICAgIH1cbiAgICAgIHZhciBpc1Jvb3RPclVwcGVyVGFibGUgPSBmdW5jdGlvbiAoZWxtKSB7XG4gICAgICAgIHJldHVybiBpcyhlbG0sICd0YWJsZScpIHx8IGlzUm9vdChlbG0pO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBhbmNlc3RvciQxKGVsZW1lbnQsIHRhZ3Muam9pbignLCcpLCBpc1Jvb3RPclVwcGVyVGFibGUpO1xuICAgIH07XG4gICAgdmFyIGNlbGwgPSBmdW5jdGlvbiAoZWxlbWVudCwgaXNSb290KSB7XG4gICAgICByZXR1cm4gbG9va3VwKFtcbiAgICAgICAgJ3RkJyxcbiAgICAgICAgJ3RoJ1xuICAgICAgXSwgZWxlbWVudCwgaXNSb290KTtcbiAgICB9O1xuICAgIHZhciBjZWxscyA9IGZ1bmN0aW9uIChhbmNlc3Rvcikge1xuICAgICAgcmV0dXJuIGZpcnN0TGF5ZXIoYW5jZXN0b3IsICd0aCx0ZCcpO1xuICAgIH07XG4gICAgdmFyIHRhYmxlID0gZnVuY3Rpb24gKGVsZW1lbnQsIGlzUm9vdCkge1xuICAgICAgcmV0dXJuIGNsb3Nlc3QkMShlbGVtZW50LCAndGFibGUnLCBpc1Jvb3QpO1xuICAgIH07XG4gICAgdmFyIHJvd3MgPSBmdW5jdGlvbiAoYW5jZXN0b3IpIHtcbiAgICAgIHJldHVybiBmaXJzdExheWVyKGFuY2VzdG9yLCAndHInKTtcbiAgICB9O1xuXG4gICAgdmFyIGZyb21UYWJsZSA9IGZ1bmN0aW9uICh0YWJsZSkge1xuICAgICAgdmFyIHJvd3MkMSA9IHJvd3ModGFibGUpO1xuICAgICAgcmV0dXJuIG1hcChyb3dzJDEsIGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSByb3c7XG4gICAgICAgIHZhciBwYXJlbnQkMSA9IHBhcmVudChlbGVtZW50KTtcbiAgICAgICAgdmFyIHBhcmVudFNlY3Rpb24gPSBwYXJlbnQkMS5tYXAoZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICB2YXIgcGFyZW50TmFtZSA9IG5hbWUocCk7XG4gICAgICAgICAgcmV0dXJuIHBhcmVudE5hbWUgPT09ICd0Zm9vdCcgfHwgcGFyZW50TmFtZSA9PT0gJ3RoZWFkJyB8fCBwYXJlbnROYW1lID09PSAndGJvZHknID8gcGFyZW50TmFtZSA6ICd0Ym9keSc7XG4gICAgICAgIH0pLmdldE9yKCd0Ym9keScpO1xuICAgICAgICB2YXIgY2VsbHMkMSA9IG1hcChjZWxscyhyb3cpLCBmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICAgIHZhciByb3dzcGFuID0gZ2V0QXR0clZhbHVlKGNlbGwsICdyb3dzcGFuJywgMSk7XG4gICAgICAgICAgdmFyIGNvbHNwYW4gPSBnZXRBdHRyVmFsdWUoY2VsbCwgJ2NvbHNwYW4nLCAxKTtcbiAgICAgICAgICByZXR1cm4gZGV0YWlsKGNlbGwsIHJvd3NwYW4sIGNvbHNwYW4pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJvd2RhdGEoZWxlbWVudCwgY2VsbHMkMSwgcGFyZW50U2VjdGlvbik7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBmcm9tUGFzdGVkUm93cyA9IGZ1bmN0aW9uIChyb3dzLCBleGFtcGxlKSB7XG4gICAgICByZXR1cm4gbWFwKHJvd3MsIGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgdmFyIGNlbGxzJDEgPSBtYXAoY2VsbHMocm93KSwgZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgICAgICB2YXIgcm93c3BhbiA9IGdldEF0dHJWYWx1ZShjZWxsLCAncm93c3BhbicsIDEpO1xuICAgICAgICAgIHZhciBjb2xzcGFuID0gZ2V0QXR0clZhbHVlKGNlbGwsICdjb2xzcGFuJywgMSk7XG4gICAgICAgICAgcmV0dXJuIGRldGFpbChjZWxsLCByb3dzcGFuLCBjb2xzcGFuKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByb3dkYXRhKHJvdywgY2VsbHMkMSwgZXhhbXBsZS5zZWN0aW9uKCkpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBrZXkgPSBmdW5jdGlvbiAocm93LCBjb2x1bW4pIHtcbiAgICAgIHJldHVybiByb3cgKyAnLCcgKyBjb2x1bW47XG4gICAgfTtcbiAgICB2YXIgZ2V0QXQgPSBmdW5jdGlvbiAod2FyZWhvdXNlLCByb3csIGNvbHVtbikge1xuICAgICAgdmFyIHJhdyA9IHdhcmVob3VzZS5hY2Nlc3Nba2V5KHJvdywgY29sdW1uKV07XG4gICAgICByZXR1cm4gcmF3ICE9PSB1bmRlZmluZWQgPyBPcHRpb24uc29tZShyYXcpIDogT3B0aW9uLm5vbmUoKTtcbiAgICB9O1xuICAgIHZhciBmaW5kSXRlbSA9IGZ1bmN0aW9uICh3YXJlaG91c2UsIGl0ZW0sIGNvbXBhcmF0b3IpIHtcbiAgICAgIHZhciBmaWx0ZXJlZCA9IGZpbHRlckl0ZW1zKHdhcmVob3VzZSwgZnVuY3Rpb24gKGRldGFpbCkge1xuICAgICAgICByZXR1cm4gY29tcGFyYXRvcihpdGVtLCBkZXRhaWwuZWxlbWVudCgpKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZpbHRlcmVkLmxlbmd0aCA+IDAgPyBPcHRpb24uc29tZShmaWx0ZXJlZFswXSkgOiBPcHRpb24ubm9uZSgpO1xuICAgIH07XG4gICAgdmFyIGZpbHRlckl0ZW1zID0gZnVuY3Rpb24gKHdhcmVob3VzZSwgcHJlZGljYXRlKSB7XG4gICAgICB2YXIgYWxsID0gYmluZCh3YXJlaG91c2UuYWxsLCBmdW5jdGlvbiAocikge1xuICAgICAgICByZXR1cm4gci5jZWxscygpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZmlsdGVyKGFsbCwgcHJlZGljYXRlKTtcbiAgICB9O1xuICAgIHZhciBnZW5lcmF0ZSA9IGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICB2YXIgYWNjZXNzID0ge307XG4gICAgICB2YXIgY2VsbHMgPSBbXTtcbiAgICAgIHZhciBtYXhSb3dzID0gbGlzdC5sZW5ndGg7XG4gICAgICB2YXIgbWF4Q29sdW1ucyA9IDA7XG4gICAgICBlYWNoKGxpc3QsIGZ1bmN0aW9uIChkZXRhaWxzLCByKSB7XG4gICAgICAgIHZhciBjdXJyZW50Um93ID0gW107XG4gICAgICAgIGVhY2goZGV0YWlscy5jZWxscygpLCBmdW5jdGlvbiAoZGV0YWlsKSB7XG4gICAgICAgICAgdmFyIHN0YXJ0ID0gMDtcbiAgICAgICAgICB3aGlsZSAoYWNjZXNzW2tleShyLCBzdGFydCldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHN0YXJ0Kys7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBjdXJyZW50ID0gZXh0ZW5kZWQoZGV0YWlsLmVsZW1lbnQoKSwgZGV0YWlsLnJvd3NwYW4oKSwgZGV0YWlsLmNvbHNwYW4oKSwgciwgc3RhcnQpO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGV0YWlsLmNvbHNwYW4oKTsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRldGFpbC5yb3dzcGFuKCk7IGorKykge1xuICAgICAgICAgICAgICB2YXIgY3IgPSByICsgajtcbiAgICAgICAgICAgICAgdmFyIGNjID0gc3RhcnQgKyBpO1xuICAgICAgICAgICAgICB2YXIgbmV3cG9zID0ga2V5KGNyLCBjYyk7XG4gICAgICAgICAgICAgIGFjY2Vzc1tuZXdwb3NdID0gY3VycmVudDtcbiAgICAgICAgICAgICAgbWF4Q29sdW1ucyA9IE1hdGgubWF4KG1heENvbHVtbnMsIGNjICsgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnJlbnRSb3cucHVzaChjdXJyZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNlbGxzLnB1c2gocm93ZGF0YShkZXRhaWxzLmVsZW1lbnQoKSwgY3VycmVudFJvdywgZGV0YWlscy5zZWN0aW9uKCkpKTtcbiAgICAgIH0pO1xuICAgICAgdmFyIGdyaWQkMSA9IGdyaWQobWF4Um93cywgbWF4Q29sdW1ucyk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBncmlkOiBncmlkJDEsXG4gICAgICAgIGFjY2VzczogYWNjZXNzLFxuICAgICAgICBhbGw6IGNlbGxzXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGZyb21UYWJsZSQxID0gZnVuY3Rpb24gKHRhYmxlKSB7XG4gICAgICB2YXIgbGlzdCA9IGZyb21UYWJsZSh0YWJsZSk7XG4gICAgICByZXR1cm4gZ2VuZXJhdGUobGlzdCk7XG4gICAgfTtcbiAgICB2YXIganVzdENlbGxzID0gZnVuY3Rpb24gKHdhcmVob3VzZSkge1xuICAgICAgdmFyIHJvd3MgPSBtYXAod2FyZWhvdXNlLmFsbCwgZnVuY3Rpb24gKHcpIHtcbiAgICAgICAgcmV0dXJuIHcuY2VsbHMoKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZsYXR0ZW4ocm93cyk7XG4gICAgfTtcbiAgICB2YXIgV2FyZWhvdXNlID0ge1xuICAgICAgZnJvbVRhYmxlOiBmcm9tVGFibGUkMSxcbiAgICAgIGdlbmVyYXRlOiBnZW5lcmF0ZSxcbiAgICAgIGdldEF0OiBnZXRBdCxcbiAgICAgIGZpbmRJdGVtOiBmaW5kSXRlbSxcbiAgICAgIGZpbHRlckl0ZW1zOiBmaWx0ZXJJdGVtcyxcbiAgICAgIGp1c3RDZWxsczoganVzdENlbGxzXG4gICAgfTtcblxuICAgIHZhciBzdGF0c1N0cnVjdCA9IGZ1bmN0aW9uIChtaW5Sb3csIG1pbkNvbCwgbWF4Um93LCBtYXhDb2wpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1pblJvdzogbWluUm93LFxuICAgICAgICBtaW5Db2w6IG1pbkNvbCxcbiAgICAgICAgbWF4Um93OiBtYXhSb3csXG4gICAgICAgIG1heENvbDogbWF4Q29sXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGZpbmRTZWxlY3RlZFN0YXRzID0gZnVuY3Rpb24gKGhvdXNlLCBpc1NlbGVjdGVkKSB7XG4gICAgICB2YXIgdG90YWxDb2x1bW5zID0gaG91c2UuZ3JpZC5jb2x1bW5zKCk7XG4gICAgICB2YXIgdG90YWxSb3dzID0gaG91c2UuZ3JpZC5yb3dzKCk7XG4gICAgICB2YXIgbWluUm93ID0gdG90YWxSb3dzO1xuICAgICAgdmFyIG1pbkNvbCA9IHRvdGFsQ29sdW1ucztcbiAgICAgIHZhciBtYXhSb3cgPSAwO1xuICAgICAgdmFyIG1heENvbCA9IDA7XG4gICAgICBlYWNoJDEoaG91c2UuYWNjZXNzLCBmdW5jdGlvbiAoZGV0YWlsKSB7XG4gICAgICAgIGlmIChpc1NlbGVjdGVkKGRldGFpbCkpIHtcbiAgICAgICAgICB2YXIgc3RhcnRSb3cgPSBkZXRhaWwucm93KCk7XG4gICAgICAgICAgdmFyIGVuZFJvdyA9IHN0YXJ0Um93ICsgZGV0YWlsLnJvd3NwYW4oKSAtIDE7XG4gICAgICAgICAgdmFyIHN0YXJ0Q29sID0gZGV0YWlsLmNvbHVtbigpO1xuICAgICAgICAgIHZhciBlbmRDb2wgPSBzdGFydENvbCArIGRldGFpbC5jb2xzcGFuKCkgLSAxO1xuICAgICAgICAgIGlmIChzdGFydFJvdyA8IG1pblJvdykge1xuICAgICAgICAgICAgbWluUm93ID0gc3RhcnRSb3c7XG4gICAgICAgICAgfSBlbHNlIGlmIChlbmRSb3cgPiBtYXhSb3cpIHtcbiAgICAgICAgICAgIG1heFJvdyA9IGVuZFJvdztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHN0YXJ0Q29sIDwgbWluQ29sKSB7XG4gICAgICAgICAgICBtaW5Db2wgPSBzdGFydENvbDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGVuZENvbCA+IG1heENvbCkge1xuICAgICAgICAgICAgbWF4Q29sID0gZW5kQ29sO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gc3RhdHNTdHJ1Y3QobWluUm93LCBtaW5Db2wsIG1heFJvdywgbWF4Q29sKTtcbiAgICB9O1xuICAgIHZhciBtYWtlQ2VsbCA9IGZ1bmN0aW9uIChsaXN0LCBzZWVuU2VsZWN0ZWQsIHJvd0luZGV4KSB7XG4gICAgICB2YXIgcm93ID0gbGlzdFtyb3dJbmRleF0uZWxlbWVudCgpO1xuICAgICAgdmFyIHRkID0gRWxlbWVudC5mcm9tVGFnKCd0ZCcpO1xuICAgICAgYXBwZW5kKHRkLCBFbGVtZW50LmZyb21UYWcoJ2JyJykpO1xuICAgICAgdmFyIGYgPSBzZWVuU2VsZWN0ZWQgPyBhcHBlbmQgOiBwcmVwZW5kO1xuICAgICAgZihyb3csIHRkKTtcbiAgICB9O1xuICAgIHZhciBmaWxsSW5HYXBzID0gZnVuY3Rpb24gKGxpc3QsIGhvdXNlLCBzdGF0cywgaXNTZWxlY3RlZCkge1xuICAgICAgdmFyIHRvdGFsQ29sdW1ucyA9IGhvdXNlLmdyaWQuY29sdW1ucygpO1xuICAgICAgdmFyIHRvdGFsUm93cyA9IGhvdXNlLmdyaWQucm93cygpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b3RhbFJvd3M7IGkrKykge1xuICAgICAgICB2YXIgc2VlblNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdG90YWxDb2x1bW5zOyBqKyspIHtcbiAgICAgICAgICBpZiAoIShpIDwgc3RhdHMubWluUm93IHx8IGkgPiBzdGF0cy5tYXhSb3cgfHwgaiA8IHN0YXRzLm1pbkNvbCB8fCBqID4gc3RhdHMubWF4Q29sKSkge1xuICAgICAgICAgICAgdmFyIG5lZWRDZWxsID0gV2FyZWhvdXNlLmdldEF0KGhvdXNlLCBpLCBqKS5maWx0ZXIoaXNTZWxlY3RlZCkuaXNOb25lKCk7XG4gICAgICAgICAgICBpZiAobmVlZENlbGwpIHtcbiAgICAgICAgICAgICAgbWFrZUNlbGwobGlzdCwgc2VlblNlbGVjdGVkLCBpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNlZW5TZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgY2xlYW4gPSBmdW5jdGlvbiAodGFibGUsIHN0YXRzKSB7XG4gICAgICB2YXIgZW1wdHlSb3dzID0gZmlsdGVyKGZpcnN0TGF5ZXIodGFibGUsICd0cicpLCBmdW5jdGlvbiAocm93KSB7XG4gICAgICAgIHJldHVybiByb3cuZG9tKCkuY2hpbGRFbGVtZW50Q291bnQgPT09IDA7XG4gICAgICB9KTtcbiAgICAgIGVhY2goZW1wdHlSb3dzLCByZW1vdmUkMik7XG4gICAgICBpZiAoc3RhdHMubWluQ29sID09PSBzdGF0cy5tYXhDb2wgfHwgc3RhdHMubWluUm93ID09PSBzdGF0cy5tYXhSb3cpIHtcbiAgICAgICAgZWFjaChmaXJzdExheWVyKHRhYmxlLCAndGgsdGQnKSwgZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgICAgICByZW1vdmUoY2VsbCwgJ3Jvd3NwYW4nKTtcbiAgICAgICAgICByZW1vdmUoY2VsbCwgJ2NvbHNwYW4nKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZW1vdmUodGFibGUsICd3aWR0aCcpO1xuICAgICAgcmVtb3ZlKHRhYmxlLCAnaGVpZ2h0Jyk7XG4gICAgICByZW1vdmUkMSh0YWJsZSwgJ3dpZHRoJyk7XG4gICAgICByZW1vdmUkMSh0YWJsZSwgJ2hlaWdodCcpO1xuICAgIH07XG4gICAgdmFyIGV4dHJhY3QgPSBmdW5jdGlvbiAodGFibGUsIHNlbGVjdGVkU2VsZWN0b3IpIHtcbiAgICAgIHZhciBpc1NlbGVjdGVkID0gZnVuY3Rpb24gKGRldGFpbCkge1xuICAgICAgICByZXR1cm4gaXMoZGV0YWlsLmVsZW1lbnQoKSwgc2VsZWN0ZWRTZWxlY3Rvcik7XG4gICAgICB9O1xuICAgICAgdmFyIGxpc3QgPSBmcm9tVGFibGUodGFibGUpO1xuICAgICAgdmFyIGhvdXNlID0gV2FyZWhvdXNlLmdlbmVyYXRlKGxpc3QpO1xuICAgICAgdmFyIHN0YXRzID0gZmluZFNlbGVjdGVkU3RhdHMoaG91c2UsIGlzU2VsZWN0ZWQpO1xuICAgICAgdmFyIHNlbGVjdG9yID0gJ3RoOm5vdCgnICsgc2VsZWN0ZWRTZWxlY3RvciArICcpJyArICcsdGQ6bm90KCcgKyBzZWxlY3RlZFNlbGVjdG9yICsgJyknO1xuICAgICAgdmFyIHVuc2VsZWN0ZWRDZWxscyA9IGZpbHRlckZpcnN0TGF5ZXIodGFibGUsICd0aCx0ZCcsIGZ1bmN0aW9uIChjZWxsKSB7XG4gICAgICAgIHJldHVybiBpcyhjZWxsLCBzZWxlY3Rvcik7XG4gICAgICB9KTtcbiAgICAgIGVhY2godW5zZWxlY3RlZENlbGxzLCByZW1vdmUkMik7XG4gICAgICBmaWxsSW5HYXBzKGxpc3QsIGhvdXNlLCBzdGF0cywgaXNTZWxlY3RlZCk7XG4gICAgICBjbGVhbih0YWJsZSwgc3RhdHMpO1xuICAgICAgcmV0dXJuIHRhYmxlO1xuICAgIH07XG5cbiAgICB2YXIgbmJzcCA9ICdcXHhBMCc7XG5cbiAgICBmdW5jdGlvbiBOb2RlVmFsdWUgKGlzLCBuYW1lKSB7XG4gICAgICB2YXIgZ2V0ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKCFpcyhlbGVtZW50KSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FuIG9ubHkgZ2V0ICcgKyBuYW1lICsgJyB2YWx1ZSBvZiBhICcgKyBuYW1lICsgJyBub2RlJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdldE9wdGlvbihlbGVtZW50KS5nZXRPcignJyk7XG4gICAgICB9O1xuICAgICAgdmFyIGdldE9wdGlvbiA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBpcyhlbGVtZW50KSA/IE9wdGlvbi5mcm9tKGVsZW1lbnQuZG9tKCkubm9kZVZhbHVlKSA6IE9wdGlvbi5ub25lKCk7XG4gICAgICB9O1xuICAgICAgdmFyIHNldCA9IGZ1bmN0aW9uIChlbGVtZW50LCB2YWx1ZSkge1xuICAgICAgICBpZiAoIWlzKGVsZW1lbnQpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gb25seSBzZXQgcmF3ICcgKyBuYW1lICsgJyB2YWx1ZSBvZiBhICcgKyBuYW1lICsgJyBub2RlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5kb20oKS5ub2RlVmFsdWUgPSB2YWx1ZTtcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBnZXQ6IGdldCxcbiAgICAgICAgZ2V0T3B0aW9uOiBnZXRPcHRpb24sXG4gICAgICAgIHNldDogc2V0XG4gICAgICB9O1xuICAgIH1cblxuICAgIHZhciBhcGkgPSBOb2RlVmFsdWUoaXNUZXh0LCAndGV4dCcpO1xuICAgIHZhciBnZXQkMyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gYXBpLmdldChlbGVtZW50KTtcbiAgICB9O1xuICAgIHZhciBnZXRPcHRpb24gPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIGFwaS5nZXRPcHRpb24oZWxlbWVudCk7XG4gICAgfTtcbiAgICB2YXIgc2V0JDIgPSBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBhcGkuc2V0KGVsZW1lbnQsIHZhbHVlKTtcbiAgICB9O1xuXG4gICAgdmFyIGdldEVuZCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gbmFtZShlbGVtZW50KSA9PT0gJ2ltZycgPyAxIDogZ2V0T3B0aW9uKGVsZW1lbnQpLmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY2hpbGRyZW4oZWxlbWVudCkubGVuZ3RoO1xuICAgICAgfSwgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIHYubGVuZ3RoO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgaXNUZXh0Tm9kZVdpdGhDdXJzb3JQb3NpdGlvbiA9IGZ1bmN0aW9uIChlbCkge1xuICAgICAgcmV0dXJuIGdldE9wdGlvbihlbCkuZmlsdGVyKGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgIHJldHVybiB0ZXh0LnRyaW0oKS5sZW5ndGggIT09IDAgfHwgdGV4dC5pbmRleE9mKG5ic3ApID4gLTE7XG4gICAgICB9KS5pc1NvbWUoKTtcbiAgICB9O1xuICAgIHZhciBlbGVtZW50c1dpdGhDdXJzb3JQb3NpdGlvbiA9IFtcbiAgICAgICdpbWcnLFxuICAgICAgJ2JyJ1xuICAgIF07XG4gICAgdmFyIGlzQ3Vyc29yUG9zaXRpb24gPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgdmFyIGhhc0N1cnNvclBvc2l0aW9uID0gaXNUZXh0Tm9kZVdpdGhDdXJzb3JQb3NpdGlvbihlbGVtKTtcbiAgICAgIHJldHVybiBoYXNDdXJzb3JQb3NpdGlvbiB8fCBjb250YWlucyhlbGVtZW50c1dpdGhDdXJzb3JQb3NpdGlvbiwgbmFtZShlbGVtKSk7XG4gICAgfTtcblxuICAgIHZhciBmaXJzdCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gZGVzY2VuZGFudChlbGVtZW50LCBpc0N1cnNvclBvc2l0aW9uKTtcbiAgICB9O1xuICAgIHZhciBsYXN0JDEgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIGRlc2NlbmRhbnRSdGwoZWxlbWVudCwgaXNDdXJzb3JQb3NpdGlvbik7XG4gICAgfTtcbiAgICB2YXIgZGVzY2VuZGFudFJ0bCA9IGZ1bmN0aW9uIChzY29wZSwgcHJlZGljYXRlKSB7XG4gICAgICB2YXIgZGVzY2VuZCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHZhciBjaGlsZHJlbiQxID0gY2hpbGRyZW4oZWxlbWVudCk7XG4gICAgICAgIGZvciAodmFyIGkgPSBjaGlsZHJlbiQxLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW4kMVtpXTtcbiAgICAgICAgICBpZiAocHJlZGljYXRlKGNoaWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuIE9wdGlvbi5zb21lKGNoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHJlcyA9IGRlc2NlbmQoY2hpbGQpO1xuICAgICAgICAgIGlmIChyZXMuaXNTb21lKCkpIHtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBkZXNjZW5kKHNjb3BlKTtcbiAgICB9O1xuXG4gICAgdmFyIGNsb25lJDEgPSBmdW5jdGlvbiAob3JpZ2luYWwsIGlzRGVlcCkge1xuICAgICAgcmV0dXJuIEVsZW1lbnQuZnJvbURvbShvcmlnaW5hbC5kb20oKS5jbG9uZU5vZGUoaXNEZWVwKSk7XG4gICAgfTtcbiAgICB2YXIgc2hhbGxvdyA9IGZ1bmN0aW9uIChvcmlnaW5hbCkge1xuICAgICAgcmV0dXJuIGNsb25lJDEob3JpZ2luYWwsIGZhbHNlKTtcbiAgICB9O1xuICAgIHZhciBkZWVwID0gZnVuY3Rpb24gKG9yaWdpbmFsKSB7XG4gICAgICByZXR1cm4gY2xvbmUkMShvcmlnaW5hbCwgdHJ1ZSk7XG4gICAgfTtcbiAgICB2YXIgc2hhbGxvd0FzID0gZnVuY3Rpb24gKG9yaWdpbmFsLCB0YWcpIHtcbiAgICAgIHZhciBudSA9IEVsZW1lbnQuZnJvbVRhZyh0YWcpO1xuICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBjbG9uZShvcmlnaW5hbCk7XG4gICAgICBzZXRBbGwobnUsIGF0dHJpYnV0ZXMpO1xuICAgICAgcmV0dXJuIG51O1xuICAgIH07XG4gICAgdmFyIGNvcHkkMSA9IGZ1bmN0aW9uIChvcmlnaW5hbCwgdGFnKSB7XG4gICAgICB2YXIgbnUgPSBzaGFsbG93QXMob3JpZ2luYWwsIHRhZyk7XG4gICAgICB2YXIgY2xvbmVDaGlsZHJlbiA9IGNoaWxkcmVuKGRlZXAob3JpZ2luYWwpKTtcbiAgICAgIGFwcGVuZCQxKG51LCBjbG9uZUNoaWxkcmVuKTtcbiAgICAgIHJldHVybiBudTtcbiAgICB9O1xuXG4gICAgdmFyIGNyZWF0ZUNlbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdGQgPSBFbGVtZW50LmZyb21UYWcoJ3RkJyk7XG4gICAgICBhcHBlbmQodGQsIEVsZW1lbnQuZnJvbVRhZygnYnInKSk7XG4gICAgICByZXR1cm4gdGQ7XG4gICAgfTtcbiAgICB2YXIgcmVwbGFjZSA9IGZ1bmN0aW9uIChjZWxsLCB0YWcsIGF0dHJzKSB7XG4gICAgICB2YXIgcmVwbGljYSA9IGNvcHkkMShjZWxsLCB0YWcpO1xuICAgICAgZWFjaCQxKGF0dHJzLCBmdW5jdGlvbiAodiwgaykge1xuICAgICAgICBpZiAodiA9PT0gbnVsbCkge1xuICAgICAgICAgIHJlbW92ZShyZXBsaWNhLCBrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXQocmVwbGljYSwgaywgdik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlcGxpY2E7XG4gICAgfTtcbiAgICB2YXIgcGFzdGVSZXBsYWNlID0gZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgIHJldHVybiBjZWxsO1xuICAgIH07XG4gICAgdmFyIG5ld1JvdyA9IGZ1bmN0aW9uIChkb2MpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBFbGVtZW50LmZyb21UYWcoJ3RyJywgZG9jLmRvbSgpKTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgY2xvbmVGb3JtYXRzID0gZnVuY3Rpb24gKG9sZENlbGwsIG5ld0NlbGwsIGZvcm1hdHMpIHtcbiAgICAgIHZhciBmaXJzdCQxID0gZmlyc3Qob2xkQ2VsbCk7XG4gICAgICByZXR1cm4gZmlyc3QkMS5tYXAoZnVuY3Rpb24gKGZpcnN0VGV4dCkge1xuICAgICAgICB2YXIgZm9ybWF0U2VsZWN0b3IgPSBmb3JtYXRzLmpvaW4oJywnKTtcbiAgICAgICAgdmFyIHBhcmVudHMgPSBhbmNlc3RvcnMkMShmaXJzdFRleHQsIGZvcm1hdFNlbGVjdG9yLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgIHJldHVybiBlcShlbGVtZW50LCBvbGRDZWxsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmb2xkcihwYXJlbnRzLCBmdW5jdGlvbiAobGFzdCwgcGFyZW50KSB7XG4gICAgICAgICAgdmFyIGNsb25lZEZvcm1hdCA9IHNoYWxsb3cocGFyZW50KTtcbiAgICAgICAgICByZW1vdmUoY2xvbmVkRm9ybWF0LCAnY29udGVudGVkaXRhYmxlJyk7XG4gICAgICAgICAgYXBwZW5kKGxhc3QsIGNsb25lZEZvcm1hdCk7XG4gICAgICAgICAgcmV0dXJuIGNsb25lZEZvcm1hdDtcbiAgICAgICAgfSwgbmV3Q2VsbCk7XG4gICAgICB9KS5nZXRPcihuZXdDZWxsKTtcbiAgICB9O1xuICAgIHZhciBjZWxsT3BlcmF0aW9ucyA9IGZ1bmN0aW9uIChtdXRhdGUsIGRvYywgZm9ybWF0c1RvQ2xvbmUpIHtcbiAgICAgIHZhciBuZXdDZWxsID0gZnVuY3Rpb24gKHByZXYpIHtcbiAgICAgICAgdmFyIGRvY3UgPSBvd25lcihwcmV2LmVsZW1lbnQoKSk7XG4gICAgICAgIHZhciB0ZCA9IEVsZW1lbnQuZnJvbVRhZyhuYW1lKHByZXYuZWxlbWVudCgpKSwgZG9jdS5kb20oKSk7XG4gICAgICAgIHZhciBmb3JtYXRzID0gZm9ybWF0c1RvQ2xvbmUuZ2V0T3IoW1xuICAgICAgICAgICdzdHJvbmcnLFxuICAgICAgICAgICdlbScsXG4gICAgICAgICAgJ2InLFxuICAgICAgICAgICdpJyxcbiAgICAgICAgICAnc3BhbicsXG4gICAgICAgICAgJ2ZvbnQnLFxuICAgICAgICAgICdoMScsXG4gICAgICAgICAgJ2gyJyxcbiAgICAgICAgICAnaDMnLFxuICAgICAgICAgICdoNCcsXG4gICAgICAgICAgJ2g1JyxcbiAgICAgICAgICAnaDYnLFxuICAgICAgICAgICdwJyxcbiAgICAgICAgICAnZGl2J1xuICAgICAgICBdKTtcbiAgICAgICAgdmFyIGxhc3ROb2RlID0gZm9ybWF0cy5sZW5ndGggPiAwID8gY2xvbmVGb3JtYXRzKHByZXYuZWxlbWVudCgpLCB0ZCwgZm9ybWF0cykgOiB0ZDtcbiAgICAgICAgYXBwZW5kKGxhc3ROb2RlLCBFbGVtZW50LmZyb21UYWcoJ2JyJykpO1xuICAgICAgICBjb3B5KHByZXYuZWxlbWVudCgpLCB0ZCk7XG4gICAgICAgIHJlbW92ZSQxKHRkLCAnaGVpZ2h0Jyk7XG4gICAgICAgIGlmIChwcmV2LmNvbHNwYW4oKSAhPT0gMSkge1xuICAgICAgICAgIHJlbW92ZSQxKHByZXYuZWxlbWVudCgpLCAnd2lkdGgnKTtcbiAgICAgICAgfVxuICAgICAgICBtdXRhdGUocHJldi5lbGVtZW50KCksIHRkKTtcbiAgICAgICAgcmV0dXJuIHRkO1xuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJvdzogbmV3Um93KGRvYyksXG4gICAgICAgIGNlbGw6IG5ld0NlbGwsXG4gICAgICAgIHJlcGxhY2U6IHJlcGxhY2UsXG4gICAgICAgIGdhcDogY3JlYXRlQ2VsbFxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBwYXN0ZSA9IGZ1bmN0aW9uIChkb2MpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJvdzogbmV3Um93KGRvYyksXG4gICAgICAgIGNlbGw6IGNyZWF0ZUNlbGwsXG4gICAgICAgIHJlcGxhY2U6IHBhc3RlUmVwbGFjZSxcbiAgICAgICAgZ2FwOiBjcmVhdGVDZWxsXG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgZnJvbUh0bWwkMSA9IGZ1bmN0aW9uIChodG1sLCBzY29wZSkge1xuICAgICAgdmFyIGRvYyA9IHNjb3BlIHx8IGRvbUdsb2JhbHMuZG9jdW1lbnQ7XG4gICAgICB2YXIgZGl2ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZGl2LmlubmVySFRNTCA9IGh0bWw7XG4gICAgICByZXR1cm4gY2hpbGRyZW4oRWxlbWVudC5mcm9tRG9tKGRpdikpO1xuICAgIH07XG4gICAgdmFyIGZyb21Eb20kMSA9IGZ1bmN0aW9uIChub2Rlcykge1xuICAgICAgcmV0dXJuIG1hcChub2RlcywgRWxlbWVudC5mcm9tRG9tKTtcbiAgICB9O1xuXG4gICAgdmFyIGluU2VsZWN0aW9uID0gZnVuY3Rpb24gKGJvdW5kcywgZGV0YWlsKSB7XG4gICAgICB2YXIgbGVmdEVkZ2UgPSBkZXRhaWwuY29sdW1uKCk7XG4gICAgICB2YXIgcmlnaHRFZGdlID0gZGV0YWlsLmNvbHVtbigpICsgZGV0YWlsLmNvbHNwYW4oKSAtIDE7XG4gICAgICB2YXIgdG9wRWRnZSA9IGRldGFpbC5yb3coKTtcbiAgICAgIHZhciBib3R0b21FZGdlID0gZGV0YWlsLnJvdygpICsgZGV0YWlsLnJvd3NwYW4oKSAtIDE7XG4gICAgICByZXR1cm4gbGVmdEVkZ2UgPD0gYm91bmRzLmZpbmlzaENvbCgpICYmIHJpZ2h0RWRnZSA+PSBib3VuZHMuc3RhcnRDb2woKSAmJiAodG9wRWRnZSA8PSBib3VuZHMuZmluaXNoUm93KCkgJiYgYm90dG9tRWRnZSA+PSBib3VuZHMuc3RhcnRSb3coKSk7XG4gICAgfTtcbiAgICB2YXIgaXNXaXRoaW4gPSBmdW5jdGlvbiAoYm91bmRzLCBkZXRhaWwpIHtcbiAgICAgIHJldHVybiBkZXRhaWwuY29sdW1uKCkgPj0gYm91bmRzLnN0YXJ0Q29sKCkgJiYgZGV0YWlsLmNvbHVtbigpICsgZGV0YWlsLmNvbHNwYW4oKSAtIDEgPD0gYm91bmRzLmZpbmlzaENvbCgpICYmIGRldGFpbC5yb3coKSA+PSBib3VuZHMuc3RhcnRSb3coKSAmJiBkZXRhaWwucm93KCkgKyBkZXRhaWwucm93c3BhbigpIC0gMSA8PSBib3VuZHMuZmluaXNoUm93KCk7XG4gICAgfTtcbiAgICB2YXIgaXNSZWN0YW5ndWxhciA9IGZ1bmN0aW9uICh3YXJlaG91c2UsIGJvdW5kcykge1xuICAgICAgdmFyIGlzUmVjdCA9IHRydWU7XG4gICAgICB2YXIgZGV0YWlsSXNXaXRoaW4gPSBjdXJyeShpc1dpdGhpbiwgYm91bmRzKTtcbiAgICAgIGZvciAodmFyIGkgPSBib3VuZHMuc3RhcnRSb3coKTsgaSA8PSBib3VuZHMuZmluaXNoUm93KCk7IGkrKykge1xuICAgICAgICBmb3IgKHZhciBqID0gYm91bmRzLnN0YXJ0Q29sKCk7IGogPD0gYm91bmRzLmZpbmlzaENvbCgpOyBqKyspIHtcbiAgICAgICAgICBpc1JlY3QgPSBpc1JlY3QgJiYgV2FyZWhvdXNlLmdldEF0KHdhcmVob3VzZSwgaSwgaikuZXhpc3RzKGRldGFpbElzV2l0aGluKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGlzUmVjdCA/IE9wdGlvbi5zb21lKGJvdW5kcykgOiBPcHRpb24ubm9uZSgpO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0Qm91bmRzID0gZnVuY3Rpb24gKGRldGFpbEEsIGRldGFpbEIpIHtcbiAgICAgIHJldHVybiBib3VuZHMoTWF0aC5taW4oZGV0YWlsQS5yb3coKSwgZGV0YWlsQi5yb3coKSksIE1hdGgubWluKGRldGFpbEEuY29sdW1uKCksIGRldGFpbEIuY29sdW1uKCkpLCBNYXRoLm1heChkZXRhaWxBLnJvdygpICsgZGV0YWlsQS5yb3dzcGFuKCkgLSAxLCBkZXRhaWxCLnJvdygpICsgZGV0YWlsQi5yb3dzcGFuKCkgLSAxKSwgTWF0aC5tYXgoZGV0YWlsQS5jb2x1bW4oKSArIGRldGFpbEEuY29sc3BhbigpIC0gMSwgZGV0YWlsQi5jb2x1bW4oKSArIGRldGFpbEIuY29sc3BhbigpIC0gMSkpO1xuICAgIH07XG4gICAgdmFyIGdldEFueUJveCA9IGZ1bmN0aW9uICh3YXJlaG91c2UsIHN0YXJ0Q2VsbCwgZmluaXNoQ2VsbCkge1xuICAgICAgdmFyIHN0YXJ0Q29vcmRzID0gV2FyZWhvdXNlLmZpbmRJdGVtKHdhcmVob3VzZSwgc3RhcnRDZWxsLCBlcSk7XG4gICAgICB2YXIgZmluaXNoQ29vcmRzID0gV2FyZWhvdXNlLmZpbmRJdGVtKHdhcmVob3VzZSwgZmluaXNoQ2VsbCwgZXEpO1xuICAgICAgcmV0dXJuIHN0YXJ0Q29vcmRzLmJpbmQoZnVuY3Rpb24gKHNjKSB7XG4gICAgICAgIHJldHVybiBmaW5pc2hDb29yZHMubWFwKGZ1bmN0aW9uIChmYykge1xuICAgICAgICAgIHJldHVybiBnZXRCb3VuZHMoc2MsIGZjKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBnZXRCb3ggPSBmdW5jdGlvbiAod2FyZWhvdXNlLCBzdGFydENlbGwsIGZpbmlzaENlbGwpIHtcbiAgICAgIHJldHVybiBnZXRBbnlCb3god2FyZWhvdXNlLCBzdGFydENlbGwsIGZpbmlzaENlbGwpLmJpbmQoZnVuY3Rpb24gKGJvdW5kcykge1xuICAgICAgICByZXR1cm4gaXNSZWN0YW5ndWxhcih3YXJlaG91c2UsIGJvdW5kcyk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIG1vdmVCeSA9IGZ1bmN0aW9uICh3YXJlaG91c2UsIGNlbGwsIHJvdywgY29sdW1uKSB7XG4gICAgICByZXR1cm4gV2FyZWhvdXNlLmZpbmRJdGVtKHdhcmVob3VzZSwgY2VsbCwgZXEpLmJpbmQoZnVuY3Rpb24gKGRldGFpbCkge1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3cgPiAwID8gZGV0YWlsLnJvdygpICsgZGV0YWlsLnJvd3NwYW4oKSAtIDEgOiBkZXRhaWwucm93KCk7XG4gICAgICAgIHZhciBzdGFydENvbCA9IGNvbHVtbiA+IDAgPyBkZXRhaWwuY29sdW1uKCkgKyBkZXRhaWwuY29sc3BhbigpIC0gMSA6IGRldGFpbC5jb2x1bW4oKTtcbiAgICAgICAgdmFyIGRlc3QgPSBXYXJlaG91c2UuZ2V0QXQod2FyZWhvdXNlLCBzdGFydFJvdyArIHJvdywgc3RhcnRDb2wgKyBjb2x1bW4pO1xuICAgICAgICByZXR1cm4gZGVzdC5tYXAoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICByZXR1cm4gZC5lbGVtZW50KCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgaW50ZXJjZXB0cyA9IGZ1bmN0aW9uICh3YXJlaG91c2UsIHN0YXJ0LCBmaW5pc2gpIHtcbiAgICAgIHJldHVybiBnZXRBbnlCb3god2FyZWhvdXNlLCBzdGFydCwgZmluaXNoKS5tYXAoZnVuY3Rpb24gKGJvdW5kcykge1xuICAgICAgICB2YXIgaW5zaWRlID0gV2FyZWhvdXNlLmZpbHRlckl0ZW1zKHdhcmVob3VzZSwgY3VycnkoaW5TZWxlY3Rpb24sIGJvdW5kcykpO1xuICAgICAgICByZXR1cm4gbWFwKGluc2lkZSwgZnVuY3Rpb24gKGRldGFpbCkge1xuICAgICAgICAgIHJldHVybiBkZXRhaWwuZWxlbWVudCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHBhcmVudENlbGwgPSBmdW5jdGlvbiAod2FyZWhvdXNlLCBpbm5lckNlbGwpIHtcbiAgICAgIHZhciBpc0NvbnRhaW5lZEJ5ID0gZnVuY3Rpb24gKGMxLCBjMikge1xuICAgICAgICByZXR1cm4gY29udGFpbnMkMihjMiwgYzEpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBXYXJlaG91c2UuZmluZEl0ZW0od2FyZWhvdXNlLCBpbm5lckNlbGwsIGlzQ29udGFpbmVkQnkpLm1hcChmdW5jdGlvbiAoZGV0YWlsKSB7XG4gICAgICAgIHJldHVybiBkZXRhaWwuZWxlbWVudCgpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBtb3ZlQnkkMSA9IGZ1bmN0aW9uIChjZWxsLCBkZWx0YVJvdywgZGVsdGFDb2x1bW4pIHtcbiAgICAgIHJldHVybiB0YWJsZShjZWxsKS5iaW5kKGZ1bmN0aW9uICh0YWJsZSkge1xuICAgICAgICB2YXIgd2FyZWhvdXNlID0gZ2V0V2FyZWhvdXNlKHRhYmxlKTtcbiAgICAgICAgcmV0dXJuIG1vdmVCeSh3YXJlaG91c2UsIGNlbGwsIGRlbHRhUm93LCBkZWx0YUNvbHVtbik7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBpbnRlcmNlcHRzJDEgPSBmdW5jdGlvbiAodGFibGUsIGZpcnN0LCBsYXN0KSB7XG4gICAgICB2YXIgd2FyZWhvdXNlID0gZ2V0V2FyZWhvdXNlKHRhYmxlKTtcbiAgICAgIHJldHVybiBpbnRlcmNlcHRzKHdhcmVob3VzZSwgZmlyc3QsIGxhc3QpO1xuICAgIH07XG4gICAgdmFyIG5lc3RlZEludGVyY2VwdHMgPSBmdW5jdGlvbiAodGFibGUsIGZpcnN0LCBmaXJzdFRhYmxlLCBsYXN0LCBsYXN0VGFibGUpIHtcbiAgICAgIHZhciB3YXJlaG91c2UgPSBnZXRXYXJlaG91c2UodGFibGUpO1xuICAgICAgdmFyIG9wdFN0YXJ0Q2VsbCA9IGVxKHRhYmxlLCBmaXJzdFRhYmxlKSA/IE9wdGlvbi5zb21lKGZpcnN0KSA6IHBhcmVudENlbGwod2FyZWhvdXNlLCBmaXJzdCk7XG4gICAgICB2YXIgb3B0TGFzdENlbGwgPSBlcSh0YWJsZSwgbGFzdFRhYmxlKSA/IE9wdGlvbi5zb21lKGxhc3QpIDogcGFyZW50Q2VsbCh3YXJlaG91c2UsIGxhc3QpO1xuICAgICAgcmV0dXJuIG9wdFN0YXJ0Q2VsbC5iaW5kKGZ1bmN0aW9uIChzdGFydENlbGwpIHtcbiAgICAgICAgcmV0dXJuIG9wdExhc3RDZWxsLmJpbmQoZnVuY3Rpb24gKGxhc3RDZWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGludGVyY2VwdHMod2FyZWhvdXNlLCBzdGFydENlbGwsIGxhc3RDZWxsKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBnZXRCb3gkMSA9IGZ1bmN0aW9uICh0YWJsZSwgZmlyc3QsIGxhc3QpIHtcbiAgICAgIHZhciB3YXJlaG91c2UgPSBnZXRXYXJlaG91c2UodGFibGUpO1xuICAgICAgcmV0dXJuIGdldEJveCh3YXJlaG91c2UsIGZpcnN0LCBsYXN0KTtcbiAgICB9O1xuICAgIHZhciBnZXRXYXJlaG91c2UgPSBXYXJlaG91c2UuZnJvbVRhYmxlO1xuXG4gICAgdmFyIFRhZ0JvdW5kYXJpZXMgPSBbXG4gICAgICAnYm9keScsXG4gICAgICAncCcsXG4gICAgICAnZGl2JyxcbiAgICAgICdhcnRpY2xlJyxcbiAgICAgICdhc2lkZScsXG4gICAgICAnZmlnY2FwdGlvbicsXG4gICAgICAnZmlndXJlJyxcbiAgICAgICdmb290ZXInLFxuICAgICAgJ2hlYWRlcicsXG4gICAgICAnbmF2JyxcbiAgICAgICdzZWN0aW9uJyxcbiAgICAgICdvbCcsXG4gICAgICAndWwnLFxuICAgICAgJ2xpJyxcbiAgICAgICd0YWJsZScsXG4gICAgICAndGhlYWQnLFxuICAgICAgJ3Rib2R5JyxcbiAgICAgICd0Zm9vdCcsXG4gICAgICAnY2FwdGlvbicsXG4gICAgICAndHInLFxuICAgICAgJ3RkJyxcbiAgICAgICd0aCcsXG4gICAgICAnaDEnLFxuICAgICAgJ2gyJyxcbiAgICAgICdoMycsXG4gICAgICAnaDQnLFxuICAgICAgJ2g1JyxcbiAgICAgICdoNicsXG4gICAgICAnYmxvY2txdW90ZScsXG4gICAgICAncHJlJyxcbiAgICAgICdhZGRyZXNzJ1xuICAgIF07XG5cbiAgICBmdW5jdGlvbiBEb21Vbml2ZXJzZSAoKSB7XG4gICAgICB2YXIgY2xvbmUkMSA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBFbGVtZW50LmZyb21Eb20oZWxlbWVudC5kb20oKS5jbG9uZU5vZGUoZmFsc2UpKTtcbiAgICAgIH07XG4gICAgICB2YXIgZG9jdW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5kb20oKS5vd25lckRvY3VtZW50O1xuICAgICAgfTtcbiAgICAgIHZhciBpc0JvdW5kYXJ5ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKCFpc0VsZW1lbnQoZWxlbWVudCkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5hbWUoZWxlbWVudCkgPT09ICdib2R5Jykge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250YWlucyhUYWdCb3VuZGFyaWVzLCBuYW1lKGVsZW1lbnQpKTtcbiAgICAgIH07XG4gICAgICB2YXIgaXNFbXB0eVRhZyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIGlmICghaXNFbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250YWlucyhbXG4gICAgICAgICAgJ2JyJyxcbiAgICAgICAgICAnaW1nJyxcbiAgICAgICAgICAnaHInLFxuICAgICAgICAgICdpbnB1dCdcbiAgICAgICAgXSwgbmFtZShlbGVtZW50KSk7XG4gICAgICB9O1xuICAgICAgdmFyIGlzTm9uRWRpdGFibGUgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gaXNFbGVtZW50KGVsZW1lbnQpICYmIGdldCQxKGVsZW1lbnQsICdjb250ZW50ZWRpdGFibGUnKSA9PT0gJ2ZhbHNlJztcbiAgICAgIH07XG4gICAgICB2YXIgY29tcGFyZVBvc2l0aW9uID0gZnVuY3Rpb24gKGVsZW1lbnQsIG90aGVyKSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50LmRvbSgpLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKG90aGVyLmRvbSgpKTtcbiAgICAgIH07XG4gICAgICB2YXIgY29weUF0dHJpYnV0ZXNUbyA9IGZ1bmN0aW9uIChzb3VyY2UsIGRlc3RpbmF0aW9uKSB7XG4gICAgICAgIHZhciBhcyA9IGNsb25lKHNvdXJjZSk7XG4gICAgICAgIHNldEFsbChkZXN0aW5hdGlvbiwgYXMpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVwOiBjb25zdGFudCh7XG4gICAgICAgICAgc2VsZWN0b3I6IGFuY2VzdG9yJDEsXG4gICAgICAgICAgY2xvc2VzdDogY2xvc2VzdCQxLFxuICAgICAgICAgIHByZWRpY2F0ZTogYW5jZXN0b3IsXG4gICAgICAgICAgYWxsOiBwYXJlbnRzXG4gICAgICAgIH0pLFxuICAgICAgICBkb3duOiBjb25zdGFudCh7XG4gICAgICAgICAgc2VsZWN0b3I6IGRlc2NlbmRhbnRzJDEsXG4gICAgICAgICAgcHJlZGljYXRlOiBkZXNjZW5kYW50c1xuICAgICAgICB9KSxcbiAgICAgICAgc3R5bGVzOiBjb25zdGFudCh7XG4gICAgICAgICAgZ2V0OiBnZXQkMixcbiAgICAgICAgICBnZXRSYXc6IGdldFJhdyxcbiAgICAgICAgICBzZXQ6IHNldCQxLFxuICAgICAgICAgIHJlbW92ZTogcmVtb3ZlJDFcbiAgICAgICAgfSksXG4gICAgICAgIGF0dHJzOiBjb25zdGFudCh7XG4gICAgICAgICAgZ2V0OiBnZXQkMSxcbiAgICAgICAgICBzZXQ6IHNldCxcbiAgICAgICAgICByZW1vdmU6IHJlbW92ZSxcbiAgICAgICAgICBjb3B5VG86IGNvcHlBdHRyaWJ1dGVzVG9cbiAgICAgICAgfSksXG4gICAgICAgIGluc2VydDogY29uc3RhbnQoe1xuICAgICAgICAgIGJlZm9yZTogYmVmb3JlLFxuICAgICAgICAgIGFmdGVyOiBhZnRlcixcbiAgICAgICAgICBhZnRlckFsbDogYWZ0ZXIkMSxcbiAgICAgICAgICBhcHBlbmQ6IGFwcGVuZCxcbiAgICAgICAgICBhcHBlbmRBbGw6IGFwcGVuZCQxLFxuICAgICAgICAgIHByZXBlbmQ6IHByZXBlbmQsXG4gICAgICAgICAgd3JhcDogd3JhcFxuICAgICAgICB9KSxcbiAgICAgICAgcmVtb3ZlOiBjb25zdGFudCh7XG4gICAgICAgICAgdW53cmFwOiB1bndyYXAsXG4gICAgICAgICAgcmVtb3ZlOiByZW1vdmUkMlxuICAgICAgICB9KSxcbiAgICAgICAgY3JlYXRlOiBjb25zdGFudCh7XG4gICAgICAgICAgbnU6IEVsZW1lbnQuZnJvbVRhZyxcbiAgICAgICAgICBjbG9uZTogY2xvbmUkMSxcbiAgICAgICAgICB0ZXh0OiBFbGVtZW50LmZyb21UZXh0XG4gICAgICAgIH0pLFxuICAgICAgICBxdWVyeTogY29uc3RhbnQoe1xuICAgICAgICAgIGNvbXBhcmVQb3NpdGlvbjogY29tcGFyZVBvc2l0aW9uLFxuICAgICAgICAgIHByZXZTaWJsaW5nOiBwcmV2U2libGluZyxcbiAgICAgICAgICBuZXh0U2libGluZzogbmV4dFNpYmxpbmdcbiAgICAgICAgfSksXG4gICAgICAgIHByb3BlcnR5OiBjb25zdGFudCh7XG4gICAgICAgICAgY2hpbGRyZW46IGNoaWxkcmVuLFxuICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgcGFyZW50OiBwYXJlbnQsXG4gICAgICAgICAgZG9jdW1lbnQ6IGRvY3VtZW50LFxuICAgICAgICAgIGlzVGV4dDogaXNUZXh0LFxuICAgICAgICAgIGlzQ29tbWVudDogaXNDb21tZW50LFxuICAgICAgICAgIGlzRWxlbWVudDogaXNFbGVtZW50LFxuICAgICAgICAgIGdldFRleHQ6IGdldCQzLFxuICAgICAgICAgIHNldFRleHQ6IHNldCQyLFxuICAgICAgICAgIGlzQm91bmRhcnk6IGlzQm91bmRhcnksXG4gICAgICAgICAgaXNFbXB0eVRhZzogaXNFbXB0eVRhZyxcbiAgICAgICAgICBpc05vbkVkaXRhYmxlOiBpc05vbkVkaXRhYmxlXG4gICAgICAgIH0pLFxuICAgICAgICBlcTogZXEsXG4gICAgICAgIGlzOiBpcyQxXG4gICAgICB9O1xuICAgIH1cblxuICAgIHZhciBhbGwkMSA9IGZ1bmN0aW9uICh1bml2ZXJzZSwgbG9vaywgZWxlbWVudHMsIGYpIHtcbiAgICAgIHZhciBoZWFkID0gZWxlbWVudHNbMF07XG4gICAgICB2YXIgdGFpbCA9IGVsZW1lbnRzLnNsaWNlKDEpO1xuICAgICAgcmV0dXJuIGYodW5pdmVyc2UsIGxvb2ssIGhlYWQsIHRhaWwpO1xuICAgIH07XG4gICAgdmFyIG9uZUFsbCA9IGZ1bmN0aW9uICh1bml2ZXJzZSwgbG9vaywgZWxlbWVudHMpIHtcbiAgICAgIHJldHVybiBlbGVtZW50cy5sZW5ndGggPiAwID8gYWxsJDEodW5pdmVyc2UsIGxvb2ssIGVsZW1lbnRzLCB1bnNhZmVPbmUpIDogT3B0aW9uLm5vbmUoKTtcbiAgICB9O1xuICAgIHZhciB1bnNhZmVPbmUgPSBmdW5jdGlvbiAodW5pdmVyc2UsIGxvb2ssIGhlYWQsIHRhaWwpIHtcbiAgICAgIHZhciBzdGFydCA9IGxvb2sodW5pdmVyc2UsIGhlYWQpO1xuICAgICAgcmV0dXJuIGZvbGRyKHRhaWwsIGZ1bmN0aW9uIChiLCBhKSB7XG4gICAgICAgIHZhciBjdXJyZW50ID0gbG9vayh1bml2ZXJzZSwgYSk7XG4gICAgICAgIHJldHVybiBjb21tb25FbGVtZW50KHVuaXZlcnNlLCBiLCBjdXJyZW50KTtcbiAgICAgIH0sIHN0YXJ0KTtcbiAgICB9O1xuICAgIHZhciBjb21tb25FbGVtZW50ID0gZnVuY3Rpb24gKHVuaXZlcnNlLCBzdGFydCwgZW5kKSB7XG4gICAgICByZXR1cm4gc3RhcnQuYmluZChmdW5jdGlvbiAocykge1xuICAgICAgICByZXR1cm4gZW5kLmZpbHRlcihjdXJyeSh1bml2ZXJzZS5lcSwgcykpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBlcSQxID0gZnVuY3Rpb24gKHVuaXZlcnNlLCBpdGVtKSB7XG4gICAgICByZXR1cm4gY3VycnkodW5pdmVyc2UuZXEsIGl0ZW0pO1xuICAgIH07XG4gICAgdmFyIGFuY2VzdG9ycyQyID0gZnVuY3Rpb24gKHVuaXZlcnNlLCBzdGFydCwgZW5kLCBpc1Jvb3QpIHtcbiAgICAgIGlmIChpc1Jvb3QgPT09IHZvaWQgMCkge1xuICAgICAgICBpc1Jvb3QgPSBuZXZlcjtcbiAgICAgIH1cbiAgICAgIHZhciBwczEgPSBbc3RhcnRdLmNvbmNhdCh1bml2ZXJzZS51cCgpLmFsbChzdGFydCkpO1xuICAgICAgdmFyIHBzMiA9IFtlbmRdLmNvbmNhdCh1bml2ZXJzZS51cCgpLmFsbChlbmQpKTtcbiAgICAgIHZhciBwcnVuZSA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGZpbmRJbmRleChwYXRoLCBpc1Jvb3QpO1xuICAgICAgICByZXR1cm4gaW5kZXguZm9sZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChpbmQpIHtcbiAgICAgICAgICByZXR1cm4gcGF0aC5zbGljZSgwLCBpbmQgKyAxKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgdmFyIHBydW5lZDEgPSBwcnVuZShwczEpO1xuICAgICAgdmFyIHBydW5lZDIgPSBwcnVuZShwczIpO1xuICAgICAgdmFyIHNoYXJlZCA9IGZpbmQocHJ1bmVkMSwgZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIGV4aXN0cyhwcnVuZWQyLCBlcSQxKHVuaXZlcnNlLCB4KSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZpcnN0cGF0aDogY29uc3RhbnQocHJ1bmVkMSksXG4gICAgICAgIHNlY29uZHBhdGg6IGNvbnN0YW50KHBydW5lZDIpLFxuICAgICAgICBzaGFyZWQ6IGNvbnN0YW50KHNoYXJlZClcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciBzaGFyZWRPbmUgPSBvbmVBbGw7XG4gICAgdmFyIGFuY2VzdG9ycyQzID0gYW5jZXN0b3JzJDI7XG5cbiAgICB2YXIgdW5pdmVyc2UgPSBEb21Vbml2ZXJzZSgpO1xuICAgIHZhciBzaGFyZWRPbmUkMSA9IGZ1bmN0aW9uIChsb29rLCBlbGVtZW50cykge1xuICAgICAgcmV0dXJuIHNoYXJlZE9uZSh1bml2ZXJzZSwgZnVuY3Rpb24gKF91bml2ZXJzZSwgZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gbG9vayhlbGVtZW50KTtcbiAgICAgIH0sIGVsZW1lbnRzKTtcbiAgICB9O1xuICAgIHZhciBhbmNlc3RvcnMkNCA9IGZ1bmN0aW9uIChzdGFydCwgZmluaXNoLCBpc1Jvb3QpIHtcbiAgICAgIHJldHVybiBhbmNlc3RvcnMkMyh1bml2ZXJzZSwgc3RhcnQsIGZpbmlzaCwgaXNSb290KTtcbiAgICB9O1xuXG4gICAgdmFyIGxvb2t1cFRhYmxlID0gZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuICAgICAgcmV0dXJuIGFuY2VzdG9yJDEoY29udGFpbmVyLCAndGFibGUnKTtcbiAgICB9O1xuICAgIHZhciBpZGVudGlmeSA9IGZ1bmN0aW9uIChzdGFydCwgZmluaXNoLCBpc1Jvb3QpIHtcbiAgICAgIHZhciBnZXRJc1Jvb3QgPSBmdW5jdGlvbiAocm9vdFRhYmxlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgIHJldHVybiBpc1Jvb3QgIT09IHVuZGVmaW5lZCAmJiBpc1Jvb3QoZWxlbWVudCkgfHwgZXEoZWxlbWVudCwgcm9vdFRhYmxlKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICBpZiAoZXEoc3RhcnQsIGZpbmlzaCkpIHtcbiAgICAgICAgcmV0dXJuIE9wdGlvbi5zb21lKHtcbiAgICAgICAgICBib3hlczogT3B0aW9uLnNvbWUoW3N0YXJ0XSksXG4gICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICAgIGZpbmlzaDogZmluaXNoXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGxvb2t1cFRhYmxlKHN0YXJ0KS5iaW5kKGZ1bmN0aW9uIChzdGFydFRhYmxlKSB7XG4gICAgICAgICAgcmV0dXJuIGxvb2t1cFRhYmxlKGZpbmlzaCkuYmluZChmdW5jdGlvbiAoZmluaXNoVGFibGUpIHtcbiAgICAgICAgICAgIGlmIChlcShzdGFydFRhYmxlLCBmaW5pc2hUYWJsZSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIE9wdGlvbi5zb21lKHtcbiAgICAgICAgICAgICAgICBib3hlczogaW50ZXJjZXB0cyQxKHN0YXJ0VGFibGUsIHN0YXJ0LCBmaW5pc2gpLFxuICAgICAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgICAgICAgICBmaW5pc2g6IGZpbmlzaFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udGFpbnMkMihzdGFydFRhYmxlLCBmaW5pc2hUYWJsZSkpIHtcbiAgICAgICAgICAgICAgdmFyIGFuY2VzdG9yQ2VsbHMgPSBhbmNlc3RvcnMkMShmaW5pc2gsICd0ZCx0aCcsIGdldElzUm9vdChzdGFydFRhYmxlKSk7XG4gICAgICAgICAgICAgIHZhciBmaW5pc2hDZWxsID0gYW5jZXN0b3JDZWxscy5sZW5ndGggPiAwID8gYW5jZXN0b3JDZWxsc1thbmNlc3RvckNlbGxzLmxlbmd0aCAtIDFdIDogZmluaXNoO1xuICAgICAgICAgICAgICByZXR1cm4gT3B0aW9uLnNvbWUoe1xuICAgICAgICAgICAgICAgIGJveGVzOiBuZXN0ZWRJbnRlcmNlcHRzKHN0YXJ0VGFibGUsIHN0YXJ0LCBzdGFydFRhYmxlLCBmaW5pc2gsIGZpbmlzaFRhYmxlKSxcbiAgICAgICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICAgICAgZmluaXNoOiBmaW5pc2hDZWxsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb250YWlucyQyKGZpbmlzaFRhYmxlLCBzdGFydFRhYmxlKSkge1xuICAgICAgICAgICAgICB2YXIgYW5jZXN0b3JDZWxscyA9IGFuY2VzdG9ycyQxKHN0YXJ0LCAndGQsdGgnLCBnZXRJc1Jvb3QoZmluaXNoVGFibGUpKTtcbiAgICAgICAgICAgICAgdmFyIHN0YXJ0Q2VsbCA9IGFuY2VzdG9yQ2VsbHMubGVuZ3RoID4gMCA/IGFuY2VzdG9yQ2VsbHNbYW5jZXN0b3JDZWxscy5sZW5ndGggLSAxXSA6IHN0YXJ0O1xuICAgICAgICAgICAgICByZXR1cm4gT3B0aW9uLnNvbWUoe1xuICAgICAgICAgICAgICAgIGJveGVzOiBuZXN0ZWRJbnRlcmNlcHRzKGZpbmlzaFRhYmxlLCBzdGFydCwgc3RhcnRUYWJsZSwgZmluaXNoLCBmaW5pc2hUYWJsZSksXG4gICAgICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICAgICAgICAgIGZpbmlzaDogc3RhcnRDZWxsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGFuY2VzdG9ycyQ0KHN0YXJ0LCBmaW5pc2gpLnNoYXJlZCgpLmJpbmQoZnVuY3Rpb24gKGxjYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjbG9zZXN0JDEobGNhLCAndGFibGUnLCBpc1Jvb3QpLmJpbmQoZnVuY3Rpb24gKGxjYVRhYmxlKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgZmluaXNoQW5jZXN0b3JDZWxscyA9IGFuY2VzdG9ycyQxKGZpbmlzaCwgJ3RkLHRoJywgZ2V0SXNSb290KGxjYVRhYmxlKSk7XG4gICAgICAgICAgICAgICAgICB2YXIgZmluaXNoQ2VsbCA9IGZpbmlzaEFuY2VzdG9yQ2VsbHMubGVuZ3RoID4gMCA/IGZpbmlzaEFuY2VzdG9yQ2VsbHNbZmluaXNoQW5jZXN0b3JDZWxscy5sZW5ndGggLSAxXSA6IGZpbmlzaDtcbiAgICAgICAgICAgICAgICAgIHZhciBzdGFydEFuY2VzdG9yQ2VsbHMgPSBhbmNlc3RvcnMkMShzdGFydCwgJ3RkLHRoJywgZ2V0SXNSb290KGxjYVRhYmxlKSk7XG4gICAgICAgICAgICAgICAgICB2YXIgc3RhcnRDZWxsID0gc3RhcnRBbmNlc3RvckNlbGxzLmxlbmd0aCA+IDAgPyBzdGFydEFuY2VzdG9yQ2VsbHNbc3RhcnRBbmNlc3RvckNlbGxzLmxlbmd0aCAtIDFdIDogc3RhcnQ7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gT3B0aW9uLnNvbWUoe1xuICAgICAgICAgICAgICAgICAgICBib3hlczogbmVzdGVkSW50ZXJjZXB0cyhsY2FUYWJsZSwgc3RhcnQsIHN0YXJ0VGFibGUsIGZpbmlzaCwgZmluaXNoVGFibGUpLFxuICAgICAgICAgICAgICAgICAgICBzdGFydDogc3RhcnRDZWxsLFxuICAgICAgICAgICAgICAgICAgICBmaW5pc2g6IGZpbmlzaENlbGxcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgcmV0cmlldmUgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBzZWxlY3Rvcikge1xuICAgICAgdmFyIHNlbHMgPSBkZXNjZW5kYW50cyQxKGNvbnRhaW5lciwgc2VsZWN0b3IpO1xuICAgICAgcmV0dXJuIHNlbHMubGVuZ3RoID4gMCA/IE9wdGlvbi5zb21lKHNlbHMpIDogT3B0aW9uLm5vbmUoKTtcbiAgICB9O1xuICAgIHZhciBnZXRMYXN0ID0gZnVuY3Rpb24gKGJveGVzLCBsYXN0U2VsZWN0ZWRTZWxlY3Rvcikge1xuICAgICAgcmV0dXJuIGZpbmQoYm94ZXMsIGZ1bmN0aW9uIChib3gpIHtcbiAgICAgICAgcmV0dXJuIGlzKGJveCwgbGFzdFNlbGVjdGVkU2VsZWN0b3IpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgZ2V0RWRnZXMgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBmaXJzdFNlbGVjdGVkU2VsZWN0b3IsIGxhc3RTZWxlY3RlZFNlbGVjdG9yKSB7XG4gICAgICByZXR1cm4gZGVzY2VuZGFudCQxKGNvbnRhaW5lciwgZmlyc3RTZWxlY3RlZFNlbGVjdG9yKS5iaW5kKGZ1bmN0aW9uIChmaXJzdCkge1xuICAgICAgICByZXR1cm4gZGVzY2VuZGFudCQxKGNvbnRhaW5lciwgbGFzdFNlbGVjdGVkU2VsZWN0b3IpLmJpbmQoZnVuY3Rpb24gKGxhc3QpIHtcbiAgICAgICAgICByZXR1cm4gc2hhcmVkT25lJDEobG9va3VwVGFibGUsIFtcbiAgICAgICAgICAgIGZpcnN0LFxuICAgICAgICAgICAgbGFzdFxuICAgICAgICAgIF0pLm1hcChmdW5jdGlvbiAodGJsKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBmaXJzdDogY29uc3RhbnQoZmlyc3QpLFxuICAgICAgICAgICAgICBsYXN0OiBjb25zdGFudChsYXN0KSxcbiAgICAgICAgICAgICAgdGFibGU6IGNvbnN0YW50KHRibClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgZXhwYW5kVG8gPSBmdW5jdGlvbiAoZmluaXNoLCBmaXJzdFNlbGVjdGVkU2VsZWN0b3IpIHtcbiAgICAgIHJldHVybiBhbmNlc3RvciQxKGZpbmlzaCwgJ3RhYmxlJykuYmluZChmdW5jdGlvbiAodGFibGUpIHtcbiAgICAgICAgcmV0dXJuIGRlc2NlbmRhbnQkMSh0YWJsZSwgZmlyc3RTZWxlY3RlZFNlbGVjdG9yKS5iaW5kKGZ1bmN0aW9uIChzdGFydCkge1xuICAgICAgICAgIHJldHVybiBpZGVudGlmeShzdGFydCwgZmluaXNoKS5iaW5kKGZ1bmN0aW9uIChpZGVudGlmaWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gaWRlbnRpZmllZC5ib3hlcy5tYXAoZnVuY3Rpb24gKGJveGVzKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYm94ZXM6IGJveGVzLFxuICAgICAgICAgICAgICAgIHN0YXJ0OiBpZGVudGlmaWVkLnN0YXJ0LFxuICAgICAgICAgICAgICAgIGZpbmlzaDogaWRlbnRpZmllZC5maW5pc2hcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHNoaWZ0U2VsZWN0aW9uID0gZnVuY3Rpb24gKGJveGVzLCBkZWx0YVJvdywgZGVsdGFDb2x1bW4sIGZpcnN0U2VsZWN0ZWRTZWxlY3RvciwgbGFzdFNlbGVjdGVkU2VsZWN0b3IpIHtcbiAgICAgIHJldHVybiBnZXRMYXN0KGJveGVzLCBsYXN0U2VsZWN0ZWRTZWxlY3RvcikuYmluZChmdW5jdGlvbiAobGFzdCkge1xuICAgICAgICByZXR1cm4gbW92ZUJ5JDEobGFzdCwgZGVsdGFSb3csIGRlbHRhQ29sdW1uKS5iaW5kKGZ1bmN0aW9uIChmaW5pc2gpIHtcbiAgICAgICAgICByZXR1cm4gZXhwYW5kVG8oZmluaXNoLCBmaXJzdFNlbGVjdGVkU2VsZWN0b3IpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgcmV0cmlldmUkMSA9IGZ1bmN0aW9uIChjb250YWluZXIsIHNlbGVjdG9yKSB7XG4gICAgICByZXR1cm4gcmV0cmlldmUoY29udGFpbmVyLCBzZWxlY3Rvcik7XG4gICAgfTtcbiAgICB2YXIgcmV0cmlldmVCb3ggPSBmdW5jdGlvbiAoY29udGFpbmVyLCBmaXJzdFNlbGVjdGVkU2VsZWN0b3IsIGxhc3RTZWxlY3RlZFNlbGVjdG9yKSB7XG4gICAgICByZXR1cm4gZ2V0RWRnZXMoY29udGFpbmVyLCBmaXJzdFNlbGVjdGVkU2VsZWN0b3IsIGxhc3RTZWxlY3RlZFNlbGVjdG9yKS5iaW5kKGZ1bmN0aW9uIChlZGdlcykge1xuICAgICAgICB2YXIgaXNSb290ID0gZnVuY3Rpb24gKGFuY2VzdG9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVxKGNvbnRhaW5lciwgYW5jZXN0b3IpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZmlyc3RBbmNlc3RvciA9IGFuY2VzdG9yJDEoZWRnZXMuZmlyc3QoKSwgJ3RoZWFkLHRmb290LHRib2R5LHRhYmxlJywgaXNSb290KTtcbiAgICAgICAgdmFyIGxhc3RBbmNlc3RvciA9IGFuY2VzdG9yJDEoZWRnZXMubGFzdCgpLCAndGhlYWQsdGZvb3QsdGJvZHksdGFibGUnLCBpc1Jvb3QpO1xuICAgICAgICByZXR1cm4gZmlyc3RBbmNlc3Rvci5iaW5kKGZ1bmN0aW9uIChmQSkge1xuICAgICAgICAgIHJldHVybiBsYXN0QW5jZXN0b3IuYmluZChmdW5jdGlvbiAobEEpIHtcbiAgICAgICAgICAgIHJldHVybiBlcShmQSwgbEEpID8gZ2V0Qm94JDEoZWRnZXMudGFibGUoKSwgZWRnZXMuZmlyc3QoKSwgZWRnZXMubGFzdCgpKSA6IE9wdGlvbi5ub25lKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBzdHJTZWxlY3RlZCA9ICdkYXRhLW1jZS1zZWxlY3RlZCc7XG4gICAgdmFyIHN0clNlbGVjdGVkU2VsZWN0b3IgPSAndGRbJyArIHN0clNlbGVjdGVkICsgJ10sdGhbJyArIHN0clNlbGVjdGVkICsgJ10nO1xuICAgIHZhciBzdHJBdHRyaWJ1dGVTZWxlY3RvciA9ICdbJyArIHN0clNlbGVjdGVkICsgJ10nO1xuICAgIHZhciBzdHJGaXJzdFNlbGVjdGVkID0gJ2RhdGEtbWNlLWZpcnN0LXNlbGVjdGVkJztcbiAgICB2YXIgc3RyRmlyc3RTZWxlY3RlZFNlbGVjdG9yID0gJ3RkWycgKyBzdHJGaXJzdFNlbGVjdGVkICsgJ10sdGhbJyArIHN0ckZpcnN0U2VsZWN0ZWQgKyAnXSc7XG4gICAgdmFyIHN0ckxhc3RTZWxlY3RlZCA9ICdkYXRhLW1jZS1sYXN0LXNlbGVjdGVkJztcbiAgICB2YXIgc3RyTGFzdFNlbGVjdGVkU2VsZWN0b3IgPSAndGRbJyArIHN0ckxhc3RTZWxlY3RlZCArICddLHRoWycgKyBzdHJMYXN0U2VsZWN0ZWQgKyAnXSc7XG4gICAgdmFyIHNlbGVjdGVkID0gc3RyU2VsZWN0ZWQ7XG4gICAgdmFyIHNlbGVjdGVkU2VsZWN0b3IgPSBzdHJTZWxlY3RlZFNlbGVjdG9yO1xuICAgIHZhciBhdHRyaWJ1dGVTZWxlY3RvciA9IHN0ckF0dHJpYnV0ZVNlbGVjdG9yO1xuICAgIHZhciBmaXJzdFNlbGVjdGVkID0gc3RyRmlyc3RTZWxlY3RlZDtcbiAgICB2YXIgZmlyc3RTZWxlY3RlZFNlbGVjdG9yID0gc3RyRmlyc3RTZWxlY3RlZFNlbGVjdG9yO1xuICAgIHZhciBsYXN0U2VsZWN0ZWQgPSBzdHJMYXN0U2VsZWN0ZWQ7XG4gICAgdmFyIGxhc3RTZWxlY3RlZFNlbGVjdG9yID0gc3RyTGFzdFNlbGVjdGVkU2VsZWN0b3I7XG5cbiAgICB2YXIgRXBoZW1lcmEgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICAgICAgc2VsZWN0ZWQ6IHNlbGVjdGVkLFxuICAgICAgICBzZWxlY3RlZFNlbGVjdG9yOiBzZWxlY3RlZFNlbGVjdG9yLFxuICAgICAgICBhdHRyaWJ1dGVTZWxlY3RvcjogYXR0cmlidXRlU2VsZWN0b3IsXG4gICAgICAgIGZpcnN0U2VsZWN0ZWQ6IGZpcnN0U2VsZWN0ZWQsXG4gICAgICAgIGZpcnN0U2VsZWN0ZWRTZWxlY3RvcjogZmlyc3RTZWxlY3RlZFNlbGVjdG9yLFxuICAgICAgICBsYXN0U2VsZWN0ZWQ6IGxhc3RTZWxlY3RlZCxcbiAgICAgICAgbGFzdFNlbGVjdGVkU2VsZWN0b3I6IGxhc3RTZWxlY3RlZFNlbGVjdG9yXG4gICAgfSk7XG5cbiAgICB2YXIgZ2VuZXJhdGUkMSA9IGZ1bmN0aW9uIChjYXNlcykge1xuICAgICAgaWYgKCFpc0FycmF5KGNhc2VzKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nhc2VzIG11c3QgYmUgYW4gYXJyYXknKTtcbiAgICAgIH1cbiAgICAgIGlmIChjYXNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGVyZSBtdXN0IGJlIGF0IGxlYXN0IG9uZSBjYXNlJyk7XG4gICAgICB9XG4gICAgICB2YXIgY29uc3RydWN0b3JzID0gW107XG4gICAgICB2YXIgYWR0ID0ge307XG4gICAgICBlYWNoKGNhc2VzLCBmdW5jdGlvbiAoYWNhc2UsIGNvdW50KSB7XG4gICAgICAgIHZhciBrZXlzJDEgPSBrZXlzKGFjYXNlKTtcbiAgICAgICAgaWYgKGtleXMkMS5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ29uZSBhbmQgb25seSBvbmUgbmFtZSBwZXIgY2FzZScpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBrZXkgPSBrZXlzJDFbMF07XG4gICAgICAgIHZhciB2YWx1ZSA9IGFjYXNlW2tleV07XG4gICAgICAgIGlmIChhZHRba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdkdXBsaWNhdGUga2V5IGRldGVjdGVkOicgKyBrZXkpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ2NhdGEnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYW5ub3QgaGF2ZSBhIGNhc2UgbmFtZWQgY2F0YSAoc29ycnkpJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYXNlIGFyZ3VtZW50cyBtdXN0IGJlIGFuIGFycmF5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3RydWN0b3JzLnB1c2goa2V5KTtcbiAgICAgICAgYWR0W2tleV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGFyZ0xlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgICAgaWYgKGFyZ0xlbmd0aCAhPT0gdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIG51bWJlciBvZiBhcmd1bWVudHMgdG8gY2FzZSAnICsga2V5ICsgJy4gRXhwZWN0ZWQgJyArIHZhbHVlLmxlbmd0aCArICcgKCcgKyB2YWx1ZSArICcpLCBnb3QgJyArIGFyZ0xlbmd0aCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ0xlbmd0aCk7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgbWF0Y2ggPSBmdW5jdGlvbiAoYnJhbmNoZXMpIHtcbiAgICAgICAgICAgIHZhciBicmFuY2hLZXlzID0ga2V5cyhicmFuY2hlcyk7XG4gICAgICAgICAgICBpZiAoY29uc3RydWN0b3JzLmxlbmd0aCAhPT0gYnJhbmNoS2V5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBudW1iZXIgb2YgYXJndW1lbnRzIHRvIG1hdGNoLiBFeHBlY3RlZDogJyArIGNvbnN0cnVjdG9ycy5qb2luKCcsJykgKyAnXFxuQWN0dWFsOiAnICsgYnJhbmNoS2V5cy5qb2luKCcsJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGFsbFJlcWQgPSBmb3JhbGwoY29uc3RydWN0b3JzLCBmdW5jdGlvbiAocmVxS2V5KSB7XG4gICAgICAgICAgICAgIHJldHVybiBjb250YWlucyhicmFuY2hLZXlzLCByZXFLZXkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWFsbFJlcWQpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgYWxsIGJyYW5jaGVzIHdlcmUgc3BlY2lmaWVkIHdoZW4gdXNpbmcgbWF0Y2guIFNwZWNpZmllZDogJyArIGJyYW5jaEtleXMuam9pbignLCAnKSArICdcXG5SZXF1aXJlZDogJyArIGNvbnN0cnVjdG9ycy5qb2luKCcsICcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBicmFuY2hlc1trZXldLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZvbGQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggIT09IGNhc2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBmb2xkLiBFeHBlY3RlZCAnICsgY2FzZXMubGVuZ3RoICsgJywgZ290ICcgKyBhcmd1bWVudHMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gYXJndW1lbnRzW2NvdW50XTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldC5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtYXRjaDogbWF0Y2gsXG4gICAgICAgICAgICBsb2c6IGZ1bmN0aW9uIChsYWJlbCkge1xuICAgICAgICAgICAgICBkb21HbG9iYWxzLmNvbnNvbGUubG9nKGxhYmVsLCB7XG4gICAgICAgICAgICAgICAgY29uc3RydWN0b3JzOiBjb25zdHJ1Y3RvcnMsXG4gICAgICAgICAgICAgICAgY29uc3RydWN0b3I6IGtleSxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IGFyZ3NcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGFkdDtcbiAgICB9O1xuICAgIHZhciBBZHQgPSB7IGdlbmVyYXRlOiBnZW5lcmF0ZSQxIH07XG5cbiAgICB2YXIgdHlwZSQxID0gQWR0LmdlbmVyYXRlKFtcbiAgICAgIHsgbm9uZTogW10gfSxcbiAgICAgIHsgbXVsdGlwbGU6IFsnZWxlbWVudHMnXSB9LFxuICAgICAgeyBzaW5nbGU6IFsnc2VsZWN0aW9uJ10gfVxuICAgIF0pO1xuICAgIHZhciBjYXRhID0gZnVuY3Rpb24gKHN1YmplY3QsIG9uTm9uZSwgb25NdWx0aXBsZSwgb25TaW5nbGUpIHtcbiAgICAgIHJldHVybiBzdWJqZWN0LmZvbGQob25Ob25lLCBvbk11bHRpcGxlLCBvblNpbmdsZSk7XG4gICAgfTtcbiAgICB2YXIgbm9uZSQxID0gdHlwZSQxLm5vbmU7XG4gICAgdmFyIG11bHRpcGxlID0gdHlwZSQxLm11bHRpcGxlO1xuICAgIHZhciBzaW5nbGUgPSB0eXBlJDEuc2luZ2xlO1xuXG4gICAgdmFyIHNlbGVjdGlvbiA9IGZ1bmN0aW9uIChjZWxsLCBzZWxlY3Rpb25zKSB7XG4gICAgICByZXR1cm4gY2F0YShzZWxlY3Rpb25zLmdldCgpLCBjb25zdGFudChbXSksIGlkZW50aXR5LCBjb25zdGFudChbY2VsbF0pKTtcbiAgICB9O1xuICAgIHZhciB1bm1lcmdhYmxlID0gZnVuY3Rpb24gKGNlbGwsIHNlbGVjdGlvbnMpIHtcbiAgICAgIHZhciBoYXNTcGFuID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgcmV0dXJuIGhhcyQxKGVsZW0sICdyb3dzcGFuJykgJiYgcGFyc2VJbnQoZ2V0JDEoZWxlbSwgJ3Jvd3NwYW4nKSwgMTApID4gMSB8fCBoYXMkMShlbGVtLCAnY29sc3BhbicpICYmIHBhcnNlSW50KGdldCQxKGVsZW0sICdjb2xzcGFuJyksIDEwKSA+IDE7XG4gICAgICB9O1xuICAgICAgdmFyIGNhbmRpZGF0ZXMgPSBzZWxlY3Rpb24oY2VsbCwgc2VsZWN0aW9ucyk7XG4gICAgICByZXR1cm4gY2FuZGlkYXRlcy5sZW5ndGggPiAwICYmIGZvcmFsbChjYW5kaWRhdGVzLCBoYXNTcGFuKSA/IE9wdGlvbi5zb21lKGNhbmRpZGF0ZXMpIDogT3B0aW9uLm5vbmUoKTtcbiAgICB9O1xuICAgIHZhciBtZXJnYWJsZSA9IGZ1bmN0aW9uICh0YWJsZSwgc2VsZWN0aW9ucykge1xuICAgICAgcmV0dXJuIGNhdGEoc2VsZWN0aW9ucy5nZXQoKSwgT3B0aW9uLm5vbmUsIGZ1bmN0aW9uIChjZWxscywgX2Vudikge1xuICAgICAgICBpZiAoY2VsbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIE9wdGlvbi5ub25lKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHJpZXZlQm94KHRhYmxlLCBmaXJzdFNlbGVjdGVkU2VsZWN0b3IsIGxhc3RTZWxlY3RlZFNlbGVjdG9yKS5iaW5kKGZ1bmN0aW9uIChib3VuZHMpIHtcbiAgICAgICAgICByZXR1cm4gY2VsbHMubGVuZ3RoID4gMSA/IE9wdGlvbi5zb21lKHtcbiAgICAgICAgICAgIGJvdW5kczogY29uc3RhbnQoYm91bmRzKSxcbiAgICAgICAgICAgIGNlbGxzOiBjb25zdGFudChjZWxscylcbiAgICAgICAgICB9KSA6IE9wdGlvbi5ub25lKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSwgT3B0aW9uLm5vbmUpO1xuICAgIH07XG5cbiAgICB2YXIgbm9NZW51ID0gZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGVsZW1lbnQ6IGNvbnN0YW50KGNlbGwpLFxuICAgICAgICBtZXJnYWJsZTogT3B0aW9uLm5vbmUsXG4gICAgICAgIHVubWVyZ2FibGU6IE9wdGlvbi5ub25lLFxuICAgICAgICBzZWxlY3Rpb246IGNvbnN0YW50KFtjZWxsXSlcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgZm9yTWVudSA9IGZ1bmN0aW9uIChzZWxlY3Rpb25zLCB0YWJsZSwgY2VsbCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZWxlbWVudDogY29uc3RhbnQoY2VsbCksXG4gICAgICAgIG1lcmdhYmxlOiBjb25zdGFudChtZXJnYWJsZSh0YWJsZSwgc2VsZWN0aW9ucykpLFxuICAgICAgICB1bm1lcmdhYmxlOiBjb25zdGFudCh1bm1lcmdhYmxlKGNlbGwsIHNlbGVjdGlvbnMpKSxcbiAgICAgICAgc2VsZWN0aW9uOiBjb25zdGFudChzZWxlY3Rpb24oY2VsbCwgc2VsZWN0aW9ucykpXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHBhc3RlJDEgPSBmdW5jdGlvbiAoZWxlbWVudCwgY2xpcGJvYXJkLCBnZW5lcmF0b3JzKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBlbGVtZW50OiBjb25zdGFudChlbGVtZW50KSxcbiAgICAgICAgY2xpcGJvYXJkOiBjb25zdGFudChjbGlwYm9hcmQpLFxuICAgICAgICBnZW5lcmF0b3JzOiBjb25zdGFudChnZW5lcmF0b3JzKVxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBwYXN0ZVJvd3MgPSBmdW5jdGlvbiAoc2VsZWN0aW9ucywgY2VsbCwgY2xpcGJvYXJkLCBnZW5lcmF0b3JzKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3Rpb246IGNvbnN0YW50KHNlbGVjdGlvbihjZWxsLCBzZWxlY3Rpb25zKSksXG4gICAgICAgIGNsaXBib2FyZDogY29uc3RhbnQoY2xpcGJvYXJkKSxcbiAgICAgICAgZ2VuZXJhdG9yczogY29uc3RhbnQoZ2VuZXJhdG9ycylcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciBleHRyYWN0U2VsZWN0ZWQgPSBmdW5jdGlvbiAoY2VsbHMpIHtcbiAgICAgIHJldHVybiB0YWJsZShjZWxsc1swXSkubWFwKGRlZXApLm1hcChmdW5jdGlvbiAocmVwbGljYSkge1xuICAgICAgICByZXR1cm4gW2V4dHJhY3QocmVwbGljYSwgYXR0cmlidXRlU2VsZWN0b3IpXTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHNlcmlhbGl6ZUVsZW1lbnRzID0gZnVuY3Rpb24gKGVkaXRvciwgZWxlbWVudHMpIHtcbiAgICAgIHJldHVybiBtYXAoZWxlbWVudHMsIGZ1bmN0aW9uIChlbG0pIHtcbiAgICAgICAgcmV0dXJuIGVkaXRvci5zZWxlY3Rpb24uc2VyaWFsaXplci5zZXJpYWxpemUoZWxtLmRvbSgpLCB7fSk7XG4gICAgICB9KS5qb2luKCcnKTtcbiAgICB9O1xuICAgIHZhciBnZXRUZXh0Q29udGVudCA9IGZ1bmN0aW9uIChlbGVtZW50cykge1xuICAgICAgcmV0dXJuIG1hcChlbGVtZW50cywgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuZG9tKCkuaW5uZXJUZXh0O1xuICAgICAgfSkuam9pbignJyk7XG4gICAgfTtcbiAgICB2YXIgcmVnaXN0ZXJFdmVudHMgPSBmdW5jdGlvbiAoZWRpdG9yLCBzZWxlY3Rpb25zLCBhY3Rpb25zLCBjZWxsU2VsZWN0aW9uKSB7XG4gICAgICBlZGl0b3Iub24oJ0JlZm9yZUdldENvbnRlbnQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgbXVsdGlDZWxsQ29udGV4dCA9IGZ1bmN0aW9uIChjZWxscykge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBleHRyYWN0U2VsZWN0ZWQoY2VsbHMpLmVhY2goZnVuY3Rpb24gKGVsZW1lbnRzKSB7XG4gICAgICAgICAgICBlLmNvbnRlbnQgPSBlLmZvcm1hdCA9PT0gJ3RleHQnID8gZ2V0VGV4dENvbnRlbnQoZWxlbWVudHMpIDogc2VyaWFsaXplRWxlbWVudHMoZWRpdG9yLCBlbGVtZW50cyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChlLnNlbGVjdGlvbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNhdGEoc2VsZWN0aW9ucy5nZXQoKSwgbm9vcCwgbXVsdGlDZWxsQ29udGV4dCwgbm9vcCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLm9uKCdCZWZvcmVTZXRDb250ZW50JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGUuc2VsZWN0aW9uID09PSB0cnVlICYmIGUucGFzdGUgPT09IHRydWUpIHtcbiAgICAgICAgICB2YXIgY2VsbE9wdCA9IE9wdGlvbi5mcm9tKGVkaXRvci5kb20uZ2V0UGFyZW50KGVkaXRvci5zZWxlY3Rpb24uZ2V0U3RhcnQoKSwgJ3RoLHRkJykpO1xuICAgICAgICAgIGNlbGxPcHQuZWFjaChmdW5jdGlvbiAoZG9tQ2VsbCkge1xuICAgICAgICAgICAgdmFyIGNlbGwgPSBFbGVtZW50LmZyb21Eb20oZG9tQ2VsbCk7XG4gICAgICAgICAgICB0YWJsZShjZWxsKS5lYWNoKGZ1bmN0aW9uICh0YWJsZSkge1xuICAgICAgICAgICAgICB2YXIgZWxlbWVudHMgPSBmaWx0ZXIoZnJvbUh0bWwkMShlLmNvbnRlbnQpLCBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuYW1lKGNvbnRlbnQpICE9PSAnbWV0YSc7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB2YXIgaXNUYWJsZSA9IGZ1bmN0aW9uIChlbG0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmFtZShlbG0pID09PSAndGFibGUnO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBpZiAoZWxlbWVudHMubGVuZ3RoID09PSAxICYmIGlzVGFibGUoZWxlbWVudHNbMF0pKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHZhciBkb2MgPSBFbGVtZW50LmZyb21Eb20oZWRpdG9yLmdldERvYygpKTtcbiAgICAgICAgICAgICAgICB2YXIgZ2VuZXJhdG9ycyA9IHBhc3RlKGRvYyk7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldHMgPSBwYXN0ZSQxKGNlbGwsIGVsZW1lbnRzWzBdLCBnZW5lcmF0b3JzKTtcbiAgICAgICAgICAgICAgICBhY3Rpb25zLnBhc3RlQ2VsbHModGFibGUsIHRhcmdldHMpLmVhY2goZnVuY3Rpb24gKHJuZykge1xuICAgICAgICAgICAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5zZXRSbmcocm5nKTtcbiAgICAgICAgICAgICAgICAgIGVkaXRvci5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgY2VsbFNlbGVjdGlvbi5jbGVhcih0YWJsZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHIgPSBmdW5jdGlvbiAobGVmdCwgdG9wKSB7XG4gICAgICB2YXIgdHJhbnNsYXRlID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIHIobGVmdCArIHgsIHRvcCArIHkpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6IGNvbnN0YW50KGxlZnQpLFxuICAgICAgICB0b3A6IGNvbnN0YW50KHRvcCksXG4gICAgICAgIHRyYW5zbGF0ZTogdHJhbnNsYXRlXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIFBvc2l0aW9uID0gcjtcblxuICAgIHZhciBib3hQb3NpdGlvbiA9IGZ1bmN0aW9uIChkb20pIHtcbiAgICAgIHZhciBib3ggPSBkb20uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICByZXR1cm4gUG9zaXRpb24oYm94LmxlZnQsIGJveC50b3ApO1xuICAgIH07XG4gICAgdmFyIGZpcnN0RGVmaW5lZE9yWmVybyA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICBpZiAoYSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBhO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGIgIT09IHVuZGVmaW5lZCA/IGIgOiAwO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGFic29sdXRlID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHZhciBkb2MgPSBlbGVtZW50LmRvbSgpLm93bmVyRG9jdW1lbnQ7XG4gICAgICB2YXIgYm9keSA9IGRvYy5ib2R5O1xuICAgICAgdmFyIHdpbiA9IGRvYy5kZWZhdWx0VmlldztcbiAgICAgIHZhciBodG1sID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICAgIGlmIChib2R5ID09PSBlbGVtZW50LmRvbSgpKSB7XG4gICAgICAgIHJldHVybiBQb3NpdGlvbihib2R5Lm9mZnNldExlZnQsIGJvZHkub2Zmc2V0VG9wKTtcbiAgICAgIH1cbiAgICAgIHZhciBzY3JvbGxUb3AgPSBmaXJzdERlZmluZWRPclplcm8od2luLnBhZ2VZT2Zmc2V0LCBodG1sLnNjcm9sbFRvcCk7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IGZpcnN0RGVmaW5lZE9yWmVybyh3aW4ucGFnZVhPZmZzZXQsIGh0bWwuc2Nyb2xsTGVmdCk7XG4gICAgICB2YXIgY2xpZW50VG9wID0gZmlyc3REZWZpbmVkT3JaZXJvKGh0bWwuY2xpZW50VG9wLCBib2R5LmNsaWVudFRvcCk7XG4gICAgICB2YXIgY2xpZW50TGVmdCA9IGZpcnN0RGVmaW5lZE9yWmVybyhodG1sLmNsaWVudExlZnQsIGJvZHkuY2xpZW50TGVmdCk7XG4gICAgICByZXR1cm4gdmlld3BvcnQoZWxlbWVudCkudHJhbnNsYXRlKHNjcm9sbExlZnQgLSBjbGllbnRMZWZ0LCBzY3JvbGxUb3AgLSBjbGllbnRUb3ApO1xuICAgIH07XG4gICAgdmFyIHZpZXdwb3J0ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHZhciBkb20gPSBlbGVtZW50LmRvbSgpO1xuICAgICAgdmFyIGRvYyA9IGRvbS5vd25lckRvY3VtZW50O1xuICAgICAgdmFyIGJvZHkgPSBkb2MuYm9keTtcbiAgICAgIGlmIChib2R5ID09PSBkb20pIHtcbiAgICAgICAgcmV0dXJuIFBvc2l0aW9uKGJvZHkub2Zmc2V0TGVmdCwgYm9keS5vZmZzZXRUb3ApO1xuICAgICAgfVxuICAgICAgaWYgKCFpbkJvZHkoZWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuIFBvc2l0aW9uKDAsIDApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGJveFBvc2l0aW9uKGRvbSk7XG4gICAgfTtcblxuICAgIHZhciBvbmx5ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHZhciBwYXJlbnQgPSBPcHRpb24uZnJvbShlbGVtZW50LmRvbSgpLmRvY3VtZW50RWxlbWVudCkubWFwKEVsZW1lbnQuZnJvbURvbSkuZ2V0T3IoZWxlbWVudCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXJlbnQ6IGNvbnN0YW50KHBhcmVudCksXG4gICAgICAgIHZpZXc6IGNvbnN0YW50KGVsZW1lbnQpLFxuICAgICAgICBvcmlnaW46IGNvbnN0YW50KFBvc2l0aW9uKDAsIDApKVxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBkZXRhY2hlZCA9IGZ1bmN0aW9uIChlZGl0YWJsZSwgY2hyb21lKSB7XG4gICAgICB2YXIgb3JpZ2luID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYWJzb2x1dGUoY2hyb21lKTtcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXJlbnQ6IGNvbnN0YW50KGNocm9tZSksXG4gICAgICAgIHZpZXc6IGNvbnN0YW50KGVkaXRhYmxlKSxcbiAgICAgICAgb3JpZ2luOiBvcmlnaW5cbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgYm9keSQxID0gZnVuY3Rpb24gKGVkaXRhYmxlLCBjaHJvbWUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhcmVudDogY29uc3RhbnQoY2hyb21lKSxcbiAgICAgICAgdmlldzogY29uc3RhbnQoZWRpdGFibGUpLFxuICAgICAgICBvcmlnaW46IGNvbnN0YW50KFBvc2l0aW9uKDAsIDApKVxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBSZXNpemVXaXJlID0ge1xuICAgICAgb25seTogb25seSxcbiAgICAgIGRldGFjaGVkOiBkZXRhY2hlZCxcbiAgICAgIGJvZHk6IGJvZHkkMVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBEaW1lbnNpb24gKG5hbWUsIGdldE9mZnNldCkge1xuICAgICAgdmFyIHNldCA9IGZ1bmN0aW9uIChlbGVtZW50LCBoKSB7XG4gICAgICAgIGlmICghaXNOdW1iZXIoaCkgJiYgIWgubWF0Y2goL15bMC05XSskLykpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobmFtZSArICcuc2V0IGFjY2VwdHMgb25seSBwb3NpdGl2ZSBpbnRlZ2VyIHZhbHVlcy4gVmFsdWUgd2FzICcgKyBoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZG9tID0gZWxlbWVudC5kb20oKTtcbiAgICAgICAgaWYgKGlzU3VwcG9ydGVkKGRvbSkpIHtcbiAgICAgICAgICBkb20uc3R5bGVbbmFtZV0gPSBoICsgJ3B4JztcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHZhciBnZXQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICB2YXIgciA9IGdldE9mZnNldChlbGVtZW50KTtcbiAgICAgICAgaWYgKHIgPD0gMCB8fCByID09PSBudWxsKSB7XG4gICAgICAgICAgdmFyIGNzcyA9IGdldCQyKGVsZW1lbnQsIG5hbWUpO1xuICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KGNzcykgfHwgMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcjtcbiAgICAgIH07XG4gICAgICB2YXIgZ2V0T3V0ZXIgPSBnZXQ7XG4gICAgICB2YXIgYWdncmVnYXRlID0gZnVuY3Rpb24gKGVsZW1lbnQsIHByb3BlcnRpZXMpIHtcbiAgICAgICAgcmV0dXJuIGZvbGRsKHByb3BlcnRpZXMsIGZ1bmN0aW9uIChhY2MsIHByb3BlcnR5KSB7XG4gICAgICAgICAgdmFyIHZhbCA9IGdldCQyKGVsZW1lbnQsIHByb3BlcnR5KTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSB2YWwgPT09IHVuZGVmaW5lZCA/IDAgOiBwYXJzZUludCh2YWwsIDEwKTtcbiAgICAgICAgICByZXR1cm4gaXNOYU4odmFsdWUpID8gYWNjIDogYWNjICsgdmFsdWU7XG4gICAgICAgIH0sIDApO1xuICAgICAgfTtcbiAgICAgIHZhciBtYXggPSBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWUsIHByb3BlcnRpZXMpIHtcbiAgICAgICAgdmFyIGN1bXVsYXRpdmVJbmNsdXNpb25zID0gYWdncmVnYXRlKGVsZW1lbnQsIHByb3BlcnRpZXMpO1xuICAgICAgICB2YXIgYWJzb2x1dGVNYXggPSB2YWx1ZSA+IGN1bXVsYXRpdmVJbmNsdXNpb25zID8gdmFsdWUgLSBjdW11bGF0aXZlSW5jbHVzaW9ucyA6IDA7XG4gICAgICAgIHJldHVybiBhYnNvbHV0ZU1heDtcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzZXQ6IHNldCxcbiAgICAgICAgZ2V0OiBnZXQsXG4gICAgICAgIGdldE91dGVyOiBnZXRPdXRlcixcbiAgICAgICAgYWdncmVnYXRlOiBhZ2dyZWdhdGUsXG4gICAgICAgIG1heDogbWF4XG4gICAgICB9O1xuICAgIH1cblxuICAgIHZhciBhcGkkMSA9IERpbWVuc2lvbignaGVpZ2h0JywgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHZhciBkb20gPSBlbGVtZW50LmRvbSgpO1xuICAgICAgcmV0dXJuIGluQm9keShlbGVtZW50KSA/IGRvbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgOiBkb20ub2Zmc2V0SGVpZ2h0O1xuICAgIH0pO1xuICAgIHZhciBnZXQkNCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gYXBpJDEuZ2V0KGVsZW1lbnQpO1xuICAgIH07XG4gICAgdmFyIGdldE91dGVyID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBhcGkkMS5nZXRPdXRlcihlbGVtZW50KTtcbiAgICB9O1xuXG4gICAgdmFyIGFwaSQyID0gRGltZW5zaW9uKCd3aWR0aCcsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gZWxlbWVudC5kb20oKS5vZmZzZXRXaWR0aDtcbiAgICB9KTtcbiAgICB2YXIgZ2V0JDUgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIGFwaSQyLmdldChlbGVtZW50KTtcbiAgICB9O1xuICAgIHZhciBnZXRPdXRlciQxID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBhcGkkMi5nZXRPdXRlcihlbGVtZW50KTtcbiAgICB9O1xuXG4gICAgdmFyIHJvd0luZm8gPSBmdW5jdGlvbiAocm93LCB5KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByb3c6IHJvdyxcbiAgICAgICAgeTogeVxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBjb2xJbmZvID0gZnVuY3Rpb24gKGNvbCwgeCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29sOiBjb2wsXG4gICAgICAgIHg6IHhcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgcnRsRWRnZSA9IGZ1bmN0aW9uIChjZWxsKSB7XG4gICAgICB2YXIgcG9zID0gYWJzb2x1dGUoY2VsbCk7XG4gICAgICByZXR1cm4gcG9zLmxlZnQoKSArIGdldE91dGVyJDEoY2VsbCk7XG4gICAgfTtcbiAgICB2YXIgbHRyRWRnZSA9IGZ1bmN0aW9uIChjZWxsKSB7XG4gICAgICByZXR1cm4gYWJzb2x1dGUoY2VsbCkubGVmdCgpO1xuICAgIH07XG4gICAgdmFyIGdldExlZnRFZGdlID0gZnVuY3Rpb24gKGluZGV4LCBjZWxsKSB7XG4gICAgICByZXR1cm4gY29sSW5mbyhpbmRleCwgbHRyRWRnZShjZWxsKSk7XG4gICAgfTtcbiAgICB2YXIgZ2V0UmlnaHRFZGdlID0gZnVuY3Rpb24gKGluZGV4LCBjZWxsKSB7XG4gICAgICByZXR1cm4gY29sSW5mbyhpbmRleCwgcnRsRWRnZShjZWxsKSk7XG4gICAgfTtcbiAgICB2YXIgZ2V0VG9wID0gZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgIHJldHVybiBhYnNvbHV0ZShjZWxsKS50b3AoKTtcbiAgICB9O1xuICAgIHZhciBnZXRUb3BFZGdlID0gZnVuY3Rpb24gKGluZGV4LCBjZWxsKSB7XG4gICAgICByZXR1cm4gcm93SW5mbyhpbmRleCwgZ2V0VG9wKGNlbGwpKTtcbiAgICB9O1xuICAgIHZhciBnZXRCb3R0b21FZGdlID0gZnVuY3Rpb24gKGluZGV4LCBjZWxsKSB7XG4gICAgICByZXR1cm4gcm93SW5mbyhpbmRleCwgZ2V0VG9wKGNlbGwpICsgZ2V0T3V0ZXIoY2VsbCkpO1xuICAgIH07XG4gICAgdmFyIGZpbmRQb3NpdGlvbnMgPSBmdW5jdGlvbiAoZ2V0SW5uZXJFZGdlLCBnZXRPdXRlckVkZ2UsIGFycmF5KSB7XG4gICAgICBpZiAoYXJyYXkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICAgIHZhciBsaW5lcyA9IG1hcChhcnJheS5zbGljZSgxKSwgZnVuY3Rpb24gKGNlbGxPcHRpb24sIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBjZWxsT3B0aW9uLm1hcChmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICAgIHJldHVybiBnZXRJbm5lckVkZ2UoaW5kZXgsIGNlbGwpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgdmFyIGxhc3RMaW5lID0gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV0ubWFwKGZ1bmN0aW9uIChjZWxsKSB7XG4gICAgICAgIHJldHVybiBnZXRPdXRlckVkZ2UoYXJyYXkubGVuZ3RoIC0gMSwgY2VsbCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBsaW5lcy5jb25jYXQoW2xhc3RMaW5lXSk7XG4gICAgfTtcbiAgICB2YXIgbmVnYXRlID0gZnVuY3Rpb24gKHN0ZXApIHtcbiAgICAgIHJldHVybiAtc3RlcDtcbiAgICB9O1xuICAgIHZhciBoZWlnaHQgPSB7XG4gICAgICBkZWx0YTogaWRlbnRpdHksXG4gICAgICBwb3NpdGlvbnM6IGZ1bmN0aW9uIChvcHRFbGVtZW50cykge1xuICAgICAgICByZXR1cm4gZmluZFBvc2l0aW9ucyhnZXRUb3BFZGdlLCBnZXRCb3R0b21FZGdlLCBvcHRFbGVtZW50cyk7XG4gICAgICB9LFxuICAgICAgZWRnZTogZ2V0VG9wXG4gICAgfTtcbiAgICB2YXIgbHRyID0ge1xuICAgICAgZGVsdGE6IGlkZW50aXR5LFxuICAgICAgZWRnZTogbHRyRWRnZSxcbiAgICAgIHBvc2l0aW9uczogZnVuY3Rpb24gKG9wdEVsZW1lbnRzKSB7XG4gICAgICAgIHJldHVybiBmaW5kUG9zaXRpb25zKGdldExlZnRFZGdlLCBnZXRSaWdodEVkZ2UsIG9wdEVsZW1lbnRzKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBydGwgPSB7XG4gICAgICBkZWx0YTogbmVnYXRlLFxuICAgICAgZWRnZTogcnRsRWRnZSxcbiAgICAgIHBvc2l0aW9uczogZnVuY3Rpb24gKG9wdEVsZW1lbnRzKSB7XG4gICAgICAgIHJldHVybiBmaW5kUG9zaXRpb25zKGdldFJpZ2h0RWRnZSwgZ2V0TGVmdEVkZ2UsIG9wdEVsZW1lbnRzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGNvbHVtbnMgPSBmdW5jdGlvbiAod2FyZWhvdXNlKSB7XG4gICAgICB2YXIgZ3JpZCA9IHdhcmVob3VzZS5ncmlkO1xuICAgICAgdmFyIGNvbHMgPSByYW5nZShncmlkLmNvbHVtbnMoKSwgaWRlbnRpdHkpO1xuICAgICAgdmFyIHJvd3NBcnIgPSByYW5nZShncmlkLnJvd3MoKSwgaWRlbnRpdHkpO1xuICAgICAgcmV0dXJuIG1hcChjb2xzLCBmdW5jdGlvbiAoY29sKSB7XG4gICAgICAgIHZhciBnZXRCbG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gYmluZChyb3dzQXJyLCBmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgcmV0dXJuIFdhcmVob3VzZS5nZXRBdCh3YXJlaG91c2UsIHIsIGNvbCkuZmlsdGVyKGZ1bmN0aW9uIChkZXRhaWwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGRldGFpbC5jb2x1bW4oKSA9PT0gY29sO1xuICAgICAgICAgICAgfSkuZm9sZChjb25zdGFudChbXSksIGZ1bmN0aW9uIChkZXRhaWwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFtkZXRhaWxdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBpc1NpbmdsZSA9IGZ1bmN0aW9uIChkZXRhaWwpIHtcbiAgICAgICAgICByZXR1cm4gZGV0YWlsLmNvbHNwYW4oKSA9PT0gMTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGdldEZhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBXYXJlaG91c2UuZ2V0QXQod2FyZWhvdXNlLCAwLCBjb2wpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZGVjaWRlKGdldEJsb2NrLCBpc1NpbmdsZSwgZ2V0RmFsbGJhY2spO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgZGVjaWRlID0gZnVuY3Rpb24gKGdldEJsb2NrLCBpc1NpbmdsZSwgZ2V0RmFsbGJhY2spIHtcbiAgICAgIHZhciBpbkJsb2NrID0gZ2V0QmxvY2soKTtcbiAgICAgIHZhciBzaW5nbGVJbkJsb2NrID0gZmluZChpbkJsb2NrLCBpc1NpbmdsZSk7XG4gICAgICB2YXIgZGV0YWlsT3B0aW9uID0gc2luZ2xlSW5CbG9jay5vclRodW5rKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIE9wdGlvbi5mcm9tKGluQmxvY2tbMF0pLm9yVGh1bmsoZ2V0RmFsbGJhY2spO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZGV0YWlsT3B0aW9uLm1hcChmdW5jdGlvbiAoZGV0YWlsKSB7XG4gICAgICAgIHJldHVybiBkZXRhaWwuZWxlbWVudCgpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgcm93cyQxID0gZnVuY3Rpb24gKHdhcmVob3VzZSkge1xuICAgICAgdmFyIGdyaWQgPSB3YXJlaG91c2UuZ3JpZDtcbiAgICAgIHZhciByb3dzQXJyID0gcmFuZ2UoZ3JpZC5yb3dzKCksIGlkZW50aXR5KTtcbiAgICAgIHZhciBjb2xzID0gcmFuZ2UoZ3JpZC5jb2x1bW5zKCksIGlkZW50aXR5KTtcbiAgICAgIHJldHVybiBtYXAocm93c0FyciwgZnVuY3Rpb24gKHJvdykge1xuICAgICAgICB2YXIgZ2V0QmxvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGJpbmQoY29scywgZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgIHJldHVybiBXYXJlaG91c2UuZ2V0QXQod2FyZWhvdXNlLCByb3csIGMpLmZpbHRlcihmdW5jdGlvbiAoZGV0YWlsKSB7XG4gICAgICAgICAgICAgIHJldHVybiBkZXRhaWwucm93KCkgPT09IHJvdztcbiAgICAgICAgICAgIH0pLmZvbGQoY29uc3RhbnQoW10pLCBmdW5jdGlvbiAoZGV0YWlsKSB7XG4gICAgICAgICAgICAgIHJldHVybiBbZGV0YWlsXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgaXNTaW5nbGUgPSBmdW5jdGlvbiAoZGV0YWlsKSB7XG4gICAgICAgICAgcmV0dXJuIGRldGFpbC5yb3dzcGFuKCkgPT09IDE7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBnZXRGYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gV2FyZWhvdXNlLmdldEF0KHdhcmVob3VzZSwgcm93LCAwKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGRlY2lkZShnZXRCbG9jaywgaXNTaW5nbGUsIGdldEZhbGxiYWNrKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgZGVkdWNlID0gZnVuY3Rpb24gKHhzLCBpbmRleCkge1xuICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB4cy5sZW5ndGggLSAxKSB7XG4gICAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgICAgfVxuICAgICAgdmFyIGN1cnJlbnQgPSB4c1tpbmRleF0uZm9sZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXN0ID0gcmV2ZXJzZSh4cy5zbGljZSgwLCBpbmRleCkpO1xuICAgICAgICByZXR1cm4gZmluZE1hcChyZXN0LCBmdW5jdGlvbiAoYSwgaSkge1xuICAgICAgICAgIHJldHVybiBhLm1hcChmdW5jdGlvbiAoYWEpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHZhbHVlOiBhYSxcbiAgICAgICAgICAgICAgZGVsdGE6IGkgKyAxXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0sIGZ1bmN0aW9uIChjKSB7XG4gICAgICAgIHJldHVybiBPcHRpb24uc29tZSh7XG4gICAgICAgICAgdmFsdWU6IGMsXG4gICAgICAgICAgZGVsdGE6IDBcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHZhciBuZXh0ID0geHNbaW5kZXggKyAxXS5mb2xkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlc3QgPSB4cy5zbGljZShpbmRleCArIDEpO1xuICAgICAgICByZXR1cm4gZmluZE1hcChyZXN0LCBmdW5jdGlvbiAoYSwgaSkge1xuICAgICAgICAgIHJldHVybiBhLm1hcChmdW5jdGlvbiAoYWEpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHZhbHVlOiBhYSxcbiAgICAgICAgICAgICAgZGVsdGE6IGkgKyAxXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0sIGZ1bmN0aW9uIChuKSB7XG4gICAgICAgIHJldHVybiBPcHRpb24uc29tZSh7XG4gICAgICAgICAgdmFsdWU6IG4sXG4gICAgICAgICAgZGVsdGE6IDFcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBjdXJyZW50LmJpbmQoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgcmV0dXJuIG5leHQubWFwKGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgdmFyIGV4dHJhcyA9IG4uZGVsdGEgKyBjLmRlbHRhO1xuICAgICAgICAgIHJldHVybiBNYXRoLmFicyhuLnZhbHVlIC0gYy52YWx1ZSkgLyBleHRyYXM7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBuZWVkTWFudWFsQ2FsYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBicm93c2VyID0gZGV0ZWN0JDMoKS5icm93c2VyO1xuICAgICAgcmV0dXJuIGJyb3dzZXIuaXNJRSgpIHx8IGJyb3dzZXIuaXNFZGdlKCk7XG4gICAgfTtcbiAgICB2YXIgdG9OdW1iZXIgPSBmdW5jdGlvbiAocHgsIGZhbGxiYWNrKSB7XG4gICAgICB2YXIgbnVtID0gcGFyc2VGbG9hdChweCk7XG4gICAgICByZXR1cm4gaXNOYU4obnVtKSA/IGZhbGxiYWNrIDogbnVtO1xuICAgIH07XG4gICAgdmFyIGdldFByb3AgPSBmdW5jdGlvbiAoZWxtLCBuYW1lLCBmYWxsYmFjaykge1xuICAgICAgcmV0dXJuIHRvTnVtYmVyKGdldCQyKGVsbSwgbmFtZSksIGZhbGxiYWNrKTtcbiAgICB9O1xuICAgIHZhciBnZXRDYWxjdWxhdGVkSGVpZ2h0ID0gZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgIHZhciBoZWlnaHQgPSBjZWxsLmRvbSgpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICAgIHZhciBib3hTaXppbmcgPSBnZXQkMihjZWxsLCAnYm94LXNpemluZycpO1xuICAgICAgaWYgKGJveFNpemluZyA9PT0gJ2JvcmRlci1ib3gnKSB7XG4gICAgICAgIHJldHVybiBoZWlnaHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcGFkZGluZ1RvcCA9IGdldFByb3AoY2VsbCwgJ3BhZGRpbmctdG9wJywgMCk7XG4gICAgICAgIHZhciBwYWRkaW5nQm90dG9tID0gZ2V0UHJvcChjZWxsLCAncGFkZGluZy1ib3R0b20nLCAwKTtcbiAgICAgICAgdmFyIGJvcmRlclRvcCA9IGdldFByb3AoY2VsbCwgJ2JvcmRlci10b3Atd2lkdGgnLCAwKTtcbiAgICAgICAgdmFyIGJvcmRlckJvdHRvbSA9IGdldFByb3AoY2VsbCwgJ2JvcmRlci1ib3R0b20td2lkdGgnLCAwKTtcbiAgICAgICAgdmFyIGJvcmRlcnMgPSBib3JkZXJUb3AgKyBib3JkZXJCb3R0b207XG4gICAgICAgIHJldHVybiBoZWlnaHQgLSBwYWRkaW5nVG9wIC0gcGFkZGluZ0JvdHRvbSAtIGJvcmRlcnM7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgZ2V0Q2FsY3VsYXRlZFdpZHRoID0gZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgIHZhciB3aWR0aCA9IGNlbGwuZG9tKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICB2YXIgYm94U2l6aW5nID0gZ2V0JDIoY2VsbCwgJ2JveC1zaXppbmcnKTtcbiAgICAgIGlmIChib3hTaXppbmcgPT09ICdib3JkZXItYm94Jykge1xuICAgICAgICByZXR1cm4gd2lkdGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcGFkZGluZ0xlZnQgPSBnZXRQcm9wKGNlbGwsICdwYWRkaW5nLWxlZnQnLCAwKTtcbiAgICAgICAgdmFyIHBhZGRpbmdSaWdodCA9IGdldFByb3AoY2VsbCwgJ3BhZGRpbmctcmlnaHQnLCAwKTtcbiAgICAgICAgdmFyIGJvcmRlckxlZnQgPSBnZXRQcm9wKGNlbGwsICdib3JkZXItbGVmdC13aWR0aCcsIDApO1xuICAgICAgICB2YXIgYm9yZGVyUmlnaHQgPSBnZXRQcm9wKGNlbGwsICdib3JkZXItcmlnaHQtd2lkdGgnLCAwKTtcbiAgICAgICAgdmFyIGJvcmRlcnMgPSBib3JkZXJMZWZ0ICsgYm9yZGVyUmlnaHQ7XG4gICAgICAgIHJldHVybiB3aWR0aCAtIHBhZGRpbmdMZWZ0IC0gcGFkZGluZ1JpZ2h0IC0gYm9yZGVycztcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBnZXRIZWlnaHQgPSBmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgcmV0dXJuIG5lZWRNYW51YWxDYWxjKCkgPyBnZXRDYWxjdWxhdGVkSGVpZ2h0KGNlbGwpIDogZ2V0UHJvcChjZWxsLCAnaGVpZ2h0JywgZ2V0JDQoY2VsbCkpO1xuICAgIH07XG4gICAgdmFyIGdldFdpZHRoID0gZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgIHJldHVybiBuZWVkTWFudWFsQ2FsYygpID8gZ2V0Q2FsY3VsYXRlZFdpZHRoKGNlbGwpIDogZ2V0UHJvcChjZWxsLCAnd2lkdGgnLCBnZXQkNShjZWxsKSk7XG4gICAgfTtcblxuICAgIHZhciByR2VuZXJpY1NpemVSZWdleCA9IC8oXFxkKyhcXC5cXGQrKT8pKFxcd3wlKSovO1xuICAgIHZhciByUGVyY2VudGFnZUJhc2VkU2l6ZVJlZ2V4ID0gLyhcXGQrKFxcLlxcZCspPyklLztcbiAgICB2YXIgclBpeGVsQmFzZWRTaXplUmVnZXggPSAvKFxcZCsoXFwuXFxkKyk/KXB4fGVtLztcbiAgICB2YXIgZ2V0UGVyY2VudFNpemUgPSBmdW5jdGlvbiAoZWxtLCBnZXR0ZXIpIHtcbiAgICAgIHZhciByZWxhdGl2ZVBhcmVudCA9IG9mZnNldFBhcmVudChlbG0pLmdldE9yKGdldEJvZHkob3duZXIoZWxtKSkpO1xuICAgICAgcmV0dXJuIGdldHRlcihlbG0pIC8gZ2V0dGVyKHJlbGF0aXZlUGFyZW50KSAqIDEwMDtcbiAgICB9O1xuICAgIHZhciBzZXRQaXhlbFdpZHRoID0gZnVuY3Rpb24gKGNlbGwsIGFtb3VudCkge1xuICAgICAgc2V0JDEoY2VsbCwgJ3dpZHRoJywgYW1vdW50ICsgJ3B4Jyk7XG4gICAgfTtcbiAgICB2YXIgc2V0UGVyY2VudGFnZVdpZHRoID0gZnVuY3Rpb24gKGNlbGwsIGFtb3VudCkge1xuICAgICAgc2V0JDEoY2VsbCwgJ3dpZHRoJywgYW1vdW50ICsgJyUnKTtcbiAgICB9O1xuICAgIHZhciBzZXRIZWlnaHQgPSBmdW5jdGlvbiAoY2VsbCwgYW1vdW50KSB7XG4gICAgICBzZXQkMShjZWxsLCAnaGVpZ2h0JywgYW1vdW50ICsgJ3B4Jyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0SGVpZ2h0VmFsdWUgPSBmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgcmV0dXJuIGdldFJhdyhjZWxsLCAnaGVpZ2h0JykuZ2V0T3JUaHVuayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBnZXRIZWlnaHQoY2VsbCkgKyAncHgnO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgY29udmVydCA9IGZ1bmN0aW9uIChjZWxsLCBudW1iZXIsIGdldHRlciwgc2V0dGVyKSB7XG4gICAgICB2YXIgbmV3U2l6ZSA9IHRhYmxlKGNlbGwpLm1hcChmdW5jdGlvbiAodGFibGUpIHtcbiAgICAgICAgdmFyIHRvdGFsID0gZ2V0dGVyKHRhYmxlKTtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobnVtYmVyIC8gMTAwICogdG90YWwpO1xuICAgICAgfSkuZ2V0T3IobnVtYmVyKTtcbiAgICAgIHNldHRlcihjZWxsLCBuZXdTaXplKTtcbiAgICAgIHJldHVybiBuZXdTaXplO1xuICAgIH07XG4gICAgdmFyIG5vcm1hbGl6ZVBpeGVsU2l6ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgY2VsbCwgZ2V0dGVyLCBzZXR0ZXIpIHtcbiAgICAgIHZhciBudW1iZXIgPSBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgICAgcmV0dXJuIGVuZHNXaXRoKHZhbHVlLCAnJScpICYmIG5hbWUoY2VsbCkgIT09ICd0YWJsZScgPyBjb252ZXJ0KGNlbGwsIG51bWJlciwgZ2V0dGVyLCBzZXR0ZXIpIDogbnVtYmVyO1xuICAgIH07XG4gICAgdmFyIGdldFRvdGFsSGVpZ2h0ID0gZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGdldEhlaWdodFZhbHVlKGNlbGwpO1xuICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZ2V0JDQoY2VsbCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbm9ybWFsaXplUGl4ZWxTaXplKHZhbHVlLCBjZWxsLCBnZXQkNCwgc2V0SGVpZ2h0KTtcbiAgICB9O1xuICAgIHZhciBnZXQkNiA9IGZ1bmN0aW9uIChjZWxsLCB0eXBlLCBmKSB7XG4gICAgICB2YXIgdiA9IGYoY2VsbCk7XG4gICAgICB2YXIgc3BhbiA9IGdldFNwYW4oY2VsbCwgdHlwZSk7XG4gICAgICByZXR1cm4gdiAvIHNwYW47XG4gICAgfTtcbiAgICB2YXIgZ2V0UmF3V2lkdGggPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgdmFyIGNzc1dpZHRoID0gZ2V0UmF3KGVsZW1lbnQsICd3aWR0aCcpO1xuICAgICAgcmV0dXJuIGNzc1dpZHRoLmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gT3B0aW9uLmZyb20oZ2V0JDEoZWxlbWVudCwgJ3dpZHRoJykpO1xuICAgICAgfSwgZnVuY3Rpb24gKHdpZHRoKSB7XG4gICAgICAgIHJldHVybiBPcHRpb24uc29tZSh3aWR0aCk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBub3JtYWxpemVQZXJjZW50YWdlV2lkdGggPSBmdW5jdGlvbiAoY2VsbFdpZHRoLCB0YWJsZVNpemUpIHtcbiAgICAgIHJldHVybiBjZWxsV2lkdGggLyB0YWJsZVNpemUucGl4ZWxXaWR0aCgpICogMTAwO1xuICAgIH07XG4gICAgdmFyIGNob29zZVBlcmNlbnRhZ2VTaXplID0gZnVuY3Rpb24gKGVsZW1lbnQsIHdpZHRoLCB0YWJsZVNpemUpIHtcbiAgICAgIHZhciBwZXJjZW50TWF0Y2ggPSByUGVyY2VudGFnZUJhc2VkU2l6ZVJlZ2V4LmV4ZWMod2lkdGgpO1xuICAgICAgaWYgKHBlcmNlbnRNYXRjaCAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChwZXJjZW50TWF0Y2hbMV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGludFdpZHRoID0gZ2V0V2lkdGgoZWxlbWVudCk7XG4gICAgICAgIHJldHVybiBub3JtYWxpemVQZXJjZW50YWdlV2lkdGgoaW50V2lkdGgsIHRhYmxlU2l6ZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgZ2V0UGVyY2VudGFnZVdpZHRoID0gZnVuY3Rpb24gKGNlbGwsIHRhYmxlU2l6ZSkge1xuICAgICAgdmFyIHdpZHRoID0gZ2V0UmF3V2lkdGgoY2VsbCk7XG4gICAgICByZXR1cm4gd2lkdGguZm9sZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpbnRXaWR0aCA9IGdldCQ1KGNlbGwpO1xuICAgICAgICByZXR1cm4gbm9ybWFsaXplUGVyY2VudGFnZVdpZHRoKGludFdpZHRoLCB0YWJsZVNpemUpO1xuICAgICAgfSwgZnVuY3Rpb24gKHcpIHtcbiAgICAgICAgcmV0dXJuIGNob29zZVBlcmNlbnRhZ2VTaXplKGNlbGwsIHcsIHRhYmxlU2l6ZSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBub3JtYWxpemVQaXhlbFdpZHRoID0gZnVuY3Rpb24gKGNlbGxXaWR0aCwgdGFibGVTaXplKSB7XG4gICAgICByZXR1cm4gY2VsbFdpZHRoIC8gMTAwICogdGFibGVTaXplLnBpeGVsV2lkdGgoKTtcbiAgICB9O1xuICAgIHZhciBjaG9vc2VQaXhlbFNpemUgPSBmdW5jdGlvbiAoZWxlbWVudCwgd2lkdGgsIHRhYmxlU2l6ZSkge1xuICAgICAgdmFyIHBpeGVsTWF0Y2ggPSByUGl4ZWxCYXNlZFNpemVSZWdleC5leGVjKHdpZHRoKTtcbiAgICAgIGlmIChwaXhlbE1hdGNoICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludChwaXhlbE1hdGNoWzFdLCAxMCk7XG4gICAgICB9XG4gICAgICB2YXIgcGVyY2VudE1hdGNoID0gclBlcmNlbnRhZ2VCYXNlZFNpemVSZWdleC5leGVjKHdpZHRoKTtcbiAgICAgIGlmIChwZXJjZW50TWF0Y2ggIT09IG51bGwpIHtcbiAgICAgICAgdmFyIGZsb2F0V2lkdGggPSBwYXJzZUZsb2F0KHBlcmNlbnRNYXRjaFsxXSk7XG4gICAgICAgIHJldHVybiBub3JtYWxpemVQaXhlbFdpZHRoKGZsb2F0V2lkdGgsIHRhYmxlU2l6ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZ2V0V2lkdGgoZWxlbWVudCk7XG4gICAgfTtcbiAgICB2YXIgZ2V0UGl4ZWxXaWR0aCA9IGZ1bmN0aW9uIChjZWxsLCB0YWJsZVNpemUpIHtcbiAgICAgIHZhciB3aWR0aCA9IGdldFJhd1dpZHRoKGNlbGwpO1xuICAgICAgcmV0dXJuIHdpZHRoLmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZ2V0V2lkdGgoY2VsbCk7XG4gICAgICB9LCBmdW5jdGlvbiAodykge1xuICAgICAgICByZXR1cm4gY2hvb3NlUGl4ZWxTaXplKGNlbGwsIHcsIHRhYmxlU2l6ZSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBnZXRIZWlnaHQkMSA9IGZ1bmN0aW9uIChjZWxsKSB7XG4gICAgICByZXR1cm4gZ2V0JDYoY2VsbCwgJ3Jvd3NwYW4nLCBnZXRUb3RhbEhlaWdodCk7XG4gICAgfTtcbiAgICB2YXIgZ2V0R2VuZXJpY1dpZHRoID0gZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgIHZhciB3aWR0aCA9IGdldFJhd1dpZHRoKGNlbGwpO1xuICAgICAgcmV0dXJuIHdpZHRoLmJpbmQoZnVuY3Rpb24gKHcpIHtcbiAgICAgICAgdmFyIG1hdGNoID0gckdlbmVyaWNTaXplUmVnZXguZXhlYyh3KTtcbiAgICAgICAgaWYgKG1hdGNoICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIE9wdGlvbi5zb21lKHtcbiAgICAgICAgICAgIHdpZHRoOiBjb25zdGFudChwYXJzZUZsb2F0KG1hdGNoWzFdKSksXG4gICAgICAgICAgICB1bml0OiBjb25zdGFudChtYXRjaFszXSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gT3B0aW9uLm5vbmUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgc2V0R2VuZXJpY1dpZHRoID0gZnVuY3Rpb24gKGNlbGwsIGFtb3VudCwgdW5pdCkge1xuICAgICAgc2V0JDEoY2VsbCwgJ3dpZHRoJywgYW1vdW50ICsgdW5pdCk7XG4gICAgfTtcbiAgICB2YXIgZ2V0UGl4ZWxUYWJsZVdpZHRoID0gZnVuY3Rpb24gKHRhYmxlKSB7XG4gICAgICByZXR1cm4gZ2V0JDUodGFibGUpICsgJ3B4JztcbiAgICB9O1xuICAgIHZhciBnZXRQZXJjZW50VGFibGVXaWR0aCA9IGZ1bmN0aW9uICh0YWJsZSkge1xuICAgICAgcmV0dXJuIGdldFBlcmNlbnRTaXplKHRhYmxlLCBnZXQkNSkgKyAnJSc7XG4gICAgfTtcbiAgICB2YXIgaXNQZXJjZW50U2l6aW5nID0gZnVuY3Rpb24gKHRhYmxlKSB7XG4gICAgICByZXR1cm4gZ2V0UmF3V2lkdGgodGFibGUpLmV4aXN0cyhmdW5jdGlvbiAoc2l6ZSkge1xuICAgICAgICByZXR1cm4gclBlcmNlbnRhZ2VCYXNlZFNpemVSZWdleC50ZXN0KHNpemUpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgaXNQaXhlbFNpemluZyA9IGZ1bmN0aW9uICh0YWJsZSkge1xuICAgICAgcmV0dXJuIGdldFJhd1dpZHRoKHRhYmxlKS5leGlzdHMoZnVuY3Rpb24gKHNpemUpIHtcbiAgICAgICAgcmV0dXJuIHJQaXhlbEJhc2VkU2l6ZVJlZ2V4LnRlc3Qoc2l6ZSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBpc05vbmVTaXppbmcgPSBmdW5jdGlvbiAodGFibGUpIHtcbiAgICAgIHJldHVybiBnZXRSYXdXaWR0aCh0YWJsZSkuaXNOb25lKCk7XG4gICAgfTtcbiAgICB2YXIgcGVyY2VudGFnZUJhc2VkU2l6ZVJlZ2V4ID0gY29uc3RhbnQoclBlcmNlbnRhZ2VCYXNlZFNpemVSZWdleCk7XG4gICAgdmFyIHBpeGVsQmFzZWRTaXplUmVnZXggPSBjb25zdGFudChyUGl4ZWxCYXNlZFNpemVSZWdleCk7XG5cbiAgICB2YXIgZ2V0UmF3JDEgPSBmdW5jdGlvbiAoY2VsbCwgcHJvcGVydHksIGdldHRlcikge1xuICAgICAgcmV0dXJuIGdldFJhdyhjZWxsLCBwcm9wZXJ0eSkuZm9sZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBnZXR0ZXIoY2VsbCkgKyAncHgnO1xuICAgICAgfSwgZnVuY3Rpb24gKHJhdykge1xuICAgICAgICByZXR1cm4gcmF3O1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgZ2V0UmF3VyA9IGZ1bmN0aW9uIChjZWxsLCB0YWJsZVNpemUpIHtcbiAgICAgIHJldHVybiBnZXRSYXckMShjZWxsLCAnd2lkdGgnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXR1cm4gZ2V0UGl4ZWxXaWR0aChlLCB0YWJsZVNpemUpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgZ2V0UmF3SCA9IGZ1bmN0aW9uIChjZWxsKSB7XG4gICAgICByZXR1cm4gZ2V0UmF3JDEoY2VsbCwgJ2hlaWdodCcsIGdldEhlaWdodCQxKTtcbiAgICB9O1xuICAgIHZhciBnZXRXaWR0aEZyb20gPSBmdW5jdGlvbiAod2FyZWhvdXNlLCBkaXJlY3Rpb24sIGdldFdpZHRoLCBmYWxsYmFjaywgdGFibGVTaXplKSB7XG4gICAgICB2YXIgY29sdW1ucyQxID0gY29sdW1ucyh3YXJlaG91c2UpO1xuICAgICAgdmFyIGJhY2t1cHMgPSBtYXAoY29sdW1ucyQxLCBmdW5jdGlvbiAoY2VsbE9wdGlvbikge1xuICAgICAgICByZXR1cm4gY2VsbE9wdGlvbi5tYXAoZGlyZWN0aW9uLmVkZ2UpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbWFwKGNvbHVtbnMkMSwgZnVuY3Rpb24gKGNlbGxPcHRpb24sIGMpIHtcbiAgICAgICAgdmFyIGNvbHVtbkNlbGwgPSBjZWxsT3B0aW9uLmZpbHRlcihub3QoaGFzQ29sc3BhbikpO1xuICAgICAgICByZXR1cm4gY29sdW1uQ2VsbC5mb2xkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgZGVkdWNlZCA9IGRlZHVjZShiYWNrdXBzLCBjKTtcbiAgICAgICAgICByZXR1cm4gZmFsbGJhY2soZGVkdWNlZCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChjZWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGdldFdpZHRoKGNlbGwsIHRhYmxlU2l6ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgZ2V0RGVkdWNlZCA9IGZ1bmN0aW9uIChkZWR1Y2VkKSB7XG4gICAgICByZXR1cm4gZGVkdWNlZC5tYXAoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuIGQgKyAncHgnO1xuICAgICAgfSkuZ2V0T3IoJycpO1xuICAgIH07XG4gICAgdmFyIGdldFJhd1dpZHRocyA9IGZ1bmN0aW9uICh3YXJlaG91c2UsIGRpcmVjdGlvbiwgdGFibGVTaXplKSB7XG4gICAgICByZXR1cm4gZ2V0V2lkdGhGcm9tKHdhcmVob3VzZSwgZGlyZWN0aW9uLCBnZXRSYXdXLCBnZXREZWR1Y2VkLCB0YWJsZVNpemUpO1xuICAgIH07XG4gICAgdmFyIGdldFBlcmNlbnRhZ2VXaWR0aHMgPSBmdW5jdGlvbiAod2FyZWhvdXNlLCBkaXJlY3Rpb24sIHRhYmxlU2l6ZSkge1xuICAgICAgcmV0dXJuIGdldFdpZHRoRnJvbSh3YXJlaG91c2UsIGRpcmVjdGlvbiwgZ2V0UGVyY2VudGFnZVdpZHRoLCBmdW5jdGlvbiAoZGVkdWNlZCkge1xuICAgICAgICByZXR1cm4gZGVkdWNlZC5mb2xkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gdGFibGVTaXplLm1pbkNlbGxXaWR0aCgpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoY2VsbFdpZHRoKSB7XG4gICAgICAgICAgcmV0dXJuIGNlbGxXaWR0aCAvIHRhYmxlU2l6ZS5waXhlbFdpZHRoKCkgKiAxMDA7XG4gICAgICAgIH0pO1xuICAgICAgfSwgdGFibGVTaXplKTtcbiAgICB9O1xuICAgIHZhciBnZXRQaXhlbFdpZHRocyA9IGZ1bmN0aW9uICh3YXJlaG91c2UsIGRpcmVjdGlvbiwgdGFibGVTaXplKSB7XG4gICAgICByZXR1cm4gZ2V0V2lkdGhGcm9tKHdhcmVob3VzZSwgZGlyZWN0aW9uLCBnZXRQaXhlbFdpZHRoLCBmdW5jdGlvbiAoZGVkdWNlZCkge1xuICAgICAgICByZXR1cm4gZGVkdWNlZC5nZXRPclRodW5rKHRhYmxlU2l6ZS5taW5DZWxsV2lkdGgpO1xuICAgICAgfSwgdGFibGVTaXplKTtcbiAgICB9O1xuICAgIHZhciBnZXRIZWlnaHRGcm9tID0gZnVuY3Rpb24gKHdhcmVob3VzZSwgZGlyZWN0aW9uLCBnZXRIZWlnaHQsIGZhbGxiYWNrKSB7XG4gICAgICB2YXIgcm93cyA9IHJvd3MkMSh3YXJlaG91c2UpO1xuICAgICAgdmFyIGJhY2t1cHMgPSBtYXAocm93cywgZnVuY3Rpb24gKGNlbGxPcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIGNlbGxPcHRpb24ubWFwKGRpcmVjdGlvbi5lZGdlKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG1hcChyb3dzLCBmdW5jdGlvbiAoY2VsbE9wdGlvbiwgYykge1xuICAgICAgICB2YXIgcm93Q2VsbCA9IGNlbGxPcHRpb24uZmlsdGVyKG5vdChoYXNSb3dzcGFuKSk7XG4gICAgICAgIHJldHVybiByb3dDZWxsLmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBkZWR1Y2VkID0gZGVkdWNlKGJhY2t1cHMsIGMpO1xuICAgICAgICAgIHJldHVybiBmYWxsYmFjayhkZWR1Y2VkKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0SGVpZ2h0KGNlbGwpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGdldFBpeGVsSGVpZ2h0cyA9IGZ1bmN0aW9uICh3YXJlaG91c2UsIGRpcmVjdGlvbikge1xuICAgICAgcmV0dXJuIGdldEhlaWdodEZyb20od2FyZWhvdXNlLCBkaXJlY3Rpb24sIGdldEhlaWdodCQxLCBmdW5jdGlvbiAoZGVkdWNlZCkge1xuICAgICAgICByZXR1cm4gZGVkdWNlZC5nZXRPclRodW5rKG1pbkhlaWdodCk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBnZXRSYXdIZWlnaHRzID0gZnVuY3Rpb24gKHdhcmVob3VzZSwgZGlyZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZ2V0SGVpZ2h0RnJvbSh3YXJlaG91c2UsIGRpcmVjdGlvbiwgZ2V0UmF3SCwgZ2V0RGVkdWNlZCk7XG4gICAgfTtcblxuICAgIHZhciBhZHQgPSBBZHQuZ2VuZXJhdGUoW1xuICAgICAgeyBpbnZhbGlkOiBbJ3JhdyddIH0sXG4gICAgICB7IHBpeGVsczogWyd2YWx1ZSddIH0sXG4gICAgICB7IHBlcmNlbnQ6IFsndmFsdWUnXSB9XG4gICAgXSk7XG4gICAgdmFyIHZhbGlkYXRlRm9yID0gZnVuY3Rpb24gKHN1ZmZpeCwgdHlwZSwgdmFsdWUpIHtcbiAgICAgIHZhciByYXdBbW91bnQgPSB2YWx1ZS5zdWJzdHJpbmcoMCwgdmFsdWUubGVuZ3RoIC0gc3VmZml4Lmxlbmd0aCk7XG4gICAgICB2YXIgYW1vdW50ID0gcGFyc2VGbG9hdChyYXdBbW91bnQpO1xuICAgICAgcmV0dXJuIHJhd0Ftb3VudCA9PT0gYW1vdW50LnRvU3RyaW5nKCkgPyB0eXBlKGFtb3VudCkgOiBhZHQuaW52YWxpZCh2YWx1ZSk7XG4gICAgfTtcbiAgICB2YXIgZnJvbSQxID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAoZW5kc1dpdGgodmFsdWUsICclJykpIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlRm9yKCclJywgYWR0LnBlcmNlbnQsIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGlmIChlbmRzV2l0aCh2YWx1ZSwgJ3B4JykpIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlRm9yKCdweCcsIGFkdC5waXhlbHMsIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhZHQuaW52YWxpZCh2YWx1ZSk7XG4gICAgfTtcbiAgICB2YXIgU2l6ZSA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBhZHQpLCB7IGZyb206IGZyb20kMSB9KTtcblxuICAgIHZhciByZWRpc3RyaWJ1dGVUb1BlcmNlbnQgPSBmdW5jdGlvbiAod2lkdGhzLCB0b3RhbFdpZHRoKSB7XG4gICAgICByZXR1cm4gbWFwKHdpZHRocywgZnVuY3Rpb24gKHcpIHtcbiAgICAgICAgdmFyIGNvbFR5cGUgPSBTaXplLmZyb20odyk7XG4gICAgICAgIHJldHVybiBjb2xUeXBlLmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiB3O1xuICAgICAgICB9LCBmdW5jdGlvbiAocHgpIHtcbiAgICAgICAgICB2YXIgcmF0aW8gPSBweCAvIHRvdGFsV2lkdGggKiAxMDA7XG4gICAgICAgICAgcmV0dXJuIHJhdGlvICsgJyUnO1xuICAgICAgICB9LCBmdW5jdGlvbiAocGMpIHtcbiAgICAgICAgICByZXR1cm4gcGMgKyAnJSc7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgcmVkaXN0cmlidXRlVG9QeCA9IGZ1bmN0aW9uICh3aWR0aHMsIHRvdGFsV2lkdGgsIG5ld1RvdGFsV2lkdGgpIHtcbiAgICAgIHZhciBzY2FsZSA9IG5ld1RvdGFsV2lkdGggLyB0b3RhbFdpZHRoO1xuICAgICAgcmV0dXJuIG1hcCh3aWR0aHMsIGZ1bmN0aW9uICh3KSB7XG4gICAgICAgIHZhciBjb2xUeXBlID0gU2l6ZS5mcm9tKHcpO1xuICAgICAgICByZXR1cm4gY29sVHlwZS5mb2xkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gdztcbiAgICAgICAgfSwgZnVuY3Rpb24gKHB4KSB7XG4gICAgICAgICAgcmV0dXJuIHB4ICogc2NhbGUgKyAncHgnO1xuICAgICAgICB9LCBmdW5jdGlvbiAocGMpIHtcbiAgICAgICAgICByZXR1cm4gcGMgLyAxMDAgKiBuZXdUb3RhbFdpZHRoICsgJ3B4JztcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciByZWRpc3RyaWJ1dGVFbXB0eSA9IGZ1bmN0aW9uIChuZXdXaWR0aFR5cGUsIGNvbHVtbnMpIHtcbiAgICAgIHZhciBmID0gbmV3V2lkdGhUeXBlLmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY29uc3RhbnQoJycpO1xuICAgICAgfSwgZnVuY3Rpb24gKHB4KSB7XG4gICAgICAgIHZhciBudW0gPSBweCAvIGNvbHVtbnM7XG4gICAgICAgIHJldHVybiBjb25zdGFudChudW0gKyAncHgnKTtcbiAgICAgIH0sIGZ1bmN0aW9uIChwYykge1xuICAgICAgICB2YXIgbnVtID0gcGMgLyBjb2x1bW5zO1xuICAgICAgICByZXR1cm4gY29uc3RhbnQobnVtICsgJ3B4Jyk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByYW5nZShjb2x1bW5zLCBmKTtcbiAgICB9O1xuICAgIHZhciByZWRpc3RyaWJ1dGVWYWx1ZXMgPSBmdW5jdGlvbiAobmV3V2lkdGhUeXBlLCB3aWR0aHMsIHRvdGFsV2lkdGgpIHtcbiAgICAgIHJldHVybiBuZXdXaWR0aFR5cGUuZm9sZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB3aWR0aHM7XG4gICAgICB9LCBmdW5jdGlvbiAocHgpIHtcbiAgICAgICAgcmV0dXJuIHJlZGlzdHJpYnV0ZVRvUHgod2lkdGhzLCB0b3RhbFdpZHRoLCBweCk7XG4gICAgICB9LCBmdW5jdGlvbiAoX3BjKSB7XG4gICAgICAgIHJldHVybiByZWRpc3RyaWJ1dGVUb1BlcmNlbnQod2lkdGhzLCB0b3RhbFdpZHRoKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHJlZGlzdHJpYnV0ZSA9IGZ1bmN0aW9uICh3aWR0aHMsIHRvdGFsV2lkdGgsIG5ld1dpZHRoKSB7XG4gICAgICB2YXIgbmV3VHlwZSA9IFNpemUuZnJvbShuZXdXaWR0aCk7XG4gICAgICB2YXIgZmxvYXRzID0gZm9yYWxsKHdpZHRocywgZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgcmV0dXJuIHMgPT09ICcwcHgnO1xuICAgICAgfSkgPyByZWRpc3RyaWJ1dGVFbXB0eShuZXdUeXBlLCB3aWR0aHMubGVuZ3RoKSA6IHJlZGlzdHJpYnV0ZVZhbHVlcyhuZXdUeXBlLCB3aWR0aHMsIHRvdGFsV2lkdGgpO1xuICAgICAgcmV0dXJuIG5vcm1hbGl6ZShmbG9hdHMpO1xuICAgIH07XG4gICAgdmFyIHN1bSA9IGZ1bmN0aW9uICh2YWx1ZXMsIGZhbGxiYWNrKSB7XG4gICAgICBpZiAodmFsdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsbGJhY2s7XG4gICAgICB9XG4gICAgICByZXR1cm4gZm9sZHIodmFsdWVzLCBmdW5jdGlvbiAocmVzdCwgdikge1xuICAgICAgICByZXR1cm4gU2l6ZS5mcm9tKHYpLmZvbGQoY29uc3RhbnQoMCksIGlkZW50aXR5LCBpZGVudGl0eSkgKyByZXN0O1xuICAgICAgfSwgMCk7XG4gICAgfTtcbiAgICB2YXIgcm91bmREb3duID0gZnVuY3Rpb24gKG51bSwgdW5pdCkge1xuICAgICAgdmFyIGZsb29yZWQgPSBNYXRoLmZsb29yKG51bSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogZmxvb3JlZCArIHVuaXQsXG4gICAgICAgIHJlbWFpbmRlcjogbnVtIC0gZmxvb3JlZFxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBhZGQgPSBmdW5jdGlvbiAodmFsdWUsIGFtb3VudCkge1xuICAgICAgcmV0dXJuIFNpemUuZnJvbSh2YWx1ZSkuZm9sZChjb25zdGFudCh2YWx1ZSksIGZ1bmN0aW9uIChweCkge1xuICAgICAgICByZXR1cm4gcHggKyBhbW91bnQgKyAncHgnO1xuICAgICAgfSwgZnVuY3Rpb24gKHBjKSB7XG4gICAgICAgIHJldHVybiBwYyArIGFtb3VudCArICclJztcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIG5vcm1hbGl6ZSA9IGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICAgIGlmICh2YWx1ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgICB9XG4gICAgICB2YXIgc2NhbiA9IGZvbGRyKHZhbHVlcywgZnVuY3Rpb24gKHJlc3QsIHZhbHVlKSB7XG4gICAgICAgIHZhciBpbmZvID0gU2l6ZS5mcm9tKHZhbHVlKS5mb2xkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgcmVtYWluZGVyOiAwXG4gICAgICAgICAgfTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKG51bSkge1xuICAgICAgICAgIHJldHVybiByb3VuZERvd24obnVtLCAncHgnKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKG51bSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogbnVtICsgJyUnLFxuICAgICAgICAgICAgcmVtYWluZGVyOiAwXG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgb3V0cHV0OiBbaW5mby52YWx1ZV0uY29uY2F0KHJlc3Qub3V0cHV0KSxcbiAgICAgICAgICByZW1haW5kZXI6IHJlc3QucmVtYWluZGVyICsgaW5mby5yZW1haW5kZXJcbiAgICAgICAgfTtcbiAgICAgIH0sIHtcbiAgICAgICAgb3V0cHV0OiBbXSxcbiAgICAgICAgcmVtYWluZGVyOiAwXG4gICAgICB9KTtcbiAgICAgIHZhciByID0gc2Nhbi5vdXRwdXQ7XG4gICAgICByZXR1cm4gci5zbGljZSgwLCByLmxlbmd0aCAtIDEpLmNvbmNhdChbYWRkKHJbci5sZW5ndGggLSAxXSwgTWF0aC5yb3VuZChzY2FuLnJlbWFpbmRlcikpXSk7XG4gICAgfTtcbiAgICB2YXIgdmFsaWRhdGUgPSBTaXplLmZyb207XG5cbiAgICB2YXIgcmVkaXN0cmlidXRlVG9XID0gZnVuY3Rpb24gKG5ld1dpZHRocywgY2VsbHMsIHVuaXQpIHtcbiAgICAgIGVhY2goY2VsbHMsIGZ1bmN0aW9uIChjZWxsKSB7XG4gICAgICAgIHZhciB3aWR0aHMgPSBuZXdXaWR0aHMuc2xpY2UoY2VsbC5jb2x1bW4oKSwgY2VsbC5jb2xzcGFuKCkgKyBjZWxsLmNvbHVtbigpKTtcbiAgICAgICAgdmFyIHcgPSBzdW0od2lkdGhzLCBtaW5XaWR0aCgpKTtcbiAgICAgICAgc2V0JDEoY2VsbC5lbGVtZW50KCksICd3aWR0aCcsIHcgKyB1bml0KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHJlZGlzdHJpYnV0ZVRvSCA9IGZ1bmN0aW9uIChuZXdIZWlnaHRzLCByb3dzLCBjZWxscywgdW5pdCkge1xuICAgICAgZWFjaChjZWxscywgZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgICAgdmFyIGhlaWdodHMgPSBuZXdIZWlnaHRzLnNsaWNlKGNlbGwucm93KCksIGNlbGwucm93c3BhbigpICsgY2VsbC5yb3coKSk7XG4gICAgICAgIHZhciBoID0gc3VtKGhlaWdodHMsIG1pbkhlaWdodCgpKTtcbiAgICAgICAgc2V0JDEoY2VsbC5lbGVtZW50KCksICdoZWlnaHQnLCBoICsgdW5pdCk7XG4gICAgICB9KTtcbiAgICAgIGVhY2gocm93cywgZnVuY3Rpb24gKHJvdywgaSkge1xuICAgICAgICBzZXQkMShyb3cuZWxlbWVudCgpLCAnaGVpZ2h0JywgbmV3SGVpZ2h0c1tpXSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBnZXRVbml0ID0gZnVuY3Rpb24gKG5ld1NpemUpIHtcbiAgICAgIHJldHVybiB2YWxpZGF0ZShuZXdTaXplKS5mb2xkKGNvbnN0YW50KCdweCcpLCBjb25zdGFudCgncHgnKSwgY29uc3RhbnQoJyUnKSk7XG4gICAgfTtcbiAgICB2YXIgcmVkaXN0cmlidXRlJDEgPSBmdW5jdGlvbiAodGFibGUsIG9wdFdpZHRoLCBvcHRIZWlnaHQsIGRpcmVjdGlvbiwgdGFibGVTaXplKSB7XG4gICAgICB2YXIgd2FyZWhvdXNlID0gV2FyZWhvdXNlLmZyb21UYWJsZSh0YWJsZSk7XG4gICAgICB2YXIgcm93cyA9IHdhcmVob3VzZS5hbGw7XG4gICAgICB2YXIgY2VsbHMgPSBXYXJlaG91c2UuanVzdENlbGxzKHdhcmVob3VzZSk7XG4gICAgICBvcHRXaWR0aC5lYWNoKGZ1bmN0aW9uIChuZXdXaWR0aCkge1xuICAgICAgICB2YXIgd1VuaXQgPSBnZXRVbml0KG5ld1dpZHRoKTtcbiAgICAgICAgdmFyIHRvdGFsV2lkdGggPSBnZXQkNSh0YWJsZSk7XG4gICAgICAgIHZhciBvbGRXaWR0aHMgPSBnZXRSYXdXaWR0aHMod2FyZWhvdXNlLCBkaXJlY3Rpb24sIHRhYmxlU2l6ZSk7XG4gICAgICAgIHZhciBudVdpZHRocyA9IHJlZGlzdHJpYnV0ZShvbGRXaWR0aHMsIHRvdGFsV2lkdGgsIG5ld1dpZHRoKTtcbiAgICAgICAgcmVkaXN0cmlidXRlVG9XKG51V2lkdGhzLCBjZWxscywgd1VuaXQpO1xuICAgICAgICBzZXQkMSh0YWJsZSwgJ3dpZHRoJywgbmV3V2lkdGgpO1xuICAgICAgfSk7XG4gICAgICBvcHRIZWlnaHQuZWFjaChmdW5jdGlvbiAobmV3SGVpZ2h0KSB7XG4gICAgICAgIHZhciBoVW5pdCA9IGdldFVuaXQobmV3SGVpZ2h0KTtcbiAgICAgICAgdmFyIHRvdGFsSGVpZ2h0ID0gZ2V0JDQodGFibGUpO1xuICAgICAgICB2YXIgb2xkSGVpZ2h0cyA9IGdldFJhd0hlaWdodHMod2FyZWhvdXNlLCBoZWlnaHQpO1xuICAgICAgICB2YXIgbnVIZWlnaHRzID0gcmVkaXN0cmlidXRlKG9sZEhlaWdodHMsIHRvdGFsSGVpZ2h0LCBuZXdIZWlnaHQpO1xuICAgICAgICByZWRpc3RyaWJ1dGVUb0gobnVIZWlnaHRzLCByb3dzLCBjZWxscywgaFVuaXQpO1xuICAgICAgICBzZXQkMSh0YWJsZSwgJ2hlaWdodCcsIG5ld0hlaWdodCk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBpc1BlcmNlbnRTaXppbmckMSA9IGlzUGVyY2VudFNpemluZztcbiAgICB2YXIgaXNQaXhlbFNpemluZyQxID0gaXNQaXhlbFNpemluZztcbiAgICB2YXIgaXNOb25lU2l6aW5nJDEgPSBpc05vbmVTaXppbmc7XG4gICAgdmFyIGdldFBlcmNlbnRUYWJsZVdpZHRoJDEgPSBnZXRQZXJjZW50VGFibGVXaWR0aDtcblxuICAgIHZhciBSZXNpemVEaXJlY3Rpb24gPSB7XG4gICAgICBsdHI6IGx0cixcbiAgICAgIHJ0bDogcnRsXG4gICAgfTtcblxuICAgIHZhciBUYWJsZURpcmVjdGlvbiA9IGZ1bmN0aW9uIChkaXJlY3Rpb25BdCkge1xuICAgICAgdmFyIGF1dG8gPSBmdW5jdGlvbiAodGFibGUpIHtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGlvbkF0KHRhYmxlKS5pc1J0bCgpID8gUmVzaXplRGlyZWN0aW9uLnJ0bCA6IFJlc2l6ZURpcmVjdGlvbi5sdHI7XG4gICAgICB9O1xuICAgICAgdmFyIGRlbHRhID0gZnVuY3Rpb24gKGFtb3VudCwgdGFibGUpIHtcbiAgICAgICAgcmV0dXJuIGF1dG8odGFibGUpLmRlbHRhKGFtb3VudCwgdGFibGUpO1xuICAgICAgfTtcbiAgICAgIHZhciBwb3NpdGlvbnMgPSBmdW5jdGlvbiAoY29scywgdGFibGUpIHtcbiAgICAgICAgcmV0dXJuIGF1dG8odGFibGUpLnBvc2l0aW9ucyhjb2xzLCB0YWJsZSk7XG4gICAgICB9O1xuICAgICAgdmFyIGVkZ2UgPSBmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICByZXR1cm4gYXV0byhjZWxsKS5lZGdlKGNlbGwpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRlbHRhOiBkZWx0YSxcbiAgICAgICAgZWRnZTogZWRnZSxcbiAgICAgICAgcG9zaXRpb25zOiBwb3NpdGlvbnNcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciBJbW11dGFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgZmllbGRzID0gW107XG4gICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBmaWVsZHNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICB2YWx1ZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmllbGRzLmxlbmd0aCAhPT0gdmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBzdHJ1Y3QuIEV4cGVjdGVkIFwiWycgKyBmaWVsZHMubGVuZ3RoICsgJ11cIiwgZ290ICcgKyB2YWx1ZXMubGVuZ3RoICsgJyBhcmd1bWVudHMnKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RydWN0ID0ge307XG4gICAgICAgIGVhY2goZmllbGRzLCBmdW5jdGlvbiAobmFtZSwgaSkge1xuICAgICAgICAgIHN0cnVjdFtuYW1lXSA9IGNvbnN0YW50KHZhbHVlc1tpXSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3RydWN0O1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIEV2ZW50ID0gZnVuY3Rpb24gKGZpZWxkcykge1xuICAgICAgdmFyIHN0cnVjdCA9IEltbXV0YWJsZS5hcHBseShudWxsLCBmaWVsZHMpO1xuICAgICAgdmFyIGhhbmRsZXJzID0gW107XG4gICAgICB2YXIgYmluZCA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V2ZW50IGJpbmQgZXJyb3I6IHVuZGVmaW5lZCBoYW5kbGVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgaGFuZGxlcnMucHVzaChoYW5kbGVyKTtcbiAgICAgIH07XG4gICAgICB2YXIgdW5iaW5kID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgaGFuZGxlcnMgPSBmaWx0ZXIoaGFuZGxlcnMsIGZ1bmN0aW9uIChoKSB7XG4gICAgICAgICAgcmV0dXJuIGggIT09IGhhbmRsZXI7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIHZhciB0cmlnZ2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXZlbnQgPSBzdHJ1Y3QuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICAgIGVhY2goaGFuZGxlcnMsIGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgICAgaGFuZGxlcihldmVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGJpbmQ6IGJpbmQsXG4gICAgICAgIHVuYmluZDogdW5iaW5kLFxuICAgICAgICB0cmlnZ2VyOiB0cmlnZ2VyXG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgY3JlYXRlID0gZnVuY3Rpb24gKHR5cGVEZWZzKSB7XG4gICAgICB2YXIgcmVnaXN0cnkgPSBtYXAkMSh0eXBlRGVmcywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYmluZDogZXZlbnQuYmluZCxcbiAgICAgICAgICB1bmJpbmQ6IGV2ZW50LnVuYmluZFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgICB2YXIgdHJpZ2dlciA9IG1hcCQxKHR5cGVEZWZzLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50LnRyaWdnZXI7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlZ2lzdHJ5OiByZWdpc3RyeSxcbiAgICAgICAgdHJpZ2dlcjogdHJpZ2dlclxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIGFkdCQxID0gQWR0LmdlbmVyYXRlKFtcbiAgICAgIHsgbm9uZTogW10gfSxcbiAgICAgIHsgb25seTogWydpbmRleCddIH0sXG4gICAgICB7XG4gICAgICAgIGxlZnQ6IFtcbiAgICAgICAgICAnaW5kZXgnLFxuICAgICAgICAgICduZXh0J1xuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBtaWRkbGU6IFtcbiAgICAgICAgICAncHJldicsXG4gICAgICAgICAgJ2luZGV4JyxcbiAgICAgICAgICAnbmV4dCdcbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcmlnaHQ6IFtcbiAgICAgICAgICAncHJldicsXG4gICAgICAgICAgJ2luZGV4J1xuICAgICAgICBdXG4gICAgICB9XG4gICAgXSk7XG4gICAgdmFyIENvbHVtbkNvbnRleHQgPSBfX2Fzc2lnbih7fSwgYWR0JDEpO1xuXG4gICAgdmFyIG5laWdoYm91cnMgPSBmdW5jdGlvbiAoaW5wdXQsIGluZGV4KSB7XG4gICAgICBpZiAoaW5wdXQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBDb2x1bW5Db250ZXh0Lm5vbmUoKTtcbiAgICAgIH1cbiAgICAgIGlmIChpbnB1dC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIENvbHVtbkNvbnRleHQub25seSgwKTtcbiAgICAgIH1cbiAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gQ29sdW1uQ29udGV4dC5sZWZ0KDAsIDEpO1xuICAgICAgfVxuICAgICAgaWYgKGluZGV4ID09PSBpbnB1dC5sZW5ndGggLSAxKSB7XG4gICAgICAgIHJldHVybiBDb2x1bW5Db250ZXh0LnJpZ2h0KGluZGV4IC0gMSwgaW5kZXgpO1xuICAgICAgfVxuICAgICAgaWYgKGluZGV4ID4gMCAmJiBpbmRleCA8IGlucHV0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgcmV0dXJuIENvbHVtbkNvbnRleHQubWlkZGxlKGluZGV4IC0gMSwgaW5kZXgsIGluZGV4ICsgMSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gQ29sdW1uQ29udGV4dC5ub25lKCk7XG4gICAgfTtcbiAgICB2YXIgZGV0ZXJtaW5lID0gZnVuY3Rpb24gKGlucHV0LCBjb2x1bW4sIHN0ZXAsIHRhYmxlU2l6ZSkge1xuICAgICAgdmFyIHJlc3VsdCA9IGlucHV0LnNsaWNlKDApO1xuICAgICAgdmFyIGNvbnRleHQgPSBuZWlnaGJvdXJzKGlucHV0LCBjb2x1bW4pO1xuICAgICAgdmFyIHplcm8gPSBmdW5jdGlvbiAoYXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIG1hcChhcnJheSwgY29uc3RhbnQoMCkpO1xuICAgICAgfTtcbiAgICAgIHZhciBvbk5vbmUgPSBjb25zdGFudCh6ZXJvKHJlc3VsdCkpO1xuICAgICAgdmFyIG9uT25seSA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICByZXR1cm4gdGFibGVTaXplLnNpbmdsZUNvbHVtbldpZHRoKHJlc3VsdFtpbmRleF0sIHN0ZXApO1xuICAgICAgfTtcbiAgICAgIHZhciBvbkNoYW5nZSA9IGZ1bmN0aW9uIChpbmRleCwgbmV4dCkge1xuICAgICAgICBpZiAoc3RlcCA+PSAwKSB7XG4gICAgICAgICAgdmFyIG5ld05leHQgPSBNYXRoLm1heCh0YWJsZVNpemUubWluQ2VsbFdpZHRoKCksIHJlc3VsdFtuZXh0XSAtIHN0ZXApO1xuICAgICAgICAgIHJldHVybiB6ZXJvKHJlc3VsdC5zbGljZSgwLCBpbmRleCkpLmNvbmNhdChbXG4gICAgICAgICAgICBzdGVwLFxuICAgICAgICAgICAgbmV3TmV4dCAtIHJlc3VsdFtuZXh0XVxuICAgICAgICAgIF0pLmNvbmNhdCh6ZXJvKHJlc3VsdC5zbGljZShuZXh0ICsgMSkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgbmV3VGhpcyA9IE1hdGgubWF4KHRhYmxlU2l6ZS5taW5DZWxsV2lkdGgoKSwgcmVzdWx0W2luZGV4XSArIHN0ZXApO1xuICAgICAgICAgIHZhciBkaWZmeCA9IHJlc3VsdFtpbmRleF0gLSBuZXdUaGlzO1xuICAgICAgICAgIHJldHVybiB6ZXJvKHJlc3VsdC5zbGljZSgwLCBpbmRleCkpLmNvbmNhdChbXG4gICAgICAgICAgICBuZXdUaGlzIC0gcmVzdWx0W2luZGV4XSxcbiAgICAgICAgICAgIGRpZmZ4XG4gICAgICAgICAgXSkuY29uY2F0KHplcm8ocmVzdWx0LnNsaWNlKG5leHQgKyAxKSkpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdmFyIG9uTGVmdCA9IG9uQ2hhbmdlO1xuICAgICAgdmFyIG9uTWlkZGxlID0gZnVuY3Rpb24gKF9wcmV2LCBpbmRleCwgbmV4dCkge1xuICAgICAgICByZXR1cm4gb25DaGFuZ2UoaW5kZXgsIG5leHQpO1xuICAgICAgfTtcbiAgICAgIHZhciBvblJpZ2h0ID0gZnVuY3Rpb24gKF9wcmV2LCBpbmRleCkge1xuICAgICAgICBpZiAoc3RlcCA+PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHplcm8ocmVzdWx0LnNsaWNlKDAsIGluZGV4KSkuY29uY2F0KFtzdGVwXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHNpemUgPSBNYXRoLm1heCh0YWJsZVNpemUubWluQ2VsbFdpZHRoKCksIHJlc3VsdFtpbmRleF0gKyBzdGVwKTtcbiAgICAgICAgICByZXR1cm4gemVybyhyZXN1bHQuc2xpY2UoMCwgaW5kZXgpKS5jb25jYXQoW3NpemUgLSByZXN1bHRbaW5kZXhdXSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXR1cm4gY29udGV4dC5mb2xkKG9uTm9uZSwgb25Pbmx5LCBvbkxlZnQsIG9uTWlkZGxlLCBvblJpZ2h0KTtcbiAgICB9O1xuXG4gICAgdmFyIHRvdGFsID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQsIG1lYXN1cmVzKSB7XG4gICAgICB2YXIgciA9IDA7XG4gICAgICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgICAgICByICs9IG1lYXN1cmVzW2ldICE9PSB1bmRlZmluZWQgPyBtZWFzdXJlc1tpXSA6IDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gcjtcbiAgICB9O1xuICAgIHZhciByZWNhbGN1bGF0ZVdpZHRoID0gZnVuY3Rpb24gKHdhcmVob3VzZSwgd2lkdGhzKSB7XG4gICAgICB2YXIgYWxsID0gV2FyZWhvdXNlLmp1c3RDZWxscyh3YXJlaG91c2UpO1xuICAgICAgcmV0dXJuIG1hcChhbGwsIGZ1bmN0aW9uIChjZWxsKSB7XG4gICAgICAgIHZhciB3aWR0aCA9IHRvdGFsKGNlbGwuY29sdW1uKCksIGNlbGwuY29sdW1uKCkgKyBjZWxsLmNvbHNwYW4oKSwgd2lkdGhzKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBlbGVtZW50OiBjZWxsLmVsZW1lbnQoKSxcbiAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgICAgY29sc3BhbjogY2VsbC5jb2xzcGFuKClcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHJlY2FsY3VsYXRlSGVpZ2h0ID0gZnVuY3Rpb24gKHdhcmVob3VzZSwgaGVpZ2h0cykge1xuICAgICAgdmFyIGFsbCA9IFdhcmVob3VzZS5qdXN0Q2VsbHMod2FyZWhvdXNlKTtcbiAgICAgIHJldHVybiBtYXAoYWxsLCBmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICB2YXIgaGVpZ2h0ID0gdG90YWwoY2VsbC5yb3coKSwgY2VsbC5yb3coKSArIGNlbGwucm93c3BhbigpLCBoZWlnaHRzKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBlbGVtZW50OiBjZWxsLmVsZW1lbnQsXG4gICAgICAgICAgaGVpZ2h0OiBjb25zdGFudChoZWlnaHQpLFxuICAgICAgICAgIHJvd3NwYW46IGNlbGwucm93c3BhblxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgbWF0Y2hSb3dIZWlnaHQgPSBmdW5jdGlvbiAod2FyZWhvdXNlLCBoZWlnaHRzKSB7XG4gICAgICByZXR1cm4gbWFwKHdhcmVob3VzZS5hbGwsIGZ1bmN0aW9uIChyb3csIGkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBlbGVtZW50OiByb3cuZWxlbWVudCxcbiAgICAgICAgICBoZWlnaHQ6IGNvbnN0YW50KGhlaWdodHNbaV0pXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHN1bVVwID0gZnVuY3Rpb24gKG5ld1NpemUpIHtcbiAgICAgIHJldHVybiBmb2xkcihuZXdTaXplLCBmdW5jdGlvbiAoYiwgYSkge1xuICAgICAgICByZXR1cm4gYiArIGE7XG4gICAgICB9LCAwKTtcbiAgICB9O1xuICAgIHZhciBhZGp1c3RXaWR0aCA9IGZ1bmN0aW9uICh0YWJsZSwgZGVsdGEsIGluZGV4LCBkaXJlY3Rpb24sIHRhYmxlU2l6ZSkge1xuICAgICAgdmFyIHN0ZXAgPSB0YWJsZVNpemUuZ2V0Q2VsbERlbHRhKGRlbHRhKTtcbiAgICAgIHZhciB3YXJlaG91c2UgPSBXYXJlaG91c2UuZnJvbVRhYmxlKHRhYmxlKTtcbiAgICAgIHZhciB3aWR0aHMgPSB0YWJsZVNpemUuZ2V0V2lkdGhzKHdhcmVob3VzZSwgZGlyZWN0aW9uLCB0YWJsZVNpemUpO1xuICAgICAgdmFyIGRlbHRhcyA9IGRldGVybWluZSh3aWR0aHMsIGluZGV4LCBzdGVwLCB0YWJsZVNpemUpO1xuICAgICAgdmFyIG5ld1dpZHRocyA9IG1hcChkZWx0YXMsIGZ1bmN0aW9uIChkeCwgaSkge1xuICAgICAgICByZXR1cm4gZHggKyB3aWR0aHNbaV07XG4gICAgICB9KTtcbiAgICAgIHZhciBuZXdTaXplcyA9IHJlY2FsY3VsYXRlV2lkdGgod2FyZWhvdXNlLCBuZXdXaWR0aHMpO1xuICAgICAgZWFjaChuZXdTaXplcywgZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgICAgdGFibGVTaXplLnNldEVsZW1lbnRXaWR0aChjZWxsLmVsZW1lbnQsIGNlbGwud2lkdGgpO1xuICAgICAgfSk7XG4gICAgICBpZiAoaW5kZXggPT09IHdhcmVob3VzZS5ncmlkLmNvbHVtbnMoKSAtIDEpIHtcbiAgICAgICAgdGFibGVTaXplLmFkanVzdFRhYmxlV2lkdGgoc3RlcCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgYWRqdXN0SGVpZ2h0ID0gZnVuY3Rpb24gKHRhYmxlLCBkZWx0YSwgaW5kZXgsIGRpcmVjdGlvbikge1xuICAgICAgdmFyIHdhcmVob3VzZSA9IFdhcmVob3VzZS5mcm9tVGFibGUodGFibGUpO1xuICAgICAgdmFyIGhlaWdodHMgPSBnZXRQaXhlbEhlaWdodHMod2FyZWhvdXNlLCBkaXJlY3Rpb24pO1xuICAgICAgdmFyIG5ld0hlaWdodHMgPSBtYXAoaGVpZ2h0cywgZnVuY3Rpb24gKGR5LCBpKSB7XG4gICAgICAgIHJldHVybiBpbmRleCA9PT0gaSA/IE1hdGgubWF4KGRlbHRhICsgZHksIG1pbkhlaWdodCgpKSA6IGR5O1xuICAgICAgfSk7XG4gICAgICB2YXIgbmV3Q2VsbFNpemVzID0gcmVjYWxjdWxhdGVIZWlnaHQod2FyZWhvdXNlLCBuZXdIZWlnaHRzKTtcbiAgICAgIHZhciBuZXdSb3dTaXplcyA9IG1hdGNoUm93SGVpZ2h0KHdhcmVob3VzZSwgbmV3SGVpZ2h0cyk7XG4gICAgICBlYWNoKG5ld1Jvd1NpemVzLCBmdW5jdGlvbiAocm93KSB7XG4gICAgICAgIHNldEhlaWdodChyb3cuZWxlbWVudCgpLCByb3cuaGVpZ2h0KCkpO1xuICAgICAgfSk7XG4gICAgICBlYWNoKG5ld0NlbGxTaXplcywgZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgICAgc2V0SGVpZ2h0KGNlbGwuZWxlbWVudCgpLCBjZWxsLmhlaWdodCgpKTtcbiAgICAgIH0pO1xuICAgICAgdmFyIHRvdGFsID0gc3VtVXAobmV3SGVpZ2h0cyk7XG4gICAgICBzZXRIZWlnaHQodGFibGUsIHRvdGFsKTtcbiAgICB9O1xuICAgIHZhciBhZGp1c3RXaWR0aFRvID0gZnVuY3Rpb24gKHRhYmxlLCBsaXN0LCBkaXJlY3Rpb24sIHRhYmxlU2l6ZSkge1xuICAgICAgdmFyIHdhcmVob3VzZSA9IFdhcmVob3VzZS5nZW5lcmF0ZShsaXN0KTtcbiAgICAgIHZhciB3aWR0aHMgPSB0YWJsZVNpemUuZ2V0V2lkdGhzKHdhcmVob3VzZSwgZGlyZWN0aW9uLCB0YWJsZVNpemUpO1xuICAgICAgdmFyIG5ld1NpemVzID0gcmVjYWxjdWxhdGVXaWR0aCh3YXJlaG91c2UsIHdpZHRocyk7XG4gICAgICBlYWNoKG5ld1NpemVzLCBmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICB0YWJsZVNpemUuc2V0RWxlbWVudFdpZHRoKGNlbGwuZWxlbWVudCwgY2VsbC53aWR0aCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIG1rRXZlbnQgPSBmdW5jdGlvbiAodGFyZ2V0LCB4LCB5LCBzdG9wLCBwcmV2ZW50LCBraWxsLCByYXcpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRhcmdldDogY29uc3RhbnQodGFyZ2V0KSxcbiAgICAgICAgeDogY29uc3RhbnQoeCksXG4gICAgICAgIHk6IGNvbnN0YW50KHkpLFxuICAgICAgICBzdG9wOiBzdG9wLFxuICAgICAgICBwcmV2ZW50OiBwcmV2ZW50LFxuICAgICAgICBraWxsOiBraWxsLFxuICAgICAgICByYXc6IGNvbnN0YW50KHJhdylcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgZnJvbVJhd0V2ZW50ID0gZnVuY3Rpb24gKHJhd0V2ZW50KSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gRWxlbWVudC5mcm9tRG9tKGdldE9yaWdpbmFsRXZlbnRUYXJnZXQocmF3RXZlbnQpLmdldE9yKHJhd0V2ZW50LnRhcmdldCkpO1xuICAgICAgdmFyIHN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByYXdFdmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIH07XG4gICAgICB2YXIgcHJldmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHJhd0V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9O1xuICAgICAgdmFyIGtpbGwgPSBjb21wb3NlKHByZXZlbnQsIHN0b3ApO1xuICAgICAgcmV0dXJuIG1rRXZlbnQodGFyZ2V0LCByYXdFdmVudC5jbGllbnRYLCByYXdFdmVudC5jbGllbnRZLCBzdG9wLCBwcmV2ZW50LCBraWxsLCByYXdFdmVudCk7XG4gICAgfTtcbiAgICB2YXIgaGFuZGxlID0gZnVuY3Rpb24gKGZpbHRlciwgaGFuZGxlcikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChyYXdFdmVudCkge1xuICAgICAgICBpZiAoZmlsdGVyKHJhd0V2ZW50KSkge1xuICAgICAgICAgIGhhbmRsZXIoZnJvbVJhd0V2ZW50KHJhd0V2ZW50KSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgYmluZGVyID0gZnVuY3Rpb24gKGVsZW1lbnQsIGV2ZW50LCBmaWx0ZXIsIGhhbmRsZXIsIHVzZUNhcHR1cmUpIHtcbiAgICAgIHZhciB3cmFwcGVkID0gaGFuZGxlKGZpbHRlciwgaGFuZGxlcik7XG4gICAgICBlbGVtZW50LmRvbSgpLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHdyYXBwZWQsIHVzZUNhcHR1cmUpO1xuICAgICAgcmV0dXJuIHsgdW5iaW5kOiBjdXJyeSh1bmJpbmQsIGVsZW1lbnQsIGV2ZW50LCB3cmFwcGVkLCB1c2VDYXB0dXJlKSB9O1xuICAgIH07XG4gICAgdmFyIGJpbmQkMSA9IGZ1bmN0aW9uIChlbGVtZW50LCBldmVudCwgZmlsdGVyLCBoYW5kbGVyKSB7XG4gICAgICByZXR1cm4gYmluZGVyKGVsZW1lbnQsIGV2ZW50LCBmaWx0ZXIsIGhhbmRsZXIsIGZhbHNlKTtcbiAgICB9O1xuICAgIHZhciB1bmJpbmQgPSBmdW5jdGlvbiAoZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIsIHVzZUNhcHR1cmUpIHtcbiAgICAgIGVsZW1lbnQuZG9tKCkucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgdXNlQ2FwdHVyZSk7XG4gICAgfTtcblxuICAgIHZhciBmaWx0ZXIkMiA9IGNvbnN0YW50KHRydWUpO1xuICAgIHZhciBiaW5kJDIgPSBmdW5jdGlvbiAoZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIHJldHVybiBiaW5kJDEoZWxlbWVudCwgZXZlbnQsIGZpbHRlciQyLCBoYW5kbGVyKTtcbiAgICB9O1xuICAgIHZhciBmcm9tUmF3RXZlbnQkMSA9IGZyb21SYXdFdmVudDtcblxuICAgIHZhciByZWFkID0gZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHIpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGdldCQxKGVsZW1lbnQsIGF0dHIpO1xuICAgICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09ICcnID8gW10gOiB2YWx1ZS5zcGxpdCgnICcpO1xuICAgIH07XG4gICAgdmFyIGFkZCQxID0gZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHIsIGlkKSB7XG4gICAgICB2YXIgb2xkID0gcmVhZChlbGVtZW50LCBhdHRyKTtcbiAgICAgIHZhciBudSA9IG9sZC5jb25jYXQoW2lkXSk7XG4gICAgICBzZXQoZWxlbWVudCwgYXR0ciwgbnUuam9pbignICcpKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgdmFyIHJlbW92ZSQzID0gZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHIsIGlkKSB7XG4gICAgICB2YXIgbnUgPSBmaWx0ZXIocmVhZChlbGVtZW50LCBhdHRyKSwgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIHYgIT09IGlkO1xuICAgICAgfSk7XG4gICAgICBpZiAobnUubGVuZ3RoID4gMCkge1xuICAgICAgICBzZXQoZWxlbWVudCwgYXR0ciwgbnUuam9pbignICcpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlbW92ZShlbGVtZW50LCBhdHRyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgdmFyIHN1cHBvcnRzID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBlbGVtZW50LmRvbSgpLmNsYXNzTGlzdCAhPT0gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgdmFyIGdldCQ3ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiByZWFkKGVsZW1lbnQsICdjbGFzcycpO1xuICAgIH07XG4gICAgdmFyIGFkZCQyID0gZnVuY3Rpb24gKGVsZW1lbnQsIGNsYXp6KSB7XG4gICAgICByZXR1cm4gYWRkJDEoZWxlbWVudCwgJ2NsYXNzJywgY2xhenopO1xuICAgIH07XG4gICAgdmFyIHJlbW92ZSQ0ID0gZnVuY3Rpb24gKGVsZW1lbnQsIGNsYXp6KSB7XG4gICAgICByZXR1cm4gcmVtb3ZlJDMoZWxlbWVudCwgJ2NsYXNzJywgY2xhenopO1xuICAgIH07XG5cbiAgICB2YXIgYWRkJDMgPSBmdW5jdGlvbiAoZWxlbWVudCwgY2xhenopIHtcbiAgICAgIGlmIChzdXBwb3J0cyhlbGVtZW50KSkge1xuICAgICAgICBlbGVtZW50LmRvbSgpLmNsYXNzTGlzdC5hZGQoY2xhenopO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkJDIoZWxlbWVudCwgY2xhenopO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGNsZWFuQ2xhc3MgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgdmFyIGNsYXNzTGlzdCA9IHN1cHBvcnRzKGVsZW1lbnQpID8gZWxlbWVudC5kb20oKS5jbGFzc0xpc3QgOiBnZXQkNyhlbGVtZW50KTtcbiAgICAgIGlmIChjbGFzc0xpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJlbW92ZShlbGVtZW50LCAnY2xhc3MnKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciByZW1vdmUkNSA9IGZ1bmN0aW9uIChlbGVtZW50LCBjbGF6eikge1xuICAgICAgaWYgKHN1cHBvcnRzKGVsZW1lbnQpKSB7XG4gICAgICAgIHZhciBjbGFzc0xpc3QgPSBlbGVtZW50LmRvbSgpLmNsYXNzTGlzdDtcbiAgICAgICAgY2xhc3NMaXN0LnJlbW92ZShjbGF6eik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZW1vdmUkNChlbGVtZW50LCBjbGF6eik7XG4gICAgICB9XG4gICAgICBjbGVhbkNsYXNzKGVsZW1lbnQpO1xuICAgIH07XG4gICAgdmFyIGhhcyQyID0gZnVuY3Rpb24gKGVsZW1lbnQsIGNsYXp6KSB7XG4gICAgICByZXR1cm4gc3VwcG9ydHMoZWxlbWVudCkgJiYgZWxlbWVudC5kb20oKS5jbGFzc0xpc3QuY29udGFpbnMoY2xhenopO1xuICAgIH07XG5cbiAgICB2YXIgY3NzID0gZnVuY3Rpb24gKG5hbWVzcGFjZSkge1xuICAgICAgdmFyIGRhc2hOYW1lc3BhY2UgPSBuYW1lc3BhY2UucmVwbGFjZSgvXFwuL2csICctJyk7XG4gICAgICB2YXIgcmVzb2x2ZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgcmV0dXJuIGRhc2hOYW1lc3BhY2UgKyAnLScgKyBzdHI7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHsgcmVzb2x2ZTogcmVzb2x2ZSB9O1xuICAgIH07XG5cbiAgICB2YXIgc3R5bGVzID0gY3NzKCdlcGhveC1kcmFnc3RlcicpO1xuICAgIHZhciByZXNvbHZlID0gc3R5bGVzLnJlc29sdmU7XG5cbiAgICB2YXIgQmxvY2tlciA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICB2YXIgc2V0dGluZ3MgPSBfX2Fzc2lnbih7IGxheWVyQ2xhc3M6IHJlc29sdmUoJ2Jsb2NrZXInKSB9LCBvcHRpb25zKTtcbiAgICAgIHZhciBkaXYgPSBFbGVtZW50LmZyb21UYWcoJ2RpdicpO1xuICAgICAgc2V0KGRpdiwgJ3JvbGUnLCAncHJlc2VudGF0aW9uJyk7XG4gICAgICBzZXRBbGwkMShkaXYsIHtcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICAgIGxlZnQ6ICcwcHgnLFxuICAgICAgICB0b3A6ICcwcHgnLFxuICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICBoZWlnaHQ6ICcxMDAlJ1xuICAgICAgfSk7XG4gICAgICBhZGQkMyhkaXYsIHJlc29sdmUoJ2Jsb2NrZXInKSk7XG4gICAgICBhZGQkMyhkaXYsIHNldHRpbmdzLmxheWVyQ2xhc3MpO1xuICAgICAgdmFyIGVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBkaXY7XG4gICAgICB9O1xuICAgICAgdmFyIGRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlbW92ZSQyKGRpdik7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgZGVzdHJveTogZGVzdHJveVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIHNvcnQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgICByZXR1cm4gYXJyLnNsaWNlKDApLnNvcnQoKTtcbiAgICB9O1xuICAgIHZhciByZXFNZXNzYWdlID0gZnVuY3Rpb24gKHJlcXVpcmVkLCBrZXlzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FsbCByZXF1aXJlZCBrZXlzICgnICsgc29ydChyZXF1aXJlZCkuam9pbignLCAnKSArICcpIHdlcmUgbm90IHNwZWNpZmllZC4gU3BlY2lmaWVkIGtleXMgd2VyZTogJyArIHNvcnQoa2V5cykuam9pbignLCAnKSArICcuJyk7XG4gICAgfTtcbiAgICB2YXIgdW5zdXBwTWVzc2FnZSA9IGZ1bmN0aW9uICh1bnN1cHBvcnRlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBrZXlzIGZvciBvYmplY3Q6ICcgKyBzb3J0KHVuc3VwcG9ydGVkKS5qb2luKCcsICcpKTtcbiAgICB9O1xuICAgIHZhciB2YWxpZGF0ZVN0ckFyciA9IGZ1bmN0aW9uIChsYWJlbCwgYXJyYXkpIHtcbiAgICAgIGlmICghaXNBcnJheShhcnJheSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgJyArIGxhYmVsICsgJyBmaWVsZHMgbXVzdCBiZSBhbiBhcnJheS4gV2FzOiAnICsgYXJyYXkgKyAnLicpO1xuICAgICAgfVxuICAgICAgZWFjaChhcnJheSwgZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgaWYgKCFpc1N0cmluZyhhKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHZhbHVlICcgKyBhICsgJyBpbiB0aGUgJyArIGxhYmVsICsgJyBmaWVsZHMgd2FzIG5vdCBhIHN0cmluZy4nKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgaW52YWxpZFR5cGVNZXNzYWdlID0gZnVuY3Rpb24gKGluY29ycmVjdCwgdHlwZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbGwgdmFsdWVzIG5lZWQgdG8gYmUgb2YgdHlwZTogJyArIHR5cGUgKyAnLiBLZXlzICgnICsgc29ydChpbmNvcnJlY3QpLmpvaW4oJywgJykgKyAnKSB3ZXJlIG5vdC4nKTtcbiAgICB9O1xuICAgIHZhciBjaGVja0R1cGVzID0gZnVuY3Rpb24gKGV2ZXJ5dGhpbmcpIHtcbiAgICAgIHZhciBzb3J0ZWQgPSBzb3J0KGV2ZXJ5dGhpbmcpO1xuICAgICAgdmFyIGR1cGUgPSBmaW5kKHNvcnRlZCwgZnVuY3Rpb24gKHMsIGkpIHtcbiAgICAgICAgcmV0dXJuIGkgPCBzb3J0ZWQubGVuZ3RoIC0gMSAmJiBzID09PSBzb3J0ZWRbaSArIDFdO1xuICAgICAgfSk7XG4gICAgICBkdXBlLmVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZmllbGQ6ICcgKyBkICsgJyBvY2N1cnMgbW9yZSB0aGFuIG9uY2UgaW4gdGhlIGNvbWJpbmVkIGZpZWxkczogWycgKyBzb3J0ZWQuam9pbignLCAnKSArICddLicpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBiYXNlID0gZnVuY3Rpb24gKGhhbmRsZVVuc3VwcG9ydGVkLCByZXF1aXJlZCkge1xuICAgICAgcmV0dXJuIGJhc2VXaXRoKGhhbmRsZVVuc3VwcG9ydGVkLCByZXF1aXJlZCwge1xuICAgICAgICB2YWxpZGF0ZTogaXNGdW5jdGlvbixcbiAgICAgICAgbGFiZWw6ICdmdW5jdGlvbidcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGJhc2VXaXRoID0gZnVuY3Rpb24gKGhhbmRsZVVuc3VwcG9ydGVkLCByZXF1aXJlZCwgcHJlZCkge1xuICAgICAgaWYgKHJlcXVpcmVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHNwZWNpZnkgYXQgbGVhc3Qgb25lIHJlcXVpcmVkIGZpZWxkLicpO1xuICAgICAgfVxuICAgICAgdmFsaWRhdGVTdHJBcnIoJ3JlcXVpcmVkJywgcmVxdWlyZWQpO1xuICAgICAgY2hlY2tEdXBlcyhyZXF1aXJlZCk7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICB2YXIga2V5cyQxID0ga2V5cyhvYmopO1xuICAgICAgICB2YXIgYWxsUmVxZCA9IGZvcmFsbChyZXF1aXJlZCwgZnVuY3Rpb24gKHJlcSkge1xuICAgICAgICAgIHJldHVybiBjb250YWlucyhrZXlzJDEsIHJlcSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWFsbFJlcWQpIHtcbiAgICAgICAgICByZXFNZXNzYWdlKHJlcXVpcmVkLCBrZXlzJDEpO1xuICAgICAgICB9XG4gICAgICAgIGhhbmRsZVVuc3VwcG9ydGVkKHJlcXVpcmVkLCBrZXlzJDEpO1xuICAgICAgICB2YXIgaW52YWxpZEtleXMgPSBmaWx0ZXIocmVxdWlyZWQsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICByZXR1cm4gIXByZWQudmFsaWRhdGUob2JqW2tleV0sIGtleSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaW52YWxpZEtleXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGludmFsaWRUeXBlTWVzc2FnZShpbnZhbGlkS2V5cywgcHJlZC5sYWJlbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgaGFuZGxlRXhhY3QgPSBmdW5jdGlvbiAocmVxdWlyZWQsIGtleXMpIHtcbiAgICAgIHZhciB1bnN1cHBvcnRlZCA9IGZpbHRlcihrZXlzLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHJldHVybiAhY29udGFpbnMocmVxdWlyZWQsIGtleSk7XG4gICAgICB9KTtcbiAgICAgIGlmICh1bnN1cHBvcnRlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHVuc3VwcE1lc3NhZ2UodW5zdXBwb3J0ZWQpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGV4YWN0bHkgPSBmdW5jdGlvbiAocmVxdWlyZWQpIHtcbiAgICAgIHJldHVybiBiYXNlKGhhbmRsZUV4YWN0LCByZXF1aXJlZCk7XG4gICAgfTtcblxuICAgIHZhciBEcmFnTW9kZSA9IGV4YWN0bHkoW1xuICAgICAgJ2NvbXBhcmUnLFxuICAgICAgJ2V4dHJhY3QnLFxuICAgICAgJ211dGF0ZScsXG4gICAgICAnc2luaydcbiAgICBdKTtcbiAgICB2YXIgRHJhZ1NpbmsgPSBleGFjdGx5KFtcbiAgICAgICdlbGVtZW50JyxcbiAgICAgICdzdGFydCcsXG4gICAgICAnc3RvcCcsXG4gICAgICAnZGVzdHJveSdcbiAgICBdKTtcbiAgICB2YXIgRHJhZ0FwaSA9IGV4YWN0bHkoW1xuICAgICAgJ2ZvcmNlRHJvcCcsXG4gICAgICAnZHJvcCcsXG4gICAgICAnbW92ZScsXG4gICAgICAnZGVsYXlEcm9wJ1xuICAgIF0pO1xuXG4gICAgdmFyIGNvbXBhcmUgPSBmdW5jdGlvbiAob2xkLCBudSkge1xuICAgICAgcmV0dXJuIFBvc2l0aW9uKG51LmxlZnQoKSAtIG9sZC5sZWZ0KCksIG51LnRvcCgpIC0gb2xkLnRvcCgpKTtcbiAgICB9O1xuICAgIHZhciBleHRyYWN0JDEgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHJldHVybiBPcHRpb24uc29tZShQb3NpdGlvbihldmVudC54KCksIGV2ZW50LnkoKSkpO1xuICAgIH07XG4gICAgdmFyIG11dGF0ZSA9IGZ1bmN0aW9uIChtdXRhdGlvbiwgaW5mbykge1xuICAgICAgbXV0YXRpb24ubXV0YXRlKGluZm8ubGVmdCgpLCBpbmZvLnRvcCgpKTtcbiAgICB9O1xuICAgIHZhciBzaW5rID0gZnVuY3Rpb24gKGRyYWdBcGksIHNldHRpbmdzKSB7XG4gICAgICB2YXIgYmxvY2tlciA9IEJsb2NrZXIoc2V0dGluZ3MpO1xuICAgICAgdmFyIG1kb3duID0gYmluZCQyKGJsb2NrZXIuZWxlbWVudCgpLCAnbW91c2Vkb3duJywgZHJhZ0FwaS5mb3JjZURyb3ApO1xuICAgICAgdmFyIG11cCA9IGJpbmQkMihibG9ja2VyLmVsZW1lbnQoKSwgJ21vdXNldXAnLCBkcmFnQXBpLmRyb3ApO1xuICAgICAgdmFyIG1tb3ZlID0gYmluZCQyKGJsb2NrZXIuZWxlbWVudCgpLCAnbW91c2Vtb3ZlJywgZHJhZ0FwaS5tb3ZlKTtcbiAgICAgIHZhciBtb3V0ID0gYmluZCQyKGJsb2NrZXIuZWxlbWVudCgpLCAnbW91c2VvdXQnLCBkcmFnQXBpLmRlbGF5RHJvcCk7XG4gICAgICB2YXIgZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYmxvY2tlci5kZXN0cm95KCk7XG4gICAgICAgIG11cC51bmJpbmQoKTtcbiAgICAgICAgbW1vdmUudW5iaW5kKCk7XG4gICAgICAgIG1vdXQudW5iaW5kKCk7XG4gICAgICAgIG1kb3duLnVuYmluZCgpO1xuICAgICAgfTtcbiAgICAgIHZhciBzdGFydCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgYXBwZW5kKHBhcmVudCwgYmxvY2tlci5lbGVtZW50KCkpO1xuICAgICAgfTtcbiAgICAgIHZhciBzdG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZW1vdmUkMihibG9ja2VyLmVsZW1lbnQoKSk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIERyYWdTaW5rKHtcbiAgICAgICAgZWxlbWVudDogYmxvY2tlci5lbGVtZW50LFxuICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgIHN0b3A6IHN0b3AsXG4gICAgICAgIGRlc3Ryb3k6IGRlc3Ryb3lcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIE1vdXNlRHJhZyA9IERyYWdNb2RlKHtcbiAgICAgIGNvbXBhcmU6IGNvbXBhcmUsXG4gICAgICBleHRyYWN0OiBleHRyYWN0JDEsXG4gICAgICBzaW5rOiBzaW5rLFxuICAgICAgbXV0YXRlOiBtdXRhdGVcbiAgICB9KTtcblxuICAgIHZhciBsYXN0JDIgPSBmdW5jdGlvbiAoZm4sIHJhdGUpIHtcbiAgICAgIHZhciB0aW1lciA9IG51bGw7XG4gICAgICB2YXIgY2FuY2VsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgICBkb21HbG9iYWxzLmNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdmFyIHRocm90dGxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgICBkb21HbG9iYWxzLmNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgIH1cbiAgICAgICAgdGltZXIgPSBkb21HbG9iYWxzLnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgICAgfSwgcmF0ZSk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2FuY2VsOiBjYW5jZWwsXG4gICAgICAgIHRocm90dGxlOiB0aHJvdHRsZVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gSW5EcmFnICgpIHtcbiAgICAgIHZhciBwcmV2aW91cyA9IE9wdGlvbi5ub25lKCk7XG4gICAgICB2YXIgcmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHByZXZpb3VzID0gT3B0aW9uLm5vbmUoKTtcbiAgICAgIH07XG4gICAgICB2YXIgdXBkYXRlID0gZnVuY3Rpb24gKG1vZGUsIG51KSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBwcmV2aW91cy5tYXAoZnVuY3Rpb24gKG9sZCkge1xuICAgICAgICAgIHJldHVybiBtb2RlLmNvbXBhcmUob2xkLCBudSk7XG4gICAgICAgIH0pO1xuICAgICAgICBwcmV2aW91cyA9IE9wdGlvbi5zb21lKG51KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH07XG4gICAgICB2YXIgb25FdmVudCA9IGZ1bmN0aW9uIChldmVudCwgbW9kZSkge1xuICAgICAgICB2YXIgZGF0YU9wdGlvbiA9IG1vZGUuZXh0cmFjdChldmVudCk7XG4gICAgICAgIGRhdGFPcHRpb24uZWFjaChmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgIHZhciBvZmZzZXQgPSB1cGRhdGUobW9kZSwgZGF0YSk7XG4gICAgICAgICAgb2Zmc2V0LmVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIGV2ZW50cy50cmlnZ2VyLm1vdmUoZCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIHZhciBldmVudHMgPSBjcmVhdGUoeyBtb3ZlOiBFdmVudChbJ2luZm8nXSkgfSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBvbkV2ZW50OiBvbkV2ZW50LFxuICAgICAgICByZXNldDogcmVzZXQsXG4gICAgICAgIGV2ZW50czogZXZlbnRzLnJlZ2lzdHJ5XG4gICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIE5vRHJhZyAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBvbkV2ZW50OiBub29wLFxuICAgICAgICByZXNldDogbm9vcFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBNb3ZlbWVudCAoKSB7XG4gICAgICB2YXIgbm9EcmFnU3RhdGUgPSBOb0RyYWcoKTtcbiAgICAgIHZhciBpbkRyYWdTdGF0ZSA9IEluRHJhZygpO1xuICAgICAgdmFyIGRyYWdTdGF0ZSA9IG5vRHJhZ1N0YXRlO1xuICAgICAgdmFyIG9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkcmFnU3RhdGUucmVzZXQoKTtcbiAgICAgICAgZHJhZ1N0YXRlID0gaW5EcmFnU3RhdGU7XG4gICAgICB9O1xuICAgICAgdmFyIG9mZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZHJhZ1N0YXRlLnJlc2V0KCk7XG4gICAgICAgIGRyYWdTdGF0ZSA9IG5vRHJhZ1N0YXRlO1xuICAgICAgfTtcbiAgICAgIHZhciBvbkV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50LCBtb2RlKSB7XG4gICAgICAgIGRyYWdTdGF0ZS5vbkV2ZW50KGV2ZW50LCBtb2RlKTtcbiAgICAgIH07XG4gICAgICB2YXIgaXNPbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGRyYWdTdGF0ZSA9PT0gaW5EcmFnU3RhdGU7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgb246IG9uLFxuICAgICAgICBvZmY6IG9mZixcbiAgICAgICAgaXNPbjogaXNPbixcbiAgICAgICAgb25FdmVudDogb25FdmVudCxcbiAgICAgICAgZXZlbnRzOiBpbkRyYWdTdGF0ZS5ldmVudHNcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIHNldHVwID0gZnVuY3Rpb24gKG11dGF0aW9uLCBtb2RlLCBzZXR0aW5ncykge1xuICAgICAgdmFyIGFjdGl2ZSA9IGZhbHNlO1xuICAgICAgdmFyIGV2ZW50cyA9IGNyZWF0ZSh7XG4gICAgICAgIHN0YXJ0OiBFdmVudChbXSksXG4gICAgICAgIHN0b3A6IEV2ZW50KFtdKVxuICAgICAgfSk7XG4gICAgICB2YXIgbW92ZW1lbnQgPSBNb3ZlbWVudCgpO1xuICAgICAgdmFyIGRyb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNpbmsuc3RvcCgpO1xuICAgICAgICBpZiAobW92ZW1lbnQuaXNPbigpKSB7XG4gICAgICAgICAgbW92ZW1lbnQub2ZmKCk7XG4gICAgICAgICAgZXZlbnRzLnRyaWdnZXIuc3RvcCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdmFyIHRocm90dGxlZERyb3AgPSBsYXN0JDIoZHJvcCwgMjAwKTtcbiAgICAgIHZhciBnbyA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgc2luay5zdGFydChwYXJlbnQpO1xuICAgICAgICBtb3ZlbWVudC5vbigpO1xuICAgICAgICBldmVudHMudHJpZ2dlci5zdGFydCgpO1xuICAgICAgfTtcbiAgICAgIHZhciBtb3VzZW1vdmUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdGhyb3R0bGVkRHJvcC5jYW5jZWwoKTtcbiAgICAgICAgbW92ZW1lbnQub25FdmVudChldmVudCwgbW9kZSk7XG4gICAgICB9O1xuICAgICAgbW92ZW1lbnQuZXZlbnRzLm1vdmUuYmluZChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgbW9kZS5tdXRhdGUobXV0YXRpb24sIGV2ZW50LmluZm8oKSk7XG4gICAgICB9KTtcbiAgICAgIHZhciBvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYWN0aXZlID0gdHJ1ZTtcbiAgICAgIH07XG4gICAgICB2YXIgb2ZmID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBhY3RpdmUgPSBmYWxzZTtcbiAgICAgIH07XG4gICAgICB2YXIgcnVuSWZBY3RpdmUgPSBmdW5jdGlvbiAoZikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICAgICAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgICAgdmFyIHNpbmsgPSBtb2RlLnNpbmsoRHJhZ0FwaSh7XG4gICAgICAgIGZvcmNlRHJvcDogZHJvcCxcbiAgICAgICAgZHJvcDogcnVuSWZBY3RpdmUoZHJvcCksXG4gICAgICAgIG1vdmU6IHJ1bklmQWN0aXZlKG1vdXNlbW92ZSksXG4gICAgICAgIGRlbGF5RHJvcDogcnVuSWZBY3RpdmUodGhyb3R0bGVkRHJvcC50aHJvdHRsZSlcbiAgICAgIH0pLCBzZXR0aW5ncyk7XG4gICAgICB2YXIgZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2luay5kZXN0cm95KCk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZWxlbWVudDogc2luay5lbGVtZW50LFxuICAgICAgICBnbzogZ28sXG4gICAgICAgIG9uOiBvbixcbiAgICAgICAgb2ZmOiBvZmYsXG4gICAgICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgICAgIGV2ZW50czogZXZlbnRzLnJlZ2lzdHJ5XG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgdHJhbnNmb3JtID0gZnVuY3Rpb24gKG11dGF0aW9uLCBzZXR0aW5ncykge1xuICAgICAgaWYgKHNldHRpbmdzID09PSB2b2lkIDApIHtcbiAgICAgICAgc2V0dGluZ3MgPSB7fTtcbiAgICAgIH1cbiAgICAgIHZhciBtb2RlID0gc2V0dGluZ3MubW9kZSAhPT0gdW5kZWZpbmVkID8gc2V0dGluZ3MubW9kZSA6IE1vdXNlRHJhZztcbiAgICAgIHJldHVybiBzZXR1cChtdXRhdGlvbiwgbW9kZSwgc2V0dGluZ3MpO1xuICAgIH07XG5cbiAgICB2YXIgaXNDb250ZW50RWRpdGFibGVUcnVlID0gZnVuY3Rpb24gKGVsbSkge1xuICAgICAgcmV0dXJuIGdldCQxKGVsbSwgJ2NvbnRlbnRlZGl0YWJsZScpID09PSAndHJ1ZSc7XG4gICAgfTtcbiAgICB2YXIgZmluZENsb3Nlc3RDb250ZW50RWRpdGFibGUgPSBmdW5jdGlvbiAodGFyZ2V0LCBpc1Jvb3QpIHtcbiAgICAgIHJldHVybiBjbG9zZXN0JDEodGFyZ2V0LCAnW2NvbnRlbnRlZGl0YWJsZV0nLCBpc1Jvb3QpO1xuICAgIH07XG5cbiAgICB2YXIgc3R5bGVzJDEgPSBjc3MoJ2VwaG94LXNub29rZXInKTtcbiAgICB2YXIgcmVzb2x2ZSQxID0gc3R5bGVzJDEucmVzb2x2ZTtcblxuICAgIHZhciBNdXRhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBldmVudHMgPSBjcmVhdGUoe1xuICAgICAgICBkcmFnOiBFdmVudChbXG4gICAgICAgICAgJ3hEZWx0YScsXG4gICAgICAgICAgJ3lEZWx0YSdcbiAgICAgICAgXSlcbiAgICAgIH0pO1xuICAgICAgdmFyIG11dGF0ZSA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIGV2ZW50cy50cmlnZ2VyLmRyYWcoeCwgeSk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbXV0YXRlOiBtdXRhdGUsXG4gICAgICAgIGV2ZW50czogZXZlbnRzLnJlZ2lzdHJ5XG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgQmFyTXV0YXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgZXZlbnRzID0gY3JlYXRlKHtcbiAgICAgICAgZHJhZzogRXZlbnQoW1xuICAgICAgICAgICd4RGVsdGEnLFxuICAgICAgICAgICd5RGVsdGEnLFxuICAgICAgICAgICd0YXJnZXQnXG4gICAgICAgIF0pXG4gICAgICB9KTtcbiAgICAgIHZhciB0YXJnZXQgPSBPcHRpb24ubm9uZSgpO1xuICAgICAgdmFyIGRlbGVnYXRlID0gTXV0YXRpb24oKTtcbiAgICAgIGRlbGVnYXRlLmV2ZW50cy5kcmFnLmJpbmQoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHRhcmdldC5lYWNoKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgZXZlbnRzLnRyaWdnZXIuZHJhZyhldmVudC54RGVsdGEoKSwgZXZlbnQueURlbHRhKCksIHQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgdmFyIGFzc2lnbiA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHRhcmdldCA9IE9wdGlvbi5zb21lKHQpO1xuICAgICAgfTtcbiAgICAgIHZhciBnZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYXNzaWduOiBhc3NpZ24sXG4gICAgICAgIGdldDogZ2V0LFxuICAgICAgICBtdXRhdGU6IGRlbGVnYXRlLm11dGF0ZSxcbiAgICAgICAgZXZlbnRzOiBldmVudHMucmVnaXN0cnlcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciBjb2wgPSBmdW5jdGlvbiAoY29sdW1uLCB4LCB5LCB3LCBoKSB7XG4gICAgICB2YXIgYmFyID0gRWxlbWVudC5mcm9tVGFnKCdkaXYnKTtcbiAgICAgIHNldEFsbCQxKGJhciwge1xuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgbGVmdDogeCAtIHcgLyAyICsgJ3B4JyxcbiAgICAgICAgdG9wOiB5ICsgJ3B4JyxcbiAgICAgICAgaGVpZ2h0OiBoICsgJ3B4JyxcbiAgICAgICAgd2lkdGg6IHcgKyAncHgnXG4gICAgICB9KTtcbiAgICAgIHNldEFsbChiYXIsIHtcbiAgICAgICAgJ2RhdGEtY29sdW1uJzogY29sdW1uLFxuICAgICAgICAncm9sZSc6ICdwcmVzZW50YXRpb24nXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBiYXI7XG4gICAgfTtcbiAgICB2YXIgcm93ID0gZnVuY3Rpb24gKHIsIHgsIHksIHcsIGgpIHtcbiAgICAgIHZhciBiYXIgPSBFbGVtZW50LmZyb21UYWcoJ2RpdicpO1xuICAgICAgc2V0QWxsJDEoYmFyLCB7XG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICBsZWZ0OiB4ICsgJ3B4JyxcbiAgICAgICAgdG9wOiB5IC0gaCAvIDIgKyAncHgnLFxuICAgICAgICBoZWlnaHQ6IGggKyAncHgnLFxuICAgICAgICB3aWR0aDogdyArICdweCdcbiAgICAgIH0pO1xuICAgICAgc2V0QWxsKGJhciwge1xuICAgICAgICAnZGF0YS1yb3cnOiByLFxuICAgICAgICAncm9sZSc6ICdwcmVzZW50YXRpb24nXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBiYXI7XG4gICAgfTtcblxuICAgIHZhciByZXNpemVCYXIgPSByZXNvbHZlJDEoJ3Jlc2l6ZXItYmFyJyk7XG4gICAgdmFyIHJlc2l6ZVJvd0JhciA9IHJlc29sdmUkMSgncmVzaXplci1yb3dzJyk7XG4gICAgdmFyIHJlc2l6ZUNvbEJhciA9IHJlc29sdmUkMSgncmVzaXplci1jb2xzJyk7XG4gICAgdmFyIEJBUl9USElDS05FU1MgPSA3O1xuICAgIHZhciBkZXN0cm95ID0gZnVuY3Rpb24gKHdpcmUpIHtcbiAgICAgIHZhciBwcmV2aW91cyA9IGRlc2NlbmRhbnRzJDEod2lyZS5wYXJlbnQoKSwgJy4nICsgcmVzaXplQmFyKTtcbiAgICAgIGVhY2gocHJldmlvdXMsIHJlbW92ZSQyKTtcbiAgICB9O1xuICAgIHZhciBkcmF3QmFyID0gZnVuY3Rpb24gKHdpcmUsIHBvc2l0aW9ucywgY3JlYXRlKSB7XG4gICAgICB2YXIgb3JpZ2luID0gd2lyZS5vcmlnaW4oKTtcbiAgICAgIGVhY2gocG9zaXRpb25zLCBmdW5jdGlvbiAoY3BPcHRpb24pIHtcbiAgICAgICAgY3BPcHRpb24uZWFjaChmdW5jdGlvbiAoY3ApIHtcbiAgICAgICAgICB2YXIgYmFyID0gY3JlYXRlKG9yaWdpbiwgY3ApO1xuICAgICAgICAgIGFkZCQzKGJhciwgcmVzaXplQmFyKTtcbiAgICAgICAgICBhcHBlbmQod2lyZS5wYXJlbnQoKSwgYmFyKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciByZWZyZXNoQ29sID0gZnVuY3Rpb24gKHdpcmUsIGNvbFBvc2l0aW9ucywgcG9zaXRpb24sIHRhYmxlSGVpZ2h0KSB7XG4gICAgICBkcmF3QmFyKHdpcmUsIGNvbFBvc2l0aW9ucywgZnVuY3Rpb24gKG9yaWdpbiwgY3ApIHtcbiAgICAgICAgdmFyIGNvbEJhciA9IGNvbChjcC5jb2wsIGNwLnggLSBvcmlnaW4ubGVmdCgpLCBwb3NpdGlvbi50b3AoKSAtIG9yaWdpbi50b3AoKSwgQkFSX1RISUNLTkVTUywgdGFibGVIZWlnaHQpO1xuICAgICAgICBhZGQkMyhjb2xCYXIsIHJlc2l6ZUNvbEJhcik7XG4gICAgICAgIHJldHVybiBjb2xCYXI7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciByZWZyZXNoUm93ID0gZnVuY3Rpb24gKHdpcmUsIHJvd1Bvc2l0aW9ucywgcG9zaXRpb24sIHRhYmxlV2lkdGgpIHtcbiAgICAgIGRyYXdCYXIod2lyZSwgcm93UG9zaXRpb25zLCBmdW5jdGlvbiAob3JpZ2luLCBjcCkge1xuICAgICAgICB2YXIgcm93QmFyID0gcm93KGNwLnJvdywgcG9zaXRpb24ubGVmdCgpIC0gb3JpZ2luLmxlZnQoKSwgY3AueSAtIG9yaWdpbi50b3AoKSwgdGFibGVXaWR0aCwgQkFSX1RISUNLTkVTUyk7XG4gICAgICAgIGFkZCQzKHJvd0JhciwgcmVzaXplUm93QmFyKTtcbiAgICAgICAgcmV0dXJuIHJvd0JhcjtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHJlZnJlc2hHcmlkID0gZnVuY3Rpb24gKHdpcmUsIHRhYmxlLCByb3dzLCBjb2xzLCBoZGlyZWN0aW9uLCB2ZGlyZWN0aW9uKSB7XG4gICAgICB2YXIgcG9zaXRpb24gPSBhYnNvbHV0ZSh0YWJsZSk7XG4gICAgICB2YXIgcm93UG9zaXRpb25zID0gcm93cy5sZW5ndGggPiAwID8gaGRpcmVjdGlvbi5wb3NpdGlvbnMocm93cywgdGFibGUpIDogW107XG4gICAgICByZWZyZXNoUm93KHdpcmUsIHJvd1Bvc2l0aW9ucywgcG9zaXRpb24sIGdldE91dGVyJDEodGFibGUpKTtcbiAgICAgIHZhciBjb2xQb3NpdGlvbnMgPSBjb2xzLmxlbmd0aCA+IDAgPyB2ZGlyZWN0aW9uLnBvc2l0aW9ucyhjb2xzLCB0YWJsZSkgOiBbXTtcbiAgICAgIHJlZnJlc2hDb2wod2lyZSwgY29sUG9zaXRpb25zLCBwb3NpdGlvbiwgZ2V0T3V0ZXIodGFibGUpKTtcbiAgICB9O1xuICAgIHZhciByZWZyZXNoID0gZnVuY3Rpb24gKHdpcmUsIHRhYmxlLCBoZGlyZWN0aW9uLCB2ZGlyZWN0aW9uKSB7XG4gICAgICBkZXN0cm95KHdpcmUpO1xuICAgICAgdmFyIHdhcmVob3VzZSA9IFdhcmVob3VzZS5mcm9tVGFibGUodGFibGUpO1xuICAgICAgdmFyIHJvd3MgPSByb3dzJDEod2FyZWhvdXNlKTtcbiAgICAgIHZhciBjb2xzID0gY29sdW1ucyh3YXJlaG91c2UpO1xuICAgICAgcmVmcmVzaEdyaWQod2lyZSwgdGFibGUsIHJvd3MsIGNvbHMsIGhkaXJlY3Rpb24sIHZkaXJlY3Rpb24pO1xuICAgIH07XG4gICAgdmFyIGVhY2gkMiA9IGZ1bmN0aW9uICh3aXJlLCBmKSB7XG4gICAgICB2YXIgYmFycyA9IGRlc2NlbmRhbnRzJDEod2lyZS5wYXJlbnQoKSwgJy4nICsgcmVzaXplQmFyKTtcbiAgICAgIGVhY2goYmFycywgZik7XG4gICAgfTtcbiAgICB2YXIgaGlkZSA9IGZ1bmN0aW9uICh3aXJlKSB7XG4gICAgICBlYWNoJDIod2lyZSwgZnVuY3Rpb24gKGJhcikge1xuICAgICAgICBzZXQkMShiYXIsICdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHNob3cgPSBmdW5jdGlvbiAod2lyZSkge1xuICAgICAgZWFjaCQyKHdpcmUsIGZ1bmN0aW9uIChiYXIpIHtcbiAgICAgICAgc2V0JDEoYmFyLCAnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgaXNSb3dCYXIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIGhhcyQyKGVsZW1lbnQsIHJlc2l6ZVJvd0Jhcik7XG4gICAgfTtcbiAgICB2YXIgaXNDb2xCYXIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIGhhcyQyKGVsZW1lbnQsIHJlc2l6ZUNvbEJhcik7XG4gICAgfTtcblxuICAgIHZhciByZXNpemVCYXJEcmFnZ2luZyA9IHJlc29sdmUkMSgncmVzaXplci1iYXItZHJhZ2dpbmcnKTtcbiAgICB2YXIgQmFyTWFuYWdlciA9IGZ1bmN0aW9uICh3aXJlLCBkaXJlY3Rpb24sIGhkaXJlY3Rpb24pIHtcbiAgICAgIHZhciBtdXRhdGlvbiA9IEJhck11dGF0aW9uKCk7XG4gICAgICB2YXIgcmVzaXppbmcgPSB0cmFuc2Zvcm0obXV0YXRpb24sIHt9KTtcbiAgICAgIHZhciBob3ZlclRhYmxlID0gT3B0aW9uLm5vbmUoKTtcbiAgICAgIHZhciBnZXRSZXNpemVyID0gZnVuY3Rpb24gKGVsZW1lbnQsIHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIE9wdGlvbi5mcm9tKGdldCQxKGVsZW1lbnQsIHR5cGUpKTtcbiAgICAgIH07XG4gICAgICBtdXRhdGlvbi5ldmVudHMuZHJhZy5iaW5kKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBnZXRSZXNpemVyKGV2ZW50LnRhcmdldCgpLCAnZGF0YS1yb3cnKS5lYWNoKGZ1bmN0aW9uIChfZGF0YVJvdykge1xuICAgICAgICAgIHZhciBjdXJyZW50Um93ID0gZ2V0Q3NzVmFsdWUoZXZlbnQudGFyZ2V0KCksICd0b3AnKTtcbiAgICAgICAgICBzZXQkMShldmVudC50YXJnZXQoKSwgJ3RvcCcsIGN1cnJlbnRSb3cgKyBldmVudC55RGVsdGEoKSArICdweCcpO1xuICAgICAgICB9KTtcbiAgICAgICAgZ2V0UmVzaXplcihldmVudC50YXJnZXQoKSwgJ2RhdGEtY29sdW1uJykuZWFjaChmdW5jdGlvbiAoX2RhdGFDb2wpIHtcbiAgICAgICAgICB2YXIgY3VycmVudENvbCA9IGdldENzc1ZhbHVlKGV2ZW50LnRhcmdldCgpLCAnbGVmdCcpO1xuICAgICAgICAgIHNldCQxKGV2ZW50LnRhcmdldCgpLCAnbGVmdCcsIGN1cnJlbnRDb2wgKyBldmVudC54RGVsdGEoKSArICdweCcpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgdmFyIGdldERlbHRhID0gZnVuY3Rpb24gKHRhcmdldCwgZGlyKSB7XG4gICAgICAgIHZhciBuZXdYID0gZ2V0Q3NzVmFsdWUodGFyZ2V0LCBkaXIpO1xuICAgICAgICB2YXIgb2xkWCA9IGdldEF0dHJWYWx1ZSh0YXJnZXQsICdkYXRhLWluaXRpYWwtJyArIGRpciwgMCk7XG4gICAgICAgIHJldHVybiBuZXdYIC0gb2xkWDtcbiAgICAgIH07XG4gICAgICByZXNpemluZy5ldmVudHMuc3RvcC5iaW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbXV0YXRpb24uZ2V0KCkuZWFjaChmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgICAgaG92ZXJUYWJsZS5lYWNoKGZ1bmN0aW9uICh0YWJsZSkge1xuICAgICAgICAgICAgZ2V0UmVzaXplcih0YXJnZXQsICdkYXRhLXJvdycpLmVhY2goZnVuY3Rpb24gKHJvdykge1xuICAgICAgICAgICAgICB2YXIgZGVsdGEgPSBnZXREZWx0YSh0YXJnZXQsICd0b3AnKTtcbiAgICAgICAgICAgICAgcmVtb3ZlKHRhcmdldCwgJ2RhdGEtaW5pdGlhbC10b3AnKTtcbiAgICAgICAgICAgICAgZXZlbnRzLnRyaWdnZXIuYWRqdXN0SGVpZ2h0KHRhYmxlLCBkZWx0YSwgcGFyc2VJbnQocm93LCAxMCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBnZXRSZXNpemVyKHRhcmdldCwgJ2RhdGEtY29sdW1uJykuZWFjaChmdW5jdGlvbiAoY29sdW1uKSB7XG4gICAgICAgICAgICAgIHZhciBkZWx0YSA9IGdldERlbHRhKHRhcmdldCwgJ2xlZnQnKTtcbiAgICAgICAgICAgICAgcmVtb3ZlKHRhcmdldCwgJ2RhdGEtaW5pdGlhbC1sZWZ0Jyk7XG4gICAgICAgICAgICAgIGV2ZW50cy50cmlnZ2VyLmFkanVzdFdpZHRoKHRhYmxlLCBkZWx0YSwgcGFyc2VJbnQoY29sdW1uLCAxMCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZWZyZXNoKHdpcmUsIHRhYmxlLCBoZGlyZWN0aW9uLCBkaXJlY3Rpb24pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbiAodGFyZ2V0LCBkaXIpIHtcbiAgICAgICAgZXZlbnRzLnRyaWdnZXIuc3RhcnRBZGp1c3QoKTtcbiAgICAgICAgbXV0YXRpb24uYXNzaWduKHRhcmdldCk7XG4gICAgICAgIHNldCh0YXJnZXQsICdkYXRhLWluaXRpYWwtJyArIGRpciwgZ2V0Q3NzVmFsdWUodGFyZ2V0LCBkaXIpKTtcbiAgICAgICAgYWRkJDModGFyZ2V0LCByZXNpemVCYXJEcmFnZ2luZyk7XG4gICAgICAgIHNldCQxKHRhcmdldCwgJ29wYWNpdHknLCAnMC4yJyk7XG4gICAgICAgIHJlc2l6aW5nLmdvKHdpcmUucGFyZW50KCkpO1xuICAgICAgfTtcbiAgICAgIHZhciBtb3VzZWRvd24gPSBiaW5kJDIod2lyZS5wYXJlbnQoKSwgJ21vdXNlZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBpZiAoaXNSb3dCYXIoZXZlbnQudGFyZ2V0KCkpKSB7XG4gICAgICAgICAgaGFuZGxlcihldmVudC50YXJnZXQoKSwgJ3RvcCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0NvbEJhcihldmVudC50YXJnZXQoKSkpIHtcbiAgICAgICAgICBoYW5kbGVyKGV2ZW50LnRhcmdldCgpLCAnbGVmdCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHZhciBpc1Jvb3QgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXR1cm4gZXEoZSwgd2lyZS52aWV3KCkpO1xuICAgICAgfTtcbiAgICAgIHZhciBmaW5kQ2xvc2VzdEVkaXRhYmxlVGFibGUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiBjbG9zZXN0JDEodGFyZ2V0LCAndGFibGUnLCBpc1Jvb3QpLmZpbHRlcihmdW5jdGlvbiAodGFibGUpIHtcbiAgICAgICAgICByZXR1cm4gZmluZENsb3Nlc3RDb250ZW50RWRpdGFibGUodGFibGUsIGlzUm9vdCkuZXhpc3RzKGlzQ29udGVudEVkaXRhYmxlVHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIHZhciBtb3VzZW92ZXIgPSBiaW5kJDIod2lyZS52aWV3KCksICdtb3VzZW92ZXInLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZmluZENsb3Nlc3RFZGl0YWJsZVRhYmxlKGV2ZW50LnRhcmdldCgpKS5mb2xkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoaW5Cb2R5KGV2ZW50LnRhcmdldCgpKSkge1xuICAgICAgICAgICAgZGVzdHJveSh3aXJlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uICh0YWJsZSkge1xuICAgICAgICAgIGhvdmVyVGFibGUgPSBPcHRpb24uc29tZSh0YWJsZSk7XG4gICAgICAgICAgcmVmcmVzaCh3aXJlLCB0YWJsZSwgaGRpcmVjdGlvbiwgZGlyZWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHZhciBkZXN0cm95JDEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1vdXNlZG93bi51bmJpbmQoKTtcbiAgICAgICAgbW91c2VvdmVyLnVuYmluZCgpO1xuICAgICAgICByZXNpemluZy5kZXN0cm95KCk7XG4gICAgICAgIGRlc3Ryb3kod2lyZSk7XG4gICAgICB9O1xuICAgICAgdmFyIHJlZnJlc2gkMSA9IGZ1bmN0aW9uICh0YmwpIHtcbiAgICAgICAgcmVmcmVzaCh3aXJlLCB0YmwsIGhkaXJlY3Rpb24sIGRpcmVjdGlvbik7XG4gICAgICB9O1xuICAgICAgdmFyIGV2ZW50cyA9IGNyZWF0ZSh7XG4gICAgICAgIGFkanVzdEhlaWdodDogRXZlbnQoW1xuICAgICAgICAgICd0YWJsZScsXG4gICAgICAgICAgJ2RlbHRhJyxcbiAgICAgICAgICAncm93J1xuICAgICAgICBdKSxcbiAgICAgICAgYWRqdXN0V2lkdGg6IEV2ZW50KFtcbiAgICAgICAgICAndGFibGUnLFxuICAgICAgICAgICdkZWx0YScsXG4gICAgICAgICAgJ2NvbHVtbidcbiAgICAgICAgXSksXG4gICAgICAgIHN0YXJ0QWRqdXN0OiBFdmVudChbXSlcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGVzdHJveTogZGVzdHJveSQxLFxuICAgICAgICByZWZyZXNoOiByZWZyZXNoJDEsXG4gICAgICAgIG9uOiByZXNpemluZy5vbixcbiAgICAgICAgb2ZmOiByZXNpemluZy5vZmYsXG4gICAgICAgIGhpZGVCYXJzOiBjdXJyeShoaWRlLCB3aXJlKSxcbiAgICAgICAgc2hvd0JhcnM6IGN1cnJ5KHNob3csIHdpcmUpLFxuICAgICAgICBldmVudHM6IGV2ZW50cy5yZWdpc3RyeVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIGNyZWF0ZSQxID0gZnVuY3Rpb24gKHdpcmUsIHZkaXJlY3Rpb24sIGxhenlTaXppbmcpIHtcbiAgICAgIHZhciBoZGlyZWN0aW9uID0gaGVpZ2h0O1xuICAgICAgdmFyIG1hbmFnZXIgPSBCYXJNYW5hZ2VyKHdpcmUsIHZkaXJlY3Rpb24sIGhkaXJlY3Rpb24pO1xuICAgICAgdmFyIGV2ZW50cyA9IGNyZWF0ZSh7XG4gICAgICAgIGJlZm9yZVJlc2l6ZTogRXZlbnQoWyd0YWJsZSddKSxcbiAgICAgICAgYWZ0ZXJSZXNpemU6IEV2ZW50KFsndGFibGUnXSksXG4gICAgICAgIHN0YXJ0RHJhZzogRXZlbnQoW10pXG4gICAgICB9KTtcbiAgICAgIG1hbmFnZXIuZXZlbnRzLmFkanVzdEhlaWdodC5iaW5kKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgdGFibGUgPSBldmVudC50YWJsZSgpO1xuICAgICAgICBldmVudHMudHJpZ2dlci5iZWZvcmVSZXNpemUodGFibGUpO1xuICAgICAgICB2YXIgZGVsdGEgPSBoZGlyZWN0aW9uLmRlbHRhKGV2ZW50LmRlbHRhKCksIHRhYmxlKTtcbiAgICAgICAgYWRqdXN0SGVpZ2h0KHRhYmxlLCBkZWx0YSwgZXZlbnQucm93KCksIGhkaXJlY3Rpb24pO1xuICAgICAgICBldmVudHMudHJpZ2dlci5hZnRlclJlc2l6ZSh0YWJsZSk7XG4gICAgICB9KTtcbiAgICAgIG1hbmFnZXIuZXZlbnRzLnN0YXJ0QWRqdXN0LmJpbmQoZnVuY3Rpb24gKF9ldmVudCkge1xuICAgICAgICBldmVudHMudHJpZ2dlci5zdGFydERyYWcoKTtcbiAgICAgIH0pO1xuICAgICAgbWFuYWdlci5ldmVudHMuYWRqdXN0V2lkdGguYmluZChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIHRhYmxlID0gZXZlbnQudGFibGUoKTtcbiAgICAgICAgZXZlbnRzLnRyaWdnZXIuYmVmb3JlUmVzaXplKHRhYmxlKTtcbiAgICAgICAgdmFyIGRlbHRhID0gdmRpcmVjdGlvbi5kZWx0YShldmVudC5kZWx0YSgpLCB0YWJsZSk7XG4gICAgICAgIHZhciB0YWJsZVNpemUgPSBsYXp5U2l6aW5nKHRhYmxlKTtcbiAgICAgICAgYWRqdXN0V2lkdGgodGFibGUsIGRlbHRhLCBldmVudC5jb2x1bW4oKSwgdmRpcmVjdGlvbiwgdGFibGVTaXplKTtcbiAgICAgICAgZXZlbnRzLnRyaWdnZXIuYWZ0ZXJSZXNpemUodGFibGUpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBvbjogbWFuYWdlci5vbixcbiAgICAgICAgb2ZmOiBtYW5hZ2VyLm9mZixcbiAgICAgICAgaGlkZUJhcnM6IG1hbmFnZXIuaGlkZUJhcnMsXG4gICAgICAgIHNob3dCYXJzOiBtYW5hZ2VyLnNob3dCYXJzLFxuICAgICAgICBkZXN0cm95OiBtYW5hZ2VyLmRlc3Ryb3ksXG4gICAgICAgIGV2ZW50czogZXZlbnRzLnJlZ2lzdHJ5XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIFRhYmxlUmVzaXplID0geyBjcmVhdGU6IGNyZWF0ZSQxIH07XG5cbiAgICB2YXIgZmlyZU5ld1JvdyA9IGZ1bmN0aW9uIChlZGl0b3IsIHJvdykge1xuICAgICAgcmV0dXJuIGVkaXRvci5maXJlKCduZXdyb3cnLCB7IG5vZGU6IHJvdyB9KTtcbiAgICB9O1xuICAgIHZhciBmaXJlTmV3Q2VsbCA9IGZ1bmN0aW9uIChlZGl0b3IsIGNlbGwpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZmlyZSgnbmV3Y2VsbCcsIHsgbm9kZTogY2VsbCB9KTtcbiAgICB9O1xuICAgIHZhciBmaXJlT2JqZWN0UmVzaXplU3RhcnQgPSBmdW5jdGlvbiAoZWRpdG9yLCB0YXJnZXQsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgIGVkaXRvci5maXJlKCdPYmplY3RSZXNpemVTdGFydCcsIHtcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHRcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGZpcmVPYmplY3RSZXNpemVkID0gZnVuY3Rpb24gKGVkaXRvciwgdGFyZ2V0LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICBlZGl0b3IuZmlyZSgnT2JqZWN0UmVzaXplZCcsIHtcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHRcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGZpcmVUYWJsZVNlbGVjdGlvbkNoYW5nZSA9IGZ1bmN0aW9uIChlZGl0b3IsIGNlbGxzLCBzdGFydCwgZmluaXNoLCBvdGhlckNlbGxzKSB7XG4gICAgICBlZGl0b3IuZmlyZSgnVGFibGVTZWxlY3Rpb25DaGFuZ2UnLCB7XG4gICAgICAgIGNlbGxzOiBjZWxscyxcbiAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICBmaW5pc2g6IGZpbmlzaCxcbiAgICAgICAgb3RoZXJDZWxsczogb3RoZXJDZWxsc1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgZmlyZVRhYmxlU2VsZWN0aW9uQ2xlYXIgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBlZGl0b3IuZmlyZSgnVGFibGVTZWxlY3Rpb25DbGVhcicpO1xuICAgIH07XG5cbiAgICB2YXIgZGVmYXVsdFRhYmxlVG9vbGJhciA9ICd0YWJsZXByb3BzIHRhYmxlZGVsZXRlIHwgdGFibGVpbnNlcnRyb3diZWZvcmUgdGFibGVpbnNlcnRyb3dhZnRlciB0YWJsZWRlbGV0ZXJvdyB8IHRhYmxlaW5zZXJ0Y29sYmVmb3JlIHRhYmxlaW5zZXJ0Y29sYWZ0ZXIgdGFibGVkZWxldGVjb2wnO1xuICAgIHZhciBkZWZhdWx0U3R5bGVzID0ge1xuICAgICAgJ2JvcmRlci1jb2xsYXBzZSc6ICdjb2xsYXBzZScsXG4gICAgICAnd2lkdGgnOiAnMTAwJSdcbiAgICB9O1xuICAgIHZhciBkZXRlcm1pbmVEZWZhdWx0U3R5bGVzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgaWYgKGlzUGl4ZWxzRm9yY2VkKGVkaXRvcikpIHtcbiAgICAgICAgdmFyIGVkaXRvcldpZHRoID0gZWRpdG9yLmdldEJvZHkoKS5vZmZzZXRXaWR0aDtcbiAgICAgICAgcmV0dXJuIF9fYXNzaWduKF9fYXNzaWduKHt9LCBkZWZhdWx0U3R5bGVzKSwgeyB3aWR0aDogZWRpdG9yV2lkdGggKyAncHgnIH0pO1xuICAgICAgfSBlbHNlIGlmIChpc1Jlc3BvbnNpdmVGb3JjZWQoZWRpdG9yKSkge1xuICAgICAgICByZXR1cm4gZmlsdGVyJDEoZGVmYXVsdFN0eWxlcywgZnVuY3Rpb24gKF92YWx1ZSwga2V5KSB7XG4gICAgICAgICAgcmV0dXJuIGtleSAhPT0gJ3dpZHRoJztcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZGVmYXVsdFN0eWxlcztcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBkZWZhdWx0QXR0cmlidXRlcyA9IHsgYm9yZGVyOiAnMScgfTtcbiAgICB2YXIgZ2V0VGFibGVTaXppbmdNb2RlID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgndGFibGVfc2l6aW5nX21vZGUnLCAnYXV0bycpO1xuICAgIH07XG4gICAgdmFyIGdldFRhYmxlUmVzcG9uc2VXaWR0aCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ3RhYmxlX3Jlc3BvbnNpdmVfd2lkdGgnKTtcbiAgICB9O1xuICAgIHZhciBnZXREZWZhdWx0QXR0cmlidXRlcyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ3RhYmxlX2RlZmF1bHRfYXR0cmlidXRlcycsIGRlZmF1bHRBdHRyaWJ1dGVzLCAnb2JqZWN0Jyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0RGVmYXVsdFN0eWxlcyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ3RhYmxlX2RlZmF1bHRfc3R5bGVzJywgZGV0ZXJtaW5lRGVmYXVsdFN0eWxlcyhlZGl0b3IpLCAnb2JqZWN0Jyk7XG4gICAgfTtcbiAgICB2YXIgaGFzVGFibGVSZXNpemVCYXJzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgndGFibGVfcmVzaXplX2JhcnMnLCB0cnVlLCAnYm9vbGVhbicpO1xuICAgIH07XG4gICAgdmFyIGhhc1RhYk5hdmlnYXRpb24gPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCd0YWJsZV90YWJfbmF2aWdhdGlvbicsIHRydWUsICdib29sZWFuJyk7XG4gICAgfTtcbiAgICB2YXIgaGFzQWR2YW5jZWRDZWxsVGFiID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgndGFibGVfY2VsbF9hZHZ0YWInLCB0cnVlLCAnYm9vbGVhbicpO1xuICAgIH07XG4gICAgdmFyIGhhc0FkdmFuY2VkUm93VGFiID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgndGFibGVfcm93X2FkdnRhYicsIHRydWUsICdib29sZWFuJyk7XG4gICAgfTtcbiAgICB2YXIgaGFzQWR2YW5jZWRUYWJsZVRhYiA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ3RhYmxlX2FkdnRhYicsIHRydWUsICdib29sZWFuJyk7XG4gICAgfTtcbiAgICB2YXIgaGFzQXBwZWFyYW5jZU9wdGlvbnMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCd0YWJsZV9hcHBlYXJhbmNlX29wdGlvbnMnLCB0cnVlLCAnYm9vbGVhbicpO1xuICAgIH07XG4gICAgdmFyIGhhc1RhYmxlR3JpZCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ3RhYmxlX2dyaWQnLCB0cnVlLCAnYm9vbGVhbicpO1xuICAgIH07XG4gICAgdmFyIHNob3VsZFN0eWxlV2l0aENzcyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ3RhYmxlX3N0eWxlX2J5X2NzcycsIGZhbHNlLCAnYm9vbGVhbicpO1xuICAgIH07XG4gICAgdmFyIGdldENlbGxDbGFzc0xpc3QgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCd0YWJsZV9jZWxsX2NsYXNzX2xpc3QnLCBbXSwgJ2FycmF5Jyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0Um93Q2xhc3NMaXN0ID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgndGFibGVfcm93X2NsYXNzX2xpc3QnLCBbXSwgJ2FycmF5Jyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0VGFibGVDbGFzc0xpc3QgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCd0YWJsZV9jbGFzc19saXN0JywgW10sICdhcnJheScpO1xuICAgIH07XG4gICAgdmFyIGlzUGVyY2VudGFnZXNGb3JjZWQgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZ2V0VGFibGVTaXppbmdNb2RlKGVkaXRvcikgPT09ICdyZWxhdGl2ZScgfHwgZ2V0VGFibGVSZXNwb25zZVdpZHRoKGVkaXRvcikgPT09IHRydWU7XG4gICAgfTtcbiAgICB2YXIgaXNQaXhlbHNGb3JjZWQgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZ2V0VGFibGVTaXppbmdNb2RlKGVkaXRvcikgPT09ICdmaXhlZCcgfHwgZ2V0VGFibGVSZXNwb25zZVdpZHRoKGVkaXRvcikgPT09IGZhbHNlO1xuICAgIH07XG4gICAgdmFyIGlzUmVzcG9uc2l2ZUZvcmNlZCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBnZXRUYWJsZVNpemluZ01vZGUoZWRpdG9yKSA9PT0gJ3Jlc3BvbnNpdmUnO1xuICAgIH07XG4gICAgdmFyIGdldFRvb2xiYXIgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCd0YWJsZV90b29sYmFyJywgZGVmYXVsdFRhYmxlVG9vbGJhcik7XG4gICAgfTtcbiAgICB2YXIgZ2V0VGFibGVIZWFkZXJUeXBlID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGRlZmF1bHRWYWx1ZSA9ICdzZWN0aW9uJztcbiAgICAgIHZhciB2YWx1ZSA9IGVkaXRvci5nZXRQYXJhbSgndGFibGVfaGVhZGVyX3R5cGUnLCBkZWZhdWx0VmFsdWUsICdzdHJpbmcnKTtcbiAgICAgIHZhciB2YWxpZFZhbHVlcyA9IFtcbiAgICAgICAgJ3NlY3Rpb24nLFxuICAgICAgICAnY2VsbHMnLFxuICAgICAgICAnc2VjdGlvbkNlbGxzJyxcbiAgICAgICAgJ2F1dG8nXG4gICAgICBdO1xuICAgICAgaWYgKCFjb250YWlucyh2YWxpZFZhbHVlcywgdmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgZ2V0Q2xvbmVFbGVtZW50cyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBjbG9uZUVsZW1lbnRzID0gZWRpdG9yLmdldFBhcmFtKCd0YWJsZV9jbG9uZV9lbGVtZW50cycpO1xuICAgICAgaWYgKGlzU3RyaW5nKGNsb25lRWxlbWVudHMpKSB7XG4gICAgICAgIHJldHVybiBPcHRpb24uc29tZShjbG9uZUVsZW1lbnRzLnNwbGl0KC9bICxdLykpO1xuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNsb25lRWxlbWVudHMpKSB7XG4gICAgICAgIHJldHVybiBPcHRpb24uc29tZShjbG9uZUVsZW1lbnRzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGhhc09iamVjdFJlc2l6aW5nID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIG9iamVjdFJlc2l6aW5nID0gZWRpdG9yLmdldFBhcmFtKCdvYmplY3RfcmVzaXppbmcnLCB0cnVlKTtcbiAgICAgIHJldHVybiBpc1N0cmluZyhvYmplY3RSZXNpemluZykgPyBvYmplY3RSZXNpemluZyA9PT0gJ3RhYmxlJyA6IG9iamVjdFJlc2l6aW5nO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0Tm9kZU5hbWUgPSBmdW5jdGlvbiAoZWxtKSB7XG4gICAgICByZXR1cm4gZWxtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgfTtcbiAgICB2YXIgZ2V0Qm9keSQxID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIEVsZW1lbnQuZnJvbURvbShlZGl0b3IuZ2V0Qm9keSgpKTtcbiAgICB9O1xuICAgIHZhciBnZXRQaXhlbFdpZHRoJDEgPSBmdW5jdGlvbiAoZWxtKSB7XG4gICAgICByZXR1cm4gZWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgIH07XG4gICAgdmFyIGdldFBpeGVsSGVpZ2h0ID0gZnVuY3Rpb24gKGVsbSkge1xuICAgICAgcmV0dXJuIGVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgfTtcbiAgICB2YXIgZ2V0SXNSb290ID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlcShlbGVtZW50LCBnZXRCb2R5JDEoZWRpdG9yKSk7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHJlbW92ZVB4U3VmZml4ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgICAgIHJldHVybiBzaXplID8gc2l6ZS5yZXBsYWNlKC9weCQvLCAnJykgOiAnJztcbiAgICB9O1xuICAgIHZhciBhZGRQeFN1ZmZpeCA9IGZ1bmN0aW9uIChzaXplKSB7XG4gICAgICByZXR1cm4gL15cXGQrKFxcLlxcZCspPyQvLnRlc3Qoc2l6ZSkgPyBzaXplICsgJ3B4JyA6IHNpemU7XG4gICAgfTtcbiAgICB2YXIgcmVtb3ZlRGF0YVN0eWxlID0gZnVuY3Rpb24gKHRhYmxlKSB7XG4gICAgICByZW1vdmUodGFibGUsICdkYXRhLW1jZS1zdHlsZScpO1xuICAgICAgZWFjaChjZWxscyh0YWJsZSksIGZ1bmN0aW9uIChjZWxsKSB7XG4gICAgICAgIHJldHVybiByZW1vdmUoY2VsbCwgJ2RhdGEtbWNlLXN0eWxlJyk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBnZXRSYXdXaWR0aCQxID0gZnVuY3Rpb24gKGVkaXRvciwgZWxtKSB7XG4gICAgICB2YXIgcmF3ID0gZWRpdG9yLmRvbS5nZXRTdHlsZShlbG0sICd3aWR0aCcpIHx8IGVkaXRvci5kb20uZ2V0QXR0cmliKGVsbSwgJ3dpZHRoJyk7XG4gICAgICByZXR1cm4gT3B0aW9uLmZyb20ocmF3KS5maWx0ZXIoaXNOb3RFbXB0eSk7XG4gICAgfTtcbiAgICB2YXIgaXNQZXJjZW50YWdlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gL14oXFxkKyhcXC5cXGQrKT8pJSQvLnRlc3QodmFsdWUpO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0RGlyZWN0aW9uID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBnZXQkMihlbGVtZW50LCAnZGlyZWN0aW9uJykgPT09ICdydGwnID8gJ3J0bCcgOiAnbHRyJztcbiAgICB9O1xuXG4gICAgdmFyIGx0ciQxID0geyBpc1J0bDogY29uc3RhbnQoZmFsc2UpIH07XG4gICAgdmFyIHJ0bCQxID0geyBpc1J0bDogY29uc3RhbnQodHJ1ZSkgfTtcbiAgICB2YXIgZGlyZWN0aW9uQXQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgdmFyIGRpciA9IGdldERpcmVjdGlvbihlbGVtZW50KTtcbiAgICAgIHJldHVybiBkaXIgPT09ICdydGwnID8gcnRsJDEgOiBsdHIkMTtcbiAgICB9O1xuXG4gICAgdmFyIENlbGwgPSBmdW5jdGlvbiAoaW5pdGlhbCkge1xuICAgICAgdmFyIHZhbHVlID0gaW5pdGlhbDtcbiAgICAgIHZhciBnZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG4gICAgICB2YXIgc2V0ID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdmFsdWUgPSB2O1xuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdldDogZ2V0LFxuICAgICAgICBzZXQ6IHNldFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIG5vbmVTaXplID0gZnVuY3Rpb24gKHRhYmxlKSB7XG4gICAgICB2YXIgZ2V0V2lkdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBnZXQkNSh0YWJsZSk7XG4gICAgICB9O1xuICAgICAgdmFyIHplcm8gPSBjb25zdGFudCgwKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdpZHRoOiBnZXRXaWR0aCxcbiAgICAgICAgcGl4ZWxXaWR0aDogZ2V0V2lkdGgsXG4gICAgICAgIGdldFdpZHRoczogZ2V0UGl4ZWxXaWR0aHMsXG4gICAgICAgIGdldENlbGxEZWx0YTogemVybyxcbiAgICAgICAgc2luZ2xlQ29sdW1uV2lkdGg6IGNvbnN0YW50KFswXSksXG4gICAgICAgIG1pbkNlbGxXaWR0aDogemVybyxcbiAgICAgICAgc2V0RWxlbWVudFdpZHRoOiBub29wLFxuICAgICAgICBhZGp1c3RUYWJsZVdpZHRoOiBub29wLFxuICAgICAgICBsYWJlbDogJ25vbmUnXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHBlcmNlbnRhZ2VTaXplID0gZnVuY3Rpb24gKGluaXRpYWxXaWR0aCwgdGFibGUpIHtcbiAgICAgIHZhciBmbG9hdFdpZHRoID0gQ2VsbChwYXJzZUZsb2F0KGluaXRpYWxXaWR0aCkpO1xuICAgICAgdmFyIHBpeGVsV2lkdGggPSBDZWxsKGdldCQ1KHRhYmxlKSk7XG4gICAgICB2YXIgZ2V0Q2VsbERlbHRhID0gZnVuY3Rpb24gKGRlbHRhKSB7XG4gICAgICAgIHJldHVybiBkZWx0YSAvIHBpeGVsV2lkdGguZ2V0KCkgKiAxMDA7XG4gICAgICB9O1xuICAgICAgdmFyIHNpbmdsZUNvbHVtbldpZHRoID0gZnVuY3Rpb24gKHcsIF9kZWx0YSkge1xuICAgICAgICByZXR1cm4gWzEwMCAtIHddO1xuICAgICAgfTtcbiAgICAgIHZhciBtaW5DZWxsV2lkdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBtaW5XaWR0aCgpIC8gcGl4ZWxXaWR0aC5nZXQoKSAqIDEwMDtcbiAgICAgIH07XG4gICAgICB2YXIgYWRqdXN0VGFibGVXaWR0aCA9IGZ1bmN0aW9uIChkZWx0YSkge1xuICAgICAgICB2YXIgY3VycmVudFdpZHRoID0gZmxvYXRXaWR0aC5nZXQoKTtcbiAgICAgICAgdmFyIGNoYW5nZSA9IGRlbHRhIC8gMTAwICogY3VycmVudFdpZHRoO1xuICAgICAgICB2YXIgbmV3V2lkdGggPSBjdXJyZW50V2lkdGggKyBjaGFuZ2U7XG4gICAgICAgIHNldFBlcmNlbnRhZ2VXaWR0aCh0YWJsZSwgbmV3V2lkdGgpO1xuICAgICAgICBmbG9hdFdpZHRoLnNldChuZXdXaWR0aCk7XG4gICAgICAgIHBpeGVsV2lkdGguc2V0KGdldCQ1KHRhYmxlKSk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd2lkdGg6IGZsb2F0V2lkdGguZ2V0LFxuICAgICAgICBwaXhlbFdpZHRoOiBwaXhlbFdpZHRoLmdldCxcbiAgICAgICAgZ2V0V2lkdGhzOiBnZXRQZXJjZW50YWdlV2lkdGhzLFxuICAgICAgICBnZXRDZWxsRGVsdGE6IGdldENlbGxEZWx0YSxcbiAgICAgICAgc2luZ2xlQ29sdW1uV2lkdGg6IHNpbmdsZUNvbHVtbldpZHRoLFxuICAgICAgICBtaW5DZWxsV2lkdGg6IG1pbkNlbGxXaWR0aCxcbiAgICAgICAgc2V0RWxlbWVudFdpZHRoOiBzZXRQZXJjZW50YWdlV2lkdGgsXG4gICAgICAgIGFkanVzdFRhYmxlV2lkdGg6IGFkanVzdFRhYmxlV2lkdGgsXG4gICAgICAgIGxhYmVsOiAncGVyY2VudCdcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgcGl4ZWxTaXplID0gZnVuY3Rpb24gKGluaXRpYWxXaWR0aCwgdGFibGUpIHtcbiAgICAgIHZhciB3aWR0aCA9IENlbGwoaW5pdGlhbFdpZHRoKTtcbiAgICAgIHZhciBnZXRXaWR0aCA9IHdpZHRoLmdldDtcbiAgICAgIHZhciBnZXRDZWxsRGVsdGEgPSBpZGVudGl0eTtcbiAgICAgIHZhciBzaW5nbGVDb2x1bW5XaWR0aCA9IGZ1bmN0aW9uICh3LCBkZWx0YSkge1xuICAgICAgICB2YXIgbmV3TmV4dCA9IE1hdGgubWF4KG1pbldpZHRoKCksIHcgKyBkZWx0YSk7XG4gICAgICAgIHJldHVybiBbbmV3TmV4dCAtIHddO1xuICAgICAgfTtcbiAgICAgIHZhciBhZGp1c3RUYWJsZVdpZHRoID0gZnVuY3Rpb24gKGRlbHRhKSB7XG4gICAgICAgIHZhciBuZXdXaWR0aCA9IGdldFdpZHRoKCkgKyBkZWx0YTtcbiAgICAgICAgc2V0UGl4ZWxXaWR0aCh0YWJsZSwgbmV3V2lkdGgpO1xuICAgICAgICB3aWR0aC5zZXQobmV3V2lkdGgpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdpZHRoOiBnZXRXaWR0aCxcbiAgICAgICAgcGl4ZWxXaWR0aDogZ2V0V2lkdGgsXG4gICAgICAgIGdldFdpZHRoczogZ2V0UGl4ZWxXaWR0aHMsXG4gICAgICAgIGdldENlbGxEZWx0YTogZ2V0Q2VsbERlbHRhLFxuICAgICAgICBzaW5nbGVDb2x1bW5XaWR0aDogc2luZ2xlQ29sdW1uV2lkdGgsXG4gICAgICAgIG1pbkNlbGxXaWR0aDogbWluV2lkdGgsXG4gICAgICAgIHNldEVsZW1lbnRXaWR0aDogc2V0UGl4ZWxXaWR0aCxcbiAgICAgICAgYWRqdXN0VGFibGVXaWR0aDogYWRqdXN0VGFibGVXaWR0aCxcbiAgICAgICAgbGFiZWw6ICdwaXhlbCdcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgY2hvb3NlU2l6ZSA9IGZ1bmN0aW9uIChlbGVtZW50LCB3aWR0aCkge1xuICAgICAgdmFyIHBlcmNlbnRNYXRjaCA9IHBlcmNlbnRhZ2VCYXNlZFNpemVSZWdleCgpLmV4ZWMod2lkdGgpO1xuICAgICAgaWYgKHBlcmNlbnRNYXRjaCAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gcGVyY2VudGFnZVNpemUocGVyY2VudE1hdGNoWzFdLCBlbGVtZW50KTtcbiAgICAgIH1cbiAgICAgIHZhciBwaXhlbE1hdGNoID0gcGl4ZWxCYXNlZFNpemVSZWdleCgpLmV4ZWMod2lkdGgpO1xuICAgICAgaWYgKHBpeGVsTWF0Y2ggIT09IG51bGwpIHtcbiAgICAgICAgdmFyIGludFdpZHRoID0gcGFyc2VJbnQocGl4ZWxNYXRjaFsxXSwgMTApO1xuICAgICAgICByZXR1cm4gcGl4ZWxTaXplKGludFdpZHRoLCBlbGVtZW50KTtcbiAgICAgIH1cbiAgICAgIHZhciBmYWxsYmFja1dpZHRoID0gZ2V0JDUoZWxlbWVudCk7XG4gICAgICByZXR1cm4gcGl4ZWxTaXplKGZhbGxiYWNrV2lkdGgsIGVsZW1lbnQpO1xuICAgIH07XG4gICAgdmFyIGdldFRhYmxlU2l6ZSA9IGZ1bmN0aW9uICh0YWJsZSkge1xuICAgICAgdmFyIHdpZHRoID0gZ2V0UmF3V2lkdGgodGFibGUpO1xuICAgICAgcmV0dXJuIHdpZHRoLmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbm9uZVNpemUodGFibGUpO1xuICAgICAgfSwgZnVuY3Rpb24gKHcpIHtcbiAgICAgICAgcmV0dXJuIGNob29zZVNpemUodGFibGUsIHcpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgVGFibGVTaXplID0ge1xuICAgICAgZ2V0VGFibGVTaXplOiBnZXRUYWJsZVNpemUsXG4gICAgICBwaXhlbFNpemU6IHBpeGVsU2l6ZSxcbiAgICAgIHBlcmNlbnRhZ2VTaXplOiBwZXJjZW50YWdlU2l6ZSxcbiAgICAgIG5vbmVTaXplOiBub25lU2l6ZVxuICAgIH07XG5cbiAgICB2YXIgZ2V0JDggPSBmdW5jdGlvbiAoZWRpdG9yLCB0YWJsZSkge1xuICAgICAgaWYgKGlzUGVyY2VudGFnZXNGb3JjZWQoZWRpdG9yKSkge1xuICAgICAgICB2YXIgd2lkdGggPSBnZXRSYXdXaWR0aCQxKGVkaXRvciwgdGFibGUuZG9tKCkpLmZpbHRlcihpc1BlcmNlbnRhZ2UpLmdldE9yVGh1bmsoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBnZXRQZXJjZW50VGFibGVXaWR0aCQxKHRhYmxlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBUYWJsZVNpemUucGVyY2VudGFnZVNpemUod2lkdGgsIHRhYmxlKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNQaXhlbHNGb3JjZWQoZWRpdG9yKSkge1xuICAgICAgICByZXR1cm4gVGFibGVTaXplLnBpeGVsU2l6ZShnZXQkNSh0YWJsZSksIHRhYmxlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBUYWJsZVNpemUuZ2V0VGFibGVTaXplKHRhYmxlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGNsZWFudXBMZWdhY3lBdHRyaWJ1dGVzID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHJlbW92ZShlbGVtZW50LCAnd2lkdGgnKTtcbiAgICB9O1xuICAgIHZhciBjb252ZXJ0VG9QZXJjZW50U2l6ZSA9IGZ1bmN0aW9uICh0YWJsZSwgZGlyZWN0aW9uLCB0YWJsZVNpemUpIHtcbiAgICAgIHZhciBuZXdXaWR0aCA9IGdldFBlcmNlbnRUYWJsZVdpZHRoKHRhYmxlKTtcbiAgICAgIHJlZGlzdHJpYnV0ZSQxKHRhYmxlLCBPcHRpb24uc29tZShuZXdXaWR0aCksIE9wdGlvbi5ub25lKCksIGRpcmVjdGlvbiwgdGFibGVTaXplKTtcbiAgICAgIGNsZWFudXBMZWdhY3lBdHRyaWJ1dGVzKHRhYmxlKTtcbiAgICB9O1xuICAgIHZhciBjb252ZXJ0VG9QaXhlbFNpemUgPSBmdW5jdGlvbiAodGFibGUsIGRpcmVjdGlvbiwgdGFibGVTaXplKSB7XG4gICAgICB2YXIgbmV3V2lkdGggPSBnZXRQaXhlbFRhYmxlV2lkdGgodGFibGUpO1xuICAgICAgcmVkaXN0cmlidXRlJDEodGFibGUsIE9wdGlvbi5zb21lKG5ld1dpZHRoKSwgT3B0aW9uLm5vbmUoKSwgZGlyZWN0aW9uLCB0YWJsZVNpemUpO1xuICAgICAgY2xlYW51cExlZ2FjeUF0dHJpYnV0ZXModGFibGUpO1xuICAgIH07XG4gICAgdmFyIGNvbnZlcnRUb05vbmVTaXplID0gZnVuY3Rpb24gKHRhYmxlKSB7XG4gICAgICByZW1vdmUkMSh0YWJsZSwgJ3dpZHRoJyk7XG4gICAgICBlYWNoKGNlbGxzKHRhYmxlKSwgZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgICAgcmVtb3ZlJDEoY2VsbCwgJ3dpZHRoJyk7XG4gICAgICAgIGNsZWFudXBMZWdhY3lBdHRyaWJ1dGVzKGNlbGwpO1xuICAgICAgfSk7XG4gICAgICBjbGVhbnVwTGVnYWN5QXR0cmlidXRlcyh0YWJsZSk7XG4gICAgfTtcblxuICAgIHZhciBlbmZvcmNlUGVyY2VudGFnZSA9IGZ1bmN0aW9uIChlZGl0b3IsIHRhYmxlKSB7XG4gICAgICB2YXIgZGlyZWN0aW9uID0gVGFibGVEaXJlY3Rpb24oZGlyZWN0aW9uQXQpO1xuICAgICAgdmFyIHRhYmxlU2l6aW5nID0gZ2V0JDgoZWRpdG9yLCB0YWJsZSk7XG4gICAgICBjb252ZXJ0VG9QZXJjZW50U2l6ZSh0YWJsZSwgZGlyZWN0aW9uLCB0YWJsZVNpemluZyk7XG4gICAgfTtcbiAgICB2YXIgZW5mb3JjZVBpeGVscyA9IGZ1bmN0aW9uIChlZGl0b3IsIHRhYmxlKSB7XG4gICAgICB2YXIgZGlyZWN0aW9uID0gVGFibGVEaXJlY3Rpb24oZGlyZWN0aW9uQXQpO1xuICAgICAgdmFyIHRhYmxlU2l6aW5nID0gZ2V0JDgoZWRpdG9yLCB0YWJsZSk7XG4gICAgICBjb252ZXJ0VG9QaXhlbFNpemUodGFibGUsIGRpcmVjdGlvbiwgdGFibGVTaXppbmcpO1xuICAgIH07XG4gICAgdmFyIGVuZm9yY2VOb25lID0gY29udmVydFRvTm9uZVNpemU7XG4gICAgdmFyIHN5bmNQaXhlbHMgPSBmdW5jdGlvbiAodGFibGUpIHtcbiAgICAgIGVhY2goY2VsbHModGFibGUpLCBmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICB2YXIgY29tcHV0ZWRXaWR0aCA9IGdldCQyKGNlbGwsICd3aWR0aCcpO1xuICAgICAgICBzZXQkMShjZWxsLCAnd2lkdGgnLCBjb21wdXRlZFdpZHRoKTtcbiAgICAgICAgcmVtb3ZlKGNlbGwsICd3aWR0aCcpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBjcmVhdGVDb250YWluZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY29udGFpbmVyID0gRWxlbWVudC5mcm9tVGFnKCdkaXYnKTtcbiAgICAgIHNldEFsbCQxKGNvbnRhaW5lciwge1xuICAgICAgICBwb3NpdGlvbjogJ3N0YXRpYycsXG4gICAgICAgIGhlaWdodDogJzAnLFxuICAgICAgICB3aWR0aDogJzAnLFxuICAgICAgICBwYWRkaW5nOiAnMCcsXG4gICAgICAgIG1hcmdpbjogJzAnLFxuICAgICAgICBib3JkZXI6ICcwJ1xuICAgICAgfSk7XG4gICAgICBhcHBlbmQoYm9keSgpLCBjb250YWluZXIpO1xuICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9O1xuICAgIHZhciBnZXQkOSA9IGZ1bmN0aW9uIChlZGl0b3IsIF9jb250YWluZXIpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuaW5saW5lID8gUmVzaXplV2lyZS5ib2R5KGdldEJvZHkkMShlZGl0b3IpLCBjcmVhdGVDb250YWluZXIoKSkgOiBSZXNpemVXaXJlLm9ubHkoRWxlbWVudC5mcm9tRG9tKGVkaXRvci5nZXREb2MoKSkpO1xuICAgIH07XG4gICAgdmFyIHJlbW92ZSQ2ID0gZnVuY3Rpb24gKGVkaXRvciwgd2lyZSkge1xuICAgICAgaWYgKGVkaXRvci5pbmxpbmUpIHtcbiAgICAgICAgcmVtb3ZlJDIod2lyZS5wYXJlbnQoKSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBnZXRSZXNpemVIYW5kbGVyID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIHNlbGVjdGlvblJuZyA9IE9wdGlvbi5ub25lKCk7XG4gICAgICB2YXIgcmVzaXplID0gT3B0aW9uLm5vbmUoKTtcbiAgICAgIHZhciB3aXJlID0gT3B0aW9uLm5vbmUoKTtcbiAgICAgIHZhciBzdGFydFc7XG4gICAgICB2YXIgc3RhcnRSYXdXO1xuICAgICAgdmFyIGlzVGFibGUgPSBmdW5jdGlvbiAoZWxtKSB7XG4gICAgICAgIHJldHVybiBlbG0ubm9kZU5hbWUgPT09ICdUQUJMRSc7XG4gICAgICB9O1xuICAgICAgdmFyIGxhenlSZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByZXNpemU7XG4gICAgICB9O1xuICAgICAgdmFyIGxhenlXaXJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gd2lyZS5nZXRPcihSZXNpemVXaXJlLm9ubHkoRWxlbWVudC5mcm9tRG9tKGVkaXRvci5nZXRCb2R5KCkpKSk7XG4gICAgICB9O1xuICAgICAgdmFyIGRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlc2l6ZS5lYWNoKGZ1bmN0aW9uIChzeikge1xuICAgICAgICAgIHN6LmRlc3Ryb3koKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHdpcmUuZWFjaChmdW5jdGlvbiAodykge1xuICAgICAgICAgIHJlbW92ZSQ2KGVkaXRvciwgdyk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIGVkaXRvci5vbignaW5pdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IFRhYmxlRGlyZWN0aW9uKGRpcmVjdGlvbkF0KTtcbiAgICAgICAgdmFyIHJhd1dpcmUgPSBnZXQkOShlZGl0b3IpO1xuICAgICAgICB3aXJlID0gT3B0aW9uLnNvbWUocmF3V2lyZSk7XG4gICAgICAgIGlmIChoYXNPYmplY3RSZXNpemluZyhlZGl0b3IpICYmIGhhc1RhYmxlUmVzaXplQmFycyhlZGl0b3IpKSB7XG4gICAgICAgICAgdmFyIGxhenlTaXppbmcgPSBmdW5jdGlvbiAodGFibGUpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXQkOChlZGl0b3IsIHRhYmxlKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHZhciBzeiA9IFRhYmxlUmVzaXplLmNyZWF0ZShyYXdXaXJlLCBkaXJlY3Rpb24sIGxhenlTaXppbmcpO1xuICAgICAgICAgIHN6Lm9uKCk7XG4gICAgICAgICAgc3ouZXZlbnRzLnN0YXJ0RHJhZy5iaW5kKGZ1bmN0aW9uIChfZXZlbnQpIHtcbiAgICAgICAgICAgIHNlbGVjdGlvblJuZyA9IE9wdGlvbi5zb21lKGVkaXRvci5zZWxlY3Rpb24uZ2V0Um5nKCkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHN6LmV2ZW50cy5iZWZvcmVSZXNpemUuYmluZChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciByYXdUYWJsZSA9IGV2ZW50LnRhYmxlKCkuZG9tKCk7XG4gICAgICAgICAgICBmaXJlT2JqZWN0UmVzaXplU3RhcnQoZWRpdG9yLCByYXdUYWJsZSwgZ2V0UGl4ZWxXaWR0aCQxKHJhd1RhYmxlKSwgZ2V0UGl4ZWxIZWlnaHQocmF3VGFibGUpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzei5ldmVudHMuYWZ0ZXJSZXNpemUuYmluZChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciB0YWJsZSA9IGV2ZW50LnRhYmxlKCk7XG4gICAgICAgICAgICB2YXIgcmF3VGFibGUgPSB0YWJsZS5kb20oKTtcbiAgICAgICAgICAgIHJlbW92ZURhdGFTdHlsZSh0YWJsZSk7XG4gICAgICAgICAgICBzZWxlY3Rpb25SbmcuZWFjaChmdW5jdGlvbiAocm5nKSB7XG4gICAgICAgICAgICAgIGVkaXRvci5zZWxlY3Rpb24uc2V0Um5nKHJuZyk7XG4gICAgICAgICAgICAgIGVkaXRvci5mb2N1cygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmaXJlT2JqZWN0UmVzaXplZChlZGl0b3IsIHJhd1RhYmxlLCBnZXRQaXhlbFdpZHRoJDEocmF3VGFibGUpLCBnZXRQaXhlbEhlaWdodChyYXdUYWJsZSkpO1xuICAgICAgICAgICAgZWRpdG9yLnVuZG9NYW5hZ2VyLmFkZCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJlc2l6ZSA9IE9wdGlvbi5zb21lKHN6KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBlZGl0b3Iub24oJ09iamVjdFJlc2l6ZVN0YXJ0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIHRhcmdldEVsbSA9IGUudGFyZ2V0O1xuICAgICAgICBpZiAoaXNUYWJsZSh0YXJnZXRFbG0pKSB7XG4gICAgICAgICAgdmFyIHRhYmxlID0gRWxlbWVudC5mcm9tRG9tKHRhcmdldEVsbSk7XG4gICAgICAgICAgaWYgKCFpc1BpeGVsU2l6aW5nJDEodGFibGUpICYmIGlzUGl4ZWxzRm9yY2VkKGVkaXRvcikpIHtcbiAgICAgICAgICAgIGVuZm9yY2VQaXhlbHMoZWRpdG9yLCB0YWJsZSk7XG4gICAgICAgICAgfSBlbHNlIGlmICghaXNQZXJjZW50U2l6aW5nJDEodGFibGUpICYmIGlzUGVyY2VudGFnZXNGb3JjZWQoZWRpdG9yKSkge1xuICAgICAgICAgICAgZW5mb3JjZVBlcmNlbnRhZ2UoZWRpdG9yLCB0YWJsZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0YXJ0VyA9IGUud2lkdGg7XG4gICAgICAgICAgc3RhcnRSYXdXID0gZ2V0UmF3V2lkdGgkMShlZGl0b3IsIHRhcmdldEVsbSkuZ2V0T3IoJycpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci5vbignT2JqZWN0UmVzaXplZCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciB0YXJnZXRFbG0gPSBlLnRhcmdldDtcbiAgICAgICAgaWYgKGlzVGFibGUodGFyZ2V0RWxtKSkge1xuICAgICAgICAgIHZhciB0YWJsZSA9IEVsZW1lbnQuZnJvbURvbSh0YXJnZXRFbG0pO1xuICAgICAgICAgIGlmIChzdGFydFJhd1cgPT09ICcnIHx8ICFpc1BlcmNlbnRhZ2Uoc3RhcnRSYXdXKSAmJiBpc1Jlc3BvbnNpdmVGb3JjZWQoZWRpdG9yKSkge1xuICAgICAgICAgICAgZW5mb3JjZVBlcmNlbnRhZ2UoZWRpdG9yLCB0YWJsZSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpc1BlcmNlbnRhZ2Uoc3RhcnRSYXdXKSkge1xuICAgICAgICAgICAgdmFyIHBlcmNlbnRXID0gcGFyc2VGbG9hdChzdGFydFJhd1cucmVwbGFjZSgnJScsICcnKSk7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0UGVyY2VudFcgPSBlLndpZHRoICogcGVyY2VudFcgLyBzdGFydFc7XG4gICAgICAgICAgICBzZXQkMSh0YWJsZSwgJ3dpZHRoJywgdGFyZ2V0UGVyY2VudFcgKyAnJScpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzeW5jUGl4ZWxzKHRhYmxlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVtb3ZlRGF0YVN0eWxlKHRhYmxlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBlZGl0b3Iub24oJ1N3aXRjaE1vZGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxhenlSZXNpemUoKS5lYWNoKGZ1bmN0aW9uIChyZXNpemUpIHtcbiAgICAgICAgICBpZiAoZWRpdG9yLm1vZGUuaXNSZWFkT25seSgpKSB7XG4gICAgICAgICAgICByZXNpemUuaGlkZUJhcnMoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzaXplLnNob3dCYXJzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGF6eVJlc2l6ZTogbGF6eVJlc2l6ZSxcbiAgICAgICAgbGF6eVdpcmU6IGxhenlXaXJlLFxuICAgICAgICBkZXN0cm95OiBkZXN0cm95XG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgcG9pbnQgPSBmdW5jdGlvbiAoZWxlbWVudCwgb2Zmc2V0KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBlbGVtZW50OiBjb25zdGFudChlbGVtZW50KSxcbiAgICAgICAgb2Zmc2V0OiBjb25zdGFudChvZmZzZXQpXG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgc2NhbiA9IGZ1bmN0aW9uICh1bml2ZXJzZSwgZWxlbWVudCwgZGlyZWN0aW9uKSB7XG4gICAgICBpZiAodW5pdmVyc2UucHJvcGVydHkoKS5pc1RleHQoZWxlbWVudCkgJiYgdW5pdmVyc2UucHJvcGVydHkoKS5nZXRUZXh0KGVsZW1lbnQpLnRyaW0oKS5sZW5ndGggPT09IDAgfHwgdW5pdmVyc2UucHJvcGVydHkoKS5pc0NvbW1lbnQoZWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuIGRpcmVjdGlvbihlbGVtZW50KS5iaW5kKGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgICAgcmV0dXJuIHNjYW4odW5pdmVyc2UsIGVsZW0sIGRpcmVjdGlvbikub3JUaHVuayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gT3B0aW9uLnNvbWUoZWxlbSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE9wdGlvbi5ub25lKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgdG9FbmQgPSBmdW5jdGlvbiAodW5pdmVyc2UsIGVsZW1lbnQpIHtcbiAgICAgIGlmICh1bml2ZXJzZS5wcm9wZXJ0eSgpLmlzVGV4dChlbGVtZW50KSkge1xuICAgICAgICByZXR1cm4gdW5pdmVyc2UucHJvcGVydHkoKS5nZXRUZXh0KGVsZW1lbnQpLmxlbmd0aDtcbiAgICAgIH1cbiAgICAgIHZhciBjaGlsZHJlbiA9IHVuaXZlcnNlLnByb3BlcnR5KCkuY2hpbGRyZW4oZWxlbWVudCk7XG4gICAgICByZXR1cm4gY2hpbGRyZW4ubGVuZ3RoO1xuICAgIH07XG4gICAgdmFyIGZyZWVmYWxsUnRsID0gZnVuY3Rpb24gKHVuaXZlcnNlLCBlbGVtZW50KSB7XG4gICAgICB2YXIgY2FuZGlkYXRlID0gc2Nhbih1bml2ZXJzZSwgZWxlbWVudCwgdW5pdmVyc2UucXVlcnkoKS5wcmV2U2libGluZykuZ2V0T3IoZWxlbWVudCk7XG4gICAgICBpZiAodW5pdmVyc2UucHJvcGVydHkoKS5pc1RleHQoY2FuZGlkYXRlKSkge1xuICAgICAgICByZXR1cm4gcG9pbnQoY2FuZGlkYXRlLCB0b0VuZCh1bml2ZXJzZSwgY2FuZGlkYXRlKSk7XG4gICAgICB9XG4gICAgICB2YXIgY2hpbGRyZW4gPSB1bml2ZXJzZS5wcm9wZXJ0eSgpLmNoaWxkcmVuKGNhbmRpZGF0ZSk7XG4gICAgICByZXR1cm4gY2hpbGRyZW4ubGVuZ3RoID4gMCA/IGZyZWVmYWxsUnRsKHVuaXZlcnNlLCBjaGlsZHJlbltjaGlsZHJlbi5sZW5ndGggLSAxXSkgOiBwb2ludChjYW5kaWRhdGUsIHRvRW5kKHVuaXZlcnNlLCBjYW5kaWRhdGUpKTtcbiAgICB9O1xuXG4gICAgdmFyIGZyZWVmYWxsUnRsJDEgPSBmcmVlZmFsbFJ0bDtcblxuICAgIHZhciB1bml2ZXJzZSQxID0gRG9tVW5pdmVyc2UoKTtcbiAgICB2YXIgZnJlZWZhbGxSdGwkMiA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gZnJlZWZhbGxSdGwkMSh1bml2ZXJzZSQxLCBlbGVtZW50KTtcbiAgICB9O1xuXG4gICAgdmFyIGhhbHZlID0gZnVuY3Rpb24gKG1haW4sIG90aGVyKSB7XG4gICAgICB2YXIgd2lkdGggPSBnZXRHZW5lcmljV2lkdGgobWFpbik7XG4gICAgICB3aWR0aC5lYWNoKGZ1bmN0aW9uICh3KSB7XG4gICAgICAgIHZhciBuZXdXaWR0aCA9IHcud2lkdGgoKSAvIDI7XG4gICAgICAgIHNldEdlbmVyaWNXaWR0aChtYWluLCBuZXdXaWR0aCwgdy51bml0KCkpO1xuICAgICAgICBzZXRHZW5lcmljV2lkdGgob3RoZXIsIG5ld1dpZHRoLCB3LnVuaXQoKSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIGdldEdyaWRTaXplID0gZnVuY3Rpb24gKHRhYmxlKSB7XG4gICAgICB2YXIgd2FyZWhvdXNlID0gV2FyZWhvdXNlLmZyb21UYWJsZSh0YWJsZSk7XG4gICAgICByZXR1cm4gd2FyZWhvdXNlLmdyaWQ7XG4gICAgfTtcblxuICAgIHZhciBjYXQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgICB2YXIgciA9IFtdO1xuICAgICAgdmFyIHB1c2ggPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICByLnB1c2goeCk7XG4gICAgICB9O1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYXJyW2ldLmVhY2gocHVzaCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcjtcbiAgICB9O1xuICAgIHZhciBsaWZ0MiA9IGZ1bmN0aW9uIChvYSwgb2IsIGYpIHtcbiAgICAgIHJldHVybiBvYS5pc1NvbWUoKSAmJiBvYi5pc1NvbWUoKSA/IE9wdGlvbi5zb21lKGYob2EuZ2V0T3JEaWUoKSwgb2IuZ2V0T3JEaWUoKSkpIDogT3B0aW9uLm5vbmUoKTtcbiAgICB9O1xuXG4gICAgdmFyIHNldElmTm90ID0gZnVuY3Rpb24gKGVsZW1lbnQsIHByb3BlcnR5LCB2YWx1ZSwgaWdub3JlKSB7XG4gICAgICBpZiAodmFsdWUgPT09IGlnbm9yZSkge1xuICAgICAgICByZW1vdmUoZWxlbWVudCwgcHJvcGVydHkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0KGVsZW1lbnQsIHByb3BlcnR5LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgcmVuZGVyID0gZnVuY3Rpb24gKHRhYmxlLCBncmlkKSB7XG4gICAgICB2YXIgbmV3Um93cyA9IFtdO1xuICAgICAgdmFyIG5ld0NlbGxzID0gW107XG4gICAgICB2YXIgaW5zZXJ0VGhlYWQgPSBsYXN0KGNoaWxkcmVuJDIodGFibGUsICdjYXB0aW9uLGNvbGdyb3VwJykpLmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY3VycnkocHJlcGVuZCwgdGFibGUpO1xuICAgICAgfSwgZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgcmV0dXJuIGN1cnJ5KGFmdGVyLCBjKTtcbiAgICAgIH0pO1xuICAgICAgdmFyIHJlbmRlclNlY3Rpb24gPSBmdW5jdGlvbiAoZ3JpZFNlY3Rpb24sIHNlY3Rpb25OYW1lKSB7XG4gICAgICAgIHZhciBzZWN0aW9uID0gY2hpbGQkMih0YWJsZSwgc2VjdGlvbk5hbWUpLmdldE9yVGh1bmsoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciB0YiA9IEVsZW1lbnQuZnJvbVRhZyhzZWN0aW9uTmFtZSwgb3duZXIodGFibGUpLmRvbSgpKTtcbiAgICAgICAgICBzZWN0aW9uTmFtZSA9PT0gJ3RoZWFkJyA/IGluc2VydFRoZWFkKHRiKSA6IGFwcGVuZCh0YWJsZSwgdGIpO1xuICAgICAgICAgIHJldHVybiB0YjtcbiAgICAgICAgfSk7XG4gICAgICAgIGVtcHR5KHNlY3Rpb24pO1xuICAgICAgICB2YXIgcm93cyA9IG1hcChncmlkU2VjdGlvbiwgZnVuY3Rpb24gKHJvdykge1xuICAgICAgICAgIGlmIChyb3cuaXNOZXcoKSkge1xuICAgICAgICAgICAgbmV3Um93cy5wdXNoKHJvdy5lbGVtZW50KCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgdHIgPSByb3cuZWxlbWVudCgpO1xuICAgICAgICAgIGVtcHR5KHRyKTtcbiAgICAgICAgICBlYWNoKHJvdy5jZWxscygpLCBmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICAgICAgaWYgKGNlbGwuaXNOZXcoKSkge1xuICAgICAgICAgICAgICBuZXdDZWxscy5wdXNoKGNlbGwuZWxlbWVudCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldElmTm90KGNlbGwuZWxlbWVudCgpLCAnY29sc3BhbicsIGNlbGwuY29sc3BhbigpLCAxKTtcbiAgICAgICAgICAgIHNldElmTm90KGNlbGwuZWxlbWVudCgpLCAncm93c3BhbicsIGNlbGwucm93c3BhbigpLCAxKTtcbiAgICAgICAgICAgIGFwcGVuZCh0ciwgY2VsbC5lbGVtZW50KCkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiB0cjtcbiAgICAgICAgfSk7XG4gICAgICAgIGFwcGVuZCQxKHNlY3Rpb24sIHJvd3MpO1xuICAgICAgfTtcbiAgICAgIHZhciByZW1vdmVTZWN0aW9uID0gZnVuY3Rpb24gKHNlY3Rpb25OYW1lKSB7XG4gICAgICAgIGNoaWxkJDIodGFibGUsIHNlY3Rpb25OYW1lKS5lYWNoKHJlbW92ZSQyKTtcbiAgICAgIH07XG4gICAgICB2YXIgcmVuZGVyT3JSZW1vdmVTZWN0aW9uID0gZnVuY3Rpb24gKGdyaWRTZWN0aW9uLCBzZWN0aW9uTmFtZSkge1xuICAgICAgICBpZiAoZ3JpZFNlY3Rpb24ubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJlbmRlclNlY3Rpb24oZ3JpZFNlY3Rpb24sIHNlY3Rpb25OYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZW1vdmVTZWN0aW9uKHNlY3Rpb25OYW1lKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHZhciBoZWFkU2VjdGlvbiA9IFtdO1xuICAgICAgdmFyIGJvZHlTZWN0aW9uID0gW107XG4gICAgICB2YXIgZm9vdFNlY3Rpb24gPSBbXTtcbiAgICAgIGVhY2goZ3JpZCwgZnVuY3Rpb24gKHJvdykge1xuICAgICAgICBzd2l0Y2ggKHJvdy5zZWN0aW9uKCkpIHtcbiAgICAgICAgY2FzZSAndGhlYWQnOlxuICAgICAgICAgIGhlYWRTZWN0aW9uLnB1c2gocm93KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndGJvZHknOlxuICAgICAgICAgIGJvZHlTZWN0aW9uLnB1c2gocm93KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndGZvb3QnOlxuICAgICAgICAgIGZvb3RTZWN0aW9uLnB1c2gocm93KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZW5kZXJPclJlbW92ZVNlY3Rpb24oaGVhZFNlY3Rpb24sICd0aGVhZCcpO1xuICAgICAgcmVuZGVyT3JSZW1vdmVTZWN0aW9uKGJvZHlTZWN0aW9uLCAndGJvZHknKTtcbiAgICAgIHJlbmRlck9yUmVtb3ZlU2VjdGlvbihmb290U2VjdGlvbiwgJ3Rmb290Jyk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuZXdSb3dzOiBuZXdSb3dzLFxuICAgICAgICBuZXdDZWxsczogbmV3Q2VsbHNcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgY29weSQyID0gZnVuY3Rpb24gKGdyaWQpIHtcbiAgICAgIHJldHVybiBtYXAoZ3JpZCwgZnVuY3Rpb24gKHJvdykge1xuICAgICAgICB2YXIgdHIgPSBzaGFsbG93KHJvdy5lbGVtZW50KCkpO1xuICAgICAgICBlYWNoKHJvdy5jZWxscygpLCBmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICAgIHZhciBjbG9uZWRDZWxsID0gZGVlcChjZWxsLmVsZW1lbnQoKSk7XG4gICAgICAgICAgc2V0SWZOb3QoY2xvbmVkQ2VsbCwgJ2NvbHNwYW4nLCBjZWxsLmNvbHNwYW4oKSwgMSk7XG4gICAgICAgICAgc2V0SWZOb3QoY2xvbmVkQ2VsbCwgJ3Jvd3NwYW4nLCBjZWxsLnJvd3NwYW4oKSwgMSk7XG4gICAgICAgICAgYXBwZW5kKHRyLCBjbG9uZWRDZWxsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0cjtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgYWRkQ2VsbCA9IGZ1bmN0aW9uIChncmlkUm93LCBpbmRleCwgY2VsbCkge1xuICAgICAgdmFyIGNlbGxzID0gZ3JpZFJvdy5jZWxscygpO1xuICAgICAgdmFyIGJlZm9yZSA9IGNlbGxzLnNsaWNlKDAsIGluZGV4KTtcbiAgICAgIHZhciBhZnRlciA9IGNlbGxzLnNsaWNlKGluZGV4KTtcbiAgICAgIHZhciBuZXdDZWxscyA9IGJlZm9yZS5jb25jYXQoW2NlbGxdKS5jb25jYXQoYWZ0ZXIpO1xuICAgICAgcmV0dXJuIHNldENlbGxzKGdyaWRSb3csIG5ld0NlbGxzKTtcbiAgICB9O1xuICAgIHZhciBtdXRhdGVDZWxsID0gZnVuY3Rpb24gKGdyaWRSb3csIGluZGV4LCBjZWxsKSB7XG4gICAgICB2YXIgY2VsbHMgPSBncmlkUm93LmNlbGxzKCk7XG4gICAgICBjZWxsc1tpbmRleF0gPSBjZWxsO1xuICAgIH07XG4gICAgdmFyIHNldENlbGxzID0gZnVuY3Rpb24gKGdyaWRSb3csIGNlbGxzKSB7XG4gICAgICByZXR1cm4gcm93Y2VsbHMoY2VsbHMsIGdyaWRSb3cuc2VjdGlvbigpKTtcbiAgICB9O1xuICAgIHZhciBtYXBDZWxscyA9IGZ1bmN0aW9uIChncmlkUm93LCBmKSB7XG4gICAgICB2YXIgY2VsbHMgPSBncmlkUm93LmNlbGxzKCk7XG4gICAgICB2YXIgciA9IG1hcChjZWxscywgZik7XG4gICAgICByZXR1cm4gcm93Y2VsbHMociwgZ3JpZFJvdy5zZWN0aW9uKCkpO1xuICAgIH07XG4gICAgdmFyIGdldENlbGwgPSBmdW5jdGlvbiAoZ3JpZFJvdywgaW5kZXgpIHtcbiAgICAgIHJldHVybiBncmlkUm93LmNlbGxzKClbaW5kZXhdO1xuICAgIH07XG4gICAgdmFyIGdldENlbGxFbGVtZW50ID0gZnVuY3Rpb24gKGdyaWRSb3csIGluZGV4KSB7XG4gICAgICByZXR1cm4gZ2V0Q2VsbChncmlkUm93LCBpbmRleCkuZWxlbWVudCgpO1xuICAgIH07XG4gICAgdmFyIGNlbGxMZW5ndGggPSBmdW5jdGlvbiAoZ3JpZFJvdykge1xuICAgICAgcmV0dXJuIGdyaWRSb3cuY2VsbHMoKS5sZW5ndGg7XG4gICAgfTtcblxuICAgIHZhciBnZXRDb2x1bW4gPSBmdW5jdGlvbiAoZ3JpZCwgaW5kZXgpIHtcbiAgICAgIHJldHVybiBtYXAoZ3JpZCwgZnVuY3Rpb24gKHJvdykge1xuICAgICAgICByZXR1cm4gZ2V0Q2VsbChyb3csIGluZGV4KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGdldFJvdyA9IGZ1bmN0aW9uIChncmlkLCBpbmRleCkge1xuICAgICAgcmV0dXJuIGdyaWRbaW5kZXhdO1xuICAgIH07XG4gICAgdmFyIGZpbmREaWZmID0gZnVuY3Rpb24gKHhzLCBjb21wKSB7XG4gICAgICBpZiAoeHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgICAgdmFyIGZpcnN0ID0geHNbMF07XG4gICAgICB2YXIgaW5kZXggPSBmaW5kSW5kZXgoeHMsIGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiAhY29tcChmaXJzdC5lbGVtZW50KCksIHguZWxlbWVudCgpKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGluZGV4LmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4geHMubGVuZ3RoO1xuICAgICAgfSwgZnVuY3Rpb24gKGluZCkge1xuICAgICAgICByZXR1cm4gaW5kO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgc3ViZ3JpZCA9IGZ1bmN0aW9uIChncmlkLCByb3csIGNvbHVtbiwgY29tcGFyYXRvcikge1xuICAgICAgdmFyIHJlc3RPZlJvdyA9IGdldFJvdyhncmlkLCByb3cpLmNlbGxzKCkuc2xpY2UoY29sdW1uKTtcbiAgICAgIHZhciBlbmRDb2xJbmRleCA9IGZpbmREaWZmKHJlc3RPZlJvdywgY29tcGFyYXRvcik7XG4gICAgICB2YXIgcmVzdE9mQ29sdW1uID0gZ2V0Q29sdW1uKGdyaWQsIGNvbHVtbikuc2xpY2Uocm93KTtcbiAgICAgIHZhciBlbmRSb3dJbmRleCA9IGZpbmREaWZmKHJlc3RPZkNvbHVtbiwgY29tcGFyYXRvcik7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb2xzcGFuOiBlbmRDb2xJbmRleCxcbiAgICAgICAgcm93c3BhbjogZW5kUm93SW5kZXhcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciB0b0RldGFpbHMgPSBmdW5jdGlvbiAoZ3JpZCwgY29tcGFyYXRvcikge1xuICAgICAgdmFyIHNlZW4gPSBtYXAoZ3JpZCwgZnVuY3Rpb24gKHJvdykge1xuICAgICAgICByZXR1cm4gbWFwKHJvdy5jZWxscygpLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgdmFyIHVwZGF0ZVNlZW4gPSBmdW5jdGlvbiAocmksIGNpLCByb3dzcGFuLCBjb2xzcGFuKSB7XG4gICAgICAgIGZvciAodmFyIHIgPSByaTsgciA8IHJpICsgcm93c3BhbjsgcisrKSB7XG4gICAgICAgICAgZm9yICh2YXIgYyA9IGNpOyBjIDwgY2kgKyBjb2xzcGFuOyBjKyspIHtcbiAgICAgICAgICAgIHNlZW5bcl1bY10gPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiBtYXAoZ3JpZCwgZnVuY3Rpb24gKHJvdywgcmkpIHtcbiAgICAgICAgdmFyIGRldGFpbHMgPSBiaW5kKHJvdy5jZWxscygpLCBmdW5jdGlvbiAoY2VsbCwgY2kpIHtcbiAgICAgICAgICBpZiAoc2VlbltyaV1bY2ldID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHN1YmdyaWQoZ3JpZCwgcmksIGNpLCBjb21wYXJhdG9yKTtcbiAgICAgICAgICAgIHVwZGF0ZVNlZW4ocmksIGNpLCByZXN1bHQucm93c3BhbiwgcmVzdWx0LmNvbHNwYW4pO1xuICAgICAgICAgICAgcmV0dXJuIFtkZXRhaWxuZXcoY2VsbC5lbGVtZW50KCksIHJlc3VsdC5yb3dzcGFuLCByZXN1bHQuY29sc3BhbiwgY2VsbC5pc05ldygpKV07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcm93ZGV0YWlscyhkZXRhaWxzLCByb3cuc2VjdGlvbigpKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHRvR3JpZCA9IGZ1bmN0aW9uICh3YXJlaG91c2UsIGdlbmVyYXRvcnMsIGlzTmV3KSB7XG4gICAgICB2YXIgZ3JpZCA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3YXJlaG91c2UuZ3JpZC5yb3dzKCk7IGkrKykge1xuICAgICAgICB2YXIgcm93Q2VsbHMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB3YXJlaG91c2UuZ3JpZC5jb2x1bW5zKCk7IGorKykge1xuICAgICAgICAgIHZhciBlbGVtZW50ID0gV2FyZWhvdXNlLmdldEF0KHdhcmVob3VzZSwgaSwgaikubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudG5ldyhpdGVtLmVsZW1lbnQoKSwgaXNOZXcpO1xuICAgICAgICAgIH0pLmdldE9yVGh1bmsoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRuZXcoZ2VuZXJhdG9ycy5nYXAoKSwgdHJ1ZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcm93Q2VsbHMucHVzaChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcm93ID0gcm93Y2VsbHMocm93Q2VsbHMsIHdhcmVob3VzZS5hbGxbaV0uc2VjdGlvbigpKTtcbiAgICAgICAgZ3JpZC5wdXNoKHJvdyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZ3JpZDtcbiAgICB9O1xuXG4gICAgdmFyIGZyb21XYXJlaG91c2UgPSBmdW5jdGlvbiAod2FyZWhvdXNlLCBnZW5lcmF0b3JzKSB7XG4gICAgICByZXR1cm4gdG9HcmlkKHdhcmVob3VzZSwgZ2VuZXJhdG9ycywgZmFsc2UpO1xuICAgIH07XG4gICAgdmFyIGRlcml2ZVJvd3MgPSBmdW5jdGlvbiAocmVuZGVyZWQsIGdlbmVyYXRvcnMpIHtcbiAgICAgIHZhciBmaW5kUm93ID0gZnVuY3Rpb24gKGRldGFpbHMpIHtcbiAgICAgICAgdmFyIHJvd09mQ2VsbHMgPSBmaW5kTWFwKGRldGFpbHMsIGZ1bmN0aW9uIChkZXRhaWwpIHtcbiAgICAgICAgICByZXR1cm4gcGFyZW50KGRldGFpbC5lbGVtZW50KCkpLm1hcChmdW5jdGlvbiAocm93KSB7XG4gICAgICAgICAgICB2YXIgaXNOZXcgPSBwYXJlbnQocm93KS5pc05vbmUoKTtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50bmV3KHJvdywgaXNOZXcpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJvd09mQ2VsbHMuZ2V0T3JUaHVuayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnRuZXcoZ2VuZXJhdG9ycy5yb3coKSwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBtYXAocmVuZGVyZWQsIGZ1bmN0aW9uIChkZXRhaWxzKSB7XG4gICAgICAgIHZhciByb3cgPSBmaW5kUm93KGRldGFpbHMuZGV0YWlscygpKTtcbiAgICAgICAgcmV0dXJuIHJvd2RhdGFuZXcocm93LmVsZW1lbnQoKSwgZGV0YWlscy5kZXRhaWxzKCksIGRldGFpbHMuc2VjdGlvbigpLCByb3cuaXNOZXcoKSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciB0b0RldGFpbExpc3QgPSBmdW5jdGlvbiAoZ3JpZCwgZ2VuZXJhdG9ycykge1xuICAgICAgdmFyIHJlbmRlcmVkID0gdG9EZXRhaWxzKGdyaWQsIGVxKTtcbiAgICAgIHJldHVybiBkZXJpdmVSb3dzKHJlbmRlcmVkLCBnZW5lcmF0b3JzKTtcbiAgICB9O1xuICAgIHZhciBmaW5kSW5XYXJlaG91c2UgPSBmdW5jdGlvbiAod2FyZWhvdXNlLCBlbGVtZW50KSB7XG4gICAgICByZXR1cm4gZmluZE1hcCh3YXJlaG91c2UuYWxsLCBmdW5jdGlvbiAocikge1xuICAgICAgICByZXR1cm4gZmluZChyLmNlbGxzKCksIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgcmV0dXJuIGVxKGVsZW1lbnQsIGUuZWxlbWVudCgpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBydW4gPSBmdW5jdGlvbiAob3BlcmF0aW9uLCBleHRyYWN0LCBhZGp1c3RtZW50LCBwb3N0QWN0aW9uLCBnZW5XcmFwcGVycykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh3aXJlLCB0YWJsZSwgdGFyZ2V0LCBnZW5lcmF0b3JzLCBkaXJlY3Rpb24sIHNpemluZykge1xuICAgICAgICB2YXIgd2FyZWhvdXNlID0gV2FyZWhvdXNlLmZyb21UYWJsZSh0YWJsZSk7XG4gICAgICAgIHZhciBvdXRwdXQgPSBleHRyYWN0KHdhcmVob3VzZSwgdGFyZ2V0KS5tYXAoZnVuY3Rpb24gKGluZm8pIHtcbiAgICAgICAgICB2YXIgbW9kZWwgPSBmcm9tV2FyZWhvdXNlKHdhcmVob3VzZSwgZ2VuZXJhdG9ycyk7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IG9wZXJhdGlvbihtb2RlbCwgaW5mbywgZXEsIGdlbldyYXBwZXJzKGdlbmVyYXRvcnMpKTtcbiAgICAgICAgICB2YXIgZ3JpZCA9IHRvRGV0YWlsTGlzdChyZXN1bHQuZ3JpZCgpLCBnZW5lcmF0b3JzKTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ3JpZDogY29uc3RhbnQoZ3JpZCksXG4gICAgICAgICAgICBjdXJzb3I6IHJlc3VsdC5jdXJzb3JcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG91dHB1dC5mb2xkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gT3B0aW9uLm5vbmUoKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKG91dCkge1xuICAgICAgICAgIHZhciBuZXdFbGVtZW50cyA9IHJlbmRlcih0YWJsZSwgb3V0LmdyaWQoKSk7XG4gICAgICAgICAgdmFyIHRhYmxlU2l6aW5nID0gT3B0aW9uLmZyb20oc2l6aW5nKS5nZXRPclRodW5rKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBUYWJsZVNpemUuZ2V0VGFibGVTaXplKHRhYmxlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBhZGp1c3RtZW50KHRhYmxlLCBvdXQuZ3JpZCgpLCBkaXJlY3Rpb24sIHRhYmxlU2l6aW5nKTtcbiAgICAgICAgICBwb3N0QWN0aW9uKHRhYmxlKTtcbiAgICAgICAgICByZWZyZXNoKHdpcmUsIHRhYmxlLCBoZWlnaHQsIGRpcmVjdGlvbik7XG4gICAgICAgICAgcmV0dXJuIE9wdGlvbi5zb21lKHtcbiAgICAgICAgICAgIGN1cnNvcjogb3V0LmN1cnNvcixcbiAgICAgICAgICAgIG5ld1Jvd3M6IGNvbnN0YW50KG5ld0VsZW1lbnRzLm5ld1Jvd3MpLFxuICAgICAgICAgICAgbmV3Q2VsbHM6IGNvbnN0YW50KG5ld0VsZW1lbnRzLm5ld0NlbGxzKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgb25DZWxsID0gZnVuY3Rpb24gKHdhcmVob3VzZSwgdGFyZ2V0KSB7XG4gICAgICByZXR1cm4gY2VsbCh0YXJnZXQuZWxlbWVudCgpKS5iaW5kKGZ1bmN0aW9uIChjZWxsKSB7XG4gICAgICAgIHJldHVybiBmaW5kSW5XYXJlaG91c2Uod2FyZWhvdXNlLCBjZWxsKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIG9uUGFzdGUgPSBmdW5jdGlvbiAod2FyZWhvdXNlLCB0YXJnZXQpIHtcbiAgICAgIHJldHVybiBjZWxsKHRhcmdldC5lbGVtZW50KCkpLmJpbmQoZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgICAgcmV0dXJuIGZpbmRJbldhcmVob3VzZSh3YXJlaG91c2UsIGNlbGwpLm1hcChmdW5jdGlvbiAoZGV0YWlscykge1xuICAgICAgICAgIHZhciB2YWx1ZSA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBkZXRhaWxzKSwge1xuICAgICAgICAgICAgZ2VuZXJhdG9yczogdGFyZ2V0LmdlbmVyYXRvcnMsXG4gICAgICAgICAgICBjbGlwYm9hcmQ6IHRhcmdldC5jbGlwYm9hcmRcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgb25QYXN0ZUJ5RWRpdG9yID0gZnVuY3Rpb24gKHdhcmVob3VzZSwgdGFyZ2V0KSB7XG4gICAgICB2YXIgZGV0YWlscyA9IG1hcCh0YXJnZXQuc2VsZWN0aW9uKCksIGZ1bmN0aW9uIChjZWxsJDEpIHtcbiAgICAgICAgcmV0dXJuIGNlbGwoY2VsbCQxKS5iaW5kKGZ1bmN0aW9uIChsYykge1xuICAgICAgICAgIHJldHVybiBmaW5kSW5XYXJlaG91c2Uod2FyZWhvdXNlLCBsYyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICB2YXIgY2VsbHMgPSBjYXQoZGV0YWlscyk7XG4gICAgICByZXR1cm4gY2VsbHMubGVuZ3RoID4gMCA/IE9wdGlvbi5zb21lKHtcbiAgICAgICAgY2VsbHM6IGNlbGxzLFxuICAgICAgICBnZW5lcmF0b3JzOiB0YXJnZXQuZ2VuZXJhdG9ycyxcbiAgICAgICAgY2xpcGJvYXJkOiB0YXJnZXQuY2xpcGJvYXJkXG4gICAgICB9KSA6IE9wdGlvbi5ub25lKCk7XG4gICAgfTtcbiAgICB2YXIgb25NZXJnYWJsZSA9IGZ1bmN0aW9uIChfd2FyZWhvdXNlLCB0YXJnZXQpIHtcbiAgICAgIHJldHVybiB0YXJnZXQubWVyZ2FibGUoKTtcbiAgICB9O1xuICAgIHZhciBvblVubWVyZ2FibGUgPSBmdW5jdGlvbiAoX3dhcmVob3VzZSwgdGFyZ2V0KSB7XG4gICAgICByZXR1cm4gdGFyZ2V0LnVubWVyZ2FibGUoKTtcbiAgICB9O1xuICAgIHZhciBvbkNlbGxzID0gZnVuY3Rpb24gKHdhcmVob3VzZSwgdGFyZ2V0KSB7XG4gICAgICB2YXIgZGV0YWlscyA9IG1hcCh0YXJnZXQuc2VsZWN0aW9uKCksIGZ1bmN0aW9uIChjZWxsJDEpIHtcbiAgICAgICAgcmV0dXJuIGNlbGwoY2VsbCQxKS5iaW5kKGZ1bmN0aW9uIChsYykge1xuICAgICAgICAgIHJldHVybiBmaW5kSW5XYXJlaG91c2Uod2FyZWhvdXNlLCBsYyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICB2YXIgY2VsbHMgPSBjYXQoZGV0YWlscyk7XG4gICAgICByZXR1cm4gY2VsbHMubGVuZ3RoID4gMCA/IE9wdGlvbi5zb21lKGNlbGxzKSA6IE9wdGlvbi5ub25lKCk7XG4gICAgfTtcblxuICAgIHZhciBtZXJnZSA9IGZ1bmN0aW9uIChncmlkLCBib3VuZHMsIGNvbXBhcmF0b3IsIHN1YnN0aXR1dGlvbikge1xuICAgICAgaWYgKGdyaWQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBncmlkO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IGJvdW5kcy5zdGFydFJvdygpOyBpIDw9IGJvdW5kcy5maW5pc2hSb3coKTsgaSsrKSB7XG4gICAgICAgIGZvciAodmFyIGogPSBib3VuZHMuc3RhcnRDb2woKTsgaiA8PSBib3VuZHMuZmluaXNoQ29sKCk7IGorKykge1xuICAgICAgICAgIG11dGF0ZUNlbGwoZ3JpZFtpXSwgaiwgZWxlbWVudG5ldyhzdWJzdGl0dXRpb24oKSwgZmFsc2UpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGdyaWQ7XG4gICAgfTtcbiAgICB2YXIgdW5tZXJnZSA9IGZ1bmN0aW9uIChncmlkLCB0YXJnZXQsIGNvbXBhcmF0b3IsIHN1YnN0aXR1dGlvbikge1xuICAgICAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JpZC5sZW5ndGg7IGkrKykge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNlbGxMZW5ndGgoZ3JpZFswXSk7IGorKykge1xuICAgICAgICAgIHZhciBjdXJyZW50ID0gZ2V0Q2VsbEVsZW1lbnQoZ3JpZFtpXSwgaik7XG4gICAgICAgICAgdmFyIGlzVG9SZXBsYWNlID0gY29tcGFyYXRvcihjdXJyZW50LCB0YXJnZXQpO1xuICAgICAgICAgIGlmIChpc1RvUmVwbGFjZSA9PT0gdHJ1ZSAmJiBmaXJzdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIG11dGF0ZUNlbGwoZ3JpZFtpXSwgaiwgZWxlbWVudG5ldyhzdWJzdGl0dXRpb24oKSwgdHJ1ZSkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaXNUb1JlcGxhY2UgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZ3JpZDtcbiAgICB9O1xuICAgIHZhciB1bmlxdWVDZWxscyA9IGZ1bmN0aW9uIChyb3csIGNvbXBhcmF0b3IpIHtcbiAgICAgIHJldHVybiBmb2xkbChyb3csIGZ1bmN0aW9uIChyZXN0LCBjZWxsKSB7XG4gICAgICAgIHJldHVybiBleGlzdHMocmVzdCwgZnVuY3Rpb24gKGN1cnJlbnRDZWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbXBhcmF0b3IoY3VycmVudENlbGwuZWxlbWVudCgpLCBjZWxsLmVsZW1lbnQoKSk7XG4gICAgICAgIH0pID8gcmVzdCA6IHJlc3QuY29uY2F0KFtjZWxsXSk7XG4gICAgICB9LCBbXSk7XG4gICAgfTtcbiAgICB2YXIgc3BsaXRDb2xzID0gZnVuY3Rpb24gKGdyaWQsIGluZGV4LCBjb21wYXJhdG9yLCBzdWJzdGl0dXRpb24pIHtcbiAgICAgIGlmIChpbmRleCA+IDAgJiYgaW5kZXggPCBncmlkWzBdLmNlbGxzKCkubGVuZ3RoKSB7XG4gICAgICAgIGVhY2goZ3JpZCwgZnVuY3Rpb24gKHJvdykge1xuICAgICAgICAgIHZhciBwcmV2Q2VsbCA9IHJvdy5jZWxscygpW2luZGV4IC0gMV07XG4gICAgICAgICAgdmFyIGN1cnJlbnQgPSByb3cuY2VsbHMoKVtpbmRleF07XG4gICAgICAgICAgdmFyIGlzVG9SZXBsYWNlID0gY29tcGFyYXRvcihjdXJyZW50LmVsZW1lbnQoKSwgcHJldkNlbGwuZWxlbWVudCgpKTtcbiAgICAgICAgICBpZiAoaXNUb1JlcGxhY2UpIHtcbiAgICAgICAgICAgIG11dGF0ZUNlbGwocm93LCBpbmRleCwgZWxlbWVudG5ldyhzdWJzdGl0dXRpb24oKSwgdHJ1ZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZ3JpZDtcbiAgICB9O1xuICAgIHZhciBzcGxpdFJvd3MgPSBmdW5jdGlvbiAoZ3JpZCwgaW5kZXgsIGNvbXBhcmF0b3IsIHN1YnN0aXR1dGlvbikge1xuICAgICAgaWYgKGluZGV4ID4gMCAmJiBpbmRleCA8IGdyaWQubGVuZ3RoKSB7XG4gICAgICAgIHZhciByb3dQcmV2Q2VsbHMgPSBncmlkW2luZGV4IC0gMV0uY2VsbHMoKTtcbiAgICAgICAgdmFyIGNlbGxzID0gdW5pcXVlQ2VsbHMocm93UHJldkNlbGxzLCBjb21wYXJhdG9yKTtcbiAgICAgICAgZWFjaChjZWxscywgZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgICAgICB2YXIgcmVwbGFjZW1lbnQgPSBPcHRpb24ubm9uZSgpO1xuICAgICAgICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgIHZhciBfbG9vcF8yID0gZnVuY3Rpb24gKGopIHtcbiAgICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSBncmlkW2ldLmNlbGxzKClbal07XG4gICAgICAgICAgICAgIHZhciBpc1RvUmVwbGFjZSA9IGNvbXBhcmF0b3IoY3VycmVudC5lbGVtZW50KCksIGNlbGwuZWxlbWVudCgpKTtcbiAgICAgICAgICAgICAgaWYgKGlzVG9SZXBsYWNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcGxhY2VtZW50LmlzTm9uZSgpKSB7XG4gICAgICAgICAgICAgICAgICByZXBsYWNlbWVudCA9IE9wdGlvbi5zb21lKHN1YnN0aXR1dGlvbigpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVwbGFjZW1lbnQuZWFjaChmdW5jdGlvbiAoc3ViKSB7XG4gICAgICAgICAgICAgICAgICBtdXRhdGVDZWxsKGdyaWRbaV0sIGosIGVsZW1lbnRuZXcoc3ViLCB0cnVlKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNlbGxMZW5ndGgoZ3JpZFswXSk7IGorKykge1xuICAgICAgICAgICAgICBfbG9vcF8yKGopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgZm9yICh2YXIgaSA9IGluZGV4OyBpIDwgZ3JpZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgX2xvb3BfMShpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGdyaWQ7XG4gICAgfTtcblxuICAgIHZhciB2YWx1ZSA9IGZ1bmN0aW9uIChvKSB7XG4gICAgICB2YXIgaXMgPSBmdW5jdGlvbiAodikge1xuICAgICAgICByZXR1cm4gbyA9PT0gdjtcbiAgICAgIH07XG4gICAgICB2YXIgb3IgPSBmdW5jdGlvbiAoX29wdCkge1xuICAgICAgICByZXR1cm4gdmFsdWUobyk7XG4gICAgICB9O1xuICAgICAgdmFyIG9yVGh1bmsgPSBmdW5jdGlvbiAoX2YpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlKG8pO1xuICAgICAgfTtcbiAgICAgIHZhciBtYXAgPSBmdW5jdGlvbiAoZikge1xuICAgICAgICByZXR1cm4gdmFsdWUoZihvKSk7XG4gICAgICB9O1xuICAgICAgdmFyIG1hcEVycm9yID0gZnVuY3Rpb24gKF9mKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZShvKTtcbiAgICAgIH07XG4gICAgICB2YXIgZWFjaCA9IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIGYobyk7XG4gICAgICB9O1xuICAgICAgdmFyIGJpbmQgPSBmdW5jdGlvbiAoZikge1xuICAgICAgICByZXR1cm4gZihvKTtcbiAgICAgIH07XG4gICAgICB2YXIgZm9sZCA9IGZ1bmN0aW9uIChfLCBvblZhbHVlKSB7XG4gICAgICAgIHJldHVybiBvblZhbHVlKG8pO1xuICAgICAgfTtcbiAgICAgIHZhciBleGlzdHMgPSBmdW5jdGlvbiAoZikge1xuICAgICAgICByZXR1cm4gZihvKTtcbiAgICAgIH07XG4gICAgICB2YXIgZm9yYWxsID0gZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgcmV0dXJuIGYobyk7XG4gICAgICB9O1xuICAgICAgdmFyIHRvT3B0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gT3B0aW9uLnNvbWUobyk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaXM6IGlzLFxuICAgICAgICBpc1ZhbHVlOiBhbHdheXMsXG4gICAgICAgIGlzRXJyb3I6IG5ldmVyLFxuICAgICAgICBnZXRPcjogY29uc3RhbnQobyksXG4gICAgICAgIGdldE9yVGh1bms6IGNvbnN0YW50KG8pLFxuICAgICAgICBnZXRPckRpZTogY29uc3RhbnQobyksXG4gICAgICAgIG9yOiBvcixcbiAgICAgICAgb3JUaHVuazogb3JUaHVuayxcbiAgICAgICAgZm9sZDogZm9sZCxcbiAgICAgICAgbWFwOiBtYXAsXG4gICAgICAgIG1hcEVycm9yOiBtYXBFcnJvcixcbiAgICAgICAgZWFjaDogZWFjaCxcbiAgICAgICAgYmluZDogYmluZCxcbiAgICAgICAgZXhpc3RzOiBleGlzdHMsXG4gICAgICAgIGZvcmFsbDogZm9yYWxsLFxuICAgICAgICB0b09wdGlvbjogdG9PcHRpb25cbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgZXJyb3IgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgdmFyIGdldE9yVGh1bmsgPSBmdW5jdGlvbiAoZikge1xuICAgICAgICByZXR1cm4gZigpO1xuICAgICAgfTtcbiAgICAgIHZhciBnZXRPckRpZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGRpZShTdHJpbmcobWVzc2FnZSkpKCk7XG4gICAgICB9O1xuICAgICAgdmFyIG9yID0gZnVuY3Rpb24gKG9wdCkge1xuICAgICAgICByZXR1cm4gb3B0O1xuICAgICAgfTtcbiAgICAgIHZhciBvclRodW5rID0gZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgcmV0dXJuIGYoKTtcbiAgICAgIH07XG4gICAgICB2YXIgbWFwID0gZnVuY3Rpb24gKF9mKSB7XG4gICAgICAgIHJldHVybiBlcnJvcihtZXNzYWdlKTtcbiAgICAgIH07XG4gICAgICB2YXIgbWFwRXJyb3IgPSBmdW5jdGlvbiAoZikge1xuICAgICAgICByZXR1cm4gZXJyb3IoZihtZXNzYWdlKSk7XG4gICAgICB9O1xuICAgICAgdmFyIGJpbmQgPSBmdW5jdGlvbiAoX2YpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yKG1lc3NhZ2UpO1xuICAgICAgfTtcbiAgICAgIHZhciBmb2xkID0gZnVuY3Rpb24gKG9uRXJyb3IsIF8pIHtcbiAgICAgICAgcmV0dXJuIG9uRXJyb3IobWVzc2FnZSk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaXM6IG5ldmVyLFxuICAgICAgICBpc1ZhbHVlOiBuZXZlcixcbiAgICAgICAgaXNFcnJvcjogYWx3YXlzLFxuICAgICAgICBnZXRPcjogaWRlbnRpdHksXG4gICAgICAgIGdldE9yVGh1bms6IGdldE9yVGh1bmssXG4gICAgICAgIGdldE9yRGllOiBnZXRPckRpZSxcbiAgICAgICAgb3I6IG9yLFxuICAgICAgICBvclRodW5rOiBvclRodW5rLFxuICAgICAgICBmb2xkOiBmb2xkLFxuICAgICAgICBtYXA6IG1hcCxcbiAgICAgICAgbWFwRXJyb3I6IG1hcEVycm9yLFxuICAgICAgICBlYWNoOiBub29wLFxuICAgICAgICBiaW5kOiBiaW5kLFxuICAgICAgICBleGlzdHM6IG5ldmVyLFxuICAgICAgICBmb3JhbGw6IGFsd2F5cyxcbiAgICAgICAgdG9PcHRpb246IE9wdGlvbi5ub25lXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGZyb21PcHRpb24gPSBmdW5jdGlvbiAob3B0LCBlcnIpIHtcbiAgICAgIHJldHVybiBvcHQuZm9sZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBlcnJvcihlcnIpO1xuICAgICAgfSwgdmFsdWUpO1xuICAgIH07XG4gICAgdmFyIFJlc3VsdCA9IHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVycm9yOiBlcnJvcixcbiAgICAgIGZyb21PcHRpb246IGZyb21PcHRpb25cbiAgICB9O1xuXG4gICAgdmFyIG1lYXN1cmUgPSBmdW5jdGlvbiAoc3RhcnRBZGRyZXNzLCBncmlkQSwgZ3JpZEIpIHtcbiAgICAgIGlmIChzdGFydEFkZHJlc3Mucm93KCkgPj0gZ3JpZEEubGVuZ3RoIHx8IHN0YXJ0QWRkcmVzcy5jb2x1bW4oKSA+IGNlbGxMZW5ndGgoZ3JpZEFbMF0pKSB7XG4gICAgICAgIHJldHVybiBSZXN1bHQuZXJyb3IoJ2ludmFsaWQgc3RhcnQgYWRkcmVzcyBvdXQgb2YgdGFibGUgYm91bmRzLCByb3c6ICcgKyBzdGFydEFkZHJlc3Mucm93KCkgKyAnLCBjb2x1bW46ICcgKyBzdGFydEFkZHJlc3MuY29sdW1uKCkpO1xuICAgICAgfVxuICAgICAgdmFyIHJvd1JlbWFpbmRlciA9IGdyaWRBLnNsaWNlKHN0YXJ0QWRkcmVzcy5yb3coKSk7XG4gICAgICB2YXIgY29sUmVtYWluZGVyID0gcm93UmVtYWluZGVyWzBdLmNlbGxzKCkuc2xpY2Uoc3RhcnRBZGRyZXNzLmNvbHVtbigpKTtcbiAgICAgIHZhciBjb2xSZXF1aXJlZCA9IGNlbGxMZW5ndGgoZ3JpZEJbMF0pO1xuICAgICAgdmFyIHJvd1JlcXVpcmVkID0gZ3JpZEIubGVuZ3RoO1xuICAgICAgcmV0dXJuIFJlc3VsdC52YWx1ZSh7XG4gICAgICAgIHJvd0RlbHRhOiByb3dSZW1haW5kZXIubGVuZ3RoIC0gcm93UmVxdWlyZWQsXG4gICAgICAgIGNvbERlbHRhOiBjb2xSZW1haW5kZXIubGVuZ3RoIC0gY29sUmVxdWlyZWRcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIG1lYXN1cmVXaWR0aCA9IGZ1bmN0aW9uIChncmlkQSwgZ3JpZEIpIHtcbiAgICAgIHZhciBjb2xMZW5ndGhBID0gY2VsbExlbmd0aChncmlkQVswXSk7XG4gICAgICB2YXIgY29sTGVuZ3RoQiA9IGNlbGxMZW5ndGgoZ3JpZEJbMF0pO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcm93RGVsdGE6IDAsXG4gICAgICAgIGNvbERlbHRhOiBjb2xMZW5ndGhBIC0gY29sTGVuZ3RoQlxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBtZWFzdXJlSGVpZ2h0ID0gZnVuY3Rpb24gKGdyaWRBLCBncmlkQikge1xuICAgICAgdmFyIHJvd0xlbmd0aEEgPSBncmlkQS5sZW5ndGg7XG4gICAgICB2YXIgcm93TGVuZ3RoQiA9IGdyaWRCLmxlbmd0aDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJvd0RlbHRhOiByb3dMZW5ndGhBIC0gcm93TGVuZ3RoQixcbiAgICAgICAgY29sRGVsdGE6IDBcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgZmlsbCA9IGZ1bmN0aW9uIChjZWxscywgZ2VuZXJhdG9yKSB7XG4gICAgICByZXR1cm4gbWFwKGNlbGxzLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50bmV3KGdlbmVyYXRvci5jZWxsKCksIHRydWUpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgcm93RmlsbCA9IGZ1bmN0aW9uIChncmlkLCBhbW91bnQsIGdlbmVyYXRvcikge1xuICAgICAgcmV0dXJuIGdyaWQuY29uY2F0KHJhbmdlKGFtb3VudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc2V0Q2VsbHMoZ3JpZFtncmlkLmxlbmd0aCAtIDFdLCBmaWxsKGdyaWRbZ3JpZC5sZW5ndGggLSAxXS5jZWxscygpLCBnZW5lcmF0b3IpKTtcbiAgICAgIH0pKTtcbiAgICB9O1xuICAgIHZhciBjb2xGaWxsID0gZnVuY3Rpb24gKGdyaWQsIGFtb3VudCwgZ2VuZXJhdG9yKSB7XG4gICAgICByZXR1cm4gbWFwKGdyaWQsIGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgcmV0dXJuIHNldENlbGxzKHJvdywgcm93LmNlbGxzKCkuY29uY2F0KGZpbGwocmFuZ2UoYW1vdW50LCBpZGVudGl0eSksIGdlbmVyYXRvcikpKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHRhaWxvciA9IGZ1bmN0aW9uIChncmlkQSwgZGVsdGEsIGdlbmVyYXRvcikge1xuICAgICAgdmFyIGZpbGxDb2xzID0gZGVsdGEuY29sRGVsdGEgPCAwID8gY29sRmlsbCA6IGlkZW50aXR5O1xuICAgICAgdmFyIGZpbGxSb3dzID0gZGVsdGEucm93RGVsdGEgPCAwID8gcm93RmlsbCA6IGlkZW50aXR5O1xuICAgICAgdmFyIG1vZGlmaWVkQ29scyA9IGZpbGxDb2xzKGdyaWRBLCBNYXRoLmFicyhkZWx0YS5jb2xEZWx0YSksIGdlbmVyYXRvcik7XG4gICAgICByZXR1cm4gZmlsbFJvd3MobW9kaWZpZWRDb2xzLCBNYXRoLmFicyhkZWx0YS5yb3dEZWx0YSksIGdlbmVyYXRvcik7XG4gICAgfTtcblxuICAgIHZhciBpc1NwYW5uaW5nID0gZnVuY3Rpb24gKGdyaWQsIHJvdywgY29sLCBjb21wYXJhdG9yKSB7XG4gICAgICB2YXIgY2FuZGlkYXRlID0gZ2V0Q2VsbChncmlkW3Jvd10sIGNvbCk7XG4gICAgICB2YXIgbWF0Y2hpbmcgPSBjdXJyeShjb21wYXJhdG9yLCBjYW5kaWRhdGUuZWxlbWVudCgpKTtcbiAgICAgIHZhciBjdXJyZW50Um93ID0gZ3JpZFtyb3ddO1xuICAgICAgcmV0dXJuIGdyaWQubGVuZ3RoID4gMSAmJiBjZWxsTGVuZ3RoKGN1cnJlbnRSb3cpID4gMSAmJiAoY29sID4gMCAmJiBtYXRjaGluZyhnZXRDZWxsRWxlbWVudChjdXJyZW50Um93LCBjb2wgLSAxKSkgfHwgY29sIDwgY3VycmVudFJvdy5jZWxscygpLmxlbmd0aCAtIDEgJiYgbWF0Y2hpbmcoZ2V0Q2VsbEVsZW1lbnQoY3VycmVudFJvdywgY29sICsgMSkpIHx8IHJvdyA+IDAgJiYgbWF0Y2hpbmcoZ2V0Q2VsbEVsZW1lbnQoZ3JpZFtyb3cgLSAxXSwgY29sKSkgfHwgcm93IDwgZ3JpZC5sZW5ndGggLSAxICYmIG1hdGNoaW5nKGdldENlbGxFbGVtZW50KGdyaWRbcm93ICsgMV0sIGNvbCkpKTtcbiAgICB9O1xuICAgIHZhciBtZXJnZVRhYmxlcyA9IGZ1bmN0aW9uIChzdGFydEFkZHJlc3MsIGdyaWRBLCBncmlkQiwgZ2VuZXJhdG9yLCBjb21wYXJhdG9yKSB7XG4gICAgICB2YXIgc3RhcnRSb3cgPSBzdGFydEFkZHJlc3Mucm93KCk7XG4gICAgICB2YXIgc3RhcnRDb2wgPSBzdGFydEFkZHJlc3MuY29sdW1uKCk7XG4gICAgICB2YXIgbWVyZ2VIZWlnaHQgPSBncmlkQi5sZW5ndGg7XG4gICAgICB2YXIgbWVyZ2VXaWR0aCA9IGNlbGxMZW5ndGgoZ3JpZEJbMF0pO1xuICAgICAgdmFyIGVuZFJvdyA9IHN0YXJ0Um93ICsgbWVyZ2VIZWlnaHQ7XG4gICAgICB2YXIgZW5kQ29sID0gc3RhcnRDb2wgKyBtZXJnZVdpZHRoO1xuICAgICAgZm9yICh2YXIgciA9IHN0YXJ0Um93OyByIDwgZW5kUm93OyByKyspIHtcbiAgICAgICAgZm9yICh2YXIgYyA9IHN0YXJ0Q29sOyBjIDwgZW5kQ29sOyBjKyspIHtcbiAgICAgICAgICBpZiAoaXNTcGFubmluZyhncmlkQSwgciwgYywgY29tcGFyYXRvcikpIHtcbiAgICAgICAgICAgIHVubWVyZ2UoZ3JpZEEsIGdldENlbGxFbGVtZW50KGdyaWRBW3JdLCBjKSwgY29tcGFyYXRvciwgZ2VuZXJhdG9yLmNlbGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgbmV3Q2VsbCA9IGdldENlbGxFbGVtZW50KGdyaWRCW3IgLSBzdGFydFJvd10sIGMgLSBzdGFydENvbCk7XG4gICAgICAgICAgdmFyIHJlcGxhY2VtZW50ID0gZ2VuZXJhdG9yLnJlcGxhY2UobmV3Q2VsbCk7XG4gICAgICAgICAgbXV0YXRlQ2VsbChncmlkQVtyXSwgYywgZWxlbWVudG5ldyhyZXBsYWNlbWVudCwgdHJ1ZSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZ3JpZEE7XG4gICAgfTtcbiAgICB2YXIgbWVyZ2UkMSA9IGZ1bmN0aW9uIChzdGFydEFkZHJlc3MsIGdyaWRBLCBncmlkQiwgZ2VuZXJhdG9yLCBjb21wYXJhdG9yKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gbWVhc3VyZShzdGFydEFkZHJlc3MsIGdyaWRBLCBncmlkQik7XG4gICAgICByZXR1cm4gcmVzdWx0Lm1hcChmdW5jdGlvbiAoZGVsdGEpIHtcbiAgICAgICAgdmFyIGZpdHRlZEdyaWQgPSB0YWlsb3IoZ3JpZEEsIGRlbHRhLCBnZW5lcmF0b3IpO1xuICAgICAgICByZXR1cm4gbWVyZ2VUYWJsZXMoc3RhcnRBZGRyZXNzLCBmaXR0ZWRHcmlkLCBncmlkQiwgZ2VuZXJhdG9yLCBjb21wYXJhdG9yKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGluc2VydENvbHMgPSBmdW5jdGlvbiAoaW5kZXgsIGdyaWRBLCBncmlkQiwgZ2VuZXJhdG9yLCBjb21wYXJhdG9yKSB7XG4gICAgICBzcGxpdENvbHMoZ3JpZEEsIGluZGV4LCBjb21wYXJhdG9yLCBnZW5lcmF0b3IuY2VsbCk7XG4gICAgICB2YXIgZGVsdGEgPSBtZWFzdXJlSGVpZ2h0KGdyaWRCLCBncmlkQSk7XG4gICAgICB2YXIgZml0dGVkTmV3R3JpZCA9IHRhaWxvcihncmlkQiwgZGVsdGEsIGdlbmVyYXRvcik7XG4gICAgICB2YXIgc2Vjb25kRGVsdGEgPSBtZWFzdXJlSGVpZ2h0KGdyaWRBLCBmaXR0ZWROZXdHcmlkKTtcbiAgICAgIHZhciBmaXR0ZWRPbGRHcmlkID0gdGFpbG9yKGdyaWRBLCBzZWNvbmREZWx0YSwgZ2VuZXJhdG9yKTtcbiAgICAgIHJldHVybiBtYXAoZml0dGVkT2xkR3JpZCwgZnVuY3Rpb24gKGdyaWRSb3csIGkpIHtcbiAgICAgICAgdmFyIG5ld0NlbGxzID0gZ3JpZFJvdy5jZWxscygpLnNsaWNlKDAsIGluZGV4KS5jb25jYXQoZml0dGVkTmV3R3JpZFtpXS5jZWxscygpKS5jb25jYXQoZ3JpZFJvdy5jZWxscygpLnNsaWNlKGluZGV4LCBncmlkUm93LmNlbGxzKCkubGVuZ3RoKSk7XG4gICAgICAgIHJldHVybiBzZXRDZWxscyhncmlkUm93LCBuZXdDZWxscyk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBpbnNlcnRSb3dzID0gZnVuY3Rpb24gKGluZGV4LCBncmlkQSwgZ3JpZEIsIGdlbmVyYXRvciwgY29tcGFyYXRvcikge1xuICAgICAgc3BsaXRSb3dzKGdyaWRBLCBpbmRleCwgY29tcGFyYXRvciwgZ2VuZXJhdG9yLmNlbGwpO1xuICAgICAgdmFyIGRlbHRhID0gbWVhc3VyZVdpZHRoKGdyaWRCLCBncmlkQSk7XG4gICAgICB2YXIgZml0dGVkTmV3R3JpZCA9IHRhaWxvcihncmlkQiwgZGVsdGEsIGdlbmVyYXRvcik7XG4gICAgICB2YXIgc2Vjb25kRGVsdGEgPSBtZWFzdXJlV2lkdGgoZ3JpZEEsIGZpdHRlZE5ld0dyaWQpO1xuICAgICAgdmFyIGZpdHRlZE9sZEdyaWQgPSB0YWlsb3IoZ3JpZEEsIHNlY29uZERlbHRhLCBnZW5lcmF0b3IpO1xuICAgICAgcmV0dXJuIGZpdHRlZE9sZEdyaWQuc2xpY2UoMCwgaW5kZXgpLmNvbmNhdChmaXR0ZWROZXdHcmlkKS5jb25jYXQoZml0dGVkT2xkR3JpZC5zbGljZShpbmRleCwgZml0dGVkT2xkR3JpZC5sZW5ndGgpKTtcbiAgICB9O1xuXG4gICAgdmFyIGluc2VydFJvd0F0ID0gZnVuY3Rpb24gKGdyaWQsIGluZGV4LCBleGFtcGxlLCBjb21wYXJhdG9yLCBzdWJzdGl0dXRpb24pIHtcbiAgICAgIHZhciBiZWZvcmUgPSBncmlkLnNsaWNlKDAsIGluZGV4KTtcbiAgICAgIHZhciBhZnRlciA9IGdyaWQuc2xpY2UoaW5kZXgpO1xuICAgICAgdmFyIGJldHdlZW4gPSBtYXBDZWxscyhncmlkW2V4YW1wbGVdLCBmdW5jdGlvbiAoZXgsIGMpIHtcbiAgICAgICAgdmFyIHdpdGhpblNwYW4gPSBpbmRleCA+IDAgJiYgaW5kZXggPCBncmlkLmxlbmd0aCAmJiBjb21wYXJhdG9yKGdldENlbGxFbGVtZW50KGdyaWRbaW5kZXggLSAxXSwgYyksIGdldENlbGxFbGVtZW50KGdyaWRbaW5kZXhdLCBjKSk7XG4gICAgICAgIHZhciByZXQgPSB3aXRoaW5TcGFuID8gZ2V0Q2VsbChncmlkW2luZGV4XSwgYykgOiBlbGVtZW50bmV3KHN1YnN0aXR1dGlvbihleC5lbGVtZW50KCksIGNvbXBhcmF0b3IpLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGJlZm9yZS5jb25jYXQoW2JldHdlZW5dKS5jb25jYXQoYWZ0ZXIpO1xuICAgIH07XG4gICAgdmFyIGluc2VydENvbHVtbkF0ID0gZnVuY3Rpb24gKGdyaWQsIGluZGV4LCBleGFtcGxlLCBjb21wYXJhdG9yLCBzdWJzdGl0dXRpb24pIHtcbiAgICAgIHJldHVybiBtYXAoZ3JpZCwgZnVuY3Rpb24gKHJvdykge1xuICAgICAgICB2YXIgd2l0aGluU3BhbiA9IGluZGV4ID4gMCAmJiBpbmRleCA8IGNlbGxMZW5ndGgocm93KSAmJiBjb21wYXJhdG9yKGdldENlbGxFbGVtZW50KHJvdywgaW5kZXggLSAxKSwgZ2V0Q2VsbEVsZW1lbnQocm93LCBpbmRleCkpO1xuICAgICAgICB2YXIgc3ViID0gd2l0aGluU3BhbiA/IGdldENlbGwocm93LCBpbmRleCkgOiBlbGVtZW50bmV3KHN1YnN0aXR1dGlvbihnZXRDZWxsRWxlbWVudChyb3csIGV4YW1wbGUpLCBjb21wYXJhdG9yKSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBhZGRDZWxsKHJvdywgaW5kZXgsIHN1Yik7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBkZWxldGVDb2x1bW5zQXQgPSBmdW5jdGlvbiAoZ3JpZCwgc3RhcnQsIGZpbmlzaCkge1xuICAgICAgdmFyIHJvd3MgPSBtYXAoZ3JpZCwgZnVuY3Rpb24gKHJvdykge1xuICAgICAgICB2YXIgY2VsbHMgPSByb3cuY2VsbHMoKS5zbGljZSgwLCBzdGFydCkuY29uY2F0KHJvdy5jZWxscygpLnNsaWNlKGZpbmlzaCArIDEpKTtcbiAgICAgICAgcmV0dXJuIHJvd2NlbGxzKGNlbGxzLCByb3cuc2VjdGlvbigpKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZpbHRlcihyb3dzLCBmdW5jdGlvbiAocm93KSB7XG4gICAgICAgIHJldHVybiByb3cuY2VsbHMoKS5sZW5ndGggPiAwO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgZGVsZXRlUm93c0F0ID0gZnVuY3Rpb24gKGdyaWQsIHN0YXJ0LCBmaW5pc2gpIHtcbiAgICAgIHJldHVybiBncmlkLnNsaWNlKDAsIHN0YXJ0KS5jb25jYXQoZ3JpZC5zbGljZShmaW5pc2ggKyAxKSk7XG4gICAgfTtcblxuICAgIHZhciByZXBsYWNlSW4gPSBmdW5jdGlvbiAoZ3JpZCwgdGFyZ2V0cywgY29tcGFyYXRvciwgc3Vic3RpdHV0aW9uKSB7XG4gICAgICB2YXIgaXNUYXJnZXQgPSBmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICByZXR1cm4gZXhpc3RzKHRhcmdldHMsIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICByZXR1cm4gY29tcGFyYXRvcihjZWxsLmVsZW1lbnQoKSwgdGFyZ2V0LmVsZW1lbnQoKSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBtYXAoZ3JpZCwgZnVuY3Rpb24gKHJvdykge1xuICAgICAgICByZXR1cm4gbWFwQ2VsbHMocm93LCBmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICAgIHJldHVybiBpc1RhcmdldChjZWxsKSA/IGVsZW1lbnRuZXcoc3Vic3RpdHV0aW9uKGNlbGwuZWxlbWVudCgpLCBjb21wYXJhdG9yKSwgdHJ1ZSkgOiBjZWxsO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIG5vdFN0YXJ0Um93ID0gZnVuY3Rpb24gKGdyaWQsIHJvd0luZGV4LCBjb2xJbmRleCwgY29tcGFyYXRvcikge1xuICAgICAgcmV0dXJuIGdldENlbGxFbGVtZW50KGdyaWRbcm93SW5kZXhdLCBjb2xJbmRleCkgIT09IHVuZGVmaW5lZCAmJiAocm93SW5kZXggPiAwICYmIGNvbXBhcmF0b3IoZ2V0Q2VsbEVsZW1lbnQoZ3JpZFtyb3dJbmRleCAtIDFdLCBjb2xJbmRleCksIGdldENlbGxFbGVtZW50KGdyaWRbcm93SW5kZXhdLCBjb2xJbmRleCkpKTtcbiAgICB9O1xuICAgIHZhciBub3RTdGFydENvbHVtbiA9IGZ1bmN0aW9uIChyb3csIGluZGV4LCBjb21wYXJhdG9yKSB7XG4gICAgICByZXR1cm4gaW5kZXggPiAwICYmIGNvbXBhcmF0b3IoZ2V0Q2VsbEVsZW1lbnQocm93LCBpbmRleCAtIDEpLCBnZXRDZWxsRWxlbWVudChyb3csIGluZGV4KSk7XG4gICAgfTtcbiAgICB2YXIgcmVwbGFjZUNvbHVtbiA9IGZ1bmN0aW9uIChncmlkLCBpbmRleCwgY29tcGFyYXRvciwgc3Vic3RpdHV0aW9uKSB7XG4gICAgICB2YXIgdGFyZ2V0cyA9IGJpbmQoZ3JpZCwgZnVuY3Rpb24gKHJvdywgaSkge1xuICAgICAgICB2YXIgYWxyZWFkeUFkZGVkID0gbm90U3RhcnRSb3coZ3JpZCwgaSwgaW5kZXgsIGNvbXBhcmF0b3IpIHx8IG5vdFN0YXJ0Q29sdW1uKHJvdywgaW5kZXgsIGNvbXBhcmF0b3IpO1xuICAgICAgICByZXR1cm4gYWxyZWFkeUFkZGVkID8gW10gOiBbZ2V0Q2VsbChyb3csIGluZGV4KV07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXBsYWNlSW4oZ3JpZCwgdGFyZ2V0cywgY29tcGFyYXRvciwgc3Vic3RpdHV0aW9uKTtcbiAgICB9O1xuICAgIHZhciByZXBsYWNlUm93ID0gZnVuY3Rpb24gKGdyaWQsIGluZGV4LCBjb21wYXJhdG9yLCBzdWJzdGl0dXRpb24pIHtcbiAgICAgIHZhciB0YXJnZXRSb3cgPSBncmlkW2luZGV4XTtcbiAgICAgIHZhciB0YXJnZXRzID0gYmluZCh0YXJnZXRSb3cuY2VsbHMoKSwgZnVuY3Rpb24gKGl0ZW0sIGkpIHtcbiAgICAgICAgdmFyIGFscmVhZHlBZGRlZCA9IG5vdFN0YXJ0Um93KGdyaWQsIGluZGV4LCBpLCBjb21wYXJhdG9yKSB8fCBub3RTdGFydENvbHVtbih0YXJnZXRSb3csIGksIGNvbXBhcmF0b3IpO1xuICAgICAgICByZXR1cm4gYWxyZWFkeUFkZGVkID8gW10gOiBbaXRlbV07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXBsYWNlSW4oZ3JpZCwgdGFyZ2V0cywgY29tcGFyYXRvciwgc3Vic3RpdHV0aW9uKTtcbiAgICB9O1xuXG4gICAgdmFyIHZlcmlmeUdlbmVyYXRvcnMgPSBleGFjdGx5KFtcbiAgICAgICdjZWxsJyxcbiAgICAgICdyb3cnLFxuICAgICAgJ3JlcGxhY2UnLFxuICAgICAgJ2dhcCdcbiAgICBdKTtcbiAgICB2YXIgZWxlbWVudFRvRGF0YSA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICB2YXIgY29sc3BhbiA9IGdldEF0dHJWYWx1ZShlbGVtZW50LCAnY29sc3BhbicsIDEpO1xuICAgICAgdmFyIHJvd3NwYW4gPSBnZXRBdHRyVmFsdWUoZWxlbWVudCwgJ3Jvd3NwYW4nLCAxKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGVsZW1lbnQ6IGNvbnN0YW50KGVsZW1lbnQpLFxuICAgICAgICBjb2xzcGFuOiBjb25zdGFudChjb2xzcGFuKSxcbiAgICAgICAgcm93c3BhbjogY29uc3RhbnQocm93c3BhbilcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgbW9kaWZpY2F0aW9uID0gZnVuY3Rpb24gKGdlbmVyYXRvcnMsIHRvRGF0YSkge1xuICAgICAgaWYgKHRvRGF0YSA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHRvRGF0YSA9IGVsZW1lbnRUb0RhdGE7XG4gICAgICB9XG4gICAgICB2ZXJpZnlHZW5lcmF0b3JzKGdlbmVyYXRvcnMpO1xuICAgICAgdmFyIHBvc2l0aW9uID0gQ2VsbChPcHRpb24ubm9uZSgpKTtcbiAgICAgIHZhciBudSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBnZW5lcmF0b3JzLmNlbGwoZGF0YSk7XG4gICAgICB9O1xuICAgICAgdmFyIG51RnJvbSA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHZhciBkYXRhID0gdG9EYXRhKGVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gbnUoZGF0YSk7XG4gICAgICB9O1xuICAgICAgdmFyIGFkZCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHZhciByZXBsYWNlbWVudCA9IG51RnJvbShlbGVtZW50KTtcbiAgICAgICAgaWYgKHBvc2l0aW9uLmdldCgpLmlzTm9uZSgpKSB7XG4gICAgICAgICAgcG9zaXRpb24uc2V0KE9wdGlvbi5zb21lKHJlcGxhY2VtZW50KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVjZW50ID0gT3B0aW9uLnNvbWUoe1xuICAgICAgICAgIGl0ZW06IGVsZW1lbnQsXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHJlcGxhY2VtZW50XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVwbGFjZW1lbnQ7XG4gICAgICB9O1xuICAgICAgdmFyIHJlY2VudCA9IE9wdGlvbi5ub25lKCk7XG4gICAgICB2YXIgZ2V0T3JJbml0ID0gZnVuY3Rpb24gKGVsZW1lbnQsIGNvbXBhcmF0b3IpIHtcbiAgICAgICAgcmV0dXJuIHJlY2VudC5mb2xkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gYWRkKGVsZW1lbnQpO1xuICAgICAgICB9LCBmdW5jdGlvbiAocCkge1xuICAgICAgICAgIHJldHVybiBjb21wYXJhdG9yKGVsZW1lbnQsIHAuaXRlbSkgPyBwLnJlcGxhY2VtZW50IDogYWRkKGVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBnZXRPckluaXQ6IGdldE9ySW5pdCxcbiAgICAgICAgY3Vyc29yOiBwb3NpdGlvbi5nZXRcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgdHJhbnNmb3JtJDEgPSBmdW5jdGlvbiAoc2NvcGUsIHRhZykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChnZW5lcmF0b3JzKSB7XG4gICAgICAgIHZhciBwb3NpdGlvbiA9IENlbGwoT3B0aW9uLm5vbmUoKSk7XG4gICAgICAgIHZlcmlmeUdlbmVyYXRvcnMoZ2VuZXJhdG9ycyk7XG4gICAgICAgIHZhciBsaXN0ID0gW107XG4gICAgICAgIHZhciBmaW5kJDEgPSBmdW5jdGlvbiAoZWxlbWVudCwgY29tcGFyYXRvcikge1xuICAgICAgICAgIHJldHVybiBmaW5kKGxpc3QsIGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICByZXR1cm4gY29tcGFyYXRvcih4Lml0ZW0sIGVsZW1lbnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgbWFrZU5ldyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgdmFyIGF0dHJzID0geyBzY29wZTogc2NvcGUgfTtcbiAgICAgICAgICB2YXIgY2VsbCA9IGdlbmVyYXRvcnMucmVwbGFjZShlbGVtZW50LCB0YWcsIGF0dHJzKTtcbiAgICAgICAgICBsaXN0LnB1c2goe1xuICAgICAgICAgICAgaXRlbTogZWxlbWVudCxcbiAgICAgICAgICAgIHN1YjogY2VsbFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChwb3NpdGlvbi5nZXQoKS5pc05vbmUoKSkge1xuICAgICAgICAgICAgcG9zaXRpb24uc2V0KE9wdGlvbi5zb21lKGNlbGwpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGNlbGw7XG4gICAgICAgIH07XG4gICAgICAgIHZhciByZXBsYWNlT3JJbml0ID0gZnVuY3Rpb24gKGVsZW1lbnQsIGNvbXBhcmF0b3IpIHtcbiAgICAgICAgICByZXR1cm4gZmluZCQxKGVsZW1lbnQsIGNvbXBhcmF0b3IpLmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIG1ha2VOZXcoZWxlbWVudCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICAgIHJldHVybiBjb21wYXJhdG9yKGVsZW1lbnQsIHAuaXRlbSkgPyBwLnN1YiA6IG1ha2VOZXcoZWxlbWVudCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcmVwbGFjZU9ySW5pdDogcmVwbGFjZU9ySW5pdCxcbiAgICAgICAgICBjdXJzb3I6IHBvc2l0aW9uLmdldFxuICAgICAgICB9O1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBtZXJnaW5nID0gZnVuY3Rpb24gKGdlbmVyYXRvcnMpIHtcbiAgICAgIHZlcmlmeUdlbmVyYXRvcnMoZ2VuZXJhdG9ycyk7XG4gICAgICB2YXIgcG9zaXRpb24gPSBDZWxsKE9wdGlvbi5ub25lKCkpO1xuICAgICAgdmFyIGNvbWJpbmUgPSBmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICBpZiAocG9zaXRpb24uZ2V0KCkuaXNOb25lKCkpIHtcbiAgICAgICAgICBwb3NpdGlvbi5zZXQoT3B0aW9uLnNvbWUoY2VsbCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIHJhdyA9IGdlbmVyYXRvcnMuY2VsbCh7XG4gICAgICAgICAgICBlbGVtZW50OiBjb25zdGFudChjZWxsKSxcbiAgICAgICAgICAgIGNvbHNwYW46IGNvbnN0YW50KDEpLFxuICAgICAgICAgICAgcm93c3BhbjogY29uc3RhbnQoMSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZW1vdmUkMShyYXcsICd3aWR0aCcpO1xuICAgICAgICAgIHJlbW92ZSQxKGNlbGwsICd3aWR0aCcpO1xuICAgICAgICAgIHJldHVybiByYXc7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29tYmluZTogY29tYmluZSxcbiAgICAgICAgY3Vyc29yOiBwb3NpdGlvbi5nZXRcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgR2VuZXJhdG9ycyA9IHtcbiAgICAgIG1vZGlmaWNhdGlvbjogbW9kaWZpY2F0aW9uLFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2Zvcm0kMSxcbiAgICAgIG1lcmdpbmc6IG1lcmdpbmdcbiAgICB9O1xuXG4gICAgdmFyIGJsb2NrTGlzdCA9IFtcbiAgICAgICdib2R5JyxcbiAgICAgICdwJyxcbiAgICAgICdkaXYnLFxuICAgICAgJ2FydGljbGUnLFxuICAgICAgJ2FzaWRlJyxcbiAgICAgICdmaWdjYXB0aW9uJyxcbiAgICAgICdmaWd1cmUnLFxuICAgICAgJ2Zvb3RlcicsXG4gICAgICAnaGVhZGVyJyxcbiAgICAgICduYXYnLFxuICAgICAgJ3NlY3Rpb24nLFxuICAgICAgJ29sJyxcbiAgICAgICd1bCcsXG4gICAgICAndGFibGUnLFxuICAgICAgJ3RoZWFkJyxcbiAgICAgICd0Zm9vdCcsXG4gICAgICAndGJvZHknLFxuICAgICAgJ2NhcHRpb24nLFxuICAgICAgJ3RyJyxcbiAgICAgICd0ZCcsXG4gICAgICAndGgnLFxuICAgICAgJ2gxJyxcbiAgICAgICdoMicsXG4gICAgICAnaDMnLFxuICAgICAgJ2g0JyxcbiAgICAgICdoNScsXG4gICAgICAnaDYnLFxuICAgICAgJ2Jsb2NrcXVvdGUnLFxuICAgICAgJ3ByZScsXG4gICAgICAnYWRkcmVzcydcbiAgICBdO1xuICAgIHZhciBpc0xpc3QgPSBmdW5jdGlvbiAodW5pdmVyc2UsIGl0ZW0pIHtcbiAgICAgIHZhciB0YWdOYW1lID0gdW5pdmVyc2UucHJvcGVydHkoKS5uYW1lKGl0ZW0pO1xuICAgICAgcmV0dXJuIGNvbnRhaW5zKFtcbiAgICAgICAgJ29sJyxcbiAgICAgICAgJ3VsJ1xuICAgICAgXSwgdGFnTmFtZSk7XG4gICAgfTtcbiAgICB2YXIgaXNCbG9jayA9IGZ1bmN0aW9uICh1bml2ZXJzZSwgaXRlbSkge1xuICAgICAgdmFyIHRhZ05hbWUgPSB1bml2ZXJzZS5wcm9wZXJ0eSgpLm5hbWUoaXRlbSk7XG4gICAgICByZXR1cm4gY29udGFpbnMoYmxvY2tMaXN0LCB0YWdOYW1lKTtcbiAgICB9O1xuICAgIHZhciBpc0VtcHR5VGFnID0gZnVuY3Rpb24gKHVuaXZlcnNlLCBpdGVtKSB7XG4gICAgICByZXR1cm4gY29udGFpbnMoW1xuICAgICAgICAnYnInLFxuICAgICAgICAnaW1nJyxcbiAgICAgICAgJ2hyJyxcbiAgICAgICAgJ2lucHV0J1xuICAgICAgXSwgdW5pdmVyc2UucHJvcGVydHkoKS5uYW1lKGl0ZW0pKTtcbiAgICB9O1xuXG4gICAgdmFyIHVuaXZlcnNlJDIgPSBEb21Vbml2ZXJzZSgpO1xuICAgIHZhciBpc0Jsb2NrJDEgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIGlzQmxvY2sodW5pdmVyc2UkMiwgZWxlbWVudCk7XG4gICAgfTtcbiAgICB2YXIgaXNMaXN0JDEgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIGlzTGlzdCh1bml2ZXJzZSQyLCBlbGVtZW50KTtcbiAgICB9O1xuICAgIHZhciBpc0VtcHR5VGFnJDEgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIGlzRW1wdHlUYWcodW5pdmVyc2UkMiwgZWxlbWVudCk7XG4gICAgfTtcblxuICAgIHZhciBtZXJnZSQyID0gZnVuY3Rpb24gKGNlbGxzKSB7XG4gICAgICB2YXIgaXNCciA9IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICByZXR1cm4gbmFtZShlbCkgPT09ICdicic7XG4gICAgICB9O1xuICAgICAgdmFyIGFkdmFuY2VkQnIgPSBmdW5jdGlvbiAoY2hpbGRyZW4pIHtcbiAgICAgICAgcmV0dXJuIGZvcmFsbChjaGlsZHJlbiwgZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICByZXR1cm4gaXNCcihjKSB8fCBpc1RleHQoYykgJiYgZ2V0JDMoYykudHJpbSgpLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgdmFyIGlzTGlzdEl0ZW0gPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgcmV0dXJuIG5hbWUoZWwpID09PSAnbGknIHx8IGFuY2VzdG9yKGVsLCBpc0xpc3QkMSkuaXNTb21lKCk7XG4gICAgICB9O1xuICAgICAgdmFyIHNpYmxpbmdJc0Jsb2NrID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIHJldHVybiBuZXh0U2libGluZyhlbCkubWFwKGZ1bmN0aW9uIChyaWdodFNpYmxpbmcpIHtcbiAgICAgICAgICBpZiAoaXNCbG9jayQxKHJpZ2h0U2libGluZykpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaXNFbXB0eVRhZyQxKHJpZ2h0U2libGluZykpIHtcbiAgICAgICAgICAgIHJldHVybiBuYW1lKHJpZ2h0U2libGluZykgPT09ICdpbWcnID8gZmFsc2UgOiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pLmdldE9yKGZhbHNlKTtcbiAgICAgIH07XG4gICAgICB2YXIgbWFya0NlbGwgPSBmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICByZXR1cm4gbGFzdCQxKGNlbGwpLmJpbmQoZnVuY3Rpb24gKHJpZ2h0RWRnZSkge1xuICAgICAgICAgIHZhciByaWdodFNpYmxpbmdJc0Jsb2NrID0gc2libGluZ0lzQmxvY2socmlnaHRFZGdlKTtcbiAgICAgICAgICByZXR1cm4gcGFyZW50KHJpZ2h0RWRnZSkubWFwKGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiByaWdodFNpYmxpbmdJc0Jsb2NrID09PSB0cnVlIHx8IGlzTGlzdEl0ZW0ocGFyZW50KSB8fCBpc0JyKHJpZ2h0RWRnZSkgfHwgaXNCbG9jayQxKHBhcmVudCkgJiYgIWVxKGNlbGwsIHBhcmVudCkgPyBbXSA6IFtFbGVtZW50LmZyb21UYWcoJ2JyJyldO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KS5nZXRPcihbXSk7XG4gICAgICB9O1xuICAgICAgdmFyIG1hcmtDb250ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29udGVudCA9IGJpbmQoY2VsbHMsIGZ1bmN0aW9uIChjZWxsKSB7XG4gICAgICAgICAgdmFyIGNoaWxkcmVuJDEgPSBjaGlsZHJlbihjZWxsKTtcbiAgICAgICAgICByZXR1cm4gYWR2YW5jZWRCcihjaGlsZHJlbiQxKSA/IFtdIDogY2hpbGRyZW4kMS5jb25jYXQobWFya0NlbGwoY2VsbCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQubGVuZ3RoID09PSAwID8gW0VsZW1lbnQuZnJvbVRhZygnYnInKV0gOiBjb250ZW50O1xuICAgICAgfTtcbiAgICAgIHZhciBjb250ZW50cyA9IG1hcmtDb250ZW50KCk7XG4gICAgICBlbXB0eShjZWxsc1swXSk7XG4gICAgICBhcHBlbmQkMShjZWxsc1swXSwgY29udGVudHMpO1xuICAgIH07XG5cbiAgICB2YXIgcHJ1bmUgPSBmdW5jdGlvbiAodGFibGUpIHtcbiAgICAgIHZhciBjZWxscyQxID0gY2VsbHModGFibGUpO1xuICAgICAgaWYgKGNlbGxzJDEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJlbW92ZSQyKHRhYmxlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBvdXRjb21lID0gZnVuY3Rpb24gKGdyaWQsIGN1cnNvcikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZ3JpZDogY29uc3RhbnQoZ3JpZCksXG4gICAgICAgIGN1cnNvcjogY29uc3RhbnQoY3Vyc29yKVxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBlbGVtZW50RnJvbUdyaWQgPSBmdW5jdGlvbiAoZ3JpZCwgcm93LCBjb2x1bW4pIHtcbiAgICAgIHJldHVybiBmaW5kSW4oZ3JpZCwgcm93LCBjb2x1bW4pLm9yVGh1bmsoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZmluZEluKGdyaWQsIDAsIDApO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgZmluZEluID0gZnVuY3Rpb24gKGdyaWQsIHJvdywgY29sdW1uKSB7XG4gICAgICByZXR1cm4gT3B0aW9uLmZyb20oZ3JpZFtyb3ddKS5iaW5kKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgIHJldHVybiBPcHRpb24uZnJvbShyLmNlbGxzKClbY29sdW1uXSkuYmluZChmdW5jdGlvbiAoYykge1xuICAgICAgICAgIHJldHVybiBPcHRpb24uZnJvbShjLmVsZW1lbnQoKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgYnVuZGxlID0gZnVuY3Rpb24gKGdyaWQsIHJvdywgY29sdW1uKSB7XG4gICAgICByZXR1cm4gb3V0Y29tZShncmlkLCBmaW5kSW4oZ3JpZCwgcm93LCBjb2x1bW4pKTtcbiAgICB9O1xuICAgIHZhciB1bmlxdWVSb3dzID0gZnVuY3Rpb24gKGRldGFpbHMpIHtcbiAgICAgIHJldHVybiBmb2xkbChkZXRhaWxzLCBmdW5jdGlvbiAocmVzdCwgZGV0YWlsKSB7XG4gICAgICAgIHJldHVybiBleGlzdHMocmVzdCwgZnVuY3Rpb24gKGN1cnJlbnREZXRhaWwpIHtcbiAgICAgICAgICByZXR1cm4gY3VycmVudERldGFpbC5yb3coKSA9PT0gZGV0YWlsLnJvdygpO1xuICAgICAgICB9KSA/IHJlc3QgOiByZXN0LmNvbmNhdChbZGV0YWlsXSk7XG4gICAgICB9LCBbXSkuc29ydChmdW5jdGlvbiAoZGV0YWlsQSwgZGV0YWlsQikge1xuICAgICAgICByZXR1cm4gZGV0YWlsQS5yb3coKSAtIGRldGFpbEIucm93KCk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciB1bmlxdWVDb2x1bW5zID0gZnVuY3Rpb24gKGRldGFpbHMpIHtcbiAgICAgIHJldHVybiBmb2xkbChkZXRhaWxzLCBmdW5jdGlvbiAocmVzdCwgZGV0YWlsKSB7XG4gICAgICAgIHJldHVybiBleGlzdHMocmVzdCwgZnVuY3Rpb24gKGN1cnJlbnREZXRhaWwpIHtcbiAgICAgICAgICByZXR1cm4gY3VycmVudERldGFpbC5jb2x1bW4oKSA9PT0gZGV0YWlsLmNvbHVtbigpO1xuICAgICAgICB9KSA/IHJlc3QgOiByZXN0LmNvbmNhdChbZGV0YWlsXSk7XG4gICAgICB9LCBbXSkuc29ydChmdW5jdGlvbiAoZGV0YWlsQSwgZGV0YWlsQikge1xuICAgICAgICByZXR1cm4gZGV0YWlsQS5jb2x1bW4oKSAtIGRldGFpbEIuY29sdW1uKCk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBvcEluc2VydFJvd3NCZWZvcmUgPSBmdW5jdGlvbiAoZ3JpZCwgZGV0YWlscywgY29tcGFyYXRvciwgZ2VuV3JhcHBlcnMpIHtcbiAgICAgIHZhciBleGFtcGxlID0gZGV0YWlsc1swXS5yb3coKTtcbiAgICAgIHZhciB0YXJnZXRJbmRleCA9IGRldGFpbHNbMF0ucm93KCk7XG4gICAgICB2YXIgcm93cyA9IHVuaXF1ZVJvd3MoZGV0YWlscyk7XG4gICAgICB2YXIgbmV3R3JpZCA9IGZvbGRsKHJvd3MsIGZ1bmN0aW9uIChuZXdHLCBfcm93KSB7XG4gICAgICAgIHJldHVybiBpbnNlcnRSb3dBdChuZXdHLCB0YXJnZXRJbmRleCwgZXhhbXBsZSwgY29tcGFyYXRvciwgZ2VuV3JhcHBlcnMuZ2V0T3JJbml0KTtcbiAgICAgIH0sIGdyaWQpO1xuICAgICAgcmV0dXJuIGJ1bmRsZShuZXdHcmlkLCB0YXJnZXRJbmRleCwgZGV0YWlsc1swXS5jb2x1bW4oKSk7XG4gICAgfTtcbiAgICB2YXIgb3BJbnNlcnRSb3dzQWZ0ZXIgPSBmdW5jdGlvbiAoZ3JpZCwgZGV0YWlscywgY29tcGFyYXRvciwgZ2VuV3JhcHBlcnMpIHtcbiAgICAgIHZhciByb3dzID0gdW5pcXVlUm93cyhkZXRhaWxzKTtcbiAgICAgIHZhciBleGFtcGxlID0gcm93c1tyb3dzLmxlbmd0aCAtIDFdLnJvdygpO1xuICAgICAgdmFyIHRhcmdldEluZGV4ID0gcm93c1tyb3dzLmxlbmd0aCAtIDFdLnJvdygpICsgcm93c1tyb3dzLmxlbmd0aCAtIDFdLnJvd3NwYW4oKTtcbiAgICAgIHZhciBuZXdHcmlkID0gZm9sZGwocm93cywgZnVuY3Rpb24gKG5ld0csIF9yb3cpIHtcbiAgICAgICAgcmV0dXJuIGluc2VydFJvd0F0KG5ld0csIHRhcmdldEluZGV4LCBleGFtcGxlLCBjb21wYXJhdG9yLCBnZW5XcmFwcGVycy5nZXRPckluaXQpO1xuICAgICAgfSwgZ3JpZCk7XG4gICAgICByZXR1cm4gYnVuZGxlKG5ld0dyaWQsIHRhcmdldEluZGV4LCBkZXRhaWxzWzBdLmNvbHVtbigpKTtcbiAgICB9O1xuICAgIHZhciBvcEluc2VydENvbHVtbnNCZWZvcmUgPSBmdW5jdGlvbiAoZ3JpZCwgZGV0YWlscywgY29tcGFyYXRvciwgZ2VuV3JhcHBlcnMpIHtcbiAgICAgIHZhciBjb2x1bW5zID0gdW5pcXVlQ29sdW1ucyhkZXRhaWxzKTtcbiAgICAgIHZhciBleGFtcGxlID0gY29sdW1uc1swXS5jb2x1bW4oKTtcbiAgICAgIHZhciB0YXJnZXRJbmRleCA9IGNvbHVtbnNbMF0uY29sdW1uKCk7XG4gICAgICB2YXIgbmV3R3JpZCA9IGZvbGRsKGNvbHVtbnMsIGZ1bmN0aW9uIChuZXdHLCBfcm93KSB7XG4gICAgICAgIHJldHVybiBpbnNlcnRDb2x1bW5BdChuZXdHLCB0YXJnZXRJbmRleCwgZXhhbXBsZSwgY29tcGFyYXRvciwgZ2VuV3JhcHBlcnMuZ2V0T3JJbml0KTtcbiAgICAgIH0sIGdyaWQpO1xuICAgICAgcmV0dXJuIGJ1bmRsZShuZXdHcmlkLCBkZXRhaWxzWzBdLnJvdygpLCB0YXJnZXRJbmRleCk7XG4gICAgfTtcbiAgICB2YXIgb3BJbnNlcnRDb2x1bW5zQWZ0ZXIgPSBmdW5jdGlvbiAoZ3JpZCwgZGV0YWlscywgY29tcGFyYXRvciwgZ2VuV3JhcHBlcnMpIHtcbiAgICAgIHZhciBleGFtcGxlID0gZGV0YWlsc1tkZXRhaWxzLmxlbmd0aCAtIDFdLmNvbHVtbigpO1xuICAgICAgdmFyIHRhcmdldEluZGV4ID0gZGV0YWlsc1tkZXRhaWxzLmxlbmd0aCAtIDFdLmNvbHVtbigpICsgZGV0YWlsc1tkZXRhaWxzLmxlbmd0aCAtIDFdLmNvbHNwYW4oKTtcbiAgICAgIHZhciBjb2x1bW5zID0gdW5pcXVlQ29sdW1ucyhkZXRhaWxzKTtcbiAgICAgIHZhciBuZXdHcmlkID0gZm9sZGwoY29sdW1ucywgZnVuY3Rpb24gKG5ld0csIF9yb3cpIHtcbiAgICAgICAgcmV0dXJuIGluc2VydENvbHVtbkF0KG5ld0csIHRhcmdldEluZGV4LCBleGFtcGxlLCBjb21wYXJhdG9yLCBnZW5XcmFwcGVycy5nZXRPckluaXQpO1xuICAgICAgfSwgZ3JpZCk7XG4gICAgICByZXR1cm4gYnVuZGxlKG5ld0dyaWQsIGRldGFpbHNbMF0ucm93KCksIHRhcmdldEluZGV4KTtcbiAgICB9O1xuICAgIHZhciBvcE1ha2VSb3dIZWFkZXIgPSBmdW5jdGlvbiAoZ3JpZCwgZGV0YWlsLCBjb21wYXJhdG9yLCBnZW5XcmFwcGVycykge1xuICAgICAgdmFyIG5ld0dyaWQgPSByZXBsYWNlUm93KGdyaWQsIGRldGFpbC5yb3coKSwgY29tcGFyYXRvciwgZ2VuV3JhcHBlcnMucmVwbGFjZU9ySW5pdCk7XG4gICAgICByZXR1cm4gYnVuZGxlKG5ld0dyaWQsIGRldGFpbC5yb3coKSwgZGV0YWlsLmNvbHVtbigpKTtcbiAgICB9O1xuICAgIHZhciBvcE1ha2VDb2x1bW5IZWFkZXIgPSBmdW5jdGlvbiAoZ3JpZCwgZGV0YWlsLCBjb21wYXJhdG9yLCBnZW5XcmFwcGVycykge1xuICAgICAgdmFyIG5ld0dyaWQgPSByZXBsYWNlQ29sdW1uKGdyaWQsIGRldGFpbC5jb2x1bW4oKSwgY29tcGFyYXRvciwgZ2VuV3JhcHBlcnMucmVwbGFjZU9ySW5pdCk7XG4gICAgICByZXR1cm4gYnVuZGxlKG5ld0dyaWQsIGRldGFpbC5yb3coKSwgZGV0YWlsLmNvbHVtbigpKTtcbiAgICB9O1xuICAgIHZhciBvcFVubWFrZVJvd0hlYWRlciA9IGZ1bmN0aW9uIChncmlkLCBkZXRhaWwsIGNvbXBhcmF0b3IsIGdlbldyYXBwZXJzKSB7XG4gICAgICB2YXIgbmV3R3JpZCA9IHJlcGxhY2VSb3coZ3JpZCwgZGV0YWlsLnJvdygpLCBjb21wYXJhdG9yLCBnZW5XcmFwcGVycy5yZXBsYWNlT3JJbml0KTtcbiAgICAgIHJldHVybiBidW5kbGUobmV3R3JpZCwgZGV0YWlsLnJvdygpLCBkZXRhaWwuY29sdW1uKCkpO1xuICAgIH07XG4gICAgdmFyIG9wVW5tYWtlQ29sdW1uSGVhZGVyID0gZnVuY3Rpb24gKGdyaWQsIGRldGFpbCwgY29tcGFyYXRvciwgZ2VuV3JhcHBlcnMpIHtcbiAgICAgIHZhciBuZXdHcmlkID0gcmVwbGFjZUNvbHVtbihncmlkLCBkZXRhaWwuY29sdW1uKCksIGNvbXBhcmF0b3IsIGdlbldyYXBwZXJzLnJlcGxhY2VPckluaXQpO1xuICAgICAgcmV0dXJuIGJ1bmRsZShuZXdHcmlkLCBkZXRhaWwucm93KCksIGRldGFpbC5jb2x1bW4oKSk7XG4gICAgfTtcbiAgICB2YXIgb3BFcmFzZUNvbHVtbnMgPSBmdW5jdGlvbiAoZ3JpZCwgZGV0YWlscywgX2NvbXBhcmF0b3IsIF9nZW5XcmFwcGVycykge1xuICAgICAgdmFyIGNvbHVtbnMgPSB1bmlxdWVDb2x1bW5zKGRldGFpbHMpO1xuICAgICAgdmFyIG5ld0dyaWQgPSBkZWxldGVDb2x1bW5zQXQoZ3JpZCwgY29sdW1uc1swXS5jb2x1bW4oKSwgY29sdW1uc1tjb2x1bW5zLmxlbmd0aCAtIDFdLmNvbHVtbigpKTtcbiAgICAgIHZhciBjdXJzb3IgPSBlbGVtZW50RnJvbUdyaWQobmV3R3JpZCwgZGV0YWlsc1swXS5yb3coKSwgZGV0YWlsc1swXS5jb2x1bW4oKSk7XG4gICAgICByZXR1cm4gb3V0Y29tZShuZXdHcmlkLCBjdXJzb3IpO1xuICAgIH07XG4gICAgdmFyIG9wRXJhc2VSb3dzID0gZnVuY3Rpb24gKGdyaWQsIGRldGFpbHMsIF9jb21wYXJhdG9yLCBfZ2VuV3JhcHBlcnMpIHtcbiAgICAgIHZhciByb3dzID0gdW5pcXVlUm93cyhkZXRhaWxzKTtcbiAgICAgIHZhciBuZXdHcmlkID0gZGVsZXRlUm93c0F0KGdyaWQsIHJvd3NbMF0ucm93KCksIHJvd3Nbcm93cy5sZW5ndGggLSAxXS5yb3coKSk7XG4gICAgICB2YXIgY3Vyc29yID0gZWxlbWVudEZyb21HcmlkKG5ld0dyaWQsIGRldGFpbHNbMF0ucm93KCksIGRldGFpbHNbMF0uY29sdW1uKCkpO1xuICAgICAgcmV0dXJuIG91dGNvbWUobmV3R3JpZCwgY3Vyc29yKTtcbiAgICB9O1xuICAgIHZhciBvcE1lcmdlQ2VsbHMgPSBmdW5jdGlvbiAoZ3JpZCwgbWVyZ2FibGUsIGNvbXBhcmF0b3IsIF9nZW5XcmFwcGVycykge1xuICAgICAgdmFyIGNlbGxzID0gbWVyZ2FibGUuY2VsbHMoKTtcbiAgICAgIG1lcmdlJDIoY2VsbHMpO1xuICAgICAgdmFyIG5ld0dyaWQgPSBtZXJnZShncmlkLCBtZXJnYWJsZS5ib3VuZHMoKSwgY29tcGFyYXRvciwgY29uc3RhbnQoY2VsbHNbMF0pKTtcbiAgICAgIHJldHVybiBvdXRjb21lKG5ld0dyaWQsIE9wdGlvbi5mcm9tKGNlbGxzWzBdKSk7XG4gICAgfTtcbiAgICB2YXIgb3BVbm1lcmdlQ2VsbHMgPSBmdW5jdGlvbiAoZ3JpZCwgdW5tZXJnYWJsZSwgY29tcGFyYXRvciwgZ2VuV3JhcHBlcnMpIHtcbiAgICAgIHZhciBuZXdHcmlkID0gZm9sZHIodW5tZXJnYWJsZSwgZnVuY3Rpb24gKGIsIGNlbGwpIHtcbiAgICAgICAgcmV0dXJuIHVubWVyZ2UoYiwgY2VsbCwgY29tcGFyYXRvciwgZ2VuV3JhcHBlcnMuY29tYmluZShjZWxsKSk7XG4gICAgICB9LCBncmlkKTtcbiAgICAgIHJldHVybiBvdXRjb21lKG5ld0dyaWQsIE9wdGlvbi5mcm9tKHVubWVyZ2FibGVbMF0pKTtcbiAgICB9O1xuICAgIHZhciBvcFBhc3RlQ2VsbHMgPSBmdW5jdGlvbiAoZ3JpZCwgcGFzdGVEZXRhaWxzLCBjb21wYXJhdG9yLCBfZ2VuV3JhcHBlcnMpIHtcbiAgICAgIHZhciBncmlkaWZ5ID0gZnVuY3Rpb24gKHRhYmxlLCBnZW5lcmF0b3JzKSB7XG4gICAgICAgIHZhciB3aCA9IFdhcmVob3VzZS5mcm9tVGFibGUodGFibGUpO1xuICAgICAgICByZXR1cm4gdG9HcmlkKHdoLCBnZW5lcmF0b3JzLCB0cnVlKTtcbiAgICAgIH07XG4gICAgICB2YXIgZ3JpZEIgPSBncmlkaWZ5KHBhc3RlRGV0YWlscy5jbGlwYm9hcmQoKSwgcGFzdGVEZXRhaWxzLmdlbmVyYXRvcnMoKSk7XG4gICAgICB2YXIgc3RhcnRBZGRyZXNzID0gYWRkcmVzcyhwYXN0ZURldGFpbHMucm93KCksIHBhc3RlRGV0YWlscy5jb2x1bW4oKSk7XG4gICAgICB2YXIgbWVyZ2VkR3JpZCA9IG1lcmdlJDEoc3RhcnRBZGRyZXNzLCBncmlkLCBncmlkQiwgcGFzdGVEZXRhaWxzLmdlbmVyYXRvcnMoKSwgY29tcGFyYXRvcik7XG4gICAgICByZXR1cm4gbWVyZ2VkR3JpZC5mb2xkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG91dGNvbWUoZ3JpZCwgT3B0aW9uLnNvbWUocGFzdGVEZXRhaWxzLmVsZW1lbnQoKSkpO1xuICAgICAgfSwgZnVuY3Rpb24gKG51R3JpZCkge1xuICAgICAgICB2YXIgY3Vyc29yID0gZWxlbWVudEZyb21HcmlkKG51R3JpZCwgcGFzdGVEZXRhaWxzLnJvdygpLCBwYXN0ZURldGFpbHMuY29sdW1uKCkpO1xuICAgICAgICByZXR1cm4gb3V0Y29tZShudUdyaWQsIGN1cnNvcik7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBncmlkaWZ5Um93cyA9IGZ1bmN0aW9uIChyb3dzLCBnZW5lcmF0b3JzLCBleGFtcGxlKSB7XG4gICAgICB2YXIgcGFzdGVEZXRhaWxzID0gZnJvbVBhc3RlZFJvd3Mocm93cywgZXhhbXBsZSk7XG4gICAgICB2YXIgd2ggPSBXYXJlaG91c2UuZ2VuZXJhdGUocGFzdGVEZXRhaWxzKTtcbiAgICAgIHJldHVybiB0b0dyaWQod2gsIGdlbmVyYXRvcnMsIHRydWUpO1xuICAgIH07XG4gICAgdmFyIG9wUGFzdGVDb2xzQmVmb3JlID0gZnVuY3Rpb24gKGdyaWQsIHBhc3RlRGV0YWlscywgY29tcGFyYXRvciwgX2dlbldyYXBwZXJzKSB7XG4gICAgICB2YXIgZXhhbXBsZSA9IGdyaWRbcGFzdGVEZXRhaWxzLmNlbGxzWzBdLnJvdygpXTtcbiAgICAgIHZhciBpbmRleCA9IHBhc3RlRGV0YWlscy5jZWxsc1swXS5jb2x1bW4oKTtcbiAgICAgIHZhciBncmlkQiA9IGdyaWRpZnlSb3dzKHBhc3RlRGV0YWlscy5jbGlwYm9hcmQoKSwgcGFzdGVEZXRhaWxzLmdlbmVyYXRvcnMoKSwgZXhhbXBsZSk7XG4gICAgICB2YXIgbWVyZ2VkR3JpZCA9IGluc2VydENvbHMoaW5kZXgsIGdyaWQsIGdyaWRCLCBwYXN0ZURldGFpbHMuZ2VuZXJhdG9ycygpLCBjb21wYXJhdG9yKTtcbiAgICAgIHZhciBjdXJzb3IgPSBlbGVtZW50RnJvbUdyaWQobWVyZ2VkR3JpZCwgcGFzdGVEZXRhaWxzLmNlbGxzWzBdLnJvdygpLCBwYXN0ZURldGFpbHMuY2VsbHNbMF0uY29sdW1uKCkpO1xuICAgICAgcmV0dXJuIG91dGNvbWUobWVyZ2VkR3JpZCwgY3Vyc29yKTtcbiAgICB9O1xuICAgIHZhciBvcFBhc3RlQ29sc0FmdGVyID0gZnVuY3Rpb24gKGdyaWQsIHBhc3RlRGV0YWlscywgY29tcGFyYXRvciwgX2dlbldyYXBwZXJzKSB7XG4gICAgICB2YXIgZXhhbXBsZSA9IGdyaWRbcGFzdGVEZXRhaWxzLmNlbGxzWzBdLnJvdygpXTtcbiAgICAgIHZhciBpbmRleCA9IHBhc3RlRGV0YWlscy5jZWxsc1twYXN0ZURldGFpbHMuY2VsbHMubGVuZ3RoIC0gMV0uY29sdW1uKCkgKyBwYXN0ZURldGFpbHMuY2VsbHNbcGFzdGVEZXRhaWxzLmNlbGxzLmxlbmd0aCAtIDFdLmNvbHNwYW4oKTtcbiAgICAgIHZhciBncmlkQiA9IGdyaWRpZnlSb3dzKHBhc3RlRGV0YWlscy5jbGlwYm9hcmQoKSwgcGFzdGVEZXRhaWxzLmdlbmVyYXRvcnMoKSwgZXhhbXBsZSk7XG4gICAgICB2YXIgbWVyZ2VkR3JpZCA9IGluc2VydENvbHMoaW5kZXgsIGdyaWQsIGdyaWRCLCBwYXN0ZURldGFpbHMuZ2VuZXJhdG9ycygpLCBjb21wYXJhdG9yKTtcbiAgICAgIHZhciBjdXJzb3IgPSBlbGVtZW50RnJvbUdyaWQobWVyZ2VkR3JpZCwgcGFzdGVEZXRhaWxzLmNlbGxzWzBdLnJvdygpLCBwYXN0ZURldGFpbHMuY2VsbHNbMF0uY29sdW1uKCkpO1xuICAgICAgcmV0dXJuIG91dGNvbWUobWVyZ2VkR3JpZCwgY3Vyc29yKTtcbiAgICB9O1xuICAgIHZhciBvcFBhc3RlUm93c0JlZm9yZSA9IGZ1bmN0aW9uIChncmlkLCBwYXN0ZURldGFpbHMsIGNvbXBhcmF0b3IsIF9nZW5XcmFwcGVycykge1xuICAgICAgdmFyIGV4YW1wbGUgPSBncmlkW3Bhc3RlRGV0YWlscy5jZWxsc1swXS5yb3coKV07XG4gICAgICB2YXIgaW5kZXggPSBwYXN0ZURldGFpbHMuY2VsbHNbMF0ucm93KCk7XG4gICAgICB2YXIgZ3JpZEIgPSBncmlkaWZ5Um93cyhwYXN0ZURldGFpbHMuY2xpcGJvYXJkKCksIHBhc3RlRGV0YWlscy5nZW5lcmF0b3JzKCksIGV4YW1wbGUpO1xuICAgICAgdmFyIG1lcmdlZEdyaWQgPSBpbnNlcnRSb3dzKGluZGV4LCBncmlkLCBncmlkQiwgcGFzdGVEZXRhaWxzLmdlbmVyYXRvcnMoKSwgY29tcGFyYXRvcik7XG4gICAgICB2YXIgY3Vyc29yID0gZWxlbWVudEZyb21HcmlkKG1lcmdlZEdyaWQsIHBhc3RlRGV0YWlscy5jZWxsc1swXS5yb3coKSwgcGFzdGVEZXRhaWxzLmNlbGxzWzBdLmNvbHVtbigpKTtcbiAgICAgIHJldHVybiBvdXRjb21lKG1lcmdlZEdyaWQsIGN1cnNvcik7XG4gICAgfTtcbiAgICB2YXIgb3BQYXN0ZVJvd3NBZnRlciA9IGZ1bmN0aW9uIChncmlkLCBwYXN0ZURldGFpbHMsIGNvbXBhcmF0b3IsIF9nZW5XcmFwcGVycykge1xuICAgICAgdmFyIGV4YW1wbGUgPSBncmlkW3Bhc3RlRGV0YWlscy5jZWxsc1swXS5yb3coKV07XG4gICAgICB2YXIgaW5kZXggPSBwYXN0ZURldGFpbHMuY2VsbHNbcGFzdGVEZXRhaWxzLmNlbGxzLmxlbmd0aCAtIDFdLnJvdygpICsgcGFzdGVEZXRhaWxzLmNlbGxzW3Bhc3RlRGV0YWlscy5jZWxscy5sZW5ndGggLSAxXS5yb3dzcGFuKCk7XG4gICAgICB2YXIgZ3JpZEIgPSBncmlkaWZ5Um93cyhwYXN0ZURldGFpbHMuY2xpcGJvYXJkKCksIHBhc3RlRGV0YWlscy5nZW5lcmF0b3JzKCksIGV4YW1wbGUpO1xuICAgICAgdmFyIG1lcmdlZEdyaWQgPSBpbnNlcnRSb3dzKGluZGV4LCBncmlkLCBncmlkQiwgcGFzdGVEZXRhaWxzLmdlbmVyYXRvcnMoKSwgY29tcGFyYXRvcik7XG4gICAgICB2YXIgY3Vyc29yID0gZWxlbWVudEZyb21HcmlkKG1lcmdlZEdyaWQsIHBhc3RlRGV0YWlscy5jZWxsc1swXS5yb3coKSwgcGFzdGVEZXRhaWxzLmNlbGxzWzBdLmNvbHVtbigpKTtcbiAgICAgIHJldHVybiBvdXRjb21lKG1lcmdlZEdyaWQsIGN1cnNvcik7XG4gICAgfTtcbiAgICB2YXIgb3BHZXRDb2x1bW5UeXBlID0gZnVuY3Rpb24gKHRhYmxlLCB0YXJnZXQpIHtcbiAgICAgIHZhciBob3VzZSA9IFdhcmVob3VzZS5mcm9tVGFibGUodGFibGUpO1xuICAgICAgdmFyIGRldGFpbHMgPSBvbkNlbGxzKGhvdXNlLCB0YXJnZXQpO1xuICAgICAgcmV0dXJuIGRldGFpbHMuYmluZChmdW5jdGlvbiAoc2VsZWN0ZWRDZWxscykge1xuICAgICAgICB2YXIgbGFzdFNlbGVjdGVkQ2VsbCA9IHNlbGVjdGVkQ2VsbHNbc2VsZWN0ZWRDZWxscy5sZW5ndGggLSAxXTtcbiAgICAgICAgdmFyIG1pbkNvbFJhbmdlID0gc2VsZWN0ZWRDZWxsc1swXS5jb2x1bW4oKTtcbiAgICAgICAgdmFyIG1heENvbFJhbmdlID0gbGFzdFNlbGVjdGVkQ2VsbC5jb2x1bW4oKSArIGxhc3RTZWxlY3RlZENlbGwuY29sc3BhbigpO1xuICAgICAgICB2YXIgc2VsZWN0ZWRDb2x1bW5DZWxscyA9IGZsYXR0ZW4obWFwKGhvdXNlLmFsbCwgZnVuY3Rpb24gKHJvdykge1xuICAgICAgICAgIHJldHVybiBmaWx0ZXIocm93LmNlbGxzKCksIGZ1bmN0aW9uIChjZWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbC5jb2x1bW4oKSA+PSBtaW5Db2xSYW5nZSAmJiBjZWxsLmNvbHVtbigpIDwgbWF4Q29sUmFuZ2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIGdldENlbGxzVHlwZShzZWxlY3RlZENvbHVtbkNlbGxzLCBmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICAgIHJldHVybiBuYW1lKGNlbGwuZWxlbWVudCgpKSA9PT0gJ3RoJztcbiAgICAgICAgfSk7XG4gICAgICB9KS5nZXRPcignJyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0Q2VsbHNUeXBlID0gZnVuY3Rpb24gKGNlbGxzLCBoZWFkZXJQcmVkKSB7XG4gICAgICB2YXIgaGVhZGVyQ2VsbHMgPSBmaWx0ZXIoY2VsbHMsIGhlYWRlclByZWQpO1xuICAgICAgaWYgKGhlYWRlckNlbGxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gT3B0aW9uLnNvbWUoJ3RkJyk7XG4gICAgICB9IGVsc2UgaWYgKGhlYWRlckNlbGxzLmxlbmd0aCA9PT0gY2VsbHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBPcHRpb24uc29tZSgndGgnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHJlc2l6ZSA9IGFkanVzdFdpZHRoVG87XG4gICAgdmFyIGluc2VydFJvd3NCZWZvcmUgPSBydW4ob3BJbnNlcnRSb3dzQmVmb3JlLCBvbkNlbGxzLCBub29wLCBub29wLCBHZW5lcmF0b3JzLm1vZGlmaWNhdGlvbik7XG4gICAgdmFyIGluc2VydFJvd3NBZnRlciA9IHJ1bihvcEluc2VydFJvd3NBZnRlciwgb25DZWxscywgbm9vcCwgbm9vcCwgR2VuZXJhdG9ycy5tb2RpZmljYXRpb24pO1xuICAgIHZhciBpbnNlcnRDb2x1bW5zQmVmb3JlID0gcnVuKG9wSW5zZXJ0Q29sdW1uc0JlZm9yZSwgb25DZWxscywgcmVzaXplLCBub29wLCBHZW5lcmF0b3JzLm1vZGlmaWNhdGlvbik7XG4gICAgdmFyIGluc2VydENvbHVtbnNBZnRlciA9IHJ1bihvcEluc2VydENvbHVtbnNBZnRlciwgb25DZWxscywgcmVzaXplLCBub29wLCBHZW5lcmF0b3JzLm1vZGlmaWNhdGlvbik7XG4gICAgdmFyIGVyYXNlQ29sdW1ucyA9IHJ1bihvcEVyYXNlQ29sdW1ucywgb25DZWxscywgcmVzaXplLCBwcnVuZSwgR2VuZXJhdG9ycy5tb2RpZmljYXRpb24pO1xuICAgIHZhciBlcmFzZVJvd3MgPSBydW4ob3BFcmFzZVJvd3MsIG9uQ2VsbHMsIG5vb3AsIHBydW5lLCBHZW5lcmF0b3JzLm1vZGlmaWNhdGlvbik7XG4gICAgdmFyIG1ha2VDb2x1bW5IZWFkZXIgPSBydW4ob3BNYWtlQ29sdW1uSGVhZGVyLCBvbkNlbGwsIG5vb3AsIG5vb3AsIEdlbmVyYXRvcnMudHJhbnNmb3JtKCdyb3cnLCAndGgnKSk7XG4gICAgdmFyIHVubWFrZUNvbHVtbkhlYWRlciA9IHJ1bihvcFVubWFrZUNvbHVtbkhlYWRlciwgb25DZWxsLCBub29wLCBub29wLCBHZW5lcmF0b3JzLnRyYW5zZm9ybShudWxsLCAndGQnKSk7XG4gICAgdmFyIG1ha2VSb3dIZWFkZXIgPSBydW4ob3BNYWtlUm93SGVhZGVyLCBvbkNlbGwsIG5vb3AsIG5vb3AsIEdlbmVyYXRvcnMudHJhbnNmb3JtKCdjb2wnLCAndGgnKSk7XG4gICAgdmFyIHVubWFrZVJvd0hlYWRlciA9IHJ1bihvcFVubWFrZVJvd0hlYWRlciwgb25DZWxsLCBub29wLCBub29wLCBHZW5lcmF0b3JzLnRyYW5zZm9ybShudWxsLCAndGQnKSk7XG4gICAgdmFyIG1lcmdlQ2VsbHMgPSBydW4ob3BNZXJnZUNlbGxzLCBvbk1lcmdhYmxlLCBub29wLCBub29wLCBHZW5lcmF0b3JzLm1lcmdpbmcpO1xuICAgIHZhciB1bm1lcmdlQ2VsbHMgPSBydW4ob3BVbm1lcmdlQ2VsbHMsIG9uVW5tZXJnYWJsZSwgcmVzaXplLCBub29wLCBHZW5lcmF0b3JzLm1lcmdpbmcpO1xuICAgIHZhciBwYXN0ZUNlbGxzID0gcnVuKG9wUGFzdGVDZWxscywgb25QYXN0ZSwgcmVzaXplLCBub29wLCBHZW5lcmF0b3JzLm1vZGlmaWNhdGlvbik7XG4gICAgdmFyIHBhc3RlQ29sc0JlZm9yZSA9IHJ1bihvcFBhc3RlQ29sc0JlZm9yZSwgb25QYXN0ZUJ5RWRpdG9yLCBub29wLCBub29wLCBHZW5lcmF0b3JzLm1vZGlmaWNhdGlvbik7XG4gICAgdmFyIHBhc3RlQ29sc0FmdGVyID0gcnVuKG9wUGFzdGVDb2xzQWZ0ZXIsIG9uUGFzdGVCeUVkaXRvciwgbm9vcCwgbm9vcCwgR2VuZXJhdG9ycy5tb2RpZmljYXRpb24pO1xuICAgIHZhciBwYXN0ZVJvd3NCZWZvcmUgPSBydW4ob3BQYXN0ZVJvd3NCZWZvcmUsIG9uUGFzdGVCeUVkaXRvciwgbm9vcCwgbm9vcCwgR2VuZXJhdG9ycy5tb2RpZmljYXRpb24pO1xuICAgIHZhciBwYXN0ZVJvd3NBZnRlciA9IHJ1bihvcFBhc3RlUm93c0FmdGVyLCBvblBhc3RlQnlFZGl0b3IsIG5vb3AsIG5vb3AsIEdlbmVyYXRvcnMubW9kaWZpY2F0aW9uKTtcbiAgICB2YXIgZ2V0Q29sdW1uVHlwZSA9IG9wR2V0Q29sdW1uVHlwZTtcblxuICAgIHZhciBnZXRTZWN0aW9uID0gZnVuY3Rpb24gKGVsbSkge1xuICAgICAgcmV0dXJuIGdldE5vZGVOYW1lKGVsbS5wYXJlbnROb2RlKTtcbiAgICB9O1xuICAgIHZhciBtYXBTZWN0aW9uTmFtZVRvVHlwZSA9IGZ1bmN0aW9uIChzZWN0aW9uKSB7XG4gICAgICBpZiAoc2VjdGlvbiA9PT0gJ3RoZWFkJykge1xuICAgICAgICByZXR1cm4gJ2hlYWRlcic7XG4gICAgICB9IGVsc2UgaWYgKHNlY3Rpb24gPT09ICd0Zm9vdCcpIHtcbiAgICAgICAgcmV0dXJuICdmb290ZXInO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICdib2R5JztcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBkZXRlY3RIZWFkZXJSb3cgPSBmdW5jdGlvbiAoZWRpdG9yLCBlbG0pIHtcbiAgICAgIHZhciBpc1RoZWFkID0gZ2V0U2VjdGlvbihlbG0pID09PSAndGhlYWQnO1xuICAgICAgdmFyIGFyZUFsbENlbGxzVGhzID0gIWV4aXN0cyhlbG0uY2VsbHMsIGZ1bmN0aW9uIChjKSB7XG4gICAgICAgIHJldHVybiBnZXROb2RlTmFtZShjKSAhPT0gJ3RoJztcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGlzVGhlYWQgfHwgYXJlQWxsQ2VsbHNUaHMgPyBPcHRpb24uc29tZSh7XG4gICAgICAgIHRoZWFkOiBpc1RoZWFkLFxuICAgICAgICB0aHM6IGFyZUFsbENlbGxzVGhzXG4gICAgICB9KSA6IE9wdGlvbi5ub25lKCk7XG4gICAgfTtcbiAgICB2YXIgZ2V0Um93VHlwZSA9IGZ1bmN0aW9uIChlZGl0b3IsIGVsbSkge1xuICAgICAgcmV0dXJuIG1hcFNlY3Rpb25OYW1lVG9UeXBlKGRldGVjdEhlYWRlclJvdyhlZGl0b3IsIGVsbSkuZm9sZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBnZXRTZWN0aW9uKGVsbSk7XG4gICAgICB9LCBmdW5jdGlvbiAoX3Jvd0NvbmZpZykge1xuICAgICAgICByZXR1cm4gJ3RoZWFkJztcbiAgICAgIH0pKTtcbiAgICB9O1xuICAgIHZhciBzd2l0Y2hSb3dTZWN0aW9uID0gZnVuY3Rpb24gKGRvbSwgcm93RWxtLCBuZXdTZWN0aW9uTmFtZSkge1xuICAgICAgdmFyIHRhYmxlRWxtID0gZG9tLmdldFBhcmVudChyb3dFbG0sICd0YWJsZScpO1xuICAgICAgdmFyIG9sZFNlY3Rpb25FbG0gPSByb3dFbG0ucGFyZW50Tm9kZTtcbiAgICAgIHZhciBvbGRTZWN0aW9uTmFtZSA9IGdldE5vZGVOYW1lKG9sZFNlY3Rpb25FbG0pO1xuICAgICAgaWYgKG5ld1NlY3Rpb25OYW1lICE9PSBvbGRTZWN0aW9uTmFtZSkge1xuICAgICAgICB2YXIgc2VjdGlvbkVsbV8xID0gZG9tLnNlbGVjdChuZXdTZWN0aW9uTmFtZSwgdGFibGVFbG0pWzBdO1xuICAgICAgICBpZiAoIXNlY3Rpb25FbG1fMSkge1xuICAgICAgICAgIHNlY3Rpb25FbG1fMSA9IGRvbS5jcmVhdGUobmV3U2VjdGlvbk5hbWUpO1xuICAgICAgICAgIHZhciBmaXJzdFRhYmxlQ2hpbGRfMSA9IHRhYmxlRWxtLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgaWYgKG5ld1NlY3Rpb25OYW1lID09PSAndGhlYWQnKSB7XG4gICAgICAgICAgICBsYXN0KGNoaWxkcmVuJDIoRWxlbWVudC5mcm9tRG9tKHRhYmxlRWxtKSwgJ2NhcHRpb24sY29sZ3JvdXAnKSkuZm9sZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0YWJsZUVsbS5pbnNlcnRCZWZvcmUoc2VjdGlvbkVsbV8xLCBmaXJzdFRhYmxlQ2hpbGRfMSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICByZXR1cm4gZG9tLmluc2VydEFmdGVyKHNlY3Rpb25FbG1fMSwgYy5kb20oKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFibGVFbG0uYXBwZW5kQ2hpbGQoc2VjdGlvbkVsbV8xKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld1NlY3Rpb25OYW1lID09PSAndGJvZHknICYmIG9sZFNlY3Rpb25OYW1lID09PSAndGhlYWQnICYmIHNlY3Rpb25FbG1fMS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgc2VjdGlvbkVsbV8xLmluc2VydEJlZm9yZShyb3dFbG0sIHNlY3Rpb25FbG1fMS5maXJzdENoaWxkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWN0aW9uRWxtXzEuYXBwZW5kQ2hpbGQocm93RWxtKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW9sZFNlY3Rpb25FbG0uaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICAgICAgZG9tLnJlbW92ZShvbGRTZWN0aW9uRWxtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHN3aXRjaENlbGxUeXBlID0gZnVuY3Rpb24gKGRvbSwgY2VsbHMsIG5ld0NlbGxUeXBlLCBzY29wZSkge1xuICAgICAgcmV0dXJuIGVhY2goY2VsbHMsIGZ1bmN0aW9uIChjKSB7XG4gICAgICAgIHZhciBuZXdDZWxsID0gZ2V0Tm9kZU5hbWUoYykgIT09IG5ld0NlbGxUeXBlID8gZG9tLnJlbmFtZShjLCBuZXdDZWxsVHlwZSkgOiBjO1xuICAgICAgICBkb20uc2V0QXR0cmliKG5ld0NlbGwsICdzY29wZScsIHNjb3BlKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHN3aXRjaFNlY3Rpb25UeXBlID0gZnVuY3Rpb24gKGVkaXRvciwgcm93RWxtLCBuZXdUeXBlKSB7XG4gICAgICB2YXIgZGV0ZXJtaW5lSGVhZGVyUm93VHlwZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFsbFRhYmxlUm93cyA9IHRhYmxlKEVsZW1lbnQuZnJvbURvbShyb3dFbG0uY2VsbHNbMF0pKS5tYXAoZnVuY3Rpb24gKHRhYmxlKSB7XG4gICAgICAgICAgcmV0dXJuIHJvd3ModGFibGUpO1xuICAgICAgICB9KS5nZXRPcihbXSk7XG4gICAgICAgIHJldHVybiBmaW5kTWFwKGFsbFRhYmxlUm93cywgZnVuY3Rpb24gKHJvdykge1xuICAgICAgICAgIHJldHVybiBkZXRlY3RIZWFkZXJSb3coZWRpdG9yLCByb3cuZG9tKCkpO1xuICAgICAgICB9KS5tYXAoZnVuY3Rpb24gKGRldGVjdGVkVHlwZSkge1xuICAgICAgICAgIGlmIChkZXRlY3RlZFR5cGUudGhlYWQgJiYgZGV0ZWN0ZWRUeXBlLnRocykge1xuICAgICAgICAgICAgcmV0dXJuICdzZWN0aW9uQ2VsbHMnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZGV0ZWN0ZWRUeXBlLnRoZWFkID8gJ3NlY3Rpb24nIDogJ2NlbGxzJztcbiAgICAgICAgICB9XG4gICAgICAgIH0pLmdldE9yKCdzZWN0aW9uJyk7XG4gICAgICB9O1xuICAgICAgdmFyIGRvbSA9IGVkaXRvci5kb207XG4gICAgICBpZiAobmV3VHlwZSA9PT0gJ2hlYWRlcicpIHtcbiAgICAgICAgdmFyIGhlYWRlclJvd1R5cGVTZXR0aW5nID0gZ2V0VGFibGVIZWFkZXJUeXBlKGVkaXRvcik7XG4gICAgICAgIHZhciBoZWFkZXJSb3dUeXBlID0gaGVhZGVyUm93VHlwZVNldHRpbmcgPT09ICdhdXRvJyA/IGRldGVybWluZUhlYWRlclJvd1R5cGUoKSA6IGhlYWRlclJvd1R5cGVTZXR0aW5nO1xuICAgICAgICBzd2l0Y2hDZWxsVHlwZShkb20sIHJvd0VsbS5jZWxscywgaGVhZGVyUm93VHlwZSA9PT0gJ3NlY3Rpb24nID8gJ3RkJyA6ICd0aCcsICdjb2wnKTtcbiAgICAgICAgc3dpdGNoUm93U2VjdGlvbihkb20sIHJvd0VsbSwgaGVhZGVyUm93VHlwZSA9PT0gJ2NlbGxzJyA/ICd0Ym9keScgOiAndGhlYWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXRjaENlbGxUeXBlKGRvbSwgcm93RWxtLmNlbGxzLCAndGQnLCBudWxsKTtcbiAgICAgICAgc3dpdGNoUm93U2VjdGlvbihkb20sIHJvd0VsbSwgbmV3VHlwZSA9PT0gJ2Zvb3RlcicgPyAndGZvb3QnIDogJ3Rib2R5Jyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBTZWxlY3Rpb25zID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGJvZHkgPSBnZXRCb2R5JDEoZWRpdG9yKTtcbiAgICAgICAgcmV0dXJuIHJldHJpZXZlJDEoYm9keSwgc2VsZWN0ZWRTZWxlY3RvcikuZm9sZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKGVkaXRvci5zZWxlY3Rpb24uZ2V0U3RhcnQoKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbm9uZSQxKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzaW5nbGUoZWRpdG9yLnNlbGVjdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiAoY2VsbHMpIHtcbiAgICAgICAgICByZXR1cm4gbXVsdGlwbGUoY2VsbHMpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICByZXR1cm4geyBnZXQ6IGdldCB9O1xuICAgIH07XG5cbiAgICB2YXIgZ2V0U2VsZWN0aW9uU3RhcnRGcm9tU2VsZWN0b3IgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIHJldHVybiBPcHRpb24uZnJvbShlZGl0b3IuZG9tLmdldFBhcmVudChlZGl0b3Iuc2VsZWN0aW9uLmdldFN0YXJ0KCksIHNlbGVjdG9yKSkubWFwKGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgcmV0dXJuIEVsZW1lbnQuZnJvbURvbShuKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGdldFNlbGVjdGlvblN0YXJ0Q2VsbCA9IGdldFNlbGVjdGlvblN0YXJ0RnJvbVNlbGVjdG9yKCd0aCx0ZCcpO1xuICAgIHZhciBnZXRTZWxlY3Rpb25TdGFydENlbGxPckNhcHRpb24gPSBnZXRTZWxlY3Rpb25TdGFydEZyb21TZWxlY3RvcigndGgsdGQsY2FwdGlvbicpO1xuICAgIHZhciBnZXRDZWxsc0Zyb21TZWxlY3Rpb24gPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZ2V0U2VsZWN0aW9uU3RhcnRDZWxsKGVkaXRvcikubWFwKGZ1bmN0aW9uIChjZWxsKSB7XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb24oY2VsbCwgU2VsZWN0aW9ucyhlZGl0b3IpKTtcbiAgICAgIH0pLm1hcChmdW5jdGlvbiAoY2VsbHMpIHtcbiAgICAgICAgcmV0dXJuIG1hcChjZWxscywgZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgICAgICByZXR1cm4gY2VsbC5kb20oKTtcbiAgICAgICAgfSk7XG4gICAgICB9KS5nZXRPcihbXSk7XG4gICAgfTtcbiAgICB2YXIgZ2V0Um93c0Zyb21TZWxlY3Rpb24gPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgY2VsbE9wdCA9IGdldFNlbGVjdGlvblN0YXJ0Q2VsbChlZGl0b3IpO1xuICAgICAgdmFyIHJvd3NPcHQgPSBjZWxsT3B0LmJpbmQoZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgICAgcmV0dXJuIHRhYmxlKGNlbGwpO1xuICAgICAgfSkubWFwKGZ1bmN0aW9uICh0YWJsZSkge1xuICAgICAgICByZXR1cm4gcm93cyh0YWJsZSk7XG4gICAgICB9KS5tYXAoZnVuY3Rpb24gKHJvd3MpIHtcbiAgICAgICAgcmV0dXJuIG1hcChyb3dzLCBmdW5jdGlvbiAocm93KSB7XG4gICAgICAgICAgcmV0dXJuIHJvdy5kb20oKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBsaWZ0MihjZWxsT3B0LCByb3dzT3B0LCBmdW5jdGlvbiAoY2VsbCwgcm93cykge1xuICAgICAgICByZXR1cm4gZmlsdGVyKHJvd3MsIGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgICByZXR1cm4gZXhpc3RzKHJvdy5jZWxscywgZnVuY3Rpb24gKHJvd0NlbGwpIHtcbiAgICAgICAgICAgIHJldHVybiBlZGl0b3IuZG9tLmdldEF0dHJpYihyb3dDZWxsLCBzZWxlY3RlZCkgPT09ICcxJyB8fCByb3dDZWxsID09PSBjZWxsLmRvbSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pLmdldE9yKFtdKTtcbiAgICB9O1xuXG4gICAgdmFyIFRhYmxlQWN0aW9ucyA9IGZ1bmN0aW9uIChlZGl0b3IsIGxhenlXaXJlKSB7XG4gICAgICB2YXIgaXNUYWJsZUJvZHkgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIHJldHVybiBuYW1lKGdldEJvZHkkMShlZGl0b3IpKSA9PT0gJ3RhYmxlJztcbiAgICAgIH07XG4gICAgICB2YXIgbGFzdFJvd0d1YXJkID0gZnVuY3Rpb24gKHRhYmxlKSB7XG4gICAgICAgIHJldHVybiBpc1RhYmxlQm9keShlZGl0b3IpID09PSBmYWxzZSB8fCBnZXRHcmlkU2l6ZSh0YWJsZSkucm93cygpID4gMTtcbiAgICAgIH07XG4gICAgICB2YXIgbGFzdENvbHVtbkd1YXJkID0gZnVuY3Rpb24gKHRhYmxlKSB7XG4gICAgICAgIHJldHVybiBpc1RhYmxlQm9keShlZGl0b3IpID09PSBmYWxzZSB8fCBnZXRHcmlkU2l6ZSh0YWJsZSkuY29sdW1ucygpID4gMTtcbiAgICAgIH07XG4gICAgICB2YXIgY2xvbmVGb3JtYXRzID0gZ2V0Q2xvbmVFbGVtZW50cyhlZGl0b3IpO1xuICAgICAgdmFyIGV4ZWN1dGUgPSBmdW5jdGlvbiAob3BlcmF0aW9uLCBndWFyZCwgbXV0YXRlLCBsYXp5V2lyZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRhYmxlLCB0YXJnZXQpIHtcbiAgICAgICAgICByZW1vdmVEYXRhU3R5bGUodGFibGUpO1xuICAgICAgICAgIHZhciB3aXJlID0gbGF6eVdpcmUoKTtcbiAgICAgICAgICB2YXIgZG9jID0gRWxlbWVudC5mcm9tRG9tKGVkaXRvci5nZXREb2MoKSk7XG4gICAgICAgICAgdmFyIGRpcmVjdGlvbiA9IFRhYmxlRGlyZWN0aW9uKGRpcmVjdGlvbkF0KTtcbiAgICAgICAgICB2YXIgZ2VuZXJhdG9ycyA9IGNlbGxPcGVyYXRpb25zKG11dGF0ZSwgZG9jLCBjbG9uZUZvcm1hdHMpO1xuICAgICAgICAgIHZhciBzaXppbmcgPSBnZXQkOChlZGl0b3IsIHRhYmxlKTtcbiAgICAgICAgICByZXR1cm4gZ3VhcmQodGFibGUpID8gb3BlcmF0aW9uKHdpcmUsIHRhYmxlLCB0YXJnZXQsIGdlbmVyYXRvcnMsIGRpcmVjdGlvbiwgc2l6aW5nKS5iaW5kKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGVhY2gocmVzdWx0Lm5ld1Jvd3MoKSwgZnVuY3Rpb24gKHJvdykge1xuICAgICAgICAgICAgICBmaXJlTmV3Um93KGVkaXRvciwgcm93LmRvbSgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWFjaChyZXN1bHQubmV3Q2VsbHMoKSwgZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgICAgICAgICAgZmlyZU5ld0NlbGwoZWRpdG9yLCBjZWxsLmRvbSgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5jdXJzb3IoKS5tYXAoZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgICAgICAgICAgdmFyIGRlcyA9IGZyZWVmYWxsUnRsJDIoY2VsbCk7XG4gICAgICAgICAgICAgIHZhciBybmcgPSBlZGl0b3IuZG9tLmNyZWF0ZVJuZygpO1xuICAgICAgICAgICAgICBybmcuc2V0U3RhcnQoZGVzLmVsZW1lbnQoKS5kb20oKSwgZGVzLm9mZnNldCgpKTtcbiAgICAgICAgICAgICAgcm5nLnNldEVuZChkZXMuZWxlbWVudCgpLmRvbSgpLCBkZXMub2Zmc2V0KCkpO1xuICAgICAgICAgICAgICByZXR1cm4gcm5nO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSkgOiBPcHRpb24ubm9uZSgpO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICAgIHZhciBkZWxldGVSb3cgPSBleGVjdXRlKGVyYXNlUm93cywgbGFzdFJvd0d1YXJkLCBub29wLCBsYXp5V2lyZSk7XG4gICAgICB2YXIgZGVsZXRlQ29sdW1uID0gZXhlY3V0ZShlcmFzZUNvbHVtbnMsIGxhc3RDb2x1bW5HdWFyZCwgbm9vcCwgbGF6eVdpcmUpO1xuICAgICAgdmFyIGluc2VydFJvd3NCZWZvcmUkMSA9IGV4ZWN1dGUoaW5zZXJ0Um93c0JlZm9yZSwgYWx3YXlzLCBub29wLCBsYXp5V2lyZSk7XG4gICAgICB2YXIgaW5zZXJ0Um93c0FmdGVyJDEgPSBleGVjdXRlKGluc2VydFJvd3NBZnRlciwgYWx3YXlzLCBub29wLCBsYXp5V2lyZSk7XG4gICAgICB2YXIgaW5zZXJ0Q29sdW1uc0JlZm9yZSQxID0gZXhlY3V0ZShpbnNlcnRDb2x1bW5zQmVmb3JlLCBhbHdheXMsIGhhbHZlLCBsYXp5V2lyZSk7XG4gICAgICB2YXIgaW5zZXJ0Q29sdW1uc0FmdGVyJDEgPSBleGVjdXRlKGluc2VydENvbHVtbnNBZnRlciwgYWx3YXlzLCBoYWx2ZSwgbGF6eVdpcmUpO1xuICAgICAgdmFyIG1lcmdlQ2VsbHMkMSA9IGV4ZWN1dGUobWVyZ2VDZWxscywgYWx3YXlzLCBub29wLCBsYXp5V2lyZSk7XG4gICAgICB2YXIgdW5tZXJnZUNlbGxzJDEgPSBleGVjdXRlKHVubWVyZ2VDZWxscywgYWx3YXlzLCBub29wLCBsYXp5V2lyZSk7XG4gICAgICB2YXIgcGFzdGVDb2xzQmVmb3JlJDEgPSBleGVjdXRlKHBhc3RlQ29sc0JlZm9yZSwgYWx3YXlzLCBub29wLCBsYXp5V2lyZSk7XG4gICAgICB2YXIgcGFzdGVDb2xzQWZ0ZXIkMSA9IGV4ZWN1dGUocGFzdGVDb2xzQWZ0ZXIsIGFsd2F5cywgbm9vcCwgbGF6eVdpcmUpO1xuICAgICAgdmFyIHBhc3RlUm93c0JlZm9yZSQxID0gZXhlY3V0ZShwYXN0ZVJvd3NCZWZvcmUsIGFsd2F5cywgbm9vcCwgbGF6eVdpcmUpO1xuICAgICAgdmFyIHBhc3RlUm93c0FmdGVyJDEgPSBleGVjdXRlKHBhc3RlUm93c0FmdGVyLCBhbHdheXMsIG5vb3AsIGxhenlXaXJlKTtcbiAgICAgIHZhciBwYXN0ZUNlbGxzJDEgPSBleGVjdXRlKHBhc3RlQ2VsbHMsIGFsd2F5cywgbm9vcCwgbGF6eVdpcmUpO1xuICAgICAgdmFyIGV4dHJhY3RUeXBlID0gZnVuY3Rpb24gKGFyZ3MsIHZhbGlkVHlwZXMpIHtcbiAgICAgICAgcmV0dXJuIGdldChhcmdzLCAndHlwZScpLmZpbHRlcihmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICAgIHJldHVybiBjb250YWlucyh2YWxpZFR5cGVzLCB0eXBlKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgdmFyIHNldFRhYmxlQ2VsbFR5cGUgPSBmdW5jdGlvbiAoZWRpdG9yLCBhcmdzKSB7XG4gICAgICAgIHJldHVybiBleHRyYWN0VHlwZShhcmdzLCBbXG4gICAgICAgICAgJ3RkJyxcbiAgICAgICAgICAndGgnXG4gICAgICAgIF0pLmVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgICBzd2l0Y2hDZWxsVHlwZShlZGl0b3IuZG9tLCBnZXRDZWxsc0Zyb21TZWxlY3Rpb24oZWRpdG9yKSwgdHlwZSwgbnVsbCk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIHZhciBzZXRUYWJsZVJvd1R5cGUgPSBmdW5jdGlvbiAoZWRpdG9yLCBhcmdzKSB7XG4gICAgICAgIHJldHVybiBleHRyYWN0VHlwZShhcmdzLCBbXG4gICAgICAgICAgJ2hlYWRlcicsXG4gICAgICAgICAgJ2JvZHknLFxuICAgICAgICAgICdmb290ZXInXG4gICAgICAgIF0pLmVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgICBtYXAoZ2V0Um93c0Zyb21TZWxlY3Rpb24oZWRpdG9yKSwgZnVuY3Rpb24gKHJvdykge1xuICAgICAgICAgICAgcmV0dXJuIHN3aXRjaFNlY3Rpb25UeXBlKGVkaXRvciwgcm93LCB0eXBlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgdmFyIG1ha2VDb2x1bW5IZWFkZXIkMSA9IGV4ZWN1dGUobWFrZUNvbHVtbkhlYWRlciwgYWx3YXlzLCBub29wLCBsYXp5V2lyZSk7XG4gICAgICB2YXIgdW5tYWtlQ29sdW1uSGVhZGVyJDEgPSBleGVjdXRlKHVubWFrZUNvbHVtbkhlYWRlciwgYWx3YXlzLCBub29wLCBsYXp5V2lyZSk7XG4gICAgICB2YXIgZ2V0VGFibGVSb3dUeXBlID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICB2YXIgcm93cyA9IGdldFJvd3NGcm9tU2VsZWN0aW9uKGVkaXRvcik7XG4gICAgICAgIGlmIChyb3dzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB2YXIgcm93VHlwZXMgPSBtYXAocm93cywgZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRSb3dUeXBlKGVkaXRvciwgcik7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFyIGhhc0hlYWRlciA9IGNvbnRhaW5zKHJvd1R5cGVzLCAnaGVhZGVyJyk7XG4gICAgICAgICAgdmFyIGhhc0Zvb3RlciA9IGNvbnRhaW5zKHJvd1R5cGVzLCAnZm9vdGVyJyk7XG4gICAgICAgICAgaWYgKCFoYXNIZWFkZXIgJiYgIWhhc0Zvb3Rlcikge1xuICAgICAgICAgICAgcmV0dXJuICdib2R5JztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGhhc0JvZHkgPSBjb250YWlucyhyb3dUeXBlcywgJ2JvZHknKTtcbiAgICAgICAgICAgIGlmIChoYXNIZWFkZXIgJiYgIWhhc0JvZHkgJiYgIWhhc0Zvb3Rlcikge1xuICAgICAgICAgICAgICByZXR1cm4gJ2hlYWRlcic7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFoYXNIZWFkZXIgJiYgIWhhc0JvZHkgJiYgaGFzRm9vdGVyKSB7XG4gICAgICAgICAgICAgIHJldHVybiAnZm9vdGVyJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB2YXIgZ2V0VGFibGVDZWxsVHlwZSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgICAgcmV0dXJuIGdldENlbGxzVHlwZShnZXRDZWxsc0Zyb21TZWxlY3Rpb24oZWRpdG9yKSwgZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Tm9kZU5hbWUoY2VsbCkgPT09ICd0aCc7XG4gICAgICAgIH0pLmdldE9yKCcnKTtcbiAgICAgIH07XG4gICAgICB2YXIgZ2V0VGFibGVDb2xUeXBlID0gZ2V0Q29sdW1uVHlwZTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRlbGV0ZVJvdzogZGVsZXRlUm93LFxuICAgICAgICBkZWxldGVDb2x1bW46IGRlbGV0ZUNvbHVtbixcbiAgICAgICAgaW5zZXJ0Um93c0JlZm9yZTogaW5zZXJ0Um93c0JlZm9yZSQxLFxuICAgICAgICBpbnNlcnRSb3dzQWZ0ZXI6IGluc2VydFJvd3NBZnRlciQxLFxuICAgICAgICBpbnNlcnRDb2x1bW5zQmVmb3JlOiBpbnNlcnRDb2x1bW5zQmVmb3JlJDEsXG4gICAgICAgIGluc2VydENvbHVtbnNBZnRlcjogaW5zZXJ0Q29sdW1uc0FmdGVyJDEsXG4gICAgICAgIG1lcmdlQ2VsbHM6IG1lcmdlQ2VsbHMkMSxcbiAgICAgICAgdW5tZXJnZUNlbGxzOiB1bm1lcmdlQ2VsbHMkMSxcbiAgICAgICAgcGFzdGVDb2xzQmVmb3JlOiBwYXN0ZUNvbHNCZWZvcmUkMSxcbiAgICAgICAgcGFzdGVDb2xzQWZ0ZXI6IHBhc3RlQ29sc0FmdGVyJDEsXG4gICAgICAgIHBhc3RlUm93c0JlZm9yZTogcGFzdGVSb3dzQmVmb3JlJDEsXG4gICAgICAgIHBhc3RlUm93c0FmdGVyOiBwYXN0ZVJvd3NBZnRlciQxLFxuICAgICAgICBwYXN0ZUNlbGxzOiBwYXN0ZUNlbGxzJDEsXG4gICAgICAgIHNldFRhYmxlQ2VsbFR5cGU6IHNldFRhYmxlQ2VsbFR5cGUsXG4gICAgICAgIHNldFRhYmxlUm93VHlwZTogc2V0VGFibGVSb3dUeXBlLFxuICAgICAgICBtYWtlQ29sdW1uSGVhZGVyOiBtYWtlQ29sdW1uSGVhZGVyJDEsXG4gICAgICAgIHVubWFrZUNvbHVtbkhlYWRlcjogdW5tYWtlQ29sdW1uSGVhZGVyJDEsXG4gICAgICAgIGdldFRhYmxlUm93VHlwZTogZ2V0VGFibGVSb3dUeXBlLFxuICAgICAgICBnZXRUYWJsZUNlbGxUeXBlOiBnZXRUYWJsZUNlbGxUeXBlLFxuICAgICAgICBnZXRUYWJsZUNvbFR5cGU6IGdldFRhYmxlQ29sVHlwZVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIERlZmF1bHRSZW5kZXJPcHRpb25zID0ge1xuICAgICAgc3R5bGVzOiB7XG4gICAgICAgICdib3JkZXItY29sbGFwc2UnOiAnY29sbGFwc2UnLFxuICAgICAgICAnd2lkdGgnOiAnMTAwJSdcbiAgICAgIH0sXG4gICAgICBhdHRyaWJ1dGVzOiB7IGJvcmRlcjogJzEnIH1cbiAgICB9O1xuICAgIHZhciB0YWJsZUhlYWRlckNlbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gRWxlbWVudC5mcm9tVGFnKCd0aCcpO1xuICAgIH07XG4gICAgdmFyIHRhYmxlQ2VsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBFbGVtZW50LmZyb21UYWcoJ3RkJyk7XG4gICAgfTtcbiAgICB2YXIgY3JlYXRlUm93ID0gZnVuY3Rpb24gKGNvbHVtbnMsIHJvd0hlYWRlcnMsIGNvbHVtbkhlYWRlcnMsIHJvd0luZGV4KSB7XG4gICAgICB2YXIgdHIgPSBFbGVtZW50LmZyb21UYWcoJ3RyJyk7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbHVtbnM7IGorKykge1xuICAgICAgICB2YXIgdGQgPSByb3dJbmRleCA8IHJvd0hlYWRlcnMgfHwgaiA8IGNvbHVtbkhlYWRlcnMgPyB0YWJsZUhlYWRlckNlbGwoKSA6IHRhYmxlQ2VsbCgpO1xuICAgICAgICBpZiAoaiA8IGNvbHVtbkhlYWRlcnMpIHtcbiAgICAgICAgICBzZXQodGQsICdzY29wZScsICdyb3cnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocm93SW5kZXggPCByb3dIZWFkZXJzKSB7XG4gICAgICAgICAgc2V0KHRkLCAnc2NvcGUnLCAnY29sJyk7XG4gICAgICAgIH1cbiAgICAgICAgYXBwZW5kKHRkLCBFbGVtZW50LmZyb21UYWcoJ2JyJykpO1xuICAgICAgICBhcHBlbmQodHIsIHRkKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cjtcbiAgICB9O1xuICAgIHZhciBjcmVhdGVSb3dzID0gZnVuY3Rpb24gKHJvd3MsIGNvbHVtbnMsIHJvd0hlYWRlcnMsIGNvbHVtbkhlYWRlcnMpIHtcbiAgICAgIHJldHVybiByYW5nZShyb3dzLCBmdW5jdGlvbiAocikge1xuICAgICAgICByZXR1cm4gY3JlYXRlUm93KGNvbHVtbnMsIHJvd0hlYWRlcnMsIGNvbHVtbkhlYWRlcnMsIHIpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgcmVuZGVyJDEgPSBmdW5jdGlvbiAocm93cywgY29sdW1ucywgcm93SGVhZGVycywgY29sdW1uSGVhZGVycywgaGVhZGVyVHlwZSwgcmVuZGVyT3B0cykge1xuICAgICAgaWYgKHJlbmRlck9wdHMgPT09IHZvaWQgMCkge1xuICAgICAgICByZW5kZXJPcHRzID0gRGVmYXVsdFJlbmRlck9wdGlvbnM7XG4gICAgICB9XG4gICAgICB2YXIgdGFibGUgPSBFbGVtZW50LmZyb21UYWcoJ3RhYmxlJyk7XG4gICAgICB2YXIgcm93SGVhZGVyc0dvSW5UaGVhZCA9IGhlYWRlclR5cGUgIT09ICdjZWxscyc7XG4gICAgICBzZXRBbGwkMSh0YWJsZSwgcmVuZGVyT3B0cy5zdHlsZXMpO1xuICAgICAgc2V0QWxsKHRhYmxlLCByZW5kZXJPcHRzLmF0dHJpYnV0ZXMpO1xuICAgICAgdmFyIGFjdHVhbFJvd0hlYWRlcnMgPSBNYXRoLm1pbihyb3dzLCByb3dIZWFkZXJzKTtcbiAgICAgIGlmIChyb3dIZWFkZXJzR29JblRoZWFkICYmIHJvd0hlYWRlcnMgPiAwKSB7XG4gICAgICAgIHZhciB0aGVhZCA9IEVsZW1lbnQuZnJvbVRhZygndGhlYWQnKTtcbiAgICAgICAgYXBwZW5kKHRhYmxlLCB0aGVhZCk7XG4gICAgICAgIHZhciB0aGVhZFJvd0hlYWRlcnMgPSBoZWFkZXJUeXBlID09PSAnc2VjdGlvbkNlbGxzJyA/IGFjdHVhbFJvd0hlYWRlcnMgOiAwO1xuICAgICAgICB2YXIgdGhlYWRSb3dzID0gY3JlYXRlUm93cyhyb3dIZWFkZXJzLCBjb2x1bW5zLCB0aGVhZFJvd0hlYWRlcnMsIGNvbHVtbkhlYWRlcnMpO1xuICAgICAgICBhcHBlbmQkMSh0aGVhZCwgdGhlYWRSb3dzKTtcbiAgICAgIH1cbiAgICAgIHZhciB0Ym9keSA9IEVsZW1lbnQuZnJvbVRhZygndGJvZHknKTtcbiAgICAgIGFwcGVuZCh0YWJsZSwgdGJvZHkpO1xuICAgICAgdmFyIG51bVJvd3MgPSByb3dIZWFkZXJzR29JblRoZWFkID8gcm93cyAtIGFjdHVhbFJvd0hlYWRlcnMgOiByb3dzO1xuICAgICAgdmFyIG51bVJvd0hlYWRlcnMgPSByb3dIZWFkZXJzR29JblRoZWFkID8gMCA6IHJvd0hlYWRlcnM7XG4gICAgICB2YXIgdGJvZHlSb3dzID0gY3JlYXRlUm93cyhudW1Sb3dzLCBjb2x1bW5zLCBudW1Sb3dIZWFkZXJzLCBjb2x1bW5IZWFkZXJzKTtcbiAgICAgIGFwcGVuZCQxKHRib2R5LCB0Ym9keVJvd3MpO1xuICAgICAgcmV0dXJuIHRhYmxlO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0JGEgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQuZG9tKCkuaW5uZXJIVE1MO1xuICAgIH07XG4gICAgdmFyIGdldE91dGVyJDIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgdmFyIGNvbnRhaW5lciA9IEVsZW1lbnQuZnJvbVRhZygnZGl2Jyk7XG4gICAgICB2YXIgY2xvbmUgPSBFbGVtZW50LmZyb21Eb20oZWxlbWVudC5kb20oKS5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgYXBwZW5kKGNvbnRhaW5lciwgY2xvbmUpO1xuICAgICAgcmV0dXJuIGdldCRhKGNvbnRhaW5lcik7XG4gICAgfTtcblxuICAgIHZhciBwbGFjZUNhcmV0SW5DZWxsID0gZnVuY3Rpb24gKGVkaXRvciwgY2VsbCkge1xuICAgICAgZWRpdG9yLnNlbGVjdGlvbi5zZWxlY3QoY2VsbC5kb20oKSwgdHJ1ZSk7XG4gICAgICBlZGl0b3Iuc2VsZWN0aW9uLmNvbGxhcHNlKHRydWUpO1xuICAgIH07XG4gICAgdmFyIHNlbGVjdEZpcnN0Q2VsbEluVGFibGUgPSBmdW5jdGlvbiAoZWRpdG9yLCB0YWJsZUVsbSkge1xuICAgICAgZGVzY2VuZGFudCQxKHRhYmxlRWxtLCAndGQsdGgnKS5lYWNoKGN1cnJ5KHBsYWNlQ2FyZXRJbkNlbGwsIGVkaXRvcikpO1xuICAgIH07XG4gICAgdmFyIGZpcmVFdmVudHMgPSBmdW5jdGlvbiAoZWRpdG9yLCB0YWJsZSkge1xuICAgICAgZWFjaChkZXNjZW5kYW50cyQxKHRhYmxlLCAndHInKSwgZnVuY3Rpb24gKHJvdykge1xuICAgICAgICBmaXJlTmV3Um93KGVkaXRvciwgcm93LmRvbSgpKTtcbiAgICAgICAgZWFjaChkZXNjZW5kYW50cyQxKHJvdywgJ3RoLHRkJyksIGZ1bmN0aW9uIChjZWxsKSB7XG4gICAgICAgICAgZmlyZU5ld0NlbGwoZWRpdG9yLCBjZWxsLmRvbSgpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBpc1BlcmNlbnRhZ2UkMSA9IGZ1bmN0aW9uICh3aWR0aCkge1xuICAgICAgcmV0dXJuIGlzU3RyaW5nKHdpZHRoKSAmJiB3aWR0aC5pbmRleE9mKCclJykgIT09IC0xO1xuICAgIH07XG4gICAgdmFyIGluc2VydCA9IGZ1bmN0aW9uIChlZGl0b3IsIGNvbHVtbnMsIHJvd3MsIGNvbEhlYWRlcnMsIHJvd0hlYWRlcnMpIHtcbiAgICAgIHZhciBkZWZhdWx0U3R5bGVzID0gZ2V0RGVmYXVsdFN0eWxlcyhlZGl0b3IpO1xuICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgIHN0eWxlczogZGVmYXVsdFN0eWxlcyxcbiAgICAgICAgYXR0cmlidXRlczogZ2V0RGVmYXVsdEF0dHJpYnV0ZXMoZWRpdG9yKVxuICAgICAgfTtcbiAgICAgIHZhciB0YWJsZSA9IHJlbmRlciQxKHJvd3MsIGNvbHVtbnMsIHJvd0hlYWRlcnMsIGNvbEhlYWRlcnMsIGdldFRhYmxlSGVhZGVyVHlwZShlZGl0b3IpLCBvcHRpb25zKTtcbiAgICAgIHNldCh0YWJsZSwgJ2RhdGEtbWNlLWlkJywgJ19fbWNlJyk7XG4gICAgICB2YXIgaHRtbCA9IGdldE91dGVyJDIodGFibGUpO1xuICAgICAgZWRpdG9yLmluc2VydENvbnRlbnQoaHRtbCk7XG4gICAgICByZXR1cm4gZGVzY2VuZGFudCQxKGdldEJvZHkkMShlZGl0b3IpLCAndGFibGVbZGF0YS1tY2UtaWQ9XCJfX21jZVwiXScpLm1hcChmdW5jdGlvbiAodGFibGUpIHtcbiAgICAgICAgaWYgKGlzUGl4ZWxzRm9yY2VkKGVkaXRvcikpIHtcbiAgICAgICAgICBlbmZvcmNlUGl4ZWxzKGVkaXRvciwgdGFibGUpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzUmVzcG9uc2l2ZUZvcmNlZChlZGl0b3IpKSB7XG4gICAgICAgICAgZW5mb3JjZU5vbmUodGFibGUpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzUGVyY2VudGFnZXNGb3JjZWQoZWRpdG9yKSB8fCBpc1BlcmNlbnRhZ2UkMShkZWZhdWx0U3R5bGVzLndpZHRoKSkge1xuICAgICAgICAgIGVuZm9yY2VQZXJjZW50YWdlKGVkaXRvciwgdGFibGUpO1xuICAgICAgICB9XG4gICAgICAgIHJlbW92ZURhdGFTdHlsZSh0YWJsZSk7XG4gICAgICAgIHJlbW92ZSh0YWJsZSwgJ2RhdGEtbWNlLWlkJyk7XG4gICAgICAgIGZpcmVFdmVudHMoZWRpdG9yLCB0YWJsZSk7XG4gICAgICAgIHNlbGVjdEZpcnN0Q2VsbEluVGFibGUoZWRpdG9yLCB0YWJsZSk7XG4gICAgICAgIHJldHVybiB0YWJsZS5kb20oKTtcbiAgICAgIH0pLmdldE9yKG51bGwpO1xuICAgIH07XG4gICAgdmFyIGluc2VydFRhYmxlV2l0aERhdGFWYWxpZGF0aW9uID0gZnVuY3Rpb24gKGVkaXRvciwgcm93cywgY29sdW1ucywgb3B0aW9ucywgZXJyb3JNc2cpIHtcbiAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgfVxuICAgICAgdmFyIGNoZWNrSW5wdXQgPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgIHJldHVybiBpc051bWJlcih2YWwpICYmIHZhbCA+IDA7XG4gICAgICB9O1xuICAgICAgaWYgKGNoZWNrSW5wdXQocm93cykgJiYgY2hlY2tJbnB1dChjb2x1bW5zKSkge1xuICAgICAgICB2YXIgaGVhZGVyUm93cyA9IG9wdGlvbnMuaGVhZGVyUm93cyB8fCAwO1xuICAgICAgICB2YXIgaGVhZGVyQ29sdW1ucyA9IG9wdGlvbnMuaGVhZGVyQ29sdW1ucyB8fCAwO1xuICAgICAgICByZXR1cm4gaW5zZXJ0KGVkaXRvciwgY29sdW1ucywgcm93cywgaGVhZGVyQ29sdW1ucywgaGVhZGVyUm93cyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yTXNnKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBnZXRDbGlwYm9hcmRFbGVtZW50cyA9IGZ1bmN0aW9uIChnZXRDbGlwYm9hcmQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBnZXRDbGlwYm9hcmQoKS5mb2xkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlbGVtcykge1xuICAgICAgICAgIHJldHVybiBtYXAoZWxlbXMsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZS5kb20oKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHNldENsaXBib2FyZEVsZW1lbnRzID0gZnVuY3Rpb24gKHNldENsaXBib2FyZCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlbGVtcykge1xuICAgICAgICB2YXIgZWxtc09wdCA9IGVsZW1zLmxlbmd0aCA+IDAgPyBPcHRpb24uc29tZShmcm9tRG9tJDEoZWxlbXMpKSA6IE9wdGlvbi5ub25lKCk7XG4gICAgICAgIHNldENsaXBib2FyZChlbG1zT3B0KTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgZ2V0QXBpID0gZnVuY3Rpb24gKGVkaXRvciwgY2xpcGJvYXJkLCByZXNpemVIYW5kbGVyLCBzZWxlY3Rpb25UYXJnZXRzKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpbnNlcnRUYWJsZTogZnVuY3Rpb24gKGNvbHVtbnMsIHJvd3MsIG9wdGlvbnMpIHtcbiAgICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBpbnNlcnRUYWJsZVdpdGhEYXRhVmFsaWRhdGlvbihlZGl0b3IsIHJvd3MsIGNvbHVtbnMsIG9wdGlvbnMsICdJbnZhbGlkIHZhbHVlcyBmb3IgaW5zZXJ0VGFibGUgLSByb3dzIGFuZCBjb2x1bW5zIHZhbHVlcyBhcmUgcmVxdWlyZWQgdG8gaW5zZXJ0IGEgdGFibGUuJyk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldENsaXBib2FyZFJvd3M6IHNldENsaXBib2FyZEVsZW1lbnRzKGNsaXBib2FyZC5zZXRSb3dzKSxcbiAgICAgICAgZ2V0Q2xpcGJvYXJkUm93czogZ2V0Q2xpcGJvYXJkRWxlbWVudHMoY2xpcGJvYXJkLmdldFJvd3MpLFxuICAgICAgICBzZXRDbGlwYm9hcmRDb2xzOiBzZXRDbGlwYm9hcmRFbGVtZW50cyhjbGlwYm9hcmQuc2V0Q29sdW1ucyksXG4gICAgICAgIGdldENsaXBib2FyZENvbHM6IGdldENsaXBib2FyZEVsZW1lbnRzKGNsaXBib2FyZC5nZXRDb2x1bW5zKSxcbiAgICAgICAgcmVzaXplSGFuZGxlcjogcmVzaXplSGFuZGxlcixcbiAgICAgICAgc2VsZWN0aW9uVGFyZ2V0czogc2VsZWN0aW9uVGFyZ2V0c1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIGNvbnN0cmFpblNwYW4gPSBmdW5jdGlvbiAoZWxlbWVudCwgcHJvcGVydHksIHZhbHVlKSB7XG4gICAgICB2YXIgY3VycmVudENvbHNwYW4gPSBnZXRTcGFuKGVsZW1lbnQsIHByb3BlcnR5KTtcbiAgICAgIGlmICh2YWx1ZSA9PT0gMSB8fCBjdXJyZW50Q29sc3BhbiA8PSAxKSB7XG4gICAgICAgIHJlbW92ZShlbGVtZW50LCBwcm9wZXJ0eSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXQoZWxlbWVudCwgcHJvcGVydHksIE1hdGgubWluKHZhbHVlLCBjdXJyZW50Q29sc3BhbikpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGNvcHlDb2xzID0gZnVuY3Rpb24gKHRhYmxlLCB0YXJnZXQpIHtcbiAgICAgIHZhciBob3VzZSA9IFdhcmVob3VzZS5mcm9tVGFibGUodGFibGUpO1xuICAgICAgdmFyIGRldGFpbHMgPSBvbkNlbGxzKGhvdXNlLCB0YXJnZXQpO1xuICAgICAgcmV0dXJuIGRldGFpbHMubWFwKGZ1bmN0aW9uIChzZWxlY3RlZENlbGxzKSB7XG4gICAgICAgIHZhciBsYXN0U2VsZWN0ZWRDZWxsID0gc2VsZWN0ZWRDZWxsc1tzZWxlY3RlZENlbGxzLmxlbmd0aCAtIDFdO1xuICAgICAgICB2YXIgbWluQ29sUmFuZ2UgPSBzZWxlY3RlZENlbGxzWzBdLmNvbHVtbigpO1xuICAgICAgICB2YXIgbWF4Q29sUmFuZ2UgPSBsYXN0U2VsZWN0ZWRDZWxsLmNvbHVtbigpICsgbGFzdFNlbGVjdGVkQ2VsbC5jb2xzcGFuKCk7XG4gICAgICAgIHJldHVybiBtYXAoaG91c2UuYWxsLCBmdW5jdGlvbiAocm93KSB7XG4gICAgICAgICAgdmFyIGNlbGxzVG9Db3B5ID0gZmlsdGVyKHJvdy5jZWxscygpLCBmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGNlbGwuY29sdW1uKCkgPj0gbWluQ29sUmFuZ2UgJiYgY2VsbC5jb2x1bW4oKSA8IG1heENvbFJhbmdlO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhciBjb3BpZWRDZWxscyA9IG1hcChjZWxsc1RvQ29weSwgZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgICAgICAgIHZhciBjbG9uZWRDZWxsID0gZGVlcChjZWxsLmVsZW1lbnQoKSk7XG4gICAgICAgICAgICBjb25zdHJhaW5TcGFuKGNsb25lZENlbGwsICdjb2xzcGFuJywgbWF4Q29sUmFuZ2UgLSBtaW5Db2xSYW5nZSk7XG4gICAgICAgICAgICByZXR1cm4gY2xvbmVkQ2VsbDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YXIgZmFrZVRSID0gRWxlbWVudC5mcm9tVGFnKCd0cicpO1xuICAgICAgICAgIGFwcGVuZCQxKGZha2VUUiwgY29waWVkQ2VsbHMpO1xuICAgICAgICAgIHJldHVybiBmYWtlVFI7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBjb3B5Um93cyA9IGZ1bmN0aW9uICh0YWJsZSwgdGFyZ2V0LCBnZW5lcmF0b3JzKSB7XG4gICAgICB2YXIgaG91c2UgPSBXYXJlaG91c2UuZnJvbVRhYmxlKHRhYmxlKTtcbiAgICAgIHZhciBkZXRhaWxzID0gb25DZWxscyhob3VzZSwgdGFyZ2V0KTtcbiAgICAgIHJldHVybiBkZXRhaWxzLm1hcChmdW5jdGlvbiAoc2VsZWN0ZWRDZWxscykge1xuICAgICAgICB2YXIgZ3JpZCA9IHRvR3JpZChob3VzZSwgZ2VuZXJhdG9ycywgZmFsc2UpO1xuICAgICAgICB2YXIgc2xpY2VkR3JpZCA9IGdyaWQuc2xpY2Uoc2VsZWN0ZWRDZWxsc1swXS5yb3coKSwgc2VsZWN0ZWRDZWxsc1tzZWxlY3RlZENlbGxzLmxlbmd0aCAtIDFdLnJvdygpICsgc2VsZWN0ZWRDZWxsc1tzZWxlY3RlZENlbGxzLmxlbmd0aCAtIDFdLnJvd3NwYW4oKSk7XG4gICAgICAgIHZhciBzbGljZWREZXRhaWxzID0gdG9EZXRhaWxMaXN0KHNsaWNlZEdyaWQsIGdlbmVyYXRvcnMpO1xuICAgICAgICByZXR1cm4gY29weSQyKHNsaWNlZERldGFpbHMpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBnbG9iYWwkMSA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuVG9vbHMnKTtcblxuICAgIHZhciBnZXRURFRIT3ZlcmFsbFN0eWxlID0gZnVuY3Rpb24gKGRvbSwgZWxtLCBuYW1lKSB7XG4gICAgICB2YXIgY2VsbHMgPSBkb20uc2VsZWN0KCd0ZCx0aCcsIGVsbSk7XG4gICAgICB2YXIgZmlyc3RDaGlsZFN0eWxlO1xuICAgICAgdmFyIGNoZWNrQ2hpbGRyZW4gPSBmdW5jdGlvbiAoZmlyc3RDaGlsZFN0eWxlLCBlbG1zKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBjdXJyZW50U3R5bGUgPSBkb20uZ2V0U3R5bGUoZWxtc1tpXSwgbmFtZSk7XG4gICAgICAgICAgaWYgKHR5cGVvZiBmaXJzdENoaWxkU3R5bGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBmaXJzdENoaWxkU3R5bGUgPSBjdXJyZW50U3R5bGU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChmaXJzdENoaWxkU3R5bGUgIT09IGN1cnJlbnRTdHlsZSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlyc3RDaGlsZFN0eWxlO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBjaGVja0NoaWxkcmVuKGZpcnN0Q2hpbGRTdHlsZSwgY2VsbHMpO1xuICAgIH07XG4gICAgdmFyIGFwcGx5QWxpZ24gPSBmdW5jdGlvbiAoZWRpdG9yLCBlbG0sIG5hbWUpIHtcbiAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgIGVkaXRvci5mb3JtYXR0ZXIuYXBwbHkoJ2FsaWduJyArIG5hbWUsIHt9LCBlbG0pO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGFwcGx5VkFsaWduID0gZnVuY3Rpb24gKGVkaXRvciwgZWxtLCBuYW1lKSB7XG4gICAgICBpZiAobmFtZSkge1xuICAgICAgICBlZGl0b3IuZm9ybWF0dGVyLmFwcGx5KCd2YWxpZ24nICsgbmFtZSwge30sIGVsbSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgdW5BcHBseUFsaWduID0gZnVuY3Rpb24gKGVkaXRvciwgZWxtKSB7XG4gICAgICBnbG9iYWwkMS5lYWNoKCdsZWZ0IGNlbnRlciByaWdodCcuc3BsaXQoJyAnKSwgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgZWRpdG9yLmZvcm1hdHRlci5yZW1vdmUoJ2FsaWduJyArIG5hbWUsIHt9LCBlbG0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgdW5BcHBseVZBbGlnbiA9IGZ1bmN0aW9uIChlZGl0b3IsIGVsbSkge1xuICAgICAgZ2xvYmFsJDEuZWFjaCgndG9wIG1pZGRsZSBib3R0b20nLnNwbGl0KCcgJyksIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIGVkaXRvci5mb3JtYXR0ZXIucmVtb3ZlKCd2YWxpZ24nICsgbmFtZSwge30sIGVsbSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIGJ1aWxkTGlzdEl0ZW1zID0gZnVuY3Rpb24gKGlucHV0TGlzdCwgc3RhcnRJdGVtcykge1xuICAgICAgdmFyIGFwcGVuZEl0ZW1zID0gZnVuY3Rpb24gKHZhbHVlcywgYWNjKSB7XG4gICAgICAgIHJldHVybiBhY2MuY29uY2F0KG1hcCh2YWx1ZXMsIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRleHQ6IGl0ZW0udGV4dCB8fCBpdGVtLnRpdGxlLFxuICAgICAgICAgICAgdmFsdWU6IGl0ZW0udmFsdWVcbiAgICAgICAgICB9O1xuICAgICAgICB9KSk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIGFwcGVuZEl0ZW1zKGlucHV0TGlzdCwgc3RhcnRJdGVtcyB8fCBbXSk7XG4gICAgfTtcbiAgICB2YXIgcmdiVG9IZXggPSBmdW5jdGlvbiAoZG9tKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBzdGFydHNXaXRoKHZhbHVlLCAncmdiJykgPyBkb20udG9IZXgodmFsdWUpIDogdmFsdWU7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGV4dHJhY3RBZHZhbmNlZFN0eWxlcyA9IGZ1bmN0aW9uIChkb20sIGVsbSkge1xuICAgICAgdmFyIGVsZW1lbnQgPSBFbGVtZW50LmZyb21Eb20oZWxtKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGJvcmRlcndpZHRoOiBnZXRSYXcoZWxlbWVudCwgJ2JvcmRlci13aWR0aCcpLmdldE9yKCcnKSxcbiAgICAgICAgYm9yZGVyc3R5bGU6IGdldFJhdyhlbGVtZW50LCAnYm9yZGVyLXN0eWxlJykuZ2V0T3IoJycpLFxuICAgICAgICBib3JkZXJjb2xvcjogZ2V0UmF3KGVsZW1lbnQsICdib3JkZXItY29sb3InKS5tYXAocmdiVG9IZXgoZG9tKSkuZ2V0T3IoJycpLFxuICAgICAgICBiYWNrZ3JvdW5kY29sb3I6IGdldFJhdyhlbGVtZW50LCAnYmFja2dyb3VuZC1jb2xvcicpLm1hcChyZ2JUb0hleChkb20pKS5nZXRPcignJylcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgZ2V0U2hhcmVkVmFsdWVzID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciBiYXNlRGF0YSA9IGRhdGFbMF07XG4gICAgICB2YXIgY29tcGFyaXNvbkRhdGEgPSBkYXRhLnNsaWNlKDEpO1xuICAgICAgZWFjaChjb21wYXJpc29uRGF0YSwgZnVuY3Rpb24gKGl0ZW1zKSB7XG4gICAgICAgIGVhY2goa2V5cyhiYXNlRGF0YSksIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICBlYWNoJDEoaXRlbXMsIGZ1bmN0aW9uIChpdGVtVmFsdWUsIGl0ZW1LZXkpIHtcbiAgICAgICAgICAgIHZhciBjb21wYXJpc29uVmFsdWUgPSBiYXNlRGF0YVtrZXldO1xuICAgICAgICAgICAgaWYgKGNvbXBhcmlzb25WYWx1ZSAhPT0gJycgJiYga2V5ID09PSBpdGVtS2V5KSB7XG4gICAgICAgICAgICAgIGlmIChjb21wYXJpc29uVmFsdWUgIT09IGl0ZW1WYWx1ZSkge1xuICAgICAgICAgICAgICAgIGJhc2VEYXRhW2tleV0gPSAnJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGJhc2VEYXRhO1xuICAgIH07XG4gICAgdmFyIGdldEFkdmFuY2VkVGFiID0gZnVuY3Rpb24gKGRpYWxvZ05hbWUpIHtcbiAgICAgIHZhciBhZHZUYWJJdGVtcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdib3JkZXJzdHlsZScsXG4gICAgICAgICAgdHlwZTogJ3NlbGVjdGJveCcsXG4gICAgICAgICAgbGFiZWw6ICdCb3JkZXIgc3R5bGUnLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6ICdTZWxlY3QuLi4nLFxuICAgICAgICAgICAgICB2YWx1ZTogJydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6ICdTb2xpZCcsXG4gICAgICAgICAgICAgIHZhbHVlOiAnc29saWQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiAnRG90dGVkJyxcbiAgICAgICAgICAgICAgdmFsdWU6ICdkb3R0ZWQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiAnRGFzaGVkJyxcbiAgICAgICAgICAgICAgdmFsdWU6ICdkYXNoZWQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiAnRG91YmxlJyxcbiAgICAgICAgICAgICAgdmFsdWU6ICdkb3VibGUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiAnR3Jvb3ZlJyxcbiAgICAgICAgICAgICAgdmFsdWU6ICdncm9vdmUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiAnUmlkZ2UnLFxuICAgICAgICAgICAgICB2YWx1ZTogJ3JpZGdlJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogJ0luc2V0JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICdpbnNldCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6ICdPdXRzZXQnLFxuICAgICAgICAgICAgICB2YWx1ZTogJ291dHNldCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6ICdOb25lJyxcbiAgICAgICAgICAgICAgdmFsdWU6ICdub25lJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogJ0hpZGRlbicsXG4gICAgICAgICAgICAgIHZhbHVlOiAnaGlkZGVuJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdib3JkZXJjb2xvcicsXG4gICAgICAgICAgdHlwZTogJ2NvbG9yaW5wdXQnLFxuICAgICAgICAgIGxhYmVsOiAnQm9yZGVyIGNvbG9yJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ2JhY2tncm91bmRjb2xvcicsXG4gICAgICAgICAgdHlwZTogJ2NvbG9yaW5wdXQnLFxuICAgICAgICAgIGxhYmVsOiAnQmFja2dyb3VuZCBjb2xvcidcbiAgICAgICAgfVxuICAgICAgXTtcbiAgICAgIHZhciBib3JkZXJXaWR0aCA9IHtcbiAgICAgICAgbmFtZTogJ2JvcmRlcndpZHRoJyxcbiAgICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgICAgbGFiZWw6ICdCb3JkZXIgd2lkdGgnXG4gICAgICB9O1xuICAgICAgdmFyIGl0ZW1zID0gZGlhbG9nTmFtZSA9PT0gJ2NlbGwnID8gW2JvcmRlcldpZHRoXS5jb25jYXQoYWR2VGFiSXRlbXMpIDogYWR2VGFiSXRlbXM7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZTogJ0FkdmFuY2VkJyxcbiAgICAgICAgbmFtZTogJ2FkdmFuY2VkJyxcbiAgICAgICAgaXRlbXM6IGl0ZW1zXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGdldEFsaWdubWVudCA9IGZ1bmN0aW9uIChmb3JtYXRzLCBmb3JtYXROYW1lLCBlZGl0b3IsIGVsbSkge1xuICAgICAgcmV0dXJuIGZpbmQoZm9ybWF0cywgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGVkaXRvci5mb3JtYXR0ZXIubWF0Y2hOb2RlKGVsbSwgZm9ybWF0TmFtZSArIG5hbWUpO1xuICAgICAgfSkuZ2V0T3IoJycpO1xuICAgIH07XG4gICAgdmFyIGdldEhBbGlnbm1lbnQgPSBjdXJyeShnZXRBbGlnbm1lbnQsIFtcbiAgICAgICdsZWZ0JyxcbiAgICAgICdjZW50ZXInLFxuICAgICAgJ3JpZ2h0J1xuICAgIF0sICdhbGlnbicpO1xuICAgIHZhciBnZXRWQWxpZ25tZW50ID0gY3VycnkoZ2V0QWxpZ25tZW50LCBbXG4gICAgICAndG9wJyxcbiAgICAgICdtaWRkbGUnLFxuICAgICAgJ2JvdHRvbSdcbiAgICBdLCAndmFsaWduJyk7XG4gICAgdmFyIGV4dHJhY3REYXRhRnJvbVNldHRpbmdzID0gZnVuY3Rpb24gKGVkaXRvciwgaGFzQWR2VGFibGVUYWIpIHtcbiAgICAgIHZhciBzdHlsZSA9IGdldERlZmF1bHRTdHlsZXMoZWRpdG9yKTtcbiAgICAgIHZhciBhdHRycyA9IGdldERlZmF1bHRBdHRyaWJ1dGVzKGVkaXRvcik7XG4gICAgICB2YXIgZXh0cmFjdEFkdmFuY2VkU3R5bGVEYXRhID0gZnVuY3Rpb24gKGRvbSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGJvcmRlcnN0eWxlOiBnZXQoc3R5bGUsICdib3JkZXItc3R5bGUnKS5nZXRPcignJyksXG4gICAgICAgICAgYm9yZGVyY29sb3I6IHJnYlRvSGV4KGRvbSkoZ2V0KHN0eWxlLCAnYm9yZGVyLWNvbG9yJykuZ2V0T3IoJycpKSxcbiAgICAgICAgICBiYWNrZ3JvdW5kY29sb3I6IHJnYlRvSGV4KGRvbSkoZ2V0KHN0eWxlLCAnYmFja2dyb3VuZC1jb2xvcicpLmdldE9yKCcnKSlcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICB2YXIgZGVmYXVsdERhdGEgPSB7XG4gICAgICAgIGhlaWdodDogJycsXG4gICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgIGNlbGxzcGFjaW5nOiAnJyxcbiAgICAgICAgY2VsbHBhZGRpbmc6ICcnLFxuICAgICAgICBjYXB0aW9uOiBmYWxzZSxcbiAgICAgICAgY2xhc3M6ICcnLFxuICAgICAgICBhbGlnbjogJycsXG4gICAgICAgIGJvcmRlcjogJydcbiAgICAgIH07XG4gICAgICB2YXIgZ2V0Qm9yZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYm9yZGVyV2lkdGggPSBzdHlsZVsnYm9yZGVyLXdpZHRoJ107XG4gICAgICAgIGlmIChzaG91bGRTdHlsZVdpdGhDc3MoZWRpdG9yKSAmJiBib3JkZXJXaWR0aCkge1xuICAgICAgICAgIHJldHVybiB7IGJvcmRlcjogYm9yZGVyV2lkdGggfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ2V0KGF0dHJzLCAnYm9yZGVyJykuZm9sZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9LCBmdW5jdGlvbiAoYm9yZGVyKSB7XG4gICAgICAgICAgcmV0dXJuIHsgYm9yZGVyOiBib3JkZXIgfTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgdmFyIGFkdlN0eWxlID0gaGFzQWR2VGFibGVUYWIgPyBleHRyYWN0QWR2YW5jZWRTdHlsZURhdGEoZWRpdG9yLmRvbSkgOiB7fTtcbiAgICAgIHZhciBnZXRDZWxsUGFkZGluZ0NlbGxTcGFjaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc3BhY2luZyA9IGdldChzdHlsZSwgJ2JvcmRlci1zcGFjaW5nJykub3IoZ2V0KGF0dHJzLCAnY2VsbHNwYWNpbmcnKSkuZm9sZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9LCBmdW5jdGlvbiAoY2VsbHNwYWNpbmcpIHtcbiAgICAgICAgICByZXR1cm4geyBjZWxsc3BhY2luZzogY2VsbHNwYWNpbmcgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBwYWRkaW5nID0gZ2V0KHN0eWxlLCAnYm9yZGVyLXBhZGRpbmcnKS5vcihnZXQoYXR0cnMsICdjZWxscGFkZGluZycpKS5mb2xkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH0sIGZ1bmN0aW9uIChjZWxscGFkZGluZykge1xuICAgICAgICAgIHJldHVybiB7IGNlbGxwYWRkaW5nOiBjZWxscGFkZGluZyB9O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIF9fYXNzaWduKF9fYXNzaWduKHt9LCBzcGFjaW5nKSwgcGFkZGluZyk7XG4gICAgICB9O1xuICAgICAgdmFyIGRhdGEgPSBfX2Fzc2lnbihfX2Fzc2lnbihfX2Fzc2lnbihfX2Fzc2lnbihfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZGVmYXVsdERhdGEpLCBzdHlsZSksIGF0dHJzKSwgYWR2U3R5bGUpLCBnZXRCb3JkZXIoKSksIGdldENlbGxQYWRkaW5nQ2VsbFNwYWNpbmcoKSk7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9O1xuICAgIHZhciBleHRyYWN0RGF0YUZyb21UYWJsZUVsZW1lbnQgPSBmdW5jdGlvbiAoZWRpdG9yLCBlbG0sIGhhc0FkdlRhYmxlVGFiKSB7XG4gICAgICB2YXIgZ2V0Qm9yZGVyID0gZnVuY3Rpb24gKGRvbSwgZWxtKSB7XG4gICAgICAgIHZhciBvcHRCb3JkZXJXaWR0aCA9IGdldFJhdyhFbGVtZW50LmZyb21Eb20oZWxtKSwgJ2JvcmRlci13aWR0aCcpO1xuICAgICAgICBpZiAoc2hvdWxkU3R5bGVXaXRoQ3NzKGVkaXRvcikgJiYgb3B0Qm9yZGVyV2lkdGguaXNTb21lKCkpIHtcbiAgICAgICAgICByZXR1cm4gb3B0Qm9yZGVyV2lkdGguZ2V0T3IoJycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkb20uZ2V0QXR0cmliKGVsbSwgJ2JvcmRlcicpIHx8IGdldFREVEhPdmVyYWxsU3R5bGUoZWRpdG9yLmRvbSwgZWxtLCAnYm9yZGVyLXdpZHRoJykgfHwgZ2V0VERUSE92ZXJhbGxTdHlsZShlZGl0b3IuZG9tLCBlbG0sICdib3JkZXInKTtcbiAgICAgIH07XG4gICAgICB2YXIgZG9tID0gZWRpdG9yLmRvbTtcbiAgICAgIHJldHVybiBfX2Fzc2lnbih7XG4gICAgICAgIHdpZHRoOiBkb20uZ2V0U3R5bGUoZWxtLCAnd2lkdGgnKSB8fCBkb20uZ2V0QXR0cmliKGVsbSwgJ3dpZHRoJyksXG4gICAgICAgIGhlaWdodDogZG9tLmdldFN0eWxlKGVsbSwgJ2hlaWdodCcpIHx8IGRvbS5nZXRBdHRyaWIoZWxtLCAnaGVpZ2h0JyksXG4gICAgICAgIGNlbGxzcGFjaW5nOiBkb20uZ2V0U3R5bGUoZWxtLCAnYm9yZGVyLXNwYWNpbmcnKSB8fCBkb20uZ2V0QXR0cmliKGVsbSwgJ2NlbGxzcGFjaW5nJyksXG4gICAgICAgIGNlbGxwYWRkaW5nOiBkb20uZ2V0QXR0cmliKGVsbSwgJ2NlbGxwYWRkaW5nJykgfHwgZ2V0VERUSE92ZXJhbGxTdHlsZShlZGl0b3IuZG9tLCBlbG0sICdwYWRkaW5nJyksXG4gICAgICAgIGJvcmRlcjogZ2V0Qm9yZGVyKGRvbSwgZWxtKSxcbiAgICAgICAgY2FwdGlvbjogISFkb20uc2VsZWN0KCdjYXB0aW9uJywgZWxtKVswXSxcbiAgICAgICAgY2xhc3M6IGRvbS5nZXRBdHRyaWIoZWxtLCAnY2xhc3MnLCAnJyksXG4gICAgICAgIGFsaWduOiBnZXRIQWxpZ25tZW50KGVkaXRvciwgZWxtKVxuICAgICAgfSwgaGFzQWR2VGFibGVUYWIgPyBleHRyYWN0QWR2YW5jZWRTdHlsZXMoZG9tLCBlbG0pIDoge30pO1xuICAgIH07XG4gICAgdmFyIGV4dHJhY3REYXRhRnJvbVJvd0VsZW1lbnQgPSBmdW5jdGlvbiAoZWRpdG9yLCBlbG0sIGhhc0FkdmFuY2VkUm93VGFiKSB7XG4gICAgICB2YXIgZG9tID0gZWRpdG9yLmRvbTtcbiAgICAgIHJldHVybiBfX2Fzc2lnbih7XG4gICAgICAgIGhlaWdodDogZG9tLmdldFN0eWxlKGVsbSwgJ2hlaWdodCcpIHx8IGRvbS5nZXRBdHRyaWIoZWxtLCAnaGVpZ2h0JyksXG4gICAgICAgIHNjb3BlOiBkb20uZ2V0QXR0cmliKGVsbSwgJ3Njb3BlJyksXG4gICAgICAgIGNsYXNzOiBkb20uZ2V0QXR0cmliKGVsbSwgJ2NsYXNzJywgJycpLFxuICAgICAgICB0eXBlOiBnZXRSb3dUeXBlKGVkaXRvciwgZWxtKSxcbiAgICAgICAgYWxpZ246IGdldEhBbGlnbm1lbnQoZWRpdG9yLCBlbG0pXG4gICAgICB9LCBoYXNBZHZhbmNlZFJvd1RhYiA/IGV4dHJhY3RBZHZhbmNlZFN0eWxlcyhkb20sIGVsbSkgOiB7fSk7XG4gICAgfTtcbiAgICB2YXIgZXh0cmFjdERhdGFGcm9tQ2VsbEVsZW1lbnQgPSBmdW5jdGlvbiAoZWRpdG9yLCBlbG0sIGhhc0FkdmFuY2VkQ2VsbFRhYikge1xuICAgICAgdmFyIGRvbSA9IGVkaXRvci5kb207XG4gICAgICByZXR1cm4gX19hc3NpZ24oe1xuICAgICAgICB3aWR0aDogZG9tLmdldFN0eWxlKGVsbSwgJ3dpZHRoJykgfHwgZG9tLmdldEF0dHJpYihlbG0sICd3aWR0aCcpLFxuICAgICAgICBoZWlnaHQ6IGRvbS5nZXRTdHlsZShlbG0sICdoZWlnaHQnKSB8fCBkb20uZ2V0QXR0cmliKGVsbSwgJ2hlaWdodCcpLFxuICAgICAgICBzY29wZTogZG9tLmdldEF0dHJpYihlbG0sICdzY29wZScpLFxuICAgICAgICBjZWxsdHlwZTogZ2V0Tm9kZU5hbWUoZWxtKSxcbiAgICAgICAgY2xhc3M6IGRvbS5nZXRBdHRyaWIoZWxtLCAnY2xhc3MnLCAnJyksXG4gICAgICAgIGhhbGlnbjogZ2V0SEFsaWdubWVudChlZGl0b3IsIGVsbSksXG4gICAgICAgIHZhbGlnbjogZ2V0VkFsaWdubWVudChlZGl0b3IsIGVsbSlcbiAgICAgIH0sIGhhc0FkdmFuY2VkQ2VsbFRhYiA/IGV4dHJhY3RBZHZhbmNlZFN0eWxlcyhkb20sIGVsbSkgOiB7fSk7XG4gICAgfTtcblxuICAgIHZhciBnZXRDbGFzc0xpc3QgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgY2xhc3NlcyA9IGJ1aWxkTGlzdEl0ZW1zKGdldENlbGxDbGFzc0xpc3QoZWRpdG9yKSk7XG4gICAgICBpZiAoY2xhc3Nlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBPcHRpb24uc29tZSh7XG4gICAgICAgICAgbmFtZTogJ2NsYXNzJyxcbiAgICAgICAgICB0eXBlOiAnc2VsZWN0Ym94JyxcbiAgICAgICAgICBsYWJlbDogJ0NsYXNzJyxcbiAgICAgICAgICBpdGVtczogY2xhc3Nlc1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgIH07XG4gICAgdmFyIGNoaWxkcmVuJDMgPSBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICd3aWR0aCcsXG4gICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgIGxhYmVsOiAnV2lkdGgnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnaGVpZ2h0JyxcbiAgICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgICAgbGFiZWw6ICdIZWlnaHQnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnY2VsbHR5cGUnLFxuICAgICAgICB0eXBlOiAnc2VsZWN0Ym94JyxcbiAgICAgICAgbGFiZWw6ICdDZWxsIHR5cGUnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdDZWxsJyxcbiAgICAgICAgICAgIHZhbHVlOiAndGQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnSGVhZGVyIGNlbGwnLFxuICAgICAgICAgICAgdmFsdWU6ICd0aCdcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdzY29wZScsXG4gICAgICAgIHR5cGU6ICdzZWxlY3Rib3gnLFxuICAgICAgICBsYWJlbDogJ1Njb3BlJyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnTm9uZScsXG4gICAgICAgICAgICB2YWx1ZTogJydcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdSb3cnLFxuICAgICAgICAgICAgdmFsdWU6ICdyb3cnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnQ29sdW1uJyxcbiAgICAgICAgICAgIHZhbHVlOiAnY29sJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ1JvdyBncm91cCcsXG4gICAgICAgICAgICB2YWx1ZTogJ3Jvd2dyb3VwJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0NvbHVtbiBncm91cCcsXG4gICAgICAgICAgICB2YWx1ZTogJ2NvbGdyb3VwJ1xuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ2hhbGlnbicsXG4gICAgICAgIHR5cGU6ICdzZWxlY3Rib3gnLFxuICAgICAgICBsYWJlbDogJ0ggQWxpZ24nLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdOb25lJyxcbiAgICAgICAgICAgIHZhbHVlOiAnJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0xlZnQnLFxuICAgICAgICAgICAgdmFsdWU6ICdsZWZ0J1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0NlbnRlcicsXG4gICAgICAgICAgICB2YWx1ZTogJ2NlbnRlcidcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdSaWdodCcsXG4gICAgICAgICAgICB2YWx1ZTogJ3JpZ2h0J1xuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ3ZhbGlnbicsXG4gICAgICAgIHR5cGU6ICdzZWxlY3Rib3gnLFxuICAgICAgICBsYWJlbDogJ1YgQWxpZ24nLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdOb25lJyxcbiAgICAgICAgICAgIHZhbHVlOiAnJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ1RvcCcsXG4gICAgICAgICAgICB2YWx1ZTogJ3RvcCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdNaWRkbGUnLFxuICAgICAgICAgICAgdmFsdWU6ICdtaWRkbGUnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnQm90dG9tJyxcbiAgICAgICAgICAgIHZhbHVlOiAnYm90dG9tJ1xuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIF07XG4gICAgdmFyIGdldEl0ZW1zID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGdldENsYXNzTGlzdChlZGl0b3IpLmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY2hpbGRyZW4kMztcbiAgICAgIH0sIGZ1bmN0aW9uIChjbGFzc2xpc3QpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuJDMuY29uY2F0KGNsYXNzbGlzdCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIG1vZGlmaWVycyA9IGZ1bmN0aW9uICh0ZXN0VHJ1dGh5KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGVkaXRvciwgbm9kZSkge1xuICAgICAgICB2YXIgZG9tID0gZWRpdG9yLmRvbTtcbiAgICAgICAgdmFyIHNldEF0dHJpYiA9IGZ1bmN0aW9uIChhdHRyLCB2YWx1ZSkge1xuICAgICAgICAgIGlmICghdGVzdFRydXRoeSB8fCB2YWx1ZSkge1xuICAgICAgICAgICAgZG9tLnNldEF0dHJpYihub2RlLCBhdHRyLCB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB2YXIgc2V0U3R5bGUgPSBmdW5jdGlvbiAocHJvcCwgdmFsdWUpIHtcbiAgICAgICAgICBpZiAoIXRlc3RUcnV0aHkgfHwgdmFsdWUpIHtcbiAgICAgICAgICAgIGRvbS5zZXRTdHlsZShub2RlLCBwcm9wLCB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB2YXIgc2V0Rm9ybWF0ID0gZnVuY3Rpb24gKGZvcm1hdE5hbWUsIHZhbHVlKSB7XG4gICAgICAgICAgaWYgKCF0ZXN0VHJ1dGh5IHx8IHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICAgIGVkaXRvci5mb3JtYXR0ZXIucmVtb3ZlKGZvcm1hdE5hbWUsIHsgdmFsdWU6IG51bGwgfSwgbm9kZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlZGl0b3IuZm9ybWF0dGVyLmFwcGx5KGZvcm1hdE5hbWUsIHsgdmFsdWU6IHZhbHVlIH0sIG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzZXRBdHRyaWI6IHNldEF0dHJpYixcbiAgICAgICAgICBzZXRTdHlsZTogc2V0U3R5bGUsXG4gICAgICAgICAgc2V0Rm9ybWF0OiBzZXRGb3JtYXRcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgRG9tTW9kaWZpZXIgPSB7XG4gICAgICBub3JtYWw6IG1vZGlmaWVycyhmYWxzZSksXG4gICAgICBpZlRydXRoeTogbW9kaWZpZXJzKHRydWUpXG4gICAgfTtcblxuICAgIHZhciB1cGRhdGVTaW1wbGVQcm9wcyA9IGZ1bmN0aW9uIChtb2RpZmllciwgZGF0YSkge1xuICAgICAgbW9kaWZpZXIuc2V0QXR0cmliKCdzY29wZScsIGRhdGEuc2NvcGUpO1xuICAgICAgbW9kaWZpZXIuc2V0QXR0cmliKCdjbGFzcycsIGRhdGEuY2xhc3MpO1xuICAgICAgbW9kaWZpZXIuc2V0U3R5bGUoJ3dpZHRoJywgYWRkUHhTdWZmaXgoZGF0YS53aWR0aCkpO1xuICAgICAgbW9kaWZpZXIuc2V0U3R5bGUoJ2hlaWdodCcsIGFkZFB4U3VmZml4KGRhdGEuaGVpZ2h0KSk7XG4gICAgfTtcbiAgICB2YXIgdXBkYXRlQWR2YW5jZWRQcm9wcyA9IGZ1bmN0aW9uIChtb2RpZmllciwgZGF0YSkge1xuICAgICAgbW9kaWZpZXIuc2V0Rm9ybWF0KCd0YWJsZWNlbGxiYWNrZ3JvdW5kY29sb3InLCBkYXRhLmJhY2tncm91bmRjb2xvcik7XG4gICAgICBtb2RpZmllci5zZXRGb3JtYXQoJ3RhYmxlY2VsbGJvcmRlcmNvbG9yJywgZGF0YS5ib3JkZXJjb2xvcik7XG4gICAgICBtb2RpZmllci5zZXRGb3JtYXQoJ3RhYmxlY2VsbGJvcmRlcnN0eWxlJywgZGF0YS5ib3JkZXJzdHlsZSk7XG4gICAgICBtb2RpZmllci5zZXRGb3JtYXQoJ3RhYmxlY2VsbGJvcmRlcndpZHRoJywgYWRkUHhTdWZmaXgoZGF0YS5ib3JkZXJ3aWR0aCkpO1xuICAgIH07XG4gICAgdmFyIGFwcGx5Q2VsbERhdGEgPSBmdW5jdGlvbiAoZWRpdG9yLCBjZWxscywgZGF0YSkge1xuICAgICAgdmFyIGRvbSA9IGVkaXRvci5kb207XG4gICAgICB2YXIgaXNTaW5nbGVDZWxsID0gY2VsbHMubGVuZ3RoID09PSAxO1xuICAgICAgZWFjaChjZWxscywgZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgICAgdmFyIGNlbGxFbG0gPSBkYXRhLmNlbGx0eXBlICYmIGdldE5vZGVOYW1lKGNlbGwpICE9PSBkYXRhLmNlbGx0eXBlID8gZG9tLnJlbmFtZShjZWxsLCBkYXRhLmNlbGx0eXBlKSA6IGNlbGw7XG4gICAgICAgIHZhciBtb2RpZmllciA9IGlzU2luZ2xlQ2VsbCA/IERvbU1vZGlmaWVyLm5vcm1hbChlZGl0b3IsIGNlbGxFbG0pIDogRG9tTW9kaWZpZXIuaWZUcnV0aHkoZWRpdG9yLCBjZWxsRWxtKTtcbiAgICAgICAgdXBkYXRlU2ltcGxlUHJvcHMobW9kaWZpZXIsIGRhdGEpO1xuICAgICAgICBpZiAoaGFzQWR2YW5jZWRDZWxsVGFiKGVkaXRvcikpIHtcbiAgICAgICAgICB1cGRhdGVBZHZhbmNlZFByb3BzKG1vZGlmaWVyLCBkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNTaW5nbGVDZWxsKSB7XG4gICAgICAgICAgdW5BcHBseUFsaWduKGVkaXRvciwgY2VsbEVsbSk7XG4gICAgICAgICAgdW5BcHBseVZBbGlnbihlZGl0b3IsIGNlbGxFbG0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmhhbGlnbikge1xuICAgICAgICAgIGFwcGx5QWxpZ24oZWRpdG9yLCBjZWxsRWxtLCBkYXRhLmhhbGlnbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEudmFsaWduKSB7XG4gICAgICAgICAgYXBwbHlWQWxpZ24oZWRpdG9yLCBjZWxsRWxtLCBkYXRhLnZhbGlnbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIG9uU3VibWl0Q2VsbEZvcm0gPSBmdW5jdGlvbiAoZWRpdG9yLCBjZWxscywgYXBpKSB7XG4gICAgICB2YXIgZGF0YSA9IGFwaS5nZXREYXRhKCk7XG4gICAgICBhcGkuY2xvc2UoKTtcbiAgICAgIGVkaXRvci51bmRvTWFuYWdlci50cmFuc2FjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFwcGx5Q2VsbERhdGEoZWRpdG9yLCBjZWxscywgZGF0YSk7XG4gICAgICAgIGVkaXRvci5mb2N1cygpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgb3BlbiA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBjZWxscyA9IGdldENlbGxzRnJvbVNlbGVjdGlvbihlZGl0b3IpO1xuICAgICAgaWYgKGNlbGxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgY2VsbHNEYXRhID0gbWFwKGNlbGxzLCBmdW5jdGlvbiAoY2VsbEVsbSkge1xuICAgICAgICByZXR1cm4gZXh0cmFjdERhdGFGcm9tQ2VsbEVsZW1lbnQoZWRpdG9yLCBjZWxsRWxtLCBoYXNBZHZhbmNlZENlbGxUYWIoZWRpdG9yKSk7XG4gICAgICB9KTtcbiAgICAgIHZhciBkYXRhID0gZ2V0U2hhcmVkVmFsdWVzKGNlbGxzRGF0YSk7XG4gICAgICB2YXIgZGlhbG9nVGFiUGFuZWwgPSB7XG4gICAgICAgIHR5cGU6ICd0YWJwYW5lbCcsXG4gICAgICAgIHRhYnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0aXRsZTogJ0dlbmVyYWwnLFxuICAgICAgICAgICAgbmFtZTogJ2dlbmVyYWwnLFxuICAgICAgICAgICAgaXRlbXM6IGdldEl0ZW1zKGVkaXRvcilcbiAgICAgICAgICB9LFxuICAgICAgICAgIGdldEFkdmFuY2VkVGFiKCdjZWxsJylcbiAgICAgICAgXVxuICAgICAgfTtcbiAgICAgIHZhciBkaWFsb2dQYW5lbCA9IHtcbiAgICAgICAgdHlwZTogJ3BhbmVsJyxcbiAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICB0eXBlOiAnZ3JpZCcsXG4gICAgICAgICAgICBjb2x1bW5zOiAyLFxuICAgICAgICAgICAgaXRlbXM6IGdldEl0ZW1zKGVkaXRvcilcbiAgICAgICAgICB9XVxuICAgICAgfTtcbiAgICAgIGVkaXRvci53aW5kb3dNYW5hZ2VyLm9wZW4oe1xuICAgICAgICB0aXRsZTogJ0NlbGwgUHJvcGVydGllcycsXG4gICAgICAgIHNpemU6ICdub3JtYWwnLFxuICAgICAgICBib2R5OiBoYXNBZHZhbmNlZENlbGxUYWIoZWRpdG9yKSA/IGRpYWxvZ1RhYlBhbmVsIDogZGlhbG9nUGFuZWwsXG4gICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnY2FuY2VsJyxcbiAgICAgICAgICAgIG5hbWU6ICdjYW5jZWwnLFxuICAgICAgICAgICAgdGV4dDogJ0NhbmNlbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzdWJtaXQnLFxuICAgICAgICAgICAgbmFtZTogJ3NhdmUnLFxuICAgICAgICAgICAgdGV4dDogJ1NhdmUnLFxuICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgaW5pdGlhbERhdGE6IGRhdGEsXG4gICAgICAgIG9uU3VibWl0OiBjdXJyeShvblN1Ym1pdENlbGxGb3JtLCBlZGl0b3IsIGNlbGxzKVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBnZXRDbGFzc0xpc3QkMSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBjbGFzc2VzID0gYnVpbGRMaXN0SXRlbXMoZ2V0Um93Q2xhc3NMaXN0KGVkaXRvcikpO1xuICAgICAgaWYgKGNsYXNzZXMubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gT3B0aW9uLnNvbWUoe1xuICAgICAgICAgIG5hbWU6ICdjbGFzcycsXG4gICAgICAgICAgdHlwZTogJ3NlbGVjdGJveCcsXG4gICAgICAgICAgbGFiZWw6ICdDbGFzcycsXG4gICAgICAgICAgaXRlbXM6IGNsYXNzZXNcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gT3B0aW9uLm5vbmUoKTtcbiAgICB9O1xuICAgIHZhciBmb3JtQ2hpbGRyZW4gPSBbXG4gICAgICB7XG4gICAgICAgIHR5cGU6ICdzZWxlY3Rib3gnLFxuICAgICAgICBuYW1lOiAndHlwZScsXG4gICAgICAgIGxhYmVsOiAnUm93IHR5cGUnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdIZWFkZXInLFxuICAgICAgICAgICAgdmFsdWU6ICdoZWFkZXInXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnQm9keScsXG4gICAgICAgICAgICB2YWx1ZTogJ2JvZHknXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnRm9vdGVyJyxcbiAgICAgICAgICAgIHZhbHVlOiAnZm9vdGVyJ1xuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogJ3NlbGVjdGJveCcsXG4gICAgICAgIG5hbWU6ICdhbGlnbicsXG4gICAgICAgIGxhYmVsOiAnQWxpZ25tZW50JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnTm9uZScsXG4gICAgICAgICAgICB2YWx1ZTogJydcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdMZWZ0JyxcbiAgICAgICAgICAgIHZhbHVlOiAnbGVmdCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdDZW50ZXInLFxuICAgICAgICAgICAgdmFsdWU6ICdjZW50ZXInXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnUmlnaHQnLFxuICAgICAgICAgICAgdmFsdWU6ICdyaWdodCdcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAnSGVpZ2h0JyxcbiAgICAgICAgbmFtZTogJ2hlaWdodCcsXG4gICAgICAgIHR5cGU6ICdpbnB1dCdcbiAgICAgIH1cbiAgICBdO1xuICAgIHZhciBnZXRJdGVtcyQxID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGdldENsYXNzTGlzdCQxKGVkaXRvcikuZm9sZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmb3JtQ2hpbGRyZW47XG4gICAgICB9LCBmdW5jdGlvbiAoY2xhc3Nlcykge1xuICAgICAgICByZXR1cm4gZm9ybUNoaWxkcmVuLmNvbmNhdChjbGFzc2VzKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgdXBkYXRlU2ltcGxlUHJvcHMkMSA9IGZ1bmN0aW9uIChtb2RpZmllciwgZGF0YSkge1xuICAgICAgbW9kaWZpZXIuc2V0QXR0cmliKCdzY29wZScsIGRhdGEuc2NvcGUpO1xuICAgICAgbW9kaWZpZXIuc2V0QXR0cmliKCdjbGFzcycsIGRhdGEuY2xhc3MpO1xuICAgICAgbW9kaWZpZXIuc2V0U3R5bGUoJ2hlaWdodCcsIGFkZFB4U3VmZml4KGRhdGEuaGVpZ2h0KSk7XG4gICAgfTtcbiAgICB2YXIgdXBkYXRlQWR2YW5jZWRQcm9wcyQxID0gZnVuY3Rpb24gKG1vZGlmaWVyLCBkYXRhKSB7XG4gICAgICBtb2RpZmllci5zZXRTdHlsZSgnYmFja2dyb3VuZC1jb2xvcicsIGRhdGEuYmFja2dyb3VuZGNvbG9yKTtcbiAgICAgIG1vZGlmaWVyLnNldFN0eWxlKCdib3JkZXItY29sb3InLCBkYXRhLmJvcmRlcmNvbG9yKTtcbiAgICAgIG1vZGlmaWVyLnNldFN0eWxlKCdib3JkZXItc3R5bGUnLCBkYXRhLmJvcmRlcnN0eWxlKTtcbiAgICB9O1xuICAgIHZhciBhcHBseVJvd0RhdGEgPSBmdW5jdGlvbiAoZWRpdG9yLCByb3dzLCBvbGREYXRhLCBkYXRhKSB7XG4gICAgICB2YXIgaXNTaW5nbGVSb3cgPSByb3dzLmxlbmd0aCA9PT0gMTtcbiAgICAgIGVhY2gocm93cywgZnVuY3Rpb24gKHJvd0VsbSkge1xuICAgICAgICBpZiAoZGF0YS50eXBlICE9PSBnZXROb2RlTmFtZShyb3dFbG0ucGFyZW50Tm9kZSkpIHtcbiAgICAgICAgICBzd2l0Y2hTZWN0aW9uVHlwZShlZGl0b3IsIHJvd0VsbSwgZGF0YS50eXBlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbW9kaWZpZXIgPSBpc1NpbmdsZVJvdyA/IERvbU1vZGlmaWVyLm5vcm1hbChlZGl0b3IsIHJvd0VsbSkgOiBEb21Nb2RpZmllci5pZlRydXRoeShlZGl0b3IsIHJvd0VsbSk7XG4gICAgICAgIHVwZGF0ZVNpbXBsZVByb3BzJDEobW9kaWZpZXIsIGRhdGEpO1xuICAgICAgICBpZiAoaGFzQWR2YW5jZWRSb3dUYWIoZWRpdG9yKSkge1xuICAgICAgICAgIHVwZGF0ZUFkdmFuY2VkUHJvcHMkMShtb2RpZmllciwgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuYWxpZ24gIT09IG9sZERhdGEuYWxpZ24pIHtcbiAgICAgICAgICB1bkFwcGx5QWxpZ24oZWRpdG9yLCByb3dFbG0pO1xuICAgICAgICAgIGFwcGx5QWxpZ24oZWRpdG9yLCByb3dFbG0sIGRhdGEuYWxpZ24pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBvblN1Ym1pdFJvd0Zvcm0gPSBmdW5jdGlvbiAoZWRpdG9yLCByb3dzLCBvbGREYXRhLCBhcGkpIHtcbiAgICAgIHZhciBkYXRhID0gYXBpLmdldERhdGEoKTtcbiAgICAgIGFwaS5jbG9zZSgpO1xuICAgICAgZWRpdG9yLnVuZG9NYW5hZ2VyLnRyYW5zYWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXBwbHlSb3dEYXRhKGVkaXRvciwgcm93cywgb2xkRGF0YSwgZGF0YSk7XG4gICAgICAgIGVkaXRvci5mb2N1cygpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgb3BlbiQxID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIHJvd3MgPSBnZXRSb3dzRnJvbVNlbGVjdGlvbihlZGl0b3IpO1xuICAgICAgaWYgKHJvd3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciByb3dzRGF0YSA9IG1hcChyb3dzLCBmdW5jdGlvbiAocm93RWxtKSB7XG4gICAgICAgIHJldHVybiBleHRyYWN0RGF0YUZyb21Sb3dFbGVtZW50KGVkaXRvciwgcm93RWxtLCBoYXNBZHZhbmNlZFJvd1RhYihlZGl0b3IpKTtcbiAgICAgIH0pO1xuICAgICAgdmFyIGRhdGEgPSBnZXRTaGFyZWRWYWx1ZXMocm93c0RhdGEpO1xuICAgICAgdmFyIGRpYWxvZ1RhYlBhbmVsID0ge1xuICAgICAgICB0eXBlOiAndGFicGFuZWwnLFxuICAgICAgICB0YWJzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGl0bGU6ICdHZW5lcmFsJyxcbiAgICAgICAgICAgIG5hbWU6ICdnZW5lcmFsJyxcbiAgICAgICAgICAgIGl0ZW1zOiBnZXRJdGVtcyQxKGVkaXRvcilcbiAgICAgICAgICB9LFxuICAgICAgICAgIGdldEFkdmFuY2VkVGFiKCdyb3cnKVxuICAgICAgICBdXG4gICAgICB9O1xuICAgICAgdmFyIGRpYWxvZ1BhbmVsID0ge1xuICAgICAgICB0eXBlOiAncGFuZWwnLFxuICAgICAgICBpdGVtczogW3tcbiAgICAgICAgICAgIHR5cGU6ICdncmlkJyxcbiAgICAgICAgICAgIGNvbHVtbnM6IDIsXG4gICAgICAgICAgICBpdGVtczogZ2V0SXRlbXMkMShlZGl0b3IpXG4gICAgICAgICAgfV1cbiAgICAgIH07XG4gICAgICBlZGl0b3Iud2luZG93TWFuYWdlci5vcGVuKHtcbiAgICAgICAgdGl0bGU6ICdSb3cgUHJvcGVydGllcycsXG4gICAgICAgIHNpemU6ICdub3JtYWwnLFxuICAgICAgICBib2R5OiBoYXNBZHZhbmNlZFJvd1RhYihlZGl0b3IpID8gZGlhbG9nVGFiUGFuZWwgOiBkaWFsb2dQYW5lbCxcbiAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdjYW5jZWwnLFxuICAgICAgICAgICAgbmFtZTogJ2NhbmNlbCcsXG4gICAgICAgICAgICB0ZXh0OiAnQ2FuY2VsJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3N1Ym1pdCcsXG4gICAgICAgICAgICBuYW1lOiAnc2F2ZScsXG4gICAgICAgICAgICB0ZXh0OiAnU2F2ZScsXG4gICAgICAgICAgICBwcmltYXJ5OiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBpbml0aWFsRGF0YTogZGF0YSxcbiAgICAgICAgb25TdWJtaXQ6IGN1cnJ5KG9uU3VibWl0Um93Rm9ybSwgZWRpdG9yLCByb3dzLCBkYXRhKVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBnbG9iYWwkMiA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLkVudicpO1xuXG4gICAgdmFyIGdldEl0ZW1zJDIgPSBmdW5jdGlvbiAoZWRpdG9yLCBjbGFzc2VzLCBpbnNlcnROZXdUYWJsZSkge1xuICAgICAgdmFyIHJvd0NvbENvdW50SXRlbXMgPSAhaW5zZXJ0TmV3VGFibGUgPyBbXSA6IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgICAgbmFtZTogJ2NvbHMnLFxuICAgICAgICAgIGxhYmVsOiAnQ29scycsXG4gICAgICAgICAgaW5wdXRNb2RlOiAnbnVtZXJpYydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgICAgbmFtZTogJ3Jvd3MnLFxuICAgICAgICAgIGxhYmVsOiAnUm93cycsXG4gICAgICAgICAgaW5wdXRNb2RlOiAnbnVtZXJpYydcbiAgICAgICAgfVxuICAgICAgXTtcbiAgICAgIHZhciBhbHdheXNJdGVtcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgICAgbmFtZTogJ3dpZHRoJyxcbiAgICAgICAgICBsYWJlbDogJ1dpZHRoJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgICAgICBuYW1lOiAnaGVpZ2h0JyxcbiAgICAgICAgICBsYWJlbDogJ0hlaWdodCdcbiAgICAgICAgfVxuICAgICAgXTtcbiAgICAgIHZhciBhcHBlYXJhbmNlSXRlbXMgPSBoYXNBcHBlYXJhbmNlT3B0aW9ucyhlZGl0b3IpID8gW1xuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgICAgICBuYW1lOiAnY2VsbHNwYWNpbmcnLFxuICAgICAgICAgIGxhYmVsOiAnQ2VsbCBzcGFjaW5nJyxcbiAgICAgICAgICBpbnB1dE1vZGU6ICdudW1lcmljJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgICAgICBuYW1lOiAnY2VsbHBhZGRpbmcnLFxuICAgICAgICAgIGxhYmVsOiAnQ2VsbCBwYWRkaW5nJyxcbiAgICAgICAgICBpbnB1dE1vZGU6ICdudW1lcmljJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgICAgICBuYW1lOiAnYm9yZGVyJyxcbiAgICAgICAgICBsYWJlbDogJ0JvcmRlciB3aWR0aCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdsYWJlbCcsXG4gICAgICAgICAgbGFiZWw6ICdDYXB0aW9uJyxcbiAgICAgICAgICBpdGVtczogW3tcbiAgICAgICAgICAgICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICAgICAgICAgICAgbmFtZTogJ2NhcHRpb24nLFxuICAgICAgICAgICAgICBsYWJlbDogJ1Nob3cgY2FwdGlvbidcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICAgIF0gOiBbXTtcbiAgICAgIHZhciBhbGlnbm1lbnRJdGVtID0gW3tcbiAgICAgICAgICB0eXBlOiAnc2VsZWN0Ym94JyxcbiAgICAgICAgICBuYW1lOiAnYWxpZ24nLFxuICAgICAgICAgIGxhYmVsOiAnQWxpZ25tZW50JyxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiAnTm9uZScsXG4gICAgICAgICAgICAgIHZhbHVlOiAnJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogJ0xlZnQnLFxuICAgICAgICAgICAgICB2YWx1ZTogJ2xlZnQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiAnQ2VudGVyJyxcbiAgICAgICAgICAgICAgdmFsdWU6ICdjZW50ZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiAnUmlnaHQnLFxuICAgICAgICAgICAgICB2YWx1ZTogJ3JpZ2h0J1xuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfV07XG4gICAgICB2YXIgY2xhc3NMaXN0SXRlbSA9IGNsYXNzZXMubGVuZ3RoID4gMCA/IFt7XG4gICAgICAgICAgdHlwZTogJ3NlbGVjdGJveCcsXG4gICAgICAgICAgbmFtZTogJ2NsYXNzJyxcbiAgICAgICAgICBsYWJlbDogJ0NsYXNzJyxcbiAgICAgICAgICBpdGVtczogY2xhc3Nlc1xuICAgICAgICB9XSA6IFtdO1xuICAgICAgcmV0dXJuIHJvd0NvbENvdW50SXRlbXMuY29uY2F0KGFsd2F5c0l0ZW1zKS5jb25jYXQoYXBwZWFyYW5jZUl0ZW1zKS5jb25jYXQoYWxpZ25tZW50SXRlbSkuY29uY2F0KGNsYXNzTGlzdEl0ZW0pO1xuICAgIH07XG5cbiAgICB2YXIgc3R5bGVURFRIID0gZnVuY3Rpb24gKGRvbSwgZWxtLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgaWYgKGVsbS50YWdOYW1lID09PSAnVEQnIHx8IGVsbS50YWdOYW1lID09PSAnVEgnKSB7XG4gICAgICAgIGlmIChpc1N0cmluZyhuYW1lKSkge1xuICAgICAgICAgIGRvbS5zZXRTdHlsZShlbG0sIG5hbWUsIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb20uc2V0U3R5bGUoZWxtLCBuYW1lKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGVsbS5jaGlsZHJlbikge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxtLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzdHlsZVREVEgoZG9tLCBlbG0uY2hpbGRyZW5baV0sIG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBhcHBseURhdGFUb0VsZW1lbnQgPSBmdW5jdGlvbiAoZWRpdG9yLCB0YWJsZUVsbSwgZGF0YSkge1xuICAgICAgdmFyIGRvbSA9IGVkaXRvci5kb207XG4gICAgICB2YXIgYXR0cnMgPSB7fTtcbiAgICAgIHZhciBzdHlsZXMgPSB7fTtcbiAgICAgIGF0dHJzLmNsYXNzID0gZGF0YS5jbGFzcztcbiAgICAgIHN0eWxlcy5oZWlnaHQgPSBhZGRQeFN1ZmZpeChkYXRhLmhlaWdodCk7XG4gICAgICBpZiAoZG9tLmdldEF0dHJpYih0YWJsZUVsbSwgJ3dpZHRoJykgJiYgIXNob3VsZFN0eWxlV2l0aENzcyhlZGl0b3IpKSB7XG4gICAgICAgIGF0dHJzLndpZHRoID0gcmVtb3ZlUHhTdWZmaXgoZGF0YS53aWR0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHlsZXMud2lkdGggPSBhZGRQeFN1ZmZpeChkYXRhLndpZHRoKTtcbiAgICAgIH1cbiAgICAgIGlmIChzaG91bGRTdHlsZVdpdGhDc3MoZWRpdG9yKSkge1xuICAgICAgICBzdHlsZXNbJ2JvcmRlci13aWR0aCddID0gYWRkUHhTdWZmaXgoZGF0YS5ib3JkZXIpO1xuICAgICAgICBzdHlsZXNbJ2JvcmRlci1zcGFjaW5nJ10gPSBhZGRQeFN1ZmZpeChkYXRhLmNlbGxzcGFjaW5nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF0dHJzLmJvcmRlciA9IGRhdGEuYm9yZGVyO1xuICAgICAgICBhdHRycy5jZWxscGFkZGluZyA9IGRhdGEuY2VsbHBhZGRpbmc7XG4gICAgICAgIGF0dHJzLmNlbGxzcGFjaW5nID0gZGF0YS5jZWxsc3BhY2luZztcbiAgICAgIH1cbiAgICAgIGlmIChzaG91bGRTdHlsZVdpdGhDc3MoZWRpdG9yKSAmJiB0YWJsZUVsbS5jaGlsZHJlbikge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYmxlRWxtLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgc3R5bGVURFRIKGRvbSwgdGFibGVFbG0uY2hpbGRyZW5baV0sIHtcbiAgICAgICAgICAgICdib3JkZXItd2lkdGgnOiBhZGRQeFN1ZmZpeChkYXRhLmJvcmRlciksXG4gICAgICAgICAgICAncGFkZGluZyc6IGFkZFB4U3VmZml4KGRhdGEuY2VsbHBhZGRpbmcpXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKGhhc0FkdmFuY2VkVGFibGVUYWIoZWRpdG9yKSkge1xuICAgICAgICAgICAgc3R5bGVURFRIKGRvbSwgdGFibGVFbG0uY2hpbGRyZW5baV0sIHsgJ2JvcmRlci1jb2xvcic6IGRhdGEuYm9yZGVyY29sb3IgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaGFzQWR2YW5jZWRUYWJsZVRhYihlZGl0b3IpKSB7XG4gICAgICAgIHN0eWxlc1snYmFja2dyb3VuZC1jb2xvciddID0gZGF0YS5iYWNrZ3JvdW5kY29sb3I7XG4gICAgICAgIHN0eWxlc1snYm9yZGVyLWNvbG9yJ10gPSBkYXRhLmJvcmRlcmNvbG9yO1xuICAgICAgICBzdHlsZXNbJ2JvcmRlci1zdHlsZSddID0gZGF0YS5ib3JkZXJzdHlsZTtcbiAgICAgIH1cbiAgICAgIGF0dHJzLnN0eWxlID0gZG9tLnNlcmlhbGl6ZVN0eWxlKF9fYXNzaWduKF9fYXNzaWduKHt9LCBnZXREZWZhdWx0U3R5bGVzKGVkaXRvcikpLCBzdHlsZXMpKTtcbiAgICAgIGRvbS5zZXRBdHRyaWJzKHRhYmxlRWxtLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZ2V0RGVmYXVsdEF0dHJpYnV0ZXMoZWRpdG9yKSksIGF0dHJzKSk7XG4gICAgfTtcbiAgICB2YXIgb25TdWJtaXRUYWJsZUZvcm0gPSBmdW5jdGlvbiAoZWRpdG9yLCB0YWJsZUVsbSwgYXBpKSB7XG4gICAgICB2YXIgZG9tID0gZWRpdG9yLmRvbTtcbiAgICAgIHZhciBjYXB0aW9uRWxtO1xuICAgICAgdmFyIGRhdGEgPSBhcGkuZ2V0RGF0YSgpO1xuICAgICAgYXBpLmNsb3NlKCk7XG4gICAgICBpZiAoZGF0YS5jbGFzcyA9PT0gJycpIHtcbiAgICAgICAgZGVsZXRlIGRhdGEuY2xhc3M7XG4gICAgICB9XG4gICAgICBlZGl0b3IudW5kb01hbmFnZXIudHJhbnNhY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRhYmxlRWxtKSB7XG4gICAgICAgICAgdmFyIGNvbHMgPSBwYXJzZUludChkYXRhLmNvbHMsIDEwKSB8fCAxO1xuICAgICAgICAgIHZhciByb3dzID0gcGFyc2VJbnQoZGF0YS5yb3dzLCAxMCkgfHwgMTtcbiAgICAgICAgICB0YWJsZUVsbSA9IGluc2VydChlZGl0b3IsIGNvbHMsIHJvd3MsIDAsIDApO1xuICAgICAgICB9XG4gICAgICAgIGFwcGx5RGF0YVRvRWxlbWVudChlZGl0b3IsIHRhYmxlRWxtLCBkYXRhKTtcbiAgICAgICAgY2FwdGlvbkVsbSA9IGRvbS5zZWxlY3QoJ2NhcHRpb24nLCB0YWJsZUVsbSlbMF07XG4gICAgICAgIGlmIChjYXB0aW9uRWxtICYmICFkYXRhLmNhcHRpb24pIHtcbiAgICAgICAgICBkb20ucmVtb3ZlKGNhcHRpb25FbG0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY2FwdGlvbkVsbSAmJiBkYXRhLmNhcHRpb24pIHtcbiAgICAgICAgICBjYXB0aW9uRWxtID0gZG9tLmNyZWF0ZSgnY2FwdGlvbicpO1xuICAgICAgICAgIGNhcHRpb25FbG0uaW5uZXJIVE1MID0gIWdsb2JhbCQyLmllID8gJzxiciBkYXRhLW1jZS1ib2d1cz1cIjFcIi8+JyA6IG5ic3A7XG4gICAgICAgICAgdGFibGVFbG0uaW5zZXJ0QmVmb3JlKGNhcHRpb25FbG0sIHRhYmxlRWxtLmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmFsaWduID09PSAnJykge1xuICAgICAgICAgIHVuQXBwbHlBbGlnbihlZGl0b3IsIHRhYmxlRWxtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcHBseUFsaWduKGVkaXRvciwgdGFibGVFbG0sIGRhdGEuYWxpZ24pO1xuICAgICAgICB9XG4gICAgICAgIGVkaXRvci5mb2N1cygpO1xuICAgICAgICBlZGl0b3IuYWRkVmlzdWFsKCk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBvcGVuJDIgPSBmdW5jdGlvbiAoZWRpdG9yLCBpbnNlcnROZXdUYWJsZSkge1xuICAgICAgdmFyIGRvbSA9IGVkaXRvci5kb207XG4gICAgICB2YXIgdGFibGVFbG07XG4gICAgICB2YXIgZGF0YSA9IGV4dHJhY3REYXRhRnJvbVNldHRpbmdzKGVkaXRvciwgaGFzQWR2YW5jZWRUYWJsZVRhYihlZGl0b3IpKTtcbiAgICAgIGlmIChpbnNlcnROZXdUYWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGFibGVFbG0gPSBkb20uZ2V0UGFyZW50KGVkaXRvci5zZWxlY3Rpb24uZ2V0U3RhcnQoKSwgJ3RhYmxlJyk7XG4gICAgICAgIGlmICh0YWJsZUVsbSkge1xuICAgICAgICAgIGRhdGEgPSBleHRyYWN0RGF0YUZyb21UYWJsZUVsZW1lbnQoZWRpdG9yLCB0YWJsZUVsbSwgaGFzQWR2YW5jZWRUYWJsZVRhYihlZGl0b3IpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoaGFzQWR2YW5jZWRUYWJsZVRhYihlZGl0b3IpKSB7XG4gICAgICAgICAgICBkYXRhLmJvcmRlcnN0eWxlID0gJyc7XG4gICAgICAgICAgICBkYXRhLmJvcmRlcmNvbG9yID0gJyc7XG4gICAgICAgICAgICBkYXRhLmJhY2tncm91bmRjb2xvciA9ICcnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YS5jb2xzID0gJzEnO1xuICAgICAgICBkYXRhLnJvd3MgPSAnMSc7XG4gICAgICAgIGlmIChoYXNBZHZhbmNlZFRhYmxlVGFiKGVkaXRvcikpIHtcbiAgICAgICAgICBkYXRhLmJvcmRlcnN0eWxlID0gJyc7XG4gICAgICAgICAgZGF0YS5ib3JkZXJjb2xvciA9ICcnO1xuICAgICAgICAgIGRhdGEuYmFja2dyb3VuZGNvbG9yID0gJyc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBjbGFzc2VzID0gYnVpbGRMaXN0SXRlbXMoZ2V0VGFibGVDbGFzc0xpc3QoZWRpdG9yKSk7XG4gICAgICBpZiAoY2xhc3Nlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmIChkYXRhLmNsYXNzKSB7XG4gICAgICAgICAgZGF0YS5jbGFzcyA9IGRhdGEuY2xhc3MucmVwbGFjZSgvXFxzKm1jZVxcLWl0ZW1cXC10YWJsZVxccyovZywgJycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgZ2VuZXJhbFBhbmVsID0ge1xuICAgICAgICB0eXBlOiAnZ3JpZCcsXG4gICAgICAgIGNvbHVtbnM6IDIsXG4gICAgICAgIGl0ZW1zOiBnZXRJdGVtcyQyKGVkaXRvciwgY2xhc3NlcywgaW5zZXJ0TmV3VGFibGUpXG4gICAgICB9O1xuICAgICAgdmFyIG5vbkFkdmFuY2VkRm9ybSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0eXBlOiAncGFuZWwnLFxuICAgICAgICAgIGl0ZW1zOiBbZ2VuZXJhbFBhbmVsXVxuICAgICAgICB9O1xuICAgICAgfTtcbiAgICAgIHZhciBhZHZhbmNlZEZvcm0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHlwZTogJ3RhYnBhbmVsJyxcbiAgICAgICAgICB0YWJzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRpdGxlOiAnR2VuZXJhbCcsXG4gICAgICAgICAgICAgIG5hbWU6ICdnZW5lcmFsJyxcbiAgICAgICAgICAgICAgaXRlbXM6IFtnZW5lcmFsUGFuZWxdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0QWR2YW5jZWRUYWIoJ3RhYmxlJylcbiAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgICB9O1xuICAgICAgdmFyIGRpYWxvZ0JvZHkgPSBoYXNBZHZhbmNlZFRhYmxlVGFiKGVkaXRvcikgPyBhZHZhbmNlZEZvcm0oKSA6IG5vbkFkdmFuY2VkRm9ybSgpO1xuICAgICAgZWRpdG9yLndpbmRvd01hbmFnZXIub3Blbih7XG4gICAgICAgIHRpdGxlOiAnVGFibGUgUHJvcGVydGllcycsXG4gICAgICAgIHNpemU6ICdub3JtYWwnLFxuICAgICAgICBib2R5OiBkaWFsb2dCb2R5LFxuICAgICAgICBvblN1Ym1pdDogY3Vycnkob25TdWJtaXRUYWJsZUZvcm0sIGVkaXRvciwgdGFibGVFbG0pLFxuICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2NhbmNlbCcsXG4gICAgICAgICAgICBuYW1lOiAnY2FuY2VsJyxcbiAgICAgICAgICAgIHRleHQ6ICdDYW5jZWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnc3VibWl0JyxcbiAgICAgICAgICAgIG5hbWU6ICdzYXZlJyxcbiAgICAgICAgICAgIHRleHQ6ICdTYXZlJyxcbiAgICAgICAgICAgIHByaW1hcnk6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGluaXRpYWxEYXRhOiBkYXRhXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHJlZ2lzdGVyQ29tbWFuZHMgPSBmdW5jdGlvbiAoZWRpdG9yLCBhY3Rpb25zLCBjZWxsU2VsZWN0aW9uLCBzZWxlY3Rpb25zLCBjbGlwYm9hcmQpIHtcbiAgICAgIHZhciBpc1Jvb3QgPSBnZXRJc1Jvb3QoZWRpdG9yKTtcbiAgICAgIHZhciBlcmFzZVRhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZ2V0U2VsZWN0aW9uU3RhcnRDZWxsT3JDYXB0aW9uKGVkaXRvcikuZWFjaChmdW5jdGlvbiAoY2VsbE9yQ2FwdGlvbikge1xuICAgICAgICAgIHRhYmxlKGNlbGxPckNhcHRpb24sIGlzUm9vdCkuZmlsdGVyKG5vdChpc1Jvb3QpKS5lYWNoKGZ1bmN0aW9uICh0YWJsZSkge1xuICAgICAgICAgICAgdmFyIGN1cnNvciA9IEVsZW1lbnQuZnJvbVRleHQoJycpO1xuICAgICAgICAgICAgYWZ0ZXIodGFibGUsIGN1cnNvcik7XG4gICAgICAgICAgICByZW1vdmUkMih0YWJsZSk7XG4gICAgICAgICAgICBpZiAoZWRpdG9yLmRvbS5pc0VtcHR5KGVkaXRvci5nZXRCb2R5KCkpKSB7XG4gICAgICAgICAgICAgIGVkaXRvci5zZXRDb250ZW50KCcnKTtcbiAgICAgICAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5zZXRDdXJzb3JMb2NhdGlvbigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdmFyIHJuZyA9IGVkaXRvci5kb20uY3JlYXRlUm5nKCk7XG4gICAgICAgICAgICAgIHJuZy5zZXRTdGFydChjdXJzb3IuZG9tKCksIDApO1xuICAgICAgICAgICAgICBybmcuc2V0RW5kKGN1cnNvci5kb20oKSwgMCk7XG4gICAgICAgICAgICAgIGVkaXRvci5zZWxlY3Rpb24uc2V0Um5nKHJuZyk7XG4gICAgICAgICAgICAgIGVkaXRvci5ub2RlQ2hhbmdlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICB2YXIgc2V0U2l6aW5nTW9kZSA9IGZ1bmN0aW9uIChzaXppbmcpIHtcbiAgICAgICAgcmV0dXJuIGdldFNlbGVjdGlvblN0YXJ0Q2VsbE9yQ2FwdGlvbihlZGl0b3IpLmVhY2goZnVuY3Rpb24gKGNlbGxPckNhcHRpb24pIHtcbiAgICAgICAgICB2YXIgaXNGb3JjZWRTaXppbmcgPSBpc1Jlc3BvbnNpdmVGb3JjZWQoZWRpdG9yKSB8fCBpc1BpeGVsc0ZvcmNlZChlZGl0b3IpIHx8IGlzUGVyY2VudGFnZXNGb3JjZWQoZWRpdG9yKTtcbiAgICAgICAgICBpZiAoIWlzRm9yY2VkU2l6aW5nKSB7XG4gICAgICAgICAgICB0YWJsZShjZWxsT3JDYXB0aW9uLCBpc1Jvb3QpLmVhY2goZnVuY3Rpb24gKHRhYmxlKSB7XG4gICAgICAgICAgICAgIGlmIChzaXppbmcgPT09ICdyZWxhdGl2ZScgJiYgIWlzUGVyY2VudFNpemluZyQxKHRhYmxlKSkge1xuICAgICAgICAgICAgICAgIGVuZm9yY2VQZXJjZW50YWdlKGVkaXRvciwgdGFibGUpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNpemluZyA9PT0gJ2ZpeGVkJyAmJiAhaXNQaXhlbFNpemluZyQxKHRhYmxlKSkge1xuICAgICAgICAgICAgICAgIGVuZm9yY2VQaXhlbHMoZWRpdG9yLCB0YWJsZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2l6aW5nID09PSAncmVzcG9uc2l2ZScgJiYgIWlzTm9uZVNpemluZyQxKHRhYmxlKSkge1xuICAgICAgICAgICAgICAgIGVuZm9yY2VOb25lKHRhYmxlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZW1vdmVEYXRhU3R5bGUodGFibGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICB2YXIgZ2V0VGFibGVGcm9tQ2VsbCA9IGZ1bmN0aW9uIChjZWxsKSB7XG4gICAgICAgIHJldHVybiB0YWJsZShjZWxsLCBpc1Jvb3QpO1xuICAgICAgfTtcbiAgICAgIHZhciBhY3RPblNlbGVjdGlvbiA9IGZ1bmN0aW9uIChleGVjdXRlKSB7XG4gICAgICAgIHJldHVybiBnZXRTZWxlY3Rpb25TdGFydENlbGwoZWRpdG9yKS5lYWNoKGZ1bmN0aW9uIChjZWxsKSB7XG4gICAgICAgICAgZ2V0VGFibGVGcm9tQ2VsbChjZWxsKS5lYWNoKGZ1bmN0aW9uICh0YWJsZSkge1xuICAgICAgICAgICAgdmFyIHRhcmdldHMgPSBmb3JNZW51KHNlbGVjdGlvbnMsIHRhYmxlLCBjZWxsKTtcbiAgICAgICAgICAgIGV4ZWN1dGUodGFibGUsIHRhcmdldHMpLmVhY2goZnVuY3Rpb24gKHJuZykge1xuICAgICAgICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLnNldFJuZyhybmcpO1xuICAgICAgICAgICAgICBlZGl0b3IuZm9jdXMoKTtcbiAgICAgICAgICAgICAgY2VsbFNlbGVjdGlvbi5jbGVhcih0YWJsZSk7XG4gICAgICAgICAgICAgIHJlbW92ZURhdGFTdHlsZSh0YWJsZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgdmFyIGNvcHlSb3dTZWxlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBnZXRTZWxlY3Rpb25TdGFydENlbGwoZWRpdG9yKS5tYXAoZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0VGFibGVGcm9tQ2VsbChjZWxsKS5iaW5kKGZ1bmN0aW9uICh0YWJsZSkge1xuICAgICAgICAgICAgdmFyIHRhcmdldHMgPSBmb3JNZW51KHNlbGVjdGlvbnMsIHRhYmxlLCBjZWxsKTtcbiAgICAgICAgICAgIHZhciBnZW5lcmF0b3JzID0gY2VsbE9wZXJhdGlvbnMobm9vcCwgRWxlbWVudC5mcm9tRG9tKGVkaXRvci5nZXREb2MoKSksIE9wdGlvbi5ub25lKCkpO1xuICAgICAgICAgICAgcmV0dXJuIGNvcHlSb3dzKHRhYmxlLCB0YXJnZXRzLCBnZW5lcmF0b3JzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgdmFyIGNvcHlDb2xTZWxlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBnZXRTZWxlY3Rpb25TdGFydENlbGwoZWRpdG9yKS5tYXAoZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0VGFibGVGcm9tQ2VsbChjZWxsKS5iaW5kKGZ1bmN0aW9uICh0YWJsZSkge1xuICAgICAgICAgICAgdmFyIHRhcmdldHMgPSBmb3JNZW51KHNlbGVjdGlvbnMsIHRhYmxlLCBjZWxsKTtcbiAgICAgICAgICAgIHJldHVybiBjb3B5Q29scyh0YWJsZSwgdGFyZ2V0cyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIHZhciBwYXN0ZU9uU2VsZWN0aW9uID0gZnVuY3Rpb24gKGV4ZWN1dGUsIGdldFJvd3MpIHtcbiAgICAgICAgcmV0dXJuIGdldFJvd3MoKS5lYWNoKGZ1bmN0aW9uIChyb3dzKSB7XG4gICAgICAgICAgdmFyIGNsb25lZFJvd3MgPSBtYXAocm93cywgZnVuY3Rpb24gKHJvdykge1xuICAgICAgICAgICAgcmV0dXJuIGRlZXAocm93KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBnZXRTZWxlY3Rpb25TdGFydENlbGwoZWRpdG9yKS5lYWNoKGZ1bmN0aW9uIChjZWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0VGFibGVGcm9tQ2VsbChjZWxsKS5lYWNoKGZ1bmN0aW9uICh0YWJsZSkge1xuICAgICAgICAgICAgICB2YXIgZ2VuZXJhdG9ycyA9IHBhc3RlKEVsZW1lbnQuZnJvbURvbShlZGl0b3IuZ2V0RG9jKCkpKTtcbiAgICAgICAgICAgICAgdmFyIHRhcmdldHMgPSBwYXN0ZVJvd3Moc2VsZWN0aW9ucywgY2VsbCwgY2xvbmVkUm93cywgZ2VuZXJhdG9ycyk7XG4gICAgICAgICAgICAgIGV4ZWN1dGUodGFibGUsIHRhcmdldHMpLmVhY2goZnVuY3Rpb24gKHJuZykge1xuICAgICAgICAgICAgICAgIGVkaXRvci5zZWxlY3Rpb24uc2V0Um5nKHJuZyk7XG4gICAgICAgICAgICAgICAgZWRpdG9yLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgY2VsbFNlbGVjdGlvbi5jbGVhcih0YWJsZSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIGVhY2gkMSh7XG4gICAgICAgIG1jZVRhYmxlU3BsaXRDZWxsczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBhY3RPblNlbGVjdGlvbihhY3Rpb25zLnVubWVyZ2VDZWxscyk7XG4gICAgICAgIH0sXG4gICAgICAgIG1jZVRhYmxlTWVyZ2VDZWxsczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBhY3RPblNlbGVjdGlvbihhY3Rpb25zLm1lcmdlQ2VsbHMpO1xuICAgICAgICB9LFxuICAgICAgICBtY2VUYWJsZUluc2VydFJvd0JlZm9yZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBhY3RPblNlbGVjdGlvbihhY3Rpb25zLmluc2VydFJvd3NCZWZvcmUpO1xuICAgICAgICB9LFxuICAgICAgICBtY2VUYWJsZUluc2VydFJvd0FmdGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGFjdE9uU2VsZWN0aW9uKGFjdGlvbnMuaW5zZXJ0Um93c0FmdGVyKTtcbiAgICAgICAgfSxcbiAgICAgICAgbWNlVGFibGVJbnNlcnRDb2xCZWZvcmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gYWN0T25TZWxlY3Rpb24oYWN0aW9ucy5pbnNlcnRDb2x1bW5zQmVmb3JlKTtcbiAgICAgICAgfSxcbiAgICAgICAgbWNlVGFibGVJbnNlcnRDb2xBZnRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBhY3RPblNlbGVjdGlvbihhY3Rpb25zLmluc2VydENvbHVtbnNBZnRlcik7XG4gICAgICAgIH0sXG4gICAgICAgIG1jZVRhYmxlRGVsZXRlQ29sOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGFjdE9uU2VsZWN0aW9uKGFjdGlvbnMuZGVsZXRlQ29sdW1uKTtcbiAgICAgICAgfSxcbiAgICAgICAgbWNlVGFibGVEZWxldGVSb3c6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gYWN0T25TZWxlY3Rpb24oYWN0aW9ucy5kZWxldGVSb3cpO1xuICAgICAgICB9LFxuICAgICAgICBtY2VUYWJsZUN1dENvbDogZnVuY3Rpb24gKF9ncmlkKSB7XG4gICAgICAgICAgcmV0dXJuIGNvcHlDb2xTZWxlY3Rpb24oKS5lYWNoKGZ1bmN0aW9uIChzZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGNsaXBib2FyZC5zZXRDb2x1bW5zKHNlbGVjdGlvbik7XG4gICAgICAgICAgICBhY3RPblNlbGVjdGlvbihhY3Rpb25zLmRlbGV0ZUNvbHVtbik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG1jZVRhYmxlQ3V0Um93OiBmdW5jdGlvbiAoX2dyaWQpIHtcbiAgICAgICAgICByZXR1cm4gY29weVJvd1NlbGVjdGlvbigpLmVhY2goZnVuY3Rpb24gKHNlbGVjdGlvbikge1xuICAgICAgICAgICAgY2xpcGJvYXJkLnNldFJvd3Moc2VsZWN0aW9uKTtcbiAgICAgICAgICAgIGFjdE9uU2VsZWN0aW9uKGFjdGlvbnMuZGVsZXRlUm93KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgbWNlVGFibGVDb3B5Q29sOiBmdW5jdGlvbiAoX2dyaWQpIHtcbiAgICAgICAgICByZXR1cm4gY29weUNvbFNlbGVjdGlvbigpLmVhY2goZnVuY3Rpb24gKHNlbGVjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGNsaXBib2FyZC5zZXRDb2x1bW5zKHNlbGVjdGlvbik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG1jZVRhYmxlQ29weVJvdzogZnVuY3Rpb24gKF9ncmlkKSB7XG4gICAgICAgICAgcmV0dXJuIGNvcHlSb3dTZWxlY3Rpb24oKS5lYWNoKGZ1bmN0aW9uIChzZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBjbGlwYm9hcmQuc2V0Um93cyhzZWxlY3Rpb24pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBtY2VUYWJsZVBhc3RlQ29sQmVmb3JlOiBmdW5jdGlvbiAoX2dyaWQpIHtcbiAgICAgICAgICByZXR1cm4gcGFzdGVPblNlbGVjdGlvbihhY3Rpb25zLnBhc3RlQ29sc0JlZm9yZSwgY2xpcGJvYXJkLmdldENvbHVtbnMpO1xuICAgICAgICB9LFxuICAgICAgICBtY2VUYWJsZVBhc3RlQ29sQWZ0ZXI6IGZ1bmN0aW9uIChfZ3JpZCkge1xuICAgICAgICAgIHJldHVybiBwYXN0ZU9uU2VsZWN0aW9uKGFjdGlvbnMucGFzdGVDb2xzQWZ0ZXIsIGNsaXBib2FyZC5nZXRDb2x1bW5zKTtcbiAgICAgICAgfSxcbiAgICAgICAgbWNlVGFibGVQYXN0ZVJvd0JlZm9yZTogZnVuY3Rpb24gKF9ncmlkKSB7XG4gICAgICAgICAgcmV0dXJuIHBhc3RlT25TZWxlY3Rpb24oYWN0aW9ucy5wYXN0ZVJvd3NCZWZvcmUsIGNsaXBib2FyZC5nZXRSb3dzKTtcbiAgICAgICAgfSxcbiAgICAgICAgbWNlVGFibGVQYXN0ZVJvd0FmdGVyOiBmdW5jdGlvbiAoX2dyaWQpIHtcbiAgICAgICAgICByZXR1cm4gcGFzdGVPblNlbGVjdGlvbihhY3Rpb25zLnBhc3RlUm93c0FmdGVyLCBjbGlwYm9hcmQuZ2V0Um93cyk7XG4gICAgICAgIH0sXG4gICAgICAgIG1jZVRhYmxlRGVsZXRlOiBlcmFzZVRhYmxlLFxuICAgICAgICBtY2VUYWJsZVNpemluZ01vZGU6IGZ1bmN0aW9uICh1aSwgc2l6aW5nKSB7XG4gICAgICAgICAgcmV0dXJuIHNldFNpemluZ01vZGUoc2l6aW5nKTtcbiAgICAgICAgfVxuICAgICAgfSwgZnVuY3Rpb24gKGZ1bmMsIG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGVkaXRvci5hZGRDb21tYW5kKG5hbWUsIGZ1bmMpO1xuICAgICAgfSk7XG4gICAgICBlYWNoJDEoe1xuICAgICAgICBtY2VUYWJsZUNlbGxUeXBlOiBmdW5jdGlvbiAoX3VpLCBhcmdzKSB7XG4gICAgICAgICAgcmV0dXJuIGFjdGlvbnMuc2V0VGFibGVDZWxsVHlwZShlZGl0b3IsIGFyZ3MpO1xuICAgICAgICB9LFxuICAgICAgICBtY2VUYWJsZVJvd1R5cGU6IGZ1bmN0aW9uIChfdWksIGFyZ3MpIHtcbiAgICAgICAgICByZXR1cm4gYWN0aW9ucy5zZXRUYWJsZVJvd1R5cGUoZWRpdG9yLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgfSwgZnVuY3Rpb24gKGZ1bmMsIG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGVkaXRvci5hZGRDb21tYW5kKG5hbWUsIGZ1bmMpO1xuICAgICAgfSk7XG4gICAgICBlZGl0b3IuYWRkQ29tbWFuZCgnbWNlVGFibGVDb2xUeXBlJywgZnVuY3Rpb24gKF91aSwgYXJncykge1xuICAgICAgICByZXR1cm4gZ2V0KGFyZ3MsICd0eXBlJykuZWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICAgIHJldHVybiBhY3RPblNlbGVjdGlvbih0eXBlID09PSAndGgnID8gYWN0aW9ucy5tYWtlQ29sdW1uSGVhZGVyIDogYWN0aW9ucy51bm1ha2VDb2x1bW5IZWFkZXIpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgZWFjaCQxKHtcbiAgICAgICAgbWNlVGFibGVQcm9wczogY3Vycnkob3BlbiQyLCBlZGl0b3IsIGZhbHNlKSxcbiAgICAgICAgbWNlVGFibGVSb3dQcm9wczogY3Vycnkob3BlbiQxLCBlZGl0b3IpLFxuICAgICAgICBtY2VUYWJsZUNlbGxQcm9wczogY3Vycnkob3BlbiwgZWRpdG9yKVxuICAgICAgfSwgZnVuY3Rpb24gKGZ1bmMsIG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGVkaXRvci5hZGRDb21tYW5kKG5hbWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZnVuYygpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLmFkZENvbW1hbmQoJ21jZUluc2VydFRhYmxlJywgZnVuY3Rpb24gKF91aSwgYXJncykge1xuICAgICAgICBpZiAoaXNPYmplY3QoYXJncykgJiYga2V5cyhhcmdzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgaW5zZXJ0VGFibGVXaXRoRGF0YVZhbGlkYXRpb24oZWRpdG9yLCBhcmdzLnJvd3MsIGFyZ3MuY29sdW1ucywgYXJncy5vcHRpb25zLCAnSW52YWxpZCB2YWx1ZXMgZm9yIG1jZUluc2VydFRhYmxlIC0gcm93cyBhbmQgY29sdW1ucyB2YWx1ZXMgYXJlIHJlcXVpcmVkIHRvIGluc2VydCBhIHRhYmxlLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wZW4kMihlZGl0b3IsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci5hZGRDb21tYW5kKCdtY2VUYWJsZUFwcGx5Q2VsbFN0eWxlJywgZnVuY3Rpb24gKF91aSwgYXJncykge1xuICAgICAgICBpZiAoIWlzT2JqZWN0KGFyZ3MpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjZWxscyA9IGdldENlbGxzRnJvbVNlbGVjdGlvbihlZGl0b3IpO1xuICAgICAgICBpZiAoY2VsbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVhY2gkMShhcmdzLCBmdW5jdGlvbiAodmFsdWUsIHN0eWxlKSB7XG4gICAgICAgICAgdmFyIGZvcm1hdE5hbWUgPSAndGFibGVjZWxsJyArIHN0eWxlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnLScsICcnKTtcbiAgICAgICAgICBpZiAoZWRpdG9yLmZvcm1hdHRlci5oYXMoZm9ybWF0TmFtZSkgJiYgaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgICAgICBlYWNoKGNlbGxzLCBmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICAgICAgICBEb21Nb2RpZmllci5ub3JtYWwoZWRpdG9yLCBjZWxsKS5zZXRGb3JtYXQoZm9ybWF0TmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgcmVnaXN0ZXJRdWVyeUNvbW1hbmRzID0gZnVuY3Rpb24gKGVkaXRvciwgYWN0aW9ucywgc2VsZWN0aW9ucykge1xuICAgICAgdmFyIGlzUm9vdCA9IGdldElzUm9vdChlZGl0b3IpO1xuICAgICAgdmFyIGdldFRhYmxlRnJvbUNlbGwgPSBmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICByZXR1cm4gdGFibGUoY2VsbCwgaXNSb290KTtcbiAgICAgIH07XG4gICAgICBlYWNoJDEoe1xuICAgICAgICBtY2VUYWJsZVJvd1R5cGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gYWN0aW9ucy5nZXRUYWJsZVJvd1R5cGUoZWRpdG9yKTtcbiAgICAgICAgfSxcbiAgICAgICAgbWNlVGFibGVDZWxsVHlwZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBhY3Rpb25zLmdldFRhYmxlQ2VsbFR5cGUoZWRpdG9yKTtcbiAgICAgICAgfSxcbiAgICAgICAgbWNlVGFibGVDb2xUeXBlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGdldFNlbGVjdGlvblN0YXJ0Q2VsbChlZGl0b3IpLmJpbmQoZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRUYWJsZUZyb21DZWxsKGNlbGwpLm1hcChmdW5jdGlvbiAodGFibGUpIHtcbiAgICAgICAgICAgICAgdmFyIHRhcmdldHMgPSBmb3JNZW51KHNlbGVjdGlvbnMsIHRhYmxlLCBjZWxsKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnMuZ2V0VGFibGVDb2xUeXBlKHRhYmxlLCB0YXJnZXRzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pLmdldE9yKCcnKTtcbiAgICAgICAgfVxuICAgICAgfSwgZnVuY3Rpb24gKGZ1bmMsIG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGVkaXRvci5hZGRRdWVyeVZhbHVlSGFuZGxlcihuYW1lLCBmdW5jKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgQ2xpcGJvYXJkID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHJvd3MgPSBDZWxsKE9wdGlvbi5ub25lKCkpO1xuICAgICAgdmFyIGNvbHMgPSBDZWxsKE9wdGlvbi5ub25lKCkpO1xuICAgICAgdmFyIGNsZWFyQ2xpcGJvYXJkID0gZnVuY3Rpb24gKGNsaXBib2FyZCkge1xuICAgICAgICBjbGlwYm9hcmQuc2V0KE9wdGlvbi5ub25lKCkpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdldFJvd3M6IHJvd3MuZ2V0LFxuICAgICAgICBzZXRSb3dzOiBmdW5jdGlvbiAocikge1xuICAgICAgICAgIHJvd3Muc2V0KHIpO1xuICAgICAgICAgIGNsZWFyQ2xpcGJvYXJkKGNvbHMpO1xuICAgICAgICB9LFxuICAgICAgICBjbGVhclJvd3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gY2xlYXJDbGlwYm9hcmQocm93cyk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldENvbHVtbnM6IGNvbHMuZ2V0LFxuICAgICAgICBzZXRDb2x1bW5zOiBmdW5jdGlvbiAoYykge1xuICAgICAgICAgIGNvbHMuc2V0KGMpO1xuICAgICAgICAgIGNsZWFyQ2xpcGJvYXJkKHJvd3MpO1xuICAgICAgICB9LFxuICAgICAgICBjbGVhckNvbHVtbnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gY2xlYXJDbGlwYm9hcmQoY29scyk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciBhZHQkMiA9IEFkdC5nZW5lcmF0ZShbXG4gICAgICB7IG5vbmU6IFsnY3VycmVudCddIH0sXG4gICAgICB7IGZpcnN0OiBbJ2N1cnJlbnQnXSB9LFxuICAgICAge1xuICAgICAgICBtaWRkbGU6IFtcbiAgICAgICAgICAnY3VycmVudCcsXG4gICAgICAgICAgJ3RhcmdldCdcbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHsgbGFzdDogWydjdXJyZW50J10gfVxuICAgIF0pO1xuICAgIHZhciBub25lJDIgPSBmdW5jdGlvbiAoY3VycmVudCkge1xuICAgICAgaWYgKGN1cnJlbnQgPT09IHZvaWQgMCkge1xuICAgICAgICBjdXJyZW50ID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFkdCQyLm5vbmUoY3VycmVudCk7XG4gICAgfTtcbiAgICB2YXIgQ2VsbExvY2F0aW9uID0gX19hc3NpZ24oX19hc3NpZ24oe30sIGFkdCQyKSwgeyBub25lOiBub25lJDIgfSk7XG5cbiAgICB2YXIgZGV0ZWN0JDQgPSBmdW5jdGlvbiAoY3VycmVudCwgaXNSb290KSB7XG4gICAgICByZXR1cm4gdGFibGUoY3VycmVudCwgaXNSb290KS5iaW5kKGZ1bmN0aW9uICh0YWJsZSkge1xuICAgICAgICB2YXIgYWxsID0gY2VsbHModGFibGUpO1xuICAgICAgICB2YXIgaW5kZXggPSBmaW5kSW5kZXgoYWxsLCBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgIHJldHVybiBlcShjdXJyZW50LCB4KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBpbmRleC5tYXAoZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIGFsbDogYWxsXG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBuZXh0ID0gZnVuY3Rpb24gKGN1cnJlbnQsIGlzUm9vdCkge1xuICAgICAgdmFyIGRldGVjdGlvbiA9IGRldGVjdCQ0KGN1cnJlbnQsIGlzUm9vdCk7XG4gICAgICByZXR1cm4gZGV0ZWN0aW9uLmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gQ2VsbExvY2F0aW9uLm5vbmUoY3VycmVudCk7XG4gICAgICB9LCBmdW5jdGlvbiAoaW5mbykge1xuICAgICAgICByZXR1cm4gaW5mby5pbmRleCArIDEgPCBpbmZvLmFsbC5sZW5ndGggPyBDZWxsTG9jYXRpb24ubWlkZGxlKGN1cnJlbnQsIGluZm8uYWxsW2luZm8uaW5kZXggKyAxXSkgOiBDZWxsTG9jYXRpb24ubGFzdChjdXJyZW50KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHByZXYgPSBmdW5jdGlvbiAoY3VycmVudCwgaXNSb290KSB7XG4gICAgICB2YXIgZGV0ZWN0aW9uID0gZGV0ZWN0JDQoY3VycmVudCwgaXNSb290KTtcbiAgICAgIHJldHVybiBkZXRlY3Rpb24uZm9sZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBDZWxsTG9jYXRpb24ubm9uZSgpO1xuICAgICAgfSwgZnVuY3Rpb24gKGluZm8pIHtcbiAgICAgICAgcmV0dXJuIGluZm8uaW5kZXggLSAxID49IDAgPyBDZWxsTG9jYXRpb24ubWlkZGxlKGN1cnJlbnQsIGluZm8uYWxsW2luZm8uaW5kZXggLSAxXSkgOiBDZWxsTG9jYXRpb24uZmlyc3QoY3VycmVudCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIGNyZWF0ZSQyID0gZnVuY3Rpb24gKHN0YXJ0LCBzb2Zmc2V0LCBmaW5pc2gsIGZvZmZzZXQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0OiBjb25zdGFudChzdGFydCksXG4gICAgICAgIHNvZmZzZXQ6IGNvbnN0YW50KHNvZmZzZXQpLFxuICAgICAgICBmaW5pc2g6IGNvbnN0YW50KGZpbmlzaCksXG4gICAgICAgIGZvZmZzZXQ6IGNvbnN0YW50KGZvZmZzZXQpXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIFNpbVJhbmdlID0geyBjcmVhdGU6IGNyZWF0ZSQyIH07XG5cbiAgICB2YXIgYWR0JDMgPSBBZHQuZ2VuZXJhdGUoW1xuICAgICAgeyBiZWZvcmU6IFsnZWxlbWVudCddIH0sXG4gICAgICB7XG4gICAgICAgIG9uOiBbXG4gICAgICAgICAgJ2VsZW1lbnQnLFxuICAgICAgICAgICdvZmZzZXQnXG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7IGFmdGVyOiBbJ2VsZW1lbnQnXSB9XG4gICAgXSk7XG4gICAgdmFyIGNhdGEkMSA9IGZ1bmN0aW9uIChzdWJqZWN0LCBvbkJlZm9yZSwgb25Pbiwgb25BZnRlcikge1xuICAgICAgcmV0dXJuIHN1YmplY3QuZm9sZChvbkJlZm9yZSwgb25Pbiwgb25BZnRlcik7XG4gICAgfTtcbiAgICB2YXIgZ2V0U3RhcnQgPSBmdW5jdGlvbiAoc2l0dSkge1xuICAgICAgcmV0dXJuIHNpdHUuZm9sZChpZGVudGl0eSwgaWRlbnRpdHksIGlkZW50aXR5KTtcbiAgICB9O1xuICAgIHZhciBiZWZvcmUkMiA9IGFkdCQzLmJlZm9yZTtcbiAgICB2YXIgb24gPSBhZHQkMy5vbjtcbiAgICB2YXIgYWZ0ZXIkMiA9IGFkdCQzLmFmdGVyO1xuICAgIHZhciBTaXR1ID0ge1xuICAgICAgYmVmb3JlOiBiZWZvcmUkMixcbiAgICAgIG9uOiBvbixcbiAgICAgIGFmdGVyOiBhZnRlciQyLFxuICAgICAgY2F0YTogY2F0YSQxLFxuICAgICAgZ2V0U3RhcnQ6IGdldFN0YXJ0XG4gICAgfTtcblxuICAgIHZhciBhZHQkNCA9IEFkdC5nZW5lcmF0ZShbXG4gICAgICB7IGRvbVJhbmdlOiBbJ3JuZyddIH0sXG4gICAgICB7XG4gICAgICAgIHJlbGF0aXZlOiBbXG4gICAgICAgICAgJ3N0YXJ0U2l0dScsXG4gICAgICAgICAgJ2ZpbmlzaFNpdHUnXG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGV4YWN0OiBbXG4gICAgICAgICAgJ3N0YXJ0JyxcbiAgICAgICAgICAnc29mZnNldCcsXG4gICAgICAgICAgJ2ZpbmlzaCcsXG4gICAgICAgICAgJ2ZvZmZzZXQnXG4gICAgICAgIF1cbiAgICAgIH1cbiAgICBdKTtcbiAgICB2YXIgZXhhY3RGcm9tUmFuZ2UgPSBmdW5jdGlvbiAoc2ltUmFuZ2UpIHtcbiAgICAgIHJldHVybiBhZHQkNC5leGFjdChzaW1SYW5nZS5zdGFydCgpLCBzaW1SYW5nZS5zb2Zmc2V0KCksIHNpbVJhbmdlLmZpbmlzaCgpLCBzaW1SYW5nZS5mb2Zmc2V0KCkpO1xuICAgIH07XG4gICAgdmFyIGdldFN0YXJ0JDEgPSBmdW5jdGlvbiAoc2VsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uLm1hdGNoKHtcbiAgICAgICAgZG9tUmFuZ2U6IGZ1bmN0aW9uIChybmcpIHtcbiAgICAgICAgICByZXR1cm4gRWxlbWVudC5mcm9tRG9tKHJuZy5zdGFydENvbnRhaW5lcik7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbGF0aXZlOiBmdW5jdGlvbiAoc3RhcnRTaXR1LCBfZmluaXNoU2l0dSkge1xuICAgICAgICAgIHJldHVybiBTaXR1LmdldFN0YXJ0KHN0YXJ0U2l0dSk7XG4gICAgICAgIH0sXG4gICAgICAgIGV4YWN0OiBmdW5jdGlvbiAoc3RhcnQsIF9zb2Zmc2V0LCBfZmluaXNoLCBfZm9mZnNldCkge1xuICAgICAgICAgIHJldHVybiBzdGFydDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgZG9tUmFuZ2UgPSBhZHQkNC5kb21SYW5nZTtcbiAgICB2YXIgcmVsYXRpdmUgPSBhZHQkNC5yZWxhdGl2ZTtcbiAgICB2YXIgZXhhY3QgPSBhZHQkNC5leGFjdDtcbiAgICB2YXIgZ2V0V2luID0gZnVuY3Rpb24gKHNlbGVjdGlvbikge1xuICAgICAgdmFyIHN0YXJ0ID0gZ2V0U3RhcnQkMShzZWxlY3Rpb24pO1xuICAgICAgcmV0dXJuIGRlZmF1bHRWaWV3KHN0YXJ0KTtcbiAgICB9O1xuICAgIHZhciByYW5nZSQxID0gU2ltUmFuZ2UuY3JlYXRlO1xuICAgIHZhciBTZWxlY3Rpb24gPSB7XG4gICAgICBkb21SYW5nZTogZG9tUmFuZ2UsXG4gICAgICByZWxhdGl2ZTogcmVsYXRpdmUsXG4gICAgICBleGFjdDogZXhhY3QsXG4gICAgICBleGFjdEZyb21SYW5nZTogZXhhY3RGcm9tUmFuZ2UsXG4gICAgICBnZXRXaW46IGdldFdpbixcbiAgICAgIHJhbmdlOiByYW5nZSQxXG4gICAgfTtcblxuICAgIHZhciBzZWxlY3ROb2RlQ29udGVudHMgPSBmdW5jdGlvbiAod2luLCBlbGVtZW50KSB7XG4gICAgICB2YXIgcm5nID0gd2luLmRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICBzZWxlY3ROb2RlQ29udGVudHNVc2luZyhybmcsIGVsZW1lbnQpO1xuICAgICAgcmV0dXJuIHJuZztcbiAgICB9O1xuICAgIHZhciBzZWxlY3ROb2RlQ29udGVudHNVc2luZyA9IGZ1bmN0aW9uIChybmcsIGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBybmcuc2VsZWN0Tm9kZUNvbnRlbnRzKGVsZW1lbnQuZG9tKCkpO1xuICAgIH07XG4gICAgdmFyIHNldFN0YXJ0ID0gZnVuY3Rpb24gKHJuZywgc2l0dSkge1xuICAgICAgc2l0dS5mb2xkKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJuZy5zZXRTdGFydEJlZm9yZShlLmRvbSgpKTtcbiAgICAgIH0sIGZ1bmN0aW9uIChlLCBvKSB7XG4gICAgICAgIHJuZy5zZXRTdGFydChlLmRvbSgpLCBvKTtcbiAgICAgIH0sIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJuZy5zZXRTdGFydEFmdGVyKGUuZG9tKCkpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgc2V0RmluaXNoID0gZnVuY3Rpb24gKHJuZywgc2l0dSkge1xuICAgICAgc2l0dS5mb2xkKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJuZy5zZXRFbmRCZWZvcmUoZS5kb20oKSk7XG4gICAgICB9LCBmdW5jdGlvbiAoZSwgbykge1xuICAgICAgICBybmcuc2V0RW5kKGUuZG9tKCksIG8pO1xuICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgcm5nLnNldEVuZEFmdGVyKGUuZG9tKCkpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgcmVsYXRpdmVUb05hdGl2ZSA9IGZ1bmN0aW9uICh3aW4sIHN0YXJ0U2l0dSwgZmluaXNoU2l0dSkge1xuICAgICAgdmFyIHJhbmdlID0gd2luLmRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICBzZXRTdGFydChyYW5nZSwgc3RhcnRTaXR1KTtcbiAgICAgIHNldEZpbmlzaChyYW5nZSwgZmluaXNoU2l0dSk7XG4gICAgICByZXR1cm4gcmFuZ2U7XG4gICAgfTtcbiAgICB2YXIgZXhhY3RUb05hdGl2ZSA9IGZ1bmN0aW9uICh3aW4sIHN0YXJ0LCBzb2Zmc2V0LCBmaW5pc2gsIGZvZmZzZXQpIHtcbiAgICAgIHZhciBybmcgPSB3aW4uZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgIHJuZy5zZXRTdGFydChzdGFydC5kb20oKSwgc29mZnNldCk7XG4gICAgICBybmcuc2V0RW5kKGZpbmlzaC5kb20oKSwgZm9mZnNldCk7XG4gICAgICByZXR1cm4gcm5nO1xuICAgIH07XG4gICAgdmFyIHRvUmVjdCA9IGZ1bmN0aW9uIChyZWN0KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsZWZ0OiBjb25zdGFudChyZWN0LmxlZnQpLFxuICAgICAgICB0b3A6IGNvbnN0YW50KHJlY3QudG9wKSxcbiAgICAgICAgcmlnaHQ6IGNvbnN0YW50KHJlY3QucmlnaHQpLFxuICAgICAgICBib3R0b206IGNvbnN0YW50KHJlY3QuYm90dG9tKSxcbiAgICAgICAgd2lkdGg6IGNvbnN0YW50KHJlY3Qud2lkdGgpLFxuICAgICAgICBoZWlnaHQ6IGNvbnN0YW50KHJlY3QuaGVpZ2h0KVxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBnZXRGaXJzdFJlY3QgPSBmdW5jdGlvbiAocm5nKSB7XG4gICAgICB2YXIgcmVjdHMgPSBybmcuZ2V0Q2xpZW50UmVjdHMoKTtcbiAgICAgIHZhciByZWN0ID0gcmVjdHMubGVuZ3RoID4gMCA/IHJlY3RzWzBdIDogcm5nLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgcmV0dXJuIHJlY3Qud2lkdGggPiAwIHx8IHJlY3QuaGVpZ2h0ID4gMCA/IE9wdGlvbi5zb21lKHJlY3QpLm1hcCh0b1JlY3QpIDogT3B0aW9uLm5vbmUoKTtcbiAgICB9O1xuXG4gICAgdmFyIGFkdCQ1ID0gQWR0LmdlbmVyYXRlKFtcbiAgICAgIHtcbiAgICAgICAgbHRyOiBbXG4gICAgICAgICAgJ3N0YXJ0JyxcbiAgICAgICAgICAnc29mZnNldCcsXG4gICAgICAgICAgJ2ZpbmlzaCcsXG4gICAgICAgICAgJ2ZvZmZzZXQnXG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJ0bDogW1xuICAgICAgICAgICdzdGFydCcsXG4gICAgICAgICAgJ3NvZmZzZXQnLFxuICAgICAgICAgICdmaW5pc2gnLFxuICAgICAgICAgICdmb2Zmc2V0J1xuICAgICAgICBdXG4gICAgICB9XG4gICAgXSk7XG4gICAgdmFyIGZyb21SYW5nZSA9IGZ1bmN0aW9uICh3aW4sIHR5cGUsIHJhbmdlKSB7XG4gICAgICByZXR1cm4gdHlwZShFbGVtZW50LmZyb21Eb20ocmFuZ2Uuc3RhcnRDb250YWluZXIpLCByYW5nZS5zdGFydE9mZnNldCwgRWxlbWVudC5mcm9tRG9tKHJhbmdlLmVuZENvbnRhaW5lciksIHJhbmdlLmVuZE9mZnNldCk7XG4gICAgfTtcbiAgICB2YXIgZ2V0UmFuZ2VzID0gZnVuY3Rpb24gKHdpbiwgc2VsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uLm1hdGNoKHtcbiAgICAgICAgZG9tUmFuZ2U6IGZ1bmN0aW9uIChybmcpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbHRyOiBjb25zdGFudChybmcpLFxuICAgICAgICAgICAgcnRsOiBPcHRpb24ubm9uZVxuICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIHJlbGF0aXZlOiBmdW5jdGlvbiAoc3RhcnRTaXR1LCBmaW5pc2hTaXR1KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGx0cjogY2FjaGVkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlbGF0aXZlVG9OYXRpdmUod2luLCBzdGFydFNpdHUsIGZpbmlzaFNpdHUpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBydGw6IGNhY2hlZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBPcHRpb24uc29tZShyZWxhdGl2ZVRvTmF0aXZlKHdpbiwgZmluaXNoU2l0dSwgc3RhcnRTaXR1KSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGV4YWN0OiBmdW5jdGlvbiAoc3RhcnQsIHNvZmZzZXQsIGZpbmlzaCwgZm9mZnNldCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsdHI6IGNhY2hlZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBleGFjdFRvTmF0aXZlKHdpbiwgc3RhcnQsIHNvZmZzZXQsIGZpbmlzaCwgZm9mZnNldCk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHJ0bDogY2FjaGVkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIE9wdGlvbi5zb21lKGV4YWN0VG9OYXRpdmUod2luLCBmaW5pc2gsIGZvZmZzZXQsIHN0YXJ0LCBzb2Zmc2V0KSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGRvRGlhZ25vc2UgPSBmdW5jdGlvbiAod2luLCByYW5nZXMpIHtcbiAgICAgIHZhciBybmcgPSByYW5nZXMubHRyKCk7XG4gICAgICBpZiAocm5nLmNvbGxhcHNlZCkge1xuICAgICAgICB2YXIgcmV2ZXJzZWQgPSByYW5nZXMucnRsKCkuZmlsdGVyKGZ1bmN0aW9uIChyZXYpIHtcbiAgICAgICAgICByZXR1cm4gcmV2LmNvbGxhcHNlZCA9PT0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmV2ZXJzZWQubWFwKGZ1bmN0aW9uIChyZXYpIHtcbiAgICAgICAgICByZXR1cm4gYWR0JDUucnRsKEVsZW1lbnQuZnJvbURvbShyZXYuZW5kQ29udGFpbmVyKSwgcmV2LmVuZE9mZnNldCwgRWxlbWVudC5mcm9tRG9tKHJldi5zdGFydENvbnRhaW5lciksIHJldi5zdGFydE9mZnNldCk7XG4gICAgICAgIH0pLmdldE9yVGh1bmsoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBmcm9tUmFuZ2Uod2luLCBhZHQkNS5sdHIsIHJuZyk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZyb21SYW5nZSh3aW4sIGFkdCQ1Lmx0ciwgcm5nKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBkaWFnbm9zZSA9IGZ1bmN0aW9uICh3aW4sIHNlbGVjdGlvbikge1xuICAgICAgdmFyIHJhbmdlcyA9IGdldFJhbmdlcyh3aW4sIHNlbGVjdGlvbik7XG4gICAgICByZXR1cm4gZG9EaWFnbm9zZSh3aW4sIHJhbmdlcyk7XG4gICAgfTtcbiAgICB2YXIgYXNMdHJSYW5nZSA9IGZ1bmN0aW9uICh3aW4sIHNlbGVjdGlvbikge1xuICAgICAgdmFyIGRpYWdub3NpcyA9IGRpYWdub3NlKHdpbiwgc2VsZWN0aW9uKTtcbiAgICAgIHJldHVybiBkaWFnbm9zaXMubWF0Y2goe1xuICAgICAgICBsdHI6IGZ1bmN0aW9uIChzdGFydCwgc29mZnNldCwgZmluaXNoLCBmb2Zmc2V0KSB7XG4gICAgICAgICAgdmFyIHJuZyA9IHdpbi5kb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgICAgICAgIHJuZy5zZXRTdGFydChzdGFydC5kb20oKSwgc29mZnNldCk7XG4gICAgICAgICAgcm5nLnNldEVuZChmaW5pc2guZG9tKCksIGZvZmZzZXQpO1xuICAgICAgICAgIHJldHVybiBybmc7XG4gICAgICAgIH0sXG4gICAgICAgIHJ0bDogZnVuY3Rpb24gKHN0YXJ0LCBzb2Zmc2V0LCBmaW5pc2gsIGZvZmZzZXQpIHtcbiAgICAgICAgICB2YXIgcm5nID0gd2luLmRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgICAgcm5nLnNldFN0YXJ0KGZpbmlzaC5kb20oKSwgZm9mZnNldCk7XG4gICAgICAgICAgcm5nLnNldEVuZChzdGFydC5kb20oKSwgc29mZnNldCk7XG4gICAgICAgICAgcmV0dXJuIHJuZztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgbHRyJDIgPSBhZHQkNS5sdHI7XG4gICAgdmFyIHJ0bCQyID0gYWR0JDUucnRsO1xuXG4gICAgdmFyIHNlYXJjaEZvclBvaW50ID0gZnVuY3Rpb24gKHJlY3RGb3JPZmZzZXQsIHgsIHksIG1heFgsIGxlbmd0aCkge1xuICAgICAgaWYgKGxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0gZWxzZSBpZiAoeCA9PT0gbWF4WCkge1xuICAgICAgICByZXR1cm4gbGVuZ3RoIC0gMTtcbiAgICAgIH1cbiAgICAgIHZhciB4RGVsdGEgPSBtYXhYO1xuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcmVjdCA9IHJlY3RGb3JPZmZzZXQoaSk7XG4gICAgICAgIHZhciBjdXJEZWx0YVggPSBNYXRoLmFicyh4IC0gcmVjdC5sZWZ0KTtcbiAgICAgICAgaWYgKHkgPD0gcmVjdC5ib3R0b20pIHtcbiAgICAgICAgICBpZiAoeSA8IHJlY3QudG9wIHx8IGN1ckRlbHRhWCA+IHhEZWx0YSkge1xuICAgICAgICAgICAgcmV0dXJuIGkgLSAxO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB4RGVsdGEgPSBjdXJEZWx0YVg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gMDtcbiAgICB9O1xuICAgIHZhciBpblJlY3QgPSBmdW5jdGlvbiAocmVjdCwgeCwgeSkge1xuICAgICAgcmV0dXJuIHggPj0gcmVjdC5sZWZ0ICYmIHggPD0gcmVjdC5yaWdodCAmJiB5ID49IHJlY3QudG9wICYmIHkgPD0gcmVjdC5ib3R0b207XG4gICAgfTtcblxuICAgIHZhciBsb2NhdGVPZmZzZXQgPSBmdW5jdGlvbiAoZG9jLCB0ZXh0bm9kZSwgeCwgeSwgcmVjdCkge1xuICAgICAgdmFyIHJhbmdlRm9yT2Zmc2V0ID0gZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgdmFyIHIgPSBkb2MuZG9tKCkuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgci5zZXRTdGFydCh0ZXh0bm9kZS5kb20oKSwgbyk7XG4gICAgICAgIHIuY29sbGFwc2UodHJ1ZSk7XG4gICAgICAgIHJldHVybiByO1xuICAgICAgfTtcbiAgICAgIHZhciByZWN0Rm9yT2Zmc2V0ID0gZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgdmFyIHIgPSByYW5nZUZvck9mZnNldChvKTtcbiAgICAgICAgcmV0dXJuIHIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB9O1xuICAgICAgdmFyIGxlbmd0aCA9IGdldCQzKHRleHRub2RlKS5sZW5ndGg7XG4gICAgICB2YXIgb2Zmc2V0ID0gc2VhcmNoRm9yUG9pbnQocmVjdEZvck9mZnNldCwgeCwgeSwgcmVjdC5yaWdodCwgbGVuZ3RoKTtcbiAgICAgIHJldHVybiByYW5nZUZvck9mZnNldChvZmZzZXQpO1xuICAgIH07XG4gICAgdmFyIGxvY2F0ZSA9IGZ1bmN0aW9uIChkb2MsIG5vZGUsIHgsIHkpIHtcbiAgICAgIHZhciByID0gZG9jLmRvbSgpLmNyZWF0ZVJhbmdlKCk7XG4gICAgICByLnNlbGVjdE5vZGUobm9kZS5kb20oKSk7XG4gICAgICB2YXIgcmVjdHMgPSByLmdldENsaWVudFJlY3RzKCk7XG4gICAgICB2YXIgZm91bmRSZWN0ID0gZmluZE1hcChyZWN0cywgZnVuY3Rpb24gKHJlY3QpIHtcbiAgICAgICAgcmV0dXJuIGluUmVjdChyZWN0LCB4LCB5KSA/IE9wdGlvbi5zb21lKHJlY3QpIDogT3B0aW9uLm5vbmUoKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZvdW5kUmVjdC5tYXAoZnVuY3Rpb24gKHJlY3QpIHtcbiAgICAgICAgcmV0dXJuIGxvY2F0ZU9mZnNldChkb2MsIG5vZGUsIHgsIHksIHJlY3QpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBzZWFyY2hJbkNoaWxkcmVuID0gZnVuY3Rpb24gKGRvYywgbm9kZSwgeCwgeSkge1xuICAgICAgdmFyIHIgPSBkb2MuZG9tKCkuY3JlYXRlUmFuZ2UoKTtcbiAgICAgIHZhciBub2RlcyA9IGNoaWxkcmVuKG5vZGUpO1xuICAgICAgcmV0dXJuIGZpbmRNYXAobm9kZXMsIGZ1bmN0aW9uIChuKSB7XG4gICAgICAgIHIuc2VsZWN0Tm9kZShuLmRvbSgpKTtcbiAgICAgICAgcmV0dXJuIGluUmVjdChyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCB4LCB5KSA/IGxvY2F0ZU5vZGUoZG9jLCBuLCB4LCB5KSA6IE9wdGlvbi5ub25lKCk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBsb2NhdGVOb2RlID0gZnVuY3Rpb24gKGRvYywgbm9kZSwgeCwgeSkge1xuICAgICAgcmV0dXJuIGlzVGV4dChub2RlKSA/IGxvY2F0ZShkb2MsIG5vZGUsIHgsIHkpIDogc2VhcmNoSW5DaGlsZHJlbihkb2MsIG5vZGUsIHgsIHkpO1xuICAgIH07XG4gICAgdmFyIGxvY2F0ZSQxID0gZnVuY3Rpb24gKGRvYywgbm9kZSwgeCwgeSkge1xuICAgICAgdmFyIHIgPSBkb2MuZG9tKCkuY3JlYXRlUmFuZ2UoKTtcbiAgICAgIHIuc2VsZWN0Tm9kZShub2RlLmRvbSgpKTtcbiAgICAgIHZhciByZWN0ID0gci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHZhciBib3VuZGVkWCA9IE1hdGgubWF4KHJlY3QubGVmdCwgTWF0aC5taW4ocmVjdC5yaWdodCwgeCkpO1xuICAgICAgdmFyIGJvdW5kZWRZID0gTWF0aC5tYXgocmVjdC50b3AsIE1hdGgubWluKHJlY3QuYm90dG9tLCB5KSk7XG4gICAgICByZXR1cm4gbG9jYXRlTm9kZShkb2MsIG5vZGUsIGJvdW5kZWRYLCBib3VuZGVkWSk7XG4gICAgfTtcblxuICAgIHZhciBDT0xMQVBTRV9UT19MRUZUID0gdHJ1ZTtcbiAgICB2YXIgQ09MTEFQU0VfVE9fUklHSFQgPSBmYWxzZTtcbiAgICB2YXIgZ2V0Q29sbGFwc2VEaXJlY3Rpb24gPSBmdW5jdGlvbiAocmVjdCwgeCkge1xuICAgICAgcmV0dXJuIHggLSByZWN0LmxlZnQgPCByZWN0LnJpZ2h0IC0geCA/IENPTExBUFNFX1RPX0xFRlQgOiBDT0xMQVBTRV9UT19SSUdIVDtcbiAgICB9O1xuICAgIHZhciBjcmVhdGVDb2xsYXBzZWROb2RlID0gZnVuY3Rpb24gKGRvYywgdGFyZ2V0LCBjb2xsYXBzZURpcmVjdGlvbikge1xuICAgICAgdmFyIHIgPSBkb2MuZG9tKCkuY3JlYXRlUmFuZ2UoKTtcbiAgICAgIHIuc2VsZWN0Tm9kZSh0YXJnZXQuZG9tKCkpO1xuICAgICAgci5jb2xsYXBzZShjb2xsYXBzZURpcmVjdGlvbik7XG4gICAgICByZXR1cm4gcjtcbiAgICB9O1xuICAgIHZhciBsb2NhdGVJbkVsZW1lbnQgPSBmdW5jdGlvbiAoZG9jLCBub2RlLCB4KSB7XG4gICAgICB2YXIgY3Vyc29yUmFuZ2UgPSBkb2MuZG9tKCkuY3JlYXRlUmFuZ2UoKTtcbiAgICAgIGN1cnNvclJhbmdlLnNlbGVjdE5vZGUobm9kZS5kb20oKSk7XG4gICAgICB2YXIgcmVjdCA9IGN1cnNvclJhbmdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdmFyIGNvbGxhcHNlRGlyZWN0aW9uID0gZ2V0Q29sbGFwc2VEaXJlY3Rpb24ocmVjdCwgeCk7XG4gICAgICB2YXIgZiA9IGNvbGxhcHNlRGlyZWN0aW9uID09PSBDT0xMQVBTRV9UT19MRUZUID8gZmlyc3QgOiBsYXN0JDE7XG4gICAgICByZXR1cm4gZihub2RlKS5tYXAoZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICByZXR1cm4gY3JlYXRlQ29sbGFwc2VkTm9kZShkb2MsIHRhcmdldCwgY29sbGFwc2VEaXJlY3Rpb24pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgbG9jYXRlSW5FbXB0eSA9IGZ1bmN0aW9uIChkb2MsIG5vZGUsIHgpIHtcbiAgICAgIHZhciByZWN0ID0gbm9kZS5kb20oKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHZhciBjb2xsYXBzZURpcmVjdGlvbiA9IGdldENvbGxhcHNlRGlyZWN0aW9uKHJlY3QsIHgpO1xuICAgICAgcmV0dXJuIE9wdGlvbi5zb21lKGNyZWF0ZUNvbGxhcHNlZE5vZGUoZG9jLCBub2RlLCBjb2xsYXBzZURpcmVjdGlvbikpO1xuICAgIH07XG4gICAgdmFyIHNlYXJjaCA9IGZ1bmN0aW9uIChkb2MsIG5vZGUsIHgpIHtcbiAgICAgIHZhciBmID0gY2hpbGRyZW4obm9kZSkubGVuZ3RoID09PSAwID8gbG9jYXRlSW5FbXB0eSA6IGxvY2F0ZUluRWxlbWVudDtcbiAgICAgIHJldHVybiBmKGRvYywgbm9kZSwgeCk7XG4gICAgfTtcblxuICAgIHZhciBjYXJldFBvc2l0aW9uRnJvbVBvaW50ID0gZnVuY3Rpb24gKGRvYywgeCwgeSkge1xuICAgICAgcmV0dXJuIE9wdGlvbi5mcm9tKGRvYy5kb20oKS5jYXJldFBvc2l0aW9uRnJvbVBvaW50KHgsIHkpKS5iaW5kKGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgICAgaWYgKHBvcy5vZmZzZXROb2RlID09PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIE9wdGlvbi5ub25lKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHIgPSBkb2MuZG9tKCkuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgci5zZXRTdGFydChwb3Mub2Zmc2V0Tm9kZSwgcG9zLm9mZnNldCk7XG4gICAgICAgIHIuY29sbGFwc2UoKTtcbiAgICAgICAgcmV0dXJuIE9wdGlvbi5zb21lKHIpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgY2FyZXRSYW5nZUZyb21Qb2ludCA9IGZ1bmN0aW9uIChkb2MsIHgsIHkpIHtcbiAgICAgIHJldHVybiBPcHRpb24uZnJvbShkb2MuZG9tKCkuY2FyZXRSYW5nZUZyb21Qb2ludCh4LCB5KSk7XG4gICAgfTtcbiAgICB2YXIgc2VhcmNoVGV4dE5vZGVzID0gZnVuY3Rpb24gKGRvYywgbm9kZSwgeCwgeSkge1xuICAgICAgdmFyIHIgPSBkb2MuZG9tKCkuY3JlYXRlUmFuZ2UoKTtcbiAgICAgIHIuc2VsZWN0Tm9kZShub2RlLmRvbSgpKTtcbiAgICAgIHZhciByZWN0ID0gci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHZhciBib3VuZGVkWCA9IE1hdGgubWF4KHJlY3QubGVmdCwgTWF0aC5taW4ocmVjdC5yaWdodCwgeCkpO1xuICAgICAgdmFyIGJvdW5kZWRZID0gTWF0aC5tYXgocmVjdC50b3AsIE1hdGgubWluKHJlY3QuYm90dG9tLCB5KSk7XG4gICAgICByZXR1cm4gbG9jYXRlJDEoZG9jLCBub2RlLCBib3VuZGVkWCwgYm91bmRlZFkpO1xuICAgIH07XG4gICAgdmFyIHNlYXJjaEZyb21Qb2ludCA9IGZ1bmN0aW9uIChkb2MsIHgsIHkpIHtcbiAgICAgIHJldHVybiBFbGVtZW50LmZyb21Qb2ludChkb2MsIHgsIHkpLmJpbmQoZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgdmFyIGZhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBzZWFyY2goZG9jLCBlbGVtLCB4KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuKGVsZW0pLmxlbmd0aCA9PT0gMCA/IGZhbGxiYWNrKCkgOiBzZWFyY2hUZXh0Tm9kZXMoZG9jLCBlbGVtLCB4LCB5KS5vclRodW5rKGZhbGxiYWNrKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGF2YWlsYWJsZVNlYXJjaCA9IGRvY3VtZW50LmNhcmV0UG9zaXRpb25Gcm9tUG9pbnQgPyBjYXJldFBvc2l0aW9uRnJvbVBvaW50IDogZG9jdW1lbnQuY2FyZXRSYW5nZUZyb21Qb2ludCA/IGNhcmV0UmFuZ2VGcm9tUG9pbnQgOiBzZWFyY2hGcm9tUG9pbnQ7XG4gICAgdmFyIGZyb21Qb2ludCQxID0gZnVuY3Rpb24gKHdpbiwgeCwgeSkge1xuICAgICAgdmFyIGRvYyA9IEVsZW1lbnQuZnJvbURvbSh3aW4uZG9jdW1lbnQpO1xuICAgICAgcmV0dXJuIGF2YWlsYWJsZVNlYXJjaChkb2MsIHgsIHkpLm1hcChmdW5jdGlvbiAocm5nKSB7XG4gICAgICAgIHJldHVybiBTaW1SYW5nZS5jcmVhdGUoRWxlbWVudC5mcm9tRG9tKHJuZy5zdGFydENvbnRhaW5lciksIHJuZy5zdGFydE9mZnNldCwgRWxlbWVudC5mcm9tRG9tKHJuZy5lbmRDb250YWluZXIpLCBybmcuZW5kT2Zmc2V0KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgYmVmb3JlU3BlY2lhbCA9IGZ1bmN0aW9uIChlbGVtZW50LCBvZmZzZXQpIHtcbiAgICAgIHZhciBuYW1lJDEgPSBuYW1lKGVsZW1lbnQpO1xuICAgICAgaWYgKCdpbnB1dCcgPT09IG5hbWUkMSkge1xuICAgICAgICByZXR1cm4gU2l0dS5hZnRlcihlbGVtZW50KTtcbiAgICAgIH0gZWxzZSBpZiAoIWNvbnRhaW5zKFtcbiAgICAgICAgICAnYnInLFxuICAgICAgICAgICdpbWcnXG4gICAgICAgIF0sIG5hbWUkMSkpIHtcbiAgICAgICAgcmV0dXJuIFNpdHUub24oZWxlbWVudCwgb2Zmc2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvZmZzZXQgPT09IDAgPyBTaXR1LmJlZm9yZShlbGVtZW50KSA6IFNpdHUuYWZ0ZXIoZWxlbWVudCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgcHJlcHJvY2Vzc1JlbGF0aXZlID0gZnVuY3Rpb24gKHN0YXJ0U2l0dSwgZmluaXNoU2l0dSkge1xuICAgICAgdmFyIHN0YXJ0ID0gc3RhcnRTaXR1LmZvbGQoU2l0dS5iZWZvcmUsIGJlZm9yZVNwZWNpYWwsIFNpdHUuYWZ0ZXIpO1xuICAgICAgdmFyIGZpbmlzaCA9IGZpbmlzaFNpdHUuZm9sZChTaXR1LmJlZm9yZSwgYmVmb3JlU3BlY2lhbCwgU2l0dS5hZnRlcik7XG4gICAgICByZXR1cm4gU2VsZWN0aW9uLnJlbGF0aXZlKHN0YXJ0LCBmaW5pc2gpO1xuICAgIH07XG4gICAgdmFyIHByZXByb2Nlc3NFeGFjdCA9IGZ1bmN0aW9uIChzdGFydCwgc29mZnNldCwgZmluaXNoLCBmb2Zmc2V0KSB7XG4gICAgICB2YXIgc3RhcnRTaXR1ID0gYmVmb3JlU3BlY2lhbChzdGFydCwgc29mZnNldCk7XG4gICAgICB2YXIgZmluaXNoU2l0dSA9IGJlZm9yZVNwZWNpYWwoZmluaXNoLCBmb2Zmc2V0KTtcbiAgICAgIHJldHVybiBTZWxlY3Rpb24ucmVsYXRpdmUoc3RhcnRTaXR1LCBmaW5pc2hTaXR1KTtcbiAgICB9O1xuICAgIHZhciBwcmVwcm9jZXNzID0gZnVuY3Rpb24gKHNlbGVjdGlvbikge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbi5tYXRjaCh7XG4gICAgICAgIGRvbVJhbmdlOiBmdW5jdGlvbiAocm5nKSB7XG4gICAgICAgICAgdmFyIHN0YXJ0ID0gRWxlbWVudC5mcm9tRG9tKHJuZy5zdGFydENvbnRhaW5lcik7XG4gICAgICAgICAgdmFyIGZpbmlzaCA9IEVsZW1lbnQuZnJvbURvbShybmcuZW5kQ29udGFpbmVyKTtcbiAgICAgICAgICByZXR1cm4gcHJlcHJvY2Vzc0V4YWN0KHN0YXJ0LCBybmcuc3RhcnRPZmZzZXQsIGZpbmlzaCwgcm5nLmVuZE9mZnNldCk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbGF0aXZlOiBwcmVwcm9jZXNzUmVsYXRpdmUsXG4gICAgICAgIGV4YWN0OiBwcmVwcm9jZXNzRXhhY3RcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgbWFrZVJhbmdlID0gZnVuY3Rpb24gKHN0YXJ0LCBzb2Zmc2V0LCBmaW5pc2gsIGZvZmZzZXQpIHtcbiAgICAgIHZhciBkb2MgPSBvd25lcihzdGFydCk7XG4gICAgICB2YXIgcm5nID0gZG9jLmRvbSgpLmNyZWF0ZVJhbmdlKCk7XG4gICAgICBybmcuc2V0U3RhcnQoc3RhcnQuZG9tKCksIHNvZmZzZXQpO1xuICAgICAgcm5nLnNldEVuZChmaW5pc2guZG9tKCksIGZvZmZzZXQpO1xuICAgICAgcmV0dXJuIHJuZztcbiAgICB9O1xuICAgIHZhciBhZnRlciQzID0gZnVuY3Rpb24gKHN0YXJ0LCBzb2Zmc2V0LCBmaW5pc2gsIGZvZmZzZXQpIHtcbiAgICAgIHZhciByID0gbWFrZVJhbmdlKHN0YXJ0LCBzb2Zmc2V0LCBmaW5pc2gsIGZvZmZzZXQpO1xuICAgICAgdmFyIHNhbWUgPSBlcShzdGFydCwgZmluaXNoKSAmJiBzb2Zmc2V0ID09PSBmb2Zmc2V0O1xuICAgICAgcmV0dXJuIHIuY29sbGFwc2VkICYmICFzYW1lO1xuICAgIH07XG5cbiAgICB2YXIgZG9TZXROYXRpdmVSYW5nZSA9IGZ1bmN0aW9uICh3aW4sIHJuZykge1xuICAgICAgT3B0aW9uLmZyb20od2luLmdldFNlbGVjdGlvbigpKS5lYWNoKGZ1bmN0aW9uIChzZWxlY3Rpb24pIHtcbiAgICAgICAgc2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICBzZWxlY3Rpb24uYWRkUmFuZ2Uocm5nKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGRvU2V0UmFuZ2UgPSBmdW5jdGlvbiAod2luLCBzdGFydCwgc29mZnNldCwgZmluaXNoLCBmb2Zmc2V0KSB7XG4gICAgICB2YXIgcm5nID0gZXhhY3RUb05hdGl2ZSh3aW4sIHN0YXJ0LCBzb2Zmc2V0LCBmaW5pc2gsIGZvZmZzZXQpO1xuICAgICAgZG9TZXROYXRpdmVSYW5nZSh3aW4sIHJuZyk7XG4gICAgfTtcbiAgICB2YXIgc2V0TGVnYWN5UnRsUmFuZ2UgPSBmdW5jdGlvbiAod2luLCBzZWxlY3Rpb24sIHN0YXJ0LCBzb2Zmc2V0LCBmaW5pc2gsIGZvZmZzZXQpIHtcbiAgICAgIHNlbGVjdGlvbi5jb2xsYXBzZShzdGFydC5kb20oKSwgc29mZnNldCk7XG4gICAgICBzZWxlY3Rpb24uZXh0ZW5kKGZpbmlzaC5kb20oKSwgZm9mZnNldCk7XG4gICAgfTtcbiAgICB2YXIgc2V0UmFuZ2VGcm9tUmVsYXRpdmUgPSBmdW5jdGlvbiAod2luLCByZWxhdGl2ZSkge1xuICAgICAgcmV0dXJuIGRpYWdub3NlKHdpbiwgcmVsYXRpdmUpLm1hdGNoKHtcbiAgICAgICAgbHRyOiBmdW5jdGlvbiAoc3RhcnQsIHNvZmZzZXQsIGZpbmlzaCwgZm9mZnNldCkge1xuICAgICAgICAgIGRvU2V0UmFuZ2Uod2luLCBzdGFydCwgc29mZnNldCwgZmluaXNoLCBmb2Zmc2V0KTtcbiAgICAgICAgfSxcbiAgICAgICAgcnRsOiBmdW5jdGlvbiAoc3RhcnQsIHNvZmZzZXQsIGZpbmlzaCwgZm9mZnNldCkge1xuICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB3aW4uZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgaWYgKHNlbGVjdGlvbi5zZXRCYXNlQW5kRXh0ZW50KSB7XG4gICAgICAgICAgICBzZWxlY3Rpb24uc2V0QmFzZUFuZEV4dGVudChzdGFydC5kb20oKSwgc29mZnNldCwgZmluaXNoLmRvbSgpLCBmb2Zmc2V0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdGlvbi5leHRlbmQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHNldExlZ2FjeVJ0bFJhbmdlKHdpbiwgc2VsZWN0aW9uLCBzdGFydCwgc29mZnNldCwgZmluaXNoLCBmb2Zmc2V0KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgZG9TZXRSYW5nZSh3aW4sIGZpbmlzaCwgZm9mZnNldCwgc3RhcnQsIHNvZmZzZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb1NldFJhbmdlKHdpbiwgZmluaXNoLCBmb2Zmc2V0LCBzdGFydCwgc29mZnNldCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBzZXRFeGFjdCA9IGZ1bmN0aW9uICh3aW4sIHN0YXJ0LCBzb2Zmc2V0LCBmaW5pc2gsIGZvZmZzZXQpIHtcbiAgICAgIHZhciByZWxhdGl2ZSA9IHByZXByb2Nlc3NFeGFjdChzdGFydCwgc29mZnNldCwgZmluaXNoLCBmb2Zmc2V0KTtcbiAgICAgIHNldFJhbmdlRnJvbVJlbGF0aXZlKHdpbiwgcmVsYXRpdmUpO1xuICAgIH07XG4gICAgdmFyIHNldFJlbGF0aXZlID0gZnVuY3Rpb24gKHdpbiwgc3RhcnRTaXR1LCBmaW5pc2hTaXR1KSB7XG4gICAgICB2YXIgcmVsYXRpdmUgPSBwcmVwcm9jZXNzUmVsYXRpdmUoc3RhcnRTaXR1LCBmaW5pc2hTaXR1KTtcbiAgICAgIHNldFJhbmdlRnJvbVJlbGF0aXZlKHdpbiwgcmVsYXRpdmUpO1xuICAgIH07XG4gICAgdmFyIHRvTmF0aXZlID0gZnVuY3Rpb24gKHNlbGVjdGlvbikge1xuICAgICAgdmFyIHdpbiA9IFNlbGVjdGlvbi5nZXRXaW4oc2VsZWN0aW9uKS5kb20oKTtcbiAgICAgIHZhciBnZXREb21SYW5nZSA9IGZ1bmN0aW9uIChzdGFydCwgc29mZnNldCwgZmluaXNoLCBmb2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBleGFjdFRvTmF0aXZlKHdpbiwgc3RhcnQsIHNvZmZzZXQsIGZpbmlzaCwgZm9mZnNldCk7XG4gICAgICB9O1xuICAgICAgdmFyIGZpbHRlcmVkID0gcHJlcHJvY2VzcyhzZWxlY3Rpb24pO1xuICAgICAgcmV0dXJuIGRpYWdub3NlKHdpbiwgZmlsdGVyZWQpLm1hdGNoKHtcbiAgICAgICAgbHRyOiBnZXREb21SYW5nZSxcbiAgICAgICAgcnRsOiBnZXREb21SYW5nZVxuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgcmVhZFJhbmdlID0gZnVuY3Rpb24gKHNlbGVjdGlvbikge1xuICAgICAgaWYgKHNlbGVjdGlvbi5yYW5nZUNvdW50ID4gMCkge1xuICAgICAgICB2YXIgZmlyc3RSbmcgPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKTtcbiAgICAgICAgdmFyIGxhc3RSbmcgPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdChzZWxlY3Rpb24ucmFuZ2VDb3VudCAtIDEpO1xuICAgICAgICByZXR1cm4gT3B0aW9uLnNvbWUoU2ltUmFuZ2UuY3JlYXRlKEVsZW1lbnQuZnJvbURvbShmaXJzdFJuZy5zdGFydENvbnRhaW5lciksIGZpcnN0Um5nLnN0YXJ0T2Zmc2V0LCBFbGVtZW50LmZyb21Eb20obGFzdFJuZy5lbmRDb250YWluZXIpLCBsYXN0Um5nLmVuZE9mZnNldCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE9wdGlvbi5ub25lKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgZG9HZXRFeGFjdCA9IGZ1bmN0aW9uIChzZWxlY3Rpb24pIHtcbiAgICAgIHZhciBhbmNob3IgPSBFbGVtZW50LmZyb21Eb20oc2VsZWN0aW9uLmFuY2hvck5vZGUpO1xuICAgICAgdmFyIGZvY3VzID0gRWxlbWVudC5mcm9tRG9tKHNlbGVjdGlvbi5mb2N1c05vZGUpO1xuICAgICAgcmV0dXJuIGFmdGVyJDMoYW5jaG9yLCBzZWxlY3Rpb24uYW5jaG9yT2Zmc2V0LCBmb2N1cywgc2VsZWN0aW9uLmZvY3VzT2Zmc2V0KSA/IE9wdGlvbi5zb21lKFNpbVJhbmdlLmNyZWF0ZShhbmNob3IsIHNlbGVjdGlvbi5hbmNob3JPZmZzZXQsIGZvY3VzLCBzZWxlY3Rpb24uZm9jdXNPZmZzZXQpKSA6IHJlYWRSYW5nZShzZWxlY3Rpb24pO1xuICAgIH07XG4gICAgdmFyIHNldFRvRWxlbWVudCA9IGZ1bmN0aW9uICh3aW4sIGVsZW1lbnQpIHtcbiAgICAgIHZhciBybmcgPSBzZWxlY3ROb2RlQ29udGVudHMod2luLCBlbGVtZW50KTtcbiAgICAgIGRvU2V0TmF0aXZlUmFuZ2Uod2luLCBybmcpO1xuICAgIH07XG4gICAgdmFyIGdldEV4YWN0ID0gZnVuY3Rpb24gKHdpbikge1xuICAgICAgcmV0dXJuIE9wdGlvbi5mcm9tKHdpbi5nZXRTZWxlY3Rpb24oKSkuZmlsdGVyKGZ1bmN0aW9uIChzZWwpIHtcbiAgICAgICAgcmV0dXJuIHNlbC5yYW5nZUNvdW50ID4gMDtcbiAgICAgIH0pLmJpbmQoZG9HZXRFeGFjdCk7XG4gICAgfTtcbiAgICB2YXIgZ2V0JGIgPSBmdW5jdGlvbiAod2luKSB7XG4gICAgICByZXR1cm4gZ2V0RXhhY3Qod2luKS5tYXAoZnVuY3Rpb24gKHJhbmdlKSB7XG4gICAgICAgIHJldHVybiBTZWxlY3Rpb24uZXhhY3QocmFuZ2Uuc3RhcnQoKSwgcmFuZ2Uuc29mZnNldCgpLCByYW5nZS5maW5pc2goKSwgcmFuZ2UuZm9mZnNldCgpKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGdldEZpcnN0UmVjdCQxID0gZnVuY3Rpb24gKHdpbiwgc2VsZWN0aW9uKSB7XG4gICAgICB2YXIgcm5nID0gYXNMdHJSYW5nZSh3aW4sIHNlbGVjdGlvbik7XG4gICAgICByZXR1cm4gZ2V0Rmlyc3RSZWN0KHJuZyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0QXRQb2ludCA9IGZ1bmN0aW9uICh3aW4sIHgsIHkpIHtcbiAgICAgIHJldHVybiBmcm9tUG9pbnQkMSh3aW4sIHgsIHkpO1xuICAgIH07XG4gICAgdmFyIGNsZWFyID0gZnVuY3Rpb24gKHdpbikge1xuICAgICAgdmFyIHNlbGVjdGlvbiA9IHdpbi5nZXRTZWxlY3Rpb24oKTtcbiAgICAgIHNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICB9O1xuXG4gICAgdmFyIGdsb2JhbCQzID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UudXRpbC5WSycpO1xuXG4gICAgdmFyIGZvcndhcmQgPSBmdW5jdGlvbiAoZWRpdG9yLCBpc1Jvb3QsIGNlbGwsIGxhenlXaXJlKSB7XG4gICAgICByZXR1cm4gZ28oZWRpdG9yLCBpc1Jvb3QsIG5leHQoY2VsbCksIGxhenlXaXJlKTtcbiAgICB9O1xuICAgIHZhciBiYWNrd2FyZCA9IGZ1bmN0aW9uIChlZGl0b3IsIGlzUm9vdCwgY2VsbCwgbGF6eVdpcmUpIHtcbiAgICAgIHJldHVybiBnbyhlZGl0b3IsIGlzUm9vdCwgcHJldihjZWxsKSwgbGF6eVdpcmUpO1xuICAgIH07XG4gICAgdmFyIGdldENlbGxGaXJzdEN1cnNvclBvc2l0aW9uID0gZnVuY3Rpb24gKGVkaXRvciwgY2VsbCkge1xuICAgICAgdmFyIHNlbGVjdGlvbiA9IFNlbGVjdGlvbi5leGFjdChjZWxsLCAwLCBjZWxsLCAwKTtcbiAgICAgIHJldHVybiB0b05hdGl2ZShzZWxlY3Rpb24pO1xuICAgIH07XG4gICAgdmFyIGdldE5ld1Jvd0N1cnNvclBvc2l0aW9uID0gZnVuY3Rpb24gKGVkaXRvciwgdGFibGUpIHtcbiAgICAgIHZhciByb3dzID0gZGVzY2VuZGFudHMkMSh0YWJsZSwgJ3RyJyk7XG4gICAgICByZXR1cm4gbGFzdChyb3dzKS5iaW5kKGZ1bmN0aW9uIChsYXN0KSB7XG4gICAgICAgIHJldHVybiBkZXNjZW5kYW50JDEobGFzdCwgJ3RkLHRoJykubWFwKGZ1bmN0aW9uIChmaXJzdCkge1xuICAgICAgICAgIHJldHVybiBnZXRDZWxsRmlyc3RDdXJzb3JQb3NpdGlvbihlZGl0b3IsIGZpcnN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBnbyA9IGZ1bmN0aW9uIChlZGl0b3IsIGlzUm9vdCwgY2VsbCwgYWN0aW9ucywgX2xhenlXaXJlKSB7XG4gICAgICByZXR1cm4gY2VsbC5mb2xkKE9wdGlvbi5ub25lLCBPcHRpb24ubm9uZSwgZnVuY3Rpb24gKGN1cnJlbnQsIG5leHQpIHtcbiAgICAgICAgcmV0dXJuIGZpcnN0KG5leHQpLm1hcChmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICAgIHJldHVybiBnZXRDZWxsRmlyc3RDdXJzb3JQb3NpdGlvbihlZGl0b3IsIGNlbGwpO1xuICAgICAgICB9KTtcbiAgICAgIH0sIGZ1bmN0aW9uIChjdXJyZW50KSB7XG4gICAgICAgIHJldHVybiB0YWJsZShjdXJyZW50LCBpc1Jvb3QpLmJpbmQoZnVuY3Rpb24gKHRhYmxlKSB7XG4gICAgICAgICAgdmFyIHRhcmdldHMgPSBub01lbnUoY3VycmVudCk7XG4gICAgICAgICAgZWRpdG9yLnVuZG9NYW5hZ2VyLnRyYW5zYWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGFjdGlvbnMuaW5zZXJ0Um93c0FmdGVyKHRhYmxlLCB0YXJnZXRzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gZ2V0TmV3Um93Q3Vyc29yUG9zaXRpb24oZWRpdG9yLCB0YWJsZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgcm9vdEVsZW1lbnRzID0gW1xuICAgICAgJ3RhYmxlJyxcbiAgICAgICdsaScsXG4gICAgICAnZGwnXG4gICAgXTtcbiAgICB2YXIgaGFuZGxlJDEgPSBmdW5jdGlvbiAoZXZlbnQsIGVkaXRvciwgYWN0aW9ucywgbGF6eVdpcmUpIHtcbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBnbG9iYWwkMy5UQUIpIHtcbiAgICAgICAgdmFyIGJvZHlfMSA9IGdldEJvZHkkMShlZGl0b3IpO1xuICAgICAgICB2YXIgaXNSb290XzEgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgIHZhciBuYW1lJDEgPSBuYW1lKGVsZW1lbnQpO1xuICAgICAgICAgIHJldHVybiBlcShlbGVtZW50LCBib2R5XzEpIHx8IGNvbnRhaW5zKHJvb3RFbGVtZW50cywgbmFtZSQxKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHJuZyA9IGVkaXRvci5zZWxlY3Rpb24uZ2V0Um5nKCk7XG4gICAgICAgIGlmIChybmcuY29sbGFwc2VkKSB7XG4gICAgICAgICAgdmFyIHN0YXJ0ID0gRWxlbWVudC5mcm9tRG9tKHJuZy5zdGFydENvbnRhaW5lcik7XG4gICAgICAgICAgY2VsbChzdGFydCwgaXNSb290XzEpLmVhY2goZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgbmF2aWdhdGlvbiA9IGV2ZW50LnNoaWZ0S2V5ID8gYmFja3dhcmQgOiBmb3J3YXJkO1xuICAgICAgICAgICAgdmFyIHJuZyA9IG5hdmlnYXRpb24oZWRpdG9yLCBpc1Jvb3RfMSwgY2VsbCwgYWN0aW9ucywgbGF6eVdpcmUpO1xuICAgICAgICAgICAgcm5nLmVhY2goZnVuY3Rpb24gKHJhbmdlKSB7XG4gICAgICAgICAgICAgIGVkaXRvci5zZWxlY3Rpb24uc2V0Um5nKHJhbmdlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBjcmVhdGUkMyA9IGZ1bmN0aW9uIChzZWxlY3Rpb24sIGtpbGwpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNlbGVjdGlvbjogY29uc3RhbnQoc2VsZWN0aW9uKSxcbiAgICAgICAga2lsbDogY29uc3RhbnQoa2lsbClcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgUmVzcG9uc2UgPSB7IGNyZWF0ZTogY3JlYXRlJDMgfTtcblxuICAgIHZhciBjcmVhdGUkNCA9IGZ1bmN0aW9uIChzdGFydCwgc29mZnNldCwgZmluaXNoLCBmb2Zmc2V0KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGFydDogY29uc3RhbnQoU2l0dS5vbihzdGFydCwgc29mZnNldCkpLFxuICAgICAgICBmaW5pc2g6IGNvbnN0YW50KFNpdHUub24oZmluaXNoLCBmb2Zmc2V0KSlcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgU2l0dXMgPSB7IGNyZWF0ZTogY3JlYXRlJDQgfTtcblxuICAgIHZhciBjb252ZXJ0VG9SYW5nZSA9IGZ1bmN0aW9uICh3aW4sIHNlbGVjdGlvbikge1xuICAgICAgdmFyIHJuZyA9IGFzTHRyUmFuZ2Uod2luLCBzZWxlY3Rpb24pO1xuICAgICAgcmV0dXJuIFNpbVJhbmdlLmNyZWF0ZShFbGVtZW50LmZyb21Eb20ocm5nLnN0YXJ0Q29udGFpbmVyKSwgcm5nLnN0YXJ0T2Zmc2V0LCBFbGVtZW50LmZyb21Eb20ocm5nLmVuZENvbnRhaW5lciksIHJuZy5lbmRPZmZzZXQpO1xuICAgIH07XG4gICAgdmFyIG1ha2VTaXR1cyA9IFNpdHVzLmNyZWF0ZTtcblxuICAgIHZhciBzeW5jID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgaXNSb290LCBzdGFydCwgc29mZnNldCwgZmluaXNoLCBmb2Zmc2V0LCBzZWxlY3RSYW5nZSkge1xuICAgICAgaWYgKCEoZXEoc3RhcnQsIGZpbmlzaCkgJiYgc29mZnNldCA9PT0gZm9mZnNldCkpIHtcbiAgICAgICAgcmV0dXJuIGNsb3Nlc3QkMShzdGFydCwgJ3RkLHRoJywgaXNSb290KS5iaW5kKGZ1bmN0aW9uIChzKSB7XG4gICAgICAgICAgcmV0dXJuIGNsb3Nlc3QkMShmaW5pc2gsICd0ZCx0aCcsIGlzUm9vdCkuYmluZChmdW5jdGlvbiAoZikge1xuICAgICAgICAgICAgcmV0dXJuIGRldGVjdCQ1KGNvbnRhaW5lciwgaXNSb290LCBzLCBmLCBzZWxlY3RSYW5nZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE9wdGlvbi5ub25lKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgZGV0ZWN0JDUgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBpc1Jvb3QsIHN0YXJ0LCBmaW5pc2gsIHNlbGVjdFJhbmdlKSB7XG4gICAgICBpZiAoIWVxKHN0YXJ0LCBmaW5pc2gpKSB7XG4gICAgICAgIHJldHVybiBpZGVudGlmeShzdGFydCwgZmluaXNoLCBpc1Jvb3QpLmJpbmQoZnVuY3Rpb24gKGNlbGxTZWwpIHtcbiAgICAgICAgICB2YXIgYm94ZXMgPSBjZWxsU2VsLmJveGVzLmdldE9yKFtdKTtcbiAgICAgICAgICBpZiAoYm94ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc2VsZWN0UmFuZ2UoY29udGFpbmVyLCBib3hlcywgY2VsbFNlbC5zdGFydCwgY2VsbFNlbC5maW5pc2gpO1xuICAgICAgICAgICAgcmV0dXJuIE9wdGlvbi5zb21lKFJlc3BvbnNlLmNyZWF0ZShPcHRpb24uc29tZShtYWtlU2l0dXMoc3RhcnQsIDAsIHN0YXJ0LCBnZXRFbmQoc3RhcnQpKSksIHRydWUpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE9wdGlvbi5ub25lKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHVwZGF0ZSA9IGZ1bmN0aW9uIChyb3dzLCBjb2x1bW5zLCBjb250YWluZXIsIHNlbGVjdGVkLCBhbm5vdGF0aW9ucykge1xuICAgICAgdmFyIHVwZGF0ZVNlbGVjdGlvbiA9IGZ1bmN0aW9uIChuZXdTZWxzKSB7XG4gICAgICAgIGFubm90YXRpb25zLmNsZWFyQmVmb3JlVXBkYXRlKGNvbnRhaW5lcik7XG4gICAgICAgIGFubm90YXRpb25zLnNlbGVjdFJhbmdlKGNvbnRhaW5lciwgbmV3U2Vscy5ib3hlcywgbmV3U2Vscy5zdGFydCwgbmV3U2Vscy5maW5pc2gpO1xuICAgICAgICByZXR1cm4gbmV3U2Vscy5ib3hlcztcbiAgICAgIH07XG4gICAgICByZXR1cm4gc2hpZnRTZWxlY3Rpb24oc2VsZWN0ZWQsIHJvd3MsIGNvbHVtbnMsIGFubm90YXRpb25zLmZpcnN0U2VsZWN0ZWRTZWxlY3RvciwgYW5ub3RhdGlvbnMubGFzdFNlbGVjdGVkU2VsZWN0b3IpLm1hcCh1cGRhdGVTZWxlY3Rpb24pO1xuICAgIH07XG5cbiAgICB2YXIgdHJhdmVyc2UgPSBmdW5jdGlvbiAoaXRlbSwgbW9kZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaXRlbTogY29uc3RhbnQoaXRlbSksXG4gICAgICAgIG1vZGU6IGNvbnN0YW50KG1vZGUpXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGJhY2t0cmFjayA9IGZ1bmN0aW9uICh1bml2ZXJzZSwgaXRlbSwgX2RpcmVjdGlvbiwgdHJhbnNpdGlvbikge1xuICAgICAgaWYgKHRyYW5zaXRpb24gPT09IHZvaWQgMCkge1xuICAgICAgICB0cmFuc2l0aW9uID0gc2lkZXN0ZXA7XG4gICAgICB9XG4gICAgICByZXR1cm4gdW5pdmVyc2UucHJvcGVydHkoKS5wYXJlbnQoaXRlbSkubWFwKGZ1bmN0aW9uIChwKSB7XG4gICAgICAgIHJldHVybiB0cmF2ZXJzZShwLCB0cmFuc2l0aW9uKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHNpZGVzdGVwID0gZnVuY3Rpb24gKHVuaXZlcnNlLCBpdGVtLCBkaXJlY3Rpb24sIHRyYW5zaXRpb24pIHtcbiAgICAgIGlmICh0cmFuc2l0aW9uID09PSB2b2lkIDApIHtcbiAgICAgICAgdHJhbnNpdGlvbiA9IGFkdmFuY2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGlyZWN0aW9uLnNpYmxpbmcodW5pdmVyc2UsIGl0ZW0pLm1hcChmdW5jdGlvbiAocCkge1xuICAgICAgICByZXR1cm4gdHJhdmVyc2UocCwgdHJhbnNpdGlvbik7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBhZHZhbmNlID0gZnVuY3Rpb24gKHVuaXZlcnNlLCBpdGVtLCBkaXJlY3Rpb24sIHRyYW5zaXRpb24pIHtcbiAgICAgIGlmICh0cmFuc2l0aW9uID09PSB2b2lkIDApIHtcbiAgICAgICAgdHJhbnNpdGlvbiA9IGFkdmFuY2U7XG4gICAgICB9XG4gICAgICB2YXIgY2hpbGRyZW4gPSB1bml2ZXJzZS5wcm9wZXJ0eSgpLmNoaWxkcmVuKGl0ZW0pO1xuICAgICAgdmFyIHJlc3VsdCA9IGRpcmVjdGlvbi5maXJzdChjaGlsZHJlbik7XG4gICAgICByZXR1cm4gcmVzdWx0Lm1hcChmdW5jdGlvbiAocikge1xuICAgICAgICByZXR1cm4gdHJhdmVyc2UociwgdHJhbnNpdGlvbik7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBzdWNjZXNzb3JzID0gW1xuICAgICAge1xuICAgICAgICBjdXJyZW50OiBiYWNrdHJhY2ssXG4gICAgICAgIG5leHQ6IHNpZGVzdGVwLFxuICAgICAgICBmYWxsYmFjazogT3B0aW9uLm5vbmUoKVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY3VycmVudDogc2lkZXN0ZXAsXG4gICAgICAgIG5leHQ6IGFkdmFuY2UsXG4gICAgICAgIGZhbGxiYWNrOiBPcHRpb24uc29tZShiYWNrdHJhY2spXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBjdXJyZW50OiBhZHZhbmNlLFxuICAgICAgICBuZXh0OiBhZHZhbmNlLFxuICAgICAgICBmYWxsYmFjazogT3B0aW9uLnNvbWUoc2lkZXN0ZXApXG4gICAgICB9XG4gICAgXTtcbiAgICB2YXIgZ28kMSA9IGZ1bmN0aW9uICh1bml2ZXJzZSwgaXRlbSwgbW9kZSwgZGlyZWN0aW9uLCBydWxlcykge1xuICAgICAgaWYgKHJ1bGVzID09PSB2b2lkIDApIHtcbiAgICAgICAgcnVsZXMgPSBzdWNjZXNzb3JzO1xuICAgICAgfVxuICAgICAgdmFyIHJ1bGVPcHQgPSBmaW5kKHJ1bGVzLCBmdW5jdGlvbiAoc3VjYykge1xuICAgICAgICByZXR1cm4gc3VjYy5jdXJyZW50ID09PSBtb2RlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcnVsZU9wdC5iaW5kKGZ1bmN0aW9uIChydWxlKSB7XG4gICAgICAgIHJldHVybiBydWxlLmN1cnJlbnQodW5pdmVyc2UsIGl0ZW0sIGRpcmVjdGlvbiwgcnVsZS5uZXh0KS5vclRodW5rKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gcnVsZS5mYWxsYmFjay5iaW5kKGZ1bmN0aW9uIChmYikge1xuICAgICAgICAgICAgcmV0dXJuIGdvJDEodW5pdmVyc2UsIGl0ZW0sIGZiLCBkaXJlY3Rpb24pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgbGVmdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzaWJsaW5nID0gZnVuY3Rpb24gKHVuaXZlcnNlLCBpdGVtKSB7XG4gICAgICAgIHJldHVybiB1bml2ZXJzZS5xdWVyeSgpLnByZXZTaWJsaW5nKGl0ZW0pO1xuICAgICAgfTtcbiAgICAgIHZhciBmaXJzdCA9IGZ1bmN0aW9uIChjaGlsZHJlbikge1xuICAgICAgICByZXR1cm4gY2hpbGRyZW4ubGVuZ3RoID4gMCA/IE9wdGlvbi5zb21lKGNoaWxkcmVuW2NoaWxkcmVuLmxlbmd0aCAtIDFdKSA6IE9wdGlvbi5ub25lKCk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2libGluZzogc2libGluZyxcbiAgICAgICAgZmlyc3Q6IGZpcnN0XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHJpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHNpYmxpbmcgPSBmdW5jdGlvbiAodW5pdmVyc2UsIGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHVuaXZlcnNlLnF1ZXJ5KCkubmV4dFNpYmxpbmcoaXRlbSk7XG4gICAgICB9O1xuICAgICAgdmFyIGZpcnN0ID0gZnVuY3Rpb24gKGNoaWxkcmVuKSB7XG4gICAgICAgIHJldHVybiBjaGlsZHJlbi5sZW5ndGggPiAwID8gT3B0aW9uLnNvbWUoY2hpbGRyZW5bMF0pIDogT3B0aW9uLm5vbmUoKTtcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzaWJsaW5nOiBzaWJsaW5nLFxuICAgICAgICBmaXJzdDogZmlyc3RcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgV2Fsa2VycyA9IHtcbiAgICAgIGxlZnQ6IGxlZnQsXG4gICAgICByaWdodDogcmlnaHRcbiAgICB9O1xuXG4gICAgdmFyIGhvbmUgPSBmdW5jdGlvbiAodW5pdmVyc2UsIGl0ZW0sIHByZWRpY2F0ZSwgbW9kZSwgZGlyZWN0aW9uLCBpc1Jvb3QpIHtcbiAgICAgIHZhciBuZXh0ID0gZ28kMSh1bml2ZXJzZSwgaXRlbSwgbW9kZSwgZGlyZWN0aW9uKTtcbiAgICAgIHJldHVybiBuZXh0LmJpbmQoZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgaWYgKGlzUm9vdChuLml0ZW0oKSkpIHtcbiAgICAgICAgICByZXR1cm4gT3B0aW9uLm5vbmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcHJlZGljYXRlKG4uaXRlbSgpKSA/IE9wdGlvbi5zb21lKG4uaXRlbSgpKSA6IGhvbmUodW5pdmVyc2UsIG4uaXRlbSgpLCBwcmVkaWNhdGUsIG4ubW9kZSgpLCBkaXJlY3Rpb24sIGlzUm9vdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGxlZnQkMSA9IGZ1bmN0aW9uICh1bml2ZXJzZSwgaXRlbSwgcHJlZGljYXRlLCBpc1Jvb3QpIHtcbiAgICAgIHJldHVybiBob25lKHVuaXZlcnNlLCBpdGVtLCBwcmVkaWNhdGUsIHNpZGVzdGVwLCBXYWxrZXJzLmxlZnQoKSwgaXNSb290KTtcbiAgICB9O1xuICAgIHZhciByaWdodCQxID0gZnVuY3Rpb24gKHVuaXZlcnNlLCBpdGVtLCBwcmVkaWNhdGUsIGlzUm9vdCkge1xuICAgICAgcmV0dXJuIGhvbmUodW5pdmVyc2UsIGl0ZW0sIHByZWRpY2F0ZSwgc2lkZXN0ZXAsIFdhbGtlcnMucmlnaHQoKSwgaXNSb290KTtcbiAgICB9O1xuXG4gICAgdmFyIGlzTGVhZiA9IGZ1bmN0aW9uICh1bml2ZXJzZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB1bml2ZXJzZS5wcm9wZXJ0eSgpLmNoaWxkcmVuKGVsZW1lbnQpLmxlbmd0aCA9PT0gMDtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgYmVmb3JlJDMgPSBmdW5jdGlvbiAodW5pdmVyc2UsIGl0ZW0sIGlzUm9vdCkge1xuICAgICAgcmV0dXJuIHNlZWtMZWZ0KHVuaXZlcnNlLCBpdGVtLCBpc0xlYWYodW5pdmVyc2UpLCBpc1Jvb3QpO1xuICAgIH07XG4gICAgdmFyIGFmdGVyJDQgPSBmdW5jdGlvbiAodW5pdmVyc2UsIGl0ZW0sIGlzUm9vdCkge1xuICAgICAgcmV0dXJuIHNlZWtSaWdodCh1bml2ZXJzZSwgaXRlbSwgaXNMZWFmKHVuaXZlcnNlKSwgaXNSb290KTtcbiAgICB9O1xuICAgIHZhciBzZWVrTGVmdCA9IGxlZnQkMTtcbiAgICB2YXIgc2Vla1JpZ2h0ID0gcmlnaHQkMTtcblxuICAgIHZhciB1bml2ZXJzZSQzID0gRG9tVW5pdmVyc2UoKTtcbiAgICB2YXIgYmVmb3JlJDQgPSBmdW5jdGlvbiAoZWxlbWVudCwgaXNSb290KSB7XG4gICAgICByZXR1cm4gYmVmb3JlJDModW5pdmVyc2UkMywgZWxlbWVudCwgaXNSb290KTtcbiAgICB9O1xuICAgIHZhciBhZnRlciQ1ID0gZnVuY3Rpb24gKGVsZW1lbnQsIGlzUm9vdCkge1xuICAgICAgcmV0dXJuIGFmdGVyJDQodW5pdmVyc2UkMywgZWxlbWVudCwgaXNSb290KTtcbiAgICB9O1xuICAgIHZhciBzZWVrTGVmdCQxID0gZnVuY3Rpb24gKGVsZW1lbnQsIHByZWRpY2F0ZSwgaXNSb290KSB7XG4gICAgICByZXR1cm4gc2Vla0xlZnQodW5pdmVyc2UkMywgZWxlbWVudCwgcHJlZGljYXRlLCBpc1Jvb3QpO1xuICAgIH07XG4gICAgdmFyIHNlZWtSaWdodCQxID0gZnVuY3Rpb24gKGVsZW1lbnQsIHByZWRpY2F0ZSwgaXNSb290KSB7XG4gICAgICByZXR1cm4gc2Vla1JpZ2h0KHVuaXZlcnNlJDMsIGVsZW1lbnQsIHByZWRpY2F0ZSwgaXNSb290KTtcbiAgICB9O1xuXG4gICAgdmFyIGFuY2VzdG9yJDIgPSBmdW5jdGlvbiAoc2NvcGUsIHByZWRpY2F0ZSwgaXNSb290KSB7XG4gICAgICByZXR1cm4gYW5jZXN0b3Ioc2NvcGUsIHByZWRpY2F0ZSwgaXNSb290KS5pc1NvbWUoKTtcbiAgICB9O1xuXG4gICAgdmFyIGFkdCQ2ID0gQWR0LmdlbmVyYXRlKFtcbiAgICAgIHsgbm9uZTogWydtZXNzYWdlJ10gfSxcbiAgICAgIHsgc3VjY2VzczogW10gfSxcbiAgICAgIHsgZmFpbGVkVXA6IFsnY2VsbCddIH0sXG4gICAgICB7IGZhaWxlZERvd246IFsnY2VsbCddIH1cbiAgICBdKTtcbiAgICB2YXIgaXNPdmVybGFwcGluZyA9IGZ1bmN0aW9uIChicmlkZ2UsIGJlZm9yZSwgYWZ0ZXIpIHtcbiAgICAgIHZhciBiZWZvcmVCb3VuZHMgPSBicmlkZ2UuZ2V0UmVjdChiZWZvcmUpO1xuICAgICAgdmFyIGFmdGVyQm91bmRzID0gYnJpZGdlLmdldFJlY3QoYWZ0ZXIpO1xuICAgICAgcmV0dXJuIGFmdGVyQm91bmRzLnJpZ2h0ID4gYmVmb3JlQm91bmRzLmxlZnQgJiYgYWZ0ZXJCb3VuZHMubGVmdCA8IGJlZm9yZUJvdW5kcy5yaWdodDtcbiAgICB9O1xuICAgIHZhciBpc1JvdyA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICByZXR1cm4gY2xvc2VzdCQxKGVsZW0sICd0cicpO1xuICAgIH07XG4gICAgdmFyIHZlcmlmeSA9IGZ1bmN0aW9uIChicmlkZ2UsIGJlZm9yZSwgYmVmb3JlT2Zmc2V0LCBhZnRlciwgYWZ0ZXJPZmZzZXQsIGZhaWx1cmUsIGlzUm9vdCkge1xuICAgICAgcmV0dXJuIGNsb3Nlc3QkMShhZnRlciwgJ3RkLHRoJywgaXNSb290KS5iaW5kKGZ1bmN0aW9uIChhZnRlckNlbGwpIHtcbiAgICAgICAgcmV0dXJuIGNsb3Nlc3QkMShiZWZvcmUsICd0ZCx0aCcsIGlzUm9vdCkubWFwKGZ1bmN0aW9uIChiZWZvcmVDZWxsKSB7XG4gICAgICAgICAgaWYgKCFlcShhZnRlckNlbGwsIGJlZm9yZUNlbGwpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2hhcmVkT25lJDEoaXNSb3csIFtcbiAgICAgICAgICAgICAgYWZ0ZXJDZWxsLFxuICAgICAgICAgICAgICBiZWZvcmVDZWxsXG4gICAgICAgICAgICBdKS5mb2xkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGlzT3ZlcmxhcHBpbmcoYnJpZGdlLCBiZWZvcmVDZWxsLCBhZnRlckNlbGwpID8gYWR0JDYuc3VjY2VzcygpIDogZmFpbHVyZShiZWZvcmVDZWxsKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChfc2hhcmVkUm93KSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWlsdXJlKGJlZm9yZUNlbGwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBlcShhZnRlciwgYWZ0ZXJDZWxsKSAmJiBnZXRFbmQoYWZ0ZXJDZWxsKSA9PT0gYWZ0ZXJPZmZzZXQgPyBmYWlsdXJlKGJlZm9yZUNlbGwpIDogYWR0JDYubm9uZSgnaW4gc2FtZSBjZWxsJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pLmdldE9yKGFkdCQ2Lm5vbmUoJ2RlZmF1bHQnKSk7XG4gICAgfTtcbiAgICB2YXIgY2F0YSQyID0gZnVuY3Rpb24gKHN1YmplY3QsIG9uTm9uZSwgb25TdWNjZXNzLCBvbkZhaWxlZFVwLCBvbkZhaWxlZERvd24pIHtcbiAgICAgIHJldHVybiBzdWJqZWN0LmZvbGQob25Ob25lLCBvblN1Y2Nlc3MsIG9uRmFpbGVkVXAsIG9uRmFpbGVkRG93bik7XG4gICAgfTtcbiAgICB2YXIgQmVmb3JlQWZ0ZXIgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgYWR0JDYpLCB7XG4gICAgICB2ZXJpZnk6IHZlcmlmeSxcbiAgICAgIGNhdGE6IGNhdGEkMlxuICAgIH0pO1xuXG4gICAgdmFyIGluUGFyZW50ID0gZnVuY3Rpb24gKHBhcmVudCwgY2hpbGRyZW4sIGVsZW1lbnQsIGluZGV4KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXJlbnQ6IGNvbnN0YW50KHBhcmVudCksXG4gICAgICAgIGNoaWxkcmVuOiBjb25zdGFudChjaGlsZHJlbiksXG4gICAgICAgIGVsZW1lbnQ6IGNvbnN0YW50KGVsZW1lbnQpLFxuICAgICAgICBpbmRleDogY29uc3RhbnQoaW5kZXgpXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGluZGV4SW5QYXJlbnQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIHBhcmVudChlbGVtZW50KS5iaW5kKGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgdmFyIGNoaWxkcmVuJDEgPSBjaGlsZHJlbihwYXJlbnQpO1xuICAgICAgICByZXR1cm4gaW5kZXhPZihjaGlsZHJlbiQxLCBlbGVtZW50KS5tYXAoZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIGluUGFyZW50KHBhcmVudCwgY2hpbGRyZW4kMSwgZWxlbWVudCwgaW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGluZGV4T2YgPSBmdW5jdGlvbiAoZWxlbWVudHMsIGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBmaW5kSW5kZXgoZWxlbWVudHMsIGN1cnJ5KGVxLCBlbGVtZW50KSk7XG4gICAgfTtcblxuICAgIHZhciBpc0JyID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgIHJldHVybiBuYW1lKGVsZW0pID09PSAnYnInO1xuICAgIH07XG4gICAgdmFyIGdhdGhlcmVyID0gZnVuY3Rpb24gKGNhbmQsIGdhdGhlciwgaXNSb290KSB7XG4gICAgICByZXR1cm4gZ2F0aGVyKGNhbmQsIGlzUm9vdCkuYmluZChmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiBpc1RleHQodGFyZ2V0KSAmJiBnZXQkMyh0YXJnZXQpLnRyaW0oKS5sZW5ndGggPT09IDAgPyBnYXRoZXJlcih0YXJnZXQsIGdhdGhlciwgaXNSb290KSA6IE9wdGlvbi5zb21lKHRhcmdldCk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBoYW5kbGVCciA9IGZ1bmN0aW9uIChpc1Jvb3QsIGVsZW1lbnQsIGRpcmVjdGlvbikge1xuICAgICAgcmV0dXJuIGRpcmVjdGlvbi50cmF2ZXJzZShlbGVtZW50KS5vclRodW5rKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGdhdGhlcmVyKGVsZW1lbnQsIGRpcmVjdGlvbi5nYXRoZXIsIGlzUm9vdCk7XG4gICAgICB9KS5tYXAoZGlyZWN0aW9uLnJlbGF0aXZlKTtcbiAgICB9O1xuICAgIHZhciBmaW5kQnIgPSBmdW5jdGlvbiAoZWxlbWVudCwgb2Zmc2V0KSB7XG4gICAgICByZXR1cm4gY2hpbGQoZWxlbWVudCwgb2Zmc2V0KS5maWx0ZXIoaXNCcikub3JUaHVuayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjaGlsZChlbGVtZW50LCBvZmZzZXQgLSAxKS5maWx0ZXIoaXNCcik7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBoYW5kbGVQYXJlbnQgPSBmdW5jdGlvbiAoaXNSb290LCBlbGVtZW50LCBvZmZzZXQsIGRpcmVjdGlvbikge1xuICAgICAgcmV0dXJuIGZpbmRCcihlbGVtZW50LCBvZmZzZXQpLmJpbmQoZnVuY3Rpb24gKGJyKSB7XG4gICAgICAgIHJldHVybiBkaXJlY3Rpb24udHJhdmVyc2UoYnIpLmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBnYXRoZXJlcihiciwgZGlyZWN0aW9uLmdhdGhlciwgaXNSb290KS5tYXAoZGlyZWN0aW9uLnJlbGF0aXZlKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGFkamFjZW50KSB7XG4gICAgICAgICAgcmV0dXJuIGluZGV4SW5QYXJlbnQoYWRqYWNlbnQpLm1hcChmdW5jdGlvbiAoaW5mbykge1xuICAgICAgICAgICAgcmV0dXJuIFNpdHUub24oaW5mby5wYXJlbnQoKSwgaW5mby5pbmRleCgpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciB0cnlCciA9IGZ1bmN0aW9uIChpc1Jvb3QsIGVsZW1lbnQsIG9mZnNldCwgZGlyZWN0aW9uKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gaXNCcihlbGVtZW50KSA/IGhhbmRsZUJyKGlzUm9vdCwgZWxlbWVudCwgZGlyZWN0aW9uKSA6IGhhbmRsZVBhcmVudChpc1Jvb3QsIGVsZW1lbnQsIG9mZnNldCwgZGlyZWN0aW9uKTtcbiAgICAgIHJldHVybiB0YXJnZXQubWFwKGZ1bmN0aW9uICh0Z3QpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzdGFydDogY29uc3RhbnQodGd0KSxcbiAgICAgICAgICBmaW5pc2g6IGNvbnN0YW50KHRndClcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHByb2Nlc3MgPSBmdW5jdGlvbiAoYW5hbHlzaXMpIHtcbiAgICAgIHJldHVybiBCZWZvcmVBZnRlci5jYXRhKGFuYWx5c2lzLCBmdW5jdGlvbiAoX21lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIE9wdGlvbi5ub25lKCk7XG4gICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgICAgfSwgZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgICAgcmV0dXJuIE9wdGlvbi5zb21lKHBvaW50KGNlbGwsIDApKTtcbiAgICAgIH0sIGZ1bmN0aW9uIChjZWxsKSB7XG4gICAgICAgIHJldHVybiBPcHRpb24uc29tZShwb2ludChjZWxsLCBnZXRFbmQoY2VsbCkpKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgbW92ZURvd24gPSBmdW5jdGlvbiAoY2FyZXQsIGFtb3VudCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogY2FyZXQubGVmdCxcbiAgICAgICAgdG9wOiBjYXJldC50b3AgKyBhbW91bnQsXG4gICAgICAgIHJpZ2h0OiBjYXJldC5yaWdodCxcbiAgICAgICAgYm90dG9tOiBjYXJldC5ib3R0b20gKyBhbW91bnRcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgbW92ZVVwID0gZnVuY3Rpb24gKGNhcmV0LCBhbW91bnQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6IGNhcmV0LmxlZnQsXG4gICAgICAgIHRvcDogY2FyZXQudG9wIC0gYW1vdW50LFxuICAgICAgICByaWdodDogY2FyZXQucmlnaHQsXG4gICAgICAgIGJvdHRvbTogY2FyZXQuYm90dG9tIC0gYW1vdW50XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHRyYW5zbGF0ZSA9IGZ1bmN0aW9uIChjYXJldCwgeERlbHRhLCB5RGVsdGEpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6IGNhcmV0LmxlZnQgKyB4RGVsdGEsXG4gICAgICAgIHRvcDogY2FyZXQudG9wICsgeURlbHRhLFxuICAgICAgICByaWdodDogY2FyZXQucmlnaHQgKyB4RGVsdGEsXG4gICAgICAgIGJvdHRvbTogY2FyZXQuYm90dG9tICsgeURlbHRhXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGdldFRvcCQxID0gZnVuY3Rpb24gKGNhcmV0KSB7XG4gICAgICByZXR1cm4gY2FyZXQudG9wO1xuICAgIH07XG4gICAgdmFyIGdldEJvdHRvbSA9IGZ1bmN0aW9uIChjYXJldCkge1xuICAgICAgcmV0dXJuIGNhcmV0LmJvdHRvbTtcbiAgICB9O1xuXG4gICAgdmFyIGdldFBhcnRpYWxCb3ggPSBmdW5jdGlvbiAoYnJpZGdlLCBlbGVtZW50LCBvZmZzZXQpIHtcbiAgICAgIGlmIChvZmZzZXQgPj0gMCAmJiBvZmZzZXQgPCBnZXRFbmQoZWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuIGJyaWRnZS5nZXRSYW5nZWRSZWN0KGVsZW1lbnQsIG9mZnNldCwgZWxlbWVudCwgb2Zmc2V0ICsgMSk7XG4gICAgICB9IGVsc2UgaWYgKG9mZnNldCA+IDApIHtcbiAgICAgICAgcmV0dXJuIGJyaWRnZS5nZXRSYW5nZWRSZWN0KGVsZW1lbnQsIG9mZnNldCAtIDEsIGVsZW1lbnQsIG9mZnNldCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gT3B0aW9uLm5vbmUoKTtcbiAgICB9O1xuICAgIHZhciB0b0NhcmV0ID0gZnVuY3Rpb24gKHJlY3QpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6IHJlY3QubGVmdCxcbiAgICAgICAgdG9wOiByZWN0LnRvcCxcbiAgICAgICAgcmlnaHQ6IHJlY3QucmlnaHQsXG4gICAgICAgIGJvdHRvbTogcmVjdC5ib3R0b21cbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgZ2V0RWxlbUJveCA9IGZ1bmN0aW9uIChicmlkZ2UsIGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBPcHRpb24uc29tZShicmlkZ2UuZ2V0UmVjdChlbGVtZW50KSk7XG4gICAgfTtcbiAgICB2YXIgZ2V0Qm94QXQgPSBmdW5jdGlvbiAoYnJpZGdlLCBlbGVtZW50LCBvZmZzZXQpIHtcbiAgICAgIGlmIChpc0VsZW1lbnQoZWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuIGdldEVsZW1Cb3goYnJpZGdlLCBlbGVtZW50KS5tYXAodG9DYXJldCk7XG4gICAgICB9IGVsc2UgaWYgKGlzVGV4dChlbGVtZW50KSkge1xuICAgICAgICByZXR1cm4gZ2V0UGFydGlhbEJveChicmlkZ2UsIGVsZW1lbnQsIG9mZnNldCkubWFwKHRvQ2FyZXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE9wdGlvbi5ub25lKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgZ2V0RW50aXJlQm94ID0gZnVuY3Rpb24gKGJyaWRnZSwgZWxlbWVudCkge1xuICAgICAgaWYgKGlzRWxlbWVudChlbGVtZW50KSkge1xuICAgICAgICByZXR1cm4gZ2V0RWxlbUJveChicmlkZ2UsIGVsZW1lbnQpLm1hcCh0b0NhcmV0KTtcbiAgICAgIH0gZWxzZSBpZiAoaXNUZXh0KGVsZW1lbnQpKSB7XG4gICAgICAgIHJldHVybiBicmlkZ2UuZ2V0UmFuZ2VkUmVjdChlbGVtZW50LCAwLCBlbGVtZW50LCBnZXRFbmQoZWxlbWVudCkpLm1hcCh0b0NhcmV0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgSlVNUF9TSVpFID0gNTtcbiAgICB2YXIgTlVNX1JFVFJJRVMgPSAxMDA7XG4gICAgdmFyIGFkdCQ3ID0gQWR0LmdlbmVyYXRlKFtcbiAgICAgIHsgbm9uZTogW10gfSxcbiAgICAgIHsgcmV0cnk6IFsnY2FyZXQnXSB9XG4gICAgXSk7XG4gICAgdmFyIGlzT3V0c2lkZSA9IGZ1bmN0aW9uIChjYXJldCwgYm94KSB7XG4gICAgICByZXR1cm4gY2FyZXQubGVmdCA8IGJveC5sZWZ0IHx8IE1hdGguYWJzKGJveC5yaWdodCAtIGNhcmV0LmxlZnQpIDwgMSB8fCBjYXJldC5sZWZ0ID4gYm94LnJpZ2h0O1xuICAgIH07XG4gICAgdmFyIGluT3V0c2lkZUJsb2NrID0gZnVuY3Rpb24gKGJyaWRnZSwgZWxlbWVudCwgY2FyZXQpIHtcbiAgICAgIHJldHVybiBjbG9zZXN0KGVsZW1lbnQsIGlzQmxvY2skMSkuZm9sZChjb25zdGFudChmYWxzZSksIGZ1bmN0aW9uIChjZWxsKSB7XG4gICAgICAgIHJldHVybiBnZXRFbnRpcmVCb3goYnJpZGdlLCBjZWxsKS5leGlzdHMoZnVuY3Rpb24gKGJveCkge1xuICAgICAgICAgIHJldHVybiBpc091dHNpZGUoY2FyZXQsIGJveCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgYWRqdXN0RG93biA9IGZ1bmN0aW9uIChicmlkZ2UsIGVsZW1lbnQsIGd1ZXNzQm94LCBvcmlnaW5hbCwgY2FyZXQpIHtcbiAgICAgIHZhciBsb3dlckNhcmV0ID0gbW92ZURvd24oY2FyZXQsIEpVTVBfU0laRSk7XG4gICAgICBpZiAoTWF0aC5hYnMoZ3Vlc3NCb3guYm90dG9tIC0gb3JpZ2luYWwuYm90dG9tKSA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGFkdCQ3LnJldHJ5KGxvd2VyQ2FyZXQpO1xuICAgICAgfSBlbHNlIGlmIChndWVzc0JveC50b3AgPiBjYXJldC5ib3R0b20pIHtcbiAgICAgICAgcmV0dXJuIGFkdCQ3LnJldHJ5KGxvd2VyQ2FyZXQpO1xuICAgICAgfSBlbHNlIGlmIChndWVzc0JveC50b3AgPT09IGNhcmV0LmJvdHRvbSkge1xuICAgICAgICByZXR1cm4gYWR0JDcucmV0cnkobW92ZURvd24oY2FyZXQsIDEpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpbk91dHNpZGVCbG9jayhicmlkZ2UsIGVsZW1lbnQsIGNhcmV0KSA/IGFkdCQ3LnJldHJ5KHRyYW5zbGF0ZShsb3dlckNhcmV0LCBKVU1QX1NJWkUsIDApKSA6IGFkdCQ3Lm5vbmUoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBhZGp1c3RVcCA9IGZ1bmN0aW9uIChicmlkZ2UsIGVsZW1lbnQsIGd1ZXNzQm94LCBvcmlnaW5hbCwgY2FyZXQpIHtcbiAgICAgIHZhciBoaWdoZXJDYXJldCA9IG1vdmVVcChjYXJldCwgSlVNUF9TSVpFKTtcbiAgICAgIGlmIChNYXRoLmFicyhndWVzc0JveC50b3AgLSBvcmlnaW5hbC50b3ApIDwgMSkge1xuICAgICAgICByZXR1cm4gYWR0JDcucmV0cnkoaGlnaGVyQ2FyZXQpO1xuICAgICAgfSBlbHNlIGlmIChndWVzc0JveC5ib3R0b20gPCBjYXJldC50b3ApIHtcbiAgICAgICAgcmV0dXJuIGFkdCQ3LnJldHJ5KGhpZ2hlckNhcmV0KTtcbiAgICAgIH0gZWxzZSBpZiAoZ3Vlc3NCb3guYm90dG9tID09PSBjYXJldC50b3ApIHtcbiAgICAgICAgcmV0dXJuIGFkdCQ3LnJldHJ5KG1vdmVVcChjYXJldCwgMSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGluT3V0c2lkZUJsb2NrKGJyaWRnZSwgZWxlbWVudCwgY2FyZXQpID8gYWR0JDcucmV0cnkodHJhbnNsYXRlKGhpZ2hlckNhcmV0LCBKVU1QX1NJWkUsIDApKSA6IGFkdCQ3Lm5vbmUoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciB1cE1vdmVtZW50ID0ge1xuICAgICAgcG9pbnQ6IGdldFRvcCQxLFxuICAgICAgYWRqdXN0ZXI6IGFkanVzdFVwLFxuICAgICAgbW92ZTogbW92ZVVwLFxuICAgICAgZ2F0aGVyOiBiZWZvcmUkNFxuICAgIH07XG4gICAgdmFyIGRvd25Nb3ZlbWVudCA9IHtcbiAgICAgIHBvaW50OiBnZXRCb3R0b20sXG4gICAgICBhZGp1c3RlcjogYWRqdXN0RG93bixcbiAgICAgIG1vdmU6IG1vdmVEb3duLFxuICAgICAgZ2F0aGVyOiBhZnRlciQ1XG4gICAgfTtcbiAgICB2YXIgaXNBdFRhYmxlID0gZnVuY3Rpb24gKGJyaWRnZSwgeCwgeSkge1xuICAgICAgcmV0dXJuIGJyaWRnZS5lbGVtZW50RnJvbVBvaW50KHgsIHkpLmZpbHRlcihmdW5jdGlvbiAoZWxtKSB7XG4gICAgICAgIHJldHVybiBuYW1lKGVsbSkgPT09ICd0YWJsZSc7XG4gICAgICB9KS5pc1NvbWUoKTtcbiAgICB9O1xuICAgIHZhciBhZGp1c3RGb3JUYWJsZSA9IGZ1bmN0aW9uIChicmlkZ2UsIG1vdmVtZW50LCBvcmlnaW5hbCwgY2FyZXQsIG51bVJldHJpZXMpIHtcbiAgICAgIHJldHVybiBhZGp1c3RUaWwoYnJpZGdlLCBtb3ZlbWVudCwgb3JpZ2luYWwsIG1vdmVtZW50Lm1vdmUoY2FyZXQsIEpVTVBfU0laRSksIG51bVJldHJpZXMpO1xuICAgIH07XG4gICAgdmFyIGFkanVzdFRpbCA9IGZ1bmN0aW9uIChicmlkZ2UsIG1vdmVtZW50LCBvcmlnaW5hbCwgY2FyZXQsIG51bVJldHJpZXMpIHtcbiAgICAgIGlmIChudW1SZXRyaWVzID09PSAwKSB7XG4gICAgICAgIHJldHVybiBPcHRpb24uc29tZShjYXJldCk7XG4gICAgICB9XG4gICAgICBpZiAoaXNBdFRhYmxlKGJyaWRnZSwgY2FyZXQubGVmdCwgbW92ZW1lbnQucG9pbnQoY2FyZXQpKSkge1xuICAgICAgICByZXR1cm4gYWRqdXN0Rm9yVGFibGUoYnJpZGdlLCBtb3ZlbWVudCwgb3JpZ2luYWwsIGNhcmV0LCBudW1SZXRyaWVzIC0gMSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYnJpZGdlLnNpdHVzRnJvbVBvaW50KGNhcmV0LmxlZnQsIG1vdmVtZW50LnBvaW50KGNhcmV0KSkuYmluZChmdW5jdGlvbiAoZ3Vlc3MpIHtcbiAgICAgICAgcmV0dXJuIGd1ZXNzLnN0YXJ0KCkuZm9sZChPcHRpb24ubm9uZSwgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0RW50aXJlQm94KGJyaWRnZSwgZWxlbWVudCkuYmluZChmdW5jdGlvbiAoZ3Vlc3NCb3gpIHtcbiAgICAgICAgICAgIHJldHVybiBtb3ZlbWVudC5hZGp1c3RlcihicmlkZ2UsIGVsZW1lbnQsIGd1ZXNzQm94LCBvcmlnaW5hbCwgY2FyZXQpLmZvbGQoT3B0aW9uLm5vbmUsIGZ1bmN0aW9uIChuZXdDYXJldCkge1xuICAgICAgICAgICAgICByZXR1cm4gYWRqdXN0VGlsKGJyaWRnZSwgbW92ZW1lbnQsIG9yaWdpbmFsLCBuZXdDYXJldCwgbnVtUmV0cmllcyAtIDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSkub3JUaHVuayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gT3B0aW9uLnNvbWUoY2FyZXQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LCBPcHRpb24ubm9uZSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBpZVRyeURvd24gPSBmdW5jdGlvbiAoYnJpZGdlLCBjYXJldCkge1xuICAgICAgcmV0dXJuIGJyaWRnZS5zaXR1c0Zyb21Qb2ludChjYXJldC5sZWZ0LCBjYXJldC5ib3R0b20gKyBKVU1QX1NJWkUpO1xuICAgIH07XG4gICAgdmFyIGllVHJ5VXAgPSBmdW5jdGlvbiAoYnJpZGdlLCBjYXJldCkge1xuICAgICAgcmV0dXJuIGJyaWRnZS5zaXR1c0Zyb21Qb2ludChjYXJldC5sZWZ0LCBjYXJldC50b3AgLSBKVU1QX1NJWkUpO1xuICAgIH07XG4gICAgdmFyIGNoZWNrU2Nyb2xsID0gZnVuY3Rpb24gKG1vdmVtZW50LCBhZGp1c3RlZCwgYnJpZGdlKSB7XG4gICAgICBpZiAobW92ZW1lbnQucG9pbnQoYWRqdXN0ZWQpID4gYnJpZGdlLmdldElubmVySGVpZ2h0KCkpIHtcbiAgICAgICAgcmV0dXJuIE9wdGlvbi5zb21lKG1vdmVtZW50LnBvaW50KGFkanVzdGVkKSAtIGJyaWRnZS5nZXRJbm5lckhlaWdodCgpKTtcbiAgICAgIH0gZWxzZSBpZiAobW92ZW1lbnQucG9pbnQoYWRqdXN0ZWQpIDwgMCkge1xuICAgICAgICByZXR1cm4gT3B0aW9uLnNvbWUoLW1vdmVtZW50LnBvaW50KGFkanVzdGVkKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gT3B0aW9uLm5vbmUoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciByZXRyeSA9IGZ1bmN0aW9uIChtb3ZlbWVudCwgYnJpZGdlLCBjYXJldCkge1xuICAgICAgdmFyIG1vdmVkID0gbW92ZW1lbnQubW92ZShjYXJldCwgSlVNUF9TSVpFKTtcbiAgICAgIHZhciBhZGp1c3RlZCA9IGFkanVzdFRpbChicmlkZ2UsIG1vdmVtZW50LCBjYXJldCwgbW92ZWQsIE5VTV9SRVRSSUVTKS5nZXRPcihtb3ZlZCk7XG4gICAgICByZXR1cm4gY2hlY2tTY3JvbGwobW92ZW1lbnQsIGFkanVzdGVkLCBicmlkZ2UpLmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYnJpZGdlLnNpdHVzRnJvbVBvaW50KGFkanVzdGVkLmxlZnQsIG1vdmVtZW50LnBvaW50KGFkanVzdGVkKSk7XG4gICAgICB9LCBmdW5jdGlvbiAoZGVsdGEpIHtcbiAgICAgICAgYnJpZGdlLnNjcm9sbEJ5KDAsIGRlbHRhKTtcbiAgICAgICAgcmV0dXJuIGJyaWRnZS5zaXR1c0Zyb21Qb2ludChhZGp1c3RlZC5sZWZ0LCBtb3ZlbWVudC5wb2ludChhZGp1c3RlZCkgLSBkZWx0YSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBSZXRyaWVzID0ge1xuICAgICAgdHJ5VXA6IGN1cnJ5KHJldHJ5LCB1cE1vdmVtZW50KSxcbiAgICAgIHRyeURvd246IGN1cnJ5KHJldHJ5LCBkb3duTW92ZW1lbnQpLFxuICAgICAgaWVUcnlVcDogaWVUcnlVcCxcbiAgICAgIGllVHJ5RG93bjogaWVUcnlEb3duLFxuICAgICAgZ2V0SnVtcFNpemU6IGNvbnN0YW50KEpVTVBfU0laRSlcbiAgICB9O1xuXG4gICAgdmFyIE1BWF9SRVRSSUVTID0gMjA7XG4gICAgdmFyIGZpbmRTcG90ID0gZnVuY3Rpb24gKGJyaWRnZSwgaXNSb290LCBkaXJlY3Rpb24pIHtcbiAgICAgIHJldHVybiBicmlkZ2UuZ2V0U2VsZWN0aW9uKCkuYmluZChmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgIHJldHVybiB0cnlCcihpc1Jvb3QsIHNlbC5maW5pc2goKSwgc2VsLmZvZmZzZXQoKSwgZGlyZWN0aW9uKS5mb2xkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gT3B0aW9uLnNvbWUocG9pbnQoc2VsLmZpbmlzaCgpLCBzZWwuZm9mZnNldCgpKSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChick5laWdoYm91cikge1xuICAgICAgICAgIHZhciByYW5nZSA9IGJyaWRnZS5mcm9tU2l0dXMoYnJOZWlnaGJvdXIpO1xuICAgICAgICAgIHZhciBhbmFseXNpcyA9IEJlZm9yZUFmdGVyLnZlcmlmeShicmlkZ2UsIHNlbC5maW5pc2goKSwgc2VsLmZvZmZzZXQoKSwgcmFuZ2UuZmluaXNoKCksIHJhbmdlLmZvZmZzZXQoKSwgZGlyZWN0aW9uLmZhaWx1cmUsIGlzUm9vdCk7XG4gICAgICAgICAgcmV0dXJuIHByb2Nlc3MoYW5hbHlzaXMpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHNjYW4kMSA9IGZ1bmN0aW9uIChicmlkZ2UsIGlzUm9vdCwgZWxlbWVudCwgb2Zmc2V0LCBkaXJlY3Rpb24sIG51bVJldHJpZXMpIHtcbiAgICAgIGlmIChudW1SZXRyaWVzID09PSAwKSB7XG4gICAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRyeUN1cnNvcihicmlkZ2UsIGlzUm9vdCwgZWxlbWVudCwgb2Zmc2V0LCBkaXJlY3Rpb24pLmJpbmQoZnVuY3Rpb24gKHNpdHVzKSB7XG4gICAgICAgIHZhciByYW5nZSA9IGJyaWRnZS5mcm9tU2l0dXMoc2l0dXMpO1xuICAgICAgICB2YXIgYW5hbHlzaXMgPSBCZWZvcmVBZnRlci52ZXJpZnkoYnJpZGdlLCBlbGVtZW50LCBvZmZzZXQsIHJhbmdlLmZpbmlzaCgpLCByYW5nZS5mb2Zmc2V0KCksIGRpcmVjdGlvbi5mYWlsdXJlLCBpc1Jvb3QpO1xuICAgICAgICByZXR1cm4gQmVmb3JlQWZ0ZXIuY2F0YShhbmFseXNpcywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIE9wdGlvbi5zb21lKHNpdHVzKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGNlbGwpIHtcbiAgICAgICAgICBpZiAoZXEoZWxlbWVudCwgY2VsbCkgJiYgb2Zmc2V0ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ5QWdhaW4oYnJpZGdlLCBlbGVtZW50LCBvZmZzZXQsIG1vdmVVcCwgZGlyZWN0aW9uKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNjYW4kMShicmlkZ2UsIGlzUm9vdCwgY2VsbCwgMCwgZGlyZWN0aW9uLCBudW1SZXRyaWVzIC0gMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICAgIGlmIChlcShlbGVtZW50LCBjZWxsKSAmJiBvZmZzZXQgPT09IGdldEVuZChjZWxsKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRyeUFnYWluKGJyaWRnZSwgZWxlbWVudCwgb2Zmc2V0LCBtb3ZlRG93biwgZGlyZWN0aW9uKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNjYW4kMShicmlkZ2UsIGlzUm9vdCwgY2VsbCwgZ2V0RW5kKGNlbGwpLCBkaXJlY3Rpb24sIG51bVJldHJpZXMgLSAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgdHJ5QWdhaW4gPSBmdW5jdGlvbiAoYnJpZGdlLCBlbGVtZW50LCBvZmZzZXQsIG1vdmUsIGRpcmVjdGlvbikge1xuICAgICAgcmV0dXJuIGdldEJveEF0KGJyaWRnZSwgZWxlbWVudCwgb2Zmc2V0KS5iaW5kKGZ1bmN0aW9uIChib3gpIHtcbiAgICAgICAgcmV0dXJuIHRyeUF0KGJyaWRnZSwgZGlyZWN0aW9uLCBtb3ZlKGJveCwgUmV0cmllcy5nZXRKdW1wU2l6ZSgpKSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciB0cnlBdCA9IGZ1bmN0aW9uIChicmlkZ2UsIGRpcmVjdGlvbiwgYm94KSB7XG4gICAgICB2YXIgYnJvd3NlciA9IGRldGVjdCQzKCkuYnJvd3NlcjtcbiAgICAgIGlmIChicm93c2VyLmlzQ2hyb21lKCkgfHwgYnJvd3Nlci5pc1NhZmFyaSgpIHx8IGJyb3dzZXIuaXNGaXJlZm94KCkgfHwgYnJvd3Nlci5pc0VkZ2UoKSkge1xuICAgICAgICByZXR1cm4gZGlyZWN0aW9uLm90aGVyUmV0cnkoYnJpZGdlLCBib3gpO1xuICAgICAgfSBlbHNlIGlmIChicm93c2VyLmlzSUUoKSkge1xuICAgICAgICByZXR1cm4gZGlyZWN0aW9uLmllUmV0cnkoYnJpZGdlLCBib3gpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE9wdGlvbi5ub25lKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgdHJ5Q3Vyc29yID0gZnVuY3Rpb24gKGJyaWRnZSwgaXNSb290LCBlbGVtZW50LCBvZmZzZXQsIGRpcmVjdGlvbikge1xuICAgICAgcmV0dXJuIGdldEJveEF0KGJyaWRnZSwgZWxlbWVudCwgb2Zmc2V0KS5iaW5kKGZ1bmN0aW9uIChib3gpIHtcbiAgICAgICAgcmV0dXJuIHRyeUF0KGJyaWRnZSwgZGlyZWN0aW9uLCBib3gpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgaGFuZGxlJDIgPSBmdW5jdGlvbiAoYnJpZGdlLCBpc1Jvb3QsIGRpcmVjdGlvbikge1xuICAgICAgcmV0dXJuIGZpbmRTcG90KGJyaWRnZSwgaXNSb290LCBkaXJlY3Rpb24pLmJpbmQoZnVuY3Rpb24gKHNwb3QpIHtcbiAgICAgICAgcmV0dXJuIHNjYW4kMShicmlkZ2UsIGlzUm9vdCwgc3BvdC5lbGVtZW50KCksIHNwb3Qub2Zmc2V0KCksIGRpcmVjdGlvbiwgTUFYX1JFVFJJRVMpLm1hcChicmlkZ2UuZnJvbVNpdHVzKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgaW5TYW1lVGFibGUgPSBmdW5jdGlvbiAoZWxlbSwgdGFibGUpIHtcbiAgICAgIHJldHVybiBhbmNlc3RvciQyKGVsZW0sIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJldHVybiBwYXJlbnQoZSkuZXhpc3RzKGZ1bmN0aW9uIChwKSB7XG4gICAgICAgICAgcmV0dXJuIGVxKHAsIHRhYmxlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBzaW11bGF0ZSA9IGZ1bmN0aW9uIChicmlkZ2UsIGlzUm9vdCwgZGlyZWN0aW9uLCBpbml0aWFsLCBhbmNob3IpIHtcbiAgICAgIHJldHVybiBjbG9zZXN0JDEoaW5pdGlhbCwgJ3RkLHRoJywgaXNSb290KS5iaW5kKGZ1bmN0aW9uIChzdGFydCkge1xuICAgICAgICByZXR1cm4gY2xvc2VzdCQxKHN0YXJ0LCAndGFibGUnLCBpc1Jvb3QpLmJpbmQoZnVuY3Rpb24gKHRhYmxlKSB7XG4gICAgICAgICAgaWYgKCFpblNhbWVUYWJsZShhbmNob3IsIHRhYmxlKSkge1xuICAgICAgICAgICAgcmV0dXJuIE9wdGlvbi5ub25lKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBoYW5kbGUkMihicmlkZ2UsIGlzUm9vdCwgZGlyZWN0aW9uKS5iaW5kKGZ1bmN0aW9uIChyYW5nZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNsb3Nlc3QkMShyYW5nZS5maW5pc2goKSwgJ3RkLHRoJywgaXNSb290KS5tYXAoZnVuY3Rpb24gKGZpbmlzaCkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBjb25zdGFudChzdGFydCksXG4gICAgICAgICAgICAgICAgZmluaXNoOiBjb25zdGFudChmaW5pc2gpLFxuICAgICAgICAgICAgICAgIHJhbmdlOiBjb25zdGFudChyYW5nZSlcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIG5hdmlnYXRlID0gZnVuY3Rpb24gKGJyaWRnZSwgaXNSb290LCBkaXJlY3Rpb24sIGluaXRpYWwsIGFuY2hvciwgcHJlY2hlY2spIHtcbiAgICAgIGlmIChkZXRlY3QkMygpLmJyb3dzZXIuaXNJRSgpKSB7XG4gICAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHByZWNoZWNrKGluaXRpYWwsIGlzUm9vdCkub3JUaHVuayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHNpbXVsYXRlKGJyaWRnZSwgaXNSb290LCBkaXJlY3Rpb24sIGluaXRpYWwsIGFuY2hvcikubWFwKGZ1bmN0aW9uIChpbmZvKSB7XG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBpbmZvLnJhbmdlKCk7XG4gICAgICAgICAgICByZXR1cm4gUmVzcG9uc2UuY3JlYXRlKE9wdGlvbi5zb21lKG1ha2VTaXR1cyhyYW5nZS5zdGFydCgpLCByYW5nZS5zb2Zmc2V0KCksIHJhbmdlLmZpbmlzaCgpLCByYW5nZS5mb2Zmc2V0KCkpKSwgdHJ1ZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGZpcnN0VXBDaGVjayA9IGZ1bmN0aW9uIChpbml0aWFsLCBpc1Jvb3QpIHtcbiAgICAgIHJldHVybiBjbG9zZXN0JDEoaW5pdGlhbCwgJ3RyJywgaXNSb290KS5iaW5kKGZ1bmN0aW9uIChzdGFydFJvdykge1xuICAgICAgICByZXR1cm4gY2xvc2VzdCQxKHN0YXJ0Um93LCAndGFibGUnLCBpc1Jvb3QpLmJpbmQoZnVuY3Rpb24gKHRhYmxlKSB7XG4gICAgICAgICAgdmFyIHJvd3MgPSBkZXNjZW5kYW50cyQxKHRhYmxlLCAndHInKTtcbiAgICAgICAgICBpZiAoZXEoc3RhcnRSb3csIHJvd3NbMF0pKSB7XG4gICAgICAgICAgICByZXR1cm4gc2Vla0xlZnQkMSh0YWJsZSwgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGxhc3QkMShlbGVtZW50KS5pc1NvbWUoKTtcbiAgICAgICAgICAgIH0sIGlzUm9vdCkubWFwKGZ1bmN0aW9uIChsYXN0KSB7XG4gICAgICAgICAgICAgIHZhciBsYXN0T2Zmc2V0ID0gZ2V0RW5kKGxhc3QpO1xuICAgICAgICAgICAgICByZXR1cm4gUmVzcG9uc2UuY3JlYXRlKE9wdGlvbi5zb21lKG1ha2VTaXR1cyhsYXN0LCBsYXN0T2Zmc2V0LCBsYXN0LCBsYXN0T2Zmc2V0KSksIHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBsYXN0RG93bkNoZWNrID0gZnVuY3Rpb24gKGluaXRpYWwsIGlzUm9vdCkge1xuICAgICAgcmV0dXJuIGNsb3Nlc3QkMShpbml0aWFsLCAndHInLCBpc1Jvb3QpLmJpbmQoZnVuY3Rpb24gKHN0YXJ0Um93KSB7XG4gICAgICAgIHJldHVybiBjbG9zZXN0JDEoc3RhcnRSb3csICd0YWJsZScsIGlzUm9vdCkuYmluZChmdW5jdGlvbiAodGFibGUpIHtcbiAgICAgICAgICB2YXIgcm93cyA9IGRlc2NlbmRhbnRzJDEodGFibGUsICd0cicpO1xuICAgICAgICAgIGlmIChlcShzdGFydFJvdywgcm93c1tyb3dzLmxlbmd0aCAtIDFdKSkge1xuICAgICAgICAgICAgcmV0dXJuIHNlZWtSaWdodCQxKHRhYmxlLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICByZXR1cm4gZmlyc3QoZWxlbWVudCkuaXNTb21lKCk7XG4gICAgICAgICAgICB9LCBpc1Jvb3QpLm1hcChmdW5jdGlvbiAoZmlyc3QpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFJlc3BvbnNlLmNyZWF0ZShPcHRpb24uc29tZShtYWtlU2l0dXMoZmlyc3QsIDAsIGZpcnN0LCAwKSksIHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBzZWxlY3QgPSBmdW5jdGlvbiAoYnJpZGdlLCBjb250YWluZXIsIGlzUm9vdCwgZGlyZWN0aW9uLCBpbml0aWFsLCBhbmNob3IsIHNlbGVjdFJhbmdlKSB7XG4gICAgICByZXR1cm4gc2ltdWxhdGUoYnJpZGdlLCBpc1Jvb3QsIGRpcmVjdGlvbiwgaW5pdGlhbCwgYW5jaG9yKS5iaW5kKGZ1bmN0aW9uIChpbmZvKSB7XG4gICAgICAgIHJldHVybiBkZXRlY3QkNShjb250YWluZXIsIGlzUm9vdCwgaW5mby5zdGFydCgpLCBpbmZvLmZpbmlzaCgpLCBzZWxlY3RSYW5nZSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIGZpbmRDZWxsID0gZnVuY3Rpb24gKHRhcmdldCwgaXNSb290KSB7XG4gICAgICByZXR1cm4gY2xvc2VzdCQxKHRhcmdldCwgJ3RkLHRoJywgaXNSb290KTtcbiAgICB9O1xuICAgIGZ1bmN0aW9uIE1vdXNlU2VsZWN0aW9uIChicmlkZ2UsIGNvbnRhaW5lciwgaXNSb290LCBhbm5vdGF0aW9ucykge1xuICAgICAgdmFyIGN1cnNvciA9IE9wdGlvbi5ub25lKCk7XG4gICAgICB2YXIgY2xlYXJTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY3Vyc29yID0gT3B0aW9uLm5vbmUoKTtcbiAgICAgIH07XG4gICAgICB2YXIgbW91c2Vkb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGFubm90YXRpb25zLmNsZWFyKGNvbnRhaW5lcik7XG4gICAgICAgIGN1cnNvciA9IGZpbmRDZWxsKGV2ZW50LnRhcmdldCgpLCBpc1Jvb3QpO1xuICAgICAgfTtcbiAgICAgIHZhciBtb3VzZW92ZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgY3Vyc29yLmVhY2goZnVuY3Rpb24gKHN0YXJ0KSB7XG4gICAgICAgICAgYW5ub3RhdGlvbnMuY2xlYXJCZWZvcmVVcGRhdGUoY29udGFpbmVyKTtcbiAgICAgICAgICBmaW5kQ2VsbChldmVudC50YXJnZXQoKSwgaXNSb290KS5lYWNoKGZ1bmN0aW9uIChmaW5pc2gpIHtcbiAgICAgICAgICAgIGlkZW50aWZ5KHN0YXJ0LCBmaW5pc2gsIGlzUm9vdCkuZWFjaChmdW5jdGlvbiAoY2VsbFNlbCkge1xuICAgICAgICAgICAgICB2YXIgYm94ZXMgPSBjZWxsU2VsLmJveGVzLmdldE9yKFtdKTtcbiAgICAgICAgICAgICAgaWYgKGJveGVzLmxlbmd0aCA+IDEgfHwgYm94ZXMubGVuZ3RoID09PSAxICYmICFlcShzdGFydCwgZmluaXNoKSkge1xuICAgICAgICAgICAgICAgIGFubm90YXRpb25zLnNlbGVjdFJhbmdlKGNvbnRhaW5lciwgYm94ZXMsIGNlbGxTZWwuc3RhcnQsIGNlbGxTZWwuZmluaXNoKTtcbiAgICAgICAgICAgICAgICBicmlkZ2Uuc2VsZWN0Q29udGVudHMoZmluaXNoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIHZhciBtb3VzZXVwID0gZnVuY3Rpb24gKF9ldmVudCkge1xuICAgICAgICBjdXJzb3IuZWFjaChjbGVhclN0YXRlKTtcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtb3VzZWRvd246IG1vdXNlZG93bixcbiAgICAgICAgbW91c2VvdmVyOiBtb3VzZW92ZXIsXG4gICAgICAgIG1vdXNldXA6IG1vdXNldXBcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIGRvd24gPSB7XG4gICAgICB0cmF2ZXJzZTogbmV4dFNpYmxpbmcsXG4gICAgICBnYXRoZXI6IGFmdGVyJDUsXG4gICAgICByZWxhdGl2ZTogU2l0dS5iZWZvcmUsXG4gICAgICBvdGhlclJldHJ5OiBSZXRyaWVzLnRyeURvd24sXG4gICAgICBpZVJldHJ5OiBSZXRyaWVzLmllVHJ5RG93bixcbiAgICAgIGZhaWx1cmU6IEJlZm9yZUFmdGVyLmZhaWxlZERvd25cbiAgICB9O1xuICAgIHZhciB1cCA9IHtcbiAgICAgIHRyYXZlcnNlOiBwcmV2U2libGluZyxcbiAgICAgIGdhdGhlcjogYmVmb3JlJDQsXG4gICAgICByZWxhdGl2ZTogU2l0dS5iZWZvcmUsXG4gICAgICBvdGhlclJldHJ5OiBSZXRyaWVzLnRyeVVwLFxuICAgICAgaWVSZXRyeTogUmV0cmllcy5pZVRyeVVwLFxuICAgICAgZmFpbHVyZTogQmVmb3JlQWZ0ZXIuZmFpbGVkVXBcbiAgICB9O1xuXG4gICAgdmFyIGlzS2V5ID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChrZXljb2RlKSB7XG4gICAgICAgIHJldHVybiBrZXljb2RlID09PSBrZXk7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGlzVXAgPSBpc0tleSgzOCk7XG4gICAgdmFyIGlzRG93biA9IGlzS2V5KDQwKTtcbiAgICB2YXIgaXNOYXZpZ2F0aW9uID0gZnVuY3Rpb24gKGtleWNvZGUpIHtcbiAgICAgIHJldHVybiBrZXljb2RlID49IDM3ICYmIGtleWNvZGUgPD0gNDA7XG4gICAgfTtcbiAgICB2YXIgbHRyJDMgPSB7XG4gICAgICBpc0JhY2t3YXJkOiBpc0tleSgzNyksXG4gICAgICBpc0ZvcndhcmQ6IGlzS2V5KDM5KVxuICAgIH07XG4gICAgdmFyIHJ0bCQzID0ge1xuICAgICAgaXNCYWNrd2FyZDogaXNLZXkoMzkpLFxuICAgICAgaXNGb3J3YXJkOiBpc0tleSgzNylcbiAgICB9O1xuXG4gICAgdmFyIHRvUmF3ID0gZnVuY3Rpb24gKHNyKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsZWZ0OiBzci5sZWZ0KCksXG4gICAgICAgIHRvcDogc3IudG9wKCksXG4gICAgICAgIHJpZ2h0OiBzci5yaWdodCgpLFxuICAgICAgICBib3R0b206IHNyLmJvdHRvbSgpLFxuICAgICAgICB3aWR0aDogc3Iud2lkdGgoKSxcbiAgICAgICAgaGVpZ2h0OiBzci5oZWlnaHQoKVxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBSZWN0ID0geyB0b1JhdzogdG9SYXcgfTtcblxuICAgIHZhciBnZXQkYyA9IGZ1bmN0aW9uIChfRE9DKSB7XG4gICAgICB2YXIgZG9jID0gX0RPQyAhPT0gdW5kZWZpbmVkID8gX0RPQy5kb20oKSA6IGRvbUdsb2JhbHMuZG9jdW1lbnQ7XG4gICAgICB2YXIgeCA9IGRvYy5ib2R5LnNjcm9sbExlZnQgfHwgZG9jLmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgICAgdmFyIHkgPSBkb2MuYm9keS5zY3JvbGxUb3AgfHwgZG9jLmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICByZXR1cm4gUG9zaXRpb24oeCwgeSk7XG4gICAgfTtcbiAgICB2YXIgYnkgPSBmdW5jdGlvbiAoeCwgeSwgX0RPQykge1xuICAgICAgdmFyIGRvYyA9IF9ET0MgIT09IHVuZGVmaW5lZCA/IF9ET0MuZG9tKCkgOiBkb21HbG9iYWxzLmRvY3VtZW50O1xuICAgICAgdmFyIHdpbiA9IGRvYy5kZWZhdWx0VmlldztcbiAgICAgIHdpbi5zY3JvbGxCeSh4LCB5KTtcbiAgICB9O1xuXG4gICAgdmFyIFdpbmRvd0JyaWRnZSA9IGZ1bmN0aW9uICh3aW4pIHtcbiAgICAgIHZhciBlbGVtZW50RnJvbVBvaW50ID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIEVsZW1lbnQuZnJvbVBvaW50KEVsZW1lbnQuZnJvbURvbSh3aW4uZG9jdW1lbnQpLCB4LCB5KTtcbiAgICAgIH07XG4gICAgICB2YXIgZ2V0UmVjdCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50LmRvbSgpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgfTtcbiAgICAgIHZhciBnZXRSYW5nZWRSZWN0ID0gZnVuY3Rpb24gKHN0YXJ0LCBzb2Zmc2V0LCBmaW5pc2gsIGZvZmZzZXQpIHtcbiAgICAgICAgdmFyIHNlbCA9IFNlbGVjdGlvbi5leGFjdChzdGFydCwgc29mZnNldCwgZmluaXNoLCBmb2Zmc2V0KTtcbiAgICAgICAgcmV0dXJuIGdldEZpcnN0UmVjdCQxKHdpbiwgc2VsKS5tYXAoUmVjdC50b1Jhdyk7XG4gICAgICB9O1xuICAgICAgdmFyIGdldFNlbGVjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGdldCRiKHdpbikubWFwKGZ1bmN0aW9uIChleGFjdEFkdCkge1xuICAgICAgICAgIHJldHVybiBjb252ZXJ0VG9SYW5nZSh3aW4sIGV4YWN0QWR0KTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgdmFyIGZyb21TaXR1cyA9IGZ1bmN0aW9uIChzaXR1cykge1xuICAgICAgICB2YXIgcmVsYXRpdmUgPSBTZWxlY3Rpb24ucmVsYXRpdmUoc2l0dXMuc3RhcnQoKSwgc2l0dXMuZmluaXNoKCkpO1xuICAgICAgICByZXR1cm4gY29udmVydFRvUmFuZ2Uod2luLCByZWxhdGl2ZSk7XG4gICAgICB9O1xuICAgICAgdmFyIHNpdHVzRnJvbVBvaW50ID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIGdldEF0UG9pbnQod2luLCB4LCB5KS5tYXAoZnVuY3Rpb24gKGV4YWN0KSB7XG4gICAgICAgICAgcmV0dXJuIFNpdHVzLmNyZWF0ZShleGFjdC5zdGFydCgpLCBleGFjdC5zb2Zmc2V0KCksIGV4YWN0LmZpbmlzaCgpLCBleGFjdC5mb2Zmc2V0KCkpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICB2YXIgY2xlYXJTZWxlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyKHdpbik7XG4gICAgICB9O1xuICAgICAgdmFyIGNvbGxhcHNlU2VsZWN0aW9uID0gZnVuY3Rpb24gKHRvU3RhcnQpIHtcbiAgICAgICAgaWYgKHRvU3RhcnQgPT09IHZvaWQgMCkge1xuICAgICAgICAgIHRvU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBnZXQkYih3aW4pLmVhY2goZnVuY3Rpb24gKHNlbCkge1xuICAgICAgICAgIHJldHVybiBzZWwuZm9sZChmdW5jdGlvbiAocm5nKSB7XG4gICAgICAgICAgICByZXR1cm4gcm5nLmNvbGxhcHNlKHRvU3RhcnQpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uIChzdGFydFNpdHUsIGZpbmlzaFNpdHUpIHtcbiAgICAgICAgICAgIHZhciBzaXR1ID0gdG9TdGFydCA/IHN0YXJ0U2l0dSA6IGZpbmlzaFNpdHU7XG4gICAgICAgICAgICBzZXRSZWxhdGl2ZSh3aW4sIHNpdHUsIHNpdHUpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uIChzdGFydCwgc29mZnNldCwgZmluaXNoLCBmb2Zmc2V0KSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRvU3RhcnQgPyBzdGFydCA6IGZpbmlzaDtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSB0b1N0YXJ0ID8gc29mZnNldCA6IGZvZmZzZXQ7XG4gICAgICAgICAgICBzZXRFeGFjdCh3aW4sIG5vZGUsIG9mZnNldCwgbm9kZSwgb2Zmc2V0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgdmFyIHNlbGVjdENvbnRlbnRzID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgc2V0VG9FbGVtZW50KHdpbiwgZWxlbWVudCk7XG4gICAgICB9O1xuICAgICAgdmFyIHNldFNlbGVjdGlvbiA9IGZ1bmN0aW9uIChzZWwpIHtcbiAgICAgICAgc2V0RXhhY3Qod2luLCBzZWwuc3RhcnQoKSwgc2VsLnNvZmZzZXQoKSwgc2VsLmZpbmlzaCgpLCBzZWwuZm9mZnNldCgpKTtcbiAgICAgIH07XG4gICAgICB2YXIgc2V0UmVsYXRpdmVTZWxlY3Rpb24gPSBmdW5jdGlvbiAoc3RhcnQsIGZpbmlzaCkge1xuICAgICAgICBzZXRSZWxhdGl2ZSh3aW4sIHN0YXJ0LCBmaW5pc2gpO1xuICAgICAgfTtcbiAgICAgIHZhciBnZXRJbm5lckhlaWdodCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHdpbi5pbm5lckhlaWdodDtcbiAgICAgIH07XG4gICAgICB2YXIgZ2V0U2Nyb2xsWSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBvcyA9IGdldCRjKEVsZW1lbnQuZnJvbURvbSh3aW4uZG9jdW1lbnQpKTtcbiAgICAgICAgcmV0dXJuIHBvcy50b3AoKTtcbiAgICAgIH07XG4gICAgICB2YXIgc2Nyb2xsQnkgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICBieSh4LCB5LCBFbGVtZW50LmZyb21Eb20od2luLmRvY3VtZW50KSk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZWxlbWVudEZyb21Qb2ludDogZWxlbWVudEZyb21Qb2ludCxcbiAgICAgICAgZ2V0UmVjdDogZ2V0UmVjdCxcbiAgICAgICAgZ2V0UmFuZ2VkUmVjdDogZ2V0UmFuZ2VkUmVjdCxcbiAgICAgICAgZ2V0U2VsZWN0aW9uOiBnZXRTZWxlY3Rpb24sXG4gICAgICAgIGZyb21TaXR1czogZnJvbVNpdHVzLFxuICAgICAgICBzaXR1c0Zyb21Qb2ludDogc2l0dXNGcm9tUG9pbnQsXG4gICAgICAgIGNsZWFyU2VsZWN0aW9uOiBjbGVhclNlbGVjdGlvbixcbiAgICAgICAgY29sbGFwc2VTZWxlY3Rpb246IGNvbGxhcHNlU2VsZWN0aW9uLFxuICAgICAgICBzZXRTZWxlY3Rpb246IHNldFNlbGVjdGlvbixcbiAgICAgICAgc2V0UmVsYXRpdmVTZWxlY3Rpb246IHNldFJlbGF0aXZlU2VsZWN0aW9uLFxuICAgICAgICBzZWxlY3RDb250ZW50czogc2VsZWN0Q29udGVudHMsXG4gICAgICAgIGdldElubmVySGVpZ2h0OiBnZXRJbm5lckhlaWdodCxcbiAgICAgICAgZ2V0U2Nyb2xsWTogZ2V0U2Nyb2xsWSxcbiAgICAgICAgc2Nyb2xsQnk6IHNjcm9sbEJ5XG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgcmMgPSBmdW5jdGlvbiAocm93cywgY29scykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcm93czogcm93cyxcbiAgICAgICAgY29sczogY29sc1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBtb3VzZSA9IGZ1bmN0aW9uICh3aW4sIGNvbnRhaW5lciwgaXNSb290LCBhbm5vdGF0aW9ucykge1xuICAgICAgdmFyIGJyaWRnZSA9IFdpbmRvd0JyaWRnZSh3aW4pO1xuICAgICAgdmFyIGhhbmRsZXJzID0gTW91c2VTZWxlY3Rpb24oYnJpZGdlLCBjb250YWluZXIsIGlzUm9vdCwgYW5ub3RhdGlvbnMpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbW91c2Vkb3duOiBoYW5kbGVycy5tb3VzZWRvd24sXG4gICAgICAgIG1vdXNlb3ZlcjogaGFuZGxlcnMubW91c2VvdmVyLFxuICAgICAgICBtb3VzZXVwOiBoYW5kbGVycy5tb3VzZXVwXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGtleWJvYXJkID0gZnVuY3Rpb24gKHdpbiwgY29udGFpbmVyLCBpc1Jvb3QsIGFubm90YXRpb25zKSB7XG4gICAgICB2YXIgYnJpZGdlID0gV2luZG93QnJpZGdlKHdpbik7XG4gICAgICB2YXIgY2xlYXJUb05hdmlnYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBhbm5vdGF0aW9ucy5jbGVhcihjb250YWluZXIpO1xuICAgICAgICByZXR1cm4gT3B0aW9uLm5vbmUoKTtcbiAgICAgIH07XG4gICAgICB2YXIga2V5ZG93biA9IGZ1bmN0aW9uIChldmVudCwgc3RhcnQsIHNvZmZzZXQsIGZpbmlzaCwgZm9mZnNldCwgZGlyZWN0aW9uKSB7XG4gICAgICAgIHZhciByZWFsRXZlbnQgPSBldmVudC5yYXcoKTtcbiAgICAgICAgdmFyIGtleWNvZGUgPSByZWFsRXZlbnQud2hpY2g7XG4gICAgICAgIHZhciBzaGlmdEtleSA9IHJlYWxFdmVudC5zaGlmdEtleSA9PT0gdHJ1ZTtcbiAgICAgICAgdmFyIGhhbmRsZXIgPSByZXRyaWV2ZShjb250YWluZXIsIGFubm90YXRpb25zLnNlbGVjdGVkU2VsZWN0b3IpLmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChpc0Rvd24oa2V5Y29kZSkgJiYgc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBjdXJyeShzZWxlY3QsIGJyaWRnZSwgY29udGFpbmVyLCBpc1Jvb3QsIGRvd24sIGZpbmlzaCwgc3RhcnQsIGFubm90YXRpb25zLnNlbGVjdFJhbmdlKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzVXAoa2V5Y29kZSkgJiYgc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBjdXJyeShzZWxlY3QsIGJyaWRnZSwgY29udGFpbmVyLCBpc1Jvb3QsIHVwLCBmaW5pc2gsIHN0YXJ0LCBhbm5vdGF0aW9ucy5zZWxlY3RSYW5nZSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpc0Rvd24oa2V5Y29kZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBjdXJyeShuYXZpZ2F0ZSwgYnJpZGdlLCBpc1Jvb3QsIGRvd24sIGZpbmlzaCwgc3RhcnQsIGxhc3REb3duQ2hlY2spO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaXNVcChrZXljb2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJ5KG5hdmlnYXRlLCBicmlkZ2UsIGlzUm9vdCwgdXAsIGZpbmlzaCwgc3RhcnQsIGZpcnN0VXBDaGVjayk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBPcHRpb24ubm9uZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uIChzZWxlY3RlZCkge1xuICAgICAgICAgIHZhciB1cGRhdGUkMSA9IGZ1bmN0aW9uIChhdHRlbXB0cykge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgdmFyIG5hdmlnYXRpb24gPSBmaW5kTWFwKGF0dGVtcHRzLCBmdW5jdGlvbiAoZGVsdGEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlKGRlbHRhLnJvd3MsIGRlbHRhLmNvbHMsIGNvbnRhaW5lciwgc2VsZWN0ZWQsIGFubm90YXRpb25zKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiBuYXZpZ2F0aW9uLmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRFZGdlcyhjb250YWluZXIsIGFubm90YXRpb25zLmZpcnN0U2VsZWN0ZWRTZWxlY3RvciwgYW5ub3RhdGlvbnMubGFzdFNlbGVjdGVkU2VsZWN0b3IpLm1hcChmdW5jdGlvbiAoZWRnZXMpIHtcbiAgICAgICAgICAgICAgICAgIHZhciByZWxhdGl2ZSA9IGlzRG93bihrZXljb2RlKSB8fCBkaXJlY3Rpb24uaXNGb3J3YXJkKGtleWNvZGUpID8gU2l0dS5hZnRlciA6IFNpdHUuYmVmb3JlO1xuICAgICAgICAgICAgICAgICAgYnJpZGdlLnNldFJlbGF0aXZlU2VsZWN0aW9uKFNpdHUub24oZWRnZXMuZmlyc3QoKSwgMCksIHJlbGF0aXZlKGVkZ2VzLnRhYmxlKCkpKTtcbiAgICAgICAgICAgICAgICAgIGFubm90YXRpb25zLmNsZWFyKGNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gUmVzcG9uc2UuY3JlYXRlKE9wdGlvbi5ub25lKCksIHRydWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoXykge1xuICAgICAgICAgICAgICAgIHJldHVybiBPcHRpb24uc29tZShSZXNwb25zZS5jcmVhdGUoT3B0aW9uLm5vbmUoKSwgdHJ1ZSkpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZiAoaXNEb3duKGtleWNvZGUpICYmIHNoaWZ0S2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gdXBkYXRlJDEoW3JjKCsxLCAwKV0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaXNVcChrZXljb2RlKSAmJiBzaGlmdEtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZSQxKFtyYygtMSwgMCldKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbi5pc0JhY2t3YXJkKGtleWNvZGUpICYmIHNoaWZ0S2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gdXBkYXRlJDEoW1xuICAgICAgICAgICAgICByYygwLCAtMSksXG4gICAgICAgICAgICAgIHJjKC0xLCAwKVxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24uaXNGb3J3YXJkKGtleWNvZGUpICYmIHNoaWZ0S2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gdXBkYXRlJDEoW1xuICAgICAgICAgICAgICByYygwLCArMSksXG4gICAgICAgICAgICAgIHJjKCsxLCAwKVxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpc05hdmlnYXRpb24oa2V5Y29kZSkgJiYgc2hpZnRLZXkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gY2xlYXJUb05hdmlnYXRlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gT3B0aW9uLm5vbmU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGhhbmRsZXIoKTtcbiAgICAgIH07XG4gICAgICB2YXIga2V5dXAgPSBmdW5jdGlvbiAoZXZlbnQsIHN0YXJ0LCBzb2Zmc2V0LCBmaW5pc2gsIGZvZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIHJldHJpZXZlKGNvbnRhaW5lciwgYW5ub3RhdGlvbnMuc2VsZWN0ZWRTZWxlY3RvcikuZm9sZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIHJlYWxFdmVudCA9IGV2ZW50LnJhdygpO1xuICAgICAgICAgIHZhciBrZXljb2RlID0gcmVhbEV2ZW50LndoaWNoO1xuICAgICAgICAgIHZhciBzaGlmdEtleSA9IHJlYWxFdmVudC5zaGlmdEtleSA9PT0gdHJ1ZTtcbiAgICAgICAgICBpZiAoc2hpZnRLZXkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gT3B0aW9uLm5vbmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGlzTmF2aWdhdGlvbihrZXljb2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHN5bmMoY29udGFpbmVyLCBpc1Jvb3QsIHN0YXJ0LCBzb2Zmc2V0LCBmaW5pc2gsIGZvZmZzZXQsIGFubm90YXRpb25zLnNlbGVjdFJhbmdlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE9wdGlvbi5ub25lKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBPcHRpb24ubm9uZSk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2V5ZG93bjoga2V5ZG93bixcbiAgICAgICAga2V5dXA6IGtleXVwXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGV4dGVybmFsID0gZnVuY3Rpb24gKHdpbiwgY29udGFpbmVyLCBpc1Jvb3QsIGFubm90YXRpb25zKSB7XG4gICAgICB2YXIgYnJpZGdlID0gV2luZG93QnJpZGdlKHdpbik7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHN0YXJ0LCBmaW5pc2gpIHtcbiAgICAgICAgYW5ub3RhdGlvbnMuY2xlYXJCZWZvcmVVcGRhdGUoY29udGFpbmVyKTtcbiAgICAgICAgaWRlbnRpZnkoc3RhcnQsIGZpbmlzaCwgaXNSb290KS5lYWNoKGZ1bmN0aW9uIChjZWxsU2VsKSB7XG4gICAgICAgICAgdmFyIGJveGVzID0gY2VsbFNlbC5ib3hlcy5nZXRPcihbXSk7XG4gICAgICAgICAgYW5ub3RhdGlvbnMuc2VsZWN0UmFuZ2UoY29udGFpbmVyLCBib3hlcywgY2VsbFNlbC5zdGFydCwgY2VsbFNlbC5maW5pc2gpO1xuICAgICAgICAgIGJyaWRnZS5zZWxlY3RDb250ZW50cyhmaW5pc2gpO1xuICAgICAgICAgIGJyaWRnZS5jb2xsYXBzZVNlbGVjdGlvbigpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciByZW1vdmUkNyA9IGZ1bmN0aW9uIChlbGVtZW50LCBjbGFzc2VzKSB7XG4gICAgICBlYWNoKGNsYXNzZXMsIGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJlbW92ZSQ1KGVsZW1lbnQsIHgpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBhZGRDbGFzcyA9IGZ1bmN0aW9uIChjbGF6eikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIGFkZCQzKGVsZW1lbnQsIGNsYXp6KTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgcmVtb3ZlQ2xhc3NlcyA9IGZ1bmN0aW9uIChjbGFzc2VzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmVtb3ZlJDcoZWxlbWVudCwgY2xhc3Nlcyk7XG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgYnlDbGFzcyA9IGZ1bmN0aW9uIChlcGhlbWVyYSkge1xuICAgICAgdmFyIGFkZFNlbGVjdGlvbkNsYXNzID0gYWRkQ2xhc3MoZXBoZW1lcmEuc2VsZWN0ZWQpO1xuICAgICAgdmFyIHJlbW92ZVNlbGVjdGlvbkNsYXNzZXMgPSByZW1vdmVDbGFzc2VzKFtcbiAgICAgICAgZXBoZW1lcmEuc2VsZWN0ZWQsXG4gICAgICAgIGVwaGVtZXJhLmxhc3RTZWxlY3RlZCxcbiAgICAgICAgZXBoZW1lcmEuZmlyc3RTZWxlY3RlZFxuICAgICAgXSk7XG4gICAgICB2YXIgY2xlYXIgPSBmdW5jdGlvbiAoY29udGFpbmVyKSB7XG4gICAgICAgIHZhciBzZWxzID0gZGVzY2VuZGFudHMkMShjb250YWluZXIsIGVwaGVtZXJhLnNlbGVjdGVkU2VsZWN0b3IpO1xuICAgICAgICBlYWNoKHNlbHMsIHJlbW92ZVNlbGVjdGlvbkNsYXNzZXMpO1xuICAgICAgfTtcbiAgICAgIHZhciBzZWxlY3RSYW5nZSA9IGZ1bmN0aW9uIChjb250YWluZXIsIGNlbGxzLCBzdGFydCwgZmluaXNoKSB7XG4gICAgICAgIGNsZWFyKGNvbnRhaW5lcik7XG4gICAgICAgIGVhY2goY2VsbHMsIGFkZFNlbGVjdGlvbkNsYXNzKTtcbiAgICAgICAgYWRkJDMoc3RhcnQsIGVwaGVtZXJhLmZpcnN0U2VsZWN0ZWQpO1xuICAgICAgICBhZGQkMyhmaW5pc2gsIGVwaGVtZXJhLmxhc3RTZWxlY3RlZCk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2xlYXJCZWZvcmVVcGRhdGU6IGNsZWFyLFxuICAgICAgICBjbGVhcjogY2xlYXIsXG4gICAgICAgIHNlbGVjdFJhbmdlOiBzZWxlY3RSYW5nZSxcbiAgICAgICAgc2VsZWN0ZWRTZWxlY3RvcjogZXBoZW1lcmEuc2VsZWN0ZWRTZWxlY3RvcixcbiAgICAgICAgZmlyc3RTZWxlY3RlZFNlbGVjdG9yOiBlcGhlbWVyYS5maXJzdFNlbGVjdGVkU2VsZWN0b3IsXG4gICAgICAgIGxhc3RTZWxlY3RlZFNlbGVjdG9yOiBlcGhlbWVyYS5sYXN0U2VsZWN0ZWRTZWxlY3RvclxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBieUF0dHIgPSBmdW5jdGlvbiAoZXBoZW1lcmEsIG9uU2VsZWN0aW9uLCBvbkNsZWFyKSB7XG4gICAgICB2YXIgcmVtb3ZlU2VsZWN0aW9uQXR0cmlidXRlcyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHJlbW92ZShlbGVtZW50LCBlcGhlbWVyYS5zZWxlY3RlZCk7XG4gICAgICAgIHJlbW92ZShlbGVtZW50LCBlcGhlbWVyYS5maXJzdFNlbGVjdGVkKTtcbiAgICAgICAgcmVtb3ZlKGVsZW1lbnQsIGVwaGVtZXJhLmxhc3RTZWxlY3RlZCk7XG4gICAgICB9O1xuICAgICAgdmFyIGFkZFNlbGVjdGlvbkF0dHJpYnV0ZSA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHNldChlbGVtZW50LCBlcGhlbWVyYS5zZWxlY3RlZCwgJzEnKTtcbiAgICAgIH07XG4gICAgICB2YXIgY2xlYXIgPSBmdW5jdGlvbiAoY29udGFpbmVyKSB7XG4gICAgICAgIGNsZWFyQmVmb3JlVXBkYXRlKGNvbnRhaW5lcik7XG4gICAgICAgIG9uQ2xlYXIoKTtcbiAgICAgIH07XG4gICAgICB2YXIgY2xlYXJCZWZvcmVVcGRhdGUgPSBmdW5jdGlvbiAoY29udGFpbmVyKSB7XG4gICAgICAgIHZhciBzZWxzID0gZGVzY2VuZGFudHMkMShjb250YWluZXIsIGVwaGVtZXJhLnNlbGVjdGVkU2VsZWN0b3IpO1xuICAgICAgICBlYWNoKHNlbHMsIHJlbW92ZVNlbGVjdGlvbkF0dHJpYnV0ZXMpO1xuICAgICAgfTtcbiAgICAgIHZhciBzZWxlY3RSYW5nZSA9IGZ1bmN0aW9uIChjb250YWluZXIsIGNlbGxzLCBzdGFydCwgZmluaXNoKSB7XG4gICAgICAgIGNsZWFyKGNvbnRhaW5lcik7XG4gICAgICAgIGVhY2goY2VsbHMsIGFkZFNlbGVjdGlvbkF0dHJpYnV0ZSk7XG4gICAgICAgIHNldChzdGFydCwgZXBoZW1lcmEuZmlyc3RTZWxlY3RlZCwgJzEnKTtcbiAgICAgICAgc2V0KGZpbmlzaCwgZXBoZW1lcmEubGFzdFNlbGVjdGVkLCAnMScpO1xuICAgICAgICBvblNlbGVjdGlvbihjZWxscywgc3RhcnQsIGZpbmlzaCk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2xlYXJCZWZvcmVVcGRhdGU6IGNsZWFyQmVmb3JlVXBkYXRlLFxuICAgICAgICBjbGVhcjogY2xlYXIsXG4gICAgICAgIHNlbGVjdFJhbmdlOiBzZWxlY3RSYW5nZSxcbiAgICAgICAgc2VsZWN0ZWRTZWxlY3RvcjogZXBoZW1lcmEuc2VsZWN0ZWRTZWxlY3RvcixcbiAgICAgICAgZmlyc3RTZWxlY3RlZFNlbGVjdG9yOiBlcGhlbWVyYS5maXJzdFNlbGVjdGVkU2VsZWN0b3IsXG4gICAgICAgIGxhc3RTZWxlY3RlZFNlbGVjdG9yOiBlcGhlbWVyYS5sYXN0U2VsZWN0ZWRTZWxlY3RvclxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBTZWxlY3Rpb25Bbm5vdGF0aW9uID0ge1xuICAgICAgYnlDbGFzczogYnlDbGFzcyxcbiAgICAgIGJ5QXR0cjogYnlBdHRyXG4gICAgfTtcblxuICAgIHZhciBnZXRVcE9yTGVmdENlbGxzID0gZnVuY3Rpb24gKGdyaWQsIHNlbGVjdGVkQ2VsbHMsIGdlbmVyYXRvcnMpIHtcbiAgICAgIHZhciB1cEdyaWQgPSBncmlkLnNsaWNlKDAsIHNlbGVjdGVkQ2VsbHNbc2VsZWN0ZWRDZWxscy5sZW5ndGggLSAxXS5yb3coKSArIDEpO1xuICAgICAgdmFyIHVwRGV0YWlscyA9IHRvRGV0YWlsTGlzdCh1cEdyaWQsIGdlbmVyYXRvcnMpO1xuICAgICAgcmV0dXJuIGJpbmQodXBEZXRhaWxzLCBmdW5jdGlvbiAoZGV0YWlsKSB7XG4gICAgICAgIHZhciBzbGljZWRDZWxscyA9IGRldGFpbC5jZWxscygpLnNsaWNlKDAsIHNlbGVjdGVkQ2VsbHNbc2VsZWN0ZWRDZWxscy5sZW5ndGggLSAxXS5jb2x1bW4oKSArIDEpO1xuICAgICAgICByZXR1cm4gbWFwKHNsaWNlZENlbGxzLCBmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICAgIHJldHVybiBjZWxsLmVsZW1lbnQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBnZXREb3duT3JSaWdodENlbGxzID0gZnVuY3Rpb24gKGdyaWQsIHNlbGVjdGVkQ2VsbHMsIGdlbmVyYXRvcnMpIHtcbiAgICAgIHZhciBkb3duR3JpZCA9IGdyaWQuc2xpY2Uoc2VsZWN0ZWRDZWxsc1swXS5yb3coKSArIHNlbGVjdGVkQ2VsbHNbMF0ucm93c3BhbigpIC0gMSwgZ3JpZC5sZW5ndGgpO1xuICAgICAgdmFyIGRvd25EZXRhaWxzID0gdG9EZXRhaWxMaXN0KGRvd25HcmlkLCBnZW5lcmF0b3JzKTtcbiAgICAgIHJldHVybiBiaW5kKGRvd25EZXRhaWxzLCBmdW5jdGlvbiAoZGV0YWlsKSB7XG4gICAgICAgIHZhciBzbGljZWRDZWxscyA9IGRldGFpbC5jZWxscygpLnNsaWNlKHNlbGVjdGVkQ2VsbHNbMF0uY29sdW1uKCkgKyBzZWxlY3RlZENlbGxzWzBdLmNvbHNwYW4oKSAtIDEsICtkZXRhaWwuY2VsbHMoKS5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gbWFwKHNsaWNlZENlbGxzLCBmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgICAgIHJldHVybiBjZWxsLmVsZW1lbnQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBnZXRPdGhlckNlbGxzID0gZnVuY3Rpb24gKHRhYmxlLCB0YXJnZXQsIGdlbmVyYXRvcnMpIHtcbiAgICAgIHZhciBob3VzZSA9IFdhcmVob3VzZS5mcm9tVGFibGUodGFibGUpO1xuICAgICAgdmFyIGRldGFpbHMgPSBvbkNlbGxzKGhvdXNlLCB0YXJnZXQpO1xuICAgICAgcmV0dXJuIGRldGFpbHMubWFwKGZ1bmN0aW9uIChzZWxlY3RlZENlbGxzKSB7XG4gICAgICAgIHZhciBncmlkID0gdG9HcmlkKGhvdXNlLCBnZW5lcmF0b3JzLCBmYWxzZSk7XG4gICAgICAgIHZhciB1cE9yTGVmdENlbGxzID0gZ2V0VXBPckxlZnRDZWxscyhncmlkLCBzZWxlY3RlZENlbGxzLCBnZW5lcmF0b3JzKTtcbiAgICAgICAgdmFyIGRvd25PclJpZ2h0Q2VsbHMgPSBnZXREb3duT3JSaWdodENlbGxzKGdyaWQsIHNlbGVjdGVkQ2VsbHMsIGdlbmVyYXRvcnMpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHVwT3JMZWZ0Q2VsbHM6IHVwT3JMZWZ0Q2VsbHMsXG4gICAgICAgICAgZG93bk9yUmlnaHRDZWxsczogZG93bk9yUmlnaHRDZWxsc1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBoYXNJbnRlcm5hbFRhcmdldCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gaGFzJDIoRWxlbWVudC5mcm9tRG9tKGUudGFyZ2V0KSwgJ2VwaG94LXNub29rZXItcmVzaXplci1iYXInKSA9PT0gZmFsc2U7XG4gICAgfTtcbiAgICBmdW5jdGlvbiBDZWxsU2VsZWN0aW9uIChlZGl0b3IsIGxhenlSZXNpemUsIHNlbGVjdGlvblRhcmdldHMpIHtcbiAgICAgIHZhciBvblNlbGVjdGlvbiA9IGZ1bmN0aW9uIChjZWxscywgc3RhcnQsIGZpbmlzaCkge1xuICAgICAgICBzZWxlY3Rpb25UYXJnZXRzLnRhcmdldHMoKS5lYWNoKGZ1bmN0aW9uICh0YXJnZXRzKSB7XG4gICAgICAgICAgdmFyIHRhYmxlT3B0ID0gdGFibGUoc3RhcnQpO1xuICAgICAgICAgIHRhYmxlT3B0LmVhY2goZnVuY3Rpb24gKHRhYmxlKSB7XG4gICAgICAgICAgICB2YXIgY2xvbmVGb3JtYXRzID0gZ2V0Q2xvbmVFbGVtZW50cyhlZGl0b3IpO1xuICAgICAgICAgICAgdmFyIGdlbmVyYXRvcnMgPSBjZWxsT3BlcmF0aW9ucyhub29wLCBFbGVtZW50LmZyb21Eb20oZWRpdG9yLmdldERvYygpKSwgY2xvbmVGb3JtYXRzKTtcbiAgICAgICAgICAgIHZhciBvdGhlckNlbGxzID0gZ2V0T3RoZXJDZWxscyh0YWJsZSwgdGFyZ2V0cywgZ2VuZXJhdG9ycyk7XG4gICAgICAgICAgICBmaXJlVGFibGVTZWxlY3Rpb25DaGFuZ2UoZWRpdG9yLCBjZWxscywgc3RhcnQsIGZpbmlzaCwgb3RoZXJDZWxscyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIHZhciBvbkNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZmlyZVRhYmxlU2VsZWN0aW9uQ2xlYXIoZWRpdG9yKTtcbiAgICAgIH07XG4gICAgICB2YXIgYW5ub3RhdGlvbnMgPSBTZWxlY3Rpb25Bbm5vdGF0aW9uLmJ5QXR0cihFcGhlbWVyYSwgb25TZWxlY3Rpb24sIG9uQ2xlYXIpO1xuICAgICAgZWRpdG9yLm9uKCdpbml0JywgZnVuY3Rpb24gKF9lKSB7XG4gICAgICAgIHZhciB3aW4gPSBlZGl0b3IuZ2V0V2luKCk7XG4gICAgICAgIHZhciBib2R5ID0gZ2V0Qm9keSQxKGVkaXRvcik7XG4gICAgICAgIHZhciBpc1Jvb3QgPSBnZXRJc1Jvb3QoZWRpdG9yKTtcbiAgICAgICAgdmFyIHN5bmNTZWxlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIHNlbCA9IGVkaXRvci5zZWxlY3Rpb247XG4gICAgICAgICAgdmFyIHN0YXJ0ID0gRWxlbWVudC5mcm9tRG9tKHNlbC5nZXRTdGFydCgpKTtcbiAgICAgICAgICB2YXIgZW5kID0gRWxlbWVudC5mcm9tRG9tKHNlbC5nZXRFbmQoKSk7XG4gICAgICAgICAgdmFyIHNoYXJlZCA9IHNoYXJlZE9uZSQxKHRhYmxlLCBbXG4gICAgICAgICAgICBzdGFydCxcbiAgICAgICAgICAgIGVuZFxuICAgICAgICAgIF0pO1xuICAgICAgICAgIHNoYXJlZC5mb2xkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBhbm5vdGF0aW9ucy5jbGVhcihib2R5KTtcbiAgICAgICAgICB9LCBub29wKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG1vdXNlSGFuZGxlcnMgPSBtb3VzZSh3aW4sIGJvZHksIGlzUm9vdCwgYW5ub3RhdGlvbnMpO1xuICAgICAgICB2YXIga2V5SGFuZGxlcnMgPSBrZXlib2FyZCh3aW4sIGJvZHksIGlzUm9vdCwgYW5ub3RhdGlvbnMpO1xuICAgICAgICB2YXIgZXh0ZXJuYWwkMSA9IGV4dGVybmFsKHdpbiwgYm9keSwgaXNSb290LCBhbm5vdGF0aW9ucyk7XG4gICAgICAgIHZhciBoYXNTaGlmdEtleSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHJldHVybiBldmVudC5yYXcoKS5zaGlmdEtleSA9PT0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgZWRpdG9yLm9uKCdUYWJsZVNlbGVjdG9yQ2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICByZXR1cm4gZXh0ZXJuYWwkMShlLnN0YXJ0LCBlLmZpbmlzaCk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgaGFuZGxlUmVzcG9uc2UgPSBmdW5jdGlvbiAoZXZlbnQsIHJlc3BvbnNlKSB7XG4gICAgICAgICAgaWYgKCFoYXNTaGlmdEtleShldmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLmtpbGwoKSkge1xuICAgICAgICAgICAgZXZlbnQua2lsbCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNwb25zZS5zZWxlY3Rpb24oKS5lYWNoKGZ1bmN0aW9uIChucykge1xuICAgICAgICAgICAgdmFyIHJlbGF0aXZlID0gU2VsZWN0aW9uLnJlbGF0aXZlKG5zLnN0YXJ0KCksIG5zLmZpbmlzaCgpKTtcbiAgICAgICAgICAgIHZhciBybmcgPSBhc0x0clJhbmdlKHdpbiwgcmVsYXRpdmUpO1xuICAgICAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5zZXRSbmcocm5nKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGtleXVwID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgdmFyIHdyYXBwZWRFdmVudCA9IGZyb21SYXdFdmVudCQxKGV2ZW50KTtcbiAgICAgICAgICBpZiAod3JhcHBlZEV2ZW50LnJhdygpLnNoaWZ0S2V5ICYmIGlzTmF2aWdhdGlvbih3cmFwcGVkRXZlbnQucmF3KCkud2hpY2gpKSB7XG4gICAgICAgICAgICB2YXIgcm5nID0gZWRpdG9yLnNlbGVjdGlvbi5nZXRSbmcoKTtcbiAgICAgICAgICAgIHZhciBzdGFydCA9IEVsZW1lbnQuZnJvbURvbShybmcuc3RhcnRDb250YWluZXIpO1xuICAgICAgICAgICAgdmFyIGVuZCA9IEVsZW1lbnQuZnJvbURvbShybmcuZW5kQ29udGFpbmVyKTtcbiAgICAgICAgICAgIGtleUhhbmRsZXJzLmtleXVwKHdyYXBwZWRFdmVudCwgc3RhcnQsIHJuZy5zdGFydE9mZnNldCwgZW5kLCBybmcuZW5kT2Zmc2V0KS5lYWNoKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICBoYW5kbGVSZXNwb25zZSh3cmFwcGVkRXZlbnQsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGtleWRvd24gPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICB2YXIgd3JhcHBlZEV2ZW50ID0gZnJvbVJhd0V2ZW50JDEoZXZlbnQpO1xuICAgICAgICAgIGxhenlSZXNpemUoKS5lYWNoKGZ1bmN0aW9uIChyZXNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNpemUuaGlkZUJhcnMoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YXIgcm5nID0gZWRpdG9yLnNlbGVjdGlvbi5nZXRSbmcoKTtcbiAgICAgICAgICB2YXIgc3RhcnRDb250YWluZXIgPSBFbGVtZW50LmZyb21Eb20oZWRpdG9yLnNlbGVjdGlvbi5nZXRTdGFydCgpKTtcbiAgICAgICAgICB2YXIgc3RhcnQgPSBFbGVtZW50LmZyb21Eb20ocm5nLnN0YXJ0Q29udGFpbmVyKTtcbiAgICAgICAgICB2YXIgZW5kID0gRWxlbWVudC5mcm9tRG9tKHJuZy5lbmRDb250YWluZXIpO1xuICAgICAgICAgIHZhciBkaXJlY3Rpb24gPSBkaXJlY3Rpb25BdChzdGFydENvbnRhaW5lcikuaXNSdGwoKSA/IHJ0bCQzIDogbHRyJDM7XG4gICAgICAgICAga2V5SGFuZGxlcnMua2V5ZG93bih3cmFwcGVkRXZlbnQsIHN0YXJ0LCBybmcuc3RhcnRPZmZzZXQsIGVuZCwgcm5nLmVuZE9mZnNldCwgZGlyZWN0aW9uKS5lYWNoKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgaGFuZGxlUmVzcG9uc2Uod3JhcHBlZEV2ZW50LCByZXNwb25zZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbGF6eVJlc2l6ZSgpLmVhY2goZnVuY3Rpb24gKHJlc2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc2l6ZS5zaG93QmFycygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgaXNMZWZ0TW91c2UgPSBmdW5jdGlvbiAocmF3KSB7XG4gICAgICAgICAgcmV0dXJuIHJhdy5idXR0b24gPT09IDA7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBpc0xlZnRCdXR0b25QcmVzc2VkID0gZnVuY3Rpb24gKHJhdykge1xuICAgICAgICAgIGlmIChyYXcuYnV0dG9ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGdsb2JhbCQyLmJyb3dzZXIuaXNFZGdlKCkgJiYgcmF3LmJ1dHRvbnMgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKHJhdy5idXR0b25zICYgMSkgIT09IDA7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBtb3VzZURvd24gPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGlmIChpc0xlZnRNb3VzZShlKSAmJiBoYXNJbnRlcm5hbFRhcmdldChlKSkge1xuICAgICAgICAgICAgbW91c2VIYW5kbGVycy5tb3VzZWRvd24oZnJvbVJhd0V2ZW50JDEoZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG1vdXNlT3ZlciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgaWYgKGlzTGVmdEJ1dHRvblByZXNzZWQoZSkgJiYgaGFzSW50ZXJuYWxUYXJnZXQoZSkpIHtcbiAgICAgICAgICAgIG1vdXNlSGFuZGxlcnMubW91c2VvdmVyKGZyb21SYXdFdmVudCQxKGUpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZhciBtb3VzZVVwID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBpZiAoaXNMZWZ0TW91c2UoZSkgJiYgaGFzSW50ZXJuYWxUYXJnZXQoZSkpIHtcbiAgICAgICAgICAgIG1vdXNlSGFuZGxlcnMubW91c2V1cChmcm9tUmF3RXZlbnQkMShlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB2YXIgZ2V0RG91YmxlVGFwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBsYXN0VGFyZ2V0ID0gQ2VsbChFbGVtZW50LmZyb21Eb20oYm9keSkpO1xuICAgICAgICAgIHZhciBsYXN0VGltZVN0YW1wID0gQ2VsbCgwKTtcbiAgICAgICAgICB2YXIgdG91Y2hFbmQgPSBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IEVsZW1lbnQuZnJvbURvbSh0LnRhcmdldCk7XG4gICAgICAgICAgICBpZiAobmFtZSh0YXJnZXQpID09PSAndGQnIHx8IG5hbWUodGFyZ2V0KSA9PT0gJ3RoJykge1xuICAgICAgICAgICAgICB2YXIgbFQgPSBsYXN0VGFyZ2V0LmdldCgpO1xuICAgICAgICAgICAgICB2YXIgbFRTID0gbGFzdFRpbWVTdGFtcC5nZXQoKTtcbiAgICAgICAgICAgICAgaWYgKGVxKGxULCB0YXJnZXQpICYmIHQudGltZVN0YW1wIC0gbFRTIDwgMzAwKSB7XG4gICAgICAgICAgICAgICAgdC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGV4dGVybmFsJDEodGFyZ2V0LCB0YXJnZXQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0VGFyZ2V0LnNldCh0YXJnZXQpO1xuICAgICAgICAgICAgbGFzdFRpbWVTdGFtcC5zZXQodC50aW1lU3RhbXApO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIHsgdG91Y2hFbmQ6IHRvdWNoRW5kIH07XG4gICAgICAgIH07XG4gICAgICAgIHZhciBkb3VibGVUYXAgPSBnZXREb3VibGVUYXAoKTtcbiAgICAgICAgZWRpdG9yLm9uKCdtb3VzZWRvd24nLCBtb3VzZURvd24pO1xuICAgICAgICBlZGl0b3Iub24oJ21vdXNlb3ZlcicsIG1vdXNlT3Zlcik7XG4gICAgICAgIGVkaXRvci5vbignbW91c2V1cCcsIG1vdXNlVXApO1xuICAgICAgICBlZGl0b3Iub24oJ3RvdWNoZW5kJywgZG91YmxlVGFwLnRvdWNoRW5kKTtcbiAgICAgICAgZWRpdG9yLm9uKCdrZXl1cCcsIGtleXVwKTtcbiAgICAgICAgZWRpdG9yLm9uKCdrZXlkb3duJywga2V5ZG93bik7XG4gICAgICAgIGVkaXRvci5vbignTm9kZUNoYW5nZScsIHN5bmNTZWxlY3Rpb24pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4geyBjbGVhcjogYW5ub3RhdGlvbnMuY2xlYXIgfTtcbiAgICB9XG5cbiAgICB2YXIgZ2V0U2VsZWN0aW9uVGFyZ2V0cyA9IGZ1bmN0aW9uIChlZGl0b3IsIHNlbGVjdGlvbnMpIHtcbiAgICAgIHZhciB0YXJnZXRzID0gQ2VsbChPcHRpb24ubm9uZSgpKTtcbiAgICAgIHZhciBjaGFuZ2VIYW5kbGVycyA9IENlbGwoW10pO1xuICAgICAgdmFyIGZpbmRUYXJnZXRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZ2V0U2VsZWN0aW9uU3RhcnRDZWxsT3JDYXB0aW9uKGVkaXRvcikuYmluZChmdW5jdGlvbiAoY2VsbE9yQ2FwdGlvbikge1xuICAgICAgICAgIHZhciB0YWJsZSQxID0gdGFibGUoY2VsbE9yQ2FwdGlvbik7XG4gICAgICAgICAgdmFyIGlzQ2FwdGlvbiA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gbmFtZShlbGVtKSA9PT0gJ2NhcHRpb24nO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIHRhYmxlJDEubWFwKGZ1bmN0aW9uICh0YWJsZSkge1xuICAgICAgICAgICAgaWYgKGlzQ2FwdGlvbihjZWxsT3JDYXB0aW9uKSkge1xuICAgICAgICAgICAgICByZXR1cm4gbm9NZW51KGNlbGxPckNhcHRpb24pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZvck1lbnUoc2VsZWN0aW9ucywgdGFibGUsIGNlbGxPckNhcHRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICB2YXIgcmVzZXRUYXJnZXRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0YXJnZXRzLnNldChjYWNoZWQoZmluZFRhcmdldHMpKCkpO1xuICAgICAgICBlYWNoKGNoYW5nZUhhbmRsZXJzLmdldCgpLCBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICAgIHJldHVybiBoYW5kbGVyKCk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIHZhciBvblNldHVwID0gZnVuY3Rpb24gKGFwaSwgaXNEaXNhYmxlZCkge1xuICAgICAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gdGFyZ2V0cy5nZXQoKS5mb2xkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGFwaS5zZXREaXNhYmxlZCh0cnVlKTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAodGFyZ2V0cykge1xuICAgICAgICAgICAgYXBpLnNldERpc2FibGVkKGlzRGlzYWJsZWQodGFyZ2V0cykpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBoYW5kbGVyKCk7XG4gICAgICAgIGNoYW5nZUhhbmRsZXJzLnNldChjaGFuZ2VIYW5kbGVycy5nZXQoKS5jb25jYXQoW2hhbmRsZXJdKSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY2hhbmdlSGFuZGxlcnMuc2V0KGZpbHRlcihjaGFuZ2VIYW5kbGVycy5nZXQoKSwgZnVuY3Rpb24gKGgpIHtcbiAgICAgICAgICAgIHJldHVybiBoICE9PSBoYW5kbGVyO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICB2YXIgb25TZXR1cFRhYmxlID0gZnVuY3Rpb24gKGFwaSkge1xuICAgICAgICByZXR1cm4gb25TZXR1cChhcGksIGZ1bmN0aW9uIChfKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICB2YXIgb25TZXR1cENlbGxPclJvdyA9IGZ1bmN0aW9uIChhcGkpIHtcbiAgICAgICAgcmV0dXJuIG9uU2V0dXAoYXBpLCBmdW5jdGlvbiAodGFyZ2V0cykge1xuICAgICAgICAgIHJldHVybiBuYW1lKHRhcmdldHMuZWxlbWVudCgpKSA9PT0gJ2NhcHRpb24nO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICB2YXIgb25TZXR1cFBhc3RlYWJsZSA9IGZ1bmN0aW9uIChnZXRDbGlwYm9hcmREYXRhKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYXBpKSB7XG4gICAgICAgICAgcmV0dXJuIG9uU2V0dXAoYXBpLCBmdW5jdGlvbiAodGFyZ2V0cykge1xuICAgICAgICAgICAgcmV0dXJuIG5hbWUodGFyZ2V0cy5lbGVtZW50KCkpID09PSAnY2FwdGlvbicgfHwgZ2V0Q2xpcGJvYXJkRGF0YSgpLmlzTm9uZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICAgIHZhciBvblNldHVwTWVyZ2VhYmxlID0gZnVuY3Rpb24gKGFwaSkge1xuICAgICAgICByZXR1cm4gb25TZXR1cChhcGksIGZ1bmN0aW9uICh0YXJnZXRzKSB7XG4gICAgICAgICAgcmV0dXJuIHRhcmdldHMubWVyZ2FibGUoKS5pc05vbmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgdmFyIG9uU2V0dXBVbm1lcmdlYWJsZSA9IGZ1bmN0aW9uIChhcGkpIHtcbiAgICAgICAgcmV0dXJuIG9uU2V0dXAoYXBpLCBmdW5jdGlvbiAodGFyZ2V0cykge1xuICAgICAgICAgIHJldHVybiB0YXJnZXRzLnVubWVyZ2FibGUoKS5pc05vbmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgZWRpdG9yLm9uKCdOb2RlQ2hhbmdlIEV4ZWNDb21tYW5kIFRhYmxlU2VsZWN0b3JDaGFuZ2UnLCByZXNldFRhcmdldHMpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgb25TZXR1cFRhYmxlOiBvblNldHVwVGFibGUsXG4gICAgICAgIG9uU2V0dXBDZWxsT3JSb3c6IG9uU2V0dXBDZWxsT3JSb3csXG4gICAgICAgIG9uU2V0dXBQYXN0ZWFibGU6IG9uU2V0dXBQYXN0ZWFibGUsXG4gICAgICAgIG9uU2V0dXBNZXJnZWFibGU6IG9uU2V0dXBNZXJnZWFibGUsXG4gICAgICAgIG9uU2V0dXBVbm1lcmdlYWJsZTogb25TZXR1cFVubWVyZ2VhYmxlLFxuICAgICAgICByZXNldFRhcmdldHM6IHJlc2V0VGFyZ2V0cyxcbiAgICAgICAgdGFyZ2V0czogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiB0YXJnZXRzLmdldCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgYWRkQnV0dG9ucyA9IGZ1bmN0aW9uIChlZGl0b3IsIHNlbGVjdGlvblRhcmdldHMsIGNsaXBib2FyZCkge1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZE1lbnVCdXR0b24oJ3RhYmxlJywge1xuICAgICAgICB0b29sdGlwOiAnVGFibGUnLFxuICAgICAgICBpY29uOiAndGFibGUnLFxuICAgICAgICBmZXRjaDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCdpbnNlcnR0YWJsZSB8IGNlbGwgcm93IGNvbHVtbiB8IGFkdnRhYmxlc29ydCB8IHRhYmxlcHJvcHMgZGVsZXRldGFibGUnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB2YXIgY21kID0gZnVuY3Rpb24gKGNvbW1hbmQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZWRpdG9yLmV4ZWNDb21tYW5kKGNvbW1hbmQpO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRCdXR0b24oJ3RhYmxlcHJvcHMnLCB7XG4gICAgICAgIHRvb2x0aXA6ICdUYWJsZSBwcm9wZXJ0aWVzJyxcbiAgICAgICAgb25BY3Rpb246IGNtZCgnbWNlVGFibGVQcm9wcycpLFxuICAgICAgICBpY29uOiAndGFibGUnLFxuICAgICAgICBvblNldHVwOiBzZWxlY3Rpb25UYXJnZXRzLm9uU2V0dXBUYWJsZVxuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQnV0dG9uKCd0YWJsZWRlbGV0ZScsIHtcbiAgICAgICAgdG9vbHRpcDogJ0RlbGV0ZSB0YWJsZScsXG4gICAgICAgIG9uQWN0aW9uOiBjbWQoJ21jZVRhYmxlRGVsZXRlJyksXG4gICAgICAgIGljb246ICd0YWJsZS1kZWxldGUtdGFibGUnLFxuICAgICAgICBvblNldHVwOiBzZWxlY3Rpb25UYXJnZXRzLm9uU2V0dXBUYWJsZVxuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQnV0dG9uKCd0YWJsZWNlbGxwcm9wcycsIHtcbiAgICAgICAgdG9vbHRpcDogJ0NlbGwgcHJvcGVydGllcycsXG4gICAgICAgIG9uQWN0aW9uOiBjbWQoJ21jZVRhYmxlQ2VsbFByb3BzJyksXG4gICAgICAgIGljb246ICd0YWJsZS1jZWxsLXByb3BlcnRpZXMnLFxuICAgICAgICBvblNldHVwOiBzZWxlY3Rpb25UYXJnZXRzLm9uU2V0dXBDZWxsT3JSb3dcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZEJ1dHRvbigndGFibGVtZXJnZWNlbGxzJywge1xuICAgICAgICB0b29sdGlwOiAnTWVyZ2UgY2VsbHMnLFxuICAgICAgICBvbkFjdGlvbjogY21kKCdtY2VUYWJsZU1lcmdlQ2VsbHMnKSxcbiAgICAgICAgaWNvbjogJ3RhYmxlLW1lcmdlLWNlbGxzJyxcbiAgICAgICAgb25TZXR1cDogc2VsZWN0aW9uVGFyZ2V0cy5vblNldHVwTWVyZ2VhYmxlXG4gICAgICB9KTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRCdXR0b24oJ3RhYmxlc3BsaXRjZWxscycsIHtcbiAgICAgICAgdG9vbHRpcDogJ1NwbGl0IGNlbGwnLFxuICAgICAgICBvbkFjdGlvbjogY21kKCdtY2VUYWJsZVNwbGl0Q2VsbHMnKSxcbiAgICAgICAgaWNvbjogJ3RhYmxlLXNwbGl0LWNlbGxzJyxcbiAgICAgICAgb25TZXR1cDogc2VsZWN0aW9uVGFyZ2V0cy5vblNldHVwVW5tZXJnZWFibGVcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZEJ1dHRvbigndGFibGVpbnNlcnRyb3diZWZvcmUnLCB7XG4gICAgICAgIHRvb2x0aXA6ICdJbnNlcnQgcm93IGJlZm9yZScsXG4gICAgICAgIG9uQWN0aW9uOiBjbWQoJ21jZVRhYmxlSW5zZXJ0Um93QmVmb3JlJyksXG4gICAgICAgIGljb246ICd0YWJsZS1pbnNlcnQtcm93LWFib3ZlJyxcbiAgICAgICAgb25TZXR1cDogc2VsZWN0aW9uVGFyZ2V0cy5vblNldHVwQ2VsbE9yUm93XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRCdXR0b24oJ3RhYmxlaW5zZXJ0cm93YWZ0ZXInLCB7XG4gICAgICAgIHRvb2x0aXA6ICdJbnNlcnQgcm93IGFmdGVyJyxcbiAgICAgICAgb25BY3Rpb246IGNtZCgnbWNlVGFibGVJbnNlcnRSb3dBZnRlcicpLFxuICAgICAgICBpY29uOiAndGFibGUtaW5zZXJ0LXJvdy1hZnRlcicsXG4gICAgICAgIG9uU2V0dXA6IHNlbGVjdGlvblRhcmdldHMub25TZXR1cENlbGxPclJvd1xuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQnV0dG9uKCd0YWJsZWRlbGV0ZXJvdycsIHtcbiAgICAgICAgdG9vbHRpcDogJ0RlbGV0ZSByb3cnLFxuICAgICAgICBvbkFjdGlvbjogY21kKCdtY2VUYWJsZURlbGV0ZVJvdycpLFxuICAgICAgICBpY29uOiAndGFibGUtZGVsZXRlLXJvdycsXG4gICAgICAgIG9uU2V0dXA6IHNlbGVjdGlvblRhcmdldHMub25TZXR1cENlbGxPclJvd1xuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQnV0dG9uKCd0YWJsZXJvd3Byb3BzJywge1xuICAgICAgICB0b29sdGlwOiAnUm93IHByb3BlcnRpZXMnLFxuICAgICAgICBvbkFjdGlvbjogY21kKCdtY2VUYWJsZVJvd1Byb3BzJyksXG4gICAgICAgIGljb246ICd0YWJsZS1yb3ctcHJvcGVydGllcycsXG4gICAgICAgIG9uU2V0dXA6IHNlbGVjdGlvblRhcmdldHMub25TZXR1cENlbGxPclJvd1xuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQnV0dG9uKCd0YWJsZWluc2VydGNvbGJlZm9yZScsIHtcbiAgICAgICAgdG9vbHRpcDogJ0luc2VydCBjb2x1bW4gYmVmb3JlJyxcbiAgICAgICAgb25BY3Rpb246IGNtZCgnbWNlVGFibGVJbnNlcnRDb2xCZWZvcmUnKSxcbiAgICAgICAgaWNvbjogJ3RhYmxlLWluc2VydC1jb2x1bW4tYmVmb3JlJyxcbiAgICAgICAgb25TZXR1cDogc2VsZWN0aW9uVGFyZ2V0cy5vblNldHVwQ2VsbE9yUm93XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRCdXR0b24oJ3RhYmxlaW5zZXJ0Y29sYWZ0ZXInLCB7XG4gICAgICAgIHRvb2x0aXA6ICdJbnNlcnQgY29sdW1uIGFmdGVyJyxcbiAgICAgICAgb25BY3Rpb246IGNtZCgnbWNlVGFibGVJbnNlcnRDb2xBZnRlcicpLFxuICAgICAgICBpY29uOiAndGFibGUtaW5zZXJ0LWNvbHVtbi1hZnRlcicsXG4gICAgICAgIG9uU2V0dXA6IHNlbGVjdGlvblRhcmdldHMub25TZXR1cENlbGxPclJvd1xuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQnV0dG9uKCd0YWJsZWRlbGV0ZWNvbCcsIHtcbiAgICAgICAgdG9vbHRpcDogJ0RlbGV0ZSBjb2x1bW4nLFxuICAgICAgICBvbkFjdGlvbjogY21kKCdtY2VUYWJsZURlbGV0ZUNvbCcpLFxuICAgICAgICBpY29uOiAndGFibGUtZGVsZXRlLWNvbHVtbicsXG4gICAgICAgIG9uU2V0dXA6IHNlbGVjdGlvblRhcmdldHMub25TZXR1cENlbGxPclJvd1xuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQnV0dG9uKCd0YWJsZWN1dHJvdycsIHtcbiAgICAgICAgdG9vbHRpcDogJ0N1dCByb3cnLFxuICAgICAgICBpY29uOiAnY3V0LXJvdycsXG4gICAgICAgIG9uQWN0aW9uOiBjbWQoJ21jZVRhYmxlQ3V0Um93JyksXG4gICAgICAgIG9uU2V0dXA6IHNlbGVjdGlvblRhcmdldHMub25TZXR1cENlbGxPclJvd1xuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQnV0dG9uKCd0YWJsZWNvcHlyb3cnLCB7XG4gICAgICAgIHRvb2x0aXA6ICdDb3B5IHJvdycsXG4gICAgICAgIGljb246ICdkdXBsaWNhdGUtcm93JyxcbiAgICAgICAgb25BY3Rpb246IGNtZCgnbWNlVGFibGVDb3B5Um93JyksXG4gICAgICAgIG9uU2V0dXA6IHNlbGVjdGlvblRhcmdldHMub25TZXR1cENlbGxPclJvd1xuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQnV0dG9uKCd0YWJsZXBhc3Rlcm93YmVmb3JlJywge1xuICAgICAgICB0b29sdGlwOiAnUGFzdGUgcm93IGJlZm9yZScsXG4gICAgICAgIGljb246ICdwYXN0ZS1yb3ctYmVmb3JlJyxcbiAgICAgICAgb25BY3Rpb246IGNtZCgnbWNlVGFibGVQYXN0ZVJvd0JlZm9yZScpLFxuICAgICAgICBvblNldHVwOiBzZWxlY3Rpb25UYXJnZXRzLm9uU2V0dXBQYXN0ZWFibGUoY2xpcGJvYXJkLmdldFJvd3MpXG4gICAgICB9KTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRCdXR0b24oJ3RhYmxlcGFzdGVyb3dhZnRlcicsIHtcbiAgICAgICAgdG9vbHRpcDogJ1Bhc3RlIHJvdyBhZnRlcicsXG4gICAgICAgIGljb246ICdwYXN0ZS1yb3ctYWZ0ZXInLFxuICAgICAgICBvbkFjdGlvbjogY21kKCdtY2VUYWJsZVBhc3RlUm93QWZ0ZXInKSxcbiAgICAgICAgb25TZXR1cDogc2VsZWN0aW9uVGFyZ2V0cy5vblNldHVwUGFzdGVhYmxlKGNsaXBib2FyZC5nZXRSb3dzKVxuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQnV0dG9uKCd0YWJsZWN1dGNvbCcsIHtcbiAgICAgICAgdG9vbHRpcDogJ0N1dCBjb2x1bW4nLFxuICAgICAgICBpY29uOiAnY3V0LWNvbHVtbicsXG4gICAgICAgIG9uQWN0aW9uOiBjbWQoJ21jZVRhYmxlQ3V0Q29sJyksXG4gICAgICAgIG9uU2V0dXA6IHNlbGVjdGlvblRhcmdldHMub25TZXR1cENlbGxPclJvd1xuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQnV0dG9uKCd0YWJsZWNvcHljb2wnLCB7XG4gICAgICAgIHRvb2x0aXA6ICdDb3B5IGNvbHVtbicsXG4gICAgICAgIGljb246ICdkdXBsaWNhdGUtY29sdW1uJyxcbiAgICAgICAgb25BY3Rpb246IGNtZCgnbWNlVGFibGVDb3B5Q29sJyksXG4gICAgICAgIG9uU2V0dXA6IHNlbGVjdGlvblRhcmdldHMub25TZXR1cENlbGxPclJvd1xuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQnV0dG9uKCd0YWJsZXBhc3RlY29sYmVmb3JlJywge1xuICAgICAgICB0b29sdGlwOiAnUGFzdGUgY29sdW1uIGJlZm9yZScsXG4gICAgICAgIGljb246ICdwYXN0ZS1jb2x1bW4tYmVmb3JlJyxcbiAgICAgICAgb25BY3Rpb246IGNtZCgnbWNlVGFibGVQYXN0ZUNvbEJlZm9yZScpLFxuICAgICAgICBvblNldHVwOiBzZWxlY3Rpb25UYXJnZXRzLm9uU2V0dXBQYXN0ZWFibGUoY2xpcGJvYXJkLmdldENvbHVtbnMpXG4gICAgICB9KTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRCdXR0b24oJ3RhYmxlcGFzdGVjb2xhZnRlcicsIHtcbiAgICAgICAgdG9vbHRpcDogJ1Bhc3RlIGNvbHVtbiBhZnRlcicsXG4gICAgICAgIGljb246ICdwYXN0ZS1jb2x1bW4tYWZ0ZXInLFxuICAgICAgICBvbkFjdGlvbjogY21kKCdtY2VUYWJsZVBhc3RlQ29sQWZ0ZXInKSxcbiAgICAgICAgb25TZXR1cDogc2VsZWN0aW9uVGFyZ2V0cy5vblNldHVwUGFzdGVhYmxlKGNsaXBib2FyZC5nZXRDb2x1bW5zKVxuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQnV0dG9uKCd0YWJsZWluc2VydGRpYWxvZycsIHtcbiAgICAgICAgdG9vbHRpcDogJ0luc2VydCB0YWJsZScsXG4gICAgICAgIG9uQWN0aW9uOiBjbWQoJ21jZUluc2VydFRhYmxlJyksXG4gICAgICAgIGljb246ICd0YWJsZSdcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGFkZFRvb2xiYXJzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGlzVGFibGUgPSBmdW5jdGlvbiAodGFibGUpIHtcbiAgICAgICAgcmV0dXJuIGVkaXRvci5kb20uaXModGFibGUsICd0YWJsZScpICYmIGVkaXRvci5nZXRCb2R5KCkuY29udGFpbnModGFibGUpO1xuICAgICAgfTtcbiAgICAgIHZhciB0b29sYmFyID0gZ2V0VG9vbGJhcihlZGl0b3IpO1xuICAgICAgaWYgKHRvb2xiYXIubGVuZ3RoID4gMCkge1xuICAgICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQ29udGV4dFRvb2xiYXIoJ3RhYmxlJywge1xuICAgICAgICAgIHByZWRpY2F0ZTogaXNUYWJsZSxcbiAgICAgICAgICBpdGVtczogdG9vbGJhcixcbiAgICAgICAgICBzY29wZTogJ25vZGUnLFxuICAgICAgICAgIHBvc2l0aW9uOiAnbm9kZSdcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBhZGRNZW51SXRlbXMgPSBmdW5jdGlvbiAoZWRpdG9yLCBzZWxlY3Rpb25UYXJnZXRzLCBjbGlwYm9hcmQpIHtcbiAgICAgIHZhciBjbWQgPSBmdW5jdGlvbiAoY29tbWFuZCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBlZGl0b3IuZXhlY0NvbW1hbmQoY29tbWFuZCk7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgICAgdmFyIGluc2VydFRhYmxlQWN0aW9uID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBudW1Sb3dzID0gX2EubnVtUm93cywgbnVtQ29sdW1ucyA9IF9hLm51bUNvbHVtbnM7XG4gICAgICAgIGVkaXRvci51bmRvTWFuYWdlci50cmFuc2FjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaW5zZXJ0KGVkaXRvciwgbnVtQ29sdW1ucywgbnVtUm93cywgMCwgMCk7XG4gICAgICAgIH0pO1xuICAgICAgICBlZGl0b3IuYWRkVmlzdWFsKCk7XG4gICAgICB9O1xuICAgICAgdmFyIHRhYmxlUHJvcGVydGllcyA9IHtcbiAgICAgICAgdGV4dDogJ1RhYmxlIHByb3BlcnRpZXMnLFxuICAgICAgICBvblNldHVwOiBzZWxlY3Rpb25UYXJnZXRzLm9uU2V0dXBUYWJsZSxcbiAgICAgICAgb25BY3Rpb246IGNtZCgnbWNlVGFibGVQcm9wcycpXG4gICAgICB9O1xuICAgICAgdmFyIGRlbGV0ZVRhYmxlID0ge1xuICAgICAgICB0ZXh0OiAnRGVsZXRlIHRhYmxlJyxcbiAgICAgICAgaWNvbjogJ3RhYmxlLWRlbGV0ZS10YWJsZScsXG4gICAgICAgIG9uU2V0dXA6IHNlbGVjdGlvblRhcmdldHMub25TZXR1cFRhYmxlLFxuICAgICAgICBvbkFjdGlvbjogY21kKCdtY2VUYWJsZURlbGV0ZScpXG4gICAgICB9O1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZE1lbnVJdGVtKCd0YWJsZWluc2VydHJvd2JlZm9yZScsIHtcbiAgICAgICAgdGV4dDogJ0luc2VydCByb3cgYmVmb3JlJyxcbiAgICAgICAgaWNvbjogJ3RhYmxlLWluc2VydC1yb3ctYWJvdmUnLFxuICAgICAgICBvbkFjdGlvbjogY21kKCdtY2VUYWJsZUluc2VydFJvd0JlZm9yZScpLFxuICAgICAgICBvblNldHVwOiBzZWxlY3Rpb25UYXJnZXRzLm9uU2V0dXBDZWxsT3JSb3dcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZE1lbnVJdGVtKCd0YWJsZWluc2VydHJvd2FmdGVyJywge1xuICAgICAgICB0ZXh0OiAnSW5zZXJ0IHJvdyBhZnRlcicsXG4gICAgICAgIGljb246ICd0YWJsZS1pbnNlcnQtcm93LWFmdGVyJyxcbiAgICAgICAgb25BY3Rpb246IGNtZCgnbWNlVGFibGVJbnNlcnRSb3dBZnRlcicpLFxuICAgICAgICBvblNldHVwOiBzZWxlY3Rpb25UYXJnZXRzLm9uU2V0dXBDZWxsT3JSb3dcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZE1lbnVJdGVtKCd0YWJsZWRlbGV0ZXJvdycsIHtcbiAgICAgICAgdGV4dDogJ0RlbGV0ZSByb3cnLFxuICAgICAgICBpY29uOiAndGFibGUtZGVsZXRlLXJvdycsXG4gICAgICAgIG9uQWN0aW9uOiBjbWQoJ21jZVRhYmxlRGVsZXRlUm93JyksXG4gICAgICAgIG9uU2V0dXA6IHNlbGVjdGlvblRhcmdldHMub25TZXR1cENlbGxPclJvd1xuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkTWVudUl0ZW0oJ3RhYmxlcm93cHJvcHMnLCB7XG4gICAgICAgIHRleHQ6ICdSb3cgcHJvcGVydGllcycsXG4gICAgICAgIGljb246ICd0YWJsZS1yb3ctcHJvcGVydGllcycsXG4gICAgICAgIG9uQWN0aW9uOiBjbWQoJ21jZVRhYmxlUm93UHJvcHMnKSxcbiAgICAgICAgb25TZXR1cDogc2VsZWN0aW9uVGFyZ2V0cy5vblNldHVwQ2VsbE9yUm93XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRNZW51SXRlbSgndGFibGVjdXRyb3cnLCB7XG4gICAgICAgIHRleHQ6ICdDdXQgcm93JyxcbiAgICAgICAgaWNvbjogJ2N1dC1yb3cnLFxuICAgICAgICBvbkFjdGlvbjogY21kKCdtY2VUYWJsZUN1dFJvdycpLFxuICAgICAgICBvblNldHVwOiBzZWxlY3Rpb25UYXJnZXRzLm9uU2V0dXBDZWxsT3JSb3dcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZE1lbnVJdGVtKCd0YWJsZWNvcHlyb3cnLCB7XG4gICAgICAgIHRleHQ6ICdDb3B5IHJvdycsXG4gICAgICAgIGljb246ICdkdXBsaWNhdGUtcm93JyxcbiAgICAgICAgb25BY3Rpb246IGNtZCgnbWNlVGFibGVDb3B5Um93JyksXG4gICAgICAgIG9uU2V0dXA6IHNlbGVjdGlvblRhcmdldHMub25TZXR1cENlbGxPclJvd1xuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkTWVudUl0ZW0oJ3RhYmxlcGFzdGVyb3diZWZvcmUnLCB7XG4gICAgICAgIHRleHQ6ICdQYXN0ZSByb3cgYmVmb3JlJyxcbiAgICAgICAgaWNvbjogJ3Bhc3RlLXJvdy1iZWZvcmUnLFxuICAgICAgICBvbkFjdGlvbjogY21kKCdtY2VUYWJsZVBhc3RlUm93QmVmb3JlJyksXG4gICAgICAgIG9uU2V0dXA6IHNlbGVjdGlvblRhcmdldHMub25TZXR1cFBhc3RlYWJsZShjbGlwYm9hcmQuZ2V0Um93cylcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZE1lbnVJdGVtKCd0YWJsZXBhc3Rlcm93YWZ0ZXInLCB7XG4gICAgICAgIHRleHQ6ICdQYXN0ZSByb3cgYWZ0ZXInLFxuICAgICAgICBpY29uOiAncGFzdGUtcm93LWFmdGVyJyxcbiAgICAgICAgb25BY3Rpb246IGNtZCgnbWNlVGFibGVQYXN0ZVJvd0FmdGVyJyksXG4gICAgICAgIG9uU2V0dXA6IHNlbGVjdGlvblRhcmdldHMub25TZXR1cFBhc3RlYWJsZShjbGlwYm9hcmQuZ2V0Um93cylcbiAgICAgIH0pO1xuICAgICAgdmFyIHJvdyA9IHtcbiAgICAgICAgdHlwZTogJ25lc3RlZG1lbnVpdGVtJyxcbiAgICAgICAgdGV4dDogJ1JvdycsXG4gICAgICAgIGdldFN1Ym1lbnVJdGVtczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiAndGFibGVpbnNlcnRyb3diZWZvcmUgdGFibGVpbnNlcnRyb3dhZnRlciB0YWJsZWRlbGV0ZXJvdyB0YWJsZXJvd3Byb3BzIHwgdGFibGVjdXRyb3cgdGFibGVjb3B5cm93IHRhYmxlcGFzdGVyb3diZWZvcmUgdGFibGVwYXN0ZXJvd2FmdGVyJztcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRNZW51SXRlbSgndGFibGVpbnNlcnRjb2x1bW5iZWZvcmUnLCB7XG4gICAgICAgIHRleHQ6ICdJbnNlcnQgY29sdW1uIGJlZm9yZScsXG4gICAgICAgIGljb246ICd0YWJsZS1pbnNlcnQtY29sdW1uLWJlZm9yZScsXG4gICAgICAgIG9uQWN0aW9uOiBjbWQoJ21jZVRhYmxlSW5zZXJ0Q29sQmVmb3JlJyksXG4gICAgICAgIG9uU2V0dXA6IHNlbGVjdGlvblRhcmdldHMub25TZXR1cENlbGxPclJvd1xuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkTWVudUl0ZW0oJ3RhYmxlaW5zZXJ0Y29sdW1uYWZ0ZXInLCB7XG4gICAgICAgIHRleHQ6ICdJbnNlcnQgY29sdW1uIGFmdGVyJyxcbiAgICAgICAgaWNvbjogJ3RhYmxlLWluc2VydC1jb2x1bW4tYWZ0ZXInLFxuICAgICAgICBvbkFjdGlvbjogY21kKCdtY2VUYWJsZUluc2VydENvbEFmdGVyJyksXG4gICAgICAgIG9uU2V0dXA6IHNlbGVjdGlvblRhcmdldHMub25TZXR1cENlbGxPclJvd1xuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkTWVudUl0ZW0oJ3RhYmxlZGVsZXRlY29sdW1uJywge1xuICAgICAgICB0ZXh0OiAnRGVsZXRlIGNvbHVtbicsXG4gICAgICAgIGljb246ICd0YWJsZS1kZWxldGUtY29sdW1uJyxcbiAgICAgICAgb25BY3Rpb246IGNtZCgnbWNlVGFibGVEZWxldGVDb2wnKSxcbiAgICAgICAgb25TZXR1cDogc2VsZWN0aW9uVGFyZ2V0cy5vblNldHVwQ2VsbE9yUm93XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRNZW51SXRlbSgndGFibGVjdXRjb2x1bW4nLCB7XG4gICAgICAgIHRleHQ6ICdDdXQgY29sdW1uJyxcbiAgICAgICAgaWNvbjogJ2N1dC1jb2x1bW4nLFxuICAgICAgICBvbkFjdGlvbjogY21kKCdtY2VUYWJsZUN1dENvbCcpLFxuICAgICAgICBvblNldHVwOiBzZWxlY3Rpb25UYXJnZXRzLm9uU2V0dXBDZWxsT3JSb3dcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZE1lbnVJdGVtKCd0YWJsZWNvcHljb2x1bW4nLCB7XG4gICAgICAgIHRleHQ6ICdDb3B5IGNvbHVtbicsXG4gICAgICAgIGljb246ICdkdXBsaWNhdGUtY29sdW1uJyxcbiAgICAgICAgb25BY3Rpb246IGNtZCgnbWNlVGFibGVDb3B5Q29sJyksXG4gICAgICAgIG9uU2V0dXA6IHNlbGVjdGlvblRhcmdldHMub25TZXR1cENlbGxPclJvd1xuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkTWVudUl0ZW0oJ3RhYmxlcGFzdGVjb2x1bW5iZWZvcmUnLCB7XG4gICAgICAgIHRleHQ6ICdQYXN0ZSBjb2x1bW4gYmVmb3JlJyxcbiAgICAgICAgaWNvbjogJ3Bhc3RlLWNvbHVtbi1iZWZvcmUnLFxuICAgICAgICBvbkFjdGlvbjogY21kKCdtY2VUYWJsZVBhc3RlQ29sQmVmb3JlJyksXG4gICAgICAgIG9uU2V0dXA6IHNlbGVjdGlvblRhcmdldHMub25TZXR1cFBhc3RlYWJsZShjbGlwYm9hcmQuZ2V0Q29sdW1ucylcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZE1lbnVJdGVtKCd0YWJsZXBhc3RlY29sdW1uYWZ0ZXInLCB7XG4gICAgICAgIHRleHQ6ICdQYXN0ZSBjb2x1bW4gYWZ0ZXInLFxuICAgICAgICBpY29uOiAncGFzdGUtY29sdW1uLWFmdGVyJyxcbiAgICAgICAgb25BY3Rpb246IGNtZCgnbWNlVGFibGVQYXN0ZUNvbEFmdGVyJyksXG4gICAgICAgIG9uU2V0dXA6IHNlbGVjdGlvblRhcmdldHMub25TZXR1cFBhc3RlYWJsZShjbGlwYm9hcmQuZ2V0Q29sdW1ucylcbiAgICAgIH0pO1xuICAgICAgdmFyIGNvbHVtbiA9IHtcbiAgICAgICAgdHlwZTogJ25lc3RlZG1lbnVpdGVtJyxcbiAgICAgICAgdGV4dDogJ0NvbHVtbicsXG4gICAgICAgIGdldFN1Ym1lbnVJdGVtczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiAndGFibGVpbnNlcnRjb2x1bW5iZWZvcmUgdGFibGVpbnNlcnRjb2x1bW5hZnRlciB0YWJsZWRlbGV0ZWNvbHVtbic7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkTWVudUl0ZW0oJ3RhYmxlY2VsbHByb3BzJywge1xuICAgICAgICB0ZXh0OiAnQ2VsbCBwcm9wZXJ0aWVzJyxcbiAgICAgICAgaWNvbjogJ3RhYmxlLWNlbGwtcHJvcGVydGllcycsXG4gICAgICAgIG9uQWN0aW9uOiBjbWQoJ21jZVRhYmxlQ2VsbFByb3BzJyksXG4gICAgICAgIG9uU2V0dXA6IHNlbGVjdGlvblRhcmdldHMub25TZXR1cENlbGxPclJvd1xuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkTWVudUl0ZW0oJ3RhYmxlbWVyZ2VjZWxscycsIHtcbiAgICAgICAgdGV4dDogJ01lcmdlIGNlbGxzJyxcbiAgICAgICAgaWNvbjogJ3RhYmxlLW1lcmdlLWNlbGxzJyxcbiAgICAgICAgb25BY3Rpb246IGNtZCgnbWNlVGFibGVNZXJnZUNlbGxzJyksXG4gICAgICAgIG9uU2V0dXA6IHNlbGVjdGlvblRhcmdldHMub25TZXR1cE1lcmdlYWJsZVxuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkTWVudUl0ZW0oJ3RhYmxlc3BsaXRjZWxscycsIHtcbiAgICAgICAgdGV4dDogJ1NwbGl0IGNlbGwnLFxuICAgICAgICBpY29uOiAndGFibGUtc3BsaXQtY2VsbHMnLFxuICAgICAgICBvbkFjdGlvbjogY21kKCdtY2VUYWJsZVNwbGl0Q2VsbHMnKSxcbiAgICAgICAgb25TZXR1cDogc2VsZWN0aW9uVGFyZ2V0cy5vblNldHVwVW5tZXJnZWFibGVcbiAgICAgIH0pO1xuICAgICAgdmFyIGNlbGwgPSB7XG4gICAgICAgIHR5cGU6ICduZXN0ZWRtZW51aXRlbScsXG4gICAgICAgIHRleHQ6ICdDZWxsJyxcbiAgICAgICAgZ2V0U3VibWVudUl0ZW1zOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuICd0YWJsZWNlbGxwcm9wcyB0YWJsZW1lcmdlY2VsbHMgdGFibGVzcGxpdGNlbGxzJztcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGlmIChoYXNUYWJsZUdyaWQoZWRpdG9yKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZE1lbnVJdGVtKCdpbnNlcnR0YWJsZScsIHtcbiAgICAgICAgICB0ZXh0OiAnVGFibGUnLFxuICAgICAgICAgIGljb246ICd0YWJsZScsXG4gICAgICAgICAgb25BY3Rpb246IGNtZCgnbWNlSW5zZXJ0VGFibGUnKVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGROZXN0ZWRNZW51SXRlbSgnaW5zZXJ0dGFibGUnLCB7XG4gICAgICAgICAgdGV4dDogJ1RhYmxlJyxcbiAgICAgICAgICBpY29uOiAndGFibGUnLFxuICAgICAgICAgIGdldFN1Ym1lbnVJdGVtczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIFt7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2ZhbmN5bWVudWl0ZW0nLFxuICAgICAgICAgICAgICAgIGZhbmN5dHlwZTogJ2luc2VydHRhYmxlJyxcbiAgICAgICAgICAgICAgICBvbkFjdGlvbjogaW5zZXJ0VGFibGVBY3Rpb25cbiAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRNZW51SXRlbSgnaW5zZXJ0dGFibGVkaWFsb2cnLCB7XG4gICAgICAgIHRleHQ6ICdJbnNlcnQgdGFibGUnLFxuICAgICAgICBpY29uOiAndGFibGUnLFxuICAgICAgICBvbkFjdGlvbjogY21kKCdtY2VJbnNlcnRUYWJsZScpXG4gICAgICB9KTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRNZW51SXRlbSgndGFibGVwcm9wcycsIHRhYmxlUHJvcGVydGllcyk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkTWVudUl0ZW0oJ2RlbGV0ZXRhYmxlJywgZGVsZXRlVGFibGUpO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZE5lc3RlZE1lbnVJdGVtKCdyb3cnLCByb3cpO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZE5lc3RlZE1lbnVJdGVtKCdjb2x1bW4nLCBjb2x1bW4pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZE5lc3RlZE1lbnVJdGVtKCdjZWxsJywgY2VsbCk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQ29udGV4dE1lbnUoJ3RhYmxlJywge1xuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZWxlY3Rpb25UYXJnZXRzLnJlc2V0VGFyZ2V0cygpO1xuICAgICAgICAgIHJldHVybiBzZWxlY3Rpb25UYXJnZXRzLnRhcmdldHMoKS5mb2xkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICB9LCBmdW5jdGlvbiAodGFyZ2V0cykge1xuICAgICAgICAgICAgaWYgKG5hbWUodGFyZ2V0cy5lbGVtZW50KCkpID09PSAnY2FwdGlvbicpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICd0YWJsZXByb3BzIGRlbGV0ZXRhYmxlJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiAnY2VsbCByb3cgY29sdW1uIHwgYWR2dGFibGVzb3J0IHwgdGFibGVwcm9wcyBkZWxldGV0YWJsZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgY2VsbEZvcm1hdHMgPSB7XG4gICAgICB0YWJsZWNlbGxiYWNrZ3JvdW5kY29sb3I6IHtcbiAgICAgICAgc2VsZWN0b3I6ICd0ZCx0aCcsXG4gICAgICAgIHN0eWxlczogeyBiYWNrZ3JvdW5kQ29sb3I6ICcldmFsdWUnIH0sXG4gICAgICAgIHJlbW92ZV9zaW1pbGFyOiB0cnVlXG4gICAgICB9LFxuICAgICAgdGFibGVjZWxsYm9yZGVyY29sb3I6IHtcbiAgICAgICAgc2VsZWN0b3I6ICd0ZCx0aCcsXG4gICAgICAgIHN0eWxlczogeyBib3JkZXJDb2xvcjogJyV2YWx1ZScgfSxcbiAgICAgICAgcmVtb3ZlX3NpbWlsYXI6IHRydWVcbiAgICAgIH0sXG4gICAgICB0YWJsZWNlbGxib3JkZXJzdHlsZToge1xuICAgICAgICBzZWxlY3RvcjogJ3RkLHRoJyxcbiAgICAgICAgc3R5bGVzOiB7IGJvcmRlclN0eWxlOiAnJXZhbHVlJyB9LFxuICAgICAgICByZW1vdmVfc2ltaWxhcjogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHRhYmxlY2VsbGJvcmRlcndpZHRoOiB7XG4gICAgICAgIHNlbGVjdG9yOiAndGQsdGgnLFxuICAgICAgICBzdHlsZXM6IHsgYm9yZGVyV2lkdGg6ICcldmFsdWUnIH0sXG4gICAgICAgIHJlbW92ZV9zaW1pbGFyOiB0cnVlXG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgcmVnaXN0ZXJGb3JtYXRzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgZWRpdG9yLmZvcm1hdHRlci5yZWdpc3RlcihjZWxsRm9ybWF0cyk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFBsdWdpbihlZGl0b3IpIHtcbiAgICAgIHZhciBzZWxlY3Rpb25zID0gU2VsZWN0aW9ucyhlZGl0b3IpO1xuICAgICAgdmFyIHNlbGVjdGlvblRhcmdldHMgPSBnZXRTZWxlY3Rpb25UYXJnZXRzKGVkaXRvciwgc2VsZWN0aW9ucyk7XG4gICAgICB2YXIgcmVzaXplSGFuZGxlciA9IGdldFJlc2l6ZUhhbmRsZXIoZWRpdG9yKTtcbiAgICAgIHZhciBjZWxsU2VsZWN0aW9uID0gQ2VsbFNlbGVjdGlvbihlZGl0b3IsIHJlc2l6ZUhhbmRsZXIubGF6eVJlc2l6ZSwgc2VsZWN0aW9uVGFyZ2V0cyk7XG4gICAgICB2YXIgYWN0aW9ucyA9IFRhYmxlQWN0aW9ucyhlZGl0b3IsIHJlc2l6ZUhhbmRsZXIubGF6eVdpcmUpO1xuICAgICAgdmFyIGNsaXBib2FyZCA9IENsaXBib2FyZCgpO1xuICAgICAgcmVnaXN0ZXJDb21tYW5kcyhlZGl0b3IsIGFjdGlvbnMsIGNlbGxTZWxlY3Rpb24sIHNlbGVjdGlvbnMsIGNsaXBib2FyZCk7XG4gICAgICByZWdpc3RlclF1ZXJ5Q29tbWFuZHMoZWRpdG9yLCBhY3Rpb25zLCBzZWxlY3Rpb25zKTtcbiAgICAgIHJlZ2lzdGVyRXZlbnRzKGVkaXRvciwgc2VsZWN0aW9ucywgYWN0aW9ucywgY2VsbFNlbGVjdGlvbik7XG4gICAgICBhZGRNZW51SXRlbXMoZWRpdG9yLCBzZWxlY3Rpb25UYXJnZXRzLCBjbGlwYm9hcmQpO1xuICAgICAgYWRkQnV0dG9ucyhlZGl0b3IsIHNlbGVjdGlvblRhcmdldHMsIGNsaXBib2FyZCk7XG4gICAgICBhZGRUb29sYmFycyhlZGl0b3IpO1xuICAgICAgZWRpdG9yLm9uKCdQcmVJbml0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBlZGl0b3Iuc2VyaWFsaXplci5hZGRUZW1wQXR0cihmaXJzdFNlbGVjdGVkKTtcbiAgICAgICAgZWRpdG9yLnNlcmlhbGl6ZXIuYWRkVGVtcEF0dHIobGFzdFNlbGVjdGVkKTtcbiAgICAgICAgcmVnaXN0ZXJGb3JtYXRzKGVkaXRvcik7XG4gICAgICB9KTtcbiAgICAgIGlmIChoYXNUYWJOYXZpZ2F0aW9uKGVkaXRvcikpIHtcbiAgICAgICAgZWRpdG9yLm9uKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBoYW5kbGUkMShlLCBlZGl0b3IsIGFjdGlvbnMsIHJlc2l6ZUhhbmRsZXIubGF6eVdpcmUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGVkaXRvci5vbigncmVtb3ZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXNpemVIYW5kbGVyLmRlc3Ryb3koKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGdldEFwaShlZGl0b3IsIGNsaXBib2FyZCwgcmVzaXplSGFuZGxlciwgc2VsZWN0aW9uVGFyZ2V0cyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIFBsdWdpbiQxICgpIHtcbiAgICAgIGdsb2JhbC5hZGQoJ3RhYmxlJywgUGx1Z2luKTtcbiAgICB9XG5cbiAgICBQbHVnaW4kMSgpO1xuXG59KHdpbmRvdykpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==