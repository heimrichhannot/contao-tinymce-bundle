(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-save"],{

/***/ "./node_modules/tinymce/plugins/save/index.js":
/*!****************************************************!*\
  !*** ./node_modules/tinymce/plugins/save/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Exports the "save" plugin for usage with module loaders
// Usage:
//   CommonJS:
//     require('tinymce/plugins/save')
//   ES2015:
//     import 'tinymce/plugins/save'
__webpack_require__(/*! ./plugin.js */ "./node_modules/tinymce/plugins/save/plugin.js");

/***/ }),

/***/ "./node_modules/tinymce/plugins/save/plugin.js":
/*!*****************************************************!*\
  !*** ./node_modules/tinymce/plugins/save/plugin.js ***!
  \*****************************************************/
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

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var enableWhenDirty = function (editor) {
      return editor.getParam('save_enablewhendirty', true);
    };
    var hasOnSaveCallback = function (editor) {
      return !!editor.getParam('save_onsavecallback');
    };
    var hasOnCancelCallback = function (editor) {
      return !!editor.getParam('save_oncancelcallback');
    };

    var displayErrorMessage = function (editor, message) {
      editor.notificationManager.open({
        text: message,
        type: 'error'
      });
    };
    var save = function (editor) {
      var formObj = global$1.DOM.getParent(editor.id, 'form');
      if (enableWhenDirty(editor) && !editor.isDirty()) {
        return;
      }
      editor.save();
      if (hasOnSaveCallback(editor)) {
        editor.execCallback('save_onsavecallback', editor);
        editor.nodeChanged();
        return;
      }
      if (formObj) {
        editor.setDirty(false);
        if (!formObj.onsubmit || formObj.onsubmit()) {
          if (typeof formObj.submit === 'function') {
            formObj.submit();
          } else {
            displayErrorMessage(editor, 'Error: Form submit field collision.');
          }
        }
        editor.nodeChanged();
      } else {
        displayErrorMessage(editor, 'Error: No form element found.');
      }
    };
    var cancel = function (editor) {
      var h = global$2.trim(editor.startContent);
      if (hasOnCancelCallback(editor)) {
        editor.execCallback('save_oncancelcallback', editor);
        return;
      }
      editor.resetContent(h);
    };

    var register = function (editor) {
      editor.addCommand('mceSave', function () {
        save(editor);
      });
      editor.addCommand('mceCancel', function () {
        cancel(editor);
      });
    };

    var stateToggle = function (editor) {
      return function (api) {
        var handler = function () {
          api.setDisabled(enableWhenDirty(editor) && !editor.isDirty());
        };
        editor.on('NodeChange dirty', handler);
        return function () {
          return editor.off('NodeChange dirty', handler);
        };
      };
    };
    var register$1 = function (editor) {
      editor.ui.registry.addButton('save', {
        icon: 'save',
        tooltip: 'Save',
        disabled: true,
        onAction: function () {
          return editor.execCommand('mceSave');
        },
        onSetup: stateToggle(editor)
      });
      editor.ui.registry.addButton('cancel', {
        icon: 'cancel',
        tooltip: 'Cancel',
        disabled: true,
        onAction: function () {
          return editor.execCommand('mceCancel');
        },
        onSetup: stateToggle(editor)
      });
      editor.addShortcut('Meta+S', '', 'mceSave');
    };

    function Plugin () {
      global.add('save', function (editor) {
        register$1(editor);
        register(editor);
      });
    }

    Plugin();

}());


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL3NhdmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RpbnltY2UvcGx1Z2lucy9zYXZlL3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBTyxDQUFDLGtFQUFhLEU7Ozs7Ozs7Ozs7O0FDTnJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBLENBQUMiLCJmaWxlIjoidGlueW1jZS1wbHVnaW4tc2F2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEV4cG9ydHMgdGhlIFwic2F2ZVwiIHBsdWdpbiBmb3IgdXNhZ2Ugd2l0aCBtb2R1bGUgbG9hZGVyc1xuLy8gVXNhZ2U6XG4vLyAgIENvbW1vbkpTOlxuLy8gICAgIHJlcXVpcmUoJ3RpbnltY2UvcGx1Z2lucy9zYXZlJylcbi8vICAgRVMyMDE1OlxuLy8gICAgIGltcG9ydCAndGlueW1jZS9wbHVnaW5zL3NhdmUnXG5yZXF1aXJlKCcuL3BsdWdpbi5qcycpOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICpcbiAqIFZlcnNpb246IDUuNC4yICgyMDIwLTA4LTE3KVxuICovXG4oZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBnbG9iYWwgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5QbHVnaW5NYW5hZ2VyJyk7XG5cbiAgICB2YXIgZ2xvYmFsJDEgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5kb20uRE9NVXRpbHMnKTtcblxuICAgIHZhciBnbG9iYWwkMiA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuVG9vbHMnKTtcblxuICAgIHZhciBlbmFibGVXaGVuRGlydHkgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdzYXZlX2VuYWJsZXdoZW5kaXJ0eScsIHRydWUpO1xuICAgIH07XG4gICAgdmFyIGhhc09uU2F2ZUNhbGxiYWNrID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuICEhZWRpdG9yLmdldFBhcmFtKCdzYXZlX29uc2F2ZWNhbGxiYWNrJyk7XG4gICAgfTtcbiAgICB2YXIgaGFzT25DYW5jZWxDYWxsYmFjayA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiAhIWVkaXRvci5nZXRQYXJhbSgnc2F2ZV9vbmNhbmNlbGNhbGxiYWNrJyk7XG4gICAgfTtcblxuICAgIHZhciBkaXNwbGF5RXJyb3JNZXNzYWdlID0gZnVuY3Rpb24gKGVkaXRvciwgbWVzc2FnZSkge1xuICAgICAgZWRpdG9yLm5vdGlmaWNhdGlvbk1hbmFnZXIub3Blbih7XG4gICAgICAgIHRleHQ6IG1lc3NhZ2UsXG4gICAgICAgIHR5cGU6ICdlcnJvcidcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHNhdmUgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgZm9ybU9iaiA9IGdsb2JhbCQxLkRPTS5nZXRQYXJlbnQoZWRpdG9yLmlkLCAnZm9ybScpO1xuICAgICAgaWYgKGVuYWJsZVdoZW5EaXJ0eShlZGl0b3IpICYmICFlZGl0b3IuaXNEaXJ0eSgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGVkaXRvci5zYXZlKCk7XG4gICAgICBpZiAoaGFzT25TYXZlQ2FsbGJhY2soZWRpdG9yKSkge1xuICAgICAgICBlZGl0b3IuZXhlY0NhbGxiYWNrKCdzYXZlX29uc2F2ZWNhbGxiYWNrJywgZWRpdG9yKTtcbiAgICAgICAgZWRpdG9yLm5vZGVDaGFuZ2VkKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChmb3JtT2JqKSB7XG4gICAgICAgIGVkaXRvci5zZXREaXJ0eShmYWxzZSk7XG4gICAgICAgIGlmICghZm9ybU9iai5vbnN1Ym1pdCB8fCBmb3JtT2JqLm9uc3VibWl0KCkpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGZvcm1PYmouc3VibWl0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBmb3JtT2JqLnN1Ym1pdCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkaXNwbGF5RXJyb3JNZXNzYWdlKGVkaXRvciwgJ0Vycm9yOiBGb3JtIHN1Ym1pdCBmaWVsZCBjb2xsaXNpb24uJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVkaXRvci5ub2RlQ2hhbmdlZCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGxheUVycm9yTWVzc2FnZShlZGl0b3IsICdFcnJvcjogTm8gZm9ybSBlbGVtZW50IGZvdW5kLicpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGNhbmNlbCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBoID0gZ2xvYmFsJDIudHJpbShlZGl0b3Iuc3RhcnRDb250ZW50KTtcbiAgICAgIGlmIChoYXNPbkNhbmNlbENhbGxiYWNrKGVkaXRvcikpIHtcbiAgICAgICAgZWRpdG9yLmV4ZWNDYWxsYmFjaygnc2F2ZV9vbmNhbmNlbGNhbGxiYWNrJywgZWRpdG9yKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZWRpdG9yLnJlc2V0Q29udGVudChoKTtcbiAgICB9O1xuXG4gICAgdmFyIHJlZ2lzdGVyID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgZWRpdG9yLmFkZENvbW1hbmQoJ21jZVNhdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNhdmUoZWRpdG9yKTtcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLmFkZENvbW1hbmQoJ21jZUNhbmNlbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FuY2VsKGVkaXRvcik7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHN0YXRlVG9nZ2xlID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhcGkpIHtcbiAgICAgICAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgYXBpLnNldERpc2FibGVkKGVuYWJsZVdoZW5EaXJ0eShlZGl0b3IpICYmICFlZGl0b3IuaXNEaXJ0eSgpKTtcbiAgICAgICAgfTtcbiAgICAgICAgZWRpdG9yLm9uKCdOb2RlQ2hhbmdlIGRpcnR5JywgaGFuZGxlcik7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci5vZmYoJ05vZGVDaGFuZ2UgZGlydHknLCBoYW5kbGVyKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgcmVnaXN0ZXIkMSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRCdXR0b24oJ3NhdmUnLCB7XG4gICAgICAgIGljb246ICdzYXZlJyxcbiAgICAgICAgdG9vbHRpcDogJ1NhdmUnLFxuICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZWRpdG9yLmV4ZWNDb21tYW5kKCdtY2VTYXZlJyk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uU2V0dXA6IHN0YXRlVG9nZ2xlKGVkaXRvcilcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZEJ1dHRvbignY2FuY2VsJywge1xuICAgICAgICBpY29uOiAnY2FuY2VsJyxcbiAgICAgICAgdG9vbHRpcDogJ0NhbmNlbCcsXG4gICAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBlZGl0b3IuZXhlY0NvbW1hbmQoJ21jZUNhbmNlbCcpO1xuICAgICAgICB9LFxuICAgICAgICBvblNldHVwOiBzdGF0ZVRvZ2dsZShlZGl0b3IpXG4gICAgICB9KTtcbiAgICAgIGVkaXRvci5hZGRTaG9ydGN1dCgnTWV0YStTJywgJycsICdtY2VTYXZlJyk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFBsdWdpbiAoKSB7XG4gICAgICBnbG9iYWwuYWRkKCdzYXZlJywgZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICByZWdpc3RlciQxKGVkaXRvcik7XG4gICAgICAgIHJlZ2lzdGVyKGVkaXRvcik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBQbHVnaW4oKTtcblxufSgpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=