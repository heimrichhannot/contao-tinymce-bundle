(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~tinymce-plugin-fullscreen~tinymce-plugin-fullscreen-plugin"],{

/***/ "./node_modules/tinymce/plugins/fullscreen/plugin.js":
/*!***********************************************************!*\
  !*** ./node_modules/tinymce/plugins/fullscreen/plugin.js ***!
  \***********************************************************/
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

    var get = function (fullscreenState) {
      return {
        isFullscreen: function () {
          return fullscreenState.get() !== null;
        }
      };
    };

    var noop = function () {
    };
    var compose = function (fa, fb) {
      return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return fa(fb.apply(null, args));
      };
    };
    var compose1 = function (fbc, fab) {
      return function (a) {
        return fbc(fab(a));
      };
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

    var revocable = function (doRevoke) {
      var subject = Cell(Option.none());
      var revoke = function () {
        subject.get().each(doRevoke);
      };
      var clear = function () {
        revoke();
        subject.set(Option.none());
      };
      var set = function (s) {
        revoke();
        subject.set(Option.some(s));
      };
      var isSet = function () {
        return subject.get().isSome();
      };
      return {
        clear: clear,
        isSet: isSet,
        set: set
      };
    };
    var unbindable = function () {
      return revocable(function (s) {
        s.unbind();
      });
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
    var isString = isType('string');
    var isArray = isType('array');
    var isBoolean = isSimpleType('boolean');
    var isNullable = function (a) {
      return a === null || a === undefined;
    };
    var isNonNullable = function (a) {
      return !isNullable(a);
    };
    var isFunction = isSimpleType('function');
    var isNumber = isSimpleType('number');

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
    var head = function (xs) {
      return xs.length === 0 ? Option.none() : Option.some(xs[0]);
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

    var isSupported = function (dom) {
      return dom.style !== undefined && isFunction(dom.style.getPropertyValue);
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

    var Global = typeof domGlobals.window !== 'undefined' ? domGlobals.window : Function('return this;')();

    var DOCUMENT = 9;
    var DOCUMENT_FRAGMENT = 11;
    var ELEMENT = 1;
    var TEXT = 3;

    var type = function (element) {
      return element.dom().nodeType;
    };
    var isType$1 = function (t) {
      return function (element) {
        return type(element) === t;
      };
    };
    var isElement = isType$1(ELEMENT);
    var isText = isType$1(TEXT);
    var isDocument = isType$1(DOCUMENT);
    var isDocumentFragment = isType$1(DOCUMENT_FRAGMENT);

    var is = function (element, selector) {
      var dom = element.dom();
      if (dom.nodeType !== ELEMENT) {
        return false;
      } else {
        var elem = dom;
        if (elem.matches !== undefined) {
          return elem.matches(selector);
        } else if (elem.msMatchesSelector !== undefined) {
          return elem.msMatchesSelector(selector);
        } else if (elem.webkitMatchesSelector !== undefined) {
          return elem.webkitMatchesSelector(selector);
        } else if (elem.mozMatchesSelector !== undefined) {
          return elem.mozMatchesSelector(selector);
        } else {
          throw new Error('Browser lacks native selectors');
        }
      }
    };
    var bypassSelector = function (dom) {
      return dom.nodeType !== ELEMENT && dom.nodeType !== DOCUMENT && dom.nodeType !== DOCUMENT_FRAGMENT || dom.childElementCount === 0;
    };
    var all = function (selector, scope) {
      var base = scope === undefined ? domGlobals.document : scope.dom();
      return bypassSelector(base) ? [] : map(base.querySelectorAll(selector), Element.fromDom);
    };

    var eq = function (e1, e2) {
      return e1.dom() === e2.dom();
    };

    var owner = function (element) {
      return Element.fromDom(element.dom().ownerDocument);
    };
    var documentOrOwner = function (dos) {
      return isDocument(dos) ? dos : owner(dos);
    };
    var parent = function (element) {
      return Option.from(element.dom().parentNode).map(Element.fromDom);
    };
    var parents = function (element, isRoot) {
      var stop = isFunction(isRoot) ? isRoot : never;
      var dom = element.dom();
      var ret = [];
      while (dom.parentNode !== null && dom.parentNode !== undefined) {
        var rawParent = dom.parentNode;
        var p = Element.fromDom(rawParent);
        ret.push(p);
        if (stop(p) === true) {
          break;
        } else {
          dom = rawParent;
        }
      }
      return ret;
    };
    var siblings = function (element) {
      var filterSelf = function (elements) {
        return filter(elements, function (x) {
          return !eq(element, x);
        });
      };
      return parent(element).map(children).map(filterSelf).getOr([]);
    };
    var children = function (element) {
      return map(element.dom().childNodes, Element.fromDom);
    };

    var isShadowRoot = function (dos) {
      return isDocumentFragment(dos);
    };
    var supported = isFunction(domGlobals.Element.prototype.attachShadow) && isFunction(domGlobals.Node.prototype.getRootNode);
    var isSupported$1 = constant(supported);
    var getRootNode = supported ? function (e) {
      return Element.fromDom(e.dom().getRootNode());
    } : documentOrOwner;
    var getShadowRoot = function (e) {
      var r = getRootNode(e);
      return isShadowRoot(r) ? Option.some(r) : Option.none();
    };
    var getShadowHost = function (e) {
      return Element.fromDom(e.dom().host);
    };
    var getOriginalEventTarget = function (event) {
      if (isSupported$1() && isNonNullable(event.target)) {
        var el = Element.fromDom(event.target);
        if (isElement(el) && isOpenShadowHost(Element.fromDom(event.target))) {
          var eventAny = event;
          if (eventAny.composed && eventAny.composedPath) {
            var composedPath = eventAny.composedPath();
            if (composedPath) {
              return head(composedPath);
            }
          }
        }
      }
      return Option.from(event.target);
    };
    var isOpenShadowHost = function (element) {
      return isNonNullable(element.dom().shadowRoot);
    };

    var inBody = function (element) {
      var dom = isText(element) ? element.dom().parentNode : element.dom();
      if (dom === undefined || dom === null || dom.ownerDocument === null) {
        return false;
      }
      return getShadowRoot(Element.fromDom(dom)).fold(function () {
        return dom.ownerDocument.body.contains(dom);
      }, compose1(inBody, getShadowHost));
    };

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
    var get$1 = function (element, key) {
      var v = element.dom().getAttribute(key);
      return v === null ? undefined : v;
    };
    var remove = function (element, key) {
      element.dom().removeAttribute(key);
    };

    var internalSet = function (dom, property, value) {
      if (!isString(value)) {
        domGlobals.console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
        throw new Error('CSS value must be a string: ' + value);
      }
      if (isSupported(dom)) {
        dom.style.setProperty(property, value);
      }
    };
    var setAll = function (element, css) {
      var dom = element.dom();
      each$1(css, function (v, k) {
        internalSet(dom, k, v);
      });
    };
    var get$2 = function (element, property) {
      var dom = element.dom();
      var styles = domGlobals.window.getComputedStyle(dom);
      var r = styles.getPropertyValue(property);
      return r === '' && !inBody(element) ? getUnsafeProperty(dom, property) : r;
    };
    var getUnsafeProperty = function (dom, property) {
      return isSupported(dom) ? dom.style.getPropertyValue(property) : '';
    };

    var mkEvent = function (target, x, y, stop, prevent, kill, raw) {
      return {
        target: constant(target),
        x: constant(x),
        y: constant(y),
        stop: stop,
        prevent: prevent,
        kill: kill,
        raw: constant(raw)
      };
    };
    var fromRawEvent = function (rawEvent) {
      var target = Element.fromDom(getOriginalEventTarget(rawEvent).getOr(rawEvent.target));
      var stop = function () {
        return rawEvent.stopPropagation();
      };
      var prevent = function () {
        return rawEvent.preventDefault();
      };
      var kill = compose(prevent, stop);
      return mkEvent(target, rawEvent.clientX, rawEvent.clientY, stop, prevent, kill, rawEvent);
    };

    var r = function (left, top) {
      var translate = function (x, y) {
        return r(left + x, top + y);
      };
      return {
        left: constant(left),
        top: constant(top),
        translate: translate
      };
    };
    var Position = r;

    var get$3 = function (_DOC) {
      var doc = _DOC !== undefined ? _DOC.dom() : domGlobals.document;
      var x = doc.body.scrollLeft || doc.documentElement.scrollLeft;
      var y = doc.body.scrollTop || doc.documentElement.scrollTop;
      return Position(x, y);
    };

    var get$4 = function (_win) {
      var win = _win === undefined ? domGlobals.window : _win;
      return Option.from(win['visualViewport']);
    };
    var bounds = function (x, y, width, height) {
      return {
        x: x,
        y: y,
        width: width,
        height: height,
        right: x + width,
        bottom: y + height
      };
    };
    var getBounds = function (_win) {
      var win = _win === undefined ? domGlobals.window : _win;
      var doc = win.document;
      var scroll = get$3(Element.fromDom(doc));
      return get$4(win).fold(function () {
        var html = win.document.documentElement;
        var width = html.clientWidth;
        var height = html.clientHeight;
        return bounds(scroll.left(), scroll.top(), width, height);
      }, function (visualViewport) {
        return bounds(Math.max(visualViewport.pageLeft, scroll.left()), Math.max(visualViewport.pageTop, scroll.top()), visualViewport.width, visualViewport.height);
      });
    };
    var bind$1 = function (name, callback, _win) {
      return get$4(_win).map(function (visualViewport) {
        var handler = function (e) {
          return callback(fromRawEvent(e));
        };
        visualViewport.addEventListener(name, handler);
        return {
          unbind: function () {
            return visualViewport.removeEventListener(name, handler);
          }
        };
      }).getOrThunk(function () {
        return { unbind: noop };
      });
    };

    var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

    var global$2 = tinymce.util.Tools.resolve('tinymce.Env');

    var global$3 = tinymce.util.Tools.resolve('tinymce.util.Delay');

    var fireFullscreenStateChanged = function (editor, state) {
      editor.fire('FullscreenStateChanged', { state: state });
    };

    var ancestors = function (scope, predicate, isRoot) {
      return filter(parents(scope, isRoot), predicate);
    };
    var siblings$1 = function (scope, predicate) {
      return filter(siblings(scope), predicate);
    };

    var all$1 = function (selector) {
      return all(selector);
    };
    var ancestors$1 = function (scope, selector, isRoot) {
      return ancestors(scope, function (e) {
        return is(e, selector);
      }, isRoot);
    };
    var siblings$2 = function (scope, selector) {
      return siblings$1(scope, function (e) {
        return is(e, selector);
      });
    };

    var attr = 'data-ephox-mobile-fullscreen-style';
    var siblingStyles = 'display:none!important;';
    var ancestorPosition = 'position:absolute!important;';
    var ancestorStyles = 'top:0!important;left:0!important;margin:0!important;padding:0!important;width:100%!important;height:100%!important;overflow:visible!important;';
    var bgFallback = 'background-color:rgb(255,255,255)!important;';
    var isAndroid = global$2.os.isAndroid();
    var matchColor = function (editorBody) {
      var color = get$2(editorBody, 'background-color');
      return color !== undefined && color !== '' ? 'background-color:' + color + '!important' : bgFallback;
    };
    var clobberStyles = function (dom, container, editorBody) {
      var gatherSibilings = function (element) {
        return siblings$2(element, '*:not(.tox-silver-sink)');
      };
      var clobber = function (clobberStyle) {
        return function (element) {
          var styles = get$1(element, 'style');
          var backup = styles === undefined ? 'no-styles' : styles.trim();
          if (backup === clobberStyle) {
            return;
          } else {
            set(element, attr, backup);
            setAll(element, dom.parseStyle(clobberStyle));
          }
        };
      };
      var ancestors = ancestors$1(container, '*');
      var siblings = bind(ancestors, gatherSibilings);
      var bgColor = matchColor(editorBody);
      each(siblings, clobber(siblingStyles));
      each(ancestors, clobber(ancestorPosition + ancestorStyles + bgColor));
      var containerStyles = isAndroid === true ? '' : ancestorPosition;
      clobber(containerStyles + ancestorStyles + bgColor)(container);
    };
    var restoreStyles = function (dom) {
      var clobberedEls = all$1('[' + attr + ']');
      each(clobberedEls, function (element) {
        var restore = get$1(element, attr);
        if (restore !== 'no-styles') {
          setAll(element, dom.parseStyle(restore));
        } else {
          remove(element, 'style');
        }
        remove(element, attr);
      });
    };

    var DOM = global$1.DOM;
    var getScrollPos = function () {
      var vp = getBounds(domGlobals.window);
      return {
        x: vp.x,
        y: vp.y
      };
    };
    var setScrollPos = function (pos) {
      domGlobals.window.scrollTo(pos.x, pos.y);
    };
    var viewportUpdate = get$4().fold(function () {
      return {
        bind: noop,
        unbind: noop
      };
    }, function (visualViewport) {
      var editorContainer = value();
      var resizeBinder = unbindable();
      var scrollBinder = unbindable();
      var refreshScroll = function () {
        domGlobals.document.body.scrollTop = 0;
        domGlobals.document.documentElement.scrollTop = 0;
      };
      var refreshVisualViewport = function () {
        domGlobals.window.requestAnimationFrame(function () {
          editorContainer.on(function (container) {
            return setAll(container, {
              top: visualViewport.offsetTop + 'px',
              left: visualViewport.offsetLeft + 'px',
              height: visualViewport.height + 'px',
              width: visualViewport.width + 'px'
            });
          });
        });
      };
      var update = global$3.throttle(function () {
        refreshScroll();
        refreshVisualViewport();
      }, 50);
      var bind = function (element) {
        editorContainer.set(element);
        update();
        resizeBinder.set(bind$1('resize', update));
        scrollBinder.set(bind$1('scroll', update));
      };
      var unbind = function () {
        editorContainer.on(function () {
          resizeBinder.clear();
          scrollBinder.clear();
        });
        editorContainer.clear();
      };
      return {
        bind: bind,
        unbind: unbind
      };
    });
    var toggleFullscreen = function (editor, fullscreenState) {
      var body = domGlobals.document.body;
      var documentElement = domGlobals.document.documentElement;
      var editorContainer = editor.getContainer();
      var editorContainerS = Element.fromDom(editorContainer);
      var fullscreenInfo = fullscreenState.get();
      var editorBody = Element.fromDom(editor.getBody());
      var isTouch = global$2.deviceType.isTouch();
      var editorContainerStyle = editorContainer.style;
      var iframe = editor.iframeElement;
      var iframeStyle = iframe.style;
      var cleanup = function () {
        if (isTouch) {
          restoreStyles(editor.dom);
        }
        DOM.removeClass(body, 'tox-fullscreen');
        DOM.removeClass(documentElement, 'tox-fullscreen');
        DOM.removeClass(editorContainer, 'tox-fullscreen');
        viewportUpdate.unbind();
      };
      if (!fullscreenInfo) {
        var newFullScreenInfo = {
          scrollPos: getScrollPos(),
          containerWidth: editorContainerStyle.width,
          containerHeight: editorContainerStyle.height,
          containerTop: editorContainerStyle.top,
          containerLeft: editorContainerStyle.left,
          iframeWidth: iframeStyle.width,
          iframeHeight: iframeStyle.height
        };
        if (isTouch) {
          clobberStyles(editor.dom, editorContainerS, editorBody);
        }
        iframeStyle.width = iframeStyle.height = '100%';
        editorContainerStyle.width = editorContainerStyle.height = '';
        DOM.addClass(body, 'tox-fullscreen');
        DOM.addClass(documentElement, 'tox-fullscreen');
        DOM.addClass(editorContainer, 'tox-fullscreen');
        viewportUpdate.bind(editorContainerS);
        editor.on('remove', cleanup);
        fullscreenState.set(newFullScreenInfo);
        fireFullscreenStateChanged(editor, true);
      } else {
        iframeStyle.width = fullscreenInfo.iframeWidth;
        iframeStyle.height = fullscreenInfo.iframeHeight;
        editorContainerStyle.width = fullscreenInfo.containerWidth;
        editorContainerStyle.height = fullscreenInfo.containerHeight;
        editorContainerStyle.top = fullscreenInfo.containerTop;
        editorContainerStyle.left = fullscreenInfo.containerLeft;
        setScrollPos(fullscreenInfo.scrollPos);
        fullscreenState.set(null);
        fireFullscreenStateChanged(editor, false);
        cleanup();
        editor.off('remove', cleanup);
      }
    };

    var register = function (editor, fullscreenState) {
      editor.addCommand('mceFullScreen', function () {
        toggleFullscreen(editor, fullscreenState);
      });
    };

    var makeSetupHandler = function (editor, fullscreenState) {
      return function (api) {
        api.setActive(fullscreenState.get() !== null);
        var editorEventCallback = function (e) {
          return api.setActive(e.state);
        };
        editor.on('FullscreenStateChanged', editorEventCallback);
        return function () {
          return editor.off('FullscreenStateChanged', editorEventCallback);
        };
      };
    };
    var register$1 = function (editor, fullscreenState) {
      editor.ui.registry.addToggleMenuItem('fullscreen', {
        text: 'Fullscreen',
        icon: 'fullscreen',
        shortcut: 'Meta+Shift+F',
        onAction: function () {
          return editor.execCommand('mceFullScreen');
        },
        onSetup: makeSetupHandler(editor, fullscreenState)
      });
      editor.ui.registry.addToggleButton('fullscreen', {
        tooltip: 'Fullscreen',
        icon: 'fullscreen',
        onAction: function () {
          return editor.execCommand('mceFullScreen');
        },
        onSetup: makeSetupHandler(editor, fullscreenState)
      });
    };

    function Plugin () {
      global.add('fullscreen', function (editor) {
        var fullscreenState = Cell(null);
        if (editor.inline) {
          return get(fullscreenState);
        }
        register(editor, fullscreenState);
        register$1(editor, fullscreenState);
        editor.addShortcut('Meta+Shift+F', '', 'mceFullScreen');
        return get(fullscreenState);
      });
    }

    Plugin();

}(window));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2Z1bGxzY3JlZW4vcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFNBQVM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFNBQVM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFNBQVM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLFNBQVM7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzR0FBc0c7O0FBRXRHO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxnQkFBZ0I7QUFDaEIsT0FBTztBQUNQOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsNkNBQTZDLGVBQWU7QUFDNUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBLGdEQUFnRDtBQUNoRCx3REFBd0Q7QUFDeEQsMENBQTBDLGlCQUFpQixtQkFBbUIsb0JBQW9CLHFCQUFxQixzQkFBc0IsMkJBQTJCO0FBQ3hLLGtFQUFrRTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7O0FBRUEsQ0FBQyIsImZpbGUiOiJ2ZW5kb3JzfnRpbnltY2UtcGx1Z2luLWZ1bGxzY3JlZW5+dGlueW1jZS1wbHVnaW4tZnVsbHNjcmVlbi1wbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqXG4gKiBWZXJzaW9uOiA1LjQuMiAoMjAyMC0wOC0xNylcbiAqL1xuKGZ1bmN0aW9uIChkb21HbG9iYWxzKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIENlbGwgPSBmdW5jdGlvbiAoaW5pdGlhbCkge1xuICAgICAgdmFyIHZhbHVlID0gaW5pdGlhbDtcbiAgICAgIHZhciBnZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG4gICAgICB2YXIgc2V0ID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdmFsdWUgPSB2O1xuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdldDogZ2V0LFxuICAgICAgICBzZXQ6IHNldFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIGdsb2JhbCA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLlBsdWdpbk1hbmFnZXInKTtcblxuICAgIHZhciBnZXQgPSBmdW5jdGlvbiAoZnVsbHNjcmVlblN0YXRlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpc0Z1bGxzY3JlZW46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZnVsbHNjcmVlblN0YXRlLmdldCgpICE9PSBudWxsO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHtcbiAgICB9O1xuICAgIHZhciBjb21wb3NlID0gZnVuY3Rpb24gKGZhLCBmYikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhKGZiLmFwcGx5KG51bGwsIGFyZ3MpKTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgY29tcG9zZTEgPSBmdW5jdGlvbiAoZmJjLCBmYWIpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgICByZXR1cm4gZmJjKGZhYihhKSk7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGNvbnN0YW50ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIG5ldmVyID0gY29uc3RhbnQoZmFsc2UpO1xuICAgIHZhciBhbHdheXMgPSBjb25zdGFudCh0cnVlKTtcblxuICAgIHZhciBub25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIE5PTkU7XG4gICAgfTtcbiAgICB2YXIgTk9ORSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBlcSA9IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgIHJldHVybiBvLmlzTm9uZSgpO1xuICAgICAgfTtcbiAgICAgIHZhciBjYWxsID0gZnVuY3Rpb24gKHRodW5rKSB7XG4gICAgICAgIHJldHVybiB0aHVuaygpO1xuICAgICAgfTtcbiAgICAgIHZhciBpZCA9IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgIHJldHVybiBuO1xuICAgICAgfTtcbiAgICAgIHZhciBtZSA9IHtcbiAgICAgICAgZm9sZDogZnVuY3Rpb24gKG4sIF9zKSB7XG4gICAgICAgICAgcmV0dXJuIG4oKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXM6IG5ldmVyLFxuICAgICAgICBpc1NvbWU6IG5ldmVyLFxuICAgICAgICBpc05vbmU6IGFsd2F5cyxcbiAgICAgICAgZ2V0T3I6IGlkLFxuICAgICAgICBnZXRPclRodW5rOiBjYWxsLFxuICAgICAgICBnZXRPckRpZTogZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cgfHwgJ2Vycm9yOiBnZXRPckRpZSBjYWxsZWQgb24gbm9uZS4nKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0T3JOdWxsOiBjb25zdGFudChudWxsKSxcbiAgICAgICAgZ2V0T3JVbmRlZmluZWQ6IGNvbnN0YW50KHVuZGVmaW5lZCksXG4gICAgICAgIG9yOiBpZCxcbiAgICAgICAgb3JUaHVuazogY2FsbCxcbiAgICAgICAgbWFwOiBub25lLFxuICAgICAgICBlYWNoOiBub29wLFxuICAgICAgICBiaW5kOiBub25lLFxuICAgICAgICBleGlzdHM6IG5ldmVyLFxuICAgICAgICBmb3JhbGw6IGFsd2F5cyxcbiAgICAgICAgZmlsdGVyOiBub25lLFxuICAgICAgICBlcXVhbHM6IGVxLFxuICAgICAgICBlcXVhbHNfOiBlcSxcbiAgICAgICAgdG9BcnJheTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9TdHJpbmc6IGNvbnN0YW50KCdub25lKCknKVxuICAgICAgfTtcbiAgICAgIHJldHVybiBtZTtcbiAgICB9KCk7XG4gICAgdmFyIHNvbWUgPSBmdW5jdGlvbiAoYSkge1xuICAgICAgdmFyIGNvbnN0YW50X2EgPSBjb25zdGFudChhKTtcbiAgICAgIHZhciBzZWxmID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbWU7XG4gICAgICB9O1xuICAgICAgdmFyIGJpbmQgPSBmdW5jdGlvbiAoZikge1xuICAgICAgICByZXR1cm4gZihhKTtcbiAgICAgIH07XG4gICAgICB2YXIgbWUgPSB7XG4gICAgICAgIGZvbGQ6IGZ1bmN0aW9uIChuLCBzKSB7XG4gICAgICAgICAgcmV0dXJuIHMoYSk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgIHJldHVybiBhID09PSB2O1xuICAgICAgICB9LFxuICAgICAgICBpc1NvbWU6IGFsd2F5cyxcbiAgICAgICAgaXNOb25lOiBuZXZlcixcbiAgICAgICAgZ2V0T3I6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yVGh1bms6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yRGllOiBjb25zdGFudF9hLFxuICAgICAgICBnZXRPck51bGw6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yVW5kZWZpbmVkOiBjb25zdGFudF9hLFxuICAgICAgICBvcjogc2VsZixcbiAgICAgICAgb3JUaHVuazogc2VsZixcbiAgICAgICAgbWFwOiBmdW5jdGlvbiAoZikge1xuICAgICAgICAgIHJldHVybiBzb21lKGYoYSkpO1xuICAgICAgICB9LFxuICAgICAgICBlYWNoOiBmdW5jdGlvbiAoZikge1xuICAgICAgICAgIGYoYSk7XG4gICAgICAgIH0sXG4gICAgICAgIGJpbmQ6IGJpbmQsXG4gICAgICAgIGV4aXN0czogYmluZCxcbiAgICAgICAgZm9yYWxsOiBiaW5kLFxuICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgcmV0dXJuIGYoYSkgPyBtZSA6IE5PTkU7XG4gICAgICAgIH0sXG4gICAgICAgIHRvQXJyYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gW2FdO1xuICAgICAgICB9LFxuICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiAnc29tZSgnICsgYSArICcpJztcbiAgICAgICAgfSxcbiAgICAgICAgZXF1YWxzOiBmdW5jdGlvbiAobykge1xuICAgICAgICAgIHJldHVybiBvLmlzKGEpO1xuICAgICAgICB9LFxuICAgICAgICBlcXVhbHNfOiBmdW5jdGlvbiAobywgZWxlbWVudEVxKSB7XG4gICAgICAgICAgcmV0dXJuIG8uZm9sZChuZXZlciwgZnVuY3Rpb24gKGIpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50RXEoYSwgYik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXR1cm4gbWU7XG4gICAgfTtcbiAgICB2YXIgZnJvbSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgPyBOT05FIDogc29tZSh2YWx1ZSk7XG4gICAgfTtcbiAgICB2YXIgT3B0aW9uID0ge1xuICAgICAgc29tZTogc29tZSxcbiAgICAgIG5vbmU6IG5vbmUsXG4gICAgICBmcm9tOiBmcm9tXG4gICAgfTtcblxuICAgIHZhciByZXZvY2FibGUgPSBmdW5jdGlvbiAoZG9SZXZva2UpIHtcbiAgICAgIHZhciBzdWJqZWN0ID0gQ2VsbChPcHRpb24ubm9uZSgpKTtcbiAgICAgIHZhciByZXZva2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN1YmplY3QuZ2V0KCkuZWFjaChkb1Jldm9rZSk7XG4gICAgICB9O1xuICAgICAgdmFyIGNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXZva2UoKTtcbiAgICAgICAgc3ViamVjdC5zZXQoT3B0aW9uLm5vbmUoKSk7XG4gICAgICB9O1xuICAgICAgdmFyIHNldCA9IGZ1bmN0aW9uIChzKSB7XG4gICAgICAgIHJldm9rZSgpO1xuICAgICAgICBzdWJqZWN0LnNldChPcHRpb24uc29tZShzKSk7XG4gICAgICB9O1xuICAgICAgdmFyIGlzU2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc3ViamVjdC5nZXQoKS5pc1NvbWUoKTtcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjbGVhcjogY2xlYXIsXG4gICAgICAgIGlzU2V0OiBpc1NldCxcbiAgICAgICAgc2V0OiBzZXRcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgdW5iaW5kYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiByZXZvY2FibGUoZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgcy51bmJpbmQoKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHN1YmplY3QgPSBDZWxsKE9wdGlvbi5ub25lKCkpO1xuICAgICAgdmFyIGNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzdWJqZWN0LnNldChPcHRpb24ubm9uZSgpKTtcbiAgICAgIH07XG4gICAgICB2YXIgc2V0ID0gZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgc3ViamVjdC5zZXQoT3B0aW9uLnNvbWUocykpO1xuICAgICAgfTtcbiAgICAgIHZhciBvbiA9IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHN1YmplY3QuZ2V0KCkuZWFjaChmKTtcbiAgICAgIH07XG4gICAgICB2YXIgaXNTZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBzdWJqZWN0LmdldCgpLmlzU29tZSgpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNsZWFyOiBjbGVhcixcbiAgICAgICAgc2V0OiBzZXQsXG4gICAgICAgIGlzU2V0OiBpc1NldCxcbiAgICAgICAgb246IG9uXG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgdHlwZU9mID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgIHZhciB0ID0gdHlwZW9mIHg7XG4gICAgICBpZiAoeCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJ251bGwnO1xuICAgICAgfSBlbHNlIGlmICh0ID09PSAnb2JqZWN0JyAmJiAoQXJyYXkucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoeCkgfHwgeC5jb25zdHJ1Y3RvciAmJiB4LmNvbnN0cnVjdG9yLm5hbWUgPT09ICdBcnJheScpKSB7XG4gICAgICAgIHJldHVybiAnYXJyYXknO1xuICAgICAgfSBlbHNlIGlmICh0ID09PSAnb2JqZWN0JyAmJiAoU3RyaW5nLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKHgpIHx8IHguY29uc3RydWN0b3IgJiYgeC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnU3RyaW5nJykpIHtcbiAgICAgICAgcmV0dXJuICdzdHJpbmcnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgaXNUeXBlID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVPZih2YWx1ZSkgPT09IHR5cGU7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGlzU2ltcGxlVHlwZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IHR5cGU7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGlzU3RyaW5nID0gaXNUeXBlKCdzdHJpbmcnKTtcbiAgICB2YXIgaXNBcnJheSA9IGlzVHlwZSgnYXJyYXknKTtcbiAgICB2YXIgaXNCb29sZWFuID0gaXNTaW1wbGVUeXBlKCdib29sZWFuJyk7XG4gICAgdmFyIGlzTnVsbGFibGUgPSBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGEgPT09IG51bGwgfHwgYSA9PT0gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgdmFyIGlzTm9uTnVsbGFibGUgPSBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuICFpc051bGxhYmxlKGEpO1xuICAgIH07XG4gICAgdmFyIGlzRnVuY3Rpb24gPSBpc1NpbXBsZVR5cGUoJ2Z1bmN0aW9uJyk7XG4gICAgdmFyIGlzTnVtYmVyID0gaXNTaW1wbGVUeXBlKCdudW1iZXInKTtcblxuICAgIHZhciBuYXRpdmVQdXNoID0gQXJyYXkucHJvdG90eXBlLnB1c2g7XG4gICAgdmFyIG1hcCA9IGZ1bmN0aW9uICh4cywgZikge1xuICAgICAgdmFyIGxlbiA9IHhzLmxlbmd0aDtcbiAgICAgIHZhciByID0gbmV3IEFycmF5KGxlbik7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciB4ID0geHNbaV07XG4gICAgICAgIHJbaV0gPSBmKHgsIGkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcbiAgICB2YXIgZWFjaCA9IGZ1bmN0aW9uICh4cywgZikge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHhzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciB4ID0geHNbaV07XG4gICAgICAgIGYoeCwgaSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgZmlsdGVyID0gZnVuY3Rpb24gKHhzLCBwcmVkKSB7XG4gICAgICB2YXIgciA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHhzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciB4ID0geHNbaV07XG4gICAgICAgIGlmIChwcmVkKHgsIGkpKSB7XG4gICAgICAgICAgci5wdXNoKHgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcjtcbiAgICB9O1xuICAgIHZhciBmbGF0dGVuID0gZnVuY3Rpb24gKHhzKSB7XG4gICAgICB2YXIgciA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHhzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgIGlmICghaXNBcnJheSh4c1tpXSkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fyci5mbGF0dGVuIGl0ZW0gJyArIGkgKyAnIHdhcyBub3QgYW4gYXJyYXksIGlucHV0OiAnICsgeHMpO1xuICAgICAgICB9XG4gICAgICAgIG5hdGl2ZVB1c2guYXBwbHkociwgeHNbaV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcbiAgICB2YXIgYmluZCA9IGZ1bmN0aW9uICh4cywgZikge1xuICAgICAgcmV0dXJuIGZsYXR0ZW4obWFwKHhzLCBmKSk7XG4gICAgfTtcbiAgICB2YXIgaGVhZCA9IGZ1bmN0aW9uICh4cykge1xuICAgICAgcmV0dXJuIHhzLmxlbmd0aCA9PT0gMCA/IE9wdGlvbi5ub25lKCkgOiBPcHRpb24uc29tZSh4c1swXSk7XG4gICAgfTtcblxuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXM7XG4gICAgdmFyIGVhY2gkMSA9IGZ1bmN0aW9uIChvYmosIGYpIHtcbiAgICAgIHZhciBwcm9wcyA9IGtleXMob2JqKTtcbiAgICAgIGZvciAodmFyIGsgPSAwLCBsZW4gPSBwcm9wcy5sZW5ndGg7IGsgPCBsZW47IGsrKykge1xuICAgICAgICB2YXIgaSA9IHByb3BzW2tdO1xuICAgICAgICB2YXIgeCA9IG9ialtpXTtcbiAgICAgICAgZih4LCBpKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGlzU3VwcG9ydGVkID0gZnVuY3Rpb24gKGRvbSkge1xuICAgICAgcmV0dXJuIGRvbS5zdHlsZSAhPT0gdW5kZWZpbmVkICYmIGlzRnVuY3Rpb24oZG9tLnN0eWxlLmdldFByb3BlcnR5VmFsdWUpO1xuICAgIH07XG5cbiAgICB2YXIgZnJvbUh0bWwgPSBmdW5jdGlvbiAoaHRtbCwgc2NvcGUpIHtcbiAgICAgIHZhciBkb2MgPSBzY29wZSB8fCBkb21HbG9iYWxzLmRvY3VtZW50O1xuICAgICAgdmFyIGRpdiA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGRpdi5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgaWYgKCFkaXYuaGFzQ2hpbGROb2RlcygpIHx8IGRpdi5jaGlsZE5vZGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZG9tR2xvYmFscy5jb25zb2xlLmVycm9yKCdIVE1MIGRvZXMgbm90IGhhdmUgYSBzaW5nbGUgcm9vdCBub2RlJywgaHRtbCk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSFRNTCBtdXN0IGhhdmUgYSBzaW5nbGUgcm9vdCBub2RlJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZnJvbURvbShkaXYuY2hpbGROb2Rlc1swXSk7XG4gICAgfTtcbiAgICB2YXIgZnJvbVRhZyA9IGZ1bmN0aW9uICh0YWcsIHNjb3BlKSB7XG4gICAgICB2YXIgZG9jID0gc2NvcGUgfHwgZG9tR2xvYmFscy5kb2N1bWVudDtcbiAgICAgIHZhciBub2RlID0gZG9jLmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAgIHJldHVybiBmcm9tRG9tKG5vZGUpO1xuICAgIH07XG4gICAgdmFyIGZyb21UZXh0ID0gZnVuY3Rpb24gKHRleHQsIHNjb3BlKSB7XG4gICAgICB2YXIgZG9jID0gc2NvcGUgfHwgZG9tR2xvYmFscy5kb2N1bWVudDtcbiAgICAgIHZhciBub2RlID0gZG9jLmNyZWF0ZVRleHROb2RlKHRleHQpO1xuICAgICAgcmV0dXJuIGZyb21Eb20obm9kZSk7XG4gICAgfTtcbiAgICB2YXIgZnJvbURvbSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICBpZiAobm9kZSA9PT0gbnVsbCB8fCBub2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb2RlIGNhbm5vdCBiZSBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgZG9tOiBjb25zdGFudChub2RlKSB9O1xuICAgIH07XG4gICAgdmFyIGZyb21Qb2ludCA9IGZ1bmN0aW9uIChkb2NFbG0sIHgsIHkpIHtcbiAgICAgIHZhciBkb2MgPSBkb2NFbG0uZG9tKCk7XG4gICAgICByZXR1cm4gT3B0aW9uLmZyb20oZG9jLmVsZW1lbnRGcm9tUG9pbnQoeCwgeSkpLm1hcChmcm9tRG9tKTtcbiAgICB9O1xuICAgIHZhciBFbGVtZW50ID0ge1xuICAgICAgZnJvbUh0bWw6IGZyb21IdG1sLFxuICAgICAgZnJvbVRhZzogZnJvbVRhZyxcbiAgICAgIGZyb21UZXh0OiBmcm9tVGV4dCxcbiAgICAgIGZyb21Eb206IGZyb21Eb20sXG4gICAgICBmcm9tUG9pbnQ6IGZyb21Qb2ludFxuICAgIH07XG5cbiAgICB2YXIgR2xvYmFsID0gdHlwZW9mIGRvbUdsb2JhbHMud2luZG93ICE9PSAndW5kZWZpbmVkJyA/IGRvbUdsb2JhbHMud2luZG93IDogRnVuY3Rpb24oJ3JldHVybiB0aGlzOycpKCk7XG5cbiAgICB2YXIgRE9DVU1FTlQgPSA5O1xuICAgIHZhciBET0NVTUVOVF9GUkFHTUVOVCA9IDExO1xuICAgIHZhciBFTEVNRU5UID0gMTtcbiAgICB2YXIgVEVYVCA9IDM7XG5cbiAgICB2YXIgdHlwZSA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gZWxlbWVudC5kb20oKS5ub2RlVHlwZTtcbiAgICB9O1xuICAgIHZhciBpc1R5cGUkMSA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHR5cGUoZWxlbWVudCkgPT09IHQ7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGlzRWxlbWVudCA9IGlzVHlwZSQxKEVMRU1FTlQpO1xuICAgIHZhciBpc1RleHQgPSBpc1R5cGUkMShURVhUKTtcbiAgICB2YXIgaXNEb2N1bWVudCA9IGlzVHlwZSQxKERPQ1VNRU5UKTtcbiAgICB2YXIgaXNEb2N1bWVudEZyYWdtZW50ID0gaXNUeXBlJDEoRE9DVU1FTlRfRlJBR01FTlQpO1xuXG4gICAgdmFyIGlzID0gZnVuY3Rpb24gKGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgICB2YXIgZG9tID0gZWxlbWVudC5kb20oKTtcbiAgICAgIGlmIChkb20ubm9kZVR5cGUgIT09IEVMRU1FTlQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGVsZW0gPSBkb207XG4gICAgICAgIGlmIChlbGVtLm1hdGNoZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBlbGVtLm1hdGNoZXMoc2VsZWN0b3IpO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW0ubXNNYXRjaGVzU2VsZWN0b3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBlbGVtLm1zTWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtLndlYmtpdE1hdGNoZXNTZWxlY3RvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIGVsZW0ud2Via2l0TWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtLm1vek1hdGNoZXNTZWxlY3RvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIGVsZW0ubW96TWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jyb3dzZXIgbGFja3MgbmF0aXZlIHNlbGVjdG9ycycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgYnlwYXNzU2VsZWN0b3IgPSBmdW5jdGlvbiAoZG9tKSB7XG4gICAgICByZXR1cm4gZG9tLm5vZGVUeXBlICE9PSBFTEVNRU5UICYmIGRvbS5ub2RlVHlwZSAhPT0gRE9DVU1FTlQgJiYgZG9tLm5vZGVUeXBlICE9PSBET0NVTUVOVF9GUkFHTUVOVCB8fCBkb20uY2hpbGRFbGVtZW50Q291bnQgPT09IDA7XG4gICAgfTtcbiAgICB2YXIgYWxsID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBzY29wZSkge1xuICAgICAgdmFyIGJhc2UgPSBzY29wZSA9PT0gdW5kZWZpbmVkID8gZG9tR2xvYmFscy5kb2N1bWVudCA6IHNjb3BlLmRvbSgpO1xuICAgICAgcmV0dXJuIGJ5cGFzc1NlbGVjdG9yKGJhc2UpID8gW10gOiBtYXAoYmFzZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSwgRWxlbWVudC5mcm9tRG9tKTtcbiAgICB9O1xuXG4gICAgdmFyIGVxID0gZnVuY3Rpb24gKGUxLCBlMikge1xuICAgICAgcmV0dXJuIGUxLmRvbSgpID09PSBlMi5kb20oKTtcbiAgICB9O1xuXG4gICAgdmFyIG93bmVyID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBFbGVtZW50LmZyb21Eb20oZWxlbWVudC5kb20oKS5vd25lckRvY3VtZW50KTtcbiAgICB9O1xuICAgIHZhciBkb2N1bWVudE9yT3duZXIgPSBmdW5jdGlvbiAoZG9zKSB7XG4gICAgICByZXR1cm4gaXNEb2N1bWVudChkb3MpID8gZG9zIDogb3duZXIoZG9zKTtcbiAgICB9O1xuICAgIHZhciBwYXJlbnQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIE9wdGlvbi5mcm9tKGVsZW1lbnQuZG9tKCkucGFyZW50Tm9kZSkubWFwKEVsZW1lbnQuZnJvbURvbSk7XG4gICAgfTtcbiAgICB2YXIgcGFyZW50cyA9IGZ1bmN0aW9uIChlbGVtZW50LCBpc1Jvb3QpIHtcbiAgICAgIHZhciBzdG9wID0gaXNGdW5jdGlvbihpc1Jvb3QpID8gaXNSb290IDogbmV2ZXI7XG4gICAgICB2YXIgZG9tID0gZWxlbWVudC5kb20oKTtcbiAgICAgIHZhciByZXQgPSBbXTtcbiAgICAgIHdoaWxlIChkb20ucGFyZW50Tm9kZSAhPT0gbnVsbCAmJiBkb20ucGFyZW50Tm9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciByYXdQYXJlbnQgPSBkb20ucGFyZW50Tm9kZTtcbiAgICAgICAgdmFyIHAgPSBFbGVtZW50LmZyb21Eb20ocmF3UGFyZW50KTtcbiAgICAgICAgcmV0LnB1c2gocCk7XG4gICAgICAgIGlmIChzdG9wKHApID09PSB0cnVlKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9tID0gcmF3UGFyZW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH07XG4gICAgdmFyIHNpYmxpbmdzID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHZhciBmaWx0ZXJTZWxmID0gZnVuY3Rpb24gKGVsZW1lbnRzKSB7XG4gICAgICAgIHJldHVybiBmaWx0ZXIoZWxlbWVudHMsIGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgcmV0dXJuICFlcShlbGVtZW50LCB4KTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHBhcmVudChlbGVtZW50KS5tYXAoY2hpbGRyZW4pLm1hcChmaWx0ZXJTZWxmKS5nZXRPcihbXSk7XG4gICAgfTtcbiAgICB2YXIgY2hpbGRyZW4gPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIG1hcChlbGVtZW50LmRvbSgpLmNoaWxkTm9kZXMsIEVsZW1lbnQuZnJvbURvbSk7XG4gICAgfTtcblxuICAgIHZhciBpc1NoYWRvd1Jvb3QgPSBmdW5jdGlvbiAoZG9zKSB7XG4gICAgICByZXR1cm4gaXNEb2N1bWVudEZyYWdtZW50KGRvcyk7XG4gICAgfTtcbiAgICB2YXIgc3VwcG9ydGVkID0gaXNGdW5jdGlvbihkb21HbG9iYWxzLkVsZW1lbnQucHJvdG90eXBlLmF0dGFjaFNoYWRvdykgJiYgaXNGdW5jdGlvbihkb21HbG9iYWxzLk5vZGUucHJvdG90eXBlLmdldFJvb3ROb2RlKTtcbiAgICB2YXIgaXNTdXBwb3J0ZWQkMSA9IGNvbnN0YW50KHN1cHBvcnRlZCk7XG4gICAgdmFyIGdldFJvb3ROb2RlID0gc3VwcG9ydGVkID8gZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBFbGVtZW50LmZyb21Eb20oZS5kb20oKS5nZXRSb290Tm9kZSgpKTtcbiAgICB9IDogZG9jdW1lbnRPck93bmVyO1xuICAgIHZhciBnZXRTaGFkb3dSb290ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciByID0gZ2V0Um9vdE5vZGUoZSk7XG4gICAgICByZXR1cm4gaXNTaGFkb3dSb290KHIpID8gT3B0aW9uLnNvbWUocikgOiBPcHRpb24ubm9uZSgpO1xuICAgIH07XG4gICAgdmFyIGdldFNoYWRvd0hvc3QgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIEVsZW1lbnQuZnJvbURvbShlLmRvbSgpLmhvc3QpO1xuICAgIH07XG4gICAgdmFyIGdldE9yaWdpbmFsRXZlbnRUYXJnZXQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGlmIChpc1N1cHBvcnRlZCQxKCkgJiYgaXNOb25OdWxsYWJsZShldmVudC50YXJnZXQpKSB7XG4gICAgICAgIHZhciBlbCA9IEVsZW1lbnQuZnJvbURvbShldmVudC50YXJnZXQpO1xuICAgICAgICBpZiAoaXNFbGVtZW50KGVsKSAmJiBpc09wZW5TaGFkb3dIb3N0KEVsZW1lbnQuZnJvbURvbShldmVudC50YXJnZXQpKSkge1xuICAgICAgICAgIHZhciBldmVudEFueSA9IGV2ZW50O1xuICAgICAgICAgIGlmIChldmVudEFueS5jb21wb3NlZCAmJiBldmVudEFueS5jb21wb3NlZFBhdGgpIHtcbiAgICAgICAgICAgIHZhciBjb21wb3NlZFBhdGggPSBldmVudEFueS5jb21wb3NlZFBhdGgoKTtcbiAgICAgICAgICAgIGlmIChjb21wb3NlZFBhdGgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhlYWQoY29tcG9zZWRQYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBPcHRpb24uZnJvbShldmVudC50YXJnZXQpO1xuICAgIH07XG4gICAgdmFyIGlzT3BlblNoYWRvd0hvc3QgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIGlzTm9uTnVsbGFibGUoZWxlbWVudC5kb20oKS5zaGFkb3dSb290KTtcbiAgICB9O1xuXG4gICAgdmFyIGluQm9keSA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICB2YXIgZG9tID0gaXNUZXh0KGVsZW1lbnQpID8gZWxlbWVudC5kb20oKS5wYXJlbnROb2RlIDogZWxlbWVudC5kb20oKTtcbiAgICAgIGlmIChkb20gPT09IHVuZGVmaW5lZCB8fCBkb20gPT09IG51bGwgfHwgZG9tLm93bmVyRG9jdW1lbnQgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGdldFNoYWRvd1Jvb3QoRWxlbWVudC5mcm9tRG9tKGRvbSkpLmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZG9tLm93bmVyRG9jdW1lbnQuYm9keS5jb250YWlucyhkb20pO1xuICAgICAgfSwgY29tcG9zZTEoaW5Cb2R5LCBnZXRTaGFkb3dIb3N0KSk7XG4gICAgfTtcblxuICAgIHZhciByYXdTZXQgPSBmdW5jdGlvbiAoZG9tLCBrZXksIHZhbHVlKSB7XG4gICAgICBpZiAoaXNTdHJpbmcodmFsdWUpIHx8IGlzQm9vbGVhbih2YWx1ZSkgfHwgaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgICAgIGRvbS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSArICcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvbUdsb2JhbHMuY29uc29sZS5lcnJvcignSW52YWxpZCBjYWxsIHRvIEF0dHIuc2V0LiBLZXkgJywga2V5LCAnOjogVmFsdWUgJywgdmFsdWUsICc6OiBFbGVtZW50ICcsIGRvbSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQXR0cmlidXRlIHZhbHVlIHdhcyBub3Qgc2ltcGxlJyk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgc2V0ID0gZnVuY3Rpb24gKGVsZW1lbnQsIGtleSwgdmFsdWUpIHtcbiAgICAgIHJhd1NldChlbGVtZW50LmRvbSgpLCBrZXksIHZhbHVlKTtcbiAgICB9O1xuICAgIHZhciBnZXQkMSA9IGZ1bmN0aW9uIChlbGVtZW50LCBrZXkpIHtcbiAgICAgIHZhciB2ID0gZWxlbWVudC5kb20oKS5nZXRBdHRyaWJ1dGUoa2V5KTtcbiAgICAgIHJldHVybiB2ID09PSBudWxsID8gdW5kZWZpbmVkIDogdjtcbiAgICB9O1xuICAgIHZhciByZW1vdmUgPSBmdW5jdGlvbiAoZWxlbWVudCwga2V5KSB7XG4gICAgICBlbGVtZW50LmRvbSgpLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xuICAgIH07XG5cbiAgICB2YXIgaW50ZXJuYWxTZXQgPSBmdW5jdGlvbiAoZG9tLCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICAgIGlmICghaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgIGRvbUdsb2JhbHMuY29uc29sZS5lcnJvcignSW52YWxpZCBjYWxsIHRvIENTUy5zZXQuIFByb3BlcnR5ICcsIHByb3BlcnR5LCAnOjogVmFsdWUgJywgdmFsdWUsICc6OiBFbGVtZW50ICcsIGRvbSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ1NTIHZhbHVlIG11c3QgYmUgYSBzdHJpbmc6ICcgKyB2YWx1ZSk7XG4gICAgICB9XG4gICAgICBpZiAoaXNTdXBwb3J0ZWQoZG9tKSkge1xuICAgICAgICBkb20uc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBzZXRBbGwgPSBmdW5jdGlvbiAoZWxlbWVudCwgY3NzKSB7XG4gICAgICB2YXIgZG9tID0gZWxlbWVudC5kb20oKTtcbiAgICAgIGVhY2gkMShjc3MsIGZ1bmN0aW9uICh2LCBrKSB7XG4gICAgICAgIGludGVybmFsU2V0KGRvbSwgaywgdik7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBnZXQkMiA9IGZ1bmN0aW9uIChlbGVtZW50LCBwcm9wZXJ0eSkge1xuICAgICAgdmFyIGRvbSA9IGVsZW1lbnQuZG9tKCk7XG4gICAgICB2YXIgc3R5bGVzID0gZG9tR2xvYmFscy53aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb20pO1xuICAgICAgdmFyIHIgPSBzdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSk7XG4gICAgICByZXR1cm4gciA9PT0gJycgJiYgIWluQm9keShlbGVtZW50KSA/IGdldFVuc2FmZVByb3BlcnR5KGRvbSwgcHJvcGVydHkpIDogcjtcbiAgICB9O1xuICAgIHZhciBnZXRVbnNhZmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIChkb20sIHByb3BlcnR5KSB7XG4gICAgICByZXR1cm4gaXNTdXBwb3J0ZWQoZG9tKSA/IGRvbS5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KSA6ICcnO1xuICAgIH07XG5cbiAgICB2YXIgbWtFdmVudCA9IGZ1bmN0aW9uICh0YXJnZXQsIHgsIHksIHN0b3AsIHByZXZlbnQsIGtpbGwsIHJhdykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGFyZ2V0OiBjb25zdGFudCh0YXJnZXQpLFxuICAgICAgICB4OiBjb25zdGFudCh4KSxcbiAgICAgICAgeTogY29uc3RhbnQoeSksXG4gICAgICAgIHN0b3A6IHN0b3AsXG4gICAgICAgIHByZXZlbnQ6IHByZXZlbnQsXG4gICAgICAgIGtpbGw6IGtpbGwsXG4gICAgICAgIHJhdzogY29uc3RhbnQocmF3KVxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBmcm9tUmF3RXZlbnQgPSBmdW5jdGlvbiAocmF3RXZlbnQpIHtcbiAgICAgIHZhciB0YXJnZXQgPSBFbGVtZW50LmZyb21Eb20oZ2V0T3JpZ2luYWxFdmVudFRhcmdldChyYXdFdmVudCkuZ2V0T3IocmF3RXZlbnQudGFyZ2V0KSk7XG4gICAgICB2YXIgc3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHJhd0V2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfTtcbiAgICAgIHZhciBwcmV2ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcmF3RXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH07XG4gICAgICB2YXIga2lsbCA9IGNvbXBvc2UocHJldmVudCwgc3RvcCk7XG4gICAgICByZXR1cm4gbWtFdmVudCh0YXJnZXQsIHJhd0V2ZW50LmNsaWVudFgsIHJhd0V2ZW50LmNsaWVudFksIHN0b3AsIHByZXZlbnQsIGtpbGwsIHJhd0V2ZW50KTtcbiAgICB9O1xuXG4gICAgdmFyIHIgPSBmdW5jdGlvbiAobGVmdCwgdG9wKSB7XG4gICAgICB2YXIgdHJhbnNsYXRlID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIHIobGVmdCArIHgsIHRvcCArIHkpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6IGNvbnN0YW50KGxlZnQpLFxuICAgICAgICB0b3A6IGNvbnN0YW50KHRvcCksXG4gICAgICAgIHRyYW5zbGF0ZTogdHJhbnNsYXRlXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIFBvc2l0aW9uID0gcjtcblxuICAgIHZhciBnZXQkMyA9IGZ1bmN0aW9uIChfRE9DKSB7XG4gICAgICB2YXIgZG9jID0gX0RPQyAhPT0gdW5kZWZpbmVkID8gX0RPQy5kb20oKSA6IGRvbUdsb2JhbHMuZG9jdW1lbnQ7XG4gICAgICB2YXIgeCA9IGRvYy5ib2R5LnNjcm9sbExlZnQgfHwgZG9jLmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgICAgdmFyIHkgPSBkb2MuYm9keS5zY3JvbGxUb3AgfHwgZG9jLmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICByZXR1cm4gUG9zaXRpb24oeCwgeSk7XG4gICAgfTtcblxuICAgIHZhciBnZXQkNCA9IGZ1bmN0aW9uIChfd2luKSB7XG4gICAgICB2YXIgd2luID0gX3dpbiA9PT0gdW5kZWZpbmVkID8gZG9tR2xvYmFscy53aW5kb3cgOiBfd2luO1xuICAgICAgcmV0dXJuIE9wdGlvbi5mcm9tKHdpblsndmlzdWFsVmlld3BvcnQnXSk7XG4gICAgfTtcbiAgICB2YXIgYm91bmRzID0gZnVuY3Rpb24gKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHksXG4gICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgIHJpZ2h0OiB4ICsgd2lkdGgsXG4gICAgICAgIGJvdHRvbTogeSArIGhlaWdodFxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBnZXRCb3VuZHMgPSBmdW5jdGlvbiAoX3dpbikge1xuICAgICAgdmFyIHdpbiA9IF93aW4gPT09IHVuZGVmaW5lZCA/IGRvbUdsb2JhbHMud2luZG93IDogX3dpbjtcbiAgICAgIHZhciBkb2MgPSB3aW4uZG9jdW1lbnQ7XG4gICAgICB2YXIgc2Nyb2xsID0gZ2V0JDMoRWxlbWVudC5mcm9tRG9tKGRvYykpO1xuICAgICAgcmV0dXJuIGdldCQ0KHdpbikuZm9sZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBodG1sID0gd2luLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgdmFyIHdpZHRoID0gaHRtbC5jbGllbnRXaWR0aDtcbiAgICAgICAgdmFyIGhlaWdodCA9IGh0bWwuY2xpZW50SGVpZ2h0O1xuICAgICAgICByZXR1cm4gYm91bmRzKHNjcm9sbC5sZWZ0KCksIHNjcm9sbC50b3AoKSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICB9LCBmdW5jdGlvbiAodmlzdWFsVmlld3BvcnQpIHtcbiAgICAgICAgcmV0dXJuIGJvdW5kcyhNYXRoLm1heCh2aXN1YWxWaWV3cG9ydC5wYWdlTGVmdCwgc2Nyb2xsLmxlZnQoKSksIE1hdGgubWF4KHZpc3VhbFZpZXdwb3J0LnBhZ2VUb3AsIHNjcm9sbC50b3AoKSksIHZpc3VhbFZpZXdwb3J0LndpZHRoLCB2aXN1YWxWaWV3cG9ydC5oZWlnaHQpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgYmluZCQxID0gZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrLCBfd2luKSB7XG4gICAgICByZXR1cm4gZ2V0JDQoX3dpbikubWFwKGZ1bmN0aW9uICh2aXN1YWxWaWV3cG9ydCkge1xuICAgICAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGZyb21SYXdFdmVudChlKSk7XG4gICAgICAgIH07XG4gICAgICAgIHZpc3VhbFZpZXdwb3J0LmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgaGFuZGxlcik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdW5iaW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdmlzdWFsVmlld3BvcnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBoYW5kbGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KS5nZXRPclRodW5rKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHsgdW5iaW5kOiBub29wIH07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIGdsb2JhbCQxID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuZG9tLkRPTVV0aWxzJyk7XG5cbiAgICB2YXIgZ2xvYmFsJDIgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5FbnYnKTtcblxuICAgIHZhciBnbG9iYWwkMyA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuRGVsYXknKTtcblxuICAgIHZhciBmaXJlRnVsbHNjcmVlblN0YXRlQ2hhbmdlZCA9IGZ1bmN0aW9uIChlZGl0b3IsIHN0YXRlKSB7XG4gICAgICBlZGl0b3IuZmlyZSgnRnVsbHNjcmVlblN0YXRlQ2hhbmdlZCcsIHsgc3RhdGU6IHN0YXRlIH0pO1xuICAgIH07XG5cbiAgICB2YXIgYW5jZXN0b3JzID0gZnVuY3Rpb24gKHNjb3BlLCBwcmVkaWNhdGUsIGlzUm9vdCkge1xuICAgICAgcmV0dXJuIGZpbHRlcihwYXJlbnRzKHNjb3BlLCBpc1Jvb3QpLCBwcmVkaWNhdGUpO1xuICAgIH07XG4gICAgdmFyIHNpYmxpbmdzJDEgPSBmdW5jdGlvbiAoc2NvcGUsIHByZWRpY2F0ZSkge1xuICAgICAgcmV0dXJuIGZpbHRlcihzaWJsaW5ncyhzY29wZSksIHByZWRpY2F0ZSk7XG4gICAgfTtcblxuICAgIHZhciBhbGwkMSA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgcmV0dXJuIGFsbChzZWxlY3Rvcik7XG4gICAgfTtcbiAgICB2YXIgYW5jZXN0b3JzJDEgPSBmdW5jdGlvbiAoc2NvcGUsIHNlbGVjdG9yLCBpc1Jvb3QpIHtcbiAgICAgIHJldHVybiBhbmNlc3RvcnMoc2NvcGUsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJldHVybiBpcyhlLCBzZWxlY3Rvcik7XG4gICAgICB9LCBpc1Jvb3QpO1xuICAgIH07XG4gICAgdmFyIHNpYmxpbmdzJDIgPSBmdW5jdGlvbiAoc2NvcGUsIHNlbGVjdG9yKSB7XG4gICAgICByZXR1cm4gc2libGluZ3MkMShzY29wZSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgcmV0dXJuIGlzKGUsIHNlbGVjdG9yKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgYXR0ciA9ICdkYXRhLWVwaG94LW1vYmlsZS1mdWxsc2NyZWVuLXN0eWxlJztcbiAgICB2YXIgc2libGluZ1N0eWxlcyA9ICdkaXNwbGF5Om5vbmUhaW1wb3J0YW50Oyc7XG4gICAgdmFyIGFuY2VzdG9yUG9zaXRpb24gPSAncG9zaXRpb246YWJzb2x1dGUhaW1wb3J0YW50Oyc7XG4gICAgdmFyIGFuY2VzdG9yU3R5bGVzID0gJ3RvcDowIWltcG9ydGFudDtsZWZ0OjAhaW1wb3J0YW50O21hcmdpbjowIWltcG9ydGFudDtwYWRkaW5nOjAhaW1wb3J0YW50O3dpZHRoOjEwMCUhaW1wb3J0YW50O2hlaWdodDoxMDAlIWltcG9ydGFudDtvdmVyZmxvdzp2aXNpYmxlIWltcG9ydGFudDsnO1xuICAgIHZhciBiZ0ZhbGxiYWNrID0gJ2JhY2tncm91bmQtY29sb3I6cmdiKDI1NSwyNTUsMjU1KSFpbXBvcnRhbnQ7JztcbiAgICB2YXIgaXNBbmRyb2lkID0gZ2xvYmFsJDIub3MuaXNBbmRyb2lkKCk7XG4gICAgdmFyIG1hdGNoQ29sb3IgPSBmdW5jdGlvbiAoZWRpdG9yQm9keSkge1xuICAgICAgdmFyIGNvbG9yID0gZ2V0JDIoZWRpdG9yQm9keSwgJ2JhY2tncm91bmQtY29sb3InKTtcbiAgICAgIHJldHVybiBjb2xvciAhPT0gdW5kZWZpbmVkICYmIGNvbG9yICE9PSAnJyA/ICdiYWNrZ3JvdW5kLWNvbG9yOicgKyBjb2xvciArICchaW1wb3J0YW50JyA6IGJnRmFsbGJhY2s7XG4gICAgfTtcbiAgICB2YXIgY2xvYmJlclN0eWxlcyA9IGZ1bmN0aW9uIChkb20sIGNvbnRhaW5lciwgZWRpdG9yQm9keSkge1xuICAgICAgdmFyIGdhdGhlclNpYmlsaW5ncyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBzaWJsaW5ncyQyKGVsZW1lbnQsICcqOm5vdCgudG94LXNpbHZlci1zaW5rKScpO1xuICAgICAgfTtcbiAgICAgIHZhciBjbG9iYmVyID0gZnVuY3Rpb24gKGNsb2JiZXJTdHlsZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICB2YXIgc3R5bGVzID0gZ2V0JDEoZWxlbWVudCwgJ3N0eWxlJyk7XG4gICAgICAgICAgdmFyIGJhY2t1cCA9IHN0eWxlcyA9PT0gdW5kZWZpbmVkID8gJ25vLXN0eWxlcycgOiBzdHlsZXMudHJpbSgpO1xuICAgICAgICAgIGlmIChiYWNrdXAgPT09IGNsb2JiZXJTdHlsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXQoZWxlbWVudCwgYXR0ciwgYmFja3VwKTtcbiAgICAgICAgICAgIHNldEFsbChlbGVtZW50LCBkb20ucGFyc2VTdHlsZShjbG9iYmVyU3R5bGUpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgICAgdmFyIGFuY2VzdG9ycyA9IGFuY2VzdG9ycyQxKGNvbnRhaW5lciwgJyonKTtcbiAgICAgIHZhciBzaWJsaW5ncyA9IGJpbmQoYW5jZXN0b3JzLCBnYXRoZXJTaWJpbGluZ3MpO1xuICAgICAgdmFyIGJnQ29sb3IgPSBtYXRjaENvbG9yKGVkaXRvckJvZHkpO1xuICAgICAgZWFjaChzaWJsaW5ncywgY2xvYmJlcihzaWJsaW5nU3R5bGVzKSk7XG4gICAgICBlYWNoKGFuY2VzdG9ycywgY2xvYmJlcihhbmNlc3RvclBvc2l0aW9uICsgYW5jZXN0b3JTdHlsZXMgKyBiZ0NvbG9yKSk7XG4gICAgICB2YXIgY29udGFpbmVyU3R5bGVzID0gaXNBbmRyb2lkID09PSB0cnVlID8gJycgOiBhbmNlc3RvclBvc2l0aW9uO1xuICAgICAgY2xvYmJlcihjb250YWluZXJTdHlsZXMgKyBhbmNlc3RvclN0eWxlcyArIGJnQ29sb3IpKGNvbnRhaW5lcik7XG4gICAgfTtcbiAgICB2YXIgcmVzdG9yZVN0eWxlcyA9IGZ1bmN0aW9uIChkb20pIHtcbiAgICAgIHZhciBjbG9iYmVyZWRFbHMgPSBhbGwkMSgnWycgKyBhdHRyICsgJ10nKTtcbiAgICAgIGVhY2goY2xvYmJlcmVkRWxzLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICB2YXIgcmVzdG9yZSA9IGdldCQxKGVsZW1lbnQsIGF0dHIpO1xuICAgICAgICBpZiAocmVzdG9yZSAhPT0gJ25vLXN0eWxlcycpIHtcbiAgICAgICAgICBzZXRBbGwoZWxlbWVudCwgZG9tLnBhcnNlU3R5bGUocmVzdG9yZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlbW92ZShlbGVtZW50LCAnc3R5bGUnKTtcbiAgICAgICAgfVxuICAgICAgICByZW1vdmUoZWxlbWVudCwgYXR0cik7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIERPTSA9IGdsb2JhbCQxLkRPTTtcbiAgICB2YXIgZ2V0U2Nyb2xsUG9zID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHZwID0gZ2V0Qm91bmRzKGRvbUdsb2JhbHMud2luZG93KTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6IHZwLngsXG4gICAgICAgIHk6IHZwLnlcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgc2V0U2Nyb2xsUG9zID0gZnVuY3Rpb24gKHBvcykge1xuICAgICAgZG9tR2xvYmFscy53aW5kb3cuc2Nyb2xsVG8ocG9zLngsIHBvcy55KTtcbiAgICB9O1xuICAgIHZhciB2aWV3cG9ydFVwZGF0ZSA9IGdldCQ0KCkuZm9sZChmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBiaW5kOiBub29wLFxuICAgICAgICB1bmJpbmQ6IG5vb3BcbiAgICAgIH07XG4gICAgfSwgZnVuY3Rpb24gKHZpc3VhbFZpZXdwb3J0KSB7XG4gICAgICB2YXIgZWRpdG9yQ29udGFpbmVyID0gdmFsdWUoKTtcbiAgICAgIHZhciByZXNpemVCaW5kZXIgPSB1bmJpbmRhYmxlKCk7XG4gICAgICB2YXIgc2Nyb2xsQmluZGVyID0gdW5iaW5kYWJsZSgpO1xuICAgICAgdmFyIHJlZnJlc2hTY3JvbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvbUdsb2JhbHMuZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwO1xuICAgICAgICBkb21HbG9iYWxzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICAgICAgfTtcbiAgICAgIHZhciByZWZyZXNoVmlzdWFsVmlld3BvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvbUdsb2JhbHMud2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZWRpdG9yQ29udGFpbmVyLm9uKGZ1bmN0aW9uIChjb250YWluZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBzZXRBbGwoY29udGFpbmVyLCB7XG4gICAgICAgICAgICAgIHRvcDogdmlzdWFsVmlld3BvcnQub2Zmc2V0VG9wICsgJ3B4JyxcbiAgICAgICAgICAgICAgbGVmdDogdmlzdWFsVmlld3BvcnQub2Zmc2V0TGVmdCArICdweCcsXG4gICAgICAgICAgICAgIGhlaWdodDogdmlzdWFsVmlld3BvcnQuaGVpZ2h0ICsgJ3B4JyxcbiAgICAgICAgICAgICAgd2lkdGg6IHZpc3VhbFZpZXdwb3J0LndpZHRoICsgJ3B4J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIHZhciB1cGRhdGUgPSBnbG9iYWwkMy50aHJvdHRsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlZnJlc2hTY3JvbGwoKTtcbiAgICAgICAgcmVmcmVzaFZpc3VhbFZpZXdwb3J0KCk7XG4gICAgICB9LCA1MCk7XG4gICAgICB2YXIgYmluZCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIGVkaXRvckNvbnRhaW5lci5zZXQoZWxlbWVudCk7XG4gICAgICAgIHVwZGF0ZSgpO1xuICAgICAgICByZXNpemVCaW5kZXIuc2V0KGJpbmQkMSgncmVzaXplJywgdXBkYXRlKSk7XG4gICAgICAgIHNjcm9sbEJpbmRlci5zZXQoYmluZCQxKCdzY3JvbGwnLCB1cGRhdGUpKTtcbiAgICAgIH07XG4gICAgICB2YXIgdW5iaW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBlZGl0b3JDb250YWluZXIub24oZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJlc2l6ZUJpbmRlci5jbGVhcigpO1xuICAgICAgICAgIHNjcm9sbEJpbmRlci5jbGVhcigpO1xuICAgICAgICB9KTtcbiAgICAgICAgZWRpdG9yQ29udGFpbmVyLmNsZWFyKCk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYmluZDogYmluZCxcbiAgICAgICAgdW5iaW5kOiB1bmJpbmRcbiAgICAgIH07XG4gICAgfSk7XG4gICAgdmFyIHRvZ2dsZUZ1bGxzY3JlZW4gPSBmdW5jdGlvbiAoZWRpdG9yLCBmdWxsc2NyZWVuU3RhdGUpIHtcbiAgICAgIHZhciBib2R5ID0gZG9tR2xvYmFscy5kb2N1bWVudC5ib2R5O1xuICAgICAgdmFyIGRvY3VtZW50RWxlbWVudCA9IGRvbUdsb2JhbHMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgdmFyIGVkaXRvckNvbnRhaW5lciA9IGVkaXRvci5nZXRDb250YWluZXIoKTtcbiAgICAgIHZhciBlZGl0b3JDb250YWluZXJTID0gRWxlbWVudC5mcm9tRG9tKGVkaXRvckNvbnRhaW5lcik7XG4gICAgICB2YXIgZnVsbHNjcmVlbkluZm8gPSBmdWxsc2NyZWVuU3RhdGUuZ2V0KCk7XG4gICAgICB2YXIgZWRpdG9yQm9keSA9IEVsZW1lbnQuZnJvbURvbShlZGl0b3IuZ2V0Qm9keSgpKTtcbiAgICAgIHZhciBpc1RvdWNoID0gZ2xvYmFsJDIuZGV2aWNlVHlwZS5pc1RvdWNoKCk7XG4gICAgICB2YXIgZWRpdG9yQ29udGFpbmVyU3R5bGUgPSBlZGl0b3JDb250YWluZXIuc3R5bGU7XG4gICAgICB2YXIgaWZyYW1lID0gZWRpdG9yLmlmcmFtZUVsZW1lbnQ7XG4gICAgICB2YXIgaWZyYW1lU3R5bGUgPSBpZnJhbWUuc3R5bGU7XG4gICAgICB2YXIgY2xlYW51cCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGlzVG91Y2gpIHtcbiAgICAgICAgICByZXN0b3JlU3R5bGVzKGVkaXRvci5kb20pO1xuICAgICAgICB9XG4gICAgICAgIERPTS5yZW1vdmVDbGFzcyhib2R5LCAndG94LWZ1bGxzY3JlZW4nKTtcbiAgICAgICAgRE9NLnJlbW92ZUNsYXNzKGRvY3VtZW50RWxlbWVudCwgJ3RveC1mdWxsc2NyZWVuJyk7XG4gICAgICAgIERPTS5yZW1vdmVDbGFzcyhlZGl0b3JDb250YWluZXIsICd0b3gtZnVsbHNjcmVlbicpO1xuICAgICAgICB2aWV3cG9ydFVwZGF0ZS51bmJpbmQoKTtcbiAgICAgIH07XG4gICAgICBpZiAoIWZ1bGxzY3JlZW5JbmZvKSB7XG4gICAgICAgIHZhciBuZXdGdWxsU2NyZWVuSW5mbyA9IHtcbiAgICAgICAgICBzY3JvbGxQb3M6IGdldFNjcm9sbFBvcygpLFxuICAgICAgICAgIGNvbnRhaW5lcldpZHRoOiBlZGl0b3JDb250YWluZXJTdHlsZS53aWR0aCxcbiAgICAgICAgICBjb250YWluZXJIZWlnaHQ6IGVkaXRvckNvbnRhaW5lclN0eWxlLmhlaWdodCxcbiAgICAgICAgICBjb250YWluZXJUb3A6IGVkaXRvckNvbnRhaW5lclN0eWxlLnRvcCxcbiAgICAgICAgICBjb250YWluZXJMZWZ0OiBlZGl0b3JDb250YWluZXJTdHlsZS5sZWZ0LFxuICAgICAgICAgIGlmcmFtZVdpZHRoOiBpZnJhbWVTdHlsZS53aWR0aCxcbiAgICAgICAgICBpZnJhbWVIZWlnaHQ6IGlmcmFtZVN0eWxlLmhlaWdodFxuICAgICAgICB9O1xuICAgICAgICBpZiAoaXNUb3VjaCkge1xuICAgICAgICAgIGNsb2JiZXJTdHlsZXMoZWRpdG9yLmRvbSwgZWRpdG9yQ29udGFpbmVyUywgZWRpdG9yQm9keSk7XG4gICAgICAgIH1cbiAgICAgICAgaWZyYW1lU3R5bGUud2lkdGggPSBpZnJhbWVTdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICAgIGVkaXRvckNvbnRhaW5lclN0eWxlLndpZHRoID0gZWRpdG9yQ29udGFpbmVyU3R5bGUuaGVpZ2h0ID0gJyc7XG4gICAgICAgIERPTS5hZGRDbGFzcyhib2R5LCAndG94LWZ1bGxzY3JlZW4nKTtcbiAgICAgICAgRE9NLmFkZENsYXNzKGRvY3VtZW50RWxlbWVudCwgJ3RveC1mdWxsc2NyZWVuJyk7XG4gICAgICAgIERPTS5hZGRDbGFzcyhlZGl0b3JDb250YWluZXIsICd0b3gtZnVsbHNjcmVlbicpO1xuICAgICAgICB2aWV3cG9ydFVwZGF0ZS5iaW5kKGVkaXRvckNvbnRhaW5lclMpO1xuICAgICAgICBlZGl0b3Iub24oJ3JlbW92ZScsIGNsZWFudXApO1xuICAgICAgICBmdWxsc2NyZWVuU3RhdGUuc2V0KG5ld0Z1bGxTY3JlZW5JbmZvKTtcbiAgICAgICAgZmlyZUZ1bGxzY3JlZW5TdGF0ZUNoYW5nZWQoZWRpdG9yLCB0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmcmFtZVN0eWxlLndpZHRoID0gZnVsbHNjcmVlbkluZm8uaWZyYW1lV2lkdGg7XG4gICAgICAgIGlmcmFtZVN0eWxlLmhlaWdodCA9IGZ1bGxzY3JlZW5JbmZvLmlmcmFtZUhlaWdodDtcbiAgICAgICAgZWRpdG9yQ29udGFpbmVyU3R5bGUud2lkdGggPSBmdWxsc2NyZWVuSW5mby5jb250YWluZXJXaWR0aDtcbiAgICAgICAgZWRpdG9yQ29udGFpbmVyU3R5bGUuaGVpZ2h0ID0gZnVsbHNjcmVlbkluZm8uY29udGFpbmVySGVpZ2h0O1xuICAgICAgICBlZGl0b3JDb250YWluZXJTdHlsZS50b3AgPSBmdWxsc2NyZWVuSW5mby5jb250YWluZXJUb3A7XG4gICAgICAgIGVkaXRvckNvbnRhaW5lclN0eWxlLmxlZnQgPSBmdWxsc2NyZWVuSW5mby5jb250YWluZXJMZWZ0O1xuICAgICAgICBzZXRTY3JvbGxQb3MoZnVsbHNjcmVlbkluZm8uc2Nyb2xsUG9zKTtcbiAgICAgICAgZnVsbHNjcmVlblN0YXRlLnNldChudWxsKTtcbiAgICAgICAgZmlyZUZ1bGxzY3JlZW5TdGF0ZUNoYW5nZWQoZWRpdG9yLCBmYWxzZSk7XG4gICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgZWRpdG9yLm9mZigncmVtb3ZlJywgY2xlYW51cCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciByZWdpc3RlciA9IGZ1bmN0aW9uIChlZGl0b3IsIGZ1bGxzY3JlZW5TdGF0ZSkge1xuICAgICAgZWRpdG9yLmFkZENvbW1hbmQoJ21jZUZ1bGxTY3JlZW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRvZ2dsZUZ1bGxzY3JlZW4oZWRpdG9yLCBmdWxsc2NyZWVuU3RhdGUpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBtYWtlU2V0dXBIYW5kbGVyID0gZnVuY3Rpb24gKGVkaXRvciwgZnVsbHNjcmVlblN0YXRlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGFwaSkge1xuICAgICAgICBhcGkuc2V0QWN0aXZlKGZ1bGxzY3JlZW5TdGF0ZS5nZXQoKSAhPT0gbnVsbCk7XG4gICAgICAgIHZhciBlZGl0b3JFdmVudENhbGxiYWNrID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICByZXR1cm4gYXBpLnNldEFjdGl2ZShlLnN0YXRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgZWRpdG9yLm9uKCdGdWxsc2NyZWVuU3RhdGVDaGFuZ2VkJywgZWRpdG9yRXZlbnRDYWxsYmFjayk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci5vZmYoJ0Z1bGxzY3JlZW5TdGF0ZUNoYW5nZWQnLCBlZGl0b3JFdmVudENhbGxiYWNrKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgcmVnaXN0ZXIkMSA9IGZ1bmN0aW9uIChlZGl0b3IsIGZ1bGxzY3JlZW5TdGF0ZSkge1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZFRvZ2dsZU1lbnVJdGVtKCdmdWxsc2NyZWVuJywge1xuICAgICAgICB0ZXh0OiAnRnVsbHNjcmVlbicsXG4gICAgICAgIGljb246ICdmdWxsc2NyZWVuJyxcbiAgICAgICAgc2hvcnRjdXQ6ICdNZXRhK1NoaWZ0K0YnLFxuICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBlZGl0b3IuZXhlY0NvbW1hbmQoJ21jZUZ1bGxTY3JlZW4nKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TZXR1cDogbWFrZVNldHVwSGFuZGxlcihlZGl0b3IsIGZ1bGxzY3JlZW5TdGF0ZSlcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZFRvZ2dsZUJ1dHRvbignZnVsbHNjcmVlbicsIHtcbiAgICAgICAgdG9vbHRpcDogJ0Z1bGxzY3JlZW4nLFxuICAgICAgICBpY29uOiAnZnVsbHNjcmVlbicsXG4gICAgICAgIG9uQWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci5leGVjQ29tbWFuZCgnbWNlRnVsbFNjcmVlbicpO1xuICAgICAgICB9LFxuICAgICAgICBvblNldHVwOiBtYWtlU2V0dXBIYW5kbGVyKGVkaXRvciwgZnVsbHNjcmVlblN0YXRlKVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFBsdWdpbiAoKSB7XG4gICAgICBnbG9iYWwuYWRkKCdmdWxsc2NyZWVuJywgZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICB2YXIgZnVsbHNjcmVlblN0YXRlID0gQ2VsbChudWxsKTtcbiAgICAgICAgaWYgKGVkaXRvci5pbmxpbmUpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0KGZ1bGxzY3JlZW5TdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVnaXN0ZXIoZWRpdG9yLCBmdWxsc2NyZWVuU3RhdGUpO1xuICAgICAgICByZWdpc3RlciQxKGVkaXRvciwgZnVsbHNjcmVlblN0YXRlKTtcbiAgICAgICAgZWRpdG9yLmFkZFNob3J0Y3V0KCdNZXRhK1NoaWZ0K0YnLCAnJywgJ21jZUZ1bGxTY3JlZW4nKTtcbiAgICAgICAgcmV0dXJuIGdldChmdWxsc2NyZWVuU3RhdGUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgUGx1Z2luKCk7XG5cbn0od2luZG93KSk7XG4iXSwic291cmNlUm9vdCI6IiJ9