(window.webpackJsonp=window.webpackJsonp||[]).push([["tinymce-plugin-print-plugin-min"],{"75nR":function(n,t){!function(){"use strict";var n=tinymce.util.Tools.resolve("tinymce.PluginManager"),t=tinymce.util.Tools.resolve("tinymce.Env");n.add("print",(function(n){var i,e;(i=n).addCommand("mcePrint",(function(){t.browser.isIE()?i.getDoc().execCommand("print",!1,null):i.getWin().print()})),(e=n).ui.registry.addButton("print",{icon:"print",tooltip:"Print",onAction:function(){return e.execCommand("mcePrint")}}),e.ui.registry.addMenuItem("print",{text:"Print...",icon:"print",onAction:function(){return e.execCommand("mcePrint")}}),n.addShortcut("Meta+P","","mcePrint")}))}()}}]);