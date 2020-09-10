(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-legacyoutput"],{

/***/ "./node_modules/tinymce/plugins/legacyoutput/index.js":
/*!************************************************************!*\
  !*** ./node_modules/tinymce/plugins/legacyoutput/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Exports the "legacyoutput" plugin for usage with module loaders
// Usage:
//   CommonJS:
//     require('tinymce/plugins/legacyoutput')
//   ES2015:
//     import 'tinymce/plugins/legacyoutput'
__webpack_require__(/*! ./plugin.js */ "./node_modules/tinymce/plugins/legacyoutput/plugin.js");

/***/ }),

/***/ "./node_modules/tinymce/plugins/legacyoutput/plugin.js":
/*!*************************************************************!*\
  !*** ./node_modules/tinymce/plugins/legacyoutput/plugin.js ***!
  \*************************************************************/
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

    var getFontSizeFormats = function (editor) {
      return editor.getParam('fontsize_formats');
    };
    var setFontSizeFormats = function (editor, fontsize_formats) {
      editor.settings.fontsize_formats = fontsize_formats;
    };
    var getFontFormats = function (editor) {
      return editor.getParam('font_formats');
    };
    var setFontFormats = function (editor, font_formats) {
      editor.settings.font_formats = font_formats;
    };
    var getFontSizeStyleValues = function (editor) {
      return editor.getParam('font_size_style_values', 'xx-small,x-small,small,medium,large,x-large,xx-large');
    };
    var setInlineStyles = function (editor, inline_styles) {
      editor.settings.inline_styles = inline_styles;
    };

    var overrideFormats = function (editor) {
      var alignElements = 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table', fontSizes = global$1.explode(getFontSizeStyleValues(editor)), schema = editor.schema;
      editor.formatter.register({
        alignleft: {
          selector: alignElements,
          attributes: { align: 'left' }
        },
        aligncenter: {
          selector: alignElements,
          attributes: { align: 'center' }
        },
        alignright: {
          selector: alignElements,
          attributes: { align: 'right' }
        },
        alignjustify: {
          selector: alignElements,
          attributes: { align: 'justify' }
        },
        bold: [
          {
            inline: 'b',
            remove: 'all',
            preserve_attributes: [
              'class',
              'style'
            ]
          },
          {
            inline: 'strong',
            remove: 'all',
            preserve_attributes: [
              'class',
              'style'
            ]
          },
          {
            inline: 'span',
            styles: { fontWeight: 'bold' }
          }
        ],
        italic: [
          {
            inline: 'i',
            remove: 'all',
            preserve_attributes: [
              'class',
              'style'
            ]
          },
          {
            inline: 'em',
            remove: 'all',
            preserve_attributes: [
              'class',
              'style'
            ]
          },
          {
            inline: 'span',
            styles: { fontStyle: 'italic' }
          }
        ],
        underline: [
          {
            inline: 'u',
            remove: 'all',
            preserve_attributes: [
              'class',
              'style'
            ]
          },
          {
            inline: 'span',
            styles: { textDecoration: 'underline' },
            exact: true
          }
        ],
        strikethrough: [
          {
            inline: 'strike',
            remove: 'all',
            preserve_attributes: [
              'class',
              'style'
            ]
          },
          {
            inline: 'span',
            styles: { textDecoration: 'line-through' },
            exact: true
          }
        ],
        fontname: {
          inline: 'font',
          toggle: false,
          attributes: { face: '%value' }
        },
        fontsize: {
          inline: 'font',
          toggle: false,
          attributes: {
            size: function (vars) {
              return String(global$1.inArray(fontSizes, vars.value) + 1);
            }
          }
        },
        forecolor: {
          inline: 'font',
          attributes: { color: '%value' },
          links: true,
          remove_similar: true,
          clear_child_styles: true
        },
        hilitecolor: {
          inline: 'font',
          styles: { backgroundColor: '%value' },
          links: true,
          remove_similar: true,
          clear_child_styles: true
        }
      });
      global$1.each('b,i,u,strike'.split(','), function (name) {
        schema.addValidElements(name + '[*]');
      });
      if (!schema.getElementRule('font')) {
        schema.addValidElements('font[face|size|color|style]');
      }
      global$1.each(alignElements.split(','), function (name) {
        var rule = schema.getElementRule(name);
        if (rule) {
          if (!rule.attributes.align) {
            rule.attributes.align = {};
            rule.attributesOrder.push('align');
          }
        }
      });
    };
    var overrideSettings = function (editor) {
      var defaultFontsizeFormats = '8pt=1 10pt=2 12pt=3 14pt=4 18pt=5 24pt=6 36pt=7';
      var defaultFontsFormats = 'Andale Mono=andale mono,monospace;' + 'Arial=arial,helvetica,sans-serif;' + 'Arial Black=arial black,sans-serif;' + 'Book Antiqua=book antiqua,palatino,serif;' + 'Comic Sans MS=comic sans ms,sans-serif;' + 'Courier New=courier new,courier,monospace;' + 'Georgia=georgia,palatino,serif;' + 'Helvetica=helvetica,arial,sans-serif;' + 'Impact=impact,sans-serif;' + 'Symbol=symbol;' + 'Tahoma=tahoma,arial,helvetica,sans-serif;' + 'Terminal=terminal,monaco,monospace;' + 'Times New Roman=times new roman,times,serif;' + 'Trebuchet MS=trebuchet ms,geneva,sans-serif;' + 'Verdana=verdana,geneva,sans-serif;' + 'Webdings=webdings;' + 'Wingdings=wingdings,zapf dingbats';
      setInlineStyles(editor, false);
      if (!getFontSizeFormats(editor)) {
        setFontSizeFormats(editor, defaultFontsizeFormats);
      }
      if (!getFontFormats(editor)) {
        setFontFormats(editor, defaultFontsFormats);
      }
    };
    var setup = function (editor) {
      overrideSettings(editor);
      editor.on('PreInit', function () {
        return overrideFormats(editor);
      });
    };

    function Plugin () {
      global.add('legacyoutput', function (editor) {
        setup(editor);
      });
    }

    Plugin();

}());


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2xlZ2FjeW91dHB1dC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2xlZ2FjeW91dHB1dC9wbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQU8sQ0FBQywwRUFBYSxFOzs7Ozs7Ozs7OztBQ05yQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QixTQUFTO0FBQ1Q7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QixTQUFTO0FBQ1Q7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QixTQUFTO0FBQ1Q7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLHFCQUFxQiw4QkFBOEI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EscUJBQXFCLGlDQUFpQztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHVCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxtQkFBbUIsNEJBQTRCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxtRUFBbUUsc0NBQXNDLHdDQUF3Qyw4Q0FBOEMsNENBQTRDLCtDQUErQyxvQ0FBb0MsMENBQTBDLDhCQUE4QixtQkFBbUIsOENBQThDLHdDQUF3QyxpREFBaUQsaURBQWlELHVDQUF1Qyx1QkFBdUI7QUFDL29CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7O0FBRUEsQ0FBQyIsImZpbGUiOiJ0aW55bWNlLXBsdWdpbi1sZWdhY3lvdXRwdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBFeHBvcnRzIHRoZSBcImxlZ2FjeW91dHB1dFwiIHBsdWdpbiBmb3IgdXNhZ2Ugd2l0aCBtb2R1bGUgbG9hZGVyc1xuLy8gVXNhZ2U6XG4vLyAgIENvbW1vbkpTOlxuLy8gICAgIHJlcXVpcmUoJ3RpbnltY2UvcGx1Z2lucy9sZWdhY3lvdXRwdXQnKVxuLy8gICBFUzIwMTU6XG4vLyAgICAgaW1wb3J0ICd0aW55bWNlL3BsdWdpbnMvbGVnYWN5b3V0cHV0J1xucmVxdWlyZSgnLi9wbHVnaW4uanMnKTsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqXG4gKiBWZXJzaW9uOiA1LjQuMiAoMjAyMC0wOC0xNylcbiAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgZ2xvYmFsID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuUGx1Z2luTWFuYWdlcicpO1xuXG4gICAgdmFyIGdsb2JhbCQxID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UudXRpbC5Ub29scycpO1xuXG4gICAgdmFyIGdldEZvbnRTaXplRm9ybWF0cyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2ZvbnRzaXplX2Zvcm1hdHMnKTtcbiAgICB9O1xuICAgIHZhciBzZXRGb250U2l6ZUZvcm1hdHMgPSBmdW5jdGlvbiAoZWRpdG9yLCBmb250c2l6ZV9mb3JtYXRzKSB7XG4gICAgICBlZGl0b3Iuc2V0dGluZ3MuZm9udHNpemVfZm9ybWF0cyA9IGZvbnRzaXplX2Zvcm1hdHM7XG4gICAgfTtcbiAgICB2YXIgZ2V0Rm9udEZvcm1hdHMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdmb250X2Zvcm1hdHMnKTtcbiAgICB9O1xuICAgIHZhciBzZXRGb250Rm9ybWF0cyA9IGZ1bmN0aW9uIChlZGl0b3IsIGZvbnRfZm9ybWF0cykge1xuICAgICAgZWRpdG9yLnNldHRpbmdzLmZvbnRfZm9ybWF0cyA9IGZvbnRfZm9ybWF0cztcbiAgICB9O1xuICAgIHZhciBnZXRGb250U2l6ZVN0eWxlVmFsdWVzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnZm9udF9zaXplX3N0eWxlX3ZhbHVlcycsICd4eC1zbWFsbCx4LXNtYWxsLHNtYWxsLG1lZGl1bSxsYXJnZSx4LWxhcmdlLHh4LWxhcmdlJyk7XG4gICAgfTtcbiAgICB2YXIgc2V0SW5saW5lU3R5bGVzID0gZnVuY3Rpb24gKGVkaXRvciwgaW5saW5lX3N0eWxlcykge1xuICAgICAgZWRpdG9yLnNldHRpbmdzLmlubGluZV9zdHlsZXMgPSBpbmxpbmVfc3R5bGVzO1xuICAgIH07XG5cbiAgICB2YXIgb3ZlcnJpZGVGb3JtYXRzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGFsaWduRWxlbWVudHMgPSAncCxoMSxoMixoMyxoNCxoNSxoNix0ZCx0aCxkaXYsdWwsb2wsbGksdGFibGUnLCBmb250U2l6ZXMgPSBnbG9iYWwkMS5leHBsb2RlKGdldEZvbnRTaXplU3R5bGVWYWx1ZXMoZWRpdG9yKSksIHNjaGVtYSA9IGVkaXRvci5zY2hlbWE7XG4gICAgICBlZGl0b3IuZm9ybWF0dGVyLnJlZ2lzdGVyKHtcbiAgICAgICAgYWxpZ25sZWZ0OiB7XG4gICAgICAgICAgc2VsZWN0b3I6IGFsaWduRWxlbWVudHMsXG4gICAgICAgICAgYXR0cmlidXRlczogeyBhbGlnbjogJ2xlZnQnIH1cbiAgICAgICAgfSxcbiAgICAgICAgYWxpZ25jZW50ZXI6IHtcbiAgICAgICAgICBzZWxlY3RvcjogYWxpZ25FbGVtZW50cyxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7IGFsaWduOiAnY2VudGVyJyB9XG4gICAgICAgIH0sXG4gICAgICAgIGFsaWducmlnaHQ6IHtcbiAgICAgICAgICBzZWxlY3RvcjogYWxpZ25FbGVtZW50cyxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7IGFsaWduOiAncmlnaHQnIH1cbiAgICAgICAgfSxcbiAgICAgICAgYWxpZ25qdXN0aWZ5OiB7XG4gICAgICAgICAgc2VsZWN0b3I6IGFsaWduRWxlbWVudHMsXG4gICAgICAgICAgYXR0cmlidXRlczogeyBhbGlnbjogJ2p1c3RpZnknIH1cbiAgICAgICAgfSxcbiAgICAgICAgYm9sZDogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlubGluZTogJ2InLFxuICAgICAgICAgICAgcmVtb3ZlOiAnYWxsJyxcbiAgICAgICAgICAgIHByZXNlcnZlX2F0dHJpYnV0ZXM6IFtcbiAgICAgICAgICAgICAgJ2NsYXNzJyxcbiAgICAgICAgICAgICAgJ3N0eWxlJ1xuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW5saW5lOiAnc3Ryb25nJyxcbiAgICAgICAgICAgIHJlbW92ZTogJ2FsbCcsXG4gICAgICAgICAgICBwcmVzZXJ2ZV9hdHRyaWJ1dGVzOiBbXG4gICAgICAgICAgICAgICdjbGFzcycsXG4gICAgICAgICAgICAgICdzdHlsZSdcbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlubGluZTogJ3NwYW4nLFxuICAgICAgICAgICAgc3R5bGVzOiB7IGZvbnRXZWlnaHQ6ICdib2xkJyB9XG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBpdGFsaWM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbmxpbmU6ICdpJyxcbiAgICAgICAgICAgIHJlbW92ZTogJ2FsbCcsXG4gICAgICAgICAgICBwcmVzZXJ2ZV9hdHRyaWJ1dGVzOiBbXG4gICAgICAgICAgICAgICdjbGFzcycsXG4gICAgICAgICAgICAgICdzdHlsZSdcbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlubGluZTogJ2VtJyxcbiAgICAgICAgICAgIHJlbW92ZTogJ2FsbCcsXG4gICAgICAgICAgICBwcmVzZXJ2ZV9hdHRyaWJ1dGVzOiBbXG4gICAgICAgICAgICAgICdjbGFzcycsXG4gICAgICAgICAgICAgICdzdHlsZSdcbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlubGluZTogJ3NwYW4nLFxuICAgICAgICAgICAgc3R5bGVzOiB7IGZvbnRTdHlsZTogJ2l0YWxpYycgfVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgdW5kZXJsaW5lOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW5saW5lOiAndScsXG4gICAgICAgICAgICByZW1vdmU6ICdhbGwnLFxuICAgICAgICAgICAgcHJlc2VydmVfYXR0cmlidXRlczogW1xuICAgICAgICAgICAgICAnY2xhc3MnLFxuICAgICAgICAgICAgICAnc3R5bGUnXG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbmxpbmU6ICdzcGFuJyxcbiAgICAgICAgICAgIHN0eWxlczogeyB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScgfSxcbiAgICAgICAgICAgIGV4YWN0OiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBzdHJpa2V0aHJvdWdoOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW5saW5lOiAnc3RyaWtlJyxcbiAgICAgICAgICAgIHJlbW92ZTogJ2FsbCcsXG4gICAgICAgICAgICBwcmVzZXJ2ZV9hdHRyaWJ1dGVzOiBbXG4gICAgICAgICAgICAgICdjbGFzcycsXG4gICAgICAgICAgICAgICdzdHlsZSdcbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlubGluZTogJ3NwYW4nLFxuICAgICAgICAgICAgc3R5bGVzOiB7IHRleHREZWNvcmF0aW9uOiAnbGluZS10aHJvdWdoJyB9LFxuICAgICAgICAgICAgZXhhY3Q6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGZvbnRuYW1lOiB7XG4gICAgICAgICAgaW5saW5lOiAnZm9udCcsXG4gICAgICAgICAgdG9nZ2xlOiBmYWxzZSxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7IGZhY2U6ICcldmFsdWUnIH1cbiAgICAgICAgfSxcbiAgICAgICAgZm9udHNpemU6IHtcbiAgICAgICAgICBpbmxpbmU6ICdmb250JyxcbiAgICAgICAgICB0b2dnbGU6IGZhbHNlLFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgIHNpemU6IGZ1bmN0aW9uICh2YXJzKSB7XG4gICAgICAgICAgICAgIHJldHVybiBTdHJpbmcoZ2xvYmFsJDEuaW5BcnJheShmb250U2l6ZXMsIHZhcnMudmFsdWUpICsgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBmb3JlY29sb3I6IHtcbiAgICAgICAgICBpbmxpbmU6ICdmb250JyxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7IGNvbG9yOiAnJXZhbHVlJyB9LFxuICAgICAgICAgIGxpbmtzOiB0cnVlLFxuICAgICAgICAgIHJlbW92ZV9zaW1pbGFyOiB0cnVlLFxuICAgICAgICAgIGNsZWFyX2NoaWxkX3N0eWxlczogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBoaWxpdGVjb2xvcjoge1xuICAgICAgICAgIGlubGluZTogJ2ZvbnQnLFxuICAgICAgICAgIHN0eWxlczogeyBiYWNrZ3JvdW5kQ29sb3I6ICcldmFsdWUnIH0sXG4gICAgICAgICAgbGlua3M6IHRydWUsXG4gICAgICAgICAgcmVtb3ZlX3NpbWlsYXI6IHRydWUsXG4gICAgICAgICAgY2xlYXJfY2hpbGRfc3R5bGVzOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZ2xvYmFsJDEuZWFjaCgnYixpLHUsc3RyaWtlJy5zcGxpdCgnLCcpLCBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBzY2hlbWEuYWRkVmFsaWRFbGVtZW50cyhuYW1lICsgJ1sqXScpO1xuICAgICAgfSk7XG4gICAgICBpZiAoIXNjaGVtYS5nZXRFbGVtZW50UnVsZSgnZm9udCcpKSB7XG4gICAgICAgIHNjaGVtYS5hZGRWYWxpZEVsZW1lbnRzKCdmb250W2ZhY2V8c2l6ZXxjb2xvcnxzdHlsZV0nKTtcbiAgICAgIH1cbiAgICAgIGdsb2JhbCQxLmVhY2goYWxpZ25FbGVtZW50cy5zcGxpdCgnLCcpLCBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB2YXIgcnVsZSA9IHNjaGVtYS5nZXRFbGVtZW50UnVsZShuYW1lKTtcbiAgICAgICAgaWYgKHJ1bGUpIHtcbiAgICAgICAgICBpZiAoIXJ1bGUuYXR0cmlidXRlcy5hbGlnbikge1xuICAgICAgICAgICAgcnVsZS5hdHRyaWJ1dGVzLmFsaWduID0ge307XG4gICAgICAgICAgICBydWxlLmF0dHJpYnV0ZXNPcmRlci5wdXNoKCdhbGlnbicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgb3ZlcnJpZGVTZXR0aW5ncyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBkZWZhdWx0Rm9udHNpemVGb3JtYXRzID0gJzhwdD0xIDEwcHQ9MiAxMnB0PTMgMTRwdD00IDE4cHQ9NSAyNHB0PTYgMzZwdD03JztcbiAgICAgIHZhciBkZWZhdWx0Rm9udHNGb3JtYXRzID0gJ0FuZGFsZSBNb25vPWFuZGFsZSBtb25vLG1vbm9zcGFjZTsnICsgJ0FyaWFsPWFyaWFsLGhlbHZldGljYSxzYW5zLXNlcmlmOycgKyAnQXJpYWwgQmxhY2s9YXJpYWwgYmxhY2ssc2Fucy1zZXJpZjsnICsgJ0Jvb2sgQW50aXF1YT1ib29rIGFudGlxdWEscGFsYXRpbm8sc2VyaWY7JyArICdDb21pYyBTYW5zIE1TPWNvbWljIHNhbnMgbXMsc2Fucy1zZXJpZjsnICsgJ0NvdXJpZXIgTmV3PWNvdXJpZXIgbmV3LGNvdXJpZXIsbW9ub3NwYWNlOycgKyAnR2VvcmdpYT1nZW9yZ2lhLHBhbGF0aW5vLHNlcmlmOycgKyAnSGVsdmV0aWNhPWhlbHZldGljYSxhcmlhbCxzYW5zLXNlcmlmOycgKyAnSW1wYWN0PWltcGFjdCxzYW5zLXNlcmlmOycgKyAnU3ltYm9sPXN5bWJvbDsnICsgJ1RhaG9tYT10YWhvbWEsYXJpYWwsaGVsdmV0aWNhLHNhbnMtc2VyaWY7JyArICdUZXJtaW5hbD10ZXJtaW5hbCxtb25hY28sbW9ub3NwYWNlOycgKyAnVGltZXMgTmV3IFJvbWFuPXRpbWVzIG5ldyByb21hbix0aW1lcyxzZXJpZjsnICsgJ1RyZWJ1Y2hldCBNUz10cmVidWNoZXQgbXMsZ2VuZXZhLHNhbnMtc2VyaWY7JyArICdWZXJkYW5hPXZlcmRhbmEsZ2VuZXZhLHNhbnMtc2VyaWY7JyArICdXZWJkaW5ncz13ZWJkaW5nczsnICsgJ1dpbmdkaW5ncz13aW5nZGluZ3MsemFwZiBkaW5nYmF0cyc7XG4gICAgICBzZXRJbmxpbmVTdHlsZXMoZWRpdG9yLCBmYWxzZSk7XG4gICAgICBpZiAoIWdldEZvbnRTaXplRm9ybWF0cyhlZGl0b3IpKSB7XG4gICAgICAgIHNldEZvbnRTaXplRm9ybWF0cyhlZGl0b3IsIGRlZmF1bHRGb250c2l6ZUZvcm1hdHMpO1xuICAgICAgfVxuICAgICAgaWYgKCFnZXRGb250Rm9ybWF0cyhlZGl0b3IpKSB7XG4gICAgICAgIHNldEZvbnRGb3JtYXRzKGVkaXRvciwgZGVmYXVsdEZvbnRzRm9ybWF0cyk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgc2V0dXAgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBvdmVycmlkZVNldHRpbmdzKGVkaXRvcik7XG4gICAgICBlZGl0b3Iub24oJ1ByZUluaXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBvdmVycmlkZUZvcm1hdHMoZWRpdG9yKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBQbHVnaW4gKCkge1xuICAgICAgZ2xvYmFsLmFkZCgnbGVnYWN5b3V0cHV0JywgZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICBzZXR1cChlZGl0b3IpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgUGx1Z2luKCk7XG5cbn0oKSk7XG4iXSwic291cmNlUm9vdCI6IiJ9