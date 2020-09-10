(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-contextmenu"],{

/***/ "./node_modules/tinymce/plugins/contextmenu/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/tinymce/plugins/contextmenu/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Exports the "contextmenu" plugin for usage with module loaders
// Usage:
//   CommonJS:
//     require('tinymce/plugins/contextmenu')
//   ES2015:
//     import 'tinymce/plugins/contextmenu'
__webpack_require__(/*! ./plugin.js */ "./node_modules/tinymce/plugins/contextmenu/plugin.js");

/***/ }),

/***/ "./node_modules/tinymce/plugins/contextmenu/plugin.js":
/*!************************************************************!*\
  !*** ./node_modules/tinymce/plugins/contextmenu/plugin.js ***!
  \************************************************************/
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
(function (domGlobals) {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    function Plugin () {
      global.add('contextmenu', function () {
        domGlobals.console.warn('Context menu plugin is now built in to the core editor, please remove it from your editor configuration');
      });
    }

    Plugin();

}(window));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2NvbnRleHRtZW51L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55bWNlL3BsdWdpbnMvY29udGV4dG1lbnUvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFPLENBQUMseUVBQWEsRTs7Ozs7Ozs7Ozs7QUNOckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBLENBQUMiLCJmaWxlIjoidGlueW1jZS1wbHVnaW4tY29udGV4dG1lbnUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBFeHBvcnRzIHRoZSBcImNvbnRleHRtZW51XCIgcGx1Z2luIGZvciB1c2FnZSB3aXRoIG1vZHVsZSBsb2FkZXJzXG4vLyBVc2FnZTpcbi8vICAgQ29tbW9uSlM6XG4vLyAgICAgcmVxdWlyZSgndGlueW1jZS9wbHVnaW5zL2NvbnRleHRtZW51Jylcbi8vICAgRVMyMDE1OlxuLy8gICAgIGltcG9ydCAndGlueW1jZS9wbHVnaW5zL2NvbnRleHRtZW51J1xucmVxdWlyZSgnLi9wbHVnaW4uanMnKTsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqXG4gKiBWZXJzaW9uOiA1LjQuMiAoMjAyMC0wOC0xNylcbiAqL1xuKGZ1bmN0aW9uIChkb21HbG9iYWxzKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIGdsb2JhbCA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLlBsdWdpbk1hbmFnZXInKTtcblxuICAgIGZ1bmN0aW9uIFBsdWdpbiAoKSB7XG4gICAgICBnbG9iYWwuYWRkKCdjb250ZXh0bWVudScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9tR2xvYmFscy5jb25zb2xlLndhcm4oJ0NvbnRleHQgbWVudSBwbHVnaW4gaXMgbm93IGJ1aWx0IGluIHRvIHRoZSBjb3JlIGVkaXRvciwgcGxlYXNlIHJlbW92ZSBpdCBmcm9tIHlvdXIgZWRpdG9yIGNvbmZpZ3VyYXRpb24nKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIFBsdWdpbigpO1xuXG59KHdpbmRvdykpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==