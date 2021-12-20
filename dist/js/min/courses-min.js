var dbUrl = "";
var host, urlParam, useAPI = true;
var sessionId = "uua"; 
var dummyObj = {    
    "elearning":{
        "userdata":{
            "id":"",
            "name":"",
            "epost":""
        }, 
        "lessons": [
            {
                "id":"c1_l1",
                "course":"c1",
                "isCompleted":false
            },
            {
                "id":"c1_l2",
                "course":"c1",
                "isCompleted":false
            },
            {
                "id":"c1_l3",
                "course":"c1",
                "isCompleted":false
            },
            {
                "id":"c1_l4",
                "course":"c1",
                "isCompleted":false
            },
            {
                "id":"c1_l5",
                "course":"c1",
                "isCompleted":false
            },
            {
                "id":"c1_l6",
                "course":"c1",
                "isCompleted":false
            },
            {
                "id":"c2_l1",
                "course":"c2",
                "isCompleted":false
            },
            {
                "id":"c2_l2",
                "course":"c2",
                "isCompleted":false
            },
            {
                "id":"c2_l3",
                "course":"c2",
                "isCompleted":false
            },
            {
                "id":"c2_l4",
                "course":"c2",
                "isCompleted":false
            },
            {
                "id":"c2_l5",
                "course":"c2",
                "isCompleted":false
            },
            {
                "id":"c2_l6",
                "course":"c2",
                "isCompleted":false
            },
            {
                "id":"c2_l7",
                "course":"c2",
                "isCompleted":false
            },
            {
                "id":"c3_l1",
                "course":"c3",
                "isCompleted":false
            },
            {
                "id":"c3_l2",
                "course":"c3",
                "isCompleted":false
            },
            {
                "id":"c3_l3",
                "course":"c3",
                "isCompleted":false
            },
            {
                "id":"c3_l4",
                "course":"c3",
                "isCompleted":false
            },
            {
                "id":"c3_l5",
                "course":"c3",
                "isCompleted":false
            },
            {
                "id":"c3_l6",
                "course":"c3",
                "isCompleted":false
            },
            {
                "id":"c3_l7",
                "course":"c3",
                "isCompleted":false
            },
            {
                "id":"c4_l1",
                "course":"c4",
                "isCompleted":false
            },
            {
                "id":"c4_l2",
                "course":"c4",
                "isCompleted":false
            },
            {
                "id":"c4_l3",
                "course":"c4",
                "isCompleted":false
            },
            {
                "id":"c4_l4",
                "course":"c4",
                "isCompleted":false
            },
            {
                "id":"c4_l5",
                "course":"c4",
                "isCompleted":false
            },
            {
                "id":"c4_l6",
                "course":"c4",
                "isCompleted":false
            },
            {
                "id":"c4_l7",
                "course":"c4",
                "isCompleted":false
            },
            {
                "id":"fd_1",
                "course":"fd",
                "isCompleted":false
            },
            {
                "id":"fd_2",
                "course":"fd",
                "isCompleted":false
            },
            {
                "id":"fd_3",
                "course":"fd",
                "isCompleted":false
            },
            {
                "id":"fd_4",
                "course":"fd",
                "isCompleted":false
            },
            {
                "id":"fd_5",
                "course":"fd",
                "isCompleted":false
            }
        ] 
    } 
}

function setupUser() {    

    var localStorageDuration = 1000 * 60 * 60 * 24 * 30; // 24 hours

   // Check browser support
   var reqType;
   if (typeof (Storage) !== "undefined") {       

        
        var userExists = false, _urlId, _userId;   
        
        _urlId = getURLParameter("id");

        //console.log("_urlId", _urlId);
        //Must be id-nr not an html-page
        if (_urlId) {
            
            //The link has a user id
            //console.log("Fångade _urlId från URL");
            _userId = _urlId;

        } else {

            //Check for user i Local Storage
            var lsObj = JSON.parse(localStorage.getItem("_uuaUserObj"));
            
            if (lsObj) {
                var dateString = lsObj.timestamp,
                now = new Date().getTime().toString();
                if ((now-dateString)<localStorageDuration) {
                    //User id is valid
                    //console.log("Is valid");
                    _userId = lsObj.userid;
                } else {
                    //User id has expired
                    //console.log("Has expired");
                    localStorage.removeItem("_uuaUserObj");
                    _userId="";
                }
            }                                     
        }

        //console.log("_userId", _userId);
       // if ((_userId !== "") && (_userId !== null)) { // && (_userId != "X") 
       if (_userId && (_userId!="") && (_userId != "X") ) { 
           //USER EXISTS - LOAD USER DATA
           //console.log("USER EXIST - LOAD USER DATA");
            connectToDB("/Elearning/GetUserByUserId?userId="+_userId, "GET", getUserDataCallback, {}, "text");
            //setupCourseObj(obj);
        } else {
            //CREATE NEW USER - LOAD FROM DATABASE 
            //console.log("CREATE NEW USER - LOAD FROM DATABASE ");
            connectToDB("/Elearning/GetNewUser", "GET", newUserDataCallback, {}, "text");
            //setupCourseObj(obj);
        }
       
        
  }
}


function connectToDB(url, type, callbackFn, data, datatype) {
        host = window.location.hostname;

    if (host=="localhost") {
        dbUrl = "https://webbutbildning.uua.learnways.com";    
    }
    
    $.ajax({
                url:dbUrl+url,
                contentType: "application/json; charset=utf-8",
                cache: false,
                data: JSON.stringify(data),
                type: type,
                dataType: datatype,
               
                success: function (data) {
                   //console.log("SUCCESS", url);
                   callbackFn(jQuery.parseJSON(data));                   
                },
                error: function () {
                    //console.log("NOT CONNECTED TO API", url);
                    callbackFn("");
                   /* $.getJSON('json/survey.json', function(data) {
                        console.log("Load survey from JSON");
                        console.log(data.survey);                
                        setupUserData(data.survey);       
                    });*/    		
                }
            });    
}


function handleError(xhr, textStatus, errorThrown)
{
    //console.log("error");
    if (xhr.status == 401)
    {
        console.log("Unauthorized request");
    }
    else
    {
        console.log( xhr.status + " - " + xhr.responseText);
    }
    userDataCallback("");
}


var getAndResetUserDataCallback = function getAndResetUserDataCallback(data) {
    $.each(data.elearning.lessons, function(i, prop) {
        prop.isCompleted = false;
    });

    var saveObj = {
        "elearning":{
            "userdata":data.elearning.userdata,
            "lessons": data.elearning.lessons
        }
    };
    //console.log("saveObj", saveObj);
    connectToDB("/Elearning/UpdateUser", "POST", hasResetUserDataCallback, saveObj, "text"); 
}

var hasResetUserDataCallback = function hasResetUserDataCallback(data) {
    //console.log("hasResetUserDataCallback", data);
	if (data=="") {       
        data.value = dummyObj;
    }  
    setupCourseObj(data.value.elearning);   
    //$('.btn-lesson').eq(0).trigger("click");
 }

 var updateQuestionDataCallback = function updateQuestionDataCallback(data) {
     //console.log("updateQuestionDataCallback", data);
     setSingleRespons(data.question);
 }


var getUserDataCallback = function getUserDataCallback(data) {
    //console.log("getUserDataCallback", data);             

	if (data=="") {       
        data = dummyObj;
    }        
    //Check the user for userid
    if (!data.elearning.userdata.id) {
        //Not a valid userid - create new user
        connectToDB("/Elearning/GetNewUser", "GET", newUserDataCallback, {}, "text");
    } else {
        setupCourseObj(data.elearning);   
    }
 }

/*var updateUserEpostCallback = function updateUserEpostCallback(data) {
    console.log(data);
    if (data=="") {       
        
    }
    createOrganisation();
}*/

var noCallback = function noCallback(data) {
    //console.log(data);
    if (data=="") {       
        
    }
}

 var updateDataCallback = function updateDataCallback(data) {
    //console.log("updateDataCallback", data.value);
    if (data=="") {       
    }        
}

var sendDiplomaCallback = function sendDiplomaCallback(data) {
    //console.log("sendDiplomaCallback", data);
    if (data) {
        diplomaSentPopup();   
    }        
}

var newUserDataCallback = function newUserDataCallback(data) {
   //console.log("newUserDataCallback", data);
	if (data=="") {       
        data = dummyObj;
   } 
    setupCourseObj(data.elearning);    
}

var checkIfEmailExistCallback = function checkIfEmailExistCallback(data) {
    //console.log("checkIfEmailExistCallback", data);      
    loadUserByEmail(data);    
 }

 
 var resultDataCallback = function resultDataCallback(data) {    
    //console.log(data);
     if (data.toString()=="true") {

     }     
 }

 var sendEpost = function sendEpost(epost, txt) {
    var params='clientEmail='+epost; 
    if (host=="localhost") {
        ////console.log(params);
    } else {
        //console.log(params);
       connectToDB("/Api/Client/SendSurveyMail?"+params, "POST", sendEpostCallback, {"text":txt}, "text"); 
    }   
     
 }
 var sendEpostCallback = function sendEpostCallback(data) {    
    //console.log(data);
    if (data.toString()=="true") {
        $('#btn-mail').remove();
        $('#mail-sent').removeClass("js-isHidden");
        $('input#email').text("");
   }  
 }

function updateUserToDB(obj) {
    var userObj = JSON.parse(sessionStorage.getItem("_userObj"));
    var saveObj = {
        "elearning":{
            "userdata":userObj,
            "lessons": [obj]
        }
    };
    //console.log("saveObj", saveObj);
    connectToDB("/Elearning/UpdateUser", "POST", updateDataCallback, saveObj, "text");
}


function storeValue(obj, saveToDB) {    
    //sessionStorage.setItem(sessionId, JSON.stringify(obj));
    //console.log("storeValue", obj);
    if (saveToDB) {
        var saveObj = {
            "elearning":{
                "userdata":userObj,
                "lessons": [obj]
            }
        };
        //console.log("saveObj", saveObj);
        connectToDB("/Elearning/UpdateUser", "POST", updateDataCallback, saveObj, "text");
    }    
}

function getAndResetUserByEmail(epost) {
    connectToDB("/Elearning/GetAndResetUserByEmail?email="+epost, "GET", getUserDataCallback, {}, "text"); 
}
function getUserByEmail(epost) {
    connectToDB("/Elearning/GetUserByEmail?email="+epost, "GET", getUserDataCallback, {}, "text"); 
}


// @prepros-prepend dbConnect.js
var courseObj, courseLookup, courseID, lessonLookup, exerciseObj;
function setupCourseData() {

    var hasData;// = JSON.parse(sessionStorage.getItem(sessionId));
    if (!hasData) {            
        $.getJSON('json/courses.json', function(data) {
            //console.log("Load courses from JSON", data);     
            courseObj = data.courses; 
            exerciseObj = data.exercises;
            setupUser();                   
        });                  
    } else {
        //LOAD FROM SESSIONSTORAGE
        //console.log("Load data from SessionStorage");
        courseObj = hasData;   
        setupUser();
    }   
}


