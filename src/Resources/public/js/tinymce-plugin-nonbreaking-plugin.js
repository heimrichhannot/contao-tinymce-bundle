(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-nonbreaking-plugin"],{

/***/ "./node_modules/tinymce/plugins/nonbreaking/plugin.js":
/*!************************************************************!*\
  !*** ./node_modules/tinymce/plugins/nonbreaking/plugin.js ***!
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
(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var getKeyboardSpaces = function (editor) {
      var spaces = editor.getParam('nonbreaking_force_tab', 0);
      if (typeof spaces === 'boolean') {
        return spaces === true ? 3 : 0;
      } else {
        return spaces;
      }
    };
    var wrapNbsps = function (editor) {
      return editor.getParam('nonbreaking_wrap', true, 'boolean');
    };

    var stringRepeat = function (string, repeats) {
      var str = '';
      for (var index = 0; index < repeats; index++) {
        str += string;
      }
      return str;
    };
    var isVisualCharsEnabled = function (editor) {
      return editor.plugins.visualchars ? editor.plugins.visualchars.isEnabled() : false;
    };
    var insertNbsp = function (editor, times) {
      var classes = function () {
        return isVisualCharsEnabled(editor) ? 'mce-nbsp-wrap mce-nbsp' : 'mce-nbsp-wrap';
      };
      var nbspSpan = function () {
        return '<span class="' + classes() + '" contenteditable="false">' + stringRepeat('&nbsp;', times) + '</span>';
      };
      var shouldWrap = wrapNbsps(editor);
      var html = shouldWrap || editor.plugins.visualchars ? nbspSpan() : stringRepeat('&nbsp;', times);
      editor.undoManager.transact(function () {
        return editor.insertContent(html);
      });
    };

    var register = function (editor) {
      editor.addCommand('mceNonBreaking', function () {
        insertNbsp(editor, 1);
      });
    };

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.VK');

    var setup = function (editor) {
      var spaces = getKeyboardSpaces(editor);
      if (spaces > 0) {
        editor.on('keydown', function (e) {
          if (e.keyCode === global$1.TAB && !e.isDefaultPrevented()) {
            if (e.shiftKey) {
              return;
            }
            e.preventDefault();
            e.stopImmediatePropagation();
            insertNbsp(editor, spaces);
          }
        });
      }
    };

    var register$1 = function (editor) {
      editor.ui.registry.addButton('nonbreaking', {
        icon: 'non-breaking',
        tooltip: 'Nonbreaking space',
        onAction: function () {
          return editor.execCommand('mceNonBreaking');
        }
      });
      editor.ui.registry.addMenuItem('nonbreaking', {
        icon: 'non-breaking',
        text: 'Nonbreaking space',
        onAction: function () {
          return editor.execCommand('mceNonBreaking');
        }
      });
    };

    function Plugin () {
      global.add('nonbreaking', function (editor) {
        register(editor);
        register$1(editor);
        setup(editor);
      });
    }

    Plugin();

}());


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL25vbmJyZWFraW5nL3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlCQUF5QixpQkFBaUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0dBQWdHO0FBQ2hHO0FBQ0E7QUFDQSw2RkFBNkY7QUFDN0Y7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7O0FBRUEsQ0FBQyIsImZpbGUiOiJ0aW55bWNlLXBsdWdpbi1ub25icmVha2luZy1wbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqXG4gKiBWZXJzaW9uOiA1LjQuMiAoMjAyMC0wOC0xNylcbiAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgZ2xvYmFsID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuUGx1Z2luTWFuYWdlcicpO1xuXG4gICAgdmFyIGdldEtleWJvYXJkU3BhY2VzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIHNwYWNlcyA9IGVkaXRvci5nZXRQYXJhbSgnbm9uYnJlYWtpbmdfZm9yY2VfdGFiJywgMCk7XG4gICAgICBpZiAodHlwZW9mIHNwYWNlcyA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHJldHVybiBzcGFjZXMgPT09IHRydWUgPyAzIDogMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzcGFjZXM7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgd3JhcE5ic3BzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnbm9uYnJlYWtpbmdfd3JhcCcsIHRydWUsICdib29sZWFuJyk7XG4gICAgfTtcblxuICAgIHZhciBzdHJpbmdSZXBlYXQgPSBmdW5jdGlvbiAoc3RyaW5nLCByZXBlYXRzKSB7XG4gICAgICB2YXIgc3RyID0gJyc7XG4gICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgcmVwZWF0czsgaW5kZXgrKykge1xuICAgICAgICBzdHIgKz0gc3RyaW5nO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9O1xuICAgIHZhciBpc1Zpc3VhbENoYXJzRW5hYmxlZCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IucGx1Z2lucy52aXN1YWxjaGFycyA/IGVkaXRvci5wbHVnaW5zLnZpc3VhbGNoYXJzLmlzRW5hYmxlZCgpIDogZmFsc2U7XG4gICAgfTtcbiAgICB2YXIgaW5zZXJ0TmJzcCA9IGZ1bmN0aW9uIChlZGl0b3IsIHRpbWVzKSB7XG4gICAgICB2YXIgY2xhc3NlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGlzVmlzdWFsQ2hhcnNFbmFibGVkKGVkaXRvcikgPyAnbWNlLW5ic3Atd3JhcCBtY2UtbmJzcCcgOiAnbWNlLW5ic3Atd3JhcCc7XG4gICAgICB9O1xuICAgICAgdmFyIG5ic3BTcGFuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJzxzcGFuIGNsYXNzPVwiJyArIGNsYXNzZXMoKSArICdcIiBjb250ZW50ZWRpdGFibGU9XCJmYWxzZVwiPicgKyBzdHJpbmdSZXBlYXQoJyZuYnNwOycsIHRpbWVzKSArICc8L3NwYW4+JztcbiAgICAgIH07XG4gICAgICB2YXIgc2hvdWxkV3JhcCA9IHdyYXBOYnNwcyhlZGl0b3IpO1xuICAgICAgdmFyIGh0bWwgPSBzaG91bGRXcmFwIHx8IGVkaXRvci5wbHVnaW5zLnZpc3VhbGNoYXJzID8gbmJzcFNwYW4oKSA6IHN0cmluZ1JlcGVhdCgnJm5ic3A7JywgdGltZXMpO1xuICAgICAgZWRpdG9yLnVuZG9NYW5hZ2VyLnRyYW5zYWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGVkaXRvci5pbnNlcnRDb250ZW50KGh0bWwpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciByZWdpc3RlciA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIGVkaXRvci5hZGRDb21tYW5kKCdtY2VOb25CcmVha2luZycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaW5zZXJ0TmJzcChlZGl0b3IsIDEpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBnbG9iYWwkMSA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuVksnKTtcblxuICAgIHZhciBzZXR1cCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBzcGFjZXMgPSBnZXRLZXlib2FyZFNwYWNlcyhlZGl0b3IpO1xuICAgICAgaWYgKHNwYWNlcyA+IDApIHtcbiAgICAgICAgZWRpdG9yLm9uKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBnbG9iYWwkMS5UQUIgJiYgIWUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBpbnNlcnROYnNwKGVkaXRvciwgc3BhY2VzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgcmVnaXN0ZXIkMSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRCdXR0b24oJ25vbmJyZWFraW5nJywge1xuICAgICAgICBpY29uOiAnbm9uLWJyZWFraW5nJyxcbiAgICAgICAgdG9vbHRpcDogJ05vbmJyZWFraW5nIHNwYWNlJyxcbiAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZWRpdG9yLmV4ZWNDb21tYW5kKCdtY2VOb25CcmVha2luZycpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRNZW51SXRlbSgnbm9uYnJlYWtpbmcnLCB7XG4gICAgICAgIGljb246ICdub24tYnJlYWtpbmcnLFxuICAgICAgICB0ZXh0OiAnTm9uYnJlYWtpbmcgc3BhY2UnLFxuICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBlZGl0b3IuZXhlY0NvbW1hbmQoJ21jZU5vbkJyZWFraW5nJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBQbHVnaW4gKCkge1xuICAgICAgZ2xvYmFsLmFkZCgnbm9uYnJlYWtpbmcnLCBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIHJlZ2lzdGVyKGVkaXRvcik7XG4gICAgICAgIHJlZ2lzdGVyJDEoZWRpdG9yKTtcbiAgICAgICAgc2V0dXAoZWRpdG9yKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIFBsdWdpbigpO1xuXG59KCkpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==