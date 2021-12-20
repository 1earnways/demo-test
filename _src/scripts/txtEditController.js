var textObj={}, 
    hasDB = false,
    projectId = "", 
    langObj, url = "", editInterval,
    secret = "77154f46-d142-43fa-97f4-ba4e12f88452";
    window.prefix="" ;

function getText(txtid) {
	if (textObj[txtid]) {
		return textObj[txtid];
	} else {
		return txtid+ " saknas i db";
	}	
}

//SET TEXT
function setText($target) {
	var dbid = $target.data('dbid'); 
	////console.log(dbid, textObj[dbid]);
	if (textObj[dbid]) {
		$target.html(textObj[dbid]);
	} else {
		$target.html(dbid+ " saknas i db");
	}
}
function updateText($target) {
    var $allTxt = $target.find('.db-txt');
	$allTxt.each(function() {
		setText($(this));
    });	
    var $altTxt = $('img.db-alt');
	$altTxt.each(function() {
		setAltText($(this));
	});	
    var $ariaTxt = $('.db-aria');
	$ariaTxt.each(function() {
		setAriaText($(this));
	});	
}
function setAltText($target) {    
	var dbid = $target.data('dbid');
	if (textObj[dbid]) {
		$target.prop("alt", textObj[dbid]);
	} else {
		$target.prop("alt", "");
	}
}
function setAriaText($target) {
    var dbid = $target.data('ariaid');
    //console.log(textObj[dbid]);
	if (textObj[dbid]) {
        $target.attr("aria-label", textObj[dbid]);
	} else {
		$target.attr("aria-label", "");
	}
}

function initText() {
    
	window.txthasLoaded  = true;
	var $allTxt = $('.db-txt');
	$allTxt.each(function() {
		setText($(this));
    });	
    var $altTxt = $('img.db-alt');
	$altTxt.each(function() {
		setAltText($(this));
	});	
    var $ariaTxt = $('.db-aria');
	$ariaTxt.each(function() {
		setAriaText($(this));
	});	

    addEditor();
    
}

function addEditor($parent) {
    var $txtredit, $txtrbox;
    if ($parent) {
        $txtredit = $parent.find('.txtr-edit');
        $txtrbox = $parent.find('.txtr-textbox');
    } else {
        $txtredit = $('.txtr-edit');
        $txtrbox = $('.txtr-textbox');
    }

    if (hasDB) {
        $txtredit.TxtrEditor({
            projectid: projectId,
            readonly: langObj.readonly
        });

        $txtrbox.TxtrEditor({
            projectid: projectId,
            toolbar: [
            'undo redo | bold italic underline | numlist bullist '            
            ],
            plugins: [
            'link',
            'lists',
            'autolink'
            ],
            readonly: langObj.readonly
        });	
    }
    
}

function setupTextObj(data, isChange) {
    //console.log("setupTextObj", isChange);
    textObj = data;
    initText();	
    
    if (!isChange) {
        //console.log("initContent");
        initContent(); 
    } 
    if (langObj.saveToSession) {
        sessionStorage.setItem(projectId, JSON.stringify(data));  
    }
    
    $('#preloader').fadeOut('fast',function(){$(this).remove();});
}
    


function loadLanguage(isChange) {
    
    projectId = langObj.langs[window.lang][0];  
    //console.log(projectId, "PREFIX:", window.prefix);      
    window.txthasLoaded = false;    
    var hasData = JSON.parse(sessionStorage.getItem(projectId));
    window.prefix = langObj.prefix;
	url = langObj.url;
    if (!hasData || !langObj.saveToSession) {
        
        if (!langObj.useDB) {
            //LOAD FROM JSON
            $.getJSON(window.prefix+'json/'+window.lang+'.json', function(data) {
                //console.log("Load data from JSON");
                hasDB = false;
                setupTextObj(data, isChange);
            }); 
       
        } else {
            //LOAD FROM DATABASE 
           // console.log(url+'/api/text/'+projectId);
            $.ajax( url+'/api/text/'+projectId )
                .done(function(data) {
                    //console.log("Load data from DB");
                   if ($.isEmptyObject(data)) {
                    $.getJSON(window.prefix+'json/'+window.lang+'.json', function(data) {
                        //console.log("No DB - load data from JSON");
                        hasDB = false;
                        setupTextObj(data, isChange);
                    });
                   } else {
                        hasDB = true;
                       setupTextObj(data, isChange); 
                   }
                                       
                })
                .fail(function() {
                    $.getJSON(window.prefix+'json/'+window.lang+'.json', function(data) {
                        //console.log("No DB - load data from JSON");
                        hasDB = false;
                        setupTextObj(data, isChange);
                    });
                 });           
        }
        
    } else {
        //LOAD FROM SESSIONSTORAGE
       //console.log("Load data from SessionStorage");
       hasDB = false;
        setupTextObj(hasData, isChange);
    }

    $('img.img-lang').each(function() {
        var img = $(this).attr('src').split('/');
        $(this).attr('src', 'img/'+window.lang+'/'+img[2]);
    }); 
}


