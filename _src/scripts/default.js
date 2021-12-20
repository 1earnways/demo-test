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