(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tinymce-plugin-anchor-plugin"],{

/***/ "./node_modules/tinymce/plugins/anchor/plugin.js":
/*!*******************************************************!*\
  !*** ./node_modules/tinymce/plugins/anchor/plugin.js ***!
  \*******************************************************/
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

    var global$1 = tinymce.util.Tools.resolve('tinymce.dom.RangeUtils');

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var allowHtmlInNamedAnchor = function (editor) {
      return editor.getParam('allow_html_in_named_anchor', false, 'boolean');
    };

    var namedAnchorSelector = 'a:not([href])';
    var isEmptyString = function (str) {
      return !str;
    };
    var getIdFromAnchor = function (elm) {
      var id = elm.getAttribute('id') || elm.getAttribute('name');
      return id || '';
    };
    var isAnchor = function (elm) {
      return elm && elm.nodeName.toLowerCase() === 'a';
    };
    var isNamedAnchor = function (elm) {
      return isAnchor(elm) && !elm.getAttribute('href') && getIdFromAnchor(elm) !== '';
    };
    var isEmptyNamedAnchor = function (elm) {
      return isNamedAnchor(elm) && !elm.firstChild;
    };

    var removeEmptyNamedAnchorsInSelection = function (editor) {
      var dom = editor.dom;
      global$1(dom).walk(editor.selection.getRng(), function (nodes) {
        global$2.each(nodes, function (node) {
          if (isEmptyNamedAnchor(node)) {
            dom.remove(node, false);
          }
        });
      });
    };
    var isValidId = function (id) {
      return /^[A-Za-z][A-Za-z0-9\-:._]*$/.test(id);
    };
    var getNamedAnchor = function (editor) {
      return editor.dom.getParent(editor.selection.getStart(), namedAnchorSelector);
    };
    var getId = function (editor) {
      var anchor = getNamedAnchor(editor);
      if (anchor) {
        return getIdFromAnchor(anchor);
      } else {
        return '';
      }
    };
    var createAnchor = function (editor, id) {
      editor.undoManager.transact(function () {
        if (!allowHtmlInNamedAnchor(editor)) {
          editor.selection.collapse(true);
        }
        if (editor.selection.isCollapsed()) {
          editor.insertContent(editor.dom.createHTML('a', { id: id }));
        } else {
          removeEmptyNamedAnchorsInSelection(editor);
          editor.formatter.remove('namedAnchor', null, null, true);
          editor.formatter.apply('namedAnchor', { value: id });
          editor.addVisual();
        }
      });
    };
    var updateAnchor = function (editor, id, anchorElement) {
      anchorElement.removeAttribute('name');
      anchorElement.id = id;
      editor.addVisual();
      editor.undoManager.add();
    };
    var insert = function (editor, id) {
      var anchor = getNamedAnchor(editor);
      if (anchor) {
        updateAnchor(editor, id, anchor);
      } else {
        createAnchor(editor, id);
      }
      editor.focus();
    };

    var insertAnchor = function (editor, newId) {
      if (!isValidId(newId)) {
        editor.windowManager.alert('Id should start with a letter, followed only by letters, numbers, dashes, dots, colons or underscores.');
        return false;
      } else {
        insert(editor, newId);
        return true;
      }
    };
    var open = function (editor) {
      var currentId = getId(editor);
      editor.windowManager.open({
        title: 'Anchor',
        size: 'normal',
        body: {
          type: 'panel',
          items: [{
              name: 'id',
              type: 'input',
              label: 'ID',
              placeholder: 'example'
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
            primary: true
          }
        ],
        initialData: { id: currentId },
        onSubmit: function (api) {
          if (insertAnchor(editor, api.getData().id)) {
            api.close();
          }
        }
      });
    };

    var register = function (editor) {
      editor.addCommand('mceAnchor', function () {
        open(editor);
      });
    };

    var isNamedAnchorNode = function (node) {
      return node && isEmptyString(node.attr('href')) && !isEmptyString(node.attr('id') || node.attr('name'));
    };
    var isEmptyNamedAnchorNode = function (node) {
      return isNamedAnchorNode(node) && !node.firstChild;
    };
    var setContentEditable = function (state) {
      return function (nodes) {
        for (var i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          if (isEmptyNamedAnchorNode(node)) {
            node.attr('contenteditable', state);
          }
        }
      };
    };
    var setup = function (editor) {
      editor.on('PreInit', function () {
        editor.parser.addNodeFilter('a', setContentEditable('false'));
        editor.serializer.addNodeFilter('a', setContentEditable(null));
      });
    };

    var registerFormats = function (editor) {
      editor.formatter.register('namedAnchor', {
        inline: 'a',
        selector: namedAnchorSelector,
        remove: 'all',
        split: true,
        deep: true,
        attributes: { id: '%value' },
        onmatch: function (node, _fmt, _itemName) {
          return isNamedAnchor(node);
        }
      });
    };

    var register$1 = function (editor) {
      editor.ui.registry.addToggleButton('anchor', {
        icon: 'bookmark',
        tooltip: 'Anchor',
        onAction: function () {
          return editor.execCommand('mceAnchor');
        },
        onSetup: function (buttonApi) {
          return editor.selection.selectorChangedWithUnbind('a:not([href])', buttonApi.setActive).unbind;
        }
      });
      editor.ui.registry.addMenuItem('anchor', {
        icon: 'bookmark',
        text: 'Anchor...',
        onAction: function () {
          return editor.execCommand('mceAnchor');
        }
      });
    };

    function Plugin () {
      global.add('anchor', function (editor) {
        setup(editor);
        register(editor);
        register$1(editor);
        editor.on('PreInit', function () {
          registerFormats(editor);
        });
      });
    }

    Plugin();

}());


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2FuY2hvci9wbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELFNBQVM7QUFDcEUsU0FBUztBQUNUO0FBQ0E7QUFDQSxpREFBaUQsWUFBWTtBQUM3RDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsZ0JBQWdCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsZUFBZTtBQUNwQztBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQOztBQUVBOztBQUVBLENBQUMiLCJmaWxlIjoidGlueW1jZS1wbHVnaW4tYW5jaG9yLXBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICpcbiAqIFZlcnNpb246IDUuNC4yICgyMDIwLTA4LTE3KVxuICovXG4oZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBnbG9iYWwgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5QbHVnaW5NYW5hZ2VyJyk7XG5cbiAgICB2YXIgZ2xvYmFsJDEgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5kb20uUmFuZ2VVdGlscycpO1xuXG4gICAgdmFyIGdsb2JhbCQyID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UudXRpbC5Ub29scycpO1xuXG4gICAgdmFyIGFsbG93SHRtbEluTmFtZWRBbmNob3IgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICByZXR1cm4gZWRpdG9yLmdldFBhcmFtKCdhbGxvd19odG1sX2luX25hbWVkX2FuY2hvcicsIGZhbHNlLCAnYm9vbGVhbicpO1xuICAgIH07XG5cbiAgICB2YXIgbmFtZWRBbmNob3JTZWxlY3RvciA9ICdhOm5vdChbaHJlZl0pJztcbiAgICB2YXIgaXNFbXB0eVN0cmluZyA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgIHJldHVybiAhc3RyO1xuICAgIH07XG4gICAgdmFyIGdldElkRnJvbUFuY2hvciA9IGZ1bmN0aW9uIChlbG0pIHtcbiAgICAgIHZhciBpZCA9IGVsbS5nZXRBdHRyaWJ1dGUoJ2lkJykgfHwgZWxtLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuICAgICAgcmV0dXJuIGlkIHx8ICcnO1xuICAgIH07XG4gICAgdmFyIGlzQW5jaG9yID0gZnVuY3Rpb24gKGVsbSkge1xuICAgICAgcmV0dXJuIGVsbSAmJiBlbG0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2EnO1xuICAgIH07XG4gICAgdmFyIGlzTmFtZWRBbmNob3IgPSBmdW5jdGlvbiAoZWxtKSB7XG4gICAgICByZXR1cm4gaXNBbmNob3IoZWxtKSAmJiAhZWxtLmdldEF0dHJpYnV0ZSgnaHJlZicpICYmIGdldElkRnJvbUFuY2hvcihlbG0pICE9PSAnJztcbiAgICB9O1xuICAgIHZhciBpc0VtcHR5TmFtZWRBbmNob3IgPSBmdW5jdGlvbiAoZWxtKSB7XG4gICAgICByZXR1cm4gaXNOYW1lZEFuY2hvcihlbG0pICYmICFlbG0uZmlyc3RDaGlsZDtcbiAgICB9O1xuXG4gICAgdmFyIHJlbW92ZUVtcHR5TmFtZWRBbmNob3JzSW5TZWxlY3Rpb24gPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgZG9tID0gZWRpdG9yLmRvbTtcbiAgICAgIGdsb2JhbCQxKGRvbSkud2FsayhlZGl0b3Iuc2VsZWN0aW9uLmdldFJuZygpLCBmdW5jdGlvbiAobm9kZXMpIHtcbiAgICAgICAgZ2xvYmFsJDIuZWFjaChub2RlcywgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICBpZiAoaXNFbXB0eU5hbWVkQW5jaG9yKG5vZGUpKSB7XG4gICAgICAgICAgICBkb20ucmVtb3ZlKG5vZGUsIGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgaXNWYWxpZElkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICByZXR1cm4gL15bQS1aYS16XVtBLVphLXowLTlcXC06Ll9dKiQvLnRlc3QoaWQpO1xuICAgIH07XG4gICAgdmFyIGdldE5hbWVkQW5jaG9yID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5kb20uZ2V0UGFyZW50KGVkaXRvci5zZWxlY3Rpb24uZ2V0U3RhcnQoKSwgbmFtZWRBbmNob3JTZWxlY3Rvcik7XG4gICAgfTtcbiAgICB2YXIgZ2V0SWQgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgYW5jaG9yID0gZ2V0TmFtZWRBbmNob3IoZWRpdG9yKTtcbiAgICAgIGlmIChhbmNob3IpIHtcbiAgICAgICAgcmV0dXJuIGdldElkRnJvbUFuY2hvcihhbmNob3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGNyZWF0ZUFuY2hvciA9IGZ1bmN0aW9uIChlZGl0b3IsIGlkKSB7XG4gICAgICBlZGl0b3IudW5kb01hbmFnZXIudHJhbnNhY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWFsbG93SHRtbEluTmFtZWRBbmNob3IoZWRpdG9yKSkge1xuICAgICAgICAgIGVkaXRvci5zZWxlY3Rpb24uY29sbGFwc2UodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVkaXRvci5zZWxlY3Rpb24uaXNDb2xsYXBzZWQoKSkge1xuICAgICAgICAgIGVkaXRvci5pbnNlcnRDb250ZW50KGVkaXRvci5kb20uY3JlYXRlSFRNTCgnYScsIHsgaWQ6IGlkIH0pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZW1vdmVFbXB0eU5hbWVkQW5jaG9yc0luU2VsZWN0aW9uKGVkaXRvcik7XG4gICAgICAgICAgZWRpdG9yLmZvcm1hdHRlci5yZW1vdmUoJ25hbWVkQW5jaG9yJywgbnVsbCwgbnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgZWRpdG9yLmZvcm1hdHRlci5hcHBseSgnbmFtZWRBbmNob3InLCB7IHZhbHVlOiBpZCB9KTtcbiAgICAgICAgICBlZGl0b3IuYWRkVmlzdWFsKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIHVwZGF0ZUFuY2hvciA9IGZ1bmN0aW9uIChlZGl0b3IsIGlkLCBhbmNob3JFbGVtZW50KSB7XG4gICAgICBhbmNob3JFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnbmFtZScpO1xuICAgICAgYW5jaG9yRWxlbWVudC5pZCA9IGlkO1xuICAgICAgZWRpdG9yLmFkZFZpc3VhbCgpO1xuICAgICAgZWRpdG9yLnVuZG9NYW5hZ2VyLmFkZCgpO1xuICAgIH07XG4gICAgdmFyIGluc2VydCA9IGZ1bmN0aW9uIChlZGl0b3IsIGlkKSB7XG4gICAgICB2YXIgYW5jaG9yID0gZ2V0TmFtZWRBbmNob3IoZWRpdG9yKTtcbiAgICAgIGlmIChhbmNob3IpIHtcbiAgICAgICAgdXBkYXRlQW5jaG9yKGVkaXRvciwgaWQsIGFuY2hvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjcmVhdGVBbmNob3IoZWRpdG9yLCBpZCk7XG4gICAgICB9XG4gICAgICBlZGl0b3IuZm9jdXMoKTtcbiAgICB9O1xuXG4gICAgdmFyIGluc2VydEFuY2hvciA9IGZ1bmN0aW9uIChlZGl0b3IsIG5ld0lkKSB7XG4gICAgICBpZiAoIWlzVmFsaWRJZChuZXdJZCkpIHtcbiAgICAgICAgZWRpdG9yLndpbmRvd01hbmFnZXIuYWxlcnQoJ0lkIHNob3VsZCBzdGFydCB3aXRoIGEgbGV0dGVyLCBmb2xsb3dlZCBvbmx5IGJ5IGxldHRlcnMsIG51bWJlcnMsIGRhc2hlcywgZG90cywgY29sb25zIG9yIHVuZGVyc2NvcmVzLicpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnNlcnQoZWRpdG9yLCBuZXdJZCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIG9wZW4gPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgY3VycmVudElkID0gZ2V0SWQoZWRpdG9yKTtcbiAgICAgIGVkaXRvci53aW5kb3dNYW5hZ2VyLm9wZW4oe1xuICAgICAgICB0aXRsZTogJ0FuY2hvcicsXG4gICAgICAgIHNpemU6ICdub3JtYWwnLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgdHlwZTogJ3BhbmVsJyxcbiAgICAgICAgICBpdGVtczogW3tcbiAgICAgICAgICAgICAgbmFtZTogJ2lkJyxcbiAgICAgICAgICAgICAgdHlwZTogJ2lucHV0JyxcbiAgICAgICAgICAgICAgbGFiZWw6ICdJRCcsXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnZXhhbXBsZSdcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sXG4gICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnY2FuY2VsJyxcbiAgICAgICAgICAgIG5hbWU6ICdjYW5jZWwnLFxuICAgICAgICAgICAgdGV4dDogJ0NhbmNlbCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzdWJtaXQnLFxuICAgICAgICAgICAgbmFtZTogJ3NhdmUnLFxuICAgICAgICAgICAgdGV4dDogJ1NhdmUnLFxuICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgaW5pdGlhbERhdGE6IHsgaWQ6IGN1cnJlbnRJZCB9LFxuICAgICAgICBvblN1Ym1pdDogZnVuY3Rpb24gKGFwaSkge1xuICAgICAgICAgIGlmIChpbnNlcnRBbmNob3IoZWRpdG9yLCBhcGkuZ2V0RGF0YSgpLmlkKSkge1xuICAgICAgICAgICAgYXBpLmNsb3NlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHJlZ2lzdGVyID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgZWRpdG9yLmFkZENvbW1hbmQoJ21jZUFuY2hvcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb3BlbihlZGl0b3IpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBpc05hbWVkQW5jaG9yTm9kZSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICByZXR1cm4gbm9kZSAmJiBpc0VtcHR5U3RyaW5nKG5vZGUuYXR0cignaHJlZicpKSAmJiAhaXNFbXB0eVN0cmluZyhub2RlLmF0dHIoJ2lkJykgfHwgbm9kZS5hdHRyKCduYW1lJykpO1xuICAgIH07XG4gICAgdmFyIGlzRW1wdHlOYW1lZEFuY2hvck5vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgcmV0dXJuIGlzTmFtZWRBbmNob3JOb2RlKG5vZGUpICYmICFub2RlLmZpcnN0Q2hpbGQ7XG4gICAgfTtcbiAgICB2YXIgc2V0Q29udGVudEVkaXRhYmxlID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKG5vZGVzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgICAgIGlmIChpc0VtcHR5TmFtZWRBbmNob3JOb2RlKG5vZGUpKSB7XG4gICAgICAgICAgICBub2RlLmF0dHIoJ2NvbnRlbnRlZGl0YWJsZScsIHN0YXRlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgICB2YXIgc2V0dXAgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBlZGl0b3Iub24oJ1ByZUluaXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGVkaXRvci5wYXJzZXIuYWRkTm9kZUZpbHRlcignYScsIHNldENvbnRlbnRFZGl0YWJsZSgnZmFsc2UnKSk7XG4gICAgICAgIGVkaXRvci5zZXJpYWxpemVyLmFkZE5vZGVGaWx0ZXIoJ2EnLCBzZXRDb250ZW50RWRpdGFibGUobnVsbCkpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciByZWdpc3RlckZvcm1hdHMgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBlZGl0b3IuZm9ybWF0dGVyLnJlZ2lzdGVyKCduYW1lZEFuY2hvcicsIHtcbiAgICAgICAgaW5saW5lOiAnYScsXG4gICAgICAgIHNlbGVjdG9yOiBuYW1lZEFuY2hvclNlbGVjdG9yLFxuICAgICAgICByZW1vdmU6ICdhbGwnLFxuICAgICAgICBzcGxpdDogdHJ1ZSxcbiAgICAgICAgZGVlcDogdHJ1ZSxcbiAgICAgICAgYXR0cmlidXRlczogeyBpZDogJyV2YWx1ZScgfSxcbiAgICAgICAgb25tYXRjaDogZnVuY3Rpb24gKG5vZGUsIF9mbXQsIF9pdGVtTmFtZSkge1xuICAgICAgICAgIHJldHVybiBpc05hbWVkQW5jaG9yKG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIHJlZ2lzdGVyJDEgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkVG9nZ2xlQnV0dG9uKCdhbmNob3InLCB7XG4gICAgICAgIGljb246ICdib29rbWFyaycsXG4gICAgICAgIHRvb2x0aXA6ICdBbmNob3InLFxuICAgICAgICBvbkFjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBlZGl0b3IuZXhlY0NvbW1hbmQoJ21jZUFuY2hvcicpO1xuICAgICAgICB9LFxuICAgICAgICBvblNldHVwOiBmdW5jdGlvbiAoYnV0dG9uQXBpKSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci5zZWxlY3Rpb24uc2VsZWN0b3JDaGFuZ2VkV2l0aFVuYmluZCgnYTpub3QoW2hyZWZdKScsIGJ1dHRvbkFwaS5zZXRBY3RpdmUpLnVuYmluZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBlZGl0b3IudWkucmVnaXN0cnkuYWRkTWVudUl0ZW0oJ2FuY2hvcicsIHtcbiAgICAgICAgaWNvbjogJ2Jvb2ttYXJrJyxcbiAgICAgICAgdGV4dDogJ0FuY2hvci4uLicsXG4gICAgICAgIG9uQWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGVkaXRvci5leGVjQ29tbWFuZCgnbWNlQW5jaG9yJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBQbHVnaW4gKCkge1xuICAgICAgZ2xvYmFsLmFkZCgnYW5jaG9yJywgZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICBzZXR1cChlZGl0b3IpO1xuICAgICAgICByZWdpc3RlcihlZGl0b3IpO1xuICAgICAgICByZWdpc3RlciQxKGVkaXRvcik7XG4gICAgICAgIGVkaXRvci5vbignUHJlSW5pdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZWdpc3RlckZvcm1hdHMoZWRpdG9yKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBQbHVnaW4oKTtcblxufSgpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=