var pageId = $( 'body' ).attr( 'id' );

if (navigator.userAgent.match(/msie/i) || navigator.userAgent.match(/trident/i) || navigator.userAgent.match(/edge/i) ){
	//console.log("IS IE");
	$("html").addClass("ie");
}
if (window.navigator.userAgent.indexOf('Edge/')>-1){
	//console.log("IS EDGE");
	$("html").addClass("edge");
}
if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1 &&  navigator.userAgent.indexOf('Android') == -1){
	//console.log("IS SAFARI");
	$("html").addClass("safari");
}
//console.log(window.navigator.userAgent);

//---------------------------------//
//---------- ANIMATIONS -----------//
//---------------------------------//


function animateCSS($element, animationName, animationDelay, callback) {

	if (animationDelay=="") {
		animationDelay = 0;
	}

	switch(animationName) {
		case "flipInX":
			TweenLite.fromTo($element, 0.75, {alpha:0, scaleY:0}, {alpha:1, scaleY:1, onComplete:handleAnimationEnd});
		break;
		case "flipOutX":
			TweenLite.fromTo($element, 0.75, {alpha:1, scaleY:1}, {alpha:0, scaleY:0, onComplete:handleAnimationEnd});
		break;
		
		case "zoomIn":
			TweenLite.fromTo($element, 0.75, {alpha:0, scale:0}, {alpha:1, scale:1, onComplete:handleAnimationEnd});
		break;
		case "zoomOut":
			TweenLite.fromTo($element, 0.75, {alpha:1, scale:1}, {alpha:0, scale:0, onComplete:handleAnimationEnd});
		break;

		case "fadeIn":
			TweenLite.fromTo($element, 0.75, {alpha:0}, {alpha:1, onComplete:handleAnimationEnd});
		break;
		case "fadeInFast":
			TweenLite.fromTo($element, 0.15, {alpha:0}, {alpha:1, onComplete:handleAnimationEnd});
		break;
		case "fadeInDown":
			TweenLite.fromTo($element, 0.75, {alpha:0, y:-$element.height()}, {alpha:1, y:0, onComplete:handleAnimationEnd, delay:animationDelay});
		break;
		case "fadeInUp":
			TweenLite.fromTo($element, 0.75, {alpha:0, y:$element.height()}, {alpha:1, y:0, onComplete:handleAnimationEnd});
		break;
		case "fadeInRight":
			TweenLite.fromTo($element, 0.75, {alpha:0, x:$element.width()}, {alpha:1, x:0, onComplete:handleAnimationEnd});
		break;
		case "fadeInLeft":
			TweenLite.fromTo($element, 0.75, {alpha:0, x:-$element.width()}, {alpha:1, x:0, onComplete:handleAnimationEnd});
		break;

		case "fadeOut":
			TweenLite.fromTo($element, 0.75, {alpha:1}, {alpha:0, onComplete:handleAnimationEnd});
		break;		
		case "fadeOutFast":
			TweenLite.fromTo($element, 0.15, {alpha:1}, {alpha:0, onComplete:handleAnimationEnd});
		break;
		case "fadeOutLeft":
			TweenLite.fromTo($element, 0.75, {alpha:1, x:0}, {alpha:0, x:-$element.width(), onComplete:handleAnimationEnd});
		break;
		case "fadeOutRight":
			TweenLite.fromTo($element, 0.75, {alpha:1, x:0}, {alpha:0, x:$element.width(), onComplete:handleAnimationEnd});
		break;
		case "fadeOutUp":
			TweenLite.fromTo($element, 0.75, {alpha:1, y:0}, {alpha:0, y:-$element.height(), onComplete:handleAnimationEnd});
		break;	
		case "fadeOutDown":
			TweenLite.fromTo($element, 0.75, {alpha:1, y:0}, {alpha:0, y:$element.height(), onComplete:handleAnimationEnd});
		break;	
		case "slideInRight":
			TweenLite.fromTo($element, 0.75, {x:$element.width()}, {x:0, onComplete:handleAnimationEnd});
		break;
		case "slideOutRight":
			TweenLite.fromTo($element, 0.75, {x:0}, {x:$element.width(), onComplete:handleAnimationEnd});
		break;
		case "slideInDown":
			TweenLite.fromTo($element, 0.75, {alpha:0.8, y:-$element.height()}, {alpha:1, y:0, onComplete:handleAnimationEnd});
		break;
		case "slideOutDown":
			TweenLite.fromTo($element, 0.75, {alpha:1, y:0}, {alpha:0, y:$element.height(), onComplete:handleAnimationEnd});
		break;	
		case "slideInUp": 
			TweenLite.fromTo($element, 0.75, {alpha:1, y:$element.height()}, {alpha:1, y:0, onComplete:handleAnimationEnd});
		break;
				
		case "heartBeat":
			TweenMax.to($element, 1, {scaleX:1.3, scaleY:1.3, ease:Elastic.easeOut});
		break;
		case "scaleOut":
			TweenMax.fromTo($element, 1, {alpha:1, scale:1}, {alpha:0, scale:0, onComplete:handleAnimationEnd, delay:animationDelay});
		break;
		case "scaleIn":
			TweenMax.fromTo($element, 1, {alpha:0, scale:0}, {alpha:1, scale:1, onComplete:handleAnimationEnd, delay:animationDelay});
		break;
		
	}

	function handleAnimationEnd() {
        $element.removeClass('animated');
		$element.removeClass(animationName);
		//$element.removeClass(animationDelay);
        if (typeof callback === 'function') {
            callback();
        }
	}
}


