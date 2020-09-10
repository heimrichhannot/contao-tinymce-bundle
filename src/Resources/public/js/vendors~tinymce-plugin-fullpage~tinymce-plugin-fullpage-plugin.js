(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~tinymce-plugin-fullpage~tinymce-plugin-fullpage-plugin"],{

/***/ "./node_modules/tinymce/plugins/fullpage/plugin.js":
/*!*********************************************************!*\
  !*** ./node_modules/tinymce/plugins/fullpage/plugin.js ***!
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
(function (domGlobals) {
    'use strict';

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

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var __assign = function () {
      __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var global$2 = tinymce.util.Tools.resolve('tinymce.html.DomParser');

    var global$3 = tinymce.util.Tools.resolve('tinymce.html.Node');

    var global$4 = tinymce.util.Tools.resolve('tinymce.html.Serializer');

    var shouldHideInSourceView = function (editor) {
      return editor.getParam('fullpage_hide_in_source_view');
    };
    var getDefaultXmlPi = function (editor) {
      return editor.getParam('fullpage_default_xml_pi');
    };
    var getDefaultEncoding = function (editor) {
      return editor.getParam('fullpage_default_encoding');
    };
    var getDefaultFontFamily = function (editor) {
      return editor.getParam('fullpage_default_font_family');
    };
    var getDefaultFontSize = function (editor) {
      return editor.getParam('fullpage_default_font_size');
    };
    var getDefaultTextColor = function (editor) {
      return editor.getParam('fullpage_default_text_color');
    };
    var getDefaultTitle = function (editor) {
      return editor.getParam('fullpage_default_title');
    };
    var getDefaultDocType = function (editor) {
      return editor.getParam('fullpage_default_doctype', '<!DOCTYPE html>');
    };
    var getProtect = function (editor) {
      return editor.getParam('protect');
    };

    var parseHeader = function (head) {
      return global$2({
        validate: false,
        root_name: '#document'
      }).parse(head, { format: 'xhtml' });
    };
    var htmlToData = function (editor, head) {
      var headerFragment = parseHeader(head);
      var data = {};
      var elm, matches;
      function getAttr(elm, name) {
        var value = elm.attr(name);
        return value || '';
      }
      data.fontface = getDefaultFontFamily(editor);
      data.fontsize = getDefaultFontSize(editor);
      elm = headerFragment.firstChild;
      if (elm.type === 7) {
        data.xml_pi = true;
        matches = /encoding="([^"]+)"/.exec(elm.value);
        if (matches) {
          data.docencoding = matches[1];
        }
      }
      elm = headerFragment.getAll('#doctype')[0];
      if (elm) {
        data.doctype = '<!DOCTYPE' + elm.value + '>';
      }
      elm = headerFragment.getAll('title')[0];
      if (elm && elm.firstChild) {
        data.title = elm.firstChild.value;
      }
      global$1.each(headerFragment.getAll('meta'), function (meta) {
        var name = meta.attr('name');
        var httpEquiv = meta.attr('http-equiv');
        var matches;
        if (name) {
          data[name.toLowerCase()] = meta.attr('content');
        } else if (httpEquiv === 'Content-Type') {
          matches = /charset\s*=\s*(.*)\s*/gi.exec(meta.attr('content'));
          if (matches) {
            data.docencoding = matches[1];
          }
        }
      });
      elm = headerFragment.getAll('html')[0];
      if (elm) {
        data.langcode = getAttr(elm, 'lang') || getAttr(elm, 'xml:lang');
      }
      data.stylesheets = [];
      global$1.each(headerFragment.getAll('link'), function (link) {
        if (link.attr('rel') === 'stylesheet') {
          data.stylesheets.push(link.attr('href'));
        }
      });
      elm = headerFragment.getAll('body')[0];
      if (elm) {
        data.langdir = getAttr(elm, 'dir');
        data.style = getAttr(elm, 'style');
        data.visited_color = getAttr(elm, 'vlink');
        data.link_color = getAttr(elm, 'link');
        data.active_color = getAttr(elm, 'alink');
      }
      return data;
    };
    var dataToHtml = function (editor, data, head) {
      var headElement, elm, value;
      var dom = editor.dom;
      function setAttr(elm, name, value) {
        elm.attr(name, value ? value : undefined);
      }
      function addHeadNode(node) {
        if (headElement.firstChild) {
          headElement.insert(node, headElement.firstChild);
        } else {
          headElement.append(node);
        }
      }
      var headerFragment = parseHeader(head);
      headElement = headerFragment.getAll('head')[0];
      if (!headElement) {
        elm = headerFragment.getAll('html')[0];
        headElement = new global$3('head', 1);
        if (elm.firstChild) {
          elm.insert(headElement, elm.firstChild, true);
        } else {
          elm.append(headElement);
        }
      }
      elm = headerFragment.firstChild;
      if (data.xml_pi) {
        value = 'version="1.0"';
        if (data.docencoding) {
          value += ' encoding="' + data.docencoding + '"';
        }
        if (elm.type !== 7) {
          elm = new global$3('xml', 7);
          headerFragment.insert(elm, headerFragment.firstChild, true);
        }
        elm.value = value;
      } else if (elm && elm.type === 7) {
        elm.remove();
      }
      elm = headerFragment.getAll('#doctype')[0];
      if (data.doctype) {
        if (!elm) {
          elm = new global$3('#doctype', 10);
          if (data.xml_pi) {
            headerFragment.insert(elm, headerFragment.firstChild);
          } else {
            addHeadNode(elm);
          }
        }
        elm.value = data.doctype.substring(9, data.doctype.length - 1);
      } else if (elm) {
        elm.remove();
      }
      elm = null;
      global$1.each(headerFragment.getAll('meta'), function (meta) {
        if (meta.attr('http-equiv') === 'Content-Type') {
          elm = meta;
        }
      });
      if (data.docencoding) {
        if (!elm) {
          elm = new global$3('meta', 1);
          elm.attr('http-equiv', 'Content-Type');
          elm.shortEnded = true;
          addHeadNode(elm);
        }
        elm.attr('content', 'text/html; charset=' + data.docencoding);
      } else if (elm) {
        elm.remove();
      }
      elm = headerFragment.getAll('title')[0];
      if (data.title) {
        if (!elm) {
          elm = new global$3('title', 1);
          addHeadNode(elm);
        } else {
          elm.empty();
        }
        elm.append(new global$3('#text', 3)).value = data.title;
      } else if (elm) {
        elm.remove();
      }
      global$1.each('keywords,description,author,copyright,robots'.split(','), function (name) {
        var nodes = headerFragment.getAll('meta');
        var i, meta;
        var value = data[name];
        for (i = 0; i < nodes.length; i++) {
          meta = nodes[i];
          if (meta.attr('name') === name) {
            if (value) {
              meta.attr('content', value);
            } else {
              meta.remove();
            }
            return;
          }
        }
        if (value) {
          elm = new global$3('meta', 1);
          elm.attr('name', name);
          elm.attr('content', value);
          elm.shortEnded = true;
          addHeadNode(elm);
        }
      });
      var currentStyleSheetsMap = {};
      global$1.each(headerFragment.getAll('link'), function (stylesheet) {
        if (stylesheet.attr('rel') === 'stylesheet') {
          currentStyleSheetsMap[stylesheet.attr('href')] = stylesheet;
        }
      });
      global$1.each(data.stylesheets, function (stylesheet) {
        if (!currentStyleSheetsMap[stylesheet]) {
          elm = new global$3('link', 1);
          elm.attr({
            rel: 'stylesheet',
            text: 'text/css',
            href: stylesheet
          });
          elm.shortEnded = true;
          addHeadNode(elm);
        }
        delete currentStyleSheetsMap[stylesheet];
      });
      global$1.each(currentStyleSheetsMap, function (stylesheet) {
        stylesheet.remove();
      });
      elm = headerFragment.getAll('body')[0];
      if (elm) {
        setAttr(elm, 'dir', data.langdir);
        setAttr(elm, 'style', data.style);
        setAttr(elm, 'vlink', data.visited_color);
        setAttr(elm, 'link', data.link_color);
        setAttr(elm, 'alink', data.active_color);
        dom.setAttribs(editor.getBody(), {
          style: data.style,
          dir: data.dir,
          vLink: data.visited_color,
          link: data.link_color,
          aLink: data.active_color
        });
      }
      elm = headerFragment.getAll('html')[0];
      if (elm) {
        setAttr(elm, 'lang', data.langcode);
        setAttr(elm, 'xml:lang', data.langcode);
      }
      if (!headElement.firstChild) {
        headElement.remove();
      }
      var html = global$4({
        validate: false,
        indent: true,
        indent_before: 'head,html,body,meta,title,script,link,style',
        indent_after: 'head,html,body,meta,title,script,link,style'
      }).serialize(headerFragment);
      return html.substring(0, html.indexOf('</body>'));
    };

    var open = function (editor, headState) {
      var data = htmlToData(editor, headState.get());
      var defaultData = {
        title: '',
        keywords: '',
        description: '',
        robots: '',
        author: '',
        docencoding: ''
      };
      var initialData = __assign(__assign({}, defaultData), data);
      editor.windowManager.open({
        title: 'Metadata and Document Properties',
        size: 'normal',
        body: {
          type: 'panel',
          items: [
            {
              name: 'title',
              type: 'input',
              label: 'Title'
            },
            {
              name: 'keywords',
              type: 'input',
              label: 'Keywords'
            },
            {
              name: 'description',
              type: 'input',
              label: 'Description'
            },
            {
              name: 'robots',
              type: 'input',
              label: 'Robots'
            },
            {
              name: 'author',
              type: 'input',
              label: 'Author'
            },
            {
              name: 'docencoding',
              type: 'input',
              label: 'Encoding'
            }
          ]
        },
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
        initialData: initialData,
        onSubmit: function (api) {
          var nuData = api.getData();
          var headHtml = dataToHtml(editor, global$1.extend(data, nuData), headState.get());
          headState.set(headHtml);
          api.close();
        }
      });
    };

    var register = function (editor, headState) {
      editor.addCommand('mceFullPageProperties', function () {
        open(editor, headState);
      });
    };

    var protectHtml = function (protect, html) {
      global$1.each(protect, function (pattern) {
        html = html.replace(pattern, function (str) {
          return '<!--mce:protected ' + escape(str) + '-->';
        });
      });
      return html;
    };
    var unprotectHtml = function (html) {
      return html.replace(/<!--mce:protected ([\s\S]*?)-->/g, function (a, m) {
        return unescape(m);
      });
    };

    var each = global$1.each;
    var low = function (s) {
      return s.replace(/<\/?[A-Z]+/g, function (a) {
        return a.toLowerCase();
      });
    };
    var handleSetContent = function (editor, headState, footState, evt) {
      var startPos, endPos, content, styles = '';
      var dom = editor.dom;
      if (evt.selection) {
        return;
      }
      content = protectHtml(getProtect(editor), evt.content);
      if (evt.format === 'raw' && headState.get()) {
        return;
      }
      if (evt.source_view && shouldHideInSourceView(editor)) {
        return;
      }
      if (content.length === 0 && !evt.source_view) {
        content = global$1.trim(headState.get()) + '\n' + global$1.trim(content) + '\n' + global$1.trim(footState.get());
      }
      content = content.replace(/<(\/?)BODY/gi, '<$1body');
      startPos = content.indexOf('<body');
      if (startPos !== -1) {
        startPos = content.indexOf('>', startPos);
        headState.set(low(content.substring(0, startPos + 1)));
        endPos = content.indexOf('</body', startPos);
        if (endPos === -1) {
          endPos = content.length;
        }
        evt.content = global$1.trim(content.substring(startPos + 1, endPos));
        footState.set(low(content.substring(endPos)));
      } else {
        headState.set(getDefaultHeader(editor));
        footState.set('\n</body>\n</html>');
      }
      var headerFragment = parseHeader(headState.get());
      each(headerFragment.getAll('style'), function (node) {
        if (node.firstChild) {
          styles += node.firstChild.value;
        }
      });
      var bodyElm = headerFragment.getAll('body')[0];
      if (bodyElm) {
        dom.setAttribs(editor.getBody(), {
          style: bodyElm.attr('style') || '',
          dir: bodyElm.attr('dir') || '',
          vLink: bodyElm.attr('vlink') || '',
          link: bodyElm.attr('link') || '',
          aLink: bodyElm.attr('alink') || ''
        });
      }
      dom.remove('fullpage_styles');
      var headElm = editor.getDoc().getElementsByTagName('head')[0];
      if (styles) {
        var styleElm = dom.add(headElm, 'style', { id: 'fullpage_styles' });
        styleElm.appendChild(domGlobals.document.createTextNode(styles));
      }
      var currentStyleSheetsMap = {};
      global$1.each(headElm.getElementsByTagName('link'), function (stylesheet) {
        if (stylesheet.rel === 'stylesheet' && stylesheet.getAttribute('data-mce-fullpage')) {
          currentStyleSheetsMap[stylesheet.href] = stylesheet;
        }
      });
      global$1.each(headerFragment.getAll('link'), function (stylesheet) {
        var href = stylesheet.attr('href');
        if (!href) {
          return true;
        }
        if (!currentStyleSheetsMap[href] && stylesheet.attr('rel') === 'stylesheet') {
          dom.add(headElm, 'link', {
            'rel': 'stylesheet',
            'text': 'text/css',
            href: href,
            'data-mce-fullpage': '1'
          });
        }
        delete currentStyleSheetsMap[href];
      });
      global$1.each(currentStyleSheetsMap, function (stylesheet) {
        stylesheet.parentNode.removeChild(stylesheet);
      });
    };
    var getDefaultHeader = function (editor) {
      var header = '', value, styles = '';
      if (getDefaultXmlPi(editor)) {
        var piEncoding = getDefaultEncoding(editor);
        header += '<?xml version="1.0" encoding="' + (piEncoding ? piEncoding : 'ISO-8859-1') + '" ?>\n';
      }
      header += getDefaultDocType(editor);
      header += '\n<html>\n<head>\n';
      if (value = getDefaultTitle(editor)) {
        header += '<title>' + value + '</title>\n';
      }
      if (value = getDefaultEncoding(editor)) {
        header += '<meta http-equiv="Content-Type" content="text/html; charset=' + value + '" />\n';
      }
      if (value = getDefaultFontFamily(editor)) {
        styles += 'font-family: ' + value + ';';
      }
      if (value = getDefaultFontSize(editor)) {
        styles += 'font-size: ' + value + ';';
      }
      if (value = getDefaultTextColor(editor)) {
        styles += 'color: ' + value + ';';
      }
      header += '</head>\n<body' + (styles ? ' style="' + styles + '"' : '') + '>\n';
      return header;
    };
    var handleGetContent = function (editor, head, foot, evt) {
      if (!evt.selection && (!evt.source_view || !shouldHideInSourceView(editor))) {
        evt.content = unprotectHtml(global$1.trim(head) + '\n' + global$1.trim(evt.content) + '\n' + global$1.trim(foot));
      }
    };
    var setup = function (editor, headState, footState) {
      editor.on('BeforeSetContent', function (evt) {
        handleSetContent(editor, headState, footState, evt);
      });
      editor.on('GetContent', function (evt) {
        handleGetContent(editor, headState.get(), footState.get(), evt);
      });
    };

    var register$1 = function (editor) {
      editor.ui.registry.addButton('fullpage', {
        tooltip: 'Metadata and document properties',
        icon: 'document-properties',
        onAction: function () {
          editor.execCommand('mceFullPageProperties');
        }
      });
      editor.ui.registry.addMenuItem('fullpage', {
        text: 'Metadata and document properties',
        icon: 'document-properties',
        onAction: function () {
          editor.execCommand('mceFullPageProperties');
        }
      });
    };

    function Plugin () {
      global.add('fullpage', function (editor) {
        var headState = Cell(''), footState = Cell('');
        register(editor, headState);
        register$1(editor);
        setup(editor, headState, footState);
      });
    }

    Plugin();

}(window));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2Z1bGxwYWdlL3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsZ0RBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sZUFBZSxrQkFBa0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QyxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELHdCQUF3QjtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNFQUFzRTtBQUN0RTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBLENBQUMiLCJmaWxlIjoidmVuZG9yc350aW55bWNlLXBsdWdpbi1mdWxscGFnZX50aW55bWNlLXBsdWdpbi1mdWxscGFnZS1wbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqXG4gKiBWZXJzaW9uOiA1LjQuMiAoMjAyMC0wOC0xNylcbiAqL1xuKGZ1bmN0aW9uIChkb21HbG9iYWxzKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIENlbGwgPSBmdW5jdGlvbiAoaW5pdGlhbCkge1xuICAgICAgdmFyIHZhbHVlID0gaW5pdGlhbDtcbiAgICAgIHZhciBnZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG4gICAgICB2YXIgc2V0ID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdmFsdWUgPSB2O1xuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdldDogZ2V0LFxuICAgICAgICBzZXQ6IHNldFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIGdsb2JhbCA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLlBsdWdpbk1hbmFnZXInKTtcblxuICAgIHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgZm9yICh2YXIgcCBpbiBzKVxuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIHZhciBnbG9iYWwkMSA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuVG9vbHMnKTtcblxuICAgIHZhciBnbG9iYWwkMiA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLmh0bWwuRG9tUGFyc2VyJyk7XG5cbiAgICB2YXIgZ2xvYmFsJDMgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5odG1sLk5vZGUnKTtcblxuICAgIHZhciBnbG9iYWwkNCA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLmh0bWwuU2VyaWFsaXplcicpO1xuXG4gICAgdmFyIHNob3VsZEhpZGVJblNvdXJjZVZpZXcgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdmdWxscGFnZV9oaWRlX2luX3NvdXJjZV92aWV3Jyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0RGVmYXVsdFhtbFBpID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnZnVsbHBhZ2VfZGVmYXVsdF94bWxfcGknKTtcbiAgICB9O1xuICAgIHZhciBnZXREZWZhdWx0RW5jb2RpbmcgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdmdWxscGFnZV9kZWZhdWx0X2VuY29kaW5nJyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0RGVmYXVsdEZvbnRGYW1pbHkgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdmdWxscGFnZV9kZWZhdWx0X2ZvbnRfZmFtaWx5Jyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0RGVmYXVsdEZvbnRTaXplID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnZnVsbHBhZ2VfZGVmYXVsdF9mb250X3NpemUnKTtcbiAgICB9O1xuICAgIHZhciBnZXREZWZhdWx0VGV4dENvbG9yID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnZnVsbHBhZ2VfZGVmYXVsdF90ZXh0X2NvbG9yJyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0RGVmYXVsdFRpdGxlID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnZnVsbHBhZ2VfZGVmYXVsdF90aXRsZScpO1xuICAgIH07XG4gICAgdmFyIGdldERlZmF1bHREb2NUeXBlID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnZnVsbHBhZ2VfZGVmYXVsdF9kb2N0eXBlJywgJzwhRE9DVFlQRSBodG1sPicpO1xuICAgIH07XG4gICAgdmFyIGdldFByb3RlY3QgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdwcm90ZWN0Jyk7XG4gICAgfTtcblxuICAgIHZhciBwYXJzZUhlYWRlciA9IGZ1bmN0aW9uIChoZWFkKSB7XG4gICAgICByZXR1cm4gZ2xvYmFsJDIoe1xuICAgICAgICB2YWxpZGF0ZTogZmFsc2UsXG4gICAgICAgIHJvb3RfbmFtZTogJyNkb2N1bWVudCdcbiAgICAgIH0pLnBhcnNlKGhlYWQsIHsgZm9ybWF0OiAneGh0bWwnIH0pO1xuICAgIH07XG4gICAgdmFyIGh0bWxUb0RhdGEgPSBmdW5jdGlvbiAoZWRpdG9yLCBoZWFkKSB7XG4gICAgICB2YXIgaGVhZGVyRnJhZ21lbnQgPSBwYXJzZUhlYWRlcihoZWFkKTtcbiAgICAgIHZhciBkYXRhID0ge307XG4gICAgICB2YXIgZWxtLCBtYXRjaGVzO1xuICAgICAgZnVuY3Rpb24gZ2V0QXR0cihlbG0sIG5hbWUpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gZWxtLmF0dHIobmFtZSk7XG4gICAgICAgIHJldHVybiB2YWx1ZSB8fCAnJztcbiAgICAgIH1cbiAgICAgIGRhdGEuZm9udGZhY2UgPSBnZXREZWZhdWx0Rm9udEZhbWlseShlZGl0b3IpO1xuICAgICAgZGF0YS5mb250c2l6ZSA9IGdldERlZmF1bHRGb250U2l6ZShlZGl0b3IpO1xuICAgICAgZWxtID0gaGVhZGVyRnJhZ21lbnQuZmlyc3RDaGlsZDtcbiAgICAgIGlmIChlbG0udHlwZSA9PT0gNykge1xuICAgICAgICBkYXRhLnhtbF9waSA9IHRydWU7XG4gICAgICAgIG1hdGNoZXMgPSAvZW5jb2Rpbmc9XCIoW15cIl0rKVwiLy5leGVjKGVsbS52YWx1ZSk7XG4gICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgZGF0YS5kb2NlbmNvZGluZyA9IG1hdGNoZXNbMV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsbSA9IGhlYWRlckZyYWdtZW50LmdldEFsbCgnI2RvY3R5cGUnKVswXTtcbiAgICAgIGlmIChlbG0pIHtcbiAgICAgICAgZGF0YS5kb2N0eXBlID0gJzwhRE9DVFlQRScgKyBlbG0udmFsdWUgKyAnPic7XG4gICAgICB9XG4gICAgICBlbG0gPSBoZWFkZXJGcmFnbWVudC5nZXRBbGwoJ3RpdGxlJylbMF07XG4gICAgICBpZiAoZWxtICYmIGVsbS5maXJzdENoaWxkKSB7XG4gICAgICAgIGRhdGEudGl0bGUgPSBlbG0uZmlyc3RDaGlsZC52YWx1ZTtcbiAgICAgIH1cbiAgICAgIGdsb2JhbCQxLmVhY2goaGVhZGVyRnJhZ21lbnQuZ2V0QWxsKCdtZXRhJyksIGZ1bmN0aW9uIChtZXRhKSB7XG4gICAgICAgIHZhciBuYW1lID0gbWV0YS5hdHRyKCduYW1lJyk7XG4gICAgICAgIHZhciBodHRwRXF1aXYgPSBtZXRhLmF0dHIoJ2h0dHAtZXF1aXYnKTtcbiAgICAgICAgdmFyIG1hdGNoZXM7XG4gICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgZGF0YVtuYW1lLnRvTG93ZXJDYXNlKCldID0gbWV0YS5hdHRyKCdjb250ZW50Jyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaHR0cEVxdWl2ID09PSAnQ29udGVudC1UeXBlJykge1xuICAgICAgICAgIG1hdGNoZXMgPSAvY2hhcnNldFxccyo9XFxzKiguKilcXHMqL2dpLmV4ZWMobWV0YS5hdHRyKCdjb250ZW50JykpO1xuICAgICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgICBkYXRhLmRvY2VuY29kaW5nID0gbWF0Y2hlc1sxXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZWxtID0gaGVhZGVyRnJhZ21lbnQuZ2V0QWxsKCdodG1sJylbMF07XG4gICAgICBpZiAoZWxtKSB7XG4gICAgICAgIGRhdGEubGFuZ2NvZGUgPSBnZXRBdHRyKGVsbSwgJ2xhbmcnKSB8fCBnZXRBdHRyKGVsbSwgJ3htbDpsYW5nJyk7XG4gICAgICB9XG4gICAgICBkYXRhLnN0eWxlc2hlZXRzID0gW107XG4gICAgICBnbG9iYWwkMS5lYWNoKGhlYWRlckZyYWdtZW50LmdldEFsbCgnbGluaycpLCBmdW5jdGlvbiAobGluaykge1xuICAgICAgICBpZiAobGluay5hdHRyKCdyZWwnKSA9PT0gJ3N0eWxlc2hlZXQnKSB7XG4gICAgICAgICAgZGF0YS5zdHlsZXNoZWV0cy5wdXNoKGxpbmsuYXR0cignaHJlZicpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBlbG0gPSBoZWFkZXJGcmFnbWVudC5nZXRBbGwoJ2JvZHknKVswXTtcbiAgICAgIGlmIChlbG0pIHtcbiAgICAgICAgZGF0YS5sYW5nZGlyID0gZ2V0QXR0cihlbG0sICdkaXInKTtcbiAgICAgICAgZGF0YS5zdHlsZSA9IGdldEF0dHIoZWxtLCAnc3R5bGUnKTtcbiAgICAgICAgZGF0YS52aXNpdGVkX2NvbG9yID0gZ2V0QXR0cihlbG0sICd2bGluaycpO1xuICAgICAgICBkYXRhLmxpbmtfY29sb3IgPSBnZXRBdHRyKGVsbSwgJ2xpbmsnKTtcbiAgICAgICAgZGF0YS5hY3RpdmVfY29sb3IgPSBnZXRBdHRyKGVsbSwgJ2FsaW5rJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9O1xuICAgIHZhciBkYXRhVG9IdG1sID0gZnVuY3Rpb24gKGVkaXRvciwgZGF0YSwgaGVhZCkge1xuICAgICAgdmFyIGhlYWRFbGVtZW50LCBlbG0sIHZhbHVlO1xuICAgICAgdmFyIGRvbSA9IGVkaXRvci5kb207XG4gICAgICBmdW5jdGlvbiBzZXRBdHRyKGVsbSwgbmFtZSwgdmFsdWUpIHtcbiAgICAgICAgZWxtLmF0dHIobmFtZSwgdmFsdWUgPyB2YWx1ZSA6IHVuZGVmaW5lZCk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBhZGRIZWFkTm9kZShub2RlKSB7XG4gICAgICAgIGlmIChoZWFkRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgaGVhZEVsZW1lbnQuaW5zZXJ0KG5vZGUsIGhlYWRFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhlYWRFbGVtZW50LmFwcGVuZChub2RlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIGhlYWRlckZyYWdtZW50ID0gcGFyc2VIZWFkZXIoaGVhZCk7XG4gICAgICBoZWFkRWxlbWVudCA9IGhlYWRlckZyYWdtZW50LmdldEFsbCgnaGVhZCcpWzBdO1xuICAgICAgaWYgKCFoZWFkRWxlbWVudCkge1xuICAgICAgICBlbG0gPSBoZWFkZXJGcmFnbWVudC5nZXRBbGwoJ2h0bWwnKVswXTtcbiAgICAgICAgaGVhZEVsZW1lbnQgPSBuZXcgZ2xvYmFsJDMoJ2hlYWQnLCAxKTtcbiAgICAgICAgaWYgKGVsbS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgZWxtLmluc2VydChoZWFkRWxlbWVudCwgZWxtLmZpcnN0Q2hpbGQsIHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsbS5hcHBlbmQoaGVhZEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbG0gPSBoZWFkZXJGcmFnbWVudC5maXJzdENoaWxkO1xuICAgICAgaWYgKGRhdGEueG1sX3BpKSB7XG4gICAgICAgIHZhbHVlID0gJ3ZlcnNpb249XCIxLjBcIic7XG4gICAgICAgIGlmIChkYXRhLmRvY2VuY29kaW5nKSB7XG4gICAgICAgICAgdmFsdWUgKz0gJyBlbmNvZGluZz1cIicgKyBkYXRhLmRvY2VuY29kaW5nICsgJ1wiJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZWxtLnR5cGUgIT09IDcpIHtcbiAgICAgICAgICBlbG0gPSBuZXcgZ2xvYmFsJDMoJ3htbCcsIDcpO1xuICAgICAgICAgIGhlYWRlckZyYWdtZW50Lmluc2VydChlbG0sIGhlYWRlckZyYWdtZW50LmZpcnN0Q2hpbGQsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsbS52YWx1ZSA9IHZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChlbG0gJiYgZWxtLnR5cGUgPT09IDcpIHtcbiAgICAgICAgZWxtLnJlbW92ZSgpO1xuICAgICAgfVxuICAgICAgZWxtID0gaGVhZGVyRnJhZ21lbnQuZ2V0QWxsKCcjZG9jdHlwZScpWzBdO1xuICAgICAgaWYgKGRhdGEuZG9jdHlwZSkge1xuICAgICAgICBpZiAoIWVsbSkge1xuICAgICAgICAgIGVsbSA9IG5ldyBnbG9iYWwkMygnI2RvY3R5cGUnLCAxMCk7XG4gICAgICAgICAgaWYgKGRhdGEueG1sX3BpKSB7XG4gICAgICAgICAgICBoZWFkZXJGcmFnbWVudC5pbnNlcnQoZWxtLCBoZWFkZXJGcmFnbWVudC5maXJzdENoaWxkKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkSGVhZE5vZGUoZWxtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxtLnZhbHVlID0gZGF0YS5kb2N0eXBlLnN1YnN0cmluZyg5LCBkYXRhLmRvY3R5cGUubGVuZ3RoIC0gMSk7XG4gICAgICB9IGVsc2UgaWYgKGVsbSkge1xuICAgICAgICBlbG0ucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgICBlbG0gPSBudWxsO1xuICAgICAgZ2xvYmFsJDEuZWFjaChoZWFkZXJGcmFnbWVudC5nZXRBbGwoJ21ldGEnKSwgZnVuY3Rpb24gKG1ldGEpIHtcbiAgICAgICAgaWYgKG1ldGEuYXR0cignaHR0cC1lcXVpdicpID09PSAnQ29udGVudC1UeXBlJykge1xuICAgICAgICAgIGVsbSA9IG1ldGE7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKGRhdGEuZG9jZW5jb2RpbmcpIHtcbiAgICAgICAgaWYgKCFlbG0pIHtcbiAgICAgICAgICBlbG0gPSBuZXcgZ2xvYmFsJDMoJ21ldGEnLCAxKTtcbiAgICAgICAgICBlbG0uYXR0cignaHR0cC1lcXVpdicsICdDb250ZW50LVR5cGUnKTtcbiAgICAgICAgICBlbG0uc2hvcnRFbmRlZCA9IHRydWU7XG4gICAgICAgICAgYWRkSGVhZE5vZGUoZWxtKTtcbiAgICAgICAgfVxuICAgICAgICBlbG0uYXR0cignY29udGVudCcsICd0ZXh0L2h0bWw7IGNoYXJzZXQ9JyArIGRhdGEuZG9jZW5jb2RpbmcpO1xuICAgICAgfSBlbHNlIGlmIChlbG0pIHtcbiAgICAgICAgZWxtLnJlbW92ZSgpO1xuICAgICAgfVxuICAgICAgZWxtID0gaGVhZGVyRnJhZ21lbnQuZ2V0QWxsKCd0aXRsZScpWzBdO1xuICAgICAgaWYgKGRhdGEudGl0bGUpIHtcbiAgICAgICAgaWYgKCFlbG0pIHtcbiAgICAgICAgICBlbG0gPSBuZXcgZ2xvYmFsJDMoJ3RpdGxlJywgMSk7XG4gICAgICAgICAgYWRkSGVhZE5vZGUoZWxtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbG0uZW1wdHkoKTtcbiAgICAgICAgfVxuICAgICAgICBlbG0uYXBwZW5kKG5ldyBnbG9iYWwkMygnI3RleHQnLCAzKSkudmFsdWUgPSBkYXRhLnRpdGxlO1xuICAgICAgfSBlbHNlIGlmIChlbG0pIHtcbiAgICAgICAgZWxtLnJlbW92ZSgpO1xuICAgICAgfVxuICAgICAgZ2xvYmFsJDEuZWFjaCgna2V5d29yZHMsZGVzY3JpcHRpb24sYXV0aG9yLGNvcHlyaWdodCxyb2JvdHMnLnNwbGl0KCcsJyksIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHZhciBub2RlcyA9IGhlYWRlckZyYWdtZW50LmdldEFsbCgnbWV0YScpO1xuICAgICAgICB2YXIgaSwgbWV0YTtcbiAgICAgICAgdmFyIHZhbHVlID0gZGF0YVtuYW1lXTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgbWV0YSA9IG5vZGVzW2ldO1xuICAgICAgICAgIGlmIChtZXRhLmF0dHIoJ25hbWUnKSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgIG1ldGEuYXR0cignY29udGVudCcsIHZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG1ldGEucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIGVsbSA9IG5ldyBnbG9iYWwkMygnbWV0YScsIDEpO1xuICAgICAgICAgIGVsbS5hdHRyKCduYW1lJywgbmFtZSk7XG4gICAgICAgICAgZWxtLmF0dHIoJ2NvbnRlbnQnLCB2YWx1ZSk7XG4gICAgICAgICAgZWxtLnNob3J0RW5kZWQgPSB0cnVlO1xuICAgICAgICAgIGFkZEhlYWROb2RlKGVsbSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdmFyIGN1cnJlbnRTdHlsZVNoZWV0c01hcCA9IHt9O1xuICAgICAgZ2xvYmFsJDEuZWFjaChoZWFkZXJGcmFnbWVudC5nZXRBbGwoJ2xpbmsnKSwgZnVuY3Rpb24gKHN0eWxlc2hlZXQpIHtcbiAgICAgICAgaWYgKHN0eWxlc2hlZXQuYXR0cigncmVsJykgPT09ICdzdHlsZXNoZWV0Jykge1xuICAgICAgICAgIGN1cnJlbnRTdHlsZVNoZWV0c01hcFtzdHlsZXNoZWV0LmF0dHIoJ2hyZWYnKV0gPSBzdHlsZXNoZWV0O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGdsb2JhbCQxLmVhY2goZGF0YS5zdHlsZXNoZWV0cywgZnVuY3Rpb24gKHN0eWxlc2hlZXQpIHtcbiAgICAgICAgaWYgKCFjdXJyZW50U3R5bGVTaGVldHNNYXBbc3R5bGVzaGVldF0pIHtcbiAgICAgICAgICBlbG0gPSBuZXcgZ2xvYmFsJDMoJ2xpbmsnLCAxKTtcbiAgICAgICAgICBlbG0uYXR0cih7XG4gICAgICAgICAgICByZWw6ICdzdHlsZXNoZWV0JyxcbiAgICAgICAgICAgIHRleHQ6ICd0ZXh0L2NzcycsXG4gICAgICAgICAgICBocmVmOiBzdHlsZXNoZWV0XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZWxtLnNob3J0RW5kZWQgPSB0cnVlO1xuICAgICAgICAgIGFkZEhlYWROb2RlKGVsbSk7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIGN1cnJlbnRTdHlsZVNoZWV0c01hcFtzdHlsZXNoZWV0XTtcbiAgICAgIH0pO1xuICAgICAgZ2xvYmFsJDEuZWFjaChjdXJyZW50U3R5bGVTaGVldHNNYXAsIGZ1bmN0aW9uIChzdHlsZXNoZWV0KSB7XG4gICAgICAgIHN0eWxlc2hlZXQucmVtb3ZlKCk7XG4gICAgICB9KTtcbiAgICAgIGVsbSA9IGhlYWRlckZyYWdtZW50LmdldEFsbCgnYm9keScpWzBdO1xuICAgICAgaWYgKGVsbSkge1xuICAgICAgICBzZXRBdHRyKGVsbSwgJ2RpcicsIGRhdGEubGFuZ2Rpcik7XG4gICAgICAgIHNldEF0dHIoZWxtLCAnc3R5bGUnLCBkYXRhLnN0eWxlKTtcbiAgICAgICAgc2V0QXR0cihlbG0sICd2bGluaycsIGRhdGEudmlzaXRlZF9jb2xvcik7XG4gICAgICAgIHNldEF0dHIoZWxtLCAnbGluaycsIGRhdGEubGlua19jb2xvcik7XG4gICAgICAgIHNldEF0dHIoZWxtLCAnYWxpbmsnLCBkYXRhLmFjdGl2ZV9jb2xvcik7XG4gICAgICAgIGRvbS5zZXRBdHRyaWJzKGVkaXRvci5nZXRCb2R5KCksIHtcbiAgICAgICAgICBzdHlsZTogZGF0YS5zdHlsZSxcbiAgICAgICAgICBkaXI6IGRhdGEuZGlyLFxuICAgICAgICAgIHZMaW5rOiBkYXRhLnZpc2l0ZWRfY29sb3IsXG4gICAgICAgICAgbGluazogZGF0YS5saW5rX2NvbG9yLFxuICAgICAgICAgIGFMaW5rOiBkYXRhLmFjdGl2ZV9jb2xvclxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGVsbSA9IGhlYWRlckZyYWdtZW50LmdldEFsbCgnaHRtbCcpWzBdO1xuICAgICAgaWYgKGVsbSkge1xuICAgICAgICBzZXRBdHRyKGVsbSwgJ2xhbmcnLCBkYXRhLmxhbmdjb2RlKTtcbiAgICAgICAgc2V0QXR0cihlbG0sICd4bWw6bGFuZycsIGRhdGEubGFuZ2NvZGUpO1xuICAgICAgfVxuICAgICAgaWYgKCFoZWFkRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICAgIGhlYWRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgfVxuICAgICAgdmFyIGh0bWwgPSBnbG9iYWwkNCh7XG4gICAgICAgIHZhbGlkYXRlOiBmYWxzZSxcbiAgICAgICAgaW5kZW50OiB0cnVlLFxuICAgICAgICBpbmRlbnRfYmVmb3JlOiAnaGVhZCxodG1sLGJvZHksbWV0YSx0aXRsZSxzY3JpcHQsbGluayxzdHlsZScsXG4gICAgICAgIGluZGVudF9hZnRlcjogJ2hlYWQsaHRtbCxib2R5LG1ldGEsdGl0bGUsc2NyaXB0LGxpbmssc3R5bGUnXG4gICAgICB9KS5zZXJpYWxpemUoaGVhZGVyRnJhZ21lbnQpO1xuICAgICAgcmV0dXJuIGh0bWwuc3Vic3RyaW5nKDAsIGh0bWwuaW5kZXhPZignPC9ib2R5PicpKTtcbiAgICB9O1xuXG4gICAgdmFyIG9wZW4gPSBmdW5jdGlvbiAoZWRpdG9yLCBoZWFkU3RhdGUpIHtcbiAgICAgIHZhciBkYXRhID0gaHRtbFRvRGF0YShlZGl0b3IsIGhlYWRTdGF0ZS5nZXQoKSk7XG4gICAgICB2YXIgZGVmYXVsdERhdGEgPSB7XG4gICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAga2V5d29yZHM6ICcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICAgIHJvYm90czogJycsXG4gICAgICAgIGF1dGhvcjogJycsXG4gICAgICAgIGRvY2VuY29kaW5nOiAnJ1xuICAgICAgfTtcbiAgICAgIHZhciBpbml0aWFsRGF0YSA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBkZWZhdWx0RGF0YSksIGRhdGEpO1xuICAgICAgZWRpdG9yLndpbmRvd01hbmFnZXIub3Blbih7XG4gICAgICAgIHRpdGxlOiAnTWV0YWRhdGEgYW5kIERvY3VtZW50IFByb3BlcnRpZXMnLFxuICAgICAgICBzaXplOiAnbm9ybWFsJyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIHR5cGU6ICdwYW5lbCcsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogJ3RpdGxlJyxcbiAgICAgICAgICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgICAgICAgICAgbGFiZWw6ICdUaXRsZSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6ICdrZXl3b3JkcycsXG4gICAgICAgICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgICAgICAgIGxhYmVsOiAnS2V5d29yZHMnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgICAgICAgICBsYWJlbDogJ0Rlc2NyaXB0aW9uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogJ3JvYm90cycsXG4gICAgICAgICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgICAgICAgIGxhYmVsOiAnUm9ib3RzJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogJ2F1dGhvcicsXG4gICAgICAgICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgICAgICAgIGxhYmVsOiAnQXV0aG9yJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogJ2RvY2VuY29kaW5nJyxcbiAgICAgICAgICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgICAgICAgICAgbGFiZWw6ICdFbmNvZGluZydcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnY2FuY2VsJyxcbiAgICAgICAgICAgIG5hbWU6ICdjYW5jZWwnLFxuICAgICAgICAgICAgdGV4dDogJ0NhbmNlbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzdWJtaXQnLFxuICAgICAgICAgICAgbmFtZTogJ3NhdmUnLFxuICAgICAgICAgICAgdGV4dDogJ1NhdmUnLFxuICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgaW5pdGlhbERhdGE6IGluaXRpYWxEYXRhLFxuICAgICAgICBvblN1Ym1pdDogZnVuY3Rpb24gKGFwaSkge1xuICAgICAgICAgIHZhciBudURhdGEgPSBhcGkuZ2V0RGF0YSgpO1xuICAgICAgICAgIHZhciBoZWFkSHRtbCA9IGRhdGFUb0h0bWwoZWRpdG9yLCBnbG9iYWwkMS5leHRlbmQoZGF0YSwgbnVEYXRhKSwgaGVhZFN0YXRlLmdldCgpKTtcbiAgICAgICAgICBoZWFkU3RhdGUuc2V0KGhlYWRIdG1sKTtcbiAgICAgICAgICBhcGkuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciByZWdpc3RlciA9IGZ1bmN0aW9uIChlZGl0b3IsIGhlYWRTdGF0ZSkge1xuICAgICAgZWRpdG9yLmFkZENvbW1hbmQoJ21jZUZ1bGxQYWdlUHJvcGVydGllcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb3BlbihlZGl0b3IsIGhlYWRTdGF0ZSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHByb3RlY3RIdG1sID0gZnVuY3Rpb24gKHByb3RlY3QsIGh0bWwpIHtcbiAgICAgIGdsb2JhbCQxLmVhY2gocHJvdGVjdCwgZnVuY3Rpb24gKHBhdHRlcm4pIHtcbiAgICAgICAgaHRtbCA9IGh0bWwucmVwbGFjZShwYXR0ZXJuLCBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgICAgcmV0dXJuICc8IS0tbWNlOnByb3RlY3RlZCAnICsgZXNjYXBlKHN0cikgKyAnLS0+JztcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBodG1sO1xuICAgIH07XG4gICAgdmFyIHVucHJvdGVjdEh0bWwgPSBmdW5jdGlvbiAoaHRtbCkge1xuICAgICAgcmV0dXJuIGh0bWwucmVwbGFjZSgvPCEtLW1jZTpwcm90ZWN0ZWQgKFtcXHNcXFNdKj8pLS0+L2csIGZ1bmN0aW9uIChhLCBtKSB7XG4gICAgICAgIHJldHVybiB1bmVzY2FwZShtKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgZWFjaCA9IGdsb2JhbCQxLmVhY2g7XG4gICAgdmFyIGxvdyA9IGZ1bmN0aW9uIChzKSB7XG4gICAgICByZXR1cm4gcy5yZXBsYWNlKC88XFwvP1tBLVpdKy9nLCBmdW5jdGlvbiAoYSkge1xuICAgICAgICByZXR1cm4gYS50b0xvd2VyQ2FzZSgpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgaGFuZGxlU2V0Q29udGVudCA9IGZ1bmN0aW9uIChlZGl0b3IsIGhlYWRTdGF0ZSwgZm9vdFN0YXRlLCBldnQpIHtcbiAgICAgIHZhciBzdGFydFBvcywgZW5kUG9zLCBjb250ZW50LCBzdHlsZXMgPSAnJztcbiAgICAgIHZhciBkb20gPSBlZGl0b3IuZG9tO1xuICAgICAgaWYgKGV2dC5zZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29udGVudCA9IHByb3RlY3RIdG1sKGdldFByb3RlY3QoZWRpdG9yKSwgZXZ0LmNvbnRlbnQpO1xuICAgICAgaWYgKGV2dC5mb3JtYXQgPT09ICdyYXcnICYmIGhlYWRTdGF0ZS5nZXQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZXZ0LnNvdXJjZV92aWV3ICYmIHNob3VsZEhpZGVJblNvdXJjZVZpZXcoZWRpdG9yKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoY29udGVudC5sZW5ndGggPT09IDAgJiYgIWV2dC5zb3VyY2Vfdmlldykge1xuICAgICAgICBjb250ZW50ID0gZ2xvYmFsJDEudHJpbShoZWFkU3RhdGUuZ2V0KCkpICsgJ1xcbicgKyBnbG9iYWwkMS50cmltKGNvbnRlbnQpICsgJ1xcbicgKyBnbG9iYWwkMS50cmltKGZvb3RTdGF0ZS5nZXQoKSk7XG4gICAgICB9XG4gICAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC88KFxcLz8pQk9EWS9naSwgJzwkMWJvZHknKTtcbiAgICAgIHN0YXJ0UG9zID0gY29udGVudC5pbmRleE9mKCc8Ym9keScpO1xuICAgICAgaWYgKHN0YXJ0UG9zICE9PSAtMSkge1xuICAgICAgICBzdGFydFBvcyA9IGNvbnRlbnQuaW5kZXhPZignPicsIHN0YXJ0UG9zKTtcbiAgICAgICAgaGVhZFN0YXRlLnNldChsb3coY29udGVudC5zdWJzdHJpbmcoMCwgc3RhcnRQb3MgKyAxKSkpO1xuICAgICAgICBlbmRQb3MgPSBjb250ZW50LmluZGV4T2YoJzwvYm9keScsIHN0YXJ0UG9zKTtcbiAgICAgICAgaWYgKGVuZFBvcyA9PT0gLTEpIHtcbiAgICAgICAgICBlbmRQb3MgPSBjb250ZW50Lmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBldnQuY29udGVudCA9IGdsb2JhbCQxLnRyaW0oY29udGVudC5zdWJzdHJpbmcoc3RhcnRQb3MgKyAxLCBlbmRQb3MpKTtcbiAgICAgICAgZm9vdFN0YXRlLnNldChsb3coY29udGVudC5zdWJzdHJpbmcoZW5kUG9zKSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGVhZFN0YXRlLnNldChnZXREZWZhdWx0SGVhZGVyKGVkaXRvcikpO1xuICAgICAgICBmb290U3RhdGUuc2V0KCdcXG48L2JvZHk+XFxuPC9odG1sPicpO1xuICAgICAgfVxuICAgICAgdmFyIGhlYWRlckZyYWdtZW50ID0gcGFyc2VIZWFkZXIoaGVhZFN0YXRlLmdldCgpKTtcbiAgICAgIGVhY2goaGVhZGVyRnJhZ21lbnQuZ2V0QWxsKCdzdHlsZScpLCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBpZiAobm9kZS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgc3R5bGVzICs9IG5vZGUuZmlyc3RDaGlsZC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB2YXIgYm9keUVsbSA9IGhlYWRlckZyYWdtZW50LmdldEFsbCgnYm9keScpWzBdO1xuICAgICAgaWYgKGJvZHlFbG0pIHtcbiAgICAgICAgZG9tLnNldEF0dHJpYnMoZWRpdG9yLmdldEJvZHkoKSwge1xuICAgICAgICAgIHN0eWxlOiBib2R5RWxtLmF0dHIoJ3N0eWxlJykgfHwgJycsXG4gICAgICAgICAgZGlyOiBib2R5RWxtLmF0dHIoJ2RpcicpIHx8ICcnLFxuICAgICAgICAgIHZMaW5rOiBib2R5RWxtLmF0dHIoJ3ZsaW5rJykgfHwgJycsXG4gICAgICAgICAgbGluazogYm9keUVsbS5hdHRyKCdsaW5rJykgfHwgJycsXG4gICAgICAgICAgYUxpbms6IGJvZHlFbG0uYXR0cignYWxpbmsnKSB8fCAnJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGRvbS5yZW1vdmUoJ2Z1bGxwYWdlX3N0eWxlcycpO1xuICAgICAgdmFyIGhlYWRFbG0gPSBlZGl0b3IuZ2V0RG9jKCkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICAgIGlmIChzdHlsZXMpIHtcbiAgICAgICAgdmFyIHN0eWxlRWxtID0gZG9tLmFkZChoZWFkRWxtLCAnc3R5bGUnLCB7IGlkOiAnZnVsbHBhZ2Vfc3R5bGVzJyB9KTtcbiAgICAgICAgc3R5bGVFbG0uYXBwZW5kQ2hpbGQoZG9tR2xvYmFscy5kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHlsZXMpKTtcbiAgICAgIH1cbiAgICAgIHZhciBjdXJyZW50U3R5bGVTaGVldHNNYXAgPSB7fTtcbiAgICAgIGdsb2JhbCQxLmVhY2goaGVhZEVsbS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbGluaycpLCBmdW5jdGlvbiAoc3R5bGVzaGVldCkge1xuICAgICAgICBpZiAoc3R5bGVzaGVldC5yZWwgPT09ICdzdHlsZXNoZWV0JyAmJiBzdHlsZXNoZWV0LmdldEF0dHJpYnV0ZSgnZGF0YS1tY2UtZnVsbHBhZ2UnKSkge1xuICAgICAgICAgIGN1cnJlbnRTdHlsZVNoZWV0c01hcFtzdHlsZXNoZWV0LmhyZWZdID0gc3R5bGVzaGVldDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBnbG9iYWwkMS5lYWNoKGhlYWRlckZyYWdtZW50LmdldEFsbCgnbGluaycpLCBmdW5jdGlvbiAoc3R5bGVzaGVldCkge1xuICAgICAgICB2YXIgaHJlZiA9IHN0eWxlc2hlZXQuYXR0cignaHJlZicpO1xuICAgICAgICBpZiAoIWhyZWYpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWN1cnJlbnRTdHlsZVNoZWV0c01hcFtocmVmXSAmJiBzdHlsZXNoZWV0LmF0dHIoJ3JlbCcpID09PSAnc3R5bGVzaGVldCcpIHtcbiAgICAgICAgICBkb20uYWRkKGhlYWRFbG0sICdsaW5rJywge1xuICAgICAgICAgICAgJ3JlbCc6ICdzdHlsZXNoZWV0JyxcbiAgICAgICAgICAgICd0ZXh0JzogJ3RleHQvY3NzJyxcbiAgICAgICAgICAgIGhyZWY6IGhyZWYsXG4gICAgICAgICAgICAnZGF0YS1tY2UtZnVsbHBhZ2UnOiAnMSdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgY3VycmVudFN0eWxlU2hlZXRzTWFwW2hyZWZdO1xuICAgICAgfSk7XG4gICAgICBnbG9iYWwkMS5lYWNoKGN1cnJlbnRTdHlsZVNoZWV0c01hcCwgZnVuY3Rpb24gKHN0eWxlc2hlZXQpIHtcbiAgICAgICAgc3R5bGVzaGVldC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlc2hlZXQpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgZ2V0RGVmYXVsdEhlYWRlciA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBoZWFkZXIgPSAnJywgdmFsdWUsIHN0eWxlcyA9ICcnO1xuICAgICAgaWYgKGdldERlZmF1bHRYbWxQaShlZGl0b3IpKSB7XG4gICAgICAgIHZhciBwaUVuY29kaW5nID0gZ2V0RGVmYXVsdEVuY29kaW5nKGVkaXRvcik7XG4gICAgICAgIGhlYWRlciArPSAnPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwiJyArIChwaUVuY29kaW5nID8gcGlFbmNvZGluZyA6ICdJU08tODg1OS0xJykgKyAnXCIgPz5cXG4nO1xuICAgICAgfVxuICAgICAgaGVhZGVyICs9IGdldERlZmF1bHREb2NUeXBlKGVkaXRvcik7XG4gICAgICBoZWFkZXIgKz0gJ1xcbjxodG1sPlxcbjxoZWFkPlxcbic7XG4gICAgICBpZiAodmFsdWUgPSBnZXREZWZhdWx0VGl0bGUoZWRpdG9yKSkge1xuICAgICAgICBoZWFkZXIgKz0gJzx0aXRsZT4nICsgdmFsdWUgKyAnPC90aXRsZT5cXG4nO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlID0gZ2V0RGVmYXVsdEVuY29kaW5nKGVkaXRvcikpIHtcbiAgICAgICAgaGVhZGVyICs9ICc8bWV0YSBodHRwLWVxdWl2PVwiQ29udGVudC1UeXBlXCIgY29udGVudD1cInRleHQvaHRtbDsgY2hhcnNldD0nICsgdmFsdWUgKyAnXCIgLz5cXG4nO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlID0gZ2V0RGVmYXVsdEZvbnRGYW1pbHkoZWRpdG9yKSkge1xuICAgICAgICBzdHlsZXMgKz0gJ2ZvbnQtZmFtaWx5OiAnICsgdmFsdWUgKyAnOyc7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWUgPSBnZXREZWZhdWx0Rm9udFNpemUoZWRpdG9yKSkge1xuICAgICAgICBzdHlsZXMgKz0gJ2ZvbnQtc2l6ZTogJyArIHZhbHVlICsgJzsnO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlID0gZ2V0RGVmYXVsdFRleHRDb2xvcihlZGl0b3IpKSB7XG4gICAgICAgIHN0eWxlcyArPSAnY29sb3I6ICcgKyB2YWx1ZSArICc7JztcbiAgICAgIH1cbiAgICAgIGhlYWRlciArPSAnPC9oZWFkPlxcbjxib2R5JyArIChzdHlsZXMgPyAnIHN0eWxlPVwiJyArIHN0eWxlcyArICdcIicgOiAnJykgKyAnPlxcbic7XG4gICAgICByZXR1cm4gaGVhZGVyO1xuICAgIH07XG4gICAgdmFyIGhhbmRsZUdldENvbnRlbnQgPSBmdW5jdGlvbiAoZWRpdG9yLCBoZWFkLCBmb290LCBldnQpIHtcbiAgICAgIGlmICghZXZ0LnNlbGVjdGlvbiAmJiAoIWV2dC5zb3VyY2VfdmlldyB8fCAhc2hvdWxkSGlkZUluU291cmNlVmlldyhlZGl0b3IpKSkge1xuICAgICAgICBldnQuY29udGVudCA9IHVucHJvdGVjdEh0bWwoZ2xvYmFsJDEudHJpbShoZWFkKSArICdcXG4nICsgZ2xvYmFsJDEudHJpbShldnQuY29udGVudCkgKyAnXFxuJyArIGdsb2JhbCQxLnRyaW0oZm9vdCkpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHNldHVwID0gZnVuY3Rpb24gKGVkaXRvciwgaGVhZFN0YXRlLCBmb290U3RhdGUpIHtcbiAgICAgIGVkaXRvci5vbignQmVmb3JlU2V0Q29udGVudCcsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgaGFuZGxlU2V0Q29udGVudChlZGl0b3IsIGhlYWRTdGF0ZSwgZm9vdFN0YXRlLCBldnQpO1xuICAgICAgfSk7XG4gICAgICBlZGl0b3Iub24oJ0dldENvbnRlbnQnLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGhhbmRsZUdldENvbnRlbnQoZWRpdG9yLCBoZWFkU3RhdGUuZ2V0KCksIGZvb3RTdGF0ZS5nZXQoKSwgZXZ0KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgcmVnaXN0ZXIkMSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRCdXR0b24oJ2Z1bGxwYWdlJywge1xuICAgICAgICB0b29sdGlwOiAnTWV0YWRhdGEgYW5kIGRvY3VtZW50IHByb3BlcnRpZXMnLFxuICAgICAgICBpY29uOiAnZG9jdW1lbnQtcHJvcGVydGllcycsXG4gICAgICAgIG9uQWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZWRpdG9yLmV4ZWNDb21tYW5kKCdtY2VGdWxsUGFnZVByb3BlcnRpZXMnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkTWVudUl0ZW0oJ2Z1bGxwYWdlJywge1xuICAgICAgICB0ZXh0OiAnTWV0YWRhdGEgYW5kIGRvY3VtZW50IHByb3BlcnRpZXMnLFxuICAgICAgICBpY29uOiAnZG9jdW1lbnQtcHJvcGVydGllcycsXG4gICAgICAgIG9uQWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZWRpdG9yLmV4ZWNDb21tYW5kKCdtY2VGdWxsUGFnZVByb3BlcnRpZXMnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFBsdWdpbiAoKSB7XG4gICAgICBnbG9iYWwuYWRkKCdmdWxscGFnZScsIGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgICAgdmFyIGhlYWRTdGF0ZSA9IENlbGwoJycpLCBmb290U3RhdGUgPSBDZWxsKCcnKTtcbiAgICAgICAgcmVnaXN0ZXIoZWRpdG9yLCBoZWFkU3RhdGUpO1xuICAgICAgICByZWdpc3RlciQxKGVkaXRvcik7XG4gICAgICAgIHNldHVwKGVkaXRvciwgaGVhZFN0YXRlLCBmb290U3RhdGUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgUGx1Z2luKCk7XG5cbn0od2luZG93KSk7XG4iXSwic291cmNlUm9vdCI6IiJ9