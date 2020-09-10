(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-bbcode"],{

/***/ "./node_modules/tinymce/plugins/bbcode/index.js":
/*!******************************************************!*\
  !*** ./node_modules/tinymce/plugins/bbcode/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Exports the "bbcode" plugin for usage with module loaders
// Usage:
//   CommonJS:
//     require('tinymce/plugins/bbcode')
//   ES2015:
//     import 'tinymce/plugins/bbcode'
__webpack_require__(/*! ./plugin.js */ "./node_modules/tinymce/plugins/bbcode/plugin.js");

/***/ }),

/***/ "./node_modules/tinymce/plugins/bbcode/plugin.js":
/*!*******************************************************!*\
  !*** ./node_modules/tinymce/plugins/bbcode/plugin.js ***!
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
(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var html2bbcode = function (s) {
      s = global$1.trim(s);
      var rep = function (re, str) {
        s = s.replace(re, str);
      };
      rep(/<a.*?href=\"(.*?)\".*?>(.*?)<\/a>/gi, '[url=$1]$2[/url]');
      rep(/<font.*?color=\"(.*?)\".*?class=\"codeStyle\".*?>(.*?)<\/font>/gi, '[code][color=$1]$2[/color][/code]');
      rep(/<font.*?color=\"(.*?)\".*?class=\"quoteStyle\".*?>(.*?)<\/font>/gi, '[quote][color=$1]$2[/color][/quote]');
      rep(/<font.*?class=\"codeStyle\".*?color=\"(.*?)\".*?>(.*?)<\/font>/gi, '[code][color=$1]$2[/color][/code]');
      rep(/<font.*?class=\"quoteStyle\".*?color=\"(.*?)\".*?>(.*?)<\/font>/gi, '[quote][color=$1]$2[/color][/quote]');
      rep(/<span style=\"color: ?(.*?);\">(.*?)<\/span>/gi, '[color=$1]$2[/color]');
      rep(/<font.*?color=\"(.*?)\".*?>(.*?)<\/font>/gi, '[color=$1]$2[/color]');
      rep(/<span style=\"font-size:(.*?);\">(.*?)<\/span>/gi, '[size=$1]$2[/size]');
      rep(/<font>(.*?)<\/font>/gi, '$1');
      rep(/<img.*?src=\"(.*?)\".*?\/>/gi, '[img]$1[/img]');
      rep(/<span class=\"codeStyle\">(.*?)<\/span>/gi, '[code]$1[/code]');
      rep(/<span class=\"quoteStyle\">(.*?)<\/span>/gi, '[quote]$1[/quote]');
      rep(/<strong class=\"codeStyle\">(.*?)<\/strong>/gi, '[code][b]$1[/b][/code]');
      rep(/<strong class=\"quoteStyle\">(.*?)<\/strong>/gi, '[quote][b]$1[/b][/quote]');
      rep(/<em class=\"codeStyle\">(.*?)<\/em>/gi, '[code][i]$1[/i][/code]');
      rep(/<em class=\"quoteStyle\">(.*?)<\/em>/gi, '[quote][i]$1[/i][/quote]');
      rep(/<u class=\"codeStyle\">(.*?)<\/u>/gi, '[code][u]$1[/u][/code]');
      rep(/<u class=\"quoteStyle\">(.*?)<\/u>/gi, '[quote][u]$1[/u][/quote]');
      rep(/<\/(strong|b)>/gi, '[/b]');
      rep(/<(strong|b)>/gi, '[b]');
      rep(/<\/(em|i)>/gi, '[/i]');
      rep(/<(em|i)>/gi, '[i]');
      rep(/<\/u>/gi, '[/u]');
      rep(/<span style=\"text-decoration: ?underline;\">(.*?)<\/span>/gi, '[u]$1[/u]');
      rep(/<u>/gi, '[u]');
      rep(/<blockquote[^>]*>/gi, '[quote]');
      rep(/<\/blockquote>/gi, '[/quote]');
      rep(/<br \/>/gi, '\n');
      rep(/<br\/>/gi, '\n');
      rep(/<br>/gi, '\n');
      rep(/<p>/gi, '');
      rep(/<\/p>/gi, '\n');
      rep(/&nbsp;|\u00a0/gi, ' ');
      rep(/&quot;/gi, '"');
      rep(/&lt;/gi, '<');
      rep(/&gt;/gi, '>');
      rep(/&amp;/gi, '&');
      return s;
    };
    var bbcode2html = function (s) {
      s = global$1.trim(s);
      var rep = function (re, str) {
        s = s.replace(re, str);
      };
      rep(/\n/gi, '<br />');
      rep(/\[b\]/gi, '<strong>');
      rep(/\[\/b\]/gi, '</strong>');
      rep(/\[i\]/gi, '<em>');
      rep(/\[\/i\]/gi, '</em>');
      rep(/\[u\]/gi, '<u>');
      rep(/\[\/u\]/gi, '</u>');
      rep(/\[url=([^\]]+)\](.*?)\[\/url\]/gi, '<a href="$1">$2</a>');
      rep(/\[url\](.*?)\[\/url\]/gi, '<a href="$1">$1</a>');
      rep(/\[img\](.*?)\[\/img\]/gi, '<img src="$1" />');
      rep(/\[color=(.*?)\](.*?)\[\/color\]/gi, '<font color="$1">$2</font>');
      rep(/\[code\](.*?)\[\/code\]/gi, '<span class="codeStyle">$1</span>&nbsp;');
      rep(/\[quote.*?\](.*?)\[\/quote\]/gi, '<span class="quoteStyle">$1</span>&nbsp;');
      return s;
    };

    function Plugin () {
      global.add('bbcode', function (editor) {
        editor.on('BeforeSetContent', function (e) {
          e.content = bbcode2html(e.content);
        });
        editor.on('PostProcess', function (e) {
          if (e.set) {
            e.content = bbcode2html(e.content);
          }
          if (e.get) {
            e.content = html2bbcode(e.content);
          }
        });
      });
    }

    Plugin();

}());


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2JiY29kZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2JiY29kZS9wbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQU8sQ0FBQyxvRUFBYSxFOzs7Ozs7Ozs7OztBQ05yQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixpQkFBaUI7QUFDakIsZUFBZTtBQUNmLGVBQWU7QUFDZixnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0VBQStFO0FBQy9FLHFGQUFxRjtBQUNyRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDs7QUFFQTs7QUFFQSxDQUFDIiwiZmlsZSI6InRpbnltY2UtcGx1Z2luLWJiY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEV4cG9ydHMgdGhlIFwiYmJjb2RlXCIgcGx1Z2luIGZvciB1c2FnZSB3aXRoIG1vZHVsZSBsb2FkZXJzXG4vLyBVc2FnZTpcbi8vICAgQ29tbW9uSlM6XG4vLyAgICAgcmVxdWlyZSgndGlueW1jZS9wbHVnaW5zL2JiY29kZScpXG4vLyAgIEVTMjAxNTpcbi8vICAgICBpbXBvcnQgJ3RpbnltY2UvcGx1Z2lucy9iYmNvZGUnXG5yZXF1aXJlKCcuL3BsdWdpbi5qcycpOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICpcbiAqIFZlcnNpb246IDUuNC4yICgyMDIwLTA4LTE3KVxuICovXG4oZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBnbG9iYWwgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5QbHVnaW5NYW5hZ2VyJyk7XG5cbiAgICB2YXIgZ2xvYmFsJDEgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS51dGlsLlRvb2xzJyk7XG5cbiAgICB2YXIgaHRtbDJiYmNvZGUgPSBmdW5jdGlvbiAocykge1xuICAgICAgcyA9IGdsb2JhbCQxLnRyaW0ocyk7XG4gICAgICB2YXIgcmVwID0gZnVuY3Rpb24gKHJlLCBzdHIpIHtcbiAgICAgICAgcyA9IHMucmVwbGFjZShyZSwgc3RyKTtcbiAgICAgIH07XG4gICAgICByZXAoLzxhLio/aHJlZj1cXFwiKC4qPylcXFwiLio/PiguKj8pPFxcL2E+L2dpLCAnW3VybD0kMV0kMlsvdXJsXScpO1xuICAgICAgcmVwKC88Zm9udC4qP2NvbG9yPVxcXCIoLio/KVxcXCIuKj9jbGFzcz1cXFwiY29kZVN0eWxlXFxcIi4qPz4oLio/KTxcXC9mb250Pi9naSwgJ1tjb2RlXVtjb2xvcj0kMV0kMlsvY29sb3JdWy9jb2RlXScpO1xuICAgICAgcmVwKC88Zm9udC4qP2NvbG9yPVxcXCIoLio/KVxcXCIuKj9jbGFzcz1cXFwicXVvdGVTdHlsZVxcXCIuKj8+KC4qPyk8XFwvZm9udD4vZ2ksICdbcXVvdGVdW2NvbG9yPSQxXSQyWy9jb2xvcl1bL3F1b3RlXScpO1xuICAgICAgcmVwKC88Zm9udC4qP2NsYXNzPVxcXCJjb2RlU3R5bGVcXFwiLio/Y29sb3I9XFxcIiguKj8pXFxcIi4qPz4oLio/KTxcXC9mb250Pi9naSwgJ1tjb2RlXVtjb2xvcj0kMV0kMlsvY29sb3JdWy9jb2RlXScpO1xuICAgICAgcmVwKC88Zm9udC4qP2NsYXNzPVxcXCJxdW90ZVN0eWxlXFxcIi4qP2NvbG9yPVxcXCIoLio/KVxcXCIuKj8+KC4qPyk8XFwvZm9udD4vZ2ksICdbcXVvdGVdW2NvbG9yPSQxXSQyWy9jb2xvcl1bL3F1b3RlXScpO1xuICAgICAgcmVwKC88c3BhbiBzdHlsZT1cXFwiY29sb3I6ID8oLio/KTtcXFwiPiguKj8pPFxcL3NwYW4+L2dpLCAnW2NvbG9yPSQxXSQyWy9jb2xvcl0nKTtcbiAgICAgIHJlcCgvPGZvbnQuKj9jb2xvcj1cXFwiKC4qPylcXFwiLio/PiguKj8pPFxcL2ZvbnQ+L2dpLCAnW2NvbG9yPSQxXSQyWy9jb2xvcl0nKTtcbiAgICAgIHJlcCgvPHNwYW4gc3R5bGU9XFxcImZvbnQtc2l6ZTooLio/KTtcXFwiPiguKj8pPFxcL3NwYW4+L2dpLCAnW3NpemU9JDFdJDJbL3NpemVdJyk7XG4gICAgICByZXAoLzxmb250PiguKj8pPFxcL2ZvbnQ+L2dpLCAnJDEnKTtcbiAgICAgIHJlcCgvPGltZy4qP3NyYz1cXFwiKC4qPylcXFwiLio/XFwvPi9naSwgJ1tpbWddJDFbL2ltZ10nKTtcbiAgICAgIHJlcCgvPHNwYW4gY2xhc3M9XFxcImNvZGVTdHlsZVxcXCI+KC4qPyk8XFwvc3Bhbj4vZ2ksICdbY29kZV0kMVsvY29kZV0nKTtcbiAgICAgIHJlcCgvPHNwYW4gY2xhc3M9XFxcInF1b3RlU3R5bGVcXFwiPiguKj8pPFxcL3NwYW4+L2dpLCAnW3F1b3RlXSQxWy9xdW90ZV0nKTtcbiAgICAgIHJlcCgvPHN0cm9uZyBjbGFzcz1cXFwiY29kZVN0eWxlXFxcIj4oLio/KTxcXC9zdHJvbmc+L2dpLCAnW2NvZGVdW2JdJDFbL2JdWy9jb2RlXScpO1xuICAgICAgcmVwKC88c3Ryb25nIGNsYXNzPVxcXCJxdW90ZVN0eWxlXFxcIj4oLio/KTxcXC9zdHJvbmc+L2dpLCAnW3F1b3RlXVtiXSQxWy9iXVsvcXVvdGVdJyk7XG4gICAgICByZXAoLzxlbSBjbGFzcz1cXFwiY29kZVN0eWxlXFxcIj4oLio/KTxcXC9lbT4vZ2ksICdbY29kZV1baV0kMVsvaV1bL2NvZGVdJyk7XG4gICAgICByZXAoLzxlbSBjbGFzcz1cXFwicXVvdGVTdHlsZVxcXCI+KC4qPyk8XFwvZW0+L2dpLCAnW3F1b3RlXVtpXSQxWy9pXVsvcXVvdGVdJyk7XG4gICAgICByZXAoLzx1IGNsYXNzPVxcXCJjb2RlU3R5bGVcXFwiPiguKj8pPFxcL3U+L2dpLCAnW2NvZGVdW3VdJDFbL3VdWy9jb2RlXScpO1xuICAgICAgcmVwKC88dSBjbGFzcz1cXFwicXVvdGVTdHlsZVxcXCI+KC4qPyk8XFwvdT4vZ2ksICdbcXVvdGVdW3VdJDFbL3VdWy9xdW90ZV0nKTtcbiAgICAgIHJlcCgvPFxcLyhzdHJvbmd8Yik+L2dpLCAnWy9iXScpO1xuICAgICAgcmVwKC88KHN0cm9uZ3xiKT4vZ2ksICdbYl0nKTtcbiAgICAgIHJlcCgvPFxcLyhlbXxpKT4vZ2ksICdbL2ldJyk7XG4gICAgICByZXAoLzwoZW18aSk+L2dpLCAnW2ldJyk7XG4gICAgICByZXAoLzxcXC91Pi9naSwgJ1svdV0nKTtcbiAgICAgIHJlcCgvPHNwYW4gc3R5bGU9XFxcInRleHQtZGVjb3JhdGlvbjogP3VuZGVybGluZTtcXFwiPiguKj8pPFxcL3NwYW4+L2dpLCAnW3VdJDFbL3VdJyk7XG4gICAgICByZXAoLzx1Pi9naSwgJ1t1XScpO1xuICAgICAgcmVwKC88YmxvY2txdW90ZVtePl0qPi9naSwgJ1txdW90ZV0nKTtcbiAgICAgIHJlcCgvPFxcL2Jsb2NrcXVvdGU+L2dpLCAnWy9xdW90ZV0nKTtcbiAgICAgIHJlcCgvPGJyIFxcLz4vZ2ksICdcXG4nKTtcbiAgICAgIHJlcCgvPGJyXFwvPi9naSwgJ1xcbicpO1xuICAgICAgcmVwKC88YnI+L2dpLCAnXFxuJyk7XG4gICAgICByZXAoLzxwPi9naSwgJycpO1xuICAgICAgcmVwKC88XFwvcD4vZ2ksICdcXG4nKTtcbiAgICAgIHJlcCgvJm5ic3A7fFxcdTAwYTAvZ2ksICcgJyk7XG4gICAgICByZXAoLyZxdW90Oy9naSwgJ1wiJyk7XG4gICAgICByZXAoLyZsdDsvZ2ksICc8Jyk7XG4gICAgICByZXAoLyZndDsvZ2ksICc+Jyk7XG4gICAgICByZXAoLyZhbXA7L2dpLCAnJicpO1xuICAgICAgcmV0dXJuIHM7XG4gICAgfTtcbiAgICB2YXIgYmJjb2RlMmh0bWwgPSBmdW5jdGlvbiAocykge1xuICAgICAgcyA9IGdsb2JhbCQxLnRyaW0ocyk7XG4gICAgICB2YXIgcmVwID0gZnVuY3Rpb24gKHJlLCBzdHIpIHtcbiAgICAgICAgcyA9IHMucmVwbGFjZShyZSwgc3RyKTtcbiAgICAgIH07XG4gICAgICByZXAoL1xcbi9naSwgJzxiciAvPicpO1xuICAgICAgcmVwKC9cXFtiXFxdL2dpLCAnPHN0cm9uZz4nKTtcbiAgICAgIHJlcCgvXFxbXFwvYlxcXS9naSwgJzwvc3Ryb25nPicpO1xuICAgICAgcmVwKC9cXFtpXFxdL2dpLCAnPGVtPicpO1xuICAgICAgcmVwKC9cXFtcXC9pXFxdL2dpLCAnPC9lbT4nKTtcbiAgICAgIHJlcCgvXFxbdVxcXS9naSwgJzx1PicpO1xuICAgICAgcmVwKC9cXFtcXC91XFxdL2dpLCAnPC91PicpO1xuICAgICAgcmVwKC9cXFt1cmw9KFteXFxdXSspXFxdKC4qPylcXFtcXC91cmxcXF0vZ2ksICc8YSBocmVmPVwiJDFcIj4kMjwvYT4nKTtcbiAgICAgIHJlcCgvXFxbdXJsXFxdKC4qPylcXFtcXC91cmxcXF0vZ2ksICc8YSBocmVmPVwiJDFcIj4kMTwvYT4nKTtcbiAgICAgIHJlcCgvXFxbaW1nXFxdKC4qPylcXFtcXC9pbWdcXF0vZ2ksICc8aW1nIHNyYz1cIiQxXCIgLz4nKTtcbiAgICAgIHJlcCgvXFxbY29sb3I9KC4qPylcXF0oLio/KVxcW1xcL2NvbG9yXFxdL2dpLCAnPGZvbnQgY29sb3I9XCIkMVwiPiQyPC9mb250PicpO1xuICAgICAgcmVwKC9cXFtjb2RlXFxdKC4qPylcXFtcXC9jb2RlXFxdL2dpLCAnPHNwYW4gY2xhc3M9XCJjb2RlU3R5bGVcIj4kMTwvc3Bhbj4mbmJzcDsnKTtcbiAgICAgIHJlcCgvXFxbcXVvdGUuKj9cXF0oLio/KVxcW1xcL3F1b3RlXFxdL2dpLCAnPHNwYW4gY2xhc3M9XCJxdW90ZVN0eWxlXCI+JDE8L3NwYW4+Jm5ic3A7Jyk7XG4gICAgICByZXR1cm4gcztcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gUGx1Z2luICgpIHtcbiAgICAgIGdsb2JhbC5hZGQoJ2JiY29kZScsIGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgICAgZWRpdG9yLm9uKCdCZWZvcmVTZXRDb250ZW50JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBlLmNvbnRlbnQgPSBiYmNvZGUyaHRtbChlLmNvbnRlbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgZWRpdG9yLm9uKCdQb3N0UHJvY2VzcycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgaWYgKGUuc2V0KSB7XG4gICAgICAgICAgICBlLmNvbnRlbnQgPSBiYmNvZGUyaHRtbChlLmNvbnRlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZS5nZXQpIHtcbiAgICAgICAgICAgIGUuY29udGVudCA9IGh0bWwyYmJjb2RlKGUuY29udGVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIFBsdWdpbigpO1xuXG59KCkpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==