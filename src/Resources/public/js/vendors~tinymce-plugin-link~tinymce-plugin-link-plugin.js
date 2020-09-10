(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~tinymce-plugin-link~tinymce-plugin-link-plugin"],{

/***/ "./node_modules/tinymce/plugins/link/plugin.js":
/*!*****************************************************!*\
  !*** ./node_modules/tinymce/plugins/link/plugin.js ***!
  \*****************************************************/
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

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.VK');

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
    var isSimpleType = function (type) {
      return function (value) {
        return typeof value === type;
      };
    };
    var eq = function (t) {
      return function (a) {
        return t === a;
      };
    };
    var isString = isType('string');
    var isArray = isType('array');
    var isNull = eq(null);
    var isBoolean = isSimpleType('boolean');
    var isFunction = isSimpleType('function');

    var assumeExternalTargets = function (editor) {
      var externalTargets = editor.getParam('link_assume_external_targets', false);
      if (isBoolean(externalTargets) && externalTargets) {
        return 1;
      } else if (isString(externalTargets) && (externalTargets === 'http' || externalTargets === 'https')) {
        return externalTargets;
      }
      return 0;
    };
    var hasContextToolbar = function (editor) {
      return editor.getParam('link_context_toolbar', false, 'boolean');
    };
    var getLinkList = function (editor) {
      return editor.getParam('link_list');
    };
    var getDefaultLinkTarget = function (editor) {
      return editor.getParam('default_link_target');
    };
    var getTargetList = function (editor) {
      return editor.getParam('target_list', true);
    };
    var getRelList = function (editor) {
      return editor.getParam('rel_list', [], 'array');
    };
    var getLinkClassList = function (editor) {
      return editor.getParam('link_class_list', [], 'array');
    };
    var shouldShowLinkTitle = function (editor) {
      return editor.getParam('link_title', true, 'boolean');
    };
    var allowUnsafeLinkTarget = function (editor) {
      return editor.getParam('allow_unsafe_link_target', false, 'boolean');
    };
    var useQuickLink = function (editor) {
      return editor.getParam('link_quicklink', false, 'boolean');
    };
    var getDefaultLinkProtocol = function (editor) {
      return editor.getParam('link_default_protocol', 'http', 'string');
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

    var nativeIndexOf = Array.prototype.indexOf;
    var nativePush = Array.prototype.push;
    var rawIndexOf = function (ts, t) {
      return nativeIndexOf.call(ts, t);
    };
    var contains = function (xs, x) {
      return rawIndexOf(xs, x) > -1;
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
    var each = function (xs, f) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        f(x, i);
      }
    };
    var foldl = function (xs, f, acc) {
      each(xs, function (x) {
        acc = f(acc, x);
      });
      return acc;
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
    var findMap = function (arr, f) {
      for (var i = 0; i < arr.length; i++) {
        var r = f(arr[i], i);
        if (r.isSome()) {
          return r;
        }
      }
      return Option.none();
    };

    var cat = function (arr) {
      var r = [];
      var push = function (x) {
        r.push(x);
      };
      for (var i = 0; i < arr.length; i++) {
        arr[i].each(push);
      }
      return r;
    };
    var someIf = function (b, a) {
      return b ? Option.some(a) : Option.none();
    };

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var getValue = function (item) {
      return isString(item.value) ? item.value : '';
    };
    var sanitizeList = function (list, extractValue) {
      var out = [];
      global$2.each(list, function (item) {
        var text = isString(item.text) ? item.text : isString(item.title) ? item.title : '';
        if (item.menu !== undefined) ; else {
          var value = extractValue(item);
          out.push({
            text: text,
            value: value
          });
        }
      });
      return out;
    };
    var sanitizeWith = function (extracter) {
      if (extracter === void 0) {
        extracter = getValue;
      }
      return function (list) {
        return Option.from(list).map(function (list) {
          return sanitizeList(list, extracter);
        });
      };
    };
    var sanitize = function (list) {
      return sanitizeWith(getValue)(list);
    };
    var createUi = function (name, label) {
      return function (items) {
        return {
          name: name,
          type: 'selectbox',
          label: label,
          items: items
        };
      };
    };
    var ListOptions = {
      sanitize: sanitize,
      sanitizeWith: sanitizeWith,
      createUi: createUi,
      getValue: getValue
    };

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

    var keys = Object.keys;
    var each$1 = function (obj, f) {
      var props = keys(obj);
      for (var k = 0, len = props.length; k < len; k++) {
        var i = props[k];
        var x = obj[i];
        f(x, i);
      }
    };
    var objAcc = function (r) {
      return function (x, i) {
        r[i] = x;
      };
    };
    var internalFilter = function (obj, pred, onTrue, onFalse) {
      var r = {};
      each$1(obj, function (x, i) {
        (pred(x, i) ? onTrue : onFalse)(x, i);
      });
      return r;
    };
    var filter = function (obj, pred) {
      var t = {};
      internalFilter(obj, pred, objAcc(t), noop);
      return t;
    };

    var hasRtcPlugin = function (editor) {
      if (/(^|[ ,])rtc([, ]|$)/.test(editor.getParam('plugins', '', 'string')) && global.get('rtc')) {
        return true;
      } else {
        return false;
      }
    };

    var hasProtocol = function (url) {
      return /^\w+:/i.test(url);
    };
    var getHref = function (elm) {
      var href = elm.getAttribute('data-mce-href');
      return href ? href : elm.getAttribute('href');
    };
    var applyRelTargetRules = function (rel, isUnsafe) {
      var rules = ['noopener'];
      var rels = rel ? rel.split(/\s+/) : [];
      var toString = function (rels) {
        return global$2.trim(rels.sort().join(' '));
      };
      var addTargetRules = function (rels) {
        rels = removeTargetRules(rels);
        return rels.length > 0 ? rels.concat(rules) : rules;
      };
      var removeTargetRules = function (rels) {
        return rels.filter(function (val) {
          return global$2.inArray(rules, val) === -1;
        });
      };
      var newRels = isUnsafe ? addTargetRules(rels) : removeTargetRules(rels);
      return newRels.length > 0 ? toString(newRels) : '';
    };
    var trimCaretContainers = function (text) {
      return text.replace(/\uFEFF/g, '');
    };
    var getAnchorElement = function (editor, selectedElm) {
      selectedElm = selectedElm || editor.selection.getNode();
      if (isImageFigure(selectedElm)) {
        return editor.dom.select('a[href]', selectedElm)[0];
      } else {
        return editor.dom.getParent(selectedElm, 'a[href]');
      }
    };
    var getAnchorText = function (selection, anchorElm) {
      var text = anchorElm ? anchorElm.innerText || anchorElm.textContent : selection.getContent({ format: 'text' });
      return trimCaretContainers(text);
    };
    var isLink = function (elm) {
      return elm && elm.nodeName === 'A' && !!getHref(elm);
    };
    var hasLinks = function (elements) {
      return global$2.grep(elements, isLink).length > 0;
    };
    var isOnlyTextSelected = function (html) {
      if (/</.test(html) && (!/^<a [^>]+>[^<]+<\/a>$/.test(html) || html.indexOf('href=') === -1)) {
        return false;
      }
      return true;
    };
    var isImageFigure = function (elm) {
      return elm && elm.nodeName === 'FIGURE' && /\bimage\b/i.test(elm.className);
    };
    var getLinkAttrs = function (data) {
      return foldl([
        'title',
        'rel',
        'class',
        'target'
      ], function (acc, key) {
        data[key].each(function (value) {
          acc[key] = value.length > 0 ? value : null;
        });
        return acc;
      }, { href: data.href });
    };
    var handleExternalTargets = function (href, assumeExternalTargets) {
      if ((assumeExternalTargets === 'http' || assumeExternalTargets === 'https') && !hasProtocol(href)) {
        return assumeExternalTargets + '://' + href;
      }
      return href;
    };
    var applyLinkOverrides = function (editor, linkAttrs) {
      var newLinkAttrs = __assign({}, linkAttrs);
      if (!(getRelList(editor).length > 0) && allowUnsafeLinkTarget(editor) === false) {
        var newRel = applyRelTargetRules(newLinkAttrs.rel, newLinkAttrs.target === '_blank');
        newLinkAttrs.rel = newRel ? newRel : null;
      }
      if (Option.from(newLinkAttrs.target).isNone() && getTargetList(editor) === false) {
        newLinkAttrs.target = getDefaultLinkTarget(editor);
      }
      newLinkAttrs.href = handleExternalTargets(newLinkAttrs.href, assumeExternalTargets(editor));
      return newLinkAttrs;
    };
    var updateLink = function (editor, anchorElm, text, linkAttrs) {
      text.each(function (text) {
        if (anchorElm.hasOwnProperty('innerText')) {
          anchorElm.innerText = text;
        } else {
          anchorElm.textContent = text;
        }
      });
      editor.dom.setAttribs(anchorElm, linkAttrs);
      editor.selection.select(anchorElm);
    };
    var createLink = function (editor, selectedElm, text, linkAttrs) {
      if (isImageFigure(selectedElm)) {
        linkImageFigure(editor, selectedElm, linkAttrs);
      } else {
        text.fold(function () {
          editor.execCommand('mceInsertLink', false, linkAttrs);
        }, function (text) {
          editor.insertContent(editor.dom.createHTML('a', linkAttrs, editor.dom.encode(text)));
        });
      }
    };
    var linkDomMutation = function (editor, attachState, data) {
      var selectedElm = editor.selection.getNode();
      var anchorElm = getAnchorElement(editor, selectedElm);
      var linkAttrs = applyLinkOverrides(editor, getLinkAttrs(data));
      editor.undoManager.transact(function () {
        if (data.href === attachState.href) {
          attachState.attach();
        }
        if (anchorElm) {
          editor.focus();
          updateLink(editor, anchorElm, data.text, linkAttrs);
        } else {
          createLink(editor, selectedElm, data.text, linkAttrs);
        }
      });
    };
    var unlinkDomMutation = function (editor) {
      editor.undoManager.transact(function () {
        var node = editor.selection.getNode();
        if (isImageFigure(node)) {
          unlinkImageFigure(editor, node);
        } else {
          var anchorElm = editor.dom.getParent(node, 'a[href]', editor.getBody());
          if (anchorElm) {
            editor.dom.remove(anchorElm, true);
          }
        }
        editor.focus();
      });
    };
    var unwrapOptions = function (data) {
      var cls = data.class, href = data.href, rel = data.rel, target = data.target, text = data.text, title = data.title;
      return filter({
        class: cls.getOrNull(),
        href: href,
        rel: rel.getOrNull(),
        target: target.getOrNull(),
        text: text.getOrNull(),
        title: title.getOrNull()
      }, function (v, _k) {
        return isNull(v) === false;
      });
    };
    var link = function (editor, attachState, data) {
      hasRtcPlugin(editor) ? editor.execCommand('createlink', false, unwrapOptions(data)) : linkDomMutation(editor, attachState, data);
    };
    var unlink = function (editor) {
      hasRtcPlugin(editor) ? editor.execCommand('unlink') : unlinkDomMutation(editor);
    };
    var unlinkImageFigure = function (editor, fig) {
      var img = editor.dom.select('img', fig)[0];
      if (img) {
        var a = editor.dom.getParents(img, 'a[href]', fig)[0];
        if (a) {
          a.parentNode.insertBefore(img, a);
          editor.dom.remove(a);
        }
      }
    };
    var linkImageFigure = function (editor, fig, attrs) {
      var img = editor.dom.select('img', fig)[0];
      if (img) {
        var a = editor.dom.create('a', attrs);
        img.parentNode.insertBefore(a, img);
        a.appendChild(img);
      }
    };

    var findTextByValue = function (value, catalog) {
      return findMap(catalog, function (item) {
        return someIf(item.value === value, item);
      });
    };
    var getDelta = function (persistentText, fieldName, catalog, data) {
      var value = data[fieldName];
      var hasPersistentText = persistentText.length > 0;
      return value !== undefined ? findTextByValue(value, catalog).map(function (i) {
        return {
          url: {
            value: i.value,
            meta: {
              text: hasPersistentText ? persistentText : i.text,
              attach: noop
            }
          },
          text: hasPersistentText ? persistentText : i.text
        };
      }) : Option.none();
    };
    var findCatalog = function (catalogs, fieldName) {
      if (fieldName === 'link') {
        return catalogs.link;
      } else if (fieldName === 'anchor') {
        return catalogs.anchor;
      } else {
        return Option.none();
      }
    };
    var init = function (initialData, linkCatalog) {
      var persistentData = {
        text: initialData.text,
        title: initialData.title
      };
      var getTitleFromUrlChange = function (url) {
        return someIf(persistentData.title.length <= 0, Option.from(url.meta.title).getOr(''));
      };
      var getTextFromUrlChange = function (url) {
        return someIf(persistentData.text.length <= 0, Option.from(url.meta.text).getOr(url.value));
      };
      var onUrlChange = function (data) {
        var text = getTextFromUrlChange(data.url);
        var title = getTitleFromUrlChange(data.url);
        if (text.isSome() || title.isSome()) {
          return Option.some(__assign(__assign({}, text.map(function (text) {
            return { text: text };
          }).getOr({})), title.map(function (title) {
            return { title: title };
          }).getOr({})));
        } else {
          return Option.none();
        }
      };
      var onCatalogChange = function (data, change) {
        var catalog = findCatalog(linkCatalog, change.name).getOr([]);
        return getDelta(persistentData.text, change.name, catalog, data);
      };
      var onChange = function (getData, change) {
        var name = change.name;
        if (name === 'url') {
          return onUrlChange(getData());
        } else if (contains([
            'anchor',
            'link'
          ], name)) {
          return onCatalogChange(getData(), change);
        } else if (name === 'text' || name === 'title') {
          persistentData[name] = getData()[name];
          return Option.none();
        } else {
          return Option.none();
        }
      };
      return { onChange: onChange };
    };
    var DialogChanges = {
      init: init,
      getDelta: getDelta
    };

    var global$3 = tinymce.util.Tools.resolve('tinymce.util.Delay');

    var global$4 = tinymce.util.Tools.resolve('tinymce.util.Promise');

    var delayedConfirm = function (editor, message, callback) {
      var rng = editor.selection.getRng();
      global$3.setEditorTimeout(editor, function () {
        editor.windowManager.confirm(message, function (state) {
          editor.selection.setRng(rng);
          callback(state);
        });
      });
    };
    var tryEmailTransform = function (data) {
      var url = data.href;
      var suggestMailTo = url.indexOf('@') > 0 && url.indexOf('/') === -1 && url.indexOf('mailto:') === -1;
      return suggestMailTo ? Option.some({
        message: 'The URL you entered seems to be an email address. Do you want to add the required mailto: prefix?',
        preprocess: function (oldData) {
          return __assign(__assign({}, oldData), { href: 'mailto:' + url });
        }
      }) : Option.none();
    };
    var tryProtocolTransform = function (assumeExternalTargets, defaultLinkProtocol) {
      return function (data) {
        var url = data.href;
        var suggestProtocol = assumeExternalTargets === 1 && !hasProtocol(url) || assumeExternalTargets === 0 && /^\s*www[\.|\d\.]/i.test(url);
        return suggestProtocol ? Option.some({
          message: 'The URL you entered seems to be an external link. Do you want to add the required ' + defaultLinkProtocol + ':// prefix?',
          preprocess: function (oldData) {
            return __assign(__assign({}, oldData), { href: defaultLinkProtocol + '://' + url });
          }
        }) : Option.none();
      };
    };
    var preprocess = function (editor, data) {
      return findMap([
        tryEmailTransform,
        tryProtocolTransform(assumeExternalTargets(editor), getDefaultLinkProtocol(editor))
      ], function (f) {
        return f(data);
      }).fold(function () {
        return global$4.resolve(data);
      }, function (transform) {
        return new global$4(function (callback) {
          delayedConfirm(editor, transform.message, function (state) {
            callback(state ? transform.preprocess(data) : data);
          });
        });
      });
    };
    var DialogConfirms = { preprocess: preprocess };

    var getAnchors = function (editor) {
      var anchorNodes = editor.dom.select('a:not([href])');
      var anchors = bind(anchorNodes, function (anchor) {
        var id = anchor.name || anchor.id;
        return id ? [{
            text: id,
            value: '#' + id
          }] : [];
      });
      return anchors.length > 0 ? Option.some([{
          text: 'None',
          value: ''
        }].concat(anchors)) : Option.none();
    };
    var AnchorListOptions = { getAnchors: getAnchors };

    var getClasses = function (editor) {
      var list = getLinkClassList(editor);
      if (list.length > 0) {
        return ListOptions.sanitize(list);
      }
      return Option.none();
    };
    var ClassListOptions = { getClasses: getClasses };

    var global$5 = tinymce.util.Tools.resolve('tinymce.util.XHR');

    var parseJson = function (text) {
      try {
        return Option.some(JSON.parse(text));
      } catch (err) {
        return Option.none();
      }
    };
    var getLinks = function (editor) {
      var extractor = function (item) {
        return editor.convertURL(item.value || item.url, 'href');
      };
      var linkList = getLinkList(editor);
      return new global$4(function (callback) {
        if (isString(linkList)) {
          global$5.send({
            url: linkList,
            success: function (text) {
              return callback(parseJson(text));
            },
            error: function (_) {
              return callback(Option.none());
            }
          });
        } else if (isFunction(linkList)) {
          linkList(function (output) {
            return callback(Option.some(output));
          });
        } else {
          callback(Option.from(linkList));
        }
      }).then(function (optItems) {
        return optItems.bind(ListOptions.sanitizeWith(extractor)).map(function (items) {
          if (items.length > 0) {
            return [{
                text: 'None',
                value: ''
              }].concat(items);
          } else {
            return items;
          }
        });
      });
    };
    var LinkListOptions = { getLinks: getLinks };

    var getRels = function (editor, initialTarget) {
      var list = getRelList(editor);
      if (list.length > 0) {
        var isTargetBlank_1 = initialTarget.is('_blank');
        var enforceSafe = allowUnsafeLinkTarget(editor) === false;
        var safeRelExtractor = function (item) {
          return applyRelTargetRules(ListOptions.getValue(item), isTargetBlank_1);
        };
        var sanitizer = enforceSafe ? ListOptions.sanitizeWith(safeRelExtractor) : ListOptions.sanitize;
        return sanitizer(list);
      }
      return Option.none();
    };
    var RelOptions = { getRels: getRels };

    var fallbacks = [
      {
        text: 'Current window',
        value: ''
      },
      {
        text: 'New window',
        value: '_blank'
      }
    ];
    var getTargets = function (editor) {
      var list = getTargetList(editor);
      if (isArray(list)) {
        return ListOptions.sanitize(list).orThunk(function () {
          return Option.some(fallbacks);
        });
      } else if (list === false) {
        return Option.none();
      }
      return Option.some(fallbacks);
    };
    var TargetOptions = { getTargets: getTargets };

    var nonEmptyAttr = function (dom, elem, name) {
      var val = dom.getAttrib(elem, name);
      return val !== null && val.length > 0 ? Option.some(val) : Option.none();
    };
    var extractFromAnchor = function (editor, anchor) {
      var dom = editor.dom;
      var onlyText = isOnlyTextSelected(editor.selection.getContent());
      var text = onlyText ? Option.some(getAnchorText(editor.selection, anchor)) : Option.none();
      var url = anchor ? Option.some(dom.getAttrib(anchor, 'href')) : Option.none();
      var target = anchor ? Option.from(dom.getAttrib(anchor, 'target')) : Option.none();
      var rel = nonEmptyAttr(dom, anchor, 'rel');
      var linkClass = nonEmptyAttr(dom, anchor, 'class');
      var title = nonEmptyAttr(dom, anchor, 'title');
      return {
        url: url,
        text: text,
        title: title,
        target: target,
        rel: rel,
        linkClass: linkClass
      };
    };
    var collect = function (editor, linkNode) {
      return LinkListOptions.getLinks(editor).then(function (links) {
        var anchor = extractFromAnchor(editor, linkNode);
        return {
          anchor: anchor,
          catalogs: {
            targets: TargetOptions.getTargets(editor),
            rels: RelOptions.getRels(editor, anchor.target),
            classes: ClassListOptions.getClasses(editor),
            anchor: AnchorListOptions.getAnchors(editor),
            link: links
          },
          optNode: Option.from(linkNode),
          flags: { titleEnabled: shouldShowLinkTitle(editor) }
        };
      });
    };
    var DialogInfo = { collect: collect };

    var handleSubmit = function (editor, info) {
      return function (api) {
        var data = api.getData();
        if (!data.url.value) {
          unlink(editor);
          api.close();
          return;
        }
        var getChangedValue = function (key) {
          return Option.from(data[key]).filter(function (value) {
            return !info.anchor[key].is(value);
          });
        };
        var changedData = {
          href: data.url.value,
          text: getChangedValue('text'),
          target: getChangedValue('target'),
          rel: getChangedValue('rel'),
          class: getChangedValue('linkClass'),
          title: getChangedValue('title')
        };
        var attachState = {
          href: data.url.value,
          attach: data.url.meta !== undefined && data.url.meta.attach ? data.url.meta.attach : function () {
          }
        };
        DialogConfirms.preprocess(editor, changedData).then(function (pData) {
          link(editor, attachState, pData);
        });
        api.close();
      };
    };
    var collectData = function (editor) {
      var anchorNode = getAnchorElement(editor);
      return DialogInfo.collect(editor, anchorNode);
    };
    var getInitialData = function (info, defaultTarget) {
      var anchor = info.anchor;
      var url = anchor.url.getOr('');
      return {
        url: {
          value: url,
          meta: { original: { value: url } }
        },
        text: anchor.text.getOr(''),
        title: anchor.title.getOr(''),
        anchor: url,
        link: url,
        rel: anchor.rel.getOr(''),
        target: anchor.target.or(defaultTarget).getOr(''),
        linkClass: anchor.linkClass.getOr('')
      };
    };
    var makeDialog = function (settings, onSubmit, editor) {
      var urlInput = [{
          name: 'url',
          type: 'urlinput',
          filetype: 'file',
          label: 'URL'
        }];
      var displayText = settings.anchor.text.map(function () {
        return {
          name: 'text',
          type: 'input',
          label: 'Text to display'
        };
      }).toArray();
      var titleText = settings.flags.titleEnabled ? [{
          name: 'title',
          type: 'input',
          label: 'Title'
        }] : [];
      var defaultTarget = Option.from(getDefaultLinkTarget(editor));
      var initialData = getInitialData(settings, defaultTarget);
      var catalogs = settings.catalogs;
      var dialogDelta = DialogChanges.init(initialData, catalogs);
      var body = {
        type: 'panel',
        items: flatten([
          urlInput,
          displayText,
          titleText,
          cat([
            catalogs.anchor.map(ListOptions.createUi('anchor', 'Anchors')),
            catalogs.rels.map(ListOptions.createUi('rel', 'Rel')),
            catalogs.targets.map(ListOptions.createUi('target', 'Open link in...')),
            catalogs.link.map(ListOptions.createUi('link', 'Link list')),
            catalogs.classes.map(ListOptions.createUi('linkClass', 'Class'))
          ])
        ])
      };
      return {
        title: 'Insert/Edit Link',
        size: 'normal',
        body: body,
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
        onChange: function (api, _a) {
          var name = _a.name;
          dialogDelta.onChange(api.getData, { name: name }).each(function (newData) {
            api.setData(newData);
          });
        },
        onSubmit: onSubmit
      };
    };
    var open = function (editor) {
      var data = collectData(editor);
      data.then(function (info) {
        var onSubmit = handleSubmit(editor, info);
        return makeDialog(info, onSubmit, editor);
      }).then(function (spec) {
        editor.windowManager.open(spec);
      });
    };

    var appendClickRemove = function (link, evt) {
      domGlobals.document.body.appendChild(link);
      link.dispatchEvent(evt);
      domGlobals.document.body.removeChild(link);
    };
    var open$1 = function (url) {
      var link = domGlobals.document.createElement('a');
      link.target = '_blank';
      link.href = url;
      link.rel = 'noreferrer noopener';
      var evt = domGlobals.document.createEvent('MouseEvents');
      evt.initMouseEvent('click', true, true, domGlobals.window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      appendClickRemove(link, evt);
    };

    var getLink = function (editor, elm) {
      return editor.dom.getParent(elm, 'a[href]');
    };
    var getSelectedLink = function (editor) {
      return getLink(editor, editor.selection.getStart());
    };
    var hasOnlyAltModifier = function (e) {
      return e.altKey === true && e.shiftKey === false && e.ctrlKey === false && e.metaKey === false;
    };
    var gotoLink = function (editor, a) {
      if (a) {
        var href = getHref(a);
        if (/^#/.test(href)) {
          var targetEl = editor.$(href);
          if (targetEl.length) {
            editor.selection.scrollIntoView(targetEl[0], true);
          }
        } else {
          open$1(a.href);
        }
      }
    };
    var openDialog = function (editor) {
      return function () {
        open(editor);
      };
    };
    var gotoSelectedLink = function (editor) {
      return function () {
        gotoLink(editor, getSelectedLink(editor));
      };
    };
    var setupGotoLinks = function (editor) {
      editor.on('click', function (e) {
        var link = getLink(editor, e.target);
        if (link && global$1.metaKeyPressed(e)) {
          e.preventDefault();
          gotoLink(editor, link);
        }
      });
      editor.on('keydown', function (e) {
        var link = getSelectedLink(editor);
        if (link && e.keyCode === 13 && hasOnlyAltModifier(e)) {
          e.preventDefault();
          gotoLink(editor, link);
        }
      });
    };
    var toggleActiveState = function (editor) {
      return function (api) {
        var nodeChangeHandler = function (e) {
          return api.setActive(!editor.mode.isReadOnly() && !!getAnchorElement(editor, e.element));
        };
        editor.on('NodeChange', nodeChangeHandler);
        return function () {
          return editor.off('NodeChange', nodeChangeHandler);
        };
      };
    };
    var toggleEnabledState = function (editor) {
      return function (api) {
        var parents = editor.dom.getParents(editor.selection.getStart());
        api.setDisabled(!hasLinks(parents));
        var nodeChangeHandler = function (e) {
          return api.setDisabled(!hasLinks(e.parents));
        };
        editor.on('NodeChange', nodeChangeHandler);
        return function () {
          return editor.off('NodeChange', nodeChangeHandler);
        };
      };
    };

    var register = function (editor) {
      editor.addCommand('mceLink', function () {
        if (useQuickLink(editor)) {
          editor.fire('contexttoolbar-show', { toolbarKey: 'quicklink' });
        } else {
          openDialog(editor)();
        }
      });
    };

    var setup = function (editor) {
      editor.addShortcut('Meta+K', '', function () {
        editor.execCommand('mceLink');
      });
    };

    var setupButtons = function (editor) {
      editor.ui.registry.addToggleButton('link', {
        icon: 'link',
        tooltip: 'Insert/edit link',
        onAction: openDialog(editor),
        onSetup: toggleActiveState(editor)
      });
      editor.ui.registry.addButton('openlink', {
        icon: 'new-tab',
        tooltip: 'Open link',
        onAction: gotoSelectedLink(editor),
        onSetup: toggleEnabledState(editor)
      });
      editor.ui.registry.addButton('unlink', {
        icon: 'unlink',
        tooltip: 'Remove link',
        onAction: function () {
          return unlink(editor);
        },
        onSetup: toggleEnabledState(editor)
      });
    };
    var setupMenuItems = function (editor) {
      editor.ui.registry.addMenuItem('openlink', {
        text: 'Open link',
        icon: 'new-tab',
        onAction: gotoSelectedLink(editor),
        onSetup: toggleEnabledState(editor)
      });
      editor.ui.registry.addMenuItem('link', {
        icon: 'link',
        text: 'Link...',
        shortcut: 'Meta+K',
        onAction: openDialog(editor)
      });
      editor.ui.registry.addMenuItem('unlink', {
        icon: 'unlink',
        text: 'Remove link',
        onAction: function () {
          return unlink(editor);
        },
        onSetup: toggleEnabledState(editor)
      });
    };
    var setupContextMenu = function (editor) {
      var inLink = 'link unlink openlink';
      var noLink = 'link';
      editor.ui.registry.addContextMenu('link', {
        update: function (element) {
          return hasLinks(editor.dom.getParents(element, 'a')) ? inLink : noLink;
        }
      });
    };
    var setupContextToolbars = function (editor) {
      var collapseSelectionToEnd = function (editor) {
        editor.selection.collapse(false);
      };
      var onSetupLink = function (buttonApi) {
        var node = editor.selection.getNode();
        buttonApi.setDisabled(!getAnchorElement(editor, node));
        return function () {
        };
      };
      editor.ui.registry.addContextForm('quicklink', {
        launch: {
          type: 'contextformtogglebutton',
          icon: 'link',
          tooltip: 'Link',
          onSetup: toggleActiveState(editor)
        },
        label: 'Link',
        predicate: function (node) {
          return !!getAnchorElement(editor, node) && hasContextToolbar(editor);
        },
        initValue: function () {
          var elm = getAnchorElement(editor);
          return !!elm ? getHref(elm) : '';
        },
        commands: [
          {
            type: 'contextformtogglebutton',
            icon: 'link',
            tooltip: 'Link',
            primary: true,
            onSetup: function (buttonApi) {
              var node = editor.selection.getNode();
              buttonApi.setActive(!!getAnchorElement(editor, node));
              return toggleActiveState(editor)(buttonApi);
            },
            onAction: function (formApi) {
              var anchor = getAnchorElement(editor);
              var value = formApi.getValue();
              if (!anchor) {
                var attachState = {
                  href: value,
                  attach: function () {
                  }
                };
                var onlyText = isOnlyTextSelected(editor.selection.getContent());
                var text = onlyText ? Option.some(getAnchorText(editor.selection, anchor)).filter(function (t) {
                  return t.length > 0;
                }).or(Option.from(value)) : Option.none();
                link(editor, attachState, {
                  href: value,
                  text: text,
                  title: Option.none(),
                  rel: Option.none(),
                  target: Option.none(),
                  class: Option.none()
                });
                formApi.hide();
              } else {
                editor.undoManager.transact(function () {
                  editor.dom.setAttrib(anchor, 'href', value);
                  collapseSelectionToEnd(editor);
                  formApi.hide();
                });
              }
            }
          },
          {
            type: 'contextformbutton',
            icon: 'unlink',
            tooltip: 'Remove link',
            onSetup: onSetupLink,
            onAction: function (formApi) {
              unlink(editor);
              formApi.hide();
            }
          },
          {
            type: 'contextformbutton',
            icon: 'new-tab',
            tooltip: 'Open link',
            onSetup: onSetupLink,
            onAction: function (formApi) {
              gotoSelectedLink(editor)();
              formApi.hide();
            }
          }
        ]
      });
    };

    function Plugin () {
      global.add('link', function (editor) {
        setupButtons(editor);
        setupMenuItems(editor);
        setupContextMenu(editor);
        setupContextToolbars(editor);
        setupGotoLinks(editor);
        register(editor);
        setup(editor);
      });
    }

    Plugin();

}(window));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2xpbmsvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qjs7QUFFekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0EsT0FBTztBQUNQO0FBQ0Esc0JBQXNCOztBQUV0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFlBQVksYUFBYTtBQUMxQyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxhQUFhO0FBQzFEO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QywwQkFBMEI7QUFDeEUsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTs7QUFFQSxDQUFDIiwiZmlsZSI6InZlbmRvcnN+dGlueW1jZS1wbHVnaW4tbGlua350aW55bWNlLXBsdWdpbi1saW5rLXBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICpcbiAqIFZlcnNpb246IDUuNC4yICgyMDIwLTA4LTE3KVxuICovXG4oZnVuY3Rpb24gKGRvbUdsb2JhbHMpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgZ2xvYmFsID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuUGx1Z2luTWFuYWdlcicpO1xuXG4gICAgdmFyIGdsb2JhbCQxID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UudXRpbC5WSycpO1xuXG4gICAgdmFyIHR5cGVPZiA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICB2YXIgdCA9IHR5cGVvZiB4O1xuICAgICAgaWYgKHggPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICdudWxsJztcbiAgICAgIH0gZWxzZSBpZiAodCA9PT0gJ29iamVjdCcgJiYgKEFycmF5LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKHgpIHx8IHguY29uc3RydWN0b3IgJiYgeC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnQXJyYXknKSkge1xuICAgICAgICByZXR1cm4gJ2FycmF5JztcbiAgICAgIH0gZWxzZSBpZiAodCA9PT0gJ29iamVjdCcgJiYgKFN0cmluZy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZih4KSB8fCB4LmNvbnN0cnVjdG9yICYmIHguY29uc3RydWN0b3IubmFtZSA9PT0gJ1N0cmluZycpKSB7XG4gICAgICAgIHJldHVybiAnc3RyaW5nJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0O1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGlzVHlwZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0eXBlT2YodmFsdWUpID09PSB0eXBlO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBpc1NpbXBsZVR5cGUgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSB0eXBlO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBlcSA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgcmV0dXJuIHQgPT09IGE7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGlzU3RyaW5nID0gaXNUeXBlKCdzdHJpbmcnKTtcbiAgICB2YXIgaXNBcnJheSA9IGlzVHlwZSgnYXJyYXknKTtcbiAgICB2YXIgaXNOdWxsID0gZXEobnVsbCk7XG4gICAgdmFyIGlzQm9vbGVhbiA9IGlzU2ltcGxlVHlwZSgnYm9vbGVhbicpO1xuICAgIHZhciBpc0Z1bmN0aW9uID0gaXNTaW1wbGVUeXBlKCdmdW5jdGlvbicpO1xuXG4gICAgdmFyIGFzc3VtZUV4dGVybmFsVGFyZ2V0cyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBleHRlcm5hbFRhcmdldHMgPSBlZGl0b3IuZ2V0UGFyYW0oJ2xpbmtfYXNzdW1lX2V4dGVybmFsX3RhcmdldHMnLCBmYWxzZSk7XG4gICAgICBpZiAoaXNCb29sZWFuKGV4dGVybmFsVGFyZ2V0cykgJiYgZXh0ZXJuYWxUYXJnZXRzKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfSBlbHNlIGlmIChpc1N0cmluZyhleHRlcm5hbFRhcmdldHMpICYmIChleHRlcm5hbFRhcmdldHMgPT09ICdodHRwJyB8fCBleHRlcm5hbFRhcmdldHMgPT09ICdodHRwcycpKSB7XG4gICAgICAgIHJldHVybiBleHRlcm5hbFRhcmdldHM7XG4gICAgICB9XG4gICAgICByZXR1cm4gMDtcbiAgICB9O1xuICAgIHZhciBoYXNDb250ZXh0VG9vbGJhciA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2xpbmtfY29udGV4dF90b29sYmFyJywgZmFsc2UsICdib29sZWFuJyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0TGlua0xpc3QgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdsaW5rX2xpc3QnKTtcbiAgICB9O1xuICAgIHZhciBnZXREZWZhdWx0TGlua1RhcmdldCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2RlZmF1bHRfbGlua190YXJnZXQnKTtcbiAgICB9O1xuICAgIHZhciBnZXRUYXJnZXRMaXN0ID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgndGFyZ2V0X2xpc3QnLCB0cnVlKTtcbiAgICB9O1xuICAgIHZhciBnZXRSZWxMaXN0ID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgncmVsX2xpc3QnLCBbXSwgJ2FycmF5Jyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0TGlua0NsYXNzTGlzdCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2xpbmtfY2xhc3NfbGlzdCcsIFtdLCAnYXJyYXknKTtcbiAgICB9O1xuICAgIHZhciBzaG91bGRTaG93TGlua1RpdGxlID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnbGlua190aXRsZScsIHRydWUsICdib29sZWFuJyk7XG4gICAgfTtcbiAgICB2YXIgYWxsb3dVbnNhZmVMaW5rVGFyZ2V0ID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnYWxsb3dfdW5zYWZlX2xpbmtfdGFyZ2V0JywgZmFsc2UsICdib29sZWFuJyk7XG4gICAgfTtcbiAgICB2YXIgdXNlUXVpY2tMaW5rID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnbGlua19xdWlja2xpbmsnLCBmYWxzZSwgJ2Jvb2xlYW4nKTtcbiAgICB9O1xuICAgIHZhciBnZXREZWZhdWx0TGlua1Byb3RvY29sID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnbGlua19kZWZhdWx0X3Byb3RvY29sJywgJ2h0dHAnLCAnc3RyaW5nJyk7XG4gICAgfTtcblxuICAgIHZhciBub29wID0gZnVuY3Rpb24gKCkge1xuICAgIH07XG4gICAgdmFyIGNvbnN0YW50ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIG5ldmVyID0gY29uc3RhbnQoZmFsc2UpO1xuICAgIHZhciBhbHdheXMgPSBjb25zdGFudCh0cnVlKTtcblxuICAgIHZhciBub25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIE5PTkU7XG4gICAgfTtcbiAgICB2YXIgTk9ORSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBlcSA9IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgIHJldHVybiBvLmlzTm9uZSgpO1xuICAgICAgfTtcbiAgICAgIHZhciBjYWxsID0gZnVuY3Rpb24gKHRodW5rKSB7XG4gICAgICAgIHJldHVybiB0aHVuaygpO1xuICAgICAgfTtcbiAgICAgIHZhciBpZCA9IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgIHJldHVybiBuO1xuICAgICAgfTtcbiAgICAgIHZhciBtZSA9IHtcbiAgICAgICAgZm9sZDogZnVuY3Rpb24gKG4sIF9zKSB7XG4gICAgICAgICAgcmV0dXJuIG4oKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXM6IG5ldmVyLFxuICAgICAgICBpc1NvbWU6IG5ldmVyLFxuICAgICAgICBpc05vbmU6IGFsd2F5cyxcbiAgICAgICAgZ2V0T3I6IGlkLFxuICAgICAgICBnZXRPclRodW5rOiBjYWxsLFxuICAgICAgICBnZXRPckRpZTogZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cgfHwgJ2Vycm9yOiBnZXRPckRpZSBjYWxsZWQgb24gbm9uZS4nKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0T3JOdWxsOiBjb25zdGFudChudWxsKSxcbiAgICAgICAgZ2V0T3JVbmRlZmluZWQ6IGNvbnN0YW50KHVuZGVmaW5lZCksXG4gICAgICAgIG9yOiBpZCxcbiAgICAgICAgb3JUaHVuazogY2FsbCxcbiAgICAgICAgbWFwOiBub25lLFxuICAgICAgICBlYWNoOiBub29wLFxuICAgICAgICBiaW5kOiBub25lLFxuICAgICAgICBleGlzdHM6IG5ldmVyLFxuICAgICAgICBmb3JhbGw6IGFsd2F5cyxcbiAgICAgICAgZmlsdGVyOiBub25lLFxuICAgICAgICBlcXVhbHM6IGVxLFxuICAgICAgICBlcXVhbHNfOiBlcSxcbiAgICAgICAgdG9BcnJheTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9TdHJpbmc6IGNvbnN0YW50KCdub25lKCknKVxuICAgICAgfTtcbiAgICAgIHJldHVybiBtZTtcbiAgICB9KCk7XG4gICAgdmFyIHNvbWUgPSBmdW5jdGlvbiAoYSkge1xuICAgICAgdmFyIGNvbnN0YW50X2EgPSBjb25zdGFudChhKTtcbiAgICAgIHZhciBzZWxmID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbWU7XG4gICAgICB9O1xuICAgICAgdmFyIGJpbmQgPSBmdW5jdGlvbiAoZikge1xuICAgICAgICByZXR1cm4gZihhKTtcbiAgICAgIH07XG4gICAgICB2YXIgbWUgPSB7XG4gICAgICAgIGZvbGQ6IGZ1bmN0aW9uIChuLCBzKSB7XG4gICAgICAgICAgcmV0dXJuIHMoYSk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgIHJldHVybiBhID09PSB2O1xuICAgICAgICB9LFxuICAgICAgICBpc1NvbWU6IGFsd2F5cyxcbiAgICAgICAgaXNOb25lOiBuZXZlcixcbiAgICAgICAgZ2V0T3I6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yVGh1bms6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yRGllOiBjb25zdGFudF9hLFxuICAgICAgICBnZXRPck51bGw6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yVW5kZWZpbmVkOiBjb25zdGFudF9hLFxuICAgICAgICBvcjogc2VsZixcbiAgICAgICAgb3JUaHVuazogc2VsZixcbiAgICAgICAgbWFwOiBmdW5jdGlvbiAoZikge1xuICAgICAgICAgIHJldHVybiBzb21lKGYoYSkpO1xuICAgICAgICB9LFxuICAgICAgICBlYWNoOiBmdW5jdGlvbiAoZikge1xuICAgICAgICAgIGYoYSk7XG4gICAgICAgIH0sXG4gICAgICAgIGJpbmQ6IGJpbmQsXG4gICAgICAgIGV4aXN0czogYmluZCxcbiAgICAgICAgZm9yYWxsOiBiaW5kLFxuICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgcmV0dXJuIGYoYSkgPyBtZSA6IE5PTkU7XG4gICAgICAgIH0sXG4gICAgICAgIHRvQXJyYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gW2FdO1xuICAgICAgICB9LFxuICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiAnc29tZSgnICsgYSArICcpJztcbiAgICAgICAgfSxcbiAgICAgICAgZXF1YWxzOiBmdW5jdGlvbiAobykge1xuICAgICAgICAgIHJldHVybiBvLmlzKGEpO1xuICAgICAgICB9LFxuICAgICAgICBlcXVhbHNfOiBmdW5jdGlvbiAobywgZWxlbWVudEVxKSB7XG4gICAgICAgICAgcmV0dXJuIG8uZm9sZChuZXZlciwgZnVuY3Rpb24gKGIpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50RXEoYSwgYik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXR1cm4gbWU7XG4gICAgfTtcbiAgICB2YXIgZnJvbSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgPyBOT05FIDogc29tZSh2YWx1ZSk7XG4gICAgfTtcbiAgICB2YXIgT3B0aW9uID0ge1xuICAgICAgc29tZTogc29tZSxcbiAgICAgIG5vbmU6IG5vbmUsXG4gICAgICBmcm9tOiBmcm9tXG4gICAgfTtcblxuICAgIHZhciBuYXRpdmVJbmRleE9mID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2Y7XG4gICAgdmFyIG5hdGl2ZVB1c2ggPSBBcnJheS5wcm90b3R5cGUucHVzaDtcbiAgICB2YXIgcmF3SW5kZXhPZiA9IGZ1bmN0aW9uICh0cywgdCkge1xuICAgICAgcmV0dXJuIG5hdGl2ZUluZGV4T2YuY2FsbCh0cywgdCk7XG4gICAgfTtcbiAgICB2YXIgY29udGFpbnMgPSBmdW5jdGlvbiAoeHMsIHgpIHtcbiAgICAgIHJldHVybiByYXdJbmRleE9mKHhzLCB4KSA+IC0xO1xuICAgIH07XG4gICAgdmFyIG1hcCA9IGZ1bmN0aW9uICh4cywgZikge1xuICAgICAgdmFyIGxlbiA9IHhzLmxlbmd0aDtcbiAgICAgIHZhciByID0gbmV3IEFycmF5KGxlbik7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciB4ID0geHNbaV07XG4gICAgICAgIHJbaV0gPSBmKHgsIGkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcbiAgICB2YXIgZWFjaCA9IGZ1bmN0aW9uICh4cywgZikge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHhzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciB4ID0geHNbaV07XG4gICAgICAgIGYoeCwgaSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgZm9sZGwgPSBmdW5jdGlvbiAoeHMsIGYsIGFjYykge1xuICAgICAgZWFjaCh4cywgZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgYWNjID0gZihhY2MsIHgpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH07XG4gICAgdmFyIGZsYXR0ZW4gPSBmdW5jdGlvbiAoeHMpIHtcbiAgICAgIHZhciByID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0geHMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgaWYgKCFpc0FycmF5KHhzW2ldKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXJyLmZsYXR0ZW4gaXRlbSAnICsgaSArICcgd2FzIG5vdCBhbiBhcnJheSwgaW5wdXQ6ICcgKyB4cyk7XG4gICAgICAgIH1cbiAgICAgICAgbmF0aXZlUHVzaC5hcHBseShyLCB4c1tpXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcjtcbiAgICB9O1xuICAgIHZhciBiaW5kID0gZnVuY3Rpb24gKHhzLCBmKSB7XG4gICAgICByZXR1cm4gZmxhdHRlbihtYXAoeHMsIGYpKTtcbiAgICB9O1xuICAgIHZhciBmaW5kTWFwID0gZnVuY3Rpb24gKGFyciwgZikge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHIgPSBmKGFycltpXSwgaSk7XG4gICAgICAgIGlmIChyLmlzU29tZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgIH07XG5cbiAgICB2YXIgY2F0ID0gZnVuY3Rpb24gKGFycikge1xuICAgICAgdmFyIHIgPSBbXTtcbiAgICAgIHZhciBwdXNoID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgci5wdXNoKHgpO1xuICAgICAgfTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGFycltpXS5lYWNoKHB1c2gpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcbiAgICB2YXIgc29tZUlmID0gZnVuY3Rpb24gKGIsIGEpIHtcbiAgICAgIHJldHVybiBiID8gT3B0aW9uLnNvbWUoYSkgOiBPcHRpb24ubm9uZSgpO1xuICAgIH07XG5cbiAgICB2YXIgZ2xvYmFsJDIgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS51dGlsLlRvb2xzJyk7XG5cbiAgICB2YXIgZ2V0VmFsdWUgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIGlzU3RyaW5nKGl0ZW0udmFsdWUpID8gaXRlbS52YWx1ZSA6ICcnO1xuICAgIH07XG4gICAgdmFyIHNhbml0aXplTGlzdCA9IGZ1bmN0aW9uIChsaXN0LCBleHRyYWN0VmFsdWUpIHtcbiAgICAgIHZhciBvdXQgPSBbXTtcbiAgICAgIGdsb2JhbCQyLmVhY2gobGlzdCwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgdmFyIHRleHQgPSBpc1N0cmluZyhpdGVtLnRleHQpID8gaXRlbS50ZXh0IDogaXNTdHJpbmcoaXRlbS50aXRsZSkgPyBpdGVtLnRpdGxlIDogJyc7XG4gICAgICAgIGlmIChpdGVtLm1lbnUgIT09IHVuZGVmaW5lZCkgOyBlbHNlIHtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBleHRyYWN0VmFsdWUoaXRlbSk7XG4gICAgICAgICAgb3V0LnB1c2goe1xuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBvdXQ7XG4gICAgfTtcbiAgICB2YXIgc2FuaXRpemVXaXRoID0gZnVuY3Rpb24gKGV4dHJhY3Rlcikge1xuICAgICAgaWYgKGV4dHJhY3RlciA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGV4dHJhY3RlciA9IGdldFZhbHVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICAgIHJldHVybiBPcHRpb24uZnJvbShsaXN0KS5tYXAoZnVuY3Rpb24gKGxpc3QpIHtcbiAgICAgICAgICByZXR1cm4gc2FuaXRpemVMaXN0KGxpc3QsIGV4dHJhY3Rlcik7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBzYW5pdGl6ZSA9IGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICByZXR1cm4gc2FuaXRpemVXaXRoKGdldFZhbHVlKShsaXN0KTtcbiAgICB9O1xuICAgIHZhciBjcmVhdGVVaSA9IGZ1bmN0aW9uIChuYW1lLCBsYWJlbCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChpdGVtcykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgdHlwZTogJ3NlbGVjdGJveCcsXG4gICAgICAgICAgbGFiZWw6IGxhYmVsLFxuICAgICAgICAgIGl0ZW1zOiBpdGVtc1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBMaXN0T3B0aW9ucyA9IHtcbiAgICAgIHNhbml0aXplOiBzYW5pdGl6ZSxcbiAgICAgIHNhbml0aXplV2l0aDogc2FuaXRpemVXaXRoLFxuICAgICAgY3JlYXRlVWk6IGNyZWF0ZVVpLFxuICAgICAgZ2V0VmFsdWU6IGdldFZhbHVlXG4gICAgfTtcblxuICAgIHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgZm9yICh2YXIgcCBpbiBzKVxuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXM7XG4gICAgdmFyIGVhY2gkMSA9IGZ1bmN0aW9uIChvYmosIGYpIHtcbiAgICAgIHZhciBwcm9wcyA9IGtleXMob2JqKTtcbiAgICAgIGZvciAodmFyIGsgPSAwLCBsZW4gPSBwcm9wcy5sZW5ndGg7IGsgPCBsZW47IGsrKykge1xuICAgICAgICB2YXIgaSA9IHByb3BzW2tdO1xuICAgICAgICB2YXIgeCA9IG9ialtpXTtcbiAgICAgICAgZih4LCBpKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBvYmpBY2MgPSBmdW5jdGlvbiAocikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh4LCBpKSB7XG4gICAgICAgIHJbaV0gPSB4O1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBpbnRlcm5hbEZpbHRlciA9IGZ1bmN0aW9uIChvYmosIHByZWQsIG9uVHJ1ZSwgb25GYWxzZSkge1xuICAgICAgdmFyIHIgPSB7fTtcbiAgICAgIGVhY2gkMShvYmosIGZ1bmN0aW9uICh4LCBpKSB7XG4gICAgICAgIChwcmVkKHgsIGkpID8gb25UcnVlIDogb25GYWxzZSkoeCwgaSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByO1xuICAgIH07XG4gICAgdmFyIGZpbHRlciA9IGZ1bmN0aW9uIChvYmosIHByZWQpIHtcbiAgICAgIHZhciB0ID0ge307XG4gICAgICBpbnRlcm5hbEZpbHRlcihvYmosIHByZWQsIG9iakFjYyh0KSwgbm9vcCk7XG4gICAgICByZXR1cm4gdDtcbiAgICB9O1xuXG4gICAgdmFyIGhhc1J0Y1BsdWdpbiA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIGlmICgvKF58WyAsXSlydGMoWywgXXwkKS8udGVzdChlZGl0b3IuZ2V0UGFyYW0oJ3BsdWdpbnMnLCAnJywgJ3N0cmluZycpKSAmJiBnbG9iYWwuZ2V0KCdydGMnKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGhhc1Byb3RvY29sID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgcmV0dXJuIC9eXFx3KzovaS50ZXN0KHVybCk7XG4gICAgfTtcbiAgICB2YXIgZ2V0SHJlZiA9IGZ1bmN0aW9uIChlbG0pIHtcbiAgICAgIHZhciBocmVmID0gZWxtLmdldEF0dHJpYnV0ZSgnZGF0YS1tY2UtaHJlZicpO1xuICAgICAgcmV0dXJuIGhyZWYgPyBocmVmIDogZWxtLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgIH07XG4gICAgdmFyIGFwcGx5UmVsVGFyZ2V0UnVsZXMgPSBmdW5jdGlvbiAocmVsLCBpc1Vuc2FmZSkge1xuICAgICAgdmFyIHJ1bGVzID0gWydub29wZW5lciddO1xuICAgICAgdmFyIHJlbHMgPSByZWwgPyByZWwuc3BsaXQoL1xccysvKSA6IFtdO1xuICAgICAgdmFyIHRvU3RyaW5nID0gZnVuY3Rpb24gKHJlbHMpIHtcbiAgICAgICAgcmV0dXJuIGdsb2JhbCQyLnRyaW0ocmVscy5zb3J0KCkuam9pbignICcpKTtcbiAgICAgIH07XG4gICAgICB2YXIgYWRkVGFyZ2V0UnVsZXMgPSBmdW5jdGlvbiAocmVscykge1xuICAgICAgICByZWxzID0gcmVtb3ZlVGFyZ2V0UnVsZXMocmVscyk7XG4gICAgICAgIHJldHVybiByZWxzLmxlbmd0aCA+IDAgPyByZWxzLmNvbmNhdChydWxlcykgOiBydWxlcztcbiAgICAgIH07XG4gICAgICB2YXIgcmVtb3ZlVGFyZ2V0UnVsZXMgPSBmdW5jdGlvbiAocmVscykge1xuICAgICAgICByZXR1cm4gcmVscy5maWx0ZXIoZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIHJldHVybiBnbG9iYWwkMi5pbkFycmF5KHJ1bGVzLCB2YWwpID09PSAtMTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgdmFyIG5ld1JlbHMgPSBpc1Vuc2FmZSA/IGFkZFRhcmdldFJ1bGVzKHJlbHMpIDogcmVtb3ZlVGFyZ2V0UnVsZXMocmVscyk7XG4gICAgICByZXR1cm4gbmV3UmVscy5sZW5ndGggPiAwID8gdG9TdHJpbmcobmV3UmVscykgOiAnJztcbiAgICB9O1xuICAgIHZhciB0cmltQ2FyZXRDb250YWluZXJzID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoL1xcdUZFRkYvZywgJycpO1xuICAgIH07XG4gICAgdmFyIGdldEFuY2hvckVsZW1lbnQgPSBmdW5jdGlvbiAoZWRpdG9yLCBzZWxlY3RlZEVsbSkge1xuICAgICAgc2VsZWN0ZWRFbG0gPSBzZWxlY3RlZEVsbSB8fCBlZGl0b3Iuc2VsZWN0aW9uLmdldE5vZGUoKTtcbiAgICAgIGlmIChpc0ltYWdlRmlndXJlKHNlbGVjdGVkRWxtKSkge1xuICAgICAgICByZXR1cm4gZWRpdG9yLmRvbS5zZWxlY3QoJ2FbaHJlZl0nLCBzZWxlY3RlZEVsbSlbMF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZWRpdG9yLmRvbS5nZXRQYXJlbnQoc2VsZWN0ZWRFbG0sICdhW2hyZWZdJyk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgZ2V0QW5jaG9yVGV4dCA9IGZ1bmN0aW9uIChzZWxlY3Rpb24sIGFuY2hvckVsbSkge1xuICAgICAgdmFyIHRleHQgPSBhbmNob3JFbG0gPyBhbmNob3JFbG0uaW5uZXJUZXh0IHx8IGFuY2hvckVsbS50ZXh0Q29udGVudCA6IHNlbGVjdGlvbi5nZXRDb250ZW50KHsgZm9ybWF0OiAndGV4dCcgfSk7XG4gICAgICByZXR1cm4gdHJpbUNhcmV0Q29udGFpbmVycyh0ZXh0KTtcbiAgICB9O1xuICAgIHZhciBpc0xpbmsgPSBmdW5jdGlvbiAoZWxtKSB7XG4gICAgICByZXR1cm4gZWxtICYmIGVsbS5ub2RlTmFtZSA9PT0gJ0EnICYmICEhZ2V0SHJlZihlbG0pO1xuICAgIH07XG4gICAgdmFyIGhhc0xpbmtzID0gZnVuY3Rpb24gKGVsZW1lbnRzKSB7XG4gICAgICByZXR1cm4gZ2xvYmFsJDIuZ3JlcChlbGVtZW50cywgaXNMaW5rKS5sZW5ndGggPiAwO1xuICAgIH07XG4gICAgdmFyIGlzT25seVRleHRTZWxlY3RlZCA9IGZ1bmN0aW9uIChodG1sKSB7XG4gICAgICBpZiAoLzwvLnRlc3QoaHRtbCkgJiYgKCEvXjxhIFtePl0rPltePF0rPFxcL2E+JC8udGVzdChodG1sKSB8fCBodG1sLmluZGV4T2YoJ2hyZWY9JykgPT09IC0xKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIHZhciBpc0ltYWdlRmlndXJlID0gZnVuY3Rpb24gKGVsbSkge1xuICAgICAgcmV0dXJuIGVsbSAmJiBlbG0ubm9kZU5hbWUgPT09ICdGSUdVUkUnICYmIC9cXGJpbWFnZVxcYi9pLnRlc3QoZWxtLmNsYXNzTmFtZSk7XG4gICAgfTtcbiAgICB2YXIgZ2V0TGlua0F0dHJzID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHJldHVybiBmb2xkbChbXG4gICAgICAgICd0aXRsZScsXG4gICAgICAgICdyZWwnLFxuICAgICAgICAnY2xhc3MnLFxuICAgICAgICAndGFyZ2V0J1xuICAgICAgXSwgZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgIGRhdGFba2V5XS5lYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIGFjY1trZXldID0gdmFsdWUubGVuZ3RoID4gMCA/IHZhbHVlIDogbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCB7IGhyZWY6IGRhdGEuaHJlZiB9KTtcbiAgICB9O1xuICAgIHZhciBoYW5kbGVFeHRlcm5hbFRhcmdldHMgPSBmdW5jdGlvbiAoaHJlZiwgYXNzdW1lRXh0ZXJuYWxUYXJnZXRzKSB7XG4gICAgICBpZiAoKGFzc3VtZUV4dGVybmFsVGFyZ2V0cyA9PT0gJ2h0dHAnIHx8IGFzc3VtZUV4dGVybmFsVGFyZ2V0cyA9PT0gJ2h0dHBzJykgJiYgIWhhc1Byb3RvY29sKGhyZWYpKSB7XG4gICAgICAgIHJldHVybiBhc3N1bWVFeHRlcm5hbFRhcmdldHMgKyAnOi8vJyArIGhyZWY7XG4gICAgICB9XG4gICAgICByZXR1cm4gaHJlZjtcbiAgICB9O1xuICAgIHZhciBhcHBseUxpbmtPdmVycmlkZXMgPSBmdW5jdGlvbiAoZWRpdG9yLCBsaW5rQXR0cnMpIHtcbiAgICAgIHZhciBuZXdMaW5rQXR0cnMgPSBfX2Fzc2lnbih7fSwgbGlua0F0dHJzKTtcbiAgICAgIGlmICghKGdldFJlbExpc3QoZWRpdG9yKS5sZW5ndGggPiAwKSAmJiBhbGxvd1Vuc2FmZUxpbmtUYXJnZXQoZWRpdG9yKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgdmFyIG5ld1JlbCA9IGFwcGx5UmVsVGFyZ2V0UnVsZXMobmV3TGlua0F0dHJzLnJlbCwgbmV3TGlua0F0dHJzLnRhcmdldCA9PT0gJ19ibGFuaycpO1xuICAgICAgICBuZXdMaW5rQXR0cnMucmVsID0gbmV3UmVsID8gbmV3UmVsIDogbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmIChPcHRpb24uZnJvbShuZXdMaW5rQXR0cnMudGFyZ2V0KS5pc05vbmUoKSAmJiBnZXRUYXJnZXRMaXN0KGVkaXRvcikgPT09IGZhbHNlKSB7XG4gICAgICAgIG5ld0xpbmtBdHRycy50YXJnZXQgPSBnZXREZWZhdWx0TGlua1RhcmdldChlZGl0b3IpO1xuICAgICAgfVxuICAgICAgbmV3TGlua0F0dHJzLmhyZWYgPSBoYW5kbGVFeHRlcm5hbFRhcmdldHMobmV3TGlua0F0dHJzLmhyZWYsIGFzc3VtZUV4dGVybmFsVGFyZ2V0cyhlZGl0b3IpKTtcbiAgICAgIHJldHVybiBuZXdMaW5rQXR0cnM7XG4gICAgfTtcbiAgICB2YXIgdXBkYXRlTGluayA9IGZ1bmN0aW9uIChlZGl0b3IsIGFuY2hvckVsbSwgdGV4dCwgbGlua0F0dHJzKSB7XG4gICAgICB0ZXh0LmVhY2goZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgaWYgKGFuY2hvckVsbS5oYXNPd25Qcm9wZXJ0eSgnaW5uZXJUZXh0JykpIHtcbiAgICAgICAgICBhbmNob3JFbG0uaW5uZXJUZXh0ID0gdGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbmNob3JFbG0udGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci5kb20uc2V0QXR0cmlicyhhbmNob3JFbG0sIGxpbmtBdHRycyk7XG4gICAgICBlZGl0b3Iuc2VsZWN0aW9uLnNlbGVjdChhbmNob3JFbG0pO1xuICAgIH07XG4gICAgdmFyIGNyZWF0ZUxpbmsgPSBmdW5jdGlvbiAoZWRpdG9yLCBzZWxlY3RlZEVsbSwgdGV4dCwgbGlua0F0dHJzKSB7XG4gICAgICBpZiAoaXNJbWFnZUZpZ3VyZShzZWxlY3RlZEVsbSkpIHtcbiAgICAgICAgbGlua0ltYWdlRmlndXJlKGVkaXRvciwgc2VsZWN0ZWRFbG0sIGxpbmtBdHRycyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0LmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGVkaXRvci5leGVjQ29tbWFuZCgnbWNlSW5zZXJ0TGluaycsIGZhbHNlLCBsaW5rQXR0cnMpO1xuICAgICAgICB9LCBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICAgIGVkaXRvci5pbnNlcnRDb250ZW50KGVkaXRvci5kb20uY3JlYXRlSFRNTCgnYScsIGxpbmtBdHRycywgZWRpdG9yLmRvbS5lbmNvZGUodGV4dCkpKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgbGlua0RvbU11dGF0aW9uID0gZnVuY3Rpb24gKGVkaXRvciwgYXR0YWNoU3RhdGUsIGRhdGEpIHtcbiAgICAgIHZhciBzZWxlY3RlZEVsbSA9IGVkaXRvci5zZWxlY3Rpb24uZ2V0Tm9kZSgpO1xuICAgICAgdmFyIGFuY2hvckVsbSA9IGdldEFuY2hvckVsZW1lbnQoZWRpdG9yLCBzZWxlY3RlZEVsbSk7XG4gICAgICB2YXIgbGlua0F0dHJzID0gYXBwbHlMaW5rT3ZlcnJpZGVzKGVkaXRvciwgZ2V0TGlua0F0dHJzKGRhdGEpKTtcbiAgICAgIGVkaXRvci51bmRvTWFuYWdlci50cmFuc2FjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChkYXRhLmhyZWYgPT09IGF0dGFjaFN0YXRlLmhyZWYpIHtcbiAgICAgICAgICBhdHRhY2hTdGF0ZS5hdHRhY2goKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYW5jaG9yRWxtKSB7XG4gICAgICAgICAgZWRpdG9yLmZvY3VzKCk7XG4gICAgICAgICAgdXBkYXRlTGluayhlZGl0b3IsIGFuY2hvckVsbSwgZGF0YS50ZXh0LCBsaW5rQXR0cnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNyZWF0ZUxpbmsoZWRpdG9yLCBzZWxlY3RlZEVsbSwgZGF0YS50ZXh0LCBsaW5rQXR0cnMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciB1bmxpbmtEb21NdXRhdGlvbiA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIGVkaXRvci51bmRvTWFuYWdlci50cmFuc2FjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBub2RlID0gZWRpdG9yLnNlbGVjdGlvbi5nZXROb2RlKCk7XG4gICAgICAgIGlmIChpc0ltYWdlRmlndXJlKG5vZGUpKSB7XG4gICAgICAgICAgdW5saW5rSW1hZ2VGaWd1cmUoZWRpdG9yLCBub2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgYW5jaG9yRWxtID0gZWRpdG9yLmRvbS5nZXRQYXJlbnQobm9kZSwgJ2FbaHJlZl0nLCBlZGl0b3IuZ2V0Qm9keSgpKTtcbiAgICAgICAgICBpZiAoYW5jaG9yRWxtKSB7XG4gICAgICAgICAgICBlZGl0b3IuZG9tLnJlbW92ZShhbmNob3JFbG0sIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlZGl0b3IuZm9jdXMoKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHVud3JhcE9wdGlvbnMgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgdmFyIGNscyA9IGRhdGEuY2xhc3MsIGhyZWYgPSBkYXRhLmhyZWYsIHJlbCA9IGRhdGEucmVsLCB0YXJnZXQgPSBkYXRhLnRhcmdldCwgdGV4dCA9IGRhdGEudGV4dCwgdGl0bGUgPSBkYXRhLnRpdGxlO1xuICAgICAgcmV0dXJuIGZpbHRlcih7XG4gICAgICAgIGNsYXNzOiBjbHMuZ2V0T3JOdWxsKCksXG4gICAgICAgIGhyZWY6IGhyZWYsXG4gICAgICAgIHJlbDogcmVsLmdldE9yTnVsbCgpLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldC5nZXRPck51bGwoKSxcbiAgICAgICAgdGV4dDogdGV4dC5nZXRPck51bGwoKSxcbiAgICAgICAgdGl0bGU6IHRpdGxlLmdldE9yTnVsbCgpXG4gICAgICB9LCBmdW5jdGlvbiAodiwgX2spIHtcbiAgICAgICAgcmV0dXJuIGlzTnVsbCh2KSA9PT0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBsaW5rID0gZnVuY3Rpb24gKGVkaXRvciwgYXR0YWNoU3RhdGUsIGRhdGEpIHtcbiAgICAgIGhhc1J0Y1BsdWdpbihlZGl0b3IpID8gZWRpdG9yLmV4ZWNDb21tYW5kKCdjcmVhdGVsaW5rJywgZmFsc2UsIHVud3JhcE9wdGlvbnMoZGF0YSkpIDogbGlua0RvbU11dGF0aW9uKGVkaXRvciwgYXR0YWNoU3RhdGUsIGRhdGEpO1xuICAgIH07XG4gICAgdmFyIHVubGluayA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIGhhc1J0Y1BsdWdpbihlZGl0b3IpID8gZWRpdG9yLmV4ZWNDb21tYW5kKCd1bmxpbmsnKSA6IHVubGlua0RvbU11dGF0aW9uKGVkaXRvcik7XG4gICAgfTtcbiAgICB2YXIgdW5saW5rSW1hZ2VGaWd1cmUgPSBmdW5jdGlvbiAoZWRpdG9yLCBmaWcpIHtcbiAgICAgIHZhciBpbWcgPSBlZGl0b3IuZG9tLnNlbGVjdCgnaW1nJywgZmlnKVswXTtcbiAgICAgIGlmIChpbWcpIHtcbiAgICAgICAgdmFyIGEgPSBlZGl0b3IuZG9tLmdldFBhcmVudHMoaW1nLCAnYVtocmVmXScsIGZpZylbMF07XG4gICAgICAgIGlmIChhKSB7XG4gICAgICAgICAgYS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShpbWcsIGEpO1xuICAgICAgICAgIGVkaXRvci5kb20ucmVtb3ZlKGEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgbGlua0ltYWdlRmlndXJlID0gZnVuY3Rpb24gKGVkaXRvciwgZmlnLCBhdHRycykge1xuICAgICAgdmFyIGltZyA9IGVkaXRvci5kb20uc2VsZWN0KCdpbWcnLCBmaWcpWzBdO1xuICAgICAgaWYgKGltZykge1xuICAgICAgICB2YXIgYSA9IGVkaXRvci5kb20uY3JlYXRlKCdhJywgYXR0cnMpO1xuICAgICAgICBpbWcucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYSwgaW1nKTtcbiAgICAgICAgYS5hcHBlbmRDaGlsZChpbWcpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgZmluZFRleHRCeVZhbHVlID0gZnVuY3Rpb24gKHZhbHVlLCBjYXRhbG9nKSB7XG4gICAgICByZXR1cm4gZmluZE1hcChjYXRhbG9nLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gc29tZUlmKGl0ZW0udmFsdWUgPT09IHZhbHVlLCBpdGVtKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGdldERlbHRhID0gZnVuY3Rpb24gKHBlcnNpc3RlbnRUZXh0LCBmaWVsZE5hbWUsIGNhdGFsb2csIGRhdGEpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGRhdGFbZmllbGROYW1lXTtcbiAgICAgIHZhciBoYXNQZXJzaXN0ZW50VGV4dCA9IHBlcnNpc3RlbnRUZXh0Lmxlbmd0aCA+IDA7XG4gICAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCA/IGZpbmRUZXh0QnlWYWx1ZSh2YWx1ZSwgY2F0YWxvZykubWFwKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdXJsOiB7XG4gICAgICAgICAgICB2YWx1ZTogaS52YWx1ZSxcbiAgICAgICAgICAgIG1ldGE6IHtcbiAgICAgICAgICAgICAgdGV4dDogaGFzUGVyc2lzdGVudFRleHQgPyBwZXJzaXN0ZW50VGV4dCA6IGkudGV4dCxcbiAgICAgICAgICAgICAgYXR0YWNoOiBub29wXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICB0ZXh0OiBoYXNQZXJzaXN0ZW50VGV4dCA/IHBlcnNpc3RlbnRUZXh0IDogaS50ZXh0XG4gICAgICAgIH07XG4gICAgICB9KSA6IE9wdGlvbi5ub25lKCk7XG4gICAgfTtcbiAgICB2YXIgZmluZENhdGFsb2cgPSBmdW5jdGlvbiAoY2F0YWxvZ3MsIGZpZWxkTmFtZSkge1xuICAgICAgaWYgKGZpZWxkTmFtZSA9PT0gJ2xpbmsnKSB7XG4gICAgICAgIHJldHVybiBjYXRhbG9ncy5saW5rO1xuICAgICAgfSBlbHNlIGlmIChmaWVsZE5hbWUgPT09ICdhbmNob3InKSB7XG4gICAgICAgIHJldHVybiBjYXRhbG9ncy5hbmNob3I7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gT3B0aW9uLm5vbmUoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKGluaXRpYWxEYXRhLCBsaW5rQ2F0YWxvZykge1xuICAgICAgdmFyIHBlcnNpc3RlbnREYXRhID0ge1xuICAgICAgICB0ZXh0OiBpbml0aWFsRGF0YS50ZXh0LFxuICAgICAgICB0aXRsZTogaW5pdGlhbERhdGEudGl0bGVcbiAgICAgIH07XG4gICAgICB2YXIgZ2V0VGl0bGVGcm9tVXJsQ2hhbmdlID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICByZXR1cm4gc29tZUlmKHBlcnNpc3RlbnREYXRhLnRpdGxlLmxlbmd0aCA8PSAwLCBPcHRpb24uZnJvbSh1cmwubWV0YS50aXRsZSkuZ2V0T3IoJycpKTtcbiAgICAgIH07XG4gICAgICB2YXIgZ2V0VGV4dEZyb21VcmxDaGFuZ2UgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgIHJldHVybiBzb21lSWYocGVyc2lzdGVudERhdGEudGV4dC5sZW5ndGggPD0gMCwgT3B0aW9uLmZyb20odXJsLm1ldGEudGV4dCkuZ2V0T3IodXJsLnZhbHVlKSk7XG4gICAgICB9O1xuICAgICAgdmFyIG9uVXJsQ2hhbmdlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIHRleHQgPSBnZXRUZXh0RnJvbVVybENoYW5nZShkYXRhLnVybCk7XG4gICAgICAgIHZhciB0aXRsZSA9IGdldFRpdGxlRnJvbVVybENoYW5nZShkYXRhLnVybCk7XG4gICAgICAgIGlmICh0ZXh0LmlzU29tZSgpIHx8IHRpdGxlLmlzU29tZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIE9wdGlvbi5zb21lKF9fYXNzaWduKF9fYXNzaWduKHt9LCB0ZXh0Lm1hcChmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgdGV4dDogdGV4dCB9O1xuICAgICAgICAgIH0pLmdldE9yKHt9KSksIHRpdGxlLm1hcChmdW5jdGlvbiAodGl0bGUpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHRpdGxlOiB0aXRsZSB9O1xuICAgICAgICAgIH0pLmdldE9yKHt9KSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdmFyIG9uQ2F0YWxvZ0NoYW5nZSA9IGZ1bmN0aW9uIChkYXRhLCBjaGFuZ2UpIHtcbiAgICAgICAgdmFyIGNhdGFsb2cgPSBmaW5kQ2F0YWxvZyhsaW5rQ2F0YWxvZywgY2hhbmdlLm5hbWUpLmdldE9yKFtdKTtcbiAgICAgICAgcmV0dXJuIGdldERlbHRhKHBlcnNpc3RlbnREYXRhLnRleHQsIGNoYW5nZS5uYW1lLCBjYXRhbG9nLCBkYXRhKTtcbiAgICAgIH07XG4gICAgICB2YXIgb25DaGFuZ2UgPSBmdW5jdGlvbiAoZ2V0RGF0YSwgY2hhbmdlKSB7XG4gICAgICAgIHZhciBuYW1lID0gY2hhbmdlLm5hbWU7XG4gICAgICAgIGlmIChuYW1lID09PSAndXJsJykge1xuICAgICAgICAgIHJldHVybiBvblVybENoYW5nZShnZXREYXRhKCkpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbnRhaW5zKFtcbiAgICAgICAgICAgICdhbmNob3InLFxuICAgICAgICAgICAgJ2xpbmsnXG4gICAgICAgICAgXSwgbmFtZSkpIHtcbiAgICAgICAgICByZXR1cm4gb25DYXRhbG9nQ2hhbmdlKGdldERhdGEoKSwgY2hhbmdlKTtcbiAgICAgICAgfSBlbHNlIGlmIChuYW1lID09PSAndGV4dCcgfHwgbmFtZSA9PT0gJ3RpdGxlJykge1xuICAgICAgICAgIHBlcnNpc3RlbnREYXRhW25hbWVdID0gZ2V0RGF0YSgpW25hbWVdO1xuICAgICAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHsgb25DaGFuZ2U6IG9uQ2hhbmdlIH07XG4gICAgfTtcbiAgICB2YXIgRGlhbG9nQ2hhbmdlcyA9IHtcbiAgICAgIGluaXQ6IGluaXQsXG4gICAgICBnZXREZWx0YTogZ2V0RGVsdGFcbiAgICB9O1xuXG4gICAgdmFyIGdsb2JhbCQzID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UudXRpbC5EZWxheScpO1xuXG4gICAgdmFyIGdsb2JhbCQ0ID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UudXRpbC5Qcm9taXNlJyk7XG5cbiAgICB2YXIgZGVsYXllZENvbmZpcm0gPSBmdW5jdGlvbiAoZWRpdG9yLCBtZXNzYWdlLCBjYWxsYmFjaykge1xuICAgICAgdmFyIHJuZyA9IGVkaXRvci5zZWxlY3Rpb24uZ2V0Um5nKCk7XG4gICAgICBnbG9iYWwkMy5zZXRFZGl0b3JUaW1lb3V0KGVkaXRvciwgZnVuY3Rpb24gKCkge1xuICAgICAgICBlZGl0b3Iud2luZG93TWFuYWdlci5jb25maXJtKG1lc3NhZ2UsIGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICAgIGVkaXRvci5zZWxlY3Rpb24uc2V0Um5nKHJuZyk7XG4gICAgICAgICAgY2FsbGJhY2soc3RhdGUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHRyeUVtYWlsVHJhbnNmb3JtID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciB1cmwgPSBkYXRhLmhyZWY7XG4gICAgICB2YXIgc3VnZ2VzdE1haWxUbyA9IHVybC5pbmRleE9mKCdAJykgPiAwICYmIHVybC5pbmRleE9mKCcvJykgPT09IC0xICYmIHVybC5pbmRleE9mKCdtYWlsdG86JykgPT09IC0xO1xuICAgICAgcmV0dXJuIHN1Z2dlc3RNYWlsVG8gPyBPcHRpb24uc29tZSh7XG4gICAgICAgIG1lc3NhZ2U6ICdUaGUgVVJMIHlvdSBlbnRlcmVkIHNlZW1zIHRvIGJlIGFuIGVtYWlsIGFkZHJlc3MuIERvIHlvdSB3YW50IHRvIGFkZCB0aGUgcmVxdWlyZWQgbWFpbHRvOiBwcmVmaXg/JyxcbiAgICAgICAgcHJlcHJvY2VzczogZnVuY3Rpb24gKG9sZERhdGEpIHtcbiAgICAgICAgICByZXR1cm4gX19hc3NpZ24oX19hc3NpZ24oe30sIG9sZERhdGEpLCB7IGhyZWY6ICdtYWlsdG86JyArIHVybCB9KTtcbiAgICAgICAgfVxuICAgICAgfSkgOiBPcHRpb24ubm9uZSgpO1xuICAgIH07XG4gICAgdmFyIHRyeVByb3RvY29sVHJhbnNmb3JtID0gZnVuY3Rpb24gKGFzc3VtZUV4dGVybmFsVGFyZ2V0cywgZGVmYXVsdExpbmtQcm90b2NvbCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciB1cmwgPSBkYXRhLmhyZWY7XG4gICAgICAgIHZhciBzdWdnZXN0UHJvdG9jb2wgPSBhc3N1bWVFeHRlcm5hbFRhcmdldHMgPT09IDEgJiYgIWhhc1Byb3RvY29sKHVybCkgfHwgYXNzdW1lRXh0ZXJuYWxUYXJnZXRzID09PSAwICYmIC9eXFxzKnd3d1tcXC58XFxkXFwuXS9pLnRlc3QodXJsKTtcbiAgICAgICAgcmV0dXJuIHN1Z2dlc3RQcm90b2NvbCA/IE9wdGlvbi5zb21lKHtcbiAgICAgICAgICBtZXNzYWdlOiAnVGhlIFVSTCB5b3UgZW50ZXJlZCBzZWVtcyB0byBiZSBhbiBleHRlcm5hbCBsaW5rLiBEbyB5b3Ugd2FudCB0byBhZGQgdGhlIHJlcXVpcmVkICcgKyBkZWZhdWx0TGlua1Byb3RvY29sICsgJzovLyBwcmVmaXg/JyxcbiAgICAgICAgICBwcmVwcm9jZXNzOiBmdW5jdGlvbiAob2xkRGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXNzaWduKF9fYXNzaWduKHt9LCBvbGREYXRhKSwgeyBocmVmOiBkZWZhdWx0TGlua1Byb3RvY29sICsgJzovLycgKyB1cmwgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSA6IE9wdGlvbi5ub25lKCk7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHByZXByb2Nlc3MgPSBmdW5jdGlvbiAoZWRpdG9yLCBkYXRhKSB7XG4gICAgICByZXR1cm4gZmluZE1hcChbXG4gICAgICAgIHRyeUVtYWlsVHJhbnNmb3JtLFxuICAgICAgICB0cnlQcm90b2NvbFRyYW5zZm9ybShhc3N1bWVFeHRlcm5hbFRhcmdldHMoZWRpdG9yKSwgZ2V0RGVmYXVsdExpbmtQcm90b2NvbChlZGl0b3IpKVxuICAgICAgXSwgZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgcmV0dXJuIGYoZGF0YSk7XG4gICAgICB9KS5mb2xkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGdsb2JhbCQ0LnJlc29sdmUoZGF0YSk7XG4gICAgICB9LCBmdW5jdGlvbiAodHJhbnNmb3JtKSB7XG4gICAgICAgIHJldHVybiBuZXcgZ2xvYmFsJDQoZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgZGVsYXllZENvbmZpcm0oZWRpdG9yLCB0cmFuc2Zvcm0ubWVzc2FnZSwgZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhzdGF0ZSA/IHRyYW5zZm9ybS5wcmVwcm9jZXNzKGRhdGEpIDogZGF0YSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgRGlhbG9nQ29uZmlybXMgPSB7IHByZXByb2Nlc3M6IHByZXByb2Nlc3MgfTtcblxuICAgIHZhciBnZXRBbmNob3JzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGFuY2hvck5vZGVzID0gZWRpdG9yLmRvbS5zZWxlY3QoJ2E6bm90KFtocmVmXSknKTtcbiAgICAgIHZhciBhbmNob3JzID0gYmluZChhbmNob3JOb2RlcywgZnVuY3Rpb24gKGFuY2hvcikge1xuICAgICAgICB2YXIgaWQgPSBhbmNob3IubmFtZSB8fCBhbmNob3IuaWQ7XG4gICAgICAgIHJldHVybiBpZCA/IFt7XG4gICAgICAgICAgICB0ZXh0OiBpZCxcbiAgICAgICAgICAgIHZhbHVlOiAnIycgKyBpZFxuICAgICAgICAgIH1dIDogW107XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBhbmNob3JzLmxlbmd0aCA+IDAgPyBPcHRpb24uc29tZShbe1xuICAgICAgICAgIHRleHQ6ICdOb25lJyxcbiAgICAgICAgICB2YWx1ZTogJydcbiAgICAgICAgfV0uY29uY2F0KGFuY2hvcnMpKSA6IE9wdGlvbi5ub25lKCk7XG4gICAgfTtcbiAgICB2YXIgQW5jaG9yTGlzdE9wdGlvbnMgPSB7IGdldEFuY2hvcnM6IGdldEFuY2hvcnMgfTtcblxuICAgIHZhciBnZXRDbGFzc2VzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGxpc3QgPSBnZXRMaW5rQ2xhc3NMaXN0KGVkaXRvcik7XG4gICAgICBpZiAobGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBMaXN0T3B0aW9ucy5zYW5pdGl6ZShsaXN0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgIH07XG4gICAgdmFyIENsYXNzTGlzdE9wdGlvbnMgPSB7IGdldENsYXNzZXM6IGdldENsYXNzZXMgfTtcblxuICAgIHZhciBnbG9iYWwkNSA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuWEhSJyk7XG5cbiAgICB2YXIgcGFyc2VKc29uID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBPcHRpb24uc29tZShKU09OLnBhcnNlKHRleHQpKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXR1cm4gT3B0aW9uLm5vbmUoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBnZXRMaW5rcyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBleHRyYWN0b3IgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gZWRpdG9yLmNvbnZlcnRVUkwoaXRlbS52YWx1ZSB8fCBpdGVtLnVybCwgJ2hyZWYnKTtcbiAgICAgIH07XG4gICAgICB2YXIgbGlua0xpc3QgPSBnZXRMaW5rTGlzdChlZGl0b3IpO1xuICAgICAgcmV0dXJuIG5ldyBnbG9iYWwkNChmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKGlzU3RyaW5nKGxpbmtMaXN0KSkge1xuICAgICAgICAgIGdsb2JhbCQ1LnNlbmQoe1xuICAgICAgICAgICAgdXJsOiBsaW5rTGlzdCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhwYXJzZUpzb24odGV4dCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoXykge1xuICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soT3B0aW9uLm5vbmUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbihsaW5rTGlzdCkpIHtcbiAgICAgICAgICBsaW5rTGlzdChmdW5jdGlvbiAob3V0cHV0KSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soT3B0aW9uLnNvbWUob3V0cHV0KSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2FsbGJhY2soT3B0aW9uLmZyb20obGlua0xpc3QpKTtcbiAgICAgICAgfVxuICAgICAgfSkudGhlbihmdW5jdGlvbiAob3B0SXRlbXMpIHtcbiAgICAgICAgcmV0dXJuIG9wdEl0ZW1zLmJpbmQoTGlzdE9wdGlvbnMuc2FuaXRpemVXaXRoKGV4dHJhY3RvcikpLm1hcChmdW5jdGlvbiAoaXRlbXMpIHtcbiAgICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFt7XG4gICAgICAgICAgICAgICAgdGV4dDogJ05vbmUnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAnJ1xuICAgICAgICAgICAgICB9XS5jb25jYXQoaXRlbXMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbXM7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIExpbmtMaXN0T3B0aW9ucyA9IHsgZ2V0TGlua3M6IGdldExpbmtzIH07XG5cbiAgICB2YXIgZ2V0UmVscyA9IGZ1bmN0aW9uIChlZGl0b3IsIGluaXRpYWxUYXJnZXQpIHtcbiAgICAgIHZhciBsaXN0ID0gZ2V0UmVsTGlzdChlZGl0b3IpO1xuICAgICAgaWYgKGxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgaXNUYXJnZXRCbGFua18xID0gaW5pdGlhbFRhcmdldC5pcygnX2JsYW5rJyk7XG4gICAgICAgIHZhciBlbmZvcmNlU2FmZSA9IGFsbG93VW5zYWZlTGlua1RhcmdldChlZGl0b3IpID09PSBmYWxzZTtcbiAgICAgICAgdmFyIHNhZmVSZWxFeHRyYWN0b3IgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgIHJldHVybiBhcHBseVJlbFRhcmdldFJ1bGVzKExpc3RPcHRpb25zLmdldFZhbHVlKGl0ZW0pLCBpc1RhcmdldEJsYW5rXzEpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgc2FuaXRpemVyID0gZW5mb3JjZVNhZmUgPyBMaXN0T3B0aW9ucy5zYW5pdGl6ZVdpdGgoc2FmZVJlbEV4dHJhY3RvcikgOiBMaXN0T3B0aW9ucy5zYW5pdGl6ZTtcbiAgICAgICAgcmV0dXJuIHNhbml0aXplcihsaXN0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgIH07XG4gICAgdmFyIFJlbE9wdGlvbnMgPSB7IGdldFJlbHM6IGdldFJlbHMgfTtcblxuICAgIHZhciBmYWxsYmFja3MgPSBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdDdXJyZW50IHdpbmRvdycsXG4gICAgICAgIHZhbHVlOiAnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ05ldyB3aW5kb3cnLFxuICAgICAgICB2YWx1ZTogJ19ibGFuaydcbiAgICAgIH1cbiAgICBdO1xuICAgIHZhciBnZXRUYXJnZXRzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGxpc3QgPSBnZXRUYXJnZXRMaXN0KGVkaXRvcik7XG4gICAgICBpZiAoaXNBcnJheShsaXN0KSkge1xuICAgICAgICByZXR1cm4gTGlzdE9wdGlvbnMuc2FuaXRpemUobGlzdCkub3JUaHVuayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIE9wdGlvbi5zb21lKGZhbGxiYWNrcyk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gT3B0aW9uLm5vbmUoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBPcHRpb24uc29tZShmYWxsYmFja3MpO1xuICAgIH07XG4gICAgdmFyIFRhcmdldE9wdGlvbnMgPSB7IGdldFRhcmdldHM6IGdldFRhcmdldHMgfTtcblxuICAgIHZhciBub25FbXB0eUF0dHIgPSBmdW5jdGlvbiAoZG9tLCBlbGVtLCBuYW1lKSB7XG4gICAgICB2YXIgdmFsID0gZG9tLmdldEF0dHJpYihlbGVtLCBuYW1lKTtcbiAgICAgIHJldHVybiB2YWwgIT09IG51bGwgJiYgdmFsLmxlbmd0aCA+IDAgPyBPcHRpb24uc29tZSh2YWwpIDogT3B0aW9uLm5vbmUoKTtcbiAgICB9O1xuICAgIHZhciBleHRyYWN0RnJvbUFuY2hvciA9IGZ1bmN0aW9uIChlZGl0b3IsIGFuY2hvcikge1xuICAgICAgdmFyIGRvbSA9IGVkaXRvci5kb207XG4gICAgICB2YXIgb25seVRleHQgPSBpc09ubHlUZXh0U2VsZWN0ZWQoZWRpdG9yLnNlbGVjdGlvbi5nZXRDb250ZW50KCkpO1xuICAgICAgdmFyIHRleHQgPSBvbmx5VGV4dCA/IE9wdGlvbi5zb21lKGdldEFuY2hvclRleHQoZWRpdG9yLnNlbGVjdGlvbiwgYW5jaG9yKSkgOiBPcHRpb24ubm9uZSgpO1xuICAgICAgdmFyIHVybCA9IGFuY2hvciA/IE9wdGlvbi5zb21lKGRvbS5nZXRBdHRyaWIoYW5jaG9yLCAnaHJlZicpKSA6IE9wdGlvbi5ub25lKCk7XG4gICAgICB2YXIgdGFyZ2V0ID0gYW5jaG9yID8gT3B0aW9uLmZyb20oZG9tLmdldEF0dHJpYihhbmNob3IsICd0YXJnZXQnKSkgOiBPcHRpb24ubm9uZSgpO1xuICAgICAgdmFyIHJlbCA9IG5vbkVtcHR5QXR0cihkb20sIGFuY2hvciwgJ3JlbCcpO1xuICAgICAgdmFyIGxpbmtDbGFzcyA9IG5vbkVtcHR5QXR0cihkb20sIGFuY2hvciwgJ2NsYXNzJyk7XG4gICAgICB2YXIgdGl0bGUgPSBub25FbXB0eUF0dHIoZG9tLCBhbmNob3IsICd0aXRsZScpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIHJlbDogcmVsLFxuICAgICAgICBsaW5rQ2xhc3M6IGxpbmtDbGFzc1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBjb2xsZWN0ID0gZnVuY3Rpb24gKGVkaXRvciwgbGlua05vZGUpIHtcbiAgICAgIHJldHVybiBMaW5rTGlzdE9wdGlvbnMuZ2V0TGlua3MoZWRpdG9yKS50aGVuKGZ1bmN0aW9uIChsaW5rcykge1xuICAgICAgICB2YXIgYW5jaG9yID0gZXh0cmFjdEZyb21BbmNob3IoZWRpdG9yLCBsaW5rTm9kZSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYW5jaG9yOiBhbmNob3IsXG4gICAgICAgICAgY2F0YWxvZ3M6IHtcbiAgICAgICAgICAgIHRhcmdldHM6IFRhcmdldE9wdGlvbnMuZ2V0VGFyZ2V0cyhlZGl0b3IpLFxuICAgICAgICAgICAgcmVsczogUmVsT3B0aW9ucy5nZXRSZWxzKGVkaXRvciwgYW5jaG9yLnRhcmdldCksXG4gICAgICAgICAgICBjbGFzc2VzOiBDbGFzc0xpc3RPcHRpb25zLmdldENsYXNzZXMoZWRpdG9yKSxcbiAgICAgICAgICAgIGFuY2hvcjogQW5jaG9yTGlzdE9wdGlvbnMuZ2V0QW5jaG9ycyhlZGl0b3IpLFxuICAgICAgICAgICAgbGluazogbGlua3NcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9wdE5vZGU6IE9wdGlvbi5mcm9tKGxpbmtOb2RlKSxcbiAgICAgICAgICBmbGFnczogeyB0aXRsZUVuYWJsZWQ6IHNob3VsZFNob3dMaW5rVGl0bGUoZWRpdG9yKSB9XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBEaWFsb2dJbmZvID0geyBjb2xsZWN0OiBjb2xsZWN0IH07XG5cbiAgICB2YXIgaGFuZGxlU3VibWl0ID0gZnVuY3Rpb24gKGVkaXRvciwgaW5mbykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhcGkpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBhcGkuZ2V0RGF0YSgpO1xuICAgICAgICBpZiAoIWRhdGEudXJsLnZhbHVlKSB7XG4gICAgICAgICAgdW5saW5rKGVkaXRvcik7XG4gICAgICAgICAgYXBpLmNsb3NlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBnZXRDaGFuZ2VkVmFsdWUgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIE9wdGlvbi5mcm9tKGRhdGFba2V5XSkuZmlsdGVyKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuICFpbmZvLmFuY2hvcltrZXldLmlzKHZhbHVlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGNoYW5nZWREYXRhID0ge1xuICAgICAgICAgIGhyZWY6IGRhdGEudXJsLnZhbHVlLFxuICAgICAgICAgIHRleHQ6IGdldENoYW5nZWRWYWx1ZSgndGV4dCcpLFxuICAgICAgICAgIHRhcmdldDogZ2V0Q2hhbmdlZFZhbHVlKCd0YXJnZXQnKSxcbiAgICAgICAgICByZWw6IGdldENoYW5nZWRWYWx1ZSgncmVsJyksXG4gICAgICAgICAgY2xhc3M6IGdldENoYW5nZWRWYWx1ZSgnbGlua0NsYXNzJyksXG4gICAgICAgICAgdGl0bGU6IGdldENoYW5nZWRWYWx1ZSgndGl0bGUnKVxuICAgICAgICB9O1xuICAgICAgICB2YXIgYXR0YWNoU3RhdGUgPSB7XG4gICAgICAgICAgaHJlZjogZGF0YS51cmwudmFsdWUsXG4gICAgICAgICAgYXR0YWNoOiBkYXRhLnVybC5tZXRhICE9PSB1bmRlZmluZWQgJiYgZGF0YS51cmwubWV0YS5hdHRhY2ggPyBkYXRhLnVybC5tZXRhLmF0dGFjaCA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIERpYWxvZ0NvbmZpcm1zLnByZXByb2Nlc3MoZWRpdG9yLCBjaGFuZ2VkRGF0YSkudGhlbihmdW5jdGlvbiAocERhdGEpIHtcbiAgICAgICAgICBsaW5rKGVkaXRvciwgYXR0YWNoU3RhdGUsIHBEYXRhKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFwaS5jbG9zZSgpO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBjb2xsZWN0RGF0YSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBhbmNob3JOb2RlID0gZ2V0QW5jaG9yRWxlbWVudChlZGl0b3IpO1xuICAgICAgcmV0dXJuIERpYWxvZ0luZm8uY29sbGVjdChlZGl0b3IsIGFuY2hvck5vZGUpO1xuICAgIH07XG4gICAgdmFyIGdldEluaXRpYWxEYXRhID0gZnVuY3Rpb24gKGluZm8sIGRlZmF1bHRUYXJnZXQpIHtcbiAgICAgIHZhciBhbmNob3IgPSBpbmZvLmFuY2hvcjtcbiAgICAgIHZhciB1cmwgPSBhbmNob3IudXJsLmdldE9yKCcnKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVybDoge1xuICAgICAgICAgIHZhbHVlOiB1cmwsXG4gICAgICAgICAgbWV0YTogeyBvcmlnaW5hbDogeyB2YWx1ZTogdXJsIH0gfVxuICAgICAgICB9LFxuICAgICAgICB0ZXh0OiBhbmNob3IudGV4dC5nZXRPcignJyksXG4gICAgICAgIHRpdGxlOiBhbmNob3IudGl0bGUuZ2V0T3IoJycpLFxuICAgICAgICBhbmNob3I6IHVybCxcbiAgICAgICAgbGluazogdXJsLFxuICAgICAgICByZWw6IGFuY2hvci5yZWwuZ2V0T3IoJycpLFxuICAgICAgICB0YXJnZXQ6IGFuY2hvci50YXJnZXQub3IoZGVmYXVsdFRhcmdldCkuZ2V0T3IoJycpLFxuICAgICAgICBsaW5rQ2xhc3M6IGFuY2hvci5saW5rQ2xhc3MuZ2V0T3IoJycpXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIG1ha2VEaWFsb2cgPSBmdW5jdGlvbiAoc2V0dGluZ3MsIG9uU3VibWl0LCBlZGl0b3IpIHtcbiAgICAgIHZhciB1cmxJbnB1dCA9IFt7XG4gICAgICAgICAgbmFtZTogJ3VybCcsXG4gICAgICAgICAgdHlwZTogJ3VybGlucHV0JyxcbiAgICAgICAgICBmaWxldHlwZTogJ2ZpbGUnLFxuICAgICAgICAgIGxhYmVsOiAnVVJMJ1xuICAgICAgICB9XTtcbiAgICAgIHZhciBkaXNwbGF5VGV4dCA9IHNldHRpbmdzLmFuY2hvci50ZXh0Lm1hcChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbmFtZTogJ3RleHQnLFxuICAgICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgICAgbGFiZWw6ICdUZXh0IHRvIGRpc3BsYXknXG4gICAgICAgIH07XG4gICAgICB9KS50b0FycmF5KCk7XG4gICAgICB2YXIgdGl0bGVUZXh0ID0gc2V0dGluZ3MuZmxhZ3MudGl0bGVFbmFibGVkID8gW3tcbiAgICAgICAgICBuYW1lOiAndGl0bGUnLFxuICAgICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgICAgbGFiZWw6ICdUaXRsZSdcbiAgICAgICAgfV0gOiBbXTtcbiAgICAgIHZhciBkZWZhdWx0VGFyZ2V0ID0gT3B0aW9uLmZyb20oZ2V0RGVmYXVsdExpbmtUYXJnZXQoZWRpdG9yKSk7XG4gICAgICB2YXIgaW5pdGlhbERhdGEgPSBnZXRJbml0aWFsRGF0YShzZXR0aW5ncywgZGVmYXVsdFRhcmdldCk7XG4gICAgICB2YXIgY2F0YWxvZ3MgPSBzZXR0aW5ncy5jYXRhbG9ncztcbiAgICAgIHZhciBkaWFsb2dEZWx0YSA9IERpYWxvZ0NoYW5nZXMuaW5pdChpbml0aWFsRGF0YSwgY2F0YWxvZ3MpO1xuICAgICAgdmFyIGJvZHkgPSB7XG4gICAgICAgIHR5cGU6ICdwYW5lbCcsXG4gICAgICAgIGl0ZW1zOiBmbGF0dGVuKFtcbiAgICAgICAgICB1cmxJbnB1dCxcbiAgICAgICAgICBkaXNwbGF5VGV4dCxcbiAgICAgICAgICB0aXRsZVRleHQsXG4gICAgICAgICAgY2F0KFtcbiAgICAgICAgICAgIGNhdGFsb2dzLmFuY2hvci5tYXAoTGlzdE9wdGlvbnMuY3JlYXRlVWkoJ2FuY2hvcicsICdBbmNob3JzJykpLFxuICAgICAgICAgICAgY2F0YWxvZ3MucmVscy5tYXAoTGlzdE9wdGlvbnMuY3JlYXRlVWkoJ3JlbCcsICdSZWwnKSksXG4gICAgICAgICAgICBjYXRhbG9ncy50YXJnZXRzLm1hcChMaXN0T3B0aW9ucy5jcmVhdGVVaSgndGFyZ2V0JywgJ09wZW4gbGluayBpbi4uLicpKSxcbiAgICAgICAgICAgIGNhdGFsb2dzLmxpbmsubWFwKExpc3RPcHRpb25zLmNyZWF0ZVVpKCdsaW5rJywgJ0xpbmsgbGlzdCcpKSxcbiAgICAgICAgICAgIGNhdGFsb2dzLmNsYXNzZXMubWFwKExpc3RPcHRpb25zLmNyZWF0ZVVpKCdsaW5rQ2xhc3MnLCAnQ2xhc3MnKSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRpdGxlOiAnSW5zZXJ0L0VkaXQgTGluaycsXG4gICAgICAgIHNpemU6ICdub3JtYWwnLFxuICAgICAgICBib2R5OiBib2R5LFxuICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2NhbmNlbCcsXG4gICAgICAgICAgICBuYW1lOiAnY2FuY2VsJyxcbiAgICAgICAgICAgIHRleHQ6ICdDYW5jZWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnc3VibWl0JyxcbiAgICAgICAgICAgIG5hbWU6ICdzYXZlJyxcbiAgICAgICAgICAgIHRleHQ6ICdTYXZlJyxcbiAgICAgICAgICAgIHByaW1hcnk6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGluaXRpYWxEYXRhOiBpbml0aWFsRGF0YSxcbiAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChhcGksIF9hKSB7XG4gICAgICAgICAgdmFyIG5hbWUgPSBfYS5uYW1lO1xuICAgICAgICAgIGRpYWxvZ0RlbHRhLm9uQ2hhbmdlKGFwaS5nZXREYXRhLCB7IG5hbWU6IG5hbWUgfSkuZWFjaChmdW5jdGlvbiAobmV3RGF0YSkge1xuICAgICAgICAgICAgYXBpLnNldERhdGEobmV3RGF0YSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uU3VibWl0OiBvblN1Ym1pdFxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBvcGVuID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGRhdGEgPSBjb2xsZWN0RGF0YShlZGl0b3IpO1xuICAgICAgZGF0YS50aGVuKGZ1bmN0aW9uIChpbmZvKSB7XG4gICAgICAgIHZhciBvblN1Ym1pdCA9IGhhbmRsZVN1Ym1pdChlZGl0b3IsIGluZm8pO1xuICAgICAgICByZXR1cm4gbWFrZURpYWxvZyhpbmZvLCBvblN1Ym1pdCwgZWRpdG9yKTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHNwZWMpIHtcbiAgICAgICAgZWRpdG9yLndpbmRvd01hbmFnZXIub3BlbihzcGVjKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgYXBwZW5kQ2xpY2tSZW1vdmUgPSBmdW5jdGlvbiAobGluaywgZXZ0KSB7XG4gICAgICBkb21HbG9iYWxzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICBsaW5rLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICAgIGRvbUdsb2JhbHMuZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKTtcbiAgICB9O1xuICAgIHZhciBvcGVuJDEgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICB2YXIgbGluayA9IGRvbUdsb2JhbHMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgbGluay50YXJnZXQgPSAnX2JsYW5rJztcbiAgICAgIGxpbmsuaHJlZiA9IHVybDtcbiAgICAgIGxpbmsucmVsID0gJ25vcmVmZXJyZXIgbm9vcGVuZXInO1xuICAgICAgdmFyIGV2dCA9IGRvbUdsb2JhbHMuZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnRzJyk7XG4gICAgICBldnQuaW5pdE1vdXNlRXZlbnQoJ2NsaWNrJywgdHJ1ZSwgdHJ1ZSwgZG9tR2xvYmFscy53aW5kb3csIDAsIDAsIDAsIDAsIDAsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAwLCBudWxsKTtcbiAgICAgIGFwcGVuZENsaWNrUmVtb3ZlKGxpbmssIGV2dCk7XG4gICAgfTtcblxuICAgIHZhciBnZXRMaW5rID0gZnVuY3Rpb24gKGVkaXRvciwgZWxtKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmRvbS5nZXRQYXJlbnQoZWxtLCAnYVtocmVmXScpO1xuICAgIH07XG4gICAgdmFyIGdldFNlbGVjdGVkTGluayA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBnZXRMaW5rKGVkaXRvciwgZWRpdG9yLnNlbGVjdGlvbi5nZXRTdGFydCgpKTtcbiAgICB9O1xuICAgIHZhciBoYXNPbmx5QWx0TW9kaWZpZXIgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIGUuYWx0S2V5ID09PSB0cnVlICYmIGUuc2hpZnRLZXkgPT09IGZhbHNlICYmIGUuY3RybEtleSA9PT0gZmFsc2UgJiYgZS5tZXRhS2V5ID09PSBmYWxzZTtcbiAgICB9O1xuICAgIHZhciBnb3RvTGluayA9IGZ1bmN0aW9uIChlZGl0b3IsIGEpIHtcbiAgICAgIGlmIChhKSB7XG4gICAgICAgIHZhciBocmVmID0gZ2V0SHJlZihhKTtcbiAgICAgICAgaWYgKC9eIy8udGVzdChocmVmKSkge1xuICAgICAgICAgIHZhciB0YXJnZXRFbCA9IGVkaXRvci4kKGhyZWYpO1xuICAgICAgICAgIGlmICh0YXJnZXRFbC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGVkaXRvci5zZWxlY3Rpb24uc2Nyb2xsSW50b1ZpZXcodGFyZ2V0RWxbMF0sIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcGVuJDEoYS5ocmVmKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgdmFyIG9wZW5EaWFsb2cgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBvcGVuKGVkaXRvcik7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGdvdG9TZWxlY3RlZExpbmsgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBnb3RvTGluayhlZGl0b3IsIGdldFNlbGVjdGVkTGluayhlZGl0b3IpKTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgc2V0dXBHb3RvTGlua3MgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBlZGl0b3Iub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIGxpbmsgPSBnZXRMaW5rKGVkaXRvciwgZS50YXJnZXQpO1xuICAgICAgICBpZiAobGluayAmJiBnbG9iYWwkMS5tZXRhS2V5UHJlc3NlZChlKSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBnb3RvTGluayhlZGl0b3IsIGxpbmspO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci5vbigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBsaW5rID0gZ2V0U2VsZWN0ZWRMaW5rKGVkaXRvcik7XG4gICAgICAgIGlmIChsaW5rICYmIGUua2V5Q29kZSA9PT0gMTMgJiYgaGFzT25seUFsdE1vZGlmaWVyKGUpKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGdvdG9MaW5rKGVkaXRvciwgbGluayk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHRvZ2dsZUFjdGl2ZVN0YXRlID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhcGkpIHtcbiAgICAgICAgdmFyIG5vZGVDaGFuZ2VIYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICByZXR1cm4gYXBpLnNldEFjdGl2ZSghZWRpdG9yLm1vZGUuaXNSZWFkT25seSgpICYmICEhZ2V0QW5jaG9yRWxlbWVudChlZGl0b3IsIGUuZWxlbWVudCkpO1xuICAgICAgICB9O1xuICAgICAgICBlZGl0b3Iub24oJ05vZGVDaGFuZ2UnLCBub2RlQ2hhbmdlSGFuZGxlcik7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci5vZmYoJ05vZGVDaGFuZ2UnLCBub2RlQ2hhbmdlSGFuZGxlcik7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHRvZ2dsZUVuYWJsZWRTdGF0ZSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYXBpKSB7XG4gICAgICAgIHZhciBwYXJlbnRzID0gZWRpdG9yLmRvbS5nZXRQYXJlbnRzKGVkaXRvci5zZWxlY3Rpb24uZ2V0U3RhcnQoKSk7XG4gICAgICAgIGFwaS5zZXREaXNhYmxlZCghaGFzTGlua3MocGFyZW50cykpO1xuICAgICAgICB2YXIgbm9kZUNoYW5nZUhhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHJldHVybiBhcGkuc2V0RGlzYWJsZWQoIWhhc0xpbmtzKGUucGFyZW50cykpO1xuICAgICAgICB9O1xuICAgICAgICBlZGl0b3Iub24oJ05vZGVDaGFuZ2UnLCBub2RlQ2hhbmdlSGFuZGxlcik7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci5vZmYoJ05vZGVDaGFuZ2UnLCBub2RlQ2hhbmdlSGFuZGxlcik7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgcmVnaXN0ZXIgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBlZGl0b3IuYWRkQ29tbWFuZCgnbWNlTGluaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHVzZVF1aWNrTGluayhlZGl0b3IpKSB7XG4gICAgICAgICAgZWRpdG9yLmZpcmUoJ2NvbnRleHR0b29sYmFyLXNob3cnLCB7IHRvb2xiYXJLZXk6ICdxdWlja2xpbmsnIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wZW5EaWFsb2coZWRpdG9yKSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHNldHVwID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgZWRpdG9yLmFkZFNob3J0Y3V0KCdNZXRhK0snLCAnJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBlZGl0b3IuZXhlY0NvbW1hbmQoJ21jZUxpbmsnKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgc2V0dXBCdXR0b25zID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZFRvZ2dsZUJ1dHRvbignbGluaycsIHtcbiAgICAgICAgaWNvbjogJ2xpbmsnLFxuICAgICAgICB0b29sdGlwOiAnSW5zZXJ0L2VkaXQgbGluaycsXG4gICAgICAgIG9uQWN0aW9uOiBvcGVuRGlhbG9nKGVkaXRvciksXG4gICAgICAgIG9uU2V0dXA6IHRvZ2dsZUFjdGl2ZVN0YXRlKGVkaXRvcilcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZEJ1dHRvbignb3BlbmxpbmsnLCB7XG4gICAgICAgIGljb246ICduZXctdGFiJyxcbiAgICAgICAgdG9vbHRpcDogJ09wZW4gbGluaycsXG4gICAgICAgIG9uQWN0aW9uOiBnb3RvU2VsZWN0ZWRMaW5rKGVkaXRvciksXG4gICAgICAgIG9uU2V0dXA6IHRvZ2dsZUVuYWJsZWRTdGF0ZShlZGl0b3IpXG4gICAgICB9KTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRCdXR0b24oJ3VubGluaycsIHtcbiAgICAgICAgaWNvbjogJ3VubGluaycsXG4gICAgICAgIHRvb2x0aXA6ICdSZW1vdmUgbGluaycsXG4gICAgICAgIG9uQWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHVubGluayhlZGl0b3IpO1xuICAgICAgICB9LFxuICAgICAgICBvblNldHVwOiB0b2dnbGVFbmFibGVkU3RhdGUoZWRpdG9yKVxuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgc2V0dXBNZW51SXRlbXMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkTWVudUl0ZW0oJ29wZW5saW5rJywge1xuICAgICAgICB0ZXh0OiAnT3BlbiBsaW5rJyxcbiAgICAgICAgaWNvbjogJ25ldy10YWInLFxuICAgICAgICBvbkFjdGlvbjogZ290b1NlbGVjdGVkTGluayhlZGl0b3IpLFxuICAgICAgICBvblNldHVwOiB0b2dnbGVFbmFibGVkU3RhdGUoZWRpdG9yKVxuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkTWVudUl0ZW0oJ2xpbmsnLCB7XG4gICAgICAgIGljb246ICdsaW5rJyxcbiAgICAgICAgdGV4dDogJ0xpbmsuLi4nLFxuICAgICAgICBzaG9ydGN1dDogJ01ldGErSycsXG4gICAgICAgIG9uQWN0aW9uOiBvcGVuRGlhbG9nKGVkaXRvcilcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZE1lbnVJdGVtKCd1bmxpbmsnLCB7XG4gICAgICAgIGljb246ICd1bmxpbmsnLFxuICAgICAgICB0ZXh0OiAnUmVtb3ZlIGxpbmsnLFxuICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiB1bmxpbmsoZWRpdG9yKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TZXR1cDogdG9nZ2xlRW5hYmxlZFN0YXRlKGVkaXRvcilcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHNldHVwQ29udGV4dE1lbnUgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgaW5MaW5rID0gJ2xpbmsgdW5saW5rIG9wZW5saW5rJztcbiAgICAgIHZhciBub0xpbmsgPSAnbGluayc7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQ29udGV4dE1lbnUoJ2xpbmsnLCB7XG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICByZXR1cm4gaGFzTGlua3MoZWRpdG9yLmRvbS5nZXRQYXJlbnRzKGVsZW1lbnQsICdhJykpID8gaW5MaW5rIDogbm9MaW5rO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBzZXR1cENvbnRleHRUb29sYmFycyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBjb2xsYXBzZVNlbGVjdGlvblRvRW5kID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLmNvbGxhcHNlKGZhbHNlKTtcbiAgICAgIH07XG4gICAgICB2YXIgb25TZXR1cExpbmsgPSBmdW5jdGlvbiAoYnV0dG9uQXBpKSB7XG4gICAgICAgIHZhciBub2RlID0gZWRpdG9yLnNlbGVjdGlvbi5nZXROb2RlKCk7XG4gICAgICAgIGJ1dHRvbkFwaS5zZXREaXNhYmxlZCghZ2V0QW5jaG9yRWxlbWVudChlZGl0b3IsIG5vZGUpKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQ29udGV4dEZvcm0oJ3F1aWNrbGluaycsIHtcbiAgICAgICAgbGF1bmNoOiB7XG4gICAgICAgICAgdHlwZTogJ2NvbnRleHRmb3JtdG9nZ2xlYnV0dG9uJyxcbiAgICAgICAgICBpY29uOiAnbGluaycsXG4gICAgICAgICAgdG9vbHRpcDogJ0xpbmsnLFxuICAgICAgICAgIG9uU2V0dXA6IHRvZ2dsZUFjdGl2ZVN0YXRlKGVkaXRvcilcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWw6ICdMaW5rJyxcbiAgICAgICAgcHJlZGljYXRlOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgIHJldHVybiAhIWdldEFuY2hvckVsZW1lbnQoZWRpdG9yLCBub2RlKSAmJiBoYXNDb250ZXh0VG9vbGJhcihlZGl0b3IpO1xuICAgICAgICB9LFxuICAgICAgICBpbml0VmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgZWxtID0gZ2V0QW5jaG9yRWxlbWVudChlZGl0b3IpO1xuICAgICAgICAgIHJldHVybiAhIWVsbSA/IGdldEhyZWYoZWxtKSA6ICcnO1xuICAgICAgICB9LFxuICAgICAgICBjb21tYW5kczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdjb250ZXh0Zm9ybXRvZ2dsZWJ1dHRvbicsXG4gICAgICAgICAgICBpY29uOiAnbGluaycsXG4gICAgICAgICAgICB0b29sdGlwOiAnTGluaycsXG4gICAgICAgICAgICBwcmltYXJ5OiB0cnVlLFxuICAgICAgICAgICAgb25TZXR1cDogZnVuY3Rpb24gKGJ1dHRvbkFwaSkge1xuICAgICAgICAgICAgICB2YXIgbm9kZSA9IGVkaXRvci5zZWxlY3Rpb24uZ2V0Tm9kZSgpO1xuICAgICAgICAgICAgICBidXR0b25BcGkuc2V0QWN0aXZlKCEhZ2V0QW5jaG9yRWxlbWVudChlZGl0b3IsIG5vZGUpKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRvZ2dsZUFjdGl2ZVN0YXRlKGVkaXRvcikoYnV0dG9uQXBpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKGZvcm1BcGkpIHtcbiAgICAgICAgICAgICAgdmFyIGFuY2hvciA9IGdldEFuY2hvckVsZW1lbnQoZWRpdG9yKTtcbiAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZm9ybUFwaS5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgICBpZiAoIWFuY2hvcikge1xuICAgICAgICAgICAgICAgIHZhciBhdHRhY2hTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAgIGhyZWY6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgYXR0YWNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB2YXIgb25seVRleHQgPSBpc09ubHlUZXh0U2VsZWN0ZWQoZWRpdG9yLnNlbGVjdGlvbi5nZXRDb250ZW50KCkpO1xuICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gb25seVRleHQgPyBPcHRpb24uc29tZShnZXRBbmNob3JUZXh0KGVkaXRvci5zZWxlY3Rpb24sIGFuY2hvcikpLmZpbHRlcihmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHQubGVuZ3RoID4gMDtcbiAgICAgICAgICAgICAgICB9KS5vcihPcHRpb24uZnJvbSh2YWx1ZSkpIDogT3B0aW9uLm5vbmUoKTtcbiAgICAgICAgICAgICAgICBsaW5rKGVkaXRvciwgYXR0YWNoU3RhdGUsIHtcbiAgICAgICAgICAgICAgICAgIGhyZWY6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBPcHRpb24ubm9uZSgpLFxuICAgICAgICAgICAgICAgICAgcmVsOiBPcHRpb24ubm9uZSgpLFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBPcHRpb24ubm9uZSgpLFxuICAgICAgICAgICAgICAgICAgY2xhc3M6IE9wdGlvbi5ub25lKClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBmb3JtQXBpLmhpZGUoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlZGl0b3IudW5kb01hbmFnZXIudHJhbnNhY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgZWRpdG9yLmRvbS5zZXRBdHRyaWIoYW5jaG9yLCAnaHJlZicsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIGNvbGxhcHNlU2VsZWN0aW9uVG9FbmQoZWRpdG9yKTtcbiAgICAgICAgICAgICAgICAgIGZvcm1BcGkuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnY29udGV4dGZvcm1idXR0b24nLFxuICAgICAgICAgICAgaWNvbjogJ3VubGluaycsXG4gICAgICAgICAgICB0b29sdGlwOiAnUmVtb3ZlIGxpbmsnLFxuICAgICAgICAgICAgb25TZXR1cDogb25TZXR1cExpbmssXG4gICAgICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKGZvcm1BcGkpIHtcbiAgICAgICAgICAgICAgdW5saW5rKGVkaXRvcik7XG4gICAgICAgICAgICAgIGZvcm1BcGkuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2NvbnRleHRmb3JtYnV0dG9uJyxcbiAgICAgICAgICAgIGljb246ICduZXctdGFiJyxcbiAgICAgICAgICAgIHRvb2x0aXA6ICdPcGVuIGxpbmsnLFxuICAgICAgICAgICAgb25TZXR1cDogb25TZXR1cExpbmssXG4gICAgICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKGZvcm1BcGkpIHtcbiAgICAgICAgICAgICAgZ290b1NlbGVjdGVkTGluayhlZGl0b3IpKCk7XG4gICAgICAgICAgICAgIGZvcm1BcGkuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFBsdWdpbiAoKSB7XG4gICAgICBnbG9iYWwuYWRkKCdsaW5rJywgZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICBzZXR1cEJ1dHRvbnMoZWRpdG9yKTtcbiAgICAgICAgc2V0dXBNZW51SXRlbXMoZWRpdG9yKTtcbiAgICAgICAgc2V0dXBDb250ZXh0TWVudShlZGl0b3IpO1xuICAgICAgICBzZXR1cENvbnRleHRUb29sYmFycyhlZGl0b3IpO1xuICAgICAgICBzZXR1cEdvdG9MaW5rcyhlZGl0b3IpO1xuICAgICAgICByZWdpc3RlcihlZGl0b3IpO1xuICAgICAgICBzZXR1cChlZGl0b3IpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgUGx1Z2luKCk7XG5cbn0od2luZG93KSk7XG4iXSwic291cmNlUm9vdCI6IiJ9