function getURLParameter(sParam){
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function updateURLParameter(url, param, paramVal){
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
        tempArray = additionalURL.split("&");
        for (var i=0; i<tempArray.length; i++){
            if(tempArray[i].split('=')[0] != param){
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}

function setURLParameter(param, value) {
	var url = window.location.href;
	url = url.slice( 0, url.indexOf('&') );
	//console.log(url);
	var newURL = updateURLParameter(url, param, value);
	window.history.replaceState('', '', updateURLParameter(window.location.href, param, value));
}

function getArray(nr) {
	var array = [];
	for (var i=0; i<nr; i++) {
		array.push(0);
	}
	return array;
}


$.fn.hasScrollBar = function() {
	return this.get(0).scrollHeight > this.height();
}

function showMe($item) {
    $item.removeClass("js-isHidden");    
}
function hideMe($item) {
    $item.addClass("js-isHidden");    
}

function strToBool(s) {
    regex=/^\s*(true|1|on)\s*$/i
    return regex.test(s);
}
String.prototype.bool = function() {
    return strToBool(this);
};

function isMobile() {
    var windowWidth = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

    if (windowWidth>767) {
        return false;
    } else {
        return true;
    }    
}

function getWinWIdth() {
    var windowWidth = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

    return windowWidth;  
}

var trapFocus = function(elem) {
    
	var tabbable = elem.find('select, input, textarea, button, a').filter(':visible');
	
	var firstTabbable = tabbable.first();
	var lastTabbable = tabbable.last();
	/*set focus on first input
	firstTabbable.focus();	

	/*redirect last tab to first input*/
	lastTabbable.on('keydown', function (e) {
	   if ((e.which === 9 && !e.shiftKey)) {
		   e.preventDefault();
		   firstTabbable.focus();
	   }
	});

	/*redirect first shift+tab to last input*/
	firstTabbable.on('keydown', function (e) {
		if ((e.which === 9 && e.shiftKey)) {
			e.preventDefault();
			lastTabbable.focus();
		}
	});
	
	/* allow escape key to close insiders div */
	elem.on('keyup', function(e){
	  if (e.keyCode === 27 ) {
		elem.hide();
	  };
	});
  };

function randomRange(max) {
	var arr = []
	  while(arr.length < max){
		  var r = Math.floor(Math.random()*max + 1);
		  if(arr.indexOf(r) === -1) arr.push(r);
	  }
	return arr
  }

  function randomIntFromInterval(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min);
  }

function validateEmail(email) {
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	return emailReg.test( email );
}

$.preloadImages = function(array) {
    for (var i = 0; i < array.length; i++) {
      $("<img />").attr("src", array[i]);		
    }
};


var getHeight = function($parent, element) {
	var tempId = 'tmp-'+Math.floor(Math.random()*99999);//generating unique id just in case
	//console.log($parent, element);
	var $target = $parent.find(element).clone();
	//console.log($target);
	$target.css('position','absolute');
    $target.css('height','auto').css('width','1000px');
    	//inject right into parent element so all the css applies (yes, i know, except the :first-child and other pseudo stuff..
		$target.appendTo($('body'));
		$target.css('left','-10000em');
		$target.addClass(tempId).show();
		h = $('.'+tempId).height();
	//console.log($('.'+tempId),h);
    //$('.'+tempId).remove()
    return h;
};


//Inview 
$('.fade-in, .fade-and-move-in, .fade-in-left, .fade-in-right, .fade-in-top, .zoom-in-up').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
	if (isInView) { 
	  // element is now visible in the viewport
	  $(this).addClass('inview');
	  if (visiblePartY == 'top') {
		// top part of element is visible
		  
	  } else if (visiblePartY == 'bottom') {
		// bottom part of element is visible
	  } else {
		// whole part of element is visible
	  }
	} else {
	  // element has gone out of viewport
	  $(this).removeClass('inview');
	}
});	

function bindToInview($target) {
	$target.bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
		if (isInView) { 
		  // element is now visible in the viewport
		  $(this).addClass('inview');
		  if (visiblePartY == 'top') {
			// top part of element is visible
			  
		  } else if (visiblePartY == 'bottom') {
			// bottom part of element is visible
		  } else {
			// whole part of element is visible
		  }
		} else {
		  // element has gone out of viewport
		  //$(this).removeClass('inview');
		}
	});
}

