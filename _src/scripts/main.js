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