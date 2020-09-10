(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-save-plugin"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL3NhdmUvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBLENBQUMiLCJmaWxlIjoidGlueW1jZS1wbHVnaW4tc2F2ZS1wbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqXG4gKiBWZXJzaW9uOiA1LjQuMiAoMjAyMC0wOC0xNylcbiAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgZ2xvYmFsID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuUGx1Z2luTWFuYWdlcicpO1xuXG4gICAgdmFyIGdsb2JhbCQxID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuZG9tLkRPTVV0aWxzJyk7XG5cbiAgICB2YXIgZ2xvYmFsJDIgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS51dGlsLlRvb2xzJyk7XG5cbiAgICB2YXIgZW5hYmxlV2hlbkRpcnR5ID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnc2F2ZV9lbmFibGV3aGVuZGlydHknLCB0cnVlKTtcbiAgICB9O1xuICAgIHZhciBoYXNPblNhdmVDYWxsYmFjayA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiAhIWVkaXRvci5nZXRQYXJhbSgnc2F2ZV9vbnNhdmVjYWxsYmFjaycpO1xuICAgIH07XG4gICAgdmFyIGhhc09uQ2FuY2VsQ2FsbGJhY2sgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gISFlZGl0b3IuZ2V0UGFyYW0oJ3NhdmVfb25jYW5jZWxjYWxsYmFjaycpO1xuICAgIH07XG5cbiAgICB2YXIgZGlzcGxheUVycm9yTWVzc2FnZSA9IGZ1bmN0aW9uIChlZGl0b3IsIG1lc3NhZ2UpIHtcbiAgICAgIGVkaXRvci5ub3RpZmljYXRpb25NYW5hZ2VyLm9wZW4oe1xuICAgICAgICB0ZXh0OiBtZXNzYWdlLFxuICAgICAgICB0eXBlOiAnZXJyb3InXG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBzYXZlID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGZvcm1PYmogPSBnbG9iYWwkMS5ET00uZ2V0UGFyZW50KGVkaXRvci5pZCwgJ2Zvcm0nKTtcbiAgICAgIGlmIChlbmFibGVXaGVuRGlydHkoZWRpdG9yKSAmJiAhZWRpdG9yLmlzRGlydHkoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBlZGl0b3Iuc2F2ZSgpO1xuICAgICAgaWYgKGhhc09uU2F2ZUNhbGxiYWNrKGVkaXRvcikpIHtcbiAgICAgICAgZWRpdG9yLmV4ZWNDYWxsYmFjaygnc2F2ZV9vbnNhdmVjYWxsYmFjaycsIGVkaXRvcik7XG4gICAgICAgIGVkaXRvci5ub2RlQ2hhbmdlZCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZm9ybU9iaikge1xuICAgICAgICBlZGl0b3Iuc2V0RGlydHkoZmFsc2UpO1xuICAgICAgICBpZiAoIWZvcm1PYmoub25zdWJtaXQgfHwgZm9ybU9iai5vbnN1Ym1pdCgpKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBmb3JtT2JqLnN1Ym1pdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZm9ybU9iai5zdWJtaXQoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGlzcGxheUVycm9yTWVzc2FnZShlZGl0b3IsICdFcnJvcjogRm9ybSBzdWJtaXQgZmllbGQgY29sbGlzaW9uLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlZGl0b3Iubm9kZUNoYW5nZWQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BsYXlFcnJvck1lc3NhZ2UoZWRpdG9yLCAnRXJyb3I6IE5vIGZvcm0gZWxlbWVudCBmb3VuZC4nKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBjYW5jZWwgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgaCA9IGdsb2JhbCQyLnRyaW0oZWRpdG9yLnN0YXJ0Q29udGVudCk7XG4gICAgICBpZiAoaGFzT25DYW5jZWxDYWxsYmFjayhlZGl0b3IpKSB7XG4gICAgICAgIGVkaXRvci5leGVjQ2FsbGJhY2soJ3NhdmVfb25jYW5jZWxjYWxsYmFjaycsIGVkaXRvcik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGVkaXRvci5yZXNldENvbnRlbnQoaCk7XG4gICAgfTtcblxuICAgIHZhciByZWdpc3RlciA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIGVkaXRvci5hZGRDb21tYW5kKCdtY2VTYXZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzYXZlKGVkaXRvcik7XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci5hZGRDb21tYW5kKCdtY2VDYW5jZWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbmNlbChlZGl0b3IpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBzdGF0ZVRvZ2dsZSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYXBpKSB7XG4gICAgICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGFwaS5zZXREaXNhYmxlZChlbmFibGVXaGVuRGlydHkoZWRpdG9yKSAmJiAhZWRpdG9yLmlzRGlydHkoKSk7XG4gICAgICAgIH07XG4gICAgICAgIGVkaXRvci5vbignTm9kZUNoYW5nZSBkaXJ0eScsIGhhbmRsZXIpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBlZGl0b3Iub2ZmKCdOb2RlQ2hhbmdlIGRpcnR5JywgaGFuZGxlcik7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHJlZ2lzdGVyJDEgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQnV0dG9uKCdzYXZlJywge1xuICAgICAgICBpY29uOiAnc2F2ZScsXG4gICAgICAgIHRvb2x0aXA6ICdTYXZlJyxcbiAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgIG9uQWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci5leGVjQ29tbWFuZCgnbWNlU2F2ZScpO1xuICAgICAgICB9LFxuICAgICAgICBvblNldHVwOiBzdGF0ZVRvZ2dsZShlZGl0b3IpXG4gICAgICB9KTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRCdXR0b24oJ2NhbmNlbCcsIHtcbiAgICAgICAgaWNvbjogJ2NhbmNlbCcsXG4gICAgICAgIHRvb2x0aXA6ICdDYW5jZWwnLFxuICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZWRpdG9yLmV4ZWNDb21tYW5kKCdtY2VDYW5jZWwnKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TZXR1cDogc3RhdGVUb2dnbGUoZWRpdG9yKVxuICAgICAgfSk7XG4gICAgICBlZGl0b3IuYWRkU2hvcnRjdXQoJ01ldGErUycsICcnLCAnbWNlU2F2ZScpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBQbHVnaW4gKCkge1xuICAgICAgZ2xvYmFsLmFkZCgnc2F2ZScsIGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgICAgcmVnaXN0ZXIkMShlZGl0b3IpO1xuICAgICAgICByZWdpc3RlcihlZGl0b3IpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgUGx1Z2luKCk7XG5cbn0oKSk7XG4iXSwic291cmNlUm9vdCI6IiJ9