function shuffle(array) {
    var tmp, current, top = array.length;
    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
    return array;
  }

//------------------------------------------------
//Controller for all communication with backend
//------------------------------------------------

//ALL CALLS TO THE API GOES THROUGH THIS FUNCTION
/*function callAPI(url, type, callbackFn, data, datatype) {
	//console.log(url, type, data);
	$.ajax({
		url: url,
		contentType: "application/json; charset=utf-8",
		cache: false,
		data: JSON.stringify(data),
		type: type,
		dataType: datatype,
		success: function (data) {
			//console.log("SUCCESS", url, data);
			callbackFn(data);
		},
		error: function () {
			//console.log("NOT CONNECTED TO API", url);
			callbackFn("");			
		}
	});
}*/
var menuArray = [	
	{"id":"s1", "section":"index", "url":"index", "dbid":"s01"},
	{"id":"s2", "section":"course", "url":"kurs", "dbid":"s02"}
];

//----------------------------------------//
//PROGRESS AND SCORM 
//----------------------------------------//

window.setModuleStatus = function setModuleStatus(scormId, step) {
	//console.log("setModuleStatus", scormId, step);
    $.each(statusObj.modules, function(i, prop) {
        if (prop.id==scormId) {
            prop.steps[step] = 1;
            if (prop.steps.indexOf(0)<0) {
                prop.completed = true; 
            }    
            
            var total = 0;
            $.each(prop.steps, function(j, val) {
                if (parseInt(val)==1) {
                    total++;
                }
            });
            prop.progress = total/prop.steps.length;
            //console.log("SET STATUS", statusObj);
            window.saveCourseStatus(statusObj);
        }
    }); 

	window.updateNavProgress();
    updateStatus();
};
window.getModuleStatus = function getModuleStatus(scormId, step) {
    var status = 0;
    $.each(statusObj.modules, function(i, prop) {        
        if (prop.id==scormId) {
           status = prop.steps[step];            
        }
    });
    return status;
}
window.getProgress = function getProgress(scormId, module) {
    var status = 0;
    $.each(statusObj.modules, function(i, prop) {        
        if (prop.completed) {
           status++;            
        }
    });
    return status;
}
window.setStatus = function setStatus(scormId) {
    $.each(statusObj.modules, function(i, prop) {
        if (prop.id==scormId) {
            prop.completed = true;
        }
    });    
    //console.log("SET STATUS", statusObj);
    window.saveCourseStatus(statusObj);
};
window.getStatus = function getStatus(scormId) {
    //console.log("GET STATUS", statusObj[scormId].completed);
    return statusObj.modules[scormId].completed;
};
window.getModuleProgress = function getModuleProgress(scormId) {
    var progress;
    $.each(statusObj.modules, function(i, prop) {
        if (prop.id==scormId) {
            progress = prop.progress;
        }
    });
    return progress;
};
function updateForloppProgress() {
	$.each(statusObj.modules, function(i, obj) {
		if (obj.id==scormid) {
			var moduleObj=obj;
			$('.check').each(function(i) {
				var step = $(this).data("step");
				//console.log(statusObj.modules);
				
				if (moduleObj.steps[step]==1) {
					$(this).attr("class", "check done");
					$("#tick-"+step).attr("class", "");
				}
			});
			$('.btn-popup').each(function(i) {
				var step = $(this).data("step");
				//console.log(statusObj.modules);
				
				if (moduleObj.steps[step]==1) {
					$(this).parent().addClass("done");
				}
			});			
		}
	});
	
}
function updateStatus() {    
    
    var totalprogress = window.getProgress();
    //console.log("Total progress", totalprogress, statusObj.modules.length)
    if (totalprogress==statusObj.modules.length) {
        //console.log("COURSE COMPLETED");		
        statusObj.done=true;
    }
    window.saveCourseStatus(statusObj);
} 
function initStatus() {

    if (!window.loadCourseStatus()) {
		statusObj = defaultObj;	        
	} else {        
		statusObj = window.loadCourseStatus();	
        if (statusObj.version!==defaultObj.version) {
            statusObj = defaultObj;            
        }
	}   
    
    updateStatus();
}


function initNav() {

	//---------------<<
	var $nav = $('nav');
	//$nav.empty();	
	$nav.prepend('<div class="skip-to-content"><a href="#main-content" tabindex="1" class="db-txt" data-dbid="gen_jumptomain">'+window.getText("gen_jumptomain")+'</a></div>');
	
   
        //if (!$('body').hasClass("resource-popup")) {
            $nav.append(getNav());
            $('button.nav-trigger').click(function() {
            // $('body').toggleClass('noscroll');
                $('nav').find('.nav-container').toggleClass("show");
            }); 
        //}
 
   // updateStatus();

    addEditor($nav);
    initFooter();
    
}

