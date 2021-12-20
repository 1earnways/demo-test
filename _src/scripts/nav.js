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

