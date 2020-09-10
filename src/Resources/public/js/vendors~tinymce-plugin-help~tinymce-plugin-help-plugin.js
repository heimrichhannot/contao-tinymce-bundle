(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~tinymce-plugin-help~tinymce-plugin-help-plugin"],{

/***/ "./node_modules/tinymce/plugins/help/plugin.js":
/*!*****************************************************!*\
  !*** ./node_modules/tinymce/plugins/help/plugin.js ***!
  \*****************************************************/
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

    var get = function (customTabs) {
      var addTab = function (spec) {
        var currentCustomTabs = customTabs.get();
        currentCustomTabs[spec.name] = spec;
        customTabs.set(currentCustomTabs);
      };
      return { addTab: addTab };
    };

    var register = function (editor, dialogOpener) {
      editor.addCommand('mceHelp', dialogOpener);
    };

    var register$1 = function (editor, dialogOpener) {
      editor.ui.registry.addButton('help', {
        icon: 'help',
        tooltip: 'Help',
        onAction: dialogOpener
      });
      editor.ui.registry.addMenuItem('help', {
        text: 'Help',
        icon: 'help',
        shortcut: 'Alt+0',
        onAction: dialogOpener
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

    var nativeIndexOf = Array.prototype.indexOf;
    var rawIndexOf = function (ts, t) {
      return nativeIndexOf.call(ts, t);
    };
    var contains = function (xs, x) {
      return rawIndexOf(xs, x) > -1;
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

    var keys = Object.keys;
    var hasOwnProperty = Object.hasOwnProperty;
    var get$1 = function (obj, key) {
      return has(obj, key) ? Option.from(obj[key]) : Option.none();
    };
    var has = function (obj, key) {
      return hasOwnProperty.call(obj, key);
    };

    var cat = function (arr) {
      var r = [];
      var push = function (x) {
        r.push(x);
      };
      for (var i = 0; i < arr.length; i++) {
        arr[i].each(push);
      }
      return r;
    };

    var getHelpTabs = function (editor) {
      return Option.from(editor.getParam('help_tabs'));
    };
    var getForcedPlugins = function (editor) {
      return editor.getParam('forced_plugins');
    };

    var shortcuts = [
      {
        shortcuts: ['Meta + B'],
        action: 'Bold'
      },
      {
        shortcuts: ['Meta + I'],
        action: 'Italic'
      },
      {
        shortcuts: ['Meta + U'],
        action: 'Underline'
      },
      {
        shortcuts: ['Meta + A'],
        action: 'Select all'
      },
      {
        shortcuts: [
          'Meta + Y',
          'Meta + Shift + Z'
        ],
        action: 'Redo'
      },
      {
        shortcuts: ['Meta + Z'],
        action: 'Undo'
      },
      {
        shortcuts: ['Access + 1'],
        action: 'Header 1'
      },
      {
        shortcuts: ['Access + 2'],
        action: 'Header 2'
      },
      {
        shortcuts: ['Access + 3'],
        action: 'Header 3'
      },
      {
        shortcuts: ['Access + 4'],
        action: 'Header 4'
      },
      {
        shortcuts: ['Access + 5'],
        action: 'Header 5'
      },
      {
        shortcuts: ['Access + 6'],
        action: 'Header 6'
      },
      {
        shortcuts: ['Access + 7'],
        action: 'Paragraph'
      },
      {
        shortcuts: ['Access + 8'],
        action: 'Div'
      },
      {
        shortcuts: ['Access + 9'],
        action: 'Address'
      },
      {
        shortcuts: ['Alt + 0'],
        action: 'Open help dialog'
      },
      {
        shortcuts: ['Alt + F9'],
        action: 'Focus to menubar'
      },
      {
        shortcuts: ['Alt + F10'],
        action: 'Focus to toolbar'
      },
      {
        shortcuts: ['Alt + F11'],
        action: 'Focus to element path'
      },
      {
        shortcuts: ['Ctrl + F9'],
        action: 'Focus to contextual toolbar'
      },
      {
        shortcuts: ['Shift + Enter'],
        action: 'Open popup menu for split buttons'
      },
      {
        shortcuts: ['Meta + K'],
        action: 'Insert link (if link plugin activated)'
      },
      {
        shortcuts: ['Meta + S'],
        action: 'Save (if save plugin activated)'
      },
      {
        shortcuts: ['Meta + F'],
        action: 'Find (if searchreplace plugin activated)'
      },
      {
        shortcuts: ['Meta + Shift + F'],
        action: 'Switch to or from fullscreen mode'
      }
    ];

    var global$1 = tinymce.util.Tools.resolve('tinymce.Env');

    var convertText = function (source) {
      var mac = {
        alt: '&#x2325;',
        ctrl: '&#x2303;',
        shift: '&#x21E7;',
        meta: '&#x2318;',
        access: '&#x2303;&#x2325;'
      };
      var other = {
        meta: 'Ctrl ',
        access: 'Shift + Alt '
      };
      var replace = global$1.mac ? mac : other;
      var shortcut = source.split('+');
      var updated = map(shortcut, function (segment) {
        var search = segment.toLowerCase().trim();
        return has(replace, search) ? replace[search] : segment;
      });
      return global$1.mac ? updated.join('').replace(/\s/, '') : updated.join('+');
    };

    var tab = function () {
      var shortcutList = map(shortcuts, function (shortcut) {
        var shortcutText = map(shortcut.shortcuts, convertText).join(' or ');
        return [
          shortcut.action,
          shortcutText
        ];
      });
      var tablePanel = {
        type: 'table',
        header: [
          'Action',
          'Shortcut'
        ],
        cells: shortcutList
      };
      return {
        name: 'shortcuts',
        title: 'Handy Shortcuts',
        items: [tablePanel]
      };
    };

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.I18n');

    var urls = [
      {
        key: 'advlist',
        name: 'Advanced List'
      },
      {
        key: 'anchor',
        name: 'Anchor'
      },
      {
        key: 'autolink',
        name: 'Autolink'
      },
      {
        key: 'autoresize',
        name: 'Autoresize'
      },
      {
        key: 'autosave',
        name: 'Autosave'
      },
      {
        key: 'bbcode',
        name: 'BBCode'
      },
      {
        key: 'charmap',
        name: 'Character Map'
      },
      {
        key: 'code',
        name: 'Code'
      },
      {
        key: 'codesample',
        name: 'Code Sample'
      },
      {
        key: 'colorpicker',
        name: 'Color Picker'
      },
      {
        key: 'directionality',
        name: 'Directionality'
      },
      {
        key: 'emoticons',
        name: 'Emoticons'
      },
      {
        key: 'fullpage',
        name: 'Full Page'
      },
      {
        key: 'fullscreen',
        name: 'Full Screen'
      },
      {
        key: 'help',
        name: 'Help'
      },
      {
        key: 'hr',
        name: 'Horizontal Rule'
      },
      {
        key: 'image',
        name: 'Image'
      },
      {
        key: 'imagetools',
        name: 'Image Tools'
      },
      {
        key: 'importcss',
        name: 'Import CSS'
      },
      {
        key: 'insertdatetime',
        name: 'Insert Date/Time'
      },
      {
        key: 'legacyoutput',
        name: 'Legacy Output'
      },
      {
        key: 'link',
        name: 'Link'
      },
      {
        key: 'lists',
        name: 'Lists'
      },
      {
        key: 'media',
        name: 'Media'
      },
      {
        key: 'nonbreaking',
        name: 'Nonbreaking'
      },
      {
        key: 'noneditable',
        name: 'Noneditable'
      },
      {
        key: 'pagebreak',
        name: 'Page Break'
      },
      {
        key: 'paste',
        name: 'Paste'
      },
      {
        key: 'preview',
        name: 'Preview'
      },
      {
        key: 'print',
        name: 'Print'
      },
      {
        key: 'save',
        name: 'Save'
      },
      {
        key: 'searchreplace',
        name: 'Search and Replace'
      },
      {
        key: 'spellchecker',
        name: 'Spell Checker'
      },
      {
        key: 'tabfocus',
        name: 'Tab Focus'
      },
      {
        key: 'table',
        name: 'Table'
      },
      {
        key: 'template',
        name: 'Template'
      },
      {
        key: 'textcolor',
        name: 'Text Color'
      },
      {
        key: 'textpattern',
        name: 'Text Pattern'
      },
      {
        key: 'toc',
        name: 'Table of Contents'
      },
      {
        key: 'visualblocks',
        name: 'Visual Blocks'
      },
      {
        key: 'visualchars',
        name: 'Visual Characters'
      },
      {
        key: 'wordcount',
        name: 'Word Count'
      },
      {
        key: 'advcode',
        name: 'Advanced Code Editor*'
      },
      {
        key: 'formatpainter',
        name: 'Format Painter*'
      },
      {
        key: 'powerpaste',
        name: 'PowerPaste*'
      },
      {
        key: 'tinydrive',
        name: 'Tiny Drive*',
        slug: 'drive'
      },
      {
        key: 'tinymcespellchecker',
        name: 'Spell Checker Pro*'
      },
      {
        key: 'a11ychecker',
        name: 'Accessibility Checker*'
      },
      {
        key: 'linkchecker',
        name: 'Link Checker*'
      },
      {
        key: 'mentions',
        name: 'Mentions*'
      },
      {
        key: 'mediaembed',
        name: 'Enhanced Media Embed*'
      },
      {
        key: 'checklist',
        name: 'Checklist*'
      },
      {
        key: 'casechange',
        name: 'Case Change*'
      },
      {
        key: 'permanentpen',
        name: 'Permanent Pen*'
      },
      {
        key: 'pageembed',
        name: 'Page Embed*'
      },
      {
        key: 'tinycomments',
        name: 'Tiny Comments*',
        slug: 'comments'
      },
      {
        key: 'advtable',
        name: 'Advanced Tables*'
      },
      {
        key: 'autocorrect',
        name: 'Autocorrect*'
      }
    ];

    var tab$1 = function (editor) {
      var availablePlugins = function () {
        var premiumPlugins = [
          'Accessibility Checker',
          'Advanced Code Editor',
          'Advanced Tables',
          'Case Change',
          'Checklist',
          'Tiny Comments',
          'Tiny Drive',
          'Enhanced Media Embed',
          'Format Painter',
          'Link Checker',
          'Mentions',
          'MoxieManager',
          'Page Embed',
          'Permanent Pen',
          'PowerPaste',
          'Spell Checker Pro'
        ];
        var premiumPluginList = map(premiumPlugins, function (plugin) {
          return '<li>' + global$2.translate(plugin) + '</li>';
        }).join('');
        return '<div data-mce-tabstop="1" tabindex="-1">' + '<p><b>' + global$2.translate('Premium plugins:') + '</b></p>' + '<ul>' + premiumPluginList + '<li class="tox-help__more-link" "><a href="https://www.tiny.cloud/pricing/?utm_campaign=editor_referral&utm_medium=help_dialog&utm_source=tinymce" target="_blank">' + global$2.translate('Learn more...') + '</a></li>' + '</ul>' + '</div>';
      };
      var makeLink = function (p) {
        return '<a href="' + p.url + '" target="_blank" rel="noopener">' + p.name + '</a>';
      };
      var maybeUrlize = function (editor, key) {
        return find(urls, function (x) {
          return x.key === key;
        }).fold(function () {
          var getMetadata = editor.plugins[key].getMetadata;
          return typeof getMetadata === 'function' ? makeLink(getMetadata()) : key;
        }, function (x) {
          var urlSlug = x.slug || x.key;
          return makeLink({
            name: x.name,
            url: 'https://www.tiny.cloud/docs/plugins/' + urlSlug
          });
        });
      };
      var getPluginKeys = function (editor) {
        var keys$1 = keys(editor.plugins);
        var forced_plugins = getForcedPlugins(editor);
        return forced_plugins === undefined ? keys$1 : filter(keys$1, function (k) {
          return !contains(forced_plugins, k);
        });
      };
      var pluginLister = function (editor) {
        var pluginKeys = getPluginKeys(editor);
        var pluginLis = map(pluginKeys, function (key) {
          return '<li>' + maybeUrlize(editor, key) + '</li>';
        });
        var count = pluginLis.length;
        var pluginsString = pluginLis.join('');
        var html = '<p><b>' + global$2.translate([
          'Plugins installed ({0}):',
          count
        ]) + '</b></p>' + '<ul>' + pluginsString + '</ul>';
        return html;
      };
      var installedPlugins = function (editor) {
        if (editor == null) {
          return '';
        }
        return '<div data-mce-tabstop="1" tabindex="-1">' + pluginLister(editor) + '</div>';
      };
      var htmlPanel = {
        type: 'htmlpanel',
        presets: 'document',
        html: [
          installedPlugins(editor),
          availablePlugins()
        ].join('')
      };
      return {
        name: 'plugins',
        title: 'Plugins',
        items: [htmlPanel]
      };
    };

    var global$3 = tinymce.util.Tools.resolve('tinymce.EditorManager');

    var tab$2 = function () {
      var getVersion = function (major, minor) {
        return major.indexOf('@') === 0 ? 'X.X.X' : major + '.' + minor;
      };
      var version = getVersion(global$3.majorVersion, global$3.minorVersion);
      var changeLogLink = '<a href="https://www.tinymce.com/docs/changelog/?utm_campaign=editor_referral&utm_medium=help_dialog&utm_source=tinymce" target="_blank">TinyMCE ' + version + '</a>';
      var htmlPanel = {
        type: 'htmlpanel',
        html: '<p>' + global$2.translate([
          'You are using {0}',
          changeLogLink
        ]) + '</p>',
        presets: 'document'
      };
      return {
        name: 'versions',
        title: 'Version',
        items: [htmlPanel]
      };
    };

    var description = '<h1>Editor UI keyboard navigation</h1>\n\n<h2>Activating keyboard navigation</h2>\n\n<p>The sections of the outer UI of the editor - the menubar, toolbar, sidebar and footer - are all keyboard navigable. As such, there are multiple ways to activate keyboard navigation:</p>\n<ul>\n  <li>Focus the menubar: Alt + F9 (Windows) or &#x2325;F9 (MacOS)</li>\n  <li>Focus the toolbar: Alt + F10 (Windows) or &#x2325;F10 (MacOS)</li>\n  <li>Focus the footer: Alt + F11 (Windows) or &#x2325;F11 (MacOS)</li>\n</ul>\n\n<p>Focusing the menubar or toolbar will start keyboard navigation at the first item in the menubar or toolbar, which will be highlighted with a gray background. Focusing the footer will start keyboard navigation at the first item in the element path, which will be highlighted with an underline. </p>\n\n<h2>Moving between UI sections</h2>\n\n<p>When keyboard navigation is active, pressing tab will move the focus to the next major section of the UI, where applicable. These sections are:</p>\n<ul>\n  <li>the menubar</li>\n  <li>each group of the toolbar </li>\n  <li>the sidebar</li>\n  <li>the element path in the footer </li>\n  <li>the wordcount toggle button in the footer </li>\n  <li>the branding link in the footer </li>\n</ul>\n\n<p>Pressing shift + tab will move backwards through the same sections, except when moving from the footer to the toolbar. Focusing the element path then pressing shift + tab will move focus to the first toolbar group, not the last.</p>\n\n<h2>Moving within UI sections</h2>\n\n<p>Keyboard navigation within UI sections can usually be achieved using the left and right arrow keys. This includes:</p>\n<ul>\n  <li>moving between menus in the menubar</li>\n  <li>moving between buttons in a toolbar group</li>\n  <li>moving between items in the element path</li>\n</ul>\n\n<p>In all these UI sections, keyboard navigation will cycle within the section. For example, focusing the last button in a toolbar group then pressing right arrow will move focus to the first item in the same toolbar group. </p>\n\n<h1>Executing buttons</h1>\n\n<p>To execute a button, navigate the selection to the desired button and hit space or enter.</p>\n\n<h1>Opening, navigating and closing menus</h1>\n\n<p>When focusing a menubar button or a toolbar button with a menu, pressing space, enter or down arrow will open the menu. When the menu opens the first item will be selected. To move up or down the menu, press the up or down arrow key respectively. This is the same for submenus, which can also be opened and closed using the left and right arrow keys.</p>\n\n<p>To close any active menu, hit the escape key. When a menu is closed the selection will be restored to its previous selection. This also works for closing submenus.</p>\n\n<h1>Context toolbars and menus</h1>\n\n<p>To focus an open context toolbar such as the table context toolbar, press Ctrl + F9 (Windows) or &#x2303;F9 (MacOS).</p>\n\n<p>Context toolbar navigation is the same as toolbar navigation, and context menu navigation is the same as standard menu navigation.</p>\n\n<h1>Dialog navigation</h1>\n\n<p>There are two types of dialog UIs in TinyMCE: tabbed dialogs and non-tabbed dialogs.</p>\n\n<p>When a non-tabbed dialog is opened, the first interactive component in the dialog will be focused. Users can navigate between interactive components by pressing tab. This includes any footer buttons. Navigation will cycle back to the first dialog component if tab is pressed while focusing the last component in the dialog. Pressing shift + tab will navigate backwards.</p>\n\n<p>When a tabbed dialog is opened, the first button in the tab menu is focused. Pressing tab will navigate to the first interactive component in that tab, and will cycle through the tab\u2019s components, the footer buttons, then back to the tab button. To switch to another tab, focus the tab button for the current tab, then use the arrow keys to cycle through the tab buttons.</p>';
    var tab$3 = function () {
      var body = {
        type: 'htmlpanel',
        presets: 'document',
        html: description
      };
      return {
        name: 'keyboardnav',
        title: 'Keyboard Navigation',
        items: [body]
      };
    };

    var parseHelpTabsSetting = function (tabsFromSettings, tabs) {
      var newTabs = {};
      var names = map(tabsFromSettings, function (t) {
        if (typeof t === 'string') {
          if (has(tabs, t)) {
            newTabs[t] = tabs[t];
          }
          return t;
        } else {
          newTabs[t.name] = t;
          return t.name;
        }
      });
      return {
        tabs: newTabs,
        names: names
      };
    };
    var getNamesFromTabs = function (tabs) {
      var names = keys(tabs);
      var idx = names.indexOf('versions');
      if (idx !== -1) {
        names.splice(idx, 1);
        names.push('versions');
      }
      return {
        tabs: tabs,
        names: names
      };
    };
    var parseCustomTabs = function (editor, customTabs) {
      var _a;
      var shortcuts = tab();
      var nav = tab$3();
      var plugins = tab$1(editor);
      var versions = tab$2();
      var tabs = __assign((_a = {}, _a[shortcuts.name] = shortcuts, _a[nav.name] = nav, _a[plugins.name] = plugins, _a[versions.name] = versions, _a), customTabs.get());
      return getHelpTabs(editor).fold(function () {
        return getNamesFromTabs(tabs);
      }, function (tabsFromSettings) {
        return parseHelpTabsSetting(tabsFromSettings, tabs);
      });
    };
    var init = function (editor, customTabs) {
      return function () {
        var _a = parseCustomTabs(editor, customTabs), tabs = _a.tabs, names = _a.names;
        var foundTabs = map(names, function (name) {
          return get$1(tabs, name);
        });
        var dialogTabs = cat(foundTabs);
        var body = {
          type: 'tabpanel',
          tabs: dialogTabs
        };
        editor.windowManager.open({
          title: 'Help',
          size: 'medium',
          body: body,
          buttons: [{
              type: 'cancel',
              name: 'close',
              text: 'Close',
              primary: true
            }],
          initialData: {}
        });
      };
    };

    function Plugin () {
      global.add('help', function (editor) {
        var customTabs = Cell({});
        var api = get(customTabs);
        var dialogOpener = init(editor, customTabs);
        register$1(editor, dialogOpener);
        register(editor, dialogOpener);
        editor.shortcuts.add('Alt+0', 'Open help dialog', 'mceHelp');
        return api;
      });
    }

    Plugin();

}());


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueW1jZS9wbHVnaW5zL2hlbHAvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQSxnREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsU0FBUztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFNBQVM7QUFDL0M7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEIsdUJBQXVCO0FBQ3ZCLHdCQUF3QjtBQUN4Qix1QkFBdUI7QUFDdkIseUJBQXlCLFFBQVE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsRUFBRTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLEVBQUU7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdVdBQXVXLHlFQUF5RSx5RUFBeUUsZzRFQUFnNEU7QUFDejNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTs7QUFFQSxDQUFDIiwiZmlsZSI6InZlbmRvcnN+dGlueW1jZS1wbHVnaW4taGVscH50aW55bWNlLXBsdWdpbi1oZWxwLXBsdWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBUaW55IFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIExHUEwgb3IgYSBjb21tZXJjaWFsIGxpY2Vuc2UuXG4gKiBGb3IgTEdQTCBzZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqIEZvciBjb21tZXJjaWFsIGxpY2Vuc2VzIHNlZSBodHRwczovL3d3dy50aW55LmNsb3VkL1xuICpcbiAqIFZlcnNpb246IDUuNC4yICgyMDIwLTA4LTE3KVxuICovXG4oZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBDZWxsID0gZnVuY3Rpb24gKGluaXRpYWwpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGluaXRpYWw7XG4gICAgICB2YXIgZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9O1xuICAgICAgdmFyIHNldCA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHZhbHVlID0gdjtcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBnZXQ6IGdldCxcbiAgICAgICAgc2V0OiBzZXRcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciBnbG9iYWwgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5QbHVnaW5NYW5hZ2VyJyk7XG5cbiAgICB2YXIgZ2V0ID0gZnVuY3Rpb24gKGN1c3RvbVRhYnMpIHtcbiAgICAgIHZhciBhZGRUYWIgPSBmdW5jdGlvbiAoc3BlYykge1xuICAgICAgICB2YXIgY3VycmVudEN1c3RvbVRhYnMgPSBjdXN0b21UYWJzLmdldCgpO1xuICAgICAgICBjdXJyZW50Q3VzdG9tVGFic1tzcGVjLm5hbWVdID0gc3BlYztcbiAgICAgICAgY3VzdG9tVGFicy5zZXQoY3VycmVudEN1c3RvbVRhYnMpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiB7IGFkZFRhYjogYWRkVGFiIH07XG4gICAgfTtcblxuICAgIHZhciByZWdpc3RlciA9IGZ1bmN0aW9uIChlZGl0b3IsIGRpYWxvZ09wZW5lcikge1xuICAgICAgZWRpdG9yLmFkZENvbW1hbmQoJ21jZUhlbHAnLCBkaWFsb2dPcGVuZXIpO1xuICAgIH07XG5cbiAgICB2YXIgcmVnaXN0ZXIkMSA9IGZ1bmN0aW9uIChlZGl0b3IsIGRpYWxvZ09wZW5lcikge1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZEJ1dHRvbignaGVscCcsIHtcbiAgICAgICAgaWNvbjogJ2hlbHAnLFxuICAgICAgICB0b29sdGlwOiAnSGVscCcsXG4gICAgICAgIG9uQWN0aW9uOiBkaWFsb2dPcGVuZXJcbiAgICAgIH0pO1xuICAgICAgZWRpdG9yLnVpLnJlZ2lzdHJ5LmFkZE1lbnVJdGVtKCdoZWxwJywge1xuICAgICAgICB0ZXh0OiAnSGVscCcsXG4gICAgICAgIGljb246ICdoZWxwJyxcbiAgICAgICAgc2hvcnRjdXQ6ICdBbHQrMCcsXG4gICAgICAgIG9uQWN0aW9uOiBkaWFsb2dPcGVuZXJcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgIGZvciAodmFyIHAgaW4gcylcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgICAgfTtcbiAgICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICB2YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHtcbiAgICB9O1xuICAgIHZhciBjb25zdGFudCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBuZXZlciA9IGNvbnN0YW50KGZhbHNlKTtcbiAgICB2YXIgYWx3YXlzID0gY29uc3RhbnQodHJ1ZSk7XG5cbiAgICB2YXIgbm9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBOT05FO1xuICAgIH07XG4gICAgdmFyIE5PTkUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgZXEgPSBmdW5jdGlvbiAobykge1xuICAgICAgICByZXR1cm4gby5pc05vbmUoKTtcbiAgICAgIH07XG4gICAgICB2YXIgY2FsbCA9IGZ1bmN0aW9uICh0aHVuaykge1xuICAgICAgICByZXR1cm4gdGh1bmsoKTtcbiAgICAgIH07XG4gICAgICB2YXIgaWQgPSBmdW5jdGlvbiAobikge1xuICAgICAgICByZXR1cm4gbjtcbiAgICAgIH07XG4gICAgICB2YXIgbWUgPSB7XG4gICAgICAgIGZvbGQ6IGZ1bmN0aW9uIChuLCBfcykge1xuICAgICAgICAgIHJldHVybiBuKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzOiBuZXZlcixcbiAgICAgICAgaXNTb21lOiBuZXZlcixcbiAgICAgICAgaXNOb25lOiBhbHdheXMsXG4gICAgICAgIGdldE9yOiBpZCxcbiAgICAgICAgZ2V0T3JUaHVuazogY2FsbCxcbiAgICAgICAgZ2V0T3JEaWU6IGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnIHx8ICdlcnJvcjogZ2V0T3JEaWUgY2FsbGVkIG9uIG5vbmUuJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldE9yTnVsbDogY29uc3RhbnQobnVsbCksXG4gICAgICAgIGdldE9yVW5kZWZpbmVkOiBjb25zdGFudCh1bmRlZmluZWQpLFxuICAgICAgICBvcjogaWQsXG4gICAgICAgIG9yVGh1bms6IGNhbGwsXG4gICAgICAgIG1hcDogbm9uZSxcbiAgICAgICAgZWFjaDogbm9vcCxcbiAgICAgICAgYmluZDogbm9uZSxcbiAgICAgICAgZXhpc3RzOiBuZXZlcixcbiAgICAgICAgZm9yYWxsOiBhbHdheXMsXG4gICAgICAgIGZpbHRlcjogbm9uZSxcbiAgICAgICAgZXF1YWxzOiBlcSxcbiAgICAgICAgZXF1YWxzXzogZXEsXG4gICAgICAgIHRvQXJyYXk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0sXG4gICAgICAgIHRvU3RyaW5nOiBjb25zdGFudCgnbm9uZSgpJylcbiAgICAgIH07XG4gICAgICByZXR1cm4gbWU7XG4gICAgfSgpO1xuICAgIHZhciBzb21lID0gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHZhciBjb25zdGFudF9hID0gY29uc3RhbnQoYSk7XG4gICAgICB2YXIgc2VsZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG1lO1xuICAgICAgfTtcbiAgICAgIHZhciBiaW5kID0gZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgcmV0dXJuIGYoYSk7XG4gICAgICB9O1xuICAgICAgdmFyIG1lID0ge1xuICAgICAgICBmb2xkOiBmdW5jdGlvbiAobiwgcykge1xuICAgICAgICAgIHJldHVybiBzKGEpO1xuICAgICAgICB9LFxuICAgICAgICBpczogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICByZXR1cm4gYSA9PT0gdjtcbiAgICAgICAgfSxcbiAgICAgICAgaXNTb21lOiBhbHdheXMsXG4gICAgICAgIGlzTm9uZTogbmV2ZXIsXG4gICAgICAgIGdldE9yOiBjb25zdGFudF9hLFxuICAgICAgICBnZXRPclRodW5rOiBjb25zdGFudF9hLFxuICAgICAgICBnZXRPckRpZTogY29uc3RhbnRfYSxcbiAgICAgICAgZ2V0T3JOdWxsOiBjb25zdGFudF9hLFxuICAgICAgICBnZXRPclVuZGVmaW5lZDogY29uc3RhbnRfYSxcbiAgICAgICAgb3I6IHNlbGYsXG4gICAgICAgIG9yVGh1bms6IHNlbGYsXG4gICAgICAgIG1hcDogZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICByZXR1cm4gc29tZShmKGEpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZWFjaDogZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICBmKGEpO1xuICAgICAgICB9LFxuICAgICAgICBiaW5kOiBiaW5kLFxuICAgICAgICBleGlzdHM6IGJpbmQsXG4gICAgICAgIGZvcmFsbDogYmluZCxcbiAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiAoZikge1xuICAgICAgICAgIHJldHVybiBmKGEpID8gbWUgOiBOT05FO1xuICAgICAgICB9LFxuICAgICAgICB0b0FycmF5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIFthXTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gJ3NvbWUoJyArIGEgKyAnKSc7XG4gICAgICAgIH0sXG4gICAgICAgIGVxdWFsczogZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgICByZXR1cm4gby5pcyhhKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXF1YWxzXzogZnVuY3Rpb24gKG8sIGVsZW1lbnRFcSkge1xuICAgICAgICAgIHJldHVybiBvLmZvbGQobmV2ZXIsIGZ1bmN0aW9uIChiKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudEVxKGEsIGIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIG1lO1xuICAgIH07XG4gICAgdmFyIGZyb20gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gTk9ORSA6IHNvbWUodmFsdWUpO1xuICAgIH07XG4gICAgdmFyIE9wdGlvbiA9IHtcbiAgICAgIHNvbWU6IHNvbWUsXG4gICAgICBub25lOiBub25lLFxuICAgICAgZnJvbTogZnJvbVxuICAgIH07XG5cbiAgICB2YXIgbmF0aXZlSW5kZXhPZiA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mO1xuICAgIHZhciByYXdJbmRleE9mID0gZnVuY3Rpb24gKHRzLCB0KSB7XG4gICAgICByZXR1cm4gbmF0aXZlSW5kZXhPZi5jYWxsKHRzLCB0KTtcbiAgICB9O1xuICAgIHZhciBjb250YWlucyA9IGZ1bmN0aW9uICh4cywgeCkge1xuICAgICAgcmV0dXJuIHJhd0luZGV4T2YoeHMsIHgpID4gLTE7XG4gICAgfTtcbiAgICB2YXIgbWFwID0gZnVuY3Rpb24gKHhzLCBmKSB7XG4gICAgICB2YXIgbGVuID0geHMubGVuZ3RoO1xuICAgICAgdmFyIHIgPSBuZXcgQXJyYXkobGVuKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHggPSB4c1tpXTtcbiAgICAgICAgcltpXSA9IGYoeCwgaSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcjtcbiAgICB9O1xuICAgIHZhciBmaWx0ZXIgPSBmdW5jdGlvbiAoeHMsIHByZWQpIHtcbiAgICAgIHZhciByID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0geHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHggPSB4c1tpXTtcbiAgICAgICAgaWYgKHByZWQoeCwgaSkpIHtcbiAgICAgICAgICByLnB1c2goeCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByO1xuICAgIH07XG4gICAgdmFyIGZpbmRVbnRpbCA9IGZ1bmN0aW9uICh4cywgcHJlZCwgdW50aWwpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB4cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgeCA9IHhzW2ldO1xuICAgICAgICBpZiAocHJlZCh4LCBpKSkge1xuICAgICAgICAgIHJldHVybiBPcHRpb24uc29tZSh4KTtcbiAgICAgICAgfSBlbHNlIGlmICh1bnRpbCh4LCBpKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gT3B0aW9uLm5vbmUoKTtcbiAgICB9O1xuICAgIHZhciBmaW5kID0gZnVuY3Rpb24gKHhzLCBwcmVkKSB7XG4gICAgICByZXR1cm4gZmluZFVudGlsKHhzLCBwcmVkLCBuZXZlcik7XG4gICAgfTtcblxuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXM7XG4gICAgdmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0Lmhhc093blByb3BlcnR5O1xuICAgIHZhciBnZXQkMSA9IGZ1bmN0aW9uIChvYmosIGtleSkge1xuICAgICAgcmV0dXJuIGhhcyhvYmosIGtleSkgPyBPcHRpb24uZnJvbShvYmpba2V5XSkgOiBPcHRpb24ubm9uZSgpO1xuICAgIH07XG4gICAgdmFyIGhhcyA9IGZ1bmN0aW9uIChvYmosIGtleSkge1xuICAgICAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xuICAgIH07XG5cbiAgICB2YXIgY2F0ID0gZnVuY3Rpb24gKGFycikge1xuICAgICAgdmFyIHIgPSBbXTtcbiAgICAgIHZhciBwdXNoID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgci5wdXNoKHgpO1xuICAgICAgfTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGFycltpXS5lYWNoKHB1c2gpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcblxuICAgIHZhciBnZXRIZWxwVGFicyA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHJldHVybiBPcHRpb24uZnJvbShlZGl0b3IuZ2V0UGFyYW0oJ2hlbHBfdGFicycpKTtcbiAgICB9O1xuICAgIHZhciBnZXRGb3JjZWRQbHVnaW5zID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgcmV0dXJuIGVkaXRvci5nZXRQYXJhbSgnZm9yY2VkX3BsdWdpbnMnKTtcbiAgICB9O1xuXG4gICAgdmFyIHNob3J0Y3V0cyA9IFtcbiAgICAgIHtcbiAgICAgICAgc2hvcnRjdXRzOiBbJ01ldGEgKyBCJ10sXG4gICAgICAgIGFjdGlvbjogJ0JvbGQnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzaG9ydGN1dHM6IFsnTWV0YSArIEknXSxcbiAgICAgICAgYWN0aW9uOiAnSXRhbGljJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc2hvcnRjdXRzOiBbJ01ldGEgKyBVJ10sXG4gICAgICAgIGFjdGlvbjogJ1VuZGVybGluZSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHNob3J0Y3V0czogWydNZXRhICsgQSddLFxuICAgICAgICBhY3Rpb246ICdTZWxlY3QgYWxsJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc2hvcnRjdXRzOiBbXG4gICAgICAgICAgJ01ldGEgKyBZJyxcbiAgICAgICAgICAnTWV0YSArIFNoaWZ0ICsgWidcbiAgICAgICAgXSxcbiAgICAgICAgYWN0aW9uOiAnUmVkbydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHNob3J0Y3V0czogWydNZXRhICsgWiddLFxuICAgICAgICBhY3Rpb246ICdVbmRvJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc2hvcnRjdXRzOiBbJ0FjY2VzcyArIDEnXSxcbiAgICAgICAgYWN0aW9uOiAnSGVhZGVyIDEnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzaG9ydGN1dHM6IFsnQWNjZXNzICsgMiddLFxuICAgICAgICBhY3Rpb246ICdIZWFkZXIgMidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHNob3J0Y3V0czogWydBY2Nlc3MgKyAzJ10sXG4gICAgICAgIGFjdGlvbjogJ0hlYWRlciAzJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc2hvcnRjdXRzOiBbJ0FjY2VzcyArIDQnXSxcbiAgICAgICAgYWN0aW9uOiAnSGVhZGVyIDQnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzaG9ydGN1dHM6IFsnQWNjZXNzICsgNSddLFxuICAgICAgICBhY3Rpb246ICdIZWFkZXIgNSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHNob3J0Y3V0czogWydBY2Nlc3MgKyA2J10sXG4gICAgICAgIGFjdGlvbjogJ0hlYWRlciA2J1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc2hvcnRjdXRzOiBbJ0FjY2VzcyArIDcnXSxcbiAgICAgICAgYWN0aW9uOiAnUGFyYWdyYXBoJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc2hvcnRjdXRzOiBbJ0FjY2VzcyArIDgnXSxcbiAgICAgICAgYWN0aW9uOiAnRGl2J1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc2hvcnRjdXRzOiBbJ0FjY2VzcyArIDknXSxcbiAgICAgICAgYWN0aW9uOiAnQWRkcmVzcydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHNob3J0Y3V0czogWydBbHQgKyAwJ10sXG4gICAgICAgIGFjdGlvbjogJ09wZW4gaGVscCBkaWFsb2cnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzaG9ydGN1dHM6IFsnQWx0ICsgRjknXSxcbiAgICAgICAgYWN0aW9uOiAnRm9jdXMgdG8gbWVudWJhcidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHNob3J0Y3V0czogWydBbHQgKyBGMTAnXSxcbiAgICAgICAgYWN0aW9uOiAnRm9jdXMgdG8gdG9vbGJhcidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHNob3J0Y3V0czogWydBbHQgKyBGMTEnXSxcbiAgICAgICAgYWN0aW9uOiAnRm9jdXMgdG8gZWxlbWVudCBwYXRoJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc2hvcnRjdXRzOiBbJ0N0cmwgKyBGOSddLFxuICAgICAgICBhY3Rpb246ICdGb2N1cyB0byBjb250ZXh0dWFsIHRvb2xiYXInXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzaG9ydGN1dHM6IFsnU2hpZnQgKyBFbnRlciddLFxuICAgICAgICBhY3Rpb246ICdPcGVuIHBvcHVwIG1lbnUgZm9yIHNwbGl0IGJ1dHRvbnMnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzaG9ydGN1dHM6IFsnTWV0YSArIEsnXSxcbiAgICAgICAgYWN0aW9uOiAnSW5zZXJ0IGxpbmsgKGlmIGxpbmsgcGx1Z2luIGFjdGl2YXRlZCknXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzaG9ydGN1dHM6IFsnTWV0YSArIFMnXSxcbiAgICAgICAgYWN0aW9uOiAnU2F2ZSAoaWYgc2F2ZSBwbHVnaW4gYWN0aXZhdGVkKSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHNob3J0Y3V0czogWydNZXRhICsgRiddLFxuICAgICAgICBhY3Rpb246ICdGaW5kIChpZiBzZWFyY2hyZXBsYWNlIHBsdWdpbiBhY3RpdmF0ZWQpJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc2hvcnRjdXRzOiBbJ01ldGEgKyBTaGlmdCArIEYnXSxcbiAgICAgICAgYWN0aW9uOiAnU3dpdGNoIHRvIG9yIGZyb20gZnVsbHNjcmVlbiBtb2RlJ1xuICAgICAgfVxuICAgIF07XG5cbiAgICB2YXIgZ2xvYmFsJDEgPSB0aW55bWNlLnV0aWwuVG9vbHMucmVzb2x2ZSgndGlueW1jZS5FbnYnKTtcblxuICAgIHZhciBjb252ZXJ0VGV4dCA9IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHZhciBtYWMgPSB7XG4gICAgICAgIGFsdDogJyYjeDIzMjU7JyxcbiAgICAgICAgY3RybDogJyYjeDIzMDM7JyxcbiAgICAgICAgc2hpZnQ6ICcmI3gyMUU3OycsXG4gICAgICAgIG1ldGE6ICcmI3gyMzE4OycsXG4gICAgICAgIGFjY2VzczogJyYjeDIzMDM7JiN4MjMyNTsnXG4gICAgICB9O1xuICAgICAgdmFyIG90aGVyID0ge1xuICAgICAgICBtZXRhOiAnQ3RybCAnLFxuICAgICAgICBhY2Nlc3M6ICdTaGlmdCArIEFsdCAnXG4gICAgICB9O1xuICAgICAgdmFyIHJlcGxhY2UgPSBnbG9iYWwkMS5tYWMgPyBtYWMgOiBvdGhlcjtcbiAgICAgIHZhciBzaG9ydGN1dCA9IHNvdXJjZS5zcGxpdCgnKycpO1xuICAgICAgdmFyIHVwZGF0ZWQgPSBtYXAoc2hvcnRjdXQsIGZ1bmN0aW9uIChzZWdtZW50KSB7XG4gICAgICAgIHZhciBzZWFyY2ggPSBzZWdtZW50LnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICAgICAgICByZXR1cm4gaGFzKHJlcGxhY2UsIHNlYXJjaCkgPyByZXBsYWNlW3NlYXJjaF0gOiBzZWdtZW50O1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZ2xvYmFsJDEubWFjID8gdXBkYXRlZC5qb2luKCcnKS5yZXBsYWNlKC9cXHMvLCAnJykgOiB1cGRhdGVkLmpvaW4oJysnKTtcbiAgICB9O1xuXG4gICAgdmFyIHRhYiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzaG9ydGN1dExpc3QgPSBtYXAoc2hvcnRjdXRzLCBmdW5jdGlvbiAoc2hvcnRjdXQpIHtcbiAgICAgICAgdmFyIHNob3J0Y3V0VGV4dCA9IG1hcChzaG9ydGN1dC5zaG9ydGN1dHMsIGNvbnZlcnRUZXh0KS5qb2luKCcgb3IgJyk7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgc2hvcnRjdXQuYWN0aW9uLFxuICAgICAgICAgIHNob3J0Y3V0VGV4dFxuICAgICAgICBdO1xuICAgICAgfSk7XG4gICAgICB2YXIgdGFibGVQYW5lbCA9IHtcbiAgICAgICAgdHlwZTogJ3RhYmxlJyxcbiAgICAgICAgaGVhZGVyOiBbXG4gICAgICAgICAgJ0FjdGlvbicsXG4gICAgICAgICAgJ1Nob3J0Y3V0J1xuICAgICAgICBdLFxuICAgICAgICBjZWxsczogc2hvcnRjdXRMaXN0XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogJ3Nob3J0Y3V0cycsXG4gICAgICAgIHRpdGxlOiAnSGFuZHkgU2hvcnRjdXRzJyxcbiAgICAgICAgaXRlbXM6IFt0YWJsZVBhbmVsXVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIGdsb2JhbCQyID0gdGlueW1jZS51dGlsLlRvb2xzLnJlc29sdmUoJ3RpbnltY2UudXRpbC5JMThuJyk7XG5cbiAgICB2YXIgdXJscyA9IFtcbiAgICAgIHtcbiAgICAgICAga2V5OiAnYWR2bGlzdCcsXG4gICAgICAgIG5hbWU6ICdBZHZhbmNlZCBMaXN0J1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAnYW5jaG9yJyxcbiAgICAgICAgbmFtZTogJ0FuY2hvcidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ2F1dG9saW5rJyxcbiAgICAgICAgbmFtZTogJ0F1dG9saW5rJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAnYXV0b3Jlc2l6ZScsXG4gICAgICAgIG5hbWU6ICdBdXRvcmVzaXplJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAnYXV0b3NhdmUnLFxuICAgICAgICBuYW1lOiAnQXV0b3NhdmUnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXk6ICdiYmNvZGUnLFxuICAgICAgICBuYW1lOiAnQkJDb2RlJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAnY2hhcm1hcCcsXG4gICAgICAgIG5hbWU6ICdDaGFyYWN0ZXIgTWFwJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAnY29kZScsXG4gICAgICAgIG5hbWU6ICdDb2RlJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAnY29kZXNhbXBsZScsXG4gICAgICAgIG5hbWU6ICdDb2RlIFNhbXBsZSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ2NvbG9ycGlja2VyJyxcbiAgICAgICAgbmFtZTogJ0NvbG9yIFBpY2tlcidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ2RpcmVjdGlvbmFsaXR5JyxcbiAgICAgICAgbmFtZTogJ0RpcmVjdGlvbmFsaXR5J1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAnZW1vdGljb25zJyxcbiAgICAgICAgbmFtZTogJ0Vtb3RpY29ucydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ2Z1bGxwYWdlJyxcbiAgICAgICAgbmFtZTogJ0Z1bGwgUGFnZSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ2Z1bGxzY3JlZW4nLFxuICAgICAgICBuYW1lOiAnRnVsbCBTY3JlZW4nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXk6ICdoZWxwJyxcbiAgICAgICAgbmFtZTogJ0hlbHAnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXk6ICdocicsXG4gICAgICAgIG5hbWU6ICdIb3Jpem9udGFsIFJ1bGUnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXk6ICdpbWFnZScsXG4gICAgICAgIG5hbWU6ICdJbWFnZSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ2ltYWdldG9vbHMnLFxuICAgICAgICBuYW1lOiAnSW1hZ2UgVG9vbHMnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXk6ICdpbXBvcnRjc3MnLFxuICAgICAgICBuYW1lOiAnSW1wb3J0IENTUydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ2luc2VydGRhdGV0aW1lJyxcbiAgICAgICAgbmFtZTogJ0luc2VydCBEYXRlL1RpbWUnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXk6ICdsZWdhY3lvdXRwdXQnLFxuICAgICAgICBuYW1lOiAnTGVnYWN5IE91dHB1dCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ2xpbmsnLFxuICAgICAgICBuYW1lOiAnTGluaydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ2xpc3RzJyxcbiAgICAgICAgbmFtZTogJ0xpc3RzJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAnbWVkaWEnLFxuICAgICAgICBuYW1lOiAnTWVkaWEnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXk6ICdub25icmVha2luZycsXG4gICAgICAgIG5hbWU6ICdOb25icmVha2luZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ25vbmVkaXRhYmxlJyxcbiAgICAgICAgbmFtZTogJ05vbmVkaXRhYmxlJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAncGFnZWJyZWFrJyxcbiAgICAgICAgbmFtZTogJ1BhZ2UgQnJlYWsnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXk6ICdwYXN0ZScsXG4gICAgICAgIG5hbWU6ICdQYXN0ZSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ3ByZXZpZXcnLFxuICAgICAgICBuYW1lOiAnUHJldmlldydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ3ByaW50JyxcbiAgICAgICAgbmFtZTogJ1ByaW50J1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAnc2F2ZScsXG4gICAgICAgIG5hbWU6ICdTYXZlJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAnc2VhcmNocmVwbGFjZScsXG4gICAgICAgIG5hbWU6ICdTZWFyY2ggYW5kIFJlcGxhY2UnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXk6ICdzcGVsbGNoZWNrZXInLFxuICAgICAgICBuYW1lOiAnU3BlbGwgQ2hlY2tlcidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ3RhYmZvY3VzJyxcbiAgICAgICAgbmFtZTogJ1RhYiBGb2N1cydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ3RhYmxlJyxcbiAgICAgICAgbmFtZTogJ1RhYmxlJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAndGVtcGxhdGUnLFxuICAgICAgICBuYW1lOiAnVGVtcGxhdGUnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXk6ICd0ZXh0Y29sb3InLFxuICAgICAgICBuYW1lOiAnVGV4dCBDb2xvcidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ3RleHRwYXR0ZXJuJyxcbiAgICAgICAgbmFtZTogJ1RleHQgUGF0dGVybidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ3RvYycsXG4gICAgICAgIG5hbWU6ICdUYWJsZSBvZiBDb250ZW50cydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ3Zpc3VhbGJsb2NrcycsXG4gICAgICAgIG5hbWU6ICdWaXN1YWwgQmxvY2tzJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAndmlzdWFsY2hhcnMnLFxuICAgICAgICBuYW1lOiAnVmlzdWFsIENoYXJhY3RlcnMnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXk6ICd3b3JkY291bnQnLFxuICAgICAgICBuYW1lOiAnV29yZCBDb3VudCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ2FkdmNvZGUnLFxuICAgICAgICBuYW1lOiAnQWR2YW5jZWQgQ29kZSBFZGl0b3IqJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAnZm9ybWF0cGFpbnRlcicsXG4gICAgICAgIG5hbWU6ICdGb3JtYXQgUGFpbnRlcionXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXk6ICdwb3dlcnBhc3RlJyxcbiAgICAgICAgbmFtZTogJ1Bvd2VyUGFzdGUqJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAndGlueWRyaXZlJyxcbiAgICAgICAgbmFtZTogJ1RpbnkgRHJpdmUqJyxcbiAgICAgICAgc2x1ZzogJ2RyaXZlJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAndGlueW1jZXNwZWxsY2hlY2tlcicsXG4gICAgICAgIG5hbWU6ICdTcGVsbCBDaGVja2VyIFBybyonXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXk6ICdhMTF5Y2hlY2tlcicsXG4gICAgICAgIG5hbWU6ICdBY2Nlc3NpYmlsaXR5IENoZWNrZXIqJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAnbGlua2NoZWNrZXInLFxuICAgICAgICBuYW1lOiAnTGluayBDaGVja2VyKidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ21lbnRpb25zJyxcbiAgICAgICAgbmFtZTogJ01lbnRpb25zKidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ21lZGlhZW1iZWQnLFxuICAgICAgICBuYW1lOiAnRW5oYW5jZWQgTWVkaWEgRW1iZWQqJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5OiAnY2hlY2tsaXN0JyxcbiAgICAgICAgbmFtZTogJ0NoZWNrbGlzdConXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXk6ICdjYXNlY2hhbmdlJyxcbiAgICAgICAgbmFtZTogJ0Nhc2UgQ2hhbmdlKidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ3Blcm1hbmVudHBlbicsXG4gICAgICAgIG5hbWU6ICdQZXJtYW5lbnQgUGVuKidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ3BhZ2VlbWJlZCcsXG4gICAgICAgIG5hbWU6ICdQYWdlIEVtYmVkKidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ3Rpbnljb21tZW50cycsXG4gICAgICAgIG5hbWU6ICdUaW55IENvbW1lbnRzKicsXG4gICAgICAgIHNsdWc6ICdjb21tZW50cydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleTogJ2FkdnRhYmxlJyxcbiAgICAgICAgbmFtZTogJ0FkdmFuY2VkIFRhYmxlcyonXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXk6ICdhdXRvY29ycmVjdCcsXG4gICAgICAgIG5hbWU6ICdBdXRvY29ycmVjdConXG4gICAgICB9XG4gICAgXTtcblxuICAgIHZhciB0YWIkMSA9IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBhdmFpbGFibGVQbHVnaW5zID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcHJlbWl1bVBsdWdpbnMgPSBbXG4gICAgICAgICAgJ0FjY2Vzc2liaWxpdHkgQ2hlY2tlcicsXG4gICAgICAgICAgJ0FkdmFuY2VkIENvZGUgRWRpdG9yJyxcbiAgICAgICAgICAnQWR2YW5jZWQgVGFibGVzJyxcbiAgICAgICAgICAnQ2FzZSBDaGFuZ2UnLFxuICAgICAgICAgICdDaGVja2xpc3QnLFxuICAgICAgICAgICdUaW55IENvbW1lbnRzJyxcbiAgICAgICAgICAnVGlueSBEcml2ZScsXG4gICAgICAgICAgJ0VuaGFuY2VkIE1lZGlhIEVtYmVkJyxcbiAgICAgICAgICAnRm9ybWF0IFBhaW50ZXInLFxuICAgICAgICAgICdMaW5rIENoZWNrZXInLFxuICAgICAgICAgICdNZW50aW9ucycsXG4gICAgICAgICAgJ01veGllTWFuYWdlcicsXG4gICAgICAgICAgJ1BhZ2UgRW1iZWQnLFxuICAgICAgICAgICdQZXJtYW5lbnQgUGVuJyxcbiAgICAgICAgICAnUG93ZXJQYXN0ZScsXG4gICAgICAgICAgJ1NwZWxsIENoZWNrZXIgUHJvJ1xuICAgICAgICBdO1xuICAgICAgICB2YXIgcHJlbWl1bVBsdWdpbkxpc3QgPSBtYXAocHJlbWl1bVBsdWdpbnMsIGZ1bmN0aW9uIChwbHVnaW4pIHtcbiAgICAgICAgICByZXR1cm4gJzxsaT4nICsgZ2xvYmFsJDIudHJhbnNsYXRlKHBsdWdpbikgKyAnPC9saT4nO1xuICAgICAgICB9KS5qb2luKCcnKTtcbiAgICAgICAgcmV0dXJuICc8ZGl2IGRhdGEtbWNlLXRhYnN0b3A9XCIxXCIgdGFiaW5kZXg9XCItMVwiPicgKyAnPHA+PGI+JyArIGdsb2JhbCQyLnRyYW5zbGF0ZSgnUHJlbWl1bSBwbHVnaW5zOicpICsgJzwvYj48L3A+JyArICc8dWw+JyArIHByZW1pdW1QbHVnaW5MaXN0ICsgJzxsaSBjbGFzcz1cInRveC1oZWxwX19tb3JlLWxpbmtcIiBcIj48YSBocmVmPVwiaHR0cHM6Ly93d3cudGlueS5jbG91ZC9wcmljaW5nLz91dG1fY2FtcGFpZ249ZWRpdG9yX3JlZmVycmFsJnV0bV9tZWRpdW09aGVscF9kaWFsb2cmdXRtX3NvdXJjZT10aW55bWNlXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JyArIGdsb2JhbCQyLnRyYW5zbGF0ZSgnTGVhcm4gbW9yZS4uLicpICsgJzwvYT48L2xpPicgKyAnPC91bD4nICsgJzwvZGl2Pic7XG4gICAgICB9O1xuICAgICAgdmFyIG1ha2VMaW5rID0gZnVuY3Rpb24gKHApIHtcbiAgICAgICAgcmV0dXJuICc8YSBocmVmPVwiJyArIHAudXJsICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyXCI+JyArIHAubmFtZSArICc8L2E+JztcbiAgICAgIH07XG4gICAgICB2YXIgbWF5YmVVcmxpemUgPSBmdW5jdGlvbiAoZWRpdG9yLCBrZXkpIHtcbiAgICAgICAgcmV0dXJuIGZpbmQodXJscywgZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICByZXR1cm4geC5rZXkgPT09IGtleTtcbiAgICAgICAgfSkuZm9sZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGdldE1ldGFkYXRhID0gZWRpdG9yLnBsdWdpbnNba2V5XS5nZXRNZXRhZGF0YTtcbiAgICAgICAgICByZXR1cm4gdHlwZW9mIGdldE1ldGFkYXRhID09PSAnZnVuY3Rpb24nID8gbWFrZUxpbmsoZ2V0TWV0YWRhdGEoKSkgOiBrZXk7XG4gICAgICAgIH0sIGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgdmFyIHVybFNsdWcgPSB4LnNsdWcgfHwgeC5rZXk7XG4gICAgICAgICAgcmV0dXJuIG1ha2VMaW5rKHtcbiAgICAgICAgICAgIG5hbWU6IHgubmFtZSxcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vd3d3LnRpbnkuY2xvdWQvZG9jcy9wbHVnaW5zLycgKyB1cmxTbHVnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIHZhciBnZXRQbHVnaW5LZXlzID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICB2YXIga2V5cyQxID0ga2V5cyhlZGl0b3IucGx1Z2lucyk7XG4gICAgICAgIHZhciBmb3JjZWRfcGx1Z2lucyA9IGdldEZvcmNlZFBsdWdpbnMoZWRpdG9yKTtcbiAgICAgICAgcmV0dXJuIGZvcmNlZF9wbHVnaW5zID09PSB1bmRlZmluZWQgPyBrZXlzJDEgOiBmaWx0ZXIoa2V5cyQxLCBmdW5jdGlvbiAoaykge1xuICAgICAgICAgIHJldHVybiAhY29udGFpbnMoZm9yY2VkX3BsdWdpbnMsIGspO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICB2YXIgcGx1Z2luTGlzdGVyID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICB2YXIgcGx1Z2luS2V5cyA9IGdldFBsdWdpbktleXMoZWRpdG9yKTtcbiAgICAgICAgdmFyIHBsdWdpbkxpcyA9IG1hcChwbHVnaW5LZXlzLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgcmV0dXJuICc8bGk+JyArIG1heWJlVXJsaXplKGVkaXRvciwga2V5KSArICc8L2xpPic7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgY291bnQgPSBwbHVnaW5MaXMubGVuZ3RoO1xuICAgICAgICB2YXIgcGx1Z2luc1N0cmluZyA9IHBsdWdpbkxpcy5qb2luKCcnKTtcbiAgICAgICAgdmFyIGh0bWwgPSAnPHA+PGI+JyArIGdsb2JhbCQyLnRyYW5zbGF0ZShbXG4gICAgICAgICAgJ1BsdWdpbnMgaW5zdGFsbGVkICh7MH0pOicsXG4gICAgICAgICAgY291bnRcbiAgICAgICAgXSkgKyAnPC9iPjwvcD4nICsgJzx1bD4nICsgcGx1Z2luc1N0cmluZyArICc8L3VsPic7XG4gICAgICAgIHJldHVybiBodG1sO1xuICAgICAgfTtcbiAgICAgIHZhciBpbnN0YWxsZWRQbHVnaW5zID0gZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICBpZiAoZWRpdG9yID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICc8ZGl2IGRhdGEtbWNlLXRhYnN0b3A9XCIxXCIgdGFiaW5kZXg9XCItMVwiPicgKyBwbHVnaW5MaXN0ZXIoZWRpdG9yKSArICc8L2Rpdj4nO1xuICAgICAgfTtcbiAgICAgIHZhciBodG1sUGFuZWwgPSB7XG4gICAgICAgIHR5cGU6ICdodG1scGFuZWwnLFxuICAgICAgICBwcmVzZXRzOiAnZG9jdW1lbnQnLFxuICAgICAgICBodG1sOiBbXG4gICAgICAgICAgaW5zdGFsbGVkUGx1Z2lucyhlZGl0b3IpLFxuICAgICAgICAgIGF2YWlsYWJsZVBsdWdpbnMoKVxuICAgICAgICBdLmpvaW4oJycpXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogJ3BsdWdpbnMnLFxuICAgICAgICB0aXRsZTogJ1BsdWdpbnMnLFxuICAgICAgICBpdGVtczogW2h0bWxQYW5lbF1cbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciBnbG9iYWwkMyA9IHRpbnltY2UudXRpbC5Ub29scy5yZXNvbHZlKCd0aW55bWNlLkVkaXRvck1hbmFnZXInKTtcblxuICAgIHZhciB0YWIkMiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBnZXRWZXJzaW9uID0gZnVuY3Rpb24gKG1ham9yLCBtaW5vcikge1xuICAgICAgICByZXR1cm4gbWFqb3IuaW5kZXhPZignQCcpID09PSAwID8gJ1guWC5YJyA6IG1ham9yICsgJy4nICsgbWlub3I7XG4gICAgICB9O1xuICAgICAgdmFyIHZlcnNpb24gPSBnZXRWZXJzaW9uKGdsb2JhbCQzLm1ham9yVmVyc2lvbiwgZ2xvYmFsJDMubWlub3JWZXJzaW9uKTtcbiAgICAgIHZhciBjaGFuZ2VMb2dMaW5rID0gJzxhIGhyZWY9XCJodHRwczovL3d3dy50aW55bWNlLmNvbS9kb2NzL2NoYW5nZWxvZy8/dXRtX2NhbXBhaWduPWVkaXRvcl9yZWZlcnJhbCZ1dG1fbWVkaXVtPWhlbHBfZGlhbG9nJnV0bV9zb3VyY2U9dGlueW1jZVwiIHRhcmdldD1cIl9ibGFua1wiPlRpbnlNQ0UgJyArIHZlcnNpb24gKyAnPC9hPic7XG4gICAgICB2YXIgaHRtbFBhbmVsID0ge1xuICAgICAgICB0eXBlOiAnaHRtbHBhbmVsJyxcbiAgICAgICAgaHRtbDogJzxwPicgKyBnbG9iYWwkMi50cmFuc2xhdGUoW1xuICAgICAgICAgICdZb3UgYXJlIHVzaW5nIHswfScsXG4gICAgICAgICAgY2hhbmdlTG9nTGlua1xuICAgICAgICBdKSArICc8L3A+JyxcbiAgICAgICAgcHJlc2V0czogJ2RvY3VtZW50J1xuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICd2ZXJzaW9ucycsXG4gICAgICAgIHRpdGxlOiAnVmVyc2lvbicsXG4gICAgICAgIGl0ZW1zOiBbaHRtbFBhbmVsXVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIGRlc2NyaXB0aW9uID0gJzxoMT5FZGl0b3IgVUkga2V5Ym9hcmQgbmF2aWdhdGlvbjwvaDE+XFxuXFxuPGgyPkFjdGl2YXRpbmcga2V5Ym9hcmQgbmF2aWdhdGlvbjwvaDI+XFxuXFxuPHA+VGhlIHNlY3Rpb25zIG9mIHRoZSBvdXRlciBVSSBvZiB0aGUgZWRpdG9yIC0gdGhlIG1lbnViYXIsIHRvb2xiYXIsIHNpZGViYXIgYW5kIGZvb3RlciAtIGFyZSBhbGwga2V5Ym9hcmQgbmF2aWdhYmxlLiBBcyBzdWNoLCB0aGVyZSBhcmUgbXVsdGlwbGUgd2F5cyB0byBhY3RpdmF0ZSBrZXlib2FyZCBuYXZpZ2F0aW9uOjwvcD5cXG48dWw+XFxuICA8bGk+Rm9jdXMgdGhlIG1lbnViYXI6IEFsdCArIEY5IChXaW5kb3dzKSBvciAmI3gyMzI1O0Y5IChNYWNPUyk8L2xpPlxcbiAgPGxpPkZvY3VzIHRoZSB0b29sYmFyOiBBbHQgKyBGMTAgKFdpbmRvd3MpIG9yICYjeDIzMjU7RjEwIChNYWNPUyk8L2xpPlxcbiAgPGxpPkZvY3VzIHRoZSBmb290ZXI6IEFsdCArIEYxMSAoV2luZG93cykgb3IgJiN4MjMyNTtGMTEgKE1hY09TKTwvbGk+XFxuPC91bD5cXG5cXG48cD5Gb2N1c2luZyB0aGUgbWVudWJhciBvciB0b29sYmFyIHdpbGwgc3RhcnQga2V5Ym9hcmQgbmF2aWdhdGlvbiBhdCB0aGUgZmlyc3QgaXRlbSBpbiB0aGUgbWVudWJhciBvciB0b29sYmFyLCB3aGljaCB3aWxsIGJlIGhpZ2hsaWdodGVkIHdpdGggYSBncmF5IGJhY2tncm91bmQuIEZvY3VzaW5nIHRoZSBmb290ZXIgd2lsbCBzdGFydCBrZXlib2FyZCBuYXZpZ2F0aW9uIGF0IHRoZSBmaXJzdCBpdGVtIGluIHRoZSBlbGVtZW50IHBhdGgsIHdoaWNoIHdpbGwgYmUgaGlnaGxpZ2h0ZWQgd2l0aCBhbiB1bmRlcmxpbmUuIDwvcD5cXG5cXG48aDI+TW92aW5nIGJldHdlZW4gVUkgc2VjdGlvbnM8L2gyPlxcblxcbjxwPldoZW4ga2V5Ym9hcmQgbmF2aWdhdGlvbiBpcyBhY3RpdmUsIHByZXNzaW5nIHRhYiB3aWxsIG1vdmUgdGhlIGZvY3VzIHRvIHRoZSBuZXh0IG1ham9yIHNlY3Rpb24gb2YgdGhlIFVJLCB3aGVyZSBhcHBsaWNhYmxlLiBUaGVzZSBzZWN0aW9ucyBhcmU6PC9wPlxcbjx1bD5cXG4gIDxsaT50aGUgbWVudWJhcjwvbGk+XFxuICA8bGk+ZWFjaCBncm91cCBvZiB0aGUgdG9vbGJhciA8L2xpPlxcbiAgPGxpPnRoZSBzaWRlYmFyPC9saT5cXG4gIDxsaT50aGUgZWxlbWVudCBwYXRoIGluIHRoZSBmb290ZXIgPC9saT5cXG4gIDxsaT50aGUgd29yZGNvdW50IHRvZ2dsZSBidXR0b24gaW4gdGhlIGZvb3RlciA8L2xpPlxcbiAgPGxpPnRoZSBicmFuZGluZyBsaW5rIGluIHRoZSBmb290ZXIgPC9saT5cXG48L3VsPlxcblxcbjxwPlByZXNzaW5nIHNoaWZ0ICsgdGFiIHdpbGwgbW92ZSBiYWNrd2FyZHMgdGhyb3VnaCB0aGUgc2FtZSBzZWN0aW9ucywgZXhjZXB0IHdoZW4gbW92aW5nIGZyb20gdGhlIGZvb3RlciB0byB0aGUgdG9vbGJhci4gRm9jdXNpbmcgdGhlIGVsZW1lbnQgcGF0aCB0aGVuIHByZXNzaW5nIHNoaWZ0ICsgdGFiIHdpbGwgbW92ZSBmb2N1cyB0byB0aGUgZmlyc3QgdG9vbGJhciBncm91cCwgbm90IHRoZSBsYXN0LjwvcD5cXG5cXG48aDI+TW92aW5nIHdpdGhpbiBVSSBzZWN0aW9uczwvaDI+XFxuXFxuPHA+S2V5Ym9hcmQgbmF2aWdhdGlvbiB3aXRoaW4gVUkgc2VjdGlvbnMgY2FuIHVzdWFsbHkgYmUgYWNoaWV2ZWQgdXNpbmcgdGhlIGxlZnQgYW5kIHJpZ2h0IGFycm93IGtleXMuIFRoaXMgaW5jbHVkZXM6PC9wPlxcbjx1bD5cXG4gIDxsaT5tb3ZpbmcgYmV0d2VlbiBtZW51cyBpbiB0aGUgbWVudWJhcjwvbGk+XFxuICA8bGk+bW92aW5nIGJldHdlZW4gYnV0dG9ucyBpbiBhIHRvb2xiYXIgZ3JvdXA8L2xpPlxcbiAgPGxpPm1vdmluZyBiZXR3ZWVuIGl0ZW1zIGluIHRoZSBlbGVtZW50IHBhdGg8L2xpPlxcbjwvdWw+XFxuXFxuPHA+SW4gYWxsIHRoZXNlIFVJIHNlY3Rpb25zLCBrZXlib2FyZCBuYXZpZ2F0aW9uIHdpbGwgY3ljbGUgd2l0aGluIHRoZSBzZWN0aW9uLiBGb3IgZXhhbXBsZSwgZm9jdXNpbmcgdGhlIGxhc3QgYnV0dG9uIGluIGEgdG9vbGJhciBncm91cCB0aGVuIHByZXNzaW5nIHJpZ2h0IGFycm93IHdpbGwgbW92ZSBmb2N1cyB0byB0aGUgZmlyc3QgaXRlbSBpbiB0aGUgc2FtZSB0b29sYmFyIGdyb3VwLiA8L3A+XFxuXFxuPGgxPkV4ZWN1dGluZyBidXR0b25zPC9oMT5cXG5cXG48cD5UbyBleGVjdXRlIGEgYnV0dG9uLCBuYXZpZ2F0ZSB0aGUgc2VsZWN0aW9uIHRvIHRoZSBkZXNpcmVkIGJ1dHRvbiBhbmQgaGl0IHNwYWNlIG9yIGVudGVyLjwvcD5cXG5cXG48aDE+T3BlbmluZywgbmF2aWdhdGluZyBhbmQgY2xvc2luZyBtZW51czwvaDE+XFxuXFxuPHA+V2hlbiBmb2N1c2luZyBhIG1lbnViYXIgYnV0dG9uIG9yIGEgdG9vbGJhciBidXR0b24gd2l0aCBhIG1lbnUsIHByZXNzaW5nIHNwYWNlLCBlbnRlciBvciBkb3duIGFycm93IHdpbGwgb3BlbiB0aGUgbWVudS4gV2hlbiB0aGUgbWVudSBvcGVucyB0aGUgZmlyc3QgaXRlbSB3aWxsIGJlIHNlbGVjdGVkLiBUbyBtb3ZlIHVwIG9yIGRvd24gdGhlIG1lbnUsIHByZXNzIHRoZSB1cCBvciBkb3duIGFycm93IGtleSByZXNwZWN0aXZlbHkuIFRoaXMgaXMgdGhlIHNhbWUgZm9yIHN1Ym1lbnVzLCB3aGljaCBjYW4gYWxzbyBiZSBvcGVuZWQgYW5kIGNsb3NlZCB1c2luZyB0aGUgbGVmdCBhbmQgcmlnaHQgYXJyb3cga2V5cy48L3A+XFxuXFxuPHA+VG8gY2xvc2UgYW55IGFjdGl2ZSBtZW51LCBoaXQgdGhlIGVzY2FwZSBrZXkuIFdoZW4gYSBtZW51IGlzIGNsb3NlZCB0aGUgc2VsZWN0aW9uIHdpbGwgYmUgcmVzdG9yZWQgdG8gaXRzIHByZXZpb3VzIHNlbGVjdGlvbi4gVGhpcyBhbHNvIHdvcmtzIGZvciBjbG9zaW5nIHN1Ym1lbnVzLjwvcD5cXG5cXG48aDE+Q29udGV4dCB0b29sYmFycyBhbmQgbWVudXM8L2gxPlxcblxcbjxwPlRvIGZvY3VzIGFuIG9wZW4gY29udGV4dCB0b29sYmFyIHN1Y2ggYXMgdGhlIHRhYmxlIGNvbnRleHQgdG9vbGJhciwgcHJlc3MgQ3RybCArIEY5IChXaW5kb3dzKSBvciAmI3gyMzAzO0Y5IChNYWNPUykuPC9wPlxcblxcbjxwPkNvbnRleHQgdG9vbGJhciBuYXZpZ2F0aW9uIGlzIHRoZSBzYW1lIGFzIHRvb2xiYXIgbmF2aWdhdGlvbiwgYW5kIGNvbnRleHQgbWVudSBuYXZpZ2F0aW9uIGlzIHRoZSBzYW1lIGFzIHN0YW5kYXJkIG1lbnUgbmF2aWdhdGlvbi48L3A+XFxuXFxuPGgxPkRpYWxvZyBuYXZpZ2F0aW9uPC9oMT5cXG5cXG48cD5UaGVyZSBhcmUgdHdvIHR5cGVzIG9mIGRpYWxvZyBVSXMgaW4gVGlueU1DRTogdGFiYmVkIGRpYWxvZ3MgYW5kIG5vbi10YWJiZWQgZGlhbG9ncy48L3A+XFxuXFxuPHA+V2hlbiBhIG5vbi10YWJiZWQgZGlhbG9nIGlzIG9wZW5lZCwgdGhlIGZpcnN0IGludGVyYWN0aXZlIGNvbXBvbmVudCBpbiB0aGUgZGlhbG9nIHdpbGwgYmUgZm9jdXNlZC4gVXNlcnMgY2FuIG5hdmlnYXRlIGJldHdlZW4gaW50ZXJhY3RpdmUgY29tcG9uZW50cyBieSBwcmVzc2luZyB0YWIuIFRoaXMgaW5jbHVkZXMgYW55IGZvb3RlciBidXR0b25zLiBOYXZpZ2F0aW9uIHdpbGwgY3ljbGUgYmFjayB0byB0aGUgZmlyc3QgZGlhbG9nIGNvbXBvbmVudCBpZiB0YWIgaXMgcHJlc3NlZCB3aGlsZSBmb2N1c2luZyB0aGUgbGFzdCBjb21wb25lbnQgaW4gdGhlIGRpYWxvZy4gUHJlc3Npbmcgc2hpZnQgKyB0YWIgd2lsbCBuYXZpZ2F0ZSBiYWNrd2FyZHMuPC9wPlxcblxcbjxwPldoZW4gYSB0YWJiZWQgZGlhbG9nIGlzIG9wZW5lZCwgdGhlIGZpcnN0IGJ1dHRvbiBpbiB0aGUgdGFiIG1lbnUgaXMgZm9jdXNlZC4gUHJlc3NpbmcgdGFiIHdpbGwgbmF2aWdhdGUgdG8gdGhlIGZpcnN0IGludGVyYWN0aXZlIGNvbXBvbmVudCBpbiB0aGF0IHRhYiwgYW5kIHdpbGwgY3ljbGUgdGhyb3VnaCB0aGUgdGFiXFx1MjAxOXMgY29tcG9uZW50cywgdGhlIGZvb3RlciBidXR0b25zLCB0aGVuIGJhY2sgdG8gdGhlIHRhYiBidXR0b24uIFRvIHN3aXRjaCB0byBhbm90aGVyIHRhYiwgZm9jdXMgdGhlIHRhYiBidXR0b24gZm9yIHRoZSBjdXJyZW50IHRhYiwgdGhlbiB1c2UgdGhlIGFycm93IGtleXMgdG8gY3ljbGUgdGhyb3VnaCB0aGUgdGFiIGJ1dHRvbnMuPC9wPic7XG4gICAgdmFyIHRhYiQzID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGJvZHkgPSB7XG4gICAgICAgIHR5cGU6ICdodG1scGFuZWwnLFxuICAgICAgICBwcmVzZXRzOiAnZG9jdW1lbnQnLFxuICAgICAgICBodG1sOiBkZXNjcmlwdGlvblxuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdrZXlib2FyZG5hdicsXG4gICAgICAgIHRpdGxlOiAnS2V5Ym9hcmQgTmF2aWdhdGlvbicsXG4gICAgICAgIGl0ZW1zOiBbYm9keV1cbiAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciBwYXJzZUhlbHBUYWJzU2V0dGluZyA9IGZ1bmN0aW9uICh0YWJzRnJvbVNldHRpbmdzLCB0YWJzKSB7XG4gICAgICB2YXIgbmV3VGFicyA9IHt9O1xuICAgICAgdmFyIG5hbWVzID0gbWFwKHRhYnNGcm9tU2V0dGluZ3MsIGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIGlmICh0eXBlb2YgdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpZiAoaGFzKHRhYnMsIHQpKSB7XG4gICAgICAgICAgICBuZXdUYWJzW3RdID0gdGFic1t0XTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3VGFic1t0Lm5hbWVdID0gdDtcbiAgICAgICAgICByZXR1cm4gdC5uYW1lO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRhYnM6IG5ld1RhYnMsXG4gICAgICAgIG5hbWVzOiBuYW1lc1xuICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBnZXROYW1lc0Zyb21UYWJzID0gZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgIHZhciBuYW1lcyA9IGtleXModGFicyk7XG4gICAgICB2YXIgaWR4ID0gbmFtZXMuaW5kZXhPZigndmVyc2lvbnMnKTtcbiAgICAgIGlmIChpZHggIT09IC0xKSB7XG4gICAgICAgIG5hbWVzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICBuYW1lcy5wdXNoKCd2ZXJzaW9ucycpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGFiczogdGFicyxcbiAgICAgICAgbmFtZXM6IG5hbWVzXG4gICAgICB9O1xuICAgIH07XG4gICAgdmFyIHBhcnNlQ3VzdG9tVGFicyA9IGZ1bmN0aW9uIChlZGl0b3IsIGN1c3RvbVRhYnMpIHtcbiAgICAgIHZhciBfYTtcbiAgICAgIHZhciBzaG9ydGN1dHMgPSB0YWIoKTtcbiAgICAgIHZhciBuYXYgPSB0YWIkMygpO1xuICAgICAgdmFyIHBsdWdpbnMgPSB0YWIkMShlZGl0b3IpO1xuICAgICAgdmFyIHZlcnNpb25zID0gdGFiJDIoKTtcbiAgICAgIHZhciB0YWJzID0gX19hc3NpZ24oKF9hID0ge30sIF9hW3Nob3J0Y3V0cy5uYW1lXSA9IHNob3J0Y3V0cywgX2FbbmF2Lm5hbWVdID0gbmF2LCBfYVtwbHVnaW5zLm5hbWVdID0gcGx1Z2lucywgX2FbdmVyc2lvbnMubmFtZV0gPSB2ZXJzaW9ucywgX2EpLCBjdXN0b21UYWJzLmdldCgpKTtcbiAgICAgIHJldHVybiBnZXRIZWxwVGFicyhlZGl0b3IpLmZvbGQoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZ2V0TmFtZXNGcm9tVGFicyh0YWJzKTtcbiAgICAgIH0sIGZ1bmN0aW9uICh0YWJzRnJvbVNldHRpbmdzKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUhlbHBUYWJzU2V0dGluZyh0YWJzRnJvbVNldHRpbmdzLCB0YWJzKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoZWRpdG9yLCBjdXN0b21UYWJzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2EgPSBwYXJzZUN1c3RvbVRhYnMoZWRpdG9yLCBjdXN0b21UYWJzKSwgdGFicyA9IF9hLnRhYnMsIG5hbWVzID0gX2EubmFtZXM7XG4gICAgICAgIHZhciBmb3VuZFRhYnMgPSBtYXAobmFtZXMsIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIGdldCQxKHRhYnMsIG5hbWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGRpYWxvZ1RhYnMgPSBjYXQoZm91bmRUYWJzKTtcbiAgICAgICAgdmFyIGJvZHkgPSB7XG4gICAgICAgICAgdHlwZTogJ3RhYnBhbmVsJyxcbiAgICAgICAgICB0YWJzOiBkaWFsb2dUYWJzXG4gICAgICAgIH07XG4gICAgICAgIGVkaXRvci53aW5kb3dNYW5hZ2VyLm9wZW4oe1xuICAgICAgICAgIHRpdGxlOiAnSGVscCcsXG4gICAgICAgICAgc2l6ZTogJ21lZGl1bScsXG4gICAgICAgICAgYm9keTogYm9keSxcbiAgICAgICAgICBidXR0b25zOiBbe1xuICAgICAgICAgICAgICB0eXBlOiAnY2FuY2VsJyxcbiAgICAgICAgICAgICAgbmFtZTogJ2Nsb3NlJyxcbiAgICAgICAgICAgICAgdGV4dDogJ0Nsb3NlJyxcbiAgICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZVxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgaW5pdGlhbERhdGE6IHt9XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gUGx1Z2luICgpIHtcbiAgICAgIGdsb2JhbC5hZGQoJ2hlbHAnLCBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIHZhciBjdXN0b21UYWJzID0gQ2VsbCh7fSk7XG4gICAgICAgIHZhciBhcGkgPSBnZXQoY3VzdG9tVGFicyk7XG4gICAgICAgIHZhciBkaWFsb2dPcGVuZXIgPSBpbml0KGVkaXRvciwgY3VzdG9tVGFicyk7XG4gICAgICAgIHJlZ2lzdGVyJDEoZWRpdG9yLCBkaWFsb2dPcGVuZXIpO1xuICAgICAgICByZWdpc3RlcihlZGl0b3IsIGRpYWxvZ09wZW5lcik7XG4gICAgICAgIGVkaXRvci5zaG9ydGN1dHMuYWRkKCdBbHQrMCcsICdPcGVuIGhlbHAgZGlhbG9nJywgJ21jZUhlbHAnKTtcbiAgICAgICAgcmV0dXJuIGFwaTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIFBsdWdpbigpO1xuXG59KCkpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==