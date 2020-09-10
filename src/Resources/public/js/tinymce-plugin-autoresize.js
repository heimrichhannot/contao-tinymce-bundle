(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-autoresize"],{

/***/ "./node_modules/tinymce/plugins/autoresize/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/tinymce/plugins/autoresize/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Exports the "autoresize" plugin for usage with module loaders
// Usage:
//   CommonJS:
//     require('tinymce/plugins/autoresize')
//   ES2015:
//     import 'tinymce/plugins/autoresize'
__webpack_require__(/*! ./plugin.js */ "./node_modules/tinymce/plugins/autoresize/plugin.js");

/***/ }),

/***/ "./node_modules/tinymce/plugins/autoresize/plugin.js":
/*!***********************************************************!*\
  !*** ./node_modules/tinymce/plugins/autoresize/plugin.js ***!
  \***********************************************************/
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

    var Cell = function (initial) {
      var value = initial;
      var get = function () {
        return value;
      };
      var set = function (v) {
        value = v;
      };
      return {
        get: get,
        set: set
      };
    };

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var global$1 = tinymce.util.Tools.resolve('tinymce.Env');

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.Delay');

    var fireResizeEditor = function (editor) {
      return editor.fire('ResizeEditor');
    };

    var getAutoResizeMinHeight = function (editor) {
      return editor.getParam('min_height', editor.getElement().offsetHeight, 'number');
    };
    var getAutoResizeMaxHeight = function (editor) {
      return editor.getParam('max_height', 0, 'number');
    };
    var getAutoResizeOverflowPadding = function (editor) {
      return editor.getParam('autoresize_overflow_padding', 1, 'number');
    };
    var getAutoResizeBottomMargin = function (editor) {
      return editor.getParam('autoresize_bottom_margin', 50, 'number');
    };
    var shouldAutoResizeOnInit = function (editor) {
      return editor.getParam('autoresize_on_init', true, 'boolean');
    };

    var isFullscreen = function (editor) {
      return editor.plugins.fullscreen && editor.plugins.fullscreen.isFullscreen();
    };
    var wait = function (editor, oldSize, times, interval, callback) {
      global$2.setEditorTimeout(editor, function () {
        resize(editor, oldSize);
        if (times--) {
          wait(editor, oldSize, times, interval, callback);
        } else if (callback) {
          callback();
        }
      }, interval);
    };
    var toggleScrolling = function (editor, state) {
      var body = editor.getBody();
      if (body) {
        body.style.overflowY = state ? '' : 'hidden';
        if (!state) {
          body.scrollTop = 0;
        }
      }
    };
    var parseCssValueToInt = function (dom, elm, name, computed) {
      var value = parseInt(dom.getStyle(elm, name, computed), 10);
      return isNaN(value) ? 0 : value;
    };
    var resize = function (editor, oldSize) {
      var dom = editor.dom;
      var doc = editor.getDoc();
      if (!doc) {
        return;
      }
      if (isFullscreen(editor)) {
        toggleScrolling(editor, true);
        return;
      }
      var docEle = doc.documentElement;
      var resizeBottomMargin = getAutoResizeBottomMargin(editor);
      var resizeHeight = getAutoResizeMinHeight(editor);
      var marginTop = parseCssValueToInt(dom, docEle, 'margin-top', true);
      var marginBottom = parseCssValueToInt(dom, docEle, 'margin-bottom', true);
      var contentHeight = docEle.offsetHeight + marginTop + marginBottom + resizeBottomMargin;
      if (contentHeight < 0) {
        contentHeight = 0;
      }
      var containerHeight = editor.getContainer().offsetHeight;
      var contentAreaHeight = editor.getContentAreaContainer().offsetHeight;
      var chromeHeight = containerHeight - contentAreaHeight;
      if (contentHeight + chromeHeight > getAutoResizeMinHeight(editor)) {
        resizeHeight = contentHeight + chromeHeight;
      }
      var maxHeight = getAutoResizeMaxHeight(editor);
      if (maxHeight && resizeHeight > maxHeight) {
        resizeHeight = maxHeight;
        toggleScrolling(editor, true);
      } else {
        toggleScrolling(editor, false);
      }
      if (resizeHeight !== oldSize.get()) {
        var deltaSize = resizeHeight - oldSize.get();
        dom.setStyle(editor.getContainer(), 'height', resizeHeight + 'px');
        oldSize.set(resizeHeight);
        fireResizeEditor(editor);
        if (global$1.browser.isSafari() && global$1.mac) {
          var win = editor.getWin();
          win.scrollTo(win.pageXOffset, win.pageYOffset);
        }
        if (editor.hasFocus()) {
          editor.selection.scrollIntoView(editor.selection.getNode());
        }
        if (global$1.webkit && deltaSize < 0) {
          resize(editor, oldSize);
        }
      }
    };
    var setup = function (editor, oldSize) {
      editor.on('init', function () {
        var overflowPadding = getAutoResizeOverflowPadding(editor);
        var dom = editor.dom;
        dom.setStyles(editor.getDoc().documentElement, { height: 'auto' });
        dom.setStyles(editor.getBody(), {
          'paddingLeft': overflowPadding,
          'paddingRight': overflowPadding,
          'min-height': 0
        });
      });
      editor.on('NodeChange SetContent keyup FullscreenStateChanged ResizeContent', function () {
        resize(editor, oldSize);
      });
      if (shouldAutoResizeOnInit(editor)) {
        editor.on('init', function () {
          wait(editor, oldSize, 20, 100, function () {
            wait(editor, oldSize, 5, 1000);
          });
        });
      }
    };

    var register = function (editor, oldSize) {
      editor.addCommand('mceAutoResize', function () {
        resize(editor, oldSize);
      });
    };

    function Plugin () {
      global.add('autoresize', function (editor) {
        if (!editor.settings.hasOwnProperty('resize')) {
          editor.settings.resize = false;
        }
        if (!editor.inline) {
          var oldSize = Cell(0);
          register(editor, oldSize);
          setup(editor, oldSize);
        }
      });
    }

    Plugin();

}());


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2F1dG9yZXNpemUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RpbnltY2UvcGx1Z2lucy9hdXRvcmVzaXplL3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBTyxDQUFDLHdFQUFhLEU7Ozs7Ozs7Ozs7O0FDTnJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsaUJBQWlCO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTs7QUFFQSxDQUFDIiwiZmlsZSI6InRpbnltY2UtcGx1Z2luLWF1dG9yZXNpemUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBFeHBvcnRzIHRoZSBcImF1dG9yZXNpemVcIiBwbHVnaW4gZm9yIHVzYWdlIHdpdGggbW9kdWxlIGxvYWRlcnNcbi8vIFVzYWdlOlxuLy8gICBDb21tb25KUzpcbi8vICAgICByZXF1aXJlKCd0aW55bWNlL3BsdWdpbnMvYXV0b3Jlc2l6ZScpXG4vLyAgIEVTMjAxNTpcbi8vICAgICBpbXBvcnQgJ3RpbnltY2UvcGx1Z2lucy9hdXRvcmVzaXplJ1xucmVxdWlyZSgnLi9wbHVnaW4uanMnKTsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqXG4gKiBWZXJzaW9uOiA1LjQuMiAoMjAyMC0wOC0xNylcbiAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgQ2VsbCA9IGZ1bmN0aW9uIChpbml0aWFsKSB7XG4gICAgICB2YXIgdmFsdWUgPSBpbml0aWFsO1xuICAgICAgdmFyIGdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfTtcbiAgICAgIHZhciBzZXQgPSBmdW5jdGlvbiAodikge1xuICAgICAgICB2YWx1ZSA9IHY7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0OiBnZXQsXG4gICAgICAgIHNldDogc2V0XG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgZ2xvYmFsID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuUGx1Z2luTWFuYWdlcicpO1xuXG4gICAgdmFyIGdsb2JhbCQxID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuRW52Jyk7XG5cbiAgICB2YXIgZ2xvYmFsJDIgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS51dGlsLkRlbGF5Jyk7XG5cbiAgICB2YXIgZmlyZVJlc2l6ZUVkaXRvciA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZmlyZSgnUmVzaXplRWRpdG9yJyk7XG4gICAgfTtcblxuICAgIHZhciBnZXRBdXRvUmVzaXplTWluSGVpZ2h0ID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnbWluX2hlaWdodCcsIGVkaXRvci5nZXRFbGVtZW50KCkub2Zmc2V0SGVpZ2h0LCAnbnVtYmVyJyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0QXV0b1Jlc2l6ZU1heEhlaWdodCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ21heF9oZWlnaHQnLCAwLCAnbnVtYmVyJyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0QXV0b1Jlc2l6ZU92ZXJmbG93UGFkZGluZyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2F1dG9yZXNpemVfb3ZlcmZsb3dfcGFkZGluZycsIDEsICdudW1iZXInKTtcbiAgICB9O1xuICAgIHZhciBnZXRBdXRvUmVzaXplQm90dG9tTWFyZ2luID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnYXV0b3Jlc2l6ZV9ib3R0b21fbWFyZ2luJywgNTAsICdudW1iZXInKTtcbiAgICB9O1xuICAgIHZhciBzaG91bGRBdXRvUmVzaXplT25Jbml0ID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnYXV0b3Jlc2l6ZV9vbl9pbml0JywgdHJ1ZSwgJ2Jvb2xlYW4nKTtcbiAgICB9O1xuXG4gICAgdmFyIGlzRnVsbHNjcmVlbiA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IucGx1Z2lucy5mdWxsc2NyZWVuICYmIGVkaXRvci5wbHVnaW5zLmZ1bGxzY3JlZW4uaXNGdWxsc2NyZWVuKCk7XG4gICAgfTtcbiAgICB2YXIgd2FpdCA9IGZ1bmN0aW9uIChlZGl0b3IsIG9sZFNpemUsIHRpbWVzLCBpbnRlcnZhbCwgY2FsbGJhY2spIHtcbiAgICAgIGdsb2JhbCQyLnNldEVkaXRvclRpbWVvdXQoZWRpdG9yLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlc2l6ZShlZGl0b3IsIG9sZFNpemUpO1xuICAgICAgICBpZiAodGltZXMtLSkge1xuICAgICAgICAgIHdhaXQoZWRpdG9yLCBvbGRTaXplLCB0aW1lcywgaW50ZXJ2YWwsIGNhbGxiYWNrKTtcbiAgICAgICAgfSBlbHNlIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIGludGVydmFsKTtcbiAgICB9O1xuICAgIHZhciB0b2dnbGVTY3JvbGxpbmcgPSBmdW5jdGlvbiAoZWRpdG9yLCBzdGF0ZSkge1xuICAgICAgdmFyIGJvZHkgPSBlZGl0b3IuZ2V0Qm9keSgpO1xuICAgICAgaWYgKGJvZHkpIHtcbiAgICAgICAgYm9keS5zdHlsZS5vdmVyZmxvd1kgPSBzdGF0ZSA/ICcnIDogJ2hpZGRlbic7XG4gICAgICAgIGlmICghc3RhdGUpIHtcbiAgICAgICAgICBib2R5LnNjcm9sbFRvcCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBwYXJzZUNzc1ZhbHVlVG9JbnQgPSBmdW5jdGlvbiAoZG9tLCBlbG0sIG5hbWUsIGNvbXB1dGVkKSB7XG4gICAgICB2YXIgdmFsdWUgPSBwYXJzZUludChkb20uZ2V0U3R5bGUoZWxtLCBuYW1lLCBjb21wdXRlZCksIDEwKTtcbiAgICAgIHJldHVybiBpc05hTih2YWx1ZSkgPyAwIDogdmFsdWU7XG4gICAgfTtcbiAgICB2YXIgcmVzaXplID0gZnVuY3Rpb24gKGVkaXRvciwgb2xkU2l6ZSkge1xuICAgICAgdmFyIGRvbSA9IGVkaXRvci5kb207XG4gICAgICB2YXIgZG9jID0gZWRpdG9yLmdldERvYygpO1xuICAgICAgaWYgKCFkb2MpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGlzRnVsbHNjcmVlbihlZGl0b3IpKSB7XG4gICAgICAgIHRvZ2dsZVNjcm9sbGluZyhlZGl0b3IsIHRydWUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgZG9jRWxlID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICAgIHZhciByZXNpemVCb3R0b21NYXJnaW4gPSBnZXRBdXRvUmVzaXplQm90dG9tTWFyZ2luKGVkaXRvcik7XG4gICAgICB2YXIgcmVzaXplSGVpZ2h0ID0gZ2V0QXV0b1Jlc2l6ZU1pbkhlaWdodChlZGl0b3IpO1xuICAgICAgdmFyIG1hcmdpblRvcCA9IHBhcnNlQ3NzVmFsdWVUb0ludChkb20sIGRvY0VsZSwgJ21hcmdpbi10b3AnLCB0cnVlKTtcbiAgICAgIHZhciBtYXJnaW5Cb3R0b20gPSBwYXJzZUNzc1ZhbHVlVG9JbnQoZG9tLCBkb2NFbGUsICdtYXJnaW4tYm90dG9tJywgdHJ1ZSk7XG4gICAgICB2YXIgY29udGVudEhlaWdodCA9IGRvY0VsZS5vZmZzZXRIZWlnaHQgKyBtYXJnaW5Ub3AgKyBtYXJnaW5Cb3R0b20gKyByZXNpemVCb3R0b21NYXJnaW47XG4gICAgICBpZiAoY29udGVudEhlaWdodCA8IDApIHtcbiAgICAgICAgY29udGVudEhlaWdodCA9IDA7XG4gICAgICB9XG4gICAgICB2YXIgY29udGFpbmVySGVpZ2h0ID0gZWRpdG9yLmdldENvbnRhaW5lcigpLm9mZnNldEhlaWdodDtcbiAgICAgIHZhciBjb250ZW50QXJlYUhlaWdodCA9IGVkaXRvci5nZXRDb250ZW50QXJlYUNvbnRhaW5lcigpLm9mZnNldEhlaWdodDtcbiAgICAgIHZhciBjaHJvbWVIZWlnaHQgPSBjb250YWluZXJIZWlnaHQgLSBjb250ZW50QXJlYUhlaWdodDtcbiAgICAgIGlmIChjb250ZW50SGVpZ2h0ICsgY2hyb21lSGVpZ2h0ID4gZ2V0QXV0b1Jlc2l6ZU1pbkhlaWdodChlZGl0b3IpKSB7XG4gICAgICAgIHJlc2l6ZUhlaWdodCA9IGNvbnRlbnRIZWlnaHQgKyBjaHJvbWVIZWlnaHQ7XG4gICAgICB9XG4gICAgICB2YXIgbWF4SGVpZ2h0ID0gZ2V0QXV0b1Jlc2l6ZU1heEhlaWdodChlZGl0b3IpO1xuICAgICAgaWYgKG1heEhlaWdodCAmJiByZXNpemVIZWlnaHQgPiBtYXhIZWlnaHQpIHtcbiAgICAgICAgcmVzaXplSGVpZ2h0ID0gbWF4SGVpZ2h0O1xuICAgICAgICB0b2dnbGVTY3JvbGxpbmcoZWRpdG9yLCB0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvZ2dsZVNjcm9sbGluZyhlZGl0b3IsIGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIGlmIChyZXNpemVIZWlnaHQgIT09IG9sZFNpemUuZ2V0KCkpIHtcbiAgICAgICAgdmFyIGRlbHRhU2l6ZSA9IHJlc2l6ZUhlaWdodCAtIG9sZFNpemUuZ2V0KCk7XG4gICAgICAgIGRvbS5zZXRTdHlsZShlZGl0b3IuZ2V0Q29udGFpbmVyKCksICdoZWlnaHQnLCByZXNpemVIZWlnaHQgKyAncHgnKTtcbiAgICAgICAgb2xkU2l6ZS5zZXQocmVzaXplSGVpZ2h0KTtcbiAgICAgICAgZmlyZVJlc2l6ZUVkaXRvcihlZGl0b3IpO1xuICAgICAgICBpZiAoZ2xvYmFsJDEuYnJvd3Nlci5pc1NhZmFyaSgpICYmIGdsb2JhbCQxLm1hYykge1xuICAgICAgICAgIHZhciB3aW4gPSBlZGl0b3IuZ2V0V2luKCk7XG4gICAgICAgICAgd2luLnNjcm9sbFRvKHdpbi5wYWdlWE9mZnNldCwgd2luLnBhZ2VZT2Zmc2V0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZWRpdG9yLmhhc0ZvY3VzKCkpIHtcbiAgICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLnNjcm9sbEludG9WaWV3KGVkaXRvci5zZWxlY3Rpb24uZ2V0Tm9kZSgpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ2xvYmFsJDEud2Via2l0ICYmIGRlbHRhU2l6ZSA8IDApIHtcbiAgICAgICAgICByZXNpemUoZWRpdG9yLCBvbGRTaXplKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHNldHVwID0gZnVuY3Rpb24gKGVkaXRvciwgb2xkU2l6ZSkge1xuICAgICAgZWRpdG9yLm9uKCdpbml0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3ZlcmZsb3dQYWRkaW5nID0gZ2V0QXV0b1Jlc2l6ZU92ZXJmbG93UGFkZGluZyhlZGl0b3IpO1xuICAgICAgICB2YXIgZG9tID0gZWRpdG9yLmRvbTtcbiAgICAgICAgZG9tLnNldFN0eWxlcyhlZGl0b3IuZ2V0RG9jKCkuZG9jdW1lbnRFbGVtZW50LCB7IGhlaWdodDogJ2F1dG8nIH0pO1xuICAgICAgICBkb20uc2V0U3R5bGVzKGVkaXRvci5nZXRCb2R5KCksIHtcbiAgICAgICAgICAncGFkZGluZ0xlZnQnOiBvdmVyZmxvd1BhZGRpbmcsXG4gICAgICAgICAgJ3BhZGRpbmdSaWdodCc6IG92ZXJmbG93UGFkZGluZyxcbiAgICAgICAgICAnbWluLWhlaWdodCc6IDBcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci5vbignTm9kZUNoYW5nZSBTZXRDb250ZW50IGtleXVwIEZ1bGxzY3JlZW5TdGF0ZUNoYW5nZWQgUmVzaXplQ29udGVudCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVzaXplKGVkaXRvciwgb2xkU2l6ZSk7XG4gICAgICB9KTtcbiAgICAgIGlmIChzaG91bGRBdXRvUmVzaXplT25Jbml0KGVkaXRvcikpIHtcbiAgICAgICAgZWRpdG9yLm9uKCdpbml0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHdhaXQoZWRpdG9yLCBvbGRTaXplLCAyMCwgMTAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3YWl0KGVkaXRvciwgb2xkU2l6ZSwgNSwgMTAwMCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgcmVnaXN0ZXIgPSBmdW5jdGlvbiAoZWRpdG9yLCBvbGRTaXplKSB7XG4gICAgICBlZGl0b3IuYWRkQ29tbWFuZCgnbWNlQXV0b1Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVzaXplKGVkaXRvciwgb2xkU2l6ZSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gUGx1Z2luICgpIHtcbiAgICAgIGdsb2JhbC5hZGQoJ2F1dG9yZXNpemUnLCBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIGlmICghZWRpdG9yLnNldHRpbmdzLmhhc093blByb3BlcnR5KCdyZXNpemUnKSkge1xuICAgICAgICAgIGVkaXRvci5zZXR0aW5ncy5yZXNpemUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWVkaXRvci5pbmxpbmUpIHtcbiAgICAgICAgICB2YXIgb2xkU2l6ZSA9IENlbGwoMCk7XG4gICAgICAgICAgcmVnaXN0ZXIoZWRpdG9yLCBvbGRTaXplKTtcbiAgICAgICAgICBzZXR1cChlZGl0b3IsIG9sZFNpemUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBQbHVnaW4oKTtcblxufSgpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=