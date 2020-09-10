(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-autosave"],{

/***/ "./node_modules/tinymce/plugins/autosave/index.js":
/*!********************************************************!*\
  !*** ./node_modules/tinymce/plugins/autosave/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Exports the "autosave" plugin for usage with module loaders
// Usage:
//   CommonJS:
//     require('tinymce/plugins/autosave')
//   ES2015:
//     import 'tinymce/plugins/autosave'
__webpack_require__(/*! ./plugin.js */ "./node_modules/tinymce/plugins/autosave/plugin.js");

/***/ }),

/***/ "./node_modules/tinymce/plugins/autosave/plugin.js":
/*!*********************************************************!*\
  !*** ./node_modules/tinymce/plugins/autosave/plugin.js ***!
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
(function (domGlobals) {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Delay');

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.LocalStorage');

    var global$3 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var fireRestoreDraft = function (editor) {
      return editor.fire('RestoreDraft');
    };
    var fireStoreDraft = function (editor) {
      return editor.fire('StoreDraft');
    };
    var fireRemoveDraft = function (editor) {
      return editor.fire('RemoveDraft');
    };

    var parse = function (timeString, defaultTime) {
      var multiples = {
        s: 1000,
        m: 60000
      };
      var toParse = timeString || defaultTime;
      var parsedTime = /^(\d+)([ms]?)$/.exec('' + toParse);
      return (parsedTime[2] ? multiples[parsedTime[2]] : 1) * parseInt(toParse, 10);
    };

    var shouldAskBeforeUnload = function (editor) {
      return editor.getParam('autosave_ask_before_unload', true);
    };
    var getAutoSavePrefix = function (editor) {
      var location = domGlobals.document.location;
      return editor.getParam('autosave_prefix', 'tinymce-autosave-{path}{query}{hash}-{id}-').replace(/{path}/g, location.pathname).replace(/{query}/g, location.search).replace(/{hash}/g, location.hash).replace(/{id}/g, editor.id);
    };
    var shouldRestoreWhenEmpty = function (editor) {
      return editor.getParam('autosave_restore_when_empty', false);
    };
    var getAutoSaveInterval = function (editor) {
      return parse(editor.getParam('autosave_interval'), '30s');
    };
    var getAutoSaveRetention = function (editor) {
      return parse(editor.getParam('autosave_retention'), '20m');
    };

    var eq = function (t) {
      return function (a) {
        return t === a;
      };
    };
    var isUndefined = eq(undefined);

    var isEmpty = function (editor, html) {
      if (isUndefined(html)) {
        return editor.dom.isEmpty(editor.getBody());
      } else {
        var trimmedHtml = global$3.trim(html);
        if (trimmedHtml === '') {
          return true;
        } else {
          var fragment = new domGlobals.DOMParser().parseFromString(trimmedHtml, 'text/html');
          return editor.dom.isEmpty(fragment);
        }
      }
    };
    var hasDraft = function (editor) {
      var time = parseInt(global$2.getItem(getAutoSavePrefix(editor) + 'time'), 10) || 0;
      if (new Date().getTime() - time > getAutoSaveRetention(editor)) {
        removeDraft(editor, false);
        return false;
      }
      return true;
    };
    var removeDraft = function (editor, fire) {
      var prefix = getAutoSavePrefix(editor);
      global$2.removeItem(prefix + 'draft');
      global$2.removeItem(prefix + 'time');
      if (fire !== false) {
        fireRemoveDraft(editor);
      }
    };
    var storeDraft = function (editor) {
      var prefix = getAutoSavePrefix(editor);
      if (!isEmpty(editor) && editor.isDirty()) {
        global$2.setItem(prefix + 'draft', editor.getContent({
          format: 'raw',
          no_events: true
        }));
        global$2.setItem(prefix + 'time', new Date().getTime().toString());
        fireStoreDraft(editor);
      }
    };
    var restoreDraft = function (editor) {
      var prefix = getAutoSavePrefix(editor);
      if (hasDraft(editor)) {
        editor.setContent(global$2.getItem(prefix + 'draft'), { format: 'raw' });
        fireRestoreDraft(editor);
      }
    };
    var startStoreDraft = function (editor) {
      var interval = getAutoSaveInterval(editor);
      global$1.setInterval(function () {
        if (!editor.removed) {
          storeDraft(editor);
        }
      }, interval);
    };
    var restoreLastDraft = function (editor) {
      editor.undoManager.transact(function () {
        restoreDraft(editor);
        removeDraft(editor);
      });
      editor.focus();
    };

    var get = function (editor) {
      return {
        hasDraft: function () {
          return hasDraft(editor);
        },
        storeDraft: function () {
          return storeDraft(editor);
        },
        restoreDraft: function () {
          return restoreDraft(editor);
        },
        removeDraft: function (fire) {
          return removeDraft(editor, fire);
        },
        isEmpty: function (html) {
          return isEmpty(editor, html);
        }
      };
    };

    var global$4 = tinymce.util.Tools.resolve('tinymce.EditorManager');

    var setup = function (editor) {
      editor.editorManager.on('BeforeUnload', function (e) {
        var msg;
        global$3.each(global$4.get(), function (editor) {
          if (editor.plugins.autosave) {
            editor.plugins.autosave.storeDraft();
          }
          if (!msg && editor.isDirty() && shouldAskBeforeUnload(editor)) {
            msg = editor.translate('You have unsaved changes are you sure you want to navigate away?');
          }
        });
        if (msg) {
          e.preventDefault();
          e.returnValue = msg;
        }
      });
    };

    var makeSetupHandler = function (editor) {
      return function (api) {
        api.setDisabled(!hasDraft(editor));
        var editorEventCallback = function () {
          return api.setDisabled(!hasDraft(editor));
        };
        editor.on('StoreDraft RestoreDraft RemoveDraft', editorEventCallback);
        return function () {
          return editor.off('StoreDraft RestoreDraft RemoveDraft', editorEventCallback);
        };
      };
    };
    var register = function (editor) {
      startStoreDraft(editor);
      editor.ui.registry.addButton('restoredraft', {
        tooltip: 'Restore last draft',
        icon: 'restore-draft',
        onAction: function () {
          restoreLastDraft(editor);
        },
        onSetup: makeSetupHandler(editor)
      });
      editor.ui.registry.addMenuItem('restoredraft', {
        text: 'Restore last draft',
        icon: 'restore-draft',
        onAction: function () {
          restoreLastDraft(editor);
        },
        onSetup: makeSetupHandler(editor)
      });
    };

    function Plugin () {
      global.add('autosave', function (editor) {
        setup(editor);
        register(editor);
        editor.on('init', function () {
          if (shouldRestoreWhenEmpty(editor) && editor.dom.isEmpty(editor.getBody())) {
            restoreDraft(editor);
          }
        });
        return get(editor);
      });
    }

    Plugin();

}(window));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2F1dG9zYXZlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55bWNlL3BsdWdpbnMvYXV0b3NhdmUvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFPLENBQUMsc0VBQWEsRTs7Ozs7Ozs7Ozs7QUNOckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUVBQW1FLE1BQU0sT0FBTyxLQUFLLEVBQUUsR0FBRyxjQUFjLEtBQUssaUNBQWlDLE1BQU0sK0JBQStCLEtBQUssNkJBQTZCLEdBQUc7QUFDeE47QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStELGdCQUFnQjtBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBLENBQUMiLCJmaWxlIjoidGlueW1jZS1wbHVnaW4tYXV0b3NhdmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBFeHBvcnRzIHRoZSBcImF1dG9zYXZlXCIgcGx1Z2luIGZvciB1c2FnZSB3aXRoIG1vZHVsZSBsb2FkZXJzXG4vLyBVc2FnZTpcbi8vICAgQ29tbW9uSlM6XG4vLyAgICAgcmVxdWlyZSgndGlueW1jZS9wbHVnaW5zL2F1dG9zYXZlJylcbi8vICAgRVMyMDE1OlxuLy8gICAgIGltcG9ydCAndGlueW1jZS9wbHVnaW5zL2F1dG9zYXZlJ1xucmVxdWlyZSgnLi9wbHVnaW4uanMnKTsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgVGlueSBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBMR1BMIG9yIGEgY29tbWVyY2lhbCBsaWNlbnNlLlxuICogRm9yIExHUEwgc2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKiBGb3IgY29tbWVyY2lhbCBsaWNlbnNlcyBzZWUgaHR0cHM6Ly93d3cudGlueS5jbG91ZC9cbiAqXG4gKiBWZXJzaW9uOiA1LjQuMiAoMjAyMC0wOC0xNylcbiAqL1xuKGZ1bmN0aW9uIChkb21HbG9iYWxzKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIGdsb2JhbCA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLlBsdWdpbk1hbmFnZXInKTtcblxuICAgIHZhciBnbG9iYWwkMSA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuRGVsYXknKTtcblxuICAgIHZhciBnbG9iYWwkMiA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLnV0aWwuTG9jYWxTdG9yYWdlJyk7XG5cbiAgICB2YXIgZ2xvYmFsJDMgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS51dGlsLlRvb2xzJyk7XG5cbiAgICB2YXIgZmlyZVJlc3RvcmVEcmFmdCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBlZGl0b3IuZmlyZSgnUmVzdG9yZURyYWZ0Jyk7XG4gICAgfTtcbiAgICB2YXIgZmlyZVN0b3JlRHJhZnQgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmZpcmUoJ1N0b3JlRHJhZnQnKTtcbiAgICB9O1xuICAgIHZhciBmaXJlUmVtb3ZlRHJhZnQgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmZpcmUoJ1JlbW92ZURyYWZ0Jyk7XG4gICAgfTtcblxuICAgIHZhciBwYXJzZSA9IGZ1bmN0aW9uICh0aW1lU3RyaW5nLCBkZWZhdWx0VGltZSkge1xuICAgICAgdmFyIG11bHRpcGxlcyA9IHtcbiAgICAgICAgczogMTAwMCxcbiAgICAgICAgbTogNjAwMDBcbiAgICAgIH07XG4gICAgICB2YXIgdG9QYXJzZSA9IHRpbWVTdHJpbmcgfHwgZGVmYXVsdFRpbWU7XG4gICAgICB2YXIgcGFyc2VkVGltZSA9IC9eKFxcZCspKFttc10/KSQvLmV4ZWMoJycgKyB0b1BhcnNlKTtcbiAgICAgIHJldHVybiAocGFyc2VkVGltZVsyXSA/IG11bHRpcGxlc1twYXJzZWRUaW1lWzJdXSA6IDEpICogcGFyc2VJbnQodG9QYXJzZSwgMTApO1xuICAgIH07XG5cbiAgICB2YXIgc2hvdWxkQXNrQmVmb3JlVW5sb2FkID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnYXV0b3NhdmVfYXNrX2JlZm9yZV91bmxvYWQnLCB0cnVlKTtcbiAgICB9O1xuICAgIHZhciBnZXRBdXRvU2F2ZVByZWZpeCA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBsb2NhdGlvbiA9IGRvbUdsb2JhbHMuZG9jdW1lbnQubG9jYXRpb247XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdhdXRvc2F2ZV9wcmVmaXgnLCAndGlueW1jZS1hdXRvc2F2ZS17cGF0aH17cXVlcnl9e2hhc2h9LXtpZH0tJykucmVwbGFjZSgve3BhdGh9L2csIGxvY2F0aW9uLnBhdGhuYW1lKS5yZXBsYWNlKC97cXVlcnl9L2csIGxvY2F0aW9uLnNlYXJjaCkucmVwbGFjZSgve2hhc2h9L2csIGxvY2F0aW9uLmhhc2gpLnJlcGxhY2UoL3tpZH0vZywgZWRpdG9yLmlkKTtcbiAgICB9O1xuICAgIHZhciBzaG91bGRSZXN0b3JlV2hlbkVtcHR5ID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnYXV0b3NhdmVfcmVzdG9yZV93aGVuX2VtcHR5JywgZmFsc2UpO1xuICAgIH07XG4gICAgdmFyIGdldEF1dG9TYXZlSW50ZXJ2YWwgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gcGFyc2UoZWRpdG9yLmdldFBhcmFtKCdhdXRvc2F2ZV9pbnRlcnZhbCcpLCAnMzBzJyk7XG4gICAgfTtcbiAgICB2YXIgZ2V0QXV0b1NhdmVSZXRlbnRpb24gPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gcGFyc2UoZWRpdG9yLmdldFBhcmFtKCdhdXRvc2F2ZV9yZXRlbnRpb24nKSwgJzIwbScpO1xuICAgIH07XG5cbiAgICB2YXIgZXEgPSBmdW5jdGlvbiAodCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICAgIHJldHVybiB0ID09PSBhO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBpc1VuZGVmaW5lZCA9IGVxKHVuZGVmaW5lZCk7XG5cbiAgICB2YXIgaXNFbXB0eSA9IGZ1bmN0aW9uIChlZGl0b3IsIGh0bWwpIHtcbiAgICAgIGlmIChpc1VuZGVmaW5lZChodG1sKSkge1xuICAgICAgICByZXR1cm4gZWRpdG9yLmRvbS5pc0VtcHR5KGVkaXRvci5nZXRCb2R5KCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHRyaW1tZWRIdG1sID0gZ2xvYmFsJDMudHJpbShodG1sKTtcbiAgICAgICAgaWYgKHRyaW1tZWRIdG1sID09PSAnJykge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBmcmFnbWVudCA9IG5ldyBkb21HbG9iYWxzLkRPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyh0cmltbWVkSHRtbCwgJ3RleHQvaHRtbCcpO1xuICAgICAgICAgIHJldHVybiBlZGl0b3IuZG9tLmlzRW1wdHkoZnJhZ21lbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgaGFzRHJhZnQgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgdGltZSA9IHBhcnNlSW50KGdsb2JhbCQyLmdldEl0ZW0oZ2V0QXV0b1NhdmVQcmVmaXgoZWRpdG9yKSArICd0aW1lJyksIDEwKSB8fCAwO1xuICAgICAgaWYgKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGltZSA+IGdldEF1dG9TYXZlUmV0ZW50aW9uKGVkaXRvcikpIHtcbiAgICAgICAgcmVtb3ZlRHJhZnQoZWRpdG9yLCBmYWxzZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgdmFyIHJlbW92ZURyYWZ0ID0gZnVuY3Rpb24gKGVkaXRvciwgZmlyZSkge1xuICAgICAgdmFyIHByZWZpeCA9IGdldEF1dG9TYXZlUHJlZml4KGVkaXRvcik7XG4gICAgICBnbG9iYWwkMi5yZW1vdmVJdGVtKHByZWZpeCArICdkcmFmdCcpO1xuICAgICAgZ2xvYmFsJDIucmVtb3ZlSXRlbShwcmVmaXggKyAndGltZScpO1xuICAgICAgaWYgKGZpcmUgIT09IGZhbHNlKSB7XG4gICAgICAgIGZpcmVSZW1vdmVEcmFmdChlZGl0b3IpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHN0b3JlRHJhZnQgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgcHJlZml4ID0gZ2V0QXV0b1NhdmVQcmVmaXgoZWRpdG9yKTtcbiAgICAgIGlmICghaXNFbXB0eShlZGl0b3IpICYmIGVkaXRvci5pc0RpcnR5KCkpIHtcbiAgICAgICAgZ2xvYmFsJDIuc2V0SXRlbShwcmVmaXggKyAnZHJhZnQnLCBlZGl0b3IuZ2V0Q29udGVudCh7XG4gICAgICAgICAgZm9ybWF0OiAncmF3JyxcbiAgICAgICAgICBub19ldmVudHM6IHRydWVcbiAgICAgICAgfSkpO1xuICAgICAgICBnbG9iYWwkMi5zZXRJdGVtKHByZWZpeCArICd0aW1lJywgbmV3IERhdGUoKS5nZXRUaW1lKCkudG9TdHJpbmcoKSk7XG4gICAgICAgIGZpcmVTdG9yZURyYWZ0KGVkaXRvcik7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgcmVzdG9yZURyYWZ0ID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIHByZWZpeCA9IGdldEF1dG9TYXZlUHJlZml4KGVkaXRvcik7XG4gICAgICBpZiAoaGFzRHJhZnQoZWRpdG9yKSkge1xuICAgICAgICBlZGl0b3Iuc2V0Q29udGVudChnbG9iYWwkMi5nZXRJdGVtKHByZWZpeCArICdkcmFmdCcpLCB7IGZvcm1hdDogJ3JhdycgfSk7XG4gICAgICAgIGZpcmVSZXN0b3JlRHJhZnQoZWRpdG9yKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBzdGFydFN0b3JlRHJhZnQgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgaW50ZXJ2YWwgPSBnZXRBdXRvU2F2ZUludGVydmFsKGVkaXRvcik7XG4gICAgICBnbG9iYWwkMS5zZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghZWRpdG9yLnJlbW92ZWQpIHtcbiAgICAgICAgICBzdG9yZURyYWZ0KGVkaXRvcik7XG4gICAgICAgIH1cbiAgICAgIH0sIGludGVydmFsKTtcbiAgICB9O1xuICAgIHZhciByZXN0b3JlTGFzdERyYWZ0ID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgZWRpdG9yLnVuZG9NYW5hZ2VyLnRyYW5zYWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVzdG9yZURyYWZ0KGVkaXRvcik7XG4gICAgICAgIHJlbW92ZURyYWZ0KGVkaXRvcik7XG4gICAgICB9KTtcbiAgICAgIGVkaXRvci5mb2N1cygpO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0ID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaGFzRHJhZnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gaGFzRHJhZnQoZWRpdG9yKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3RvcmVEcmFmdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBzdG9yZURyYWZ0KGVkaXRvcik7XG4gICAgICAgIH0sXG4gICAgICAgIHJlc3RvcmVEcmFmdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiByZXN0b3JlRHJhZnQoZWRpdG9yKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlRHJhZnQ6IGZ1bmN0aW9uIChmaXJlKSB7XG4gICAgICAgICAgcmV0dXJuIHJlbW92ZURyYWZ0KGVkaXRvciwgZmlyZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW1wdHk6IGZ1bmN0aW9uIChodG1sKSB7XG4gICAgICAgICAgcmV0dXJuIGlzRW1wdHkoZWRpdG9yLCBodG1sKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIGdsb2JhbCQ0ID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UuRWRpdG9yTWFuYWdlcicpO1xuXG4gICAgdmFyIHNldHVwID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgZWRpdG9yLmVkaXRvck1hbmFnZXIub24oJ0JlZm9yZVVubG9hZCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBtc2c7XG4gICAgICAgIGdsb2JhbCQzLmVhY2goZ2xvYmFsJDQuZ2V0KCksIGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgICAgICBpZiAoZWRpdG9yLnBsdWdpbnMuYXV0b3NhdmUpIHtcbiAgICAgICAgICAgIGVkaXRvci5wbHVnaW5zLmF1dG9zYXZlLnN0b3JlRHJhZnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFtc2cgJiYgZWRpdG9yLmlzRGlydHkoKSAmJiBzaG91bGRBc2tCZWZvcmVVbmxvYWQoZWRpdG9yKSkge1xuICAgICAgICAgICAgbXNnID0gZWRpdG9yLnRyYW5zbGF0ZSgnWW91IGhhdmUgdW5zYXZlZCBjaGFuZ2VzIGFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBuYXZpZ2F0ZSBhd2F5PycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChtc2cpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZS5yZXR1cm5WYWx1ZSA9IG1zZztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBtYWtlU2V0dXBIYW5kbGVyID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhcGkpIHtcbiAgICAgICAgYXBpLnNldERpc2FibGVkKCFoYXNEcmFmdChlZGl0b3IpKTtcbiAgICAgICAgdmFyIGVkaXRvckV2ZW50Q2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGFwaS5zZXREaXNhYmxlZCghaGFzRHJhZnQoZWRpdG9yKSk7XG4gICAgICAgIH07XG4gICAgICAgIGVkaXRvci5vbignU3RvcmVEcmFmdCBSZXN0b3JlRHJhZnQgUmVtb3ZlRHJhZnQnLCBlZGl0b3JFdmVudENhbGxiYWNrKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZWRpdG9yLm9mZignU3RvcmVEcmFmdCBSZXN0b3JlRHJhZnQgUmVtb3ZlRHJhZnQnLCBlZGl0b3JFdmVudENhbGxiYWNrKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgcmVnaXN0ZXIgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBzdGFydFN0b3JlRHJhZnQoZWRpdG9yKTtcbiAgICAgIGVkaXRvci51aS5yZWdpc3RyeS5hZGRCdXR0b24oJ3Jlc3RvcmVkcmFmdCcsIHtcbiAgICAgICAgdG9vbHRpcDogJ1Jlc3RvcmUgbGFzdCBkcmFmdCcsXG4gICAgICAgIGljb246ICdyZXN0b3JlLWRyYWZ0JyxcbiAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXN0b3JlTGFzdERyYWZ0KGVkaXRvcik7XG4gICAgICAgIH0sXG4gICAgICAgIG9uU2V0dXA6IG1ha2VTZXR1cEhhbmRsZXIoZWRpdG9yKVxuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkTWVudUl0ZW0oJ3Jlc3RvcmVkcmFmdCcsIHtcbiAgICAgICAgdGV4dDogJ1Jlc3RvcmUgbGFzdCBkcmFmdCcsXG4gICAgICAgIGljb246ICdyZXN0b3JlLWRyYWZ0JyxcbiAgICAgICAgb25BY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXN0b3JlTGFzdERyYWZ0KGVkaXRvcik7XG4gICAgICAgIH0sXG4gICAgICAgIG9uU2V0dXA6IG1ha2VTZXR1cEhhbmRsZXIoZWRpdG9yKVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFBsdWdpbiAoKSB7XG4gICAgICBnbG9iYWwuYWRkKCdhdXRvc2F2ZScsIGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgICAgc2V0dXAoZWRpdG9yKTtcbiAgICAgICAgcmVnaXN0ZXIoZWRpdG9yKTtcbiAgICAgICAgZWRpdG9yLm9uKCdpbml0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChzaG91bGRSZXN0b3JlV2hlbkVtcHR5KGVkaXRvcikgJiYgZWRpdG9yLmRvbS5pc0VtcHR5KGVkaXRvci5nZXRCb2R5KCkpKSB7XG4gICAgICAgICAgICByZXN0b3JlRHJhZnQoZWRpdG9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZ2V0KGVkaXRvcik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBQbHVnaW4oKTtcblxufSh3aW5kb3cpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=