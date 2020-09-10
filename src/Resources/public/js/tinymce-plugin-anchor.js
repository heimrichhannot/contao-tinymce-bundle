(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-anchor"],{

/***/ "./node_modules/tinymce/plugins/anchor/index.js":
/*!******************************************************!*\
  !*** ./node_modules/tinymce/plugins/anchor/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Exports the "anchor" plugin for usage with module loaders
// Usage:
//   CommonJS:
//     require('tinymce/plugins/anchor')
//   ES2015:
//     import 'tinymce/plugins/anchor'
__webpack_require__(/*! ./plugin.js */ "./node_modules/tinymce/plugins/anchor/plugin.js");

/***/ }),

/***/ "./node_modules/tinymce/plugins/anchor/plugin.js":
/*!*******************************************************!*\
  !*** ./node_modules/tinymce/plugins/anchor/plugin.js ***!
  \*******************************************************/
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

    var global$1 = tinymce.util.Tools.resolve('tinymce.dom.RangeUtils');

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var allowHtmlInNamedAnchor = function (editor) {
      return editor.getParam('allow_html_in_named_anchor', false, 'boolean');
    };

    var namedAnchorSelector = 'a:not([href])';
    var isEmptyString = function (str) {
      return !str;
    };
    var getIdFromAnchor = function (elm) {
      var id = elm.getAttribute('id') || elm.getAttribute('name');
      return id || '';
    };
    var isAnchor = function (elm) {
      return elm && elm.nodeName.toLowerCase() === 'a';
    };
    var isNamedAnchor = function (elm) {
      return isAnchor(elm) && !elm.getAttribute('href') && getIdFromAnchor(elm) !== '';
    };
    var isEmptyNamedAnchor = function (elm) {
      return isNamedAnchor(elm) && !elm.firstChild;
    };

    var removeEmptyNamedAnchorsInSelection = function (editor) {
      var dom = editor.dom;
      global$1(dom).walk(editor.selection.getRng(), function (nodes) {
        global$2.each(nodes, function (node) {
          if (isEmptyNamedAnchor(node)) {
            dom.remove(node, false);
          }
        });
      });
    };
    var isValidId = function (id) {
      return /^[A-Za-z][A-Za-z0-9\-:._]*$/.test(id);
    };
    var getNamedAnchor = function (editor) {
      return editor.dom.getParent(editor.selection.getStart(), namedAnchorSelector);
    };
    var getId = function (editor) {
      var anchor = getNamedAnchor(editor);
      if (anchor) {
        return getIdFromAnchor(anchor);
      } else {
        return '';
      }
    };
    var createAnchor = function (editor, id) {
      editor.undoManager.transact(function () {
        if (!allowHtmlInNamedAnchor(editor)) {
          editor.selection.collapse(true);
        }
        if (editor.selection.isCollapsed()) {
          editor.insertContent(editor.dom.createHTML('a', { id: id }));
        } else {
          removeEmptyNamedAnchorsInSelection(editor);
          editor.formatter.remove('namedAnchor', null, null, true);
          editor.formatter.apply('namedAnchor', { value: id });
          editor.addVisual();
        }
      });
    };
    var updateAnchor = function (editor, id, anchorElement) {
      anchorElement.removeAttribute('name');
      anchorElement.id = id;
      editor.addVisual();
      editor.undoManager.add();
    };
    var insert = function (editor, id) {
      var anchor = getNamedAnchor(editor);
      if (anchor) {
        updateAnchor(editor, id, anchor);
      } else {
        createAnchor(editor, id);
      }
      editor.focus();
    };

    var insertAnchor = function (editor, newId) {
      if (!isValidId(newId)) {
        editor.windowManager.alert('Id should start with a letter, followed only by letters, numbers, dashes, dots, colons or underscores.');
        return false;
      } else {
        insert(editor, newId);
        return true;
      }
    };
    var open = function (editor) {
      var currentId = getId(editor);
      editor.windowManager.open({
        title: 'Anchor',
        size: 'normal',
        body: {
          type: 'panel',
          items: [{
              name: 'id',
              type: 'input',
              label: 'ID',
              placeholder: 'example'
            }]
        },
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
        initialData: { id: currentId },
        onSubmit: function (api) {
          if (insertAnchor(editor, api.getData().id)) {
            api.close();
          }
        }
      });
    };

    var register = function (editor) {
      editor.addCommand('mceAnchor', function () {
        open(editor);
      });
    };

    var isNamedAnchorNode = function (node) {
      return node && isEmptyString(node.attr('href')) && !isEmptyString(node.attr('id') || node.attr('name'));
    };
    var isEmptyNamedAnchorNode = function (node) {
      return isNamedAnchorNode(node) && !node.firstChild;
    };
    var setContentEditable = function (state) {
      return function (nodes) {
        for (var i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          if (isEmptyNamedAnchorNode(node)) {
            node.attr('contenteditable', state);
          }
        }
      };
    };
    var setup = function (editor) {
      editor.on('PreInit', function () {
        editor.parser.addNodeFilter('a', setContentEditable('false'));
        editor.serializer.addNodeFilter('a', setContentEditable(null));
      });
    };

    var registerFormats = function (editor) {
      editor.formatter.register('namedAnchor', {
        inline: 'a',
        selector: namedAnchorSelector,
        remove: 'all',
        split: true,
        deep: true,
        attributes: { id: '%value' },
        onmatch: function (node, _fmt, _itemName) {
          return isNamedAnchor(node);
        }
      });
    };

    var register$1 = function (editor) {
      editor.ui.registry.addToggleButton('anchor', {
        icon: 'bookmark',
        tooltip: 'Anchor',
        onAction: function () {
          return editor.execCommand('mceAnchor');
        },
        onSetup: function (buttonApi) {
          return editor.selection.selectorChangedWithUnbind('a:not([href])', buttonApi.setActive).unbind;
        }
      });
      editor.ui.registry.addMenuItem('anchor', {
        icon: 'bookmark',
        text: 'Anchor...',
        onAction: function () {
          return editor.execCommand('mceAnchor');
        }
      });
    };

    function Plugin () {
      global.add('anchor', function (editor) {
        setup(editor);
        register(editor);
        register$1(editor);
        editor.on('PreInit', function () {
          registerFormats(editor);
        });
      });
    }

    Plugin();

}());


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2FuY2hvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2FuY2hvci9wbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQU8sQ0FBQyxvRUFBYSxFOzs7Ozs7Ozs7OztBQ05yQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsU0FBUztBQUNwRSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGlEQUFpRCxZQUFZO0FBQzdEO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixnQkFBZ0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixlQUFlO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7O0FBRUE7O0FBRUEsQ0FBQyIsImZpbGUiOiJ0aW55bWNlLXBsdWdpbi1hbmNob3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBFeHBvcnRzIHRoZSBcImFuY2hvclwiIHBsdWdpbiBmb3IgdXNhZ2Ugd2l0aCBtb2R1bGUgbG9hZGVyc1xuLy8gVXNhZ2U6XG4vLyAgIENvbW1vbkpTOlxuLy8gICAgIHJlcXVpcmUoJ3RpbnltY2UvcGx1Z2lucy9hbmNob3InKVxuLy8gICBFUzIwMTU6XG4vLyAgICAgaW1wb3J0ICd0aW55bWNlL3BsdWdpbnMvYW5jaG9yJ1xucmVxdWlyZSgnLi9wbHVnaW4uanMnKTsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqXG4gKiBWZXJzaW9uOiA1LjQuMiAoMjAyMC0wOC0xNylcbiAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgZ2xvYmFsID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuUGx1Z2luTWFuYWdlcicpO1xuXG4gICAgdmFyIGdsb2JhbCQxID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuZG9tLlJhbmdlVXRpbHMnKTtcblxuICAgIHZhciBnbG9iYWwkMiA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuVG9vbHMnKTtcblxuICAgIHZhciBhbGxvd0h0bWxJbk5hbWVkQW5jaG9yID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnYWxsb3dfaHRtbF9pbl9uYW1lZF9hbmNob3InLCBmYWxzZSwgJ2Jvb2xlYW4nKTtcbiAgICB9O1xuXG4gICAgdmFyIG5hbWVkQW5jaG9yU2VsZWN0b3IgPSAnYTpub3QoW2hyZWZdKSc7XG4gICAgdmFyIGlzRW1wdHlTdHJpbmcgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICByZXR1cm4gIXN0cjtcbiAgICB9O1xuICAgIHZhciBnZXRJZEZyb21BbmNob3IgPSBmdW5jdGlvbiAoZWxtKSB7XG4gICAgICB2YXIgaWQgPSBlbG0uZ2V0QXR0cmlidXRlKCdpZCcpIHx8IGVsbS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcbiAgICAgIHJldHVybiBpZCB8fCAnJztcbiAgICB9O1xuICAgIHZhciBpc0FuY2hvciA9IGZ1bmN0aW9uIChlbG0pIHtcbiAgICAgIHJldHVybiBlbG0gJiYgZWxtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdhJztcbiAgICB9O1xuICAgIHZhciBpc05hbWVkQW5jaG9yID0gZnVuY3Rpb24gKGVsbSkge1xuICAgICAgcmV0dXJuIGlzQW5jaG9yKGVsbSkgJiYgIWVsbS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSAmJiBnZXRJZEZyb21BbmNob3IoZWxtKSAhPT0gJyc7XG4gICAgfTtcbiAgICB2YXIgaXNFbXB0eU5hbWVkQW5jaG9yID0gZnVuY3Rpb24gKGVsbSkge1xuICAgICAgcmV0dXJuIGlzTmFtZWRBbmNob3IoZWxtKSAmJiAhZWxtLmZpcnN0Q2hpbGQ7XG4gICAgfTtcblxuICAgIHZhciByZW1vdmVFbXB0eU5hbWVkQW5jaG9yc0luU2VsZWN0aW9uID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGRvbSA9IGVkaXRvci5kb207XG4gICAgICBnbG9iYWwkMShkb20pLndhbGsoZWRpdG9yLnNlbGVjdGlvbi5nZXRSbmcoKSwgZnVuY3Rpb24gKG5vZGVzKSB7XG4gICAgICAgIGdsb2JhbCQyLmVhY2gobm9kZXMsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgaWYgKGlzRW1wdHlOYW1lZEFuY2hvcihub2RlKSkge1xuICAgICAgICAgICAgZG9tLnJlbW92ZShub2RlLCBmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGlzVmFsaWRJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgcmV0dXJuIC9eW0EtWmEtel1bQS1aYS16MC05XFwtOi5fXSokLy50ZXN0KGlkKTtcbiAgICB9O1xuICAgIHZhciBnZXROYW1lZEFuY2hvciA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZG9tLmdldFBhcmVudChlZGl0b3Iuc2VsZWN0aW9uLmdldFN0YXJ0KCksIG5hbWVkQW5jaG9yU2VsZWN0b3IpO1xuICAgIH07XG4gICAgdmFyIGdldElkID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGFuY2hvciA9IGdldE5hbWVkQW5jaG9yKGVkaXRvcik7XG4gICAgICBpZiAoYW5jaG9yKSB7XG4gICAgICAgIHJldHVybiBnZXRJZEZyb21BbmNob3IoYW5jaG9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBjcmVhdGVBbmNob3IgPSBmdW5jdGlvbiAoZWRpdG9yLCBpZCkge1xuICAgICAgZWRpdG9yLnVuZG9NYW5hZ2VyLnRyYW5zYWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFhbGxvd0h0bWxJbk5hbWVkQW5jaG9yKGVkaXRvcikpIHtcbiAgICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLmNvbGxhcHNlKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlZGl0b3Iuc2VsZWN0aW9uLmlzQ29sbGFwc2VkKCkpIHtcbiAgICAgICAgICBlZGl0b3IuaW5zZXJ0Q29udGVudChlZGl0b3IuZG9tLmNyZWF0ZUhUTUwoJ2EnLCB7IGlkOiBpZCB9KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVtb3ZlRW1wdHlOYW1lZEFuY2hvcnNJblNlbGVjdGlvbihlZGl0b3IpO1xuICAgICAgICAgIGVkaXRvci5mb3JtYXR0ZXIucmVtb3ZlKCduYW1lZEFuY2hvcicsIG51bGwsIG51bGwsIHRydWUpO1xuICAgICAgICAgIGVkaXRvci5mb3JtYXR0ZXIuYXBwbHkoJ25hbWVkQW5jaG9yJywgeyB2YWx1ZTogaWQgfSk7XG4gICAgICAgICAgZWRpdG9yLmFkZFZpc3VhbCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciB1cGRhdGVBbmNob3IgPSBmdW5jdGlvbiAoZWRpdG9yLCBpZCwgYW5jaG9yRWxlbWVudCkge1xuICAgICAgYW5jaG9yRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ25hbWUnKTtcbiAgICAgIGFuY2hvckVsZW1lbnQuaWQgPSBpZDtcbiAgICAgIGVkaXRvci5hZGRWaXN1YWwoKTtcbiAgICAgIGVkaXRvci51bmRvTWFuYWdlci5hZGQoKTtcbiAgICB9O1xuICAgIHZhciBpbnNlcnQgPSBmdW5jdGlvbiAoZWRpdG9yLCBpZCkge1xuICAgICAgdmFyIGFuY2hvciA9IGdldE5hbWVkQW5jaG9yKGVkaXRvcik7XG4gICAgICBpZiAoYW5jaG9yKSB7XG4gICAgICAgIHVwZGF0ZUFuY2hvcihlZGl0b3IsIGlkLCBhbmNob3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3JlYXRlQW5jaG9yKGVkaXRvciwgaWQpO1xuICAgICAgfVxuICAgICAgZWRpdG9yLmZvY3VzKCk7XG4gICAgfTtcblxuICAgIHZhciBpbnNlcnRBbmNob3IgPSBmdW5jdGlvbiAoZWRpdG9yLCBuZXdJZCkge1xuICAgICAgaWYgKCFpc1ZhbGlkSWQobmV3SWQpKSB7XG4gICAgICAgIGVkaXRvci53aW5kb3dNYW5hZ2VyLmFsZXJ0KCdJZCBzaG91bGQgc3RhcnQgd2l0aCBhIGxldHRlciwgZm9sbG93ZWQgb25seSBieSBsZXR0ZXJzLCBudW1iZXJzLCBkYXNoZXMsIGRvdHMsIGNvbG9ucyBvciB1bmRlcnNjb3Jlcy4nKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5zZXJ0KGVkaXRvciwgbmV3SWQpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBvcGVuID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGN1cnJlbnRJZCA9IGdldElkKGVkaXRvcik7XG4gICAgICBlZGl0b3Iud2luZG93TWFuYWdlci5vcGVuKHtcbiAgICAgICAgdGl0bGU6ICdBbmNob3InLFxuICAgICAgICBzaXplOiAnbm9ybWFsJyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIHR5cGU6ICdwYW5lbCcsXG4gICAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICAgIG5hbWU6ICdpZCcsXG4gICAgICAgICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgICAgICAgIGxhYmVsOiAnSUQnLFxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ2V4YW1wbGUnXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LFxuICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2NhbmNlbCcsXG4gICAgICAgICAgICBuYW1lOiAnY2FuY2VsJyxcbiAgICAgICAgICAgIHRleHQ6ICdDYW5jZWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnc3VibWl0JyxcbiAgICAgICAgICAgIG5hbWU6ICdzYXZlJyxcbiAgICAgICAgICAgIHRleHQ6ICdTYXZlJyxcbiAgICAgICAgICAgIHByaW1hcnk6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGluaXRpYWxEYXRhOiB7IGlkOiBjdXJyZW50SWQgfSxcbiAgICAgICAgb25TdWJtaXQ6IGZ1bmN0aW9uIChhcGkpIHtcbiAgICAgICAgICBpZiAoaW5zZXJ0QW5jaG9yKGVkaXRvciwgYXBpLmdldERhdGEoKS5pZCkpIHtcbiAgICAgICAgICAgIGFwaS5jbG9zZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciByZWdpc3RlciA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIGVkaXRvci5hZGRDb21tYW5kKCdtY2VBbmNob3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9wZW4oZWRpdG9yKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgaXNOYW1lZEFuY2hvck5vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgcmV0dXJuIG5vZGUgJiYgaXNFbXB0eVN0cmluZyhub2RlLmF0dHIoJ2hyZWYnKSkgJiYgIWlzRW1wdHlTdHJpbmcobm9kZS5hdHRyKCdpZCcpIHx8IG5vZGUuYXR0cignbmFtZScpKTtcbiAgICB9O1xuICAgIHZhciBpc0VtcHR5TmFtZWRBbmNob3JOb2RlID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIHJldHVybiBpc05hbWVkQW5jaG9yTm9kZShub2RlKSAmJiAhbm9kZS5maXJzdENoaWxkO1xuICAgIH07XG4gICAgdmFyIHNldENvbnRlbnRFZGl0YWJsZSA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChub2Rlcykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgICBpZiAoaXNFbXB0eU5hbWVkQW5jaG9yTm9kZShub2RlKSkge1xuICAgICAgICAgICAgbm9kZS5hdHRyKCdjb250ZW50ZWRpdGFibGUnLCBzdGF0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHNldHVwID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgZWRpdG9yLm9uKCdQcmVJbml0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBlZGl0b3IucGFyc2VyLmFkZE5vZGVGaWx0ZXIoJ2EnLCBzZXRDb250ZW50RWRpdGFibGUoJ2ZhbHNlJykpO1xuICAgICAgICBlZGl0b3Iuc2VyaWFsaXplci5hZGROb2RlRmlsdGVyKCdhJywgc2V0Q29udGVudEVkaXRhYmxlKG51bGwpKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgcmVnaXN0ZXJGb3JtYXRzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgZWRpdG9yLmZvcm1hdHRlci5yZWdpc3RlcignbmFtZWRBbmNob3InLCB7XG4gICAgICAgIGlubGluZTogJ2EnLFxuICAgICAgICBzZWxlY3RvcjogbmFtZWRBbmNob3JTZWxlY3RvcixcbiAgICAgICAgcmVtb3ZlOiAnYWxsJyxcbiAgICAgICAgc3BsaXQ6IHRydWUsXG4gICAgICAgIGRlZXA6IHRydWUsXG4gICAgICAgIGF0dHJpYnV0ZXM6IHsgaWQ6ICcldmFsdWUnIH0sXG4gICAgICAgIG9ubWF0Y2g6IGZ1bmN0aW9uIChub2RlLCBfZm10LCBfaXRlbU5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gaXNOYW1lZEFuY2hvcihub2RlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciByZWdpc3RlciQxID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZFRvZ2dsZUJ1dHRvbignYW5jaG9yJywge1xuICAgICAgICBpY29uOiAnYm9va21hcmsnLFxuICAgICAgICB0b29sdGlwOiAnQW5jaG9yJyxcbiAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZWRpdG9yLmV4ZWNDb21tYW5kKCdtY2VBbmNob3InKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TZXR1cDogZnVuY3Rpb24gKGJ1dHRvbkFwaSkge1xuICAgICAgICAgIHJldHVybiBlZGl0b3Iuc2VsZWN0aW9uLnNlbGVjdG9yQ2hhbmdlZFdpdGhVbmJpbmQoJ2E6bm90KFtocmVmXSknLCBidXR0b25BcGkuc2V0QWN0aXZlKS51bmJpbmQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZE1lbnVJdGVtKCdhbmNob3InLCB7XG4gICAgICAgIGljb246ICdib29rbWFyaycsXG4gICAgICAgIHRleHQ6ICdBbmNob3IuLi4nLFxuICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBlZGl0b3IuZXhlY0NvbW1hbmQoJ21jZUFuY2hvcicpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gUGx1Z2luICgpIHtcbiAgICAgIGdsb2JhbC5hZGQoJ2FuY2hvcicsIGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgICAgc2V0dXAoZWRpdG9yKTtcbiAgICAgICAgcmVnaXN0ZXIoZWRpdG9yKTtcbiAgICAgICAgcmVnaXN0ZXIkMShlZGl0b3IpO1xuICAgICAgICBlZGl0b3Iub24oJ1ByZUluaXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmVnaXN0ZXJGb3JtYXRzKGVkaXRvcik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgUGx1Z2luKCk7XG5cbn0oKSk7XG4iXSwic291cmNlUm9vdCI6IiJ9