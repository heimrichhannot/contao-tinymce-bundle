(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-autolink-plugin"],{

/***/ "./node_modules/tinymce/plugins/autolink/plugin.js":
/*!*********************************************************!*\
  !*** ./node_modules/tinymce/plugins/autolink/plugin.js ***!
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
(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var global$1 = tinymce.util.Tools.resolve('tinymce.Env');

    var getAutoLinkPattern = function (editor) {
      return editor.getParam('autolink_pattern', /^(https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.|(?:mailto:)?[A-Z0-9._%+\-]+@(?!.*@))(.+)$/i);
    };
    var getDefaultLinkTarget = function (editor) {
      return editor.getParam('default_link_target', false);
    };
    var getDefaultLinkProtocol = function (editor) {
      return editor.getParam('link_default_protocol', 'http', 'string');
    };

    var rangeEqualsDelimiterOrSpace = function (rangeString, delimiter) {
      return rangeString === delimiter || rangeString === ' ' || rangeString.charCodeAt(0) === 160;
    };
    var handleEclipse = function (editor) {
      parseCurrentLine(editor, -1, '(');
    };
    var handleSpacebar = function (editor) {
      parseCurrentLine(editor, 0, '');
    };
    var handleEnter = function (editor) {
      parseCurrentLine(editor, -1, '');
    };
    var scopeIndex = function (container, index) {
      if (index < 0) {
        index = 0;
      }
      if (container.nodeType === 3) {
        var len = container.data.length;
        if (index > len) {
          index = len;
        }
      }
      return index;
    };
    var setStart = function (rng, container, offset) {
      if (container.nodeType !== 1 || container.hasChildNodes()) {
        rng.setStart(container, scopeIndex(container, offset));
      } else {
        rng.setStartBefore(container);
      }
    };
    var setEnd = function (rng, container, offset) {
      if (container.nodeType !== 1 || container.hasChildNodes()) {
        rng.setEnd(container, scopeIndex(container, offset));
      } else {
        rng.setEndAfter(container);
      }
    };
    var parseCurrentLine = function (editor, endOffset, delimiter) {
      var end, endContainer, bookmark, text, prev, len, rngText;
      var autoLinkPattern = getAutoLinkPattern(editor);
      var defaultLinkTarget = getDefaultLinkTarget(editor);
      if (editor.selection.getNode().tagName === 'A') {
        return;
      }
      var rng = editor.selection.getRng().cloneRange();
      if (rng.startOffset < 5) {
        prev = rng.endContainer.previousSibling;
        if (!prev) {
          if (!rng.endContainer.firstChild || !rng.endContainer.firstChild.nextSibling) {
            return;
          }
          prev = rng.endContainer.firstChild.nextSibling;
        }
        len = prev.length;
        setStart(rng, prev, len);
        setEnd(rng, prev, len);
        if (rng.endOffset < 5) {
          return;
        }
        end = rng.endOffset;
        endContainer = prev;
      } else {
        endContainer = rng.endContainer;
        if (endContainer.nodeType !== 3 && endContainer.firstChild) {
          while (endContainer.nodeType !== 3 && endContainer.firstChild) {
            endContainer = endContainer.firstChild;
          }
          if (endContainer.nodeType === 3) {
            setStart(rng, endContainer, 0);
            setEnd(rng, endContainer, endContainer.nodeValue.length);
          }
        }
        if (rng.endOffset === 1) {
          end = 2;
        } else {
          end = rng.endOffset - 1 - endOffset;
        }
      }
      var start = end;
      do {
        setStart(rng, endContainer, end >= 2 ? end - 2 : 0);
        setEnd(rng, endContainer, end >= 1 ? end - 1 : 0);
        end -= 1;
        rngText = rng.toString();
      } while (rngText !== ' ' && rngText !== '' && rngText.charCodeAt(0) !== 160 && end - 2 >= 0 && rngText !== delimiter);
      if (rangeEqualsDelimiterOrSpace(rng.toString(), delimiter)) {
        setStart(rng, endContainer, end);
        setEnd(rng, endContainer, start);
        end += 1;
      } else if (rng.startOffset === 0) {
        setStart(rng, endContainer, 0);
        setEnd(rng, endContainer, start);
      } else {
        setStart(rng, endContainer, end);
        setEnd(rng, endContainer, start);
      }
      text = rng.toString();
      if (text.charAt(text.length - 1) === '.') {
        setEnd(rng, endContainer, start - 1);
      }
      text = rng.toString().trim();
      var matches = text.match(autoLinkPattern);
      var protocol = getDefaultLinkProtocol(editor);
      if (matches) {
        if (matches[1] === 'www.') {
          matches[1] = protocol + '://www.';
        } else if (/@$/.test(matches[1]) && !/^mailto:/.test(matches[1])) {
          matches[1] = 'mailto:' + matches[1];
        }
        bookmark = editor.selection.getBookmark();
        editor.selection.setRng(rng);
        editor.execCommand('createlink', false, matches[1] + matches[2]);
        if (defaultLinkTarget !== false) {
          editor.dom.setAttrib(editor.selection.getNode(), 'target', defaultLinkTarget);
        }
        editor.selection.moveToBookmark(bookmark);
        editor.nodeChanged();
      }
    };
    var setup = function (editor) {
      var autoUrlDetectState;
      editor.on('keydown', function (e) {
        if (e.keyCode === 13) {
          return handleEnter(editor);
        }
      });
      if (global$1.browser.isIE()) {
        editor.on('focus', function () {
          if (!autoUrlDetectState) {
            autoUrlDetectState = true;
            try {
              editor.execCommand('AutoUrlDetect', false, true);
            } catch (ex) {
            }
          }
        });
        return;
      }
      editor.on('keypress', function (e) {
        if (e.keyCode === 41) {
          return handleEclipse(editor);
        }
      });
      editor.on('keyup', function (e) {
        if (e.keyCode === 32) {
          return handleSpacebar(editor);
        }
      });
    };

    function Plugin () {
      global.add('autolink', function (editor) {
        setup(editor);
      });
    }

    Plugin();

}());


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2F1dG9saW5rL3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBLENBQUMiLCJmaWxlIjoidGlueW1jZS1wbHVnaW4tYXV0b2xpbmstcGx1Z2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIFRpbnkgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTEdQTCBvciBhIGNvbW1lcmNpYWwgbGljZW5zZS5cbiAqIEZvciBMR1BMIHNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICogRm9yIGNvbW1lcmNpYWwgbGljZW5zZXMgc2VlIGh0dHBzOi8vd3d3LnRpbnkuY2xvdWQvXG4gKlxuICogVmVyc2lvbjogNS40LjIgKDIwMjAtMDgtMTcpXG4gKi9cbihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIGdsb2JhbCA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLlBsdWdpbk1hbmFnZXInKTtcblxuICAgIHZhciBnbG9iYWwkMSA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLkVudicpO1xuXG4gICAgdmFyIGdldEF1dG9MaW5rUGF0dGVybiA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZ2V0UGFyYW0oJ2F1dG9saW5rX3BhdHRlcm4nLCAvXihodHRwcz86XFwvXFwvfHNzaDpcXC9cXC98ZnRwOlxcL1xcL3xmaWxlOlxcL3x3d3dcXC58KD86bWFpbHRvOik/W0EtWjAtOS5fJStcXC1dK0AoPyEuKkApKSguKykkL2kpO1xuICAgIH07XG4gICAgdmFyIGdldERlZmF1bHRMaW5rVGFyZ2V0ID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnZGVmYXVsdF9saW5rX3RhcmdldCcsIGZhbHNlKTtcbiAgICB9O1xuICAgIHZhciBnZXREZWZhdWx0TGlua1Byb3RvY29sID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnbGlua19kZWZhdWx0X3Byb3RvY29sJywgJ2h0dHAnLCAnc3RyaW5nJyk7XG4gICAgfTtcblxuICAgIHZhciByYW5nZUVxdWFsc0RlbGltaXRlck9yU3BhY2UgPSBmdW5jdGlvbiAocmFuZ2VTdHJpbmcsIGRlbGltaXRlcikge1xuICAgICAgcmV0dXJuIHJhbmdlU3RyaW5nID09PSBkZWxpbWl0ZXIgfHwgcmFuZ2VTdHJpbmcgPT09ICcgJyB8fCByYW5nZVN0cmluZy5jaGFyQ29kZUF0KDApID09PSAxNjA7XG4gICAgfTtcbiAgICB2YXIgaGFuZGxlRWNsaXBzZSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHBhcnNlQ3VycmVudExpbmUoZWRpdG9yLCAtMSwgJygnKTtcbiAgICB9O1xuICAgIHZhciBoYW5kbGVTcGFjZWJhciA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHBhcnNlQ3VycmVudExpbmUoZWRpdG9yLCAwLCAnJyk7XG4gICAgfTtcbiAgICB2YXIgaGFuZGxlRW50ZXIgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBwYXJzZUN1cnJlbnRMaW5lKGVkaXRvciwgLTEsICcnKTtcbiAgICB9O1xuICAgIHZhciBzY29wZUluZGV4ID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgaW5kZXgpIHtcbiAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgaW5kZXggPSAwO1xuICAgICAgfVxuICAgICAgaWYgKGNvbnRhaW5lci5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICB2YXIgbGVuID0gY29udGFpbmVyLmRhdGEubGVuZ3RoO1xuICAgICAgICBpZiAoaW5kZXggPiBsZW4pIHtcbiAgICAgICAgICBpbmRleCA9IGxlbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH07XG4gICAgdmFyIHNldFN0YXJ0ID0gZnVuY3Rpb24gKHJuZywgY29udGFpbmVyLCBvZmZzZXQpIHtcbiAgICAgIGlmIChjb250YWluZXIubm9kZVR5cGUgIT09IDEgfHwgY29udGFpbmVyLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgICBybmcuc2V0U3RhcnQoY29udGFpbmVyLCBzY29wZUluZGV4KGNvbnRhaW5lciwgb2Zmc2V0KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBybmcuc2V0U3RhcnRCZWZvcmUoY29udGFpbmVyKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBzZXRFbmQgPSBmdW5jdGlvbiAocm5nLCBjb250YWluZXIsIG9mZnNldCkge1xuICAgICAgaWYgKGNvbnRhaW5lci5ub2RlVHlwZSAhPT0gMSB8fCBjb250YWluZXIuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICAgIHJuZy5zZXRFbmQoY29udGFpbmVyLCBzY29wZUluZGV4KGNvbnRhaW5lciwgb2Zmc2V0KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBybmcuc2V0RW5kQWZ0ZXIoY29udGFpbmVyKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBwYXJzZUN1cnJlbnRMaW5lID0gZnVuY3Rpb24gKGVkaXRvciwgZW5kT2Zmc2V0LCBkZWxpbWl0ZXIpIHtcbiAgICAgIHZhciBlbmQsIGVuZENvbnRhaW5lciwgYm9va21hcmssIHRleHQsIHByZXYsIGxlbiwgcm5nVGV4dDtcbiAgICAgIHZhciBhdXRvTGlua1BhdHRlcm4gPSBnZXRBdXRvTGlua1BhdHRlcm4oZWRpdG9yKTtcbiAgICAgIHZhciBkZWZhdWx0TGlua1RhcmdldCA9IGdldERlZmF1bHRMaW5rVGFyZ2V0KGVkaXRvcik7XG4gICAgICBpZiAoZWRpdG9yLnNlbGVjdGlvbi5nZXROb2RlKCkudGFnTmFtZSA9PT0gJ0EnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBybmcgPSBlZGl0b3Iuc2VsZWN0aW9uLmdldFJuZygpLmNsb25lUmFuZ2UoKTtcbiAgICAgIGlmIChybmcuc3RhcnRPZmZzZXQgPCA1KSB7XG4gICAgICAgIHByZXYgPSBybmcuZW5kQ29udGFpbmVyLnByZXZpb3VzU2libGluZztcbiAgICAgICAgaWYgKCFwcmV2KSB7XG4gICAgICAgICAgaWYgKCFybmcuZW5kQ29udGFpbmVyLmZpcnN0Q2hpbGQgfHwgIXJuZy5lbmRDb250YWluZXIuZmlyc3RDaGlsZC5uZXh0U2libGluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwcmV2ID0gcm5nLmVuZENvbnRhaW5lci5maXJzdENoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICB9XG4gICAgICAgIGxlbiA9IHByZXYubGVuZ3RoO1xuICAgICAgICBzZXRTdGFydChybmcsIHByZXYsIGxlbik7XG4gICAgICAgIHNldEVuZChybmcsIHByZXYsIGxlbik7XG4gICAgICAgIGlmIChybmcuZW5kT2Zmc2V0IDwgNSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbmQgPSBybmcuZW5kT2Zmc2V0O1xuICAgICAgICBlbmRDb250YWluZXIgPSBwcmV2O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZW5kQ29udGFpbmVyID0gcm5nLmVuZENvbnRhaW5lcjtcbiAgICAgICAgaWYgKGVuZENvbnRhaW5lci5ub2RlVHlwZSAhPT0gMyAmJiBlbmRDb250YWluZXIuZmlyc3RDaGlsZCkge1xuICAgICAgICAgIHdoaWxlIChlbmRDb250YWluZXIubm9kZVR5cGUgIT09IDMgJiYgZW5kQ29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGVuZENvbnRhaW5lciA9IGVuZENvbnRhaW5lci5maXJzdENoaWxkO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZW5kQ29udGFpbmVyLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgICAgICBzZXRTdGFydChybmcsIGVuZENvbnRhaW5lciwgMCk7XG4gICAgICAgICAgICBzZXRFbmQocm5nLCBlbmRDb250YWluZXIsIGVuZENvbnRhaW5lci5ub2RlVmFsdWUubGVuZ3RoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJuZy5lbmRPZmZzZXQgPT09IDEpIHtcbiAgICAgICAgICBlbmQgPSAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVuZCA9IHJuZy5lbmRPZmZzZXQgLSAxIC0gZW5kT2Zmc2V0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgc3RhcnQgPSBlbmQ7XG4gICAgICBkbyB7XG4gICAgICAgIHNldFN0YXJ0KHJuZywgZW5kQ29udGFpbmVyLCBlbmQgPj0gMiA/IGVuZCAtIDIgOiAwKTtcbiAgICAgICAgc2V0RW5kKHJuZywgZW5kQ29udGFpbmVyLCBlbmQgPj0gMSA/IGVuZCAtIDEgOiAwKTtcbiAgICAgICAgZW5kIC09IDE7XG4gICAgICAgIHJuZ1RleHQgPSBybmcudG9TdHJpbmcoKTtcbiAgICAgIH0gd2hpbGUgKHJuZ1RleHQgIT09ICcgJyAmJiBybmdUZXh0ICE9PSAnJyAmJiBybmdUZXh0LmNoYXJDb2RlQXQoMCkgIT09IDE2MCAmJiBlbmQgLSAyID49IDAgJiYgcm5nVGV4dCAhPT0gZGVsaW1pdGVyKTtcbiAgICAgIGlmIChyYW5nZUVxdWFsc0RlbGltaXRlck9yU3BhY2Uocm5nLnRvU3RyaW5nKCksIGRlbGltaXRlcikpIHtcbiAgICAgICAgc2V0U3RhcnQocm5nLCBlbmRDb250YWluZXIsIGVuZCk7XG4gICAgICAgIHNldEVuZChybmcsIGVuZENvbnRhaW5lciwgc3RhcnQpO1xuICAgICAgICBlbmQgKz0gMTtcbiAgICAgIH0gZWxzZSBpZiAocm5nLnN0YXJ0T2Zmc2V0ID09PSAwKSB7XG4gICAgICAgIHNldFN0YXJ0KHJuZywgZW5kQ29udGFpbmVyLCAwKTtcbiAgICAgICAgc2V0RW5kKHJuZywgZW5kQ29udGFpbmVyLCBzdGFydCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRTdGFydChybmcsIGVuZENvbnRhaW5lciwgZW5kKTtcbiAgICAgICAgc2V0RW5kKHJuZywgZW5kQ29udGFpbmVyLCBzdGFydCk7XG4gICAgICB9XG4gICAgICB0ZXh0ID0gcm5nLnRvU3RyaW5nKCk7XG4gICAgICBpZiAodGV4dC5jaGFyQXQodGV4dC5sZW5ndGggLSAxKSA9PT0gJy4nKSB7XG4gICAgICAgIHNldEVuZChybmcsIGVuZENvbnRhaW5lciwgc3RhcnQgLSAxKTtcbiAgICAgIH1cbiAgICAgIHRleHQgPSBybmcudG9TdHJpbmcoKS50cmltKCk7XG4gICAgICB2YXIgbWF0Y2hlcyA9IHRleHQubWF0Y2goYXV0b0xpbmtQYXR0ZXJuKTtcbiAgICAgIHZhciBwcm90b2NvbCA9IGdldERlZmF1bHRMaW5rUHJvdG9jb2woZWRpdG9yKTtcbiAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgIGlmIChtYXRjaGVzWzFdID09PSAnd3d3LicpIHtcbiAgICAgICAgICBtYXRjaGVzWzFdID0gcHJvdG9jb2wgKyAnOi8vd3d3Lic7XG4gICAgICAgIH0gZWxzZSBpZiAoL0AkLy50ZXN0KG1hdGNoZXNbMV0pICYmICEvXm1haWx0bzovLnRlc3QobWF0Y2hlc1sxXSkpIHtcbiAgICAgICAgICBtYXRjaGVzWzFdID0gJ21haWx0bzonICsgbWF0Y2hlc1sxXTtcbiAgICAgICAgfVxuICAgICAgICBib29rbWFyayA9IGVkaXRvci5zZWxlY3Rpb24uZ2V0Qm9va21hcmsoKTtcbiAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5zZXRSbmcocm5nKTtcbiAgICAgICAgZWRpdG9yLmV4ZWNDb21tYW5kKCdjcmVhdGVsaW5rJywgZmFsc2UsIG1hdGNoZXNbMV0gKyBtYXRjaGVzWzJdKTtcbiAgICAgICAgaWYgKGRlZmF1bHRMaW5rVGFyZ2V0ICE9PSBmYWxzZSkge1xuICAgICAgICAgIGVkaXRvci5kb20uc2V0QXR0cmliKGVkaXRvci5zZWxlY3Rpb24uZ2V0Tm9kZSgpLCAndGFyZ2V0JywgZGVmYXVsdExpbmtUYXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIGVkaXRvci5zZWxlY3Rpb24ubW92ZVRvQm9va21hcmsoYm9va21hcmspO1xuICAgICAgICBlZGl0b3Iubm9kZUNoYW5nZWQoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBzZXR1cCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBhdXRvVXJsRGV0ZWN0U3RhdGU7XG4gICAgICBlZGl0b3Iub24oJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgIHJldHVybiBoYW5kbGVFbnRlcihlZGl0b3IpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChnbG9iYWwkMS5icm93c2VyLmlzSUUoKSkge1xuICAgICAgICBlZGl0b3Iub24oJ2ZvY3VzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICghYXV0b1VybERldGVjdFN0YXRlKSB7XG4gICAgICAgICAgICBhdXRvVXJsRGV0ZWN0U3RhdGUgPSB0cnVlO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgZWRpdG9yLmV4ZWNDb21tYW5kKCdBdXRvVXJsRGV0ZWN0JywgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBlZGl0b3Iub24oJ2tleXByZXNzJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gNDEpIHtcbiAgICAgICAgICByZXR1cm4gaGFuZGxlRWNsaXBzZShlZGl0b3IpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci5vbigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAzMikge1xuICAgICAgICAgIHJldHVybiBoYW5kbGVTcGFjZWJhcihlZGl0b3IpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gUGx1Z2luICgpIHtcbiAgICAgIGdsb2JhbC5hZGQoJ2F1dG9saW5rJywgZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICBzZXR1cChlZGl0b3IpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgUGx1Z2luKCk7XG5cbn0oKSk7XG4iXSwic291cmNlUm9vdCI6IiJ9