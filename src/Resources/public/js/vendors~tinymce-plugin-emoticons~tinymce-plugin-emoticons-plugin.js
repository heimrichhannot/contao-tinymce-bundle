(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~tinymce-plugin-emoticons~tinymce-plugin-emoticons-plugin"],{

/***/ "./node_modules/tinymce/plugins/emoticons/plugin.js":
/*!**********************************************************!*\
  !*** ./node_modules/tinymce/plugins/emoticons/plugin.js ***!
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

    var exists = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          return true;
        }
      }
      return false;
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

    var contains = function (str, substr) {
      return str.indexOf(substr) !== -1;
    };

    var emojiMatches = function (emoji, lowerCasePattern) {
      return contains(emoji.title.toLowerCase(), lowerCasePattern) || exists(emoji.keywords, function (k) {
        return contains(k.toLowerCase(), lowerCasePattern);
      });
    };
    var emojisFrom = function (list, pattern, maxResults) {
      var matches = [];
      var lowerCasePattern = pattern.toLowerCase();
      var reachedLimit = maxResults.fold(function () {
        return never;
      }, function (max) {
        return function (size) {
          return size >= max;
        };
      });
      for (var i = 0; i < list.length; i++) {
        if (pattern.length === 0 || emojiMatches(list[i], lowerCasePattern)) {
          matches.push({
            value: list[i].char,
            text: list[i].title,
            icon: list[i].char
          });
          if (reachedLimit(matches.length)) {
            break;
          }
        }
      }
      return matches;
    };

    var init = function (editor, database) {
      editor.ui.registry.addAutocompleter('emoticons', {
        ch: ':',
        columns: 'auto',
        minChars: 2,
        fetch: function (pattern, maxResults) {
          return database.waitForLoad().then(function () {
            var candidates = database.listAll();
            return emojisFrom(candidates, pattern, Option.some(maxResults));
          });
        },
        onAction: function (autocompleteApi, rng, value) {
          editor.selection.setRng(rng);
          editor.insertContent(value);
          autocompleteApi.hide();
        }
      });
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

    var last = function (fn, rate) {
      var timer = null;
      var cancel = function () {
        if (timer !== null) {
          domGlobals.clearTimeout(timer);
          timer = null;
        }
      };
      var throttle = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (timer !== null) {
          domGlobals.clearTimeout(timer);
        }
        timer = domGlobals.setTimeout(function () {
          fn.apply(null, args);
          timer = null;
        }, rate);
      };
      return {
        cancel: cancel,
        throttle: throttle
      };
    };

    var insertEmoticon = function (editor, ch) {
      editor.insertContent(ch);
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

    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var shallow = function (old, nu) {
      return nu;
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
    var merge = baseMerge(shallow);

    var keys = Object.keys;
    var hasOwnProperty$1 = Object.hasOwnProperty;
    var each = function (obj, f) {
      var props = keys(obj);
      for (var k = 0, len = props.length; k < len; k++) {
        var i = props[k];
        var x = obj[i];
        f(x, i);
      }
    };
    var map$1 = function (obj, f) {
      return tupleMap(obj, function (x, i) {
        return {
          k: i,
          v: f(x, i)
        };
      });
    };
    var tupleMap = function (obj, f) {
      var r = {};
      each(obj, function (x, i) {
        var tuple = f(x, i);
        r[tuple.k] = tuple.v;
      });
      return r;
    };
    var has = function (obj, key) {
      return hasOwnProperty$1.call(obj, key);
    };

    var global$1 = tinymce.util.Tools.resolve('tinymce.Resource');

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.Delay');

    var global$3 = tinymce.util.Tools.resolve('tinymce.util.Promise');

    var DEFAULT_ID = 'tinymce.plugins.emoticons';
    var getEmoticonDatabaseUrl = function (editor, pluginUrl) {
      return editor.getParam('emoticons_database_url', pluginUrl + '/js/emojis' + editor.suffix + '.js');
    };
    var getEmoticonDatabaseId = function (editor) {
      return editor.getParam('emoticons_database_id', DEFAULT_ID, 'string');
    };
    var getAppendedEmoticons = function (editor) {
      return editor.getParam('emoticons_append', {}, 'object');
    };

    var ALL_CATEGORY = 'All';
    var categoryNameMap = {
      symbols: 'Symbols',
      people: 'People',
      animals_and_nature: 'Animals and Nature',
      food_and_drink: 'Food and Drink',
      activity: 'Activity',
      travel_and_places: 'Travel and Places',
      objects: 'Objects',
      flags: 'Flags',
      user: 'User Defined'
    };
    var translateCategory = function (categories, name) {
      return has(categories, name) ? categories[name] : name;
    };
    var getUserDefinedEmoticons = function (editor) {
      var userDefinedEmoticons = getAppendedEmoticons(editor);
      return map$1(userDefinedEmoticons, function (value) {
        return __assign({
          keywords: [],
          category: 'user'
        }, value);
      });
    };
    var initDatabase = function (editor, databaseUrl, databaseId) {
      var categories = Cell(Option.none());
      var all = Cell(Option.none());
      var processEmojis = function (emojis) {
        var cats = {};
        var everything = [];
        each(emojis, function (lib, title) {
          var entry = {
            title: title,
            keywords: lib.keywords,
            char: lib.char,
            category: translateCategory(categoryNameMap, lib.category)
          };
          var current = cats[entry.category] !== undefined ? cats[entry.category] : [];
          cats[entry.category] = current.concat([entry]);
          everything.push(entry);
        });
        categories.set(Option.some(cats));
        all.set(Option.some(everything));
      };
      editor.on('init', function () {
        global$1.load(databaseId, databaseUrl).then(function (emojis) {
          var userEmojis = getUserDefinedEmoticons(editor);
          processEmojis(merge(emojis, userEmojis));
        }, function (err) {
          domGlobals.console.log('Failed to load emoticons: ' + err);
          categories.set(Option.some({}));
          all.set(Option.some([]));
        });
      });
      var listCategory = function (category) {
        if (category === ALL_CATEGORY) {
          return listAll();
        }
        return categories.get().bind(function (cats) {
          return Option.from(cats[category]);
        }).getOr([]);
      };
      var listAll = function () {
        return all.get().getOr([]);
      };
      var listCategories = function () {
        return [ALL_CATEGORY].concat(keys(categories.get().getOr({})));
      };
      var waitForLoad = function () {
        if (hasLoaded()) {
          return global$3.resolve(true);
        } else {
          return new global$3(function (resolve, reject) {
            var numRetries = 15;
            var interval = global$2.setInterval(function () {
              if (hasLoaded()) {
                global$2.clearInterval(interval);
                resolve(true);
              } else {
                numRetries--;
                if (numRetries < 0) {
                  domGlobals.console.log('Could not load emojis from url: ' + databaseUrl);
                  global$2.clearInterval(interval);
                  reject(false);
                }
              }
            }, 100);
          });
        }
      };
      var hasLoaded = function () {
        return categories.get().isSome() && all.get().isSome();
      };
      return {
        listCategories: listCategories,
        hasLoaded: hasLoaded,
        waitForLoad: waitForLoad,
        listAll: listAll,
        listCategory: listCategory
      };
    };

    var patternName = 'pattern';
    var open = function (editor, database) {
      var initialState = {
        pattern: '',
        results: emojisFrom(database.listAll(), '', Option.some(300))
      };
      var currentTab = Cell(ALL_CATEGORY);
      var scan = function (dialogApi) {
        var dialogData = dialogApi.getData();
        var category = currentTab.get();
        var candidates = database.listCategory(category);
        var results = emojisFrom(candidates, dialogData[patternName], category === ALL_CATEGORY ? Option.some(300) : Option.none());
        dialogApi.setData({ results: results });
      };
      var updateFilter = last(function (dialogApi) {
        scan(dialogApi);
      }, 200);
      var searchField = {
        label: 'Search',
        type: 'input',
        name: patternName
      };
      var resultsField = {
        type: 'collection',
        name: 'results'
      };
      var getInitialState = function () {
        var body = {
          type: 'tabpanel',
          tabs: map(database.listCategories(), function (cat) {
            return {
              title: cat,
              name: cat,
              items: [
                searchField,
                resultsField
              ]
            };
          })
        };
        return {
          title: 'Emoticons',
          size: 'normal',
          body: body,
          initialData: initialState,
          onTabChange: function (dialogApi, details) {
            currentTab.set(details.newTabName);
            updateFilter.throttle(dialogApi);
          },
          onChange: updateFilter.throttle,
          onAction: function (dialogApi, actionData) {
            if (actionData.name === 'results') {
              insertEmoticon(editor, actionData.value);
              dialogApi.close();
            }
          },
          buttons: [{
              type: 'cancel',
              text: 'Close',
              primary: true
            }]
        };
      };
      var dialogApi = editor.windowManager.open(getInitialState());
      dialogApi.focus(patternName);
      if (!database.hasLoaded()) {
        dialogApi.block('Loading emoticons...');
        database.waitForLoad().then(function () {
          dialogApi.redial(getInitialState());
          updateFilter.throttle(dialogApi);
          dialogApi.focus(patternName);
          dialogApi.unblock();
        }).catch(function (_err) {
          dialogApi.redial({
            title: 'Emoticons',
            body: {
              type: 'panel',
              items: [{
                  type: 'alertbanner',
                  level: 'error',
                  icon: 'warning',
                  text: '<p>Could not load emoticons</p>'
                }]
            },
            buttons: [{
                type: 'cancel',
                text: 'Close',
                primary: true
              }],
            initialData: {
              pattern: '',
              results: []
            }
          });
          dialogApi.focus(patternName);
          dialogApi.unblock();
        });
      }
    };

    var register = function (editor, database) {
      var onAction = function () {
        return open(editor, database);
      };
      editor.ui.registry.addButton('emoticons', {
        tooltip: 'Emoticons',
        icon: 'emoji',
        onAction: onAction
      });
      editor.ui.registry.addMenuItem('emoticons', {
        text: 'Emoticons...',
        icon: 'emoji',
        onAction: onAction
      });
    };

    function Plugin () {
      global.add('emoticons', function (editor, pluginUrl) {
        var databaseUrl = getEmoticonDatabaseUrl(editor, pluginUrl);
        var databaseId = getEmoticonDatabaseId(editor);
        var database = initDatabase(editor, databaseUrl, databaseId);
        register(editor, database);
        init(editor, database);
      });
    }

    Plugin();

}(window));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2Vtb3RpY29ucy9wbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0NBQXNDLFNBQVM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIs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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7O0FBRUEsQ0FBQyIsImZpbGUiOiJ2ZW5kb3JzfnRpbnltY2UtcGx1Z2luLWVtb3RpY29uc350aW55bWNlLXBsdWdpbi1lbW90aWNvbnMtcGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIFRpbnkgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTEdQTCBvciBhIGNvbW1lcmNpYWwgbGljZW5zZS5cbiAqIEZvciBMR1BMIHNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogRm9yIGNvbW1lcmNpYWwgbGljZW5zZXMgc2VlIGh0dHBzOi8vd3d3LnRpbnkuY2xvdWQvXG4gKlxuICogVmVyc2lvbjogNS40LjIgKDIwMjAtMDgtMTcpXG4gKi9cbihmdW5jdGlvbiAoZG9tR2xvYmFscykge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBnbG9iYWwgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5QbHVnaW5NYW5hZ2VyJyk7XG5cbiAgICB2YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHtcbiAgICB9O1xuICAgIHZhciBjb25zdGFudCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBuZXZlciA9IGNvbnN0YW50KGZhbHNlKTtcbiAgICB2YXIgYWx3YXlzID0gY29uc3RhbnQodHJ1ZSk7XG5cbiAgICB2YXIgbm9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBOT05FO1xuICAgIH07XG4gICAgdmFyIE5PTkUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgZXEgPSBmdW5jdGlvbiAobykge1xuICAgICAgICByZXR1cm4gby5pc05vbmUoKTtcbiAgICAgIH07XG4gICAgICB2YXIgY2FsbCA9IGZ1bmN0aW9uICh0aHVuaykge1xuICAgICAgICByZXR1cm4gdGh1bmsoKTtcbiAgICAgIH07XG4gICAgICB2YXIgaWQgPSBmdW5jdGlvbiAobikge1xuICAgICAgICByZXR1cm4gbjtcbiAgICAgIH07XG4gICAgICB2YXIgbWUgPSB7XG4gICAgICAgIGZvbGQ6IGZ1bmN0aW9uIChuLCBfcykge1xuICAgICAgICAgIHJldHVybiBuKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzOiBuZXZlcixcbiAgICAgICAgaXNTb21lOiBuZXZlcixcbiAgICAgICAgaXNOb25lOiBhbHdheXMsXG4gICAgICAgIGdldE9yOiBpZCxcbiAgICAgICAgZ2V0T3JUaHVuazogY2FsbCxcbiAgICAgICAgZ2V0T3JEaWU6IGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnIHx8ICdlcnJvcjogZ2V0T3JEaWUgY2FsbGVkIG9uIG5vbmUuJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldE9yTnVsbDogY29uc3RhbnQobnVsbCksXG4gICAgICAgIGdldE9yVW5kZWZpbmVkOiBjb25zdGFudCh1bmRlZmluZWQpLFxuICAgICAgICBvcjogaWQsXG4gICAgICAgIG9yVGh1bms6IGNhbGwsXG4gICAgICAgIG1hcDogbm9uZSxcbiAgICAgICAgZWFjaDogbm9vcCxcbiAgICAgICAgYmluZDogbm9uZSxcbiAgICAgICAgZXhpc3RzOiBuZXZlcixcbiAgICAgICAgZm9yYWxsOiBhbHdheXMsXG4gICAgICAgIGZpbHRlcjogbm9uZSxcbiAgICAgICAgZXF1YWxzOiBlcSxcbiAgICAgICAgZXF1YWxzXzogZXEsXG4gICAgICAgIHRvQXJyYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0sXG4gICAgICAgIHRvU3RyaW5nOiBjb25zdGFudCgnbm9uZSgpJylcbiAgICAgIH07XG4gICAgICByZXR1cm4gbWU7XG4gICAgfSgpO1xuICAgIHZhciBzb21lID0gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHZhciBjb25zdGFudF9hID0gY29uc3RhbnQoYSk7XG4gICAgICB2YXIgc2VsZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG1lO1xuICAgICAgfTtcbiAgICAgIHZhciBiaW5kID0gZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgcmV0dXJuIGYoYSk7XG4gICAgICB9O1xuICAgICAgdmFyIG1lID0ge1xuICAgICAgICBmb2xkOiBmdW5jdGlvbiAobiwgcykge1xuICAgICAgICAgIHJldHVybiBzKGEpO1xuICAgICAgICB9LFxuICAgICAgICBpczogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICByZXR1cm4gYSA9PT0gdjtcbiAgICAgICAgfSxcbiAgICAgICAgaXNTb21lOiBhbHdheXMsXG4gICAgICAgIGlzTm9uZTogbmV2ZXIsXG4gICAgICAgIGdldE9yOiBjb25zdGFudF9hLFxuICAgICAgICBnZXRPclRodW5rOiBjb25zdGFudF9hLFxuICAgICAgICBnZXRPckRpZTogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JOdWxsOiBjb25zdGFudF9hLFxuICAgICAgICBnZXRPclVuZGVmaW5lZDogY29uc3RhbnRfYSxcbiAgICAgICAgb3I6IHNlbGYsXG4gICAgICAgIG9yVGh1bms6IHNlbGYsXG4gICAgICAgIG1hcDogZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICByZXR1cm4gc29tZShmKGEpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZWFjaDogZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICBmKGEpO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kOiBiaW5kLFxuICAgICAgICBleGlzdHM6IGJpbmQsXG4gICAgICAgIGZvcmFsbDogYmluZCxcbiAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiAoZikge1xuICAgICAgICAgIHJldHVybiBmKGEpID8gbWUgOiBOT05FO1xuICAgICAgICB9LFxuICAgICAgICB0b0FycmF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIFthXTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gJ3NvbWUoJyArIGEgKyAnKSc7XG4gICAgICAgIH0sXG4gICAgICAgIGVxdWFsczogZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgICByZXR1cm4gby5pcyhhKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXF1YWxzXzogZnVuY3Rpb24gKG8sIGVsZW1lbnRFcSkge1xuICAgICAgICAgIHJldHVybiBvLmZvbGQobmV2ZXIsIGZ1bmN0aW9uIChiKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudEVxKGEsIGIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIG1lO1xuICAgIH07XG4gICAgdmFyIGZyb20gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gTk9ORSA6IHNvbWUodmFsdWUpO1xuICAgIH07XG4gICAgdmFyIE9wdGlvbiA9IHtcbiAgICAgIHNvbWU6IHNvbWUsXG4gICAgICBub25lOiBub25lLFxuICAgICAgZnJvbTogZnJvbVxuICAgIH07XG5cbiAgICB2YXIgZXhpc3RzID0gZnVuY3Rpb24gKHhzLCBwcmVkKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0geHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHggPSB4c1tpXTtcbiAgICAgICAgaWYgKHByZWQoeCwgaSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgdmFyIG1hcCA9IGZ1bmN0aW9uICh4cywgZikge1xuICAgICAgdmFyIGxlbiA9IHhzLmxlbmd0aDtcbiAgICAgIHZhciByID0gbmV3IEFycmF5KGxlbik7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciB4ID0geHNbaV07XG4gICAgICAgIHJbaV0gPSBmKHgsIGkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcblxuICAgIHZhciBjb250YWlucyA9IGZ1bmN0aW9uIChzdHIsIHN1YnN0cikge1xuICAgICAgcmV0dXJuIHN0ci5pbmRleE9mKHN1YnN0cikgIT09IC0xO1xuICAgIH07XG5cbiAgICB2YXIgZW1vamlNYXRjaGVzID0gZnVuY3Rpb24gKGVtb2ppLCBsb3dlckNhc2VQYXR0ZXJuKSB7XG4gICAgICByZXR1cm4gY29udGFpbnMoZW1vamkudGl0bGUudG9Mb3dlckNhc2UoKSwgbG93ZXJDYXNlUGF0dGVybikgfHwgZXhpc3RzKGVtb2ppLmtleXdvcmRzLCBmdW5jdGlvbiAoaykge1xuICAgICAgICByZXR1cm4gY29udGFpbnMoay50b0xvd2VyQ2FzZSgpLCBsb3dlckNhc2VQYXR0ZXJuKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGVtb2ppc0Zyb20gPSBmdW5jdGlvbiAobGlzdCwgcGF0dGVybiwgbWF4UmVzdWx0cykge1xuICAgICAgdmFyIG1hdGNoZXMgPSBbXTtcbiAgICAgIHZhciBsb3dlckNhc2VQYXR0ZXJuID0gcGF0dGVybi50b0xvd2VyQ2FzZSgpO1xuICAgICAgdmFyIHJlYWNoZWRMaW1pdCA9IG1heFJlc3VsdHMuZm9sZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXZlcjtcbiAgICAgIH0sIGZ1bmN0aW9uIChtYXgpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzaXplKSB7XG4gICAgICAgICAgcmV0dXJuIHNpemUgPj0gbWF4O1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHBhdHRlcm4ubGVuZ3RoID09PSAwIHx8IGVtb2ppTWF0Y2hlcyhsaXN0W2ldLCBsb3dlckNhc2VQYXR0ZXJuKSkge1xuICAgICAgICAgIG1hdGNoZXMucHVzaCh7XG4gICAgICAgICAgICB2YWx1ZTogbGlzdFtpXS5jaGFyLFxuICAgICAgICAgICAgdGV4dDogbGlzdFtpXS50aXRsZSxcbiAgICAgICAgICAgIGljb246IGxpc3RbaV0uY2hhclxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChyZWFjaGVkTGltaXQobWF0Y2hlcy5sZW5ndGgpKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaGVzO1xuICAgIH07XG5cbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uIChlZGl0b3IsIGRhdGFiYXNlKSB7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkQXV0b2NvbXBsZXRlcignZW1vdGljb25zJywge1xuICAgICAgICBjaDogJzonLFxuICAgICAgICBjb2x1bW5zOiAnYXV0bycsXG4gICAgICAgIG1pbkNoYXJzOiAyLFxuICAgICAgICBmZXRjaDogZnVuY3Rpb24gKHBhdHRlcm4sIG1heFJlc3VsdHMpIHtcbiAgICAgICAgICByZXR1cm4gZGF0YWJhc2Uud2FpdEZvckxvYWQoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjYW5kaWRhdGVzID0gZGF0YWJhc2UubGlzdEFsbCgpO1xuICAgICAgICAgICAgcmV0dXJuIGVtb2ppc0Zyb20oY2FuZGlkYXRlcywgcGF0dGVybiwgT3B0aW9uLnNvbWUobWF4UmVzdWx0cykpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKGF1dG9jb21wbGV0ZUFwaSwgcm5nLCB2YWx1ZSkge1xuICAgICAgICAgIGVkaXRvci5zZWxlY3Rpb24uc2V0Um5nKHJuZyk7XG4gICAgICAgICAgZWRpdG9yLmluc2VydENvbnRlbnQodmFsdWUpO1xuICAgICAgICAgIGF1dG9jb21wbGV0ZUFwaS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgQ2VsbCA9IGZ1bmN0aW9uIChpbml0aWFsKSB7XG4gICAgICB2YXIgdmFsdWUgPSBpbml0aWFsO1xuICAgICAgdmFyIGdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfTtcbiAgICAgIHZhciBzZXQgPSBmdW5jdGlvbiAodikge1xuICAgICAgICB2YWx1ZSA9IHY7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0OiBnZXQsXG4gICAgICAgIHNldDogc2V0XG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgbGFzdCA9IGZ1bmN0aW9uIChmbiwgcmF0ZSkge1xuICAgICAgdmFyIHRpbWVyID0gbnVsbDtcbiAgICAgIHZhciBjYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aW1lciAhPT0gbnVsbCkge1xuICAgICAgICAgIGRvbUdsb2JhbHMuY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB2YXIgdGhyb3R0bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aW1lciAhPT0gbnVsbCkge1xuICAgICAgICAgIGRvbUdsb2JhbHMuY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgfVxuICAgICAgICB0aW1lciA9IGRvbUdsb2JhbHMuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZm4uYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgICB9LCByYXRlKTtcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjYW5jZWw6IGNhbmNlbCxcbiAgICAgICAgdGhyb3R0bGU6IHRocm90dGxlXG4gICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgaW5zZXJ0RW1vdGljb24gPSBmdW5jdGlvbiAoZWRpdG9yLCBjaCkge1xuICAgICAgZWRpdG9yLmluc2VydENvbnRlbnQoY2gpO1xuICAgIH07XG5cbiAgICB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgIGZvciAodmFyIHAgaW4gcylcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgICAgfTtcbiAgICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICAgIHZhciBzaGFsbG93ID0gZnVuY3Rpb24gKG9sZCwgbnUpIHtcbiAgICAgIHJldHVybiBudTtcbiAgICB9O1xuICAgIHZhciBiYXNlTWVyZ2UgPSBmdW5jdGlvbiAobWVyZ2VyKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb2JqZWN0cyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgb2JqZWN0c1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2JqZWN0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhblxcJ3QgbWVyZ2UgemVybyBvYmplY3RzJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJldCA9IHt9O1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG9iamVjdHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICB2YXIgY3VyT2JqZWN0ID0gb2JqZWN0c1tqXTtcbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gY3VyT2JqZWN0KSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjdXJPYmplY3QsIGtleSkpIHtcbiAgICAgICAgICAgICAgcmV0W2tleV0gPSBtZXJnZXIocmV0W2tleV0sIGN1ck9iamVjdFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgbWVyZ2UgPSBiYXNlTWVyZ2Uoc2hhbGxvdyk7XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzO1xuICAgIHZhciBoYXNPd25Qcm9wZXJ0eSQxID0gT2JqZWN0Lmhhc093blByb3BlcnR5O1xuICAgIHZhciBlYWNoID0gZnVuY3Rpb24gKG9iaiwgZikge1xuICAgICAgdmFyIHByb3BzID0ga2V5cyhvYmopO1xuICAgICAgZm9yICh2YXIgayA9IDAsIGxlbiA9IHByb3BzLmxlbmd0aDsgayA8IGxlbjsgaysrKSB7XG4gICAgICAgIHZhciBpID0gcHJvcHNba107XG4gICAgICAgIHZhciB4ID0gb2JqW2ldO1xuICAgICAgICBmKHgsIGkpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIG1hcCQxID0gZnVuY3Rpb24gKG9iaiwgZikge1xuICAgICAgcmV0dXJuIHR1cGxlTWFwKG9iaiwgZnVuY3Rpb24gKHgsIGkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBrOiBpLFxuICAgICAgICAgIHY6IGYoeCwgaSlcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHR1cGxlTWFwID0gZnVuY3Rpb24gKG9iaiwgZikge1xuICAgICAgdmFyIHIgPSB7fTtcbiAgICAgIGVhY2gob2JqLCBmdW5jdGlvbiAoeCwgaSkge1xuICAgICAgICB2YXIgdHVwbGUgPSBmKHgsIGkpO1xuICAgICAgICByW3R1cGxlLmtdID0gdHVwbGUudjtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcbiAgICB2YXIgaGFzID0gZnVuY3Rpb24gKG9iaiwga2V5KSB7XG4gICAgICByZXR1cm4gaGFzT3duUHJvcGVydHkkMS5jYWxsKG9iaiwga2V5KTtcbiAgICB9O1xuXG4gICAgdmFyIGdsb2JhbCQxID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuUmVzb3VyY2UnKTtcblxuICAgIHZhciBnbG9iYWwkMiA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuRGVsYXknKTtcblxuICAgIHZhciBnbG9iYWwkMyA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuUHJvbWlzZScpO1xuXG4gICAgdmFyIERFRkFVTFRfSUQgPSAndGlueW1jZS5wbHVnaW5zLmVtb3RpY29ucyc7XG4gICAgdmFyIGdldEVtb3RpY29uRGF0YWJhc2VVcmwgPSBmdW5jdGlvbiAoZWRpdG9yLCBwbHVnaW5VcmwpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2Vtb3RpY29uc19kYXRhYmFzZV91cmwnLCBwbHVnaW5VcmwgKyAnL2pzL2Vtb2ppcycgKyBlZGl0b3Iuc3VmZml4ICsgJy5qcycpO1xuICAgIH07XG4gICAgdmFyIGdldEVtb3RpY29uRGF0YWJhc2VJZCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2Vtb3RpY29uc19kYXRhYmFzZV9pZCcsIERFRkFVTFRfSUQsICdzdHJpbmcnKTtcbiAgICB9O1xuICAgIHZhciBnZXRBcHBlbmRlZEVtb3RpY29ucyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2Vtb3RpY29uc19hcHBlbmQnLCB7fSwgJ29iamVjdCcpO1xuICAgIH07XG5cbiAgICB2YXIgQUxMX0NBVEVHT1JZID0gJ0FsbCc7XG4gICAgdmFyIGNhdGVnb3J5TmFtZU1hcCA9IHtcbiAgICAgIHN5bWJvbHM6ICdTeW1ib2xzJyxcbiAgICAgIHBlb3BsZTogJ1Blb3BsZScsXG4gICAgICBhbmltYWxzX2FuZF9uYXR1cmU6ICdBbmltYWxzIGFuZCBOYXR1cmUnLFxuICAgICAgZm9vZF9hbmRfZHJpbms6ICdGb29kIGFuZCBEcmluaycsXG4gICAgICBhY3Rpdml0eTogJ0FjdGl2aXR5JyxcbiAgICAgIHRyYXZlbF9hbmRfcGxhY2VzOiAnVHJhdmVsIGFuZCBQbGFjZXMnLFxuICAgICAgb2JqZWN0czogJ09iamVjdHMnLFxuICAgICAgZmxhZ3M6ICdGbGFncycsXG4gICAgICB1c2VyOiAnVXNlciBEZWZpbmVkJ1xuICAgIH07XG4gICAgdmFyIHRyYW5zbGF0ZUNhdGVnb3J5ID0gZnVuY3Rpb24gKGNhdGVnb3JpZXMsIG5hbWUpIHtcbiAgICAgIHJldHVybiBoYXMoY2F0ZWdvcmllcywgbmFtZSkgPyBjYXRlZ29yaWVzW25hbWVdIDogbmFtZTtcbiAgICB9O1xuICAgIHZhciBnZXRVc2VyRGVmaW5lZEVtb3RpY29ucyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciB1c2VyRGVmaW5lZEVtb3RpY29ucyA9IGdldEFwcGVuZGVkRW1vdGljb25zKGVkaXRvcik7XG4gICAgICByZXR1cm4gbWFwJDEodXNlckRlZmluZWRFbW90aWNvbnMsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gX19hc3NpZ24oe1xuICAgICAgICAgIGtleXdvcmRzOiBbXSxcbiAgICAgICAgICBjYXRlZ29yeTogJ3VzZXInXG4gICAgICAgIH0sIHZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGluaXREYXRhYmFzZSA9IGZ1bmN0aW9uIChlZGl0b3IsIGRhdGFiYXNlVXJsLCBkYXRhYmFzZUlkKSB7XG4gICAgICB2YXIgY2F0ZWdvcmllcyA9IENlbGwoT3B0aW9uLm5vbmUoKSk7XG4gICAgICB2YXIgYWxsID0gQ2VsbChPcHRpb24ubm9uZSgpKTtcbiAgICAgIHZhciBwcm9jZXNzRW1vamlzID0gZnVuY3Rpb24gKGVtb2ppcykge1xuICAgICAgICB2YXIgY2F0cyA9IHt9O1xuICAgICAgICB2YXIgZXZlcnl0aGluZyA9IFtdO1xuICAgICAgICBlYWNoKGVtb2ppcywgZnVuY3Rpb24gKGxpYiwgdGl0bGUpIHtcbiAgICAgICAgICB2YXIgZW50cnkgPSB7XG4gICAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgICBrZXl3b3JkczogbGliLmtleXdvcmRzLFxuICAgICAgICAgICAgY2hhcjogbGliLmNoYXIsXG4gICAgICAgICAgICBjYXRlZ29yeTogdHJhbnNsYXRlQ2F0ZWdvcnkoY2F0ZWdvcnlOYW1lTWFwLCBsaWIuY2F0ZWdvcnkpXG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIgY3VycmVudCA9IGNhdHNbZW50cnkuY2F0ZWdvcnldICE9PSB1bmRlZmluZWQgPyBjYXRzW2VudHJ5LmNhdGVnb3J5XSA6IFtdO1xuICAgICAgICAgIGNhdHNbZW50cnkuY2F0ZWdvcnldID0gY3VycmVudC5jb25jYXQoW2VudHJ5XSk7XG4gICAgICAgICAgZXZlcnl0aGluZy5wdXNoKGVudHJ5KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNhdGVnb3JpZXMuc2V0KE9wdGlvbi5zb21lKGNhdHMpKTtcbiAgICAgICAgYWxsLnNldChPcHRpb24uc29tZShldmVyeXRoaW5nKSk7XG4gICAgICB9O1xuICAgICAgZWRpdG9yLm9uKCdpbml0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBnbG9iYWwkMS5sb2FkKGRhdGFiYXNlSWQsIGRhdGFiYXNlVXJsKS50aGVuKGZ1bmN0aW9uIChlbW9qaXMpIHtcbiAgICAgICAgICB2YXIgdXNlckVtb2ppcyA9IGdldFVzZXJEZWZpbmVkRW1vdGljb25zKGVkaXRvcik7XG4gICAgICAgICAgcHJvY2Vzc0Vtb2ppcyhtZXJnZShlbW9qaXMsIHVzZXJFbW9qaXMpKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGRvbUdsb2JhbHMuY29uc29sZS5sb2coJ0ZhaWxlZCB0byBsb2FkIGVtb3RpY29uczogJyArIGVycik7XG4gICAgICAgICAgY2F0ZWdvcmllcy5zZXQoT3B0aW9uLnNvbWUoe30pKTtcbiAgICAgICAgICBhbGwuc2V0KE9wdGlvbi5zb21lKFtdKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICB2YXIgbGlzdENhdGVnb3J5ID0gZnVuY3Rpb24gKGNhdGVnb3J5KSB7XG4gICAgICAgIGlmIChjYXRlZ29yeSA9PT0gQUxMX0NBVEVHT1JZKSB7XG4gICAgICAgICAgcmV0dXJuIGxpc3RBbGwoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2F0ZWdvcmllcy5nZXQoKS5iaW5kKGZ1bmN0aW9uIChjYXRzKSB7XG4gICAgICAgICAgcmV0dXJuIE9wdGlvbi5mcm9tKGNhdHNbY2F0ZWdvcnldKTtcbiAgICAgICAgfSkuZ2V0T3IoW10pO1xuICAgICAgfTtcbiAgICAgIHZhciBsaXN0QWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYWxsLmdldCgpLmdldE9yKFtdKTtcbiAgICAgIH07XG4gICAgICB2YXIgbGlzdENhdGVnb3JpZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBbQUxMX0NBVEVHT1JZXS5jb25jYXQoa2V5cyhjYXRlZ29yaWVzLmdldCgpLmdldE9yKHt9KSkpO1xuICAgICAgfTtcbiAgICAgIHZhciB3YWl0Rm9yTG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGhhc0xvYWRlZCgpKSB7XG4gICAgICAgICAgcmV0dXJuIGdsb2JhbCQzLnJlc29sdmUodHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBnbG9iYWwkMyhmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICB2YXIgbnVtUmV0cmllcyA9IDE1O1xuICAgICAgICAgICAgdmFyIGludGVydmFsID0gZ2xvYmFsJDIuc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBpZiAoaGFzTG9hZGVkKCkpIHtcbiAgICAgICAgICAgICAgICBnbG9iYWwkMi5jbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG51bVJldHJpZXMtLTtcbiAgICAgICAgICAgICAgICBpZiAobnVtUmV0cmllcyA8IDApIHtcbiAgICAgICAgICAgICAgICAgIGRvbUdsb2JhbHMuY29uc29sZS5sb2coJ0NvdWxkIG5vdCBsb2FkIGVtb2ppcyBmcm9tIHVybDogJyArIGRhdGFiYXNlVXJsKTtcbiAgICAgICAgICAgICAgICAgIGdsb2JhbCQyLmNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB2YXIgaGFzTG9hZGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY2F0ZWdvcmllcy5nZXQoKS5pc1NvbWUoKSAmJiBhbGwuZ2V0KCkuaXNTb21lKCk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGlzdENhdGVnb3JpZXM6IGxpc3RDYXRlZ29yaWVzLFxuICAgICAgICBoYXNMb2FkZWQ6IGhhc0xvYWRlZCxcbiAgICAgICAgd2FpdEZvckxvYWQ6IHdhaXRGb3JMb2FkLFxuICAgICAgICBsaXN0QWxsOiBsaXN0QWxsLFxuICAgICAgICBsaXN0Q2F0ZWdvcnk6IGxpc3RDYXRlZ29yeVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIHBhdHRlcm5OYW1lID0gJ3BhdHRlcm4nO1xuICAgIHZhciBvcGVuID0gZnVuY3Rpb24gKGVkaXRvciwgZGF0YWJhc2UpIHtcbiAgICAgIHZhciBpbml0aWFsU3RhdGUgPSB7XG4gICAgICAgIHBhdHRlcm46ICcnLFxuICAgICAgICByZXN1bHRzOiBlbW9qaXNGcm9tKGRhdGFiYXNlLmxpc3RBbGwoKSwgJycsIE9wdGlvbi5zb21lKDMwMCkpXG4gICAgICB9O1xuICAgICAgdmFyIGN1cnJlbnRUYWIgPSBDZWxsKEFMTF9DQVRFR09SWSk7XG4gICAgICB2YXIgc2NhbiA9IGZ1bmN0aW9uIChkaWFsb2dBcGkpIHtcbiAgICAgICAgdmFyIGRpYWxvZ0RhdGEgPSBkaWFsb2dBcGkuZ2V0RGF0YSgpO1xuICAgICAgICB2YXIgY2F0ZWdvcnkgPSBjdXJyZW50VGFiLmdldCgpO1xuICAgICAgICB2YXIgY2FuZGlkYXRlcyA9IGRhdGFiYXNlLmxpc3RDYXRlZ29yeShjYXRlZ29yeSk7XG4gICAgICAgIHZhciByZXN1bHRzID0gZW1vamlzRnJvbShjYW5kaWRhdGVzLCBkaWFsb2dEYXRhW3BhdHRlcm5OYW1lXSwgY2F0ZWdvcnkgPT09IEFMTF9DQVRFR09SWSA/IE9wdGlvbi5zb21lKDMwMCkgOiBPcHRpb24ubm9uZSgpKTtcbiAgICAgICAgZGlhbG9nQXBpLnNldERhdGEoeyByZXN1bHRzOiByZXN1bHRzIH0pO1xuICAgICAgfTtcbiAgICAgIHZhciB1cGRhdGVGaWx0ZXIgPSBsYXN0KGZ1bmN0aW9uIChkaWFsb2dBcGkpIHtcbiAgICAgICAgc2NhbihkaWFsb2dBcGkpO1xuICAgICAgfSwgMjAwKTtcbiAgICAgIHZhciBzZWFyY2hGaWVsZCA9IHtcbiAgICAgICAgbGFiZWw6ICdTZWFyY2gnLFxuICAgICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgICBuYW1lOiBwYXR0ZXJuTmFtZVxuICAgICAgfTtcbiAgICAgIHZhciByZXN1bHRzRmllbGQgPSB7XG4gICAgICAgIHR5cGU6ICdjb2xsZWN0aW9uJyxcbiAgICAgICAgbmFtZTogJ3Jlc3VsdHMnXG4gICAgICB9O1xuICAgICAgdmFyIGdldEluaXRpYWxTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGJvZHkgPSB7XG4gICAgICAgICAgdHlwZTogJ3RhYnBhbmVsJyxcbiAgICAgICAgICB0YWJzOiBtYXAoZGF0YWJhc2UubGlzdENhdGVnb3JpZXMoKSwgZnVuY3Rpb24gKGNhdCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgdGl0bGU6IGNhdCxcbiAgICAgICAgICAgICAgbmFtZTogY2F0LFxuICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgIHNlYXJjaEZpZWxkLFxuICAgICAgICAgICAgICAgIHJlc3VsdHNGaWVsZFxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGl0bGU6ICdFbW90aWNvbnMnLFxuICAgICAgICAgIHNpemU6ICdub3JtYWwnLFxuICAgICAgICAgIGJvZHk6IGJvZHksXG4gICAgICAgICAgaW5pdGlhbERhdGE6IGluaXRpYWxTdGF0ZSxcbiAgICAgICAgICBvblRhYkNoYW5nZTogZnVuY3Rpb24gKGRpYWxvZ0FwaSwgZGV0YWlscykge1xuICAgICAgICAgICAgY3VycmVudFRhYi5zZXQoZGV0YWlscy5uZXdUYWJOYW1lKTtcbiAgICAgICAgICAgIHVwZGF0ZUZpbHRlci50aHJvdHRsZShkaWFsb2dBcGkpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25DaGFuZ2U6IHVwZGF0ZUZpbHRlci50aHJvdHRsZSxcbiAgICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKGRpYWxvZ0FwaSwgYWN0aW9uRGF0YSkge1xuICAgICAgICAgICAgaWYgKGFjdGlvbkRhdGEubmFtZSA9PT0gJ3Jlc3VsdHMnKSB7XG4gICAgICAgICAgICAgIGluc2VydEVtb3RpY29uKGVkaXRvciwgYWN0aW9uRGF0YS52YWx1ZSk7XG4gICAgICAgICAgICAgIGRpYWxvZ0FwaS5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgYnV0dG9uczogW3tcbiAgICAgICAgICAgICAgdHlwZTogJ2NhbmNlbCcsXG4gICAgICAgICAgICAgIHRleHQ6ICdDbG9zZScsXG4gICAgICAgICAgICAgIHByaW1hcnk6IHRydWVcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH07XG4gICAgICB9O1xuICAgICAgdmFyIGRpYWxvZ0FwaSA9IGVkaXRvci53aW5kb3dNYW5hZ2VyLm9wZW4oZ2V0SW5pdGlhbFN0YXRlKCkpO1xuICAgICAgZGlhbG9nQXBpLmZvY3VzKHBhdHRlcm5OYW1lKTtcbiAgICAgIGlmICghZGF0YWJhc2UuaGFzTG9hZGVkKCkpIHtcbiAgICAgICAgZGlhbG9nQXBpLmJsb2NrKCdMb2FkaW5nIGVtb3RpY29ucy4uLicpO1xuICAgICAgICBkYXRhYmFzZS53YWl0Rm9yTG9hZCgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRpYWxvZ0FwaS5yZWRpYWwoZ2V0SW5pdGlhbFN0YXRlKCkpO1xuICAgICAgICAgIHVwZGF0ZUZpbHRlci50aHJvdHRsZShkaWFsb2dBcGkpO1xuICAgICAgICAgIGRpYWxvZ0FwaS5mb2N1cyhwYXR0ZXJuTmFtZSk7XG4gICAgICAgICAgZGlhbG9nQXBpLnVuYmxvY2soKTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKF9lcnIpIHtcbiAgICAgICAgICBkaWFsb2dBcGkucmVkaWFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAnRW1vdGljb25zJyxcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgdHlwZTogJ3BhbmVsJyxcbiAgICAgICAgICAgICAgaXRlbXM6IFt7XG4gICAgICAgICAgICAgICAgICB0eXBlOiAnYWxlcnRiYW5uZXInLFxuICAgICAgICAgICAgICAgICAgbGV2ZWw6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICBpY29uOiAnd2FybmluZycsXG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnPHA+Q291bGQgbm90IGxvYWQgZW1vdGljb25zPC9wPidcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJ1dHRvbnM6IFt7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2NhbmNlbCcsXG4gICAgICAgICAgICAgICAgdGV4dDogJ0Nsb3NlJyxcbiAgICAgICAgICAgICAgICBwcmltYXJ5OiB0cnVlXG4gICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgaW5pdGlhbERhdGE6IHtcbiAgICAgICAgICAgICAgcGF0dGVybjogJycsXG4gICAgICAgICAgICAgIHJlc3VsdHM6IFtdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZGlhbG9nQXBpLmZvY3VzKHBhdHRlcm5OYW1lKTtcbiAgICAgICAgICBkaWFsb2dBcGkudW5ibG9jaygpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIHJlZ2lzdGVyID0gZnVuY3Rpb24gKGVkaXRvciwgZGF0YWJhc2UpIHtcbiAgICAgIHZhciBvbkFjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG9wZW4oZWRpdG9yLCBkYXRhYmFzZSk7XG4gICAgICB9O1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZEJ1dHRvbignZW1vdGljb25zJywge1xuICAgICAgICB0b29sdGlwOiAnRW1vdGljb25zJyxcbiAgICAgICAgaWNvbjogJ2Vtb2ppJyxcbiAgICAgICAgb25BY3Rpb246IG9uQWN0aW9uXG4gICAgICB9KTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRNZW51SXRlbSgnZW1vdGljb25zJywge1xuICAgICAgICB0ZXh0OiAnRW1vdGljb25zLi4uJyxcbiAgICAgICAgaWNvbjogJ2Vtb2ppJyxcbiAgICAgICAgb25BY3Rpb246IG9uQWN0aW9uXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gUGx1Z2luICgpIHtcbiAgICAgIGdsb2JhbC5hZGQoJ2Vtb3RpY29ucycsIGZ1bmN0aW9uIChlZGl0b3IsIHBsdWdpblVybCkge1xuICAgICAgICB2YXIgZGF0YWJhc2VVcmwgPSBnZXRFbW90aWNvbkRhdGFiYXNlVXJsKGVkaXRvciwgcGx1Z2luVXJsKTtcbiAgICAgICAgdmFyIGRhdGFiYXNlSWQgPSBnZXRFbW90aWNvbkRhdGFiYXNlSWQoZWRpdG9yKTtcbiAgICAgICAgdmFyIGRhdGFiYXNlID0gaW5pdERhdGFiYXNlKGVkaXRvciwgZGF0YWJhc2VVcmwsIGRhdGFiYXNlSWQpO1xuICAgICAgICByZWdpc3RlcihlZGl0b3IsIGRhdGFiYXNlKTtcbiAgICAgICAgaW5pdChlZGl0b3IsIGRhdGFiYXNlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIFBsdWdpbigpO1xuXG59KHdpbmRvdykpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==