function initFooter() {
    $('footer').append(getFooter());
    addEditor($('footer')); 
}
function getNav() {
	var html="";	
		html+='<div class="nav-container container inner">';

                html+='<button class="nav-trigger" aria-label="Öppna menyn" aria-haspopup="menu"><span></span></button>';
               
                                //
                html+='<ul class="main-nav" role="menu">';

                var menuProgress="";
                var addNext = true;
                var ariaClass="" ;
               
                if (pageId=="index") {
                    ariaClass='aria-current="page"';
                    menuProgress = "current";
                }
            
                html+='<li role="menuitem" '+ariaClass+'>';
                        html+='<a href="index.html" class="'+menuProgress+'">';		
                        html+='<span class="txt db-txt" data-dbid="s01">'+window.getText("s01")+'</span>';	     
                        html+='<span class="underline"></span>'; 		
                    html+='</a>';
                html+='</li>';

                var courseArray = ["c1", "c2", "c3", "c4", "fd"];
                
                $.each(courseArray, function(i, kurs) {	
                    //console.log(i, kurs);

                    var ariaClass="",
                    url = "kurs.html?c="+kurs,
                    menutype = "mobile",
                    menuProgress = "";

                    if (courseID==kurs) {
                        ariaClass='aria-current="page"';
                        menuProgress = "current";
                        menutype = "";
                    }

                    html+='<li role="menuitem" '+ariaClass+' class="'+menutype+'">';
                            html+='<a href="'+url+'" class="'+menuProgress+'">';
                                html+='<span class="txt db-txt" data-dbid="'+kurs+'_meny">'+window.getText(kurs+"_meny")+'</span>';
                                html+='<span class="underline"></span>'; 		
                            html+='</a>';
                    html+='</li>';

                    /*if (addNext) {
                            var ariaClass="",
                            url = prop.url,
                            section = prop.section;
                        
                        var menutype ="";			
                        console.log(pageId, section);
                        if (pageId==section) {
                            ariaClass='aria-current="page"';
                            menuProgress = "current";
                        }
                    
                        html+='<li role="menuitem" '+ariaClass+' class="'+menutype+'">';
                            html+='<a href="'+window.prefix+url+'.html" class="'+menuProgress+'">';		
                            if (i==1) {
                                html+='<span class="txt db-txt" data-dbid="'+courseID+'_meny">'+window.getText(courseID+"_meny")+'</span>';
                            } else {
                                html+='<span class="txt db-txt" data-dbid="'+prop.dbid+'">'+window.getText(prop.dbid)+'</span>';
                            }			
                                				
                                html+='<span class="underline"></span>'; 		
                            html+='</a>';
                        html+='</li>';
                        if (pageId==section) {
                            menuProgress = "";
                            addNext = false;
                        }
                    }  */ 
                    							
                });		

                html+='</ul>';			
		html+='</div>';		
		
	return html;
}


function getFooter() {
    var html="";
        html+='<div class="container">';
            html+='<div class="row col-xs-100 between-xs">';
                html+='<div class="row col-xs-100 col-sm-65 col-md-60 between-xs nowrap middle-xs">';
                    html+='<div class="logotyp-holder"><img src="img/logotyp-s-w.svg" alt="UUA Logotyp"/></div>';
                    html+='<p class="xsmall xxsmall-xs db-txt txtr-edit" data-dbid="footer_p_1">'+window.getText("footer_p_1")+'</p>';
                html+='</div>';               
                html+='<div class="row col-xs-100 col-sm-33 middle-xs">';                    
                    html+='<div class="row col-xs-100 end-xs middle-xs contact-icon">';                          
                        html+='<p class="xsmall nomargin db-txt txtr-edit" data-dbid="footer_p_2">'+window.getText("footer_p_2")+'</p>';
                        html+='<img id="eu-logo" class="m-l-1 col-xs-10 col-sm-20" src="img/logotyp-eu.svg" alt="">';
                    html+='</div>';
                html+='</div>';
            html+='</div>';
        html+='</div>';
    return html;
}


var closeResource = function() {
    var e = $(".resource-iframe-container"),
        o = new TimelineLite;
    o.to(".iframe-container", .5, {
        y: "1000px",
        ease: Power1.easeIn
    }), o.to(e, .4, {
        opacity: 0,
        onComplete: function() {
            location.reload();
            e.remove();  
                     
        }
    }, "-=0.2"), 
        $("body").removeClass("noscroll"), 
        $("html").removeClass("noscroll"),
        
	//$('.top-logo-container').slideDown(250);
	//$('.drag-elem').show();
    //updateStatus();
    window.location.hash = '';    
    setPageTitle();
    
    $('.focusme').focus().removeClass("focusme");
};
window.openResource = function openResource(url, id) {
    //console.log("openResource", url, id);
    //window.location.hash = id;
    
    var o = '<div class="resource-iframe-container">';
        o += '<div class="iframe-container container">', o += '<iframe width="100%" height="100vh" src="' + url + '">', o += "</div></div>", $("body").append(o), $("body").addClass("noscroll"); 
        var titleId = id;
        if (id=="btn-start") {
            var s=url.split(".")[0].split("-");
            titleId=s[0]+"_"+s[1];            
        }
        var title = window.getText(titleId);
        title = title.replace('&shy;', '');
        window.document.title = title+window.getText("course_title");       
        var n = new TimelineLite;
        n.from(".resource-iframe-container", .4, {
            opacity: 0
        }), n.from(".iframe-container", .8, {
            y: "1000px",
            ease: Power2.easeOut,
            onComplete:function() {
                
                $(".resource-iframe-container").attr("tabindex",-1).focus();
                $(".resource-iframe-container").on("click", function() {
                    closeResource();
                });
            }
        }, "-=0.2")
}

