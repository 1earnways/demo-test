/*
|-------------------------------------------
|	lws Lightbox Video jQuery
|-------------------------------------------
|
|
|	Author: Pedro Marcelo
|	Author URI: https://github.com/pedromarcelojava
|	Plugin URI: https://github.com/pedromarcelojava/lws-Lightbox-Video-jQuery
|	Version: 2.0
*/

(function($)
{
	$.extend($.fn, {
		lwsLightboxVideo : function()
		{
			var defaults = {
				delayAnimation: 300,
				keyCodeClose: 27
			};

			$.lwsLightboxVideo.vars = $.extend({}, defaults);

			var video = this;

			video.click(function(e)
			{
				// if (window.innerHeight > 540)
				// {
				// 	var margintop = (window.innerHeight - 540) / 2;
				// }
				// else
				// {
				// 	var margintop = 0;
				// }
                
                var $focus = $(document.activeElement);
                
               document.onkeyup = PresTab;
 
               function PresTab(e)
               {
                   var keycode = (window.event) ? event.keyCode : e.keyCode;
                   if (keycode == 9)
                   $('#lws-close-icon').focus();  
               }
                                
				var randomIdNr = Math.floor(Math.random() * (1000 - 1)) + 1;
				var ifr = '<iframe src="" id="lws-video-embed_' + randomIdNr + '" width="100%" height="100%" id="lws-video-embed" style="border:0;"></iframe>';
				//var close = '<button id="lws-close-icon" class="btn-close">Stäng</button>';
				var close = '<button id="lws-close-icon" class="btn-close"><span class="db-txt" data-dbid="btn_close">'+window.getText("btn_close")+'</span><span class="icon"></span></button>'; 
				var lightbox = '<div class="lws-lightbox" >';
				var back = '<div id="lws-back-lightbox">';
				var bclo = '<div id="lws-background-close"></div>';
				var win = '<div id="lws-window">';
				var end = '</div></div></div>';
				var thisVideotyp = $(this).data('videotype'),
					thisVideoId = $(this).data('videoid');
				var url;
				var testar;
                var iframeid='lws-video-embed_' + randomIdNr;

				if ($(this).data('pdf')) {
					var pdf = $(this).data('pdf');
					var pdfBtn = '<a href="pdfs/'+window.lang+'/'+pdf+'" class="btn-transcript db-txt db-aria" target="_blank" aria-label="'+window.getText("btn_transcript_aria")+'" data-dbid="btn_transcript" data-ariaid="btn_transcript_aria">'+window.getText("btn_transcript")+'</a>';
				}
				

				if (thisVideotyp === "youtube") {
					url = 'https://www.youtube.com/embed/' + thisVideoId + '?autoplay=0&showinfo=0';
				} else if( thisVideotyp === "vimeo") {
					url = 'https://player.vimeo.com/video/' + thisVideoId + '?autoplay=0&=subtitles=1';
				} else if( thisVideotyp === "streamio") {
					url = 'https://streamio.com/api/v1/videos/' + thisVideoId + '/public_show?player_id=4e82cc4c11581e306200097a';
				} else if (thisVideotyp === "other") {
					url = thisVideoId;				
				} else if( thisVideotyp === "videojs") {
					var posterLocation = $(this).data('posterlocation'),
						dataSetup = JSON.stringify($(this).data('setup')),
						subtitles = $(this).data('subtitles');
					var ifrSuffix;

					if (subtitles) {
						var subKind = $(this).data('subkind'),
							subLocation = $(this).data('sublocation'),
							subLang = $(this).data('sublang'),
							subLabel = $(this).data('sublabel');

						ifrSuffix = '<track kind="' + subKind + '" src="' + subLocation + '" srclang="' + subLang + '" label="' + subLabel + '" default></video>';
						
					}else{
						ifrSuffix = '</video>';
					}
						ifr = "<video id='lws-video-embed_" + 
							randomIdNr +  
							"' class='video-js' controls preload='auto' width='100%' height='100%' poster='" + 
							posterLocation + 
							"'><source id='lws-video-embed' src='' type='video/mp4'>" + 
							ifrSuffix;

					url = thisVideoId;
					testar = 'lws-video-embed_' + randomIdNr;
					randomIdNr = randomIdNr + ' source';
					console.log('#lws-video-embed_' + randomIdNr);
				}
				$("body").addClass("noscroll");
				$('body').append(win + bclo + back + lightbox + close + ifr + pdfBtn + end);
				$('#lws-window').hide();

				$('#lws-window').fadeIn(100, function () {
                    $('#lws-close-icon').focus();                    
                });
				$('#lws-video-embed_' + randomIdNr).attr('src', url);

				$('#lws-close-icon').click(function()
				{
					$('#lws-window').fadeOut($.lwsLightboxVideo.vars.delayAnimation, function()
					{
						$(this).remove();
					});
					$("body").removeClass("noscroll");
                    $focus.focus();   
				});
                   
				$('#lws-background-close').click(function()
				{
					$('#lws-window').fadeOut($.lwsLightboxVideo.vars.delayAnimation, function()
					{
						$(this).remove();
						$("body").removeClass("noscroll");
					});
				});
				if( thisVideotyp === "videojs"){
					videojs(testar, {
						fluid:true
					}, function(){
					  // Player (this) is initialized and ready.
					});
					$('#lws-back-lightbox').css('height', 'auto');
				}
                
                  var iframe = document.querySelector('#'+iframeid);                
                  var player = new Vimeo.Player(iframe);                  
                 
				  
				  player.on('play', function(data) {
	
					var $outer = $('.video-start-content');
					
					if ($outer.find('.section-done-row').length<1) {
						$outer.append(getSectionDone("video", ""));

						var $section = $('.video-section');
						var nextSectionID = "#"+$section.next().attr("id");
						addScrollInstruction($section, nextSectionID, false);
					}	
				

				}); 
				
				player.enableTextTrack(window.lang);  
                
				return false;
			});
			$(document).keyup(function(e)
			{
				if (e.keyCode === 27)
				{
					$('#lws-window').fadeOut($.lwsLightbox$.vars.delayAnimation, function()
					{
						$(this).remove();
					});
				}
			});

			// $(window).resize(function()
			// {
			// 	if (window.innerHeight > 540)
			// 	{
			// 		var margintop = (window.innerHeight - 540) / 2;
			// 	}
			// 	else
			// 	{
			// 		var margintop = 0;
			// 	}

			// 	$('.lws-lightbox').css({
			// 		marginTop: margintop + 'px'
			// 	});
			// });

			return false;
		}
	});
})(jQuery);

(function($)
{
	$.lwsLightboxVideo = function(options, video)
	{
		return $(video).lwsLightboxVideo();
	};
})(jQuery);