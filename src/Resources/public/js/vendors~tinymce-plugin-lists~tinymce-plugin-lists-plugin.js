(window.webpackJsonp=window.webpackJsonp||[]).push([["vendors~tinymce-plugin-lists~tinymce-plugin-lists-plugin"],{JAFY:function(e,n){!function(e){"use strict";var n,t,r,o,i=tinymce.util.Tools.resolve("tinymce.PluginManager"),u=function(){},a=function(e){return function(){return e}},s=function(e){return function(n){return!e(n)}},c=a(!1),f=a(!0),d=function(){return l},l=function(){var e=function(e){return e.isNone()},n=function(e){return e()},t=function(e){return e};return{fold:function(e,n){return e()},is:c,isSome:c,isNone:f,getOr:t,getOrThunk:n,getOrDie:function(e){throw new Error(e||"error: getOrDie called on none.")},getOrNull:a(null),getOrUndefined:a(void 0),or:t,orThunk:n,map:d,each:u,bind:d,exists:c,forall:f,filter:d,equals:e,equals_:e,toArray:function(){return[]},toString:a("none()")}}(),m=function(e){var n=a(e),t=function(){return o},r=function(n){return n(e)},o={fold:function(n,t){return t(e)},is:function(n){return e===n},isSome:f,isNone:c,getOr:n,getOrThunk:n,getOrDie:n,getOrNull:n,getOrUndefined:n,or:t,orThunk:t,map:function(n){return m(n(e))},each:function(n){n(e)},bind:r,exists:r,forall:r,filter:function(n){return n(e)?o:l},toArray:function(){return[e]},toString:function(){return"some("+e+")"},equals:function(n){return n.is(e)},equals_:function(n,t){return n.fold(c,(function(n){return t(e,n)}))}};return o},p={some:m,none:d,from:function(e){return null==e?l:m(e)}},g=function(e){return function(n){return r=typeof(t=n),(null===t?"null":"object"===r&&(Array.prototype.isPrototypeOf(t)||t.constructor&&"Array"===t.constructor.name)?"array":"object"===r&&(String.prototype.isPrototypeOf(t)||t.constructor&&"String"===t.constructor.name)?"string":r)===e;var t,r}},v=function(e){return function(n){return typeof n===e}},h=g("string"),y=g("array"),S=v("boolean"),b=v("function"),C=v("number"),O=Array.prototype.slice,N=Array.prototype.push,L=function(e,n){for(var t=e.length,r=new Array(t),o=0;o<t;o++){var i=e[o];r[o]=n(i,o)}return r},w=function(e,n){for(var t=0,r=e.length;t<r;t++){n(e[t],t)}},T=function(e,n){for(var t=[],r=0,o=e.length;r<o;r++){var i=e[r];n(i,r)&&t.push(i)}return t},D=function(e,n,t){return w(e,(function(e){t=n(t,e)})),t},k=function(e,n,t){for(var r=0,o=e.length;r<o;r++){var i=e[r];if(n(i,r))return p.some(i);if(t(i,r))break}return p.none()},x=function(e,n){return k(e,n,c)},A=function(e,n){return function(e){for(var n=[],t=0,r=e.length;t<r;++t){if(!y(e[t]))throw new Error("Arr.flatten item "+t+" was not an array, input: "+e);N.apply(n,e[t])}return n}(L(e,n))},E=function(e){var n=O.call(e,0);return n.reverse(),n},B=function(e){return 0===e.length?p.none():p.some(e[0])},P=function(e){return 0===e.length?p.none():p.some(e[e.length-1])},R=function(){return(R=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var o in n=arguments[t])Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);return e}).apply(this,arguments)},I=function(){return M(0,0)},M=function(e,n){return{major:e,minor:n}},U={nu:M,detect:function(e,n){var t=String(n).toLowerCase();return 0===e.length?I():function(e,n){var t=function(e,n){for(var t=0;t<e.length;t++){var r=e[t];if(r.test(n))return r}}(e,n);if(!t)return{major:0,minor:0};var r=function(e){return Number(n.replace(t,"$"+e))};return M(r(1),r(2))}(e,t)},unknown:I},_=function(e){var n=e.current,t=e.version,r=function(e){return function(){return n===e}};return{current:n,version:t,isEdge:r("Edge"),isChrome:r("Chrome"),isIE:r("IE"),isOpera:r("Opera"),isFirefox:r("Firefox"),isSafari:r("Safari")}},F={unknown:function(){return _({current:void 0,version:U.unknown()})},nu:_,edge:a("Edge"),chrome:a("Chrome"),ie:a("IE"),opera:a("Opera"),firefox:a("Firefox"),safari:a("Safari")},$=function(e){var n=e.current,t=e.version,r=function(e){return function(){return n===e}};return{current:n,version:t,isWindows:r("Windows"),isiOS:r("iOS"),isAndroid:r("Android"),isOSX:r("OSX"),isLinux:r("Linux"),isSolaris:r("Solaris"),isFreeBSD:r("FreeBSD"),isChromeOS:r("ChromeOS")}},H={unknown:function(){return $({current:void 0,version:U.unknown()})},nu:$,windows:a("Windows"),ios:a("iOS"),android:a("Android"),linux:a("Linux"),osx:a("OSX"),solaris:a("Solaris"),freebsd:a("FreeBSD"),chromeos:a("ChromeOS")},j=function(e,n){var t=String(n).toLowerCase();return x(e,(function(e){return e.search(t)}))},q=function(e,n){return j(e,n).map((function(e){var t=U.detect(e.versionRegexes,n);return{current:e.name,version:t}}))},W=function(e,n){return j(e,n).map((function(e){var t=U.detect(e.versionRegexes,n);return{current:e.name,version:t}}))},K=function(e,n){return-1!==e.indexOf(n)},V=/.*?version\/\ ?([0-9]+)\.([0-9]+).*/,Q=function(e){return function(n){return K(n,e)}},X=[{name:"Edge",versionRegexes:[/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],search:function(e){return K(e,"edge/")&&K(e,"chrome")&&K(e,"safari")&&K(e,"applewebkit")}},{name:"Chrome",versionRegexes:[/.*?chrome\/([0-9]+)\.([0-9]+).*/,V],search:function(e){return K(e,"chrome")&&!K(e,"chromeframe")}},{name:"IE",versionRegexes:[/.*?msie\ ?([0-9]+)\.([0-9]+).*/,/.*?rv:([0-9]+)\.([0-9]+).*/],search:function(e){return K(e,"msie")||K(e,"trident")}},{name:"Opera",versionRegexes:[V,/.*?opera\/([0-9]+)\.([0-9]+).*/],search:Q("opera")},{name:"Firefox",versionRegexes:[/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],search:Q("firefox")},{name:"Safari",versionRegexes:[V,/.*?cpu os ([0-9]+)_([0-9]+).*/],search:function(e){return(K(e,"safari")||K(e,"mobile/"))&&K(e,"applewebkit")}}],J=[{name:"Windows",search:Q("win"),versionRegexes:[/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]},{name:"iOS",search:function(e){return K(e,"iphone")||K(e,"ipad")},versionRegexes:[/.*?version\/\ ?([0-9]+)\.([0-9]+).*/,/.*cpu os ([0-9]+)_([0-9]+).*/,/.*cpu iphone os ([0-9]+)_([0-9]+).*/]},{name:"Android",search:Q("android"),versionRegexes:[/.*?android\ ?([0-9]+)\.([0-9]+).*/]},{name:"OSX",search:Q("mac os x"),versionRegexes:[/.*?mac\ os\ x\ ?([0-9]+)_([0-9]+).*/]},{name:"Linux",search:Q("linux"),versionRegexes:[]},{name:"Solaris",search:Q("sunos"),versionRegexes:[]},{name:"FreeBSD",search:Q("freebsd"),versionRegexes:[]},{name:"ChromeOS",search:Q("cros"),versionRegexes:[/.*?chrome\/([0-9]+)\.([0-9]+).*/]}],z={browsers:a(X),oses:a(J)},Y=function(e,n){var t=z.browsers(),r=z.oses(),o=q(t,e).fold(F.unknown,F.nu),i=W(r,e).fold(H.unknown,H.nu),u=function(e,n,t,r){var o=e.isiOS()&&!0===/ipad/i.test(t),i=e.isiOS()&&!o,u=e.isiOS()||e.isAndroid(),s=u||r("(pointer:coarse)"),c=o||!i&&u&&r("(min-device-width:768px)"),f=i||u&&!c,d=n.isSafari()&&e.isiOS()&&!1===/safari/i.test(t),l=!f&&!c&&!d;return{isiPad:a(o),isiPhone:a(i),isTablet:a(c),isPhone:a(f),isTouch:a(s),isAndroid:e.isAndroid,isiOS:e.isiOS,isWebView:a(d),isDesktop:a(l)}}(i,o,e,n);return{browser:o,os:i,deviceType:u}},G=function(n){return e.window.matchMedia(n).matches},Z=(n=function(){return Y(e.navigator.userAgent,G)},r=!1,function(){for(var e=[],o=0;o<arguments.length;o++)e[o]=arguments[o];return r||(r=!0,t=n.apply(null,e)),t}),ee=function(e){if(null==e)throw new Error("Node cannot be null or undefined");return{dom:a(e)}},ne={fromHtml:function(n,t){var r=(t||e.document).createElement("div");if(r.innerHTML=n,!r.hasChildNodes()||r.childNodes.length>1)throw e.console.error("HTML does not have a single root node",n),new Error("HTML must have a single root node");return ee(r.childNodes[0])},fromTag:function(n,t){var r=(t||e.document).createElement(n);return ee(r)},fromText:function(n,t){var r=(t||e.document).createTextNode(n);return ee(r)},fromDom:ee,fromPoint:function(e,n,t){var r=e.dom();return p.from(r.elementFromPoint(n,t)).map(ee)}},te=function(e,n){return e.dom()===n.dom()},re=function(n,t){return r=n.dom(),o=t.dom(),function(e,n,t){return 0!=(e.compareDocumentPosition(n)&t)}(r,o,e.Node.DOCUMENT_POSITION_CONTAINED_BY);var r,o},oe=function(e,n){return Z().browser.isIE()?re(e,n):function(e,n){var t=e.dom(),r=n.dom();return t!==r&&t.contains(r)}(e,n)},ie=function(e,n){var t=e.dom();if(1!==t.nodeType)return!1;var r=t;if(void 0!==r.matches)return r.matches(n);if(void 0!==r.msMatchesSelector)return r.msMatchesSelector(n);if(void 0!==r.webkitMatchesSelector)return r.webkitMatchesSelector(n);if(void 0!==r.mozMatchesSelector)return r.mozMatchesSelector(n);throw new Error("Browser lacks native selectors")},ue=tinymce.util.Tools.resolve("tinymce.dom.RangeUtils"),ae=tinymce.util.Tools.resolve("tinymce.dom.TreeWalker"),se=tinymce.util.Tools.resolve("tinymce.util.VK"),ce=function(e,n,t){return e.isSome()&&n.isSome()?p.some(t(e.getOrDie(),n.getOrDie())):p.none()},fe=(void 0!==e.window?e.window:Function("return this;")(),function(e){return e.dom().nodeName.toLowerCase()}),de=(o=1,function(e){return function(e){return e.dom().nodeType}(e)===o}),le=function(e){return p.from(e.dom().parentNode).map(ne.fromDom)},me=function(e){return L(e.dom().childNodes,ne.fromDom)},pe=function(e,n){var t=e.dom().childNodes;return p.from(t[n]).map(ne.fromDom)},ge=function(e){return pe(e,0)},ve=function(e){return pe(e,e.dom().childNodes.length-1)},he=function(e,n){le(e).each((function(t){t.dom().insertBefore(n.dom(),e.dom())}))},ye=function(e,n){e.dom().appendChild(n.dom())},Se=function(e,n){w(n,(function(n){ye(e,n)}))},be=function(e){var n=e.dom();null!==n.parentNode&&n.parentNode.removeChild(n)},Ce=function(e,n,t){return e.fire("ListMutation",{action:n,element:t})},Oe=tinymce.util.Tools.resolve("tinymce.dom.DomQuery"),Ne=tinymce.util.Tools.resolve("tinymce.util.Tools"),Le=function(e){return function(n){return n&&n.nodeName.toLowerCase()===e}},we=function(e){return function(n){return n&&e.test(n.nodeName)}},Te=function(e){return e&&3===e.nodeType},De=we(/^(OL|UL|DL)$/),ke=we(/^(OL|UL)$/),xe=Le("ol"),Ae=we(/^(LI|DT|DD)$/),Ee=we(/^(DT|DD)$/),Be=we(/^(TH|TD)$/),Pe=Le("br"),Re=function(e,n){return n&&!!e.schema.getTextBlockElements()[n.nodeName]},Ie=function(e,n){return e&&e.nodeName in n},Me=function(e,n,t){var r=e.isEmpty(n);return!(t&&e.select("span[data-mce-type=bookmark]",n).length>0)&&r},Ue=function(e,n){return e.isChildOf(n,e.getRoot())},_e=function(e,n){var t=n||e.selection.getStart(!0);return e.dom.getParent(t,"OL,UL,DL",He(e,t))},Fe=function(e){var n=_e(e),t=e.selection.getSelectedBlocks();return function(e,n){return e&&1===n.length&&n[0]===e}(n,t)?function(e){return Ne.grep(e.querySelectorAll("ol,ul,dl"),(function(e){return De(e)}))}(n):Ne.grep(t,(function(e){return De(e)&&n!==e}))},$e=function(e){var n=e.selection.getSelectedBlocks();return Ne.grep(function(e,n){var t=Ne.map(n,(function(n){var t=e.dom.getParent(n,"li,dd,dt",He(e,n));return t||n}));return Oe.unique(t)}(e,n),(function(e){return Ae(e)}))},He=function(e,n){var t=e.dom.getParents(n,"TD,TH");return t.length>0?t[0]:e.getBody()},je=function(e,n){var t=e.dom.getParents(n,"ol,ul",He(e,n));return P(t)},qe=function(e){var n=function(e){var n=je(e,e.selection.getStart()),t=T(e.selection.getSelectedBlocks(),ke);return n.toArray().concat(t)}(e);return We(e,n)},We=function(e,n){var t=L(n,(function(n){return je(e,n).getOr(n)}));return Oe.unique(t)},Ke=function(e,n){var t,r,o,i=e.dom,u=e.schema.getBlockElements(),a=i.createFragment(),s=function(e){var n=e.getParam("forced_root_block","p");return!1===n?"":!0===n?"p":n}(e);if(s&&((r=i.create(s)).tagName===s.toUpperCase()&&i.setAttribs(r,function(e){return e.getParam("forced_root_block_attrs",{})}(e)),Ie(n.firstChild,u)||a.appendChild(r)),n)for(;t=n.firstChild;){var c=t.nodeName;o||"SPAN"===c&&"bookmark"===t.getAttribute("data-mce-type")||(o=!0),Ie(t,u)?(a.appendChild(t),r=null):s?(r||(r=i.create(s),a.appendChild(r)),r.appendChild(t)):a.appendChild(t)}return s?o||r.appendChild(i.create("br",{"data-mce-bogus":"1"})):a.appendChild(i.create("br")),a},Ve=Object.keys,Qe=function(e,n){for(var t=Ve(e),r=0,o=t.length;r<o;r++){var i=t[r];n(e[i],i)}},Xe=function(e,n){var t={};return function(e,n,t,r){Qe(e,(function(e,o){(n(e,o)?t:r)(e,o)}))}(e,n,function(e){return function(n,t){e[t]=n}}(t),u),t},Je=function(n,t){var r=n.dom();Qe(t,(function(n,t){!function(n,t,r){if(!(h(r)||S(r)||C(r)))throw e.console.error("Invalid call to Attr.set. Key ",t,":: Value ",r,":: Element ",n),new Error("Attribute value was not simple");n.setAttribute(t,r+"")}(r,t,n)}))},ze=function(e){return D(e.dom().attributes,(function(e,n){return e[n.name]=n.value,e}),{})},Ye=(b(e.Element.prototype.attachShadow)&&b(e.Node.prototype.getRootNode),function(n,t,r){if(!h(r))throw e.console.error("Invalid call to CSS.set. Property ",t,":: Value ",r,":: Element ",n),new Error("CSS value must be a string: "+r);(function(e){return void 0!==e.style&&b(e.style.getPropertyValue)})(n)&&n.style.setProperty(t,r)}),Ge=function(e){return function(e,n){return ne.fromDom(e.dom().cloneNode(n))}(e,!0)},Ze=function(e,n){var t=function(e,n){var t=ne.fromTag(n),r=ze(e);return Je(t,r),t}(e,n);he(e,t);var r=me(e);return Se(t,r),be(e),t},en=function(e,n){ye(e.item,n.list)},nn=function(e,n){var t={list:ne.fromTag(n,e),item:ne.fromTag("li",e)};return ye(t.list,t.item),t},tn=function(e,n,t){var r=n.slice(0,t.depth);return P(r).each((function(n){!function(e,n){ye(e.list,n),e.item=n}(n,function(e,n,t){var r=ne.fromTag("li",e);return Je(r,n),Se(r,t),r}(e,t.itemAttributes,t.content)),function(e,n){fe(e.list)!==n.listType&&(e.list=Ze(e.list,n.listType)),Je(e.list,n.listAttributes)}(n,t)})),r},rn=function(e,n,t){var r,o=function(e,n,t){for(var r=[],o=0;o<t;o++)r.push(nn(e,n.listType));return r}(e,t,t.depth-n.length);return function(e){for(var n=1;n<e.length;n++)en(e[n-1],e[n])}(o),function(e,n){for(var t=0;t<e.length-1;t++)r=e[t].item,o="list-style-type",i="none",u=void 0,u=r.dom(),Ye(u,o,i);var r,o,i,u;P(e).each((function(e){Je(e.list,n.listAttributes),Je(e.item,n.itemAttributes),Se(e.item,n.content)}))}(o,t),r=o,ce(P(n),B(r),en),n.concat(o)},on=function(e){return ie(e,"OL,UL")},un=function(e){return ge(e).map(on).getOr(!1)},an=function(e){return e.depth>0},sn=function(e){return e.isSelected},cn=function(e){var n=me(e),t=ve(e).map(on).getOr(!1)?n.slice(0,-1):n;return L(t,Ge)},fn=function(e){return w(e,(function(n,t){(function(e,n){var t=e[n].depth,r=function(e){return e.depth===t&&!e.dirty},o=function(e){return e.depth<t};return k(E(e.slice(0,n)),r,o).orThunk((function(){return k(e.slice(n+1),r,o)}))})(e,t).fold((function(){n.dirty&&function(e){e.listAttributes=Xe(e.listAttributes,(function(e,n){return"start"!==n}))}(n)}),(function(e){return r=e,(t=n).listType=r.listType,void(t.listAttributes=R({},r.listAttributes));var t,r}))})),e},dn=function(e,n,t,r){return ge(r).filter(on).fold((function(){n.each((function(e){te(e.start,r)&&t.set(!0)}));var o=function(e,n,t){return le(e).filter(de).map((function(r){return{depth:n,dirty:!1,isSelected:t,content:cn(e),itemAttributes:ze(e),listAttributes:ze(r),listType:fe(r)}}))}(r,e,t.get());n.each((function(e){te(e.end,r)&&t.set(!1)}));var i=ve(r).filter(on).map((function(r){return ln(e,n,t,r)})).getOr([]);return o.toArray().concat(i)}),(function(r){return ln(e,n,t,r)}))},ln=function(e,n,t,r){return A(me(r),(function(r){return(on(r)?ln:dn)(e+1,n,t,r)}))},mn=function(n,t){var r=fn(t);return L(r,(function(t){var r,o,i,u=(r=t.content,i=(o||e.document).createDocumentFragment(),w(r,(function(e){i.appendChild(e.dom())})),ne.fromDom(i));return ne.fromDom(Ke(n,u.dom()))}))},pn=function(e,n){var t=fn(n);return function(e,n){var t=D(n,(function(n,t){return t.depth>n.length?rn(e,n,t):tn(e,n,t)}),[]);return B(t).map((function(e){return e.list}))}(e.contentDocument,t).toArray()},gn=function(e,n,t){var r=function(e,n){var t,r=(t=!1,{get:function(){return t},set:function(e){t=e}});return L(e,(function(e){return{sourceList:e,entries:ln(0,n,r,e)}}))}(n,function(e){var n=L($e(e),ne.fromDom);return ce(x(n,s(un)),x(E(n),s(un)),(function(e,n){return{start:e,end:n}}))}(e));w(r,(function(n){!function(e,n){w(T(e,sn),(function(e){return function(e,n){switch(e){case"Indent":n.depth++;break;case"Outdent":n.depth--;break;case"Flatten":n.depth=0}n.dirty=!0}(n,e)}))}(n.entries,t);var r,o=function(e,n){return A(function(e,n){if(0===e.length)return[];for(var t=n(e[0]),r=[],o=[],i=0,u=e.length;i<u;i++){var a=e[i],s=n(a);s!==t&&(r.push(o),o=[]),t=s,o.push(a)}return 0!==o.length&&r.push(o),r}(n,an),(function(n){return B(n).map(an).getOr(!1)?pn(e,n):mn(e,n)}))}(e,n.entries);w(o,(function(n){Ce(e,"Indent"===t?"IndentList":"OutdentList",n.dom())})),r=n.sourceList,w(o,(function(e){he(r,e)})),be(n.sourceList)}))},vn=tinymce.util.Tools.resolve("tinymce.dom.DOMUtils"),hn=vn.DOM,yn=function(e,n){ie(n,"dd")?Ze(n,"dt"):ie(n,"dt")&&le(n).each((function(t){return function(e,n,t){var r=hn.select('span[data-mce-type="bookmark"]',n),o=Ke(e,t),i=hn.createRng();i.setStartAfter(t),i.setEndAfter(n);for(var u,a=i.extractContents(),s=a.firstChild;s;s=s.firstChild)if("LI"===s.nodeName&&e.dom.isEmpty(s)){hn.remove(s);break}e.dom.isEmpty(a)||hn.insertAfter(a,n),hn.insertAfter(o,n),Me(e.dom,t.parentNode)&&(u=t.parentNode,Ne.each(r,(function(e){u.parentNode.insertBefore(e,t.parentNode)})),hn.remove(u)),hn.remove(t),Me(e.dom,n)&&hn.remove(n)}(e,t.dom(),n.dom())}))},Sn=function(e){ie(e,"dt")&&Ze(e,"dd")},bn=function(e,n){if(Te(e))return{container:e,offset:n};var t=ue.getNode(e,n);return Te(t)?{container:t,offset:n>=e.childNodes.length?t.data.length:0}:t.previousSibling&&Te(t.previousSibling)?{container:t.previousSibling,offset:t.previousSibling.data.length}:t.nextSibling&&Te(t.nextSibling)?{container:t.nextSibling,offset:0}:{container:e,offset:n}},Cn=function(e){var n=e.cloneRange(),t=bn(e.startContainer,e.startOffset);n.setStart(t.container,t.offset);var r=bn(e.endContainer,e.endOffset);return n.setEnd(r.container,r.offset),n},On=function(e,n){var t=L(qe(e),ne.fromDom),r=L(function(e){return T($e(e),Ee)}(e),ne.fromDom),o=!1;if(t.length||r.length){var i=e.selection.getBookmark();gn(e,t,n),function(e,n,t){w(t,"Indent"===n?Sn:function(n){return yn(e,n)})}(e,n,r),e.selection.moveToBookmark(i),e.selection.setRng(Cn(e.selection.getRng())),e.nodeChanged(),o=!0}return o},Nn=function(e){return On(e,"Indent")},Ln=function(e){return On(e,"Outdent")},wn=function(e){return On(e,"Flatten")},Tn=tinymce.util.Tools.resolve("tinymce.dom.BookmarkManager"),Dn=vn.DOM,kn=function(e){var n={},t=function(t){var r,o,i;o=e[t?"startContainer":"endContainer"],i=e[t?"startOffset":"endOffset"],1===o.nodeType&&(r=Dn.create("span",{"data-mce-type":"bookmark"}),o.hasChildNodes()?(i=Math.min(i,o.childNodes.length-1),t?o.insertBefore(r,o.childNodes[i]):Dn.insertAfter(r,o.childNodes[i])):o.appendChild(r),o=r,i=0),n[t?"startContainer":"endContainer"]=o,n[t?"startOffset":"endOffset"]=i};return t(!0),e.collapsed||t(),n},xn=function(e){function n(n){var t,r,o;t=o=e[n?"startContainer":"endContainer"],r=e[n?"startOffset":"endOffset"],t&&(1===t.nodeType&&(r=function(e){for(var n=e.parentNode.firstChild,t=0;n;){if(n===e)return t;1===n.nodeType&&"bookmark"===n.getAttribute("data-mce-type")||t++,n=n.nextSibling}return-1}(t),t=t.parentNode,Dn.remove(o),!t.hasChildNodes()&&Dn.isBlock(t)&&t.appendChild(Dn.create("br"))),e[n?"startContainer":"endContainer"]=t,e[n?"startOffset":"endOffset"]=r)}n(!0),n();var t=Dn.createRng();return t.setStart(e.startContainer,e.startOffset),e.endContainer&&t.setEnd(e.endContainer,e.endOffset),Cn(t)},An=function(e){switch(e){case"UL":return"ToggleUlList";case"OL":return"ToggleOlList";case"DL":return"ToggleDLList"}},En=function(e){return/\btox\-/.test(e.className)},Bn=function(e,n,t){var r=function(e){var r=k(e.parents,De,Be).filter((function(e){return e.nodeName===n&&!En(e)})).isSome();t(r)},o=e.dom.getParents(e.selection.getNode());return r({parents:o}),e.on("NodeChange",r),function(){return e.off("NodeChange",r)}},Pn=function(e,n){Ne.each(n,(function(n,t){e.setAttribute(t,n)}))},Rn=function(e,n,t){!function(e,n,t){var r=t["list-style-type"]?t["list-style-type"]:null;e.setStyle(n,"list-style-type",r)}(e,n,t),function(e,n,t){Pn(n,t["list-attributes"]),Ne.each(e.select("li",n),(function(e){Pn(e,t["list-item-attributes"])}))}(e,n,t)},In=function(e,n,t,r){var o=n[t?"startContainer":"endContainer"],i=n[t?"startOffset":"endOffset"];for(1===o.nodeType&&(o=o.childNodes[Math.min(i,o.childNodes.length-1)]||o),!t&&Pe(o.nextSibling)&&(o=o.nextSibling);o.parentNode!==r;){if(Re(e,o))return o;if(/^(TD|TH)$/.test(o.parentNode.nodeName))return o;o=o.parentNode}return o},Mn=function(e,n,t){void 0===t&&(t={});var r=e.selection.getRng(),o="LI",i=He(e,e.selection.getStart(!0)),u=e.dom;if("false"!==u.getContentEditable(e.selection.getNode())){"DL"===(n=n.toUpperCase())&&(o="DT");var a=kn(r);Ne.each(function(e,n,t){for(var r,o=[],i=e.dom,u=In(e,n,!0,t),a=In(e,n,!1,t),s=[],c=u;c&&(s.push(c),c!==a);c=c.nextSibling);return Ne.each(s,(function(n){if(Re(e,n))return o.push(n),void(r=null);if(i.isBlock(n)||Pe(n))return Pe(n)&&i.remove(n),void(r=null);var u=n.nextSibling;Tn.isBookmarkNode(n)&&(Re(e,u)||!u&&n.parentNode===t)?r=null:(r||(r=i.create("p"),n.parentNode.insertBefore(r,n),o.push(r)),r.appendChild(n))})),o}(e,r,i),(function(r){var i,a=r.previousSibling;a&&De(a)&&a.nodeName===n&&function(e,n,t){var r=e.getStyle(n,"list-style-type"),o=t?t["list-style-type"]:"";return r===(o=null===o?"":o)}(u,a,t)?(i=a,r=u.rename(r,o),a.appendChild(r)):(i=u.create(n),r.parentNode.insertBefore(i,r),i.appendChild(r),r=u.rename(r,o)),function(e,n,t){Ne.each(t,(function(t){var r;return e.setStyle(n,((r={})[t]="",r))}))}(u,r,["margin","margin-right","margin-bottom","margin-left","margin-top","padding","padding-right","padding-bottom","padding-left","padding-top"]),Rn(u,i,t),_n(e.dom,i)})),e.selection.setRng(xn(a))}},Un=function(e,n,t){return function(e,n){return e&&n&&De(e)&&e.nodeName===n.nodeName}(n,t)&&function(e,n,t){return e.getStyle(n,"list-style-type",!0)===e.getStyle(t,"list-style-type",!0)}(e,n,t)&&(r=t,n.className===r.className);var r},_n=function(e,n){var t,r;if(t=n.nextSibling,Un(e,n,t)){for(;r=t.firstChild;)n.appendChild(r);e.remove(t)}if(t=n.previousSibling,Un(e,n,t)){for(;r=t.lastChild;)n.insertBefore(r,n.firstChild);e.remove(t)}},Fn=function(e,n,t,r,o){if(n.nodeName!==r||$n(o)){var i=kn(e.selection.getRng(!0));Ne.each([n].concat(t),(function(n){!function(e,n,t,r){if(n.nodeName!==t){var o=e.dom.rename(n,t);Rn(e.dom,o,r),Ce(e,An(t),o)}else Rn(e.dom,n,r),Ce(e,An(t),n)}(e,n,r,o)})),e.selection.setRng(xn(i))}else wn(e)},$n=function(e){return"list-style-type"in e},Hn=function(e,n,t){var r=_e(e),o=Fe(e);t=t||{},r&&o.length>0?Fn(e,r,o,n,t):function(e,n,t,r){if(n!==e.getBody())if(n)if(n.nodeName!==t||$n(r)||En(n)){var o=kn(e.selection.getRng(!0));Rn(e.dom,n,r);var i=e.dom.rename(n,t);_n(e.dom,i),e.selection.setRng(xn(o)),Ce(e,An(t),i)}else wn(e);else Mn(e,t,r),Ce(e,An(t),n)}(e,r,n,t)},jn=vn.DOM,qn=function(e,n){Ne.each(Ne.grep(e.select("ol,ul",n)),(function(n){!function(e,n){var t,r=n.parentNode;"LI"===r.nodeName&&r.firstChild===n&&((t=r.previousSibling)&&"LI"===t.nodeName?(t.appendChild(n),Me(e,r)&&jn.remove(r)):jn.setStyle(r,"listStyleType","none")),De(r)&&(t=r.previousSibling)&&"LI"===t.nodeName&&t.appendChild(n)}(e,n)}))},Wn=function(e,n,t,r){var o=n.startContainer,i=n.startOffset;if(Te(o)&&(t?i<o.data.length:i>0))return o;var u=e.schema.getNonEmptyElements();1===o.nodeType&&(o=ue.getNode(o,i));var a=new ae(o,r);for(t&&function(e,n){return!!Pe(n)&&!(!e.isBlock(n.nextSibling)||Pe(n.previousSibling))}(e.dom,o)&&a.next();o=a[t?"next":"prev2"]();){if("LI"===o.nodeName&&!o.hasChildNodes())return o;if(u[o.nodeName])return o;if(Te(o)&&o.data.length>0)return o}},Kn=function(e,n){var t=n.childNodes;return 1===t.length&&!De(t[0])&&e.isBlock(t[0])},Vn=function(e,n,t){var r,o=Kn(e,t)?t.firstChild:t;if(function(e,n){Kn(e,n)&&e.remove(n.firstChild,!0)}(e,n),!Me(e,n,!0))for(;r=n.firstChild;)o.appendChild(r)},Qn=function(e,n,t){var r,o=n.parentNode;if(Ue(e,n)&&Ue(e,t)){De(t.lastChild)&&(r=t.lastChild),o===t.lastChild&&Pe(o.previousSibling)&&e.remove(o.previousSibling);var i=t.lastChild;i&&Pe(i)&&n.hasChildNodes()&&e.remove(i),Me(e,t,!0)&&e.$(t).empty(),Vn(e,n,t),r&&t.appendChild(r);var u=oe(ne.fromDom(t),ne.fromDom(n))?e.getParents(n,De,t):[];e.remove(n),w(u,(function(n){Me(e,n)&&n!==e.getRoot()&&e.remove(n)}))}},Xn=function(e,n,t,r){var o=e.dom;if(o.isEmpty(r))!function(e,n,t){e.dom.$(t).empty(),Qn(e.dom,n,t),e.selection.setCursorLocation(t)}(e,t,r);else{var i=kn(n);Qn(o,t,r),e.selection.setRng(xn(i))}},Jn=function(e,n){var t=e.dom,r=e.selection,o=r.getStart(),i=He(e,o),u=t.getParent(r.getStart(),"LI",i);if(u){var a=u.parentNode;if(a===e.getBody()&&Me(t,a))return!0;var s=Cn(r.getRng()),c=t.getParent(Wn(e,s,n,i),"LI",i);if(c&&c!==u)return e.undoManager.transact((function(){var t;n?Xn(e,s,c,u):(t=u).parentNode.firstChild===t?Ln(e):function(e,n,t,r){var o=kn(n);Qn(e.dom,t,r);var i=xn(o);e.selection.setRng(i)}(e,s,u,c)})),!0;if(!c&&!n&&0===s.startOffset&&0===s.endOffset)return e.undoManager.transact((function(){wn(e)})),!0}return!1},zn=function(e,n){return Jn(e,n)||function(e,n){var t=e.dom,r=e.selection.getStart(),o=He(e,r),i=t.getParent(r,t.isBlock,o);if(i&&t.isEmpty(i)){var u=Cn(e.selection.getRng()),a=t.getParent(Wn(e,u,n,o),"LI",o);if(a)return e.undoManager.transact((function(){!function(e,n,t){var r=e.getParent(n.parentNode,e.isBlock,t);e.remove(n),r&&e.isEmpty(r)&&e.remove(r)}(t,i,o),_n(t,a.parentNode),e.selection.select(a,!0),e.selection.collapse(n)})),!0}return!1}(e,n)},Yn=function(e,n){return e.selection.isCollapsed()?zn(e,n):function(e){var n=e.selection.getStart(),t=He(e,n);return!!(e.dom.getParent(n,"LI,DT,DD",t)||$e(e).length>0)&&(e.undoManager.transact((function(){e.execCommand("Delete"),qn(e.dom,e.getBody())})),!0)}(e)},Gn=function(e){var n=e.dom,t=_e(e);xe(t)&&e.windowManager.open({title:"List Properties",body:{type:"panel",items:[{type:"input",name:"start",label:"Start list at number",inputMode:"numeric"}]},initialData:{start:n.getAttrib(t,"start")||"1"},buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0}],onSubmit:function(t){var r=t.getData();e.undoManager.transact((function(){n.setAttrib(_e(e),"start","1"===r.start?"":r.start)})),t.close()}})},Zn=function(e,n){return function(){var t=e.dom.getParent(e.selection.getStart(),"UL,OL,DL");return t&&t.nodeName===n}},et=function(e){(function(e){return e.getParam("lists_indent_on_tab",!0)})(e)&&function(e){e.on("keydown",(function(n){n.keyCode!==se.TAB||se.metaKeyPressed(n)||e.undoManager.transact((function(){(n.shiftKey?Ln(e):Nn(e))&&n.preventDefault()}))}))}(e),function(e){e.on("keydown",(function(n){n.keyCode===se.BACKSPACE?Yn(e,!1)&&n.preventDefault():n.keyCode===se.DELETE&&Yn(e,!0)&&n.preventDefault()}))}(e)};i.add("lists",(function(e){return!1===function(e){return!(!/(^|[ ,])rtc([, ]|$)/.test(e.getParam("plugins","","string"))||!i.get("rtc"))}(e)&&(et(e),function(e){e.on("BeforeExecCommand",(function(n){var t=n.command.toLowerCase();"indent"===t?Nn(e):"outdent"===t&&Ln(e)})),e.addCommand("InsertUnorderedList",(function(n,t){Hn(e,"UL",t)})),e.addCommand("InsertOrderedList",(function(n,t){Hn(e,"OL",t)})),e.addCommand("InsertDefinitionList",(function(n,t){Hn(e,"DL",t)})),e.addCommand("RemoveList",(function(){wn(e)})),e.addCommand("mceListProps",(function(){Gn(e)})),e.addQueryStateHandler("InsertUnorderedList",Zn(e,"UL")),e.addQueryStateHandler("InsertOrderedList",Zn(e,"OL")),e.addQueryStateHandler("InsertDefinitionList",Zn(e,"DL"))}(e)),function(e){var n=function(n){return function(){return e.execCommand(n)}};(function(e,n){var t=e.getParam("plugins","","string");return-1!==Ne.inArray(t.split(/[ ,]/),n)})(e,"advlist")||(e.ui.registry.addToggleButton("numlist",{icon:"ordered-list",active:!1,tooltip:"Numbered list",onAction:n("InsertOrderedList"),onSetup:function(n){return Bn(e,"OL",n.setActive)}}),e.ui.registry.addToggleButton("bullist",{icon:"unordered-list",active:!1,tooltip:"Bullet list",onAction:n("InsertUnorderedList"),onSetup:function(n){return Bn(e,"UL",n.setActive)}}))}(e),function(e){var n={text:"List properties...",icon:"ordered-list",onAction:function(){return Gn(e)},onSetup:function(n){return Bn(e,"OL",(function(e){return n.setDisabled(!e)}))}};e.ui.registry.addMenuItem("listprops",n),e.ui.registry.addContextMenu("lists",{update:function(n){var t=_e(e,n);return xe(t)?["listprops"]:[]}})}(e),function(e){return{backspaceDelete:function(n){Yn(e,n)}}}(e)}))}(window)}}]);