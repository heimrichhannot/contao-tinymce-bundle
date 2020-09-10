(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-noneditable"],{

/***/ "./node_modules/tinymce/plugins/noneditable/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/tinymce/plugins/noneditable/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Exports the "noneditable" plugin for usage with module loaders
// Usage:
//   CommonJS:
//     require('tinymce/plugins/noneditable')
//   ES2015:
//     import 'tinymce/plugins/noneditable'
__webpack_require__(/*! ./plugin.js */ "./node_modules/tinymce/plugins/noneditable/plugin.js");

/***/ }),

/***/ "./node_modules/tinymce/plugins/noneditable/plugin.js":
/*!************************************************************!*\
  !*** ./node_modules/tinymce/plugins/noneditable/plugin.js ***!
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
(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var getNonEditableClass = function (editor) {
      return editor.getParam('noneditable_noneditable_class', 'mceNonEditable');
    };
    var getEditableClass = function (editor) {
      return editor.getParam('noneditable_editable_class', 'mceEditable');
    };
    var getNonEditableRegExps = function (editor) {
      var nonEditableRegExps = editor.getParam('noneditable_regexp', []);
      if (nonEditableRegExps && nonEditableRegExps.constructor === RegExp) {
        return [nonEditableRegExps];
      } else {
        return nonEditableRegExps;
      }
    };

    var hasClass = function (checkClassName) {
      return function (node) {
        return (' ' + node.attr('class') + ' ').indexOf(checkClassName) !== -1;
      };
    };
    var replaceMatchWithSpan = function (editor, content, cls) {
      return function (match) {
        var args = arguments, index = args[args.length - 2];
        var prevChar = index > 0 ? content.charAt(index - 1) : '';
        if (prevChar === '"') {
          return match;
        }
        if (prevChar === '>') {
          var findStartTagIndex = content.lastIndexOf('<', index);
          if (findStartTagIndex !== -1) {
            var tagHtml = content.substring(findStartTagIndex, index);
            if (tagHtml.indexOf('contenteditable="false"') !== -1) {
              return match;
            }
          }
        }
        return '<span class="' + cls + '" data-mce-content="' + editor.dom.encode(args[0]) + '">' + editor.dom.encode(typeof args[1] === 'string' ? args[1] : args[0]) + '</span>';
      };
    };
    var convertRegExpsToNonEditable = function (editor, nonEditableRegExps, e) {
      var i = nonEditableRegExps.length, content = e.content;
      if (e.format === 'raw') {
        return;
      }
      while (i--) {
        content = content.replace(nonEditableRegExps[i], replaceMatchWithSpan(editor, content, getNonEditableClass(editor)));
      }
      e.content = content;
    };
    var setup = function (editor) {
      var contentEditableAttrName = 'contenteditable';
      var editClass = ' ' + global$1.trim(getEditableClass(editor)) + ' ';
      var nonEditClass = ' ' + global$1.trim(getNonEditableClass(editor)) + ' ';
      var hasEditClass = hasClass(editClass);
      var hasNonEditClass = hasClass(nonEditClass);
      var nonEditableRegExps = getNonEditableRegExps(editor);
      editor.on('PreInit', function () {
        if (nonEditableRegExps.length > 0) {
          editor.on('BeforeSetContent', function (e) {
            convertRegExpsToNonEditable(editor, nonEditableRegExps, e);
          });
        }
        editor.parser.addAttributeFilter('class', function (nodes) {
          var i = nodes.length, node;
          while (i--) {
            node = nodes[i];
            if (hasEditClass(node)) {
              node.attr(contentEditableAttrName, 'true');
            } else if (hasNonEditClass(node)) {
              node.attr(contentEditableAttrName, 'false');
            }
          }
        });
        editor.serializer.addAttributeFilter(contentEditableAttrName, function (nodes) {
          var i = nodes.length, node;
          while (i--) {
            node = nodes[i];
            if (!hasEditClass(node) && !hasNonEditClass(node)) {
              continue;
            }
            if (nonEditableRegExps.length > 0 && node.attr('data-mce-content')) {
              node.name = '#text';
              node.type = 3;
              node.raw = true;
              node.value = node.attr('data-mce-content');
            } else {
              node.attr(contentEditableAttrName, null);
            }
          }
        });
      });
    };

    function Plugin () {
      global.add('noneditable', function (editor) {
        setup(editor);
      });
    }

    Plugin();

}());


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL25vbmVkaXRhYmxlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55bWNlL3BsdWdpbnMvbm9uZWRpdGFibGUvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFPLENBQUMseUVBQWEsRTs7Ozs7Ozs7Ozs7QUNOckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBLENBQUMiLCJmaWxlIjoidGlueW1jZS1wbHVnaW4tbm9uZWRpdGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBFeHBvcnRzIHRoZSBcIm5vbmVkaXRhYmxlXCIgcGx1Z2luIGZvciB1c2FnZSB3aXRoIG1vZHVsZSBsb2FkZXJzXG4vLyBVc2FnZTpcbi8vICAgQ29tbW9uSlM6XG4vLyAgICAgcmVxdWlyZSgndGlueW1jZS9wbHVnaW5zL25vbmVkaXRhYmxlJylcbi8vICAgRVMyMDE1OlxuLy8gICAgIGltcG9ydCAndGlueW1jZS9wbHVnaW5zL25vbmVkaXRhYmxlJ1xucmVxdWlyZSgnLi9wbHVnaW4uanMnKTsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqXG4gKiBWZXJzaW9uOiA1LjQuMiAoMjAyMC0wOC0xNylcbiAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgZ2xvYmFsID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuUGx1Z2luTWFuYWdlcicpO1xuXG4gICAgdmFyIGdsb2JhbCQxID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UudXRpbC5Ub29scycpO1xuXG4gICAgdmFyIGdldE5vbkVkaXRhYmxlQ2xhc3MgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdub25lZGl0YWJsZV9ub25lZGl0YWJsZV9jbGFzcycsICdtY2VOb25FZGl0YWJsZScpO1xuICAgIH07XG4gICAgdmFyIGdldEVkaXRhYmxlQ2xhc3MgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdub25lZGl0YWJsZV9lZGl0YWJsZV9jbGFzcycsICdtY2VFZGl0YWJsZScpO1xuICAgIH07XG4gICAgdmFyIGdldE5vbkVkaXRhYmxlUmVnRXhwcyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBub25FZGl0YWJsZVJlZ0V4cHMgPSBlZGl0b3IuZ2V0UGFyYW0oJ25vbmVkaXRhYmxlX3JlZ2V4cCcsIFtdKTtcbiAgICAgIGlmIChub25FZGl0YWJsZVJlZ0V4cHMgJiYgbm9uRWRpdGFibGVSZWdFeHBzLmNvbnN0cnVjdG9yID09PSBSZWdFeHApIHtcbiAgICAgICAgcmV0dXJuIFtub25FZGl0YWJsZVJlZ0V4cHNdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5vbkVkaXRhYmxlUmVnRXhwcztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGhhc0NsYXNzID0gZnVuY3Rpb24gKGNoZWNrQ2xhc3NOYW1lKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuICgnICcgKyBub2RlLmF0dHIoJ2NsYXNzJykgKyAnICcpLmluZGV4T2YoY2hlY2tDbGFzc05hbWUpICE9PSAtMTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgcmVwbGFjZU1hdGNoV2l0aFNwYW4gPSBmdW5jdGlvbiAoZWRpdG9yLCBjb250ZW50LCBjbHMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsIGluZGV4ID0gYXJnc1thcmdzLmxlbmd0aCAtIDJdO1xuICAgICAgICB2YXIgcHJldkNoYXIgPSBpbmRleCA+IDAgPyBjb250ZW50LmNoYXJBdChpbmRleCAtIDEpIDogJyc7XG4gICAgICAgIGlmIChwcmV2Q2hhciA9PT0gJ1wiJykge1xuICAgICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJldkNoYXIgPT09ICc+Jykge1xuICAgICAgICAgIHZhciBmaW5kU3RhcnRUYWdJbmRleCA9IGNvbnRlbnQubGFzdEluZGV4T2YoJzwnLCBpbmRleCk7XG4gICAgICAgICAgaWYgKGZpbmRTdGFydFRhZ0luZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgdmFyIHRhZ0h0bWwgPSBjb250ZW50LnN1YnN0cmluZyhmaW5kU3RhcnRUYWdJbmRleCwgaW5kZXgpO1xuICAgICAgICAgICAgaWYgKHRhZ0h0bWwuaW5kZXhPZignY29udGVudGVkaXRhYmxlPVwiZmFsc2VcIicpICE9PSAtMSkge1xuICAgICAgICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnPHNwYW4gY2xhc3M9XCInICsgY2xzICsgJ1wiIGRhdGEtbWNlLWNvbnRlbnQ9XCInICsgZWRpdG9yLmRvbS5lbmNvZGUoYXJnc1swXSkgKyAnXCI+JyArIGVkaXRvci5kb20uZW5jb2RlKHR5cGVvZiBhcmdzWzFdID09PSAnc3RyaW5nJyA/IGFyZ3NbMV0gOiBhcmdzWzBdKSArICc8L3NwYW4+JztcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgY29udmVydFJlZ0V4cHNUb05vbkVkaXRhYmxlID0gZnVuY3Rpb24gKGVkaXRvciwgbm9uRWRpdGFibGVSZWdFeHBzLCBlKSB7XG4gICAgICB2YXIgaSA9IG5vbkVkaXRhYmxlUmVnRXhwcy5sZW5ndGgsIGNvbnRlbnQgPSBlLmNvbnRlbnQ7XG4gICAgICBpZiAoZS5mb3JtYXQgPT09ICdyYXcnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZShub25FZGl0YWJsZVJlZ0V4cHNbaV0sIHJlcGxhY2VNYXRjaFdpdGhTcGFuKGVkaXRvciwgY29udGVudCwgZ2V0Tm9uRWRpdGFibGVDbGFzcyhlZGl0b3IpKSk7XG4gICAgICB9XG4gICAgICBlLmNvbnRlbnQgPSBjb250ZW50O1xuICAgIH07XG4gICAgdmFyIHNldHVwID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGNvbnRlbnRFZGl0YWJsZUF0dHJOYW1lID0gJ2NvbnRlbnRlZGl0YWJsZSc7XG4gICAgICB2YXIgZWRpdENsYXNzID0gJyAnICsgZ2xvYmFsJDEudHJpbShnZXRFZGl0YWJsZUNsYXNzKGVkaXRvcikpICsgJyAnO1xuICAgICAgdmFyIG5vbkVkaXRDbGFzcyA9ICcgJyArIGdsb2JhbCQxLnRyaW0oZ2V0Tm9uRWRpdGFibGVDbGFzcyhlZGl0b3IpKSArICcgJztcbiAgICAgIHZhciBoYXNFZGl0Q2xhc3MgPSBoYXNDbGFzcyhlZGl0Q2xhc3MpO1xuICAgICAgdmFyIGhhc05vbkVkaXRDbGFzcyA9IGhhc0NsYXNzKG5vbkVkaXRDbGFzcyk7XG4gICAgICB2YXIgbm9uRWRpdGFibGVSZWdFeHBzID0gZ2V0Tm9uRWRpdGFibGVSZWdFeHBzKGVkaXRvcik7XG4gICAgICBlZGl0b3Iub24oJ1ByZUluaXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChub25FZGl0YWJsZVJlZ0V4cHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGVkaXRvci5vbignQmVmb3JlU2V0Q29udGVudCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBjb252ZXJ0UmVnRXhwc1RvTm9uRWRpdGFibGUoZWRpdG9yLCBub25FZGl0YWJsZVJlZ0V4cHMsIGUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVkaXRvci5wYXJzZXIuYWRkQXR0cmlidXRlRmlsdGVyKCdjbGFzcycsIGZ1bmN0aW9uIChub2Rlcykge1xuICAgICAgICAgIHZhciBpID0gbm9kZXMubGVuZ3RoLCBub2RlO1xuICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgIG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgICAgIGlmIChoYXNFZGl0Q2xhc3Mobm9kZSkpIHtcbiAgICAgICAgICAgICAgbm9kZS5hdHRyKGNvbnRlbnRFZGl0YWJsZUF0dHJOYW1lLCAndHJ1ZScpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNOb25FZGl0Q2xhc3Mobm9kZSkpIHtcbiAgICAgICAgICAgICAgbm9kZS5hdHRyKGNvbnRlbnRFZGl0YWJsZUF0dHJOYW1lLCAnZmFsc2UnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBlZGl0b3Iuc2VyaWFsaXplci5hZGRBdHRyaWJ1dGVGaWx0ZXIoY29udGVudEVkaXRhYmxlQXR0ck5hbWUsIGZ1bmN0aW9uIChub2Rlcykge1xuICAgICAgICAgIHZhciBpID0gbm9kZXMubGVuZ3RoLCBub2RlO1xuICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgIG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgICAgIGlmICghaGFzRWRpdENsYXNzKG5vZGUpICYmICFoYXNOb25FZGl0Q2xhc3Mobm9kZSkpIHtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm9uRWRpdGFibGVSZWdFeHBzLmxlbmd0aCA+IDAgJiYgbm9kZS5hdHRyKCdkYXRhLW1jZS1jb250ZW50JykpIHtcbiAgICAgICAgICAgICAgbm9kZS5uYW1lID0gJyN0ZXh0JztcbiAgICAgICAgICAgICAgbm9kZS50eXBlID0gMztcbiAgICAgICAgICAgICAgbm9kZS5yYXcgPSB0cnVlO1xuICAgICAgICAgICAgICBub2RlLnZhbHVlID0gbm9kZS5hdHRyKCdkYXRhLW1jZS1jb250ZW50Jyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBub2RlLmF0dHIoY29udGVudEVkaXRhYmxlQXR0ck5hbWUsIG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gUGx1Z2luICgpIHtcbiAgICAgIGdsb2JhbC5hZGQoJ25vbmVkaXRhYmxlJywgZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICBzZXR1cChlZGl0b3IpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgUGx1Z2luKCk7XG5cbn0oKSk7XG4iXSwic291cmNlUm9vdCI6IiJ9