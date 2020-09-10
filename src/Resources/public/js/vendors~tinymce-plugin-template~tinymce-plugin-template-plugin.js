(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~tinymce-plugin-template~tinymce-plugin-template-plugin"],{

/***/ "./node_modules/tinymce/plugins/template/plugin.js":
/*!*********************************************************!*\
  !*** ./node_modules/tinymce/plugins/template/plugin.js ***!
  \*********************************************************/
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

    var noop = function () {
    };
    var constant = function (value) {
      return function () {
        return value;
      };
    };
    function curry(fn) {
      var initialArgs = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        initialArgs[_i - 1] = arguments[_i];
      }
      return function () {
        var restArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          restArgs[_i] = arguments[_i];
        }
        var all = initialArgs.concat(restArgs);
        return fn.apply(null, all);
      };
    }
    var never = constant(false);
    var always = constant(true);

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.XHR');

    var getCreationDateClasses = function (editor) {
      return editor.getParam('template_cdate_classes', 'cdate');
    };
    var getModificationDateClasses = function (editor) {
      return editor.getParam('template_mdate_classes', 'mdate');
    };
    var getSelectedContentClasses = function (editor) {
      return editor.getParam('template_selected_content_classes', 'selcontent');
    };
    var getPreviewReplaceValues = function (editor) {
      return editor.getParam('template_preview_replace_values');
    };
    var getTemplateReplaceValues = function (editor) {
      return editor.getParam('template_replace_values');
    };
    var getTemplates = function (editor) {
      return editor.getParam('templates');
    };
    var getCdateFormat = function (editor) {
      return editor.getParam('template_cdate_format', editor.translate('%Y-%m-%d'));
    };
    var getMdateFormat = function (editor) {
      return editor.getParam('template_mdate_format', editor.translate('%Y-%m-%d'));
    };
    var getBodyClassFromHash = function (editor) {
      var bodyClass = editor.getParam('body_class', '', 'hash');
      return bodyClass[editor.id] || '';
    };
    var getBodyClass = function (editor) {
      var bodyClass = editor.getParam('body_class', '', 'string');
      if (bodyClass.indexOf('=') === -1) {
        return bodyClass;
      } else {
        return getBodyClassFromHash(editor);
      }
    };

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
      var daysShort = 'Sun Mon Tue Wed Thu Fri Sat Sun'.split(' ');
      var daysLong = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday Sunday'.split(' ');
      var monthsShort = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
      var monthsLong = 'January February March April May June July August September October November December'.split(' ');
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

    var createTemplateList = function (editor, callback) {
      return function () {
        var templateList = getTemplates(editor);
        if (typeof templateList === 'function') {
          templateList(callback);
          return;
        }
        if (typeof templateList === 'string') {
          global$2.send({
            url: templateList,
            success: function (text) {
              callback(JSON.parse(text));
            }
          });
        } else {
          callback(templateList);
        }
      };
    };
    var replaceTemplateValues = function (html, templateValues) {
      global$1.each(templateValues, function (v, k) {
        if (typeof v === 'function') {
          v = v(k);
        }
        html = html.replace(new RegExp('\\{\\$' + k + '\\}', 'g'), v);
      });
      return html;
    };
    var replaceVals = function (editor, e) {
      var dom = editor.dom, vl = getTemplateReplaceValues(editor);
      global$1.each(dom.select('*', e), function (e) {
        global$1.each(vl, function (v, k) {
          if (dom.hasClass(e, k)) {
            if (typeof vl[k] === 'function') {
              vl[k](e);
            }
          }
        });
      });
    };
    var hasClass = function (n, c) {
      return new RegExp('\\b' + c + '\\b', 'g').test(n.className);
    };
    var insertTemplate = function (editor, ui, html) {
      var el;
      var dom = editor.dom;
      var sel = editor.selection.getContent();
      html = replaceTemplateValues(html, getTemplateReplaceValues(editor));
      el = dom.create('div', null, html);
      var n = dom.select('.mceTmpl', el);
      if (n && n.length > 0) {
        el = dom.create('div', null);
        el.appendChild(n[0].cloneNode(true));
      }
      global$1.each(dom.select('*', el), function (n) {
        if (hasClass(n, getCreationDateClasses(editor).replace(/\s+/g, '|'))) {
          n.innerHTML = getDateTime(editor, getCdateFormat(editor));
        }
        if (hasClass(n, getModificationDateClasses(editor).replace(/\s+/g, '|'))) {
          n.innerHTML = getDateTime(editor, getMdateFormat(editor));
        }
        if (hasClass(n, getSelectedContentClasses(editor).replace(/\s+/g, '|'))) {
          n.innerHTML = sel;
        }
      });
      replaceVals(editor, el);
      editor.execCommand('mceInsertContent', false, el.innerHTML);
      editor.addVisual();
    };

    var register = function (editor) {
      editor.addCommand('mceInsertTemplate', curry(insertTemplate, editor));
    };

    var setup = function (editor) {
      editor.on('PreProcess', function (o) {
        var dom = editor.dom, dateFormat = getMdateFormat(editor);
        global$1.each(dom.select('div', o.node), function (e) {
          if (dom.hasClass(e, 'mceTmpl')) {
            global$1.each(dom.select('*', e), function (e) {
              if (dom.hasClass(e, getModificationDateClasses(editor).replace(/\s+/g, '|'))) {
                e.innerHTML = getDateTime(editor, dateFormat);
              }
            });
            replaceVals(editor, e);
          }
        });
      });
    };

    var none = function () {
      return NONE;
    };
    var NONE = function () {
      var eq = function (o) {
        return o.isNone();
      };
      var call = function (thunk) {
        return thunk();
      };
      var id = function (n) {
        return n;
      };
      var me = {
        fold: function (n, _s) {
          return n();
        },
        is: never,
        isSome: never,
        isNone: always,
        getOr: id,
        getOrThunk: call,
        getOrDie: function (msg) {
          throw new Error(msg || 'error: getOrDie called on none.');
        },
        getOrNull: constant(null),
        getOrUndefined: constant(undefined),
        or: id,
        orThunk: call,
        map: none,
        each: noop,
        bind: none,
        exists: never,
        forall: always,
        filter: none,
        equals: eq,
        equals_: eq,
        toArray: function () {
          return [];
        },
        toString: constant('none()')
      };
      return me;
    }();
    var some = function (a) {
      var constant_a = constant(a);
      var self = function () {
        return me;
      };
      var bind = function (f) {
        return f(a);
      };
      var me = {
        fold: function (n, s) {
          return s(a);
        },
        is: function (v) {
          return a === v;
        },
        isSome: always,
        isNone: never,
        getOr: constant_a,
        getOrThunk: constant_a,
        getOrDie: constant_a,
        getOrNull: constant_a,
        getOrUndefined: constant_a,
        or: self,
        orThunk: self,
        map: function (f) {
          return some(f(a));
        },
        each: function (f) {
          f(a);
        },
        bind: bind,
        exists: bind,
        forall: bind,
        filter: function (f) {
          return f(a) ? me : NONE;
        },
        toArray: function () {
          return [a];
        },
        toString: function () {
          return 'some(' + a + ')';
        },
        equals: function (o) {
          return o.is(a);
        },
        equals_: function (o, elementEq) {
          return o.fold(never, function (b) {
            return elementEq(a, b);
          });
        }
      };
      return me;
    };
    var from = function (value) {
      return value === null || value === undefined ? NONE : some(value);
    };
    var Option = {
      some: some,
      none: none,
      from: from
    };

    var map = function (xs, f) {
      var len = xs.length;
      var r = new Array(len);
      for (var i = 0; i < len; i++) {
        var x = xs[i];
        r[i] = f(x, i);
      }
      return r;
    };
    var findUntil = function (xs, pred, until) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          return Option.some(x);
        } else if (until(x, i)) {
          break;
        }
      }
      return Option.none();
    };
    var find = function (xs, pred) {
      return findUntil(xs, pred, never);
    };

    var global$3 = tinymce.util.Tools.resolve('tinymce.util.Promise');

    var hasOwnProperty = Object.hasOwnProperty;
    var get = function (obj, key) {
      return has(obj, key) ? Option.from(obj[key]) : Option.none();
    };
    var has = function (obj, key) {
      return hasOwnProperty.call(obj, key);
    };

    var entitiesAttr = {
      '"': '&quot;',
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '\'': '&#039;'
    };
    var htmlEscape = function (html) {
      return html.replace(/["'<>&]/g, function (match) {
        return get(entitiesAttr, match).getOr(match);
      });
    };

    var getPreviewContent = function (editor, html) {
      if (html.indexOf('<html>') === -1) {
        var contentCssLinks_1 = '';
        global$1.each(editor.contentCSS, function (url) {
          contentCssLinks_1 += '<link type="text/css" rel="stylesheet" href="' + editor.documentBaseURI.toAbsolute(url) + '">';
        });
        var bodyClass = getBodyClass(editor);
        var encode = editor.dom.encode;
        var directionality = editor.getBody().dir;
        var dirAttr = directionality ? ' dir="' + encode(directionality) + '"' : '';
        html = '<!DOCTYPE html>' + '<html>' + '<head>' + contentCssLinks_1 + '</head>' + '<body class="' + encode(bodyClass) + '"' + dirAttr + '>' + html + '</body>' + '</html>';
      }
      return replaceTemplateValues(html, getPreviewReplaceValues(editor));
    };
    var open = function (editor, templateList) {
      var createTemplates = function () {
        if (!templateList || templateList.length === 0) {
          var message = editor.translate('No templates defined.');
          editor.notificationManager.open({
            text: message,
            type: 'info'
          });
          return Option.none();
        }
        return Option.from(global$1.map(templateList, function (template, index) {
          var isUrlTemplate = function (t) {
            return t.url !== undefined;
          };
          return {
            selected: index === 0,
            text: template.title,
            value: {
              url: isUrlTemplate(template) ? Option.from(template.url) : Option.none(),
              content: !isUrlTemplate(template) ? Option.from(template.content) : Option.none(),
              description: template.description
            }
          };
        }));
      };
      var createSelectBoxItems = function (templates) {
        return map(templates, function (t) {
          return {
            text: t.text,
            value: t.text
          };
        });
      };
      var findTemplate = function (templates, templateTitle) {
        return find(templates, function (t) {
          return t.text === templateTitle;
        });
      };
      var loadFailedAlert = function (api) {
        editor.windowManager.alert('Could not load the specified template.', function () {
          return api.focus('template');
        });
      };
      var getTemplateContent = function (t) {
        return new global$3(function (resolve, reject) {
          t.value.url.fold(function () {
            return resolve(t.value.content.getOr(''));
          }, function (url) {
            return global$2.send({
              url: url,
              success: function (html) {
                resolve(html);
              },
              error: function (e) {
                reject(e);
              }
            });
          });
        });
      };
      var onChange = function (templates, updateDialog) {
        return function (api, change) {
          if (change.name === 'template') {
            var newTemplateTitle = api.getData().template;
            findTemplate(templates, newTemplateTitle).each(function (t) {
              api.block('Loading...');
              getTemplateContent(t).then(function (previewHtml) {
                updateDialog(api, t, previewHtml);
              }).catch(function () {
                updateDialog(api, t, '');
                api.disable('save');
                loadFailedAlert(api);
              });
            });
          }
        };
      };
      var onSubmit = function (templates) {
        return function (api) {
          var data = api.getData();
          findTemplate(templates, data.template).each(function (t) {
            getTemplateContent(t).then(function (previewHtml) {
              insertTemplate(editor, false, previewHtml);
              api.close();
            }).catch(function () {
              api.disable('save');
              loadFailedAlert(api);
            });
          });
        };
      };
      var openDialog = function (templates) {
        var selectBoxItems = createSelectBoxItems(templates);
        var buildDialogSpec = function (bodyItems, initialData) {
          return {
            title: 'Insert Template',
            size: 'large',
            body: {
              type: 'panel',
              items: bodyItems
            },
            initialData: initialData,
            buttons: [
              {
                type: 'cancel',
                name: 'cancel',
                text: 'Cancel'
              },
              {
                type: 'submit',
                name: 'save',
                text: 'Save',
                primary: true
              }
            ],
            onSubmit: onSubmit(templates),
            onChange: onChange(templates, updateDialog)
          };
        };
        var updateDialog = function (dialogApi, template, previewHtml) {
          var content = getPreviewContent(editor, previewHtml);
          var bodyItems = [
            {
              type: 'selectbox',
              name: 'template',
              label: 'Templates',
              items: selectBoxItems
            },
            {
              type: 'htmlpanel',
              html: '<p aria-live="polite">' + htmlEscape(template.value.description) + '</p>'
            },
            {
              label: 'Preview',
              type: 'iframe',
              name: 'preview',
              sandboxed: false
            }
          ];
          var initialData = {
            template: template.text,
            preview: content
          };
          dialogApi.unblock();
          dialogApi.redial(buildDialogSpec(bodyItems, initialData));
          dialogApi.focus('template');
        };
        var dialogApi = editor.windowManager.open(buildDialogSpec([], {
          template: '',
          preview: ''
        }));
        dialogApi.block('Loading...');
        getTemplateContent(templates[0]).then(function (previewHtml) {
          updateDialog(dialogApi, templates[0], previewHtml);
        }).catch(function () {
          updateDialog(dialogApi, templates[0], '');
          dialogApi.disable('save');
          loadFailedAlert(dialogApi);
        });
      };
      var optTemplates = createTemplates();
      optTemplates.each(openDialog);
    };

    var showDialog = function (editor) {
      return function (templates) {
        open(editor, templates);
      };
    };
    var register$1 = function (editor) {
      editor.ui.registry.addButton('template', {
        icon: 'template',
        tooltip: 'Insert template',
        onAction: createTemplateList(editor, showDialog(editor))
      });
      editor.ui.registry.addMenuItem('template', {
        icon: 'template',
        text: 'Insert template...',
        onAction: createTemplateList(editor, showDialog(editor))
      });
    };

    function Plugin () {
      global.add('template', function (editor) {
        register$1(editor);
        register(editor);
        setup(editor);
      });
    }

    Plugin();

}());


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL3RlbXBsYXRlL3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsdUJBQXVCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix3QkFBd0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLGVBQWU7QUFDMUQsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFNBQVM7QUFDL0M7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0I7QUFDbEIsZ0JBQWdCO0FBQ2hCLGdCQUFnQjtBQUNoQixpQkFBaUI7QUFDakIsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBLENBQUMiLCJmaWxlIjoidmVuZG9yc350aW55bWNlLXBsdWdpbi10ZW1wbGF0ZX50aW55bWNlLXBsdWdpbi10ZW1wbGF0ZS1wbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqXG4gKiBWZXJzaW9uOiA1LjQuMiAoMjAyMC0wOC0xNylcbiAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgZ2xvYmFsID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuUGx1Z2luTWFuYWdlcicpO1xuXG4gICAgdmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgfTtcbiAgICB2YXIgY29uc3RhbnQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG4gICAgfTtcbiAgICBmdW5jdGlvbiBjdXJyeShmbikge1xuICAgICAgdmFyIGluaXRpYWxBcmdzID0gW107XG4gICAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBpbml0aWFsQXJnc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXN0QXJncyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgIHJlc3RBcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFsbCA9IGluaXRpYWxBcmdzLmNvbmNhdChyZXN0QXJncyk7XG4gICAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBhbGwpO1xuICAgICAgfTtcbiAgICB9XG4gICAgdmFyIG5ldmVyID0gY29uc3RhbnQoZmFsc2UpO1xuICAgIHZhciBhbHdheXMgPSBjb25zdGFudCh0cnVlKTtcblxuICAgIHZhciBnbG9iYWwkMSA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuVG9vbHMnKTtcblxuICAgIHZhciBnbG9iYWwkMiA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuWEhSJyk7XG5cbiAgICB2YXIgZ2V0Q3JlYXRpb25EYXRlQ2xhc3NlcyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ3RlbXBsYXRlX2NkYXRlX2NsYXNzZXMnLCAnY2RhdGUnKTtcbiAgICB9O1xuICAgIHZhciBnZXRNb2RpZmljYXRpb25EYXRlQ2xhc3NlcyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ3RlbXBsYXRlX21kYXRlX2NsYXNzZXMnLCAnbWRhdGUnKTtcbiAgICB9O1xuICAgIHZhciBnZXRTZWxlY3RlZENvbnRlbnRDbGFzc2VzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgndGVtcGxhdGVfc2VsZWN0ZWRfY29udGVudF9jbGFzc2VzJywgJ3NlbGNvbnRlbnQnKTtcbiAgICB9O1xuICAgIHZhciBnZXRQcmV2aWV3UmVwbGFjZVZhbHVlcyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ3RlbXBsYXRlX3ByZXZpZXdfcmVwbGFjZV92YWx1ZXMnKTtcbiAgICB9O1xuICAgIHZhciBnZXRUZW1wbGF0ZVJlcGxhY2VWYWx1ZXMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCd0ZW1wbGF0ZV9yZXBsYWNlX3ZhbHVlcycpO1xuICAgIH07XG4gICAgdmFyIGdldFRlbXBsYXRlcyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ3RlbXBsYXRlcycpO1xuICAgIH07XG4gICAgdmFyIGdldENkYXRlRm9ybWF0ID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgndGVtcGxhdGVfY2RhdGVfZm9ybWF0JywgZWRpdG9yLnRyYW5zbGF0ZSgnJVktJW0tJWQnKSk7XG4gICAgfTtcbiAgICB2YXIgZ2V0TWRhdGVGb3JtYXQgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCd0ZW1wbGF0ZV9tZGF0ZV9mb3JtYXQnLCBlZGl0b3IudHJhbnNsYXRlKCclWS0lbS0lZCcpKTtcbiAgICB9O1xuICAgIHZhciBnZXRCb2R5Q2xhc3NGcm9tSGFzaCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBib2R5Q2xhc3MgPSBlZGl0b3IuZ2V0UGFyYW0oJ2JvZHlfY2xhc3MnLCAnJywgJ2hhc2gnKTtcbiAgICAgIHJldHVybiBib2R5Q2xhc3NbZWRpdG9yLmlkXSB8fCAnJztcbiAgICB9O1xuICAgIHZhciBnZXRCb2R5Q2xhc3MgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgYm9keUNsYXNzID0gZWRpdG9yLmdldFBhcmFtKCdib2R5X2NsYXNzJywgJycsICdzdHJpbmcnKTtcbiAgICAgIGlmIChib2R5Q2xhc3MuaW5kZXhPZignPScpID09PSAtMSkge1xuICAgICAgICByZXR1cm4gYm9keUNsYXNzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGdldEJvZHlDbGFzc0Zyb21IYXNoKGVkaXRvcik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBhZGRaZXJvcyA9IGZ1bmN0aW9uICh2YWx1ZSwgbGVuKSB7XG4gICAgICB2YWx1ZSA9ICcnICsgdmFsdWU7XG4gICAgICBpZiAodmFsdWUubGVuZ3RoIDwgbGVuKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuIC0gdmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YWx1ZSA9ICcwJyArIHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICB2YXIgZ2V0RGF0ZVRpbWUgPSBmdW5jdGlvbiAoZWRpdG9yLCBmbXQsIGRhdGUpIHtcbiAgICAgIHZhciBkYXlzU2hvcnQgPSAnU3VuIE1vbiBUdWUgV2VkIFRodSBGcmkgU2F0IFN1bicuc3BsaXQoJyAnKTtcbiAgICAgIHZhciBkYXlzTG9uZyA9ICdTdW5kYXkgTW9uZGF5IFR1ZXNkYXkgV2VkbmVzZGF5IFRodXJzZGF5IEZyaWRheSBTYXR1cmRheSBTdW5kYXknLnNwbGl0KCcgJyk7XG4gICAgICB2YXIgbW9udGhzU2hvcnQgPSAnSmFuIEZlYiBNYXIgQXByIE1heSBKdW4gSnVsIEF1ZyBTZXAgT2N0IE5vdiBEZWMnLnNwbGl0KCcgJyk7XG4gICAgICB2YXIgbW9udGhzTG9uZyA9ICdKYW51YXJ5IEZlYnJ1YXJ5IE1hcmNoIEFwcmlsIE1heSBKdW5lIEp1bHkgQXVndXN0IFNlcHRlbWJlciBPY3RvYmVyIE5vdmVtYmVyIERlY2VtYmVyJy5zcGxpdCgnICcpO1xuICAgICAgZGF0ZSA9IGRhdGUgfHwgbmV3IERhdGUoKTtcbiAgICAgIGZtdCA9IGZtdC5yZXBsYWNlKCclRCcsICclbS8lZC8lWScpO1xuICAgICAgZm10ID0gZm10LnJlcGxhY2UoJyVyJywgJyVJOiVNOiVTICVwJyk7XG4gICAgICBmbXQgPSBmbXQucmVwbGFjZSgnJVknLCAnJyArIGRhdGUuZ2V0RnVsbFllYXIoKSk7XG4gICAgICBmbXQgPSBmbXQucmVwbGFjZSgnJXknLCAnJyArIGRhdGUuZ2V0WWVhcigpKTtcbiAgICAgIGZtdCA9IGZtdC5yZXBsYWNlKCclbScsIGFkZFplcm9zKGRhdGUuZ2V0TW9udGgoKSArIDEsIDIpKTtcbiAgICAgIGZtdCA9IGZtdC5yZXBsYWNlKCclZCcsIGFkZFplcm9zKGRhdGUuZ2V0RGF0ZSgpLCAyKSk7XG4gICAgICBmbXQgPSBmbXQucmVwbGFjZSgnJUgnLCAnJyArIGFkZFplcm9zKGRhdGUuZ2V0SG91cnMoKSwgMikpO1xuICAgICAgZm10ID0gZm10LnJlcGxhY2UoJyVNJywgJycgKyBhZGRaZXJvcyhkYXRlLmdldE1pbnV0ZXMoKSwgMikpO1xuICAgICAgZm10ID0gZm10LnJlcGxhY2UoJyVTJywgJycgKyBhZGRaZXJvcyhkYXRlLmdldFNlY29uZHMoKSwgMikpO1xuICAgICAgZm10ID0gZm10LnJlcGxhY2UoJyVJJywgJycgKyAoKGRhdGUuZ2V0SG91cnMoKSArIDExKSAlIDEyICsgMSkpO1xuICAgICAgZm10ID0gZm10LnJlcGxhY2UoJyVwJywgJycgKyAoZGF0ZS5nZXRIb3VycygpIDwgMTIgPyAnQU0nIDogJ1BNJykpO1xuICAgICAgZm10ID0gZm10LnJlcGxhY2UoJyVCJywgJycgKyBlZGl0b3IudHJhbnNsYXRlKG1vbnRoc0xvbmdbZGF0ZS5nZXRNb250aCgpXSkpO1xuICAgICAgZm10ID0gZm10LnJlcGxhY2UoJyViJywgJycgKyBlZGl0b3IudHJhbnNsYXRlKG1vbnRoc1Nob3J0W2RhdGUuZ2V0TW9udGgoKV0pKTtcbiAgICAgIGZtdCA9IGZtdC5yZXBsYWNlKCclQScsICcnICsgZWRpdG9yLnRyYW5zbGF0ZShkYXlzTG9uZ1tkYXRlLmdldERheSgpXSkpO1xuICAgICAgZm10ID0gZm10LnJlcGxhY2UoJyVhJywgJycgKyBlZGl0b3IudHJhbnNsYXRlKGRheXNTaG9ydFtkYXRlLmdldERheSgpXSkpO1xuICAgICAgZm10ID0gZm10LnJlcGxhY2UoJyUlJywgJyUnKTtcbiAgICAgIHJldHVybiBmbXQ7XG4gICAgfTtcblxuICAgIHZhciBjcmVhdGVUZW1wbGF0ZUxpc3QgPSBmdW5jdGlvbiAoZWRpdG9yLCBjYWxsYmFjaykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRlbXBsYXRlTGlzdCA9IGdldFRlbXBsYXRlcyhlZGl0b3IpO1xuICAgICAgICBpZiAodHlwZW9mIHRlbXBsYXRlTGlzdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRlbXBsYXRlTGlzdChjYWxsYmFjayk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdGVtcGxhdGVMaXN0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGdsb2JhbCQyLnNlbmQoe1xuICAgICAgICAgICAgdXJsOiB0ZW1wbGF0ZUxpc3QsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICAgICAgICBjYWxsYmFjayhKU09OLnBhcnNlKHRleHQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYWxsYmFjayh0ZW1wbGF0ZUxpc3QpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHJlcGxhY2VUZW1wbGF0ZVZhbHVlcyA9IGZ1bmN0aW9uIChodG1sLCB0ZW1wbGF0ZVZhbHVlcykge1xuICAgICAgZ2xvYmFsJDEuZWFjaCh0ZW1wbGF0ZVZhbHVlcywgZnVuY3Rpb24gKHYsIGspIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdiA9IHYoayk7XG4gICAgICAgIH1cbiAgICAgICAgaHRtbCA9IGh0bWwucmVwbGFjZShuZXcgUmVnRXhwKCdcXFxce1xcXFwkJyArIGsgKyAnXFxcXH0nLCAnZycpLCB2KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfTtcbiAgICB2YXIgcmVwbGFjZVZhbHMgPSBmdW5jdGlvbiAoZWRpdG9yLCBlKSB7XG4gICAgICB2YXIgZG9tID0gZWRpdG9yLmRvbSwgdmwgPSBnZXRUZW1wbGF0ZVJlcGxhY2VWYWx1ZXMoZWRpdG9yKTtcbiAgICAgIGdsb2JhbCQxLmVhY2goZG9tLnNlbGVjdCgnKicsIGUpLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBnbG9iYWwkMS5lYWNoKHZsLCBmdW5jdGlvbiAodiwgaykge1xuICAgICAgICAgIGlmIChkb20uaGFzQ2xhc3MoZSwgaykpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygdmxba10gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgdmxba10oZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGhhc0NsYXNzID0gZnVuY3Rpb24gKG4sIGMpIHtcbiAgICAgIHJldHVybiBuZXcgUmVnRXhwKCdcXFxcYicgKyBjICsgJ1xcXFxiJywgJ2cnKS50ZXN0KG4uY2xhc3NOYW1lKTtcbiAgICB9O1xuICAgIHZhciBpbnNlcnRUZW1wbGF0ZSA9IGZ1bmN0aW9uIChlZGl0b3IsIHVpLCBodG1sKSB7XG4gICAgICB2YXIgZWw7XG4gICAgICB2YXIgZG9tID0gZWRpdG9yLmRvbTtcbiAgICAgIHZhciBzZWwgPSBlZGl0b3Iuc2VsZWN0aW9uLmdldENvbnRlbnQoKTtcbiAgICAgIGh0bWwgPSByZXBsYWNlVGVtcGxhdGVWYWx1ZXMoaHRtbCwgZ2V0VGVtcGxhdGVSZXBsYWNlVmFsdWVzKGVkaXRvcikpO1xuICAgICAgZWwgPSBkb20uY3JlYXRlKCdkaXYnLCBudWxsLCBodG1sKTtcbiAgICAgIHZhciBuID0gZG9tLnNlbGVjdCgnLm1jZVRtcGwnLCBlbCk7XG4gICAgICBpZiAobiAmJiBuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZWwgPSBkb20uY3JlYXRlKCdkaXYnLCBudWxsKTtcbiAgICAgICAgZWwuYXBwZW5kQ2hpbGQoblswXS5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgfVxuICAgICAgZ2xvYmFsJDEuZWFjaChkb20uc2VsZWN0KCcqJywgZWwpLCBmdW5jdGlvbiAobikge1xuICAgICAgICBpZiAoaGFzQ2xhc3MobiwgZ2V0Q3JlYXRpb25EYXRlQ2xhc3NlcyhlZGl0b3IpLnJlcGxhY2UoL1xccysvZywgJ3wnKSkpIHtcbiAgICAgICAgICBuLmlubmVySFRNTCA9IGdldERhdGVUaW1lKGVkaXRvciwgZ2V0Q2RhdGVGb3JtYXQoZWRpdG9yKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc0NsYXNzKG4sIGdldE1vZGlmaWNhdGlvbkRhdGVDbGFzc2VzKGVkaXRvcikucmVwbGFjZSgvXFxzKy9nLCAnfCcpKSkge1xuICAgICAgICAgIG4uaW5uZXJIVE1MID0gZ2V0RGF0ZVRpbWUoZWRpdG9yLCBnZXRNZGF0ZUZvcm1hdChlZGl0b3IpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzQ2xhc3MobiwgZ2V0U2VsZWN0ZWRDb250ZW50Q2xhc3NlcyhlZGl0b3IpLnJlcGxhY2UoL1xccysvZywgJ3wnKSkpIHtcbiAgICAgICAgICBuLmlubmVySFRNTCA9IHNlbDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXBsYWNlVmFscyhlZGl0b3IsIGVsKTtcbiAgICAgIGVkaXRvci5leGVjQ29tbWFuZCgnbWNlSW5zZXJ0Q29udGVudCcsIGZhbHNlLCBlbC5pbm5lckhUTUwpO1xuICAgICAgZWRpdG9yLmFkZFZpc3VhbCgpO1xuICAgIH07XG5cbiAgICB2YXIgcmVnaXN0ZXIgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBlZGl0b3IuYWRkQ29tbWFuZCgnbWNlSW5zZXJ0VGVtcGxhdGUnLCBjdXJyeShpbnNlcnRUZW1wbGF0ZSwgZWRpdG9yKSk7XG4gICAgfTtcblxuICAgIHZhciBzZXR1cCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIGVkaXRvci5vbignUHJlUHJvY2VzcycsIGZ1bmN0aW9uIChvKSB7XG4gICAgICAgIHZhciBkb20gPSBlZGl0b3IuZG9tLCBkYXRlRm9ybWF0ID0gZ2V0TWRhdGVGb3JtYXQoZWRpdG9yKTtcbiAgICAgICAgZ2xvYmFsJDEuZWFjaChkb20uc2VsZWN0KCdkaXYnLCBvLm5vZGUpLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGlmIChkb20uaGFzQ2xhc3MoZSwgJ21jZVRtcGwnKSkge1xuICAgICAgICAgICAgZ2xvYmFsJDEuZWFjaChkb20uc2VsZWN0KCcqJywgZSksIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgIGlmIChkb20uaGFzQ2xhc3MoZSwgZ2V0TW9kaWZpY2F0aW9uRGF0ZUNsYXNzZXMoZWRpdG9yKS5yZXBsYWNlKC9cXHMrL2csICd8JykpKSB7XG4gICAgICAgICAgICAgICAgZS5pbm5lckhUTUwgPSBnZXREYXRlVGltZShlZGl0b3IsIGRhdGVGb3JtYXQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlcGxhY2VWYWxzKGVkaXRvciwgZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgbm9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBOT05FO1xuICAgIH07XG4gICAgdmFyIE5PTkUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgZXEgPSBmdW5jdGlvbiAobykge1xuICAgICAgICByZXR1cm4gby5pc05vbmUoKTtcbiAgICAgIH07XG4gICAgICB2YXIgY2FsbCA9IGZ1bmN0aW9uICh0aHVuaykge1xuICAgICAgICByZXR1cm4gdGh1bmsoKTtcbiAgICAgIH07XG4gICAgICB2YXIgaWQgPSBmdW5jdGlvbiAobikge1xuICAgICAgICByZXR1cm4gbjtcbiAgICAgIH07XG4gICAgICB2YXIgbWUgPSB7XG4gICAgICAgIGZvbGQ6IGZ1bmN0aW9uIChuLCBfcykge1xuICAgICAgICAgIHJldHVybiBuKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzOiBuZXZlcixcbiAgICAgICAgaXNTb21lOiBuZXZlcixcbiAgICAgICAgaXNOb25lOiBhbHdheXMsXG4gICAgICAgIGdldE9yOiBpZCxcbiAgICAgICAgZ2V0T3JUaHVuazogY2FsbCxcbiAgICAgICAgZ2V0T3JEaWU6IGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnIHx8ICdlcnJvcjogZ2V0T3JEaWUgY2FsbGVkIG9uIG5vbmUuJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldE9yTnVsbDogY29uc3RhbnQobnVsbCksXG4gICAgICAgIGdldE9yVW5kZWZpbmVkOiBjb25zdGFudCh1bmRlZmluZWQpLFxuICAgICAgICBvcjogaWQsXG4gICAgICAgIG9yVGh1bms6IGNhbGwsXG4gICAgICAgIG1hcDogbm9uZSxcbiAgICAgICAgZWFjaDogbm9vcCxcbiAgICAgICAgYmluZDogbm9uZSxcbiAgICAgICAgZXhpc3RzOiBuZXZlcixcbiAgICAgICAgZm9yYWxsOiBhbHdheXMsXG4gICAgICAgIGZpbHRlcjogbm9uZSxcbiAgICAgICAgZXF1YWxzOiBlcSxcbiAgICAgICAgZXF1YWxzXzogZXEsXG4gICAgICAgIHRvQXJyYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0sXG4gICAgICAgIHRvU3RyaW5nOiBjb25zdGFudCgnbm9uZSgpJylcbiAgICAgIH07XG4gICAgICByZXR1cm4gbWU7XG4gICAgfSgpO1xuICAgIHZhciBzb21lID0gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHZhciBjb25zdGFudF9hID0gY29uc3RhbnQoYSk7XG4gICAgICB2YXIgc2VsZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG1lO1xuICAgICAgfTtcbiAgICAgIHZhciBiaW5kID0gZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgcmV0dXJuIGYoYSk7XG4gICAgICB9O1xuICAgICAgdmFyIG1lID0ge1xuICAgICAgICBmb2xkOiBmdW5jdGlvbiAobiwgcykge1xuICAgICAgICAgIHJldHVybiBzKGEpO1xuICAgICAgICB9LFxuICAgICAgICBpczogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICByZXR1cm4gYSA9PT0gdjtcbiAgICAgICAgfSxcbiAgICAgICAgaXNTb21lOiBhbHdheXMsXG4gICAgICAgIGlzTm9uZTogbmV2ZXIsXG4gICAgICAgIGdldE9yOiBjb25zdGFudF9hLFxuICAgICAgICBnZXRPclRodW5rOiBjb25zdGFudF9hLFxuICAgICAgICBnZXRPckRpZTogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JOdWxsOiBjb25zdGFudF9hLFxuICAgICAgICBnZXRPclVuZGVmaW5lZDogY29uc3RhbnRfYSxcbiAgICAgICAgb3I6IHNlbGYsXG4gICAgICAgIG9yVGh1bms6IHNlbGYsXG4gICAgICAgIG1hcDogZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICByZXR1cm4gc29tZShmKGEpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZWFjaDogZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICBmKGEpO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kOiBiaW5kLFxuICAgICAgICBleGlzdHM6IGJpbmQsXG4gICAgICAgIGZvcmFsbDogYmluZCxcbiAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiAoZikge1xuICAgICAgICAgIHJldHVybiBmKGEpID8gbWUgOiBOT05FO1xuICAgICAgICB9LFxuICAgICAgICB0b0FycmF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIFthXTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gJ3NvbWUoJyArIGEgKyAnKSc7XG4gICAgICAgIH0sXG4gICAgICAgIGVxdWFsczogZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgICByZXR1cm4gby5pcyhhKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXF1YWxzXzogZnVuY3Rpb24gKG8sIGVsZW1lbnRFcSkge1xuICAgICAgICAgIHJldHVybiBvLmZvbGQobmV2ZXIsIGZ1bmN0aW9uIChiKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudEVxKGEsIGIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIG1lO1xuICAgIH07XG4gICAgdmFyIGZyb20gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gTk9ORSA6IHNvbWUodmFsdWUpO1xuICAgIH07XG4gICAgdmFyIE9wdGlvbiA9IHtcbiAgICAgIHNvbWU6IHNvbWUsXG4gICAgICBub25lOiBub25lLFxuICAgICAgZnJvbTogZnJvbVxuICAgIH07XG5cbiAgICB2YXIgbWFwID0gZnVuY3Rpb24gKHhzLCBmKSB7XG4gICAgICB2YXIgbGVuID0geHMubGVuZ3RoO1xuICAgICAgdmFyIHIgPSBuZXcgQXJyYXkobGVuKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHggPSB4c1tpXTtcbiAgICAgICAgcltpXSA9IGYoeCwgaSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcjtcbiAgICB9O1xuICAgIHZhciBmaW5kVW50aWwgPSBmdW5jdGlvbiAoeHMsIHByZWQsIHVudGlsKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0geHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHggPSB4c1tpXTtcbiAgICAgICAgaWYgKHByZWQoeCwgaSkpIHtcbiAgICAgICAgICByZXR1cm4gT3B0aW9uLnNvbWUoeCk7XG4gICAgICAgIH0gZWxzZSBpZiAodW50aWwoeCwgaSkpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIE9wdGlvbi5ub25lKCk7XG4gICAgfTtcbiAgICB2YXIgZmluZCA9IGZ1bmN0aW9uICh4cywgcHJlZCkge1xuICAgICAgcmV0dXJuIGZpbmRVbnRpbCh4cywgcHJlZCwgbmV2ZXIpO1xuICAgIH07XG5cbiAgICB2YXIgZ2xvYmFsJDMgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS51dGlsLlByb21pc2UnKTtcblxuICAgIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5oYXNPd25Qcm9wZXJ0eTtcbiAgICB2YXIgZ2V0ID0gZnVuY3Rpb24gKG9iaiwga2V5KSB7XG4gICAgICByZXR1cm4gaGFzKG9iaiwga2V5KSA/IE9wdGlvbi5mcm9tKG9ialtrZXldKSA6IE9wdGlvbi5ub25lKCk7XG4gICAgfTtcbiAgICB2YXIgaGFzID0gZnVuY3Rpb24gKG9iaiwga2V5KSB7XG4gICAgICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSk7XG4gICAgfTtcblxuICAgIHZhciBlbnRpdGllc0F0dHIgPSB7XG4gICAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICAgICc8JzogJyZsdDsnLFxuICAgICAgJz4nOiAnJmd0OycsXG4gICAgICAnJic6ICcmYW1wOycsXG4gICAgICAnXFwnJzogJyYjMDM5OydcbiAgICB9O1xuICAgIHZhciBodG1sRXNjYXBlID0gZnVuY3Rpb24gKGh0bWwpIHtcbiAgICAgIHJldHVybiBodG1sLnJlcGxhY2UoL1tcIic8PiZdL2csIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgICByZXR1cm4gZ2V0KGVudGl0aWVzQXR0ciwgbWF0Y2gpLmdldE9yKG1hdGNoKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0UHJldmlld0NvbnRlbnQgPSBmdW5jdGlvbiAoZWRpdG9yLCBodG1sKSB7XG4gICAgICBpZiAoaHRtbC5pbmRleE9mKCc8aHRtbD4nKSA9PT0gLTEpIHtcbiAgICAgICAgdmFyIGNvbnRlbnRDc3NMaW5rc18xID0gJyc7XG4gICAgICAgIGdsb2JhbCQxLmVhY2goZWRpdG9yLmNvbnRlbnRDU1MsIGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgICBjb250ZW50Q3NzTGlua3NfMSArPSAnPGxpbmsgdHlwZT1cInRleHQvY3NzXCIgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCInICsgZWRpdG9yLmRvY3VtZW50QmFzZVVSSS50b0Fic29sdXRlKHVybCkgKyAnXCI+JztcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBib2R5Q2xhc3MgPSBnZXRCb2R5Q2xhc3MoZWRpdG9yKTtcbiAgICAgICAgdmFyIGVuY29kZSA9IGVkaXRvci5kb20uZW5jb2RlO1xuICAgICAgICB2YXIgZGlyZWN0aW9uYWxpdHkgPSBlZGl0b3IuZ2V0Qm9keSgpLmRpcjtcbiAgICAgICAgdmFyIGRpckF0dHIgPSBkaXJlY3Rpb25hbGl0eSA/ICcgZGlyPVwiJyArIGVuY29kZShkaXJlY3Rpb25hbGl0eSkgKyAnXCInIDogJyc7XG4gICAgICAgIGh0bWwgPSAnPCFET0NUWVBFIGh0bWw+JyArICc8aHRtbD4nICsgJzxoZWFkPicgKyBjb250ZW50Q3NzTGlua3NfMSArICc8L2hlYWQ+JyArICc8Ym9keSBjbGFzcz1cIicgKyBlbmNvZGUoYm9keUNsYXNzKSArICdcIicgKyBkaXJBdHRyICsgJz4nICsgaHRtbCArICc8L2JvZHk+JyArICc8L2h0bWw+JztcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXBsYWNlVGVtcGxhdGVWYWx1ZXMoaHRtbCwgZ2V0UHJldmlld1JlcGxhY2VWYWx1ZXMoZWRpdG9yKSk7XG4gICAgfTtcbiAgICB2YXIgb3BlbiA9IGZ1bmN0aW9uIChlZGl0b3IsIHRlbXBsYXRlTGlzdCkge1xuICAgICAgdmFyIGNyZWF0ZVRlbXBsYXRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0ZW1wbGF0ZUxpc3QgfHwgdGVtcGxhdGVMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHZhciBtZXNzYWdlID0gZWRpdG9yLnRyYW5zbGF0ZSgnTm8gdGVtcGxhdGVzIGRlZmluZWQuJyk7XG4gICAgICAgICAgZWRpdG9yLm5vdGlmaWNhdGlvbk1hbmFnZXIub3Blbih7XG4gICAgICAgICAgICB0ZXh0OiBtZXNzYWdlLFxuICAgICAgICAgICAgdHlwZTogJ2luZm8nXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIE9wdGlvbi5ub25lKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE9wdGlvbi5mcm9tKGdsb2JhbCQxLm1hcCh0ZW1wbGF0ZUxpc3QsIGZ1bmN0aW9uICh0ZW1wbGF0ZSwgaW5kZXgpIHtcbiAgICAgICAgICB2YXIgaXNVcmxUZW1wbGF0ZSA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdC51cmwgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzZWxlY3RlZDogaW5kZXggPT09IDAsXG4gICAgICAgICAgICB0ZXh0OiB0ZW1wbGF0ZS50aXRsZSxcbiAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgIHVybDogaXNVcmxUZW1wbGF0ZSh0ZW1wbGF0ZSkgPyBPcHRpb24uZnJvbSh0ZW1wbGF0ZS51cmwpIDogT3B0aW9uLm5vbmUoKSxcbiAgICAgICAgICAgICAgY29udGVudDogIWlzVXJsVGVtcGxhdGUodGVtcGxhdGUpID8gT3B0aW9uLmZyb20odGVtcGxhdGUuY29udGVudCkgOiBPcHRpb24ubm9uZSgpLFxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGVtcGxhdGUuZGVzY3JpcHRpb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSk7XG4gICAgICB9O1xuICAgICAgdmFyIGNyZWF0ZVNlbGVjdEJveEl0ZW1zID0gZnVuY3Rpb24gKHRlbXBsYXRlcykge1xuICAgICAgICByZXR1cm4gbWFwKHRlbXBsYXRlcywgZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGV4dDogdC50ZXh0LFxuICAgICAgICAgICAgdmFsdWU6IHQudGV4dFxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIHZhciBmaW5kVGVtcGxhdGUgPSBmdW5jdGlvbiAodGVtcGxhdGVzLCB0ZW1wbGF0ZVRpdGxlKSB7XG4gICAgICAgIHJldHVybiBmaW5kKHRlbXBsYXRlcywgZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICByZXR1cm4gdC50ZXh0ID09PSB0ZW1wbGF0ZVRpdGxlO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICB2YXIgbG9hZEZhaWxlZEFsZXJ0ID0gZnVuY3Rpb24gKGFwaSkge1xuICAgICAgICBlZGl0b3Iud2luZG93TWFuYWdlci5hbGVydCgnQ291bGQgbm90IGxvYWQgdGhlIHNwZWNpZmllZCB0ZW1wbGF0ZS4nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGFwaS5mb2N1cygndGVtcGxhdGUnKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgdmFyIGdldFRlbXBsYXRlQ29udGVudCA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiBuZXcgZ2xvYmFsJDMoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIHQudmFsdWUudXJsLmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodC52YWx1ZS5jb250ZW50LmdldE9yKCcnKSk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKHVybCkge1xuICAgICAgICAgICAgcmV0dXJuIGdsb2JhbCQyLnNlbmQoe1xuICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGh0bWwpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGh0bWwpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICB2YXIgb25DaGFuZ2UgPSBmdW5jdGlvbiAodGVtcGxhdGVzLCB1cGRhdGVEaWFsb2cpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhcGksIGNoYW5nZSkge1xuICAgICAgICAgIGlmIChjaGFuZ2UubmFtZSA9PT0gJ3RlbXBsYXRlJykge1xuICAgICAgICAgICAgdmFyIG5ld1RlbXBsYXRlVGl0bGUgPSBhcGkuZ2V0RGF0YSgpLnRlbXBsYXRlO1xuICAgICAgICAgICAgZmluZFRlbXBsYXRlKHRlbXBsYXRlcywgbmV3VGVtcGxhdGVUaXRsZSkuZWFjaChmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgICBhcGkuYmxvY2soJ0xvYWRpbmcuLi4nKTtcbiAgICAgICAgICAgICAgZ2V0VGVtcGxhdGVDb250ZW50KHQpLnRoZW4oZnVuY3Rpb24gKHByZXZpZXdIdG1sKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlRGlhbG9nKGFwaSwgdCwgcHJldmlld0h0bWwpO1xuICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlRGlhbG9nKGFwaSwgdCwgJycpO1xuICAgICAgICAgICAgICAgIGFwaS5kaXNhYmxlKCdzYXZlJyk7XG4gICAgICAgICAgICAgICAgbG9hZEZhaWxlZEFsZXJ0KGFwaSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfTtcbiAgICAgIHZhciBvblN1Ym1pdCA9IGZ1bmN0aW9uICh0ZW1wbGF0ZXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhcGkpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IGFwaS5nZXREYXRhKCk7XG4gICAgICAgICAgZmluZFRlbXBsYXRlKHRlbXBsYXRlcywgZGF0YS50ZW1wbGF0ZSkuZWFjaChmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgZ2V0VGVtcGxhdGVDb250ZW50KHQpLnRoZW4oZnVuY3Rpb24gKHByZXZpZXdIdG1sKSB7XG4gICAgICAgICAgICAgIGluc2VydFRlbXBsYXRlKGVkaXRvciwgZmFsc2UsIHByZXZpZXdIdG1sKTtcbiAgICAgICAgICAgICAgYXBpLmNsb3NlKCk7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGFwaS5kaXNhYmxlKCdzYXZlJyk7XG4gICAgICAgICAgICAgIGxvYWRGYWlsZWRBbGVydChhcGkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgICAgdmFyIG9wZW5EaWFsb2cgPSBmdW5jdGlvbiAodGVtcGxhdGVzKSB7XG4gICAgICAgIHZhciBzZWxlY3RCb3hJdGVtcyA9IGNyZWF0ZVNlbGVjdEJveEl0ZW1zKHRlbXBsYXRlcyk7XG4gICAgICAgIHZhciBidWlsZERpYWxvZ1NwZWMgPSBmdW5jdGlvbiAoYm9keUl0ZW1zLCBpbml0aWFsRGF0YSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0aXRsZTogJ0luc2VydCBUZW1wbGF0ZScsXG4gICAgICAgICAgICBzaXplOiAnbGFyZ2UnLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICB0eXBlOiAncGFuZWwnLFxuICAgICAgICAgICAgICBpdGVtczogYm9keUl0ZW1zXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5pdGlhbERhdGE6IGluaXRpYWxEYXRhLFxuICAgICAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2NhbmNlbCcsXG4gICAgICAgICAgICAgICAgbmFtZTogJ2NhbmNlbCcsXG4gICAgICAgICAgICAgICAgdGV4dDogJ0NhbmNlbCdcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdWJtaXQnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdzYXZlJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiAnU2F2ZScsXG4gICAgICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgb25TdWJtaXQ6IG9uU3VibWl0KHRlbXBsYXRlcyksXG4gICAgICAgICAgICBvbkNoYW5nZTogb25DaGFuZ2UodGVtcGxhdGVzLCB1cGRhdGVEaWFsb2cpXG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHVwZGF0ZURpYWxvZyA9IGZ1bmN0aW9uIChkaWFsb2dBcGksIHRlbXBsYXRlLCBwcmV2aWV3SHRtbCkge1xuICAgICAgICAgIHZhciBjb250ZW50ID0gZ2V0UHJldmlld0NvbnRlbnQoZWRpdG9yLCBwcmV2aWV3SHRtbCk7XG4gICAgICAgICAgdmFyIGJvZHlJdGVtcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdHlwZTogJ3NlbGVjdGJveCcsXG4gICAgICAgICAgICAgIG5hbWU6ICd0ZW1wbGF0ZScsXG4gICAgICAgICAgICAgIGxhYmVsOiAnVGVtcGxhdGVzJyxcbiAgICAgICAgICAgICAgaXRlbXM6IHNlbGVjdEJveEl0ZW1zXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0eXBlOiAnaHRtbHBhbmVsJyxcbiAgICAgICAgICAgICAgaHRtbDogJzxwIGFyaWEtbGl2ZT1cInBvbGl0ZVwiPicgKyBodG1sRXNjYXBlKHRlbXBsYXRlLnZhbHVlLmRlc2NyaXB0aW9uKSArICc8L3A+J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICdQcmV2aWV3JyxcbiAgICAgICAgICAgICAgdHlwZTogJ2lmcmFtZScsXG4gICAgICAgICAgICAgIG5hbWU6ICdwcmV2aWV3JyxcbiAgICAgICAgICAgICAgc2FuZGJveGVkOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF07XG4gICAgICAgICAgdmFyIGluaXRpYWxEYXRhID0ge1xuICAgICAgICAgICAgdGVtcGxhdGU6IHRlbXBsYXRlLnRleHQsXG4gICAgICAgICAgICBwcmV2aWV3OiBjb250ZW50XG4gICAgICAgICAgfTtcbiAgICAgICAgICBkaWFsb2dBcGkudW5ibG9jaygpO1xuICAgICAgICAgIGRpYWxvZ0FwaS5yZWRpYWwoYnVpbGREaWFsb2dTcGVjKGJvZHlJdGVtcywgaW5pdGlhbERhdGEpKTtcbiAgICAgICAgICBkaWFsb2dBcGkuZm9jdXMoJ3RlbXBsYXRlJyk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBkaWFsb2dBcGkgPSBlZGl0b3Iud2luZG93TWFuYWdlci5vcGVuKGJ1aWxkRGlhbG9nU3BlYyhbXSwge1xuICAgICAgICAgIHRlbXBsYXRlOiAnJyxcbiAgICAgICAgICBwcmV2aWV3OiAnJ1xuICAgICAgICB9KSk7XG4gICAgICAgIGRpYWxvZ0FwaS5ibG9jaygnTG9hZGluZy4uLicpO1xuICAgICAgICBnZXRUZW1wbGF0ZUNvbnRlbnQodGVtcGxhdGVzWzBdKS50aGVuKGZ1bmN0aW9uIChwcmV2aWV3SHRtbCkge1xuICAgICAgICAgIHVwZGF0ZURpYWxvZyhkaWFsb2dBcGksIHRlbXBsYXRlc1swXSwgcHJldmlld0h0bWwpO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdXBkYXRlRGlhbG9nKGRpYWxvZ0FwaSwgdGVtcGxhdGVzWzBdLCAnJyk7XG4gICAgICAgICAgZGlhbG9nQXBpLmRpc2FibGUoJ3NhdmUnKTtcbiAgICAgICAgICBsb2FkRmFpbGVkQWxlcnQoZGlhbG9nQXBpKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgdmFyIG9wdFRlbXBsYXRlcyA9IGNyZWF0ZVRlbXBsYXRlcygpO1xuICAgICAgb3B0VGVtcGxhdGVzLmVhY2gob3BlbkRpYWxvZyk7XG4gICAgfTtcblxuICAgIHZhciBzaG93RGlhbG9nID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0ZW1wbGF0ZXMpIHtcbiAgICAgICAgb3BlbihlZGl0b3IsIHRlbXBsYXRlcyk7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHJlZ2lzdGVyJDEgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQnV0dG9uKCd0ZW1wbGF0ZScsIHtcbiAgICAgICAgaWNvbjogJ3RlbXBsYXRlJyxcbiAgICAgICAgdG9vbHRpcDogJ0luc2VydCB0ZW1wbGF0ZScsXG4gICAgICAgIG9uQWN0aW9uOiBjcmVhdGVUZW1wbGF0ZUxpc3QoZWRpdG9yLCBzaG93RGlhbG9nKGVkaXRvcikpXG4gICAgICB9KTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRNZW51SXRlbSgndGVtcGxhdGUnLCB7XG4gICAgICAgIGljb246ICd0ZW1wbGF0ZScsXG4gICAgICAgIHRleHQ6ICdJbnNlcnQgdGVtcGxhdGUuLi4nLFxuICAgICAgICBvbkFjdGlvbjogY3JlYXRlVGVtcGxhdGVMaXN0KGVkaXRvciwgc2hvd0RpYWxvZyhlZGl0b3IpKVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFBsdWdpbiAoKSB7XG4gICAgICBnbG9iYWwuYWRkKCd0ZW1wbGF0ZScsIGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgICAgcmVnaXN0ZXIkMShlZGl0b3IpO1xuICAgICAgICByZWdpc3RlcihlZGl0b3IpO1xuICAgICAgICBzZXR1cChlZGl0b3IpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgUGx1Z2luKCk7XG5cbn0oKSk7XG4iXSwic291cmNlUm9vdCI6IiJ9