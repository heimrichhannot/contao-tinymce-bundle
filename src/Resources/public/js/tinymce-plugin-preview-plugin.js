(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-preview-plugin"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL3ByZXZpZXcvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxrSUFBa0ksNkJBQTZCLEtBQUssd0JBQXdCLCtEQUErRCx3QkFBd0IsTUFBTSxNQUFNLE1BQU0sU0FBUztBQUM5UztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsc0JBQXNCO0FBQ3RCLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7O0FBRUEsQ0FBQyIsImZpbGUiOiJ0aW55bWNlLXBsdWdpbi1wcmV2aWV3LXBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICpcbiAqIFZlcnNpb246IDUuNC4yICgyMDIwLTA4LTE3KVxuICovXG4oZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBnbG9iYWwgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5QbHVnaW5NYW5hZ2VyJyk7XG5cbiAgICB2YXIgZ2xvYmFsJDEgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5FbnYnKTtcblxuICAgIHZhciBnbG9iYWwkMiA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuVG9vbHMnKTtcblxuICAgIHZhciBnZXRDb250ZW50U3R5bGUgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdjb250ZW50X3N0eWxlJywgJycpO1xuICAgIH07XG4gICAgdmFyIHNob3VsZFVzZUNvbnRlbnRDc3NDb3JzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnY29udGVudF9jc3NfY29ycycsIGZhbHNlLCAnYm9vbGVhbicpO1xuICAgIH07XG4gICAgdmFyIGdldEJvZHlDbGFzc0J5SGFzaCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBib2R5Q2xhc3MgPSBlZGl0b3IuZ2V0UGFyYW0oJ2JvZHlfY2xhc3MnLCAnJywgJ2hhc2gnKTtcbiAgICAgIHJldHVybiBib2R5Q2xhc3NbZWRpdG9yLmlkXSB8fCAnJztcbiAgICB9O1xuICAgIHZhciBnZXRCb2R5Q2xhc3MgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgYm9keUNsYXNzID0gZWRpdG9yLmdldFBhcmFtKCdib2R5X2NsYXNzJywgJycsICdzdHJpbmcnKTtcbiAgICAgIGlmIChib2R5Q2xhc3MuaW5kZXhPZignPScpID09PSAtMSkge1xuICAgICAgICByZXR1cm4gYm9keUNsYXNzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGdldEJvZHlDbGFzc0J5SGFzaChlZGl0b3IpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGdldEJvZHlJZEJ5SGFzaCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBib2R5SWQgPSBlZGl0b3IuZ2V0UGFyYW0oJ2JvZHlfaWQnLCAnJywgJ2hhc2gnKTtcbiAgICAgIHJldHVybiBib2R5SWRbZWRpdG9yLmlkXSB8fCBib2R5SWQ7XG4gICAgfTtcbiAgICB2YXIgZ2V0Qm9keUlkID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGJvZHlJZCA9IGVkaXRvci5nZXRQYXJhbSgnYm9keV9pZCcsICd0aW55bWNlJywgJ3N0cmluZycpO1xuICAgICAgaWYgKGJvZHlJZC5pbmRleE9mKCc9JykgPT09IC0xKSB7XG4gICAgICAgIHJldHVybiBib2R5SWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZ2V0Qm9keUlkQnlIYXNoKGVkaXRvcik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBnZXRQcmV2aWV3SHRtbCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBoZWFkSHRtbCA9ICcnO1xuICAgICAgdmFyIGVuY29kZSA9IGVkaXRvci5kb20uZW5jb2RlO1xuICAgICAgdmFyIGNvbnRlbnRTdHlsZSA9IGdldENvbnRlbnRTdHlsZShlZGl0b3IpO1xuICAgICAgaGVhZEh0bWwgKz0gJzxiYXNlIGhyZWY9XCInICsgZW5jb2RlKGVkaXRvci5kb2N1bWVudEJhc2VVUkkuZ2V0VVJJKCkpICsgJ1wiPic7XG4gICAgICBpZiAoY29udGVudFN0eWxlKSB7XG4gICAgICAgIGhlYWRIdG1sICs9ICc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+JyArIGNvbnRlbnRTdHlsZSArICc8L3N0eWxlPic7XG4gICAgICB9XG4gICAgICB2YXIgY29ycyA9IHNob3VsZFVzZUNvbnRlbnRDc3NDb3JzKGVkaXRvcikgPyAnIGNyb3Nzb3JpZ2luPVwiYW5vbnltb3VzXCInIDogJyc7XG4gICAgICBnbG9iYWwkMi5lYWNoKGVkaXRvci5jb250ZW50Q1NTLCBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgIGhlYWRIdG1sICs9ICc8bGluayB0eXBlPVwidGV4dC9jc3NcIiByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIicgKyBlbmNvZGUoZWRpdG9yLmRvY3VtZW50QmFzZVVSSS50b0Fic29sdXRlKHVybCkpICsgJ1wiJyArIGNvcnMgKyAnPic7XG4gICAgICB9KTtcbiAgICAgIHZhciBib2R5SWQgPSBnZXRCb2R5SWQoZWRpdG9yKTtcbiAgICAgIHZhciBib2R5Q2xhc3MgPSBnZXRCb2R5Q2xhc3MoZWRpdG9yKTtcbiAgICAgIHZhciBpc01ldGFLZXlQcmVzc2VkID0gZ2xvYmFsJDEubWFjID8gJ2UubWV0YUtleScgOiAnZS5jdHJsS2V5ICYmICFlLmFsdEtleSc7XG4gICAgICB2YXIgcHJldmVudENsaWNrc09uTGlua3NTY3JpcHQgPSAnPHNjcmlwdD4nICsgJ2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgJiYgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHsnICsgJ2ZvciAodmFyIGVsbSA9IGUudGFyZ2V0OyBlbG07IGVsbSA9IGVsbS5wYXJlbnROb2RlKSB7JyArICdpZiAoZWxtLm5vZGVOYW1lID09PSBcIkFcIiAmJiAhKCcgKyBpc01ldGFLZXlQcmVzc2VkICsgJykpIHsnICsgJ2UucHJldmVudERlZmF1bHQoKTsnICsgJ30nICsgJ30nICsgJ30sIGZhbHNlKTsnICsgJzwvc2NyaXB0PiAnO1xuICAgICAgdmFyIGRpcmVjdGlvbmFsaXR5ID0gZWRpdG9yLmdldEJvZHkoKS5kaXI7XG4gICAgICB2YXIgZGlyQXR0ciA9IGRpcmVjdGlvbmFsaXR5ID8gJyBkaXI9XCInICsgZW5jb2RlKGRpcmVjdGlvbmFsaXR5KSArICdcIicgOiAnJztcbiAgICAgIHZhciBwcmV2aWV3SHRtbCA9ICc8IURPQ1RZUEUgaHRtbD4nICsgJzxodG1sPicgKyAnPGhlYWQ+JyArIGhlYWRIdG1sICsgJzwvaGVhZD4nICsgJzxib2R5IGlkPVwiJyArIGVuY29kZShib2R5SWQpICsgJ1wiIGNsYXNzPVwibWNlLWNvbnRlbnQtYm9keSAnICsgZW5jb2RlKGJvZHlDbGFzcykgKyAnXCInICsgZGlyQXR0ciArICc+JyArIGVkaXRvci5nZXRDb250ZW50KCkgKyBwcmV2ZW50Q2xpY2tzT25MaW5rc1NjcmlwdCArICc8L2JvZHk+JyArICc8L2h0bWw+JztcbiAgICAgIHJldHVybiBwcmV2aWV3SHRtbDtcbiAgICB9O1xuXG4gICAgdmFyIG9wZW4gPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgY29udGVudCA9IGdldFByZXZpZXdIdG1sKGVkaXRvcik7XG4gICAgICB2YXIgZGF0YUFwaSA9IGVkaXRvci53aW5kb3dNYW5hZ2VyLm9wZW4oe1xuICAgICAgICB0aXRsZTogJ1ByZXZpZXcnLFxuICAgICAgICBzaXplOiAnbGFyZ2UnLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgdHlwZTogJ3BhbmVsJyxcbiAgICAgICAgICBpdGVtczogW3tcbiAgICAgICAgICAgICAgbmFtZTogJ3ByZXZpZXcnLFxuICAgICAgICAgICAgICB0eXBlOiAnaWZyYW1lJyxcbiAgICAgICAgICAgICAgc2FuZGJveGVkOiB0cnVlXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LFxuICAgICAgICBidXR0b25zOiBbe1xuICAgICAgICAgICAgdHlwZTogJ2NhbmNlbCcsXG4gICAgICAgICAgICBuYW1lOiAnY2xvc2UnLFxuICAgICAgICAgICAgdGV4dDogJ0Nsb3NlJyxcbiAgICAgICAgICAgIHByaW1hcnk6IHRydWVcbiAgICAgICAgICB9XSxcbiAgICAgICAgaW5pdGlhbERhdGE6IHsgcHJldmlldzogY29udGVudCB9XG4gICAgICB9KTtcbiAgICAgIGRhdGFBcGkuZm9jdXMoJ2Nsb3NlJyk7XG4gICAgfTtcblxuICAgIHZhciByZWdpc3RlciA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIGVkaXRvci5hZGRDb21tYW5kKCdtY2VQcmV2aWV3JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBvcGVuKGVkaXRvcik7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHJlZ2lzdGVyJDEgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQnV0dG9uKCdwcmV2aWV3Jywge1xuICAgICAgICBpY29uOiAncHJldmlldycsXG4gICAgICAgIHRvb2x0aXA6ICdQcmV2aWV3JyxcbiAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZWRpdG9yLmV4ZWNDb21tYW5kKCdtY2VQcmV2aWV3Jyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZE1lbnVJdGVtKCdwcmV2aWV3Jywge1xuICAgICAgICBpY29uOiAncHJldmlldycsXG4gICAgICAgIHRleHQ6ICdQcmV2aWV3JyxcbiAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZWRpdG9yLmV4ZWNDb21tYW5kKCdtY2VQcmV2aWV3Jyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBQbHVnaW4gKCkge1xuICAgICAgZ2xvYmFsLmFkZCgncHJldmlldycsIGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgICAgcmVnaXN0ZXIoZWRpdG9yKTtcbiAgICAgICAgcmVnaXN0ZXIkMShlZGl0b3IpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgUGx1Z2luKCk7XG5cbn0oKSk7XG4iXSwic291cmNlUm9vdCI6IiJ9