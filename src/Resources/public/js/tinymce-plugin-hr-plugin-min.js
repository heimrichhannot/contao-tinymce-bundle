(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-hr-plugin-min"],{

/***/ "./node_modules/tinymce/plugins/hr/plugin.min.js":
/*!*******************************************************!*\
  !*** ./node_modules/tinymce/plugins/hr/plugin.min.js ***!
  \*******************************************************/
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
!function(){"use strict";var n=tinymce.util.Tools.resolve("tinymce.PluginManager");!function o(){n.add("hr",function(n){var o,t;(o=n).addCommand("InsertHorizontalRule",function(){o.execCommand("mceInsertContent",!1,"<hr />")}),(t=n).ui.registry.addButton("hr",{icon:"horizontal-rule",tooltip:"Horizontal line",onAction:function(){return t.execCommand("InsertHorizontalRule")}}),t.ui.registry.addMenuItem("hr",{icon:"horizontal-rule",text:"Horizontal line",onAction:function(){return t.execCommand("InsertHorizontalRule")}})})}()}();

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2hyL3BsdWdpbi5taW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksYUFBYSwwREFBMEQsY0FBYyx1QkFBdUIsUUFBUSxtREFBbUQsOENBQThDLG9DQUFvQyxxRUFBcUUsOENBQThDLGtDQUFrQyxrRUFBa0UsOENBQThDLEVBQUUsRUFBRSxHQUFHLEciLCJmaWxlIjoidGlueW1jZS1wbHVnaW4taHItcGx1Z2luLW1pbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICpcbiAqIFZlcnNpb246IDUuNC4yICgyMDIwLTA4LTE3KVxuICovXG4hZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgbj10aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZShcInRpbnltY2UuUGx1Z2luTWFuYWdlclwiKTshZnVuY3Rpb24gbygpe24uYWRkKFwiaHJcIixmdW5jdGlvbihuKXt2YXIgbyx0OyhvPW4pLmFkZENvbW1hbmQoXCJJbnNlcnRIb3Jpem9udGFsUnVsZVwiLGZ1bmN0aW9uKCl7by5leGVjQ29tbWFuZChcIm1jZUluc2VydENvbnRlbnRcIiwhMSxcIjxociAvPlwiKX0pLCh0PW4pLnVpLnJlZ2lzdHJ5LmFkZEJ1dHRvbihcImhyXCIse2ljb246XCJob3Jpem9udGFsLXJ1bGVcIix0b29sdGlwOlwiSG9yaXpvbnRhbCBsaW5lXCIsb25BY3Rpb246ZnVuY3Rpb24oKXtyZXR1cm4gdC5leGVjQ29tbWFuZChcIkluc2VydEhvcml6b250YWxSdWxlXCIpfX0pLHQudWkucmVnaXN0cnkuYWRkTWVudUl0ZW0oXCJoclwiLHtpY29uOlwiaG9yaXpvbnRhbC1ydWxlXCIsdGV4dDpcIkhvcml6b250YWwgbGluZVwiLG9uQWN0aW9uOmZ1bmN0aW9uKCl7cmV0dXJuIHQuZXhlY0NvbW1hbmQoXCJJbnNlcnRIb3Jpem9udGFsUnVsZVwiKX19KX0pfSgpfSgpOyJdLCJzb3VyY2VSb290IjoiIn0=