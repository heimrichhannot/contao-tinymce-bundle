(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-toc-plugin"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL3RvYy9wbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixvQkFBb0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLG9CQUFvQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDhCQUE4QixjQUFjO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCw0QkFBNEIsZ0JBQWdCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTs7QUFFQSxDQUFDIiwiZmlsZSI6InRpbnltY2UtcGx1Z2luLXRvYy1wbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqXG4gKiBWZXJzaW9uOiA1LjQuMiAoMjAyMC0wOC0xNylcbiAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgZ2xvYmFsID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuUGx1Z2luTWFuYWdlcicpO1xuXG4gICAgdmFyIGdsb2JhbCQxID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuZG9tLkRPTVV0aWxzJyk7XG5cbiAgICB2YXIgZ2xvYmFsJDIgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS51dGlsLkkxOG4nKTtcblxuICAgIHZhciBnbG9iYWwkMyA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuVG9vbHMnKTtcblxuICAgIHZhciBnZXRUb2NDbGFzcyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ3RvY19jbGFzcycsICdtY2UtdG9jJyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0VG9jSGVhZGVyID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIHRhZ05hbWUgPSBlZGl0b3IuZ2V0UGFyYW0oJ3RvY19oZWFkZXInLCAnaDInKTtcbiAgICAgIHJldHVybiAvXmhbMS02XSQvLnRlc3QodGFnTmFtZSkgPyB0YWdOYW1lIDogJ2gyJztcbiAgICB9O1xuICAgIHZhciBnZXRUb2NEZXB0aCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBkZXB0aCA9IHBhcnNlSW50KGVkaXRvci5nZXRQYXJhbSgndG9jX2RlcHRoJywgJzMnKSwgMTApO1xuICAgICAgcmV0dXJuIGRlcHRoID49IDEgJiYgZGVwdGggPD0gOSA/IGRlcHRoIDogMztcbiAgICB9O1xuXG4gICAgdmFyIGNyZWF0ZSA9IGZ1bmN0aW9uIChwcmVmaXgpIHtcbiAgICAgIHZhciBjb3VudGVyID0gMDtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBndWlkID0gbmV3IERhdGUoKS5nZXRUaW1lKCkudG9TdHJpbmcoMzIpO1xuICAgICAgICByZXR1cm4gcHJlZml4ICsgZ3VpZCArIChjb3VudGVyKyspLnRvU3RyaW5nKDMyKTtcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciB0b2NJZCA9IGNyZWF0ZSgnbWNldG9jXycpO1xuICAgIHZhciBnZW5lcmF0ZVNlbGVjdG9yID0gZnVuY3Rpb24gZ2VuZXJhdGVTZWxlY3RvcihkZXB0aCkge1xuICAgICAgdmFyIGk7XG4gICAgICB2YXIgc2VsZWN0b3IgPSBbXTtcbiAgICAgIGZvciAoaSA9IDE7IGkgPD0gZGVwdGg7IGkrKykge1xuICAgICAgICBzZWxlY3Rvci5wdXNoKCdoJyArIGkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlbGVjdG9yLmpvaW4oJywnKTtcbiAgICB9O1xuICAgIHZhciBoYXNIZWFkZXJzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIHJlYWRIZWFkZXJzKGVkaXRvcikubGVuZ3RoID4gMDtcbiAgICB9O1xuICAgIHZhciByZWFkSGVhZGVycyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciB0b2NDbGFzcyA9IGdldFRvY0NsYXNzKGVkaXRvcik7XG4gICAgICB2YXIgaGVhZGVyVGFnID0gZ2V0VG9jSGVhZGVyKGVkaXRvcik7XG4gICAgICB2YXIgc2VsZWN0b3IgPSBnZW5lcmF0ZVNlbGVjdG9yKGdldFRvY0RlcHRoKGVkaXRvcikpO1xuICAgICAgdmFyIGhlYWRlcnMgPSBlZGl0b3IuJChzZWxlY3Rvcik7XG4gICAgICBpZiAoaGVhZGVycy5sZW5ndGggJiYgL15oWzEtOV0kL2kudGVzdChoZWFkZXJUYWcpKSB7XG4gICAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLmZpbHRlcihmdW5jdGlvbiAoaSwgZWwpIHtcbiAgICAgICAgICByZXR1cm4gIWVkaXRvci5kb20uaGFzQ2xhc3MoZWwucGFyZW50Tm9kZSwgdG9jQ2xhc3MpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBnbG9iYWwkMy5tYXAoaGVhZGVycywgZnVuY3Rpb24gKGgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpZDogaC5pZCA/IGguaWQgOiB0b2NJZCgpLFxuICAgICAgICAgIGxldmVsOiBwYXJzZUludChoLm5vZGVOYW1lLnJlcGxhY2UoL15IL2ksICcnKSwgMTApLFxuICAgICAgICAgIHRpdGxlOiBlZGl0b3IuJC50ZXh0KGgpLFxuICAgICAgICAgIGVsZW1lbnQ6IGhcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGdldE1pbkxldmVsID0gZnVuY3Rpb24gKGhlYWRlcnMpIHtcbiAgICAgIHZhciBpLCBtaW5MZXZlbCA9IDk7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaGVhZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaGVhZGVyc1tpXS5sZXZlbCA8IG1pbkxldmVsKSB7XG4gICAgICAgICAgbWluTGV2ZWwgPSBoZWFkZXJzW2ldLmxldmVsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtaW5MZXZlbCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiBtaW5MZXZlbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG1pbkxldmVsO1xuICAgIH07XG4gICAgdmFyIGdlbmVyYXRlVGl0bGUgPSBmdW5jdGlvbiAodGFnLCB0aXRsZSkge1xuICAgICAgdmFyIG9wZW5UYWcgPSAnPCcgKyB0YWcgKyAnIGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIj4nO1xuICAgICAgdmFyIGNsb3NlVGFnID0gJzwvJyArIHRhZyArICc+JztcbiAgICAgIHJldHVybiBvcGVuVGFnICsgZ2xvYmFsJDEuRE9NLmVuY29kZSh0aXRsZSkgKyBjbG9zZVRhZztcbiAgICB9O1xuICAgIHZhciBnZW5lcmF0ZVRvY0h0bWwgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgaHRtbCA9IGdlbmVyYXRlVG9jQ29udGVudEh0bWwoZWRpdG9yKTtcbiAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIicgKyBlZGl0b3IuZG9tLmVuY29kZShnZXRUb2NDbGFzcyhlZGl0b3IpKSArICdcIiBjb250ZW50ZWRpdGFibGU9XCJmYWxzZVwiPicgKyBodG1sICsgJzwvZGl2Pic7XG4gICAgfTtcbiAgICB2YXIgZ2VuZXJhdGVUb2NDb250ZW50SHRtbCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBodG1sID0gJyc7XG4gICAgICB2YXIgaGVhZGVycyA9IHJlYWRIZWFkZXJzKGVkaXRvcik7XG4gICAgICB2YXIgcHJldkxldmVsID0gZ2V0TWluTGV2ZWwoaGVhZGVycykgLSAxO1xuICAgICAgdmFyIGksIGlpLCBoLCBuZXh0TGV2ZWw7XG4gICAgICBpZiAoIWhlYWRlcnMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICAgIGh0bWwgKz0gZ2VuZXJhdGVUaXRsZShnZXRUb2NIZWFkZXIoZWRpdG9yKSwgZ2xvYmFsJDIudHJhbnNsYXRlKCdUYWJsZSBvZiBDb250ZW50cycpKTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBoZWFkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGggPSBoZWFkZXJzW2ldO1xuICAgICAgICBoLmVsZW1lbnQuaWQgPSBoLmlkO1xuICAgICAgICBuZXh0TGV2ZWwgPSBoZWFkZXJzW2kgKyAxXSAmJiBoZWFkZXJzW2kgKyAxXS5sZXZlbDtcbiAgICAgICAgaWYgKHByZXZMZXZlbCA9PT0gaC5sZXZlbCkge1xuICAgICAgICAgIGh0bWwgKz0gJzxsaT4nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvciAoaWkgPSBwcmV2TGV2ZWw7IGlpIDwgaC5sZXZlbDsgaWkrKykge1xuICAgICAgICAgICAgaHRtbCArPSAnPHVsPjxsaT4nO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBodG1sICs9ICc8YSBocmVmPVwiIycgKyBoLmlkICsgJ1wiPicgKyBoLnRpdGxlICsgJzwvYT4nO1xuICAgICAgICBpZiAobmV4dExldmVsID09PSBoLmxldmVsIHx8ICFuZXh0TGV2ZWwpIHtcbiAgICAgICAgICBodG1sICs9ICc8L2xpPic7XG4gICAgICAgICAgaWYgKCFuZXh0TGV2ZWwpIHtcbiAgICAgICAgICAgIGh0bWwgKz0gJzwvdWw+JztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yIChpaSA9IGgubGV2ZWw7IGlpID4gbmV4dExldmVsOyBpaS0tKSB7XG4gICAgICAgICAgICBodG1sICs9ICc8L2xpPjwvdWw+PGxpPic7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHByZXZMZXZlbCA9IGgubGV2ZWw7XG4gICAgICB9XG4gICAgICByZXR1cm4gaHRtbDtcbiAgICB9O1xuICAgIHZhciBpc0VtcHR5T3JPZmZzY3JlbiA9IGZ1bmN0aW9uIChlZGl0b3IsIG5vZGVzKSB7XG4gICAgICByZXR1cm4gIW5vZGVzLmxlbmd0aCB8fCBlZGl0b3IuZG9tLmdldFBhcmVudHMobm9kZXNbMF0sICcubWNlLW9mZnNjcmVlbi1zZWxlY3Rpb24nKS5sZW5ndGggPiAwO1xuICAgIH07XG4gICAgdmFyIGluc2VydFRvYyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciB0b2NDbGFzcyA9IGdldFRvY0NsYXNzKGVkaXRvcik7XG4gICAgICB2YXIgJHRvY0VsbSA9IGVkaXRvci4kKCcuJyArIHRvY0NsYXNzKTtcbiAgICAgIGlmIChpc0VtcHR5T3JPZmZzY3JlbihlZGl0b3IsICR0b2NFbG0pKSB7XG4gICAgICAgIGVkaXRvci5pbnNlcnRDb250ZW50KGdlbmVyYXRlVG9jSHRtbChlZGl0b3IpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVwZGF0ZVRvYyhlZGl0b3IpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHVwZGF0ZVRvYyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciB0b2NDbGFzcyA9IGdldFRvY0NsYXNzKGVkaXRvcik7XG4gICAgICB2YXIgJHRvY0VsbSA9IGVkaXRvci4kKCcuJyArIHRvY0NsYXNzKTtcbiAgICAgIGlmICgkdG9jRWxtLmxlbmd0aCkge1xuICAgICAgICBlZGl0b3IudW5kb01hbmFnZXIudHJhbnNhY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICR0b2NFbG0uaHRtbChnZW5lcmF0ZVRvY0NvbnRlbnRIdG1sKGVkaXRvcikpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIHJlZ2lzdGVyID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgZWRpdG9yLmFkZENvbW1hbmQoJ21jZUluc2VydFRvYycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaW5zZXJ0VG9jKGVkaXRvcik7XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci5hZGRDb21tYW5kKCdtY2VVcGRhdGVUb2MnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHVwZGF0ZVRvYyhlZGl0b3IpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBzZXR1cCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciAkID0gZWRpdG9yLiQsIHRvY0NsYXNzID0gZ2V0VG9jQ2xhc3MoZWRpdG9yKTtcbiAgICAgIGVkaXRvci5vbignUHJlUHJvY2VzcycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciAkdG9jRWxtID0gJCgnLicgKyB0b2NDbGFzcywgZS5ub2RlKTtcbiAgICAgICAgaWYgKCR0b2NFbG0ubGVuZ3RoKSB7XG4gICAgICAgICAgJHRvY0VsbS5yZW1vdmVBdHRyKCdjb250ZW50RWRpdGFibGUnKTtcbiAgICAgICAgICAkdG9jRWxtLmZpbmQoJ1tjb250ZW50ZWRpdGFibGVdJykucmVtb3ZlQXR0cignY29udGVudEVkaXRhYmxlJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLm9uKCdTZXRDb250ZW50JywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJHRvY0VsbSA9ICQoJy4nICsgdG9jQ2xhc3MpO1xuICAgICAgICBpZiAoJHRvY0VsbS5sZW5ndGgpIHtcbiAgICAgICAgICAkdG9jRWxtLmF0dHIoJ2NvbnRlbnRFZGl0YWJsZScsIGZhbHNlKTtcbiAgICAgICAgICAkdG9jRWxtLmNoaWxkcmVuKCc6Zmlyc3QtY2hpbGQnKS5hdHRyKCdjb250ZW50RWRpdGFibGUnLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciB0b2dnbGVTdGF0ZSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYXBpKSB7XG4gICAgICAgIHZhciB0b2dnbGVEaXNhYmxlZFN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBhcGkuc2V0RGlzYWJsZWQoZWRpdG9yLm1vZGUuaXNSZWFkT25seSgpIHx8ICFoYXNIZWFkZXJzKGVkaXRvcikpO1xuICAgICAgICB9O1xuICAgICAgICB0b2dnbGVEaXNhYmxlZFN0YXRlKCk7XG4gICAgICAgIGVkaXRvci5vbignTG9hZENvbnRlbnQgU2V0Q29udGVudCBjaGFuZ2UnLCB0b2dnbGVEaXNhYmxlZFN0YXRlKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZWRpdG9yLm9uKCdMb2FkQ29udGVudCBTZXRDb250ZW50IGNoYW5nZScsIHRvZ2dsZURpc2FibGVkU3RhdGUpO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBpc1RvYyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoZWxtKSB7XG4gICAgICAgIHJldHVybiBlbG0gJiYgZWRpdG9yLmRvbS5pcyhlbG0sICcuJyArIGdldFRvY0NsYXNzKGVkaXRvcikpICYmIGVkaXRvci5nZXRCb2R5KCkuY29udGFpbnMoZWxtKTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgcmVnaXN0ZXIkMSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRCdXR0b24oJ3RvYycsIHtcbiAgICAgICAgaWNvbjogJ3RvYycsXG4gICAgICAgIHRvb2x0aXA6ICdUYWJsZSBvZiBjb250ZW50cycsXG4gICAgICAgIG9uQWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci5leGVjQ29tbWFuZCgnbWNlSW5zZXJ0VG9jJyk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uU2V0dXA6IHRvZ2dsZVN0YXRlKGVkaXRvcilcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZEJ1dHRvbigndG9jdXBkYXRlJywge1xuICAgICAgICBpY29uOiAncmVsb2FkJyxcbiAgICAgICAgdG9vbHRpcDogJ1VwZGF0ZScsXG4gICAgICAgIG9uQWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci5leGVjQ29tbWFuZCgnbWNlVXBkYXRlVG9jJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZE1lbnVJdGVtKCd0b2MnLCB7XG4gICAgICAgIGljb246ICd0b2MnLFxuICAgICAgICB0ZXh0OiAnVGFibGUgb2YgY29udGVudHMnLFxuICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBlZGl0b3IuZXhlY0NvbW1hbmQoJ21jZUluc2VydFRvYycpO1xuICAgICAgICB9LFxuICAgICAgICBvblNldHVwOiB0b2dnbGVTdGF0ZShlZGl0b3IpXG4gICAgICB9KTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRDb250ZXh0VG9vbGJhcigndG9jJywge1xuICAgICAgICBpdGVtczogJ3RvY3VwZGF0ZScsXG4gICAgICAgIHByZWRpY2F0ZTogaXNUb2MoZWRpdG9yKSxcbiAgICAgICAgc2NvcGU6ICdub2RlJyxcbiAgICAgICAgcG9zaXRpb246ICdub2RlJ1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFBsdWdpbiAoKSB7XG4gICAgICBnbG9iYWwuYWRkKCd0b2MnLCBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIHJlZ2lzdGVyKGVkaXRvcik7XG4gICAgICAgIHJlZ2lzdGVyJDEoZWRpdG9yKTtcbiAgICAgICAgc2V0dXAoZWRpdG9yKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIFBsdWdpbigpO1xuXG59KCkpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==