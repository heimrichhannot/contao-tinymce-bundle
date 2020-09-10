(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-directionality-plugin"],{

/***/ "./node_modules/tinymce/plugins/directionality/plugin.js":
/*!***************************************************************!*\
  !*** ./node_modules/tinymce/plugins/directionality/plugin.js ***!
  \***************************************************************/
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

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var setDir = function (editor, dir) {
      var dom = editor.dom;
      var curDir;
      var blocks = editor.selection.getSelectedBlocks();
      if (blocks.length) {
        curDir = dom.getAttrib(blocks[0], 'dir');
        global$1.each(blocks, function (block) {
          if (!dom.getParent(block.parentNode, '*[dir="' + dir + '"]', dom.getRoot())) {
            dom.setAttrib(block, 'dir', curDir !== dir ? dir : null);
          }
        });
        editor.nodeChanged();
      }
    };

    var register = function (editor) {
      editor.addCommand('mceDirectionLTR', function () {
        setDir(editor, 'ltr');
      });
      editor.addCommand('mceDirectionRTL', function () {
        setDir(editor, 'rtl');
      });
    };

    var noop = function () {
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

    var isSimpleType = function (type) {
      return function (value) {
        return typeof value === type;
      };
    };
    var isFunction = isSimpleType('function');

    var isSupported = function (dom) {
      return dom.style !== undefined && isFunction(dom.style.getPropertyValue);
    };

    var Global = typeof domGlobals.window !== 'undefined' ? domGlobals.window : Function('return this;')();

    var DOCUMENT = 9;
    var DOCUMENT_FRAGMENT = 11;
    var TEXT = 3;

    var type = function (element) {
      return element.dom().nodeType;
    };
    var isType = function (t) {
      return function (element) {
        return type(element) === t;
      };
    };
    var isText = isType(TEXT);
    var isDocument = isType(DOCUMENT);
    var isDocumentFragment = isType(DOCUMENT_FRAGMENT);

    var owner = function (element) {
      return Element.fromDom(element.dom().ownerDocument);
    };
    var documentOrOwner = function (dos) {
      return isDocument(dos) ? dos : owner(dos);
    };

    var isShadowRoot = function (dos) {
      return isDocumentFragment(dos);
    };
    var supported = isFunction(domGlobals.Element.prototype.attachShadow) && isFunction(domGlobals.Node.prototype.getRootNode);
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

    var inBody = function (element) {
      var dom = isText(element) ? element.dom().parentNode : element.dom();
      if (dom === undefined || dom === null || dom.ownerDocument === null) {
        return false;
      }
      return getShadowRoot(Element.fromDom(dom)).fold(function () {
        return dom.ownerDocument.body.contains(dom);
      }, compose1(inBody, getShadowHost));
    };

    var get = function (element, property) {
      var dom = element.dom();
      var styles = domGlobals.window.getComputedStyle(dom);
      var r = styles.getPropertyValue(property);
      return r === '' && !inBody(element) ? getUnsafeProperty(dom, property) : r;
    };
    var getUnsafeProperty = function (dom, property) {
      return isSupported(dom) ? dom.style.getPropertyValue(property) : '';
    };

    var getDirection = function (element) {
      return get(element, 'direction') === 'rtl' ? 'rtl' : 'ltr';
    };

    var getNodeChangeHandler = function (editor, dir) {
      return function (api) {
        var nodeChangeHandler = function (e) {
          var element = Element.fromDom(e.element);
          api.setActive(getDirection(element) === dir);
        };
        editor.on('NodeChange', nodeChangeHandler);
        return function () {
          return editor.off('NodeChange', nodeChangeHandler);
        };
      };
    };
    var register$1 = function (editor) {
      editor.ui.registry.addToggleButton('ltr', {
        tooltip: 'Left to right',
        icon: 'ltr',
        onAction: function () {
          return editor.execCommand('mceDirectionLTR');
        },
        onSetup: getNodeChangeHandler(editor, 'ltr')
      });
      editor.ui.registry.addToggleButton('rtl', {
        tooltip: 'Right to left',
        icon: 'rtl',
        onAction: function () {
          return editor.execCommand('mceDirectionRTL');
        },
        onSetup: getNodeChangeHandler(editor, 'rtl')
      });
    };

    function Plugin () {
      global.add('directionality', function (editor) {
        register(editor);
        register$1(editor);
      });
    }

    Plugin();

}(window));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2RpcmVjdGlvbmFsaXR5L3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0dBQXNHOztBQUV0RztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7O0FBRUEsQ0FBQyIsImZpbGUiOiJ0aW55bWNlLXBsdWdpbi1kaXJlY3Rpb25hbGl0eS1wbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqXG4gKiBWZXJzaW9uOiA1LjQuMiAoMjAyMC0wOC0xNylcbiAqL1xuKGZ1bmN0aW9uIChkb21HbG9iYWxzKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIGdsb2JhbCA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLlBsdWdpbk1hbmFnZXInKTtcblxuICAgIHZhciBnbG9iYWwkMSA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuVG9vbHMnKTtcblxuICAgIHZhciBzZXREaXIgPSBmdW5jdGlvbiAoZWRpdG9yLCBkaXIpIHtcbiAgICAgIHZhciBkb20gPSBlZGl0b3IuZG9tO1xuICAgICAgdmFyIGN1ckRpcjtcbiAgICAgIHZhciBibG9ja3MgPSBlZGl0b3Iuc2VsZWN0aW9uLmdldFNlbGVjdGVkQmxvY2tzKCk7XG4gICAgICBpZiAoYmxvY2tzLmxlbmd0aCkge1xuICAgICAgICBjdXJEaXIgPSBkb20uZ2V0QXR0cmliKGJsb2Nrc1swXSwgJ2RpcicpO1xuICAgICAgICBnbG9iYWwkMS5lYWNoKGJsb2NrcywgZnVuY3Rpb24gKGJsb2NrKSB7XG4gICAgICAgICAgaWYgKCFkb20uZ2V0UGFyZW50KGJsb2NrLnBhcmVudE5vZGUsICcqW2Rpcj1cIicgKyBkaXIgKyAnXCJdJywgZG9tLmdldFJvb3QoKSkpIHtcbiAgICAgICAgICAgIGRvbS5zZXRBdHRyaWIoYmxvY2ssICdkaXInLCBjdXJEaXIgIT09IGRpciA/IGRpciA6IG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGVkaXRvci5ub2RlQ2hhbmdlZCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgcmVnaXN0ZXIgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBlZGl0b3IuYWRkQ29tbWFuZCgnbWNlRGlyZWN0aW9uTFRSJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXREaXIoZWRpdG9yLCAnbHRyJyk7XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci5hZGRDb21tYW5kKCdtY2VEaXJlY3Rpb25SVEwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldERpcihlZGl0b3IsICdydGwnKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHtcbiAgICB9O1xuICAgIHZhciBjb21wb3NlMSA9IGZ1bmN0aW9uIChmYmMsIGZhYikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICAgIHJldHVybiBmYmMoZmFiKGEpKTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgY29uc3RhbnQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgbmV2ZXIgPSBjb25zdGFudChmYWxzZSk7XG4gICAgdmFyIGFsd2F5cyA9IGNvbnN0YW50KHRydWUpO1xuXG4gICAgdmFyIG5vbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gTk9ORTtcbiAgICB9O1xuICAgIHZhciBOT05FID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGVxID0gZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgcmV0dXJuIG8uaXNOb25lKCk7XG4gICAgICB9O1xuICAgICAgdmFyIGNhbGwgPSBmdW5jdGlvbiAodGh1bmspIHtcbiAgICAgICAgcmV0dXJuIHRodW5rKCk7XG4gICAgICB9O1xuICAgICAgdmFyIGlkID0gZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgcmV0dXJuIG47XG4gICAgICB9O1xuICAgICAgdmFyIG1lID0ge1xuICAgICAgICBmb2xkOiBmdW5jdGlvbiAobiwgX3MpIHtcbiAgICAgICAgICByZXR1cm4gbigpO1xuICAgICAgICB9LFxuICAgICAgICBpczogbmV2ZXIsXG4gICAgICAgIGlzU29tZTogbmV2ZXIsXG4gICAgICAgIGlzTm9uZTogYWx3YXlzLFxuICAgICAgICBnZXRPcjogaWQsXG4gICAgICAgIGdldE9yVGh1bms6IGNhbGwsXG4gICAgICAgIGdldE9yRGllOiBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyB8fCAnZXJyb3I6IGdldE9yRGllIGNhbGxlZCBvbiBub25lLicpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRPck51bGw6IGNvbnN0YW50KG51bGwpLFxuICAgICAgICBnZXRPclVuZGVmaW5lZDogY29uc3RhbnQodW5kZWZpbmVkKSxcbiAgICAgICAgb3I6IGlkLFxuICAgICAgICBvclRodW5rOiBjYWxsLFxuICAgICAgICBtYXA6IG5vbmUsXG4gICAgICAgIGVhY2g6IG5vb3AsXG4gICAgICAgIGJpbmQ6IG5vbmUsXG4gICAgICAgIGV4aXN0czogbmV2ZXIsXG4gICAgICAgIGZvcmFsbDogYWx3YXlzLFxuICAgICAgICBmaWx0ZXI6IG5vbmUsXG4gICAgICAgIGVxdWFsczogZXEsXG4gICAgICAgIGVxdWFsc186IGVxLFxuICAgICAgICB0b0FycmF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9LFxuICAgICAgICB0b1N0cmluZzogY29uc3RhbnQoJ25vbmUoKScpXG4gICAgICB9O1xuICAgICAgcmV0dXJuIG1lO1xuICAgIH0oKTtcbiAgICB2YXIgc29tZSA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICB2YXIgY29uc3RhbnRfYSA9IGNvbnN0YW50KGEpO1xuICAgICAgdmFyIHNlbGYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBtZTtcbiAgICAgIH07XG4gICAgICB2YXIgYmluZCA9IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHJldHVybiBmKGEpO1xuICAgICAgfTtcbiAgICAgIHZhciBtZSA9IHtcbiAgICAgICAgZm9sZDogZnVuY3Rpb24gKG4sIHMpIHtcbiAgICAgICAgICByZXR1cm4gcyhhKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXM6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgcmV0dXJuIGEgPT09IHY7XG4gICAgICAgIH0sXG4gICAgICAgIGlzU29tZTogYWx3YXlzLFxuICAgICAgICBpc05vbmU6IG5ldmVyLFxuICAgICAgICBnZXRPcjogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JUaHVuazogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JEaWU6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yTnVsbDogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JVbmRlZmluZWQ6IGNvbnN0YW50X2EsXG4gICAgICAgIG9yOiBzZWxmLFxuICAgICAgICBvclRodW5rOiBzZWxmLFxuICAgICAgICBtYXA6IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgcmV0dXJuIHNvbWUoZihhKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVhY2g6IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgZihhKTtcbiAgICAgICAgfSxcbiAgICAgICAgYmluZDogYmluZCxcbiAgICAgICAgZXhpc3RzOiBiaW5kLFxuICAgICAgICBmb3JhbGw6IGJpbmQsXG4gICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICByZXR1cm4gZihhKSA/IG1lIDogTk9ORTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9BcnJheTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBbYV07XG4gICAgICAgIH0sXG4gICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuICdzb21lKCcgKyBhICsgJyknO1xuICAgICAgICB9LFxuICAgICAgICBlcXVhbHM6IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgICAgcmV0dXJuIG8uaXMoYSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVxdWFsc186IGZ1bmN0aW9uIChvLCBlbGVtZW50RXEpIHtcbiAgICAgICAgICByZXR1cm4gby5mb2xkKG5ldmVyLCBmdW5jdGlvbiAoYikge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRFcShhLCBiKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiBtZTtcbiAgICB9O1xuICAgIHZhciBmcm9tID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCA/IE5PTkUgOiBzb21lKHZhbHVlKTtcbiAgICB9O1xuICAgIHZhciBPcHRpb24gPSB7XG4gICAgICBzb21lOiBzb21lLFxuICAgICAgbm9uZTogbm9uZSxcbiAgICAgIGZyb206IGZyb21cbiAgICB9O1xuXG4gICAgdmFyIGZyb21IdG1sID0gZnVuY3Rpb24gKGh0bWwsIHNjb3BlKSB7XG4gICAgICB2YXIgZG9jID0gc2NvcGUgfHwgZG9tR2xvYmFscy5kb2N1bWVudDtcbiAgICAgIHZhciBkaXYgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgIGlmICghZGl2Lmhhc0NoaWxkTm9kZXMoKSB8fCBkaXYuY2hpbGROb2Rlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGRvbUdsb2JhbHMuY29uc29sZS5lcnJvcignSFRNTCBkb2VzIG5vdCBoYXZlIGEgc2luZ2xlIHJvb3Qgbm9kZScsIGh0bWwpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0hUTUwgbXVzdCBoYXZlIGEgc2luZ2xlIHJvb3Qgbm9kZScpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZyb21Eb20oZGl2LmNoaWxkTm9kZXNbMF0pO1xuICAgIH07XG4gICAgdmFyIGZyb21UYWcgPSBmdW5jdGlvbiAodGFnLCBzY29wZSkge1xuICAgICAgdmFyIGRvYyA9IHNjb3BlIHx8IGRvbUdsb2JhbHMuZG9jdW1lbnQ7XG4gICAgICB2YXIgbm9kZSA9IGRvYy5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgICByZXR1cm4gZnJvbURvbShub2RlKTtcbiAgICB9O1xuICAgIHZhciBmcm9tVGV4dCA9IGZ1bmN0aW9uICh0ZXh0LCBzY29wZSkge1xuICAgICAgdmFyIGRvYyA9IHNjb3BlIHx8IGRvbUdsb2JhbHMuZG9jdW1lbnQ7XG4gICAgICB2YXIgbm9kZSA9IGRvYy5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbiAgICAgIHJldHVybiBmcm9tRG9tKG5vZGUpO1xuICAgIH07XG4gICAgdmFyIGZyb21Eb20gPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgaWYgKG5vZGUgPT09IG51bGwgfHwgbm9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm9kZSBjYW5ub3QgYmUgbnVsbCBvciB1bmRlZmluZWQnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IGRvbTogY29uc3RhbnQobm9kZSkgfTtcbiAgICB9O1xuICAgIHZhciBmcm9tUG9pbnQgPSBmdW5jdGlvbiAoZG9jRWxtLCB4LCB5KSB7XG4gICAgICB2YXIgZG9jID0gZG9jRWxtLmRvbSgpO1xuICAgICAgcmV0dXJuIE9wdGlvbi5mcm9tKGRvYy5lbGVtZW50RnJvbVBvaW50KHgsIHkpKS5tYXAoZnJvbURvbSk7XG4gICAgfTtcbiAgICB2YXIgRWxlbWVudCA9IHtcbiAgICAgIGZyb21IdG1sOiBmcm9tSHRtbCxcbiAgICAgIGZyb21UYWc6IGZyb21UYWcsXG4gICAgICBmcm9tVGV4dDogZnJvbVRleHQsXG4gICAgICBmcm9tRG9tOiBmcm9tRG9tLFxuICAgICAgZnJvbVBvaW50OiBmcm9tUG9pbnRcbiAgICB9O1xuXG4gICAgdmFyIGlzU2ltcGxlVHlwZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IHR5cGU7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGlzRnVuY3Rpb24gPSBpc1NpbXBsZVR5cGUoJ2Z1bmN0aW9uJyk7XG5cbiAgICB2YXIgaXNTdXBwb3J0ZWQgPSBmdW5jdGlvbiAoZG9tKSB7XG4gICAgICByZXR1cm4gZG9tLnN0eWxlICE9PSB1bmRlZmluZWQgJiYgaXNGdW5jdGlvbihkb20uc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSk7XG4gICAgfTtcblxuICAgIHZhciBHbG9iYWwgPSB0eXBlb2YgZG9tR2xvYmFscy53aW5kb3cgIT09ICd1bmRlZmluZWQnID8gZG9tR2xvYmFscy53aW5kb3cgOiBGdW5jdGlvbigncmV0dXJuIHRoaXM7JykoKTtcblxuICAgIHZhciBET0NVTUVOVCA9IDk7XG4gICAgdmFyIERPQ1VNRU5UX0ZSQUdNRU5UID0gMTE7XG4gICAgdmFyIFRFWFQgPSAzO1xuXG4gICAgdmFyIHR5cGUgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQuZG9tKCkubm9kZVR5cGU7XG4gICAgfTtcbiAgICB2YXIgaXNUeXBlID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdHlwZShlbGVtZW50KSA9PT0gdDtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgaXNUZXh0ID0gaXNUeXBlKFRFWFQpO1xuICAgIHZhciBpc0RvY3VtZW50ID0gaXNUeXBlKERPQ1VNRU5UKTtcbiAgICB2YXIgaXNEb2N1bWVudEZyYWdtZW50ID0gaXNUeXBlKERPQ1VNRU5UX0ZSQUdNRU5UKTtcblxuICAgIHZhciBvd25lciA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gRWxlbWVudC5mcm9tRG9tKGVsZW1lbnQuZG9tKCkub3duZXJEb2N1bWVudCk7XG4gICAgfTtcbiAgICB2YXIgZG9jdW1lbnRPck93bmVyID0gZnVuY3Rpb24gKGRvcykge1xuICAgICAgcmV0dXJuIGlzRG9jdW1lbnQoZG9zKSA/IGRvcyA6IG93bmVyKGRvcyk7XG4gICAgfTtcblxuICAgIHZhciBpc1NoYWRvd1Jvb3QgPSBmdW5jdGlvbiAoZG9zKSB7XG4gICAgICByZXR1cm4gaXNEb2N1bWVudEZyYWdtZW50KGRvcyk7XG4gICAgfTtcbiAgICB2YXIgc3VwcG9ydGVkID0gaXNGdW5jdGlvbihkb21HbG9iYWxzLkVsZW1lbnQucHJvdG90eXBlLmF0dGFjaFNoYWRvdykgJiYgaXNGdW5jdGlvbihkb21HbG9iYWxzLk5vZGUucHJvdG90eXBlLmdldFJvb3ROb2RlKTtcbiAgICB2YXIgZ2V0Um9vdE5vZGUgPSBzdXBwb3J0ZWQgPyBmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIEVsZW1lbnQuZnJvbURvbShlLmRvbSgpLmdldFJvb3ROb2RlKCkpO1xuICAgIH0gOiBkb2N1bWVudE9yT3duZXI7XG4gICAgdmFyIGdldFNoYWRvd1Jvb3QgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyIHIgPSBnZXRSb290Tm9kZShlKTtcbiAgICAgIHJldHVybiBpc1NoYWRvd1Jvb3QocikgPyBPcHRpb24uc29tZShyKSA6IE9wdGlvbi5ub25lKCk7XG4gICAgfTtcbiAgICB2YXIgZ2V0U2hhZG93SG9zdCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gRWxlbWVudC5mcm9tRG9tKGUuZG9tKCkuaG9zdCk7XG4gICAgfTtcblxuICAgIHZhciBpbkJvZHkgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgdmFyIGRvbSA9IGlzVGV4dChlbGVtZW50KSA/IGVsZW1lbnQuZG9tKCkucGFyZW50Tm9kZSA6IGVsZW1lbnQuZG9tKCk7XG4gICAgICBpZiAoZG9tID09PSB1bmRlZmluZWQgfHwgZG9tID09PSBudWxsIHx8IGRvbS5vd25lckRvY3VtZW50ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBnZXRTaGFkb3dSb290KEVsZW1lbnQuZnJvbURvbShkb20pKS5mb2xkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGRvbS5vd25lckRvY3VtZW50LmJvZHkuY29udGFpbnMoZG9tKTtcbiAgICAgIH0sIGNvbXBvc2UxKGluQm9keSwgZ2V0U2hhZG93SG9zdCkpO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0ID0gZnVuY3Rpb24gKGVsZW1lbnQsIHByb3BlcnR5KSB7XG4gICAgICB2YXIgZG9tID0gZWxlbWVudC5kb20oKTtcbiAgICAgIHZhciBzdHlsZXMgPSBkb21HbG9iYWxzLndpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvbSk7XG4gICAgICB2YXIgciA9IHN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KTtcbiAgICAgIHJldHVybiByID09PSAnJyAmJiAhaW5Cb2R5KGVsZW1lbnQpID8gZ2V0VW5zYWZlUHJvcGVydHkoZG9tLCBwcm9wZXJ0eSkgOiByO1xuICAgIH07XG4gICAgdmFyIGdldFVuc2FmZVByb3BlcnR5ID0gZnVuY3Rpb24gKGRvbSwgcHJvcGVydHkpIHtcbiAgICAgIHJldHVybiBpc1N1cHBvcnRlZChkb20pID8gZG9tLnN0eWxlLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpIDogJyc7XG4gICAgfTtcblxuICAgIHZhciBnZXREaXJlY3Rpb24gPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIGdldChlbGVtZW50LCAnZGlyZWN0aW9uJykgPT09ICdydGwnID8gJ3J0bCcgOiAnbHRyJztcbiAgICB9O1xuXG4gICAgdmFyIGdldE5vZGVDaGFuZ2VIYW5kbGVyID0gZnVuY3Rpb24gKGVkaXRvciwgZGlyKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGFwaSkge1xuICAgICAgICB2YXIgbm9kZUNoYW5nZUhhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHZhciBlbGVtZW50ID0gRWxlbWVudC5mcm9tRG9tKGUuZWxlbWVudCk7XG4gICAgICAgICAgYXBpLnNldEFjdGl2ZShnZXREaXJlY3Rpb24oZWxlbWVudCkgPT09IGRpcik7XG4gICAgICAgIH07XG4gICAgICAgIGVkaXRvci5vbignTm9kZUNoYW5nZScsIG5vZGVDaGFuZ2VIYW5kbGVyKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZWRpdG9yLm9mZignTm9kZUNoYW5nZScsIG5vZGVDaGFuZ2VIYW5kbGVyKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgcmVnaXN0ZXIkMSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRUb2dnbGVCdXR0b24oJ2x0cicsIHtcbiAgICAgICAgdG9vbHRpcDogJ0xlZnQgdG8gcmlnaHQnLFxuICAgICAgICBpY29uOiAnbHRyJyxcbiAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZWRpdG9yLmV4ZWNDb21tYW5kKCdtY2VEaXJlY3Rpb25MVFInKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TZXR1cDogZ2V0Tm9kZUNoYW5nZUhhbmRsZXIoZWRpdG9yLCAnbHRyJylcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZFRvZ2dsZUJ1dHRvbigncnRsJywge1xuICAgICAgICB0b29sdGlwOiAnUmlnaHQgdG8gbGVmdCcsXG4gICAgICAgIGljb246ICdydGwnLFxuICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBlZGl0b3IuZXhlY0NvbW1hbmQoJ21jZURpcmVjdGlvblJUTCcpO1xuICAgICAgICB9LFxuICAgICAgICBvblNldHVwOiBnZXROb2RlQ2hhbmdlSGFuZGxlcihlZGl0b3IsICdydGwnKVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFBsdWdpbiAoKSB7XG4gICAgICBnbG9iYWwuYWRkKCdkaXJlY3Rpb25hbGl0eScsIGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgICAgcmVnaXN0ZXIoZWRpdG9yKTtcbiAgICAgICAgcmVnaXN0ZXIkMShlZGl0b3IpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgUGx1Z2luKCk7XG5cbn0od2luZG93KSk7XG4iXSwic291cmNlUm9vdCI6IiJ9