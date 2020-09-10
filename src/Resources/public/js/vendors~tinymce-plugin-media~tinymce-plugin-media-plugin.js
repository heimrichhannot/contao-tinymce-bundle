(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~tinymce-plugin-media~tinymce-plugin-media-plugin"],{

/***/ "./node_modules/tinymce/plugins/media/plugin.js":
/*!******************************************************!*\
  !*** ./node_modules/tinymce/plugins/media/plugin.js ***!
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
(function () {
    'use strict';

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
    var isString = isType('string');
    var isObject = isType('object');
    var isArray = isType('array');

    var nativePush = Array.prototype.push;
    var each = function (xs, f) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        f(x, i);
      }
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

    var keys = Object.keys;
    var hasOwnProperty = Object.hasOwnProperty;
    var each$1 = function (obj, f) {
      var props = keys(obj);
      for (var k = 0, len = props.length; k < len; k++) {
        var i = props[k];
        var x = obj[i];
        f(x, i);
      }
    };
    var get = function (obj, key) {
      return has(obj, key) ? Option.from(obj[key]) : Option.none();
    };
    var has = function (obj, key) {
      return hasOwnProperty.call(obj, key);
    };

    var getScripts = function (editor) {
      return editor.getParam('media_scripts');
    };
    var getAudioTemplateCallback = function (editor) {
      return editor.getParam('audio_template_callback');
    };
    var getVideoTemplateCallback = function (editor) {
      return editor.getParam('video_template_callback');
    };
    var hasLiveEmbeds = function (editor) {
      return editor.getParam('media_live_embeds', true);
    };
    var shouldFilterHtml = function (editor) {
      return editor.getParam('media_filter_html', true);
    };
    var getUrlResolver = function (editor) {
      return editor.getParam('media_url_resolver');
    };
    var hasAltSource = function (editor) {
      return editor.getParam('media_alt_source', true);
    };
    var hasPoster = function (editor) {
      return editor.getParam('media_poster', true);
    };
    var hasDimensions = function (editor) {
      return editor.getParam('media_dimensions', true);
    };

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var global$2 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

    var global$3 = tinymce.util.Tools.resolve('tinymce.html.SaxParser');

    var getVideoScriptMatch = function (prefixes, src) {
      if (prefixes) {
        for (var i = 0; i < prefixes.length; i++) {
          if (src.indexOf(prefixes[i].filter) !== -1) {
            return prefixes[i];
          }
        }
      }
    };

    var DOM = global$2.DOM;
    var trimPx = function (value) {
      return value.replace(/px$/, '');
    };
    var getEphoxEmbedData = function (attrs) {
      var style = attrs.map.style;
      var styles = style ? DOM.parseStyle(style) : {};
      return {
        type: 'ephox-embed-iri',
        source: attrs.map['data-ephox-embed-iri'],
        altsource: '',
        poster: '',
        width: get(styles, 'max-width').map(trimPx).getOr(''),
        height: get(styles, 'max-height').map(trimPx).getOr('')
      };
    };
    var htmlToData = function (prefixes, html) {
      var isEphoxEmbed = Cell(false);
      var data = {};
      global$3({
        validate: false,
        allow_conditional_comments: true,
        start: function (name, attrs) {
          if (isEphoxEmbed.get()) ; else if (has(attrs.map, 'data-ephox-embed-iri')) {
            isEphoxEmbed.set(true);
            data = getEphoxEmbedData(attrs);
          } else {
            if (!data.source && name === 'param') {
              data.source = attrs.map.movie;
            }
            if (name === 'iframe' || name === 'object' || name === 'embed' || name === 'video' || name === 'audio') {
              if (!data.type) {
                data.type = name;
              }
              data = global$1.extend(attrs.map, data);
            }
            if (name === 'script') {
              var videoScript = getVideoScriptMatch(prefixes, attrs.map.src);
              if (!videoScript) {
                return;
              }
              data = {
                type: 'script',
                source: attrs.map.src,
                width: String(videoScript.width),
                height: String(videoScript.height)
              };
            }
            if (name === 'source') {
              if (!data.source) {
                data.source = attrs.map.src;
              } else if (!data.altsource) {
                data.altsource = attrs.map.src;
              }
            }
            if (name === 'img' && !data.poster) {
              data.poster = attrs.map.src;
            }
          }
        }
      }).parse(html);
      data.source = data.source || data.src || data.data;
      data.altsource = data.altsource || '';
      data.poster = data.poster || '';
      return data;
    };

    var guess = function (url) {
      var mimes = {
        mp3: 'audio/mpeg',
        m4a: 'audio/x-m4a',
        wav: 'audio/wav',
        mp4: 'video/mp4',
        webm: 'video/webm',
        ogg: 'video/ogg',
        swf: 'application/x-shockwave-flash'
      };
      var fileEnd = url.toLowerCase().split('.').pop();
      var mime = mimes[fileEnd];
      return mime ? mime : '';
    };

    var global$4 = tinymce.util.Tools.resolve('tinymce.html.Schema');

    var global$5 = tinymce.util.Tools.resolve('tinymce.html.Writer');

    var DOM$1 = global$2.DOM;
    var addPx = function (value) {
      return /^[0-9.]+$/.test(value) ? value + 'px' : value;
    };
    var setAttributes = function (attrs, updatedAttrs) {
      each$1(updatedAttrs, function (val, name) {
        var value = '' + val;
        if (attrs.map[name]) {
          var i = attrs.length;
          while (i--) {
            var attr = attrs[i];
            if (attr.name === name) {
              if (value) {
                attrs.map[name] = value;
                attr.value = value;
              } else {
                delete attrs.map[name];
                attrs.splice(i, 1);
              }
            }
          }
        } else if (value) {
          attrs.push({
            name: name,
            value: value
          });
          attrs.map[name] = value;
        }
      });
    };
    var updateEphoxEmbed = function (data, attrs) {
      var style = attrs.map.style;
      var styleMap = style ? DOM$1.parseStyle(style) : {};
      styleMap['max-width'] = addPx(data.width);
      styleMap['max-height'] = addPx(data.height);
      setAttributes(attrs, { style: DOM$1.serializeStyle(styleMap) });
    };
    var sources = [
      'source',
      'altsource'
    ];
    var updateHtml = function (html, data, updateAll) {
      var writer = global$5();
      var isEphoxEmbed = Cell(false);
      var sourceCount = 0;
      var hasImage;
      global$3({
        validate: false,
        allow_conditional_comments: true,
        comment: function (text) {
          writer.comment(text);
        },
        cdata: function (text) {
          writer.cdata(text);
        },
        text: function (text, raw) {
          writer.text(text, raw);
        },
        start: function (name, attrs, empty) {
          if (isEphoxEmbed.get()) ; else if (has(attrs.map, 'data-ephox-embed-iri')) {
            isEphoxEmbed.set(true);
            updateEphoxEmbed(data, attrs);
          } else {
            switch (name) {
            case 'video':
            case 'object':
            case 'embed':
            case 'img':
            case 'iframe':
              if (data.height !== undefined && data.width !== undefined) {
                setAttributes(attrs, {
                  width: data.width,
                  height: data.height
                });
              }
              break;
            }
            if (updateAll) {
              switch (name) {
              case 'video':
                setAttributes(attrs, {
                  poster: data.poster,
                  src: ''
                });
                if (data.altsource) {
                  setAttributes(attrs, { src: '' });
                }
                break;
              case 'iframe':
                setAttributes(attrs, { src: data.source });
                break;
              case 'source':
                if (sourceCount < 2) {
                  setAttributes(attrs, {
                    src: data[sources[sourceCount]],
                    type: data[sources[sourceCount] + 'mime']
                  });
                  if (!data[sources[sourceCount]]) {
                    return;
                  }
                }
                sourceCount++;
                break;
              case 'img':
                if (!data.poster) {
                  return;
                }
                hasImage = true;
                break;
              }
            }
          }
          writer.start(name, attrs, empty);
        },
        end: function (name) {
          if (!isEphoxEmbed.get()) {
            if (name === 'video' && updateAll) {
              for (var index = 0; index < 2; index++) {
                if (data[sources[index]]) {
                  var attrs = [];
                  attrs.map = {};
                  if (sourceCount < index) {
                    setAttributes(attrs, {
                      src: data[sources[index]],
                      type: data[sources[index] + 'mime']
                    });
                    writer.start('source', attrs, true);
                  }
                }
              }
            }
            if (data.poster && name === 'object' && updateAll && !hasImage) {
              var imgAttrs = [];
              imgAttrs.map = {};
              setAttributes(imgAttrs, {
                src: data.poster,
                width: data.width,
                height: data.height
              });
              writer.start('img', imgAttrs, true);
            }
          }
          writer.end(name);
        }
      }, global$4({})).parse(html);
      return writer.getContent();
    };

    var urlPatterns = [
      {
        regex: /youtu\.be\/([\w\-_\?&=.]+)/i,
        type: 'iframe',
        w: 560,
        h: 314,
        url: 'www.youtube.com/embed/$1',
        allowFullscreen: true
      },
      {
        regex: /youtube\.com(.+)v=([^&]+)(&([a-z0-9&=\-_]+))?/i,
        type: 'iframe',
        w: 560,
        h: 314,
        url: 'www.youtube.com/embed/$2?$4',
        allowFullscreen: true
      },
      {
        regex: /youtube.com\/embed\/([a-z0-9\?&=\-_]+)/i,
        type: 'iframe',
        w: 560,
        h: 314,
        url: 'www.youtube.com/embed/$1',
        allowFullscreen: true
      },
      {
        regex: /vimeo\.com\/([0-9]+)/,
        type: 'iframe',
        w: 425,
        h: 350,
        url: 'player.vimeo.com/video/$1?title=0&byline=0&portrait=0&color=8dc7dc',
        allowFullscreen: true
      },
      {
        regex: /vimeo\.com\/(.*)\/([0-9]+)/,
        type: 'iframe',
        w: 425,
        h: 350,
        url: 'player.vimeo.com/video/$2?title=0&amp;byline=0',
        allowFullscreen: true
      },
      {
        regex: /maps\.google\.([a-z]{2,3})\/maps\/(.+)msid=(.+)/,
        type: 'iframe',
        w: 425,
        h: 350,
        url: 'maps.google.com/maps/ms?msid=$2&output=embed"',
        allowFullscreen: false
      },
      {
        regex: /dailymotion\.com\/video\/([^_]+)/,
        type: 'iframe',
        w: 480,
        h: 270,
        url: 'www.dailymotion.com/embed/video/$1',
        allowFullscreen: true
      },
      {
        regex: /dai\.ly\/([^_]+)/,
        type: 'iframe',
        w: 480,
        h: 270,
        url: 'www.dailymotion.com/embed/video/$1',
        allowFullscreen: true
      }
    ];
    var getProtocol = function (url) {
      var protocolMatches = url.match(/^(https?:\/\/|www\.)(.+)$/i);
      if (protocolMatches && protocolMatches.length > 1) {
        return protocolMatches[1] === 'www.' ? 'https://' : protocolMatches[1];
      } else {
        return 'https://';
      }
    };
    var getUrl = function (pattern, url) {
      var protocol = getProtocol(url);
      var match = pattern.regex.exec(url);
      var newUrl = protocol + pattern.url;
      var _loop_1 = function (i) {
        newUrl = newUrl.replace('$' + i, function () {
          return match[i] ? match[i] : '';
        });
      };
      for (var i = 0; i < match.length; i++) {
        _loop_1(i);
      }
      return newUrl.replace(/\?$/, '');
    };
    var matchPattern = function (url) {
      var patterns = urlPatterns.filter(function (pattern) {
        return pattern.regex.test(url);
      });
      if (patterns.length > 0) {
        return global$1.extend({}, patterns[0], { url: getUrl(patterns[0], url) });
      } else {
        return null;
      }
    };

    var getIframeHtml = function (data) {
      var allowFullscreen = data.allowFullscreen ? ' allowFullscreen="1"' : '';
      return '<iframe src="' + data.source + '" width="' + data.width + '" height="' + data.height + '"' + allowFullscreen + '></iframe>';
    };
    var getFlashHtml = function (data) {
      var html = '<object data="' + data.source + '" width="' + data.width + '" height="' + data.height + '" type="application/x-shockwave-flash">';
      if (data.poster) {
        html += '<img src="' + data.poster + '" width="' + data.width + '" height="' + data.height + '" />';
      }
      html += '</object>';
      return html;
    };
    var getAudioHtml = function (data, audioTemplateCallback) {
      if (audioTemplateCallback) {
        return audioTemplateCallback(data);
      } else {
        return '<audio controls="controls" src="' + data.source + '">' + (data.altsource ? '\n<source src="' + data.altsource + '"' + (data.altsourcemime ? ' type="' + data.altsourcemime + '"' : '') + ' />\n' : '') + '</audio>';
      }
    };
    var getVideoHtml = function (data, videoTemplateCallback) {
      if (videoTemplateCallback) {
        return videoTemplateCallback(data);
      } else {
        return '<video width="' + data.width + '" height="' + data.height + '"' + (data.poster ? ' poster="' + data.poster + '"' : '') + ' controls="controls">\n' + '<source src="' + data.source + '"' + (data.sourcemime ? ' type="' + data.sourcemime + '"' : '') + ' />\n' + (data.altsource ? '<source src="' + data.altsource + '"' + (data.altsourcemime ? ' type="' + data.altsourcemime + '"' : '') + ' />\n' : '') + '</video>';
      }
    };
    var getScriptHtml = function (data) {
      return '<script src="' + data.source + '"></script>';
    };
    var dataToHtml = function (editor, dataIn) {
      var data = global$1.extend({}, dataIn);
      if (!data.source) {
        global$1.extend(data, htmlToData(getScripts(editor), data.embed));
        if (!data.source) {
          return '';
        }
      }
      if (!data.altsource) {
        data.altsource = '';
      }
      if (!data.poster) {
        data.poster = '';
      }
      data.source = editor.convertURL(data.source, 'source');
      data.altsource = editor.convertURL(data.altsource, 'source');
      data.sourcemime = guess(data.source);
      data.altsourcemime = guess(data.altsource);
      data.poster = editor.convertURL(data.poster, 'poster');
      var pattern = matchPattern(data.source);
      if (pattern) {
        data.source = pattern.url;
        data.type = pattern.type;
        data.allowFullscreen = pattern.allowFullscreen;
        data.width = data.width || String(pattern.w);
        data.height = data.height || String(pattern.h);
      }
      if (data.embed) {
        return updateHtml(data.embed, data, true);
      } else {
        var videoScript = getVideoScriptMatch(getScripts(editor), data.source);
        if (videoScript) {
          data.type = 'script';
          data.width = String(videoScript.width);
          data.height = String(videoScript.height);
        }
        var audioTemplateCallback = getAudioTemplateCallback(editor);
        var videoTemplateCallback = getVideoTemplateCallback(editor);
        data.width = data.width || '300';
        data.height = data.height || '150';
        global$1.each(data, function (value, key) {
          data[key] = editor.dom.encode('' + value);
        });
        if (data.type === 'iframe') {
          return getIframeHtml(data);
        } else if (data.sourcemime === 'application/x-shockwave-flash') {
          return getFlashHtml(data);
        } else if (data.sourcemime.indexOf('audio') !== -1) {
          return getAudioHtml(data, audioTemplateCallback);
        } else if (data.type === 'script') {
          return getScriptHtml(data);
        } else {
          return getVideoHtml(data, videoTemplateCallback);
        }
      }
    };

    var global$6 = tinymce.util.Tools.resolve('tinymce.util.Promise');

    var cache = {};
    var embedPromise = function (data, dataToHtml, handler) {
      return new global$6(function (res, rej) {
        var wrappedResolve = function (response) {
          if (response.html) {
            cache[data.source] = response;
          }
          return res({
            url: data.source,
            html: response.html ? response.html : dataToHtml(data)
          });
        };
        if (cache[data.source]) {
          wrappedResolve(cache[data.source]);
        } else {
          handler({ url: data.source }, wrappedResolve, rej);
        }
      });
    };
    var defaultPromise = function (data, dataToHtml) {
      return new global$6(function (res) {
        res({
          html: dataToHtml(data),
          url: data.source
        });
      });
    };
    var loadedData = function (editor) {
      return function (data) {
        return dataToHtml(editor, data);
      };
    };
    var getEmbedHtml = function (editor, data) {
      var embedHandler = getUrlResolver(editor);
      return embedHandler ? embedPromise(data, loadedData(editor), embedHandler) : defaultPromise(data, loadedData(editor));
    };
    var isCached = function (url) {
      return cache.hasOwnProperty(url);
    };

    var extractMeta = function (sourceInput, data) {
      return get(data, sourceInput).bind(function (mainData) {
        return get(mainData, 'meta');
      });
    };
    var getValue = function (data, metaData, sourceInput) {
      return function (prop) {
        var _a;
        var getFromData = function () {
          return get(data, prop);
        };
        var getFromMetaData = function () {
          return get(metaData, prop);
        };
        var getNonEmptyValue = function (c) {
          return get(c, 'value').bind(function (v) {
            return v.length > 0 ? Option.some(v) : Option.none();
          });
        };
        var getFromValueFirst = function () {
          return getFromData().bind(function (child) {
            return isObject(child) ? getNonEmptyValue(child).orThunk(getFromMetaData) : getFromMetaData().orThunk(function () {
              return Option.from(child);
            });
          });
        };
        var getFromMetaFirst = function () {
          return getFromMetaData().orThunk(function () {
            return getFromData().bind(function (child) {
              return isObject(child) ? getNonEmptyValue(child) : Option.from(child);
            });
          });
        };
        return _a = {}, _a[prop] = (prop === sourceInput ? getFromValueFirst() : getFromMetaFirst()).getOr(''), _a;
      };
    };
    var getDimensions = function (data, metaData) {
      var dimensions = {};
      get(data, 'dimensions').each(function (dims) {
        each([
          'width',
          'height'
        ], function (prop) {
          get(metaData, prop).orThunk(function () {
            return get(dims, prop);
          }).each(function (value) {
            return dimensions[prop] = value;
          });
        });
      });
      return dimensions;
    };
    var unwrap = function (data, sourceInput) {
      var metaData = sourceInput ? extractMeta(sourceInput, data).getOr({}) : {};
      var get = getValue(data, metaData, sourceInput);
      return __assign(__assign(__assign(__assign(__assign({}, get('source')), get('altsource')), get('poster')), get('embed')), getDimensions(data, metaData));
    };
    var wrap = function (data) {
      var wrapped = __assign(__assign({}, data), {
        source: { value: get(data, 'source').getOr('') },
        altsource: { value: get(data, 'altsource').getOr('') },
        poster: { value: get(data, 'poster').getOr('') }
      });
      each([
        'width',
        'height'
      ], function (prop) {
        get(data, prop).each(function (value) {
          var dimensions = wrapped.dimensions || {};
          dimensions[prop] = value;
          wrapped.dimensions = dimensions;
        });
      });
      return wrapped;
    };
    var handleError = function (editor) {
      return function (error) {
        var errorMessage = error && error.msg ? 'Media embed handler error: ' + error.msg : 'Media embed handler threw unknown error.';
        editor.notificationManager.open({
          type: 'error',
          text: errorMessage
        });
      };
    };
    var snippetToData = function (editor, embedSnippet) {
      return htmlToData(getScripts(editor), embedSnippet);
    };
    var isMediaElement = function (element) {
      return element.getAttribute('data-mce-object') || element.getAttribute('data-ephox-embed-iri');
    };
    var getEditorData = function (editor) {
      var element = editor.selection.getNode();
      var snippet = isMediaElement(element) ? editor.serializer.serialize(element, { selection: true }) : '';
      return __assign({ embed: snippet }, htmlToData(getScripts(editor), snippet));
    };
    var addEmbedHtml = function (api, editor) {
      return function (response) {
        if (isString(response.url) && response.url.trim().length > 0) {
          var html = response.html;
          var snippetData = snippetToData(editor, html);
          var nuData = __assign(__assign({}, snippetData), {
            source: response.url,
            embed: html
          });
          api.setData(wrap(nuData));
        }
      };
    };
    var selectPlaceholder = function (editor, beforeObjects) {
      var afterObjects = editor.dom.select('img[data-mce-object]');
      for (var i = 0; i < beforeObjects.length; i++) {
        for (var y = afterObjects.length - 1; y >= 0; y--) {
          if (beforeObjects[i] === afterObjects[y]) {
            afterObjects.splice(y, 1);
          }
        }
      }
      editor.selection.select(afterObjects[0]);
    };
    var handleInsert = function (editor, html) {
      var beforeObjects = editor.dom.select('img[data-mce-object]');
      editor.insertContent(html);
      selectPlaceholder(editor, beforeObjects);
      editor.nodeChanged();
    };
    var submitForm = function (prevData, newData, editor) {
      newData.embed = updateHtml(newData.embed, newData);
      if (newData.embed && (prevData.source === newData.source || isCached(newData.source))) {
        handleInsert(editor, newData.embed);
      } else {
        getEmbedHtml(editor, newData).then(function (response) {
          handleInsert(editor, response.html);
        }).catch(handleError(editor));
      }
    };
    var showDialog = function (editor) {
      var editorData = getEditorData(editor);
      var currentData = Cell(editorData);
      var initialData = wrap(editorData);
      var handleSource = function (prevData, api) {
        var serviceData = unwrap(api.getData(), 'source');
        if (prevData.source !== serviceData.source) {
          addEmbedHtml(win, editor)({
            url: serviceData.source,
            html: ''
          });
          getEmbedHtml(editor, serviceData).then(addEmbedHtml(win, editor)).catch(handleError(editor));
        }
      };
      var handleEmbed = function (api) {
        var data = unwrap(api.getData());
        var dataFromEmbed = snippetToData(editor, data.embed);
        api.setData(wrap(dataFromEmbed));
      };
      var handleUpdate = function (api, sourceInput) {
        var data = unwrap(api.getData(), sourceInput);
        var embed = dataToHtml(editor, data);
        api.setData(wrap(__assign(__assign({}, data), { embed: embed })));
      };
      var mediaInput = [{
          name: 'source',
          type: 'urlinput',
          filetype: 'media',
          label: 'Source'
        }];
      var sizeInput = !hasDimensions(editor) ? [] : [{
          type: 'sizeinput',
          name: 'dimensions',
          label: 'Constrain proportions',
          constrain: true
        }];
      var generalTab = {
        title: 'General',
        name: 'general',
        items: flatten([
          mediaInput,
          sizeInput
        ])
      };
      var embedTextarea = {
        type: 'textarea',
        name: 'embed',
        label: 'Paste your embed code below:'
      };
      var embedTab = {
        title: 'Embed',
        items: [embedTextarea]
      };
      var advancedFormItems = [];
      if (hasAltSource(editor)) {
        advancedFormItems.push({
          name: 'altsource',
          type: 'urlinput',
          filetype: 'media',
          label: 'Alternative source URL'
        });
      }
      if (hasPoster(editor)) {
        advancedFormItems.push({
          name: 'poster',
          type: 'urlinput',
          filetype: 'image',
          label: 'Media poster (Image URL)'
        });
      }
      var advancedTab = {
        title: 'Advanced',
        name: 'advanced',
        items: advancedFormItems
      };
      var tabs = [
        generalTab,
        embedTab
      ];
      if (advancedFormItems.length > 0) {
        tabs.push(advancedTab);
      }
      var body = {
        type: 'tabpanel',
        tabs: tabs
      };
      var win = editor.windowManager.open({
        title: 'Insert/Edit Media',
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
        onSubmit: function (api) {
          var serviceData = unwrap(api.getData());
          submitForm(currentData.get(), serviceData, editor);
          api.close();
        },
        onChange: function (api, detail) {
          switch (detail.name) {
          case 'source':
            handleSource(currentData.get(), api);
            break;
          case 'embed':
            handleEmbed(api);
            break;
          case 'dimensions':
          case 'altsource':
          case 'poster':
            handleUpdate(api, detail.name);
            break;
          }
          currentData.set(unwrap(api.getData()));
        },
        initialData: initialData
      });
    };

    var get$1 = function (editor) {
      var showDialog$1 = function () {
        showDialog(editor);
      };
      return { showDialog: showDialog$1 };
    };

    var register = function (editor) {
      var showDialog$1 = function () {
        showDialog(editor);
      };
      editor.addCommand('mceMedia', showDialog$1);
    };

    var global$7 = tinymce.util.Tools.resolve('tinymce.html.Node');

    var global$8 = tinymce.util.Tools.resolve('tinymce.Env');

    var sanitize = function (editor, html) {
      if (shouldFilterHtml(editor) === false) {
        return html;
      }
      var writer = global$5();
      var blocked;
      global$3({
        validate: false,
        allow_conditional_comments: false,
        comment: function (text) {
          writer.comment(text);
        },
        cdata: function (text) {
          writer.cdata(text);
        },
        text: function (text, raw) {
          writer.text(text, raw);
        },
        start: function (name, attrs, empty) {
          blocked = true;
          if (name === 'script' || name === 'noscript' || name === 'svg') {
            return;
          }
          for (var i = attrs.length - 1; i >= 0; i--) {
            var attrName = attrs[i].name;
            if (attrName.indexOf('on') === 0) {
              delete attrs.map[attrName];
              attrs.splice(i, 1);
            }
            if (attrName === 'style') {
              attrs[i].value = editor.dom.serializeStyle(editor.dom.parseStyle(attrs[i].value), name);
            }
          }
          writer.start(name, attrs, empty);
          blocked = false;
        },
        end: function (name) {
          if (blocked) {
            return;
          }
          writer.end(name);
        }
      }, global$4({})).parse(html);
      return writer.getContent();
    };

    var createPlaceholderNode = function (editor, node) {
      var name = node.name;
      var placeHolder = new global$7('img', 1);
      placeHolder.shortEnded = true;
      retainAttributesAndInnerHtml(editor, node, placeHolder);
      placeHolder.attr({
        'width': node.attr('width') || '300',
        'height': node.attr('height') || (name === 'audio' ? '30' : '150'),
        'style': node.attr('style'),
        'src': global$8.transparentSrc,
        'data-mce-object': name,
        'class': 'mce-object mce-object-' + name
      });
      return placeHolder;
    };
    var createPreviewIframeNode = function (editor, node) {
      var name = node.name;
      var previewWrapper = new global$7('span', 1);
      previewWrapper.attr({
        'contentEditable': 'false',
        'style': node.attr('style'),
        'data-mce-object': name,
        'class': 'mce-preview-object mce-object-' + name
      });
      retainAttributesAndInnerHtml(editor, node, previewWrapper);
      var previewNode = new global$7(name, 1);
      previewNode.attr({
        src: node.attr('src'),
        allowfullscreen: node.attr('allowfullscreen'),
        style: node.attr('style'),
        class: node.attr('class'),
        width: node.attr('width'),
        height: node.attr('height'),
        frameborder: '0'
      });
      var shimNode = new global$7('span', 1);
      shimNode.attr('class', 'mce-shim');
      previewWrapper.append(previewNode);
      previewWrapper.append(shimNode);
      return previewWrapper;
    };
    var retainAttributesAndInnerHtml = function (editor, sourceNode, targetNode) {
      var attrName;
      var attrValue;
      var ai;
      var attribs = sourceNode.attributes;
      ai = attribs.length;
      while (ai--) {
        attrName = attribs[ai].name;
        attrValue = attribs[ai].value;
        if (attrName !== 'width' && attrName !== 'height' && attrName !== 'style') {
          if (attrName === 'data' || attrName === 'src') {
            attrValue = editor.convertURL(attrValue, attrName);
          }
          targetNode.attr('data-mce-p-' + attrName, attrValue);
        }
      }
      var innerHtml = sourceNode.firstChild && sourceNode.firstChild.value;
      if (innerHtml) {
        targetNode.attr('data-mce-html', escape(sanitize(editor, innerHtml)));
        targetNode.firstChild = null;
      }
    };
    var isPageEmbedWrapper = function (node) {
      var nodeClass = node.attr('class');
      return nodeClass && /\btiny-pageembed\b/.test(nodeClass);
    };
    var isWithinEmbedWrapper = function (node) {
      while (node = node.parent) {
        if (node.attr('data-ephox-embed-iri') || isPageEmbedWrapper(node)) {
          return true;
        }
      }
      return false;
    };
    var placeHolderConverter = function (editor) {
      return function (nodes) {
        var i = nodes.length;
        var node;
        var videoScript;
        while (i--) {
          node = nodes[i];
          if (!node.parent) {
            continue;
          }
          if (node.parent.attr('data-mce-object')) {
            continue;
          }
          if (node.name === 'script') {
            videoScript = getVideoScriptMatch(getScripts(editor), node.attr('src'));
            if (!videoScript) {
              continue;
            }
          }
          if (videoScript) {
            if (videoScript.width) {
              node.attr('width', videoScript.width.toString());
            }
            if (videoScript.height) {
              node.attr('height', videoScript.height.toString());
            }
          }
          if (node.name === 'iframe' && hasLiveEmbeds(editor) && global$8.ceFalse) {
            if (!isWithinEmbedWrapper(node)) {
              node.replace(createPreviewIframeNode(editor, node));
            }
          } else {
            if (!isWithinEmbedWrapper(node)) {
              node.replace(createPlaceholderNode(editor, node));
            }
          }
        }
      };
    };

    var setup = function (editor) {
      editor.on('preInit', function () {
        var specialElements = editor.schema.getSpecialElements();
        global$1.each('video audio iframe object'.split(' '), function (name) {
          specialElements[name] = new RegExp('</' + name + '[^>]*>', 'gi');
        });
        var boolAttrs = editor.schema.getBoolAttrs();
        global$1.each('webkitallowfullscreen mozallowfullscreen allowfullscreen'.split(' '), function (name) {
          boolAttrs[name] = {};
        });
        editor.parser.addNodeFilter('iframe,video,audio,object,embed,script', placeHolderConverter(editor));
        editor.serializer.addAttributeFilter('data-mce-object', function (nodes, name) {
          var i = nodes.length;
          var node;
          var realElm;
          var ai;
          var attribs;
          var innerHtml;
          var innerNode;
          var realElmName;
          var className;
          while (i--) {
            node = nodes[i];
            if (!node.parent) {
              continue;
            }
            realElmName = node.attr(name);
            realElm = new global$7(realElmName, 1);
            if (realElmName !== 'audio' && realElmName !== 'script') {
              className = node.attr('class');
              if (className && className.indexOf('mce-preview-object') !== -1) {
                realElm.attr({
                  width: node.firstChild.attr('width'),
                  height: node.firstChild.attr('height')
                });
              } else {
                realElm.attr({
                  width: node.attr('width'),
                  height: node.attr('height')
                });
              }
            }
            realElm.attr({ style: node.attr('style') });
            attribs = node.attributes;
            ai = attribs.length;
            while (ai--) {
              var attrName = attribs[ai].name;
              if (attrName.indexOf('data-mce-p-') === 0) {
                realElm.attr(attrName.substr(11), attribs[ai].value);
              }
            }
            if (realElmName === 'script') {
              realElm.attr('type', 'text/javascript');
            }
            innerHtml = node.attr('data-mce-html');
            if (innerHtml) {
              innerNode = new global$7('#text', 3);
              innerNode.raw = true;
              innerNode.value = sanitize(editor, unescape(innerHtml));
              realElm.append(innerNode);
            }
            node.replace(realElm);
          }
        });
      });
      editor.on('SetContent', function () {
        editor.$('span.mce-preview-object').each(function (index, elm) {
          var $elm = editor.$(elm);
          if ($elm.find('span.mce-shim').length === 0) {
            $elm.append('<span class="mce-shim"></span>');
          }
        });
      });
    };

    var setup$1 = function (editor) {
      editor.on('ResolveName', function (e) {
        var name;
        if (e.target.nodeType === 1 && (name = e.target.getAttribute('data-mce-object'))) {
          e.name = name;
        }
      });
    };

    var setup$2 = function (editor) {
      editor.on('click keyup touchend', function () {
        var selectedNode = editor.selection.getNode();
        if (selectedNode && editor.dom.hasClass(selectedNode, 'mce-preview-object')) {
          if (editor.dom.getAttrib(selectedNode, 'data-mce-selected')) {
            selectedNode.setAttribute('data-mce-selected', '2');
          }
        }
      });
      editor.on('ObjectSelected', function (e) {
        var objectType = e.target.getAttribute('data-mce-object');
        if (objectType === 'audio' || objectType === 'script') {
          e.preventDefault();
        }
      });
      editor.on('ObjectResized', function (e) {
        var target = e.target;
        var html;
        if (target.getAttribute('data-mce-object')) {
          html = target.getAttribute('data-mce-html');
          if (html) {
            html = unescape(html);
            target.setAttribute('data-mce-html', escape(updateHtml(html, {
              width: String(e.width),
              height: String(e.height)
            })));
          }
        }
      });
    };

    var stateSelectorAdapter = function (editor, selector) {
      return function (buttonApi) {
        return editor.selection.selectorChangedWithUnbind(selector.join(','), buttonApi.setActive).unbind;
      };
    };
    var register$1 = function (editor) {
      editor.ui.registry.addToggleButton('media', {
        tooltip: 'Insert/edit media',
        icon: 'embed',
        onAction: function () {
          editor.execCommand('mceMedia');
        },
        onSetup: stateSelectorAdapter(editor, [
          'img[data-mce-object]',
          'span[data-mce-object]',
          'div[data-ephox-embed-iri]'
        ])
      });
      editor.ui.registry.addMenuItem('media', {
        icon: 'embed',
        text: 'Media...',
        onAction: function () {
          editor.execCommand('mceMedia');
        }
      });
    };

    function Plugin () {
      global.add('media', function (editor) {
        register(editor);
        register$1(editor);
        setup$1(editor);
        setup(editor);
        setup$2(editor);
        return get$1(editor);
      });
    }

    Plugin();

}());


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL21lZGlhL3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsZ0RBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQ0FBc0MsU0FBUztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsU0FBUztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxTQUFTO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIscUJBQXFCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix3Q0FBd0M7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLHdDQUF3QyxVQUFVO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxtQkFBbUI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxXQUFXO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxhQUFhO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BEO0FBQ0EsT0FBTztBQUNQO0FBQ0EscUNBQXFDLElBQUk7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHFCQUFxQixrQkFBa0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxpQ0FBaUMsZ0JBQWdCLGdDQUFnQztBQUNqRixPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxtQkFBbUIsbUJBQW1CO0FBQ3RDO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsV0FBVztBQUNYO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSwwRUFBMEU7QUFDMUU7QUFDQSw0REFBNEQ7QUFDNUQ7QUFDQTtBQUNBLHdDQUF3QztBQUN4QyxpQkFBaUIsdUNBQXVDO0FBQ3hELG9CQUFvQiwwQ0FBMEM7QUFDOUQsaUJBQWlCO0FBQ2pCLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0ZBQW9GLGtCQUFrQjtBQUN0Ryx1QkFBdUIsaUJBQWlCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwwQkFBMEI7QUFDL0MsNkNBQTZDLFFBQVE7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLFVBQVUsZUFBZTtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxRQUFRO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxhQUFhO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLDBCQUEwQiw0QkFBNEI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBLENBQUMiLCJmaWxlIjoidmVuZG9yc350aW55bWNlLXBsdWdpbi1tZWRpYX50aW55bWNlLXBsdWdpbi1tZWRpYS1wbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqXG4gKiBWZXJzaW9uOiA1LjQuMiAoMjAyMC0wOC0xNylcbiAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgZ2xvYmFsID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuUGx1Z2luTWFuYWdlcicpO1xuXG4gICAgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24gKCkge1xuICAgICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICBmb3IgKHZhciBwIGluIHMpXG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICAgIH07XG4gICAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgdmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgfTtcbiAgICB2YXIgY29uc3RhbnQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgbmV2ZXIgPSBjb25zdGFudChmYWxzZSk7XG4gICAgdmFyIGFsd2F5cyA9IGNvbnN0YW50KHRydWUpO1xuXG4gICAgdmFyIG5vbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gTk9ORTtcbiAgICB9O1xuICAgIHZhciBOT05FID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGVxID0gZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgcmV0dXJuIG8uaXNOb25lKCk7XG4gICAgICB9O1xuICAgICAgdmFyIGNhbGwgPSBmdW5jdGlvbiAodGh1bmspIHtcbiAgICAgICAgcmV0dXJuIHRodW5rKCk7XG4gICAgICB9O1xuICAgICAgdmFyIGlkID0gZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgcmV0dXJuIG47XG4gICAgICB9O1xuICAgICAgdmFyIG1lID0ge1xuICAgICAgICBmb2xkOiBmdW5jdGlvbiAobiwgX3MpIHtcbiAgICAgICAgICByZXR1cm4gbigpO1xuICAgICAgICB9LFxuICAgICAgICBpczogbmV2ZXIsXG4gICAgICAgIGlzU29tZTogbmV2ZXIsXG4gICAgICAgIGlzTm9uZTogYWx3YXlzLFxuICAgICAgICBnZXRPcjogaWQsXG4gICAgICAgIGdldE9yVGh1bms6IGNhbGwsXG4gICAgICAgIGdldE9yRGllOiBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyB8fCAnZXJyb3I6IGdldE9yRGllIGNhbGxlZCBvbiBub25lLicpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRPck51bGw6IGNvbnN0YW50KG51bGwpLFxuICAgICAgICBnZXRPclVuZGVmaW5lZDogY29uc3RhbnQodW5kZWZpbmVkKSxcbiAgICAgICAgb3I6IGlkLFxuICAgICAgICBvclRodW5rOiBjYWxsLFxuICAgICAgICBtYXA6IG5vbmUsXG4gICAgICAgIGVhY2g6IG5vb3AsXG4gICAgICAgIGJpbmQ6IG5vbmUsXG4gICAgICAgIGV4aXN0czogbmV2ZXIsXG4gICAgICAgIGZvcmFsbDogYWx3YXlzLFxuICAgICAgICBmaWx0ZXI6IG5vbmUsXG4gICAgICAgIGVxdWFsczogZXEsXG4gICAgICAgIGVxdWFsc186IGVxLFxuICAgICAgICB0b0FycmF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9LFxuICAgICAgICB0b1N0cmluZzogY29uc3RhbnQoJ25vbmUoKScpXG4gICAgICB9O1xuICAgICAgcmV0dXJuIG1lO1xuICAgIH0oKTtcbiAgICB2YXIgc29tZSA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICB2YXIgY29uc3RhbnRfYSA9IGNvbnN0YW50KGEpO1xuICAgICAgdmFyIHNlbGYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBtZTtcbiAgICAgIH07XG4gICAgICB2YXIgYmluZCA9IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHJldHVybiBmKGEpO1xuICAgICAgfTtcbiAgICAgIHZhciBtZSA9IHtcbiAgICAgICAgZm9sZDogZnVuY3Rpb24gKG4sIHMpIHtcbiAgICAgICAgICByZXR1cm4gcyhhKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXM6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgcmV0dXJuIGEgPT09IHY7XG4gICAgICAgIH0sXG4gICAgICAgIGlzU29tZTogYWx3YXlzLFxuICAgICAgICBpc05vbmU6IG5ldmVyLFxuICAgICAgICBnZXRPcjogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JUaHVuazogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JEaWU6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yTnVsbDogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JVbmRlZmluZWQ6IGNvbnN0YW50X2EsXG4gICAgICAgIG9yOiBzZWxmLFxuICAgICAgICBvclRodW5rOiBzZWxmLFxuICAgICAgICBtYXA6IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgcmV0dXJuIHNvbWUoZihhKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVhY2g6IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgZihhKTtcbiAgICAgICAgfSxcbiAgICAgICAgYmluZDogYmluZCxcbiAgICAgICAgZXhpc3RzOiBiaW5kLFxuICAgICAgICBmb3JhbGw6IGJpbmQsXG4gICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICByZXR1cm4gZihhKSA/IG1lIDogTk9ORTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9BcnJheTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBbYV07XG4gICAgICAgIH0sXG4gICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuICdzb21lKCcgKyBhICsgJyknO1xuICAgICAgICB9LFxuICAgICAgICBlcXVhbHM6IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgICAgcmV0dXJuIG8uaXMoYSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVxdWFsc186IGZ1bmN0aW9uIChvLCBlbGVtZW50RXEpIHtcbiAgICAgICAgICByZXR1cm4gby5mb2xkKG5ldmVyLCBmdW5jdGlvbiAoYikge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRFcShhLCBiKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiBtZTtcbiAgICB9O1xuICAgIHZhciBmcm9tID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCA/IE5PTkUgOiBzb21lKHZhbHVlKTtcbiAgICB9O1xuICAgIHZhciBPcHRpb24gPSB7XG4gICAgICBzb21lOiBzb21lLFxuICAgICAgbm9uZTogbm9uZSxcbiAgICAgIGZyb206IGZyb21cbiAgICB9O1xuXG4gICAgdmFyIHR5cGVPZiA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICB2YXIgdCA9IHR5cGVvZiB4O1xuICAgICAgaWYgKHggPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICdudWxsJztcbiAgICAgIH0gZWxzZSBpZiAodCA9PT0gJ29iamVjdCcgJiYgKEFycmF5LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKHgpIHx8IHguY29uc3RydWN0b3IgJiYgeC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnQXJyYXknKSkge1xuICAgICAgICByZXR1cm4gJ2FycmF5JztcbiAgICAgIH0gZWxzZSBpZiAodCA9PT0gJ29iamVjdCcgJiYgKFN0cmluZy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZih4KSB8fCB4LmNvbnN0cnVjdG9yICYmIHguY29uc3RydWN0b3IubmFtZSA9PT0gJ1N0cmluZycpKSB7XG4gICAgICAgIHJldHVybiAnc3RyaW5nJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0O1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGlzVHlwZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0eXBlT2YodmFsdWUpID09PSB0eXBlO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBpc1N0cmluZyA9IGlzVHlwZSgnc3RyaW5nJyk7XG4gICAgdmFyIGlzT2JqZWN0ID0gaXNUeXBlKCdvYmplY3QnKTtcbiAgICB2YXIgaXNBcnJheSA9IGlzVHlwZSgnYXJyYXknKTtcblxuICAgIHZhciBuYXRpdmVQdXNoID0gQXJyYXkucHJvdG90eXBlLnB1c2g7XG4gICAgdmFyIGVhY2ggPSBmdW5jdGlvbiAoeHMsIGYpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB4cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgeCA9IHhzW2ldO1xuICAgICAgICBmKHgsIGkpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGZsYXR0ZW4gPSBmdW5jdGlvbiAoeHMpIHtcbiAgICAgIHZhciByID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0geHMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgaWYgKCFpc0FycmF5KHhzW2ldKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXJyLmZsYXR0ZW4gaXRlbSAnICsgaSArICcgd2FzIG5vdCBhbiBhcnJheSwgaW5wdXQ6ICcgKyB4cyk7XG4gICAgICAgIH1cbiAgICAgICAgbmF0aXZlUHVzaC5hcHBseShyLCB4c1tpXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcjtcbiAgICB9O1xuXG4gICAgdmFyIENlbGwgPSBmdW5jdGlvbiAoaW5pdGlhbCkge1xuICAgICAgdmFyIHZhbHVlID0gaW5pdGlhbDtcbiAgICAgIHZhciBnZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG4gICAgICB2YXIgc2V0ID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdmFsdWUgPSB2O1xuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdldDogZ2V0LFxuICAgICAgICBzZXQ6IHNldFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cztcbiAgICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QuaGFzT3duUHJvcGVydHk7XG4gICAgdmFyIGVhY2gkMSA9IGZ1bmN0aW9uIChvYmosIGYpIHtcbiAgICAgIHZhciBwcm9wcyA9IGtleXMob2JqKTtcbiAgICAgIGZvciAodmFyIGsgPSAwLCBsZW4gPSBwcm9wcy5sZW5ndGg7IGsgPCBsZW47IGsrKykge1xuICAgICAgICB2YXIgaSA9IHByb3BzW2tdO1xuICAgICAgICB2YXIgeCA9IG9ialtpXTtcbiAgICAgICAgZih4LCBpKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBnZXQgPSBmdW5jdGlvbiAob2JqLCBrZXkpIHtcbiAgICAgIHJldHVybiBoYXMob2JqLCBrZXkpID8gT3B0aW9uLmZyb20ob2JqW2tleV0pIDogT3B0aW9uLm5vbmUoKTtcbiAgICB9O1xuICAgIHZhciBoYXMgPSBmdW5jdGlvbiAob2JqLCBrZXkpIHtcbiAgICAgIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbiAgICB9O1xuXG4gICAgdmFyIGdldFNjcmlwdHMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdtZWRpYV9zY3JpcHRzJyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0QXVkaW9UZW1wbGF0ZUNhbGxiYWNrID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnYXVkaW9fdGVtcGxhdGVfY2FsbGJhY2snKTtcbiAgICB9O1xuICAgIHZhciBnZXRWaWRlb1RlbXBsYXRlQ2FsbGJhY2sgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCd2aWRlb190ZW1wbGF0ZV9jYWxsYmFjaycpO1xuICAgIH07XG4gICAgdmFyIGhhc0xpdmVFbWJlZHMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdtZWRpYV9saXZlX2VtYmVkcycsIHRydWUpO1xuICAgIH07XG4gICAgdmFyIHNob3VsZEZpbHRlckh0bWwgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdtZWRpYV9maWx0ZXJfaHRtbCcsIHRydWUpO1xuICAgIH07XG4gICAgdmFyIGdldFVybFJlc29sdmVyID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnbWVkaWFfdXJsX3Jlc29sdmVyJyk7XG4gICAgfTtcbiAgICB2YXIgaGFzQWx0U291cmNlID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnbWVkaWFfYWx0X3NvdXJjZScsIHRydWUpO1xuICAgIH07XG4gICAgdmFyIGhhc1Bvc3RlciA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ21lZGlhX3Bvc3RlcicsIHRydWUpO1xuICAgIH07XG4gICAgdmFyIGhhc0RpbWVuc2lvbnMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdtZWRpYV9kaW1lbnNpb25zJywgdHJ1ZSk7XG4gICAgfTtcblxuICAgIHZhciBnbG9iYWwkMSA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuVG9vbHMnKTtcblxuICAgIHZhciBnbG9iYWwkMiA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLmRvbS5ET01VdGlscycpO1xuXG4gICAgdmFyIGdsb2JhbCQzID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuaHRtbC5TYXhQYXJzZXInKTtcblxuICAgIHZhciBnZXRWaWRlb1NjcmlwdE1hdGNoID0gZnVuY3Rpb24gKHByZWZpeGVzLCBzcmMpIHtcbiAgICAgIGlmIChwcmVmaXhlcykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHNyYy5pbmRleE9mKHByZWZpeGVzW2ldLmZpbHRlcikgIT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJlZml4ZXNbaV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBET00gPSBnbG9iYWwkMi5ET007XG4gICAgdmFyIHRyaW1QeCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL3B4JC8sICcnKTtcbiAgICB9O1xuICAgIHZhciBnZXRFcGhveEVtYmVkRGF0YSA9IGZ1bmN0aW9uIChhdHRycykge1xuICAgICAgdmFyIHN0eWxlID0gYXR0cnMubWFwLnN0eWxlO1xuICAgICAgdmFyIHN0eWxlcyA9IHN0eWxlID8gRE9NLnBhcnNlU3R5bGUoc3R5bGUpIDoge307XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnZXBob3gtZW1iZWQtaXJpJyxcbiAgICAgICAgc291cmNlOiBhdHRycy5tYXBbJ2RhdGEtZXBob3gtZW1iZWQtaXJpJ10sXG4gICAgICAgIGFsdHNvdXJjZTogJycsXG4gICAgICAgIHBvc3RlcjogJycsXG4gICAgICAgIHdpZHRoOiBnZXQoc3R5bGVzLCAnbWF4LXdpZHRoJykubWFwKHRyaW1QeCkuZ2V0T3IoJycpLFxuICAgICAgICBoZWlnaHQ6IGdldChzdHlsZXMsICdtYXgtaGVpZ2h0JykubWFwKHRyaW1QeCkuZ2V0T3IoJycpXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGh0bWxUb0RhdGEgPSBmdW5jdGlvbiAocHJlZml4ZXMsIGh0bWwpIHtcbiAgICAgIHZhciBpc0VwaG94RW1iZWQgPSBDZWxsKGZhbHNlKTtcbiAgICAgIHZhciBkYXRhID0ge307XG4gICAgICBnbG9iYWwkMyh7XG4gICAgICAgIHZhbGlkYXRlOiBmYWxzZSxcbiAgICAgICAgYWxsb3dfY29uZGl0aW9uYWxfY29tbWVudHM6IHRydWUsXG4gICAgICAgIHN0YXJ0OiBmdW5jdGlvbiAobmFtZSwgYXR0cnMpIHtcbiAgICAgICAgICBpZiAoaXNFcGhveEVtYmVkLmdldCgpKSA7IGVsc2UgaWYgKGhhcyhhdHRycy5tYXAsICdkYXRhLWVwaG94LWVtYmVkLWlyaScpKSB7XG4gICAgICAgICAgICBpc0VwaG94RW1iZWQuc2V0KHRydWUpO1xuICAgICAgICAgICAgZGF0YSA9IGdldEVwaG94RW1iZWREYXRhKGF0dHJzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFkYXRhLnNvdXJjZSAmJiBuYW1lID09PSAncGFyYW0nKSB7XG4gICAgICAgICAgICAgIGRhdGEuc291cmNlID0gYXR0cnMubWFwLm1vdmllO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5hbWUgPT09ICdpZnJhbWUnIHx8IG5hbWUgPT09ICdvYmplY3QnIHx8IG5hbWUgPT09ICdlbWJlZCcgfHwgbmFtZSA9PT0gJ3ZpZGVvJyB8fCBuYW1lID09PSAnYXVkaW8nKSB7XG4gICAgICAgICAgICAgIGlmICghZGF0YS50eXBlKSB7XG4gICAgICAgICAgICAgICAgZGF0YS50eXBlID0gbmFtZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkYXRhID0gZ2xvYmFsJDEuZXh0ZW5kKGF0dHJzLm1hcCwgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gJ3NjcmlwdCcpIHtcbiAgICAgICAgICAgICAgdmFyIHZpZGVvU2NyaXB0ID0gZ2V0VmlkZW9TY3JpcHRNYXRjaChwcmVmaXhlcywgYXR0cnMubWFwLnNyYyk7XG4gICAgICAgICAgICAgIGlmICghdmlkZW9TY3JpcHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc2NyaXB0JyxcbiAgICAgICAgICAgICAgICBzb3VyY2U6IGF0dHJzLm1hcC5zcmMsXG4gICAgICAgICAgICAgICAgd2lkdGg6IFN0cmluZyh2aWRlb1NjcmlwdC53aWR0aCksXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBTdHJpbmcodmlkZW9TY3JpcHQuaGVpZ2h0KVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5hbWUgPT09ICdzb3VyY2UnKSB7XG4gICAgICAgICAgICAgIGlmICghZGF0YS5zb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBkYXRhLnNvdXJjZSA9IGF0dHJzLm1hcC5zcmM7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoIWRhdGEuYWx0c291cmNlKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5hbHRzb3VyY2UgPSBhdHRycy5tYXAuc3JjO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gJ2ltZycgJiYgIWRhdGEucG9zdGVyKSB7XG4gICAgICAgICAgICAgIGRhdGEucG9zdGVyID0gYXR0cnMubWFwLnNyYztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pLnBhcnNlKGh0bWwpO1xuICAgICAgZGF0YS5zb3VyY2UgPSBkYXRhLnNvdXJjZSB8fCBkYXRhLnNyYyB8fCBkYXRhLmRhdGE7XG4gICAgICBkYXRhLmFsdHNvdXJjZSA9IGRhdGEuYWx0c291cmNlIHx8ICcnO1xuICAgICAgZGF0YS5wb3N0ZXIgPSBkYXRhLnBvc3RlciB8fCAnJztcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG5cbiAgICB2YXIgZ3Vlc3MgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICB2YXIgbWltZXMgPSB7XG4gICAgICAgIG1wMzogJ2F1ZGlvL21wZWcnLFxuICAgICAgICBtNGE6ICdhdWRpby94LW00YScsXG4gICAgICAgIHdhdjogJ2F1ZGlvL3dhdicsXG4gICAgICAgIG1wNDogJ3ZpZGVvL21wNCcsXG4gICAgICAgIHdlYm06ICd2aWRlby93ZWJtJyxcbiAgICAgICAgb2dnOiAndmlkZW8vb2dnJyxcbiAgICAgICAgc3dmOiAnYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnXG4gICAgICB9O1xuICAgICAgdmFyIGZpbGVFbmQgPSB1cmwudG9Mb3dlckNhc2UoKS5zcGxpdCgnLicpLnBvcCgpO1xuICAgICAgdmFyIG1pbWUgPSBtaW1lc1tmaWxlRW5kXTtcbiAgICAgIHJldHVybiBtaW1lID8gbWltZSA6ICcnO1xuICAgIH07XG5cbiAgICB2YXIgZ2xvYmFsJDQgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5odG1sLlNjaGVtYScpO1xuXG4gICAgdmFyIGdsb2JhbCQ1ID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuaHRtbC5Xcml0ZXInKTtcblxuICAgIHZhciBET00kMSA9IGdsb2JhbCQyLkRPTTtcbiAgICB2YXIgYWRkUHggPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiAvXlswLTkuXSskLy50ZXN0KHZhbHVlKSA/IHZhbHVlICsgJ3B4JyA6IHZhbHVlO1xuICAgIH07XG4gICAgdmFyIHNldEF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoYXR0cnMsIHVwZGF0ZWRBdHRycykge1xuICAgICAgZWFjaCQxKHVwZGF0ZWRBdHRycywgZnVuY3Rpb24gKHZhbCwgbmFtZSkge1xuICAgICAgICB2YXIgdmFsdWUgPSAnJyArIHZhbDtcbiAgICAgICAgaWYgKGF0dHJzLm1hcFtuYW1lXSkge1xuICAgICAgICAgIHZhciBpID0gYXR0cnMubGVuZ3RoO1xuICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgIHZhciBhdHRyID0gYXR0cnNbaV07XG4gICAgICAgICAgICBpZiAoYXR0ci5uYW1lID09PSBuYW1lKSB7XG4gICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGF0dHJzLm1hcFtuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGF0dHIudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgYXR0cnMubWFwW25hbWVdO1xuICAgICAgICAgICAgICAgIGF0dHJzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgICAgIGF0dHJzLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGF0dHJzLm1hcFtuYW1lXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciB1cGRhdGVFcGhveEVtYmVkID0gZnVuY3Rpb24gKGRhdGEsIGF0dHJzKSB7XG4gICAgICB2YXIgc3R5bGUgPSBhdHRycy5tYXAuc3R5bGU7XG4gICAgICB2YXIgc3R5bGVNYXAgPSBzdHlsZSA/IERPTSQxLnBhcnNlU3R5bGUoc3R5bGUpIDoge307XG4gICAgICBzdHlsZU1hcFsnbWF4LXdpZHRoJ10gPSBhZGRQeChkYXRhLndpZHRoKTtcbiAgICAgIHN0eWxlTWFwWydtYXgtaGVpZ2h0J10gPSBhZGRQeChkYXRhLmhlaWdodCk7XG4gICAgICBzZXRBdHRyaWJ1dGVzKGF0dHJzLCB7IHN0eWxlOiBET00kMS5zZXJpYWxpemVTdHlsZShzdHlsZU1hcCkgfSk7XG4gICAgfTtcbiAgICB2YXIgc291cmNlcyA9IFtcbiAgICAgICdzb3VyY2UnLFxuICAgICAgJ2FsdHNvdXJjZSdcbiAgICBdO1xuICAgIHZhciB1cGRhdGVIdG1sID0gZnVuY3Rpb24gKGh0bWwsIGRhdGEsIHVwZGF0ZUFsbCkge1xuICAgICAgdmFyIHdyaXRlciA9IGdsb2JhbCQ1KCk7XG4gICAgICB2YXIgaXNFcGhveEVtYmVkID0gQ2VsbChmYWxzZSk7XG4gICAgICB2YXIgc291cmNlQ291bnQgPSAwO1xuICAgICAgdmFyIGhhc0ltYWdlO1xuICAgICAgZ2xvYmFsJDMoe1xuICAgICAgICB2YWxpZGF0ZTogZmFsc2UsXG4gICAgICAgIGFsbG93X2NvbmRpdGlvbmFsX2NvbW1lbnRzOiB0cnVlLFxuICAgICAgICBjb21tZW50OiBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICAgIHdyaXRlci5jb21tZW50KHRleHQpO1xuICAgICAgICB9LFxuICAgICAgICBjZGF0YTogZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgICB3cml0ZXIuY2RhdGEodGV4dCk7XG4gICAgICAgIH0sXG4gICAgICAgIHRleHQ6IGZ1bmN0aW9uICh0ZXh0LCByYXcpIHtcbiAgICAgICAgICB3cml0ZXIudGV4dCh0ZXh0LCByYXcpO1xuICAgICAgICB9LFxuICAgICAgICBzdGFydDogZnVuY3Rpb24gKG5hbWUsIGF0dHJzLCBlbXB0eSkge1xuICAgICAgICAgIGlmIChpc0VwaG94RW1iZWQuZ2V0KCkpIDsgZWxzZSBpZiAoaGFzKGF0dHJzLm1hcCwgJ2RhdGEtZXBob3gtZW1iZWQtaXJpJykpIHtcbiAgICAgICAgICAgIGlzRXBob3hFbWJlZC5zZXQodHJ1ZSk7XG4gICAgICAgICAgICB1cGRhdGVFcGhveEVtYmVkKGRhdGEsIGF0dHJzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBjYXNlICd2aWRlbyc6XG4gICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgY2FzZSAnZW1iZWQnOlxuICAgICAgICAgICAgY2FzZSAnaW1nJzpcbiAgICAgICAgICAgIGNhc2UgJ2lmcmFtZSc6XG4gICAgICAgICAgICAgIGlmIChkYXRhLmhlaWdodCAhPT0gdW5kZWZpbmVkICYmIGRhdGEud2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHNldEF0dHJpYnV0ZXMoYXR0cnMsIHtcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiBkYXRhLndpZHRoLFxuICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBkYXRhLmhlaWdodFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHVwZGF0ZUFsbCkge1xuICAgICAgICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgICAgY2FzZSAndmlkZW8nOlxuICAgICAgICAgICAgICAgIHNldEF0dHJpYnV0ZXMoYXR0cnMsIHtcbiAgICAgICAgICAgICAgICAgIHBvc3RlcjogZGF0YS5wb3N0ZXIsXG4gICAgICAgICAgICAgICAgICBzcmM6ICcnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYWx0c291cmNlKSB7XG4gICAgICAgICAgICAgICAgICBzZXRBdHRyaWJ1dGVzKGF0dHJzLCB7IHNyYzogJycgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdpZnJhbWUnOlxuICAgICAgICAgICAgICAgIHNldEF0dHJpYnV0ZXMoYXR0cnMsIHsgc3JjOiBkYXRhLnNvdXJjZSB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnc291cmNlJzpcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlQ291bnQgPCAyKSB7XG4gICAgICAgICAgICAgICAgICBzZXRBdHRyaWJ1dGVzKGF0dHJzLCB7XG4gICAgICAgICAgICAgICAgICAgIHNyYzogZGF0YVtzb3VyY2VzW3NvdXJjZUNvdW50XV0sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGRhdGFbc291cmNlc1tzb3VyY2VDb3VudF0gKyAnbWltZSddXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIGlmICghZGF0YVtzb3VyY2VzW3NvdXJjZUNvdW50XV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzb3VyY2VDb3VudCsrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdpbWcnOlxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5wb3N0ZXIpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaGFzSW1hZ2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHdyaXRlci5zdGFydChuYW1lLCBhdHRycywgZW1wdHkpO1xuICAgICAgICB9LFxuICAgICAgICBlbmQ6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgaWYgKCFpc0VwaG94RW1iZWQuZ2V0KCkpIHtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSAndmlkZW8nICYmIHVwZGF0ZUFsbCkge1xuICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgMjsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhW3NvdXJjZXNbaW5kZXhdXSkge1xuICAgICAgICAgICAgICAgICAgdmFyIGF0dHJzID0gW107XG4gICAgICAgICAgICAgICAgICBhdHRycy5tYXAgPSB7fTtcbiAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2VDb3VudCA8IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEF0dHJpYnV0ZXMoYXR0cnMsIHtcbiAgICAgICAgICAgICAgICAgICAgICBzcmM6IGRhdGFbc291cmNlc1tpbmRleF1dLFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGRhdGFbc291cmNlc1tpbmRleF0gKyAnbWltZSddXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB3cml0ZXIuc3RhcnQoJ3NvdXJjZScsIGF0dHJzLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLnBvc3RlciAmJiBuYW1lID09PSAnb2JqZWN0JyAmJiB1cGRhdGVBbGwgJiYgIWhhc0ltYWdlKSB7XG4gICAgICAgICAgICAgIHZhciBpbWdBdHRycyA9IFtdO1xuICAgICAgICAgICAgICBpbWdBdHRycy5tYXAgPSB7fTtcbiAgICAgICAgICAgICAgc2V0QXR0cmlidXRlcyhpbWdBdHRycywge1xuICAgICAgICAgICAgICAgIHNyYzogZGF0YS5wb3N0ZXIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IGRhdGEud2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBkYXRhLmhlaWdodFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgd3JpdGVyLnN0YXJ0KCdpbWcnLCBpbWdBdHRycywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHdyaXRlci5lbmQobmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH0sIGdsb2JhbCQ0KHt9KSkucGFyc2UoaHRtbCk7XG4gICAgICByZXR1cm4gd3JpdGVyLmdldENvbnRlbnQoKTtcbiAgICB9O1xuXG4gICAgdmFyIHVybFBhdHRlcm5zID0gW1xuICAgICAge1xuICAgICAgICByZWdleDogL3lvdXR1XFwuYmVcXC8oW1xcd1xcLV9cXD8mPS5dKykvaSxcbiAgICAgICAgdHlwZTogJ2lmcmFtZScsXG4gICAgICAgIHc6IDU2MCxcbiAgICAgICAgaDogMzE0LFxuICAgICAgICB1cmw6ICd3d3cueW91dHViZS5jb20vZW1iZWQvJDEnLFxuICAgICAgICBhbGxvd0Z1bGxzY3JlZW46IHRydWVcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJlZ2V4OiAveW91dHViZVxcLmNvbSguKyl2PShbXiZdKykoJihbYS16MC05Jj1cXC1fXSspKT8vaSxcbiAgICAgICAgdHlwZTogJ2lmcmFtZScsXG4gICAgICAgIHc6IDU2MCxcbiAgICAgICAgaDogMzE0LFxuICAgICAgICB1cmw6ICd3d3cueW91dHViZS5jb20vZW1iZWQvJDI/JDQnLFxuICAgICAgICBhbGxvd0Z1bGxzY3JlZW46IHRydWVcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJlZ2V4OiAveW91dHViZS5jb21cXC9lbWJlZFxcLyhbYS16MC05XFw/Jj1cXC1fXSspL2ksXG4gICAgICAgIHR5cGU6ICdpZnJhbWUnLFxuICAgICAgICB3OiA1NjAsXG4gICAgICAgIGg6IDMxNCxcbiAgICAgICAgdXJsOiAnd3d3LnlvdXR1YmUuY29tL2VtYmVkLyQxJyxcbiAgICAgICAgYWxsb3dGdWxsc2NyZWVuOiB0cnVlXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICByZWdleDogL3ZpbWVvXFwuY29tXFwvKFswLTldKykvLFxuICAgICAgICB0eXBlOiAnaWZyYW1lJyxcbiAgICAgICAgdzogNDI1LFxuICAgICAgICBoOiAzNTAsXG4gICAgICAgIHVybDogJ3BsYXllci52aW1lby5jb20vdmlkZW8vJDE/dGl0bGU9MCZieWxpbmU9MCZwb3J0cmFpdD0wJmNvbG9yPThkYzdkYycsXG4gICAgICAgIGFsbG93RnVsbHNjcmVlbjogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcmVnZXg6IC92aW1lb1xcLmNvbVxcLyguKilcXC8oWzAtOV0rKS8sXG4gICAgICAgIHR5cGU6ICdpZnJhbWUnLFxuICAgICAgICB3OiA0MjUsXG4gICAgICAgIGg6IDM1MCxcbiAgICAgICAgdXJsOiAncGxheWVyLnZpbWVvLmNvbS92aWRlby8kMj90aXRsZT0wJmFtcDtieWxpbmU9MCcsXG4gICAgICAgIGFsbG93RnVsbHNjcmVlbjogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcmVnZXg6IC9tYXBzXFwuZ29vZ2xlXFwuKFthLXpdezIsM30pXFwvbWFwc1xcLyguKyltc2lkPSguKykvLFxuICAgICAgICB0eXBlOiAnaWZyYW1lJyxcbiAgICAgICAgdzogNDI1LFxuICAgICAgICBoOiAzNTAsXG4gICAgICAgIHVybDogJ21hcHMuZ29vZ2xlLmNvbS9tYXBzL21zP21zaWQ9JDImb3V0cHV0PWVtYmVkXCInLFxuICAgICAgICBhbGxvd0Z1bGxzY3JlZW46IGZhbHNlXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICByZWdleDogL2RhaWx5bW90aW9uXFwuY29tXFwvdmlkZW9cXC8oW15fXSspLyxcbiAgICAgICAgdHlwZTogJ2lmcmFtZScsXG4gICAgICAgIHc6IDQ4MCxcbiAgICAgICAgaDogMjcwLFxuICAgICAgICB1cmw6ICd3d3cuZGFpbHltb3Rpb24uY29tL2VtYmVkL3ZpZGVvLyQxJyxcbiAgICAgICAgYWxsb3dGdWxsc2NyZWVuOiB0cnVlXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICByZWdleDogL2RhaVxcLmx5XFwvKFteX10rKS8sXG4gICAgICAgIHR5cGU6ICdpZnJhbWUnLFxuICAgICAgICB3OiA0ODAsXG4gICAgICAgIGg6IDI3MCxcbiAgICAgICAgdXJsOiAnd3d3LmRhaWx5bW90aW9uLmNvbS9lbWJlZC92aWRlby8kMScsXG4gICAgICAgIGFsbG93RnVsbHNjcmVlbjogdHJ1ZVxuICAgICAgfVxuICAgIF07XG4gICAgdmFyIGdldFByb3RvY29sID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgdmFyIHByb3RvY29sTWF0Y2hlcyA9IHVybC5tYXRjaCgvXihodHRwcz86XFwvXFwvfHd3d1xcLikoLispJC9pKTtcbiAgICAgIGlmIChwcm90b2NvbE1hdGNoZXMgJiYgcHJvdG9jb2xNYXRjaGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgcmV0dXJuIHByb3RvY29sTWF0Y2hlc1sxXSA9PT0gJ3d3dy4nID8gJ2h0dHBzOi8vJyA6IHByb3RvY29sTWF0Y2hlc1sxXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAnaHR0cHM6Ly8nO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGdldFVybCA9IGZ1bmN0aW9uIChwYXR0ZXJuLCB1cmwpIHtcbiAgICAgIHZhciBwcm90b2NvbCA9IGdldFByb3RvY29sKHVybCk7XG4gICAgICB2YXIgbWF0Y2ggPSBwYXR0ZXJuLnJlZ2V4LmV4ZWModXJsKTtcbiAgICAgIHZhciBuZXdVcmwgPSBwcm90b2NvbCArIHBhdHRlcm4udXJsO1xuICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICBuZXdVcmwgPSBuZXdVcmwucmVwbGFjZSgnJCcgKyBpLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIG1hdGNoW2ldID8gbWF0Y2hbaV0gOiAnJztcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXRjaC5sZW5ndGg7IGkrKykge1xuICAgICAgICBfbG9vcF8xKGkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ld1VybC5yZXBsYWNlKC9cXD8kLywgJycpO1xuICAgIH07XG4gICAgdmFyIG1hdGNoUGF0dGVybiA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgIHZhciBwYXR0ZXJucyA9IHVybFBhdHRlcm5zLmZpbHRlcihmdW5jdGlvbiAocGF0dGVybikge1xuICAgICAgICByZXR1cm4gcGF0dGVybi5yZWdleC50ZXN0KHVybCk7XG4gICAgICB9KTtcbiAgICAgIGlmIChwYXR0ZXJucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBnbG9iYWwkMS5leHRlbmQoe30sIHBhdHRlcm5zWzBdLCB7IHVybDogZ2V0VXJsKHBhdHRlcm5zWzBdLCB1cmwpIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBnZXRJZnJhbWVIdG1sID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciBhbGxvd0Z1bGxzY3JlZW4gPSBkYXRhLmFsbG93RnVsbHNjcmVlbiA/ICcgYWxsb3dGdWxsc2NyZWVuPVwiMVwiJyA6ICcnO1xuICAgICAgcmV0dXJuICc8aWZyYW1lIHNyYz1cIicgKyBkYXRhLnNvdXJjZSArICdcIiB3aWR0aD1cIicgKyBkYXRhLndpZHRoICsgJ1wiIGhlaWdodD1cIicgKyBkYXRhLmhlaWdodCArICdcIicgKyBhbGxvd0Z1bGxzY3JlZW4gKyAnPjwvaWZyYW1lPic7XG4gICAgfTtcbiAgICB2YXIgZ2V0Rmxhc2hIdG1sID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciBodG1sID0gJzxvYmplY3QgZGF0YT1cIicgKyBkYXRhLnNvdXJjZSArICdcIiB3aWR0aD1cIicgKyBkYXRhLndpZHRoICsgJ1wiIGhlaWdodD1cIicgKyBkYXRhLmhlaWdodCArICdcIiB0eXBlPVwiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIj4nO1xuICAgICAgaWYgKGRhdGEucG9zdGVyKSB7XG4gICAgICAgIGh0bWwgKz0gJzxpbWcgc3JjPVwiJyArIGRhdGEucG9zdGVyICsgJ1wiIHdpZHRoPVwiJyArIGRhdGEud2lkdGggKyAnXCIgaGVpZ2h0PVwiJyArIGRhdGEuaGVpZ2h0ICsgJ1wiIC8+JztcbiAgICAgIH1cbiAgICAgIGh0bWwgKz0gJzwvb2JqZWN0Pic7XG4gICAgICByZXR1cm4gaHRtbDtcbiAgICB9O1xuICAgIHZhciBnZXRBdWRpb0h0bWwgPSBmdW5jdGlvbiAoZGF0YSwgYXVkaW9UZW1wbGF0ZUNhbGxiYWNrKSB7XG4gICAgICBpZiAoYXVkaW9UZW1wbGF0ZUNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBhdWRpb1RlbXBsYXRlQ2FsbGJhY2soZGF0YSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gJzxhdWRpbyBjb250cm9scz1cImNvbnRyb2xzXCIgc3JjPVwiJyArIGRhdGEuc291cmNlICsgJ1wiPicgKyAoZGF0YS5hbHRzb3VyY2UgPyAnXFxuPHNvdXJjZSBzcmM9XCInICsgZGF0YS5hbHRzb3VyY2UgKyAnXCInICsgKGRhdGEuYWx0c291cmNlbWltZSA/ICcgdHlwZT1cIicgKyBkYXRhLmFsdHNvdXJjZW1pbWUgKyAnXCInIDogJycpICsgJyAvPlxcbicgOiAnJykgKyAnPC9hdWRpbz4nO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGdldFZpZGVvSHRtbCA9IGZ1bmN0aW9uIChkYXRhLCB2aWRlb1RlbXBsYXRlQ2FsbGJhY2spIHtcbiAgICAgIGlmICh2aWRlb1RlbXBsYXRlQ2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHZpZGVvVGVtcGxhdGVDYWxsYmFjayhkYXRhKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAnPHZpZGVvIHdpZHRoPVwiJyArIGRhdGEud2lkdGggKyAnXCIgaGVpZ2h0PVwiJyArIGRhdGEuaGVpZ2h0ICsgJ1wiJyArIChkYXRhLnBvc3RlciA/ICcgcG9zdGVyPVwiJyArIGRhdGEucG9zdGVyICsgJ1wiJyA6ICcnKSArICcgY29udHJvbHM9XCJjb250cm9sc1wiPlxcbicgKyAnPHNvdXJjZSBzcmM9XCInICsgZGF0YS5zb3VyY2UgKyAnXCInICsgKGRhdGEuc291cmNlbWltZSA/ICcgdHlwZT1cIicgKyBkYXRhLnNvdXJjZW1pbWUgKyAnXCInIDogJycpICsgJyAvPlxcbicgKyAoZGF0YS5hbHRzb3VyY2UgPyAnPHNvdXJjZSBzcmM9XCInICsgZGF0YS5hbHRzb3VyY2UgKyAnXCInICsgKGRhdGEuYWx0c291cmNlbWltZSA/ICcgdHlwZT1cIicgKyBkYXRhLmFsdHNvdXJjZW1pbWUgKyAnXCInIDogJycpICsgJyAvPlxcbicgOiAnJykgKyAnPC92aWRlbz4nO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGdldFNjcmlwdEh0bWwgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgcmV0dXJuICc8c2NyaXB0IHNyYz1cIicgKyBkYXRhLnNvdXJjZSArICdcIj48L3NjcmlwdD4nO1xuICAgIH07XG4gICAgdmFyIGRhdGFUb0h0bWwgPSBmdW5jdGlvbiAoZWRpdG9yLCBkYXRhSW4pIHtcbiAgICAgIHZhciBkYXRhID0gZ2xvYmFsJDEuZXh0ZW5kKHt9LCBkYXRhSW4pO1xuICAgICAgaWYgKCFkYXRhLnNvdXJjZSkge1xuICAgICAgICBnbG9iYWwkMS5leHRlbmQoZGF0YSwgaHRtbFRvRGF0YShnZXRTY3JpcHRzKGVkaXRvciksIGRhdGEuZW1iZWQpKTtcbiAgICAgICAgaWYgKCFkYXRhLnNvdXJjZSkge1xuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFkYXRhLmFsdHNvdXJjZSkge1xuICAgICAgICBkYXRhLmFsdHNvdXJjZSA9ICcnO1xuICAgICAgfVxuICAgICAgaWYgKCFkYXRhLnBvc3Rlcikge1xuICAgICAgICBkYXRhLnBvc3RlciA9ICcnO1xuICAgICAgfVxuICAgICAgZGF0YS5zb3VyY2UgPSBlZGl0b3IuY29udmVydFVSTChkYXRhLnNvdXJjZSwgJ3NvdXJjZScpO1xuICAgICAgZGF0YS5hbHRzb3VyY2UgPSBlZGl0b3IuY29udmVydFVSTChkYXRhLmFsdHNvdXJjZSwgJ3NvdXJjZScpO1xuICAgICAgZGF0YS5zb3VyY2VtaW1lID0gZ3Vlc3MoZGF0YS5zb3VyY2UpO1xuICAgICAgZGF0YS5hbHRzb3VyY2VtaW1lID0gZ3Vlc3MoZGF0YS5hbHRzb3VyY2UpO1xuICAgICAgZGF0YS5wb3N0ZXIgPSBlZGl0b3IuY29udmVydFVSTChkYXRhLnBvc3RlciwgJ3Bvc3RlcicpO1xuICAgICAgdmFyIHBhdHRlcm4gPSBtYXRjaFBhdHRlcm4oZGF0YS5zb3VyY2UpO1xuICAgICAgaWYgKHBhdHRlcm4pIHtcbiAgICAgICAgZGF0YS5zb3VyY2UgPSBwYXR0ZXJuLnVybDtcbiAgICAgICAgZGF0YS50eXBlID0gcGF0dGVybi50eXBlO1xuICAgICAgICBkYXRhLmFsbG93RnVsbHNjcmVlbiA9IHBhdHRlcm4uYWxsb3dGdWxsc2NyZWVuO1xuICAgICAgICBkYXRhLndpZHRoID0gZGF0YS53aWR0aCB8fCBTdHJpbmcocGF0dGVybi53KTtcbiAgICAgICAgZGF0YS5oZWlnaHQgPSBkYXRhLmhlaWdodCB8fCBTdHJpbmcocGF0dGVybi5oKTtcbiAgICAgIH1cbiAgICAgIGlmIChkYXRhLmVtYmVkKSB7XG4gICAgICAgIHJldHVybiB1cGRhdGVIdG1sKGRhdGEuZW1iZWQsIGRhdGEsIHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHZpZGVvU2NyaXB0ID0gZ2V0VmlkZW9TY3JpcHRNYXRjaChnZXRTY3JpcHRzKGVkaXRvciksIGRhdGEuc291cmNlKTtcbiAgICAgICAgaWYgKHZpZGVvU2NyaXB0KSB7XG4gICAgICAgICAgZGF0YS50eXBlID0gJ3NjcmlwdCc7XG4gICAgICAgICAgZGF0YS53aWR0aCA9IFN0cmluZyh2aWRlb1NjcmlwdC53aWR0aCk7XG4gICAgICAgICAgZGF0YS5oZWlnaHQgPSBTdHJpbmcodmlkZW9TY3JpcHQuaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYXVkaW9UZW1wbGF0ZUNhbGxiYWNrID0gZ2V0QXVkaW9UZW1wbGF0ZUNhbGxiYWNrKGVkaXRvcik7XG4gICAgICAgIHZhciB2aWRlb1RlbXBsYXRlQ2FsbGJhY2sgPSBnZXRWaWRlb1RlbXBsYXRlQ2FsbGJhY2soZWRpdG9yKTtcbiAgICAgICAgZGF0YS53aWR0aCA9IGRhdGEud2lkdGggfHwgJzMwMCc7XG4gICAgICAgIGRhdGEuaGVpZ2h0ID0gZGF0YS5oZWlnaHQgfHwgJzE1MCc7XG4gICAgICAgIGdsb2JhbCQxLmVhY2goZGF0YSwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICBkYXRhW2tleV0gPSBlZGl0b3IuZG9tLmVuY29kZSgnJyArIHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChkYXRhLnR5cGUgPT09ICdpZnJhbWUnKSB7XG4gICAgICAgICAgcmV0dXJuIGdldElmcmFtZUh0bWwoZGF0YSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5zb3VyY2VtaW1lID09PSAnYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEZsYXNoSHRtbChkYXRhKTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLnNvdXJjZW1pbWUuaW5kZXhPZignYXVkaW8nKSAhPT0gLTEpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0QXVkaW9IdG1sKGRhdGEsIGF1ZGlvVGVtcGxhdGVDYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS50eXBlID09PSAnc2NyaXB0Jykge1xuICAgICAgICAgIHJldHVybiBnZXRTY3JpcHRIdG1sKGRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBnZXRWaWRlb0h0bWwoZGF0YSwgdmlkZW9UZW1wbGF0ZUNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgZ2xvYmFsJDYgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS51dGlsLlByb21pc2UnKTtcblxuICAgIHZhciBjYWNoZSA9IHt9O1xuICAgIHZhciBlbWJlZFByb21pc2UgPSBmdW5jdGlvbiAoZGF0YSwgZGF0YVRvSHRtbCwgaGFuZGxlcikge1xuICAgICAgcmV0dXJuIG5ldyBnbG9iYWwkNihmdW5jdGlvbiAocmVzLCByZWopIHtcbiAgICAgICAgdmFyIHdyYXBwZWRSZXNvbHZlID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLmh0bWwpIHtcbiAgICAgICAgICAgIGNhY2hlW2RhdGEuc291cmNlXSA9IHJlc3BvbnNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzKHtcbiAgICAgICAgICAgIHVybDogZGF0YS5zb3VyY2UsXG4gICAgICAgICAgICBodG1sOiByZXNwb25zZS5odG1sID8gcmVzcG9uc2UuaHRtbCA6IGRhdGFUb0h0bWwoZGF0YSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGNhY2hlW2RhdGEuc291cmNlXSkge1xuICAgICAgICAgIHdyYXBwZWRSZXNvbHZlKGNhY2hlW2RhdGEuc291cmNlXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGFuZGxlcih7IHVybDogZGF0YS5zb3VyY2UgfSwgd3JhcHBlZFJlc29sdmUsIHJlaik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGRlZmF1bHRQcm9taXNlID0gZnVuY3Rpb24gKGRhdGEsIGRhdGFUb0h0bWwpIHtcbiAgICAgIHJldHVybiBuZXcgZ2xvYmFsJDYoZnVuY3Rpb24gKHJlcykge1xuICAgICAgICByZXMoe1xuICAgICAgICAgIGh0bWw6IGRhdGFUb0h0bWwoZGF0YSksXG4gICAgICAgICAgdXJsOiBkYXRhLnNvdXJjZVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGxvYWRlZERhdGEgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGRhdGFUb0h0bWwoZWRpdG9yLCBkYXRhKTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgZ2V0RW1iZWRIdG1sID0gZnVuY3Rpb24gKGVkaXRvciwgZGF0YSkge1xuICAgICAgdmFyIGVtYmVkSGFuZGxlciA9IGdldFVybFJlc29sdmVyKGVkaXRvcik7XG4gICAgICByZXR1cm4gZW1iZWRIYW5kbGVyID8gZW1iZWRQcm9taXNlKGRhdGEsIGxvYWRlZERhdGEoZWRpdG9yKSwgZW1iZWRIYW5kbGVyKSA6IGRlZmF1bHRQcm9taXNlKGRhdGEsIGxvYWRlZERhdGEoZWRpdG9yKSk7XG4gICAgfTtcbiAgICB2YXIgaXNDYWNoZWQgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICByZXR1cm4gY2FjaGUuaGFzT3duUHJvcGVydHkodXJsKTtcbiAgICB9O1xuXG4gICAgdmFyIGV4dHJhY3RNZXRhID0gZnVuY3Rpb24gKHNvdXJjZUlucHV0LCBkYXRhKSB7XG4gICAgICByZXR1cm4gZ2V0KGRhdGEsIHNvdXJjZUlucHV0KS5iaW5kKGZ1bmN0aW9uIChtYWluRGF0YSkge1xuICAgICAgICByZXR1cm4gZ2V0KG1haW5EYXRhLCAnbWV0YScpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgZ2V0VmFsdWUgPSBmdW5jdGlvbiAoZGF0YSwgbWV0YURhdGEsIHNvdXJjZUlucHV0KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB2YXIgZ2V0RnJvbURhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGdldChkYXRhLCBwcm9wKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGdldEZyb21NZXRhRGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0KG1ldGFEYXRhLCBwcm9wKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGdldE5vbkVtcHR5VmFsdWUgPSBmdW5jdGlvbiAoYykge1xuICAgICAgICAgIHJldHVybiBnZXQoYywgJ3ZhbHVlJykuYmluZChmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgcmV0dXJuIHYubGVuZ3RoID4gMCA/IE9wdGlvbi5zb21lKHYpIDogT3B0aW9uLm5vbmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGdldEZyb21WYWx1ZUZpcnN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBnZXRGcm9tRGF0YSgpLmJpbmQoZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNPYmplY3QoY2hpbGQpID8gZ2V0Tm9uRW1wdHlWYWx1ZShjaGlsZCkub3JUaHVuayhnZXRGcm9tTWV0YURhdGEpIDogZ2V0RnJvbU1ldGFEYXRhKCkub3JUaHVuayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBPcHRpb24uZnJvbShjaGlsZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGdldEZyb21NZXRhRmlyc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGdldEZyb21NZXRhRGF0YSgpLm9yVGh1bmsoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldEZyb21EYXRhKCkuYmluZChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGlzT2JqZWN0KGNoaWxkKSA/IGdldE5vbkVtcHR5VmFsdWUoY2hpbGQpIDogT3B0aW9uLmZyb20oY2hpbGQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfYSA9IHt9LCBfYVtwcm9wXSA9IChwcm9wID09PSBzb3VyY2VJbnB1dCA/IGdldEZyb21WYWx1ZUZpcnN0KCkgOiBnZXRGcm9tTWV0YUZpcnN0KCkpLmdldE9yKCcnKSwgX2E7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIGdldERpbWVuc2lvbnMgPSBmdW5jdGlvbiAoZGF0YSwgbWV0YURhdGEpIHtcbiAgICAgIHZhciBkaW1lbnNpb25zID0ge307XG4gICAgICBnZXQoZGF0YSwgJ2RpbWVuc2lvbnMnKS5lYWNoKGZ1bmN0aW9uIChkaW1zKSB7XG4gICAgICAgIGVhY2goW1xuICAgICAgICAgICd3aWR0aCcsXG4gICAgICAgICAgJ2hlaWdodCdcbiAgICAgICAgXSwgZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgICBnZXQobWV0YURhdGEsIHByb3ApLm9yVGh1bmsoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldChkaW1zLCBwcm9wKTtcbiAgICAgICAgICB9KS5lYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGRpbWVuc2lvbnNbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBkaW1lbnNpb25zO1xuICAgIH07XG4gICAgdmFyIHVud3JhcCA9IGZ1bmN0aW9uIChkYXRhLCBzb3VyY2VJbnB1dCkge1xuICAgICAgdmFyIG1ldGFEYXRhID0gc291cmNlSW5wdXQgPyBleHRyYWN0TWV0YShzb3VyY2VJbnB1dCwgZGF0YSkuZ2V0T3Ioe30pIDoge307XG4gICAgICB2YXIgZ2V0ID0gZ2V0VmFsdWUoZGF0YSwgbWV0YURhdGEsIHNvdXJjZUlucHV0KTtcbiAgICAgIHJldHVybiBfX2Fzc2lnbihfX2Fzc2lnbihfX2Fzc2lnbihfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZ2V0KCdzb3VyY2UnKSksIGdldCgnYWx0c291cmNlJykpLCBnZXQoJ3Bvc3RlcicpKSwgZ2V0KCdlbWJlZCcpKSwgZ2V0RGltZW5zaW9ucyhkYXRhLCBtZXRhRGF0YSkpO1xuICAgIH07XG4gICAgdmFyIHdyYXAgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgdmFyIHdyYXBwZWQgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZGF0YSksIHtcbiAgICAgICAgc291cmNlOiB7IHZhbHVlOiBnZXQoZGF0YSwgJ3NvdXJjZScpLmdldE9yKCcnKSB9LFxuICAgICAgICBhbHRzb3VyY2U6IHsgdmFsdWU6IGdldChkYXRhLCAnYWx0c291cmNlJykuZ2V0T3IoJycpIH0sXG4gICAgICAgIHBvc3RlcjogeyB2YWx1ZTogZ2V0KGRhdGEsICdwb3N0ZXInKS5nZXRPcignJykgfVxuICAgICAgfSk7XG4gICAgICBlYWNoKFtcbiAgICAgICAgJ3dpZHRoJyxcbiAgICAgICAgJ2hlaWdodCdcbiAgICAgIF0sIGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgIGdldChkYXRhLCBwcm9wKS5lYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIHZhciBkaW1lbnNpb25zID0gd3JhcHBlZC5kaW1lbnNpb25zIHx8IHt9O1xuICAgICAgICAgIGRpbWVuc2lvbnNbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICB3cmFwcGVkLmRpbWVuc2lvbnMgPSBkaW1lbnNpb25zO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHdyYXBwZWQ7XG4gICAgfTtcbiAgICB2YXIgaGFuZGxlRXJyb3IgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBlcnJvciAmJiBlcnJvci5tc2cgPyAnTWVkaWEgZW1iZWQgaGFuZGxlciBlcnJvcjogJyArIGVycm9yLm1zZyA6ICdNZWRpYSBlbWJlZCBoYW5kbGVyIHRocmV3IHVua25vd24gZXJyb3IuJztcbiAgICAgICAgZWRpdG9yLm5vdGlmaWNhdGlvbk1hbmFnZXIub3Blbih7XG4gICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICB0ZXh0OiBlcnJvck1lc3NhZ2VcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHNuaXBwZXRUb0RhdGEgPSBmdW5jdGlvbiAoZWRpdG9yLCBlbWJlZFNuaXBwZXQpIHtcbiAgICAgIHJldHVybiBodG1sVG9EYXRhKGdldFNjcmlwdHMoZWRpdG9yKSwgZW1iZWRTbmlwcGV0KTtcbiAgICB9O1xuICAgIHZhciBpc01lZGlhRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWNlLW9iamVjdCcpIHx8IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWVwaG94LWVtYmVkLWlyaScpO1xuICAgIH07XG4gICAgdmFyIGdldEVkaXRvckRhdGEgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgZWxlbWVudCA9IGVkaXRvci5zZWxlY3Rpb24uZ2V0Tm9kZSgpO1xuICAgICAgdmFyIHNuaXBwZXQgPSBpc01lZGlhRWxlbWVudChlbGVtZW50KSA/IGVkaXRvci5zZXJpYWxpemVyLnNlcmlhbGl6ZShlbGVtZW50LCB7IHNlbGVjdGlvbjogdHJ1ZSB9KSA6ICcnO1xuICAgICAgcmV0dXJuIF9fYXNzaWduKHsgZW1iZWQ6IHNuaXBwZXQgfSwgaHRtbFRvRGF0YShnZXRTY3JpcHRzKGVkaXRvciksIHNuaXBwZXQpKTtcbiAgICB9O1xuICAgIHZhciBhZGRFbWJlZEh0bWwgPSBmdW5jdGlvbiAoYXBpLCBlZGl0b3IpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKGlzU3RyaW5nKHJlc3BvbnNlLnVybCkgJiYgcmVzcG9uc2UudXJsLnRyaW0oKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdmFyIGh0bWwgPSByZXNwb25zZS5odG1sO1xuICAgICAgICAgIHZhciBzbmlwcGV0RGF0YSA9IHNuaXBwZXRUb0RhdGEoZWRpdG9yLCBodG1sKTtcbiAgICAgICAgICB2YXIgbnVEYXRhID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHNuaXBwZXREYXRhKSwge1xuICAgICAgICAgICAgc291cmNlOiByZXNwb25zZS51cmwsXG4gICAgICAgICAgICBlbWJlZDogaHRtbFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGFwaS5zZXREYXRhKHdyYXAobnVEYXRhKSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgc2VsZWN0UGxhY2Vob2xkZXIgPSBmdW5jdGlvbiAoZWRpdG9yLCBiZWZvcmVPYmplY3RzKSB7XG4gICAgICB2YXIgYWZ0ZXJPYmplY3RzID0gZWRpdG9yLmRvbS5zZWxlY3QoJ2ltZ1tkYXRhLW1jZS1vYmplY3RdJyk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJlZm9yZU9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9yICh2YXIgeSA9IGFmdGVyT2JqZWN0cy5sZW5ndGggLSAxOyB5ID49IDA7IHktLSkge1xuICAgICAgICAgIGlmIChiZWZvcmVPYmplY3RzW2ldID09PSBhZnRlck9iamVjdHNbeV0pIHtcbiAgICAgICAgICAgIGFmdGVyT2JqZWN0cy5zcGxpY2UoeSwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlZGl0b3Iuc2VsZWN0aW9uLnNlbGVjdChhZnRlck9iamVjdHNbMF0pO1xuICAgIH07XG4gICAgdmFyIGhhbmRsZUluc2VydCA9IGZ1bmN0aW9uIChlZGl0b3IsIGh0bWwpIHtcbiAgICAgIHZhciBiZWZvcmVPYmplY3RzID0gZWRpdG9yLmRvbS5zZWxlY3QoJ2ltZ1tkYXRhLW1jZS1vYmplY3RdJyk7XG4gICAgICBlZGl0b3IuaW5zZXJ0Q29udGVudChodG1sKTtcbiAgICAgIHNlbGVjdFBsYWNlaG9sZGVyKGVkaXRvciwgYmVmb3JlT2JqZWN0cyk7XG4gICAgICBlZGl0b3Iubm9kZUNoYW5nZWQoKTtcbiAgICB9O1xuICAgIHZhciBzdWJtaXRGb3JtID0gZnVuY3Rpb24gKHByZXZEYXRhLCBuZXdEYXRhLCBlZGl0b3IpIHtcbiAgICAgIG5ld0RhdGEuZW1iZWQgPSB1cGRhdGVIdG1sKG5ld0RhdGEuZW1iZWQsIG5ld0RhdGEpO1xuICAgICAgaWYgKG5ld0RhdGEuZW1iZWQgJiYgKHByZXZEYXRhLnNvdXJjZSA9PT0gbmV3RGF0YS5zb3VyY2UgfHwgaXNDYWNoZWQobmV3RGF0YS5zb3VyY2UpKSkge1xuICAgICAgICBoYW5kbGVJbnNlcnQoZWRpdG9yLCBuZXdEYXRhLmVtYmVkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdldEVtYmVkSHRtbChlZGl0b3IsIG5ld0RhdGEpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgaGFuZGxlSW5zZXJ0KGVkaXRvciwgcmVzcG9uc2UuaHRtbCk7XG4gICAgICAgIH0pLmNhdGNoKGhhbmRsZUVycm9yKGVkaXRvcikpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHNob3dEaWFsb2cgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgZWRpdG9yRGF0YSA9IGdldEVkaXRvckRhdGEoZWRpdG9yKTtcbiAgICAgIHZhciBjdXJyZW50RGF0YSA9IENlbGwoZWRpdG9yRGF0YSk7XG4gICAgICB2YXIgaW5pdGlhbERhdGEgPSB3cmFwKGVkaXRvckRhdGEpO1xuICAgICAgdmFyIGhhbmRsZVNvdXJjZSA9IGZ1bmN0aW9uIChwcmV2RGF0YSwgYXBpKSB7XG4gICAgICAgIHZhciBzZXJ2aWNlRGF0YSA9IHVud3JhcChhcGkuZ2V0RGF0YSgpLCAnc291cmNlJyk7XG4gICAgICAgIGlmIChwcmV2RGF0YS5zb3VyY2UgIT09IHNlcnZpY2VEYXRhLnNvdXJjZSkge1xuICAgICAgICAgIGFkZEVtYmVkSHRtbCh3aW4sIGVkaXRvcikoe1xuICAgICAgICAgICAgdXJsOiBzZXJ2aWNlRGF0YS5zb3VyY2UsXG4gICAgICAgICAgICBodG1sOiAnJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGdldEVtYmVkSHRtbChlZGl0b3IsIHNlcnZpY2VEYXRhKS50aGVuKGFkZEVtYmVkSHRtbCh3aW4sIGVkaXRvcikpLmNhdGNoKGhhbmRsZUVycm9yKGVkaXRvcikpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdmFyIGhhbmRsZUVtYmVkID0gZnVuY3Rpb24gKGFwaSkge1xuICAgICAgICB2YXIgZGF0YSA9IHVud3JhcChhcGkuZ2V0RGF0YSgpKTtcbiAgICAgICAgdmFyIGRhdGFGcm9tRW1iZWQgPSBzbmlwcGV0VG9EYXRhKGVkaXRvciwgZGF0YS5lbWJlZCk7XG4gICAgICAgIGFwaS5zZXREYXRhKHdyYXAoZGF0YUZyb21FbWJlZCkpO1xuICAgICAgfTtcbiAgICAgIHZhciBoYW5kbGVVcGRhdGUgPSBmdW5jdGlvbiAoYXBpLCBzb3VyY2VJbnB1dCkge1xuICAgICAgICB2YXIgZGF0YSA9IHVud3JhcChhcGkuZ2V0RGF0YSgpLCBzb3VyY2VJbnB1dCk7XG4gICAgICAgIHZhciBlbWJlZCA9IGRhdGFUb0h0bWwoZWRpdG9yLCBkYXRhKTtcbiAgICAgICAgYXBpLnNldERhdGEod3JhcChfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZGF0YSksIHsgZW1iZWQ6IGVtYmVkIH0pKSk7XG4gICAgICB9O1xuICAgICAgdmFyIG1lZGlhSW5wdXQgPSBbe1xuICAgICAgICAgIG5hbWU6ICdzb3VyY2UnLFxuICAgICAgICAgIHR5cGU6ICd1cmxpbnB1dCcsXG4gICAgICAgICAgZmlsZXR5cGU6ICdtZWRpYScsXG4gICAgICAgICAgbGFiZWw6ICdTb3VyY2UnXG4gICAgICAgIH1dO1xuICAgICAgdmFyIHNpemVJbnB1dCA9ICFoYXNEaW1lbnNpb25zKGVkaXRvcikgPyBbXSA6IFt7XG4gICAgICAgICAgdHlwZTogJ3NpemVpbnB1dCcsXG4gICAgICAgICAgbmFtZTogJ2RpbWVuc2lvbnMnLFxuICAgICAgICAgIGxhYmVsOiAnQ29uc3RyYWluIHByb3BvcnRpb25zJyxcbiAgICAgICAgICBjb25zdHJhaW46IHRydWVcbiAgICAgICAgfV07XG4gICAgICB2YXIgZ2VuZXJhbFRhYiA9IHtcbiAgICAgICAgdGl0bGU6ICdHZW5lcmFsJyxcbiAgICAgICAgbmFtZTogJ2dlbmVyYWwnLFxuICAgICAgICBpdGVtczogZmxhdHRlbihbXG4gICAgICAgICAgbWVkaWFJbnB1dCxcbiAgICAgICAgICBzaXplSW5wdXRcbiAgICAgICAgXSlcbiAgICAgIH07XG4gICAgICB2YXIgZW1iZWRUZXh0YXJlYSA9IHtcbiAgICAgICAgdHlwZTogJ3RleHRhcmVhJyxcbiAgICAgICAgbmFtZTogJ2VtYmVkJyxcbiAgICAgICAgbGFiZWw6ICdQYXN0ZSB5b3VyIGVtYmVkIGNvZGUgYmVsb3c6J1xuICAgICAgfTtcbiAgICAgIHZhciBlbWJlZFRhYiA9IHtcbiAgICAgICAgdGl0bGU6ICdFbWJlZCcsXG4gICAgICAgIGl0ZW1zOiBbZW1iZWRUZXh0YXJlYV1cbiAgICAgIH07XG4gICAgICB2YXIgYWR2YW5jZWRGb3JtSXRlbXMgPSBbXTtcbiAgICAgIGlmIChoYXNBbHRTb3VyY2UoZWRpdG9yKSkge1xuICAgICAgICBhZHZhbmNlZEZvcm1JdGVtcy5wdXNoKHtcbiAgICAgICAgICBuYW1lOiAnYWx0c291cmNlJyxcbiAgICAgICAgICB0eXBlOiAndXJsaW5wdXQnLFxuICAgICAgICAgIGZpbGV0eXBlOiAnbWVkaWEnLFxuICAgICAgICAgIGxhYmVsOiAnQWx0ZXJuYXRpdmUgc291cmNlIFVSTCdcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoaGFzUG9zdGVyKGVkaXRvcikpIHtcbiAgICAgICAgYWR2YW5jZWRGb3JtSXRlbXMucHVzaCh7XG4gICAgICAgICAgbmFtZTogJ3Bvc3RlcicsXG4gICAgICAgICAgdHlwZTogJ3VybGlucHV0JyxcbiAgICAgICAgICBmaWxldHlwZTogJ2ltYWdlJyxcbiAgICAgICAgICBsYWJlbDogJ01lZGlhIHBvc3RlciAoSW1hZ2UgVVJMKSdcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB2YXIgYWR2YW5jZWRUYWIgPSB7XG4gICAgICAgIHRpdGxlOiAnQWR2YW5jZWQnLFxuICAgICAgICBuYW1lOiAnYWR2YW5jZWQnLFxuICAgICAgICBpdGVtczogYWR2YW5jZWRGb3JtSXRlbXNcbiAgICAgIH07XG4gICAgICB2YXIgdGFicyA9IFtcbiAgICAgICAgZ2VuZXJhbFRhYixcbiAgICAgICAgZW1iZWRUYWJcbiAgICAgIF07XG4gICAgICBpZiAoYWR2YW5jZWRGb3JtSXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICB0YWJzLnB1c2goYWR2YW5jZWRUYWIpO1xuICAgICAgfVxuICAgICAgdmFyIGJvZHkgPSB7XG4gICAgICAgIHR5cGU6ICd0YWJwYW5lbCcsXG4gICAgICAgIHRhYnM6IHRhYnNcbiAgICAgIH07XG4gICAgICB2YXIgd2luID0gZWRpdG9yLndpbmRvd01hbmFnZXIub3Blbih7XG4gICAgICAgIHRpdGxlOiAnSW5zZXJ0L0VkaXQgTWVkaWEnLFxuICAgICAgICBzaXplOiAnbm9ybWFsJyxcbiAgICAgICAgYm9keTogYm9keSxcbiAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdjYW5jZWwnLFxuICAgICAgICAgICAgbmFtZTogJ2NhbmNlbCcsXG4gICAgICAgICAgICB0ZXh0OiAnQ2FuY2VsJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3N1Ym1pdCcsXG4gICAgICAgICAgICBuYW1lOiAnc2F2ZScsXG4gICAgICAgICAgICB0ZXh0OiAnU2F2ZScsXG4gICAgICAgICAgICBwcmltYXJ5OiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBvblN1Ym1pdDogZnVuY3Rpb24gKGFwaSkge1xuICAgICAgICAgIHZhciBzZXJ2aWNlRGF0YSA9IHVud3JhcChhcGkuZ2V0RGF0YSgpKTtcbiAgICAgICAgICBzdWJtaXRGb3JtKGN1cnJlbnREYXRhLmdldCgpLCBzZXJ2aWNlRGF0YSwgZWRpdG9yKTtcbiAgICAgICAgICBhcGkuY2xvc2UoKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIChhcGksIGRldGFpbCkge1xuICAgICAgICAgIHN3aXRjaCAoZGV0YWlsLm5hbWUpIHtcbiAgICAgICAgICBjYXNlICdzb3VyY2UnOlxuICAgICAgICAgICAgaGFuZGxlU291cmNlKGN1cnJlbnREYXRhLmdldCgpLCBhcGkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnZW1iZWQnOlxuICAgICAgICAgICAgaGFuZGxlRW1iZWQoYXBpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2RpbWVuc2lvbnMnOlxuICAgICAgICAgIGNhc2UgJ2FsdHNvdXJjZSc6XG4gICAgICAgICAgY2FzZSAncG9zdGVyJzpcbiAgICAgICAgICAgIGhhbmRsZVVwZGF0ZShhcGksIGRldGFpbC5uYW1lKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJyZW50RGF0YS5zZXQodW53cmFwKGFwaS5nZXREYXRhKCkpKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5pdGlhbERhdGE6IGluaXRpYWxEYXRhXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIGdldCQxID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIHNob3dEaWFsb2ckMSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2hvd0RpYWxvZyhlZGl0b3IpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiB7IHNob3dEaWFsb2c6IHNob3dEaWFsb2ckMSB9O1xuICAgIH07XG5cbiAgICB2YXIgcmVnaXN0ZXIgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgc2hvd0RpYWxvZyQxID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzaG93RGlhbG9nKGVkaXRvcik7XG4gICAgICB9O1xuICAgICAgZWRpdG9yLmFkZENvbW1hbmQoJ21jZU1lZGlhJywgc2hvd0RpYWxvZyQxKTtcbiAgICB9O1xuXG4gICAgdmFyIGdsb2JhbCQ3ID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuaHRtbC5Ob2RlJyk7XG5cbiAgICB2YXIgZ2xvYmFsJDggPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5FbnYnKTtcblxuICAgIHZhciBzYW5pdGl6ZSA9IGZ1bmN0aW9uIChlZGl0b3IsIGh0bWwpIHtcbiAgICAgIGlmIChzaG91bGRGaWx0ZXJIdG1sKGVkaXRvcikgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBodG1sO1xuICAgICAgfVxuICAgICAgdmFyIHdyaXRlciA9IGdsb2JhbCQ1KCk7XG4gICAgICB2YXIgYmxvY2tlZDtcbiAgICAgIGdsb2JhbCQzKHtcbiAgICAgICAgdmFsaWRhdGU6IGZhbHNlLFxuICAgICAgICBhbGxvd19jb25kaXRpb25hbF9jb21tZW50czogZmFsc2UsXG4gICAgICAgIGNvbW1lbnQ6IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgICAgd3JpdGVyLmNvbW1lbnQodGV4dCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNkYXRhOiBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICAgIHdyaXRlci5jZGF0YSh0ZXh0KTtcbiAgICAgICAgfSxcbiAgICAgICAgdGV4dDogZnVuY3Rpb24gKHRleHQsIHJhdykge1xuICAgICAgICAgIHdyaXRlci50ZXh0KHRleHQsIHJhdyk7XG4gICAgICAgIH0sXG4gICAgICAgIHN0YXJ0OiBmdW5jdGlvbiAobmFtZSwgYXR0cnMsIGVtcHR5KSB7XG4gICAgICAgICAgYmxvY2tlZCA9IHRydWU7XG4gICAgICAgICAgaWYgKG5hbWUgPT09ICdzY3JpcHQnIHx8IG5hbWUgPT09ICdub3NjcmlwdCcgfHwgbmFtZSA9PT0gJ3N2ZycpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yICh2YXIgaSA9IGF0dHJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICB2YXIgYXR0ck5hbWUgPSBhdHRyc1tpXS5uYW1lO1xuICAgICAgICAgICAgaWYgKGF0dHJOYW1lLmluZGV4T2YoJ29uJykgPT09IDApIHtcbiAgICAgICAgICAgICAgZGVsZXRlIGF0dHJzLm1hcFthdHRyTmFtZV07XG4gICAgICAgICAgICAgIGF0dHJzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhdHRyTmFtZSA9PT0gJ3N0eWxlJykge1xuICAgICAgICAgICAgICBhdHRyc1tpXS52YWx1ZSA9IGVkaXRvci5kb20uc2VyaWFsaXplU3R5bGUoZWRpdG9yLmRvbS5wYXJzZVN0eWxlKGF0dHJzW2ldLnZhbHVlKSwgbmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHdyaXRlci5zdGFydChuYW1lLCBhdHRycywgZW1wdHkpO1xuICAgICAgICAgIGJsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW5kOiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgIGlmIChibG9ja2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHdyaXRlci5lbmQobmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH0sIGdsb2JhbCQ0KHt9KSkucGFyc2UoaHRtbCk7XG4gICAgICByZXR1cm4gd3JpdGVyLmdldENvbnRlbnQoKTtcbiAgICB9O1xuXG4gICAgdmFyIGNyZWF0ZVBsYWNlaG9sZGVyTm9kZSA9IGZ1bmN0aW9uIChlZGl0b3IsIG5vZGUpIHtcbiAgICAgIHZhciBuYW1lID0gbm9kZS5uYW1lO1xuICAgICAgdmFyIHBsYWNlSG9sZGVyID0gbmV3IGdsb2JhbCQ3KCdpbWcnLCAxKTtcbiAgICAgIHBsYWNlSG9sZGVyLnNob3J0RW5kZWQgPSB0cnVlO1xuICAgICAgcmV0YWluQXR0cmlidXRlc0FuZElubmVySHRtbChlZGl0b3IsIG5vZGUsIHBsYWNlSG9sZGVyKTtcbiAgICAgIHBsYWNlSG9sZGVyLmF0dHIoe1xuICAgICAgICAnd2lkdGgnOiBub2RlLmF0dHIoJ3dpZHRoJykgfHwgJzMwMCcsXG4gICAgICAgICdoZWlnaHQnOiBub2RlLmF0dHIoJ2hlaWdodCcpIHx8IChuYW1lID09PSAnYXVkaW8nID8gJzMwJyA6ICcxNTAnKSxcbiAgICAgICAgJ3N0eWxlJzogbm9kZS5hdHRyKCdzdHlsZScpLFxuICAgICAgICAnc3JjJzogZ2xvYmFsJDgudHJhbnNwYXJlbnRTcmMsXG4gICAgICAgICdkYXRhLW1jZS1vYmplY3QnOiBuYW1lLFxuICAgICAgICAnY2xhc3MnOiAnbWNlLW9iamVjdCBtY2Utb2JqZWN0LScgKyBuYW1lXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBwbGFjZUhvbGRlcjtcbiAgICB9O1xuICAgIHZhciBjcmVhdGVQcmV2aWV3SWZyYW1lTm9kZSA9IGZ1bmN0aW9uIChlZGl0b3IsIG5vZGUpIHtcbiAgICAgIHZhciBuYW1lID0gbm9kZS5uYW1lO1xuICAgICAgdmFyIHByZXZpZXdXcmFwcGVyID0gbmV3IGdsb2JhbCQ3KCdzcGFuJywgMSk7XG4gICAgICBwcmV2aWV3V3JhcHBlci5hdHRyKHtcbiAgICAgICAgJ2NvbnRlbnRFZGl0YWJsZSc6ICdmYWxzZScsXG4gICAgICAgICdzdHlsZSc6IG5vZGUuYXR0cignc3R5bGUnKSxcbiAgICAgICAgJ2RhdGEtbWNlLW9iamVjdCc6IG5hbWUsXG4gICAgICAgICdjbGFzcyc6ICdtY2UtcHJldmlldy1vYmplY3QgbWNlLW9iamVjdC0nICsgbmFtZVxuICAgICAgfSk7XG4gICAgICByZXRhaW5BdHRyaWJ1dGVzQW5kSW5uZXJIdG1sKGVkaXRvciwgbm9kZSwgcHJldmlld1dyYXBwZXIpO1xuICAgICAgdmFyIHByZXZpZXdOb2RlID0gbmV3IGdsb2JhbCQ3KG5hbWUsIDEpO1xuICAgICAgcHJldmlld05vZGUuYXR0cih7XG4gICAgICAgIHNyYzogbm9kZS5hdHRyKCdzcmMnKSxcbiAgICAgICAgYWxsb3dmdWxsc2NyZWVuOiBub2RlLmF0dHIoJ2FsbG93ZnVsbHNjcmVlbicpLFxuICAgICAgICBzdHlsZTogbm9kZS5hdHRyKCdzdHlsZScpLFxuICAgICAgICBjbGFzczogbm9kZS5hdHRyKCdjbGFzcycpLFxuICAgICAgICB3aWR0aDogbm9kZS5hdHRyKCd3aWR0aCcpLFxuICAgICAgICBoZWlnaHQ6IG5vZGUuYXR0cignaGVpZ2h0JyksXG4gICAgICAgIGZyYW1lYm9yZGVyOiAnMCdcbiAgICAgIH0pO1xuICAgICAgdmFyIHNoaW1Ob2RlID0gbmV3IGdsb2JhbCQ3KCdzcGFuJywgMSk7XG4gICAgICBzaGltTm9kZS5hdHRyKCdjbGFzcycsICdtY2Utc2hpbScpO1xuICAgICAgcHJldmlld1dyYXBwZXIuYXBwZW5kKHByZXZpZXdOb2RlKTtcbiAgICAgIHByZXZpZXdXcmFwcGVyLmFwcGVuZChzaGltTm9kZSk7XG4gICAgICByZXR1cm4gcHJldmlld1dyYXBwZXI7XG4gICAgfTtcbiAgICB2YXIgcmV0YWluQXR0cmlidXRlc0FuZElubmVySHRtbCA9IGZ1bmN0aW9uIChlZGl0b3IsIHNvdXJjZU5vZGUsIHRhcmdldE5vZGUpIHtcbiAgICAgIHZhciBhdHRyTmFtZTtcbiAgICAgIHZhciBhdHRyVmFsdWU7XG4gICAgICB2YXIgYWk7XG4gICAgICB2YXIgYXR0cmlicyA9IHNvdXJjZU5vZGUuYXR0cmlidXRlcztcbiAgICAgIGFpID0gYXR0cmlicy5sZW5ndGg7XG4gICAgICB3aGlsZSAoYWktLSkge1xuICAgICAgICBhdHRyTmFtZSA9IGF0dHJpYnNbYWldLm5hbWU7XG4gICAgICAgIGF0dHJWYWx1ZSA9IGF0dHJpYnNbYWldLnZhbHVlO1xuICAgICAgICBpZiAoYXR0ck5hbWUgIT09ICd3aWR0aCcgJiYgYXR0ck5hbWUgIT09ICdoZWlnaHQnICYmIGF0dHJOYW1lICE9PSAnc3R5bGUnKSB7XG4gICAgICAgICAgaWYgKGF0dHJOYW1lID09PSAnZGF0YScgfHwgYXR0ck5hbWUgPT09ICdzcmMnKSB7XG4gICAgICAgICAgICBhdHRyVmFsdWUgPSBlZGl0b3IuY29udmVydFVSTChhdHRyVmFsdWUsIGF0dHJOYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGFyZ2V0Tm9kZS5hdHRyKCdkYXRhLW1jZS1wLScgKyBhdHRyTmFtZSwgYXR0clZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIGlubmVySHRtbCA9IHNvdXJjZU5vZGUuZmlyc3RDaGlsZCAmJiBzb3VyY2VOb2RlLmZpcnN0Q2hpbGQudmFsdWU7XG4gICAgICBpZiAoaW5uZXJIdG1sKSB7XG4gICAgICAgIHRhcmdldE5vZGUuYXR0cignZGF0YS1tY2UtaHRtbCcsIGVzY2FwZShzYW5pdGl6ZShlZGl0b3IsIGlubmVySHRtbCkpKTtcbiAgICAgICAgdGFyZ2V0Tm9kZS5maXJzdENoaWxkID0gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBpc1BhZ2VFbWJlZFdyYXBwZXIgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgdmFyIG5vZGVDbGFzcyA9IG5vZGUuYXR0cignY2xhc3MnKTtcbiAgICAgIHJldHVybiBub2RlQ2xhc3MgJiYgL1xcYnRpbnktcGFnZWVtYmVkXFxiLy50ZXN0KG5vZGVDbGFzcyk7XG4gICAgfTtcbiAgICB2YXIgaXNXaXRoaW5FbWJlZFdyYXBwZXIgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgd2hpbGUgKG5vZGUgPSBub2RlLnBhcmVudCkge1xuICAgICAgICBpZiAobm9kZS5hdHRyKCdkYXRhLWVwaG94LWVtYmVkLWlyaScpIHx8IGlzUGFnZUVtYmVkV3JhcHBlcihub2RlKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICB2YXIgcGxhY2VIb2xkZXJDb252ZXJ0ZXIgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKG5vZGVzKSB7XG4gICAgICAgIHZhciBpID0gbm9kZXMubGVuZ3RoO1xuICAgICAgICB2YXIgbm9kZTtcbiAgICAgICAgdmFyIHZpZGVvU2NyaXB0O1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgICAgIGlmICghbm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobm9kZS5wYXJlbnQuYXR0cignZGF0YS1tY2Utb2JqZWN0JykpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobm9kZS5uYW1lID09PSAnc2NyaXB0Jykge1xuICAgICAgICAgICAgdmlkZW9TY3JpcHQgPSBnZXRWaWRlb1NjcmlwdE1hdGNoKGdldFNjcmlwdHMoZWRpdG9yKSwgbm9kZS5hdHRyKCdzcmMnKSk7XG4gICAgICAgICAgICBpZiAoIXZpZGVvU2NyaXB0KSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodmlkZW9TY3JpcHQpIHtcbiAgICAgICAgICAgIGlmICh2aWRlb1NjcmlwdC53aWR0aCkge1xuICAgICAgICAgICAgICBub2RlLmF0dHIoJ3dpZHRoJywgdmlkZW9TY3JpcHQud2lkdGgudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmlkZW9TY3JpcHQuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgIG5vZGUuYXR0cignaGVpZ2h0JywgdmlkZW9TY3JpcHQuaGVpZ2h0LnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobm9kZS5uYW1lID09PSAnaWZyYW1lJyAmJiBoYXNMaXZlRW1iZWRzKGVkaXRvcikgJiYgZ2xvYmFsJDguY2VGYWxzZSkge1xuICAgICAgICAgICAgaWYgKCFpc1dpdGhpbkVtYmVkV3JhcHBlcihub2RlKSkge1xuICAgICAgICAgICAgICBub2RlLnJlcGxhY2UoY3JlYXRlUHJldmlld0lmcmFtZU5vZGUoZWRpdG9yLCBub2RlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghaXNXaXRoaW5FbWJlZFdyYXBwZXIobm9kZSkpIHtcbiAgICAgICAgICAgICAgbm9kZS5yZXBsYWNlKGNyZWF0ZVBsYWNlaG9sZGVyTm9kZShlZGl0b3IsIG5vZGUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciBzZXR1cCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIGVkaXRvci5vbigncHJlSW5pdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNwZWNpYWxFbGVtZW50cyA9IGVkaXRvci5zY2hlbWEuZ2V0U3BlY2lhbEVsZW1lbnRzKCk7XG4gICAgICAgIGdsb2JhbCQxLmVhY2goJ3ZpZGVvIGF1ZGlvIGlmcmFtZSBvYmplY3QnLnNwbGl0KCcgJyksIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgc3BlY2lhbEVsZW1lbnRzW25hbWVdID0gbmV3IFJlZ0V4cCgnPC8nICsgbmFtZSArICdbXj5dKj4nLCAnZ2knKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBib29sQXR0cnMgPSBlZGl0b3Iuc2NoZW1hLmdldEJvb2xBdHRycygpO1xuICAgICAgICBnbG9iYWwkMS5lYWNoKCd3ZWJraXRhbGxvd2Z1bGxzY3JlZW4gbW96YWxsb3dmdWxsc2NyZWVuIGFsbG93ZnVsbHNjcmVlbicuc3BsaXQoJyAnKSwgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICBib29sQXR0cnNbbmFtZV0gPSB7fTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVkaXRvci5wYXJzZXIuYWRkTm9kZUZpbHRlcignaWZyYW1lLHZpZGVvLGF1ZGlvLG9iamVjdCxlbWJlZCxzY3JpcHQnLCBwbGFjZUhvbGRlckNvbnZlcnRlcihlZGl0b3IpKTtcbiAgICAgICAgZWRpdG9yLnNlcmlhbGl6ZXIuYWRkQXR0cmlidXRlRmlsdGVyKCdkYXRhLW1jZS1vYmplY3QnLCBmdW5jdGlvbiAobm9kZXMsIG5hbWUpIHtcbiAgICAgICAgICB2YXIgaSA9IG5vZGVzLmxlbmd0aDtcbiAgICAgICAgICB2YXIgbm9kZTtcbiAgICAgICAgICB2YXIgcmVhbEVsbTtcbiAgICAgICAgICB2YXIgYWk7XG4gICAgICAgICAgdmFyIGF0dHJpYnM7XG4gICAgICAgICAgdmFyIGlubmVySHRtbDtcbiAgICAgICAgICB2YXIgaW5uZXJOb2RlO1xuICAgICAgICAgIHZhciByZWFsRWxtTmFtZTtcbiAgICAgICAgICB2YXIgY2xhc3NOYW1lO1xuICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgIG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgICAgIGlmICghbm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWFsRWxtTmFtZSA9IG5vZGUuYXR0cihuYW1lKTtcbiAgICAgICAgICAgIHJlYWxFbG0gPSBuZXcgZ2xvYmFsJDcocmVhbEVsbU5hbWUsIDEpO1xuICAgICAgICAgICAgaWYgKHJlYWxFbG1OYW1lICE9PSAnYXVkaW8nICYmIHJlYWxFbG1OYW1lICE9PSAnc2NyaXB0Jykge1xuICAgICAgICAgICAgICBjbGFzc05hbWUgPSBub2RlLmF0dHIoJ2NsYXNzJyk7XG4gICAgICAgICAgICAgIGlmIChjbGFzc05hbWUgJiYgY2xhc3NOYW1lLmluZGV4T2YoJ21jZS1wcmV2aWV3LW9iamVjdCcpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHJlYWxFbG0uYXR0cih7XG4gICAgICAgICAgICAgICAgICB3aWR0aDogbm9kZS5maXJzdENoaWxkLmF0dHIoJ3dpZHRoJyksXG4gICAgICAgICAgICAgICAgICBoZWlnaHQ6IG5vZGUuZmlyc3RDaGlsZC5hdHRyKCdoZWlnaHQnKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlYWxFbG0uYXR0cih7XG4gICAgICAgICAgICAgICAgICB3aWR0aDogbm9kZS5hdHRyKCd3aWR0aCcpLFxuICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBub2RlLmF0dHIoJ2hlaWdodCcpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlYWxFbG0uYXR0cih7IHN0eWxlOiBub2RlLmF0dHIoJ3N0eWxlJykgfSk7XG4gICAgICAgICAgICBhdHRyaWJzID0gbm9kZS5hdHRyaWJ1dGVzO1xuICAgICAgICAgICAgYWkgPSBhdHRyaWJzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChhaS0tKSB7XG4gICAgICAgICAgICAgIHZhciBhdHRyTmFtZSA9IGF0dHJpYnNbYWldLm5hbWU7XG4gICAgICAgICAgICAgIGlmIChhdHRyTmFtZS5pbmRleE9mKCdkYXRhLW1jZS1wLScpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVhbEVsbS5hdHRyKGF0dHJOYW1lLnN1YnN0cigxMSksIGF0dHJpYnNbYWldLnZhbHVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlYWxFbG1OYW1lID09PSAnc2NyaXB0Jykge1xuICAgICAgICAgICAgICByZWFsRWxtLmF0dHIoJ3R5cGUnLCAndGV4dC9qYXZhc2NyaXB0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbm5lckh0bWwgPSBub2RlLmF0dHIoJ2RhdGEtbWNlLWh0bWwnKTtcbiAgICAgICAgICAgIGlmIChpbm5lckh0bWwpIHtcbiAgICAgICAgICAgICAgaW5uZXJOb2RlID0gbmV3IGdsb2JhbCQ3KCcjdGV4dCcsIDMpO1xuICAgICAgICAgICAgICBpbm5lck5vZGUucmF3ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaW5uZXJOb2RlLnZhbHVlID0gc2FuaXRpemUoZWRpdG9yLCB1bmVzY2FwZShpbm5lckh0bWwpKTtcbiAgICAgICAgICAgICAgcmVhbEVsbS5hcHBlbmQoaW5uZXJOb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGUucmVwbGFjZShyZWFsRWxtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBlZGl0b3Iub24oJ1NldENvbnRlbnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGVkaXRvci4kKCdzcGFuLm1jZS1wcmV2aWV3LW9iamVjdCcpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbG0pIHtcbiAgICAgICAgICB2YXIgJGVsbSA9IGVkaXRvci4kKGVsbSk7XG4gICAgICAgICAgaWYgKCRlbG0uZmluZCgnc3Bhbi5tY2Utc2hpbScpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgJGVsbS5hcHBlbmQoJzxzcGFuIGNsYXNzPVwibWNlLXNoaW1cIj48L3NwYW4+Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgc2V0dXAkMSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIGVkaXRvci5vbignUmVzb2x2ZU5hbWUnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgbmFtZTtcbiAgICAgICAgaWYgKGUudGFyZ2V0Lm5vZGVUeXBlID09PSAxICYmIChuYW1lID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLW1jZS1vYmplY3QnKSkpIHtcbiAgICAgICAgICBlLm5hbWUgPSBuYW1lO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHNldHVwJDIgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBlZGl0b3Iub24oJ2NsaWNrIGtleXVwIHRvdWNoZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZWN0ZWROb2RlID0gZWRpdG9yLnNlbGVjdGlvbi5nZXROb2RlKCk7XG4gICAgICAgIGlmIChzZWxlY3RlZE5vZGUgJiYgZWRpdG9yLmRvbS5oYXNDbGFzcyhzZWxlY3RlZE5vZGUsICdtY2UtcHJldmlldy1vYmplY3QnKSkge1xuICAgICAgICAgIGlmIChlZGl0b3IuZG9tLmdldEF0dHJpYihzZWxlY3RlZE5vZGUsICdkYXRhLW1jZS1zZWxlY3RlZCcpKSB7XG4gICAgICAgICAgICBzZWxlY3RlZE5vZGUuc2V0QXR0cmlidXRlKCdkYXRhLW1jZS1zZWxlY3RlZCcsICcyJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci5vbignT2JqZWN0U2VsZWN0ZWQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgb2JqZWN0VHlwZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1tY2Utb2JqZWN0Jyk7XG4gICAgICAgIGlmIChvYmplY3RUeXBlID09PSAnYXVkaW8nIHx8IG9iamVjdFR5cGUgPT09ICdzY3JpcHQnKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci5vbignT2JqZWN0UmVzaXplZCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgdmFyIGh0bWw7XG4gICAgICAgIGlmICh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLW1jZS1vYmplY3QnKSkge1xuICAgICAgICAgIGh0bWwgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLW1jZS1odG1sJyk7XG4gICAgICAgICAgaWYgKGh0bWwpIHtcbiAgICAgICAgICAgIGh0bWwgPSB1bmVzY2FwZShodG1sKTtcbiAgICAgICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEtbWNlLWh0bWwnLCBlc2NhcGUodXBkYXRlSHRtbChodG1sLCB7XG4gICAgICAgICAgICAgIHdpZHRoOiBTdHJpbmcoZS53aWR0aCksXG4gICAgICAgICAgICAgIGhlaWdodDogU3RyaW5nKGUuaGVpZ2h0KVxuICAgICAgICAgICAgfSkpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgc3RhdGVTZWxlY3RvckFkYXB0ZXIgPSBmdW5jdGlvbiAoZWRpdG9yLCBzZWxlY3Rvcikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChidXR0b25BcGkpIHtcbiAgICAgICAgcmV0dXJuIGVkaXRvci5zZWxlY3Rpb24uc2VsZWN0b3JDaGFuZ2VkV2l0aFVuYmluZChzZWxlY3Rvci5qb2luKCcsJyksIGJ1dHRvbkFwaS5zZXRBY3RpdmUpLnVuYmluZDtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgcmVnaXN0ZXIkMSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRUb2dnbGVCdXR0b24oJ21lZGlhJywge1xuICAgICAgICB0b29sdGlwOiAnSW5zZXJ0L2VkaXQgbWVkaWEnLFxuICAgICAgICBpY29uOiAnZW1iZWQnLFxuICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGVkaXRvci5leGVjQ29tbWFuZCgnbWNlTWVkaWEnKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TZXR1cDogc3RhdGVTZWxlY3RvckFkYXB0ZXIoZWRpdG9yLCBbXG4gICAgICAgICAgJ2ltZ1tkYXRhLW1jZS1vYmplY3RdJyxcbiAgICAgICAgICAnc3BhbltkYXRhLW1jZS1vYmplY3RdJyxcbiAgICAgICAgICAnZGl2W2RhdGEtZXBob3gtZW1iZWQtaXJpXSdcbiAgICAgICAgXSlcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZE1lbnVJdGVtKCdtZWRpYScsIHtcbiAgICAgICAgaWNvbjogJ2VtYmVkJyxcbiAgICAgICAgdGV4dDogJ01lZGlhLi4uJyxcbiAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBlZGl0b3IuZXhlY0NvbW1hbmQoJ21jZU1lZGlhJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBQbHVnaW4gKCkge1xuICAgICAgZ2xvYmFsLmFkZCgnbWVkaWEnLCBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIHJlZ2lzdGVyKGVkaXRvcik7XG4gICAgICAgIHJlZ2lzdGVyJDEoZWRpdG9yKTtcbiAgICAgICAgc2V0dXAkMShlZGl0b3IpO1xuICAgICAgICBzZXR1cChlZGl0b3IpO1xuICAgICAgICBzZXR1cCQyKGVkaXRvcik7XG4gICAgICAgIHJldHVybiBnZXQkMShlZGl0b3IpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgUGx1Z2luKCk7XG5cbn0oKSk7XG4iXSwic291cmNlUm9vdCI6IiJ9