(window.webpackJsonp=window.webpackJsonp||[]).push([["tinymce-plugin-visualblocks","tinymce-plugin-visualblocks-plugin"],{DvpE:function(n,t,o){o("S9xt")},S9xt:function(n,t){!function(){"use strict";var n=tinymce.util.Tools.resolve("tinymce.PluginManager"),t=function(n,t,o){n.dom.toggleClass(n.getBody(),"mce-visualblocks"),o.set(!o.get()),function(n,t){n.fire("VisualBlocks",{state:t})}(n,o.get())},o=function(n,t){return function(o){o.setActive(t.get());var e=function(n){return o.setActive(n.state)};return n.on("VisualBlocks",e),function(){return n.off("VisualBlocks",e)}}};n.add("visualblocks",(function(n,e){var i,c=(i=!1,{get:function(){return i},set:function(n){i=n}});!function(n,o,e){n.addCommand("mceVisualBlocks",(function(){t(n,0,e)}))}(n,0,c),function(n,t){n.ui.registry.addToggleButton("visualblocks",{icon:"visualblocks",tooltip:"Show blocks",onAction:function(){return n.execCommand("mceVisualBlocks")},onSetup:o(n,t)}),n.ui.registry.addToggleMenuItem("visualblocks",{text:"Show blocks",icon:"visualblocks",onAction:function(){return n.execCommand("mceVisualBlocks")},onSetup:o(n,t)})}(n,c),function(n,o,e){n.on("PreviewFormats AfterPreviewFormats",(function(t){e.get()&&n.dom.toggleClass(n.getBody(),"mce-visualblocks","afterpreviewformats"===t.type)})),n.on("init",(function(){(function(n){return n.getParam("visualblocks_default_state",!1,"boolean")})(n)&&t(n,0,e)}))}(n,0,c)}))}()}}]);