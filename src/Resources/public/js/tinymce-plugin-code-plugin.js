(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-code-plugin"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2NvZGUvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLG9CQUFvQjtBQUNwRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixzQkFBc0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBLENBQUMiLCJmaWxlIjoidGlueW1jZS1wbHVnaW4tY29kZS1wbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqXG4gKiBWZXJzaW9uOiA1LjQuMiAoMjAyMC0wOC0xNylcbiAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgZ2xvYmFsID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuUGx1Z2luTWFuYWdlcicpO1xuXG4gICAgdmFyIHNldENvbnRlbnQgPSBmdW5jdGlvbiAoZWRpdG9yLCBodG1sKSB7XG4gICAgICBlZGl0b3IuZm9jdXMoKTtcbiAgICAgIGVkaXRvci51bmRvTWFuYWdlci50cmFuc2FjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGVkaXRvci5zZXRDb250ZW50KGh0bWwpO1xuICAgICAgfSk7XG4gICAgICBlZGl0b3Iuc2VsZWN0aW9uLnNldEN1cnNvckxvY2F0aW9uKCk7XG4gICAgICBlZGl0b3Iubm9kZUNoYW5nZWQoKTtcbiAgICB9O1xuICAgIHZhciBnZXRDb250ZW50ID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRDb250ZW50KHsgc291cmNlX3ZpZXc6IHRydWUgfSk7XG4gICAgfTtcblxuICAgIHZhciBvcGVuID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGVkaXRvckNvbnRlbnQgPSBnZXRDb250ZW50KGVkaXRvcik7XG4gICAgICBlZGl0b3Iud2luZG93TWFuYWdlci5vcGVuKHtcbiAgICAgICAgdGl0bGU6ICdTb3VyY2UgQ29kZScsXG4gICAgICAgIHNpemU6ICdsYXJnZScsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICB0eXBlOiAncGFuZWwnLFxuICAgICAgICAgIGl0ZW1zOiBbe1xuICAgICAgICAgICAgICB0eXBlOiAndGV4dGFyZWEnLFxuICAgICAgICAgICAgICBuYW1lOiAnY29kZSdcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sXG4gICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnY2FuY2VsJyxcbiAgICAgICAgICAgIG5hbWU6ICdjYW5jZWwnLFxuICAgICAgICAgICAgdGV4dDogJ0NhbmNlbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzdWJtaXQnLFxuICAgICAgICAgICAgbmFtZTogJ3NhdmUnLFxuICAgICAgICAgICAgdGV4dDogJ1NhdmUnLFxuICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgaW5pdGlhbERhdGE6IHsgY29kZTogZWRpdG9yQ29udGVudCB9LFxuICAgICAgICBvblN1Ym1pdDogZnVuY3Rpb24gKGFwaSkge1xuICAgICAgICAgIHNldENvbnRlbnQoZWRpdG9yLCBhcGkuZ2V0RGF0YSgpLmNvZGUpO1xuICAgICAgICAgIGFwaS5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHJlZ2lzdGVyID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgZWRpdG9yLmFkZENvbW1hbmQoJ21jZUNvZGVFZGl0b3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9wZW4oZWRpdG9yKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgcmVnaXN0ZXIkMSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRCdXR0b24oJ2NvZGUnLCB7XG4gICAgICAgIGljb246ICdzb3VyY2Vjb2RlJyxcbiAgICAgICAgdG9vbHRpcDogJ1NvdXJjZSBjb2RlJyxcbiAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gb3BlbihlZGl0b3IpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRNZW51SXRlbSgnY29kZScsIHtcbiAgICAgICAgaWNvbjogJ3NvdXJjZWNvZGUnLFxuICAgICAgICB0ZXh0OiAnU291cmNlIGNvZGUnLFxuICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBvcGVuKGVkaXRvcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBQbHVnaW4gKCkge1xuICAgICAgZ2xvYmFsLmFkZCgnY29kZScsIGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgICAgcmVnaXN0ZXIoZWRpdG9yKTtcbiAgICAgICAgcmVnaXN0ZXIkMShlZGl0b3IpO1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBQbHVnaW4oKTtcblxufSgpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=