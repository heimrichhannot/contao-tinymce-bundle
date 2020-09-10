(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-code-plugin-min"],{

/***/ "./node_modules/tinymce/plugins/code/plugin.min.js":
/*!*********************************************************!*\
  !*** ./node_modules/tinymce/plugins/code/plugin.min.js ***!
  \*********************************************************/
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
!function(){"use strict";var e=tinymce.util.Tools.resolve("tinymce.PluginManager"),o=function(o){var e=o.getContent({source_view:!0});o.windowManager.open({title:"Source Code",size:"large",body:{type:"panel",items:[{type:"textarea",name:"code"}]},buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0}],initialData:{code:e},onSubmit:function(e){var t,n;t=o,n=e.getData().code,t.focus(),t.undoManager.transact(function(){t.setContent(n)}),t.selection.setCursorLocation(),t.nodeChanged(),e.close()}})};!function t(){e.add("code",function(e){var t,n;return(t=e).addCommand("mceCodeEditor",function(){o(t)}),(n=e).ui.registry.addButton("code",{icon:"sourcecode",tooltip:"Source code",onAction:function(){return o(n)}}),n.ui.registry.addMenuItem("code",{icon:"sourcecode",text:"Source code",onAction:function(){return o(n)}}),{}})}()}();

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2NvZGUvcGx1Z2luLm1pbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxhQUFhLHdFQUF3RSxvQkFBb0IsZUFBZSxFQUFFLHNCQUFzQix1Q0FBdUMscUJBQXFCLDRCQUE0QixFQUFFLFdBQVcsMENBQTBDLEVBQUUsaURBQWlELGVBQWUsT0FBTyxzQkFBc0IsUUFBUSxtRUFBbUUsZ0JBQWdCLDZEQUE2RCxHQUFHLGNBQWMseUJBQXlCLFFBQVEsa0RBQWtELEtBQUssc0NBQXNDLDREQUE0RCxhQUFhLG9DQUFvQyx5REFBeUQsYUFBYSxLQUFLLEVBQUUsR0FBRyxHIiwiZmlsZSI6InRpbnltY2UtcGx1Z2luLWNvZGUtcGx1Z2luLW1pbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICpcbiAqIFZlcnNpb246IDUuNC4yICgyMDIwLTA4LTE3KVxuICovXG4hZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgZT10aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZShcInRpbnltY2UuUGx1Z2luTWFuYWdlclwiKSxvPWZ1bmN0aW9uKG8pe3ZhciBlPW8uZ2V0Q29udGVudCh7c291cmNlX3ZpZXc6ITB9KTtvLndpbmRvd01hbmFnZXIub3Blbih7dGl0bGU6XCJTb3VyY2UgQ29kZVwiLHNpemU6XCJsYXJnZVwiLGJvZHk6e3R5cGU6XCJwYW5lbFwiLGl0ZW1zOlt7dHlwZTpcInRleHRhcmVhXCIsbmFtZTpcImNvZGVcIn1dfSxidXR0b25zOlt7dHlwZTpcImNhbmNlbFwiLG5hbWU6XCJjYW5jZWxcIix0ZXh0OlwiQ2FuY2VsXCJ9LHt0eXBlOlwic3VibWl0XCIsbmFtZTpcInNhdmVcIix0ZXh0OlwiU2F2ZVwiLHByaW1hcnk6ITB9XSxpbml0aWFsRGF0YTp7Y29kZTplfSxvblN1Ym1pdDpmdW5jdGlvbihlKXt2YXIgdCxuO3Q9byxuPWUuZ2V0RGF0YSgpLmNvZGUsdC5mb2N1cygpLHQudW5kb01hbmFnZXIudHJhbnNhY3QoZnVuY3Rpb24oKXt0LnNldENvbnRlbnQobil9KSx0LnNlbGVjdGlvbi5zZXRDdXJzb3JMb2NhdGlvbigpLHQubm9kZUNoYW5nZWQoKSxlLmNsb3NlKCl9fSl9OyFmdW5jdGlvbiB0KCl7ZS5hZGQoXCJjb2RlXCIsZnVuY3Rpb24oZSl7dmFyIHQsbjtyZXR1cm4odD1lKS5hZGRDb21tYW5kKFwibWNlQ29kZUVkaXRvclwiLGZ1bmN0aW9uKCl7byh0KX0pLChuPWUpLnVpLnJlZ2lzdHJ5LmFkZEJ1dHRvbihcImNvZGVcIix7aWNvbjpcInNvdXJjZWNvZGVcIix0b29sdGlwOlwiU291cmNlIGNvZGVcIixvbkFjdGlvbjpmdW5jdGlvbigpe3JldHVybiBvKG4pfX0pLG4udWkucmVnaXN0cnkuYWRkTWVudUl0ZW0oXCJjb2RlXCIse2ljb246XCJzb3VyY2Vjb2RlXCIsdGV4dDpcIlNvdXJjZSBjb2RlXCIsb25BY3Rpb246ZnVuY3Rpb24oKXtyZXR1cm4gbyhuKX19KSx7fX0pfSgpfSgpOyJdLCJzb3VyY2VSb290IjoiIn0=