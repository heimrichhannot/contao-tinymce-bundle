(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~tinymce-plugin-quickbars~tinymce-plugin-quickbars-plugin"],{

/***/ "./node_modules/tinymce/plugins/quickbars/plugin.js":
/*!**********************************************************!*\
  !*** ./node_modules/tinymce/plugins/quickbars/plugin.js ***!
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
(function (domGlobals) {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var unique = 0;
    var generate = function (prefix) {
      var date = new Date();
      var time = date.getTime();
      var random = Math.floor(Math.random() * 1000000000);
      unique++;
      return prefix + '_' + random + unique + String(time);
    };

    var createTableHtml = function (cols, rows) {
      var x, y, html;
      html = '<table data-mce-id="mce" style="width: 100%">';
      html += '<tbody>';
      for (y = 0; y < rows; y++) {
        html += '<tr>';
        for (x = 0; x < cols; x++) {
          html += '<td><br></td>';
        }
        html += '</tr>';
      }
      html += '</tbody>';
      html += '</table>';
      return html;
    };
    var getInsertedElement = function (editor) {
      var elms = editor.dom.select('*[data-mce-id]');
      return elms[0];
    };
    var insertTableHtml = function (editor, cols, rows) {
      editor.undoManager.transact(function () {
        editor.insertContent(createTableHtml(cols, rows));
        var tableElm = getInsertedElement(editor);
        tableElm.removeAttribute('data-mce-id');
        var cellElm = editor.dom.select('td,th', tableElm);
        editor.selection.setCursorLocation(cellElm[0], 0);
      });
    };
    var insertTable = function (editor, cols, rows) {
      editor.plugins.table ? editor.plugins.table.insertTable(cols, rows) : insertTableHtml(editor, cols, rows);
    };
    var insertBlob = function (editor, base64, blob) {
      var blobCache = editor.editorUpload.blobCache;
      var blobInfo = blobCache.create(generate('mceu'), blob, base64);
      blobCache.add(blobInfo);
      editor.insertContent(editor.dom.createHTML('img', { src: blobInfo.blobUri() }));
    };

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Promise');

    var blobToBase64 = function (blob) {
      return new global$1(function (resolve) {
        var reader = new domGlobals.FileReader();
        reader.onloadend = function () {
          resolve(reader.result.split(',')[1]);
        };
        reader.readAsDataURL(blob);
      });
    };

    var global$2 = tinymce.util.Tools.resolve('tinymce.Env');

    var global$3 = tinymce.util.Tools.resolve('tinymce.util.Delay');

    var pickFile = function (editor) {
      return new global$1(function (resolve) {
        var fileInput = domGlobals.document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.position = 'fixed';
        fileInput.style.left = '0';
        fileInput.style.top = '0';
        fileInput.style.opacity = '0.001';
        domGlobals.document.body.appendChild(fileInput);
        var changeHandler = function (e) {
          resolve(Array.prototype.slice.call(e.target.files));
        };
        fileInput.addEventListener('change', changeHandler);
        var cancelHandler = function (e) {
          var cleanup = function () {
            resolve([]);
            fileInput.parentNode.removeChild(fileInput);
          };
          if (global$2.os.isAndroid() && e.type !== 'remove') {
            global$3.setEditorTimeout(editor, cleanup, 0);
          } else {
            cleanup();
          }
          editor.off('focusin remove', cancelHandler);
        };
        editor.on('focusin remove', cancelHandler);
        fileInput.click();
      });
    };

    var setupButtons = function (editor) {
      editor.ui.registry.addButton('quickimage', {
        icon: 'image',
        tooltip: 'Insert image',
        onAction: function () {
          pickFile(editor).then(function (files) {
            if (files.length > 0) {
              var blob_1 = files[0];
              blobToBase64(blob_1).then(function (base64) {
                insertBlob(editor, base64, blob_1);
              });
            }
          });
        }
      });
      editor.ui.registry.addButton('quicktable', {
        icon: 'table',
        tooltip: 'Insert table',
        onAction: function () {
          insertTable(editor, 2, 2);
        }
      });
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

    var Global = typeof domGlobals.window !== 'undefined' ? domGlobals.window : Function('return this;')();

    var ELEMENT = 1;

    var name = function (element) {
      var r = element.dom().nodeName;
      return r.toLowerCase();
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
    var eq = function (t) {
      return function (a) {
        return t === a;
      };
    };
    var isString = isType('string');
    var isObject = isType('object');
    var isArray = isType('array');
    var isBoolean = isSimpleType('boolean');
    var isUndefined = eq(undefined);
    var isFunction = isSimpleType('function');

    function ClosestOrAncestor (is, ancestor, scope, a, isRoot) {
      return is(scope, a) ? Option.some(scope) : isFunction(isRoot) && isRoot(scope) ? Option.none() : ancestor(scope, a, isRoot);
    }

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

    var supported = isFunction(domGlobals.Element.prototype.attachShadow) && isFunction(domGlobals.Node.prototype.getRootNode);

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

    var ancestor$1 = function (scope, selector, isRoot) {
      return ancestor(scope, function (e) {
        return is(e, selector);
      }, isRoot);
    };
    var closest$1 = function (scope, selector, isRoot) {
      var is$1 = function (element, selector) {
        return is(element, selector);
      };
      return ClosestOrAncestor(is$1, ancestor$1, scope, selector, isRoot);
    };

    var validDefaultOrDie = function (value, predicate) {
      if (predicate(value)) {
        return true;
      }
      throw new Error('Default value doesn\'t match requested type.');
    };
    var items = function (value, defaultValue) {
      if (isArray(value) || isObject(value)) {
        throw new Error('expected a string but found: ' + value);
      }
      if (isUndefined(value)) {
        return defaultValue;
      }
      if (isBoolean(value)) {
        return value === false ? '' : defaultValue;
      }
      return value;
    };
    var getToolbarItemsOr_ = function (predicate) {
      return function (editor, name, defaultValue) {
        validDefaultOrDie(defaultValue, predicate);
        var value = editor.getParam(name, defaultValue);
        return items(value, defaultValue);
      };
    };
    var getToolbarItemsOr = getToolbarItemsOr_(isString);

    var getTextSelectionToolbarItems = function (editor) {
      return getToolbarItemsOr(editor, 'quickbars_selection_toolbar', 'bold italic | quicklink h2 h3 blockquote');
    };
    var getInsertToolbarItems = function (editor) {
      return getToolbarItemsOr(editor, 'quickbars_insert_toolbar', 'quickimage quicktable');
    };
    var getImageToolbarItems = function (editor) {
      return getToolbarItemsOr(editor, 'quickbars_image_toolbar', 'alignleft aligncenter alignright');
    };

    var addToEditor = function (editor) {
      var insertToolbarItems = getInsertToolbarItems(editor);
      if (insertToolbarItems.trim().length > 0) {
        editor.ui.registry.addContextToolbar('quickblock', {
          predicate: function (node) {
            var sugarNode = Element.fromDom(node);
            var textBlockElementsMap = editor.schema.getTextBlockElements();
            var isRoot = function (elem) {
              return elem.dom() === editor.getBody();
            };
            return closest$1(sugarNode, 'table', isRoot).fold(function () {
              return closest(sugarNode, function (elem) {
                return name(elem) in textBlockElementsMap && editor.dom.isEmpty(elem.dom());
              }, isRoot).isSome();
            }, function () {
              return false;
            });
          },
          items: insertToolbarItems,
          position: 'line',
          scope: 'editor'
        });
      }
    };

    var addToEditor$1 = function (editor) {
      var isEditable = function (node) {
        return editor.dom.getContentEditableParent(node) !== 'false';
      };
      var isImage = function (node) {
        return node.nodeName === 'IMG' || node.nodeName === 'FIGURE' && /image/i.test(node.className);
      };
      var imageToolbarItems = getImageToolbarItems(editor);
      if (imageToolbarItems.trim().length > 0) {
        editor.ui.registry.addContextToolbar('imageselection', {
          predicate: isImage,
          items: imageToolbarItems,
          position: 'node'
        });
      }
      var textToolbarItems = getTextSelectionToolbarItems(editor);
      if (textToolbarItems.trim().length > 0) {
        editor.ui.registry.addContextToolbar('textselection', {
          predicate: function (node) {
            return !isImage(node) && !editor.selection.isCollapsed() && isEditable(node);
          },
          items: textToolbarItems,
          position: 'selection',
          scope: 'editor'
        });
      }
    };

    function Plugin () {
      global.add('quickbars', function (editor) {
        setupButtons(editor);
        addToEditor(editor);
        addToEditor$1(editor);
      });
    }

    Plugin();

}(window));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL3F1aWNrYmFycy9wbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixVQUFVO0FBQzNCO0FBQ0EsbUJBQW1CLFVBQVU7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCwwQkFBMEI7QUFDbkY7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBLFdBQVc7QUFDWDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0dBQXNHOztBQUV0Rzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7O0FBRUEsQ0FBQyIsImZpbGUiOiJ2ZW5kb3JzfnRpbnltY2UtcGx1Z2luLXF1aWNrYmFyc350aW55bWNlLXBsdWdpbi1xdWlja2JhcnMtcGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIFRpbnkgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTEdQTCBvciBhIGNvbW1lcmNpYWwgbGljZW5zZS5cbiAqIEZvciBMR1BMIHNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogRm9yIGNvbW1lcmNpYWwgbGljZW5zZXMgc2VlIGh0dHBzOi8vd3d3LnRpbnkuY2xvdWQvXG4gKlxuICogVmVyc2lvbjogNS40LjIgKDIwMjAtMDgtMTcpXG4gKi9cbihmdW5jdGlvbiAoZG9tR2xvYmFscykge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBnbG9iYWwgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5QbHVnaW5NYW5hZ2VyJyk7XG5cbiAgICB2YXIgdW5pcXVlID0gMDtcbiAgICB2YXIgZ2VuZXJhdGUgPSBmdW5jdGlvbiAocHJlZml4KSB7XG4gICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICB2YXIgdGltZSA9IGRhdGUuZ2V0VGltZSgpO1xuICAgICAgdmFyIHJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwMDApO1xuICAgICAgdW5pcXVlKys7XG4gICAgICByZXR1cm4gcHJlZml4ICsgJ18nICsgcmFuZG9tICsgdW5pcXVlICsgU3RyaW5nKHRpbWUpO1xuICAgIH07XG5cbiAgICB2YXIgY3JlYXRlVGFibGVIdG1sID0gZnVuY3Rpb24gKGNvbHMsIHJvd3MpIHtcbiAgICAgIHZhciB4LCB5LCBodG1sO1xuICAgICAgaHRtbCA9ICc8dGFibGUgZGF0YS1tY2UtaWQ9XCJtY2VcIiBzdHlsZT1cIndpZHRoOiAxMDAlXCI+JztcbiAgICAgIGh0bWwgKz0gJzx0Ym9keT4nO1xuICAgICAgZm9yICh5ID0gMDsgeSA8IHJvd3M7IHkrKykge1xuICAgICAgICBodG1sICs9ICc8dHI+JztcbiAgICAgICAgZm9yICh4ID0gMDsgeCA8IGNvbHM7IHgrKykge1xuICAgICAgICAgIGh0bWwgKz0gJzx0ZD48YnI+PC90ZD4nO1xuICAgICAgICB9XG4gICAgICAgIGh0bWwgKz0gJzwvdHI+JztcbiAgICAgIH1cbiAgICAgIGh0bWwgKz0gJzwvdGJvZHk+JztcbiAgICAgIGh0bWwgKz0gJzwvdGFibGU+JztcbiAgICAgIHJldHVybiBodG1sO1xuICAgIH07XG4gICAgdmFyIGdldEluc2VydGVkRWxlbWVudCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBlbG1zID0gZWRpdG9yLmRvbS5zZWxlY3QoJypbZGF0YS1tY2UtaWRdJyk7XG4gICAgICByZXR1cm4gZWxtc1swXTtcbiAgICB9O1xuICAgIHZhciBpbnNlcnRUYWJsZUh0bWwgPSBmdW5jdGlvbiAoZWRpdG9yLCBjb2xzLCByb3dzKSB7XG4gICAgICBlZGl0b3IudW5kb01hbmFnZXIudHJhbnNhY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICBlZGl0b3IuaW5zZXJ0Q29udGVudChjcmVhdGVUYWJsZUh0bWwoY29scywgcm93cykpO1xuICAgICAgICB2YXIgdGFibGVFbG0gPSBnZXRJbnNlcnRlZEVsZW1lbnQoZWRpdG9yKTtcbiAgICAgICAgdGFibGVFbG0ucmVtb3ZlQXR0cmlidXRlKCdkYXRhLW1jZS1pZCcpO1xuICAgICAgICB2YXIgY2VsbEVsbSA9IGVkaXRvci5kb20uc2VsZWN0KCd0ZCx0aCcsIHRhYmxlRWxtKTtcbiAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5zZXRDdXJzb3JMb2NhdGlvbihjZWxsRWxtWzBdLCAwKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGluc2VydFRhYmxlID0gZnVuY3Rpb24gKGVkaXRvciwgY29scywgcm93cykge1xuICAgICAgZWRpdG9yLnBsdWdpbnMudGFibGUgPyBlZGl0b3IucGx1Z2lucy50YWJsZS5pbnNlcnRUYWJsZShjb2xzLCByb3dzKSA6IGluc2VydFRhYmxlSHRtbChlZGl0b3IsIGNvbHMsIHJvd3MpO1xuICAgIH07XG4gICAgdmFyIGluc2VydEJsb2IgPSBmdW5jdGlvbiAoZWRpdG9yLCBiYXNlNjQsIGJsb2IpIHtcbiAgICAgIHZhciBibG9iQ2FjaGUgPSBlZGl0b3IuZWRpdG9yVXBsb2FkLmJsb2JDYWNoZTtcbiAgICAgIHZhciBibG9iSW5mbyA9IGJsb2JDYWNoZS5jcmVhdGUoZ2VuZXJhdGUoJ21jZXUnKSwgYmxvYiwgYmFzZTY0KTtcbiAgICAgIGJsb2JDYWNoZS5hZGQoYmxvYkluZm8pO1xuICAgICAgZWRpdG9yLmluc2VydENvbnRlbnQoZWRpdG9yLmRvbS5jcmVhdGVIVE1MKCdpbWcnLCB7IHNyYzogYmxvYkluZm8uYmxvYlVyaSgpIH0pKTtcbiAgICB9O1xuXG4gICAgdmFyIGdsb2JhbCQxID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UudXRpbC5Qcm9taXNlJyk7XG5cbiAgICB2YXIgYmxvYlRvQmFzZTY0ID0gZnVuY3Rpb24gKGJsb2IpIHtcbiAgICAgIHJldHVybiBuZXcgZ2xvYmFsJDEoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgdmFyIHJlYWRlciA9IG5ldyBkb21HbG9iYWxzLkZpbGVSZWFkZXIoKTtcbiAgICAgICAgcmVhZGVyLm9ubG9hZGVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXNvbHZlKHJlYWRlci5yZXN1bHQuc3BsaXQoJywnKVsxXSk7XG4gICAgICAgIH07XG4gICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGJsb2IpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBnbG9iYWwkMiA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLkVudicpO1xuXG4gICAgdmFyIGdsb2JhbCQzID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UudXRpbC5EZWxheScpO1xuXG4gICAgdmFyIHBpY2tGaWxlID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIG5ldyBnbG9iYWwkMShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICB2YXIgZmlsZUlucHV0ID0gZG9tR2xvYmFscy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBmaWxlSW5wdXQudHlwZSA9ICdmaWxlJztcbiAgICAgICAgZmlsZUlucHV0LmFjY2VwdCA9ICdpbWFnZS8qJztcbiAgICAgICAgZmlsZUlucHV0LnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgICAgZmlsZUlucHV0LnN0eWxlLmxlZnQgPSAnMCc7XG4gICAgICAgIGZpbGVJbnB1dC5zdHlsZS50b3AgPSAnMCc7XG4gICAgICAgIGZpbGVJbnB1dC5zdHlsZS5vcGFjaXR5ID0gJzAuMDAxJztcbiAgICAgICAgZG9tR2xvYmFscy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZpbGVJbnB1dCk7XG4gICAgICAgIHZhciBjaGFuZ2VIYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICByZXNvbHZlKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUudGFyZ2V0LmZpbGVzKSk7XG4gICAgICAgIH07XG4gICAgICAgIGZpbGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBjaGFuZ2VIYW5kbGVyKTtcbiAgICAgICAgdmFyIGNhbmNlbEhhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHZhciBjbGVhbnVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmVzb2x2ZShbXSk7XG4gICAgICAgICAgICBmaWxlSW5wdXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChmaWxlSW5wdXQpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgaWYgKGdsb2JhbCQyLm9zLmlzQW5kcm9pZCgpICYmIGUudHlwZSAhPT0gJ3JlbW92ZScpIHtcbiAgICAgICAgICAgIGdsb2JhbCQzLnNldEVkaXRvclRpbWVvdXQoZWRpdG9yLCBjbGVhbnVwLCAwKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlZGl0b3Iub2ZmKCdmb2N1c2luIHJlbW92ZScsIGNhbmNlbEhhbmRsZXIpO1xuICAgICAgICB9O1xuICAgICAgICBlZGl0b3Iub24oJ2ZvY3VzaW4gcmVtb3ZlJywgY2FuY2VsSGFuZGxlcik7XG4gICAgICAgIGZpbGVJbnB1dC5jbGljaygpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBzZXR1cEJ1dHRvbnMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQnV0dG9uKCdxdWlja2ltYWdlJywge1xuICAgICAgICBpY29uOiAnaW1hZ2UnLFxuICAgICAgICB0b29sdGlwOiAnSW5zZXJ0IGltYWdlJyxcbiAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBwaWNrRmlsZShlZGl0b3IpLnRoZW4oZnVuY3Rpb24gKGZpbGVzKSB7XG4gICAgICAgICAgICBpZiAoZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICB2YXIgYmxvYl8xID0gZmlsZXNbMF07XG4gICAgICAgICAgICAgIGJsb2JUb0Jhc2U2NChibG9iXzEpLnRoZW4oZnVuY3Rpb24gKGJhc2U2NCkge1xuICAgICAgICAgICAgICAgIGluc2VydEJsb2IoZWRpdG9yLCBiYXNlNjQsIGJsb2JfMSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRCdXR0b24oJ3F1aWNrdGFibGUnLCB7XG4gICAgICAgIGljb246ICd0YWJsZScsXG4gICAgICAgIHRvb2x0aXA6ICdJbnNlcnQgdGFibGUnLFxuICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGluc2VydFRhYmxlKGVkaXRvciwgMiwgMik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHtcbiAgICB9O1xuICAgIHZhciBjb25zdGFudCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBuZXZlciA9IGNvbnN0YW50KGZhbHNlKTtcbiAgICB2YXIgYWx3YXlzID0gY29uc3RhbnQodHJ1ZSk7XG5cbiAgICB2YXIgbm9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBOT05FO1xuICAgIH07XG4gICAgdmFyIE5PTkUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgZXEgPSBmdW5jdGlvbiAobykge1xuICAgICAgICByZXR1cm4gby5pc05vbmUoKTtcbiAgICAgIH07XG4gICAgICB2YXIgY2FsbCA9IGZ1bmN0aW9uICh0aHVuaykge1xuICAgICAgICByZXR1cm4gdGh1bmsoKTtcbiAgICAgIH07XG4gICAgICB2YXIgaWQgPSBmdW5jdGlvbiAobikge1xuICAgICAgICByZXR1cm4gbjtcbiAgICAgIH07XG4gICAgICB2YXIgbWUgPSB7XG4gICAgICAgIGZvbGQ6IGZ1bmN0aW9uIChuLCBfcykge1xuICAgICAgICAgIHJldHVybiBuKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzOiBuZXZlcixcbiAgICAgICAgaXNTb21lOiBuZXZlcixcbiAgICAgICAgaXNOb25lOiBhbHdheXMsXG4gICAgICAgIGdldE9yOiBpZCxcbiAgICAgICAgZ2V0T3JUaHVuazogY2FsbCxcbiAgICAgICAgZ2V0T3JEaWU6IGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnIHx8ICdlcnJvcjogZ2V0T3JEaWUgY2FsbGVkIG9uIG5vbmUuJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldE9yTnVsbDogY29uc3RhbnQobnVsbCksXG4gICAgICAgIGdldE9yVW5kZWZpbmVkOiBjb25zdGFudCh1bmRlZmluZWQpLFxuICAgICAgICBvcjogaWQsXG4gICAgICAgIG9yVGh1bms6IGNhbGwsXG4gICAgICAgIG1hcDogbm9uZSxcbiAgICAgICAgZWFjaDogbm9vcCxcbiAgICAgICAgYmluZDogbm9uZSxcbiAgICAgICAgZXhpc3RzOiBuZXZlcixcbiAgICAgICAgZm9yYWxsOiBhbHdheXMsXG4gICAgICAgIGZpbHRlcjogbm9uZSxcbiAgICAgICAgZXF1YWxzOiBlcSxcbiAgICAgICAgZXF1YWxzXzogZXEsXG4gICAgICAgIHRvQXJyYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0sXG4gICAgICAgIHRvU3RyaW5nOiBjb25zdGFudCgnbm9uZSgpJylcbiAgICAgIH07XG4gICAgICByZXR1cm4gbWU7XG4gICAgfSgpO1xuICAgIHZhciBzb21lID0gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHZhciBjb25zdGFudF9hID0gY29uc3RhbnQoYSk7XG4gICAgICB2YXIgc2VsZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG1lO1xuICAgICAgfTtcbiAgICAgIHZhciBiaW5kID0gZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgcmV0dXJuIGYoYSk7XG4gICAgICB9O1xuICAgICAgdmFyIG1lID0ge1xuICAgICAgICBmb2xkOiBmdW5jdGlvbiAobiwgcykge1xuICAgICAgICAgIHJldHVybiBzKGEpO1xuICAgICAgICB9LFxuICAgICAgICBpczogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICByZXR1cm4gYSA9PT0gdjtcbiAgICAgICAgfSxcbiAgICAgICAgaXNTb21lOiBhbHdheXMsXG4gICAgICAgIGlzTm9uZTogbmV2ZXIsXG4gICAgICAgIGdldE9yOiBjb25zdGFudF9hLFxuICAgICAgICBnZXRPclRodW5rOiBjb25zdGFudF9hLFxuICAgICAgICBnZXRPckRpZTogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JOdWxsOiBjb25zdGFudF9hLFxuICAgICAgICBnZXRPclVuZGVmaW5lZDogY29uc3RhbnRfYSxcbiAgICAgICAgb3I6IHNlbGYsXG4gICAgICAgIG9yVGh1bms6IHNlbGYsXG4gICAgICAgIG1hcDogZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICByZXR1cm4gc29tZShmKGEpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZWFjaDogZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICBmKGEpO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kOiBiaW5kLFxuICAgICAgICBleGlzdHM6IGJpbmQsXG4gICAgICAgIGZvcmFsbDogYmluZCxcbiAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiAoZikge1xuICAgICAgICAgIHJldHVybiBmKGEpID8gbWUgOiBOT05FO1xuICAgICAgICB9LFxuICAgICAgICB0b0FycmF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIFthXTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gJ3NvbWUoJyArIGEgKyAnKSc7XG4gICAgICAgIH0sXG4gICAgICAgIGVxdWFsczogZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgICByZXR1cm4gby5pcyhhKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXF1YWxzXzogZnVuY3Rpb24gKG8sIGVsZW1lbnRFcSkge1xuICAgICAgICAgIHJldHVybiBvLmZvbGQobmV2ZXIsIGZ1bmN0aW9uIChiKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudEVxKGEsIGIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIG1lO1xuICAgIH07XG4gICAgdmFyIGZyb20gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gTk9ORSA6IHNvbWUodmFsdWUpO1xuICAgIH07XG4gICAgdmFyIE9wdGlvbiA9IHtcbiAgICAgIHNvbWU6IHNvbWUsXG4gICAgICBub25lOiBub25lLFxuICAgICAgZnJvbTogZnJvbVxuICAgIH07XG5cbiAgICB2YXIgZnJvbUh0bWwgPSBmdW5jdGlvbiAoaHRtbCwgc2NvcGUpIHtcbiAgICAgIHZhciBkb2MgPSBzY29wZSB8fCBkb21HbG9iYWxzLmRvY3VtZW50O1xuICAgICAgdmFyIGRpdiA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGRpdi5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgaWYgKCFkaXYuaGFzQ2hpbGROb2RlcygpIHx8IGRpdi5jaGlsZE5vZGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZG9tR2xvYmFscy5jb25zb2xlLmVycm9yKCdIVE1MIGRvZXMgbm90IGhhdmUgYSBzaW5nbGUgcm9vdCBub2RlJywgaHRtbCk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSFRNTCBtdXN0IGhhdmUgYSBzaW5nbGUgcm9vdCBub2RlJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZnJvbURvbShkaXYuY2hpbGROb2Rlc1swXSk7XG4gICAgfTtcbiAgICB2YXIgZnJvbVRhZyA9IGZ1bmN0aW9uICh0YWcsIHNjb3BlKSB7XG4gICAgICB2YXIgZG9jID0gc2NvcGUgfHwgZG9tR2xvYmFscy5kb2N1bWVudDtcbiAgICAgIHZhciBub2RlID0gZG9jLmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAgIHJldHVybiBmcm9tRG9tKG5vZGUpO1xuICAgIH07XG4gICAgdmFyIGZyb21UZXh0ID0gZnVuY3Rpb24gKHRleHQsIHNjb3BlKSB7XG4gICAgICB2YXIgZG9jID0gc2NvcGUgfHwgZG9tR2xvYmFscy5kb2N1bWVudDtcbiAgICAgIHZhciBub2RlID0gZG9jLmNyZWF0ZVRleHROb2RlKHRleHQpO1xuICAgICAgcmV0dXJuIGZyb21Eb20obm9kZSk7XG4gICAgfTtcbiAgICB2YXIgZnJvbURvbSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICBpZiAobm9kZSA9PT0gbnVsbCB8fCBub2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb2RlIGNhbm5vdCBiZSBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgZG9tOiBjb25zdGFudChub2RlKSB9O1xuICAgIH07XG4gICAgdmFyIGZyb21Qb2ludCA9IGZ1bmN0aW9uIChkb2NFbG0sIHgsIHkpIHtcbiAgICAgIHZhciBkb2MgPSBkb2NFbG0uZG9tKCk7XG4gICAgICByZXR1cm4gT3B0aW9uLmZyb20oZG9jLmVsZW1lbnRGcm9tUG9pbnQoeCwgeSkpLm1hcChmcm9tRG9tKTtcbiAgICB9O1xuICAgIHZhciBFbGVtZW50ID0ge1xuICAgICAgZnJvbUh0bWw6IGZyb21IdG1sLFxuICAgICAgZnJvbVRhZzogZnJvbVRhZyxcbiAgICAgIGZyb21UZXh0OiBmcm9tVGV4dCxcbiAgICAgIGZyb21Eb206IGZyb21Eb20sXG4gICAgICBmcm9tUG9pbnQ6IGZyb21Qb2ludFxuICAgIH07XG5cbiAgICB2YXIgR2xvYmFsID0gdHlwZW9mIGRvbUdsb2JhbHMud2luZG93ICE9PSAndW5kZWZpbmVkJyA/IGRvbUdsb2JhbHMud2luZG93IDogRnVuY3Rpb24oJ3JldHVybiB0aGlzOycpKCk7XG5cbiAgICB2YXIgRUxFTUVOVCA9IDE7XG5cbiAgICB2YXIgbmFtZSA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICB2YXIgciA9IGVsZW1lbnQuZG9tKCkubm9kZU5hbWU7XG4gICAgICByZXR1cm4gci50b0xvd2VyQ2FzZSgpO1xuICAgIH07XG5cbiAgICB2YXIgdHlwZU9mID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgIHZhciB0ID0gdHlwZW9mIHg7XG4gICAgICBpZiAoeCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJ251bGwnO1xuICAgICAgfSBlbHNlIGlmICh0ID09PSAnb2JqZWN0JyAmJiAoQXJyYXkucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoeCkgfHwgeC5jb25zdHJ1Y3RvciAmJiB4LmNvbnN0cnVjdG9yLm5hbWUgPT09ICdBcnJheScpKSB7XG4gICAgICAgIHJldHVybiAnYXJyYXknO1xuICAgICAgfSBlbHNlIGlmICh0ID09PSAnb2JqZWN0JyAmJiAoU3RyaW5nLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKHgpIHx8IHguY29uc3RydWN0b3IgJiYgeC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnU3RyaW5nJykpIHtcbiAgICAgICAgcmV0dXJuICdzdHJpbmcnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgaXNUeXBlID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVPZih2YWx1ZSkgPT09IHR5cGU7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGlzU2ltcGxlVHlwZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IHR5cGU7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGVxID0gZnVuY3Rpb24gKHQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgICByZXR1cm4gdCA9PT0gYTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgaXNTdHJpbmcgPSBpc1R5cGUoJ3N0cmluZycpO1xuICAgIHZhciBpc09iamVjdCA9IGlzVHlwZSgnb2JqZWN0Jyk7XG4gICAgdmFyIGlzQXJyYXkgPSBpc1R5cGUoJ2FycmF5Jyk7XG4gICAgdmFyIGlzQm9vbGVhbiA9IGlzU2ltcGxlVHlwZSgnYm9vbGVhbicpO1xuICAgIHZhciBpc1VuZGVmaW5lZCA9IGVxKHVuZGVmaW5lZCk7XG4gICAgdmFyIGlzRnVuY3Rpb24gPSBpc1NpbXBsZVR5cGUoJ2Z1bmN0aW9uJyk7XG5cbiAgICBmdW5jdGlvbiBDbG9zZXN0T3JBbmNlc3RvciAoaXMsIGFuY2VzdG9yLCBzY29wZSwgYSwgaXNSb290KSB7XG4gICAgICByZXR1cm4gaXMoc2NvcGUsIGEpID8gT3B0aW9uLnNvbWUoc2NvcGUpIDogaXNGdW5jdGlvbihpc1Jvb3QpICYmIGlzUm9vdChzY29wZSkgPyBPcHRpb24ubm9uZSgpIDogYW5jZXN0b3Ioc2NvcGUsIGEsIGlzUm9vdCk7XG4gICAgfVxuXG4gICAgdmFyIGlzID0gZnVuY3Rpb24gKGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgICB2YXIgZG9tID0gZWxlbWVudC5kb20oKTtcbiAgICAgIGlmIChkb20ubm9kZVR5cGUgIT09IEVMRU1FTlQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGVsZW0gPSBkb207XG4gICAgICAgIGlmIChlbGVtLm1hdGNoZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBlbGVtLm1hdGNoZXMoc2VsZWN0b3IpO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW0ubXNNYXRjaGVzU2VsZWN0b3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBlbGVtLm1zTWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtLndlYmtpdE1hdGNoZXNTZWxlY3RvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIGVsZW0ud2Via2l0TWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtLm1vek1hdGNoZXNTZWxlY3RvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIGVsZW0ubW96TWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jyb3dzZXIgbGFja3MgbmF0aXZlIHNlbGVjdG9ycycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBzdXBwb3J0ZWQgPSBpc0Z1bmN0aW9uKGRvbUdsb2JhbHMuRWxlbWVudC5wcm90b3R5cGUuYXR0YWNoU2hhZG93KSAmJiBpc0Z1bmN0aW9uKGRvbUdsb2JhbHMuTm9kZS5wcm90b3R5cGUuZ2V0Um9vdE5vZGUpO1xuXG4gICAgdmFyIGFuY2VzdG9yID0gZnVuY3Rpb24gKHNjb3BlLCBwcmVkaWNhdGUsIGlzUm9vdCkge1xuICAgICAgdmFyIGVsZW1lbnQgPSBzY29wZS5kb20oKTtcbiAgICAgIHZhciBzdG9wID0gaXNGdW5jdGlvbihpc1Jvb3QpID8gaXNSb290IDogY29uc3RhbnQoZmFsc2UpO1xuICAgICAgd2hpbGUgKGVsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICB2YXIgZWwgPSBFbGVtZW50LmZyb21Eb20oZWxlbWVudCk7XG4gICAgICAgIGlmIChwcmVkaWNhdGUoZWwpKSB7XG4gICAgICAgICAgcmV0dXJuIE9wdGlvbi5zb21lKGVsKTtcbiAgICAgICAgfSBlbHNlIGlmIChzdG9wKGVsKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gT3B0aW9uLm5vbmUoKTtcbiAgICB9O1xuICAgIHZhciBjbG9zZXN0ID0gZnVuY3Rpb24gKHNjb3BlLCBwcmVkaWNhdGUsIGlzUm9vdCkge1xuICAgICAgdmFyIGlzID0gZnVuY3Rpb24gKHMsIHRlc3QpIHtcbiAgICAgICAgcmV0dXJuIHRlc3Qocyk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIENsb3Nlc3RPckFuY2VzdG9yKGlzLCBhbmNlc3Rvciwgc2NvcGUsIHByZWRpY2F0ZSwgaXNSb290KTtcbiAgICB9O1xuXG4gICAgdmFyIGFuY2VzdG9yJDEgPSBmdW5jdGlvbiAoc2NvcGUsIHNlbGVjdG9yLCBpc1Jvb3QpIHtcbiAgICAgIHJldHVybiBhbmNlc3RvcihzY29wZSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgcmV0dXJuIGlzKGUsIHNlbGVjdG9yKTtcbiAgICAgIH0sIGlzUm9vdCk7XG4gICAgfTtcbiAgICB2YXIgY2xvc2VzdCQxID0gZnVuY3Rpb24gKHNjb3BlLCBzZWxlY3RvciwgaXNSb290KSB7XG4gICAgICB2YXIgaXMkMSA9IGZ1bmN0aW9uIChlbGVtZW50LCBzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gaXMoZWxlbWVudCwgc2VsZWN0b3IpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBDbG9zZXN0T3JBbmNlc3RvcihpcyQxLCBhbmNlc3RvciQxLCBzY29wZSwgc2VsZWN0b3IsIGlzUm9vdCk7XG4gICAgfTtcblxuICAgIHZhciB2YWxpZERlZmF1bHRPckRpZSA9IGZ1bmN0aW9uICh2YWx1ZSwgcHJlZGljYXRlKSB7XG4gICAgICBpZiAocHJlZGljYXRlKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcignRGVmYXVsdCB2YWx1ZSBkb2VzblxcJ3QgbWF0Y2ggcmVxdWVzdGVkIHR5cGUuJyk7XG4gICAgfTtcbiAgICB2YXIgaXRlbXMgPSBmdW5jdGlvbiAodmFsdWUsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgaWYgKGlzQXJyYXkodmFsdWUpIHx8IGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2V4cGVjdGVkIGEgc3RyaW5nIGJ1dCBmb3VuZDogJyArIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChpc0Jvb2xlYW4odmFsdWUpKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gZmFsc2UgPyAnJyA6IGRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIHZhciBnZXRUb29sYmFySXRlbXNPcl8gPSBmdW5jdGlvbiAocHJlZGljYXRlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGVkaXRvciwgbmFtZSwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHZhbGlkRGVmYXVsdE9yRGllKGRlZmF1bHRWYWx1ZSwgcHJlZGljYXRlKTtcbiAgICAgICAgdmFyIHZhbHVlID0gZWRpdG9yLmdldFBhcmFtKG5hbWUsIGRlZmF1bHRWYWx1ZSk7XG4gICAgICAgIHJldHVybiBpdGVtcyh2YWx1ZSwgZGVmYXVsdFZhbHVlKTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgZ2V0VG9vbGJhckl0ZW1zT3IgPSBnZXRUb29sYmFySXRlbXNPcl8oaXNTdHJpbmcpO1xuXG4gICAgdmFyIGdldFRleHRTZWxlY3Rpb25Ub29sYmFySXRlbXMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZ2V0VG9vbGJhckl0ZW1zT3IoZWRpdG9yLCAncXVpY2tiYXJzX3NlbGVjdGlvbl90b29sYmFyJywgJ2JvbGQgaXRhbGljIHwgcXVpY2tsaW5rIGgyIGgzIGJsb2NrcXVvdGUnKTtcbiAgICB9O1xuICAgIHZhciBnZXRJbnNlcnRUb29sYmFySXRlbXMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZ2V0VG9vbGJhckl0ZW1zT3IoZWRpdG9yLCAncXVpY2tiYXJzX2luc2VydF90b29sYmFyJywgJ3F1aWNraW1hZ2UgcXVpY2t0YWJsZScpO1xuICAgIH07XG4gICAgdmFyIGdldEltYWdlVG9vbGJhckl0ZW1zID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGdldFRvb2xiYXJJdGVtc09yKGVkaXRvciwgJ3F1aWNrYmFyc19pbWFnZV90b29sYmFyJywgJ2FsaWdubGVmdCBhbGlnbmNlbnRlciBhbGlnbnJpZ2h0Jyk7XG4gICAgfTtcblxuICAgIHZhciBhZGRUb0VkaXRvciA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBpbnNlcnRUb29sYmFySXRlbXMgPSBnZXRJbnNlcnRUb29sYmFySXRlbXMoZWRpdG9yKTtcbiAgICAgIGlmIChpbnNlcnRUb29sYmFySXRlbXMudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZENvbnRleHRUb29sYmFyKCdxdWlja2Jsb2NrJywge1xuICAgICAgICAgIHByZWRpY2F0ZTogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIHZhciBzdWdhck5vZGUgPSBFbGVtZW50LmZyb21Eb20obm9kZSk7XG4gICAgICAgICAgICB2YXIgdGV4dEJsb2NrRWxlbWVudHNNYXAgPSBlZGl0b3Iuc2NoZW1hLmdldFRleHRCbG9ja0VsZW1lbnRzKCk7XG4gICAgICAgICAgICB2YXIgaXNSb290ID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGVsZW0uZG9tKCkgPT09IGVkaXRvci5nZXRCb2R5KCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIGNsb3Nlc3QkMShzdWdhck5vZGUsICd0YWJsZScsIGlzUm9vdCkuZm9sZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjbG9zZXN0KHN1Z2FyTm9kZSwgZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmFtZShlbGVtKSBpbiB0ZXh0QmxvY2tFbGVtZW50c01hcCAmJiBlZGl0b3IuZG9tLmlzRW1wdHkoZWxlbS5kb20oKSk7XG4gICAgICAgICAgICAgIH0sIGlzUm9vdCkuaXNTb21lKCk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgaXRlbXM6IGluc2VydFRvb2xiYXJJdGVtcyxcbiAgICAgICAgICBwb3NpdGlvbjogJ2xpbmUnLFxuICAgICAgICAgIHNjb3BlOiAnZWRpdG9yJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGFkZFRvRWRpdG9yJDEgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgaXNFZGl0YWJsZSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHJldHVybiBlZGl0b3IuZG9tLmdldENvbnRlbnRFZGl0YWJsZVBhcmVudChub2RlKSAhPT0gJ2ZhbHNlJztcbiAgICAgIH07XG4gICAgICB2YXIgaXNJbWFnZSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHJldHVybiBub2RlLm5vZGVOYW1lID09PSAnSU1HJyB8fCBub2RlLm5vZGVOYW1lID09PSAnRklHVVJFJyAmJiAvaW1hZ2UvaS50ZXN0KG5vZGUuY2xhc3NOYW1lKTtcbiAgICAgIH07XG4gICAgICB2YXIgaW1hZ2VUb29sYmFySXRlbXMgPSBnZXRJbWFnZVRvb2xiYXJJdGVtcyhlZGl0b3IpO1xuICAgICAgaWYgKGltYWdlVG9vbGJhckl0ZW1zLnRyaW0oKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRDb250ZXh0VG9vbGJhcignaW1hZ2VzZWxlY3Rpb24nLCB7XG4gICAgICAgICAgcHJlZGljYXRlOiBpc0ltYWdlLFxuICAgICAgICAgIGl0ZW1zOiBpbWFnZVRvb2xiYXJJdGVtcyxcbiAgICAgICAgICBwb3NpdGlvbjogJ25vZGUnXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgdmFyIHRleHRUb29sYmFySXRlbXMgPSBnZXRUZXh0U2VsZWN0aW9uVG9vbGJhckl0ZW1zKGVkaXRvcik7XG4gICAgICBpZiAodGV4dFRvb2xiYXJJdGVtcy50cmltKCkubGVuZ3RoID4gMCkge1xuICAgICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQ29udGV4dFRvb2xiYXIoJ3RleHRzZWxlY3Rpb24nLCB7XG4gICAgICAgICAgcHJlZGljYXRlOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuICFpc0ltYWdlKG5vZGUpICYmICFlZGl0b3Iuc2VsZWN0aW9uLmlzQ29sbGFwc2VkKCkgJiYgaXNFZGl0YWJsZShub2RlKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGl0ZW1zOiB0ZXh0VG9vbGJhckl0ZW1zLFxuICAgICAgICAgIHBvc2l0aW9uOiAnc2VsZWN0aW9uJyxcbiAgICAgICAgICBzY29wZTogJ2VkaXRvcidcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFBsdWdpbiAoKSB7XG4gICAgICBnbG9iYWwuYWRkKCdxdWlja2JhcnMnLCBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIHNldHVwQnV0dG9ucyhlZGl0b3IpO1xuICAgICAgICBhZGRUb0VkaXRvcihlZGl0b3IpO1xuICAgICAgICBhZGRUb0VkaXRvciQxKGVkaXRvcik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBQbHVnaW4oKTtcblxufSh3aW5kb3cpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=