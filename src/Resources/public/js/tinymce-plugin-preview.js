(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-preview"],{

/***/ "./node_modules/tinymce/plugins/preview/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/tinymce/plugins/preview/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Exports the "preview" plugin for usage with module loaders
// Usage:
//   CommonJS:
//     require('tinymce/plugins/preview')
//   ES2015:
//     import 'tinymce/plugins/preview'
__webpack_require__(/*! ./plugin.js */ "./node_modules/tinymce/plugins/preview/plugin.js");

/***/ }),

/***/ "./node_modules/tinymce/plugins/preview/plugin.js":
/*!********************************************************!*\
  !*** ./node_modules/tinymce/plugins/preview/plugin.js ***!
  \********************************************************/
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

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var getContentStyle = function (editor) {
      return editor.getParam('content_style', '');
    };
    var shouldUseContentCssCors = function (editor) {
      return editor.getParam('content_css_cors', false, 'boolean');
    };
    var getBodyClassByHash = function (editor) {
      var bodyClass = editor.getParam('body_class', '', 'hash');
      return bodyClass[editor.id] || '';
    };
    var getBodyClass = function (editor) {
      var bodyClass = editor.getParam('body_class', '', 'string');
      if (bodyClass.indexOf('=') === -1) {
        return bodyClass;
      } else {
        return getBodyClassByHash(editor);
      }
    };
    var getBodyIdByHash = function (editor) {
      var bodyId = editor.getParam('body_id', '', 'hash');
      return bodyId[editor.id] || bodyId;
    };
    var getBodyId = function (editor) {
      var bodyId = editor.getParam('body_id', 'tinymce', 'string');
      if (bodyId.indexOf('=') === -1) {
        return bodyId;
      } else {
        return getBodyIdByHash(editor);
      }
    };

    var getPreviewHtml = function (editor) {
      var headHtml = '';
      var encode = editor.dom.encode;
      var contentStyle = getContentStyle(editor);
      headHtml += '<base href="' + encode(editor.documentBaseURI.getURI()) + '">';
      if (contentStyle) {
        headHtml += '<style type="text/css">' + contentStyle + '</style>';
      }
      var cors = shouldUseContentCssCors(editor) ? ' crossorigin="anonymous"' : '';
      global$2.each(editor.contentCSS, function (url) {
        headHtml += '<link type="text/css" rel="stylesheet" href="' + encode(editor.documentBaseURI.toAbsolute(url)) + '"' + cors + '>';
      });
      var bodyId = getBodyId(editor);
      var bodyClass = getBodyClass(editor);
      var isMetaKeyPressed = global$1.mac ? 'e.metaKey' : 'e.ctrlKey && !e.altKey';
      var preventClicksOnLinksScript = '<script>' + 'document.addEventListener && document.addEventListener("click", function(e) {' + 'for (var elm = e.target; elm; elm = elm.parentNode) {' + 'if (elm.nodeName === "A" && !(' + isMetaKeyPressed + ')) {' + 'e.preventDefault();' + '}' + '}' + '}, false);' + '</script> ';
      var directionality = editor.getBody().dir;
      var dirAttr = directionality ? ' dir="' + encode(directionality) + '"' : '';
      var previewHtml = '<!DOCTYPE html>' + '<html>' + '<head>' + headHtml + '</head>' + '<body id="' + encode(bodyId) + '" class="mce-content-body ' + encode(bodyClass) + '"' + dirAttr + '>' + editor.getContent() + preventClicksOnLinksScript + '</body>' + '</html>';
      return previewHtml;
    };

    var open = function (editor) {
      var content = getPreviewHtml(editor);
      var dataApi = editor.windowManager.open({
        title: 'Preview',
        size: 'large',
        body: {
          type: 'panel',
          items: [{
              name: 'preview',
              type: 'iframe',
              sandboxed: true
            }]
        },
        buttons: [{
            type: 'cancel',
            name: 'close',
            text: 'Close',
            primary: true
          }],
        initialData: { preview: content }
      });
      dataApi.focus('close');
    };

    var register = function (editor) {
      editor.addCommand('mcePreview', function () {
        open(editor);
      });
    };

    var register$1 = function (editor) {
      editor.ui.registry.addButton('preview', {
        icon: 'preview',
        tooltip: 'Preview',
        onAction: function () {
          return editor.execCommand('mcePreview');
        }
      });
      editor.ui.registry.addMenuItem('preview', {
        icon: 'preview',
        text: 'Preview',
        onAction: function () {
          return editor.execCommand('mcePreview');
        }
      });
    };

    function Plugin () {
      global.add('preview', function (editor) {
        register(editor);
        register$1(editor);
      });
    }

    Plugin();

}());


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL3ByZXZpZXcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RpbnltY2UvcGx1Z2lucy9wcmV2aWV3L3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBTyxDQUFDLHFFQUFhLEU7Ozs7Ozs7Ozs7O0FDTnJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxrSUFBa0ksNkJBQTZCLEtBQUssd0JBQXdCLCtEQUErRCx3QkFBd0IsTUFBTSxNQUFNLE1BQU0sU0FBUztBQUM5UztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsc0JBQXNCO0FBQ3RCLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7O0FBRUEsQ0FBQyIsImZpbGUiOiJ0aW55bWNlLXBsdWdpbi1wcmV2aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRXhwb3J0cyB0aGUgXCJwcmV2aWV3XCIgcGx1Z2luIGZvciB1c2FnZSB3aXRoIG1vZHVsZSBsb2FkZXJzXG4vLyBVc2FnZTpcbi8vICAgQ29tbW9uSlM6XG4vLyAgICAgcmVxdWlyZSgndGlueW1jZS9wbHVnaW5zL3ByZXZpZXcnKVxuLy8gICBFUzIwMTU6XG4vLyAgICAgaW1wb3J0ICd0aW55bWNlL3BsdWdpbnMvcHJldmlldydcbnJlcXVpcmUoJy4vcGx1Z2luLmpzJyk7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIFRpbnkgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTEdQTCBvciBhIGNvbW1lcmNpYWwgbGljZW5zZS5cbiAqIEZvciBMR1BMIHNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogRm9yIGNvbW1lcmNpYWwgbGljZW5zZXMgc2VlIGh0dHBzOi8vd3d3LnRpbnkuY2xvdWQvXG4gKlxuICogVmVyc2lvbjogNS40LjIgKDIwMjAtMDgtMTcpXG4gKi9cbihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIGdsb2JhbCA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLlBsdWdpbk1hbmFnZXInKTtcblxuICAgIHZhciBnbG9iYWwkMSA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLkVudicpO1xuXG4gICAgdmFyIGdsb2JhbCQyID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UudXRpbC5Ub29scycpO1xuXG4gICAgdmFyIGdldENvbnRlbnRTdHlsZSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2NvbnRlbnRfc3R5bGUnLCAnJyk7XG4gICAgfTtcbiAgICB2YXIgc2hvdWxkVXNlQ29udGVudENzc0NvcnMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdjb250ZW50X2Nzc19jb3JzJywgZmFsc2UsICdib29sZWFuJyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0Qm9keUNsYXNzQnlIYXNoID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGJvZHlDbGFzcyA9IGVkaXRvci5nZXRQYXJhbSgnYm9keV9jbGFzcycsICcnLCAnaGFzaCcpO1xuICAgICAgcmV0dXJuIGJvZHlDbGFzc1tlZGl0b3IuaWRdIHx8ICcnO1xuICAgIH07XG4gICAgdmFyIGdldEJvZHlDbGFzcyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBib2R5Q2xhc3MgPSBlZGl0b3IuZ2V0UGFyYW0oJ2JvZHlfY2xhc3MnLCAnJywgJ3N0cmluZycpO1xuICAgICAgaWYgKGJvZHlDbGFzcy5pbmRleE9mKCc9JykgPT09IC0xKSB7XG4gICAgICAgIHJldHVybiBib2R5Q2xhc3M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZ2V0Qm9keUNsYXNzQnlIYXNoKGVkaXRvcik7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgZ2V0Qm9keUlkQnlIYXNoID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGJvZHlJZCA9IGVkaXRvci5nZXRQYXJhbSgnYm9keV9pZCcsICcnLCAnaGFzaCcpO1xuICAgICAgcmV0dXJuIGJvZHlJZFtlZGl0b3IuaWRdIHx8IGJvZHlJZDtcbiAgICB9O1xuICAgIHZhciBnZXRCb2R5SWQgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgYm9keUlkID0gZWRpdG9yLmdldFBhcmFtKCdib2R5X2lkJywgJ3RpbnltY2UnLCAnc3RyaW5nJyk7XG4gICAgICBpZiAoYm9keUlkLmluZGV4T2YoJz0nKSA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGJvZHlJZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBnZXRCb2R5SWRCeUhhc2goZWRpdG9yKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGdldFByZXZpZXdIdG1sID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGhlYWRIdG1sID0gJyc7XG4gICAgICB2YXIgZW5jb2RlID0gZWRpdG9yLmRvbS5lbmNvZGU7XG4gICAgICB2YXIgY29udGVudFN0eWxlID0gZ2V0Q29udGVudFN0eWxlKGVkaXRvcik7XG4gICAgICBoZWFkSHRtbCArPSAnPGJhc2UgaHJlZj1cIicgKyBlbmNvZGUoZWRpdG9yLmRvY3VtZW50QmFzZVVSSS5nZXRVUkkoKSkgKyAnXCI+JztcbiAgICAgIGlmIChjb250ZW50U3R5bGUpIHtcbiAgICAgICAgaGVhZEh0bWwgKz0gJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4nICsgY29udGVudFN0eWxlICsgJzwvc3R5bGU+JztcbiAgICAgIH1cbiAgICAgIHZhciBjb3JzID0gc2hvdWxkVXNlQ29udGVudENzc0NvcnMoZWRpdG9yKSA/ICcgY3Jvc3NvcmlnaW49XCJhbm9ueW1vdXNcIicgOiAnJztcbiAgICAgIGdsb2JhbCQyLmVhY2goZWRpdG9yLmNvbnRlbnRDU1MsIGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgaGVhZEh0bWwgKz0gJzxsaW5rIHR5cGU9XCJ0ZXh0L2Nzc1wiIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiJyArIGVuY29kZShlZGl0b3IuZG9jdW1lbnRCYXNlVVJJLnRvQWJzb2x1dGUodXJsKSkgKyAnXCInICsgY29ycyArICc+JztcbiAgICAgIH0pO1xuICAgICAgdmFyIGJvZHlJZCA9IGdldEJvZHlJZChlZGl0b3IpO1xuICAgICAgdmFyIGJvZHlDbGFzcyA9IGdldEJvZHlDbGFzcyhlZGl0b3IpO1xuICAgICAgdmFyIGlzTWV0YUtleVByZXNzZWQgPSBnbG9iYWwkMS5tYWMgPyAnZS5tZXRhS2V5JyA6ICdlLmN0cmxLZXkgJiYgIWUuYWx0S2V5JztcbiAgICAgIHZhciBwcmV2ZW50Q2xpY2tzT25MaW5rc1NjcmlwdCA9ICc8c2NyaXB0PicgKyAnZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAmJiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkgeycgKyAnZm9yICh2YXIgZWxtID0gZS50YXJnZXQ7IGVsbTsgZWxtID0gZWxtLnBhcmVudE5vZGUpIHsnICsgJ2lmIChlbG0ubm9kZU5hbWUgPT09IFwiQVwiICYmICEoJyArIGlzTWV0YUtleVByZXNzZWQgKyAnKSkgeycgKyAnZS5wcmV2ZW50RGVmYXVsdCgpOycgKyAnfScgKyAnfScgKyAnfSwgZmFsc2UpOycgKyAnPC9zY3JpcHQ+ICc7XG4gICAgICB2YXIgZGlyZWN0aW9uYWxpdHkgPSBlZGl0b3IuZ2V0Qm9keSgpLmRpcjtcbiAgICAgIHZhciBkaXJBdHRyID0gZGlyZWN0aW9uYWxpdHkgPyAnIGRpcj1cIicgKyBlbmNvZGUoZGlyZWN0aW9uYWxpdHkpICsgJ1wiJyA6ICcnO1xuICAgICAgdmFyIHByZXZpZXdIdG1sID0gJzwhRE9DVFlQRSBodG1sPicgKyAnPGh0bWw+JyArICc8aGVhZD4nICsgaGVhZEh0bWwgKyAnPC9oZWFkPicgKyAnPGJvZHkgaWQ9XCInICsgZW5jb2RlKGJvZHlJZCkgKyAnXCIgY2xhc3M9XCJtY2UtY29udGVudC1ib2R5ICcgKyBlbmNvZGUoYm9keUNsYXNzKSArICdcIicgKyBkaXJBdHRyICsgJz4nICsgZWRpdG9yLmdldENvbnRlbnQoKSArIHByZXZlbnRDbGlja3NPbkxpbmtzU2NyaXB0ICsgJzwvYm9keT4nICsgJzwvaHRtbD4nO1xuICAgICAgcmV0dXJuIHByZXZpZXdIdG1sO1xuICAgIH07XG5cbiAgICB2YXIgb3BlbiA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBjb250ZW50ID0gZ2V0UHJldmlld0h0bWwoZWRpdG9yKTtcbiAgICAgIHZhciBkYXRhQXBpID0gZWRpdG9yLndpbmRvd01hbmFnZXIub3Blbih7XG4gICAgICAgIHRpdGxlOiAnUHJldmlldycsXG4gICAgICAgIHNpemU6ICdsYXJnZScsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICB0eXBlOiAncGFuZWwnLFxuICAgICAgICAgIGl0ZW1zOiBbe1xuICAgICAgICAgICAgICBuYW1lOiAncHJldmlldycsXG4gICAgICAgICAgICAgIHR5cGU6ICdpZnJhbWUnLFxuICAgICAgICAgICAgICBzYW5kYm94ZWQ6IHRydWVcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sXG4gICAgICAgIGJ1dHRvbnM6IFt7XG4gICAgICAgICAgICB0eXBlOiAnY2FuY2VsJyxcbiAgICAgICAgICAgIG5hbWU6ICdjbG9zZScsXG4gICAgICAgICAgICB0ZXh0OiAnQ2xvc2UnLFxuICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZVxuICAgICAgICAgIH1dLFxuICAgICAgICBpbml0aWFsRGF0YTogeyBwcmV2aWV3OiBjb250ZW50IH1cbiAgICAgIH0pO1xuICAgICAgZGF0YUFwaS5mb2N1cygnY2xvc2UnKTtcbiAgICB9O1xuXG4gICAgdmFyIHJlZ2lzdGVyID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgZWRpdG9yLmFkZENvbW1hbmQoJ21jZVByZXZpZXcnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9wZW4oZWRpdG9yKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgcmVnaXN0ZXIkMSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRCdXR0b24oJ3ByZXZpZXcnLCB7XG4gICAgICAgIGljb246ICdwcmV2aWV3JyxcbiAgICAgICAgdG9vbHRpcDogJ1ByZXZpZXcnLFxuICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBlZGl0b3IuZXhlY0NvbW1hbmQoJ21jZVByZXZpZXcnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkTWVudUl0ZW0oJ3ByZXZpZXcnLCB7XG4gICAgICAgIGljb246ICdwcmV2aWV3JyxcbiAgICAgICAgdGV4dDogJ1ByZXZpZXcnLFxuICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBlZGl0b3IuZXhlY0NvbW1hbmQoJ21jZVByZXZpZXcnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFBsdWdpbiAoKSB7XG4gICAgICBnbG9iYWwuYWRkKCdwcmV2aWV3JywgZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICByZWdpc3RlcihlZGl0b3IpO1xuICAgICAgICByZWdpc3RlciQxKGVkaXRvcik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBQbHVnaW4oKTtcblxufSgpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=