(window.webpackJsonp=window.webpackJsonp||[]).push([["tinymce-plugin-quickbars","tinymce-plugin-quickbars-plugin"],{PEHG:function(t,n){!function(t){"use strict";var n,e=tinymce.util.Tools.resolve("tinymce.PluginManager"),r=0,o=function(t,n,e){var o,i,u=t.editorUpload.blobCache,c=u.create((o="mceu",i=(new Date).getTime(),o+"_"+Math.floor(1e9*Math.random())+ ++r+String(i)),e,n);u.add(c),t.insertContent(t.dom.createHTML("img",{src:c.blobUri()}))},i=tinymce.util.Tools.resolve("tinymce.util.Promise"),u=tinymce.util.Tools.resolve("tinymce.Env"),c=tinymce.util.Tools.resolve("tinymce.util.Delay"),a=function(n){n.ui.registry.addButton("quickimage",{icon:"image",tooltip:"Insert image",onAction:function(){(function(n){return new i((function(e){var r=t.document.createElement("input");r.type="file",r.accept="image/*",r.style.position="fixed",r.style.left="0",r.style.top="0",r.style.opacity="0.001",t.document.body.appendChild(r);r.addEventListener("change",(function(t){e(Array.prototype.slice.call(t.target.files))}));var o=function(t){var i=function(){e([]),r.parentNode.removeChild(r)};u.os.isAndroid()&&"remove"!==t.type?c.setEditorTimeout(n,i,0):i(),n.off("focusin remove",o)};n.on("focusin remove",o),r.click()}))})(n).then((function(e){if(e.length>0){var r=e[0];(u=r,new i((function(n){var e=new t.FileReader;e.onloadend=function(){n(e.result.split(",")[1])},e.readAsDataURL(u)}))).then((function(t){o(n,t,r)}))}var u}))}}),n.ui.registry.addButton("quicktable",{icon:"table",tooltip:"Insert table",onAction:function(){!function(t,n,e){t.plugins.table?t.plugins.table.insertTable(n,e):function(t,n,e){t.undoManager.transact((function(){t.insertContent(function(t,n){var e,r,o;for(o='<table data-mce-id="mce" style="width: 100%">',o+="<tbody>",r=0;r<n;r++){for(o+="<tr>",e=0;e<t;e++)o+="<td><br></td>";o+="</tr>"}return o+="</tbody>",o+="</table>"}(n,e));var r=function(t){return t.dom.select("*[data-mce-id]")[0]}(t);r.removeAttribute("data-mce-id");var o=t.dom.select("td,th",r);t.selection.setCursorLocation(o[0],0)}))}(t,n,e)}(n,2,2)}})},l=function(){},s=function(t){return function(){return t}},f=s(!1),d=s(!0),m=function(){return g},g=function(){var t=function(t){return t.isNone()},n=function(t){return t()},e=function(t){return t};return{fold:function(t,n){return t()},is:f,isSome:f,isNone:d,getOr:e,getOrThunk:n,getOrDie:function(t){throw new Error(t||"error: getOrDie called on none.")},getOrNull:s(null),getOrUndefined:s(void 0),or:e,orThunk:n,map:m,each:l,bind:m,exists:f,forall:d,filter:m,equals:t,equals_:t,toArray:function(){return[]},toString:s("none()")}}(),p=function(t){var n=s(t),e=function(){return o},r=function(n){return n(t)},o={fold:function(n,e){return e(t)},is:function(n){return t===n},isSome:d,isNone:f,getOr:n,getOrThunk:n,getOrDie:n,getOrNull:n,getOrUndefined:n,or:e,orThunk:e,map:function(n){return p(n(t))},each:function(n){n(t)},bind:r,exists:r,forall:r,filter:function(n){return n(t)?o:g},toArray:function(){return[t]},toString:function(){return"some("+t+")"},equals:function(n){return n.is(t)},equals_:function(n,e){return n.fold(f,(function(n){return e(t,n)}))}};return o},h={some:p,none:m,from:function(t){return null==t?g:p(t)}},v=function(t){if(null==t)throw new Error("Node cannot be null or undefined");return{dom:s(t)}},b={fromHtml:function(n,e){var r=(e||t.document).createElement("div");if(r.innerHTML=n,!r.hasChildNodes()||r.childNodes.length>1)throw t.console.error("HTML does not have a single root node",n),new Error("HTML must have a single root node");return v(r.childNodes[0])},fromTag:function(n,e){var r=(e||t.document).createElement(n);return v(r)},fromText:function(n,e){var r=(e||t.document).createTextNode(n);return v(r)},fromDom:v,fromPoint:function(t,n,e){var r=t.dom();return h.from(r.elementFromPoint(n,e)).map(v)}},y=(void 0!==t.window?t.window:Function("return this;")(),function(t){return function(n){return r=typeof(e=n),(null===e?"null":"object"===r&&(Array.prototype.isPrototypeOf(e)||e.constructor&&"Array"===e.constructor.name)?"array":"object"===r&&(String.prototype.isPrototypeOf(e)||e.constructor&&"String"===e.constructor.name)?"string":r)===t;var e,r}}),w=function(t){return function(n){return typeof n===t}},k=y("string"),T=y("object"),E=y("array"),N=w("boolean"),q=(n=void 0,function(t){return n===t}),M=w("function");function S(t,n,e,r,o){return t(e,r)?h.some(e):M(o)&&o(e)?h.none():n(e,r,o)}var O,C=function(t,n){var e=t.dom();if(1!==e.nodeType)return!1;var r=e;if(void 0!==r.matches)return r.matches(n);if(void 0!==r.msMatchesSelector)return r.msMatchesSelector(n);if(void 0!==r.webkitMatchesSelector)return r.webkitMatchesSelector(n);if(void 0!==r.mozMatchesSelector)return r.mozMatchesSelector(n);throw new Error("Browser lacks native selectors")},x=(M(t.Element.prototype.attachShadow)&&M(t.Node.prototype.getRootNode),function(t,n,e){for(var r=t.dom(),o=M(e)?e:s(!1);r.parentNode;){r=r.parentNode;var i=b.fromDom(r);if(n(i))return h.some(i);if(o(i))break}return h.none()}),P=function(t,n,e){return x(t,(function(t){return C(t,n)}),e)},A=(O=k,function(t,n,e){return function(t,n){if(n(t))return!0;throw new Error("Default value doesn't match requested type.")}(e,O),function(t,n){if(E(t)||T(t))throw new Error("expected a string but found: "+t);return q(t)?n:N(t)?!1===t?"":n:t}(t.getParam(n,e),e)}),D=function(t){var n=function(t){return A(t,"quickbars_insert_toolbar","quickimage quicktable")}(t);n.trim().length>0&&t.ui.registry.addContextToolbar("quickblock",{predicate:function(n){var e=b.fromDom(n),r=t.schema.getTextBlockElements(),o=function(n){return n.dom()===t.getBody()};return function(t,n,e){return S((function(t,n){return C(t,n)}),P,t,n,e)}(e,"table",o).fold((function(){return function(t,n,e){return S((function(t,n){return n(t)}),x,t,n,e)}(e,(function(n){return n.dom().nodeName.toLowerCase()in r&&t.dom.isEmpty(n.dom())}),o).isSome()}),(function(){return!1}))},items:n,position:"line",scope:"editor"})},_=function(t){var n=function(t){return"IMG"===t.nodeName||"FIGURE"===t.nodeName&&/image/i.test(t.className)},e=function(t){return A(t,"quickbars_image_toolbar","alignleft aligncenter alignright")}(t);e.trim().length>0&&t.ui.registry.addContextToolbar("imageselection",{predicate:n,items:e,position:"node"});var r=function(t){return A(t,"quickbars_selection_toolbar","bold italic | quicklink h2 h3 blockquote")}(t);r.trim().length>0&&t.ui.registry.addContextToolbar("textselection",{predicate:function(e){return!n(e)&&!t.selection.isCollapsed()&&function(n){return"false"!==t.dom.getContentEditableParent(n)}(e)},items:r,position:"selection",scope:"editor"})};e.add("quickbars",(function(t){a(t),D(t),_(t)}))}(window)},kOcP:function(t,n,e){e("PEHG")}}]);