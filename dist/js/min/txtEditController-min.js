function getText(t){return textObj[t]?textObj[t]:t+" saknas i db"}function setText(t){var e=t.data("dbid");textObj[e]?t.html(textObj[e]):t.html(e+" saknas i db")}function updateText(t){t.find(".db-txt").each(function(){setText($(this))}),$("img.db-alt").each(function(){setAltText($(this))}),$(".db-aria").each(function(){setAriaText($(this))})}function setAltText(t){var e=t.data("dbid");textObj[e]?t.prop("alt",textObj[e]):t.prop("alt","")}function setAriaText(t){var e=t.data("ariaid");textObj[e]?t.attr("aria-label",textObj[e]):t.attr("aria-label","")}function initText(){window.txthasLoaded=!0,$(".db-txt").each(function(){setText($(this))}),$("img.db-alt").each(function(){setAltText($(this))}),$(".db-aria").each(function(){setAriaText($(this))}),addEditor()}function addEditor(t){var e,n;t?(e=t.find(".txtr-edit"),n=t.find(".txtr-textbox")):(e=$(".txtr-edit"),n=$(".txtr-textbox")),hasDB&&(e.TxtrEditor({projectid:projectId,readonly:langObj.readonly}),n.TxtrEditor({projectid:projectId,toolbar:["undo redo | bold italic underline | numlist bullist "],plugins:["link","lists","autolink"],readonly:langObj.readonly}))}function setupTextObj(t,e){textObj=t,initText(),e||initContent(),langObj.saveToSession&&sessionStorage.setItem(projectId,JSON.stringify(t)),$("#preloader").fadeOut("fast",function(){$(this).remove()})}function loadLanguage(e){projectId=langObj.langs[window.lang][0],window.txthasLoaded=!1;var t=JSON.parse(sessionStorage.getItem(projectId));window.prefix=langObj.prefix,url=langObj.url,t&&langObj.saveToSession?(hasDB=!1,setupTextObj(t,e)):langObj.useDB?$.ajax(url+"/api/text/"+projectId).done(function(t){$.isEmptyObject(t)?$.getJSON(window.prefix+"json/"+window.lang+".json",function(t){hasDB=!1,setupTextObj(t,e)}):(hasDB=!0,setupTextObj(t,e))}).fail(function(){$.getJSON(window.prefix+"json/"+window.lang+".json",function(t){hasDB=!1,setupTextObj(t,e)})}):$.getJSON(window.prefix+"json/"+window.lang+".json",function(t){hasDB=!1,setupTextObj(t,e)}),$("img.img-lang").each(function(){var t=$(this).attr("src").split("/");$(this).attr("src","img/"+window.lang+"/"+t[2])})}function getLang(t){var e=sessionStorage.getItem("language");setLang(window.lang=e||t);var n=0;$.each(langObj.langs,function(t,e){1==e[2]&&n++}),$("#lang-menu").length<1&&1<n&&1<n&&($("nav").addClass("multilang"),$("nav").append(getLangMenu()),$("button.lang-current").click(function(){$("#lang-selector").addClass("show")}),$("a.lang-option").click(function(t){t.preventDefault();var e=$(this).attr("href");$("button.lang-current").text(e),$(".lang-option.current").removeClass("current"),$(this).addClass("current"),$("#lang-selector").removeClass("show"),setLang(e),loadLanguage(!0)}))}function getLangMenu(){var n="";return n+='<div id="lang-menu">',n+='<button class="lang-current">'+window.lang+"</button>",n+='<div id="lang-selector">',$.each(langObj.langs,function(t,e){t==window.lang?n+='<a class="lang-option current" href="'+t+'">'+t+"</a>":n+='<a class="lang-option" href="'+t+'">'+t+"</a>"}),n+="</div>",n+="</div>"}function setLang(t){window.lang=t,sessionStorage.setItem("language",window.lang),$("html").attr("lang",window.lang)}var textObj={},hasDB=!1,projectId="",langObj,url="",editInterval,secret="77154f46-d142-43fa-97f4-ba4e12f88452";window.prefix="",function($){"use strict";window.txthasLoaded=!1,$.getJSON(window.prefix+"json/lang.json",function(t){getLang((langObj=t).default),loadLanguage(!1)}),$.fn.TxtrEditor=function(options){var plugin=this;if(void 0===options.toolbar&&(options.toolbar="undo redo | bold italic underline"),void 0!==options){if(void 0!==options.projectid){var request=$.ajax({url:url+"/Api/Text/"+options.projectid});request.done(function(data){plugin.each(function(){var key=$(this).data("dbid"),value=eval("data."+key);void 0!==value&&0<value.length?($(this).html(value),$(this).data("original-value",value)):($(this).html(key+" saknas i txtr"),$(this).data("original-value","Saknas i Txtr")),!0!==options.readonly&&$(this).addClass("editable")})}),request.fail(function(t,e){})}plugin.each(function(){if(!0!==options.readonly){var t={target:this,menubar:!1,inline:!0,plugins:options.plugins,toolbar:options.toolbar,powerpaste_word_import:"clean",powerpaste_html_import:"clean"};tinymce.init(t),tinymce.activeEditor.on("focus",function(t){$(tinymce.activeEditor.getElement()).removeClass("saved"),editInterval=setInterval(function(){tinymce.activeEditor.getContent()!=$(tinymce.activeEditor.getElement()).data("original-value")?$(tinymce.activeEditor.getElement()).addClass("changed"):$(tinymce.activeEditor.getElement()).removeClass("changed"),0<$(".editable.changed").length?window.onbeforeunload=function(t){t.returnValue="Du har osparad text på sidan!"}:window.onbeforeunload=null},500)}),tinymce.activeEditor.on("blur",function(t){clearInterval(editInterval);var e=tinymce.activeEditor;if(e.getContent()!=$(e.getElement()).data("original-value")&&"undefined"!==options.projectid){var n=$.ajax({url:url+"/Home/SetText",method:"POST",data:{secret:secret,projectid:options.projectid,key:$(e.getElement()).data("dbid"),value:e.getContent()}});n.done(function(t){""===t.error?($(e.getElement()).removeClass("changed"),$(e.getElement()).addClass("saved"),$(e.getElement()).data("original-value",t.value),0<$(".editable.changed").length?window.onbeforeunload=function(t){t.returnValue="Du har osparad text på sidan!"}:window.onbeforeunload=null,setTimeout(function(){$(e.getElement()).removeClass("saved")},5e3)):alert("Just nu gick det inte att uppdatera denna texten, försök igen senare.")}),n.fail(function(t,e){alert("Just nu gick det inte att uppdatera denna texten, försök igen senare.")})}})}})}}}(jQuery);