//SORT COURSE DATA
function setupCourseObj(obj) {

    if (!obj.userdata.id) {
        //Not a valid userid - create new user
        connectToDB("/Elearning/GetNewUser", "GET", newUserDataCallback, {}, "text");
    } else {
        //console.log("setupCourseObj", obj);

        //Create lesson lookup obj
        lessonLookup = {};
        for (i = 0, len = obj.lessons.length; i < obj.lessons.length; i++) { 
            lessonLookup[obj.lessons[i].id] = obj.lessons[i];
        }
        
        //Create course lookup obj
        var allCourses = courseObj;
        courseLookup = {};
        for (i = 0, len = allCourses.length; i < allCourses.length; i++) { 
            $.each(allCourses[i].lessons, function(l, props) {
                if (lessonLookup[props.id]) {
                props.isCompleted = lessonLookup[props.id].isCompleted;
                    props.course = lessonLookup[props.id].course;
                    lessonLookup[props.id].order = props.order; 
                }            
            });
            courseLookup[allCourses[i].id] = allCourses[i];
        }  
            
        if (obj.userdata.id!=null) {
            //Save user to Local Storage with timestamp
            var lsObj = {
                "userid":obj.userdata.id, 
                "timestamp": new Date().getTime()
            }
            localStorage.setItem('_uuaUserObj', JSON.stringify(lsObj));

            //Save userObj to SessionStorage
            sessionStorage.setItem('_userObj', JSON.stringify(obj.userdata));

            //Save lessonObj to SessionStorage
            sessionStorage.setItem(sessionId, JSON.stringify(courseObj));
        } 

        if (pageId=="index") {
            initCourseOverview();
        } else if (pageId=="course") {
            createRegisterForm();
            initLessonsOverview();
        } else if (pageId=="lesson") {        
            initLessonSections();
        }
    }
    
}

var updateCourseOverview = function() {
    ////console.log("updateCourseOverview");  

}

function getUserProp(prop) {
    var lsObj = JSON.parse(sessionStorage.getItem("_userObj"));
    return lsObj[prop];
}
function saveUserProp(prop, value) {    
    var lsObj = JSON.parse(sessionStorage.getItem("_userObj"));
    ////console.log("saveUserProp", lsObj);
    lsObj[prop] = value;
   
    sessionStorage.setItem('_userObj', JSON.stringify(lsObj));
}


function setLessonToCompleted(lessonId) {
    ////console.log("setLessonToCompleted", lessonId);    
    if (!lessonLookup[lessonId].isCompleted) {
        lessonLookup[lessonId].isCompleted = true; 
        var course = lessonLookup[lessonId].course;
        var currentCourseObj = courseLookup[course];
        
        var obj = {};
        $.each(currentCourseObj.lessons, function(i, prop) {
            if (prop.id==lessonId) {
                prop.isCompleted = true; 
                obj = prop;
            }
        });
        ////console.log(currentCourseObj);
        sessionStorage.setItem(sessionId, JSON.stringify(courseObj));
    
        updateUserToDB(obj); 
    }      
}

function addScrollInstruction($target, nextTarget, delay) {
    $target.append(getScroll(nextTarget, delay));
   
	$target.find('a.anchor').click(function(e) {
        e.preventDefault();
        var href = $(this).attr("href");
        ////console.log(href);
        $(window).scrollTo($(href), 500, {axis:'y'});
        return false;
    });

    function updateHeader() {
        var targetH = $target.outerHeight()*0.25,
            targetPos = $target.offset().top,
            scrollTop = $(window).scrollTop(),
            fromTop = scrollTop - targetPos;   

        if (fromTop > targetH) {
            $target.find('.page-scroll-down').addClass("hide");
        } 
    }
        
    $(window).scroll(function () {
        updateHeader();    
    });

    updateText($target.find(".page-scroll-down"));
   
}

function initCourseOverview() {

    addScrollInstruction($('#start-wrapper header'), "#scroll-pos-1", false);

    var $wrapper = $('#courses-wrapper');
    $.each(courseObj, function(i, prop) {   
        if (prop.id!="fd") {
            $wrapper.append(getCourseBtn(prop)); 
        }    
    });
    
    updateText($wrapper);
}

function initLessonsOverview() {
   
    $('body').addClass("theme-"+courseLookup[courseID].theme);
    $('header').empty();

    var $section = $('#lessons-section');

    
    
   //GET COURSE PROGRESS
   if (courseID!="fd") {

        $section.empty();
        $section.append(getCourseOverview());

        //-----KURS-----//

        var $wrapper = $('#lessons-wrapper').find('.all-lessons-list');
       var status = getCourseProgress(courseID);
        
        
        var nextLessonObj;
        if (status.nextLesson>-1) {
            nextLessonObj = courseLookup[courseID].lessons[status.nextLesson];
        } else {
            nextLessonObj = {"course":courseID, "url":""}
        }
            
        //console.log(nextLessonObj, status);
        
        $('header').append(getCourseHeader(nextLessonObj));

        var prog = (status.nrOfDone/status.total);

        
        if (prog<1) {
            //NOT STARTED
            $("#btn-start").attr("data-iframe", nextLessonObj.url);
            
            if (prog>0) {
                //HAS STARTED, NOT DONE
                $("#btn-start").attr("data-dbid", "btn_continuetest");
                updateText($("#btn-start"));
                $("#btn-start").attr("aria-label", window.getText("btn_continuetest")+" - "+window.getText(nextLessonObj.id));
            } else {
                $("#btn-start").attr("aria-label", +window.getText("btn_start")+" - "+window.getText(nextLessonObj.id));
            }            
        } 

        var nrText = window.getText("course_p_1"),
            nr = courseLookup[courseID].lessons.length; 
            nrText = nrText.replace("[X]", nr);
        $('#lesson-nr').html(nrText);

        //ADD LESSONS
        $.each(courseLookup[courseID].lessons, function(i, prop) {        
            $wrapper.append(getLessonRow((i+1), prop));
        });

        $section.append('<div class="row col-xs-100 center-xs m-t-4"><a href="index.html" class="button default db-txt" data-dbid="btn_closecourse"></a></div>');

        //BESKRIVNING AV KURSEN     
        $('.about-wrapper').append(getAboutSection(courseID));
        updateText($section);
        addEditor($section);
        $('.accordion-panel').slideUp(0);
        
        $('#btn-about').click(function() {
            $('.about-wrapper').toggleClass("closed");
            if ($('.about-wrapper').hasClass("closed")) {
                $('.accordion-panel').slideUp(250);
                $(this).attr("aria-expanded", false);
            } else {
                $('.accordion-panel').slideDown(250);
                $(this).attr("aria-expanded", true);
            }        
        });

        setCourseProgress(status);

        $('#btn-diplom').click(function() {
            sendDiploma();        
        });

        if (status.nrOfDone==0) {
            $('#btn-about').trigger("click");
            hideMe($('#btn-about'));
        }   

   } else {

       //-----FÖRDJUPNING-----//

       $('header').append('<div class="container maxW"><div class="row col-xs-100 center-xs"><div class="col col-xs-100 col-md-80 middle-xs"><h1 class="strong db-txt" data-dbid="'+courseID+'"></h1>');

       $section.append(getFDOverview());

       var $fdwrapper = $('#fd-wrapper');
       //ADD LESSONS
       $.each(courseLookup[courseID].lessons, function(i, prop) {        
            $fdwrapper.append(getFD(prop));
       });
       $fdwrapper.append(getUUALink());
       updateText($section);
       addEditor($section);
       
   }    
    
    updateText($('header'));    


    $('button.btn-lesson').click(function() {
        var url=$(this).data("iframe"), 
            id=$(this).attr('id');
           if (getUserProp("epost")!="") {
                window.openResource(url, id);
            } else {
                //USER MUST REGISTER BEFORE OPENING A COURSE
                var $popup = $('#popup-register');
                overlayOpen($(this), $popup.closest('.popup-overlay-bg'), $popup);
            }
        
    }); 

    //Check if a lesson was included in the url
    //getPagePosition();
    
}

function sendDiploma() {  
    
    var $popup = $('#diploma-sent');
    overlayOpen($('#btn-diploma'), $popup.closest('.popup-overlay-bg'), $popup);
    
    var userId = getUserProp("id");
    var addOn="?userId="+userId+"&course="+courseID+"&languageCode="+window.lang;

    connectToDB("/Elearning/SendDiplomaAsync"+addOn, "POST", sendDiplomaCallback, {}, "text");   
}

function diplomaSentPopup() {
   // var $popup = $('#diploma-sent');
   // overlayOpen($('#btn-diploma'), $popup.closest('.popup-overlay-bg'), $popup);

   // trapFocus($('#diploma-sent'));
}

function getCourseProgress(course) {
    var cObj = courseLookup[course];
    var total = cObj.lessons.length, nrOfDone=0,
        nextLesson = -1;
    $.each(cObj.lessons, function(l, props) {
       if (props.isCompleted) {
            nrOfDone++;
       }   
       if (nextLesson<0 && !props.isCompleted && props.available) {
            nextLesson=l;
       }
    });

    if (nextLesson<0 && cObj.lessons[0].available) {
        nextLesson=0;
    }
    
    var progress = {"nrOfDone":nrOfDone, "total":total, "nextLesson":nextLesson};
    //console.log(progress);
    return progress;
}

function getLessonStatus(lessonId) {
    return lessonLookup[lessonId].isCompleted;
}
function setCourseProgress(status) {
    var perc = parseInt((status.nrOfDone/status.total)*100);
     var $progress = $('.course-progress').find(".progress-fill");
    $progress.width(perc+"%");
    $progress.attr("aria-valuemin", 0);
    $progress.attr("aria-valuemax", status.total);
    $progress.attr("aria-valuenow", status.nrOfDone);
    $progress.attr("aria-valuetext", perc+"%");
    if (perc==100) {
        showMe( $('#btn-diplom'));
        hideMe( $('#btn-start'));
        $('#btn-diplom').attr("disabled", false);        
        var color = '#9D11EF';
        if (courseID=="c2") {
            color="#A85F00";            
        } else if(courseID=="c3") {
            color="#0272CE"; 
        } else if(courseID=="c4") {
            color="#D1263A"; 
        }
        $('#btn-diplom').confettiButton({
            colorArray: [color],
            minScale: 100,
            maxScale: 300
        });
    } else {
        hideMe( $('#btn-diplom'));
        showMe( $('#btn-start'));
    }
}



