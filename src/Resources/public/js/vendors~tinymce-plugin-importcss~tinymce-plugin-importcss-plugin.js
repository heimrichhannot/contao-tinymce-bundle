(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~tinymce-plugin-importcss~tinymce-plugin-importcss-plugin"],{

/***/ "./node_modules/tinymce/plugins/importcss/plugin.js":
/*!**********************************************************!*\
  !*** ./node_modules/tinymce/plugins/importcss/plugin.js ***!
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

    var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

    var global$2 = tinymce.util.Tools.resolve('tinymce.EditorManager');

    var global$3 = tinymce.util.Tools.resolve('tinymce.Env');

    var global$4 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var shouldMergeClasses = function (editor) {
      return editor.getParam('importcss_merge_classes');
    };
    var shouldImportExclusive = function (editor) {
      return editor.getParam('importcss_exclusive');
    };
    var getSelectorConverter = function (editor) {
      return editor.getParam('importcss_selector_converter');
    };
    var getSelectorFilter = function (editor) {
      return editor.getParam('importcss_selector_filter');
    };
    var getCssGroups = function (editor) {
      return editor.getParam('importcss_groups');
    };
    var shouldAppend = function (editor) {
      return editor.getParam('importcss_append');
    };
    var getFileFilter = function (editor) {
      return editor.getParam('importcss_file_filter');
    };
    var getSkin = function (editor) {
      var skin = editor.getParam('skin');
      return skin !== false ? skin || 'oxide' : false;
    };
    var getSkinUrl = function (editor) {
      return editor.getParam('skin_url');
    };

    var typeOf = function (x) {
      var t = typeof x;
      if (x === null) {
        return 'null';
      } else if (t === 'object' && (Array.prototype.isPrototypeOf(x) || x.constructor && x.constructor.name === 'Array')) {
        return 'array';
      } else if (t === 'object' && (String.prototype.isPrototypeOf(x) || x.constructor && x.constructor.name === 'String')) {
        return 'string';
      } else {
        return t;
      }
    };
    var isType = function (type) {
      return function (value) {
        return typeOf(value) === type;
      };
    };
    var isArray = isType('array');

    var nativePush = Array.prototype.push;
    var map = function (xs, f) {
      var len = xs.length;
      var r = new Array(len);
      for (var i = 0; i < len; i++) {
        var x = xs[i];
        r[i] = f(x, i);
      }
      return r;
    };
    var flatten = function (xs) {
      var r = [];
      for (var i = 0, len = xs.length; i < len; ++i) {
        if (!isArray(xs[i])) {
          throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs);
        }
        nativePush.apply(r, xs[i]);
      }
      return r;
    };
    var bind = function (xs, f) {
      return flatten(map(xs, f));
    };

    var generate = function () {
      var ungroupedOrder = [];
      var groupOrder = [];
      var groups = {};
      var addItemToGroup = function (groupTitle, itemInfo) {
        if (groups[groupTitle]) {
          groups[groupTitle].push(itemInfo);
        } else {
          groupOrder.push(groupTitle);
          groups[groupTitle] = [itemInfo];
        }
      };
      var addItem = function (itemInfo) {
        ungroupedOrder.push(itemInfo);
      };
      var toFormats = function () {
        var groupItems = bind(groupOrder, function (g) {
          var items = groups[g];
          return items.length === 0 ? [] : [{
              title: g,
              items: items
            }];
        });
        return groupItems.concat(ungroupedOrder);
      };
      return {
        addItemToGroup: addItemToGroup,
        addItem: addItem,
        toFormats: toFormats
      };
    };

    var removeCacheSuffix = function (url) {
      var cacheSuffix = global$3.cacheSuffix;
      if (typeof url === 'string') {
        url = url.replace('?' + cacheSuffix, '').replace('&' + cacheSuffix, '');
      }
      return url;
    };
    var isSkinContentCss = function (editor, href) {
      var skin = getSkin(editor);
      if (skin) {
        var skinUrlBase = getSkinUrl(editor);
        var skinUrl = skinUrlBase ? editor.documentBaseURI.toAbsolute(skinUrlBase) : global$2.baseURL + '/skins/ui/' + skin;
        var contentSkinUrlPart = global$2.baseURL + '/skins/content/';
        return href === skinUrl + '/content' + (editor.inline ? '.inline' : '') + '.min.css' || href.indexOf(contentSkinUrlPart) !== -1;
      }
      return false;
    };
    var compileFilter = function (filter) {
      if (typeof filter === 'string') {
        return function (value) {
          return value.indexOf(filter) !== -1;
        };
      } else if (filter instanceof RegExp) {
        return function (value) {
          return filter.test(value);
        };
      }
      return filter;
    };
    var getSelectors = function (editor, doc, fileFilter) {
      var selectors = [], contentCSSUrls = {};
      function append(styleSheet, imported) {
        var href = styleSheet.href, rules;
        href = removeCacheSuffix(href);
        if (!href || !fileFilter(href, imported) || isSkinContentCss(editor, href)) {
          return;
        }
        global$4.each(styleSheet.imports, function (styleSheet) {
          append(styleSheet, true);
        });
        try {
          rules = styleSheet.cssRules || styleSheet.rules;
        } catch (e) {
        }
        global$4.each(rules, function (cssRule) {
          if (cssRule.styleSheet) {
            append(cssRule.styleSheet, true);
          } else if (cssRule.selectorText) {
            global$4.each(cssRule.selectorText.split(','), function (selector) {
              selectors.push(global$4.trim(selector));
            });
          }
        });
      }
      global$4.each(editor.contentCSS, function (url) {
        contentCSSUrls[url] = true;
      });
      if (!fileFilter) {
        fileFilter = function (href, imported) {
          return imported || contentCSSUrls[href];
        };
      }
      try {
        global$4.each(doc.styleSheets, function (styleSheet) {
          append(styleSheet);
        });
      } catch (e) {
      }
      return selectors;
    };
    var defaultConvertSelectorToFormat = function (editor, selectorText) {
      var format;
      var selector = /^(?:([a-z0-9\-_]+))?(\.[a-z0-9_\-\.]+)$/i.exec(selectorText);
      if (!selector) {
        return;
      }
      var elementName = selector[1];
      var classes = selector[2].substr(1).split('.').join(' ');
      var inlineSelectorElements = global$4.makeMap('a,img');
      if (selector[1]) {
        format = { title: selectorText };
        if (editor.schema.getTextBlockElements()[elementName]) {
          format.block = elementName;
        } else if (editor.schema.getBlockElements()[elementName] || inlineSelectorElements[elementName.toLowerCase()]) {
          format.selector = elementName;
        } else {
          format.inline = elementName;
        }
      } else if (selector[2]) {
        format = {
          inline: 'span',
          title: selectorText.substr(1),
          classes: classes
        };
      }
      if (shouldMergeClasses(editor) !== false) {
        format.classes = classes;
      } else {
        format.attributes = { class: classes };
      }
      return format;
    };
    var getGroupsBySelector = function (groups, selector) {
      return global$4.grep(groups, function (group) {
        return !group.filter || group.filter(selector);
      });
    };
    var compileUserDefinedGroups = function (groups) {
      return global$4.map(groups, function (group) {
        return global$4.extend({}, group, {
          original: group,
          selectors: {},
          filter: compileFilter(group.filter),
          item: {
            text: group.title,
            menu: []
          }
        });
      });
    };
    var isExclusiveMode = function (editor, group) {
      return group === null || shouldImportExclusive(editor) !== false;
    };
    var isUniqueSelector = function (editor, selector, group, globallyUniqueSelectors) {
      return !(isExclusiveMode(editor, group) ? selector in globallyUniqueSelectors : selector in group.selectors);
    };
    var markUniqueSelector = function (editor, selector, group, globallyUniqueSelectors) {
      if (isExclusiveMode(editor, group)) {
        globallyUniqueSelectors[selector] = true;
      } else {
        group.selectors[selector] = true;
      }
    };
    var convertSelectorToFormat = function (editor, plugin, selector, group) {
      var selectorConverter;
      if (group && group.selector_converter) {
        selectorConverter = group.selector_converter;
      } else if (getSelectorConverter(editor)) {
        selectorConverter = getSelectorConverter(editor);
      } else {
        selectorConverter = function () {
          return defaultConvertSelectorToFormat(editor, selector);
        };
      }
      return selectorConverter.call(plugin, selector, group);
    };
    var setup = function (editor) {
      editor.on('init', function (_e) {
        var model = generate();
        var globallyUniqueSelectors = {};
        var selectorFilter = compileFilter(getSelectorFilter(editor));
        var groups = compileUserDefinedGroups(getCssGroups(editor));
        var processSelector = function (selector, group) {
          if (isUniqueSelector(editor, selector, group, globallyUniqueSelectors)) {
            markUniqueSelector(editor, selector, group, globallyUniqueSelectors);
            var format = convertSelectorToFormat(editor, editor.plugins.importcss, selector, group);
            if (format) {
              var formatName = format.name || global$1.DOM.uniqueId();
              editor.formatter.register(formatName, format);
              return global$4.extend({}, {
                title: format.title,
                format: formatName
              });
            }
          }
          return null;
        };
        global$4.each(getSelectors(editor, editor.getDoc(), compileFilter(getFileFilter(editor))), function (selector) {
          if (selector.indexOf('.mce-') === -1) {
            if (!selectorFilter || selectorFilter(selector)) {
              var selectorGroups = getGroupsBySelector(groups, selector);
              if (selectorGroups.length > 0) {
                global$4.each(selectorGroups, function (group) {
                  var menuItem = processSelector(selector, group);
                  if (menuItem) {
                    model.addItemToGroup(group.title, menuItem);
                  }
                });
              } else {
                var menuItem = processSelector(selector, null);
                if (menuItem) {
                  model.addItem(menuItem);
                }
              }
            }
          }
        });
        var items = model.toFormats();
        editor.fire('addStyleModifications', {
          items: items,
          replace: !shouldAppend(editor)
        });
      });
    };

    var get = function (editor) {
      var convertSelectorToFormat = function (selectorText) {
        return defaultConvertSelectorToFormat(editor, selectorText);
      };
      return { convertSelectorToFormat: convertSelectorToFormat };
    };

    function Plugin () {
      global.add('importcss', function (editor) {
        setup(editor);
        return get(editor);
      });
    }

    Plugin();

}());


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2ltcG9ydGNzcy9wbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsU0FBUztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBLENBQUMiLCJmaWxlIjoidmVuZG9yc350aW55bWNlLXBsdWdpbi1pbXBvcnRjc3N+dGlueW1jZS1wbHVnaW4taW1wb3J0Y3NzLXBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICpcbiAqIFZlcnNpb246IDUuNC4yICgyMDIwLTA4LTE3KVxuICovXG4oZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBnbG9iYWwgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5QbHVnaW5NYW5hZ2VyJyk7XG5cbiAgICB2YXIgZ2xvYmFsJDEgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5kb20uRE9NVXRpbHMnKTtcblxuICAgIHZhciBnbG9iYWwkMiA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLkVkaXRvck1hbmFnZXInKTtcblxuICAgIHZhciBnbG9iYWwkMyA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLkVudicpO1xuXG4gICAgdmFyIGdsb2JhbCQ0ID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UudXRpbC5Ub29scycpO1xuXG4gICAgdmFyIHNob3VsZE1lcmdlQ2xhc3NlcyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2ltcG9ydGNzc19tZXJnZV9jbGFzc2VzJyk7XG4gICAgfTtcbiAgICB2YXIgc2hvdWxkSW1wb3J0RXhjbHVzaXZlID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnaW1wb3J0Y3NzX2V4Y2x1c2l2ZScpO1xuICAgIH07XG4gICAgdmFyIGdldFNlbGVjdG9yQ29udmVydGVyID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnaW1wb3J0Y3NzX3NlbGVjdG9yX2NvbnZlcnRlcicpO1xuICAgIH07XG4gICAgdmFyIGdldFNlbGVjdG9yRmlsdGVyID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnaW1wb3J0Y3NzX3NlbGVjdG9yX2ZpbHRlcicpO1xuICAgIH07XG4gICAgdmFyIGdldENzc0dyb3VwcyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2ltcG9ydGNzc19ncm91cHMnKTtcbiAgICB9O1xuICAgIHZhciBzaG91bGRBcHBlbmQgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdpbXBvcnRjc3NfYXBwZW5kJyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0RmlsZUZpbHRlciA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2ltcG9ydGNzc19maWxlX2ZpbHRlcicpO1xuICAgIH07XG4gICAgdmFyIGdldFNraW4gPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgc2tpbiA9IGVkaXRvci5nZXRQYXJhbSgnc2tpbicpO1xuICAgICAgcmV0dXJuIHNraW4gIT09IGZhbHNlID8gc2tpbiB8fCAnb3hpZGUnIDogZmFsc2U7XG4gICAgfTtcbiAgICB2YXIgZ2V0U2tpblVybCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ3NraW5fdXJsJyk7XG4gICAgfTtcblxuICAgIHZhciB0eXBlT2YgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgdmFyIHQgPSB0eXBlb2YgeDtcbiAgICAgIGlmICh4ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnbnVsbCc7XG4gICAgICB9IGVsc2UgaWYgKHQgPT09ICdvYmplY3QnICYmIChBcnJheS5wcm90b3R5cGUuaXNQcm90b3R5cGVPZih4KSB8fCB4LmNvbnN0cnVjdG9yICYmIHguY29uc3RydWN0b3IubmFtZSA9PT0gJ0FycmF5JykpIHtcbiAgICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgICB9IGVsc2UgaWYgKHQgPT09ICdvYmplY3QnICYmIChTdHJpbmcucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoeCkgfHwgeC5jb25zdHJ1Y3RvciAmJiB4LmNvbnN0cnVjdG9yLm5hbWUgPT09ICdTdHJpbmcnKSkge1xuICAgICAgICByZXR1cm4gJ3N0cmluZyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdDtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBpc1R5cGUgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZU9mKHZhbHVlKSA9PT0gdHlwZTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgaXNBcnJheSA9IGlzVHlwZSgnYXJyYXknKTtcblxuICAgIHZhciBuYXRpdmVQdXNoID0gQXJyYXkucHJvdG90eXBlLnB1c2g7XG4gICAgdmFyIG1hcCA9IGZ1bmN0aW9uICh4cywgZikge1xuICAgICAgdmFyIGxlbiA9IHhzLmxlbmd0aDtcbiAgICAgIHZhciByID0gbmV3IEFycmF5KGxlbik7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciB4ID0geHNbaV07XG4gICAgICAgIHJbaV0gPSBmKHgsIGkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcbiAgICB2YXIgZmxhdHRlbiA9IGZ1bmN0aW9uICh4cykge1xuICAgICAgdmFyIHIgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB4cy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICBpZiAoIWlzQXJyYXkoeHNbaV0pKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcnIuZmxhdHRlbiBpdGVtICcgKyBpICsgJyB3YXMgbm90IGFuIGFycmF5LCBpbnB1dDogJyArIHhzKTtcbiAgICAgICAgfVxuICAgICAgICBuYXRpdmVQdXNoLmFwcGx5KHIsIHhzW2ldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByO1xuICAgIH07XG4gICAgdmFyIGJpbmQgPSBmdW5jdGlvbiAoeHMsIGYpIHtcbiAgICAgIHJldHVybiBmbGF0dGVuKG1hcCh4cywgZikpO1xuICAgIH07XG5cbiAgICB2YXIgZ2VuZXJhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdW5ncm91cGVkT3JkZXIgPSBbXTtcbiAgICAgIHZhciBncm91cE9yZGVyID0gW107XG4gICAgICB2YXIgZ3JvdXBzID0ge307XG4gICAgICB2YXIgYWRkSXRlbVRvR3JvdXAgPSBmdW5jdGlvbiAoZ3JvdXBUaXRsZSwgaXRlbUluZm8pIHtcbiAgICAgICAgaWYgKGdyb3Vwc1tncm91cFRpdGxlXSkge1xuICAgICAgICAgIGdyb3Vwc1tncm91cFRpdGxlXS5wdXNoKGl0ZW1JbmZvKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBncm91cE9yZGVyLnB1c2goZ3JvdXBUaXRsZSk7XG4gICAgICAgICAgZ3JvdXBzW2dyb3VwVGl0bGVdID0gW2l0ZW1JbmZvXTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHZhciBhZGRJdGVtID0gZnVuY3Rpb24gKGl0ZW1JbmZvKSB7XG4gICAgICAgIHVuZ3JvdXBlZE9yZGVyLnB1c2goaXRlbUluZm8pO1xuICAgICAgfTtcbiAgICAgIHZhciB0b0Zvcm1hdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBncm91cEl0ZW1zID0gYmluZChncm91cE9yZGVyLCBmdW5jdGlvbiAoZykge1xuICAgICAgICAgIHZhciBpdGVtcyA9IGdyb3Vwc1tnXTtcbiAgICAgICAgICByZXR1cm4gaXRlbXMubGVuZ3RoID09PSAwID8gW10gOiBbe1xuICAgICAgICAgICAgICB0aXRsZTogZyxcbiAgICAgICAgICAgICAgaXRlbXM6IGl0ZW1zXG4gICAgICAgICAgICB9XTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBncm91cEl0ZW1zLmNvbmNhdCh1bmdyb3VwZWRPcmRlcik7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWRkSXRlbVRvR3JvdXA6IGFkZEl0ZW1Ub0dyb3VwLFxuICAgICAgICBhZGRJdGVtOiBhZGRJdGVtLFxuICAgICAgICB0b0Zvcm1hdHM6IHRvRm9ybWF0c1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIHJlbW92ZUNhY2hlU3VmZml4ID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgdmFyIGNhY2hlU3VmZml4ID0gZ2xvYmFsJDMuY2FjaGVTdWZmaXg7XG4gICAgICBpZiAodHlwZW9mIHVybCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoJz8nICsgY2FjaGVTdWZmaXgsICcnKS5yZXBsYWNlKCcmJyArIGNhY2hlU3VmZml4LCAnJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdXJsO1xuICAgIH07XG4gICAgdmFyIGlzU2tpbkNvbnRlbnRDc3MgPSBmdW5jdGlvbiAoZWRpdG9yLCBocmVmKSB7XG4gICAgICB2YXIgc2tpbiA9IGdldFNraW4oZWRpdG9yKTtcbiAgICAgIGlmIChza2luKSB7XG4gICAgICAgIHZhciBza2luVXJsQmFzZSA9IGdldFNraW5VcmwoZWRpdG9yKTtcbiAgICAgICAgdmFyIHNraW5VcmwgPSBza2luVXJsQmFzZSA/IGVkaXRvci5kb2N1bWVudEJhc2VVUkkudG9BYnNvbHV0ZShza2luVXJsQmFzZSkgOiBnbG9iYWwkMi5iYXNlVVJMICsgJy9za2lucy91aS8nICsgc2tpbjtcbiAgICAgICAgdmFyIGNvbnRlbnRTa2luVXJsUGFydCA9IGdsb2JhbCQyLmJhc2VVUkwgKyAnL3NraW5zL2NvbnRlbnQvJztcbiAgICAgICAgcmV0dXJuIGhyZWYgPT09IHNraW5VcmwgKyAnL2NvbnRlbnQnICsgKGVkaXRvci5pbmxpbmUgPyAnLmlubGluZScgOiAnJykgKyAnLm1pbi5jc3MnIHx8IGhyZWYuaW5kZXhPZihjb250ZW50U2tpblVybFBhcnQpICE9PSAtMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIHZhciBjb21waWxlRmlsdGVyID0gZnVuY3Rpb24gKGZpbHRlcikge1xuICAgICAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWUuaW5kZXhPZihmaWx0ZXIpICE9PSAtMTtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoZmlsdGVyIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gZmlsdGVyLnRlc3QodmFsdWUpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZpbHRlcjtcbiAgICB9O1xuICAgIHZhciBnZXRTZWxlY3RvcnMgPSBmdW5jdGlvbiAoZWRpdG9yLCBkb2MsIGZpbGVGaWx0ZXIpIHtcbiAgICAgIHZhciBzZWxlY3RvcnMgPSBbXSwgY29udGVudENTU1VybHMgPSB7fTtcbiAgICAgIGZ1bmN0aW9uIGFwcGVuZChzdHlsZVNoZWV0LCBpbXBvcnRlZCkge1xuICAgICAgICB2YXIgaHJlZiA9IHN0eWxlU2hlZXQuaHJlZiwgcnVsZXM7XG4gICAgICAgIGhyZWYgPSByZW1vdmVDYWNoZVN1ZmZpeChocmVmKTtcbiAgICAgICAgaWYgKCFocmVmIHx8ICFmaWxlRmlsdGVyKGhyZWYsIGltcG9ydGVkKSB8fCBpc1NraW5Db250ZW50Q3NzKGVkaXRvciwgaHJlZikpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZ2xvYmFsJDQuZWFjaChzdHlsZVNoZWV0LmltcG9ydHMsIGZ1bmN0aW9uIChzdHlsZVNoZWV0KSB7XG4gICAgICAgICAgYXBwZW5kKHN0eWxlU2hlZXQsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBydWxlcyA9IHN0eWxlU2hlZXQuY3NzUnVsZXMgfHwgc3R5bGVTaGVldC5ydWxlcztcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB9XG4gICAgICAgIGdsb2JhbCQ0LmVhY2gocnVsZXMsIGZ1bmN0aW9uIChjc3NSdWxlKSB7XG4gICAgICAgICAgaWYgKGNzc1J1bGUuc3R5bGVTaGVldCkge1xuICAgICAgICAgICAgYXBwZW5kKGNzc1J1bGUuc3R5bGVTaGVldCwgdHJ1ZSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChjc3NSdWxlLnNlbGVjdG9yVGV4dCkge1xuICAgICAgICAgICAgZ2xvYmFsJDQuZWFjaChjc3NSdWxlLnNlbGVjdG9yVGV4dC5zcGxpdCgnLCcpLCBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgc2VsZWN0b3JzLnB1c2goZ2xvYmFsJDQudHJpbShzZWxlY3RvcikpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGdsb2JhbCQ0LmVhY2goZWRpdG9yLmNvbnRlbnRDU1MsIGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgY29udGVudENTU1VybHNbdXJsXSA9IHRydWU7XG4gICAgICB9KTtcbiAgICAgIGlmICghZmlsZUZpbHRlcikge1xuICAgICAgICBmaWxlRmlsdGVyID0gZnVuY3Rpb24gKGhyZWYsIGltcG9ydGVkKSB7XG4gICAgICAgICAgcmV0dXJuIGltcG9ydGVkIHx8IGNvbnRlbnRDU1NVcmxzW2hyZWZdO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgZ2xvYmFsJDQuZWFjaChkb2Muc3R5bGVTaGVldHMsIGZ1bmN0aW9uIChzdHlsZVNoZWV0KSB7XG4gICAgICAgICAgYXBwZW5kKHN0eWxlU2hlZXQpO1xuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZWxlY3RvcnM7XG4gICAgfTtcbiAgICB2YXIgZGVmYXVsdENvbnZlcnRTZWxlY3RvclRvRm9ybWF0ID0gZnVuY3Rpb24gKGVkaXRvciwgc2VsZWN0b3JUZXh0KSB7XG4gICAgICB2YXIgZm9ybWF0O1xuICAgICAgdmFyIHNlbGVjdG9yID0gL14oPzooW2EtejAtOVxcLV9dKykpPyhcXC5bYS16MC05X1xcLVxcLl0rKSQvaS5leGVjKHNlbGVjdG9yVGV4dCk7XG4gICAgICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBlbGVtZW50TmFtZSA9IHNlbGVjdG9yWzFdO1xuICAgICAgdmFyIGNsYXNzZXMgPSBzZWxlY3RvclsyXS5zdWJzdHIoMSkuc3BsaXQoJy4nKS5qb2luKCcgJyk7XG4gICAgICB2YXIgaW5saW5lU2VsZWN0b3JFbGVtZW50cyA9IGdsb2JhbCQ0Lm1ha2VNYXAoJ2EsaW1nJyk7XG4gICAgICBpZiAoc2VsZWN0b3JbMV0pIHtcbiAgICAgICAgZm9ybWF0ID0geyB0aXRsZTogc2VsZWN0b3JUZXh0IH07XG4gICAgICAgIGlmIChlZGl0b3Iuc2NoZW1hLmdldFRleHRCbG9ja0VsZW1lbnRzKClbZWxlbWVudE5hbWVdKSB7XG4gICAgICAgICAgZm9ybWF0LmJsb2NrID0gZWxlbWVudE5hbWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZWRpdG9yLnNjaGVtYS5nZXRCbG9ja0VsZW1lbnRzKClbZWxlbWVudE5hbWVdIHx8IGlubGluZVNlbGVjdG9yRWxlbWVudHNbZWxlbWVudE5hbWUudG9Mb3dlckNhc2UoKV0pIHtcbiAgICAgICAgICBmb3JtYXQuc2VsZWN0b3IgPSBlbGVtZW50TmFtZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3JtYXQuaW5saW5lID0gZWxlbWVudE5hbWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2VsZWN0b3JbMl0pIHtcbiAgICAgICAgZm9ybWF0ID0ge1xuICAgICAgICAgIGlubGluZTogJ3NwYW4nLFxuICAgICAgICAgIHRpdGxlOiBzZWxlY3RvclRleHQuc3Vic3RyKDEpLFxuICAgICAgICAgIGNsYXNzZXM6IGNsYXNzZXNcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGlmIChzaG91bGRNZXJnZUNsYXNzZXMoZWRpdG9yKSAhPT0gZmFsc2UpIHtcbiAgICAgICAgZm9ybWF0LmNsYXNzZXMgPSBjbGFzc2VzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9ybWF0LmF0dHJpYnV0ZXMgPSB7IGNsYXNzOiBjbGFzc2VzIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gZm9ybWF0O1xuICAgIH07XG4gICAgdmFyIGdldEdyb3Vwc0J5U2VsZWN0b3IgPSBmdW5jdGlvbiAoZ3JvdXBzLCBzZWxlY3Rvcikge1xuICAgICAgcmV0dXJuIGdsb2JhbCQ0LmdyZXAoZ3JvdXBzLCBmdW5jdGlvbiAoZ3JvdXApIHtcbiAgICAgICAgcmV0dXJuICFncm91cC5maWx0ZXIgfHwgZ3JvdXAuZmlsdGVyKHNlbGVjdG9yKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGNvbXBpbGVVc2VyRGVmaW5lZEdyb3VwcyA9IGZ1bmN0aW9uIChncm91cHMpIHtcbiAgICAgIHJldHVybiBnbG9iYWwkNC5tYXAoZ3JvdXBzLCBmdW5jdGlvbiAoZ3JvdXApIHtcbiAgICAgICAgcmV0dXJuIGdsb2JhbCQ0LmV4dGVuZCh7fSwgZ3JvdXAsIHtcbiAgICAgICAgICBvcmlnaW5hbDogZ3JvdXAsXG4gICAgICAgICAgc2VsZWN0b3JzOiB7fSxcbiAgICAgICAgICBmaWx0ZXI6IGNvbXBpbGVGaWx0ZXIoZ3JvdXAuZmlsdGVyKSxcbiAgICAgICAgICBpdGVtOiB7XG4gICAgICAgICAgICB0ZXh0OiBncm91cC50aXRsZSxcbiAgICAgICAgICAgIG1lbnU6IFtdXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGlzRXhjbHVzaXZlTW9kZSA9IGZ1bmN0aW9uIChlZGl0b3IsIGdyb3VwKSB7XG4gICAgICByZXR1cm4gZ3JvdXAgPT09IG51bGwgfHwgc2hvdWxkSW1wb3J0RXhjbHVzaXZlKGVkaXRvcikgIT09IGZhbHNlO1xuICAgIH07XG4gICAgdmFyIGlzVW5pcXVlU2VsZWN0b3IgPSBmdW5jdGlvbiAoZWRpdG9yLCBzZWxlY3RvciwgZ3JvdXAsIGdsb2JhbGx5VW5pcXVlU2VsZWN0b3JzKSB7XG4gICAgICByZXR1cm4gIShpc0V4Y2x1c2l2ZU1vZGUoZWRpdG9yLCBncm91cCkgPyBzZWxlY3RvciBpbiBnbG9iYWxseVVuaXF1ZVNlbGVjdG9ycyA6IHNlbGVjdG9yIGluIGdyb3VwLnNlbGVjdG9ycyk7XG4gICAgfTtcbiAgICB2YXIgbWFya1VuaXF1ZVNlbGVjdG9yID0gZnVuY3Rpb24gKGVkaXRvciwgc2VsZWN0b3IsIGdyb3VwLCBnbG9iYWxseVVuaXF1ZVNlbGVjdG9ycykge1xuICAgICAgaWYgKGlzRXhjbHVzaXZlTW9kZShlZGl0b3IsIGdyb3VwKSkge1xuICAgICAgICBnbG9iYWxseVVuaXF1ZVNlbGVjdG9yc1tzZWxlY3Rvcl0gPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ3JvdXAuc2VsZWN0b3JzW3NlbGVjdG9yXSA9IHRydWU7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgY29udmVydFNlbGVjdG9yVG9Gb3JtYXQgPSBmdW5jdGlvbiAoZWRpdG9yLCBwbHVnaW4sIHNlbGVjdG9yLCBncm91cCkge1xuICAgICAgdmFyIHNlbGVjdG9yQ29udmVydGVyO1xuICAgICAgaWYgKGdyb3VwICYmIGdyb3VwLnNlbGVjdG9yX2NvbnZlcnRlcikge1xuICAgICAgICBzZWxlY3RvckNvbnZlcnRlciA9IGdyb3VwLnNlbGVjdG9yX2NvbnZlcnRlcjtcbiAgICAgIH0gZWxzZSBpZiAoZ2V0U2VsZWN0b3JDb252ZXJ0ZXIoZWRpdG9yKSkge1xuICAgICAgICBzZWxlY3RvckNvbnZlcnRlciA9IGdldFNlbGVjdG9yQ29udmVydGVyKGVkaXRvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxlY3RvckNvbnZlcnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZGVmYXVsdENvbnZlcnRTZWxlY3RvclRvRm9ybWF0KGVkaXRvciwgc2VsZWN0b3IpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlbGVjdG9yQ29udmVydGVyLmNhbGwocGx1Z2luLCBzZWxlY3RvciwgZ3JvdXApO1xuICAgIH07XG4gICAgdmFyIHNldHVwID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgZWRpdG9yLm9uKCdpbml0JywgZnVuY3Rpb24gKF9lKSB7XG4gICAgICAgIHZhciBtb2RlbCA9IGdlbmVyYXRlKCk7XG4gICAgICAgIHZhciBnbG9iYWxseVVuaXF1ZVNlbGVjdG9ycyA9IHt9O1xuICAgICAgICB2YXIgc2VsZWN0b3JGaWx0ZXIgPSBjb21waWxlRmlsdGVyKGdldFNlbGVjdG9yRmlsdGVyKGVkaXRvcikpO1xuICAgICAgICB2YXIgZ3JvdXBzID0gY29tcGlsZVVzZXJEZWZpbmVkR3JvdXBzKGdldENzc0dyb3VwcyhlZGl0b3IpKTtcbiAgICAgICAgdmFyIHByb2Nlc3NTZWxlY3RvciA9IGZ1bmN0aW9uIChzZWxlY3RvciwgZ3JvdXApIHtcbiAgICAgICAgICBpZiAoaXNVbmlxdWVTZWxlY3RvcihlZGl0b3IsIHNlbGVjdG9yLCBncm91cCwgZ2xvYmFsbHlVbmlxdWVTZWxlY3RvcnMpKSB7XG4gICAgICAgICAgICBtYXJrVW5pcXVlU2VsZWN0b3IoZWRpdG9yLCBzZWxlY3RvciwgZ3JvdXAsIGdsb2JhbGx5VW5pcXVlU2VsZWN0b3JzKTtcbiAgICAgICAgICAgIHZhciBmb3JtYXQgPSBjb252ZXJ0U2VsZWN0b3JUb0Zvcm1hdChlZGl0b3IsIGVkaXRvci5wbHVnaW5zLmltcG9ydGNzcywgc2VsZWN0b3IsIGdyb3VwKTtcbiAgICAgICAgICAgIGlmIChmb3JtYXQpIHtcbiAgICAgICAgICAgICAgdmFyIGZvcm1hdE5hbWUgPSBmb3JtYXQubmFtZSB8fCBnbG9iYWwkMS5ET00udW5pcXVlSWQoKTtcbiAgICAgICAgICAgICAgZWRpdG9yLmZvcm1hdHRlci5yZWdpc3Rlcihmb3JtYXROYW1lLCBmb3JtYXQpO1xuICAgICAgICAgICAgICByZXR1cm4gZ2xvYmFsJDQuZXh0ZW5kKHt9LCB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGZvcm1hdC50aXRsZSxcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGZvcm1hdE5hbWVcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgICAgICBnbG9iYWwkNC5lYWNoKGdldFNlbGVjdG9ycyhlZGl0b3IsIGVkaXRvci5nZXREb2MoKSwgY29tcGlsZUZpbHRlcihnZXRGaWxlRmlsdGVyKGVkaXRvcikpKSwgZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgaWYgKHNlbGVjdG9yLmluZGV4T2YoJy5tY2UtJykgPT09IC0xKSB7XG4gICAgICAgICAgICBpZiAoIXNlbGVjdG9yRmlsdGVyIHx8IHNlbGVjdG9yRmlsdGVyKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICB2YXIgc2VsZWN0b3JHcm91cHMgPSBnZXRHcm91cHNCeVNlbGVjdG9yKGdyb3Vwcywgc2VsZWN0b3IpO1xuICAgICAgICAgICAgICBpZiAoc2VsZWN0b3JHcm91cHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGdsb2JhbCQ0LmVhY2goc2VsZWN0b3JHcm91cHMsIGZ1bmN0aW9uIChncm91cCkge1xuICAgICAgICAgICAgICAgICAgdmFyIG1lbnVJdGVtID0gcHJvY2Vzc1NlbGVjdG9yKHNlbGVjdG9yLCBncm91cCk7XG4gICAgICAgICAgICAgICAgICBpZiAobWVudUl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuYWRkSXRlbVRvR3JvdXAoZ3JvdXAudGl0bGUsIG1lbnVJdGVtKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgbWVudUl0ZW0gPSBwcm9jZXNzU2VsZWN0b3Ioc2VsZWN0b3IsIG51bGwpO1xuICAgICAgICAgICAgICAgIGlmIChtZW51SXRlbSkge1xuICAgICAgICAgICAgICAgICAgbW9kZWwuYWRkSXRlbShtZW51SXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGl0ZW1zID0gbW9kZWwudG9Gb3JtYXRzKCk7XG4gICAgICAgIGVkaXRvci5maXJlKCdhZGRTdHlsZU1vZGlmaWNhdGlvbnMnLCB7XG4gICAgICAgICAgaXRlbXM6IGl0ZW1zLFxuICAgICAgICAgIHJlcGxhY2U6ICFzaG91bGRBcHBlbmQoZWRpdG9yKVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0ID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGNvbnZlcnRTZWxlY3RvclRvRm9ybWF0ID0gZnVuY3Rpb24gKHNlbGVjdG9yVGV4dCkge1xuICAgICAgICByZXR1cm4gZGVmYXVsdENvbnZlcnRTZWxlY3RvclRvRm9ybWF0KGVkaXRvciwgc2VsZWN0b3JUZXh0KTtcbiAgICAgIH07XG4gICAgICByZXR1cm4geyBjb252ZXJ0U2VsZWN0b3JUb0Zvcm1hdDogY29udmVydFNlbGVjdG9yVG9Gb3JtYXQgfTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gUGx1Z2luICgpIHtcbiAgICAgIGdsb2JhbC5hZGQoJ2ltcG9ydGNzcycsIGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgICAgc2V0dXAoZWRpdG9yKTtcbiAgICAgICAgcmV0dXJuIGdldChlZGl0b3IpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgUGx1Z2luKCk7XG5cbn0oKSk7XG4iXSwic291cmNlUm9vdCI6IiJ9