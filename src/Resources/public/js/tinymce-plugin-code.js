(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-code"],{

/***/ "./node_modules/tinymce/plugins/code/index.js":
/*!****************************************************!*\
  !*** ./node_modules/tinymce/plugins/code/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Exports the "code" plugin for usage with module loaders
// Usage:
//   CommonJS:
//     require('tinymce/plugins/code')
//   ES2015:
//     import 'tinymce/plugins/code'
__webpack_require__(/*! ./plugin.js */ "./node_modules/tinymce/plugins/code/plugin.js");

/***/ }),

/***/ "./node_modules/tinymce/plugins/code/plugin.js":
/*!*****************************************************!*\
  !*** ./node_modules/tinymce/plugins/code/plugin.js ***!
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

    var setContent = function (editor, html) {
      editor.focus();
      editor.undoManager.transact(function () {
        editor.setContent(html);
      });
      editor.selection.setCursorLocation();
      editor.nodeChanged();
    };
    var getContent = function (editor) {
      return editor.getContent({ source_view: true });
    };

    var open = function (editor) {
      var editorContent = getContent(editor);
      editor.windowManager.open({
        title: 'Source Code',
        size: 'large',
        body: {
          type: 'panel',
          items: [{
              type: 'textarea',
              name: 'code'
            }]
        },
        buttons: [
          {
            type: 'cancel',
            name: 'cancel',
            text: 'Cancel'
          },
          {
            type: 'submit',
            name: 'save',
            text: 'Save',
            primary: true
          }
        ],
        initialData: { code: editorContent },
        onSubmit: function (api) {
          setContent(editor, api.getData().code);
          api.close();
        }
      });
    };

    var register = function (editor) {
      editor.addCommand('mceCodeEditor', function () {
        open(editor);
      });
    };

    var register$1 = function (editor) {
      editor.ui.registry.addButton('code', {
        icon: 'sourcecode',
        tooltip: 'Source code',
        onAction: function () {
          return open(editor);
        }
      });
      editor.ui.registry.addMenuItem('code', {
        icon: 'sourcecode',
        text: 'Source code',
        onAction: function () {
          return open(editor);
        }
      });
    };

    function Plugin () {
      global.add('code', function (editor) {
        register(editor);
        register$1(editor);
        return {};
      });
    }

    Plugin();

}());


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2NvZGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RpbnltY2UvcGx1Z2lucy9jb2RlL3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBTyxDQUFDLGtFQUFhLEU7Ozs7Ozs7Ozs7O0FDTnJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLG9CQUFvQjtBQUNwRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixzQkFBc0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBLENBQUMiLCJmaWxlIjoidGlueW1jZS1wbHVnaW4tY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEV4cG9ydHMgdGhlIFwiY29kZVwiIHBsdWdpbiBmb3IgdXNhZ2Ugd2l0aCBtb2R1bGUgbG9hZGVyc1xuLy8gVXNhZ2U6XG4vLyAgIENvbW1vbkpTOlxuLy8gICAgIHJlcXVpcmUoJ3RpbnltY2UvcGx1Z2lucy9jb2RlJylcbi8vICAgRVMyMDE1OlxuLy8gICAgIGltcG9ydCAndGlueW1jZS9wbHVnaW5zL2NvZGUnXG5yZXF1aXJlKCcuL3BsdWdpbi5qcycpOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICpcbiAqIFZlcnNpb246IDUuNC4yICgyMDIwLTA4LTE3KVxuICovXG4oZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBnbG9iYWwgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5QbHVnaW5NYW5hZ2VyJyk7XG5cbiAgICB2YXIgc2V0Q29udGVudCA9IGZ1bmN0aW9uIChlZGl0b3IsIGh0bWwpIHtcbiAgICAgIGVkaXRvci5mb2N1cygpO1xuICAgICAgZWRpdG9yLnVuZG9NYW5hZ2VyLnRyYW5zYWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZWRpdG9yLnNldENvbnRlbnQoaHRtbCk7XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci5zZWxlY3Rpb24uc2V0Q3Vyc29yTG9jYXRpb24oKTtcbiAgICAgIGVkaXRvci5ub2RlQ2hhbmdlZCgpO1xuICAgIH07XG4gICAgdmFyIGdldENvbnRlbnQgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldENvbnRlbnQoeyBzb3VyY2VfdmlldzogdHJ1ZSB9KTtcbiAgICB9O1xuXG4gICAgdmFyIG9wZW4gPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgZWRpdG9yQ29udGVudCA9IGdldENvbnRlbnQoZWRpdG9yKTtcbiAgICAgIGVkaXRvci53aW5kb3dNYW5hZ2VyLm9wZW4oe1xuICAgICAgICB0aXRsZTogJ1NvdXJjZSBDb2RlJyxcbiAgICAgICAgc2l6ZTogJ2xhcmdlJyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIHR5cGU6ICdwYW5lbCcsXG4gICAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICAgIHR5cGU6ICd0ZXh0YXJlYScsXG4gICAgICAgICAgICAgIG5hbWU6ICdjb2RlJ1xuICAgICAgICAgICAgfV1cbiAgICAgICAgfSxcbiAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdjYW5jZWwnLFxuICAgICAgICAgICAgbmFtZTogJ2NhbmNlbCcsXG4gICAgICAgICAgICB0ZXh0OiAnQ2FuY2VsJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3N1Ym1pdCcsXG4gICAgICAgICAgICBuYW1lOiAnc2F2ZScsXG4gICAgICAgICAgICB0ZXh0OiAnU2F2ZScsXG4gICAgICAgICAgICBwcmltYXJ5OiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBpbml0aWFsRGF0YTogeyBjb2RlOiBlZGl0b3JDb250ZW50IH0sXG4gICAgICAgIG9uU3VibWl0OiBmdW5jdGlvbiAoYXBpKSB7XG4gICAgICAgICAgc2V0Q29udGVudChlZGl0b3IsIGFwaS5nZXREYXRhKCkuY29kZSk7XG4gICAgICAgICAgYXBpLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgcmVnaXN0ZXIgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBlZGl0b3IuYWRkQ29tbWFuZCgnbWNlQ29kZUVkaXRvcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb3BlbihlZGl0b3IpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciByZWdpc3RlciQxID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZEJ1dHRvbignY29kZScsIHtcbiAgICAgICAgaWNvbjogJ3NvdXJjZWNvZGUnLFxuICAgICAgICB0b29sdGlwOiAnU291cmNlIGNvZGUnLFxuICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBvcGVuKGVkaXRvcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZE1lbnVJdGVtKCdjb2RlJywge1xuICAgICAgICBpY29uOiAnc291cmNlY29kZScsXG4gICAgICAgIHRleHQ6ICdTb3VyY2UgY29kZScsXG4gICAgICAgIG9uQWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIG9wZW4oZWRpdG9yKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFBsdWdpbiAoKSB7XG4gICAgICBnbG9iYWwuYWRkKCdjb2RlJywgZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICByZWdpc3RlcihlZGl0b3IpO1xuICAgICAgICByZWdpc3RlciQxKGVkaXRvcik7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIFBsdWdpbigpO1xuXG59KCkpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==