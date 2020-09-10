(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-print-plugin"],{

/***/ "./node_modules/tinymce/plugins/print/plugin.js":
/*!******************************************************!*\
  !*** ./node_modules/tinymce/plugins/print/plugin.js ***!
  \******************************************************/
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

    var global$1 = tinymce.util.Tools.resolve('tinymce.Env');

    var register = function (editor) {
      editor.addCommand('mcePrint', function () {
        if (global$1.browser.isIE()) {
          editor.getDoc().execCommand('print', false, null);
        } else {
          editor.getWin().print();
        }
      });
    };

    var register$1 = function (editor) {
      editor.ui.registry.addButton('print', {
        icon: 'print',
        tooltip: 'Print',
        onAction: function () {
          return editor.execCommand('mcePrint');
        }
      });
      editor.ui.registry.addMenuItem('print', {
        text: 'Print...',
        icon: 'print',
        onAction: function () {
          return editor.execCommand('mcePrint');
        }
      });
    };

    function Plugin () {
      global.add('print', function (editor) {
        register(editor);
        register$1(editor);
        editor.addShortcut('Meta+P', '', 'mcePrint');
      });
    }

    Plugin();

}());


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL3ByaW50L3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBLENBQUMiLCJmaWxlIjoidGlueW1jZS1wbHVnaW4tcHJpbnQtcGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIFRpbnkgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTEdQTCBvciBhIGNvbW1lcmNpYWwgbGljZW5zZS5cbiAqIEZvciBMR1BMIHNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogRm9yIGNvbW1lcmNpYWwgbGljZW5zZXMgc2VlIGh0dHBzOi8vd3d3LnRpbnkuY2xvdWQvXG4gKlxuICogVmVyc2lvbjogNS40LjIgKDIwMjAtMDgtMTcpXG4gKi9cbihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIGdsb2JhbCA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLlBsdWdpbk1hbmFnZXInKTtcblxuICAgIHZhciBnbG9iYWwkMSA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLkVudicpO1xuXG4gICAgdmFyIHJlZ2lzdGVyID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgZWRpdG9yLmFkZENvbW1hbmQoJ21jZVByaW50JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoZ2xvYmFsJDEuYnJvd3Nlci5pc0lFKCkpIHtcbiAgICAgICAgICBlZGl0b3IuZ2V0RG9jKCkuZXhlY0NvbW1hbmQoJ3ByaW50JywgZmFsc2UsIG51bGwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVkaXRvci5nZXRXaW4oKS5wcmludCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHJlZ2lzdGVyJDEgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQnV0dG9uKCdwcmludCcsIHtcbiAgICAgICAgaWNvbjogJ3ByaW50JyxcbiAgICAgICAgdG9vbHRpcDogJ1ByaW50JyxcbiAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZWRpdG9yLmV4ZWNDb21tYW5kKCdtY2VQcmludCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRNZW51SXRlbSgncHJpbnQnLCB7XG4gICAgICAgIHRleHQ6ICdQcmludC4uLicsXG4gICAgICAgIGljb246ICdwcmludCcsXG4gICAgICAgIG9uQWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci5leGVjQ29tbWFuZCgnbWNlUHJpbnQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFBsdWdpbiAoKSB7XG4gICAgICBnbG9iYWwuYWRkKCdwcmludCcsIGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgICAgcmVnaXN0ZXIoZWRpdG9yKTtcbiAgICAgICAgcmVnaXN0ZXIkMShlZGl0b3IpO1xuICAgICAgICBlZGl0b3IuYWRkU2hvcnRjdXQoJ01ldGErUCcsICcnLCAnbWNlUHJpbnQnKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIFBsdWdpbigpO1xuXG59KCkpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==