(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~tinymce-plugin-imagetools~tinymce-plugin-imagetools-plugin"],{

/***/ "./node_modules/tinymce/plugins/imagetools/plugin.js":
/*!***********************************************************!*\
  !*** ./node_modules/tinymce/plugins/imagetools/plugin.js ***!
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

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');

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

    function create(width, height) {
      return resize(domGlobals.document.createElement('canvas'), width, height);
    }
    function clone(canvas) {
      var tCanvas = create(canvas.width, canvas.height);
      var ctx = get2dContext(tCanvas);
      ctx.drawImage(canvas, 0, 0);
      return tCanvas;
    }
    function get2dContext(canvas) {
      return canvas.getContext('2d');
    }
    function resize(canvas, width, height) {
      canvas.width = width;
      canvas.height = height;
      return canvas;
    }

    function getWidth(image) {
      return image.naturalWidth || image.width;
    }
    function getHeight(image) {
      return image.naturalHeight || image.height;
    }

    var promise = function () {
      var Promise = function (fn) {
        if (typeof this !== 'object') {
          throw new TypeError('Promises must be constructed via new');
        }
        if (typeof fn !== 'function') {
          throw new TypeError('not a function');
        }
        this._state = null;
        this._value = null;
        this._deferreds = [];
        doResolve(fn, bind(resolve, this), bind(reject, this));
      };
      var asap = Promise.immediateFn || typeof window.setImmediate === 'function' && window.setImmediate || function (fn) {
        domGlobals.setTimeout(fn, 1);
      };
      function bind(fn, thisArg) {
        return function () {
          return fn.apply(thisArg, arguments);
        };
      }
      var isArray = Array.isArray || function (value) {
        return Object.prototype.toString.call(value) === '[object Array]';
      };
      function handle(deferred) {
        var me = this;
        if (this._state === null) {
          this._deferreds.push(deferred);
          return;
        }
        asap(function () {
          var cb = me._state ? deferred.onFulfilled : deferred.onRejected;
          if (cb === null) {
            (me._state ? deferred.resolve : deferred.reject)(me._value);
            return;
          }
          var ret;
          try {
            ret = cb(me._value);
          } catch (e) {
            deferred.reject(e);
            return;
          }
          deferred.resolve(ret);
        });
      }
      function resolve(newValue) {
        try {
          if (newValue === this) {
            throw new TypeError('A promise cannot be resolved with itself.');
          }
          if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
            var then = newValue.then;
            if (typeof then === 'function') {
              doResolve(bind(then, newValue), bind(resolve, this), bind(reject, this));
              return;
            }
          }
          this._state = true;
          this._value = newValue;
          finale.call(this);
        } catch (e) {
          reject.call(this, e);
        }
      }
      function reject(newValue) {
        this._state = false;
        this._value = newValue;
        finale.call(this);
      }
      function finale() {
        for (var _i = 0, _a = this._deferreds; _i < _a.length; _i++) {
          var deferred = _a[_i];
          handle.call(this, deferred);
        }
        this._deferreds = [];
      }
      function Handler(onFulfilled, onRejected, resolve, reject) {
        this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
        this.onRejected = typeof onRejected === 'function' ? onRejected : null;
        this.resolve = resolve;
        this.reject = reject;
      }
      function doResolve(fn, onFulfilled, onRejected) {
        var done = false;
        try {
          fn(function (value) {
            if (done) {
              return;
            }
            done = true;
            onFulfilled(value);
          }, function (reason) {
            if (done) {
              return;
            }
            done = true;
            onRejected(reason);
          });
        } catch (ex) {
          if (done) {
            return;
          }
          done = true;
          onRejected(ex);
        }
      }
      Promise.prototype.catch = function (onRejected) {
        return this.then(null, onRejected);
      };
      Promise.prototype.then = function (onFulfilled, onRejected) {
        var me = this;
        return new Promise(function (resolve, reject) {
          handle.call(me, new Handler(onFulfilled, onRejected, resolve, reject));
        });
      };
      Promise.all = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          values[_i] = arguments[_i];
        }
        var args = Array.prototype.slice.call(values.length === 1 && isArray(values[0]) ? values[0] : values);
        return new Promise(function (resolve, reject) {
          if (args.length === 0) {
            return resolve([]);
          }
          var remaining = args.length;
          function res(i, val) {
            try {
              if (val && (typeof val === 'object' || typeof val === 'function')) {
                var then = val.then;
                if (typeof then === 'function') {
                  then.call(val, function (val) {
                    res(i, val);
                  }, reject);
                  return;
                }
              }
              args[i] = val;
              if (--remaining === 0) {
                resolve(args);
              }
            } catch (ex) {
              reject(ex);
            }
          }
          for (var i = 0; i < args.length; i++) {
            res(i, args[i]);
          }
        });
      };
      Promise.resolve = function (value) {
        if (value && typeof value === 'object' && value.constructor === Promise) {
          return value;
        }
        return new Promise(function (resolve) {
          resolve(value);
        });
      };
      Promise.reject = function (reason) {
        return new Promise(function (resolve, reject) {
          reject(reason);
        });
      };
      Promise.race = function (values) {
        return new Promise(function (resolve, reject) {
          for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            value.then(resolve, reject);
          }
        });
      };
      return Promise;
    };
    var Promise = window.Promise ? window.Promise : promise();

    function imageToBlob(image) {
      var src = image.src;
      if (src.indexOf('data:') === 0) {
        return dataUriToBlob(src);
      }
      return anyUriToBlob(src);
    }
    function blobToImage(blob) {
      return new Promise(function (resolve, reject) {
        var blobUrl = domGlobals.URL.createObjectURL(blob);
        var image = new domGlobals.Image();
        var removeListeners = function () {
          image.removeEventListener('load', loaded);
          image.removeEventListener('error', error);
        };
        function loaded() {
          removeListeners();
          resolve(image);
        }
        function error() {
          removeListeners();
          reject('Unable to load data of type ' + blob.type + ': ' + blobUrl);
        }
        image.addEventListener('load', loaded);
        image.addEventListener('error', error);
        image.src = blobUrl;
        if (image.complete) {
          loaded();
        }
      });
    }
    function anyUriToBlob(url) {
      return new Promise(function (resolve, reject) {
        var xhr = new domGlobals.XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
          if (this.status === 200) {
            resolve(this.response);
          }
        };
        xhr.onerror = function () {
          var _this = this;
          var corsError = function () {
            var obj = new Error('No access to download image');
            obj.code = 18;
            obj.name = 'SecurityError';
            return obj;
          };
          var genericError = function () {
            return new Error('Error ' + _this.status + ' downloading image');
          };
          reject(this.status === 0 ? corsError() : genericError());
        };
        xhr.send();
      });
    }
    function dataUriToBlobSync(uri) {
      var data = uri.split(',');
      var matches = /data:([^;]+)/.exec(data[0]);
      if (!matches) {
        return Option.none();
      }
      var mimetype = matches[1];
      var base64 = data[1];
      var sliceSize = 1024;
      var byteCharacters = domGlobals.atob(base64);
      var bytesLength = byteCharacters.length;
      var slicesCount = Math.ceil(bytesLength / sliceSize);
      var byteArrays = new Array(slicesCount);
      for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);
        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
          bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
      }
      return Option.some(new domGlobals.Blob(byteArrays, { type: mimetype }));
    }
    function dataUriToBlob(uri) {
      return new Promise(function (resolve, reject) {
        dataUriToBlobSync(uri).fold(function () {
          reject('uri is not base64: ' + uri);
        }, resolve);
      });
    }
    function canvasToBlob(canvas, type, quality) {
      type = type || 'image/png';
      if (domGlobals.HTMLCanvasElement.prototype.toBlob) {
        return new Promise(function (resolve, reject) {
          canvas.toBlob(function (blob) {
            if (blob) {
              resolve(blob);
            } else {
              reject();
            }
          }, type, quality);
        });
      } else {
        return dataUriToBlob(canvas.toDataURL(type, quality));
      }
    }
    function canvasToDataURL(canvas, type, quality) {
      type = type || 'image/png';
      return canvas.toDataURL(type, quality);
    }
    function blobToCanvas(blob) {
      return blobToImage(blob).then(function (image) {
        revokeImageUrl(image);
        var canvas = create(getWidth(image), getHeight(image));
        var context = get2dContext(canvas);
        context.drawImage(image, 0, 0);
        return canvas;
      });
    }
    function blobToDataUri(blob) {
      return new Promise(function (resolve) {
        var reader = new domGlobals.FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      });
    }
    function revokeImageUrl(image) {
      domGlobals.URL.revokeObjectURL(image.src);
    }

    var blobToImage$1 = function (blob) {
      return blobToImage(blob);
    };
    var imageToBlob$1 = function (image) {
      return imageToBlob(image);
    };

    function create$1(getCanvas, blob, uri) {
      var initialType = blob.type;
      var getType = constant(initialType);
      function toBlob() {
        return Promise.resolve(blob);
      }
      var toDataURL = constant(uri);
      function toBase64() {
        return uri.split(',')[1];
      }
      function toAdjustedBlob(type, quality) {
        return getCanvas.then(function (canvas) {
          return canvasToBlob(canvas, type, quality);
        });
      }
      function toAdjustedDataURL(type, quality) {
        return getCanvas.then(function (canvas) {
          return canvasToDataURL(canvas, type, quality);
        });
      }
      function toAdjustedBase64(type, quality) {
        return toAdjustedDataURL(type, quality).then(function (dataurl) {
          return dataurl.split(',')[1];
        });
      }
      function toCanvas() {
        return getCanvas.then(clone);
      }
      return {
        getType: getType,
        toBlob: toBlob,
        toDataURL: toDataURL,
        toBase64: toBase64,
        toAdjustedBlob: toAdjustedBlob,
        toAdjustedDataURL: toAdjustedDataURL,
        toAdjustedBase64: toAdjustedBase64,
        toCanvas: toCanvas
      };
    }
    function fromBlob(blob) {
      return blobToDataUri(blob).then(function (uri) {
        return create$1(blobToCanvas(blob), blob, uri);
      });
    }
    function fromCanvas(canvas, type) {
      return canvasToBlob(canvas, type).then(function (blob) {
        return create$1(Promise.resolve(canvas), blob, canvas.toDataURL());
      });
    }

    function rotate(ir, angle) {
      return ir.toCanvas().then(function (canvas) {
        return applyRotate(canvas, ir.getType(), angle);
      });
    }
    function applyRotate(image, type, angle) {
      var canvas = create(image.width, image.height);
      var context = get2dContext(canvas);
      var translateX = 0;
      var translateY = 0;
      angle = angle < 0 ? 360 + angle : angle;
      if (angle === 90 || angle === 270) {
        resize(canvas, canvas.height, canvas.width);
      }
      if (angle === 90 || angle === 180) {
        translateX = canvas.width;
      }
      if (angle === 270 || angle === 180) {
        translateY = canvas.height;
      }
      context.translate(translateX, translateY);
      context.rotate(angle * Math.PI / 180);
      context.drawImage(image, 0, 0);
      return fromCanvas(canvas, type);
    }
    function flip(ir, axis) {
      return ir.toCanvas().then(function (canvas) {
        return applyFlip(canvas, ir.getType(), axis);
      });
    }
    function applyFlip(image, type, axis) {
      var canvas = create(image.width, image.height);
      var context = get2dContext(canvas);
      if (axis === 'v') {
        context.scale(1, -1);
        context.drawImage(image, 0, -canvas.height);
      } else {
        context.scale(-1, 1);
        context.drawImage(image, -canvas.width, 0);
      }
      return fromCanvas(canvas, type);
    }

    var isSimpleType = function (type) {
      return function (value) {
        return typeof value === type;
      };
    };
    var isFunction = isSimpleType('function');

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

    var flip$1 = function (ir, axis) {
      return flip(ir, axis);
    };
    var rotate$1 = function (ir, angle) {
      return rotate(ir, angle);
    };

    var blobToImageResult = function (blob) {
      return fromBlob(blob);
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

    var ELEMENT = 1;

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

    var Global = typeof domGlobals.window !== 'undefined' ? domGlobals.window : Function('return this;')();

    var supported = isFunction(domGlobals.Element.prototype.attachShadow) && isFunction(domGlobals.Node.prototype.getRootNode);

    var child = function (scope, predicate) {
      var pred = function (node) {
        return predicate(Element.fromDom(node));
      };
      var result = find(scope.dom().childNodes, pred);
      return result.map(Element.fromDom);
    };

    var child$1 = function (scope, selector) {
      return child(scope, function (e) {
        return is(e, selector);
      });
    };

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.Delay');

    var global$3 = tinymce.util.Tools.resolve('tinymce.util.Promise');

    var global$4 = tinymce.util.Tools.resolve('tinymce.util.URI');

    var getToolbarItems = function (editor) {
      return editor.getParam('imagetools_toolbar', 'rotateleft rotateright flipv fliph editimage imageoptions');
    };
    var getProxyUrl = function (editor) {
      return editor.getParam('imagetools_proxy');
    };
    var getCorsHosts = function (editor) {
      return editor.getParam('imagetools_cors_hosts', [], 'string[]');
    };
    var getCredentialsHosts = function (editor) {
      return editor.getParam('imagetools_credentials_hosts', [], 'string[]');
    };
    var getFetchImage = function (editor) {
      return Option.from(editor.getParam('imagetools_fetch_image', null, 'function'));
    };
    var getApiKey = function (editor) {
      return editor.getParam('api_key', editor.getParam('imagetools_api_key', '', 'string'), 'string');
    };
    var getUploadTimeout = function (editor) {
      return editor.getParam('images_upload_timeout', 30000, 'number');
    };
    var shouldReuseFilename = function (editor) {
      return editor.getParam('images_reuse_filename', false, 'boolean');
    };

    function getImageSize(img) {
      var width, height;
      function isPxValue(value) {
        return /^[0-9\.]+px$/.test(value);
      }
      width = img.style.width;
      height = img.style.height;
      if (width || height) {
        if (isPxValue(width) && isPxValue(height)) {
          return {
            w: parseInt(width, 10),
            h: parseInt(height, 10)
          };
        }
        return null;
      }
      width = img.width;
      height = img.height;
      if (width && height) {
        return {
          w: parseInt(width, 10),
          h: parseInt(height, 10)
        };
      }
      return null;
    }
    function setImageSize(img, size) {
      var width, height;
      if (size) {
        width = img.style.width;
        height = img.style.height;
        if (width || height) {
          img.style.width = size.w + 'px';
          img.style.height = size.h + 'px';
          img.removeAttribute('data-mce-style');
        }
        width = img.width;
        height = img.height;
        if (width || height) {
          img.setAttribute('width', size.w);
          img.setAttribute('height', size.h);
        }
      }
    }
    function getNaturalImageSize(img) {
      return {
        w: img.naturalWidth,
        h: img.naturalHeight
      };
    }

    var isValue = function (obj) {
      return obj !== null && obj !== undefined;
    };
    var traverse = function (json, path) {
      var value = path.reduce(function (result, key) {
        return isValue(result) ? result[key] : undefined;
      }, json);
      return isValue(value) ? value : null;
    };
    var requestUrlAsBlob = function (url, headers, withCredentials) {
      return new global$3(function (resolve) {
        var xhr = new domGlobals.XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            resolve({
              status: xhr.status,
              blob: this.response
            });
          }
        };
        xhr.open('GET', url, true);
        xhr.withCredentials = withCredentials;
        global$1.each(headers, function (value, key) {
          xhr.setRequestHeader(key, value);
        });
        xhr.responseType = 'blob';
        xhr.send();
      });
    };
    var readBlob = function (blob) {
      return new global$3(function (resolve) {
        var fr = new domGlobals.FileReader();
        fr.onload = function (e) {
          var data = e.target;
          resolve(data.result);
        };
        fr.readAsText(blob);
      });
    };
    var parseJson = function (text) {
      var json;
      try {
        json = JSON.parse(text);
      } catch (ex) {
      }
      return json;
    };

    var friendlyHttpErrors = [
      {
        code: 404,
        message: 'Could not find Image Proxy'
      },
      {
        code: 403,
        message: 'Rejected request'
      },
      {
        code: 0,
        message: 'Incorrect Image Proxy URL'
      }
    ];
    var friendlyServiceErrors = [
      {
        type: 'key_missing',
        message: 'The request did not include an api key.'
      },
      {
        type: 'key_not_found',
        message: 'The provided api key could not be found.'
      },
      {
        type: 'domain_not_trusted',
        message: 'The api key is not valid for the request origins.'
      }
    ];
    var isServiceErrorCode = function (code) {
      return code === 400 || code === 403 || code === 500;
    };
    var getHttpErrorMsg = function (status) {
      var message = find(friendlyHttpErrors, function (error) {
        return status === error.code;
      }).fold(constant('Unknown ImageProxy error'), function (error) {
        return error.message;
      });
      return 'ImageProxy HTTP error: ' + message;
    };
    var handleHttpError = function (status) {
      var message = getHttpErrorMsg(status);
      return global$3.reject(message);
    };
    var getServiceErrorMsg = function (type) {
      return find(friendlyServiceErrors, function (error) {
        return error.type === type;
      }).fold(constant('Unknown service error'), function (error) {
        return error.message;
      });
    };
    var getServiceError = function (text) {
      var serviceError = parseJson(text);
      var errorType = traverse(serviceError, [
        'error',
        'type'
      ]);
      var errorMsg = errorType ? getServiceErrorMsg(errorType) : 'Invalid JSON in service error message';
      return 'ImageProxy Service error: ' + errorMsg;
    };
    var handleServiceError = function (status, blob) {
      return readBlob(blob).then(function (text) {
        var serviceError = getServiceError(text);
        return global$3.reject(serviceError);
      });
    };
    var handleServiceErrorResponse = function (status, blob) {
      return isServiceErrorCode(status) ? handleServiceError(status, blob) : handleHttpError(status);
    };

    var appendApiKey = function (url, apiKey) {
      var separator = url.indexOf('?') === -1 ? '?' : '&';
      if (/[?&]apiKey=/.test(url) || !apiKey) {
        return url;
      } else {
        return url + separator + 'apiKey=' + encodeURIComponent(apiKey);
      }
    };
    var requestServiceBlob = function (url, apiKey) {
      var headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'tiny-api-key': apiKey
      };
      return requestUrlAsBlob(appendApiKey(url, apiKey), headers, false).then(function (result) {
        return result.status < 200 || result.status >= 300 ? handleServiceErrorResponse(result.status, result.blob) : global$3.resolve(result.blob);
      });
    };
    function requestBlob(url, withCredentials) {
      return requestUrlAsBlob(url, {}, withCredentials).then(function (result) {
        return result.status < 200 || result.status >= 300 ? handleHttpError(result.status) : global$3.resolve(result.blob);
      });
    }
    var getUrl = function (url, apiKey, withCredentials) {
      return apiKey ? requestServiceBlob(url, apiKey) : requestBlob(url, withCredentials);
    };

    var count = 0;
    var getFigureImg = function (elem) {
      return child$1(Element.fromDom(elem), 'img');
    };
    var isFigure = function (editor, elem) {
      return editor.dom.is(elem, 'figure');
    };
    var getEditableImage = function (editor, elem) {
      var isImage = function (imgNode) {
        return editor.dom.is(imgNode, 'img:not([data-mce-object],[data-mce-placeholder])');
      };
      var isEditable = function (imgNode) {
        return isImage(imgNode) && (isLocalImage(editor, imgNode) || isCorsImage(editor, imgNode) || getProxyUrl(editor));
      };
      if (isFigure(editor, elem)) {
        var imgOpt = getFigureImg(elem);
        return imgOpt.map(function (img) {
          return isEditable(img.dom()) ? Option.some(img.dom()) : Option.none();
        });
      }
      return isEditable(elem) ? Option.some(elem) : Option.none();
    };
    var displayError = function (editor, error) {
      editor.notificationManager.open({
        text: error,
        type: 'error'
      });
    };
    var getSelectedImage = function (editor) {
      var elem = editor.selection.getNode();
      if (isFigure(editor, elem)) {
        return getFigureImg(elem);
      } else {
        return Option.some(Element.fromDom(elem));
      }
    };
    var extractFilename = function (editor, url) {
      var m = url.match(/\/([^\/\?]+)?\.(?:jpeg|jpg|png|gif)(?:\?|$)/i);
      if (m) {
        return editor.dom.encode(m[1]);
      }
      return null;
    };
    var createId = function () {
      return 'imagetools' + count++;
    };
    var isLocalImage = function (editor, img) {
      var url = img.src;
      return url.indexOf('data:') === 0 || url.indexOf('blob:') === 0 || new global$4(url).host === editor.documentBaseURI.host;
    };
    var isCorsImage = function (editor, img) {
      return global$1.inArray(getCorsHosts(editor), new global$4(img.src).host) !== -1;
    };
    var isCorsWithCredentialsImage = function (editor, img) {
      return global$1.inArray(getCredentialsHosts(editor), new global$4(img.src).host) !== -1;
    };
    var defaultFetchImage = function (editor, img) {
      var src = img.src, apiKey;
      if (isCorsImage(editor, img)) {
        return getUrl(img.src, null, isCorsWithCredentialsImage(editor, img));
      }
      if (!isLocalImage(editor, img)) {
        src = getProxyUrl(editor);
        src += (src.indexOf('?') === -1 ? '?' : '&') + 'url=' + encodeURIComponent(img.src);
        apiKey = getApiKey(editor);
        return getUrl(src, apiKey, false);
      }
      return imageToBlob$1(img);
    };
    var imageToBlob$2 = function (editor, img) {
      return getFetchImage(editor).fold(function () {
        return defaultFetchImage(editor, img);
      }, function (customFetchImage) {
        return customFetchImage(img);
      });
    };
    var findBlob = function (editor, img) {
      var blobInfo = editor.editorUpload.blobCache.getByUri(img.src);
      if (blobInfo) {
        return global$3.resolve(blobInfo.blob());
      }
      return imageToBlob$2(editor, img);
    };
    var startTimedUpload = function (editor, imageUploadTimerState) {
      var imageUploadTimer = global$2.setEditorTimeout(editor, function () {
        editor.editorUpload.uploadImagesAuto();
      }, getUploadTimeout(editor));
      imageUploadTimerState.set(imageUploadTimer);
    };
    var cancelTimedUpload = function (imageUploadTimerState) {
      global$2.clearTimeout(imageUploadTimerState.get());
    };
    var updateSelectedImage = function (editor, ir, uploadImmediately, imageUploadTimerState, selectedImage, size) {
      return ir.toBlob().then(function (blob) {
        var uri, name, blobInfo;
        var blobCache = editor.editorUpload.blobCache;
        uri = selectedImage.src;
        if (shouldReuseFilename(editor)) {
          blobInfo = blobCache.getByUri(uri);
          if (blobInfo) {
            uri = blobInfo.uri();
            name = blobInfo.name();
          } else {
            name = extractFilename(editor, uri);
          }
        }
        blobInfo = blobCache.create({
          id: createId(),
          blob: blob,
          base64: ir.toBase64(),
          uri: uri,
          name: name
        });
        blobCache.add(blobInfo);
        editor.undoManager.transact(function () {
          function imageLoadedHandler() {
            editor.$(selectedImage).off('load', imageLoadedHandler);
            editor.nodeChanged();
            if (uploadImmediately) {
              editor.editorUpload.uploadImagesAuto();
            } else {
              cancelTimedUpload(imageUploadTimerState);
              startTimedUpload(editor, imageUploadTimerState);
            }
          }
          editor.$(selectedImage).on('load', imageLoadedHandler);
          if (size) {
            editor.$(selectedImage).attr({
              width: size.w,
              height: size.h
            });
          }
          editor.$(selectedImage).attr({ src: blobInfo.blobUri() }).removeAttr('data-mce-src');
        });
        return blobInfo;
      });
    };
    var selectedImageOperation = function (editor, imageUploadTimerState, fn, size) {
      return function () {
        var imgOpt = getSelectedImage(editor);
        return imgOpt.fold(function () {
          displayError(editor, 'Could not find selected image');
        }, function (img) {
          return editor._scanForImages().then(function () {
            return findBlob(editor, img.dom());
          }).then(blobToImageResult).then(fn).then(function (imageResult) {
            return updateSelectedImage(editor, imageResult, false, imageUploadTimerState, img.dom(), size);
          }, function (error) {
            displayError(editor, error);
          });
        });
      };
    };
    var rotate$2 = function (editor, imageUploadTimerState, angle) {
      return function () {
        var imgOpt = getSelectedImage(editor);
        var flippedSize = imgOpt.fold(function () {
          return null;
        }, function (img) {
          var size = getImageSize(img.dom());
          return size ? {
            w: size.h,
            h: size.w
          } : null;
        });
        return selectedImageOperation(editor, imageUploadTimerState, function (imageResult) {
          return rotate$1(imageResult, angle);
        }, flippedSize)();
      };
    };
    var flip$2 = function (editor, imageUploadTimerState, axis) {
      return function () {
        return selectedImageOperation(editor, imageUploadTimerState, function (imageResult) {
          return flip$1(imageResult, axis);
        })();
      };
    };
    var handleDialogBlob = function (editor, imageUploadTimerState, img, originalSize, blob) {
      return blobToImage$1(blob).then(function (newImage) {
        var newSize = getNaturalImageSize(newImage);
        if (originalSize.w !== newSize.w || originalSize.h !== newSize.h) {
          if (getImageSize(img)) {
            setImageSize(img, newSize);
          }
        }
        domGlobals.URL.revokeObjectURL(newImage.src);
        return blob;
      }).then(blobToImageResult).then(function (imageResult) {
        return updateSelectedImage(editor, imageResult, true, imageUploadTimerState, img);
      }, function () {
      });
    };

    var saveState = 'save-state';
    var disable = 'disable';
    var enable = 'enable';

    var createState = function (blob) {
      return {
        blob: blob,
        url: domGlobals.URL.createObjectURL(blob)
      };
    };
    var makeOpen = function (editor, imageUploadTimerState) {
      return function () {
        var getLoadedSpec = function (currentState) {
          return {
            title: 'Edit Image',
            size: 'large',
            body: {
              type: 'panel',
              items: [{
                  type: 'imagetools',
                  name: 'imagetools',
                  label: 'Edit Image',
                  currentState: currentState
                }]
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
                primary: true,
                disabled: true
              }
            ],
            onSubmit: function (api) {
              var blob = api.getData().imagetools.blob;
              originalImgOpt.each(function (originalImg) {
                originalSizeOpt.each(function (originalSize) {
                  handleDialogBlob(editor, imageUploadTimerState, originalImg.dom(), originalSize, blob);
                });
              });
              api.close();
            },
            onCancel: function () {
            },
            onAction: function (api, details) {
              switch (details.name) {
              case saveState:
                if (details.value) {
                  api.enable('save');
                } else {
                  api.disable('save');
                }
                break;
              case disable:
                api.disable('save');
                api.disable('cancel');
                break;
              case enable:
                api.enable('cancel');
                break;
              }
            }
          };
        };
        var originalImgOpt = getSelectedImage(editor);
        var originalSizeOpt = originalImgOpt.map(function (origImg) {
          return getNaturalImageSize(origImg.dom());
        });
        var imgOpt = getSelectedImage(editor);
        imgOpt.each(function (img) {
          getEditableImage(editor, img.dom()).each(function (_) {
            findBlob(editor, img.dom()).then(function (blob) {
              var state = createState(blob);
              editor.windowManager.open(getLoadedSpec(state));
            });
          });
        });
      };
    };

    var register = function (editor, imageUploadTimerState) {
      global$1.each({
        mceImageRotateLeft: rotate$2(editor, imageUploadTimerState, -90),
        mceImageRotateRight: rotate$2(editor, imageUploadTimerState, 90),
        mceImageFlipVertical: flip$2(editor, imageUploadTimerState, 'v'),
        mceImageFlipHorizontal: flip$2(editor, imageUploadTimerState, 'h'),
        mceEditImage: makeOpen(editor, imageUploadTimerState)
      }, function (fn, cmd) {
        editor.addCommand(cmd, fn);
      });
    };

    var setup = function (editor, imageUploadTimerState, lastSelectedImageState) {
      editor.on('NodeChange', function (e) {
        var lastSelectedImage = lastSelectedImageState.get();
        if (lastSelectedImage && lastSelectedImage.src !== e.element.src) {
          cancelTimedUpload(imageUploadTimerState);
          editor.editorUpload.uploadImagesAuto();
          lastSelectedImageState.set(null);
        }
        getEditableImage(editor, e.element).each(lastSelectedImageState.set);
      });
    };

    var register$1 = function (editor) {
      var cmd = function (command) {
        return function () {
          return editor.execCommand(command);
        };
      };
      editor.ui.registry.addButton('rotateleft', {
        tooltip: 'Rotate counterclockwise',
        icon: 'rotate-left',
        onAction: cmd('mceImageRotateLeft')
      });
      editor.ui.registry.addButton('rotateright', {
        tooltip: 'Rotate clockwise',
        icon: 'rotate-right',
        onAction: cmd('mceImageRotateRight')
      });
      editor.ui.registry.addButton('flipv', {
        tooltip: 'Flip vertically',
        icon: 'flip-vertically',
        onAction: cmd('mceImageFlipVertical')
      });
      editor.ui.registry.addButton('fliph', {
        tooltip: 'Flip horizontally',
        icon: 'flip-horizontally',
        onAction: cmd('mceImageFlipHorizontal')
      });
      editor.ui.registry.addButton('editimage', {
        tooltip: 'Edit image',
        icon: 'edit-image',
        onAction: cmd('mceEditImage'),
        onSetup: function (buttonApi) {
          var setDisabled = function () {
            var elementOpt = getSelectedImage(editor);
            elementOpt.each(function (element) {
              var disabled = getEditableImage(editor, element.dom()).isNone();
              buttonApi.setDisabled(disabled);
            });
          };
          editor.on('NodeChange', setDisabled);
          return function () {
            editor.off('NodeChange', setDisabled);
          };
        }
      });
      editor.ui.registry.addButton('imageoptions', {
        tooltip: 'Image options',
        icon: 'image-options',
        onAction: cmd('mceImage')
      });
      editor.ui.registry.addContextMenu('imagetools', {
        update: function (element) {
          return getEditableImage(editor, element).fold(function () {
            return [];
          }, function (_) {
            return [{
                text: 'Edit image',
                icon: 'edit-image',
                onAction: cmd('mceEditImage')
              }];
          });
        }
      });
    };

    var register$2 = function (editor) {
      editor.ui.registry.addContextToolbar('imagetools', {
        items: getToolbarItems(editor),
        predicate: function (elem) {
          return getEditableImage(editor, elem).isSome();
        },
        position: 'node',
        scope: 'node'
      });
    };

    function Plugin () {
      global.add('imagetools', function (editor) {
        var imageUploadTimerState = Cell(0);
        var lastSelectedImageState = Cell(null);
        register(editor, imageUploadTimerState);
        register$1(editor);
        register$2(editor);
        setup(editor, imageUploadTimerState, lastSelectedImageState);
      });
    }

    Plugin();

}(window));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2ltYWdldG9vbHMvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGdCQUFnQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGlCQUFpQjtBQUMxQztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxzQkFBc0I7QUFDbkU7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDBCQUEwQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsY0FBYztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCxpQkFBaUI7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQyxTQUFTO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0dBQXNHOztBQUV0Rzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLHdDQUF3QywwQkFBMEI7QUFDbEUsU0FBUztBQUNUO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsZUFBZTtBQUNmO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsV0FBVztBQUNYO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBLENBQUMiLCJmaWxlIjoidmVuZG9yc350aW55bWNlLXBsdWdpbi1pbWFnZXRvb2xzfnRpbnltY2UtcGx1Z2luLWltYWdldG9vbHMtcGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIFRpbnkgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTEdQTCBvciBhIGNvbW1lcmNpYWwgbGljZW5zZS5cbiAqIEZvciBMR1BMIHNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogRm9yIGNvbW1lcmNpYWwgbGljZW5zZXMgc2VlIGh0dHBzOi8vd3d3LnRpbnkuY2xvdWQvXG4gKlxuICogVmVyc2lvbjogNS40LjIgKDIwMjAtMDgtMTcpXG4gKi9cbihmdW5jdGlvbiAoZG9tR2xvYmFscykge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBDZWxsID0gZnVuY3Rpb24gKGluaXRpYWwpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGluaXRpYWw7XG4gICAgICB2YXIgZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9O1xuICAgICAgdmFyIHNldCA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHZhbHVlID0gdjtcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBnZXQ6IGdldCxcbiAgICAgICAgc2V0OiBzZXRcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciBnbG9iYWwgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5QbHVnaW5NYW5hZ2VyJyk7XG5cbiAgICB2YXIgZ2xvYmFsJDEgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS51dGlsLlRvb2xzJyk7XG5cbiAgICB2YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHtcbiAgICB9O1xuICAgIHZhciBjb25zdGFudCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBuZXZlciA9IGNvbnN0YW50KGZhbHNlKTtcbiAgICB2YXIgYWx3YXlzID0gY29uc3RhbnQodHJ1ZSk7XG5cbiAgICB2YXIgbm9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBOT05FO1xuICAgIH07XG4gICAgdmFyIE5PTkUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgZXEgPSBmdW5jdGlvbiAobykge1xuICAgICAgICByZXR1cm4gby5pc05vbmUoKTtcbiAgICAgIH07XG4gICAgICB2YXIgY2FsbCA9IGZ1bmN0aW9uICh0aHVuaykge1xuICAgICAgICByZXR1cm4gdGh1bmsoKTtcbiAgICAgIH07XG4gICAgICB2YXIgaWQgPSBmdW5jdGlvbiAobikge1xuICAgICAgICByZXR1cm4gbjtcbiAgICAgIH07XG4gICAgICB2YXIgbWUgPSB7XG4gICAgICAgIGZvbGQ6IGZ1bmN0aW9uIChuLCBfcykge1xuICAgICAgICAgIHJldHVybiBuKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzOiBuZXZlcixcbiAgICAgICAgaXNTb21lOiBuZXZlcixcbiAgICAgICAgaXNOb25lOiBhbHdheXMsXG4gICAgICAgIGdldE9yOiBpZCxcbiAgICAgICAgZ2V0T3JUaHVuazogY2FsbCxcbiAgICAgICAgZ2V0T3JEaWU6IGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnIHx8ICdlcnJvcjogZ2V0T3JEaWUgY2FsbGVkIG9uIG5vbmUuJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldE9yTnVsbDogY29uc3RhbnQobnVsbCksXG4gICAgICAgIGdldE9yVW5kZWZpbmVkOiBjb25zdGFudCh1bmRlZmluZWQpLFxuICAgICAgICBvcjogaWQsXG4gICAgICAgIG9yVGh1bms6IGNhbGwsXG4gICAgICAgIG1hcDogbm9uZSxcbiAgICAgICAgZWFjaDogbm9vcCxcbiAgICAgICAgYmluZDogbm9uZSxcbiAgICAgICAgZXhpc3RzOiBuZXZlcixcbiAgICAgICAgZm9yYWxsOiBhbHdheXMsXG4gICAgICAgIGZpbHRlcjogbm9uZSxcbiAgICAgICAgZXF1YWxzOiBlcSxcbiAgICAgICAgZXF1YWxzXzogZXEsXG4gICAgICAgIHRvQXJyYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0sXG4gICAgICAgIHRvU3RyaW5nOiBjb25zdGFudCgnbm9uZSgpJylcbiAgICAgIH07XG4gICAgICByZXR1cm4gbWU7XG4gICAgfSgpO1xuICAgIHZhciBzb21lID0gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHZhciBjb25zdGFudF9hID0gY29uc3RhbnQoYSk7XG4gICAgICB2YXIgc2VsZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG1lO1xuICAgICAgfTtcbiAgICAgIHZhciBiaW5kID0gZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgcmV0dXJuIGYoYSk7XG4gICAgICB9O1xuICAgICAgdmFyIG1lID0ge1xuICAgICAgICBmb2xkOiBmdW5jdGlvbiAobiwgcykge1xuICAgICAgICAgIHJldHVybiBzKGEpO1xuICAgICAgICB9LFxuICAgICAgICBpczogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICByZXR1cm4gYSA9PT0gdjtcbiAgICAgICAgfSxcbiAgICAgICAgaXNTb21lOiBhbHdheXMsXG4gICAgICAgIGlzTm9uZTogbmV2ZXIsXG4gICAgICAgIGdldE9yOiBjb25zdGFudF9hLFxuICAgICAgICBnZXRPclRodW5rOiBjb25zdGFudF9hLFxuICAgICAgICBnZXRPckRpZTogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JOdWxsOiBjb25zdGFudF9hLFxuICAgICAgICBnZXRPclVuZGVmaW5lZDogY29uc3RhbnRfYSxcbiAgICAgICAgb3I6IHNlbGYsXG4gICAgICAgIG9yVGh1bms6IHNlbGYsXG4gICAgICAgIG1hcDogZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICByZXR1cm4gc29tZShmKGEpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZWFjaDogZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICBmKGEpO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kOiBiaW5kLFxuICAgICAgICBleGlzdHM6IGJpbmQsXG4gICAgICAgIGZvcmFsbDogYmluZCxcbiAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiAoZikge1xuICAgICAgICAgIHJldHVybiBmKGEpID8gbWUgOiBOT05FO1xuICAgICAgICB9LFxuICAgICAgICB0b0FycmF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIFthXTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gJ3NvbWUoJyArIGEgKyAnKSc7XG4gICAgICAgIH0sXG4gICAgICAgIGVxdWFsczogZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgICByZXR1cm4gby5pcyhhKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXF1YWxzXzogZnVuY3Rpb24gKG8sIGVsZW1lbnRFcSkge1xuICAgICAgICAgIHJldHVybiBvLmZvbGQobmV2ZXIsIGZ1bmN0aW9uIChiKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudEVxKGEsIGIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIG1lO1xuICAgIH07XG4gICAgdmFyIGZyb20gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gTk9ORSA6IHNvbWUodmFsdWUpO1xuICAgIH07XG4gICAgdmFyIE9wdGlvbiA9IHtcbiAgICAgIHNvbWU6IHNvbWUsXG4gICAgICBub25lOiBub25lLFxuICAgICAgZnJvbTogZnJvbVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjcmVhdGUod2lkdGgsIGhlaWdodCkge1xuICAgICAgcmV0dXJuIHJlc2l6ZShkb21HbG9iYWxzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2xvbmUoY2FudmFzKSB7XG4gICAgICB2YXIgdENhbnZhcyA9IGNyZWF0ZShjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgdmFyIGN0eCA9IGdldDJkQ29udGV4dCh0Q2FudmFzKTtcbiAgICAgIGN0eC5kcmF3SW1hZ2UoY2FudmFzLCAwLCAwKTtcbiAgICAgIHJldHVybiB0Q2FudmFzO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXQyZENvbnRleHQoY2FudmFzKSB7XG4gICAgICByZXR1cm4gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlc2l6ZShjYW52YXMsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgIHJldHVybiBjYW52YXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0V2lkdGgoaW1hZ2UpIHtcbiAgICAgIHJldHVybiBpbWFnZS5uYXR1cmFsV2lkdGggfHwgaW1hZ2Uud2lkdGg7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldEhlaWdodChpbWFnZSkge1xuICAgICAgcmV0dXJuIGltYWdlLm5hdHVyYWxIZWlnaHQgfHwgaW1hZ2UuaGVpZ2h0O1xuICAgIH1cblxuICAgIHZhciBwcm9taXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIFByb21pc2UgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb21pc2VzIG11c3QgYmUgY29uc3RydWN0ZWQgdmlhIG5ldycpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdub3QgYSBmdW5jdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N0YXRlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBudWxsO1xuICAgICAgICB0aGlzLl9kZWZlcnJlZHMgPSBbXTtcbiAgICAgICAgZG9SZXNvbHZlKGZuLCBiaW5kKHJlc29sdmUsIHRoaXMpLCBiaW5kKHJlamVjdCwgdGhpcykpO1xuICAgICAgfTtcbiAgICAgIHZhciBhc2FwID0gUHJvbWlzZS5pbW1lZGlhdGVGbiB8fCB0eXBlb2Ygd2luZG93LnNldEltbWVkaWF0ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB3aW5kb3cuc2V0SW1tZWRpYXRlIHx8IGZ1bmN0aW9uIChmbikge1xuICAgICAgICBkb21HbG9iYWxzLnNldFRpbWVvdXQoZm4sIDEpO1xuICAgICAgfTtcbiAgICAgIGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgICB9O1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGRlZmVycmVkKSB7XG4gICAgICAgIHZhciBtZSA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuX2RlZmVycmVkcy5wdXNoKGRlZmVycmVkKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXNhcChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGNiID0gbWUuX3N0YXRlID8gZGVmZXJyZWQub25GdWxmaWxsZWQgOiBkZWZlcnJlZC5vblJlamVjdGVkO1xuICAgICAgICAgIGlmIChjYiA9PT0gbnVsbCkge1xuICAgICAgICAgICAgKG1lLl9zdGF0ZSA/IGRlZmVycmVkLnJlc29sdmUgOiBkZWZlcnJlZC5yZWplY3QpKG1lLl92YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciByZXQ7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldCA9IGNiKG1lLl92YWx1ZSk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJldCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gcmVzb2x2ZShuZXdWYWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdGhpcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQSBwcm9taXNlIGNhbm5vdCBiZSByZXNvbHZlZCB3aXRoIGl0c2VsZi4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG5ld1ZhbHVlICYmICh0eXBlb2YgbmV3VmFsdWUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBuZXdWYWx1ZSA9PT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgICAgIHZhciB0aGVuID0gbmV3VmFsdWUudGhlbjtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICBkb1Jlc29sdmUoYmluZCh0aGVuLCBuZXdWYWx1ZSksIGJpbmQocmVzb2x2ZSwgdGhpcyksIGJpbmQocmVqZWN0LCB0aGlzKSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fc3RhdGUgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgICAgZmluYWxlLmNhbGwodGhpcyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICByZWplY3QuY2FsbCh0aGlzLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZnVuY3Rpb24gcmVqZWN0KG5ld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIGZpbmFsZS5jYWxsKHRoaXMpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gZmluYWxlKCkge1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5fZGVmZXJyZWRzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgIHZhciBkZWZlcnJlZCA9IF9hW19pXTtcbiAgICAgICAgICBoYW5kbGUuY2FsbCh0aGlzLCBkZWZlcnJlZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZGVmZXJyZWRzID0gW107XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBIYW5kbGVyKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdGhpcy5vbkZ1bGZpbGxlZCA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogbnVsbDtcbiAgICAgICAgdGhpcy5vblJlamVjdGVkID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT09ICdmdW5jdGlvbicgPyBvblJlamVjdGVkIDogbnVsbDtcbiAgICAgICAgdGhpcy5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgdGhpcy5yZWplY3QgPSByZWplY3Q7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBkb1Jlc29sdmUoZm4sIG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgICAgIHZhciBkb25lID0gZmFsc2U7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZm4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICAgIG9uRnVsZmlsbGVkKHZhbHVlKTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICAgIG9uUmVqZWN0ZWQocmVhc29uKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICBvblJlamVjdGVkKGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2ggPSBmdW5jdGlvbiAob25SZWplY3RlZCkge1xuICAgICAgICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0ZWQpO1xuICAgICAgfTtcbiAgICAgIFByb21pc2UucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbiAob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICAgICAgdmFyIG1lID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBoYW5kbGUuY2FsbChtZSwgbmV3IEhhbmRsZXIob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQsIHJlc29sdmUsIHJlamVjdCkpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICBQcm9taXNlLmFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgIHZhbHVlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodmFsdWVzLmxlbmd0aCA9PT0gMSAmJiBpc0FycmF5KHZhbHVlc1swXSkgPyB2YWx1ZXNbMF0gOiB2YWx1ZXMpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoW10pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgcmVtYWluaW5nID0gYXJncy5sZW5ndGg7XG4gICAgICAgICAgZnVuY3Rpb24gcmVzKGksIHZhbCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgaWYgKHZhbCAmJiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhlbiA9IHZhbC50aGVuO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgdGhlbi5jYWxsKHZhbCwgZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICByZXMoaSwgdmFsKTtcbiAgICAgICAgICAgICAgICAgIH0sIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGFyZ3NbaV0gPSB2YWw7XG4gICAgICAgICAgICAgIGlmICgtLXJlbWFpbmluZyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoYXJncyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgIHJlamVjdChleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzKGksIGFyZ3NbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgUHJvbWlzZS5yZXNvbHZlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBQcm9taXNlKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICBQcm9taXNlLnJlamVjdCA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICByZWplY3QocmVhc29uKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgUHJvbWlzZS5yYWNlID0gZnVuY3Rpb24gKHZhbHVlcykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgdmFsdWVzXzEgPSB2YWx1ZXM7IF9pIDwgdmFsdWVzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSB2YWx1ZXNfMVtfaV07XG4gICAgICAgICAgICB2YWx1ZS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICByZXR1cm4gUHJvbWlzZTtcbiAgICB9O1xuICAgIHZhciBQcm9taXNlID0gd2luZG93LlByb21pc2UgPyB3aW5kb3cuUHJvbWlzZSA6IHByb21pc2UoKTtcblxuICAgIGZ1bmN0aW9uIGltYWdlVG9CbG9iKGltYWdlKSB7XG4gICAgICB2YXIgc3JjID0gaW1hZ2Uuc3JjO1xuICAgICAgaWYgKHNyYy5pbmRleE9mKCdkYXRhOicpID09PSAwKSB7XG4gICAgICAgIHJldHVybiBkYXRhVXJpVG9CbG9iKHNyYyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYW55VXJpVG9CbG9iKHNyYyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGJsb2JUb0ltYWdlKGJsb2IpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBibG9iVXJsID0gZG9tR2xvYmFscy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgICB2YXIgaW1hZ2UgPSBuZXcgZG9tR2xvYmFscy5JbWFnZSgpO1xuICAgICAgICB2YXIgcmVtb3ZlTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGltYWdlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBsb2FkZWQpO1xuICAgICAgICAgIGltYWdlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IpO1xuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBsb2FkZWQoKSB7XG4gICAgICAgICAgcmVtb3ZlTGlzdGVuZXJzKCk7XG4gICAgICAgICAgcmVzb2x2ZShpbWFnZSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZXJyb3IoKSB7XG4gICAgICAgICAgcmVtb3ZlTGlzdGVuZXJzKCk7XG4gICAgICAgICAgcmVqZWN0KCdVbmFibGUgdG8gbG9hZCBkYXRhIG9mIHR5cGUgJyArIGJsb2IudHlwZSArICc6ICcgKyBibG9iVXJsKTtcbiAgICAgICAgfVxuICAgICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgbG9hZGVkKTtcbiAgICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XG4gICAgICAgIGltYWdlLnNyYyA9IGJsb2JVcmw7XG4gICAgICAgIGlmIChpbWFnZS5jb21wbGV0ZSkge1xuICAgICAgICAgIGxvYWRlZCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYW55VXJpVG9CbG9iKHVybCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHhociA9IG5ldyBkb21HbG9iYWxzLlhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2Jsb2InO1xuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICByZXNvbHZlKHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICB2YXIgY29yc0Vycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG9iaiA9IG5ldyBFcnJvcignTm8gYWNjZXNzIHRvIGRvd25sb2FkIGltYWdlJyk7XG4gICAgICAgICAgICBvYmouY29kZSA9IDE4O1xuICAgICAgICAgICAgb2JqLm5hbWUgPSAnU2VjdXJpdHlFcnJvcic7XG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgIH07XG4gICAgICAgICAgdmFyIGdlbmVyaWNFcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0Vycm9yICcgKyBfdGhpcy5zdGF0dXMgKyAnIGRvd25sb2FkaW5nIGltYWdlJyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZWplY3QodGhpcy5zdGF0dXMgPT09IDAgPyBjb3JzRXJyb3IoKSA6IGdlbmVyaWNFcnJvcigpKTtcbiAgICAgICAgfTtcbiAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkYXRhVXJpVG9CbG9iU3luYyh1cmkpIHtcbiAgICAgIHZhciBkYXRhID0gdXJpLnNwbGl0KCcsJyk7XG4gICAgICB2YXIgbWF0Y2hlcyA9IC9kYXRhOihbXjtdKykvLmV4ZWMoZGF0YVswXSk7XG4gICAgICBpZiAoIW1hdGNoZXMpIHtcbiAgICAgICAgcmV0dXJuIE9wdGlvbi5ub25lKCk7XG4gICAgICB9XG4gICAgICB2YXIgbWltZXR5cGUgPSBtYXRjaGVzWzFdO1xuICAgICAgdmFyIGJhc2U2NCA9IGRhdGFbMV07XG4gICAgICB2YXIgc2xpY2VTaXplID0gMTAyNDtcbiAgICAgIHZhciBieXRlQ2hhcmFjdGVycyA9IGRvbUdsb2JhbHMuYXRvYihiYXNlNjQpO1xuICAgICAgdmFyIGJ5dGVzTGVuZ3RoID0gYnl0ZUNoYXJhY3RlcnMubGVuZ3RoO1xuICAgICAgdmFyIHNsaWNlc0NvdW50ID0gTWF0aC5jZWlsKGJ5dGVzTGVuZ3RoIC8gc2xpY2VTaXplKTtcbiAgICAgIHZhciBieXRlQXJyYXlzID0gbmV3IEFycmF5KHNsaWNlc0NvdW50KTtcbiAgICAgIGZvciAodmFyIHNsaWNlSW5kZXggPSAwOyBzbGljZUluZGV4IDwgc2xpY2VzQ291bnQ7ICsrc2xpY2VJbmRleCkge1xuICAgICAgICB2YXIgYmVnaW4gPSBzbGljZUluZGV4ICogc2xpY2VTaXplO1xuICAgICAgICB2YXIgZW5kID0gTWF0aC5taW4oYmVnaW4gKyBzbGljZVNpemUsIGJ5dGVzTGVuZ3RoKTtcbiAgICAgICAgdmFyIGJ5dGVzID0gbmV3IEFycmF5KGVuZCAtIGJlZ2luKTtcbiAgICAgICAgZm9yICh2YXIgb2Zmc2V0ID0gYmVnaW4sIGkgPSAwOyBvZmZzZXQgPCBlbmQ7ICsraSwgKytvZmZzZXQpIHtcbiAgICAgICAgICBieXRlc1tpXSA9IGJ5dGVDaGFyYWN0ZXJzW29mZnNldF0uY2hhckNvZGVBdCgwKTtcbiAgICAgICAgfVxuICAgICAgICBieXRlQXJyYXlzW3NsaWNlSW5kZXhdID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZXMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE9wdGlvbi5zb21lKG5ldyBkb21HbG9iYWxzLkJsb2IoYnl0ZUFycmF5cywgeyB0eXBlOiBtaW1ldHlwZSB9KSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRhdGFVcmlUb0Jsb2IodXJpKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBkYXRhVXJpVG9CbG9iU3luYyh1cmkpLmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJlamVjdCgndXJpIGlzIG5vdCBiYXNlNjQ6ICcgKyB1cmkpO1xuICAgICAgICB9LCByZXNvbHZlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjYW52YXNUb0Jsb2IoY2FudmFzLCB0eXBlLCBxdWFsaXR5KSB7XG4gICAgICB0eXBlID0gdHlwZSB8fCAnaW1hZ2UvcG5nJztcbiAgICAgIGlmIChkb21HbG9iYWxzLkhUTUxDYW52YXNFbGVtZW50LnByb3RvdHlwZS50b0Jsb2IpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBjYW52YXMudG9CbG9iKGZ1bmN0aW9uIChibG9iKSB7XG4gICAgICAgICAgICBpZiAoYmxvYikge1xuICAgICAgICAgICAgICByZXNvbHZlKGJsb2IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgdHlwZSwgcXVhbGl0eSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGRhdGFVcmlUb0Jsb2IoY2FudmFzLnRvRGF0YVVSTCh0eXBlLCBxdWFsaXR5KSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNhbnZhc1RvRGF0YVVSTChjYW52YXMsIHR5cGUsIHF1YWxpdHkpIHtcbiAgICAgIHR5cGUgPSB0eXBlIHx8ICdpbWFnZS9wbmcnO1xuICAgICAgcmV0dXJuIGNhbnZhcy50b0RhdGFVUkwodHlwZSwgcXVhbGl0eSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGJsb2JUb0NhbnZhcyhibG9iKSB7XG4gICAgICByZXR1cm4gYmxvYlRvSW1hZ2UoYmxvYikudGhlbihmdW5jdGlvbiAoaW1hZ2UpIHtcbiAgICAgICAgcmV2b2tlSW1hZ2VVcmwoaW1hZ2UpO1xuICAgICAgICB2YXIgY2FudmFzID0gY3JlYXRlKGdldFdpZHRoKGltYWdlKSwgZ2V0SGVpZ2h0KGltYWdlKSk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gZ2V0MmRDb250ZXh0KGNhbnZhcyk7XG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCAwLCAwKTtcbiAgICAgICAgcmV0dXJuIGNhbnZhcztcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBibG9iVG9EYXRhVXJpKGJsb2IpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICB2YXIgcmVhZGVyID0gbmV3IGRvbUdsb2JhbHMuRmlsZVJlYWRlcigpO1xuICAgICAgICByZWFkZXIub25sb2FkZW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJlc29sdmUocmVhZGVyLnJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGJsb2IpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJldm9rZUltYWdlVXJsKGltYWdlKSB7XG4gICAgICBkb21HbG9iYWxzLlVSTC5yZXZva2VPYmplY3RVUkwoaW1hZ2Uuc3JjKTtcbiAgICB9XG5cbiAgICB2YXIgYmxvYlRvSW1hZ2UkMSA9IGZ1bmN0aW9uIChibG9iKSB7XG4gICAgICByZXR1cm4gYmxvYlRvSW1hZ2UoYmxvYik7XG4gICAgfTtcbiAgICB2YXIgaW1hZ2VUb0Jsb2IkMSA9IGZ1bmN0aW9uIChpbWFnZSkge1xuICAgICAgcmV0dXJuIGltYWdlVG9CbG9iKGltYWdlKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlJDEoZ2V0Q2FudmFzLCBibG9iLCB1cmkpIHtcbiAgICAgIHZhciBpbml0aWFsVHlwZSA9IGJsb2IudHlwZTtcbiAgICAgIHZhciBnZXRUeXBlID0gY29uc3RhbnQoaW5pdGlhbFR5cGUpO1xuICAgICAgZnVuY3Rpb24gdG9CbG9iKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGJsb2IpO1xuICAgICAgfVxuICAgICAgdmFyIHRvRGF0YVVSTCA9IGNvbnN0YW50KHVyaSk7XG4gICAgICBmdW5jdGlvbiB0b0Jhc2U2NCgpIHtcbiAgICAgICAgcmV0dXJuIHVyaS5zcGxpdCgnLCcpWzFdO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gdG9BZGp1c3RlZEJsb2IodHlwZSwgcXVhbGl0eSkge1xuICAgICAgICByZXR1cm4gZ2V0Q2FudmFzLnRoZW4oZnVuY3Rpb24gKGNhbnZhcykge1xuICAgICAgICAgIHJldHVybiBjYW52YXNUb0Jsb2IoY2FudmFzLCB0eXBlLCBxdWFsaXR5KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiB0b0FkanVzdGVkRGF0YVVSTCh0eXBlLCBxdWFsaXR5KSB7XG4gICAgICAgIHJldHVybiBnZXRDYW52YXMudGhlbihmdW5jdGlvbiAoY2FudmFzKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbnZhc1RvRGF0YVVSTChjYW52YXMsIHR5cGUsIHF1YWxpdHkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIHRvQWRqdXN0ZWRCYXNlNjQodHlwZSwgcXVhbGl0eSkge1xuICAgICAgICByZXR1cm4gdG9BZGp1c3RlZERhdGFVUkwodHlwZSwgcXVhbGl0eSkudGhlbihmdW5jdGlvbiAoZGF0YXVybCkge1xuICAgICAgICAgIHJldHVybiBkYXRhdXJsLnNwbGl0KCcsJylbMV07XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gdG9DYW52YXMoKSB7XG4gICAgICAgIHJldHVybiBnZXRDYW52YXMudGhlbihjbG9uZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBnZXRUeXBlOiBnZXRUeXBlLFxuICAgICAgICB0b0Jsb2I6IHRvQmxvYixcbiAgICAgICAgdG9EYXRhVVJMOiB0b0RhdGFVUkwsXG4gICAgICAgIHRvQmFzZTY0OiB0b0Jhc2U2NCxcbiAgICAgICAgdG9BZGp1c3RlZEJsb2I6IHRvQWRqdXN0ZWRCbG9iLFxuICAgICAgICB0b0FkanVzdGVkRGF0YVVSTDogdG9BZGp1c3RlZERhdGFVUkwsXG4gICAgICAgIHRvQWRqdXN0ZWRCYXNlNjQ6IHRvQWRqdXN0ZWRCYXNlNjQsXG4gICAgICAgIHRvQ2FudmFzOiB0b0NhbnZhc1xuICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZnJvbUJsb2IoYmxvYikge1xuICAgICAgcmV0dXJuIGJsb2JUb0RhdGFVcmkoYmxvYikudGhlbihmdW5jdGlvbiAodXJpKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGUkMShibG9iVG9DYW52YXMoYmxvYiksIGJsb2IsIHVyaSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZnJvbUNhbnZhcyhjYW52YXMsIHR5cGUpIHtcbiAgICAgIHJldHVybiBjYW52YXNUb0Jsb2IoY2FudmFzLCB0eXBlKS50aGVuKGZ1bmN0aW9uIChibG9iKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGUkMShQcm9taXNlLnJlc29sdmUoY2FudmFzKSwgYmxvYiwgY2FudmFzLnRvRGF0YVVSTCgpKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJvdGF0ZShpciwgYW5nbGUpIHtcbiAgICAgIHJldHVybiBpci50b0NhbnZhcygpLnRoZW4oZnVuY3Rpb24gKGNhbnZhcykge1xuICAgICAgICByZXR1cm4gYXBwbHlSb3RhdGUoY2FudmFzLCBpci5nZXRUeXBlKCksIGFuZ2xlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhcHBseVJvdGF0ZShpbWFnZSwgdHlwZSwgYW5nbGUpIHtcbiAgICAgIHZhciBjYW52YXMgPSBjcmVhdGUoaW1hZ2Uud2lkdGgsIGltYWdlLmhlaWdodCk7XG4gICAgICB2YXIgY29udGV4dCA9IGdldDJkQ29udGV4dChjYW52YXMpO1xuICAgICAgdmFyIHRyYW5zbGF0ZVggPSAwO1xuICAgICAgdmFyIHRyYW5zbGF0ZVkgPSAwO1xuICAgICAgYW5nbGUgPSBhbmdsZSA8IDAgPyAzNjAgKyBhbmdsZSA6IGFuZ2xlO1xuICAgICAgaWYgKGFuZ2xlID09PSA5MCB8fCBhbmdsZSA9PT0gMjcwKSB7XG4gICAgICAgIHJlc2l6ZShjYW52YXMsIGNhbnZhcy5oZWlnaHQsIGNhbnZhcy53aWR0aCk7XG4gICAgICB9XG4gICAgICBpZiAoYW5nbGUgPT09IDkwIHx8IGFuZ2xlID09PSAxODApIHtcbiAgICAgICAgdHJhbnNsYXRlWCA9IGNhbnZhcy53aWR0aDtcbiAgICAgIH1cbiAgICAgIGlmIChhbmdsZSA9PT0gMjcwIHx8IGFuZ2xlID09PSAxODApIHtcbiAgICAgICAgdHJhbnNsYXRlWSA9IGNhbnZhcy5oZWlnaHQ7XG4gICAgICB9XG4gICAgICBjb250ZXh0LnRyYW5zbGF0ZSh0cmFuc2xhdGVYLCB0cmFuc2xhdGVZKTtcbiAgICAgIGNvbnRleHQucm90YXRlKGFuZ2xlICogTWF0aC5QSSAvIDE4MCk7XG4gICAgICBjb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgMCwgMCk7XG4gICAgICByZXR1cm4gZnJvbUNhbnZhcyhjYW52YXMsIHR5cGUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBmbGlwKGlyLCBheGlzKSB7XG4gICAgICByZXR1cm4gaXIudG9DYW52YXMoKS50aGVuKGZ1bmN0aW9uIChjYW52YXMpIHtcbiAgICAgICAgcmV0dXJuIGFwcGx5RmxpcChjYW52YXMsIGlyLmdldFR5cGUoKSwgYXhpcyk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYXBwbHlGbGlwKGltYWdlLCB0eXBlLCBheGlzKSB7XG4gICAgICB2YXIgY2FudmFzID0gY3JlYXRlKGltYWdlLndpZHRoLCBpbWFnZS5oZWlnaHQpO1xuICAgICAgdmFyIGNvbnRleHQgPSBnZXQyZENvbnRleHQoY2FudmFzKTtcbiAgICAgIGlmIChheGlzID09PSAndicpIHtcbiAgICAgICAgY29udGV4dC5zY2FsZSgxLCAtMSk7XG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCAwLCAtY2FudmFzLmhlaWdodCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZXh0LnNjYWxlKC0xLCAxKTtcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIC1jYW52YXMud2lkdGgsIDApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZyb21DYW52YXMoY2FudmFzLCB0eXBlKTtcbiAgICB9XG5cbiAgICB2YXIgaXNTaW1wbGVUeXBlID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gdHlwZTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgaXNGdW5jdGlvbiA9IGlzU2ltcGxlVHlwZSgnZnVuY3Rpb24nKTtcblxuICAgIHZhciBmaW5kVW50aWwgPSBmdW5jdGlvbiAoeHMsIHByZWQsIHVudGlsKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0geHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHggPSB4c1tpXTtcbiAgICAgICAgaWYgKHByZWQoeCwgaSkpIHtcbiAgICAgICAgICByZXR1cm4gT3B0aW9uLnNvbWUoeCk7XG4gICAgICAgIH0gZWxzZSBpZiAodW50aWwoeCwgaSkpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIE9wdGlvbi5ub25lKCk7XG4gICAgfTtcbiAgICB2YXIgZmluZCA9IGZ1bmN0aW9uICh4cywgcHJlZCkge1xuICAgICAgcmV0dXJuIGZpbmRVbnRpbCh4cywgcHJlZCwgbmV2ZXIpO1xuICAgIH07XG5cbiAgICB2YXIgZmxpcCQxID0gZnVuY3Rpb24gKGlyLCBheGlzKSB7XG4gICAgICByZXR1cm4gZmxpcChpciwgYXhpcyk7XG4gICAgfTtcbiAgICB2YXIgcm90YXRlJDEgPSBmdW5jdGlvbiAoaXIsIGFuZ2xlKSB7XG4gICAgICByZXR1cm4gcm90YXRlKGlyLCBhbmdsZSk7XG4gICAgfTtcblxuICAgIHZhciBibG9iVG9JbWFnZVJlc3VsdCA9IGZ1bmN0aW9uIChibG9iKSB7XG4gICAgICByZXR1cm4gZnJvbUJsb2IoYmxvYik7XG4gICAgfTtcblxuICAgIHZhciBmcm9tSHRtbCA9IGZ1bmN0aW9uIChodG1sLCBzY29wZSkge1xuICAgICAgdmFyIGRvYyA9IHNjb3BlIHx8IGRvbUdsb2JhbHMuZG9jdW1lbnQ7XG4gICAgICB2YXIgZGl2ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZGl2LmlubmVySFRNTCA9IGh0bWw7XG4gICAgICBpZiAoIWRpdi5oYXNDaGlsZE5vZGVzKCkgfHwgZGl2LmNoaWxkTm9kZXMubGVuZ3RoID4gMSkge1xuICAgICAgICBkb21HbG9iYWxzLmNvbnNvbGUuZXJyb3IoJ0hUTUwgZG9lcyBub3QgaGF2ZSBhIHNpbmdsZSByb290IG5vZGUnLCBodG1sKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdIVE1MIG11c3QgaGF2ZSBhIHNpbmdsZSByb290IG5vZGUnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmcm9tRG9tKGRpdi5jaGlsZE5vZGVzWzBdKTtcbiAgICB9O1xuICAgIHZhciBmcm9tVGFnID0gZnVuY3Rpb24gKHRhZywgc2NvcGUpIHtcbiAgICAgIHZhciBkb2MgPSBzY29wZSB8fCBkb21HbG9iYWxzLmRvY3VtZW50O1xuICAgICAgdmFyIG5vZGUgPSBkb2MuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgICAgcmV0dXJuIGZyb21Eb20obm9kZSk7XG4gICAgfTtcbiAgICB2YXIgZnJvbVRleHQgPSBmdW5jdGlvbiAodGV4dCwgc2NvcGUpIHtcbiAgICAgIHZhciBkb2MgPSBzY29wZSB8fCBkb21HbG9iYWxzLmRvY3VtZW50O1xuICAgICAgdmFyIG5vZGUgPSBkb2MuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG4gICAgICByZXR1cm4gZnJvbURvbShub2RlKTtcbiAgICB9O1xuICAgIHZhciBmcm9tRG9tID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIGlmIChub2RlID09PSBudWxsIHx8IG5vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vZGUgY2Fubm90IGJlIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4geyBkb206IGNvbnN0YW50KG5vZGUpIH07XG4gICAgfTtcbiAgICB2YXIgZnJvbVBvaW50ID0gZnVuY3Rpb24gKGRvY0VsbSwgeCwgeSkge1xuICAgICAgdmFyIGRvYyA9IGRvY0VsbS5kb20oKTtcbiAgICAgIHJldHVybiBPcHRpb24uZnJvbShkb2MuZWxlbWVudEZyb21Qb2ludCh4LCB5KSkubWFwKGZyb21Eb20pO1xuICAgIH07XG4gICAgdmFyIEVsZW1lbnQgPSB7XG4gICAgICBmcm9tSHRtbDogZnJvbUh0bWwsXG4gICAgICBmcm9tVGFnOiBmcm9tVGFnLFxuICAgICAgZnJvbVRleHQ6IGZyb21UZXh0LFxuICAgICAgZnJvbURvbTogZnJvbURvbSxcbiAgICAgIGZyb21Qb2ludDogZnJvbVBvaW50XG4gICAgfTtcblxuICAgIHZhciBFTEVNRU5UID0gMTtcblxuICAgIHZhciBpcyA9IGZ1bmN0aW9uIChlbGVtZW50LCBzZWxlY3Rvcikge1xuICAgICAgdmFyIGRvbSA9IGVsZW1lbnQuZG9tKCk7XG4gICAgICBpZiAoZG9tLm5vZGVUeXBlICE9PSBFTEVNRU5UKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBlbGVtID0gZG9tO1xuICAgICAgICBpZiAoZWxlbS5tYXRjaGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gZWxlbS5tYXRjaGVzKHNlbGVjdG9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtLm1zTWF0Y2hlc1NlbGVjdG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gZWxlbS5tc01hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBlbGVtLndlYmtpdE1hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbS5tb3pNYXRjaGVzU2VsZWN0b3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBlbGVtLm1vek1hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCcm93c2VyIGxhY2tzIG5hdGl2ZSBzZWxlY3RvcnMnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgR2xvYmFsID0gdHlwZW9mIGRvbUdsb2JhbHMud2luZG93ICE9PSAndW5kZWZpbmVkJyA/IGRvbUdsb2JhbHMud2luZG93IDogRnVuY3Rpb24oJ3JldHVybiB0aGlzOycpKCk7XG5cbiAgICB2YXIgc3VwcG9ydGVkID0gaXNGdW5jdGlvbihkb21HbG9iYWxzLkVsZW1lbnQucHJvdG90eXBlLmF0dGFjaFNoYWRvdykgJiYgaXNGdW5jdGlvbihkb21HbG9iYWxzLk5vZGUucHJvdG90eXBlLmdldFJvb3ROb2RlKTtcblxuICAgIHZhciBjaGlsZCA9IGZ1bmN0aW9uIChzY29wZSwgcHJlZGljYXRlKSB7XG4gICAgICB2YXIgcHJlZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHJldHVybiBwcmVkaWNhdGUoRWxlbWVudC5mcm9tRG9tKG5vZGUpKTtcbiAgICAgIH07XG4gICAgICB2YXIgcmVzdWx0ID0gZmluZChzY29wZS5kb20oKS5jaGlsZE5vZGVzLCBwcmVkKTtcbiAgICAgIHJldHVybiByZXN1bHQubWFwKEVsZW1lbnQuZnJvbURvbSk7XG4gICAgfTtcblxuICAgIHZhciBjaGlsZCQxID0gZnVuY3Rpb24gKHNjb3BlLCBzZWxlY3Rvcikge1xuICAgICAgcmV0dXJuIGNoaWxkKHNjb3BlLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXR1cm4gaXMoZSwgc2VsZWN0b3IpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBnbG9iYWwkMiA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuRGVsYXknKTtcblxuICAgIHZhciBnbG9iYWwkMyA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuUHJvbWlzZScpO1xuXG4gICAgdmFyIGdsb2JhbCQ0ID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UudXRpbC5VUkknKTtcblxuICAgIHZhciBnZXRUb29sYmFySXRlbXMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdpbWFnZXRvb2xzX3Rvb2xiYXInLCAncm90YXRlbGVmdCByb3RhdGVyaWdodCBmbGlwdiBmbGlwaCBlZGl0aW1hZ2UgaW1hZ2VvcHRpb25zJyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0UHJveHlVcmwgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdpbWFnZXRvb2xzX3Byb3h5Jyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0Q29yc0hvc3RzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnaW1hZ2V0b29sc19jb3JzX2hvc3RzJywgW10sICdzdHJpbmdbXScpO1xuICAgIH07XG4gICAgdmFyIGdldENyZWRlbnRpYWxzSG9zdHMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdpbWFnZXRvb2xzX2NyZWRlbnRpYWxzX2hvc3RzJywgW10sICdzdHJpbmdbXScpO1xuICAgIH07XG4gICAgdmFyIGdldEZldGNoSW1hZ2UgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gT3B0aW9uLmZyb20oZWRpdG9yLmdldFBhcmFtKCdpbWFnZXRvb2xzX2ZldGNoX2ltYWdlJywgbnVsbCwgJ2Z1bmN0aW9uJykpO1xuICAgIH07XG4gICAgdmFyIGdldEFwaUtleSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2FwaV9rZXknLCBlZGl0b3IuZ2V0UGFyYW0oJ2ltYWdldG9vbHNfYXBpX2tleScsICcnLCAnc3RyaW5nJyksICdzdHJpbmcnKTtcbiAgICB9O1xuICAgIHZhciBnZXRVcGxvYWRUaW1lb3V0ID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnaW1hZ2VzX3VwbG9hZF90aW1lb3V0JywgMzAwMDAsICdudW1iZXInKTtcbiAgICB9O1xuICAgIHZhciBzaG91bGRSZXVzZUZpbGVuYW1lID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnaW1hZ2VzX3JldXNlX2ZpbGVuYW1lJywgZmFsc2UsICdib29sZWFuJyk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldEltYWdlU2l6ZShpbWcpIHtcbiAgICAgIHZhciB3aWR0aCwgaGVpZ2h0O1xuICAgICAgZnVuY3Rpb24gaXNQeFZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiAvXlswLTlcXC5dK3B4JC8udGVzdCh2YWx1ZSk7XG4gICAgICB9XG4gICAgICB3aWR0aCA9IGltZy5zdHlsZS53aWR0aDtcbiAgICAgIGhlaWdodCA9IGltZy5zdHlsZS5oZWlnaHQ7XG4gICAgICBpZiAod2lkdGggfHwgaGVpZ2h0KSB7XG4gICAgICAgIGlmIChpc1B4VmFsdWUod2lkdGgpICYmIGlzUHhWYWx1ZShoZWlnaHQpKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHc6IHBhcnNlSW50KHdpZHRoLCAxMCksXG4gICAgICAgICAgICBoOiBwYXJzZUludChoZWlnaHQsIDEwKVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICB3aWR0aCA9IGltZy53aWR0aDtcbiAgICAgIGhlaWdodCA9IGltZy5oZWlnaHQ7XG4gICAgICBpZiAod2lkdGggJiYgaGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdzogcGFyc2VJbnQod2lkdGgsIDEwKSxcbiAgICAgICAgICBoOiBwYXJzZUludChoZWlnaHQsIDEwKVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldEltYWdlU2l6ZShpbWcsIHNpemUpIHtcbiAgICAgIHZhciB3aWR0aCwgaGVpZ2h0O1xuICAgICAgaWYgKHNpemUpIHtcbiAgICAgICAgd2lkdGggPSBpbWcuc3R5bGUud2lkdGg7XG4gICAgICAgIGhlaWdodCA9IGltZy5zdHlsZS5oZWlnaHQ7XG4gICAgICAgIGlmICh3aWR0aCB8fCBoZWlnaHQpIHtcbiAgICAgICAgICBpbWcuc3R5bGUud2lkdGggPSBzaXplLncgKyAncHgnO1xuICAgICAgICAgIGltZy5zdHlsZS5oZWlnaHQgPSBzaXplLmggKyAncHgnO1xuICAgICAgICAgIGltZy5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtbWNlLXN0eWxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgd2lkdGggPSBpbWcud2lkdGg7XG4gICAgICAgIGhlaWdodCA9IGltZy5oZWlnaHQ7XG4gICAgICAgIGlmICh3aWR0aCB8fCBoZWlnaHQpIHtcbiAgICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHNpemUudyk7XG4gICAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnaGVpZ2h0Jywgc2l6ZS5oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBnZXROYXR1cmFsSW1hZ2VTaXplKGltZykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdzogaW1nLm5hdHVyYWxXaWR0aCxcbiAgICAgICAgaDogaW1nLm5hdHVyYWxIZWlnaHRcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIGlzVmFsdWUgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICE9PSBudWxsICYmIG9iaiAhPT0gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgdmFyIHRyYXZlcnNlID0gZnVuY3Rpb24gKGpzb24sIHBhdGgpIHtcbiAgICAgIHZhciB2YWx1ZSA9IHBhdGgucmVkdWNlKGZ1bmN0aW9uIChyZXN1bHQsIGtleSkge1xuICAgICAgICByZXR1cm4gaXNWYWx1ZShyZXN1bHQpID8gcmVzdWx0W2tleV0gOiB1bmRlZmluZWQ7XG4gICAgICB9LCBqc29uKTtcbiAgICAgIHJldHVybiBpc1ZhbHVlKHZhbHVlKSA/IHZhbHVlIDogbnVsbDtcbiAgICB9O1xuICAgIHZhciByZXF1ZXN0VXJsQXNCbG9iID0gZnVuY3Rpb24gKHVybCwgaGVhZGVycywgd2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICByZXR1cm4gbmV3IGdsb2JhbCQzKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgIHZhciB4aHIgPSBuZXcgZG9tR2xvYmFscy5YTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgIHN0YXR1czogeGhyLnN0YXR1cyxcbiAgICAgICAgICAgICAgYmxvYjogdGhpcy5yZXNwb25zZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB4aHIub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHdpdGhDcmVkZW50aWFscztcbiAgICAgICAgZ2xvYmFsJDEuZWFjaChoZWFkZXJzLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJztcbiAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHJlYWRCbG9iID0gZnVuY3Rpb24gKGJsb2IpIHtcbiAgICAgIHJldHVybiBuZXcgZ2xvYmFsJDMoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgdmFyIGZyID0gbmV3IGRvbUdsb2JhbHMuRmlsZVJlYWRlcigpO1xuICAgICAgICBmci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHZhciBkYXRhID0gZS50YXJnZXQ7XG4gICAgICAgICAgcmVzb2x2ZShkYXRhLnJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgICAgIGZyLnJlYWRBc1RleHQoYmxvYik7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBwYXJzZUpzb24gPSBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgdmFyIGpzb247XG4gICAgICB0cnkge1xuICAgICAgICBqc29uID0gSlNPTi5wYXJzZSh0ZXh0KTtcbiAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICB9XG4gICAgICByZXR1cm4ganNvbjtcbiAgICB9O1xuXG4gICAgdmFyIGZyaWVuZGx5SHR0cEVycm9ycyA9IFtcbiAgICAgIHtcbiAgICAgICAgY29kZTogNDA0LFxuICAgICAgICBtZXNzYWdlOiAnQ291bGQgbm90IGZpbmQgSW1hZ2UgUHJveHknXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBjb2RlOiA0MDMsXG4gICAgICAgIG1lc3NhZ2U6ICdSZWplY3RlZCByZXF1ZXN0J1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY29kZTogMCxcbiAgICAgICAgbWVzc2FnZTogJ0luY29ycmVjdCBJbWFnZSBQcm94eSBVUkwnXG4gICAgICB9XG4gICAgXTtcbiAgICB2YXIgZnJpZW5kbHlTZXJ2aWNlRXJyb3JzID0gW1xuICAgICAge1xuICAgICAgICB0eXBlOiAna2V5X21pc3NpbmcnLFxuICAgICAgICBtZXNzYWdlOiAnVGhlIHJlcXVlc3QgZGlkIG5vdCBpbmNsdWRlIGFuIGFwaSBrZXkuJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogJ2tleV9ub3RfZm91bmQnLFxuICAgICAgICBtZXNzYWdlOiAnVGhlIHByb3ZpZGVkIGFwaSBrZXkgY291bGQgbm90IGJlIGZvdW5kLidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6ICdkb21haW5fbm90X3RydXN0ZWQnLFxuICAgICAgICBtZXNzYWdlOiAnVGhlIGFwaSBrZXkgaXMgbm90IHZhbGlkIGZvciB0aGUgcmVxdWVzdCBvcmlnaW5zLidcbiAgICAgIH1cbiAgICBdO1xuICAgIHZhciBpc1NlcnZpY2VFcnJvckNvZGUgPSBmdW5jdGlvbiAoY29kZSkge1xuICAgICAgcmV0dXJuIGNvZGUgPT09IDQwMCB8fCBjb2RlID09PSA0MDMgfHwgY29kZSA9PT0gNTAwO1xuICAgIH07XG4gICAgdmFyIGdldEh0dHBFcnJvck1zZyA9IGZ1bmN0aW9uIChzdGF0dXMpIHtcbiAgICAgIHZhciBtZXNzYWdlID0gZmluZChmcmllbmRseUh0dHBFcnJvcnMsIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICByZXR1cm4gc3RhdHVzID09PSBlcnJvci5jb2RlO1xuICAgICAgfSkuZm9sZChjb25zdGFudCgnVW5rbm93biBJbWFnZVByb3h5IGVycm9yJyksIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3IubWVzc2FnZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuICdJbWFnZVByb3h5IEhUVFAgZXJyb3I6ICcgKyBtZXNzYWdlO1xuICAgIH07XG4gICAgdmFyIGhhbmRsZUh0dHBFcnJvciA9IGZ1bmN0aW9uIChzdGF0dXMpIHtcbiAgICAgIHZhciBtZXNzYWdlID0gZ2V0SHR0cEVycm9yTXNnKHN0YXR1cyk7XG4gICAgICByZXR1cm4gZ2xvYmFsJDMucmVqZWN0KG1lc3NhZ2UpO1xuICAgIH07XG4gICAgdmFyIGdldFNlcnZpY2VFcnJvck1zZyA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICByZXR1cm4gZmluZChmcmllbmRseVNlcnZpY2VFcnJvcnMsIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3IudHlwZSA9PT0gdHlwZTtcbiAgICAgIH0pLmZvbGQoY29uc3RhbnQoJ1Vua25vd24gc2VydmljZSBlcnJvcicpLCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yLm1lc3NhZ2U7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBnZXRTZXJ2aWNlRXJyb3IgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgdmFyIHNlcnZpY2VFcnJvciA9IHBhcnNlSnNvbih0ZXh0KTtcbiAgICAgIHZhciBlcnJvclR5cGUgPSB0cmF2ZXJzZShzZXJ2aWNlRXJyb3IsIFtcbiAgICAgICAgJ2Vycm9yJyxcbiAgICAgICAgJ3R5cGUnXG4gICAgICBdKTtcbiAgICAgIHZhciBlcnJvck1zZyA9IGVycm9yVHlwZSA/IGdldFNlcnZpY2VFcnJvck1zZyhlcnJvclR5cGUpIDogJ0ludmFsaWQgSlNPTiBpbiBzZXJ2aWNlIGVycm9yIG1lc3NhZ2UnO1xuICAgICAgcmV0dXJuICdJbWFnZVByb3h5IFNlcnZpY2UgZXJyb3I6ICcgKyBlcnJvck1zZztcbiAgICB9O1xuICAgIHZhciBoYW5kbGVTZXJ2aWNlRXJyb3IgPSBmdW5jdGlvbiAoc3RhdHVzLCBibG9iKSB7XG4gICAgICByZXR1cm4gcmVhZEJsb2IoYmxvYikudGhlbihmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICB2YXIgc2VydmljZUVycm9yID0gZ2V0U2VydmljZUVycm9yKHRleHQpO1xuICAgICAgICByZXR1cm4gZ2xvYmFsJDMucmVqZWN0KHNlcnZpY2VFcnJvcik7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBoYW5kbGVTZXJ2aWNlRXJyb3JSZXNwb25zZSA9IGZ1bmN0aW9uIChzdGF0dXMsIGJsb2IpIHtcbiAgICAgIHJldHVybiBpc1NlcnZpY2VFcnJvckNvZGUoc3RhdHVzKSA/IGhhbmRsZVNlcnZpY2VFcnJvcihzdGF0dXMsIGJsb2IpIDogaGFuZGxlSHR0cEVycm9yKHN0YXR1cyk7XG4gICAgfTtcblxuICAgIHZhciBhcHBlbmRBcGlLZXkgPSBmdW5jdGlvbiAodXJsLCBhcGlLZXkpIHtcbiAgICAgIHZhciBzZXBhcmF0b3IgPSB1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJztcbiAgICAgIGlmICgvWz8mXWFwaUtleT0vLnRlc3QodXJsKSB8fCAhYXBpS2V5KSB7XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdXJsICsgc2VwYXJhdG9yICsgJ2FwaUtleT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGFwaUtleSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgcmVxdWVzdFNlcnZpY2VCbG9iID0gZnVuY3Rpb24gKHVybCwgYXBpS2V5KSB7XG4gICAgICB2YXIgaGVhZGVycyA9IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnLFxuICAgICAgICAndGlueS1hcGkta2V5JzogYXBpS2V5XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHJlcXVlc3RVcmxBc0Jsb2IoYXBwZW5kQXBpS2V5KHVybCwgYXBpS2V5KSwgaGVhZGVycywgZmFsc2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0LnN0YXR1cyA8IDIwMCB8fCByZXN1bHQuc3RhdHVzID49IDMwMCA/IGhhbmRsZVNlcnZpY2VFcnJvclJlc3BvbnNlKHJlc3VsdC5zdGF0dXMsIHJlc3VsdC5ibG9iKSA6IGdsb2JhbCQzLnJlc29sdmUocmVzdWx0LmJsb2IpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXF1ZXN0QmxvYih1cmwsIHdpdGhDcmVkZW50aWFscykge1xuICAgICAgcmV0dXJuIHJlcXVlc3RVcmxBc0Jsb2IodXJsLCB7fSwgd2l0aENyZWRlbnRpYWxzKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5zdGF0dXMgPCAyMDAgfHwgcmVzdWx0LnN0YXR1cyA+PSAzMDAgPyBoYW5kbGVIdHRwRXJyb3IocmVzdWx0LnN0YXR1cykgOiBnbG9iYWwkMy5yZXNvbHZlKHJlc3VsdC5ibG9iKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB2YXIgZ2V0VXJsID0gZnVuY3Rpb24gKHVybCwgYXBpS2V5LCB3aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgIHJldHVybiBhcGlLZXkgPyByZXF1ZXN0U2VydmljZUJsb2IodXJsLCBhcGlLZXkpIDogcmVxdWVzdEJsb2IodXJsLCB3aXRoQ3JlZGVudGlhbHMpO1xuICAgIH07XG5cbiAgICB2YXIgY291bnQgPSAwO1xuICAgIHZhciBnZXRGaWd1cmVJbWcgPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgcmV0dXJuIGNoaWxkJDEoRWxlbWVudC5mcm9tRG9tKGVsZW0pLCAnaW1nJyk7XG4gICAgfTtcbiAgICB2YXIgaXNGaWd1cmUgPSBmdW5jdGlvbiAoZWRpdG9yLCBlbGVtKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmRvbS5pcyhlbGVtLCAnZmlndXJlJyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0RWRpdGFibGVJbWFnZSA9IGZ1bmN0aW9uIChlZGl0b3IsIGVsZW0pIHtcbiAgICAgIHZhciBpc0ltYWdlID0gZnVuY3Rpb24gKGltZ05vZGUpIHtcbiAgICAgICAgcmV0dXJuIGVkaXRvci5kb20uaXMoaW1nTm9kZSwgJ2ltZzpub3QoW2RhdGEtbWNlLW9iamVjdF0sW2RhdGEtbWNlLXBsYWNlaG9sZGVyXSknKTtcbiAgICAgIH07XG4gICAgICB2YXIgaXNFZGl0YWJsZSA9IGZ1bmN0aW9uIChpbWdOb2RlKSB7XG4gICAgICAgIHJldHVybiBpc0ltYWdlKGltZ05vZGUpICYmIChpc0xvY2FsSW1hZ2UoZWRpdG9yLCBpbWdOb2RlKSB8fCBpc0NvcnNJbWFnZShlZGl0b3IsIGltZ05vZGUpIHx8IGdldFByb3h5VXJsKGVkaXRvcikpO1xuICAgICAgfTtcbiAgICAgIGlmIChpc0ZpZ3VyZShlZGl0b3IsIGVsZW0pKSB7XG4gICAgICAgIHZhciBpbWdPcHQgPSBnZXRGaWd1cmVJbWcoZWxlbSk7XG4gICAgICAgIHJldHVybiBpbWdPcHQubWFwKGZ1bmN0aW9uIChpbWcpIHtcbiAgICAgICAgICByZXR1cm4gaXNFZGl0YWJsZShpbWcuZG9tKCkpID8gT3B0aW9uLnNvbWUoaW1nLmRvbSgpKSA6IE9wdGlvbi5ub25lKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGlzRWRpdGFibGUoZWxlbSkgPyBPcHRpb24uc29tZShlbGVtKSA6IE9wdGlvbi5ub25lKCk7XG4gICAgfTtcbiAgICB2YXIgZGlzcGxheUVycm9yID0gZnVuY3Rpb24gKGVkaXRvciwgZXJyb3IpIHtcbiAgICAgIGVkaXRvci5ub3RpZmljYXRpb25NYW5hZ2VyLm9wZW4oe1xuICAgICAgICB0ZXh0OiBlcnJvcixcbiAgICAgICAgdHlwZTogJ2Vycm9yJ1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgZ2V0U2VsZWN0ZWRJbWFnZSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBlbGVtID0gZWRpdG9yLnNlbGVjdGlvbi5nZXROb2RlKCk7XG4gICAgICBpZiAoaXNGaWd1cmUoZWRpdG9yLCBlbGVtKSkge1xuICAgICAgICByZXR1cm4gZ2V0RmlndXJlSW1nKGVsZW0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE9wdGlvbi5zb21lKEVsZW1lbnQuZnJvbURvbShlbGVtKSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgZXh0cmFjdEZpbGVuYW1lID0gZnVuY3Rpb24gKGVkaXRvciwgdXJsKSB7XG4gICAgICB2YXIgbSA9IHVybC5tYXRjaCgvXFwvKFteXFwvXFw/XSspP1xcLig/OmpwZWd8anBnfHBuZ3xnaWYpKD86XFw/fCQpL2kpO1xuICAgICAgaWYgKG0pIHtcbiAgICAgICAgcmV0dXJuIGVkaXRvci5kb20uZW5jb2RlKG1bMV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICB2YXIgY3JlYXRlSWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gJ2ltYWdldG9vbHMnICsgY291bnQrKztcbiAgICB9O1xuICAgIHZhciBpc0xvY2FsSW1hZ2UgPSBmdW5jdGlvbiAoZWRpdG9yLCBpbWcpIHtcbiAgICAgIHZhciB1cmwgPSBpbWcuc3JjO1xuICAgICAgcmV0dXJuIHVybC5pbmRleE9mKCdkYXRhOicpID09PSAwIHx8IHVybC5pbmRleE9mKCdibG9iOicpID09PSAwIHx8IG5ldyBnbG9iYWwkNCh1cmwpLmhvc3QgPT09IGVkaXRvci5kb2N1bWVudEJhc2VVUkkuaG9zdDtcbiAgICB9O1xuICAgIHZhciBpc0NvcnNJbWFnZSA9IGZ1bmN0aW9uIChlZGl0b3IsIGltZykge1xuICAgICAgcmV0dXJuIGdsb2JhbCQxLmluQXJyYXkoZ2V0Q29yc0hvc3RzKGVkaXRvciksIG5ldyBnbG9iYWwkNChpbWcuc3JjKS5ob3N0KSAhPT0gLTE7XG4gICAgfTtcbiAgICB2YXIgaXNDb3JzV2l0aENyZWRlbnRpYWxzSW1hZ2UgPSBmdW5jdGlvbiAoZWRpdG9yLCBpbWcpIHtcbiAgICAgIHJldHVybiBnbG9iYWwkMS5pbkFycmF5KGdldENyZWRlbnRpYWxzSG9zdHMoZWRpdG9yKSwgbmV3IGdsb2JhbCQ0KGltZy5zcmMpLmhvc3QpICE9PSAtMTtcbiAgICB9O1xuICAgIHZhciBkZWZhdWx0RmV0Y2hJbWFnZSA9IGZ1bmN0aW9uIChlZGl0b3IsIGltZykge1xuICAgICAgdmFyIHNyYyA9IGltZy5zcmMsIGFwaUtleTtcbiAgICAgIGlmIChpc0NvcnNJbWFnZShlZGl0b3IsIGltZykpIHtcbiAgICAgICAgcmV0dXJuIGdldFVybChpbWcuc3JjLCBudWxsLCBpc0NvcnNXaXRoQ3JlZGVudGlhbHNJbWFnZShlZGl0b3IsIGltZykpO1xuICAgICAgfVxuICAgICAgaWYgKCFpc0xvY2FsSW1hZ2UoZWRpdG9yLCBpbWcpKSB7XG4gICAgICAgIHNyYyA9IGdldFByb3h5VXJsKGVkaXRvcik7XG4gICAgICAgIHNyYyArPSAoc3JjLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgJ3VybD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGltZy5zcmMpO1xuICAgICAgICBhcGlLZXkgPSBnZXRBcGlLZXkoZWRpdG9yKTtcbiAgICAgICAgcmV0dXJuIGdldFVybChzcmMsIGFwaUtleSwgZmFsc2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGltYWdlVG9CbG9iJDEoaW1nKTtcbiAgICB9O1xuICAgIHZhciBpbWFnZVRvQmxvYiQyID0gZnVuY3Rpb24gKGVkaXRvciwgaW1nKSB7XG4gICAgICByZXR1cm4gZ2V0RmV0Y2hJbWFnZShlZGl0b3IpLmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZGVmYXVsdEZldGNoSW1hZ2UoZWRpdG9yLCBpbWcpO1xuICAgICAgfSwgZnVuY3Rpb24gKGN1c3RvbUZldGNoSW1hZ2UpIHtcbiAgICAgICAgcmV0dXJuIGN1c3RvbUZldGNoSW1hZ2UoaW1nKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGZpbmRCbG9iID0gZnVuY3Rpb24gKGVkaXRvciwgaW1nKSB7XG4gICAgICB2YXIgYmxvYkluZm8gPSBlZGl0b3IuZWRpdG9yVXBsb2FkLmJsb2JDYWNoZS5nZXRCeVVyaShpbWcuc3JjKTtcbiAgICAgIGlmIChibG9iSW5mbykge1xuICAgICAgICByZXR1cm4gZ2xvYmFsJDMucmVzb2x2ZShibG9iSW5mby5ibG9iKCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGltYWdlVG9CbG9iJDIoZWRpdG9yLCBpbWcpO1xuICAgIH07XG4gICAgdmFyIHN0YXJ0VGltZWRVcGxvYWQgPSBmdW5jdGlvbiAoZWRpdG9yLCBpbWFnZVVwbG9hZFRpbWVyU3RhdGUpIHtcbiAgICAgIHZhciBpbWFnZVVwbG9hZFRpbWVyID0gZ2xvYmFsJDIuc2V0RWRpdG9yVGltZW91dChlZGl0b3IsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZWRpdG9yLmVkaXRvclVwbG9hZC51cGxvYWRJbWFnZXNBdXRvKCk7XG4gICAgICB9LCBnZXRVcGxvYWRUaW1lb3V0KGVkaXRvcikpO1xuICAgICAgaW1hZ2VVcGxvYWRUaW1lclN0YXRlLnNldChpbWFnZVVwbG9hZFRpbWVyKTtcbiAgICB9O1xuICAgIHZhciBjYW5jZWxUaW1lZFVwbG9hZCA9IGZ1bmN0aW9uIChpbWFnZVVwbG9hZFRpbWVyU3RhdGUpIHtcbiAgICAgIGdsb2JhbCQyLmNsZWFyVGltZW91dChpbWFnZVVwbG9hZFRpbWVyU3RhdGUuZ2V0KCkpO1xuICAgIH07XG4gICAgdmFyIHVwZGF0ZVNlbGVjdGVkSW1hZ2UgPSBmdW5jdGlvbiAoZWRpdG9yLCBpciwgdXBsb2FkSW1tZWRpYXRlbHksIGltYWdlVXBsb2FkVGltZXJTdGF0ZSwgc2VsZWN0ZWRJbWFnZSwgc2l6ZSkge1xuICAgICAgcmV0dXJuIGlyLnRvQmxvYigpLnRoZW4oZnVuY3Rpb24gKGJsb2IpIHtcbiAgICAgICAgdmFyIHVyaSwgbmFtZSwgYmxvYkluZm87XG4gICAgICAgIHZhciBibG9iQ2FjaGUgPSBlZGl0b3IuZWRpdG9yVXBsb2FkLmJsb2JDYWNoZTtcbiAgICAgICAgdXJpID0gc2VsZWN0ZWRJbWFnZS5zcmM7XG4gICAgICAgIGlmIChzaG91bGRSZXVzZUZpbGVuYW1lKGVkaXRvcikpIHtcbiAgICAgICAgICBibG9iSW5mbyA9IGJsb2JDYWNoZS5nZXRCeVVyaSh1cmkpO1xuICAgICAgICAgIGlmIChibG9iSW5mbykge1xuICAgICAgICAgICAgdXJpID0gYmxvYkluZm8udXJpKCk7XG4gICAgICAgICAgICBuYW1lID0gYmxvYkluZm8ubmFtZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuYW1lID0gZXh0cmFjdEZpbGVuYW1lKGVkaXRvciwgdXJpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYmxvYkluZm8gPSBibG9iQ2FjaGUuY3JlYXRlKHtcbiAgICAgICAgICBpZDogY3JlYXRlSWQoKSxcbiAgICAgICAgICBibG9iOiBibG9iLFxuICAgICAgICAgIGJhc2U2NDogaXIudG9CYXNlNjQoKSxcbiAgICAgICAgICB1cmk6IHVyaSxcbiAgICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgIH0pO1xuICAgICAgICBibG9iQ2FjaGUuYWRkKGJsb2JJbmZvKTtcbiAgICAgICAgZWRpdG9yLnVuZG9NYW5hZ2VyLnRyYW5zYWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBmdW5jdGlvbiBpbWFnZUxvYWRlZEhhbmRsZXIoKSB7XG4gICAgICAgICAgICBlZGl0b3IuJChzZWxlY3RlZEltYWdlKS5vZmYoJ2xvYWQnLCBpbWFnZUxvYWRlZEhhbmRsZXIpO1xuICAgICAgICAgICAgZWRpdG9yLm5vZGVDaGFuZ2VkKCk7XG4gICAgICAgICAgICBpZiAodXBsb2FkSW1tZWRpYXRlbHkpIHtcbiAgICAgICAgICAgICAgZWRpdG9yLmVkaXRvclVwbG9hZC51cGxvYWRJbWFnZXNBdXRvKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjYW5jZWxUaW1lZFVwbG9hZChpbWFnZVVwbG9hZFRpbWVyU3RhdGUpO1xuICAgICAgICAgICAgICBzdGFydFRpbWVkVXBsb2FkKGVkaXRvciwgaW1hZ2VVcGxvYWRUaW1lclN0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWRpdG9yLiQoc2VsZWN0ZWRJbWFnZSkub24oJ2xvYWQnLCBpbWFnZUxvYWRlZEhhbmRsZXIpO1xuICAgICAgICAgIGlmIChzaXplKSB7XG4gICAgICAgICAgICBlZGl0b3IuJChzZWxlY3RlZEltYWdlKS5hdHRyKHtcbiAgICAgICAgICAgICAgd2lkdGg6IHNpemUudyxcbiAgICAgICAgICAgICAgaGVpZ2h0OiBzaXplLmhcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlZGl0b3IuJChzZWxlY3RlZEltYWdlKS5hdHRyKHsgc3JjOiBibG9iSW5mby5ibG9iVXJpKCkgfSkucmVtb3ZlQXR0cignZGF0YS1tY2Utc3JjJyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYmxvYkluZm87XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBzZWxlY3RlZEltYWdlT3BlcmF0aW9uID0gZnVuY3Rpb24gKGVkaXRvciwgaW1hZ2VVcGxvYWRUaW1lclN0YXRlLCBmbiwgc2l6ZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGltZ09wdCA9IGdldFNlbGVjdGVkSW1hZ2UoZWRpdG9yKTtcbiAgICAgICAgcmV0dXJuIGltZ09wdC5mb2xkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkaXNwbGF5RXJyb3IoZWRpdG9yLCAnQ291bGQgbm90IGZpbmQgc2VsZWN0ZWQgaW1hZ2UnKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGltZykge1xuICAgICAgICAgIHJldHVybiBlZGl0b3IuX3NjYW5Gb3JJbWFnZXMoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBmaW5kQmxvYihlZGl0b3IsIGltZy5kb20oKSk7XG4gICAgICAgICAgfSkudGhlbihibG9iVG9JbWFnZVJlc3VsdCkudGhlbihmbikudGhlbihmdW5jdGlvbiAoaW1hZ2VSZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiB1cGRhdGVTZWxlY3RlZEltYWdlKGVkaXRvciwgaW1hZ2VSZXN1bHQsIGZhbHNlLCBpbWFnZVVwbG9hZFRpbWVyU3RhdGUsIGltZy5kb20oKSwgc2l6ZSk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBkaXNwbGF5RXJyb3IoZWRpdG9yLCBlcnJvcik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciByb3RhdGUkMiA9IGZ1bmN0aW9uIChlZGl0b3IsIGltYWdlVXBsb2FkVGltZXJTdGF0ZSwgYW5nbGUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpbWdPcHQgPSBnZXRTZWxlY3RlZEltYWdlKGVkaXRvcik7XG4gICAgICAgIHZhciBmbGlwcGVkU2l6ZSA9IGltZ09wdC5mb2xkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGltZykge1xuICAgICAgICAgIHZhciBzaXplID0gZ2V0SW1hZ2VTaXplKGltZy5kb20oKSk7XG4gICAgICAgICAgcmV0dXJuIHNpemUgPyB7XG4gICAgICAgICAgICB3OiBzaXplLmgsXG4gICAgICAgICAgICBoOiBzaXplLndcbiAgICAgICAgICB9IDogbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzZWxlY3RlZEltYWdlT3BlcmF0aW9uKGVkaXRvciwgaW1hZ2VVcGxvYWRUaW1lclN0YXRlLCBmdW5jdGlvbiAoaW1hZ2VSZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcm90YXRlJDEoaW1hZ2VSZXN1bHQsIGFuZ2xlKTtcbiAgICAgICAgfSwgZmxpcHBlZFNpemUpKCk7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGZsaXAkMiA9IGZ1bmN0aW9uIChlZGl0b3IsIGltYWdlVXBsb2FkVGltZXJTdGF0ZSwgYXhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkSW1hZ2VPcGVyYXRpb24oZWRpdG9yLCBpbWFnZVVwbG9hZFRpbWVyU3RhdGUsIGZ1bmN0aW9uIChpbWFnZVJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiBmbGlwJDEoaW1hZ2VSZXN1bHQsIGF4aXMpO1xuICAgICAgICB9KSgpO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBoYW5kbGVEaWFsb2dCbG9iID0gZnVuY3Rpb24gKGVkaXRvciwgaW1hZ2VVcGxvYWRUaW1lclN0YXRlLCBpbWcsIG9yaWdpbmFsU2l6ZSwgYmxvYikge1xuICAgICAgcmV0dXJuIGJsb2JUb0ltYWdlJDEoYmxvYikudGhlbihmdW5jdGlvbiAobmV3SW1hZ2UpIHtcbiAgICAgICAgdmFyIG5ld1NpemUgPSBnZXROYXR1cmFsSW1hZ2VTaXplKG5ld0ltYWdlKTtcbiAgICAgICAgaWYgKG9yaWdpbmFsU2l6ZS53ICE9PSBuZXdTaXplLncgfHwgb3JpZ2luYWxTaXplLmggIT09IG5ld1NpemUuaCkge1xuICAgICAgICAgIGlmIChnZXRJbWFnZVNpemUoaW1nKSkge1xuICAgICAgICAgICAgc2V0SW1hZ2VTaXplKGltZywgbmV3U2l6ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRvbUdsb2JhbHMuVVJMLnJldm9rZU9iamVjdFVSTChuZXdJbWFnZS5zcmMpO1xuICAgICAgICByZXR1cm4gYmxvYjtcbiAgICAgIH0pLnRoZW4oYmxvYlRvSW1hZ2VSZXN1bHQpLnRoZW4oZnVuY3Rpb24gKGltYWdlUmVzdWx0KSB7XG4gICAgICAgIHJldHVybiB1cGRhdGVTZWxlY3RlZEltYWdlKGVkaXRvciwgaW1hZ2VSZXN1bHQsIHRydWUsIGltYWdlVXBsb2FkVGltZXJTdGF0ZSwgaW1nKTtcbiAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgc2F2ZVN0YXRlID0gJ3NhdmUtc3RhdGUnO1xuICAgIHZhciBkaXNhYmxlID0gJ2Rpc2FibGUnO1xuICAgIHZhciBlbmFibGUgPSAnZW5hYmxlJztcblxuICAgIHZhciBjcmVhdGVTdGF0ZSA9IGZ1bmN0aW9uIChibG9iKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBibG9iOiBibG9iLFxuICAgICAgICB1cmw6IGRvbUdsb2JhbHMuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKVxuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBtYWtlT3BlbiA9IGZ1bmN0aW9uIChlZGl0b3IsIGltYWdlVXBsb2FkVGltZXJTdGF0ZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGdldExvYWRlZFNwZWMgPSBmdW5jdGlvbiAoY3VycmVudFN0YXRlKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRpdGxlOiAnRWRpdCBJbWFnZScsXG4gICAgICAgICAgICBzaXplOiAnbGFyZ2UnLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICB0eXBlOiAncGFuZWwnLFxuICAgICAgICAgICAgICBpdGVtczogW3tcbiAgICAgICAgICAgICAgICAgIHR5cGU6ICdpbWFnZXRvb2xzJyxcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICdpbWFnZXRvb2xzJyxcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiAnRWRpdCBJbWFnZScsXG4gICAgICAgICAgICAgICAgICBjdXJyZW50U3RhdGU6IGN1cnJlbnRTdGF0ZVxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2NhbmNlbCcsXG4gICAgICAgICAgICAgICAgbmFtZTogJ2NhbmNlbCcsXG4gICAgICAgICAgICAgICAgdGV4dDogJ0NhbmNlbCdcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdWJtaXQnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdzYXZlJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiAnU2F2ZScsXG4gICAgICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgb25TdWJtaXQ6IGZ1bmN0aW9uIChhcGkpIHtcbiAgICAgICAgICAgICAgdmFyIGJsb2IgPSBhcGkuZ2V0RGF0YSgpLmltYWdldG9vbHMuYmxvYjtcbiAgICAgICAgICAgICAgb3JpZ2luYWxJbWdPcHQuZWFjaChmdW5jdGlvbiAob3JpZ2luYWxJbWcpIHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbFNpemVPcHQuZWFjaChmdW5jdGlvbiAob3JpZ2luYWxTaXplKSB7XG4gICAgICAgICAgICAgICAgICBoYW5kbGVEaWFsb2dCbG9iKGVkaXRvciwgaW1hZ2VVcGxvYWRUaW1lclN0YXRlLCBvcmlnaW5hbEltZy5kb20oKSwgb3JpZ2luYWxTaXplLCBibG9iKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGFwaS5jbG9zZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQ2FuY2VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uIChhcGksIGRldGFpbHMpIHtcbiAgICAgICAgICAgICAgc3dpdGNoIChkZXRhaWxzLm5hbWUpIHtcbiAgICAgICAgICAgICAgY2FzZSBzYXZlU3RhdGU6XG4gICAgICAgICAgICAgICAgaWYgKGRldGFpbHMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIGFwaS5lbmFibGUoJ3NhdmUnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgYXBpLmRpc2FibGUoJ3NhdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgZGlzYWJsZTpcbiAgICAgICAgICAgICAgICBhcGkuZGlzYWJsZSgnc2F2ZScpO1xuICAgICAgICAgICAgICAgIGFwaS5kaXNhYmxlKCdjYW5jZWwnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSBlbmFibGU6XG4gICAgICAgICAgICAgICAgYXBpLmVuYWJsZSgnY2FuY2VsJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB2YXIgb3JpZ2luYWxJbWdPcHQgPSBnZXRTZWxlY3RlZEltYWdlKGVkaXRvcik7XG4gICAgICAgIHZhciBvcmlnaW5hbFNpemVPcHQgPSBvcmlnaW5hbEltZ09wdC5tYXAoZnVuY3Rpb24gKG9yaWdJbWcpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0TmF0dXJhbEltYWdlU2l6ZShvcmlnSW1nLmRvbSgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBpbWdPcHQgPSBnZXRTZWxlY3RlZEltYWdlKGVkaXRvcik7XG4gICAgICAgIGltZ09wdC5lYWNoKGZ1bmN0aW9uIChpbWcpIHtcbiAgICAgICAgICBnZXRFZGl0YWJsZUltYWdlKGVkaXRvciwgaW1nLmRvbSgpKS5lYWNoKGZ1bmN0aW9uIChfKSB7XG4gICAgICAgICAgICBmaW5kQmxvYihlZGl0b3IsIGltZy5kb20oKSkudGhlbihmdW5jdGlvbiAoYmxvYikge1xuICAgICAgICAgICAgICB2YXIgc3RhdGUgPSBjcmVhdGVTdGF0ZShibG9iKTtcbiAgICAgICAgICAgICAgZWRpdG9yLndpbmRvd01hbmFnZXIub3BlbihnZXRMb2FkZWRTcGVjKHN0YXRlKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgcmVnaXN0ZXIgPSBmdW5jdGlvbiAoZWRpdG9yLCBpbWFnZVVwbG9hZFRpbWVyU3RhdGUpIHtcbiAgICAgIGdsb2JhbCQxLmVhY2goe1xuICAgICAgICBtY2VJbWFnZVJvdGF0ZUxlZnQ6IHJvdGF0ZSQyKGVkaXRvciwgaW1hZ2VVcGxvYWRUaW1lclN0YXRlLCAtOTApLFxuICAgICAgICBtY2VJbWFnZVJvdGF0ZVJpZ2h0OiByb3RhdGUkMihlZGl0b3IsIGltYWdlVXBsb2FkVGltZXJTdGF0ZSwgOTApLFxuICAgICAgICBtY2VJbWFnZUZsaXBWZXJ0aWNhbDogZmxpcCQyKGVkaXRvciwgaW1hZ2VVcGxvYWRUaW1lclN0YXRlLCAndicpLFxuICAgICAgICBtY2VJbWFnZUZsaXBIb3Jpem9udGFsOiBmbGlwJDIoZWRpdG9yLCBpbWFnZVVwbG9hZFRpbWVyU3RhdGUsICdoJyksXG4gICAgICAgIG1jZUVkaXRJbWFnZTogbWFrZU9wZW4oZWRpdG9yLCBpbWFnZVVwbG9hZFRpbWVyU3RhdGUpXG4gICAgICB9LCBmdW5jdGlvbiAoZm4sIGNtZCkge1xuICAgICAgICBlZGl0b3IuYWRkQ29tbWFuZChjbWQsIGZuKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgc2V0dXAgPSBmdW5jdGlvbiAoZWRpdG9yLCBpbWFnZVVwbG9hZFRpbWVyU3RhdGUsIGxhc3RTZWxlY3RlZEltYWdlU3RhdGUpIHtcbiAgICAgIGVkaXRvci5vbignTm9kZUNoYW5nZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBsYXN0U2VsZWN0ZWRJbWFnZSA9IGxhc3RTZWxlY3RlZEltYWdlU3RhdGUuZ2V0KCk7XG4gICAgICAgIGlmIChsYXN0U2VsZWN0ZWRJbWFnZSAmJiBsYXN0U2VsZWN0ZWRJbWFnZS5zcmMgIT09IGUuZWxlbWVudC5zcmMpIHtcbiAgICAgICAgICBjYW5jZWxUaW1lZFVwbG9hZChpbWFnZVVwbG9hZFRpbWVyU3RhdGUpO1xuICAgICAgICAgIGVkaXRvci5lZGl0b3JVcGxvYWQudXBsb2FkSW1hZ2VzQXV0bygpO1xuICAgICAgICAgIGxhc3RTZWxlY3RlZEltYWdlU3RhdGUuc2V0KG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIGdldEVkaXRhYmxlSW1hZ2UoZWRpdG9yLCBlLmVsZW1lbnQpLmVhY2gobGFzdFNlbGVjdGVkSW1hZ2VTdGF0ZS5zZXQpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciByZWdpc3RlciQxID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGNtZCA9IGZ1bmN0aW9uIChjb21tYW5kKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci5leGVjQ29tbWFuZChjb21tYW5kKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQnV0dG9uKCdyb3RhdGVsZWZ0Jywge1xuICAgICAgICB0b29sdGlwOiAnUm90YXRlIGNvdW50ZXJjbG9ja3dpc2UnLFxuICAgICAgICBpY29uOiAncm90YXRlLWxlZnQnLFxuICAgICAgICBvbkFjdGlvbjogY21kKCdtY2VJbWFnZVJvdGF0ZUxlZnQnKVxuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQnV0dG9uKCdyb3RhdGVyaWdodCcsIHtcbiAgICAgICAgdG9vbHRpcDogJ1JvdGF0ZSBjbG9ja3dpc2UnLFxuICAgICAgICBpY29uOiAncm90YXRlLXJpZ2h0JyxcbiAgICAgICAgb25BY3Rpb246IGNtZCgnbWNlSW1hZ2VSb3RhdGVSaWdodCcpXG4gICAgICB9KTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRCdXR0b24oJ2ZsaXB2Jywge1xuICAgICAgICB0b29sdGlwOiAnRmxpcCB2ZXJ0aWNhbGx5JyxcbiAgICAgICAgaWNvbjogJ2ZsaXAtdmVydGljYWxseScsXG4gICAgICAgIG9uQWN0aW9uOiBjbWQoJ21jZUltYWdlRmxpcFZlcnRpY2FsJylcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZEJ1dHRvbignZmxpcGgnLCB7XG4gICAgICAgIHRvb2x0aXA6ICdGbGlwIGhvcml6b250YWxseScsXG4gICAgICAgIGljb246ICdmbGlwLWhvcml6b250YWxseScsXG4gICAgICAgIG9uQWN0aW9uOiBjbWQoJ21jZUltYWdlRmxpcEhvcml6b250YWwnKVxuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQnV0dG9uKCdlZGl0aW1hZ2UnLCB7XG4gICAgICAgIHRvb2x0aXA6ICdFZGl0IGltYWdlJyxcbiAgICAgICAgaWNvbjogJ2VkaXQtaW1hZ2UnLFxuICAgICAgICBvbkFjdGlvbjogY21kKCdtY2VFZGl0SW1hZ2UnKSxcbiAgICAgICAgb25TZXR1cDogZnVuY3Rpb24gKGJ1dHRvbkFwaSkge1xuICAgICAgICAgIHZhciBzZXREaXNhYmxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50T3B0ID0gZ2V0U2VsZWN0ZWRJbWFnZShlZGl0b3IpO1xuICAgICAgICAgICAgZWxlbWVudE9wdC5lYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgIHZhciBkaXNhYmxlZCA9IGdldEVkaXRhYmxlSW1hZ2UoZWRpdG9yLCBlbGVtZW50LmRvbSgpKS5pc05vbmUoKTtcbiAgICAgICAgICAgICAgYnV0dG9uQXBpLnNldERpc2FibGVkKGRpc2FibGVkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG4gICAgICAgICAgZWRpdG9yLm9uKCdOb2RlQ2hhbmdlJywgc2V0RGlzYWJsZWQpO1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBlZGl0b3Iub2ZmKCdOb2RlQ2hhbmdlJywgc2V0RGlzYWJsZWQpO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZEJ1dHRvbignaW1hZ2VvcHRpb25zJywge1xuICAgICAgICB0b29sdGlwOiAnSW1hZ2Ugb3B0aW9ucycsXG4gICAgICAgIGljb246ICdpbWFnZS1vcHRpb25zJyxcbiAgICAgICAgb25BY3Rpb246IGNtZCgnbWNlSW1hZ2UnKVxuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQ29udGV4dE1lbnUoJ2ltYWdldG9vbHMnLCB7XG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0RWRpdGFibGVJbWFnZShlZGl0b3IsIGVsZW1lbnQpLmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uIChfKSB7XG4gICAgICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgICAgICB0ZXh0OiAnRWRpdCBpbWFnZScsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2VkaXQtaW1hZ2UnLFxuICAgICAgICAgICAgICAgIG9uQWN0aW9uOiBjbWQoJ21jZUVkaXRJbWFnZScpXG4gICAgICAgICAgICAgIH1dO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHJlZ2lzdGVyJDIgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQ29udGV4dFRvb2xiYXIoJ2ltYWdldG9vbHMnLCB7XG4gICAgICAgIGl0ZW1zOiBnZXRUb29sYmFySXRlbXMoZWRpdG9yKSxcbiAgICAgICAgcHJlZGljYXRlOiBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICAgIHJldHVybiBnZXRFZGl0YWJsZUltYWdlKGVkaXRvciwgZWxlbSkuaXNTb21lKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHBvc2l0aW9uOiAnbm9kZScsXG4gICAgICAgIHNjb3BlOiAnbm9kZSdcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBQbHVnaW4gKCkge1xuICAgICAgZ2xvYmFsLmFkZCgnaW1hZ2V0b29scycsIGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgICAgdmFyIGltYWdlVXBsb2FkVGltZXJTdGF0ZSA9IENlbGwoMCk7XG4gICAgICAgIHZhciBsYXN0U2VsZWN0ZWRJbWFnZVN0YXRlID0gQ2VsbChudWxsKTtcbiAgICAgICAgcmVnaXN0ZXIoZWRpdG9yLCBpbWFnZVVwbG9hZFRpbWVyU3RhdGUpO1xuICAgICAgICByZWdpc3RlciQxKGVkaXRvcik7XG4gICAgICAgIHJlZ2lzdGVyJDIoZWRpdG9yKTtcbiAgICAgICAgc2V0dXAoZWRpdG9yLCBpbWFnZVVwbG9hZFRpbWVyU3RhdGUsIGxhc3RTZWxlY3RlZEltYWdlU3RhdGUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgUGx1Z2luKCk7XG5cbn0od2luZG93KSk7XG4iXSwic291cmNlUm9vdCI6IiJ9