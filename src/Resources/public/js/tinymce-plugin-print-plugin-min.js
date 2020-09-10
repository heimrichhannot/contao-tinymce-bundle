(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-print-plugin-min"],{

/***/ "./node_modules/tinymce/plugins/print/plugin.min.js":
/*!**********************************************************!*\
  !*** ./node_modules/tinymce/plugins/print/plugin.min.js ***!
  \**********************************************************/
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
!function(){"use strict";var n=tinymce.util.Tools.resolve("tinymce.PluginManager"),e=tinymce.util.Tools.resolve("tinymce.Env");!function t(){n.add("print",function(n){var t,i;(t=n).addCommand("mcePrint",function(){e.browser.isIE()?t.getDoc().execCommand("print",!1,null):t.getWin().print()}),(i=n).ui.registry.addButton("print",{icon:"print",tooltip:"Print",onAction:function(){return i.execCommand("mcePrint")}}),i.ui.registry.addMenuItem("print",{text:"Print...",icon:"print",onAction:function(){return i.execCommand("mcePrint")}}),n.addShortcut("Meta+P","","mcePrint")})}()}();

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL3ByaW50L3BsdWdpbi5taW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksYUFBYSxzR0FBc0csY0FBYywwQkFBMEIsUUFBUSx1Q0FBdUMsNEVBQTRFLHVDQUF1QyxpREFBaUQsa0NBQWtDLHFDQUFxQyxpREFBaUQsa0NBQWtDLHdDQUF3QyxFQUFFLEdBQUcsRyIsImZpbGUiOiJ0aW55bWNlLXBsdWdpbi1wcmludC1wbHVnaW4tbWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIFRpbnkgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTEdQTCBvciBhIGNvbW1lcmNpYWwgbGljZW5zZS5cbiAqIEZvciBMR1BMIHNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogRm9yIGNvbW1lcmNpYWwgbGljZW5zZXMgc2VlIGh0dHBzOi8vd3d3LnRpbnkuY2xvdWQvXG4gKlxuICogVmVyc2lvbjogNS40LjIgKDIwMjAtMDgtMTcpXG4gKi9cbiFmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciBuPXRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKFwidGlueW1jZS5QbHVnaW5NYW5hZ2VyXCIpLGU9dGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoXCJ0aW55bWNlLkVudlwiKTshZnVuY3Rpb24gdCgpe24uYWRkKFwicHJpbnRcIixmdW5jdGlvbihuKXt2YXIgdCxpOyh0PW4pLmFkZENvbW1hbmQoXCJtY2VQcmludFwiLGZ1bmN0aW9uKCl7ZS5icm93c2VyLmlzSUUoKT90LmdldERvYygpLmV4ZWNDb21tYW5kKFwicHJpbnRcIiwhMSxudWxsKTp0LmdldFdpbigpLnByaW50KCl9KSwoaT1uKS51aS5yZWdpc3RyeS5hZGRCdXR0b24oXCJwcmludFwiLHtpY29uOlwicHJpbnRcIix0b29sdGlwOlwiUHJpbnRcIixvbkFjdGlvbjpmdW5jdGlvbigpe3JldHVybiBpLmV4ZWNDb21tYW5kKFwibWNlUHJpbnRcIil9fSksaS51aS5yZWdpc3RyeS5hZGRNZW51SXRlbShcInByaW50XCIse3RleHQ6XCJQcmludC4uLlwiLGljb246XCJwcmludFwiLG9uQWN0aW9uOmZ1bmN0aW9uKCl7cmV0dXJuIGkuZXhlY0NvbW1hbmQoXCJtY2VQcmludFwiKX19KSxuLmFkZFNob3J0Y3V0KFwiTWV0YStQXCIsXCJcIixcIm1jZVByaW50XCIpfSl9KCl9KCk7Il0sInNvdXJjZVJvb3QiOiIifQ==