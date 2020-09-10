(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-advlist-plugin"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2Fkdmxpc3QvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxvRUFBb0UsZ0NBQWdDO0FBQ3BHOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EseUJBQXlCLHFCQUFxQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7O0FBRUEsQ0FBQyIsImZpbGUiOiJ0aW55bWNlLXBsdWdpbi1hZHZsaXN0LXBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICpcbiAqIFZlcnNpb246IDUuNC4yICgyMDIwLTA4LTE3KVxuICovXG4oZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBnbG9iYWwgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5QbHVnaW5NYW5hZ2VyJyk7XG5cbiAgICB2YXIgZ2xvYmFsJDEgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS51dGlsLlRvb2xzJyk7XG5cbiAgICB2YXIgYXBwbHlMaXN0Rm9ybWF0ID0gZnVuY3Rpb24gKGVkaXRvciwgbGlzdE5hbWUsIHN0eWxlVmFsdWUpIHtcbiAgICAgIHZhciBjbWQgPSBsaXN0TmFtZSA9PT0gJ1VMJyA/ICdJbnNlcnRVbm9yZGVyZWRMaXN0JyA6ICdJbnNlcnRPcmRlcmVkTGlzdCc7XG4gICAgICBlZGl0b3IuZXhlY0NvbW1hbmQoY21kLCBmYWxzZSwgc3R5bGVWYWx1ZSA9PT0gZmFsc2UgPyBudWxsIDogeyAnbGlzdC1zdHlsZS10eXBlJzogc3R5bGVWYWx1ZSB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHJlZ2lzdGVyID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgZWRpdG9yLmFkZENvbW1hbmQoJ0FwcGx5VW5vcmRlcmVkTGlzdFN0eWxlJywgZnVuY3Rpb24gKHVpLCB2YWx1ZSkge1xuICAgICAgICBhcHBseUxpc3RGb3JtYXQoZWRpdG9yLCAnVUwnLCB2YWx1ZVsnbGlzdC1zdHlsZS10eXBlJ10pO1xuICAgICAgfSk7XG4gICAgICBlZGl0b3IuYWRkQ29tbWFuZCgnQXBwbHlPcmRlcmVkTGlzdFN0eWxlJywgZnVuY3Rpb24gKHVpLCB2YWx1ZSkge1xuICAgICAgICBhcHBseUxpc3RGb3JtYXQoZWRpdG9yLCAnT0wnLCB2YWx1ZVsnbGlzdC1zdHlsZS10eXBlJ10pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBnZXROdW1iZXJTdHlsZXMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgc3R5bGVzID0gZWRpdG9yLmdldFBhcmFtKCdhZHZsaXN0X251bWJlcl9zdHlsZXMnLCAnZGVmYXVsdCxsb3dlci1hbHBoYSxsb3dlci1ncmVlayxsb3dlci1yb21hbix1cHBlci1hbHBoYSx1cHBlci1yb21hbicpO1xuICAgICAgcmV0dXJuIHN0eWxlcyA/IHN0eWxlcy5zcGxpdCgvWyAsXS8pIDogW107XG4gICAgfTtcbiAgICB2YXIgZ2V0QnVsbGV0U3R5bGVzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIHN0eWxlcyA9IGVkaXRvci5nZXRQYXJhbSgnYWR2bGlzdF9idWxsZXRfc3R5bGVzJywgJ2RlZmF1bHQsY2lyY2xlLHNxdWFyZScpO1xuICAgICAgcmV0dXJuIHN0eWxlcyA/IHN0eWxlcy5zcGxpdCgvWyAsXS8pIDogW107XG4gICAgfTtcblxuICAgIHZhciBub29wID0gZnVuY3Rpb24gKCkge1xuICAgIH07XG4gICAgdmFyIGNvbnN0YW50ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIG5ldmVyID0gY29uc3RhbnQoZmFsc2UpO1xuICAgIHZhciBhbHdheXMgPSBjb25zdGFudCh0cnVlKTtcblxuICAgIHZhciBub25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIE5PTkU7XG4gICAgfTtcbiAgICB2YXIgTk9ORSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBlcSA9IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgIHJldHVybiBvLmlzTm9uZSgpO1xuICAgICAgfTtcbiAgICAgIHZhciBjYWxsID0gZnVuY3Rpb24gKHRodW5rKSB7XG4gICAgICAgIHJldHVybiB0aHVuaygpO1xuICAgICAgfTtcbiAgICAgIHZhciBpZCA9IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgIHJldHVybiBuO1xuICAgICAgfTtcbiAgICAgIHZhciBtZSA9IHtcbiAgICAgICAgZm9sZDogZnVuY3Rpb24gKG4sIF9zKSB7XG4gICAgICAgICAgcmV0dXJuIG4oKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXM6IG5ldmVyLFxuICAgICAgICBpc1NvbWU6IG5ldmVyLFxuICAgICAgICBpc05vbmU6IGFsd2F5cyxcbiAgICAgICAgZ2V0T3I6IGlkLFxuICAgICAgICBnZXRPclRodW5rOiBjYWxsLFxuICAgICAgICBnZXRPckRpZTogZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cgfHwgJ2Vycm9yOiBnZXRPckRpZSBjYWxsZWQgb24gbm9uZS4nKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0T3JOdWxsOiBjb25zdGFudChudWxsKSxcbiAgICAgICAgZ2V0T3JVbmRlZmluZWQ6IGNvbnN0YW50KHVuZGVmaW5lZCksXG4gICAgICAgIG9yOiBpZCxcbiAgICAgICAgb3JUaHVuazogY2FsbCxcbiAgICAgICAgbWFwOiBub25lLFxuICAgICAgICBlYWNoOiBub29wLFxuICAgICAgICBiaW5kOiBub25lLFxuICAgICAgICBleGlzdHM6IG5ldmVyLFxuICAgICAgICBmb3JhbGw6IGFsd2F5cyxcbiAgICAgICAgZmlsdGVyOiBub25lLFxuICAgICAgICBlcXVhbHM6IGVxLFxuICAgICAgICBlcXVhbHNfOiBlcSxcbiAgICAgICAgdG9BcnJheTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9TdHJpbmc6IGNvbnN0YW50KCdub25lKCknKVxuICAgICAgfTtcbiAgICAgIHJldHVybiBtZTtcbiAgICB9KCk7XG4gICAgdmFyIHNvbWUgPSBmdW5jdGlvbiAoYSkge1xuICAgICAgdmFyIGNvbnN0YW50X2EgPSBjb25zdGFudChhKTtcbiAgICAgIHZhciBzZWxmID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbWU7XG4gICAgICB9O1xuICAgICAgdmFyIGJpbmQgPSBmdW5jdGlvbiAoZikge1xuICAgICAgICByZXR1cm4gZihhKTtcbiAgICAgIH07XG4gICAgICB2YXIgbWUgPSB7XG4gICAgICAgIGZvbGQ6IGZ1bmN0aW9uIChuLCBzKSB7XG4gICAgICAgICAgcmV0dXJuIHMoYSk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgIHJldHVybiBhID09PSB2O1xuICAgICAgICB9LFxuICAgICAgICBpc1NvbWU6IGFsd2F5cyxcbiAgICAgICAgaXNOb25lOiBuZXZlcixcbiAgICAgICAgZ2V0T3I6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yVGh1bms6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yRGllOiBjb25zdGFudF9hLFxuICAgICAgICBnZXRPck51bGw6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yVW5kZWZpbmVkOiBjb25zdGFudF9hLFxuICAgICAgICBvcjogc2VsZixcbiAgICAgICAgb3JUaHVuazogc2VsZixcbiAgICAgICAgbWFwOiBmdW5jdGlvbiAoZikge1xuICAgICAgICAgIHJldHVybiBzb21lKGYoYSkpO1xuICAgICAgICB9LFxuICAgICAgICBlYWNoOiBmdW5jdGlvbiAoZikge1xuICAgICAgICAgIGYoYSk7XG4gICAgICAgIH0sXG4gICAgICAgIGJpbmQ6IGJpbmQsXG4gICAgICAgIGV4aXN0czogYmluZCxcbiAgICAgICAgZm9yYWxsOiBiaW5kLFxuICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgcmV0dXJuIGYoYSkgPyBtZSA6IE5PTkU7XG4gICAgICAgIH0sXG4gICAgICAgIHRvQXJyYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gW2FdO1xuICAgICAgICB9LFxuICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiAnc29tZSgnICsgYSArICcpJztcbiAgICAgICAgfSxcbiAgICAgICAgZXF1YWxzOiBmdW5jdGlvbiAobykge1xuICAgICAgICAgIHJldHVybiBvLmlzKGEpO1xuICAgICAgICB9LFxuICAgICAgICBlcXVhbHNfOiBmdW5jdGlvbiAobywgZWxlbWVudEVxKSB7XG4gICAgICAgICAgcmV0dXJuIG8uZm9sZChuZXZlciwgZnVuY3Rpb24gKGIpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50RXEoYSwgYik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXR1cm4gbWU7XG4gICAgfTtcbiAgICB2YXIgZnJvbSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgPyBOT05FIDogc29tZSh2YWx1ZSk7XG4gICAgfTtcbiAgICB2YXIgT3B0aW9uID0ge1xuICAgICAgc29tZTogc29tZSxcbiAgICAgIG5vbmU6IG5vbmUsXG4gICAgICBmcm9tOiBmcm9tXG4gICAgfTtcblxuICAgIHZhciBpc0NoaWxkT2ZCb2R5ID0gZnVuY3Rpb24gKGVkaXRvciwgZWxtKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLiQuY29udGFpbnMoZWRpdG9yLmdldEJvZHkoKSwgZWxtKTtcbiAgICB9O1xuICAgIHZhciBpc1RhYmxlQ2VsbE5vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgcmV0dXJuIG5vZGUgJiYgL14oVEh8VEQpJC8udGVzdChub2RlLm5vZGVOYW1lKTtcbiAgICB9O1xuICAgIHZhciBpc0xpc3ROb2RlID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHJldHVybiBub2RlICYmIC9eKE9MfFVMfERMKSQvLnRlc3Qobm9kZS5ub2RlTmFtZSkgJiYgaXNDaGlsZE9mQm9keShlZGl0b3IsIG5vZGUpO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBnZXRTZWxlY3RlZFN0eWxlVHlwZSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBsaXN0RWxtID0gZWRpdG9yLmRvbS5nZXRQYXJlbnQoZWRpdG9yLnNlbGVjdGlvbi5nZXROb2RlKCksICdvbCx1bCcpO1xuICAgICAgdmFyIHN0eWxlID0gZWRpdG9yLmRvbS5nZXRTdHlsZShsaXN0RWxtLCAnbGlzdFN0eWxlVHlwZScpO1xuICAgICAgcmV0dXJuIE9wdGlvbi5mcm9tKHN0eWxlKTtcbiAgICB9O1xuXG4gICAgdmFyIGZpbmRJbmRleCA9IGZ1bmN0aW9uIChsaXN0LCBwcmVkaWNhdGUpIHtcbiAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGxpc3RbaW5kZXhdO1xuICAgICAgICBpZiAocHJlZGljYXRlKGVsZW1lbnQpKSB7XG4gICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gICAgfTtcbiAgICB2YXIgc3R5bGVWYWx1ZVRvVGV4dCA9IGZ1bmN0aW9uIChzdHlsZVZhbHVlKSB7XG4gICAgICByZXR1cm4gc3R5bGVWYWx1ZS5yZXBsYWNlKC9cXC0vZywgJyAnKS5yZXBsYWNlKC9cXGJcXHcvZywgZnVuY3Rpb24gKGNocikge1xuICAgICAgICByZXR1cm4gY2hyLnRvVXBwZXJDYXNlKCk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBpc1dpdGhpbkxpc3QgPSBmdW5jdGlvbiAoZWRpdG9yLCBlLCBub2RlTmFtZSkge1xuICAgICAgdmFyIHRhYmxlQ2VsbEluZGV4ID0gZmluZEluZGV4KGUucGFyZW50cywgaXNUYWJsZUNlbGxOb2RlKTtcbiAgICAgIHZhciBwYXJlbnRzID0gdGFibGVDZWxsSW5kZXggIT09IC0xID8gZS5wYXJlbnRzLnNsaWNlKDAsIHRhYmxlQ2VsbEluZGV4KSA6IGUucGFyZW50cztcbiAgICAgIHZhciBsaXN0cyA9IGdsb2JhbCQxLmdyZXAocGFyZW50cywgaXNMaXN0Tm9kZShlZGl0b3IpKTtcbiAgICAgIHJldHVybiBsaXN0cy5sZW5ndGggPiAwICYmIGxpc3RzWzBdLm5vZGVOYW1lID09PSBub2RlTmFtZTtcbiAgICB9O1xuICAgIHZhciBhZGRTcGxpdEJ1dHRvbiA9IGZ1bmN0aW9uIChlZGl0b3IsIGlkLCB0b29sdGlwLCBjbWQsIG5vZGVOYW1lLCBzdHlsZXMpIHtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRTcGxpdEJ1dHRvbihpZCwge1xuICAgICAgICB0b29sdGlwOiB0b29sdGlwLFxuICAgICAgICBpY29uOiBub2RlTmFtZSA9PT0gJ09MJyA/ICdvcmRlcmVkLWxpc3QnIDogJ3Vub3JkZXJlZC1saXN0JyxcbiAgICAgICAgcHJlc2V0czogJ2xpc3RwcmV2aWV3JyxcbiAgICAgICAgY29sdW1uczogMyxcbiAgICAgICAgZmV0Y2g6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgIHZhciBpdGVtcyA9IGdsb2JhbCQxLm1hcChzdHlsZXMsIGZ1bmN0aW9uIChzdHlsZVZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgaWNvblN0eWxlID0gbm9kZU5hbWUgPT09ICdPTCcgPyAnbnVtJyA6ICdidWxsJztcbiAgICAgICAgICAgIHZhciBpY29uTmFtZSA9IHN0eWxlVmFsdWUgPT09ICdkaXNjJyB8fCBzdHlsZVZhbHVlID09PSAnZGVjaW1hbCcgPyAnZGVmYXVsdCcgOiBzdHlsZVZhbHVlO1xuICAgICAgICAgICAgdmFyIGl0ZW1WYWx1ZSA9IHN0eWxlVmFsdWUgPT09ICdkZWZhdWx0JyA/ICcnIDogc3R5bGVWYWx1ZTtcbiAgICAgICAgICAgIHZhciBkaXNwbGF5VGV4dCA9IHN0eWxlVmFsdWVUb1RleHQoc3R5bGVWYWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICB0eXBlOiAnY2hvaWNlaXRlbScsXG4gICAgICAgICAgICAgIHZhbHVlOiBpdGVtVmFsdWUsXG4gICAgICAgICAgICAgIGljb246ICdsaXN0LScgKyBpY29uU3R5bGUgKyAnLScgKyBpY29uTmFtZSxcbiAgICAgICAgICAgICAgdGV4dDogZGlzcGxheVRleHRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY2FsbGJhY2soaXRlbXMpO1xuICAgICAgICB9LFxuICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBlZGl0b3IuZXhlY0NvbW1hbmQoY21kKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25JdGVtQWN0aW9uOiBmdW5jdGlvbiAoX3NwbGl0QnV0dG9uQXBpLCB2YWx1ZSkge1xuICAgICAgICAgIGFwcGx5TGlzdEZvcm1hdChlZGl0b3IsIG5vZGVOYW1lLCB2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNlbGVjdDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgdmFyIGxpc3RTdHlsZVR5cGUgPSBnZXRTZWxlY3RlZFN0eWxlVHlwZShlZGl0b3IpO1xuICAgICAgICAgIHJldHVybiBsaXN0U3R5bGVUeXBlLm1hcChmdW5jdGlvbiAobGlzdFN0eWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09IGxpc3RTdHlsZTtcbiAgICAgICAgICB9KS5nZXRPcihmYWxzZSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uU2V0dXA6IGZ1bmN0aW9uIChhcGkpIHtcbiAgICAgICAgICB2YXIgbm9kZUNoYW5nZUhhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgYXBpLnNldEFjdGl2ZShpc1dpdGhpbkxpc3QoZWRpdG9yLCBlLCBub2RlTmFtZSkpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgZWRpdG9yLm9uKCdOb2RlQ2hhbmdlJywgbm9kZUNoYW5nZUhhbmRsZXIpO1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gZWRpdG9yLm9mZignTm9kZUNoYW5nZScsIG5vZGVDaGFuZ2VIYW5kbGVyKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBhZGRCdXR0b24gPSBmdW5jdGlvbiAoZWRpdG9yLCBpZCwgdG9vbHRpcCwgY21kLCBub2RlTmFtZSwgX3N0eWxlcykge1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZFRvZ2dsZUJ1dHRvbihpZCwge1xuICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICB0b29sdGlwOiB0b29sdGlwLFxuICAgICAgICBpY29uOiBub2RlTmFtZSA9PT0gJ09MJyA/ICdvcmRlcmVkLWxpc3QnIDogJ3Vub3JkZXJlZC1saXN0JyxcbiAgICAgICAgb25TZXR1cDogZnVuY3Rpb24gKGFwaSkge1xuICAgICAgICAgIHZhciBub2RlQ2hhbmdlSGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBhcGkuc2V0QWN0aXZlKGlzV2l0aGluTGlzdChlZGl0b3IsIGUsIG5vZGVOYW1lKSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBlZGl0b3Iub24oJ05vZGVDaGFuZ2UnLCBub2RlQ2hhbmdlSGFuZGxlcik7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBlZGl0b3Iub2ZmKCdOb2RlQ2hhbmdlJywgbm9kZUNoYW5nZUhhbmRsZXIpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIG9uQWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci5leGVjQ29tbWFuZChjbWQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBhZGRDb250cm9sID0gZnVuY3Rpb24gKGVkaXRvciwgaWQsIHRvb2x0aXAsIGNtZCwgbm9kZU5hbWUsIHN0eWxlcykge1xuICAgICAgaWYgKHN0eWxlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGFkZFNwbGl0QnV0dG9uKGVkaXRvciwgaWQsIHRvb2x0aXAsIGNtZCwgbm9kZU5hbWUsIHN0eWxlcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGRCdXR0b24oZWRpdG9yLCBpZCwgdG9vbHRpcCwgY21kLCBub2RlTmFtZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgcmVnaXN0ZXIkMSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIGFkZENvbnRyb2woZWRpdG9yLCAnbnVtbGlzdCcsICdOdW1iZXJlZCBsaXN0JywgJ0luc2VydE9yZGVyZWRMaXN0JywgJ09MJywgZ2V0TnVtYmVyU3R5bGVzKGVkaXRvcikpO1xuICAgICAgYWRkQ29udHJvbChlZGl0b3IsICdidWxsaXN0JywgJ0J1bGxldCBsaXN0JywgJ0luc2VydFVub3JkZXJlZExpc3QnLCAnVUwnLCBnZXRCdWxsZXRTdHlsZXMoZWRpdG9yKSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFBsdWdpbiAoKSB7XG4gICAgICBnbG9iYWwuYWRkKCdhZHZsaXN0JywgZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICB2YXIgaGFzUGx1Z2luID0gZnVuY3Rpb24gKGVkaXRvciwgcGx1Z2luKSB7XG4gICAgICAgICAgcmV0dXJuIGdsb2JhbCQxLmluQXJyYXkoZWRpdG9yLmdldFBhcmFtKCdwbHVnaW5zJywgJycsICdzdHJpbmcnKS5zcGxpdCgvWyAsXS8pLCBwbHVnaW4pICE9PSAtMTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGhhc1BsdWdpbihlZGl0b3IsICdsaXN0cycpKSB7XG4gICAgICAgICAgcmVnaXN0ZXIkMShlZGl0b3IpO1xuICAgICAgICAgIHJlZ2lzdGVyKGVkaXRvcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIFBsdWdpbigpO1xuXG59KCkpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==