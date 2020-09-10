(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-autoresize-plugin"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2F1dG9yZXNpemUvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsaUJBQWlCO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTs7QUFFQSxDQUFDIiwiZmlsZSI6InRpbnltY2UtcGx1Z2luLWF1dG9yZXNpemUtcGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIFRpbnkgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTEdQTCBvciBhIGNvbW1lcmNpYWwgbGljZW5zZS5cbiAqIEZvciBMR1BMIHNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogRm9yIGNvbW1lcmNpYWwgbGljZW5zZXMgc2VlIGh0dHBzOi8vd3d3LnRpbnkuY2xvdWQvXG4gKlxuICogVmVyc2lvbjogNS40LjIgKDIwMjAtMDgtMTcpXG4gKi9cbihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIENlbGwgPSBmdW5jdGlvbiAoaW5pdGlhbCkge1xuICAgICAgdmFyIHZhbHVlID0gaW5pdGlhbDtcbiAgICAgIHZhciBnZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG4gICAgICB2YXIgc2V0ID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdmFsdWUgPSB2O1xuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdldDogZ2V0LFxuICAgICAgICBzZXQ6IHNldFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIGdsb2JhbCA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLlBsdWdpbk1hbmFnZXInKTtcblxuICAgIHZhciBnbG9iYWwkMSA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLkVudicpO1xuXG4gICAgdmFyIGdsb2JhbCQyID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UudXRpbC5EZWxheScpO1xuXG4gICAgdmFyIGZpcmVSZXNpemVFZGl0b3IgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmZpcmUoJ1Jlc2l6ZUVkaXRvcicpO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0QXV0b1Jlc2l6ZU1pbkhlaWdodCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ21pbl9oZWlnaHQnLCBlZGl0b3IuZ2V0RWxlbWVudCgpLm9mZnNldEhlaWdodCwgJ251bWJlcicpO1xuICAgIH07XG4gICAgdmFyIGdldEF1dG9SZXNpemVNYXhIZWlnaHQgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdtYXhfaGVpZ2h0JywgMCwgJ251bWJlcicpO1xuICAgIH07XG4gICAgdmFyIGdldEF1dG9SZXNpemVPdmVyZmxvd1BhZGRpbmcgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdhdXRvcmVzaXplX292ZXJmbG93X3BhZGRpbmcnLCAxLCAnbnVtYmVyJyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0QXV0b1Jlc2l6ZUJvdHRvbU1hcmdpbiA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2F1dG9yZXNpemVfYm90dG9tX21hcmdpbicsIDUwLCAnbnVtYmVyJyk7XG4gICAgfTtcbiAgICB2YXIgc2hvdWxkQXV0b1Jlc2l6ZU9uSW5pdCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2F1dG9yZXNpemVfb25faW5pdCcsIHRydWUsICdib29sZWFuJyk7XG4gICAgfTtcblxuICAgIHZhciBpc0Z1bGxzY3JlZW4gPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLnBsdWdpbnMuZnVsbHNjcmVlbiAmJiBlZGl0b3IucGx1Z2lucy5mdWxsc2NyZWVuLmlzRnVsbHNjcmVlbigpO1xuICAgIH07XG4gICAgdmFyIHdhaXQgPSBmdW5jdGlvbiAoZWRpdG9yLCBvbGRTaXplLCB0aW1lcywgaW50ZXJ2YWwsIGNhbGxiYWNrKSB7XG4gICAgICBnbG9iYWwkMi5zZXRFZGl0b3JUaW1lb3V0KGVkaXRvciwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXNpemUoZWRpdG9yLCBvbGRTaXplKTtcbiAgICAgICAgaWYgKHRpbWVzLS0pIHtcbiAgICAgICAgICB3YWl0KGVkaXRvciwgb2xkU2l6ZSwgdGltZXMsIGludGVydmFsLCBjYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICB9LCBpbnRlcnZhbCk7XG4gICAgfTtcbiAgICB2YXIgdG9nZ2xlU2Nyb2xsaW5nID0gZnVuY3Rpb24gKGVkaXRvciwgc3RhdGUpIHtcbiAgICAgIHZhciBib2R5ID0gZWRpdG9yLmdldEJvZHkoKTtcbiAgICAgIGlmIChib2R5KSB7XG4gICAgICAgIGJvZHkuc3R5bGUub3ZlcmZsb3dZID0gc3RhdGUgPyAnJyA6ICdoaWRkZW4nO1xuICAgICAgICBpZiAoIXN0YXRlKSB7XG4gICAgICAgICAgYm9keS5zY3JvbGxUb3AgPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgcGFyc2VDc3NWYWx1ZVRvSW50ID0gZnVuY3Rpb24gKGRvbSwgZWxtLCBuYW1lLCBjb21wdXRlZCkge1xuICAgICAgdmFyIHZhbHVlID0gcGFyc2VJbnQoZG9tLmdldFN0eWxlKGVsbSwgbmFtZSwgY29tcHV0ZWQpLCAxMCk7XG4gICAgICByZXR1cm4gaXNOYU4odmFsdWUpID8gMCA6IHZhbHVlO1xuICAgIH07XG4gICAgdmFyIHJlc2l6ZSA9IGZ1bmN0aW9uIChlZGl0b3IsIG9sZFNpemUpIHtcbiAgICAgIHZhciBkb20gPSBlZGl0b3IuZG9tO1xuICAgICAgdmFyIGRvYyA9IGVkaXRvci5nZXREb2MoKTtcbiAgICAgIGlmICghZG9jKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChpc0Z1bGxzY3JlZW4oZWRpdG9yKSkge1xuICAgICAgICB0b2dnbGVTY3JvbGxpbmcoZWRpdG9yLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGRvY0VsZSA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICB2YXIgcmVzaXplQm90dG9tTWFyZ2luID0gZ2V0QXV0b1Jlc2l6ZUJvdHRvbU1hcmdpbihlZGl0b3IpO1xuICAgICAgdmFyIHJlc2l6ZUhlaWdodCA9IGdldEF1dG9SZXNpemVNaW5IZWlnaHQoZWRpdG9yKTtcbiAgICAgIHZhciBtYXJnaW5Ub3AgPSBwYXJzZUNzc1ZhbHVlVG9JbnQoZG9tLCBkb2NFbGUsICdtYXJnaW4tdG9wJywgdHJ1ZSk7XG4gICAgICB2YXIgbWFyZ2luQm90dG9tID0gcGFyc2VDc3NWYWx1ZVRvSW50KGRvbSwgZG9jRWxlLCAnbWFyZ2luLWJvdHRvbScsIHRydWUpO1xuICAgICAgdmFyIGNvbnRlbnRIZWlnaHQgPSBkb2NFbGUub2Zmc2V0SGVpZ2h0ICsgbWFyZ2luVG9wICsgbWFyZ2luQm90dG9tICsgcmVzaXplQm90dG9tTWFyZ2luO1xuICAgICAgaWYgKGNvbnRlbnRIZWlnaHQgPCAwKSB7XG4gICAgICAgIGNvbnRlbnRIZWlnaHQgPSAwO1xuICAgICAgfVxuICAgICAgdmFyIGNvbnRhaW5lckhlaWdodCA9IGVkaXRvci5nZXRDb250YWluZXIoKS5vZmZzZXRIZWlnaHQ7XG4gICAgICB2YXIgY29udGVudEFyZWFIZWlnaHQgPSBlZGl0b3IuZ2V0Q29udGVudEFyZWFDb250YWluZXIoKS5vZmZzZXRIZWlnaHQ7XG4gICAgICB2YXIgY2hyb21lSGVpZ2h0ID0gY29udGFpbmVySGVpZ2h0IC0gY29udGVudEFyZWFIZWlnaHQ7XG4gICAgICBpZiAoY29udGVudEhlaWdodCArIGNocm9tZUhlaWdodCA+IGdldEF1dG9SZXNpemVNaW5IZWlnaHQoZWRpdG9yKSkge1xuICAgICAgICByZXNpemVIZWlnaHQgPSBjb250ZW50SGVpZ2h0ICsgY2hyb21lSGVpZ2h0O1xuICAgICAgfVxuICAgICAgdmFyIG1heEhlaWdodCA9IGdldEF1dG9SZXNpemVNYXhIZWlnaHQoZWRpdG9yKTtcbiAgICAgIGlmIChtYXhIZWlnaHQgJiYgcmVzaXplSGVpZ2h0ID4gbWF4SGVpZ2h0KSB7XG4gICAgICAgIHJlc2l6ZUhlaWdodCA9IG1heEhlaWdodDtcbiAgICAgICAgdG9nZ2xlU2Nyb2xsaW5nKGVkaXRvciwgdHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b2dnbGVTY3JvbGxpbmcoZWRpdG9yLCBmYWxzZSk7XG4gICAgICB9XG4gICAgICBpZiAocmVzaXplSGVpZ2h0ICE9PSBvbGRTaXplLmdldCgpKSB7XG4gICAgICAgIHZhciBkZWx0YVNpemUgPSByZXNpemVIZWlnaHQgLSBvbGRTaXplLmdldCgpO1xuICAgICAgICBkb20uc2V0U3R5bGUoZWRpdG9yLmdldENvbnRhaW5lcigpLCAnaGVpZ2h0JywgcmVzaXplSGVpZ2h0ICsgJ3B4Jyk7XG4gICAgICAgIG9sZFNpemUuc2V0KHJlc2l6ZUhlaWdodCk7XG4gICAgICAgIGZpcmVSZXNpemVFZGl0b3IoZWRpdG9yKTtcbiAgICAgICAgaWYgKGdsb2JhbCQxLmJyb3dzZXIuaXNTYWZhcmkoKSAmJiBnbG9iYWwkMS5tYWMpIHtcbiAgICAgICAgICB2YXIgd2luID0gZWRpdG9yLmdldFdpbigpO1xuICAgICAgICAgIHdpbi5zY3JvbGxUbyh3aW4ucGFnZVhPZmZzZXQsIHdpbi5wYWdlWU9mZnNldCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVkaXRvci5oYXNGb2N1cygpKSB7XG4gICAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5zY3JvbGxJbnRvVmlldyhlZGl0b3Iuc2VsZWN0aW9uLmdldE5vZGUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdsb2JhbCQxLndlYmtpdCAmJiBkZWx0YVNpemUgPCAwKSB7XG4gICAgICAgICAgcmVzaXplKGVkaXRvciwgb2xkU2l6ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBzZXR1cCA9IGZ1bmN0aW9uIChlZGl0b3IsIG9sZFNpemUpIHtcbiAgICAgIGVkaXRvci5vbignaW5pdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG92ZXJmbG93UGFkZGluZyA9IGdldEF1dG9SZXNpemVPdmVyZmxvd1BhZGRpbmcoZWRpdG9yKTtcbiAgICAgICAgdmFyIGRvbSA9IGVkaXRvci5kb207XG4gICAgICAgIGRvbS5zZXRTdHlsZXMoZWRpdG9yLmdldERvYygpLmRvY3VtZW50RWxlbWVudCwgeyBoZWlnaHQ6ICdhdXRvJyB9KTtcbiAgICAgICAgZG9tLnNldFN0eWxlcyhlZGl0b3IuZ2V0Qm9keSgpLCB7XG4gICAgICAgICAgJ3BhZGRpbmdMZWZ0Jzogb3ZlcmZsb3dQYWRkaW5nLFxuICAgICAgICAgICdwYWRkaW5nUmlnaHQnOiBvdmVyZmxvd1BhZGRpbmcsXG4gICAgICAgICAgJ21pbi1oZWlnaHQnOiAwXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBlZGl0b3Iub24oJ05vZGVDaGFuZ2UgU2V0Q29udGVudCBrZXl1cCBGdWxsc2NyZWVuU3RhdGVDaGFuZ2VkIFJlc2l6ZUNvbnRlbnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlc2l6ZShlZGl0b3IsIG9sZFNpemUpO1xuICAgICAgfSk7XG4gICAgICBpZiAoc2hvdWxkQXV0b1Jlc2l6ZU9uSW5pdChlZGl0b3IpKSB7XG4gICAgICAgIGVkaXRvci5vbignaW5pdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB3YWl0KGVkaXRvciwgb2xkU2l6ZSwgMjAsIDEwMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgd2FpdChlZGl0b3IsIG9sZFNpemUsIDUsIDEwMDApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIHJlZ2lzdGVyID0gZnVuY3Rpb24gKGVkaXRvciwgb2xkU2l6ZSkge1xuICAgICAgZWRpdG9yLmFkZENvbW1hbmQoJ21jZUF1dG9SZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlc2l6ZShlZGl0b3IsIG9sZFNpemUpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFBsdWdpbiAoKSB7XG4gICAgICBnbG9iYWwuYWRkKCdhdXRvcmVzaXplJywgZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICBpZiAoIWVkaXRvci5zZXR0aW5ncy5oYXNPd25Qcm9wZXJ0eSgncmVzaXplJykpIHtcbiAgICAgICAgICBlZGl0b3Iuc2V0dGluZ3MucmVzaXplID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFlZGl0b3IuaW5saW5lKSB7XG4gICAgICAgICAgdmFyIG9sZFNpemUgPSBDZWxsKDApO1xuICAgICAgICAgIHJlZ2lzdGVyKGVkaXRvciwgb2xkU2l6ZSk7XG4gICAgICAgICAgc2V0dXAoZWRpdG9yLCBvbGRTaXplKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgUGx1Z2luKCk7XG5cbn0oKSk7XG4iXSwic291cmNlUm9vdCI6IiJ9