$(function() {
    function e(e) {    
        //console.log("openResource2", e);    
        var o = '<div class="resource-iframe-container">';
        o += '<div class="iframe-container container">', o += '<iframe width="100%" height="100vh" src="' + e + '">', o += "</div></div>", $("body").append(o), $("body").addClass("noscroll"), $("html").addClass("noscroll");
        var n = new TimelineLite;
        n.from(".resource-iframe-container", .4, {
            opacity: 0
        }), n.from(".iframe-container", .8, {
            y: "1000px",
            ease: Power2.easeOut,
            onComplete:function() {
                $(".resource-iframe-container").attr("tabindex",-1).focus();
                $(".resource-iframe-container").on("click", function() {
                    closeResource();
                });
            }
        }, "-=0.2")
    }
    var o = $(".resource-container"),
        n = $(".resources-box").not(".first");	
    o.on("click", function(event) {
		event.preventDefault();
        //$('.drag-elem').hide();
       
        $(this).addClass("focusme");
        e($(this).data("iframe"));
		//$('.top-logo-container').slideUp(250);
    });
   
    n.on({        
        mouseup: function() {
            
            e($(this).data("iframe"));
        }
    })
});

// @prepros-prepend default.js
// @prepros-prepend nav.js
// @prepros-prepend open-resource.js
var statusObj, scormid, videoPlaying=false;
var defaultObj = {"version":210928, "done":false, "modules": []}
                  
window.prefix = ""; 