function initLessonSections() {
    //console.log("initLessonSections");

     var lessonid = $('body').data("lesson"),
        courseObj = lessonLookup[lessonid],
        courseNr = courseObj.course[courseObj.course.length-1]; 

    var $startPage = $('.lesson-start');
    if (courseObj.course=="fd") {
        $startPage = $('.fd-start');
    }

    //----------------------------------------//
	//SCROLL DOWN
	//----------------------------------------//

    addScrollInstruction($startPage, "#section-1", false);

    //----------------------------------------//
	//START
	//----------------------------------------//
   
    if (courseObj.course!="fd") {
        $startPage.append(getLessonStart(lessonid));
    } else {
        $startPage.append(getFDStart(lessonid));
    }
    updateText($startPage); 
    addEditor($startPage);

    //----------------------------------------//
    //CLOSE ARIA-LABEL
	//----------------------------------------//
    
    var ariatxt = window.getText("btn_close_aria")+courseNr;
    $('.btn-close-popup.close-resource').attr("aria-label", ariatxt);

    //----------------------------------------//
	//CITAT
	//----------------------------------------//

	var $citatWrapper = $('.citat-section');
	if ($citatWrapper.length>0) {
		$citatWrapper.each(function() {
            var id=$(this).data("txtrid")
            $citatWrapper.append(getCitatSection(id));			
            updateText($citatWrapper); 
            addEditor($citatWrapper);
            bindToInview($citatWrapper.find('.fade-in-up'))
		});
	}

    //----------------------------------------//
	//VIDEO
	//----------------------------------------//

	var $videoWrapper = $('.video-section');
	if ($videoWrapper.length>0) {
		$videoWrapper.each(function() {
            var $self= $(this),
                id=$self.data("txtrid"),
                videoid=$self.data("videoid"),
                img = $self.data("img"),
                type = $self.data("type"),
                pdf = $self.data("pdf");
                $self.append(getVideoSection(id, videoid, img, type, pdf));			
            updateText($self); 
            addEditor($self);
            var w = $self.find('.container').offset().left;
            $self.find('.anim-block').width(w);
            
            var videoTL = new TimelineMax();
            videoTL.staggerFrom($self.find('.stagger-anim'), 1, {x:'-100vw', opacity:0, ease:"Power2.easeOut"}, 0.25);
            videoTL.add(TweenMax.from($self.find('.moveinright'), 1, {x:'100vw', opacity:0, ease:"Power2.easeOut"}, 0.5));

            
            var controller = new ScrollMagic.Controller();
            var offset = $(window).height()/2;
            new ScrollMagic.Scene({triggerElement: "#video-"+id, tweenChanges: false, reverse:false, offset:-offset})
                            .setTween(videoTL)
							.addTo(controller);  

            $videoWrapper.find("a.btn-video").lwsLightboxVideo();  
            $(window).resize(function () {
                var w = $self.find('.container').offset().left;
                $self.find('.anim-block').width(w);
            });
		});
	}
    

    //----------------------------------------//
	//GROUP EXERCISE
	//----------------------------------------//

	var $groupWrapper = $('.group-section');
	if ($groupWrapper.length>0) {
		$groupWrapper.each(function() {
            var $self= $(this),
                id=$self.data("txtrid"),
                url=$self.data("url"),
                princip=$self.data("princip");
                $self.append(getGroupSection(id, url, princip));			
            updateText($self); 
            addEditor($self);
            var w = $self.find('.container').offset().left;
            $self.find('.anim-block').width(w);
            
            var groupTL = new TimelineMax();
            groupTL.staggerFrom($self.find('.stagger-anim'), 1, {x:'-100vw', opacity:0, ease:"Power2.easeOut"}, 0.25);
            groupTL.add(TweenMax.from($self.find('.moveinright'), 1, {x:'100vw', opacity:0, ease:"Power2.easeOut"}, 0.5));

            
            var controller = new ScrollMagic.Controller();
            var offset = $(window).height()/2;
            new ScrollMagic.Scene({triggerElement: "#group-"+id, tweenChanges: false, reverse:false, offset:-offset})
                            .setTween(groupTL)
							.addTo(controller);  
            
            $(window).resize(function () {
                var w = $self.find('.container').offset().left;
                $self.find('.anim-block').width(w);
            });
		});
	}



    
    //----------------------------------------//
	//EXERCISE
	//----------------------------------------//

    var $exerciseWrapper = $('.questions-section');
	if ($exerciseWrapper.length>0) {
		$exerciseWrapper.each(function() {
            var $self = $(this),
                exerciseid = $self.data('exercise');
                startExercise(exerciseid, $self, false);
        });
    }

     //----------------------------------------//
	//REFLECTIONS
	//----------------------------------------//

    var $reflectionWrapper = $('.reflection-section');
	if ($reflectionWrapper.length>0) {
		$reflectionWrapper.each(function() {
            var $self = $(this),
                id = $self.data('txtrid');
                $self.append(getReflection(id));			
                updateText($self);
                addEditor($self);

                var controller = new ScrollMagic.Controller();
                var offset = $(window).height()/2;
                new ScrollMagic.Scene({triggerElement: "#reflect-q", reverse:true,  tweenChanges: false, offset:-offset})
                        .setTween(TweenMax.from($("#reflect-q"), 0.5, {y:$("#reflect-q").height(), ease:Power2.easeOut}))
                .addTo(controller);

                new ScrollMagic.Scene({triggerElement: "#reflect-q"})
                    .on("enter", function (e) {
                        var nextSectionID = "#"+$self.next().attr("id"); 
                        setTimeout(function(){ 
                            addScrollInstruction($self, nextSectionID, false);
                        }, 1000);
                        
                    })
                .addTo(controller);

        });
    }

     //----------------------------------------//
	//LISTS
	//----------------------------------------//

    var $listWrapper = $('.list-container');
	if ($listWrapper.length>0) {
		$listWrapper.each(function() {
            var $self = $(this),
                id = $self.data('txtrid'),
                items = $self.data('items');
                $self.append(getList(id, items));			
                updateText($self);
                addEditor($self);
        });
    }

    //----------------------------------------//
	//PERSPEKTIV-ANIMATION
	//----------------------------------------//

    var $svgWrapper = $('#svg-wrapper');
	if ($svgWrapper.length>0) {
		var perspAnimation = lottie.loadAnimation({
            container: document.getElementById('svg-wrapper'), // the dom element that will contain the animation
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: 'img/balls/data.json', // the path to the animation json   
            rendererSettings: {
                preserveAspectRatio: 'xMidYMin slice'
            }           
        });
        var dir = 1;
        perspAnimation.addEventListener('complete', function() {
            setTimeout(function(){
                dir = dir*-1;
                perspAnimation.setDirection(dir);
                perspAnimation.play();
            }, 2000);
          })
    }


    

    //----------------------------------------//
	//LAST
	//----------------------------------------//
    var $lastWrapper = $('.last-section');
	if ($lastWrapper.length>0) {
		$lastWrapper.each(function() {
            var $self= $(this),
                id=$self.data("txtrid"),
                img = $self.data("img") 
                $self.append(getLastSection(id, img));			
            updateText($self); 
                       
            var controller = new ScrollMagic.Controller();
            var offset = $(window).height()/2;
            new ScrollMagic.Scene({triggerElement: "#last", reverse:true,  tweenChanges: false, offset:-offset})
                    .setTween(TweenMax.from($("#last"), 0.5, {y:$("#last").height(), ease:Power2.easeOut}))
            .addTo(controller);

            $("#btn-closelesson").click(function(e){
                e.preventDefault();                
                parent.closeResource();
            });
		});
	}

    $('main').prepend('<div class="page-progress"><div class="progress-fill" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-valuetext="0%"></div></div>');

    function setLessonProgress() {
        var wh = $(window).height(), 
            h = $('body').height(),
            sHeight = h - wh;
        var perc = Math.max(0, Math.min(1, $(window).scrollTop()/sHeight));
        var newValue = Math.round(perc*100);
        var currentValue = $('.progress-fill').attr("aria-valuenow");
        //if (newValue>currentValue) {
            $('.progress-fill').width(newValue+"%");
            $('.progress-fill').attr("aria-valuenow", newValue);
            $('.progress-fill').attr("aria-valuetext", newValue+"%");
       // }    
        if (newValue==100) {
            //Set lesson to completed
            setLessonToCompleted(lessonid);
        }    
    }
    $(window).on('scroll', function(){
        setLessonProgress();
        
    });
    setLessonProgress();
    addEditor($('main'));
   
}



//SETUP REGISTER PAGE
function createRegisterForm() {
    var $form = $('.form-register');
    var hasAccepted = false;

    $('#accept').on('change', function() {
        hasAccepted = this.checked;
        //console.log(hasAccepted);
   });
   $('#accept').click(function() {
        hasAccepted = this.checked;
        checkIfReady();  
   });
   $('#accept').on('keyup', function(e){
       //console.log(e.keyCode);
        if (e.keyCode === 13         ) {
            $(this).trigger('click');           
        }
    });
    $form.find('input.text-input').on('keyup', function(e){
        //console.log("KEY");
        $(this).addClass('edited');
        checkIfReady();  
    });
    function checkIfReady() {
        if (validateEmail($('input#email').val()) 
            && $('input#user-name').val()!=""
            && hasAccepted) {
            $('.btn-submit').attr("disabled", false);
        } else {
            $('.btn-submit').attr("disabled", true);
        }   
    }
    
    $form.find('[type="submit"]').on('click.formValidation', function(e){
        e.preventDefault();
        shouldPrevent = false;
        errorList = [];
        
        $inputs = $form.find('input[required]');
    
        $inputs.each(function(index, input){
          errorMessageSelector = '#error-'+$(input).attr('id');
          $form.find(errorMessageSelector).removeAttr('aria-live');
          error = $form.find(errorMessageSelector);
          error.css('display', 'none');
    
          if(!input.validity.valid){
            error.css('display', 'inline-block');
            shouldPrevent = true;
            errorList.push(error);
    
          } else {
            error.css('display', 'none');
          }
        });
    
        if(!$form[0].checkValidity()){
          e.preventDefault();
          errorList[0].attr('aria-live', 'assertive');
        }

        if (!shouldPrevent) {
            var epost = $('input#email').val(),
                namn = $('input#user-name').val();
            saveUserProp("epost", epost);
            saveUserProp("name", namn);

            // ----> Check if epost exists <----
            connectToDB("/Elearning/CheckIfEmailExist?email="+epost, "GET", checkIfEmailExistCallback, {}, "text"); 

            hideMe($('#popup-register').find('.close-popup'));
            
        }
    });

}

function loadUserByEmail(epostExists) {
    var userExists = epostExists;
    if (userExists) {
        //USER ALREADY EXISTS
        var epost = getUserProp("epost");
        hideMe($('.register-content'));
        $('#popup-register').append(getEpostExist(epost));
        $('#followup').attr("tabindex",-1).focus();
        trapFocus($('#popup-register'));
        updateText($('#popup-register'));
        window.preventClose = true;
                 
        $('#btn-restart').click(function() {
            //Börja om 
            $('#followup').remove();
            $('#popup-register').append(getResetUser(epost));
            $('#followup').attr("tabindex",-1).focus();
            trapFocus($('#popup-register'));
            updateText($('#popup-register'));
            $('#btn-yes').click(function() {
                window.preventClose = false;
                //Börja om
                window.overlayClose();              
                
                //--------> SET ALL LESSONS TO NOT COMPLETE******
                //--------> RESET USER PROGRESS
                getAndResetUserByEmail(epost);
             
            });
            $('#btn-reload').click(function() {
                //Hämta sparade framsteg
                window.preventClose = false;
                 window.overlayClose();
                 //--------> LOAD USER PROGRESS
                 getUserByEmail(epost);;  
            });
        });                
        $('#btn-reload').click(function() {
            //Hämta sparade framsteg
            window.preventClose = false;
            window.overlayClose();

            //--------> LOAD USER PROGRESS
            getUserByEmail(epost);

        });                    
        $('#btn-back').click(function() {
            //Gå tillbaka och ange en annan epost            
            $('#followup').remove();
            saveUserProp("epost", "");
            saveUserProp("name", "");
            showMe($('#popup-register').find('.close-popup'));
            showMe($('.register-content'));
        });
    } else {
         //--------> EXIT POPUP AND START LESSON

         //Save user to db
         updateUserToDB({});   

         window.overlayClose();
         $('.btn-lesson').eq(0).trigger("click");
    }

} 


