(window.webpackJsonp=window.webpackJsonp||[]).push([["tinymce-plugin-toc-plugin"],{"/QbA":function(t,n){!function(){"use strict";var t,n,e=tinymce.util.Tools.resolve("tinymce.PluginManager"),o=tinymce.util.Tools.resolve("tinymce.dom.DOMUtils"),i=tinymce.util.Tools.resolve("tinymce.util.I18n"),r=tinymce.util.Tools.resolve("tinymce.util.Tools"),c=function(t){return t.getParam("toc_class","mce-toc")},l=function(t){var n=t.getParam("toc_header","h2");return/^h[1-6]$/.test(n)?n:"h2"},u=(t="mcetoc_",n=0,function(){var e=(new Date).getTime().toString(32);return t+e+(n++).toString(32)}),a=function(t){var n=c(t),e=l(t),o=function(t){var n,e=[];for(n=1;n<=t;n++)e.push("h"+n);return e.join(",")}(function(t){var n=parseInt(t.getParam("toc_depth","3"),10);return n>=1&&n<=9?n:3}(t)),i=t.$(o);return i.length&&/^h[1-9]$/i.test(e)&&(i=i.filter((function(e,o){return!t.dom.hasClass(o.parentNode,n)}))),r.map(i,(function(n){return{id:n.id?n.id:u(),level:parseInt(n.nodeName.replace(/^H/i,""),10),title:t.$.text(n),element:n}}))},d=function(t){var n,e,r,c,u,d,s,f="",m=a(t),v=function(t){var n,e=9;for(n=0;n<t.length;n++)if(t[n].level<e&&(e=t[n].level),1===e)return e;return e}(m)-1;if(!m.length)return"";for(f+=(u=l(t),d=i.translate("Table of Contents"),s="</"+u+">","<"+u+' contenteditable="true">'+o.DOM.encode(d)+s),n=0;n<m.length;n++){if((r=m[n]).element.id=r.id,c=m[n+1]&&m[n+1].level,v===r.level)f+="<li>";else for(e=v;e<r.level;e++)f+="<ul><li>";if(f+='<a href="#'+r.id+'">'+r.title+"</a>",c!==r.level&&c)for(e=r.level;e>c;e--)f+="</li></ul><li>";else f+="</li>",c||(f+="</ul>");v=r.level}return f},s=function(t){var n=c(t),e=t.$("."+n);!function(t,n){return!n.length||t.dom.getParents(n[0],".mce-offscreen-selection").length>0}(t,e)?f(t):t.insertContent(function(t){var n=d(t);return'<div class="'+t.dom.encode(c(t))+'" contenteditable="false">'+n+"</div>"}(t))},f=function(t){var n=c(t),e=t.$("."+n);e.length&&t.undoManager.transact((function(){e.html(d(t))}))},m=function(t){return function(n){var e=function(){return n.setDisabled(t.mode.isReadOnly()||!function(t){return a(t).length>0}(t))};return e(),t.on("LoadContent SetContent change",e),function(){return t.on("LoadContent SetContent change",e)}}},v=function(t){return function(n){return n&&t.dom.is(n,"."+c(t))&&t.getBody().contains(n)}};e.add("toc",(function(t){!function(t){t.addCommand("mceInsertToc",(function(){s(t)})),t.addCommand("mceUpdateToc",(function(){f(t)}))}(t),function(t){t.ui.registry.addButton("toc",{icon:"toc",tooltip:"Table of contents",onAction:function(){return t.execCommand("mceInsertToc")},onSetup:m(t)}),t.ui.registry.addButton("tocupdate",{icon:"reload",tooltip:"Update",onAction:function(){return t.execCommand("mceUpdateToc")}}),t.ui.registry.addMenuItem("toc",{icon:"toc",text:"Table of contents",onAction:function(){return t.execCommand("mceInsertToc")},onSetup:m(t)}),t.ui.registry.addContextToolbar("toc",{items:"tocupdate",predicate:v(t),scope:"node",position:"node"})}(t),function(t){var n=t.$,e=c(t);t.on("PreProcess",(function(t){var o=n("."+e,t.node);o.length&&(o.removeAttr("contentEditable"),o.find("[contenteditable]").removeAttr("contentEditable"))})),t.on("SetContent",(function(){var t=n("."+e);t.length&&(t.attr("contentEditable",!1),t.children(":first-child").attr("contentEditable",!0))}))}(t)}))}()}}]);