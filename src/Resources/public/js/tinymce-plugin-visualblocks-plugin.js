(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-visualblocks-plugin"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL3Zpc3VhbGJsb2Nrcy9wbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxtQ0FBbUMsZUFBZTtBQUNsRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTs7QUFFQSxDQUFDIiwiZmlsZSI6InRpbnltY2UtcGx1Z2luLXZpc3VhbGJsb2Nrcy1wbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqXG4gKiBWZXJzaW9uOiA1LjQuMiAoMjAyMC0wOC0xNylcbiAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgQ2VsbCA9IGZ1bmN0aW9uIChpbml0aWFsKSB7XG4gICAgICB2YXIgdmFsdWUgPSBpbml0aWFsO1xuICAgICAgdmFyIGdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfTtcbiAgICAgIHZhciBzZXQgPSBmdW5jdGlvbiAodikge1xuICAgICAgICB2YWx1ZSA9IHY7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0OiBnZXQsXG4gICAgICAgIHNldDogc2V0XG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgZ2xvYmFsID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuUGx1Z2luTWFuYWdlcicpO1xuXG4gICAgdmFyIGZpcmVWaXN1YWxCbG9ja3MgPSBmdW5jdGlvbiAoZWRpdG9yLCBzdGF0ZSkge1xuICAgICAgZWRpdG9yLmZpcmUoJ1Zpc3VhbEJsb2NrcycsIHsgc3RhdGU6IHN0YXRlIH0pO1xuICAgIH07XG5cbiAgICB2YXIgdG9nZ2xlVmlzdWFsQmxvY2tzID0gZnVuY3Rpb24gKGVkaXRvciwgcGx1Z2luVXJsLCBlbmFibGVkU3RhdGUpIHtcbiAgICAgIHZhciBkb20gPSBlZGl0b3IuZG9tO1xuICAgICAgZG9tLnRvZ2dsZUNsYXNzKGVkaXRvci5nZXRCb2R5KCksICdtY2UtdmlzdWFsYmxvY2tzJyk7XG4gICAgICBlbmFibGVkU3RhdGUuc2V0KCFlbmFibGVkU3RhdGUuZ2V0KCkpO1xuICAgICAgZmlyZVZpc3VhbEJsb2NrcyhlZGl0b3IsIGVuYWJsZWRTdGF0ZS5nZXQoKSk7XG4gICAgfTtcblxuICAgIHZhciByZWdpc3RlciA9IGZ1bmN0aW9uIChlZGl0b3IsIHBsdWdpblVybCwgZW5hYmxlZFN0YXRlKSB7XG4gICAgICBlZGl0b3IuYWRkQ29tbWFuZCgnbWNlVmlzdWFsQmxvY2tzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB0b2dnbGVWaXN1YWxCbG9ja3MoZWRpdG9yLCBwbHVnaW5VcmwsIGVuYWJsZWRTdGF0ZSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIGlzRW5hYmxlZEJ5RGVmYXVsdCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ3Zpc3VhbGJsb2Nrc19kZWZhdWx0X3N0YXRlJywgZmFsc2UsICdib29sZWFuJyk7XG4gICAgfTtcblxuICAgIHZhciBzZXR1cCA9IGZ1bmN0aW9uIChlZGl0b3IsIHBsdWdpblVybCwgZW5hYmxlZFN0YXRlKSB7XG4gICAgICBlZGl0b3Iub24oJ1ByZXZpZXdGb3JtYXRzIEFmdGVyUHJldmlld0Zvcm1hdHMnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoZW5hYmxlZFN0YXRlLmdldCgpKSB7XG4gICAgICAgICAgZWRpdG9yLmRvbS50b2dnbGVDbGFzcyhlZGl0b3IuZ2V0Qm9keSgpLCAnbWNlLXZpc3VhbGJsb2NrcycsIGUudHlwZSA9PT0gJ2FmdGVycHJldmlld2Zvcm1hdHMnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBlZGl0b3Iub24oJ2luaXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChpc0VuYWJsZWRCeURlZmF1bHQoZWRpdG9yKSkge1xuICAgICAgICAgIHRvZ2dsZVZpc3VhbEJsb2NrcyhlZGl0b3IsIHBsdWdpblVybCwgZW5hYmxlZFN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciB0b2dnbGVBY3RpdmVTdGF0ZSA9IGZ1bmN0aW9uIChlZGl0b3IsIGVuYWJsZWRTdGF0ZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhcGkpIHtcbiAgICAgICAgYXBpLnNldEFjdGl2ZShlbmFibGVkU3RhdGUuZ2V0KCkpO1xuICAgICAgICB2YXIgZWRpdG9yRXZlbnRDYWxsYmFjayA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgcmV0dXJuIGFwaS5zZXRBY3RpdmUoZS5zdGF0ZSk7XG4gICAgICAgIH07XG4gICAgICAgIGVkaXRvci5vbignVmlzdWFsQmxvY2tzJywgZWRpdG9yRXZlbnRDYWxsYmFjayk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci5vZmYoJ1Zpc3VhbEJsb2NrcycsIGVkaXRvckV2ZW50Q2FsbGJhY2spO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciByZWdpc3RlciQxID0gZnVuY3Rpb24gKGVkaXRvciwgZW5hYmxlZFN0YXRlKSB7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkVG9nZ2xlQnV0dG9uKCd2aXN1YWxibG9ja3MnLCB7XG4gICAgICAgIGljb246ICd2aXN1YWxibG9ja3MnLFxuICAgICAgICB0b29sdGlwOiAnU2hvdyBibG9ja3MnLFxuICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBlZGl0b3IuZXhlY0NvbW1hbmQoJ21jZVZpc3VhbEJsb2NrcycpO1xuICAgICAgICB9LFxuICAgICAgICBvblNldHVwOiB0b2dnbGVBY3RpdmVTdGF0ZShlZGl0b3IsIGVuYWJsZWRTdGF0ZSlcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZFRvZ2dsZU1lbnVJdGVtKCd2aXN1YWxibG9ja3MnLCB7XG4gICAgICAgIHRleHQ6ICdTaG93IGJsb2NrcycsXG4gICAgICAgIGljb246ICd2aXN1YWxibG9ja3MnLFxuICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBlZGl0b3IuZXhlY0NvbW1hbmQoJ21jZVZpc3VhbEJsb2NrcycpO1xuICAgICAgICB9LFxuICAgICAgICBvblNldHVwOiB0b2dnbGVBY3RpdmVTdGF0ZShlZGl0b3IsIGVuYWJsZWRTdGF0ZSlcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBQbHVnaW4gKCkge1xuICAgICAgZ2xvYmFsLmFkZCgndmlzdWFsYmxvY2tzJywgZnVuY3Rpb24gKGVkaXRvciwgcGx1Z2luVXJsKSB7XG4gICAgICAgIHZhciBlbmFibGVkU3RhdGUgPSBDZWxsKGZhbHNlKTtcbiAgICAgICAgcmVnaXN0ZXIoZWRpdG9yLCBwbHVnaW5VcmwsIGVuYWJsZWRTdGF0ZSk7XG4gICAgICAgIHJlZ2lzdGVyJDEoZWRpdG9yLCBlbmFibGVkU3RhdGUpO1xuICAgICAgICBzZXR1cChlZGl0b3IsIHBsdWdpblVybCwgZW5hYmxlZFN0YXRlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIFBsdWdpbigpO1xuXG59KCkpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==