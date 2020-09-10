(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-legacyoutput-plugin"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2xlZ2FjeW91dHB1dC9wbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkIsU0FBUztBQUNUO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkIsU0FBUztBQUNUO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkIsU0FBUztBQUNUO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxxQkFBcUIsOEJBQThCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLHFCQUFxQixpQ0FBaUM7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSx1QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsbUJBQW1CLDRCQUE0QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsbUVBQW1FLHNDQUFzQyx3Q0FBd0MsOENBQThDLDRDQUE0QywrQ0FBK0Msb0NBQW9DLDBDQUEwQyw4QkFBOEIsbUJBQW1CLDhDQUE4Qyx3Q0FBd0MsaURBQWlELGlEQUFpRCx1Q0FBdUMsdUJBQXVCO0FBQy9vQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBLENBQUMiLCJmaWxlIjoidGlueW1jZS1wbHVnaW4tbGVnYWN5b3V0cHV0LXBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICpcbiAqIFZlcnNpb246IDUuNC4yICgyMDIwLTA4LTE3KVxuICovXG4oZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBnbG9iYWwgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5QbHVnaW5NYW5hZ2VyJyk7XG5cbiAgICB2YXIgZ2xvYmFsJDEgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS51dGlsLlRvb2xzJyk7XG5cbiAgICB2YXIgZ2V0Rm9udFNpemVGb3JtYXRzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnZm9udHNpemVfZm9ybWF0cycpO1xuICAgIH07XG4gICAgdmFyIHNldEZvbnRTaXplRm9ybWF0cyA9IGZ1bmN0aW9uIChlZGl0b3IsIGZvbnRzaXplX2Zvcm1hdHMpIHtcbiAgICAgIGVkaXRvci5zZXR0aW5ncy5mb250c2l6ZV9mb3JtYXRzID0gZm9udHNpemVfZm9ybWF0cztcbiAgICB9O1xuICAgIHZhciBnZXRGb250Rm9ybWF0cyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2ZvbnRfZm9ybWF0cycpO1xuICAgIH07XG4gICAgdmFyIHNldEZvbnRGb3JtYXRzID0gZnVuY3Rpb24gKGVkaXRvciwgZm9udF9mb3JtYXRzKSB7XG4gICAgICBlZGl0b3Iuc2V0dGluZ3MuZm9udF9mb3JtYXRzID0gZm9udF9mb3JtYXRzO1xuICAgIH07XG4gICAgdmFyIGdldEZvbnRTaXplU3R5bGVWYWx1ZXMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdmb250X3NpemVfc3R5bGVfdmFsdWVzJywgJ3h4LXNtYWxsLHgtc21hbGwsc21hbGwsbWVkaXVtLGxhcmdlLHgtbGFyZ2UseHgtbGFyZ2UnKTtcbiAgICB9O1xuICAgIHZhciBzZXRJbmxpbmVTdHlsZXMgPSBmdW5jdGlvbiAoZWRpdG9yLCBpbmxpbmVfc3R5bGVzKSB7XG4gICAgICBlZGl0b3Iuc2V0dGluZ3MuaW5saW5lX3N0eWxlcyA9IGlubGluZV9zdHlsZXM7XG4gICAgfTtcblxuICAgIHZhciBvdmVycmlkZUZvcm1hdHMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgYWxpZ25FbGVtZW50cyA9ICdwLGgxLGgyLGgzLGg0LGg1LGg2LHRkLHRoLGRpdix1bCxvbCxsaSx0YWJsZScsIGZvbnRTaXplcyA9IGdsb2JhbCQxLmV4cGxvZGUoZ2V0Rm9udFNpemVTdHlsZVZhbHVlcyhlZGl0b3IpKSwgc2NoZW1hID0gZWRpdG9yLnNjaGVtYTtcbiAgICAgIGVkaXRvci5mb3JtYXR0ZXIucmVnaXN0ZXIoe1xuICAgICAgICBhbGlnbmxlZnQ6IHtcbiAgICAgICAgICBzZWxlY3RvcjogYWxpZ25FbGVtZW50cyxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7IGFsaWduOiAnbGVmdCcgfVxuICAgICAgICB9LFxuICAgICAgICBhbGlnbmNlbnRlcjoge1xuICAgICAgICAgIHNlbGVjdG9yOiBhbGlnbkVsZW1lbnRzLFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IHsgYWxpZ246ICdjZW50ZXInIH1cbiAgICAgICAgfSxcbiAgICAgICAgYWxpZ25yaWdodDoge1xuICAgICAgICAgIHNlbGVjdG9yOiBhbGlnbkVsZW1lbnRzLFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IHsgYWxpZ246ICdyaWdodCcgfVxuICAgICAgICB9LFxuICAgICAgICBhbGlnbmp1c3RpZnk6IHtcbiAgICAgICAgICBzZWxlY3RvcjogYWxpZ25FbGVtZW50cyxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7IGFsaWduOiAnanVzdGlmeScgfVxuICAgICAgICB9LFxuICAgICAgICBib2xkOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW5saW5lOiAnYicsXG4gICAgICAgICAgICByZW1vdmU6ICdhbGwnLFxuICAgICAgICAgICAgcHJlc2VydmVfYXR0cmlidXRlczogW1xuICAgICAgICAgICAgICAnY2xhc3MnLFxuICAgICAgICAgICAgICAnc3R5bGUnXG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbmxpbmU6ICdzdHJvbmcnLFxuICAgICAgICAgICAgcmVtb3ZlOiAnYWxsJyxcbiAgICAgICAgICAgIHByZXNlcnZlX2F0dHJpYnV0ZXM6IFtcbiAgICAgICAgICAgICAgJ2NsYXNzJyxcbiAgICAgICAgICAgICAgJ3N0eWxlJ1xuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW5saW5lOiAnc3BhbicsXG4gICAgICAgICAgICBzdHlsZXM6IHsgZm9udFdlaWdodDogJ2JvbGQnIH1cbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGl0YWxpYzogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlubGluZTogJ2knLFxuICAgICAgICAgICAgcmVtb3ZlOiAnYWxsJyxcbiAgICAgICAgICAgIHByZXNlcnZlX2F0dHJpYnV0ZXM6IFtcbiAgICAgICAgICAgICAgJ2NsYXNzJyxcbiAgICAgICAgICAgICAgJ3N0eWxlJ1xuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW5saW5lOiAnZW0nLFxuICAgICAgICAgICAgcmVtb3ZlOiAnYWxsJyxcbiAgICAgICAgICAgIHByZXNlcnZlX2F0dHJpYnV0ZXM6IFtcbiAgICAgICAgICAgICAgJ2NsYXNzJyxcbiAgICAgICAgICAgICAgJ3N0eWxlJ1xuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW5saW5lOiAnc3BhbicsXG4gICAgICAgICAgICBzdHlsZXM6IHsgZm9udFN0eWxlOiAnaXRhbGljJyB9XG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICB1bmRlcmxpbmU6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbmxpbmU6ICd1JyxcbiAgICAgICAgICAgIHJlbW92ZTogJ2FsbCcsXG4gICAgICAgICAgICBwcmVzZXJ2ZV9hdHRyaWJ1dGVzOiBbXG4gICAgICAgICAgICAgICdjbGFzcycsXG4gICAgICAgICAgICAgICdzdHlsZSdcbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlubGluZTogJ3NwYW4nLFxuICAgICAgICAgICAgc3R5bGVzOiB7IHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJyB9LFxuICAgICAgICAgICAgZXhhY3Q6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIHN0cmlrZXRocm91Z2g6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbmxpbmU6ICdzdHJpa2UnLFxuICAgICAgICAgICAgcmVtb3ZlOiAnYWxsJyxcbiAgICAgICAgICAgIHByZXNlcnZlX2F0dHJpYnV0ZXM6IFtcbiAgICAgICAgICAgICAgJ2NsYXNzJyxcbiAgICAgICAgICAgICAgJ3N0eWxlJ1xuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW5saW5lOiAnc3BhbicsXG4gICAgICAgICAgICBzdHlsZXM6IHsgdGV4dERlY29yYXRpb246ICdsaW5lLXRocm91Z2gnIH0sXG4gICAgICAgICAgICBleGFjdDogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgZm9udG5hbWU6IHtcbiAgICAgICAgICBpbmxpbmU6ICdmb250JyxcbiAgICAgICAgICB0b2dnbGU6IGZhbHNlLFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IHsgZmFjZTogJyV2YWx1ZScgfVxuICAgICAgICB9LFxuICAgICAgICBmb250c2l6ZToge1xuICAgICAgICAgIGlubGluZTogJ2ZvbnQnLFxuICAgICAgICAgIHRvZ2dsZTogZmFsc2UsXG4gICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgc2l6ZTogZnVuY3Rpb24gKHZhcnMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhnbG9iYWwkMS5pbkFycmF5KGZvbnRTaXplcywgdmFycy52YWx1ZSkgKyAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZvcmVjb2xvcjoge1xuICAgICAgICAgIGlubGluZTogJ2ZvbnQnLFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IHsgY29sb3I6ICcldmFsdWUnIH0sXG4gICAgICAgICAgbGlua3M6IHRydWUsXG4gICAgICAgICAgcmVtb3ZlX3NpbWlsYXI6IHRydWUsXG4gICAgICAgICAgY2xlYXJfY2hpbGRfc3R5bGVzOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIGhpbGl0ZWNvbG9yOiB7XG4gICAgICAgICAgaW5saW5lOiAnZm9udCcsXG4gICAgICAgICAgc3R5bGVzOiB7IGJhY2tncm91bmRDb2xvcjogJyV2YWx1ZScgfSxcbiAgICAgICAgICBsaW5rczogdHJ1ZSxcbiAgICAgICAgICByZW1vdmVfc2ltaWxhcjogdHJ1ZSxcbiAgICAgICAgICBjbGVhcl9jaGlsZF9zdHlsZXM6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBnbG9iYWwkMS5lYWNoKCdiLGksdSxzdHJpa2UnLnNwbGl0KCcsJyksIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHNjaGVtYS5hZGRWYWxpZEVsZW1lbnRzKG5hbWUgKyAnWypdJyk7XG4gICAgICB9KTtcbiAgICAgIGlmICghc2NoZW1hLmdldEVsZW1lbnRSdWxlKCdmb250JykpIHtcbiAgICAgICAgc2NoZW1hLmFkZFZhbGlkRWxlbWVudHMoJ2ZvbnRbZmFjZXxzaXplfGNvbG9yfHN0eWxlXScpO1xuICAgICAgfVxuICAgICAgZ2xvYmFsJDEuZWFjaChhbGlnbkVsZW1lbnRzLnNwbGl0KCcsJyksIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHZhciBydWxlID0gc2NoZW1hLmdldEVsZW1lbnRSdWxlKG5hbWUpO1xuICAgICAgICBpZiAocnVsZSkge1xuICAgICAgICAgIGlmICghcnVsZS5hdHRyaWJ1dGVzLmFsaWduKSB7XG4gICAgICAgICAgICBydWxlLmF0dHJpYnV0ZXMuYWxpZ24gPSB7fTtcbiAgICAgICAgICAgIHJ1bGUuYXR0cmlidXRlc09yZGVyLnB1c2goJ2FsaWduJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBvdmVycmlkZVNldHRpbmdzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGRlZmF1bHRGb250c2l6ZUZvcm1hdHMgPSAnOHB0PTEgMTBwdD0yIDEycHQ9MyAxNHB0PTQgMThwdD01IDI0cHQ9NiAzNnB0PTcnO1xuICAgICAgdmFyIGRlZmF1bHRGb250c0Zvcm1hdHMgPSAnQW5kYWxlIE1vbm89YW5kYWxlIG1vbm8sbW9ub3NwYWNlOycgKyAnQXJpYWw9YXJpYWwsaGVsdmV0aWNhLHNhbnMtc2VyaWY7JyArICdBcmlhbCBCbGFjaz1hcmlhbCBibGFjayxzYW5zLXNlcmlmOycgKyAnQm9vayBBbnRpcXVhPWJvb2sgYW50aXF1YSxwYWxhdGlubyxzZXJpZjsnICsgJ0NvbWljIFNhbnMgTVM9Y29taWMgc2FucyBtcyxzYW5zLXNlcmlmOycgKyAnQ291cmllciBOZXc9Y291cmllciBuZXcsY291cmllcixtb25vc3BhY2U7JyArICdHZW9yZ2lhPWdlb3JnaWEscGFsYXRpbm8sc2VyaWY7JyArICdIZWx2ZXRpY2E9aGVsdmV0aWNhLGFyaWFsLHNhbnMtc2VyaWY7JyArICdJbXBhY3Q9aW1wYWN0LHNhbnMtc2VyaWY7JyArICdTeW1ib2w9c3ltYm9sOycgKyAnVGFob21hPXRhaG9tYSxhcmlhbCxoZWx2ZXRpY2Esc2Fucy1zZXJpZjsnICsgJ1Rlcm1pbmFsPXRlcm1pbmFsLG1vbmFjbyxtb25vc3BhY2U7JyArICdUaW1lcyBOZXcgUm9tYW49dGltZXMgbmV3IHJvbWFuLHRpbWVzLHNlcmlmOycgKyAnVHJlYnVjaGV0IE1TPXRyZWJ1Y2hldCBtcyxnZW5ldmEsc2Fucy1zZXJpZjsnICsgJ1ZlcmRhbmE9dmVyZGFuYSxnZW5ldmEsc2Fucy1zZXJpZjsnICsgJ1dlYmRpbmdzPXdlYmRpbmdzOycgKyAnV2luZ2RpbmdzPXdpbmdkaW5ncyx6YXBmIGRpbmdiYXRzJztcbiAgICAgIHNldElubGluZVN0eWxlcyhlZGl0b3IsIGZhbHNlKTtcbiAgICAgIGlmICghZ2V0Rm9udFNpemVGb3JtYXRzKGVkaXRvcikpIHtcbiAgICAgICAgc2V0Rm9udFNpemVGb3JtYXRzKGVkaXRvciwgZGVmYXVsdEZvbnRzaXplRm9ybWF0cyk7XG4gICAgICB9XG4gICAgICBpZiAoIWdldEZvbnRGb3JtYXRzKGVkaXRvcikpIHtcbiAgICAgICAgc2V0Rm9udEZvcm1hdHMoZWRpdG9yLCBkZWZhdWx0Rm9udHNGb3JtYXRzKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBzZXR1cCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIG92ZXJyaWRlU2V0dGluZ3MoZWRpdG9yKTtcbiAgICAgIGVkaXRvci5vbignUHJlSW5pdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG92ZXJyaWRlRm9ybWF0cyhlZGl0b3IpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFBsdWdpbiAoKSB7XG4gICAgICBnbG9iYWwuYWRkKCdsZWdhY3lvdXRwdXQnLCBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIHNldHVwKGVkaXRvcik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBQbHVnaW4oKTtcblxufSgpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=