function startExercise(exerciseid, $target, isDone) {

    var exObj = exerciseObj[exerciseid], allQs = exObj.questions,
        exId = exerciseid, nrOfQs = allQs.length, qNr = 0;
 
    if (exObj.autostart) {
 
        if (exObj.type=="serie") {
            startSerie($target);
        } else if (exObj.type=="case") {
            startCase($target);
        } else {
            setQuestion($target, false);
        }
                 
    } else {
        setStartPage($target, isDone)
    } 

    $target.removeClass("js-isHidden");  
    animateCSS($target, "fadeInUp", "");    
    
    //--------------------------------------------------
    //------------------QUESTION-----------------//
    function setQuestion ($qWrapper, moveDown) {
        
        $qWrapper.empty();
        hideMe($qWrapper);
        var qObj = allQs[qNr];
        //console.log(qObj);

        var qType = qObj.qType;

        $qWrapper.append(getSingleQuestion(qObj, qNr, nrOfQs));

        var $typewrapper = $qWrapper.find('.qtype-wrapper');
        switch (qType ) {        

            case "single":
                $typewrapper.append(getRadio(qObj, qNr, nrOfQs));
            break;
            case "multi":
                $typewrapper.append(getMultipleChoice(qObj, qNr, nrOfQs));
                if (qObj.correct) {
                    showMe($qWrapper.find(".btn-submitQ"));
                } else {
                    showMe($qWrapper.find(".btn-nextQ"));
                }
            break;
            case "single-respons":
                $typewrapper.append(getRadio(qObj, qNr, nrOfQs));
            break;
            case "slider":
                //$typewrapper.append(getSlider(qObj));
            break;

            case "tree":
                $typewrapper.append(getTreeStep(qObj));           
            break;
        }

        updateText($qWrapper);
 

        function nextQuestion() {
            qNr++;
             
            animateCSS($qWrapper.find('.survey-question'), "fadeOutUp", "", function() {          
                if (qNr<nrOfQs) {   
                    $(window).scrollTo($qWrapper, 250, {axis:'y'});
                    setQuestion($qWrapper, false);
                } else {
                    setResultAction("feedback", $qWrapper);
                }               
                
            });
           
        }
        function prevQuestion() {
            qNr--;    
            animateCSS($qWrapper.find('.survey-question'), "fadeOutDown", "", function() {          
                if (qNr>-1) {
                    setQuestion($qWrapper, true);
                }              
            });
        }           
        
        //ADD BUTTON LISTENERS
        $qWrapper.find('button.btn-nextQ').click(function() {            
            nextQuestion();
        });
        $qWrapper.find('button.btn-answer').click(function() {
            $(window).scrollTo($qWrapper, 250, {axis:'y'});
            $(this).parent().addClass("answered");
            $(this).parent().find(".btn-answer").removeClass("selected")
                .attr("aria-checked", false);
            $(this).addClass("selected").attr("aria-checked", true);

            var target = $(this).data("qid");           
            var altNr = $(this).data("altnr");

            if (qType!="single-respons") {    
            
                //updateValue(target, $(this).data("value"), 0, true);   
                  
                if (qObj.correct) {
                    //Show Rätt/fel
                    $(this).addClass("userselect");
                    $(this).parent().find(".btn-answer").attr("disabled", true);
                    if (qObj.showcorrect) {                        
                        $(this).parent().find(".btn-answer").each(function() {
                            if (qObj.correct.indexOf($(this).data("altnr"))>-1) {
                                $(this).addClass("correct");
                            }
                        });
                        if (qObj.feedback) {
                            $('#fb-status').text(window.getText(qObj.id+"_fb"));
                        }
                    } else {
                        if (qObj.correct.indexOf(altNr)<0) {                       
                            $(this).addClass("wrong");
                            $('#fb-status').text(window.getText("gen_wrong"));
                        } else {
                            $(this).addClass("correct");
                            $('#fb-status').text(window.getText("gen_correct"));
                        }
                    }
                    $('#fb-status').attr("tabindex",-1).focus();
                    $qWrapper.find('.btn-nextQ').attr("disabled", false);

                    if ((qNr+1)==nrOfQs) {
                        $qWrapper.append(getSectionDone("exercise", "center-xs"));
                        var nextSectionID = "#"+$qWrapper.closest('section').next().attr("id");
                        addScrollInstruction($qWrapper, nextSectionID, false);
                        
                        var offset = $(window).height()-$qWrapper.outerHeight();
                        $(window).scrollTo( $qWrapper, 250, {axis:'y', offset:-offset});
                    } 

                }  else {
                    nextQuestion(); 
                } 
                
            } else {
                setSocialQuestion(target, $(this).data("value"));  
                $qWrapper.find('.answer-wrapper').remove();
                $qWrapper.find('.qtype-wrapper').append(getRespons(qObj, exId));

                $qWrapper.append(getSectionDone("exercise", "center-xs"));        
                var nextSectionID = "#"+$qWrapper.closest('section').next().attr("id");
				addScrollInstruction($qWrapper, nextSectionID, false);

                var offset = $(window).height()-$qWrapper.outerHeight();
                $(window).scrollTo( $qWrapper, 250, {axis:'y', offset:-offset});
                
                $qWrapper.find('.instr').text(window.getText("gen_others")); 

                $qWrapper.find('.instr').attr("tabindex",-1).focus();
                addEditor($qWrapper.find('.answer-wrapper'));
                $qWrapper.find('button.btn-nextQ').click(function() {
                    nextQuestion();
                });
                /*showRespons(true);*/
            }
        });
        $qWrapper.find('button.btn-checkbox').click(function() {
            $(this).toggleClass("selected");
            if ($(this).hasClass("selected")) {
                $(this).attr("aria-checked", true);
            } else {
                $(this).attr("aria-checked", false);
            }

            if ($(this).parent().find(".selected").length>0) {
                $qWrapper.find('.btn-nextQ').attr("disabled", false);
            }           
        });
    
        
        showMe($qWrapper);
        addEditor($qWrapper);
        var anim =  "slideInUp"; 
        if (moveDown) {
            anim = "slideInDown"
        } 
        animateCSS($qWrapper.find('.survey-question'), anim, "", function() {
            if (qNr>0) {
                $qWrapper.find('.question-wrapper').attr("tabindex",-1).focus();
            } 
        });
        //$(window).scrollTo($qWrapper, 250, {axis:'y'});
    } 

    //--------------------------------------------------
    //------------------SERIE-----------------//

    function startSerie ($qWrapper) {
        
        $qWrapper.empty();
        hideMe($qWrapper);
        $qWrapper.append(getSerieQuestion(exId, qNr, nrOfQs));
        updateText($qWrapper);        
        
        function setSerieQuestion() {
            
            var qObj = allQs[qNr];
            var qType = qObj.qType;

            var progressString = (qNr+1)+$qWrapper.find(".progress").text().slice(1);
      
            $qWrapper.find(".progress").text(progressString);

            var $typewrapper = $qWrapper.find('.qtype-wrapper');

            $typewrapper.empty();
            $typewrapper.append('<div class="h3 strong text-center db-txt txtr-edit m-t-1" data-dbid="'+qObj.id+'"></div>');
            switch (qType ) {        
                case "single":
                    $typewrapper.append(getRadio(qObj, qNr, nrOfQs));
                break;
                case "multi":
                    $typewrapper.append(getMultipleChoice(qObj, qNr, nrOfQs));
                    if (qObj.correct) {
                        showMe($(".btn-submitQ"));
                    } else {
                        showMe($(".btn-nextQ"));
                    }
                break;              
            }
            updateText($typewrapper);    

            function nextSerieQuestion() {
                qNr++;                
                animateCSS($typewrapper, "fadeOut", "", function() {          
                    if (qNr<nrOfQs) {   
                        setSerieQuestion();
                    } else {
                        setSerieResult();
                    }               
                    
                });            
            }  
            
            $qWrapper.find('button.btn-nextQ').click(function() {
                nextSerieQuestion();
                $(window).scrollTo( $qWrapper, 250, {axis:'y'});
            });
            $qWrapper.find('button.btn-submitQ').click(function() {
                $typewrapper.find('button.btn-checkbox').each(function() {
                    $(this).attr("disabled", true);
                    var altNr = $(this).data("altnr");
                    //console.log(qObj.correct, altNr);
                    if (qObj.correct.indexOf(altNr)>-1) { 
                        $(this).addClass("correct");
                    }
                });
                hideMe($(this));
                showMe($qWrapper.find('button.btn-nextQ'));
                $qWrapper.find('button.btn-nextQ').attr("disabled", false);
            });
            
            $qWrapper.find('button.btn-answer').click(function() {

                var offset = $(window).height()-$qWrapper.outerHeight();
                $(window).scrollTo( $qWrapper, 250, {axis:'y', offset:-offset});

                $(this).parent().addClass("answered");
                $(this).parent().find(".btn-answer").removeClass("selected")
                    .attr("aria-checked", false);
                $(this).addClass("selected").attr("aria-checked", true);

                var target = $(this).data("qid");           
                var altNr = $(this).data("altnr");
                //updateValue(target, $(this).data("value"), 0, true);     
                if (qObj.correct) {
                    $(this).parent().find(".btn-answer").attr("disabled", true);
                    $(this).addClass("userselect");
                    if (qObj.correct.indexOf(altNr)<0) {                       
                        $(this).addClass("wrong");
                        $('#fb-status').text(window.getText("gen_wrong"));
                    } else {
                        $(this).addClass("correct");
                        $('#fb-status').text(window.getText("gen_correct"));
                    }
                    showMe($qWrapper.find('button.btn-nextQ'));
                    $qWrapper.find('.btn-nextQ').attr("disabled", false);

                    if ((qNr+1)==nrOfQs && !exObj.finalfb) {
                        $qWrapper.append(getSectionDone("exercise", "center-xs"));
                        var nextSectionID = "#"+$qWrapper.closest('section').next().attr("id");
                        addScrollInstruction($qWrapper, nextSectionID, false);

                        var offset = $(window).height()-$qWrapper.outerHeight();
                        $(window).scrollTo( $qWrapper, 250, {axis:'y', offset:-offset});
                    } 

                }  else {
                    nextSerieQuestion(); 
                }                      
                
            });
            $qWrapper.find('button.btn-checkbox').click(function() {
                $(this).toggleClass("selected");
                if ($(this).hasClass("selected")) {
                    $(this).attr("aria-checked", true);
                } else {
                    $(this).attr("aria-checked", false);
                }
                if ($(this).parent().find(".selected").length>0) {
                    if (qObj.correct) {
                        $qWrapper.find('.btn-submitQ').attr("disabled", false);
                    } else {
                        $qWrapper.find('.btn-nextQ').attr("disabled", false);
                    }
                        
                }           
            });

            
            showMe($typewrapper);
            addEditor($typewrapper);           
            animateCSS($typewrapper, "fadeIn", "", function() {
                if (qNr>0) {
                    $qWrapper.find(".question-wrapper").attr("tabindex",-1).focus();
                }               
            });
           
            
        }    
        
        function setSerieResult() {
           animateCSS($qWrapper, "fadeOut", "", function() {
                $qWrapper.empty();
                $qWrapper.append(getSerieResult(exId));
                $qWrapper.append(getSectionDone("exercise", "center-xs"));

                var nextSectionID = "#"+$qWrapper.closest('section').next().attr("id");
				addScrollInstruction($qWrapper, nextSectionID, false);

                updateText($qWrapper); 
                addEditor($qWrapper);
                showMe($qWrapper);
                animateCSS($qWrapper, "fadeIn", "", function() {
                    $qWrapper.find(".question-wrapper").attr("tabindex",-1).focus();
                });
           });
        }

        setSerieQuestion();
        showMe($qWrapper);
        addEditor($qWrapper);

        animateCSS($qWrapper, "fadeIn", "");
       
    } 


    //--------------------------------------------------
    //------------------DIALOG-----------------//

    function startDialog($qWrapper) {
        $qWrapper.empty();
        hideMe($qWrapper);
        var qObj = allQs[qNr]; 

        $qWrapper.append(getDialogStart(qObj.id+"_name", exObj.startimg, exId));
        
        var $dialogAnswers = $qWrapper.find('.dialog-questions'),
            $msgContainer = $qWrapper.find('.dialog-container'),
            msgNr = 1;

        updateText($qWrapper); 
        addEditor($qWrapper);        

        showMe($qWrapper);   
        animateCSS($qWrapper, "slideInUp", "", function() {
            setDialogQuestion();
        });
        
        var isAvailable = true;

        function setDialogQuestion() {            
            qObj = allQs[qNr]; 
            $dialogAnswers.empty();
            $dialogAnswers.append(getDialogQuestion(qObj));
            addMessage("L", qObj.id, msgNr, false);
            $msgContainer.scrollTo({top:'100%', left:'0'}, 500); 
            TweenLite.fromTo($('#msg-'+msgNr), 1, {alpha:0, y:50}, {alpha:1, y:0, delay:1, onComplete:function() {
                showMe($dialogAnswers.find('.btn-holder'));
                TweenLite.from($dialogAnswers.find('.btn-holder'), 0.5, {alpha:0, y:50});
            }});
            $('#msg-'+msgNr).attr("tabindex",-1).focus();
            //$('#msg-'+msgNr).removeClass("out");            

            $dialogAnswers.find(".btn-answer").click(function() {
                if (isAvailable) {
                    isAvailable = false;
                    
                    $dialogAnswers.find(".btn-answer").attr("disabled", true);
                    $(this).remove();

                    if ($dialogAnswers.find(".btn-answer").length<1) 
                        { 
                            hideMe($('#dialog_q_instr_2'));                            
                        }
                    msgNr++;
                    var ansNr = qObj.id+"_alt_"+$(this).data("altnr");                
                    addMessage("R", ansNr, msgNr, false);
                    $msgContainer.scrollTo({top:'100%', left:'0'}, 1000);  
                    
                    $(window).scrollTo($('.dialog-header'), 250, {axis:'y', offset:-20});    

                    TweenLite.fromTo($('#msg-'+msgNr), 1, {alpha:0, y:50}, {alpha:1, y:0, onComplete:function() {                    
                        msgNr++;                       
                        addMessage("L", ansNr+"_fb", msgNr, true);
                    }});
                }                
            });            

            updateText($dialogAnswers); 
            addEditor($dialogAnswers);
            $(window).scrollTo($qWrapper, 250, {axis:'y'});
        }

        function addMessage(side, txtrid, nr, useDelay) {
            $msgContainer.find(".side-"+side).removeClass("last");
            if (useDelay) {
                $msgContainer.append(getMessageDelay());
                $msgContainer.append(getMessage(side, txtrid, nr));
                updateText($('#msg-'+nr)); 
                TweenLite.set($('#msg-'+nr), {alpha:0});

                //Add message delay
                TweenLite.fromTo($('#msg-delay'), 1, {alpha:0, y:50}, {alpha:1, y:0, onComplete:function() {
                    //Add message        
                    $msgContainer.scrollTo({top:'100%', left:'0'}, 500); 
                    TweenLite.fromTo($('#msg-'+msgNr), 1, {alpha:0}, {alpha:1, delay:1, onStart:function() {
                      $('#msg-delay').remove();  
                    },
                    onComplete:function() {
                        if ($dialogAnswers.find(".btn-answer").length<1) 
                        {
                            if (qNr+1<nrOfQs) {
                                //Continue with new question
                                qNr++;
                                msgNr++;  
                                setDialogQuestion();
                            } else {
                                //Exercise done
                                msgNr++;
                                addMessage("L", exId+"_end", msgNr, false);
                                $dialogAnswers.append('<button id="btn-endC" class="default db-txt m-t-2" data-dbid="btn_endC">'+window.getText("btn_endC")+'</button>');
                                $('#btn-endC').click(function() {                        
                                    startExercise(exId, $qWrapper, true);
                                });
                            } 
                                                       
                        } else {
                            hideMe($('#dialog_q_instr_1'));                    
                            showMe($('#dialog_q_instr_2'));
                        }
                        isAvailable = true; 
                        $dialogAnswers.find(".btn-answer").attr("disabled", false);
                    }});          
                    $('#msg-'+nr).attr("tabindex",-1).focus();           
                    
                }});
            } else {                
                $msgContainer.append(getMessage(side, txtrid, nr));
                updateText($('#msg-'+nr)); 
                $msgContainer.scrollTo({top:'100%', left:'0'}, 500);
            }        
        }
    }

    function getMessage(side, txtrid, nr) {
        var html="";
            html+='<div id="msg-'+nr+'" class="msg-wrapper p side-'+side+' last">';
                html+='<blockquote class="db-txt" data-dbid="'+txtrid+'"></blockquote>';
            html+='</div>';
        return html;
    }

    function getMessageDelay() {
        var html="";
            html+='<div id="msg-delay">';
                html+='<img src="img/msg-delay.svg" alt=""/>';
            html+='</div>';
        return html;
    }
    

    function getDialogQuestion(obj) {
        var html="";
            html+='<div class="col col-xs-100 middle-xs btn-holder js-isHidden">';
                html+='<p id="dialog_q_instr_1" class="db-txt instr txtr-edit" data-dbid="dialog_instr_2"></p>';
                html+='<p id="dialog_q_instr_2" class="db-txt instr txtr-edit js-isHidden" data-dbid="dialog_instr_3"></p>';
                html+='<div class="row col-xs-100 center-xs">';
                for (var i=1; i<=obj.qAlts; i++) {
                    var altTxtId = obj.id+"_alt_"+i; 
                    html+='<button class="btn-answer answer" aria-checked="false" data-altnr="'+i+'" data-value="'+altTxtId+'">'; 
                        //html+='<span class="outer-label h5">'+window.getText("gen_q")+i+'</span>';  
                        html+='<span class="label db-txt" data-dbid="'+altTxtId+'"></span>';     
                    html+='</button>'; 
                }
                html+='</div>';
            html+='</div>';
        return html;
    }

    //--------------------------------------------------
    //------------------CASE-----------------//
    function startCase($qWrapper) {
        $qWrapper.empty();
        hideMe($qWrapper);
        var qObj = allQs[qNr]; 
        
        $qWrapper.append(getCaseStart(qObj, qNr, nrOfQs));
        setCase($qWrapper.find('.qtype-wrapper'));
        updateText($qWrapper);
        addEditor($qWrapper);

        $qWrapper.find('.btn-start').click(function() {
            animateCSS($qWrapper.find('.survey-question'), "fadeOutUp", "", function() { 
                setCase($qWrapper.find('.survey-question')); 
            });      
        });

        function setCase($case) {
            $case.empty();
            hideMe($case);

            $case.append(getCase(qObj));

            $case.find('.btn-case').click(function() {
                $qWrapper.find(".case-desc").remove();
                $(this).addClass("selected").attr("disabled", true).attr("aria-checked", true);
                hideMe($case.find(".btn-case:not(.selected)"));
                var selectAltId = $(this).data("value");
                $(this).append(getCaseFeedback(selectAltId, qObj.id));
                updateText($case); 
                addEditor($case); 
                animateCSS($('#case-fb'), "fadeIn", "", function() {
                    $('#case-fb').attr("tabindex",-1).focus();
                });
                if (qNr+1<nrOfQs) {
                    showMe($('#btn-nextC'));
                    $('#btn-nextC').click(function() {
                        qNr++;
                        startCase($qWrapper)
                    });
                } else {
                    showMe($('#btn-endC'));
                    $('#btn-endC').click(function() {                        
                        startExercise(exId, $target, true);
                    });
                }
            });
            updateText($case);        
            showMe($case);
            addEditor($case);   
            $qWrapper.find(".question-wrapper").attr("tabindex",-1).focus();

            animateCSS($case, "slideInUp", "", function() {                
                 $(window).scrollTo($qWrapper, 250, {axis:'y'});
                 $qWrapper.find(".question-wrapper").attr("tabindex",-1).focus();
            });
           
        }
                
        showMe($qWrapper); 
        animateCSS($qWrapper, "slideInUp", "");
    }

      //--------------------------------------------------

    

    function setResultAction(action, $target) {
        if (action=="feedback") {
            showFeedback($target);
        } else {
            //Return to menu
            
        }
    }  


    function showFeedback($target) {
       
        $target.empty();
        hideMe($target);

        $target.append(getFinalFeedback(exId));  
        $target.append(getSectionDone("exercise", "center-xs"));  

        var nextSectionID = "#"+$target.closest('section').next().attr("id");
        addScrollInstruction($target, nextSectionID, false);
    
        
        updateText($target);
        
        showMe($target);
        addEditor($target);   
        
        animateCSS($target, "slideInUp", "");
        
    }

    function setStartPage ($target, isDone) {
        $target.empty();
        hideMe($target);
    
        $target.append(getStartPage(exId, exObj.startimg, isDone));
        if (isDone) {
            var nextSectionID = "#"+$target.closest('section').next().attr("id");
			addScrollInstruction($target, nextSectionID, false);
        }

    
        $target.find('.btn-start').click(function() {
            if (exObj.type=="case") {
                startCase($target);
            } else if (exObj.type=="dialog") {
                startDialog($target);
            } else {
                setQuestion($target, false);
            }
        });
        
        showMe($target);
        updateText($target); 

        addEditor($target);
        
        var w = $target.find('.container').offset().left;
        $target.find('.anim-block').width(w);
            
        var tl = new TimelineMax();
        tl.staggerFrom($target.find('.stagger-anim'), 1, {x:'-100vw', opacity:0, ease:"Power2.easeOut"}, 0.25);
        tl.add(TweenMax.from($target.find('.moveinright'), 1, {x:'100vw', opacity:0, ease:"Power2.easeOut"}), 0.25);
           
        var controller = new ScrollMagic.Controller();
        var offset = $(window).height()/2;
        new ScrollMagic.Scene({triggerElement: "#startpage-"+exId, tweenChanges: false, reverse:false, offset:-offset})
                        .setTween(tl)
						.addTo(controller);  

            
         $(window).resize(function () {
                var w = $target.find('.container').offset().left;
                $target.find('.anim-block').width(w);
        });
    }
}

