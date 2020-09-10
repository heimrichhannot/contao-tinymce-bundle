(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~tinymce-plugin-charmap~tinymce-plugin-charmap-plugin"],{

/***/ "./node_modules/tinymce/plugins/charmap/plugin.js":
/*!********************************************************!*\
  !*** ./node_modules/tinymce/plugins/charmap/plugin.js ***!
  \********************************************************/
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

    var fireInsertCustomChar = function (editor, chr) {
      return editor.fire('insertCustomChar', { chr: chr });
    };

    var insertChar = function (editor, chr) {
      var evtChr = fireInsertCustomChar(editor, chr).chr;
      editor.execCommand('mceInsertContent', false, evtChr);
    };

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var getCharMap = function (editor) {
      return editor.getParam('charmap');
    };
    var getCharMapAppend = function (editor) {
      return editor.getParam('charmap_append');
    };

    var noop = function () {
    };
    var constant = function (value) {
      return function () {
        return value;
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
    var isArray = isType('array');

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

    var isArray$1 = global$1.isArray;
    var UserDefined = 'User Defined';
    var getDefaultCharMap = function () {
      return [
        {
          name: 'Currency',
          characters: [
            [
              36,
              'dollar sign'
            ],
            [
              162,
              'cent sign'
            ],
            [
              8364,
              'euro sign'
            ],
            [
              163,
              'pound sign'
            ],
            [
              165,
              'yen sign'
            ],
            [
              164,
              'currency sign'
            ],
            [
              8352,
              'euro-currency sign'
            ],
            [
              8353,
              'colon sign'
            ],
            [
              8354,
              'cruzeiro sign'
            ],
            [
              8355,
              'french franc sign'
            ],
            [
              8356,
              'lira sign'
            ],
            [
              8357,
              'mill sign'
            ],
            [
              8358,
              'naira sign'
            ],
            [
              8359,
              'peseta sign'
            ],
            [
              8360,
              'rupee sign'
            ],
            [
              8361,
              'won sign'
            ],
            [
              8362,
              'new sheqel sign'
            ],
            [
              8363,
              'dong sign'
            ],
            [
              8365,
              'kip sign'
            ],
            [
              8366,
              'tugrik sign'
            ],
            [
              8367,
              'drachma sign'
            ],
            [
              8368,
              'german penny symbol'
            ],
            [
              8369,
              'peso sign'
            ],
            [
              8370,
              'guarani sign'
            ],
            [
              8371,
              'austral sign'
            ],
            [
              8372,
              'hryvnia sign'
            ],
            [
              8373,
              'cedi sign'
            ],
            [
              8374,
              'livre tournois sign'
            ],
            [
              8375,
              'spesmilo sign'
            ],
            [
              8376,
              'tenge sign'
            ],
            [
              8377,
              'indian rupee sign'
            ],
            [
              8378,
              'turkish lira sign'
            ],
            [
              8379,
              'nordic mark sign'
            ],
            [
              8380,
              'manat sign'
            ],
            [
              8381,
              'ruble sign'
            ],
            [
              20870,
              'yen character'
            ],
            [
              20803,
              'yuan character'
            ],
            [
              22291,
              'yuan character, in hong kong and taiwan'
            ],
            [
              22278,
              'yen/yuan character variant one'
            ]
          ]
        },
        {
          name: 'Text',
          characters: [
            [
              169,
              'copyright sign'
            ],
            [
              174,
              'registered sign'
            ],
            [
              8482,
              'trade mark sign'
            ],
            [
              8240,
              'per mille sign'
            ],
            [
              181,
              'micro sign'
            ],
            [
              183,
              'middle dot'
            ],
            [
              8226,
              'bullet'
            ],
            [
              8230,
              'three dot leader'
            ],
            [
              8242,
              'minutes / feet'
            ],
            [
              8243,
              'seconds / inches'
            ],
            [
              167,
              'section sign'
            ],
            [
              182,
              'paragraph sign'
            ],
            [
              223,
              'sharp s / ess-zed'
            ]
          ]
        },
        {
          name: 'Quotations',
          characters: [
            [
              8249,
              'single left-pointing angle quotation mark'
            ],
            [
              8250,
              'single right-pointing angle quotation mark'
            ],
            [
              171,
              'left pointing guillemet'
            ],
            [
              187,
              'right pointing guillemet'
            ],
            [
              8216,
              'left single quotation mark'
            ],
            [
              8217,
              'right single quotation mark'
            ],
            [
              8220,
              'left double quotation mark'
            ],
            [
              8221,
              'right double quotation mark'
            ],
            [
              8218,
              'single low-9 quotation mark'
            ],
            [
              8222,
              'double low-9 quotation mark'
            ],
            [
              60,
              'less-than sign'
            ],
            [
              62,
              'greater-than sign'
            ],
            [
              8804,
              'less-than or equal to'
            ],
            [
              8805,
              'greater-than or equal to'
            ],
            [
              8211,
              'en dash'
            ],
            [
              8212,
              'em dash'
            ],
            [
              175,
              'macron'
            ],
            [
              8254,
              'overline'
            ],
            [
              164,
              'currency sign'
            ],
            [
              166,
              'broken bar'
            ],
            [
              168,
              'diaeresis'
            ],
            [
              161,
              'inverted exclamation mark'
            ],
            [
              191,
              'turned question mark'
            ],
            [
              710,
              'circumflex accent'
            ],
            [
              732,
              'small tilde'
            ],
            [
              176,
              'degree sign'
            ],
            [
              8722,
              'minus sign'
            ],
            [
              177,
              'plus-minus sign'
            ],
            [
              247,
              'division sign'
            ],
            [
              8260,
              'fraction slash'
            ],
            [
              215,
              'multiplication sign'
            ],
            [
              185,
              'superscript one'
            ],
            [
              178,
              'superscript two'
            ],
            [
              179,
              'superscript three'
            ],
            [
              188,
              'fraction one quarter'
            ],
            [
              189,
              'fraction one half'
            ],
            [
              190,
              'fraction three quarters'
            ]
          ]
        },
        {
          name: 'Mathematical',
          characters: [
            [
              402,
              'function / florin'
            ],
            [
              8747,
              'integral'
            ],
            [
              8721,
              'n-ary sumation'
            ],
            [
              8734,
              'infinity'
            ],
            [
              8730,
              'square root'
            ],
            [
              8764,
              'similar to'
            ],
            [
              8773,
              'approximately equal to'
            ],
            [
              8776,
              'almost equal to'
            ],
            [
              8800,
              'not equal to'
            ],
            [
              8801,
              'identical to'
            ],
            [
              8712,
              'element of'
            ],
            [
              8713,
              'not an element of'
            ],
            [
              8715,
              'contains as member'
            ],
            [
              8719,
              'n-ary product'
            ],
            [
              8743,
              'logical and'
            ],
            [
              8744,
              'logical or'
            ],
            [
              172,
              'not sign'
            ],
            [
              8745,
              'intersection'
            ],
            [
              8746,
              'union'
            ],
            [
              8706,
              'partial differential'
            ],
            [
              8704,
              'for all'
            ],
            [
              8707,
              'there exists'
            ],
            [
              8709,
              'diameter'
            ],
            [
              8711,
              'backward difference'
            ],
            [
              8727,
              'asterisk operator'
            ],
            [
              8733,
              'proportional to'
            ],
            [
              8736,
              'angle'
            ]
          ]
        },
        {
          name: 'Extended Latin',
          characters: [
            [
              192,
              'A - grave'
            ],
            [
              193,
              'A - acute'
            ],
            [
              194,
              'A - circumflex'
            ],
            [
              195,
              'A - tilde'
            ],
            [
              196,
              'A - diaeresis'
            ],
            [
              197,
              'A - ring above'
            ],
            [
              256,
              'A - macron'
            ],
            [
              198,
              'ligature AE'
            ],
            [
              199,
              'C - cedilla'
            ],
            [
              200,
              'E - grave'
            ],
            [
              201,
              'E - acute'
            ],
            [
              202,
              'E - circumflex'
            ],
            [
              203,
              'E - diaeresis'
            ],
            [
              274,
              'E - macron'
            ],
            [
              204,
              'I - grave'
            ],
            [
              205,
              'I - acute'
            ],
            [
              206,
              'I - circumflex'
            ],
            [
              207,
              'I - diaeresis'
            ],
            [
              298,
              'I - macron'
            ],
            [
              208,
              'ETH'
            ],
            [
              209,
              'N - tilde'
            ],
            [
              210,
              'O - grave'
            ],
            [
              211,
              'O - acute'
            ],
            [
              212,
              'O - circumflex'
            ],
            [
              213,
              'O - tilde'
            ],
            [
              214,
              'O - diaeresis'
            ],
            [
              216,
              'O - slash'
            ],
            [
              332,
              'O - macron'
            ],
            [
              338,
              'ligature OE'
            ],
            [
              352,
              'S - caron'
            ],
            [
              217,
              'U - grave'
            ],
            [
              218,
              'U - acute'
            ],
            [
              219,
              'U - circumflex'
            ],
            [
              220,
              'U - diaeresis'
            ],
            [
              362,
              'U - macron'
            ],
            [
              221,
              'Y - acute'
            ],
            [
              376,
              'Y - diaeresis'
            ],
            [
              562,
              'Y - macron'
            ],
            [
              222,
              'THORN'
            ],
            [
              224,
              'a - grave'
            ],
            [
              225,
              'a - acute'
            ],
            [
              226,
              'a - circumflex'
            ],
            [
              227,
              'a - tilde'
            ],
            [
              228,
              'a - diaeresis'
            ],
            [
              229,
              'a - ring above'
            ],
            [
              257,
              'a - macron'
            ],
            [
              230,
              'ligature ae'
            ],
            [
              231,
              'c - cedilla'
            ],
            [
              232,
              'e - grave'
            ],
            [
              233,
              'e - acute'
            ],
            [
              234,
              'e - circumflex'
            ],
            [
              235,
              'e - diaeresis'
            ],
            [
              275,
              'e - macron'
            ],
            [
              236,
              'i - grave'
            ],
            [
              237,
              'i - acute'
            ],
            [
              238,
              'i - circumflex'
            ],
            [
              239,
              'i - diaeresis'
            ],
            [
              299,
              'i - macron'
            ],
            [
              240,
              'eth'
            ],
            [
              241,
              'n - tilde'
            ],
            [
              242,
              'o - grave'
            ],
            [
              243,
              'o - acute'
            ],
            [
              244,
              'o - circumflex'
            ],
            [
              245,
              'o - tilde'
            ],
            [
              246,
              'o - diaeresis'
            ],
            [
              248,
              'o slash'
            ],
            [
              333,
              'o macron'
            ],
            [
              339,
              'ligature oe'
            ],
            [
              353,
              's - caron'
            ],
            [
              249,
              'u - grave'
            ],
            [
              250,
              'u - acute'
            ],
            [
              251,
              'u - circumflex'
            ],
            [
              252,
              'u - diaeresis'
            ],
            [
              363,
              'u - macron'
            ],
            [
              253,
              'y - acute'
            ],
            [
              254,
              'thorn'
            ],
            [
              255,
              'y - diaeresis'
            ],
            [
              563,
              'y - macron'
            ],
            [
              913,
              'Alpha'
            ],
            [
              914,
              'Beta'
            ],
            [
              915,
              'Gamma'
            ],
            [
              916,
              'Delta'
            ],
            [
              917,
              'Epsilon'
            ],
            [
              918,
              'Zeta'
            ],
            [
              919,
              'Eta'
            ],
            [
              920,
              'Theta'
            ],
            [
              921,
              'Iota'
            ],
            [
              922,
              'Kappa'
            ],
            [
              923,
              'Lambda'
            ],
            [
              924,
              'Mu'
            ],
            [
              925,
              'Nu'
            ],
            [
              926,
              'Xi'
            ],
            [
              927,
              'Omicron'
            ],
            [
              928,
              'Pi'
            ],
            [
              929,
              'Rho'
            ],
            [
              931,
              'Sigma'
            ],
            [
              932,
              'Tau'
            ],
            [
              933,
              'Upsilon'
            ],
            [
              934,
              'Phi'
            ],
            [
              935,
              'Chi'
            ],
            [
              936,
              'Psi'
            ],
            [
              937,
              'Omega'
            ],
            [
              945,
              'alpha'
            ],
            [
              946,
              'beta'
            ],
            [
              947,
              'gamma'
            ],
            [
              948,
              'delta'
            ],
            [
              949,
              'epsilon'
            ],
            [
              950,
              'zeta'
            ],
            [
              951,
              'eta'
            ],
            [
              952,
              'theta'
            ],
            [
              953,
              'iota'
            ],
            [
              954,
              'kappa'
            ],
            [
              955,
              'lambda'
            ],
            [
              956,
              'mu'
            ],
            [
              957,
              'nu'
            ],
            [
              958,
              'xi'
            ],
            [
              959,
              'omicron'
            ],
            [
              960,
              'pi'
            ],
            [
              961,
              'rho'
            ],
            [
              962,
              'final sigma'
            ],
            [
              963,
              'sigma'
            ],
            [
              964,
              'tau'
            ],
            [
              965,
              'upsilon'
            ],
            [
              966,
              'phi'
            ],
            [
              967,
              'chi'
            ],
            [
              968,
              'psi'
            ],
            [
              969,
              'omega'
            ]
          ]
        },
        {
          name: 'Symbols',
          characters: [
            [
              8501,
              'alef symbol'
            ],
            [
              982,
              'pi symbol'
            ],
            [
              8476,
              'real part symbol'
            ],
            [
              978,
              'upsilon - hook symbol'
            ],
            [
              8472,
              'Weierstrass p'
            ],
            [
              8465,
              'imaginary part'
            ]
          ]
        },
        {
          name: 'Arrows',
          characters: [
            [
              8592,
              'leftwards arrow'
            ],
            [
              8593,
              'upwards arrow'
            ],
            [
              8594,
              'rightwards arrow'
            ],
            [
              8595,
              'downwards arrow'
            ],
            [
              8596,
              'left right arrow'
            ],
            [
              8629,
              'carriage return'
            ],
            [
              8656,
              'leftwards double arrow'
            ],
            [
              8657,
              'upwards double arrow'
            ],
            [
              8658,
              'rightwards double arrow'
            ],
            [
              8659,
              'downwards double arrow'
            ],
            [
              8660,
              'left right double arrow'
            ],
            [
              8756,
              'therefore'
            ],
            [
              8834,
              'subset of'
            ],
            [
              8835,
              'superset of'
            ],
            [
              8836,
              'not a subset of'
            ],
            [
              8838,
              'subset of or equal to'
            ],
            [
              8839,
              'superset of or equal to'
            ],
            [
              8853,
              'circled plus'
            ],
            [
              8855,
              'circled times'
            ],
            [
              8869,
              'perpendicular'
            ],
            [
              8901,
              'dot operator'
            ],
            [
              8968,
              'left ceiling'
            ],
            [
              8969,
              'right ceiling'
            ],
            [
              8970,
              'left floor'
            ],
            [
              8971,
              'right floor'
            ],
            [
              9001,
              'left-pointing angle bracket'
            ],
            [
              9002,
              'right-pointing angle bracket'
            ],
            [
              9674,
              'lozenge'
            ],
            [
              9824,
              'black spade suit'
            ],
            [
              9827,
              'black club suit'
            ],
            [
              9829,
              'black heart suit'
            ],
            [
              9830,
              'black diamond suit'
            ],
            [
              8194,
              'en space'
            ],
            [
              8195,
              'em space'
            ],
            [
              8201,
              'thin space'
            ],
            [
              8204,
              'zero width non-joiner'
            ],
            [
              8205,
              'zero width joiner'
            ],
            [
              8206,
              'left-to-right mark'
            ],
            [
              8207,
              'right-to-left mark'
            ]
          ]
        }
      ];
    };
    var charmapFilter = function (charmap) {
      return global$1.grep(charmap, function (item) {
        return isArray$1(item) && item.length === 2;
      });
    };
    var getCharsFromSetting = function (settingValue) {
      if (isArray$1(settingValue)) {
        return [].concat(charmapFilter(settingValue));
      }
      if (typeof settingValue === 'function') {
        return settingValue();
      }
      return [];
    };
    var extendCharMap = function (editor, charmap) {
      var userCharMap = getCharMap(editor);
      if (userCharMap) {
        charmap = [{
            name: UserDefined,
            characters: getCharsFromSetting(userCharMap)
          }];
      }
      var userCharMapAppend = getCharMapAppend(editor);
      if (userCharMapAppend) {
        var userDefinedGroup = global$1.grep(charmap, function (cg) {
          return cg.name === UserDefined;
        });
        if (userDefinedGroup.length) {
          userDefinedGroup[0].characters = [].concat(userDefinedGroup[0].characters).concat(getCharsFromSetting(userCharMapAppend));
          return charmap;
        }
        return [].concat(charmap).concat({
          name: UserDefined,
          characters: getCharsFromSetting(userCharMapAppend)
        });
      }
      return charmap;
    };
    var getCharMap$1 = function (editor) {
      var groups = extendCharMap(editor, getDefaultCharMap());
      return groups.length > 1 ? [{
          name: 'All',
          characters: bind(groups, function (g) {
            return g.characters;
          })
        }].concat(groups) : groups;
    };

    var get = function (editor) {
      var getCharMap = function () {
        return getCharMap$1(editor);
      };
      var insertChar$1 = function (chr) {
        insertChar(editor, chr);
      };
      return {
        getCharMap: getCharMap,
        insertChar: insertChar$1
      };
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

    var last = function (fn, rate) {
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

    var nativeFromCodePoint = String.fromCodePoint;
    var contains = function (str, substr) {
      return str.indexOf(substr) !== -1;
    };
    var fromCodePoint = function () {
      var codePoints = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        codePoints[_i] = arguments[_i];
      }
      if (nativeFromCodePoint) {
        return nativeFromCodePoint.apply(void 0, codePoints);
      } else {
        var codeUnits = [];
        var codeLen = 0;
        var result = '';
        for (var index = 0, len = codePoints.length; index !== len; ++index) {
          var codePoint = +codePoints[index];
          if (!(codePoint < 1114111 && codePoint >>> 0 === codePoint)) {
            throw RangeError('Invalid code point: ' + codePoint);
          }
          if (codePoint <= 65535) {
            codeLen = codeUnits.push(codePoint);
          } else {
            codePoint -= 65536;
            codeLen = codeUnits.push((codePoint >> 10) + 55296, codePoint % 1024 + 56320);
          }
          if (codeLen >= 16383) {
            result += String.fromCharCode.apply(null, codeUnits);
            codeUnits.length = 0;
          }
        }
        return result + String.fromCharCode.apply(null, codeUnits);
      }
    };

    var charMatches = function (charCode, name, lowerCasePattern) {
      if (contains(fromCodePoint(charCode).toLowerCase(), lowerCasePattern)) {
        return true;
      } else {
        return contains(name.toLowerCase(), lowerCasePattern) || contains(name.toLowerCase().replace(/\s+/g, ''), lowerCasePattern);
      }
    };
    var scan = function (group, pattern) {
      var matches = [];
      var lowerCasePattern = pattern.toLowerCase();
      each(group.characters, function (g) {
        if (charMatches(g[0], g[1], lowerCasePattern)) {
          matches.push(g);
        }
      });
      return map(matches, function (m) {
        return {
          text: m[1],
          value: fromCodePoint(m[0]),
          icon: fromCodePoint(m[0])
        };
      });
    };

    var patternName = 'pattern';
    var open = function (editor, charMap) {
      var makeGroupItems = function () {
        return [
          {
            label: 'Search',
            type: 'input',
            name: patternName
          },
          {
            type: 'collection',
            name: 'results'
          }
        ];
      };
      var makeTabs = function () {
        return map(charMap, function (charGroup) {
          return {
            title: charGroup.name,
            name: charGroup.name,
            items: makeGroupItems()
          };
        });
      };
      var makePanel = function () {
        return {
          type: 'panel',
          items: makeGroupItems()
        };
      };
      var makeTabPanel = function () {
        return {
          type: 'tabpanel',
          tabs: makeTabs()
        };
      };
      var currentTab = charMap.length === 1 ? Cell(UserDefined) : Cell('All');
      var scanAndSet = function (dialogApi, pattern) {
        find(charMap, function (group) {
          return group.name === currentTab.get();
        }).each(function (f) {
          var items = scan(f, pattern);
          dialogApi.setData({ results: items });
        });
      };
      var SEARCH_DELAY = 40;
      var updateFilter = last(function (dialogApi) {
        var pattern = dialogApi.getData().pattern;
        scanAndSet(dialogApi, pattern);
      }, SEARCH_DELAY);
      var body = charMap.length === 1 ? makePanel() : makeTabPanel();
      var initialData = {
        pattern: '',
        results: scan(charMap[0], '')
      };
      var bridgeSpec = {
        title: 'Special Character',
        size: 'normal',
        body: body,
        buttons: [{
            type: 'cancel',
            name: 'close',
            text: 'Close',
            primary: true
          }],
        initialData: initialData,
        onAction: function (api, details) {
          if (details.name === 'results') {
            insertChar(editor, details.value);
            api.close();
          }
        },
        onTabChange: function (dialogApi, details) {
          currentTab.set(details.newTabName);
          updateFilter.throttle(dialogApi);
        },
        onChange: function (dialogApi, changeData) {
          if (changeData.name === patternName) {
            updateFilter.throttle(dialogApi);
          }
        }
      };
      var dialogApi = editor.windowManager.open(bridgeSpec);
      dialogApi.focus(patternName);
    };

    var register = function (editor, charMap) {
      editor.addCommand('mceShowCharmap', function () {
        open(editor, charMap);
      });
    };

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.Promise');

    var init = function (editor, all) {
      editor.ui.registry.addAutocompleter('charmap', {
        ch: ':',
        columns: 'auto',
        minChars: 2,
        fetch: function (pattern, _maxResults) {
          return new global$2(function (resolve, _reject) {
            resolve(scan(all, pattern));
          });
        },
        onAction: function (autocompleteApi, rng, value) {
          editor.selection.setRng(rng);
          editor.insertContent(value);
          autocompleteApi.hide();
        }
      });
    };

    var register$1 = function (editor) {
      editor.ui.registry.addButton('charmap', {
        icon: 'insert-character',
        tooltip: 'Special character',
        onAction: function () {
          return editor.execCommand('mceShowCharmap');
        }
      });
      editor.ui.registry.addMenuItem('charmap', {
        icon: 'insert-character',
        text: 'Special character...',
        onAction: function () {
          return editor.execCommand('mceShowCharmap');
        }
      });
    };

    function Plugin () {
      global.add('charmap', function (editor) {
        var charMap = getCharMap$1(editor);
        register(editor, charMap);
        register$1(editor);
        init(editor, charMap[0]);
        return get(editor);
      });
    }

    Plugin();

}(window));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2NoYXJtYXAvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsOENBQThDLFdBQVc7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsU0FBUztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFNBQVM7QUFDL0M7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFNBQVM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsdUJBQXVCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxlQUFlO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsNkJBQTZCLGlCQUFpQjtBQUM5QyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTs7QUFFQSxDQUFDIiwiZmlsZSI6InZlbmRvcnN+dGlueW1jZS1wbHVnaW4tY2hhcm1hcH50aW55bWNlLXBsdWdpbi1jaGFybWFwLXBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICpcbiAqIFZlcnNpb246IDUuNC4yICgyMDIwLTA4LTE3KVxuICovXG4oZnVuY3Rpb24gKGRvbUdsb2JhbHMpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgZ2xvYmFsID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuUGx1Z2luTWFuYWdlcicpO1xuXG4gICAgdmFyIGZpcmVJbnNlcnRDdXN0b21DaGFyID0gZnVuY3Rpb24gKGVkaXRvciwgY2hyKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmZpcmUoJ2luc2VydEN1c3RvbUNoYXInLCB7IGNocjogY2hyIH0pO1xuICAgIH07XG5cbiAgICB2YXIgaW5zZXJ0Q2hhciA9IGZ1bmN0aW9uIChlZGl0b3IsIGNocikge1xuICAgICAgdmFyIGV2dENociA9IGZpcmVJbnNlcnRDdXN0b21DaGFyKGVkaXRvciwgY2hyKS5jaHI7XG4gICAgICBlZGl0b3IuZXhlY0NvbW1hbmQoJ21jZUluc2VydENvbnRlbnQnLCBmYWxzZSwgZXZ0Q2hyKTtcbiAgICB9O1xuXG4gICAgdmFyIGdsb2JhbCQxID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UudXRpbC5Ub29scycpO1xuXG4gICAgdmFyIGdldENoYXJNYXAgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdjaGFybWFwJyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0Q2hhck1hcEFwcGVuZCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2NoYXJtYXBfYXBwZW5kJyk7XG4gICAgfTtcblxuICAgIHZhciBub29wID0gZnVuY3Rpb24gKCkge1xuICAgIH07XG4gICAgdmFyIGNvbnN0YW50ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIG5ldmVyID0gY29uc3RhbnQoZmFsc2UpO1xuICAgIHZhciBhbHdheXMgPSBjb25zdGFudCh0cnVlKTtcblxuICAgIHZhciBub25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIE5PTkU7XG4gICAgfTtcbiAgICB2YXIgTk9ORSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBlcSA9IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgIHJldHVybiBvLmlzTm9uZSgpO1xuICAgICAgfTtcbiAgICAgIHZhciBjYWxsID0gZnVuY3Rpb24gKHRodW5rKSB7XG4gICAgICAgIHJldHVybiB0aHVuaygpO1xuICAgICAgfTtcbiAgICAgIHZhciBpZCA9IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgIHJldHVybiBuO1xuICAgICAgfTtcbiAgICAgIHZhciBtZSA9IHtcbiAgICAgICAgZm9sZDogZnVuY3Rpb24gKG4sIF9zKSB7XG4gICAgICAgICAgcmV0dXJuIG4oKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXM6IG5ldmVyLFxuICAgICAgICBpc1NvbWU6IG5ldmVyLFxuICAgICAgICBpc05vbmU6IGFsd2F5cyxcbiAgICAgICAgZ2V0T3I6IGlkLFxuICAgICAgICBnZXRPclRodW5rOiBjYWxsLFxuICAgICAgICBnZXRPckRpZTogZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cgfHwgJ2Vycm9yOiBnZXRPckRpZSBjYWxsZWQgb24gbm9uZS4nKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0T3JOdWxsOiBjb25zdGFudChudWxsKSxcbiAgICAgICAgZ2V0T3JVbmRlZmluZWQ6IGNvbnN0YW50KHVuZGVmaW5lZCksXG4gICAgICAgIG9yOiBpZCxcbiAgICAgICAgb3JUaHVuazogY2FsbCxcbiAgICAgICAgbWFwOiBub25lLFxuICAgICAgICBlYWNoOiBub29wLFxuICAgICAgICBiaW5kOiBub25lLFxuICAgICAgICBleGlzdHM6IG5ldmVyLFxuICAgICAgICBmb3JhbGw6IGFsd2F5cyxcbiAgICAgICAgZmlsdGVyOiBub25lLFxuICAgICAgICBlcXVhbHM6IGVxLFxuICAgICAgICBlcXVhbHNfOiBlcSxcbiAgICAgICAgdG9BcnJheTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9TdHJpbmc6IGNvbnN0YW50KCdub25lKCknKVxuICAgICAgfTtcbiAgICAgIHJldHVybiBtZTtcbiAgICB9KCk7XG4gICAgdmFyIHNvbWUgPSBmdW5jdGlvbiAoYSkge1xuICAgICAgdmFyIGNvbnN0YW50X2EgPSBjb25zdGFudChhKTtcbiAgICAgIHZhciBzZWxmID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbWU7XG4gICAgICB9O1xuICAgICAgdmFyIGJpbmQgPSBmdW5jdGlvbiAoZikge1xuICAgICAgICByZXR1cm4gZihhKTtcbiAgICAgIH07XG4gICAgICB2YXIgbWUgPSB7XG4gICAgICAgIGZvbGQ6IGZ1bmN0aW9uIChuLCBzKSB7XG4gICAgICAgICAgcmV0dXJuIHMoYSk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgIHJldHVybiBhID09PSB2O1xuICAgICAgICB9LFxuICAgICAgICBpc1NvbWU6IGFsd2F5cyxcbiAgICAgICAgaXNOb25lOiBuZXZlcixcbiAgICAgICAgZ2V0T3I6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yVGh1bms6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yRGllOiBjb25zdGFudF9hLFxuICAgICAgICBnZXRPck51bGw6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yVW5kZWZpbmVkOiBjb25zdGFudF9hLFxuICAgICAgICBvcjogc2VsZixcbiAgICAgICAgb3JUaHVuazogc2VsZixcbiAgICAgICAgbWFwOiBmdW5jdGlvbiAoZikge1xuICAgICAgICAgIHJldHVybiBzb21lKGYoYSkpO1xuICAgICAgICB9LFxuICAgICAgICBlYWNoOiBmdW5jdGlvbiAoZikge1xuICAgICAgICAgIGYoYSk7XG4gICAgICAgIH0sXG4gICAgICAgIGJpbmQ6IGJpbmQsXG4gICAgICAgIGV4aXN0czogYmluZCxcbiAgICAgICAgZm9yYWxsOiBiaW5kLFxuICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgcmV0dXJuIGYoYSkgPyBtZSA6IE5PTkU7XG4gICAgICAgIH0sXG4gICAgICAgIHRvQXJyYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gW2FdO1xuICAgICAgICB9LFxuICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiAnc29tZSgnICsgYSArICcpJztcbiAgICAgICAgfSxcbiAgICAgICAgZXF1YWxzOiBmdW5jdGlvbiAobykge1xuICAgICAgICAgIHJldHVybiBvLmlzKGEpO1xuICAgICAgICB9LFxuICAgICAgICBlcXVhbHNfOiBmdW5jdGlvbiAobywgZWxlbWVudEVxKSB7XG4gICAgICAgICAgcmV0dXJuIG8uZm9sZChuZXZlciwgZnVuY3Rpb24gKGIpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50RXEoYSwgYik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXR1cm4gbWU7XG4gICAgfTtcbiAgICB2YXIgZnJvbSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgPyBOT05FIDogc29tZSh2YWx1ZSk7XG4gICAgfTtcbiAgICB2YXIgT3B0aW9uID0ge1xuICAgICAgc29tZTogc29tZSxcbiAgICAgIG5vbmU6IG5vbmUsXG4gICAgICBmcm9tOiBmcm9tXG4gICAgfTtcblxuICAgIHZhciB0eXBlT2YgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgdmFyIHQgPSB0eXBlb2YgeDtcbiAgICAgIGlmICh4ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnbnVsbCc7XG4gICAgICB9IGVsc2UgaWYgKHQgPT09ICdvYmplY3QnICYmIChBcnJheS5wcm90b3R5cGUuaXNQcm90b3R5cGVPZih4KSB8fCB4LmNvbnN0cnVjdG9yICYmIHguY29uc3RydWN0b3IubmFtZSA9PT0gJ0FycmF5JykpIHtcbiAgICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgICB9IGVsc2UgaWYgKHQgPT09ICdvYmplY3QnICYmIChTdHJpbmcucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoeCkgfHwgeC5jb25zdHJ1Y3RvciAmJiB4LmNvbnN0cnVjdG9yLm5hbWUgPT09ICdTdHJpbmcnKSkge1xuICAgICAgICByZXR1cm4gJ3N0cmluZyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdDtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBpc1R5cGUgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZU9mKHZhbHVlKSA9PT0gdHlwZTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgaXNBcnJheSA9IGlzVHlwZSgnYXJyYXknKTtcblxuICAgIHZhciBuYXRpdmVQdXNoID0gQXJyYXkucHJvdG90eXBlLnB1c2g7XG4gICAgdmFyIG1hcCA9IGZ1bmN0aW9uICh4cywgZikge1xuICAgICAgdmFyIGxlbiA9IHhzLmxlbmd0aDtcbiAgICAgIHZhciByID0gbmV3IEFycmF5KGxlbik7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciB4ID0geHNbaV07XG4gICAgICAgIHJbaV0gPSBmKHgsIGkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcbiAgICB2YXIgZWFjaCA9IGZ1bmN0aW9uICh4cywgZikge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHhzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciB4ID0geHNbaV07XG4gICAgICAgIGYoeCwgaSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgZmluZFVudGlsID0gZnVuY3Rpb24gKHhzLCBwcmVkLCB1bnRpbCkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHhzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciB4ID0geHNbaV07XG4gICAgICAgIGlmIChwcmVkKHgsIGkpKSB7XG4gICAgICAgICAgcmV0dXJuIE9wdGlvbi5zb21lKHgpO1xuICAgICAgICB9IGVsc2UgaWYgKHVudGlsKHgsIGkpKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgIH07XG4gICAgdmFyIGZpbmQgPSBmdW5jdGlvbiAoeHMsIHByZWQpIHtcbiAgICAgIHJldHVybiBmaW5kVW50aWwoeHMsIHByZWQsIG5ldmVyKTtcbiAgICB9O1xuICAgIHZhciBmbGF0dGVuID0gZnVuY3Rpb24gKHhzKSB7XG4gICAgICB2YXIgciA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHhzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgIGlmICghaXNBcnJheSh4c1tpXSkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fyci5mbGF0dGVuIGl0ZW0gJyArIGkgKyAnIHdhcyBub3QgYW4gYXJyYXksIGlucHV0OiAnICsgeHMpO1xuICAgICAgICB9XG4gICAgICAgIG5hdGl2ZVB1c2guYXBwbHkociwgeHNbaV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcbiAgICB2YXIgYmluZCA9IGZ1bmN0aW9uICh4cywgZikge1xuICAgICAgcmV0dXJuIGZsYXR0ZW4obWFwKHhzLCBmKSk7XG4gICAgfTtcblxuICAgIHZhciBpc0FycmF5JDEgPSBnbG9iYWwkMS5pc0FycmF5O1xuICAgIHZhciBVc2VyRGVmaW5lZCA9ICdVc2VyIERlZmluZWQnO1xuICAgIHZhciBnZXREZWZhdWx0Q2hhck1hcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnQ3VycmVuY3knLFxuICAgICAgICAgIGNoYXJhY3RlcnM6IFtcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMzYsXG4gICAgICAgICAgICAgICdkb2xsYXIgc2lnbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDE2MixcbiAgICAgICAgICAgICAgJ2NlbnQgc2lnbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDgzNjQsXG4gICAgICAgICAgICAgICdldXJvIHNpZ24nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAxNjMsXG4gICAgICAgICAgICAgICdwb3VuZCBzaWduJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMTY1LFxuICAgICAgICAgICAgICAneWVuIHNpZ24nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAxNjQsXG4gICAgICAgICAgICAgICdjdXJyZW5jeSBzaWduJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODM1MixcbiAgICAgICAgICAgICAgJ2V1cm8tY3VycmVuY3kgc2lnbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDgzNTMsXG4gICAgICAgICAgICAgICdjb2xvbiBzaWduJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODM1NCxcbiAgICAgICAgICAgICAgJ2NydXplaXJvIHNpZ24nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4MzU1LFxuICAgICAgICAgICAgICAnZnJlbmNoIGZyYW5jIHNpZ24nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4MzU2LFxuICAgICAgICAgICAgICAnbGlyYSBzaWduJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODM1NyxcbiAgICAgICAgICAgICAgJ21pbGwgc2lnbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDgzNTgsXG4gICAgICAgICAgICAgICduYWlyYSBzaWduJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODM1OSxcbiAgICAgICAgICAgICAgJ3Blc2V0YSBzaWduJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODM2MCxcbiAgICAgICAgICAgICAgJ3J1cGVlIHNpZ24nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4MzYxLFxuICAgICAgICAgICAgICAnd29uIHNpZ24nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4MzYyLFxuICAgICAgICAgICAgICAnbmV3IHNoZXFlbCBzaWduJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODM2MyxcbiAgICAgICAgICAgICAgJ2Rvbmcgc2lnbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDgzNjUsXG4gICAgICAgICAgICAgICdraXAgc2lnbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDgzNjYsXG4gICAgICAgICAgICAgICd0dWdyaWsgc2lnbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDgzNjcsXG4gICAgICAgICAgICAgICdkcmFjaG1hIHNpZ24nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4MzY4LFxuICAgICAgICAgICAgICAnZ2VybWFuIHBlbm55IHN5bWJvbCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDgzNjksXG4gICAgICAgICAgICAgICdwZXNvIHNpZ24nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4MzcwLFxuICAgICAgICAgICAgICAnZ3VhcmFuaSBzaWduJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODM3MSxcbiAgICAgICAgICAgICAgJ2F1c3RyYWwgc2lnbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDgzNzIsXG4gICAgICAgICAgICAgICdocnl2bmlhIHNpZ24nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4MzczLFxuICAgICAgICAgICAgICAnY2VkaSBzaWduJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODM3NCxcbiAgICAgICAgICAgICAgJ2xpdnJlIHRvdXJub2lzIHNpZ24nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4Mzc1LFxuICAgICAgICAgICAgICAnc3Blc21pbG8gc2lnbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDgzNzYsXG4gICAgICAgICAgICAgICd0ZW5nZSBzaWduJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODM3NyxcbiAgICAgICAgICAgICAgJ2luZGlhbiBydXBlZSBzaWduJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODM3OCxcbiAgICAgICAgICAgICAgJ3R1cmtpc2ggbGlyYSBzaWduJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODM3OSxcbiAgICAgICAgICAgICAgJ25vcmRpYyBtYXJrIHNpZ24nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4MzgwLFxuICAgICAgICAgICAgICAnbWFuYXQgc2lnbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDgzODEsXG4gICAgICAgICAgICAgICdydWJsZSBzaWduJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMjA4NzAsXG4gICAgICAgICAgICAgICd5ZW4gY2hhcmFjdGVyJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMjA4MDMsXG4gICAgICAgICAgICAgICd5dWFuIGNoYXJhY3RlcidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDIyMjkxLFxuICAgICAgICAgICAgICAneXVhbiBjaGFyYWN0ZXIsIGluIGhvbmcga29uZyBhbmQgdGFpd2FuJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMjIyNzgsXG4gICAgICAgICAgICAgICd5ZW4veXVhbiBjaGFyYWN0ZXIgdmFyaWFudCBvbmUnXG4gICAgICAgICAgICBdXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ1RleHQnLFxuICAgICAgICAgIGNoYXJhY3RlcnM6IFtcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMTY5LFxuICAgICAgICAgICAgICAnY29weXJpZ2h0IHNpZ24nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAxNzQsXG4gICAgICAgICAgICAgICdyZWdpc3RlcmVkIHNpZ24nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4NDgyLFxuICAgICAgICAgICAgICAndHJhZGUgbWFyayBzaWduJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODI0MCxcbiAgICAgICAgICAgICAgJ3BlciBtaWxsZSBzaWduJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMTgxLFxuICAgICAgICAgICAgICAnbWljcm8gc2lnbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDE4MyxcbiAgICAgICAgICAgICAgJ21pZGRsZSBkb3QnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4MjI2LFxuICAgICAgICAgICAgICAnYnVsbGV0J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODIzMCxcbiAgICAgICAgICAgICAgJ3RocmVlIGRvdCBsZWFkZXInXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4MjQyLFxuICAgICAgICAgICAgICAnbWludXRlcyAvIGZlZXQnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4MjQzLFxuICAgICAgICAgICAgICAnc2Vjb25kcyAvIGluY2hlcydcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDE2NyxcbiAgICAgICAgICAgICAgJ3NlY3Rpb24gc2lnbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDE4MixcbiAgICAgICAgICAgICAgJ3BhcmFncmFwaCBzaWduJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMjIzLFxuICAgICAgICAgICAgICAnc2hhcnAgcyAvIGVzcy16ZWQnXG4gICAgICAgICAgICBdXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ1F1b3RhdGlvbnMnLFxuICAgICAgICAgIGNoYXJhY3RlcnM6IFtcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODI0OSxcbiAgICAgICAgICAgICAgJ3NpbmdsZSBsZWZ0LXBvaW50aW5nIGFuZ2xlIHF1b3RhdGlvbiBtYXJrJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODI1MCxcbiAgICAgICAgICAgICAgJ3NpbmdsZSByaWdodC1wb2ludGluZyBhbmdsZSBxdW90YXRpb24gbWFyaydcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDE3MSxcbiAgICAgICAgICAgICAgJ2xlZnQgcG9pbnRpbmcgZ3VpbGxlbWV0J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMTg3LFxuICAgICAgICAgICAgICAncmlnaHQgcG9pbnRpbmcgZ3VpbGxlbWV0J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODIxNixcbiAgICAgICAgICAgICAgJ2xlZnQgc2luZ2xlIHF1b3RhdGlvbiBtYXJrJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODIxNyxcbiAgICAgICAgICAgICAgJ3JpZ2h0IHNpbmdsZSBxdW90YXRpb24gbWFyaydcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDgyMjAsXG4gICAgICAgICAgICAgICdsZWZ0IGRvdWJsZSBxdW90YXRpb24gbWFyaydcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDgyMjEsXG4gICAgICAgICAgICAgICdyaWdodCBkb3VibGUgcXVvdGF0aW9uIG1hcmsnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4MjE4LFxuICAgICAgICAgICAgICAnc2luZ2xlIGxvdy05IHF1b3RhdGlvbiBtYXJrJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODIyMixcbiAgICAgICAgICAgICAgJ2RvdWJsZSBsb3ctOSBxdW90YXRpb24gbWFyaydcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDYwLFxuICAgICAgICAgICAgICAnbGVzcy10aGFuIHNpZ24nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA2MixcbiAgICAgICAgICAgICAgJ2dyZWF0ZXItdGhhbiBzaWduJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODgwNCxcbiAgICAgICAgICAgICAgJ2xlc3MtdGhhbiBvciBlcXVhbCB0bydcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDg4MDUsXG4gICAgICAgICAgICAgICdncmVhdGVyLXRoYW4gb3IgZXF1YWwgdG8nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4MjExLFxuICAgICAgICAgICAgICAnZW4gZGFzaCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDgyMTIsXG4gICAgICAgICAgICAgICdlbSBkYXNoJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMTc1LFxuICAgICAgICAgICAgICAnbWFjcm9uJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODI1NCxcbiAgICAgICAgICAgICAgJ292ZXJsaW5lJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMTY0LFxuICAgICAgICAgICAgICAnY3VycmVuY3kgc2lnbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDE2NixcbiAgICAgICAgICAgICAgJ2Jyb2tlbiBiYXInXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAxNjgsXG4gICAgICAgICAgICAgICdkaWFlcmVzaXMnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAxNjEsXG4gICAgICAgICAgICAgICdpbnZlcnRlZCBleGNsYW1hdGlvbiBtYXJrJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMTkxLFxuICAgICAgICAgICAgICAndHVybmVkIHF1ZXN0aW9uIG1hcmsnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA3MTAsXG4gICAgICAgICAgICAgICdjaXJjdW1mbGV4IGFjY2VudCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDczMixcbiAgICAgICAgICAgICAgJ3NtYWxsIHRpbGRlJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMTc2LFxuICAgICAgICAgICAgICAnZGVncmVlIHNpZ24nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4NzIyLFxuICAgICAgICAgICAgICAnbWludXMgc2lnbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDE3NyxcbiAgICAgICAgICAgICAgJ3BsdXMtbWludXMgc2lnbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDI0NyxcbiAgICAgICAgICAgICAgJ2RpdmlzaW9uIHNpZ24nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4MjYwLFxuICAgICAgICAgICAgICAnZnJhY3Rpb24gc2xhc2gnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAyMTUsXG4gICAgICAgICAgICAgICdtdWx0aXBsaWNhdGlvbiBzaWduJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMTg1LFxuICAgICAgICAgICAgICAnc3VwZXJzY3JpcHQgb25lJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMTc4LFxuICAgICAgICAgICAgICAnc3VwZXJzY3JpcHQgdHdvJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMTc5LFxuICAgICAgICAgICAgICAnc3VwZXJzY3JpcHQgdGhyZWUnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAxODgsXG4gICAgICAgICAgICAgICdmcmFjdGlvbiBvbmUgcXVhcnRlcidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDE4OSxcbiAgICAgICAgICAgICAgJ2ZyYWN0aW9uIG9uZSBoYWxmJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMTkwLFxuICAgICAgICAgICAgICAnZnJhY3Rpb24gdGhyZWUgcXVhcnRlcnMnXG4gICAgICAgICAgICBdXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ01hdGhlbWF0aWNhbCcsXG4gICAgICAgICAgY2hhcmFjdGVyczogW1xuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA0MDIsXG4gICAgICAgICAgICAgICdmdW5jdGlvbiAvIGZsb3JpbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDg3NDcsXG4gICAgICAgICAgICAgICdpbnRlZ3JhbCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDg3MjEsXG4gICAgICAgICAgICAgICduLWFyeSBzdW1hdGlvbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDg3MzQsXG4gICAgICAgICAgICAgICdpbmZpbml0eSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDg3MzAsXG4gICAgICAgICAgICAgICdzcXVhcmUgcm9vdCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDg3NjQsXG4gICAgICAgICAgICAgICdzaW1pbGFyIHRvJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODc3MyxcbiAgICAgICAgICAgICAgJ2FwcHJveGltYXRlbHkgZXF1YWwgdG8nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4Nzc2LFxuICAgICAgICAgICAgICAnYWxtb3N0IGVxdWFsIHRvJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODgwMCxcbiAgICAgICAgICAgICAgJ25vdCBlcXVhbCB0bydcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDg4MDEsXG4gICAgICAgICAgICAgICdpZGVudGljYWwgdG8nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4NzEyLFxuICAgICAgICAgICAgICAnZWxlbWVudCBvZidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDg3MTMsXG4gICAgICAgICAgICAgICdub3QgYW4gZWxlbWVudCBvZidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDg3MTUsXG4gICAgICAgICAgICAgICdjb250YWlucyBhcyBtZW1iZXInXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4NzE5LFxuICAgICAgICAgICAgICAnbi1hcnkgcHJvZHVjdCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDg3NDMsXG4gICAgICAgICAgICAgICdsb2dpY2FsIGFuZCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDg3NDQsXG4gICAgICAgICAgICAgICdsb2dpY2FsIG9yJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMTcyLFxuICAgICAgICAgICAgICAnbm90IHNpZ24nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4NzQ1LFxuICAgICAgICAgICAgICAnaW50ZXJzZWN0aW9uJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODc0NixcbiAgICAgICAgICAgICAgJ3VuaW9uJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODcwNixcbiAgICAgICAgICAgICAgJ3BhcnRpYWwgZGlmZmVyZW50aWFsJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODcwNCxcbiAgICAgICAgICAgICAgJ2ZvciBhbGwnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4NzA3LFxuICAgICAgICAgICAgICAndGhlcmUgZXhpc3RzJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODcwOSxcbiAgICAgICAgICAgICAgJ2RpYW1ldGVyJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODcxMSxcbiAgICAgICAgICAgICAgJ2JhY2t3YXJkIGRpZmZlcmVuY2UnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4NzI3LFxuICAgICAgICAgICAgICAnYXN0ZXJpc2sgb3BlcmF0b3InXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4NzMzLFxuICAgICAgICAgICAgICAncHJvcG9ydGlvbmFsIHRvJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODczNixcbiAgICAgICAgICAgICAgJ2FuZ2xlJ1xuICAgICAgICAgICAgXVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdFeHRlbmRlZCBMYXRpbicsXG4gICAgICAgICAgY2hhcmFjdGVyczogW1xuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAxOTIsXG4gICAgICAgICAgICAgICdBIC0gZ3JhdmUnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAxOTMsXG4gICAgICAgICAgICAgICdBIC0gYWN1dGUnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAxOTQsXG4gICAgICAgICAgICAgICdBIC0gY2lyY3VtZmxleCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDE5NSxcbiAgICAgICAgICAgICAgJ0EgLSB0aWxkZSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDE5NixcbiAgICAgICAgICAgICAgJ0EgLSBkaWFlcmVzaXMnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAxOTcsXG4gICAgICAgICAgICAgICdBIC0gcmluZyBhYm92ZSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDI1NixcbiAgICAgICAgICAgICAgJ0EgLSBtYWNyb24nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAxOTgsXG4gICAgICAgICAgICAgICdsaWdhdHVyZSBBRSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDE5OSxcbiAgICAgICAgICAgICAgJ0MgLSBjZWRpbGxhJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMjAwLFxuICAgICAgICAgICAgICAnRSAtIGdyYXZlJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMjAxLFxuICAgICAgICAgICAgICAnRSAtIGFjdXRlJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMjAyLFxuICAgICAgICAgICAgICAnRSAtIGNpcmN1bWZsZXgnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAyMDMsXG4gICAgICAgICAgICAgICdFIC0gZGlhZXJlc2lzJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMjc0LFxuICAgICAgICAgICAgICAnRSAtIG1hY3JvbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDIwNCxcbiAgICAgICAgICAgICAgJ0kgLSBncmF2ZSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDIwNSxcbiAgICAgICAgICAgICAgJ0kgLSBhY3V0ZSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDIwNixcbiAgICAgICAgICAgICAgJ0kgLSBjaXJjdW1mbGV4J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMjA3LFxuICAgICAgICAgICAgICAnSSAtIGRpYWVyZXNpcydcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDI5OCxcbiAgICAgICAgICAgICAgJ0kgLSBtYWNyb24nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAyMDgsXG4gICAgICAgICAgICAgICdFVEgnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAyMDksXG4gICAgICAgICAgICAgICdOIC0gdGlsZGUnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAyMTAsXG4gICAgICAgICAgICAgICdPIC0gZ3JhdmUnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAyMTEsXG4gICAgICAgICAgICAgICdPIC0gYWN1dGUnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAyMTIsXG4gICAgICAgICAgICAgICdPIC0gY2lyY3VtZmxleCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDIxMyxcbiAgICAgICAgICAgICAgJ08gLSB0aWxkZSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDIxNCxcbiAgICAgICAgICAgICAgJ08gLSBkaWFlcmVzaXMnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAyMTYsXG4gICAgICAgICAgICAgICdPIC0gc2xhc2gnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAzMzIsXG4gICAgICAgICAgICAgICdPIC0gbWFjcm9uJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMzM4LFxuICAgICAgICAgICAgICAnbGlnYXR1cmUgT0UnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAzNTIsXG4gICAgICAgICAgICAgICdTIC0gY2Fyb24nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAyMTcsXG4gICAgICAgICAgICAgICdVIC0gZ3JhdmUnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAyMTgsXG4gICAgICAgICAgICAgICdVIC0gYWN1dGUnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAyMTksXG4gICAgICAgICAgICAgICdVIC0gY2lyY3VtZmxleCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDIyMCxcbiAgICAgICAgICAgICAgJ1UgLSBkaWFlcmVzaXMnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAzNjIsXG4gICAgICAgICAgICAgICdVIC0gbWFjcm9uJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMjIxLFxuICAgICAgICAgICAgICAnWSAtIGFjdXRlJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMzc2LFxuICAgICAgICAgICAgICAnWSAtIGRpYWVyZXNpcydcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDU2MixcbiAgICAgICAgICAgICAgJ1kgLSBtYWNyb24nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAyMjIsXG4gICAgICAgICAgICAgICdUSE9STidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDIyNCxcbiAgICAgICAgICAgICAgJ2EgLSBncmF2ZSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDIyNSxcbiAgICAgICAgICAgICAgJ2EgLSBhY3V0ZSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDIyNixcbiAgICAgICAgICAgICAgJ2EgLSBjaXJjdW1mbGV4J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMjI3LFxuICAgICAgICAgICAgICAnYSAtIHRpbGRlJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMjI4LFxuICAgICAgICAgICAgICAnYSAtIGRpYWVyZXNpcydcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDIyOSxcbiAgICAgICAgICAgICAgJ2EgLSByaW5nIGFib3ZlJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMjU3LFxuICAgICAgICAgICAgICAnYSAtIG1hY3JvbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDIzMCxcbiAgICAgICAgICAgICAgJ2xpZ2F0dXJlIGFlJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMjMxLFxuICAgICAgICAgICAgICAnYyAtIGNlZGlsbGEnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAyMzIsXG4gICAgICAgICAgICAgICdlIC0gZ3JhdmUnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAyMzMsXG4gICAgICAgICAgICAgICdlIC0gYWN1dGUnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAyMzQsXG4gICAgICAgICAgICAgICdlIC0gY2lyY3VtZmxleCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDIzNSxcbiAgICAgICAgICAgICAgJ2UgLSBkaWFlcmVzaXMnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAyNzUsXG4gICAgICAgICAgICAgICdlIC0gbWFjcm9uJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMjM2LFxuICAgICAgICAgICAgICAnaSAtIGdyYXZlJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMjM3LFxuICAgICAgICAgICAgICAnaSAtIGFjdXRlJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMjM4LFxuICAgICAgICAgICAgICAnaSAtIGNpcmN1bWZsZXgnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAyMzksXG4gICAgICAgICAgICAgICdpIC0gZGlhZXJlc2lzJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMjk5LFxuICAgICAgICAgICAgICAnaSAtIG1hY3JvbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDI0MCxcbiAgICAgICAgICAgICAgJ2V0aCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDI0MSxcbiAgICAgICAgICAgICAgJ24gLSB0aWxkZSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDI0MixcbiAgICAgICAgICAgICAgJ28gLSBncmF2ZSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDI0MyxcbiAgICAgICAgICAgICAgJ28gLSBhY3V0ZSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDI0NCxcbiAgICAgICAgICAgICAgJ28gLSBjaXJjdW1mbGV4J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMjQ1LFxuICAgICAgICAgICAgICAnbyAtIHRpbGRlJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMjQ2LFxuICAgICAgICAgICAgICAnbyAtIGRpYWVyZXNpcydcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDI0OCxcbiAgICAgICAgICAgICAgJ28gc2xhc2gnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAzMzMsXG4gICAgICAgICAgICAgICdvIG1hY3JvbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDMzOSxcbiAgICAgICAgICAgICAgJ2xpZ2F0dXJlIG9lJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMzUzLFxuICAgICAgICAgICAgICAncyAtIGNhcm9uJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMjQ5LFxuICAgICAgICAgICAgICAndSAtIGdyYXZlJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMjUwLFxuICAgICAgICAgICAgICAndSAtIGFjdXRlJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMjUxLFxuICAgICAgICAgICAgICAndSAtIGNpcmN1bWZsZXgnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAyNTIsXG4gICAgICAgICAgICAgICd1IC0gZGlhZXJlc2lzJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMzYzLFxuICAgICAgICAgICAgICAndSAtIG1hY3JvbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDI1MyxcbiAgICAgICAgICAgICAgJ3kgLSBhY3V0ZSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDI1NCxcbiAgICAgICAgICAgICAgJ3Rob3JuJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgMjU1LFxuICAgICAgICAgICAgICAneSAtIGRpYWVyZXNpcydcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDU2MyxcbiAgICAgICAgICAgICAgJ3kgLSBtYWNyb24nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA5MTMsXG4gICAgICAgICAgICAgICdBbHBoYSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDkxNCxcbiAgICAgICAgICAgICAgJ0JldGEnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA5MTUsXG4gICAgICAgICAgICAgICdHYW1tYSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDkxNixcbiAgICAgICAgICAgICAgJ0RlbHRhJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgOTE3LFxuICAgICAgICAgICAgICAnRXBzaWxvbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDkxOCxcbiAgICAgICAgICAgICAgJ1pldGEnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA5MTksXG4gICAgICAgICAgICAgICdFdGEnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA5MjAsXG4gICAgICAgICAgICAgICdUaGV0YSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDkyMSxcbiAgICAgICAgICAgICAgJ0lvdGEnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA5MjIsXG4gICAgICAgICAgICAgICdLYXBwYSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDkyMyxcbiAgICAgICAgICAgICAgJ0xhbWJkYSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDkyNCxcbiAgICAgICAgICAgICAgJ011J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgOTI1LFxuICAgICAgICAgICAgICAnTnUnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA5MjYsXG4gICAgICAgICAgICAgICdYaSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDkyNyxcbiAgICAgICAgICAgICAgJ09taWNyb24nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA5MjgsXG4gICAgICAgICAgICAgICdQaSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDkyOSxcbiAgICAgICAgICAgICAgJ1JobydcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDkzMSxcbiAgICAgICAgICAgICAgJ1NpZ21hJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgOTMyLFxuICAgICAgICAgICAgICAnVGF1J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgOTMzLFxuICAgICAgICAgICAgICAnVXBzaWxvbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDkzNCxcbiAgICAgICAgICAgICAgJ1BoaSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDkzNSxcbiAgICAgICAgICAgICAgJ0NoaSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDkzNixcbiAgICAgICAgICAgICAgJ1BzaSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDkzNyxcbiAgICAgICAgICAgICAgJ09tZWdhJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgOTQ1LFxuICAgICAgICAgICAgICAnYWxwaGEnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA5NDYsXG4gICAgICAgICAgICAgICdiZXRhJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgOTQ3LFxuICAgICAgICAgICAgICAnZ2FtbWEnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA5NDgsXG4gICAgICAgICAgICAgICdkZWx0YSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDk0OSxcbiAgICAgICAgICAgICAgJ2Vwc2lsb24nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA5NTAsXG4gICAgICAgICAgICAgICd6ZXRhJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgOTUxLFxuICAgICAgICAgICAgICAnZXRhJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgOTUyLFxuICAgICAgICAgICAgICAndGhldGEnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA5NTMsXG4gICAgICAgICAgICAgICdpb3RhJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgOTU0LFxuICAgICAgICAgICAgICAna2FwcGEnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA5NTUsXG4gICAgICAgICAgICAgICdsYW1iZGEnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA5NTYsXG4gICAgICAgICAgICAgICdtdSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDk1NyxcbiAgICAgICAgICAgICAgJ251J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgOTU4LFxuICAgICAgICAgICAgICAneGknXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA5NTksXG4gICAgICAgICAgICAgICdvbWljcm9uJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgOTYwLFxuICAgICAgICAgICAgICAncGknXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA5NjEsXG4gICAgICAgICAgICAgICdyaG8nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA5NjIsXG4gICAgICAgICAgICAgICdmaW5hbCBzaWdtYSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDk2MyxcbiAgICAgICAgICAgICAgJ3NpZ21hJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgOTY0LFxuICAgICAgICAgICAgICAndGF1J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgOTY1LFxuICAgICAgICAgICAgICAndXBzaWxvbidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDk2NixcbiAgICAgICAgICAgICAgJ3BoaSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDk2NyxcbiAgICAgICAgICAgICAgJ2NoaSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDk2OCxcbiAgICAgICAgICAgICAgJ3BzaSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDk2OSxcbiAgICAgICAgICAgICAgJ29tZWdhJ1xuICAgICAgICAgICAgXVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdTeW1ib2xzJyxcbiAgICAgICAgICBjaGFyYWN0ZXJzOiBbXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDg1MDEsXG4gICAgICAgICAgICAgICdhbGVmIHN5bWJvbCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDk4MixcbiAgICAgICAgICAgICAgJ3BpIHN5bWJvbCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDg0NzYsXG4gICAgICAgICAgICAgICdyZWFsIHBhcnQgc3ltYm9sJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgOTc4LFxuICAgICAgICAgICAgICAndXBzaWxvbiAtIGhvb2sgc3ltYm9sJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODQ3MixcbiAgICAgICAgICAgICAgJ1dlaWVyc3RyYXNzIHAnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4NDY1LFxuICAgICAgICAgICAgICAnaW1hZ2luYXJ5IHBhcnQnXG4gICAgICAgICAgICBdXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ0Fycm93cycsXG4gICAgICAgICAgY2hhcmFjdGVyczogW1xuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4NTkyLFxuICAgICAgICAgICAgICAnbGVmdHdhcmRzIGFycm93J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODU5MyxcbiAgICAgICAgICAgICAgJ3Vwd2FyZHMgYXJyb3cnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4NTk0LFxuICAgICAgICAgICAgICAncmlnaHR3YXJkcyBhcnJvdydcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDg1OTUsXG4gICAgICAgICAgICAgICdkb3dud2FyZHMgYXJyb3cnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4NTk2LFxuICAgICAgICAgICAgICAnbGVmdCByaWdodCBhcnJvdydcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDg2MjksXG4gICAgICAgICAgICAgICdjYXJyaWFnZSByZXR1cm4nXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4NjU2LFxuICAgICAgICAgICAgICAnbGVmdHdhcmRzIGRvdWJsZSBhcnJvdydcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDg2NTcsXG4gICAgICAgICAgICAgICd1cHdhcmRzIGRvdWJsZSBhcnJvdydcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDg2NTgsXG4gICAgICAgICAgICAgICdyaWdodHdhcmRzIGRvdWJsZSBhcnJvdydcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDg2NTksXG4gICAgICAgICAgICAgICdkb3dud2FyZHMgZG91YmxlIGFycm93J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODY2MCxcbiAgICAgICAgICAgICAgJ2xlZnQgcmlnaHQgZG91YmxlIGFycm93J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODc1NixcbiAgICAgICAgICAgICAgJ3RoZXJlZm9yZSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDg4MzQsXG4gICAgICAgICAgICAgICdzdWJzZXQgb2YnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4ODM1LFxuICAgICAgICAgICAgICAnc3VwZXJzZXQgb2YnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4ODM2LFxuICAgICAgICAgICAgICAnbm90IGEgc3Vic2V0IG9mJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODgzOCxcbiAgICAgICAgICAgICAgJ3N1YnNldCBvZiBvciBlcXVhbCB0bydcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDg4MzksXG4gICAgICAgICAgICAgICdzdXBlcnNldCBvZiBvciBlcXVhbCB0bydcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDg4NTMsXG4gICAgICAgICAgICAgICdjaXJjbGVkIHBsdXMnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4ODU1LFxuICAgICAgICAgICAgICAnY2lyY2xlZCB0aW1lcydcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDg4NjksXG4gICAgICAgICAgICAgICdwZXJwZW5kaWN1bGFyJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODkwMSxcbiAgICAgICAgICAgICAgJ2RvdCBvcGVyYXRvcidcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDg5NjgsXG4gICAgICAgICAgICAgICdsZWZ0IGNlaWxpbmcnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4OTY5LFxuICAgICAgICAgICAgICAncmlnaHQgY2VpbGluZydcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDg5NzAsXG4gICAgICAgICAgICAgICdsZWZ0IGZsb29yJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODk3MSxcbiAgICAgICAgICAgICAgJ3JpZ2h0IGZsb29yJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgOTAwMSxcbiAgICAgICAgICAgICAgJ2xlZnQtcG9pbnRpbmcgYW5nbGUgYnJhY2tldCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDkwMDIsXG4gICAgICAgICAgICAgICdyaWdodC1wb2ludGluZyBhbmdsZSBicmFja2V0J1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgOTY3NCxcbiAgICAgICAgICAgICAgJ2xvemVuZ2UnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA5ODI0LFxuICAgICAgICAgICAgICAnYmxhY2sgc3BhZGUgc3VpdCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDk4MjcsXG4gICAgICAgICAgICAgICdibGFjayBjbHViIHN1aXQnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA5ODI5LFxuICAgICAgICAgICAgICAnYmxhY2sgaGVhcnQgc3VpdCdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDk4MzAsXG4gICAgICAgICAgICAgICdibGFjayBkaWFtb25kIHN1aXQnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4MTk0LFxuICAgICAgICAgICAgICAnZW4gc3BhY2UnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4MTk1LFxuICAgICAgICAgICAgICAnZW0gc3BhY2UnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4MjAxLFxuICAgICAgICAgICAgICAndGhpbiBzcGFjZSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIDgyMDQsXG4gICAgICAgICAgICAgICd6ZXJvIHdpZHRoIG5vbi1qb2luZXInXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4MjA1LFxuICAgICAgICAgICAgICAnemVybyB3aWR0aCBqb2luZXInXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICA4MjA2LFxuICAgICAgICAgICAgICAnbGVmdC10by1yaWdodCBtYXJrJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgODIwNyxcbiAgICAgICAgICAgICAgJ3JpZ2h0LXRvLWxlZnQgbWFyaydcbiAgICAgICAgICAgIF1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF07XG4gICAgfTtcbiAgICB2YXIgY2hhcm1hcEZpbHRlciA9IGZ1bmN0aW9uIChjaGFybWFwKSB7XG4gICAgICByZXR1cm4gZ2xvYmFsJDEuZ3JlcChjaGFybWFwLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gaXNBcnJheSQxKGl0ZW0pICYmIGl0ZW0ubGVuZ3RoID09PSAyO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgZ2V0Q2hhcnNGcm9tU2V0dGluZyA9IGZ1bmN0aW9uIChzZXR0aW5nVmFsdWUpIHtcbiAgICAgIGlmIChpc0FycmF5JDEoc2V0dGluZ1ZhbHVlKSkge1xuICAgICAgICByZXR1cm4gW10uY29uY2F0KGNoYXJtYXBGaWx0ZXIoc2V0dGluZ1ZhbHVlKSk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHNldHRpbmdWYWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gc2V0dGluZ1ZhbHVlKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gW107XG4gICAgfTtcbiAgICB2YXIgZXh0ZW5kQ2hhck1hcCA9IGZ1bmN0aW9uIChlZGl0b3IsIGNoYXJtYXApIHtcbiAgICAgIHZhciB1c2VyQ2hhck1hcCA9IGdldENoYXJNYXAoZWRpdG9yKTtcbiAgICAgIGlmICh1c2VyQ2hhck1hcCkge1xuICAgICAgICBjaGFybWFwID0gW3tcbiAgICAgICAgICAgIG5hbWU6IFVzZXJEZWZpbmVkLFxuICAgICAgICAgICAgY2hhcmFjdGVyczogZ2V0Q2hhcnNGcm9tU2V0dGluZyh1c2VyQ2hhck1hcClcbiAgICAgICAgICB9XTtcbiAgICAgIH1cbiAgICAgIHZhciB1c2VyQ2hhck1hcEFwcGVuZCA9IGdldENoYXJNYXBBcHBlbmQoZWRpdG9yKTtcbiAgICAgIGlmICh1c2VyQ2hhck1hcEFwcGVuZCkge1xuICAgICAgICB2YXIgdXNlckRlZmluZWRHcm91cCA9IGdsb2JhbCQxLmdyZXAoY2hhcm1hcCwgZnVuY3Rpb24gKGNnKSB7XG4gICAgICAgICAgcmV0dXJuIGNnLm5hbWUgPT09IFVzZXJEZWZpbmVkO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHVzZXJEZWZpbmVkR3JvdXAubGVuZ3RoKSB7XG4gICAgICAgICAgdXNlckRlZmluZWRHcm91cFswXS5jaGFyYWN0ZXJzID0gW10uY29uY2F0KHVzZXJEZWZpbmVkR3JvdXBbMF0uY2hhcmFjdGVycykuY29uY2F0KGdldENoYXJzRnJvbVNldHRpbmcodXNlckNoYXJNYXBBcHBlbmQpKTtcbiAgICAgICAgICByZXR1cm4gY2hhcm1hcDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW10uY29uY2F0KGNoYXJtYXApLmNvbmNhdCh7XG4gICAgICAgICAgbmFtZTogVXNlckRlZmluZWQsXG4gICAgICAgICAgY2hhcmFjdGVyczogZ2V0Q2hhcnNGcm9tU2V0dGluZyh1c2VyQ2hhck1hcEFwcGVuZClcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY2hhcm1hcDtcbiAgICB9O1xuICAgIHZhciBnZXRDaGFyTWFwJDEgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgZ3JvdXBzID0gZXh0ZW5kQ2hhck1hcChlZGl0b3IsIGdldERlZmF1bHRDaGFyTWFwKCkpO1xuICAgICAgcmV0dXJuIGdyb3Vwcy5sZW5ndGggPiAxID8gW3tcbiAgICAgICAgICBuYW1lOiAnQWxsJyxcbiAgICAgICAgICBjaGFyYWN0ZXJzOiBiaW5kKGdyb3VwcywgZnVuY3Rpb24gKGcpIHtcbiAgICAgICAgICAgIHJldHVybiBnLmNoYXJhY3RlcnM7XG4gICAgICAgICAgfSlcbiAgICAgICAgfV0uY29uY2F0KGdyb3VwcykgOiBncm91cHM7XG4gICAgfTtcblxuICAgIHZhciBnZXQgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgZ2V0Q2hhck1hcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGdldENoYXJNYXAkMShlZGl0b3IpO1xuICAgICAgfTtcbiAgICAgIHZhciBpbnNlcnRDaGFyJDEgPSBmdW5jdGlvbiAoY2hyKSB7XG4gICAgICAgIGluc2VydENoYXIoZWRpdG9yLCBjaHIpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdldENoYXJNYXA6IGdldENoYXJNYXAsXG4gICAgICAgIGluc2VydENoYXI6IGluc2VydENoYXIkMVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIENlbGwgPSBmdW5jdGlvbiAoaW5pdGlhbCkge1xuICAgICAgdmFyIHZhbHVlID0gaW5pdGlhbDtcbiAgICAgIHZhciBnZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG4gICAgICB2YXIgc2V0ID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdmFsdWUgPSB2O1xuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdldDogZ2V0LFxuICAgICAgICBzZXQ6IHNldFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIGxhc3QgPSBmdW5jdGlvbiAoZm4sIHJhdGUpIHtcbiAgICAgIHZhciB0aW1lciA9IG51bGw7XG4gICAgICB2YXIgY2FuY2VsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgICBkb21HbG9iYWxzLmNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdmFyIHRocm90dGxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgICBkb21HbG9iYWxzLmNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgIH1cbiAgICAgICAgdGltZXIgPSBkb21HbG9iYWxzLnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgICAgfSwgcmF0ZSk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2FuY2VsOiBjYW5jZWwsXG4gICAgICAgIHRocm90dGxlOiB0aHJvdHRsZVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIG5hdGl2ZUZyb21Db2RlUG9pbnQgPSBTdHJpbmcuZnJvbUNvZGVQb2ludDtcbiAgICB2YXIgY29udGFpbnMgPSBmdW5jdGlvbiAoc3RyLCBzdWJzdHIpIHtcbiAgICAgIHJldHVybiBzdHIuaW5kZXhPZihzdWJzdHIpICE9PSAtMTtcbiAgICB9O1xuICAgIHZhciBmcm9tQ29kZVBvaW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNvZGVQb2ludHMgPSBbXTtcbiAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGNvZGVQb2ludHNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgIH1cbiAgICAgIGlmIChuYXRpdmVGcm9tQ29kZVBvaW50KSB7XG4gICAgICAgIHJldHVybiBuYXRpdmVGcm9tQ29kZVBvaW50LmFwcGx5KHZvaWQgMCwgY29kZVBvaW50cyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgY29kZVVuaXRzID0gW107XG4gICAgICAgIHZhciBjb2RlTGVuID0gMDtcbiAgICAgICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgICAgICBmb3IgKHZhciBpbmRleCA9IDAsIGxlbiA9IGNvZGVQb2ludHMubGVuZ3RoOyBpbmRleCAhPT0gbGVuOyArK2luZGV4KSB7XG4gICAgICAgICAgdmFyIGNvZGVQb2ludCA9ICtjb2RlUG9pbnRzW2luZGV4XTtcbiAgICAgICAgICBpZiAoIShjb2RlUG9pbnQgPCAxMTE0MTExICYmIGNvZGVQb2ludCA+Pj4gMCA9PT0gY29kZVBvaW50KSkge1xuICAgICAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcignSW52YWxpZCBjb2RlIHBvaW50OiAnICsgY29kZVBvaW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNvZGVQb2ludCA8PSA2NTUzNSkge1xuICAgICAgICAgICAgY29kZUxlbiA9IGNvZGVVbml0cy5wdXNoKGNvZGVQb2ludCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvZGVQb2ludCAtPSA2NTUzNjtcbiAgICAgICAgICAgIGNvZGVMZW4gPSBjb2RlVW5pdHMucHVzaCgoY29kZVBvaW50ID4+IDEwKSArIDU1Mjk2LCBjb2RlUG9pbnQgJSAxMDI0ICsgNTYzMjApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoY29kZUxlbiA+PSAxNjM4Mykge1xuICAgICAgICAgICAgcmVzdWx0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgY29kZVVuaXRzKTtcbiAgICAgICAgICAgIGNvZGVVbml0cy5sZW5ndGggPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0ICsgU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBjb2RlVW5pdHMpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgY2hhck1hdGNoZXMgPSBmdW5jdGlvbiAoY2hhckNvZGUsIG5hbWUsIGxvd2VyQ2FzZVBhdHRlcm4pIHtcbiAgICAgIGlmIChjb250YWlucyhmcm9tQ29kZVBvaW50KGNoYXJDb2RlKS50b0xvd2VyQ2FzZSgpLCBsb3dlckNhc2VQYXR0ZXJuKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb250YWlucyhuYW1lLnRvTG93ZXJDYXNlKCksIGxvd2VyQ2FzZVBhdHRlcm4pIHx8IGNvbnRhaW5zKG5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csICcnKSwgbG93ZXJDYXNlUGF0dGVybik7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgc2NhbiA9IGZ1bmN0aW9uIChncm91cCwgcGF0dGVybikge1xuICAgICAgdmFyIG1hdGNoZXMgPSBbXTtcbiAgICAgIHZhciBsb3dlckNhc2VQYXR0ZXJuID0gcGF0dGVybi50b0xvd2VyQ2FzZSgpO1xuICAgICAgZWFjaChncm91cC5jaGFyYWN0ZXJzLCBmdW5jdGlvbiAoZykge1xuICAgICAgICBpZiAoY2hhck1hdGNoZXMoZ1swXSwgZ1sxXSwgbG93ZXJDYXNlUGF0dGVybikpIHtcbiAgICAgICAgICBtYXRjaGVzLnB1c2goZyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG1hcChtYXRjaGVzLCBmdW5jdGlvbiAobSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRleHQ6IG1bMV0sXG4gICAgICAgICAgdmFsdWU6IGZyb21Db2RlUG9pbnQobVswXSksXG4gICAgICAgICAgaWNvbjogZnJvbUNvZGVQb2ludChtWzBdKVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBwYXR0ZXJuTmFtZSA9ICdwYXR0ZXJuJztcbiAgICB2YXIgb3BlbiA9IGZ1bmN0aW9uIChlZGl0b3IsIGNoYXJNYXApIHtcbiAgICAgIHZhciBtYWtlR3JvdXBJdGVtcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsYWJlbDogJ1NlYXJjaCcsXG4gICAgICAgICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgICAgICAgbmFtZTogcGF0dGVybk5hbWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdjb2xsZWN0aW9uJyxcbiAgICAgICAgICAgIG5hbWU6ICdyZXN1bHRzJ1xuICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICAgIH07XG4gICAgICB2YXIgbWFrZVRhYnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBtYXAoY2hhck1hcCwgZnVuY3Rpb24gKGNoYXJHcm91cCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0aXRsZTogY2hhckdyb3VwLm5hbWUsXG4gICAgICAgICAgICBuYW1lOiBjaGFyR3JvdXAubmFtZSxcbiAgICAgICAgICAgIGl0ZW1zOiBtYWtlR3JvdXBJdGVtcygpXG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgdmFyIG1ha2VQYW5lbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0eXBlOiAncGFuZWwnLFxuICAgICAgICAgIGl0ZW1zOiBtYWtlR3JvdXBJdGVtcygpXG4gICAgICAgIH07XG4gICAgICB9O1xuICAgICAgdmFyIG1ha2VUYWJQYW5lbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0eXBlOiAndGFicGFuZWwnLFxuICAgICAgICAgIHRhYnM6IG1ha2VUYWJzKClcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICB2YXIgY3VycmVudFRhYiA9IGNoYXJNYXAubGVuZ3RoID09PSAxID8gQ2VsbChVc2VyRGVmaW5lZCkgOiBDZWxsKCdBbGwnKTtcbiAgICAgIHZhciBzY2FuQW5kU2V0ID0gZnVuY3Rpb24gKGRpYWxvZ0FwaSwgcGF0dGVybikge1xuICAgICAgICBmaW5kKGNoYXJNYXAsIGZ1bmN0aW9uIChncm91cCkge1xuICAgICAgICAgIHJldHVybiBncm91cC5uYW1lID09PSBjdXJyZW50VGFiLmdldCgpO1xuICAgICAgICB9KS5lYWNoKGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgdmFyIGl0ZW1zID0gc2NhbihmLCBwYXR0ZXJuKTtcbiAgICAgICAgICBkaWFsb2dBcGkuc2V0RGF0YSh7IHJlc3VsdHM6IGl0ZW1zIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICB2YXIgU0VBUkNIX0RFTEFZID0gNDA7XG4gICAgICB2YXIgdXBkYXRlRmlsdGVyID0gbGFzdChmdW5jdGlvbiAoZGlhbG9nQXBpKSB7XG4gICAgICAgIHZhciBwYXR0ZXJuID0gZGlhbG9nQXBpLmdldERhdGEoKS5wYXR0ZXJuO1xuICAgICAgICBzY2FuQW5kU2V0KGRpYWxvZ0FwaSwgcGF0dGVybik7XG4gICAgICB9LCBTRUFSQ0hfREVMQVkpO1xuICAgICAgdmFyIGJvZHkgPSBjaGFyTWFwLmxlbmd0aCA9PT0gMSA/IG1ha2VQYW5lbCgpIDogbWFrZVRhYlBhbmVsKCk7XG4gICAgICB2YXIgaW5pdGlhbERhdGEgPSB7XG4gICAgICAgIHBhdHRlcm46ICcnLFxuICAgICAgICByZXN1bHRzOiBzY2FuKGNoYXJNYXBbMF0sICcnKVxuICAgICAgfTtcbiAgICAgIHZhciBicmlkZ2VTcGVjID0ge1xuICAgICAgICB0aXRsZTogJ1NwZWNpYWwgQ2hhcmFjdGVyJyxcbiAgICAgICAgc2l6ZTogJ25vcm1hbCcsXG4gICAgICAgIGJvZHk6IGJvZHksXG4gICAgICAgIGJ1dHRvbnM6IFt7XG4gICAgICAgICAgICB0eXBlOiAnY2FuY2VsJyxcbiAgICAgICAgICAgIG5hbWU6ICdjbG9zZScsXG4gICAgICAgICAgICB0ZXh0OiAnQ2xvc2UnLFxuICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZVxuICAgICAgICAgIH1dLFxuICAgICAgICBpbml0aWFsRGF0YTogaW5pdGlhbERhdGEsXG4gICAgICAgIG9uQWN0aW9uOiBmdW5jdGlvbiAoYXBpLCBkZXRhaWxzKSB7XG4gICAgICAgICAgaWYgKGRldGFpbHMubmFtZSA9PT0gJ3Jlc3VsdHMnKSB7XG4gICAgICAgICAgICBpbnNlcnRDaGFyKGVkaXRvciwgZGV0YWlscy52YWx1ZSk7XG4gICAgICAgICAgICBhcGkuY2xvc2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uVGFiQ2hhbmdlOiBmdW5jdGlvbiAoZGlhbG9nQXBpLCBkZXRhaWxzKSB7XG4gICAgICAgICAgY3VycmVudFRhYi5zZXQoZGV0YWlscy5uZXdUYWJOYW1lKTtcbiAgICAgICAgICB1cGRhdGVGaWx0ZXIudGhyb3R0bGUoZGlhbG9nQXBpKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChkaWFsb2dBcGksIGNoYW5nZURhdGEpIHtcbiAgICAgICAgICBpZiAoY2hhbmdlRGF0YS5uYW1lID09PSBwYXR0ZXJuTmFtZSkge1xuICAgICAgICAgICAgdXBkYXRlRmlsdGVyLnRocm90dGxlKGRpYWxvZ0FwaSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdmFyIGRpYWxvZ0FwaSA9IGVkaXRvci53aW5kb3dNYW5hZ2VyLm9wZW4oYnJpZGdlU3BlYyk7XG4gICAgICBkaWFsb2dBcGkuZm9jdXMocGF0dGVybk5hbWUpO1xuICAgIH07XG5cbiAgICB2YXIgcmVnaXN0ZXIgPSBmdW5jdGlvbiAoZWRpdG9yLCBjaGFyTWFwKSB7XG4gICAgICBlZGl0b3IuYWRkQ29tbWFuZCgnbWNlU2hvd0NoYXJtYXAnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9wZW4oZWRpdG9yLCBjaGFyTWFwKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgZ2xvYmFsJDIgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS51dGlsLlByb21pc2UnKTtcblxuICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKGVkaXRvciwgYWxsKSB7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQXV0b2NvbXBsZXRlcignY2hhcm1hcCcsIHtcbiAgICAgICAgY2g6ICc6JyxcbiAgICAgICAgY29sdW1uczogJ2F1dG8nLFxuICAgICAgICBtaW5DaGFyczogMixcbiAgICAgICAgZmV0Y2g6IGZ1bmN0aW9uIChwYXR0ZXJuLCBfbWF4UmVzdWx0cykge1xuICAgICAgICAgIHJldHVybiBuZXcgZ2xvYmFsJDIoZnVuY3Rpb24gKHJlc29sdmUsIF9yZWplY3QpIHtcbiAgICAgICAgICAgIHJlc29sdmUoc2NhbihhbGwsIHBhdHRlcm4pKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uIChhdXRvY29tcGxldGVBcGksIHJuZywgdmFsdWUpIHtcbiAgICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLnNldFJuZyhybmcpO1xuICAgICAgICAgIGVkaXRvci5pbnNlcnRDb250ZW50KHZhbHVlKTtcbiAgICAgICAgICBhdXRvY29tcGxldGVBcGkuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHJlZ2lzdGVyJDEgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQnV0dG9uKCdjaGFybWFwJywge1xuICAgICAgICBpY29uOiAnaW5zZXJ0LWNoYXJhY3RlcicsXG4gICAgICAgIHRvb2x0aXA6ICdTcGVjaWFsIGNoYXJhY3RlcicsXG4gICAgICAgIG9uQWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci5leGVjQ29tbWFuZCgnbWNlU2hvd0NoYXJtYXAnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkTWVudUl0ZW0oJ2NoYXJtYXAnLCB7XG4gICAgICAgIGljb246ICdpbnNlcnQtY2hhcmFjdGVyJyxcbiAgICAgICAgdGV4dDogJ1NwZWNpYWwgY2hhcmFjdGVyLi4uJyxcbiAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZWRpdG9yLmV4ZWNDb21tYW5kKCdtY2VTaG93Q2hhcm1hcCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gUGx1Z2luICgpIHtcbiAgICAgIGdsb2JhbC5hZGQoJ2NoYXJtYXAnLCBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIHZhciBjaGFyTWFwID0gZ2V0Q2hhck1hcCQxKGVkaXRvcik7XG4gICAgICAgIHJlZ2lzdGVyKGVkaXRvciwgY2hhck1hcCk7XG4gICAgICAgIHJlZ2lzdGVyJDEoZWRpdG9yKTtcbiAgICAgICAgaW5pdChlZGl0b3IsIGNoYXJNYXBbMF0pO1xuICAgICAgICByZXR1cm4gZ2V0KGVkaXRvcik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBQbHVnaW4oKTtcblxufSh3aW5kb3cpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=