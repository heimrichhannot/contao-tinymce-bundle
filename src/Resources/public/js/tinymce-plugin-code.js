(window.webpackJsonp=window.webpackJsonp||[]).push([["tinymce-plugin-code","tinymce-plugin-code-plugin"],{"7x9u":function(n,e){!function(){"use strict";var n=tinymce.util.Tools.resolve("tinymce.PluginManager"),e=function(n){var e=function(n){return n.getContent({source_view:!0})}(n);n.windowManager.open({title:"Source Code",size:"large",body:{type:"panel",items:[{type:"textarea",name:"code"}]},buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0}],initialData:{code:e},onSubmit:function(e){!function(n,e){n.focus(),n.undoManager.transact((function(){n.setContent(e)})),n.selection.setCursorLocation(),n.nodeChanged()}(n,e.getData().code),e.close()}})};n.add("code",(function(n){return function(n){n.addCommand("mceCodeEditor",(function(){e(n)}))}(n),function(n){n.ui.registry.addButton("code",{icon:"sourcecode",tooltip:"Source code",onAction:function(){return e(n)}}),n.ui.registry.addMenuItem("code",{icon:"sourcecode",text:"Source code",onAction:function(){return e(n)}})}(n),{}}))}()},ZNhe:function(n,e,t){t("7x9u")}}]);