var selectedSocialAlt;
function setSocialQuestion(id, selectedAlt) {
    //console.log(id, selectedAlt);    
    selectedSocialAlt = selectedAlt;  
    var addonUrl = "?questionId="+id;
    //GET CURRENT ANSWERS
    connectToDB("/Elearning/GetQuestionByQUestionId"+addonUrl, "GET", updateQuestionDataCallback, {}, "text");

    //SEND ANSWER
    addonUrl += "&answer="+selectedAlt;
    connectToDB("/Elearning/UpdateQuestion"+addonUrl, "POST", noCallback, {}, "text");
}

function setSingleRespons(obj) {    
    animateCSS($('.answer-wrapper'), "fadeInFast", "", function() {
        var userRespons = getUserRespons(obj);
        $.each(userRespons, function(i, prop) {
            $('#'+i+'_respons').find(".respons-fill").width(prop+"%");
            $('#'+i+'_respons').find(".respons-output").text(prop+"%");
        });
    }); 
}



function getUserRespons(obj) {
    var total=0, altValues = {}; 

    $.each(obj.userAnswers, function(i, altObj) {
        //console.log(i, altObj);
        for (var key in altObj) {
            total+=altObj[key];
            altValues[key] = altObj[key];
        }       
    });
    if(selectedSocialAlt) {
        total++;
        if (altValues[selectedSocialAlt]) {
            altValues[selectedSocialAlt]++;
        } else {
            altValues[selectedSocialAlt]=1;
        }
    }    

    $.each(altValues, function(i, prop) {
        altValues[i] = parseInt((prop/total)*100);      
    });

    altValues.total = total;
    selectedSocialAlt = undefined;
    //console.log(altValues);

    return altValues;
    
}

//-------------------------------------------------
//----------***HTML SETUPS***----------------
//-------------------------------------------------

//KURS.HTML