function getLang (langdefault) {
    
    var currLang = sessionStorage.getItem('language');
    //currLang = "sv";
    if (currLang) {
        window.lang = currLang;
        setLang(currLang);
    } else {
        window.lang = langdefault;
        setLang(langdefault); 
    } 
   //console.log(langObj);        
        var nrOfLangs = 0;
        $.each(langObj.langs, function(i, prop) {
            if (prop[2] == 1) {
                nrOfLangs++;
            }
        });
    //console.log("nrOfLangs", nrOfLangs);
    if ($("#lang-menu").length<1 && nrOfLangs>1)  {

        if (nrOfLangs>1)  {
            $('nav').addClass("multilang");
            $('nav').append(getLangMenu()); 
            $('button.lang-current').click(function() {
                $('#lang-selector').addClass("show");
            });
            $('a.lang-option').click(function(e) {
                e.preventDefault();            
                var id=$(this).attr('href');
                $('button.lang-current').text(id);
                $('.lang-option.current').removeClass("current");
                $(this).addClass("current");
                $('#lang-selector').removeClass("show");
                setLang(id);
                loadLanguage(true);
            }); 
        }
        
    }   
} 

function getLangMenu() {
    var html="";
        html+='<div id="lang-menu">';
            html+='<button class="lang-current">'+window.lang+'</button>';        
            html+='<div id="lang-selector">';
                $.each(langObj.langs, function(i, prop) {
                    if (i==window.lang) {
                        html+='<a class="lang-option current" href="'+i+'">'+i+'</a>';
                    } else {
                        html+='<a class="lang-option" href="'+i+'">'+i+'</a>';
                    }                
                });
            html+='</div>';
        html+='</div>';
    return html;
}

function setLang(langid) {
    //console.log("Language", langid);
    window.lang = langid;
    sessionStorage.setItem('language', window.lang);
    $("html").attr("lang", window.lang);   
}


(function ($) {
	"use strict";	
    window.txthasLoaded = false; 

   /* if ($('body').hasClass("resource")) {
        window.prefix = "../";
    }*/
     $.getJSON( window.prefix+'json/lang.json', function(data) {
        langObj = data;
        getLang (data.default); 
        loadLanguage(false);
      });   

      $.fn.TxtrEditor = function (options) {
        var plugin = this;

        if (typeof options.toolbar === "undefined") {
            options.toolbar = "undo redo | bold italic underline";
        }

        if (typeof options !== "undefined") {
            //Init TxtrEditor.

            if (typeof options.projectid !== "undefined") {
                //Load from Txtr.
                var request = $.ajax({
                    url: url + "/Api/Text/" + options.projectid,
                });

                request.done(function (data) {
                    plugin.each(function () {
                        var key = $(this).data("dbid");
                        var value = eval("data." + key);

                        if (typeof value !== "undefined" && value.length > 0) {
                            $(this).html(value);
                            $(this).data("original-value", value);
                        } else {
                            $(this).html(key+ " saknas i txtr");
                            $(this).data("original-value", "Saknas i Txtr");
                        }

                        if (options.readonly !== true) {
                            $(this).addClass("editable");
                        }
                    });
                });

                request.fail(function (jqXHR, textStatus) {
                    //console.log("Just nu gick det inte att hämta texter, försök igen senare.");
                });
            }

            //Init TinyMce.
            plugin.each(function () {
                if (options.readonly === true) {
                    return;
                }

                var config = {
                    target: this,
                    menubar: false,
                    inline: true,
                    plugins: options.plugins,
                    toolbar: options.toolbar,
                    powerpaste_word_import: 'clean',
                    powerpaste_html_import: 'clean',
                };

                tinymce.init(config);

                tinymce.activeEditor.on('focus', function (e) {
                    //console.log("Got focus");
                    $(tinymce.activeEditor.getElement()).removeClass("saved");
                    editInterval = setInterval(function () {
                        if (tinymce.activeEditor.getContent() != $(tinymce.activeEditor.getElement()).data("original-value")) {
                            //console.log("Text changed.");
                            $(tinymce.activeEditor.getElement()).addClass("changed");
                        } else {
                            $(tinymce.activeEditor.getElement()).removeClass("changed");
                        }

                        if ($(".editable.changed").length > 0) {
                            window.onbeforeunload = function (e) {
                                e.returnValue = "Du har osparad text på sidan!";
                            }
                        } else {
                            window.onbeforeunload = null;
                        }
                    }, 500);
                });

                tinymce.activeEditor.on('blur', function (e) {
                    //console.log("Lost focus");
                    clearInterval(editInterval);

                    var activeEditor = tinymce.activeEditor;

                    if (activeEditor.getContent() != $(activeEditor.getElement()).data("original-value")) {
                        //Save to Txtr.
                        if (options.projectid !== "undefined") {
                            //Load from Txtr.
                            var request = $.ajax({
                                url: url + "/Home/SetText",
                                method: "POST",
                                data: {
                                    secret: secret,
                                    projectid: options.projectid,
                                    key: $(activeEditor.getElement()).data("dbid"),
                                    value: activeEditor.getContent()
                                }
                            });

                            request.done(function (data) {
                                //console.log(data.error);
                                if (data.error === "") {
                                    //console.log("Text saved.");
                                    $(activeEditor.getElement()).removeClass("changed");
                                    $(activeEditor.getElement()).addClass("saved");
                                    $(activeEditor.getElement()).data("original-value", data.value);

                                    if ($(".editable.changed").length > 0) {
                                        window.onbeforeunload = function (e) {
                                            e.returnValue = "Du har osparad text på sidan!";
                                        }
                                    } else {
                                        window.onbeforeunload = null;
                                    }

                                    setTimeout(function () {
                                        $(activeEditor.getElement()).removeClass("saved");
                                    }, 5000);
                                } else {
                                    alert("Just nu gick det inte att uppdatera denna texten, försök igen senare.");
                                }
                            });

                            request.fail(function (jqXHR, textStatus) {
                                //console.log(textStatus);
                                alert("Just nu gick det inte att uppdatera denna texten, försök igen senare.");
                            });
                        }
                    }
                });
            });
        }
    };
    			
})(jQuery);