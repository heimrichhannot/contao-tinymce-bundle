(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~tinymce-plugin-image~tinymce-plugin-image-plugin"],{

/***/ "./node_modules/tinymce/plugins/image/plugin.js":
/*!******************************************************!*\
  !*** ./node_modules/tinymce/plugins/image/plugin.js ***!
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

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

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
    var isObject = isType('object');
    var isArray = isType('array');
    var isNull = eq(null);
    var isBoolean = isSimpleType('boolean');
    var isNumber = isSimpleType('number');

    var nativePush = Array.prototype.push;
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
    var head = function (xs) {
      return xs.length === 0 ? Option.none() : Option.some(xs[0]);
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

    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var deep = function (old, nu) {
      var bothObjects = isObject(old) && isObject(nu);
      return bothObjects ? deepMerge(old, nu) : nu;
    };
    var baseMerge = function (merger) {
      return function () {
        var objects = new Array(arguments.length);
        for (var i = 0; i < objects.length; i++) {
          objects[i] = arguments[i];
        }
        if (objects.length === 0) {
          throw new Error('Can\'t merge zero objects');
        }
        var ret = {};
        for (var j = 0; j < objects.length; j++) {
          var curObject = objects[j];
          for (var key in curObject) {
            if (hasOwnProperty.call(curObject, key)) {
              ret[key] = merger(ret[key], curObject[key]);
            }
          }
        }
        return ret;
      };
    };
    var deepMerge = baseMerge(deep);

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

    var Global = typeof domGlobals.window !== 'undefined' ? domGlobals.window : Function('return this;')();

    var rawSet = function (dom, key, value) {
      if (isString(value) || isBoolean(value) || isNumber(value)) {
        dom.setAttribute(key, value + '');
      } else {
        domGlobals.console.error('Invalid call to Attr.set. Key ', key, ':: Value ', value, ':: Element ', dom);
        throw new Error('Attribute value was not simple');
      }
    };
    var set = function (element, key, value) {
      rawSet(element.dom(), key, value);
    };
    var remove = function (element, key) {
      element.dom().removeAttribute(key);
    };

    var fromHtml = function (html, scope) {
      var doc = scope || domGlobals.document;
      var div = doc.createElement('div');
      div.innerHTML = html;
      if (!div.hasChildNodes() || div.childNodes.length > 1) {
        domGlobals.console.error('HTML does not have a single root node', html);
        throw new Error('HTML must have a single root node');
      }
      return fromDom(div.childNodes[0]);
    };
    var fromTag = function (tag, scope) {
      var doc = scope || domGlobals.document;
      var node = doc.createElement(tag);
      return fromDom(node);
    };
    var fromText = function (text, scope) {
      var doc = scope || domGlobals.document;
      var node = doc.createTextNode(text);
      return fromDom(node);
    };
    var fromDom = function (node) {
      if (node === null || node === undefined) {
        throw new Error('Node cannot be null or undefined');
      }
      return { dom: constant(node) };
    };
    var fromPoint = function (docElm, x, y) {
      var doc = docElm.dom();
      return Option.from(doc.elementFromPoint(x, y)).map(fromDom);
    };
    var Element = {
      fromHtml: fromHtml,
      fromTag: fromTag,
      fromText: fromText,
      fromDom: fromDom,
      fromPoint: fromPoint
    };

    var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.Promise');

    var global$3 = tinymce.util.Tools.resolve('tinymce.util.XHR');

    var hasDimensions = function (editor) {
      return editor.getParam('image_dimensions', true, 'boolean');
    };
    var hasAdvTab = function (editor) {
      return editor.getParam('image_advtab', false, 'boolean');
    };
    var hasUploadTab = function (editor) {
      return editor.getParam('image_uploadtab', true, 'boolean');
    };
    var getPrependUrl = function (editor) {
      return editor.getParam('image_prepend_url', '', 'string');
    };
    var getClassList = function (editor) {
      return editor.getParam('image_class_list');
    };
    var hasDescription = function (editor) {
      return editor.getParam('image_description', true, 'boolean');
    };
    var hasImageTitle = function (editor) {
      return editor.getParam('image_title', false, 'boolean');
    };
    var hasImageCaption = function (editor) {
      return editor.getParam('image_caption', false, 'boolean');
    };
    var getImageList = function (editor) {
      return editor.getParam('image_list', false);
    };
    var hasUploadUrl = function (editor) {
      return !!getUploadUrl(editor);
    };
    var hasUploadHandler = function (editor) {
      return !!getUploadHandler(editor);
    };
    var getUploadUrl = function (editor) {
      return editor.getParam('images_upload_url', '', 'string');
    };
    var getUploadHandler = function (editor) {
      return editor.getParam('images_upload_handler', undefined, 'function');
    };
    var getUploadBasePath = function (editor) {
      return editor.getParam('images_upload_base_path', undefined, 'string');
    };
    var getUploadCredentials = function (editor) {
      return editor.getParam('images_upload_credentials', false, 'boolean');
    };
    var showAccessibilityOptions = function (editor) {
      return editor.getParam('a11y_advanced_options', false, 'boolean');
    };
    var isAutomaticUploadsEnabled = function (editor) {
      return editor.getParam('automatic_uploads', true, 'boolean');
    };

    var parseIntAndGetMax = function (val1, val2) {
      return Math.max(parseInt(val1, 10), parseInt(val2, 10));
    };
    var getImageSize = function (url) {
      return new global$2(function (callback) {
        var img = domGlobals.document.createElement('img');
        var done = function (dimensions) {
          if (img.parentNode) {
            img.parentNode.removeChild(img);
          }
          callback(dimensions);
        };
        img.onload = function () {
          var width = parseIntAndGetMax(img.width, img.clientWidth);
          var height = parseIntAndGetMax(img.height, img.clientHeight);
          var dimensions = {
            width: width,
            height: height
          };
          done(global$2.resolve(dimensions));
        };
        img.onerror = function () {
          done(global$2.reject('Failed to get image dimensions for: ' + url));
        };
        var style = img.style;
        style.visibility = 'hidden';
        style.position = 'fixed';
        style.bottom = style.left = '0px';
        style.width = style.height = 'auto';
        domGlobals.document.body.appendChild(img);
        img.src = url;
      });
    };
    var removePixelSuffix = function (value) {
      if (value) {
        value = value.replace(/px$/, '');
      }
      return value;
    };
    var addPixelSuffix = function (value) {
      if (value.length > 0 && /^[0-9]+$/.test(value)) {
        value += 'px';
      }
      return value;
    };
    var mergeMargins = function (css) {
      if (css.margin) {
        var splitMargin = String(css.margin).split(' ');
        switch (splitMargin.length) {
        case 1:
          css['margin-top'] = css['margin-top'] || splitMargin[0];
          css['margin-right'] = css['margin-right'] || splitMargin[0];
          css['margin-bottom'] = css['margin-bottom'] || splitMargin[0];
          css['margin-left'] = css['margin-left'] || splitMargin[0];
          break;
        case 2:
          css['margin-top'] = css['margin-top'] || splitMargin[0];
          css['margin-right'] = css['margin-right'] || splitMargin[1];
          css['margin-bottom'] = css['margin-bottom'] || splitMargin[0];
          css['margin-left'] = css['margin-left'] || splitMargin[1];
          break;
        case 3:
          css['margin-top'] = css['margin-top'] || splitMargin[0];
          css['margin-right'] = css['margin-right'] || splitMargin[1];
          css['margin-bottom'] = css['margin-bottom'] || splitMargin[2];
          css['margin-left'] = css['margin-left'] || splitMargin[1];
          break;
        case 4:
          css['margin-top'] = css['margin-top'] || splitMargin[0];
          css['margin-right'] = css['margin-right'] || splitMargin[1];
          css['margin-bottom'] = css['margin-bottom'] || splitMargin[2];
          css['margin-left'] = css['margin-left'] || splitMargin[3];
        }
        delete css.margin;
      }
      return css;
    };
    var createImageList = function (editor, callback) {
      var imageList = getImageList(editor);
      if (typeof imageList === 'string') {
        global$3.send({
          url: imageList,
          success: function (text) {
            callback(JSON.parse(text));
          }
        });
      } else if (typeof imageList === 'function') {
        imageList(callback);
      } else {
        callback(imageList);
      }
    };
    var waitLoadImage = function (editor, data, imgElm) {
      var selectImage = function () {
        imgElm.onload = imgElm.onerror = null;
        if (editor.selection) {
          editor.selection.select(imgElm);
          editor.nodeChanged();
        }
      };
      imgElm.onload = function () {
        if (!data.width && !data.height && hasDimensions(editor)) {
          editor.dom.setAttribs(imgElm, {
            width: String(imgElm.clientWidth),
            height: String(imgElm.clientHeight)
          });
        }
        selectImage();
      };
      imgElm.onerror = selectImage;
    };
    var blobToDataUri = function (blob) {
      return new global$2(function (resolve, reject) {
        var reader = new domGlobals.FileReader();
        reader.onload = function () {
          resolve(reader.result);
        };
        reader.onerror = function () {
          reject(reader.error.message);
        };
        reader.readAsDataURL(blob);
      });
    };
    var isPlaceholderImage = function (imgElm) {
      return imgElm.nodeName === 'IMG' && (imgElm.hasAttribute('data-mce-object') || imgElm.hasAttribute('data-mce-placeholder'));
    };

    var DOM = global$1.DOM;
    var getHspace = function (image) {
      if (image.style.marginLeft && image.style.marginRight && image.style.marginLeft === image.style.marginRight) {
        return removePixelSuffix(image.style.marginLeft);
      } else {
        return '';
      }
    };
    var getVspace = function (image) {
      if (image.style.marginTop && image.style.marginBottom && image.style.marginTop === image.style.marginBottom) {
        return removePixelSuffix(image.style.marginTop);
      } else {
        return '';
      }
    };
    var getBorder = function (image) {
      if (image.style.borderWidth) {
        return removePixelSuffix(image.style.borderWidth);
      } else {
        return '';
      }
    };
    var getAttrib = function (image, name) {
      if (image.hasAttribute(name)) {
        return image.getAttribute(name);
      } else {
        return '';
      }
    };
    var getStyle = function (image, name) {
      return image.style[name] ? image.style[name] : '';
    };
    var hasCaption = function (image) {
      return image.parentNode !== null && image.parentNode.nodeName === 'FIGURE';
    };
    var updateAttrib = function (image, name, value) {
      if (value === '') {
        image.removeAttribute(name);
      } else {
        image.setAttribute(name, value);
      }
    };
    var wrapInFigure = function (image) {
      var figureElm = DOM.create('figure', { class: 'image' });
      DOM.insertAfter(figureElm, image);
      figureElm.appendChild(image);
      figureElm.appendChild(DOM.create('figcaption', { contentEditable: 'true' }, 'Caption'));
      figureElm.contentEditable = 'false';
    };
    var removeFigure = function (image) {
      var figureElm = image.parentNode;
      DOM.insertAfter(image, figureElm);
      DOM.remove(figureElm);
    };
    var toggleCaption = function (image) {
      if (hasCaption(image)) {
        removeFigure(image);
      } else {
        wrapInFigure(image);
      }
    };
    var normalizeStyle = function (image, normalizeCss) {
      var attrValue = image.getAttribute('style');
      var value = normalizeCss(attrValue !== null ? attrValue : '');
      if (value.length > 0) {
        image.setAttribute('style', value);
        image.setAttribute('data-mce-style', value);
      } else {
        image.removeAttribute('style');
      }
    };
    var setSize = function (name, normalizeCss) {
      return function (image, name, value) {
        if (image.style[name]) {
          image.style[name] = addPixelSuffix(value);
          normalizeStyle(image, normalizeCss);
        } else {
          updateAttrib(image, name, value);
        }
      };
    };
    var getSize = function (image, name) {
      if (image.style[name]) {
        return removePixelSuffix(image.style[name]);
      } else {
        return getAttrib(image, name);
      }
    };
    var setHspace = function (image, value) {
      var pxValue = addPixelSuffix(value);
      image.style.marginLeft = pxValue;
      image.style.marginRight = pxValue;
    };
    var setVspace = function (image, value) {
      var pxValue = addPixelSuffix(value);
      image.style.marginTop = pxValue;
      image.style.marginBottom = pxValue;
    };
    var setBorder = function (image, value) {
      var pxValue = addPixelSuffix(value);
      image.style.borderWidth = pxValue;
    };
    var setBorderStyle = function (image, value) {
      image.style.borderStyle = value;
    };
    var getBorderStyle = function (image) {
      return getStyle(image, 'borderStyle');
    };
    var isFigure = function (elm) {
      return elm.nodeName === 'FIGURE';
    };
    var isImage = function (elm) {
      return elm.nodeName === 'IMG';
    };
    var getIsDecorative = function (image) {
      return DOM.getAttrib(image, 'alt').length === 0 && DOM.getAttrib(image, 'role') === 'presentation';
    };
    var getAlt = function (image) {
      if (getIsDecorative(image)) {
        return '';
      } else {
        return getAttrib(image, 'alt');
      }
    };
    var defaultData = function () {
      return {
        src: '',
        alt: '',
        title: '',
        width: '',
        height: '',
        class: '',
        style: '',
        caption: false,
        hspace: '',
        vspace: '',
        border: '',
        borderStyle: '',
        isDecorative: false
      };
    };
    var getStyleValue = function (normalizeCss, data) {
      var image = domGlobals.document.createElement('img');
      updateAttrib(image, 'style', data.style);
      if (getHspace(image) || data.hspace !== '') {
        setHspace(image, data.hspace);
      }
      if (getVspace(image) || data.vspace !== '') {
        setVspace(image, data.vspace);
      }
      if (getBorder(image) || data.border !== '') {
        setBorder(image, data.border);
      }
      if (getBorderStyle(image) || data.borderStyle !== '') {
        setBorderStyle(image, data.borderStyle);
      }
      return normalizeCss(image.getAttribute('style'));
    };
    var create = function (normalizeCss, data) {
      var image = domGlobals.document.createElement('img');
      write(normalizeCss, __assign(__assign({}, data), { caption: false }), image);
      setAlt(image, data.alt, data.isDecorative);
      if (data.caption) {
        var figure = DOM.create('figure', { class: 'image' });
        figure.appendChild(image);
        figure.appendChild(DOM.create('figcaption', { contentEditable: 'true' }, 'Caption'));
        figure.contentEditable = 'false';
        return figure;
      } else {
        return image;
      }
    };
    var read = function (normalizeCss, image) {
      return {
        src: getAttrib(image, 'src'),
        alt: getAlt(image),
        title: getAttrib(image, 'title'),
        width: getSize(image, 'width'),
        height: getSize(image, 'height'),
        class: getAttrib(image, 'class'),
        style: normalizeCss(getAttrib(image, 'style')),
        caption: hasCaption(image),
        hspace: getHspace(image),
        vspace: getVspace(image),
        border: getBorder(image),
        borderStyle: getStyle(image, 'borderStyle'),
        isDecorative: getIsDecorative(image)
      };
    };
    var updateProp = function (image, oldData, newData, name, set) {
      if (newData[name] !== oldData[name]) {
        set(image, name, newData[name]);
      }
    };
    var setAlt = function (image, alt, isDecorative) {
      if (isDecorative) {
        DOM.setAttrib(image, 'role', 'presentation');
        var sugarImage = Element.fromDom(image);
        set(sugarImage, 'alt', '');
      } else {
        if (isNull(alt)) {
          var sugarImage = Element.fromDom(image);
          remove(sugarImage, 'alt');
        } else {
          var sugarImage = Element.fromDom(image);
          set(sugarImage, 'alt', alt);
        }
        if (DOM.getAttrib(image, 'role') === 'presentation') {
          DOM.setAttrib(image, 'role', '');
        }
      }
    };
    var updateAlt = function (image, oldData, newData) {
      if (newData.alt !== oldData.alt || newData.isDecorative !== oldData.isDecorative) {
        setAlt(image, newData.alt, newData.isDecorative);
      }
    };
    var normalized = function (set, normalizeCss) {
      return function (image, name, value) {
        set(image, value);
        normalizeStyle(image, normalizeCss);
      };
    };
    var write = function (normalizeCss, newData, image) {
      var oldData = read(normalizeCss, image);
      updateProp(image, oldData, newData, 'caption', function (image, _name, _value) {
        return toggleCaption(image);
      });
      updateProp(image, oldData, newData, 'src', updateAttrib);
      updateProp(image, oldData, newData, 'title', updateAttrib);
      updateProp(image, oldData, newData, 'width', setSize('width', normalizeCss));
      updateProp(image, oldData, newData, 'height', setSize('height', normalizeCss));
      updateProp(image, oldData, newData, 'class', updateAttrib);
      updateProp(image, oldData, newData, 'style', normalized(function (image, value) {
        return updateAttrib(image, 'style', value);
      }, normalizeCss));
      updateProp(image, oldData, newData, 'hspace', normalized(setHspace, normalizeCss));
      updateProp(image, oldData, newData, 'vspace', normalized(setVspace, normalizeCss));
      updateProp(image, oldData, newData, 'border', normalized(setBorder, normalizeCss));
      updateProp(image, oldData, newData, 'borderStyle', normalized(setBorderStyle, normalizeCss));
      updateAlt(image, oldData, newData);
    };

    var normalizeCss = function (editor, cssText) {
      var css = editor.dom.styles.parse(cssText);
      var mergedCss = mergeMargins(css);
      var compressed = editor.dom.styles.parse(editor.dom.styles.serialize(mergedCss));
      return editor.dom.styles.serialize(compressed);
    };
    var getSelectedImage = function (editor) {
      var imgElm = editor.selection.getNode();
      var figureElm = editor.dom.getParent(imgElm, 'figure.image');
      if (figureElm) {
        return editor.dom.select('img', figureElm)[0];
      }
      if (imgElm && (imgElm.nodeName !== 'IMG' || isPlaceholderImage(imgElm))) {
        return null;
      }
      return imgElm;
    };
    var splitTextBlock = function (editor, figure) {
      var dom = editor.dom;
      var textBlock = dom.getParent(figure.parentNode, function (node) {
        return !!editor.schema.getTextBlockElements()[node.nodeName];
      }, editor.getBody());
      if (textBlock) {
        return dom.split(textBlock, figure);
      } else {
        return figure;
      }
    };
    var readImageDataFromSelection = function (editor) {
      var image = getSelectedImage(editor);
      return image ? read(function (css) {
        return normalizeCss(editor, css);
      }, image) : defaultData();
    };
    var insertImageAtCaret = function (editor, data) {
      var elm = create(function (css) {
        return normalizeCss(editor, css);
      }, data);
      editor.dom.setAttrib(elm, 'data-mce-id', '__mcenew');
      editor.focus();
      editor.selection.setContent(elm.outerHTML);
      var insertedElm = editor.dom.select('*[data-mce-id="__mcenew"]')[0];
      editor.dom.setAttrib(insertedElm, 'data-mce-id', null);
      if (isFigure(insertedElm)) {
        var figure = splitTextBlock(editor, insertedElm);
        editor.selection.select(figure);
      } else {
        editor.selection.select(insertedElm);
      }
    };
    var syncSrcAttr = function (editor, image) {
      editor.dom.setAttrib(image, 'src', image.getAttribute('src'));
    };
    var deleteImage = function (editor, image) {
      if (image) {
        var elm = editor.dom.is(image.parentNode, 'figure.image') ? image.parentNode : image;
        editor.dom.remove(elm);
        editor.focus();
        editor.nodeChanged();
        if (editor.dom.isEmpty(editor.getBody())) {
          editor.setContent('');
          editor.selection.setCursorLocation();
        }
      }
    };
    var writeImageDataToSelection = function (editor, data) {
      var image = getSelectedImage(editor);
      write(function (css) {
        return normalizeCss(editor, css);
      }, data, image);
      syncSrcAttr(editor, image);
      if (isFigure(image.parentNode)) {
        var figure = image.parentNode;
        splitTextBlock(editor, figure);
        editor.selection.select(image.parentNode);
      } else {
        editor.selection.select(image);
        waitLoadImage(editor, data, image);
      }
    };
    var insertOrUpdateImage = function (editor, partialData) {
      var image = getSelectedImage(editor);
      if (image) {
        var selectedImageData = read(function (css) {
          return normalizeCss(editor, css);
        }, image);
        var data = __assign(__assign({}, selectedImageData), partialData);
        if (data.src) {
          writeImageDataToSelection(editor, data);
        } else {
          deleteImage(editor, image);
        }
      } else if (partialData.src) {
        insertImageAtCaret(editor, __assign(__assign({}, defaultData()), partialData));
      }
    };

    var global$4 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var getValue = function (item) {
      return isString(item.value) ? item.value : '';
    };
    var sanitizeList = function (list, extractValue) {
      var out = [];
      global$4.each(list, function (item) {
        var text = isString(item.text) ? item.text : isString(item.title) ? item.title : '';
        if (item.menu !== undefined) {
          var items = sanitizeList(item.menu, extractValue);
          out.push({
            text: text,
            items: items
          });
        } else {
          var value = extractValue(item);
          out.push({
            text: text,
            value: value
          });
        }
      });
      return out;
    };
    var sanitizer = function (extracter) {
      if (extracter === void 0) {
        extracter = getValue;
      }
      return function (list) {
        if (list) {
          return Option.from(list).map(function (list) {
            return sanitizeList(list, extracter);
          });
        } else {
          return Option.none();
        }
      };
    };
    var sanitize = function (list) {
      return sanitizer(getValue)(list);
    };
    var isGroup = function (item) {
      return Object.prototype.hasOwnProperty.call(item, 'items');
    };
    var findEntryDelegate = function (list, value) {
      return findMap(list, function (item) {
        if (isGroup(item)) {
          return findEntryDelegate(item.items, value);
        } else if (item.value === value) {
          return Option.some(item);
        } else {
          return Option.none();
        }
      });
    };
    var findEntry = function (optList, value) {
      return optList.bind(function (list) {
        return findEntryDelegate(list, value);
      });
    };
    var ListUtils = {
      sanitizer: sanitizer,
      sanitize: sanitize,
      findEntry: findEntry
    };

    var pathJoin = function (path1, path2) {
      if (path1) {
        return path1.replace(/\/$/, '') + '/' + path2.replace(/^\//, '');
      }
      return path2;
    };
    function Uploader (settings) {
      var defaultHandler = function (blobInfo, success, failure, progress) {
        var xhr = new domGlobals.XMLHttpRequest();
        xhr.open('POST', settings.url);
        xhr.withCredentials = settings.credentials;
        xhr.upload.onprogress = function (e) {
          progress(e.loaded / e.total * 100);
        };
        xhr.onerror = function () {
          failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
        };
        xhr.onload = function () {
          if (xhr.status < 200 || xhr.status >= 300) {
            failure('HTTP Error: ' + xhr.status);
            return;
          }
          var json = JSON.parse(xhr.responseText);
          if (!json || typeof json.location !== 'string') {
            failure('Invalid JSON: ' + xhr.responseText);
            return;
          }
          success(pathJoin(settings.basePath, json.location));
        };
        var formData = new domGlobals.FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());
        xhr.send(formData);
      };
      var uploadBlob = function (blobInfo, handler) {
        return new global$2(function (resolve, reject) {
          try {
            handler(blobInfo, resolve, reject, noop);
          } catch (ex) {
            reject(ex.message);
          }
        });
      };
      var isDefaultHandler = function (handler) {
        return handler === defaultHandler;
      };
      var upload = function (blobInfo) {
        return !settings.url && isDefaultHandler(settings.handler) ? global$2.reject('Upload url missing from the settings.') : uploadBlob(blobInfo, settings.handler);
      };
      settings = global$4.extend({
        credentials: false,
        handler: defaultHandler
      }, settings);
      return { upload: upload };
    }

    var makeTab = function (_info) {
      return {
        title: 'Advanced',
        name: 'advanced',
        items: [
          {
            type: 'input',
            label: 'Style',
            name: 'style'
          },
          {
            type: 'grid',
            columns: 2,
            items: [
              {
                type: 'input',
                label: 'Vertical space',
                name: 'vspace',
                inputMode: 'numeric'
              },
              {
                type: 'input',
                label: 'Horizontal space',
                name: 'hspace',
                inputMode: 'numeric'
              },
              {
                type: 'input',
                label: 'Border width',
                name: 'border',
                inputMode: 'numeric'
              },
              {
                type: 'selectbox',
                name: 'borderstyle',
                label: 'Border style',
                items: [
                  {
                    text: 'Select...',
                    value: ''
                  },
                  {
                    text: 'Solid',
                    value: 'solid'
                  },
                  {
                    text: 'Dotted',
                    value: 'dotted'
                  },
                  {
                    text: 'Dashed',
                    value: 'dashed'
                  },
                  {
                    text: 'Double',
                    value: 'double'
                  },
                  {
                    text: 'Groove',
                    value: 'groove'
                  },
                  {
                    text: 'Ridge',
                    value: 'ridge'
                  },
                  {
                    text: 'Inset',
                    value: 'inset'
                  },
                  {
                    text: 'Outset',
                    value: 'outset'
                  },
                  {
                    text: 'None',
                    value: 'none'
                  },
                  {
                    text: 'Hidden',
                    value: 'hidden'
                  }
                ]
              }
            ]
          }
        ]
      };
    };
    var AdvTab = { makeTab: makeTab };

    var collect = function (editor) {
      var urlListSanitizer = ListUtils.sanitizer(function (item) {
        return editor.convertURL(item.value || item.url, 'src');
      });
      var futureImageList = new global$2(function (completer) {
        createImageList(editor, function (imageList) {
          completer(urlListSanitizer(imageList).map(function (items) {
            return flatten([
              [{
                  text: 'None',
                  value: ''
                }],
              items
            ]);
          }));
        });
      });
      var classList = ListUtils.sanitize(getClassList(editor));
      var hasAdvTab$1 = hasAdvTab(editor);
      var hasUploadTab$1 = hasUploadTab(editor);
      var hasUploadUrl$1 = hasUploadUrl(editor);
      var hasUploadHandler$1 = hasUploadHandler(editor);
      var image = readImageDataFromSelection(editor);
      var hasDescription$1 = hasDescription(editor);
      var hasImageTitle$1 = hasImageTitle(editor);
      var hasDimensions$1 = hasDimensions(editor);
      var hasImageCaption$1 = hasImageCaption(editor);
      var hasAccessibilityOptions = showAccessibilityOptions(editor);
      var url = getUploadUrl(editor);
      var basePath = getUploadBasePath(editor);
      var credentials = getUploadCredentials(editor);
      var handler = getUploadHandler(editor);
      var automaticUploads = isAutomaticUploadsEnabled(editor);
      var prependURL = Option.some(getPrependUrl(editor)).filter(function (preUrl) {
        return isString(preUrl) && preUrl.length > 0;
      });
      return futureImageList.then(function (imageList) {
        return {
          image: image,
          imageList: imageList,
          classList: classList,
          hasAdvTab: hasAdvTab$1,
          hasUploadTab: hasUploadTab$1,
          hasUploadUrl: hasUploadUrl$1,
          hasUploadHandler: hasUploadHandler$1,
          hasDescription: hasDescription$1,
          hasImageTitle: hasImageTitle$1,
          hasDimensions: hasDimensions$1,
          hasImageCaption: hasImageCaption$1,
          url: url,
          basePath: basePath,
          credentials: credentials,
          handler: handler,
          prependURL: prependURL,
          hasAccessibilityOptions: hasAccessibilityOptions,
          automaticUploads: automaticUploads
        };
      });
    };

    var makeItems = function (info) {
      var imageUrl = {
        name: 'src',
        type: 'urlinput',
        filetype: 'image',
        label: 'Source'
      };
      var imageList = info.imageList.map(function (items) {
        return {
          name: 'images',
          type: 'selectbox',
          label: 'Image list',
          items: items
        };
      });
      var imageDescription = {
        name: 'alt',
        type: 'input',
        label: 'Alternative description',
        disabled: info.hasAccessibilityOptions && info.image.isDecorative
      };
      var imageTitle = {
        name: 'title',
        type: 'input',
        label: 'Image title'
      };
      var imageDimensions = {
        name: 'dimensions',
        type: 'sizeinput'
      };
      var isDecorative = {
        type: 'label',
        label: 'Accessibility',
        items: [{
            name: 'isDecorative',
            type: 'checkbox',
            label: 'Image is decorative'
          }]
      };
      var classList = info.classList.map(function (items) {
        return {
          name: 'classes',
          type: 'selectbox',
          label: 'Class',
          items: items
        };
      });
      var caption = {
        type: 'label',
        label: 'Caption',
        items: [{
            type: 'checkbox',
            name: 'caption',
            label: 'Show caption'
          }]
      };
      return flatten([
        [imageUrl],
        imageList.toArray(),
        info.hasAccessibilityOptions && info.hasDescription ? [isDecorative] : [],
        info.hasDescription ? [imageDescription] : [],
        info.hasImageTitle ? [imageTitle] : [],
        info.hasDimensions ? [imageDimensions] : [],
        [{
            type: 'grid',
            columns: 2,
            items: flatten([
              classList.toArray(),
              info.hasImageCaption ? [caption] : []
            ])
          }]
      ]);
    };
    var makeTab$1 = function (info) {
      return {
        title: 'General',
        name: 'general',
        items: makeItems(info)
      };
    };
    var MainTab = {
      makeTab: makeTab$1,
      makeItems: makeItems
    };

    var makeTab$2 = function (_info) {
      var items = [{
          type: 'dropzone',
          name: 'fileinput'
        }];
      return {
        title: 'Upload',
        name: 'upload',
        items: items
      };
    };
    var UploadTab = { makeTab: makeTab$2 };

    var createState = function (info) {
      return {
        prevImage: ListUtils.findEntry(info.imageList, info.image.src),
        prevAlt: info.image.alt,
        open: true
      };
    };
    var fromImageData = function (image) {
      return {
        src: {
          value: image.src,
          meta: {}
        },
        images: image.src,
        alt: image.alt,
        title: image.title,
        dimensions: {
          width: image.width,
          height: image.height
        },
        classes: image.class,
        caption: image.caption,
        style: image.style,
        vspace: image.vspace,
        border: image.border,
        hspace: image.hspace,
        borderstyle: image.borderStyle,
        fileinput: [],
        isDecorative: image.isDecorative
      };
    };
    var toImageData = function (data, removeEmptyAlt) {
      return {
        src: data.src.value,
        alt: data.alt.length === 0 && removeEmptyAlt ? null : data.alt,
        title: data.title,
        width: data.dimensions.width,
        height: data.dimensions.height,
        class: data.classes,
        style: data.style,
        caption: data.caption,
        hspace: data.hspace,
        vspace: data.vspace,
        border: data.border,
        borderStyle: data.borderstyle,
        isDecorative: data.isDecorative
      };
    };
    var addPrependUrl2 = function (info, srcURL) {
      if (!/^(?:[a-zA-Z]+:)?\/\//.test(srcURL)) {
        return info.prependURL.bind(function (prependUrl) {
          if (srcURL.substring(0, prependUrl.length) !== prependUrl) {
            return Option.some(prependUrl + srcURL);
          }
          return Option.none();
        });
      }
      return Option.none();
    };
    var addPrependUrl = function (info, api) {
      var data = api.getData();
      addPrependUrl2(info, data.src.value).each(function (srcURL) {
        api.setData({
          src: {
            value: srcURL,
            meta: data.src.meta
          }
        });
      });
    };
    var formFillFromMeta2 = function (info, data, meta) {
      if (info.hasDescription && isString(meta.alt)) {
        data.alt = meta.alt;
      }
      if (info.hasAccessibilityOptions) {
        data.isDecorative = meta.isDecorative || data.isDecorative || false;
      }
      if (info.hasImageTitle && isString(meta.title)) {
        data.title = meta.title;
      }
      if (info.hasDimensions) {
        if (isString(meta.width)) {
          data.dimensions.width = meta.width;
        }
        if (isString(meta.height)) {
          data.dimensions.height = meta.height;
        }
      }
      if (isString(meta.class)) {
        ListUtils.findEntry(info.classList, meta.class).each(function (entry) {
          data.classes = entry.value;
        });
      }
      if (info.hasImageCaption) {
        if (isBoolean(meta.caption)) {
          data.caption = meta.caption;
        }
      }
      if (info.hasAdvTab) {
        if (isString(meta.style)) {
          data.style = meta.style;
        }
        if (isString(meta.vspace)) {
          data.vspace = meta.vspace;
        }
        if (isString(meta.border)) {
          data.border = meta.border;
        }
        if (isString(meta.hspace)) {
          data.hspace = meta.hspace;
        }
        if (isString(meta.borderstyle)) {
          data.borderstyle = meta.borderstyle;
        }
      }
    };
    var formFillFromMeta = function (info, api) {
      var data = api.getData();
      var meta = data.src.meta;
      if (meta !== undefined) {
        var newData = deepMerge({}, data);
        formFillFromMeta2(info, newData, meta);
        api.setData(newData);
      }
    };
    var calculateImageSize = function (helpers, info, state, api) {
      var data = api.getData();
      var url = data.src.value;
      var meta = data.src.meta || {};
      if (!meta.width && !meta.height && info.hasDimensions) {
        helpers.imageSize(url).then(function (size) {
          if (state.open) {
            api.setData({ dimensions: size });
          }
        });
      }
    };
    var updateImagesDropdown = function (info, state, api) {
      var data = api.getData();
      var image = ListUtils.findEntry(info.imageList, data.src.value);
      state.prevImage = image;
      api.setData({
        images: image.map(function (entry) {
          return entry.value;
        }).getOr('')
      });
    };
    var changeSrc = function (helpers, info, state, api) {
      addPrependUrl(info, api);
      formFillFromMeta(info, api);
      calculateImageSize(helpers, info, state, api);
      updateImagesDropdown(info, state, api);
    };
    var changeImages = function (helpers, info, state, api) {
      var data = api.getData();
      var image = ListUtils.findEntry(info.imageList, data.images);
      image.each(function (img) {
        var updateAlt = data.alt === '' || state.prevImage.map(function (image) {
          return image.text === data.alt;
        }).getOr(false);
        if (updateAlt) {
          if (img.value === '') {
            api.setData({
              src: img,
              alt: state.prevAlt
            });
          } else {
            api.setData({
              src: img,
              alt: img.text
            });
          }
        } else {
          api.setData({ src: img });
        }
      });
      state.prevImage = image;
      changeSrc(helpers, info, state, api);
    };
    var calcVSpace = function (css) {
      var matchingTopBottom = css['margin-top'] && css['margin-bottom'] && css['margin-top'] === css['margin-bottom'];
      return matchingTopBottom ? removePixelSuffix(String(css['margin-top'])) : '';
    };
    var calcHSpace = function (css) {
      var matchingLeftRight = css['margin-right'] && css['margin-left'] && css['margin-right'] === css['margin-left'];
      return matchingLeftRight ? removePixelSuffix(String(css['margin-right'])) : '';
    };
    var calcBorderWidth = function (css) {
      return css['border-width'] ? removePixelSuffix(String(css['border-width'])) : '';
    };
    var calcBorderStyle = function (css) {
      return css['border-style'] ? String(css['border-style']) : '';
    };
    var calcStyle = function (parseStyle, serializeStyle, css) {
      return serializeStyle(parseStyle(serializeStyle(css)));
    };
    var changeStyle2 = function (parseStyle, serializeStyle, data) {
      var css = mergeMargins(parseStyle(data.style));
      var dataCopy = deepMerge({}, data);
      dataCopy.vspace = calcVSpace(css);
      dataCopy.hspace = calcHSpace(css);
      dataCopy.border = calcBorderWidth(css);
      dataCopy.borderstyle = calcBorderStyle(css);
      dataCopy.style = calcStyle(parseStyle, serializeStyle, css);
      return dataCopy;
    };
    var changeStyle = function (helpers, api) {
      var data = api.getData();
      var newData = changeStyle2(helpers.parseStyle, helpers.serializeStyle, data);
      api.setData(newData);
    };
    var changeAStyle = function (helpers, info, api) {
      var data = deepMerge(fromImageData(info.image), api.getData());
      var style = getStyleValue(helpers.normalizeCss, toImageData(data, false));
      api.setData({ style: style });
    };
    var changeFileInput = function (helpers, info, state, api) {
      var data = api.getData();
      api.block('Uploading image');
      head(data.fileinput).fold(function () {
        api.unblock();
      }, function (file) {
        var blobUri = domGlobals.URL.createObjectURL(file);
        var uploader = Uploader({
          url: info.url,
          basePath: info.basePath,
          credentials: info.credentials,
          handler: info.handler
        });
        var finalize = function () {
          api.unblock();
          domGlobals.URL.revokeObjectURL(blobUri);
        };
        var updateSrcAndSwitchTab = function (url) {
          api.setData({
            src: {
              value: url,
              meta: {}
            }
          });
          api.showTab('general');
          changeSrc(helpers, info, state, api);
        };
        blobToDataUri(file).then(function (dataUrl) {
          var blobInfo = helpers.createBlobCache(file, blobUri, dataUrl);
          if (info.automaticUploads) {
            uploader.upload(blobInfo).then(function (url) {
              updateSrcAndSwitchTab(url);
              finalize();
            }).catch(function (err) {
              finalize();
              helpers.alertErr(err);
            });
          } else {
            helpers.addToBlobCache(blobInfo);
            updateSrcAndSwitchTab(blobInfo.blobUri());
            api.unblock();
          }
        });
      });
    };
    var changeHandler = function (helpers, info, state) {
      return function (api, evt) {
        if (evt.name === 'src') {
          changeSrc(helpers, info, state, api);
        } else if (evt.name === 'images') {
          changeImages(helpers, info, state, api);
        } else if (evt.name === 'alt') {
          state.prevAlt = api.getData().alt;
        } else if (evt.name === 'style') {
          changeStyle(helpers, api);
        } else if (evt.name === 'vspace' || evt.name === 'hspace' || evt.name === 'border' || evt.name === 'borderstyle') {
          changeAStyle(helpers, info, api);
        } else if (evt.name === 'fileinput') {
          changeFileInput(helpers, info, state, api);
        } else if (evt.name === 'isDecorative') {
          if (api.getData().isDecorative) {
            api.disable('alt');
          } else {
            api.enable('alt');
          }
        }
      };
    };
    var closeHandler = function (state) {
      return function () {
        state.open = false;
      };
    };
    var makeDialogBody = function (info) {
      if (info.hasAdvTab || info.hasUploadUrl || info.hasUploadHandler) {
        var tabPanel = {
          type: 'tabpanel',
          tabs: flatten([
            [MainTab.makeTab(info)],
            info.hasAdvTab ? [AdvTab.makeTab(info)] : [],
            info.hasUploadTab && (info.hasUploadUrl || info.hasUploadHandler) ? [UploadTab.makeTab(info)] : []
          ])
        };
        return tabPanel;
      } else {
        var panel = {
          type: 'panel',
          items: MainTab.makeItems(info)
        };
        return panel;
      }
    };
    var makeDialog = function (helpers) {
      return function (info) {
        var state = createState(info);
        return {
          title: 'Insert/Edit Image',
          size: 'normal',
          body: makeDialogBody(info),
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
          initialData: fromImageData(info.image),
          onSubmit: helpers.onSubmit(info),
          onChange: changeHandler(helpers, info, state),
          onClose: closeHandler(state)
        };
      };
    };
    var submitHandler = function (editor) {
      return function (info) {
        return function (api) {
          var data = deepMerge(fromImageData(info.image), api.getData());
          editor.execCommand('mceUpdateImage', false, toImageData(data, info.hasAccessibilityOptions));
          editor.editorUpload.uploadImagesAuto();
          api.close();
        };
      };
    };
    var imageSize = function (editor) {
      return function (url) {
        return getImageSize(editor.documentBaseURI.toAbsolute(url)).then(function (dimensions) {
          return {
            width: String(dimensions.width),
            height: String(dimensions.height)
          };
        });
      };
    };
    var createBlobCache = function (editor) {
      return function (file, blobUri, dataUrl) {
        return editor.editorUpload.blobCache.create({
          blob: file,
          blobUri: blobUri,
          name: file.name ? file.name.replace(/\.[^\.]+$/, '') : null,
          base64: dataUrl.split(',')[1]
        });
      };
    };
    var addToBlobCache = function (editor) {
      return function (blobInfo) {
        editor.editorUpload.blobCache.add(blobInfo);
      };
    };
    var alertErr = function (editor) {
      return function (message) {
        editor.windowManager.alert(message);
      };
    };
    var normalizeCss$1 = function (editor) {
      return function (cssText) {
        return normalizeCss(editor, cssText);
      };
    };
    var parseStyle = function (editor) {
      return function (cssText) {
        return editor.dom.parseStyle(cssText);
      };
    };
    var serializeStyle = function (editor) {
      return function (stylesArg, name) {
        return editor.dom.serializeStyle(stylesArg, name);
      };
    };
    var Dialog = function (editor) {
      var helpers = {
        onSubmit: submitHandler(editor),
        imageSize: imageSize(editor),
        addToBlobCache: addToBlobCache(editor),
        createBlobCache: createBlobCache(editor),
        alertErr: alertErr(editor),
        normalizeCss: normalizeCss$1(editor),
        parseStyle: parseStyle(editor),
        serializeStyle: serializeStyle(editor)
      };
      var open = function () {
        return collect(editor).then(makeDialog(helpers)).then(function (spec) {
          return editor.windowManager.open(spec);
        });
      };
      var openLater = function () {
        open();
      };
      return {
        open: open,
        openLater: openLater
      };
    };

    var register = function (editor) {
      editor.addCommand('mceImage', Dialog(editor).openLater);
      editor.addCommand('mceUpdateImage', function (_ui, data) {
        editor.undoManager.transact(function () {
          return insertOrUpdateImage(editor, data);
        });
      });
    };

    var hasImageClass = function (node) {
      var className = node.attr('class');
      return className && /\bimage\b/.test(className);
    };
    var toggleContentEditableState = function (state) {
      return function (nodes) {
        var i = nodes.length;
        var toggleContentEditable = function (node) {
          node.attr('contenteditable', state ? 'true' : null);
        };
        while (i--) {
          var node = nodes[i];
          if (hasImageClass(node)) {
            node.attr('contenteditable', state ? 'false' : null);
            global$4.each(node.getAll('figcaption'), toggleContentEditable);
          }
        }
      };
    };
    var setup = function (editor) {
      editor.on('PreInit', function () {
        editor.parser.addNodeFilter('figure', toggleContentEditableState(true));
        editor.serializer.addNodeFilter('figure', toggleContentEditableState(false));
      });
    };

    var register$1 = function (editor) {
      editor.ui.registry.addToggleButton('image', {
        icon: 'image',
        tooltip: 'Insert/edit image',
        onAction: Dialog(editor).openLater,
        onSetup: function (buttonApi) {
          return editor.selection.selectorChangedWithUnbind('img:not([data-mce-object],[data-mce-placeholder]),figure.image', buttonApi.setActive).unbind;
        }
      });
      editor.ui.registry.addMenuItem('image', {
        icon: 'image',
        text: 'Image...',
        onAction: Dialog(editor).openLater
      });
      editor.ui.registry.addContextMenu('image', {
        update: function (element) {
          return isFigure(element) || isImage(element) && !isPlaceholderImage(element) ? ['image'] : [];
        }
      });
    };

    function Plugin () {
      global.add('image', function (editor) {
        setup(editor);
        register$1(editor);
        register(editor);
      });
    }

    Plugin();

}(window));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2ltYWdlL3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxTQUFTO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0RBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNHQUFzRzs7QUFFdEc7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsaUJBQWlCO0FBQzdEO0FBQ0E7QUFDQSxzREFBc0QsMEJBQTBCO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLFVBQVUsaUJBQWlCO0FBQ3pFO0FBQ0E7QUFDQSwyQ0FBMkMsaUJBQWlCO0FBQzVEO0FBQ0EscURBQXFELDBCQUEwQjtBQUMvRTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQLHVEQUF1RDtBQUN2RDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxjQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCOztBQUVsQjtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7O0FBRXJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLG1CQUFtQjtBQUM1QztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVCx1QkFBdUIsV0FBVztBQUNsQztBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZUFBZTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7O0FBRUEsQ0FBQyIsImZpbGUiOiJ2ZW5kb3JzfnRpbnltY2UtcGx1Z2luLWltYWdlfnRpbnltY2UtcGx1Z2luLWltYWdlLXBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICpcbiAqIFZlcnNpb246IDUuNC4yICgyMDIwLTA4LTE3KVxuICovXG4oZnVuY3Rpb24gKGRvbUdsb2JhbHMpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgZ2xvYmFsID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuUGx1Z2luTWFuYWdlcicpO1xuXG4gICAgdmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgfTtcbiAgICB2YXIgY29uc3RhbnQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgbmV2ZXIgPSBjb25zdGFudChmYWxzZSk7XG4gICAgdmFyIGFsd2F5cyA9IGNvbnN0YW50KHRydWUpO1xuXG4gICAgdmFyIG5vbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gTk9ORTtcbiAgICB9O1xuICAgIHZhciBOT05FID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGVxID0gZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgcmV0dXJuIG8uaXNOb25lKCk7XG4gICAgICB9O1xuICAgICAgdmFyIGNhbGwgPSBmdW5jdGlvbiAodGh1bmspIHtcbiAgICAgICAgcmV0dXJuIHRodW5rKCk7XG4gICAgICB9O1xuICAgICAgdmFyIGlkID0gZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgcmV0dXJuIG47XG4gICAgICB9O1xuICAgICAgdmFyIG1lID0ge1xuICAgICAgICBmb2xkOiBmdW5jdGlvbiAobiwgX3MpIHtcbiAgICAgICAgICByZXR1cm4gbigpO1xuICAgICAgICB9LFxuICAgICAgICBpczogbmV2ZXIsXG4gICAgICAgIGlzU29tZTogbmV2ZXIsXG4gICAgICAgIGlzTm9uZTogYWx3YXlzLFxuICAgICAgICBnZXRPcjogaWQsXG4gICAgICAgIGdldE9yVGh1bms6IGNhbGwsXG4gICAgICAgIGdldE9yRGllOiBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyB8fCAnZXJyb3I6IGdldE9yRGllIGNhbGxlZCBvbiBub25lLicpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRPck51bGw6IGNvbnN0YW50KG51bGwpLFxuICAgICAgICBnZXRPclVuZGVmaW5lZDogY29uc3RhbnQodW5kZWZpbmVkKSxcbiAgICAgICAgb3I6IGlkLFxuICAgICAgICBvclRodW5rOiBjYWxsLFxuICAgICAgICBtYXA6IG5vbmUsXG4gICAgICAgIGVhY2g6IG5vb3AsXG4gICAgICAgIGJpbmQ6IG5vbmUsXG4gICAgICAgIGV4aXN0czogbmV2ZXIsXG4gICAgICAgIGZvcmFsbDogYWx3YXlzLFxuICAgICAgICBmaWx0ZXI6IG5vbmUsXG4gICAgICAgIGVxdWFsczogZXEsXG4gICAgICAgIGVxdWFsc186IGVxLFxuICAgICAgICB0b0FycmF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9LFxuICAgICAgICB0b1N0cmluZzogY29uc3RhbnQoJ25vbmUoKScpXG4gICAgICB9O1xuICAgICAgcmV0dXJuIG1lO1xuICAgIH0oKTtcbiAgICB2YXIgc29tZSA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICB2YXIgY29uc3RhbnRfYSA9IGNvbnN0YW50KGEpO1xuICAgICAgdmFyIHNlbGYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBtZTtcbiAgICAgIH07XG4gICAgICB2YXIgYmluZCA9IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHJldHVybiBmKGEpO1xuICAgICAgfTtcbiAgICAgIHZhciBtZSA9IHtcbiAgICAgICAgZm9sZDogZnVuY3Rpb24gKG4sIHMpIHtcbiAgICAgICAgICByZXR1cm4gcyhhKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXM6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgcmV0dXJuIGEgPT09IHY7XG4gICAgICAgIH0sXG4gICAgICAgIGlzU29tZTogYWx3YXlzLFxuICAgICAgICBpc05vbmU6IG5ldmVyLFxuICAgICAgICBnZXRPcjogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JUaHVuazogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JEaWU6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yTnVsbDogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JVbmRlZmluZWQ6IGNvbnN0YW50X2EsXG4gICAgICAgIG9yOiBzZWxmLFxuICAgICAgICBvclRodW5rOiBzZWxmLFxuICAgICAgICBtYXA6IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgcmV0dXJuIHNvbWUoZihhKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVhY2g6IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgZihhKTtcbiAgICAgICAgfSxcbiAgICAgICAgYmluZDogYmluZCxcbiAgICAgICAgZXhpc3RzOiBiaW5kLFxuICAgICAgICBmb3JhbGw6IGJpbmQsXG4gICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICByZXR1cm4gZihhKSA/IG1lIDogTk9ORTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9BcnJheTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBbYV07XG4gICAgICAgIH0sXG4gICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuICdzb21lKCcgKyBhICsgJyknO1xuICAgICAgICB9LFxuICAgICAgICBlcXVhbHM6IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgICAgcmV0dXJuIG8uaXMoYSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVxdWFsc186IGZ1bmN0aW9uIChvLCBlbGVtZW50RXEpIHtcbiAgICAgICAgICByZXR1cm4gby5mb2xkKG5ldmVyLCBmdW5jdGlvbiAoYikge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRFcShhLCBiKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiBtZTtcbiAgICB9O1xuICAgIHZhciBmcm9tID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCA/IE5PTkUgOiBzb21lKHZhbHVlKTtcbiAgICB9O1xuICAgIHZhciBPcHRpb24gPSB7XG4gICAgICBzb21lOiBzb21lLFxuICAgICAgbm9uZTogbm9uZSxcbiAgICAgIGZyb206IGZyb21cbiAgICB9O1xuXG4gICAgdmFyIHR5cGVPZiA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICB2YXIgdCA9IHR5cGVvZiB4O1xuICAgICAgaWYgKHggPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICdudWxsJztcbiAgICAgIH0gZWxzZSBpZiAodCA9PT0gJ29iamVjdCcgJiYgKEFycmF5LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKHgpIHx8IHguY29uc3RydWN0b3IgJiYgeC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnQXJyYXknKSkge1xuICAgICAgICByZXR1cm4gJ2FycmF5JztcbiAgICAgIH0gZWxzZSBpZiAodCA9PT0gJ29iamVjdCcgJiYgKFN0cmluZy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZih4KSB8fCB4LmNvbnN0cnVjdG9yICYmIHguY29uc3RydWN0b3IubmFtZSA9PT0gJ1N0cmluZycpKSB7XG4gICAgICAgIHJldHVybiAnc3RyaW5nJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0O1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGlzVHlwZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0eXBlT2YodmFsdWUpID09PSB0eXBlO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBpc1NpbXBsZVR5cGUgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSB0eXBlO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBlcSA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgcmV0dXJuIHQgPT09IGE7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGlzU3RyaW5nID0gaXNUeXBlKCdzdHJpbmcnKTtcbiAgICB2YXIgaXNPYmplY3QgPSBpc1R5cGUoJ29iamVjdCcpO1xuICAgIHZhciBpc0FycmF5ID0gaXNUeXBlKCdhcnJheScpO1xuICAgIHZhciBpc051bGwgPSBlcShudWxsKTtcbiAgICB2YXIgaXNCb29sZWFuID0gaXNTaW1wbGVUeXBlKCdib29sZWFuJyk7XG4gICAgdmFyIGlzTnVtYmVyID0gaXNTaW1wbGVUeXBlKCdudW1iZXInKTtcblxuICAgIHZhciBuYXRpdmVQdXNoID0gQXJyYXkucHJvdG90eXBlLnB1c2g7XG4gICAgdmFyIGZsYXR0ZW4gPSBmdW5jdGlvbiAoeHMpIHtcbiAgICAgIHZhciByID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0geHMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgaWYgKCFpc0FycmF5KHhzW2ldKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXJyLmZsYXR0ZW4gaXRlbSAnICsgaSArICcgd2FzIG5vdCBhbiBhcnJheSwgaW5wdXQ6ICcgKyB4cyk7XG4gICAgICAgIH1cbiAgICAgICAgbmF0aXZlUHVzaC5hcHBseShyLCB4c1tpXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcjtcbiAgICB9O1xuICAgIHZhciBoZWFkID0gZnVuY3Rpb24gKHhzKSB7XG4gICAgICByZXR1cm4geHMubGVuZ3RoID09PSAwID8gT3B0aW9uLm5vbmUoKSA6IE9wdGlvbi5zb21lKHhzWzBdKTtcbiAgICB9O1xuICAgIHZhciBmaW5kTWFwID0gZnVuY3Rpb24gKGFyciwgZikge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHIgPSBmKGFycltpXSwgaSk7XG4gICAgICAgIGlmIChyLmlzU29tZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgIH07XG5cbiAgICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICAgIHZhciBkZWVwID0gZnVuY3Rpb24gKG9sZCwgbnUpIHtcbiAgICAgIHZhciBib3RoT2JqZWN0cyA9IGlzT2JqZWN0KG9sZCkgJiYgaXNPYmplY3QobnUpO1xuICAgICAgcmV0dXJuIGJvdGhPYmplY3RzID8gZGVlcE1lcmdlKG9sZCwgbnUpIDogbnU7XG4gICAgfTtcbiAgICB2YXIgYmFzZU1lcmdlID0gZnVuY3Rpb24gKG1lcmdlcikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9iamVjdHMgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIG9iamVjdHNbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9iamVjdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5cXCd0IG1lcmdlIHplcm8gb2JqZWN0cycpO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXQgPSB7fTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBvYmplY3RzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgdmFyIGN1ck9iamVjdCA9IG9iamVjdHNbal07XG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIGN1ck9iamVjdCkge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY3VyT2JqZWN0LCBrZXkpKSB7XG4gICAgICAgICAgICAgIHJldFtrZXldID0gbWVyZ2VyKHJldFtrZXldLCBjdXJPYmplY3Rba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGRlZXBNZXJnZSA9IGJhc2VNZXJnZShkZWVwKTtcblxuICAgIHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgZm9yICh2YXIgcCBpbiBzKVxuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIHZhciBHbG9iYWwgPSB0eXBlb2YgZG9tR2xvYmFscy53aW5kb3cgIT09ICd1bmRlZmluZWQnID8gZG9tR2xvYmFscy53aW5kb3cgOiBGdW5jdGlvbigncmV0dXJuIHRoaXM7JykoKTtcblxuICAgIHZhciByYXdTZXQgPSBmdW5jdGlvbiAoZG9tLCBrZXksIHZhbHVlKSB7XG4gICAgICBpZiAoaXNTdHJpbmcodmFsdWUpIHx8IGlzQm9vbGVhbih2YWx1ZSkgfHwgaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgICAgIGRvbS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSArICcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvbUdsb2JhbHMuY29uc29sZS5lcnJvcignSW52YWxpZCBjYWxsIHRvIEF0dHIuc2V0LiBLZXkgJywga2V5LCAnOjogVmFsdWUgJywgdmFsdWUsICc6OiBFbGVtZW50ICcsIGRvbSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQXR0cmlidXRlIHZhbHVlIHdhcyBub3Qgc2ltcGxlJyk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgc2V0ID0gZnVuY3Rpb24gKGVsZW1lbnQsIGtleSwgdmFsdWUpIHtcbiAgICAgIHJhd1NldChlbGVtZW50LmRvbSgpLCBrZXksIHZhbHVlKTtcbiAgICB9O1xuICAgIHZhciByZW1vdmUgPSBmdW5jdGlvbiAoZWxlbWVudCwga2V5KSB7XG4gICAgICBlbGVtZW50LmRvbSgpLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xuICAgIH07XG5cbiAgICB2YXIgZnJvbUh0bWwgPSBmdW5jdGlvbiAoaHRtbCwgc2NvcGUpIHtcbiAgICAgIHZhciBkb2MgPSBzY29wZSB8fCBkb21HbG9iYWxzLmRvY3VtZW50O1xuICAgICAgdmFyIGRpdiA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGRpdi5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgaWYgKCFkaXYuaGFzQ2hpbGROb2RlcygpIHx8IGRpdi5jaGlsZE5vZGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZG9tR2xvYmFscy5jb25zb2xlLmVycm9yKCdIVE1MIGRvZXMgbm90IGhhdmUgYSBzaW5nbGUgcm9vdCBub2RlJywgaHRtbCk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSFRNTCBtdXN0IGhhdmUgYSBzaW5nbGUgcm9vdCBub2RlJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZnJvbURvbShkaXYuY2hpbGROb2Rlc1swXSk7XG4gICAgfTtcbiAgICB2YXIgZnJvbVRhZyA9IGZ1bmN0aW9uICh0YWcsIHNjb3BlKSB7XG4gICAgICB2YXIgZG9jID0gc2NvcGUgfHwgZG9tR2xvYmFscy5kb2N1bWVudDtcbiAgICAgIHZhciBub2RlID0gZG9jLmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAgIHJldHVybiBmcm9tRG9tKG5vZGUpO1xuICAgIH07XG4gICAgdmFyIGZyb21UZXh0ID0gZnVuY3Rpb24gKHRleHQsIHNjb3BlKSB7XG4gICAgICB2YXIgZG9jID0gc2NvcGUgfHwgZG9tR2xvYmFscy5kb2N1bWVudDtcbiAgICAgIHZhciBub2RlID0gZG9jLmNyZWF0ZVRleHROb2RlKHRleHQpO1xuICAgICAgcmV0dXJuIGZyb21Eb20obm9kZSk7XG4gICAgfTtcbiAgICB2YXIgZnJvbURvbSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICBpZiAobm9kZSA9PT0gbnVsbCB8fCBub2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb2RlIGNhbm5vdCBiZSBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgZG9tOiBjb25zdGFudChub2RlKSB9O1xuICAgIH07XG4gICAgdmFyIGZyb21Qb2ludCA9IGZ1bmN0aW9uIChkb2NFbG0sIHgsIHkpIHtcbiAgICAgIHZhciBkb2MgPSBkb2NFbG0uZG9tKCk7XG4gICAgICByZXR1cm4gT3B0aW9uLmZyb20oZG9jLmVsZW1lbnRGcm9tUG9pbnQoeCwgeSkpLm1hcChmcm9tRG9tKTtcbiAgICB9O1xuICAgIHZhciBFbGVtZW50ID0ge1xuICAgICAgZnJvbUh0bWw6IGZyb21IdG1sLFxuICAgICAgZnJvbVRhZzogZnJvbVRhZyxcbiAgICAgIGZyb21UZXh0OiBmcm9tVGV4dCxcbiAgICAgIGZyb21Eb206IGZyb21Eb20sXG4gICAgICBmcm9tUG9pbnQ6IGZyb21Qb2ludFxuICAgIH07XG5cbiAgICB2YXIgZ2xvYmFsJDEgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5kb20uRE9NVXRpbHMnKTtcblxuICAgIHZhciBnbG9iYWwkMiA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuUHJvbWlzZScpO1xuXG4gICAgdmFyIGdsb2JhbCQzID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UudXRpbC5YSFInKTtcblxuICAgIHZhciBoYXNEaW1lbnNpb25zID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnaW1hZ2VfZGltZW5zaW9ucycsIHRydWUsICdib29sZWFuJyk7XG4gICAgfTtcbiAgICB2YXIgaGFzQWR2VGFiID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnaW1hZ2VfYWR2dGFiJywgZmFsc2UsICdib29sZWFuJyk7XG4gICAgfTtcbiAgICB2YXIgaGFzVXBsb2FkVGFiID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnaW1hZ2VfdXBsb2FkdGFiJywgdHJ1ZSwgJ2Jvb2xlYW4nKTtcbiAgICB9O1xuICAgIHZhciBnZXRQcmVwZW5kVXJsID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnaW1hZ2VfcHJlcGVuZF91cmwnLCAnJywgJ3N0cmluZycpO1xuICAgIH07XG4gICAgdmFyIGdldENsYXNzTGlzdCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2ltYWdlX2NsYXNzX2xpc3QnKTtcbiAgICB9O1xuICAgIHZhciBoYXNEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2ltYWdlX2Rlc2NyaXB0aW9uJywgdHJ1ZSwgJ2Jvb2xlYW4nKTtcbiAgICB9O1xuICAgIHZhciBoYXNJbWFnZVRpdGxlID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnaW1hZ2VfdGl0bGUnLCBmYWxzZSwgJ2Jvb2xlYW4nKTtcbiAgICB9O1xuICAgIHZhciBoYXNJbWFnZUNhcHRpb24gPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdpbWFnZV9jYXB0aW9uJywgZmFsc2UsICdib29sZWFuJyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0SW1hZ2VMaXN0ID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnaW1hZ2VfbGlzdCcsIGZhbHNlKTtcbiAgICB9O1xuICAgIHZhciBoYXNVcGxvYWRVcmwgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gISFnZXRVcGxvYWRVcmwoZWRpdG9yKTtcbiAgICB9O1xuICAgIHZhciBoYXNVcGxvYWRIYW5kbGVyID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuICEhZ2V0VXBsb2FkSGFuZGxlcihlZGl0b3IpO1xuICAgIH07XG4gICAgdmFyIGdldFVwbG9hZFVybCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2ltYWdlc191cGxvYWRfdXJsJywgJycsICdzdHJpbmcnKTtcbiAgICB9O1xuICAgIHZhciBnZXRVcGxvYWRIYW5kbGVyID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnaW1hZ2VzX3VwbG9hZF9oYW5kbGVyJywgdW5kZWZpbmVkLCAnZnVuY3Rpb24nKTtcbiAgICB9O1xuICAgIHZhciBnZXRVcGxvYWRCYXNlUGF0aCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2ltYWdlc191cGxvYWRfYmFzZV9wYXRoJywgdW5kZWZpbmVkLCAnc3RyaW5nJyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0VXBsb2FkQ3JlZGVudGlhbHMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdpbWFnZXNfdXBsb2FkX2NyZWRlbnRpYWxzJywgZmFsc2UsICdib29sZWFuJyk7XG4gICAgfTtcbiAgICB2YXIgc2hvd0FjY2Vzc2liaWxpdHlPcHRpb25zID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnYTExeV9hZHZhbmNlZF9vcHRpb25zJywgZmFsc2UsICdib29sZWFuJyk7XG4gICAgfTtcbiAgICB2YXIgaXNBdXRvbWF0aWNVcGxvYWRzRW5hYmxlZCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2F1dG9tYXRpY191cGxvYWRzJywgdHJ1ZSwgJ2Jvb2xlYW4nKTtcbiAgICB9O1xuXG4gICAgdmFyIHBhcnNlSW50QW5kR2V0TWF4ID0gZnVuY3Rpb24gKHZhbDEsIHZhbDIpIHtcbiAgICAgIHJldHVybiBNYXRoLm1heChwYXJzZUludCh2YWwxLCAxMCksIHBhcnNlSW50KHZhbDIsIDEwKSk7XG4gICAgfTtcbiAgICB2YXIgZ2V0SW1hZ2VTaXplID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgcmV0dXJuIG5ldyBnbG9iYWwkMihmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGltZyA9IGRvbUdsb2JhbHMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIHZhciBkb25lID0gZnVuY3Rpb24gKGRpbWVuc2lvbnMpIHtcbiAgICAgICAgICBpZiAoaW1nLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIGltZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGltZyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhbGxiYWNrKGRpbWVuc2lvbnMpO1xuICAgICAgICB9O1xuICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciB3aWR0aCA9IHBhcnNlSW50QW5kR2V0TWF4KGltZy53aWR0aCwgaW1nLmNsaWVudFdpZHRoKTtcbiAgICAgICAgICB2YXIgaGVpZ2h0ID0gcGFyc2VJbnRBbmRHZXRNYXgoaW1nLmhlaWdodCwgaW1nLmNsaWVudEhlaWdodCk7XG4gICAgICAgICAgdmFyIGRpbWVuc2lvbnMgPSB7XG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGhlaWdodFxuICAgICAgICAgIH07XG4gICAgICAgICAgZG9uZShnbG9iYWwkMi5yZXNvbHZlKGRpbWVuc2lvbnMpKTtcbiAgICAgICAgfTtcbiAgICAgICAgaW1nLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZG9uZShnbG9iYWwkMi5yZWplY3QoJ0ZhaWxlZCB0byBnZXQgaW1hZ2UgZGltZW5zaW9ucyBmb3I6ICcgKyB1cmwpKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHN0eWxlID0gaW1nLnN0eWxlO1xuICAgICAgICBzdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICAgIHN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgICAgc3R5bGUuYm90dG9tID0gc3R5bGUubGVmdCA9ICcwcHgnO1xuICAgICAgICBzdHlsZS53aWR0aCA9IHN0eWxlLmhlaWdodCA9ICdhdXRvJztcbiAgICAgICAgZG9tR2xvYmFscy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGltZyk7XG4gICAgICAgIGltZy5zcmMgPSB1cmw7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciByZW1vdmVQaXhlbFN1ZmZpeCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvcHgkLywgJycpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgdmFyIGFkZFBpeGVsU3VmZml4ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUubGVuZ3RoID4gMCAmJiAvXlswLTldKyQvLnRlc3QodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlICs9ICdweCc7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICB2YXIgbWVyZ2VNYXJnaW5zID0gZnVuY3Rpb24gKGNzcykge1xuICAgICAgaWYgKGNzcy5tYXJnaW4pIHtcbiAgICAgICAgdmFyIHNwbGl0TWFyZ2luID0gU3RyaW5nKGNzcy5tYXJnaW4pLnNwbGl0KCcgJyk7XG4gICAgICAgIHN3aXRjaCAoc3BsaXRNYXJnaW4ubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBjc3NbJ21hcmdpbi10b3AnXSA9IGNzc1snbWFyZ2luLXRvcCddIHx8IHNwbGl0TWFyZ2luWzBdO1xuICAgICAgICAgIGNzc1snbWFyZ2luLXJpZ2h0J10gPSBjc3NbJ21hcmdpbi1yaWdodCddIHx8IHNwbGl0TWFyZ2luWzBdO1xuICAgICAgICAgIGNzc1snbWFyZ2luLWJvdHRvbSddID0gY3NzWydtYXJnaW4tYm90dG9tJ10gfHwgc3BsaXRNYXJnaW5bMF07XG4gICAgICAgICAgY3NzWydtYXJnaW4tbGVmdCddID0gY3NzWydtYXJnaW4tbGVmdCddIHx8IHNwbGl0TWFyZ2luWzBdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgY3NzWydtYXJnaW4tdG9wJ10gPSBjc3NbJ21hcmdpbi10b3AnXSB8fCBzcGxpdE1hcmdpblswXTtcbiAgICAgICAgICBjc3NbJ21hcmdpbi1yaWdodCddID0gY3NzWydtYXJnaW4tcmlnaHQnXSB8fCBzcGxpdE1hcmdpblsxXTtcbiAgICAgICAgICBjc3NbJ21hcmdpbi1ib3R0b20nXSA9IGNzc1snbWFyZ2luLWJvdHRvbSddIHx8IHNwbGl0TWFyZ2luWzBdO1xuICAgICAgICAgIGNzc1snbWFyZ2luLWxlZnQnXSA9IGNzc1snbWFyZ2luLWxlZnQnXSB8fCBzcGxpdE1hcmdpblsxXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIGNzc1snbWFyZ2luLXRvcCddID0gY3NzWydtYXJnaW4tdG9wJ10gfHwgc3BsaXRNYXJnaW5bMF07XG4gICAgICAgICAgY3NzWydtYXJnaW4tcmlnaHQnXSA9IGNzc1snbWFyZ2luLXJpZ2h0J10gfHwgc3BsaXRNYXJnaW5bMV07XG4gICAgICAgICAgY3NzWydtYXJnaW4tYm90dG9tJ10gPSBjc3NbJ21hcmdpbi1ib3R0b20nXSB8fCBzcGxpdE1hcmdpblsyXTtcbiAgICAgICAgICBjc3NbJ21hcmdpbi1sZWZ0J10gPSBjc3NbJ21hcmdpbi1sZWZ0J10gfHwgc3BsaXRNYXJnaW5bMV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICBjc3NbJ21hcmdpbi10b3AnXSA9IGNzc1snbWFyZ2luLXRvcCddIHx8IHNwbGl0TWFyZ2luWzBdO1xuICAgICAgICAgIGNzc1snbWFyZ2luLXJpZ2h0J10gPSBjc3NbJ21hcmdpbi1yaWdodCddIHx8IHNwbGl0TWFyZ2luWzFdO1xuICAgICAgICAgIGNzc1snbWFyZ2luLWJvdHRvbSddID0gY3NzWydtYXJnaW4tYm90dG9tJ10gfHwgc3BsaXRNYXJnaW5bMl07XG4gICAgICAgICAgY3NzWydtYXJnaW4tbGVmdCddID0gY3NzWydtYXJnaW4tbGVmdCddIHx8IHNwbGl0TWFyZ2luWzNdO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSBjc3MubWFyZ2luO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNzcztcbiAgICB9O1xuICAgIHZhciBjcmVhdGVJbWFnZUxpc3QgPSBmdW5jdGlvbiAoZWRpdG9yLCBjYWxsYmFjaykge1xuICAgICAgdmFyIGltYWdlTGlzdCA9IGdldEltYWdlTGlzdChlZGl0b3IpO1xuICAgICAgaWYgKHR5cGVvZiBpbWFnZUxpc3QgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGdsb2JhbCQzLnNlbmQoe1xuICAgICAgICAgIHVybDogaW1hZ2VMaXN0LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgICAgICBjYWxsYmFjayhKU09OLnBhcnNlKHRleHQpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaW1hZ2VMaXN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGltYWdlTGlzdChjYWxsYmFjayk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjayhpbWFnZUxpc3QpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHdhaXRMb2FkSW1hZ2UgPSBmdW5jdGlvbiAoZWRpdG9yLCBkYXRhLCBpbWdFbG0pIHtcbiAgICAgIHZhciBzZWxlY3RJbWFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaW1nRWxtLm9ubG9hZCA9IGltZ0VsbS5vbmVycm9yID0gbnVsbDtcbiAgICAgICAgaWYgKGVkaXRvci5zZWxlY3Rpb24pIHtcbiAgICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLnNlbGVjdChpbWdFbG0pO1xuICAgICAgICAgIGVkaXRvci5ub2RlQ2hhbmdlZCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgaW1nRWxtLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFkYXRhLndpZHRoICYmICFkYXRhLmhlaWdodCAmJiBoYXNEaW1lbnNpb25zKGVkaXRvcikpIHtcbiAgICAgICAgICBlZGl0b3IuZG9tLnNldEF0dHJpYnMoaW1nRWxtLCB7XG4gICAgICAgICAgICB3aWR0aDogU3RyaW5nKGltZ0VsbS5jbGllbnRXaWR0aCksXG4gICAgICAgICAgICBoZWlnaHQ6IFN0cmluZyhpbWdFbG0uY2xpZW50SGVpZ2h0KVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHNlbGVjdEltYWdlKCk7XG4gICAgICB9O1xuICAgICAgaW1nRWxtLm9uZXJyb3IgPSBzZWxlY3RJbWFnZTtcbiAgICB9O1xuICAgIHZhciBibG9iVG9EYXRhVXJpID0gZnVuY3Rpb24gKGJsb2IpIHtcbiAgICAgIHJldHVybiBuZXcgZ2xvYmFsJDIoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgcmVhZGVyID0gbmV3IGRvbUdsb2JhbHMuRmlsZVJlYWRlcigpO1xuICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJlc29sdmUocmVhZGVyLnJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgICAgIHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJlamVjdChyZWFkZXIuZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH07XG4gICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGJsb2IpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgaXNQbGFjZWhvbGRlckltYWdlID0gZnVuY3Rpb24gKGltZ0VsbSkge1xuICAgICAgcmV0dXJuIGltZ0VsbS5ub2RlTmFtZSA9PT0gJ0lNRycgJiYgKGltZ0VsbS5oYXNBdHRyaWJ1dGUoJ2RhdGEtbWNlLW9iamVjdCcpIHx8IGltZ0VsbS5oYXNBdHRyaWJ1dGUoJ2RhdGEtbWNlLXBsYWNlaG9sZGVyJykpO1xuICAgIH07XG5cbiAgICB2YXIgRE9NID0gZ2xvYmFsJDEuRE9NO1xuICAgIHZhciBnZXRIc3BhY2UgPSBmdW5jdGlvbiAoaW1hZ2UpIHtcbiAgICAgIGlmIChpbWFnZS5zdHlsZS5tYXJnaW5MZWZ0ICYmIGltYWdlLnN0eWxlLm1hcmdpblJpZ2h0ICYmIGltYWdlLnN0eWxlLm1hcmdpbkxlZnQgPT09IGltYWdlLnN0eWxlLm1hcmdpblJpZ2h0KSB7XG4gICAgICAgIHJldHVybiByZW1vdmVQaXhlbFN1ZmZpeChpbWFnZS5zdHlsZS5tYXJnaW5MZWZ0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBnZXRWc3BhY2UgPSBmdW5jdGlvbiAoaW1hZ2UpIHtcbiAgICAgIGlmIChpbWFnZS5zdHlsZS5tYXJnaW5Ub3AgJiYgaW1hZ2Uuc3R5bGUubWFyZ2luQm90dG9tICYmIGltYWdlLnN0eWxlLm1hcmdpblRvcCA9PT0gaW1hZ2Uuc3R5bGUubWFyZ2luQm90dG9tKSB7XG4gICAgICAgIHJldHVybiByZW1vdmVQaXhlbFN1ZmZpeChpbWFnZS5zdHlsZS5tYXJnaW5Ub3ApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGdldEJvcmRlciA9IGZ1bmN0aW9uIChpbWFnZSkge1xuICAgICAgaWYgKGltYWdlLnN0eWxlLmJvcmRlcldpZHRoKSB7XG4gICAgICAgIHJldHVybiByZW1vdmVQaXhlbFN1ZmZpeChpbWFnZS5zdHlsZS5ib3JkZXJXaWR0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgZ2V0QXR0cmliID0gZnVuY3Rpb24gKGltYWdlLCBuYW1lKSB7XG4gICAgICBpZiAoaW1hZ2UuaGFzQXR0cmlidXRlKG5hbWUpKSB7XG4gICAgICAgIHJldHVybiBpbWFnZS5nZXRBdHRyaWJ1dGUobmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgZ2V0U3R5bGUgPSBmdW5jdGlvbiAoaW1hZ2UsIG5hbWUpIHtcbiAgICAgIHJldHVybiBpbWFnZS5zdHlsZVtuYW1lXSA/IGltYWdlLnN0eWxlW25hbWVdIDogJyc7XG4gICAgfTtcbiAgICB2YXIgaGFzQ2FwdGlvbiA9IGZ1bmN0aW9uIChpbWFnZSkge1xuICAgICAgcmV0dXJuIGltYWdlLnBhcmVudE5vZGUgIT09IG51bGwgJiYgaW1hZ2UucGFyZW50Tm9kZS5ub2RlTmFtZSA9PT0gJ0ZJR1VSRSc7XG4gICAgfTtcbiAgICB2YXIgdXBkYXRlQXR0cmliID0gZnVuY3Rpb24gKGltYWdlLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlID09PSAnJykge1xuICAgICAgICBpbWFnZS5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbWFnZS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHdyYXBJbkZpZ3VyZSA9IGZ1bmN0aW9uIChpbWFnZSkge1xuICAgICAgdmFyIGZpZ3VyZUVsbSA9IERPTS5jcmVhdGUoJ2ZpZ3VyZScsIHsgY2xhc3M6ICdpbWFnZScgfSk7XG4gICAgICBET00uaW5zZXJ0QWZ0ZXIoZmlndXJlRWxtLCBpbWFnZSk7XG4gICAgICBmaWd1cmVFbG0uYXBwZW5kQ2hpbGQoaW1hZ2UpO1xuICAgICAgZmlndXJlRWxtLmFwcGVuZENoaWxkKERPTS5jcmVhdGUoJ2ZpZ2NhcHRpb24nLCB7IGNvbnRlbnRFZGl0YWJsZTogJ3RydWUnIH0sICdDYXB0aW9uJykpO1xuICAgICAgZmlndXJlRWxtLmNvbnRlbnRFZGl0YWJsZSA9ICdmYWxzZSc7XG4gICAgfTtcbiAgICB2YXIgcmVtb3ZlRmlndXJlID0gZnVuY3Rpb24gKGltYWdlKSB7XG4gICAgICB2YXIgZmlndXJlRWxtID0gaW1hZ2UucGFyZW50Tm9kZTtcbiAgICAgIERPTS5pbnNlcnRBZnRlcihpbWFnZSwgZmlndXJlRWxtKTtcbiAgICAgIERPTS5yZW1vdmUoZmlndXJlRWxtKTtcbiAgICB9O1xuICAgIHZhciB0b2dnbGVDYXB0aW9uID0gZnVuY3Rpb24gKGltYWdlKSB7XG4gICAgICBpZiAoaGFzQ2FwdGlvbihpbWFnZSkpIHtcbiAgICAgICAgcmVtb3ZlRmlndXJlKGltYWdlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdyYXBJbkZpZ3VyZShpbWFnZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgbm9ybWFsaXplU3R5bGUgPSBmdW5jdGlvbiAoaW1hZ2UsIG5vcm1hbGl6ZUNzcykge1xuICAgICAgdmFyIGF0dHJWYWx1ZSA9IGltYWdlLmdldEF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgIHZhciB2YWx1ZSA9IG5vcm1hbGl6ZUNzcyhhdHRyVmFsdWUgIT09IG51bGwgPyBhdHRyVmFsdWUgOiAnJyk7XG4gICAgICBpZiAodmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgdmFsdWUpO1xuICAgICAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtbWNlLXN0eWxlJywgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW1hZ2UucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHNldFNpemUgPSBmdW5jdGlvbiAobmFtZSwgbm9ybWFsaXplQ3NzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGltYWdlLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgICBpZiAoaW1hZ2Uuc3R5bGVbbmFtZV0pIHtcbiAgICAgICAgICBpbWFnZS5zdHlsZVtuYW1lXSA9IGFkZFBpeGVsU3VmZml4KHZhbHVlKTtcbiAgICAgICAgICBub3JtYWxpemVTdHlsZShpbWFnZSwgbm9ybWFsaXplQ3NzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1cGRhdGVBdHRyaWIoaW1hZ2UsIG5hbWUsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBnZXRTaXplID0gZnVuY3Rpb24gKGltYWdlLCBuYW1lKSB7XG4gICAgICBpZiAoaW1hZ2Uuc3R5bGVbbmFtZV0pIHtcbiAgICAgICAgcmV0dXJuIHJlbW92ZVBpeGVsU3VmZml4KGltYWdlLnN0eWxlW25hbWVdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBnZXRBdHRyaWIoaW1hZ2UsIG5hbWUpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHNldEhzcGFjZSA9IGZ1bmN0aW9uIChpbWFnZSwgdmFsdWUpIHtcbiAgICAgIHZhciBweFZhbHVlID0gYWRkUGl4ZWxTdWZmaXgodmFsdWUpO1xuICAgICAgaW1hZ2Uuc3R5bGUubWFyZ2luTGVmdCA9IHB4VmFsdWU7XG4gICAgICBpbWFnZS5zdHlsZS5tYXJnaW5SaWdodCA9IHB4VmFsdWU7XG4gICAgfTtcbiAgICB2YXIgc2V0VnNwYWNlID0gZnVuY3Rpb24gKGltYWdlLCB2YWx1ZSkge1xuICAgICAgdmFyIHB4VmFsdWUgPSBhZGRQaXhlbFN1ZmZpeCh2YWx1ZSk7XG4gICAgICBpbWFnZS5zdHlsZS5tYXJnaW5Ub3AgPSBweFZhbHVlO1xuICAgICAgaW1hZ2Uuc3R5bGUubWFyZ2luQm90dG9tID0gcHhWYWx1ZTtcbiAgICB9O1xuICAgIHZhciBzZXRCb3JkZXIgPSBmdW5jdGlvbiAoaW1hZ2UsIHZhbHVlKSB7XG4gICAgICB2YXIgcHhWYWx1ZSA9IGFkZFBpeGVsU3VmZml4KHZhbHVlKTtcbiAgICAgIGltYWdlLnN0eWxlLmJvcmRlcldpZHRoID0gcHhWYWx1ZTtcbiAgICB9O1xuICAgIHZhciBzZXRCb3JkZXJTdHlsZSA9IGZ1bmN0aW9uIChpbWFnZSwgdmFsdWUpIHtcbiAgICAgIGltYWdlLnN0eWxlLmJvcmRlclN0eWxlID0gdmFsdWU7XG4gICAgfTtcbiAgICB2YXIgZ2V0Qm9yZGVyU3R5bGUgPSBmdW5jdGlvbiAoaW1hZ2UpIHtcbiAgICAgIHJldHVybiBnZXRTdHlsZShpbWFnZSwgJ2JvcmRlclN0eWxlJyk7XG4gICAgfTtcbiAgICB2YXIgaXNGaWd1cmUgPSBmdW5jdGlvbiAoZWxtKSB7XG4gICAgICByZXR1cm4gZWxtLm5vZGVOYW1lID09PSAnRklHVVJFJztcbiAgICB9O1xuICAgIHZhciBpc0ltYWdlID0gZnVuY3Rpb24gKGVsbSkge1xuICAgICAgcmV0dXJuIGVsbS5ub2RlTmFtZSA9PT0gJ0lNRyc7XG4gICAgfTtcbiAgICB2YXIgZ2V0SXNEZWNvcmF0aXZlID0gZnVuY3Rpb24gKGltYWdlKSB7XG4gICAgICByZXR1cm4gRE9NLmdldEF0dHJpYihpbWFnZSwgJ2FsdCcpLmxlbmd0aCA9PT0gMCAmJiBET00uZ2V0QXR0cmliKGltYWdlLCAncm9sZScpID09PSAncHJlc2VudGF0aW9uJztcbiAgICB9O1xuICAgIHZhciBnZXRBbHQgPSBmdW5jdGlvbiAoaW1hZ2UpIHtcbiAgICAgIGlmIChnZXRJc0RlY29yYXRpdmUoaW1hZ2UpKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBnZXRBdHRyaWIoaW1hZ2UsICdhbHQnKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBkZWZhdWx0RGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNyYzogJycsXG4gICAgICAgIGFsdDogJycsXG4gICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgd2lkdGg6ICcnLFxuICAgICAgICBoZWlnaHQ6ICcnLFxuICAgICAgICBjbGFzczogJycsXG4gICAgICAgIHN0eWxlOiAnJyxcbiAgICAgICAgY2FwdGlvbjogZmFsc2UsXG4gICAgICAgIGhzcGFjZTogJycsXG4gICAgICAgIHZzcGFjZTogJycsXG4gICAgICAgIGJvcmRlcjogJycsXG4gICAgICAgIGJvcmRlclN0eWxlOiAnJyxcbiAgICAgICAgaXNEZWNvcmF0aXZlOiBmYWxzZVxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBnZXRTdHlsZVZhbHVlID0gZnVuY3Rpb24gKG5vcm1hbGl6ZUNzcywgZGF0YSkge1xuICAgICAgdmFyIGltYWdlID0gZG9tR2xvYmFscy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIHVwZGF0ZUF0dHJpYihpbWFnZSwgJ3N0eWxlJywgZGF0YS5zdHlsZSk7XG4gICAgICBpZiAoZ2V0SHNwYWNlKGltYWdlKSB8fCBkYXRhLmhzcGFjZSAhPT0gJycpIHtcbiAgICAgICAgc2V0SHNwYWNlKGltYWdlLCBkYXRhLmhzcGFjZSk7XG4gICAgICB9XG4gICAgICBpZiAoZ2V0VnNwYWNlKGltYWdlKSB8fCBkYXRhLnZzcGFjZSAhPT0gJycpIHtcbiAgICAgICAgc2V0VnNwYWNlKGltYWdlLCBkYXRhLnZzcGFjZSk7XG4gICAgICB9XG4gICAgICBpZiAoZ2V0Qm9yZGVyKGltYWdlKSB8fCBkYXRhLmJvcmRlciAhPT0gJycpIHtcbiAgICAgICAgc2V0Qm9yZGVyKGltYWdlLCBkYXRhLmJvcmRlcik7XG4gICAgICB9XG4gICAgICBpZiAoZ2V0Qm9yZGVyU3R5bGUoaW1hZ2UpIHx8IGRhdGEuYm9yZGVyU3R5bGUgIT09ICcnKSB7XG4gICAgICAgIHNldEJvcmRlclN0eWxlKGltYWdlLCBkYXRhLmJvcmRlclN0eWxlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBub3JtYWxpemVDc3MoaW1hZ2UuZ2V0QXR0cmlidXRlKCdzdHlsZScpKTtcbiAgICB9O1xuICAgIHZhciBjcmVhdGUgPSBmdW5jdGlvbiAobm9ybWFsaXplQ3NzLCBkYXRhKSB7XG4gICAgICB2YXIgaW1hZ2UgPSBkb21HbG9iYWxzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgd3JpdGUobm9ybWFsaXplQ3NzLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZGF0YSksIHsgY2FwdGlvbjogZmFsc2UgfSksIGltYWdlKTtcbiAgICAgIHNldEFsdChpbWFnZSwgZGF0YS5hbHQsIGRhdGEuaXNEZWNvcmF0aXZlKTtcbiAgICAgIGlmIChkYXRhLmNhcHRpb24pIHtcbiAgICAgICAgdmFyIGZpZ3VyZSA9IERPTS5jcmVhdGUoJ2ZpZ3VyZScsIHsgY2xhc3M6ICdpbWFnZScgfSk7XG4gICAgICAgIGZpZ3VyZS5hcHBlbmRDaGlsZChpbWFnZSk7XG4gICAgICAgIGZpZ3VyZS5hcHBlbmRDaGlsZChET00uY3JlYXRlKCdmaWdjYXB0aW9uJywgeyBjb250ZW50RWRpdGFibGU6ICd0cnVlJyB9LCAnQ2FwdGlvbicpKTtcbiAgICAgICAgZmlndXJlLmNvbnRlbnRFZGl0YWJsZSA9ICdmYWxzZSc7XG4gICAgICAgIHJldHVybiBmaWd1cmU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaW1hZ2U7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgcmVhZCA9IGZ1bmN0aW9uIChub3JtYWxpemVDc3MsIGltYWdlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzcmM6IGdldEF0dHJpYihpbWFnZSwgJ3NyYycpLFxuICAgICAgICBhbHQ6IGdldEFsdChpbWFnZSksXG4gICAgICAgIHRpdGxlOiBnZXRBdHRyaWIoaW1hZ2UsICd0aXRsZScpLFxuICAgICAgICB3aWR0aDogZ2V0U2l6ZShpbWFnZSwgJ3dpZHRoJyksXG4gICAgICAgIGhlaWdodDogZ2V0U2l6ZShpbWFnZSwgJ2hlaWdodCcpLFxuICAgICAgICBjbGFzczogZ2V0QXR0cmliKGltYWdlLCAnY2xhc3MnKSxcbiAgICAgICAgc3R5bGU6IG5vcm1hbGl6ZUNzcyhnZXRBdHRyaWIoaW1hZ2UsICdzdHlsZScpKSxcbiAgICAgICAgY2FwdGlvbjogaGFzQ2FwdGlvbihpbWFnZSksXG4gICAgICAgIGhzcGFjZTogZ2V0SHNwYWNlKGltYWdlKSxcbiAgICAgICAgdnNwYWNlOiBnZXRWc3BhY2UoaW1hZ2UpLFxuICAgICAgICBib3JkZXI6IGdldEJvcmRlcihpbWFnZSksXG4gICAgICAgIGJvcmRlclN0eWxlOiBnZXRTdHlsZShpbWFnZSwgJ2JvcmRlclN0eWxlJyksXG4gICAgICAgIGlzRGVjb3JhdGl2ZTogZ2V0SXNEZWNvcmF0aXZlKGltYWdlKVxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciB1cGRhdGVQcm9wID0gZnVuY3Rpb24gKGltYWdlLCBvbGREYXRhLCBuZXdEYXRhLCBuYW1lLCBzZXQpIHtcbiAgICAgIGlmIChuZXdEYXRhW25hbWVdICE9PSBvbGREYXRhW25hbWVdKSB7XG4gICAgICAgIHNldChpbWFnZSwgbmFtZSwgbmV3RGF0YVtuYW1lXSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgc2V0QWx0ID0gZnVuY3Rpb24gKGltYWdlLCBhbHQsIGlzRGVjb3JhdGl2ZSkge1xuICAgICAgaWYgKGlzRGVjb3JhdGl2ZSkge1xuICAgICAgICBET00uc2V0QXR0cmliKGltYWdlLCAncm9sZScsICdwcmVzZW50YXRpb24nKTtcbiAgICAgICAgdmFyIHN1Z2FySW1hZ2UgPSBFbGVtZW50LmZyb21Eb20oaW1hZ2UpO1xuICAgICAgICBzZXQoc3VnYXJJbWFnZSwgJ2FsdCcsICcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpc051bGwoYWx0KSkge1xuICAgICAgICAgIHZhciBzdWdhckltYWdlID0gRWxlbWVudC5mcm9tRG9tKGltYWdlKTtcbiAgICAgICAgICByZW1vdmUoc3VnYXJJbWFnZSwgJ2FsdCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBzdWdhckltYWdlID0gRWxlbWVudC5mcm9tRG9tKGltYWdlKTtcbiAgICAgICAgICBzZXQoc3VnYXJJbWFnZSwgJ2FsdCcsIGFsdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKERPTS5nZXRBdHRyaWIoaW1hZ2UsICdyb2xlJykgPT09ICdwcmVzZW50YXRpb24nKSB7XG4gICAgICAgICAgRE9NLnNldEF0dHJpYihpbWFnZSwgJ3JvbGUnLCAnJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciB1cGRhdGVBbHQgPSBmdW5jdGlvbiAoaW1hZ2UsIG9sZERhdGEsIG5ld0RhdGEpIHtcbiAgICAgIGlmIChuZXdEYXRhLmFsdCAhPT0gb2xkRGF0YS5hbHQgfHwgbmV3RGF0YS5pc0RlY29yYXRpdmUgIT09IG9sZERhdGEuaXNEZWNvcmF0aXZlKSB7XG4gICAgICAgIHNldEFsdChpbWFnZSwgbmV3RGF0YS5hbHQsIG5ld0RhdGEuaXNEZWNvcmF0aXZlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBub3JtYWxpemVkID0gZnVuY3Rpb24gKHNldCwgbm9ybWFsaXplQ3NzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGltYWdlLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgICBzZXQoaW1hZ2UsIHZhbHVlKTtcbiAgICAgICAgbm9ybWFsaXplU3R5bGUoaW1hZ2UsIG5vcm1hbGl6ZUNzcyk7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHdyaXRlID0gZnVuY3Rpb24gKG5vcm1hbGl6ZUNzcywgbmV3RGF0YSwgaW1hZ2UpIHtcbiAgICAgIHZhciBvbGREYXRhID0gcmVhZChub3JtYWxpemVDc3MsIGltYWdlKTtcbiAgICAgIHVwZGF0ZVByb3AoaW1hZ2UsIG9sZERhdGEsIG5ld0RhdGEsICdjYXB0aW9uJywgZnVuY3Rpb24gKGltYWdlLCBfbmFtZSwgX3ZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0b2dnbGVDYXB0aW9uKGltYWdlKTtcbiAgICAgIH0pO1xuICAgICAgdXBkYXRlUHJvcChpbWFnZSwgb2xkRGF0YSwgbmV3RGF0YSwgJ3NyYycsIHVwZGF0ZUF0dHJpYik7XG4gICAgICB1cGRhdGVQcm9wKGltYWdlLCBvbGREYXRhLCBuZXdEYXRhLCAndGl0bGUnLCB1cGRhdGVBdHRyaWIpO1xuICAgICAgdXBkYXRlUHJvcChpbWFnZSwgb2xkRGF0YSwgbmV3RGF0YSwgJ3dpZHRoJywgc2V0U2l6ZSgnd2lkdGgnLCBub3JtYWxpemVDc3MpKTtcbiAgICAgIHVwZGF0ZVByb3AoaW1hZ2UsIG9sZERhdGEsIG5ld0RhdGEsICdoZWlnaHQnLCBzZXRTaXplKCdoZWlnaHQnLCBub3JtYWxpemVDc3MpKTtcbiAgICAgIHVwZGF0ZVByb3AoaW1hZ2UsIG9sZERhdGEsIG5ld0RhdGEsICdjbGFzcycsIHVwZGF0ZUF0dHJpYik7XG4gICAgICB1cGRhdGVQcm9wKGltYWdlLCBvbGREYXRhLCBuZXdEYXRhLCAnc3R5bGUnLCBub3JtYWxpemVkKGZ1bmN0aW9uIChpbWFnZSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHVwZGF0ZUF0dHJpYihpbWFnZSwgJ3N0eWxlJywgdmFsdWUpO1xuICAgICAgfSwgbm9ybWFsaXplQ3NzKSk7XG4gICAgICB1cGRhdGVQcm9wKGltYWdlLCBvbGREYXRhLCBuZXdEYXRhLCAnaHNwYWNlJywgbm9ybWFsaXplZChzZXRIc3BhY2UsIG5vcm1hbGl6ZUNzcykpO1xuICAgICAgdXBkYXRlUHJvcChpbWFnZSwgb2xkRGF0YSwgbmV3RGF0YSwgJ3ZzcGFjZScsIG5vcm1hbGl6ZWQoc2V0VnNwYWNlLCBub3JtYWxpemVDc3MpKTtcbiAgICAgIHVwZGF0ZVByb3AoaW1hZ2UsIG9sZERhdGEsIG5ld0RhdGEsICdib3JkZXInLCBub3JtYWxpemVkKHNldEJvcmRlciwgbm9ybWFsaXplQ3NzKSk7XG4gICAgICB1cGRhdGVQcm9wKGltYWdlLCBvbGREYXRhLCBuZXdEYXRhLCAnYm9yZGVyU3R5bGUnLCBub3JtYWxpemVkKHNldEJvcmRlclN0eWxlLCBub3JtYWxpemVDc3MpKTtcbiAgICAgIHVwZGF0ZUFsdChpbWFnZSwgb2xkRGF0YSwgbmV3RGF0YSk7XG4gICAgfTtcblxuICAgIHZhciBub3JtYWxpemVDc3MgPSBmdW5jdGlvbiAoZWRpdG9yLCBjc3NUZXh0KSB7XG4gICAgICB2YXIgY3NzID0gZWRpdG9yLmRvbS5zdHlsZXMucGFyc2UoY3NzVGV4dCk7XG4gICAgICB2YXIgbWVyZ2VkQ3NzID0gbWVyZ2VNYXJnaW5zKGNzcyk7XG4gICAgICB2YXIgY29tcHJlc3NlZCA9IGVkaXRvci5kb20uc3R5bGVzLnBhcnNlKGVkaXRvci5kb20uc3R5bGVzLnNlcmlhbGl6ZShtZXJnZWRDc3MpKTtcbiAgICAgIHJldHVybiBlZGl0b3IuZG9tLnN0eWxlcy5zZXJpYWxpemUoY29tcHJlc3NlZCk7XG4gICAgfTtcbiAgICB2YXIgZ2V0U2VsZWN0ZWRJbWFnZSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBpbWdFbG0gPSBlZGl0b3Iuc2VsZWN0aW9uLmdldE5vZGUoKTtcbiAgICAgIHZhciBmaWd1cmVFbG0gPSBlZGl0b3IuZG9tLmdldFBhcmVudChpbWdFbG0sICdmaWd1cmUuaW1hZ2UnKTtcbiAgICAgIGlmIChmaWd1cmVFbG0pIHtcbiAgICAgICAgcmV0dXJuIGVkaXRvci5kb20uc2VsZWN0KCdpbWcnLCBmaWd1cmVFbG0pWzBdO1xuICAgICAgfVxuICAgICAgaWYgKGltZ0VsbSAmJiAoaW1nRWxtLm5vZGVOYW1lICE9PSAnSU1HJyB8fCBpc1BsYWNlaG9sZGVySW1hZ2UoaW1nRWxtKSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gaW1nRWxtO1xuICAgIH07XG4gICAgdmFyIHNwbGl0VGV4dEJsb2NrID0gZnVuY3Rpb24gKGVkaXRvciwgZmlndXJlKSB7XG4gICAgICB2YXIgZG9tID0gZWRpdG9yLmRvbTtcbiAgICAgIHZhciB0ZXh0QmxvY2sgPSBkb20uZ2V0UGFyZW50KGZpZ3VyZS5wYXJlbnROb2RlLCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICByZXR1cm4gISFlZGl0b3Iuc2NoZW1hLmdldFRleHRCbG9ja0VsZW1lbnRzKClbbm9kZS5ub2RlTmFtZV07XG4gICAgICB9LCBlZGl0b3IuZ2V0Qm9keSgpKTtcbiAgICAgIGlmICh0ZXh0QmxvY2spIHtcbiAgICAgICAgcmV0dXJuIGRvbS5zcGxpdCh0ZXh0QmxvY2ssIGZpZ3VyZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmlndXJlO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHJlYWRJbWFnZURhdGFGcm9tU2VsZWN0aW9uID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGltYWdlID0gZ2V0U2VsZWN0ZWRJbWFnZShlZGl0b3IpO1xuICAgICAgcmV0dXJuIGltYWdlID8gcmVhZChmdW5jdGlvbiAoY3NzKSB7XG4gICAgICAgIHJldHVybiBub3JtYWxpemVDc3MoZWRpdG9yLCBjc3MpO1xuICAgICAgfSwgaW1hZ2UpIDogZGVmYXVsdERhdGEoKTtcbiAgICB9O1xuICAgIHZhciBpbnNlcnRJbWFnZUF0Q2FyZXQgPSBmdW5jdGlvbiAoZWRpdG9yLCBkYXRhKSB7XG4gICAgICB2YXIgZWxtID0gY3JlYXRlKGZ1bmN0aW9uIChjc3MpIHtcbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZUNzcyhlZGl0b3IsIGNzcyk7XG4gICAgICB9LCBkYXRhKTtcbiAgICAgIGVkaXRvci5kb20uc2V0QXR0cmliKGVsbSwgJ2RhdGEtbWNlLWlkJywgJ19fbWNlbmV3Jyk7XG4gICAgICBlZGl0b3IuZm9jdXMoKTtcbiAgICAgIGVkaXRvci5zZWxlY3Rpb24uc2V0Q29udGVudChlbG0ub3V0ZXJIVE1MKTtcbiAgICAgIHZhciBpbnNlcnRlZEVsbSA9IGVkaXRvci5kb20uc2VsZWN0KCcqW2RhdGEtbWNlLWlkPVwiX19tY2VuZXdcIl0nKVswXTtcbiAgICAgIGVkaXRvci5kb20uc2V0QXR0cmliKGluc2VydGVkRWxtLCAnZGF0YS1tY2UtaWQnLCBudWxsKTtcbiAgICAgIGlmIChpc0ZpZ3VyZShpbnNlcnRlZEVsbSkpIHtcbiAgICAgICAgdmFyIGZpZ3VyZSA9IHNwbGl0VGV4dEJsb2NrKGVkaXRvciwgaW5zZXJ0ZWRFbG0pO1xuICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLnNlbGVjdChmaWd1cmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5zZWxlY3QoaW5zZXJ0ZWRFbG0pO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHN5bmNTcmNBdHRyID0gZnVuY3Rpb24gKGVkaXRvciwgaW1hZ2UpIHtcbiAgICAgIGVkaXRvci5kb20uc2V0QXR0cmliKGltYWdlLCAnc3JjJywgaW1hZ2UuZ2V0QXR0cmlidXRlKCdzcmMnKSk7XG4gICAgfTtcbiAgICB2YXIgZGVsZXRlSW1hZ2UgPSBmdW5jdGlvbiAoZWRpdG9yLCBpbWFnZSkge1xuICAgICAgaWYgKGltYWdlKSB7XG4gICAgICAgIHZhciBlbG0gPSBlZGl0b3IuZG9tLmlzKGltYWdlLnBhcmVudE5vZGUsICdmaWd1cmUuaW1hZ2UnKSA/IGltYWdlLnBhcmVudE5vZGUgOiBpbWFnZTtcbiAgICAgICAgZWRpdG9yLmRvbS5yZW1vdmUoZWxtKTtcbiAgICAgICAgZWRpdG9yLmZvY3VzKCk7XG4gICAgICAgIGVkaXRvci5ub2RlQ2hhbmdlZCgpO1xuICAgICAgICBpZiAoZWRpdG9yLmRvbS5pc0VtcHR5KGVkaXRvci5nZXRCb2R5KCkpKSB7XG4gICAgICAgICAgZWRpdG9yLnNldENvbnRlbnQoJycpO1xuICAgICAgICAgIGVkaXRvci5zZWxlY3Rpb24uc2V0Q3Vyc29yTG9jYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHdyaXRlSW1hZ2VEYXRhVG9TZWxlY3Rpb24gPSBmdW5jdGlvbiAoZWRpdG9yLCBkYXRhKSB7XG4gICAgICB2YXIgaW1hZ2UgPSBnZXRTZWxlY3RlZEltYWdlKGVkaXRvcik7XG4gICAgICB3cml0ZShmdW5jdGlvbiAoY3NzKSB7XG4gICAgICAgIHJldHVybiBub3JtYWxpemVDc3MoZWRpdG9yLCBjc3MpO1xuICAgICAgfSwgZGF0YSwgaW1hZ2UpO1xuICAgICAgc3luY1NyY0F0dHIoZWRpdG9yLCBpbWFnZSk7XG4gICAgICBpZiAoaXNGaWd1cmUoaW1hZ2UucGFyZW50Tm9kZSkpIHtcbiAgICAgICAgdmFyIGZpZ3VyZSA9IGltYWdlLnBhcmVudE5vZGU7XG4gICAgICAgIHNwbGl0VGV4dEJsb2NrKGVkaXRvciwgZmlndXJlKTtcbiAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5zZWxlY3QoaW1hZ2UucGFyZW50Tm9kZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLnNlbGVjdChpbWFnZSk7XG4gICAgICAgIHdhaXRMb2FkSW1hZ2UoZWRpdG9yLCBkYXRhLCBpbWFnZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgaW5zZXJ0T3JVcGRhdGVJbWFnZSA9IGZ1bmN0aW9uIChlZGl0b3IsIHBhcnRpYWxEYXRhKSB7XG4gICAgICB2YXIgaW1hZ2UgPSBnZXRTZWxlY3RlZEltYWdlKGVkaXRvcik7XG4gICAgICBpZiAoaW1hZ2UpIHtcbiAgICAgICAgdmFyIHNlbGVjdGVkSW1hZ2VEYXRhID0gcmVhZChmdW5jdGlvbiAoY3NzKSB7XG4gICAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZUNzcyhlZGl0b3IsIGNzcyk7XG4gICAgICAgIH0sIGltYWdlKTtcbiAgICAgICAgdmFyIGRhdGEgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgc2VsZWN0ZWRJbWFnZURhdGEpLCBwYXJ0aWFsRGF0YSk7XG4gICAgICAgIGlmIChkYXRhLnNyYykge1xuICAgICAgICAgIHdyaXRlSW1hZ2VEYXRhVG9TZWxlY3Rpb24oZWRpdG9yLCBkYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGVJbWFnZShlZGl0b3IsIGltYWdlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwYXJ0aWFsRGF0YS5zcmMpIHtcbiAgICAgICAgaW5zZXJ0SW1hZ2VBdENhcmV0KGVkaXRvciwgX19hc3NpZ24oX19hc3NpZ24oe30sIGRlZmF1bHREYXRhKCkpLCBwYXJ0aWFsRGF0YSkpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgZ2xvYmFsJDQgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS51dGlsLlRvb2xzJyk7XG5cbiAgICB2YXIgZ2V0VmFsdWUgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIGlzU3RyaW5nKGl0ZW0udmFsdWUpID8gaXRlbS52YWx1ZSA6ICcnO1xuICAgIH07XG4gICAgdmFyIHNhbml0aXplTGlzdCA9IGZ1bmN0aW9uIChsaXN0LCBleHRyYWN0VmFsdWUpIHtcbiAgICAgIHZhciBvdXQgPSBbXTtcbiAgICAgIGdsb2JhbCQ0LmVhY2gobGlzdCwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgdmFyIHRleHQgPSBpc1N0cmluZyhpdGVtLnRleHQpID8gaXRlbS50ZXh0IDogaXNTdHJpbmcoaXRlbS50aXRsZSkgPyBpdGVtLnRpdGxlIDogJyc7XG4gICAgICAgIGlmIChpdGVtLm1lbnUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHZhciBpdGVtcyA9IHNhbml0aXplTGlzdChpdGVtLm1lbnUsIGV4dHJhY3RWYWx1ZSk7XG4gICAgICAgICAgb3V0LnB1c2goe1xuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIGl0ZW1zOiBpdGVtc1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciB2YWx1ZSA9IGV4dHJhY3RWYWx1ZShpdGVtKTtcbiAgICAgICAgICBvdXQucHVzaCh7XG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG91dDtcbiAgICB9O1xuICAgIHZhciBzYW5pdGl6ZXIgPSBmdW5jdGlvbiAoZXh0cmFjdGVyKSB7XG4gICAgICBpZiAoZXh0cmFjdGVyID09PSB2b2lkIDApIHtcbiAgICAgICAgZXh0cmFjdGVyID0gZ2V0VmFsdWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGxpc3QpIHtcbiAgICAgICAgaWYgKGxpc3QpIHtcbiAgICAgICAgICByZXR1cm4gT3B0aW9uLmZyb20obGlzdCkubWFwKGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gc2FuaXRpemVMaXN0KGxpc3QsIGV4dHJhY3Rlcik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIE9wdGlvbi5ub25lKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgc2FuaXRpemUgPSBmdW5jdGlvbiAobGlzdCkge1xuICAgICAgcmV0dXJuIHNhbml0aXplcihnZXRWYWx1ZSkobGlzdCk7XG4gICAgfTtcbiAgICB2YXIgaXNHcm91cCA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGl0ZW0sICdpdGVtcycpO1xuICAgIH07XG4gICAgdmFyIGZpbmRFbnRyeURlbGVnYXRlID0gZnVuY3Rpb24gKGxpc3QsIHZhbHVlKSB7XG4gICAgICByZXR1cm4gZmluZE1hcChsaXN0LCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBpZiAoaXNHcm91cChpdGVtKSkge1xuICAgICAgICAgIHJldHVybiBmaW5kRW50cnlEZWxlZ2F0ZShpdGVtLml0ZW1zLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS52YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gT3B0aW9uLnNvbWUoaXRlbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIE9wdGlvbi5ub25lKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGZpbmRFbnRyeSA9IGZ1bmN0aW9uIChvcHRMaXN0LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9wdExpc3QuYmluZChmdW5jdGlvbiAobGlzdCkge1xuICAgICAgICByZXR1cm4gZmluZEVudHJ5RGVsZWdhdGUobGlzdCwgdmFsdWUpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgTGlzdFV0aWxzID0ge1xuICAgICAgc2FuaXRpemVyOiBzYW5pdGl6ZXIsXG4gICAgICBzYW5pdGl6ZTogc2FuaXRpemUsXG4gICAgICBmaW5kRW50cnk6IGZpbmRFbnRyeVxuICAgIH07XG5cbiAgICB2YXIgcGF0aEpvaW4gPSBmdW5jdGlvbiAocGF0aDEsIHBhdGgyKSB7XG4gICAgICBpZiAocGF0aDEpIHtcbiAgICAgICAgcmV0dXJuIHBhdGgxLnJlcGxhY2UoL1xcLyQvLCAnJykgKyAnLycgKyBwYXRoMi5yZXBsYWNlKC9eXFwvLywgJycpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBhdGgyO1xuICAgIH07XG4gICAgZnVuY3Rpb24gVXBsb2FkZXIgKHNldHRpbmdzKSB7XG4gICAgICB2YXIgZGVmYXVsdEhhbmRsZXIgPSBmdW5jdGlvbiAoYmxvYkluZm8sIHN1Y2Nlc3MsIGZhaWx1cmUsIHByb2dyZXNzKSB7XG4gICAgICAgIHZhciB4aHIgPSBuZXcgZG9tR2xvYmFscy5YTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIub3BlbignUE9TVCcsIHNldHRpbmdzLnVybCk7XG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSBzZXR0aW5ncy5jcmVkZW50aWFscztcbiAgICAgICAgeGhyLnVwbG9hZC5vbnByb2dyZXNzID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBwcm9ncmVzcyhlLmxvYWRlZCAvIGUudG90YWwgKiAxMDApO1xuICAgICAgICB9O1xuICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBmYWlsdXJlKCdJbWFnZSB1cGxvYWQgZmFpbGVkIGR1ZSB0byBhIFhIUiBUcmFuc3BvcnQgZXJyb3IuIENvZGU6ICcgKyB4aHIuc3RhdHVzKTtcbiAgICAgICAgfTtcbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA8IDIwMCB8fCB4aHIuc3RhdHVzID49IDMwMCkge1xuICAgICAgICAgICAgZmFpbHVyZSgnSFRUUCBFcnJvcjogJyArIHhoci5zdGF0dXMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIganNvbiA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgaWYgKCFqc29uIHx8IHR5cGVvZiBqc29uLmxvY2F0aW9uICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZmFpbHVyZSgnSW52YWxpZCBKU09OOiAnICsgeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHN1Y2Nlc3MocGF0aEpvaW4oc2V0dGluZ3MuYmFzZVBhdGgsIGpzb24ubG9jYXRpb24pKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGZvcm1EYXRhID0gbmV3IGRvbUdsb2JhbHMuRm9ybURhdGEoKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdmaWxlJywgYmxvYkluZm8uYmxvYigpLCBibG9iSW5mby5maWxlbmFtZSgpKTtcbiAgICAgICAgeGhyLnNlbmQoZm9ybURhdGEpO1xuICAgICAgfTtcbiAgICAgIHZhciB1cGxvYWRCbG9iID0gZnVuY3Rpb24gKGJsb2JJbmZvLCBoYW5kbGVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgZ2xvYmFsJDIoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBoYW5kbGVyKGJsb2JJbmZvLCByZXNvbHZlLCByZWplY3QsIG5vb3ApO1xuICAgICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICByZWplY3QoZXgubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICB2YXIgaXNEZWZhdWx0SGFuZGxlciA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgIHJldHVybiBoYW5kbGVyID09PSBkZWZhdWx0SGFuZGxlcjtcbiAgICAgIH07XG4gICAgICB2YXIgdXBsb2FkID0gZnVuY3Rpb24gKGJsb2JJbmZvKSB7XG4gICAgICAgIHJldHVybiAhc2V0dGluZ3MudXJsICYmIGlzRGVmYXVsdEhhbmRsZXIoc2V0dGluZ3MuaGFuZGxlcikgPyBnbG9iYWwkMi5yZWplY3QoJ1VwbG9hZCB1cmwgbWlzc2luZyBmcm9tIHRoZSBzZXR0aW5ncy4nKSA6IHVwbG9hZEJsb2IoYmxvYkluZm8sIHNldHRpbmdzLmhhbmRsZXIpO1xuICAgICAgfTtcbiAgICAgIHNldHRpbmdzID0gZ2xvYmFsJDQuZXh0ZW5kKHtcbiAgICAgICAgY3JlZGVudGlhbHM6IGZhbHNlLFxuICAgICAgICBoYW5kbGVyOiBkZWZhdWx0SGFuZGxlclxuICAgICAgfSwgc2V0dGluZ3MpO1xuICAgICAgcmV0dXJuIHsgdXBsb2FkOiB1cGxvYWQgfTtcbiAgICB9XG5cbiAgICB2YXIgbWFrZVRhYiA9IGZ1bmN0aW9uIChfaW5mbykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGU6ICdBZHZhbmNlZCcsXG4gICAgICAgIG5hbWU6ICdhZHZhbmNlZCcsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgICAgICAgIGxhYmVsOiAnU3R5bGUnLFxuICAgICAgICAgICAgbmFtZTogJ3N0eWxlJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2dyaWQnLFxuICAgICAgICAgICAgY29sdW1uczogMixcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnVmVydGljYWwgc3BhY2UnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICd2c3BhY2UnLFxuICAgICAgICAgICAgICAgIGlucHV0TW9kZTogJ251bWVyaWMnXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnSG9yaXpvbnRhbCBzcGFjZScsXG4gICAgICAgICAgICAgICAgbmFtZTogJ2hzcGFjZScsXG4gICAgICAgICAgICAgICAgaW5wdXRNb2RlOiAnbnVtZXJpYydcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdCb3JkZXIgd2lkdGgnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdib3JkZXInLFxuICAgICAgICAgICAgICAgIGlucHV0TW9kZTogJ251bWVyaWMnXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc2VsZWN0Ym94JyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnYm9yZGVyc3R5bGUnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnQm9yZGVyIHN0eWxlJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnU2VsZWN0Li4uJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcnXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnU29saWQnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3NvbGlkJ1xuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0RvdHRlZCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnZG90dGVkJ1xuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0Rhc2hlZCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnZGFzaGVkJ1xuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0RvdWJsZScsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnZG91YmxlJ1xuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0dyb292ZScsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnZ3Jvb3ZlJ1xuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1JpZGdlJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdyaWRnZSdcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdJbnNldCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnaW5zZXQnXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnT3V0c2V0JyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdvdXRzZXQnXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnTm9uZScsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnbm9uZSdcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdIaWRkZW4nLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ2hpZGRlbidcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgQWR2VGFiID0geyBtYWtlVGFiOiBtYWtlVGFiIH07XG5cbiAgICB2YXIgY29sbGVjdCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciB1cmxMaXN0U2FuaXRpemVyID0gTGlzdFV0aWxzLnNhbml0aXplcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gZWRpdG9yLmNvbnZlcnRVUkwoaXRlbS52YWx1ZSB8fCBpdGVtLnVybCwgJ3NyYycpO1xuICAgICAgfSk7XG4gICAgICB2YXIgZnV0dXJlSW1hZ2VMaXN0ID0gbmV3IGdsb2JhbCQyKGZ1bmN0aW9uIChjb21wbGV0ZXIpIHtcbiAgICAgICAgY3JlYXRlSW1hZ2VMaXN0KGVkaXRvciwgZnVuY3Rpb24gKGltYWdlTGlzdCkge1xuICAgICAgICAgIGNvbXBsZXRlcih1cmxMaXN0U2FuaXRpemVyKGltYWdlTGlzdCkubWFwKGZ1bmN0aW9uIChpdGVtcykge1xuICAgICAgICAgICAgcmV0dXJuIGZsYXR0ZW4oW1xuICAgICAgICAgICAgICBbe1xuICAgICAgICAgICAgICAgICAgdGV4dDogJ05vbmUnLFxuICAgICAgICAgICAgICAgICAgdmFsdWU6ICcnXG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgIGl0ZW1zXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICB2YXIgY2xhc3NMaXN0ID0gTGlzdFV0aWxzLnNhbml0aXplKGdldENsYXNzTGlzdChlZGl0b3IpKTtcbiAgICAgIHZhciBoYXNBZHZUYWIkMSA9IGhhc0FkdlRhYihlZGl0b3IpO1xuICAgICAgdmFyIGhhc1VwbG9hZFRhYiQxID0gaGFzVXBsb2FkVGFiKGVkaXRvcik7XG4gICAgICB2YXIgaGFzVXBsb2FkVXJsJDEgPSBoYXNVcGxvYWRVcmwoZWRpdG9yKTtcbiAgICAgIHZhciBoYXNVcGxvYWRIYW5kbGVyJDEgPSBoYXNVcGxvYWRIYW5kbGVyKGVkaXRvcik7XG4gICAgICB2YXIgaW1hZ2UgPSByZWFkSW1hZ2VEYXRhRnJvbVNlbGVjdGlvbihlZGl0b3IpO1xuICAgICAgdmFyIGhhc0Rlc2NyaXB0aW9uJDEgPSBoYXNEZXNjcmlwdGlvbihlZGl0b3IpO1xuICAgICAgdmFyIGhhc0ltYWdlVGl0bGUkMSA9IGhhc0ltYWdlVGl0bGUoZWRpdG9yKTtcbiAgICAgIHZhciBoYXNEaW1lbnNpb25zJDEgPSBoYXNEaW1lbnNpb25zKGVkaXRvcik7XG4gICAgICB2YXIgaGFzSW1hZ2VDYXB0aW9uJDEgPSBoYXNJbWFnZUNhcHRpb24oZWRpdG9yKTtcbiAgICAgIHZhciBoYXNBY2Nlc3NpYmlsaXR5T3B0aW9ucyA9IHNob3dBY2Nlc3NpYmlsaXR5T3B0aW9ucyhlZGl0b3IpO1xuICAgICAgdmFyIHVybCA9IGdldFVwbG9hZFVybChlZGl0b3IpO1xuICAgICAgdmFyIGJhc2VQYXRoID0gZ2V0VXBsb2FkQmFzZVBhdGgoZWRpdG9yKTtcbiAgICAgIHZhciBjcmVkZW50aWFscyA9IGdldFVwbG9hZENyZWRlbnRpYWxzKGVkaXRvcik7XG4gICAgICB2YXIgaGFuZGxlciA9IGdldFVwbG9hZEhhbmRsZXIoZWRpdG9yKTtcbiAgICAgIHZhciBhdXRvbWF0aWNVcGxvYWRzID0gaXNBdXRvbWF0aWNVcGxvYWRzRW5hYmxlZChlZGl0b3IpO1xuICAgICAgdmFyIHByZXBlbmRVUkwgPSBPcHRpb24uc29tZShnZXRQcmVwZW5kVXJsKGVkaXRvcikpLmZpbHRlcihmdW5jdGlvbiAocHJlVXJsKSB7XG4gICAgICAgIHJldHVybiBpc1N0cmluZyhwcmVVcmwpICYmIHByZVVybC5sZW5ndGggPiAwO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZnV0dXJlSW1hZ2VMaXN0LnRoZW4oZnVuY3Rpb24gKGltYWdlTGlzdCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGltYWdlOiBpbWFnZSxcbiAgICAgICAgICBpbWFnZUxpc3Q6IGltYWdlTGlzdCxcbiAgICAgICAgICBjbGFzc0xpc3Q6IGNsYXNzTGlzdCxcbiAgICAgICAgICBoYXNBZHZUYWI6IGhhc0FkdlRhYiQxLFxuICAgICAgICAgIGhhc1VwbG9hZFRhYjogaGFzVXBsb2FkVGFiJDEsXG4gICAgICAgICAgaGFzVXBsb2FkVXJsOiBoYXNVcGxvYWRVcmwkMSxcbiAgICAgICAgICBoYXNVcGxvYWRIYW5kbGVyOiBoYXNVcGxvYWRIYW5kbGVyJDEsXG4gICAgICAgICAgaGFzRGVzY3JpcHRpb246IGhhc0Rlc2NyaXB0aW9uJDEsXG4gICAgICAgICAgaGFzSW1hZ2VUaXRsZTogaGFzSW1hZ2VUaXRsZSQxLFxuICAgICAgICAgIGhhc0RpbWVuc2lvbnM6IGhhc0RpbWVuc2lvbnMkMSxcbiAgICAgICAgICBoYXNJbWFnZUNhcHRpb246IGhhc0ltYWdlQ2FwdGlvbiQxLFxuICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgIGJhc2VQYXRoOiBiYXNlUGF0aCxcbiAgICAgICAgICBjcmVkZW50aWFsczogY3JlZGVudGlhbHMsXG4gICAgICAgICAgaGFuZGxlcjogaGFuZGxlcixcbiAgICAgICAgICBwcmVwZW5kVVJMOiBwcmVwZW5kVVJMLFxuICAgICAgICAgIGhhc0FjY2Vzc2liaWxpdHlPcHRpb25zOiBoYXNBY2Nlc3NpYmlsaXR5T3B0aW9ucyxcbiAgICAgICAgICBhdXRvbWF0aWNVcGxvYWRzOiBhdXRvbWF0aWNVcGxvYWRzXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIG1ha2VJdGVtcyA9IGZ1bmN0aW9uIChpbmZvKSB7XG4gICAgICB2YXIgaW1hZ2VVcmwgPSB7XG4gICAgICAgIG5hbWU6ICdzcmMnLFxuICAgICAgICB0eXBlOiAndXJsaW5wdXQnLFxuICAgICAgICBmaWxldHlwZTogJ2ltYWdlJyxcbiAgICAgICAgbGFiZWw6ICdTb3VyY2UnXG4gICAgICB9O1xuICAgICAgdmFyIGltYWdlTGlzdCA9IGluZm8uaW1hZ2VMaXN0Lm1hcChmdW5jdGlvbiAoaXRlbXMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBuYW1lOiAnaW1hZ2VzJyxcbiAgICAgICAgICB0eXBlOiAnc2VsZWN0Ym94JyxcbiAgICAgICAgICBsYWJlbDogJ0ltYWdlIGxpc3QnLFxuICAgICAgICAgIGl0ZW1zOiBpdGVtc1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgICB2YXIgaW1hZ2VEZXNjcmlwdGlvbiA9IHtcbiAgICAgICAgbmFtZTogJ2FsdCcsXG4gICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgIGxhYmVsOiAnQWx0ZXJuYXRpdmUgZGVzY3JpcHRpb24nLFxuICAgICAgICBkaXNhYmxlZDogaW5mby5oYXNBY2Nlc3NpYmlsaXR5T3B0aW9ucyAmJiBpbmZvLmltYWdlLmlzRGVjb3JhdGl2ZVxuICAgICAgfTtcbiAgICAgIHZhciBpbWFnZVRpdGxlID0ge1xuICAgICAgICBuYW1lOiAndGl0bGUnLFxuICAgICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgICBsYWJlbDogJ0ltYWdlIHRpdGxlJ1xuICAgICAgfTtcbiAgICAgIHZhciBpbWFnZURpbWVuc2lvbnMgPSB7XG4gICAgICAgIG5hbWU6ICdkaW1lbnNpb25zJyxcbiAgICAgICAgdHlwZTogJ3NpemVpbnB1dCdcbiAgICAgIH07XG4gICAgICB2YXIgaXNEZWNvcmF0aXZlID0ge1xuICAgICAgICB0eXBlOiAnbGFiZWwnLFxuICAgICAgICBsYWJlbDogJ0FjY2Vzc2liaWxpdHknLFxuICAgICAgICBpdGVtczogW3tcbiAgICAgICAgICAgIG5hbWU6ICdpc0RlY29yYXRpdmUnLFxuICAgICAgICAgICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICAgICAgICAgIGxhYmVsOiAnSW1hZ2UgaXMgZGVjb3JhdGl2ZSdcbiAgICAgICAgICB9XVxuICAgICAgfTtcbiAgICAgIHZhciBjbGFzc0xpc3QgPSBpbmZvLmNsYXNzTGlzdC5tYXAoZnVuY3Rpb24gKGl0ZW1zKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbmFtZTogJ2NsYXNzZXMnLFxuICAgICAgICAgIHR5cGU6ICdzZWxlY3Rib3gnLFxuICAgICAgICAgIGxhYmVsOiAnQ2xhc3MnLFxuICAgICAgICAgIGl0ZW1zOiBpdGVtc1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgICB2YXIgY2FwdGlvbiA9IHtcbiAgICAgICAgdHlwZTogJ2xhYmVsJyxcbiAgICAgICAgbGFiZWw6ICdDYXB0aW9uJyxcbiAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxuICAgICAgICAgICAgbmFtZTogJ2NhcHRpb24nLFxuICAgICAgICAgICAgbGFiZWw6ICdTaG93IGNhcHRpb24nXG4gICAgICAgICAgfV1cbiAgICAgIH07XG4gICAgICByZXR1cm4gZmxhdHRlbihbXG4gICAgICAgIFtpbWFnZVVybF0sXG4gICAgICAgIGltYWdlTGlzdC50b0FycmF5KCksXG4gICAgICAgIGluZm8uaGFzQWNjZXNzaWJpbGl0eU9wdGlvbnMgJiYgaW5mby5oYXNEZXNjcmlwdGlvbiA/IFtpc0RlY29yYXRpdmVdIDogW10sXG4gICAgICAgIGluZm8uaGFzRGVzY3JpcHRpb24gPyBbaW1hZ2VEZXNjcmlwdGlvbl0gOiBbXSxcbiAgICAgICAgaW5mby5oYXNJbWFnZVRpdGxlID8gW2ltYWdlVGl0bGVdIDogW10sXG4gICAgICAgIGluZm8uaGFzRGltZW5zaW9ucyA/IFtpbWFnZURpbWVuc2lvbnNdIDogW10sXG4gICAgICAgIFt7XG4gICAgICAgICAgICB0eXBlOiAnZ3JpZCcsXG4gICAgICAgICAgICBjb2x1bW5zOiAyLFxuICAgICAgICAgICAgaXRlbXM6IGZsYXR0ZW4oW1xuICAgICAgICAgICAgICBjbGFzc0xpc3QudG9BcnJheSgpLFxuICAgICAgICAgICAgICBpbmZvLmhhc0ltYWdlQ2FwdGlvbiA/IFtjYXB0aW9uXSA6IFtdXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIH1dXG4gICAgICBdKTtcbiAgICB9O1xuICAgIHZhciBtYWtlVGFiJDEgPSBmdW5jdGlvbiAoaW5mbykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGU6ICdHZW5lcmFsJyxcbiAgICAgICAgbmFtZTogJ2dlbmVyYWwnLFxuICAgICAgICBpdGVtczogbWFrZUl0ZW1zKGluZm8pXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIE1haW5UYWIgPSB7XG4gICAgICBtYWtlVGFiOiBtYWtlVGFiJDEsXG4gICAgICBtYWtlSXRlbXM6IG1ha2VJdGVtc1xuICAgIH07XG5cbiAgICB2YXIgbWFrZVRhYiQyID0gZnVuY3Rpb24gKF9pbmZvKSB7XG4gICAgICB2YXIgaXRlbXMgPSBbe1xuICAgICAgICAgIHR5cGU6ICdkcm9wem9uZScsXG4gICAgICAgICAgbmFtZTogJ2ZpbGVpbnB1dCdcbiAgICAgICAgfV07XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZTogJ1VwbG9hZCcsXG4gICAgICAgIG5hbWU6ICd1cGxvYWQnLFxuICAgICAgICBpdGVtczogaXRlbXNcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgVXBsb2FkVGFiID0geyBtYWtlVGFiOiBtYWtlVGFiJDIgfTtcblxuICAgIHZhciBjcmVhdGVTdGF0ZSA9IGZ1bmN0aW9uIChpbmZvKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwcmV2SW1hZ2U6IExpc3RVdGlscy5maW5kRW50cnkoaW5mby5pbWFnZUxpc3QsIGluZm8uaW1hZ2Uuc3JjKSxcbiAgICAgICAgcHJldkFsdDogaW5mby5pbWFnZS5hbHQsXG4gICAgICAgIG9wZW46IHRydWVcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgZnJvbUltYWdlRGF0YSA9IGZ1bmN0aW9uIChpbWFnZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3JjOiB7XG4gICAgICAgICAgdmFsdWU6IGltYWdlLnNyYyxcbiAgICAgICAgICBtZXRhOiB7fVxuICAgICAgICB9LFxuICAgICAgICBpbWFnZXM6IGltYWdlLnNyYyxcbiAgICAgICAgYWx0OiBpbWFnZS5hbHQsXG4gICAgICAgIHRpdGxlOiBpbWFnZS50aXRsZSxcbiAgICAgICAgZGltZW5zaW9uczoge1xuICAgICAgICAgIHdpZHRoOiBpbWFnZS53aWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IGltYWdlLmhlaWdodFxuICAgICAgICB9LFxuICAgICAgICBjbGFzc2VzOiBpbWFnZS5jbGFzcyxcbiAgICAgICAgY2FwdGlvbjogaW1hZ2UuY2FwdGlvbixcbiAgICAgICAgc3R5bGU6IGltYWdlLnN0eWxlLFxuICAgICAgICB2c3BhY2U6IGltYWdlLnZzcGFjZSxcbiAgICAgICAgYm9yZGVyOiBpbWFnZS5ib3JkZXIsXG4gICAgICAgIGhzcGFjZTogaW1hZ2UuaHNwYWNlLFxuICAgICAgICBib3JkZXJzdHlsZTogaW1hZ2UuYm9yZGVyU3R5bGUsXG4gICAgICAgIGZpbGVpbnB1dDogW10sXG4gICAgICAgIGlzRGVjb3JhdGl2ZTogaW1hZ2UuaXNEZWNvcmF0aXZlXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHRvSW1hZ2VEYXRhID0gZnVuY3Rpb24gKGRhdGEsIHJlbW92ZUVtcHR5QWx0KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzcmM6IGRhdGEuc3JjLnZhbHVlLFxuICAgICAgICBhbHQ6IGRhdGEuYWx0Lmxlbmd0aCA9PT0gMCAmJiByZW1vdmVFbXB0eUFsdCA/IG51bGwgOiBkYXRhLmFsdCxcbiAgICAgICAgdGl0bGU6IGRhdGEudGl0bGUsXG4gICAgICAgIHdpZHRoOiBkYXRhLmRpbWVuc2lvbnMud2lkdGgsXG4gICAgICAgIGhlaWdodDogZGF0YS5kaW1lbnNpb25zLmhlaWdodCxcbiAgICAgICAgY2xhc3M6IGRhdGEuY2xhc3NlcyxcbiAgICAgICAgc3R5bGU6IGRhdGEuc3R5bGUsXG4gICAgICAgIGNhcHRpb246IGRhdGEuY2FwdGlvbixcbiAgICAgICAgaHNwYWNlOiBkYXRhLmhzcGFjZSxcbiAgICAgICAgdnNwYWNlOiBkYXRhLnZzcGFjZSxcbiAgICAgICAgYm9yZGVyOiBkYXRhLmJvcmRlcixcbiAgICAgICAgYm9yZGVyU3R5bGU6IGRhdGEuYm9yZGVyc3R5bGUsXG4gICAgICAgIGlzRGVjb3JhdGl2ZTogZGF0YS5pc0RlY29yYXRpdmVcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgYWRkUHJlcGVuZFVybDIgPSBmdW5jdGlvbiAoaW5mbywgc3JjVVJMKSB7XG4gICAgICBpZiAoIS9eKD86W2EtekEtWl0rOik/XFwvXFwvLy50ZXN0KHNyY1VSTCkpIHtcbiAgICAgICAgcmV0dXJuIGluZm8ucHJlcGVuZFVSTC5iaW5kKGZ1bmN0aW9uIChwcmVwZW5kVXJsKSB7XG4gICAgICAgICAgaWYgKHNyY1VSTC5zdWJzdHJpbmcoMCwgcHJlcGVuZFVybC5sZW5ndGgpICE9PSBwcmVwZW5kVXJsKSB7XG4gICAgICAgICAgICByZXR1cm4gT3B0aW9uLnNvbWUocHJlcGVuZFVybCArIHNyY1VSTCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBPcHRpb24ubm9uZSgpO1xuICAgIH07XG4gICAgdmFyIGFkZFByZXBlbmRVcmwgPSBmdW5jdGlvbiAoaW5mbywgYXBpKSB7XG4gICAgICB2YXIgZGF0YSA9IGFwaS5nZXREYXRhKCk7XG4gICAgICBhZGRQcmVwZW5kVXJsMihpbmZvLCBkYXRhLnNyYy52YWx1ZSkuZWFjaChmdW5jdGlvbiAoc3JjVVJMKSB7XG4gICAgICAgIGFwaS5zZXREYXRhKHtcbiAgICAgICAgICBzcmM6IHtcbiAgICAgICAgICAgIHZhbHVlOiBzcmNVUkwsXG4gICAgICAgICAgICBtZXRhOiBkYXRhLnNyYy5tZXRhXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGZvcm1GaWxsRnJvbU1ldGEyID0gZnVuY3Rpb24gKGluZm8sIGRhdGEsIG1ldGEpIHtcbiAgICAgIGlmIChpbmZvLmhhc0Rlc2NyaXB0aW9uICYmIGlzU3RyaW5nKG1ldGEuYWx0KSkge1xuICAgICAgICBkYXRhLmFsdCA9IG1ldGEuYWx0O1xuICAgICAgfVxuICAgICAgaWYgKGluZm8uaGFzQWNjZXNzaWJpbGl0eU9wdGlvbnMpIHtcbiAgICAgICAgZGF0YS5pc0RlY29yYXRpdmUgPSBtZXRhLmlzRGVjb3JhdGl2ZSB8fCBkYXRhLmlzRGVjb3JhdGl2ZSB8fCBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChpbmZvLmhhc0ltYWdlVGl0bGUgJiYgaXNTdHJpbmcobWV0YS50aXRsZSkpIHtcbiAgICAgICAgZGF0YS50aXRsZSA9IG1ldGEudGl0bGU7XG4gICAgICB9XG4gICAgICBpZiAoaW5mby5oYXNEaW1lbnNpb25zKSB7XG4gICAgICAgIGlmIChpc1N0cmluZyhtZXRhLndpZHRoKSkge1xuICAgICAgICAgIGRhdGEuZGltZW5zaW9ucy53aWR0aCA9IG1ldGEud2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzU3RyaW5nKG1ldGEuaGVpZ2h0KSkge1xuICAgICAgICAgIGRhdGEuZGltZW5zaW9ucy5oZWlnaHQgPSBtZXRhLmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGlzU3RyaW5nKG1ldGEuY2xhc3MpKSB7XG4gICAgICAgIExpc3RVdGlscy5maW5kRW50cnkoaW5mby5jbGFzc0xpc3QsIG1ldGEuY2xhc3MpLmVhY2goZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgICAgZGF0YS5jbGFzc2VzID0gZW50cnkudmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGluZm8uaGFzSW1hZ2VDYXB0aW9uKSB7XG4gICAgICAgIGlmIChpc0Jvb2xlYW4obWV0YS5jYXB0aW9uKSkge1xuICAgICAgICAgIGRhdGEuY2FwdGlvbiA9IG1ldGEuY2FwdGlvbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGluZm8uaGFzQWR2VGFiKSB7XG4gICAgICAgIGlmIChpc1N0cmluZyhtZXRhLnN0eWxlKSkge1xuICAgICAgICAgIGRhdGEuc3R5bGUgPSBtZXRhLnN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1N0cmluZyhtZXRhLnZzcGFjZSkpIHtcbiAgICAgICAgICBkYXRhLnZzcGFjZSA9IG1ldGEudnNwYWNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1N0cmluZyhtZXRhLmJvcmRlcikpIHtcbiAgICAgICAgICBkYXRhLmJvcmRlciA9IG1ldGEuYm9yZGVyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1N0cmluZyhtZXRhLmhzcGFjZSkpIHtcbiAgICAgICAgICBkYXRhLmhzcGFjZSA9IG1ldGEuaHNwYWNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1N0cmluZyhtZXRhLmJvcmRlcnN0eWxlKSkge1xuICAgICAgICAgIGRhdGEuYm9yZGVyc3R5bGUgPSBtZXRhLmJvcmRlcnN0eWxlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgZm9ybUZpbGxGcm9tTWV0YSA9IGZ1bmN0aW9uIChpbmZvLCBhcGkpIHtcbiAgICAgIHZhciBkYXRhID0gYXBpLmdldERhdGEoKTtcbiAgICAgIHZhciBtZXRhID0gZGF0YS5zcmMubWV0YTtcbiAgICAgIGlmIChtZXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIG5ld0RhdGEgPSBkZWVwTWVyZ2Uoe30sIGRhdGEpO1xuICAgICAgICBmb3JtRmlsbEZyb21NZXRhMihpbmZvLCBuZXdEYXRhLCBtZXRhKTtcbiAgICAgICAgYXBpLnNldERhdGEobmV3RGF0YSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgY2FsY3VsYXRlSW1hZ2VTaXplID0gZnVuY3Rpb24gKGhlbHBlcnMsIGluZm8sIHN0YXRlLCBhcGkpIHtcbiAgICAgIHZhciBkYXRhID0gYXBpLmdldERhdGEoKTtcbiAgICAgIHZhciB1cmwgPSBkYXRhLnNyYy52YWx1ZTtcbiAgICAgIHZhciBtZXRhID0gZGF0YS5zcmMubWV0YSB8fCB7fTtcbiAgICAgIGlmICghbWV0YS53aWR0aCAmJiAhbWV0YS5oZWlnaHQgJiYgaW5mby5oYXNEaW1lbnNpb25zKSB7XG4gICAgICAgIGhlbHBlcnMuaW1hZ2VTaXplKHVybCkudGhlbihmdW5jdGlvbiAoc2l6ZSkge1xuICAgICAgICAgIGlmIChzdGF0ZS5vcGVuKSB7XG4gICAgICAgICAgICBhcGkuc2V0RGF0YSh7IGRpbWVuc2lvbnM6IHNpemUgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciB1cGRhdGVJbWFnZXNEcm9wZG93biA9IGZ1bmN0aW9uIChpbmZvLCBzdGF0ZSwgYXBpKSB7XG4gICAgICB2YXIgZGF0YSA9IGFwaS5nZXREYXRhKCk7XG4gICAgICB2YXIgaW1hZ2UgPSBMaXN0VXRpbHMuZmluZEVudHJ5KGluZm8uaW1hZ2VMaXN0LCBkYXRhLnNyYy52YWx1ZSk7XG4gICAgICBzdGF0ZS5wcmV2SW1hZ2UgPSBpbWFnZTtcbiAgICAgIGFwaS5zZXREYXRhKHtcbiAgICAgICAgaW1hZ2VzOiBpbWFnZS5tYXAoZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgICAgcmV0dXJuIGVudHJ5LnZhbHVlO1xuICAgICAgICB9KS5nZXRPcignJylcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGNoYW5nZVNyYyA9IGZ1bmN0aW9uIChoZWxwZXJzLCBpbmZvLCBzdGF0ZSwgYXBpKSB7XG4gICAgICBhZGRQcmVwZW5kVXJsKGluZm8sIGFwaSk7XG4gICAgICBmb3JtRmlsbEZyb21NZXRhKGluZm8sIGFwaSk7XG4gICAgICBjYWxjdWxhdGVJbWFnZVNpemUoaGVscGVycywgaW5mbywgc3RhdGUsIGFwaSk7XG4gICAgICB1cGRhdGVJbWFnZXNEcm9wZG93bihpbmZvLCBzdGF0ZSwgYXBpKTtcbiAgICB9O1xuICAgIHZhciBjaGFuZ2VJbWFnZXMgPSBmdW5jdGlvbiAoaGVscGVycywgaW5mbywgc3RhdGUsIGFwaSkge1xuICAgICAgdmFyIGRhdGEgPSBhcGkuZ2V0RGF0YSgpO1xuICAgICAgdmFyIGltYWdlID0gTGlzdFV0aWxzLmZpbmRFbnRyeShpbmZvLmltYWdlTGlzdCwgZGF0YS5pbWFnZXMpO1xuICAgICAgaW1hZ2UuZWFjaChmdW5jdGlvbiAoaW1nKSB7XG4gICAgICAgIHZhciB1cGRhdGVBbHQgPSBkYXRhLmFsdCA9PT0gJycgfHwgc3RhdGUucHJldkltYWdlLm1hcChmdW5jdGlvbiAoaW1hZ2UpIHtcbiAgICAgICAgICByZXR1cm4gaW1hZ2UudGV4dCA9PT0gZGF0YS5hbHQ7XG4gICAgICAgIH0pLmdldE9yKGZhbHNlKTtcbiAgICAgICAgaWYgKHVwZGF0ZUFsdCkge1xuICAgICAgICAgIGlmIChpbWcudmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICBhcGkuc2V0RGF0YSh7XG4gICAgICAgICAgICAgIHNyYzogaW1nLFxuICAgICAgICAgICAgICBhbHQ6IHN0YXRlLnByZXZBbHRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhcGkuc2V0RGF0YSh7XG4gICAgICAgICAgICAgIHNyYzogaW1nLFxuICAgICAgICAgICAgICBhbHQ6IGltZy50ZXh0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXBpLnNldERhdGEoeyBzcmM6IGltZyB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzdGF0ZS5wcmV2SW1hZ2UgPSBpbWFnZTtcbiAgICAgIGNoYW5nZVNyYyhoZWxwZXJzLCBpbmZvLCBzdGF0ZSwgYXBpKTtcbiAgICB9O1xuICAgIHZhciBjYWxjVlNwYWNlID0gZnVuY3Rpb24gKGNzcykge1xuICAgICAgdmFyIG1hdGNoaW5nVG9wQm90dG9tID0gY3NzWydtYXJnaW4tdG9wJ10gJiYgY3NzWydtYXJnaW4tYm90dG9tJ10gJiYgY3NzWydtYXJnaW4tdG9wJ10gPT09IGNzc1snbWFyZ2luLWJvdHRvbSddO1xuICAgICAgcmV0dXJuIG1hdGNoaW5nVG9wQm90dG9tID8gcmVtb3ZlUGl4ZWxTdWZmaXgoU3RyaW5nKGNzc1snbWFyZ2luLXRvcCddKSkgOiAnJztcbiAgICB9O1xuICAgIHZhciBjYWxjSFNwYWNlID0gZnVuY3Rpb24gKGNzcykge1xuICAgICAgdmFyIG1hdGNoaW5nTGVmdFJpZ2h0ID0gY3NzWydtYXJnaW4tcmlnaHQnXSAmJiBjc3NbJ21hcmdpbi1sZWZ0J10gJiYgY3NzWydtYXJnaW4tcmlnaHQnXSA9PT0gY3NzWydtYXJnaW4tbGVmdCddO1xuICAgICAgcmV0dXJuIG1hdGNoaW5nTGVmdFJpZ2h0ID8gcmVtb3ZlUGl4ZWxTdWZmaXgoU3RyaW5nKGNzc1snbWFyZ2luLXJpZ2h0J10pKSA6ICcnO1xuICAgIH07XG4gICAgdmFyIGNhbGNCb3JkZXJXaWR0aCA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgICAgIHJldHVybiBjc3NbJ2JvcmRlci13aWR0aCddID8gcmVtb3ZlUGl4ZWxTdWZmaXgoU3RyaW5nKGNzc1snYm9yZGVyLXdpZHRoJ10pKSA6ICcnO1xuICAgIH07XG4gICAgdmFyIGNhbGNCb3JkZXJTdHlsZSA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgICAgIHJldHVybiBjc3NbJ2JvcmRlci1zdHlsZSddID8gU3RyaW5nKGNzc1snYm9yZGVyLXN0eWxlJ10pIDogJyc7XG4gICAgfTtcbiAgICB2YXIgY2FsY1N0eWxlID0gZnVuY3Rpb24gKHBhcnNlU3R5bGUsIHNlcmlhbGl6ZVN0eWxlLCBjc3MpIHtcbiAgICAgIHJldHVybiBzZXJpYWxpemVTdHlsZShwYXJzZVN0eWxlKHNlcmlhbGl6ZVN0eWxlKGNzcykpKTtcbiAgICB9O1xuICAgIHZhciBjaGFuZ2VTdHlsZTIgPSBmdW5jdGlvbiAocGFyc2VTdHlsZSwgc2VyaWFsaXplU3R5bGUsIGRhdGEpIHtcbiAgICAgIHZhciBjc3MgPSBtZXJnZU1hcmdpbnMocGFyc2VTdHlsZShkYXRhLnN0eWxlKSk7XG4gICAgICB2YXIgZGF0YUNvcHkgPSBkZWVwTWVyZ2Uoe30sIGRhdGEpO1xuICAgICAgZGF0YUNvcHkudnNwYWNlID0gY2FsY1ZTcGFjZShjc3MpO1xuICAgICAgZGF0YUNvcHkuaHNwYWNlID0gY2FsY0hTcGFjZShjc3MpO1xuICAgICAgZGF0YUNvcHkuYm9yZGVyID0gY2FsY0JvcmRlcldpZHRoKGNzcyk7XG4gICAgICBkYXRhQ29weS5ib3JkZXJzdHlsZSA9IGNhbGNCb3JkZXJTdHlsZShjc3MpO1xuICAgICAgZGF0YUNvcHkuc3R5bGUgPSBjYWxjU3R5bGUocGFyc2VTdHlsZSwgc2VyaWFsaXplU3R5bGUsIGNzcyk7XG4gICAgICByZXR1cm4gZGF0YUNvcHk7XG4gICAgfTtcbiAgICB2YXIgY2hhbmdlU3R5bGUgPSBmdW5jdGlvbiAoaGVscGVycywgYXBpKSB7XG4gICAgICB2YXIgZGF0YSA9IGFwaS5nZXREYXRhKCk7XG4gICAgICB2YXIgbmV3RGF0YSA9IGNoYW5nZVN0eWxlMihoZWxwZXJzLnBhcnNlU3R5bGUsIGhlbHBlcnMuc2VyaWFsaXplU3R5bGUsIGRhdGEpO1xuICAgICAgYXBpLnNldERhdGEobmV3RGF0YSk7XG4gICAgfTtcbiAgICB2YXIgY2hhbmdlQVN0eWxlID0gZnVuY3Rpb24gKGhlbHBlcnMsIGluZm8sIGFwaSkge1xuICAgICAgdmFyIGRhdGEgPSBkZWVwTWVyZ2UoZnJvbUltYWdlRGF0YShpbmZvLmltYWdlKSwgYXBpLmdldERhdGEoKSk7XG4gICAgICB2YXIgc3R5bGUgPSBnZXRTdHlsZVZhbHVlKGhlbHBlcnMubm9ybWFsaXplQ3NzLCB0b0ltYWdlRGF0YShkYXRhLCBmYWxzZSkpO1xuICAgICAgYXBpLnNldERhdGEoeyBzdHlsZTogc3R5bGUgfSk7XG4gICAgfTtcbiAgICB2YXIgY2hhbmdlRmlsZUlucHV0ID0gZnVuY3Rpb24gKGhlbHBlcnMsIGluZm8sIHN0YXRlLCBhcGkpIHtcbiAgICAgIHZhciBkYXRhID0gYXBpLmdldERhdGEoKTtcbiAgICAgIGFwaS5ibG9jaygnVXBsb2FkaW5nIGltYWdlJyk7XG4gICAgICBoZWFkKGRhdGEuZmlsZWlucHV0KS5mb2xkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXBpLnVuYmxvY2soKTtcbiAgICAgIH0sIGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgIHZhciBibG9iVXJpID0gZG9tR2xvYmFscy5VUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xuICAgICAgICB2YXIgdXBsb2FkZXIgPSBVcGxvYWRlcih7XG4gICAgICAgICAgdXJsOiBpbmZvLnVybCxcbiAgICAgICAgICBiYXNlUGF0aDogaW5mby5iYXNlUGF0aCxcbiAgICAgICAgICBjcmVkZW50aWFsczogaW5mby5jcmVkZW50aWFscyxcbiAgICAgICAgICBoYW5kbGVyOiBpbmZvLmhhbmRsZXJcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBmaW5hbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBhcGkudW5ibG9jaygpO1xuICAgICAgICAgIGRvbUdsb2JhbHMuVVJMLnJldm9rZU9iamVjdFVSTChibG9iVXJpKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHVwZGF0ZVNyY0FuZFN3aXRjaFRhYiA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgICBhcGkuc2V0RGF0YSh7XG4gICAgICAgICAgICBzcmM6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IHVybCxcbiAgICAgICAgICAgICAgbWV0YToge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBhcGkuc2hvd1RhYignZ2VuZXJhbCcpO1xuICAgICAgICAgIGNoYW5nZVNyYyhoZWxwZXJzLCBpbmZvLCBzdGF0ZSwgYXBpKTtcbiAgICAgICAgfTtcbiAgICAgICAgYmxvYlRvRGF0YVVyaShmaWxlKS50aGVuKGZ1bmN0aW9uIChkYXRhVXJsKSB7XG4gICAgICAgICAgdmFyIGJsb2JJbmZvID0gaGVscGVycy5jcmVhdGVCbG9iQ2FjaGUoZmlsZSwgYmxvYlVyaSwgZGF0YVVybCk7XG4gICAgICAgICAgaWYgKGluZm8uYXV0b21hdGljVXBsb2Fkcykge1xuICAgICAgICAgICAgdXBsb2FkZXIudXBsb2FkKGJsb2JJbmZvKS50aGVuKGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgICAgICAgdXBkYXRlU3JjQW5kU3dpdGNoVGFiKHVybCk7XG4gICAgICAgICAgICAgIGZpbmFsaXplKCk7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgIGZpbmFsaXplKCk7XG4gICAgICAgICAgICAgIGhlbHBlcnMuYWxlcnRFcnIoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoZWxwZXJzLmFkZFRvQmxvYkNhY2hlKGJsb2JJbmZvKTtcbiAgICAgICAgICAgIHVwZGF0ZVNyY0FuZFN3aXRjaFRhYihibG9iSW5mby5ibG9iVXJpKCkpO1xuICAgICAgICAgICAgYXBpLnVuYmxvY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgY2hhbmdlSGFuZGxlciA9IGZ1bmN0aW9uIChoZWxwZXJzLCBpbmZvLCBzdGF0ZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhcGksIGV2dCkge1xuICAgICAgICBpZiAoZXZ0Lm5hbWUgPT09ICdzcmMnKSB7XG4gICAgICAgICAgY2hhbmdlU3JjKGhlbHBlcnMsIGluZm8sIHN0YXRlLCBhcGkpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2dC5uYW1lID09PSAnaW1hZ2VzJykge1xuICAgICAgICAgIGNoYW5nZUltYWdlcyhoZWxwZXJzLCBpbmZvLCBzdGF0ZSwgYXBpKTtcbiAgICAgICAgfSBlbHNlIGlmIChldnQubmFtZSA9PT0gJ2FsdCcpIHtcbiAgICAgICAgICBzdGF0ZS5wcmV2QWx0ID0gYXBpLmdldERhdGEoKS5hbHQ7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZ0Lm5hbWUgPT09ICdzdHlsZScpIHtcbiAgICAgICAgICBjaGFuZ2VTdHlsZShoZWxwZXJzLCBhcGkpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2dC5uYW1lID09PSAndnNwYWNlJyB8fCBldnQubmFtZSA9PT0gJ2hzcGFjZScgfHwgZXZ0Lm5hbWUgPT09ICdib3JkZXInIHx8IGV2dC5uYW1lID09PSAnYm9yZGVyc3R5bGUnKSB7XG4gICAgICAgICAgY2hhbmdlQVN0eWxlKGhlbHBlcnMsIGluZm8sIGFwaSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZ0Lm5hbWUgPT09ICdmaWxlaW5wdXQnKSB7XG4gICAgICAgICAgY2hhbmdlRmlsZUlucHV0KGhlbHBlcnMsIGluZm8sIHN0YXRlLCBhcGkpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2dC5uYW1lID09PSAnaXNEZWNvcmF0aXZlJykge1xuICAgICAgICAgIGlmIChhcGkuZ2V0RGF0YSgpLmlzRGVjb3JhdGl2ZSkge1xuICAgICAgICAgICAgYXBpLmRpc2FibGUoJ2FsdCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhcGkuZW5hYmxlKCdhbHQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgY2xvc2VIYW5kbGVyID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBzdGF0ZS5vcGVuID0gZmFsc2U7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIG1ha2VEaWFsb2dCb2R5ID0gZnVuY3Rpb24gKGluZm8pIHtcbiAgICAgIGlmIChpbmZvLmhhc0FkdlRhYiB8fCBpbmZvLmhhc1VwbG9hZFVybCB8fCBpbmZvLmhhc1VwbG9hZEhhbmRsZXIpIHtcbiAgICAgICAgdmFyIHRhYlBhbmVsID0ge1xuICAgICAgICAgIHR5cGU6ICd0YWJwYW5lbCcsXG4gICAgICAgICAgdGFiczogZmxhdHRlbihbXG4gICAgICAgICAgICBbTWFpblRhYi5tYWtlVGFiKGluZm8pXSxcbiAgICAgICAgICAgIGluZm8uaGFzQWR2VGFiID8gW0FkdlRhYi5tYWtlVGFiKGluZm8pXSA6IFtdLFxuICAgICAgICAgICAgaW5mby5oYXNVcGxvYWRUYWIgJiYgKGluZm8uaGFzVXBsb2FkVXJsIHx8IGluZm8uaGFzVXBsb2FkSGFuZGxlcikgPyBbVXBsb2FkVGFiLm1ha2VUYWIoaW5mbyldIDogW11cbiAgICAgICAgICBdKVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGFiUGFuZWw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcGFuZWwgPSB7XG4gICAgICAgICAgdHlwZTogJ3BhbmVsJyxcbiAgICAgICAgICBpdGVtczogTWFpblRhYi5tYWtlSXRlbXMoaW5mbylcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHBhbmVsO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIG1ha2VEaWFsb2cgPSBmdW5jdGlvbiAoaGVscGVycykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChpbmZvKSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IGNyZWF0ZVN0YXRlKGluZm8pO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRpdGxlOiAnSW5zZXJ0L0VkaXQgSW1hZ2UnLFxuICAgICAgICAgIHNpemU6ICdub3JtYWwnLFxuICAgICAgICAgIGJvZHk6IG1ha2VEaWFsb2dCb2R5KGluZm8pLFxuICAgICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdHlwZTogJ2NhbmNlbCcsXG4gICAgICAgICAgICAgIG5hbWU6ICdjYW5jZWwnLFxuICAgICAgICAgICAgICB0ZXh0OiAnQ2FuY2VsJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdHlwZTogJ3N1Ym1pdCcsXG4gICAgICAgICAgICAgIG5hbWU6ICdzYXZlJyxcbiAgICAgICAgICAgICAgdGV4dDogJ1NhdmUnLFxuICAgICAgICAgICAgICBwcmltYXJ5OiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBpbml0aWFsRGF0YTogZnJvbUltYWdlRGF0YShpbmZvLmltYWdlKSxcbiAgICAgICAgICBvblN1Ym1pdDogaGVscGVycy5vblN1Ym1pdChpbmZvKSxcbiAgICAgICAgICBvbkNoYW5nZTogY2hhbmdlSGFuZGxlcihoZWxwZXJzLCBpbmZvLCBzdGF0ZSksXG4gICAgICAgICAgb25DbG9zZTogY2xvc2VIYW5kbGVyKHN0YXRlKVxuICAgICAgICB9O1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBzdWJtaXRIYW5kbGVyID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChpbmZvKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYXBpKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSBkZWVwTWVyZ2UoZnJvbUltYWdlRGF0YShpbmZvLmltYWdlKSwgYXBpLmdldERhdGEoKSk7XG4gICAgICAgICAgZWRpdG9yLmV4ZWNDb21tYW5kKCdtY2VVcGRhdGVJbWFnZScsIGZhbHNlLCB0b0ltYWdlRGF0YShkYXRhLCBpbmZvLmhhc0FjY2Vzc2liaWxpdHlPcHRpb25zKSk7XG4gICAgICAgICAgZWRpdG9yLmVkaXRvclVwbG9hZC51cGxvYWRJbWFnZXNBdXRvKCk7XG4gICAgICAgICAgYXBpLmNsb3NlKCk7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGltYWdlU2l6ZSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgIHJldHVybiBnZXRJbWFnZVNpemUoZWRpdG9yLmRvY3VtZW50QmFzZVVSSS50b0Fic29sdXRlKHVybCkpLnRoZW4oZnVuY3Rpb24gKGRpbWVuc2lvbnMpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IFN0cmluZyhkaW1lbnNpb25zLndpZHRoKSxcbiAgICAgICAgICAgIGhlaWdodDogU3RyaW5nKGRpbWVuc2lvbnMuaGVpZ2h0KVxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBjcmVhdGVCbG9iQ2FjaGUgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGZpbGUsIGJsb2JVcmksIGRhdGFVcmwpIHtcbiAgICAgICAgcmV0dXJuIGVkaXRvci5lZGl0b3JVcGxvYWQuYmxvYkNhY2hlLmNyZWF0ZSh7XG4gICAgICAgICAgYmxvYjogZmlsZSxcbiAgICAgICAgICBibG9iVXJpOiBibG9iVXJpLFxuICAgICAgICAgIG5hbWU6IGZpbGUubmFtZSA/IGZpbGUubmFtZS5yZXBsYWNlKC9cXC5bXlxcLl0rJC8sICcnKSA6IG51bGwsXG4gICAgICAgICAgYmFzZTY0OiBkYXRhVXJsLnNwbGl0KCcsJylbMV1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGFkZFRvQmxvYkNhY2hlID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChibG9iSW5mbykge1xuICAgICAgICBlZGl0b3IuZWRpdG9yVXBsb2FkLmJsb2JDYWNoZS5hZGQoYmxvYkluZm8pO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBhbGVydEVyciA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgICBlZGl0b3Iud2luZG93TWFuYWdlci5hbGVydChtZXNzYWdlKTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgbm9ybWFsaXplQ3NzJDEgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGNzc1RleHQpIHtcbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZUNzcyhlZGl0b3IsIGNzc1RleHQpO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBwYXJzZVN0eWxlID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjc3NUZXh0KSB7XG4gICAgICAgIHJldHVybiBlZGl0b3IuZG9tLnBhcnNlU3R5bGUoY3NzVGV4dCk7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHNlcmlhbGl6ZVN0eWxlID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdHlsZXNBcmcsIG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGVkaXRvci5kb20uc2VyaWFsaXplU3R5bGUoc3R5bGVzQXJnLCBuYW1lKTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgRGlhbG9nID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGhlbHBlcnMgPSB7XG4gICAgICAgIG9uU3VibWl0OiBzdWJtaXRIYW5kbGVyKGVkaXRvciksXG4gICAgICAgIGltYWdlU2l6ZTogaW1hZ2VTaXplKGVkaXRvciksXG4gICAgICAgIGFkZFRvQmxvYkNhY2hlOiBhZGRUb0Jsb2JDYWNoZShlZGl0b3IpLFxuICAgICAgICBjcmVhdGVCbG9iQ2FjaGU6IGNyZWF0ZUJsb2JDYWNoZShlZGl0b3IpLFxuICAgICAgICBhbGVydEVycjogYWxlcnRFcnIoZWRpdG9yKSxcbiAgICAgICAgbm9ybWFsaXplQ3NzOiBub3JtYWxpemVDc3MkMShlZGl0b3IpLFxuICAgICAgICBwYXJzZVN0eWxlOiBwYXJzZVN0eWxlKGVkaXRvciksXG4gICAgICAgIHNlcmlhbGl6ZVN0eWxlOiBzZXJpYWxpemVTdHlsZShlZGl0b3IpXG4gICAgICB9O1xuICAgICAgdmFyIG9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjb2xsZWN0KGVkaXRvcikudGhlbihtYWtlRGlhbG9nKGhlbHBlcnMpKS50aGVuKGZ1bmN0aW9uIChzcGVjKSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci53aW5kb3dNYW5hZ2VyLm9wZW4oc3BlYyk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIHZhciBvcGVuTGF0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9wZW4oKTtcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBvcGVuOiBvcGVuLFxuICAgICAgICBvcGVuTGF0ZXI6IG9wZW5MYXRlclxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIHJlZ2lzdGVyID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgZWRpdG9yLmFkZENvbW1hbmQoJ21jZUltYWdlJywgRGlhbG9nKGVkaXRvcikub3BlbkxhdGVyKTtcbiAgICAgIGVkaXRvci5hZGRDb21tYW5kKCdtY2VVcGRhdGVJbWFnZScsIGZ1bmN0aW9uIChfdWksIGRhdGEpIHtcbiAgICAgICAgZWRpdG9yLnVuZG9NYW5hZ2VyLnRyYW5zYWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gaW5zZXJ0T3JVcGRhdGVJbWFnZShlZGl0b3IsIGRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgaGFzSW1hZ2VDbGFzcyA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICB2YXIgY2xhc3NOYW1lID0gbm9kZS5hdHRyKCdjbGFzcycpO1xuICAgICAgcmV0dXJuIGNsYXNzTmFtZSAmJiAvXFxiaW1hZ2VcXGIvLnRlc3QoY2xhc3NOYW1lKTtcbiAgICB9O1xuICAgIHZhciB0b2dnbGVDb250ZW50RWRpdGFibGVTdGF0ZSA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChub2Rlcykge1xuICAgICAgICB2YXIgaSA9IG5vZGVzLmxlbmd0aDtcbiAgICAgICAgdmFyIHRvZ2dsZUNvbnRlbnRFZGl0YWJsZSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgbm9kZS5hdHRyKCdjb250ZW50ZWRpdGFibGUnLCBzdGF0ZSA/ICd0cnVlJyA6IG51bGwpO1xuICAgICAgICB9O1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgdmFyIG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgICBpZiAoaGFzSW1hZ2VDbGFzcyhub2RlKSkge1xuICAgICAgICAgICAgbm9kZS5hdHRyKCdjb250ZW50ZWRpdGFibGUnLCBzdGF0ZSA/ICdmYWxzZScgOiBudWxsKTtcbiAgICAgICAgICAgIGdsb2JhbCQ0LmVhY2gobm9kZS5nZXRBbGwoJ2ZpZ2NhcHRpb24nKSwgdG9nZ2xlQ29udGVudEVkaXRhYmxlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgc2V0dXAgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBlZGl0b3Iub24oJ1ByZUluaXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGVkaXRvci5wYXJzZXIuYWRkTm9kZUZpbHRlcignZmlndXJlJywgdG9nZ2xlQ29udGVudEVkaXRhYmxlU3RhdGUodHJ1ZSkpO1xuICAgICAgICBlZGl0b3Iuc2VyaWFsaXplci5hZGROb2RlRmlsdGVyKCdmaWd1cmUnLCB0b2dnbGVDb250ZW50RWRpdGFibGVTdGF0ZShmYWxzZSkpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciByZWdpc3RlciQxID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZFRvZ2dsZUJ1dHRvbignaW1hZ2UnLCB7XG4gICAgICAgIGljb246ICdpbWFnZScsXG4gICAgICAgIHRvb2x0aXA6ICdJbnNlcnQvZWRpdCBpbWFnZScsXG4gICAgICAgIG9uQWN0aW9uOiBEaWFsb2coZWRpdG9yKS5vcGVuTGF0ZXIsXG4gICAgICAgIG9uU2V0dXA6IGZ1bmN0aW9uIChidXR0b25BcGkpIHtcbiAgICAgICAgICByZXR1cm4gZWRpdG9yLnNlbGVjdGlvbi5zZWxlY3RvckNoYW5nZWRXaXRoVW5iaW5kKCdpbWc6bm90KFtkYXRhLW1jZS1vYmplY3RdLFtkYXRhLW1jZS1wbGFjZWhvbGRlcl0pLGZpZ3VyZS5pbWFnZScsIGJ1dHRvbkFwaS5zZXRBY3RpdmUpLnVuYmluZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkTWVudUl0ZW0oJ2ltYWdlJywge1xuICAgICAgICBpY29uOiAnaW1hZ2UnLFxuICAgICAgICB0ZXh0OiAnSW1hZ2UuLi4nLFxuICAgICAgICBvbkFjdGlvbjogRGlhbG9nKGVkaXRvcikub3BlbkxhdGVyXG4gICAgICB9KTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRDb250ZXh0TWVudSgnaW1hZ2UnLCB7XG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICByZXR1cm4gaXNGaWd1cmUoZWxlbWVudCkgfHwgaXNJbWFnZShlbGVtZW50KSAmJiAhaXNQbGFjZWhvbGRlckltYWdlKGVsZW1lbnQpID8gWydpbWFnZSddIDogW107XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBQbHVnaW4gKCkge1xuICAgICAgZ2xvYmFsLmFkZCgnaW1hZ2UnLCBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIHNldHVwKGVkaXRvcik7XG4gICAgICAgIHJlZ2lzdGVyJDEoZWRpdG9yKTtcbiAgICAgICAgcmVnaXN0ZXIoZWRpdG9yKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIFBsdWdpbigpO1xuXG59KHdpbmRvdykpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==