function getCourseOverview() {
    
    var html="";
            html+='<div class="about-wrapper closed"></div>';
            html+='<div class="container maxW">';
                html+='<div class="col col-xs-100 m-t-3">';
                    html+='<h2 class="strong db-txt txtr-edit" data-dbid="course_h2"></h2>';
                    html+='<div class="row col-xs-100 center-xs between-sm middle-xs m-b-4">';
                        html+='<div class="course-progress"><div class="progress-fill" role="progressbar"></div></div>';
                        html+='<button id="btn-diplom" disabled js-isHidden class="default db-txt" data-dbid="btn_diplom"></button>';

                        html+='<button id="btn-start" class="default btn-lesson db-txt" data-iframe="" data-dbid="btn_start" aria-label="" ></button>';

                    html+='</div>';
                    html+='<div id="lessons-wrapper" class="col col-xs-100">';
                        html+='<h3 class="db-txt m-t-0 txtr-edit" data-dbid="course_h3"></h3>';
                        html+='<div id="lesson-nr" class="col col-xs-100 small"></div>';
                        html+='<div class="all-lessons-list col col-xs-100 m-t-2"></div>';
                    html+='</div>';
                html+='</div>';
            html+='</div>';
    return html;
}
function getFDOverview() {
    var html="";           
            html+='<div class="container maxW">';
                html+='<div class="col col-xs-100 m-t-3">';                
                    html+='<div id="fd-wrapper" class="row col-xs-100 center-xs"></div>';
                html+='</div>';
            html+='</div>';
    return html;
}
function getFD(obj) {
    var html ="";
        html+='<div class="fd-item">';
            html+='<h2 class="h3 strong db-txt txtr-edit" data-dbid="'+obj.id+'"></h2>';
            html+='<p class="db-txt small txtr-edit" data-dbid="'+obj.id+'_desc"></p>';
            var disabled="";
            if (!obj.available) {
                disabled=" disabled"
            }
            html+='<button id="'+obj.id+'" class="default btn-lesson db-txt" data-dbid="btn_open"'+disabled+' data-iframe="'+obj.url+'"></button>';
        html+='</div>';
    return html;
}
function getUUALink() {
    var html ="";
        html+='<div class="fd-item">';
            html+='<h2 class="h3 strong db-txt txtr-edit" data-dbid="uua_h"></h2>';
            html+='<a href="https://www.uua.se/" target="_blank" class="button default  db-txt m-t-1" data-dbid="btn_uua"></button>';
        html+='</div>';
    return html;
}
function getAboutSection(course) {
    var html="";
        html+='<div class="container maxW">';
            html+='<h2 class="strong nomargin">';
                html+='<span id="accordion-title" class="db-txt" data-dbid="about_h2"></span>';
                html+='<button aria-expanded="false" class="accordion-trigger" aria-controls="about" id="btn-about">';    
                    html+='<span class="read-more db-txt" data-dbid="btn_readmore"></span>';
                    html+='<span class="read-less db-txt" data-dbid="btn_readless"></span>';                          
                    html+='<span class="indicator"></span>';
                html+='</button>';
            html+='</h2>';
   
            html+='<div id="about" role="region" aria-labelledby="accordion-title" class="accordion-panel">';
                html+='<div class="row col-xs-100 top-xs between-sm m-t-3">';
                    html+='<div class="col col-xs-100 col-sm-65 mob-margin">';
                        html+='<h3 class="nomargin db-txt txtr-edit" data-dbid="about_h3_1"></h3>';
                        html+='<div class="col col-xs-100 small m-b-2 db-txt txtr-textbox" data-dbid="about_'+course+'_p_1"> </div>'; 
                        html+='<h3 class="nomargin db-txt txtr-edit" data-dbid="about_h3_2"></h3>';
                        html+='<div class="col col-xs-100 small m-b-2 db-txt txtr-textbox" data-dbid="about_'+course+'_p_2"> </div>'; 
                    html+='</div>';
                    html+='<div class="row col-xs-100 col-sm-30 between-xs">';
                        html+='<div class="about-circle">';
                            html+='<div class="inner-circle col col-xs-100 middle-xs">';
                                html+='<span class="about-icon"></span>';
                                html+='<span class="h6 xsmall db-txt" data-dbid="about_span_1"></span>';
                                html+='<span class="h4 medium nomargin db-txt" data-dbid="about_span_2"></span>';
                            html+='</div>';
                        html+='</div>';
                        html+='<div class="about-circle">';
                            html+='<div class="inner-circle col col-xs-100 middle-xs">';
                                html+='<span class="about-icon"></span>';
                                html+='<span class="h6 xsmall db-txt" data-dbid="about_span_3"></span>';
                                html+='<span class="h4 medium nomargin db-txt" data-dbid="about_'+course+'_p_3"></span>';
                            html+='</div>';
                        html+='</div>';
                    html+='</div>';
                html+='</div>';        
            html+='</div>';
        html+='</div>';

    return html;
}
function getLessonRow(nr, obj) {
    var html ="";
        html+='<div class="lesson-row row col-xs-100 top-xs between-sm">';
            var alt=window.getText("gen_lesson")+nr;
            if (obj.isCompleted) {                
                html+='<div class="theme-circle h4 circle-shade strong done"><img src="img/icon-check.svg" alt="'+alt+'"/></div>';
                html+='<p class="strong status db-txt" data-dbid="gen_done">'+window.getText("gen_done")+'</p>';
            } else {
                html+='<p class="offstage">'+window.getText("gen_lesson")+'</p>';
                html+='<div class="theme-circle h4 circle-shade strong">'+nr+'</div>';
                html+='<p class="strong status">'+obj.time+'<span class="db-txt" data-dbid="gen_time">'+window.getText("gen_time")+'</span></p>';
            }            
            
            html+='<h4 class="p db-txt col-xs-100 col-sm-40 col-md-50" data-dbid="'+obj.id+'">'+window.getText(obj.id)+'</h4>';
            var disabled="";
            if (!obj.available) {
                disabled=" disabled"
            }
            
            var aria=window.getText("btn_open")+" "+window.getText("gen_lesson")+nr;

            html+='<button id="'+obj.id+'" class="default btn-lesson"'+disabled+' data-iframe="'+obj.url+'" aria-label="'+aria+'"><span class="db-txt" data-dbid="gen_lesson">'+window.getText("gen_lesson")+'</span>'+nr+'</button>';
        html+='</div>';
    return html;
}
function getCourseHeader(obj) {
    
    var courseNr = obj.course[obj.course.length-1];    
    var html="";
        html+='<div class="container maxW">';
            html+='<div class="row col-xs-100 center-xs">';
                html+='<div class="col col-xs-100 col-md-80 middle-xs">';
                    html+='<p class="h5 light m-b-0"><span class="db-txt" data-dbid="gen_course"></span>'+courseNr+'</p>';
                    html+='<h1 class="strong db-txt" data-dbid="'+courseID+'"></h1>';                                      
                html+='</div>';
            html+='</div>';
        html+='</div>';
    return html;
}
function getCourseBtn(obj) {
    var url = 'kurs.html?c='+obj.id;   
    var courseNr = obj.id[obj.id.length-1];
    //console.log(courseNr);
    var html="";
        html+='<a href="'+url+'" class="btn-course">';
            html+='<div class="course-circle">';
                html+='<div class="inner-circle col col-xs-100 middle-xs">';
                    html+='<img src="img/nr-'+obj.id+'.png" alt=""/>';
                    html+='<span class="h6 xsmall uc db-txt" data-dbid="'+obj.id+'_type"></span>';
                    html+='<span class="h4 strong nomargin db-txt" data-dbid="'+obj.id+'"></span>';
                    var status = getCourseProgress(obj.id);
                    var perc = (status.nrOfDone/status.total);
                    if (perc==1) {
                        //DONE
                        html+='<p class="small db-txt m-t-1 m-b-0" data-dbid="gen_done"></p>';
                    } else if (perc>0) {
                        //Has started
                        html+='<p class="small db-txt m-t-1 m-b-0" data-dbid="gen_hasstarted"></p>';
                    } else {
                        html+='<p class="small db-txt m-t-1 m-b-0" data-dbid="about_'+obj.id+'_p_3"></p>';
                    }
                    
                html+='</div>';
            html+='</div>';
            html+='<div class="button default"><span class="db-txt m-r" data-dbid="btn_course"></span>'+courseNr+'</div>';
        html+='</a>';
    return html;
}
function getEpostExist(epost) {
    var html="";
        html+='<div id="followup" class="col col-xs-100 middle-xs text-center ">';
            html+='<h2 class="h3 strong db-txt txtr-edit m-t-2" data-dbid="register_form_h_2"></h2>';
            var epostTxt = window.getText("register_form_p_2");
            epostTxt = epostTxt.replace("[X]", '<em>'+epost+'</em>');
            html+='<div class="col col-xs-100 col-sm-80 m-t-2">'+epostTxt+'</div>';

            html+='<div class="row btn-row col-xs-100 center-xs m-t-4 m-b-1">';
                html+='<button id="btn-restart" class="default db-txt" data-dbid="btn_restart"></button>';
                html+='<button id="btn-reload" class="default db-txt" data-dbid="btn_reload"></button>';
            html+='</div>';
            html+='<button id="btn-back" class="link db-txt m-b-4" data-dbid="btn_backtoregister"></button>';
        html+='</div>';
    return html;
}
function getResetUser(epost) {
    var html="";
        html+='<div id="followup" class="col col-xs-100 middle-xs text-center ">';
            html+='<h2 class="h3 strong db-txt txtr-edit m-t-2" data-dbid="register_form_h_3"></h2>';
            var epostTxt = window.getText("register_form_p_3");
            epostTxt = epostTxt.replace("[X]", '<em>'+epost+'</em>');
            html+='<div class="col col-xs-100 col-sm-80 m-t-2">'+epostTxt+'</div>';

            html+='<div class="row btn-row col-xs-100 center-xs m-t-4 m-b-4">';
                html+='<button id="btn-yes" class="default db-txt" data-dbid="btn_erase"></button>';
                html+='<button id="btn-reload" class="default db-txt" data-dbid="btn_noreload"></button>';
            html+='</div>';
        html+='</div>';
    return html;
}
function getStartPage(id, img, isDone) {

    var html="";
        //html+='<div class="exercise-start">';        
        html+='<div class="container inner">';
                html+='<div id="startpage-'+id+'" class="anim-block stagger-anim"></div>';
                html+='<div class="row col-xs-100 fullH center-xs middle-xs">';
                    html+='<div class="row col-xs-100 center-xs between-sm middle-sm">';
                        html+='<div class="row col-xs-100 col-sm-30 end-xs center-sm mob-margin-S stagger-anim">';
                            html+='<img class="col-xs-50 col-sm-100" aria-hidden="true" src="img/'+img+'" alt=""/>';
                        html+='</div>';                       
                        html+='<div class="col col-xs-100 col-sm-65 top-xs moveinright">';
                            html+='<h2 class="strong db-txt txtr-edit" data-dbid="'+id+'_h"></h2>';
                            html+='<div class="col col-xs-100 db-txt txtr-textbox" data-dbid="'+id+'_p"> </div>';   
                                      
                            if (isDone) {
                                html+='<button class="btn-start default db-txt m-t-1" data-dbid="btn_restartCase"></button>'; 
                                html+='<div class="section-done-row m-t-1 row col-xs-100 middle-xs">';
                                    html+='<div class="theme-circle h4 circle-shade strong done"><img src="img/icon-check.svg" alt="Check"/></div>';
                                    html+='<p class="strong italic small db-txt" data-dbid="gen_done_exercise">'+window.getText("gen_done_exercise")+'</p>';
                                html+='</div>';
                            } else {
                                html+='<button class="btn-start default db-txt m-t-2" data-dbid="btn_startCase"></button>';   
                            }
                        html+='</div>';
                    html+='</div>';
                html+='</div>';
            html+='</div>'; 
        //html+='</div>'; 
    return html;
}
function getDialogStart(name, img, hid) {

    var html="";
        html+='<div class="container outer">';
            html+='<div class="dialog-wrapper">';
            html+='<h2 class="strong text-center db-txt txtr-edit" data-dbid="'+hid+'_h"></h2>';
            html+='<p class="db-txt instr txtr-edit" data-dbid="'+hid+'_instr"></p>';
                    html+='<div class="dialog-header row col-xs-100">';
                        html+='<img class="dialog-img" src="img/'+img+'" alt="" aria-hidden="true"/>';
                        html+='<div class="col dialog-title">';
                            html+='<p class="large strong db-txt" data-dbid="'+name+'"></p>';                            
                        html+='</div>';
                    html+='</div>';
                    html+='<div class="dialog-container"></div>';
                    html+='<div class="dialog-questions col col-xs-100 middle-xs"></div>'; 
               
            html+='</div>';
        html+='</div>';
    return html;
}
function getCaseStart(obj, qNr, nrOfQs) {
    var html="";
        html+='<div class="survey-question">';
            html+='<div class="container inner">';
                html+='<div class="question-wrapper col col-xs-100 middle-xs between-xs">';  
                    html+='<div class="persp-icon small circle-shade"></div>';
                    var progressTxt = (qNr+1)+' '+window.getText("gen_of")+' '+(nrOfQs);
                    html+='<div class="progress h3">'+progressTxt+'</div>';
                    html+='<h2 class="strong db-txt txtr-edit" data-dbid="'+obj.id+'_h"></h2>';
                    html+='<div class="case-desc col col-xs-100 db-txt max-width-p text-center txtr-textbox" data-dbid="'+obj.id+'_p"> </div>';   
                   // html+='<button class="btn-start default db-txt m-t-2" data-dbid="btn_go">'+window.getText("btn_go")+'</button>';                                 
                html+='</div>';                 
            html+='</div>';
            html+='<div class="content-part m-t-2">';
                html+='<div class="container outer">';	
                    html+='<div class="qtype-wrapper col col-xs-100 middle-xs"></div>'; 
                html+='</div>';
            html+='</div>';
        html+='</div>';
    return html;
}  
function getCaseFeedback(id, fbid) {
    var html="";
        html+='<div id="case-fb" class="col col-xs-100 middle-xs center-xs m-t-2">';
            html+='<h3 class="strong db-txt txtr-edit" data-dbid="'+id+'_fb_h"></h3>';
            html+='<div class="col col-xs-100 db-txt txtr-textbox p-medium max-width-inner" data-dbid="'+fbid+'_fb"> </div>';  
            html+='<button id="btn-nextC" class="js-isHidden default db-txt m-t-2" data-dbid="btn_nextC"></button>';  
            html+='<button id="btn-endC" class="js-isHidden default db-txt m-t-2" data-dbid="btn_endC"></button>';  
        html+='</div>';
    return html;
}
function getLastSection(id, img) {
    var html="";
        html+='<div class="last-img">';
            html+='<img class="db-alt" data-dbid="gen_photo_alt" src="img/'+img+'" alt=""/>';
        html+='</div>';
        html+='<div class="container inner">';
            html+='<div class="row col-xs-100 center-xs">';
                html+='<div class="col col-xs-100 col-sm-70 col-md-75 middle-xs col-xs-offset-30  col-sm-offset-20 col-md-offset-15">';
                    html+='<h2 class="h1 db-txt text-center strong txtr-edit nomargin" data-dbid="'+id+'_h"></h2>';
                    //html+='<div class="col col-xs-100 db-txt m-t-1 m-b-1 txtr-textbox" data-dbid="'+id+'_p"></div>';
                    html+='<button id="btn-closelesson" class="default close-resource db-txt m-t-2" data-dbid="btn_closelesson"></button>';
                html+='</div>';
            html+='</div>';                
        html+='</div>';

    return html;
}
function getVideoSection(id, videoid, img, type, pdf) {
    var html="";
        
        html+='<div class="container inner">';
        html+='<div id="video-'+id+'" class="anim-block stagger-anim"></div>';
            html+='<div class="row col-xs-100 fullH center-xs middle-xs">';
                html+='<div class="row col-xs-100 center-xs between-sm middle-sm">';
                    html+='<div class="row col-xs-100 col-sm-30 end-xs center-sm mob-margin-S stagger-anim">';
                        html+='<img class="col-xs-50 col-sm-100" src="img/'+img+'" alt=""/>';
                    html+='</div>';                       
                    html+='<div class="col col-xs-100 col-sm-65 top-xs video-start-content">';
                        html+='<h2 class="strong db-txt txtr-edit" data-dbid="'+id+'_h"></h2>';
                        html+='<div class="col col-xs-100 db-txt txtr-textbox" data-dbid="'+id+'_p"> </div>';     
                        if (pdf) {
                            /*html+='<a href="pdfs/'+window.lang+'/'+pdf+'" class="btn-transcript db-txt db-aria" target="_blank"  data-dbid="btn_transcript"  data-ariaid="btn_transcript_aria"> </a>'; */
                            html+='<a data-videotype="vimeo" data-videoid="'+videoid+'" data-pdf="'+pdf+'" href="#video" class="default button btn-video m-t-1 db-txt db-aria" data-dbid="btn_'+type+'" data-ariaid="aria_btn_video"> </a>';  
                        } else {
                            html+='<a data-videotype="vimeo" data-videoid="'+videoid+'" href="#video" class="default button btn-video m-t-1 db-txt db-aria" data-dbid="btn_'+type+'" data-ariaid="aria_btn_video"> </a>'; 
                        }
                        
                                       
                    html+='</div>';
                html+='</div>';
            html+='</div>';
        html+='</div>'; 

    return html;
}
function getGroupSection(id, url, showprincip) {
    var html="";
        
        html+='<div class="container inner">';
        html+='<div id="group-'+id+'" class="anim-block stagger-anim"></div>';
            html+='<div class="row col-xs-100 fullH center-xs middle-xs">';
                html+='<div class="row col-xs-100 center-xs between-sm middle-sm">';
                    html+='<div class="row col-xs-100 col-sm-30 end-xs center-sm mob-margin-S stagger-anim">';
                        html+='<img class="col-xs-50 col-sm-100" aria-hidden="true" src="img/icon-group.svg" alt=""/>';
                    html+='</div>';                       
                    html+='<div class="col col-xs-100 col-sm-65 top-xs">';
                        html+='<h2 class="strong db-txt txtr-edit" data-dbid="fd_group_h"></h2>';
                        html+='<div class="col col-xs-100 db-txt txtr-textbox" data-dbid="'+id+'_p"> </div>';   
                        html+='<div class="row col-xs-100 princip-btns">';
                            html+='<a href="pdfs/'+window.lang+"/"+url+'" target="_blank" class="default button m-t-1 db-txt db-aria" data-dbid="btn_pdf" data-ariaid="aria_btn_pdf"> </a>';  
                            if(showprincip) {
                                html+='<a href="pdfs/'+window.lang+'/sju-principer-for-universell-utformning.pdf" target="_blank" class="default button m-t-1 m-l-1 db-txt db-aria" data-dbid="btn_sjuprinciper" data-ariaid="aria_btn_pdf"> </a>'; 
                            }                                 
                        html+='</div>';           
                    html+='</div>';
                html+='</div>';
            html+='</div>';
        html+='</div>'; 

    return html;
}
function getCitatSection(id) {
    var html="";
        html+='<div class="container maxW citatbg fade-in-up">';
            html+='<div class="container inner">';
                html+='<div class="col col-xs-100 fullH middle-xs center-xs">';
                    html+='<blockquote class="db-txt txtr-edit" data-dbid="'+id+'_bq"></blockquote>';
                    if (window.getText(id+'_avs')!="-") {
                        html+='<div class="h3 strong text-center nomargin db-txt txtr-edit" data-dbid="'+id+'_avs"></div>';
                    }                       
                html+='</div>';
            html+='</div>';
        html+='</div>';
    return html;
}
function getReflection(id) {
    var html="";
        html+='<div id="reflect-q" class="container maxW">';
            html+='<div class="col col-xs-100 fullH middle-xs center-xs">';
                html+='<div class="persp-icon small circle-shade"></div>';
                html+='<div class="progress h3 db-txt txtr-edit" data-dbid="gen_reflect"></div>';           
                html+='<div class="h1 strong db-txt txtr-edit text-center" data-dbid="'+id+'_h"></div>'; 
                html+='<div class="col col-xs-100 max-width db-txt txtr-textbox" data-dbid="'+id+'_p"></div>';
            html+='</div>';
        html+='</div>';
    return html;
}
function getLessonStart(lessonid) {
    var lessonNr = lessonLookup[lessonid].order,
        course = lessonLookup[lessonid].course;
    var html="";
        html+='<div class="row col-xs-100 fullH">';
            html+='<div class="side-bar">';
                html+='<img src="img/bg-'+course+'-pattern.svg" alt="" aria-hidden="true"/>';
                html+='<div class="wht big-nr">'+lessonNr+'</div>';
            html+='</div>';
            html+='<div class="col col-xs-100 col-sm-60 center-xs">';
                html+='<div class="container">';
                    html+='<h1 id="h1id" class="h3 col-xs-65 col-md-70">';
                        html+='<span class="db-txt" data-dbid="gen_lesson"></span>'+lessonNr;
                        html+='<span class="db-txt h2 main-title strong" data-dbid="'+lessonid+'"></span>';
                    html+='</h1>';
                    html+='<div class="col col-xs-100 col-md-80 db-txt txtr-textbox" data-dbid="'+lessonid+'_p_1"></div>';
                html+='</div>';
            html+='</div>';
        html+='</div>';
    return html;
}
function getFDStart(lessonid) {
    var lessonNr = lessonLookup[lessonid].order,
        course = lessonLookup[lessonid].course;
    var html="";
        html+='<div class="row col-xs-100 start-xs between-sm fullH reverse-sm">';
            html+='<div class="col col-xs-100 col-sm-44 center-xs middle-xs">';
                html+='<img class="col-xs-50 col-sm-80 db-alt" data-dbid="gen_photo_alt" src="img/fd-'+lessonNr+'.svg" alt=""/>';
            html+='</div>';            
            html+='<div class="col col-xs-100 col-sm-55 center-sm">';
                html+='<div class="container">';
                    html+='<h1 id="h1id" class="h3 col-xs-100 col-md-80">';
                        html+='<span class="db-txt" data-dbid="gen_fd"></span>'+lessonNr;
                        html+='<span class="db-txt h2 main-title strong" data-dbid="'+lessonid+'"></span>';
                    html+='</h1>';
                    html+='<div class="col col-xs-100 col-md-80 db-txt txtr-textbox" data-dbid="'+lessonid+'_p_1"></div>';
                html+='</div>';
            html+='</div>';
        html+='</div>';
    return html;
}
function getList(id, nr) {
    var html="";
        html+='<div class="col col-xs-100">';
            html+='<div class="container outer">';
                html+='<h3 class="db-txt strong txtr-edit" data-dbid="'+id+'_h"></h3>';
                html+='<ol class="nr-list col-xs-100">';
                    for (var i=1; i<=nr; i++) {
                        html+='<li><span class="nr-circle theme-fill">'+i+'</span><span class="db-txt txtr-edit" data-dbid="'+id+'_li_'+i+'"></span></li>'; 
                    }                                                            
                html+='</ol>';
            html+='</div>';   
       html+='</div>';   
    return html;    
}
function getFinalFeedback(id) {
    var courseID = id.split("_")[0];
    var html="";
    html+='<div class="survey-result">';            
                html+='<div class="container inner">';				
                    html+='<div class="question-wrapper col col-xs-100 middle-xs between-xs">';
                        html+='<div class="persp-icon small circle-shade"></div>';
                        html+='<h3 class="h4 db-txt txtr-edit" data-dbid="gen_fb"></h3>'; 
                        html+='<h4 class="h1 text-center strong nomargin db-txt txtr-edit" data-dbid="'+id+'"></h4>';         
                        html+='<div class="col col-xs-100 db-txt m-t-1 txtr-textbox" data-dbid="'+id+'_fb"></div>';                                          
                    html+='</div>';    
                html+='</div>';            
        html+='</div>';
    html+='</div>';
    return html;
}
function getSerieResult(id) {
    var courseID = id.split("_")[0];
    var html="";
    html+='<div class="survey-result">';
           //html+=' <div class="top-part question">';             
                html+='<div class="container inner">	';				
                    html+='<div class="question-wrapper col col-xs-100 middle-xs between-xs">';
                        html+='<div class="persp-icon small circle-shade"></div>';
                        html+='<h3 class="h4 db-txt txtr-edit" data-dbid="gen_fb"></h3>'; 
                        html+='<h4 class="h1 text-center strong nomargin db-txt txtr-edit" data-dbid="'+id+'"></h4>';         
                        html+='<div class="col col-xs-100 db-txt m-t-1 txtr-textbox" data-dbid="'+id+'_fb"></div>';                                          
                    html+='</div>';    
                html+='</div>';
            //html+='</div>';
        html+='</div>';
    html+='</div>';
    return html;
}
function getSectionDone(txtrid, position) {
    html="";
        html+='<div class="section-done-row m-t-2 m-b-2 row col-xs-100 '+position+' middle-xs">';
            html+='<div class="theme-circle h4 circle-shade strong done"><img src="img/icon-check.svg" alt="Check"/></div>';
            html+='<p class="strong italic small db-txt" data-dbid="gen_done_'+txtrid+'">'+window.getText("gen_done_"+txtrid)+'</p>';
        html+='</div>';
    return html;
}
function getScroll(anchor, hasdelay) {
    var scrollClass="page-scroll-down";
    if (hasdelay) {
        scrollClass+=" delay";
    }
    html="";
        html+='<div class="'+scrollClass+'">';
            html+='<a href="'+anchor+'" class="anchor db-aria col center-xs middle-xs" aria-label="gen_scroll_label">';
                html+='<span class="strong italic small db-txt" data-dbid="gen_scroll"></span>';
                html+='<div class="theme-circle circle-shade strong"><img src="img/icon-down.svg" alt=""/></div>';  
            html+='</a>';          
        html+='</div>';
    return html;
}

