(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~tinymce-plugin-spellchecker~tinymce-plugin-spellchecker-plugin"],{

/***/ "./node_modules/tinymce/plugins/spellchecker/plugin.js":
/*!*************************************************************!*\
  !*** ./node_modules/tinymce/plugins/spellchecker/plugin.js ***!
  \*************************************************************/
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
      if (/(^|[ ,])tinymcespellchecker([, ]|$)/.test(editor.getParam('plugins')) && global.get('tinymcespellchecker')) {
        if (typeof domGlobals.window.console !== 'undefined' && domGlobals.window.console.log) {
          domGlobals.window.console.log('Spell Checker Pro is incompatible with Spell Checker plugin! ' + 'Remove \'spellchecker\' from the \'plugins\' option.');
        }
        return true;
      } else {
        return false;
      }
    };

    var hasOwnProperty = Object.hasOwnProperty;
    var isEmpty = function (r) {
      for (var x in r) {
        if (hasOwnProperty.call(r, x)) {
          return false;
        }
      }
      return true;
    };

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.URI');

    var global$3 = tinymce.util.Tools.resolve('tinymce.util.XHR');

    var fireSpellcheckStart = function (editor) {
      return editor.fire('SpellcheckStart');
    };
    var fireSpellcheckEnd = function (editor) {
      return editor.fire('SpellcheckEnd');
    };

    var getLanguages = function (editor) {
      var defaultLanguages = 'English=en,Danish=da,Dutch=nl,Finnish=fi,French=fr_FR,German=de,Italian=it,Polish=pl,Portuguese=pt_BR,Spanish=es,Swedish=sv';
      return editor.getParam('spellchecker_languages', defaultLanguages);
    };
    var getLanguage = function (editor) {
      var defaultLanguage = editor.getParam('language', 'en');
      return editor.getParam('spellchecker_language', defaultLanguage);
    };
    var getRpcUrl = function (editor) {
      return editor.getParam('spellchecker_rpc_url');
    };
    var getSpellcheckerCallback = function (editor) {
      return editor.getParam('spellchecker_callback');
    };
    var getSpellcheckerWordcharPattern = function (editor) {
      var defaultPattern = new RegExp('[^' + '\\s!"#$%&()*+,-./:;<=>?@[\\]^_{|}`' + '\xA7\xA9\xAB\xAE\xB1\xB6\xB7\xB8\xBB' + '\xBC\xBD\xBE\xBF\xD7\xF7\xA4\u201D\u201C\u201E\xA0\u2002\u2003\u2009' + ']+', 'g');
      return editor.getParam('spellchecker_wordchar_pattern', defaultPattern);
    };

    function isContentEditableFalse(node) {
      return node && node.nodeType === 1 && node.contentEditable === 'false';
    }
    var DomTextMatcher = function (node, editor) {
      var m, matches = [];
      var dom = editor.dom;
      var blockElementsMap = editor.schema.getBlockElements();
      var hiddenTextElementsMap = editor.schema.getWhiteSpaceElements();
      var shortEndedElementsMap = editor.schema.getShortEndedElements();
      function createMatch(m, data) {
        if (!m[0]) {
          throw new Error('findAndReplaceDOMText cannot handle zero-length matches');
        }
        return {
          start: m.index,
          end: m.index + m[0].length,
          text: m[0],
          data: data
        };
      }
      function getText(node) {
        var txt;
        if (node.nodeType === 3) {
          return node.data;
        }
        if (hiddenTextElementsMap[node.nodeName] && !blockElementsMap[node.nodeName]) {
          return '';
        }
        if (isContentEditableFalse(node)) {
          return '\n';
        }
        txt = '';
        if (blockElementsMap[node.nodeName] || shortEndedElementsMap[node.nodeName]) {
          txt += '\n';
        }
        if (node = node.firstChild) {
          do {
            txt += getText(node);
          } while (node = node.nextSibling);
        }
        return txt;
      }
      function stepThroughMatches(node, matches, replaceFn) {
        var startNode, endNode, startNodeIndex, endNodeIndex, innerNodes = [], atIndex = 0, curNode = node, matchLocation, matchIndex = 0;
        matches = matches.slice(0);
        matches.sort(function (a, b) {
          return a.start - b.start;
        });
        matchLocation = matches.shift();
        out:
          while (true) {
            if (blockElementsMap[curNode.nodeName] || shortEndedElementsMap[curNode.nodeName] || isContentEditableFalse(curNode)) {
              atIndex++;
            }
            if (curNode.nodeType === 3) {
              if (!endNode && curNode.length + atIndex >= matchLocation.end) {
                endNode = curNode;
                endNodeIndex = matchLocation.end - atIndex;
              } else if (startNode) {
                innerNodes.push(curNode);
              }
              if (!startNode && curNode.length + atIndex > matchLocation.start) {
                startNode = curNode;
                startNodeIndex = matchLocation.start - atIndex;
              }
              atIndex += curNode.length;
            }
            if (startNode && endNode) {
              curNode = replaceFn({
                startNode: startNode,
                startNodeIndex: startNodeIndex,
                endNode: endNode,
                endNodeIndex: endNodeIndex,
                innerNodes: innerNodes,
                match: matchLocation.text,
                matchIndex: matchIndex
              });
              atIndex -= endNode.length - endNodeIndex;
              startNode = null;
              endNode = null;
              innerNodes = [];
              matchLocation = matches.shift();
              matchIndex++;
              if (!matchLocation) {
                break;
              }
            } else if ((!hiddenTextElementsMap[curNode.nodeName] || blockElementsMap[curNode.nodeName]) && curNode.firstChild) {
              if (!isContentEditableFalse(curNode)) {
                curNode = curNode.firstChild;
                continue;
              }
            } else if (curNode.nextSibling) {
              curNode = curNode.nextSibling;
              continue;
            }
            while (true) {
              if (curNode.nextSibling) {
                curNode = curNode.nextSibling;
                break;
              } else if (curNode.parentNode !== node) {
                curNode = curNode.parentNode;
              } else {
                break out;
              }
            }
          }
      }
      function genReplacer(callback) {
        function makeReplacementNode(fill, matchIndex) {
          var match = matches[matchIndex];
          if (!match.stencil) {
            match.stencil = callback(match);
          }
          var clone = match.stencil.cloneNode(false);
          clone.setAttribute('data-mce-index', matchIndex);
          if (fill) {
            clone.appendChild(dom.doc.createTextNode(fill));
          }
          return clone;
        }
        return function (range) {
          var before;
          var after;
          var parentNode;
          var startNode = range.startNode;
          var endNode = range.endNode;
          var matchIndex = range.matchIndex;
          var doc = dom.doc;
          if (startNode === endNode) {
            var node_1 = startNode;
            parentNode = node_1.parentNode;
            if (range.startNodeIndex > 0) {
              before = doc.createTextNode(node_1.data.substring(0, range.startNodeIndex));
              parentNode.insertBefore(before, node_1);
            }
            var el = makeReplacementNode(range.match, matchIndex);
            parentNode.insertBefore(el, node_1);
            if (range.endNodeIndex < node_1.length) {
              after = doc.createTextNode(node_1.data.substring(range.endNodeIndex));
              parentNode.insertBefore(after, node_1);
            }
            node_1.parentNode.removeChild(node_1);
            return el;
          }
          before = doc.createTextNode(startNode.data.substring(0, range.startNodeIndex));
          after = doc.createTextNode(endNode.data.substring(range.endNodeIndex));
          var elA = makeReplacementNode(startNode.data.substring(range.startNodeIndex), matchIndex);
          for (var i = 0, l = range.innerNodes.length; i < l; ++i) {
            var innerNode = range.innerNodes[i];
            var innerEl = makeReplacementNode(innerNode.data, matchIndex);
            innerNode.parentNode.replaceChild(innerEl, innerNode);
          }
          var elB = makeReplacementNode(endNode.data.substring(0, range.endNodeIndex), matchIndex);
          parentNode = startNode.parentNode;
          parentNode.insertBefore(before, startNode);
          parentNode.insertBefore(elA, startNode);
          parentNode.removeChild(startNode);
          parentNode = endNode.parentNode;
          parentNode.insertBefore(elB, endNode);
          parentNode.insertBefore(after, endNode);
          parentNode.removeChild(endNode);
          return elB;
        };
      }
      function unwrapElement(element) {
        var parentNode = element.parentNode;
        while (element.childNodes.length > 0) {
          parentNode.insertBefore(element.childNodes[0], element);
        }
        parentNode.removeChild(element);
      }
      function hasClass(elm) {
        return elm.className.indexOf('mce-spellchecker-word') !== -1;
      }
      function getWrappersByIndex(index) {
        var elements = node.getElementsByTagName('*'), wrappers = [];
        index = typeof index === 'number' ? '' + index : null;
        for (var i = 0; i < elements.length; i++) {
          var element = elements[i], dataIndex = element.getAttribute('data-mce-index');
          if (dataIndex !== null && dataIndex.length && hasClass(element)) {
            if (dataIndex === index || index === null) {
              wrappers.push(element);
            }
          }
        }
        return wrappers;
      }
      function indexOf(match) {
        var i = matches.length;
        while (i--) {
          if (matches[i] === match) {
            return i;
          }
        }
        return -1;
      }
      function filter(callback) {
        var filteredMatches = [];
        each(function (match, i) {
          if (callback(match, i)) {
            filteredMatches.push(match);
          }
        });
        matches = filteredMatches;
        return this;
      }
      function each(callback) {
        for (var i = 0, l = matches.length; i < l; i++) {
          if (callback(matches[i], i) === false) {
            break;
          }
        }
        return this;
      }
      function wrap(callback) {
        if (matches.length) {
          stepThroughMatches(node, matches, genReplacer(callback));
        }
        return this;
      }
      function find(regex, data) {
        if (text && regex.global) {
          while (m = regex.exec(text)) {
            matches.push(createMatch(m, data));
          }
        }
        return this;
      }
      function unwrap(match) {
        var i;
        var elements = getWrappersByIndex(match ? indexOf(match) : null);
        i = elements.length;
        while (i--) {
          unwrapElement(elements[i]);
        }
        return this;
      }
      function matchFromElement(element) {
        return matches[element.getAttribute('data-mce-index')];
      }
      function elementFromMatch(match) {
        return getWrappersByIndex(indexOf(match))[0];
      }
      function add(start, length, data) {
        matches.push({
          start: start,
          end: start + length,
          text: text.substr(start, length),
          data: data
        });
        return this;
      }
      function rangeFromMatch(match) {
        var wrappers = getWrappersByIndex(indexOf(match));
        var rng = editor.dom.createRng();
        rng.setStartBefore(wrappers[0]);
        rng.setEndAfter(wrappers[wrappers.length - 1]);
        return rng;
      }
      function replace(match, text) {
        var rng = rangeFromMatch(match);
        rng.deleteContents();
        if (text.length > 0) {
          rng.insertNode(editor.dom.doc.createTextNode(text));
        }
        return rng;
      }
      function reset() {
        matches.splice(0, matches.length);
        unwrap();
        return this;
      }
      var text = getText(node);
      return {
        text: text,
        matches: matches,
        each: each,
        filter: filter,
        reset: reset,
        matchFromElement: matchFromElement,
        elementFromMatch: elementFromMatch,
        find: find,
        add: add,
        wrap: wrap,
        unwrap: unwrap,
        replace: replace,
        rangeFromMatch: rangeFromMatch,
        indexOf: indexOf
      };
    };

    var getTextMatcher = function (editor, textMatcherState) {
      if (!textMatcherState.get()) {
        var textMatcher = DomTextMatcher(editor.getBody(), editor);
        textMatcherState.set(textMatcher);
      }
      return textMatcherState.get();
    };
    var defaultSpellcheckCallback = function (editor, pluginUrl, currentLanguageState) {
      return function (method, text, doneCallback, errorCallback) {
        var data = {
          method: method,
          lang: currentLanguageState.get()
        };
        var postData = '';
        data[method === 'addToDictionary' ? 'word' : 'text'] = text;
        global$1.each(data, function (value, key) {
          if (postData) {
            postData += '&';
          }
          postData += key + '=' + encodeURIComponent(value);
        });
        global$3.send({
          url: new global$2(pluginUrl).toAbsolute(getRpcUrl(editor)),
          type: 'post',
          content_type: 'application/x-www-form-urlencoded',
          data: postData,
          success: function (result) {
            var parseResult = JSON.parse(result);
            if (!parseResult) {
              var message = editor.translate('Server response wasn\'t proper JSON.');
              errorCallback(message);
            } else if (parseResult.error) {
              errorCallback(parseResult.error);
            } else {
              doneCallback(parseResult);
            }
          },
          error: function () {
            var message = editor.translate('The spelling service was not found: (') + getRpcUrl(editor) + editor.translate(')');
            errorCallback(message);
          }
        });
      };
    };
    var sendRpcCall = function (editor, pluginUrl, currentLanguageState, name, data, successCallback, errorCallback) {
      var userSpellcheckCallback = getSpellcheckerCallback(editor);
      var spellCheckCallback = userSpellcheckCallback ? userSpellcheckCallback : defaultSpellcheckCallback(editor, pluginUrl, currentLanguageState);
      spellCheckCallback.call(editor.plugins.spellchecker, name, data, successCallback, errorCallback);
    };
    var spellcheck = function (editor, pluginUrl, startedState, textMatcherState, lastSuggestionsState, currentLanguageState) {
      if (finish(editor, startedState, textMatcherState)) {
        return;
      }
      var errorCallback = function (message) {
        editor.notificationManager.open({
          text: message,
          type: 'error'
        });
        editor.setProgressState(false);
        finish(editor, startedState, textMatcherState);
      };
      var successCallback = function (data) {
        markErrors(editor, startedState, textMatcherState, lastSuggestionsState, data);
      };
      editor.setProgressState(true);
      sendRpcCall(editor, pluginUrl, currentLanguageState, 'spellcheck', getTextMatcher(editor, textMatcherState).text, successCallback, errorCallback);
      editor.focus();
    };
    var checkIfFinished = function (editor, startedState, textMatcherState) {
      if (!editor.dom.select('span.mce-spellchecker-word').length) {
        finish(editor, startedState, textMatcherState);
      }
    };
    var addToDictionary = function (editor, pluginUrl, startedState, textMatcherState, currentLanguageState, word, spans) {
      editor.setProgressState(true);
      sendRpcCall(editor, pluginUrl, currentLanguageState, 'addToDictionary', word, function () {
        editor.setProgressState(false);
        editor.dom.remove(spans, true);
        checkIfFinished(editor, startedState, textMatcherState);
      }, function (message) {
        editor.notificationManager.open({
          text: message,
          type: 'error'
        });
        editor.setProgressState(false);
      });
    };
    var ignoreWord = function (editor, startedState, textMatcherState, word, spans, all) {
      editor.selection.collapse();
      if (all) {
        global$1.each(editor.dom.select('span.mce-spellchecker-word'), function (span) {
          if (span.getAttribute('data-mce-word') === word) {
            editor.dom.remove(span, true);
          }
        });
      } else {
        editor.dom.remove(spans, true);
      }
      checkIfFinished(editor, startedState, textMatcherState);
    };
    var finish = function (editor, startedState, textMatcherState) {
      var bookmark = editor.selection.getBookmark();
      getTextMatcher(editor, textMatcherState).reset();
      editor.selection.moveToBookmark(bookmark);
      textMatcherState.set(null);
      if (startedState.get()) {
        startedState.set(false);
        fireSpellcheckEnd(editor);
        return true;
      }
    };
    var getElmIndex = function (elm) {
      var value = elm.getAttribute('data-mce-index');
      if (typeof value === 'number') {
        return '' + value;
      }
      return value;
    };
    var findSpansByIndex = function (editor, index) {
      var spans = [];
      var nodes = global$1.toArray(editor.getBody().getElementsByTagName('span'));
      if (nodes.length) {
        for (var i = 0; i < nodes.length; i++) {
          var nodeIndex = getElmIndex(nodes[i]);
          if (nodeIndex === null || !nodeIndex.length) {
            continue;
          }
          if (nodeIndex === index.toString()) {
            spans.push(nodes[i]);
          }
        }
      }
      return spans;
    };
    var markErrors = function (editor, startedState, textMatcherState, lastSuggestionsState, data) {
      var hasDictionarySupport = !!data.dictionary;
      var suggestions = data.words;
      editor.setProgressState(false);
      if (isEmpty(suggestions)) {
        var message = editor.translate('No misspellings found.');
        editor.notificationManager.open({
          text: message,
          type: 'info'
        });
        startedState.set(false);
        return;
      }
      lastSuggestionsState.set({
        suggestions: suggestions,
        hasDictionarySupport: hasDictionarySupport
      });
      var bookmark = editor.selection.getBookmark();
      getTextMatcher(editor, textMatcherState).find(getSpellcheckerWordcharPattern(editor)).filter(function (match) {
        return !!suggestions[match.text];
      }).wrap(function (match) {
        return editor.dom.create('span', {
          'class': 'mce-spellchecker-word',
          'aria-invalid': 'spelling',
          'data-mce-bogus': 1,
          'data-mce-word': match.text
        });
      });
      editor.selection.moveToBookmark(bookmark);
      startedState.set(true);
      fireSpellcheckStart(editor);
    };

    var get = function (editor, startedState, lastSuggestionsState, textMatcherState, currentLanguageState, _url) {
      var getLanguage = function () {
        return currentLanguageState.get();
      };
      var getWordCharPattern = function () {
        return getSpellcheckerWordcharPattern(editor);
      };
      var markErrors$1 = function (data) {
        markErrors(editor, startedState, textMatcherState, lastSuggestionsState, data);
      };
      var getTextMatcher = function () {
        return textMatcherState.get();
      };
      return {
        getTextMatcher: getTextMatcher,
        getWordCharPattern: getWordCharPattern,
        markErrors: markErrors$1,
        getLanguage: getLanguage
      };
    };

    var register = function (editor, pluginUrl, startedState, textMatcherState, lastSuggestionsState, currentLanguageState) {
      editor.addCommand('mceSpellCheck', function () {
        spellcheck(editor, pluginUrl, startedState, textMatcherState, lastSuggestionsState, currentLanguageState);
      });
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

    var spellcheckerEvents = 'SpellcheckStart SpellcheckEnd';
    var buildMenuItems = function (listName, languageValues) {
      var items = [];
      global$1.each(languageValues, function (languageValue) {
        items.push({
          selectable: true,
          text: languageValue.name,
          data: languageValue.value
        });
      });
      return items;
    };
    var getItems = function (editor) {
      return global$1.map(getLanguages(editor).split(','), function (langPair) {
        langPair = langPair.split('=');
        return {
          name: langPair[0],
          value: langPair[1]
        };
      });
    };
    var register$1 = function (editor, pluginUrl, startedState, textMatcherState, currentLanguageState, lastSuggestionsState) {
      var languageMenuItems = buildMenuItems('Language', getItems(editor));
      var startSpellchecking = function () {
        spellcheck(editor, pluginUrl, startedState, textMatcherState, lastSuggestionsState, currentLanguageState);
      };
      var buttonArgs = {
        tooltip: 'Spellcheck',
        onAction: startSpellchecking,
        icon: 'spell-check',
        onSetup: function (buttonApi) {
          var setButtonState = function () {
            buttonApi.setActive(startedState.get());
          };
          editor.on(spellcheckerEvents, setButtonState);
          return function () {
            editor.off(spellcheckerEvents, setButtonState);
          };
        }
      };
      var splitButtonArgs = __assign(__assign({}, buttonArgs), {
        type: 'splitbutton',
        select: function (value) {
          return value === currentLanguageState.get();
        },
        fetch: function (callback) {
          var items = global$1.map(languageMenuItems, function (languageItem) {
            return {
              type: 'choiceitem',
              value: languageItem.data,
              text: languageItem.text
            };
          });
          callback(items);
        },
        onItemAction: function (splitButtonApi, value) {
          currentLanguageState.set(value);
        }
      });
      if (languageMenuItems.length > 1) {
        editor.ui.registry.addSplitButton('spellchecker', splitButtonArgs);
      } else {
        editor.ui.registry.addToggleButton('spellchecker', buttonArgs);
      }
      editor.ui.registry.addToggleMenuItem('spellchecker', {
        text: 'Spellcheck',
        icon: 'spell-check',
        onSetup: function (menuApi) {
          menuApi.setActive(startedState.get());
          var setMenuItemCheck = function () {
            menuApi.setActive(startedState.get());
          };
          editor.on(spellcheckerEvents, setMenuItemCheck);
          return function () {
            editor.off(spellcheckerEvents, setMenuItemCheck);
          };
        },
        onAction: startSpellchecking
      });
    };

    var ignoreAll = true;
    var getSuggestions = function (editor, pluginUrl, lastSuggestionsState, startedState, textMatcherState, currentLanguageState, word, spans) {
      var items = [];
      var suggestions = lastSuggestionsState.get().suggestions[word];
      global$1.each(suggestions, function (suggestion) {
        items.push({
          text: suggestion,
          onAction: function () {
            editor.insertContent(editor.dom.encode(suggestion));
            editor.dom.remove(spans);
            checkIfFinished(editor, startedState, textMatcherState);
          }
        });
      });
      var hasDictionarySupport = lastSuggestionsState.get().hasDictionarySupport;
      if (hasDictionarySupport) {
        items.push({ type: 'separator' });
        items.push({
          text: 'Add to dictionary',
          onAction: function () {
            addToDictionary(editor, pluginUrl, startedState, textMatcherState, currentLanguageState, word, spans);
          }
        });
      }
      items.push.apply(items, [
        { type: 'separator' },
        {
          text: 'Ignore',
          onAction: function () {
            ignoreWord(editor, startedState, textMatcherState, word, spans);
          }
        },
        {
          text: 'Ignore all',
          onAction: function () {
            ignoreWord(editor, startedState, textMatcherState, word, spans, ignoreAll);
          }
        }
      ]);
      return items;
    };
    var setup = function (editor, pluginUrl, lastSuggestionsState, startedState, textMatcherState, currentLanguageState) {
      var update = function (element) {
        var target = element;
        if (target.className === 'mce-spellchecker-word') {
          var spans = findSpansByIndex(editor, getElmIndex(target));
          if (spans.length > 0) {
            var rng = editor.dom.createRng();
            rng.setStartBefore(spans[0]);
            rng.setEndAfter(spans[spans.length - 1]);
            editor.selection.setRng(rng);
            return getSuggestions(editor, pluginUrl, lastSuggestionsState, startedState, textMatcherState, currentLanguageState, target.getAttribute('data-mce-word'), spans);
          }
        } else {
          return [];
        }
      };
      editor.ui.registry.addContextMenu('spellchecker', { update: update });
    };

    function Plugin () {
      global.add('spellchecker', function (editor, pluginUrl) {
        if (hasProPlugin(editor) === false) {
          var startedState = Cell(false);
          var currentLanguageState = Cell(getLanguage(editor));
          var textMatcherState = Cell(null);
          var lastSuggestionsState = Cell(null);
          register$1(editor, pluginUrl, startedState, textMatcherState, currentLanguageState, lastSuggestionsState);
          setup(editor, pluginUrl, lastSuggestionsState, startedState, textMatcherState, currentLanguageState);
          register(editor, pluginUrl, startedState, textMatcherState, lastSuggestionsState, currentLanguageState);
          return get(editor, startedState, lastSuggestionsState, textMatcherState, currentLanguageState);
        }
      });
    }

    Plugin();

}(window));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL3NwZWxsY2hlY2tlci9wbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRSxZQUFZLEVBQUU7QUFDL0U7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELE9BQU87QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixxQkFBcUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLE9BQU87QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQSxnREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0Esb0JBQW9CLG9CQUFvQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsaUJBQWlCO0FBQzFFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTs7QUFFQSxDQUFDIiwiZmlsZSI6InZlbmRvcnN+dGlueW1jZS1wbHVnaW4tc3BlbGxjaGVja2VyfnRpbnltY2UtcGx1Z2luLXNwZWxsY2hlY2tlci1wbHVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqXG4gKiBWZXJzaW9uOiA1LjQuMiAoMjAyMC0wOC0xNylcbiAqL1xuKGZ1bmN0aW9uIChkb21HbG9iYWxzKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIENlbGwgPSBmdW5jdGlvbiAoaW5pdGlhbCkge1xuICAgICAgdmFyIHZhbHVlID0gaW5pdGlhbDtcbiAgICAgIHZhciBnZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG4gICAgICB2YXIgc2V0ID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdmFsdWUgPSB2O1xuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGdldDogZ2V0LFxuICAgICAgICBzZXQ6IHNldFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIGdsb2JhbCA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLlBsdWdpbk1hbmFnZXInKTtcblxuICAgIHZhciBoYXNQcm9QbHVnaW4gPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBpZiAoLyhefFsgLF0pdGlueW1jZXNwZWxsY2hlY2tlcihbLCBdfCQpLy50ZXN0KGVkaXRvci5nZXRQYXJhbSgncGx1Z2lucycpKSAmJiBnbG9iYWwuZ2V0KCd0aW55bWNlc3BlbGxjaGVja2VyJykpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkb21HbG9iYWxzLndpbmRvdy5jb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBkb21HbG9iYWxzLndpbmRvdy5jb25zb2xlLmxvZykge1xuICAgICAgICAgIGRvbUdsb2JhbHMud2luZG93LmNvbnNvbGUubG9nKCdTcGVsbCBDaGVja2VyIFBybyBpcyBpbmNvbXBhdGlibGUgd2l0aCBTcGVsbCBDaGVja2VyIHBsdWdpbiEgJyArICdSZW1vdmUgXFwnc3BlbGxjaGVja2VyXFwnIGZyb20gdGhlIFxcJ3BsdWdpbnNcXCcgb3B0aW9uLicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QuaGFzT3duUHJvcGVydHk7XG4gICAgdmFyIGlzRW1wdHkgPSBmdW5jdGlvbiAocikge1xuICAgICAgZm9yICh2YXIgeCBpbiByKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHIsIHgpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgdmFyIGdsb2JhbCQxID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UudXRpbC5Ub29scycpO1xuXG4gICAgdmFyIGdsb2JhbCQyID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UudXRpbC5VUkknKTtcblxuICAgIHZhciBnbG9iYWwkMyA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuWEhSJyk7XG5cbiAgICB2YXIgZmlyZVNwZWxsY2hlY2tTdGFydCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZmlyZSgnU3BlbGxjaGVja1N0YXJ0Jyk7XG4gICAgfTtcbiAgICB2YXIgZmlyZVNwZWxsY2hlY2tFbmQgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmZpcmUoJ1NwZWxsY2hlY2tFbmQnKTtcbiAgICB9O1xuXG4gICAgdmFyIGdldExhbmd1YWdlcyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBkZWZhdWx0TGFuZ3VhZ2VzID0gJ0VuZ2xpc2g9ZW4sRGFuaXNoPWRhLER1dGNoPW5sLEZpbm5pc2g9ZmksRnJlbmNoPWZyX0ZSLEdlcm1hbj1kZSxJdGFsaWFuPWl0LFBvbGlzaD1wbCxQb3J0dWd1ZXNlPXB0X0JSLFNwYW5pc2g9ZXMsU3dlZGlzaD1zdic7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdzcGVsbGNoZWNrZXJfbGFuZ3VhZ2VzJywgZGVmYXVsdExhbmd1YWdlcyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0TGFuZ3VhZ2UgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgZGVmYXVsdExhbmd1YWdlID0gZWRpdG9yLmdldFBhcmFtKCdsYW5ndWFnZScsICdlbicpO1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnc3BlbGxjaGVja2VyX2xhbmd1YWdlJywgZGVmYXVsdExhbmd1YWdlKTtcbiAgICB9O1xuICAgIHZhciBnZXRScGNVcmwgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdzcGVsbGNoZWNrZXJfcnBjX3VybCcpO1xuICAgIH07XG4gICAgdmFyIGdldFNwZWxsY2hlY2tlckNhbGxiYWNrID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnc3BlbGxjaGVja2VyX2NhbGxiYWNrJyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0U3BlbGxjaGVja2VyV29yZGNoYXJQYXR0ZXJuID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGRlZmF1bHRQYXR0ZXJuID0gbmV3IFJlZ0V4cCgnW14nICsgJ1xcXFxzIVwiIyQlJigpKissLS4vOjs8PT4/QFtcXFxcXV5fe3x9YCcgKyAnXFx4QTdcXHhBOVxceEFCXFx4QUVcXHhCMVxceEI2XFx4QjdcXHhCOFxceEJCJyArICdcXHhCQ1xceEJEXFx4QkVcXHhCRlxceEQ3XFx4RjdcXHhBNFxcdTIwMURcXHUyMDFDXFx1MjAxRVxceEEwXFx1MjAwMlxcdTIwMDNcXHUyMDA5JyArICddKycsICdnJyk7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdzcGVsbGNoZWNrZXJfd29yZGNoYXJfcGF0dGVybicsIGRlZmF1bHRQYXR0ZXJuKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaXNDb250ZW50RWRpdGFibGVGYWxzZShub2RlKSB7XG4gICAgICByZXR1cm4gbm9kZSAmJiBub2RlLm5vZGVUeXBlID09PSAxICYmIG5vZGUuY29udGVudEVkaXRhYmxlID09PSAnZmFsc2UnO1xuICAgIH1cbiAgICB2YXIgRG9tVGV4dE1hdGNoZXIgPSBmdW5jdGlvbiAobm9kZSwgZWRpdG9yKSB7XG4gICAgICB2YXIgbSwgbWF0Y2hlcyA9IFtdO1xuICAgICAgdmFyIGRvbSA9IGVkaXRvci5kb207XG4gICAgICB2YXIgYmxvY2tFbGVtZW50c01hcCA9IGVkaXRvci5zY2hlbWEuZ2V0QmxvY2tFbGVtZW50cygpO1xuICAgICAgdmFyIGhpZGRlblRleHRFbGVtZW50c01hcCA9IGVkaXRvci5zY2hlbWEuZ2V0V2hpdGVTcGFjZUVsZW1lbnRzKCk7XG4gICAgICB2YXIgc2hvcnRFbmRlZEVsZW1lbnRzTWFwID0gZWRpdG9yLnNjaGVtYS5nZXRTaG9ydEVuZGVkRWxlbWVudHMoKTtcbiAgICAgIGZ1bmN0aW9uIGNyZWF0ZU1hdGNoKG0sIGRhdGEpIHtcbiAgICAgICAgaWYgKCFtWzBdKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdmaW5kQW5kUmVwbGFjZURPTVRleHQgY2Fubm90IGhhbmRsZSB6ZXJvLWxlbmd0aCBtYXRjaGVzJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzdGFydDogbS5pbmRleCxcbiAgICAgICAgICBlbmQ6IG0uaW5kZXggKyBtWzBdLmxlbmd0aCxcbiAgICAgICAgICB0ZXh0OiBtWzBdLFxuICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGdldFRleHQobm9kZSkge1xuICAgICAgICB2YXIgdHh0O1xuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICAgIHJldHVybiBub2RlLmRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhpZGRlblRleHRFbGVtZW50c01hcFtub2RlLm5vZGVOYW1lXSAmJiAhYmxvY2tFbGVtZW50c01hcFtub2RlLm5vZGVOYW1lXSkge1xuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNDb250ZW50RWRpdGFibGVGYWxzZShub2RlKSkge1xuICAgICAgICAgIHJldHVybiAnXFxuJztcbiAgICAgICAgfVxuICAgICAgICB0eHQgPSAnJztcbiAgICAgICAgaWYgKGJsb2NrRWxlbWVudHNNYXBbbm9kZS5ub2RlTmFtZV0gfHwgc2hvcnRFbmRlZEVsZW1lbnRzTWFwW25vZGUubm9kZU5hbWVdKSB7XG4gICAgICAgICAgdHh0ICs9ICdcXG4nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlID0gbm9kZS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgZG8ge1xuICAgICAgICAgICAgdHh0ICs9IGdldFRleHQobm9kZSk7XG4gICAgICAgICAgfSB3aGlsZSAobm9kZSA9IG5vZGUubmV4dFNpYmxpbmcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eHQ7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBzdGVwVGhyb3VnaE1hdGNoZXMobm9kZSwgbWF0Y2hlcywgcmVwbGFjZUZuKSB7XG4gICAgICAgIHZhciBzdGFydE5vZGUsIGVuZE5vZGUsIHN0YXJ0Tm9kZUluZGV4LCBlbmROb2RlSW5kZXgsIGlubmVyTm9kZXMgPSBbXSwgYXRJbmRleCA9IDAsIGN1ck5vZGUgPSBub2RlLCBtYXRjaExvY2F0aW9uLCBtYXRjaEluZGV4ID0gMDtcbiAgICAgICAgbWF0Y2hlcyA9IG1hdGNoZXMuc2xpY2UoMCk7XG4gICAgICAgIG1hdGNoZXMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgIHJldHVybiBhLnN0YXJ0IC0gYi5zdGFydDtcbiAgICAgICAgfSk7XG4gICAgICAgIG1hdGNoTG9jYXRpb24gPSBtYXRjaGVzLnNoaWZ0KCk7XG4gICAgICAgIG91dDpcbiAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgaWYgKGJsb2NrRWxlbWVudHNNYXBbY3VyTm9kZS5ub2RlTmFtZV0gfHwgc2hvcnRFbmRlZEVsZW1lbnRzTWFwW2N1ck5vZGUubm9kZU5hbWVdIHx8IGlzQ29udGVudEVkaXRhYmxlRmFsc2UoY3VyTm9kZSkpIHtcbiAgICAgICAgICAgICAgYXRJbmRleCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGN1ck5vZGUubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgICAgICAgaWYgKCFlbmROb2RlICYmIGN1ck5vZGUubGVuZ3RoICsgYXRJbmRleCA+PSBtYXRjaExvY2F0aW9uLmVuZCkge1xuICAgICAgICAgICAgICAgIGVuZE5vZGUgPSBjdXJOb2RlO1xuICAgICAgICAgICAgICAgIGVuZE5vZGVJbmRleCA9IG1hdGNoTG9jYXRpb24uZW5kIC0gYXRJbmRleDtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGFydE5vZGUpIHtcbiAgICAgICAgICAgICAgICBpbm5lck5vZGVzLnB1c2goY3VyTm9kZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFzdGFydE5vZGUgJiYgY3VyTm9kZS5sZW5ndGggKyBhdEluZGV4ID4gbWF0Y2hMb2NhdGlvbi5zdGFydCkge1xuICAgICAgICAgICAgICAgIHN0YXJ0Tm9kZSA9IGN1ck5vZGU7XG4gICAgICAgICAgICAgICAgc3RhcnROb2RlSW5kZXggPSBtYXRjaExvY2F0aW9uLnN0YXJ0IC0gYXRJbmRleDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBhdEluZGV4ICs9IGN1ck5vZGUubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0YXJ0Tm9kZSAmJiBlbmROb2RlKSB7XG4gICAgICAgICAgICAgIGN1ck5vZGUgPSByZXBsYWNlRm4oe1xuICAgICAgICAgICAgICAgIHN0YXJ0Tm9kZTogc3RhcnROb2RlLFxuICAgICAgICAgICAgICAgIHN0YXJ0Tm9kZUluZGV4OiBzdGFydE5vZGVJbmRleCxcbiAgICAgICAgICAgICAgICBlbmROb2RlOiBlbmROb2RlLFxuICAgICAgICAgICAgICAgIGVuZE5vZGVJbmRleDogZW5kTm9kZUluZGV4LFxuICAgICAgICAgICAgICAgIGlubmVyTm9kZXM6IGlubmVyTm9kZXMsXG4gICAgICAgICAgICAgICAgbWF0Y2g6IG1hdGNoTG9jYXRpb24udGV4dCxcbiAgICAgICAgICAgICAgICBtYXRjaEluZGV4OiBtYXRjaEluZGV4XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBhdEluZGV4IC09IGVuZE5vZGUubGVuZ3RoIC0gZW5kTm9kZUluZGV4O1xuICAgICAgICAgICAgICBzdGFydE5vZGUgPSBudWxsO1xuICAgICAgICAgICAgICBlbmROb2RlID0gbnVsbDtcbiAgICAgICAgICAgICAgaW5uZXJOb2RlcyA9IFtdO1xuICAgICAgICAgICAgICBtYXRjaExvY2F0aW9uID0gbWF0Y2hlcy5zaGlmdCgpO1xuICAgICAgICAgICAgICBtYXRjaEluZGV4Kys7XG4gICAgICAgICAgICAgIGlmICghbWF0Y2hMb2NhdGlvbikge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCghaGlkZGVuVGV4dEVsZW1lbnRzTWFwW2N1ck5vZGUubm9kZU5hbWVdIHx8IGJsb2NrRWxlbWVudHNNYXBbY3VyTm9kZS5ub2RlTmFtZV0pICYmIGN1ck5vZGUuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICBpZiAoIWlzQ29udGVudEVkaXRhYmxlRmFsc2UoY3VyTm9kZSkpIHtcbiAgICAgICAgICAgICAgICBjdXJOb2RlID0gY3VyTm9kZS5maXJzdENoaWxkO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1ck5vZGUubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgY3VyTm9kZSA9IGN1ck5vZGUubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgICAgaWYgKGN1ck5vZGUubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICBjdXJOb2RlID0gY3VyTm9kZS5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJOb2RlLnBhcmVudE5vZGUgIT09IG5vZGUpIHtcbiAgICAgICAgICAgICAgICBjdXJOb2RlID0gY3VyTm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJyZWFrIG91dDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGdlblJlcGxhY2VyKGNhbGxiYWNrKSB7XG4gICAgICAgIGZ1bmN0aW9uIG1ha2VSZXBsYWNlbWVudE5vZGUoZmlsbCwgbWF0Y2hJbmRleCkge1xuICAgICAgICAgIHZhciBtYXRjaCA9IG1hdGNoZXNbbWF0Y2hJbmRleF07XG4gICAgICAgICAgaWYgKCFtYXRjaC5zdGVuY2lsKSB7XG4gICAgICAgICAgICBtYXRjaC5zdGVuY2lsID0gY2FsbGJhY2sobWF0Y2gpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgY2xvbmUgPSBtYXRjaC5zdGVuY2lsLmNsb25lTm9kZShmYWxzZSk7XG4gICAgICAgICAgY2xvbmUuc2V0QXR0cmlidXRlKCdkYXRhLW1jZS1pbmRleCcsIG1hdGNoSW5kZXgpO1xuICAgICAgICAgIGlmIChmaWxsKSB7XG4gICAgICAgICAgICBjbG9uZS5hcHBlbmRDaGlsZChkb20uZG9jLmNyZWF0ZVRleHROb2RlKGZpbGwpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGNsb25lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgICAgICAgICB2YXIgYmVmb3JlO1xuICAgICAgICAgIHZhciBhZnRlcjtcbiAgICAgICAgICB2YXIgcGFyZW50Tm9kZTtcbiAgICAgICAgICB2YXIgc3RhcnROb2RlID0gcmFuZ2Uuc3RhcnROb2RlO1xuICAgICAgICAgIHZhciBlbmROb2RlID0gcmFuZ2UuZW5kTm9kZTtcbiAgICAgICAgICB2YXIgbWF0Y2hJbmRleCA9IHJhbmdlLm1hdGNoSW5kZXg7XG4gICAgICAgICAgdmFyIGRvYyA9IGRvbS5kb2M7XG4gICAgICAgICAgaWYgKHN0YXJ0Tm9kZSA9PT0gZW5kTm9kZSkge1xuICAgICAgICAgICAgdmFyIG5vZGVfMSA9IHN0YXJ0Tm9kZTtcbiAgICAgICAgICAgIHBhcmVudE5vZGUgPSBub2RlXzEucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIGlmIChyYW5nZS5zdGFydE5vZGVJbmRleCA+IDApIHtcbiAgICAgICAgICAgICAgYmVmb3JlID0gZG9jLmNyZWF0ZVRleHROb2RlKG5vZGVfMS5kYXRhLnN1YnN0cmluZygwLCByYW5nZS5zdGFydE5vZGVJbmRleCkpO1xuICAgICAgICAgICAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShiZWZvcmUsIG5vZGVfMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZWwgPSBtYWtlUmVwbGFjZW1lbnROb2RlKHJhbmdlLm1hdGNoLCBtYXRjaEluZGV4KTtcbiAgICAgICAgICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsLCBub2RlXzEpO1xuICAgICAgICAgICAgaWYgKHJhbmdlLmVuZE5vZGVJbmRleCA8IG5vZGVfMS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgYWZ0ZXIgPSBkb2MuY3JlYXRlVGV4dE5vZGUobm9kZV8xLmRhdGEuc3Vic3RyaW5nKHJhbmdlLmVuZE5vZGVJbmRleCkpO1xuICAgICAgICAgICAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShhZnRlciwgbm9kZV8xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGVfMS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGVfMSk7XG4gICAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJlZm9yZSA9IGRvYy5jcmVhdGVUZXh0Tm9kZShzdGFydE5vZGUuZGF0YS5zdWJzdHJpbmcoMCwgcmFuZ2Uuc3RhcnROb2RlSW5kZXgpKTtcbiAgICAgICAgICBhZnRlciA9IGRvYy5jcmVhdGVUZXh0Tm9kZShlbmROb2RlLmRhdGEuc3Vic3RyaW5nKHJhbmdlLmVuZE5vZGVJbmRleCkpO1xuICAgICAgICAgIHZhciBlbEEgPSBtYWtlUmVwbGFjZW1lbnROb2RlKHN0YXJ0Tm9kZS5kYXRhLnN1YnN0cmluZyhyYW5nZS5zdGFydE5vZGVJbmRleCksIG1hdGNoSW5kZXgpO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gcmFuZ2UuaW5uZXJOb2Rlcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBpbm5lck5vZGUgPSByYW5nZS5pbm5lck5vZGVzW2ldO1xuICAgICAgICAgICAgdmFyIGlubmVyRWwgPSBtYWtlUmVwbGFjZW1lbnROb2RlKGlubmVyTm9kZS5kYXRhLCBtYXRjaEluZGV4KTtcbiAgICAgICAgICAgIGlubmVyTm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChpbm5lckVsLCBpbm5lck5vZGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgZWxCID0gbWFrZVJlcGxhY2VtZW50Tm9kZShlbmROb2RlLmRhdGEuc3Vic3RyaW5nKDAsIHJhbmdlLmVuZE5vZGVJbmRleCksIG1hdGNoSW5kZXgpO1xuICAgICAgICAgIHBhcmVudE5vZGUgPSBzdGFydE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShiZWZvcmUsIHN0YXJ0Tm9kZSk7XG4gICAgICAgICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZWxBLCBzdGFydE5vZGUpO1xuICAgICAgICAgIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3RhcnROb2RlKTtcbiAgICAgICAgICBwYXJlbnROb2RlID0gZW5kTm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsQiwgZW5kTm9kZSk7XG4gICAgICAgICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYWZ0ZXIsIGVuZE5vZGUpO1xuICAgICAgICAgIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZW5kTm9kZSk7XG4gICAgICAgICAgcmV0dXJuIGVsQjtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIHVud3JhcEVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICB2YXIgcGFyZW50Tm9kZSA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZWxlbWVudC5jaGlsZE5vZGVzWzBdLCBlbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gaGFzQ2xhc3MoZWxtKSB7XG4gICAgICAgIHJldHVybiBlbG0uY2xhc3NOYW1lLmluZGV4T2YoJ21jZS1zcGVsbGNoZWNrZXItd29yZCcpICE9PSAtMTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGdldFdyYXBwZXJzQnlJbmRleChpbmRleCkge1xuICAgICAgICB2YXIgZWxlbWVudHMgPSBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCcqJyksIHdyYXBwZXJzID0gW107XG4gICAgICAgIGluZGV4ID0gdHlwZW9mIGluZGV4ID09PSAnbnVtYmVyJyA/ICcnICsgaW5kZXggOiBudWxsO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGVsZW1lbnQgPSBlbGVtZW50c1tpXSwgZGF0YUluZGV4ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWNlLWluZGV4Jyk7XG4gICAgICAgICAgaWYgKGRhdGFJbmRleCAhPT0gbnVsbCAmJiBkYXRhSW5kZXgubGVuZ3RoICYmIGhhc0NsYXNzKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICBpZiAoZGF0YUluZGV4ID09PSBpbmRleCB8fCBpbmRleCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICB3cmFwcGVycy5wdXNoKGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gd3JhcHBlcnM7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBpbmRleE9mKG1hdGNoKSB7XG4gICAgICAgIHZhciBpID0gbWF0Y2hlcy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICBpZiAobWF0Y2hlc1tpXSA9PT0gbWF0Y2gpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBmaWx0ZXIoY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGZpbHRlcmVkTWF0Y2hlcyA9IFtdO1xuICAgICAgICBlYWNoKGZ1bmN0aW9uIChtYXRjaCwgaSkge1xuICAgICAgICAgIGlmIChjYWxsYmFjayhtYXRjaCwgaSkpIHtcbiAgICAgICAgICAgIGZpbHRlcmVkTWF0Y2hlcy5wdXNoKG1hdGNoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBtYXRjaGVzID0gZmlsdGVyZWRNYXRjaGVzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGVhY2goY2FsbGJhY2spIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBtYXRjaGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIGlmIChjYWxsYmFjayhtYXRjaGVzW2ldLCBpKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIHdyYXAoY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKG1hdGNoZXMubGVuZ3RoKSB7XG4gICAgICAgICAgc3RlcFRocm91Z2hNYXRjaGVzKG5vZGUsIG1hdGNoZXMsIGdlblJlcGxhY2VyKGNhbGxiYWNrKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBmaW5kKHJlZ2V4LCBkYXRhKSB7XG4gICAgICAgIGlmICh0ZXh0ICYmIHJlZ2V4Lmdsb2JhbCkge1xuICAgICAgICAgIHdoaWxlIChtID0gcmVnZXguZXhlYyh0ZXh0KSkge1xuICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKGNyZWF0ZU1hdGNoKG0sIGRhdGEpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiB1bndyYXAobWF0Y2gpIHtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHZhciBlbGVtZW50cyA9IGdldFdyYXBwZXJzQnlJbmRleChtYXRjaCA/IGluZGV4T2YobWF0Y2gpIDogbnVsbCk7XG4gICAgICAgIGkgPSBlbGVtZW50cy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICB1bndyYXBFbGVtZW50KGVsZW1lbnRzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIG1hdGNoRnJvbUVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gbWF0Y2hlc1tlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1tY2UtaW5kZXgnKV07XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBlbGVtZW50RnJvbU1hdGNoKG1hdGNoKSB7XG4gICAgICAgIHJldHVybiBnZXRXcmFwcGVyc0J5SW5kZXgoaW5kZXhPZihtYXRjaCkpWzBdO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gYWRkKHN0YXJ0LCBsZW5ndGgsIGRhdGEpIHtcbiAgICAgICAgbWF0Y2hlcy5wdXNoKHtcbiAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgZW5kOiBzdGFydCArIGxlbmd0aCxcbiAgICAgICAgICB0ZXh0OiB0ZXh0LnN1YnN0cihzdGFydCwgbGVuZ3RoKSxcbiAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIHJhbmdlRnJvbU1hdGNoKG1hdGNoKSB7XG4gICAgICAgIHZhciB3cmFwcGVycyA9IGdldFdyYXBwZXJzQnlJbmRleChpbmRleE9mKG1hdGNoKSk7XG4gICAgICAgIHZhciBybmcgPSBlZGl0b3IuZG9tLmNyZWF0ZVJuZygpO1xuICAgICAgICBybmcuc2V0U3RhcnRCZWZvcmUod3JhcHBlcnNbMF0pO1xuICAgICAgICBybmcuc2V0RW5kQWZ0ZXIod3JhcHBlcnNbd3JhcHBlcnMubGVuZ3RoIC0gMV0pO1xuICAgICAgICByZXR1cm4gcm5nO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gcmVwbGFjZShtYXRjaCwgdGV4dCkge1xuICAgICAgICB2YXIgcm5nID0gcmFuZ2VGcm9tTWF0Y2gobWF0Y2gpO1xuICAgICAgICBybmcuZGVsZXRlQ29udGVudHMoKTtcbiAgICAgICAgaWYgKHRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJuZy5pbnNlcnROb2RlKGVkaXRvci5kb20uZG9jLmNyZWF0ZVRleHROb2RlKHRleHQpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcm5nO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgIG1hdGNoZXMuc3BsaWNlKDAsIG1hdGNoZXMubGVuZ3RoKTtcbiAgICAgICAgdW53cmFwKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgdmFyIHRleHQgPSBnZXRUZXh0KG5vZGUpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgbWF0Y2hlczogbWF0Y2hlcyxcbiAgICAgICAgZWFjaDogZWFjaCxcbiAgICAgICAgZmlsdGVyOiBmaWx0ZXIsXG4gICAgICAgIHJlc2V0OiByZXNldCxcbiAgICAgICAgbWF0Y2hGcm9tRWxlbWVudDogbWF0Y2hGcm9tRWxlbWVudCxcbiAgICAgICAgZWxlbWVudEZyb21NYXRjaDogZWxlbWVudEZyb21NYXRjaCxcbiAgICAgICAgZmluZDogZmluZCxcbiAgICAgICAgYWRkOiBhZGQsXG4gICAgICAgIHdyYXA6IHdyYXAsXG4gICAgICAgIHVud3JhcDogdW53cmFwLFxuICAgICAgICByZXBsYWNlOiByZXBsYWNlLFxuICAgICAgICByYW5nZUZyb21NYXRjaDogcmFuZ2VGcm9tTWF0Y2gsXG4gICAgICAgIGluZGV4T2Y6IGluZGV4T2ZcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciBnZXRUZXh0TWF0Y2hlciA9IGZ1bmN0aW9uIChlZGl0b3IsIHRleHRNYXRjaGVyU3RhdGUpIHtcbiAgICAgIGlmICghdGV4dE1hdGNoZXJTdGF0ZS5nZXQoKSkge1xuICAgICAgICB2YXIgdGV4dE1hdGNoZXIgPSBEb21UZXh0TWF0Y2hlcihlZGl0b3IuZ2V0Qm9keSgpLCBlZGl0b3IpO1xuICAgICAgICB0ZXh0TWF0Y2hlclN0YXRlLnNldCh0ZXh0TWF0Y2hlcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGV4dE1hdGNoZXJTdGF0ZS5nZXQoKTtcbiAgICB9O1xuICAgIHZhciBkZWZhdWx0U3BlbGxjaGVja0NhbGxiYWNrID0gZnVuY3Rpb24gKGVkaXRvciwgcGx1Z2luVXJsLCBjdXJyZW50TGFuZ3VhZ2VTdGF0ZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtZXRob2QsIHRleHQsIGRvbmVDYWxsYmFjaywgZXJyb3JDYWxsYmFjaykge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICBsYW5nOiBjdXJyZW50TGFuZ3VhZ2VTdGF0ZS5nZXQoKVxuICAgICAgICB9O1xuICAgICAgICB2YXIgcG9zdERhdGEgPSAnJztcbiAgICAgICAgZGF0YVttZXRob2QgPT09ICdhZGRUb0RpY3Rpb25hcnknID8gJ3dvcmQnIDogJ3RleHQnXSA9IHRleHQ7XG4gICAgICAgIGdsb2JhbCQxLmVhY2goZGF0YSwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICBpZiAocG9zdERhdGEpIHtcbiAgICAgICAgICAgIHBvc3REYXRhICs9ICcmJztcbiAgICAgICAgICB9XG4gICAgICAgICAgcG9zdERhdGEgKz0ga2V5ICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGdsb2JhbCQzLnNlbmQoe1xuICAgICAgICAgIHVybDogbmV3IGdsb2JhbCQyKHBsdWdpblVybCkudG9BYnNvbHV0ZShnZXRScGNVcmwoZWRpdG9yKSksXG4gICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgIGNvbnRlbnRfdHlwZTogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgICAgICAgZGF0YTogcG9zdERhdGEsXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgdmFyIHBhcnNlUmVzdWx0ID0gSlNPTi5wYXJzZShyZXN1bHQpO1xuICAgICAgICAgICAgaWYgKCFwYXJzZVJlc3VsdCkge1xuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGVkaXRvci50cmFuc2xhdGUoJ1NlcnZlciByZXNwb25zZSB3YXNuXFwndCBwcm9wZXIgSlNPTi4nKTtcbiAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhtZXNzYWdlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyc2VSZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhwYXJzZVJlc3VsdC5lcnJvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkb25lQ2FsbGJhY2socGFyc2VSZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gZWRpdG9yLnRyYW5zbGF0ZSgnVGhlIHNwZWxsaW5nIHNlcnZpY2Ugd2FzIG5vdCBmb3VuZDogKCcpICsgZ2V0UnBjVXJsKGVkaXRvcikgKyBlZGl0b3IudHJhbnNsYXRlKCcpJyk7XG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrKG1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHNlbmRScGNDYWxsID0gZnVuY3Rpb24gKGVkaXRvciwgcGx1Z2luVXJsLCBjdXJyZW50TGFuZ3VhZ2VTdGF0ZSwgbmFtZSwgZGF0YSwgc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrKSB7XG4gICAgICB2YXIgdXNlclNwZWxsY2hlY2tDYWxsYmFjayA9IGdldFNwZWxsY2hlY2tlckNhbGxiYWNrKGVkaXRvcik7XG4gICAgICB2YXIgc3BlbGxDaGVja0NhbGxiYWNrID0gdXNlclNwZWxsY2hlY2tDYWxsYmFjayA/IHVzZXJTcGVsbGNoZWNrQ2FsbGJhY2sgOiBkZWZhdWx0U3BlbGxjaGVja0NhbGxiYWNrKGVkaXRvciwgcGx1Z2luVXJsLCBjdXJyZW50TGFuZ3VhZ2VTdGF0ZSk7XG4gICAgICBzcGVsbENoZWNrQ2FsbGJhY2suY2FsbChlZGl0b3IucGx1Z2lucy5zcGVsbGNoZWNrZXIsIG5hbWUsIGRhdGEsIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjayk7XG4gICAgfTtcbiAgICB2YXIgc3BlbGxjaGVjayA9IGZ1bmN0aW9uIChlZGl0b3IsIHBsdWdpblVybCwgc3RhcnRlZFN0YXRlLCB0ZXh0TWF0Y2hlclN0YXRlLCBsYXN0U3VnZ2VzdGlvbnNTdGF0ZSwgY3VycmVudExhbmd1YWdlU3RhdGUpIHtcbiAgICAgIGlmIChmaW5pc2goZWRpdG9yLCBzdGFydGVkU3RhdGUsIHRleHRNYXRjaGVyU3RhdGUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBlcnJvckNhbGxiYWNrID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgZWRpdG9yLm5vdGlmaWNhdGlvbk1hbmFnZXIub3Blbih7XG4gICAgICAgICAgdGV4dDogbWVzc2FnZSxcbiAgICAgICAgICB0eXBlOiAnZXJyb3InXG4gICAgICAgIH0pO1xuICAgICAgICBlZGl0b3Iuc2V0UHJvZ3Jlc3NTdGF0ZShmYWxzZSk7XG4gICAgICAgIGZpbmlzaChlZGl0b3IsIHN0YXJ0ZWRTdGF0ZSwgdGV4dE1hdGNoZXJTdGF0ZSk7XG4gICAgICB9O1xuICAgICAgdmFyIHN1Y2Nlc3NDYWxsYmFjayA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIG1hcmtFcnJvcnMoZWRpdG9yLCBzdGFydGVkU3RhdGUsIHRleHRNYXRjaGVyU3RhdGUsIGxhc3RTdWdnZXN0aW9uc1N0YXRlLCBkYXRhKTtcbiAgICAgIH07XG4gICAgICBlZGl0b3Iuc2V0UHJvZ3Jlc3NTdGF0ZSh0cnVlKTtcbiAgICAgIHNlbmRScGNDYWxsKGVkaXRvciwgcGx1Z2luVXJsLCBjdXJyZW50TGFuZ3VhZ2VTdGF0ZSwgJ3NwZWxsY2hlY2snLCBnZXRUZXh0TWF0Y2hlcihlZGl0b3IsIHRleHRNYXRjaGVyU3RhdGUpLnRleHQsIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjayk7XG4gICAgICBlZGl0b3IuZm9jdXMoKTtcbiAgICB9O1xuICAgIHZhciBjaGVja0lmRmluaXNoZWQgPSBmdW5jdGlvbiAoZWRpdG9yLCBzdGFydGVkU3RhdGUsIHRleHRNYXRjaGVyU3RhdGUpIHtcbiAgICAgIGlmICghZWRpdG9yLmRvbS5zZWxlY3QoJ3NwYW4ubWNlLXNwZWxsY2hlY2tlci13b3JkJykubGVuZ3RoKSB7XG4gICAgICAgIGZpbmlzaChlZGl0b3IsIHN0YXJ0ZWRTdGF0ZSwgdGV4dE1hdGNoZXJTdGF0ZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgYWRkVG9EaWN0aW9uYXJ5ID0gZnVuY3Rpb24gKGVkaXRvciwgcGx1Z2luVXJsLCBzdGFydGVkU3RhdGUsIHRleHRNYXRjaGVyU3RhdGUsIGN1cnJlbnRMYW5ndWFnZVN0YXRlLCB3b3JkLCBzcGFucykge1xuICAgICAgZWRpdG9yLnNldFByb2dyZXNzU3RhdGUodHJ1ZSk7XG4gICAgICBzZW5kUnBjQ2FsbChlZGl0b3IsIHBsdWdpblVybCwgY3VycmVudExhbmd1YWdlU3RhdGUsICdhZGRUb0RpY3Rpb25hcnknLCB3b3JkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGVkaXRvci5zZXRQcm9ncmVzc1N0YXRlKGZhbHNlKTtcbiAgICAgICAgZWRpdG9yLmRvbS5yZW1vdmUoc3BhbnMsIHRydWUpO1xuICAgICAgICBjaGVja0lmRmluaXNoZWQoZWRpdG9yLCBzdGFydGVkU3RhdGUsIHRleHRNYXRjaGVyU3RhdGUpO1xuICAgICAgfSwgZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgZWRpdG9yLm5vdGlmaWNhdGlvbk1hbmFnZXIub3Blbih7XG4gICAgICAgICAgdGV4dDogbWVzc2FnZSxcbiAgICAgICAgICB0eXBlOiAnZXJyb3InXG4gICAgICAgIH0pO1xuICAgICAgICBlZGl0b3Iuc2V0UHJvZ3Jlc3NTdGF0ZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBpZ25vcmVXb3JkID0gZnVuY3Rpb24gKGVkaXRvciwgc3RhcnRlZFN0YXRlLCB0ZXh0TWF0Y2hlclN0YXRlLCB3b3JkLCBzcGFucywgYWxsKSB7XG4gICAgICBlZGl0b3Iuc2VsZWN0aW9uLmNvbGxhcHNlKCk7XG4gICAgICBpZiAoYWxsKSB7XG4gICAgICAgIGdsb2JhbCQxLmVhY2goZWRpdG9yLmRvbS5zZWxlY3QoJ3NwYW4ubWNlLXNwZWxsY2hlY2tlci13b3JkJyksIGZ1bmN0aW9uIChzcGFuKSB7XG4gICAgICAgICAgaWYgKHNwYW4uZ2V0QXR0cmlidXRlKCdkYXRhLW1jZS13b3JkJykgPT09IHdvcmQpIHtcbiAgICAgICAgICAgIGVkaXRvci5kb20ucmVtb3ZlKHNwYW4sIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlZGl0b3IuZG9tLnJlbW92ZShzcGFucywgdHJ1ZSk7XG4gICAgICB9XG4gICAgICBjaGVja0lmRmluaXNoZWQoZWRpdG9yLCBzdGFydGVkU3RhdGUsIHRleHRNYXRjaGVyU3RhdGUpO1xuICAgIH07XG4gICAgdmFyIGZpbmlzaCA9IGZ1bmN0aW9uIChlZGl0b3IsIHN0YXJ0ZWRTdGF0ZSwgdGV4dE1hdGNoZXJTdGF0ZSkge1xuICAgICAgdmFyIGJvb2ttYXJrID0gZWRpdG9yLnNlbGVjdGlvbi5nZXRCb29rbWFyaygpO1xuICAgICAgZ2V0VGV4dE1hdGNoZXIoZWRpdG9yLCB0ZXh0TWF0Y2hlclN0YXRlKS5yZXNldCgpO1xuICAgICAgZWRpdG9yLnNlbGVjdGlvbi5tb3ZlVG9Cb29rbWFyayhib29rbWFyayk7XG4gICAgICB0ZXh0TWF0Y2hlclN0YXRlLnNldChudWxsKTtcbiAgICAgIGlmIChzdGFydGVkU3RhdGUuZ2V0KCkpIHtcbiAgICAgICAgc3RhcnRlZFN0YXRlLnNldChmYWxzZSk7XG4gICAgICAgIGZpcmVTcGVsbGNoZWNrRW5kKGVkaXRvcik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGdldEVsbUluZGV4ID0gZnVuY3Rpb24gKGVsbSkge1xuICAgICAgdmFyIHZhbHVlID0gZWxtLmdldEF0dHJpYnV0ZSgnZGF0YS1tY2UtaW5kZXgnKTtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybiAnJyArIHZhbHVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgdmFyIGZpbmRTcGFuc0J5SW5kZXggPSBmdW5jdGlvbiAoZWRpdG9yLCBpbmRleCkge1xuICAgICAgdmFyIHNwYW5zID0gW107XG4gICAgICB2YXIgbm9kZXMgPSBnbG9iYWwkMS50b0FycmF5KGVkaXRvci5nZXRCb2R5KCkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NwYW4nKSk7XG4gICAgICBpZiAobm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgbm9kZUluZGV4ID0gZ2V0RWxtSW5kZXgobm9kZXNbaV0pO1xuICAgICAgICAgIGlmIChub2RlSW5kZXggPT09IG51bGwgfHwgIW5vZGVJbmRleC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobm9kZUluZGV4ID09PSBpbmRleC50b1N0cmluZygpKSB7XG4gICAgICAgICAgICBzcGFucy5wdXNoKG5vZGVzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBzcGFucztcbiAgICB9O1xuICAgIHZhciBtYXJrRXJyb3JzID0gZnVuY3Rpb24gKGVkaXRvciwgc3RhcnRlZFN0YXRlLCB0ZXh0TWF0Y2hlclN0YXRlLCBsYXN0U3VnZ2VzdGlvbnNTdGF0ZSwgZGF0YSkge1xuICAgICAgdmFyIGhhc0RpY3Rpb25hcnlTdXBwb3J0ID0gISFkYXRhLmRpY3Rpb25hcnk7XG4gICAgICB2YXIgc3VnZ2VzdGlvbnMgPSBkYXRhLndvcmRzO1xuICAgICAgZWRpdG9yLnNldFByb2dyZXNzU3RhdGUoZmFsc2UpO1xuICAgICAgaWYgKGlzRW1wdHkoc3VnZ2VzdGlvbnMpKSB7XG4gICAgICAgIHZhciBtZXNzYWdlID0gZWRpdG9yLnRyYW5zbGF0ZSgnTm8gbWlzc3BlbGxpbmdzIGZvdW5kLicpO1xuICAgICAgICBlZGl0b3Iubm90aWZpY2F0aW9uTWFuYWdlci5vcGVuKHtcbiAgICAgICAgICB0ZXh0OiBtZXNzYWdlLFxuICAgICAgICAgIHR5cGU6ICdpbmZvJ1xuICAgICAgICB9KTtcbiAgICAgICAgc3RhcnRlZFN0YXRlLnNldChmYWxzZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGxhc3RTdWdnZXN0aW9uc1N0YXRlLnNldCh7XG4gICAgICAgIHN1Z2dlc3Rpb25zOiBzdWdnZXN0aW9ucyxcbiAgICAgICAgaGFzRGljdGlvbmFyeVN1cHBvcnQ6IGhhc0RpY3Rpb25hcnlTdXBwb3J0XG4gICAgICB9KTtcbiAgICAgIHZhciBib29rbWFyayA9IGVkaXRvci5zZWxlY3Rpb24uZ2V0Qm9va21hcmsoKTtcbiAgICAgIGdldFRleHRNYXRjaGVyKGVkaXRvciwgdGV4dE1hdGNoZXJTdGF0ZSkuZmluZChnZXRTcGVsbGNoZWNrZXJXb3JkY2hhclBhdHRlcm4oZWRpdG9yKSkuZmlsdGVyKGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgICByZXR1cm4gISFzdWdnZXN0aW9uc1ttYXRjaC50ZXh0XTtcbiAgICAgIH0pLndyYXAoZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICAgIHJldHVybiBlZGl0b3IuZG9tLmNyZWF0ZSgnc3BhbicsIHtcbiAgICAgICAgICAnY2xhc3MnOiAnbWNlLXNwZWxsY2hlY2tlci13b3JkJyxcbiAgICAgICAgICAnYXJpYS1pbnZhbGlkJzogJ3NwZWxsaW5nJyxcbiAgICAgICAgICAnZGF0YS1tY2UtYm9ndXMnOiAxLFxuICAgICAgICAgICdkYXRhLW1jZS13b3JkJzogbWF0Y2gudGV4dFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnNlbGVjdGlvbi5tb3ZlVG9Cb29rbWFyayhib29rbWFyayk7XG4gICAgICBzdGFydGVkU3RhdGUuc2V0KHRydWUpO1xuICAgICAgZmlyZVNwZWxsY2hlY2tTdGFydChlZGl0b3IpO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0ID0gZnVuY3Rpb24gKGVkaXRvciwgc3RhcnRlZFN0YXRlLCBsYXN0U3VnZ2VzdGlvbnNTdGF0ZSwgdGV4dE1hdGNoZXJTdGF0ZSwgY3VycmVudExhbmd1YWdlU3RhdGUsIF91cmwpIHtcbiAgICAgIHZhciBnZXRMYW5ndWFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRMYW5ndWFnZVN0YXRlLmdldCgpO1xuICAgICAgfTtcbiAgICAgIHZhciBnZXRXb3JkQ2hhclBhdHRlcm4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBnZXRTcGVsbGNoZWNrZXJXb3JkY2hhclBhdHRlcm4oZWRpdG9yKTtcbiAgICAgIH07XG4gICAgICB2YXIgbWFya0Vycm9ycyQxID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgbWFya0Vycm9ycyhlZGl0b3IsIHN0YXJ0ZWRTdGF0ZSwgdGV4dE1hdGNoZXJTdGF0ZSwgbGFzdFN1Z2dlc3Rpb25zU3RhdGUsIGRhdGEpO1xuICAgICAgfTtcbiAgICAgIHZhciBnZXRUZXh0TWF0Y2hlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRleHRNYXRjaGVyU3RhdGUuZ2V0KCk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0VGV4dE1hdGNoZXI6IGdldFRleHRNYXRjaGVyLFxuICAgICAgICBnZXRXb3JkQ2hhclBhdHRlcm46IGdldFdvcmRDaGFyUGF0dGVybixcbiAgICAgICAgbWFya0Vycm9yczogbWFya0Vycm9ycyQxLFxuICAgICAgICBnZXRMYW5ndWFnZTogZ2V0TGFuZ3VhZ2VcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciByZWdpc3RlciA9IGZ1bmN0aW9uIChlZGl0b3IsIHBsdWdpblVybCwgc3RhcnRlZFN0YXRlLCB0ZXh0TWF0Y2hlclN0YXRlLCBsYXN0U3VnZ2VzdGlvbnNTdGF0ZSwgY3VycmVudExhbmd1YWdlU3RhdGUpIHtcbiAgICAgIGVkaXRvci5hZGRDb21tYW5kKCdtY2VTcGVsbENoZWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzcGVsbGNoZWNrKGVkaXRvciwgcGx1Z2luVXJsLCBzdGFydGVkU3RhdGUsIHRleHRNYXRjaGVyU3RhdGUsIGxhc3RTdWdnZXN0aW9uc1N0YXRlLCBjdXJyZW50TGFuZ3VhZ2VTdGF0ZSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24gKCkge1xuICAgICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICBmb3IgKHZhciBwIGluIHMpXG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICAgIH07XG4gICAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgdmFyIHNwZWxsY2hlY2tlckV2ZW50cyA9ICdTcGVsbGNoZWNrU3RhcnQgU3BlbGxjaGVja0VuZCc7XG4gICAgdmFyIGJ1aWxkTWVudUl0ZW1zID0gZnVuY3Rpb24gKGxpc3ROYW1lLCBsYW5ndWFnZVZhbHVlcykge1xuICAgICAgdmFyIGl0ZW1zID0gW107XG4gICAgICBnbG9iYWwkMS5lYWNoKGxhbmd1YWdlVmFsdWVzLCBmdW5jdGlvbiAobGFuZ3VhZ2VWYWx1ZSkge1xuICAgICAgICBpdGVtcy5wdXNoKHtcbiAgICAgICAgICBzZWxlY3RhYmxlOiB0cnVlLFxuICAgICAgICAgIHRleHQ6IGxhbmd1YWdlVmFsdWUubmFtZSxcbiAgICAgICAgICBkYXRhOiBsYW5ndWFnZVZhbHVlLnZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gaXRlbXM7XG4gICAgfTtcbiAgICB2YXIgZ2V0SXRlbXMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZ2xvYmFsJDEubWFwKGdldExhbmd1YWdlcyhlZGl0b3IpLnNwbGl0KCcsJyksIGZ1bmN0aW9uIChsYW5nUGFpcikge1xuICAgICAgICBsYW5nUGFpciA9IGxhbmdQYWlyLnNwbGl0KCc9Jyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbmFtZTogbGFuZ1BhaXJbMF0sXG4gICAgICAgICAgdmFsdWU6IGxhbmdQYWlyWzFdXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciByZWdpc3RlciQxID0gZnVuY3Rpb24gKGVkaXRvciwgcGx1Z2luVXJsLCBzdGFydGVkU3RhdGUsIHRleHRNYXRjaGVyU3RhdGUsIGN1cnJlbnRMYW5ndWFnZVN0YXRlLCBsYXN0U3VnZ2VzdGlvbnNTdGF0ZSkge1xuICAgICAgdmFyIGxhbmd1YWdlTWVudUl0ZW1zID0gYnVpbGRNZW51SXRlbXMoJ0xhbmd1YWdlJywgZ2V0SXRlbXMoZWRpdG9yKSk7XG4gICAgICB2YXIgc3RhcnRTcGVsbGNoZWNraW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzcGVsbGNoZWNrKGVkaXRvciwgcGx1Z2luVXJsLCBzdGFydGVkU3RhdGUsIHRleHRNYXRjaGVyU3RhdGUsIGxhc3RTdWdnZXN0aW9uc1N0YXRlLCBjdXJyZW50TGFuZ3VhZ2VTdGF0ZSk7XG4gICAgICB9O1xuICAgICAgdmFyIGJ1dHRvbkFyZ3MgPSB7XG4gICAgICAgIHRvb2x0aXA6ICdTcGVsbGNoZWNrJyxcbiAgICAgICAgb25BY3Rpb246IHN0YXJ0U3BlbGxjaGVja2luZyxcbiAgICAgICAgaWNvbjogJ3NwZWxsLWNoZWNrJyxcbiAgICAgICAgb25TZXR1cDogZnVuY3Rpb24gKGJ1dHRvbkFwaSkge1xuICAgICAgICAgIHZhciBzZXRCdXR0b25TdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGJ1dHRvbkFwaS5zZXRBY3RpdmUoc3RhcnRlZFN0YXRlLmdldCgpKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIGVkaXRvci5vbihzcGVsbGNoZWNrZXJFdmVudHMsIHNldEJ1dHRvblN0YXRlKTtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZWRpdG9yLm9mZihzcGVsbGNoZWNrZXJFdmVudHMsIHNldEJ1dHRvblN0YXRlKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdmFyIHNwbGl0QnV0dG9uQXJncyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBidXR0b25BcmdzKSwge1xuICAgICAgICB0eXBlOiAnc3BsaXRidXR0b24nLFxuICAgICAgICBzZWxlY3Q6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gY3VycmVudExhbmd1YWdlU3RhdGUuZ2V0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZldGNoOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICB2YXIgaXRlbXMgPSBnbG9iYWwkMS5tYXAobGFuZ3VhZ2VNZW51SXRlbXMsIGZ1bmN0aW9uIChsYW5ndWFnZUl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHR5cGU6ICdjaG9pY2VpdGVtJyxcbiAgICAgICAgICAgICAgdmFsdWU6IGxhbmd1YWdlSXRlbS5kYXRhLFxuICAgICAgICAgICAgICB0ZXh0OiBsYW5ndWFnZUl0ZW0udGV4dFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjYWxsYmFjayhpdGVtcyk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uSXRlbUFjdGlvbjogZnVuY3Rpb24gKHNwbGl0QnV0dG9uQXBpLCB2YWx1ZSkge1xuICAgICAgICAgIGN1cnJlbnRMYW5ndWFnZVN0YXRlLnNldCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKGxhbmd1YWdlTWVudUl0ZW1zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZFNwbGl0QnV0dG9uKCdzcGVsbGNoZWNrZXInLCBzcGxpdEJ1dHRvbkFyZ3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZFRvZ2dsZUJ1dHRvbignc3BlbGxjaGVja2VyJywgYnV0dG9uQXJncyk7XG4gICAgICB9XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkVG9nZ2xlTWVudUl0ZW0oJ3NwZWxsY2hlY2tlcicsIHtcbiAgICAgICAgdGV4dDogJ1NwZWxsY2hlY2snLFxuICAgICAgICBpY29uOiAnc3BlbGwtY2hlY2snLFxuICAgICAgICBvblNldHVwOiBmdW5jdGlvbiAobWVudUFwaSkge1xuICAgICAgICAgIG1lbnVBcGkuc2V0QWN0aXZlKHN0YXJ0ZWRTdGF0ZS5nZXQoKSk7XG4gICAgICAgICAgdmFyIHNldE1lbnVJdGVtQ2hlY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBtZW51QXBpLnNldEFjdGl2ZShzdGFydGVkU3RhdGUuZ2V0KCkpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgZWRpdG9yLm9uKHNwZWxsY2hlY2tlckV2ZW50cywgc2V0TWVudUl0ZW1DaGVjayk7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGVkaXRvci5vZmYoc3BlbGxjaGVja2VyRXZlbnRzLCBzZXRNZW51SXRlbUNoZWNrKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBvbkFjdGlvbjogc3RhcnRTcGVsbGNoZWNraW5nXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIGlnbm9yZUFsbCA9IHRydWU7XG4gICAgdmFyIGdldFN1Z2dlc3Rpb25zID0gZnVuY3Rpb24gKGVkaXRvciwgcGx1Z2luVXJsLCBsYXN0U3VnZ2VzdGlvbnNTdGF0ZSwgc3RhcnRlZFN0YXRlLCB0ZXh0TWF0Y2hlclN0YXRlLCBjdXJyZW50TGFuZ3VhZ2VTdGF0ZSwgd29yZCwgc3BhbnMpIHtcbiAgICAgIHZhciBpdGVtcyA9IFtdO1xuICAgICAgdmFyIHN1Z2dlc3Rpb25zID0gbGFzdFN1Z2dlc3Rpb25zU3RhdGUuZ2V0KCkuc3VnZ2VzdGlvbnNbd29yZF07XG4gICAgICBnbG9iYWwkMS5lYWNoKHN1Z2dlc3Rpb25zLCBmdW5jdGlvbiAoc3VnZ2VzdGlvbikge1xuICAgICAgICBpdGVtcy5wdXNoKHtcbiAgICAgICAgICB0ZXh0OiBzdWdnZXN0aW9uLFxuICAgICAgICAgIG9uQWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBlZGl0b3IuaW5zZXJ0Q29udGVudChlZGl0b3IuZG9tLmVuY29kZShzdWdnZXN0aW9uKSk7XG4gICAgICAgICAgICBlZGl0b3IuZG9tLnJlbW92ZShzcGFucyk7XG4gICAgICAgICAgICBjaGVja0lmRmluaXNoZWQoZWRpdG9yLCBzdGFydGVkU3RhdGUsIHRleHRNYXRjaGVyU3RhdGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHZhciBoYXNEaWN0aW9uYXJ5U3VwcG9ydCA9IGxhc3RTdWdnZXN0aW9uc1N0YXRlLmdldCgpLmhhc0RpY3Rpb25hcnlTdXBwb3J0O1xuICAgICAgaWYgKGhhc0RpY3Rpb25hcnlTdXBwb3J0KSB7XG4gICAgICAgIGl0ZW1zLnB1c2goeyB0eXBlOiAnc2VwYXJhdG9yJyB9KTtcbiAgICAgICAgaXRlbXMucHVzaCh7XG4gICAgICAgICAgdGV4dDogJ0FkZCB0byBkaWN0aW9uYXJ5JyxcbiAgICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYWRkVG9EaWN0aW9uYXJ5KGVkaXRvciwgcGx1Z2luVXJsLCBzdGFydGVkU3RhdGUsIHRleHRNYXRjaGVyU3RhdGUsIGN1cnJlbnRMYW5ndWFnZVN0YXRlLCB3b3JkLCBzcGFucyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGl0ZW1zLnB1c2guYXBwbHkoaXRlbXMsIFtcbiAgICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ0lnbm9yZScsXG4gICAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlnbm9yZVdvcmQoZWRpdG9yLCBzdGFydGVkU3RhdGUsIHRleHRNYXRjaGVyU3RhdGUsIHdvcmQsIHNwYW5zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnSWdub3JlIGFsbCcsXG4gICAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlnbm9yZVdvcmQoZWRpdG9yLCBzdGFydGVkU3RhdGUsIHRleHRNYXRjaGVyU3RhdGUsIHdvcmQsIHNwYW5zLCBpZ25vcmVBbGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSk7XG4gICAgICByZXR1cm4gaXRlbXM7XG4gICAgfTtcbiAgICB2YXIgc2V0dXAgPSBmdW5jdGlvbiAoZWRpdG9yLCBwbHVnaW5VcmwsIGxhc3RTdWdnZXN0aW9uc1N0YXRlLCBzdGFydGVkU3RhdGUsIHRleHRNYXRjaGVyU3RhdGUsIGN1cnJlbnRMYW5ndWFnZVN0YXRlKSB7XG4gICAgICB2YXIgdXBkYXRlID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IGVsZW1lbnQ7XG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NOYW1lID09PSAnbWNlLXNwZWxsY2hlY2tlci13b3JkJykge1xuICAgICAgICAgIHZhciBzcGFucyA9IGZpbmRTcGFuc0J5SW5kZXgoZWRpdG9yLCBnZXRFbG1JbmRleCh0YXJnZXQpKTtcbiAgICAgICAgICBpZiAoc3BhbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIHJuZyA9IGVkaXRvci5kb20uY3JlYXRlUm5nKCk7XG4gICAgICAgICAgICBybmcuc2V0U3RhcnRCZWZvcmUoc3BhbnNbMF0pO1xuICAgICAgICAgICAgcm5nLnNldEVuZEFmdGVyKHNwYW5zW3NwYW5zLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgICAgIGVkaXRvci5zZWxlY3Rpb24uc2V0Um5nKHJuZyk7XG4gICAgICAgICAgICByZXR1cm4gZ2V0U3VnZ2VzdGlvbnMoZWRpdG9yLCBwbHVnaW5VcmwsIGxhc3RTdWdnZXN0aW9uc1N0YXRlLCBzdGFydGVkU3RhdGUsIHRleHRNYXRjaGVyU3RhdGUsIGN1cnJlbnRMYW5ndWFnZVN0YXRlLCB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLW1jZS13b3JkJyksIHNwYW5zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZENvbnRleHRNZW51KCdzcGVsbGNoZWNrZXInLCB7IHVwZGF0ZTogdXBkYXRlIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBQbHVnaW4gKCkge1xuICAgICAgZ2xvYmFsLmFkZCgnc3BlbGxjaGVja2VyJywgZnVuY3Rpb24gKGVkaXRvciwgcGx1Z2luVXJsKSB7XG4gICAgICAgIGlmIChoYXNQcm9QbHVnaW4oZWRpdG9yKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICB2YXIgc3RhcnRlZFN0YXRlID0gQ2VsbChmYWxzZSk7XG4gICAgICAgICAgdmFyIGN1cnJlbnRMYW5ndWFnZVN0YXRlID0gQ2VsbChnZXRMYW5ndWFnZShlZGl0b3IpKTtcbiAgICAgICAgICB2YXIgdGV4dE1hdGNoZXJTdGF0ZSA9IENlbGwobnVsbCk7XG4gICAgICAgICAgdmFyIGxhc3RTdWdnZXN0aW9uc1N0YXRlID0gQ2VsbChudWxsKTtcbiAgICAgICAgICByZWdpc3RlciQxKGVkaXRvciwgcGx1Z2luVXJsLCBzdGFydGVkU3RhdGUsIHRleHRNYXRjaGVyU3RhdGUsIGN1cnJlbnRMYW5ndWFnZVN0YXRlLCBsYXN0U3VnZ2VzdGlvbnNTdGF0ZSk7XG4gICAgICAgICAgc2V0dXAoZWRpdG9yLCBwbHVnaW5VcmwsIGxhc3RTdWdnZXN0aW9uc1N0YXRlLCBzdGFydGVkU3RhdGUsIHRleHRNYXRjaGVyU3RhdGUsIGN1cnJlbnRMYW5ndWFnZVN0YXRlKTtcbiAgICAgICAgICByZWdpc3RlcihlZGl0b3IsIHBsdWdpblVybCwgc3RhcnRlZFN0YXRlLCB0ZXh0TWF0Y2hlclN0YXRlLCBsYXN0U3VnZ2VzdGlvbnNTdGF0ZSwgY3VycmVudExhbmd1YWdlU3RhdGUpO1xuICAgICAgICAgIHJldHVybiBnZXQoZWRpdG9yLCBzdGFydGVkU3RhdGUsIGxhc3RTdWdnZXN0aW9uc1N0YXRlLCB0ZXh0TWF0Y2hlclN0YXRlLCBjdXJyZW50TGFuZ3VhZ2VTdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIFBsdWdpbigpO1xuXG59KHdpbmRvdykpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==