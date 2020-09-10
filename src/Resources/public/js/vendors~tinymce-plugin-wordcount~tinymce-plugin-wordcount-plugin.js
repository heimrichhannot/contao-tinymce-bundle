(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~tinymce-plugin-wordcount~tinymce-plugin-wordcount-plugin"],{

/***/ "./node_modules/tinymce/plugins/wordcount/plugin.js":
/*!**********************************************************!*\
  !*** ./node_modules/tinymce/plugins/wordcount/plugin.js ***!
  \**********************************************************/
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
(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var identity = function (x) {
      return x;
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

    var zeroWidth = '\uFEFF';
    var removeZwsp = function (s) {
      return s.replace(/\uFEFF/g, '');
    };

    var punctuationStr = '[!-#%-*,-\\/:;?@\\[-\\]_{}\xA1\xAB\xB7\xBB\xBF;\xB7\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1361-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u3008\u3009\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30\u2E31\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uff3f\uFF5B\uFF5D\uFF5F-\uFF65]';
    var regExps = {
      aletter: '[A-Za-z\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05F3\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u10a0-\u10c5\u10d0-\u10fa\u10fc\u1100-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1a00-\u1a16\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bc0-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u24B6-\u24E9\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2d00-\u2d25\u2d30-\u2d65\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005\u303b\u303c\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790\ua791\ua7a0-\ua7a9\ua7fa-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uffa0-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]',
      midnumlet: '[-\'\\.\u2018\u2019\u2024\uFE52\uFF07\uFF0E]',
      midletter: '[:\xB7\xB7\u05F4\u2027\uFE13\uFE55\uFF1A]',
      midnum: '[\xB1+*/,;;\u0589\u060C\u060D\u066C\u07F8\u2044\uFE10\uFE14\uFE50\uFE54\uFF0C\uFF1B]',
      numeric: '[0-9\u0660-\u0669\u066B\u06f0-\u06f9\u07c0-\u07c9\u0966-\u096f\u09e6-\u09ef\u0a66-\u0a6f\u0ae6-\u0aef\u0b66-\u0b6f\u0be6-\u0bef\u0c66-\u0c6f\u0ce6-\u0cef\u0d66-\u0d6f\u0e50-\u0e59\u0ed0-\u0ed9\u0f20-\u0f29\u1040-\u1049\u1090-\u1099\u17e0-\u17e9\u1810-\u1819\u1946-\u194f\u19d0-\u19d9\u1a80-\u1a89\u1a90-\u1a99\u1b50-\u1b59\u1bb0-\u1bb9\u1c40-\u1c49\u1c50-\u1c59\ua620-\ua629\ua8d0-\ua8d9\ua900-\ua909\ua9d0-\ua9d9\uaa50-\uaa59\uabf0-\uabf9]',
      cr: '\\r',
      lf: '\\n',
      newline: '[\x0B\f\x85\u2028\u2029]',
      extend: '[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0c01-\u0c03\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d02\u0d03\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f\u109a-\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b6-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u192b\u1930-\u193b\u19b0-\u19c0\u19c8\u19c9\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f\u1b00-\u1b04\u1b34-\u1b44\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1baa\u1be6-\u1bf3\u1c24-\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf2\u1dc0-\u1de6\u1dfc-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\uA672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua880\ua881\ua8b4-\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa7b\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe3-\uabea\uabec\uabed\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]',
      format: '[\xAD\u0600-\u0603\u06DD\u070F\u17b4\u17b5\u200E\u200F\u202A-\u202E\u2060-\u2064\u206A-\u206F\uFEFF\uFFF9-\uFFFB]',
      katakana: '[\u3031-\u3035\u309B\u309C\u30A0-\u30fa\u30fc-\u30ff\u31f0-\u31ff\u32D0-\u32FE\u3300-\u3357\uff66-\uff9d]',
      extendnumlet: '[=_\u203f\u2040\u2054\ufe33\ufe34\ufe4d-\ufe4f\uff3f\u2200-\u22FF<>]',
      punctuation: punctuationStr
    };
    var characterIndices = {
      ALETTER: 0,
      MIDNUMLET: 1,
      MIDLETTER: 2,
      MIDNUM: 3,
      NUMERIC: 4,
      CR: 5,
      LF: 6,
      NEWLINE: 7,
      EXTEND: 8,
      FORMAT: 9,
      KATAKANA: 10,
      EXTENDNUMLET: 11,
      AT: 12,
      OTHER: 13
    };
    var SETS = [
      new RegExp(regExps.aletter),
      new RegExp(regExps.midnumlet),
      new RegExp(regExps.midletter),
      new RegExp(regExps.midnum),
      new RegExp(regExps.numeric),
      new RegExp(regExps.cr),
      new RegExp(regExps.lf),
      new RegExp(regExps.newline),
      new RegExp(regExps.extend),
      new RegExp(regExps.format),
      new RegExp(regExps.katakana),
      new RegExp(regExps.extendnumlet),
      new RegExp('@')
    ];
    var EMPTY_STRING = '';
    var PUNCTUATION = new RegExp('^' + regExps.punctuation + '$');
    var WHITESPACE = /^\s+$/;

    var map = function (xs, f) {
      var len = xs.length;
      var r = new Array(len);
      for (var i = 0; i < len; i++) {
        var x = xs[i];
        r[i] = f(x, i);
      }
      return r;
    };

    var SETS$1 = SETS;
    var OTHER = characterIndices.OTHER;
    var getType = function (char) {
      var type = OTHER;
      var setsLength = SETS$1.length;
      for (var j = 0; j < setsLength; ++j) {
        var set = SETS$1[j];
        if (set && set.test(char)) {
          type = j;
          break;
        }
      }
      return type;
    };
    var memoize = function (func) {
      var cache = {};
      return function (char) {
        if (cache[char]) {
          return cache[char];
        } else {
          var result = func(char);
          cache[char] = result;
          return result;
        }
      };
    };
    var classify = function (characters) {
      var memoized = memoize(getType);
      return map(characters, memoized);
    };

    var isWordBoundary = function (map, index) {
      var type = map[index];
      var nextType = map[index + 1];
      if (index < 0 || index > map.length - 1 && index !== 0) {
        return false;
      }
      if (type === characterIndices.ALETTER && nextType === characterIndices.ALETTER) {
        return false;
      }
      var nextNextType = map[index + 2];
      if (type === characterIndices.ALETTER && (nextType === characterIndices.MIDLETTER || nextType === characterIndices.MIDNUMLET || nextType === characterIndices.AT) && nextNextType === characterIndices.ALETTER) {
        return false;
      }
      var prevType = map[index - 1];
      if ((type === characterIndices.MIDLETTER || type === characterIndices.MIDNUMLET || nextType === characterIndices.AT) && nextType === characterIndices.ALETTER && prevType === characterIndices.ALETTER) {
        return false;
      }
      if ((type === characterIndices.NUMERIC || type === characterIndices.ALETTER) && (nextType === characterIndices.NUMERIC || nextType === characterIndices.ALETTER)) {
        return false;
      }
      if ((type === characterIndices.MIDNUM || type === characterIndices.MIDNUMLET) && nextType === characterIndices.NUMERIC && prevType === characterIndices.NUMERIC) {
        return false;
      }
      if (type === characterIndices.NUMERIC && (nextType === characterIndices.MIDNUM || nextType === characterIndices.MIDNUMLET) && nextNextType === characterIndices.NUMERIC) {
        return false;
      }
      if (type === characterIndices.EXTEND || type === characterIndices.FORMAT || prevType === characterIndices.EXTEND || prevType === characterIndices.FORMAT || nextType === characterIndices.EXTEND || nextType === characterIndices.FORMAT) {
        return false;
      }
      if (type === characterIndices.CR && nextType === characterIndices.LF) {
        return false;
      }
      if (type === characterIndices.NEWLINE || type === characterIndices.CR || type === characterIndices.LF) {
        return true;
      }
      if (nextType === characterIndices.NEWLINE || nextType === characterIndices.CR || nextType === characterIndices.LF) {
        return true;
      }
      if (type === characterIndices.KATAKANA && nextType === characterIndices.KATAKANA) {
        return false;
      }
      if (nextType === characterIndices.EXTENDNUMLET && (type === characterIndices.ALETTER || type === characterIndices.NUMERIC || type === characterIndices.KATAKANA || type === characterIndices.EXTENDNUMLET)) {
        return false;
      }
      if (type === characterIndices.EXTENDNUMLET && (nextType === characterIndices.ALETTER || nextType === characterIndices.NUMERIC || nextType === characterIndices.KATAKANA)) {
        return false;
      }
      if (type === characterIndices.AT) {
        return false;
      }
      return true;
    };

    var EMPTY_STRING$1 = EMPTY_STRING;
    var WHITESPACE$1 = WHITESPACE;
    var PUNCTUATION$1 = PUNCTUATION;
    var isProtocol = function (str) {
      return str === 'http' || str === 'https';
    };
    var findWordEnd = function (characters, startIndex) {
      var i;
      for (i = startIndex; i < characters.length; i++) {
        if (WHITESPACE$1.test(characters[i])) {
          break;
        }
      }
      return i;
    };
    var findUrlEnd = function (characters, startIndex) {
      var endIndex = findWordEnd(characters, startIndex + 1);
      var peakedWord = characters.slice(startIndex + 1, endIndex).join(EMPTY_STRING$1);
      return peakedWord.substr(0, 3) === '://' ? endIndex : startIndex;
    };
    var findWords = function (chars, sChars, characterMap, options) {
      var words = [];
      var word = [];
      for (var i = 0; i < characterMap.length; ++i) {
        word.push(chars[i]);
        if (isWordBoundary(characterMap, i)) {
          var ch = sChars[i];
          if ((options.includeWhitespace || !WHITESPACE$1.test(ch)) && (options.includePunctuation || !PUNCTUATION$1.test(ch))) {
            var startOfWord = i - word.length + 1;
            var endOfWord = i + 1;
            var str = sChars.slice(startOfWord, endOfWord).join(EMPTY_STRING$1);
            if (isProtocol(str)) {
              var endOfUrl = findUrlEnd(sChars, i);
              var url = chars.slice(endOfWord, endOfUrl);
              Array.prototype.push.apply(word, url);
              i = endOfUrl;
            }
            words.push(word);
          }
          word = [];
        }
      }
      return words;
    };
    var getDefaultOptions = function () {
      return {
        includeWhitespace: false,
        includePunctuation: false
      };
    };
    var getWords = function (chars, extract, options) {
      options = __assign(__assign({}, getDefaultOptions()), options);
      var filteredChars = [];
      var extractedChars = [];
      for (var i = 0; i < chars.length; i++) {
        var ch = extract(chars[i]);
        if (ch !== zeroWidth) {
          filteredChars.push(chars[i]);
          extractedChars.push(ch);
        }
      }
      var characterMap = classify(extractedChars);
      return findWords(filteredChars, extractedChars, characterMap, options);
    };

    var getWords$1 = getWords;

    var global$1 = tinymce.util.Tools.resolve('tinymce.dom.TreeWalker');

    var getText = function (node, schema) {
      var blockElements = schema.getBlockElements();
      var shortEndedElements = schema.getShortEndedElements();
      var isNewline = function (node) {
        return blockElements[node.nodeName] || shortEndedElements[node.nodeName];
      };
      var textBlocks = [];
      var txt = '';
      var treeWalker = new global$1(node, node);
      while (node = treeWalker.next()) {
        if (node.nodeType === 3) {
          txt += removeZwsp(node.data);
        } else if (isNewline(node) && txt.length) {
          textBlocks.push(txt);
          txt = '';
        }
      }
      if (txt.length) {
        textBlocks.push(txt);
      }
      return textBlocks;
    };

    var strLen = function (str) {
      return str.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '_').length;
    };
    var countWords = function (node, schema) {
      var text = getText(node, schema).join('\n');
      return getWords$1(text.split(''), identity).length;
    };
    var countCharacters = function (node, schema) {
      var text = getText(node, schema).join('');
      return strLen(text);
    };
    var countCharactersWithoutSpaces = function (node, schema) {
      var text = getText(node, schema).join('').replace(/\s/g, '');
      return strLen(text);
    };

    var createBodyCounter = function (editor, count) {
      return function () {
        return count(editor.getBody(), editor.schema);
      };
    };
    var createSelectionCounter = function (editor, count) {
      return function () {
        return count(editor.selection.getRng().cloneContents(), editor.schema);
      };
    };
    var createBodyWordCounter = function (editor) {
      return createBodyCounter(editor, countWords);
    };
    var get = function (editor) {
      return {
        body: {
          getWordCount: createBodyWordCounter(editor),
          getCharacterCount: createBodyCounter(editor, countCharacters),
          getCharacterCountWithoutSpaces: createBodyCounter(editor, countCharactersWithoutSpaces)
        },
        selection: {
          getWordCount: createSelectionCounter(editor, countWords),
          getCharacterCount: createSelectionCounter(editor, countCharacters),
          getCharacterCountWithoutSpaces: createSelectionCounter(editor, countCharactersWithoutSpaces)
        },
        getCount: createBodyWordCounter(editor)
      };
    };

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.Delay');

    var fireWordCountUpdate = function (editor, api) {
      editor.fire('wordCountUpdate', {
        wordCount: {
          words: api.body.getWordCount(),
          characters: api.body.getCharacterCount(),
          charactersWithoutSpaces: api.body.getCharacterCountWithoutSpaces()
        }
      });
    };

    var updateCount = function (editor, api) {
      fireWordCountUpdate(editor, api);
    };
    var setup = function (editor, api, delay) {
      var debouncedUpdate = global$2.debounce(function () {
        return updateCount(editor, api);
      }, delay);
      editor.on('init', function () {
        updateCount(editor, api);
        global$2.setEditorTimeout(editor, function () {
          editor.on('SetContent BeforeAddUndo Undo Redo keyup', debouncedUpdate);
        }, 0);
      });
    };

    var open = function (editor, api) {
      editor.windowManager.open({
        title: 'Word Count',
        body: {
          type: 'panel',
          items: [{
              type: 'table',
              header: [
                'Count',
                'Document',
                'Selection'
              ],
              cells: [
                [
                  'Words',
                  String(api.body.getWordCount()),
                  String(api.selection.getWordCount())
                ],
                [
                  'Characters (no spaces)',
                  String(api.body.getCharacterCountWithoutSpaces()),
                  String(api.selection.getCharacterCountWithoutSpaces())
                ],
                [
                  'Characters',
                  String(api.body.getCharacterCount()),
                  String(api.selection.getCharacterCount())
                ]
              ]
            }]
        },
        buttons: [{
            type: 'cancel',
            name: 'close',
            text: 'Close',
            primary: true
          }]
      });
    };

    var register = function (editor, api) {
      editor.ui.registry.addButton('wordcount', {
        tooltip: 'Word count',
        icon: 'character-count',
        onAction: function () {
          return open(editor, api);
        }
      });
      editor.ui.registry.addMenuItem('wordcount', {
        text: 'Word count',
        icon: 'character-count',
        onAction: function () {
          return open(editor, api);
        }
      });
    };

    function Plugin (delay) {
      if (delay === void 0) {
        delay = 300;
      }
      global.add('wordcount', function (editor) {
        var api = get(editor);
        register(editor, api);
        setup(editor, api, delay);
        return api;
      });
    }

    Plugin();

}());


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL3dvcmRjb3VudC9wbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0NBQXdDLFlBQVkscUJBQXFCO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHVCQUF1QjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHlCQUF5QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBLHFCQUFxQixrQkFBa0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7O0FBRUEsQ0FBQyIsImZpbGUiOiJ2ZW5kb3JzfnRpbnltY2UtcGx1Z2luLXdvcmRjb3VudH50aW55bWNlLXBsdWdpbi13b3JkY291bnQtcGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIFRpbnkgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTEdQTCBvciBhIGNvbW1lcmNpYWwgbGljZW5zZS5cbiAqIEZvciBMR1BMIHNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogRm9yIGNvbW1lcmNpYWwgbGljZW5zZXMgc2VlIGh0dHBzOi8vd3d3LnRpbnkuY2xvdWQvXG4gKlxuICogVmVyc2lvbjogNS40LjIgKDIwMjAtMDgtMTcpXG4gKi9cbihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIGdsb2JhbCA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLlBsdWdpbk1hbmFnZXInKTtcblxuICAgIHZhciBpZGVudGl0eSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICByZXR1cm4geDtcbiAgICB9O1xuXG4gICAgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24gKCkge1xuICAgICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICBmb3IgKHZhciBwIGluIHMpXG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICAgIH07XG4gICAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgdmFyIHplcm9XaWR0aCA9ICdcXHVGRUZGJztcbiAgICB2YXIgcmVtb3ZlWndzcCA9IGZ1bmN0aW9uIChzKSB7XG4gICAgICByZXR1cm4gcy5yZXBsYWNlKC9cXHVGRUZGL2csICcnKTtcbiAgICB9O1xuXG4gICAgdmFyIHB1bmN0dWF0aW9uU3RyID0gJ1shLSMlLSosLVxcXFwvOjs/QFxcXFxbLVxcXFxdX3t9XFx4QTFcXHhBQlxceEI3XFx4QkJcXHhCRjtcXHhCN1xcdTA1NUEtXFx1MDU1RlxcdTA1ODlcXHUwNThBXFx1MDVCRVxcdTA1QzBcXHUwNUMzXFx1MDVDNlxcdTA1RjNcXHUwNUY0XFx1MDYwOVxcdTA2MEFcXHUwNjBDXFx1MDYwRFxcdTA2MUJcXHUwNjFFXFx1MDYxRlxcdTA2NkEtXFx1MDY2RFxcdTA2RDRcXHUwNzAwLVxcdTA3MERcXHUwN0Y3LVxcdTA3RjlcXHUwODMwLVxcdTA4M0VcXHUwODVFXFx1MDk2NFxcdTA5NjVcXHUwOTcwXFx1MERGNFxcdTBFNEZcXHUwRTVBXFx1MEU1QlxcdTBGMDQtXFx1MEYxMlxcdTBGM0EtXFx1MEYzRFxcdTBGODVcXHUwRkQwLVxcdTBGRDRcXHUwRkQ5XFx1MEZEQVxcdTEwNEEtXFx1MTA0RlxcdTEwRkJcXHUxMzYxLVxcdTEzNjhcXHUxNDAwXFx1MTY2RFxcdTE2NkVcXHUxNjlCXFx1MTY5Q1xcdTE2RUItXFx1MTZFRFxcdTE3MzVcXHUxNzM2XFx1MTdENC1cXHUxN0Q2XFx1MTdEOC1cXHUxN0RBXFx1MTgwMC1cXHUxODBBXFx1MTk0NFxcdTE5NDVcXHUxQTFFXFx1MUExRlxcdTFBQTAtXFx1MUFBNlxcdTFBQTgtXFx1MUFBRFxcdTFCNUEtXFx1MUI2MFxcdTFCRkMtXFx1MUJGRlxcdTFDM0ItXFx1MUMzRlxcdTFDN0VcXHUxQzdGXFx1MUNEM1xcdTIwMTAtXFx1MjAyN1xcdTIwMzAtXFx1MjA0M1xcdTIwNDUtXFx1MjA1MVxcdTIwNTMtXFx1MjA1RVxcdTIwN0RcXHUyMDdFXFx1MjA4RFxcdTIwOEVcXHUzMDA4XFx1MzAwOVxcdTI3NjgtXFx1Mjc3NVxcdTI3QzVcXHUyN0M2XFx1MjdFNi1cXHUyN0VGXFx1Mjk4My1cXHUyOTk4XFx1MjlEOC1cXHUyOURCXFx1MjlGQ1xcdTI5RkRcXHUyQ0Y5LVxcdTJDRkNcXHUyQ0ZFXFx1MkNGRlxcdTJENzBcXHUyRTAwLVxcdTJFMkVcXHUyRTMwXFx1MkUzMVxcdTMwMDEtXFx1MzAwM1xcdTMwMDgtXFx1MzAxMVxcdTMwMTQtXFx1MzAxRlxcdTMwMzBcXHUzMDNEXFx1MzBBMFxcdTMwRkJcXHVBNEZFXFx1QTRGRlxcdUE2MEQtXFx1QTYwRlxcdUE2NzNcXHVBNjdFXFx1QTZGMi1cXHVBNkY3XFx1QTg3NC1cXHVBODc3XFx1QThDRVxcdUE4Q0ZcXHVBOEY4LVxcdUE4RkFcXHVBOTJFXFx1QTkyRlxcdUE5NUZcXHVBOUMxLVxcdUE5Q0RcXHVBOURFXFx1QTlERlxcdUFBNUMtXFx1QUE1RlxcdUFBREVcXHVBQURGXFx1QUJFQlxcdUZEM0VcXHVGRDNGXFx1RkUxMC1cXHVGRTE5XFx1RkUzMC1cXHVGRTUyXFx1RkU1NC1cXHVGRTYxXFx1RkU2M1xcdUZFNjhcXHVGRTZBXFx1RkU2QlxcdUZGMDEtXFx1RkYwM1xcdUZGMDUtXFx1RkYwQVxcdUZGMEMtXFx1RkYwRlxcdUZGMUFcXHVGRjFCXFx1RkYxRlxcdUZGMjBcXHVGRjNCLVxcdUZGM0RcXHVmZjNmXFx1RkY1QlxcdUZGNURcXHVGRjVGLVxcdUZGNjVdJztcbiAgICB2YXIgcmVnRXhwcyA9IHtcbiAgICAgIGFsZXR0ZXI6ICdbQS1aYS16XFx4YWFcXHhiNVxceGJhXFx4YzAtXFx4ZDZcXHhkOC1cXHhmNlxceGY4LVxcdTAyYzFcXHUwMmM2LVxcdTAyZDFcXHUwMmUwLVxcdTAyZTRcXHUwMmVjXFx1MDJlZVxcdTAzNzAtXFx1MDM3NFxcdTAzNzZcXHUwMzc3XFx1MDM3YS1cXHUwMzdkXFx1MDM4NlxcdTAzODgtXFx1MDM4YVxcdTAzOGNcXHUwMzhlLVxcdTAzYTFcXHUwM2EzLVxcdTAzZjVcXHUwM2Y3LVxcdTA0ODFcXHUwNDhhLVxcdTA1MjdcXHUwNTMxLVxcdTA1NTZcXHUwNTU5XFx1MDU2MS1cXHUwNTg3XFx1MDVkMC1cXHUwNWVhXFx1MDVmMC1cXHUwNUYzXFx1MDYyMC1cXHUwNjRhXFx1MDY2ZVxcdTA2NmZcXHUwNjcxLVxcdTA2ZDNcXHUwNmQ1XFx1MDZlNVxcdTA2ZTZcXHUwNmVlXFx1MDZlZlxcdTA2ZmEtXFx1MDZmY1xcdTA2ZmZcXHUwNzEwXFx1MDcxMi1cXHUwNzJmXFx1MDc0ZC1cXHUwN2E1XFx1MDdiMVxcdTA3Y2EtXFx1MDdlYVxcdTA3ZjRcXHUwN2Y1XFx1MDdmYVxcdTA4MDAtXFx1MDgxNVxcdTA4MWFcXHUwODI0XFx1MDgyOFxcdTA4NDAtXFx1MDg1OFxcdTA5MDQtXFx1MDkzOVxcdTA5M2RcXHUwOTUwXFx1MDk1OC1cXHUwOTYxXFx1MDk3MS1cXHUwOTc3XFx1MDk3OS1cXHUwOTdmXFx1MDk4NS1cXHUwOThjXFx1MDk4ZlxcdTA5OTBcXHUwOTkzLVxcdTA5YThcXHUwOWFhLVxcdTA5YjBcXHUwOWIyXFx1MDliNi1cXHUwOWI5XFx1MDliZFxcdTA5Y2VcXHUwOWRjXFx1MDlkZFxcdTA5ZGYtXFx1MDllMVxcdTA5ZjBcXHUwOWYxXFx1MGEwNS1cXHUwYTBhXFx1MGEwZlxcdTBhMTBcXHUwYTEzLVxcdTBhMjhcXHUwYTJhLVxcdTBhMzBcXHUwYTMyXFx1MGEzM1xcdTBhMzVcXHUwYTM2XFx1MGEzOFxcdTBhMzlcXHUwYTU5LVxcdTBhNWNcXHUwYTVlXFx1MGE3Mi1cXHUwYTc0XFx1MGE4NS1cXHUwYThkXFx1MGE4Zi1cXHUwYTkxXFx1MGE5My1cXHUwYWE4XFx1MGFhYS1cXHUwYWIwXFx1MGFiMlxcdTBhYjNcXHUwYWI1LVxcdTBhYjlcXHUwYWJkXFx1MGFkMFxcdTBhZTBcXHUwYWUxXFx1MGIwNS1cXHUwYjBjXFx1MGIwZlxcdTBiMTBcXHUwYjEzLVxcdTBiMjhcXHUwYjJhLVxcdTBiMzBcXHUwYjMyXFx1MGIzM1xcdTBiMzUtXFx1MGIzOVxcdTBiM2RcXHUwYjVjXFx1MGI1ZFxcdTBiNWYtXFx1MGI2MVxcdTBiNzFcXHUwYjgzXFx1MGI4NS1cXHUwYjhhXFx1MGI4ZS1cXHUwYjkwXFx1MGI5Mi1cXHUwYjk1XFx1MGI5OVxcdTBiOWFcXHUwYjljXFx1MGI5ZVxcdTBiOWZcXHUwYmEzXFx1MGJhNFxcdTBiYTgtXFx1MGJhYVxcdTBiYWUtXFx1MGJiOVxcdTBiZDBcXHUwYzA1LVxcdTBjMGNcXHUwYzBlLVxcdTBjMTBcXHUwYzEyLVxcdTBjMjhcXHUwYzJhLVxcdTBjMzNcXHUwYzM1LVxcdTBjMzlcXHUwYzNkXFx1MGM1OFxcdTBjNTlcXHUwYzYwXFx1MGM2MVxcdTBjODUtXFx1MGM4Y1xcdTBjOGUtXFx1MGM5MFxcdTBjOTItXFx1MGNhOFxcdTBjYWEtXFx1MGNiM1xcdTBjYjUtXFx1MGNiOVxcdTBjYmRcXHUwY2RlXFx1MGNlMFxcdTBjZTFcXHUwY2YxXFx1MGNmMlxcdTBkMDUtXFx1MGQwY1xcdTBkMGUtXFx1MGQxMFxcdTBkMTItXFx1MGQzYVxcdTBkM2RcXHUwZDRlXFx1MGQ2MFxcdTBkNjFcXHUwZDdhLVxcdTBkN2ZcXHUwZDg1LVxcdTBkOTZcXHUwZDlhLVxcdTBkYjFcXHUwZGIzLVxcdTBkYmJcXHUwZGJkXFx1MGRjMC1cXHUwZGM2XFx1MGYwMFxcdTBmNDAtXFx1MGY0N1xcdTBmNDktXFx1MGY2Y1xcdTBmODgtXFx1MGY4Y1xcdTEwYTAtXFx1MTBjNVxcdTEwZDAtXFx1MTBmYVxcdTEwZmNcXHUxMTAwLVxcdTEyNDhcXHUxMjRhLVxcdTEyNGRcXHUxMjUwLVxcdTEyNTZcXHUxMjU4XFx1MTI1YS1cXHUxMjVkXFx1MTI2MC1cXHUxMjg4XFx1MTI4YS1cXHUxMjhkXFx1MTI5MC1cXHUxMmIwXFx1MTJiMi1cXHUxMmI1XFx1MTJiOC1cXHUxMmJlXFx1MTJjMFxcdTEyYzItXFx1MTJjNVxcdTEyYzgtXFx1MTJkNlxcdTEyZDgtXFx1MTMxMFxcdTEzMTItXFx1MTMxNVxcdTEzMTgtXFx1MTM1YVxcdTEzODAtXFx1MTM4ZlxcdTEzYTAtXFx1MTNmNFxcdTE0MDEtXFx1MTY2Y1xcdTE2NmYtXFx1MTY3ZlxcdTE2ODEtXFx1MTY5YVxcdTE2YTAtXFx1MTZlYVxcdTE2ZWUtXFx1MTZmMFxcdTE3MDAtXFx1MTcwY1xcdTE3MGUtXFx1MTcxMVxcdTE3MjAtXFx1MTczMVxcdTE3NDAtXFx1MTc1MVxcdTE3NjAtXFx1MTc2Y1xcdTE3NmUtXFx1MTc3MFxcdTE4MjAtXFx1MTg3N1xcdTE4ODAtXFx1MThhOFxcdTE4YWFcXHUxOGIwLVxcdTE4ZjVcXHUxOTAwLVxcdTE5MWNcXHUxYTAwLVxcdTFhMTZcXHUxYjA1LVxcdTFiMzNcXHUxYjQ1LVxcdTFiNGJcXHUxYjgzLVxcdTFiYTBcXHUxYmFlXFx1MWJhZlxcdTFiYzAtXFx1MWJlNVxcdTFjMDAtXFx1MWMyM1xcdTFjNGQtXFx1MWM0ZlxcdTFjNWEtXFx1MWM3ZFxcdTFjZTktXFx1MWNlY1xcdTFjZWUtXFx1MWNmMVxcdTFkMDAtXFx1MWRiZlxcdTFlMDAtXFx1MWYxNVxcdTFmMTgtXFx1MWYxZFxcdTFmMjAtXFx1MWY0NVxcdTFmNDgtXFx1MWY0ZFxcdTFmNTAtXFx1MWY1N1xcdTFmNTlcXHUxZjViXFx1MWY1ZFxcdTFmNWYtXFx1MWY3ZFxcdTFmODAtXFx1MWZiNFxcdTFmYjYtXFx1MWZiY1xcdTFmYmVcXHUxZmMyLVxcdTFmYzRcXHUxZmM2LVxcdTFmY2NcXHUxZmQwLVxcdTFmZDNcXHUxZmQ2LVxcdTFmZGJcXHUxZmUwLVxcdTFmZWNcXHUxZmYyLVxcdTFmZjRcXHUxZmY2LVxcdTFmZmNcXHUyMDcxXFx1MjA3ZlxcdTIwOTAtXFx1MjA5Y1xcdTIxMDJcXHUyMTA3XFx1MjEwYS1cXHUyMTEzXFx1MjExNVxcdTIxMTktXFx1MjExZFxcdTIxMjRcXHUyMTI2XFx1MjEyOFxcdTIxMmEtXFx1MjEyZFxcdTIxMmYtXFx1MjEzOVxcdTIxM2MtXFx1MjEzZlxcdTIxNDUtXFx1MjE0OVxcdTIxNGVcXHUyMTYwLVxcdTIxODhcXHUyNEI2LVxcdTI0RTlcXHUyYzAwLVxcdTJjMmVcXHUyYzMwLVxcdTJjNWVcXHUyYzYwLVxcdTJjZTRcXHUyY2ViLVxcdTJjZWVcXHUyZDAwLVxcdTJkMjVcXHUyZDMwLVxcdTJkNjVcXHUyZDZmXFx1MmQ4MC1cXHUyZDk2XFx1MmRhMC1cXHUyZGE2XFx1MmRhOC1cXHUyZGFlXFx1MmRiMC1cXHUyZGI2XFx1MmRiOC1cXHUyZGJlXFx1MmRjMC1cXHUyZGM2XFx1MmRjOC1cXHUyZGNlXFx1MmRkMC1cXHUyZGQ2XFx1MmRkOC1cXHUyZGRlXFx1MmUyZlxcdTMwMDVcXHUzMDNiXFx1MzAzY1xcdTMxMDUtXFx1MzEyZFxcdTMxMzEtXFx1MzE4ZVxcdTMxYTAtXFx1MzFiYVxcdWEwMDAtXFx1YTQ4Y1xcdWE0ZDAtXFx1YTRmZFxcdWE1MDAtXFx1YTYwY1xcdWE2MTAtXFx1YTYxZlxcdWE2MmFcXHVhNjJiXFx1YTY0MC1cXHVhNjZlXFx1YTY3Zi1cXHVhNjk3XFx1YTZhMC1cXHVhNmVmXFx1YTcxNy1cXHVhNzFmXFx1YTcyMi1cXHVhNzg4XFx1YTc4Yi1cXHVhNzhlXFx1YTc5MFxcdWE3OTFcXHVhN2EwLVxcdWE3YTlcXHVhN2ZhLVxcdWE4MDFcXHVhODAzLVxcdWE4MDVcXHVhODA3LVxcdWE4MGFcXHVhODBjLVxcdWE4MjJcXHVhODQwLVxcdWE4NzNcXHVhODgyLVxcdWE4YjNcXHVhOGYyLVxcdWE4ZjdcXHVhOGZiXFx1YTkwYS1cXHVhOTI1XFx1YTkzMC1cXHVhOTQ2XFx1YTk2MC1cXHVhOTdjXFx1YTk4NC1cXHVhOWIyXFx1YTljZlxcdWFhMDAtXFx1YWEyOFxcdWFhNDAtXFx1YWE0MlxcdWFhNDQtXFx1YWE0YlxcdWFiMDEtXFx1YWIwNlxcdWFiMDktXFx1YWIwZVxcdWFiMTEtXFx1YWIxNlxcdWFiMjAtXFx1YWIyNlxcdWFiMjgtXFx1YWIyZVxcdWFiYzAtXFx1YWJlMlxcdWFjMDAtXFx1ZDdhM1xcdWQ3YjAtXFx1ZDdjNlxcdWQ3Y2ItXFx1ZDdmYlxcdWZiMDAtXFx1ZmIwNlxcdWZiMTMtXFx1ZmIxN1xcdWZiMWRcXHVmYjFmLVxcdWZiMjhcXHVmYjJhLVxcdWZiMzZcXHVmYjM4LVxcdWZiM2NcXHVmYjNlXFx1ZmI0MFxcdWZiNDFcXHVmYjQzXFx1ZmI0NFxcdWZiNDYtXFx1ZmJiMVxcdWZiZDMtXFx1ZmQzZFxcdWZkNTAtXFx1ZmQ4ZlxcdWZkOTItXFx1ZmRjN1xcdWZkZjAtXFx1ZmRmYlxcdWZlNzAtXFx1ZmU3NFxcdWZlNzYtXFx1ZmVmY1xcdWZmMjEtXFx1ZmYzYVxcdWZmNDEtXFx1ZmY1YVxcdWZmYTAtXFx1ZmZiZVxcdWZmYzItXFx1ZmZjN1xcdWZmY2EtXFx1ZmZjZlxcdWZmZDItXFx1ZmZkN1xcdWZmZGEtXFx1ZmZkY10nLFxuICAgICAgbWlkbnVtbGV0OiAnWy1cXCdcXFxcLlxcdTIwMThcXHUyMDE5XFx1MjAyNFxcdUZFNTJcXHVGRjA3XFx1RkYwRV0nLFxuICAgICAgbWlkbGV0dGVyOiAnWzpcXHhCN1xceEI3XFx1MDVGNFxcdTIwMjdcXHVGRTEzXFx1RkU1NVxcdUZGMUFdJyxcbiAgICAgIG1pZG51bTogJ1tcXHhCMSsqLyw7O1xcdTA1ODlcXHUwNjBDXFx1MDYwRFxcdTA2NkNcXHUwN0Y4XFx1MjA0NFxcdUZFMTBcXHVGRTE0XFx1RkU1MFxcdUZFNTRcXHVGRjBDXFx1RkYxQl0nLFxuICAgICAgbnVtZXJpYzogJ1swLTlcXHUwNjYwLVxcdTA2NjlcXHUwNjZCXFx1MDZmMC1cXHUwNmY5XFx1MDdjMC1cXHUwN2M5XFx1MDk2Ni1cXHUwOTZmXFx1MDllNi1cXHUwOWVmXFx1MGE2Ni1cXHUwYTZmXFx1MGFlNi1cXHUwYWVmXFx1MGI2Ni1cXHUwYjZmXFx1MGJlNi1cXHUwYmVmXFx1MGM2Ni1cXHUwYzZmXFx1MGNlNi1cXHUwY2VmXFx1MGQ2Ni1cXHUwZDZmXFx1MGU1MC1cXHUwZTU5XFx1MGVkMC1cXHUwZWQ5XFx1MGYyMC1cXHUwZjI5XFx1MTA0MC1cXHUxMDQ5XFx1MTA5MC1cXHUxMDk5XFx1MTdlMC1cXHUxN2U5XFx1MTgxMC1cXHUxODE5XFx1MTk0Ni1cXHUxOTRmXFx1MTlkMC1cXHUxOWQ5XFx1MWE4MC1cXHUxYTg5XFx1MWE5MC1cXHUxYTk5XFx1MWI1MC1cXHUxYjU5XFx1MWJiMC1cXHUxYmI5XFx1MWM0MC1cXHUxYzQ5XFx1MWM1MC1cXHUxYzU5XFx1YTYyMC1cXHVhNjI5XFx1YThkMC1cXHVhOGQ5XFx1YTkwMC1cXHVhOTA5XFx1YTlkMC1cXHVhOWQ5XFx1YWE1MC1cXHVhYTU5XFx1YWJmMC1cXHVhYmY5XScsXG4gICAgICBjcjogJ1xcXFxyJyxcbiAgICAgIGxmOiAnXFxcXG4nLFxuICAgICAgbmV3bGluZTogJ1tcXHgwQlxcZlxceDg1XFx1MjAyOFxcdTIwMjldJyxcbiAgICAgIGV4dGVuZDogJ1tcXHUwMzAwLVxcdTAzNmZcXHUwNDgzLVxcdTA0ODlcXHUwNTkxLVxcdTA1YmRcXHUwNWJmXFx1MDVjMVxcdTA1YzJcXHUwNWM0XFx1MDVjNVxcdTA1YzdcXHUwNjEwLVxcdTA2MWFcXHUwNjRiLVxcdTA2NWZcXHUwNjcwXFx1MDZkNi1cXHUwNmRjXFx1MDZkZi1cXHUwNmU0XFx1MDZlN1xcdTA2ZThcXHUwNmVhLVxcdTA2ZWRcXHUwNzExXFx1MDczMC1cXHUwNzRhXFx1MDdhNi1cXHUwN2IwXFx1MDdlYi1cXHUwN2YzXFx1MDgxNi1cXHUwODE5XFx1MDgxYi1cXHUwODIzXFx1MDgyNS1cXHUwODI3XFx1MDgyOS1cXHUwODJkXFx1MDg1OS1cXHUwODViXFx1MDkwMC1cXHUwOTAzXFx1MDkzYS1cXHUwOTNjXFx1MDkzZS1cXHUwOTRmXFx1MDk1MS1cXHUwOTU3XFx1MDk2MlxcdTA5NjNcXHUwOTgxLVxcdTA5ODNcXHUwOWJjXFx1MDliZS1cXHUwOWM0XFx1MDljN1xcdTA5YzhcXHUwOWNiLVxcdTA5Y2RcXHUwOWQ3XFx1MDllMlxcdTA5ZTNcXHUwYTAxLVxcdTBhMDNcXHUwYTNjXFx1MGEzZS1cXHUwYTQyXFx1MGE0N1xcdTBhNDhcXHUwYTRiLVxcdTBhNGRcXHUwYTUxXFx1MGE3MFxcdTBhNzFcXHUwYTc1XFx1MGE4MS1cXHUwYTgzXFx1MGFiY1xcdTBhYmUtXFx1MGFjNVxcdTBhYzctXFx1MGFjOVxcdTBhY2ItXFx1MGFjZFxcdTBhZTJcXHUwYWUzXFx1MGIwMS1cXHUwYjAzXFx1MGIzY1xcdTBiM2UtXFx1MGI0NFxcdTBiNDdcXHUwYjQ4XFx1MGI0Yi1cXHUwYjRkXFx1MGI1NlxcdTBiNTdcXHUwYjYyXFx1MGI2M1xcdTBiODJcXHUwYmJlLVxcdTBiYzJcXHUwYmM2LVxcdTBiYzhcXHUwYmNhLVxcdTBiY2RcXHUwYmQ3XFx1MGMwMS1cXHUwYzAzXFx1MGMzZS1cXHUwYzQ0XFx1MGM0Ni1cXHUwYzQ4XFx1MGM0YS1cXHUwYzRkXFx1MGM1NVxcdTBjNTZcXHUwYzYyXFx1MGM2M1xcdTBjODJcXHUwYzgzXFx1MGNiY1xcdTBjYmUtXFx1MGNjNFxcdTBjYzYtXFx1MGNjOFxcdTBjY2EtXFx1MGNjZFxcdTBjZDVcXHUwY2Q2XFx1MGNlMlxcdTBjZTNcXHUwZDAyXFx1MGQwM1xcdTBkM2UtXFx1MGQ0NFxcdTBkNDYtXFx1MGQ0OFxcdTBkNGEtXFx1MGQ0ZFxcdTBkNTdcXHUwZDYyXFx1MGQ2M1xcdTBkODJcXHUwZDgzXFx1MGRjYVxcdTBkY2YtXFx1MGRkNFxcdTBkZDZcXHUwZGQ4LVxcdTBkZGZcXHUwZGYyXFx1MGRmM1xcdTBlMzFcXHUwZTM0LVxcdTBlM2FcXHUwZTQ3LVxcdTBlNGVcXHUwZWIxXFx1MGViNC1cXHUwZWI5XFx1MGViYlxcdTBlYmNcXHUwZWM4LVxcdTBlY2RcXHUwZjE4XFx1MGYxOVxcdTBmMzVcXHUwZjM3XFx1MGYzOVxcdTBmM2VcXHUwZjNmXFx1MGY3MS1cXHUwZjg0XFx1MGY4NlxcdTBmODdcXHUwZjhkLVxcdTBmOTdcXHUwZjk5LVxcdTBmYmNcXHUwZmM2XFx1MTAyYi1cXHUxMDNlXFx1MTA1Ni1cXHUxMDU5XFx1MTA1ZS1cXHUxMDYwXFx1MTA2Mi1cXHUxMDY0XFx1MTA2Ny1cXHUxMDZkXFx1MTA3MS1cXHUxMDc0XFx1MTA4Mi1cXHUxMDhkXFx1MTA4ZlxcdTEwOWEtXFx1MTA5ZFxcdTEzNWQtXFx1MTM1ZlxcdTE3MTItXFx1MTcxNFxcdTE3MzItXFx1MTczNFxcdTE3NTJcXHUxNzUzXFx1MTc3MlxcdTE3NzNcXHUxN2I2LVxcdTE3ZDNcXHUxN2RkXFx1MTgwYi1cXHUxODBkXFx1MThhOVxcdTE5MjAtXFx1MTkyYlxcdTE5MzAtXFx1MTkzYlxcdTE5YjAtXFx1MTljMFxcdTE5YzhcXHUxOWM5XFx1MWExNy1cXHUxYTFiXFx1MWE1NS1cXHUxYTVlXFx1MWE2MC1cXHUxYTdjXFx1MWE3ZlxcdTFiMDAtXFx1MWIwNFxcdTFiMzQtXFx1MWI0NFxcdTFiNmItXFx1MWI3M1xcdTFiODAtXFx1MWI4MlxcdTFiYTEtXFx1MWJhYVxcdTFiZTYtXFx1MWJmM1xcdTFjMjQtXFx1MWMzN1xcdTFjZDAtXFx1MWNkMlxcdTFjZDQtXFx1MWNlOFxcdTFjZWRcXHUxY2YyXFx1MWRjMC1cXHUxZGU2XFx1MWRmYy1cXHUxZGZmXFx1MjAwY1xcdTIwMGRcXHUyMGQwLVxcdTIwZjBcXHUyY2VmLVxcdTJjZjFcXHUyZDdmXFx1MmRlMC1cXHUyZGZmXFx1MzAyYS1cXHUzMDJmXFx1MzA5OVxcdTMwOWFcXHVhNjZmLVxcdUE2NzJcXHVhNjdjXFx1YTY3ZFxcdWE2ZjBcXHVhNmYxXFx1YTgwMlxcdWE4MDZcXHVhODBiXFx1YTgyMy1cXHVhODI3XFx1YTg4MFxcdWE4ODFcXHVhOGI0LVxcdWE4YzRcXHVhOGUwLVxcdWE4ZjFcXHVhOTI2LVxcdWE5MmRcXHVhOTQ3LVxcdWE5NTNcXHVhOTgwLVxcdWE5ODNcXHVhOWIzLVxcdWE5YzBcXHVhYTI5LVxcdWFhMzZcXHVhYTQzXFx1YWE0Y1xcdWFhNGRcXHVhYTdiXFx1YWFiMFxcdWFhYjItXFx1YWFiNFxcdWFhYjdcXHVhYWI4XFx1YWFiZVxcdWFhYmZcXHVhYWMxXFx1YWJlMy1cXHVhYmVhXFx1YWJlY1xcdWFiZWRcXHVmYjFlXFx1ZmUwMC1cXHVmZTBmXFx1ZmUyMC1cXHVmZTI2XFx1ZmY5ZVxcdWZmOWZdJyxcbiAgICAgIGZvcm1hdDogJ1tcXHhBRFxcdTA2MDAtXFx1MDYwM1xcdTA2RERcXHUwNzBGXFx1MTdiNFxcdTE3YjVcXHUyMDBFXFx1MjAwRlxcdTIwMkEtXFx1MjAyRVxcdTIwNjAtXFx1MjA2NFxcdTIwNkEtXFx1MjA2RlxcdUZFRkZcXHVGRkY5LVxcdUZGRkJdJyxcbiAgICAgIGthdGFrYW5hOiAnW1xcdTMwMzEtXFx1MzAzNVxcdTMwOUJcXHUzMDlDXFx1MzBBMC1cXHUzMGZhXFx1MzBmYy1cXHUzMGZmXFx1MzFmMC1cXHUzMWZmXFx1MzJEMC1cXHUzMkZFXFx1MzMwMC1cXHUzMzU3XFx1ZmY2Ni1cXHVmZjlkXScsXG4gICAgICBleHRlbmRudW1sZXQ6ICdbPV9cXHUyMDNmXFx1MjA0MFxcdTIwNTRcXHVmZTMzXFx1ZmUzNFxcdWZlNGQtXFx1ZmU0ZlxcdWZmM2ZcXHUyMjAwLVxcdTIyRkY8Pl0nLFxuICAgICAgcHVuY3R1YXRpb246IHB1bmN0dWF0aW9uU3RyXG4gICAgfTtcbiAgICB2YXIgY2hhcmFjdGVySW5kaWNlcyA9IHtcbiAgICAgIEFMRVRURVI6IDAsXG4gICAgICBNSUROVU1MRVQ6IDEsXG4gICAgICBNSURMRVRURVI6IDIsXG4gICAgICBNSUROVU06IDMsXG4gICAgICBOVU1FUklDOiA0LFxuICAgICAgQ1I6IDUsXG4gICAgICBMRjogNixcbiAgICAgIE5FV0xJTkU6IDcsXG4gICAgICBFWFRFTkQ6IDgsXG4gICAgICBGT1JNQVQ6IDksXG4gICAgICBLQVRBS0FOQTogMTAsXG4gICAgICBFWFRFTkROVU1MRVQ6IDExLFxuICAgICAgQVQ6IDEyLFxuICAgICAgT1RIRVI6IDEzXG4gICAgfTtcbiAgICB2YXIgU0VUUyA9IFtcbiAgICAgIG5ldyBSZWdFeHAocmVnRXhwcy5hbGV0dGVyKSxcbiAgICAgIG5ldyBSZWdFeHAocmVnRXhwcy5taWRudW1sZXQpLFxuICAgICAgbmV3IFJlZ0V4cChyZWdFeHBzLm1pZGxldHRlciksXG4gICAgICBuZXcgUmVnRXhwKHJlZ0V4cHMubWlkbnVtKSxcbiAgICAgIG5ldyBSZWdFeHAocmVnRXhwcy5udW1lcmljKSxcbiAgICAgIG5ldyBSZWdFeHAocmVnRXhwcy5jciksXG4gICAgICBuZXcgUmVnRXhwKHJlZ0V4cHMubGYpLFxuICAgICAgbmV3IFJlZ0V4cChyZWdFeHBzLm5ld2xpbmUpLFxuICAgICAgbmV3IFJlZ0V4cChyZWdFeHBzLmV4dGVuZCksXG4gICAgICBuZXcgUmVnRXhwKHJlZ0V4cHMuZm9ybWF0KSxcbiAgICAgIG5ldyBSZWdFeHAocmVnRXhwcy5rYXRha2FuYSksXG4gICAgICBuZXcgUmVnRXhwKHJlZ0V4cHMuZXh0ZW5kbnVtbGV0KSxcbiAgICAgIG5ldyBSZWdFeHAoJ0AnKVxuICAgIF07XG4gICAgdmFyIEVNUFRZX1NUUklORyA9ICcnO1xuICAgIHZhciBQVU5DVFVBVElPTiA9IG5ldyBSZWdFeHAoJ14nICsgcmVnRXhwcy5wdW5jdHVhdGlvbiArICckJyk7XG4gICAgdmFyIFdISVRFU1BBQ0UgPSAvXlxccyskLztcblxuICAgIHZhciBtYXAgPSBmdW5jdGlvbiAoeHMsIGYpIHtcbiAgICAgIHZhciBsZW4gPSB4cy5sZW5ndGg7XG4gICAgICB2YXIgciA9IG5ldyBBcnJheShsZW4pO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgeCA9IHhzW2ldO1xuICAgICAgICByW2ldID0gZih4LCBpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByO1xuICAgIH07XG5cbiAgICB2YXIgU0VUUyQxID0gU0VUUztcbiAgICB2YXIgT1RIRVIgPSBjaGFyYWN0ZXJJbmRpY2VzLk9USEVSO1xuICAgIHZhciBnZXRUeXBlID0gZnVuY3Rpb24gKGNoYXIpIHtcbiAgICAgIHZhciB0eXBlID0gT1RIRVI7XG4gICAgICB2YXIgc2V0c0xlbmd0aCA9IFNFVFMkMS5sZW5ndGg7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNldHNMZW5ndGg7ICsraikge1xuICAgICAgICB2YXIgc2V0ID0gU0VUUyQxW2pdO1xuICAgICAgICBpZiAoc2V0ICYmIHNldC50ZXN0KGNoYXIpKSB7XG4gICAgICAgICAgdHlwZSA9IGo7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0eXBlO1xuICAgIH07XG4gICAgdmFyIG1lbW9pemUgPSBmdW5jdGlvbiAoZnVuYykge1xuICAgICAgdmFyIGNhY2hlID0ge307XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGNoYXIpIHtcbiAgICAgICAgaWYgKGNhY2hlW2NoYXJdKSB7XG4gICAgICAgICAgcmV0dXJuIGNhY2hlW2NoYXJdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciByZXN1bHQgPSBmdW5jKGNoYXIpO1xuICAgICAgICAgIGNhY2hlW2NoYXJdID0gcmVzdWx0O1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgY2xhc3NpZnkgPSBmdW5jdGlvbiAoY2hhcmFjdGVycykge1xuICAgICAgdmFyIG1lbW9pemVkID0gbWVtb2l6ZShnZXRUeXBlKTtcbiAgICAgIHJldHVybiBtYXAoY2hhcmFjdGVycywgbWVtb2l6ZWQpO1xuICAgIH07XG5cbiAgICB2YXIgaXNXb3JkQm91bmRhcnkgPSBmdW5jdGlvbiAobWFwLCBpbmRleCkge1xuICAgICAgdmFyIHR5cGUgPSBtYXBbaW5kZXhdO1xuICAgICAgdmFyIG5leHRUeXBlID0gbWFwW2luZGV4ICsgMV07XG4gICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gbWFwLmxlbmd0aCAtIDEgJiYgaW5kZXggIT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGUgPT09IGNoYXJhY3RlckluZGljZXMuQUxFVFRFUiAmJiBuZXh0VHlwZSA9PT0gY2hhcmFjdGVySW5kaWNlcy5BTEVUVEVSKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHZhciBuZXh0TmV4dFR5cGUgPSBtYXBbaW5kZXggKyAyXTtcbiAgICAgIGlmICh0eXBlID09PSBjaGFyYWN0ZXJJbmRpY2VzLkFMRVRURVIgJiYgKG5leHRUeXBlID09PSBjaGFyYWN0ZXJJbmRpY2VzLk1JRExFVFRFUiB8fCBuZXh0VHlwZSA9PT0gY2hhcmFjdGVySW5kaWNlcy5NSUROVU1MRVQgfHwgbmV4dFR5cGUgPT09IGNoYXJhY3RlckluZGljZXMuQVQpICYmIG5leHROZXh0VHlwZSA9PT0gY2hhcmFjdGVySW5kaWNlcy5BTEVUVEVSKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHZhciBwcmV2VHlwZSA9IG1hcFtpbmRleCAtIDFdO1xuICAgICAgaWYgKCh0eXBlID09PSBjaGFyYWN0ZXJJbmRpY2VzLk1JRExFVFRFUiB8fCB0eXBlID09PSBjaGFyYWN0ZXJJbmRpY2VzLk1JRE5VTUxFVCB8fCBuZXh0VHlwZSA9PT0gY2hhcmFjdGVySW5kaWNlcy5BVCkgJiYgbmV4dFR5cGUgPT09IGNoYXJhY3RlckluZGljZXMuQUxFVFRFUiAmJiBwcmV2VHlwZSA9PT0gY2hhcmFjdGVySW5kaWNlcy5BTEVUVEVSKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICgodHlwZSA9PT0gY2hhcmFjdGVySW5kaWNlcy5OVU1FUklDIHx8IHR5cGUgPT09IGNoYXJhY3RlckluZGljZXMuQUxFVFRFUikgJiYgKG5leHRUeXBlID09PSBjaGFyYWN0ZXJJbmRpY2VzLk5VTUVSSUMgfHwgbmV4dFR5cGUgPT09IGNoYXJhY3RlckluZGljZXMuQUxFVFRFUikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCh0eXBlID09PSBjaGFyYWN0ZXJJbmRpY2VzLk1JRE5VTSB8fCB0eXBlID09PSBjaGFyYWN0ZXJJbmRpY2VzLk1JRE5VTUxFVCkgJiYgbmV4dFR5cGUgPT09IGNoYXJhY3RlckluZGljZXMuTlVNRVJJQyAmJiBwcmV2VHlwZSA9PT0gY2hhcmFjdGVySW5kaWNlcy5OVU1FUklDKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlID09PSBjaGFyYWN0ZXJJbmRpY2VzLk5VTUVSSUMgJiYgKG5leHRUeXBlID09PSBjaGFyYWN0ZXJJbmRpY2VzLk1JRE5VTSB8fCBuZXh0VHlwZSA9PT0gY2hhcmFjdGVySW5kaWNlcy5NSUROVU1MRVQpICYmIG5leHROZXh0VHlwZSA9PT0gY2hhcmFjdGVySW5kaWNlcy5OVU1FUklDKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlID09PSBjaGFyYWN0ZXJJbmRpY2VzLkVYVEVORCB8fCB0eXBlID09PSBjaGFyYWN0ZXJJbmRpY2VzLkZPUk1BVCB8fCBwcmV2VHlwZSA9PT0gY2hhcmFjdGVySW5kaWNlcy5FWFRFTkQgfHwgcHJldlR5cGUgPT09IGNoYXJhY3RlckluZGljZXMuRk9STUFUIHx8IG5leHRUeXBlID09PSBjaGFyYWN0ZXJJbmRpY2VzLkVYVEVORCB8fCBuZXh0VHlwZSA9PT0gY2hhcmFjdGVySW5kaWNlcy5GT1JNQVQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGUgPT09IGNoYXJhY3RlckluZGljZXMuQ1IgJiYgbmV4dFR5cGUgPT09IGNoYXJhY3RlckluZGljZXMuTEYpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGUgPT09IGNoYXJhY3RlckluZGljZXMuTkVXTElORSB8fCB0eXBlID09PSBjaGFyYWN0ZXJJbmRpY2VzLkNSIHx8IHR5cGUgPT09IGNoYXJhY3RlckluZGljZXMuTEYpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBpZiAobmV4dFR5cGUgPT09IGNoYXJhY3RlckluZGljZXMuTkVXTElORSB8fCBuZXh0VHlwZSA9PT0gY2hhcmFjdGVySW5kaWNlcy5DUiB8fCBuZXh0VHlwZSA9PT0gY2hhcmFjdGVySW5kaWNlcy5MRikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlID09PSBjaGFyYWN0ZXJJbmRpY2VzLktBVEFLQU5BICYmIG5leHRUeXBlID09PSBjaGFyYWN0ZXJJbmRpY2VzLktBVEFLQU5BKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChuZXh0VHlwZSA9PT0gY2hhcmFjdGVySW5kaWNlcy5FWFRFTkROVU1MRVQgJiYgKHR5cGUgPT09IGNoYXJhY3RlckluZGljZXMuQUxFVFRFUiB8fCB0eXBlID09PSBjaGFyYWN0ZXJJbmRpY2VzLk5VTUVSSUMgfHwgdHlwZSA9PT0gY2hhcmFjdGVySW5kaWNlcy5LQVRBS0FOQSB8fCB0eXBlID09PSBjaGFyYWN0ZXJJbmRpY2VzLkVYVEVORE5VTUxFVCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGUgPT09IGNoYXJhY3RlckluZGljZXMuRVhURU5ETlVNTEVUICYmIChuZXh0VHlwZSA9PT0gY2hhcmFjdGVySW5kaWNlcy5BTEVUVEVSIHx8IG5leHRUeXBlID09PSBjaGFyYWN0ZXJJbmRpY2VzLk5VTUVSSUMgfHwgbmV4dFR5cGUgPT09IGNoYXJhY3RlckluZGljZXMuS0FUQUtBTkEpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlID09PSBjaGFyYWN0ZXJJbmRpY2VzLkFUKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICB2YXIgRU1QVFlfU1RSSU5HJDEgPSBFTVBUWV9TVFJJTkc7XG4gICAgdmFyIFdISVRFU1BBQ0UkMSA9IFdISVRFU1BBQ0U7XG4gICAgdmFyIFBVTkNUVUFUSU9OJDEgPSBQVU5DVFVBVElPTjtcbiAgICB2YXIgaXNQcm90b2NvbCA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgIHJldHVybiBzdHIgPT09ICdodHRwJyB8fCBzdHIgPT09ICdodHRwcyc7XG4gICAgfTtcbiAgICB2YXIgZmluZFdvcmRFbmQgPSBmdW5jdGlvbiAoY2hhcmFjdGVycywgc3RhcnRJbmRleCkge1xuICAgICAgdmFyIGk7XG4gICAgICBmb3IgKGkgPSBzdGFydEluZGV4OyBpIDwgY2hhcmFjdGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoV0hJVEVTUEFDRSQxLnRlc3QoY2hhcmFjdGVyc1tpXSkpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGk7XG4gICAgfTtcbiAgICB2YXIgZmluZFVybEVuZCA9IGZ1bmN0aW9uIChjaGFyYWN0ZXJzLCBzdGFydEluZGV4KSB7XG4gICAgICB2YXIgZW5kSW5kZXggPSBmaW5kV29yZEVuZChjaGFyYWN0ZXJzLCBzdGFydEluZGV4ICsgMSk7XG4gICAgICB2YXIgcGVha2VkV29yZCA9IGNoYXJhY3RlcnMuc2xpY2Uoc3RhcnRJbmRleCArIDEsIGVuZEluZGV4KS5qb2luKEVNUFRZX1NUUklORyQxKTtcbiAgICAgIHJldHVybiBwZWFrZWRXb3JkLnN1YnN0cigwLCAzKSA9PT0gJzovLycgPyBlbmRJbmRleCA6IHN0YXJ0SW5kZXg7XG4gICAgfTtcbiAgICB2YXIgZmluZFdvcmRzID0gZnVuY3Rpb24gKGNoYXJzLCBzQ2hhcnMsIGNoYXJhY3Rlck1hcCwgb3B0aW9ucykge1xuICAgICAgdmFyIHdvcmRzID0gW107XG4gICAgICB2YXIgd29yZCA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFyYWN0ZXJNYXAubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgd29yZC5wdXNoKGNoYXJzW2ldKTtcbiAgICAgICAgaWYgKGlzV29yZEJvdW5kYXJ5KGNoYXJhY3Rlck1hcCwgaSkpIHtcbiAgICAgICAgICB2YXIgY2ggPSBzQ2hhcnNbaV07XG4gICAgICAgICAgaWYgKChvcHRpb25zLmluY2x1ZGVXaGl0ZXNwYWNlIHx8ICFXSElURVNQQUNFJDEudGVzdChjaCkpICYmIChvcHRpb25zLmluY2x1ZGVQdW5jdHVhdGlvbiB8fCAhUFVOQ1RVQVRJT04kMS50ZXN0KGNoKSkpIHtcbiAgICAgICAgICAgIHZhciBzdGFydE9mV29yZCA9IGkgLSB3b3JkLmxlbmd0aCArIDE7XG4gICAgICAgICAgICB2YXIgZW5kT2ZXb3JkID0gaSArIDE7XG4gICAgICAgICAgICB2YXIgc3RyID0gc0NoYXJzLnNsaWNlKHN0YXJ0T2ZXb3JkLCBlbmRPZldvcmQpLmpvaW4oRU1QVFlfU1RSSU5HJDEpO1xuICAgICAgICAgICAgaWYgKGlzUHJvdG9jb2woc3RyKSkge1xuICAgICAgICAgICAgICB2YXIgZW5kT2ZVcmwgPSBmaW5kVXJsRW5kKHNDaGFycywgaSk7XG4gICAgICAgICAgICAgIHZhciB1cmwgPSBjaGFycy5zbGljZShlbmRPZldvcmQsIGVuZE9mVXJsKTtcbiAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkod29yZCwgdXJsKTtcbiAgICAgICAgICAgICAgaSA9IGVuZE9mVXJsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd29yZHMucHVzaCh3b3JkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgd29yZCA9IFtdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gd29yZHM7XG4gICAgfTtcbiAgICB2YXIgZ2V0RGVmYXVsdE9wdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpbmNsdWRlV2hpdGVzcGFjZTogZmFsc2UsXG4gICAgICAgIGluY2x1ZGVQdW5jdHVhdGlvbjogZmFsc2VcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgZ2V0V29yZHMgPSBmdW5jdGlvbiAoY2hhcnMsIGV4dHJhY3QsIG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZ2V0RGVmYXVsdE9wdGlvbnMoKSksIG9wdGlvbnMpO1xuICAgICAgdmFyIGZpbHRlcmVkQ2hhcnMgPSBbXTtcbiAgICAgIHZhciBleHRyYWN0ZWRDaGFycyA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2ggPSBleHRyYWN0KGNoYXJzW2ldKTtcbiAgICAgICAgaWYgKGNoICE9PSB6ZXJvV2lkdGgpIHtcbiAgICAgICAgICBmaWx0ZXJlZENoYXJzLnB1c2goY2hhcnNbaV0pO1xuICAgICAgICAgIGV4dHJhY3RlZENoYXJzLnB1c2goY2gpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgY2hhcmFjdGVyTWFwID0gY2xhc3NpZnkoZXh0cmFjdGVkQ2hhcnMpO1xuICAgICAgcmV0dXJuIGZpbmRXb3JkcyhmaWx0ZXJlZENoYXJzLCBleHRyYWN0ZWRDaGFycywgY2hhcmFjdGVyTWFwLCBvcHRpb25zKTtcbiAgICB9O1xuXG4gICAgdmFyIGdldFdvcmRzJDEgPSBnZXRXb3JkcztcblxuICAgIHZhciBnbG9iYWwkMSA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLmRvbS5UcmVlV2Fsa2VyJyk7XG5cbiAgICB2YXIgZ2V0VGV4dCA9IGZ1bmN0aW9uIChub2RlLCBzY2hlbWEpIHtcbiAgICAgIHZhciBibG9ja0VsZW1lbnRzID0gc2NoZW1hLmdldEJsb2NrRWxlbWVudHMoKTtcbiAgICAgIHZhciBzaG9ydEVuZGVkRWxlbWVudHMgPSBzY2hlbWEuZ2V0U2hvcnRFbmRlZEVsZW1lbnRzKCk7XG4gICAgICB2YXIgaXNOZXdsaW5lID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIGJsb2NrRWxlbWVudHNbbm9kZS5ub2RlTmFtZV0gfHwgc2hvcnRFbmRlZEVsZW1lbnRzW25vZGUubm9kZU5hbWVdO1xuICAgICAgfTtcbiAgICAgIHZhciB0ZXh0QmxvY2tzID0gW107XG4gICAgICB2YXIgdHh0ID0gJyc7XG4gICAgICB2YXIgdHJlZVdhbGtlciA9IG5ldyBnbG9iYWwkMShub2RlLCBub2RlKTtcbiAgICAgIHdoaWxlIChub2RlID0gdHJlZVdhbGtlci5uZXh0KCkpIHtcbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgICB0eHQgKz0gcmVtb3ZlWndzcChub2RlLmRhdGEpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzTmV3bGluZShub2RlKSAmJiB0eHQubGVuZ3RoKSB7XG4gICAgICAgICAgdGV4dEJsb2Nrcy5wdXNoKHR4dCk7XG4gICAgICAgICAgdHh0ID0gJyc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0eHQubGVuZ3RoKSB7XG4gICAgICAgIHRleHRCbG9ja3MucHVzaCh0eHQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRleHRCbG9ja3M7XG4gICAgfTtcblxuICAgIHZhciBzdHJMZW4gPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1tcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl0vZywgJ18nKS5sZW5ndGg7XG4gICAgfTtcbiAgICB2YXIgY291bnRXb3JkcyA9IGZ1bmN0aW9uIChub2RlLCBzY2hlbWEpIHtcbiAgICAgIHZhciB0ZXh0ID0gZ2V0VGV4dChub2RlLCBzY2hlbWEpLmpvaW4oJ1xcbicpO1xuICAgICAgcmV0dXJuIGdldFdvcmRzJDEodGV4dC5zcGxpdCgnJyksIGlkZW50aXR5KS5sZW5ndGg7XG4gICAgfTtcbiAgICB2YXIgY291bnRDaGFyYWN0ZXJzID0gZnVuY3Rpb24gKG5vZGUsIHNjaGVtYSkge1xuICAgICAgdmFyIHRleHQgPSBnZXRUZXh0KG5vZGUsIHNjaGVtYSkuam9pbignJyk7XG4gICAgICByZXR1cm4gc3RyTGVuKHRleHQpO1xuICAgIH07XG4gICAgdmFyIGNvdW50Q2hhcmFjdGVyc1dpdGhvdXRTcGFjZXMgPSBmdW5jdGlvbiAobm9kZSwgc2NoZW1hKSB7XG4gICAgICB2YXIgdGV4dCA9IGdldFRleHQobm9kZSwgc2NoZW1hKS5qb2luKCcnKS5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgICAgcmV0dXJuIHN0ckxlbih0ZXh0KTtcbiAgICB9O1xuXG4gICAgdmFyIGNyZWF0ZUJvZHlDb3VudGVyID0gZnVuY3Rpb24gKGVkaXRvciwgY291bnQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjb3VudChlZGl0b3IuZ2V0Qm9keSgpLCBlZGl0b3Iuc2NoZW1hKTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgY3JlYXRlU2VsZWN0aW9uQ291bnRlciA9IGZ1bmN0aW9uIChlZGl0b3IsIGNvdW50KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY291bnQoZWRpdG9yLnNlbGVjdGlvbi5nZXRSbmcoKS5jbG9uZUNvbnRlbnRzKCksIGVkaXRvci5zY2hlbWEpO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBjcmVhdGVCb2R5V29yZENvdW50ZXIgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gY3JlYXRlQm9keUNvdW50ZXIoZWRpdG9yLCBjb3VudFdvcmRzKTtcbiAgICB9O1xuICAgIHZhciBnZXQgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgZ2V0V29yZENvdW50OiBjcmVhdGVCb2R5V29yZENvdW50ZXIoZWRpdG9yKSxcbiAgICAgICAgICBnZXRDaGFyYWN0ZXJDb3VudDogY3JlYXRlQm9keUNvdW50ZXIoZWRpdG9yLCBjb3VudENoYXJhY3RlcnMpLFxuICAgICAgICAgIGdldENoYXJhY3RlckNvdW50V2l0aG91dFNwYWNlczogY3JlYXRlQm9keUNvdW50ZXIoZWRpdG9yLCBjb3VudENoYXJhY3RlcnNXaXRob3V0U3BhY2VzKVxuICAgICAgICB9LFxuICAgICAgICBzZWxlY3Rpb246IHtcbiAgICAgICAgICBnZXRXb3JkQ291bnQ6IGNyZWF0ZVNlbGVjdGlvbkNvdW50ZXIoZWRpdG9yLCBjb3VudFdvcmRzKSxcbiAgICAgICAgICBnZXRDaGFyYWN0ZXJDb3VudDogY3JlYXRlU2VsZWN0aW9uQ291bnRlcihlZGl0b3IsIGNvdW50Q2hhcmFjdGVycyksXG4gICAgICAgICAgZ2V0Q2hhcmFjdGVyQ291bnRXaXRob3V0U3BhY2VzOiBjcmVhdGVTZWxlY3Rpb25Db3VudGVyKGVkaXRvciwgY291bnRDaGFyYWN0ZXJzV2l0aG91dFNwYWNlcylcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Q291bnQ6IGNyZWF0ZUJvZHlXb3JkQ291bnRlcihlZGl0b3IpXG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgZ2xvYmFsJDIgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS51dGlsLkRlbGF5Jyk7XG5cbiAgICB2YXIgZmlyZVdvcmRDb3VudFVwZGF0ZSA9IGZ1bmN0aW9uIChlZGl0b3IsIGFwaSkge1xuICAgICAgZWRpdG9yLmZpcmUoJ3dvcmRDb3VudFVwZGF0ZScsIHtcbiAgICAgICAgd29yZENvdW50OiB7XG4gICAgICAgICAgd29yZHM6IGFwaS5ib2R5LmdldFdvcmRDb3VudCgpLFxuICAgICAgICAgIGNoYXJhY3RlcnM6IGFwaS5ib2R5LmdldENoYXJhY3RlckNvdW50KCksXG4gICAgICAgICAgY2hhcmFjdGVyc1dpdGhvdXRTcGFjZXM6IGFwaS5ib2R5LmdldENoYXJhY3RlckNvdW50V2l0aG91dFNwYWNlcygpXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgdXBkYXRlQ291bnQgPSBmdW5jdGlvbiAoZWRpdG9yLCBhcGkpIHtcbiAgICAgIGZpcmVXb3JkQ291bnRVcGRhdGUoZWRpdG9yLCBhcGkpO1xuICAgIH07XG4gICAgdmFyIHNldHVwID0gZnVuY3Rpb24gKGVkaXRvciwgYXBpLCBkZWxheSkge1xuICAgICAgdmFyIGRlYm91bmNlZFVwZGF0ZSA9IGdsb2JhbCQyLmRlYm91bmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHVwZGF0ZUNvdW50KGVkaXRvciwgYXBpKTtcbiAgICAgIH0sIGRlbGF5KTtcbiAgICAgIGVkaXRvci5vbignaW5pdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdXBkYXRlQ291bnQoZWRpdG9yLCBhcGkpO1xuICAgICAgICBnbG9iYWwkMi5zZXRFZGl0b3JUaW1lb3V0KGVkaXRvciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGVkaXRvci5vbignU2V0Q29udGVudCBCZWZvcmVBZGRVbmRvIFVuZG8gUmVkbyBrZXl1cCcsIGRlYm91bmNlZFVwZGF0ZSk7XG4gICAgICAgIH0sIDApO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBvcGVuID0gZnVuY3Rpb24gKGVkaXRvciwgYXBpKSB7XG4gICAgICBlZGl0b3Iud2luZG93TWFuYWdlci5vcGVuKHtcbiAgICAgICAgdGl0bGU6ICdXb3JkIENvdW50JyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIHR5cGU6ICdwYW5lbCcsXG4gICAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICAgIHR5cGU6ICd0YWJsZScsXG4gICAgICAgICAgICAgIGhlYWRlcjogW1xuICAgICAgICAgICAgICAgICdDb3VudCcsXG4gICAgICAgICAgICAgICAgJ0RvY3VtZW50JyxcbiAgICAgICAgICAgICAgICAnU2VsZWN0aW9uJ1xuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBjZWxsczogW1xuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICdXb3JkcycsXG4gICAgICAgICAgICAgICAgICBTdHJpbmcoYXBpLmJvZHkuZ2V0V29yZENvdW50KCkpLFxuICAgICAgICAgICAgICAgICAgU3RyaW5nKGFwaS5zZWxlY3Rpb24uZ2V0V29yZENvdW50KCkpXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAnQ2hhcmFjdGVycyAobm8gc3BhY2VzKScsXG4gICAgICAgICAgICAgICAgICBTdHJpbmcoYXBpLmJvZHkuZ2V0Q2hhcmFjdGVyQ291bnRXaXRob3V0U3BhY2VzKCkpLFxuICAgICAgICAgICAgICAgICAgU3RyaW5nKGFwaS5zZWxlY3Rpb24uZ2V0Q2hhcmFjdGVyQ291bnRXaXRob3V0U3BhY2VzKCkpXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAnQ2hhcmFjdGVycycsXG4gICAgICAgICAgICAgICAgICBTdHJpbmcoYXBpLmJvZHkuZ2V0Q2hhcmFjdGVyQ291bnQoKSksXG4gICAgICAgICAgICAgICAgICBTdHJpbmcoYXBpLnNlbGVjdGlvbi5nZXRDaGFyYWN0ZXJDb3VudCgpKVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSxcbiAgICAgICAgYnV0dG9uczogW3tcbiAgICAgICAgICAgIHR5cGU6ICdjYW5jZWwnLFxuICAgICAgICAgICAgbmFtZTogJ2Nsb3NlJyxcbiAgICAgICAgICAgIHRleHQ6ICdDbG9zZScsXG4gICAgICAgICAgICBwcmltYXJ5OiB0cnVlXG4gICAgICAgICAgfV1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgcmVnaXN0ZXIgPSBmdW5jdGlvbiAoZWRpdG9yLCBhcGkpIHtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRCdXR0b24oJ3dvcmRjb3VudCcsIHtcbiAgICAgICAgdG9vbHRpcDogJ1dvcmQgY291bnQnLFxuICAgICAgICBpY29uOiAnY2hhcmFjdGVyLWNvdW50JyxcbiAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gb3BlbihlZGl0b3IsIGFwaSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZE1lbnVJdGVtKCd3b3JkY291bnQnLCB7XG4gICAgICAgIHRleHQ6ICdXb3JkIGNvdW50JyxcbiAgICAgICAgaWNvbjogJ2NoYXJhY3Rlci1jb3VudCcsXG4gICAgICAgIG9uQWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIG9wZW4oZWRpdG9yLCBhcGkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gUGx1Z2luIChkZWxheSkge1xuICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHtcbiAgICAgICAgZGVsYXkgPSAzMDA7XG4gICAgICB9XG4gICAgICBnbG9iYWwuYWRkKCd3b3JkY291bnQnLCBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIHZhciBhcGkgPSBnZXQoZWRpdG9yKTtcbiAgICAgICAgcmVnaXN0ZXIoZWRpdG9yLCBhcGkpO1xuICAgICAgICBzZXR1cChlZGl0b3IsIGFwaSwgZGVsYXkpO1xuICAgICAgICByZXR1cm4gYXBpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgUGx1Z2luKCk7XG5cbn0oKSk7XG4iXSwic291cmNlUm9vdCI6IiJ9