//-------------------------------------------------
//QUESTION TYPES
function getSingleQuestion(obj, qNr, nrOfQs) {
    //console.log(obj);
    var html="";
    html+='<div class="survey-question">';
           html+=' <div class="top-part question q-'+qNr+'">';             
                html+='<div class="container">	';				
                    html+='<div class="question-wrapper col col-xs-100 middle-xs between-xs">';                        
                        html+='<div class="persp-icon small circle-shade"></div>';
                        if (obj.typetext) {
                            html+='<div class="progress h3 db-txt" data-dbid="'+obj.typetext+'"></div>';
                        } else {
                            var progressTxt = (qNr+1)+' '+window.getText("gen_of")+' '+(nrOfQs);
                            html+='<div class="progress h3">'+progressTxt+'</div>';
                        }
                        
                        html+='<div class="q h1 strong db-txt txtr-edit" data-dbid="'+obj.id+'">'+window.getText(obj.id)+'</div>'; 

                        var instr = obj.qType+"_instr";
                        if (obj.qType=="single-respons") {
                            instr="respons_instr";
                        }

                        html+='<p class="db-txt instr txtr-edit" data-dbid="'+instr+'">'+window.getText(instr)+'</p>';
                    html+='</div>';    
                html+='</div>';
            html+='</div>';
            html+='<div class="content-part q-'+qNr+'">';
                html+='<div class="container">';	
                    html+='<div class="qtype-wrapper col col-xs-100 middle-xs"></div>'; 
                html+='</div>';
            html+='</div>';
        html+='</div>';
    html+='</div>';
    return html;
}
function getSerieQuestion(exId, qNr, nrOfQs) {
    var html="";
    html+='<div class="survey-question">';
           html+=' <div class="top-part question">';             
                html+='<div class="container">	';				
                    html+='<div class="question-wrapper col col-xs-100 middle-xs between-xs">';                        
                        html+='<div class="persp-icon small circle-shade"></div>';
                        var progressTxt = '1 '+window.getText("gen_of")+' '+(nrOfQs);
                        html+='<div class="progress h3">'+progressTxt+'</div>';

                        html+='<div class="q h1 strong db-txt txtr-edit" data-dbid="'+exId+'"></div>'; 
                        html+='<p class="db-txt txtr-edit instr" data-dbid="'+exId+'_instr"></p>';
                    html+='</div>';    
                html+='</div>';
            html+='</div>';
            html+='<div class="content-part">';
                html+='<div class="container">';	
                    html+='<div class="qtype-wrapper col col-xs-100 middle-xs"></div>'; 
                html+='</div>';
            html+='</div>';
        html+='</div>';
    html+='</div>';
    return html;
}
function getCase(obj) {
    var html="";
        html+='<div class="container maxW">';	
            html+='<div class="answer-wrapper case row fluid col-xs-100 around-sm center-xs" role="radiogroup">';
            for (var i=0; i<obj.qAlts; i++) { 
                var altTxtId = obj.id+"_alt_"+(i+1); 
                //html+='<div class="col case-col">';
                    
                    html+='<button class="btn-case radio-'+(i+1)+'" role="radio" aria-checked="false" data-altnr="'+(i+1)+'" data-value="'+altTxtId+'" data-qid="'+obj.id+'">';

                        html+='<div class="row col-xs-100 center-xs">';
                        if (obj.useimg) {    
                                html+='<img class="col-xs-80 case-img" src="img/'+altTxtId+'.svg" aria-hidden="true">';
                        }        
                            html+='<div class="persp-icon small circle-shade">';
                                if (obj.correct==(i+1)) {
                                    html+='<img src="img/icon-correct.svg" alt=""/>';
                                } else {
                                    html+='<img src="img/icon-wrong.svg" alt=""/>';
                                }
                            html+='</div>';
                        html+='</div>';

                        html+='<span class="button answer label db-txt" data-dbid="'+altTxtId+'"></span>';  
                        if (obj.hasdesc) {    
                            html+='<span class="p p-medium desc text-center db-txt txtr-edit" data-dbid="'+altTxtId+'_desc"></span>';
                        }
                    html+='</button>';   
                //html+='</div>';
            }
            html+='</div>';
        html+='</div>';
    return html;
}
function getRadio(obj, nr, max) {
    var html="";

    if (obj.correct || obj.qType=="single-respons") {
        html+='<div class="answer-wrapper radio col fluid col-xs-100 middle-xs start-sm" role="radiogroup">';
    } else {
        html+='<div class="answer-wrapper radio row fluid col-xs-100 middle-xs start-sm" role="radiogroup">';
    }       
    
    for (var i=0; i<obj.qAlts; i++) { 
        var altTxtId = obj.id+"_alt_"+(i+1);   
        if (obj.qAltId) {
            altTxtId = obj.qAltId+"_alt_"+(i+1); 
        }
        
        var altTxt = window.getText(altTxtId);  
        
           html+='<button class="btn-answer answer radio-'+(i+1)+'" role="radio" aria-checked="false" data-altnr="'+(i+1)+'" data-value="'+altTxtId+'" data-qid="'+obj.id+'">'; 
           if (obj.correct) {
               if (obj.correct.indexOf((i+1))<0) {
                    html+='<span class="persp-icon small circle-shade"><img src="img/icon-wrong.svg" alt=""/></span>';                
                } else {
                    html+='<span class="persp-icon small circle-shade"><img src="img/icon-correct.svg" alt=""/></span>';
                }
           }        
            html+='<span class="label db-txt" data-dbid="'+altTxtId+'">'+altTxt+'</span>';     
        html+='</button>'; 
    }                          
    html+='</div>';
    if (obj.correct) {
        html+='<div class="fb-wrapper max-width-p col col-xs-100 middle-xs end-xs">';
            html+='<p id="fb-status"></p>';
            if (max>1) {
                html+='<div class="row col-xs-100 center-xs m-t-1">';
                if (nr+1==max) {
                    html+='<button class="default btn-nextQ db-txt js-isHidden" data-dbid="btn_tofb" disabled></button>';
                } else {
                    html+='<button class="default btn-nextQ db-txt" disabled data-dbid="btn_nextQ">'+window.getText("btn_nextQ")+'</button>';
                }
                html+='</div>';
            }  
                    
        html+='</div>';    
        
    } 
                 
    return html;
}
function getMultipleChoice(obj, nr, max) {
    var html="";
    var wrapperclass="";
    if (obj.correct) {
        wrapperclass = "mustsubmit";
    }
    if (obj.qAlts<4) {
        wrapperclass+=" col";
    } else {
        wrapperclass+=" row";         
    }

    html+='<div class="answer-wrapper multiple '+wrapperclass+' fluid col-xs-100 center-xs between-sm middle-xs start-sm max-width" role="group">';

    for (var i=0; i<obj.qAlts; i++) {    
        var altTxtId = obj.id+"_alt_"+(i+1); 
        if (obj.qAltId) {
            altTxtId = obj.qAltId+"_alt_"+(i+1); 
        }
        var altTxt = window.getText(altTxtId);  
        
        html+='<button class="btn-checkbox checkbox-'+(i+1)+'" role="checkbox" aria-checked="false" data-altnr="'+(i+1)+'" data-value="'+altTxtId+'" data-qid="'+obj.id+'">'; 
        html+='<span class="check"></span>';
        html+='<span class="label db-txt" data-dbid="'+altTxtId+'">'+altTxt+'</span>';     
        html+='</button>'; 
    }                          
    html+='</div>';  
    html+='<div class="row col-xs-100 center-xs">';
        html+='<button class="default btn-submitQ db-txt js-isHidden" data-dbid="btn_submitQ" disabled></button>';
        if (nr+1==max) {
            html+='<button class="default btn-nextQ db-txt js-isHidden" data-dbid="btn_tofb" disabled></button>';
        } else {
            html+='<button class="default btn-nextQ db-txt js-isHidden" data-dbid="btn_nextQ" disabled></button>';
        }
        
    html+='</div>'; 
    return html;
}
function getRespons(obj, exId) {
    var html="";
    html+='<div class="answer-wrapper col col-xs-100 middle-xs start-sm">';
        //html+='<p class="large db-txt" data-dbid="gen_others">'+window.getText("gen_others")+'</p>';
 
        //obj.userAnswers = [{"qFys_1_alt_1":8}, {"qFys_1_alt_2":4}];
        
        for (var i=0; i<obj.qAlts; i++) { 
            var altTxtId = obj.id+"_alt_"+(i+1);
            var altTxt = window.getText(altTxtId); 
            var statusClass="";
            if (altTxtId==obj.valueSelected) {
                statusClass = "selected";
            }            
            html+='<div id="'+altTxtId+'_respons" class="answer-respons '+statusClass+'">'; 
                html+='<span class="respons-output h6 strong">0%</span>';
                html+='<span class="respons-fill"></span>';
                html+='<span class="label db-txt" data-dbid="'+altTxtId+'">'+altTxt+'</span>'; 
            html+='</div>';
        };
        html+='<div class="col col-xs-100 large max-width m-t-1 db-txt txtr-edit" data-dbid="'+exId+'_fb">'+window.getText(exId+"_fb")+'</div>';
        //html+='<button class="default btn-nextQ db-txt" data-dbid="btn_goon">'+window.getText("btn_goon")+'</button>';
    html+='</div>';               
    return html;
}


(function ($) {
	"use strict";
	
	


	
})(jQuery);
