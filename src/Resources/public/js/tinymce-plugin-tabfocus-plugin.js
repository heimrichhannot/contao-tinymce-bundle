(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-tabfocus-plugin"],{

/***/ "./node_modules/tinymce/plugins/tabfocus/plugin.js":
/*!*********************************************************!*\
  !*** ./node_modules/tinymce/plugins/tabfocus/plugin.js ***!
  \*********************************************************/
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

    var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

    var global$2 = tinymce.util.Tools.resolve('tinymce.EditorManager');

    var global$3 = tinymce.util.Tools.resolve('tinymce.Env');

    var global$4 = tinymce.util.Tools.resolve('tinymce.util.Delay');

    var global$5 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var global$6 = tinymce.util.Tools.resolve('tinymce.util.VK');

    var getTabFocusElements = function (editor) {
      return editor.getParam('tabfocus_elements', ':prev,:next');
    };
    var getTabFocus = function (editor) {
      return editor.getParam('tab_focus', getTabFocusElements(editor));
    };

    var DOM = global$1.DOM;
    var tabCancel = function (e) {
      if (e.keyCode === global$6.TAB && !e.ctrlKey && !e.altKey && !e.metaKey) {
        e.preventDefault();
      }
    };
    var setup = function (editor) {
      function tabHandler(e) {
        var x, el, i;
        if (e.keyCode !== global$6.TAB || e.ctrlKey || e.altKey || e.metaKey || e.isDefaultPrevented()) {
          return;
        }
        function find(direction) {
          el = DOM.select(':input:enabled,*[tabindex]:not(iframe)');
          function canSelectRecursive(e) {
            return e.nodeName === 'BODY' || e.type !== 'hidden' && e.style.display !== 'none' && e.style.visibility !== 'hidden' && canSelectRecursive(e.parentNode);
          }
          function canSelect(el) {
            return /INPUT|TEXTAREA|BUTTON/.test(el.tagName) && global$2.get(e.id) && el.tabIndex !== -1 && canSelectRecursive(el);
          }
          global$5.each(el, function (e, i) {
            if (e.id === editor.id) {
              x = i;
              return false;
            }
          });
          if (direction > 0) {
            for (i = x + 1; i < el.length; i++) {
              if (canSelect(el[i])) {
                return el[i];
              }
            }
          } else {
            for (i = x - 1; i >= 0; i--) {
              if (canSelect(el[i])) {
                return el[i];
              }
            }
          }
          return null;
        }
        var v = global$5.explode(getTabFocus(editor));
        if (v.length === 1) {
          v[1] = v[0];
          v[0] = ':prev';
        }
        if (e.shiftKey) {
          if (v[0] === ':prev') {
            el = find(-1);
          } else {
            el = DOM.get(v[0]);
          }
        } else {
          if (v[1] === ':next') {
            el = find(1);
          } else {
            el = DOM.get(v[1]);
          }
        }
        if (el) {
          var focusEditor = global$2.get(el.id || el.name);
          if (el.id && focusEditor) {
            focusEditor.focus();
          } else {
            global$4.setTimeout(function () {
              if (!global$3.webkit) {
                domGlobals.window.focus();
              }
              el.focus();
            }, 10);
          }
          e.preventDefault();
        }
      }
      editor.on('init', function () {
        if (editor.inline) {
          DOM.setAttrib(editor.getBody(), 'tabIndex', null);
        }
        editor.on('keyup', tabCancel);
        if (global$3.gecko) {
          editor.on('keypress keydown', tabHandler);
        } else {
          editor.on('keydown', tabHandler);
        }
      });
    };

    function Plugin () {
      global.add('tabfocus', function (editor) {
        setup(editor);
      });
    }

    Plugin();

}(window));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL3RhYmZvY3VzL3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSwyQkFBMkIsZUFBZTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCwyQkFBMkIsUUFBUTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTs7QUFFQSxDQUFDIiwiZmlsZSI6InRpbnltY2UtcGx1Z2luLXRhYmZvY3VzLXBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICpcbiAqIFZlcnNpb246IDUuNC4yICgyMDIwLTA4LTE3KVxuICovXG4oZnVuY3Rpb24gKGRvbUdsb2JhbHMpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgZ2xvYmFsID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuUGx1Z2luTWFuYWdlcicpO1xuXG4gICAgdmFyIGdsb2JhbCQxID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuZG9tLkRPTVV0aWxzJyk7XG5cbiAgICB2YXIgZ2xvYmFsJDIgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5FZGl0b3JNYW5hZ2VyJyk7XG5cbiAgICB2YXIgZ2xvYmFsJDMgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5FbnYnKTtcblxuICAgIHZhciBnbG9iYWwkNCA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuRGVsYXknKTtcblxuICAgIHZhciBnbG9iYWwkNSA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuVG9vbHMnKTtcblxuICAgIHZhciBnbG9iYWwkNiA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuVksnKTtcblxuICAgIHZhciBnZXRUYWJGb2N1c0VsZW1lbnRzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgndGFiZm9jdXNfZWxlbWVudHMnLCAnOnByZXYsOm5leHQnKTtcbiAgICB9O1xuICAgIHZhciBnZXRUYWJGb2N1cyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ3RhYl9mb2N1cycsIGdldFRhYkZvY3VzRWxlbWVudHMoZWRpdG9yKSk7XG4gICAgfTtcblxuICAgIHZhciBET00gPSBnbG9iYWwkMS5ET007XG4gICAgdmFyIHRhYkNhbmNlbCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSBnbG9iYWwkNi5UQUIgJiYgIWUuY3RybEtleSAmJiAhZS5hbHRLZXkgJiYgIWUubWV0YUtleSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgc2V0dXAgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBmdW5jdGlvbiB0YWJIYW5kbGVyKGUpIHtcbiAgICAgICAgdmFyIHgsIGVsLCBpO1xuICAgICAgICBpZiAoZS5rZXlDb2RlICE9PSBnbG9iYWwkNi5UQUIgfHwgZS5jdHJsS2V5IHx8IGUuYWx0S2V5IHx8IGUubWV0YUtleSB8fCBlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGZpbmQoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgZWwgPSBET00uc2VsZWN0KCc6aW5wdXQ6ZW5hYmxlZCwqW3RhYmluZGV4XTpub3QoaWZyYW1lKScpO1xuICAgICAgICAgIGZ1bmN0aW9uIGNhblNlbGVjdFJlY3Vyc2l2ZShlKSB7XG4gICAgICAgICAgICByZXR1cm4gZS5ub2RlTmFtZSA9PT0gJ0JPRFknIHx8IGUudHlwZSAhPT0gJ2hpZGRlbicgJiYgZS5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScgJiYgZS5zdHlsZS52aXNpYmlsaXR5ICE9PSAnaGlkZGVuJyAmJiBjYW5TZWxlY3RSZWN1cnNpdmUoZS5wYXJlbnROb2RlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZnVuY3Rpb24gY2FuU2VsZWN0KGVsKSB7XG4gICAgICAgICAgICByZXR1cm4gL0lOUFVUfFRFWFRBUkVBfEJVVFRPTi8udGVzdChlbC50YWdOYW1lKSAmJiBnbG9iYWwkMi5nZXQoZS5pZCkgJiYgZWwudGFiSW5kZXggIT09IC0xICYmIGNhblNlbGVjdFJlY3Vyc2l2ZShlbCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGdsb2JhbCQ1LmVhY2goZWwsIGZ1bmN0aW9uIChlLCBpKSB7XG4gICAgICAgICAgICBpZiAoZS5pZCA9PT0gZWRpdG9yLmlkKSB7XG4gICAgICAgICAgICAgIHggPSBpO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKGRpcmVjdGlvbiA+IDApIHtcbiAgICAgICAgICAgIGZvciAoaSA9IHggKyAxOyBpIDwgZWwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgaWYgKGNhblNlbGVjdChlbFtpXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxbaV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChpID0geCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgIGlmIChjYW5TZWxlY3QoZWxbaV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsW2ldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciB2ID0gZ2xvYmFsJDUuZXhwbG9kZShnZXRUYWJGb2N1cyhlZGl0b3IpKTtcbiAgICAgICAgaWYgKHYubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgdlsxXSA9IHZbMF07XG4gICAgICAgICAgdlswXSA9ICc6cHJldic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgICBpZiAodlswXSA9PT0gJzpwcmV2Jykge1xuICAgICAgICAgICAgZWwgPSBmaW5kKC0xKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWwgPSBET00uZ2V0KHZbMF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodlsxXSA9PT0gJzpuZXh0Jykge1xuICAgICAgICAgICAgZWwgPSBmaW5kKDEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbCA9IERPTS5nZXQodlsxXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChlbCkge1xuICAgICAgICAgIHZhciBmb2N1c0VkaXRvciA9IGdsb2JhbCQyLmdldChlbC5pZCB8fCBlbC5uYW1lKTtcbiAgICAgICAgICBpZiAoZWwuaWQgJiYgZm9jdXNFZGl0b3IpIHtcbiAgICAgICAgICAgIGZvY3VzRWRpdG9yLmZvY3VzKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdsb2JhbCQ0LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBpZiAoIWdsb2JhbCQzLndlYmtpdCkge1xuICAgICAgICAgICAgICAgIGRvbUdsb2JhbHMud2luZG93LmZvY3VzKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWwuZm9jdXMoKTtcbiAgICAgICAgICAgIH0sIDEwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlZGl0b3Iub24oJ2luaXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChlZGl0b3IuaW5saW5lKSB7XG4gICAgICAgICAgRE9NLnNldEF0dHJpYihlZGl0b3IuZ2V0Qm9keSgpLCAndGFiSW5kZXgnLCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgICBlZGl0b3Iub24oJ2tleXVwJywgdGFiQ2FuY2VsKTtcbiAgICAgICAgaWYgKGdsb2JhbCQzLmdlY2tvKSB7XG4gICAgICAgICAgZWRpdG9yLm9uKCdrZXlwcmVzcyBrZXlkb3duJywgdGFiSGFuZGxlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWRpdG9yLm9uKCdrZXlkb3duJywgdGFiSGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBQbHVnaW4gKCkge1xuICAgICAgZ2xvYmFsLmFkZCgndGFiZm9jdXMnLCBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIHNldHVwKGVkaXRvcik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBQbHVnaW4oKTtcblxufSh3aW5kb3cpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=