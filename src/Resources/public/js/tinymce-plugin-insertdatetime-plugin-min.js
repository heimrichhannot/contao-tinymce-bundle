(window.webpackJsonp=window.webpackJsonp||[]).push([["tinymce-plugin-insertdatetime-plugin-min"],{v0LA:function(e,t){!function(){"use strict";var e=tinymce.util.Tools.resolve("tinymce.PluginManager"),t=function(e){return e.getParam("insertdatetime_timeformat",e.translate("%H:%M:%S"))},n=function(e){return e.getParam("insertdatetime_formats",["%H:%M:%S","%Y-%m-%d","%I:%M:%S %p","%D"])},r="Sun Mon Tue Wed Thu Fri Sat Sun".split(" "),a="Sunday Monday Tuesday Wednesday Thursday Friday Saturday Sunday".split(" "),i="Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),o="January February March April May June July August September October November December".split(" "),u=function(e,t){if((e=""+e).length<t)for(var n=0;n<t-e.length;n++)e="0"+e;return e},c=function(e,t,n){return n=n||new Date,(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=t.replace("%D","%m/%d/%Y")).replace("%r","%I:%M:%S %p")).replace("%Y",""+n.getFullYear())).replace("%y",""+n.getYear())).replace("%m",u(n.getMonth()+1,2))).replace("%d",u(n.getDate(),2))).replace("%H",""+u(n.getHours(),2))).replace("%M",""+u(n.getMinutes(),2))).replace("%S",""+u(n.getSeconds(),2))).replace("%I",""+((n.getHours()+11)%12+1))).replace("%p",n.getHours()<12?"AM":"PM")).replace("%B",""+e.translate(o[n.getMonth()]))).replace("%b",""+e.translate(i[n.getMonth()]))).replace("%A",""+e.translate(a[n.getDay()]))).replace("%a",""+e.translate(r[n.getDay()]))).replace("%%","%")},m=function(e,t){if(e.getParam("insertdatetime_element",!1)){var n,r=c(e,t);n=/%[HMSIp]/.test(t)?c(e,"%Y-%m-%dT%H:%M"):c(e,"%Y-%m-%d");var a=e.dom.getParent(e.selection.getStart(),"time");a?(o=a,u=n,m=r,s=(i=e).dom.create("time",{datetime:u},m),o.parentNode.insertBefore(s,o),i.dom.remove(o),i.selection.select(s,!0),i.selection.collapse(!1)):e.insertContent('<time datetime="'+n+'">'+r+"</time>")}else e.insertContent(c(e,t));var i,o,u,m,s},s=tinymce.util.Tools.resolve("tinymce.util.Tools");e.add("insertdatetime",(function(e){(function(e){e.addCommand("mceInsertDate",(function(){var t;m(e,(t=e).getParam("insertdatetime_dateformat",t.translate("%Y-%m-%d")))})),e.addCommand("mceInsertTime",(function(){m(e,t(e))}))})(e),function(e){var r,a,i,o,u=n(e),l=(r=0<(o=n(i=e)).length?o[0]:t(i),a=r,{get:function(){return a},set:function(e){a=e}});e.ui.registry.addSplitButton("insertdatetime",{icon:"insert-time",tooltip:"Insert date/time",select:function(e){return e===l.get()},fetch:function(t){t(s.map(u,(function(t){return{type:"choiceitem",text:c(e,t),value:t}})))},onAction:function(t){m(e,l.get())},onItemAction:function(t,n){l.set(n),m(e,n)}}),e.ui.registry.addNestedMenuItem("insertdatetime",{icon:"insert-time",text:"Date/time",getSubmenuItems:function(){return s.map(u,(function(t){return{type:"menuitem",text:c(e,t),onAction:(n=t,function(){l.set(n),m(e,n)})};var n}))}})}(e)}))}()}}]);