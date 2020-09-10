(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~tinymce-plugin-searchreplace~tinymce-plugin-searchreplace-plugin"],{

/***/ "./node_modules/tinymce/plugins/searchreplace/plugin.js":
/*!**************************************************************!*\
  !*** ./node_modules/tinymce/plugins/searchreplace/plugin.js ***!
  \**************************************************************/
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

    var noop = function () {
    };
    var constant = function (value) {
      return function () {
        return value;
      };
    };
    var never = constant(false);
    var always = constant(true);

    var punctuationStr = '[!-#%-*,-\\/:;?@\\[-\\]_{}\xA1\xAB\xB7\xBB\xBF;\xB7\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1361-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u3008\u3009\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30\u2E31\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uff3f\uFF5B\uFF5D\uFF5F-\uFF65]';

    var punctuation = constant(punctuationStr);

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

    var punctuation$1 = punctuation;

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');

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
    var eachr = function (xs, f) {
      for (var i = xs.length - 1; i >= 0; i--) {
        var x = xs[i];
        f(x, i);
      }
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
    var sort = function (xs, comparator) {
      var copy = nativeSlice.call(xs, 0);
      copy.sort(comparator);
      return copy;
    };

    var hasOwnProperty = Object.hasOwnProperty;
    var has = function (obj, key) {
      return hasOwnProperty.call(obj, key);
    };

    var Global = typeof domGlobals.window !== 'undefined' ? domGlobals.window : Function('return this;')();

    var DOCUMENT = 9;
    var DOCUMENT_FRAGMENT = 11;
    var ELEMENT = 1;
    var TEXT = 3;

    var type = function (element) {
      return element.dom().nodeType;
    };
    var isType$1 = function (t) {
      return function (element) {
        return type(element) === t;
      };
    };
    var isText = isType$1(TEXT);

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
    var documentPositionPreceding = function (a, b) {
      return compareDocumentPosition(a, b, domGlobals.Node.DOCUMENT_POSITION_PRECEDING);
    };

    var bypassSelector = function (dom) {
      return dom.nodeType !== ELEMENT && dom.nodeType !== DOCUMENT && dom.nodeType !== DOCUMENT_FRAGMENT || dom.childElementCount === 0;
    };
    var all = function (selector, scope) {
      var base = scope === undefined ? domGlobals.document : scope.dom();
      return bypassSelector(base) ? [] : map(base.querySelectorAll(selector), Element.fromDom);
    };

    var parent = function (element) {
      return Option.from(element.dom().parentNode).map(Element.fromDom);
    };
    var children = function (element) {
      return map(element.dom().childNodes, Element.fromDom);
    };
    var spot = function (element, offset) {
      return {
        element: constant(element),
        offset: constant(offset)
      };
    };
    var leaf = function (element, offset) {
      var cs = children(element);
      return cs.length > 0 && offset < cs.length ? spot(cs[offset], 0) : spot(element, offset);
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
    var wrap = function (element, wrapper) {
      before(element, wrapper);
      append(wrapper, element);
    };

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
    var get = function (element) {
      return api.get(element);
    };

    var supported = isFunction(domGlobals.Element.prototype.attachShadow) && isFunction(domGlobals.Node.prototype.getRootNode);

    var descendants = function (scope, selector) {
      return all(selector, scope);
    };

    var global$2 = tinymce.util.Tools.resolve('tinymce.dom.TreeWalker');

    var isSimpleBoundary = function (dom, node) {
      return dom.isBlock(node) || has(dom.schema.getShortEndedElements(), node.nodeName);
    };
    var isContentEditableFalse = function (dom, node) {
      return dom.getContentEditable(node) === 'false';
    };
    var isContentEditableTrueInCef = function (dom, node) {
      return dom.getContentEditable(node) === 'true' && dom.getContentEditableParent(node.parentNode) === 'false';
    };
    var isHidden = function (dom, node) {
      return !dom.isBlock(node) && has(dom.schema.getWhiteSpaceElements(), node.nodeName);
    };
    var isBoundary = function (dom, node) {
      return isSimpleBoundary(dom, node) || isContentEditableFalse(dom, node) || isHidden(dom, node) || isContentEditableTrueInCef(dom, node);
    };
    var isText$1 = function (node) {
      return node.nodeType === 3;
    };
    var nuSection = function () {
      return {
        sOffset: 0,
        fOffset: 0,
        elements: []
      };
    };
    var toLeaf = function (node, offset) {
      return leaf(Element.fromDom(node), offset);
    };
    var walk = function (dom, walkerFn, startNode, callbacks, endNode, skipStart) {
      if (skipStart === void 0) {
        skipStart = true;
      }
      var next = skipStart ? walkerFn(false) : startNode;
      while (next) {
        var isCefNode = isContentEditableFalse(dom, next);
        if (isCefNode || isHidden(dom, next)) {
          var stopWalking = isCefNode ? callbacks.cef(next) : callbacks.boundary(next);
          if (stopWalking) {
            break;
          } else {
            next = walkerFn(true);
            continue;
          }
        } else if (isSimpleBoundary(dom, next)) {
          if (callbacks.boundary(next)) {
            break;
          }
        } else if (isText$1(next)) {
          callbacks.text(next);
        }
        if (next === endNode) {
          break;
        } else {
          next = walkerFn(false);
        }
      }
    };
    var collectTextToBoundary = function (dom, section, node, rootNode, forwards) {
      if (isBoundary(dom, node)) {
        return;
      }
      var rootBlock = dom.getParent(rootNode, dom.isBlock);
      var walker = new global$2(node, rootBlock);
      var walkerFn = forwards ? walker.next : walker.prev;
      walk(dom, walkerFn, node, {
        boundary: always,
        cef: always,
        text: function (next) {
          if (forwards) {
            section.fOffset += next.length;
          } else {
            section.sOffset += next.length;
          }
          section.elements.push(Element.fromDom(next));
        }
      });
    };
    var collect = function (dom, rootNode, startNode, endNode, callbacks, skipStart) {
      if (skipStart === void 0) {
        skipStart = true;
      }
      var walker = new global$2(startNode, rootNode);
      var sections = [];
      var current = nuSection();
      collectTextToBoundary(dom, current, startNode, rootNode, false);
      var finishSection = function () {
        if (current.elements.length > 0) {
          sections.push(current);
          current = nuSection();
        }
        return false;
      };
      walk(dom, walker.next, startNode, {
        boundary: finishSection,
        cef: function (node) {
          finishSection();
          if (callbacks) {
            sections.push.apply(sections, callbacks.cef(node));
          }
          return false;
        },
        text: function (next) {
          current.elements.push(Element.fromDom(next));
          if (callbacks) {
            callbacks.text(next, current);
          }
        }
      }, endNode, skipStart);
      if (endNode) {
        collectTextToBoundary(dom, current, endNode, rootNode, true);
      }
      finishSection();
      return sections;
    };
    var collectRangeSections = function (dom, rng) {
      var start = toLeaf(rng.startContainer, rng.startOffset);
      var startNode = start.element().dom();
      var end = toLeaf(rng.endContainer, rng.endOffset);
      var endNode = end.element().dom();
      return collect(dom, rng.commonAncestorContainer, startNode, endNode, {
        text: function (node, section) {
          if (node === endNode) {
            section.fOffset += node.length - end.offset();
          } else if (node === startNode) {
            section.sOffset += start.offset();
          }
        },
        cef: function (node) {
          var sections = bind(descendants(Element.fromDom(node), '*[contenteditable=true]'), function (e) {
            var ceTrueNode = e.dom();
            return collect(dom, ceTrueNode, ceTrueNode);
          });
          return sort(sections, function (a, b) {
            return documentPositionPreceding(a.elements[0].dom(), b.elements[0].dom()) ? 1 : -1;
          });
        }
      }, false);
    };
    var fromRng = function (dom, rng) {
      return rng.collapsed ? [] : collectRangeSections(dom, rng);
    };
    var fromNode = function (dom, node) {
      var rng = dom.createRng();
      rng.selectNode(node);
      return fromRng(dom, rng);
    };
    var fromNodes = function (dom, nodes) {
      return bind(nodes, function (node) {
        return fromNode(dom, node);
      });
    };

    var find = function (text, pattern, start, finish) {
      if (start === void 0) {
        start = 0;
      }
      if (finish === void 0) {
        finish = text.length;
      }
      var regex = pattern.regex;
      regex.lastIndex = start;
      var results = [];
      var match;
      while (match = regex.exec(text)) {
        var matchedText = match[pattern.matchIndex];
        var matchStart = match.index + match[0].indexOf(matchedText);
        var matchFinish = matchStart + matchedText.length;
        if (matchFinish > finish) {
          break;
        }
        results.push({
          start: matchStart,
          finish: matchFinish
        });
        regex.lastIndex = matchFinish;
      }
      return results;
    };
    var extract = function (elements, matches) {
      var nodePositions = foldl(elements, function (acc, element) {
        var content = get(element);
        var start = acc.last;
        var finish = start + content.length;
        var positions = bind(matches, function (match, matchIdx) {
          if (match.start < finish && match.finish > start) {
            return [{
                element: element,
                start: Math.max(start, match.start) - start,
                finish: Math.min(finish, match.finish) - start,
                matchId: matchIdx
              }];
          } else {
            return [];
          }
        });
        return {
          results: acc.results.concat(positions),
          last: finish
        };
      }, {
        results: [],
        last: 0
      }).results;
      return groupBy(nodePositions, function (position) {
        return position.matchId;
      });
    };

    var find$1 = function (pattern, sections) {
      return bind(sections, function (section) {
        var elements = section.elements;
        var content = map(elements, get).join('');
        var positions = find(content, pattern, section.sOffset, content.length - section.fOffset);
        return extract(elements, positions);
      });
    };
    var mark = function (matches, replacementNode) {
      eachr(matches, function (match, idx) {
        eachr(match, function (pos) {
          var wrapper = Element.fromDom(replacementNode.cloneNode(false));
          set(wrapper, 'data-mce-index', idx);
          var textNode = pos.element.dom();
          if (textNode.length === pos.finish && pos.start === 0) {
            wrap(pos.element, wrapper);
          } else {
            if (textNode.length !== pos.finish) {
              textNode.splitText(pos.finish);
            }
            var matchNode = textNode.splitText(pos.start);
            wrap(Element.fromDom(matchNode), wrapper);
          }
        });
      });
    };
    var findAndMark = function (dom, pattern, node, replacementNode) {
      var textSections = fromNode(dom, node);
      var matches = find$1(pattern, textSections);
      mark(matches, replacementNode);
      return matches.length;
    };
    var findAndMarkInSelection = function (dom, pattern, selection, replacementNode) {
      var bookmark = selection.getBookmark();
      var nodes = dom.select('td[data-mce-selected],th[data-mce-selected]');
      var textSections = nodes.length > 0 ? fromNodes(dom, nodes) : fromRng(dom, selection.getRng());
      var matches = find$1(pattern, textSections);
      mark(matches, replacementNode);
      selection.moveToBookmark(bookmark);
      return matches.length;
    };

    var getElmIndex = function (elm) {
      var value = elm.getAttribute('data-mce-index');
      if (typeof value === 'number') {
        return '' + value;
      }
      return value;
    };
    var markAllMatches = function (editor, currentSearchState, pattern, inSelection) {
      var marker = editor.dom.create('span', { 'data-mce-bogus': 1 });
      marker.className = 'mce-match-marker';
      var node = editor.getBody();
      done(editor, currentSearchState, false);
      if (inSelection) {
        return findAndMarkInSelection(editor.dom, pattern, editor.selection, marker);
      } else {
        return findAndMark(editor.dom, pattern, node, marker);
      }
    };
    var unwrap = function (node) {
      var parentNode = node.parentNode;
      if (node.firstChild) {
        parentNode.insertBefore(node.firstChild, node);
      }
      node.parentNode.removeChild(node);
    };
    var findSpansByIndex = function (editor, index) {
      var spans = [];
      var nodes = global$1.toArray(editor.getBody().getElementsByTagName('span'));
      if (nodes.length) {
        for (var i = 0; i < nodes.length; i++) {
          var nodeIndex = getElmIndex(nodes[i]);
          if (nodeIndex === null || !nodeIndex.length) {
            continue;
          }
          if (nodeIndex === index.toString()) {
            spans.push(nodes[i]);
          }
        }
      }
      return spans;
    };
    var moveSelection = function (editor, currentSearchState, forward) {
      var searchState = currentSearchState.get();
      var testIndex = searchState.index;
      var dom = editor.dom;
      forward = forward !== false;
      if (forward) {
        if (testIndex + 1 === searchState.count) {
          testIndex = 0;
        } else {
          testIndex++;
        }
      } else {
        if (testIndex - 1 === -1) {
          testIndex = searchState.count - 1;
        } else {
          testIndex--;
        }
      }
      dom.removeClass(findSpansByIndex(editor, searchState.index), 'mce-match-marker-selected');
      var spans = findSpansByIndex(editor, testIndex);
      if (spans.length) {
        dom.addClass(findSpansByIndex(editor, testIndex), 'mce-match-marker-selected');
        editor.selection.scrollIntoView(spans[0]);
        return testIndex;
      }
      return -1;
    };
    var removeNode = function (dom, node) {
      var parent = node.parentNode;
      dom.remove(node);
      if (dom.isEmpty(parent)) {
        dom.remove(parent);
      }
    };
    var escapeSearchText = function (text, wholeWord) {
      var escapedText = text.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&').replace(/\s/g, '[^\\S\\r\\n\\uFEFF]');
      var wordRegex = '(' + escapedText + ')';
      return wholeWord ? '(?:^|\\s|' + punctuation$1() + ')' + wordRegex + ('(?=$|\\s|' + punctuation$1() + ')') : wordRegex;
    };
    var find$2 = function (editor, currentSearchState, text, matchCase, wholeWord, inSelection) {
      var escapedText = escapeSearchText(text, wholeWord);
      var pattern = {
        regex: new RegExp(escapedText, matchCase ? 'g' : 'gi'),
        matchIndex: 1
      };
      var count = markAllMatches(editor, currentSearchState, pattern, inSelection);
      if (count) {
        var newIndex = moveSelection(editor, currentSearchState, true);
        currentSearchState.set({
          index: newIndex,
          count: count,
          text: text,
          matchCase: matchCase,
          wholeWord: wholeWord,
          inSelection: inSelection
        });
      }
      return count;
    };
    var next = function (editor, currentSearchState) {
      var index = moveSelection(editor, currentSearchState, true);
      currentSearchState.set(__assign(__assign({}, currentSearchState.get()), { index: index }));
    };
    var prev = function (editor, currentSearchState) {
      var index = moveSelection(editor, currentSearchState, false);
      currentSearchState.set(__assign(__assign({}, currentSearchState.get()), { index: index }));
    };
    var isMatchSpan = function (node) {
      var matchIndex = getElmIndex(node);
      return matchIndex !== null && matchIndex.length > 0;
    };
    var replace = function (editor, currentSearchState, text, forward, all) {
      var searchState = currentSearchState.get();
      var currentIndex = searchState.index;
      var currentMatchIndex, nextIndex = currentIndex;
      forward = forward !== false;
      var node = editor.getBody();
      var nodes = global$1.grep(global$1.toArray(node.getElementsByTagName('span')), isMatchSpan);
      for (var i = 0; i < nodes.length; i++) {
        var nodeIndex = getElmIndex(nodes[i]);
        var matchIndex = currentMatchIndex = parseInt(nodeIndex, 10);
        if (all || matchIndex === searchState.index) {
          if (text.length) {
            nodes[i].firstChild.nodeValue = text;
            unwrap(nodes[i]);
          } else {
            removeNode(editor.dom, nodes[i]);
          }
          while (nodes[++i]) {
            matchIndex = parseInt(getElmIndex(nodes[i]), 10);
            if (matchIndex === currentMatchIndex) {
              removeNode(editor.dom, nodes[i]);
            } else {
              i--;
              break;
            }
          }
          if (forward) {
            nextIndex--;
          }
        } else if (currentMatchIndex > currentIndex) {
          nodes[i].setAttribute('data-mce-index', String(currentMatchIndex - 1));
        }
      }
      currentSearchState.set(__assign(__assign({}, searchState), {
        count: all ? 0 : searchState.count - 1,
        index: nextIndex
      }));
      if (forward) {
        next(editor, currentSearchState);
      } else {
        prev(editor, currentSearchState);
      }
      return !all && currentSearchState.get().count > 0;
    };
    var done = function (editor, currentSearchState, keepEditorSelection) {
      var i, startContainer, endContainer;
      var searchState = currentSearchState.get();
      var nodes = global$1.toArray(editor.getBody().getElementsByTagName('span'));
      for (i = 0; i < nodes.length; i++) {
        var nodeIndex = getElmIndex(nodes[i]);
        if (nodeIndex !== null && nodeIndex.length) {
          if (nodeIndex === searchState.index.toString()) {
            if (!startContainer) {
              startContainer = nodes[i].firstChild;
            }
            endContainer = nodes[i].firstChild;
          }
          unwrap(nodes[i]);
        }
      }
      currentSearchState.set(__assign(__assign({}, searchState), {
        index: -1,
        count: 0,
        text: ''
      }));
      if (startContainer && endContainer) {
        var rng = editor.dom.createRng();
        rng.setStart(startContainer, 0);
        rng.setEnd(endContainer, endContainer.data.length);
        if (keepEditorSelection !== false) {
          editor.selection.setRng(rng);
        }
        return rng;
      }
    };
    var hasNext = function (editor, currentSearchState) {
      return currentSearchState.get().count > 1;
    };
    var hasPrev = function (editor, currentSearchState) {
      return currentSearchState.get().count > 1;
    };

    var get$1 = function (editor, currentState) {
      var done$1 = function (keepEditorSelection) {
        return done(editor, currentState, keepEditorSelection);
      };
      var find = function (text, matchCase, wholeWord, inSelection) {
        if (inSelection === void 0) {
          inSelection = false;
        }
        return find$2(editor, currentState, text, matchCase, wholeWord, inSelection);
      };
      var next$1 = function () {
        return next(editor, currentState);
      };
      var prev$1 = function () {
        return prev(editor, currentState);
      };
      var replace$1 = function (text, forward, all) {
        return replace(editor, currentState, text, forward, all);
      };
      return {
        done: done$1,
        find: find,
        next: next$1,
        prev: prev$1,
        replace: replace$1
      };
    };

    var value = function () {
      var subject = Cell(Option.none());
      var clear = function () {
        subject.set(Option.none());
      };
      var set = function (s) {
        subject.set(Option.some(s));
      };
      var on = function (f) {
        subject.get().each(f);
      };
      var isSet = function () {
        return subject.get().isSome();
      };
      return {
        clear: clear,
        set: set,
        isSet: isSet,
        on: on
      };
    };

    var global$3 = tinymce.util.Tools.resolve('tinymce.Env');

    var open = function (editor, currentSearchState) {
      var dialogApi = value();
      editor.undoManager.add();
      var selectedText = global$1.trim(editor.selection.getContent({ format: 'text' }));
      function updateButtonStates(api) {
        var updateNext = hasNext(editor, currentSearchState) ? api.enable : api.disable;
        updateNext('next');
        var updatePrev = hasPrev(editor, currentSearchState) ? api.enable : api.disable;
        updatePrev('prev');
      }
      var updateSearchState = function (api) {
        var data = api.getData();
        var current = currentSearchState.get();
        currentSearchState.set(__assign(__assign({}, current), {
          matchCase: data.matchcase,
          wholeWord: data.wholewords,
          inSelection: data.inselection
        }));
      };
      var disableAll = function (api, disable) {
        var buttons = [
          'replace',
          'replaceall',
          'prev',
          'next'
        ];
        var toggle = disable ? api.disable : api.enable;
        each(buttons, toggle);
      };
      function notFoundAlert(api) {
        editor.windowManager.alert('Could not find the specified string.', function () {
          api.focus('findtext');
        });
      }
      var focusButtonIfRequired = function (api, name) {
        if (global$3.browser.isSafari() && global$3.deviceType.isTouch() && (name === 'find' || name === 'replace' || name === 'replaceall')) {
          api.focus(name);
        }
      };
      var reset = function (api) {
        done(editor, currentSearchState, false);
        disableAll(api, true);
        updateButtonStates(api);
      };
      var doFind = function (api) {
        var data = api.getData();
        var last = currentSearchState.get();
        if (!data.findtext.length) {
          reset(api);
          return;
        }
        if (last.text === data.findtext && last.matchCase === data.matchcase && last.wholeWord === data.wholewords) {
          next(editor, currentSearchState);
        } else {
          var count = find$2(editor, currentSearchState, data.findtext, data.matchcase, data.wholewords, data.inselection);
          if (count <= 0) {
            notFoundAlert(api);
          }
          disableAll(api, count === 0);
        }
        updateButtonStates(api);
      };
      var initialState = currentSearchState.get();
      var initialData = {
        findtext: selectedText,
        replacetext: '',
        wholewords: initialState.wholeWord,
        matchcase: initialState.matchCase,
        inselection: initialState.inSelection
      };
      var spec = {
        title: 'Find and Replace',
        size: 'normal',
        body: {
          type: 'panel',
          items: [
            {
              type: 'bar',
              items: [
                {
                  type: 'input',
                  name: 'findtext',
                  placeholder: 'Find',
                  maximized: true,
                  inputMode: 'search'
                },
                {
                  type: 'button',
                  name: 'prev',
                  text: 'Previous',
                  icon: 'action-prev',
                  disabled: true,
                  borderless: true
                },
                {
                  type: 'button',
                  name: 'next',
                  text: 'Next',
                  icon: 'action-next',
                  disabled: true,
                  borderless: true
                }
              ]
            },
            {
              type: 'input',
              name: 'replacetext',
              placeholder: 'Replace with',
              inputMode: 'search'
            }
          ]
        },
        buttons: [
          {
            type: 'menu',
            name: 'options',
            icon: 'preferences',
            tooltip: 'Preferences',
            align: 'start',
            items: [
              {
                type: 'togglemenuitem',
                name: 'matchcase',
                text: 'Match case'
              },
              {
                type: 'togglemenuitem',
                name: 'wholewords',
                text: 'Find whole words only'
              },
              {
                type: 'togglemenuitem',
                name: 'inselection',
                text: 'Find in selection'
              }
            ]
          },
          {
            type: 'custom',
            name: 'find',
            text: 'Find',
            primary: true
          },
          {
            type: 'custom',
            name: 'replace',
            text: 'Replace',
            disabled: true
          },
          {
            type: 'custom',
            name: 'replaceall',
            text: 'Replace All',
            disabled: true
          }
        ],
        initialData: initialData,
        onChange: function (api, details) {
          if (details.name === 'findtext' && currentSearchState.get().count > 0) {
            reset(api);
          }
        },
        onAction: function (api, details) {
          var data = api.getData();
          switch (details.name) {
          case 'find':
            doFind(api);
            break;
          case 'replace':
            if (!replace(editor, currentSearchState, data.replacetext)) {
              reset(api);
            } else {
              updateButtonStates(api);
            }
            break;
          case 'replaceall':
            replace(editor, currentSearchState, data.replacetext, true, true);
            reset(api);
            break;
          case 'prev':
            prev(editor, currentSearchState);
            updateButtonStates(api);
            break;
          case 'next':
            next(editor, currentSearchState);
            updateButtonStates(api);
            break;
          case 'matchcase':
          case 'wholewords':
          case 'inselection':
            updateSearchState(api);
            reset(api);
            break;
          }
          focusButtonIfRequired(api, details.name);
        },
        onSubmit: function (api) {
          doFind(api);
          focusButtonIfRequired(api, 'find');
        },
        onClose: function () {
          editor.focus();
          done(editor, currentSearchState);
          editor.undoManager.add();
        }
      };
      dialogApi.set(editor.windowManager.open(spec, { inline: 'toolbar' }));
    };

    var register = function (editor, currentSearchState) {
      editor.addCommand('SearchReplace', function () {
        open(editor, currentSearchState);
      });
    };

    var showDialog = function (editor, currentSearchState) {
      return function () {
        open(editor, currentSearchState);
      };
    };
    var register$1 = function (editor, currentSearchState) {
      editor.ui.registry.addMenuItem('searchreplace', {
        text: 'Find and replace...',
        shortcut: 'Meta+F',
        onAction: showDialog(editor, currentSearchState),
        icon: 'search'
      });
      editor.ui.registry.addButton('searchreplace', {
        tooltip: 'Find and replace',
        onAction: showDialog(editor, currentSearchState),
        icon: 'search'
      });
      editor.shortcuts.add('Meta+F', '', showDialog(editor, currentSearchState));
    };

    function Plugin () {
      global.add('searchreplace', function (editor) {
        var currentSearchState = Cell({
          index: -1,
          count: 0,
          text: '',
          matchCase: false,
          wholeWord: false,
          inSelection: false
        });
        register(editor, currentSearchState);
        register$1(editor, currentSearchState);
        return get$1(editor, currentSearchState);
      });
    }

    Plugin();

}(window));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL3NlYXJjaHJlcGxhY2UvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxnREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdDQUF3QyxZQUFZLHFCQUFxQjs7QUFFekU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsU0FBUztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLFFBQVE7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFNBQVM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFNBQVM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNHQUFzRzs7QUFFdEc7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxzQkFBc0I7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGtCQUFrQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxFQUFFO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsOEJBQThCLGVBQWU7QUFDOUY7QUFDQTtBQUNBO0FBQ0EsaURBQWlELDhCQUE4QixlQUFlO0FBQzlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixrQkFBa0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0VBQW9FLGlCQUFpQjtBQUNyRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsb0JBQW9CO0FBQ3pFOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTs7QUFFQSxDQUFDIiwiZmlsZSI6InZlbmRvcnN+dGlueW1jZS1wbHVnaW4tc2VhcmNocmVwbGFjZX50aW55bWNlLXBsdWdpbi1zZWFyY2hyZXBsYWNlLXBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICpcbiAqIFZlcnNpb246IDUuNC4yICgyMDIwLTA4LTE3KVxuICovXG4oZnVuY3Rpb24gKGRvbUdsb2JhbHMpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgQ2VsbCA9IGZ1bmN0aW9uIChpbml0aWFsKSB7XG4gICAgICB2YXIgdmFsdWUgPSBpbml0aWFsO1xuICAgICAgdmFyIGdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfTtcbiAgICAgIHZhciBzZXQgPSBmdW5jdGlvbiAodikge1xuICAgICAgICB2YWx1ZSA9IHY7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0OiBnZXQsXG4gICAgICAgIHNldDogc2V0XG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgZ2xvYmFsID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuUGx1Z2luTWFuYWdlcicpO1xuXG4gICAgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24gKCkge1xuICAgICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICBmb3IgKHZhciBwIGluIHMpXG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICAgIH07XG4gICAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgdmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgfTtcbiAgICB2YXIgY29uc3RhbnQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgbmV2ZXIgPSBjb25zdGFudChmYWxzZSk7XG4gICAgdmFyIGFsd2F5cyA9IGNvbnN0YW50KHRydWUpO1xuXG4gICAgdmFyIHB1bmN0dWF0aW9uU3RyID0gJ1shLSMlLSosLVxcXFwvOjs/QFxcXFxbLVxcXFxdX3t9XFx4QTFcXHhBQlxceEI3XFx4QkJcXHhCRjtcXHhCN1xcdTA1NUEtXFx1MDU1RlxcdTA1ODlcXHUwNThBXFx1MDVCRVxcdTA1QzBcXHUwNUMzXFx1MDVDNlxcdTA1RjNcXHUwNUY0XFx1MDYwOVxcdTA2MEFcXHUwNjBDXFx1MDYwRFxcdTA2MUJcXHUwNjFFXFx1MDYxRlxcdTA2NkEtXFx1MDY2RFxcdTA2RDRcXHUwNzAwLVxcdTA3MERcXHUwN0Y3LVxcdTA3RjlcXHUwODMwLVxcdTA4M0VcXHUwODVFXFx1MDk2NFxcdTA5NjVcXHUwOTcwXFx1MERGNFxcdTBFNEZcXHUwRTVBXFx1MEU1QlxcdTBGMDQtXFx1MEYxMlxcdTBGM0EtXFx1MEYzRFxcdTBGODVcXHUwRkQwLVxcdTBGRDRcXHUwRkQ5XFx1MEZEQVxcdTEwNEEtXFx1MTA0RlxcdTEwRkJcXHUxMzYxLVxcdTEzNjhcXHUxNDAwXFx1MTY2RFxcdTE2NkVcXHUxNjlCXFx1MTY5Q1xcdTE2RUItXFx1MTZFRFxcdTE3MzVcXHUxNzM2XFx1MTdENC1cXHUxN0Q2XFx1MTdEOC1cXHUxN0RBXFx1MTgwMC1cXHUxODBBXFx1MTk0NFxcdTE5NDVcXHUxQTFFXFx1MUExRlxcdTFBQTAtXFx1MUFBNlxcdTFBQTgtXFx1MUFBRFxcdTFCNUEtXFx1MUI2MFxcdTFCRkMtXFx1MUJGRlxcdTFDM0ItXFx1MUMzRlxcdTFDN0VcXHUxQzdGXFx1MUNEM1xcdTIwMTAtXFx1MjAyN1xcdTIwMzAtXFx1MjA0M1xcdTIwNDUtXFx1MjA1MVxcdTIwNTMtXFx1MjA1RVxcdTIwN0RcXHUyMDdFXFx1MjA4RFxcdTIwOEVcXHUzMDA4XFx1MzAwOVxcdTI3NjgtXFx1Mjc3NVxcdTI3QzVcXHUyN0M2XFx1MjdFNi1cXHUyN0VGXFx1Mjk4My1cXHUyOTk4XFx1MjlEOC1cXHUyOURCXFx1MjlGQ1xcdTI5RkRcXHUyQ0Y5LVxcdTJDRkNcXHUyQ0ZFXFx1MkNGRlxcdTJENzBcXHUyRTAwLVxcdTJFMkVcXHUyRTMwXFx1MkUzMVxcdTMwMDEtXFx1MzAwM1xcdTMwMDgtXFx1MzAxMVxcdTMwMTQtXFx1MzAxRlxcdTMwMzBcXHUzMDNEXFx1MzBBMFxcdTMwRkJcXHVBNEZFXFx1QTRGRlxcdUE2MEQtXFx1QTYwRlxcdUE2NzNcXHVBNjdFXFx1QTZGMi1cXHVBNkY3XFx1QTg3NC1cXHVBODc3XFx1QThDRVxcdUE4Q0ZcXHVBOEY4LVxcdUE4RkFcXHVBOTJFXFx1QTkyRlxcdUE5NUZcXHVBOUMxLVxcdUE5Q0RcXHVBOURFXFx1QTlERlxcdUFBNUMtXFx1QUE1RlxcdUFBREVcXHVBQURGXFx1QUJFQlxcdUZEM0VcXHVGRDNGXFx1RkUxMC1cXHVGRTE5XFx1RkUzMC1cXHVGRTUyXFx1RkU1NC1cXHVGRTYxXFx1RkU2M1xcdUZFNjhcXHVGRTZBXFx1RkU2QlxcdUZGMDEtXFx1RkYwM1xcdUZGMDUtXFx1RkYwQVxcdUZGMEMtXFx1RkYwRlxcdUZGMUFcXHVGRjFCXFx1RkYxRlxcdUZGMjBcXHVGRjNCLVxcdUZGM0RcXHVmZjNmXFx1RkY1QlxcdUZGNURcXHVGRjVGLVxcdUZGNjVdJztcblxuICAgIHZhciBwdW5jdHVhdGlvbiA9IGNvbnN0YW50KHB1bmN0dWF0aW9uU3RyKTtcblxuICAgIHZhciBub25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIE5PTkU7XG4gICAgfTtcbiAgICB2YXIgTk9ORSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBlcSA9IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgIHJldHVybiBvLmlzTm9uZSgpO1xuICAgICAgfTtcbiAgICAgIHZhciBjYWxsID0gZnVuY3Rpb24gKHRodW5rKSB7XG4gICAgICAgIHJldHVybiB0aHVuaygpO1xuICAgICAgfTtcbiAgICAgIHZhciBpZCA9IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgIHJldHVybiBuO1xuICAgICAgfTtcbiAgICAgIHZhciBtZSA9IHtcbiAgICAgICAgZm9sZDogZnVuY3Rpb24gKG4sIF9zKSB7XG4gICAgICAgICAgcmV0dXJuIG4oKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXM6IG5ldmVyLFxuICAgICAgICBpc1NvbWU6IG5ldmVyLFxuICAgICAgICBpc05vbmU6IGFsd2F5cyxcbiAgICAgICAgZ2V0T3I6IGlkLFxuICAgICAgICBnZXRPclRodW5rOiBjYWxsLFxuICAgICAgICBnZXRPckRpZTogZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cgfHwgJ2Vycm9yOiBnZXRPckRpZSBjYWxsZWQgb24gbm9uZS4nKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0T3JOdWxsOiBjb25zdGFudChudWxsKSxcbiAgICAgICAgZ2V0T3JVbmRlZmluZWQ6IGNvbnN0YW50KHVuZGVmaW5lZCksXG4gICAgICAgIG9yOiBpZCxcbiAgICAgICAgb3JUaHVuazogY2FsbCxcbiAgICAgICAgbWFwOiBub25lLFxuICAgICAgICBlYWNoOiBub29wLFxuICAgICAgICBiaW5kOiBub25lLFxuICAgICAgICBleGlzdHM6IG5ldmVyLFxuICAgICAgICBmb3JhbGw6IGFsd2F5cyxcbiAgICAgICAgZmlsdGVyOiBub25lLFxuICAgICAgICBlcXVhbHM6IGVxLFxuICAgICAgICBlcXVhbHNfOiBlcSxcbiAgICAgICAgdG9BcnJheTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9TdHJpbmc6IGNvbnN0YW50KCdub25lKCknKVxuICAgICAgfTtcbiAgICAgIHJldHVybiBtZTtcbiAgICB9KCk7XG4gICAgdmFyIHNvbWUgPSBmdW5jdGlvbiAoYSkge1xuICAgICAgdmFyIGNvbnN0YW50X2EgPSBjb25zdGFudChhKTtcbiAgICAgIHZhciBzZWxmID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbWU7XG4gICAgICB9O1xuICAgICAgdmFyIGJpbmQgPSBmdW5jdGlvbiAoZikge1xuICAgICAgICByZXR1cm4gZihhKTtcbiAgICAgIH07XG4gICAgICB2YXIgbWUgPSB7XG4gICAgICAgIGZvbGQ6IGZ1bmN0aW9uIChuLCBzKSB7XG4gICAgICAgICAgcmV0dXJuIHMoYSk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgIHJldHVybiBhID09PSB2O1xuICAgICAgICB9LFxuICAgICAgICBpc1NvbWU6IGFsd2F5cyxcbiAgICAgICAgaXNOb25lOiBuZXZlcixcbiAgICAgICAgZ2V0T3I6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yVGh1bms6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yRGllOiBjb25zdGFudF9hLFxuICAgICAgICBnZXRPck51bGw6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yVW5kZWZpbmVkOiBjb25zdGFudF9hLFxuICAgICAgICBvcjogc2VsZixcbiAgICAgICAgb3JUaHVuazogc2VsZixcbiAgICAgICAgbWFwOiBmdW5jdGlvbiAoZikge1xuICAgICAgICAgIHJldHVybiBzb21lKGYoYSkpO1xuICAgICAgICB9LFxuICAgICAgICBlYWNoOiBmdW5jdGlvbiAoZikge1xuICAgICAgICAgIGYoYSk7XG4gICAgICAgIH0sXG4gICAgICAgIGJpbmQ6IGJpbmQsXG4gICAgICAgIGV4aXN0czogYmluZCxcbiAgICAgICAgZm9yYWxsOiBiaW5kLFxuICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgcmV0dXJuIGYoYSkgPyBtZSA6IE5PTkU7XG4gICAgICAgIH0sXG4gICAgICAgIHRvQXJyYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gW2FdO1xuICAgICAgICB9LFxuICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiAnc29tZSgnICsgYSArICcpJztcbiAgICAgICAgfSxcbiAgICAgICAgZXF1YWxzOiBmdW5jdGlvbiAobykge1xuICAgICAgICAgIHJldHVybiBvLmlzKGEpO1xuICAgICAgICB9LFxuICAgICAgICBlcXVhbHNfOiBmdW5jdGlvbiAobywgZWxlbWVudEVxKSB7XG4gICAgICAgICAgcmV0dXJuIG8uZm9sZChuZXZlciwgZnVuY3Rpb24gKGIpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50RXEoYSwgYik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXR1cm4gbWU7XG4gICAgfTtcbiAgICB2YXIgZnJvbSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgPyBOT05FIDogc29tZSh2YWx1ZSk7XG4gICAgfTtcbiAgICB2YXIgT3B0aW9uID0ge1xuICAgICAgc29tZTogc29tZSxcbiAgICAgIG5vbmU6IG5vbmUsXG4gICAgICBmcm9tOiBmcm9tXG4gICAgfTtcblxuICAgIHZhciBwdW5jdHVhdGlvbiQxID0gcHVuY3R1YXRpb247XG5cbiAgICB2YXIgZ2xvYmFsJDEgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS51dGlsLlRvb2xzJyk7XG5cbiAgICB2YXIgdHlwZU9mID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgIHZhciB0ID0gdHlwZW9mIHg7XG4gICAgICBpZiAoeCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJ251bGwnO1xuICAgICAgfSBlbHNlIGlmICh0ID09PSAnb2JqZWN0JyAmJiAoQXJyYXkucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoeCkgfHwgeC5jb25zdHJ1Y3RvciAmJiB4LmNvbnN0cnVjdG9yLm5hbWUgPT09ICdBcnJheScpKSB7XG4gICAgICAgIHJldHVybiAnYXJyYXknO1xuICAgICAgfSBlbHNlIGlmICh0ID09PSAnb2JqZWN0JyAmJiAoU3RyaW5nLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKHgpIHx8IHguY29uc3RydWN0b3IgJiYgeC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnU3RyaW5nJykpIHtcbiAgICAgICAgcmV0dXJuICdzdHJpbmcnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgaXNUeXBlID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVPZih2YWx1ZSkgPT09IHR5cGU7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGlzU2ltcGxlVHlwZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IHR5cGU7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGlzU3RyaW5nID0gaXNUeXBlKCdzdHJpbmcnKTtcbiAgICB2YXIgaXNBcnJheSA9IGlzVHlwZSgnYXJyYXknKTtcbiAgICB2YXIgaXNCb29sZWFuID0gaXNTaW1wbGVUeXBlKCdib29sZWFuJyk7XG4gICAgdmFyIGlzRnVuY3Rpb24gPSBpc1NpbXBsZVR5cGUoJ2Z1bmN0aW9uJyk7XG4gICAgdmFyIGlzTnVtYmVyID0gaXNTaW1wbGVUeXBlKCdudW1iZXInKTtcblxuICAgIHZhciBuYXRpdmVTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbiAgICB2YXIgbmF0aXZlUHVzaCA9IEFycmF5LnByb3RvdHlwZS5wdXNoO1xuICAgIHZhciBtYXAgPSBmdW5jdGlvbiAoeHMsIGYpIHtcbiAgICAgIHZhciBsZW4gPSB4cy5sZW5ndGg7XG4gICAgICB2YXIgciA9IG5ldyBBcnJheShsZW4pO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgeCA9IHhzW2ldO1xuICAgICAgICByW2ldID0gZih4LCBpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByO1xuICAgIH07XG4gICAgdmFyIGVhY2ggPSBmdW5jdGlvbiAoeHMsIGYpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB4cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgeCA9IHhzW2ldO1xuICAgICAgICBmKHgsIGkpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGVhY2hyID0gZnVuY3Rpb24gKHhzLCBmKSB7XG4gICAgICBmb3IgKHZhciBpID0geHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgdmFyIHggPSB4c1tpXTtcbiAgICAgICAgZih4LCBpKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBncm91cEJ5ID0gZnVuY3Rpb24gKHhzLCBmKSB7XG4gICAgICBpZiAoeHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciB3YXNUeXBlID0gZih4c1swXSk7XG4gICAgICAgIHZhciByID0gW107XG4gICAgICAgIHZhciBncm91cCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0geHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICB2YXIgeCA9IHhzW2ldO1xuICAgICAgICAgIHZhciB0eXBlID0gZih4KTtcbiAgICAgICAgICBpZiAodHlwZSAhPT0gd2FzVHlwZSkge1xuICAgICAgICAgICAgci5wdXNoKGdyb3VwKTtcbiAgICAgICAgICAgIGdyb3VwID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIHdhc1R5cGUgPSB0eXBlO1xuICAgICAgICAgIGdyb3VwLnB1c2goeCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdyb3VwLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIHIucHVzaChncm91cCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHI7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgZm9sZGwgPSBmdW5jdGlvbiAoeHMsIGYsIGFjYykge1xuICAgICAgZWFjaCh4cywgZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgYWNjID0gZihhY2MsIHgpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH07XG4gICAgdmFyIGZsYXR0ZW4gPSBmdW5jdGlvbiAoeHMpIHtcbiAgICAgIHZhciByID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0geHMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgaWYgKCFpc0FycmF5KHhzW2ldKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXJyLmZsYXR0ZW4gaXRlbSAnICsgaSArICcgd2FzIG5vdCBhbiBhcnJheSwgaW5wdXQ6ICcgKyB4cyk7XG4gICAgICAgIH1cbiAgICAgICAgbmF0aXZlUHVzaC5hcHBseShyLCB4c1tpXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcjtcbiAgICB9O1xuICAgIHZhciBiaW5kID0gZnVuY3Rpb24gKHhzLCBmKSB7XG4gICAgICByZXR1cm4gZmxhdHRlbihtYXAoeHMsIGYpKTtcbiAgICB9O1xuICAgIHZhciBzb3J0ID0gZnVuY3Rpb24gKHhzLCBjb21wYXJhdG9yKSB7XG4gICAgICB2YXIgY29weSA9IG5hdGl2ZVNsaWNlLmNhbGwoeHMsIDApO1xuICAgICAgY29weS5zb3J0KGNvbXBhcmF0b3IpO1xuICAgICAgcmV0dXJuIGNvcHk7XG4gICAgfTtcblxuICAgIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5oYXNPd25Qcm9wZXJ0eTtcbiAgICB2YXIgaGFzID0gZnVuY3Rpb24gKG9iaiwga2V5KSB7XG4gICAgICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSk7XG4gICAgfTtcblxuICAgIHZhciBHbG9iYWwgPSB0eXBlb2YgZG9tR2xvYmFscy53aW5kb3cgIT09ICd1bmRlZmluZWQnID8gZG9tR2xvYmFscy53aW5kb3cgOiBGdW5jdGlvbigncmV0dXJuIHRoaXM7JykoKTtcblxuICAgIHZhciBET0NVTUVOVCA9IDk7XG4gICAgdmFyIERPQ1VNRU5UX0ZSQUdNRU5UID0gMTE7XG4gICAgdmFyIEVMRU1FTlQgPSAxO1xuICAgIHZhciBURVhUID0gMztcblxuICAgIHZhciB0eXBlID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBlbGVtZW50LmRvbSgpLm5vZGVUeXBlO1xuICAgIH07XG4gICAgdmFyIGlzVHlwZSQxID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdHlwZShlbGVtZW50KSA9PT0gdDtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgaXNUZXh0ID0gaXNUeXBlJDEoVEVYVCk7XG5cbiAgICB2YXIgcmF3U2V0ID0gZnVuY3Rpb24gKGRvbSwga2V5LCB2YWx1ZSkge1xuICAgICAgaWYgKGlzU3RyaW5nKHZhbHVlKSB8fCBpc0Jvb2xlYW4odmFsdWUpIHx8IGlzTnVtYmVyKHZhbHVlKSkge1xuICAgICAgICBkb20uc2V0QXR0cmlidXRlKGtleSwgdmFsdWUgKyAnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb21HbG9iYWxzLmNvbnNvbGUuZXJyb3IoJ0ludmFsaWQgY2FsbCB0byBBdHRyLnNldC4gS2V5ICcsIGtleSwgJzo6IFZhbHVlICcsIHZhbHVlLCAnOjogRWxlbWVudCAnLCBkb20pO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dHJpYnV0ZSB2YWx1ZSB3YXMgbm90IHNpbXBsZScpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHNldCA9IGZ1bmN0aW9uIChlbGVtZW50LCBrZXksIHZhbHVlKSB7XG4gICAgICByYXdTZXQoZWxlbWVudC5kb20oKSwga2V5LCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIHZhciBmcm9tSHRtbCA9IGZ1bmN0aW9uIChodG1sLCBzY29wZSkge1xuICAgICAgdmFyIGRvYyA9IHNjb3BlIHx8IGRvbUdsb2JhbHMuZG9jdW1lbnQ7XG4gICAgICB2YXIgZGl2ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZGl2LmlubmVySFRNTCA9IGh0bWw7XG4gICAgICBpZiAoIWRpdi5oYXNDaGlsZE5vZGVzKCkgfHwgZGl2LmNoaWxkTm9kZXMubGVuZ3RoID4gMSkge1xuICAgICAgICBkb21HbG9iYWxzLmNvbnNvbGUuZXJyb3IoJ0hUTUwgZG9lcyBub3QgaGF2ZSBhIHNpbmdsZSByb290IG5vZGUnLCBodG1sKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdIVE1MIG11c3QgaGF2ZSBhIHNpbmdsZSByb290IG5vZGUnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmcm9tRG9tKGRpdi5jaGlsZE5vZGVzWzBdKTtcbiAgICB9O1xuICAgIHZhciBmcm9tVGFnID0gZnVuY3Rpb24gKHRhZywgc2NvcGUpIHtcbiAgICAgIHZhciBkb2MgPSBzY29wZSB8fCBkb21HbG9iYWxzLmRvY3VtZW50O1xuICAgICAgdmFyIG5vZGUgPSBkb2MuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgICAgcmV0dXJuIGZyb21Eb20obm9kZSk7XG4gICAgfTtcbiAgICB2YXIgZnJvbVRleHQgPSBmdW5jdGlvbiAodGV4dCwgc2NvcGUpIHtcbiAgICAgIHZhciBkb2MgPSBzY29wZSB8fCBkb21HbG9iYWxzLmRvY3VtZW50O1xuICAgICAgdmFyIG5vZGUgPSBkb2MuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG4gICAgICByZXR1cm4gZnJvbURvbShub2RlKTtcbiAgICB9O1xuICAgIHZhciBmcm9tRG9tID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIGlmIChub2RlID09PSBudWxsIHx8IG5vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vZGUgY2Fubm90IGJlIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4geyBkb206IGNvbnN0YW50KG5vZGUpIH07XG4gICAgfTtcbiAgICB2YXIgZnJvbVBvaW50ID0gZnVuY3Rpb24gKGRvY0VsbSwgeCwgeSkge1xuICAgICAgdmFyIGRvYyA9IGRvY0VsbS5kb20oKTtcbiAgICAgIHJldHVybiBPcHRpb24uZnJvbShkb2MuZWxlbWVudEZyb21Qb2ludCh4LCB5KSkubWFwKGZyb21Eb20pO1xuICAgIH07XG4gICAgdmFyIEVsZW1lbnQgPSB7XG4gICAgICBmcm9tSHRtbDogZnJvbUh0bWwsXG4gICAgICBmcm9tVGFnOiBmcm9tVGFnLFxuICAgICAgZnJvbVRleHQ6IGZyb21UZXh0LFxuICAgICAgZnJvbURvbTogZnJvbURvbSxcbiAgICAgIGZyb21Qb2ludDogZnJvbVBvaW50XG4gICAgfTtcblxuICAgIHZhciBjb21wYXJlRG9jdW1lbnRQb3NpdGlvbiA9IGZ1bmN0aW9uIChhLCBiLCBtYXRjaCkge1xuICAgICAgcmV0dXJuIChhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKGIpICYgbWF0Y2gpICE9PSAwO1xuICAgIH07XG4gICAgdmFyIGRvY3VtZW50UG9zaXRpb25QcmVjZWRpbmcgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKGEsIGIsIGRvbUdsb2JhbHMuTm9kZS5ET0NVTUVOVF9QT1NJVElPTl9QUkVDRURJTkcpO1xuICAgIH07XG5cbiAgICB2YXIgYnlwYXNzU2VsZWN0b3IgPSBmdW5jdGlvbiAoZG9tKSB7XG4gICAgICByZXR1cm4gZG9tLm5vZGVUeXBlICE9PSBFTEVNRU5UICYmIGRvbS5ub2RlVHlwZSAhPT0gRE9DVU1FTlQgJiYgZG9tLm5vZGVUeXBlICE9PSBET0NVTUVOVF9GUkFHTUVOVCB8fCBkb20uY2hpbGRFbGVtZW50Q291bnQgPT09IDA7XG4gICAgfTtcbiAgICB2YXIgYWxsID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBzY29wZSkge1xuICAgICAgdmFyIGJhc2UgPSBzY29wZSA9PT0gdW5kZWZpbmVkID8gZG9tR2xvYmFscy5kb2N1bWVudCA6IHNjb3BlLmRvbSgpO1xuICAgICAgcmV0dXJuIGJ5cGFzc1NlbGVjdG9yKGJhc2UpID8gW10gOiBtYXAoYmFzZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSwgRWxlbWVudC5mcm9tRG9tKTtcbiAgICB9O1xuXG4gICAgdmFyIHBhcmVudCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gT3B0aW9uLmZyb20oZWxlbWVudC5kb20oKS5wYXJlbnROb2RlKS5tYXAoRWxlbWVudC5mcm9tRG9tKTtcbiAgICB9O1xuICAgIHZhciBjaGlsZHJlbiA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gbWFwKGVsZW1lbnQuZG9tKCkuY2hpbGROb2RlcywgRWxlbWVudC5mcm9tRG9tKTtcbiAgICB9O1xuICAgIHZhciBzcG90ID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9mZnNldCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZWxlbWVudDogY29uc3RhbnQoZWxlbWVudCksXG4gICAgICAgIG9mZnNldDogY29uc3RhbnQob2Zmc2V0KVxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBsZWFmID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9mZnNldCkge1xuICAgICAgdmFyIGNzID0gY2hpbGRyZW4oZWxlbWVudCk7XG4gICAgICByZXR1cm4gY3MubGVuZ3RoID4gMCAmJiBvZmZzZXQgPCBjcy5sZW5ndGggPyBzcG90KGNzW29mZnNldF0sIDApIDogc3BvdChlbGVtZW50LCBvZmZzZXQpO1xuICAgIH07XG5cbiAgICB2YXIgYmVmb3JlID0gZnVuY3Rpb24gKG1hcmtlciwgZWxlbWVudCkge1xuICAgICAgdmFyIHBhcmVudCQxID0gcGFyZW50KG1hcmtlcik7XG4gICAgICBwYXJlbnQkMS5lYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHYuZG9tKCkuaW5zZXJ0QmVmb3JlKGVsZW1lbnQuZG9tKCksIG1hcmtlci5kb20oKSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBhcHBlbmQgPSBmdW5jdGlvbiAocGFyZW50LCBlbGVtZW50KSB7XG4gICAgICBwYXJlbnQuZG9tKCkuYXBwZW5kQ2hpbGQoZWxlbWVudC5kb20oKSk7XG4gICAgfTtcbiAgICB2YXIgd3JhcCA9IGZ1bmN0aW9uIChlbGVtZW50LCB3cmFwcGVyKSB7XG4gICAgICBiZWZvcmUoZWxlbWVudCwgd3JhcHBlcik7XG4gICAgICBhcHBlbmQod3JhcHBlciwgZWxlbWVudCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIE5vZGVWYWx1ZSAoaXMsIG5hbWUpIHtcbiAgICAgIHZhciBnZXQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICBpZiAoIWlzKGVsZW1lbnQpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gb25seSBnZXQgJyArIG5hbWUgKyAnIHZhbHVlIG9mIGEgJyArIG5hbWUgKyAnIG5vZGUnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ2V0T3B0aW9uKGVsZW1lbnQpLmdldE9yKCcnKTtcbiAgICAgIH07XG4gICAgICB2YXIgZ2V0T3B0aW9uID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGlzKGVsZW1lbnQpID8gT3B0aW9uLmZyb20oZWxlbWVudC5kb20oKS5ub2RlVmFsdWUpIDogT3B0aW9uLm5vbmUoKTtcbiAgICAgIH07XG4gICAgICB2YXIgc2V0ID0gZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlKSB7XG4gICAgICAgIGlmICghaXMoZWxlbWVudCkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBvbmx5IHNldCByYXcgJyArIG5hbWUgKyAnIHZhbHVlIG9mIGEgJyArIG5hbWUgKyAnIG5vZGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmRvbSgpLm5vZGVWYWx1ZSA9IHZhbHVlO1xuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdldDogZ2V0LFxuICAgICAgICBnZXRPcHRpb246IGdldE9wdGlvbixcbiAgICAgICAgc2V0OiBzZXRcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIGFwaSA9IE5vZGVWYWx1ZShpc1RleHQsICd0ZXh0Jyk7XG4gICAgdmFyIGdldCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gYXBpLmdldChlbGVtZW50KTtcbiAgICB9O1xuXG4gICAgdmFyIHN1cHBvcnRlZCA9IGlzRnVuY3Rpb24oZG9tR2xvYmFscy5FbGVtZW50LnByb3RvdHlwZS5hdHRhY2hTaGFkb3cpICYmIGlzRnVuY3Rpb24oZG9tR2xvYmFscy5Ob2RlLnByb3RvdHlwZS5nZXRSb290Tm9kZSk7XG5cbiAgICB2YXIgZGVzY2VuZGFudHMgPSBmdW5jdGlvbiAoc2NvcGUsIHNlbGVjdG9yKSB7XG4gICAgICByZXR1cm4gYWxsKHNlbGVjdG9yLCBzY29wZSk7XG4gICAgfTtcblxuICAgIHZhciBnbG9iYWwkMiA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLmRvbS5UcmVlV2Fsa2VyJyk7XG5cbiAgICB2YXIgaXNTaW1wbGVCb3VuZGFyeSA9IGZ1bmN0aW9uIChkb20sIG5vZGUpIHtcbiAgICAgIHJldHVybiBkb20uaXNCbG9jayhub2RlKSB8fCBoYXMoZG9tLnNjaGVtYS5nZXRTaG9ydEVuZGVkRWxlbWVudHMoKSwgbm9kZS5ub2RlTmFtZSk7XG4gICAgfTtcbiAgICB2YXIgaXNDb250ZW50RWRpdGFibGVGYWxzZSA9IGZ1bmN0aW9uIChkb20sIG5vZGUpIHtcbiAgICAgIHJldHVybiBkb20uZ2V0Q29udGVudEVkaXRhYmxlKG5vZGUpID09PSAnZmFsc2UnO1xuICAgIH07XG4gICAgdmFyIGlzQ29udGVudEVkaXRhYmxlVHJ1ZUluQ2VmID0gZnVuY3Rpb24gKGRvbSwgbm9kZSkge1xuICAgICAgcmV0dXJuIGRvbS5nZXRDb250ZW50RWRpdGFibGUobm9kZSkgPT09ICd0cnVlJyAmJiBkb20uZ2V0Q29udGVudEVkaXRhYmxlUGFyZW50KG5vZGUucGFyZW50Tm9kZSkgPT09ICdmYWxzZSc7XG4gICAgfTtcbiAgICB2YXIgaXNIaWRkZW4gPSBmdW5jdGlvbiAoZG9tLCBub2RlKSB7XG4gICAgICByZXR1cm4gIWRvbS5pc0Jsb2NrKG5vZGUpICYmIGhhcyhkb20uc2NoZW1hLmdldFdoaXRlU3BhY2VFbGVtZW50cygpLCBub2RlLm5vZGVOYW1lKTtcbiAgICB9O1xuICAgIHZhciBpc0JvdW5kYXJ5ID0gZnVuY3Rpb24gKGRvbSwgbm9kZSkge1xuICAgICAgcmV0dXJuIGlzU2ltcGxlQm91bmRhcnkoZG9tLCBub2RlKSB8fCBpc0NvbnRlbnRFZGl0YWJsZUZhbHNlKGRvbSwgbm9kZSkgfHwgaXNIaWRkZW4oZG9tLCBub2RlKSB8fCBpc0NvbnRlbnRFZGl0YWJsZVRydWVJbkNlZihkb20sIG5vZGUpO1xuICAgIH07XG4gICAgdmFyIGlzVGV4dCQxID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSAzO1xuICAgIH07XG4gICAgdmFyIG51U2VjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNPZmZzZXQ6IDAsXG4gICAgICAgIGZPZmZzZXQ6IDAsXG4gICAgICAgIGVsZW1lbnRzOiBbXVxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciB0b0xlYWYgPSBmdW5jdGlvbiAobm9kZSwgb2Zmc2V0KSB7XG4gICAgICByZXR1cm4gbGVhZihFbGVtZW50LmZyb21Eb20obm9kZSksIG9mZnNldCk7XG4gICAgfTtcbiAgICB2YXIgd2FsayA9IGZ1bmN0aW9uIChkb20sIHdhbGtlckZuLCBzdGFydE5vZGUsIGNhbGxiYWNrcywgZW5kTm9kZSwgc2tpcFN0YXJ0KSB7XG4gICAgICBpZiAoc2tpcFN0YXJ0ID09PSB2b2lkIDApIHtcbiAgICAgICAgc2tpcFN0YXJ0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHZhciBuZXh0ID0gc2tpcFN0YXJ0ID8gd2Fsa2VyRm4oZmFsc2UpIDogc3RhcnROb2RlO1xuICAgICAgd2hpbGUgKG5leHQpIHtcbiAgICAgICAgdmFyIGlzQ2VmTm9kZSA9IGlzQ29udGVudEVkaXRhYmxlRmFsc2UoZG9tLCBuZXh0KTtcbiAgICAgICAgaWYgKGlzQ2VmTm9kZSB8fCBpc0hpZGRlbihkb20sIG5leHQpKSB7XG4gICAgICAgICAgdmFyIHN0b3BXYWxraW5nID0gaXNDZWZOb2RlID8gY2FsbGJhY2tzLmNlZihuZXh0KSA6IGNhbGxiYWNrcy5ib3VuZGFyeShuZXh0KTtcbiAgICAgICAgICBpZiAoc3RvcFdhbGtpbmcpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXh0ID0gd2Fsa2VyRm4odHJ1ZSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaXNTaW1wbGVCb3VuZGFyeShkb20sIG5leHQpKSB7XG4gICAgICAgICAgaWYgKGNhbGxiYWNrcy5ib3VuZGFyeShuZXh0KSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGlzVGV4dCQxKG5leHQpKSB7XG4gICAgICAgICAgY2FsbGJhY2tzLnRleHQobmV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5leHQgPT09IGVuZE5vZGUpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXh0ID0gd2Fsa2VyRm4oZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgY29sbGVjdFRleHRUb0JvdW5kYXJ5ID0gZnVuY3Rpb24gKGRvbSwgc2VjdGlvbiwgbm9kZSwgcm9vdE5vZGUsIGZvcndhcmRzKSB7XG4gICAgICBpZiAoaXNCb3VuZGFyeShkb20sIG5vZGUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciByb290QmxvY2sgPSBkb20uZ2V0UGFyZW50KHJvb3ROb2RlLCBkb20uaXNCbG9jayk7XG4gICAgICB2YXIgd2Fsa2VyID0gbmV3IGdsb2JhbCQyKG5vZGUsIHJvb3RCbG9jayk7XG4gICAgICB2YXIgd2Fsa2VyRm4gPSBmb3J3YXJkcyA/IHdhbGtlci5uZXh0IDogd2Fsa2VyLnByZXY7XG4gICAgICB3YWxrKGRvbSwgd2Fsa2VyRm4sIG5vZGUsIHtcbiAgICAgICAgYm91bmRhcnk6IGFsd2F5cyxcbiAgICAgICAgY2VmOiBhbHdheXMsXG4gICAgICAgIHRleHQ6IGZ1bmN0aW9uIChuZXh0KSB7XG4gICAgICAgICAgaWYgKGZvcndhcmRzKSB7XG4gICAgICAgICAgICBzZWN0aW9uLmZPZmZzZXQgKz0gbmV4dC5sZW5ndGg7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlY3Rpb24uc09mZnNldCArPSBuZXh0Lmxlbmd0aDtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2VjdGlvbi5lbGVtZW50cy5wdXNoKEVsZW1lbnQuZnJvbURvbShuZXh0KSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGNvbGxlY3QgPSBmdW5jdGlvbiAoZG9tLCByb290Tm9kZSwgc3RhcnROb2RlLCBlbmROb2RlLCBjYWxsYmFja3MsIHNraXBTdGFydCkge1xuICAgICAgaWYgKHNraXBTdGFydCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHNraXBTdGFydCA9IHRydWU7XG4gICAgICB9XG4gICAgICB2YXIgd2Fsa2VyID0gbmV3IGdsb2JhbCQyKHN0YXJ0Tm9kZSwgcm9vdE5vZGUpO1xuICAgICAgdmFyIHNlY3Rpb25zID0gW107XG4gICAgICB2YXIgY3VycmVudCA9IG51U2VjdGlvbigpO1xuICAgICAgY29sbGVjdFRleHRUb0JvdW5kYXJ5KGRvbSwgY3VycmVudCwgc3RhcnROb2RlLCByb290Tm9kZSwgZmFsc2UpO1xuICAgICAgdmFyIGZpbmlzaFNlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChjdXJyZW50LmVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBzZWN0aW9ucy5wdXNoKGN1cnJlbnQpO1xuICAgICAgICAgIGN1cnJlbnQgPSBudVNlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuICAgICAgd2Fsayhkb20sIHdhbGtlci5uZXh0LCBzdGFydE5vZGUsIHtcbiAgICAgICAgYm91bmRhcnk6IGZpbmlzaFNlY3Rpb24sXG4gICAgICAgIGNlZjogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICBmaW5pc2hTZWN0aW9uKCk7XG4gICAgICAgICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgICAgICAgc2VjdGlvbnMucHVzaC5hcHBseShzZWN0aW9ucywgY2FsbGJhY2tzLmNlZihub2RlKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgdGV4dDogZnVuY3Rpb24gKG5leHQpIHtcbiAgICAgICAgICBjdXJyZW50LmVsZW1lbnRzLnB1c2goRWxlbWVudC5mcm9tRG9tKG5leHQpKTtcbiAgICAgICAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICBjYWxsYmFja3MudGV4dChuZXh0LCBjdXJyZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIGVuZE5vZGUsIHNraXBTdGFydCk7XG4gICAgICBpZiAoZW5kTm9kZSkge1xuICAgICAgICBjb2xsZWN0VGV4dFRvQm91bmRhcnkoZG9tLCBjdXJyZW50LCBlbmROb2RlLCByb290Tm9kZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICBmaW5pc2hTZWN0aW9uKCk7XG4gICAgICByZXR1cm4gc2VjdGlvbnM7XG4gICAgfTtcbiAgICB2YXIgY29sbGVjdFJhbmdlU2VjdGlvbnMgPSBmdW5jdGlvbiAoZG9tLCBybmcpIHtcbiAgICAgIHZhciBzdGFydCA9IHRvTGVhZihybmcuc3RhcnRDb250YWluZXIsIHJuZy5zdGFydE9mZnNldCk7XG4gICAgICB2YXIgc3RhcnROb2RlID0gc3RhcnQuZWxlbWVudCgpLmRvbSgpO1xuICAgICAgdmFyIGVuZCA9IHRvTGVhZihybmcuZW5kQ29udGFpbmVyLCBybmcuZW5kT2Zmc2V0KTtcbiAgICAgIHZhciBlbmROb2RlID0gZW5kLmVsZW1lbnQoKS5kb20oKTtcbiAgICAgIHJldHVybiBjb2xsZWN0KGRvbSwgcm5nLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyLCBzdGFydE5vZGUsIGVuZE5vZGUsIHtcbiAgICAgICAgdGV4dDogZnVuY3Rpb24gKG5vZGUsIHNlY3Rpb24pIHtcbiAgICAgICAgICBpZiAobm9kZSA9PT0gZW5kTm9kZSkge1xuICAgICAgICAgICAgc2VjdGlvbi5mT2Zmc2V0ICs9IG5vZGUubGVuZ3RoIC0gZW5kLm9mZnNldCgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAobm9kZSA9PT0gc3RhcnROb2RlKSB7XG4gICAgICAgICAgICBzZWN0aW9uLnNPZmZzZXQgKz0gc3RhcnQub2Zmc2V0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjZWY6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgdmFyIHNlY3Rpb25zID0gYmluZChkZXNjZW5kYW50cyhFbGVtZW50LmZyb21Eb20obm9kZSksICcqW2NvbnRlbnRlZGl0YWJsZT10cnVlXScpLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIGNlVHJ1ZU5vZGUgPSBlLmRvbSgpO1xuICAgICAgICAgICAgcmV0dXJuIGNvbGxlY3QoZG9tLCBjZVRydWVOb2RlLCBjZVRydWVOb2RlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gc29ydChzZWN0aW9ucywgZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudFBvc2l0aW9uUHJlY2VkaW5nKGEuZWxlbWVudHNbMF0uZG9tKCksIGIuZWxlbWVudHNbMF0uZG9tKCkpID8gMSA6IC0xO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LCBmYWxzZSk7XG4gICAgfTtcbiAgICB2YXIgZnJvbVJuZyA9IGZ1bmN0aW9uIChkb20sIHJuZykge1xuICAgICAgcmV0dXJuIHJuZy5jb2xsYXBzZWQgPyBbXSA6IGNvbGxlY3RSYW5nZVNlY3Rpb25zKGRvbSwgcm5nKTtcbiAgICB9O1xuICAgIHZhciBmcm9tTm9kZSA9IGZ1bmN0aW9uIChkb20sIG5vZGUpIHtcbiAgICAgIHZhciBybmcgPSBkb20uY3JlYXRlUm5nKCk7XG4gICAgICBybmcuc2VsZWN0Tm9kZShub2RlKTtcbiAgICAgIHJldHVybiBmcm9tUm5nKGRvbSwgcm5nKTtcbiAgICB9O1xuICAgIHZhciBmcm9tTm9kZXMgPSBmdW5jdGlvbiAoZG9tLCBub2Rlcykge1xuICAgICAgcmV0dXJuIGJpbmQobm9kZXMsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHJldHVybiBmcm9tTm9kZShkb20sIG5vZGUpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBmaW5kID0gZnVuY3Rpb24gKHRleHQsIHBhdHRlcm4sIHN0YXJ0LCBmaW5pc2gpIHtcbiAgICAgIGlmIChzdGFydCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHN0YXJ0ID0gMDtcbiAgICAgIH1cbiAgICAgIGlmIChmaW5pc2ggPT09IHZvaWQgMCkge1xuICAgICAgICBmaW5pc2ggPSB0ZXh0Lmxlbmd0aDtcbiAgICAgIH1cbiAgICAgIHZhciByZWdleCA9IHBhdHRlcm4ucmVnZXg7XG4gICAgICByZWdleC5sYXN0SW5kZXggPSBzdGFydDtcbiAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICB2YXIgbWF0Y2g7XG4gICAgICB3aGlsZSAobWF0Y2ggPSByZWdleC5leGVjKHRleHQpKSB7XG4gICAgICAgIHZhciBtYXRjaGVkVGV4dCA9IG1hdGNoW3BhdHRlcm4ubWF0Y2hJbmRleF07XG4gICAgICAgIHZhciBtYXRjaFN0YXJ0ID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5pbmRleE9mKG1hdGNoZWRUZXh0KTtcbiAgICAgICAgdmFyIG1hdGNoRmluaXNoID0gbWF0Y2hTdGFydCArIG1hdGNoZWRUZXh0Lmxlbmd0aDtcbiAgICAgICAgaWYgKG1hdGNoRmluaXNoID4gZmluaXNoKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0cy5wdXNoKHtcbiAgICAgICAgICBzdGFydDogbWF0Y2hTdGFydCxcbiAgICAgICAgICBmaW5pc2g6IG1hdGNoRmluaXNoXG4gICAgICAgIH0pO1xuICAgICAgICByZWdleC5sYXN0SW5kZXggPSBtYXRjaEZpbmlzaDtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG4gICAgdmFyIGV4dHJhY3QgPSBmdW5jdGlvbiAoZWxlbWVudHMsIG1hdGNoZXMpIHtcbiAgICAgIHZhciBub2RlUG9zaXRpb25zID0gZm9sZGwoZWxlbWVudHMsIGZ1bmN0aW9uIChhY2MsIGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGNvbnRlbnQgPSBnZXQoZWxlbWVudCk7XG4gICAgICAgIHZhciBzdGFydCA9IGFjYy5sYXN0O1xuICAgICAgICB2YXIgZmluaXNoID0gc3RhcnQgKyBjb250ZW50Lmxlbmd0aDtcbiAgICAgICAgdmFyIHBvc2l0aW9ucyA9IGJpbmQobWF0Y2hlcywgZnVuY3Rpb24gKG1hdGNoLCBtYXRjaElkeCkge1xuICAgICAgICAgIGlmIChtYXRjaC5zdGFydCA8IGZpbmlzaCAmJiBtYXRjaC5maW5pc2ggPiBzdGFydCkge1xuICAgICAgICAgICAgcmV0dXJuIFt7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgICBzdGFydDogTWF0aC5tYXgoc3RhcnQsIG1hdGNoLnN0YXJ0KSAtIHN0YXJ0LFxuICAgICAgICAgICAgICAgIGZpbmlzaDogTWF0aC5taW4oZmluaXNoLCBtYXRjaC5maW5pc2gpIC0gc3RhcnQsXG4gICAgICAgICAgICAgICAgbWF0Y2hJZDogbWF0Y2hJZHhcbiAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHJlc3VsdHM6IGFjYy5yZXN1bHRzLmNvbmNhdChwb3NpdGlvbnMpLFxuICAgICAgICAgIGxhc3Q6IGZpbmlzaFxuICAgICAgICB9O1xuICAgICAgfSwge1xuICAgICAgICByZXN1bHRzOiBbXSxcbiAgICAgICAgbGFzdDogMFxuICAgICAgfSkucmVzdWx0cztcbiAgICAgIHJldHVybiBncm91cEJ5KG5vZGVQb3NpdGlvbnMsIGZ1bmN0aW9uIChwb3NpdGlvbikge1xuICAgICAgICByZXR1cm4gcG9zaXRpb24ubWF0Y2hJZDtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgZmluZCQxID0gZnVuY3Rpb24gKHBhdHRlcm4sIHNlY3Rpb25zKSB7XG4gICAgICByZXR1cm4gYmluZChzZWN0aW9ucywgZnVuY3Rpb24gKHNlY3Rpb24pIHtcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gc2VjdGlvbi5lbGVtZW50cztcbiAgICAgICAgdmFyIGNvbnRlbnQgPSBtYXAoZWxlbWVudHMsIGdldCkuam9pbignJyk7XG4gICAgICAgIHZhciBwb3NpdGlvbnMgPSBmaW5kKGNvbnRlbnQsIHBhdHRlcm4sIHNlY3Rpb24uc09mZnNldCwgY29udGVudC5sZW5ndGggLSBzZWN0aW9uLmZPZmZzZXQpO1xuICAgICAgICByZXR1cm4gZXh0cmFjdChlbGVtZW50cywgcG9zaXRpb25zKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIG1hcmsgPSBmdW5jdGlvbiAobWF0Y2hlcywgcmVwbGFjZW1lbnROb2RlKSB7XG4gICAgICBlYWNocihtYXRjaGVzLCBmdW5jdGlvbiAobWF0Y2gsIGlkeCkge1xuICAgICAgICBlYWNocihtYXRjaCwgZnVuY3Rpb24gKHBvcykge1xuICAgICAgICAgIHZhciB3cmFwcGVyID0gRWxlbWVudC5mcm9tRG9tKHJlcGxhY2VtZW50Tm9kZS5jbG9uZU5vZGUoZmFsc2UpKTtcbiAgICAgICAgICBzZXQod3JhcHBlciwgJ2RhdGEtbWNlLWluZGV4JywgaWR4KTtcbiAgICAgICAgICB2YXIgdGV4dE5vZGUgPSBwb3MuZWxlbWVudC5kb20oKTtcbiAgICAgICAgICBpZiAodGV4dE5vZGUubGVuZ3RoID09PSBwb3MuZmluaXNoICYmIHBvcy5zdGFydCA9PT0gMCkge1xuICAgICAgICAgICAgd3JhcChwb3MuZWxlbWVudCwgd3JhcHBlcik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0ZXh0Tm9kZS5sZW5ndGggIT09IHBvcy5maW5pc2gpIHtcbiAgICAgICAgICAgICAgdGV4dE5vZGUuc3BsaXRUZXh0KHBvcy5maW5pc2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG1hdGNoTm9kZSA9IHRleHROb2RlLnNwbGl0VGV4dChwb3Muc3RhcnQpO1xuICAgICAgICAgICAgd3JhcChFbGVtZW50LmZyb21Eb20obWF0Y2hOb2RlKSwgd3JhcHBlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGZpbmRBbmRNYXJrID0gZnVuY3Rpb24gKGRvbSwgcGF0dGVybiwgbm9kZSwgcmVwbGFjZW1lbnROb2RlKSB7XG4gICAgICB2YXIgdGV4dFNlY3Rpb25zID0gZnJvbU5vZGUoZG9tLCBub2RlKTtcbiAgICAgIHZhciBtYXRjaGVzID0gZmluZCQxKHBhdHRlcm4sIHRleHRTZWN0aW9ucyk7XG4gICAgICBtYXJrKG1hdGNoZXMsIHJlcGxhY2VtZW50Tm9kZSk7XG4gICAgICByZXR1cm4gbWF0Y2hlcy5sZW5ndGg7XG4gICAgfTtcbiAgICB2YXIgZmluZEFuZE1hcmtJblNlbGVjdGlvbiA9IGZ1bmN0aW9uIChkb20sIHBhdHRlcm4sIHNlbGVjdGlvbiwgcmVwbGFjZW1lbnROb2RlKSB7XG4gICAgICB2YXIgYm9va21hcmsgPSBzZWxlY3Rpb24uZ2V0Qm9va21hcmsoKTtcbiAgICAgIHZhciBub2RlcyA9IGRvbS5zZWxlY3QoJ3RkW2RhdGEtbWNlLXNlbGVjdGVkXSx0aFtkYXRhLW1jZS1zZWxlY3RlZF0nKTtcbiAgICAgIHZhciB0ZXh0U2VjdGlvbnMgPSBub2Rlcy5sZW5ndGggPiAwID8gZnJvbU5vZGVzKGRvbSwgbm9kZXMpIDogZnJvbVJuZyhkb20sIHNlbGVjdGlvbi5nZXRSbmcoKSk7XG4gICAgICB2YXIgbWF0Y2hlcyA9IGZpbmQkMShwYXR0ZXJuLCB0ZXh0U2VjdGlvbnMpO1xuICAgICAgbWFyayhtYXRjaGVzLCByZXBsYWNlbWVudE5vZGUpO1xuICAgICAgc2VsZWN0aW9uLm1vdmVUb0Jvb2ttYXJrKGJvb2ttYXJrKTtcbiAgICAgIHJldHVybiBtYXRjaGVzLmxlbmd0aDtcbiAgICB9O1xuXG4gICAgdmFyIGdldEVsbUluZGV4ID0gZnVuY3Rpb24gKGVsbSkge1xuICAgICAgdmFyIHZhbHVlID0gZWxtLmdldEF0dHJpYnV0ZSgnZGF0YS1tY2UtaW5kZXgnKTtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybiAnJyArIHZhbHVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgdmFyIG1hcmtBbGxNYXRjaGVzID0gZnVuY3Rpb24gKGVkaXRvciwgY3VycmVudFNlYXJjaFN0YXRlLCBwYXR0ZXJuLCBpblNlbGVjdGlvbikge1xuICAgICAgdmFyIG1hcmtlciA9IGVkaXRvci5kb20uY3JlYXRlKCdzcGFuJywgeyAnZGF0YS1tY2UtYm9ndXMnOiAxIH0pO1xuICAgICAgbWFya2VyLmNsYXNzTmFtZSA9ICdtY2UtbWF0Y2gtbWFya2VyJztcbiAgICAgIHZhciBub2RlID0gZWRpdG9yLmdldEJvZHkoKTtcbiAgICAgIGRvbmUoZWRpdG9yLCBjdXJyZW50U2VhcmNoU3RhdGUsIGZhbHNlKTtcbiAgICAgIGlmIChpblNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gZmluZEFuZE1hcmtJblNlbGVjdGlvbihlZGl0b3IuZG9tLCBwYXR0ZXJuLCBlZGl0b3Iuc2VsZWN0aW9uLCBtYXJrZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZpbmRBbmRNYXJrKGVkaXRvci5kb20sIHBhdHRlcm4sIG5vZGUsIG1hcmtlcik7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgdW53cmFwID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIHZhciBwYXJlbnROb2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgaWYgKG5vZGUuZmlyc3RDaGlsZCkge1xuICAgICAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLmZpcnN0Q2hpbGQsIG5vZGUpO1xuICAgICAgfVxuICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgIH07XG4gICAgdmFyIGZpbmRTcGFuc0J5SW5kZXggPSBmdW5jdGlvbiAoZWRpdG9yLCBpbmRleCkge1xuICAgICAgdmFyIHNwYW5zID0gW107XG4gICAgICB2YXIgbm9kZXMgPSBnbG9iYWwkMS50b0FycmF5KGVkaXRvci5nZXRCb2R5KCkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NwYW4nKSk7XG4gICAgICBpZiAobm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgbm9kZUluZGV4ID0gZ2V0RWxtSW5kZXgobm9kZXNbaV0pO1xuICAgICAgICAgIGlmIChub2RlSW5kZXggPT09IG51bGwgfHwgIW5vZGVJbmRleC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobm9kZUluZGV4ID09PSBpbmRleC50b1N0cmluZygpKSB7XG4gICAgICAgICAgICBzcGFucy5wdXNoKG5vZGVzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBzcGFucztcbiAgICB9O1xuICAgIHZhciBtb3ZlU2VsZWN0aW9uID0gZnVuY3Rpb24gKGVkaXRvciwgY3VycmVudFNlYXJjaFN0YXRlLCBmb3J3YXJkKSB7XG4gICAgICB2YXIgc2VhcmNoU3RhdGUgPSBjdXJyZW50U2VhcmNoU3RhdGUuZ2V0KCk7XG4gICAgICB2YXIgdGVzdEluZGV4ID0gc2VhcmNoU3RhdGUuaW5kZXg7XG4gICAgICB2YXIgZG9tID0gZWRpdG9yLmRvbTtcbiAgICAgIGZvcndhcmQgPSBmb3J3YXJkICE9PSBmYWxzZTtcbiAgICAgIGlmIChmb3J3YXJkKSB7XG4gICAgICAgIGlmICh0ZXN0SW5kZXggKyAxID09PSBzZWFyY2hTdGF0ZS5jb3VudCkge1xuICAgICAgICAgIHRlc3RJbmRleCA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGVzdEluZGV4Kys7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0ZXN0SW5kZXggLSAxID09PSAtMSkge1xuICAgICAgICAgIHRlc3RJbmRleCA9IHNlYXJjaFN0YXRlLmNvdW50IC0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZXN0SW5kZXgtLTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZG9tLnJlbW92ZUNsYXNzKGZpbmRTcGFuc0J5SW5kZXgoZWRpdG9yLCBzZWFyY2hTdGF0ZS5pbmRleCksICdtY2UtbWF0Y2gtbWFya2VyLXNlbGVjdGVkJyk7XG4gICAgICB2YXIgc3BhbnMgPSBmaW5kU3BhbnNCeUluZGV4KGVkaXRvciwgdGVzdEluZGV4KTtcbiAgICAgIGlmIChzcGFucy5sZW5ndGgpIHtcbiAgICAgICAgZG9tLmFkZENsYXNzKGZpbmRTcGFuc0J5SW5kZXgoZWRpdG9yLCB0ZXN0SW5kZXgpLCAnbWNlLW1hdGNoLW1hcmtlci1zZWxlY3RlZCcpO1xuICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLnNjcm9sbEludG9WaWV3KHNwYW5zWzBdKTtcbiAgICAgICAgcmV0dXJuIHRlc3RJbmRleDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgICB9O1xuICAgIHZhciByZW1vdmVOb2RlID0gZnVuY3Rpb24gKGRvbSwgbm9kZSkge1xuICAgICAgdmFyIHBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgIGRvbS5yZW1vdmUobm9kZSk7XG4gICAgICBpZiAoZG9tLmlzRW1wdHkocGFyZW50KSkge1xuICAgICAgICBkb20ucmVtb3ZlKHBhcmVudCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgZXNjYXBlU2VhcmNoVGV4dCA9IGZ1bmN0aW9uICh0ZXh0LCB3aG9sZVdvcmQpIHtcbiAgICAgIHZhciBlc2NhcGVkVGV4dCA9IHRleHQucmVwbGFjZSgvW1xcLVxcW1xcXVxcL1xce1xcfVxcKFxcKVxcKlxcK1xcP1xcLlxcXFxcXF5cXCRcXHxdL2csICdcXFxcJCYnKS5yZXBsYWNlKC9cXHMvZywgJ1teXFxcXFNcXFxcclxcXFxuXFxcXHVGRUZGXScpO1xuICAgICAgdmFyIHdvcmRSZWdleCA9ICcoJyArIGVzY2FwZWRUZXh0ICsgJyknO1xuICAgICAgcmV0dXJuIHdob2xlV29yZCA/ICcoPzpefFxcXFxzfCcgKyBwdW5jdHVhdGlvbiQxKCkgKyAnKScgKyB3b3JkUmVnZXggKyAoJyg/PSR8XFxcXHN8JyArIHB1bmN0dWF0aW9uJDEoKSArICcpJykgOiB3b3JkUmVnZXg7XG4gICAgfTtcbiAgICB2YXIgZmluZCQyID0gZnVuY3Rpb24gKGVkaXRvciwgY3VycmVudFNlYXJjaFN0YXRlLCB0ZXh0LCBtYXRjaENhc2UsIHdob2xlV29yZCwgaW5TZWxlY3Rpb24pIHtcbiAgICAgIHZhciBlc2NhcGVkVGV4dCA9IGVzY2FwZVNlYXJjaFRleHQodGV4dCwgd2hvbGVXb3JkKTtcbiAgICAgIHZhciBwYXR0ZXJuID0ge1xuICAgICAgICByZWdleDogbmV3IFJlZ0V4cChlc2NhcGVkVGV4dCwgbWF0Y2hDYXNlID8gJ2cnIDogJ2dpJyksXG4gICAgICAgIG1hdGNoSW5kZXg6IDFcbiAgICAgIH07XG4gICAgICB2YXIgY291bnQgPSBtYXJrQWxsTWF0Y2hlcyhlZGl0b3IsIGN1cnJlbnRTZWFyY2hTdGF0ZSwgcGF0dGVybiwgaW5TZWxlY3Rpb24pO1xuICAgICAgaWYgKGNvdW50KSB7XG4gICAgICAgIHZhciBuZXdJbmRleCA9IG1vdmVTZWxlY3Rpb24oZWRpdG9yLCBjdXJyZW50U2VhcmNoU3RhdGUsIHRydWUpO1xuICAgICAgICBjdXJyZW50U2VhcmNoU3RhdGUuc2V0KHtcbiAgICAgICAgICBpbmRleDogbmV3SW5kZXgsXG4gICAgICAgICAgY291bnQ6IGNvdW50LFxuICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgbWF0Y2hDYXNlOiBtYXRjaENhc2UsXG4gICAgICAgICAgd2hvbGVXb3JkOiB3aG9sZVdvcmQsXG4gICAgICAgICAgaW5TZWxlY3Rpb246IGluU2VsZWN0aW9uXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvdW50O1xuICAgIH07XG4gICAgdmFyIG5leHQgPSBmdW5jdGlvbiAoZWRpdG9yLCBjdXJyZW50U2VhcmNoU3RhdGUpIHtcbiAgICAgIHZhciBpbmRleCA9IG1vdmVTZWxlY3Rpb24oZWRpdG9yLCBjdXJyZW50U2VhcmNoU3RhdGUsIHRydWUpO1xuICAgICAgY3VycmVudFNlYXJjaFN0YXRlLnNldChfX2Fzc2lnbihfX2Fzc2lnbih7fSwgY3VycmVudFNlYXJjaFN0YXRlLmdldCgpKSwgeyBpbmRleDogaW5kZXggfSkpO1xuICAgIH07XG4gICAgdmFyIHByZXYgPSBmdW5jdGlvbiAoZWRpdG9yLCBjdXJyZW50U2VhcmNoU3RhdGUpIHtcbiAgICAgIHZhciBpbmRleCA9IG1vdmVTZWxlY3Rpb24oZWRpdG9yLCBjdXJyZW50U2VhcmNoU3RhdGUsIGZhbHNlKTtcbiAgICAgIGN1cnJlbnRTZWFyY2hTdGF0ZS5zZXQoX19hc3NpZ24oX19hc3NpZ24oe30sIGN1cnJlbnRTZWFyY2hTdGF0ZS5nZXQoKSksIHsgaW5kZXg6IGluZGV4IH0pKTtcbiAgICB9O1xuICAgIHZhciBpc01hdGNoU3BhbiA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICB2YXIgbWF0Y2hJbmRleCA9IGdldEVsbUluZGV4KG5vZGUpO1xuICAgICAgcmV0dXJuIG1hdGNoSW5kZXggIT09IG51bGwgJiYgbWF0Y2hJbmRleC5sZW5ndGggPiAwO1xuICAgIH07XG4gICAgdmFyIHJlcGxhY2UgPSBmdW5jdGlvbiAoZWRpdG9yLCBjdXJyZW50U2VhcmNoU3RhdGUsIHRleHQsIGZvcndhcmQsIGFsbCkge1xuICAgICAgdmFyIHNlYXJjaFN0YXRlID0gY3VycmVudFNlYXJjaFN0YXRlLmdldCgpO1xuICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IHNlYXJjaFN0YXRlLmluZGV4O1xuICAgICAgdmFyIGN1cnJlbnRNYXRjaEluZGV4LCBuZXh0SW5kZXggPSBjdXJyZW50SW5kZXg7XG4gICAgICBmb3J3YXJkID0gZm9yd2FyZCAhPT0gZmFsc2U7XG4gICAgICB2YXIgbm9kZSA9IGVkaXRvci5nZXRCb2R5KCk7XG4gICAgICB2YXIgbm9kZXMgPSBnbG9iYWwkMS5ncmVwKGdsb2JhbCQxLnRvQXJyYXkobm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3BhbicpKSwgaXNNYXRjaFNwYW4pO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbm9kZUluZGV4ID0gZ2V0RWxtSW5kZXgobm9kZXNbaV0pO1xuICAgICAgICB2YXIgbWF0Y2hJbmRleCA9IGN1cnJlbnRNYXRjaEluZGV4ID0gcGFyc2VJbnQobm9kZUluZGV4LCAxMCk7XG4gICAgICAgIGlmIChhbGwgfHwgbWF0Y2hJbmRleCA9PT0gc2VhcmNoU3RhdGUuaW5kZXgpIHtcbiAgICAgICAgICBpZiAodGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgIG5vZGVzW2ldLmZpcnN0Q2hpbGQubm9kZVZhbHVlID0gdGV4dDtcbiAgICAgICAgICAgIHVud3JhcChub2Rlc1tpXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlbW92ZU5vZGUoZWRpdG9yLmRvbSwgbm9kZXNbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB3aGlsZSAobm9kZXNbKytpXSkge1xuICAgICAgICAgICAgbWF0Y2hJbmRleCA9IHBhcnNlSW50KGdldEVsbUluZGV4KG5vZGVzW2ldKSwgMTApO1xuICAgICAgICAgICAgaWYgKG1hdGNoSW5kZXggPT09IGN1cnJlbnRNYXRjaEluZGV4KSB7XG4gICAgICAgICAgICAgIHJlbW92ZU5vZGUoZWRpdG9yLmRvbSwgbm9kZXNbaV0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGZvcndhcmQpIHtcbiAgICAgICAgICAgIG5leHRJbmRleC0tO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50TWF0Y2hJbmRleCA+IGN1cnJlbnRJbmRleCkge1xuICAgICAgICAgIG5vZGVzW2ldLnNldEF0dHJpYnV0ZSgnZGF0YS1tY2UtaW5kZXgnLCBTdHJpbmcoY3VycmVudE1hdGNoSW5kZXggLSAxKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGN1cnJlbnRTZWFyY2hTdGF0ZS5zZXQoX19hc3NpZ24oX19hc3NpZ24oe30sIHNlYXJjaFN0YXRlKSwge1xuICAgICAgICBjb3VudDogYWxsID8gMCA6IHNlYXJjaFN0YXRlLmNvdW50IC0gMSxcbiAgICAgICAgaW5kZXg6IG5leHRJbmRleFxuICAgICAgfSkpO1xuICAgICAgaWYgKGZvcndhcmQpIHtcbiAgICAgICAgbmV4dChlZGl0b3IsIGN1cnJlbnRTZWFyY2hTdGF0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcmV2KGVkaXRvciwgY3VycmVudFNlYXJjaFN0YXRlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAhYWxsICYmIGN1cnJlbnRTZWFyY2hTdGF0ZS5nZXQoKS5jb3VudCA+IDA7XG4gICAgfTtcbiAgICB2YXIgZG9uZSA9IGZ1bmN0aW9uIChlZGl0b3IsIGN1cnJlbnRTZWFyY2hTdGF0ZSwga2VlcEVkaXRvclNlbGVjdGlvbikge1xuICAgICAgdmFyIGksIHN0YXJ0Q29udGFpbmVyLCBlbmRDb250YWluZXI7XG4gICAgICB2YXIgc2VhcmNoU3RhdGUgPSBjdXJyZW50U2VhcmNoU3RhdGUuZ2V0KCk7XG4gICAgICB2YXIgbm9kZXMgPSBnbG9iYWwkMS50b0FycmF5KGVkaXRvci5nZXRCb2R5KCkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NwYW4nKSk7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIG5vZGVJbmRleCA9IGdldEVsbUluZGV4KG5vZGVzW2ldKTtcbiAgICAgICAgaWYgKG5vZGVJbmRleCAhPT0gbnVsbCAmJiBub2RlSW5kZXgubGVuZ3RoKSB7XG4gICAgICAgICAgaWYgKG5vZGVJbmRleCA9PT0gc2VhcmNoU3RhdGUuaW5kZXgudG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgaWYgKCFzdGFydENvbnRhaW5lcikge1xuICAgICAgICAgICAgICBzdGFydENvbnRhaW5lciA9IG5vZGVzW2ldLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRDb250YWluZXIgPSBub2Rlc1tpXS5maXJzdENoaWxkO1xuICAgICAgICAgIH1cbiAgICAgICAgICB1bndyYXAobm9kZXNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjdXJyZW50U2VhcmNoU3RhdGUuc2V0KF9fYXNzaWduKF9fYXNzaWduKHt9LCBzZWFyY2hTdGF0ZSksIHtcbiAgICAgICAgaW5kZXg6IC0xLFxuICAgICAgICBjb3VudDogMCxcbiAgICAgICAgdGV4dDogJydcbiAgICAgIH0pKTtcbiAgICAgIGlmIChzdGFydENvbnRhaW5lciAmJiBlbmRDb250YWluZXIpIHtcbiAgICAgICAgdmFyIHJuZyA9IGVkaXRvci5kb20uY3JlYXRlUm5nKCk7XG4gICAgICAgIHJuZy5zZXRTdGFydChzdGFydENvbnRhaW5lciwgMCk7XG4gICAgICAgIHJuZy5zZXRFbmQoZW5kQ29udGFpbmVyLCBlbmRDb250YWluZXIuZGF0YS5sZW5ndGgpO1xuICAgICAgICBpZiAoa2VlcEVkaXRvclNlbGVjdGlvbiAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLnNldFJuZyhybmcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBybmc7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgaGFzTmV4dCA9IGZ1bmN0aW9uIChlZGl0b3IsIGN1cnJlbnRTZWFyY2hTdGF0ZSkge1xuICAgICAgcmV0dXJuIGN1cnJlbnRTZWFyY2hTdGF0ZS5nZXQoKS5jb3VudCA+IDE7XG4gICAgfTtcbiAgICB2YXIgaGFzUHJldiA9IGZ1bmN0aW9uIChlZGl0b3IsIGN1cnJlbnRTZWFyY2hTdGF0ZSkge1xuICAgICAgcmV0dXJuIGN1cnJlbnRTZWFyY2hTdGF0ZS5nZXQoKS5jb3VudCA+IDE7XG4gICAgfTtcblxuICAgIHZhciBnZXQkMSA9IGZ1bmN0aW9uIChlZGl0b3IsIGN1cnJlbnRTdGF0ZSkge1xuICAgICAgdmFyIGRvbmUkMSA9IGZ1bmN0aW9uIChrZWVwRWRpdG9yU2VsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBkb25lKGVkaXRvciwgY3VycmVudFN0YXRlLCBrZWVwRWRpdG9yU2VsZWN0aW9uKTtcbiAgICAgIH07XG4gICAgICB2YXIgZmluZCA9IGZ1bmN0aW9uICh0ZXh0LCBtYXRjaENhc2UsIHdob2xlV29yZCwgaW5TZWxlY3Rpb24pIHtcbiAgICAgICAgaWYgKGluU2VsZWN0aW9uID09PSB2b2lkIDApIHtcbiAgICAgICAgICBpblNlbGVjdGlvbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaW5kJDIoZWRpdG9yLCBjdXJyZW50U3RhdGUsIHRleHQsIG1hdGNoQ2FzZSwgd2hvbGVXb3JkLCBpblNlbGVjdGlvbik7XG4gICAgICB9O1xuICAgICAgdmFyIG5leHQkMSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5leHQoZWRpdG9yLCBjdXJyZW50U3RhdGUpO1xuICAgICAgfTtcbiAgICAgIHZhciBwcmV2JDEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBwcmV2KGVkaXRvciwgY3VycmVudFN0YXRlKTtcbiAgICAgIH07XG4gICAgICB2YXIgcmVwbGFjZSQxID0gZnVuY3Rpb24gKHRleHQsIGZvcndhcmQsIGFsbCkge1xuICAgICAgICByZXR1cm4gcmVwbGFjZShlZGl0b3IsIGN1cnJlbnRTdGF0ZSwgdGV4dCwgZm9yd2FyZCwgYWxsKTtcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkb25lOiBkb25lJDEsXG4gICAgICAgIGZpbmQ6IGZpbmQsXG4gICAgICAgIG5leHQ6IG5leHQkMSxcbiAgICAgICAgcHJldjogcHJldiQxLFxuICAgICAgICByZXBsYWNlOiByZXBsYWNlJDFcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciB2YWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzdWJqZWN0ID0gQ2VsbChPcHRpb24ubm9uZSgpKTtcbiAgICAgIHZhciBjbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3ViamVjdC5zZXQoT3B0aW9uLm5vbmUoKSk7XG4gICAgICB9O1xuICAgICAgdmFyIHNldCA9IGZ1bmN0aW9uIChzKSB7XG4gICAgICAgIHN1YmplY3Quc2V0KE9wdGlvbi5zb21lKHMpKTtcbiAgICAgIH07XG4gICAgICB2YXIgb24gPSBmdW5jdGlvbiAoZikge1xuICAgICAgICBzdWJqZWN0LmdldCgpLmVhY2goZik7XG4gICAgICB9O1xuICAgICAgdmFyIGlzU2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc3ViamVjdC5nZXQoKS5pc1NvbWUoKTtcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjbGVhcjogY2xlYXIsXG4gICAgICAgIHNldDogc2V0LFxuICAgICAgICBpc1NldDogaXNTZXQsXG4gICAgICAgIG9uOiBvblxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIGdsb2JhbCQzID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuRW52Jyk7XG5cbiAgICB2YXIgb3BlbiA9IGZ1bmN0aW9uIChlZGl0b3IsIGN1cnJlbnRTZWFyY2hTdGF0ZSkge1xuICAgICAgdmFyIGRpYWxvZ0FwaSA9IHZhbHVlKCk7XG4gICAgICBlZGl0b3IudW5kb01hbmFnZXIuYWRkKCk7XG4gICAgICB2YXIgc2VsZWN0ZWRUZXh0ID0gZ2xvYmFsJDEudHJpbShlZGl0b3Iuc2VsZWN0aW9uLmdldENvbnRlbnQoeyBmb3JtYXQ6ICd0ZXh0JyB9KSk7XG4gICAgICBmdW5jdGlvbiB1cGRhdGVCdXR0b25TdGF0ZXMoYXBpKSB7XG4gICAgICAgIHZhciB1cGRhdGVOZXh0ID0gaGFzTmV4dChlZGl0b3IsIGN1cnJlbnRTZWFyY2hTdGF0ZSkgPyBhcGkuZW5hYmxlIDogYXBpLmRpc2FibGU7XG4gICAgICAgIHVwZGF0ZU5leHQoJ25leHQnKTtcbiAgICAgICAgdmFyIHVwZGF0ZVByZXYgPSBoYXNQcmV2KGVkaXRvciwgY3VycmVudFNlYXJjaFN0YXRlKSA/IGFwaS5lbmFibGUgOiBhcGkuZGlzYWJsZTtcbiAgICAgICAgdXBkYXRlUHJldigncHJldicpO1xuICAgICAgfVxuICAgICAgdmFyIHVwZGF0ZVNlYXJjaFN0YXRlID0gZnVuY3Rpb24gKGFwaSkge1xuICAgICAgICB2YXIgZGF0YSA9IGFwaS5nZXREYXRhKCk7XG4gICAgICAgIHZhciBjdXJyZW50ID0gY3VycmVudFNlYXJjaFN0YXRlLmdldCgpO1xuICAgICAgICBjdXJyZW50U2VhcmNoU3RhdGUuc2V0KF9fYXNzaWduKF9fYXNzaWduKHt9LCBjdXJyZW50KSwge1xuICAgICAgICAgIG1hdGNoQ2FzZTogZGF0YS5tYXRjaGNhc2UsXG4gICAgICAgICAgd2hvbGVXb3JkOiBkYXRhLndob2xld29yZHMsXG4gICAgICAgICAgaW5TZWxlY3Rpb246IGRhdGEuaW5zZWxlY3Rpb25cbiAgICAgICAgfSkpO1xuICAgICAgfTtcbiAgICAgIHZhciBkaXNhYmxlQWxsID0gZnVuY3Rpb24gKGFwaSwgZGlzYWJsZSkge1xuICAgICAgICB2YXIgYnV0dG9ucyA9IFtcbiAgICAgICAgICAncmVwbGFjZScsXG4gICAgICAgICAgJ3JlcGxhY2VhbGwnLFxuICAgICAgICAgICdwcmV2JyxcbiAgICAgICAgICAnbmV4dCdcbiAgICAgICAgXTtcbiAgICAgICAgdmFyIHRvZ2dsZSA9IGRpc2FibGUgPyBhcGkuZGlzYWJsZSA6IGFwaS5lbmFibGU7XG4gICAgICAgIGVhY2goYnV0dG9ucywgdG9nZ2xlKTtcbiAgICAgIH07XG4gICAgICBmdW5jdGlvbiBub3RGb3VuZEFsZXJ0KGFwaSkge1xuICAgICAgICBlZGl0b3Iud2luZG93TWFuYWdlci5hbGVydCgnQ291bGQgbm90IGZpbmQgdGhlIHNwZWNpZmllZCBzdHJpbmcuJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGFwaS5mb2N1cygnZmluZHRleHQnKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB2YXIgZm9jdXNCdXR0b25JZlJlcXVpcmVkID0gZnVuY3Rpb24gKGFwaSwgbmFtZSkge1xuICAgICAgICBpZiAoZ2xvYmFsJDMuYnJvd3Nlci5pc1NhZmFyaSgpICYmIGdsb2JhbCQzLmRldmljZVR5cGUuaXNUb3VjaCgpICYmIChuYW1lID09PSAnZmluZCcgfHwgbmFtZSA9PT0gJ3JlcGxhY2UnIHx8IG5hbWUgPT09ICdyZXBsYWNlYWxsJykpIHtcbiAgICAgICAgICBhcGkuZm9jdXMobmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB2YXIgcmVzZXQgPSBmdW5jdGlvbiAoYXBpKSB7XG4gICAgICAgIGRvbmUoZWRpdG9yLCBjdXJyZW50U2VhcmNoU3RhdGUsIGZhbHNlKTtcbiAgICAgICAgZGlzYWJsZUFsbChhcGksIHRydWUpO1xuICAgICAgICB1cGRhdGVCdXR0b25TdGF0ZXMoYXBpKTtcbiAgICAgIH07XG4gICAgICB2YXIgZG9GaW5kID0gZnVuY3Rpb24gKGFwaSkge1xuICAgICAgICB2YXIgZGF0YSA9IGFwaS5nZXREYXRhKCk7XG4gICAgICAgIHZhciBsYXN0ID0gY3VycmVudFNlYXJjaFN0YXRlLmdldCgpO1xuICAgICAgICBpZiAoIWRhdGEuZmluZHRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgcmVzZXQoYXBpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhc3QudGV4dCA9PT0gZGF0YS5maW5kdGV4dCAmJiBsYXN0Lm1hdGNoQ2FzZSA9PT0gZGF0YS5tYXRjaGNhc2UgJiYgbGFzdC53aG9sZVdvcmQgPT09IGRhdGEud2hvbGV3b3Jkcykge1xuICAgICAgICAgIG5leHQoZWRpdG9yLCBjdXJyZW50U2VhcmNoU3RhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBjb3VudCA9IGZpbmQkMihlZGl0b3IsIGN1cnJlbnRTZWFyY2hTdGF0ZSwgZGF0YS5maW5kdGV4dCwgZGF0YS5tYXRjaGNhc2UsIGRhdGEud2hvbGV3b3JkcywgZGF0YS5pbnNlbGVjdGlvbik7XG4gICAgICAgICAgaWYgKGNvdW50IDw9IDApIHtcbiAgICAgICAgICAgIG5vdEZvdW5kQWxlcnQoYXBpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGlzYWJsZUFsbChhcGksIGNvdW50ID09PSAwKTtcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVCdXR0b25TdGF0ZXMoYXBpKTtcbiAgICAgIH07XG4gICAgICB2YXIgaW5pdGlhbFN0YXRlID0gY3VycmVudFNlYXJjaFN0YXRlLmdldCgpO1xuICAgICAgdmFyIGluaXRpYWxEYXRhID0ge1xuICAgICAgICBmaW5kdGV4dDogc2VsZWN0ZWRUZXh0LFxuICAgICAgICByZXBsYWNldGV4dDogJycsXG4gICAgICAgIHdob2xld29yZHM6IGluaXRpYWxTdGF0ZS53aG9sZVdvcmQsXG4gICAgICAgIG1hdGNoY2FzZTogaW5pdGlhbFN0YXRlLm1hdGNoQ2FzZSxcbiAgICAgICAgaW5zZWxlY3Rpb246IGluaXRpYWxTdGF0ZS5pblNlbGVjdGlvblxuICAgICAgfTtcbiAgICAgIHZhciBzcGVjID0ge1xuICAgICAgICB0aXRsZTogJ0ZpbmQgYW5kIFJlcGxhY2UnLFxuICAgICAgICBzaXplOiAnbm9ybWFsJyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIHR5cGU6ICdwYW5lbCcsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdHlwZTogJ2JhcicsXG4gICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICdmaW5kdGV4dCcsXG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ0ZpbmQnLFxuICAgICAgICAgICAgICAgICAgbWF4aW1pemVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgaW5wdXRNb2RlOiAnc2VhcmNoJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICAgICAgICBuYW1lOiAncHJldicsXG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnUHJldmlvdXMnLFxuICAgICAgICAgICAgICAgICAgaWNvbjogJ2FjdGlvbi1wcmV2JyxcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgYm9yZGVybGVzczogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICAgICAgICBuYW1lOiAnbmV4dCcsXG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnTmV4dCcsXG4gICAgICAgICAgICAgICAgICBpY29uOiAnYWN0aW9uLW5leHQnLFxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICBib3JkZXJsZXNzOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgICAgICAgICBuYW1lOiAncmVwbGFjZXRleHQnLFxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1JlcGxhY2Ugd2l0aCcsXG4gICAgICAgICAgICAgIGlucHV0TW9kZTogJ3NlYXJjaCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnbWVudScsXG4gICAgICAgICAgICBuYW1lOiAnb3B0aW9ucycsXG4gICAgICAgICAgICBpY29uOiAncHJlZmVyZW5jZXMnLFxuICAgICAgICAgICAgdG9vbHRpcDogJ1ByZWZlcmVuY2VzJyxcbiAgICAgICAgICAgIGFsaWduOiAnc3RhcnQnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6ICd0b2dnbGVtZW51aXRlbScsXG4gICAgICAgICAgICAgICAgbmFtZTogJ21hdGNoY2FzZScsXG4gICAgICAgICAgICAgICAgdGV4dDogJ01hdGNoIGNhc2UnXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAndG9nZ2xlbWVudWl0ZW0nLFxuICAgICAgICAgICAgICAgIG5hbWU6ICd3aG9sZXdvcmRzJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiAnRmluZCB3aG9sZSB3b3JkcyBvbmx5J1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3RvZ2dsZW1lbnVpdGVtJyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnaW5zZWxlY3Rpb24nLFxuICAgICAgICAgICAgICAgIHRleHQ6ICdGaW5kIGluIHNlbGVjdGlvbidcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2N1c3RvbScsXG4gICAgICAgICAgICBuYW1lOiAnZmluZCcsXG4gICAgICAgICAgICB0ZXh0OiAnRmluZCcsXG4gICAgICAgICAgICBwcmltYXJ5OiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnY3VzdG9tJyxcbiAgICAgICAgICAgIG5hbWU6ICdyZXBsYWNlJyxcbiAgICAgICAgICAgIHRleHQ6ICdSZXBsYWNlJyxcbiAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnY3VzdG9tJyxcbiAgICAgICAgICAgIG5hbWU6ICdyZXBsYWNlYWxsJyxcbiAgICAgICAgICAgIHRleHQ6ICdSZXBsYWNlIEFsbCcsXG4gICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgaW5pdGlhbERhdGE6IGluaXRpYWxEYXRhLFxuICAgICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKGFwaSwgZGV0YWlscykge1xuICAgICAgICAgIGlmIChkZXRhaWxzLm5hbWUgPT09ICdmaW5kdGV4dCcgJiYgY3VycmVudFNlYXJjaFN0YXRlLmdldCgpLmNvdW50ID4gMCkge1xuICAgICAgICAgICAgcmVzZXQoYXBpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uQWN0aW9uOiBmdW5jdGlvbiAoYXBpLCBkZXRhaWxzKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSBhcGkuZ2V0RGF0YSgpO1xuICAgICAgICAgIHN3aXRjaCAoZGV0YWlscy5uYW1lKSB7XG4gICAgICAgICAgY2FzZSAnZmluZCc6XG4gICAgICAgICAgICBkb0ZpbmQoYXBpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAgICAgaWYgKCFyZXBsYWNlKGVkaXRvciwgY3VycmVudFNlYXJjaFN0YXRlLCBkYXRhLnJlcGxhY2V0ZXh0KSkge1xuICAgICAgICAgICAgICByZXNldChhcGkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdXBkYXRlQnV0dG9uU3RhdGVzKGFwaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdyZXBsYWNlYWxsJzpcbiAgICAgICAgICAgIHJlcGxhY2UoZWRpdG9yLCBjdXJyZW50U2VhcmNoU3RhdGUsIGRhdGEucmVwbGFjZXRleHQsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgcmVzZXQoYXBpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3ByZXYnOlxuICAgICAgICAgICAgcHJldihlZGl0b3IsIGN1cnJlbnRTZWFyY2hTdGF0ZSk7XG4gICAgICAgICAgICB1cGRhdGVCdXR0b25TdGF0ZXMoYXBpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ25leHQnOlxuICAgICAgICAgICAgbmV4dChlZGl0b3IsIGN1cnJlbnRTZWFyY2hTdGF0ZSk7XG4gICAgICAgICAgICB1cGRhdGVCdXR0b25TdGF0ZXMoYXBpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ21hdGNoY2FzZSc6XG4gICAgICAgICAgY2FzZSAnd2hvbGV3b3Jkcyc6XG4gICAgICAgICAgY2FzZSAnaW5zZWxlY3Rpb24nOlxuICAgICAgICAgICAgdXBkYXRlU2VhcmNoU3RhdGUoYXBpKTtcbiAgICAgICAgICAgIHJlc2V0KGFwaSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9jdXNCdXR0b25JZlJlcXVpcmVkKGFwaSwgZGV0YWlscy5uYW1lKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TdWJtaXQ6IGZ1bmN0aW9uIChhcGkpIHtcbiAgICAgICAgICBkb0ZpbmQoYXBpKTtcbiAgICAgICAgICBmb2N1c0J1dHRvbklmUmVxdWlyZWQoYXBpLCAnZmluZCcpO1xuICAgICAgICB9LFxuICAgICAgICBvbkNsb3NlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZWRpdG9yLmZvY3VzKCk7XG4gICAgICAgICAgZG9uZShlZGl0b3IsIGN1cnJlbnRTZWFyY2hTdGF0ZSk7XG4gICAgICAgICAgZWRpdG9yLnVuZG9NYW5hZ2VyLmFkZCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgZGlhbG9nQXBpLnNldChlZGl0b3Iud2luZG93TWFuYWdlci5vcGVuKHNwZWMsIHsgaW5saW5lOiAndG9vbGJhcicgfSkpO1xuICAgIH07XG5cbiAgICB2YXIgcmVnaXN0ZXIgPSBmdW5jdGlvbiAoZWRpdG9yLCBjdXJyZW50U2VhcmNoU3RhdGUpIHtcbiAgICAgIGVkaXRvci5hZGRDb21tYW5kKCdTZWFyY2hSZXBsYWNlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBvcGVuKGVkaXRvciwgY3VycmVudFNlYXJjaFN0YXRlKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgc2hvd0RpYWxvZyA9IGZ1bmN0aW9uIChlZGl0b3IsIGN1cnJlbnRTZWFyY2hTdGF0ZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb3BlbihlZGl0b3IsIGN1cnJlbnRTZWFyY2hTdGF0ZSk7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHJlZ2lzdGVyJDEgPSBmdW5jdGlvbiAoZWRpdG9yLCBjdXJyZW50U2VhcmNoU3RhdGUpIHtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRNZW51SXRlbSgnc2VhcmNocmVwbGFjZScsIHtcbiAgICAgICAgdGV4dDogJ0ZpbmQgYW5kIHJlcGxhY2UuLi4nLFxuICAgICAgICBzaG9ydGN1dDogJ01ldGErRicsXG4gICAgICAgIG9uQWN0aW9uOiBzaG93RGlhbG9nKGVkaXRvciwgY3VycmVudFNlYXJjaFN0YXRlKSxcbiAgICAgICAgaWNvbjogJ3NlYXJjaCdcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZEJ1dHRvbignc2VhcmNocmVwbGFjZScsIHtcbiAgICAgICAgdG9vbHRpcDogJ0ZpbmQgYW5kIHJlcGxhY2UnLFxuICAgICAgICBvbkFjdGlvbjogc2hvd0RpYWxvZyhlZGl0b3IsIGN1cnJlbnRTZWFyY2hTdGF0ZSksXG4gICAgICAgIGljb246ICdzZWFyY2gnXG4gICAgICB9KTtcbiAgICAgIGVkaXRvci5zaG9ydGN1dHMuYWRkKCdNZXRhK0YnLCAnJywgc2hvd0RpYWxvZyhlZGl0b3IsIGN1cnJlbnRTZWFyY2hTdGF0ZSkpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBQbHVnaW4gKCkge1xuICAgICAgZ2xvYmFsLmFkZCgnc2VhcmNocmVwbGFjZScsIGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRTZWFyY2hTdGF0ZSA9IENlbGwoe1xuICAgICAgICAgIGluZGV4OiAtMSxcbiAgICAgICAgICBjb3VudDogMCxcbiAgICAgICAgICB0ZXh0OiAnJyxcbiAgICAgICAgICBtYXRjaENhc2U6IGZhbHNlLFxuICAgICAgICAgIHdob2xlV29yZDogZmFsc2UsXG4gICAgICAgICAgaW5TZWxlY3Rpb246IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICByZWdpc3RlcihlZGl0b3IsIGN1cnJlbnRTZWFyY2hTdGF0ZSk7XG4gICAgICAgIHJlZ2lzdGVyJDEoZWRpdG9yLCBjdXJyZW50U2VhcmNoU3RhdGUpO1xuICAgICAgICByZXR1cm4gZ2V0JDEoZWRpdG9yLCBjdXJyZW50U2VhcmNoU3RhdGUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgUGx1Z2luKCk7XG5cbn0od2luZG93KSk7XG4iXSwic291cmNlUm9vdCI6IiJ9