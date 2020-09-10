(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-pagebreak-plugin"],{

/***/ "./node_modules/tinymce/plugins/pagebreak/plugin.js":
/*!**********************************************************!*\
  !*** ./node_modules/tinymce/plugins/pagebreak/plugin.js ***!
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
(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var global$1 = tinymce.util.Tools.resolve('tinymce.Env');

    var getSeparatorHtml = function (editor) {
      return editor.getParam('pagebreak_separator', '<!-- pagebreak -->');
    };
    var shouldSplitBlock = function (editor) {
      return editor.getParam('pagebreak_split_block', false);
    };

    var getPageBreakClass = function () {
      return 'mce-pagebreak';
    };
    var getPlaceholderHtml = function () {
      return '<img src="' + global$1.transparentSrc + '" class="' + getPageBreakClass() + '" data-mce-resize="false" data-mce-placeholder />';
    };
    var setup = function (editor) {
      var separatorHtml = getSeparatorHtml(editor);
      var pageBreakSeparatorRegExp = new RegExp(separatorHtml.replace(/[\?\.\*\[\]\(\)\{\}\+\^\$\:]/g, function (a) {
        return '\\' + a;
      }), 'gi');
      editor.on('BeforeSetContent', function (e) {
        e.content = e.content.replace(pageBreakSeparatorRegExp, getPlaceholderHtml());
      });
      editor.on('PreInit', function () {
        editor.serializer.addNodeFilter('img', function (nodes) {
          var i = nodes.length, node, className;
          while (i--) {
            node = nodes[i];
            className = node.attr('class');
            if (className && className.indexOf('mce-pagebreak') !== -1) {
              var parentNode = node.parent;
              if (editor.schema.getBlockElements()[parentNode.name] && shouldSplitBlock(editor)) {
                parentNode.type = 3;
                parentNode.value = separatorHtml;
                parentNode.raw = true;
                node.remove();
                continue;
              }
              node.type = 3;
              node.value = separatorHtml;
              node.raw = true;
            }
          }
        });
      });
    };

    var register = function (editor) {
      editor.addCommand('mcePageBreak', function () {
        if (shouldSplitBlock(editor)) {
          editor.insertContent('<p>' + getPlaceholderHtml() + '</p>');
        } else {
          editor.insertContent(getPlaceholderHtml());
        }
      });
    };

    var setup$1 = function (editor) {
      editor.on('ResolveName', function (e) {
        if (e.target.nodeName === 'IMG' && editor.dom.hasClass(e.target, getPageBreakClass())) {
          e.name = 'pagebreak';
        }
      });
    };

    var register$1 = function (editor) {
      editor.ui.registry.addButton('pagebreak', {
        icon: 'page-break',
        tooltip: 'Page break',
        onAction: function () {
          return editor.execCommand('mcePageBreak');
        }
      });
      editor.ui.registry.addMenuItem('pagebreak', {
        text: 'Page break',
        icon: 'page-break',
        onAction: function () {
          return editor.execCommand('mcePageBreak');
        }
      });
    };

    function Plugin () {
      global.add('pagebreak', function (editor) {
        register(editor);
        register$1(editor);
        setup(editor);
        setup$1(editor);
      });
    }

    Plugin();

}());


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL3BhZ2VicmVhay9wbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RkFBd0YsRUFBRTtBQUMxRjtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBLENBQUMiLCJmaWxlIjoidGlueW1jZS1wbHVnaW4tcGFnZWJyZWFrLXBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICpcbiAqIFZlcnNpb246IDUuNC4yICgyMDIwLTA4LTE3KVxuICovXG4oZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBnbG9iYWwgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5QbHVnaW5NYW5hZ2VyJyk7XG5cbiAgICB2YXIgZ2xvYmFsJDEgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5FbnYnKTtcblxuICAgIHZhciBnZXRTZXBhcmF0b3JIdG1sID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgncGFnZWJyZWFrX3NlcGFyYXRvcicsICc8IS0tIHBhZ2VicmVhayAtLT4nKTtcbiAgICB9O1xuICAgIHZhciBzaG91bGRTcGxpdEJsb2NrID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgncGFnZWJyZWFrX3NwbGl0X2Jsb2NrJywgZmFsc2UpO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0UGFnZUJyZWFrQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gJ21jZS1wYWdlYnJlYWsnO1xuICAgIH07XG4gICAgdmFyIGdldFBsYWNlaG9sZGVySHRtbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiAnPGltZyBzcmM9XCInICsgZ2xvYmFsJDEudHJhbnNwYXJlbnRTcmMgKyAnXCIgY2xhc3M9XCInICsgZ2V0UGFnZUJyZWFrQ2xhc3MoKSArICdcIiBkYXRhLW1jZS1yZXNpemU9XCJmYWxzZVwiIGRhdGEtbWNlLXBsYWNlaG9sZGVyIC8+JztcbiAgICB9O1xuICAgIHZhciBzZXR1cCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBzZXBhcmF0b3JIdG1sID0gZ2V0U2VwYXJhdG9ySHRtbChlZGl0b3IpO1xuICAgICAgdmFyIHBhZ2VCcmVha1NlcGFyYXRvclJlZ0V4cCA9IG5ldyBSZWdFeHAoc2VwYXJhdG9ySHRtbC5yZXBsYWNlKC9bXFw/XFwuXFwqXFxbXFxdXFwoXFwpXFx7XFx9XFwrXFxeXFwkXFw6XS9nLCBmdW5jdGlvbiAoYSkge1xuICAgICAgICByZXR1cm4gJ1xcXFwnICsgYTtcbiAgICAgIH0pLCAnZ2knKTtcbiAgICAgIGVkaXRvci5vbignQmVmb3JlU2V0Q29udGVudCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUuY29udGVudCA9IGUuY29udGVudC5yZXBsYWNlKHBhZ2VCcmVha1NlcGFyYXRvclJlZ0V4cCwgZ2V0UGxhY2Vob2xkZXJIdG1sKCkpO1xuICAgICAgfSk7XG4gICAgICBlZGl0b3Iub24oJ1ByZUluaXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGVkaXRvci5zZXJpYWxpemVyLmFkZE5vZGVGaWx0ZXIoJ2ltZycsIGZ1bmN0aW9uIChub2Rlcykge1xuICAgICAgICAgIHZhciBpID0gbm9kZXMubGVuZ3RoLCBub2RlLCBjbGFzc05hbWU7XG4gICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgICAgICAgY2xhc3NOYW1lID0gbm9kZS5hdHRyKCdjbGFzcycpO1xuICAgICAgICAgICAgaWYgKGNsYXNzTmFtZSAmJiBjbGFzc05hbWUuaW5kZXhPZignbWNlLXBhZ2VicmVhaycpICE9PSAtMSkge1xuICAgICAgICAgICAgICB2YXIgcGFyZW50Tm9kZSA9IG5vZGUucGFyZW50O1xuICAgICAgICAgICAgICBpZiAoZWRpdG9yLnNjaGVtYS5nZXRCbG9ja0VsZW1lbnRzKClbcGFyZW50Tm9kZS5uYW1lXSAmJiBzaG91bGRTcGxpdEJsb2NrKGVkaXRvcikpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnROb2RlLnR5cGUgPSAzO1xuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUudmFsdWUgPSBzZXBhcmF0b3JIdG1sO1xuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUucmF3ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBub2RlLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG5vZGUudHlwZSA9IDM7XG4gICAgICAgICAgICAgIG5vZGUudmFsdWUgPSBzZXBhcmF0b3JIdG1sO1xuICAgICAgICAgICAgICBub2RlLnJhdyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgcmVnaXN0ZXIgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBlZGl0b3IuYWRkQ29tbWFuZCgnbWNlUGFnZUJyZWFrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoc2hvdWxkU3BsaXRCbG9jayhlZGl0b3IpKSB7XG4gICAgICAgICAgZWRpdG9yLmluc2VydENvbnRlbnQoJzxwPicgKyBnZXRQbGFjZWhvbGRlckh0bWwoKSArICc8L3A+Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWRpdG9yLmluc2VydENvbnRlbnQoZ2V0UGxhY2Vob2xkZXJIdG1sKCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHNldHVwJDEgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBlZGl0b3Iub24oJ1Jlc29sdmVOYW1lJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0Lm5vZGVOYW1lID09PSAnSU1HJyAmJiBlZGl0b3IuZG9tLmhhc0NsYXNzKGUudGFyZ2V0LCBnZXRQYWdlQnJlYWtDbGFzcygpKSkge1xuICAgICAgICAgIGUubmFtZSA9ICdwYWdlYnJlYWsnO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHJlZ2lzdGVyJDEgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQnV0dG9uKCdwYWdlYnJlYWsnLCB7XG4gICAgICAgIGljb246ICdwYWdlLWJyZWFrJyxcbiAgICAgICAgdG9vbHRpcDogJ1BhZ2UgYnJlYWsnLFxuICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBlZGl0b3IuZXhlY0NvbW1hbmQoJ21jZVBhZ2VCcmVhaycpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRNZW51SXRlbSgncGFnZWJyZWFrJywge1xuICAgICAgICB0ZXh0OiAnUGFnZSBicmVhaycsXG4gICAgICAgIGljb246ICdwYWdlLWJyZWFrJyxcbiAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZWRpdG9yLmV4ZWNDb21tYW5kKCdtY2VQYWdlQnJlYWsnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFBsdWdpbiAoKSB7XG4gICAgICBnbG9iYWwuYWRkKCdwYWdlYnJlYWsnLCBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIHJlZ2lzdGVyKGVkaXRvcik7XG4gICAgICAgIHJlZ2lzdGVyJDEoZWRpdG9yKTtcbiAgICAgICAgc2V0dXAoZWRpdG9yKTtcbiAgICAgICAgc2V0dXAkMShlZGl0b3IpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgUGx1Z2luKCk7XG5cbn0oKSk7XG4iXSwic291cmNlUm9vdCI6IiJ9