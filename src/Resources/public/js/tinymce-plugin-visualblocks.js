(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-visualblocks"],{

/***/ "./node_modules/tinymce/plugins/visualblocks/index.js":
/*!************************************************************!*\
  !*** ./node_modules/tinymce/plugins/visualblocks/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Exports the "visualblocks" plugin for usage with module loaders
// Usage:
//   CommonJS:
//     require('tinymce/plugins/visualblocks')
//   ES2015:
//     import 'tinymce/plugins/visualblocks'
__webpack_require__(/*! ./plugin.js */ "./node_modules/tinymce/plugins/visualblocks/plugin.js");

/***/ }),

/***/ "./node_modules/tinymce/plugins/visualblocks/plugin.js":
/*!*************************************************************!*\
  !*** ./node_modules/tinymce/plugins/visualblocks/plugin.js ***!
  \*************************************************************/
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

    var fireVisualBlocks = function (editor, state) {
      editor.fire('VisualBlocks', { state: state });
    };

    var toggleVisualBlocks = function (editor, pluginUrl, enabledState) {
      var dom = editor.dom;
      dom.toggleClass(editor.getBody(), 'mce-visualblocks');
      enabledState.set(!enabledState.get());
      fireVisualBlocks(editor, enabledState.get());
    };

    var register = function (editor, pluginUrl, enabledState) {
      editor.addCommand('mceVisualBlocks', function () {
        toggleVisualBlocks(editor, pluginUrl, enabledState);
      });
    };

    var isEnabledByDefault = function (editor) {
      return editor.getParam('visualblocks_default_state', false, 'boolean');
    };

    var setup = function (editor, pluginUrl, enabledState) {
      editor.on('PreviewFormats AfterPreviewFormats', function (e) {
        if (enabledState.get()) {
          editor.dom.toggleClass(editor.getBody(), 'mce-visualblocks', e.type === 'afterpreviewformats');
        }
      });
      editor.on('init', function () {
        if (isEnabledByDefault(editor)) {
          toggleVisualBlocks(editor, pluginUrl, enabledState);
        }
      });
    };

    var toggleActiveState = function (editor, enabledState) {
      return function (api) {
        api.setActive(enabledState.get());
        var editorEventCallback = function (e) {
          return api.setActive(e.state);
        };
        editor.on('VisualBlocks', editorEventCallback);
        return function () {
          return editor.off('VisualBlocks', editorEventCallback);
        };
      };
    };
    var register$1 = function (editor, enabledState) {
      editor.ui.registry.addToggleButton('visualblocks', {
        icon: 'visualblocks',
        tooltip: 'Show blocks',
        onAction: function () {
          return editor.execCommand('mceVisualBlocks');
        },
        onSetup: toggleActiveState(editor, enabledState)
      });
      editor.ui.registry.addToggleMenuItem('visualblocks', {
        text: 'Show blocks',
        icon: 'visualblocks',
        onAction: function () {
          return editor.execCommand('mceVisualBlocks');
        },
        onSetup: toggleActiveState(editor, enabledState)
      });
    };

    function Plugin () {
      global.add('visualblocks', function (editor, pluginUrl) {
        var enabledState = Cell(false);
        register(editor, pluginUrl, enabledState);
        register$1(editor, enabledState);
        setup(editor, pluginUrl, enabledState);
      });
    }

    Plugin();

}());


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL3Zpc3VhbGJsb2Nrcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL3Zpc3VhbGJsb2Nrcy9wbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQU8sQ0FBQywwRUFBYSxFOzs7Ozs7Ozs7OztBQ05yQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLG1DQUFtQyxlQUFlO0FBQ2xEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBLENBQUMiLCJmaWxlIjoidGlueW1jZS1wbHVnaW4tdmlzdWFsYmxvY2tzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRXhwb3J0cyB0aGUgXCJ2aXN1YWxibG9ja3NcIiBwbHVnaW4gZm9yIHVzYWdlIHdpdGggbW9kdWxlIGxvYWRlcnNcbi8vIFVzYWdlOlxuLy8gICBDb21tb25KUzpcbi8vICAgICByZXF1aXJlKCd0aW55bWNlL3BsdWdpbnMvdmlzdWFsYmxvY2tzJylcbi8vICAgRVMyMDE1OlxuLy8gICAgIGltcG9ydCAndGlueW1jZS9wbHVnaW5zL3Zpc3VhbGJsb2NrcydcbnJlcXVpcmUoJy4vcGx1Z2luLmpzJyk7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIFRpbnkgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTEdQTCBvciBhIGNvbW1lcmNpYWwgbGljZW5zZS5cbiAqIEZvciBMR1BMIHNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogRm9yIGNvbW1lcmNpYWwgbGljZW5zZXMgc2VlIGh0dHBzOi8vd3d3LnRpbnkuY2xvdWQvXG4gKlxuICogVmVyc2lvbjogNS40LjIgKDIwMjAtMDgtMTcpXG4gKi9cbihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIENlbGwgPSBmdW5jdGlvbiAoaW5pdGlhbCkge1xuICAgICAgdmFyIHZhbHVlID0gaW5pdGlhbDtcbiAgICAgIHZhciBnZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG4gICAgICB2YXIgc2V0ID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdmFsdWUgPSB2O1xuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdldDogZ2V0LFxuICAgICAgICBzZXQ6IHNldFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIGdsb2JhbCA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLlBsdWdpbk1hbmFnZXInKTtcblxuICAgIHZhciBmaXJlVmlzdWFsQmxvY2tzID0gZnVuY3Rpb24gKGVkaXRvciwgc3RhdGUpIHtcbiAgICAgIGVkaXRvci5maXJlKCdWaXN1YWxCbG9ja3MnLCB7IHN0YXRlOiBzdGF0ZSB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHRvZ2dsZVZpc3VhbEJsb2NrcyA9IGZ1bmN0aW9uIChlZGl0b3IsIHBsdWdpblVybCwgZW5hYmxlZFN0YXRlKSB7XG4gICAgICB2YXIgZG9tID0gZWRpdG9yLmRvbTtcbiAgICAgIGRvbS50b2dnbGVDbGFzcyhlZGl0b3IuZ2V0Qm9keSgpLCAnbWNlLXZpc3VhbGJsb2NrcycpO1xuICAgICAgZW5hYmxlZFN0YXRlLnNldCghZW5hYmxlZFN0YXRlLmdldCgpKTtcbiAgICAgIGZpcmVWaXN1YWxCbG9ja3MoZWRpdG9yLCBlbmFibGVkU3RhdGUuZ2V0KCkpO1xuICAgIH07XG5cbiAgICB2YXIgcmVnaXN0ZXIgPSBmdW5jdGlvbiAoZWRpdG9yLCBwbHVnaW5VcmwsIGVuYWJsZWRTdGF0ZSkge1xuICAgICAgZWRpdG9yLmFkZENvbW1hbmQoJ21jZVZpc3VhbEJsb2NrcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdG9nZ2xlVmlzdWFsQmxvY2tzKGVkaXRvciwgcGx1Z2luVXJsLCBlbmFibGVkU3RhdGUpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBpc0VuYWJsZWRCeURlZmF1bHQgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCd2aXN1YWxibG9ja3NfZGVmYXVsdF9zdGF0ZScsIGZhbHNlLCAnYm9vbGVhbicpO1xuICAgIH07XG5cbiAgICB2YXIgc2V0dXAgPSBmdW5jdGlvbiAoZWRpdG9yLCBwbHVnaW5VcmwsIGVuYWJsZWRTdGF0ZSkge1xuICAgICAgZWRpdG9yLm9uKCdQcmV2aWV3Rm9ybWF0cyBBZnRlclByZXZpZXdGb3JtYXRzJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGVuYWJsZWRTdGF0ZS5nZXQoKSkge1xuICAgICAgICAgIGVkaXRvci5kb20udG9nZ2xlQ2xhc3MoZWRpdG9yLmdldEJvZHkoKSwgJ21jZS12aXN1YWxibG9ja3MnLCBlLnR5cGUgPT09ICdhZnRlcnByZXZpZXdmb3JtYXRzJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLm9uKCdpbml0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoaXNFbmFibGVkQnlEZWZhdWx0KGVkaXRvcikpIHtcbiAgICAgICAgICB0b2dnbGVWaXN1YWxCbG9ja3MoZWRpdG9yLCBwbHVnaW5VcmwsIGVuYWJsZWRTdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgdG9nZ2xlQWN0aXZlU3RhdGUgPSBmdW5jdGlvbiAoZWRpdG9yLCBlbmFibGVkU3RhdGUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYXBpKSB7XG4gICAgICAgIGFwaS5zZXRBY3RpdmUoZW5hYmxlZFN0YXRlLmdldCgpKTtcbiAgICAgICAgdmFyIGVkaXRvckV2ZW50Q2FsbGJhY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHJldHVybiBhcGkuc2V0QWN0aXZlKGUuc3RhdGUpO1xuICAgICAgICB9O1xuICAgICAgICBlZGl0b3Iub24oJ1Zpc3VhbEJsb2NrcycsIGVkaXRvckV2ZW50Q2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBlZGl0b3Iub2ZmKCdWaXN1YWxCbG9ja3MnLCBlZGl0b3JFdmVudENhbGxiYWNrKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgcmVnaXN0ZXIkMSA9IGZ1bmN0aW9uIChlZGl0b3IsIGVuYWJsZWRTdGF0ZSkge1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZFRvZ2dsZUJ1dHRvbigndmlzdWFsYmxvY2tzJywge1xuICAgICAgICBpY29uOiAndmlzdWFsYmxvY2tzJyxcbiAgICAgICAgdG9vbHRpcDogJ1Nob3cgYmxvY2tzJyxcbiAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZWRpdG9yLmV4ZWNDb21tYW5kKCdtY2VWaXN1YWxCbG9ja3MnKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TZXR1cDogdG9nZ2xlQWN0aXZlU3RhdGUoZWRpdG9yLCBlbmFibGVkU3RhdGUpXG4gICAgICB9KTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRUb2dnbGVNZW51SXRlbSgndmlzdWFsYmxvY2tzJywge1xuICAgICAgICB0ZXh0OiAnU2hvdyBibG9ja3MnLFxuICAgICAgICBpY29uOiAndmlzdWFsYmxvY2tzJyxcbiAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZWRpdG9yLmV4ZWNDb21tYW5kKCdtY2VWaXN1YWxCbG9ja3MnKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TZXR1cDogdG9nZ2xlQWN0aXZlU3RhdGUoZWRpdG9yLCBlbmFibGVkU3RhdGUpXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gUGx1Z2luICgpIHtcbiAgICAgIGdsb2JhbC5hZGQoJ3Zpc3VhbGJsb2NrcycsIGZ1bmN0aW9uIChlZGl0b3IsIHBsdWdpblVybCkge1xuICAgICAgICB2YXIgZW5hYmxlZFN0YXRlID0gQ2VsbChmYWxzZSk7XG4gICAgICAgIHJlZ2lzdGVyKGVkaXRvciwgcGx1Z2luVXJsLCBlbmFibGVkU3RhdGUpO1xuICAgICAgICByZWdpc3RlciQxKGVkaXRvciwgZW5hYmxlZFN0YXRlKTtcbiAgICAgICAgc2V0dXAoZWRpdG9yLCBwbHVnaW5VcmwsIGVuYWJsZWRTdGF0ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBQbHVnaW4oKTtcblxufSgpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=