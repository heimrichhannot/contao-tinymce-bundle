(window.webpackJsonp=window.webpackJsonp||[]).push([["tinymce-plugin-preview-plugin-min"],{v68R:function(e,t){!function(){"use strict";var e=tinymce.util.Tools.resolve("tinymce.PluginManager"),t=tinymce.util.Tools.resolve("tinymce.Env"),n=tinymce.util.Tools.resolve("tinymce.util.Tools");e.add("preview",(function(e){var i,o;(i=e).addCommand("mcePreview",(function(){!function(e){var i=function(e){var i="",o=e.dom.encode,a=e.getParam("content_style","");i+='<base href="'+o(e.documentBaseURI.getURI())+'">',a&&(i+='<style type="text/css">'+a+"</style>");var r=e.getParam("content_css_cors",!1,"boolean")?' crossorigin="anonymous"':"";n.each(e.contentCSS,(function(t){i+='<link type="text/css" rel="stylesheet" href="'+o(e.documentBaseURI.toAbsolute(t))+'"'+r+">"}));var c,s,d,m,l,u,y,v=-1===(m=(c=e).getParam("body_id","tinymce","string")).indexOf("=")?m:(d=(s=c).getParam("body_id","","hash"))[s.id]||d,p=-1===(y=(l=e).getParam("body_class","","string")).indexOf("=")?y:(u=l).getParam("body_class","","hash")[u.id]||"",w='<script>document.addEventListener && document.addEventListener("click", function(e) {for (var elm = e.target; elm; elm = elm.parentNode) {if (elm.nodeName === "A" && !('+(t.mac?"e.metaKey":"e.ctrlKey && !e.altKey")+")) {e.preventDefault();}}}, false);<\/script> ",g=e.getBody().dir,f=g?' dir="'+o(g)+'"':"";return"<!DOCTYPE html><html><head>"+i+'</head><body id="'+o(v)+'" class="mce-content-body '+o(p)+'"'+f+">"+e.getContent()+w+"</body></html>"}(e);e.windowManager.open({title:"Preview",size:"large",body:{type:"panel",items:[{name:"preview",type:"iframe",sandboxed:!0}]},buttons:[{type:"cancel",name:"close",text:"Close",primary:!0}],initialData:{preview:i}}).focus("close")}(i)})),(o=e).ui.registry.addButton("preview",{icon:"preview",tooltip:"Preview",onAction:function(){return o.execCommand("mcePreview")}}),o.ui.registry.addMenuItem("preview",{icon:"preview",text:"Preview",onAction:function(){return o.execCommand("mcePreview")}})}))}()}}]);