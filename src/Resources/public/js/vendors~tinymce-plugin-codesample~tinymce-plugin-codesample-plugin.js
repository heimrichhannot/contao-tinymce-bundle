(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~tinymce-plugin-codesample~tinymce-plugin-codesample-plugin"],{

/***/ "./node_modules/tinymce/plugins/codesample/plugin.js":
/*!***********************************************************!*\
  !*** ./node_modules/tinymce/plugins/codesample/plugin.js ***!
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

    var head = function (xs) {
      return xs.length === 0 ? Option.none() : Option.some(xs[0]);
    };

    var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

    function isCodeSample(elm) {
      return elm && elm.nodeName === 'PRE' && elm.className.indexOf('language-') !== -1;
    }
    function trimArg(predicateFn) {
      return function (arg1, arg2) {
        return predicateFn(arg2);
      };
    }

    var Global = typeof domGlobals.window !== 'undefined' ? domGlobals.window : Function('return this;')();

    var exports$1 = {}, module = { exports: exports$1 }, global$2 = {};
    (function (define, exports, module, require) {
      var oldprism = window.Prism;
      window.Prism = { manual: true };
      (function (f) {
        if (typeof exports === 'object' && typeof module !== 'undefined') {
          module.exports = f();
        } else if (typeof define === 'function' && define.amd) {
          define([], f);
        } else {
          var g;
          if (typeof window !== 'undefined') {
            g = window;
          } else if (typeof global$2 !== 'undefined') {
            g = global$2;
          } else if (typeof self !== 'undefined') {
            g = self;
          } else {
            g = this;
          }
          g.EphoxContactWrapper = f();
        }
      }(function () {
        return function () {
          function r(e, n, t) {
            function o(i, f) {
              if (!n[i]) {
                if (!e[i]) {
                  var c = 'function' == typeof require && require;
                  if (!f && c)
                    return c(i, !0);
                  if (u)
                    return u(i, !0);
                  var a = new Error('Cannot find module \'' + i + '\'');
                  throw a.code = 'MODULE_NOT_FOUND', a;
                }
                var p = n[i] = { exports: {} };
                e[i][0].call(p.exports, function (r) {
                  var n = e[i][1][r];
                  return o(n || r);
                }, p, p.exports, r, e, n, t);
              }
              return n[i].exports;
            }
            for (var u = 'function' == typeof require && require, i = 0; i < t.length; i++)
              o(t[i]);
            return o;
          }
          return r;
        }()({
          1: [
            function (require, module, exports) {
              Prism.languages.c = Prism.languages.extend('clike', {
                'class-name': {
                  pattern: /(\b(?:enum|struct)\s+)\w+/,
                  lookbehind: true
                },
                'keyword': /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
                'operator': />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
                'number': /(?:\b0x(?:[\da-f]+\.?[\da-f]*|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ful]*/i
              });
              Prism.languages.insertBefore('c', 'string', {
                'macro': {
                  pattern: /(^\s*)#\s*[a-z]+(?:[^\r\n\\]|\\(?:\r\n|[\s\S]))*/im,
                  lookbehind: true,
                  alias: 'property',
                  inside: {
                    'string': {
                      pattern: /(#\s*include\s*)(?:<.+?>|("|')(?:\\?.)+?\2)/,
                      lookbehind: true
                    },
                    'directive': {
                      pattern: /(#\s*)\b(?:define|defined|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/,
                      lookbehind: true,
                      alias: 'keyword'
                    }
                  }
                },
                'constant': /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/
              });
              delete Prism.languages.c['boolean'];
            },
            {}
          ],
          2: [
            function (require, module, exports) {
              Prism.languages.clike = {
                'comment': [
                  {
                    pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
                    lookbehind: true
                  },
                  {
                    pattern: /(^|[^\\:])\/\/.*/,
                    lookbehind: true,
                    greedy: true
                  }
                ],
                'string': {
                  pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                  greedy: true
                },
                'class-name': {
                  pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
                  lookbehind: true,
                  inside: { 'punctuation': /[.\\]/ }
                },
                'keyword': /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
                'boolean': /\b(?:true|false)\b/,
                'function': /\w+(?=\()/,
                'number': /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
                'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
                'punctuation': /[{}[\];(),.:]/
              };
            },
            {}
          ],
          3: [
            function (require, module, exports) {
              (function (global) {
                var _self = typeof window !== 'undefined' ? window : typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self : {};
                var Prism = function (_self) {
                  var lang = /\blang(?:uage)?-([\w-]+)\b/i;
                  var uniqueId = 0;
                  var _ = {
                    manual: _self.Prism && _self.Prism.manual,
                    disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
                    util: {
                      encode: function (tokens) {
                        if (tokens instanceof Token) {
                          return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
                        } else if (Array.isArray(tokens)) {
                          return tokens.map(_.util.encode);
                        } else {
                          return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
                        }
                      },
                      type: function (o) {
                        return Object.prototype.toString.call(o).slice(8, -1);
                      },
                      objId: function (obj) {
                        if (!obj['__id']) {
                          Object.defineProperty(obj, '__id', { value: ++uniqueId });
                        }
                        return obj['__id'];
                      },
                      clone: function deepClone(o, visited) {
                        var clone, id, type = _.util.type(o);
                        visited = visited || {};
                        switch (type) {
                        case 'Object':
                          id = _.util.objId(o);
                          if (visited[id]) {
                            return visited[id];
                          }
                          clone = {};
                          visited[id] = clone;
                          for (var key in o) {
                            if (o.hasOwnProperty(key)) {
                              clone[key] = deepClone(o[key], visited);
                            }
                          }
                          return clone;
                        case 'Array':
                          id = _.util.objId(o);
                          if (visited[id]) {
                            return visited[id];
                          }
                          clone = [];
                          visited[id] = clone;
                          o.forEach(function (v, i) {
                            clone[i] = deepClone(v, visited);
                          });
                          return clone;
                        default:
                          return o;
                        }
                      },
                      getLanguage: function (element) {
                        while (element && !lang.test(element.className)) {
                          element = element.parentElement;
                        }
                        if (element) {
                          return (element.className.match(lang) || [
                            ,
                            'none'
                          ])[1].toLowerCase();
                        }
                        return 'none';
                      },
                      currentScript: function () {
                        if (typeof document === 'undefined') {
                          return null;
                        }
                        if ('currentScript' in document) {
                          return document.currentScript;
                        }
                        try {
                          throw new Error();
                        } catch (err) {
                          var src = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(err.stack) || [])[1];
                          if (src) {
                            var scripts = document.getElementsByTagName('script');
                            for (var i in scripts) {
                              if (scripts[i].src == src) {
                                return scripts[i];
                              }
                            }
                          }
                          return null;
                        }
                      }
                    },
                    languages: {
                      extend: function (id, redef) {
                        var lang = _.util.clone(_.languages[id]);
                        for (var key in redef) {
                          lang[key] = redef[key];
                        }
                        return lang;
                      },
                      insertBefore: function (inside, before, insert, root) {
                        root = root || _.languages;
                        var grammar = root[inside];
                        var ret = {};
                        for (var token in grammar) {
                          if (grammar.hasOwnProperty(token)) {
                            if (token == before) {
                              for (var newToken in insert) {
                                if (insert.hasOwnProperty(newToken)) {
                                  ret[newToken] = insert[newToken];
                                }
                              }
                            }
                            if (!insert.hasOwnProperty(token)) {
                              ret[token] = grammar[token];
                            }
                          }
                        }
                        var old = root[inside];
                        root[inside] = ret;
                        _.languages.DFS(_.languages, function (key, value) {
                          if (value === old && key != inside) {
                            this[key] = ret;
                          }
                        });
                        return ret;
                      },
                      DFS: function DFS(o, callback, type, visited) {
                        visited = visited || {};
                        var objId = _.util.objId;
                        for (var i in o) {
                          if (o.hasOwnProperty(i)) {
                            callback.call(o, i, o[i], type || i);
                            var property = o[i], propertyType = _.util.type(property);
                            if (propertyType === 'Object' && !visited[objId(property)]) {
                              visited[objId(property)] = true;
                              DFS(property, callback, null, visited);
                            } else if (propertyType === 'Array' && !visited[objId(property)]) {
                              visited[objId(property)] = true;
                              DFS(property, callback, i, visited);
                            }
                          }
                        }
                      }
                    },
                    plugins: {},
                    highlightAll: function (async, callback) {
                      _.highlightAllUnder(document, async, callback);
                    },
                    highlightAllUnder: function (container, async, callback) {
                      var env = {
                        callback: callback,
                        container: container,
                        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                      };
                      _.hooks.run('before-highlightall', env);
                      env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
                      _.hooks.run('before-all-elements-highlight', env);
                      for (var i = 0, element; element = env.elements[i++];) {
                        _.highlightElement(element, async === true, env.callback);
                      }
                    },
                    highlightElement: function (element, async, callback) {
                      var language = _.util.getLanguage(element);
                      var grammar = _.languages[language];
                      element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
                      var parent = element.parentNode;
                      if (parent && parent.nodeName.toLowerCase() === 'pre') {
                        parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
                      }
                      var code = element.textContent;
                      var env = {
                        element: element,
                        language: language,
                        grammar: grammar,
                        code: code
                      };
                      function insertHighlightedCode(highlightedCode) {
                        env.highlightedCode = highlightedCode;
                        _.hooks.run('before-insert', env);
                        env.element.innerHTML = env.highlightedCode;
                        _.hooks.run('after-highlight', env);
                        _.hooks.run('complete', env);
                        callback && callback.call(env.element);
                      }
                      _.hooks.run('before-sanity-check', env);
                      if (!env.code) {
                        _.hooks.run('complete', env);
                        callback && callback.call(env.element);
                        return;
                      }
                      _.hooks.run('before-highlight', env);
                      if (!env.grammar) {
                        insertHighlightedCode(_.util.encode(env.code));
                        return;
                      }
                      if (async && _self.Worker) {
                        var worker = new Worker(_.filename);
                        worker.onmessage = function (evt) {
                          insertHighlightedCode(evt.data);
                        };
                        worker.postMessage(JSON.stringify({
                          language: env.language,
                          code: env.code,
                          immediateClose: true
                        }));
                      } else {
                        insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
                      }
                    },
                    highlight: function (text, grammar, language) {
                      var env = {
                        code: text,
                        grammar: grammar,
                        language: language
                      };
                      _.hooks.run('before-tokenize', env);
                      env.tokens = _.tokenize(env.code, env.grammar);
                      _.hooks.run('after-tokenize', env);
                      return Token.stringify(_.util.encode(env.tokens), env.language);
                    },
                    matchGrammar: function (text, strarr, grammar, index, startPos, oneshot, target) {
                      for (var token in grammar) {
                        if (!grammar.hasOwnProperty(token) || !grammar[token]) {
                          continue;
                        }
                        var patterns = grammar[token];
                        patterns = Array.isArray(patterns) ? patterns : [patterns];
                        for (var j = 0; j < patterns.length; ++j) {
                          if (target && target == token + ',' + j) {
                            return;
                          }
                          var pattern = patterns[j], inside = pattern.inside, lookbehind = !!pattern.lookbehind, greedy = !!pattern.greedy, lookbehindLength = 0, alias = pattern.alias;
                          if (greedy && !pattern.pattern.global) {
                            var flags = pattern.pattern.toString().match(/[imsuy]*$/)[0];
                            pattern.pattern = RegExp(pattern.pattern.source, flags + 'g');
                          }
                          pattern = pattern.pattern || pattern;
                          for (var i = index, pos = startPos; i < strarr.length; pos += strarr[i].length, ++i) {
                            var str = strarr[i];
                            if (strarr.length > text.length) {
                              return;
                            }
                            if (str instanceof Token) {
                              continue;
                            }
                            if (greedy && i != strarr.length - 1) {
                              pattern.lastIndex = pos;
                              var match = pattern.exec(text);
                              if (!match) {
                                break;
                              }
                              var from = match.index + (lookbehind && match[1] ? match[1].length : 0), to = match.index + match[0].length, k = i, p = pos;
                              for (var len = strarr.length; k < len && (p < to || !strarr[k].type && !strarr[k - 1].greedy); ++k) {
                                p += strarr[k].length;
                                if (from >= p) {
                                  ++i;
                                  pos = p;
                                }
                              }
                              if (strarr[i] instanceof Token) {
                                continue;
                              }
                              delNum = k - i;
                              str = text.slice(pos, p);
                              match.index -= pos;
                            } else {
                              pattern.lastIndex = 0;
                              var match = pattern.exec(str), delNum = 1;
                            }
                            if (!match) {
                              if (oneshot) {
                                break;
                              }
                              continue;
                            }
                            if (lookbehind) {
                              lookbehindLength = match[1] ? match[1].length : 0;
                            }
                            var from = match.index + lookbehindLength, match = match[0].slice(lookbehindLength), to = from + match.length, before = str.slice(0, from), after = str.slice(to);
                            var args = [
                              i,
                              delNum
                            ];
                            if (before) {
                              ++i;
                              pos += before.length;
                              args.push(before);
                            }
                            var wrapped = new Token(token, inside ? _.tokenize(match, inside) : match, alias, match, greedy);
                            args.push(wrapped);
                            if (after) {
                              args.push(after);
                            }
                            Array.prototype.splice.apply(strarr, args);
                            if (delNum != 1)
                              _.matchGrammar(text, strarr, grammar, i, pos, true, token + ',' + j);
                            if (oneshot)
                              break;
                          }
                        }
                      }
                    },
                    tokenize: function (text, grammar) {
                      var strarr = [text];
                      var rest = grammar.rest;
                      if (rest) {
                        for (var token in rest) {
                          grammar[token] = rest[token];
                        }
                        delete grammar.rest;
                      }
                      _.matchGrammar(text, strarr, grammar, 0, 0, false);
                      return strarr;
                    },
                    hooks: {
                      all: {},
                      add: function (name, callback) {
                        var hooks = _.hooks.all;
                        hooks[name] = hooks[name] || [];
                        hooks[name].push(callback);
                      },
                      run: function (name, env) {
                        var callbacks = _.hooks.all[name];
                        if (!callbacks || !callbacks.length) {
                          return;
                        }
                        for (var i = 0, callback; callback = callbacks[i++];) {
                          callback(env);
                        }
                      }
                    },
                    Token: Token
                  };
                  _self.Prism = _;
                  function Token(type, content, alias, matchedStr, greedy) {
                    this.type = type;
                    this.content = content;
                    this.alias = alias;
                    this.length = (matchedStr || '').length | 0;
                    this.greedy = !!greedy;
                  }
                  Token.stringify = function (o, language) {
                    if (typeof o == 'string') {
                      return o;
                    }
                    if (Array.isArray(o)) {
                      return o.map(function (element) {
                        return Token.stringify(element, language);
                      }).join('');
                    }
                    var env = {
                      type: o.type,
                      content: Token.stringify(o.content, language),
                      tag: 'span',
                      classes: [
                        'token',
                        o.type
                      ],
                      attributes: {},
                      language: language
                    };
                    if (o.alias) {
                      var aliases = Array.isArray(o.alias) ? o.alias : [o.alias];
                      Array.prototype.push.apply(env.classes, aliases);
                    }
                    _.hooks.run('wrap', env);
                    var attributes = Object.keys(env.attributes).map(function (name) {
                      return name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
                    }).join(' ');
                    return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + (attributes ? ' ' + attributes : '') + '>' + env.content + '</' + env.tag + '>';
                  };
                  if (!_self.document) {
                    if (!_self.addEventListener) {
                      return _;
                    }
                    if (!_.disableWorkerMessageHandler) {
                      _self.addEventListener('message', function (evt) {
                        var message = JSON.parse(evt.data), lang = message.language, code = message.code, immediateClose = message.immediateClose;
                        _self.postMessage(_.highlight(code, _.languages[lang], lang));
                        if (immediateClose) {
                          _self.close();
                        }
                      }, false);
                    }
                    return _;
                  }
                  var script = _.util.currentScript();
                  if (script) {
                    _.filename = script.src;
                    if (script.hasAttribute('data-manual')) {
                      _.manual = true;
                    }
                  }
                  if (!_.manual) {
                    var highlightAutomaticallyCallback = function () {
                      if (!_.manual) {
                        _.highlightAll();
                      }
                    };
                    var readyState = document.readyState;
                    if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
                      document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
                    } else {
                      if (window.requestAnimationFrame) {
                        window.requestAnimationFrame(highlightAutomaticallyCallback);
                      } else {
                        window.setTimeout(highlightAutomaticallyCallback, 16);
                      }
                    }
                  }
                  return _;
                }(_self);
                if (typeof module !== 'undefined' && module.exports) {
                  module.exports = Prism;
                }
                if (typeof global !== 'undefined') {
                  global.Prism = Prism;
                }
              }.call(this, typeof global$2 !== 'undefined' ? global$2 : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {}));
            },
            {}
          ],
          4: [
            function (require, module, exports) {
              Prism.languages.cpp = Prism.languages.extend('c', {
                'class-name': {
                  pattern: /(\b(?:class|enum|struct)\s+)\w+/,
                  lookbehind: true
                },
                'keyword': /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
                'number': {
                  pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+\.?[\da-f']*|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+\.?[\d']*|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]*/i,
                  greedy: true
                },
                'operator': />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
                'boolean': /\b(?:true|false)\b/
              });
              Prism.languages.insertBefore('cpp', 'string', {
                'raw-string': {
                  pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
                  alias: 'string',
                  greedy: true
                }
              });
            },
            {}
          ],
          5: [
            function (require, module, exports) {
              Prism.languages.csharp = Prism.languages.extend('clike', {
                'keyword': /\b(?:abstract|add|alias|as|ascending|async|await|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|descending|do|double|dynamic|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|from|get|global|goto|group|if|implicit|in|int|interface|internal|into|is|join|let|lock|long|namespace|new|null|object|operator|orderby|out|override|params|partial|private|protected|public|readonly|ref|remove|return|sbyte|sealed|select|set|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|value|var|virtual|void|volatile|where|while|yield)\b/,
                'string': [
                  {
                    pattern: /@("|')(?:\1\1|\\[\s\S]|(?!\1)[^\\])*\1/,
                    greedy: true
                  },
                  {
                    pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*?\1/,
                    greedy: true
                  }
                ],
                'class-name': [
                  {
                    pattern: /\b[A-Z]\w*(?:\.\w+)*\b(?=\s+\w+)/,
                    inside: { punctuation: /\./ }
                  },
                  {
                    pattern: /(\[)[A-Z]\w*(?:\.\w+)*\b/,
                    lookbehind: true,
                    inside: { punctuation: /\./ }
                  },
                  {
                    pattern: /(\b(?:class|interface)\s+[A-Z]\w*(?:\.\w+)*\s*:\s*)[A-Z]\w*(?:\.\w+)*\b/,
                    lookbehind: true,
                    inside: { punctuation: /\./ }
                  },
                  {
                    pattern: /((?:\b(?:class|interface|new)\s+)|(?:catch\s+\())[A-Z]\w*(?:\.\w+)*\b/,
                    lookbehind: true,
                    inside: { punctuation: /\./ }
                  }
                ],
                'number': /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)f?/i,
                'operator': />>=?|<<=?|[-=]>|([-+&|?])\1|~|[-+*/%&|^!=<>]=?/,
                'punctuation': /\?\.?|::|[{}[\];(),.:]/
              });
              Prism.languages.insertBefore('csharp', 'class-name', {
                'generic-method': {
                  pattern: /\w+\s*<[^>\r\n]+?>\s*(?=\()/,
                  inside: {
                    function: /^\w+/,
                    'class-name': {
                      pattern: /\b[A-Z]\w*(?:\.\w+)*\b/,
                      inside: { punctuation: /\./ }
                    },
                    keyword: Prism.languages.csharp.keyword,
                    punctuation: /[<>(),.:]/
                  }
                },
                'preprocessor': {
                  pattern: /(^\s*)#.*/m,
                  lookbehind: true,
                  alias: 'property',
                  inside: {
                    'directive': {
                      pattern: /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
                      lookbehind: true,
                      alias: 'keyword'
                    }
                  }
                }
              });
              Prism.languages.dotnet = Prism.languages.cs = Prism.languages.csharp;
            },
            {}
          ],
          6: [
            function (require, module, exports) {
              (function (Prism) {
                var string = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
                Prism.languages.css = {
                  'comment': /\/\*[\s\S]*?\*\//,
                  'atrule': {
                    pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
                    inside: { 'rule': /@[\w-]+/ }
                  },
                  'url': {
                    pattern: RegExp('url\\((?:' + string.source + '|[^\n\r()]*)\\)', 'i'),
                    inside: {
                      'function': /^url/i,
                      'punctuation': /^\(|\)$/
                    }
                  },
                  'selector': RegExp('[^{}\\s](?:[^{};"\']|' + string.source + ')*?(?=\\s*\\{)'),
                  'string': {
                    pattern: string,
                    greedy: true
                  },
                  'property': /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
                  'important': /!important\b/i,
                  'function': /[-a-z0-9]+(?=\()/i,
                  'punctuation': /[(){};:,]/
                };
                Prism.languages.css['atrule'].inside.rest = Prism.languages.css;
                var markup = Prism.languages.markup;
                if (markup) {
                  markup.tag.addInlined('style', 'css');
                  Prism.languages.insertBefore('inside', 'attr-value', {
                    'style-attr': {
                      pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
                      inside: {
                        'attr-name': {
                          pattern: /^\s*style/i,
                          inside: markup.tag.inside
                        },
                        'punctuation': /^\s*=\s*['"]|['"]\s*$/,
                        'attr-value': {
                          pattern: /.+/i,
                          inside: Prism.languages.css
                        }
                      },
                      alias: 'language-css'
                    }
                  }, markup.tag);
                }
              }(Prism));
            },
            {}
          ],
          7: [
            function (require, module, exports) {
              (function (Prism) {
                var keywords = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|null|open|opens|package|private|protected|provides|public|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/;
                var className = /\b[A-Z](?:\w*[a-z]\w*)?\b/;
                Prism.languages.java = Prism.languages.extend('clike', {
                  'class-name': [
                    className,
                    /\b[A-Z]\w*(?=\s+\w+\s*[;,=())])/
                  ],
                  'keyword': keywords,
                  'function': [
                    Prism.languages.clike.function,
                    {
                      pattern: /(\:\:)[a-z_]\w*/,
                      lookbehind: true
                    }
                  ],
                  'number': /\b0b[01][01_]*L?\b|\b0x[\da-f_]*\.?[\da-f_p+-]+\b|(?:\b\d[\d_]*\.?[\d_]*|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
                  'operator': {
                    pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
                    lookbehind: true
                  }
                });
                Prism.languages.insertBefore('java', 'string', {
                  'triple-quoted-string': {
                    pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
                    greedy: true,
                    alias: 'string'
                  }
                });
                Prism.languages.insertBefore('java', 'class-name', {
                  'annotation': {
                    alias: 'punctuation',
                    pattern: /(^|[^.])@\w+/,
                    lookbehind: true
                  },
                  'namespace': {
                    pattern: /(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)[a-z]\w*(?:\.[a-z]\w*)+/,
                    lookbehind: true,
                    inside: { 'punctuation': /\./ }
                  },
                  'generics': {
                    pattern: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
                    inside: {
                      'class-name': className,
                      'keyword': keywords,
                      'punctuation': /[<>(),.:]/,
                      'operator': /[?&|]/
                    }
                  }
                });
              }(Prism));
            },
            {}
          ],
          8: [
            function (require, module, exports) {
              Prism.languages.javascript = Prism.languages.extend('clike', {
                'class-name': [
                  Prism.languages.clike['class-name'],
                  {
                    pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
                    lookbehind: true
                  }
                ],
                'keyword': [
                  {
                    pattern: /((?:^|})\s*)(?:catch|finally)\b/,
                    lookbehind: true
                  },
                  {
                    pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
                    lookbehind: true
                  }
                ],
                'number': /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
                'function': /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
                'operator': /--|\+\+|\*\*=?|=>|&&|\|\||[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?[.?]?|[~:]/
              });
              Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;
              Prism.languages.insertBefore('javascript', 'keyword', {
                'regex': {
                  pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*[\s\S]*?\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
                  lookbehind: true,
                  greedy: true
                },
                'function-variable': {
                  pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
                  alias: 'function'
                },
                'parameter': [
                  {
                    pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
                    lookbehind: true,
                    inside: Prism.languages.javascript
                  },
                  {
                    pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
                    inside: Prism.languages.javascript
                  },
                  {
                    pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
                    lookbehind: true,
                    inside: Prism.languages.javascript
                  },
                  {
                    pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
                    lookbehind: true,
                    inside: Prism.languages.javascript
                  }
                ],
                'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
              });
              Prism.languages.insertBefore('javascript', 'string', {
                'template-string': {
                  pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
                  greedy: true,
                  inside: {
                    'template-punctuation': {
                      pattern: /^`|`$/,
                      alias: 'string'
                    },
                    'interpolation': {
                      pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
                      lookbehind: true,
                      inside: {
                        'interpolation-punctuation': {
                          pattern: /^\${|}$/,
                          alias: 'punctuation'
                        },
                        rest: Prism.languages.javascript
                      }
                    },
                    'string': /[\s\S]+/
                  }
                }
              });
              if (Prism.languages.markup) {
                Prism.languages.markup.tag.addInlined('script', 'javascript');
              }
              Prism.languages.js = Prism.languages.javascript;
            },
            {}
          ],
          9: [
            function (require, module, exports) {
              (function (Prism) {
                function getPlaceholder(language, index) {
                  return '___' + language.toUpperCase() + index + '___';
                }
                Object.defineProperties(Prism.languages['markup-templating'] = {}, {
                  buildPlaceholders: {
                    value: function (env, language, placeholderPattern, replaceFilter) {
                      if (env.language !== language) {
                        return;
                      }
                      var tokenStack = env.tokenStack = [];
                      env.code = env.code.replace(placeholderPattern, function (match) {
                        if (typeof replaceFilter === 'function' && !replaceFilter(match)) {
                          return match;
                        }
                        var i = tokenStack.length;
                        var placeholder;
                        while (env.code.indexOf(placeholder = getPlaceholder(language, i)) !== -1)
                          ++i;
                        tokenStack[i] = match;
                        return placeholder;
                      });
                      env.grammar = Prism.languages.markup;
                    }
                  },
                  tokenizePlaceholders: {
                    value: function (env, language) {
                      if (env.language !== language || !env.tokenStack) {
                        return;
                      }
                      env.grammar = Prism.languages[language];
                      var j = 0;
                      var keys = Object.keys(env.tokenStack);
                      function walkTokens(tokens) {
                        for (var i = 0; i < tokens.length; i++) {
                          if (j >= keys.length) {
                            break;
                          }
                          var token = tokens[i];
                          if (typeof token === 'string' || token.content && typeof token.content === 'string') {
                            var k = keys[j];
                            var t = env.tokenStack[k];
                            var s = typeof token === 'string' ? token : token.content;
                            var placeholder = getPlaceholder(language, k);
                            var index = s.indexOf(placeholder);
                            if (index > -1) {
                              ++j;
                              var before = s.substring(0, index);
                              var middle = new Prism.Token(language, Prism.tokenize(t, env.grammar), 'language-' + language, t);
                              var after = s.substring(index + placeholder.length);
                              var replacement = [];
                              if (before) {
                                replacement.push.apply(replacement, walkTokens([before]));
                              }
                              replacement.push(middle);
                              if (after) {
                                replacement.push.apply(replacement, walkTokens([after]));
                              }
                              if (typeof token === 'string') {
                                tokens.splice.apply(tokens, [
                                  i,
                                  1
                                ].concat(replacement));
                              } else {
                                token.content = replacement;
                              }
                            }
                          } else if (token.content) {
                            walkTokens(token.content);
                          }
                        }
                        return tokens;
                      }
                      walkTokens(env.tokens);
                    }
                  }
                });
              }(Prism));
            },
            {}
          ],
          10: [
            function (require, module, exports) {
              Prism.languages.markup = {
                'comment': /<!--[\s\S]*?-->/,
                'prolog': /<\?[\s\S]+?\?>/,
                'doctype': {
                  pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:(?!<!--)[^"'\]]|"[^"]*"|'[^']*'|<!--[\s\S]*?-->)*\]\s*)?>/i,
                  greedy: true
                },
                'cdata': /<!\[CDATA\[[\s\S]*?]]>/i,
                'tag': {
                  pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
                  greedy: true,
                  inside: {
                    'tag': {
                      pattern: /^<\/?[^\s>\/]+/i,
                      inside: {
                        'punctuation': /^<\/?/,
                        'namespace': /^[^\s>\/:]+:/
                      }
                    },
                    'attr-value': {
                      pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
                      inside: {
                        'punctuation': [
                          /^=/,
                          {
                            pattern: /^(\s*)["']|["']$/,
                            lookbehind: true
                          }
                        ]
                      }
                    },
                    'punctuation': /\/?>/,
                    'attr-name': {
                      pattern: /[^\s>\/]+/,
                      inside: { 'namespace': /^[^\s>\/:]+:/ }
                    }
                  }
                },
                'entity': /&#?[\da-z]{1,8};/i
              };
              Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] = Prism.languages.markup['entity'];
              Prism.hooks.add('wrap', function (env) {
                if (env.type === 'entity') {
                  env.attributes['title'] = env.content.replace(/&amp;/, '&');
                }
              });
              Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
                value: function addInlined(tagName, lang) {
                  var includedCdataInside = {};
                  includedCdataInside['language-' + lang] = {
                    pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
                    lookbehind: true,
                    inside: Prism.languages[lang]
                  };
                  includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;
                  var inside = {
                    'included-cdata': {
                      pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                      inside: includedCdataInside
                    }
                  };
                  inside['language-' + lang] = {
                    pattern: /[\s\S]+/,
                    inside: Prism.languages[lang]
                  };
                  var def = {};
                  def[tagName] = {
                    pattern: RegExp(/(<__[\s\S]*?>)(?:<!\[CDATA\[[\s\S]*?\]\]>\s*|[\s\S])*?(?=<\/__>)/.source.replace(/__/g, tagName), 'i'),
                    lookbehind: true,
                    greedy: true,
                    inside: inside
                  };
                  Prism.languages.insertBefore('markup', 'cdata', def);
                }
              });
              Prism.languages.xml = Prism.languages.extend('markup', {});
              Prism.languages.html = Prism.languages.markup;
              Prism.languages.mathml = Prism.languages.markup;
              Prism.languages.svg = Prism.languages.markup;
            },
            {}
          ],
          11: [
            function (require, module, exports) {
              (function (Prism) {
                Prism.languages.php = Prism.languages.extend('clike', {
                  'keyword': /\b(?:__halt_compiler|abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|finally|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|new|or|parent|print|private|protected|public|require|require_once|return|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/i,
                  'boolean': {
                    pattern: /\b(?:false|true)\b/i,
                    alias: 'constant'
                  },
                  'constant': [
                    /\b[A-Z_][A-Z0-9_]*\b/,
                    /\b(?:null)\b/i
                  ],
                  'comment': {
                    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
                    lookbehind: true
                  }
                });
                Prism.languages.insertBefore('php', 'string', {
                  'shell-comment': {
                    pattern: /(^|[^\\])#.*/,
                    lookbehind: true,
                    alias: 'comment'
                  }
                });
                Prism.languages.insertBefore('php', 'comment', {
                  'delimiter': {
                    pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i,
                    alias: 'important'
                  }
                });
                Prism.languages.insertBefore('php', 'keyword', {
                  'variable': /\$+(?:\w+\b|(?={))/i,
                  'package': {
                    pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
                    lookbehind: true,
                    inside: { punctuation: /\\/ }
                  }
                });
                Prism.languages.insertBefore('php', 'operator', {
                  'property': {
                    pattern: /(->)[\w]+/,
                    lookbehind: true
                  }
                });
                var string_interpolation = {
                  pattern: /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[.+?]|->\w+)*)/,
                  lookbehind: true,
                  inside: Prism.languages.php
                };
                Prism.languages.insertBefore('php', 'string', {
                  'nowdoc-string': {
                    pattern: /<<<'([^']+)'(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;/,
                    greedy: true,
                    alias: 'string',
                    inside: {
                      'delimiter': {
                        pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
                        alias: 'symbol',
                        inside: { 'punctuation': /^<<<'?|[';]$/ }
                      }
                    }
                  },
                  'heredoc-string': {
                    pattern: /<<<(?:"([^"]+)"(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;|([a-z_]\w*)(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\2;)/i,
                    greedy: true,
                    alias: 'string',
                    inside: {
                      'delimiter': {
                        pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
                        alias: 'symbol',
                        inside: { 'punctuation': /^<<<"?|[";]$/ }
                      },
                      'interpolation': string_interpolation
                    }
                  },
                  'single-quoted-string': {
                    pattern: /'(?:\\[\s\S]|[^\\'])*'/,
                    greedy: true,
                    alias: 'string'
                  },
                  'double-quoted-string': {
                    pattern: /"(?:\\[\s\S]|[^\\"])*"/,
                    greedy: true,
                    alias: 'string',
                    inside: { 'interpolation': string_interpolation }
                  }
                });
                delete Prism.languages.php['string'];
                Prism.hooks.add('before-tokenize', function (env) {
                  if (!/<\?/.test(env.code)) {
                    return;
                  }
                  var phpPattern = /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#)(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|\/\*[\s\S]*?(?:\*\/|$))*?(?:\?>|$)/ig;
                  Prism.languages['markup-templating'].buildPlaceholders(env, 'php', phpPattern);
                });
                Prism.hooks.add('after-tokenize', function (env) {
                  Prism.languages['markup-templating'].tokenizePlaceholders(env, 'php');
                });
              }(Prism));
            },
            {}
          ],
          12: [
            function (require, module, exports) {
              Prism.languages.python = {
                'comment': {
                  pattern: /(^|[^\\])#.*/,
                  lookbehind: true
                },
                'string-interpolation': {
                  pattern: /(?:f|rf|fr)(?:("""|''')[\s\S]+?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
                  greedy: true,
                  inside: {
                    'interpolation': {
                      pattern: /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,
                      lookbehind: true,
                      inside: {
                        'format-spec': {
                          pattern: /(:)[^:(){}]+(?=}$)/,
                          lookbehind: true
                        },
                        'conversion-option': {
                          pattern: /![sra](?=[:}]$)/,
                          alias: 'punctuation'
                        },
                        rest: null
                      }
                    },
                    'string': /[\s\S]+/
                  }
                },
                'triple-quoted-string': {
                  pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]+?\1/i,
                  greedy: true,
                  alias: 'string'
                },
                'string': {
                  pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
                  greedy: true
                },
                'function': {
                  pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
                  lookbehind: true
                },
                'class-name': {
                  pattern: /(\bclass\s+)\w+/i,
                  lookbehind: true
                },
                'decorator': {
                  pattern: /(^\s*)@\w+(?:\.\w+)*/im,
                  lookbehind: true,
                  alias: [
                    'annotation',
                    'punctuation'
                  ],
                  inside: { 'punctuation': /\./ }
                },
                'keyword': /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
                'builtin': /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
                'boolean': /\b(?:True|False|None)\b/,
                'number': /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
                'operator': /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
                'punctuation': /[{}[\];(),.:]/
              };
              Prism.languages.python['string-interpolation'].inside['interpolation'].inside.rest = Prism.languages.python;
              Prism.languages.py = Prism.languages.python;
            },
            {}
          ],
          13: [
            function (require, module, exports) {
              (function (Prism) {
                Prism.languages.ruby = Prism.languages.extend('clike', {
                  'comment': [
                    /#.*/,
                    {
                      pattern: /^=begin\s[\s\S]*?^=end/m,
                      greedy: true
                    }
                  ],
                  'class-name': {
                    pattern: /(\b(?:class)\s+|\bcatch\s+\()[\w.\\]+/i,
                    lookbehind: true,
                    inside: { 'punctuation': /[.\\]/ }
                  },
                  'keyword': /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|protected|private|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/
                });
                var interpolation = {
                  pattern: /#\{[^}]+\}/,
                  inside: {
                    'delimiter': {
                      pattern: /^#\{|\}$/,
                      alias: 'tag'
                    },
                    rest: Prism.languages.ruby
                  }
                };
                delete Prism.languages.ruby.function;
                Prism.languages.insertBefore('ruby', 'keyword', {
                  'regex': [
                    {
                      pattern: /%r([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[gim]{0,3}/,
                      greedy: true,
                      inside: { 'interpolation': interpolation }
                    },
                    {
                      pattern: /%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,
                      greedy: true,
                      inside: { 'interpolation': interpolation }
                    },
                    {
                      pattern: /%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,
                      greedy: true,
                      inside: { 'interpolation': interpolation }
                    },
                    {
                      pattern: /%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,
                      greedy: true,
                      inside: { 'interpolation': interpolation }
                    },
                    {
                      pattern: /%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,
                      greedy: true,
                      inside: { 'interpolation': interpolation }
                    },
                    {
                      pattern: /(^|[^/])\/(?!\/)(?:\[.+?]|\\.|[^/\\\r\n])+\/[gim]{0,3}(?=\s*(?:$|[\r\n,.;})]))/,
                      lookbehind: true,
                      greedy: true
                    }
                  ],
                  'variable': /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
                  'symbol': {
                    pattern: /(^|[^:]):[a-zA-Z_]\w*(?:[?!]|\b)/,
                    lookbehind: true
                  },
                  'method-definition': {
                    pattern: /(\bdef\s+)[\w.]+/,
                    lookbehind: true,
                    inside: {
                      'function': /\w+$/,
                      rest: Prism.languages.ruby
                    }
                  }
                });
                Prism.languages.insertBefore('ruby', 'number', {
                  'builtin': /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
                  'constant': /\b[A-Z]\w*(?:[?!]|\b)/
                });
                Prism.languages.ruby.string = [
                  {
                    pattern: /%[qQiIwWxs]?([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
                    greedy: true,
                    inside: { 'interpolation': interpolation }
                  },
                  {
                    pattern: /%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,
                    greedy: true,
                    inside: { 'interpolation': interpolation }
                  },
                  {
                    pattern: /%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,
                    greedy: true,
                    inside: { 'interpolation': interpolation }
                  },
                  {
                    pattern: /%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,
                    greedy: true,
                    inside: { 'interpolation': interpolation }
                  },
                  {
                    pattern: /%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,
                    greedy: true,
                    inside: { 'interpolation': interpolation }
                  },
                  {
                    pattern: /("|')(?:#\{[^}]+\}|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                    greedy: true,
                    inside: { 'interpolation': interpolation }
                  }
                ];
                Prism.languages.rb = Prism.languages.ruby;
              }(Prism));
            },
            {}
          ],
          14: [
            function (require, module, exports) {
              var Prism = require('prismjs/components/prism-core');
              require('prismjs/components/prism-clike');
              require('prismjs/components/prism-markup-templating');
              require('prismjs/components/prism-c');
              require('prismjs/components/prism-cpp');
              require('prismjs/components/prism-csharp');
              require('prismjs/components/prism-css');
              require('prismjs/components/prism-java');
              require('prismjs/components/prism-javascript');
              require('prismjs/components/prism-markup');
              require('prismjs/components/prism-php');
              require('prismjs/components/prism-python');
              require('prismjs/components/prism-ruby');
              module.exports = { boltExport: Prism };
            },
            {
              'prismjs/components/prism-c': 1,
              'prismjs/components/prism-clike': 2,
              'prismjs/components/prism-core': 3,
              'prismjs/components/prism-cpp': 4,
              'prismjs/components/prism-csharp': 5,
              'prismjs/components/prism-css': 6,
              'prismjs/components/prism-java': 7,
              'prismjs/components/prism-javascript': 8,
              'prismjs/components/prism-markup': 10,
              'prismjs/components/prism-markup-templating': 9,
              'prismjs/components/prism-php': 11,
              'prismjs/components/prism-python': 12,
              'prismjs/components/prism-ruby': 13
            }
          ]
        }, {}, [14])(14);
      }));
      var prism = window.Prism;
      window.Prism = oldprism;
      return prism;
    }(undefined, exports$1, module, undefined));
    var Prism$1 = module.exports.boltExport;

    var getLanguages = function (editor) {
      return editor.getParam('codesample_languages');
    };
    var useGlobalPrismJS = function (editor) {
      return editor.getParam('codesample_global_prismjs', false, 'boolean');
    };

    var get = function (editor) {
      return Global.Prism && useGlobalPrismJS(editor) ? Global.Prism : Prism$1;
    };

    var getSelectedCodeSample = function (editor) {
      var node = editor.selection ? editor.selection.getNode() : null;
      if (isCodeSample(node)) {
        return Option.some(node);
      }
      return Option.none();
    };
    var insertCodeSample = function (editor, language, code) {
      editor.undoManager.transact(function () {
        var node = getSelectedCodeSample(editor);
        code = global$1.DOM.encode(code);
        return node.fold(function () {
          editor.insertContent('<pre id="__new" class="language-' + language + '">' + code + '</pre>');
          editor.selection.select(editor.$('#__new').removeAttr('id')[0]);
        }, function (n) {
          editor.dom.setAttrib(n, 'class', 'language-' + language);
          n.innerHTML = code;
          get(editor).highlightElement(n);
          editor.selection.select(n);
        });
      });
    };
    var getCurrentCode = function (editor) {
      var node = getSelectedCodeSample(editor);
      return node.fold(function () {
        return '';
      }, function (n) {
        return n.textContent;
      });
    };

    var getLanguages$1 = function (editor) {
      var defaultLanguages = [
        {
          text: 'HTML/XML',
          value: 'markup'
        },
        {
          text: 'JavaScript',
          value: 'javascript'
        },
        {
          text: 'CSS',
          value: 'css'
        },
        {
          text: 'PHP',
          value: 'php'
        },
        {
          text: 'Ruby',
          value: 'ruby'
        },
        {
          text: 'Python',
          value: 'python'
        },
        {
          text: 'Java',
          value: 'java'
        },
        {
          text: 'C',
          value: 'c'
        },
        {
          text: 'C#',
          value: 'csharp'
        },
        {
          text: 'C++',
          value: 'cpp'
        }
      ];
      var customLanguages = getLanguages(editor);
      return customLanguages ? customLanguages : defaultLanguages;
    };
    var getCurrentLanguage = function (editor, fallback) {
      var node = getSelectedCodeSample(editor);
      return node.fold(function () {
        return fallback;
      }, function (n) {
        var matches = n.className.match(/language-(\w+)/);
        return matches ? matches[1] : fallback;
      });
    };

    var open = function (editor) {
      var languages = getLanguages$1(editor);
      var defaultLanguage = head(languages).fold(function () {
        return '';
      }, function (l) {
        return l.value;
      });
      var currentLanguage = getCurrentLanguage(editor, defaultLanguage);
      var currentCode = getCurrentCode(editor);
      editor.windowManager.open({
        title: 'Insert/Edit Code Sample',
        size: 'large',
        body: {
          type: 'panel',
          items: [
            {
              type: 'selectbox',
              name: 'language',
              label: 'Language',
              items: languages
            },
            {
              type: 'textarea',
              name: 'code',
              label: 'Code view'
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
        initialData: {
          language: currentLanguage,
          code: currentCode
        },
        onSubmit: function (api) {
          var data = api.getData();
          insertCodeSample(editor, data.language, data.code);
          api.close();
        }
      });
    };

    var register = function (editor) {
      editor.addCommand('codesample', function () {
        var node = editor.selection.getNode();
        if (editor.selection.isCollapsed() || isCodeSample(node)) {
          open(editor);
        } else {
          editor.formatter.toggle('code');
        }
      });
    };

    var setup = function (editor) {
      var $ = editor.$;
      editor.on('PreProcess', function (e) {
        $('pre[contenteditable=false]', e.node).filter(trimArg(isCodeSample)).each(function (idx, elm) {
          var $elm = $(elm), code = elm.textContent;
          $elm.attr('class', $.trim($elm.attr('class')));
          $elm.removeAttr('contentEditable');
          $elm.empty().append($('<code></code>').each(function () {
            this.textContent = code;
          }));
        });
      });
      editor.on('SetContent', function () {
        var unprocessedCodeSamples = $('pre').filter(trimArg(isCodeSample)).filter(function (idx, elm) {
          return elm.contentEditable !== 'false';
        });
        if (unprocessedCodeSamples.length) {
          editor.undoManager.transact(function () {
            unprocessedCodeSamples.each(function (idx, elm) {
              $(elm).find('br').each(function (idx, elm) {
                elm.parentNode.replaceChild(editor.getDoc().createTextNode('\n'), elm);
              });
              elm.contentEditable = 'false';
              elm.innerHTML = editor.dom.encode(elm.textContent);
              get(editor).highlightElement(elm);
              elm.className = $.trim(elm.className);
            });
          });
        }
      });
    };

    var isCodeSampleSelection = function (editor) {
      var node = editor.selection.getStart();
      return editor.dom.is(node, 'pre[class*="language-"]');
    };
    var register$1 = function (editor) {
      editor.ui.registry.addToggleButton('codesample', {
        icon: 'code-sample',
        tooltip: 'Insert/edit code sample',
        onAction: function () {
          return open(editor);
        },
        onSetup: function (api) {
          var nodeChangeHandler = function () {
            api.setActive(isCodeSampleSelection(editor));
          };
          editor.on('NodeChange', nodeChangeHandler);
          return function () {
            return editor.off('NodeChange', nodeChangeHandler);
          };
        }
      });
      editor.ui.registry.addMenuItem('codesample', {
        text: 'Code sample...',
        icon: 'code-sample',
        onAction: function () {
          return open(editor);
        }
      });
    };

    function Plugin () {
      global.add('codesample', function (editor) {
        setup(editor);
        register$1(editor);
        register(editor);
        editor.on('dblclick', function (ev) {
          if (isCodeSample(ev.target)) {
            open(editor);
          }
        });
      });
    }

    Plugin();

}(window));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2NvZGVzYW1wbGUvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzR0FBc0c7O0FBRXRHLHNC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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFdBQVc7QUFDWDtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7O0FBRUE7O0FBRUEsQ0FBQyIsImZpbGUiOiJ2ZW5kb3JzfnRpbnltY2UtcGx1Z2luLWNvZGVzYW1wbGV+dGlueW1jZS1wbHVnaW4tY29kZXNhbXBsZS1wbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqXG4gKiBWZXJzaW9uOiA1LjQuMiAoMjAyMC0wOC0xNylcbiAqL1xuKGZ1bmN0aW9uIChkb21HbG9iYWxzKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIGdsb2JhbCA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLlBsdWdpbk1hbmFnZXInKTtcblxuICAgIHZhciBub29wID0gZnVuY3Rpb24gKCkge1xuICAgIH07XG4gICAgdmFyIGNvbnN0YW50ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIG5ldmVyID0gY29uc3RhbnQoZmFsc2UpO1xuICAgIHZhciBhbHdheXMgPSBjb25zdGFudCh0cnVlKTtcblxuICAgIHZhciBub25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIE5PTkU7XG4gICAgfTtcbiAgICB2YXIgTk9ORSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBlcSA9IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgIHJldHVybiBvLmlzTm9uZSgpO1xuICAgICAgfTtcbiAgICAgIHZhciBjYWxsID0gZnVuY3Rpb24gKHRodW5rKSB7XG4gICAgICAgIHJldHVybiB0aHVuaygpO1xuICAgICAgfTtcbiAgICAgIHZhciBpZCA9IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgIHJldHVybiBuO1xuICAgICAgfTtcbiAgICAgIHZhciBtZSA9IHtcbiAgICAgICAgZm9sZDogZnVuY3Rpb24gKG4sIF9zKSB7XG4gICAgICAgICAgcmV0dXJuIG4oKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXM6IG5ldmVyLFxuICAgICAgICBpc1NvbWU6IG5ldmVyLFxuICAgICAgICBpc05vbmU6IGFsd2F5cyxcbiAgICAgICAgZ2V0T3I6IGlkLFxuICAgICAgICBnZXRPclRodW5rOiBjYWxsLFxuICAgICAgICBnZXRPckRpZTogZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cgfHwgJ2Vycm9yOiBnZXRPckRpZSBjYWxsZWQgb24gbm9uZS4nKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0T3JOdWxsOiBjb25zdGFudChudWxsKSxcbiAgICAgICAgZ2V0T3JVbmRlZmluZWQ6IGNvbnN0YW50KHVuZGVmaW5lZCksXG4gICAgICAgIG9yOiBpZCxcbiAgICAgICAgb3JUaHVuazogY2FsbCxcbiAgICAgICAgbWFwOiBub25lLFxuICAgICAgICBlYWNoOiBub29wLFxuICAgICAgICBiaW5kOiBub25lLFxuICAgICAgICBleGlzdHM6IG5ldmVyLFxuICAgICAgICBmb3JhbGw6IGFsd2F5cyxcbiAgICAgICAgZmlsdGVyOiBub25lLFxuICAgICAgICBlcXVhbHM6IGVxLFxuICAgICAgICBlcXVhbHNfOiBlcSxcbiAgICAgICAgdG9BcnJheTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9TdHJpbmc6IGNvbnN0YW50KCdub25lKCknKVxuICAgICAgfTtcbiAgICAgIHJldHVybiBtZTtcbiAgICB9KCk7XG4gICAgdmFyIHNvbWUgPSBmdW5jdGlvbiAoYSkge1xuICAgICAgdmFyIGNvbnN0YW50X2EgPSBjb25zdGFudChhKTtcbiAgICAgIHZhciBzZWxmID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbWU7XG4gICAgICB9O1xuICAgICAgdmFyIGJpbmQgPSBmdW5jdGlvbiAoZikge1xuICAgICAgICByZXR1cm4gZihhKTtcbiAgICAgIH07XG4gICAgICB2YXIgbWUgPSB7XG4gICAgICAgIGZvbGQ6IGZ1bmN0aW9uIChuLCBzKSB7XG4gICAgICAgICAgcmV0dXJuIHMoYSk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgIHJldHVybiBhID09PSB2O1xuICAgICAgICB9LFxuICAgICAgICBpc1NvbWU6IGFsd2F5cyxcbiAgICAgICAgaXNOb25lOiBuZXZlcixcbiAgICAgICAgZ2V0T3I6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yVGh1bms6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yRGllOiBjb25zdGFudF9hLFxuICAgICAgICBnZXRPck51bGw6IGNvbnN0YW50X2EsXG4gICAgICAgIGdldE9yVW5kZWZpbmVkOiBjb25zdGFudF9hLFxuICAgICAgICBvcjogc2VsZixcbiAgICAgICAgb3JUaHVuazogc2VsZixcbiAgICAgICAgbWFwOiBmdW5jdGlvbiAoZikge1xuICAgICAgICAgIHJldHVybiBzb21lKGYoYSkpO1xuICAgICAgICB9LFxuICAgICAgICBlYWNoOiBmdW5jdGlvbiAoZikge1xuICAgICAgICAgIGYoYSk7XG4gICAgICAgIH0sXG4gICAgICAgIGJpbmQ6IGJpbmQsXG4gICAgICAgIGV4aXN0czogYmluZCxcbiAgICAgICAgZm9yYWxsOiBiaW5kLFxuICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgcmV0dXJuIGYoYSkgPyBtZSA6IE5PTkU7XG4gICAgICAgIH0sXG4gICAgICAgIHRvQXJyYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gW2FdO1xuICAgICAgICB9LFxuICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiAnc29tZSgnICsgYSArICcpJztcbiAgICAgICAgfSxcbiAgICAgICAgZXF1YWxzOiBmdW5jdGlvbiAobykge1xuICAgICAgICAgIHJldHVybiBvLmlzKGEpO1xuICAgICAgICB9LFxuICAgICAgICBlcXVhbHNfOiBmdW5jdGlvbiAobywgZWxlbWVudEVxKSB7XG4gICAgICAgICAgcmV0dXJuIG8uZm9sZChuZXZlciwgZnVuY3Rpb24gKGIpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50RXEoYSwgYik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXR1cm4gbWU7XG4gICAgfTtcbiAgICB2YXIgZnJvbSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgPyBOT05FIDogc29tZSh2YWx1ZSk7XG4gICAgfTtcbiAgICB2YXIgT3B0aW9uID0ge1xuICAgICAgc29tZTogc29tZSxcbiAgICAgIG5vbmU6IG5vbmUsXG4gICAgICBmcm9tOiBmcm9tXG4gICAgfTtcblxuICAgIHZhciBoZWFkID0gZnVuY3Rpb24gKHhzKSB7XG4gICAgICByZXR1cm4geHMubGVuZ3RoID09PSAwID8gT3B0aW9uLm5vbmUoKSA6IE9wdGlvbi5zb21lKHhzWzBdKTtcbiAgICB9O1xuXG4gICAgdmFyIGdsb2JhbCQxID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuZG9tLkRPTVV0aWxzJyk7XG5cbiAgICBmdW5jdGlvbiBpc0NvZGVTYW1wbGUoZWxtKSB7XG4gICAgICByZXR1cm4gZWxtICYmIGVsbS5ub2RlTmFtZSA9PT0gJ1BSRScgJiYgZWxtLmNsYXNzTmFtZS5pbmRleE9mKCdsYW5ndWFnZS0nKSAhPT0gLTE7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRyaW1BcmcocHJlZGljYXRlRm4pIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYXJnMSwgYXJnMikge1xuICAgICAgICByZXR1cm4gcHJlZGljYXRlRm4oYXJnMik7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHZhciBHbG9iYWwgPSB0eXBlb2YgZG9tR2xvYmFscy53aW5kb3cgIT09ICd1bmRlZmluZWQnID8gZG9tR2xvYmFscy53aW5kb3cgOiBGdW5jdGlvbigncmV0dXJuIHRoaXM7JykoKTtcblxuICAgIHZhciBleHBvcnRzJDEgPSB7fSwgbW9kdWxlID0geyBleHBvcnRzOiBleHBvcnRzJDEgfSwgZ2xvYmFsJDIgPSB7fTtcbiAgICAoZnVuY3Rpb24gKGRlZmluZSwgZXhwb3J0cywgbW9kdWxlLCByZXF1aXJlKSB7XG4gICAgICB2YXIgb2xkcHJpc20gPSB3aW5kb3cuUHJpc207XG4gICAgICB3aW5kb3cuUHJpc20gPSB7IG1hbnVhbDogdHJ1ZSB9O1xuICAgICAgKGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGYoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgICBkZWZpbmUoW10sIGYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBnO1xuICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgZyA9IHdpbmRvdztcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwkMiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGcgPSBnbG9iYWwkMjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgZyA9IHNlbGY7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGcgPSB0aGlzO1xuICAgICAgICAgIH1cbiAgICAgICAgICBnLkVwaG94Q29udGFjdFdyYXBwZXIgPSBmKCk7XG4gICAgICAgIH1cbiAgICAgIH0oZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGZ1bmN0aW9uIHIoZSwgbiwgdCkge1xuICAgICAgICAgICAgZnVuY3Rpb24gbyhpLCBmKSB7XG4gICAgICAgICAgICAgIGlmICghbltpXSkge1xuICAgICAgICAgICAgICAgIGlmICghZVtpXSkge1xuICAgICAgICAgICAgICAgICAgdmFyIGMgPSAnZnVuY3Rpb24nID09IHR5cGVvZiByZXF1aXJlICYmIHJlcXVpcmU7XG4gICAgICAgICAgICAgICAgICBpZiAoIWYgJiYgYylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGMoaSwgITApO1xuICAgICAgICAgICAgICAgICAgaWYgKHUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1KGksICEwKTtcbiAgICAgICAgICAgICAgICAgIHZhciBhID0gbmV3IEVycm9yKCdDYW5ub3QgZmluZCBtb2R1bGUgXFwnJyArIGkgKyAnXFwnJyk7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBhLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCcsIGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBwID0gbltpXSA9IHsgZXhwb3J0czoge30gfTtcbiAgICAgICAgICAgICAgICBlW2ldWzBdLmNhbGwocC5leHBvcnRzLCBmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICAgICAgdmFyIG4gPSBlW2ldWzFdW3JdO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG8obiB8fCByKTtcbiAgICAgICAgICAgICAgICB9LCBwLCBwLmV4cG9ydHMsIHIsIGUsIG4sIHQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBuW2ldLmV4cG9ydHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciB1ID0gJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgcmVxdWlyZSAmJiByZXF1aXJlLCBpID0gMDsgaSA8IHQubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICAgIG8odFtpXSk7XG4gICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgIH0oKSh7XG4gICAgICAgICAgMTogW1xuICAgICAgICAgICAgZnVuY3Rpb24gKHJlcXVpcmUsIG1vZHVsZSwgZXhwb3J0cykge1xuICAgICAgICAgICAgICBQcmlzbS5sYW5ndWFnZXMuYyA9IFByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ2NsaWtlJywge1xuICAgICAgICAgICAgICAgICdjbGFzcy1uYW1lJzoge1xuICAgICAgICAgICAgICAgICAgcGF0dGVybjogLyhcXGIoPzplbnVtfHN0cnVjdClcXHMrKVxcdysvLFxuICAgICAgICAgICAgICAgICAgbG9va2JlaGluZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2tleXdvcmQnOiAvXFxiKD86X0FsaWduYXN8X0FsaWdub2Z8X0F0b21pY3xfQm9vbHxfQ29tcGxleHxfR2VuZXJpY3xfSW1hZ2luYXJ5fF9Ob3JldHVybnxfU3RhdGljX2Fzc2VydHxfVGhyZWFkX2xvY2FsfGFzbXx0eXBlb2Z8aW5saW5lfGF1dG98YnJlYWt8Y2FzZXxjaGFyfGNvbnN0fGNvbnRpbnVlfGRlZmF1bHR8ZG98ZG91YmxlfGVsc2V8ZW51bXxleHRlcm58ZmxvYXR8Zm9yfGdvdG98aWZ8aW50fGxvbmd8cmVnaXN0ZXJ8cmV0dXJufHNob3J0fHNpZ25lZHxzaXplb2Z8c3RhdGljfHN0cnVjdHxzd2l0Y2h8dHlwZWRlZnx1bmlvbnx1bnNpZ25lZHx2b2lkfHZvbGF0aWxlfHdoaWxlKVxcYi8sXG4gICAgICAgICAgICAgICAgJ29wZXJhdG9yJzogLz4+PT98PDw9P3wtPnwoWy0rJnw6XSlcXDF8Wz86fl18Wy0rKi8lJnxeIT08Pl09Py8sXG4gICAgICAgICAgICAgICAgJ251bWJlcic6IC8oPzpcXGIweCg/OltcXGRhLWZdK1xcLj9bXFxkYS1mXSp8XFwuW1xcZGEtZl0rKSg/OnBbKy1dP1xcZCspP3woPzpcXGJcXGQrXFwuP1xcZCp8XFxCXFwuXFxkKykoPzplWystXT9cXGQrKT8pW2Z1bF0qL2lcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2MnLCAnc3RyaW5nJywge1xuICAgICAgICAgICAgICAgICdtYWNybyc6IHtcbiAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC8oXlxccyopI1xccypbYS16XSsoPzpbXlxcclxcblxcXFxdfFxcXFwoPzpcXHJcXG58W1xcc1xcU10pKSovaW0sXG4gICAgICAgICAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgYWxpYXM6ICdwcm9wZXJ0eScsXG4gICAgICAgICAgICAgICAgICBpbnNpZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3N0cmluZyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvKCNcXHMqaW5jbHVkZVxccyopKD86PC4rPz58KFwifCcpKD86XFxcXD8uKSs/XFwyKS8sXG4gICAgICAgICAgICAgICAgICAgICAgbG9va2JlaGluZDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnZGlyZWN0aXZlJzoge1xuICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC8oI1xccyopXFxiKD86ZGVmaW5lfGRlZmluZWR8ZWxpZnxlbHNlfGVuZGlmfGVycm9yfGlmZGVmfGlmbmRlZnxpZnxpbXBvcnR8aW5jbHVkZXxsaW5lfHByYWdtYXx1bmRlZnx1c2luZylcXGIvLFxuICAgICAgICAgICAgICAgICAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgYWxpYXM6ICdrZXl3b3JkJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnY29uc3RhbnQnOiAvXFxiKD86X19GSUxFX198X19MSU5FX198X19EQVRFX198X19USU1FX198X19USU1FU1RBTVBfX3xfX2Z1bmNfX3xFT0Z8TlVMTHxTRUVLX0NVUnxTRUVLX0VORHxTRUVLX1NFVHxzdGRpbnxzdGRvdXR8c3RkZXJyKVxcYi9cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGRlbGV0ZSBQcmlzbS5sYW5ndWFnZXMuY1snYm9vbGVhbiddO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHt9XG4gICAgICAgICAgXSxcbiAgICAgICAgICAyOiBbXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVxdWlyZSwgbW9kdWxlLCBleHBvcnRzKSB7XG4gICAgICAgICAgICAgIFByaXNtLmxhbmd1YWdlcy5jbGlrZSA9IHtcbiAgICAgICAgICAgICAgICAnY29tbWVudCc6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogLyhefFteXFxcXF0pXFwvXFwqW1xcc1xcU10qPyg/OlxcKlxcL3wkKS8sXG4gICAgICAgICAgICAgICAgICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC8oXnxbXlxcXFw6XSlcXC9cXC8uKi8sXG4gICAgICAgICAgICAgICAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGdyZWVkeTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgJ3N0cmluZyc6IHtcbiAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC8oW1wiJ10pKD86XFxcXCg/OlxcclxcbnxbXFxzXFxTXSl8KD8hXFwxKVteXFxcXFxcclxcbl0pKlxcMS8sXG4gICAgICAgICAgICAgICAgICBncmVlZHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdjbGFzcy1uYW1lJzoge1xuICAgICAgICAgICAgICAgICAgcGF0dGVybjogLyhcXGIoPzpjbGFzc3xpbnRlcmZhY2V8ZXh0ZW5kc3xpbXBsZW1lbnRzfHRyYWl0fGluc3RhbmNlb2Z8bmV3KVxccyt8XFxiY2F0Y2hcXHMrXFwoKVtcXHcuXFxcXF0rL2ksXG4gICAgICAgICAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgaW5zaWRlOiB7ICdwdW5jdHVhdGlvbic6IC9bLlxcXFxdLyB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAna2V5d29yZCc6IC9cXGIoPzppZnxlbHNlfHdoaWxlfGRvfGZvcnxyZXR1cm58aW58aW5zdGFuY2VvZnxmdW5jdGlvbnxuZXd8dHJ5fHRocm93fGNhdGNofGZpbmFsbHl8bnVsbHxicmVha3xjb250aW51ZSlcXGIvLFxuICAgICAgICAgICAgICAgICdib29sZWFuJzogL1xcYig/OnRydWV8ZmFsc2UpXFxiLyxcbiAgICAgICAgICAgICAgICAnZnVuY3Rpb24nOiAvXFx3Kyg/PVxcKCkvLFxuICAgICAgICAgICAgICAgICdudW1iZXInOiAvXFxiMHhbXFxkYS1mXStcXGJ8KD86XFxiXFxkK1xcLj9cXGQqfFxcQlxcLlxcZCspKD86ZVsrLV0/XFxkKyk/L2ksXG4gICAgICAgICAgICAgICAgJ29wZXJhdG9yJzogL1s8Pl09P3xbIT1dPT89P3wtLT98XFwrXFwrP3wmJj98XFx8XFx8P3xbPyovfl4lXS8sXG4gICAgICAgICAgICAgICAgJ3B1bmN0dWF0aW9uJzogL1t7fVtcXF07KCksLjpdL1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHt9XG4gICAgICAgICAgXSxcbiAgICAgICAgICAzOiBbXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVxdWlyZSwgbW9kdWxlLCBleHBvcnRzKSB7XG4gICAgICAgICAgICAgIChmdW5jdGlvbiAoZ2xvYmFsKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9zZWxmID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgIT09ICd1bmRlZmluZWQnICYmIHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSA/IHNlbGYgOiB7fTtcbiAgICAgICAgICAgICAgICB2YXIgUHJpc20gPSBmdW5jdGlvbiAoX3NlbGYpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBsYW5nID0gL1xcYmxhbmcoPzp1YWdlKT8tKFtcXHctXSspXFxiL2k7XG4gICAgICAgICAgICAgICAgICB2YXIgdW5pcXVlSWQgPSAwO1xuICAgICAgICAgICAgICAgICAgdmFyIF8gPSB7XG4gICAgICAgICAgICAgICAgICAgIG1hbnVhbDogX3NlbGYuUHJpc20gJiYgX3NlbGYuUHJpc20ubWFudWFsLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlV29ya2VyTWVzc2FnZUhhbmRsZXI6IF9zZWxmLlByaXNtICYmIF9zZWxmLlByaXNtLmRpc2FibGVXb3JrZXJNZXNzYWdlSGFuZGxlcixcbiAgICAgICAgICAgICAgICAgICAgdXRpbDoge1xuICAgICAgICAgICAgICAgICAgICAgIGVuY29kZTogZnVuY3Rpb24gKHRva2Vucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VucyBpbnN0YW5jZW9mIFRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVG9rZW4odG9rZW5zLnR5cGUsIF8udXRpbC5lbmNvZGUodG9rZW5zLmNvbnRlbnQpLCB0b2tlbnMuYWxpYXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHRva2VucykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRva2Vucy5tYXAoXy51dGlsLmVuY29kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW5zLnJlcGxhY2UoLyYvZywgJyZhbXA7JykucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoL1xcdTAwYTAvZywgJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIG9iaklkOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9ialsnX19pZCddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdfX2lkJywgeyB2YWx1ZTogKyt1bmlxdWVJZCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmpbJ19faWQnXTtcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGNsb25lOiBmdW5jdGlvbiBkZWVwQ2xvbmUobywgdmlzaXRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNsb25lLCBpZCwgdHlwZSA9IF8udXRpbC50eXBlKG8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlzaXRlZCA9IHZpc2l0ZWQgfHwge307XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ09iamVjdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gXy51dGlsLm9iaklkKG8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmlzaXRlZFtpZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmlzaXRlZFtpZF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmUgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaXRlZFtpZF0gPSBjbG9uZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZVtrZXldID0gZGVlcENsb25lKG9ba2V5XSwgdmlzaXRlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbG9uZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0FycmF5JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSBfLnV0aWwub2JqSWQobyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2aXNpdGVkW2lkXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2aXNpdGVkW2lkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpdGVkW2lkXSA9IGNsb25lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvLmZvckVhY2goZnVuY3Rpb24gKHYsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZVtpXSA9IGRlZXBDbG9uZSh2LCB2aXNpdGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbG9uZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgZ2V0TGFuZ3VhZ2U6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoZWxlbWVudCAmJiAhbGFuZy50ZXN0KGVsZW1lbnQuY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChlbGVtZW50LmNsYXNzTmFtZS5tYXRjaChsYW5nKSB8fCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdub25lJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICBdKVsxXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdub25lJztcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTY3JpcHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCdjdXJyZW50U2NyaXB0JyBpbiBkb2N1bWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3VycmVudFNjcmlwdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzcmMgPSAoL2F0IFteKFxcclxcbl0qXFwoKC4qKTouKzouK1xcKSQvaS5leGVjKGVyci5zdGFjaykgfHwgW10pWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3JjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBzY3JpcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2NyaXB0c1tpXS5zcmMgPT0gc3JjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzY3JpcHRzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlczoge1xuICAgICAgICAgICAgICAgICAgICAgIGV4dGVuZDogZnVuY3Rpb24gKGlkLCByZWRlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhbmcgPSBfLnV0aWwuY2xvbmUoXy5sYW5ndWFnZXNbaWRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiByZWRlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBsYW5nW2tleV0gPSByZWRlZltrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxhbmc7XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRCZWZvcmU6IGZ1bmN0aW9uIChpbnNpZGUsIGJlZm9yZSwgaW5zZXJ0LCByb290KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb290ID0gcm9vdCB8fCBfLmxhbmd1YWdlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBncmFtbWFyID0gcm9vdFtpbnNpZGVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgdG9rZW4gaW4gZ3JhbW1hcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JhbW1hci5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4gPT0gYmVmb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBuZXdUb2tlbiBpbiBpbnNlcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc2VydC5oYXNPd25Qcm9wZXJ0eShuZXdUb2tlbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXRbbmV3VG9rZW5dID0gaW5zZXJ0W25ld1Rva2VuXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWluc2VydC5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldFt0b2tlbl0gPSBncmFtbWFyW3Rva2VuXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvbGQgPSByb290W2luc2lkZV07XG4gICAgICAgICAgICAgICAgICAgICAgICByb290W2luc2lkZV0gPSByZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmxhbmd1YWdlcy5ERlMoXy5sYW5ndWFnZXMsIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gb2xkICYmIGtleSAhPSBpbnNpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSByZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIERGUzogZnVuY3Rpb24gREZTKG8sIGNhbGxiYWNrLCB0eXBlLCB2aXNpdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNpdGVkID0gdmlzaXRlZCB8fCB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYmpJZCA9IF8udXRpbC5vYmpJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gbykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwobywgaSwgb1tpXSwgdHlwZSB8fCBpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHkgPSBvW2ldLCBwcm9wZXJ0eVR5cGUgPSBfLnV0aWwudHlwZShwcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5VHlwZSA9PT0gJ09iamVjdCcgJiYgIXZpc2l0ZWRbb2JqSWQocHJvcGVydHkpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaXRlZFtvYmpJZChwcm9wZXJ0eSldID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERGUyhwcm9wZXJ0eSwgY2FsbGJhY2ssIG51bGwsIHZpc2l0ZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHlUeXBlID09PSAnQXJyYXknICYmICF2aXNpdGVkW29iaklkKHByb3BlcnR5KV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2l0ZWRbb2JqSWQocHJvcGVydHkpXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBERlMocHJvcGVydHksIGNhbGxiYWNrLCBpLCB2aXNpdGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHBsdWdpbnM6IHt9LFxuICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHRBbGw6IGZ1bmN0aW9uIChhc3luYywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICBfLmhpZ2hsaWdodEFsbFVuZGVyKGRvY3VtZW50LCBhc3luYywgY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBoaWdobGlnaHRBbGxVbmRlcjogZnVuY3Rpb24gKGNvbnRhaW5lciwgYXN5bmMsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIGVudiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6ICdjb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSwgW2NsYXNzKj1cImxhbmd1YWdlLVwiXSBjb2RlLCBjb2RlW2NsYXNzKj1cImxhbmctXCJdLCBbY2xhc3MqPVwibGFuZy1cIl0gY29kZSdcbiAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgIF8uaG9va3MucnVuKCdiZWZvcmUtaGlnaGxpZ2h0YWxsJywgZW52KTtcbiAgICAgICAgICAgICAgICAgICAgICBlbnYuZWxlbWVudHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoZW52LmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKGVudi5zZWxlY3RvcikpO1xuICAgICAgICAgICAgICAgICAgICAgIF8uaG9va3MucnVuKCdiZWZvcmUtYWxsLWVsZW1lbnRzLWhpZ2hsaWdodCcsIGVudik7XG4gICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGVsZW1lbnQ7IGVsZW1lbnQgPSBlbnYuZWxlbWVudHNbaSsrXTspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uaGlnaGxpZ2h0RWxlbWVudChlbGVtZW50LCBhc3luYyA9PT0gdHJ1ZSwgZW52LmNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hsaWdodEVsZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50LCBhc3luYywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgbGFuZ3VhZ2UgPSBfLnV0aWwuZ2V0TGFuZ3VhZ2UoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIGdyYW1tYXIgPSBfLmxhbmd1YWdlc1tsYW5ndWFnZV07XG4gICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKGxhbmcsICcnKS5yZXBsYWNlKC9cXHMrL2csICcgJykgKyAnIGxhbmd1YWdlLScgKyBsYW5ndWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnQgJiYgcGFyZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdwcmUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQuY2xhc3NOYW1lID0gcGFyZW50LmNsYXNzTmFtZS5yZXBsYWNlKGxhbmcsICcnKS5yZXBsYWNlKC9cXHMrL2csICcgJykgKyAnIGxhbmd1YWdlLScgKyBsYW5ndWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIGNvZGUgPSBlbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBlbnYgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2U6IGxhbmd1YWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JhbW1hcjogZ3JhbW1hcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IGNvZGVcbiAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGluc2VydEhpZ2hsaWdodGVkQ29kZShoaWdobGlnaHRlZENvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudi5oaWdobGlnaHRlZENvZGUgPSBoaWdobGlnaHRlZENvZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmhvb2tzLnJ1bignYmVmb3JlLWluc2VydCcsIGVudik7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnYuZWxlbWVudC5pbm5lckhUTUwgPSBlbnYuaGlnaGxpZ2h0ZWRDb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5ob29rcy5ydW4oJ2FmdGVyLWhpZ2hsaWdodCcsIGVudik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmhvb2tzLnJ1bignY29tcGxldGUnLCBlbnYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2suY2FsbChlbnYuZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF8uaG9va3MucnVuKCdiZWZvcmUtc2FuaXR5LWNoZWNrJywgZW52KTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVudi5jb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmhvb2tzLnJ1bignY29tcGxldGUnLCBlbnYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2suY2FsbChlbnYuZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF8uaG9va3MucnVuKCdiZWZvcmUtaGlnaGxpZ2h0JywgZW52KTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVudi5ncmFtbWFyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRIaWdobGlnaHRlZENvZGUoXy51dGlsLmVuY29kZShlbnYuY29kZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBpZiAoYXN5bmMgJiYgX3NlbGYuV29ya2VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgd29ya2VyID0gbmV3IFdvcmtlcihfLmZpbGVuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlci5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGluc2VydEhpZ2hsaWdodGVkQ29kZShldnQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2U6IGVudi5sYW5ndWFnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogZW52LmNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGltbWVkaWF0ZUNsb3NlOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc2VydEhpZ2hsaWdodGVkQ29kZShfLmhpZ2hsaWdodChlbnYuY29kZSwgZW52LmdyYW1tYXIsIGVudi5sYW5ndWFnZSkpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgaGlnaGxpZ2h0OiBmdW5jdGlvbiAodGV4dCwgZ3JhbW1hciwgbGFuZ3VhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgZW52ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogdGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyYW1tYXI6IGdyYW1tYXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZTogbGFuZ3VhZ2VcbiAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgIF8uaG9va3MucnVuKCdiZWZvcmUtdG9rZW5pemUnLCBlbnYpO1xuICAgICAgICAgICAgICAgICAgICAgIGVudi50b2tlbnMgPSBfLnRva2VuaXplKGVudi5jb2RlLCBlbnYuZ3JhbW1hcik7XG4gICAgICAgICAgICAgICAgICAgICAgXy5ob29rcy5ydW4oJ2FmdGVyLXRva2VuaXplJywgZW52KTtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gVG9rZW4uc3RyaW5naWZ5KF8udXRpbC5lbmNvZGUoZW52LnRva2VucyksIGVudi5sYW5ndWFnZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoR3JhbW1hcjogZnVuY3Rpb24gKHRleHQsIHN0cmFyciwgZ3JhbW1hciwgaW5kZXgsIHN0YXJ0UG9zLCBvbmVzaG90LCB0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB0b2tlbiBpbiBncmFtbWFyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWdyYW1tYXIuaGFzT3duUHJvcGVydHkodG9rZW4pIHx8ICFncmFtbWFyW3Rva2VuXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXR0ZXJucyA9IGdyYW1tYXJbdG9rZW5dO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybnMgPSBBcnJheS5pc0FycmF5KHBhdHRlcm5zKSA/IHBhdHRlcm5zIDogW3BhdHRlcm5zXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcGF0dGVybnMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQgPT0gdG9rZW4gKyAnLCcgKyBqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXR0ZXJuID0gcGF0dGVybnNbal0sIGluc2lkZSA9IHBhdHRlcm4uaW5zaWRlLCBsb29rYmVoaW5kID0gISFwYXR0ZXJuLmxvb2tiZWhpbmQsIGdyZWVkeSA9ICEhcGF0dGVybi5ncmVlZHksIGxvb2tiZWhpbmRMZW5ndGggPSAwLCBhbGlhcyA9IHBhdHRlcm4uYWxpYXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmVlZHkgJiYgIXBhdHRlcm4ucGF0dGVybi5nbG9iYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmxhZ3MgPSBwYXR0ZXJuLnBhdHRlcm4udG9TdHJpbmcoKS5tYXRjaCgvW2ltc3V5XSokLylbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybi5wYXR0ZXJuID0gUmVnRXhwKHBhdHRlcm4ucGF0dGVybi5zb3VyY2UsIGZsYWdzICsgJ2cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuID0gcGF0dGVybi5wYXR0ZXJuIHx8IHBhdHRlcm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBpbmRleCwgcG9zID0gc3RhcnRQb3M7IGkgPCBzdHJhcnIubGVuZ3RoOyBwb3MgKz0gc3RyYXJyW2ldLmxlbmd0aCwgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0ciA9IHN0cmFycltpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RyYXJyLmxlbmd0aCA+IHRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHIgaW5zdGFuY2VvZiBUb2tlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmVlZHkgJiYgaSAhPSBzdHJhcnIubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybi5sYXN0SW5kZXggPSBwb3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSBwYXR0ZXJuLmV4ZWModGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZyb20gPSBtYXRjaC5pbmRleCArIChsb29rYmVoaW5kICYmIG1hdGNoWzFdID8gbWF0Y2hbMV0ubGVuZ3RoIDogMCksIHRvID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGgsIGsgPSBpLCBwID0gcG9zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbGVuID0gc3RyYXJyLmxlbmd0aDsgayA8IGxlbiAmJiAocCA8IHRvIHx8ICFzdHJhcnJba10udHlwZSAmJiAhc3RyYXJyW2sgLSAxXS5ncmVlZHkpOyArK2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcCArPSBzdHJhcnJba10ubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZnJvbSA+PSBwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKytpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcyA9IHA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHJhcnJbaV0gaW5zdGFuY2VvZiBUb2tlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbE51bSA9IGsgLSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gdGV4dC5zbGljZShwb3MsIHApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2guaW5kZXggLT0gcG9zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuLmxhc3RJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSBwYXR0ZXJuLmV4ZWMoc3RyKSwgZGVsTnVtID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uZXNob3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvb2tiZWhpbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvb2tiZWhpbmRMZW5ndGggPSBtYXRjaFsxXSA/IG1hdGNoWzFdLmxlbmd0aCA6IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmcm9tID0gbWF0Y2guaW5kZXggKyBsb29rYmVoaW5kTGVuZ3RoLCBtYXRjaCA9IG1hdGNoWzBdLnNsaWNlKGxvb2tiZWhpbmRMZW5ndGgpLCB0byA9IGZyb20gKyBtYXRjaC5sZW5ndGgsIGJlZm9yZSA9IHN0ci5zbGljZSgwLCBmcm9tKSwgYWZ0ZXIgPSBzdHIuc2xpY2UodG8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbE51bVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJlZm9yZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKytpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zICs9IGJlZm9yZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goYmVmb3JlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdyYXBwZWQgPSBuZXcgVG9rZW4odG9rZW4sIGluc2lkZSA/IF8udG9rZW5pemUobWF0Y2gsIGluc2lkZSkgOiBtYXRjaCwgYWxpYXMsIG1hdGNoLCBncmVlZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh3cmFwcGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWZ0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChhZnRlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5zcGxpY2UuYXBwbHkoc3RyYXJyLCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVsTnVtICE9IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLm1hdGNoR3JhbW1hcih0ZXh0LCBzdHJhcnIsIGdyYW1tYXIsIGksIHBvcywgdHJ1ZSwgdG9rZW4gKyAnLCcgKyBqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob25lc2hvdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB0b2tlbml6ZTogZnVuY3Rpb24gKHRleHQsIGdyYW1tYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RyYXJyID0gW3RleHRdO1xuICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN0ID0gZ3JhbW1hci5yZXN0O1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB0b2tlbiBpbiByZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGdyYW1tYXJbdG9rZW5dID0gcmVzdFt0b2tlbl07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgZ3JhbW1hci5yZXN0O1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBfLm1hdGNoR3JhbW1hcih0ZXh0LCBzdHJhcnIsIGdyYW1tYXIsIDAsIDAsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyYXJyO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBob29rczoge1xuICAgICAgICAgICAgICAgICAgICAgIGFsbDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgYWRkOiBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBob29rcyA9IF8uaG9va3MuYWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgaG9va3NbbmFtZV0gPSBob29rc1tuYW1lXSB8fCBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvb2tzW25hbWVdLnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAobmFtZSwgZW52KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2tzID0gXy5ob29rcy5hbGxbbmFtZV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbGxiYWNrcyB8fCAhY2FsbGJhY2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgY2FsbGJhY2s7IGNhbGxiYWNrID0gY2FsbGJhY2tzW2krK107KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVudik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBUb2tlbjogVG9rZW5cbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICBfc2VsZi5QcmlzbSA9IF87XG4gICAgICAgICAgICAgICAgICBmdW5jdGlvbiBUb2tlbih0eXBlLCBjb250ZW50LCBhbGlhcywgbWF0Y2hlZFN0ciwgZ3JlZWR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxpYXMgPSBhbGlhcztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZW5ndGggPSAobWF0Y2hlZFN0ciB8fCAnJykubGVuZ3RoIHwgMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmVlZHkgPSAhIWdyZWVkeTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIFRva2VuLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIChvLCBsYW5ndWFnZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG8gPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvKSkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvLm1hcChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFRva2VuLnN0cmluZ2lmeShlbGVtZW50LCBsYW5ndWFnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgfSkuam9pbignJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIGVudiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBvLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgY29udGVudDogVG9rZW4uc3RyaW5naWZ5KG8uY29udGVudCwgbGFuZ3VhZ2UpLFxuICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ3NwYW4nLFxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICd0b2tlbicsXG4gICAgICAgICAgICAgICAgICAgICAgICBvLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlOiBsYW5ndWFnZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAoby5hbGlhcykge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBhbGlhc2VzID0gQXJyYXkuaXNBcnJheShvLmFsaWFzKSA/IG8uYWxpYXMgOiBbby5hbGlhc107XG4gICAgICAgICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoZW52LmNsYXNzZXMsIGFsaWFzZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF8uaG9va3MucnVuKCd3cmFwJywgZW52KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBPYmplY3Qua2V5cyhlbnYuYXR0cmlidXRlcykubWFwKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5hbWUgKyAnPVwiJyArIChlbnYuYXR0cmlidXRlc1tuYW1lXSB8fCAnJykucmVwbGFjZSgvXCIvZywgJyZxdW90OycpICsgJ1wiJztcbiAgICAgICAgICAgICAgICAgICAgfSkuam9pbignICcpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzwnICsgZW52LnRhZyArICcgY2xhc3M9XCInICsgZW52LmNsYXNzZXMuam9pbignICcpICsgJ1wiJyArIChhdHRyaWJ1dGVzID8gJyAnICsgYXR0cmlidXRlcyA6ICcnKSArICc+JyArIGVudi5jb250ZW50ICsgJzwvJyArIGVudi50YWcgKyAnPic7XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgaWYgKCFfc2VsZi5kb2N1bWVudCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIV9zZWxmLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIV8uZGlzYWJsZVdvcmtlck1lc3NhZ2VIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgX3NlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gSlNPTi5wYXJzZShldnQuZGF0YSksIGxhbmcgPSBtZXNzYWdlLmxhbmd1YWdlLCBjb2RlID0gbWVzc2FnZS5jb2RlLCBpbW1lZGlhdGVDbG9zZSA9IG1lc3NhZ2UuaW1tZWRpYXRlQ2xvc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBfc2VsZi5wb3N0TWVzc2FnZShfLmhpZ2hsaWdodChjb2RlLCBfLmxhbmd1YWdlc1tsYW5nXSwgbGFuZykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltbWVkaWF0ZUNsb3NlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxmLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgdmFyIHNjcmlwdCA9IF8udXRpbC5jdXJyZW50U2NyaXB0KCk7XG4gICAgICAgICAgICAgICAgICBpZiAoc2NyaXB0KSB7XG4gICAgICAgICAgICAgICAgICAgIF8uZmlsZW5hbWUgPSBzY3JpcHQuc3JjO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2NyaXB0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1tYW51YWwnKSkge1xuICAgICAgICAgICAgICAgICAgICAgIF8ubWFudWFsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWYgKCFfLm1hbnVhbCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaGlnaGxpZ2h0QXV0b21hdGljYWxseUNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgIGlmICghXy5tYW51YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uaGlnaGxpZ2h0QWxsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVhZHlTdGF0ZSA9IGRvY3VtZW50LnJlYWR5U3RhdGU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWFkeVN0YXRlID09PSAnbG9hZGluZycgfHwgcmVhZHlTdGF0ZSA9PT0gJ2ludGVyYWN0aXZlJyAmJiBzY3JpcHQgJiYgc2NyaXB0LmRlZmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGhpZ2hsaWdodEF1dG9tYXRpY2FsbHlDYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGlnaGxpZ2h0QXV0b21hdGljYWxseUNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoaGlnaGxpZ2h0QXV0b21hdGljYWxseUNhbGxiYWNrLCAxNik7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICByZXR1cm4gXztcbiAgICAgICAgICAgICAgICB9KF9zZWxmKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gUHJpc207XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgZ2xvYmFsLlByaXNtID0gUHJpc207XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LmNhbGwodGhpcywgdHlwZW9mIGdsb2JhbCQyICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCQyIDogdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDoge30pKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7fVxuICAgICAgICAgIF0sXG4gICAgICAgICAgNDogW1xuICAgICAgICAgICAgZnVuY3Rpb24gKHJlcXVpcmUsIG1vZHVsZSwgZXhwb3J0cykge1xuICAgICAgICAgICAgICBQcmlzbS5sYW5ndWFnZXMuY3BwID0gUHJpc20ubGFuZ3VhZ2VzLmV4dGVuZCgnYycsIHtcbiAgICAgICAgICAgICAgICAnY2xhc3MtbmFtZSc6IHtcbiAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC8oXFxiKD86Y2xhc3N8ZW51bXxzdHJ1Y3QpXFxzKylcXHcrLyxcbiAgICAgICAgICAgICAgICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdrZXl3b3JkJzogL1xcYig/OmFsaWduYXN8YWxpZ25vZnxhc218YXV0b3xib29sfGJyZWFrfGNhc2V8Y2F0Y2h8Y2hhcnxjaGFyMTZfdHxjaGFyMzJfdHxjbGFzc3xjb21wbHxjb25zdHxjb25zdGV4cHJ8Y29uc3RfY2FzdHxjb250aW51ZXxkZWNsdHlwZXxkZWZhdWx0fGRlbGV0ZXxkb3xkb3VibGV8ZHluYW1pY19jYXN0fGVsc2V8ZW51bXxleHBsaWNpdHxleHBvcnR8ZXh0ZXJufGZsb2F0fGZvcnxmcmllbmR8Z290b3xpZnxpbmxpbmV8aW50fGludDhfdHxpbnQxNl90fGludDMyX3R8aW50NjRfdHx1aW50OF90fHVpbnQxNl90fHVpbnQzMl90fHVpbnQ2NF90fGxvbmd8bXV0YWJsZXxuYW1lc3BhY2V8bmV3fG5vZXhjZXB0fG51bGxwdHJ8b3BlcmF0b3J8cHJpdmF0ZXxwcm90ZWN0ZWR8cHVibGljfHJlZ2lzdGVyfHJlaW50ZXJwcmV0X2Nhc3R8cmV0dXJufHNob3J0fHNpZ25lZHxzaXplb2Z8c3RhdGljfHN0YXRpY19hc3NlcnR8c3RhdGljX2Nhc3R8c3RydWN0fHN3aXRjaHx0ZW1wbGF0ZXx0aGlzfHRocmVhZF9sb2NhbHx0aHJvd3x0cnl8dHlwZWRlZnx0eXBlaWR8dHlwZW5hbWV8dW5pb258dW5zaWduZWR8dXNpbmd8dmlydHVhbHx2b2lkfHZvbGF0aWxlfHdjaGFyX3R8d2hpbGUpXFxiLyxcbiAgICAgICAgICAgICAgICAnbnVtYmVyJzoge1xuICAgICAgICAgICAgICAgICAgcGF0dGVybjogLyg/OlxcYjBiWzAxJ10rfFxcYjB4KD86W1xcZGEtZiddK1xcLj9bXFxkYS1mJ10qfFxcLltcXGRhLWYnXSspKD86cFsrLV0/W1xcZCddKyk/fCg/OlxcYltcXGQnXStcXC4/W1xcZCddKnxcXEJcXC5bXFxkJ10rKSg/OmVbKy1dP1tcXGQnXSspPylbZnVsXSovaSxcbiAgICAgICAgICAgICAgICAgIGdyZWVkeTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ29wZXJhdG9yJzogLz4+PT98PDw9P3wtPnwoWy0rJnw6XSlcXDF8Wz86fl18Wy0rKi8lJnxeIT08Pl09P3xcXGIoPzphbmR8YW5kX2VxfGJpdGFuZHxiaXRvcnxub3R8bm90X2VxfG9yfG9yX2VxfHhvcnx4b3JfZXEpXFxiLyxcbiAgICAgICAgICAgICAgICAnYm9vbGVhbic6IC9cXGIoPzp0cnVlfGZhbHNlKVxcYi9cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2NwcCcsICdzdHJpbmcnLCB7XG4gICAgICAgICAgICAgICAgJ3Jhdy1zdHJpbmcnOiB7XG4gICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvUlwiKFteKClcXFxcIF17MCwxNn0pXFwoW1xcc1xcU10qP1xcKVxcMVwiLyxcbiAgICAgICAgICAgICAgICAgIGFsaWFzOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgIGdyZWVkeTogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge31cbiAgICAgICAgICBdLFxuICAgICAgICAgIDU6IFtcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXF1aXJlLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgICAgICAgUHJpc20ubGFuZ3VhZ2VzLmNzaGFycCA9IFByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ2NsaWtlJywge1xuICAgICAgICAgICAgICAgICdrZXl3b3JkJzogL1xcYig/OmFic3RyYWN0fGFkZHxhbGlhc3xhc3xhc2NlbmRpbmd8YXN5bmN8YXdhaXR8YmFzZXxib29sfGJyZWFrfGJ5dGV8Y2FzZXxjYXRjaHxjaGFyfGNoZWNrZWR8Y2xhc3N8Y29uc3R8Y29udGludWV8ZGVjaW1hbHxkZWZhdWx0fGRlbGVnYXRlfGRlc2NlbmRpbmd8ZG98ZG91YmxlfGR5bmFtaWN8ZWxzZXxlbnVtfGV2ZW50fGV4cGxpY2l0fGV4dGVybnxmYWxzZXxmaW5hbGx5fGZpeGVkfGZsb2F0fGZvcnxmb3JlYWNofGZyb218Z2V0fGdsb2JhbHxnb3RvfGdyb3VwfGlmfGltcGxpY2l0fGlufGludHxpbnRlcmZhY2V8aW50ZXJuYWx8aW50b3xpc3xqb2lufGxldHxsb2NrfGxvbmd8bmFtZXNwYWNlfG5ld3xudWxsfG9iamVjdHxvcGVyYXRvcnxvcmRlcmJ5fG91dHxvdmVycmlkZXxwYXJhbXN8cGFydGlhbHxwcml2YXRlfHByb3RlY3RlZHxwdWJsaWN8cmVhZG9ubHl8cmVmfHJlbW92ZXxyZXR1cm58c2J5dGV8c2VhbGVkfHNlbGVjdHxzZXR8c2hvcnR8c2l6ZW9mfHN0YWNrYWxsb2N8c3RhdGljfHN0cmluZ3xzdHJ1Y3R8c3dpdGNofHRoaXN8dGhyb3d8dHJ1ZXx0cnl8dHlwZW9mfHVpbnR8dWxvbmd8dW5jaGVja2VkfHVuc2FmZXx1c2hvcnR8dXNpbmd8dmFsdWV8dmFyfHZpcnR1YWx8dm9pZHx2b2xhdGlsZXx3aGVyZXx3aGlsZXx5aWVsZClcXGIvLFxuICAgICAgICAgICAgICAgICdzdHJpbmcnOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC9AKFwifCcpKD86XFwxXFwxfFxcXFxbXFxzXFxTXXwoPyFcXDEpW15cXFxcXSkqXFwxLyxcbiAgICAgICAgICAgICAgICAgICAgZ3JlZWR5OiB0cnVlXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvKFwifCcpKD86XFxcXC58KD8hXFwxKVteXFxcXFxcclxcbl0pKj9cXDEvLFxuICAgICAgICAgICAgICAgICAgICBncmVlZHk6IHRydWVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICdjbGFzcy1uYW1lJzogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvXFxiW0EtWl1cXHcqKD86XFwuXFx3KykqXFxiKD89XFxzK1xcdyspLyxcbiAgICAgICAgICAgICAgICAgICAgaW5zaWRlOiB7IHB1bmN0dWF0aW9uOiAvXFwuLyB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvKFxcWylbQS1aXVxcdyooPzpcXC5cXHcrKSpcXGIvLFxuICAgICAgICAgICAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBpbnNpZGU6IHsgcHVuY3R1YXRpb246IC9cXC4vIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC8oXFxiKD86Y2xhc3N8aW50ZXJmYWNlKVxccytbQS1aXVxcdyooPzpcXC5cXHcrKSpcXHMqOlxccyopW0EtWl1cXHcqKD86XFwuXFx3KykqXFxiLyxcbiAgICAgICAgICAgICAgICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgaW5zaWRlOiB7IHB1bmN0dWF0aW9uOiAvXFwuLyB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvKCg/OlxcYig/OmNsYXNzfGludGVyZmFjZXxuZXcpXFxzKyl8KD86Y2F0Y2hcXHMrXFwoKSlbQS1aXVxcdyooPzpcXC5cXHcrKSpcXGIvLFxuICAgICAgICAgICAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBpbnNpZGU6IHsgcHVuY3R1YXRpb246IC9cXC4vIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICdudW1iZXInOiAvXFxiMHhbXFxkYS1mXStcXGJ8KD86XFxiXFxkK1xcLj9cXGQqfFxcQlxcLlxcZCspZj8vaSxcbiAgICAgICAgICAgICAgICAnb3BlcmF0b3InOiAvPj49P3w8PD0/fFstPV0+fChbLSsmfD9dKVxcMXx+fFstKyovJSZ8XiE9PD5dPT8vLFxuICAgICAgICAgICAgICAgICdwdW5jdHVhdGlvbic6IC9cXD9cXC4/fDo6fFt7fVtcXF07KCksLjpdL1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnY3NoYXJwJywgJ2NsYXNzLW5hbWUnLCB7XG4gICAgICAgICAgICAgICAgJ2dlbmVyaWMtbWV0aG9kJzoge1xuICAgICAgICAgICAgICAgICAgcGF0dGVybjogL1xcdytcXHMqPFtePlxcclxcbl0rPz5cXHMqKD89XFwoKS8sXG4gICAgICAgICAgICAgICAgICBpbnNpZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb246IC9eXFx3Ky8sXG4gICAgICAgICAgICAgICAgICAgICdjbGFzcy1uYW1lJzoge1xuICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC9cXGJbQS1aXVxcdyooPzpcXC5cXHcrKSpcXGIvLFxuICAgICAgICAgICAgICAgICAgICAgIGluc2lkZTogeyBwdW5jdHVhdGlvbjogL1xcLi8gfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBrZXl3b3JkOiBQcmlzbS5sYW5ndWFnZXMuY3NoYXJwLmtleXdvcmQsXG4gICAgICAgICAgICAgICAgICAgIHB1bmN0dWF0aW9uOiAvWzw+KCksLjpdL1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ3ByZXByb2Nlc3Nvcic6IHtcbiAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC8oXlxccyopIy4qL20sXG4gICAgICAgICAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgYWxpYXM6ICdwcm9wZXJ0eScsXG4gICAgICAgICAgICAgICAgICBpbnNpZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2RpcmVjdGl2ZSc6IHtcbiAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvKFxccyojKVxcYig/OmRlZmluZXxlbGlmfGVsc2V8ZW5kaWZ8ZW5kcmVnaW9ufGVycm9yfGlmfGxpbmV8cHJhZ21hfHJlZ2lvbnx1bmRlZnx3YXJuaW5nKVxcYi8sXG4gICAgICAgICAgICAgICAgICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBhbGlhczogJ2tleXdvcmQnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBQcmlzbS5sYW5ndWFnZXMuZG90bmV0ID0gUHJpc20ubGFuZ3VhZ2VzLmNzID0gUHJpc20ubGFuZ3VhZ2VzLmNzaGFycDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7fVxuICAgICAgICAgIF0sXG4gICAgICAgICAgNjogW1xuICAgICAgICAgICAgZnVuY3Rpb24gKHJlcXVpcmUsIG1vZHVsZSwgZXhwb3J0cykge1xuICAgICAgICAgICAgICAoZnVuY3Rpb24gKFByaXNtKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0cmluZyA9IC8oXCJ8JykoPzpcXFxcKD86XFxyXFxufFtcXHNcXFNdKXwoPyFcXDEpW15cXFxcXFxyXFxuXSkqXFwxLztcbiAgICAgICAgICAgICAgICBQcmlzbS5sYW5ndWFnZXMuY3NzID0ge1xuICAgICAgICAgICAgICAgICAgJ2NvbW1lbnQnOiAvXFwvXFwqW1xcc1xcU10qP1xcKlxcLy8sXG4gICAgICAgICAgICAgICAgICAnYXRydWxlJzoge1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvQFtcXHctXStbXFxzXFxTXSo/KD86O3woPz1cXHMqXFx7KSkvLFxuICAgICAgICAgICAgICAgICAgICBpbnNpZGU6IHsgJ3J1bGUnOiAvQFtcXHctXSsvIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAndXJsJzoge1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBSZWdFeHAoJ3VybFxcXFwoKD86JyArIHN0cmluZy5zb3VyY2UgKyAnfFteXFxuXFxyKCldKilcXFxcKScsICdpJyksXG4gICAgICAgICAgICAgICAgICAgIGluc2lkZToge1xuICAgICAgICAgICAgICAgICAgICAgICdmdW5jdGlvbic6IC9edXJsL2ksXG4gICAgICAgICAgICAgICAgICAgICAgJ3B1bmN0dWF0aW9uJzogL15cXCh8XFwpJC9cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICdzZWxlY3Rvcic6IFJlZ0V4cCgnW157fVxcXFxzXSg/Oltee307XCJcXCddfCcgKyBzdHJpbmcuc291cmNlICsgJykqPyg/PVxcXFxzKlxcXFx7KScpLFxuICAgICAgICAgICAgICAgICAgJ3N0cmluZyc6IHtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICBncmVlZHk6IHRydWVcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAncHJvcGVydHknOiAvWy1fYS16XFx4QTAtXFx1RkZGRl1bLVxcd1xceEEwLVxcdUZGRkZdKig/PVxccyo6KS9pLFxuICAgICAgICAgICAgICAgICAgJ2ltcG9ydGFudCc6IC8haW1wb3J0YW50XFxiL2ksXG4gICAgICAgICAgICAgICAgICAnZnVuY3Rpb24nOiAvWy1hLXowLTldKyg/PVxcKCkvaSxcbiAgICAgICAgICAgICAgICAgICdwdW5jdHVhdGlvbic6IC9bKCl7fTs6LF0vXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBQcmlzbS5sYW5ndWFnZXMuY3NzWydhdHJ1bGUnXS5pbnNpZGUucmVzdCA9IFByaXNtLmxhbmd1YWdlcy5jc3M7XG4gICAgICAgICAgICAgICAgdmFyIG1hcmt1cCA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG4gICAgICAgICAgICAgICAgaWYgKG1hcmt1cCkge1xuICAgICAgICAgICAgICAgICAgbWFya3VwLnRhZy5hZGRJbmxpbmVkKCdzdHlsZScsICdjc3MnKTtcbiAgICAgICAgICAgICAgICAgIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2luc2lkZScsICdhdHRyLXZhbHVlJywge1xuICAgICAgICAgICAgICAgICAgICAnc3R5bGUtYXR0cic6IHtcbiAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvXFxzKnN0eWxlPShcInwnKSg/OlxcXFxbXFxzXFxTXXwoPyFcXDEpW15cXFxcXSkqXFwxL2ksXG4gICAgICAgICAgICAgICAgICAgICAgaW5zaWRlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnYXR0ci1uYW1lJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvXlxccypzdHlsZS9pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBpbnNpZGU6IG1hcmt1cC50YWcuaW5zaWRlXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3B1bmN0dWF0aW9uJzogL15cXHMqPVxccypbJ1wiXXxbJ1wiXVxccyokLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdhdHRyLXZhbHVlJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvLisvaSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuY3NzXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBhbGlhczogJ2xhbmd1YWdlLWNzcydcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSwgbWFya3VwLnRhZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KFByaXNtKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge31cbiAgICAgICAgICBdLFxuICAgICAgICAgIDc6IFtcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXF1aXJlLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgICAgICAgKGZ1bmN0aW9uIChQcmlzbSkge1xuICAgICAgICAgICAgICAgIHZhciBrZXl3b3JkcyA9IC9cXGIoPzphYnN0cmFjdHxhc3NlcnR8Ym9vbGVhbnxicmVha3xieXRlfGNhc2V8Y2F0Y2h8Y2hhcnxjbGFzc3xjb25zdHxjb250aW51ZXxkZWZhdWx0fGRvfGRvdWJsZXxlbHNlfGVudW18ZXhwb3J0c3xleHRlbmRzfGZpbmFsfGZpbmFsbHl8ZmxvYXR8Zm9yfGdvdG98aWZ8aW1wbGVtZW50c3xpbXBvcnR8aW5zdGFuY2VvZnxpbnR8aW50ZXJmYWNlfGxvbmd8bW9kdWxlfG5hdGl2ZXxuZXd8bnVsbHxvcGVufG9wZW5zfHBhY2thZ2V8cHJpdmF0ZXxwcm90ZWN0ZWR8cHJvdmlkZXN8cHVibGljfHJlcXVpcmVzfHJldHVybnxzaG9ydHxzdGF0aWN8c3RyaWN0ZnB8c3VwZXJ8c3dpdGNofHN5bmNocm9uaXplZHx0aGlzfHRocm93fHRocm93c3x0b3x0cmFuc2llbnR8dHJhbnNpdGl2ZXx0cnl8dXNlc3x2YXJ8dm9pZHx2b2xhdGlsZXx3aGlsZXx3aXRofHlpZWxkKVxcYi87XG4gICAgICAgICAgICAgICAgdmFyIGNsYXNzTmFtZSA9IC9cXGJbQS1aXSg/OlxcdypbYS16XVxcdyopP1xcYi87XG4gICAgICAgICAgICAgICAgUHJpc20ubGFuZ3VhZ2VzLmphdmEgPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjbGlrZScsIHtcbiAgICAgICAgICAgICAgICAgICdjbGFzcy1uYW1lJzogW1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIC9cXGJbQS1aXVxcdyooPz1cXHMrXFx3K1xccypbOyw9KCkpXSkvXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgJ2tleXdvcmQnOiBrZXl3b3JkcyxcbiAgICAgICAgICAgICAgICAgICdmdW5jdGlvbic6IFtcbiAgICAgICAgICAgICAgICAgICAgUHJpc20ubGFuZ3VhZ2VzLmNsaWtlLmZ1bmN0aW9uLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogLyhcXDpcXDopW2Etel9dXFx3Ki8sXG4gICAgICAgICAgICAgICAgICAgICAgbG9va2JlaGluZDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgJ251bWJlcic6IC9cXGIwYlswMV1bMDFfXSpMP1xcYnxcXGIweFtcXGRhLWZfXSpcXC4/W1xcZGEtZl9wKy1dK1xcYnwoPzpcXGJcXGRbXFxkX10qXFwuP1tcXGRfXSp8XFxCXFwuXFxkW1xcZF9dKikoPzplWystXT9cXGRbXFxkX10qKT9bZGZsXT8vaSxcbiAgICAgICAgICAgICAgICAgICdvcGVyYXRvcic6IHtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogLyhefFteLl0pKD86PDw9P3w+Pj4/PT98LT58LS18XFwrXFwrfCYmfFxcfFxcfHw6OnxbPzp+XXxbLSsqLyUmfF4hPTw+XT0/KS9tLFxuICAgICAgICAgICAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnamF2YScsICdzdHJpbmcnLCB7XG4gICAgICAgICAgICAgICAgICAndHJpcGxlLXF1b3RlZC1zdHJpbmcnOiB7XG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC9cIlwiXCJbIFxcdF0qW1xcclxcbl0oPzooPzpcInxcIlwiKT8oPzpcXFxcLnxbXlwiXFxcXF0pKSpcIlwiXCIvLFxuICAgICAgICAgICAgICAgICAgICBncmVlZHk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGFsaWFzOiAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2phdmEnLCAnY2xhc3MtbmFtZScsIHtcbiAgICAgICAgICAgICAgICAgICdhbm5vdGF0aW9uJzoge1xuICAgICAgICAgICAgICAgICAgICBhbGlhczogJ3B1bmN0dWF0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogLyhefFteLl0pQFxcdysvLFxuICAgICAgICAgICAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgJ25hbWVzcGFjZSc6IHtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogLyhcXGIoPzpleHBvcnRzfGltcG9ydCg/OlxccytzdGF0aWMpP3xtb2R1bGV8b3BlbnxvcGVuc3xwYWNrYWdlfHByb3ZpZGVzfHJlcXVpcmVzfHRvfHRyYW5zaXRpdmV8dXNlc3x3aXRoKVxccyspW2Etel1cXHcqKD86XFwuW2Etel1cXHcqKSsvLFxuICAgICAgICAgICAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBpbnNpZGU6IHsgJ3B1bmN0dWF0aW9uJzogL1xcLi8gfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICdnZW5lcmljcyc6IHtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogLzwoPzpbXFx3XFxzLC4mP118PCg/OltcXHdcXHMsLiY/XXw8KD86W1xcd1xccywuJj9dfDxbXFx3XFxzLC4mP10qPikqPikqPikqPi8sXG4gICAgICAgICAgICAgICAgICAgIGluc2lkZToge1xuICAgICAgICAgICAgICAgICAgICAgICdjbGFzcy1uYW1lJzogY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICdrZXl3b3JkJzoga2V5d29yZHMsXG4gICAgICAgICAgICAgICAgICAgICAgJ3B1bmN0dWF0aW9uJzogL1s8PigpLC46XS8sXG4gICAgICAgICAgICAgICAgICAgICAgJ29wZXJhdG9yJzogL1s/JnxdL1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0oUHJpc20pKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7fVxuICAgICAgICAgIF0sXG4gICAgICAgICAgODogW1xuICAgICAgICAgICAgZnVuY3Rpb24gKHJlcXVpcmUsIG1vZHVsZSwgZXhwb3J0cykge1xuICAgICAgICAgICAgICBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdCA9IFByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ2NsaWtlJywge1xuICAgICAgICAgICAgICAgICdjbGFzcy1uYW1lJzogW1xuICAgICAgICAgICAgICAgICAgUHJpc20ubGFuZ3VhZ2VzLmNsaWtlWydjbGFzcy1uYW1lJ10sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC8oXnxbXiRcXHdcXHhBMC1cXHVGRkZGXSlbXyRBLVpcXHhBMC1cXHVGRkZGXVskXFx3XFx4QTAtXFx1RkZGRl0qKD89XFwuKD86cHJvdG90eXBlfGNvbnN0cnVjdG9yKSkvLFxuICAgICAgICAgICAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAna2V5d29yZCc6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogLygoPzpefH0pXFxzKikoPzpjYXRjaHxmaW5hbGx5KVxcYi8sXG4gICAgICAgICAgICAgICAgICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC8oXnxbXi5dfFxcLlxcLlxcLlxccyopXFxiKD86YXN8YXN5bmMoPz1cXHMqKD86ZnVuY3Rpb25cXGJ8XFwofFskXFx3XFx4QTAtXFx1RkZGRl18JCkpfGF3YWl0fGJyZWFrfGNhc2V8Y2xhc3N8Y29uc3R8Y29udGludWV8ZGVidWdnZXJ8ZGVmYXVsdHxkZWxldGV8ZG98ZWxzZXxlbnVtfGV4cG9ydHxleHRlbmRzfGZvcnxmcm9tfGZ1bmN0aW9ufGdldHxpZnxpbXBsZW1lbnRzfGltcG9ydHxpbnxpbnN0YW5jZW9mfGludGVyZmFjZXxsZXR8bmV3fG51bGx8b2Z8cGFja2FnZXxwcml2YXRlfHByb3RlY3RlZHxwdWJsaWN8cmV0dXJufHNldHxzdGF0aWN8c3VwZXJ8c3dpdGNofHRoaXN8dGhyb3d8dHJ5fHR5cGVvZnx1bmRlZmluZWR8dmFyfHZvaWR8d2hpbGV8d2l0aHx5aWVsZClcXGIvLFxuICAgICAgICAgICAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAnbnVtYmVyJzogL1xcYig/Oig/OjBbeFhdKD86W1xcZEEtRmEtZl0oPzpfW1xcZEEtRmEtZl0pPykrfDBbYkJdKD86WzAxXSg/Ol9bMDFdKT8pK3wwW29PXSg/OlswLTddKD86X1swLTddKT8pKyluP3woPzpcXGQoPzpfXFxkKT8pK258TmFOfEluZmluaXR5KVxcYnwoPzpcXGIoPzpcXGQoPzpfXFxkKT8pK1xcLj8oPzpcXGQoPzpfXFxkKT8pKnxcXEJcXC4oPzpcXGQoPzpfXFxkKT8pKykoPzpbRWVdWystXT8oPzpcXGQoPzpfXFxkKT8pKyk/LyxcbiAgICAgICAgICAgICAgICAnZnVuY3Rpb24nOiAvIz9bXyRhLXpBLVpcXHhBMC1cXHVGRkZGXVskXFx3XFx4QTAtXFx1RkZGRl0qKD89XFxzKig/OlxcLlxccyooPzphcHBseXxiaW5kfGNhbGwpXFxzKik/XFwoKS8sXG4gICAgICAgICAgICAgICAgJ29wZXJhdG9yJzogLy0tfFxcK1xcK3xcXCpcXCo9P3w9PnwmJnxcXHxcXHx8WyE9XT09fDw8PT98Pj4+Pz0/fFstKyovJSZ8XiE9PD5dPT98XFwuezN9fFxcP1suP10/fFt+Ol0vXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFsnY2xhc3MtbmFtZSddWzBdLnBhdHRlcm4gPSAvKFxcYig/OmNsYXNzfGludGVyZmFjZXxleHRlbmRzfGltcGxlbWVudHN8aW5zdGFuY2VvZnxuZXcpXFxzKylbXFx3LlxcXFxdKy87XG4gICAgICAgICAgICAgIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2phdmFzY3JpcHQnLCAna2V5d29yZCcsIHtcbiAgICAgICAgICAgICAgICAncmVnZXgnOiB7XG4gICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvKCg/Ol58W14kXFx3XFx4QTAtXFx1RkZGRi5cIidcXF0pXFxzXSlcXHMqKVxcLyg/OlxcWyg/OlteXFxdXFxcXFxcclxcbl18XFxcXC4pKl18XFxcXC58W14vXFxcXFxcW1xcclxcbl0pK1xcL1tnaW15dXNdezAsNn0oPz0oPzpcXHN8XFwvXFwqW1xcc1xcU10qP1xcKlxcLykqKD86JHxbXFxyXFxuLC47On0pXFxdXXxcXC9cXC8pKS8sXG4gICAgICAgICAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgZ3JlZWR5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnZnVuY3Rpb24tdmFyaWFibGUnOiB7XG4gICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvIz9bXyRhLXpBLVpcXHhBMC1cXHVGRkZGXVskXFx3XFx4QTAtXFx1RkZGRl0qKD89XFxzKls9Ol1cXHMqKD86YXN5bmNcXHMqKT8oPzpcXGJmdW5jdGlvblxcYnwoPzpcXCgoPzpbXigpXXxcXChbXigpXSpcXCkpKlxcKXxbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXVskXFx3XFx4QTAtXFx1RkZGRl0qKVxccyo9PikpLyxcbiAgICAgICAgICAgICAgICAgIGFsaWFzOiAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAncGFyYW1ldGVyJzogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvKGZ1bmN0aW9uKD86XFxzK1tfJEEtWmEtelxceEEwLVxcdUZGRkZdWyRcXHdcXHhBMC1cXHVGRkZGXSopP1xccypcXChcXHMqKSg/IVxccykoPzpbXigpXXxcXChbXigpXSpcXCkpKz8oPz1cXHMqXFwpKS8sXG4gICAgICAgICAgICAgICAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC9bXyRhLXpcXHhBMC1cXHVGRkZGXVskXFx3XFx4QTAtXFx1RkZGRl0qKD89XFxzKj0+KS9pLFxuICAgICAgICAgICAgICAgICAgICBpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvKFxcKFxccyopKD8hXFxzKSg/OlteKCldfFxcKFteKCldKlxcKSkrPyg/PVxccypcXClcXHMqPT4pLyxcbiAgICAgICAgICAgICAgICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgaW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogLygoPzpcXGJ8XFxzfF4pKD8hKD86YXN8YXN5bmN8YXdhaXR8YnJlYWt8Y2FzZXxjYXRjaHxjbGFzc3xjb25zdHxjb250aW51ZXxkZWJ1Z2dlcnxkZWZhdWx0fGRlbGV0ZXxkb3xlbHNlfGVudW18ZXhwb3J0fGV4dGVuZHN8ZmluYWxseXxmb3J8ZnJvbXxmdW5jdGlvbnxnZXR8aWZ8aW1wbGVtZW50c3xpbXBvcnR8aW58aW5zdGFuY2VvZnxpbnRlcmZhY2V8bGV0fG5ld3xudWxsfG9mfHBhY2thZ2V8cHJpdmF0ZXxwcm90ZWN0ZWR8cHVibGljfHJldHVybnxzZXR8c3RhdGljfHN1cGVyfHN3aXRjaHx0aGlzfHRocm93fHRyeXx0eXBlb2Z8dW5kZWZpbmVkfHZhcnx2b2lkfHdoaWxlfHdpdGh8eWllbGQpKD8hWyRcXHdcXHhBMC1cXHVGRkZGXSkpKD86W18kQS1aYS16XFx4QTAtXFx1RkZGRl1bJFxcd1xceEEwLVxcdUZGRkZdKlxccyopXFwoXFxzKikoPyFcXHMpKD86W14oKV18XFwoW14oKV0qXFwpKSs/KD89XFxzKlxcKVxccypcXHspLyxcbiAgICAgICAgICAgICAgICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgaW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgJ2NvbnN0YW50JzogL1xcYltBLVpdKD86W0EtWl9dfFxcZHg/KSpcXGIvXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdqYXZhc2NyaXB0JywgJ3N0cmluZycsIHtcbiAgICAgICAgICAgICAgICAndGVtcGxhdGUtc3RyaW5nJzoge1xuICAgICAgICAgICAgICAgICAgcGF0dGVybjogL2AoPzpcXFxcW1xcc1xcU118XFwkeyg/Oltee31dfHsoPzpbXnt9XXx7W159XSp9KSp9KSt9fCg/IVxcJHspW15cXFxcYF0pKmAvLFxuICAgICAgICAgICAgICAgICAgZ3JlZWR5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgaW5zaWRlOiB7XG4gICAgICAgICAgICAgICAgICAgICd0ZW1wbGF0ZS1wdW5jdHVhdGlvbic6IHtcbiAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvXmB8YCQvLFxuICAgICAgICAgICAgICAgICAgICAgIGFsaWFzOiAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnaW50ZXJwb2xhdGlvbic6IHtcbiAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvKCg/Ol58W15cXFxcXSkoPzpcXFxcezJ9KSopXFwkeyg/Oltee31dfHsoPzpbXnt9XXx7W159XSp9KSp9KSt9LyxcbiAgICAgICAgICAgICAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIGluc2lkZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2ludGVycG9sYXRpb24tcHVuY3R1YXRpb24nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC9eXFwke3x9JC8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWFzOiAncHVuY3R1YXRpb24nXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdDogUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdzdHJpbmcnOiAvW1xcc1xcU10rL1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGlmIChQcmlzbS5sYW5ndWFnZXMubWFya3VwKSB7XG4gICAgICAgICAgICAgICAgUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC50YWcuYWRkSW5saW5lZCgnc2NyaXB0JywgJ2phdmFzY3JpcHQnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBQcmlzbS5sYW5ndWFnZXMuanMgPSBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7fVxuICAgICAgICAgIF0sXG4gICAgICAgICAgOTogW1xuICAgICAgICAgICAgZnVuY3Rpb24gKHJlcXVpcmUsIG1vZHVsZSwgZXhwb3J0cykge1xuICAgICAgICAgICAgICAoZnVuY3Rpb24gKFByaXNtKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZ2V0UGxhY2Vob2xkZXIobGFuZ3VhZ2UsIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gJ19fXycgKyBsYW5ndWFnZS50b1VwcGVyQ2FzZSgpICsgaW5kZXggKyAnX19fJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoUHJpc20ubGFuZ3VhZ2VzWydtYXJrdXAtdGVtcGxhdGluZyddID0ge30sIHtcbiAgICAgICAgICAgICAgICAgIGJ1aWxkUGxhY2Vob2xkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoZW52LCBsYW5ndWFnZSwgcGxhY2Vob2xkZXJQYXR0ZXJuLCByZXBsYWNlRmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGVudi5sYW5ndWFnZSAhPT0gbGFuZ3VhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VuU3RhY2sgPSBlbnYudG9rZW5TdGFjayA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgIGVudi5jb2RlID0gZW52LmNvZGUucmVwbGFjZShwbGFjZWhvbGRlclBhdHRlcm4sIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXBsYWNlRmlsdGVyID09PSAnZnVuY3Rpb24nICYmICFyZXBsYWNlRmlsdGVyKG1hdGNoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IHRva2VuU3RhY2subGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBsYWNlaG9sZGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGVudi5jb2RlLmluZGV4T2YocGxhY2Vob2xkZXIgPSBnZXRQbGFjZWhvbGRlcihsYW5ndWFnZSwgaSkpICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKytpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW5TdGFja1tpXSA9IG1hdGNoO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBsYWNlaG9sZGVyO1xuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIGVudi5ncmFtbWFyID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHRva2VuaXplUGxhY2Vob2xkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoZW52LCBsYW5ndWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChlbnYubGFuZ3VhZ2UgIT09IGxhbmd1YWdlIHx8ICFlbnYudG9rZW5TdGFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBlbnYuZ3JhbW1hciA9IFByaXNtLmxhbmd1YWdlc1tsYW5ndWFnZV07XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIGogPSAwO1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZW52LnRva2VuU3RhY2spO1xuICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHdhbGtUb2tlbnModG9rZW5zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiA+PSBrZXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycgfHwgdG9rZW4uY29udGVudCAmJiB0eXBlb2YgdG9rZW4uY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgayA9IGtleXNbal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSBlbnYudG9rZW5TdGFja1trXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcyA9IHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycgPyB0b2tlbiA6IHRva2VuLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBsYWNlaG9sZGVyID0gZ2V0UGxhY2Vob2xkZXIobGFuZ3VhZ2UsIGspO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHMuaW5kZXhPZihwbGFjZWhvbGRlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsrajtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiZWZvcmUgPSBzLnN1YnN0cmluZygwLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWlkZGxlID0gbmV3IFByaXNtLlRva2VuKGxhbmd1YWdlLCBQcmlzbS50b2tlbml6ZSh0LCBlbnYuZ3JhbW1hciksICdsYW5ndWFnZS0nICsgbGFuZ3VhZ2UsIHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFmdGVyID0gcy5zdWJzdHJpbmcoaW5kZXggKyBwbGFjZWhvbGRlci5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlcGxhY2VtZW50ID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmVmb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2VtZW50LnB1c2guYXBwbHkocmVwbGFjZW1lbnQsIHdhbGtUb2tlbnMoW2JlZm9yZV0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2VtZW50LnB1c2gobWlkZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhZnRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlbWVudC5wdXNoLmFwcGx5KHJlcGxhY2VtZW50LCB3YWxrVG9rZW5zKFthZnRlcl0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2Vucy5zcGxpY2UuYXBwbHkodG9rZW5zLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0uY29uY2F0KHJlcGxhY2VtZW50KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbi5jb250ZW50ID0gcmVwbGFjZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRva2VuLmNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWxrVG9rZW5zKHRva2VuLmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW5zO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB3YWxrVG9rZW5zKGVudi50b2tlbnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0oUHJpc20pKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7fVxuICAgICAgICAgIF0sXG4gICAgICAgICAgMTA6IFtcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXF1aXJlLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgICAgICAgUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cCA9IHtcbiAgICAgICAgICAgICAgICAnY29tbWVudCc6IC88IS0tW1xcc1xcU10qPy0tPi8sXG4gICAgICAgICAgICAgICAgJ3Byb2xvZyc6IC88XFw/W1xcc1xcU10rP1xcPz4vLFxuICAgICAgICAgICAgICAgICdkb2N0eXBlJzoge1xuICAgICAgICAgICAgICAgICAgcGF0dGVybjogLzwhRE9DVFlQRSg/OltePlwiJ1tcXF1dfFwiW15cIl0qXCJ8J1teJ10qJykrKD86XFxbKD86KD8hPCEtLSlbXlwiJ1xcXV18XCJbXlwiXSpcInwnW14nXSonfDwhLS1bXFxzXFxTXSo/LS0+KSpcXF1cXHMqKT8+L2ksXG4gICAgICAgICAgICAgICAgICBncmVlZHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdjZGF0YSc6IC88IVxcW0NEQVRBXFxbW1xcc1xcU10qP11dPi9pLFxuICAgICAgICAgICAgICAgICd0YWcnOiB7XG4gICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvPFxcLz8oPyFcXGQpW15cXHM+XFwvPSQ8JV0rKD86XFxzKD86XFxzKlteXFxzPlxcLz1dKyg/Olxccyo9XFxzKig/OlwiW15cIl0qXCJ8J1teJ10qJ3xbXlxccydcIj49XSsoPz1bXFxzPl0pKXwoPz1bXFxzLz5dKSkpKyk/XFxzKlxcLz8+L2ksXG4gICAgICAgICAgICAgICAgICBncmVlZHk6IHRydWUsXG4gICAgICAgICAgICAgICAgICBpbnNpZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgJ3RhZyc6IHtcbiAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvXjxcXC8/W15cXHM+XFwvXSsvaSxcbiAgICAgICAgICAgICAgICAgICAgICBpbnNpZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdwdW5jdHVhdGlvbic6IC9ePFxcLz8vLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ25hbWVzcGFjZSc6IC9eW15cXHM+XFwvOl0rOi9cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdhdHRyLXZhbHVlJzoge1xuICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC89XFxzKig/OlwiW15cIl0qXCJ8J1teJ10qJ3xbXlxccydcIj49XSspL2ksXG4gICAgICAgICAgICAgICAgICAgICAgaW5zaWRlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAncHVuY3R1YXRpb24nOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC9ePS8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvXihcXHMqKVtcIiddfFtcIiddJC8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9va2JlaGluZDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAncHVuY3R1YXRpb24nOiAvXFwvPz4vLFxuICAgICAgICAgICAgICAgICAgICAnYXR0ci1uYW1lJzoge1xuICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC9bXlxccz5cXC9dKy8sXG4gICAgICAgICAgICAgICAgICAgICAgaW5zaWRlOiB7ICduYW1lc3BhY2UnOiAvXlteXFxzPlxcLzpdKzovIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2VudGl0eSc6IC8mIz9bXFxkYS16XXsxLDh9Oy9pXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIFByaXNtLmxhbmd1YWdlcy5tYXJrdXBbJ3RhZyddLmluc2lkZVsnYXR0ci12YWx1ZSddLmluc2lkZVsnZW50aXR5J10gPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwWydlbnRpdHknXTtcbiAgICAgICAgICAgICAgUHJpc20uaG9va3MuYWRkKCd3cmFwJywgZnVuY3Rpb24gKGVudikge1xuICAgICAgICAgICAgICAgIGlmIChlbnYudHlwZSA9PT0gJ2VudGl0eScpIHtcbiAgICAgICAgICAgICAgICAgIGVudi5hdHRyaWJ1dGVzWyd0aXRsZSddID0gZW52LmNvbnRlbnQucmVwbGFjZSgvJmFtcDsvLCAnJicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShQcmlzbS5sYW5ndWFnZXMubWFya3VwLnRhZywgJ2FkZElubGluZWQnLCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGFkZElubGluZWQodGFnTmFtZSwgbGFuZykge1xuICAgICAgICAgICAgICAgICAgdmFyIGluY2x1ZGVkQ2RhdGFJbnNpZGUgPSB7fTtcbiAgICAgICAgICAgICAgICAgIGluY2x1ZGVkQ2RhdGFJbnNpZGVbJ2xhbmd1YWdlLScgKyBsYW5nXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogLyhePCFcXFtDREFUQVxcWylbXFxzXFxTXSs/KD89XFxdXFxdPiQpL2ksXG4gICAgICAgICAgICAgICAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzW2xhbmddXG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgaW5jbHVkZWRDZGF0YUluc2lkZVsnY2RhdGEnXSA9IC9ePCFcXFtDREFUQVxcW3xcXF1cXF0+JC9pO1xuICAgICAgICAgICAgICAgICAgdmFyIGluc2lkZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgJ2luY2x1ZGVkLWNkYXRhJzoge1xuICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC88IVxcW0NEQVRBXFxbW1xcc1xcU10qP1xcXVxcXT4vaSxcbiAgICAgICAgICAgICAgICAgICAgICBpbnNpZGU6IGluY2x1ZGVkQ2RhdGFJbnNpZGVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIGluc2lkZVsnbGFuZ3VhZ2UtJyArIGxhbmddID0ge1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvW1xcc1xcU10rLyxcbiAgICAgICAgICAgICAgICAgICAgaW5zaWRlOiBQcmlzbS5sYW5ndWFnZXNbbGFuZ11cbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICB2YXIgZGVmID0ge307XG4gICAgICAgICAgICAgICAgICBkZWZbdGFnTmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IFJlZ0V4cCgvKDxfX1tcXHNcXFNdKj8+KSg/OjwhXFxbQ0RBVEFcXFtbXFxzXFxTXSo/XFxdXFxdPlxccyp8W1xcc1xcU10pKj8oPz08XFwvX18+KS8uc291cmNlLnJlcGxhY2UoL19fL2csIHRhZ05hbWUpLCAnaScpLFxuICAgICAgICAgICAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBncmVlZHk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGluc2lkZTogaW5zaWRlXG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnbWFya3VwJywgJ2NkYXRhJywgZGVmKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBQcmlzbS5sYW5ndWFnZXMueG1sID0gUHJpc20ubGFuZ3VhZ2VzLmV4dGVuZCgnbWFya3VwJywge30pO1xuICAgICAgICAgICAgICBQcmlzbS5sYW5ndWFnZXMuaHRtbCA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG4gICAgICAgICAgICAgIFByaXNtLmxhbmd1YWdlcy5tYXRobWwgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuICAgICAgICAgICAgICBQcmlzbS5sYW5ndWFnZXMuc3ZnID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7fVxuICAgICAgICAgIF0sXG4gICAgICAgICAgMTE6IFtcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXF1aXJlLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgICAgICAgKGZ1bmN0aW9uIChQcmlzbSkge1xuICAgICAgICAgICAgICAgIFByaXNtLmxhbmd1YWdlcy5waHAgPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjbGlrZScsIHtcbiAgICAgICAgICAgICAgICAgICdrZXl3b3JkJzogL1xcYig/Ol9faGFsdF9jb21waWxlcnxhYnN0cmFjdHxhbmR8YXJyYXl8YXN8YnJlYWt8Y2FsbGFibGV8Y2FzZXxjYXRjaHxjbGFzc3xjbG9uZXxjb25zdHxjb250aW51ZXxkZWNsYXJlfGRlZmF1bHR8ZGllfGRvfGVjaG98ZWxzZXxlbHNlaWZ8ZW1wdHl8ZW5kZGVjbGFyZXxlbmRmb3J8ZW5kZm9yZWFjaHxlbmRpZnxlbmRzd2l0Y2h8ZW5kd2hpbGV8ZXZhbHxleGl0fGV4dGVuZHN8ZmluYWx8ZmluYWxseXxmb3J8Zm9yZWFjaHxmdW5jdGlvbnxnbG9iYWx8Z290b3xpZnxpbXBsZW1lbnRzfGluY2x1ZGV8aW5jbHVkZV9vbmNlfGluc3RhbmNlb2Z8aW5zdGVhZG9mfGludGVyZmFjZXxpc3NldHxsaXN0fG5hbWVzcGFjZXxuZXd8b3J8cGFyZW50fHByaW50fHByaXZhdGV8cHJvdGVjdGVkfHB1YmxpY3xyZXF1aXJlfHJlcXVpcmVfb25jZXxyZXR1cm58c3RhdGljfHN3aXRjaHx0aHJvd3x0cmFpdHx0cnl8dW5zZXR8dXNlfHZhcnx3aGlsZXx4b3J8eWllbGQpXFxiL2ksXG4gICAgICAgICAgICAgICAgICAnYm9vbGVhbic6IHtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogL1xcYig/OmZhbHNlfHRydWUpXFxiL2ksXG4gICAgICAgICAgICAgICAgICAgIGFsaWFzOiAnY29uc3RhbnQnXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgJ2NvbnN0YW50JzogW1xuICAgICAgICAgICAgICAgICAgICAvXFxiW0EtWl9dW0EtWjAtOV9dKlxcYi8sXG4gICAgICAgICAgICAgICAgICAgIC9cXGIoPzpudWxsKVxcYi9pXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgJ2NvbW1lbnQnOiB7XG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC8oXnxbXlxcXFxdKSg/OlxcL1xcKltcXHNcXFNdKj9cXCpcXC98XFwvXFwvLiopLyxcbiAgICAgICAgICAgICAgICAgICAgbG9va2JlaGluZDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ3BocCcsICdzdHJpbmcnLCB7XG4gICAgICAgICAgICAgICAgICAnc2hlbGwtY29tbWVudCc6IHtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogLyhefFteXFxcXF0pIy4qLyxcbiAgICAgICAgICAgICAgICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYWxpYXM6ICdjb21tZW50J1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ3BocCcsICdjb21tZW50Jywge1xuICAgICAgICAgICAgICAgICAgJ2RlbGltaXRlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogL1xcPz4kfF48XFw/KD86cGhwKD89XFxzKXw9KT8vaSxcbiAgICAgICAgICAgICAgICAgICAgYWxpYXM6ICdpbXBvcnRhbnQnXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgncGhwJywgJ2tleXdvcmQnLCB7XG4gICAgICAgICAgICAgICAgICAndmFyaWFibGUnOiAvXFwkKyg/OlxcdytcXGJ8KD89eykpL2ksXG4gICAgICAgICAgICAgICAgICAncGFja2FnZSc6IHtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogLyhcXFxcfG5hbWVzcGFjZVxccyt8dXNlXFxzKylbXFx3XFxcXF0rLyxcbiAgICAgICAgICAgICAgICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgaW5zaWRlOiB7IHB1bmN0dWF0aW9uOiAvXFxcXC8gfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ3BocCcsICdvcGVyYXRvcicsIHtcbiAgICAgICAgICAgICAgICAgICdwcm9wZXJ0eSc6IHtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogLygtPilbXFx3XSsvLFxuICAgICAgICAgICAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdmFyIHN0cmluZ19pbnRlcnBvbGF0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgcGF0dGVybjogL3tcXCQoPzp7KD86e1tee31dK318W157fV0rKX18W157fV0pK318KF58W15cXFxce10pXFwkKyg/OlxcdysoPzpcXFsuKz9dfC0+XFx3KykqKS8sXG4gICAgICAgICAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgaW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMucGhwXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdwaHAnLCAnc3RyaW5nJywge1xuICAgICAgICAgICAgICAgICAgJ25vd2RvYy1zdHJpbmcnOiB7XG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC88PDwnKFteJ10rKScoPzpcXHJcXG4/fFxcbikoPzouKig/Olxcclxcbj98XFxuKSkqP1xcMTsvLFxuICAgICAgICAgICAgICAgICAgICBncmVlZHk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGFsaWFzOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgaW5zaWRlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgJ2RlbGltaXRlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC9ePDw8J1teJ10rJ3xbYS16X11cXHcqOyQvaSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWFzOiAnc3ltYm9sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc2lkZTogeyAncHVuY3R1YXRpb24nOiAvXjw8PCc/fFsnO10kLyB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgJ2hlcmVkb2Mtc3RyaW5nJzoge1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvPDw8KD86XCIoW15cIl0rKVwiKD86XFxyXFxuP3xcXG4pKD86LiooPzpcXHJcXG4/fFxcbikpKj9cXDE7fChbYS16X11cXHcqKSg/Olxcclxcbj98XFxuKSg/Oi4qKD86XFxyXFxuP3xcXG4pKSo/XFwyOykvaSxcbiAgICAgICAgICAgICAgICAgICAgZ3JlZWR5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBhbGlhczogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgIGluc2lkZToge1xuICAgICAgICAgICAgICAgICAgICAgICdkZWxpbWl0ZXInOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvXjw8PCg/OlwiW15cIl0rXCJ8W2Etel9dXFx3Kil8W2Etel9dXFx3KjskL2ksXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlhczogJ3N5bWJvbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnNpZGU6IHsgJ3B1bmN0dWF0aW9uJzogL148PDxcIj98W1wiO10kLyB9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAnaW50ZXJwb2xhdGlvbic6IHN0cmluZ19pbnRlcnBvbGF0aW9uXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAnc2luZ2xlLXF1b3RlZC1zdHJpbmcnOiB7XG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC8nKD86XFxcXFtcXHNcXFNdfFteXFxcXCddKSonLyxcbiAgICAgICAgICAgICAgICAgICAgZ3JlZWR5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBhbGlhczogJ3N0cmluZydcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAnZG91YmxlLXF1b3RlZC1zdHJpbmcnOiB7XG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC9cIig/OlxcXFxbXFxzXFxTXXxbXlxcXFxcIl0pKlwiLyxcbiAgICAgICAgICAgICAgICAgICAgZ3JlZWR5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBhbGlhczogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgIGluc2lkZTogeyAnaW50ZXJwb2xhdGlvbic6IHN0cmluZ19pbnRlcnBvbGF0aW9uIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBkZWxldGUgUHJpc20ubGFuZ3VhZ2VzLnBocFsnc3RyaW5nJ107XG4gICAgICAgICAgICAgICAgUHJpc20uaG9va3MuYWRkKCdiZWZvcmUtdG9rZW5pemUnLCBmdW5jdGlvbiAoZW52KSB7XG4gICAgICAgICAgICAgICAgICBpZiAoIS88XFw/Ly50ZXN0KGVudi5jb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB2YXIgcGhwUGF0dGVybiA9IC88XFw/KD86W15cIicvI118XFwvKD8hWyovXSl8KFwifCcpKD86XFxcXFtcXHNcXFNdfCg/IVxcMSlbXlxcXFxdKSpcXDF8KD86XFwvXFwvfCMpKD86W14/XFxuXFxyXXxcXD8oPyE+KSkqKD89JHxcXD8+fFtcXHJcXG5dKXxcXC9cXCpbXFxzXFxTXSo/KD86XFwqXFwvfCQpKSo/KD86XFw/PnwkKS9pZztcbiAgICAgICAgICAgICAgICAgIFByaXNtLmxhbmd1YWdlc1snbWFya3VwLXRlbXBsYXRpbmcnXS5idWlsZFBsYWNlaG9sZGVycyhlbnYsICdwaHAnLCBwaHBQYXR0ZXJuKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBQcmlzbS5ob29rcy5hZGQoJ2FmdGVyLXRva2VuaXplJywgZnVuY3Rpb24gKGVudikge1xuICAgICAgICAgICAgICAgICAgUHJpc20ubGFuZ3VhZ2VzWydtYXJrdXAtdGVtcGxhdGluZyddLnRva2VuaXplUGxhY2Vob2xkZXJzKGVudiwgJ3BocCcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KFByaXNtKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge31cbiAgICAgICAgICBdLFxuICAgICAgICAgIDEyOiBbXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVxdWlyZSwgbW9kdWxlLCBleHBvcnRzKSB7XG4gICAgICAgICAgICAgIFByaXNtLmxhbmd1YWdlcy5weXRob24gPSB7XG4gICAgICAgICAgICAgICAgJ2NvbW1lbnQnOiB7XG4gICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvKF58W15cXFxcXSkjLiovLFxuICAgICAgICAgICAgICAgICAgbG9va2JlaGluZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ3N0cmluZy1pbnRlcnBvbGF0aW9uJzoge1xuICAgICAgICAgICAgICAgICAgcGF0dGVybjogLyg/OmZ8cmZ8ZnIpKD86KFwiXCJcInwnJycpW1xcc1xcU10rP1xcMXwoXCJ8JykoPzpcXFxcLnwoPyFcXDIpW15cXFxcXFxyXFxuXSkqXFwyKS9pLFxuICAgICAgICAgICAgICAgICAgZ3JlZWR5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgaW5zaWRlOiB7XG4gICAgICAgICAgICAgICAgICAgICdpbnRlcnBvbGF0aW9uJzoge1xuICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC8oKD86XnxbXntdKSg/Ont7KSopeyg/IXspKD86W157fV18eyg/IXspKD86W157fV18eyg/IXspKD86W157fV0pK30pK30pK30vLFxuICAgICAgICAgICAgICAgICAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgaW5zaWRlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnZm9ybWF0LXNwZWMnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC8oOilbXjooKXt9XSsoPz19JCkvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbnZlcnNpb24tb3B0aW9uJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvIVtzcmFdKD89Wzp9XSQpLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpYXM6ICdwdW5jdHVhdGlvbidcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN0OiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnc3RyaW5nJzogL1tcXHNcXFNdKy9cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICd0cmlwbGUtcXVvdGVkLXN0cmluZyc6IHtcbiAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC8oPzpbcnViXXxyYnxicik/KFwiXCJcInwnJycpW1xcc1xcU10rP1xcMS9pLFxuICAgICAgICAgICAgICAgICAgZ3JlZWR5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgYWxpYXM6ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnc3RyaW5nJzoge1xuICAgICAgICAgICAgICAgICAgcGF0dGVybjogLyg/OltydWJdfHJifGJyKT8oXCJ8JykoPzpcXFxcLnwoPyFcXDEpW15cXFxcXFxyXFxuXSkqXFwxL2ksXG4gICAgICAgICAgICAgICAgICBncmVlZHk6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdmdW5jdGlvbic6IHtcbiAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC8oKD86XnxcXHMpZGVmWyBcXHRdKylbYS16QS1aX11cXHcqKD89XFxzKlxcKCkvZyxcbiAgICAgICAgICAgICAgICAgIGxvb2tiZWhpbmQ6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdjbGFzcy1uYW1lJzoge1xuICAgICAgICAgICAgICAgICAgcGF0dGVybjogLyhcXGJjbGFzc1xccyspXFx3Ky9pLFxuICAgICAgICAgICAgICAgICAgbG9va2JlaGluZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ2RlY29yYXRvcic6IHtcbiAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC8oXlxccyopQFxcdysoPzpcXC5cXHcrKSovaW0sXG4gICAgICAgICAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgYWxpYXM6IFtcbiAgICAgICAgICAgICAgICAgICAgJ2Fubm90YXRpb24nLFxuICAgICAgICAgICAgICAgICAgICAncHVuY3R1YXRpb24nXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgaW5zaWRlOiB7ICdwdW5jdHVhdGlvbic6IC9cXC4vIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdrZXl3b3JkJzogL1xcYig/OmFuZHxhc3xhc3NlcnR8YXN5bmN8YXdhaXR8YnJlYWt8Y2xhc3N8Y29udGludWV8ZGVmfGRlbHxlbGlmfGVsc2V8ZXhjZXB0fGV4ZWN8ZmluYWxseXxmb3J8ZnJvbXxnbG9iYWx8aWZ8aW1wb3J0fGlufGlzfGxhbWJkYXxub25sb2NhbHxub3R8b3J8cGFzc3xwcmludHxyYWlzZXxyZXR1cm58dHJ5fHdoaWxlfHdpdGh8eWllbGQpXFxiLyxcbiAgICAgICAgICAgICAgICAnYnVpbHRpbic6IC9cXGIoPzpfX2ltcG9ydF9ffGFic3xhbGx8YW55fGFwcGx5fGFzY2lpfGJhc2VzdHJpbmd8YmlufGJvb2x8YnVmZmVyfGJ5dGVhcnJheXxieXRlc3xjYWxsYWJsZXxjaHJ8Y2xhc3NtZXRob2R8Y21wfGNvZXJjZXxjb21waWxlfGNvbXBsZXh8ZGVsYXR0cnxkaWN0fGRpcnxkaXZtb2R8ZW51bWVyYXRlfGV2YWx8ZXhlY2ZpbGV8ZmlsZXxmaWx0ZXJ8ZmxvYXR8Zm9ybWF0fGZyb3plbnNldHxnZXRhdHRyfGdsb2JhbHN8aGFzYXR0cnxoYXNofGhlbHB8aGV4fGlkfGlucHV0fGludHxpbnRlcm58aXNpbnN0YW5jZXxpc3N1YmNsYXNzfGl0ZXJ8bGVufGxpc3R8bG9jYWxzfGxvbmd8bWFwfG1heHxtZW1vcnl2aWV3fG1pbnxuZXh0fG9iamVjdHxvY3R8b3BlbnxvcmR8cG93fHByb3BlcnR5fHJhbmdlfHJhd19pbnB1dHxyZWR1Y2V8cmVsb2FkfHJlcHJ8cmV2ZXJzZWR8cm91bmR8c2V0fHNldGF0dHJ8c2xpY2V8c29ydGVkfHN0YXRpY21ldGhvZHxzdHJ8c3VtfHN1cGVyfHR1cGxlfHR5cGV8dW5pY2hyfHVuaWNvZGV8dmFyc3x4cmFuZ2V8emlwKVxcYi8sXG4gICAgICAgICAgICAgICAgJ2Jvb2xlYW4nOiAvXFxiKD86VHJ1ZXxGYWxzZXxOb25lKVxcYi8sXG4gICAgICAgICAgICAgICAgJ251bWJlcic6IC8oPzpcXGIoPz1cXGQpfFxcQig/PVxcLikpKD86MFtib10pPyg/Oig/OlxcZHwweFtcXGRhLWZdKVtcXGRhLWZdKlxcLj9cXGQqfFxcLlxcZCspKD86ZVsrLV0/XFxkKyk/aj9cXGIvaSxcbiAgICAgICAgICAgICAgICAnb3BlcmF0b3InOiAvWy0rJT1dPT98IT18XFwqXFwqPz0/fFxcL1xcLz89P3w8Wzw9Pl0/fD5bPT5dP3xbJnxefl0vLFxuICAgICAgICAgICAgICAgICdwdW5jdHVhdGlvbic6IC9be31bXFxdOygpLC46XS9cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgUHJpc20ubGFuZ3VhZ2VzLnB5dGhvblsnc3RyaW5nLWludGVycG9sYXRpb24nXS5pbnNpZGVbJ2ludGVycG9sYXRpb24nXS5pbnNpZGUucmVzdCA9IFByaXNtLmxhbmd1YWdlcy5weXRob247XG4gICAgICAgICAgICAgIFByaXNtLmxhbmd1YWdlcy5weSA9IFByaXNtLmxhbmd1YWdlcy5weXRob247XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge31cbiAgICAgICAgICBdLFxuICAgICAgICAgIDEzOiBbXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVxdWlyZSwgbW9kdWxlLCBleHBvcnRzKSB7XG4gICAgICAgICAgICAgIChmdW5jdGlvbiAoUHJpc20pIHtcbiAgICAgICAgICAgICAgICBQcmlzbS5sYW5ndWFnZXMucnVieSA9IFByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ2NsaWtlJywge1xuICAgICAgICAgICAgICAgICAgJ2NvbW1lbnQnOiBbXG4gICAgICAgICAgICAgICAgICAgIC8jLiovLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogL149YmVnaW5cXHNbXFxzXFxTXSo/Xj1lbmQvbSxcbiAgICAgICAgICAgICAgICAgICAgICBncmVlZHk6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICdjbGFzcy1uYW1lJzoge1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvKFxcYig/OmNsYXNzKVxccyt8XFxiY2F0Y2hcXHMrXFwoKVtcXHcuXFxcXF0rL2ksXG4gICAgICAgICAgICAgICAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGluc2lkZTogeyAncHVuY3R1YXRpb24nOiAvWy5cXFxcXS8gfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICdrZXl3b3JkJzogL1xcYig/OmFsaWFzfGFuZHxCRUdJTnxiZWdpbnxicmVha3xjYXNlfGNsYXNzfGRlZnxkZWZpbmVfbWV0aG9kfGRlZmluZWR8ZG98ZWFjaHxlbHNlfGVsc2lmfEVORHxlbmR8ZW5zdXJlfGV4dGVuZHxmb3J8aWZ8aW58aW5jbHVkZXxtb2R1bGV8bmV3fG5leHR8bmlsfG5vdHxvcnxwcmVwZW5kfHByb3RlY3RlZHxwcml2YXRlfHB1YmxpY3xyYWlzZXxyZWRvfHJlcXVpcmV8cmVzY3VlfHJldHJ5fHJldHVybnxzZWxmfHN1cGVyfHRoZW58dGhyb3d8dW5kZWZ8dW5sZXNzfHVudGlsfHdoZW58d2hpbGV8eWllbGQpXFxiL1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhciBpbnRlcnBvbGF0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgcGF0dGVybjogLyNcXHtbXn1dK1xcfS8sXG4gICAgICAgICAgICAgICAgICBpbnNpZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2RlbGltaXRlcic6IHtcbiAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvXiNcXHt8XFx9JC8sXG4gICAgICAgICAgICAgICAgICAgICAgYWxpYXM6ICd0YWcnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlc3Q6IFByaXNtLmxhbmd1YWdlcy5ydWJ5XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBkZWxldGUgUHJpc20ubGFuZ3VhZ2VzLnJ1YnkuZnVuY3Rpb247XG4gICAgICAgICAgICAgICAgUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgncnVieScsICdrZXl3b3JkJywge1xuICAgICAgICAgICAgICAgICAgJ3JlZ2V4JzogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogLyVyKFteYS16QS1aMC05XFxzeyhcXFs8XSkoPzooPyFcXDEpW15cXFxcXXxcXFxcW1xcc1xcU10pKlxcMVtnaW1dezAsM30vLFxuICAgICAgICAgICAgICAgICAgICAgIGdyZWVkeTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBpbnNpZGU6IHsgJ2ludGVycG9sYXRpb24nOiBpbnRlcnBvbGF0aW9uIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC8lclxcKCg/OlteKClcXFxcXXxcXFxcW1xcc1xcU10pKlxcKVtnaW1dezAsM30vLFxuICAgICAgICAgICAgICAgICAgICAgIGdyZWVkeTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBpbnNpZGU6IHsgJ2ludGVycG9sYXRpb24nOiBpbnRlcnBvbGF0aW9uIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IC8lclxceyg/OlteI3t9XFxcXF18Iyg/Olxce1tefV0rXFx9KT98XFxcXFtcXHNcXFNdKSpcXH1bZ2ltXXswLDN9LyxcbiAgICAgICAgICAgICAgICAgICAgICBncmVlZHk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgaW5zaWRlOiB7ICdpbnRlcnBvbGF0aW9uJzogaW50ZXJwb2xhdGlvbiB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvJXJcXFsoPzpbXlxcW1xcXVxcXFxdfFxcXFxbXFxzXFxTXSkqXFxdW2dpbV17MCwzfS8sXG4gICAgICAgICAgICAgICAgICAgICAgZ3JlZWR5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIGluc2lkZTogeyAnaW50ZXJwb2xhdGlvbic6IGludGVycG9sYXRpb24gfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogLyVyPCg/OltePD5cXFxcXXxcXFxcW1xcc1xcU10pKj5bZ2ltXXswLDN9LyxcbiAgICAgICAgICAgICAgICAgICAgICBncmVlZHk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgaW5zaWRlOiB7ICdpbnRlcnBvbGF0aW9uJzogaW50ZXJwb2xhdGlvbiB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvKF58W14vXSlcXC8oPyFcXC8pKD86XFxbLis/XXxcXFxcLnxbXi9cXFxcXFxyXFxuXSkrXFwvW2dpbV17MCwzfSg/PVxccyooPzokfFtcXHJcXG4sLjt9KV0pKS8sXG4gICAgICAgICAgICAgICAgICAgICAgbG9va2JlaGluZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBncmVlZHk6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICd2YXJpYWJsZSc6IC9bQCRdK1thLXpBLVpfXVxcdyooPzpbPyFdfFxcYikvLFxuICAgICAgICAgICAgICAgICAgJ3N5bWJvbCc6IHtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogLyhefFteOl0pOlthLXpBLVpfXVxcdyooPzpbPyFdfFxcYikvLFxuICAgICAgICAgICAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgJ21ldGhvZC1kZWZpbml0aW9uJzoge1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvKFxcYmRlZlxccyspW1xcdy5dKy8sXG4gICAgICAgICAgICAgICAgICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGluc2lkZToge1xuICAgICAgICAgICAgICAgICAgICAgICdmdW5jdGlvbic6IC9cXHcrJC8sXG4gICAgICAgICAgICAgICAgICAgICAgcmVzdDogUHJpc20ubGFuZ3VhZ2VzLnJ1YnlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ3J1YnknLCAnbnVtYmVyJywge1xuICAgICAgICAgICAgICAgICAgJ2J1aWx0aW4nOiAvXFxiKD86QXJyYXl8QmlnbnVtfEJpbmRpbmd8Q2xhc3N8Q29udGludWF0aW9ufERpcnxFeGNlcHRpb258RmFsc2VDbGFzc3xGaWxlfFN0YXR8Rml4bnVtfEZsb2F0fEhhc2h8SW50ZWdlcnxJT3xNYXRjaERhdGF8TWV0aG9kfE1vZHVsZXxOaWxDbGFzc3xOdW1lcmljfE9iamVjdHxQcm9jfFJhbmdlfFJlZ2V4cHxTdHJpbmd8U3RydWN0fFRNU3xTeW1ib2x8VGhyZWFkR3JvdXB8VGhyZWFkfFRpbWV8VHJ1ZUNsYXNzKVxcYi8sXG4gICAgICAgICAgICAgICAgICAnY29uc3RhbnQnOiAvXFxiW0EtWl1cXHcqKD86Wz8hXXxcXGIpL1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFByaXNtLmxhbmd1YWdlcy5ydWJ5LnN0cmluZyA9IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogLyVbcVFpSXdXeHNdPyhbXmEtekEtWjAtOVxcc3soXFxbPF0pKD86KD8hXFwxKVteXFxcXF18XFxcXFtcXHNcXFNdKSpcXDEvLFxuICAgICAgICAgICAgICAgICAgICBncmVlZHk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGluc2lkZTogeyAnaW50ZXJwb2xhdGlvbic6IGludGVycG9sYXRpb24gfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogLyVbcVFpSXdXeHNdP1xcKCg/OlteKClcXFxcXXxcXFxcW1xcc1xcU10pKlxcKS8sXG4gICAgICAgICAgICAgICAgICAgIGdyZWVkeTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgaW5zaWRlOiB7ICdpbnRlcnBvbGF0aW9uJzogaW50ZXJwb2xhdGlvbiB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvJVtxUWlJd1d4c10/XFx7KD86W14je31cXFxcXXwjKD86XFx7W159XStcXH0pP3xcXFxcW1xcc1xcU10pKlxcfS8sXG4gICAgICAgICAgICAgICAgICAgIGdyZWVkeTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgaW5zaWRlOiB7ICdpbnRlcnBvbGF0aW9uJzogaW50ZXJwb2xhdGlvbiB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvJVtxUWlJd1d4c10/XFxbKD86W15cXFtcXF1cXFxcXXxcXFxcW1xcc1xcU10pKlxcXS8sXG4gICAgICAgICAgICAgICAgICAgIGdyZWVkeTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgaW5zaWRlOiB7ICdpbnRlcnBvbGF0aW9uJzogaW50ZXJwb2xhdGlvbiB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvJVtxUWlJd1d4c10/PCg/OltePD5cXFxcXXxcXFxcW1xcc1xcU10pKj4vLFxuICAgICAgICAgICAgICAgICAgICBncmVlZHk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGluc2lkZTogeyAnaW50ZXJwb2xhdGlvbic6IGludGVycG9sYXRpb24gfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogLyhcInwnKSg/OiNcXHtbXn1dK1xcfXxcXFxcKD86XFxyXFxufFtcXHNcXFNdKXwoPyFcXDEpW15cXFxcXFxyXFxuXSkqXFwxLyxcbiAgICAgICAgICAgICAgICAgICAgZ3JlZWR5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBpbnNpZGU6IHsgJ2ludGVycG9sYXRpb24nOiBpbnRlcnBvbGF0aW9uIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIFByaXNtLmxhbmd1YWdlcy5yYiA9IFByaXNtLmxhbmd1YWdlcy5ydWJ5O1xuICAgICAgICAgICAgICB9KFByaXNtKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge31cbiAgICAgICAgICBdLFxuICAgICAgICAgIDE0OiBbXG4gICAgICAgICAgICBmdW5jdGlvbiAocmVxdWlyZSwgbW9kdWxlLCBleHBvcnRzKSB7XG4gICAgICAgICAgICAgIHZhciBQcmlzbSA9IHJlcXVpcmUoJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jb3JlJyk7XG4gICAgICAgICAgICAgIHJlcXVpcmUoJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jbGlrZScpO1xuICAgICAgICAgICAgICByZXF1aXJlKCdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tbWFya3VwLXRlbXBsYXRpbmcnKTtcbiAgICAgICAgICAgICAgcmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWMnKTtcbiAgICAgICAgICAgICAgcmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNwcCcpO1xuICAgICAgICAgICAgICByZXF1aXJlKCdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY3NoYXJwJyk7XG4gICAgICAgICAgICAgIHJlcXVpcmUoJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jc3MnKTtcbiAgICAgICAgICAgICAgcmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWphdmEnKTtcbiAgICAgICAgICAgICAgcmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWphdmFzY3JpcHQnKTtcbiAgICAgICAgICAgICAgcmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLW1hcmt1cCcpO1xuICAgICAgICAgICAgICByZXF1aXJlKCdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcGhwJyk7XG4gICAgICAgICAgICAgIHJlcXVpcmUoJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1weXRob24nKTtcbiAgICAgICAgICAgICAgcmVxdWlyZSgncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXJ1YnknKTtcbiAgICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSB7IGJvbHRFeHBvcnQ6IFByaXNtIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWMnOiAxLFxuICAgICAgICAgICAgICAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNsaWtlJzogMixcbiAgICAgICAgICAgICAgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jb3JlJzogMyxcbiAgICAgICAgICAgICAgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jcHAnOiA0LFxuICAgICAgICAgICAgICAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNzaGFycCc6IDUsXG4gICAgICAgICAgICAgICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY3NzJzogNixcbiAgICAgICAgICAgICAgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1qYXZhJzogNyxcbiAgICAgICAgICAgICAgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1qYXZhc2NyaXB0JzogOCxcbiAgICAgICAgICAgICAgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1tYXJrdXAnOiAxMCxcbiAgICAgICAgICAgICAgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1tYXJrdXAtdGVtcGxhdGluZyc6IDksXG4gICAgICAgICAgICAgICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcGhwJzogMTEsXG4gICAgICAgICAgICAgICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcHl0aG9uJzogMTIsXG4gICAgICAgICAgICAgICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcnVieSc6IDEzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LCB7fSwgWzE0XSkoMTQpO1xuICAgICAgfSkpO1xuICAgICAgdmFyIHByaXNtID0gd2luZG93LlByaXNtO1xuICAgICAgd2luZG93LlByaXNtID0gb2xkcHJpc207XG4gICAgICByZXR1cm4gcHJpc207XG4gICAgfSh1bmRlZmluZWQsIGV4cG9ydHMkMSwgbW9kdWxlLCB1bmRlZmluZWQpKTtcbiAgICB2YXIgUHJpc20kMSA9IG1vZHVsZS5leHBvcnRzLmJvbHRFeHBvcnQ7XG5cbiAgICB2YXIgZ2V0TGFuZ3VhZ2VzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnY29kZXNhbXBsZV9sYW5ndWFnZXMnKTtcbiAgICB9O1xuICAgIHZhciB1c2VHbG9iYWxQcmlzbUpTID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnY29kZXNhbXBsZV9nbG9iYWxfcHJpc21qcycsIGZhbHNlLCAnYm9vbGVhbicpO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0ID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIEdsb2JhbC5QcmlzbSAmJiB1c2VHbG9iYWxQcmlzbUpTKGVkaXRvcikgPyBHbG9iYWwuUHJpc20gOiBQcmlzbSQxO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0U2VsZWN0ZWRDb2RlU2FtcGxlID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIG5vZGUgPSBlZGl0b3Iuc2VsZWN0aW9uID8gZWRpdG9yLnNlbGVjdGlvbi5nZXROb2RlKCkgOiBudWxsO1xuICAgICAgaWYgKGlzQ29kZVNhbXBsZShub2RlKSkge1xuICAgICAgICByZXR1cm4gT3B0aW9uLnNvbWUobm9kZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gT3B0aW9uLm5vbmUoKTtcbiAgICB9O1xuICAgIHZhciBpbnNlcnRDb2RlU2FtcGxlID0gZnVuY3Rpb24gKGVkaXRvciwgbGFuZ3VhZ2UsIGNvZGUpIHtcbiAgICAgIGVkaXRvci51bmRvTWFuYWdlci50cmFuc2FjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBub2RlID0gZ2V0U2VsZWN0ZWRDb2RlU2FtcGxlKGVkaXRvcik7XG4gICAgICAgIGNvZGUgPSBnbG9iYWwkMS5ET00uZW5jb2RlKGNvZGUpO1xuICAgICAgICByZXR1cm4gbm9kZS5mb2xkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBlZGl0b3IuaW5zZXJ0Q29udGVudCgnPHByZSBpZD1cIl9fbmV3XCIgY2xhc3M9XCJsYW5ndWFnZS0nICsgbGFuZ3VhZ2UgKyAnXCI+JyArIGNvZGUgKyAnPC9wcmU+Jyk7XG4gICAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5zZWxlY3QoZWRpdG9yLiQoJyNfX25ldycpLnJlbW92ZUF0dHIoJ2lkJylbMF0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAobikge1xuICAgICAgICAgIGVkaXRvci5kb20uc2V0QXR0cmliKG4sICdjbGFzcycsICdsYW5ndWFnZS0nICsgbGFuZ3VhZ2UpO1xuICAgICAgICAgIG4uaW5uZXJIVE1MID0gY29kZTtcbiAgICAgICAgICBnZXQoZWRpdG9yKS5oaWdobGlnaHRFbGVtZW50KG4pO1xuICAgICAgICAgIGVkaXRvci5zZWxlY3Rpb24uc2VsZWN0KG4pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGdldEN1cnJlbnRDb2RlID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIG5vZGUgPSBnZXRTZWxlY3RlZENvZGVTYW1wbGUoZWRpdG9yKTtcbiAgICAgIHJldHVybiBub2RlLmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9LCBmdW5jdGlvbiAobikge1xuICAgICAgICByZXR1cm4gbi50ZXh0Q29udGVudDtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0TGFuZ3VhZ2VzJDEgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgZGVmYXVsdExhbmd1YWdlcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdIVE1ML1hNTCcsXG4gICAgICAgICAgdmFsdWU6ICdtYXJrdXAnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnSmF2YVNjcmlwdCcsXG4gICAgICAgICAgdmFsdWU6ICdqYXZhc2NyaXB0J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ0NTUycsXG4gICAgICAgICAgdmFsdWU6ICdjc3MnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnUEhQJyxcbiAgICAgICAgICB2YWx1ZTogJ3BocCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdSdWJ5JyxcbiAgICAgICAgICB2YWx1ZTogJ3J1YnknXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnUHl0aG9uJyxcbiAgICAgICAgICB2YWx1ZTogJ3B5dGhvbidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdKYXZhJyxcbiAgICAgICAgICB2YWx1ZTogJ2phdmEnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnQycsXG4gICAgICAgICAgdmFsdWU6ICdjJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ0MjJyxcbiAgICAgICAgICB2YWx1ZTogJ2NzaGFycCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdDKysnLFxuICAgICAgICAgIHZhbHVlOiAnY3BwJ1xuICAgICAgICB9XG4gICAgICBdO1xuICAgICAgdmFyIGN1c3RvbUxhbmd1YWdlcyA9IGdldExhbmd1YWdlcyhlZGl0b3IpO1xuICAgICAgcmV0dXJuIGN1c3RvbUxhbmd1YWdlcyA/IGN1c3RvbUxhbmd1YWdlcyA6IGRlZmF1bHRMYW5ndWFnZXM7XG4gICAgfTtcbiAgICB2YXIgZ2V0Q3VycmVudExhbmd1YWdlID0gZnVuY3Rpb24gKGVkaXRvciwgZmFsbGJhY2spIHtcbiAgICAgIHZhciBub2RlID0gZ2V0U2VsZWN0ZWRDb2RlU2FtcGxlKGVkaXRvcik7XG4gICAgICByZXR1cm4gbm9kZS5mb2xkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZhbGxiYWNrO1xuICAgICAgfSwgZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSBuLmNsYXNzTmFtZS5tYXRjaCgvbGFuZ3VhZ2UtKFxcdyspLyk7XG4gICAgICAgIHJldHVybiBtYXRjaGVzID8gbWF0Y2hlc1sxXSA6IGZhbGxiYWNrO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBvcGVuID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGxhbmd1YWdlcyA9IGdldExhbmd1YWdlcyQxKGVkaXRvcik7XG4gICAgICB2YXIgZGVmYXVsdExhbmd1YWdlID0gaGVhZChsYW5ndWFnZXMpLmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9LCBmdW5jdGlvbiAobCkge1xuICAgICAgICByZXR1cm4gbC52YWx1ZTtcbiAgICAgIH0pO1xuICAgICAgdmFyIGN1cnJlbnRMYW5ndWFnZSA9IGdldEN1cnJlbnRMYW5ndWFnZShlZGl0b3IsIGRlZmF1bHRMYW5ndWFnZSk7XG4gICAgICB2YXIgY3VycmVudENvZGUgPSBnZXRDdXJyZW50Q29kZShlZGl0b3IpO1xuICAgICAgZWRpdG9yLndpbmRvd01hbmFnZXIub3Blbih7XG4gICAgICAgIHRpdGxlOiAnSW5zZXJ0L0VkaXQgQ29kZSBTYW1wbGUnLFxuICAgICAgICBzaXplOiAnbGFyZ2UnLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgdHlwZTogJ3BhbmVsJyxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0eXBlOiAnc2VsZWN0Ym94JyxcbiAgICAgICAgICAgICAgbmFtZTogJ2xhbmd1YWdlJyxcbiAgICAgICAgICAgICAgbGFiZWw6ICdMYW5ndWFnZScsXG4gICAgICAgICAgICAgIGl0ZW1zOiBsYW5ndWFnZXNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHR5cGU6ICd0ZXh0YXJlYScsXG4gICAgICAgICAgICAgIG5hbWU6ICdjb2RlJyxcbiAgICAgICAgICAgICAgbGFiZWw6ICdDb2RlIHZpZXcnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2NhbmNlbCcsXG4gICAgICAgICAgICBuYW1lOiAnY2FuY2VsJyxcbiAgICAgICAgICAgIHRleHQ6ICdDYW5jZWwnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnc3VibWl0JyxcbiAgICAgICAgICAgIG5hbWU6ICdzYXZlJyxcbiAgICAgICAgICAgIHRleHQ6ICdTYXZlJyxcbiAgICAgICAgICAgIHByaW1hcnk6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGluaXRpYWxEYXRhOiB7XG4gICAgICAgICAgbGFuZ3VhZ2U6IGN1cnJlbnRMYW5ndWFnZSxcbiAgICAgICAgICBjb2RlOiBjdXJyZW50Q29kZVxuICAgICAgICB9LFxuICAgICAgICBvblN1Ym1pdDogZnVuY3Rpb24gKGFwaSkge1xuICAgICAgICAgIHZhciBkYXRhID0gYXBpLmdldERhdGEoKTtcbiAgICAgICAgICBpbnNlcnRDb2RlU2FtcGxlKGVkaXRvciwgZGF0YS5sYW5ndWFnZSwgZGF0YS5jb2RlKTtcbiAgICAgICAgICBhcGkuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciByZWdpc3RlciA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIGVkaXRvci5hZGRDb21tYW5kKCdjb2Rlc2FtcGxlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbm9kZSA9IGVkaXRvci5zZWxlY3Rpb24uZ2V0Tm9kZSgpO1xuICAgICAgICBpZiAoZWRpdG9yLnNlbGVjdGlvbi5pc0NvbGxhcHNlZCgpIHx8IGlzQ29kZVNhbXBsZShub2RlKSkge1xuICAgICAgICAgIG9wZW4oZWRpdG9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlZGl0b3IuZm9ybWF0dGVyLnRvZ2dsZSgnY29kZScpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHNldHVwID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyICQgPSBlZGl0b3IuJDtcbiAgICAgIGVkaXRvci5vbignUHJlUHJvY2VzcycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICQoJ3ByZVtjb250ZW50ZWRpdGFibGU9ZmFsc2VdJywgZS5ub2RlKS5maWx0ZXIodHJpbUFyZyhpc0NvZGVTYW1wbGUpKS5lYWNoKGZ1bmN0aW9uIChpZHgsIGVsbSkge1xuICAgICAgICAgIHZhciAkZWxtID0gJChlbG0pLCBjb2RlID0gZWxtLnRleHRDb250ZW50O1xuICAgICAgICAgICRlbG0uYXR0cignY2xhc3MnLCAkLnRyaW0oJGVsbS5hdHRyKCdjbGFzcycpKSk7XG4gICAgICAgICAgJGVsbS5yZW1vdmVBdHRyKCdjb250ZW50RWRpdGFibGUnKTtcbiAgICAgICAgICAkZWxtLmVtcHR5KCkuYXBwZW5kKCQoJzxjb2RlPjwvY29kZT4nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBjb2RlO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci5vbignU2V0Q29udGVudCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHVucHJvY2Vzc2VkQ29kZVNhbXBsZXMgPSAkKCdwcmUnKS5maWx0ZXIodHJpbUFyZyhpc0NvZGVTYW1wbGUpKS5maWx0ZXIoZnVuY3Rpb24gKGlkeCwgZWxtKSB7XG4gICAgICAgICAgcmV0dXJuIGVsbS5jb250ZW50RWRpdGFibGUgIT09ICdmYWxzZSc7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodW5wcm9jZXNzZWRDb2RlU2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgICAgICBlZGl0b3IudW5kb01hbmFnZXIudHJhbnNhY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdW5wcm9jZXNzZWRDb2RlU2FtcGxlcy5lYWNoKGZ1bmN0aW9uIChpZHgsIGVsbSkge1xuICAgICAgICAgICAgICAkKGVsbSkuZmluZCgnYnInKS5lYWNoKGZ1bmN0aW9uIChpZHgsIGVsbSkge1xuICAgICAgICAgICAgICAgIGVsbS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChlZGl0b3IuZ2V0RG9jKCkuY3JlYXRlVGV4dE5vZGUoJ1xcbicpLCBlbG0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgZWxtLmNvbnRlbnRFZGl0YWJsZSA9ICdmYWxzZSc7XG4gICAgICAgICAgICAgIGVsbS5pbm5lckhUTUwgPSBlZGl0b3IuZG9tLmVuY29kZShlbG0udGV4dENvbnRlbnQpO1xuICAgICAgICAgICAgICBnZXQoZWRpdG9yKS5oaWdobGlnaHRFbGVtZW50KGVsbSk7XG4gICAgICAgICAgICAgIGVsbS5jbGFzc05hbWUgPSAkLnRyaW0oZWxtLmNsYXNzTmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBpc0NvZGVTYW1wbGVTZWxlY3Rpb24gPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgbm9kZSA9IGVkaXRvci5zZWxlY3Rpb24uZ2V0U3RhcnQoKTtcbiAgICAgIHJldHVybiBlZGl0b3IuZG9tLmlzKG5vZGUsICdwcmVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdJyk7XG4gICAgfTtcbiAgICB2YXIgcmVnaXN0ZXIkMSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRUb2dnbGVCdXR0b24oJ2NvZGVzYW1wbGUnLCB7XG4gICAgICAgIGljb246ICdjb2RlLXNhbXBsZScsXG4gICAgICAgIHRvb2x0aXA6ICdJbnNlcnQvZWRpdCBjb2RlIHNhbXBsZScsXG4gICAgICAgIG9uQWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIG9wZW4oZWRpdG9yKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TZXR1cDogZnVuY3Rpb24gKGFwaSkge1xuICAgICAgICAgIHZhciBub2RlQ2hhbmdlSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGFwaS5zZXRBY3RpdmUoaXNDb2RlU2FtcGxlU2VsZWN0aW9uKGVkaXRvcikpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgZWRpdG9yLm9uKCdOb2RlQ2hhbmdlJywgbm9kZUNoYW5nZUhhbmRsZXIpO1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gZWRpdG9yLm9mZignTm9kZUNoYW5nZScsIG5vZGVDaGFuZ2VIYW5kbGVyKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRNZW51SXRlbSgnY29kZXNhbXBsZScsIHtcbiAgICAgICAgdGV4dDogJ0NvZGUgc2FtcGxlLi4uJyxcbiAgICAgICAgaWNvbjogJ2NvZGUtc2FtcGxlJyxcbiAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gb3BlbihlZGl0b3IpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gUGx1Z2luICgpIHtcbiAgICAgIGdsb2JhbC5hZGQoJ2NvZGVzYW1wbGUnLCBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIHNldHVwKGVkaXRvcik7XG4gICAgICAgIHJlZ2lzdGVyJDEoZWRpdG9yKTtcbiAgICAgICAgcmVnaXN0ZXIoZWRpdG9yKTtcbiAgICAgICAgZWRpdG9yLm9uKCdkYmxjbGljaycsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgIGlmIChpc0NvZGVTYW1wbGUoZXYudGFyZ2V0KSkge1xuICAgICAgICAgICAgb3BlbihlZGl0b3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBQbHVnaW4oKTtcblxufSh3aW5kb3cpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=