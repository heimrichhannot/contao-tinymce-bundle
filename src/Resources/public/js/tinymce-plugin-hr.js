(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-hr"],{

/***/ "./node_modules/tinymce/plugins/hr/index.js":
/*!**************************************************!*\
  !*** ./node_modules/tinymce/plugins/hr/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Exports the "hr" plugin for usage with module loaders
// Usage:
//   CommonJS:
//     require('tinymce/plugins/hr')
//   ES2015:
//     import 'tinymce/plugins/hr'
__webpack_require__(/*! ./plugin.js */ "./node_modules/tinymce/plugins/hr/plugin.js");

/***/ }),

/***/ "./node_modules/tinymce/plugins/hr/plugin.js":
/*!***************************************************!*\
  !*** ./node_modules/tinymce/plugins/hr/plugin.js ***!
  \***************************************************/
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

    var register = function (editor) {
      editor.addCommand('InsertHorizontalRule', function () {
        editor.execCommand('mceInsertContent', false, '<hr />');
      });
    };

    var register$1 = function (editor) {
      editor.ui.registry.addButton('hr', {
        icon: 'horizontal-rule',
        tooltip: 'Horizontal line',
        onAction: function () {
          return editor.execCommand('InsertHorizontalRule');
        }
      });
      editor.ui.registry.addMenuItem('hr', {
        icon: 'horizontal-rule',
        text: 'Horizontal line',
        onAction: function () {
          return editor.execCommand('InsertHorizontalRule');
        }
      });
    };

    function Plugin () {
      global.add('hr', function (editor) {
        register(editor);
        register$1(editor);
      });
    }

    Plugin();

}());


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2hyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55bWNlL3BsdWdpbnMvaHIvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFPLENBQUMsZ0VBQWEsRTs7Ozs7Ozs7Ozs7QUNOckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTs7QUFFQSxDQUFDIiwiZmlsZSI6InRpbnltY2UtcGx1Z2luLWhyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRXhwb3J0cyB0aGUgXCJoclwiIHBsdWdpbiBmb3IgdXNhZ2Ugd2l0aCBtb2R1bGUgbG9hZGVyc1xuLy8gVXNhZ2U6XG4vLyAgIENvbW1vbkpTOlxuLy8gICAgIHJlcXVpcmUoJ3RpbnltY2UvcGx1Z2lucy9ocicpXG4vLyAgIEVTMjAxNTpcbi8vICAgICBpbXBvcnQgJ3RpbnltY2UvcGx1Z2lucy9ocidcbnJlcXVpcmUoJy4vcGx1Z2luLmpzJyk7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIFRpbnkgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTEdQTCBvciBhIGNvbW1lcmNpYWwgbGljZW5zZS5cbiAqIEZvciBMR1BMIHNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogRm9yIGNvbW1lcmNpYWwgbGljZW5zZXMgc2VlIGh0dHBzOi8vd3d3LnRpbnkuY2xvdWQvXG4gKlxuICogVmVyc2lvbjogNS40LjIgKDIwMjAtMDgtMTcpXG4gKi9cbihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIGdsb2JhbCA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLlBsdWdpbk1hbmFnZXInKTtcblxuICAgIHZhciByZWdpc3RlciA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIGVkaXRvci5hZGRDb21tYW5kKCdJbnNlcnRIb3Jpem9udGFsUnVsZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZWRpdG9yLmV4ZWNDb21tYW5kKCdtY2VJbnNlcnRDb250ZW50JywgZmFsc2UsICc8aHIgLz4nKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgcmVnaXN0ZXIkMSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRCdXR0b24oJ2hyJywge1xuICAgICAgICBpY29uOiAnaG9yaXpvbnRhbC1ydWxlJyxcbiAgICAgICAgdG9vbHRpcDogJ0hvcml6b250YWwgbGluZScsXG4gICAgICAgIG9uQWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci5leGVjQ29tbWFuZCgnSW5zZXJ0SG9yaXpvbnRhbFJ1bGUnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkTWVudUl0ZW0oJ2hyJywge1xuICAgICAgICBpY29uOiAnaG9yaXpvbnRhbC1ydWxlJyxcbiAgICAgICAgdGV4dDogJ0hvcml6b250YWwgbGluZScsXG4gICAgICAgIG9uQWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci5leGVjQ29tbWFuZCgnSW5zZXJ0SG9yaXpvbnRhbFJ1bGUnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFBsdWdpbiAoKSB7XG4gICAgICBnbG9iYWwuYWRkKCdocicsIGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgICAgcmVnaXN0ZXIoZWRpdG9yKTtcbiAgICAgICAgcmVnaXN0ZXIkMShlZGl0b3IpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgUGx1Z2luKCk7XG5cbn0oKSk7XG4iXSwic291cmNlUm9vdCI6IiJ9