function initListeners() {


    //----------------------------------------//
	//SET BACKGROUND IMAGES
	//----------------------------------------//

	var $bgimgs = $('.imgBg');
	if ($bgimgs.length>0) {
		$bgimgs.each(function() {
			var imgUrl = $(this).data("img");
			$(this).css('background-image', 'url(img/'+imgUrl+')');	
		});
    }

    //----------------------------------------//
	//POPUP BUTTONS
	//----------------------------------------//

	var $btnPopups = $('button.btn-popup');
	$btnPopups.click(function() {
		var popupid = $(this).data('popupid');
		//console.log(popupid)
		var $popup = $('#'+popupid);
		overlayOpen($(this), $popup.closest('.popup-overlay-bg'), $popup);
	});

	var $overlayBg = $('.popup-overlay-bg');
	$overlayBg.click(function(e) {		
		if ($(e.target).hasClass("popup-overlay-bg")) {
			if (!window.preventClose) {
				window.overlayClose();
				return false;
			}			
		}			
    });
   

    //----------------------------------------//
	//OPEN POPUP
	//----------------------------------------//
	var $currFocus, scrollPos;
	window.overlayOpen = function overlayOpen($btn, $popupBg, $target) {     

		$currFocus = $btn;   		
		scrollPos = $(window).scrollTop();
		var transition="slideInUp";
        $(window).scrollTo(scrollPos);
		$popupBg.removeClass('js-isHidden');
		$popupBg.attr("aria-hidden", false);
		$popupBg.attr("aria-label", $target.find("h3").text());			
		$('body').addClass('noscroll');
		$(window).scrollTo(scrollPos);
		$(window).scrollTo(scrollPos, 200, {axis:'y'});
        animateCSS($popupBg, "fadeInFast", "", function() {
			$(window).scrollTo(scrollPos);
			$popupBg.find('.js-isActive').removeClass('js-isActive');
            $target.removeClass('js-isHidden').addClass('js-isActive');
            animateCSS($target, transition, "");	  
			$popupBg.find('.overlay-content').attr("tabindex",-1).focus();
			trapFocus($target);			
        });
		
		//$target.addClass('current');		
	}

	//----------------------------------------//
	//CLOSE POPUP
	//----------------------------------------//
	window.preventClose = false;
	window.overlayClose = function overlayClose(changeHash) {

		if (!preventClose) {
			var $overlayBg = $('.popup-overlay-bg');
			var $overlay = $overlayBg.find('.popup-overlay.' + 'js-isActive');
			$('body').removeClass('noscroll');

			var transition="slideOutDown";      

			$overlayBg.attr("aria-hidden", true);

			if($overlay.length>0) {

				animateCSS($overlay, transition, "", function() {
					
					$overlay.addClass('js-isHidden');
					$overlay.removeClass('js-isActive');				
					animateCSS($overlayBg, "fadeOutFast", "", function() {
						$overlayBg.addClass('js-isHidden');	
	
					});			
					
					if ($currFocus) {
						if (!$currFocus.data("anchor"))	{
							$currFocus.parent().attr("tabindex",-1).focus();					
						} else {
							var href = $currFocus.data("anchor");                
							$(window).scrollTo($(href), 500, {axis:'y'});
						}			
					}	
					
				});
			} else {
				animateCSS($overlayBg, "fadeOut", "", function() {
					$overlayBg.addClass('js-isHidden');
				});
			}
		}	
		
			
    }

	
	//----------------------------------------//
     //----> HOTSPOTS
	 //----------------------------------------//
	 var $hotspotWrapper = $('.hotspots-holder');
	 if ($hotspotWrapper.length>0) {
         var hs = 0;
		  $hotspotWrapper.each(function(i) {
			  var $self = $(this),
              $hotspots = $self.find('.hotspot');      
			  var nr =  $hotspots.length; 

			  $hotspots.on( "mouseover", function() {
				  var id = $(this).closest(".hotspot").attr("id");
				  $('#'+id+'-line').attr('class', 'active');
			  });
			  $hotspots.on( "mouseout", function() {
				  var id = $(this).closest(".hotspot").attr("id");
				  $('#'+id+'-line').attr('class', 'inactive');
			  });
			  $hotspots.on( "click", function() {

                  var popupid = $(this).data('popupid'),
				  	  $popup = $('#'+popupid);
                  overlayOpen($(this), $popup.closest('.popup-overlay-bg'), $popup);
                  $(this).addClass("visited");

				  var $outer = $self.closest('.hotspot-tab-section');
				  if ($outer.find(".visited").length==$outer.find(".hotspot").length) {//
						if ($outer.find('.section-done-row').length<1) {
							$outer.append(getSectionDone("section", "center-xs"));						
							$(window).scrollTo($hotspotWrapper, 0, {axis:'y'});
							var nextSectionID = "#"+$outer.next().attr("id");
							addScrollInstruction($outer, nextSectionID, true);
						}	
				  }
			  });

			  function setHotspotPositions() {
				  var startY = 180;		

					$hotspots.each(function() {    
						if (isMobile()&& $(this).find('.btn-hotspot').hasClass("icon")) {
							var xpos = "20px";
							$(this).css('top', startY);
							startY+=50;
						}	else {
							var ypos = $(this).data('y');                            	
							if ($(this).hasClass("up")) {
								$(this).css('bottom', ypos);
							} else {
								$(this).css('top', ypos);
							}	
							var xpos = $(this).data('x');
						}			          
								
						$(this).css('left', xpos);	
						$(this).css('opacity', '1');									   
					});	
			  }

			  setHotspotPositions();

			  $(window).resize(function() {
				setHotspotPositions();
			  });	
			    		
		  });		
		  //saveProgress("");    
	 }

	   //--------------------------------------//
	   //---->INITIALIZE POPUP CONTENT
	   //--------------------------------------//
	   var $st_popup = $('.hs-popup');
	   if ($st_popup.length>0) {
			$st_popup.each(function() {
				var $self = $(this);
                var id = $self.attr("id"),
                    img = $self.data('img'), 
                    isSmall = false;

                if ($self.hasClass("has-title")) {
                    isSmall = true;
                }   
				$self.append(getPopup(id, img, isSmall));
			});
	   }
	
	
	var $popups = $('.popup-overlay');
	$popups.each(function() {
		$(this).append('<button class="btn-close close-popup"><span class="db-txt" data-dbid="btn_close">'+window.getText("btn_close")+'</span><span class="icon"></span> </button>');
	});


    var $btnClosePopup = $('button.close-popup');
		$btnClosePopup.click(overlayClose);
		$btnClosePopup.focusout(function() {
			$(this).closest('.overlay-content').attr("tabindex",-1).focus();
		});
   
    /*Close resource*/
   
	var $btnClosePopup=$(".close-resource");
	$btnClosePopup.click(function(e){
		e.preventDefault();
		parent.closeResource();
    }); 

	//--------------------------------------//
	   //---->CAPTIONS
	   //--------------------------------------//
	   var $captions = $('.caption');
		if ($captions.length>0) {
			$captions.each(function() {
				var $self = $(this);				
				//addCaption($self);
			});
		}

    
    if ($("a.btn-video").length>0) {
       $("a.btn-video").lwsLightboxVideo();  
    }    
    

     //----------------------------------------//
	//TAB-CONTENT
	//----------------------------------------//

	var $tabitem = $('.tab-item');
	if ($tabitem.length>0) {

		function showPanel($target, isUpdate) {
			$target.addClass("active");
			showMe($target);
			$target.fadeIn(250, function() {
				$target.parent().find('.panel').each(function() {
					var $hotSpots = $(this).find('.hotspot');  
					if ($(this).hasClass("active")) {	
						TweenMax.staggerFromTo($hotSpots, 0.5, {scale:0, opacity:0}, {scale:1, opacity:1, ease:Back.easeOut}, 0.25);
					} else {
						TweenMax.set($hotSpots, {scale:0, opacity:0});
					}
				});			
				if (isUpdate) {
					$(this).attr("tabindex",-1).focus();
					$(window).scrollTo($target.closest('.hotspot-tab-section'), 250, {axis:'y', offset:50});	
				} 
			});
		}
		var hasinit = false;
		$tabitem.each(function() {
			
			var $self = $(this),
				$tabs = $self.find('button.btn-tab'),
				$panels = $self.find('.panel');

				$tabs.click(function() {
					$tabs.removeClass("selected").attr("aria-selected", false).attr("disabled", false);
					$(this).addClass("selected")
						.attr("aria-selected", true)
						.attr("disabled", true);
					var panel = $(this).attr("aria-controls");

					if ($self.find('.panel.active').length>0) {
						$self.find('.panel.active').fadeOut(250, function() {
							hideMe($self.find('.panel.active'));
							$self.find('.panel.active').removeClass("active");
							showPanel($('#'+panel), true);							
						});
					} else {
						showPanel($('#'+panel), false);
					}	
								
				});

			$self.find('button.btn-tab.default').trigger("click");
		});

	}
   
    //----------------------------------------//
	//ANCHORS
	//----------------------------------------//

	var $anchors = $('a.anchor');
	$anchors.click(function(e) {
        e.preventDefault();
        var href = $(this).attr("href");
        //console.log(href);
        $(window).scrollTo($(href), 500, {axis:'y', offset:-$('.top-bar').outerHeight()});
        return false;
    }); 
	
	

   var $hsSliders = $('.hs-slider');
    if ($hsSliders.length>0) {
       $hsSliders.each(function() {
           var $self = $(this);
           var draggable = false;
           if (isMobile()) {
               draggable = true;
           }

           $self.slick({
               dots: false,
               infinite: false,
               fade:true,
               speed: 800,
               arrows:false,
               draggable:draggable 
           });	  

           $self.on('beforeChange', function(event, slick, currentSlide, nextSlide){    
                          
                var $slideHotSpots = $self.find('.hotspot'); 
                TweenMax.to($slideHotSpots, 0.25, {scale:0, opacity:0});                
           });
           
            $self.on('afterChange', function(event, slick, currentSlide, nextSlide){    
                //console.log('afterChange'); 
                    var $slides = $self.find('.slide');

                    $slides.each(function() {
                        var $slideHotSpots = $(this).find('.hotspot');  
                        if ($(this).hasClass("slick-active")) {	
                            TweenMax.staggerFromTo($slideHotSpots, 0.5, {scale:0, opacity:0}, {scale:1, opacity:1, ease:Back.easeOut}, 0.25);
                        } else {
                            TweenMax.set($slideHotSpots, {scale:0, opacity:0});
                        }
                    });
                    if (currentSlide+1==slick.slideCount) {
                        $('.scroll-down').removeClass("hide");
                    }                    
            });      
         
       });
   }


}




