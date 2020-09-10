(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~tinymce-plugin-textpattern~tinymce-plugin-textpattern-plugin"],{

/***/ "./node_modules/tinymce/plugins/textpattern/plugin.js":
/*!************************************************************!*\
  !*** ./node_modules/tinymce/plugins/textpattern/plugin.js ***!
  \************************************************************/
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

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

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
    function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++)
        s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
      return r;
    }

    var noop = function () {
    };
    var constant = function (value) {
      return function () {
        return value;
      };
    };
    var identity = function (x) {
      return x;
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
    var isString = isType('string');
    var isObject = isType('object');
    var isArray = isType('array');

    var nativeSlice = Array.prototype.slice;
    var nativeIndexOf = Array.prototype.indexOf;
    var rawIndexOf = function (ts, t) {
      return nativeIndexOf.call(ts, t);
    };
    var contains = function (xs, x) {
      return rawIndexOf(xs, x) > -1;
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
    var forall = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; ++i) {
        var x = xs[i];
        if (pred(x, i) !== true) {
          return false;
        }
      }
      return true;
    };
    var sort = function (xs, comparator) {
      var copy = nativeSlice.call(xs, 0);
      copy.sort(comparator);
      return copy;
    };
    var head = function (xs) {
      return xs.length === 0 ? Option.none() : Option.some(xs[0]);
    };

    var keys = Object.keys;
    var hasOwnProperty = Object.hasOwnProperty;
    var has = function (obj, key) {
      return hasOwnProperty.call(obj, key);
    };

    var generate = function (cases) {
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
    var Adt = { generate: generate };

    var comparison = Adt.generate([
      {
        bothErrors: [
          'error1',
          'error2'
        ]
      },
      {
        firstError: [
          'error1',
          'value2'
        ]
      },
      {
        secondError: [
          'value1',
          'error2'
        ]
      },
      {
        bothValues: [
          'value1',
          'value2'
        ]
      }
    ]);
    var partition = function (results) {
      var errors = [];
      var values = [];
      each(results, function (result) {
        result.fold(function (err) {
          errors.push(err);
        }, function (value) {
          values.push(value);
        });
      });
      return {
        errors: errors,
        values: values
      };
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

    var isInlinePattern = function (pattern) {
      return pattern.type === 'inline-command' || pattern.type === 'inline-format';
    };
    var isBlockPattern = function (pattern) {
      return pattern.type === 'block-command' || pattern.type === 'block-format';
    };
    var sortPatterns = function (patterns) {
      return sort(patterns, function (a, b) {
        if (a.start.length === b.start.length) {
          return 0;
        }
        return a.start.length > b.start.length ? -1 : 1;
      });
    };
    var normalizePattern = function (pattern) {
      var err = function (message) {
        return Result.error({
          message: message,
          pattern: pattern
        });
      };
      var formatOrCmd = function (name, onFormat, onCommand) {
        if (pattern.format !== undefined) {
          var formats = void 0;
          if (isArray(pattern.format)) {
            if (!forall(pattern.format, isString)) {
              return err(name + ' pattern has non-string items in the `format` array');
            }
            formats = pattern.format;
          } else if (isString(pattern.format)) {
            formats = [pattern.format];
          } else {
            return err(name + ' pattern has non-string `format` parameter');
          }
          return Result.value(onFormat(formats));
        } else if (pattern.cmd !== undefined) {
          if (!isString(pattern.cmd)) {
            return err(name + ' pattern has non-string `cmd` parameter');
          }
          return Result.value(onCommand(pattern.cmd, pattern.value));
        } else {
          return err(name + ' pattern is missing both `format` and `cmd` parameters');
        }
      };
      if (!isObject(pattern)) {
        return err('Raw pattern is not an object');
      }
      if (!isString(pattern.start)) {
        return err('Raw pattern is missing `start` parameter');
      }
      if (pattern.end !== undefined) {
        if (!isString(pattern.end)) {
          return err('Inline pattern has non-string `end` parameter');
        }
        if (pattern.start.length === 0 && pattern.end.length === 0) {
          return err('Inline pattern has empty `start` and `end` parameters');
        }
        var start_1 = pattern.start;
        var end_1 = pattern.end;
        if (end_1.length === 0) {
          end_1 = start_1;
          start_1 = '';
        }
        return formatOrCmd('Inline', function (format) {
          return {
            type: 'inline-format',
            start: start_1,
            end: end_1,
            format: format
          };
        }, function (cmd, value) {
          return {
            type: 'inline-command',
            start: start_1,
            end: end_1,
            cmd: cmd,
            value: value
          };
        });
      } else if (pattern.replacement !== undefined) {
        if (!isString(pattern.replacement)) {
          return err('Replacement pattern has non-string `replacement` parameter');
        }
        if (pattern.start.length === 0) {
          return err('Replacement pattern has empty `start` parameter');
        }
        return Result.value({
          type: 'inline-command',
          start: '',
          end: pattern.start,
          cmd: 'mceInsertContent',
          value: pattern.replacement
        });
      } else {
        if (pattern.start.length === 0) {
          return err('Block pattern has empty `start` parameter');
        }
        return formatOrCmd('Block', function (formats) {
          return {
            type: 'block-format',
            start: pattern.start,
            format: formats[0]
          };
        }, function (command, commandValue) {
          return {
            type: 'block-command',
            start: pattern.start,
            cmd: command,
            value: commandValue
          };
        });
      }
    };
    var denormalizePattern = function (pattern) {
      if (pattern.type === 'block-command') {
        return {
          start: pattern.start,
          cmd: pattern.cmd,
          value: pattern.value
        };
      } else if (pattern.type === 'block-format') {
        return {
          start: pattern.start,
          format: pattern.format
        };
      } else if (pattern.type === 'inline-command') {
        if (pattern.cmd === 'mceInsertContent' && pattern.start === '') {
          return {
            start: pattern.end,
            replacement: pattern.value
          };
        } else {
          return {
            start: pattern.start,
            end: pattern.end,
            cmd: pattern.cmd,
            value: pattern.value
          };
        }
      } else if (pattern.type === 'inline-format') {
        return {
          start: pattern.start,
          end: pattern.end,
          format: pattern.format.length === 1 ? pattern.format[0] : pattern.format
        };
      }
    };
    var createPatternSet = function (patterns) {
      return {
        inlinePatterns: filter(patterns, isInlinePattern),
        blockPatterns: sortPatterns(filter(patterns, isBlockPattern))
      };
    };

    var get = function (patternsState) {
      var setPatterns = function (newPatterns) {
        var normalized = partition(map(newPatterns, normalizePattern));
        if (normalized.errors.length > 0) {
          var firstError = normalized.errors[0];
          throw new Error(firstError.message + ':\n' + JSON.stringify(firstError.pattern, null, 2));
        }
        patternsState.set(createPatternSet(normalized.values));
      };
      var getPatterns = function () {
        return __spreadArrays(map(patternsState.get().inlinePatterns, denormalizePattern), map(patternsState.get().blockPatterns, denormalizePattern));
      };
      return {
        setPatterns: setPatterns,
        getPatterns: getPatterns
      };
    };

    var Global = typeof domGlobals.window !== 'undefined' ? domGlobals.window : Function('return this;')();

    var error$1 = function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var console = Global.console;
      if (console) {
        if (console.error) {
          console.error.apply(console, args);
        } else {
          console.log.apply(console, args);
        }
      }
    };
    var defaultPatterns = [
      {
        start: '*',
        end: '*',
        format: 'italic'
      },
      {
        start: '**',
        end: '**',
        format: 'bold'
      },
      {
        start: '#',
        format: 'h1'
      },
      {
        start: '##',
        format: 'h2'
      },
      {
        start: '###',
        format: 'h3'
      },
      {
        start: '####',
        format: 'h4'
      },
      {
        start: '#####',
        format: 'h5'
      },
      {
        start: '######',
        format: 'h6'
      },
      {
        start: '1. ',
        cmd: 'InsertOrderedList'
      },
      {
        start: '* ',
        cmd: 'InsertUnorderedList'
      },
      {
        start: '- ',
        cmd: 'InsertUnorderedList'
      }
    ];
    var getPatternSet = function (editor) {
      var patterns = editor.getParam('textpattern_patterns', defaultPatterns, 'array');
      if (!isArray(patterns)) {
        error$1('The setting textpattern_patterns should be an array');
        return {
          inlinePatterns: [],
          blockPatterns: []
        };
      }
      var normalized = partition(map(patterns, normalizePattern));
      each(normalized.errors, function (err) {
        return error$1(err.message, err.pattern);
      });
      return createPatternSet(normalized.values);
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

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Delay');

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.VK');

    var zeroWidth = '\uFEFF';
    var nbsp = '\xA0';

    var global$3 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var global$4 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

    var global$5 = tinymce.util.Tools.resolve('tinymce.dom.TextSeeker');

    var point = function (container, offset) {
      return {
        container: container,
        offset: offset
      };
    };

    var isText = function (node) {
      return node.nodeType === domGlobals.Node.TEXT_NODE;
    };
    var cleanEmptyNodes = function (dom, node, isRoot) {
      if (node && dom.isEmpty(node) && !isRoot(node)) {
        var parent_1 = node.parentNode;
        dom.remove(node);
        cleanEmptyNodes(dom, parent_1, isRoot);
      }
    };
    var deleteRng = function (dom, rng, isRoot, clean) {
      if (clean === void 0) {
        clean = true;
      }
      var startParent = rng.startContainer.parentNode;
      var endParent = rng.endContainer.parentNode;
      rng.deleteContents();
      if (clean && !isRoot(rng.startContainer)) {
        if (isText(rng.startContainer) && rng.startContainer.data.length === 0) {
          dom.remove(rng.startContainer);
        }
        if (isText(rng.endContainer) && rng.endContainer.data.length === 0) {
          dom.remove(rng.endContainer);
        }
        cleanEmptyNodes(dom, startParent, isRoot);
        if (startParent !== endParent) {
          cleanEmptyNodes(dom, endParent, isRoot);
        }
      }
    };
    var isBlockFormatName = function (name, formatter) {
      var formatSet = formatter.get(name);
      return isArray(formatSet) && head(formatSet).exists(function (format) {
        return has(format, 'block');
      });
    };
    var isReplacementPattern = function (pattern) {
      return pattern.start.length === 0;
    };
    var getParentBlock = function (editor, rng) {
      var parentBlockOpt = Option.from(editor.dom.getParent(rng.startContainer, editor.dom.isBlock));
      if (getForcedRootBlock(editor) === '') {
        return parentBlockOpt.orThunk(function () {
          return Option.some(editor.getBody());
        });
      } else {
        return parentBlockOpt;
      }
    };

    var DOM = global$4.DOM;
    var alwaysNext = function (startNode) {
      return function (node) {
        return startNode === node ? -1 : 0;
      };
    };
    var isBoundary = function (dom) {
      return function (node) {
        return dom.isBlock(node) || contains([
          'BR',
          'IMG',
          'HR',
          'INPUT'
        ], node.nodeName) || dom.getContentEditable(node) === 'false';
      };
    };
    var textBefore = function (node, offset, rootNode) {
      if (isText(node) && offset >= 0) {
        return Option.some(point(node, offset));
      } else {
        var textSeeker = global$5(DOM);
        return Option.from(textSeeker.backwards(node, offset, alwaysNext(node), rootNode)).map(function (prev) {
          return point(prev.container, prev.container.data.length);
        });
      }
    };
    var textAfter = function (node, offset, rootNode) {
      if (isText(node) && offset >= node.length) {
        return Option.some(point(node, offset));
      } else {
        var textSeeker = global$5(DOM);
        return Option.from(textSeeker.forwards(node, offset, alwaysNext(node), rootNode)).map(function (prev) {
          return point(prev.container, 0);
        });
      }
    };
    var scanLeft = function (node, offset, rootNode) {
      if (!isText(node)) {
        return Option.none();
      }
      var text = node.textContent;
      if (offset >= 0 && offset <= text.length) {
        return Option.some(point(node, offset));
      } else {
        var textSeeker = global$5(DOM);
        return Option.from(textSeeker.backwards(node, offset, alwaysNext(node), rootNode)).bind(function (prev) {
          var prevText = prev.container.data;
          return scanLeft(prev.container, offset + prevText.length, rootNode);
        });
      }
    };
    var scanRight = function (node, offset, rootNode) {
      if (!isText(node)) {
        return Option.none();
      }
      var text = node.textContent;
      if (offset <= text.length) {
        return Option.some(point(node, offset));
      } else {
        var textSeeker = global$5(DOM);
        return Option.from(textSeeker.forwards(node, offset, alwaysNext(node), rootNode)).bind(function (next) {
          return scanRight(next.container, offset - text.length, rootNode);
        });
      }
    };
    var repeatLeft = function (dom, node, offset, process, rootNode) {
      var search = global$5(dom, isBoundary(dom));
      return Option.from(search.backwards(node, offset, process, rootNode));
    };

    var generatePath = function (root, node, offset) {
      if (isText(node) && (offset < 0 || offset > node.data.length)) {
        return [];
      }
      var p = [offset];
      var current = node;
      while (current !== root && current.parentNode) {
        var parent_1 = current.parentNode;
        for (var i = 0; i < parent_1.childNodes.length; i++) {
          if (parent_1.childNodes[i] === current) {
            p.push(i);
            break;
          }
        }
        current = parent_1;
      }
      return current === root ? p.reverse() : [];
    };
    var generatePathRange = function (root, startNode, startOffset, endNode, endOffset) {
      var start = generatePath(root, startNode, startOffset);
      var end = generatePath(root, endNode, endOffset);
      return {
        start: start,
        end: end
      };
    };
    var resolvePath = function (root, path) {
      var nodePath = path.slice();
      var offset = nodePath.pop();
      return foldl(nodePath, function (optNode, index) {
        return optNode.bind(function (node) {
          return Option.from(node.childNodes[index]);
        });
      }, Option.some(root)).bind(function (node) {
        if (isText(node) && offset >= 0 && offset <= node.data.length) {
          return Option.some({
            node: node,
            offset: offset
          });
        } else {
          return Option.some({
            node: node,
            offset: offset
          });
        }
      });
    };
    var resolvePathRange = function (root, range) {
      return resolvePath(root, range.start).bind(function (_a) {
        var startNode = _a.node, startOffset = _a.offset;
        return resolvePath(root, range.end).map(function (_a) {
          var endNode = _a.node, endOffset = _a.offset;
          var rng = domGlobals.document.createRange();
          rng.setStart(startNode, startOffset);
          rng.setEnd(endNode, endOffset);
          return rng;
        });
      });
    };
    var generatePathRangeFromRange = function (root, range) {
      return generatePathRange(root, range.startContainer, range.startOffset, range.endContainer, range.endOffset);
    };

    var stripPattern = function (dom, block, pattern) {
      var firstTextNode = textAfter(block, 0, block);
      firstTextNode.each(function (spot) {
        var node = spot.container;
        scanRight(node, pattern.start.length, block).each(function (end) {
          var rng = dom.createRng();
          rng.setStart(node, 0);
          rng.setEnd(end.container, end.offset);
          deleteRng(dom, rng, function (e) {
            return e === block;
          });
        });
      });
    };
    var applyPattern = function (editor, match) {
      var dom = editor.dom;
      var pattern = match.pattern;
      var rng = resolvePathRange(dom.getRoot(), match.range).getOrDie('Unable to resolve path range');
      getParentBlock(editor, rng).each(function (block) {
        if (pattern.type === 'block-format') {
          if (isBlockFormatName(pattern.format, editor.formatter)) {
            editor.undoManager.transact(function () {
              stripPattern(editor.dom, block, pattern);
              editor.formatter.apply(pattern.format);
            });
          }
        } else if (pattern.type === 'block-command') {
          editor.undoManager.transact(function () {
            stripPattern(editor.dom, block, pattern);
            editor.execCommand(pattern.cmd, false, pattern.value);
          });
        }
      });
      return true;
    };
    var findPattern = function (patterns, text) {
      var nuText = text.replace(nbsp, ' ');
      return find(patterns, function (pattern) {
        if (text.indexOf(pattern.start) !== 0 && nuText.indexOf(pattern.start) !== 0) {
          return false;
        }
        return true;
      });
    };
    var findPatterns = function (editor, patterns) {
      var dom = editor.dom;
      var rng = editor.selection.getRng();
      return getParentBlock(editor, rng).filter(function (block) {
        var forcedRootBlock = getForcedRootBlock(editor);
        var matchesForcedRootBlock = forcedRootBlock === '' && dom.is(block, 'body') || dom.is(block, forcedRootBlock);
        return block !== null && matchesForcedRootBlock;
      }).bind(function (block) {
        var blockText = block.textContent;
        var matchedPattern = findPattern(patterns, blockText);
        return matchedPattern.map(function (pattern) {
          if (global$3.trim(blockText).length === pattern.start.length) {
            return [];
          }
          return [{
              pattern: pattern,
              range: generatePathRange(dom.getRoot(), block, 0, block, 0)
            }];
        });
      }).getOr([]);
    };
    var applyMatches = function (editor, matches) {
      if (matches.length === 0) {
        return;
      }
      var bookmark = editor.selection.getBookmark();
      each(matches, function (match) {
        return applyPattern(editor, match);
      });
      editor.selection.moveToBookmark(bookmark);
    };

    var unique = 0;
    var generate$1 = function (prefix) {
      var date = new Date();
      var time = date.getTime();
      var random = Math.floor(Math.random() * 1000000000);
      unique++;
      return prefix + '_' + random + unique + String(time);
    };

    var checkRange = function (str, substr, start) {
      return substr === '' || str.length >= substr.length && str.substr(start, start + substr.length) === substr;
    };
    var endsWith = function (str, suffix) {
      return checkRange(str, suffix, str.length - suffix.length);
    };

    var newMarker = function (dom, id) {
      return dom.create('span', {
        'data-mce-type': 'bookmark',
        id: id
      });
    };
    var rangeFromMarker = function (dom, marker) {
      var rng = dom.createRng();
      rng.setStartAfter(marker.start);
      rng.setEndBefore(marker.end);
      return rng;
    };
    var createMarker = function (dom, markerPrefix, pathRange) {
      var rng = resolvePathRange(dom.getRoot(), pathRange).getOrDie('Unable to resolve path range');
      var startNode = rng.startContainer;
      var endNode = rng.endContainer;
      var textEnd = rng.endOffset === 0 ? endNode : endNode.splitText(rng.endOffset);
      var textStart = rng.startOffset === 0 ? startNode : startNode.splitText(rng.startOffset);
      return {
        prefix: markerPrefix,
        end: textEnd.parentNode.insertBefore(newMarker(dom, markerPrefix + '-end'), textEnd),
        start: textStart.parentNode.insertBefore(newMarker(dom, markerPrefix + '-start'), textStart)
      };
    };
    var removeMarker = function (dom, marker, isRoot) {
      cleanEmptyNodes(dom, dom.get(marker.prefix + '-end'), isRoot);
      cleanEmptyNodes(dom, dom.get(marker.prefix + '-start'), isRoot);
    };

    var matchesPattern = function (dom, block, patternContent) {
      return function (element, offset) {
        var text = element.data;
        var searchText = text.substring(0, offset);
        var startEndIndex = searchText.lastIndexOf(patternContent.charAt(patternContent.length - 1));
        var startIndex = searchText.lastIndexOf(patternContent);
        if (startIndex !== -1) {
          return startIndex + patternContent.length;
        } else if (startEndIndex !== -1) {
          return startEndIndex + 1;
        } else {
          return -1;
        }
      };
    };
    var findPatternStartFromSpot = function (dom, pattern, block, spot) {
      var startPattern = pattern.start;
      var startSpot = repeatLeft(dom, spot.container, spot.offset, matchesPattern(dom, block, startPattern), block);
      return startSpot.bind(function (spot) {
        if (spot.offset >= startPattern.length) {
          var rng = dom.createRng();
          rng.setStart(spot.container, spot.offset - startPattern.length);
          rng.setEnd(spot.container, spot.offset);
          return Option.some(rng);
        } else {
          var offset = spot.offset - startPattern.length;
          return scanLeft(spot.container, offset, block).map(function (nextSpot) {
            var rng = dom.createRng();
            rng.setStart(nextSpot.container, nextSpot.offset);
            rng.setEnd(spot.container, spot.offset);
            return rng;
          }).filter(function (rng) {
            return rng.toString() === startPattern;
          }).orThunk(function () {
            return findPatternStartFromSpot(dom, pattern, block, point(spot.container, 0));
          });
        }
      });
    };
    var findPatternStart = function (dom, pattern, node, offset, block, requireGap) {
      if (requireGap === void 0) {
        requireGap = false;
      }
      if (pattern.start.length === 0 && !requireGap) {
        var rng = dom.createRng();
        rng.setStart(node, offset);
        rng.setEnd(node, offset);
        return Option.some(rng);
      }
      return textBefore(node, offset, block).bind(function (spot) {
        var start = findPatternStartFromSpot(dom, pattern, block, spot);
        return start.bind(function (startRange) {
          if (requireGap) {
            if (startRange.endContainer === spot.container && startRange.endOffset === spot.offset) {
              return Option.none();
            } else if (spot.offset === 0 && startRange.endContainer.textContent.length === startRange.endOffset) {
              return Option.none();
            }
          }
          return Option.some(startRange);
        });
      });
    };
    var findPattern$1 = function (editor, block, details) {
      var dom = editor.dom;
      var root = dom.getRoot();
      var pattern = details.pattern;
      var endNode = details.position.container;
      var endOffset = details.position.offset;
      return scanLeft(endNode, endOffset - details.pattern.end.length, block).bind(function (spot) {
        var endPathRng = generatePathRange(root, spot.container, spot.offset, endNode, endOffset);
        if (isReplacementPattern(pattern)) {
          return Option.some({
            matches: [{
                pattern: pattern,
                startRng: endPathRng,
                endRng: endPathRng
              }],
            position: spot
          });
        } else {
          var resultsOpt = findPatternsRec(editor, details.remainingPatterns, spot.container, spot.offset, block);
          var results_1 = resultsOpt.getOr({
            matches: [],
            position: spot
          });
          var pos = results_1.position;
          var start = findPatternStart(dom, pattern, pos.container, pos.offset, block, resultsOpt.isNone());
          return start.map(function (startRng) {
            var startPathRng = generatePathRangeFromRange(root, startRng);
            return {
              matches: results_1.matches.concat([{
                  pattern: pattern,
                  startRng: startPathRng,
                  endRng: endPathRng
                }]),
              position: point(startRng.startContainer, startRng.startOffset)
            };
          });
        }
      });
    };
    var findPatternsRec = function (editor, patterns, node, offset, block) {
      var dom = editor.dom;
      return textBefore(node, offset, dom.getRoot()).bind(function (endSpot) {
        var rng = dom.createRng();
        rng.setStart(block, 0);
        rng.setEnd(node, offset);
        var text = rng.toString();
        for (var i = 0; i < patterns.length; i++) {
          var pattern = patterns[i];
          if (!endsWith(text, pattern.end)) {
            continue;
          }
          var patternsWithoutCurrent = patterns.slice();
          patternsWithoutCurrent.splice(i, 1);
          var result = findPattern$1(editor, block, {
            pattern: pattern,
            remainingPatterns: patternsWithoutCurrent,
            position: endSpot
          });
          if (result.isSome()) {
            return result;
          }
        }
        return Option.none();
      });
    };
    var applyPattern$1 = function (editor, pattern, patternRange) {
      editor.selection.setRng(patternRange);
      if (pattern.type === 'inline-format') {
        each(pattern.format, function (format) {
          editor.formatter.apply(format);
        });
      } else {
        editor.execCommand(pattern.cmd, false, pattern.value);
      }
    };
    var applyReplacementPattern = function (editor, pattern, marker, isRoot) {
      var markerRange = rangeFromMarker(editor.dom, marker);
      deleteRng(editor.dom, markerRange, isRoot);
      applyPattern$1(editor, pattern, markerRange);
    };
    var applyPatternWithContent = function (editor, pattern, startMarker, endMarker, isRoot) {
      var dom = editor.dom;
      var markerEndRange = rangeFromMarker(dom, endMarker);
      var markerStartRange = rangeFromMarker(dom, startMarker);
      deleteRng(dom, markerStartRange, isRoot);
      deleteRng(dom, markerEndRange, isRoot);
      var patternMarker = {
        prefix: startMarker.prefix,
        start: startMarker.end,
        end: endMarker.start
      };
      var patternRange = rangeFromMarker(dom, patternMarker);
      applyPattern$1(editor, pattern, patternRange);
    };
    var addMarkers = function (dom, matches) {
      var markerPrefix = generate$1('mce_textpattern');
      var matchesWithEnds = foldr(matches, function (acc, match) {
        var endMarker = createMarker(dom, markerPrefix + ('_end' + acc.length), match.endRng);
        return acc.concat([__assign(__assign({}, match), { endMarker: endMarker })]);
      }, []);
      return foldr(matchesWithEnds, function (acc, match) {
        var idx = matchesWithEnds.length - acc.length - 1;
        var startMarker = isReplacementPattern(match.pattern) ? match.endMarker : createMarker(dom, markerPrefix + ('_start' + idx), match.startRng);
        return acc.concat([__assign(__assign({}, match), { startMarker: startMarker })]);
      }, []);
    };
    var findPatterns$1 = function (editor, patterns, space) {
      var rng = editor.selection.getRng();
      if (rng.collapsed === false) {
        return [];
      }
      return getParentBlock(editor, rng).bind(function (block) {
        var offset = rng.startOffset - (space ? 1 : 0);
        return findPatternsRec(editor, patterns, rng.startContainer, offset, block);
      }).fold(function () {
        return [];
      }, function (result) {
        return result.matches;
      });
    };
    var applyMatches$1 = function (editor, matches) {
      if (matches.length === 0) {
        return;
      }
      var dom = editor.dom;
      var bookmark = editor.selection.getBookmark();
      var matchesWithMarkers = addMarkers(dom, matches);
      each(matchesWithMarkers, function (match) {
        var block = dom.getParent(match.startMarker.start, dom.isBlock);
        var isRoot = function (node) {
          return node === block;
        };
        if (isReplacementPattern(match.pattern)) {
          applyReplacementPattern(editor, match.pattern, match.endMarker, isRoot);
        } else {
          applyPatternWithContent(editor, match.pattern, match.startMarker, match.endMarker, isRoot);
        }
        removeMarker(dom, match.endMarker, isRoot);
        removeMarker(dom, match.startMarker, isRoot);
      });
      editor.selection.moveToBookmark(bookmark);
    };

    var handleEnter = function (editor, patternSet) {
      if (!editor.selection.isCollapsed()) {
        return false;
      }
      var inlineMatches = findPatterns$1(editor, patternSet.inlinePatterns, false);
      var blockMatches = findPatterns(editor, patternSet.blockPatterns);
      if (blockMatches.length > 0 || inlineMatches.length > 0) {
        editor.undoManager.add();
        editor.undoManager.extra(function () {
          editor.execCommand('mceInsertNewLine');
        }, function () {
          editor.insertContent(zeroWidth);
          applyMatches$1(editor, inlineMatches);
          applyMatches(editor, blockMatches);
          var range = editor.selection.getRng();
          var spot = textBefore(range.startContainer, range.startOffset, editor.dom.getRoot());
          editor.execCommand('mceInsertNewLine');
          spot.each(function (s) {
            var node = s.container;
            if (node.data.charAt(s.offset - 1) === zeroWidth) {
              node.deleteData(s.offset - 1, 1);
              cleanEmptyNodes(editor.dom, node.parentNode, function (e) {
                return e === editor.dom.getRoot();
              });
            }
          });
        });
        return true;
      }
      return false;
    };
    var handleInlineKey = function (editor, patternSet) {
      var inlineMatches = findPatterns$1(editor, patternSet.inlinePatterns, true);
      if (inlineMatches.length > 0) {
        editor.undoManager.transact(function () {
          applyMatches$1(editor, inlineMatches);
        });
      }
    };
    var checkKeyEvent = function (codes, event, predicate) {
      for (var i = 0; i < codes.length; i++) {
        if (predicate(codes[i], event)) {
          return true;
        }
      }
    };
    var checkKeyCode = function (codes, event) {
      return checkKeyEvent(codes, event, function (code, event) {
        return code === event.keyCode && global$2.modifierPressed(event) === false;
      });
    };
    var checkCharCode = function (chars, event) {
      return checkKeyEvent(chars, event, function (chr, event) {
        return chr.charCodeAt(0) === event.charCode;
      });
    };

    var setup = function (editor, patternsState) {
      var charCodes = [
        ',',
        '.',
        ';',
        ':',
        '!',
        '?'
      ];
      var keyCodes = [32];
      editor.on('keydown', function (e) {
        if (e.keyCode === 13 && !global$2.modifierPressed(e)) {
          if (handleEnter(editor, patternsState.get())) {
            e.preventDefault();
          }
        }
      }, true);
      editor.on('keyup', function (e) {
        if (checkKeyCode(keyCodes, e)) {
          handleInlineKey(editor, patternsState.get());
        }
      });
      editor.on('keypress', function (e) {
        if (checkCharCode(charCodes, e)) {
          global$1.setEditorTimeout(editor, function () {
            handleInlineKey(editor, patternsState.get());
          });
        }
      });
    };

    function Plugin () {
      global.add('textpattern', function (editor) {
        var patternsState = Cell(getPatternSet(editor));
        setup(editor, patternsState);
        return get(patternsState);
      });
    }

    Plugin();

}(window));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL3RleHRwYXR0ZXJuL3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsZ0RBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsUUFBUTtBQUMzRDtBQUNBLDBDQUEwQyxRQUFRO0FBQ2xELHdEQUF3RCxRQUFRO0FBQ2hFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxTQUFTO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsUUFBUTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsU0FBUztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxTQUFTO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsU0FBUztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGlCQUFpQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLGVBQWU7O0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNHQUFzRzs7QUFFdEc7QUFDQTtBQUNBLHNCQUFzQix1QkFBdUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsZ0NBQWdDO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHFCQUFxQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxXQUFXLHVCQUF1QjtBQUNqRixPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFdBQVcsMkJBQTJCO0FBQ3JGLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTs7QUFFQSxDQUFDIiwiZmlsZSI6InZlbmRvcnN+dGlueW1jZS1wbHVnaW4tdGV4dHBhdHRlcm5+dGlueW1jZS1wbHVnaW4tdGV4dHBhdHRlcm4tcGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIFRpbnkgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTEdQTCBvciBhIGNvbW1lcmNpYWwgbGljZW5zZS5cbiAqIEZvciBMR1BMIHNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogRm9yIGNvbW1lcmNpYWwgbGljZW5zZXMgc2VlIGh0dHBzOi8vd3d3LnRpbnkuY2xvdWQvXG4gKlxuICogVmVyc2lvbjogNS40LjIgKDIwMjAtMDgtMTcpXG4gKi9cbihmdW5jdGlvbiAoZG9tR2xvYmFscykge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBDZWxsID0gZnVuY3Rpb24gKGluaXRpYWwpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGluaXRpYWw7XG4gICAgICB2YXIgZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9O1xuICAgICAgdmFyIHNldCA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHZhbHVlID0gdjtcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBnZXQ6IGdldCxcbiAgICAgICAgc2V0OiBzZXRcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciBnbG9iYWwgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5QbHVnaW5NYW5hZ2VyJyk7XG5cbiAgICB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgIGZvciAodmFyIHAgaW4gcylcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgICAgfTtcbiAgICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gICAgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XG4gICAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspXG4gICAgICAgIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcbiAgICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXG4gICAgICAgICAgcltrXSA9IGFbal07XG4gICAgICByZXR1cm4gcjtcbiAgICB9XG5cbiAgICB2YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHtcbiAgICB9O1xuICAgIHZhciBjb25zdGFudCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBpZGVudGl0eSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICByZXR1cm4geDtcbiAgICB9O1xuICAgIHZhciBkaWUgPSBmdW5jdGlvbiAobXNnKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgbmV2ZXIgPSBjb25zdGFudChmYWxzZSk7XG4gICAgdmFyIGFsd2F5cyA9IGNvbnN0YW50KHRydWUpO1xuXG4gICAgdmFyIG5vbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gTk9ORTtcbiAgICB9O1xuICAgIHZhciBOT05FID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGVxID0gZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgcmV0dXJuIG8uaXNOb25lKCk7XG4gICAgICB9O1xuICAgICAgdmFyIGNhbGwgPSBmdW5jdGlvbiAodGh1bmspIHtcbiAgICAgICAgcmV0dXJuIHRodW5rKCk7XG4gICAgICB9O1xuICAgICAgdmFyIGlkID0gZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgcmV0dXJuIG47XG4gICAgICB9O1xuICAgICAgdmFyIG1lID0ge1xuICAgICAgICBmb2xkOiBmdW5jdGlvbiAobiwgX3MpIHtcbiAgICAgICAgICByZXR1cm4gbigpO1xuICAgICAgICB9LFxuICAgICAgICBpczogbmV2ZXIsXG4gICAgICAgIGlzU29tZTogbmV2ZXIsXG4gICAgICAgIGlzTm9uZTogYWx3YXlzLFxuICAgICAgICBnZXRPcjogaWQsXG4gICAgICAgIGdldE9yVGh1bms6IGNhbGwsXG4gICAgICAgIGdldE9yRGllOiBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyB8fCAnZXJyb3I6IGdldE9yRGllIGNhbGxlZCBvbiBub25lLicpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRPck51bGw6IGNvbnN0YW50KG51bGwpLFxuICAgICAgICBnZXRPclVuZGVmaW5lZDogY29uc3RhbnQodW5kZWZpbmVkKSxcbiAgICAgICAgb3I6IGlkLFxuICAgICAgICBvclRodW5rOiBjYWxsLFxuICAgICAgICBtYXA6IG5vbmUsXG4gICAgICAgIGVhY2g6IG5vb3AsXG4gICAgICAgIGJpbmQ6IG5vbmUsXG4gICAgICAgIGV4aXN0czogbmV2ZXIsXG4gICAgICAgIGZvcmFsbDogYWx3YXlzLFxuICAgICAgICBmaWx0ZXI6IG5vbmUsXG4gICAgICAgIGVxdWFsczogZXEsXG4gICAgICAgIGVxdWFsc186IGVxLFxuICAgICAgICB0b0FycmF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9LFxuICAgICAgICB0b1N0cmluZzogY29uc3RhbnQoJ25vbmUoKScpXG4gICAgICB9O1xuICAgICAgcmV0dXJuIG1lO1xuICAgIH0oKTtcbiAgICB2YXIgc29tZSA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICB2YXIgY29uc3RhbnRfYSA9IGNvbnN0YW50KGEpO1xuICAgICAgdmFyIHNlbGYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBtZTtcbiAgICAgIH07XG4gICAgICB2YXIgYmluZCA9IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHJldHVybiBmKGEpO1xuICAgICAgfTtcbiAgICAgIHZhciBtZSA9IHtcbiAgICAgICAgZm9sZDogZnVuY3Rpb24gKG4sIHMpIHtcbiAgICAgICAgICByZXR1cm4gcyhhKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXM6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgcmV0dXJuIGEgPT09IHY7XG4gICAgICAgIH0sXG4gICAgICAgIGlzU29tZTogYWx3YXlzLFxuICAgICAgICBpc05vbmU6IG5ldmVyLFxuICAgICAgICBnZXRPcjogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JUaHVuazogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JEaWU6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yTnVsbDogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JVbmRlZmluZWQ6IGNvbnN0YW50X2EsXG4gICAgICAgIG9yOiBzZWxmLFxuICAgICAgICBvclRodW5rOiBzZWxmLFxuICAgICAgICBtYXA6IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgcmV0dXJuIHNvbWUoZihhKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVhY2g6IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgZihhKTtcbiAgICAgICAgfSxcbiAgICAgICAgYmluZDogYmluZCxcbiAgICAgICAgZXhpc3RzOiBiaW5kLFxuICAgICAgICBmb3JhbGw6IGJpbmQsXG4gICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICByZXR1cm4gZihhKSA/IG1lIDogTk9ORTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9BcnJheTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBbYV07XG4gICAgICAgIH0sXG4gICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuICdzb21lKCcgKyBhICsgJyknO1xuICAgICAgICB9LFxuICAgICAgICBlcXVhbHM6IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgICAgcmV0dXJuIG8uaXMoYSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVxdWFsc186IGZ1bmN0aW9uIChvLCBlbGVtZW50RXEpIHtcbiAgICAgICAgICByZXR1cm4gby5mb2xkKG5ldmVyLCBmdW5jdGlvbiAoYikge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRFcShhLCBiKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiBtZTtcbiAgICB9O1xuICAgIHZhciBmcm9tID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCA/IE5PTkUgOiBzb21lKHZhbHVlKTtcbiAgICB9O1xuICAgIHZhciBPcHRpb24gPSB7XG4gICAgICBzb21lOiBzb21lLFxuICAgICAgbm9uZTogbm9uZSxcbiAgICAgIGZyb206IGZyb21cbiAgICB9O1xuXG4gICAgdmFyIHR5cGVPZiA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICB2YXIgdCA9IHR5cGVvZiB4O1xuICAgICAgaWYgKHggPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICdudWxsJztcbiAgICAgIH0gZWxzZSBpZiAodCA9PT0gJ29iamVjdCcgJiYgKEFycmF5LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKHgpIHx8IHguY29uc3RydWN0b3IgJiYgeC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnQXJyYXknKSkge1xuICAgICAgICByZXR1cm4gJ2FycmF5JztcbiAgICAgIH0gZWxzZSBpZiAodCA9PT0gJ29iamVjdCcgJiYgKFN0cmluZy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZih4KSB8fCB4LmNvbnN0cnVjdG9yICYmIHguY29uc3RydWN0b3IubmFtZSA9PT0gJ1N0cmluZycpKSB7XG4gICAgICAgIHJldHVybiAnc3RyaW5nJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0O1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGlzVHlwZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0eXBlT2YodmFsdWUpID09PSB0eXBlO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBpc1N0cmluZyA9IGlzVHlwZSgnc3RyaW5nJyk7XG4gICAgdmFyIGlzT2JqZWN0ID0gaXNUeXBlKCdvYmplY3QnKTtcbiAgICB2YXIgaXNBcnJheSA9IGlzVHlwZSgnYXJyYXknKTtcblxuICAgIHZhciBuYXRpdmVTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbiAgICB2YXIgbmF0aXZlSW5kZXhPZiA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mO1xuICAgIHZhciByYXdJbmRleE9mID0gZnVuY3Rpb24gKHRzLCB0KSB7XG4gICAgICByZXR1cm4gbmF0aXZlSW5kZXhPZi5jYWxsKHRzLCB0KTtcbiAgICB9O1xuICAgIHZhciBjb250YWlucyA9IGZ1bmN0aW9uICh4cywgeCkge1xuICAgICAgcmV0dXJuIHJhd0luZGV4T2YoeHMsIHgpID4gLTE7XG4gICAgfTtcbiAgICB2YXIgbWFwID0gZnVuY3Rpb24gKHhzLCBmKSB7XG4gICAgICB2YXIgbGVuID0geHMubGVuZ3RoO1xuICAgICAgdmFyIHIgPSBuZXcgQXJyYXkobGVuKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHggPSB4c1tpXTtcbiAgICAgICAgcltpXSA9IGYoeCwgaSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcjtcbiAgICB9O1xuICAgIHZhciBlYWNoID0gZnVuY3Rpb24gKHhzLCBmKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0geHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHggPSB4c1tpXTtcbiAgICAgICAgZih4LCBpKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBlYWNociA9IGZ1bmN0aW9uICh4cywgZikge1xuICAgICAgZm9yICh2YXIgaSA9IHhzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHZhciB4ID0geHNbaV07XG4gICAgICAgIGYoeCwgaSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgZmlsdGVyID0gZnVuY3Rpb24gKHhzLCBwcmVkKSB7XG4gICAgICB2YXIgciA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHhzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciB4ID0geHNbaV07XG4gICAgICAgIGlmIChwcmVkKHgsIGkpKSB7XG4gICAgICAgICAgci5wdXNoKHgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcjtcbiAgICB9O1xuICAgIHZhciBmb2xkciA9IGZ1bmN0aW9uICh4cywgZiwgYWNjKSB7XG4gICAgICBlYWNocih4cywgZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgYWNjID0gZihhY2MsIHgpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH07XG4gICAgdmFyIGZvbGRsID0gZnVuY3Rpb24gKHhzLCBmLCBhY2MpIHtcbiAgICAgIGVhY2goeHMsIGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGFjYyA9IGYoYWNjLCB4KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGFjYztcbiAgICB9O1xuICAgIHZhciBmaW5kVW50aWwgPSBmdW5jdGlvbiAoeHMsIHByZWQsIHVudGlsKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0geHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHggPSB4c1tpXTtcbiAgICAgICAgaWYgKHByZWQoeCwgaSkpIHtcbiAgICAgICAgICByZXR1cm4gT3B0aW9uLnNvbWUoeCk7XG4gICAgICAgIH0gZWxzZSBpZiAodW50aWwoeCwgaSkpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIE9wdGlvbi5ub25lKCk7XG4gICAgfTtcbiAgICB2YXIgZmluZCA9IGZ1bmN0aW9uICh4cywgcHJlZCkge1xuICAgICAgcmV0dXJuIGZpbmRVbnRpbCh4cywgcHJlZCwgbmV2ZXIpO1xuICAgIH07XG4gICAgdmFyIGZvcmFsbCA9IGZ1bmN0aW9uICh4cywgcHJlZCkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHhzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgIHZhciB4ID0geHNbaV07XG4gICAgICAgIGlmIChwcmVkKHgsIGkpICE9PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIHZhciBzb3J0ID0gZnVuY3Rpb24gKHhzLCBjb21wYXJhdG9yKSB7XG4gICAgICB2YXIgY29weSA9IG5hdGl2ZVNsaWNlLmNhbGwoeHMsIDApO1xuICAgICAgY29weS5zb3J0KGNvbXBhcmF0b3IpO1xuICAgICAgcmV0dXJuIGNvcHk7XG4gICAgfTtcbiAgICB2YXIgaGVhZCA9IGZ1bmN0aW9uICh4cykge1xuICAgICAgcmV0dXJuIHhzLmxlbmd0aCA9PT0gMCA/IE9wdGlvbi5ub25lKCkgOiBPcHRpb24uc29tZSh4c1swXSk7XG4gICAgfTtcblxuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXM7XG4gICAgdmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0Lmhhc093blByb3BlcnR5O1xuICAgIHZhciBoYXMgPSBmdW5jdGlvbiAob2JqLCBrZXkpIHtcbiAgICAgIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbiAgICB9O1xuXG4gICAgdmFyIGdlbmVyYXRlID0gZnVuY3Rpb24gKGNhc2VzKSB7XG4gICAgICBpZiAoIWlzQXJyYXkoY2FzZXMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY2FzZXMgbXVzdCBiZSBhbiBhcnJheScpO1xuICAgICAgfVxuICAgICAgaWYgKGNhc2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZXJlIG11c3QgYmUgYXQgbGVhc3Qgb25lIGNhc2UnKTtcbiAgICAgIH1cbiAgICAgIHZhciBjb25zdHJ1Y3RvcnMgPSBbXTtcbiAgICAgIHZhciBhZHQgPSB7fTtcbiAgICAgIGVhY2goY2FzZXMsIGZ1bmN0aW9uIChhY2FzZSwgY291bnQpIHtcbiAgICAgICAgdmFyIGtleXMkMSA9IGtleXMoYWNhc2UpO1xuICAgICAgICBpZiAoa2V5cyQxLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignb25lIGFuZCBvbmx5IG9uZSBuYW1lIHBlciBjYXNlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGtleSA9IGtleXMkMVswXTtcbiAgICAgICAgdmFyIHZhbHVlID0gYWNhc2Vba2V5XTtcbiAgICAgICAgaWYgKGFkdFtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2R1cGxpY2F0ZSBrZXkgZGV0ZWN0ZWQ6JyArIGtleSk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnY2F0YScpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nhbm5vdCBoYXZlIGEgY2FzZSBuYW1lZCBjYXRhIChzb3JyeSknKTtcbiAgICAgICAgfSBlbHNlIGlmICghaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nhc2UgYXJndW1lbnRzIG11c3QgYmUgYW4gYXJyYXknKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdHJ1Y3RvcnMucHVzaChrZXkpO1xuICAgICAgICBhZHRba2V5XSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgYXJnTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgICBpZiAoYXJnTGVuZ3RoICE9PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV3JvbmcgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBjYXNlICcgKyBrZXkgKyAnLiBFeHBlY3RlZCAnICsgdmFsdWUubGVuZ3RoICsgJyAoJyArIHZhbHVlICsgJyksIGdvdCAnICsgYXJnTGVuZ3RoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJnTGVuZ3RoKTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBtYXRjaCA9IGZ1bmN0aW9uIChicmFuY2hlcykge1xuICAgICAgICAgICAgdmFyIGJyYW5jaEtleXMgPSBrZXlzKGJyYW5jaGVzKTtcbiAgICAgICAgICAgIGlmIChjb25zdHJ1Y3RvcnMubGVuZ3RoICE9PSBicmFuY2hLZXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dyb25nIG51bWJlciBvZiBhcmd1bWVudHMgdG8gbWF0Y2guIEV4cGVjdGVkOiAnICsgY29uc3RydWN0b3JzLmpvaW4oJywnKSArICdcXG5BY3R1YWw6ICcgKyBicmFuY2hLZXlzLmpvaW4oJywnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYWxsUmVxZCA9IGZvcmFsbChjb25zdHJ1Y3RvcnMsIGZ1bmN0aW9uIChyZXFLZXkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5zKGJyYW5jaEtleXMsIHJlcUtleSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghYWxsUmVxZCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBhbGwgYnJhbmNoZXMgd2VyZSBzcGVjaWZpZWQgd2hlbiB1c2luZyBtYXRjaC4gU3BlY2lmaWVkOiAnICsgYnJhbmNoS2V5cy5qb2luKCcsICcpICsgJ1xcblJlcXVpcmVkOiAnICsgY29uc3RydWN0b3JzLmpvaW4oJywgJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGJyYW5jaGVzW2tleV0uYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZm9sZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCAhPT0gY2FzZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXcm9uZyBudW1iZXIgb2YgYXJndW1lbnRzIHRvIGZvbGQuIEV4cGVjdGVkICcgKyBjYXNlcy5sZW5ndGggKyAnLCBnb3QgJyArIGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciB0YXJnZXQgPSBhcmd1bWVudHNbY291bnRdO1xuICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0LmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1hdGNoOiBtYXRjaCxcbiAgICAgICAgICAgIGxvZzogZnVuY3Rpb24gKGxhYmVsKSB7XG4gICAgICAgICAgICAgIGRvbUdsb2JhbHMuY29uc29sZS5sb2cobGFiZWwsIHtcbiAgICAgICAgICAgICAgICBjb25zdHJ1Y3RvcnM6IGNvbnN0cnVjdG9ycyxcbiAgICAgICAgICAgICAgICBjb25zdHJ1Y3Rvcjoga2V5LFxuICAgICAgICAgICAgICAgIHBhcmFtczogYXJnc1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gYWR0O1xuICAgIH07XG4gICAgdmFyIEFkdCA9IHsgZ2VuZXJhdGU6IGdlbmVyYXRlIH07XG5cbiAgICB2YXIgY29tcGFyaXNvbiA9IEFkdC5nZW5lcmF0ZShbXG4gICAgICB7XG4gICAgICAgIGJvdGhFcnJvcnM6IFtcbiAgICAgICAgICAnZXJyb3IxJyxcbiAgICAgICAgICAnZXJyb3IyJ1xuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBmaXJzdEVycm9yOiBbXG4gICAgICAgICAgJ2Vycm9yMScsXG4gICAgICAgICAgJ3ZhbHVlMidcbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc2Vjb25kRXJyb3I6IFtcbiAgICAgICAgICAndmFsdWUxJyxcbiAgICAgICAgICAnZXJyb3IyJ1xuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBib3RoVmFsdWVzOiBbXG4gICAgICAgICAgJ3ZhbHVlMScsXG4gICAgICAgICAgJ3ZhbHVlMidcbiAgICAgICAgXVxuICAgICAgfVxuICAgIF0pO1xuICAgIHZhciBwYXJ0aXRpb24gPSBmdW5jdGlvbiAocmVzdWx0cykge1xuICAgICAgdmFyIGVycm9ycyA9IFtdO1xuICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgZWFjaChyZXN1bHRzLCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIHJlc3VsdC5mb2xkKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBlcnJvcnMucHVzaChlcnIpO1xuICAgICAgICB9LCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICB2YWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBlcnJvcnM6IGVycm9ycyxcbiAgICAgICAgdmFsdWVzOiB2YWx1ZXNcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciB2YWx1ZSA9IGZ1bmN0aW9uIChvKSB7XG4gICAgICB2YXIgaXMgPSBmdW5jdGlvbiAodikge1xuICAgICAgICByZXR1cm4gbyA9PT0gdjtcbiAgICAgIH07XG4gICAgICB2YXIgb3IgPSBmdW5jdGlvbiAoX29wdCkge1xuICAgICAgICByZXR1cm4gdmFsdWUobyk7XG4gICAgICB9O1xuICAgICAgdmFyIG9yVGh1bmsgPSBmdW5jdGlvbiAoX2YpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlKG8pO1xuICAgICAgfTtcbiAgICAgIHZhciBtYXAgPSBmdW5jdGlvbiAoZikge1xuICAgICAgICByZXR1cm4gdmFsdWUoZihvKSk7XG4gICAgICB9O1xuICAgICAgdmFyIG1hcEVycm9yID0gZnVuY3Rpb24gKF9mKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZShvKTtcbiAgICAgIH07XG4gICAgICB2YXIgZWFjaCA9IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIGYobyk7XG4gICAgICB9O1xuICAgICAgdmFyIGJpbmQgPSBmdW5jdGlvbiAoZikge1xuICAgICAgICByZXR1cm4gZihvKTtcbiAgICAgIH07XG4gICAgICB2YXIgZm9sZCA9IGZ1bmN0aW9uIChfLCBvblZhbHVlKSB7XG4gICAgICAgIHJldHVybiBvblZhbHVlKG8pO1xuICAgICAgfTtcbiAgICAgIHZhciBleGlzdHMgPSBmdW5jdGlvbiAoZikge1xuICAgICAgICByZXR1cm4gZihvKTtcbiAgICAgIH07XG4gICAgICB2YXIgZm9yYWxsID0gZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgcmV0dXJuIGYobyk7XG4gICAgICB9O1xuICAgICAgdmFyIHRvT3B0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gT3B0aW9uLnNvbWUobyk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaXM6IGlzLFxuICAgICAgICBpc1ZhbHVlOiBhbHdheXMsXG4gICAgICAgIGlzRXJyb3I6IG5ldmVyLFxuICAgICAgICBnZXRPcjogY29uc3RhbnQobyksXG4gICAgICAgIGdldE9yVGh1bms6IGNvbnN0YW50KG8pLFxuICAgICAgICBnZXRPckRpZTogY29uc3RhbnQobyksXG4gICAgICAgIG9yOiBvcixcbiAgICAgICAgb3JUaHVuazogb3JUaHVuayxcbiAgICAgICAgZm9sZDogZm9sZCxcbiAgICAgICAgbWFwOiBtYXAsXG4gICAgICAgIG1hcEVycm9yOiBtYXBFcnJvcixcbiAgICAgICAgZWFjaDogZWFjaCxcbiAgICAgICAgYmluZDogYmluZCxcbiAgICAgICAgZXhpc3RzOiBleGlzdHMsXG4gICAgICAgIGZvcmFsbDogZm9yYWxsLFxuICAgICAgICB0b09wdGlvbjogdG9PcHRpb25cbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgZXJyb3IgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgdmFyIGdldE9yVGh1bmsgPSBmdW5jdGlvbiAoZikge1xuICAgICAgICByZXR1cm4gZigpO1xuICAgICAgfTtcbiAgICAgIHZhciBnZXRPckRpZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGRpZShTdHJpbmcobWVzc2FnZSkpKCk7XG4gICAgICB9O1xuICAgICAgdmFyIG9yID0gZnVuY3Rpb24gKG9wdCkge1xuICAgICAgICByZXR1cm4gb3B0O1xuICAgICAgfTtcbiAgICAgIHZhciBvclRodW5rID0gZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgcmV0dXJuIGYoKTtcbiAgICAgIH07XG4gICAgICB2YXIgbWFwID0gZnVuY3Rpb24gKF9mKSB7XG4gICAgICAgIHJldHVybiBlcnJvcihtZXNzYWdlKTtcbiAgICAgIH07XG4gICAgICB2YXIgbWFwRXJyb3IgPSBmdW5jdGlvbiAoZikge1xuICAgICAgICByZXR1cm4gZXJyb3IoZihtZXNzYWdlKSk7XG4gICAgICB9O1xuICAgICAgdmFyIGJpbmQgPSBmdW5jdGlvbiAoX2YpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yKG1lc3NhZ2UpO1xuICAgICAgfTtcbiAgICAgIHZhciBmb2xkID0gZnVuY3Rpb24gKG9uRXJyb3IsIF8pIHtcbiAgICAgICAgcmV0dXJuIG9uRXJyb3IobWVzc2FnZSk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaXM6IG5ldmVyLFxuICAgICAgICBpc1ZhbHVlOiBuZXZlcixcbiAgICAgICAgaXNFcnJvcjogYWx3YXlzLFxuICAgICAgICBnZXRPcjogaWRlbnRpdHksXG4gICAgICAgIGdldE9yVGh1bms6IGdldE9yVGh1bmssXG4gICAgICAgIGdldE9yRGllOiBnZXRPckRpZSxcbiAgICAgICAgb3I6IG9yLFxuICAgICAgICBvclRodW5rOiBvclRodW5rLFxuICAgICAgICBmb2xkOiBmb2xkLFxuICAgICAgICBtYXA6IG1hcCxcbiAgICAgICAgbWFwRXJyb3I6IG1hcEVycm9yLFxuICAgICAgICBlYWNoOiBub29wLFxuICAgICAgICBiaW5kOiBiaW5kLFxuICAgICAgICBleGlzdHM6IG5ldmVyLFxuICAgICAgICBmb3JhbGw6IGFsd2F5cyxcbiAgICAgICAgdG9PcHRpb246IE9wdGlvbi5ub25lXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGZyb21PcHRpb24gPSBmdW5jdGlvbiAob3B0LCBlcnIpIHtcbiAgICAgIHJldHVybiBvcHQuZm9sZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBlcnJvcihlcnIpO1xuICAgICAgfSwgdmFsdWUpO1xuICAgIH07XG4gICAgdmFyIFJlc3VsdCA9IHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVycm9yOiBlcnJvcixcbiAgICAgIGZyb21PcHRpb246IGZyb21PcHRpb25cbiAgICB9O1xuXG4gICAgdmFyIGlzSW5saW5lUGF0dGVybiA9IGZ1bmN0aW9uIChwYXR0ZXJuKSB7XG4gICAgICByZXR1cm4gcGF0dGVybi50eXBlID09PSAnaW5saW5lLWNvbW1hbmQnIHx8IHBhdHRlcm4udHlwZSA9PT0gJ2lubGluZS1mb3JtYXQnO1xuICAgIH07XG4gICAgdmFyIGlzQmxvY2tQYXR0ZXJuID0gZnVuY3Rpb24gKHBhdHRlcm4pIHtcbiAgICAgIHJldHVybiBwYXR0ZXJuLnR5cGUgPT09ICdibG9jay1jb21tYW5kJyB8fCBwYXR0ZXJuLnR5cGUgPT09ICdibG9jay1mb3JtYXQnO1xuICAgIH07XG4gICAgdmFyIHNvcnRQYXR0ZXJucyA9IGZ1bmN0aW9uIChwYXR0ZXJucykge1xuICAgICAgcmV0dXJuIHNvcnQocGF0dGVybnMsIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIGlmIChhLnN0YXJ0Lmxlbmd0aCA9PT0gYi5zdGFydC5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYS5zdGFydC5sZW5ndGggPiBiLnN0YXJ0Lmxlbmd0aCA/IC0xIDogMTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIG5vcm1hbGl6ZVBhdHRlcm4gPSBmdW5jdGlvbiAocGF0dGVybikge1xuICAgICAgdmFyIGVyciA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiBSZXN1bHQuZXJyb3Ioe1xuICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgICAgcGF0dGVybjogcGF0dGVyblxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICB2YXIgZm9ybWF0T3JDbWQgPSBmdW5jdGlvbiAobmFtZSwgb25Gb3JtYXQsIG9uQ29tbWFuZCkge1xuICAgICAgICBpZiAocGF0dGVybi5mb3JtYXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHZhciBmb3JtYXRzID0gdm9pZCAwO1xuICAgICAgICAgIGlmIChpc0FycmF5KHBhdHRlcm4uZm9ybWF0KSkge1xuICAgICAgICAgICAgaWYgKCFmb3JhbGwocGF0dGVybi5mb3JtYXQsIGlzU3RyaW5nKSkge1xuICAgICAgICAgICAgICByZXR1cm4gZXJyKG5hbWUgKyAnIHBhdHRlcm4gaGFzIG5vbi1zdHJpbmcgaXRlbXMgaW4gdGhlIGBmb3JtYXRgIGFycmF5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JtYXRzID0gcGF0dGVybi5mb3JtYXQ7XG4gICAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZyhwYXR0ZXJuLmZvcm1hdCkpIHtcbiAgICAgICAgICAgIGZvcm1hdHMgPSBbcGF0dGVybi5mb3JtYXRdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyKG5hbWUgKyAnIHBhdHRlcm4gaGFzIG5vbi1zdHJpbmcgYGZvcm1hdGAgcGFyYW1ldGVyJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBSZXN1bHQudmFsdWUob25Gb3JtYXQoZm9ybWF0cykpO1xuICAgICAgICB9IGVsc2UgaWYgKHBhdHRlcm4uY21kICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoIWlzU3RyaW5nKHBhdHRlcm4uY21kKSkge1xuICAgICAgICAgICAgcmV0dXJuIGVycihuYW1lICsgJyBwYXR0ZXJuIGhhcyBub24tc3RyaW5nIGBjbWRgIHBhcmFtZXRlcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gUmVzdWx0LnZhbHVlKG9uQ29tbWFuZChwYXR0ZXJuLmNtZCwgcGF0dGVybi52YWx1ZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBlcnIobmFtZSArICcgcGF0dGVybiBpcyBtaXNzaW5nIGJvdGggYGZvcm1hdGAgYW5kIGBjbWRgIHBhcmFtZXRlcnMnKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGlmICghaXNPYmplY3QocGF0dGVybikpIHtcbiAgICAgICAgcmV0dXJuIGVycignUmF3IHBhdHRlcm4gaXMgbm90IGFuIG9iamVjdCcpO1xuICAgICAgfVxuICAgICAgaWYgKCFpc1N0cmluZyhwYXR0ZXJuLnN0YXJ0KSkge1xuICAgICAgICByZXR1cm4gZXJyKCdSYXcgcGF0dGVybiBpcyBtaXNzaW5nIGBzdGFydGAgcGFyYW1ldGVyJyk7XG4gICAgICB9XG4gICAgICBpZiAocGF0dGVybi5lbmQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIWlzU3RyaW5nKHBhdHRlcm4uZW5kKSkge1xuICAgICAgICAgIHJldHVybiBlcnIoJ0lubGluZSBwYXR0ZXJuIGhhcyBub24tc3RyaW5nIGBlbmRgIHBhcmFtZXRlcicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXR0ZXJuLnN0YXJ0Lmxlbmd0aCA9PT0gMCAmJiBwYXR0ZXJuLmVuZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZXJyKCdJbmxpbmUgcGF0dGVybiBoYXMgZW1wdHkgYHN0YXJ0YCBhbmQgYGVuZGAgcGFyYW1ldGVycycpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdGFydF8xID0gcGF0dGVybi5zdGFydDtcbiAgICAgICAgdmFyIGVuZF8xID0gcGF0dGVybi5lbmQ7XG4gICAgICAgIGlmIChlbmRfMS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBlbmRfMSA9IHN0YXJ0XzE7XG4gICAgICAgICAgc3RhcnRfMSA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtYXRPckNtZCgnSW5saW5lJywgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiAnaW5saW5lLWZvcm1hdCcsXG4gICAgICAgICAgICBzdGFydDogc3RhcnRfMSxcbiAgICAgICAgICAgIGVuZDogZW5kXzEsXG4gICAgICAgICAgICBmb3JtYXQ6IGZvcm1hdFxuICAgICAgICAgIH07XG4gICAgICAgIH0sIGZ1bmN0aW9uIChjbWQsIHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6ICdpbmxpbmUtY29tbWFuZCcsXG4gICAgICAgICAgICBzdGFydDogc3RhcnRfMSxcbiAgICAgICAgICAgIGVuZDogZW5kXzEsXG4gICAgICAgICAgICBjbWQ6IGNtZCxcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChwYXR0ZXJuLnJlcGxhY2VtZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCFpc1N0cmluZyhwYXR0ZXJuLnJlcGxhY2VtZW50KSkge1xuICAgICAgICAgIHJldHVybiBlcnIoJ1JlcGxhY2VtZW50IHBhdHRlcm4gaGFzIG5vbi1zdHJpbmcgYHJlcGxhY2VtZW50YCBwYXJhbWV0ZXInKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF0dGVybi5zdGFydC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZXJyKCdSZXBsYWNlbWVudCBwYXR0ZXJuIGhhcyBlbXB0eSBgc3RhcnRgIHBhcmFtZXRlcicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBSZXN1bHQudmFsdWUoe1xuICAgICAgICAgIHR5cGU6ICdpbmxpbmUtY29tbWFuZCcsXG4gICAgICAgICAgc3RhcnQ6ICcnLFxuICAgICAgICAgIGVuZDogcGF0dGVybi5zdGFydCxcbiAgICAgICAgICBjbWQ6ICdtY2VJbnNlcnRDb250ZW50JyxcbiAgICAgICAgICB2YWx1ZTogcGF0dGVybi5yZXBsYWNlbWVudFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChwYXR0ZXJuLnN0YXJ0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBlcnIoJ0Jsb2NrIHBhdHRlcm4gaGFzIGVtcHR5IGBzdGFydGAgcGFyYW1ldGVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1hdE9yQ21kKCdCbG9jaycsIGZ1bmN0aW9uIChmb3JtYXRzKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6ICdibG9jay1mb3JtYXQnLFxuICAgICAgICAgICAgc3RhcnQ6IHBhdHRlcm4uc3RhcnQsXG4gICAgICAgICAgICBmb3JtYXQ6IGZvcm1hdHNbMF1cbiAgICAgICAgICB9O1xuICAgICAgICB9LCBmdW5jdGlvbiAoY29tbWFuZCwgY29tbWFuZFZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6ICdibG9jay1jb21tYW5kJyxcbiAgICAgICAgICAgIHN0YXJ0OiBwYXR0ZXJuLnN0YXJ0LFxuICAgICAgICAgICAgY21kOiBjb21tYW5kLFxuICAgICAgICAgICAgdmFsdWU6IGNvbW1hbmRWYWx1ZVxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGRlbm9ybWFsaXplUGF0dGVybiA9IGZ1bmN0aW9uIChwYXR0ZXJuKSB7XG4gICAgICBpZiAocGF0dGVybi50eXBlID09PSAnYmxvY2stY29tbWFuZCcpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzdGFydDogcGF0dGVybi5zdGFydCxcbiAgICAgICAgICBjbWQ6IHBhdHRlcm4uY21kLFxuICAgICAgICAgIHZhbHVlOiBwYXR0ZXJuLnZhbHVlXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKHBhdHRlcm4udHlwZSA9PT0gJ2Jsb2NrLWZvcm1hdCcpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzdGFydDogcGF0dGVybi5zdGFydCxcbiAgICAgICAgICBmb3JtYXQ6IHBhdHRlcm4uZm9ybWF0XG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKHBhdHRlcm4udHlwZSA9PT0gJ2lubGluZS1jb21tYW5kJykge1xuICAgICAgICBpZiAocGF0dGVybi5jbWQgPT09ICdtY2VJbnNlcnRDb250ZW50JyAmJiBwYXR0ZXJuLnN0YXJ0ID09PSAnJykge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGFydDogcGF0dGVybi5lbmQsXG4gICAgICAgICAgICByZXBsYWNlbWVudDogcGF0dGVybi52YWx1ZVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXJ0OiBwYXR0ZXJuLnN0YXJ0LFxuICAgICAgICAgICAgZW5kOiBwYXR0ZXJuLmVuZCxcbiAgICAgICAgICAgIGNtZDogcGF0dGVybi5jbWQsXG4gICAgICAgICAgICB2YWx1ZTogcGF0dGVybi52YWx1ZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocGF0dGVybi50eXBlID09PSAnaW5saW5lLWZvcm1hdCcpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzdGFydDogcGF0dGVybi5zdGFydCxcbiAgICAgICAgICBlbmQ6IHBhdHRlcm4uZW5kLFxuICAgICAgICAgIGZvcm1hdDogcGF0dGVybi5mb3JtYXQubGVuZ3RoID09PSAxID8gcGF0dGVybi5mb3JtYXRbMF0gOiBwYXR0ZXJuLmZvcm1hdFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGNyZWF0ZVBhdHRlcm5TZXQgPSBmdW5jdGlvbiAocGF0dGVybnMpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlubGluZVBhdHRlcm5zOiBmaWx0ZXIocGF0dGVybnMsIGlzSW5saW5lUGF0dGVybiksXG4gICAgICAgIGJsb2NrUGF0dGVybnM6IHNvcnRQYXR0ZXJucyhmaWx0ZXIocGF0dGVybnMsIGlzQmxvY2tQYXR0ZXJuKSlcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciBnZXQgPSBmdW5jdGlvbiAocGF0dGVybnNTdGF0ZSkge1xuICAgICAgdmFyIHNldFBhdHRlcm5zID0gZnVuY3Rpb24gKG5ld1BhdHRlcm5zKSB7XG4gICAgICAgIHZhciBub3JtYWxpemVkID0gcGFydGl0aW9uKG1hcChuZXdQYXR0ZXJucywgbm9ybWFsaXplUGF0dGVybikpO1xuICAgICAgICBpZiAobm9ybWFsaXplZC5lcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHZhciBmaXJzdEVycm9yID0gbm9ybWFsaXplZC5lcnJvcnNbMF07XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGZpcnN0RXJyb3IubWVzc2FnZSArICc6XFxuJyArIEpTT04uc3RyaW5naWZ5KGZpcnN0RXJyb3IucGF0dGVybiwgbnVsbCwgMikpO1xuICAgICAgICB9XG4gICAgICAgIHBhdHRlcm5zU3RhdGUuc2V0KGNyZWF0ZVBhdHRlcm5TZXQobm9ybWFsaXplZC52YWx1ZXMpKTtcbiAgICAgIH07XG4gICAgICB2YXIgZ2V0UGF0dGVybnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX3NwcmVhZEFycmF5cyhtYXAocGF0dGVybnNTdGF0ZS5nZXQoKS5pbmxpbmVQYXR0ZXJucywgZGVub3JtYWxpemVQYXR0ZXJuKSwgbWFwKHBhdHRlcm5zU3RhdGUuZ2V0KCkuYmxvY2tQYXR0ZXJucywgZGVub3JtYWxpemVQYXR0ZXJuKSk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2V0UGF0dGVybnM6IHNldFBhdHRlcm5zLFxuICAgICAgICBnZXRQYXR0ZXJuczogZ2V0UGF0dGVybnNcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciBHbG9iYWwgPSB0eXBlb2YgZG9tR2xvYmFscy53aW5kb3cgIT09ICd1bmRlZmluZWQnID8gZG9tR2xvYmFscy53aW5kb3cgOiBGdW5jdGlvbigncmV0dXJuIHRoaXM7JykoKTtcblxuICAgIHZhciBlcnJvciQxID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgIH1cbiAgICAgIHZhciBjb25zb2xlID0gR2xvYmFsLmNvbnNvbGU7XG4gICAgICBpZiAoY29uc29sZSkge1xuICAgICAgICBpZiAoY29uc29sZS5lcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgYXJncyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJncyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBkZWZhdWx0UGF0dGVybnMgPSBbXG4gICAgICB7XG4gICAgICAgIHN0YXJ0OiAnKicsXG4gICAgICAgIGVuZDogJyonLFxuICAgICAgICBmb3JtYXQ6ICdpdGFsaWMnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGFydDogJyoqJyxcbiAgICAgICAgZW5kOiAnKionLFxuICAgICAgICBmb3JtYXQ6ICdib2xkJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhcnQ6ICcjJyxcbiAgICAgICAgZm9ybWF0OiAnaDEnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGFydDogJyMjJyxcbiAgICAgICAgZm9ybWF0OiAnaDInXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGFydDogJyMjIycsXG4gICAgICAgIGZvcm1hdDogJ2gzJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhcnQ6ICcjIyMjJyxcbiAgICAgICAgZm9ybWF0OiAnaDQnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGFydDogJyMjIyMjJyxcbiAgICAgICAgZm9ybWF0OiAnaDUnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdGFydDogJyMjIyMjIycsXG4gICAgICAgIGZvcm1hdDogJ2g2J1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhcnQ6ICcxLiAnLFxuICAgICAgICBjbWQ6ICdJbnNlcnRPcmRlcmVkTGlzdCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN0YXJ0OiAnKiAnLFxuICAgICAgICBjbWQ6ICdJbnNlcnRVbm9yZGVyZWRMaXN0J1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhcnQ6ICctICcsXG4gICAgICAgIGNtZDogJ0luc2VydFVub3JkZXJlZExpc3QnXG4gICAgICB9XG4gICAgXTtcbiAgICB2YXIgZ2V0UGF0dGVyblNldCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBwYXR0ZXJucyA9IGVkaXRvci5nZXRQYXJhbSgndGV4dHBhdHRlcm5fcGF0dGVybnMnLCBkZWZhdWx0UGF0dGVybnMsICdhcnJheScpO1xuICAgICAgaWYgKCFpc0FycmF5KHBhdHRlcm5zKSkge1xuICAgICAgICBlcnJvciQxKCdUaGUgc2V0dGluZyB0ZXh0cGF0dGVybl9wYXR0ZXJucyBzaG91bGQgYmUgYW4gYXJyYXknKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpbmxpbmVQYXR0ZXJuczogW10sXG4gICAgICAgICAgYmxvY2tQYXR0ZXJuczogW11cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHZhciBub3JtYWxpemVkID0gcGFydGl0aW9uKG1hcChwYXR0ZXJucywgbm9ybWFsaXplUGF0dGVybikpO1xuICAgICAgZWFjaChub3JtYWxpemVkLmVycm9ycywgZnVuY3Rpb24gKGVycikge1xuICAgICAgICByZXR1cm4gZXJyb3IkMShlcnIubWVzc2FnZSwgZXJyLnBhdHRlcm4pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gY3JlYXRlUGF0dGVyblNldChub3JtYWxpemVkLnZhbHVlcyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0Rm9yY2VkUm9vdEJsb2NrID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGJsb2NrID0gZWRpdG9yLmdldFBhcmFtKCdmb3JjZWRfcm9vdF9ibG9jaycsICdwJyk7XG4gICAgICBpZiAoYmxvY2sgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH0gZWxzZSBpZiAoYmxvY2sgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuICdwJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBibG9jaztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGdsb2JhbCQxID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UudXRpbC5EZWxheScpO1xuXG4gICAgdmFyIGdsb2JhbCQyID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UudXRpbC5WSycpO1xuXG4gICAgdmFyIHplcm9XaWR0aCA9ICdcXHVGRUZGJztcbiAgICB2YXIgbmJzcCA9ICdcXHhBMCc7XG5cbiAgICB2YXIgZ2xvYmFsJDMgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS51dGlsLlRvb2xzJyk7XG5cbiAgICB2YXIgZ2xvYmFsJDQgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5kb20uRE9NVXRpbHMnKTtcblxuICAgIHZhciBnbG9iYWwkNSA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLmRvbS5UZXh0U2Vla2VyJyk7XG5cbiAgICB2YXIgcG9pbnQgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBvZmZzZXQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICBvZmZzZXQ6IG9mZnNldFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIGlzVGV4dCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gZG9tR2xvYmFscy5Ob2RlLlRFWFRfTk9ERTtcbiAgICB9O1xuICAgIHZhciBjbGVhbkVtcHR5Tm9kZXMgPSBmdW5jdGlvbiAoZG9tLCBub2RlLCBpc1Jvb3QpIHtcbiAgICAgIGlmIChub2RlICYmIGRvbS5pc0VtcHR5KG5vZGUpICYmICFpc1Jvb3Qobm9kZSkpIHtcbiAgICAgICAgdmFyIHBhcmVudF8xID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICBkb20ucmVtb3ZlKG5vZGUpO1xuICAgICAgICBjbGVhbkVtcHR5Tm9kZXMoZG9tLCBwYXJlbnRfMSwgaXNSb290KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBkZWxldGVSbmcgPSBmdW5jdGlvbiAoZG9tLCBybmcsIGlzUm9vdCwgY2xlYW4pIHtcbiAgICAgIGlmIChjbGVhbiA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGNsZWFuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHZhciBzdGFydFBhcmVudCA9IHJuZy5zdGFydENvbnRhaW5lci5wYXJlbnROb2RlO1xuICAgICAgdmFyIGVuZFBhcmVudCA9IHJuZy5lbmRDb250YWluZXIucGFyZW50Tm9kZTtcbiAgICAgIHJuZy5kZWxldGVDb250ZW50cygpO1xuICAgICAgaWYgKGNsZWFuICYmICFpc1Jvb3Qocm5nLnN0YXJ0Q29udGFpbmVyKSkge1xuICAgICAgICBpZiAoaXNUZXh0KHJuZy5zdGFydENvbnRhaW5lcikgJiYgcm5nLnN0YXJ0Q29udGFpbmVyLmRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgZG9tLnJlbW92ZShybmcuc3RhcnRDb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1RleHQocm5nLmVuZENvbnRhaW5lcikgJiYgcm5nLmVuZENvbnRhaW5lci5kYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGRvbS5yZW1vdmUocm5nLmVuZENvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgY2xlYW5FbXB0eU5vZGVzKGRvbSwgc3RhcnRQYXJlbnQsIGlzUm9vdCk7XG4gICAgICAgIGlmIChzdGFydFBhcmVudCAhPT0gZW5kUGFyZW50KSB7XG4gICAgICAgICAgY2xlYW5FbXB0eU5vZGVzKGRvbSwgZW5kUGFyZW50LCBpc1Jvb3QpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgaXNCbG9ja0Zvcm1hdE5hbWUgPSBmdW5jdGlvbiAobmFtZSwgZm9ybWF0dGVyKSB7XG4gICAgICB2YXIgZm9ybWF0U2V0ID0gZm9ybWF0dGVyLmdldChuYW1lKTtcbiAgICAgIHJldHVybiBpc0FycmF5KGZvcm1hdFNldCkgJiYgaGVhZChmb3JtYXRTZXQpLmV4aXN0cyhmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgICAgIHJldHVybiBoYXMoZm9ybWF0LCAnYmxvY2snKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGlzUmVwbGFjZW1lbnRQYXR0ZXJuID0gZnVuY3Rpb24gKHBhdHRlcm4pIHtcbiAgICAgIHJldHVybiBwYXR0ZXJuLnN0YXJ0Lmxlbmd0aCA9PT0gMDtcbiAgICB9O1xuICAgIHZhciBnZXRQYXJlbnRCbG9jayA9IGZ1bmN0aW9uIChlZGl0b3IsIHJuZykge1xuICAgICAgdmFyIHBhcmVudEJsb2NrT3B0ID0gT3B0aW9uLmZyb20oZWRpdG9yLmRvbS5nZXRQYXJlbnQocm5nLnN0YXJ0Q29udGFpbmVyLCBlZGl0b3IuZG9tLmlzQmxvY2spKTtcbiAgICAgIGlmIChnZXRGb3JjZWRSb290QmxvY2soZWRpdG9yKSA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIHBhcmVudEJsb2NrT3B0Lm9yVGh1bmsoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBPcHRpb24uc29tZShlZGl0b3IuZ2V0Qm9keSgpKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcGFyZW50QmxvY2tPcHQ7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBET00gPSBnbG9iYWwkNC5ET007XG4gICAgdmFyIGFsd2F5c05leHQgPSBmdW5jdGlvbiAoc3RhcnROb2RlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIHN0YXJ0Tm9kZSA9PT0gbm9kZSA/IC0xIDogMDtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgaXNCb3VuZGFyeSA9IGZ1bmN0aW9uIChkb20pIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICByZXR1cm4gZG9tLmlzQmxvY2sobm9kZSkgfHwgY29udGFpbnMoW1xuICAgICAgICAgICdCUicsXG4gICAgICAgICAgJ0lNRycsXG4gICAgICAgICAgJ0hSJyxcbiAgICAgICAgICAnSU5QVVQnXG4gICAgICAgIF0sIG5vZGUubm9kZU5hbWUpIHx8IGRvbS5nZXRDb250ZW50RWRpdGFibGUobm9kZSkgPT09ICdmYWxzZSc7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHRleHRCZWZvcmUgPSBmdW5jdGlvbiAobm9kZSwgb2Zmc2V0LCByb290Tm9kZSkge1xuICAgICAgaWYgKGlzVGV4dChub2RlKSAmJiBvZmZzZXQgPj0gMCkge1xuICAgICAgICByZXR1cm4gT3B0aW9uLnNvbWUocG9pbnQobm9kZSwgb2Zmc2V0KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgdGV4dFNlZWtlciA9IGdsb2JhbCQ1KERPTSk7XG4gICAgICAgIHJldHVybiBPcHRpb24uZnJvbSh0ZXh0U2Vla2VyLmJhY2t3YXJkcyhub2RlLCBvZmZzZXQsIGFsd2F5c05leHQobm9kZSksIHJvb3ROb2RlKSkubWFwKGZ1bmN0aW9uIChwcmV2KSB7XG4gICAgICAgICAgcmV0dXJuIHBvaW50KHByZXYuY29udGFpbmVyLCBwcmV2LmNvbnRhaW5lci5kYXRhLmxlbmd0aCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHRleHRBZnRlciA9IGZ1bmN0aW9uIChub2RlLCBvZmZzZXQsIHJvb3ROb2RlKSB7XG4gICAgICBpZiAoaXNUZXh0KG5vZGUpICYmIG9mZnNldCA+PSBub2RlLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gT3B0aW9uLnNvbWUocG9pbnQobm9kZSwgb2Zmc2V0KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgdGV4dFNlZWtlciA9IGdsb2JhbCQ1KERPTSk7XG4gICAgICAgIHJldHVybiBPcHRpb24uZnJvbSh0ZXh0U2Vla2VyLmZvcndhcmRzKG5vZGUsIG9mZnNldCwgYWx3YXlzTmV4dChub2RlKSwgcm9vdE5vZGUpKS5tYXAoZnVuY3Rpb24gKHByZXYpIHtcbiAgICAgICAgICByZXR1cm4gcG9pbnQocHJldi5jb250YWluZXIsIDApO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBzY2FuTGVmdCA9IGZ1bmN0aW9uIChub2RlLCBvZmZzZXQsIHJvb3ROb2RlKSB7XG4gICAgICBpZiAoIWlzVGV4dChub2RlKSkge1xuICAgICAgICByZXR1cm4gT3B0aW9uLm5vbmUoKTtcbiAgICAgIH1cbiAgICAgIHZhciB0ZXh0ID0gbm9kZS50ZXh0Q29udGVudDtcbiAgICAgIGlmIChvZmZzZXQgPj0gMCAmJiBvZmZzZXQgPD0gdGV4dC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIE9wdGlvbi5zb21lKHBvaW50KG5vZGUsIG9mZnNldCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHRleHRTZWVrZXIgPSBnbG9iYWwkNShET00pO1xuICAgICAgICByZXR1cm4gT3B0aW9uLmZyb20odGV4dFNlZWtlci5iYWNrd2FyZHMobm9kZSwgb2Zmc2V0LCBhbHdheXNOZXh0KG5vZGUpLCByb290Tm9kZSkpLmJpbmQoZnVuY3Rpb24gKHByZXYpIHtcbiAgICAgICAgICB2YXIgcHJldlRleHQgPSBwcmV2LmNvbnRhaW5lci5kYXRhO1xuICAgICAgICAgIHJldHVybiBzY2FuTGVmdChwcmV2LmNvbnRhaW5lciwgb2Zmc2V0ICsgcHJldlRleHQubGVuZ3RoLCByb290Tm9kZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHNjYW5SaWdodCA9IGZ1bmN0aW9uIChub2RlLCBvZmZzZXQsIHJvb3ROb2RlKSB7XG4gICAgICBpZiAoIWlzVGV4dChub2RlKSkge1xuICAgICAgICByZXR1cm4gT3B0aW9uLm5vbmUoKTtcbiAgICAgIH1cbiAgICAgIHZhciB0ZXh0ID0gbm9kZS50ZXh0Q29udGVudDtcbiAgICAgIGlmIChvZmZzZXQgPD0gdGV4dC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIE9wdGlvbi5zb21lKHBvaW50KG5vZGUsIG9mZnNldCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHRleHRTZWVrZXIgPSBnbG9iYWwkNShET00pO1xuICAgICAgICByZXR1cm4gT3B0aW9uLmZyb20odGV4dFNlZWtlci5mb3J3YXJkcyhub2RlLCBvZmZzZXQsIGFsd2F5c05leHQobm9kZSksIHJvb3ROb2RlKSkuYmluZChmdW5jdGlvbiAobmV4dCkge1xuICAgICAgICAgIHJldHVybiBzY2FuUmlnaHQobmV4dC5jb250YWluZXIsIG9mZnNldCAtIHRleHQubGVuZ3RoLCByb290Tm9kZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHJlcGVhdExlZnQgPSBmdW5jdGlvbiAoZG9tLCBub2RlLCBvZmZzZXQsIHByb2Nlc3MsIHJvb3ROb2RlKSB7XG4gICAgICB2YXIgc2VhcmNoID0gZ2xvYmFsJDUoZG9tLCBpc0JvdW5kYXJ5KGRvbSkpO1xuICAgICAgcmV0dXJuIE9wdGlvbi5mcm9tKHNlYXJjaC5iYWNrd2FyZHMobm9kZSwgb2Zmc2V0LCBwcm9jZXNzLCByb290Tm9kZSkpO1xuICAgIH07XG5cbiAgICB2YXIgZ2VuZXJhdGVQYXRoID0gZnVuY3Rpb24gKHJvb3QsIG5vZGUsIG9mZnNldCkge1xuICAgICAgaWYgKGlzVGV4dChub2RlKSAmJiAob2Zmc2V0IDwgMCB8fCBvZmZzZXQgPiBub2RlLmRhdGEubGVuZ3RoKSkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgICB2YXIgcCA9IFtvZmZzZXRdO1xuICAgICAgdmFyIGN1cnJlbnQgPSBub2RlO1xuICAgICAgd2hpbGUgKGN1cnJlbnQgIT09IHJvb3QgJiYgY3VycmVudC5wYXJlbnROb2RlKSB7XG4gICAgICAgIHZhciBwYXJlbnRfMSA9IGN1cnJlbnQucGFyZW50Tm9kZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJlbnRfMS5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHBhcmVudF8xLmNoaWxkTm9kZXNbaV0gPT09IGN1cnJlbnQpIHtcbiAgICAgICAgICAgIHAucHVzaChpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50ID0gcGFyZW50XzE7XG4gICAgICB9XG4gICAgICByZXR1cm4gY3VycmVudCA9PT0gcm9vdCA/IHAucmV2ZXJzZSgpIDogW107XG4gICAgfTtcbiAgICB2YXIgZ2VuZXJhdGVQYXRoUmFuZ2UgPSBmdW5jdGlvbiAocm9vdCwgc3RhcnROb2RlLCBzdGFydE9mZnNldCwgZW5kTm9kZSwgZW5kT2Zmc2V0KSB7XG4gICAgICB2YXIgc3RhcnQgPSBnZW5lcmF0ZVBhdGgocm9vdCwgc3RhcnROb2RlLCBzdGFydE9mZnNldCk7XG4gICAgICB2YXIgZW5kID0gZ2VuZXJhdGVQYXRoKHJvb3QsIGVuZE5vZGUsIGVuZE9mZnNldCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgIGVuZDogZW5kXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHJlc29sdmVQYXRoID0gZnVuY3Rpb24gKHJvb3QsIHBhdGgpIHtcbiAgICAgIHZhciBub2RlUGF0aCA9IHBhdGguc2xpY2UoKTtcbiAgICAgIHZhciBvZmZzZXQgPSBub2RlUGF0aC5wb3AoKTtcbiAgICAgIHJldHVybiBmb2xkbChub2RlUGF0aCwgZnVuY3Rpb24gKG9wdE5vZGUsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBvcHROb2RlLmJpbmQoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICByZXR1cm4gT3B0aW9uLmZyb20obm9kZS5jaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgICAgIH0pO1xuICAgICAgfSwgT3B0aW9uLnNvbWUocm9vdCkpLmJpbmQoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgaWYgKGlzVGV4dChub2RlKSAmJiBvZmZzZXQgPj0gMCAmJiBvZmZzZXQgPD0gbm9kZS5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiBPcHRpb24uc29tZSh7XG4gICAgICAgICAgICBub2RlOiBub2RlLFxuICAgICAgICAgICAgb2Zmc2V0OiBvZmZzZXRcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gT3B0aW9uLnNvbWUoe1xuICAgICAgICAgICAgbm9kZTogbm9kZSxcbiAgICAgICAgICAgIG9mZnNldDogb2Zmc2V0XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHJlc29sdmVQYXRoUmFuZ2UgPSBmdW5jdGlvbiAocm9vdCwgcmFuZ2UpIHtcbiAgICAgIHJldHVybiByZXNvbHZlUGF0aChyb290LCByYW5nZS5zdGFydCkuYmluZChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIHN0YXJ0Tm9kZSA9IF9hLm5vZGUsIHN0YXJ0T2Zmc2V0ID0gX2Eub2Zmc2V0O1xuICAgICAgICByZXR1cm4gcmVzb2x2ZVBhdGgocm9vdCwgcmFuZ2UuZW5kKS5tYXAoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgdmFyIGVuZE5vZGUgPSBfYS5ub2RlLCBlbmRPZmZzZXQgPSBfYS5vZmZzZXQ7XG4gICAgICAgICAgdmFyIHJuZyA9IGRvbUdsb2JhbHMuZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgICBybmcuc2V0U3RhcnQoc3RhcnROb2RlLCBzdGFydE9mZnNldCk7XG4gICAgICAgICAgcm5nLnNldEVuZChlbmROb2RlLCBlbmRPZmZzZXQpO1xuICAgICAgICAgIHJldHVybiBybmc7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgZ2VuZXJhdGVQYXRoUmFuZ2VGcm9tUmFuZ2UgPSBmdW5jdGlvbiAocm9vdCwgcmFuZ2UpIHtcbiAgICAgIHJldHVybiBnZW5lcmF0ZVBhdGhSYW5nZShyb290LCByYW5nZS5zdGFydENvbnRhaW5lciwgcmFuZ2Uuc3RhcnRPZmZzZXQsIHJhbmdlLmVuZENvbnRhaW5lciwgcmFuZ2UuZW5kT2Zmc2V0KTtcbiAgICB9O1xuXG4gICAgdmFyIHN0cmlwUGF0dGVybiA9IGZ1bmN0aW9uIChkb20sIGJsb2NrLCBwYXR0ZXJuKSB7XG4gICAgICB2YXIgZmlyc3RUZXh0Tm9kZSA9IHRleHRBZnRlcihibG9jaywgMCwgYmxvY2spO1xuICAgICAgZmlyc3RUZXh0Tm9kZS5lYWNoKGZ1bmN0aW9uIChzcG90KSB7XG4gICAgICAgIHZhciBub2RlID0gc3BvdC5jb250YWluZXI7XG4gICAgICAgIHNjYW5SaWdodChub2RlLCBwYXR0ZXJuLnN0YXJ0Lmxlbmd0aCwgYmxvY2spLmVhY2goZnVuY3Rpb24gKGVuZCkge1xuICAgICAgICAgIHZhciBybmcgPSBkb20uY3JlYXRlUm5nKCk7XG4gICAgICAgICAgcm5nLnNldFN0YXJ0KG5vZGUsIDApO1xuICAgICAgICAgIHJuZy5zZXRFbmQoZW5kLmNvbnRhaW5lciwgZW5kLm9mZnNldCk7XG4gICAgICAgICAgZGVsZXRlUm5nKGRvbSwgcm5nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGUgPT09IGJsb2NrO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGFwcGx5UGF0dGVybiA9IGZ1bmN0aW9uIChlZGl0b3IsIG1hdGNoKSB7XG4gICAgICB2YXIgZG9tID0gZWRpdG9yLmRvbTtcbiAgICAgIHZhciBwYXR0ZXJuID0gbWF0Y2gucGF0dGVybjtcbiAgICAgIHZhciBybmcgPSByZXNvbHZlUGF0aFJhbmdlKGRvbS5nZXRSb290KCksIG1hdGNoLnJhbmdlKS5nZXRPckRpZSgnVW5hYmxlIHRvIHJlc29sdmUgcGF0aCByYW5nZScpO1xuICAgICAgZ2V0UGFyZW50QmxvY2soZWRpdG9yLCBybmcpLmVhY2goZnVuY3Rpb24gKGJsb2NrKSB7XG4gICAgICAgIGlmIChwYXR0ZXJuLnR5cGUgPT09ICdibG9jay1mb3JtYXQnKSB7XG4gICAgICAgICAgaWYgKGlzQmxvY2tGb3JtYXROYW1lKHBhdHRlcm4uZm9ybWF0LCBlZGl0b3IuZm9ybWF0dGVyKSkge1xuICAgICAgICAgICAgZWRpdG9yLnVuZG9NYW5hZ2VyLnRyYW5zYWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgc3RyaXBQYXR0ZXJuKGVkaXRvci5kb20sIGJsb2NrLCBwYXR0ZXJuKTtcbiAgICAgICAgICAgICAgZWRpdG9yLmZvcm1hdHRlci5hcHBseShwYXR0ZXJuLmZvcm1hdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocGF0dGVybi50eXBlID09PSAnYmxvY2stY29tbWFuZCcpIHtcbiAgICAgICAgICBlZGl0b3IudW5kb01hbmFnZXIudHJhbnNhY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RyaXBQYXR0ZXJuKGVkaXRvci5kb20sIGJsb2NrLCBwYXR0ZXJuKTtcbiAgICAgICAgICAgIGVkaXRvci5leGVjQ29tbWFuZChwYXR0ZXJuLmNtZCwgZmFsc2UsIHBhdHRlcm4udmFsdWUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgdmFyIGZpbmRQYXR0ZXJuID0gZnVuY3Rpb24gKHBhdHRlcm5zLCB0ZXh0KSB7XG4gICAgICB2YXIgbnVUZXh0ID0gdGV4dC5yZXBsYWNlKG5ic3AsICcgJyk7XG4gICAgICByZXR1cm4gZmluZChwYXR0ZXJucywgZnVuY3Rpb24gKHBhdHRlcm4pIHtcbiAgICAgICAgaWYgKHRleHQuaW5kZXhPZihwYXR0ZXJuLnN0YXJ0KSAhPT0gMCAmJiBudVRleHQuaW5kZXhPZihwYXR0ZXJuLnN0YXJ0KSAhPT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGZpbmRQYXR0ZXJucyA9IGZ1bmN0aW9uIChlZGl0b3IsIHBhdHRlcm5zKSB7XG4gICAgICB2YXIgZG9tID0gZWRpdG9yLmRvbTtcbiAgICAgIHZhciBybmcgPSBlZGl0b3Iuc2VsZWN0aW9uLmdldFJuZygpO1xuICAgICAgcmV0dXJuIGdldFBhcmVudEJsb2NrKGVkaXRvciwgcm5nKS5maWx0ZXIoZnVuY3Rpb24gKGJsb2NrKSB7XG4gICAgICAgIHZhciBmb3JjZWRSb290QmxvY2sgPSBnZXRGb3JjZWRSb290QmxvY2soZWRpdG9yKTtcbiAgICAgICAgdmFyIG1hdGNoZXNGb3JjZWRSb290QmxvY2sgPSBmb3JjZWRSb290QmxvY2sgPT09ICcnICYmIGRvbS5pcyhibG9jaywgJ2JvZHknKSB8fCBkb20uaXMoYmxvY2ssIGZvcmNlZFJvb3RCbG9jayk7XG4gICAgICAgIHJldHVybiBibG9jayAhPT0gbnVsbCAmJiBtYXRjaGVzRm9yY2VkUm9vdEJsb2NrO1xuICAgICAgfSkuYmluZChmdW5jdGlvbiAoYmxvY2spIHtcbiAgICAgICAgdmFyIGJsb2NrVGV4dCA9IGJsb2NrLnRleHRDb250ZW50O1xuICAgICAgICB2YXIgbWF0Y2hlZFBhdHRlcm4gPSBmaW5kUGF0dGVybihwYXR0ZXJucywgYmxvY2tUZXh0KTtcbiAgICAgICAgcmV0dXJuIG1hdGNoZWRQYXR0ZXJuLm1hcChmdW5jdGlvbiAocGF0dGVybikge1xuICAgICAgICAgIGlmIChnbG9iYWwkMy50cmltKGJsb2NrVGV4dCkubGVuZ3RoID09PSBwYXR0ZXJuLnN0YXJ0Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgICAgcGF0dGVybjogcGF0dGVybixcbiAgICAgICAgICAgICAgcmFuZ2U6IGdlbmVyYXRlUGF0aFJhbmdlKGRvbS5nZXRSb290KCksIGJsb2NrLCAwLCBibG9jaywgMClcbiAgICAgICAgICAgIH1dO1xuICAgICAgICB9KTtcbiAgICAgIH0pLmdldE9yKFtdKTtcbiAgICB9O1xuICAgIHZhciBhcHBseU1hdGNoZXMgPSBmdW5jdGlvbiAoZWRpdG9yLCBtYXRjaGVzKSB7XG4gICAgICBpZiAobWF0Y2hlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGJvb2ttYXJrID0gZWRpdG9yLnNlbGVjdGlvbi5nZXRCb29rbWFyaygpO1xuICAgICAgZWFjaChtYXRjaGVzLCBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIGFwcGx5UGF0dGVybihlZGl0b3IsIG1hdGNoKTtcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnNlbGVjdGlvbi5tb3ZlVG9Cb29rbWFyayhib29rbWFyayk7XG4gICAgfTtcblxuICAgIHZhciB1bmlxdWUgPSAwO1xuICAgIHZhciBnZW5lcmF0ZSQxID0gZnVuY3Rpb24gKHByZWZpeCkge1xuICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgdmFyIHRpbWUgPSBkYXRlLmdldFRpbWUoKTtcbiAgICAgIHZhciByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMDAwKTtcbiAgICAgIHVuaXF1ZSsrO1xuICAgICAgcmV0dXJuIHByZWZpeCArICdfJyArIHJhbmRvbSArIHVuaXF1ZSArIFN0cmluZyh0aW1lKTtcbiAgICB9O1xuXG4gICAgdmFyIGNoZWNrUmFuZ2UgPSBmdW5jdGlvbiAoc3RyLCBzdWJzdHIsIHN0YXJ0KSB7XG4gICAgICByZXR1cm4gc3Vic3RyID09PSAnJyB8fCBzdHIubGVuZ3RoID49IHN1YnN0ci5sZW5ndGggJiYgc3RyLnN1YnN0cihzdGFydCwgc3RhcnQgKyBzdWJzdHIubGVuZ3RoKSA9PT0gc3Vic3RyO1xuICAgIH07XG4gICAgdmFyIGVuZHNXaXRoID0gZnVuY3Rpb24gKHN0ciwgc3VmZml4KSB7XG4gICAgICByZXR1cm4gY2hlY2tSYW5nZShzdHIsIHN1ZmZpeCwgc3RyLmxlbmd0aCAtIHN1ZmZpeC5sZW5ndGgpO1xuICAgIH07XG5cbiAgICB2YXIgbmV3TWFya2VyID0gZnVuY3Rpb24gKGRvbSwgaWQpIHtcbiAgICAgIHJldHVybiBkb20uY3JlYXRlKCdzcGFuJywge1xuICAgICAgICAnZGF0YS1tY2UtdHlwZSc6ICdib29rbWFyaycsXG4gICAgICAgIGlkOiBpZFxuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgcmFuZ2VGcm9tTWFya2VyID0gZnVuY3Rpb24gKGRvbSwgbWFya2VyKSB7XG4gICAgICB2YXIgcm5nID0gZG9tLmNyZWF0ZVJuZygpO1xuICAgICAgcm5nLnNldFN0YXJ0QWZ0ZXIobWFya2VyLnN0YXJ0KTtcbiAgICAgIHJuZy5zZXRFbmRCZWZvcmUobWFya2VyLmVuZCk7XG4gICAgICByZXR1cm4gcm5nO1xuICAgIH07XG4gICAgdmFyIGNyZWF0ZU1hcmtlciA9IGZ1bmN0aW9uIChkb20sIG1hcmtlclByZWZpeCwgcGF0aFJhbmdlKSB7XG4gICAgICB2YXIgcm5nID0gcmVzb2x2ZVBhdGhSYW5nZShkb20uZ2V0Um9vdCgpLCBwYXRoUmFuZ2UpLmdldE9yRGllKCdVbmFibGUgdG8gcmVzb2x2ZSBwYXRoIHJhbmdlJyk7XG4gICAgICB2YXIgc3RhcnROb2RlID0gcm5nLnN0YXJ0Q29udGFpbmVyO1xuICAgICAgdmFyIGVuZE5vZGUgPSBybmcuZW5kQ29udGFpbmVyO1xuICAgICAgdmFyIHRleHRFbmQgPSBybmcuZW5kT2Zmc2V0ID09PSAwID8gZW5kTm9kZSA6IGVuZE5vZGUuc3BsaXRUZXh0KHJuZy5lbmRPZmZzZXQpO1xuICAgICAgdmFyIHRleHRTdGFydCA9IHJuZy5zdGFydE9mZnNldCA9PT0gMCA/IHN0YXJ0Tm9kZSA6IHN0YXJ0Tm9kZS5zcGxpdFRleHQocm5nLnN0YXJ0T2Zmc2V0KTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHByZWZpeDogbWFya2VyUHJlZml4LFxuICAgICAgICBlbmQ6IHRleHRFbmQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3TWFya2VyKGRvbSwgbWFya2VyUHJlZml4ICsgJy1lbmQnKSwgdGV4dEVuZCksXG4gICAgICAgIHN0YXJ0OiB0ZXh0U3RhcnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3TWFya2VyKGRvbSwgbWFya2VyUHJlZml4ICsgJy1zdGFydCcpLCB0ZXh0U3RhcnQpXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHJlbW92ZU1hcmtlciA9IGZ1bmN0aW9uIChkb20sIG1hcmtlciwgaXNSb290KSB7XG4gICAgICBjbGVhbkVtcHR5Tm9kZXMoZG9tLCBkb20uZ2V0KG1hcmtlci5wcmVmaXggKyAnLWVuZCcpLCBpc1Jvb3QpO1xuICAgICAgY2xlYW5FbXB0eU5vZGVzKGRvbSwgZG9tLmdldChtYXJrZXIucHJlZml4ICsgJy1zdGFydCcpLCBpc1Jvb3QpO1xuICAgIH07XG5cbiAgICB2YXIgbWF0Y2hlc1BhdHRlcm4gPSBmdW5jdGlvbiAoZG9tLCBibG9jaywgcGF0dGVybkNvbnRlbnQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoZWxlbWVudCwgb2Zmc2V0KSB7XG4gICAgICAgIHZhciB0ZXh0ID0gZWxlbWVudC5kYXRhO1xuICAgICAgICB2YXIgc2VhcmNoVGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIG9mZnNldCk7XG4gICAgICAgIHZhciBzdGFydEVuZEluZGV4ID0gc2VhcmNoVGV4dC5sYXN0SW5kZXhPZihwYXR0ZXJuQ29udGVudC5jaGFyQXQocGF0dGVybkNvbnRlbnQubGVuZ3RoIC0gMSkpO1xuICAgICAgICB2YXIgc3RhcnRJbmRleCA9IHNlYXJjaFRleHQubGFzdEluZGV4T2YocGF0dGVybkNvbnRlbnQpO1xuICAgICAgICBpZiAoc3RhcnRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICByZXR1cm4gc3RhcnRJbmRleCArIHBhdHRlcm5Db250ZW50Lmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIGlmIChzdGFydEVuZEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIHJldHVybiBzdGFydEVuZEluZGV4ICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgZmluZFBhdHRlcm5TdGFydEZyb21TcG90ID0gZnVuY3Rpb24gKGRvbSwgcGF0dGVybiwgYmxvY2ssIHNwb3QpIHtcbiAgICAgIHZhciBzdGFydFBhdHRlcm4gPSBwYXR0ZXJuLnN0YXJ0O1xuICAgICAgdmFyIHN0YXJ0U3BvdCA9IHJlcGVhdExlZnQoZG9tLCBzcG90LmNvbnRhaW5lciwgc3BvdC5vZmZzZXQsIG1hdGNoZXNQYXR0ZXJuKGRvbSwgYmxvY2ssIHN0YXJ0UGF0dGVybiksIGJsb2NrKTtcbiAgICAgIHJldHVybiBzdGFydFNwb3QuYmluZChmdW5jdGlvbiAoc3BvdCkge1xuICAgICAgICBpZiAoc3BvdC5vZmZzZXQgPj0gc3RhcnRQYXR0ZXJuLmxlbmd0aCkge1xuICAgICAgICAgIHZhciBybmcgPSBkb20uY3JlYXRlUm5nKCk7XG4gICAgICAgICAgcm5nLnNldFN0YXJ0KHNwb3QuY29udGFpbmVyLCBzcG90Lm9mZnNldCAtIHN0YXJ0UGF0dGVybi5sZW5ndGgpO1xuICAgICAgICAgIHJuZy5zZXRFbmQoc3BvdC5jb250YWluZXIsIHNwb3Qub2Zmc2V0KTtcbiAgICAgICAgICByZXR1cm4gT3B0aW9uLnNvbWUocm5nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgb2Zmc2V0ID0gc3BvdC5vZmZzZXQgLSBzdGFydFBhdHRlcm4ubGVuZ3RoO1xuICAgICAgICAgIHJldHVybiBzY2FuTGVmdChzcG90LmNvbnRhaW5lciwgb2Zmc2V0LCBibG9jaykubWFwKGZ1bmN0aW9uIChuZXh0U3BvdCkge1xuICAgICAgICAgICAgdmFyIHJuZyA9IGRvbS5jcmVhdGVSbmcoKTtcbiAgICAgICAgICAgIHJuZy5zZXRTdGFydChuZXh0U3BvdC5jb250YWluZXIsIG5leHRTcG90Lm9mZnNldCk7XG4gICAgICAgICAgICBybmcuc2V0RW5kKHNwb3QuY29udGFpbmVyLCBzcG90Lm9mZnNldCk7XG4gICAgICAgICAgICByZXR1cm4gcm5nO1xuICAgICAgICAgIH0pLmZpbHRlcihmdW5jdGlvbiAocm5nKSB7XG4gICAgICAgICAgICByZXR1cm4gcm5nLnRvU3RyaW5nKCkgPT09IHN0YXJ0UGF0dGVybjtcbiAgICAgICAgICB9KS5vclRodW5rKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBmaW5kUGF0dGVyblN0YXJ0RnJvbVNwb3QoZG9tLCBwYXR0ZXJuLCBibG9jaywgcG9pbnQoc3BvdC5jb250YWluZXIsIDApKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgZmluZFBhdHRlcm5TdGFydCA9IGZ1bmN0aW9uIChkb20sIHBhdHRlcm4sIG5vZGUsIG9mZnNldCwgYmxvY2ssIHJlcXVpcmVHYXApIHtcbiAgICAgIGlmIChyZXF1aXJlR2FwID09PSB2b2lkIDApIHtcbiAgICAgICAgcmVxdWlyZUdhcCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHBhdHRlcm4uc3RhcnQubGVuZ3RoID09PSAwICYmICFyZXF1aXJlR2FwKSB7XG4gICAgICAgIHZhciBybmcgPSBkb20uY3JlYXRlUm5nKCk7XG4gICAgICAgIHJuZy5zZXRTdGFydChub2RlLCBvZmZzZXQpO1xuICAgICAgICBybmcuc2V0RW5kKG5vZGUsIG9mZnNldCk7XG4gICAgICAgIHJldHVybiBPcHRpb24uc29tZShybmcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRleHRCZWZvcmUobm9kZSwgb2Zmc2V0LCBibG9jaykuYmluZChmdW5jdGlvbiAoc3BvdCkge1xuICAgICAgICB2YXIgc3RhcnQgPSBmaW5kUGF0dGVyblN0YXJ0RnJvbVNwb3QoZG9tLCBwYXR0ZXJuLCBibG9jaywgc3BvdCk7XG4gICAgICAgIHJldHVybiBzdGFydC5iaW5kKGZ1bmN0aW9uIChzdGFydFJhbmdlKSB7XG4gICAgICAgICAgaWYgKHJlcXVpcmVHYXApIHtcbiAgICAgICAgICAgIGlmIChzdGFydFJhbmdlLmVuZENvbnRhaW5lciA9PT0gc3BvdC5jb250YWluZXIgJiYgc3RhcnRSYW5nZS5lbmRPZmZzZXQgPT09IHNwb3Qub2Zmc2V0KSB7XG4gICAgICAgICAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzcG90Lm9mZnNldCA9PT0gMCAmJiBzdGFydFJhbmdlLmVuZENvbnRhaW5lci50ZXh0Q29udGVudC5sZW5ndGggPT09IHN0YXJ0UmFuZ2UuZW5kT2Zmc2V0KSB7XG4gICAgICAgICAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gT3B0aW9uLnNvbWUoc3RhcnRSYW5nZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgZmluZFBhdHRlcm4kMSA9IGZ1bmN0aW9uIChlZGl0b3IsIGJsb2NrLCBkZXRhaWxzKSB7XG4gICAgICB2YXIgZG9tID0gZWRpdG9yLmRvbTtcbiAgICAgIHZhciByb290ID0gZG9tLmdldFJvb3QoKTtcbiAgICAgIHZhciBwYXR0ZXJuID0gZGV0YWlscy5wYXR0ZXJuO1xuICAgICAgdmFyIGVuZE5vZGUgPSBkZXRhaWxzLnBvc2l0aW9uLmNvbnRhaW5lcjtcbiAgICAgIHZhciBlbmRPZmZzZXQgPSBkZXRhaWxzLnBvc2l0aW9uLm9mZnNldDtcbiAgICAgIHJldHVybiBzY2FuTGVmdChlbmROb2RlLCBlbmRPZmZzZXQgLSBkZXRhaWxzLnBhdHRlcm4uZW5kLmxlbmd0aCwgYmxvY2spLmJpbmQoZnVuY3Rpb24gKHNwb3QpIHtcbiAgICAgICAgdmFyIGVuZFBhdGhSbmcgPSBnZW5lcmF0ZVBhdGhSYW5nZShyb290LCBzcG90LmNvbnRhaW5lciwgc3BvdC5vZmZzZXQsIGVuZE5vZGUsIGVuZE9mZnNldCk7XG4gICAgICAgIGlmIChpc1JlcGxhY2VtZW50UGF0dGVybihwYXR0ZXJuKSkge1xuICAgICAgICAgIHJldHVybiBPcHRpb24uc29tZSh7XG4gICAgICAgICAgICBtYXRjaGVzOiBbe1xuICAgICAgICAgICAgICAgIHBhdHRlcm46IHBhdHRlcm4sXG4gICAgICAgICAgICAgICAgc3RhcnRSbmc6IGVuZFBhdGhSbmcsXG4gICAgICAgICAgICAgICAgZW5kUm5nOiBlbmRQYXRoUm5nXG4gICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgcG9zaXRpb246IHNwb3RcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgcmVzdWx0c09wdCA9IGZpbmRQYXR0ZXJuc1JlYyhlZGl0b3IsIGRldGFpbHMucmVtYWluaW5nUGF0dGVybnMsIHNwb3QuY29udGFpbmVyLCBzcG90Lm9mZnNldCwgYmxvY2spO1xuICAgICAgICAgIHZhciByZXN1bHRzXzEgPSByZXN1bHRzT3B0LmdldE9yKHtcbiAgICAgICAgICAgIG1hdGNoZXM6IFtdLFxuICAgICAgICAgICAgcG9zaXRpb246IHNwb3RcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YXIgcG9zID0gcmVzdWx0c18xLnBvc2l0aW9uO1xuICAgICAgICAgIHZhciBzdGFydCA9IGZpbmRQYXR0ZXJuU3RhcnQoZG9tLCBwYXR0ZXJuLCBwb3MuY29udGFpbmVyLCBwb3Mub2Zmc2V0LCBibG9jaywgcmVzdWx0c09wdC5pc05vbmUoKSk7XG4gICAgICAgICAgcmV0dXJuIHN0YXJ0Lm1hcChmdW5jdGlvbiAoc3RhcnRSbmcpIHtcbiAgICAgICAgICAgIHZhciBzdGFydFBhdGhSbmcgPSBnZW5lcmF0ZVBhdGhSYW5nZUZyb21SYW5nZShyb290LCBzdGFydFJuZyk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBtYXRjaGVzOiByZXN1bHRzXzEubWF0Y2hlcy5jb25jYXQoW3tcbiAgICAgICAgICAgICAgICAgIHBhdHRlcm46IHBhdHRlcm4sXG4gICAgICAgICAgICAgICAgICBzdGFydFJuZzogc3RhcnRQYXRoUm5nLFxuICAgICAgICAgICAgICAgICAgZW5kUm5nOiBlbmRQYXRoUm5nXG4gICAgICAgICAgICAgICAgfV0pLFxuICAgICAgICAgICAgICBwb3NpdGlvbjogcG9pbnQoc3RhcnRSbmcuc3RhcnRDb250YWluZXIsIHN0YXJ0Um5nLnN0YXJ0T2Zmc2V0KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgZmluZFBhdHRlcm5zUmVjID0gZnVuY3Rpb24gKGVkaXRvciwgcGF0dGVybnMsIG5vZGUsIG9mZnNldCwgYmxvY2spIHtcbiAgICAgIHZhciBkb20gPSBlZGl0b3IuZG9tO1xuICAgICAgcmV0dXJuIHRleHRCZWZvcmUobm9kZSwgb2Zmc2V0LCBkb20uZ2V0Um9vdCgpKS5iaW5kKGZ1bmN0aW9uIChlbmRTcG90KSB7XG4gICAgICAgIHZhciBybmcgPSBkb20uY3JlYXRlUm5nKCk7XG4gICAgICAgIHJuZy5zZXRTdGFydChibG9jaywgMCk7XG4gICAgICAgIHJuZy5zZXRFbmQobm9kZSwgb2Zmc2V0KTtcbiAgICAgICAgdmFyIHRleHQgPSBybmcudG9TdHJpbmcoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXR0ZXJucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBwYXR0ZXJuID0gcGF0dGVybnNbaV07XG4gICAgICAgICAgaWYgKCFlbmRzV2l0aCh0ZXh0LCBwYXR0ZXJuLmVuZCkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgcGF0dGVybnNXaXRob3V0Q3VycmVudCA9IHBhdHRlcm5zLnNsaWNlKCk7XG4gICAgICAgICAgcGF0dGVybnNXaXRob3V0Q3VycmVudC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IGZpbmRQYXR0ZXJuJDEoZWRpdG9yLCBibG9jaywge1xuICAgICAgICAgICAgcGF0dGVybjogcGF0dGVybixcbiAgICAgICAgICAgIHJlbWFpbmluZ1BhdHRlcm5zOiBwYXR0ZXJuc1dpdGhvdXRDdXJyZW50LFxuICAgICAgICAgICAgcG9zaXRpb246IGVuZFNwb3RcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAocmVzdWx0LmlzU29tZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gT3B0aW9uLm5vbmUoKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGFwcGx5UGF0dGVybiQxID0gZnVuY3Rpb24gKGVkaXRvciwgcGF0dGVybiwgcGF0dGVyblJhbmdlKSB7XG4gICAgICBlZGl0b3Iuc2VsZWN0aW9uLnNldFJuZyhwYXR0ZXJuUmFuZ2UpO1xuICAgICAgaWYgKHBhdHRlcm4udHlwZSA9PT0gJ2lubGluZS1mb3JtYXQnKSB7XG4gICAgICAgIGVhY2gocGF0dGVybi5mb3JtYXQsIGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICAgICAgICBlZGl0b3IuZm9ybWF0dGVyLmFwcGx5KGZvcm1hdCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWRpdG9yLmV4ZWNDb21tYW5kKHBhdHRlcm4uY21kLCBmYWxzZSwgcGF0dGVybi52YWx1ZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgYXBwbHlSZXBsYWNlbWVudFBhdHRlcm4gPSBmdW5jdGlvbiAoZWRpdG9yLCBwYXR0ZXJuLCBtYXJrZXIsIGlzUm9vdCkge1xuICAgICAgdmFyIG1hcmtlclJhbmdlID0gcmFuZ2VGcm9tTWFya2VyKGVkaXRvci5kb20sIG1hcmtlcik7XG4gICAgICBkZWxldGVSbmcoZWRpdG9yLmRvbSwgbWFya2VyUmFuZ2UsIGlzUm9vdCk7XG4gICAgICBhcHBseVBhdHRlcm4kMShlZGl0b3IsIHBhdHRlcm4sIG1hcmtlclJhbmdlKTtcbiAgICB9O1xuICAgIHZhciBhcHBseVBhdHRlcm5XaXRoQ29udGVudCA9IGZ1bmN0aW9uIChlZGl0b3IsIHBhdHRlcm4sIHN0YXJ0TWFya2VyLCBlbmRNYXJrZXIsIGlzUm9vdCkge1xuICAgICAgdmFyIGRvbSA9IGVkaXRvci5kb207XG4gICAgICB2YXIgbWFya2VyRW5kUmFuZ2UgPSByYW5nZUZyb21NYXJrZXIoZG9tLCBlbmRNYXJrZXIpO1xuICAgICAgdmFyIG1hcmtlclN0YXJ0UmFuZ2UgPSByYW5nZUZyb21NYXJrZXIoZG9tLCBzdGFydE1hcmtlcik7XG4gICAgICBkZWxldGVSbmcoZG9tLCBtYXJrZXJTdGFydFJhbmdlLCBpc1Jvb3QpO1xuICAgICAgZGVsZXRlUm5nKGRvbSwgbWFya2VyRW5kUmFuZ2UsIGlzUm9vdCk7XG4gICAgICB2YXIgcGF0dGVybk1hcmtlciA9IHtcbiAgICAgICAgcHJlZml4OiBzdGFydE1hcmtlci5wcmVmaXgsXG4gICAgICAgIHN0YXJ0OiBzdGFydE1hcmtlci5lbmQsXG4gICAgICAgIGVuZDogZW5kTWFya2VyLnN0YXJ0XG4gICAgICB9O1xuICAgICAgdmFyIHBhdHRlcm5SYW5nZSA9IHJhbmdlRnJvbU1hcmtlcihkb20sIHBhdHRlcm5NYXJrZXIpO1xuICAgICAgYXBwbHlQYXR0ZXJuJDEoZWRpdG9yLCBwYXR0ZXJuLCBwYXR0ZXJuUmFuZ2UpO1xuICAgIH07XG4gICAgdmFyIGFkZE1hcmtlcnMgPSBmdW5jdGlvbiAoZG9tLCBtYXRjaGVzKSB7XG4gICAgICB2YXIgbWFya2VyUHJlZml4ID0gZ2VuZXJhdGUkMSgnbWNlX3RleHRwYXR0ZXJuJyk7XG4gICAgICB2YXIgbWF0Y2hlc1dpdGhFbmRzID0gZm9sZHIobWF0Y2hlcywgZnVuY3Rpb24gKGFjYywgbWF0Y2gpIHtcbiAgICAgICAgdmFyIGVuZE1hcmtlciA9IGNyZWF0ZU1hcmtlcihkb20sIG1hcmtlclByZWZpeCArICgnX2VuZCcgKyBhY2MubGVuZ3RoKSwgbWF0Y2guZW5kUm5nKTtcbiAgICAgICAgcmV0dXJuIGFjYy5jb25jYXQoW19fYXNzaWduKF9fYXNzaWduKHt9LCBtYXRjaCksIHsgZW5kTWFya2VyOiBlbmRNYXJrZXIgfSldKTtcbiAgICAgIH0sIFtdKTtcbiAgICAgIHJldHVybiBmb2xkcihtYXRjaGVzV2l0aEVuZHMsIGZ1bmN0aW9uIChhY2MsIG1hdGNoKSB7XG4gICAgICAgIHZhciBpZHggPSBtYXRjaGVzV2l0aEVuZHMubGVuZ3RoIC0gYWNjLmxlbmd0aCAtIDE7XG4gICAgICAgIHZhciBzdGFydE1hcmtlciA9IGlzUmVwbGFjZW1lbnRQYXR0ZXJuKG1hdGNoLnBhdHRlcm4pID8gbWF0Y2guZW5kTWFya2VyIDogY3JlYXRlTWFya2VyKGRvbSwgbWFya2VyUHJlZml4ICsgKCdfc3RhcnQnICsgaWR4KSwgbWF0Y2guc3RhcnRSbmcpO1xuICAgICAgICByZXR1cm4gYWNjLmNvbmNhdChbX19hc3NpZ24oX19hc3NpZ24oe30sIG1hdGNoKSwgeyBzdGFydE1hcmtlcjogc3RhcnRNYXJrZXIgfSldKTtcbiAgICAgIH0sIFtdKTtcbiAgICB9O1xuICAgIHZhciBmaW5kUGF0dGVybnMkMSA9IGZ1bmN0aW9uIChlZGl0b3IsIHBhdHRlcm5zLCBzcGFjZSkge1xuICAgICAgdmFyIHJuZyA9IGVkaXRvci5zZWxlY3Rpb24uZ2V0Um5nKCk7XG4gICAgICBpZiAocm5nLmNvbGxhcHNlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGdldFBhcmVudEJsb2NrKGVkaXRvciwgcm5nKS5iaW5kKGZ1bmN0aW9uIChibG9jaykge1xuICAgICAgICB2YXIgb2Zmc2V0ID0gcm5nLnN0YXJ0T2Zmc2V0IC0gKHNwYWNlID8gMSA6IDApO1xuICAgICAgICByZXR1cm4gZmluZFBhdHRlcm5zUmVjKGVkaXRvciwgcGF0dGVybnMsIHJuZy5zdGFydENvbnRhaW5lciwgb2Zmc2V0LCBibG9jayk7XG4gICAgICB9KS5mb2xkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfSwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0Lm1hdGNoZXM7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBhcHBseU1hdGNoZXMkMSA9IGZ1bmN0aW9uIChlZGl0b3IsIG1hdGNoZXMpIHtcbiAgICAgIGlmIChtYXRjaGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgZG9tID0gZWRpdG9yLmRvbTtcbiAgICAgIHZhciBib29rbWFyayA9IGVkaXRvci5zZWxlY3Rpb24uZ2V0Qm9va21hcmsoKTtcbiAgICAgIHZhciBtYXRjaGVzV2l0aE1hcmtlcnMgPSBhZGRNYXJrZXJzKGRvbSwgbWF0Y2hlcyk7XG4gICAgICBlYWNoKG1hdGNoZXNXaXRoTWFya2VycywgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICAgIHZhciBibG9jayA9IGRvbS5nZXRQYXJlbnQobWF0Y2guc3RhcnRNYXJrZXIuc3RhcnQsIGRvbS5pc0Jsb2NrKTtcbiAgICAgICAgdmFyIGlzUm9vdCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgcmV0dXJuIG5vZGUgPT09IGJsb2NrO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoaXNSZXBsYWNlbWVudFBhdHRlcm4obWF0Y2gucGF0dGVybikpIHtcbiAgICAgICAgICBhcHBseVJlcGxhY2VtZW50UGF0dGVybihlZGl0b3IsIG1hdGNoLnBhdHRlcm4sIG1hdGNoLmVuZE1hcmtlciwgaXNSb290KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcHBseVBhdHRlcm5XaXRoQ29udGVudChlZGl0b3IsIG1hdGNoLnBhdHRlcm4sIG1hdGNoLnN0YXJ0TWFya2VyLCBtYXRjaC5lbmRNYXJrZXIsIGlzUm9vdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVtb3ZlTWFya2VyKGRvbSwgbWF0Y2guZW5kTWFya2VyLCBpc1Jvb3QpO1xuICAgICAgICByZW1vdmVNYXJrZXIoZG9tLCBtYXRjaC5zdGFydE1hcmtlciwgaXNSb290KTtcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnNlbGVjdGlvbi5tb3ZlVG9Cb29rbWFyayhib29rbWFyayk7XG4gICAgfTtcblxuICAgIHZhciBoYW5kbGVFbnRlciA9IGZ1bmN0aW9uIChlZGl0b3IsIHBhdHRlcm5TZXQpIHtcbiAgICAgIGlmICghZWRpdG9yLnNlbGVjdGlvbi5pc0NvbGxhcHNlZCgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHZhciBpbmxpbmVNYXRjaGVzID0gZmluZFBhdHRlcm5zJDEoZWRpdG9yLCBwYXR0ZXJuU2V0LmlubGluZVBhdHRlcm5zLCBmYWxzZSk7XG4gICAgICB2YXIgYmxvY2tNYXRjaGVzID0gZmluZFBhdHRlcm5zKGVkaXRvciwgcGF0dGVyblNldC5ibG9ja1BhdHRlcm5zKTtcbiAgICAgIGlmIChibG9ja01hdGNoZXMubGVuZ3RoID4gMCB8fCBpbmxpbmVNYXRjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZWRpdG9yLnVuZG9NYW5hZ2VyLmFkZCgpO1xuICAgICAgICBlZGl0b3IudW5kb01hbmFnZXIuZXh0cmEoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGVkaXRvci5leGVjQ29tbWFuZCgnbWNlSW5zZXJ0TmV3TGluZScpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZWRpdG9yLmluc2VydENvbnRlbnQoemVyb1dpZHRoKTtcbiAgICAgICAgICBhcHBseU1hdGNoZXMkMShlZGl0b3IsIGlubGluZU1hdGNoZXMpO1xuICAgICAgICAgIGFwcGx5TWF0Y2hlcyhlZGl0b3IsIGJsb2NrTWF0Y2hlcyk7XG4gICAgICAgICAgdmFyIHJhbmdlID0gZWRpdG9yLnNlbGVjdGlvbi5nZXRSbmcoKTtcbiAgICAgICAgICB2YXIgc3BvdCA9IHRleHRCZWZvcmUocmFuZ2Uuc3RhcnRDb250YWluZXIsIHJhbmdlLnN0YXJ0T2Zmc2V0LCBlZGl0b3IuZG9tLmdldFJvb3QoKSk7XG4gICAgICAgICAgZWRpdG9yLmV4ZWNDb21tYW5kKCdtY2VJbnNlcnROZXdMaW5lJyk7XG4gICAgICAgICAgc3BvdC5lYWNoKGZ1bmN0aW9uIChzKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHMuY29udGFpbmVyO1xuICAgICAgICAgICAgaWYgKG5vZGUuZGF0YS5jaGFyQXQocy5vZmZzZXQgLSAxKSA9PT0gemVyb1dpZHRoKSB7XG4gICAgICAgICAgICAgIG5vZGUuZGVsZXRlRGF0YShzLm9mZnNldCAtIDEsIDEpO1xuICAgICAgICAgICAgICBjbGVhbkVtcHR5Tm9kZXMoZWRpdG9yLmRvbSwgbm9kZS5wYXJlbnROb2RlLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlID09PSBlZGl0b3IuZG9tLmdldFJvb3QoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIHZhciBoYW5kbGVJbmxpbmVLZXkgPSBmdW5jdGlvbiAoZWRpdG9yLCBwYXR0ZXJuU2V0KSB7XG4gICAgICB2YXIgaW5saW5lTWF0Y2hlcyA9IGZpbmRQYXR0ZXJucyQxKGVkaXRvciwgcGF0dGVyblNldC5pbmxpbmVQYXR0ZXJucywgdHJ1ZSk7XG4gICAgICBpZiAoaW5saW5lTWF0Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGVkaXRvci51bmRvTWFuYWdlci50cmFuc2FjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgYXBwbHlNYXRjaGVzJDEoZWRpdG9yLCBpbmxpbmVNYXRjaGVzKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgY2hlY2tLZXlFdmVudCA9IGZ1bmN0aW9uIChjb2RlcywgZXZlbnQsIHByZWRpY2F0ZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAocHJlZGljYXRlKGNvZGVzW2ldLCBldmVudCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGNoZWNrS2V5Q29kZSA9IGZ1bmN0aW9uIChjb2RlcywgZXZlbnQpIHtcbiAgICAgIHJldHVybiBjaGVja0tleUV2ZW50KGNvZGVzLCBldmVudCwgZnVuY3Rpb24gKGNvZGUsIGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBjb2RlID09PSBldmVudC5rZXlDb2RlICYmIGdsb2JhbCQyLm1vZGlmaWVyUHJlc3NlZChldmVudCkgPT09IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgY2hlY2tDaGFyQ29kZSA9IGZ1bmN0aW9uIChjaGFycywgZXZlbnQpIHtcbiAgICAgIHJldHVybiBjaGVja0tleUV2ZW50KGNoYXJzLCBldmVudCwgZnVuY3Rpb24gKGNociwgZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIGNoci5jaGFyQ29kZUF0KDApID09PSBldmVudC5jaGFyQ29kZTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgc2V0dXAgPSBmdW5jdGlvbiAoZWRpdG9yLCBwYXR0ZXJuc1N0YXRlKSB7XG4gICAgICB2YXIgY2hhckNvZGVzID0gW1xuICAgICAgICAnLCcsXG4gICAgICAgICcuJyxcbiAgICAgICAgJzsnLFxuICAgICAgICAnOicsXG4gICAgICAgICchJyxcbiAgICAgICAgJz8nXG4gICAgICBdO1xuICAgICAgdmFyIGtleUNvZGVzID0gWzMyXTtcbiAgICAgIGVkaXRvci5vbigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzICYmICFnbG9iYWwkMi5tb2RpZmllclByZXNzZWQoZSkpIHtcbiAgICAgICAgICBpZiAoaGFuZGxlRW50ZXIoZWRpdG9yLCBwYXR0ZXJuc1N0YXRlLmdldCgpKSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgdHJ1ZSk7XG4gICAgICBlZGl0b3Iub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGNoZWNrS2V5Q29kZShrZXlDb2RlcywgZSkpIHtcbiAgICAgICAgICBoYW5kbGVJbmxpbmVLZXkoZWRpdG9yLCBwYXR0ZXJuc1N0YXRlLmdldCgpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBlZGl0b3Iub24oJ2tleXByZXNzJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGNoZWNrQ2hhckNvZGUoY2hhckNvZGVzLCBlKSkge1xuICAgICAgICAgIGdsb2JhbCQxLnNldEVkaXRvclRpbWVvdXQoZWRpdG9yLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBoYW5kbGVJbmxpbmVLZXkoZWRpdG9yLCBwYXR0ZXJuc1N0YXRlLmdldCgpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFBsdWdpbiAoKSB7XG4gICAgICBnbG9iYWwuYWRkKCd0ZXh0cGF0dGVybicsIGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgICAgdmFyIHBhdHRlcm5zU3RhdGUgPSBDZWxsKGdldFBhdHRlcm5TZXQoZWRpdG9yKSk7XG4gICAgICAgIHNldHVwKGVkaXRvciwgcGF0dGVybnNTdGF0ZSk7XG4gICAgICAgIHJldHVybiBnZXQocGF0dGVybnNTdGF0ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBQbHVnaW4oKTtcblxufSh3aW5kb3cpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=