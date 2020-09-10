(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-bbcode-plugin"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2JiY29kZS9wbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsaUJBQWlCO0FBQ2pCLGVBQWU7QUFDZixlQUFlO0FBQ2YsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtFQUErRTtBQUMvRSxxRkFBcUY7QUFDckY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7O0FBRUE7O0FBRUEsQ0FBQyIsImZpbGUiOiJ0aW55bWNlLXBsdWdpbi1iYmNvZGUtcGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIFRpbnkgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTEdQTCBvciBhIGNvbW1lcmNpYWwgbGljZW5zZS5cbiAqIEZvciBMR1BMIHNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogRm9yIGNvbW1lcmNpYWwgbGljZW5zZXMgc2VlIGh0dHBzOi8vd3d3LnRpbnkuY2xvdWQvXG4gKlxuICogVmVyc2lvbjogNS40LjIgKDIwMjAtMDgtMTcpXG4gKi9cbihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIGdsb2JhbCA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLlBsdWdpbk1hbmFnZXInKTtcblxuICAgIHZhciBnbG9iYWwkMSA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuVG9vbHMnKTtcblxuICAgIHZhciBodG1sMmJiY29kZSA9IGZ1bmN0aW9uIChzKSB7XG4gICAgICBzID0gZ2xvYmFsJDEudHJpbShzKTtcbiAgICAgIHZhciByZXAgPSBmdW5jdGlvbiAocmUsIHN0cikge1xuICAgICAgICBzID0gcy5yZXBsYWNlKHJlLCBzdHIpO1xuICAgICAgfTtcbiAgICAgIHJlcCgvPGEuKj9ocmVmPVxcXCIoLio/KVxcXCIuKj8+KC4qPyk8XFwvYT4vZ2ksICdbdXJsPSQxXSQyWy91cmxdJyk7XG4gICAgICByZXAoLzxmb250Lio/Y29sb3I9XFxcIiguKj8pXFxcIi4qP2NsYXNzPVxcXCJjb2RlU3R5bGVcXFwiLio/PiguKj8pPFxcL2ZvbnQ+L2dpLCAnW2NvZGVdW2NvbG9yPSQxXSQyWy9jb2xvcl1bL2NvZGVdJyk7XG4gICAgICByZXAoLzxmb250Lio/Y29sb3I9XFxcIiguKj8pXFxcIi4qP2NsYXNzPVxcXCJxdW90ZVN0eWxlXFxcIi4qPz4oLio/KTxcXC9mb250Pi9naSwgJ1txdW90ZV1bY29sb3I9JDFdJDJbL2NvbG9yXVsvcXVvdGVdJyk7XG4gICAgICByZXAoLzxmb250Lio/Y2xhc3M9XFxcImNvZGVTdHlsZVxcXCIuKj9jb2xvcj1cXFwiKC4qPylcXFwiLio/PiguKj8pPFxcL2ZvbnQ+L2dpLCAnW2NvZGVdW2NvbG9yPSQxXSQyWy9jb2xvcl1bL2NvZGVdJyk7XG4gICAgICByZXAoLzxmb250Lio/Y2xhc3M9XFxcInF1b3RlU3R5bGVcXFwiLio/Y29sb3I9XFxcIiguKj8pXFxcIi4qPz4oLio/KTxcXC9mb250Pi9naSwgJ1txdW90ZV1bY29sb3I9JDFdJDJbL2NvbG9yXVsvcXVvdGVdJyk7XG4gICAgICByZXAoLzxzcGFuIHN0eWxlPVxcXCJjb2xvcjogPyguKj8pO1xcXCI+KC4qPyk8XFwvc3Bhbj4vZ2ksICdbY29sb3I9JDFdJDJbL2NvbG9yXScpO1xuICAgICAgcmVwKC88Zm9udC4qP2NvbG9yPVxcXCIoLio/KVxcXCIuKj8+KC4qPyk8XFwvZm9udD4vZ2ksICdbY29sb3I9JDFdJDJbL2NvbG9yXScpO1xuICAgICAgcmVwKC88c3BhbiBzdHlsZT1cXFwiZm9udC1zaXplOiguKj8pO1xcXCI+KC4qPyk8XFwvc3Bhbj4vZ2ksICdbc2l6ZT0kMV0kMlsvc2l6ZV0nKTtcbiAgICAgIHJlcCgvPGZvbnQ+KC4qPyk8XFwvZm9udD4vZ2ksICckMScpO1xuICAgICAgcmVwKC88aW1nLio/c3JjPVxcXCIoLio/KVxcXCIuKj9cXC8+L2dpLCAnW2ltZ10kMVsvaW1nXScpO1xuICAgICAgcmVwKC88c3BhbiBjbGFzcz1cXFwiY29kZVN0eWxlXFxcIj4oLio/KTxcXC9zcGFuPi9naSwgJ1tjb2RlXSQxWy9jb2RlXScpO1xuICAgICAgcmVwKC88c3BhbiBjbGFzcz1cXFwicXVvdGVTdHlsZVxcXCI+KC4qPyk8XFwvc3Bhbj4vZ2ksICdbcXVvdGVdJDFbL3F1b3RlXScpO1xuICAgICAgcmVwKC88c3Ryb25nIGNsYXNzPVxcXCJjb2RlU3R5bGVcXFwiPiguKj8pPFxcL3N0cm9uZz4vZ2ksICdbY29kZV1bYl0kMVsvYl1bL2NvZGVdJyk7XG4gICAgICByZXAoLzxzdHJvbmcgY2xhc3M9XFxcInF1b3RlU3R5bGVcXFwiPiguKj8pPFxcL3N0cm9uZz4vZ2ksICdbcXVvdGVdW2JdJDFbL2JdWy9xdW90ZV0nKTtcbiAgICAgIHJlcCgvPGVtIGNsYXNzPVxcXCJjb2RlU3R5bGVcXFwiPiguKj8pPFxcL2VtPi9naSwgJ1tjb2RlXVtpXSQxWy9pXVsvY29kZV0nKTtcbiAgICAgIHJlcCgvPGVtIGNsYXNzPVxcXCJxdW90ZVN0eWxlXFxcIj4oLio/KTxcXC9lbT4vZ2ksICdbcXVvdGVdW2ldJDFbL2ldWy9xdW90ZV0nKTtcbiAgICAgIHJlcCgvPHUgY2xhc3M9XFxcImNvZGVTdHlsZVxcXCI+KC4qPyk8XFwvdT4vZ2ksICdbY29kZV1bdV0kMVsvdV1bL2NvZGVdJyk7XG4gICAgICByZXAoLzx1IGNsYXNzPVxcXCJxdW90ZVN0eWxlXFxcIj4oLio/KTxcXC91Pi9naSwgJ1txdW90ZV1bdV0kMVsvdV1bL3F1b3RlXScpO1xuICAgICAgcmVwKC88XFwvKHN0cm9uZ3xiKT4vZ2ksICdbL2JdJyk7XG4gICAgICByZXAoLzwoc3Ryb25nfGIpPi9naSwgJ1tiXScpO1xuICAgICAgcmVwKC88XFwvKGVtfGkpPi9naSwgJ1svaV0nKTtcbiAgICAgIHJlcCgvPChlbXxpKT4vZ2ksICdbaV0nKTtcbiAgICAgIHJlcCgvPFxcL3U+L2dpLCAnWy91XScpO1xuICAgICAgcmVwKC88c3BhbiBzdHlsZT1cXFwidGV4dC1kZWNvcmF0aW9uOiA/dW5kZXJsaW5lO1xcXCI+KC4qPyk8XFwvc3Bhbj4vZ2ksICdbdV0kMVsvdV0nKTtcbiAgICAgIHJlcCgvPHU+L2dpLCAnW3VdJyk7XG4gICAgICByZXAoLzxibG9ja3F1b3RlW14+XSo+L2dpLCAnW3F1b3RlXScpO1xuICAgICAgcmVwKC88XFwvYmxvY2txdW90ZT4vZ2ksICdbL3F1b3RlXScpO1xuICAgICAgcmVwKC88YnIgXFwvPi9naSwgJ1xcbicpO1xuICAgICAgcmVwKC88YnJcXC8+L2dpLCAnXFxuJyk7XG4gICAgICByZXAoLzxicj4vZ2ksICdcXG4nKTtcbiAgICAgIHJlcCgvPHA+L2dpLCAnJyk7XG4gICAgICByZXAoLzxcXC9wPi9naSwgJ1xcbicpO1xuICAgICAgcmVwKC8mbmJzcDt8XFx1MDBhMC9naSwgJyAnKTtcbiAgICAgIHJlcCgvJnF1b3Q7L2dpLCAnXCInKTtcbiAgICAgIHJlcCgvJmx0Oy9naSwgJzwnKTtcbiAgICAgIHJlcCgvJmd0Oy9naSwgJz4nKTtcbiAgICAgIHJlcCgvJmFtcDsvZ2ksICcmJyk7XG4gICAgICByZXR1cm4gcztcbiAgICB9O1xuICAgIHZhciBiYmNvZGUyaHRtbCA9IGZ1bmN0aW9uIChzKSB7XG4gICAgICBzID0gZ2xvYmFsJDEudHJpbShzKTtcbiAgICAgIHZhciByZXAgPSBmdW5jdGlvbiAocmUsIHN0cikge1xuICAgICAgICBzID0gcy5yZXBsYWNlKHJlLCBzdHIpO1xuICAgICAgfTtcbiAgICAgIHJlcCgvXFxuL2dpLCAnPGJyIC8+Jyk7XG4gICAgICByZXAoL1xcW2JcXF0vZ2ksICc8c3Ryb25nPicpO1xuICAgICAgcmVwKC9cXFtcXC9iXFxdL2dpLCAnPC9zdHJvbmc+Jyk7XG4gICAgICByZXAoL1xcW2lcXF0vZ2ksICc8ZW0+Jyk7XG4gICAgICByZXAoL1xcW1xcL2lcXF0vZ2ksICc8L2VtPicpO1xuICAgICAgcmVwKC9cXFt1XFxdL2dpLCAnPHU+Jyk7XG4gICAgICByZXAoL1xcW1xcL3VcXF0vZ2ksICc8L3U+Jyk7XG4gICAgICByZXAoL1xcW3VybD0oW15cXF1dKylcXF0oLio/KVxcW1xcL3VybFxcXS9naSwgJzxhIGhyZWY9XCIkMVwiPiQyPC9hPicpO1xuICAgICAgcmVwKC9cXFt1cmxcXF0oLio/KVxcW1xcL3VybFxcXS9naSwgJzxhIGhyZWY9XCIkMVwiPiQxPC9hPicpO1xuICAgICAgcmVwKC9cXFtpbWdcXF0oLio/KVxcW1xcL2ltZ1xcXS9naSwgJzxpbWcgc3JjPVwiJDFcIiAvPicpO1xuICAgICAgcmVwKC9cXFtjb2xvcj0oLio/KVxcXSguKj8pXFxbXFwvY29sb3JcXF0vZ2ksICc8Zm9udCBjb2xvcj1cIiQxXCI+JDI8L2ZvbnQ+Jyk7XG4gICAgICByZXAoL1xcW2NvZGVcXF0oLio/KVxcW1xcL2NvZGVcXF0vZ2ksICc8c3BhbiBjbGFzcz1cImNvZGVTdHlsZVwiPiQxPC9zcGFuPiZuYnNwOycpO1xuICAgICAgcmVwKC9cXFtxdW90ZS4qP1xcXSguKj8pXFxbXFwvcXVvdGVcXF0vZ2ksICc8c3BhbiBjbGFzcz1cInF1b3RlU3R5bGVcIj4kMTwvc3Bhbj4mbmJzcDsnKTtcbiAgICAgIHJldHVybiBzO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBQbHVnaW4gKCkge1xuICAgICAgZ2xvYmFsLmFkZCgnYmJjb2RlJywgZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICBlZGl0b3Iub24oJ0JlZm9yZVNldENvbnRlbnQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGUuY29udGVudCA9IGJiY29kZTJodG1sKGUuY29udGVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICBlZGl0b3Iub24oJ1Bvc3RQcm9jZXNzJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBpZiAoZS5zZXQpIHtcbiAgICAgICAgICAgIGUuY29udGVudCA9IGJiY29kZTJodG1sKGUuY29udGVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChlLmdldCkge1xuICAgICAgICAgICAgZS5jb250ZW50ID0gaHRtbDJiYmNvZGUoZS5jb250ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgUGx1Z2luKCk7XG5cbn0oKSk7XG4iXSwic291cmNlUm9vdCI6IiJ9