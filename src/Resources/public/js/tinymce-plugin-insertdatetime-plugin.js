(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-insertdatetime-plugin"],{

/***/ "./node_modules/tinymce/plugins/insertdatetime/plugin.js":
/*!***************************************************************!*\
  !*** ./node_modules/tinymce/plugins/insertdatetime/plugin.js ***!
  \***************************************************************/
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

    var getDateFormat = function (editor) {
      return editor.getParam('insertdatetime_dateformat', editor.translate('%Y-%m-%d'));
    };
    var getTimeFormat = function (editor) {
      return editor.getParam('insertdatetime_timeformat', editor.translate('%H:%M:%S'));
    };
    var getFormats = function (editor) {
      return editor.getParam('insertdatetime_formats', [
        '%H:%M:%S',
        '%Y-%m-%d',
        '%I:%M:%S %p',
        '%D'
      ]);
    };
    var getDefaultDateTime = function (editor) {
      var formats = getFormats(editor);
      return formats.length > 0 ? formats[0] : getTimeFormat(editor);
    };
    var shouldInsertTimeElement = function (editor) {
      return editor.getParam('insertdatetime_element', false);
    };

    var daysShort = 'Sun Mon Tue Wed Thu Fri Sat Sun'.split(' ');
    var daysLong = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday Sunday'.split(' ');
    var monthsShort = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
    var monthsLong = 'January February March April May June July August September October November December'.split(' ');
    var addZeros = function (value, len) {
      value = '' + value;
      if (value.length < len) {
        for (var i = 0; i < len - value.length; i++) {
          value = '0' + value;
        }
      }
      return value;
    };
    var getDateTime = function (editor, fmt, date) {
      date = date || new Date();
      fmt = fmt.replace('%D', '%m/%d/%Y');
      fmt = fmt.replace('%r', '%I:%M:%S %p');
      fmt = fmt.replace('%Y', '' + date.getFullYear());
      fmt = fmt.replace('%y', '' + date.getYear());
      fmt = fmt.replace('%m', addZeros(date.getMonth() + 1, 2));
      fmt = fmt.replace('%d', addZeros(date.getDate(), 2));
      fmt = fmt.replace('%H', '' + addZeros(date.getHours(), 2));
      fmt = fmt.replace('%M', '' + addZeros(date.getMinutes(), 2));
      fmt = fmt.replace('%S', '' + addZeros(date.getSeconds(), 2));
      fmt = fmt.replace('%I', '' + ((date.getHours() + 11) % 12 + 1));
      fmt = fmt.replace('%p', '' + (date.getHours() < 12 ? 'AM' : 'PM'));
      fmt = fmt.replace('%B', '' + editor.translate(monthsLong[date.getMonth()]));
      fmt = fmt.replace('%b', '' + editor.translate(monthsShort[date.getMonth()]));
      fmt = fmt.replace('%A', '' + editor.translate(daysLong[date.getDay()]));
      fmt = fmt.replace('%a', '' + editor.translate(daysShort[date.getDay()]));
      fmt = fmt.replace('%%', '%');
      return fmt;
    };
    var updateElement = function (editor, timeElm, computerTime, userTime) {
      var newTimeElm = editor.dom.create('time', { datetime: computerTime }, userTime);
      timeElm.parentNode.insertBefore(newTimeElm, timeElm);
      editor.dom.remove(timeElm);
      editor.selection.select(newTimeElm, true);
      editor.selection.collapse(false);
    };
    var insertDateTime = function (editor, format) {
      if (shouldInsertTimeElement(editor)) {
        var userTime = getDateTime(editor, format);
        var computerTime = void 0;
        if (/%[HMSIp]/.test(format)) {
          computerTime = getDateTime(editor, '%Y-%m-%dT%H:%M');
        } else {
          computerTime = getDateTime(editor, '%Y-%m-%d');
        }
        var timeElm = editor.dom.getParent(editor.selection.getStart(), 'time');
        if (timeElm) {
          updateElement(editor, timeElm, computerTime, userTime);
        } else {
          editor.insertContent('<time datetime="' + computerTime + '">' + userTime + '</time>');
        }
      } else {
        editor.insertContent(getDateTime(editor, format));
      }
    };

    var register = function (editor) {
      editor.addCommand('mceInsertDate', function () {
        insertDateTime(editor, getDateFormat(editor));
      });
      editor.addCommand('mceInsertTime', function () {
        insertDateTime(editor, getTimeFormat(editor));
      });
    };

    var Cell = function (initial) {
      var value = initial;
      var get = function () {
        return value;
      };
      var set = function (v) {
        value = v;
      };
      return {
        get: get,
        set: set
      };
    };

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var register$1 = function (editor) {
      var formats = getFormats(editor);
      var defaultFormat = Cell(getDefaultDateTime(editor));
      editor.ui.registry.addSplitButton('insertdatetime', {
        icon: 'insert-time',
        tooltip: 'Insert date/time',
        select: function (value) {
          return value === defaultFormat.get();
        },
        fetch: function (done) {
          done(global$1.map(formats, function (format) {
            return {
              type: 'choiceitem',
              text: getDateTime(editor, format),
              value: format
            };
          }));
        },
        onAction: function (_api) {
          insertDateTime(editor, defaultFormat.get());
        },
        onItemAction: function (_api, value) {
          defaultFormat.set(value);
          insertDateTime(editor, value);
        }
      });
      var makeMenuItemHandler = function (format) {
        return function () {
          defaultFormat.set(format);
          insertDateTime(editor, format);
        };
      };
      editor.ui.registry.addNestedMenuItem('insertdatetime', {
        icon: 'insert-time',
        text: 'Date/time',
        getSubmenuItems: function () {
          return global$1.map(formats, function (format) {
            return {
              type: 'menuitem',
              text: getDateTime(editor, format),
              onAction: makeMenuItemHandler(format)
            };
          });
        }
      });
    };

    function Plugin () {
      global.add('insertdatetime', function (editor) {
        register(editor);
        register$1(editor);
      });
    }

    Plugin();

}());


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2luc2VydGRhdGV0aW1lL3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsd0JBQXdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QseUJBQXlCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBLENBQUMiLCJmaWxlIjoidGlueW1jZS1wbHVnaW4taW5zZXJ0ZGF0ZXRpbWUtcGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIFRpbnkgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTEdQTCBvciBhIGNvbW1lcmNpYWwgbGljZW5zZS5cbiAqIEZvciBMR1BMIHNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogRm9yIGNvbW1lcmNpYWwgbGljZW5zZXMgc2VlIGh0dHBzOi8vd3d3LnRpbnkuY2xvdWQvXG4gKlxuICogVmVyc2lvbjogNS40LjIgKDIwMjAtMDgtMTcpXG4gKi9cbihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIGdsb2JhbCA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLlBsdWdpbk1hbmFnZXInKTtcblxuICAgIHZhciBnZXREYXRlRm9ybWF0ID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnaW5zZXJ0ZGF0ZXRpbWVfZGF0ZWZvcm1hdCcsIGVkaXRvci50cmFuc2xhdGUoJyVZLSVtLSVkJykpO1xuICAgIH07XG4gICAgdmFyIGdldFRpbWVGb3JtYXQgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdpbnNlcnRkYXRldGltZV90aW1lZm9ybWF0JywgZWRpdG9yLnRyYW5zbGF0ZSgnJUg6JU06JVMnKSk7XG4gICAgfTtcbiAgICB2YXIgZ2V0Rm9ybWF0cyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2luc2VydGRhdGV0aW1lX2Zvcm1hdHMnLCBbXG4gICAgICAgICclSDolTTolUycsXG4gICAgICAgICclWS0lbS0lZCcsXG4gICAgICAgICclSTolTTolUyAlcCcsXG4gICAgICAgICclRCdcbiAgICAgIF0pO1xuICAgIH07XG4gICAgdmFyIGdldERlZmF1bHREYXRlVGltZSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBmb3JtYXRzID0gZ2V0Rm9ybWF0cyhlZGl0b3IpO1xuICAgICAgcmV0dXJuIGZvcm1hdHMubGVuZ3RoID4gMCA/IGZvcm1hdHNbMF0gOiBnZXRUaW1lRm9ybWF0KGVkaXRvcik7XG4gICAgfTtcbiAgICB2YXIgc2hvdWxkSW5zZXJ0VGltZUVsZW1lbnQgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdpbnNlcnRkYXRldGltZV9lbGVtZW50JywgZmFsc2UpO1xuICAgIH07XG5cbiAgICB2YXIgZGF5c1Nob3J0ID0gJ1N1biBNb24gVHVlIFdlZCBUaHUgRnJpIFNhdCBTdW4nLnNwbGl0KCcgJyk7XG4gICAgdmFyIGRheXNMb25nID0gJ1N1bmRheSBNb25kYXkgVHVlc2RheSBXZWRuZXNkYXkgVGh1cnNkYXkgRnJpZGF5IFNhdHVyZGF5IFN1bmRheScuc3BsaXQoJyAnKTtcbiAgICB2YXIgbW9udGhzU2hvcnQgPSAnSmFuIEZlYiBNYXIgQXByIE1heSBKdW4gSnVsIEF1ZyBTZXAgT2N0IE5vdiBEZWMnLnNwbGl0KCcgJyk7XG4gICAgdmFyIG1vbnRoc0xvbmcgPSAnSmFudWFyeSBGZWJydWFyeSBNYXJjaCBBcHJpbCBNYXkgSnVuZSBKdWx5IEF1Z3VzdCBTZXB0ZW1iZXIgT2N0b2JlciBOb3ZlbWJlciBEZWNlbWJlcicuc3BsaXQoJyAnKTtcbiAgICB2YXIgYWRkWmVyb3MgPSBmdW5jdGlvbiAodmFsdWUsIGxlbikge1xuICAgICAgdmFsdWUgPSAnJyArIHZhbHVlO1xuICAgICAgaWYgKHZhbHVlLmxlbmd0aCA8IGxlbikge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbiAtIHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFsdWUgPSAnMCcgKyB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgdmFyIGdldERhdGVUaW1lID0gZnVuY3Rpb24gKGVkaXRvciwgZm10LCBkYXRlKSB7XG4gICAgICBkYXRlID0gZGF0ZSB8fCBuZXcgRGF0ZSgpO1xuICAgICAgZm10ID0gZm10LnJlcGxhY2UoJyVEJywgJyVtLyVkLyVZJyk7XG4gICAgICBmbXQgPSBmbXQucmVwbGFjZSgnJXInLCAnJUk6JU06JVMgJXAnKTtcbiAgICAgIGZtdCA9IGZtdC5yZXBsYWNlKCclWScsICcnICsgZGF0ZS5nZXRGdWxsWWVhcigpKTtcbiAgICAgIGZtdCA9IGZtdC5yZXBsYWNlKCcleScsICcnICsgZGF0ZS5nZXRZZWFyKCkpO1xuICAgICAgZm10ID0gZm10LnJlcGxhY2UoJyVtJywgYWRkWmVyb3MoZGF0ZS5nZXRNb250aCgpICsgMSwgMikpO1xuICAgICAgZm10ID0gZm10LnJlcGxhY2UoJyVkJywgYWRkWmVyb3MoZGF0ZS5nZXREYXRlKCksIDIpKTtcbiAgICAgIGZtdCA9IGZtdC5yZXBsYWNlKCclSCcsICcnICsgYWRkWmVyb3MoZGF0ZS5nZXRIb3VycygpLCAyKSk7XG4gICAgICBmbXQgPSBmbXQucmVwbGFjZSgnJU0nLCAnJyArIGFkZFplcm9zKGRhdGUuZ2V0TWludXRlcygpLCAyKSk7XG4gICAgICBmbXQgPSBmbXQucmVwbGFjZSgnJVMnLCAnJyArIGFkZFplcm9zKGRhdGUuZ2V0U2Vjb25kcygpLCAyKSk7XG4gICAgICBmbXQgPSBmbXQucmVwbGFjZSgnJUknLCAnJyArICgoZGF0ZS5nZXRIb3VycygpICsgMTEpICUgMTIgKyAxKSk7XG4gICAgICBmbXQgPSBmbXQucmVwbGFjZSgnJXAnLCAnJyArIChkYXRlLmdldEhvdXJzKCkgPCAxMiA/ICdBTScgOiAnUE0nKSk7XG4gICAgICBmbXQgPSBmbXQucmVwbGFjZSgnJUInLCAnJyArIGVkaXRvci50cmFuc2xhdGUobW9udGhzTG9uZ1tkYXRlLmdldE1vbnRoKCldKSk7XG4gICAgICBmbXQgPSBmbXQucmVwbGFjZSgnJWInLCAnJyArIGVkaXRvci50cmFuc2xhdGUobW9udGhzU2hvcnRbZGF0ZS5nZXRNb250aCgpXSkpO1xuICAgICAgZm10ID0gZm10LnJlcGxhY2UoJyVBJywgJycgKyBlZGl0b3IudHJhbnNsYXRlKGRheXNMb25nW2RhdGUuZ2V0RGF5KCldKSk7XG4gICAgICBmbXQgPSBmbXQucmVwbGFjZSgnJWEnLCAnJyArIGVkaXRvci50cmFuc2xhdGUoZGF5c1Nob3J0W2RhdGUuZ2V0RGF5KCldKSk7XG4gICAgICBmbXQgPSBmbXQucmVwbGFjZSgnJSUnLCAnJScpO1xuICAgICAgcmV0dXJuIGZtdDtcbiAgICB9O1xuICAgIHZhciB1cGRhdGVFbGVtZW50ID0gZnVuY3Rpb24gKGVkaXRvciwgdGltZUVsbSwgY29tcHV0ZXJUaW1lLCB1c2VyVGltZSkge1xuICAgICAgdmFyIG5ld1RpbWVFbG0gPSBlZGl0b3IuZG9tLmNyZWF0ZSgndGltZScsIHsgZGF0ZXRpbWU6IGNvbXB1dGVyVGltZSB9LCB1c2VyVGltZSk7XG4gICAgICB0aW1lRWxtLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld1RpbWVFbG0sIHRpbWVFbG0pO1xuICAgICAgZWRpdG9yLmRvbS5yZW1vdmUodGltZUVsbSk7XG4gICAgICBlZGl0b3Iuc2VsZWN0aW9uLnNlbGVjdChuZXdUaW1lRWxtLCB0cnVlKTtcbiAgICAgIGVkaXRvci5zZWxlY3Rpb24uY29sbGFwc2UoZmFsc2UpO1xuICAgIH07XG4gICAgdmFyIGluc2VydERhdGVUaW1lID0gZnVuY3Rpb24gKGVkaXRvciwgZm9ybWF0KSB7XG4gICAgICBpZiAoc2hvdWxkSW5zZXJ0VGltZUVsZW1lbnQoZWRpdG9yKSkge1xuICAgICAgICB2YXIgdXNlclRpbWUgPSBnZXREYXRlVGltZShlZGl0b3IsIGZvcm1hdCk7XG4gICAgICAgIHZhciBjb21wdXRlclRpbWUgPSB2b2lkIDA7XG4gICAgICAgIGlmICgvJVtITVNJcF0vLnRlc3QoZm9ybWF0KSkge1xuICAgICAgICAgIGNvbXB1dGVyVGltZSA9IGdldERhdGVUaW1lKGVkaXRvciwgJyVZLSVtLSVkVCVIOiVNJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29tcHV0ZXJUaW1lID0gZ2V0RGF0ZVRpbWUoZWRpdG9yLCAnJVktJW0tJWQnKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGltZUVsbSA9IGVkaXRvci5kb20uZ2V0UGFyZW50KGVkaXRvci5zZWxlY3Rpb24uZ2V0U3RhcnQoKSwgJ3RpbWUnKTtcbiAgICAgICAgaWYgKHRpbWVFbG0pIHtcbiAgICAgICAgICB1cGRhdGVFbGVtZW50KGVkaXRvciwgdGltZUVsbSwgY29tcHV0ZXJUaW1lLCB1c2VyVGltZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWRpdG9yLmluc2VydENvbnRlbnQoJzx0aW1lIGRhdGV0aW1lPVwiJyArIGNvbXB1dGVyVGltZSArICdcIj4nICsgdXNlclRpbWUgKyAnPC90aW1lPicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlZGl0b3IuaW5zZXJ0Q29udGVudChnZXREYXRlVGltZShlZGl0b3IsIGZvcm1hdCkpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgcmVnaXN0ZXIgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBlZGl0b3IuYWRkQ29tbWFuZCgnbWNlSW5zZXJ0RGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaW5zZXJ0RGF0ZVRpbWUoZWRpdG9yLCBnZXREYXRlRm9ybWF0KGVkaXRvcikpO1xuICAgICAgfSk7XG4gICAgICBlZGl0b3IuYWRkQ29tbWFuZCgnbWNlSW5zZXJ0VGltZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaW5zZXJ0RGF0ZVRpbWUoZWRpdG9yLCBnZXRUaW1lRm9ybWF0KGVkaXRvcikpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBDZWxsID0gZnVuY3Rpb24gKGluaXRpYWwpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGluaXRpYWw7XG4gICAgICB2YXIgZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9O1xuICAgICAgdmFyIHNldCA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHZhbHVlID0gdjtcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBnZXQ6IGdldCxcbiAgICAgICAgc2V0OiBzZXRcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciBnbG9iYWwkMSA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuVG9vbHMnKTtcblxuICAgIHZhciByZWdpc3RlciQxID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGZvcm1hdHMgPSBnZXRGb3JtYXRzKGVkaXRvcik7XG4gICAgICB2YXIgZGVmYXVsdEZvcm1hdCA9IENlbGwoZ2V0RGVmYXVsdERhdGVUaW1lKGVkaXRvcikpO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZFNwbGl0QnV0dG9uKCdpbnNlcnRkYXRldGltZScsIHtcbiAgICAgICAgaWNvbjogJ2luc2VydC10aW1lJyxcbiAgICAgICAgdG9vbHRpcDogJ0luc2VydCBkYXRlL3RpbWUnLFxuICAgICAgICBzZWxlY3Q6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gZGVmYXVsdEZvcm1hdC5nZXQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmV0Y2g6IGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgICAgZG9uZShnbG9iYWwkMS5tYXAoZm9ybWF0cywgZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgdHlwZTogJ2Nob2ljZWl0ZW0nLFxuICAgICAgICAgICAgICB0ZXh0OiBnZXREYXRlVGltZShlZGl0b3IsIGZvcm1hdCksXG4gICAgICAgICAgICAgIHZhbHVlOiBmb3JtYXRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9LFxuICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKF9hcGkpIHtcbiAgICAgICAgICBpbnNlcnREYXRlVGltZShlZGl0b3IsIGRlZmF1bHRGb3JtYXQuZ2V0KCkpO1xuICAgICAgICB9LFxuICAgICAgICBvbkl0ZW1BY3Rpb246IGZ1bmN0aW9uIChfYXBpLCB2YWx1ZSkge1xuICAgICAgICAgIGRlZmF1bHRGb3JtYXQuc2V0KHZhbHVlKTtcbiAgICAgICAgICBpbnNlcnREYXRlVGltZShlZGl0b3IsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB2YXIgbWFrZU1lbnVJdGVtSGFuZGxlciA9IGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkZWZhdWx0Rm9ybWF0LnNldChmb3JtYXQpO1xuICAgICAgICAgIGluc2VydERhdGVUaW1lKGVkaXRvciwgZm9ybWF0KTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkTmVzdGVkTWVudUl0ZW0oJ2luc2VydGRhdGV0aW1lJywge1xuICAgICAgICBpY29uOiAnaW5zZXJ0LXRpbWUnLFxuICAgICAgICB0ZXh0OiAnRGF0ZS90aW1lJyxcbiAgICAgICAgZ2V0U3VibWVudUl0ZW1zOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGdsb2JhbCQxLm1hcChmb3JtYXRzLCBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICB0eXBlOiAnbWVudWl0ZW0nLFxuICAgICAgICAgICAgICB0ZXh0OiBnZXREYXRlVGltZShlZGl0b3IsIGZvcm1hdCksXG4gICAgICAgICAgICAgIG9uQWN0aW9uOiBtYWtlTWVudUl0ZW1IYW5kbGVyKGZvcm1hdClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBQbHVnaW4gKCkge1xuICAgICAgZ2xvYmFsLmFkZCgnaW5zZXJ0ZGF0ZXRpbWUnLCBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIHJlZ2lzdGVyKGVkaXRvcik7XG4gICAgICAgIHJlZ2lzdGVyJDEoZWRpdG9yKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIFBsdWdpbigpO1xuXG59KCkpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==