(window.webpackJsonp=window.webpackJsonp||[]).push([["tinymce-plugin-hr-plugin-min"],{"1znB":function(n,o){!function(){"use strict";tinymce.util.Tools.resolve("tinymce.PluginManager").add("hr",(function(n){var o,t;(o=n).addCommand("InsertHorizontalRule",(function(){o.execCommand("mceInsertContent",!1,"<hr />")})),(t=n).ui.registry.addButton("hr",{icon:"horizontal-rule",tooltip:"Horizontal line",onAction:function(){return t.execCommand("InsertHorizontalRule")}}),t.ui.registry.addMenuItem("hr",{icon:"horizontal-rule",text:"Horizontal line",onAction:function(){return t.execCommand("InsertHorizontalRule")}})}))}()}}]);