(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-toc"],{

/***/ "./node_modules/tinymce/plugins/toc/index.js":
/*!***************************************************!*\
  !*** ./node_modules/tinymce/plugins/toc/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Exports the "toc" plugin for usage with module loaders
// Usage:
//   CommonJS:
//     require('tinymce/plugins/toc')
//   ES2015:
//     import 'tinymce/plugins/toc'
__webpack_require__(/*! ./plugin.js */ "./node_modules/tinymce/plugins/toc/plugin.js");

/***/ }),

/***/ "./node_modules/tinymce/plugins/toc/plugin.js":
/*!****************************************************!*\
  !*** ./node_modules/tinymce/plugins/toc/plugin.js ***!
  \****************************************************/
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

    var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.I18n');

    var global$3 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var getTocClass = function (editor) {
      return editor.getParam('toc_class', 'mce-toc');
    };
    var getTocHeader = function (editor) {
      var tagName = editor.getParam('toc_header', 'h2');
      return /^h[1-6]$/.test(tagName) ? tagName : 'h2';
    };
    var getTocDepth = function (editor) {
      var depth = parseInt(editor.getParam('toc_depth', '3'), 10);
      return depth >= 1 && depth <= 9 ? depth : 3;
    };

    var create = function (prefix) {
      var counter = 0;
      return function () {
        var guid = new Date().getTime().toString(32);
        return prefix + guid + (counter++).toString(32);
      };
    };

    var tocId = create('mcetoc_');
    var generateSelector = function generateSelector(depth) {
      var i;
      var selector = [];
      for (i = 1; i <= depth; i++) {
        selector.push('h' + i);
      }
      return selector.join(',');
    };
    var hasHeaders = function (editor) {
      return readHeaders(editor).length > 0;
    };
    var readHeaders = function (editor) {
      var tocClass = getTocClass(editor);
      var headerTag = getTocHeader(editor);
      var selector = generateSelector(getTocDepth(editor));
      var headers = editor.$(selector);
      if (headers.length && /^h[1-9]$/i.test(headerTag)) {
        headers = headers.filter(function (i, el) {
          return !editor.dom.hasClass(el.parentNode, tocClass);
        });
      }
      return global$3.map(headers, function (h) {
        return {
          id: h.id ? h.id : tocId(),
          level: parseInt(h.nodeName.replace(/^H/i, ''), 10),
          title: editor.$.text(h),
          element: h
        };
      });
    };
    var getMinLevel = function (headers) {
      var i, minLevel = 9;
      for (i = 0; i < headers.length; i++) {
        if (headers[i].level < minLevel) {
          minLevel = headers[i].level;
        }
        if (minLevel === 1) {
          return minLevel;
        }
      }
      return minLevel;
    };
    var generateTitle = function (tag, title) {
      var openTag = '<' + tag + ' contenteditable="true">';
      var closeTag = '</' + tag + '>';
      return openTag + global$1.DOM.encode(title) + closeTag;
    };
    var generateTocHtml = function (editor) {
      var html = generateTocContentHtml(editor);
      return '<div class="' + editor.dom.encode(getTocClass(editor)) + '" contenteditable="false">' + html + '</div>';
    };
    var generateTocContentHtml = function (editor) {
      var html = '';
      var headers = readHeaders(editor);
      var prevLevel = getMinLevel(headers) - 1;
      var i, ii, h, nextLevel;
      if (!headers.length) {
        return '';
      }
      html += generateTitle(getTocHeader(editor), global$2.translate('Table of Contents'));
      for (i = 0; i < headers.length; i++) {
        h = headers[i];
        h.element.id = h.id;
        nextLevel = headers[i + 1] && headers[i + 1].level;
        if (prevLevel === h.level) {
          html += '<li>';
        } else {
          for (ii = prevLevel; ii < h.level; ii++) {
            html += '<ul><li>';
          }
        }
        html += '<a href="#' + h.id + '">' + h.title + '</a>';
        if (nextLevel === h.level || !nextLevel) {
          html += '</li>';
          if (!nextLevel) {
            html += '</ul>';
          }
        } else {
          for (ii = h.level; ii > nextLevel; ii--) {
            html += '</li></ul><li>';
          }
        }
        prevLevel = h.level;
      }
      return html;
    };
    var isEmptyOrOffscren = function (editor, nodes) {
      return !nodes.length || editor.dom.getParents(nodes[0], '.mce-offscreen-selection').length > 0;
    };
    var insertToc = function (editor) {
      var tocClass = getTocClass(editor);
      var $tocElm = editor.$('.' + tocClass);
      if (isEmptyOrOffscren(editor, $tocElm)) {
        editor.insertContent(generateTocHtml(editor));
      } else {
        updateToc(editor);
      }
    };
    var updateToc = function (editor) {
      var tocClass = getTocClass(editor);
      var $tocElm = editor.$('.' + tocClass);
      if ($tocElm.length) {
        editor.undoManager.transact(function () {
          $tocElm.html(generateTocContentHtml(editor));
        });
      }
    };

    var register = function (editor) {
      editor.addCommand('mceInsertToc', function () {
        insertToc(editor);
      });
      editor.addCommand('mceUpdateToc', function () {
        updateToc(editor);
      });
    };

    var setup = function (editor) {
      var $ = editor.$, tocClass = getTocClass(editor);
      editor.on('PreProcess', function (e) {
        var $tocElm = $('.' + tocClass, e.node);
        if ($tocElm.length) {
          $tocElm.removeAttr('contentEditable');
          $tocElm.find('[contenteditable]').removeAttr('contentEditable');
        }
      });
      editor.on('SetContent', function () {
        var $tocElm = $('.' + tocClass);
        if ($tocElm.length) {
          $tocElm.attr('contentEditable', false);
          $tocElm.children(':first-child').attr('contentEditable', true);
        }
      });
    };

    var toggleState = function (editor) {
      return function (api) {
        var toggleDisabledState = function () {
          return api.setDisabled(editor.mode.isReadOnly() || !hasHeaders(editor));
        };
        toggleDisabledState();
        editor.on('LoadContent SetContent change', toggleDisabledState);
        return function () {
          return editor.on('LoadContent SetContent change', toggleDisabledState);
        };
      };
    };
    var isToc = function (editor) {
      return function (elm) {
        return elm && editor.dom.is(elm, '.' + getTocClass(editor)) && editor.getBody().contains(elm);
      };
    };
    var register$1 = function (editor) {
      editor.ui.registry.addButton('toc', {
        icon: 'toc',
        tooltip: 'Table of contents',
        onAction: function () {
          return editor.execCommand('mceInsertToc');
        },
        onSetup: toggleState(editor)
      });
      editor.ui.registry.addButton('tocupdate', {
        icon: 'reload',
        tooltip: 'Update',
        onAction: function () {
          return editor.execCommand('mceUpdateToc');
        }
      });
      editor.ui.registry.addMenuItem('toc', {
        icon: 'toc',
        text: 'Table of contents',
        onAction: function () {
          return editor.execCommand('mceInsertToc');
        },
        onSetup: toggleState(editor)
      });
      editor.ui.registry.addContextToolbar('toc', {
        items: 'tocupdate',
        predicate: isToc(editor),
        scope: 'node',
        position: 'node'
      });
    };

    function Plugin () {
      global.add('toc', function (editor) {
        register(editor);
        register$1(editor);
        setup(editor);
      });
    }

    Plugin();

}());


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL3RvYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL3RvYy9wbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQU8sQ0FBQyxpRUFBYSxFOzs7Ozs7Ozs7OztBQ05yQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLG9CQUFvQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsb0JBQW9CO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsOEJBQThCLGNBQWM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDRCQUE0QixnQkFBZ0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBLENBQUMiLCJmaWxlIjoidGlueW1jZS1wbHVnaW4tdG9jLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRXhwb3J0cyB0aGUgXCJ0b2NcIiBwbHVnaW4gZm9yIHVzYWdlIHdpdGggbW9kdWxlIGxvYWRlcnNcbi8vIFVzYWdlOlxuLy8gICBDb21tb25KUzpcbi8vICAgICByZXF1aXJlKCd0aW55bWNlL3BsdWdpbnMvdG9jJylcbi8vICAgRVMyMDE1OlxuLy8gICAgIGltcG9ydCAndGlueW1jZS9wbHVnaW5zL3RvYydcbnJlcXVpcmUoJy4vcGx1Z2luLmpzJyk7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIFRpbnkgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTEdQTCBvciBhIGNvbW1lcmNpYWwgbGljZW5zZS5cbiAqIEZvciBMR1BMIHNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogRm9yIGNvbW1lcmNpYWwgbGljZW5zZXMgc2VlIGh0dHBzOi8vd3d3LnRpbnkuY2xvdWQvXG4gKlxuICogVmVyc2lvbjogNS40LjIgKDIwMjAtMDgtMTcpXG4gKi9cbihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIGdsb2JhbCA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLlBsdWdpbk1hbmFnZXInKTtcblxuICAgIHZhciBnbG9iYWwkMSA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLmRvbS5ET01VdGlscycpO1xuXG4gICAgdmFyIGdsb2JhbCQyID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UudXRpbC5JMThuJyk7XG5cbiAgICB2YXIgZ2xvYmFsJDMgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS51dGlsLlRvb2xzJyk7XG5cbiAgICB2YXIgZ2V0VG9jQ2xhc3MgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCd0b2NfY2xhc3MnLCAnbWNlLXRvYycpO1xuICAgIH07XG4gICAgdmFyIGdldFRvY0hlYWRlciA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciB0YWdOYW1lID0gZWRpdG9yLmdldFBhcmFtKCd0b2NfaGVhZGVyJywgJ2gyJyk7XG4gICAgICByZXR1cm4gL15oWzEtNl0kLy50ZXN0KHRhZ05hbWUpID8gdGFnTmFtZSA6ICdoMic7XG4gICAgfTtcbiAgICB2YXIgZ2V0VG9jRGVwdGggPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgZGVwdGggPSBwYXJzZUludChlZGl0b3IuZ2V0UGFyYW0oJ3RvY19kZXB0aCcsICczJyksIDEwKTtcbiAgICAgIHJldHVybiBkZXB0aCA+PSAxICYmIGRlcHRoIDw9IDkgPyBkZXB0aCA6IDM7XG4gICAgfTtcblxuICAgIHZhciBjcmVhdGUgPSBmdW5jdGlvbiAocHJlZml4KSB7XG4gICAgICB2YXIgY291bnRlciA9IDA7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZ3VpZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLnRvU3RyaW5nKDMyKTtcbiAgICAgICAgcmV0dXJuIHByZWZpeCArIGd1aWQgKyAoY291bnRlcisrKS50b1N0cmluZygzMik7XG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgdG9jSWQgPSBjcmVhdGUoJ21jZXRvY18nKTtcbiAgICB2YXIgZ2VuZXJhdGVTZWxlY3RvciA9IGZ1bmN0aW9uIGdlbmVyYXRlU2VsZWN0b3IoZGVwdGgpIHtcbiAgICAgIHZhciBpO1xuICAgICAgdmFyIHNlbGVjdG9yID0gW107XG4gICAgICBmb3IgKGkgPSAxOyBpIDw9IGRlcHRoOyBpKyspIHtcbiAgICAgICAgc2VsZWN0b3IucHVzaCgnaCcgKyBpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZWxlY3Rvci5qb2luKCcsJyk7XG4gICAgfTtcbiAgICB2YXIgaGFzSGVhZGVycyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiByZWFkSGVhZGVycyhlZGl0b3IpLmxlbmd0aCA+IDA7XG4gICAgfTtcbiAgICB2YXIgcmVhZEhlYWRlcnMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgdG9jQ2xhc3MgPSBnZXRUb2NDbGFzcyhlZGl0b3IpO1xuICAgICAgdmFyIGhlYWRlclRhZyA9IGdldFRvY0hlYWRlcihlZGl0b3IpO1xuICAgICAgdmFyIHNlbGVjdG9yID0gZ2VuZXJhdGVTZWxlY3RvcihnZXRUb2NEZXB0aChlZGl0b3IpKTtcbiAgICAgIHZhciBoZWFkZXJzID0gZWRpdG9yLiQoc2VsZWN0b3IpO1xuICAgICAgaWYgKGhlYWRlcnMubGVuZ3RoICYmIC9eaFsxLTldJC9pLnRlc3QoaGVhZGVyVGFnKSkge1xuICAgICAgICBoZWFkZXJzID0gaGVhZGVycy5maWx0ZXIoZnVuY3Rpb24gKGksIGVsKSB7XG4gICAgICAgICAgcmV0dXJuICFlZGl0b3IuZG9tLmhhc0NsYXNzKGVsLnBhcmVudE5vZGUsIHRvY0NsYXNzKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZ2xvYmFsJDMubWFwKGhlYWRlcnMsIGZ1bmN0aW9uIChoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaWQ6IGguaWQgPyBoLmlkIDogdG9jSWQoKSxcbiAgICAgICAgICBsZXZlbDogcGFyc2VJbnQoaC5ub2RlTmFtZS5yZXBsYWNlKC9eSC9pLCAnJyksIDEwKSxcbiAgICAgICAgICB0aXRsZTogZWRpdG9yLiQudGV4dChoKSxcbiAgICAgICAgICBlbGVtZW50OiBoXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBnZXRNaW5MZXZlbCA9IGZ1bmN0aW9uIChoZWFkZXJzKSB7XG4gICAgICB2YXIgaSwgbWluTGV2ZWwgPSA5O1xuICAgICAgZm9yIChpID0gMDsgaSA8IGhlYWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGhlYWRlcnNbaV0ubGV2ZWwgPCBtaW5MZXZlbCkge1xuICAgICAgICAgIG1pbkxldmVsID0gaGVhZGVyc1tpXS5sZXZlbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWluTGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICByZXR1cm4gbWluTGV2ZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBtaW5MZXZlbDtcbiAgICB9O1xuICAgIHZhciBnZW5lcmF0ZVRpdGxlID0gZnVuY3Rpb24gKHRhZywgdGl0bGUpIHtcbiAgICAgIHZhciBvcGVuVGFnID0gJzwnICsgdGFnICsgJyBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCI+JztcbiAgICAgIHZhciBjbG9zZVRhZyA9ICc8LycgKyB0YWcgKyAnPic7XG4gICAgICByZXR1cm4gb3BlblRhZyArIGdsb2JhbCQxLkRPTS5lbmNvZGUodGl0bGUpICsgY2xvc2VUYWc7XG4gICAgfTtcbiAgICB2YXIgZ2VuZXJhdGVUb2NIdG1sID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGh0bWwgPSBnZW5lcmF0ZVRvY0NvbnRlbnRIdG1sKGVkaXRvcik7XG4gICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCInICsgZWRpdG9yLmRvbS5lbmNvZGUoZ2V0VG9jQ2xhc3MoZWRpdG9yKSkgKyAnXCIgY29udGVudGVkaXRhYmxlPVwiZmFsc2VcIj4nICsgaHRtbCArICc8L2Rpdj4nO1xuICAgIH07XG4gICAgdmFyIGdlbmVyYXRlVG9jQ29udGVudEh0bWwgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgaHRtbCA9ICcnO1xuICAgICAgdmFyIGhlYWRlcnMgPSByZWFkSGVhZGVycyhlZGl0b3IpO1xuICAgICAgdmFyIHByZXZMZXZlbCA9IGdldE1pbkxldmVsKGhlYWRlcnMpIC0gMTtcbiAgICAgIHZhciBpLCBpaSwgaCwgbmV4dExldmVsO1xuICAgICAgaWYgKCFoZWFkZXJzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgICBodG1sICs9IGdlbmVyYXRlVGl0bGUoZ2V0VG9jSGVhZGVyKGVkaXRvciksIGdsb2JhbCQyLnRyYW5zbGF0ZSgnVGFibGUgb2YgQ29udGVudHMnKSk7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaGVhZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBoID0gaGVhZGVyc1tpXTtcbiAgICAgICAgaC5lbGVtZW50LmlkID0gaC5pZDtcbiAgICAgICAgbmV4dExldmVsID0gaGVhZGVyc1tpICsgMV0gJiYgaGVhZGVyc1tpICsgMV0ubGV2ZWw7XG4gICAgICAgIGlmIChwcmV2TGV2ZWwgPT09IGgubGV2ZWwpIHtcbiAgICAgICAgICBodG1sICs9ICc8bGk+JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKGlpID0gcHJldkxldmVsOyBpaSA8IGgubGV2ZWw7IGlpKyspIHtcbiAgICAgICAgICAgIGh0bWwgKz0gJzx1bD48bGk+JztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaHRtbCArPSAnPGEgaHJlZj1cIiMnICsgaC5pZCArICdcIj4nICsgaC50aXRsZSArICc8L2E+JztcbiAgICAgICAgaWYgKG5leHRMZXZlbCA9PT0gaC5sZXZlbCB8fCAhbmV4dExldmVsKSB7XG4gICAgICAgICAgaHRtbCArPSAnPC9saT4nO1xuICAgICAgICAgIGlmICghbmV4dExldmVsKSB7XG4gICAgICAgICAgICBodG1sICs9ICc8L3VsPic7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvciAoaWkgPSBoLmxldmVsOyBpaSA+IG5leHRMZXZlbDsgaWktLSkge1xuICAgICAgICAgICAgaHRtbCArPSAnPC9saT48L3VsPjxsaT4nO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwcmV2TGV2ZWwgPSBoLmxldmVsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfTtcbiAgICB2YXIgaXNFbXB0eU9yT2Zmc2NyZW4gPSBmdW5jdGlvbiAoZWRpdG9yLCBub2Rlcykge1xuICAgICAgcmV0dXJuICFub2Rlcy5sZW5ndGggfHwgZWRpdG9yLmRvbS5nZXRQYXJlbnRzKG5vZGVzWzBdLCAnLm1jZS1vZmZzY3JlZW4tc2VsZWN0aW9uJykubGVuZ3RoID4gMDtcbiAgICB9O1xuICAgIHZhciBpbnNlcnRUb2MgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgdG9jQ2xhc3MgPSBnZXRUb2NDbGFzcyhlZGl0b3IpO1xuICAgICAgdmFyICR0b2NFbG0gPSBlZGl0b3IuJCgnLicgKyB0b2NDbGFzcyk7XG4gICAgICBpZiAoaXNFbXB0eU9yT2Zmc2NyZW4oZWRpdG9yLCAkdG9jRWxtKSkge1xuICAgICAgICBlZGl0b3IuaW5zZXJ0Q29udGVudChnZW5lcmF0ZVRvY0h0bWwoZWRpdG9yKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cGRhdGVUb2MoZWRpdG9yKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciB1cGRhdGVUb2MgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgdG9jQ2xhc3MgPSBnZXRUb2NDbGFzcyhlZGl0b3IpO1xuICAgICAgdmFyICR0b2NFbG0gPSBlZGl0b3IuJCgnLicgKyB0b2NDbGFzcyk7XG4gICAgICBpZiAoJHRvY0VsbS5sZW5ndGgpIHtcbiAgICAgICAgZWRpdG9yLnVuZG9NYW5hZ2VyLnRyYW5zYWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkdG9jRWxtLmh0bWwoZ2VuZXJhdGVUb2NDb250ZW50SHRtbChlZGl0b3IpKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciByZWdpc3RlciA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIGVkaXRvci5hZGRDb21tYW5kKCdtY2VJbnNlcnRUb2MnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGluc2VydFRvYyhlZGl0b3IpO1xuICAgICAgfSk7XG4gICAgICBlZGl0b3IuYWRkQ29tbWFuZCgnbWNlVXBkYXRlVG9jJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB1cGRhdGVUb2MoZWRpdG9yKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgc2V0dXAgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgJCA9IGVkaXRvci4kLCB0b2NDbGFzcyA9IGdldFRvY0NsYXNzKGVkaXRvcik7XG4gICAgICBlZGl0b3Iub24oJ1ByZVByb2Nlc3MnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgJHRvY0VsbSA9ICQoJy4nICsgdG9jQ2xhc3MsIGUubm9kZSk7XG4gICAgICAgIGlmICgkdG9jRWxtLmxlbmd0aCkge1xuICAgICAgICAgICR0b2NFbG0ucmVtb3ZlQXR0cignY29udGVudEVkaXRhYmxlJyk7XG4gICAgICAgICAgJHRvY0VsbS5maW5kKCdbY29udGVudGVkaXRhYmxlXScpLnJlbW92ZUF0dHIoJ2NvbnRlbnRFZGl0YWJsZScpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci5vbignU2V0Q29udGVudCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICR0b2NFbG0gPSAkKCcuJyArIHRvY0NsYXNzKTtcbiAgICAgICAgaWYgKCR0b2NFbG0ubGVuZ3RoKSB7XG4gICAgICAgICAgJHRvY0VsbS5hdHRyKCdjb250ZW50RWRpdGFibGUnLCBmYWxzZSk7XG4gICAgICAgICAgJHRvY0VsbS5jaGlsZHJlbignOmZpcnN0LWNoaWxkJykuYXR0cignY29udGVudEVkaXRhYmxlJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgdG9nZ2xlU3RhdGUgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGFwaSkge1xuICAgICAgICB2YXIgdG9nZ2xlRGlzYWJsZWRTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gYXBpLnNldERpc2FibGVkKGVkaXRvci5tb2RlLmlzUmVhZE9ubHkoKSB8fCAhaGFzSGVhZGVycyhlZGl0b3IpKTtcbiAgICAgICAgfTtcbiAgICAgICAgdG9nZ2xlRGlzYWJsZWRTdGF0ZSgpO1xuICAgICAgICBlZGl0b3Iub24oJ0xvYWRDb250ZW50IFNldENvbnRlbnQgY2hhbmdlJywgdG9nZ2xlRGlzYWJsZWRTdGF0ZSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci5vbignTG9hZENvbnRlbnQgU2V0Q29udGVudCBjaGFuZ2UnLCB0b2dnbGVEaXNhYmxlZFN0YXRlKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgaXNUb2MgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGVsbSkge1xuICAgICAgICByZXR1cm4gZWxtICYmIGVkaXRvci5kb20uaXMoZWxtLCAnLicgKyBnZXRUb2NDbGFzcyhlZGl0b3IpKSAmJiBlZGl0b3IuZ2V0Qm9keSgpLmNvbnRhaW5zKGVsbSk7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHJlZ2lzdGVyJDEgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQnV0dG9uKCd0b2MnLCB7XG4gICAgICAgIGljb246ICd0b2MnLFxuICAgICAgICB0b29sdGlwOiAnVGFibGUgb2YgY29udGVudHMnLFxuICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBlZGl0b3IuZXhlY0NvbW1hbmQoJ21jZUluc2VydFRvYycpO1xuICAgICAgICB9LFxuICAgICAgICBvblNldHVwOiB0b2dnbGVTdGF0ZShlZGl0b3IpXG4gICAgICB9KTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRCdXR0b24oJ3RvY3VwZGF0ZScsIHtcbiAgICAgICAgaWNvbjogJ3JlbG9hZCcsXG4gICAgICAgIHRvb2x0aXA6ICdVcGRhdGUnLFxuICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBlZGl0b3IuZXhlY0NvbW1hbmQoJ21jZVVwZGF0ZVRvYycpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRNZW51SXRlbSgndG9jJywge1xuICAgICAgICBpY29uOiAndG9jJyxcbiAgICAgICAgdGV4dDogJ1RhYmxlIG9mIGNvbnRlbnRzJyxcbiAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZWRpdG9yLmV4ZWNDb21tYW5kKCdtY2VJbnNlcnRUb2MnKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TZXR1cDogdG9nZ2xlU3RhdGUoZWRpdG9yKVxuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQ29udGV4dFRvb2xiYXIoJ3RvYycsIHtcbiAgICAgICAgaXRlbXM6ICd0b2N1cGRhdGUnLFxuICAgICAgICBwcmVkaWNhdGU6IGlzVG9jKGVkaXRvciksXG4gICAgICAgIHNjb3BlOiAnbm9kZScsXG4gICAgICAgIHBvc2l0aW9uOiAnbm9kZSdcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBQbHVnaW4gKCkge1xuICAgICAgZ2xvYmFsLmFkZCgndG9jJywgZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICByZWdpc3RlcihlZGl0b3IpO1xuICAgICAgICByZWdpc3RlciQxKGVkaXRvcik7XG4gICAgICAgIHNldHVwKGVkaXRvcik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBQbHVnaW4oKTtcblxufSgpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=