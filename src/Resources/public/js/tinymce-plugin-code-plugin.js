(window.webpackJsonp=window.webpackJsonp||[]).push([["tinymce-plugin-code-plugin"],{"7x9u":function(e,n){!function(){"use strict";var e=tinymce.util.Tools.resolve("tinymce.PluginManager"),n=function(e){var n=function(e){return e.getContent({source_view:!0})}(e);e.windowManager.open({title:"Source Code",size:"large",body:{type:"panel",items:[{type:"textarea",name:"code"}]},buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0}],initialData:{code:n},onSubmit:function(n){!function(e,n){e.focus(),e.undoManager.transact((function(){e.setContent(n)})),e.selection.setCursorLocation(),e.nodeChanged()}(e,n.getData().code),n.close()}})};e.add("code",(function(e){return function(e){e.addCommand("mceCodeEditor",(function(){n(e)}))}(e),function(e){e.ui.registry.addButton("code",{icon:"sourcecode",tooltip:"Source code",onAction:function(){return n(e)}}),e.ui.registry.addMenuItem("code",{icon:"sourcecode",text:"Source code",onAction:function(){return n(e)}})}(e),{}}))}()}}]);