(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~tinymce-plugin-lists~tinymce-plugin-lists-plugin"],{

/***/ "./node_modules/tinymce/plugins/lists/plugin.js":
/*!******************************************************!*\
  !*** ./node_modules/tinymce/plugins/lists/plugin.js ***!
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
    var constant = function (value) {
      return function () {
        return value;
      };
    };
    var not = function (f) {
      return function (t) {
        return !f(t);
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
    var isArray = isType('array');
    var isBoolean = isSimpleType('boolean');
    var isFunction = isSimpleType('function');
    var isNumber = isSimpleType('number');

    var nativeSlice = Array.prototype.slice;
    var nativePush = Array.prototype.push;
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
    var groupBy = function (xs, f) {
      if (xs.length === 0) {
        return [];
      } else {
        var wasType = f(xs[0]);
        var r = [];
        var group = [];
        for (var i = 0, len = xs.length; i < len; i++) {
          var x = xs[i];
          var type = f(x);
          if (type !== wasType) {
            r.push(group);
            group = [];
          }
          wasType = type;
          group.push(x);
        }
        if (group.length !== 0) {
          r.push(group);
        }
        return r;
      }
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

    var contains = function (str, substr) {
      return str.indexOf(substr) !== -1;
    };

    var normalVersionRegex = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/;
    var checkContains = function (target) {
      return function (uastring) {
        return contains(uastring, target);
      };
    };
    var browsers = [
      {
        name: 'Edge',
        versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
        search: function (uastring) {
          return contains(uastring, 'edge/') && contains(uastring, 'chrome') && contains(uastring, 'safari') && contains(uastring, 'applewebkit');
        }
      },
      {
        name: 'Chrome',
        versionRegexes: [
          /.*?chrome\/([0-9]+)\.([0-9]+).*/,
          normalVersionRegex
        ],
        search: function (uastring) {
          return contains(uastring, 'chrome') && !contains(uastring, 'chromeframe');
        }
      },
      {
        name: 'IE',
        versionRegexes: [
          /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
          /.*?rv:([0-9]+)\.([0-9]+).*/
        ],
        search: function (uastring) {
          return contains(uastring, 'msie') || contains(uastring, 'trident');
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
          return (contains(uastring, 'safari') || contains(uastring, 'mobile/')) && contains(uastring, 'applewebkit');
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
          return contains(uastring, 'iphone') || contains(uastring, 'ipad');
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

    var ELEMENT = 1;

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
    var contains$1 = function (e1, e2) {
      return detect$3().browser.isIE() ? ieContains(e1, e2) : regularContains(e1, e2);
    };
    var is$1 = is;

    var global$1 = tinymce.util.Tools.resolve('tinymce.dom.RangeUtils');

    var global$2 = tinymce.util.Tools.resolve('tinymce.dom.TreeWalker');

    var global$3 = tinymce.util.Tools.resolve('tinymce.util.VK');

    var lift2 = function (oa, ob, f) {
      return oa.isSome() && ob.isSome() ? Option.some(f(oa.getOrDie(), ob.getOrDie())) : Option.none();
    };

    var fromElements = function (elements, scope) {
      var doc = scope || domGlobals.document;
      var fragment = doc.createDocumentFragment();
      each(elements, function (element) {
        fragment.appendChild(element.dom());
      });
      return Element.fromDom(fragment);
    };

    var Global = typeof domGlobals.window !== 'undefined' ? domGlobals.window : Function('return this;')();

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
    var isElement = isType$1(ELEMENT);

    var parent = function (element) {
      return Option.from(element.dom().parentNode).map(Element.fromDom);
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
    var lastChild = function (element) {
      return child(element, element.dom().childNodes.length - 1);
    };

    var before = function (marker, element) {
      var parent$1 = parent(marker);
      parent$1.each(function (v) {
        v.dom().insertBefore(element.dom(), marker.dom());
      });
    };
    var append = function (parent, element) {
      parent.dom().appendChild(element.dom());
    };

    var before$1 = function (marker, elements) {
      each(elements, function (x) {
        before(marker, x);
      });
    };
    var append$1 = function (parent, elements) {
      each(elements, function (x) {
        append(parent, x);
      });
    };

    var remove = function (element) {
      var dom = element.dom();
      if (dom.parentNode !== null) {
        dom.parentNode.removeChild(dom);
      }
    };

    var fireListEvent = function (editor, action, element) {
      return editor.fire('ListMutation', {
        action: action,
        element: element
      });
    };

    var global$4 = tinymce.util.Tools.resolve('tinymce.dom.DomQuery');

    var global$5 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var matchNodeName = function (name) {
      return function (node) {
        return node && node.nodeName.toLowerCase() === name;
      };
    };
    var matchNodeNames = function (regex) {
      return function (node) {
        return node && regex.test(node.nodeName);
      };
    };
    var isTextNode = function (node) {
      return node && node.nodeType === 3;
    };
    var isListNode = matchNodeNames(/^(OL|UL|DL)$/);
    var isOlUlNode = matchNodeNames(/^(OL|UL)$/);
    var isOlNode = matchNodeName('ol');
    var isListItemNode = matchNodeNames(/^(LI|DT|DD)$/);
    var isDlItemNode = matchNodeNames(/^(DT|DD)$/);
    var isTableCellNode = matchNodeNames(/^(TH|TD)$/);
    var isBr = matchNodeName('br');
    var isFirstChild = function (node) {
      return node.parentNode.firstChild === node;
    };
    var isTextBlock = function (editor, node) {
      return node && !!editor.schema.getTextBlockElements()[node.nodeName];
    };
    var isBlock = function (node, blockElements) {
      return node && node.nodeName in blockElements;
    };
    var isBogusBr = function (dom, node) {
      if (!isBr(node)) {
        return false;
      }
      if (dom.isBlock(node.nextSibling) && !isBr(node.previousSibling)) {
        return true;
      }
      return false;
    };
    var isEmpty = function (dom, elm, keepBookmarks) {
      var empty = dom.isEmpty(elm);
      if (keepBookmarks && dom.select('span[data-mce-type=bookmark]', elm).length > 0) {
        return false;
      }
      return empty;
    };
    var isChildOfBody = function (dom, elm) {
      return dom.isChildOf(elm, dom.getRoot());
    };

    var getParentList = function (editor, node) {
      var selectionStart = node || editor.selection.getStart(true);
      return editor.dom.getParent(selectionStart, 'OL,UL,DL', getClosestListRootElm(editor, selectionStart));
    };
    var isParentListSelected = function (parentList, selectedBlocks) {
      return parentList && selectedBlocks.length === 1 && selectedBlocks[0] === parentList;
    };
    var findSubLists = function (parentList) {
      return global$5.grep(parentList.querySelectorAll('ol,ul,dl'), function (elm) {
        return isListNode(elm);
      });
    };
    var getSelectedSubLists = function (editor) {
      var parentList = getParentList(editor);
      var selectedBlocks = editor.selection.getSelectedBlocks();
      if (isParentListSelected(parentList, selectedBlocks)) {
        return findSubLists(parentList);
      } else {
        return global$5.grep(selectedBlocks, function (elm) {
          return isListNode(elm) && parentList !== elm;
        });
      }
    };
    var findParentListItemsNodes = function (editor, elms) {
      var listItemsElms = global$5.map(elms, function (elm) {
        var parentLi = editor.dom.getParent(elm, 'li,dd,dt', getClosestListRootElm(editor, elm));
        return parentLi ? parentLi : elm;
      });
      return global$4.unique(listItemsElms);
    };
    var getSelectedListItems = function (editor) {
      var selectedBlocks = editor.selection.getSelectedBlocks();
      return global$5.grep(findParentListItemsNodes(editor, selectedBlocks), function (block) {
        return isListItemNode(block);
      });
    };
    var getSelectedDlItems = function (editor) {
      return filter(getSelectedListItems(editor), isDlItemNode);
    };
    var getClosestListRootElm = function (editor, elm) {
      var parentTableCell = editor.dom.getParents(elm, 'TD,TH');
      var root = parentTableCell.length > 0 ? parentTableCell[0] : editor.getBody();
      return root;
    };
    var findLastParentListNode = function (editor, elm) {
      var parentLists = editor.dom.getParents(elm, 'ol,ul', getClosestListRootElm(editor, elm));
      return last(parentLists);
    };
    var getSelectedLists = function (editor) {
      var firstList = findLastParentListNode(editor, editor.selection.getStart());
      var subsequentLists = filter(editor.selection.getSelectedBlocks(), isOlUlNode);
      return firstList.toArray().concat(subsequentLists);
    };
    var getSelectedListRoots = function (editor) {
      var selectedLists = getSelectedLists(editor);
      return getUniqueListRoots(editor, selectedLists);
    };
    var getUniqueListRoots = function (editor, lists) {
      var listRoots = map(lists, function (list) {
        return findLastParentListNode(editor, list).getOr(list);
      });
      return global$4.unique(listRoots);
    };

    var shouldIndentOnTab = function (editor) {
      return editor.getParam('lists_indent_on_tab', true);
    };
    var getForcedRootBlock = function (editor) {
      var block = editor.getParam('forced_root_block', 'p');
      if (block === false) {
        return '';
      } else if (block === true) {
        return 'p';
      } else {
        return block;
      }
    };
    var getForcedRootBlockAttrs = function (editor) {
      return editor.getParam('forced_root_block_attrs', {});
    };

    var createTextBlock = function (editor, contentNode) {
      var dom = editor.dom;
      var blockElements = editor.schema.getBlockElements();
      var fragment = dom.createFragment();
      var blockName = getForcedRootBlock(editor);
      var node, textBlock, hasContentNode;
      if (blockName) {
        textBlock = dom.create(blockName);
        if (textBlock.tagName === blockName.toUpperCase()) {
          dom.setAttribs(textBlock, getForcedRootBlockAttrs(editor));
        }
        if (!isBlock(contentNode.firstChild, blockElements)) {
          fragment.appendChild(textBlock);
        }
      }
      if (contentNode) {
        while (node = contentNode.firstChild) {
          var nodeName = node.nodeName;
          if (!hasContentNode && (nodeName !== 'SPAN' || node.getAttribute('data-mce-type') !== 'bookmark')) {
            hasContentNode = true;
          }
          if (isBlock(node, blockElements)) {
            fragment.appendChild(node);
            textBlock = null;
          } else {
            if (blockName) {
              if (!textBlock) {
                textBlock = dom.create(blockName);
                fragment.appendChild(textBlock);
              }
              textBlock.appendChild(node);
            } else {
              fragment.appendChild(node);
            }
          }
        }
      }
      if (!blockName) {
        fragment.appendChild(dom.create('br'));
      } else {
        if (!hasContentNode) {
          textBlock.appendChild(dom.create('br', { 'data-mce-bogus': '1' }));
        }
      }
      return fragment;
    };

    var keys = Object.keys;
    var each$1 = function (obj, f) {
      var props = keys(obj);
      for (var k = 0, len = props.length; k < len; k++) {
        var i = props[k];
        var x = obj[i];
        f(x, i);
      }
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

    var rawSet = function (dom, key, value) {
      if (isString(value) || isBoolean(value) || isNumber(value)) {
        dom.setAttribute(key, value + '');
      } else {
        domGlobals.console.error('Invalid call to Attr.set. Key ', key, ':: Value ', value, ':: Element ', dom);
        throw new Error('Attribute value was not simple');
      }
    };
    var setAll = function (element, attrs) {
      var dom = element.dom();
      each$1(attrs, function (v, k) {
        rawSet(dom, k, v);
      });
    };
    var clone = function (element) {
      return foldl(element.dom().attributes, function (acc, attr) {
        acc[attr.name] = attr.value;
        return acc;
      }, {});
    };

    var isSupported = function (dom) {
      return dom.style !== undefined && isFunction(dom.style.getPropertyValue);
    };

    var supported = isFunction(domGlobals.Element.prototype.attachShadow) && isFunction(domGlobals.Node.prototype.getRootNode);

    var internalSet = function (dom, property, value) {
      if (!isString(value)) {
        domGlobals.console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
        throw new Error('CSS value must be a string: ' + value);
      }
      if (isSupported(dom)) {
        dom.style.setProperty(property, value);
      }
    };
    var set = function (element, property, value) {
      var dom = element.dom();
      internalSet(dom, property, value);
    };

    var clone$1 = function (original, isDeep) {
      return Element.fromDom(original.dom().cloneNode(isDeep));
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
    var mutate = function (original, tag) {
      var nu = shallowAs(original, tag);
      before(original, nu);
      var children$1 = children(original);
      append$1(nu, children$1);
      remove(original);
      return nu;
    };

    var joinSegment = function (parent, child) {
      append(parent.item, child.list);
    };
    var joinSegments = function (segments) {
      for (var i = 1; i < segments.length; i++) {
        joinSegment(segments[i - 1], segments[i]);
      }
    };
    var appendSegments = function (head$1, tail) {
      lift2(last(head$1), head(tail), joinSegment);
    };
    var createSegment = function (scope, listType) {
      var segment = {
        list: Element.fromTag(listType, scope),
        item: Element.fromTag('li', scope)
      };
      append(segment.list, segment.item);
      return segment;
    };
    var createSegments = function (scope, entry, size) {
      var segments = [];
      for (var i = 0; i < size; i++) {
        segments.push(createSegment(scope, entry.listType));
      }
      return segments;
    };
    var populateSegments = function (segments, entry) {
      for (var i = 0; i < segments.length - 1; i++) {
        set(segments[i].item, 'list-style-type', 'none');
      }
      last(segments).each(function (segment) {
        setAll(segment.list, entry.listAttributes);
        setAll(segment.item, entry.itemAttributes);
        append$1(segment.item, entry.content);
      });
    };
    var normalizeSegment = function (segment, entry) {
      if (name(segment.list) !== entry.listType) {
        segment.list = mutate(segment.list, entry.listType);
      }
      setAll(segment.list, entry.listAttributes);
    };
    var createItem = function (scope, attr, content) {
      var item = Element.fromTag('li', scope);
      setAll(item, attr);
      append$1(item, content);
      return item;
    };
    var appendItem = function (segment, item) {
      append(segment.list, item);
      segment.item = item;
    };
    var writeShallow = function (scope, cast, entry) {
      var newCast = cast.slice(0, entry.depth);
      last(newCast).each(function (segment) {
        var item = createItem(scope, entry.itemAttributes, entry.content);
        appendItem(segment, item);
        normalizeSegment(segment, entry);
      });
      return newCast;
    };
    var writeDeep = function (scope, cast, entry) {
      var segments = createSegments(scope, entry, entry.depth - cast.length);
      joinSegments(segments);
      populateSegments(segments, entry);
      appendSegments(cast, segments);
      return cast.concat(segments);
    };
    var composeList = function (scope, entries) {
      var cast = foldl(entries, function (cast, entry) {
        return entry.depth > cast.length ? writeDeep(scope, cast, entry) : writeShallow(scope, cast, entry);
      }, []);
      return head(cast).map(function (segment) {
        return segment.list;
      });
    };

    var isList = function (el) {
      return is$1(el, 'OL,UL');
    };
    var hasFirstChildList = function (el) {
      return firstChild(el).map(isList).getOr(false);
    };
    var hasLastChildList = function (el) {
      return lastChild(el).map(isList).getOr(false);
    };

    var isIndented = function (entry) {
      return entry.depth > 0;
    };
    var isSelected = function (entry) {
      return entry.isSelected;
    };
    var cloneItemContent = function (li) {
      var children$1 = children(li);
      var content = hasLastChildList(li) ? children$1.slice(0, -1) : children$1;
      return map(content, deep);
    };
    var createEntry = function (li, depth, isSelected) {
      return parent(li).filter(isElement).map(function (list) {
        return {
          depth: depth,
          dirty: false,
          isSelected: isSelected,
          content: cloneItemContent(li),
          itemAttributes: clone(li),
          listAttributes: clone(list),
          listType: name(list)
        };
      });
    };

    var indentEntry = function (indentation, entry) {
      switch (indentation) {
      case 'Indent':
        entry.depth++;
        break;
      case 'Outdent':
        entry.depth--;
        break;
      case 'Flatten':
        entry.depth = 0;
      }
      entry.dirty = true;
    };

    var cloneListProperties = function (target, source) {
      target.listType = source.listType;
      target.listAttributes = __assign({}, source.listAttributes);
    };
    var cleanListProperties = function (entry) {
      entry.listAttributes = filter$1(entry.listAttributes, function (_value, key) {
        return key !== 'start';
      });
    };
    var closestSiblingEntry = function (entries, start) {
      var depth = entries[start].depth;
      var matches = function (entry) {
        return entry.depth === depth && !entry.dirty;
      };
      var until = function (entry) {
        return entry.depth < depth;
      };
      return findUntil(reverse(entries.slice(0, start)), matches, until).orThunk(function () {
        return findUntil(entries.slice(start + 1), matches, until);
      });
    };
    var normalizeEntries = function (entries) {
      each(entries, function (entry, i) {
        closestSiblingEntry(entries, i).fold(function () {
          if (entry.dirty) {
            cleanListProperties(entry);
          }
        }, function (matchingEntry) {
          return cloneListProperties(entry, matchingEntry);
        });
      });
      return entries;
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

    var parseItem = function (depth, itemSelection, selectionState, item) {
      return firstChild(item).filter(isList).fold(function () {
        itemSelection.each(function (selection) {
          if (eq(selection.start, item)) {
            selectionState.set(true);
          }
        });
        var currentItemEntry = createEntry(item, depth, selectionState.get());
        itemSelection.each(function (selection) {
          if (eq(selection.end, item)) {
            selectionState.set(false);
          }
        });
        var childListEntries = lastChild(item).filter(isList).map(function (list) {
          return parseList(depth, itemSelection, selectionState, list);
        }).getOr([]);
        return currentItemEntry.toArray().concat(childListEntries);
      }, function (list) {
        return parseList(depth, itemSelection, selectionState, list);
      });
    };
    var parseList = function (depth, itemSelection, selectionState, list) {
      return bind(children(list), function (element) {
        var parser = isList(element) ? parseList : parseItem;
        var newDepth = depth + 1;
        return parser(newDepth, itemSelection, selectionState, element);
      });
    };
    var parseLists = function (lists, itemSelection) {
      var selectionState = Cell(false);
      var initialDepth = 0;
      return map(lists, function (list) {
        return {
          sourceList: list,
          entries: parseList(initialDepth, itemSelection, selectionState, list)
        };
      });
    };

    var outdentedComposer = function (editor, entries) {
      var normalizedEntries = normalizeEntries(entries);
      return map(normalizedEntries, function (entry) {
        var content = fromElements(entry.content);
        return Element.fromDom(createTextBlock(editor, content.dom()));
      });
    };
    var indentedComposer = function (editor, entries) {
      var normalizedEntries = normalizeEntries(entries);
      return composeList(editor.contentDocument, normalizedEntries).toArray();
    };
    var composeEntries = function (editor, entries) {
      return bind(groupBy(entries, isIndented), function (entries) {
        var groupIsIndented = head(entries).map(isIndented).getOr(false);
        return groupIsIndented ? indentedComposer(editor, entries) : outdentedComposer(editor, entries);
      });
    };
    var indentSelectedEntries = function (entries, indentation) {
      each(filter(entries, isSelected), function (entry) {
        return indentEntry(indentation, entry);
      });
    };
    var getItemSelection = function (editor) {
      var selectedListItems = map(getSelectedListItems(editor), Element.fromDom);
      return lift2(find(selectedListItems, not(hasFirstChildList)), find(reverse(selectedListItems), not(hasFirstChildList)), function (start, end) {
        return {
          start: start,
          end: end
        };
      });
    };
    var listIndentation = function (editor, lists, indentation) {
      var entrySets = parseLists(lists, getItemSelection(editor));
      each(entrySets, function (entrySet) {
        indentSelectedEntries(entrySet.entries, indentation);
        var composedLists = composeEntries(editor, entrySet.entries);
        each(composedLists, function (composedList) {
          fireListEvent(editor, indentation === 'Indent' ? 'IndentList' : 'OutdentList', composedList.dom());
        });
        before$1(entrySet.sourceList, composedLists);
        remove(entrySet.sourceList);
      });
    };

    var global$6 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

    var DOM = global$6.DOM;
    var splitList = function (editor, ul, li) {
      var removeAndKeepBookmarks = function (targetNode) {
        global$5.each(bookmarks, function (node) {
          targetNode.parentNode.insertBefore(node, li.parentNode);
        });
        DOM.remove(targetNode);
      };
      var bookmarks = DOM.select('span[data-mce-type="bookmark"]', ul);
      var newBlock = createTextBlock(editor, li);
      var tmpRng = DOM.createRng();
      tmpRng.setStartAfter(li);
      tmpRng.setEndAfter(ul);
      var fragment = tmpRng.extractContents();
      for (var node = fragment.firstChild; node; node = node.firstChild) {
        if (node.nodeName === 'LI' && editor.dom.isEmpty(node)) {
          DOM.remove(node);
          break;
        }
      }
      if (!editor.dom.isEmpty(fragment)) {
        DOM.insertAfter(fragment, ul);
      }
      DOM.insertAfter(newBlock, ul);
      if (isEmpty(editor.dom, li.parentNode)) {
        removeAndKeepBookmarks(li.parentNode);
      }
      DOM.remove(li);
      if (isEmpty(editor.dom, ul)) {
        DOM.remove(ul);
      }
    };

    var outdentDlItem = function (editor, item) {
      if (is$1(item, 'dd')) {
        mutate(item, 'dt');
      } else if (is$1(item, 'dt')) {
        parent(item).each(function (dl) {
          return splitList(editor, dl.dom(), item.dom());
        });
      }
    };
    var indentDlItem = function (item) {
      if (is$1(item, 'dt')) {
        mutate(item, 'dd');
      }
    };
    var dlIndentation = function (editor, indentation, dlItems) {
      if (indentation === 'Indent') {
        each(dlItems, indentDlItem);
      } else {
        each(dlItems, function (item) {
          return outdentDlItem(editor, item);
        });
      }
    };

    var getNormalizedPoint = function (container, offset) {
      if (isTextNode(container)) {
        return {
          container: container,
          offset: offset
        };
      }
      var node = global$1.getNode(container, offset);
      if (isTextNode(node)) {
        return {
          container: node,
          offset: offset >= container.childNodes.length ? node.data.length : 0
        };
      } else if (node.previousSibling && isTextNode(node.previousSibling)) {
        return {
          container: node.previousSibling,
          offset: node.previousSibling.data.length
        };
      } else if (node.nextSibling && isTextNode(node.nextSibling)) {
        return {
          container: node.nextSibling,
          offset: 0
        };
      }
      return {
        container: container,
        offset: offset
      };
    };
    var normalizeRange = function (rng) {
      var outRng = rng.cloneRange();
      var rangeStart = getNormalizedPoint(rng.startContainer, rng.startOffset);
      outRng.setStart(rangeStart.container, rangeStart.offset);
      var rangeEnd = getNormalizedPoint(rng.endContainer, rng.endOffset);
      outRng.setEnd(rangeEnd.container, rangeEnd.offset);
      return outRng;
    };

    var selectionIndentation = function (editor, indentation) {
      var lists = map(getSelectedListRoots(editor), Element.fromDom);
      var dlItems = map(getSelectedDlItems(editor), Element.fromDom);
      var isHandled = false;
      if (lists.length || dlItems.length) {
        var bookmark = editor.selection.getBookmark();
        listIndentation(editor, lists, indentation);
        dlIndentation(editor, indentation, dlItems);
        editor.selection.moveToBookmark(bookmark);
        editor.selection.setRng(normalizeRange(editor.selection.getRng()));
        editor.nodeChanged();
        isHandled = true;
      }
      return isHandled;
    };
    var indentListSelection = function (editor) {
      return selectionIndentation(editor, 'Indent');
    };
    var outdentListSelection = function (editor) {
      return selectionIndentation(editor, 'Outdent');
    };
    var flattenListSelection = function (editor) {
      return selectionIndentation(editor, 'Flatten');
    };

    var global$7 = tinymce.util.Tools.resolve('tinymce.dom.BookmarkManager');

    var DOM$1 = global$6.DOM;
    var createBookmark = function (rng) {
      var bookmark = {};
      var setupEndPoint = function (start) {
        var offsetNode, container, offset;
        container = rng[start ? 'startContainer' : 'endContainer'];
        offset = rng[start ? 'startOffset' : 'endOffset'];
        if (container.nodeType === 1) {
          offsetNode = DOM$1.create('span', { 'data-mce-type': 'bookmark' });
          if (container.hasChildNodes()) {
            offset = Math.min(offset, container.childNodes.length - 1);
            if (start) {
              container.insertBefore(offsetNode, container.childNodes[offset]);
            } else {
              DOM$1.insertAfter(offsetNode, container.childNodes[offset]);
            }
          } else {
            container.appendChild(offsetNode);
          }
          container = offsetNode;
          offset = 0;
        }
        bookmark[start ? 'startContainer' : 'endContainer'] = container;
        bookmark[start ? 'startOffset' : 'endOffset'] = offset;
      };
      setupEndPoint(true);
      if (!rng.collapsed) {
        setupEndPoint();
      }
      return bookmark;
    };
    var resolveBookmark = function (bookmark) {
      function restoreEndPoint(start) {
        var container, offset, node;
        var nodeIndex = function (container) {
          var node = container.parentNode.firstChild, idx = 0;
          while (node) {
            if (node === container) {
              return idx;
            }
            if (node.nodeType !== 1 || node.getAttribute('data-mce-type') !== 'bookmark') {
              idx++;
            }
            node = node.nextSibling;
          }
          return -1;
        };
        container = node = bookmark[start ? 'startContainer' : 'endContainer'];
        offset = bookmark[start ? 'startOffset' : 'endOffset'];
        if (!container) {
          return;
        }
        if (container.nodeType === 1) {
          offset = nodeIndex(container);
          container = container.parentNode;
          DOM$1.remove(node);
          if (!container.hasChildNodes() && DOM$1.isBlock(container)) {
            container.appendChild(DOM$1.create('br'));
          }
        }
        bookmark[start ? 'startContainer' : 'endContainer'] = container;
        bookmark[start ? 'startOffset' : 'endOffset'] = offset;
      }
      restoreEndPoint(true);
      restoreEndPoint();
      var rng = DOM$1.createRng();
      rng.setStart(bookmark.startContainer, bookmark.startOffset);
      if (bookmark.endContainer) {
        rng.setEnd(bookmark.endContainer, bookmark.endOffset);
      }
      return normalizeRange(rng);
    };

    var listToggleActionFromListName = function (listName) {
      switch (listName) {
      case 'UL':
        return 'ToggleUlList';
      case 'OL':
        return 'ToggleOlList';
      case 'DL':
        return 'ToggleDLList';
      }
    };

    var isCustomList = function (list) {
      return /\btox\-/.test(list.className);
    };
    var listState = function (editor, listName, activate) {
      var nodeChangeHandler = function (e) {
        var inList = findUntil(e.parents, isListNode, isTableCellNode).filter(function (list) {
          return list.nodeName === listName && !isCustomList(list);
        }).isSome();
        activate(inList);
      };
      var parents = editor.dom.getParents(editor.selection.getNode());
      nodeChangeHandler({ parents: parents });
      editor.on('NodeChange', nodeChangeHandler);
      return function () {
        return editor.off('NodeChange', nodeChangeHandler);
      };
    };

    var updateListStyle = function (dom, el, detail) {
      var type = detail['list-style-type'] ? detail['list-style-type'] : null;
      dom.setStyle(el, 'list-style-type', type);
    };
    var setAttribs = function (elm, attrs) {
      global$5.each(attrs, function (value, key) {
        elm.setAttribute(key, value);
      });
    };
    var updateListAttrs = function (dom, el, detail) {
      setAttribs(el, detail['list-attributes']);
      global$5.each(dom.select('li', el), function (li) {
        setAttribs(li, detail['list-item-attributes']);
      });
    };
    var updateListWithDetails = function (dom, el, detail) {
      updateListStyle(dom, el, detail);
      updateListAttrs(dom, el, detail);
    };
    var removeStyles = function (dom, element, styles) {
      global$5.each(styles, function (style) {
        var _a;
        return dom.setStyle(element, (_a = {}, _a[style] = '', _a));
      });
    };
    var getEndPointNode = function (editor, rng, start, root) {
      var container = rng[start ? 'startContainer' : 'endContainer'];
      var offset = rng[start ? 'startOffset' : 'endOffset'];
      if (container.nodeType === 1) {
        container = container.childNodes[Math.min(offset, container.childNodes.length - 1)] || container;
      }
      if (!start && isBr(container.nextSibling)) {
        container = container.nextSibling;
      }
      while (container.parentNode !== root) {
        if (isTextBlock(editor, container)) {
          return container;
        }
        if (/^(TD|TH)$/.test(container.parentNode.nodeName)) {
          return container;
        }
        container = container.parentNode;
      }
      return container;
    };
    var getSelectedTextBlocks = function (editor, rng, root) {
      var textBlocks = [], dom = editor.dom;
      var startNode = getEndPointNode(editor, rng, true, root);
      var endNode = getEndPointNode(editor, rng, false, root);
      var block;
      var siblings = [];
      for (var node = startNode; node; node = node.nextSibling) {
        siblings.push(node);
        if (node === endNode) {
          break;
        }
      }
      global$5.each(siblings, function (node) {
        if (isTextBlock(editor, node)) {
          textBlocks.push(node);
          block = null;
          return;
        }
        if (dom.isBlock(node) || isBr(node)) {
          if (isBr(node)) {
            dom.remove(node);
          }
          block = null;
          return;
        }
        var nextSibling = node.nextSibling;
        if (global$7.isBookmarkNode(node)) {
          if (isTextBlock(editor, nextSibling) || !nextSibling && node.parentNode === root) {
            block = null;
            return;
          }
        }
        if (!block) {
          block = dom.create('p');
          node.parentNode.insertBefore(block, node);
          textBlocks.push(block);
        }
        block.appendChild(node);
      });
      return textBlocks;
    };
    var hasCompatibleStyle = function (dom, sib, detail) {
      var sibStyle = dom.getStyle(sib, 'list-style-type');
      var detailStyle = detail ? detail['list-style-type'] : '';
      detailStyle = detailStyle === null ? '' : detailStyle;
      return sibStyle === detailStyle;
    };
    var applyList = function (editor, listName, detail) {
      if (detail === void 0) {
        detail = {};
      }
      var rng = editor.selection.getRng();
      var listItemName = 'LI';
      var root = getClosestListRootElm(editor, editor.selection.getStart(true));
      var dom = editor.dom;
      if (dom.getContentEditable(editor.selection.getNode()) === 'false') {
        return;
      }
      listName = listName.toUpperCase();
      if (listName === 'DL') {
        listItemName = 'DT';
      }
      var bookmark = createBookmark(rng);
      global$5.each(getSelectedTextBlocks(editor, rng, root), function (block) {
        var listBlock;
        var sibling = block.previousSibling;
        if (sibling && isListNode(sibling) && sibling.nodeName === listName && hasCompatibleStyle(dom, sibling, detail)) {
          listBlock = sibling;
          block = dom.rename(block, listItemName);
          sibling.appendChild(block);
        } else {
          listBlock = dom.create(listName);
          block.parentNode.insertBefore(listBlock, block);
          listBlock.appendChild(block);
          block = dom.rename(block, listItemName);
        }
        removeStyles(dom, block, [
          'margin',
          'margin-right',
          'margin-bottom',
          'margin-left',
          'margin-top',
          'padding',
          'padding-right',
          'padding-bottom',
          'padding-left',
          'padding-top'
        ]);
        updateListWithDetails(dom, listBlock, detail);
        mergeWithAdjacentLists(editor.dom, listBlock);
      });
      editor.selection.setRng(resolveBookmark(bookmark));
    };
    var isValidLists = function (list1, list2) {
      return list1 && list2 && isListNode(list1) && list1.nodeName === list2.nodeName;
    };
    var hasSameListStyle = function (dom, list1, list2) {
      var targetStyle = dom.getStyle(list1, 'list-style-type', true);
      var style = dom.getStyle(list2, 'list-style-type', true);
      return targetStyle === style;
    };
    var hasSameClasses = function (elm1, elm2) {
      return elm1.className === elm2.className;
    };
    var shouldMerge = function (dom, list1, list2) {
      return isValidLists(list1, list2) && hasSameListStyle(dom, list1, list2) && hasSameClasses(list1, list2);
    };
    var mergeWithAdjacentLists = function (dom, listBlock) {
      var sibling, node;
      sibling = listBlock.nextSibling;
      if (shouldMerge(dom, listBlock, sibling)) {
        while (node = sibling.firstChild) {
          listBlock.appendChild(node);
        }
        dom.remove(sibling);
      }
      sibling = listBlock.previousSibling;
      if (shouldMerge(dom, listBlock, sibling)) {
        while (node = sibling.lastChild) {
          listBlock.insertBefore(node, listBlock.firstChild);
        }
        dom.remove(sibling);
      }
    };
    var updateList = function (editor, list, listName, detail) {
      if (list.nodeName !== listName) {
        var newList = editor.dom.rename(list, listName);
        updateListWithDetails(editor.dom, newList, detail);
        fireListEvent(editor, listToggleActionFromListName(listName), newList);
      } else {
        updateListWithDetails(editor.dom, list, detail);
        fireListEvent(editor, listToggleActionFromListName(listName), list);
      }
    };
    var toggleMultipleLists = function (editor, parentList, lists, listName, detail) {
      if (parentList.nodeName === listName && !hasListStyleDetail(detail)) {
        flattenListSelection(editor);
      } else {
        var bookmark = createBookmark(editor.selection.getRng(true));
        global$5.each([parentList].concat(lists), function (elm) {
          updateList(editor, elm, listName, detail);
        });
        editor.selection.setRng(resolveBookmark(bookmark));
      }
    };
    var hasListStyleDetail = function (detail) {
      return 'list-style-type' in detail;
    };
    var toggleSingleList = function (editor, parentList, listName, detail) {
      if (parentList === editor.getBody()) {
        return;
      }
      if (parentList) {
        if (parentList.nodeName === listName && !hasListStyleDetail(detail) && !isCustomList(parentList)) {
          flattenListSelection(editor);
        } else {
          var bookmark = createBookmark(editor.selection.getRng(true));
          updateListWithDetails(editor.dom, parentList, detail);
          var newList = editor.dom.rename(parentList, listName);
          mergeWithAdjacentLists(editor.dom, newList);
          editor.selection.setRng(resolveBookmark(bookmark));
          fireListEvent(editor, listToggleActionFromListName(listName), newList);
        }
      } else {
        applyList(editor, listName, detail);
        fireListEvent(editor, listToggleActionFromListName(listName), parentList);
      }
    };
    var toggleList = function (editor, listName, detail) {
      var parentList = getParentList(editor);
      var selectedSubLists = getSelectedSubLists(editor);
      detail = detail ? detail : {};
      if (parentList && selectedSubLists.length > 0) {
        toggleMultipleLists(editor, parentList, selectedSubLists, listName, detail);
      } else {
        toggleSingleList(editor, parentList, listName, detail);
      }
    };

    var DOM$2 = global$6.DOM;
    var normalizeList = function (dom, ul) {
      var sibling;
      var parentNode = ul.parentNode;
      if (parentNode.nodeName === 'LI' && parentNode.firstChild === ul) {
        sibling = parentNode.previousSibling;
        if (sibling && sibling.nodeName === 'LI') {
          sibling.appendChild(ul);
          if (isEmpty(dom, parentNode)) {
            DOM$2.remove(parentNode);
          }
        } else {
          DOM$2.setStyle(parentNode, 'listStyleType', 'none');
        }
      }
      if (isListNode(parentNode)) {
        sibling = parentNode.previousSibling;
        if (sibling && sibling.nodeName === 'LI') {
          sibling.appendChild(ul);
        }
      }
    };
    var normalizeLists = function (dom, element) {
      global$5.each(global$5.grep(dom.select('ol,ul', element)), function (ul) {
        normalizeList(dom, ul);
      });
    };

    var findNextCaretContainer = function (editor, rng, isForward, root) {
      var node = rng.startContainer;
      var offset = rng.startOffset;
      if (isTextNode(node) && (isForward ? offset < node.data.length : offset > 0)) {
        return node;
      }
      var nonEmptyBlocks = editor.schema.getNonEmptyElements();
      if (node.nodeType === 1) {
        node = global$1.getNode(node, offset);
      }
      var walker = new global$2(node, root);
      if (isForward) {
        if (isBogusBr(editor.dom, node)) {
          walker.next();
        }
      }
      while (node = walker[isForward ? 'next' : 'prev2']()) {
        if (node.nodeName === 'LI' && !node.hasChildNodes()) {
          return node;
        }
        if (nonEmptyBlocks[node.nodeName]) {
          return node;
        }
        if (isTextNode(node) && node.data.length > 0) {
          return node;
        }
      }
    };
    var hasOnlyOneBlockChild = function (dom, elm) {
      var childNodes = elm.childNodes;
      return childNodes.length === 1 && !isListNode(childNodes[0]) && dom.isBlock(childNodes[0]);
    };
    var unwrapSingleBlockChild = function (dom, elm) {
      if (hasOnlyOneBlockChild(dom, elm)) {
        dom.remove(elm.firstChild, true);
      }
    };
    var moveChildren = function (dom, fromElm, toElm) {
      var node;
      var targetElm = hasOnlyOneBlockChild(dom, toElm) ? toElm.firstChild : toElm;
      unwrapSingleBlockChild(dom, fromElm);
      if (!isEmpty(dom, fromElm, true)) {
        while (node = fromElm.firstChild) {
          targetElm.appendChild(node);
        }
      }
    };
    var mergeLiElements = function (dom, fromElm, toElm) {
      var listNode;
      var ul = fromElm.parentNode;
      if (!isChildOfBody(dom, fromElm) || !isChildOfBody(dom, toElm)) {
        return;
      }
      if (isListNode(toElm.lastChild)) {
        listNode = toElm.lastChild;
      }
      if (ul === toElm.lastChild) {
        if (isBr(ul.previousSibling)) {
          dom.remove(ul.previousSibling);
        }
      }
      var node = toElm.lastChild;
      if (node && isBr(node) && fromElm.hasChildNodes()) {
        dom.remove(node);
      }
      if (isEmpty(dom, toElm, true)) {
        dom.$(toElm).empty();
      }
      moveChildren(dom, fromElm, toElm);
      if (listNode) {
        toElm.appendChild(listNode);
      }
      var contains = contains$1(Element.fromDom(toElm), Element.fromDom(fromElm));
      var nestedLists = contains ? dom.getParents(fromElm, isListNode, toElm) : [];
      dom.remove(fromElm);
      each(nestedLists, function (list) {
        if (isEmpty(dom, list) && list !== dom.getRoot()) {
          dom.remove(list);
        }
      });
    };
    var mergeIntoEmptyLi = function (editor, fromLi, toLi) {
      editor.dom.$(toLi).empty();
      mergeLiElements(editor.dom, fromLi, toLi);
      editor.selection.setCursorLocation(toLi);
    };
    var mergeForward = function (editor, rng, fromLi, toLi) {
      var dom = editor.dom;
      if (dom.isEmpty(toLi)) {
        mergeIntoEmptyLi(editor, fromLi, toLi);
      } else {
        var bookmark = createBookmark(rng);
        mergeLiElements(dom, fromLi, toLi);
        editor.selection.setRng(resolveBookmark(bookmark));
      }
    };
    var mergeBackward = function (editor, rng, fromLi, toLi) {
      var bookmark = createBookmark(rng);
      mergeLiElements(editor.dom, fromLi, toLi);
      var resolvedBookmark = resolveBookmark(bookmark);
      editor.selection.setRng(resolvedBookmark);
    };
    var backspaceDeleteFromListToListCaret = function (editor, isForward) {
      var dom = editor.dom, selection = editor.selection;
      var selectionStartElm = selection.getStart();
      var root = getClosestListRootElm(editor, selectionStartElm);
      var li = dom.getParent(selection.getStart(), 'LI', root);
      if (li) {
        var ul = li.parentNode;
        if (ul === editor.getBody() && isEmpty(dom, ul)) {
          return true;
        }
        var rng_1 = normalizeRange(selection.getRng());
        var otherLi_1 = dom.getParent(findNextCaretContainer(editor, rng_1, isForward, root), 'LI', root);
        if (otherLi_1 && otherLi_1 !== li) {
          editor.undoManager.transact(function () {
            if (isForward) {
              mergeForward(editor, rng_1, otherLi_1, li);
            } else {
              if (isFirstChild(li)) {
                outdentListSelection(editor);
              } else {
                mergeBackward(editor, rng_1, li, otherLi_1);
              }
            }
          });
          return true;
        } else if (!otherLi_1) {
          if (!isForward && rng_1.startOffset === 0 && rng_1.endOffset === 0) {
            editor.undoManager.transact(function () {
              flattenListSelection(editor);
            });
            return true;
          }
        }
      }
      return false;
    };
    var removeBlock = function (dom, block, root) {
      var parentBlock = dom.getParent(block.parentNode, dom.isBlock, root);
      dom.remove(block);
      if (parentBlock && dom.isEmpty(parentBlock)) {
        dom.remove(parentBlock);
      }
    };
    var backspaceDeleteIntoListCaret = function (editor, isForward) {
      var dom = editor.dom;
      var selectionStartElm = editor.selection.getStart();
      var root = getClosestListRootElm(editor, selectionStartElm);
      var block = dom.getParent(selectionStartElm, dom.isBlock, root);
      if (block && dom.isEmpty(block)) {
        var rng = normalizeRange(editor.selection.getRng());
        var otherLi_2 = dom.getParent(findNextCaretContainer(editor, rng, isForward, root), 'LI', root);
        if (otherLi_2) {
          editor.undoManager.transact(function () {
            removeBlock(dom, block, root);
            mergeWithAdjacentLists(dom, otherLi_2.parentNode);
            editor.selection.select(otherLi_2, true);
            editor.selection.collapse(isForward);
          });
          return true;
        }
      }
      return false;
    };
    var backspaceDeleteCaret = function (editor, isForward) {
      return backspaceDeleteFromListToListCaret(editor, isForward) || backspaceDeleteIntoListCaret(editor, isForward);
    };
    var backspaceDeleteRange = function (editor) {
      var selectionStartElm = editor.selection.getStart();
      var root = getClosestListRootElm(editor, selectionStartElm);
      var startListParent = editor.dom.getParent(selectionStartElm, 'LI,DT,DD', root);
      if (startListParent || getSelectedListItems(editor).length > 0) {
        editor.undoManager.transact(function () {
          editor.execCommand('Delete');
          normalizeLists(editor.dom, editor.getBody());
        });
        return true;
      }
      return false;
    };
    var backspaceDelete = function (editor, isForward) {
      return editor.selection.isCollapsed() ? backspaceDeleteCaret(editor, isForward) : backspaceDeleteRange(editor);
    };
    var setup = function (editor) {
      editor.on('keydown', function (e) {
        if (e.keyCode === global$3.BACKSPACE) {
          if (backspaceDelete(editor, false)) {
            e.preventDefault();
          }
        } else if (e.keyCode === global$3.DELETE) {
          if (backspaceDelete(editor, true)) {
            e.preventDefault();
          }
        }
      });
    };

    var get = function (editor) {
      return {
        backspaceDelete: function (isForward) {
          backspaceDelete(editor, isForward);
        }
      };
    };

    var open = function (editor) {
      var dom = editor.dom;
      var currentList = getParentList(editor);
      if (!isOlNode(currentList)) {
        return;
      }
      editor.windowManager.open({
        title: 'List Properties',
        body: {
          type: 'panel',
          items: [{
              type: 'input',
              name: 'start',
              label: 'Start list at number',
              inputMode: 'numeric'
            }]
        },
        initialData: { start: dom.getAttrib(currentList, 'start') || '1' },
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
        onSubmit: function (api) {
          var data = api.getData();
          editor.undoManager.transact(function () {
            dom.setAttrib(getParentList(editor), 'start', data.start === '1' ? '' : data.start);
          });
          api.close();
        }
      });
    };

    var queryListCommandState = function (editor, listName) {
      return function () {
        var parentList = editor.dom.getParent(editor.selection.getStart(), 'UL,OL,DL');
        return parentList && parentList.nodeName === listName;
      };
    };
    var register = function (editor) {
      editor.on('BeforeExecCommand', function (e) {
        var cmd = e.command.toLowerCase();
        if (cmd === 'indent') {
          indentListSelection(editor);
        } else if (cmd === 'outdent') {
          outdentListSelection(editor);
        }
      });
      editor.addCommand('InsertUnorderedList', function (ui, detail) {
        toggleList(editor, 'UL', detail);
      });
      editor.addCommand('InsertOrderedList', function (ui, detail) {
        toggleList(editor, 'OL', detail);
      });
      editor.addCommand('InsertDefinitionList', function (ui, detail) {
        toggleList(editor, 'DL', detail);
      });
      editor.addCommand('RemoveList', function () {
        flattenListSelection(editor);
      });
      editor.addCommand('mceListProps', function () {
        open(editor);
      });
      editor.addQueryStateHandler('InsertUnorderedList', queryListCommandState(editor, 'UL'));
      editor.addQueryStateHandler('InsertOrderedList', queryListCommandState(editor, 'OL'));
      editor.addQueryStateHandler('InsertDefinitionList', queryListCommandState(editor, 'DL'));
    };

    var hasRtcPlugin = function (editor) {
      if (/(^|[ ,])rtc([, ]|$)/.test(editor.getParam('plugins', '', 'string')) && global.get('rtc')) {
        return true;
      } else {
        return false;
      }
    };

    var setupTabKey = function (editor) {
      editor.on('keydown', function (e) {
        if (e.keyCode !== global$3.TAB || global$3.metaKeyPressed(e)) {
          return;
        }
        editor.undoManager.transact(function () {
          if (e.shiftKey ? outdentListSelection(editor) : indentListSelection(editor)) {
            e.preventDefault();
          }
        });
      });
    };
    var setup$1 = function (editor) {
      if (shouldIndentOnTab(editor)) {
        setupTabKey(editor);
      }
      setup(editor);
    };

    var register$1 = function (editor) {
      var hasPlugin = function (editor, plugin) {
        var plugins = editor.getParam('plugins', '', 'string');
        return global$5.inArray(plugins.split(/[ ,]/), plugin) !== -1;
      };
      var exec = function (command) {
        return function () {
          return editor.execCommand(command);
        };
      };
      if (!hasPlugin(editor, 'advlist')) {
        editor.ui.registry.addToggleButton('numlist', {
          icon: 'ordered-list',
          active: false,
          tooltip: 'Numbered list',
          onAction: exec('InsertOrderedList'),
          onSetup: function (api) {
            return listState(editor, 'OL', api.setActive);
          }
        });
        editor.ui.registry.addToggleButton('bullist', {
          icon: 'unordered-list',
          active: false,
          tooltip: 'Bullet list',
          onAction: exec('InsertUnorderedList'),
          onSetup: function (api) {
            return listState(editor, 'UL', api.setActive);
          }
        });
      }
    };

    var register$2 = function (editor) {
      var listProperties = {
        text: 'List properties...',
        icon: 'ordered-list',
        onAction: function () {
          return open(editor);
        },
        onSetup: function (api) {
          return listState(editor, 'OL', function (active) {
            return api.setDisabled(!active);
          });
        }
      };
      editor.ui.registry.addMenuItem('listprops', listProperties);
      editor.ui.registry.addContextMenu('lists', {
        update: function (node) {
          var parentList = getParentList(editor, node);
          return isOlNode(parentList) ? ['listprops'] : [];
        }
      });
    };

    function Plugin () {
      global.add('lists', function (editor) {
        if (hasRtcPlugin(editor) === false) {
          setup$1(editor);
          register(editor);
        }
        register$1(editor);
        register$2(editor);
        return get(editor);
      });
    }

    Plugin();

}(window));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2xpc3RzL3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFNBQVM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFNBQVM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFNBQVM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxTQUFTO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxTQUFTO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsb0JBQW9CO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBLHNHQUFzRzs7QUFFdEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBEO0FBQzFEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxrREFBa0Qsd0JBQXdCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxTQUFTO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sSUFBSTtBQUNYOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFCQUFxQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixVQUFVO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIseUJBQXlCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxNQUFNO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2Qyw4QkFBOEI7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsbUJBQW1CO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsTUFBTTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNULHNCQUFzQixvREFBb0Q7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7O0FBRUEsQ0FBQyIsImZpbGUiOiJ2ZW5kb3JzfnRpbnltY2UtcGx1Z2luLWxpc3RzfnRpbnltY2UtcGx1Z2luLWxpc3RzLXBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICpcbiAqIFZlcnNpb246IDUuNC4yICgyMDIwLTA4LTE3KVxuICovXG4oZnVuY3Rpb24gKGRvbUdsb2JhbHMpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgZ2xvYmFsID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuUGx1Z2luTWFuYWdlcicpO1xuXG4gICAgdmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgfTtcbiAgICB2YXIgY29uc3RhbnQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgbm90ID0gZnVuY3Rpb24gKGYpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gIWYodCk7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIG5ldmVyID0gY29uc3RhbnQoZmFsc2UpO1xuICAgIHZhciBhbHdheXMgPSBjb25zdGFudCh0cnVlKTtcblxuICAgIHZhciBub25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIE5PTkU7XG4gICAgfTtcbiAgICB2YXIgTk9ORSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBlcSA9IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgIHJldHVybiBvLmlzTm9uZSgpO1xuICAgICAgfTtcbiAgICAgIHZhciBjYWxsID0gZnVuY3Rpb24gKHRodW5rKSB7XG4gICAgICAgIHJldHVybiB0aHVuaygpO1xuICAgICAgfTtcbiAgICAgIHZhciBpZCA9IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgIHJldHVybiBuO1xuICAgICAgfTtcbiAgICAgIHZhciBtZSA9IHtcbiAgICAgICAgZm9sZDogZnVuY3Rpb24gKG4sIF9zKSB7XG4gICAgICAgICAgcmV0dXJuIG4oKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXM6IG5ldmVyLFxuICAgICAgICBpc1NvbWU6IG5ldmVyLFxuICAgICAgICBpc05vbmU6IGFsd2F5cyxcbiAgICAgICAgZ2V0T3I6IGlkLFxuICAgICAgICBnZXRPclRodW5rOiBjYWxsLFxuICAgICAgICBnZXRPckRpZTogZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cgfHwgJ2Vycm9yOiBnZXRPckRpZSBjYWxsZWQgb24gbm9uZS4nKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0T3JOdWxsOiBjb25zdGFudChudWxsKSxcbiAgICAgICAgZ2V0T3JVbmRlZmluZWQ6IGNvbnN0YW50KHVuZGVmaW5lZCksXG4gICAgICAgIG9yOiBpZCxcbiAgICAgICAgb3JUaHVuazogY2FsbCxcbiAgICAgICAgbWFwOiBub25lLFxuICAgICAgICBlYWNoOiBub29wLFxuICAgICAgICBiaW5kOiBub25lLFxuICAgICAgICBleGlzdHM6IG5ldmVyLFxuICAgICAgICBmb3JhbGw6IGFsd2F5cyxcbiAgICAgICAgZmlsdGVyOiBub25lLFxuICAgICAgICBlcXVhbHM6IGVxLFxuICAgICAgICBlcXVhbHNfOiBlcSxcbiAgICAgICAgdG9BcnJheTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9TdHJpbmc6IGNvbnN0YW50KCdub25lKCknKVxuICAgICAgfTtcbiAgICAgIHJldHVybiBtZTtcbiAgICB9KCk7XG4gICAgdmFyIHNvbWUgPSBmdW5jdGlvbiAoYSkge1xuICAgICAgdmFyIGNvbnN0YW50X2EgPSBjb25zdGFudChhKTtcbiAgICAgIHZhciBzZWxmID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbWU7XG4gICAgICB9O1xuICAgICAgdmFyIGJpbmQgPSBmdW5jdGlvbiAoZikge1xuICAgICAgICByZXR1cm4gZihhKTtcbiAgICAgIH07XG4gICAgICB2YXIgbWUgPSB7XG4gICAgICAgIGZvbGQ6IGZ1bmN0aW9uIChuLCBzKSB7XG4gICAgICAgICAgcmV0dXJuIHMoYSk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgIHJldHVybiBhID09PSB2O1xuICAgICAgICB9LFxuICAgICAgICBpc1NvbWU6IGFsd2F5cyxcbiAgICAgICAgaXNOb25lOiBuZXZlcixcbiAgICAgICAgZ2V0T3I6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yVGh1bms6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yRGllOiBjb25zdGFudF9hLFxuICAgICAgICBnZXRPck51bGw6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yVW5kZWZpbmVkOiBjb25zdGFudF9hLFxuICAgICAgICBvcjogc2VsZixcbiAgICAgICAgb3JUaHVuazogc2VsZixcbiAgICAgICAgbWFwOiBmdW5jdGlvbiAoZikge1xuICAgICAgICAgIHJldHVybiBzb21lKGYoYSkpO1xuICAgICAgICB9LFxuICAgICAgICBlYWNoOiBmdW5jdGlvbiAoZikge1xuICAgICAgICAgIGYoYSk7XG4gICAgICAgIH0sXG4gICAgICAgIGJpbmQ6IGJpbmQsXG4gICAgICAgIGV4aXN0czogYmluZCxcbiAgICAgICAgZm9yYWxsOiBiaW5kLFxuICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgcmV0dXJuIGYoYSkgPyBtZSA6IE5PTkU7XG4gICAgICAgIH0sXG4gICAgICAgIHRvQXJyYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gW2FdO1xuICAgICAgICB9LFxuICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiAnc29tZSgnICsgYSArICcpJztcbiAgICAgICAgfSxcbiAgICAgICAgZXF1YWxzOiBmdW5jdGlvbiAobykge1xuICAgICAgICAgIHJldHVybiBvLmlzKGEpO1xuICAgICAgICB9LFxuICAgICAgICBlcXVhbHNfOiBmdW5jdGlvbiAobywgZWxlbWVudEVxKSB7XG4gICAgICAgICAgcmV0dXJuIG8uZm9sZChuZXZlciwgZnVuY3Rpb24gKGIpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50RXEoYSwgYik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXR1cm4gbWU7XG4gICAgfTtcbiAgICB2YXIgZnJvbSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgPyBOT05FIDogc29tZSh2YWx1ZSk7XG4gICAgfTtcbiAgICB2YXIgT3B0aW9uID0ge1xuICAgICAgc29tZTogc29tZSxcbiAgICAgIG5vbmU6IG5vbmUsXG4gICAgICBmcm9tOiBmcm9tXG4gICAgfTtcblxuICAgIHZhciB0eXBlT2YgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgdmFyIHQgPSB0eXBlb2YgeDtcbiAgICAgIGlmICh4ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnbnVsbCc7XG4gICAgICB9IGVsc2UgaWYgKHQgPT09ICdvYmplY3QnICYmIChBcnJheS5wcm90b3R5cGUuaXNQcm90b3R5cGVPZih4KSB8fCB4LmNvbnN0cnVjdG9yICYmIHguY29uc3RydWN0b3IubmFtZSA9PT0gJ0FycmF5JykpIHtcbiAgICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgICB9IGVsc2UgaWYgKHQgPT09ICdvYmplY3QnICYmIChTdHJpbmcucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoeCkgfHwgeC5jb25zdHJ1Y3RvciAmJiB4LmNvbnN0cnVjdG9yLm5hbWUgPT09ICdTdHJpbmcnKSkge1xuICAgICAgICByZXR1cm4gJ3N0cmluZyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdDtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBpc1R5cGUgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZU9mKHZhbHVlKSA9PT0gdHlwZTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgaXNTaW1wbGVUeXBlID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gdHlwZTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgaXNTdHJpbmcgPSBpc1R5cGUoJ3N0cmluZycpO1xuICAgIHZhciBpc0FycmF5ID0gaXNUeXBlKCdhcnJheScpO1xuICAgIHZhciBpc0Jvb2xlYW4gPSBpc1NpbXBsZVR5cGUoJ2Jvb2xlYW4nKTtcbiAgICB2YXIgaXNGdW5jdGlvbiA9IGlzU2ltcGxlVHlwZSgnZnVuY3Rpb24nKTtcbiAgICB2YXIgaXNOdW1iZXIgPSBpc1NpbXBsZVR5cGUoJ251bWJlcicpO1xuXG4gICAgdmFyIG5hdGl2ZVNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuICAgIHZhciBuYXRpdmVQdXNoID0gQXJyYXkucHJvdG90eXBlLnB1c2g7XG4gICAgdmFyIG1hcCA9IGZ1bmN0aW9uICh4cywgZikge1xuICAgICAgdmFyIGxlbiA9IHhzLmxlbmd0aDtcbiAgICAgIHZhciByID0gbmV3IEFycmF5KGxlbik7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciB4ID0geHNbaV07XG4gICAgICAgIHJbaV0gPSBmKHgsIGkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcbiAgICB2YXIgZWFjaCA9IGZ1bmN0aW9uICh4cywgZikge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHhzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciB4ID0geHNbaV07XG4gICAgICAgIGYoeCwgaSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgZmlsdGVyID0gZnVuY3Rpb24gKHhzLCBwcmVkKSB7XG4gICAgICB2YXIgciA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHhzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciB4ID0geHNbaV07XG4gICAgICAgIGlmIChwcmVkKHgsIGkpKSB7XG4gICAgICAgICAgci5wdXNoKHgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcjtcbiAgICB9O1xuICAgIHZhciBncm91cEJ5ID0gZnVuY3Rpb24gKHhzLCBmKSB7XG4gICAgICBpZiAoeHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciB3YXNUeXBlID0gZih4c1swXSk7XG4gICAgICAgIHZhciByID0gW107XG4gICAgICAgIHZhciBncm91cCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0geHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICB2YXIgeCA9IHhzW2ldO1xuICAgICAgICAgIHZhciB0eXBlID0gZih4KTtcbiAgICAgICAgICBpZiAodHlwZSAhPT0gd2FzVHlwZSkge1xuICAgICAgICAgICAgci5wdXNoKGdyb3VwKTtcbiAgICAgICAgICAgIGdyb3VwID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIHdhc1R5cGUgPSB0eXBlO1xuICAgICAgICAgIGdyb3VwLnB1c2goeCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdyb3VwLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIHIucHVzaChncm91cCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHI7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgZm9sZGwgPSBmdW5jdGlvbiAoeHMsIGYsIGFjYykge1xuICAgICAgZWFjaCh4cywgZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgYWNjID0gZihhY2MsIHgpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH07XG4gICAgdmFyIGZpbmRVbnRpbCA9IGZ1bmN0aW9uICh4cywgcHJlZCwgdW50aWwpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB4cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgeCA9IHhzW2ldO1xuICAgICAgICBpZiAocHJlZCh4LCBpKSkge1xuICAgICAgICAgIHJldHVybiBPcHRpb24uc29tZSh4KTtcbiAgICAgICAgfSBlbHNlIGlmICh1bnRpbCh4LCBpKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gT3B0aW9uLm5vbmUoKTtcbiAgICB9O1xuICAgIHZhciBmaW5kID0gZnVuY3Rpb24gKHhzLCBwcmVkKSB7XG4gICAgICByZXR1cm4gZmluZFVudGlsKHhzLCBwcmVkLCBuZXZlcik7XG4gICAgfTtcbiAgICB2YXIgZmxhdHRlbiA9IGZ1bmN0aW9uICh4cykge1xuICAgICAgdmFyIHIgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB4cy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICBpZiAoIWlzQXJyYXkoeHNbaV0pKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcnIuZmxhdHRlbiBpdGVtICcgKyBpICsgJyB3YXMgbm90IGFuIGFycmF5LCBpbnB1dDogJyArIHhzKTtcbiAgICAgICAgfVxuICAgICAgICBuYXRpdmVQdXNoLmFwcGx5KHIsIHhzW2ldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByO1xuICAgIH07XG4gICAgdmFyIGJpbmQgPSBmdW5jdGlvbiAoeHMsIGYpIHtcbiAgICAgIHJldHVybiBmbGF0dGVuKG1hcCh4cywgZikpO1xuICAgIH07XG4gICAgdmFyIHJldmVyc2UgPSBmdW5jdGlvbiAoeHMpIHtcbiAgICAgIHZhciByID0gbmF0aXZlU2xpY2UuY2FsbCh4cywgMCk7XG4gICAgICByLnJldmVyc2UoKTtcbiAgICAgIHJldHVybiByO1xuICAgIH07XG4gICAgdmFyIGhlYWQgPSBmdW5jdGlvbiAoeHMpIHtcbiAgICAgIHJldHVybiB4cy5sZW5ndGggPT09IDAgPyBPcHRpb24ubm9uZSgpIDogT3B0aW9uLnNvbWUoeHNbMF0pO1xuICAgIH07XG4gICAgdmFyIGxhc3QgPSBmdW5jdGlvbiAoeHMpIHtcbiAgICAgIHJldHVybiB4cy5sZW5ndGggPT09IDAgPyBPcHRpb24ubm9uZSgpIDogT3B0aW9uLnNvbWUoeHNbeHMubGVuZ3RoIC0gMV0pO1xuICAgIH07XG5cbiAgICB2YXIgY29tcGFyZURvY3VtZW50UG9zaXRpb24gPSBmdW5jdGlvbiAoYSwgYiwgbWF0Y2gpIHtcbiAgICAgIHJldHVybiAoYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihiKSAmIG1hdGNoKSAhPT0gMDtcbiAgICB9O1xuICAgIHZhciBkb2N1bWVudFBvc2l0aW9uQ29udGFpbmVkQnkgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKGEsIGIsIGRvbUdsb2JhbHMuTm9kZS5ET0NVTUVOVF9QT1NJVElPTl9DT05UQUlORURfQlkpO1xuICAgIH07XG5cbiAgICB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgIGZvciAodmFyIHAgaW4gcylcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgICAgfTtcbiAgICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICB2YXIgY2FjaGVkID0gZnVuY3Rpb24gKGYpIHtcbiAgICAgIHZhciBjYWxsZWQgPSBmYWxzZTtcbiAgICAgIHZhciByO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjYWxsZWQpIHtcbiAgICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgICAgIHIgPSBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByO1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIGZpcnN0TWF0Y2ggPSBmdW5jdGlvbiAocmVnZXhlcywgcykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWdleGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB4ID0gcmVnZXhlc1tpXTtcbiAgICAgICAgaWYgKHgudGVzdChzKSkge1xuICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgdmFyIGZpbmQkMSA9IGZ1bmN0aW9uIChyZWdleGVzLCBhZ2VudCkge1xuICAgICAgdmFyIHIgPSBmaXJzdE1hdGNoKHJlZ2V4ZXMsIGFnZW50KTtcbiAgICAgIGlmICghcikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG1ham9yOiAwLFxuICAgICAgICAgIG1pbm9yOiAwXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICB2YXIgZ3JvdXAgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICByZXR1cm4gTnVtYmVyKGFnZW50LnJlcGxhY2UociwgJyQnICsgaSkpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBudShncm91cCgxKSwgZ3JvdXAoMikpO1xuICAgIH07XG4gICAgdmFyIGRldGVjdCA9IGZ1bmN0aW9uICh2ZXJzaW9uUmVnZXhlcywgYWdlbnQpIHtcbiAgICAgIHZhciBjbGVhbmVkQWdlbnQgPSBTdHJpbmcoYWdlbnQpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAodmVyc2lvblJlZ2V4ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiB1bmtub3duKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmluZCQxKHZlcnNpb25SZWdleGVzLCBjbGVhbmVkQWdlbnQpO1xuICAgIH07XG4gICAgdmFyIHVua25vd24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbnUoMCwgMCk7XG4gICAgfTtcbiAgICB2YXIgbnUgPSBmdW5jdGlvbiAobWFqb3IsIG1pbm9yKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtYWpvcjogbWFqb3IsXG4gICAgICAgIG1pbm9yOiBtaW5vclxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBWZXJzaW9uID0ge1xuICAgICAgbnU6IG51LFxuICAgICAgZGV0ZWN0OiBkZXRlY3QsXG4gICAgICB1bmtub3duOiB1bmtub3duXG4gICAgfTtcblxuICAgIHZhciBlZGdlID0gJ0VkZ2UnO1xuICAgIHZhciBjaHJvbWUgPSAnQ2hyb21lJztcbiAgICB2YXIgaWUgPSAnSUUnO1xuICAgIHZhciBvcGVyYSA9ICdPcGVyYSc7XG4gICAgdmFyIGZpcmVmb3ggPSAnRmlyZWZveCc7XG4gICAgdmFyIHNhZmFyaSA9ICdTYWZhcmknO1xuICAgIHZhciB1bmtub3duJDEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbnUkMSh7XG4gICAgICAgIGN1cnJlbnQ6IHVuZGVmaW5lZCxcbiAgICAgICAgdmVyc2lvbjogVmVyc2lvbi51bmtub3duKClcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIG51JDEgPSBmdW5jdGlvbiAoaW5mbykge1xuICAgICAgdmFyIGN1cnJlbnQgPSBpbmZvLmN1cnJlbnQ7XG4gICAgICB2YXIgdmVyc2lvbiA9IGluZm8udmVyc2lvbjtcbiAgICAgIHZhciBpc0Jyb3dzZXIgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBjdXJyZW50ID09PSBuYW1lO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGN1cnJlbnQ6IGN1cnJlbnQsXG4gICAgICAgIHZlcnNpb246IHZlcnNpb24sXG4gICAgICAgIGlzRWRnZTogaXNCcm93c2VyKGVkZ2UpLFxuICAgICAgICBpc0Nocm9tZTogaXNCcm93c2VyKGNocm9tZSksXG4gICAgICAgIGlzSUU6IGlzQnJvd3NlcihpZSksXG4gICAgICAgIGlzT3BlcmE6IGlzQnJvd3NlcihvcGVyYSksXG4gICAgICAgIGlzRmlyZWZveDogaXNCcm93c2VyKGZpcmVmb3gpLFxuICAgICAgICBpc1NhZmFyaTogaXNCcm93c2VyKHNhZmFyaSlcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgQnJvd3NlciA9IHtcbiAgICAgIHVua25vd246IHVua25vd24kMSxcbiAgICAgIG51OiBudSQxLFxuICAgICAgZWRnZTogY29uc3RhbnQoZWRnZSksXG4gICAgICBjaHJvbWU6IGNvbnN0YW50KGNocm9tZSksXG4gICAgICBpZTogY29uc3RhbnQoaWUpLFxuICAgICAgb3BlcmE6IGNvbnN0YW50KG9wZXJhKSxcbiAgICAgIGZpcmVmb3g6IGNvbnN0YW50KGZpcmVmb3gpLFxuICAgICAgc2FmYXJpOiBjb25zdGFudChzYWZhcmkpXG4gICAgfTtcblxuICAgIHZhciB3aW5kb3dzID0gJ1dpbmRvd3MnO1xuICAgIHZhciBpb3MgPSAnaU9TJztcbiAgICB2YXIgYW5kcm9pZCA9ICdBbmRyb2lkJztcbiAgICB2YXIgbGludXggPSAnTGludXgnO1xuICAgIHZhciBvc3ggPSAnT1NYJztcbiAgICB2YXIgc29sYXJpcyA9ICdTb2xhcmlzJztcbiAgICB2YXIgZnJlZWJzZCA9ICdGcmVlQlNEJztcbiAgICB2YXIgY2hyb21lb3MgPSAnQ2hyb21lT1MnO1xuICAgIHZhciB1bmtub3duJDIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbnUkMih7XG4gICAgICAgIGN1cnJlbnQ6IHVuZGVmaW5lZCxcbiAgICAgICAgdmVyc2lvbjogVmVyc2lvbi51bmtub3duKClcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIG51JDIgPSBmdW5jdGlvbiAoaW5mbykge1xuICAgICAgdmFyIGN1cnJlbnQgPSBpbmZvLmN1cnJlbnQ7XG4gICAgICB2YXIgdmVyc2lvbiA9IGluZm8udmVyc2lvbjtcbiAgICAgIHZhciBpc09TID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gY3VycmVudCA9PT0gbmFtZTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjdXJyZW50OiBjdXJyZW50LFxuICAgICAgICB2ZXJzaW9uOiB2ZXJzaW9uLFxuICAgICAgICBpc1dpbmRvd3M6IGlzT1Mod2luZG93cyksXG4gICAgICAgIGlzaU9TOiBpc09TKGlvcyksXG4gICAgICAgIGlzQW5kcm9pZDogaXNPUyhhbmRyb2lkKSxcbiAgICAgICAgaXNPU1g6IGlzT1Mob3N4KSxcbiAgICAgICAgaXNMaW51eDogaXNPUyhsaW51eCksXG4gICAgICAgIGlzU29sYXJpczogaXNPUyhzb2xhcmlzKSxcbiAgICAgICAgaXNGcmVlQlNEOiBpc09TKGZyZWVic2QpLFxuICAgICAgICBpc0Nocm9tZU9TOiBpc09TKGNocm9tZW9zKVxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBPcGVyYXRpbmdTeXN0ZW0gPSB7XG4gICAgICB1bmtub3duOiB1bmtub3duJDIsXG4gICAgICBudTogbnUkMixcbiAgICAgIHdpbmRvd3M6IGNvbnN0YW50KHdpbmRvd3MpLFxuICAgICAgaW9zOiBjb25zdGFudChpb3MpLFxuICAgICAgYW5kcm9pZDogY29uc3RhbnQoYW5kcm9pZCksXG4gICAgICBsaW51eDogY29uc3RhbnQobGludXgpLFxuICAgICAgb3N4OiBjb25zdGFudChvc3gpLFxuICAgICAgc29sYXJpczogY29uc3RhbnQoc29sYXJpcyksXG4gICAgICBmcmVlYnNkOiBjb25zdGFudChmcmVlYnNkKSxcbiAgICAgIGNocm9tZW9zOiBjb25zdGFudChjaHJvbWVvcylcbiAgICB9O1xuXG4gICAgdmFyIERldmljZVR5cGUgPSBmdW5jdGlvbiAob3MsIGJyb3dzZXIsIHVzZXJBZ2VudCwgbWVkaWFNYXRjaCkge1xuICAgICAgdmFyIGlzaVBhZCA9IG9zLmlzaU9TKCkgJiYgL2lwYWQvaS50ZXN0KHVzZXJBZ2VudCkgPT09IHRydWU7XG4gICAgICB2YXIgaXNpUGhvbmUgPSBvcy5pc2lPUygpICYmICFpc2lQYWQ7XG4gICAgICB2YXIgaXNNb2JpbGUgPSBvcy5pc2lPUygpIHx8IG9zLmlzQW5kcm9pZCgpO1xuICAgICAgdmFyIGlzVG91Y2ggPSBpc01vYmlsZSB8fCBtZWRpYU1hdGNoKCcocG9pbnRlcjpjb2Fyc2UpJyk7XG4gICAgICB2YXIgaXNUYWJsZXQgPSBpc2lQYWQgfHwgIWlzaVBob25lICYmIGlzTW9iaWxlICYmIG1lZGlhTWF0Y2goJyhtaW4tZGV2aWNlLXdpZHRoOjc2OHB4KScpO1xuICAgICAgdmFyIGlzUGhvbmUgPSBpc2lQaG9uZSB8fCBpc01vYmlsZSAmJiAhaXNUYWJsZXQ7XG4gICAgICB2YXIgaU9Td2VidmlldyA9IGJyb3dzZXIuaXNTYWZhcmkoKSAmJiBvcy5pc2lPUygpICYmIC9zYWZhcmkvaS50ZXN0KHVzZXJBZ2VudCkgPT09IGZhbHNlO1xuICAgICAgdmFyIGlzRGVza3RvcCA9ICFpc1Bob25lICYmICFpc1RhYmxldCAmJiAhaU9Td2VidmlldztcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzaVBhZDogY29uc3RhbnQoaXNpUGFkKSxcbiAgICAgICAgaXNpUGhvbmU6IGNvbnN0YW50KGlzaVBob25lKSxcbiAgICAgICAgaXNUYWJsZXQ6IGNvbnN0YW50KGlzVGFibGV0KSxcbiAgICAgICAgaXNQaG9uZTogY29uc3RhbnQoaXNQaG9uZSksXG4gICAgICAgIGlzVG91Y2g6IGNvbnN0YW50KGlzVG91Y2gpLFxuICAgICAgICBpc0FuZHJvaWQ6IG9zLmlzQW5kcm9pZCxcbiAgICAgICAgaXNpT1M6IG9zLmlzaU9TLFxuICAgICAgICBpc1dlYlZpZXc6IGNvbnN0YW50KGlPU3dlYnZpZXcpLFxuICAgICAgICBpc0Rlc2t0b3A6IGNvbnN0YW50KGlzRGVza3RvcClcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciBkZXRlY3QkMSA9IGZ1bmN0aW9uIChjYW5kaWRhdGVzLCB1c2VyQWdlbnQpIHtcbiAgICAgIHZhciBhZ2VudCA9IFN0cmluZyh1c2VyQWdlbnQpLnRvTG93ZXJDYXNlKCk7XG4gICAgICByZXR1cm4gZmluZChjYW5kaWRhdGVzLCBmdW5jdGlvbiAoY2FuZGlkYXRlKSB7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUuc2VhcmNoKGFnZW50KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGRldGVjdEJyb3dzZXIgPSBmdW5jdGlvbiAoYnJvd3NlcnMsIHVzZXJBZ2VudCkge1xuICAgICAgcmV0dXJuIGRldGVjdCQxKGJyb3dzZXJzLCB1c2VyQWdlbnQpLm1hcChmdW5jdGlvbiAoYnJvd3Nlcikge1xuICAgICAgICB2YXIgdmVyc2lvbiA9IFZlcnNpb24uZGV0ZWN0KGJyb3dzZXIudmVyc2lvblJlZ2V4ZXMsIHVzZXJBZ2VudCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY3VycmVudDogYnJvd3Nlci5uYW1lLFxuICAgICAgICAgIHZlcnNpb246IHZlcnNpb25cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGRldGVjdE9zID0gZnVuY3Rpb24gKG9zZXMsIHVzZXJBZ2VudCkge1xuICAgICAgcmV0dXJuIGRldGVjdCQxKG9zZXMsIHVzZXJBZ2VudCkubWFwKGZ1bmN0aW9uIChvcykge1xuICAgICAgICB2YXIgdmVyc2lvbiA9IFZlcnNpb24uZGV0ZWN0KG9zLnZlcnNpb25SZWdleGVzLCB1c2VyQWdlbnQpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGN1cnJlbnQ6IG9zLm5hbWUsXG4gICAgICAgICAgdmVyc2lvbjogdmVyc2lvblxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgVWFTdHJpbmcgPSB7XG4gICAgICBkZXRlY3RCcm93c2VyOiBkZXRlY3RCcm93c2VyLFxuICAgICAgZGV0ZWN0T3M6IGRldGVjdE9zXG4gICAgfTtcblxuICAgIHZhciBjb250YWlucyA9IGZ1bmN0aW9uIChzdHIsIHN1YnN0cikge1xuICAgICAgcmV0dXJuIHN0ci5pbmRleE9mKHN1YnN0cikgIT09IC0xO1xuICAgIH07XG5cbiAgICB2YXIgbm9ybWFsVmVyc2lvblJlZ2V4ID0gLy4qP3ZlcnNpb25cXC9cXCA/KFswLTldKylcXC4oWzAtOV0rKS4qLztcbiAgICB2YXIgY2hlY2tDb250YWlucyA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAodWFzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5zKHVhc3RyaW5nLCB0YXJnZXQpO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBicm93c2VycyA9IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0VkZ2UnLFxuICAgICAgICB2ZXJzaW9uUmVnZXhlczogWy8uKj9lZGdlXFwvID8oWzAtOV0rKVxcLihbMC05XSspJC9dLFxuICAgICAgICBzZWFyY2g6IGZ1bmN0aW9uICh1YXN0cmluZykge1xuICAgICAgICAgIHJldHVybiBjb250YWlucyh1YXN0cmluZywgJ2VkZ2UvJykgJiYgY29udGFpbnModWFzdHJpbmcsICdjaHJvbWUnKSAmJiBjb250YWlucyh1YXN0cmluZywgJ3NhZmFyaScpICYmIGNvbnRhaW5zKHVhc3RyaW5nLCAnYXBwbGV3ZWJraXQnKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0Nocm9tZScsXG4gICAgICAgIHZlcnNpb25SZWdleGVzOiBbXG4gICAgICAgICAgLy4qP2Nocm9tZVxcLyhbMC05XSspXFwuKFswLTldKykuKi8sXG4gICAgICAgICAgbm9ybWFsVmVyc2lvblJlZ2V4XG4gICAgICAgIF0sXG4gICAgICAgIHNlYXJjaDogZnVuY3Rpb24gKHVhc3RyaW5nKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnRhaW5zKHVhc3RyaW5nLCAnY2hyb21lJykgJiYgIWNvbnRhaW5zKHVhc3RyaW5nLCAnY2hyb21lZnJhbWUnKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0lFJyxcbiAgICAgICAgdmVyc2lvblJlZ2V4ZXM6IFtcbiAgICAgICAgICAvLio/bXNpZVxcID8oWzAtOV0rKVxcLihbMC05XSspLiovLFxuICAgICAgICAgIC8uKj9ydjooWzAtOV0rKVxcLihbMC05XSspLiovXG4gICAgICAgIF0sXG4gICAgICAgIHNlYXJjaDogZnVuY3Rpb24gKHVhc3RyaW5nKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnRhaW5zKHVhc3RyaW5nLCAnbXNpZScpIHx8IGNvbnRhaW5zKHVhc3RyaW5nLCAndHJpZGVudCcpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnT3BlcmEnLFxuICAgICAgICB2ZXJzaW9uUmVnZXhlczogW1xuICAgICAgICAgIG5vcm1hbFZlcnNpb25SZWdleCxcbiAgICAgICAgICAvLio/b3BlcmFcXC8oWzAtOV0rKVxcLihbMC05XSspLiovXG4gICAgICAgIF0sXG4gICAgICAgIHNlYXJjaDogY2hlY2tDb250YWlucygnb3BlcmEnKVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0ZpcmVmb3gnLFxuICAgICAgICB2ZXJzaW9uUmVnZXhlczogWy8uKj9maXJlZm94XFwvXFwgPyhbMC05XSspXFwuKFswLTldKykuKi9dLFxuICAgICAgICBzZWFyY2g6IGNoZWNrQ29udGFpbnMoJ2ZpcmVmb3gnKVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1NhZmFyaScsXG4gICAgICAgIHZlcnNpb25SZWdleGVzOiBbXG4gICAgICAgICAgbm9ybWFsVmVyc2lvblJlZ2V4LFxuICAgICAgICAgIC8uKj9jcHUgb3MgKFswLTldKylfKFswLTldKykuKi9cbiAgICAgICAgXSxcbiAgICAgICAgc2VhcmNoOiBmdW5jdGlvbiAodWFzdHJpbmcpIHtcbiAgICAgICAgICByZXR1cm4gKGNvbnRhaW5zKHVhc3RyaW5nLCAnc2FmYXJpJykgfHwgY29udGFpbnModWFzdHJpbmcsICdtb2JpbGUvJykpICYmIGNvbnRhaW5zKHVhc3RyaW5nLCAnYXBwbGV3ZWJraXQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIF07XG4gICAgdmFyIG9zZXMgPSBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdXaW5kb3dzJyxcbiAgICAgICAgc2VhcmNoOiBjaGVja0NvbnRhaW5zKCd3aW4nKSxcbiAgICAgICAgdmVyc2lvblJlZ2V4ZXM6IFsvLio/d2luZG93c1xcIG50XFwgPyhbMC05XSspXFwuKFswLTldKykuKi9dXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnaU9TJyxcbiAgICAgICAgc2VhcmNoOiBmdW5jdGlvbiAodWFzdHJpbmcpIHtcbiAgICAgICAgICByZXR1cm4gY29udGFpbnModWFzdHJpbmcsICdpcGhvbmUnKSB8fCBjb250YWlucyh1YXN0cmluZywgJ2lwYWQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgdmVyc2lvblJlZ2V4ZXM6IFtcbiAgICAgICAgICAvLio/dmVyc2lvblxcL1xcID8oWzAtOV0rKVxcLihbMC05XSspLiovLFxuICAgICAgICAgIC8uKmNwdSBvcyAoWzAtOV0rKV8oWzAtOV0rKS4qLyxcbiAgICAgICAgICAvLipjcHUgaXBob25lIG9zIChbMC05XSspXyhbMC05XSspLiovXG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdBbmRyb2lkJyxcbiAgICAgICAgc2VhcmNoOiBjaGVja0NvbnRhaW5zKCdhbmRyb2lkJyksXG4gICAgICAgIHZlcnNpb25SZWdleGVzOiBbLy4qP2FuZHJvaWRcXCA/KFswLTldKylcXC4oWzAtOV0rKS4qL11cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdPU1gnLFxuICAgICAgICBzZWFyY2g6IGNoZWNrQ29udGFpbnMoJ21hYyBvcyB4JyksXG4gICAgICAgIHZlcnNpb25SZWdleGVzOiBbLy4qP21hY1xcIG9zXFwgeFxcID8oWzAtOV0rKV8oWzAtOV0rKS4qL11cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdMaW51eCcsXG4gICAgICAgIHNlYXJjaDogY2hlY2tDb250YWlucygnbGludXgnKSxcbiAgICAgICAgdmVyc2lvblJlZ2V4ZXM6IFtdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnU29sYXJpcycsXG4gICAgICAgIHNlYXJjaDogY2hlY2tDb250YWlucygnc3Vub3MnKSxcbiAgICAgICAgdmVyc2lvblJlZ2V4ZXM6IFtdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnRnJlZUJTRCcsXG4gICAgICAgIHNlYXJjaDogY2hlY2tDb250YWlucygnZnJlZWJzZCcpLFxuICAgICAgICB2ZXJzaW9uUmVnZXhlczogW11cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdDaHJvbWVPUycsXG4gICAgICAgIHNlYXJjaDogY2hlY2tDb250YWlucygnY3JvcycpLFxuICAgICAgICB2ZXJzaW9uUmVnZXhlczogWy8uKj9jaHJvbWVcXC8oWzAtOV0rKVxcLihbMC05XSspLiovXVxuICAgICAgfVxuICAgIF07XG4gICAgdmFyIFBsYXRmb3JtSW5mbyA9IHtcbiAgICAgIGJyb3dzZXJzOiBjb25zdGFudChicm93c2VycyksXG4gICAgICBvc2VzOiBjb25zdGFudChvc2VzKVxuICAgIH07XG5cbiAgICB2YXIgZGV0ZWN0JDIgPSBmdW5jdGlvbiAodXNlckFnZW50LCBtZWRpYU1hdGNoKSB7XG4gICAgICB2YXIgYnJvd3NlcnMgPSBQbGF0Zm9ybUluZm8uYnJvd3NlcnMoKTtcbiAgICAgIHZhciBvc2VzID0gUGxhdGZvcm1JbmZvLm9zZXMoKTtcbiAgICAgIHZhciBicm93c2VyID0gVWFTdHJpbmcuZGV0ZWN0QnJvd3Nlcihicm93c2VycywgdXNlckFnZW50KS5mb2xkKEJyb3dzZXIudW5rbm93biwgQnJvd3Nlci5udSk7XG4gICAgICB2YXIgb3MgPSBVYVN0cmluZy5kZXRlY3RPcyhvc2VzLCB1c2VyQWdlbnQpLmZvbGQoT3BlcmF0aW5nU3lzdGVtLnVua25vd24sIE9wZXJhdGluZ1N5c3RlbS5udSk7XG4gICAgICB2YXIgZGV2aWNlVHlwZSA9IERldmljZVR5cGUob3MsIGJyb3dzZXIsIHVzZXJBZ2VudCwgbWVkaWFNYXRjaCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBicm93c2VyOiBicm93c2VyLFxuICAgICAgICBvczogb3MsXG4gICAgICAgIGRldmljZVR5cGU6IGRldmljZVR5cGVcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgUGxhdGZvcm1EZXRlY3Rpb24gPSB7IGRldGVjdDogZGV0ZWN0JDIgfTtcblxuICAgIHZhciBtZWRpYU1hdGNoID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICByZXR1cm4gZG9tR2xvYmFscy53aW5kb3cubWF0Y2hNZWRpYShxdWVyeSkubWF0Y2hlcztcbiAgICB9O1xuICAgIHZhciBwbGF0Zm9ybSA9IGNhY2hlZChmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gUGxhdGZvcm1EZXRlY3Rpb24uZGV0ZWN0KGRvbUdsb2JhbHMubmF2aWdhdG9yLnVzZXJBZ2VudCwgbWVkaWFNYXRjaCk7XG4gICAgfSk7XG4gICAgdmFyIGRldGVjdCQzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHBsYXRmb3JtKCk7XG4gICAgfTtcblxuICAgIHZhciBmcm9tSHRtbCA9IGZ1bmN0aW9uIChodG1sLCBzY29wZSkge1xuICAgICAgdmFyIGRvYyA9IHNjb3BlIHx8IGRvbUdsb2JhbHMuZG9jdW1lbnQ7XG4gICAgICB2YXIgZGl2ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZGl2LmlubmVySFRNTCA9IGh0bWw7XG4gICAgICBpZiAoIWRpdi5oYXNDaGlsZE5vZGVzKCkgfHwgZGl2LmNoaWxkTm9kZXMubGVuZ3RoID4gMSkge1xuICAgICAgICBkb21HbG9iYWxzLmNvbnNvbGUuZXJyb3IoJ0hUTUwgZG9lcyBub3QgaGF2ZSBhIHNpbmdsZSByb290IG5vZGUnLCBodG1sKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdIVE1MIG11c3QgaGF2ZSBhIHNpbmdsZSByb290IG5vZGUnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmcm9tRG9tKGRpdi5jaGlsZE5vZGVzWzBdKTtcbiAgICB9O1xuICAgIHZhciBmcm9tVGFnID0gZnVuY3Rpb24gKHRhZywgc2NvcGUpIHtcbiAgICAgIHZhciBkb2MgPSBzY29wZSB8fCBkb21HbG9iYWxzLmRvY3VtZW50O1xuICAgICAgdmFyIG5vZGUgPSBkb2MuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgICAgcmV0dXJuIGZyb21Eb20obm9kZSk7XG4gICAgfTtcbiAgICB2YXIgZnJvbVRleHQgPSBmdW5jdGlvbiAodGV4dCwgc2NvcGUpIHtcbiAgICAgIHZhciBkb2MgPSBzY29wZSB8fCBkb21HbG9iYWxzLmRvY3VtZW50O1xuICAgICAgdmFyIG5vZGUgPSBkb2MuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG4gICAgICByZXR1cm4gZnJvbURvbShub2RlKTtcbiAgICB9O1xuICAgIHZhciBmcm9tRG9tID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIGlmIChub2RlID09PSBudWxsIHx8IG5vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vZGUgY2Fubm90IGJlIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4geyBkb206IGNvbnN0YW50KG5vZGUpIH07XG4gICAgfTtcbiAgICB2YXIgZnJvbVBvaW50ID0gZnVuY3Rpb24gKGRvY0VsbSwgeCwgeSkge1xuICAgICAgdmFyIGRvYyA9IGRvY0VsbS5kb20oKTtcbiAgICAgIHJldHVybiBPcHRpb24uZnJvbShkb2MuZWxlbWVudEZyb21Qb2ludCh4LCB5KSkubWFwKGZyb21Eb20pO1xuICAgIH07XG4gICAgdmFyIEVsZW1lbnQgPSB7XG4gICAgICBmcm9tSHRtbDogZnJvbUh0bWwsXG4gICAgICBmcm9tVGFnOiBmcm9tVGFnLFxuICAgICAgZnJvbVRleHQ6IGZyb21UZXh0LFxuICAgICAgZnJvbURvbTogZnJvbURvbSxcbiAgICAgIGZyb21Qb2ludDogZnJvbVBvaW50XG4gICAgfTtcblxuICAgIHZhciBFTEVNRU5UID0gMTtcblxuICAgIHZhciBpcyA9IGZ1bmN0aW9uIChlbGVtZW50LCBzZWxlY3Rvcikge1xuICAgICAgdmFyIGRvbSA9IGVsZW1lbnQuZG9tKCk7XG4gICAgICBpZiAoZG9tLm5vZGVUeXBlICE9PSBFTEVNRU5UKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBlbGVtID0gZG9tO1xuICAgICAgICBpZiAoZWxlbS5tYXRjaGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gZWxlbS5tYXRjaGVzKHNlbGVjdG9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtLm1zTWF0Y2hlc1NlbGVjdG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gZWxlbS5tc01hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBlbGVtLndlYmtpdE1hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbS5tb3pNYXRjaGVzU2VsZWN0b3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBlbGVtLm1vek1hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCcm93c2VyIGxhY2tzIG5hdGl2ZSBzZWxlY3RvcnMnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgZXEgPSBmdW5jdGlvbiAoZTEsIGUyKSB7XG4gICAgICByZXR1cm4gZTEuZG9tKCkgPT09IGUyLmRvbSgpO1xuICAgIH07XG4gICAgdmFyIHJlZ3VsYXJDb250YWlucyA9IGZ1bmN0aW9uIChlMSwgZTIpIHtcbiAgICAgIHZhciBkMSA9IGUxLmRvbSgpO1xuICAgICAgdmFyIGQyID0gZTIuZG9tKCk7XG4gICAgICByZXR1cm4gZDEgPT09IGQyID8gZmFsc2UgOiBkMS5jb250YWlucyhkMik7XG4gICAgfTtcbiAgICB2YXIgaWVDb250YWlucyA9IGZ1bmN0aW9uIChlMSwgZTIpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudFBvc2l0aW9uQ29udGFpbmVkQnkoZTEuZG9tKCksIGUyLmRvbSgpKTtcbiAgICB9O1xuICAgIHZhciBjb250YWlucyQxID0gZnVuY3Rpb24gKGUxLCBlMikge1xuICAgICAgcmV0dXJuIGRldGVjdCQzKCkuYnJvd3Nlci5pc0lFKCkgPyBpZUNvbnRhaW5zKGUxLCBlMikgOiByZWd1bGFyQ29udGFpbnMoZTEsIGUyKTtcbiAgICB9O1xuICAgIHZhciBpcyQxID0gaXM7XG5cbiAgICB2YXIgZ2xvYmFsJDEgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5kb20uUmFuZ2VVdGlscycpO1xuXG4gICAgdmFyIGdsb2JhbCQyID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuZG9tLlRyZWVXYWxrZXInKTtcblxuICAgIHZhciBnbG9iYWwkMyA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuVksnKTtcblxuICAgIHZhciBsaWZ0MiA9IGZ1bmN0aW9uIChvYSwgb2IsIGYpIHtcbiAgICAgIHJldHVybiBvYS5pc1NvbWUoKSAmJiBvYi5pc1NvbWUoKSA/IE9wdGlvbi5zb21lKGYob2EuZ2V0T3JEaWUoKSwgb2IuZ2V0T3JEaWUoKSkpIDogT3B0aW9uLm5vbmUoKTtcbiAgICB9O1xuXG4gICAgdmFyIGZyb21FbGVtZW50cyA9IGZ1bmN0aW9uIChlbGVtZW50cywgc2NvcGUpIHtcbiAgICAgIHZhciBkb2MgPSBzY29wZSB8fCBkb21HbG9iYWxzLmRvY3VtZW50O1xuICAgICAgdmFyIGZyYWdtZW50ID0gZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgIGVhY2goZWxlbWVudHMsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQuZG9tKCkpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gRWxlbWVudC5mcm9tRG9tKGZyYWdtZW50KTtcbiAgICB9O1xuXG4gICAgdmFyIEdsb2JhbCA9IHR5cGVvZiBkb21HbG9iYWxzLndpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyBkb21HbG9iYWxzLndpbmRvdyA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpczsnKSgpO1xuXG4gICAgdmFyIG5hbWUgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgdmFyIHIgPSBlbGVtZW50LmRvbSgpLm5vZGVOYW1lO1xuICAgICAgcmV0dXJuIHIudG9Mb3dlckNhc2UoKTtcbiAgICB9O1xuICAgIHZhciB0eXBlID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBlbGVtZW50LmRvbSgpLm5vZGVUeXBlO1xuICAgIH07XG4gICAgdmFyIGlzVHlwZSQxID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdHlwZShlbGVtZW50KSA9PT0gdDtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgaXNFbGVtZW50ID0gaXNUeXBlJDEoRUxFTUVOVCk7XG5cbiAgICB2YXIgcGFyZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBPcHRpb24uZnJvbShlbGVtZW50LmRvbSgpLnBhcmVudE5vZGUpLm1hcChFbGVtZW50LmZyb21Eb20pO1xuICAgIH07XG4gICAgdmFyIGNoaWxkcmVuID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBtYXAoZWxlbWVudC5kb20oKS5jaGlsZE5vZGVzLCBFbGVtZW50LmZyb21Eb20pO1xuICAgIH07XG4gICAgdmFyIGNoaWxkID0gZnVuY3Rpb24gKGVsZW1lbnQsIGluZGV4KSB7XG4gICAgICB2YXIgY3MgPSBlbGVtZW50LmRvbSgpLmNoaWxkTm9kZXM7XG4gICAgICByZXR1cm4gT3B0aW9uLmZyb20oY3NbaW5kZXhdKS5tYXAoRWxlbWVudC5mcm9tRG9tKTtcbiAgICB9O1xuICAgIHZhciBmaXJzdENoaWxkID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBjaGlsZChlbGVtZW50LCAwKTtcbiAgICB9O1xuICAgIHZhciBsYXN0Q2hpbGQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIGNoaWxkKGVsZW1lbnQsIGVsZW1lbnQuZG9tKCkuY2hpbGROb2Rlcy5sZW5ndGggLSAxKTtcbiAgICB9O1xuXG4gICAgdmFyIGJlZm9yZSA9IGZ1bmN0aW9uIChtYXJrZXIsIGVsZW1lbnQpIHtcbiAgICAgIHZhciBwYXJlbnQkMSA9IHBhcmVudChtYXJrZXIpO1xuICAgICAgcGFyZW50JDEuZWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICB2LmRvbSgpLmluc2VydEJlZm9yZShlbGVtZW50LmRvbSgpLCBtYXJrZXIuZG9tKCkpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgYXBwZW5kID0gZnVuY3Rpb24gKHBhcmVudCwgZWxlbWVudCkge1xuICAgICAgcGFyZW50LmRvbSgpLmFwcGVuZENoaWxkKGVsZW1lbnQuZG9tKCkpO1xuICAgIH07XG5cbiAgICB2YXIgYmVmb3JlJDEgPSBmdW5jdGlvbiAobWFya2VyLCBlbGVtZW50cykge1xuICAgICAgZWFjaChlbGVtZW50cywgZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgYmVmb3JlKG1hcmtlciwgeCk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBhcHBlbmQkMSA9IGZ1bmN0aW9uIChwYXJlbnQsIGVsZW1lbnRzKSB7XG4gICAgICBlYWNoKGVsZW1lbnRzLCBmdW5jdGlvbiAoeCkge1xuICAgICAgICBhcHBlbmQocGFyZW50LCB4KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgcmVtb3ZlID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHZhciBkb20gPSBlbGVtZW50LmRvbSgpO1xuICAgICAgaWYgKGRvbS5wYXJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICAgIGRvbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRvbSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBmaXJlTGlzdEV2ZW50ID0gZnVuY3Rpb24gKGVkaXRvciwgYWN0aW9uLCBlbGVtZW50KSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmZpcmUoJ0xpc3RNdXRhdGlvbicsIHtcbiAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgIGVsZW1lbnQ6IGVsZW1lbnRcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgZ2xvYmFsJDQgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5kb20uRG9tUXVlcnknKTtcblxuICAgIHZhciBnbG9iYWwkNSA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuVG9vbHMnKTtcblxuICAgIHZhciBtYXRjaE5vZGVOYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICByZXR1cm4gbm9kZSAmJiBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWU7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIG1hdGNoTm9kZU5hbWVzID0gZnVuY3Rpb24gKHJlZ2V4KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIG5vZGUgJiYgcmVnZXgudGVzdChub2RlLm5vZGVOYW1lKTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgaXNUZXh0Tm9kZSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICByZXR1cm4gbm9kZSAmJiBub2RlLm5vZGVUeXBlID09PSAzO1xuICAgIH07XG4gICAgdmFyIGlzTGlzdE5vZGUgPSBtYXRjaE5vZGVOYW1lcygvXihPTHxVTHxETCkkLyk7XG4gICAgdmFyIGlzT2xVbE5vZGUgPSBtYXRjaE5vZGVOYW1lcygvXihPTHxVTCkkLyk7XG4gICAgdmFyIGlzT2xOb2RlID0gbWF0Y2hOb2RlTmFtZSgnb2wnKTtcbiAgICB2YXIgaXNMaXN0SXRlbU5vZGUgPSBtYXRjaE5vZGVOYW1lcygvXihMSXxEVHxERCkkLyk7XG4gICAgdmFyIGlzRGxJdGVtTm9kZSA9IG1hdGNoTm9kZU5hbWVzKC9eKERUfEREKSQvKTtcbiAgICB2YXIgaXNUYWJsZUNlbGxOb2RlID0gbWF0Y2hOb2RlTmFtZXMoL14oVEh8VEQpJC8pO1xuICAgIHZhciBpc0JyID0gbWF0Y2hOb2RlTmFtZSgnYnInKTtcbiAgICB2YXIgaXNGaXJzdENoaWxkID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIHJldHVybiBub2RlLnBhcmVudE5vZGUuZmlyc3RDaGlsZCA9PT0gbm9kZTtcbiAgICB9O1xuICAgIHZhciBpc1RleHRCbG9jayA9IGZ1bmN0aW9uIChlZGl0b3IsIG5vZGUpIHtcbiAgICAgIHJldHVybiBub2RlICYmICEhZWRpdG9yLnNjaGVtYS5nZXRUZXh0QmxvY2tFbGVtZW50cygpW25vZGUubm9kZU5hbWVdO1xuICAgIH07XG4gICAgdmFyIGlzQmxvY2sgPSBmdW5jdGlvbiAobm9kZSwgYmxvY2tFbGVtZW50cykge1xuICAgICAgcmV0dXJuIG5vZGUgJiYgbm9kZS5ub2RlTmFtZSBpbiBibG9ja0VsZW1lbnRzO1xuICAgIH07XG4gICAgdmFyIGlzQm9ndXNCciA9IGZ1bmN0aW9uIChkb20sIG5vZGUpIHtcbiAgICAgIGlmICghaXNCcihub2RlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoZG9tLmlzQmxvY2sobm9kZS5uZXh0U2libGluZykgJiYgIWlzQnIobm9kZS5wcmV2aW91c1NpYmxpbmcpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgdmFyIGlzRW1wdHkgPSBmdW5jdGlvbiAoZG9tLCBlbG0sIGtlZXBCb29rbWFya3MpIHtcbiAgICAgIHZhciBlbXB0eSA9IGRvbS5pc0VtcHR5KGVsbSk7XG4gICAgICBpZiAoa2VlcEJvb2ttYXJrcyAmJiBkb20uc2VsZWN0KCdzcGFuW2RhdGEtbWNlLXR5cGU9Ym9va21hcmtdJywgZWxtKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlbXB0eTtcbiAgICB9O1xuICAgIHZhciBpc0NoaWxkT2ZCb2R5ID0gZnVuY3Rpb24gKGRvbSwgZWxtKSB7XG4gICAgICByZXR1cm4gZG9tLmlzQ2hpbGRPZihlbG0sIGRvbS5nZXRSb290KCkpO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0UGFyZW50TGlzdCA9IGZ1bmN0aW9uIChlZGl0b3IsIG5vZGUpIHtcbiAgICAgIHZhciBzZWxlY3Rpb25TdGFydCA9IG5vZGUgfHwgZWRpdG9yLnNlbGVjdGlvbi5nZXRTdGFydCh0cnVlKTtcbiAgICAgIHJldHVybiBlZGl0b3IuZG9tLmdldFBhcmVudChzZWxlY3Rpb25TdGFydCwgJ09MLFVMLERMJywgZ2V0Q2xvc2VzdExpc3RSb290RWxtKGVkaXRvciwgc2VsZWN0aW9uU3RhcnQpKTtcbiAgICB9O1xuICAgIHZhciBpc1BhcmVudExpc3RTZWxlY3RlZCA9IGZ1bmN0aW9uIChwYXJlbnRMaXN0LCBzZWxlY3RlZEJsb2Nrcykge1xuICAgICAgcmV0dXJuIHBhcmVudExpc3QgJiYgc2VsZWN0ZWRCbG9ja3MubGVuZ3RoID09PSAxICYmIHNlbGVjdGVkQmxvY2tzWzBdID09PSBwYXJlbnRMaXN0O1xuICAgIH07XG4gICAgdmFyIGZpbmRTdWJMaXN0cyA9IGZ1bmN0aW9uIChwYXJlbnRMaXN0KSB7XG4gICAgICByZXR1cm4gZ2xvYmFsJDUuZ3JlcChwYXJlbnRMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ29sLHVsLGRsJyksIGZ1bmN0aW9uIChlbG0pIHtcbiAgICAgICAgcmV0dXJuIGlzTGlzdE5vZGUoZWxtKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGdldFNlbGVjdGVkU3ViTGlzdHMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgcGFyZW50TGlzdCA9IGdldFBhcmVudExpc3QoZWRpdG9yKTtcbiAgICAgIHZhciBzZWxlY3RlZEJsb2NrcyA9IGVkaXRvci5zZWxlY3Rpb24uZ2V0U2VsZWN0ZWRCbG9ja3MoKTtcbiAgICAgIGlmIChpc1BhcmVudExpc3RTZWxlY3RlZChwYXJlbnRMaXN0LCBzZWxlY3RlZEJsb2NrcykpIHtcbiAgICAgICAgcmV0dXJuIGZpbmRTdWJMaXN0cyhwYXJlbnRMaXN0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBnbG9iYWwkNS5ncmVwKHNlbGVjdGVkQmxvY2tzLCBmdW5jdGlvbiAoZWxtKSB7XG4gICAgICAgICAgcmV0dXJuIGlzTGlzdE5vZGUoZWxtKSAmJiBwYXJlbnRMaXN0ICE9PSBlbG07XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGZpbmRQYXJlbnRMaXN0SXRlbXNOb2RlcyA9IGZ1bmN0aW9uIChlZGl0b3IsIGVsbXMpIHtcbiAgICAgIHZhciBsaXN0SXRlbXNFbG1zID0gZ2xvYmFsJDUubWFwKGVsbXMsIGZ1bmN0aW9uIChlbG0pIHtcbiAgICAgICAgdmFyIHBhcmVudExpID0gZWRpdG9yLmRvbS5nZXRQYXJlbnQoZWxtLCAnbGksZGQsZHQnLCBnZXRDbG9zZXN0TGlzdFJvb3RFbG0oZWRpdG9yLCBlbG0pKTtcbiAgICAgICAgcmV0dXJuIHBhcmVudExpID8gcGFyZW50TGkgOiBlbG07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBnbG9iYWwkNC51bmlxdWUobGlzdEl0ZW1zRWxtcyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0U2VsZWN0ZWRMaXN0SXRlbXMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgc2VsZWN0ZWRCbG9ja3MgPSBlZGl0b3Iuc2VsZWN0aW9uLmdldFNlbGVjdGVkQmxvY2tzKCk7XG4gICAgICByZXR1cm4gZ2xvYmFsJDUuZ3JlcChmaW5kUGFyZW50TGlzdEl0ZW1zTm9kZXMoZWRpdG9yLCBzZWxlY3RlZEJsb2NrcyksIGZ1bmN0aW9uIChibG9jaykge1xuICAgICAgICByZXR1cm4gaXNMaXN0SXRlbU5vZGUoYmxvY2spO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgZ2V0U2VsZWN0ZWREbEl0ZW1zID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGZpbHRlcihnZXRTZWxlY3RlZExpc3RJdGVtcyhlZGl0b3IpLCBpc0RsSXRlbU5vZGUpO1xuICAgIH07XG4gICAgdmFyIGdldENsb3Nlc3RMaXN0Um9vdEVsbSA9IGZ1bmN0aW9uIChlZGl0b3IsIGVsbSkge1xuICAgICAgdmFyIHBhcmVudFRhYmxlQ2VsbCA9IGVkaXRvci5kb20uZ2V0UGFyZW50cyhlbG0sICdURCxUSCcpO1xuICAgICAgdmFyIHJvb3QgPSBwYXJlbnRUYWJsZUNlbGwubGVuZ3RoID4gMCA/IHBhcmVudFRhYmxlQ2VsbFswXSA6IGVkaXRvci5nZXRCb2R5KCk7XG4gICAgICByZXR1cm4gcm9vdDtcbiAgICB9O1xuICAgIHZhciBmaW5kTGFzdFBhcmVudExpc3ROb2RlID0gZnVuY3Rpb24gKGVkaXRvciwgZWxtKSB7XG4gICAgICB2YXIgcGFyZW50TGlzdHMgPSBlZGl0b3IuZG9tLmdldFBhcmVudHMoZWxtLCAnb2wsdWwnLCBnZXRDbG9zZXN0TGlzdFJvb3RFbG0oZWRpdG9yLCBlbG0pKTtcbiAgICAgIHJldHVybiBsYXN0KHBhcmVudExpc3RzKTtcbiAgICB9O1xuICAgIHZhciBnZXRTZWxlY3RlZExpc3RzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGZpcnN0TGlzdCA9IGZpbmRMYXN0UGFyZW50TGlzdE5vZGUoZWRpdG9yLCBlZGl0b3Iuc2VsZWN0aW9uLmdldFN0YXJ0KCkpO1xuICAgICAgdmFyIHN1YnNlcXVlbnRMaXN0cyA9IGZpbHRlcihlZGl0b3Iuc2VsZWN0aW9uLmdldFNlbGVjdGVkQmxvY2tzKCksIGlzT2xVbE5vZGUpO1xuICAgICAgcmV0dXJuIGZpcnN0TGlzdC50b0FycmF5KCkuY29uY2F0KHN1YnNlcXVlbnRMaXN0cyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0U2VsZWN0ZWRMaXN0Um9vdHMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgc2VsZWN0ZWRMaXN0cyA9IGdldFNlbGVjdGVkTGlzdHMoZWRpdG9yKTtcbiAgICAgIHJldHVybiBnZXRVbmlxdWVMaXN0Um9vdHMoZWRpdG9yLCBzZWxlY3RlZExpc3RzKTtcbiAgICB9O1xuICAgIHZhciBnZXRVbmlxdWVMaXN0Um9vdHMgPSBmdW5jdGlvbiAoZWRpdG9yLCBsaXN0cykge1xuICAgICAgdmFyIGxpc3RSb290cyA9IG1hcChsaXN0cywgZnVuY3Rpb24gKGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIGZpbmRMYXN0UGFyZW50TGlzdE5vZGUoZWRpdG9yLCBsaXN0KS5nZXRPcihsaXN0KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGdsb2JhbCQ0LnVuaXF1ZShsaXN0Um9vdHMpO1xuICAgIH07XG5cbiAgICB2YXIgc2hvdWxkSW5kZW50T25UYWIgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdsaXN0c19pbmRlbnRfb25fdGFiJywgdHJ1ZSk7XG4gICAgfTtcbiAgICB2YXIgZ2V0Rm9yY2VkUm9vdEJsb2NrID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGJsb2NrID0gZWRpdG9yLmdldFBhcmFtKCdmb3JjZWRfcm9vdF9ibG9jaycsICdwJyk7XG4gICAgICBpZiAoYmxvY2sgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH0gZWxzZSBpZiAoYmxvY2sgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuICdwJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBibG9jaztcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBnZXRGb3JjZWRSb290QmxvY2tBdHRycyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2ZvcmNlZF9yb290X2Jsb2NrX2F0dHJzJywge30pO1xuICAgIH07XG5cbiAgICB2YXIgY3JlYXRlVGV4dEJsb2NrID0gZnVuY3Rpb24gKGVkaXRvciwgY29udGVudE5vZGUpIHtcbiAgICAgIHZhciBkb20gPSBlZGl0b3IuZG9tO1xuICAgICAgdmFyIGJsb2NrRWxlbWVudHMgPSBlZGl0b3Iuc2NoZW1hLmdldEJsb2NrRWxlbWVudHMoKTtcbiAgICAgIHZhciBmcmFnbWVudCA9IGRvbS5jcmVhdGVGcmFnbWVudCgpO1xuICAgICAgdmFyIGJsb2NrTmFtZSA9IGdldEZvcmNlZFJvb3RCbG9jayhlZGl0b3IpO1xuICAgICAgdmFyIG5vZGUsIHRleHRCbG9jaywgaGFzQ29udGVudE5vZGU7XG4gICAgICBpZiAoYmxvY2tOYW1lKSB7XG4gICAgICAgIHRleHRCbG9jayA9IGRvbS5jcmVhdGUoYmxvY2tOYW1lKTtcbiAgICAgICAgaWYgKHRleHRCbG9jay50YWdOYW1lID09PSBibG9ja05hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgICAgIGRvbS5zZXRBdHRyaWJzKHRleHRCbG9jaywgZ2V0Rm9yY2VkUm9vdEJsb2NrQXR0cnMoZWRpdG9yKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc0Jsb2NrKGNvbnRlbnROb2RlLmZpcnN0Q2hpbGQsIGJsb2NrRWxlbWVudHMpKSB7XG4gICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQodGV4dEJsb2NrKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGNvbnRlbnROb2RlKSB7XG4gICAgICAgIHdoaWxlIChub2RlID0gY29udGVudE5vZGUuZmlyc3RDaGlsZCkge1xuICAgICAgICAgIHZhciBub2RlTmFtZSA9IG5vZGUubm9kZU5hbWU7XG4gICAgICAgICAgaWYgKCFoYXNDb250ZW50Tm9kZSAmJiAobm9kZU5hbWUgIT09ICdTUEFOJyB8fCBub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1tY2UtdHlwZScpICE9PSAnYm9va21hcmsnKSkge1xuICAgICAgICAgICAgaGFzQ29udGVudE5vZGUgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaXNCbG9jayhub2RlLCBibG9ja0VsZW1lbnRzKSkge1xuICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICAgICAgICB0ZXh0QmxvY2sgPSBudWxsO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoYmxvY2tOYW1lKSB7XG4gICAgICAgICAgICAgIGlmICghdGV4dEJsb2NrKSB7XG4gICAgICAgICAgICAgICAgdGV4dEJsb2NrID0gZG9tLmNyZWF0ZShibG9ja05hbWUpO1xuICAgICAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHRleHRCbG9jayk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGV4dEJsb2NrLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIWJsb2NrTmFtZSkge1xuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChkb20uY3JlYXRlKCdicicpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghaGFzQ29udGVudE5vZGUpIHtcbiAgICAgICAgICB0ZXh0QmxvY2suYXBwZW5kQ2hpbGQoZG9tLmNyZWF0ZSgnYnInLCB7ICdkYXRhLW1jZS1ib2d1cyc6ICcxJyB9KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmcmFnbWVudDtcbiAgICB9O1xuXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cztcbiAgICB2YXIgZWFjaCQxID0gZnVuY3Rpb24gKG9iaiwgZikge1xuICAgICAgdmFyIHByb3BzID0ga2V5cyhvYmopO1xuICAgICAgZm9yICh2YXIgayA9IDAsIGxlbiA9IHByb3BzLmxlbmd0aDsgayA8IGxlbjsgaysrKSB7XG4gICAgICAgIHZhciBpID0gcHJvcHNba107XG4gICAgICAgIHZhciB4ID0gb2JqW2ldO1xuICAgICAgICBmKHgsIGkpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIG9iakFjYyA9IGZ1bmN0aW9uIChyKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHgsIGkpIHtcbiAgICAgICAgcltpXSA9IHg7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGludGVybmFsRmlsdGVyID0gZnVuY3Rpb24gKG9iaiwgcHJlZCwgb25UcnVlLCBvbkZhbHNlKSB7XG4gICAgICB2YXIgciA9IHt9O1xuICAgICAgZWFjaCQxKG9iaiwgZnVuY3Rpb24gKHgsIGkpIHtcbiAgICAgICAgKHByZWQoeCwgaSkgPyBvblRydWUgOiBvbkZhbHNlKSh4LCBpKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcbiAgICB2YXIgZmlsdGVyJDEgPSBmdW5jdGlvbiAob2JqLCBwcmVkKSB7XG4gICAgICB2YXIgdCA9IHt9O1xuICAgICAgaW50ZXJuYWxGaWx0ZXIob2JqLCBwcmVkLCBvYmpBY2ModCksIG5vb3ApO1xuICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcblxuICAgIHZhciByYXdTZXQgPSBmdW5jdGlvbiAoZG9tLCBrZXksIHZhbHVlKSB7XG4gICAgICBpZiAoaXNTdHJpbmcodmFsdWUpIHx8IGlzQm9vbGVhbih2YWx1ZSkgfHwgaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgICAgIGRvbS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSArICcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvbUdsb2JhbHMuY29uc29sZS5lcnJvcignSW52YWxpZCBjYWxsIHRvIEF0dHIuc2V0LiBLZXkgJywga2V5LCAnOjogVmFsdWUgJywgdmFsdWUsICc6OiBFbGVtZW50ICcsIGRvbSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQXR0cmlidXRlIHZhbHVlIHdhcyBub3Qgc2ltcGxlJyk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgc2V0QWxsID0gZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICB2YXIgZG9tID0gZWxlbWVudC5kb20oKTtcbiAgICAgIGVhY2gkMShhdHRycywgZnVuY3Rpb24gKHYsIGspIHtcbiAgICAgICAgcmF3U2V0KGRvbSwgaywgdik7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBjbG9uZSA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gZm9sZGwoZWxlbWVudC5kb20oKS5hdHRyaWJ1dGVzLCBmdW5jdGlvbiAoYWNjLCBhdHRyKSB7XG4gICAgICAgIGFjY1thdHRyLm5hbWVdID0gYXR0ci52YWx1ZTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9KTtcbiAgICB9O1xuXG4gICAgdmFyIGlzU3VwcG9ydGVkID0gZnVuY3Rpb24gKGRvbSkge1xuICAgICAgcmV0dXJuIGRvbS5zdHlsZSAhPT0gdW5kZWZpbmVkICYmIGlzRnVuY3Rpb24oZG9tLnN0eWxlLmdldFByb3BlcnR5VmFsdWUpO1xuICAgIH07XG5cbiAgICB2YXIgc3VwcG9ydGVkID0gaXNGdW5jdGlvbihkb21HbG9iYWxzLkVsZW1lbnQucHJvdG90eXBlLmF0dGFjaFNoYWRvdykgJiYgaXNGdW5jdGlvbihkb21HbG9iYWxzLk5vZGUucHJvdG90eXBlLmdldFJvb3ROb2RlKTtcblxuICAgIHZhciBpbnRlcm5hbFNldCA9IGZ1bmN0aW9uIChkb20sIHByb3BlcnR5LCB2YWx1ZSkge1xuICAgICAgaWYgKCFpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgZG9tR2xvYmFscy5jb25zb2xlLmVycm9yKCdJbnZhbGlkIGNhbGwgdG8gQ1NTLnNldC4gUHJvcGVydHkgJywgcHJvcGVydHksICc6OiBWYWx1ZSAnLCB2YWx1ZSwgJzo6IEVsZW1lbnQgJywgZG9tKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDU1MgdmFsdWUgbXVzdCBiZSBhIHN0cmluZzogJyArIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1N1cHBvcnRlZChkb20pKSB7XG4gICAgICAgIGRvbS5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHNldCA9IGZ1bmN0aW9uIChlbGVtZW50LCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICAgIHZhciBkb20gPSBlbGVtZW50LmRvbSgpO1xuICAgICAgaW50ZXJuYWxTZXQoZG9tLCBwcm9wZXJ0eSwgdmFsdWUpO1xuICAgIH07XG5cbiAgICB2YXIgY2xvbmUkMSA9IGZ1bmN0aW9uIChvcmlnaW5hbCwgaXNEZWVwKSB7XG4gICAgICByZXR1cm4gRWxlbWVudC5mcm9tRG9tKG9yaWdpbmFsLmRvbSgpLmNsb25lTm9kZShpc0RlZXApKTtcbiAgICB9O1xuICAgIHZhciBkZWVwID0gZnVuY3Rpb24gKG9yaWdpbmFsKSB7XG4gICAgICByZXR1cm4gY2xvbmUkMShvcmlnaW5hbCwgdHJ1ZSk7XG4gICAgfTtcbiAgICB2YXIgc2hhbGxvd0FzID0gZnVuY3Rpb24gKG9yaWdpbmFsLCB0YWcpIHtcbiAgICAgIHZhciBudSA9IEVsZW1lbnQuZnJvbVRhZyh0YWcpO1xuICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBjbG9uZShvcmlnaW5hbCk7XG4gICAgICBzZXRBbGwobnUsIGF0dHJpYnV0ZXMpO1xuICAgICAgcmV0dXJuIG51O1xuICAgIH07XG4gICAgdmFyIG11dGF0ZSA9IGZ1bmN0aW9uIChvcmlnaW5hbCwgdGFnKSB7XG4gICAgICB2YXIgbnUgPSBzaGFsbG93QXMob3JpZ2luYWwsIHRhZyk7XG4gICAgICBiZWZvcmUob3JpZ2luYWwsIG51KTtcbiAgICAgIHZhciBjaGlsZHJlbiQxID0gY2hpbGRyZW4ob3JpZ2luYWwpO1xuICAgICAgYXBwZW5kJDEobnUsIGNoaWxkcmVuJDEpO1xuICAgICAgcmVtb3ZlKG9yaWdpbmFsKTtcbiAgICAgIHJldHVybiBudTtcbiAgICB9O1xuXG4gICAgdmFyIGpvaW5TZWdtZW50ID0gZnVuY3Rpb24gKHBhcmVudCwgY2hpbGQpIHtcbiAgICAgIGFwcGVuZChwYXJlbnQuaXRlbSwgY2hpbGQubGlzdCk7XG4gICAgfTtcbiAgICB2YXIgam9pblNlZ21lbnRzID0gZnVuY3Rpb24gKHNlZ21lbnRzKSB7XG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHNlZ21lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGpvaW5TZWdtZW50KHNlZ21lbnRzW2kgLSAxXSwgc2VnbWVudHNbaV0pO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGFwcGVuZFNlZ21lbnRzID0gZnVuY3Rpb24gKGhlYWQkMSwgdGFpbCkge1xuICAgICAgbGlmdDIobGFzdChoZWFkJDEpLCBoZWFkKHRhaWwpLCBqb2luU2VnbWVudCk7XG4gICAgfTtcbiAgICB2YXIgY3JlYXRlU2VnbWVudCA9IGZ1bmN0aW9uIChzY29wZSwgbGlzdFR5cGUpIHtcbiAgICAgIHZhciBzZWdtZW50ID0ge1xuICAgICAgICBsaXN0OiBFbGVtZW50LmZyb21UYWcobGlzdFR5cGUsIHNjb3BlKSxcbiAgICAgICAgaXRlbTogRWxlbWVudC5mcm9tVGFnKCdsaScsIHNjb3BlKVxuICAgICAgfTtcbiAgICAgIGFwcGVuZChzZWdtZW50Lmxpc3QsIHNlZ21lbnQuaXRlbSk7XG4gICAgICByZXR1cm4gc2VnbWVudDtcbiAgICB9O1xuICAgIHZhciBjcmVhdGVTZWdtZW50cyA9IGZ1bmN0aW9uIChzY29wZSwgZW50cnksIHNpemUpIHtcbiAgICAgIHZhciBzZWdtZW50cyA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgc2VnbWVudHMucHVzaChjcmVhdGVTZWdtZW50KHNjb3BlLCBlbnRyeS5saXN0VHlwZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlZ21lbnRzO1xuICAgIH07XG4gICAgdmFyIHBvcHVsYXRlU2VnbWVudHMgPSBmdW5jdGlvbiAoc2VnbWVudHMsIGVudHJ5KSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlZ21lbnRzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICBzZXQoc2VnbWVudHNbaV0uaXRlbSwgJ2xpc3Qtc3R5bGUtdHlwZScsICdub25lJyk7XG4gICAgICB9XG4gICAgICBsYXN0KHNlZ21lbnRzKS5lYWNoKGZ1bmN0aW9uIChzZWdtZW50KSB7XG4gICAgICAgIHNldEFsbChzZWdtZW50Lmxpc3QsIGVudHJ5Lmxpc3RBdHRyaWJ1dGVzKTtcbiAgICAgICAgc2V0QWxsKHNlZ21lbnQuaXRlbSwgZW50cnkuaXRlbUF0dHJpYnV0ZXMpO1xuICAgICAgICBhcHBlbmQkMShzZWdtZW50Lml0ZW0sIGVudHJ5LmNvbnRlbnQpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgbm9ybWFsaXplU2VnbWVudCA9IGZ1bmN0aW9uIChzZWdtZW50LCBlbnRyeSkge1xuICAgICAgaWYgKG5hbWUoc2VnbWVudC5saXN0KSAhPT0gZW50cnkubGlzdFR5cGUpIHtcbiAgICAgICAgc2VnbWVudC5saXN0ID0gbXV0YXRlKHNlZ21lbnQubGlzdCwgZW50cnkubGlzdFR5cGUpO1xuICAgICAgfVxuICAgICAgc2V0QWxsKHNlZ21lbnQubGlzdCwgZW50cnkubGlzdEF0dHJpYnV0ZXMpO1xuICAgIH07XG4gICAgdmFyIGNyZWF0ZUl0ZW0gPSBmdW5jdGlvbiAoc2NvcGUsIGF0dHIsIGNvbnRlbnQpIHtcbiAgICAgIHZhciBpdGVtID0gRWxlbWVudC5mcm9tVGFnKCdsaScsIHNjb3BlKTtcbiAgICAgIHNldEFsbChpdGVtLCBhdHRyKTtcbiAgICAgIGFwcGVuZCQxKGl0ZW0sIGNvbnRlbnQpO1xuICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfTtcbiAgICB2YXIgYXBwZW5kSXRlbSA9IGZ1bmN0aW9uIChzZWdtZW50LCBpdGVtKSB7XG4gICAgICBhcHBlbmQoc2VnbWVudC5saXN0LCBpdGVtKTtcbiAgICAgIHNlZ21lbnQuaXRlbSA9IGl0ZW07XG4gICAgfTtcbiAgICB2YXIgd3JpdGVTaGFsbG93ID0gZnVuY3Rpb24gKHNjb3BlLCBjYXN0LCBlbnRyeSkge1xuICAgICAgdmFyIG5ld0Nhc3QgPSBjYXN0LnNsaWNlKDAsIGVudHJ5LmRlcHRoKTtcbiAgICAgIGxhc3QobmV3Q2FzdCkuZWFjaChmdW5jdGlvbiAoc2VnbWVudCkge1xuICAgICAgICB2YXIgaXRlbSA9IGNyZWF0ZUl0ZW0oc2NvcGUsIGVudHJ5Lml0ZW1BdHRyaWJ1dGVzLCBlbnRyeS5jb250ZW50KTtcbiAgICAgICAgYXBwZW5kSXRlbShzZWdtZW50LCBpdGVtKTtcbiAgICAgICAgbm9ybWFsaXplU2VnbWVudChzZWdtZW50LCBlbnRyeSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXdDYXN0O1xuICAgIH07XG4gICAgdmFyIHdyaXRlRGVlcCA9IGZ1bmN0aW9uIChzY29wZSwgY2FzdCwgZW50cnkpIHtcbiAgICAgIHZhciBzZWdtZW50cyA9IGNyZWF0ZVNlZ21lbnRzKHNjb3BlLCBlbnRyeSwgZW50cnkuZGVwdGggLSBjYXN0Lmxlbmd0aCk7XG4gICAgICBqb2luU2VnbWVudHMoc2VnbWVudHMpO1xuICAgICAgcG9wdWxhdGVTZWdtZW50cyhzZWdtZW50cywgZW50cnkpO1xuICAgICAgYXBwZW5kU2VnbWVudHMoY2FzdCwgc2VnbWVudHMpO1xuICAgICAgcmV0dXJuIGNhc3QuY29uY2F0KHNlZ21lbnRzKTtcbiAgICB9O1xuICAgIHZhciBjb21wb3NlTGlzdCA9IGZ1bmN0aW9uIChzY29wZSwgZW50cmllcykge1xuICAgICAgdmFyIGNhc3QgPSBmb2xkbChlbnRyaWVzLCBmdW5jdGlvbiAoY2FzdCwgZW50cnkpIHtcbiAgICAgICAgcmV0dXJuIGVudHJ5LmRlcHRoID4gY2FzdC5sZW5ndGggPyB3cml0ZURlZXAoc2NvcGUsIGNhc3QsIGVudHJ5KSA6IHdyaXRlU2hhbGxvdyhzY29wZSwgY2FzdCwgZW50cnkpO1xuICAgICAgfSwgW10pO1xuICAgICAgcmV0dXJuIGhlYWQoY2FzdCkubWFwKGZ1bmN0aW9uIChzZWdtZW50KSB7XG4gICAgICAgIHJldHVybiBzZWdtZW50Lmxpc3Q7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIGlzTGlzdCA9IGZ1bmN0aW9uIChlbCkge1xuICAgICAgcmV0dXJuIGlzJDEoZWwsICdPTCxVTCcpO1xuICAgIH07XG4gICAgdmFyIGhhc0ZpcnN0Q2hpbGRMaXN0ID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgICByZXR1cm4gZmlyc3RDaGlsZChlbCkubWFwKGlzTGlzdCkuZ2V0T3IoZmFsc2UpO1xuICAgIH07XG4gICAgdmFyIGhhc0xhc3RDaGlsZExpc3QgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAgIHJldHVybiBsYXN0Q2hpbGQoZWwpLm1hcChpc0xpc3QpLmdldE9yKGZhbHNlKTtcbiAgICB9O1xuXG4gICAgdmFyIGlzSW5kZW50ZWQgPSBmdW5jdGlvbiAoZW50cnkpIHtcbiAgICAgIHJldHVybiBlbnRyeS5kZXB0aCA+IDA7XG4gICAgfTtcbiAgICB2YXIgaXNTZWxlY3RlZCA9IGZ1bmN0aW9uIChlbnRyeSkge1xuICAgICAgcmV0dXJuIGVudHJ5LmlzU2VsZWN0ZWQ7XG4gICAgfTtcbiAgICB2YXIgY2xvbmVJdGVtQ29udGVudCA9IGZ1bmN0aW9uIChsaSkge1xuICAgICAgdmFyIGNoaWxkcmVuJDEgPSBjaGlsZHJlbihsaSk7XG4gICAgICB2YXIgY29udGVudCA9IGhhc0xhc3RDaGlsZExpc3QobGkpID8gY2hpbGRyZW4kMS5zbGljZSgwLCAtMSkgOiBjaGlsZHJlbiQxO1xuICAgICAgcmV0dXJuIG1hcChjb250ZW50LCBkZWVwKTtcbiAgICB9O1xuICAgIHZhciBjcmVhdGVFbnRyeSA9IGZ1bmN0aW9uIChsaSwgZGVwdGgsIGlzU2VsZWN0ZWQpIHtcbiAgICAgIHJldHVybiBwYXJlbnQobGkpLmZpbHRlcihpc0VsZW1lbnQpLm1hcChmdW5jdGlvbiAobGlzdCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGRlcHRoOiBkZXB0aCxcbiAgICAgICAgICBkaXJ0eTogZmFsc2UsXG4gICAgICAgICAgaXNTZWxlY3RlZDogaXNTZWxlY3RlZCxcbiAgICAgICAgICBjb250ZW50OiBjbG9uZUl0ZW1Db250ZW50KGxpKSxcbiAgICAgICAgICBpdGVtQXR0cmlidXRlczogY2xvbmUobGkpLFxuICAgICAgICAgIGxpc3RBdHRyaWJ1dGVzOiBjbG9uZShsaXN0KSxcbiAgICAgICAgICBsaXN0VHlwZTogbmFtZShsaXN0KVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBpbmRlbnRFbnRyeSA9IGZ1bmN0aW9uIChpbmRlbnRhdGlvbiwgZW50cnkpIHtcbiAgICAgIHN3aXRjaCAoaW5kZW50YXRpb24pIHtcbiAgICAgIGNhc2UgJ0luZGVudCc6XG4gICAgICAgIGVudHJ5LmRlcHRoKys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnT3V0ZGVudCc6XG4gICAgICAgIGVudHJ5LmRlcHRoLS07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnRmxhdHRlbic6XG4gICAgICAgIGVudHJ5LmRlcHRoID0gMDtcbiAgICAgIH1cbiAgICAgIGVudHJ5LmRpcnR5ID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgdmFyIGNsb25lTGlzdFByb3BlcnRpZXMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICAgIHRhcmdldC5saXN0VHlwZSA9IHNvdXJjZS5saXN0VHlwZTtcbiAgICAgIHRhcmdldC5saXN0QXR0cmlidXRlcyA9IF9fYXNzaWduKHt9LCBzb3VyY2UubGlzdEF0dHJpYnV0ZXMpO1xuICAgIH07XG4gICAgdmFyIGNsZWFuTGlzdFByb3BlcnRpZXMgPSBmdW5jdGlvbiAoZW50cnkpIHtcbiAgICAgIGVudHJ5Lmxpc3RBdHRyaWJ1dGVzID0gZmlsdGVyJDEoZW50cnkubGlzdEF0dHJpYnV0ZXMsIGZ1bmN0aW9uIChfdmFsdWUsIGtleSkge1xuICAgICAgICByZXR1cm4ga2V5ICE9PSAnc3RhcnQnO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgY2xvc2VzdFNpYmxpbmdFbnRyeSA9IGZ1bmN0aW9uIChlbnRyaWVzLCBzdGFydCkge1xuICAgICAgdmFyIGRlcHRoID0gZW50cmllc1tzdGFydF0uZGVwdGg7XG4gICAgICB2YXIgbWF0Y2hlcyA9IGZ1bmN0aW9uIChlbnRyeSkge1xuICAgICAgICByZXR1cm4gZW50cnkuZGVwdGggPT09IGRlcHRoICYmICFlbnRyeS5kaXJ0eTtcbiAgICAgIH07XG4gICAgICB2YXIgdW50aWwgPSBmdW5jdGlvbiAoZW50cnkpIHtcbiAgICAgICAgcmV0dXJuIGVudHJ5LmRlcHRoIDwgZGVwdGg7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIGZpbmRVbnRpbChyZXZlcnNlKGVudHJpZXMuc2xpY2UoMCwgc3RhcnQpKSwgbWF0Y2hlcywgdW50aWwpLm9yVGh1bmsoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZmluZFVudGlsKGVudHJpZXMuc2xpY2Uoc3RhcnQgKyAxKSwgbWF0Y2hlcywgdW50aWwpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgbm9ybWFsaXplRW50cmllcyA9IGZ1bmN0aW9uIChlbnRyaWVzKSB7XG4gICAgICBlYWNoKGVudHJpZXMsIGZ1bmN0aW9uIChlbnRyeSwgaSkge1xuICAgICAgICBjbG9zZXN0U2libGluZ0VudHJ5KGVudHJpZXMsIGkpLmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChlbnRyeS5kaXJ0eSkge1xuICAgICAgICAgICAgY2xlYW5MaXN0UHJvcGVydGllcyhlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiAobWF0Y2hpbmdFbnRyeSkge1xuICAgICAgICAgIHJldHVybiBjbG9uZUxpc3RQcm9wZXJ0aWVzKGVudHJ5LCBtYXRjaGluZ0VudHJ5KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBlbnRyaWVzO1xuICAgIH07XG5cbiAgICB2YXIgQ2VsbCA9IGZ1bmN0aW9uIChpbml0aWFsKSB7XG4gICAgICB2YXIgdmFsdWUgPSBpbml0aWFsO1xuICAgICAgdmFyIGdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfTtcbiAgICAgIHZhciBzZXQgPSBmdW5jdGlvbiAodikge1xuICAgICAgICB2YWx1ZSA9IHY7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0OiBnZXQsXG4gICAgICAgIHNldDogc2V0XG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgcGFyc2VJdGVtID0gZnVuY3Rpb24gKGRlcHRoLCBpdGVtU2VsZWN0aW9uLCBzZWxlY3Rpb25TdGF0ZSwgaXRlbSkge1xuICAgICAgcmV0dXJuIGZpcnN0Q2hpbGQoaXRlbSkuZmlsdGVyKGlzTGlzdCkuZm9sZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGl0ZW1TZWxlY3Rpb24uZWFjaChmdW5jdGlvbiAoc2VsZWN0aW9uKSB7XG4gICAgICAgICAgaWYgKGVxKHNlbGVjdGlvbi5zdGFydCwgaXRlbSkpIHtcbiAgICAgICAgICAgIHNlbGVjdGlvblN0YXRlLnNldCh0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgY3VycmVudEl0ZW1FbnRyeSA9IGNyZWF0ZUVudHJ5KGl0ZW0sIGRlcHRoLCBzZWxlY3Rpb25TdGF0ZS5nZXQoKSk7XG4gICAgICAgIGl0ZW1TZWxlY3Rpb24uZWFjaChmdW5jdGlvbiAoc2VsZWN0aW9uKSB7XG4gICAgICAgICAgaWYgKGVxKHNlbGVjdGlvbi5lbmQsIGl0ZW0pKSB7XG4gICAgICAgICAgICBzZWxlY3Rpb25TdGF0ZS5zZXQoZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBjaGlsZExpc3RFbnRyaWVzID0gbGFzdENoaWxkKGl0ZW0pLmZpbHRlcihpc0xpc3QpLm1hcChmdW5jdGlvbiAobGlzdCkge1xuICAgICAgICAgIHJldHVybiBwYXJzZUxpc3QoZGVwdGgsIGl0ZW1TZWxlY3Rpb24sIHNlbGVjdGlvblN0YXRlLCBsaXN0KTtcbiAgICAgICAgfSkuZ2V0T3IoW10pO1xuICAgICAgICByZXR1cm4gY3VycmVudEl0ZW1FbnRyeS50b0FycmF5KCkuY29uY2F0KGNoaWxkTGlzdEVudHJpZXMpO1xuICAgICAgfSwgZnVuY3Rpb24gKGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlTGlzdChkZXB0aCwgaXRlbVNlbGVjdGlvbiwgc2VsZWN0aW9uU3RhdGUsIGxpc3QpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgcGFyc2VMaXN0ID0gZnVuY3Rpb24gKGRlcHRoLCBpdGVtU2VsZWN0aW9uLCBzZWxlY3Rpb25TdGF0ZSwgbGlzdCkge1xuICAgICAgcmV0dXJuIGJpbmQoY2hpbGRyZW4obGlzdCksIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHZhciBwYXJzZXIgPSBpc0xpc3QoZWxlbWVudCkgPyBwYXJzZUxpc3QgOiBwYXJzZUl0ZW07XG4gICAgICAgIHZhciBuZXdEZXB0aCA9IGRlcHRoICsgMTtcbiAgICAgICAgcmV0dXJuIHBhcnNlcihuZXdEZXB0aCwgaXRlbVNlbGVjdGlvbiwgc2VsZWN0aW9uU3RhdGUsIGVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgcGFyc2VMaXN0cyA9IGZ1bmN0aW9uIChsaXN0cywgaXRlbVNlbGVjdGlvbikge1xuICAgICAgdmFyIHNlbGVjdGlvblN0YXRlID0gQ2VsbChmYWxzZSk7XG4gICAgICB2YXIgaW5pdGlhbERlcHRoID0gMDtcbiAgICAgIHJldHVybiBtYXAobGlzdHMsIGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc291cmNlTGlzdDogbGlzdCxcbiAgICAgICAgICBlbnRyaWVzOiBwYXJzZUxpc3QoaW5pdGlhbERlcHRoLCBpdGVtU2VsZWN0aW9uLCBzZWxlY3Rpb25TdGF0ZSwgbGlzdClcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgb3V0ZGVudGVkQ29tcG9zZXIgPSBmdW5jdGlvbiAoZWRpdG9yLCBlbnRyaWVzKSB7XG4gICAgICB2YXIgbm9ybWFsaXplZEVudHJpZXMgPSBub3JtYWxpemVFbnRyaWVzKGVudHJpZXMpO1xuICAgICAgcmV0dXJuIG1hcChub3JtYWxpemVkRW50cmllcywgZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgIHZhciBjb250ZW50ID0gZnJvbUVsZW1lbnRzKGVudHJ5LmNvbnRlbnQpO1xuICAgICAgICByZXR1cm4gRWxlbWVudC5mcm9tRG9tKGNyZWF0ZVRleHRCbG9jayhlZGl0b3IsIGNvbnRlbnQuZG9tKCkpKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGluZGVudGVkQ29tcG9zZXIgPSBmdW5jdGlvbiAoZWRpdG9yLCBlbnRyaWVzKSB7XG4gICAgICB2YXIgbm9ybWFsaXplZEVudHJpZXMgPSBub3JtYWxpemVFbnRyaWVzKGVudHJpZXMpO1xuICAgICAgcmV0dXJuIGNvbXBvc2VMaXN0KGVkaXRvci5jb250ZW50RG9jdW1lbnQsIG5vcm1hbGl6ZWRFbnRyaWVzKS50b0FycmF5KCk7XG4gICAgfTtcbiAgICB2YXIgY29tcG9zZUVudHJpZXMgPSBmdW5jdGlvbiAoZWRpdG9yLCBlbnRyaWVzKSB7XG4gICAgICByZXR1cm4gYmluZChncm91cEJ5KGVudHJpZXMsIGlzSW5kZW50ZWQpLCBmdW5jdGlvbiAoZW50cmllcykge1xuICAgICAgICB2YXIgZ3JvdXBJc0luZGVudGVkID0gaGVhZChlbnRyaWVzKS5tYXAoaXNJbmRlbnRlZCkuZ2V0T3IoZmFsc2UpO1xuICAgICAgICByZXR1cm4gZ3JvdXBJc0luZGVudGVkID8gaW5kZW50ZWRDb21wb3NlcihlZGl0b3IsIGVudHJpZXMpIDogb3V0ZGVudGVkQ29tcG9zZXIoZWRpdG9yLCBlbnRyaWVzKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGluZGVudFNlbGVjdGVkRW50cmllcyA9IGZ1bmN0aW9uIChlbnRyaWVzLCBpbmRlbnRhdGlvbikge1xuICAgICAgZWFjaChmaWx0ZXIoZW50cmllcywgaXNTZWxlY3RlZCksIGZ1bmN0aW9uIChlbnRyeSkge1xuICAgICAgICByZXR1cm4gaW5kZW50RW50cnkoaW5kZW50YXRpb24sIGVudHJ5KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGdldEl0ZW1TZWxlY3Rpb24gPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgc2VsZWN0ZWRMaXN0SXRlbXMgPSBtYXAoZ2V0U2VsZWN0ZWRMaXN0SXRlbXMoZWRpdG9yKSwgRWxlbWVudC5mcm9tRG9tKTtcbiAgICAgIHJldHVybiBsaWZ0MihmaW5kKHNlbGVjdGVkTGlzdEl0ZW1zLCBub3QoaGFzRmlyc3RDaGlsZExpc3QpKSwgZmluZChyZXZlcnNlKHNlbGVjdGVkTGlzdEl0ZW1zKSwgbm90KGhhc0ZpcnN0Q2hpbGRMaXN0KSksIGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICAgIGVuZDogZW5kXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBsaXN0SW5kZW50YXRpb24gPSBmdW5jdGlvbiAoZWRpdG9yLCBsaXN0cywgaW5kZW50YXRpb24pIHtcbiAgICAgIHZhciBlbnRyeVNldHMgPSBwYXJzZUxpc3RzKGxpc3RzLCBnZXRJdGVtU2VsZWN0aW9uKGVkaXRvcikpO1xuICAgICAgZWFjaChlbnRyeVNldHMsIGZ1bmN0aW9uIChlbnRyeVNldCkge1xuICAgICAgICBpbmRlbnRTZWxlY3RlZEVudHJpZXMoZW50cnlTZXQuZW50cmllcywgaW5kZW50YXRpb24pO1xuICAgICAgICB2YXIgY29tcG9zZWRMaXN0cyA9IGNvbXBvc2VFbnRyaWVzKGVkaXRvciwgZW50cnlTZXQuZW50cmllcyk7XG4gICAgICAgIGVhY2goY29tcG9zZWRMaXN0cywgZnVuY3Rpb24gKGNvbXBvc2VkTGlzdCkge1xuICAgICAgICAgIGZpcmVMaXN0RXZlbnQoZWRpdG9yLCBpbmRlbnRhdGlvbiA9PT0gJ0luZGVudCcgPyAnSW5kZW50TGlzdCcgOiAnT3V0ZGVudExpc3QnLCBjb21wb3NlZExpc3QuZG9tKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgYmVmb3JlJDEoZW50cnlTZXQuc291cmNlTGlzdCwgY29tcG9zZWRMaXN0cyk7XG4gICAgICAgIHJlbW92ZShlbnRyeVNldC5zb3VyY2VMaXN0KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgZ2xvYmFsJDYgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5kb20uRE9NVXRpbHMnKTtcblxuICAgIHZhciBET00gPSBnbG9iYWwkNi5ET007XG4gICAgdmFyIHNwbGl0TGlzdCA9IGZ1bmN0aW9uIChlZGl0b3IsIHVsLCBsaSkge1xuICAgICAgdmFyIHJlbW92ZUFuZEtlZXBCb29rbWFya3MgPSBmdW5jdGlvbiAodGFyZ2V0Tm9kZSkge1xuICAgICAgICBnbG9iYWwkNS5lYWNoKGJvb2ttYXJrcywgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICB0YXJnZXROb2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5vZGUsIGxpLnBhcmVudE5vZGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgRE9NLnJlbW92ZSh0YXJnZXROb2RlKTtcbiAgICAgIH07XG4gICAgICB2YXIgYm9va21hcmtzID0gRE9NLnNlbGVjdCgnc3BhbltkYXRhLW1jZS10eXBlPVwiYm9va21hcmtcIl0nLCB1bCk7XG4gICAgICB2YXIgbmV3QmxvY2sgPSBjcmVhdGVUZXh0QmxvY2soZWRpdG9yLCBsaSk7XG4gICAgICB2YXIgdG1wUm5nID0gRE9NLmNyZWF0ZVJuZygpO1xuICAgICAgdG1wUm5nLnNldFN0YXJ0QWZ0ZXIobGkpO1xuICAgICAgdG1wUm5nLnNldEVuZEFmdGVyKHVsKTtcbiAgICAgIHZhciBmcmFnbWVudCA9IHRtcFJuZy5leHRyYWN0Q29udGVudHMoKTtcbiAgICAgIGZvciAodmFyIG5vZGUgPSBmcmFnbWVudC5maXJzdENoaWxkOyBub2RlOyBub2RlID0gbm9kZS5maXJzdENoaWxkKSB7XG4gICAgICAgIGlmIChub2RlLm5vZGVOYW1lID09PSAnTEknICYmIGVkaXRvci5kb20uaXNFbXB0eShub2RlKSkge1xuICAgICAgICAgIERPTS5yZW1vdmUobm9kZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghZWRpdG9yLmRvbS5pc0VtcHR5KGZyYWdtZW50KSkge1xuICAgICAgICBET00uaW5zZXJ0QWZ0ZXIoZnJhZ21lbnQsIHVsKTtcbiAgICAgIH1cbiAgICAgIERPTS5pbnNlcnRBZnRlcihuZXdCbG9jaywgdWwpO1xuICAgICAgaWYgKGlzRW1wdHkoZWRpdG9yLmRvbSwgbGkucGFyZW50Tm9kZSkpIHtcbiAgICAgICAgcmVtb3ZlQW5kS2VlcEJvb2ttYXJrcyhsaS5wYXJlbnROb2RlKTtcbiAgICAgIH1cbiAgICAgIERPTS5yZW1vdmUobGkpO1xuICAgICAgaWYgKGlzRW1wdHkoZWRpdG9yLmRvbSwgdWwpKSB7XG4gICAgICAgIERPTS5yZW1vdmUodWwpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgb3V0ZGVudERsSXRlbSA9IGZ1bmN0aW9uIChlZGl0b3IsIGl0ZW0pIHtcbiAgICAgIGlmIChpcyQxKGl0ZW0sICdkZCcpKSB7XG4gICAgICAgIG11dGF0ZShpdGVtLCAnZHQnKTtcbiAgICAgIH0gZWxzZSBpZiAoaXMkMShpdGVtLCAnZHQnKSkge1xuICAgICAgICBwYXJlbnQoaXRlbSkuZWFjaChmdW5jdGlvbiAoZGwpIHtcbiAgICAgICAgICByZXR1cm4gc3BsaXRMaXN0KGVkaXRvciwgZGwuZG9tKCksIGl0ZW0uZG9tKCkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBpbmRlbnREbEl0ZW0gPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgaWYgKGlzJDEoaXRlbSwgJ2R0JykpIHtcbiAgICAgICAgbXV0YXRlKGl0ZW0sICdkZCcpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGRsSW5kZW50YXRpb24gPSBmdW5jdGlvbiAoZWRpdG9yLCBpbmRlbnRhdGlvbiwgZGxJdGVtcykge1xuICAgICAgaWYgKGluZGVudGF0aW9uID09PSAnSW5kZW50Jykge1xuICAgICAgICBlYWNoKGRsSXRlbXMsIGluZGVudERsSXRlbSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlYWNoKGRsSXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgcmV0dXJuIG91dGRlbnREbEl0ZW0oZWRpdG9yLCBpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBnZXROb3JtYWxpemVkUG9pbnQgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBvZmZzZXQpIHtcbiAgICAgIGlmIChpc1RleHROb2RlKGNvbnRhaW5lcikpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgICBvZmZzZXQ6IG9mZnNldFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgdmFyIG5vZGUgPSBnbG9iYWwkMS5nZXROb2RlKGNvbnRhaW5lciwgb2Zmc2V0KTtcbiAgICAgIGlmIChpc1RleHROb2RlKG5vZGUpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY29udGFpbmVyOiBub2RlLFxuICAgICAgICAgIG9mZnNldDogb2Zmc2V0ID49IGNvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aCA/IG5vZGUuZGF0YS5sZW5ndGggOiAwXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKG5vZGUucHJldmlvdXNTaWJsaW5nICYmIGlzVGV4dE5vZGUobm9kZS5wcmV2aW91c1NpYmxpbmcpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY29udGFpbmVyOiBub2RlLnByZXZpb3VzU2libGluZyxcbiAgICAgICAgICBvZmZzZXQ6IG5vZGUucHJldmlvdXNTaWJsaW5nLmRhdGEubGVuZ3RoXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKG5vZGUubmV4dFNpYmxpbmcgJiYgaXNUZXh0Tm9kZShub2RlLm5leHRTaWJsaW5nKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNvbnRhaW5lcjogbm9kZS5uZXh0U2libGluZyxcbiAgICAgICAgICBvZmZzZXQ6IDBcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICBvZmZzZXQ6IG9mZnNldFxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBub3JtYWxpemVSYW5nZSA9IGZ1bmN0aW9uIChybmcpIHtcbiAgICAgIHZhciBvdXRSbmcgPSBybmcuY2xvbmVSYW5nZSgpO1xuICAgICAgdmFyIHJhbmdlU3RhcnQgPSBnZXROb3JtYWxpemVkUG9pbnQocm5nLnN0YXJ0Q29udGFpbmVyLCBybmcuc3RhcnRPZmZzZXQpO1xuICAgICAgb3V0Um5nLnNldFN0YXJ0KHJhbmdlU3RhcnQuY29udGFpbmVyLCByYW5nZVN0YXJ0Lm9mZnNldCk7XG4gICAgICB2YXIgcmFuZ2VFbmQgPSBnZXROb3JtYWxpemVkUG9pbnQocm5nLmVuZENvbnRhaW5lciwgcm5nLmVuZE9mZnNldCk7XG4gICAgICBvdXRSbmcuc2V0RW5kKHJhbmdlRW5kLmNvbnRhaW5lciwgcmFuZ2VFbmQub2Zmc2V0KTtcbiAgICAgIHJldHVybiBvdXRSbmc7XG4gICAgfTtcblxuICAgIHZhciBzZWxlY3Rpb25JbmRlbnRhdGlvbiA9IGZ1bmN0aW9uIChlZGl0b3IsIGluZGVudGF0aW9uKSB7XG4gICAgICB2YXIgbGlzdHMgPSBtYXAoZ2V0U2VsZWN0ZWRMaXN0Um9vdHMoZWRpdG9yKSwgRWxlbWVudC5mcm9tRG9tKTtcbiAgICAgIHZhciBkbEl0ZW1zID0gbWFwKGdldFNlbGVjdGVkRGxJdGVtcyhlZGl0b3IpLCBFbGVtZW50LmZyb21Eb20pO1xuICAgICAgdmFyIGlzSGFuZGxlZCA9IGZhbHNlO1xuICAgICAgaWYgKGxpc3RzLmxlbmd0aCB8fCBkbEl0ZW1zLmxlbmd0aCkge1xuICAgICAgICB2YXIgYm9va21hcmsgPSBlZGl0b3Iuc2VsZWN0aW9uLmdldEJvb2ttYXJrKCk7XG4gICAgICAgIGxpc3RJbmRlbnRhdGlvbihlZGl0b3IsIGxpc3RzLCBpbmRlbnRhdGlvbik7XG4gICAgICAgIGRsSW5kZW50YXRpb24oZWRpdG9yLCBpbmRlbnRhdGlvbiwgZGxJdGVtcyk7XG4gICAgICAgIGVkaXRvci5zZWxlY3Rpb24ubW92ZVRvQm9va21hcmsoYm9va21hcmspO1xuICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLnNldFJuZyhub3JtYWxpemVSYW5nZShlZGl0b3Iuc2VsZWN0aW9uLmdldFJuZygpKSk7XG4gICAgICAgIGVkaXRvci5ub2RlQ2hhbmdlZCgpO1xuICAgICAgICBpc0hhbmRsZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGlzSGFuZGxlZDtcbiAgICB9O1xuICAgIHZhciBpbmRlbnRMaXN0U2VsZWN0aW9uID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbkluZGVudGF0aW9uKGVkaXRvciwgJ0luZGVudCcpO1xuICAgIH07XG4gICAgdmFyIG91dGRlbnRMaXN0U2VsZWN0aW9uID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbkluZGVudGF0aW9uKGVkaXRvciwgJ091dGRlbnQnKTtcbiAgICB9O1xuICAgIHZhciBmbGF0dGVuTGlzdFNlbGVjdGlvbiA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBzZWxlY3Rpb25JbmRlbnRhdGlvbihlZGl0b3IsICdGbGF0dGVuJyk7XG4gICAgfTtcblxuICAgIHZhciBnbG9iYWwkNyA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLmRvbS5Cb29rbWFya01hbmFnZXInKTtcblxuICAgIHZhciBET00kMSA9IGdsb2JhbCQ2LkRPTTtcbiAgICB2YXIgY3JlYXRlQm9va21hcmsgPSBmdW5jdGlvbiAocm5nKSB7XG4gICAgICB2YXIgYm9va21hcmsgPSB7fTtcbiAgICAgIHZhciBzZXR1cEVuZFBvaW50ID0gZnVuY3Rpb24gKHN0YXJ0KSB7XG4gICAgICAgIHZhciBvZmZzZXROb2RlLCBjb250YWluZXIsIG9mZnNldDtcbiAgICAgICAgY29udGFpbmVyID0gcm5nW3N0YXJ0ID8gJ3N0YXJ0Q29udGFpbmVyJyA6ICdlbmRDb250YWluZXInXTtcbiAgICAgICAgb2Zmc2V0ID0gcm5nW3N0YXJ0ID8gJ3N0YXJ0T2Zmc2V0JyA6ICdlbmRPZmZzZXQnXTtcbiAgICAgICAgaWYgKGNvbnRhaW5lci5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgICAgIG9mZnNldE5vZGUgPSBET00kMS5jcmVhdGUoJ3NwYW4nLCB7ICdkYXRhLW1jZS10eXBlJzogJ2Jvb2ttYXJrJyB9KTtcbiAgICAgICAgICBpZiAoY29udGFpbmVyLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gTWF0aC5taW4ob2Zmc2V0LCBjb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIGlmIChzdGFydCkge1xuICAgICAgICAgICAgICBjb250YWluZXIuaW5zZXJ0QmVmb3JlKG9mZnNldE5vZGUsIGNvbnRhaW5lci5jaGlsZE5vZGVzW29mZnNldF0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgRE9NJDEuaW5zZXJ0QWZ0ZXIob2Zmc2V0Tm9kZSwgY29udGFpbmVyLmNoaWxkTm9kZXNbb2Zmc2V0XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChvZmZzZXROb2RlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGFpbmVyID0gb2Zmc2V0Tm9kZTtcbiAgICAgICAgICBvZmZzZXQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGJvb2ttYXJrW3N0YXJ0ID8gJ3N0YXJ0Q29udGFpbmVyJyA6ICdlbmRDb250YWluZXInXSA9IGNvbnRhaW5lcjtcbiAgICAgICAgYm9va21hcmtbc3RhcnQgPyAnc3RhcnRPZmZzZXQnIDogJ2VuZE9mZnNldCddID0gb2Zmc2V0O1xuICAgICAgfTtcbiAgICAgIHNldHVwRW5kUG9pbnQodHJ1ZSk7XG4gICAgICBpZiAoIXJuZy5jb2xsYXBzZWQpIHtcbiAgICAgICAgc2V0dXBFbmRQb2ludCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGJvb2ttYXJrO1xuICAgIH07XG4gICAgdmFyIHJlc29sdmVCb29rbWFyayA9IGZ1bmN0aW9uIChib29rbWFyaykge1xuICAgICAgZnVuY3Rpb24gcmVzdG9yZUVuZFBvaW50KHN0YXJ0KSB7XG4gICAgICAgIHZhciBjb250YWluZXIsIG9mZnNldCwgbm9kZTtcbiAgICAgICAgdmFyIG5vZGVJbmRleCA9IGZ1bmN0aW9uIChjb250YWluZXIpIHtcbiAgICAgICAgICB2YXIgbm9kZSA9IGNvbnRhaW5lci5wYXJlbnROb2RlLmZpcnN0Q2hpbGQsIGlkeCA9IDA7XG4gICAgICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgICAgIGlmIChub2RlID09PSBjb250YWluZXIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGlkeDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub2RlLm5vZGVUeXBlICE9PSAxIHx8IG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLW1jZS10eXBlJykgIT09ICdib29rbWFyaycpIHtcbiAgICAgICAgICAgICAgaWR4Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlID0gbm9kZS5uZXh0U2libGluZztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9O1xuICAgICAgICBjb250YWluZXIgPSBub2RlID0gYm9va21hcmtbc3RhcnQgPyAnc3RhcnRDb250YWluZXInIDogJ2VuZENvbnRhaW5lciddO1xuICAgICAgICBvZmZzZXQgPSBib29rbWFya1tzdGFydCA/ICdzdGFydE9mZnNldCcgOiAnZW5kT2Zmc2V0J107XG4gICAgICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb250YWluZXIubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgICBvZmZzZXQgPSBub2RlSW5kZXgoY29udGFpbmVyKTtcbiAgICAgICAgICBjb250YWluZXIgPSBjb250YWluZXIucGFyZW50Tm9kZTtcbiAgICAgICAgICBET00kMS5yZW1vdmUobm9kZSk7XG4gICAgICAgICAgaWYgKCFjb250YWluZXIuaGFzQ2hpbGROb2RlcygpICYmIERPTSQxLmlzQmxvY2soY29udGFpbmVyKSkge1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKERPTSQxLmNyZWF0ZSgnYnInKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJvb2ttYXJrW3N0YXJ0ID8gJ3N0YXJ0Q29udGFpbmVyJyA6ICdlbmRDb250YWluZXInXSA9IGNvbnRhaW5lcjtcbiAgICAgICAgYm9va21hcmtbc3RhcnQgPyAnc3RhcnRPZmZzZXQnIDogJ2VuZE9mZnNldCddID0gb2Zmc2V0O1xuICAgICAgfVxuICAgICAgcmVzdG9yZUVuZFBvaW50KHRydWUpO1xuICAgICAgcmVzdG9yZUVuZFBvaW50KCk7XG4gICAgICB2YXIgcm5nID0gRE9NJDEuY3JlYXRlUm5nKCk7XG4gICAgICBybmcuc2V0U3RhcnQoYm9va21hcmsuc3RhcnRDb250YWluZXIsIGJvb2ttYXJrLnN0YXJ0T2Zmc2V0KTtcbiAgICAgIGlmIChib29rbWFyay5lbmRDb250YWluZXIpIHtcbiAgICAgICAgcm5nLnNldEVuZChib29rbWFyay5lbmRDb250YWluZXIsIGJvb2ttYXJrLmVuZE9mZnNldCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbm9ybWFsaXplUmFuZ2Uocm5nKTtcbiAgICB9O1xuXG4gICAgdmFyIGxpc3RUb2dnbGVBY3Rpb25Gcm9tTGlzdE5hbWUgPSBmdW5jdGlvbiAobGlzdE5hbWUpIHtcbiAgICAgIHN3aXRjaCAobGlzdE5hbWUpIHtcbiAgICAgIGNhc2UgJ1VMJzpcbiAgICAgICAgcmV0dXJuICdUb2dnbGVVbExpc3QnO1xuICAgICAgY2FzZSAnT0wnOlxuICAgICAgICByZXR1cm4gJ1RvZ2dsZU9sTGlzdCc7XG4gICAgICBjYXNlICdETCc6XG4gICAgICAgIHJldHVybiAnVG9nZ2xlRExMaXN0JztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGlzQ3VzdG9tTGlzdCA9IGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICByZXR1cm4gL1xcYnRveFxcLS8udGVzdChsaXN0LmNsYXNzTmFtZSk7XG4gICAgfTtcbiAgICB2YXIgbGlzdFN0YXRlID0gZnVuY3Rpb24gKGVkaXRvciwgbGlzdE5hbWUsIGFjdGl2YXRlKSB7XG4gICAgICB2YXIgbm9kZUNoYW5nZUhhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgaW5MaXN0ID0gZmluZFVudGlsKGUucGFyZW50cywgaXNMaXN0Tm9kZSwgaXNUYWJsZUNlbGxOb2RlKS5maWx0ZXIoZnVuY3Rpb24gKGxpc3QpIHtcbiAgICAgICAgICByZXR1cm4gbGlzdC5ub2RlTmFtZSA9PT0gbGlzdE5hbWUgJiYgIWlzQ3VzdG9tTGlzdChsaXN0KTtcbiAgICAgICAgfSkuaXNTb21lKCk7XG4gICAgICAgIGFjdGl2YXRlKGluTGlzdCk7XG4gICAgICB9O1xuICAgICAgdmFyIHBhcmVudHMgPSBlZGl0b3IuZG9tLmdldFBhcmVudHMoZWRpdG9yLnNlbGVjdGlvbi5nZXROb2RlKCkpO1xuICAgICAgbm9kZUNoYW5nZUhhbmRsZXIoeyBwYXJlbnRzOiBwYXJlbnRzIH0pO1xuICAgICAgZWRpdG9yLm9uKCdOb2RlQ2hhbmdlJywgbm9kZUNoYW5nZUhhbmRsZXIpO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGVkaXRvci5vZmYoJ05vZGVDaGFuZ2UnLCBub2RlQ2hhbmdlSGFuZGxlcik7XG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgdXBkYXRlTGlzdFN0eWxlID0gZnVuY3Rpb24gKGRvbSwgZWwsIGRldGFpbCkge1xuICAgICAgdmFyIHR5cGUgPSBkZXRhaWxbJ2xpc3Qtc3R5bGUtdHlwZSddID8gZGV0YWlsWydsaXN0LXN0eWxlLXR5cGUnXSA6IG51bGw7XG4gICAgICBkb20uc2V0U3R5bGUoZWwsICdsaXN0LXN0eWxlLXR5cGUnLCB0eXBlKTtcbiAgICB9O1xuICAgIHZhciBzZXRBdHRyaWJzID0gZnVuY3Rpb24gKGVsbSwgYXR0cnMpIHtcbiAgICAgIGdsb2JhbCQ1LmVhY2goYXR0cnMsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciB1cGRhdGVMaXN0QXR0cnMgPSBmdW5jdGlvbiAoZG9tLCBlbCwgZGV0YWlsKSB7XG4gICAgICBzZXRBdHRyaWJzKGVsLCBkZXRhaWxbJ2xpc3QtYXR0cmlidXRlcyddKTtcbiAgICAgIGdsb2JhbCQ1LmVhY2goZG9tLnNlbGVjdCgnbGknLCBlbCksIGZ1bmN0aW9uIChsaSkge1xuICAgICAgICBzZXRBdHRyaWJzKGxpLCBkZXRhaWxbJ2xpc3QtaXRlbS1hdHRyaWJ1dGVzJ10pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgdXBkYXRlTGlzdFdpdGhEZXRhaWxzID0gZnVuY3Rpb24gKGRvbSwgZWwsIGRldGFpbCkge1xuICAgICAgdXBkYXRlTGlzdFN0eWxlKGRvbSwgZWwsIGRldGFpbCk7XG4gICAgICB1cGRhdGVMaXN0QXR0cnMoZG9tLCBlbCwgZGV0YWlsKTtcbiAgICB9O1xuICAgIHZhciByZW1vdmVTdHlsZXMgPSBmdW5jdGlvbiAoZG9tLCBlbGVtZW50LCBzdHlsZXMpIHtcbiAgICAgIGdsb2JhbCQ1LmVhY2goc3R5bGVzLCBmdW5jdGlvbiAoc3R5bGUpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gZG9tLnNldFN0eWxlKGVsZW1lbnQsIChfYSA9IHt9LCBfYVtzdHlsZV0gPSAnJywgX2EpKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGdldEVuZFBvaW50Tm9kZSA9IGZ1bmN0aW9uIChlZGl0b3IsIHJuZywgc3RhcnQsIHJvb3QpIHtcbiAgICAgIHZhciBjb250YWluZXIgPSBybmdbc3RhcnQgPyAnc3RhcnRDb250YWluZXInIDogJ2VuZENvbnRhaW5lciddO1xuICAgICAgdmFyIG9mZnNldCA9IHJuZ1tzdGFydCA/ICdzdGFydE9mZnNldCcgOiAnZW5kT2Zmc2V0J107XG4gICAgICBpZiAoY29udGFpbmVyLm5vZGVUeXBlID09PSAxKSB7XG4gICAgICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lci5jaGlsZE5vZGVzW01hdGgubWluKG9mZnNldCwgY29udGFpbmVyLmNoaWxkTm9kZXMubGVuZ3RoIC0gMSldIHx8IGNvbnRhaW5lcjtcbiAgICAgIH1cbiAgICAgIGlmICghc3RhcnQgJiYgaXNCcihjb250YWluZXIubmV4dFNpYmxpbmcpKSB7XG4gICAgICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lci5uZXh0U2libGluZztcbiAgICAgIH1cbiAgICAgIHdoaWxlIChjb250YWluZXIucGFyZW50Tm9kZSAhPT0gcm9vdCkge1xuICAgICAgICBpZiAoaXNUZXh0QmxvY2soZWRpdG9yLCBjb250YWluZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoL14oVER8VEgpJC8udGVzdChjb250YWluZXIucGFyZW50Tm9kZS5ub2RlTmFtZSkpIHtcbiAgICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lci5wYXJlbnROb2RlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9O1xuICAgIHZhciBnZXRTZWxlY3RlZFRleHRCbG9ja3MgPSBmdW5jdGlvbiAoZWRpdG9yLCBybmcsIHJvb3QpIHtcbiAgICAgIHZhciB0ZXh0QmxvY2tzID0gW10sIGRvbSA9IGVkaXRvci5kb207XG4gICAgICB2YXIgc3RhcnROb2RlID0gZ2V0RW5kUG9pbnROb2RlKGVkaXRvciwgcm5nLCB0cnVlLCByb290KTtcbiAgICAgIHZhciBlbmROb2RlID0gZ2V0RW5kUG9pbnROb2RlKGVkaXRvciwgcm5nLCBmYWxzZSwgcm9vdCk7XG4gICAgICB2YXIgYmxvY2s7XG4gICAgICB2YXIgc2libGluZ3MgPSBbXTtcbiAgICAgIGZvciAodmFyIG5vZGUgPSBzdGFydE5vZGU7IG5vZGU7IG5vZGUgPSBub2RlLm5leHRTaWJsaW5nKSB7XG4gICAgICAgIHNpYmxpbmdzLnB1c2gobm9kZSk7XG4gICAgICAgIGlmIChub2RlID09PSBlbmROb2RlKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGdsb2JhbCQ1LmVhY2goc2libGluZ3MsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIGlmIChpc1RleHRCbG9jayhlZGl0b3IsIG5vZGUpKSB7XG4gICAgICAgICAgdGV4dEJsb2Nrcy5wdXNoKG5vZGUpO1xuICAgICAgICAgIGJsb2NrID0gbnVsbDtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRvbS5pc0Jsb2NrKG5vZGUpIHx8IGlzQnIobm9kZSkpIHtcbiAgICAgICAgICBpZiAoaXNCcihub2RlKSkge1xuICAgICAgICAgICAgZG9tLnJlbW92ZShub2RlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYmxvY2sgPSBudWxsO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmV4dFNpYmxpbmcgPSBub2RlLm5leHRTaWJsaW5nO1xuICAgICAgICBpZiAoZ2xvYmFsJDcuaXNCb29rbWFya05vZGUobm9kZSkpIHtcbiAgICAgICAgICBpZiAoaXNUZXh0QmxvY2soZWRpdG9yLCBuZXh0U2libGluZykgfHwgIW5leHRTaWJsaW5nICYmIG5vZGUucGFyZW50Tm9kZSA9PT0gcm9vdCkge1xuICAgICAgICAgICAgYmxvY2sgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWJsb2NrKSB7XG4gICAgICAgICAgYmxvY2sgPSBkb20uY3JlYXRlKCdwJyk7XG4gICAgICAgICAgbm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShibG9jaywgbm9kZSk7XG4gICAgICAgICAgdGV4dEJsb2Nrcy5wdXNoKGJsb2NrKTtcbiAgICAgICAgfVxuICAgICAgICBibG9jay5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRleHRCbG9ja3M7XG4gICAgfTtcbiAgICB2YXIgaGFzQ29tcGF0aWJsZVN0eWxlID0gZnVuY3Rpb24gKGRvbSwgc2liLCBkZXRhaWwpIHtcbiAgICAgIHZhciBzaWJTdHlsZSA9IGRvbS5nZXRTdHlsZShzaWIsICdsaXN0LXN0eWxlLXR5cGUnKTtcbiAgICAgIHZhciBkZXRhaWxTdHlsZSA9IGRldGFpbCA/IGRldGFpbFsnbGlzdC1zdHlsZS10eXBlJ10gOiAnJztcbiAgICAgIGRldGFpbFN0eWxlID0gZGV0YWlsU3R5bGUgPT09IG51bGwgPyAnJyA6IGRldGFpbFN0eWxlO1xuICAgICAgcmV0dXJuIHNpYlN0eWxlID09PSBkZXRhaWxTdHlsZTtcbiAgICB9O1xuICAgIHZhciBhcHBseUxpc3QgPSBmdW5jdGlvbiAoZWRpdG9yLCBsaXN0TmFtZSwgZGV0YWlsKSB7XG4gICAgICBpZiAoZGV0YWlsID09PSB2b2lkIDApIHtcbiAgICAgICAgZGV0YWlsID0ge307XG4gICAgICB9XG4gICAgICB2YXIgcm5nID0gZWRpdG9yLnNlbGVjdGlvbi5nZXRSbmcoKTtcbiAgICAgIHZhciBsaXN0SXRlbU5hbWUgPSAnTEknO1xuICAgICAgdmFyIHJvb3QgPSBnZXRDbG9zZXN0TGlzdFJvb3RFbG0oZWRpdG9yLCBlZGl0b3Iuc2VsZWN0aW9uLmdldFN0YXJ0KHRydWUpKTtcbiAgICAgIHZhciBkb20gPSBlZGl0b3IuZG9tO1xuICAgICAgaWYgKGRvbS5nZXRDb250ZW50RWRpdGFibGUoZWRpdG9yLnNlbGVjdGlvbi5nZXROb2RlKCkpID09PSAnZmFsc2UnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGxpc3ROYW1lID0gbGlzdE5hbWUudG9VcHBlckNhc2UoKTtcbiAgICAgIGlmIChsaXN0TmFtZSA9PT0gJ0RMJykge1xuICAgICAgICBsaXN0SXRlbU5hbWUgPSAnRFQnO1xuICAgICAgfVxuICAgICAgdmFyIGJvb2ttYXJrID0gY3JlYXRlQm9va21hcmsocm5nKTtcbiAgICAgIGdsb2JhbCQ1LmVhY2goZ2V0U2VsZWN0ZWRUZXh0QmxvY2tzKGVkaXRvciwgcm5nLCByb290KSwgZnVuY3Rpb24gKGJsb2NrKSB7XG4gICAgICAgIHZhciBsaXN0QmxvY2s7XG4gICAgICAgIHZhciBzaWJsaW5nID0gYmxvY2sucHJldmlvdXNTaWJsaW5nO1xuICAgICAgICBpZiAoc2libGluZyAmJiBpc0xpc3ROb2RlKHNpYmxpbmcpICYmIHNpYmxpbmcubm9kZU5hbWUgPT09IGxpc3ROYW1lICYmIGhhc0NvbXBhdGlibGVTdHlsZShkb20sIHNpYmxpbmcsIGRldGFpbCkpIHtcbiAgICAgICAgICBsaXN0QmxvY2sgPSBzaWJsaW5nO1xuICAgICAgICAgIGJsb2NrID0gZG9tLnJlbmFtZShibG9jaywgbGlzdEl0ZW1OYW1lKTtcbiAgICAgICAgICBzaWJsaW5nLmFwcGVuZENoaWxkKGJsb2NrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsaXN0QmxvY2sgPSBkb20uY3JlYXRlKGxpc3ROYW1lKTtcbiAgICAgICAgICBibG9jay5wYXJlbnROb2RlLmluc2VydEJlZm9yZShsaXN0QmxvY2ssIGJsb2NrKTtcbiAgICAgICAgICBsaXN0QmxvY2suYXBwZW5kQ2hpbGQoYmxvY2spO1xuICAgICAgICAgIGJsb2NrID0gZG9tLnJlbmFtZShibG9jaywgbGlzdEl0ZW1OYW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZW1vdmVTdHlsZXMoZG9tLCBibG9jaywgW1xuICAgICAgICAgICdtYXJnaW4nLFxuICAgICAgICAgICdtYXJnaW4tcmlnaHQnLFxuICAgICAgICAgICdtYXJnaW4tYm90dG9tJyxcbiAgICAgICAgICAnbWFyZ2luLWxlZnQnLFxuICAgICAgICAgICdtYXJnaW4tdG9wJyxcbiAgICAgICAgICAncGFkZGluZycsXG4gICAgICAgICAgJ3BhZGRpbmctcmlnaHQnLFxuICAgICAgICAgICdwYWRkaW5nLWJvdHRvbScsXG4gICAgICAgICAgJ3BhZGRpbmctbGVmdCcsXG4gICAgICAgICAgJ3BhZGRpbmctdG9wJ1xuICAgICAgICBdKTtcbiAgICAgICAgdXBkYXRlTGlzdFdpdGhEZXRhaWxzKGRvbSwgbGlzdEJsb2NrLCBkZXRhaWwpO1xuICAgICAgICBtZXJnZVdpdGhBZGphY2VudExpc3RzKGVkaXRvci5kb20sIGxpc3RCbG9jayk7XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci5zZWxlY3Rpb24uc2V0Um5nKHJlc29sdmVCb29rbWFyayhib29rbWFyaykpO1xuICAgIH07XG4gICAgdmFyIGlzVmFsaWRMaXN0cyA9IGZ1bmN0aW9uIChsaXN0MSwgbGlzdDIpIHtcbiAgICAgIHJldHVybiBsaXN0MSAmJiBsaXN0MiAmJiBpc0xpc3ROb2RlKGxpc3QxKSAmJiBsaXN0MS5ub2RlTmFtZSA9PT0gbGlzdDIubm9kZU5hbWU7XG4gICAgfTtcbiAgICB2YXIgaGFzU2FtZUxpc3RTdHlsZSA9IGZ1bmN0aW9uIChkb20sIGxpc3QxLCBsaXN0Mikge1xuICAgICAgdmFyIHRhcmdldFN0eWxlID0gZG9tLmdldFN0eWxlKGxpc3QxLCAnbGlzdC1zdHlsZS10eXBlJywgdHJ1ZSk7XG4gICAgICB2YXIgc3R5bGUgPSBkb20uZ2V0U3R5bGUobGlzdDIsICdsaXN0LXN0eWxlLXR5cGUnLCB0cnVlKTtcbiAgICAgIHJldHVybiB0YXJnZXRTdHlsZSA9PT0gc3R5bGU7XG4gICAgfTtcbiAgICB2YXIgaGFzU2FtZUNsYXNzZXMgPSBmdW5jdGlvbiAoZWxtMSwgZWxtMikge1xuICAgICAgcmV0dXJuIGVsbTEuY2xhc3NOYW1lID09PSBlbG0yLmNsYXNzTmFtZTtcbiAgICB9O1xuICAgIHZhciBzaG91bGRNZXJnZSA9IGZ1bmN0aW9uIChkb20sIGxpc3QxLCBsaXN0Mikge1xuICAgICAgcmV0dXJuIGlzVmFsaWRMaXN0cyhsaXN0MSwgbGlzdDIpICYmIGhhc1NhbWVMaXN0U3R5bGUoZG9tLCBsaXN0MSwgbGlzdDIpICYmIGhhc1NhbWVDbGFzc2VzKGxpc3QxLCBsaXN0Mik7XG4gICAgfTtcbiAgICB2YXIgbWVyZ2VXaXRoQWRqYWNlbnRMaXN0cyA9IGZ1bmN0aW9uIChkb20sIGxpc3RCbG9jaykge1xuICAgICAgdmFyIHNpYmxpbmcsIG5vZGU7XG4gICAgICBzaWJsaW5nID0gbGlzdEJsb2NrLm5leHRTaWJsaW5nO1xuICAgICAgaWYgKHNob3VsZE1lcmdlKGRvbSwgbGlzdEJsb2NrLCBzaWJsaW5nKSkge1xuICAgICAgICB3aGlsZSAobm9kZSA9IHNpYmxpbmcuZmlyc3RDaGlsZCkge1xuICAgICAgICAgIGxpc3RCbG9jay5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBkb20ucmVtb3ZlKHNpYmxpbmcpO1xuICAgICAgfVxuICAgICAgc2libGluZyA9IGxpc3RCbG9jay5wcmV2aW91c1NpYmxpbmc7XG4gICAgICBpZiAoc2hvdWxkTWVyZ2UoZG9tLCBsaXN0QmxvY2ssIHNpYmxpbmcpKSB7XG4gICAgICAgIHdoaWxlIChub2RlID0gc2libGluZy5sYXN0Q2hpbGQpIHtcbiAgICAgICAgICBsaXN0QmxvY2suaW5zZXJ0QmVmb3JlKG5vZGUsIGxpc3RCbG9jay5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICBkb20ucmVtb3ZlKHNpYmxpbmcpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHVwZGF0ZUxpc3QgPSBmdW5jdGlvbiAoZWRpdG9yLCBsaXN0LCBsaXN0TmFtZSwgZGV0YWlsKSB7XG4gICAgICBpZiAobGlzdC5ub2RlTmFtZSAhPT0gbGlzdE5hbWUpIHtcbiAgICAgICAgdmFyIG5ld0xpc3QgPSBlZGl0b3IuZG9tLnJlbmFtZShsaXN0LCBsaXN0TmFtZSk7XG4gICAgICAgIHVwZGF0ZUxpc3RXaXRoRGV0YWlscyhlZGl0b3IuZG9tLCBuZXdMaXN0LCBkZXRhaWwpO1xuICAgICAgICBmaXJlTGlzdEV2ZW50KGVkaXRvciwgbGlzdFRvZ2dsZUFjdGlvbkZyb21MaXN0TmFtZShsaXN0TmFtZSksIG5ld0xpc3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXBkYXRlTGlzdFdpdGhEZXRhaWxzKGVkaXRvci5kb20sIGxpc3QsIGRldGFpbCk7XG4gICAgICAgIGZpcmVMaXN0RXZlbnQoZWRpdG9yLCBsaXN0VG9nZ2xlQWN0aW9uRnJvbUxpc3ROYW1lKGxpc3ROYW1lKSwgbGlzdCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgdG9nZ2xlTXVsdGlwbGVMaXN0cyA9IGZ1bmN0aW9uIChlZGl0b3IsIHBhcmVudExpc3QsIGxpc3RzLCBsaXN0TmFtZSwgZGV0YWlsKSB7XG4gICAgICBpZiAocGFyZW50TGlzdC5ub2RlTmFtZSA9PT0gbGlzdE5hbWUgJiYgIWhhc0xpc3RTdHlsZURldGFpbChkZXRhaWwpKSB7XG4gICAgICAgIGZsYXR0ZW5MaXN0U2VsZWN0aW9uKGVkaXRvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgYm9va21hcmsgPSBjcmVhdGVCb29rbWFyayhlZGl0b3Iuc2VsZWN0aW9uLmdldFJuZyh0cnVlKSk7XG4gICAgICAgIGdsb2JhbCQ1LmVhY2goW3BhcmVudExpc3RdLmNvbmNhdChsaXN0cyksIGZ1bmN0aW9uIChlbG0pIHtcbiAgICAgICAgICB1cGRhdGVMaXN0KGVkaXRvciwgZWxtLCBsaXN0TmFtZSwgZGV0YWlsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVkaXRvci5zZWxlY3Rpb24uc2V0Um5nKHJlc29sdmVCb29rbWFyayhib29rbWFyaykpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGhhc0xpc3RTdHlsZURldGFpbCA9IGZ1bmN0aW9uIChkZXRhaWwpIHtcbiAgICAgIHJldHVybiAnbGlzdC1zdHlsZS10eXBlJyBpbiBkZXRhaWw7XG4gICAgfTtcbiAgICB2YXIgdG9nZ2xlU2luZ2xlTGlzdCA9IGZ1bmN0aW9uIChlZGl0b3IsIHBhcmVudExpc3QsIGxpc3ROYW1lLCBkZXRhaWwpIHtcbiAgICAgIGlmIChwYXJlbnRMaXN0ID09PSBlZGl0b3IuZ2V0Qm9keSgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChwYXJlbnRMaXN0KSB7XG4gICAgICAgIGlmIChwYXJlbnRMaXN0Lm5vZGVOYW1lID09PSBsaXN0TmFtZSAmJiAhaGFzTGlzdFN0eWxlRGV0YWlsKGRldGFpbCkgJiYgIWlzQ3VzdG9tTGlzdChwYXJlbnRMaXN0KSkge1xuICAgICAgICAgIGZsYXR0ZW5MaXN0U2VsZWN0aW9uKGVkaXRvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGJvb2ttYXJrID0gY3JlYXRlQm9va21hcmsoZWRpdG9yLnNlbGVjdGlvbi5nZXRSbmcodHJ1ZSkpO1xuICAgICAgICAgIHVwZGF0ZUxpc3RXaXRoRGV0YWlscyhlZGl0b3IuZG9tLCBwYXJlbnRMaXN0LCBkZXRhaWwpO1xuICAgICAgICAgIHZhciBuZXdMaXN0ID0gZWRpdG9yLmRvbS5yZW5hbWUocGFyZW50TGlzdCwgbGlzdE5hbWUpO1xuICAgICAgICAgIG1lcmdlV2l0aEFkamFjZW50TGlzdHMoZWRpdG9yLmRvbSwgbmV3TGlzdCk7XG4gICAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5zZXRSbmcocmVzb2x2ZUJvb2ttYXJrKGJvb2ttYXJrKSk7XG4gICAgICAgICAgZmlyZUxpc3RFdmVudChlZGl0b3IsIGxpc3RUb2dnbGVBY3Rpb25Gcm9tTGlzdE5hbWUobGlzdE5hbWUpLCBuZXdMaXN0KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXBwbHlMaXN0KGVkaXRvciwgbGlzdE5hbWUsIGRldGFpbCk7XG4gICAgICAgIGZpcmVMaXN0RXZlbnQoZWRpdG9yLCBsaXN0VG9nZ2xlQWN0aW9uRnJvbUxpc3ROYW1lKGxpc3ROYW1lKSwgcGFyZW50TGlzdCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgdG9nZ2xlTGlzdCA9IGZ1bmN0aW9uIChlZGl0b3IsIGxpc3ROYW1lLCBkZXRhaWwpIHtcbiAgICAgIHZhciBwYXJlbnRMaXN0ID0gZ2V0UGFyZW50TGlzdChlZGl0b3IpO1xuICAgICAgdmFyIHNlbGVjdGVkU3ViTGlzdHMgPSBnZXRTZWxlY3RlZFN1Ykxpc3RzKGVkaXRvcik7XG4gICAgICBkZXRhaWwgPSBkZXRhaWwgPyBkZXRhaWwgOiB7fTtcbiAgICAgIGlmIChwYXJlbnRMaXN0ICYmIHNlbGVjdGVkU3ViTGlzdHMubGVuZ3RoID4gMCkge1xuICAgICAgICB0b2dnbGVNdWx0aXBsZUxpc3RzKGVkaXRvciwgcGFyZW50TGlzdCwgc2VsZWN0ZWRTdWJMaXN0cywgbGlzdE5hbWUsIGRldGFpbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b2dnbGVTaW5nbGVMaXN0KGVkaXRvciwgcGFyZW50TGlzdCwgbGlzdE5hbWUsIGRldGFpbCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBET00kMiA9IGdsb2JhbCQ2LkRPTTtcbiAgICB2YXIgbm9ybWFsaXplTGlzdCA9IGZ1bmN0aW9uIChkb20sIHVsKSB7XG4gICAgICB2YXIgc2libGluZztcbiAgICAgIHZhciBwYXJlbnROb2RlID0gdWwucGFyZW50Tm9kZTtcbiAgICAgIGlmIChwYXJlbnROb2RlLm5vZGVOYW1lID09PSAnTEknICYmIHBhcmVudE5vZGUuZmlyc3RDaGlsZCA9PT0gdWwpIHtcbiAgICAgICAgc2libGluZyA9IHBhcmVudE5vZGUucHJldmlvdXNTaWJsaW5nO1xuICAgICAgICBpZiAoc2libGluZyAmJiBzaWJsaW5nLm5vZGVOYW1lID09PSAnTEknKSB7XG4gICAgICAgICAgc2libGluZy5hcHBlbmRDaGlsZCh1bCk7XG4gICAgICAgICAgaWYgKGlzRW1wdHkoZG9tLCBwYXJlbnROb2RlKSkge1xuICAgICAgICAgICAgRE9NJDIucmVtb3ZlKHBhcmVudE5vZGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBET00kMi5zZXRTdHlsZShwYXJlbnROb2RlLCAnbGlzdFN0eWxlVHlwZScsICdub25lJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpc0xpc3ROb2RlKHBhcmVudE5vZGUpKSB7XG4gICAgICAgIHNpYmxpbmcgPSBwYXJlbnROb2RlLnByZXZpb3VzU2libGluZztcbiAgICAgICAgaWYgKHNpYmxpbmcgJiYgc2libGluZy5ub2RlTmFtZSA9PT0gJ0xJJykge1xuICAgICAgICAgIHNpYmxpbmcuYXBwZW5kQ2hpbGQodWwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgbm9ybWFsaXplTGlzdHMgPSBmdW5jdGlvbiAoZG9tLCBlbGVtZW50KSB7XG4gICAgICBnbG9iYWwkNS5lYWNoKGdsb2JhbCQ1LmdyZXAoZG9tLnNlbGVjdCgnb2wsdWwnLCBlbGVtZW50KSksIGZ1bmN0aW9uICh1bCkge1xuICAgICAgICBub3JtYWxpemVMaXN0KGRvbSwgdWwpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBmaW5kTmV4dENhcmV0Q29udGFpbmVyID0gZnVuY3Rpb24gKGVkaXRvciwgcm5nLCBpc0ZvcndhcmQsIHJvb3QpIHtcbiAgICAgIHZhciBub2RlID0gcm5nLnN0YXJ0Q29udGFpbmVyO1xuICAgICAgdmFyIG9mZnNldCA9IHJuZy5zdGFydE9mZnNldDtcbiAgICAgIGlmIChpc1RleHROb2RlKG5vZGUpICYmIChpc0ZvcndhcmQgPyBvZmZzZXQgPCBub2RlLmRhdGEubGVuZ3RoIDogb2Zmc2V0ID4gMCkpIHtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICB9XG4gICAgICB2YXIgbm9uRW1wdHlCbG9ja3MgPSBlZGl0b3Iuc2NoZW1hLmdldE5vbkVtcHR5RWxlbWVudHMoKTtcbiAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgICAgIG5vZGUgPSBnbG9iYWwkMS5nZXROb2RlKG5vZGUsIG9mZnNldCk7XG4gICAgICB9XG4gICAgICB2YXIgd2Fsa2VyID0gbmV3IGdsb2JhbCQyKG5vZGUsIHJvb3QpO1xuICAgICAgaWYgKGlzRm9yd2FyZCkge1xuICAgICAgICBpZiAoaXNCb2d1c0JyKGVkaXRvci5kb20sIG5vZGUpKSB7XG4gICAgICAgICAgd2Fsa2VyLm5leHQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgd2hpbGUgKG5vZGUgPSB3YWxrZXJbaXNGb3J3YXJkID8gJ25leHQnIDogJ3ByZXYyJ10oKSkge1xuICAgICAgICBpZiAobm9kZS5ub2RlTmFtZSA9PT0gJ0xJJyAmJiAhbm9kZS5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9uRW1wdHlCbG9ja3Nbbm9kZS5ub2RlTmFtZV0pIHtcbiAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNUZXh0Tm9kZShub2RlKSAmJiBub2RlLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgaGFzT25seU9uZUJsb2NrQ2hpbGQgPSBmdW5jdGlvbiAoZG9tLCBlbG0pIHtcbiAgICAgIHZhciBjaGlsZE5vZGVzID0gZWxtLmNoaWxkTm9kZXM7XG4gICAgICByZXR1cm4gY2hpbGROb2Rlcy5sZW5ndGggPT09IDEgJiYgIWlzTGlzdE5vZGUoY2hpbGROb2Rlc1swXSkgJiYgZG9tLmlzQmxvY2soY2hpbGROb2Rlc1swXSk7XG4gICAgfTtcbiAgICB2YXIgdW53cmFwU2luZ2xlQmxvY2tDaGlsZCA9IGZ1bmN0aW9uIChkb20sIGVsbSkge1xuICAgICAgaWYgKGhhc09ubHlPbmVCbG9ja0NoaWxkKGRvbSwgZWxtKSkge1xuICAgICAgICBkb20ucmVtb3ZlKGVsbS5maXJzdENoaWxkLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBtb3ZlQ2hpbGRyZW4gPSBmdW5jdGlvbiAoZG9tLCBmcm9tRWxtLCB0b0VsbSkge1xuICAgICAgdmFyIG5vZGU7XG4gICAgICB2YXIgdGFyZ2V0RWxtID0gaGFzT25seU9uZUJsb2NrQ2hpbGQoZG9tLCB0b0VsbSkgPyB0b0VsbS5maXJzdENoaWxkIDogdG9FbG07XG4gICAgICB1bndyYXBTaW5nbGVCbG9ja0NoaWxkKGRvbSwgZnJvbUVsbSk7XG4gICAgICBpZiAoIWlzRW1wdHkoZG9tLCBmcm9tRWxtLCB0cnVlKSkge1xuICAgICAgICB3aGlsZSAobm9kZSA9IGZyb21FbG0uZmlyc3RDaGlsZCkge1xuICAgICAgICAgIHRhcmdldEVsbS5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgdmFyIG1lcmdlTGlFbGVtZW50cyA9IGZ1bmN0aW9uIChkb20sIGZyb21FbG0sIHRvRWxtKSB7XG4gICAgICB2YXIgbGlzdE5vZGU7XG4gICAgICB2YXIgdWwgPSBmcm9tRWxtLnBhcmVudE5vZGU7XG4gICAgICBpZiAoIWlzQ2hpbGRPZkJvZHkoZG9tLCBmcm9tRWxtKSB8fCAhaXNDaGlsZE9mQm9keShkb20sIHRvRWxtKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoaXNMaXN0Tm9kZSh0b0VsbS5sYXN0Q2hpbGQpKSB7XG4gICAgICAgIGxpc3ROb2RlID0gdG9FbG0ubGFzdENoaWxkO1xuICAgICAgfVxuICAgICAgaWYgKHVsID09PSB0b0VsbS5sYXN0Q2hpbGQpIHtcbiAgICAgICAgaWYgKGlzQnIodWwucHJldmlvdXNTaWJsaW5nKSkge1xuICAgICAgICAgIGRvbS5yZW1vdmUodWwucHJldmlvdXNTaWJsaW5nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIG5vZGUgPSB0b0VsbS5sYXN0Q2hpbGQ7XG4gICAgICBpZiAobm9kZSAmJiBpc0JyKG5vZGUpICYmIGZyb21FbG0uaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICAgIGRvbS5yZW1vdmUobm9kZSk7XG4gICAgICB9XG4gICAgICBpZiAoaXNFbXB0eShkb20sIHRvRWxtLCB0cnVlKSkge1xuICAgICAgICBkb20uJCh0b0VsbSkuZW1wdHkoKTtcbiAgICAgIH1cbiAgICAgIG1vdmVDaGlsZHJlbihkb20sIGZyb21FbG0sIHRvRWxtKTtcbiAgICAgIGlmIChsaXN0Tm9kZSkge1xuICAgICAgICB0b0VsbS5hcHBlbmRDaGlsZChsaXN0Tm9kZSk7XG4gICAgICB9XG4gICAgICB2YXIgY29udGFpbnMgPSBjb250YWlucyQxKEVsZW1lbnQuZnJvbURvbSh0b0VsbSksIEVsZW1lbnQuZnJvbURvbShmcm9tRWxtKSk7XG4gICAgICB2YXIgbmVzdGVkTGlzdHMgPSBjb250YWlucyA/IGRvbS5nZXRQYXJlbnRzKGZyb21FbG0sIGlzTGlzdE5vZGUsIHRvRWxtKSA6IFtdO1xuICAgICAgZG9tLnJlbW92ZShmcm9tRWxtKTtcbiAgICAgIGVhY2gobmVzdGVkTGlzdHMsIGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICAgIGlmIChpc0VtcHR5KGRvbSwgbGlzdCkgJiYgbGlzdCAhPT0gZG9tLmdldFJvb3QoKSkge1xuICAgICAgICAgIGRvbS5yZW1vdmUobGlzdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIG1lcmdlSW50b0VtcHR5TGkgPSBmdW5jdGlvbiAoZWRpdG9yLCBmcm9tTGksIHRvTGkpIHtcbiAgICAgIGVkaXRvci5kb20uJCh0b0xpKS5lbXB0eSgpO1xuICAgICAgbWVyZ2VMaUVsZW1lbnRzKGVkaXRvci5kb20sIGZyb21MaSwgdG9MaSk7XG4gICAgICBlZGl0b3Iuc2VsZWN0aW9uLnNldEN1cnNvckxvY2F0aW9uKHRvTGkpO1xuICAgIH07XG4gICAgdmFyIG1lcmdlRm9yd2FyZCA9IGZ1bmN0aW9uIChlZGl0b3IsIHJuZywgZnJvbUxpLCB0b0xpKSB7XG4gICAgICB2YXIgZG9tID0gZWRpdG9yLmRvbTtcbiAgICAgIGlmIChkb20uaXNFbXB0eSh0b0xpKSkge1xuICAgICAgICBtZXJnZUludG9FbXB0eUxpKGVkaXRvciwgZnJvbUxpLCB0b0xpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBib29rbWFyayA9IGNyZWF0ZUJvb2ttYXJrKHJuZyk7XG4gICAgICAgIG1lcmdlTGlFbGVtZW50cyhkb20sIGZyb21MaSwgdG9MaSk7XG4gICAgICAgIGVkaXRvci5zZWxlY3Rpb24uc2V0Um5nKHJlc29sdmVCb29rbWFyayhib29rbWFyaykpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIG1lcmdlQmFja3dhcmQgPSBmdW5jdGlvbiAoZWRpdG9yLCBybmcsIGZyb21MaSwgdG9MaSkge1xuICAgICAgdmFyIGJvb2ttYXJrID0gY3JlYXRlQm9va21hcmsocm5nKTtcbiAgICAgIG1lcmdlTGlFbGVtZW50cyhlZGl0b3IuZG9tLCBmcm9tTGksIHRvTGkpO1xuICAgICAgdmFyIHJlc29sdmVkQm9va21hcmsgPSByZXNvbHZlQm9va21hcmsoYm9va21hcmspO1xuICAgICAgZWRpdG9yLnNlbGVjdGlvbi5zZXRSbmcocmVzb2x2ZWRCb29rbWFyayk7XG4gICAgfTtcbiAgICB2YXIgYmFja3NwYWNlRGVsZXRlRnJvbUxpc3RUb0xpc3RDYXJldCA9IGZ1bmN0aW9uIChlZGl0b3IsIGlzRm9yd2FyZCkge1xuICAgICAgdmFyIGRvbSA9IGVkaXRvci5kb20sIHNlbGVjdGlvbiA9IGVkaXRvci5zZWxlY3Rpb247XG4gICAgICB2YXIgc2VsZWN0aW9uU3RhcnRFbG0gPSBzZWxlY3Rpb24uZ2V0U3RhcnQoKTtcbiAgICAgIHZhciByb290ID0gZ2V0Q2xvc2VzdExpc3RSb290RWxtKGVkaXRvciwgc2VsZWN0aW9uU3RhcnRFbG0pO1xuICAgICAgdmFyIGxpID0gZG9tLmdldFBhcmVudChzZWxlY3Rpb24uZ2V0U3RhcnQoKSwgJ0xJJywgcm9vdCk7XG4gICAgICBpZiAobGkpIHtcbiAgICAgICAgdmFyIHVsID0gbGkucGFyZW50Tm9kZTtcbiAgICAgICAgaWYgKHVsID09PSBlZGl0b3IuZ2V0Qm9keSgpICYmIGlzRW1wdHkoZG9tLCB1bCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcm5nXzEgPSBub3JtYWxpemVSYW5nZShzZWxlY3Rpb24uZ2V0Um5nKCkpO1xuICAgICAgICB2YXIgb3RoZXJMaV8xID0gZG9tLmdldFBhcmVudChmaW5kTmV4dENhcmV0Q29udGFpbmVyKGVkaXRvciwgcm5nXzEsIGlzRm9yd2FyZCwgcm9vdCksICdMSScsIHJvb3QpO1xuICAgICAgICBpZiAob3RoZXJMaV8xICYmIG90aGVyTGlfMSAhPT0gbGkpIHtcbiAgICAgICAgICBlZGl0b3IudW5kb01hbmFnZXIudHJhbnNhY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGlzRm9yd2FyZCkge1xuICAgICAgICAgICAgICBtZXJnZUZvcndhcmQoZWRpdG9yLCBybmdfMSwgb3RoZXJMaV8xLCBsaSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoaXNGaXJzdENoaWxkKGxpKSkge1xuICAgICAgICAgICAgICAgIG91dGRlbnRMaXN0U2VsZWN0aW9uKGVkaXRvcik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWVyZ2VCYWNrd2FyZChlZGl0b3IsIHJuZ18xLCBsaSwgb3RoZXJMaV8xKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKCFvdGhlckxpXzEpIHtcbiAgICAgICAgICBpZiAoIWlzRm9yd2FyZCAmJiBybmdfMS5zdGFydE9mZnNldCA9PT0gMCAmJiBybmdfMS5lbmRPZmZzZXQgPT09IDApIHtcbiAgICAgICAgICAgIGVkaXRvci51bmRvTWFuYWdlci50cmFuc2FjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGZsYXR0ZW5MaXN0U2VsZWN0aW9uKGVkaXRvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgdmFyIHJlbW92ZUJsb2NrID0gZnVuY3Rpb24gKGRvbSwgYmxvY2ssIHJvb3QpIHtcbiAgICAgIHZhciBwYXJlbnRCbG9jayA9IGRvbS5nZXRQYXJlbnQoYmxvY2sucGFyZW50Tm9kZSwgZG9tLmlzQmxvY2ssIHJvb3QpO1xuICAgICAgZG9tLnJlbW92ZShibG9jayk7XG4gICAgICBpZiAocGFyZW50QmxvY2sgJiYgZG9tLmlzRW1wdHkocGFyZW50QmxvY2spKSB7XG4gICAgICAgIGRvbS5yZW1vdmUocGFyZW50QmxvY2spO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGJhY2tzcGFjZURlbGV0ZUludG9MaXN0Q2FyZXQgPSBmdW5jdGlvbiAoZWRpdG9yLCBpc0ZvcndhcmQpIHtcbiAgICAgIHZhciBkb20gPSBlZGl0b3IuZG9tO1xuICAgICAgdmFyIHNlbGVjdGlvblN0YXJ0RWxtID0gZWRpdG9yLnNlbGVjdGlvbi5nZXRTdGFydCgpO1xuICAgICAgdmFyIHJvb3QgPSBnZXRDbG9zZXN0TGlzdFJvb3RFbG0oZWRpdG9yLCBzZWxlY3Rpb25TdGFydEVsbSk7XG4gICAgICB2YXIgYmxvY2sgPSBkb20uZ2V0UGFyZW50KHNlbGVjdGlvblN0YXJ0RWxtLCBkb20uaXNCbG9jaywgcm9vdCk7XG4gICAgICBpZiAoYmxvY2sgJiYgZG9tLmlzRW1wdHkoYmxvY2spKSB7XG4gICAgICAgIHZhciBybmcgPSBub3JtYWxpemVSYW5nZShlZGl0b3Iuc2VsZWN0aW9uLmdldFJuZygpKTtcbiAgICAgICAgdmFyIG90aGVyTGlfMiA9IGRvbS5nZXRQYXJlbnQoZmluZE5leHRDYXJldENvbnRhaW5lcihlZGl0b3IsIHJuZywgaXNGb3J3YXJkLCByb290KSwgJ0xJJywgcm9vdCk7XG4gICAgICAgIGlmIChvdGhlckxpXzIpIHtcbiAgICAgICAgICBlZGl0b3IudW5kb01hbmFnZXIudHJhbnNhY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmVtb3ZlQmxvY2soZG9tLCBibG9jaywgcm9vdCk7XG4gICAgICAgICAgICBtZXJnZVdpdGhBZGphY2VudExpc3RzKGRvbSwgb3RoZXJMaV8yLnBhcmVudE5vZGUpO1xuICAgICAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5zZWxlY3Qob3RoZXJMaV8yLCB0cnVlKTtcbiAgICAgICAgICAgIGVkaXRvci5zZWxlY3Rpb24uY29sbGFwc2UoaXNGb3J3YXJkKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgdmFyIGJhY2tzcGFjZURlbGV0ZUNhcmV0ID0gZnVuY3Rpb24gKGVkaXRvciwgaXNGb3J3YXJkKSB7XG4gICAgICByZXR1cm4gYmFja3NwYWNlRGVsZXRlRnJvbUxpc3RUb0xpc3RDYXJldChlZGl0b3IsIGlzRm9yd2FyZCkgfHwgYmFja3NwYWNlRGVsZXRlSW50b0xpc3RDYXJldChlZGl0b3IsIGlzRm9yd2FyZCk7XG4gICAgfTtcbiAgICB2YXIgYmFja3NwYWNlRGVsZXRlUmFuZ2UgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgc2VsZWN0aW9uU3RhcnRFbG0gPSBlZGl0b3Iuc2VsZWN0aW9uLmdldFN0YXJ0KCk7XG4gICAgICB2YXIgcm9vdCA9IGdldENsb3Nlc3RMaXN0Um9vdEVsbShlZGl0b3IsIHNlbGVjdGlvblN0YXJ0RWxtKTtcbiAgICAgIHZhciBzdGFydExpc3RQYXJlbnQgPSBlZGl0b3IuZG9tLmdldFBhcmVudChzZWxlY3Rpb25TdGFydEVsbSwgJ0xJLERULEREJywgcm9vdCk7XG4gICAgICBpZiAoc3RhcnRMaXN0UGFyZW50IHx8IGdldFNlbGVjdGVkTGlzdEl0ZW1zKGVkaXRvcikubGVuZ3RoID4gMCkge1xuICAgICAgICBlZGl0b3IudW5kb01hbmFnZXIudHJhbnNhY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGVkaXRvci5leGVjQ29tbWFuZCgnRGVsZXRlJyk7XG4gICAgICAgICAgbm9ybWFsaXplTGlzdHMoZWRpdG9yLmRvbSwgZWRpdG9yLmdldEJvZHkoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIHZhciBiYWNrc3BhY2VEZWxldGUgPSBmdW5jdGlvbiAoZWRpdG9yLCBpc0ZvcndhcmQpIHtcbiAgICAgIHJldHVybiBlZGl0b3Iuc2VsZWN0aW9uLmlzQ29sbGFwc2VkKCkgPyBiYWNrc3BhY2VEZWxldGVDYXJldChlZGl0b3IsIGlzRm9yd2FyZCkgOiBiYWNrc3BhY2VEZWxldGVSYW5nZShlZGl0b3IpO1xuICAgIH07XG4gICAgdmFyIHNldHVwID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgZWRpdG9yLm9uKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gZ2xvYmFsJDMuQkFDS1NQQUNFKSB7XG4gICAgICAgICAgaWYgKGJhY2tzcGFjZURlbGV0ZShlZGl0b3IsIGZhbHNlKSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT09IGdsb2JhbCQzLkRFTEVURSkge1xuICAgICAgICAgIGlmIChiYWNrc3BhY2VEZWxldGUoZWRpdG9yLCB0cnVlKSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBnZXQgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBiYWNrc3BhY2VEZWxldGU6IGZ1bmN0aW9uIChpc0ZvcndhcmQpIHtcbiAgICAgICAgICBiYWNrc3BhY2VEZWxldGUoZWRpdG9yLCBpc0ZvcndhcmQpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgb3BlbiA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBkb20gPSBlZGl0b3IuZG9tO1xuICAgICAgdmFyIGN1cnJlbnRMaXN0ID0gZ2V0UGFyZW50TGlzdChlZGl0b3IpO1xuICAgICAgaWYgKCFpc09sTm9kZShjdXJyZW50TGlzdCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZWRpdG9yLndpbmRvd01hbmFnZXIub3Blbih7XG4gICAgICAgIHRpdGxlOiAnTGlzdCBQcm9wZXJ0aWVzJyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIHR5cGU6ICdwYW5lbCcsXG4gICAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgICAgICAgIG5hbWU6ICdzdGFydCcsXG4gICAgICAgICAgICAgIGxhYmVsOiAnU3RhcnQgbGlzdCBhdCBudW1iZXInLFxuICAgICAgICAgICAgICBpbnB1dE1vZGU6ICdudW1lcmljJ1xuICAgICAgICAgICAgfV1cbiAgICAgICAgfSxcbiAgICAgICAgaW5pdGlhbERhdGE6IHsgc3RhcnQ6IGRvbS5nZXRBdHRyaWIoY3VycmVudExpc3QsICdzdGFydCcpIHx8ICcxJyB9LFxuICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2NhbmNlbCcsXG4gICAgICAgICAgICBuYW1lOiAnY2FuY2VsJyxcbiAgICAgICAgICAgIHRleHQ6ICdDYW5jZWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnc3VibWl0JyxcbiAgICAgICAgICAgIG5hbWU6ICdzYXZlJyxcbiAgICAgICAgICAgIHRleHQ6ICdTYXZlJyxcbiAgICAgICAgICAgIHByaW1hcnk6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIG9uU3VibWl0OiBmdW5jdGlvbiAoYXBpKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSBhcGkuZ2V0RGF0YSgpO1xuICAgICAgICAgIGVkaXRvci51bmRvTWFuYWdlci50cmFuc2FjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkb20uc2V0QXR0cmliKGdldFBhcmVudExpc3QoZWRpdG9yKSwgJ3N0YXJ0JywgZGF0YS5zdGFydCA9PT0gJzEnID8gJycgOiBkYXRhLnN0YXJ0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBhcGkuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBxdWVyeUxpc3RDb21tYW5kU3RhdGUgPSBmdW5jdGlvbiAoZWRpdG9yLCBsaXN0TmFtZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBhcmVudExpc3QgPSBlZGl0b3IuZG9tLmdldFBhcmVudChlZGl0b3Iuc2VsZWN0aW9uLmdldFN0YXJ0KCksICdVTCxPTCxETCcpO1xuICAgICAgICByZXR1cm4gcGFyZW50TGlzdCAmJiBwYXJlbnRMaXN0Lm5vZGVOYW1lID09PSBsaXN0TmFtZTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgcmVnaXN0ZXIgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBlZGl0b3Iub24oJ0JlZm9yZUV4ZWNDb21tYW5kJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIGNtZCA9IGUuY29tbWFuZC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoY21kID09PSAnaW5kZW50Jykge1xuICAgICAgICAgIGluZGVudExpc3RTZWxlY3Rpb24oZWRpdG9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChjbWQgPT09ICdvdXRkZW50Jykge1xuICAgICAgICAgIG91dGRlbnRMaXN0U2VsZWN0aW9uKGVkaXRvcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLmFkZENvbW1hbmQoJ0luc2VydFVub3JkZXJlZExpc3QnLCBmdW5jdGlvbiAodWksIGRldGFpbCkge1xuICAgICAgICB0b2dnbGVMaXN0KGVkaXRvciwgJ1VMJywgZGV0YWlsKTtcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLmFkZENvbW1hbmQoJ0luc2VydE9yZGVyZWRMaXN0JywgZnVuY3Rpb24gKHVpLCBkZXRhaWwpIHtcbiAgICAgICAgdG9nZ2xlTGlzdChlZGl0b3IsICdPTCcsIGRldGFpbCk7XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci5hZGRDb21tYW5kKCdJbnNlcnREZWZpbml0aW9uTGlzdCcsIGZ1bmN0aW9uICh1aSwgZGV0YWlsKSB7XG4gICAgICAgIHRvZ2dsZUxpc3QoZWRpdG9yLCAnREwnLCBkZXRhaWwpO1xuICAgICAgfSk7XG4gICAgICBlZGl0b3IuYWRkQ29tbWFuZCgnUmVtb3ZlTGlzdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZmxhdHRlbkxpc3RTZWxlY3Rpb24oZWRpdG9yKTtcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLmFkZENvbW1hbmQoJ21jZUxpc3RQcm9wcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb3BlbihlZGl0b3IpO1xuICAgICAgfSk7XG4gICAgICBlZGl0b3IuYWRkUXVlcnlTdGF0ZUhhbmRsZXIoJ0luc2VydFVub3JkZXJlZExpc3QnLCBxdWVyeUxpc3RDb21tYW5kU3RhdGUoZWRpdG9yLCAnVUwnKSk7XG4gICAgICBlZGl0b3IuYWRkUXVlcnlTdGF0ZUhhbmRsZXIoJ0luc2VydE9yZGVyZWRMaXN0JywgcXVlcnlMaXN0Q29tbWFuZFN0YXRlKGVkaXRvciwgJ09MJykpO1xuICAgICAgZWRpdG9yLmFkZFF1ZXJ5U3RhdGVIYW5kbGVyKCdJbnNlcnREZWZpbml0aW9uTGlzdCcsIHF1ZXJ5TGlzdENvbW1hbmRTdGF0ZShlZGl0b3IsICdETCcpKTtcbiAgICB9O1xuXG4gICAgdmFyIGhhc1J0Y1BsdWdpbiA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIGlmICgvKF58WyAsXSlydGMoWywgXXwkKS8udGVzdChlZGl0b3IuZ2V0UGFyYW0oJ3BsdWdpbnMnLCAnJywgJ3N0cmluZycpKSAmJiBnbG9iYWwuZ2V0KCdydGMnKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIHNldHVwVGFiS2V5ID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgZWRpdG9yLm9uKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSAhPT0gZ2xvYmFsJDMuVEFCIHx8IGdsb2JhbCQzLm1ldGFLZXlQcmVzc2VkKGUpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVkaXRvci51bmRvTWFuYWdlci50cmFuc2FjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKGUuc2hpZnRLZXkgPyBvdXRkZW50TGlzdFNlbGVjdGlvbihlZGl0b3IpIDogaW5kZW50TGlzdFNlbGVjdGlvbihlZGl0b3IpKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHNldHVwJDEgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBpZiAoc2hvdWxkSW5kZW50T25UYWIoZWRpdG9yKSkge1xuICAgICAgICBzZXR1cFRhYktleShlZGl0b3IpO1xuICAgICAgfVxuICAgICAgc2V0dXAoZWRpdG9yKTtcbiAgICB9O1xuXG4gICAgdmFyIHJlZ2lzdGVyJDEgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgaGFzUGx1Z2luID0gZnVuY3Rpb24gKGVkaXRvciwgcGx1Z2luKSB7XG4gICAgICAgIHZhciBwbHVnaW5zID0gZWRpdG9yLmdldFBhcmFtKCdwbHVnaW5zJywgJycsICdzdHJpbmcnKTtcbiAgICAgICAgcmV0dXJuIGdsb2JhbCQ1LmluQXJyYXkocGx1Z2lucy5zcGxpdCgvWyAsXS8pLCBwbHVnaW4pICE9PSAtMTtcbiAgICAgIH07XG4gICAgICB2YXIgZXhlYyA9IGZ1bmN0aW9uIChjb21tYW5kKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci5leGVjQ29tbWFuZChjb21tYW5kKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICBpZiAoIWhhc1BsdWdpbihlZGl0b3IsICdhZHZsaXN0JykpIHtcbiAgICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZFRvZ2dsZUJ1dHRvbignbnVtbGlzdCcsIHtcbiAgICAgICAgICBpY29uOiAnb3JkZXJlZC1saXN0JyxcbiAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgIHRvb2x0aXA6ICdOdW1iZXJlZCBsaXN0JyxcbiAgICAgICAgICBvbkFjdGlvbjogZXhlYygnSW5zZXJ0T3JkZXJlZExpc3QnKSxcbiAgICAgICAgICBvblNldHVwOiBmdW5jdGlvbiAoYXBpKSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdFN0YXRlKGVkaXRvciwgJ09MJywgYXBpLnNldEFjdGl2ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZFRvZ2dsZUJ1dHRvbignYnVsbGlzdCcsIHtcbiAgICAgICAgICBpY29uOiAndW5vcmRlcmVkLWxpc3QnLFxuICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgdG9vbHRpcDogJ0J1bGxldCBsaXN0JyxcbiAgICAgICAgICBvbkFjdGlvbjogZXhlYygnSW5zZXJ0VW5vcmRlcmVkTGlzdCcpLFxuICAgICAgICAgIG9uU2V0dXA6IGZ1bmN0aW9uIChhcGkpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0U3RhdGUoZWRpdG9yLCAnVUwnLCBhcGkuc2V0QWN0aXZlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgcmVnaXN0ZXIkMiA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBsaXN0UHJvcGVydGllcyA9IHtcbiAgICAgICAgdGV4dDogJ0xpc3QgcHJvcGVydGllcy4uLicsXG4gICAgICAgIGljb246ICdvcmRlcmVkLWxpc3QnLFxuICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBvcGVuKGVkaXRvcik7XG4gICAgICAgIH0sXG4gICAgICAgIG9uU2V0dXA6IGZ1bmN0aW9uIChhcGkpIHtcbiAgICAgICAgICByZXR1cm4gbGlzdFN0YXRlKGVkaXRvciwgJ09MJywgZnVuY3Rpb24gKGFjdGl2ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGFwaS5zZXREaXNhYmxlZCghYWN0aXZlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRNZW51SXRlbSgnbGlzdHByb3BzJywgbGlzdFByb3BlcnRpZXMpO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZENvbnRleHRNZW51KCdsaXN0cycsIHtcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgIHZhciBwYXJlbnRMaXN0ID0gZ2V0UGFyZW50TGlzdChlZGl0b3IsIG5vZGUpO1xuICAgICAgICAgIHJldHVybiBpc09sTm9kZShwYXJlbnRMaXN0KSA/IFsnbGlzdHByb3BzJ10gOiBbXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFBsdWdpbiAoKSB7XG4gICAgICBnbG9iYWwuYWRkKCdsaXN0cycsIGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgICAgaWYgKGhhc1J0Y1BsdWdpbihlZGl0b3IpID09PSBmYWxzZSkge1xuICAgICAgICAgIHNldHVwJDEoZWRpdG9yKTtcbiAgICAgICAgICByZWdpc3RlcihlZGl0b3IpO1xuICAgICAgICB9XG4gICAgICAgIHJlZ2lzdGVyJDEoZWRpdG9yKTtcbiAgICAgICAgcmVnaXN0ZXIkMihlZGl0b3IpO1xuICAgICAgICByZXR1cm4gZ2V0KGVkaXRvcik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBQbHVnaW4oKTtcblxufSh3aW5kb3cpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=