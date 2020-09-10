(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~tinymce-plugin-paste~tinymce-plugin-paste-plugin"],{

/***/ "./node_modules/tinymce/plugins/paste/plugin.js":
/*!******************************************************!*\
  !*** ./node_modules/tinymce/plugins/paste/plugin.js ***!
  \******************************************************/
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

    var hasProPlugin = function (editor) {
      if (/(^|[ ,])powerpaste([, ]|$)/.test(editor.getParam('plugins')) && global.get('powerpaste')) {
        if (typeof domGlobals.window.console !== 'undefined' && domGlobals.window.console.log) {
          domGlobals.window.console.log('PowerPaste is incompatible with Paste plugin! Remove \'paste\' from the \'plugins\' option.');
        }
        return true;
      } else {
        return false;
      }
    };

    var get = function (clipboard, quirks) {
      return {
        clipboard: clipboard,
        quirks: quirks
      };
    };

    var firePastePreProcess = function (editor, html, internal, isWordHtml) {
      return editor.fire('PastePreProcess', {
        content: html,
        internal: internal,
        wordContent: isWordHtml
      });
    };
    var firePastePostProcess = function (editor, node, internal, isWordHtml) {
      return editor.fire('PastePostProcess', {
        node: node,
        internal: internal,
        wordContent: isWordHtml
      });
    };
    var firePastePlainTextToggle = function (editor, state) {
      return editor.fire('PastePlainTextToggle', { state: state });
    };
    var firePaste = function (editor, ieFake) {
      return editor.fire('paste', { ieFake: ieFake });
    };

    var togglePlainTextPaste = function (editor, clipboard) {
      if (clipboard.pasteFormat.get() === 'text') {
        clipboard.pasteFormat.set('html');
        firePastePlainTextToggle(editor, false);
      } else {
        clipboard.pasteFormat.set('text');
        firePastePlainTextToggle(editor, true);
      }
      editor.focus();
    };

    var register = function (editor, clipboard) {
      editor.addCommand('mceTogglePlainTextPaste', function () {
        togglePlainTextPaste(editor, clipboard);
      });
      editor.addCommand('mceInsertClipboardContent', function (ui, value) {
        if (value.content) {
          clipboard.pasteHtml(value.content, value.internal);
        }
        if (value.text) {
          clipboard.pasteText(value.text);
        }
      });
    };

    var noop = function () {
    };
    var constant = function (value) {
      return function () {
        return value;
      };
    };
    var never = constant(false);
    var always = constant(true);

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

    var isSimpleType = function (type) {
      return function (value) {
        return typeof value === type;
      };
    };
    var isFunction = isSimpleType('function');

    var nativeSlice = Array.prototype.slice;
    var map = function (xs, f) {
      var len = xs.length;
      var r = new Array(len);
      for (var i = 0; i < len; i++) {
        var x = xs[i];
        r[i] = f(x, i);
      }
      return r;
    };
    var each = function (xs, f) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        f(x, i);
      }
    };
    var filter = function (xs, pred) {
      var r = [];
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          r.push(x);
        }
      }
      return r;
    };
    var foldl = function (xs, f, acc) {
      each(xs, function (x) {
        acc = f(acc, x);
      });
      return acc;
    };
    var from$1 = isFunction(Array.from) ? Array.from : function (x) {
      return nativeSlice.call(x);
    };

    var value = function () {
      var subject = Cell(Option.none());
      var clear = function () {
        subject.set(Option.none());
      };
      var set = function (s) {
        subject.set(Option.some(s));
      };
      var on = function (f) {
        subject.get().each(f);
      };
      var isSet = function () {
        return subject.get().isSome();
      };
      return {
        clear: clear,
        set: set,
        isSet: isSet,
        on: on
      };
    };

    var global$1 = tinymce.util.Tools.resolve('tinymce.Env');

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.Delay');

    var global$3 = tinymce.util.Tools.resolve('tinymce.util.Promise');

    var global$4 = tinymce.util.Tools.resolve('tinymce.util.VK');

    var shouldBlockDrop = function (editor) {
      return editor.getParam('paste_block_drop', false);
    };
    var shouldPasteDataImages = function (editor) {
      return editor.getParam('paste_data_images', false);
    };
    var shouldFilterDrop = function (editor) {
      return editor.getParam('paste_filter_drop', true);
    };
    var getPreProcess = function (editor) {
      return editor.getParam('paste_preprocess');
    };
    var getPostProcess = function (editor) {
      return editor.getParam('paste_postprocess');
    };
    var getWebkitStyles = function (editor) {
      return editor.getParam('paste_webkit_styles');
    };
    var shouldRemoveWebKitStyles = function (editor) {
      return editor.getParam('paste_remove_styles_if_webkit', true);
    };
    var shouldMergeFormats = function (editor) {
      return editor.getParam('paste_merge_formats', true);
    };
    var isSmartPasteEnabled = function (editor) {
      return editor.getParam('smart_paste', true);
    };
    var isPasteAsTextEnabled = function (editor) {
      return editor.getParam('paste_as_text', false);
    };
    var getRetainStyleProps = function (editor) {
      return editor.getParam('paste_retain_style_properties');
    };
    var getWordValidElements = function (editor) {
      var defaultValidElements = '-strong/b,-em/i,-u,-span,-p,-ol,-ul,-li,-h1,-h2,-h3,-h4,-h5,-h6,' + '-p/div,-a[href|name],sub,sup,strike,br,del,table[width],tr,' + 'td[colspan|rowspan|width],th[colspan|rowspan|width],thead,tfoot,tbody';
      return editor.getParam('paste_word_valid_elements', defaultValidElements);
    };
    var shouldConvertWordFakeLists = function (editor) {
      return editor.getParam('paste_convert_word_fake_lists', true);
    };
    var shouldUseDefaultFilters = function (editor) {
      return editor.getParam('paste_enable_default_filters', true);
    };
    var getValidate = function (editor) {
      return editor.getParam('validate');
    };
    var getAllowHtmlDataUrls = function (editor) {
      return editor.getParam('allow_html_data_urls', false, 'boolean');
    };
    var getPasteDataImages = function (editor) {
      return editor.getParam('paste_data_images', false, 'boolean');
    };
    var getImagesDataImgFilter = function (editor) {
      return editor.getParam('images_dataimg_filter');
    };
    var getImagesReuseFilename = function (editor) {
      return editor.getParam('images_reuse_filename');
    };
    var getForcedRootBlock = function (editor) {
      return editor.getParam('forced_root_block');
    };
    var getForcedRootBlockAttrs = function (editor) {
      return editor.getParam('forced_root_block_attrs');
    };
    var getTabSpaces = function (editor) {
      return editor.getParam('paste_tab_spaces', 4, 'number');
    };

    var internalMimeType = 'x-tinymce/html';
    var internalMark = '<!-- ' + internalMimeType + ' -->';
    var mark = function (html) {
      return internalMark + html;
    };
    var unmark = function (html) {
      return html.replace(internalMark, '');
    };
    var isMarked = function (html) {
      return html.indexOf(internalMark) !== -1;
    };
    var internalHtmlMime = function () {
      return internalMimeType;
    };

    var global$5 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var global$6 = tinymce.util.Tools.resolve('tinymce.html.Entities');

    var isPlainText = function (text) {
      return !/<(?:\/?(?!(?:div|p|br|span)>)\w+|(?:(?!(?:span style="white-space:\s?pre;?">)|br\s?\/>))\w+\s[^>]+)>/i.test(text);
    };
    var toBRs = function (text) {
      return text.replace(/\r?\n/g, '<br>');
    };
    var openContainer = function (rootTag, rootAttrs) {
      var key;
      var attrs = [];
      var tag = '<' + rootTag;
      if (typeof rootAttrs === 'object') {
        for (key in rootAttrs) {
          if (rootAttrs.hasOwnProperty(key)) {
            attrs.push(key + '="' + global$6.encodeAllRaw(rootAttrs[key]) + '"');
          }
        }
        if (attrs.length) {
          tag += ' ' + attrs.join(' ');
        }
      }
      return tag + '>';
    };
    var toBlockElements = function (text, rootTag, rootAttrs) {
      var blocks = text.split(/\n\n/);
      var tagOpen = openContainer(rootTag, rootAttrs);
      var tagClose = '</' + rootTag + '>';
      var paragraphs = global$5.map(blocks, function (p) {
        return p.split(/\n/).join('<br />');
      });
      var stitch = function (p) {
        return tagOpen + p + tagClose;
      };
      return paragraphs.length === 1 ? paragraphs[0] : global$5.map(paragraphs, stitch).join('');
    };
    var convert = function (text, rootTag, rootAttrs) {
      return rootTag ? toBlockElements(text, rootTag === true ? 'p' : rootTag, rootAttrs) : toBRs(text);
    };

    var global$7 = tinymce.util.Tools.resolve('tinymce.html.DomParser');

    var global$8 = tinymce.util.Tools.resolve('tinymce.html.Serializer');

    var nbsp = '\xA0';

    var global$9 = tinymce.util.Tools.resolve('tinymce.html.Node');

    var global$a = tinymce.util.Tools.resolve('tinymce.html.Schema');

    function filter$1(content, items) {
      global$5.each(items, function (v) {
        if (v.constructor === RegExp) {
          content = content.replace(v, '');
        } else {
          content = content.replace(v[0], v[1]);
        }
      });
      return content;
    }
    function innerText(html) {
      var schema = global$a();
      var domParser = global$7({}, schema);
      var text = '';
      var shortEndedElements = schema.getShortEndedElements();
      var ignoreElements = global$5.makeMap('script noscript style textarea video audio iframe object', ' ');
      var blockElements = schema.getBlockElements();
      function walk(node) {
        var name = node.name, currentNode = node;
        if (name === 'br') {
          text += '\n';
          return;
        }
        if (name === 'wbr') {
          return;
        }
        if (shortEndedElements[name]) {
          text += ' ';
        }
        if (ignoreElements[name]) {
          text += ' ';
          return;
        }
        if (node.type === 3) {
          text += node.value;
        }
        if (!node.shortEnded) {
          if (node = node.firstChild) {
            do {
              walk(node);
            } while (node = node.next);
          }
        }
        if (blockElements[name] && currentNode.next) {
          text += '\n';
          if (name === 'p') {
            text += '\n';
          }
        }
      }
      html = filter$1(html, [/<!\[[^\]]+\]>/g]);
      walk(domParser.parse(html));
      return text;
    }
    function trimHtml(html) {
      function trimSpaces(all, s1, s2) {
        if (!s1 && !s2) {
          return ' ';
        }
        return nbsp;
      }
      html = filter$1(html, [
        /^[\s\S]*<body[^>]*>\s*|\s*<\/body[^>]*>[\s\S]*$/ig,
        /<!--StartFragment-->|<!--EndFragment-->/g,
        [
          /( ?)<span class="Apple-converted-space">\u00a0<\/span>( ?)/g,
          trimSpaces
        ],
        /<br class="Apple-interchange-newline">/g,
        /<br>$/i
      ]);
      return html;
    }
    function createIdGenerator(prefix) {
      var count = 0;
      return function () {
        return prefix + count++;
      };
    }

    function isWordContent(content) {
      return /<font face="Times New Roman"|class="?Mso|style="[^"]*\bmso-|style='[^'']*\bmso-|w:WordDocument/i.test(content) || /class="OutlineElement/.test(content) || /id="?docs\-internal\-guid\-/.test(content);
    }
    function isNumericList(text) {
      var found;
      var patterns = [
        /^[IVXLMCD]{1,2}\.[ \u00a0]/,
        /^[ivxlmcd]{1,2}\.[ \u00a0]/,
        /^[a-z]{1,2}[\.\)][ \u00a0]/,
        /^[A-Z]{1,2}[\.\)][ \u00a0]/,
        /^[0-9]+\.[ \u00a0]/,
        /^[\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d]+\.[ \u00a0]/,
        /^[\u58f1\u5f10\u53c2\u56db\u4f0d\u516d\u4e03\u516b\u4e5d\u62fe]+\.[ \u00a0]/
      ];
      text = text.replace(/^[\u00a0 ]+/, '');
      global$5.each(patterns, function (pattern) {
        if (pattern.test(text)) {
          found = true;
          return false;
        }
      });
      return found;
    }
    function isBulletList(text) {
      return /^[\s\u00a0]*[\u2022\u00b7\u00a7\u25CF]\s*/.test(text);
    }
    function convertFakeListsToProperLists(node) {
      var currentListNode, prevListNode, lastLevel = 1;
      function getText(node) {
        var txt = '';
        if (node.type === 3) {
          return node.value;
        }
        if (node = node.firstChild) {
          do {
            txt += getText(node);
          } while (node = node.next);
        }
        return txt;
      }
      function trimListStart(node, regExp) {
        if (node.type === 3) {
          if (regExp.test(node.value)) {
            node.value = node.value.replace(regExp, '');
            return false;
          }
        }
        if (node = node.firstChild) {
          do {
            if (!trimListStart(node, regExp)) {
              return false;
            }
          } while (node = node.next);
        }
        return true;
      }
      function removeIgnoredNodes(node) {
        if (node._listIgnore) {
          node.remove();
          return;
        }
        if (node = node.firstChild) {
          do {
            removeIgnoredNodes(node);
          } while (node = node.next);
        }
      }
      function convertParagraphToLi(paragraphNode, listName, start) {
        var level = paragraphNode._listLevel || lastLevel;
        if (level !== lastLevel) {
          if (level < lastLevel) {
            if (currentListNode) {
              currentListNode = currentListNode.parent.parent;
            }
          } else {
            prevListNode = currentListNode;
            currentListNode = null;
          }
        }
        if (!currentListNode || currentListNode.name !== listName) {
          prevListNode = prevListNode || currentListNode;
          currentListNode = new global$9(listName, 1);
          if (start > 1) {
            currentListNode.attr('start', '' + start);
          }
          paragraphNode.wrap(currentListNode);
        } else {
          currentListNode.append(paragraphNode);
        }
        paragraphNode.name = 'li';
        if (level > lastLevel && prevListNode) {
          prevListNode.lastChild.append(currentListNode);
        }
        lastLevel = level;
        removeIgnoredNodes(paragraphNode);
        trimListStart(paragraphNode, /^\u00a0+/);
        trimListStart(paragraphNode, /^\s*([\u2022\u00b7\u00a7\u25CF]|\w+\.)/);
        trimListStart(paragraphNode, /^\u00a0+/);
      }
      var elements = [];
      var child = node.firstChild;
      while (typeof child !== 'undefined' && child !== null) {
        elements.push(child);
        child = child.walk();
        if (child !== null) {
          while (typeof child !== 'undefined' && child.parent !== node) {
            child = child.walk();
          }
        }
      }
      for (var i = 0; i < elements.length; i++) {
        node = elements[i];
        if (node.name === 'p' && node.firstChild) {
          var nodeText = getText(node);
          if (isBulletList(nodeText)) {
            convertParagraphToLi(node, 'ul');
            continue;
          }
          if (isNumericList(nodeText)) {
            var matches = /([0-9]+)\./.exec(nodeText);
            var start = 1;
            if (matches) {
              start = parseInt(matches[1], 10);
            }
            convertParagraphToLi(node, 'ol', start);
            continue;
          }
          if (node._listLevel) {
            convertParagraphToLi(node, 'ul', 1);
            continue;
          }
          currentListNode = null;
        } else {
          prevListNode = currentListNode;
          currentListNode = null;
        }
      }
    }
    function filterStyles(editor, validStyles, node, styleValue) {
      var outputStyles = {}, matches;
      var styles = editor.dom.parseStyle(styleValue);
      global$5.each(styles, function (value, name) {
        switch (name) {
        case 'mso-list':
          matches = /\w+ \w+([0-9]+)/i.exec(styleValue);
          if (matches) {
            node._listLevel = parseInt(matches[1], 10);
          }
          if (/Ignore/i.test(value) && node.firstChild) {
            node._listIgnore = true;
            node.firstChild._listIgnore = true;
          }
          break;
        case 'horiz-align':
          name = 'text-align';
          break;
        case 'vert-align':
          name = 'vertical-align';
          break;
        case 'font-color':
        case 'mso-foreground':
          name = 'color';
          break;
        case 'mso-background':
        case 'mso-highlight':
          name = 'background';
          break;
        case 'font-weight':
        case 'font-style':
          if (value !== 'normal') {
            outputStyles[name] = value;
          }
          return;
        case 'mso-element':
          if (/^(comment|comment-list)$/i.test(value)) {
            node.remove();
            return;
          }
          break;
        }
        if (name.indexOf('mso-comment') === 0) {
          node.remove();
          return;
        }
        if (name.indexOf('mso-') === 0) {
          return;
        }
        if (getRetainStyleProps(editor) === 'all' || validStyles && validStyles[name]) {
          outputStyles[name] = value;
        }
      });
      if (/(bold)/i.test(outputStyles['font-weight'])) {
        delete outputStyles['font-weight'];
        node.wrap(new global$9('b', 1));
      }
      if (/(italic)/i.test(outputStyles['font-style'])) {
        delete outputStyles['font-style'];
        node.wrap(new global$9('i', 1));
      }
      outputStyles = editor.dom.serializeStyle(outputStyles, node.name);
      if (outputStyles) {
        return outputStyles;
      }
      return null;
    }
    var filterWordContent = function (editor, content) {
      var validStyles;
      var retainStyleProperties = getRetainStyleProps(editor);
      if (retainStyleProperties) {
        validStyles = global$5.makeMap(retainStyleProperties.split(/[, ]/));
      }
      content = filter$1(content, [
        /<br class="?Apple-interchange-newline"?>/gi,
        /<b[^>]+id="?docs-internal-[^>]*>/gi,
        /<!--[\s\S]+?-->/gi,
        /<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|img|meta|link|style|\w:\w+)(?=[\s\/>]))[^>]*>/gi,
        [
          /<(\/?)s>/gi,
          '<$1strike>'
        ],
        [
          /&nbsp;/gi,
          nbsp
        ],
        [
          /<span\s+style\s*=\s*"\s*mso-spacerun\s*:\s*yes\s*;?\s*"\s*>([\s\u00a0]*)<\/span>/gi,
          function (str, spaces) {
            return spaces.length > 0 ? spaces.replace(/./, ' ').slice(Math.floor(spaces.length / 2)).split('').join(nbsp) : '';
          }
        ]
      ]);
      var validElements = getWordValidElements(editor);
      var schema = global$a({
        valid_elements: validElements,
        valid_children: '-li[p]'
      });
      global$5.each(schema.elements, function (rule) {
        if (!rule.attributes.class) {
          rule.attributes.class = {};
          rule.attributesOrder.push('class');
        }
        if (!rule.attributes.style) {
          rule.attributes.style = {};
          rule.attributesOrder.push('style');
        }
      });
      var domParser = global$7({}, schema);
      domParser.addAttributeFilter('style', function (nodes) {
        var i = nodes.length, node;
        while (i--) {
          node = nodes[i];
          node.attr('style', filterStyles(editor, validStyles, node, node.attr('style')));
          if (node.name === 'span' && node.parent && !node.attributes.length) {
            node.unwrap();
          }
        }
      });
      domParser.addAttributeFilter('class', function (nodes) {
        var i = nodes.length, node, className;
        while (i--) {
          node = nodes[i];
          className = node.attr('class');
          if (/^(MsoCommentReference|MsoCommentText|msoDel)$/i.test(className)) {
            node.remove();
          }
          node.attr('class', null);
        }
      });
      domParser.addNodeFilter('del', function (nodes) {
        var i = nodes.length;
        while (i--) {
          nodes[i].remove();
        }
      });
      domParser.addNodeFilter('a', function (nodes) {
        var i = nodes.length, node, href, name;
        while (i--) {
          node = nodes[i];
          href = node.attr('href');
          name = node.attr('name');
          if (href && href.indexOf('#_msocom_') !== -1) {
            node.remove();
            continue;
          }
          if (href && href.indexOf('file://') === 0) {
            href = href.split('#')[1];
            if (href) {
              href = '#' + href;
            }
          }
          if (!href && !name) {
            node.unwrap();
          } else {
            if (name && !/^_?(?:toc|edn|ftn)/i.test(name)) {
              node.unwrap();
              continue;
            }
            node.attr({
              href: href,
              name: name
            });
          }
        }
      });
      var rootNode = domParser.parse(content);
      if (shouldConvertWordFakeLists(editor)) {
        convertFakeListsToProperLists(rootNode);
      }
      content = global$8({ validate: getValidate(editor) }, schema).serialize(rootNode);
      return content;
    };
    var preProcess = function (editor, content) {
      return shouldUseDefaultFilters(editor) ? filterWordContent(editor, content) : content;
    };

    var preProcess$1 = function (editor, html) {
      var parser = global$7({}, editor.schema);
      parser.addNodeFilter('meta', function (nodes) {
        global$5.each(nodes, function (node) {
          return node.remove();
        });
      });
      var fragment = parser.parse(html, {
        forced_root_block: false,
        isRootContent: true
      });
      return global$8({ validate: getValidate(editor) }, editor.schema).serialize(fragment);
    };
    var processResult = function (content, cancelled) {
      return {
        content: content,
        cancelled: cancelled
      };
    };
    var postProcessFilter = function (editor, html, internal, isWordHtml) {
      var tempBody = editor.dom.create('div', { style: 'display:none' }, html);
      var postProcessArgs = firePastePostProcess(editor, tempBody, internal, isWordHtml);
      return processResult(postProcessArgs.node.innerHTML, postProcessArgs.isDefaultPrevented());
    };
    var filterContent = function (editor, content, internal, isWordHtml) {
      var preProcessArgs = firePastePreProcess(editor, content, internal, isWordHtml);
      var filteredContent = preProcess$1(editor, preProcessArgs.content);
      if (editor.hasEventListeners('PastePostProcess') && !preProcessArgs.isDefaultPrevented()) {
        return postProcessFilter(editor, filteredContent, internal, isWordHtml);
      } else {
        return processResult(filteredContent, preProcessArgs.isDefaultPrevented());
      }
    };
    var process = function (editor, html, internal) {
      var isWordHtml = isWordContent(html);
      var content = isWordHtml ? preProcess(editor, html) : html;
      return filterContent(editor, content, internal, isWordHtml);
    };

    var pasteHtml = function (editor, html) {
      editor.insertContent(html, {
        merge: shouldMergeFormats(editor),
        paste: true
      });
      return true;
    };
    var isAbsoluteUrl = function (url) {
      return /^https?:\/\/[\w\?\-\/+=.&%@~#]+$/i.test(url);
    };
    var isImageUrl = function (url) {
      return isAbsoluteUrl(url) && /.(gif|jpe?g|png)$/.test(url);
    };
    var createImage = function (editor, url, pasteHtmlFn) {
      editor.undoManager.extra(function () {
        pasteHtmlFn(editor, url);
      }, function () {
        editor.insertContent('<img src="' + url + '">');
      });
      return true;
    };
    var createLink = function (editor, url, pasteHtmlFn) {
      editor.undoManager.extra(function () {
        pasteHtmlFn(editor, url);
      }, function () {
        editor.execCommand('mceInsertLink', false, url);
      });
      return true;
    };
    var linkSelection = function (editor, html, pasteHtmlFn) {
      return editor.selection.isCollapsed() === false && isAbsoluteUrl(html) ? createLink(editor, html, pasteHtmlFn) : false;
    };
    var insertImage = function (editor, html, pasteHtmlFn) {
      return isImageUrl(html) ? createImage(editor, html, pasteHtmlFn) : false;
    };
    var smartInsertContent = function (editor, html) {
      global$5.each([
        linkSelection,
        insertImage,
        pasteHtml
      ], function (action) {
        return action(editor, html, pasteHtml) !== true;
      });
    };
    var insertContent = function (editor, html, pasteAsText) {
      if (pasteAsText || isSmartPasteEnabled(editor) === false) {
        pasteHtml(editor, html);
      } else {
        smartInsertContent(editor, html);
      }
    };

    var repeat = function (s, count) {
      return count <= 0 ? '' : new Array(count + 1).join(s);
    };

    var isCollapsibleWhitespace = function (c) {
      return ' \f\t\x0B'.indexOf(c) !== -1;
    };
    var isNewLineChar = function (c) {
      return c === '\n' || c === '\r';
    };
    var isNewline = function (text, idx) {
      return idx < text.length && idx >= 0 ? isNewLineChar(text[idx]) : false;
    };
    var normalizeWhitespace = function (editor, text) {
      var tabSpace = repeat(' ', getTabSpaces(editor));
      var normalizedText = text.replace(/\t/g, tabSpace);
      var result = foldl(normalizedText, function (acc, c) {
        if (isCollapsibleWhitespace(c) || c === nbsp) {
          if (acc.pcIsSpace || acc.str === '' || acc.str.length === normalizedText.length - 1 || isNewline(normalizedText, acc.str.length + 1)) {
            return {
              pcIsSpace: false,
              str: acc.str + nbsp
            };
          } else {
            return {
              pcIsSpace: true,
              str: acc.str + ' '
            };
          }
        } else {
          return {
            pcIsSpace: isNewLineChar(c),
            str: acc.str + c
          };
        }
      }, {
        pcIsSpace: false,
        str: ''
      });
      return result.str;
    };

    var doPaste = function (editor, content, internal, pasteAsText) {
      var args = process(editor, content, internal);
      if (args.cancelled === false) {
        insertContent(editor, args.content, pasteAsText);
      }
    };
    var pasteHtml$1 = function (editor, html, internalFlag) {
      var internal = internalFlag ? internalFlag : isMarked(html);
      doPaste(editor, unmark(html), internal, false);
    };
    var pasteText = function (editor, text) {
      var encodedText = editor.dom.encode(text).replace(/\r\n/g, '\n');
      var normalizedText = normalizeWhitespace(editor, encodedText);
      var html = convert(normalizedText, getForcedRootBlock(editor), getForcedRootBlockAttrs(editor));
      doPaste(editor, html, false, true);
    };
    var getDataTransferItems = function (dataTransfer) {
      var items = {};
      var mceInternalUrlPrefix = 'data:text/mce-internal,';
      if (dataTransfer) {
        if (dataTransfer.getData) {
          var legacyText = dataTransfer.getData('Text');
          if (legacyText && legacyText.length > 0) {
            if (legacyText.indexOf(mceInternalUrlPrefix) === -1) {
              items['text/plain'] = legacyText;
            }
          }
        }
        if (dataTransfer.types) {
          for (var i = 0; i < dataTransfer.types.length; i++) {
            var contentType = dataTransfer.types[i];
            try {
              items[contentType] = dataTransfer.getData(contentType);
            } catch (ex) {
              items[contentType] = '';
            }
          }
        }
      }
      return items;
    };
    var getClipboardContent = function (editor, clipboardEvent) {
      return getDataTransferItems(clipboardEvent.clipboardData || editor.getDoc().dataTransfer);
    };
    var hasContentType = function (clipboardContent, mimeType) {
      return mimeType in clipboardContent && clipboardContent[mimeType].length > 0;
    };
    var hasHtmlOrText = function (content) {
      return hasContentType(content, 'text/html') || hasContentType(content, 'text/plain');
    };
    var parseDataUri = function (uri) {
      var matches = /data:([^;]+);base64,([a-z0-9\+\/=]+)/i.exec(uri);
      if (matches) {
        return {
          type: matches[1],
          data: decodeURIComponent(matches[2])
        };
      } else {
        return {
          type: null,
          data: null
        };
      }
    };
    var isValidDataUriImage = function (editor, imgElm) {
      var filter = getImagesDataImgFilter(editor);
      return filter ? filter(imgElm) : true;
    };
    var extractFilename = function (editor, str) {
      var m = str.match(/([\s\S]+?)\.(?:jpeg|jpg|png|gif)$/i);
      return m ? editor.dom.encode(m[1]) : null;
    };
    var uniqueId = createIdGenerator('mceclip');
    var pasteImage = function (editor, imageItem) {
      var _a = parseDataUri(imageItem.uri), base64 = _a.data, type = _a.type;
      var id = uniqueId();
      var name = getImagesReuseFilename(editor) && imageItem.blob.name ? extractFilename(editor, imageItem.blob.name) : id;
      var img = new domGlobals.Image();
      img.src = imageItem.uri;
      if (isValidDataUriImage(editor, img)) {
        var blobCache = editor.editorUpload.blobCache;
        var blobInfo = void 0;
        var existingBlobInfo = blobCache.getByData(base64, type);
        if (!existingBlobInfo) {
          blobInfo = blobCache.create(id, imageItem.blob, base64, name);
          blobCache.add(blobInfo);
        } else {
          blobInfo = existingBlobInfo;
        }
        pasteHtml$1(editor, '<img src="' + blobInfo.blobUri() + '">', false);
      } else {
        pasteHtml$1(editor, '<img src="' + imageItem.uri + '">', false);
      }
    };
    var isClipboardEvent = function (event) {
      return event.type === 'paste';
    };
    var readBlobsAsDataUris = function (items) {
      return global$3.all(map(items, function (item) {
        return new global$3(function (resolve) {
          var blob = item.getAsFile ? item.getAsFile() : item;
          var reader = new window.FileReader();
          reader.onload = function () {
            resolve({
              blob: blob,
              uri: reader.result
            });
          };
          reader.readAsDataURL(blob);
        });
      }));
    };
    var getImagesFromDataTransfer = function (dataTransfer) {
      var items = dataTransfer.items ? map(from$1(dataTransfer.items), function (item) {
        return item.getAsFile();
      }) : [];
      var files = dataTransfer.files ? from$1(dataTransfer.files) : [];
      var images = filter(items.length > 0 ? items : files, function (file) {
        return /^image\/(jpeg|png|gif|bmp)$/.test(file.type);
      });
      return images;
    };
    var pasteImageData = function (editor, e, rng) {
      var dataTransfer = isClipboardEvent(e) ? e.clipboardData : e.dataTransfer;
      if (getPasteDataImages(editor) && dataTransfer) {
        var images = getImagesFromDataTransfer(dataTransfer);
        if (images.length > 0) {
          e.preventDefault();
          readBlobsAsDataUris(images).then(function (blobResults) {
            if (rng) {
              editor.selection.setRng(rng);
            }
            each(blobResults, function (result) {
              pasteImage(editor, result);
            });
          });
          return true;
        }
      }
      return false;
    };
    var isBrokenAndroidClipboardEvent = function (e) {
      var clipboardData = e.clipboardData;
      return domGlobals.navigator.userAgent.indexOf('Android') !== -1 && clipboardData && clipboardData.items && clipboardData.items.length === 0;
    };
    var isKeyboardPasteEvent = function (e) {
      return global$4.metaKeyPressed(e) && e.keyCode === 86 || e.shiftKey && e.keyCode === 45;
    };
    var registerEventHandlers = function (editor, pasteBin, pasteFormat) {
      var keyboardPasteEvent = value();
      var keyboardPastePlainTextState;
      editor.on('keydown', function (e) {
        function removePasteBinOnKeyUp(e) {
          if (isKeyboardPasteEvent(e) && !e.isDefaultPrevented()) {
            pasteBin.remove();
          }
        }
        if (isKeyboardPasteEvent(e) && !e.isDefaultPrevented()) {
          keyboardPastePlainTextState = e.shiftKey && e.keyCode === 86;
          if (keyboardPastePlainTextState && global$1.webkit && domGlobals.navigator.userAgent.indexOf('Version/') !== -1) {
            return;
          }
          e.stopImmediatePropagation();
          keyboardPasteEvent.set(e);
          window.setTimeout(function () {
            keyboardPasteEvent.clear();
          }, 100);
          if (global$1.ie && keyboardPastePlainTextState) {
            e.preventDefault();
            firePaste(editor, true);
            return;
          }
          pasteBin.remove();
          pasteBin.create();
          editor.once('keyup', removePasteBinOnKeyUp);
          editor.once('paste', function () {
            editor.off('keyup', removePasteBinOnKeyUp);
          });
        }
      });
      function insertClipboardContent(clipboardContent, isKeyBoardPaste, plainTextMode, internal) {
        var content;
        if (hasContentType(clipboardContent, 'text/html')) {
          content = clipboardContent['text/html'];
        } else {
          content = pasteBin.getHtml();
          internal = internal ? internal : isMarked(content);
          if (pasteBin.isDefaultContent(content)) {
            plainTextMode = true;
          }
        }
        content = trimHtml(content);
        pasteBin.remove();
        var isPlainTextHtml = internal === false && isPlainText(content);
        var isImage = isImageUrl(content);
        if (!content.length || isPlainTextHtml && !isImage) {
          plainTextMode = true;
        }
        if (plainTextMode || isImage) {
          if (hasContentType(clipboardContent, 'text/plain') && isPlainTextHtml) {
            content = clipboardContent['text/plain'];
          } else {
            content = innerText(content);
          }
        }
        if (pasteBin.isDefaultContent(content)) {
          if (!isKeyBoardPaste) {
            editor.windowManager.alert('Please use Ctrl+V/Cmd+V keyboard shortcuts to paste contents.');
          }
          return;
        }
        if (plainTextMode) {
          pasteText(editor, content);
        } else {
          pasteHtml$1(editor, content, internal);
        }
      }
      var getLastRng = function () {
        return pasteBin.getLastRng() || editor.selection.getRng();
      };
      editor.on('paste', function (e) {
        var isKeyBoardPaste = keyboardPasteEvent.isSet();
        var clipboardContent = getClipboardContent(editor, e);
        var plainTextMode = pasteFormat.get() === 'text' || keyboardPastePlainTextState;
        var internal = hasContentType(clipboardContent, internalHtmlMime());
        keyboardPastePlainTextState = false;
        if (e.isDefaultPrevented() || isBrokenAndroidClipboardEvent(e)) {
          pasteBin.remove();
          return;
        }
        if (!hasHtmlOrText(clipboardContent) && pasteImageData(editor, e, getLastRng())) {
          pasteBin.remove();
          return;
        }
        if (!isKeyBoardPaste) {
          e.preventDefault();
        }
        if (global$1.ie && (!isKeyBoardPaste || e.ieFake) && !hasContentType(clipboardContent, 'text/html')) {
          pasteBin.create();
          editor.dom.bind(pasteBin.getEl(), 'paste', function (e) {
            e.stopPropagation();
          });
          editor.getDoc().execCommand('Paste', false, null);
          clipboardContent['text/html'] = pasteBin.getHtml();
        }
        if (hasContentType(clipboardContent, 'text/html')) {
          e.preventDefault();
          if (!internal) {
            internal = isMarked(clipboardContent['text/html']);
          }
          insertClipboardContent(clipboardContent, isKeyBoardPaste, plainTextMode, internal);
        } else {
          global$2.setEditorTimeout(editor, function () {
            insertClipboardContent(clipboardContent, isKeyBoardPaste, plainTextMode, internal);
          }, 0);
        }
      });
    };
    var registerEventsAndFilters = function (editor, pasteBin, pasteFormat) {
      registerEventHandlers(editor, pasteBin, pasteFormat);
      var src;
      editor.parser.addNodeFilter('img', function (nodes, name, args) {
        var isPasteInsert = function (args) {
          return args.data && args.data.paste === true;
        };
        var remove = function (node) {
          if (!node.attr('data-mce-object') && src !== global$1.transparentSrc) {
            node.remove();
          }
        };
        var isWebKitFakeUrl = function (src) {
          return src.indexOf('webkit-fake-url') === 0;
        };
        var isDataUri = function (src) {
          return src.indexOf('data:') === 0;
        };
        if (!getPasteDataImages(editor) && isPasteInsert(args)) {
          var i = nodes.length;
          while (i--) {
            src = nodes[i].attr('src');
            if (!src) {
              continue;
            }
            if (isWebKitFakeUrl(src)) {
              remove(nodes[i]);
            } else if (!getAllowHtmlDataUrls(editor) && isDataUri(src)) {
              remove(nodes[i]);
            }
          }
        }
      });
    };

    var getPasteBinParent = function (editor) {
      return global$1.ie && editor.inline ? domGlobals.document.body : editor.getBody();
    };
    var isExternalPasteBin = function (editor) {
      return getPasteBinParent(editor) !== editor.getBody();
    };
    var delegatePasteEvents = function (editor, pasteBinElm, pasteBinDefaultContent) {
      if (isExternalPasteBin(editor)) {
        editor.dom.bind(pasteBinElm, 'paste keyup', function (_e) {
          if (!isDefault(editor, pasteBinDefaultContent)) {
            editor.fire('paste');
          }
        });
      }
    };
    var create = function (editor, lastRngCell, pasteBinDefaultContent) {
      var dom = editor.dom, body = editor.getBody();
      lastRngCell.set(editor.selection.getRng());
      var pasteBinElm = editor.dom.add(getPasteBinParent(editor), 'div', {
        'id': 'mcepastebin',
        'class': 'mce-pastebin',
        'contentEditable': true,
        'data-mce-bogus': 'all',
        'style': 'position: fixed; top: 50%; width: 10px; height: 10px; overflow: hidden; opacity: 0'
      }, pasteBinDefaultContent);
      if (global$1.ie || global$1.gecko) {
        dom.setStyle(pasteBinElm, 'left', dom.getStyle(body, 'direction', true) === 'rtl' ? 65535 : -65535);
      }
      dom.bind(pasteBinElm, 'beforedeactivate focusin focusout', function (e) {
        e.stopPropagation();
      });
      delegatePasteEvents(editor, pasteBinElm, pasteBinDefaultContent);
      pasteBinElm.focus();
      editor.selection.select(pasteBinElm, true);
    };
    var remove = function (editor, lastRngCell) {
      if (getEl(editor)) {
        var pasteBinClone = void 0;
        var lastRng = lastRngCell.get();
        while (pasteBinClone = editor.dom.get('mcepastebin')) {
          editor.dom.remove(pasteBinClone);
          editor.dom.unbind(pasteBinClone);
        }
        if (lastRng) {
          editor.selection.setRng(lastRng);
        }
      }
      lastRngCell.set(null);
    };
    var getEl = function (editor) {
      return editor.dom.get('mcepastebin');
    };
    var getHtml = function (editor) {
      var copyAndRemove = function (toElm, fromElm) {
        toElm.appendChild(fromElm);
        editor.dom.remove(fromElm, true);
      };
      var pasteBinClones = global$5.grep(getPasteBinParent(editor).childNodes, function (elm) {
        return elm.id === 'mcepastebin';
      });
      var pasteBinElm = pasteBinClones.shift();
      global$5.each(pasteBinClones, function (pasteBinClone) {
        copyAndRemove(pasteBinElm, pasteBinClone);
      });
      var dirtyWrappers = editor.dom.select('div[id=mcepastebin]', pasteBinElm);
      for (var i = dirtyWrappers.length - 1; i >= 0; i--) {
        var cleanWrapper = editor.dom.create('div');
        pasteBinElm.insertBefore(cleanWrapper, dirtyWrappers[i]);
        copyAndRemove(cleanWrapper, dirtyWrappers[i]);
      }
      return pasteBinElm ? pasteBinElm.innerHTML : '';
    };
    var getLastRng = function (lastRng) {
      return lastRng.get();
    };
    var isDefaultContent = function (pasteBinDefaultContent, content) {
      return content === pasteBinDefaultContent;
    };
    var isPasteBin = function (elm) {
      return elm && elm.id === 'mcepastebin';
    };
    var isDefault = function (editor, pasteBinDefaultContent) {
      var pasteBinElm = getEl(editor);
      return isPasteBin(pasteBinElm) && isDefaultContent(pasteBinDefaultContent, pasteBinElm.innerHTML);
    };
    var PasteBin = function (editor) {
      var lastRng = Cell(null);
      var pasteBinDefaultContent = '%MCEPASTEBIN%';
      return {
        create: function () {
          return create(editor, lastRng, pasteBinDefaultContent);
        },
        remove: function () {
          return remove(editor, lastRng);
        },
        getEl: function () {
          return getEl(editor);
        },
        getHtml: function () {
          return getHtml(editor);
        },
        getLastRng: function () {
          return getLastRng(lastRng);
        },
        isDefault: function () {
          return isDefault(editor, pasteBinDefaultContent);
        },
        isDefaultContent: function (content) {
          return isDefaultContent(pasteBinDefaultContent, content);
        }
      };
    };

    var Clipboard = function (editor, pasteFormat) {
      var pasteBin = PasteBin(editor);
      editor.on('PreInit', function () {
        return registerEventsAndFilters(editor, pasteBin, pasteFormat);
      });
      return {
        pasteFormat: pasteFormat,
        pasteHtml: function (html, internalFlag) {
          return pasteHtml$1(editor, html, internalFlag);
        },
        pasteText: function (text) {
          return pasteText(editor, text);
        },
        pasteImageData: function (e, rng) {
          return pasteImageData(editor, e, rng);
        },
        getDataTransferItems: getDataTransferItems,
        hasHtmlOrText: hasHtmlOrText,
        hasContentType: hasContentType
      };
    };

    var hasWorkingClipboardApi = function (clipboardData) {
      return global$1.iOS === false && typeof (clipboardData === null || clipboardData === void 0 ? void 0 : clipboardData.setData) === 'function';
    };
    var setHtml5Clipboard = function (clipboardData, html, text) {
      if (hasWorkingClipboardApi(clipboardData)) {
        try {
          clipboardData.clearData();
          clipboardData.setData('text/html', html);
          clipboardData.setData('text/plain', text);
          clipboardData.setData(internalHtmlMime(), html);
          return true;
        } catch (e) {
          return false;
        }
      } else {
        return false;
      }
    };
    var setClipboardData = function (evt, data, fallback, done) {
      if (setHtml5Clipboard(evt.clipboardData, data.html, data.text)) {
        evt.preventDefault();
        done();
      } else {
        fallback(data.html, done);
      }
    };
    var fallback = function (editor) {
      return function (html, done) {
        var markedHtml = mark(html);
        var outer = editor.dom.create('div', {
          'contenteditable': 'false',
          'data-mce-bogus': 'all'
        });
        var inner = editor.dom.create('div', { contenteditable: 'true' }, markedHtml);
        editor.dom.setStyles(outer, {
          position: 'fixed',
          top: '0',
          left: '-3000px',
          width: '1000px',
          overflow: 'hidden'
        });
        outer.appendChild(inner);
        editor.dom.add(editor.getBody(), outer);
        var range = editor.selection.getRng();
        inner.focus();
        var offscreenRange = editor.dom.createRng();
        offscreenRange.selectNodeContents(inner);
        editor.selection.setRng(offscreenRange);
        global$2.setTimeout(function () {
          editor.selection.setRng(range);
          outer.parentNode.removeChild(outer);
          done();
        }, 0);
      };
    };
    var getData = function (editor) {
      return {
        html: editor.selection.getContent({ contextual: true }),
        text: editor.selection.getContent({ format: 'text' })
      };
    };
    var isTableSelection = function (editor) {
      return !!editor.dom.getParent(editor.selection.getStart(), 'td[data-mce-selected],th[data-mce-selected]', editor.getBody());
    };
    var hasSelectedContent = function (editor) {
      return !editor.selection.isCollapsed() || isTableSelection(editor);
    };
    var cut = function (editor) {
      return function (evt) {
        if (hasSelectedContent(editor)) {
          setClipboardData(evt, getData(editor), fallback(editor), function () {
            if (global$1.browser.isChrome()) {
              var rng_1 = editor.selection.getRng();
              global$2.setEditorTimeout(editor, function () {
                editor.selection.setRng(rng_1);
                editor.execCommand('Delete');
              }, 0);
            } else {
              editor.execCommand('Delete');
            }
          });
        }
      };
    };
    var copy = function (editor) {
      return function (evt) {
        if (hasSelectedContent(editor)) {
          setClipboardData(evt, getData(editor), fallback(editor), function () {
          });
        }
      };
    };
    var register$1 = function (editor) {
      editor.on('cut', cut(editor));
      editor.on('copy', copy(editor));
    };

    var global$b = tinymce.util.Tools.resolve('tinymce.dom.RangeUtils');

    var getCaretRangeFromEvent = function (editor, e) {
      return global$b.getCaretRangeFromPoint(e.clientX, e.clientY, editor.getDoc());
    };
    var isPlainTextFileUrl = function (content) {
      var plainTextContent = content['text/plain'];
      return plainTextContent ? plainTextContent.indexOf('file://') === 0 : false;
    };
    var setFocusedRange = function (editor, rng) {
      editor.focus();
      editor.selection.setRng(rng);
    };
    var setup = function (editor, clipboard, draggingInternallyState) {
      if (shouldBlockDrop(editor)) {
        editor.on('dragend dragover draggesture dragdrop drop drag', function (e) {
          e.preventDefault();
          e.stopPropagation();
        });
      }
      if (!shouldPasteDataImages(editor)) {
        editor.on('drop', function (e) {
          var dataTransfer = e.dataTransfer;
          if (dataTransfer && dataTransfer.files && dataTransfer.files.length > 0) {
            e.preventDefault();
          }
        });
      }
      editor.on('drop', function (e) {
        var rng = getCaretRangeFromEvent(editor, e);
        if (e.isDefaultPrevented() || draggingInternallyState.get()) {
          return;
        }
        var dropContent = clipboard.getDataTransferItems(e.dataTransfer);
        var internal = clipboard.hasContentType(dropContent, internalHtmlMime());
        if ((!clipboard.hasHtmlOrText(dropContent) || isPlainTextFileUrl(dropContent)) && clipboard.pasteImageData(e, rng)) {
          return;
        }
        if (rng && shouldFilterDrop(editor)) {
          var content_1 = dropContent['mce-internal'] || dropContent['text/html'] || dropContent['text/plain'];
          if (content_1) {
            e.preventDefault();
            global$2.setEditorTimeout(editor, function () {
              editor.undoManager.transact(function () {
                if (dropContent['mce-internal']) {
                  editor.execCommand('Delete');
                }
                setFocusedRange(editor, rng);
                content_1 = trimHtml(content_1);
                if (!dropContent['text/html']) {
                  clipboard.pasteText(content_1);
                } else {
                  clipboard.pasteHtml(content_1, internal);
                }
              });
            });
          }
        }
      });
      editor.on('dragstart', function (_e) {
        draggingInternallyState.set(true);
      });
      editor.on('dragover dragend', function (e) {
        if (shouldPasteDataImages(editor) && draggingInternallyState.get() === false) {
          e.preventDefault();
          setFocusedRange(editor, getCaretRangeFromEvent(editor, e));
        }
        if (e.type === 'dragend') {
          draggingInternallyState.set(false);
        }
      });
    };

    var setup$1 = function (editor) {
      var plugin = editor.plugins.paste;
      var preProcess = getPreProcess(editor);
      if (preProcess) {
        editor.on('PastePreProcess', function (e) {
          preProcess.call(plugin, plugin, e);
        });
      }
      var postProcess = getPostProcess(editor);
      if (postProcess) {
        editor.on('PastePostProcess', function (e) {
          postProcess.call(plugin, plugin, e);
        });
      }
    };

    function addPreProcessFilter(editor, filterFunc) {
      editor.on('PastePreProcess', function (e) {
        e.content = filterFunc(editor, e.content, e.internal, e.wordContent);
      });
    }
    function addPostProcessFilter(editor, filterFunc) {
      editor.on('PastePostProcess', function (e) {
        filterFunc(editor, e.node);
      });
    }
    function removeExplorerBrElementsAfterBlocks(editor, html) {
      if (!isWordContent(html)) {
        return html;
      }
      var blockElements = [];
      global$5.each(editor.schema.getBlockElements(), function (block, blockName) {
        blockElements.push(blockName);
      });
      var explorerBlocksRegExp = new RegExp('(?:<br>&nbsp;[\\s\\r\\n]+|<br>)*(<\\/?(' + blockElements.join('|') + ')[^>]*>)(?:<br>&nbsp;[\\s\\r\\n]+|<br>)*', 'g');
      html = filter$1(html, [[
          explorerBlocksRegExp,
          '$1'
        ]]);
      html = filter$1(html, [
        [
          /<br><br>/g,
          '<BR><BR>'
        ],
        [
          /<br>/g,
          ' '
        ],
        [
          /<BR><BR>/g,
          '<br>'
        ]
      ]);
      return html;
    }
    function removeWebKitStyles(editor, content, internal, isWordHtml) {
      if (isWordHtml || internal) {
        return content;
      }
      var webKitStylesSetting = getWebkitStyles(editor);
      var webKitStyles;
      if (shouldRemoveWebKitStyles(editor) === false || webKitStylesSetting === 'all') {
        return content;
      }
      if (webKitStylesSetting) {
        webKitStyles = webKitStylesSetting.split(/[, ]/);
      }
      if (webKitStyles) {
        var dom_1 = editor.dom, node_1 = editor.selection.getNode();
        content = content.replace(/(<[^>]+) style="([^"]*)"([^>]*>)/gi, function (all, before, value, after) {
          var inputStyles = dom_1.parseStyle(dom_1.decode(value));
          var outputStyles = {};
          if (webKitStyles === 'none') {
            return before + after;
          }
          for (var i = 0; i < webKitStyles.length; i++) {
            var inputValue = inputStyles[webKitStyles[i]], currentValue = dom_1.getStyle(node_1, webKitStyles[i], true);
            if (/color/.test(webKitStyles[i])) {
              inputValue = dom_1.toHex(inputValue);
              currentValue = dom_1.toHex(currentValue);
            }
            if (currentValue !== inputValue) {
              outputStyles[webKitStyles[i]] = inputValue;
            }
          }
          outputStyles = dom_1.serializeStyle(outputStyles, 'span');
          if (outputStyles) {
            return before + ' style="' + outputStyles + '"' + after;
          }
          return before + after;
        });
      } else {
        content = content.replace(/(<[^>]+) style="([^"]*)"([^>]*>)/gi, '$1$3');
      }
      content = content.replace(/(<[^>]+) data-mce-style="([^"]+)"([^>]*>)/gi, function (all, before, value, after) {
        return before + ' style="' + value + '"' + after;
      });
      return content;
    }
    function removeUnderlineAndFontInAnchor(editor, root) {
      editor.$('a', root).find('font,u').each(function (i, node) {
        editor.dom.remove(node, true);
      });
    }
    var setup$2 = function (editor) {
      if (global$1.webkit) {
        addPreProcessFilter(editor, removeWebKitStyles);
      }
      if (global$1.ie) {
        addPreProcessFilter(editor, removeExplorerBrElementsAfterBlocks);
        addPostProcessFilter(editor, removeUnderlineAndFontInAnchor);
      }
    };

    var makeSetupHandler = function (editor, clipboard) {
      return function (api) {
        api.setActive(clipboard.pasteFormat.get() === 'text');
        var pastePlainTextToggleHandler = function (e) {
          return api.setActive(e.state);
        };
        editor.on('PastePlainTextToggle', pastePlainTextToggleHandler);
        return function () {
          return editor.off('PastePlainTextToggle', pastePlainTextToggleHandler);
        };
      };
    };
    var register$2 = function (editor, clipboard) {
      editor.ui.registry.addToggleButton('pastetext', {
        active: false,
        icon: 'paste-text',
        tooltip: 'Paste as text',
        onAction: function () {
          return editor.execCommand('mceTogglePlainTextPaste');
        },
        onSetup: makeSetupHandler(editor, clipboard)
      });
      editor.ui.registry.addToggleMenuItem('pastetext', {
        text: 'Paste as text',
        icon: 'paste-text',
        onAction: function () {
          return editor.execCommand('mceTogglePlainTextPaste');
        },
        onSetup: makeSetupHandler(editor, clipboard)
      });
    };

    function Plugin () {
      global.add('paste', function (editor) {
        if (hasProPlugin(editor) === false) {
          var draggingInternallyState = Cell(false);
          var pasteFormat = Cell(isPasteAsTextEnabled(editor) ? 'text' : 'html');
          var clipboard = Clipboard(editor, pasteFormat);
          var quirks = setup$2(editor);
          register$2(editor, clipboard);
          register(editor, clipboard);
          setup$1(editor);
          register$1(editor);
          setup(editor, clipboard, draggingInternallyState);
          return get(clipboard, quirks);
        }
      });
    }

    Plugin();

}(window));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL3Bhc3RlL3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0Esa0RBQWtELGVBQWU7QUFDakU7QUFDQTtBQUNBLG1DQUFtQyxpQkFBaUI7QUFDcEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxTQUFTO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxTQUFTO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSx3RkFBd0Y7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLElBQUk7QUFDeEIsb0JBQW9CLElBQUk7QUFDeEIsZ0JBQWdCLElBQUk7QUFDcEIsZ0JBQWdCLElBQUk7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIscUJBQXFCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsNkRBQTZEO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGdDQUFnQztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLHVCQUF1QixnQ0FBZ0M7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyx3QkFBd0I7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsK0JBQStCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLElBQUk7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLFVBQVUsYUFBYSxjQUFjLGtCQUFrQjtBQUN6RixPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSw0Q0FBNEMsUUFBUTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDhDQUE4QywwQkFBMEI7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsbUJBQW1CO0FBQzlELDJDQUEyQyxpQkFBaUI7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixhQUFhO0FBQ2I7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGVBQWU7QUFDZixhQUFhO0FBQ2I7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCwwREFBMEQsOEVBQThFO0FBQ3hJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLHlCQUF5QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTs7QUFFQSxDQUFDIiwiZmlsZSI6InZlbmRvcnN+dGlueW1jZS1wbHVnaW4tcGFzdGV+dGlueW1jZS1wbHVnaW4tcGFzdGUtcGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIFRpbnkgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTEdQTCBvciBhIGNvbW1lcmNpYWwgbGljZW5zZS5cbiAqIEZvciBMR1BMIHNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogRm9yIGNvbW1lcmNpYWwgbGljZW5zZXMgc2VlIGh0dHBzOi8vd3d3LnRpbnkuY2xvdWQvXG4gKlxuICogVmVyc2lvbjogNS40LjIgKDIwMjAtMDgtMTcpXG4gKi9cbihmdW5jdGlvbiAoZG9tR2xvYmFscykge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBDZWxsID0gZnVuY3Rpb24gKGluaXRpYWwpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGluaXRpYWw7XG4gICAgICB2YXIgZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9O1xuICAgICAgdmFyIHNldCA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHZhbHVlID0gdjtcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBnZXQ6IGdldCxcbiAgICAgICAgc2V0OiBzZXRcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciBnbG9iYWwgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5QbHVnaW5NYW5hZ2VyJyk7XG5cbiAgICB2YXIgaGFzUHJvUGx1Z2luID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgaWYgKC8oXnxbICxdKXBvd2VycGFzdGUoWywgXXwkKS8udGVzdChlZGl0b3IuZ2V0UGFyYW0oJ3BsdWdpbnMnKSkgJiYgZ2xvYmFsLmdldCgncG93ZXJwYXN0ZScpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZG9tR2xvYmFscy53aW5kb3cuY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9tR2xvYmFscy53aW5kb3cuY29uc29sZS5sb2cpIHtcbiAgICAgICAgICBkb21HbG9iYWxzLndpbmRvdy5jb25zb2xlLmxvZygnUG93ZXJQYXN0ZSBpcyBpbmNvbXBhdGlibGUgd2l0aCBQYXN0ZSBwbHVnaW4hIFJlbW92ZSBcXCdwYXN0ZVxcJyBmcm9tIHRoZSBcXCdwbHVnaW5zXFwnIG9wdGlvbi4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGdldCA9IGZ1bmN0aW9uIChjbGlwYm9hcmQsIHF1aXJrcykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2xpcGJvYXJkOiBjbGlwYm9hcmQsXG4gICAgICAgIHF1aXJrczogcXVpcmtzXG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgZmlyZVBhc3RlUHJlUHJvY2VzcyA9IGZ1bmN0aW9uIChlZGl0b3IsIGh0bWwsIGludGVybmFsLCBpc1dvcmRIdG1sKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmZpcmUoJ1Bhc3RlUHJlUHJvY2VzcycsIHtcbiAgICAgICAgY29udGVudDogaHRtbCxcbiAgICAgICAgaW50ZXJuYWw6IGludGVybmFsLFxuICAgICAgICB3b3JkQ29udGVudDogaXNXb3JkSHRtbFxuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgZmlyZVBhc3RlUG9zdFByb2Nlc3MgPSBmdW5jdGlvbiAoZWRpdG9yLCBub2RlLCBpbnRlcm5hbCwgaXNXb3JkSHRtbCkge1xuICAgICAgcmV0dXJuIGVkaXRvci5maXJlKCdQYXN0ZVBvc3RQcm9jZXNzJywge1xuICAgICAgICBub2RlOiBub2RlLFxuICAgICAgICBpbnRlcm5hbDogaW50ZXJuYWwsXG4gICAgICAgIHdvcmRDb250ZW50OiBpc1dvcmRIdG1sXG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBmaXJlUGFzdGVQbGFpblRleHRUb2dnbGUgPSBmdW5jdGlvbiAoZWRpdG9yLCBzdGF0ZSkge1xuICAgICAgcmV0dXJuIGVkaXRvci5maXJlKCdQYXN0ZVBsYWluVGV4dFRvZ2dsZScsIHsgc3RhdGU6IHN0YXRlIH0pO1xuICAgIH07XG4gICAgdmFyIGZpcmVQYXN0ZSA9IGZ1bmN0aW9uIChlZGl0b3IsIGllRmFrZSkge1xuICAgICAgcmV0dXJuIGVkaXRvci5maXJlKCdwYXN0ZScsIHsgaWVGYWtlOiBpZUZha2UgfSk7XG4gICAgfTtcblxuICAgIHZhciB0b2dnbGVQbGFpblRleHRQYXN0ZSA9IGZ1bmN0aW9uIChlZGl0b3IsIGNsaXBib2FyZCkge1xuICAgICAgaWYgKGNsaXBib2FyZC5wYXN0ZUZvcm1hdC5nZXQoKSA9PT0gJ3RleHQnKSB7XG4gICAgICAgIGNsaXBib2FyZC5wYXN0ZUZvcm1hdC5zZXQoJ2h0bWwnKTtcbiAgICAgICAgZmlyZVBhc3RlUGxhaW5UZXh0VG9nZ2xlKGVkaXRvciwgZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xpcGJvYXJkLnBhc3RlRm9ybWF0LnNldCgndGV4dCcpO1xuICAgICAgICBmaXJlUGFzdGVQbGFpblRleHRUb2dnbGUoZWRpdG9yLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGVkaXRvci5mb2N1cygpO1xuICAgIH07XG5cbiAgICB2YXIgcmVnaXN0ZXIgPSBmdW5jdGlvbiAoZWRpdG9yLCBjbGlwYm9hcmQpIHtcbiAgICAgIGVkaXRvci5hZGRDb21tYW5kKCdtY2VUb2dnbGVQbGFpblRleHRQYXN0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdG9nZ2xlUGxhaW5UZXh0UGFzdGUoZWRpdG9yLCBjbGlwYm9hcmQpO1xuICAgICAgfSk7XG4gICAgICBlZGl0b3IuYWRkQ29tbWFuZCgnbWNlSW5zZXJ0Q2xpcGJvYXJkQ29udGVudCcsIGZ1bmN0aW9uICh1aSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlLmNvbnRlbnQpIHtcbiAgICAgICAgICBjbGlwYm9hcmQucGFzdGVIdG1sKHZhbHVlLmNvbnRlbnQsIHZhbHVlLmludGVybmFsKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWUudGV4dCkge1xuICAgICAgICAgIGNsaXBib2FyZC5wYXN0ZVRleHQodmFsdWUudGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHtcbiAgICB9O1xuICAgIHZhciBjb25zdGFudCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBuZXZlciA9IGNvbnN0YW50KGZhbHNlKTtcbiAgICB2YXIgYWx3YXlzID0gY29uc3RhbnQodHJ1ZSk7XG5cbiAgICB2YXIgbm9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBOT05FO1xuICAgIH07XG4gICAgdmFyIE5PTkUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgZXEgPSBmdW5jdGlvbiAobykge1xuICAgICAgICByZXR1cm4gby5pc05vbmUoKTtcbiAgICAgIH07XG4gICAgICB2YXIgY2FsbCA9IGZ1bmN0aW9uICh0aHVuaykge1xuICAgICAgICByZXR1cm4gdGh1bmsoKTtcbiAgICAgIH07XG4gICAgICB2YXIgaWQgPSBmdW5jdGlvbiAobikge1xuICAgICAgICByZXR1cm4gbjtcbiAgICAgIH07XG4gICAgICB2YXIgbWUgPSB7XG4gICAgICAgIGZvbGQ6IGZ1bmN0aW9uIChuLCBfcykge1xuICAgICAgICAgIHJldHVybiBuKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzOiBuZXZlcixcbiAgICAgICAgaXNTb21lOiBuZXZlcixcbiAgICAgICAgaXNOb25lOiBhbHdheXMsXG4gICAgICAgIGdldE9yOiBpZCxcbiAgICAgICAgZ2V0T3JUaHVuazogY2FsbCxcbiAgICAgICAgZ2V0T3JEaWU6IGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnIHx8ICdlcnJvcjogZ2V0T3JEaWUgY2FsbGVkIG9uIG5vbmUuJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldE9yTnVsbDogY29uc3RhbnQobnVsbCksXG4gICAgICAgIGdldE9yVW5kZWZpbmVkOiBjb25zdGFudCh1bmRlZmluZWQpLFxuICAgICAgICBvcjogaWQsXG4gICAgICAgIG9yVGh1bms6IGNhbGwsXG4gICAgICAgIG1hcDogbm9uZSxcbiAgICAgICAgZWFjaDogbm9vcCxcbiAgICAgICAgYmluZDogbm9uZSxcbiAgICAgICAgZXhpc3RzOiBuZXZlcixcbiAgICAgICAgZm9yYWxsOiBhbHdheXMsXG4gICAgICAgIGZpbHRlcjogbm9uZSxcbiAgICAgICAgZXF1YWxzOiBlcSxcbiAgICAgICAgZXF1YWxzXzogZXEsXG4gICAgICAgIHRvQXJyYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0sXG4gICAgICAgIHRvU3RyaW5nOiBjb25zdGFudCgnbm9uZSgpJylcbiAgICAgIH07XG4gICAgICByZXR1cm4gbWU7XG4gICAgfSgpO1xuICAgIHZhciBzb21lID0gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHZhciBjb25zdGFudF9hID0gY29uc3RhbnQoYSk7XG4gICAgICB2YXIgc2VsZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG1lO1xuICAgICAgfTtcbiAgICAgIHZhciBiaW5kID0gZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgcmV0dXJuIGYoYSk7XG4gICAgICB9O1xuICAgICAgdmFyIG1lID0ge1xuICAgICAgICBmb2xkOiBmdW5jdGlvbiAobiwgcykge1xuICAgICAgICAgIHJldHVybiBzKGEpO1xuICAgICAgICB9LFxuICAgICAgICBpczogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICByZXR1cm4gYSA9PT0gdjtcbiAgICAgICAgfSxcbiAgICAgICAgaXNTb21lOiBhbHdheXMsXG4gICAgICAgIGlzTm9uZTogbmV2ZXIsXG4gICAgICAgIGdldE9yOiBjb25zdGFudF9hLFxuICAgICAgICBnZXRPclRodW5rOiBjb25zdGFudF9hLFxuICAgICAgICBnZXRPckRpZTogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JOdWxsOiBjb25zdGFudF9hLFxuICAgICAgICBnZXRPclVuZGVmaW5lZDogY29uc3RhbnRfYSxcbiAgICAgICAgb3I6IHNlbGYsXG4gICAgICAgIG9yVGh1bms6IHNlbGYsXG4gICAgICAgIG1hcDogZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICByZXR1cm4gc29tZShmKGEpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZWFjaDogZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICBmKGEpO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kOiBiaW5kLFxuICAgICAgICBleGlzdHM6IGJpbmQsXG4gICAgICAgIGZvcmFsbDogYmluZCxcbiAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiAoZikge1xuICAgICAgICAgIHJldHVybiBmKGEpID8gbWUgOiBOT05FO1xuICAgICAgICB9LFxuICAgICAgICB0b0FycmF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIFthXTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gJ3NvbWUoJyArIGEgKyAnKSc7XG4gICAgICAgIH0sXG4gICAgICAgIGVxdWFsczogZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgICByZXR1cm4gby5pcyhhKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXF1YWxzXzogZnVuY3Rpb24gKG8sIGVsZW1lbnRFcSkge1xuICAgICAgICAgIHJldHVybiBvLmZvbGQobmV2ZXIsIGZ1bmN0aW9uIChiKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudEVxKGEsIGIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIG1lO1xuICAgIH07XG4gICAgdmFyIGZyb20gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gTk9ORSA6IHNvbWUodmFsdWUpO1xuICAgIH07XG4gICAgdmFyIE9wdGlvbiA9IHtcbiAgICAgIHNvbWU6IHNvbWUsXG4gICAgICBub25lOiBub25lLFxuICAgICAgZnJvbTogZnJvbVxuICAgIH07XG5cbiAgICB2YXIgaXNTaW1wbGVUeXBlID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gdHlwZTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgaXNGdW5jdGlvbiA9IGlzU2ltcGxlVHlwZSgnZnVuY3Rpb24nKTtcblxuICAgIHZhciBuYXRpdmVTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbiAgICB2YXIgbWFwID0gZnVuY3Rpb24gKHhzLCBmKSB7XG4gICAgICB2YXIgbGVuID0geHMubGVuZ3RoO1xuICAgICAgdmFyIHIgPSBuZXcgQXJyYXkobGVuKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHggPSB4c1tpXTtcbiAgICAgICAgcltpXSA9IGYoeCwgaSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcjtcbiAgICB9O1xuICAgIHZhciBlYWNoID0gZnVuY3Rpb24gKHhzLCBmKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0geHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHggPSB4c1tpXTtcbiAgICAgICAgZih4LCBpKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBmaWx0ZXIgPSBmdW5jdGlvbiAoeHMsIHByZWQpIHtcbiAgICAgIHZhciByID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0geHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHggPSB4c1tpXTtcbiAgICAgICAgaWYgKHByZWQoeCwgaSkpIHtcbiAgICAgICAgICByLnB1c2goeCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByO1xuICAgIH07XG4gICAgdmFyIGZvbGRsID0gZnVuY3Rpb24gKHhzLCBmLCBhY2MpIHtcbiAgICAgIGVhY2goeHMsIGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGFjYyA9IGYoYWNjLCB4KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGFjYztcbiAgICB9O1xuICAgIHZhciBmcm9tJDEgPSBpc0Z1bmN0aW9uKEFycmF5LmZyb20pID8gQXJyYXkuZnJvbSA6IGZ1bmN0aW9uICh4KSB7XG4gICAgICByZXR1cm4gbmF0aXZlU2xpY2UuY2FsbCh4KTtcbiAgICB9O1xuXG4gICAgdmFyIHZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHN1YmplY3QgPSBDZWxsKE9wdGlvbi5ub25lKCkpO1xuICAgICAgdmFyIGNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzdWJqZWN0LnNldChPcHRpb24ubm9uZSgpKTtcbiAgICAgIH07XG4gICAgICB2YXIgc2V0ID0gZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgc3ViamVjdC5zZXQoT3B0aW9uLnNvbWUocykpO1xuICAgICAgfTtcbiAgICAgIHZhciBvbiA9IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHN1YmplY3QuZ2V0KCkuZWFjaChmKTtcbiAgICAgIH07XG4gICAgICB2YXIgaXNTZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBzdWJqZWN0LmdldCgpLmlzU29tZSgpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNsZWFyOiBjbGVhcixcbiAgICAgICAgc2V0OiBzZXQsXG4gICAgICAgIGlzU2V0OiBpc1NldCxcbiAgICAgICAgb246IG9uXG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgZ2xvYmFsJDEgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5FbnYnKTtcblxuICAgIHZhciBnbG9iYWwkMiA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuRGVsYXknKTtcblxuICAgIHZhciBnbG9iYWwkMyA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuUHJvbWlzZScpO1xuXG4gICAgdmFyIGdsb2JhbCQ0ID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UudXRpbC5WSycpO1xuXG4gICAgdmFyIHNob3VsZEJsb2NrRHJvcCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ3Bhc3RlX2Jsb2NrX2Ryb3AnLCBmYWxzZSk7XG4gICAgfTtcbiAgICB2YXIgc2hvdWxkUGFzdGVEYXRhSW1hZ2VzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgncGFzdGVfZGF0YV9pbWFnZXMnLCBmYWxzZSk7XG4gICAgfTtcbiAgICB2YXIgc2hvdWxkRmlsdGVyRHJvcCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ3Bhc3RlX2ZpbHRlcl9kcm9wJywgdHJ1ZSk7XG4gICAgfTtcbiAgICB2YXIgZ2V0UHJlUHJvY2VzcyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ3Bhc3RlX3ByZXByb2Nlc3MnKTtcbiAgICB9O1xuICAgIHZhciBnZXRQb3N0UHJvY2VzcyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ3Bhc3RlX3Bvc3Rwcm9jZXNzJyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0V2Via2l0U3R5bGVzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgncGFzdGVfd2Via2l0X3N0eWxlcycpO1xuICAgIH07XG4gICAgdmFyIHNob3VsZFJlbW92ZVdlYktpdFN0eWxlcyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ3Bhc3RlX3JlbW92ZV9zdHlsZXNfaWZfd2Via2l0JywgdHJ1ZSk7XG4gICAgfTtcbiAgICB2YXIgc2hvdWxkTWVyZ2VGb3JtYXRzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgncGFzdGVfbWVyZ2VfZm9ybWF0cycsIHRydWUpO1xuICAgIH07XG4gICAgdmFyIGlzU21hcnRQYXN0ZUVuYWJsZWQgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdzbWFydF9wYXN0ZScsIHRydWUpO1xuICAgIH07XG4gICAgdmFyIGlzUGFzdGVBc1RleHRFbmFibGVkID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgncGFzdGVfYXNfdGV4dCcsIGZhbHNlKTtcbiAgICB9O1xuICAgIHZhciBnZXRSZXRhaW5TdHlsZVByb3BzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgncGFzdGVfcmV0YWluX3N0eWxlX3Byb3BlcnRpZXMnKTtcbiAgICB9O1xuICAgIHZhciBnZXRXb3JkVmFsaWRFbGVtZW50cyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBkZWZhdWx0VmFsaWRFbGVtZW50cyA9ICctc3Ryb25nL2IsLWVtL2ksLXUsLXNwYW4sLXAsLW9sLC11bCwtbGksLWgxLC1oMiwtaDMsLWg0LC1oNSwtaDYsJyArICctcC9kaXYsLWFbaHJlZnxuYW1lXSxzdWIsc3VwLHN0cmlrZSxicixkZWwsdGFibGVbd2lkdGhdLHRyLCcgKyAndGRbY29sc3Bhbnxyb3dzcGFufHdpZHRoXSx0aFtjb2xzcGFufHJvd3NwYW58d2lkdGhdLHRoZWFkLHRmb290LHRib2R5JztcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ3Bhc3RlX3dvcmRfdmFsaWRfZWxlbWVudHMnLCBkZWZhdWx0VmFsaWRFbGVtZW50cyk7XG4gICAgfTtcbiAgICB2YXIgc2hvdWxkQ29udmVydFdvcmRGYWtlTGlzdHMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdwYXN0ZV9jb252ZXJ0X3dvcmRfZmFrZV9saXN0cycsIHRydWUpO1xuICAgIH07XG4gICAgdmFyIHNob3VsZFVzZURlZmF1bHRGaWx0ZXJzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgncGFzdGVfZW5hYmxlX2RlZmF1bHRfZmlsdGVycycsIHRydWUpO1xuICAgIH07XG4gICAgdmFyIGdldFZhbGlkYXRlID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgndmFsaWRhdGUnKTtcbiAgICB9O1xuICAgIHZhciBnZXRBbGxvd0h0bWxEYXRhVXJscyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2FsbG93X2h0bWxfZGF0YV91cmxzJywgZmFsc2UsICdib29sZWFuJyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0UGFzdGVEYXRhSW1hZ2VzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgncGFzdGVfZGF0YV9pbWFnZXMnLCBmYWxzZSwgJ2Jvb2xlYW4nKTtcbiAgICB9O1xuICAgIHZhciBnZXRJbWFnZXNEYXRhSW1nRmlsdGVyID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnaW1hZ2VzX2RhdGFpbWdfZmlsdGVyJyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0SW1hZ2VzUmV1c2VGaWxlbmFtZSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2ltYWdlc19yZXVzZV9maWxlbmFtZScpO1xuICAgIH07XG4gICAgdmFyIGdldEZvcmNlZFJvb3RCbG9jayA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2ZvcmNlZF9yb290X2Jsb2NrJyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0Rm9yY2VkUm9vdEJsb2NrQXR0cnMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdmb3JjZWRfcm9vdF9ibG9ja19hdHRycycpO1xuICAgIH07XG4gICAgdmFyIGdldFRhYlNwYWNlcyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ3Bhc3RlX3RhYl9zcGFjZXMnLCA0LCAnbnVtYmVyJyk7XG4gICAgfTtcblxuICAgIHZhciBpbnRlcm5hbE1pbWVUeXBlID0gJ3gtdGlueW1jZS9odG1sJztcbiAgICB2YXIgaW50ZXJuYWxNYXJrID0gJzwhLS0gJyArIGludGVybmFsTWltZVR5cGUgKyAnIC0tPic7XG4gICAgdmFyIG1hcmsgPSBmdW5jdGlvbiAoaHRtbCkge1xuICAgICAgcmV0dXJuIGludGVybmFsTWFyayArIGh0bWw7XG4gICAgfTtcbiAgICB2YXIgdW5tYXJrID0gZnVuY3Rpb24gKGh0bWwpIHtcbiAgICAgIHJldHVybiBodG1sLnJlcGxhY2UoaW50ZXJuYWxNYXJrLCAnJyk7XG4gICAgfTtcbiAgICB2YXIgaXNNYXJrZWQgPSBmdW5jdGlvbiAoaHRtbCkge1xuICAgICAgcmV0dXJuIGh0bWwuaW5kZXhPZihpbnRlcm5hbE1hcmspICE9PSAtMTtcbiAgICB9O1xuICAgIHZhciBpbnRlcm5hbEh0bWxNaW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGludGVybmFsTWltZVR5cGU7XG4gICAgfTtcblxuICAgIHZhciBnbG9iYWwkNSA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuVG9vbHMnKTtcblxuICAgIHZhciBnbG9iYWwkNiA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLmh0bWwuRW50aXRpZXMnKTtcblxuICAgIHZhciBpc1BsYWluVGV4dCA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICByZXR1cm4gIS88KD86XFwvPyg/ISg/OmRpdnxwfGJyfHNwYW4pPilcXHcrfCg/Oig/ISg/OnNwYW4gc3R5bGU9XCJ3aGl0ZS1zcGFjZTpcXHM/cHJlOz9cIj4pfGJyXFxzP1xcLz4pKVxcdytcXHNbXj5dKyk+L2kudGVzdCh0ZXh0KTtcbiAgICB9O1xuICAgIHZhciB0b0JScyA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC9cXHI/XFxuL2csICc8YnI+Jyk7XG4gICAgfTtcbiAgICB2YXIgb3BlbkNvbnRhaW5lciA9IGZ1bmN0aW9uIChyb290VGFnLCByb290QXR0cnMpIHtcbiAgICAgIHZhciBrZXk7XG4gICAgICB2YXIgYXR0cnMgPSBbXTtcbiAgICAgIHZhciB0YWcgPSAnPCcgKyByb290VGFnO1xuICAgICAgaWYgKHR5cGVvZiByb290QXR0cnMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGZvciAoa2V5IGluIHJvb3RBdHRycykge1xuICAgICAgICAgIGlmIChyb290QXR0cnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgYXR0cnMucHVzaChrZXkgKyAnPVwiJyArIGdsb2JhbCQ2LmVuY29kZUFsbFJhdyhyb290QXR0cnNba2V5XSkgKyAnXCInKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF0dHJzLmxlbmd0aCkge1xuICAgICAgICAgIHRhZyArPSAnICcgKyBhdHRycy5qb2luKCcgJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0YWcgKyAnPic7XG4gICAgfTtcbiAgICB2YXIgdG9CbG9ja0VsZW1lbnRzID0gZnVuY3Rpb24gKHRleHQsIHJvb3RUYWcsIHJvb3RBdHRycykge1xuICAgICAgdmFyIGJsb2NrcyA9IHRleHQuc3BsaXQoL1xcblxcbi8pO1xuICAgICAgdmFyIHRhZ09wZW4gPSBvcGVuQ29udGFpbmVyKHJvb3RUYWcsIHJvb3RBdHRycyk7XG4gICAgICB2YXIgdGFnQ2xvc2UgPSAnPC8nICsgcm9vdFRhZyArICc+JztcbiAgICAgIHZhciBwYXJhZ3JhcGhzID0gZ2xvYmFsJDUubWFwKGJsb2NrcywgZnVuY3Rpb24gKHApIHtcbiAgICAgICAgcmV0dXJuIHAuc3BsaXQoL1xcbi8pLmpvaW4oJzxiciAvPicpO1xuICAgICAgfSk7XG4gICAgICB2YXIgc3RpdGNoID0gZnVuY3Rpb24gKHApIHtcbiAgICAgICAgcmV0dXJuIHRhZ09wZW4gKyBwICsgdGFnQ2xvc2U7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHBhcmFncmFwaHMubGVuZ3RoID09PSAxID8gcGFyYWdyYXBoc1swXSA6IGdsb2JhbCQ1Lm1hcChwYXJhZ3JhcGhzLCBzdGl0Y2gpLmpvaW4oJycpO1xuICAgIH07XG4gICAgdmFyIGNvbnZlcnQgPSBmdW5jdGlvbiAodGV4dCwgcm9vdFRhZywgcm9vdEF0dHJzKSB7XG4gICAgICByZXR1cm4gcm9vdFRhZyA/IHRvQmxvY2tFbGVtZW50cyh0ZXh0LCByb290VGFnID09PSB0cnVlID8gJ3AnIDogcm9vdFRhZywgcm9vdEF0dHJzKSA6IHRvQlJzKHRleHQpO1xuICAgIH07XG5cbiAgICB2YXIgZ2xvYmFsJDcgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5odG1sLkRvbVBhcnNlcicpO1xuXG4gICAgdmFyIGdsb2JhbCQ4ID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuaHRtbC5TZXJpYWxpemVyJyk7XG5cbiAgICB2YXIgbmJzcCA9ICdcXHhBMCc7XG5cbiAgICB2YXIgZ2xvYmFsJDkgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5odG1sLk5vZGUnKTtcblxuICAgIHZhciBnbG9iYWwkYSA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLmh0bWwuU2NoZW1hJyk7XG5cbiAgICBmdW5jdGlvbiBmaWx0ZXIkMShjb250ZW50LCBpdGVtcykge1xuICAgICAgZ2xvYmFsJDUuZWFjaChpdGVtcywgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgaWYgKHYuY29uc3RydWN0b3IgPT09IFJlZ0V4cCkge1xuICAgICAgICAgIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UodiwgJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UodlswXSwgdlsxXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlubmVyVGV4dChodG1sKSB7XG4gICAgICB2YXIgc2NoZW1hID0gZ2xvYmFsJGEoKTtcbiAgICAgIHZhciBkb21QYXJzZXIgPSBnbG9iYWwkNyh7fSwgc2NoZW1hKTtcbiAgICAgIHZhciB0ZXh0ID0gJyc7XG4gICAgICB2YXIgc2hvcnRFbmRlZEVsZW1lbnRzID0gc2NoZW1hLmdldFNob3J0RW5kZWRFbGVtZW50cygpO1xuICAgICAgdmFyIGlnbm9yZUVsZW1lbnRzID0gZ2xvYmFsJDUubWFrZU1hcCgnc2NyaXB0IG5vc2NyaXB0IHN0eWxlIHRleHRhcmVhIHZpZGVvIGF1ZGlvIGlmcmFtZSBvYmplY3QnLCAnICcpO1xuICAgICAgdmFyIGJsb2NrRWxlbWVudHMgPSBzY2hlbWEuZ2V0QmxvY2tFbGVtZW50cygpO1xuICAgICAgZnVuY3Rpb24gd2Fsayhub2RlKSB7XG4gICAgICAgIHZhciBuYW1lID0gbm9kZS5uYW1lLCBjdXJyZW50Tm9kZSA9IG5vZGU7XG4gICAgICAgIGlmIChuYW1lID09PSAnYnInKSB7XG4gICAgICAgICAgdGV4dCArPSAnXFxuJztcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5hbWUgPT09ICd3YnInKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzaG9ydEVuZGVkRWxlbWVudHNbbmFtZV0pIHtcbiAgICAgICAgICB0ZXh0ICs9ICcgJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaWdub3JlRWxlbWVudHNbbmFtZV0pIHtcbiAgICAgICAgICB0ZXh0ICs9ICcgJztcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gMykge1xuICAgICAgICAgIHRleHQgKz0gbm9kZS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW5vZGUuc2hvcnRFbmRlZCkge1xuICAgICAgICAgIGlmIChub2RlID0gbm9kZS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgIHdhbGsobm9kZSk7XG4gICAgICAgICAgICB9IHdoaWxlIChub2RlID0gbm9kZS5uZXh0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJsb2NrRWxlbWVudHNbbmFtZV0gJiYgY3VycmVudE5vZGUubmV4dCkge1xuICAgICAgICAgIHRleHQgKz0gJ1xcbic7XG4gICAgICAgICAgaWYgKG5hbWUgPT09ICdwJykge1xuICAgICAgICAgICAgdGV4dCArPSAnXFxuJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGh0bWwgPSBmaWx0ZXIkMShodG1sLCBbLzwhXFxbW15cXF1dK1xcXT4vZ10pO1xuICAgICAgd2Fsayhkb21QYXJzZXIucGFyc2UoaHRtbCkpO1xuICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRyaW1IdG1sKGh0bWwpIHtcbiAgICAgIGZ1bmN0aW9uIHRyaW1TcGFjZXMoYWxsLCBzMSwgczIpIHtcbiAgICAgICAgaWYgKCFzMSAmJiAhczIpIHtcbiAgICAgICAgICByZXR1cm4gJyAnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuYnNwO1xuICAgICAgfVxuICAgICAgaHRtbCA9IGZpbHRlciQxKGh0bWwsIFtcbiAgICAgICAgL15bXFxzXFxTXSo8Ym9keVtePl0qPlxccyp8XFxzKjxcXC9ib2R5W14+XSo+W1xcc1xcU10qJC9pZyxcbiAgICAgICAgLzwhLS1TdGFydEZyYWdtZW50LS0+fDwhLS1FbmRGcmFnbWVudC0tPi9nLFxuICAgICAgICBbXG4gICAgICAgICAgLyggPyk8c3BhbiBjbGFzcz1cIkFwcGxlLWNvbnZlcnRlZC1zcGFjZVwiPlxcdTAwYTA8XFwvc3Bhbj4oID8pL2csXG4gICAgICAgICAgdHJpbVNwYWNlc1xuICAgICAgICBdLFxuICAgICAgICAvPGJyIGNsYXNzPVwiQXBwbGUtaW50ZXJjaGFuZ2UtbmV3bGluZVwiPi9nLFxuICAgICAgICAvPGJyPiQvaVxuICAgICAgXSk7XG4gICAgICByZXR1cm4gaHRtbDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlSWRHZW5lcmF0b3IocHJlZml4KSB7XG4gICAgICB2YXIgY291bnQgPSAwO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHByZWZpeCArIGNvdW50Kys7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzV29yZENvbnRlbnQoY29udGVudCkge1xuICAgICAgcmV0dXJuIC88Zm9udCBmYWNlPVwiVGltZXMgTmV3IFJvbWFuXCJ8Y2xhc3M9XCI/TXNvfHN0eWxlPVwiW15cIl0qXFxibXNvLXxzdHlsZT0nW14nJ10qXFxibXNvLXx3OldvcmREb2N1bWVudC9pLnRlc3QoY29udGVudCkgfHwgL2NsYXNzPVwiT3V0bGluZUVsZW1lbnQvLnRlc3QoY29udGVudCkgfHwgL2lkPVwiP2RvY3NcXC1pbnRlcm5hbFxcLWd1aWRcXC0vLnRlc3QoY29udGVudCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzTnVtZXJpY0xpc3QodGV4dCkge1xuICAgICAgdmFyIGZvdW5kO1xuICAgICAgdmFyIHBhdHRlcm5zID0gW1xuICAgICAgICAvXltJVlhMTUNEXXsxLDJ9XFwuWyBcXHUwMGEwXS8sXG4gICAgICAgIC9eW2l2eGxtY2RdezEsMn1cXC5bIFxcdTAwYTBdLyxcbiAgICAgICAgL15bYS16XXsxLDJ9W1xcLlxcKV1bIFxcdTAwYTBdLyxcbiAgICAgICAgL15bQS1aXXsxLDJ9W1xcLlxcKV1bIFxcdTAwYTBdLyxcbiAgICAgICAgL15bMC05XStcXC5bIFxcdTAwYTBdLyxcbiAgICAgICAgL15bXFx1MzAwN1xcdTRlMDBcXHU0ZThjXFx1NGUwOVxcdTU2ZGJcXHU0ZTk0XFx1NTE2ZFxcdTRlMDNcXHU1MTZiXFx1NGU1ZF0rXFwuWyBcXHUwMGEwXS8sXG4gICAgICAgIC9eW1xcdTU4ZjFcXHU1ZjEwXFx1NTNjMlxcdTU2ZGJcXHU0ZjBkXFx1NTE2ZFxcdTRlMDNcXHU1MTZiXFx1NGU1ZFxcdTYyZmVdK1xcLlsgXFx1MDBhMF0vXG4gICAgICBdO1xuICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXltcXHUwMGEwIF0rLywgJycpO1xuICAgICAgZ2xvYmFsJDUuZWFjaChwYXR0ZXJucywgZnVuY3Rpb24gKHBhdHRlcm4pIHtcbiAgICAgICAgaWYgKHBhdHRlcm4udGVzdCh0ZXh0KSkge1xuICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZvdW5kO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0J1bGxldExpc3QodGV4dCkge1xuICAgICAgcmV0dXJuIC9eW1xcc1xcdTAwYTBdKltcXHUyMDIyXFx1MDBiN1xcdTAwYTdcXHUyNUNGXVxccyovLnRlc3QodGV4dCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvbnZlcnRGYWtlTGlzdHNUb1Byb3Blckxpc3RzKG5vZGUpIHtcbiAgICAgIHZhciBjdXJyZW50TGlzdE5vZGUsIHByZXZMaXN0Tm9kZSwgbGFzdExldmVsID0gMTtcbiAgICAgIGZ1bmN0aW9uIGdldFRleHQobm9kZSkge1xuICAgICAgICB2YXIgdHh0ID0gJyc7XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09IDMpIHtcbiAgICAgICAgICByZXR1cm4gbm9kZS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZSA9IG5vZGUuZmlyc3RDaGlsZCkge1xuICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgIHR4dCArPSBnZXRUZXh0KG5vZGUpO1xuICAgICAgICAgIH0gd2hpbGUgKG5vZGUgPSBub2RlLm5leHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eHQ7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiB0cmltTGlzdFN0YXJ0KG5vZGUsIHJlZ0V4cCkge1xuICAgICAgICBpZiAobm9kZS50eXBlID09PSAzKSB7XG4gICAgICAgICAgaWYgKHJlZ0V4cC50ZXN0KG5vZGUudmFsdWUpKSB7XG4gICAgICAgICAgICBub2RlLnZhbHVlID0gbm9kZS52YWx1ZS5yZXBsYWNlKHJlZ0V4cCwgJycpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZSA9IG5vZGUuZmlyc3RDaGlsZCkge1xuICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgIGlmICghdHJpbUxpc3RTdGFydChub2RlLCByZWdFeHApKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IHdoaWxlIChub2RlID0gbm9kZS5uZXh0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIHJlbW92ZUlnbm9yZWROb2Rlcyhub2RlKSB7XG4gICAgICAgIGlmIChub2RlLl9saXN0SWdub3JlKSB7XG4gICAgICAgICAgbm9kZS5yZW1vdmUoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUgPSBub2RlLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICBkbyB7XG4gICAgICAgICAgICByZW1vdmVJZ25vcmVkTm9kZXMobm9kZSk7XG4gICAgICAgICAgfSB3aGlsZSAobm9kZSA9IG5vZGUubmV4dCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGNvbnZlcnRQYXJhZ3JhcGhUb0xpKHBhcmFncmFwaE5vZGUsIGxpc3ROYW1lLCBzdGFydCkge1xuICAgICAgICB2YXIgbGV2ZWwgPSBwYXJhZ3JhcGhOb2RlLl9saXN0TGV2ZWwgfHwgbGFzdExldmVsO1xuICAgICAgICBpZiAobGV2ZWwgIT09IGxhc3RMZXZlbCkge1xuICAgICAgICAgIGlmIChsZXZlbCA8IGxhc3RMZXZlbCkge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRMaXN0Tm9kZSkge1xuICAgICAgICAgICAgICBjdXJyZW50TGlzdE5vZGUgPSBjdXJyZW50TGlzdE5vZGUucGFyZW50LnBhcmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJldkxpc3ROb2RlID0gY3VycmVudExpc3ROb2RlO1xuICAgICAgICAgICAgY3VycmVudExpc3ROb2RlID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjdXJyZW50TGlzdE5vZGUgfHwgY3VycmVudExpc3ROb2RlLm5hbWUgIT09IGxpc3ROYW1lKSB7XG4gICAgICAgICAgcHJldkxpc3ROb2RlID0gcHJldkxpc3ROb2RlIHx8IGN1cnJlbnRMaXN0Tm9kZTtcbiAgICAgICAgICBjdXJyZW50TGlzdE5vZGUgPSBuZXcgZ2xvYmFsJDkobGlzdE5hbWUsIDEpO1xuICAgICAgICAgIGlmIChzdGFydCA+IDEpIHtcbiAgICAgICAgICAgIGN1cnJlbnRMaXN0Tm9kZS5hdHRyKCdzdGFydCcsICcnICsgc3RhcnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwYXJhZ3JhcGhOb2RlLndyYXAoY3VycmVudExpc3ROb2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjdXJyZW50TGlzdE5vZGUuYXBwZW5kKHBhcmFncmFwaE5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIHBhcmFncmFwaE5vZGUubmFtZSA9ICdsaSc7XG4gICAgICAgIGlmIChsZXZlbCA+IGxhc3RMZXZlbCAmJiBwcmV2TGlzdE5vZGUpIHtcbiAgICAgICAgICBwcmV2TGlzdE5vZGUubGFzdENoaWxkLmFwcGVuZChjdXJyZW50TGlzdE5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGxhc3RMZXZlbCA9IGxldmVsO1xuICAgICAgICByZW1vdmVJZ25vcmVkTm9kZXMocGFyYWdyYXBoTm9kZSk7XG4gICAgICAgIHRyaW1MaXN0U3RhcnQocGFyYWdyYXBoTm9kZSwgL15cXHUwMGEwKy8pO1xuICAgICAgICB0cmltTGlzdFN0YXJ0KHBhcmFncmFwaE5vZGUsIC9eXFxzKihbXFx1MjAyMlxcdTAwYjdcXHUwMGE3XFx1MjVDRl18XFx3K1xcLikvKTtcbiAgICAgICAgdHJpbUxpc3RTdGFydChwYXJhZ3JhcGhOb2RlLCAvXlxcdTAwYTArLyk7XG4gICAgICB9XG4gICAgICB2YXIgZWxlbWVudHMgPSBbXTtcbiAgICAgIHZhciBjaGlsZCA9IG5vZGUuZmlyc3RDaGlsZDtcbiAgICAgIHdoaWxlICh0eXBlb2YgY2hpbGQgIT09ICd1bmRlZmluZWQnICYmIGNoaWxkICE9PSBudWxsKSB7XG4gICAgICAgIGVsZW1lbnRzLnB1c2goY2hpbGQpO1xuICAgICAgICBjaGlsZCA9IGNoaWxkLndhbGsoKTtcbiAgICAgICAgaWYgKGNoaWxkICE9PSBudWxsKSB7XG4gICAgICAgICAgd2hpbGUgKHR5cGVvZiBjaGlsZCAhPT0gJ3VuZGVmaW5lZCcgJiYgY2hpbGQucGFyZW50ICE9PSBub2RlKSB7XG4gICAgICAgICAgICBjaGlsZCA9IGNoaWxkLndhbGsoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbm9kZSA9IGVsZW1lbnRzW2ldO1xuICAgICAgICBpZiAobm9kZS5uYW1lID09PSAncCcgJiYgbm9kZS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgdmFyIG5vZGVUZXh0ID0gZ2V0VGV4dChub2RlKTtcbiAgICAgICAgICBpZiAoaXNCdWxsZXRMaXN0KG5vZGVUZXh0KSkge1xuICAgICAgICAgICAgY29udmVydFBhcmFncmFwaFRvTGkobm9kZSwgJ3VsJyk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGlzTnVtZXJpY0xpc3Qobm9kZVRleHQpKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2hlcyA9IC8oWzAtOV0rKVxcLi8uZXhlYyhub2RlVGV4dCk7XG4gICAgICAgICAgICB2YXIgc3RhcnQgPSAxO1xuICAgICAgICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgc3RhcnQgPSBwYXJzZUludChtYXRjaGVzWzFdLCAxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb252ZXJ0UGFyYWdyYXBoVG9MaShub2RlLCAnb2wnLCBzdGFydCk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG5vZGUuX2xpc3RMZXZlbCkge1xuICAgICAgICAgICAgY29udmVydFBhcmFncmFwaFRvTGkobm9kZSwgJ3VsJywgMSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VycmVudExpc3ROb2RlID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcmV2TGlzdE5vZGUgPSBjdXJyZW50TGlzdE5vZGU7XG4gICAgICAgICAgY3VycmVudExpc3ROb2RlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBmaWx0ZXJTdHlsZXMoZWRpdG9yLCB2YWxpZFN0eWxlcywgbm9kZSwgc3R5bGVWYWx1ZSkge1xuICAgICAgdmFyIG91dHB1dFN0eWxlcyA9IHt9LCBtYXRjaGVzO1xuICAgICAgdmFyIHN0eWxlcyA9IGVkaXRvci5kb20ucGFyc2VTdHlsZShzdHlsZVZhbHVlKTtcbiAgICAgIGdsb2JhbCQ1LmVhY2goc3R5bGVzLCBmdW5jdGlvbiAodmFsdWUsIG5hbWUpIHtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgIGNhc2UgJ21zby1saXN0JzpcbiAgICAgICAgICBtYXRjaGVzID0gL1xcdysgXFx3KyhbMC05XSspL2kuZXhlYyhzdHlsZVZhbHVlKTtcbiAgICAgICAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICAgICAgbm9kZS5fbGlzdExldmVsID0gcGFyc2VJbnQobWF0Y2hlc1sxXSwgMTApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoL0lnbm9yZS9pLnRlc3QodmFsdWUpICYmIG5vZGUuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgbm9kZS5fbGlzdElnbm9yZSA9IHRydWU7XG4gICAgICAgICAgICBub2RlLmZpcnN0Q2hpbGQuX2xpc3RJZ25vcmUgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnaG9yaXotYWxpZ24nOlxuICAgICAgICAgIG5hbWUgPSAndGV4dC1hbGlnbic7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3ZlcnQtYWxpZ24nOlxuICAgICAgICAgIG5hbWUgPSAndmVydGljYWwtYWxpZ24nO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdmb250LWNvbG9yJzpcbiAgICAgICAgY2FzZSAnbXNvLWZvcmVncm91bmQnOlxuICAgICAgICAgIG5hbWUgPSAnY29sb3InO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdtc28tYmFja2dyb3VuZCc6XG4gICAgICAgIGNhc2UgJ21zby1oaWdobGlnaHQnOlxuICAgICAgICAgIG5hbWUgPSAnYmFja2dyb3VuZCc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2ZvbnQtd2VpZ2h0JzpcbiAgICAgICAgY2FzZSAnZm9udC1zdHlsZSc6XG4gICAgICAgICAgaWYgKHZhbHVlICE9PSAnbm9ybWFsJykge1xuICAgICAgICAgICAgb3V0cHV0U3R5bGVzW25hbWVdID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY2FzZSAnbXNvLWVsZW1lbnQnOlxuICAgICAgICAgIGlmICgvXihjb21tZW50fGNvbW1lbnQtbGlzdCkkL2kudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuYW1lLmluZGV4T2YoJ21zby1jb21tZW50JykgPT09IDApIHtcbiAgICAgICAgICBub2RlLnJlbW92ZSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmFtZS5pbmRleE9mKCdtc28tJykgPT09IDApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdldFJldGFpblN0eWxlUHJvcHMoZWRpdG9yKSA9PT0gJ2FsbCcgfHwgdmFsaWRTdHlsZXMgJiYgdmFsaWRTdHlsZXNbbmFtZV0pIHtcbiAgICAgICAgICBvdXRwdXRTdHlsZXNbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoLyhib2xkKS9pLnRlc3Qob3V0cHV0U3R5bGVzWydmb250LXdlaWdodCddKSkge1xuICAgICAgICBkZWxldGUgb3V0cHV0U3R5bGVzWydmb250LXdlaWdodCddO1xuICAgICAgICBub2RlLndyYXAobmV3IGdsb2JhbCQ5KCdiJywgMSkpO1xuICAgICAgfVxuICAgICAgaWYgKC8oaXRhbGljKS9pLnRlc3Qob3V0cHV0U3R5bGVzWydmb250LXN0eWxlJ10pKSB7XG4gICAgICAgIGRlbGV0ZSBvdXRwdXRTdHlsZXNbJ2ZvbnQtc3R5bGUnXTtcbiAgICAgICAgbm9kZS53cmFwKG5ldyBnbG9iYWwkOSgnaScsIDEpKTtcbiAgICAgIH1cbiAgICAgIG91dHB1dFN0eWxlcyA9IGVkaXRvci5kb20uc2VyaWFsaXplU3R5bGUob3V0cHV0U3R5bGVzLCBub2RlLm5hbWUpO1xuICAgICAgaWYgKG91dHB1dFN0eWxlcykge1xuICAgICAgICByZXR1cm4gb3V0cHV0U3R5bGVzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBmaWx0ZXJXb3JkQ29udGVudCA9IGZ1bmN0aW9uIChlZGl0b3IsIGNvbnRlbnQpIHtcbiAgICAgIHZhciB2YWxpZFN0eWxlcztcbiAgICAgIHZhciByZXRhaW5TdHlsZVByb3BlcnRpZXMgPSBnZXRSZXRhaW5TdHlsZVByb3BzKGVkaXRvcik7XG4gICAgICBpZiAocmV0YWluU3R5bGVQcm9wZXJ0aWVzKSB7XG4gICAgICAgIHZhbGlkU3R5bGVzID0gZ2xvYmFsJDUubWFrZU1hcChyZXRhaW5TdHlsZVByb3BlcnRpZXMuc3BsaXQoL1ssIF0vKSk7XG4gICAgICB9XG4gICAgICBjb250ZW50ID0gZmlsdGVyJDEoY29udGVudCwgW1xuICAgICAgICAvPGJyIGNsYXNzPVwiP0FwcGxlLWludGVyY2hhbmdlLW5ld2xpbmVcIj8+L2dpLFxuICAgICAgICAvPGJbXj5dK2lkPVwiP2RvY3MtaW50ZXJuYWwtW14+XSo+L2dpLFxuICAgICAgICAvPCEtLVtcXHNcXFNdKz8tLT4vZ2ksXG4gICAgICAgIC88KCF8c2NyaXB0W14+XSo+Lio/PFxcL3NjcmlwdCg/PVs+XFxzXSl8XFwvPyhcXD94bWwoOlxcdyspP3xpbWd8bWV0YXxsaW5rfHN0eWxlfFxcdzpcXHcrKSg/PVtcXHNcXC8+XSkpW14+XSo+L2dpLFxuICAgICAgICBbXG4gICAgICAgICAgLzwoXFwvPylzPi9naSxcbiAgICAgICAgICAnPCQxc3RyaWtlPidcbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgIC8mbmJzcDsvZ2ksXG4gICAgICAgICAgbmJzcFxuICAgICAgICBdLFxuICAgICAgICBbXG4gICAgICAgICAgLzxzcGFuXFxzK3N0eWxlXFxzKj1cXHMqXCJcXHMqbXNvLXNwYWNlcnVuXFxzKjpcXHMqeWVzXFxzKjs/XFxzKlwiXFxzKj4oW1xcc1xcdTAwYTBdKik8XFwvc3Bhbj4vZ2ksXG4gICAgICAgICAgZnVuY3Rpb24gKHN0ciwgc3BhY2VzKSB7XG4gICAgICAgICAgICByZXR1cm4gc3BhY2VzLmxlbmd0aCA+IDAgPyBzcGFjZXMucmVwbGFjZSgvLi8sICcgJykuc2xpY2UoTWF0aC5mbG9vcihzcGFjZXMubGVuZ3RoIC8gMikpLnNwbGl0KCcnKS5qb2luKG5ic3ApIDogJyc7XG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICBdKTtcbiAgICAgIHZhciB2YWxpZEVsZW1lbnRzID0gZ2V0V29yZFZhbGlkRWxlbWVudHMoZWRpdG9yKTtcbiAgICAgIHZhciBzY2hlbWEgPSBnbG9iYWwkYSh7XG4gICAgICAgIHZhbGlkX2VsZW1lbnRzOiB2YWxpZEVsZW1lbnRzLFxuICAgICAgICB2YWxpZF9jaGlsZHJlbjogJy1saVtwXSdcbiAgICAgIH0pO1xuICAgICAgZ2xvYmFsJDUuZWFjaChzY2hlbWEuZWxlbWVudHMsIGZ1bmN0aW9uIChydWxlKSB7XG4gICAgICAgIGlmICghcnVsZS5hdHRyaWJ1dGVzLmNsYXNzKSB7XG4gICAgICAgICAgcnVsZS5hdHRyaWJ1dGVzLmNsYXNzID0ge307XG4gICAgICAgICAgcnVsZS5hdHRyaWJ1dGVzT3JkZXIucHVzaCgnY2xhc3MnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJ1bGUuYXR0cmlidXRlcy5zdHlsZSkge1xuICAgICAgICAgIHJ1bGUuYXR0cmlidXRlcy5zdHlsZSA9IHt9O1xuICAgICAgICAgIHJ1bGUuYXR0cmlidXRlc09yZGVyLnB1c2goJ3N0eWxlJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdmFyIGRvbVBhcnNlciA9IGdsb2JhbCQ3KHt9LCBzY2hlbWEpO1xuICAgICAgZG9tUGFyc2VyLmFkZEF0dHJpYnV0ZUZpbHRlcignc3R5bGUnLCBmdW5jdGlvbiAobm9kZXMpIHtcbiAgICAgICAgdmFyIGkgPSBub2Rlcy5sZW5ndGgsIG5vZGU7XG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICBub2RlID0gbm9kZXNbaV07XG4gICAgICAgICAgbm9kZS5hdHRyKCdzdHlsZScsIGZpbHRlclN0eWxlcyhlZGl0b3IsIHZhbGlkU3R5bGVzLCBub2RlLCBub2RlLmF0dHIoJ3N0eWxlJykpKTtcbiAgICAgICAgICBpZiAobm9kZS5uYW1lID09PSAnc3BhbicgJiYgbm9kZS5wYXJlbnQgJiYgIW5vZGUuYXR0cmlidXRlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIG5vZGUudW53cmFwKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGRvbVBhcnNlci5hZGRBdHRyaWJ1dGVGaWx0ZXIoJ2NsYXNzJywgZnVuY3Rpb24gKG5vZGVzKSB7XG4gICAgICAgIHZhciBpID0gbm9kZXMubGVuZ3RoLCBub2RlLCBjbGFzc05hbWU7XG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICBub2RlID0gbm9kZXNbaV07XG4gICAgICAgICAgY2xhc3NOYW1lID0gbm9kZS5hdHRyKCdjbGFzcycpO1xuICAgICAgICAgIGlmICgvXihNc29Db21tZW50UmVmZXJlbmNlfE1zb0NvbW1lbnRUZXh0fG1zb0RlbCkkL2kudGVzdChjbGFzc05hbWUpKSB7XG4gICAgICAgICAgICBub2RlLnJlbW92ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBub2RlLmF0dHIoJ2NsYXNzJywgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZG9tUGFyc2VyLmFkZE5vZGVGaWx0ZXIoJ2RlbCcsIGZ1bmN0aW9uIChub2Rlcykge1xuICAgICAgICB2YXIgaSA9IG5vZGVzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgIG5vZGVzW2ldLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGRvbVBhcnNlci5hZGROb2RlRmlsdGVyKCdhJywgZnVuY3Rpb24gKG5vZGVzKSB7XG4gICAgICAgIHZhciBpID0gbm9kZXMubGVuZ3RoLCBub2RlLCBocmVmLCBuYW1lO1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgICAgIGhyZWYgPSBub2RlLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgICBuYW1lID0gbm9kZS5hdHRyKCduYW1lJyk7XG4gICAgICAgICAgaWYgKGhyZWYgJiYgaHJlZi5pbmRleE9mKCcjX21zb2NvbV8nKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlKCk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGhyZWYgJiYgaHJlZi5pbmRleE9mKCdmaWxlOi8vJykgPT09IDApIHtcbiAgICAgICAgICAgIGhyZWYgPSBocmVmLnNwbGl0KCcjJylbMV07XG4gICAgICAgICAgICBpZiAoaHJlZikge1xuICAgICAgICAgICAgICBocmVmID0gJyMnICsgaHJlZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFocmVmICYmICFuYW1lKSB7XG4gICAgICAgICAgICBub2RlLnVud3JhcCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobmFtZSAmJiAhL15fPyg/OnRvY3xlZG58ZnRuKS9pLnRlc3QobmFtZSkpIHtcbiAgICAgICAgICAgICAgbm9kZS51bndyYXAoKTtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLmF0dHIoe1xuICAgICAgICAgICAgICBocmVmOiBocmVmLFxuICAgICAgICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdmFyIHJvb3ROb2RlID0gZG9tUGFyc2VyLnBhcnNlKGNvbnRlbnQpO1xuICAgICAgaWYgKHNob3VsZENvbnZlcnRXb3JkRmFrZUxpc3RzKGVkaXRvcikpIHtcbiAgICAgICAgY29udmVydEZha2VMaXN0c1RvUHJvcGVyTGlzdHMocm9vdE5vZGUpO1xuICAgICAgfVxuICAgICAgY29udGVudCA9IGdsb2JhbCQ4KHsgdmFsaWRhdGU6IGdldFZhbGlkYXRlKGVkaXRvcikgfSwgc2NoZW1hKS5zZXJpYWxpemUocm9vdE5vZGUpO1xuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfTtcbiAgICB2YXIgcHJlUHJvY2VzcyA9IGZ1bmN0aW9uIChlZGl0b3IsIGNvbnRlbnQpIHtcbiAgICAgIHJldHVybiBzaG91bGRVc2VEZWZhdWx0RmlsdGVycyhlZGl0b3IpID8gZmlsdGVyV29yZENvbnRlbnQoZWRpdG9yLCBjb250ZW50KSA6IGNvbnRlbnQ7XG4gICAgfTtcblxuICAgIHZhciBwcmVQcm9jZXNzJDEgPSBmdW5jdGlvbiAoZWRpdG9yLCBodG1sKSB7XG4gICAgICB2YXIgcGFyc2VyID0gZ2xvYmFsJDcoe30sIGVkaXRvci5zY2hlbWEpO1xuICAgICAgcGFyc2VyLmFkZE5vZGVGaWx0ZXIoJ21ldGEnLCBmdW5jdGlvbiAobm9kZXMpIHtcbiAgICAgICAgZ2xvYmFsJDUuZWFjaChub2RlcywgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICByZXR1cm4gbm9kZS5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHZhciBmcmFnbWVudCA9IHBhcnNlci5wYXJzZShodG1sLCB7XG4gICAgICAgIGZvcmNlZF9yb290X2Jsb2NrOiBmYWxzZSxcbiAgICAgICAgaXNSb290Q29udGVudDogdHJ1ZVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gZ2xvYmFsJDgoeyB2YWxpZGF0ZTogZ2V0VmFsaWRhdGUoZWRpdG9yKSB9LCBlZGl0b3Iuc2NoZW1hKS5zZXJpYWxpemUoZnJhZ21lbnQpO1xuICAgIH07XG4gICAgdmFyIHByb2Nlc3NSZXN1bHQgPSBmdW5jdGlvbiAoY29udGVudCwgY2FuY2VsbGVkKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb250ZW50OiBjb250ZW50LFxuICAgICAgICBjYW5jZWxsZWQ6IGNhbmNlbGxlZFxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBwb3N0UHJvY2Vzc0ZpbHRlciA9IGZ1bmN0aW9uIChlZGl0b3IsIGh0bWwsIGludGVybmFsLCBpc1dvcmRIdG1sKSB7XG4gICAgICB2YXIgdGVtcEJvZHkgPSBlZGl0b3IuZG9tLmNyZWF0ZSgnZGl2JywgeyBzdHlsZTogJ2Rpc3BsYXk6bm9uZScgfSwgaHRtbCk7XG4gICAgICB2YXIgcG9zdFByb2Nlc3NBcmdzID0gZmlyZVBhc3RlUG9zdFByb2Nlc3MoZWRpdG9yLCB0ZW1wQm9keSwgaW50ZXJuYWwsIGlzV29yZEh0bWwpO1xuICAgICAgcmV0dXJuIHByb2Nlc3NSZXN1bHQocG9zdFByb2Nlc3NBcmdzLm5vZGUuaW5uZXJIVE1MLCBwb3N0UHJvY2Vzc0FyZ3MuaXNEZWZhdWx0UHJldmVudGVkKCkpO1xuICAgIH07XG4gICAgdmFyIGZpbHRlckNvbnRlbnQgPSBmdW5jdGlvbiAoZWRpdG9yLCBjb250ZW50LCBpbnRlcm5hbCwgaXNXb3JkSHRtbCkge1xuICAgICAgdmFyIHByZVByb2Nlc3NBcmdzID0gZmlyZVBhc3RlUHJlUHJvY2VzcyhlZGl0b3IsIGNvbnRlbnQsIGludGVybmFsLCBpc1dvcmRIdG1sKTtcbiAgICAgIHZhciBmaWx0ZXJlZENvbnRlbnQgPSBwcmVQcm9jZXNzJDEoZWRpdG9yLCBwcmVQcm9jZXNzQXJncy5jb250ZW50KTtcbiAgICAgIGlmIChlZGl0b3IuaGFzRXZlbnRMaXN0ZW5lcnMoJ1Bhc3RlUG9zdFByb2Nlc3MnKSAmJiAhcHJlUHJvY2Vzc0FyZ3MuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgcmV0dXJuIHBvc3RQcm9jZXNzRmlsdGVyKGVkaXRvciwgZmlsdGVyZWRDb250ZW50LCBpbnRlcm5hbCwgaXNXb3JkSHRtbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcHJvY2Vzc1Jlc3VsdChmaWx0ZXJlZENvbnRlbnQsIHByZVByb2Nlc3NBcmdzLmlzRGVmYXVsdFByZXZlbnRlZCgpKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBwcm9jZXNzID0gZnVuY3Rpb24gKGVkaXRvciwgaHRtbCwgaW50ZXJuYWwpIHtcbiAgICAgIHZhciBpc1dvcmRIdG1sID0gaXNXb3JkQ29udGVudChodG1sKTtcbiAgICAgIHZhciBjb250ZW50ID0gaXNXb3JkSHRtbCA/IHByZVByb2Nlc3MoZWRpdG9yLCBodG1sKSA6IGh0bWw7XG4gICAgICByZXR1cm4gZmlsdGVyQ29udGVudChlZGl0b3IsIGNvbnRlbnQsIGludGVybmFsLCBpc1dvcmRIdG1sKTtcbiAgICB9O1xuXG4gICAgdmFyIHBhc3RlSHRtbCA9IGZ1bmN0aW9uIChlZGl0b3IsIGh0bWwpIHtcbiAgICAgIGVkaXRvci5pbnNlcnRDb250ZW50KGh0bWwsIHtcbiAgICAgICAgbWVyZ2U6IHNob3VsZE1lcmdlRm9ybWF0cyhlZGl0b3IpLFxuICAgICAgICBwYXN0ZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIHZhciBpc0Fic29sdXRlVXJsID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgcmV0dXJuIC9eaHR0cHM/OlxcL1xcL1tcXHdcXD9cXC1cXC8rPS4mJUB+I10rJC9pLnRlc3QodXJsKTtcbiAgICB9O1xuICAgIHZhciBpc0ltYWdlVXJsID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgcmV0dXJuIGlzQWJzb2x1dGVVcmwodXJsKSAmJiAvLihnaWZ8anBlP2d8cG5nKSQvLnRlc3QodXJsKTtcbiAgICB9O1xuICAgIHZhciBjcmVhdGVJbWFnZSA9IGZ1bmN0aW9uIChlZGl0b3IsIHVybCwgcGFzdGVIdG1sRm4pIHtcbiAgICAgIGVkaXRvci51bmRvTWFuYWdlci5leHRyYShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBhc3RlSHRtbEZuKGVkaXRvciwgdXJsKTtcbiAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZWRpdG9yLmluc2VydENvbnRlbnQoJzxpbWcgc3JjPVwiJyArIHVybCArICdcIj4nKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICB2YXIgY3JlYXRlTGluayA9IGZ1bmN0aW9uIChlZGl0b3IsIHVybCwgcGFzdGVIdG1sRm4pIHtcbiAgICAgIGVkaXRvci51bmRvTWFuYWdlci5leHRyYShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBhc3RlSHRtbEZuKGVkaXRvciwgdXJsKTtcbiAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZWRpdG9yLmV4ZWNDb21tYW5kKCdtY2VJbnNlcnRMaW5rJywgZmFsc2UsIHVybCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgdmFyIGxpbmtTZWxlY3Rpb24gPSBmdW5jdGlvbiAoZWRpdG9yLCBodG1sLCBwYXN0ZUh0bWxGbikge1xuICAgICAgcmV0dXJuIGVkaXRvci5zZWxlY3Rpb24uaXNDb2xsYXBzZWQoKSA9PT0gZmFsc2UgJiYgaXNBYnNvbHV0ZVVybChodG1sKSA/IGNyZWF0ZUxpbmsoZWRpdG9yLCBodG1sLCBwYXN0ZUh0bWxGbikgOiBmYWxzZTtcbiAgICB9O1xuICAgIHZhciBpbnNlcnRJbWFnZSA9IGZ1bmN0aW9uIChlZGl0b3IsIGh0bWwsIHBhc3RlSHRtbEZuKSB7XG4gICAgICByZXR1cm4gaXNJbWFnZVVybChodG1sKSA/IGNyZWF0ZUltYWdlKGVkaXRvciwgaHRtbCwgcGFzdGVIdG1sRm4pIDogZmFsc2U7XG4gICAgfTtcbiAgICB2YXIgc21hcnRJbnNlcnRDb250ZW50ID0gZnVuY3Rpb24gKGVkaXRvciwgaHRtbCkge1xuICAgICAgZ2xvYmFsJDUuZWFjaChbXG4gICAgICAgIGxpbmtTZWxlY3Rpb24sXG4gICAgICAgIGluc2VydEltYWdlLFxuICAgICAgICBwYXN0ZUh0bWxcbiAgICAgIF0sIGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGFjdGlvbihlZGl0b3IsIGh0bWwsIHBhc3RlSHRtbCkgIT09IHRydWU7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBpbnNlcnRDb250ZW50ID0gZnVuY3Rpb24gKGVkaXRvciwgaHRtbCwgcGFzdGVBc1RleHQpIHtcbiAgICAgIGlmIChwYXN0ZUFzVGV4dCB8fCBpc1NtYXJ0UGFzdGVFbmFibGVkKGVkaXRvcikgPT09IGZhbHNlKSB7XG4gICAgICAgIHBhc3RlSHRtbChlZGl0b3IsIGh0bWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc21hcnRJbnNlcnRDb250ZW50KGVkaXRvciwgaHRtbCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciByZXBlYXQgPSBmdW5jdGlvbiAocywgY291bnQpIHtcbiAgICAgIHJldHVybiBjb3VudCA8PSAwID8gJycgOiBuZXcgQXJyYXkoY291bnQgKyAxKS5qb2luKHMpO1xuICAgIH07XG5cbiAgICB2YXIgaXNDb2xsYXBzaWJsZVdoaXRlc3BhY2UgPSBmdW5jdGlvbiAoYykge1xuICAgICAgcmV0dXJuICcgXFxmXFx0XFx4MEInLmluZGV4T2YoYykgIT09IC0xO1xuICAgIH07XG4gICAgdmFyIGlzTmV3TGluZUNoYXIgPSBmdW5jdGlvbiAoYykge1xuICAgICAgcmV0dXJuIGMgPT09ICdcXG4nIHx8IGMgPT09ICdcXHInO1xuICAgIH07XG4gICAgdmFyIGlzTmV3bGluZSA9IGZ1bmN0aW9uICh0ZXh0LCBpZHgpIHtcbiAgICAgIHJldHVybiBpZHggPCB0ZXh0Lmxlbmd0aCAmJiBpZHggPj0gMCA/IGlzTmV3TGluZUNoYXIodGV4dFtpZHhdKSA6IGZhbHNlO1xuICAgIH07XG4gICAgdmFyIG5vcm1hbGl6ZVdoaXRlc3BhY2UgPSBmdW5jdGlvbiAoZWRpdG9yLCB0ZXh0KSB7XG4gICAgICB2YXIgdGFiU3BhY2UgPSByZXBlYXQoJyAnLCBnZXRUYWJTcGFjZXMoZWRpdG9yKSk7XG4gICAgICB2YXIgbm9ybWFsaXplZFRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcdC9nLCB0YWJTcGFjZSk7XG4gICAgICB2YXIgcmVzdWx0ID0gZm9sZGwobm9ybWFsaXplZFRleHQsIGZ1bmN0aW9uIChhY2MsIGMpIHtcbiAgICAgICAgaWYgKGlzQ29sbGFwc2libGVXaGl0ZXNwYWNlKGMpIHx8IGMgPT09IG5ic3ApIHtcbiAgICAgICAgICBpZiAoYWNjLnBjSXNTcGFjZSB8fCBhY2Muc3RyID09PSAnJyB8fCBhY2Muc3RyLmxlbmd0aCA9PT0gbm9ybWFsaXplZFRleHQubGVuZ3RoIC0gMSB8fCBpc05ld2xpbmUobm9ybWFsaXplZFRleHQsIGFjYy5zdHIubGVuZ3RoICsgMSkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHBjSXNTcGFjZTogZmFsc2UsXG4gICAgICAgICAgICAgIHN0cjogYWNjLnN0ciArIG5ic3BcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHBjSXNTcGFjZTogdHJ1ZSxcbiAgICAgICAgICAgICAgc3RyOiBhY2Muc3RyICsgJyAnXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGNJc1NwYWNlOiBpc05ld0xpbmVDaGFyKGMpLFxuICAgICAgICAgICAgc3RyOiBhY2Muc3RyICsgY1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAgcGNJc1NwYWNlOiBmYWxzZSxcbiAgICAgICAgc3RyOiAnJ1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzdWx0LnN0cjtcbiAgICB9O1xuXG4gICAgdmFyIGRvUGFzdGUgPSBmdW5jdGlvbiAoZWRpdG9yLCBjb250ZW50LCBpbnRlcm5hbCwgcGFzdGVBc1RleHQpIHtcbiAgICAgIHZhciBhcmdzID0gcHJvY2VzcyhlZGl0b3IsIGNvbnRlbnQsIGludGVybmFsKTtcbiAgICAgIGlmIChhcmdzLmNhbmNlbGxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgaW5zZXJ0Q29udGVudChlZGl0b3IsIGFyZ3MuY29udGVudCwgcGFzdGVBc1RleHQpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHBhc3RlSHRtbCQxID0gZnVuY3Rpb24gKGVkaXRvciwgaHRtbCwgaW50ZXJuYWxGbGFnKSB7XG4gICAgICB2YXIgaW50ZXJuYWwgPSBpbnRlcm5hbEZsYWcgPyBpbnRlcm5hbEZsYWcgOiBpc01hcmtlZChodG1sKTtcbiAgICAgIGRvUGFzdGUoZWRpdG9yLCB1bm1hcmsoaHRtbCksIGludGVybmFsLCBmYWxzZSk7XG4gICAgfTtcbiAgICB2YXIgcGFzdGVUZXh0ID0gZnVuY3Rpb24gKGVkaXRvciwgdGV4dCkge1xuICAgICAgdmFyIGVuY29kZWRUZXh0ID0gZWRpdG9yLmRvbS5lbmNvZGUodGV4dCkucmVwbGFjZSgvXFxyXFxuL2csICdcXG4nKTtcbiAgICAgIHZhciBub3JtYWxpemVkVGV4dCA9IG5vcm1hbGl6ZVdoaXRlc3BhY2UoZWRpdG9yLCBlbmNvZGVkVGV4dCk7XG4gICAgICB2YXIgaHRtbCA9IGNvbnZlcnQobm9ybWFsaXplZFRleHQsIGdldEZvcmNlZFJvb3RCbG9jayhlZGl0b3IpLCBnZXRGb3JjZWRSb290QmxvY2tBdHRycyhlZGl0b3IpKTtcbiAgICAgIGRvUGFzdGUoZWRpdG9yLCBodG1sLCBmYWxzZSwgdHJ1ZSk7XG4gICAgfTtcbiAgICB2YXIgZ2V0RGF0YVRyYW5zZmVySXRlbXMgPSBmdW5jdGlvbiAoZGF0YVRyYW5zZmVyKSB7XG4gICAgICB2YXIgaXRlbXMgPSB7fTtcbiAgICAgIHZhciBtY2VJbnRlcm5hbFVybFByZWZpeCA9ICdkYXRhOnRleHQvbWNlLWludGVybmFsLCc7XG4gICAgICBpZiAoZGF0YVRyYW5zZmVyKSB7XG4gICAgICAgIGlmIChkYXRhVHJhbnNmZXIuZ2V0RGF0YSkge1xuICAgICAgICAgIHZhciBsZWdhY3lUZXh0ID0gZGF0YVRyYW5zZmVyLmdldERhdGEoJ1RleHQnKTtcbiAgICAgICAgICBpZiAobGVnYWN5VGV4dCAmJiBsZWdhY3lUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmIChsZWdhY3lUZXh0LmluZGV4T2YobWNlSW50ZXJuYWxVcmxQcmVmaXgpID09PSAtMSkge1xuICAgICAgICAgICAgICBpdGVtc1sndGV4dC9wbGFpbiddID0gbGVnYWN5VGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGFUcmFuc2Zlci50eXBlcykge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YVRyYW5zZmVyLnR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY29udGVudFR5cGUgPSBkYXRhVHJhbnNmZXIudHlwZXNbaV07XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBpdGVtc1tjb250ZW50VHlwZV0gPSBkYXRhVHJhbnNmZXIuZ2V0RGF0YShjb250ZW50VHlwZSk7XG4gICAgICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgICAgICBpdGVtc1tjb250ZW50VHlwZV0gPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVtcztcbiAgICB9O1xuICAgIHZhciBnZXRDbGlwYm9hcmRDb250ZW50ID0gZnVuY3Rpb24gKGVkaXRvciwgY2xpcGJvYXJkRXZlbnQpIHtcbiAgICAgIHJldHVybiBnZXREYXRhVHJhbnNmZXJJdGVtcyhjbGlwYm9hcmRFdmVudC5jbGlwYm9hcmREYXRhIHx8IGVkaXRvci5nZXREb2MoKS5kYXRhVHJhbnNmZXIpO1xuICAgIH07XG4gICAgdmFyIGhhc0NvbnRlbnRUeXBlID0gZnVuY3Rpb24gKGNsaXBib2FyZENvbnRlbnQsIG1pbWVUeXBlKSB7XG4gICAgICByZXR1cm4gbWltZVR5cGUgaW4gY2xpcGJvYXJkQ29udGVudCAmJiBjbGlwYm9hcmRDb250ZW50W21pbWVUeXBlXS5sZW5ndGggPiAwO1xuICAgIH07XG4gICAgdmFyIGhhc0h0bWxPclRleHQgPSBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgcmV0dXJuIGhhc0NvbnRlbnRUeXBlKGNvbnRlbnQsICd0ZXh0L2h0bWwnKSB8fCBoYXNDb250ZW50VHlwZShjb250ZW50LCAndGV4dC9wbGFpbicpO1xuICAgIH07XG4gICAgdmFyIHBhcnNlRGF0YVVyaSA9IGZ1bmN0aW9uICh1cmkpIHtcbiAgICAgIHZhciBtYXRjaGVzID0gL2RhdGE6KFteO10rKTtiYXNlNjQsKFthLXowLTlcXCtcXC89XSspL2kuZXhlYyh1cmkpO1xuICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0eXBlOiBtYXRjaGVzWzFdLFxuICAgICAgICAgIGRhdGE6IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaGVzWzJdKVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0eXBlOiBudWxsLFxuICAgICAgICAgIGRhdGE6IG51bGxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBpc1ZhbGlkRGF0YVVyaUltYWdlID0gZnVuY3Rpb24gKGVkaXRvciwgaW1nRWxtKSB7XG4gICAgICB2YXIgZmlsdGVyID0gZ2V0SW1hZ2VzRGF0YUltZ0ZpbHRlcihlZGl0b3IpO1xuICAgICAgcmV0dXJuIGZpbHRlciA/IGZpbHRlcihpbWdFbG0pIDogdHJ1ZTtcbiAgICB9O1xuICAgIHZhciBleHRyYWN0RmlsZW5hbWUgPSBmdW5jdGlvbiAoZWRpdG9yLCBzdHIpIHtcbiAgICAgIHZhciBtID0gc3RyLm1hdGNoKC8oW1xcc1xcU10rPylcXC4oPzpqcGVnfGpwZ3xwbmd8Z2lmKSQvaSk7XG4gICAgICByZXR1cm4gbSA/IGVkaXRvci5kb20uZW5jb2RlKG1bMV0pIDogbnVsbDtcbiAgICB9O1xuICAgIHZhciB1bmlxdWVJZCA9IGNyZWF0ZUlkR2VuZXJhdG9yKCdtY2VjbGlwJyk7XG4gICAgdmFyIHBhc3RlSW1hZ2UgPSBmdW5jdGlvbiAoZWRpdG9yLCBpbWFnZUl0ZW0pIHtcbiAgICAgIHZhciBfYSA9IHBhcnNlRGF0YVVyaShpbWFnZUl0ZW0udXJpKSwgYmFzZTY0ID0gX2EuZGF0YSwgdHlwZSA9IF9hLnR5cGU7XG4gICAgICB2YXIgaWQgPSB1bmlxdWVJZCgpO1xuICAgICAgdmFyIG5hbWUgPSBnZXRJbWFnZXNSZXVzZUZpbGVuYW1lKGVkaXRvcikgJiYgaW1hZ2VJdGVtLmJsb2IubmFtZSA/IGV4dHJhY3RGaWxlbmFtZShlZGl0b3IsIGltYWdlSXRlbS5ibG9iLm5hbWUpIDogaWQ7XG4gICAgICB2YXIgaW1nID0gbmV3IGRvbUdsb2JhbHMuSW1hZ2UoKTtcbiAgICAgIGltZy5zcmMgPSBpbWFnZUl0ZW0udXJpO1xuICAgICAgaWYgKGlzVmFsaWREYXRhVXJpSW1hZ2UoZWRpdG9yLCBpbWcpKSB7XG4gICAgICAgIHZhciBibG9iQ2FjaGUgPSBlZGl0b3IuZWRpdG9yVXBsb2FkLmJsb2JDYWNoZTtcbiAgICAgICAgdmFyIGJsb2JJbmZvID0gdm9pZCAwO1xuICAgICAgICB2YXIgZXhpc3RpbmdCbG9iSW5mbyA9IGJsb2JDYWNoZS5nZXRCeURhdGEoYmFzZTY0LCB0eXBlKTtcbiAgICAgICAgaWYgKCFleGlzdGluZ0Jsb2JJbmZvKSB7XG4gICAgICAgICAgYmxvYkluZm8gPSBibG9iQ2FjaGUuY3JlYXRlKGlkLCBpbWFnZUl0ZW0uYmxvYiwgYmFzZTY0LCBuYW1lKTtcbiAgICAgICAgICBibG9iQ2FjaGUuYWRkKGJsb2JJbmZvKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBibG9iSW5mbyA9IGV4aXN0aW5nQmxvYkluZm87XG4gICAgICAgIH1cbiAgICAgICAgcGFzdGVIdG1sJDEoZWRpdG9yLCAnPGltZyBzcmM9XCInICsgYmxvYkluZm8uYmxvYlVyaSgpICsgJ1wiPicsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhc3RlSHRtbCQxKGVkaXRvciwgJzxpbWcgc3JjPVwiJyArIGltYWdlSXRlbS51cmkgKyAnXCI+JywgZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGlzQ2xpcGJvYXJkRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHJldHVybiBldmVudC50eXBlID09PSAncGFzdGUnO1xuICAgIH07XG4gICAgdmFyIHJlYWRCbG9ic0FzRGF0YVVyaXMgPSBmdW5jdGlvbiAoaXRlbXMpIHtcbiAgICAgIHJldHVybiBnbG9iYWwkMy5hbGwobWFwKGl0ZW1zLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gbmV3IGdsb2JhbCQzKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgdmFyIGJsb2IgPSBpdGVtLmdldEFzRmlsZSA/IGl0ZW0uZ2V0QXNGaWxlKCkgOiBpdGVtO1xuICAgICAgICAgIHZhciByZWFkZXIgPSBuZXcgd2luZG93LkZpbGVSZWFkZXIoKTtcbiAgICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgIGJsb2I6IGJsb2IsXG4gICAgICAgICAgICAgIHVyaTogcmVhZGVyLnJlc3VsdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChibG9iKTtcbiAgICAgICAgfSk7XG4gICAgICB9KSk7XG4gICAgfTtcbiAgICB2YXIgZ2V0SW1hZ2VzRnJvbURhdGFUcmFuc2ZlciA9IGZ1bmN0aW9uIChkYXRhVHJhbnNmZXIpIHtcbiAgICAgIHZhciBpdGVtcyA9IGRhdGFUcmFuc2Zlci5pdGVtcyA/IG1hcChmcm9tJDEoZGF0YVRyYW5zZmVyLml0ZW1zKSwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uZ2V0QXNGaWxlKCk7XG4gICAgICB9KSA6IFtdO1xuICAgICAgdmFyIGZpbGVzID0gZGF0YVRyYW5zZmVyLmZpbGVzID8gZnJvbSQxKGRhdGFUcmFuc2Zlci5maWxlcykgOiBbXTtcbiAgICAgIHZhciBpbWFnZXMgPSBmaWx0ZXIoaXRlbXMubGVuZ3RoID4gMCA/IGl0ZW1zIDogZmlsZXMsIGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgIHJldHVybiAvXmltYWdlXFwvKGpwZWd8cG5nfGdpZnxibXApJC8udGVzdChmaWxlLnR5cGUpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gaW1hZ2VzO1xuICAgIH07XG4gICAgdmFyIHBhc3RlSW1hZ2VEYXRhID0gZnVuY3Rpb24gKGVkaXRvciwgZSwgcm5nKSB7XG4gICAgICB2YXIgZGF0YVRyYW5zZmVyID0gaXNDbGlwYm9hcmRFdmVudChlKSA/IGUuY2xpcGJvYXJkRGF0YSA6IGUuZGF0YVRyYW5zZmVyO1xuICAgICAgaWYgKGdldFBhc3RlRGF0YUltYWdlcyhlZGl0b3IpICYmIGRhdGFUcmFuc2Zlcikge1xuICAgICAgICB2YXIgaW1hZ2VzID0gZ2V0SW1hZ2VzRnJvbURhdGFUcmFuc2ZlcihkYXRhVHJhbnNmZXIpO1xuICAgICAgICBpZiAoaW1hZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgcmVhZEJsb2JzQXNEYXRhVXJpcyhpbWFnZXMpLnRoZW4oZnVuY3Rpb24gKGJsb2JSZXN1bHRzKSB7XG4gICAgICAgICAgICBpZiAocm5nKSB7XG4gICAgICAgICAgICAgIGVkaXRvci5zZWxlY3Rpb24uc2V0Um5nKHJuZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlYWNoKGJsb2JSZXN1bHRzLCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgIHBhc3RlSW1hZ2UoZWRpdG9yLCByZXN1bHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIHZhciBpc0Jyb2tlbkFuZHJvaWRDbGlwYm9hcmRFdmVudCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICB2YXIgY2xpcGJvYXJkRGF0YSA9IGUuY2xpcGJvYXJkRGF0YTtcbiAgICAgIHJldHVybiBkb21HbG9iYWxzLm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQW5kcm9pZCcpICE9PSAtMSAmJiBjbGlwYm9hcmREYXRhICYmIGNsaXBib2FyZERhdGEuaXRlbXMgJiYgY2xpcGJvYXJkRGF0YS5pdGVtcy5sZW5ndGggPT09IDA7XG4gICAgfTtcbiAgICB2YXIgaXNLZXlib2FyZFBhc3RlRXZlbnQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIGdsb2JhbCQ0Lm1ldGFLZXlQcmVzc2VkKGUpICYmIGUua2V5Q29kZSA9PT0gODYgfHwgZS5zaGlmdEtleSAmJiBlLmtleUNvZGUgPT09IDQ1O1xuICAgIH07XG4gICAgdmFyIHJlZ2lzdGVyRXZlbnRIYW5kbGVycyA9IGZ1bmN0aW9uIChlZGl0b3IsIHBhc3RlQmluLCBwYXN0ZUZvcm1hdCkge1xuICAgICAgdmFyIGtleWJvYXJkUGFzdGVFdmVudCA9IHZhbHVlKCk7XG4gICAgICB2YXIga2V5Ym9hcmRQYXN0ZVBsYWluVGV4dFN0YXRlO1xuICAgICAgZWRpdG9yLm9uKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZnVuY3Rpb24gcmVtb3ZlUGFzdGVCaW5PbktleVVwKGUpIHtcbiAgICAgICAgICBpZiAoaXNLZXlib2FyZFBhc3RlRXZlbnQoZSkgJiYgIWUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICAgIHBhc3RlQmluLnJlbW92ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNLZXlib2FyZFBhc3RlRXZlbnQoZSkgJiYgIWUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgICAgICBrZXlib2FyZFBhc3RlUGxhaW5UZXh0U3RhdGUgPSBlLnNoaWZ0S2V5ICYmIGUua2V5Q29kZSA9PT0gODY7XG4gICAgICAgICAgaWYgKGtleWJvYXJkUGFzdGVQbGFpblRleHRTdGF0ZSAmJiBnbG9iYWwkMS53ZWJraXQgJiYgZG9tR2xvYmFscy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ1ZlcnNpb24vJykgIT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAga2V5Ym9hcmRQYXN0ZUV2ZW50LnNldChlKTtcbiAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBrZXlib2FyZFBhc3RlRXZlbnQuY2xlYXIoKTtcbiAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgIGlmIChnbG9iYWwkMS5pZSAmJiBrZXlib2FyZFBhc3RlUGxhaW5UZXh0U3RhdGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGZpcmVQYXN0ZShlZGl0b3IsIHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwYXN0ZUJpbi5yZW1vdmUoKTtcbiAgICAgICAgICBwYXN0ZUJpbi5jcmVhdGUoKTtcbiAgICAgICAgICBlZGl0b3Iub25jZSgna2V5dXAnLCByZW1vdmVQYXN0ZUJpbk9uS2V5VXApO1xuICAgICAgICAgIGVkaXRvci5vbmNlKCdwYXN0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGVkaXRvci5vZmYoJ2tleXVwJywgcmVtb3ZlUGFzdGVCaW5PbktleVVwKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBmdW5jdGlvbiBpbnNlcnRDbGlwYm9hcmRDb250ZW50KGNsaXBib2FyZENvbnRlbnQsIGlzS2V5Qm9hcmRQYXN0ZSwgcGxhaW5UZXh0TW9kZSwgaW50ZXJuYWwpIHtcbiAgICAgICAgdmFyIGNvbnRlbnQ7XG4gICAgICAgIGlmIChoYXNDb250ZW50VHlwZShjbGlwYm9hcmRDb250ZW50LCAndGV4dC9odG1sJykpIHtcbiAgICAgICAgICBjb250ZW50ID0gY2xpcGJvYXJkQ29udGVudFsndGV4dC9odG1sJ107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29udGVudCA9IHBhc3RlQmluLmdldEh0bWwoKTtcbiAgICAgICAgICBpbnRlcm5hbCA9IGludGVybmFsID8gaW50ZXJuYWwgOiBpc01hcmtlZChjb250ZW50KTtcbiAgICAgICAgICBpZiAocGFzdGVCaW4uaXNEZWZhdWx0Q29udGVudChjb250ZW50KSkge1xuICAgICAgICAgICAgcGxhaW5UZXh0TW9kZSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnRlbnQgPSB0cmltSHRtbChjb250ZW50KTtcbiAgICAgICAgcGFzdGVCaW4ucmVtb3ZlKCk7XG4gICAgICAgIHZhciBpc1BsYWluVGV4dEh0bWwgPSBpbnRlcm5hbCA9PT0gZmFsc2UgJiYgaXNQbGFpblRleHQoY29udGVudCk7XG4gICAgICAgIHZhciBpc0ltYWdlID0gaXNJbWFnZVVybChjb250ZW50KTtcbiAgICAgICAgaWYgKCFjb250ZW50Lmxlbmd0aCB8fCBpc1BsYWluVGV4dEh0bWwgJiYgIWlzSW1hZ2UpIHtcbiAgICAgICAgICBwbGFpblRleHRNb2RlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGxhaW5UZXh0TW9kZSB8fCBpc0ltYWdlKSB7XG4gICAgICAgICAgaWYgKGhhc0NvbnRlbnRUeXBlKGNsaXBib2FyZENvbnRlbnQsICd0ZXh0L3BsYWluJykgJiYgaXNQbGFpblRleHRIdG1sKSB7XG4gICAgICAgICAgICBjb250ZW50ID0gY2xpcGJvYXJkQ29udGVudFsndGV4dC9wbGFpbiddO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250ZW50ID0gaW5uZXJUZXh0KGNvbnRlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocGFzdGVCaW4uaXNEZWZhdWx0Q29udGVudChjb250ZW50KSkge1xuICAgICAgICAgIGlmICghaXNLZXlCb2FyZFBhc3RlKSB7XG4gICAgICAgICAgICBlZGl0b3Iud2luZG93TWFuYWdlci5hbGVydCgnUGxlYXNlIHVzZSBDdHJsK1YvQ21kK1Yga2V5Ym9hcmQgc2hvcnRjdXRzIHRvIHBhc3RlIGNvbnRlbnRzLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBsYWluVGV4dE1vZGUpIHtcbiAgICAgICAgICBwYXN0ZVRleHQoZWRpdG9yLCBjb250ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYXN0ZUh0bWwkMShlZGl0b3IsIGNvbnRlbnQsIGludGVybmFsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIGdldExhc3RSbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBwYXN0ZUJpbi5nZXRMYXN0Um5nKCkgfHwgZWRpdG9yLnNlbGVjdGlvbi5nZXRSbmcoKTtcbiAgICAgIH07XG4gICAgICBlZGl0b3Iub24oJ3Bhc3RlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIGlzS2V5Qm9hcmRQYXN0ZSA9IGtleWJvYXJkUGFzdGVFdmVudC5pc1NldCgpO1xuICAgICAgICB2YXIgY2xpcGJvYXJkQ29udGVudCA9IGdldENsaXBib2FyZENvbnRlbnQoZWRpdG9yLCBlKTtcbiAgICAgICAgdmFyIHBsYWluVGV4dE1vZGUgPSBwYXN0ZUZvcm1hdC5nZXQoKSA9PT0gJ3RleHQnIHx8IGtleWJvYXJkUGFzdGVQbGFpblRleHRTdGF0ZTtcbiAgICAgICAgdmFyIGludGVybmFsID0gaGFzQ29udGVudFR5cGUoY2xpcGJvYXJkQ29udGVudCwgaW50ZXJuYWxIdG1sTWltZSgpKTtcbiAgICAgICAga2V5Ym9hcmRQYXN0ZVBsYWluVGV4dFN0YXRlID0gZmFsc2U7XG4gICAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpIHx8IGlzQnJva2VuQW5kcm9pZENsaXBib2FyZEV2ZW50KGUpKSB7XG4gICAgICAgICAgcGFzdGVCaW4ucmVtb3ZlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaGFzSHRtbE9yVGV4dChjbGlwYm9hcmRDb250ZW50KSAmJiBwYXN0ZUltYWdlRGF0YShlZGl0b3IsIGUsIGdldExhc3RSbmcoKSkpIHtcbiAgICAgICAgICBwYXN0ZUJpbi5yZW1vdmUoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc0tleUJvYXJkUGFzdGUpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdsb2JhbCQxLmllICYmICghaXNLZXlCb2FyZFBhc3RlIHx8IGUuaWVGYWtlKSAmJiAhaGFzQ29udGVudFR5cGUoY2xpcGJvYXJkQ29udGVudCwgJ3RleHQvaHRtbCcpKSB7XG4gICAgICAgICAgcGFzdGVCaW4uY3JlYXRlKCk7XG4gICAgICAgICAgZWRpdG9yLmRvbS5iaW5kKHBhc3RlQmluLmdldEVsKCksICdwYXN0ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGVkaXRvci5nZXREb2MoKS5leGVjQ29tbWFuZCgnUGFzdGUnLCBmYWxzZSwgbnVsbCk7XG4gICAgICAgICAgY2xpcGJvYXJkQ29udGVudFsndGV4dC9odG1sJ10gPSBwYXN0ZUJpbi5nZXRIdG1sKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc0NvbnRlbnRUeXBlKGNsaXBib2FyZENvbnRlbnQsICd0ZXh0L2h0bWwnKSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBpZiAoIWludGVybmFsKSB7XG4gICAgICAgICAgICBpbnRlcm5hbCA9IGlzTWFya2VkKGNsaXBib2FyZENvbnRlbnRbJ3RleHQvaHRtbCddKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaW5zZXJ0Q2xpcGJvYXJkQ29udGVudChjbGlwYm9hcmRDb250ZW50LCBpc0tleUJvYXJkUGFzdGUsIHBsYWluVGV4dE1vZGUsIGludGVybmFsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBnbG9iYWwkMi5zZXRFZGl0b3JUaW1lb3V0KGVkaXRvciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaW5zZXJ0Q2xpcGJvYXJkQ29udGVudChjbGlwYm9hcmRDb250ZW50LCBpc0tleUJvYXJkUGFzdGUsIHBsYWluVGV4dE1vZGUsIGludGVybmFsKTtcbiAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgcmVnaXN0ZXJFdmVudHNBbmRGaWx0ZXJzID0gZnVuY3Rpb24gKGVkaXRvciwgcGFzdGVCaW4sIHBhc3RlRm9ybWF0KSB7XG4gICAgICByZWdpc3RlckV2ZW50SGFuZGxlcnMoZWRpdG9yLCBwYXN0ZUJpbiwgcGFzdGVGb3JtYXQpO1xuICAgICAgdmFyIHNyYztcbiAgICAgIGVkaXRvci5wYXJzZXIuYWRkTm9kZUZpbHRlcignaW1nJywgZnVuY3Rpb24gKG5vZGVzLCBuYW1lLCBhcmdzKSB7XG4gICAgICAgIHZhciBpc1Bhc3RlSW5zZXJ0ID0gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgICByZXR1cm4gYXJncy5kYXRhICYmIGFyZ3MuZGF0YS5wYXN0ZSA9PT0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHJlbW92ZSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgaWYgKCFub2RlLmF0dHIoJ2RhdGEtbWNlLW9iamVjdCcpICYmIHNyYyAhPT0gZ2xvYmFsJDEudHJhbnNwYXJlbnRTcmMpIHtcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB2YXIgaXNXZWJLaXRGYWtlVXJsID0gZnVuY3Rpb24gKHNyYykge1xuICAgICAgICAgIHJldHVybiBzcmMuaW5kZXhPZignd2Via2l0LWZha2UtdXJsJykgPT09IDA7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBpc0RhdGFVcmkgPSBmdW5jdGlvbiAoc3JjKSB7XG4gICAgICAgICAgcmV0dXJuIHNyYy5pbmRleE9mKCdkYXRhOicpID09PSAwO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoIWdldFBhc3RlRGF0YUltYWdlcyhlZGl0b3IpICYmIGlzUGFzdGVJbnNlcnQoYXJncykpIHtcbiAgICAgICAgICB2YXIgaSA9IG5vZGVzLmxlbmd0aDtcbiAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICBzcmMgPSBub2Rlc1tpXS5hdHRyKCdzcmMnKTtcbiAgICAgICAgICAgIGlmICghc3JjKSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzV2ViS2l0RmFrZVVybChzcmMpKSB7XG4gICAgICAgICAgICAgIHJlbW92ZShub2Rlc1tpXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFnZXRBbGxvd0h0bWxEYXRhVXJscyhlZGl0b3IpICYmIGlzRGF0YVVyaShzcmMpKSB7XG4gICAgICAgICAgICAgIHJlbW92ZShub2Rlc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIGdldFBhc3RlQmluUGFyZW50ID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGdsb2JhbCQxLmllICYmIGVkaXRvci5pbmxpbmUgPyBkb21HbG9iYWxzLmRvY3VtZW50LmJvZHkgOiBlZGl0b3IuZ2V0Qm9keSgpO1xuICAgIH07XG4gICAgdmFyIGlzRXh0ZXJuYWxQYXN0ZUJpbiA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBnZXRQYXN0ZUJpblBhcmVudChlZGl0b3IpICE9PSBlZGl0b3IuZ2V0Qm9keSgpO1xuICAgIH07XG4gICAgdmFyIGRlbGVnYXRlUGFzdGVFdmVudHMgPSBmdW5jdGlvbiAoZWRpdG9yLCBwYXN0ZUJpbkVsbSwgcGFzdGVCaW5EZWZhdWx0Q29udGVudCkge1xuICAgICAgaWYgKGlzRXh0ZXJuYWxQYXN0ZUJpbihlZGl0b3IpKSB7XG4gICAgICAgIGVkaXRvci5kb20uYmluZChwYXN0ZUJpbkVsbSwgJ3Bhc3RlIGtleXVwJywgZnVuY3Rpb24gKF9lKSB7XG4gICAgICAgICAgaWYgKCFpc0RlZmF1bHQoZWRpdG9yLCBwYXN0ZUJpbkRlZmF1bHRDb250ZW50KSkge1xuICAgICAgICAgICAgZWRpdG9yLmZpcmUoJ3Bhc3RlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBjcmVhdGUgPSBmdW5jdGlvbiAoZWRpdG9yLCBsYXN0Um5nQ2VsbCwgcGFzdGVCaW5EZWZhdWx0Q29udGVudCkge1xuICAgICAgdmFyIGRvbSA9IGVkaXRvci5kb20sIGJvZHkgPSBlZGl0b3IuZ2V0Qm9keSgpO1xuICAgICAgbGFzdFJuZ0NlbGwuc2V0KGVkaXRvci5zZWxlY3Rpb24uZ2V0Um5nKCkpO1xuICAgICAgdmFyIHBhc3RlQmluRWxtID0gZWRpdG9yLmRvbS5hZGQoZ2V0UGFzdGVCaW5QYXJlbnQoZWRpdG9yKSwgJ2RpdicsIHtcbiAgICAgICAgJ2lkJzogJ21jZXBhc3RlYmluJyxcbiAgICAgICAgJ2NsYXNzJzogJ21jZS1wYXN0ZWJpbicsXG4gICAgICAgICdjb250ZW50RWRpdGFibGUnOiB0cnVlLFxuICAgICAgICAnZGF0YS1tY2UtYm9ndXMnOiAnYWxsJyxcbiAgICAgICAgJ3N0eWxlJzogJ3Bvc2l0aW9uOiBmaXhlZDsgdG9wOiA1MCU7IHdpZHRoOiAxMHB4OyBoZWlnaHQ6IDEwcHg7IG92ZXJmbG93OiBoaWRkZW47IG9wYWNpdHk6IDAnXG4gICAgICB9LCBwYXN0ZUJpbkRlZmF1bHRDb250ZW50KTtcbiAgICAgIGlmIChnbG9iYWwkMS5pZSB8fCBnbG9iYWwkMS5nZWNrbykge1xuICAgICAgICBkb20uc2V0U3R5bGUocGFzdGVCaW5FbG0sICdsZWZ0JywgZG9tLmdldFN0eWxlKGJvZHksICdkaXJlY3Rpb24nLCB0cnVlKSA9PT0gJ3J0bCcgPyA2NTUzNSA6IC02NTUzNSk7XG4gICAgICB9XG4gICAgICBkb20uYmluZChwYXN0ZUJpbkVsbSwgJ2JlZm9yZWRlYWN0aXZhdGUgZm9jdXNpbiBmb2N1c291dCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9KTtcbiAgICAgIGRlbGVnYXRlUGFzdGVFdmVudHMoZWRpdG9yLCBwYXN0ZUJpbkVsbSwgcGFzdGVCaW5EZWZhdWx0Q29udGVudCk7XG4gICAgICBwYXN0ZUJpbkVsbS5mb2N1cygpO1xuICAgICAgZWRpdG9yLnNlbGVjdGlvbi5zZWxlY3QocGFzdGVCaW5FbG0sIHRydWUpO1xuICAgIH07XG4gICAgdmFyIHJlbW92ZSA9IGZ1bmN0aW9uIChlZGl0b3IsIGxhc3RSbmdDZWxsKSB7XG4gICAgICBpZiAoZ2V0RWwoZWRpdG9yKSkge1xuICAgICAgICB2YXIgcGFzdGVCaW5DbG9uZSA9IHZvaWQgMDtcbiAgICAgICAgdmFyIGxhc3RSbmcgPSBsYXN0Um5nQ2VsbC5nZXQoKTtcbiAgICAgICAgd2hpbGUgKHBhc3RlQmluQ2xvbmUgPSBlZGl0b3IuZG9tLmdldCgnbWNlcGFzdGViaW4nKSkge1xuICAgICAgICAgIGVkaXRvci5kb20ucmVtb3ZlKHBhc3RlQmluQ2xvbmUpO1xuICAgICAgICAgIGVkaXRvci5kb20udW5iaW5kKHBhc3RlQmluQ2xvbmUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYXN0Um5nKSB7XG4gICAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5zZXRSbmcobGFzdFJuZyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxhc3RSbmdDZWxsLnNldChudWxsKTtcbiAgICB9O1xuICAgIHZhciBnZXRFbCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZG9tLmdldCgnbWNlcGFzdGViaW4nKTtcbiAgICB9O1xuICAgIHZhciBnZXRIdG1sID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGNvcHlBbmRSZW1vdmUgPSBmdW5jdGlvbiAodG9FbG0sIGZyb21FbG0pIHtcbiAgICAgICAgdG9FbG0uYXBwZW5kQ2hpbGQoZnJvbUVsbSk7XG4gICAgICAgIGVkaXRvci5kb20ucmVtb3ZlKGZyb21FbG0sIHRydWUpO1xuICAgICAgfTtcbiAgICAgIHZhciBwYXN0ZUJpbkNsb25lcyA9IGdsb2JhbCQ1LmdyZXAoZ2V0UGFzdGVCaW5QYXJlbnQoZWRpdG9yKS5jaGlsZE5vZGVzLCBmdW5jdGlvbiAoZWxtKSB7XG4gICAgICAgIHJldHVybiBlbG0uaWQgPT09ICdtY2VwYXN0ZWJpbic7XG4gICAgICB9KTtcbiAgICAgIHZhciBwYXN0ZUJpbkVsbSA9IHBhc3RlQmluQ2xvbmVzLnNoaWZ0KCk7XG4gICAgICBnbG9iYWwkNS5lYWNoKHBhc3RlQmluQ2xvbmVzLCBmdW5jdGlvbiAocGFzdGVCaW5DbG9uZSkge1xuICAgICAgICBjb3B5QW5kUmVtb3ZlKHBhc3RlQmluRWxtLCBwYXN0ZUJpbkNsb25lKTtcbiAgICAgIH0pO1xuICAgICAgdmFyIGRpcnR5V3JhcHBlcnMgPSBlZGl0b3IuZG9tLnNlbGVjdCgnZGl2W2lkPW1jZXBhc3RlYmluXScsIHBhc3RlQmluRWxtKTtcbiAgICAgIGZvciAodmFyIGkgPSBkaXJ0eVdyYXBwZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHZhciBjbGVhbldyYXBwZXIgPSBlZGl0b3IuZG9tLmNyZWF0ZSgnZGl2Jyk7XG4gICAgICAgIHBhc3RlQmluRWxtLmluc2VydEJlZm9yZShjbGVhbldyYXBwZXIsIGRpcnR5V3JhcHBlcnNbaV0pO1xuICAgICAgICBjb3B5QW5kUmVtb3ZlKGNsZWFuV3JhcHBlciwgZGlydHlXcmFwcGVyc1tpXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcGFzdGVCaW5FbG0gPyBwYXN0ZUJpbkVsbS5pbm5lckhUTUwgOiAnJztcbiAgICB9O1xuICAgIHZhciBnZXRMYXN0Um5nID0gZnVuY3Rpb24gKGxhc3RSbmcpIHtcbiAgICAgIHJldHVybiBsYXN0Um5nLmdldCgpO1xuICAgIH07XG4gICAgdmFyIGlzRGVmYXVsdENvbnRlbnQgPSBmdW5jdGlvbiAocGFzdGVCaW5EZWZhdWx0Q29udGVudCwgY29udGVudCkge1xuICAgICAgcmV0dXJuIGNvbnRlbnQgPT09IHBhc3RlQmluRGVmYXVsdENvbnRlbnQ7XG4gICAgfTtcbiAgICB2YXIgaXNQYXN0ZUJpbiA9IGZ1bmN0aW9uIChlbG0pIHtcbiAgICAgIHJldHVybiBlbG0gJiYgZWxtLmlkID09PSAnbWNlcGFzdGViaW4nO1xuICAgIH07XG4gICAgdmFyIGlzRGVmYXVsdCA9IGZ1bmN0aW9uIChlZGl0b3IsIHBhc3RlQmluRGVmYXVsdENvbnRlbnQpIHtcbiAgICAgIHZhciBwYXN0ZUJpbkVsbSA9IGdldEVsKGVkaXRvcik7XG4gICAgICByZXR1cm4gaXNQYXN0ZUJpbihwYXN0ZUJpbkVsbSkgJiYgaXNEZWZhdWx0Q29udGVudChwYXN0ZUJpbkRlZmF1bHRDb250ZW50LCBwYXN0ZUJpbkVsbS5pbm5lckhUTUwpO1xuICAgIH07XG4gICAgdmFyIFBhc3RlQmluID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGxhc3RSbmcgPSBDZWxsKG51bGwpO1xuICAgICAgdmFyIHBhc3RlQmluRGVmYXVsdENvbnRlbnQgPSAnJU1DRVBBU1RFQklOJSc7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gY3JlYXRlKGVkaXRvciwgbGFzdFJuZywgcGFzdGVCaW5EZWZhdWx0Q29udGVudCk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiByZW1vdmUoZWRpdG9yLCBsYXN0Um5nKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0RWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0RWwoZWRpdG9yKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0SHRtbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBnZXRIdG1sKGVkaXRvcik7XG4gICAgICAgIH0sXG4gICAgICAgIGdldExhc3RSbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0TGFzdFJuZyhsYXN0Um5nKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNEZWZhdWx0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGlzRGVmYXVsdChlZGl0b3IsIHBhc3RlQmluRGVmYXVsdENvbnRlbnQpO1xuICAgICAgICB9LFxuICAgICAgICBpc0RlZmF1bHRDb250ZW50OiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgICAgIHJldHVybiBpc0RlZmF1bHRDb250ZW50KHBhc3RlQmluRGVmYXVsdENvbnRlbnQsIGNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgQ2xpcGJvYXJkID0gZnVuY3Rpb24gKGVkaXRvciwgcGFzdGVGb3JtYXQpIHtcbiAgICAgIHZhciBwYXN0ZUJpbiA9IFBhc3RlQmluKGVkaXRvcik7XG4gICAgICBlZGl0b3Iub24oJ1ByZUluaXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByZWdpc3RlckV2ZW50c0FuZEZpbHRlcnMoZWRpdG9yLCBwYXN0ZUJpbiwgcGFzdGVGb3JtYXQpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXN0ZUZvcm1hdDogcGFzdGVGb3JtYXQsXG4gICAgICAgIHBhc3RlSHRtbDogZnVuY3Rpb24gKGh0bWwsIGludGVybmFsRmxhZykge1xuICAgICAgICAgIHJldHVybiBwYXN0ZUh0bWwkMShlZGl0b3IsIGh0bWwsIGludGVybmFsRmxhZyk7XG4gICAgICAgIH0sXG4gICAgICAgIHBhc3RlVGV4dDogZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgICByZXR1cm4gcGFzdGVUZXh0KGVkaXRvciwgdGV4dCk7XG4gICAgICAgIH0sXG4gICAgICAgIHBhc3RlSW1hZ2VEYXRhOiBmdW5jdGlvbiAoZSwgcm5nKSB7XG4gICAgICAgICAgcmV0dXJuIHBhc3RlSW1hZ2VEYXRhKGVkaXRvciwgZSwgcm5nKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0RGF0YVRyYW5zZmVySXRlbXM6IGdldERhdGFUcmFuc2Zlckl0ZW1zLFxuICAgICAgICBoYXNIdG1sT3JUZXh0OiBoYXNIdG1sT3JUZXh0LFxuICAgICAgICBoYXNDb250ZW50VHlwZTogaGFzQ29udGVudFR5cGVcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciBoYXNXb3JraW5nQ2xpcGJvYXJkQXBpID0gZnVuY3Rpb24gKGNsaXBib2FyZERhdGEpIHtcbiAgICAgIHJldHVybiBnbG9iYWwkMS5pT1MgPT09IGZhbHNlICYmIHR5cGVvZiAoY2xpcGJvYXJkRGF0YSA9PT0gbnVsbCB8fCBjbGlwYm9hcmREYXRhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjbGlwYm9hcmREYXRhLnNldERhdGEpID09PSAnZnVuY3Rpb24nO1xuICAgIH07XG4gICAgdmFyIHNldEh0bWw1Q2xpcGJvYXJkID0gZnVuY3Rpb24gKGNsaXBib2FyZERhdGEsIGh0bWwsIHRleHQpIHtcbiAgICAgIGlmIChoYXNXb3JraW5nQ2xpcGJvYXJkQXBpKGNsaXBib2FyZERhdGEpKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY2xpcGJvYXJkRGF0YS5jbGVhckRhdGEoKTtcbiAgICAgICAgICBjbGlwYm9hcmREYXRhLnNldERhdGEoJ3RleHQvaHRtbCcsIGh0bWwpO1xuICAgICAgICAgIGNsaXBib2FyZERhdGEuc2V0RGF0YSgndGV4dC9wbGFpbicsIHRleHQpO1xuICAgICAgICAgIGNsaXBib2FyZERhdGEuc2V0RGF0YShpbnRlcm5hbEh0bWxNaW1lKCksIGh0bWwpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgc2V0Q2xpcGJvYXJkRGF0YSA9IGZ1bmN0aW9uIChldnQsIGRhdGEsIGZhbGxiYWNrLCBkb25lKSB7XG4gICAgICBpZiAoc2V0SHRtbDVDbGlwYm9hcmQoZXZ0LmNsaXBib2FyZERhdGEsIGRhdGEuaHRtbCwgZGF0YS50ZXh0KSkge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmFsbGJhY2soZGF0YS5odG1sLCBkb25lKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBmYWxsYmFjayA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoaHRtbCwgZG9uZSkge1xuICAgICAgICB2YXIgbWFya2VkSHRtbCA9IG1hcmsoaHRtbCk7XG4gICAgICAgIHZhciBvdXRlciA9IGVkaXRvci5kb20uY3JlYXRlKCdkaXYnLCB7XG4gICAgICAgICAgJ2NvbnRlbnRlZGl0YWJsZSc6ICdmYWxzZScsXG4gICAgICAgICAgJ2RhdGEtbWNlLWJvZ3VzJzogJ2FsbCdcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBpbm5lciA9IGVkaXRvci5kb20uY3JlYXRlKCdkaXYnLCB7IGNvbnRlbnRlZGl0YWJsZTogJ3RydWUnIH0sIG1hcmtlZEh0bWwpO1xuICAgICAgICBlZGl0b3IuZG9tLnNldFN0eWxlcyhvdXRlciwge1xuICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgICAgIHRvcDogJzAnLFxuICAgICAgICAgIGxlZnQ6ICctMzAwMHB4JyxcbiAgICAgICAgICB3aWR0aDogJzEwMDBweCcsXG4gICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nXG4gICAgICAgIH0pO1xuICAgICAgICBvdXRlci5hcHBlbmRDaGlsZChpbm5lcik7XG4gICAgICAgIGVkaXRvci5kb20uYWRkKGVkaXRvci5nZXRCb2R5KCksIG91dGVyKTtcbiAgICAgICAgdmFyIHJhbmdlID0gZWRpdG9yLnNlbGVjdGlvbi5nZXRSbmcoKTtcbiAgICAgICAgaW5uZXIuZm9jdXMoKTtcbiAgICAgICAgdmFyIG9mZnNjcmVlblJhbmdlID0gZWRpdG9yLmRvbS5jcmVhdGVSbmcoKTtcbiAgICAgICAgb2Zmc2NyZWVuUmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKGlubmVyKTtcbiAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5zZXRSbmcob2Zmc2NyZWVuUmFuZ2UpO1xuICAgICAgICBnbG9iYWwkMi5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLnNldFJuZyhyYW5nZSk7XG4gICAgICAgICAgb3V0ZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvdXRlcik7XG4gICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9LCAwKTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgZ2V0RGF0YSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGh0bWw6IGVkaXRvci5zZWxlY3Rpb24uZ2V0Q29udGVudCh7IGNvbnRleHR1YWw6IHRydWUgfSksXG4gICAgICAgIHRleHQ6IGVkaXRvci5zZWxlY3Rpb24uZ2V0Q29udGVudCh7IGZvcm1hdDogJ3RleHQnIH0pXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGlzVGFibGVTZWxlY3Rpb24gPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gISFlZGl0b3IuZG9tLmdldFBhcmVudChlZGl0b3Iuc2VsZWN0aW9uLmdldFN0YXJ0KCksICd0ZFtkYXRhLW1jZS1zZWxlY3RlZF0sdGhbZGF0YS1tY2Utc2VsZWN0ZWRdJywgZWRpdG9yLmdldEJvZHkoKSk7XG4gICAgfTtcbiAgICB2YXIgaGFzU2VsZWN0ZWRDb250ZW50ID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuICFlZGl0b3Iuc2VsZWN0aW9uLmlzQ29sbGFwc2VkKCkgfHwgaXNUYWJsZVNlbGVjdGlvbihlZGl0b3IpO1xuICAgIH07XG4gICAgdmFyIGN1dCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgIGlmIChoYXNTZWxlY3RlZENvbnRlbnQoZWRpdG9yKSkge1xuICAgICAgICAgIHNldENsaXBib2FyZERhdGEoZXZ0LCBnZXREYXRhKGVkaXRvciksIGZhbGxiYWNrKGVkaXRvciksIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChnbG9iYWwkMS5icm93c2VyLmlzQ2hyb21lKCkpIHtcbiAgICAgICAgICAgICAgdmFyIHJuZ18xID0gZWRpdG9yLnNlbGVjdGlvbi5nZXRSbmcoKTtcbiAgICAgICAgICAgICAgZ2xvYmFsJDIuc2V0RWRpdG9yVGltZW91dChlZGl0b3IsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLnNldFJuZyhybmdfMSk7XG4gICAgICAgICAgICAgICAgZWRpdG9yLmV4ZWNDb21tYW5kKCdEZWxldGUnKTtcbiAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlZGl0b3IuZXhlY0NvbW1hbmQoJ0RlbGV0ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGNvcHkgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICBpZiAoaGFzU2VsZWN0ZWRDb250ZW50KGVkaXRvcikpIHtcbiAgICAgICAgICBzZXRDbGlwYm9hcmREYXRhKGV2dCwgZ2V0RGF0YShlZGl0b3IpLCBmYWxsYmFjayhlZGl0b3IpLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgcmVnaXN0ZXIkMSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIGVkaXRvci5vbignY3V0JywgY3V0KGVkaXRvcikpO1xuICAgICAgZWRpdG9yLm9uKCdjb3B5JywgY29weShlZGl0b3IpKTtcbiAgICB9O1xuXG4gICAgdmFyIGdsb2JhbCRiID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuZG9tLlJhbmdlVXRpbHMnKTtcblxuICAgIHZhciBnZXRDYXJldFJhbmdlRnJvbUV2ZW50ID0gZnVuY3Rpb24gKGVkaXRvciwgZSkge1xuICAgICAgcmV0dXJuIGdsb2JhbCRiLmdldENhcmV0UmFuZ2VGcm9tUG9pbnQoZS5jbGllbnRYLCBlLmNsaWVudFksIGVkaXRvci5nZXREb2MoKSk7XG4gICAgfTtcbiAgICB2YXIgaXNQbGFpblRleHRGaWxlVXJsID0gZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgIHZhciBwbGFpblRleHRDb250ZW50ID0gY29udGVudFsndGV4dC9wbGFpbiddO1xuICAgICAgcmV0dXJuIHBsYWluVGV4dENvbnRlbnQgPyBwbGFpblRleHRDb250ZW50LmluZGV4T2YoJ2ZpbGU6Ly8nKSA9PT0gMCA6IGZhbHNlO1xuICAgIH07XG4gICAgdmFyIHNldEZvY3VzZWRSYW5nZSA9IGZ1bmN0aW9uIChlZGl0b3IsIHJuZykge1xuICAgICAgZWRpdG9yLmZvY3VzKCk7XG4gICAgICBlZGl0b3Iuc2VsZWN0aW9uLnNldFJuZyhybmcpO1xuICAgIH07XG4gICAgdmFyIHNldHVwID0gZnVuY3Rpb24gKGVkaXRvciwgY2xpcGJvYXJkLCBkcmFnZ2luZ0ludGVybmFsbHlTdGF0ZSkge1xuICAgICAgaWYgKHNob3VsZEJsb2NrRHJvcChlZGl0b3IpKSB7XG4gICAgICAgIGVkaXRvci5vbignZHJhZ2VuZCBkcmFnb3ZlciBkcmFnZ2VzdHVyZSBkcmFnZHJvcCBkcm9wIGRyYWcnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICghc2hvdWxkUGFzdGVEYXRhSW1hZ2VzKGVkaXRvcikpIHtcbiAgICAgICAgZWRpdG9yLm9uKCdkcm9wJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICB2YXIgZGF0YVRyYW5zZmVyID0gZS5kYXRhVHJhbnNmZXI7XG4gICAgICAgICAgaWYgKGRhdGFUcmFuc2ZlciAmJiBkYXRhVHJhbnNmZXIuZmlsZXMgJiYgZGF0YVRyYW5zZmVyLmZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZWRpdG9yLm9uKCdkcm9wJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIHJuZyA9IGdldENhcmV0UmFuZ2VGcm9tRXZlbnQoZWRpdG9yLCBlKTtcbiAgICAgICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkgfHwgZHJhZ2dpbmdJbnRlcm5hbGx5U3RhdGUuZ2V0KCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRyb3BDb250ZW50ID0gY2xpcGJvYXJkLmdldERhdGFUcmFuc2Zlckl0ZW1zKGUuZGF0YVRyYW5zZmVyKTtcbiAgICAgICAgdmFyIGludGVybmFsID0gY2xpcGJvYXJkLmhhc0NvbnRlbnRUeXBlKGRyb3BDb250ZW50LCBpbnRlcm5hbEh0bWxNaW1lKCkpO1xuICAgICAgICBpZiAoKCFjbGlwYm9hcmQuaGFzSHRtbE9yVGV4dChkcm9wQ29udGVudCkgfHwgaXNQbGFpblRleHRGaWxlVXJsKGRyb3BDb250ZW50KSkgJiYgY2xpcGJvYXJkLnBhc3RlSW1hZ2VEYXRhKGUsIHJuZykpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJuZyAmJiBzaG91bGRGaWx0ZXJEcm9wKGVkaXRvcikpIHtcbiAgICAgICAgICB2YXIgY29udGVudF8xID0gZHJvcENvbnRlbnRbJ21jZS1pbnRlcm5hbCddIHx8IGRyb3BDb250ZW50Wyd0ZXh0L2h0bWwnXSB8fCBkcm9wQ29udGVudFsndGV4dC9wbGFpbiddO1xuICAgICAgICAgIGlmIChjb250ZW50XzEpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGdsb2JhbCQyLnNldEVkaXRvclRpbWVvdXQoZWRpdG9yLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGVkaXRvci51bmRvTWFuYWdlci50cmFuc2FjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRyb3BDb250ZW50WydtY2UtaW50ZXJuYWwnXSkge1xuICAgICAgICAgICAgICAgICAgZWRpdG9yLmV4ZWNDb21tYW5kKCdEZWxldGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2V0Rm9jdXNlZFJhbmdlKGVkaXRvciwgcm5nKTtcbiAgICAgICAgICAgICAgICBjb250ZW50XzEgPSB0cmltSHRtbChjb250ZW50XzEpO1xuICAgICAgICAgICAgICAgIGlmICghZHJvcENvbnRlbnRbJ3RleHQvaHRtbCddKSB7XG4gICAgICAgICAgICAgICAgICBjbGlwYm9hcmQucGFzdGVUZXh0KGNvbnRlbnRfMSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGNsaXBib2FyZC5wYXN0ZUh0bWwoY29udGVudF8xLCBpbnRlcm5hbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBlZGl0b3Iub24oJ2RyYWdzdGFydCcsIGZ1bmN0aW9uIChfZSkge1xuICAgICAgICBkcmFnZ2luZ0ludGVybmFsbHlTdGF0ZS5zZXQodHJ1ZSk7XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci5vbignZHJhZ292ZXIgZHJhZ2VuZCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChzaG91bGRQYXN0ZURhdGFJbWFnZXMoZWRpdG9yKSAmJiBkcmFnZ2luZ0ludGVybmFsbHlTdGF0ZS5nZXQoKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgc2V0Rm9jdXNlZFJhbmdlKGVkaXRvciwgZ2V0Q2FyZXRSYW5nZUZyb21FdmVudChlZGl0b3IsIGUpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZS50eXBlID09PSAnZHJhZ2VuZCcpIHtcbiAgICAgICAgICBkcmFnZ2luZ0ludGVybmFsbHlTdGF0ZS5zZXQoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHNldHVwJDEgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgcGx1Z2luID0gZWRpdG9yLnBsdWdpbnMucGFzdGU7XG4gICAgICB2YXIgcHJlUHJvY2VzcyA9IGdldFByZVByb2Nlc3MoZWRpdG9yKTtcbiAgICAgIGlmIChwcmVQcm9jZXNzKSB7XG4gICAgICAgIGVkaXRvci5vbignUGFzdGVQcmVQcm9jZXNzJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBwcmVQcm9jZXNzLmNhbGwocGx1Z2luLCBwbHVnaW4sIGUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHZhciBwb3N0UHJvY2VzcyA9IGdldFBvc3RQcm9jZXNzKGVkaXRvcik7XG4gICAgICBpZiAocG9zdFByb2Nlc3MpIHtcbiAgICAgICAgZWRpdG9yLm9uKCdQYXN0ZVBvc3RQcm9jZXNzJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBwb3N0UHJvY2Vzcy5jYWxsKHBsdWdpbiwgcGx1Z2luLCBlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFkZFByZVByb2Nlc3NGaWx0ZXIoZWRpdG9yLCBmaWx0ZXJGdW5jKSB7XG4gICAgICBlZGl0b3Iub24oJ1Bhc3RlUHJlUHJvY2VzcycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUuY29udGVudCA9IGZpbHRlckZ1bmMoZWRpdG9yLCBlLmNvbnRlbnQsIGUuaW50ZXJuYWwsIGUud29yZENvbnRlbnQpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFkZFBvc3RQcm9jZXNzRmlsdGVyKGVkaXRvciwgZmlsdGVyRnVuYykge1xuICAgICAgZWRpdG9yLm9uKCdQYXN0ZVBvc3RQcm9jZXNzJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZmlsdGVyRnVuYyhlZGl0b3IsIGUubm9kZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVtb3ZlRXhwbG9yZXJCckVsZW1lbnRzQWZ0ZXJCbG9ja3MoZWRpdG9yLCBodG1sKSB7XG4gICAgICBpZiAoIWlzV29yZENvbnRlbnQoaHRtbCkpIHtcbiAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgICB9XG4gICAgICB2YXIgYmxvY2tFbGVtZW50cyA9IFtdO1xuICAgICAgZ2xvYmFsJDUuZWFjaChlZGl0b3Iuc2NoZW1hLmdldEJsb2NrRWxlbWVudHMoKSwgZnVuY3Rpb24gKGJsb2NrLCBibG9ja05hbWUpIHtcbiAgICAgICAgYmxvY2tFbGVtZW50cy5wdXNoKGJsb2NrTmFtZSk7XG4gICAgICB9KTtcbiAgICAgIHZhciBleHBsb3JlckJsb2Nrc1JlZ0V4cCA9IG5ldyBSZWdFeHAoJyg/Ojxicj4mbmJzcDtbXFxcXHNcXFxcclxcXFxuXSt8PGJyPikqKDxcXFxcLz8oJyArIGJsb2NrRWxlbWVudHMuam9pbignfCcpICsgJylbXj5dKj4pKD86PGJyPiZuYnNwO1tcXFxcc1xcXFxyXFxcXG5dK3w8YnI+KSonLCAnZycpO1xuICAgICAgaHRtbCA9IGZpbHRlciQxKGh0bWwsIFtbXG4gICAgICAgICAgZXhwbG9yZXJCbG9ja3NSZWdFeHAsXG4gICAgICAgICAgJyQxJ1xuICAgICAgICBdXSk7XG4gICAgICBodG1sID0gZmlsdGVyJDEoaHRtbCwgW1xuICAgICAgICBbXG4gICAgICAgICAgLzxicj48YnI+L2csXG4gICAgICAgICAgJzxCUj48QlI+J1xuICAgICAgICBdLFxuICAgICAgICBbXG4gICAgICAgICAgLzxicj4vZyxcbiAgICAgICAgICAnICdcbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgIC88QlI+PEJSPi9nLFxuICAgICAgICAgICc8YnI+J1xuICAgICAgICBdXG4gICAgICBdKTtcbiAgICAgIHJldHVybiBodG1sO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZW1vdmVXZWJLaXRTdHlsZXMoZWRpdG9yLCBjb250ZW50LCBpbnRlcm5hbCwgaXNXb3JkSHRtbCkge1xuICAgICAgaWYgKGlzV29yZEh0bWwgfHwgaW50ZXJuYWwpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgICB9XG4gICAgICB2YXIgd2ViS2l0U3R5bGVzU2V0dGluZyA9IGdldFdlYmtpdFN0eWxlcyhlZGl0b3IpO1xuICAgICAgdmFyIHdlYktpdFN0eWxlcztcbiAgICAgIGlmIChzaG91bGRSZW1vdmVXZWJLaXRTdHlsZXMoZWRpdG9yKSA9PT0gZmFsc2UgfHwgd2ViS2l0U3R5bGVzU2V0dGluZyA9PT0gJ2FsbCcpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgICB9XG4gICAgICBpZiAod2ViS2l0U3R5bGVzU2V0dGluZykge1xuICAgICAgICB3ZWJLaXRTdHlsZXMgPSB3ZWJLaXRTdHlsZXNTZXR0aW5nLnNwbGl0KC9bLCBdLyk7XG4gICAgICB9XG4gICAgICBpZiAod2ViS2l0U3R5bGVzKSB7XG4gICAgICAgIHZhciBkb21fMSA9IGVkaXRvci5kb20sIG5vZGVfMSA9IGVkaXRvci5zZWxlY3Rpb24uZ2V0Tm9kZSgpO1xuICAgICAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC8oPFtePl0rKSBzdHlsZT1cIihbXlwiXSopXCIoW14+XSo+KS9naSwgZnVuY3Rpb24gKGFsbCwgYmVmb3JlLCB2YWx1ZSwgYWZ0ZXIpIHtcbiAgICAgICAgICB2YXIgaW5wdXRTdHlsZXMgPSBkb21fMS5wYXJzZVN0eWxlKGRvbV8xLmRlY29kZSh2YWx1ZSkpO1xuICAgICAgICAgIHZhciBvdXRwdXRTdHlsZXMgPSB7fTtcbiAgICAgICAgICBpZiAod2ViS2l0U3R5bGVzID09PSAnbm9uZScpIHtcbiAgICAgICAgICAgIHJldHVybiBiZWZvcmUgKyBhZnRlcjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3ZWJLaXRTdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBpbnB1dFZhbHVlID0gaW5wdXRTdHlsZXNbd2ViS2l0U3R5bGVzW2ldXSwgY3VycmVudFZhbHVlID0gZG9tXzEuZ2V0U3R5bGUobm9kZV8xLCB3ZWJLaXRTdHlsZXNbaV0sIHRydWUpO1xuICAgICAgICAgICAgaWYgKC9jb2xvci8udGVzdCh3ZWJLaXRTdHlsZXNbaV0pKSB7XG4gICAgICAgICAgICAgIGlucHV0VmFsdWUgPSBkb21fMS50b0hleChpbnB1dFZhbHVlKTtcbiAgICAgICAgICAgICAgY3VycmVudFZhbHVlID0gZG9tXzEudG9IZXgoY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjdXJyZW50VmFsdWUgIT09IGlucHV0VmFsdWUpIHtcbiAgICAgICAgICAgICAgb3V0cHV0U3R5bGVzW3dlYktpdFN0eWxlc1tpXV0gPSBpbnB1dFZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBvdXRwdXRTdHlsZXMgPSBkb21fMS5zZXJpYWxpemVTdHlsZShvdXRwdXRTdHlsZXMsICdzcGFuJyk7XG4gICAgICAgICAgaWYgKG91dHB1dFN0eWxlcykge1xuICAgICAgICAgICAgcmV0dXJuIGJlZm9yZSArICcgc3R5bGU9XCInICsgb3V0cHV0U3R5bGVzICsgJ1wiJyArIGFmdGVyO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gYmVmb3JlICsgYWZ0ZXI7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZSgvKDxbXj5dKykgc3R5bGU9XCIoW15cIl0qKVwiKFtePl0qPikvZ2ksICckMSQzJyk7XG4gICAgICB9XG4gICAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC8oPFtePl0rKSBkYXRhLW1jZS1zdHlsZT1cIihbXlwiXSspXCIoW14+XSo+KS9naSwgZnVuY3Rpb24gKGFsbCwgYmVmb3JlLCB2YWx1ZSwgYWZ0ZXIpIHtcbiAgICAgICAgcmV0dXJuIGJlZm9yZSArICcgc3R5bGU9XCInICsgdmFsdWUgKyAnXCInICsgYWZ0ZXI7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH1cbiAgICBmdW5jdGlvbiByZW1vdmVVbmRlcmxpbmVBbmRGb250SW5BbmNob3IoZWRpdG9yLCByb290KSB7XG4gICAgICBlZGl0b3IuJCgnYScsIHJvb3QpLmZpbmQoJ2ZvbnQsdScpLmVhY2goZnVuY3Rpb24gKGksIG5vZGUpIHtcbiAgICAgICAgZWRpdG9yLmRvbS5yZW1vdmUobm9kZSwgdHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdmFyIHNldHVwJDIgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBpZiAoZ2xvYmFsJDEud2Via2l0KSB7XG4gICAgICAgIGFkZFByZVByb2Nlc3NGaWx0ZXIoZWRpdG9yLCByZW1vdmVXZWJLaXRTdHlsZXMpO1xuICAgICAgfVxuICAgICAgaWYgKGdsb2JhbCQxLmllKSB7XG4gICAgICAgIGFkZFByZVByb2Nlc3NGaWx0ZXIoZWRpdG9yLCByZW1vdmVFeHBsb3JlckJyRWxlbWVudHNBZnRlckJsb2Nrcyk7XG4gICAgICAgIGFkZFBvc3RQcm9jZXNzRmlsdGVyKGVkaXRvciwgcmVtb3ZlVW5kZXJsaW5lQW5kRm9udEluQW5jaG9yKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIG1ha2VTZXR1cEhhbmRsZXIgPSBmdW5jdGlvbiAoZWRpdG9yLCBjbGlwYm9hcmQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYXBpKSB7XG4gICAgICAgIGFwaS5zZXRBY3RpdmUoY2xpcGJvYXJkLnBhc3RlRm9ybWF0LmdldCgpID09PSAndGV4dCcpO1xuICAgICAgICB2YXIgcGFzdGVQbGFpblRleHRUb2dnbGVIYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICByZXR1cm4gYXBpLnNldEFjdGl2ZShlLnN0YXRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgZWRpdG9yLm9uKCdQYXN0ZVBsYWluVGV4dFRvZ2dsZScsIHBhc3RlUGxhaW5UZXh0VG9nZ2xlSGFuZGxlcik7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci5vZmYoJ1Bhc3RlUGxhaW5UZXh0VG9nZ2xlJywgcGFzdGVQbGFpblRleHRUb2dnbGVIYW5kbGVyKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgcmVnaXN0ZXIkMiA9IGZ1bmN0aW9uIChlZGl0b3IsIGNsaXBib2FyZCkge1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZFRvZ2dsZUJ1dHRvbigncGFzdGV0ZXh0Jywge1xuICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICBpY29uOiAncGFzdGUtdGV4dCcsXG4gICAgICAgIHRvb2x0aXA6ICdQYXN0ZSBhcyB0ZXh0JyxcbiAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZWRpdG9yLmV4ZWNDb21tYW5kKCdtY2VUb2dnbGVQbGFpblRleHRQYXN0ZScpO1xuICAgICAgICB9LFxuICAgICAgICBvblNldHVwOiBtYWtlU2V0dXBIYW5kbGVyKGVkaXRvciwgY2xpcGJvYXJkKVxuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkVG9nZ2xlTWVudUl0ZW0oJ3Bhc3RldGV4dCcsIHtcbiAgICAgICAgdGV4dDogJ1Bhc3RlIGFzIHRleHQnLFxuICAgICAgICBpY29uOiAncGFzdGUtdGV4dCcsXG4gICAgICAgIG9uQWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci5leGVjQ29tbWFuZCgnbWNlVG9nZ2xlUGxhaW5UZXh0UGFzdGUnKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TZXR1cDogbWFrZVNldHVwSGFuZGxlcihlZGl0b3IsIGNsaXBib2FyZClcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBQbHVnaW4gKCkge1xuICAgICAgZ2xvYmFsLmFkZCgncGFzdGUnLCBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIGlmIChoYXNQcm9QbHVnaW4oZWRpdG9yKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICB2YXIgZHJhZ2dpbmdJbnRlcm5hbGx5U3RhdGUgPSBDZWxsKGZhbHNlKTtcbiAgICAgICAgICB2YXIgcGFzdGVGb3JtYXQgPSBDZWxsKGlzUGFzdGVBc1RleHRFbmFibGVkKGVkaXRvcikgPyAndGV4dCcgOiAnaHRtbCcpO1xuICAgICAgICAgIHZhciBjbGlwYm9hcmQgPSBDbGlwYm9hcmQoZWRpdG9yLCBwYXN0ZUZvcm1hdCk7XG4gICAgICAgICAgdmFyIHF1aXJrcyA9IHNldHVwJDIoZWRpdG9yKTtcbiAgICAgICAgICByZWdpc3RlciQyKGVkaXRvciwgY2xpcGJvYXJkKTtcbiAgICAgICAgICByZWdpc3RlcihlZGl0b3IsIGNsaXBib2FyZCk7XG4gICAgICAgICAgc2V0dXAkMShlZGl0b3IpO1xuICAgICAgICAgIHJlZ2lzdGVyJDEoZWRpdG9yKTtcbiAgICAgICAgICBzZXR1cChlZGl0b3IsIGNsaXBib2FyZCwgZHJhZ2dpbmdJbnRlcm5hbGx5U3RhdGUpO1xuICAgICAgICAgIHJldHVybiBnZXQoY2xpcGJvYXJkLCBxdWlya3MpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBQbHVnaW4oKTtcblxufSh3aW5kb3cpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=