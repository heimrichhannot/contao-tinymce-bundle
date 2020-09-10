(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-pagebreak"],{

/***/ "./node_modules/tinymce/plugins/pagebreak/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/tinymce/plugins/pagebreak/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Exports the "pagebreak" plugin for usage with module loaders
// Usage:
//   CommonJS:
//     require('tinymce/plugins/pagebreak')
//   ES2015:
//     import 'tinymce/plugins/pagebreak'
__webpack_require__(/*! ./plugin.js */ "./node_modules/tinymce/plugins/pagebreak/plugin.js");

/***/ }),

/***/ "./node_modules/tinymce/plugins/pagebreak/plugin.js":
/*!**********************************************************!*\
  !*** ./node_modules/tinymce/plugins/pagebreak/plugin.js ***!
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

    var global$1 = tinymce.util.Tools.resolve('tinymce.Env');

    var getSeparatorHtml = function (editor) {
      return editor.getParam('pagebreak_separator', '<!-- pagebreak -->');
    };
    var shouldSplitBlock = function (editor) {
      return editor.getParam('pagebreak_split_block', false);
    };

    var getPageBreakClass = function () {
      return 'mce-pagebreak';
    };
    var getPlaceholderHtml = function () {
      return '<img src="' + global$1.transparentSrc + '" class="' + getPageBreakClass() + '" data-mce-resize="false" data-mce-placeholder />';
    };
    var setup = function (editor) {
      var separatorHtml = getSeparatorHtml(editor);
      var pageBreakSeparatorRegExp = new RegExp(separatorHtml.replace(/[\?\.\*\[\]\(\)\{\}\+\^\$\:]/g, function (a) {
        return '\\' + a;
      }), 'gi');
      editor.on('BeforeSetContent', function (e) {
        e.content = e.content.replace(pageBreakSeparatorRegExp, getPlaceholderHtml());
      });
      editor.on('PreInit', function () {
        editor.serializer.addNodeFilter('img', function (nodes) {
          var i = nodes.length, node, className;
          while (i--) {
            node = nodes[i];
            className = node.attr('class');
            if (className && className.indexOf('mce-pagebreak') !== -1) {
              var parentNode = node.parent;
              if (editor.schema.getBlockElements()[parentNode.name] && shouldSplitBlock(editor)) {
                parentNode.type = 3;
                parentNode.value = separatorHtml;
                parentNode.raw = true;
                node.remove();
                continue;
              }
              node.type = 3;
              node.value = separatorHtml;
              node.raw = true;
            }
          }
        });
      });
    };

    var register = function (editor) {
      editor.addCommand('mcePageBreak', function () {
        if (shouldSplitBlock(editor)) {
          editor.insertContent('<p>' + getPlaceholderHtml() + '</p>');
        } else {
          editor.insertContent(getPlaceholderHtml());
        }
      });
    };

    var setup$1 = function (editor) {
      editor.on('ResolveName', function (e) {
        if (e.target.nodeName === 'IMG' && editor.dom.hasClass(e.target, getPageBreakClass())) {
          e.name = 'pagebreak';
        }
      });
    };

    var register$1 = function (editor) {
      editor.ui.registry.addButton('pagebreak', {
        icon: 'page-break',
        tooltip: 'Page break',
        onAction: function () {
          return editor.execCommand('mcePageBreak');
        }
      });
      editor.ui.registry.addMenuItem('pagebreak', {
        text: 'Page break',
        icon: 'page-break',
        onAction: function () {
          return editor.execCommand('mcePageBreak');
        }
      });
    };

    function Plugin () {
      global.add('pagebreak', function (editor) {
        register(editor);
        register$1(editor);
        setup(editor);
        setup$1(editor);
      });
    }

    Plugin();

}());


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL3BhZ2VicmVhay9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL3BhZ2VicmVhay9wbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQU8sQ0FBQyx1RUFBYSxFOzs7Ozs7Ozs7OztBQ05yQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdGQUF3RixFQUFFO0FBQzFGO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7O0FBRUEsQ0FBQyIsImZpbGUiOiJ0aW55bWNlLXBsdWdpbi1wYWdlYnJlYWsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBFeHBvcnRzIHRoZSBcInBhZ2VicmVha1wiIHBsdWdpbiBmb3IgdXNhZ2Ugd2l0aCBtb2R1bGUgbG9hZGVyc1xuLy8gVXNhZ2U6XG4vLyAgIENvbW1vbkpTOlxuLy8gICAgIHJlcXVpcmUoJ3RpbnltY2UvcGx1Z2lucy9wYWdlYnJlYWsnKVxuLy8gICBFUzIwMTU6XG4vLyAgICAgaW1wb3J0ICd0aW55bWNlL3BsdWdpbnMvcGFnZWJyZWFrJ1xucmVxdWlyZSgnLi9wbHVnaW4uanMnKTsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqXG4gKiBWZXJzaW9uOiA1LjQuMiAoMjAyMC0wOC0xNylcbiAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgZ2xvYmFsID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuUGx1Z2luTWFuYWdlcicpO1xuXG4gICAgdmFyIGdsb2JhbCQxID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuRW52Jyk7XG5cbiAgICB2YXIgZ2V0U2VwYXJhdG9ySHRtbCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ3BhZ2VicmVha19zZXBhcmF0b3InLCAnPCEtLSBwYWdlYnJlYWsgLS0+Jyk7XG4gICAgfTtcbiAgICB2YXIgc2hvdWxkU3BsaXRCbG9jayA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ3BhZ2VicmVha19zcGxpdF9ibG9jaycsIGZhbHNlKTtcbiAgICB9O1xuXG4gICAgdmFyIGdldFBhZ2VCcmVha0NsYXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICdtY2UtcGFnZWJyZWFrJztcbiAgICB9O1xuICAgIHZhciBnZXRQbGFjZWhvbGRlckh0bWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gJzxpbWcgc3JjPVwiJyArIGdsb2JhbCQxLnRyYW5zcGFyZW50U3JjICsgJ1wiIGNsYXNzPVwiJyArIGdldFBhZ2VCcmVha0NsYXNzKCkgKyAnXCIgZGF0YS1tY2UtcmVzaXplPVwiZmFsc2VcIiBkYXRhLW1jZS1wbGFjZWhvbGRlciAvPic7XG4gICAgfTtcbiAgICB2YXIgc2V0dXAgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgc2VwYXJhdG9ySHRtbCA9IGdldFNlcGFyYXRvckh0bWwoZWRpdG9yKTtcbiAgICAgIHZhciBwYWdlQnJlYWtTZXBhcmF0b3JSZWdFeHAgPSBuZXcgUmVnRXhwKHNlcGFyYXRvckh0bWwucmVwbGFjZSgvW1xcP1xcLlxcKlxcW1xcXVxcKFxcKVxce1xcfVxcK1xcXlxcJFxcOl0vZywgZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgcmV0dXJuICdcXFxcJyArIGE7XG4gICAgICB9KSwgJ2dpJyk7XG4gICAgICBlZGl0b3Iub24oJ0JlZm9yZVNldENvbnRlbnQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLmNvbnRlbnQgPSBlLmNvbnRlbnQucmVwbGFjZShwYWdlQnJlYWtTZXBhcmF0b3JSZWdFeHAsIGdldFBsYWNlaG9sZGVySHRtbCgpKTtcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLm9uKCdQcmVJbml0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBlZGl0b3Iuc2VyaWFsaXplci5hZGROb2RlRmlsdGVyKCdpbWcnLCBmdW5jdGlvbiAobm9kZXMpIHtcbiAgICAgICAgICB2YXIgaSA9IG5vZGVzLmxlbmd0aCwgbm9kZSwgY2xhc3NOYW1lO1xuICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgIG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgICAgIGNsYXNzTmFtZSA9IG5vZGUuYXR0cignY2xhc3MnKTtcbiAgICAgICAgICAgIGlmIChjbGFzc05hbWUgJiYgY2xhc3NOYW1lLmluZGV4T2YoJ21jZS1wYWdlYnJlYWsnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgdmFyIHBhcmVudE5vZGUgPSBub2RlLnBhcmVudDtcbiAgICAgICAgICAgICAgaWYgKGVkaXRvci5zY2hlbWEuZ2V0QmxvY2tFbGVtZW50cygpW3BhcmVudE5vZGUubmFtZV0gJiYgc2hvdWxkU3BsaXRCbG9jayhlZGl0b3IpKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50Tm9kZS50eXBlID0gMztcbiAgICAgICAgICAgICAgICBwYXJlbnROb2RlLnZhbHVlID0gc2VwYXJhdG9ySHRtbDtcbiAgICAgICAgICAgICAgICBwYXJlbnROb2RlLnJhdyA9IHRydWU7XG4gICAgICAgICAgICAgICAgbm9kZS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBub2RlLnR5cGUgPSAzO1xuICAgICAgICAgICAgICBub2RlLnZhbHVlID0gc2VwYXJhdG9ySHRtbDtcbiAgICAgICAgICAgICAgbm9kZS5yYXcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHJlZ2lzdGVyID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgZWRpdG9yLmFkZENvbW1hbmQoJ21jZVBhZ2VCcmVhaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHNob3VsZFNwbGl0QmxvY2soZWRpdG9yKSkge1xuICAgICAgICAgIGVkaXRvci5pbnNlcnRDb250ZW50KCc8cD4nICsgZ2V0UGxhY2Vob2xkZXJIdG1sKCkgKyAnPC9wPicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVkaXRvci5pbnNlcnRDb250ZW50KGdldFBsYWNlaG9sZGVySHRtbCgpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBzZXR1cCQxID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgZWRpdG9yLm9uKCdSZXNvbHZlTmFtZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChlLnRhcmdldC5ub2RlTmFtZSA9PT0gJ0lNRycgJiYgZWRpdG9yLmRvbS5oYXNDbGFzcyhlLnRhcmdldCwgZ2V0UGFnZUJyZWFrQ2xhc3MoKSkpIHtcbiAgICAgICAgICBlLm5hbWUgPSAncGFnZWJyZWFrJztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciByZWdpc3RlciQxID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZEJ1dHRvbigncGFnZWJyZWFrJywge1xuICAgICAgICBpY29uOiAncGFnZS1icmVhaycsXG4gICAgICAgIHRvb2x0aXA6ICdQYWdlIGJyZWFrJyxcbiAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZWRpdG9yLmV4ZWNDb21tYW5kKCdtY2VQYWdlQnJlYWsnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkTWVudUl0ZW0oJ3BhZ2VicmVhaycsIHtcbiAgICAgICAgdGV4dDogJ1BhZ2UgYnJlYWsnLFxuICAgICAgICBpY29uOiAncGFnZS1icmVhaycsXG4gICAgICAgIG9uQWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci5leGVjQ29tbWFuZCgnbWNlUGFnZUJyZWFrJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBQbHVnaW4gKCkge1xuICAgICAgZ2xvYmFsLmFkZCgncGFnZWJyZWFrJywgZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICByZWdpc3RlcihlZGl0b3IpO1xuICAgICAgICByZWdpc3RlciQxKGVkaXRvcik7XG4gICAgICAgIHNldHVwKGVkaXRvcik7XG4gICAgICAgIHNldHVwJDEoZWRpdG9yKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIFBsdWdpbigpO1xuXG59KCkpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==