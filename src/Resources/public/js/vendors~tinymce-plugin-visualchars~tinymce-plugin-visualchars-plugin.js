(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~tinymce-plugin-visualchars~tinymce-plugin-visualchars-plugin"],{

/***/ "./node_modules/tinymce/plugins/visualchars/plugin.js":
/*!************************************************************!*\
  !*** ./node_modules/tinymce/plugins/visualchars/plugin.js ***!
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

    var get = function (toggleState) {
      var isEnabled = function () {
        return toggleState.get();
      };
      return { isEnabled: isEnabled };
    };

    var fireVisualChars = function (editor, state) {
      return editor.fire('VisualChars', { state: state });
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
    var isSimpleType = function (type) {
      return function (value) {
        return typeof value === type;
      };
    };
    var isString = isType('string');
    var isBoolean = isSimpleType('boolean');
    var isNumber = isSimpleType('number');

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

    var keys = Object.keys;
    var each$1 = function (obj, f) {
      var props = keys(obj);
      for (var k = 0, len = props.length; k < len; k++) {
        var i = props[k];
        var x = obj[i];
        f(x, i);
      }
    };

    var Global = typeof domGlobals.window !== 'undefined' ? domGlobals.window : Function('return this;')();

    var TEXT = 3;

    var type = function (element) {
      return element.dom().nodeType;
    };
    var value = function (element) {
      return element.dom().nodeValue;
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
    var get$1 = function (element, key) {
      var v = element.dom().getAttribute(key);
      return v === null ? undefined : v;
    };
    var remove = function (element, key) {
      element.dom().removeAttribute(key);
    };

    var read = function (element, attr) {
      var value = get$1(element, attr);
      return value === undefined || value === '' ? [] : value.split(' ');
    };
    var add = function (element, attr, id) {
      var old = read(element, attr);
      var nu = old.concat([id]);
      set(element, attr, nu.join(' '));
      return true;
    };
    var remove$1 = function (element, attr, id) {
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
    var get$2 = function (element) {
      return read(element, 'class');
    };
    var add$1 = function (element, clazz) {
      return add(element, 'class', clazz);
    };
    var remove$2 = function (element, clazz) {
      return remove$1(element, 'class', clazz);
    };

    var add$2 = function (element, clazz) {
      if (supports(element)) {
        element.dom().classList.add(clazz);
      } else {
        add$1(element, clazz);
      }
    };
    var cleanClass = function (element) {
      var classList = supports(element) ? element.dom().classList : get$2(element);
      if (classList.length === 0) {
        remove(element, 'class');
      }
    };
    var remove$3 = function (element, clazz) {
      if (supports(element)) {
        var classList = element.dom().classList;
        classList.remove(clazz);
      } else {
        remove$2(element, clazz);
      }
      cleanClass(element);
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

    var charMap = {
      '\xA0': 'nbsp',
      '\xAD': 'shy'
    };
    var charMapToRegExp = function (charMap, global) {
      var regExp = '';
      each$1(charMap, function (_value, key) {
        regExp += key;
      });
      return new RegExp('[' + regExp + ']', global ? 'g' : '');
    };
    var charMapToSelector = function (charMap) {
      var selector = '';
      each$1(charMap, function (value) {
        if (selector) {
          selector += ',';
        }
        selector += 'span.mce-' + value;
      });
      return selector;
    };
    var regExp = charMapToRegExp(charMap);
    var regExpGlobal = charMapToRegExp(charMap, true);
    var selector = charMapToSelector(charMap);
    var nbspClass = 'mce-nbsp';

    var wrapCharWithSpan = function (value) {
      return '<span data-mce-bogus="1" class="mce-' + charMap[value] + '">' + value + '</span>';
    };

    var isMatch = function (n) {
      var value$1 = value(n);
      return isText(n) && value$1 !== undefined && regExp.test(value$1);
    };
    var filterDescendants = function (scope, predicate) {
      var result = [];
      var dom = scope.dom();
      var children = map(dom.childNodes, Element.fromDom);
      each(children, function (x) {
        if (predicate(x)) {
          result = result.concat([x]);
        }
        result = result.concat(filterDescendants(x, predicate));
      });
      return result;
    };
    var findParentElm = function (elm, rootElm) {
      while (elm.parentNode) {
        if (elm.parentNode === rootElm) {
          return elm;
        }
        elm = elm.parentNode;
      }
    };
    var replaceWithSpans = function (text) {
      return text.replace(regExpGlobal, wrapCharWithSpan);
    };

    var isWrappedNbsp = function (node) {
      return node.nodeName.toLowerCase() === 'span' && node.classList.contains('mce-nbsp-wrap');
    };
    var show = function (editor, rootElm) {
      var nodeList = filterDescendants(Element.fromDom(rootElm), isMatch);
      each(nodeList, function (n) {
        var parent = n.dom().parentNode;
        if (isWrappedNbsp(parent)) {
          add$2(Element.fromDom(parent), nbspClass);
        } else {
          var withSpans = replaceWithSpans(editor.dom.encode(value(n)));
          var div = editor.dom.create('div', null, withSpans);
          var node = void 0;
          while (node = div.lastChild) {
            editor.dom.insertAfter(node, n.dom());
          }
          editor.dom.remove(n.dom());
        }
      });
    };
    var hide = function (editor, rootElm) {
      var nodeList = editor.dom.select(selector, rootElm);
      each(nodeList, function (node) {
        if (isWrappedNbsp(node)) {
          remove$3(Element.fromDom(node), nbspClass);
        } else {
          editor.dom.remove(node, true);
        }
      });
    };
    var toggle = function (editor) {
      var body = editor.getBody();
      var bookmark = editor.selection.getBookmark();
      var parentNode = findParentElm(editor.selection.getNode(), body);
      parentNode = parentNode !== undefined ? parentNode : body;
      hide(editor, parentNode);
      show(editor, parentNode);
      editor.selection.moveToBookmark(bookmark);
    };

    var toggleVisualChars = function (editor, toggleState) {
      var body = editor.getBody();
      var selection = editor.selection;
      toggleState.set(!toggleState.get());
      fireVisualChars(editor, toggleState.get());
      var bookmark = selection.getBookmark();
      if (toggleState.get() === true) {
        show(editor, body);
      } else {
        hide(editor, body);
      }
      selection.moveToBookmark(bookmark);
    };

    var register = function (editor, toggleState) {
      editor.addCommand('mceVisualChars', function () {
        toggleVisualChars(editor, toggleState);
      });
    };

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Delay');

    var isEnabledByDefault = function (editor) {
      return editor.getParam('visualchars_default_state', false);
    };
    var hasForcedRootBlock = function (editor) {
      return editor.getParam('forced_root_block') !== false;
    };

    var setup = function (editor, toggleState) {
      var debouncedToggle = global$1.debounce(function () {
        toggle(editor);
      }, 300);
      if (hasForcedRootBlock(editor)) {
        editor.on('keydown', function (e) {
          if (toggleState.get() === true) {
            e.keyCode === 13 ? toggle(editor) : debouncedToggle();
          }
        });
      }
    };

    var setup$1 = function (editor, toggleState) {
      editor.on('init', function () {
        var valueForToggling = !isEnabledByDefault(editor);
        toggleState.set(valueForToggling);
        toggleVisualChars(editor, toggleState);
      });
    };

    var toggleActiveState = function (editor, enabledStated) {
      return function (api) {
        api.setActive(enabledStated.get());
        var editorEventCallback = function (e) {
          return api.setActive(e.state);
        };
        editor.on('VisualChars', editorEventCallback);
        return function () {
          return editor.off('VisualChars', editorEventCallback);
        };
      };
    };
    var register$1 = function (editor, toggleState) {
      editor.ui.registry.addToggleButton('visualchars', {
        tooltip: 'Show invisible characters',
        icon: 'visualchars',
        onAction: function () {
          return editor.execCommand('mceVisualChars');
        },
        onSetup: toggleActiveState(editor, toggleState)
      });
      editor.ui.registry.addToggleMenuItem('visualchars', {
        text: 'Show invisible characters',
        icon: 'visualchars',
        onAction: function () {
          return editor.execCommand('mceVisualChars');
        },
        onSetup: toggleActiveState(editor, toggleState)
      });
    };

    function Plugin () {
      global.add('visualchars', function (editor) {
        var toggleState = Cell(false);
        register(editor, toggleState);
        register$1(editor, toggleState);
        setup(editor, toggleState);
        setup$1(editor, toggleState);
        return get(toggleState);
      });
    }

    Plugin();

}(window));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL3Zpc3VhbGNoYXJzL3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDs7QUFFQTtBQUNBLHlDQUF5QyxlQUFlO0FBQ3hEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsU0FBUztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsU0FBUztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsU0FBUztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNHQUFzRzs7QUFFdEc7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBLENBQUMiLCJmaWxlIjoidmVuZG9yc350aW55bWNlLXBsdWdpbi12aXN1YWxjaGFyc350aW55bWNlLXBsdWdpbi12aXN1YWxjaGFycy1wbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqXG4gKiBWZXJzaW9uOiA1LjQuMiAoMjAyMC0wOC0xNylcbiAqL1xuKGZ1bmN0aW9uIChkb21HbG9iYWxzKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIENlbGwgPSBmdW5jdGlvbiAoaW5pdGlhbCkge1xuICAgICAgdmFyIHZhbHVlID0gaW5pdGlhbDtcbiAgICAgIHZhciBnZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG4gICAgICB2YXIgc2V0ID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdmFsdWUgPSB2O1xuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdldDogZ2V0LFxuICAgICAgICBzZXQ6IHNldFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIGdsb2JhbCA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLlBsdWdpbk1hbmFnZXInKTtcblxuICAgIHZhciBnZXQgPSBmdW5jdGlvbiAodG9nZ2xlU3RhdGUpIHtcbiAgICAgIHZhciBpc0VuYWJsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0b2dnbGVTdGF0ZS5nZXQoKTtcbiAgICAgIH07XG4gICAgICByZXR1cm4geyBpc0VuYWJsZWQ6IGlzRW5hYmxlZCB9O1xuICAgIH07XG5cbiAgICB2YXIgZmlyZVZpc3VhbENoYXJzID0gZnVuY3Rpb24gKGVkaXRvciwgc3RhdGUpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZmlyZSgnVmlzdWFsQ2hhcnMnLCB7IHN0YXRlOiBzdGF0ZSB9KTtcbiAgICB9O1xuXG4gICAgdmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgfTtcbiAgICB2YXIgY29uc3RhbnQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgbmV2ZXIgPSBjb25zdGFudChmYWxzZSk7XG4gICAgdmFyIGFsd2F5cyA9IGNvbnN0YW50KHRydWUpO1xuXG4gICAgdmFyIG5vbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gTk9ORTtcbiAgICB9O1xuICAgIHZhciBOT05FID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGVxID0gZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgcmV0dXJuIG8uaXNOb25lKCk7XG4gICAgICB9O1xuICAgICAgdmFyIGNhbGwgPSBmdW5jdGlvbiAodGh1bmspIHtcbiAgICAgICAgcmV0dXJuIHRodW5rKCk7XG4gICAgICB9O1xuICAgICAgdmFyIGlkID0gZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgcmV0dXJuIG47XG4gICAgICB9O1xuICAgICAgdmFyIG1lID0ge1xuICAgICAgICBmb2xkOiBmdW5jdGlvbiAobiwgX3MpIHtcbiAgICAgICAgICByZXR1cm4gbigpO1xuICAgICAgICB9LFxuICAgICAgICBpczogbmV2ZXIsXG4gICAgICAgIGlzU29tZTogbmV2ZXIsXG4gICAgICAgIGlzTm9uZTogYWx3YXlzLFxuICAgICAgICBnZXRPcjogaWQsXG4gICAgICAgIGdldE9yVGh1bms6IGNhbGwsXG4gICAgICAgIGdldE9yRGllOiBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyB8fCAnZXJyb3I6IGdldE9yRGllIGNhbGxlZCBvbiBub25lLicpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRPck51bGw6IGNvbnN0YW50KG51bGwpLFxuICAgICAgICBnZXRPclVuZGVmaW5lZDogY29uc3RhbnQodW5kZWZpbmVkKSxcbiAgICAgICAgb3I6IGlkLFxuICAgICAgICBvclRodW5rOiBjYWxsLFxuICAgICAgICBtYXA6IG5vbmUsXG4gICAgICAgIGVhY2g6IG5vb3AsXG4gICAgICAgIGJpbmQ6IG5vbmUsXG4gICAgICAgIGV4aXN0czogbmV2ZXIsXG4gICAgICAgIGZvcmFsbDogYWx3YXlzLFxuICAgICAgICBmaWx0ZXI6IG5vbmUsXG4gICAgICAgIGVxdWFsczogZXEsXG4gICAgICAgIGVxdWFsc186IGVxLFxuICAgICAgICB0b0FycmF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9LFxuICAgICAgICB0b1N0cmluZzogY29uc3RhbnQoJ25vbmUoKScpXG4gICAgICB9O1xuICAgICAgcmV0dXJuIG1lO1xuICAgIH0oKTtcbiAgICB2YXIgc29tZSA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICB2YXIgY29uc3RhbnRfYSA9IGNvbnN0YW50KGEpO1xuICAgICAgdmFyIHNlbGYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBtZTtcbiAgICAgIH07XG4gICAgICB2YXIgYmluZCA9IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHJldHVybiBmKGEpO1xuICAgICAgfTtcbiAgICAgIHZhciBtZSA9IHtcbiAgICAgICAgZm9sZDogZnVuY3Rpb24gKG4sIHMpIHtcbiAgICAgICAgICByZXR1cm4gcyhhKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXM6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgcmV0dXJuIGEgPT09IHY7XG4gICAgICAgIH0sXG4gICAgICAgIGlzU29tZTogYWx3YXlzLFxuICAgICAgICBpc05vbmU6IG5ldmVyLFxuICAgICAgICBnZXRPcjogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JUaHVuazogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JEaWU6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yTnVsbDogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JVbmRlZmluZWQ6IGNvbnN0YW50X2EsXG4gICAgICAgIG9yOiBzZWxmLFxuICAgICAgICBvclRodW5rOiBzZWxmLFxuICAgICAgICBtYXA6IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgcmV0dXJuIHNvbWUoZihhKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVhY2g6IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgZihhKTtcbiAgICAgICAgfSxcbiAgICAgICAgYmluZDogYmluZCxcbiAgICAgICAgZXhpc3RzOiBiaW5kLFxuICAgICAgICBmb3JhbGw6IGJpbmQsXG4gICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICByZXR1cm4gZihhKSA/IG1lIDogTk9ORTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9BcnJheTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBbYV07XG4gICAgICAgIH0sXG4gICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuICdzb21lKCcgKyBhICsgJyknO1xuICAgICAgICB9LFxuICAgICAgICBlcXVhbHM6IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgICAgcmV0dXJuIG8uaXMoYSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVxdWFsc186IGZ1bmN0aW9uIChvLCBlbGVtZW50RXEpIHtcbiAgICAgICAgICByZXR1cm4gby5mb2xkKG5ldmVyLCBmdW5jdGlvbiAoYikge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRFcShhLCBiKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiBtZTtcbiAgICB9O1xuICAgIHZhciBmcm9tID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCA/IE5PTkUgOiBzb21lKHZhbHVlKTtcbiAgICB9O1xuICAgIHZhciBPcHRpb24gPSB7XG4gICAgICBzb21lOiBzb21lLFxuICAgICAgbm9uZTogbm9uZSxcbiAgICAgIGZyb206IGZyb21cbiAgICB9O1xuXG4gICAgdmFyIHR5cGVPZiA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICB2YXIgdCA9IHR5cGVvZiB4O1xuICAgICAgaWYgKHggPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICdudWxsJztcbiAgICAgIH0gZWxzZSBpZiAodCA9PT0gJ29iamVjdCcgJiYgKEFycmF5LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKHgpIHx8IHguY29uc3RydWN0b3IgJiYgeC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnQXJyYXknKSkge1xuICAgICAgICByZXR1cm4gJ2FycmF5JztcbiAgICAgIH0gZWxzZSBpZiAodCA9PT0gJ29iamVjdCcgJiYgKFN0cmluZy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZih4KSB8fCB4LmNvbnN0cnVjdG9yICYmIHguY29uc3RydWN0b3IubmFtZSA9PT0gJ1N0cmluZycpKSB7XG4gICAgICAgIHJldHVybiAnc3RyaW5nJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0O1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGlzVHlwZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0eXBlT2YodmFsdWUpID09PSB0eXBlO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBpc1NpbXBsZVR5cGUgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSB0eXBlO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBpc1N0cmluZyA9IGlzVHlwZSgnc3RyaW5nJyk7XG4gICAgdmFyIGlzQm9vbGVhbiA9IGlzU2ltcGxlVHlwZSgnYm9vbGVhbicpO1xuICAgIHZhciBpc051bWJlciA9IGlzU2ltcGxlVHlwZSgnbnVtYmVyJyk7XG5cbiAgICB2YXIgbWFwID0gZnVuY3Rpb24gKHhzLCBmKSB7XG4gICAgICB2YXIgbGVuID0geHMubGVuZ3RoO1xuICAgICAgdmFyIHIgPSBuZXcgQXJyYXkobGVuKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHggPSB4c1tpXTtcbiAgICAgICAgcltpXSA9IGYoeCwgaSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcjtcbiAgICB9O1xuICAgIHZhciBlYWNoID0gZnVuY3Rpb24gKHhzLCBmKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0geHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHggPSB4c1tpXTtcbiAgICAgICAgZih4LCBpKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBmaWx0ZXIgPSBmdW5jdGlvbiAoeHMsIHByZWQpIHtcbiAgICAgIHZhciByID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0geHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHggPSB4c1tpXTtcbiAgICAgICAgaWYgKHByZWQoeCwgaSkpIHtcbiAgICAgICAgICByLnB1c2goeCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByO1xuICAgIH07XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzO1xuICAgIHZhciBlYWNoJDEgPSBmdW5jdGlvbiAob2JqLCBmKSB7XG4gICAgICB2YXIgcHJvcHMgPSBrZXlzKG9iaik7XG4gICAgICBmb3IgKHZhciBrID0gMCwgbGVuID0gcHJvcHMubGVuZ3RoOyBrIDwgbGVuOyBrKyspIHtcbiAgICAgICAgdmFyIGkgPSBwcm9wc1trXTtcbiAgICAgICAgdmFyIHggPSBvYmpbaV07XG4gICAgICAgIGYoeCwgaSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBHbG9iYWwgPSB0eXBlb2YgZG9tR2xvYmFscy53aW5kb3cgIT09ICd1bmRlZmluZWQnID8gZG9tR2xvYmFscy53aW5kb3cgOiBGdW5jdGlvbigncmV0dXJuIHRoaXM7JykoKTtcblxuICAgIHZhciBURVhUID0gMztcblxuICAgIHZhciB0eXBlID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBlbGVtZW50LmRvbSgpLm5vZGVUeXBlO1xuICAgIH07XG4gICAgdmFyIHZhbHVlID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBlbGVtZW50LmRvbSgpLm5vZGVWYWx1ZTtcbiAgICB9O1xuICAgIHZhciBpc1R5cGUkMSA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHR5cGUoZWxlbWVudCkgPT09IHQ7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGlzVGV4dCA9IGlzVHlwZSQxKFRFWFQpO1xuXG4gICAgdmFyIHJhd1NldCA9IGZ1bmN0aW9uIChkb20sIGtleSwgdmFsdWUpIHtcbiAgICAgIGlmIChpc1N0cmluZyh2YWx1ZSkgfHwgaXNCb29sZWFuKHZhbHVlKSB8fCBpc051bWJlcih2YWx1ZSkpIHtcbiAgICAgICAgZG9tLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlICsgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9tR2xvYmFscy5jb25zb2xlLmVycm9yKCdJbnZhbGlkIGNhbGwgdG8gQXR0ci5zZXQuIEtleSAnLCBrZXksICc6OiBWYWx1ZSAnLCB2YWx1ZSwgJzo6IEVsZW1lbnQgJywgZG9tKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdHRyaWJ1dGUgdmFsdWUgd2FzIG5vdCBzaW1wbGUnKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBzZXQgPSBmdW5jdGlvbiAoZWxlbWVudCwga2V5LCB2YWx1ZSkge1xuICAgICAgcmF3U2V0KGVsZW1lbnQuZG9tKCksIGtleSwgdmFsdWUpO1xuICAgIH07XG4gICAgdmFyIGdldCQxID0gZnVuY3Rpb24gKGVsZW1lbnQsIGtleSkge1xuICAgICAgdmFyIHYgPSBlbGVtZW50LmRvbSgpLmdldEF0dHJpYnV0ZShrZXkpO1xuICAgICAgcmV0dXJuIHYgPT09IG51bGwgPyB1bmRlZmluZWQgOiB2O1xuICAgIH07XG4gICAgdmFyIHJlbW92ZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBrZXkpIHtcbiAgICAgIGVsZW1lbnQuZG9tKCkucmVtb3ZlQXR0cmlidXRlKGtleSk7XG4gICAgfTtcblxuICAgIHZhciByZWFkID0gZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHIpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGdldCQxKGVsZW1lbnQsIGF0dHIpO1xuICAgICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09ICcnID8gW10gOiB2YWx1ZS5zcGxpdCgnICcpO1xuICAgIH07XG4gICAgdmFyIGFkZCA9IGZ1bmN0aW9uIChlbGVtZW50LCBhdHRyLCBpZCkge1xuICAgICAgdmFyIG9sZCA9IHJlYWQoZWxlbWVudCwgYXR0cik7XG4gICAgICB2YXIgbnUgPSBvbGQuY29uY2F0KFtpZF0pO1xuICAgICAgc2V0KGVsZW1lbnQsIGF0dHIsIG51LmpvaW4oJyAnKSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIHZhciByZW1vdmUkMSA9IGZ1bmN0aW9uIChlbGVtZW50LCBhdHRyLCBpZCkge1xuICAgICAgdmFyIG51ID0gZmlsdGVyKHJlYWQoZWxlbWVudCwgYXR0ciksIGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHJldHVybiB2ICE9PSBpZDtcbiAgICAgIH0pO1xuICAgICAgaWYgKG51Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgc2V0KGVsZW1lbnQsIGF0dHIsIG51LmpvaW4oJyAnKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZW1vdmUoZWxlbWVudCwgYXR0cik7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIHZhciBzdXBwb3J0cyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gZWxlbWVudC5kb20oKS5jbGFzc0xpc3QgIT09IHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIHZhciBnZXQkMiA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gcmVhZChlbGVtZW50LCAnY2xhc3MnKTtcbiAgICB9O1xuICAgIHZhciBhZGQkMSA9IGZ1bmN0aW9uIChlbGVtZW50LCBjbGF6eikge1xuICAgICAgcmV0dXJuIGFkZChlbGVtZW50LCAnY2xhc3MnLCBjbGF6eik7XG4gICAgfTtcbiAgICB2YXIgcmVtb3ZlJDIgPSBmdW5jdGlvbiAoZWxlbWVudCwgY2xhenopIHtcbiAgICAgIHJldHVybiByZW1vdmUkMShlbGVtZW50LCAnY2xhc3MnLCBjbGF6eik7XG4gICAgfTtcblxuICAgIHZhciBhZGQkMiA9IGZ1bmN0aW9uIChlbGVtZW50LCBjbGF6eikge1xuICAgICAgaWYgKHN1cHBvcnRzKGVsZW1lbnQpKSB7XG4gICAgICAgIGVsZW1lbnQuZG9tKCkuY2xhc3NMaXN0LmFkZChjbGF6eik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGQkMShlbGVtZW50LCBjbGF6eik7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgY2xlYW5DbGFzcyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICB2YXIgY2xhc3NMaXN0ID0gc3VwcG9ydHMoZWxlbWVudCkgPyBlbGVtZW50LmRvbSgpLmNsYXNzTGlzdCA6IGdldCQyKGVsZW1lbnQpO1xuICAgICAgaWYgKGNsYXNzTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmVtb3ZlKGVsZW1lbnQsICdjbGFzcycpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHJlbW92ZSQzID0gZnVuY3Rpb24gKGVsZW1lbnQsIGNsYXp6KSB7XG4gICAgICBpZiAoc3VwcG9ydHMoZWxlbWVudCkpIHtcbiAgICAgICAgdmFyIGNsYXNzTGlzdCA9IGVsZW1lbnQuZG9tKCkuY2xhc3NMaXN0O1xuICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKGNsYXp6KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlbW92ZSQyKGVsZW1lbnQsIGNsYXp6KTtcbiAgICAgIH1cbiAgICAgIGNsZWFuQ2xhc3MoZWxlbWVudCk7XG4gICAgfTtcblxuICAgIHZhciBmcm9tSHRtbCA9IGZ1bmN0aW9uIChodG1sLCBzY29wZSkge1xuICAgICAgdmFyIGRvYyA9IHNjb3BlIHx8IGRvbUdsb2JhbHMuZG9jdW1lbnQ7XG4gICAgICB2YXIgZGl2ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZGl2LmlubmVySFRNTCA9IGh0bWw7XG4gICAgICBpZiAoIWRpdi5oYXNDaGlsZE5vZGVzKCkgfHwgZGl2LmNoaWxkTm9kZXMubGVuZ3RoID4gMSkge1xuICAgICAgICBkb21HbG9iYWxzLmNvbnNvbGUuZXJyb3IoJ0hUTUwgZG9lcyBub3QgaGF2ZSBhIHNpbmdsZSByb290IG5vZGUnLCBodG1sKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdIVE1MIG11c3QgaGF2ZSBhIHNpbmdsZSByb290IG5vZGUnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmcm9tRG9tKGRpdi5jaGlsZE5vZGVzWzBdKTtcbiAgICB9O1xuICAgIHZhciBmcm9tVGFnID0gZnVuY3Rpb24gKHRhZywgc2NvcGUpIHtcbiAgICAgIHZhciBkb2MgPSBzY29wZSB8fCBkb21HbG9iYWxzLmRvY3VtZW50O1xuICAgICAgdmFyIG5vZGUgPSBkb2MuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgICAgcmV0dXJuIGZyb21Eb20obm9kZSk7XG4gICAgfTtcbiAgICB2YXIgZnJvbVRleHQgPSBmdW5jdGlvbiAodGV4dCwgc2NvcGUpIHtcbiAgICAgIHZhciBkb2MgPSBzY29wZSB8fCBkb21HbG9iYWxzLmRvY3VtZW50O1xuICAgICAgdmFyIG5vZGUgPSBkb2MuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG4gICAgICByZXR1cm4gZnJvbURvbShub2RlKTtcbiAgICB9O1xuICAgIHZhciBmcm9tRG9tID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIGlmIChub2RlID09PSBudWxsIHx8IG5vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vZGUgY2Fubm90IGJlIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4geyBkb206IGNvbnN0YW50KG5vZGUpIH07XG4gICAgfTtcbiAgICB2YXIgZnJvbVBvaW50ID0gZnVuY3Rpb24gKGRvY0VsbSwgeCwgeSkge1xuICAgICAgdmFyIGRvYyA9IGRvY0VsbS5kb20oKTtcbiAgICAgIHJldHVybiBPcHRpb24uZnJvbShkb2MuZWxlbWVudEZyb21Qb2ludCh4LCB5KSkubWFwKGZyb21Eb20pO1xuICAgIH07XG4gICAgdmFyIEVsZW1lbnQgPSB7XG4gICAgICBmcm9tSHRtbDogZnJvbUh0bWwsXG4gICAgICBmcm9tVGFnOiBmcm9tVGFnLFxuICAgICAgZnJvbVRleHQ6IGZyb21UZXh0LFxuICAgICAgZnJvbURvbTogZnJvbURvbSxcbiAgICAgIGZyb21Qb2ludDogZnJvbVBvaW50XG4gICAgfTtcblxuICAgIHZhciBjaGFyTWFwID0ge1xuICAgICAgJ1xceEEwJzogJ25ic3AnLFxuICAgICAgJ1xceEFEJzogJ3NoeSdcbiAgICB9O1xuICAgIHZhciBjaGFyTWFwVG9SZWdFeHAgPSBmdW5jdGlvbiAoY2hhck1hcCwgZ2xvYmFsKSB7XG4gICAgICB2YXIgcmVnRXhwID0gJyc7XG4gICAgICBlYWNoJDEoY2hhck1hcCwgZnVuY3Rpb24gKF92YWx1ZSwga2V5KSB7XG4gICAgICAgIHJlZ0V4cCArPSBrZXk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgUmVnRXhwKCdbJyArIHJlZ0V4cCArICddJywgZ2xvYmFsID8gJ2cnIDogJycpO1xuICAgIH07XG4gICAgdmFyIGNoYXJNYXBUb1NlbGVjdG9yID0gZnVuY3Rpb24gKGNoYXJNYXApIHtcbiAgICAgIHZhciBzZWxlY3RvciA9ICcnO1xuICAgICAgZWFjaCQxKGNoYXJNYXAsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICBzZWxlY3RvciArPSAnLCc7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0b3IgKz0gJ3NwYW4ubWNlLScgKyB2YWx1ZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHNlbGVjdG9yO1xuICAgIH07XG4gICAgdmFyIHJlZ0V4cCA9IGNoYXJNYXBUb1JlZ0V4cChjaGFyTWFwKTtcbiAgICB2YXIgcmVnRXhwR2xvYmFsID0gY2hhck1hcFRvUmVnRXhwKGNoYXJNYXAsIHRydWUpO1xuICAgIHZhciBzZWxlY3RvciA9IGNoYXJNYXBUb1NlbGVjdG9yKGNoYXJNYXApO1xuICAgIHZhciBuYnNwQ2xhc3MgPSAnbWNlLW5ic3AnO1xuXG4gICAgdmFyIHdyYXBDaGFyV2l0aFNwYW4gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiAnPHNwYW4gZGF0YS1tY2UtYm9ndXM9XCIxXCIgY2xhc3M9XCJtY2UtJyArIGNoYXJNYXBbdmFsdWVdICsgJ1wiPicgKyB2YWx1ZSArICc8L3NwYW4+JztcbiAgICB9O1xuXG4gICAgdmFyIGlzTWF0Y2ggPSBmdW5jdGlvbiAobikge1xuICAgICAgdmFyIHZhbHVlJDEgPSB2YWx1ZShuKTtcbiAgICAgIHJldHVybiBpc1RleHQobikgJiYgdmFsdWUkMSAhPT0gdW5kZWZpbmVkICYmIHJlZ0V4cC50ZXN0KHZhbHVlJDEpO1xuICAgIH07XG4gICAgdmFyIGZpbHRlckRlc2NlbmRhbnRzID0gZnVuY3Rpb24gKHNjb3BlLCBwcmVkaWNhdGUpIHtcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgIHZhciBkb20gPSBzY29wZS5kb20oKTtcbiAgICAgIHZhciBjaGlsZHJlbiA9IG1hcChkb20uY2hpbGROb2RlcywgRWxlbWVudC5mcm9tRG9tKTtcbiAgICAgIGVhY2goY2hpbGRyZW4sIGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmIChwcmVkaWNhdGUoeCkpIHtcbiAgICAgICAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KFt4XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmNvbmNhdChmaWx0ZXJEZXNjZW5kYW50cyh4LCBwcmVkaWNhdGUpKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIHZhciBmaW5kUGFyZW50RWxtID0gZnVuY3Rpb24gKGVsbSwgcm9vdEVsbSkge1xuICAgICAgd2hpbGUgKGVsbS5wYXJlbnROb2RlKSB7XG4gICAgICAgIGlmIChlbG0ucGFyZW50Tm9kZSA9PT0gcm9vdEVsbSkge1xuICAgICAgICAgIHJldHVybiBlbG07XG4gICAgICAgIH1cbiAgICAgICAgZWxtID0gZWxtLnBhcmVudE5vZGU7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgcmVwbGFjZVdpdGhTcGFucyA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKHJlZ0V4cEdsb2JhbCwgd3JhcENoYXJXaXRoU3Bhbik7XG4gICAgfTtcblxuICAgIHZhciBpc1dyYXBwZWROYnNwID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIHJldHVybiBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzcGFuJyAmJiBub2RlLmNsYXNzTGlzdC5jb250YWlucygnbWNlLW5ic3Atd3JhcCcpO1xuICAgIH07XG4gICAgdmFyIHNob3cgPSBmdW5jdGlvbiAoZWRpdG9yLCByb290RWxtKSB7XG4gICAgICB2YXIgbm9kZUxpc3QgPSBmaWx0ZXJEZXNjZW5kYW50cyhFbGVtZW50LmZyb21Eb20ocm9vdEVsbSksIGlzTWF0Y2gpO1xuICAgICAgZWFjaChub2RlTGlzdCwgZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IG4uZG9tKCkucGFyZW50Tm9kZTtcbiAgICAgICAgaWYgKGlzV3JhcHBlZE5ic3AocGFyZW50KSkge1xuICAgICAgICAgIGFkZCQyKEVsZW1lbnQuZnJvbURvbShwYXJlbnQpLCBuYnNwQ2xhc3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciB3aXRoU3BhbnMgPSByZXBsYWNlV2l0aFNwYW5zKGVkaXRvci5kb20uZW5jb2RlKHZhbHVlKG4pKSk7XG4gICAgICAgICAgdmFyIGRpdiA9IGVkaXRvci5kb20uY3JlYXRlKCdkaXYnLCBudWxsLCB3aXRoU3BhbnMpO1xuICAgICAgICAgIHZhciBub2RlID0gdm9pZCAwO1xuICAgICAgICAgIHdoaWxlIChub2RlID0gZGl2Lmxhc3RDaGlsZCkge1xuICAgICAgICAgICAgZWRpdG9yLmRvbS5pbnNlcnRBZnRlcihub2RlLCBuLmRvbSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWRpdG9yLmRvbS5yZW1vdmUobi5kb20oKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGhpZGUgPSBmdW5jdGlvbiAoZWRpdG9yLCByb290RWxtKSB7XG4gICAgICB2YXIgbm9kZUxpc3QgPSBlZGl0b3IuZG9tLnNlbGVjdChzZWxlY3Rvciwgcm9vdEVsbSk7XG4gICAgICBlYWNoKG5vZGVMaXN0LCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBpZiAoaXNXcmFwcGVkTmJzcChub2RlKSkge1xuICAgICAgICAgIHJlbW92ZSQzKEVsZW1lbnQuZnJvbURvbShub2RlKSwgbmJzcENsYXNzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlZGl0b3IuZG9tLnJlbW92ZShub2RlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgdG9nZ2xlID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGJvZHkgPSBlZGl0b3IuZ2V0Qm9keSgpO1xuICAgICAgdmFyIGJvb2ttYXJrID0gZWRpdG9yLnNlbGVjdGlvbi5nZXRCb29rbWFyaygpO1xuICAgICAgdmFyIHBhcmVudE5vZGUgPSBmaW5kUGFyZW50RWxtKGVkaXRvci5zZWxlY3Rpb24uZ2V0Tm9kZSgpLCBib2R5KTtcbiAgICAgIHBhcmVudE5vZGUgPSBwYXJlbnROb2RlICE9PSB1bmRlZmluZWQgPyBwYXJlbnROb2RlIDogYm9keTtcbiAgICAgIGhpZGUoZWRpdG9yLCBwYXJlbnROb2RlKTtcbiAgICAgIHNob3coZWRpdG9yLCBwYXJlbnROb2RlKTtcbiAgICAgIGVkaXRvci5zZWxlY3Rpb24ubW92ZVRvQm9va21hcmsoYm9va21hcmspO1xuICAgIH07XG5cbiAgICB2YXIgdG9nZ2xlVmlzdWFsQ2hhcnMgPSBmdW5jdGlvbiAoZWRpdG9yLCB0b2dnbGVTdGF0ZSkge1xuICAgICAgdmFyIGJvZHkgPSBlZGl0b3IuZ2V0Qm9keSgpO1xuICAgICAgdmFyIHNlbGVjdGlvbiA9IGVkaXRvci5zZWxlY3Rpb247XG4gICAgICB0b2dnbGVTdGF0ZS5zZXQoIXRvZ2dsZVN0YXRlLmdldCgpKTtcbiAgICAgIGZpcmVWaXN1YWxDaGFycyhlZGl0b3IsIHRvZ2dsZVN0YXRlLmdldCgpKTtcbiAgICAgIHZhciBib29rbWFyayA9IHNlbGVjdGlvbi5nZXRCb29rbWFyaygpO1xuICAgICAgaWYgKHRvZ2dsZVN0YXRlLmdldCgpID09PSB0cnVlKSB7XG4gICAgICAgIHNob3coZWRpdG9yLCBib2R5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhpZGUoZWRpdG9yLCBib2R5KTtcbiAgICAgIH1cbiAgICAgIHNlbGVjdGlvbi5tb3ZlVG9Cb29rbWFyayhib29rbWFyayk7XG4gICAgfTtcblxuICAgIHZhciByZWdpc3RlciA9IGZ1bmN0aW9uIChlZGl0b3IsIHRvZ2dsZVN0YXRlKSB7XG4gICAgICBlZGl0b3IuYWRkQ29tbWFuZCgnbWNlVmlzdWFsQ2hhcnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRvZ2dsZVZpc3VhbENoYXJzKGVkaXRvciwgdG9nZ2xlU3RhdGUpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBnbG9iYWwkMSA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuRGVsYXknKTtcblxuICAgIHZhciBpc0VuYWJsZWRCeURlZmF1bHQgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCd2aXN1YWxjaGFyc19kZWZhdWx0X3N0YXRlJywgZmFsc2UpO1xuICAgIH07XG4gICAgdmFyIGhhc0ZvcmNlZFJvb3RCbG9jayA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2ZvcmNlZF9yb290X2Jsb2NrJykgIT09IGZhbHNlO1xuICAgIH07XG5cbiAgICB2YXIgc2V0dXAgPSBmdW5jdGlvbiAoZWRpdG9yLCB0b2dnbGVTdGF0ZSkge1xuICAgICAgdmFyIGRlYm91bmNlZFRvZ2dsZSA9IGdsb2JhbCQxLmRlYm91bmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdG9nZ2xlKGVkaXRvcik7XG4gICAgICB9LCAzMDApO1xuICAgICAgaWYgKGhhc0ZvcmNlZFJvb3RCbG9jayhlZGl0b3IpKSB7XG4gICAgICAgIGVkaXRvci5vbigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgaWYgKHRvZ2dsZVN0YXRlLmdldCgpID09PSB0cnVlKSB7XG4gICAgICAgICAgICBlLmtleUNvZGUgPT09IDEzID8gdG9nZ2xlKGVkaXRvcikgOiBkZWJvdW5jZWRUb2dnbGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgc2V0dXAkMSA9IGZ1bmN0aW9uIChlZGl0b3IsIHRvZ2dsZVN0YXRlKSB7XG4gICAgICBlZGl0b3Iub24oJ2luaXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB2YWx1ZUZvclRvZ2dsaW5nID0gIWlzRW5hYmxlZEJ5RGVmYXVsdChlZGl0b3IpO1xuICAgICAgICB0b2dnbGVTdGF0ZS5zZXQodmFsdWVGb3JUb2dnbGluZyk7XG4gICAgICAgIHRvZ2dsZVZpc3VhbENoYXJzKGVkaXRvciwgdG9nZ2xlU3RhdGUpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciB0b2dnbGVBY3RpdmVTdGF0ZSA9IGZ1bmN0aW9uIChlZGl0b3IsIGVuYWJsZWRTdGF0ZWQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYXBpKSB7XG4gICAgICAgIGFwaS5zZXRBY3RpdmUoZW5hYmxlZFN0YXRlZC5nZXQoKSk7XG4gICAgICAgIHZhciBlZGl0b3JFdmVudENhbGxiYWNrID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICByZXR1cm4gYXBpLnNldEFjdGl2ZShlLnN0YXRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgZWRpdG9yLm9uKCdWaXN1YWxDaGFycycsIGVkaXRvckV2ZW50Q2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBlZGl0b3Iub2ZmKCdWaXN1YWxDaGFycycsIGVkaXRvckV2ZW50Q2FsbGJhY2spO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciByZWdpc3RlciQxID0gZnVuY3Rpb24gKGVkaXRvciwgdG9nZ2xlU3RhdGUpIHtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRUb2dnbGVCdXR0b24oJ3Zpc3VhbGNoYXJzJywge1xuICAgICAgICB0b29sdGlwOiAnU2hvdyBpbnZpc2libGUgY2hhcmFjdGVycycsXG4gICAgICAgIGljb246ICd2aXN1YWxjaGFycycsXG4gICAgICAgIG9uQWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci5leGVjQ29tbWFuZCgnbWNlVmlzdWFsQ2hhcnMnKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TZXR1cDogdG9nZ2xlQWN0aXZlU3RhdGUoZWRpdG9yLCB0b2dnbGVTdGF0ZSlcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZFRvZ2dsZU1lbnVJdGVtKCd2aXN1YWxjaGFycycsIHtcbiAgICAgICAgdGV4dDogJ1Nob3cgaW52aXNpYmxlIGNoYXJhY3RlcnMnLFxuICAgICAgICBpY29uOiAndmlzdWFsY2hhcnMnLFxuICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBlZGl0b3IuZXhlY0NvbW1hbmQoJ21jZVZpc3VhbENoYXJzJyk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uU2V0dXA6IHRvZ2dsZUFjdGl2ZVN0YXRlKGVkaXRvciwgdG9nZ2xlU3RhdGUpXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gUGx1Z2luICgpIHtcbiAgICAgIGdsb2JhbC5hZGQoJ3Zpc3VhbGNoYXJzJywgZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICB2YXIgdG9nZ2xlU3RhdGUgPSBDZWxsKGZhbHNlKTtcbiAgICAgICAgcmVnaXN0ZXIoZWRpdG9yLCB0b2dnbGVTdGF0ZSk7XG4gICAgICAgIHJlZ2lzdGVyJDEoZWRpdG9yLCB0b2dnbGVTdGF0ZSk7XG4gICAgICAgIHNldHVwKGVkaXRvciwgdG9nZ2xlU3RhdGUpO1xuICAgICAgICBzZXR1cCQxKGVkaXRvciwgdG9nZ2xlU3RhdGUpO1xuICAgICAgICByZXR1cm4gZ2V0KHRvZ2dsZVN0YXRlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIFBsdWdpbigpO1xuXG59KHdpbmRvdykpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==