//----------------------------------------//
//SETUP FUNCTIONS
//----------------------------------------//


//----------SLICK SLIDERS------------//
//SETUP CAPTION
function addCaption($self) {
	$self.append('<div class="indicator"></div><div class="show-more-container">… <span class="show-more-button db-txt" data-dbid="btn_readmore">'+window.getText("btn_readmore")+'</span></div><div class="show-less-button"><span class="db-txt" data-dbid="btn_readless">'+window.getText("btn_readless")+'</span></div>');	

	function setH() {
		var h = $self.find('.caption-content').height();
		
		if (h>$self.height()+30) {
			$self.addClass("hasmore");								
			$self.find('.show-more-button').click(function() {
				$self.height(h+50);
				$self.addClass("expanded");
			});
			$self.find('.show-less-button').click(function() {
				$self.height(20);
				$self.removeClass("expanded");
			});
		} else {
			$self.removeClass("hasmore");	
		}
	}	
	setH();
	$(window).resize(function() {
		setH();
	});	
}


//----> POPUP
function getPopup(id, img, hastitle) {
	//console.log("hasquote", hasquote);
	var html = "";
    html+='<div class="overlay-content">';
		html+='<div class="overlay-pages row col-xs-100">';
            html+='<div class="col img-holder mob-margin-S">';
                if (img) {
                    html+='<img class="col-xs-100" src="'+img+'" alt="" aria-hidden="true"/>';
                }			
			html+='</div>';
            html+='<div class="col txt-holder">';
                if (hastitle) {
                    html+='<h3 class="p strong db-txt txtr-edit" data-dbid="'+id+'">'+window.getText(id)+'</h3>'; 
                }                
                html+='<div class="col col-xs-100 col-sm-95 db-txt txtr-textbox" data-dbid="'+id+'_p">'+window.getText(id+"_p")+'</div>';

				html+='<div class="row col-xs-100 center-xs m-t-2 m-b-2">';
					html+='<button class="default close-popup mobile db-txt" data-dbid="btn_close">'+window.getText("btn_close")+'</button>';
				html+='</div>'
            html+='</div>'
		html+='</div>';
	html+='</div>';

	return html;
}

