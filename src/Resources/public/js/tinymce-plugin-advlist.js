(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-advlist"],{

/***/ "./node_modules/tinymce/plugins/advlist/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/tinymce/plugins/advlist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Exports the "advlist" plugin for usage with module loaders
// Usage:
//   CommonJS:
//     require('tinymce/plugins/advlist')
//   ES2015:
//     import 'tinymce/plugins/advlist'
__webpack_require__(/*! ./plugin.js */ "./node_modules/tinymce/plugins/advlist/plugin.js");

/***/ }),

/***/ "./node_modules/tinymce/plugins/advlist/plugin.js":
/*!********************************************************!*\
  !*** ./node_modules/tinymce/plugins/advlist/plugin.js ***!
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
(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var applyListFormat = function (editor, listName, styleValue) {
      var cmd = listName === 'UL' ? 'InsertUnorderedList' : 'InsertOrderedList';
      editor.execCommand(cmd, false, styleValue === false ? null : { 'list-style-type': styleValue });
    };

    var register = function (editor) {
      editor.addCommand('ApplyUnorderedListStyle', function (ui, value) {
        applyListFormat(editor, 'UL', value['list-style-type']);
      });
      editor.addCommand('ApplyOrderedListStyle', function (ui, value) {
        applyListFormat(editor, 'OL', value['list-style-type']);
      });
    };

    var getNumberStyles = function (editor) {
      var styles = editor.getParam('advlist_number_styles', 'default,lower-alpha,lower-greek,lower-roman,upper-alpha,upper-roman');
      return styles ? styles.split(/[ ,]/) : [];
    };
    var getBulletStyles = function (editor) {
      var styles = editor.getParam('advlist_bullet_styles', 'default,circle,square');
      return styles ? styles.split(/[ ,]/) : [];
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

    var isChildOfBody = function (editor, elm) {
      return editor.$.contains(editor.getBody(), elm);
    };
    var isTableCellNode = function (node) {
      return node && /^(TH|TD)$/.test(node.nodeName);
    };
    var isListNode = function (editor) {
      return function (node) {
        return node && /^(OL|UL|DL)$/.test(node.nodeName) && isChildOfBody(editor, node);
      };
    };
    var getSelectedStyleType = function (editor) {
      var listElm = editor.dom.getParent(editor.selection.getNode(), 'ol,ul');
      var style = editor.dom.getStyle(listElm, 'listStyleType');
      return Option.from(style);
    };

    var findIndex = function (list, predicate) {
      for (var index = 0; index < list.length; index++) {
        var element = list[index];
        if (predicate(element)) {
          return index;
        }
      }
      return -1;
    };
    var styleValueToText = function (styleValue) {
      return styleValue.replace(/\-/g, ' ').replace(/\b\w/g, function (chr) {
        return chr.toUpperCase();
      });
    };
    var isWithinList = function (editor, e, nodeName) {
      var tableCellIndex = findIndex(e.parents, isTableCellNode);
      var parents = tableCellIndex !== -1 ? e.parents.slice(0, tableCellIndex) : e.parents;
      var lists = global$1.grep(parents, isListNode(editor));
      return lists.length > 0 && lists[0].nodeName === nodeName;
    };
    var addSplitButton = function (editor, id, tooltip, cmd, nodeName, styles) {
      editor.ui.registry.addSplitButton(id, {
        tooltip: tooltip,
        icon: nodeName === 'OL' ? 'ordered-list' : 'unordered-list',
        presets: 'listpreview',
        columns: 3,
        fetch: function (callback) {
          var items = global$1.map(styles, function (styleValue) {
            var iconStyle = nodeName === 'OL' ? 'num' : 'bull';
            var iconName = styleValue === 'disc' || styleValue === 'decimal' ? 'default' : styleValue;
            var itemValue = styleValue === 'default' ? '' : styleValue;
            var displayText = styleValueToText(styleValue);
            return {
              type: 'choiceitem',
              value: itemValue,
              icon: 'list-' + iconStyle + '-' + iconName,
              text: displayText
            };
          });
          callback(items);
        },
        onAction: function () {
          return editor.execCommand(cmd);
        },
        onItemAction: function (_splitButtonApi, value) {
          applyListFormat(editor, nodeName, value);
        },
        select: function (value) {
          var listStyleType = getSelectedStyleType(editor);
          return listStyleType.map(function (listStyle) {
            return value === listStyle;
          }).getOr(false);
        },
        onSetup: function (api) {
          var nodeChangeHandler = function (e) {
            api.setActive(isWithinList(editor, e, nodeName));
          };
          editor.on('NodeChange', nodeChangeHandler);
          return function () {
            return editor.off('NodeChange', nodeChangeHandler);
          };
        }
      });
    };
    var addButton = function (editor, id, tooltip, cmd, nodeName, _styles) {
      editor.ui.registry.addToggleButton(id, {
        active: false,
        tooltip: tooltip,
        icon: nodeName === 'OL' ? 'ordered-list' : 'unordered-list',
        onSetup: function (api) {
          var nodeChangeHandler = function (e) {
            api.setActive(isWithinList(editor, e, nodeName));
          };
          editor.on('NodeChange', nodeChangeHandler);
          return function () {
            return editor.off('NodeChange', nodeChangeHandler);
          };
        },
        onAction: function () {
          return editor.execCommand(cmd);
        }
      });
    };
    var addControl = function (editor, id, tooltip, cmd, nodeName, styles) {
      if (styles.length > 1) {
        addSplitButton(editor, id, tooltip, cmd, nodeName, styles);
      } else {
        addButton(editor, id, tooltip, cmd, nodeName);
      }
    };
    var register$1 = function (editor) {
      addControl(editor, 'numlist', 'Numbered list', 'InsertOrderedList', 'OL', getNumberStyles(editor));
      addControl(editor, 'bullist', 'Bullet list', 'InsertUnorderedList', 'UL', getBulletStyles(editor));
    };

    function Plugin () {
      global.add('advlist', function (editor) {
        var hasPlugin = function (editor, plugin) {
          return global$1.inArray(editor.getParam('plugins', '', 'string').split(/[ ,]/), plugin) !== -1;
        };
        if (hasPlugin(editor, 'lists')) {
          register$1(editor);
          register(editor);
        }
      });
    }

    Plugin();

}());


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2Fkdmxpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RpbnltY2UvcGx1Z2lucy9hZHZsaXN0L3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBTyxDQUFDLHFFQUFhLEU7Ozs7Ozs7Ozs7O0FDTnJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxvRUFBb0UsZ0NBQWdDO0FBQ3BHOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EseUJBQXlCLHFCQUFxQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7O0FBRUEsQ0FBQyIsImZpbGUiOiJ0aW55bWNlLXBsdWdpbi1hZHZsaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRXhwb3J0cyB0aGUgXCJhZHZsaXN0XCIgcGx1Z2luIGZvciB1c2FnZSB3aXRoIG1vZHVsZSBsb2FkZXJzXG4vLyBVc2FnZTpcbi8vICAgQ29tbW9uSlM6XG4vLyAgICAgcmVxdWlyZSgndGlueW1jZS9wbHVnaW5zL2Fkdmxpc3QnKVxuLy8gICBFUzIwMTU6XG4vLyAgICAgaW1wb3J0ICd0aW55bWNlL3BsdWdpbnMvYWR2bGlzdCdcbnJlcXVpcmUoJy4vcGx1Z2luLmpzJyk7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIFRpbnkgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTEdQTCBvciBhIGNvbW1lcmNpYWwgbGljZW5zZS5cbiAqIEZvciBMR1BMIHNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogRm9yIGNvbW1lcmNpYWwgbGljZW5zZXMgc2VlIGh0dHBzOi8vd3d3LnRpbnkuY2xvdWQvXG4gKlxuICogVmVyc2lvbjogNS40LjIgKDIwMjAtMDgtMTcpXG4gKi9cbihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIGdsb2JhbCA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLlBsdWdpbk1hbmFnZXInKTtcblxuICAgIHZhciBnbG9iYWwkMSA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuVG9vbHMnKTtcblxuICAgIHZhciBhcHBseUxpc3RGb3JtYXQgPSBmdW5jdGlvbiAoZWRpdG9yLCBsaXN0TmFtZSwgc3R5bGVWYWx1ZSkge1xuICAgICAgdmFyIGNtZCA9IGxpc3ROYW1lID09PSAnVUwnID8gJ0luc2VydFVub3JkZXJlZExpc3QnIDogJ0luc2VydE9yZGVyZWRMaXN0JztcbiAgICAgIGVkaXRvci5leGVjQ29tbWFuZChjbWQsIGZhbHNlLCBzdHlsZVZhbHVlID09PSBmYWxzZSA/IG51bGwgOiB7ICdsaXN0LXN0eWxlLXR5cGUnOiBzdHlsZVZhbHVlIH0pO1xuICAgIH07XG5cbiAgICB2YXIgcmVnaXN0ZXIgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBlZGl0b3IuYWRkQ29tbWFuZCgnQXBwbHlVbm9yZGVyZWRMaXN0U3R5bGUnLCBmdW5jdGlvbiAodWksIHZhbHVlKSB7XG4gICAgICAgIGFwcGx5TGlzdEZvcm1hdChlZGl0b3IsICdVTCcsIHZhbHVlWydsaXN0LXN0eWxlLXR5cGUnXSk7XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci5hZGRDb21tYW5kKCdBcHBseU9yZGVyZWRMaXN0U3R5bGUnLCBmdW5jdGlvbiAodWksIHZhbHVlKSB7XG4gICAgICAgIGFwcGx5TGlzdEZvcm1hdChlZGl0b3IsICdPTCcsIHZhbHVlWydsaXN0LXN0eWxlLXR5cGUnXSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIGdldE51bWJlclN0eWxlcyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBzdHlsZXMgPSBlZGl0b3IuZ2V0UGFyYW0oJ2Fkdmxpc3RfbnVtYmVyX3N0eWxlcycsICdkZWZhdWx0LGxvd2VyLWFscGhhLGxvd2VyLWdyZWVrLGxvd2VyLXJvbWFuLHVwcGVyLWFscGhhLHVwcGVyLXJvbWFuJyk7XG4gICAgICByZXR1cm4gc3R5bGVzID8gc3R5bGVzLnNwbGl0KC9bICxdLykgOiBbXTtcbiAgICB9O1xuICAgIHZhciBnZXRCdWxsZXRTdHlsZXMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgc3R5bGVzID0gZWRpdG9yLmdldFBhcmFtKCdhZHZsaXN0X2J1bGxldF9zdHlsZXMnLCAnZGVmYXVsdCxjaXJjbGUsc3F1YXJlJyk7XG4gICAgICByZXR1cm4gc3R5bGVzID8gc3R5bGVzLnNwbGl0KC9bICxdLykgOiBbXTtcbiAgICB9O1xuXG4gICAgdmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgfTtcbiAgICB2YXIgY29uc3RhbnQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgbmV2ZXIgPSBjb25zdGFudChmYWxzZSk7XG4gICAgdmFyIGFsd2F5cyA9IGNvbnN0YW50KHRydWUpO1xuXG4gICAgdmFyIG5vbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gTk9ORTtcbiAgICB9O1xuICAgIHZhciBOT05FID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGVxID0gZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgcmV0dXJuIG8uaXNOb25lKCk7XG4gICAgICB9O1xuICAgICAgdmFyIGNhbGwgPSBmdW5jdGlvbiAodGh1bmspIHtcbiAgICAgICAgcmV0dXJuIHRodW5rKCk7XG4gICAgICB9O1xuICAgICAgdmFyIGlkID0gZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgcmV0dXJuIG47XG4gICAgICB9O1xuICAgICAgdmFyIG1lID0ge1xuICAgICAgICBmb2xkOiBmdW5jdGlvbiAobiwgX3MpIHtcbiAgICAgICAgICByZXR1cm4gbigpO1xuICAgICAgICB9LFxuICAgICAgICBpczogbmV2ZXIsXG4gICAgICAgIGlzU29tZTogbmV2ZXIsXG4gICAgICAgIGlzTm9uZTogYWx3YXlzLFxuICAgICAgICBnZXRPcjogaWQsXG4gICAgICAgIGdldE9yVGh1bms6IGNhbGwsXG4gICAgICAgIGdldE9yRGllOiBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyB8fCAnZXJyb3I6IGdldE9yRGllIGNhbGxlZCBvbiBub25lLicpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRPck51bGw6IGNvbnN0YW50KG51bGwpLFxuICAgICAgICBnZXRPclVuZGVmaW5lZDogY29uc3RhbnQodW5kZWZpbmVkKSxcbiAgICAgICAgb3I6IGlkLFxuICAgICAgICBvclRodW5rOiBjYWxsLFxuICAgICAgICBtYXA6IG5vbmUsXG4gICAgICAgIGVhY2g6IG5vb3AsXG4gICAgICAgIGJpbmQ6IG5vbmUsXG4gICAgICAgIGV4aXN0czogbmV2ZXIsXG4gICAgICAgIGZvcmFsbDogYWx3YXlzLFxuICAgICAgICBmaWx0ZXI6IG5vbmUsXG4gICAgICAgIGVxdWFsczogZXEsXG4gICAgICAgIGVxdWFsc186IGVxLFxuICAgICAgICB0b0FycmF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9LFxuICAgICAgICB0b1N0cmluZzogY29uc3RhbnQoJ25vbmUoKScpXG4gICAgICB9O1xuICAgICAgcmV0dXJuIG1lO1xuICAgIH0oKTtcbiAgICB2YXIgc29tZSA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICB2YXIgY29uc3RhbnRfYSA9IGNvbnN0YW50KGEpO1xuICAgICAgdmFyIHNlbGYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBtZTtcbiAgICAgIH07XG4gICAgICB2YXIgYmluZCA9IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHJldHVybiBmKGEpO1xuICAgICAgfTtcbiAgICAgIHZhciBtZSA9IHtcbiAgICAgICAgZm9sZDogZnVuY3Rpb24gKG4sIHMpIHtcbiAgICAgICAgICByZXR1cm4gcyhhKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXM6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgcmV0dXJuIGEgPT09IHY7XG4gICAgICAgIH0sXG4gICAgICAgIGlzU29tZTogYWx3YXlzLFxuICAgICAgICBpc05vbmU6IG5ldmVyLFxuICAgICAgICBnZXRPcjogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JUaHVuazogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JEaWU6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yTnVsbDogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JVbmRlZmluZWQ6IGNvbnN0YW50X2EsXG4gICAgICAgIG9yOiBzZWxmLFxuICAgICAgICBvclRodW5rOiBzZWxmLFxuICAgICAgICBtYXA6IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgcmV0dXJuIHNvbWUoZihhKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVhY2g6IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgZihhKTtcbiAgICAgICAgfSxcbiAgICAgICAgYmluZDogYmluZCxcbiAgICAgICAgZXhpc3RzOiBiaW5kLFxuICAgICAgICBmb3JhbGw6IGJpbmQsXG4gICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICByZXR1cm4gZihhKSA/IG1lIDogTk9ORTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9BcnJheTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBbYV07XG4gICAgICAgIH0sXG4gICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuICdzb21lKCcgKyBhICsgJyknO1xuICAgICAgICB9LFxuICAgICAgICBlcXVhbHM6IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgICAgcmV0dXJuIG8uaXMoYSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVxdWFsc186IGZ1bmN0aW9uIChvLCBlbGVtZW50RXEpIHtcbiAgICAgICAgICByZXR1cm4gby5mb2xkKG5ldmVyLCBmdW5jdGlvbiAoYikge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRFcShhLCBiKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiBtZTtcbiAgICB9O1xuICAgIHZhciBmcm9tID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCA/IE5PTkUgOiBzb21lKHZhbHVlKTtcbiAgICB9O1xuICAgIHZhciBPcHRpb24gPSB7XG4gICAgICBzb21lOiBzb21lLFxuICAgICAgbm9uZTogbm9uZSxcbiAgICAgIGZyb206IGZyb21cbiAgICB9O1xuXG4gICAgdmFyIGlzQ2hpbGRPZkJvZHkgPSBmdW5jdGlvbiAoZWRpdG9yLCBlbG0pIHtcbiAgICAgIHJldHVybiBlZGl0b3IuJC5jb250YWlucyhlZGl0b3IuZ2V0Qm9keSgpLCBlbG0pO1xuICAgIH07XG4gICAgdmFyIGlzVGFibGVDZWxsTm9kZSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICByZXR1cm4gbm9kZSAmJiAvXihUSHxURCkkLy50ZXN0KG5vZGUubm9kZU5hbWUpO1xuICAgIH07XG4gICAgdmFyIGlzTGlzdE5vZGUgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIG5vZGUgJiYgL14oT0x8VUx8REwpJC8udGVzdChub2RlLm5vZGVOYW1lKSAmJiBpc0NoaWxkT2ZCb2R5KGVkaXRvciwgbm9kZSk7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGdldFNlbGVjdGVkU3R5bGVUeXBlID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGxpc3RFbG0gPSBlZGl0b3IuZG9tLmdldFBhcmVudChlZGl0b3Iuc2VsZWN0aW9uLmdldE5vZGUoKSwgJ29sLHVsJyk7XG4gICAgICB2YXIgc3R5bGUgPSBlZGl0b3IuZG9tLmdldFN0eWxlKGxpc3RFbG0sICdsaXN0U3R5bGVUeXBlJyk7XG4gICAgICByZXR1cm4gT3B0aW9uLmZyb20oc3R5bGUpO1xuICAgIH07XG5cbiAgICB2YXIgZmluZEluZGV4ID0gZnVuY3Rpb24gKGxpc3QsIHByZWRpY2F0ZSkge1xuICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gbGlzdFtpbmRleF07XG4gICAgICAgIGlmIChwcmVkaWNhdGUoZWxlbWVudCkpIHtcbiAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgICB9O1xuICAgIHZhciBzdHlsZVZhbHVlVG9UZXh0ID0gZnVuY3Rpb24gKHN0eWxlVmFsdWUpIHtcbiAgICAgIHJldHVybiBzdHlsZVZhbHVlLnJlcGxhY2UoL1xcLS9nLCAnICcpLnJlcGxhY2UoL1xcYlxcdy9nLCBmdW5jdGlvbiAoY2hyKSB7XG4gICAgICAgIHJldHVybiBjaHIudG9VcHBlckNhc2UoKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGlzV2l0aGluTGlzdCA9IGZ1bmN0aW9uIChlZGl0b3IsIGUsIG5vZGVOYW1lKSB7XG4gICAgICB2YXIgdGFibGVDZWxsSW5kZXggPSBmaW5kSW5kZXgoZS5wYXJlbnRzLCBpc1RhYmxlQ2VsbE5vZGUpO1xuICAgICAgdmFyIHBhcmVudHMgPSB0YWJsZUNlbGxJbmRleCAhPT0gLTEgPyBlLnBhcmVudHMuc2xpY2UoMCwgdGFibGVDZWxsSW5kZXgpIDogZS5wYXJlbnRzO1xuICAgICAgdmFyIGxpc3RzID0gZ2xvYmFsJDEuZ3JlcChwYXJlbnRzLCBpc0xpc3ROb2RlKGVkaXRvcikpO1xuICAgICAgcmV0dXJuIGxpc3RzLmxlbmd0aCA+IDAgJiYgbGlzdHNbMF0ubm9kZU5hbWUgPT09IG5vZGVOYW1lO1xuICAgIH07XG4gICAgdmFyIGFkZFNwbGl0QnV0dG9uID0gZnVuY3Rpb24gKGVkaXRvciwgaWQsIHRvb2x0aXAsIGNtZCwgbm9kZU5hbWUsIHN0eWxlcykge1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZFNwbGl0QnV0dG9uKGlkLCB7XG4gICAgICAgIHRvb2x0aXA6IHRvb2x0aXAsXG4gICAgICAgIGljb246IG5vZGVOYW1lID09PSAnT0wnID8gJ29yZGVyZWQtbGlzdCcgOiAndW5vcmRlcmVkLWxpc3QnLFxuICAgICAgICBwcmVzZXRzOiAnbGlzdHByZXZpZXcnLFxuICAgICAgICBjb2x1bW5zOiAzLFxuICAgICAgICBmZXRjaDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgdmFyIGl0ZW1zID0gZ2xvYmFsJDEubWFwKHN0eWxlcywgZnVuY3Rpb24gKHN0eWxlVmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBpY29uU3R5bGUgPSBub2RlTmFtZSA9PT0gJ09MJyA/ICdudW0nIDogJ2J1bGwnO1xuICAgICAgICAgICAgdmFyIGljb25OYW1lID0gc3R5bGVWYWx1ZSA9PT0gJ2Rpc2MnIHx8IHN0eWxlVmFsdWUgPT09ICdkZWNpbWFsJyA/ICdkZWZhdWx0JyA6IHN0eWxlVmFsdWU7XG4gICAgICAgICAgICB2YXIgaXRlbVZhbHVlID0gc3R5bGVWYWx1ZSA9PT0gJ2RlZmF1bHQnID8gJycgOiBzdHlsZVZhbHVlO1xuICAgICAgICAgICAgdmFyIGRpc3BsYXlUZXh0ID0gc3R5bGVWYWx1ZVRvVGV4dChzdHlsZVZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHR5cGU6ICdjaG9pY2VpdGVtJyxcbiAgICAgICAgICAgICAgdmFsdWU6IGl0ZW1WYWx1ZSxcbiAgICAgICAgICAgICAgaWNvbjogJ2xpc3QtJyArIGljb25TdHlsZSArICctJyArIGljb25OYW1lLFxuICAgICAgICAgICAgICB0ZXh0OiBkaXNwbGF5VGV4dFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjYWxsYmFjayhpdGVtcyk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uQWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci5leGVjQ29tbWFuZChjbWQpO1xuICAgICAgICB9LFxuICAgICAgICBvbkl0ZW1BY3Rpb246IGZ1bmN0aW9uIChfc3BsaXRCdXR0b25BcGksIHZhbHVlKSB7XG4gICAgICAgICAgYXBwbHlMaXN0Rm9ybWF0KGVkaXRvciwgbm9kZU5hbWUsIHZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICB2YXIgbGlzdFN0eWxlVHlwZSA9IGdldFNlbGVjdGVkU3R5bGVUeXBlKGVkaXRvcik7XG4gICAgICAgICAgcmV0dXJuIGxpc3RTdHlsZVR5cGUubWFwKGZ1bmN0aW9uIChsaXN0U3R5bGUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gbGlzdFN0eWxlO1xuICAgICAgICAgIH0pLmdldE9yKGZhbHNlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TZXR1cDogZnVuY3Rpb24gKGFwaSkge1xuICAgICAgICAgIHZhciBub2RlQ2hhbmdlSGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBhcGkuc2V0QWN0aXZlKGlzV2l0aGluTGlzdChlZGl0b3IsIGUsIG5vZGVOYW1lKSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBlZGl0b3Iub24oJ05vZGVDaGFuZ2UnLCBub2RlQ2hhbmdlSGFuZGxlcik7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBlZGl0b3Iub2ZmKCdOb2RlQ2hhbmdlJywgbm9kZUNoYW5nZUhhbmRsZXIpO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGFkZEJ1dHRvbiA9IGZ1bmN0aW9uIChlZGl0b3IsIGlkLCB0b29sdGlwLCBjbWQsIG5vZGVOYW1lLCBfc3R5bGVzKSB7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkVG9nZ2xlQnV0dG9uKGlkLCB7XG4gICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgIHRvb2x0aXA6IHRvb2x0aXAsXG4gICAgICAgIGljb246IG5vZGVOYW1lID09PSAnT0wnID8gJ29yZGVyZWQtbGlzdCcgOiAndW5vcmRlcmVkLWxpc3QnLFxuICAgICAgICBvblNldHVwOiBmdW5jdGlvbiAoYXBpKSB7XG4gICAgICAgICAgdmFyIG5vZGVDaGFuZ2VIYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGFwaS5zZXRBY3RpdmUoaXNXaXRoaW5MaXN0KGVkaXRvciwgZSwgbm9kZU5hbWUpKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIGVkaXRvci5vbignTm9kZUNoYW5nZScsIG5vZGVDaGFuZ2VIYW5kbGVyKTtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGVkaXRvci5vZmYoJ05vZGVDaGFuZ2UnLCBub2RlQ2hhbmdlSGFuZGxlcik7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZWRpdG9yLmV4ZWNDb21tYW5kKGNtZCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGFkZENvbnRyb2wgPSBmdW5jdGlvbiAoZWRpdG9yLCBpZCwgdG9vbHRpcCwgY21kLCBub2RlTmFtZSwgc3R5bGVzKSB7XG4gICAgICBpZiAoc3R5bGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgYWRkU3BsaXRCdXR0b24oZWRpdG9yLCBpZCwgdG9vbHRpcCwgY21kLCBub2RlTmFtZSwgc3R5bGVzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZEJ1dHRvbihlZGl0b3IsIGlkLCB0b29sdGlwLCBjbWQsIG5vZGVOYW1lKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciByZWdpc3RlciQxID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgYWRkQ29udHJvbChlZGl0b3IsICdudW1saXN0JywgJ051bWJlcmVkIGxpc3QnLCAnSW5zZXJ0T3JkZXJlZExpc3QnLCAnT0wnLCBnZXROdW1iZXJTdHlsZXMoZWRpdG9yKSk7XG4gICAgICBhZGRDb250cm9sKGVkaXRvciwgJ2J1bGxpc3QnLCAnQnVsbGV0IGxpc3QnLCAnSW5zZXJ0VW5vcmRlcmVkTGlzdCcsICdVTCcsIGdldEJ1bGxldFN0eWxlcyhlZGl0b3IpKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gUGx1Z2luICgpIHtcbiAgICAgIGdsb2JhbC5hZGQoJ2Fkdmxpc3QnLCBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIHZhciBoYXNQbHVnaW4gPSBmdW5jdGlvbiAoZWRpdG9yLCBwbHVnaW4pIHtcbiAgICAgICAgICByZXR1cm4gZ2xvYmFsJDEuaW5BcnJheShlZGl0b3IuZ2V0UGFyYW0oJ3BsdWdpbnMnLCAnJywgJ3N0cmluZycpLnNwbGl0KC9bICxdLyksIHBsdWdpbikgIT09IC0xO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoaGFzUGx1Z2luKGVkaXRvciwgJ2xpc3RzJykpIHtcbiAgICAgICAgICByZWdpc3RlciQxKGVkaXRvcik7XG4gICAgICAgICAgcmVnaXN0ZXIoZWRpdG9yKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgUGx1Z2luKCk7XG5cbn0oKSk7XG4iXSwic291cmNlUm9vdCI6IiJ9