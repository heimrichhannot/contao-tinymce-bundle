(window.webpackJsonp=window.webpackJsonp||[]).push([["tinymce-plugin-autosave","tinymce-plugin-autosave-plugin"],{"/75p":function(t,e,n){n("jOFg")},jOFg:function(t,e){!function(t){"use strict";var e,n=tinymce.util.Tools.resolve("tinymce.PluginManager"),r=tinymce.util.Tools.resolve("tinymce.util.Delay"),o=tinymce.util.Tools.resolve("tinymce.util.LocalStorage"),a=tinymce.util.Tools.resolve("tinymce.util.Tools"),i=function(t,e){var n=t||e,r=/^(\d+)([ms]?)$/.exec(""+n);return(r[2]?{s:1e3,m:6e4}[r[2]]:1)*parseInt(n,10)},u=function(e){var n=t.document.location;return e.getParam("autosave_prefix","tinymce-autosave-{path}{query}{hash}-{id}-").replace(/{path}/g,n.pathname).replace(/{query}/g,n.search).replace(/{hash}/g,n.hash).replace(/{id}/g,e.id)},s=(e=void 0,function(t){return e===t}),f=function(e,n){if(s(n))return e.dom.isEmpty(e.getBody());var r=a.trim(n);if(""===r)return!0;var o=(new t.DOMParser).parseFromString(r,"text/html");return e.dom.isEmpty(o)},c=function(t){var e=parseInt(o.getItem(u(t)+"time"),10)||0;return!((new Date).getTime()-e>function(t){return i(t.getParam("autosave_retention"),"20m")}(t))||(m(t,!1),!1)},m=function(t,e){var n=u(t);o.removeItem(n+"draft"),o.removeItem(n+"time"),!1!==e&&function(t){t.fire("RemoveDraft")}(t)},l=function(t){var e=u(t);!f(t)&&t.isDirty()&&(o.setItem(e+"draft",t.getContent({format:"raw",no_events:!0})),o.setItem(e+"time",(new Date).getTime().toString()),function(t){t.fire("StoreDraft")}(t))},v=function(t){var e=u(t);c(t)&&(t.setContent(o.getItem(e+"draft"),{format:"raw"}),function(t){t.fire("RestoreDraft")}(t))},d=function(t){var e=function(t){return i(t.getParam("autosave_interval"),"30s")}(t);r.setInterval((function(){t.removed||l(t)}),e)},g=function(t){t.undoManager.transact((function(){v(t),m(t)})),t.focus()},p=tinymce.util.Tools.resolve("tinymce.EditorManager"),y=function(t){return function(e){e.setDisabled(!c(t));var n=function(){return e.setDisabled(!c(t))};return t.on("StoreDraft RestoreDraft RemoveDraft",n),function(){return t.off("StoreDraft RestoreDraft RemoveDraft",n)}}};n.add("autosave",(function(t){return function(t){t.editorManager.on("BeforeUnload",(function(t){var e;a.each(p.get(),(function(t){t.plugins.autosave&&t.plugins.autosave.storeDraft(),!e&&t.isDirty()&&function(t){return t.getParam("autosave_ask_before_unload",!0)}(t)&&(e=t.translate("You have unsaved changes are you sure you want to navigate away?"))})),e&&(t.preventDefault(),t.returnValue=e)}))}(t),function(t){d(t),t.ui.registry.addButton("restoredraft",{tooltip:"Restore last draft",icon:"restore-draft",onAction:function(){g(t)},onSetup:y(t)}),t.ui.registry.addMenuItem("restoredraft",{text:"Restore last draft",icon:"restore-draft",onAction:function(){g(t)},onSetup:y(t)})}(t),t.on("init",(function(){(function(t){return t.getParam("autosave_restore_when_empty",!1)})(t)&&t.dom.isEmpty(t.getBody())&&v(t)})),function(t){return{hasDraft:function(){return c(t)},storeDraft:function(){return l(t)},restoreDraft:function(){return v(t)},removeDraft:function(e){return m(t,e)},isEmpty:function(e){return f(t,e)}}}(t)}))}(window)}}]);