//----------SETUP TRUE/FALSE QUESTION------------//
function setupTrueFalse(id, $holder, correctAlt, singleFB) {
	
	var trueText = window.getText("btn_true");
	var falseText = window.getText("btn_false");
	if ($holder.data("alts")) {
		trueText = window.getText($holder.data("alts")+"_1");
		falseText = window.getText($holder.data("alts")+"_0");
	}
	$holder.append(getTrueFalse(id, trueText, falseText));
	var hasAnswered = false;


	animateCSS($holder.find('blockquote'), 'zoomIn', "", function() {
		if (!hasAnswered) {
			window.showMe($holder.find('.alt-holder'));
			 animateCSS($holder.find('.alt-holder'), "flipInX", "");
		}            
	}); 

	$holder.find('button.btn-answer').click(function() {
		var isTruth = $(this).data("state"); 
		//console.log("isTruth", isTruth);
		hasAnswered = true;
		animateCSS($holder.find('.alt-holder'), "flipOutX", "", function() {
			window.hideMe($holder.find('.alt-holder'));
			if (correctAlt) {
				$holder.find('.fb-status').text(trueText);
			} else {
				$holder.find('.fb-status').text(falseText);
			}

			if (isTruth==correctAlt) {
				$holder.find('.fb-userrespons').text(window.getText("gen_correct"));
			} else {
				$holder.find('.fb-userrespons').text(window.getText("gen_wrong"));
			}
			
			var fbid=id+"_fb_"+isTruth;
			if (singleFB) {
				fbid=id+"_fb";
			}
			//console.log(fbid);
			$holder.find('.fb-txt').html(window.getText(fbid))
			window.showMe($holder.find('.fb-holder'));
			animateCSS($holder.find('.fb-holder'), "fadeInUp", "");
		});	
	   
		return false;

	});

	function getTrueFalse(id, alt1, alt2) {
		var html="";
			html+='<div class="col col-xs-100 middle-xs">';
				html+='<div class="col col-xs-100 middle-xs text-center">';
					html+='<p class="instr">'+window.getText("instr_truefalse")+'</p>';
					html+='<blockquote class="h2 truefalse">'+window.getText(id+"_q")+'</blockquote>';

					html+='<div class="alt-holder js-isHidden">';
						html+='<button class="default btn-answer" data-state="1">'+alt1+'</button>';
						html+='<span class="small">eller</span>';
						html+='<button class="default btn-answer" data-state="0">'+alt2+'</button>';
					html+='</div>';   
					
					html+='<div class="fb-holder col col-xs-100 js-isHidden">';
						html+='<p class="large strong fb-status nomargin"></p>';
						html+='<p class="strong fb-userrespons"></p>';
						html+='<p class="fb-txt max-width-p"></p>';
					html+='</div>';

				html+='</div>';		
			html+='</div>';	
		return html;
	}
}

//----------SETUP RESOURCES------------------//



function getPagePosition() {

	var hash = $(location).attr('hash');

	function triggerPopup(popupid) {
		var $btn = $('#'+popupid);
		$btn.focus();
		$btn.trigger("click");
	}

	if (hash) {
		var popupid = hash.substring(1, hash.length);			
		//triggerPopup(popupid);		
	} 

	$( window ).on( 'hashchange', function( e ) {
		var newhash = $(location).attr('hash');
		//console.log("change", newhash, hash);	
		if (newhash!="") {
			var popupid = newhash.substring(1, newhash.length);				
			triggerPopup(popupid);
		} else {
			parent.closeResource();
		}			
	});

}


//----------------------------------------//
//----------------------------------------//

function setPageTitle() {
	
	if (pageId=="course") {  
		window.document.title = window.getText(courseID)+window.getText("course_title");
	} else if (pageId=="lesson") {
		//window.parent.document.title = window.document.title + window.getText("course_title");
	} else {
		window.document.title = window.getText(pageId+"_title");
	}
}

function initContent() {
     
    $('.loading').addClass('hidden');

	if (pageId=="course") {         
        var paramC = getURLParameter("c");        				
		if (!paramC) {
            //NO COURSE IS SELECTED
			var c = sessionStorage.getItem("course");
			if (!c) {
				courseID="1"
			} else {
				courseID=c;
			}
            setURLParameter("c", courseID);            
		} else {
            courseID = paramC;
        }
		sessionStorage.setItem('course', courseID);			
    } 

	setPageTitle();
	initNav();  


	initListeners();	
	setupCourseData();	

}



//<-------------------

(function ($) {
	"use strict";
    
    scormid=$('body').data("scormid");
    //console.log(scormid);

	$(window).resize(function () {

	});
	
})(jQuery);
