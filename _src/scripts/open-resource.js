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
//# sourceMappingURL=./open-resource-min.js.map