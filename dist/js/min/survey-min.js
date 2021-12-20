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
var $surveyWrapper, $startWrapper, surveyObj, nrOfQs = 3, qNr, perspId, perspLookup, questionLookup, menuAnim, animDone;

var localStorageDuration = 1000 * 60 * 60 * 24; // 24 hours

function setupUserData(obj) {

    setupSurveyObj(obj);

    if (obj.userdata.id!=null) {
        //Save user to Local Storage with timestamp
        var lsObj = {userid:obj.userdata.id, timestamp: new Date().getTime()}
        localStorage.setItem('_uuaUserObj', JSON.stringify(lsObj));
    }

    if (pageId=="index") {
        createSurvey(obj, $('#start-survey-wrapper')); 
    } else if (pageId=="grupp") {
        createGroupForm();
    }

    if (isGroupDone("about")) {
        showMe($('#olduser'));
    } else {
        showMe($('#newuser'));
    }

}
//SORT SURVEY DATA
function setupSurveyObj(obj) {
    surveyObj = obj;

    var allQuestions = surveyObj.questions;
	perspLookup = {};
    questionLookup = {};
	for (i = 0, len = allQuestions.length; i < allQuestions.length; i++) {  
        if (!perspLookup[allQuestions[i].qGroup]) {
            perspLookup[allQuestions[i].qGroup] = [];
        }
        perspLookup[allQuestions[i].qGroup].push(allQuestions[i].id);
		questionLookup[allQuestions[i].id] = allQuestions[i];	
    }

    storeValue(surveyObj, false);
    console.log("perspLookup", perspLookup);
    console.log("questionLookup", questionLookup);    
}

//SETUP REGISTER GROUP PAGE
function createGroupForm() {
    var $form = $('.form-register');
    $form.find('input').on('keyup', function(e){
        $(this).addClass('edited');
        $('.btn-submit').attr("disabled", false);
    });
    
    $form.find('[type="submit"]').on('click.formValidation', function(e){
        e.preventDefault();
        shouldPrevent = false;
        errorList = [];
        
        $inputs = $form.find('input[required]');
    
        $inputs.each(function(index, input){
          errorMessageSelector = 'label[for="' + $(input).attr('id') + '"] .error-message';
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
            surveyObj.userdata.epost = $('input#email').val();
            sessionStorage.setItem(sessionId, JSON.stringify(surveyObj));
            var saveObj = {"survey":surveyObj}; 
            connectToDB("/Survey/UpdateUserAsync", "POST", updateUserEpostCallback, saveObj, "text");
        }

    });
    $('button.btn-copy').click(function() {

        var target = $(this).data("target");
        var copyText = document.getElementById(target);
        copyText.select();
        copyText.setSelectionRange(0, 99999);

         navigator.clipboard.writeText(copyText.value);
    });
    $('button.btn-step-2').click(function() {
        $(this).hide();
        hideMe($('.link-desc'));
        showMe($('#step-3'));
    });
}

function createRegisterForm() {
    var $form = $('.form-register');
    var hasAccepted = false;

    $('#accept').on('change', function() {
        hasAccepted = this.checked;
        console.log(hasAccepted);
   });
   $('#accept').click(function() {
        hasAccepted = this.checked;
        checkIfReady();  
   });
   $('#accept').on('keyup', function(e){
       console.log(e.keyCode);
        if (e.keyCode === 13         ) {
            $(this).trigger('click');           
        }
    });
    $form.find('input.text-input').on('keyup', function(e){
        console.log("KEY");
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
            surveyObj.userdata.epost = $('input#email').val();
            surveyObj.userdata.name = $('input#name').val();
            sessionStorage.setItem(sessionId, JSON.stringify(surveyObj));
            var saveObj = {"survey":surveyObj}; 
            //connectToDB("/Survey/SendResultToUUAAsync", "POST", updateUserEpostCallback, saveObj, "text");
        }

    });
}

function createOrganisation() {
    console.log(createOrganisation, url)
    var url='/Survey/CreateGroupAsync?userId='+surveyObj.userdata.id+'&groupName='+$('input#group-name').val();
    connectToDB(url, "POST", createGroupCallback, {}, "text");
    
    
}

function showGroupLinks(obj) {
    hideMe($('.form-wrapper'));
    $('#user-epost').text(surveyObj.userdata.epost);
    var grouplink = dbUrl+"?id="+obj.id;
    $('#group-link').val(grouplink);
    var resultlink = dbUrl+"?id="+obj.id;
    $('#result-link').val(resultlink);
    $('#btn-group-link').attr("href", grouplink);
    showMe($('.output-wrapper'));
}


//CREATE NEW SURVEY
function createSurvey(obj, $target) {    

    console.log("createSurvey");
    
    $surveyWrapper = $target;
    $startWrapper = $('#start-wrapper');
    
    getOrgStatus();

    $('button.btn_survey').click(function() { 
        startSurveyGroup( $(this).data("persp"));
    });

    $('button.btn_restart').click(function() {
        newUser();
    });

    $('button.btn_overview').click(function() {
        initOverview();
    });

    $('.meny-item')
        .mouseover(function() {
            if (animDone) {
                TweenMax.to($(this), 0.5, {scale:1.2});
            }
        })
        .mouseleave(function() {
            if (animDone) {
                TweenMax.to($(this), 0.5, {scale:1});
            }
        })
        .click(function() {
            TweenMax.to($(this), 0.5, {scale:1}); 
            if (animDone) {
                animDone = false;
                $('.meny-item').addClass("ismoving");  
                perspId = $(this).data("persp");              
                menuAnim.timeScale(2);
                menuAnim.reverse(); 
            }                              
    });

    $('#btn-result').click(function() {
        var $surveyPopup = $('.survey-content');
        showUserResult ($surveyPopup);
        qNr = -1;
        openSurveyPopup();
    });

    var $btnCloseSurvey = $('button.close-survey');
		$btnCloseSurvey.click(closeSurveyPopup);
		$btnCloseSurvey.focusout(function() {
			$(this).closest('.survey-content').attr("tabindex",-1).focus();
		});

        

    //initOverview();
    //$('main').append('<div id="dot-nav"></div>');
    //setupDotNav();
    //updateDotNav(0);
    //getPagePosition();
}

function startSurveyGroup(persp) {
    perspId =persp; 
    console.log(perspId);
    qNr = 0;    
    setQuestion($surveyWrapper, false);      
    animateCSS($startWrapper, "fadeOut", "", function() {
        $startWrapper.addClass("js-isHidden");
        $surveyWrapper.removeClass("js-isHidden");  
        animateCSS($surveyWrapper, "fadeInUp", "");
    });
}

function isGroupDone(group) {
    var isDone = false;
    var total = 0;
    $.each(perspLookup[group], function(i, id) {
        if (questionLookup[id].valueSelected!="") {
            total++;
        }
    });
    if (total==perspLookup[group].length) {
        isDone = true;
    }
    //console.log(group, isDone);
    return isDone;
}

function setOverviewStatus() {
    //Update menu status
    var groupsDone = 0;
    $('.meny-item').each(function() {
        var id = $(this).data("persp");
        var isDone = isGroupDone(id);
        if (isDone) {
            $(this).addClass("completed");
            $(this).find("img").attr("src", "img/icon-check.svg");
            groupsDone++;
        }
    });

    if (groupsDone==$('.meny-item').length) {
        showMe($('#btn-result'));
    }
}

function initOverview() {

    animateCSS($startWrapper, "fadeOutFast", "", function() {
        $startWrapper.addClass("js-isHidden");
    });
    animateCSS($surveyWrapper, "fadeOutFast", "", function() {
        hideMe($surveyWrapper);
        $surveyWrapper.empty();

        setOverviewStatus();

        showMe($('#overview-wrapper'));
        animateCSS($('#overview-wrapper'), "fadeInFast", "");

        animDone = false;
        if (!menuAnim) {
            var circleTween = new TimelineMax();
            circleTween.staggerFrom(".circle-outline", 1, {width:0, height:0, opacity:0.1, ease:Power2.easeOut}, 0.5);

            menuAnim = new TimelineMax({overwrite:"all",
                onComplete:function() {
                    animDone = true;
                    $('.meny-item').removeClass("ismoving");
                    $('.meny-wrapper').attr("tabindex",-1).focus();
                }, 
                onStart:function() {
                    $('.meny-item').addClass("ismoving");
                },
                onReverseComplete:function() {
                    openGroupSurvey();
                }
            }); 
            var easeAnim = "Back.easeOut", delay=1.25, t=3;

            var ledTL = new TimelineMax();
            ledTL.fromTo('#led', t, {scale:0}, {scale:1, y:'-160%', ease:easeAnim});
            ledTL.add(TweenMax.fromTo('#led', 0.5, { webkitFilter:'brightness(0)',
            filter: 'brightness(0)'}, { webkitFilter:'brightness(1)',
            filter: 'brightness(1)'}), 0.25);
            ledTL.add(TweenMax.fromTo('#led', 0.5, {rotation:'-10'}, {rotation:'0', repeat: 4, yoyo:true, ease: Quad.easeInOut}), 0.5);

            var fysTL = new TimelineMax();           
            fysTL.fromTo('#fys', t, {scale:0}, {scale:1, x:'145%', y:'-55%', ease:easeAnim});
            fysTL.add(TweenMax.fromTo('#fys', 0.5, { webkitFilter:'brightness(0)',
            filter: 'brightness(0)'}, { webkitFilter:'brightness(1)',
            filter: 'brightness(1)'}), 0.25);
            fysTL.add(TweenMax.fromTo('#fys', 0.5, {rotation:'-8'}, {rotation:'0', repeat: 4, yoyo:true, ease: Quad.easeInOut}), 0.5);
           // fysTL.addCallback(function() {$('#fys').find(".persp-icon").addClass("fys-icon")},2)

            var rekTL = new TimelineMax();
            rekTL.fromTo('#rek', t, {scale:0}, {scale:1, x:'-145%', y:'-55%',  ease:easeAnim});
            rekTL.add(TweenMax.fromTo('#rek', 0.5, { webkitFilter:'brightness(0)',
            filter: 'brightness(0)'}, { webkitFilter:'brightness(1)',
            filter: 'brightness(1)'}), 0.25);
            rekTL.add(TweenMax.fromTo('#rek', 0.5, {rotation:'8'}, {rotation:'0', repeat: 4, yoyo:true, ease: Quad.easeInOut}), 0.5);

            var digTL = new TimelineMax();
            digTL.fromTo('#dig', t, {scale:0}, {scale:1, x:'100%', y:'120%',   ease:easeAnim});
            digTL.add(TweenMax.fromTo('#dig', 0.5, { webkitFilter:'brightness(0)',
            filter: 'brightness(0)'}, { webkitFilter:'brightness(1)',
            filter: 'brightness(1)'}), 0.25);
            digTL.add(TweenMax.fromTo('#dig', 0.5, {rotation:'-8'}, {rotation:'0', repeat: 4, yoyo:true, ease: Quad.easeInOut}), 0.5);

            var socTL = new TimelineMax();
            socTL.fromTo('#soc', t, {scale:0}, {scale:1, x:'-100%', y:'120%',   ease:easeAnim});
            socTL.add(TweenMax.fromTo('#soc', 0.5, { webkitFilter:'brightness(0)',
            filter: 'brightness(0)'}, { webkitFilter:'brightness(1)',
            filter: 'brightness(1)'}), 0.25);
            socTL.add(TweenMax.fromTo('#soc', 0.5, {rotation:'8'}, {rotation:'0', repeat: 4, yoyo:true, ease: Quad.easeInOut}), 0.5);
            
            menuAnim.fromTo("#circle-center", 0.5, {opacity:0, ease:Circ.easeIn}, {opacity:1, ease:Circ.easeIn});
            menuAnim.to("#circle-center", 1, {scale: 0.35, ease:Back.easeIn});
            menuAnim.add(circleTween, 0.75); 
            //tl.from(".meny-icon", 1, {scale: 0, ease:Bounce.easeOut});
            menuAnim.add(ledTL, delay+0.4);
            menuAnim.add(fysTL, delay);
            menuAnim.add(rekTL, delay+0.3);
            menuAnim.add(socTL, delay+0.1);
            menuAnim.add(digTL, delay+0.2);

            createRegisterForm();
           
        } else {
            menuAnim.timeScale(1);
            menuAnim.play(0); 
        }        
    });
}

function openGroupSurvey() {
   var $surveyPopup = $('.survey-content');
   qNr = 0;   
   //setQuestion ($surveyPopup, false);
   setStartPage($surveyPopup);
   openSurveyPopup();
}

//----------------------------------------//
//OPEN SURVEY
//----------------------------------------//
function openSurveyPopup() {             

        var $target = $('#popup-survey');
        var $popupBg = $target.closest('.overlay-bg');

		scrollPos = $(window).scrollTop();
		var transition="fadeIn";
        $('body').addClass('noscroll');

		$popupBg.removeClass('js-isHidden');
		$popupBg.attr("aria-hidden", false);
        if (perspId) {
            $popupBg.attr("aria-label", window.getText("persp_"+perspId));
        } else {
            $popupBg.attr("aria-label", window.getText("result_h1"));
        }
		
		
        animateCSS($popupBg, "fadeInFast", "", function() {           
            $target.removeClass('js-isHidden').addClass('js-isActive');
            showMe($popupBg.find('.survey-content'));
            $popupBg.find('.survey-content').attr("tabindex",-1).focus();
			trapFocus($('.overlay-bg'));
        });		
		$target.addClass('current');		
}

//----------------------------------------//
//CLOSE SURVEY POPUP
//----------------------------------------//
function closeSurveyPopup() {						
		var $overlay = $('.overlay.' + 'js-isActive');
        var $overlayBg = $overlay.closest('.overlay-bg');
		$('body').removeClass('noscroll');

        var transition="fadeOut";

		$overlayBg.attr("aria-hidden", true);
		if($overlay.length>0) {

			animateCSS($overlayBg, transition, "", function() {                
				$overlay.addClass('js-isHidden');
				$overlay.removeClass('js-isActive');
                $overlayBg.addClass('js-isHidden');	
                $('.survey-content').removeClass("result");
                if (qNr>=0) {
                    initOverview();	
                }
                	
			});
		} else {
			animateCSS($overlayBg, "fadeOut", "", function() {
				$overlayBg.addClass('js-isHidden');
			});
		}		
}
    
/*function setupDotNav() {
    var $dotNav = $('#dot-nav');    
    for (var i=0; i<=4; i++) {            				
        $dotNav.append('<a id="p-'+i+'" class="dots" href="'+i+'" aria-label="Steg '+(i+1)+'"></a>');
    }    
    $dotNav.find('a').click(function(e) {
        e.preventDefault();                
        pageNr = $(this).attr('href'); 
    });
}
function updateDotNav(nr) {
        $('#dot-nav').find('a').removeClass('current').attr("aria-current", false);
        $('#p-'+nr).addClass('current').attr("aria-current", "step");
}
*/
function getOrgStatus() {

    // Check for orgId in URL
    // Example: https://localhost:44365/1512afc3-73e5-4a29-938d-ac18aa7cbb61
    var _groupObj = JSON.parse(sessionStorage.getItem('_groupObj'));

    setOrganisation(_groupObj);

    // Decide if we have a correct localStorageId
    if (_groupObj) {
        // The localStorageId is correct and we get organisationName from backend
        console.log("Vi har orgId, hämta orgName");  
        console.log(_groupObj);  
        //IS IN Org
        console.log("Har organisation");
        $('.start-content').addClass("ingroup"); 
        $('main').before(getInGroupBanner(_groupObj.name));
        $('button.close-banner').click(function() {
            $('.ingroup-banner').remove();
        });
    } else {
        //NOT IN Org
        console.log("Ingen organisation");
        $('.start-content').removeClass("ingroup");
    } 
}

function setOrganisation(groupObj) {
    console.log("getOrg", groupObj);
    if (groupObj && groupObj!=="" && groupObj!={}) {
        surveyObj.userdata.groups.push(groupObj);
    }
    storeValue(surveyObj, true);
}

function showUserResult($qWrapper) {
    $qWrapper.empty();
    hideMe($qWrapper);

    $qWrapper.append('<div class="survey-header"><h1 class="p small italic db-txt txtr-edit" data-dbid="result_h1">'+window.getText("result_h1")+'</h1></div>');

    $qWrapper.addClass("result");
    $qWrapper.append(getUserResult());

    $('button.btn-register').click(function() {
		var $popup = $('#popup-register');
		overlayOpen($(this), $popup.closest('.popup-overlay-bg'), $popup);
    });
}

function setQuestion ($qWrapper, moveDown) {
    
    $qWrapper.empty();
    hideMe($qWrapper);
    var qId = perspLookup[perspId][qNr];
    console.log(qId);
    var qObj = questionLookup[qId];
    console.log(qObj);

    var qType = qObj.qType;

    var isPopup = false;
    if (qObj.qGroup!="about") {
        isPopup = true;
        $qWrapper.append('<div class="survey-header"><h1 class="p small italic db-txt txtr-edit" data-dbid="persp_'+perspId+'">'+window.getText("persp_"+perspId)+'</h1></div>')
    }

    $qWrapper.append(getSingleQuestion(qObj));

    var $typewrapper = $qWrapper.find('.qtype-wrapper');
    switch (qType ) {        

        case "single":
            $typewrapper.append(getRadio(qObj));
        break;
        case "single-respons":
            if (qObj.valueSelected!="") {
                //User has answered already
                $typewrapper.append(getRespons(qObj));
                showRespons(false);
            } else {
                $typewrapper.append(getRadio(qObj));
            }
        break;

        case "slider":
            $typewrapper.append(getSlider(qObj));
        break;

        case "tree":
            $typewrapper.append(getTreeStep(qObj));           
        break;
    }

    if (isPopup) {
        $qWrapper.append(getSurveyNav());
        if (qNr>0) {
            $('.btn-survey-prev').attr("disabled", false);
        }
        if (qNr<3 && qObj.valueSelected!="") {
            $('.btn-survey-next').attr("disabled", false);
        }
    }     

    function nextQuestion() {
        qNr++;    
        animateCSS($qWrapper.find('.survey-question'), "fadeOutUp", "", function() {          
            if (qNr<nrOfQs) {
                 setQuestion($qWrapper, false);
            } else {
                setResultAction(qObj.qGroup, $qWrapper);
            }                
            $(window).scrollTo(0, 250, {axis:'y'});
        });
    }
    function prevQuestion() {
        qNr--;    
        animateCSS($qWrapper.find('.survey-question'), "fadeOutDown", "", function() {          
            if (qNr>-1) {
                 setQuestion($qWrapper, true);
            }              
            $(window).scrollTo(0, 250, {axis:'y'});
        });
    }

        var $r = $typewrapper.find('input[type="range"]'),
                // $ruler = $('.rangeslider__ruler'),
                 $ruler = $('<div class="rangeslider__ruler" />');
                 $rangeBtns = $ruler.find('.range-item'),
                 currVal = 0, max=qObj.qAlts, nr=max;    
                
        var sliderResult=0;  
        var valueAlt = [1,1,2,2,3];      
        // Initialize
        $r.rangeslider({
            polyfill: false,
            onInit: function() {
                $ruler[0].innerHTML = getRulerRange(0, max, 1);
                this.$range.prepend($ruler);
            },
            onSlide: function(position, value) { 
                //console.log(value);
                currVal = setValue(value);  ;   
                 
                sliderResult = setValue(value); 
                //$r.attr("value", sliderResult)   ;
                $ruler.find('.range-item').removeClass('active');
                $ruler.find('.range-item').eq(sliderResult).addClass('active');
                var fbnr = sliderResult;
                //console.log(fbnr, parseInt(fbnr));
             },
             onSlideEnd: function(position, value) { 
                //console.log(value);
                currVal = setValue(value);   
                sliderResult = setValue(value); 
                //$r.attr("value", sliderResult)   ;
                $ruler.find('.range-item').removeClass('active');
                $ruler.find('.range-item').eq(sliderResult).addClass('active');
               
                var newVal = Math.round(currVal); 
                console.log(currVal);             
                var altId = qObj.id+"_alt_"+newVal;
                updateValue(qObj.id, altId, valueAlt[newVal], false);
             },
        });

        function getRulerRange(min, max, step) {
            var range = '';
            var i = 0;            
            while (i <= max) {
              i = i + step;
              range+='<div class="range-item"></div>';
            }
            return range;
        }
    
        function setValue(value) {
            var newVal = Math.round(value);           
            var altId = qObj.id+"_alt_"+newVal;
            var imgId = 'img/'+perspId+'-'+newVal+'.svg';
            var textVal = window.getText(altId);
            $r.attr("value", textVal);
            $r.attr("aria-valuetext", textVal);

            $('#sliderfb').text(textVal);    
            $('#fbimg').attr("src", imgId);     

            return newVal;
        }


    function showRespons(doAdd) {
        addEditor($('.answer-wrapper'));
        animateCSS($('.answer-wrapper'), "fadeInFast", "", function() {
             var userRespons = getUserRespons(qObj, doAdd);
            $.each(userRespons, function(i, prop) {
                $('#'+i+'_respons').find(".respons-fill").width(prop+"%");
                $('#'+i+'_respons').find(".respons-output").text(prop+"%");
            });
        });
       
    }
    
    //ADD BUTTON LISTENERS

    $('.btn-survey-next').click(function() {
        nextQuestion();
    });
    $('.btn-survey-prev').click(function() {
        prevQuestion();
    });
    $('.reveal-item').height(45);
    $('.btn-more').click(function() {
        var $container = $(this).parent();
        $container.toggleClass("closed");
        var orgH = 45;
        var newH = $container.find('.reveal-content').outerHeight();
        console.log(newH)
        if ($container.hasClass("closed")) {
            $container.height(orgH);
        } else {
            $container.height(newH+orgH);
        }
    });
    $('button.btn-nextQ').click(function() {
        nextQuestion();
    });
    $('button.btn-answer').click(function() {
        $(this).parent().addClass("answered");
        $(this).parent().find(".btn-answer").removeClass("selected")
            .attr("aria-checked", false);
        $(this).addClass("selected").attr("aria-checked", true);

        var target = $(this).data("qid");           

        if (qType!="single-respons") {    
            updateValue(target, $(this).data("value"), 0, true);          
            nextQuestion(); 
        } else {
            updateValue(target, $(this).data("value"), 0, false);  
            $('.answer-wrapper').remove();
            $('.qtype-wrapper').append(getRespons(qObj));
            $('button.btn-nextQ').click(function() {
                nextQuestion();
            });
            showRespons(true);
        }
    });
    $('button.btn-step1').click(function() {
        
        $(this).addClass("selected").attr("aria-checked", true);
        $('#step-1').find(".btn-step1").attr("disabled", true);
        $('#step-1').find(".btn-step1.selected").parent().addClass("current")
        //$(this).parent().find(".btn-step1").removeClass("selected")
         //   .attr("aria-checked", false);
         var nextstep = $(this).data("step");
          $('#step-1').addClass("answered"); 
         setTimeout(function(){               
            showMe($('#step-'+nextstep));
            animateCSS($('#step-'+nextstep), "slideInUp", "");      
         }, 500);
               
    });
    $('button.btn-step2').click(function() {        
        $(this).addClass("selected").attr("aria-checked", true);
        var  $parent = $(this).closest('.tree');
        $parent.find(".btn-step2").attr("disabled", true);
        $parent.find(".btn-step2.selected").parent().addClass("current")
       
        var target = $(this).data("qid");        
        updateValue(target, $(this).data("value"), $(this).data("altvalue"), true);

        setTimeout(function(){    
            $parent.addClass("answered");             
            showMe($('#tree-fb'));
            animateCSS($('#tree-fb'), "slideInUp", "");      
         }, 500);
               
    });

    
    showMe($qWrapper);
    addEditor($qWrapper);
    var anim =  "slideInUp"; 
    if (moveDown) {
        anim = "slideInDown"
    } 
    animateCSS($qWrapper.find('.survey-question'), anim, "");
  
} 

function updateValue(id, selectedAlt, value, saveToDB) {
    questionLookup[id].valueSelected = selectedAlt;
    questionLookup[id].altValue = value;
    console.log(id, selectedAlt, value);        
    if (saveToDB) {
        storeValue(surveyObj, true);
    }
    
}

function setResultAction(action, $target) {
    if (action=="about") {
        showResultPart1();
    } else {
        //Return to menu
        showResultPart2($target);
    }
}
function showResultPart1() {
    $surveyWrapper.empty();
    hideMe($surveyWrapper);

    $surveyWrapper.append(getMidResult());

    $('#btn-overview').click(function() {
        initOverview();
    });

   
    //var qwrapper = $surveyWrapper.find('.qtype-wrapper');
    showMe($surveyWrapper);
    addEditor($surveyWrapper);
    animateCSS($surveyWrapper, "slideInUp", "");
}
function showResultPart2($target) {
    console.log("showResultPart2");
    $target.empty();
    hideMe($target);

    $target.append(getPerspResult());

    $('#btn-overview').click(function() {
        closeSurveyPopup();
    });

    showMe($target);
    addEditor($target);   

    TweenMax.set($target.find('.persp-icon').find('img'), {opacity:0});
    animateCSS($target, "slideInUp", "", function() {        
        $target.find('.persp-icon').addClass("completed").addClass("big").removeClass("small"); 
        TweenMax.to($target.find('.persp-icon').find('img'), 1, {opacity:1});        
    });
}
function setStartPage ($target) {
    console.log("setStartPage");
    $target.empty();
    hideMe($target);

    $target.append(getStartPage());

    $('#btn-start').click(function() {
        setQuestion ($target, false);
    });
    
    showMe($target);
    addEditor($target);
    animateCSS($target, "slideInUp", "");
}

function getPoints(qArray) {
    var points = 0;
    for (var q=0; q<qArray.length; q++) {
        //console.log(questionLookup[qArray[q]]);
        if (!questionLookup[qArray[q]].altValue) {
            questionLookup[qArray[q]].altValue = 0;
        }
        points+=questionLookup[qArray[q]].altValue;
    }
    return points;
}

function getUserScore() {
    var points = 0;
    $.each(surveyObj.questions, function(i, props) {
        console.log(props.id, props.altValue)
        points+=props.altValue;
    });
    return points;
}

function getUserRespons(obj, doAdd) {
    var total=0, altValues = {}; 

    $.each(obj.userAnswers, function(i, altObj) {
        console.log(i, altObj);
        for (var key in altObj) {
            total+=altObj[key];
            altValues[key] = altObj[key];
        }       
    });
    if(doAdd) {
        total++;
        if (altValues[obj.valueSelected]) {
            altValues[obj.valueSelected]++;
        } else {
            altValues[obj.valueSelected]=1;
        }
    }    

    $.each(altValues, function(i, prop) {
        altValues[i] = parseInt((prop/total)*100);      
    });

    altValues.total = total;
    console.log(altValues);

    return altValues;
   /* */
}

//-------------------------------------------------
//----------***HTML SETUPS***----------------
//-------------------------------------------------
//START/RESULT PAGES
function getMidResult() {
    var html="";
    html+='<div class="survey-result">';
           html+=' <div class="top-part question">';             
                html+='<div class="container">	';				
                    html+='<div class="question-wrapper col col-xs-100 middle-xs between-xs">';
                        html+='<div class="h1 strong text-center col-xs-100 col-sm-90 col-md-80 db-txt txtr-edit" data-dbid="s1_start">'+window.getText("s1_start")+'</div>'; 
                        html+='<button id="btn-overview" class="default db-txt m-t-2" data-dbid="btn_continue">'+window.getText("btn_continue")+'</button>';
                    html+='</div>';    
                html+='</div>';
            html+='</div>';
        html+='</div>';
    html+='</div>';
    return html;
}
function getStartPage() {
    var txt = "_start";
    if (isGroupDone(perspId)) {
        txt = "_done";
    }
    var html="";
    html+='<div class="survey-result">';
           html+=' <div class="top-part question">';             
                html+='<div class="container">	';				
                    html+='<div class="question-wrapper col col-xs-100 middle-xs between-xs">';
                        html+='<div class="persp-icon big '+perspId+'-icon"><img src="img/icon-'+perspId+'.svg" alt=""></div>';
                        html+='<div class="progress h3 uc db-txt txtr-edit" data-dbid="persp_'+perspId+'">'+window.getText("persp_"+perspId)+'</div>';
                        html+='<div class="h2 text-center max-width strong db-txt txtr-edit" data-dbid="'+perspId+txt+'">'+window.getText(perspId+txt)+'</div>'; 
                        html+='<button id="btn-start" class="default db-txt m-t-2" data-dbid="btn_go">'+window.getText("btn_go")+'</button>';
                    html+='</div>';    
                html+='</div>';
            html+='</div>';
        html+='</div>';
    html+='</div>';
    return html;
}
function getPerspResult() {
    var html="";
    html+='<div class="survey-result">';
           html+=' <div class="top-part question">';             
                html+='<div class="container">	';				
                    html+='<div class="question-wrapper col col-xs-100 middle-xs between-xs">';
                        html+='<div class="persp-icon small '+perspId+'-icon"><img src="img/icon-check.svg" alt=""></div>';
                        html+='<div class="h2 strong col-xs-100 max-width-L db-txt txtr-edit" data-dbid="'+perspId+'_fb">'+window.getText(perspId+"_fb")+'</div>'; 
                        html+='<button id="btn-overview" class="default db-txt m-t-2" data-dbid="btn_overview">'+window.getText("btn_overview")+'</button>';
                    html+='</div>';    
                html+='</div>';
            html+='</div>';
        html+='</div>';
    html+='</div>';
    return html;
}
function getUserResult() {
    var html="";
    html+='<div class="user-result">';
           html+=' <div class="top-part question col-xs-100 m-b-4">';    
                //Start ingress         
                html+='<div class="container">	';				
                    html+='<div class="question-wrapper col col-xs-100 middle-xs center-xs">';
                        html+='<img id="result-logo" src="img/logotyp-round.svg" alt="">';
                        html+='<div class="progress h3 uc db-txt txtr-edit" data-dbid="result_h1">'+window.getText("result_h1")+'</div>';
                        html+='<h2 class="h1 xl m-t-0 strong db-txt txtr-edit" data-dbid="result_h2">'+window.getText("result_h2")+'</h2>'; 
                        html+='<div class="col col-xs-100 db-txt text-center max-width txtr-textbox" data-dbid="result_p_1">'+window.getText("result_p_1")+'</div>';
                        //Get user points
                        var scoreTxt = window.getText("result_points");
                        var score = getUserScore(); 
                        scoreTxt=scoreTxt.replace("X", score);
                        html+='<p class="h3 strong m-t-2">'+scoreTxt+'</p>';
                    html+='</div>';    
                html+='</div>';
            html+='</div>';
            //Border med knapp  
            html+='<div class="content-part info-border">';
                html+='<div class="container">';	
                    html+='<div class="row col-xs-100 center-xs">';                        
                        html+='<p class="h3 strong db-txt txtr-edit mob-margin" data-dbid="result_p_2">'+window.getText("result_p_2")+'</p>';
                        html+='<button class="default btn-register db-txt" data-dbid="btn_register">'+window.getText("btn_register")+'</button>';
                    html+='</div>';
                html+='</div>';
            html+='</div>';
            //Resultat
            html+='<div class="result-part">';
                html+='<div class="container">';	
                    html+='<div class="col col-xs-100 middle-xs">';
                        html+='<h3 class="h2 strong db-txt txtr-edit" data-dbid="result_h3">'+window.getText("result_h3_1")+'</h3>';
                        var showColHeader = "";
                        $.each(perspLookup, function(persp, array) {                            
                            if (persp!="about") {                                  
                              
                                html+='<div class="row col-xs-100 between-xs m-t-2 result-breakdown">';
                                    //Perspektiv
                                    html+='<div class="col result-row-persp">';
                                        html+='<h4 class="h3 uc desktop db-txt txtr-edit '+showColHeader+'" data-dbid="result_h4_1">'+window.getText("result_h4_1")+'</h4>';
                                        html+='<div class="row col-xs-100 middle-xs result-icon-row">';
                                            html+='<div class="persp-icon '+persp+'-icon medium"><img src="img/icon-'+persp+'.svg" alt=""/></div>';
                                            html+='<div class="points-icon mobile"><span class="strong h5">'+getPoints(array)+'</span></div>';
                                            html+='<h5 class="strong-italic db-txt txtr-edit" data-dbid="persp_'+persp+'">'+window.getText("persp_"+persp)+'</h5>';
                                        html+='</div>';
                                    html+='</div>';
                                    //Resultat
                                    html+='<div class="col result-row-points desktop">';
                                        html+='<h4 class="h3 uc db-txt txtr-edit '+showColHeader+'" data-dbid="result_h4_2">'+window.getText("result_h4_2")+'</h4>';
                                        html+='<div class="points-icon"><span class="strong h5">'+getPoints(array)+'</span></div>';
                                    html+='</div>';
                                    //Tips
                                    html+='<div class="col result-row-tips">';
                                        html+='<h4 class="h3 uc desktop db-txt txtr-edit '+showColHeader+'" data-dbid="result_h4_3">'+window.getText("result_h4_3")+'</h4>';
                                        html+='<div class="col col-xs-100 db-txt txtr-textbox" data-dbid="persp_'+persp+'_tips">'+window.getText("persp_"+persp+"_tips")+'</div>';
                                    html+='</div>';
                                html+='</div>';
                                showColHeader = "offstage";
                            }                            
                        });                    

                        html+='<button class="default btn-save db-txt" data-dbid="btn_save">'+window.getText("btn_save")+'</button>';
                    html+='</div>';
                html+='</div>';
            html+='</div>';
             //Mer info
            html+='<div class="info-part">';
                html+='<div class="container">';	
                    html+='<div class="row col-xs-100 between-xs">';
                        html+='<div class="col col-xs-100 col-sm-30 top-xs mob-margin">';
                            html+='<h3 class="strong db-txt" data-dbid="result_h3_2">'+window.getText("result_h3_2")+'</h3>';
                            html+='<div class="col col-xs-100 italic small db-txt" data-dbid="result_p_3">'+window.getText("result_p_3")+'</div>';
                            html+='<a href="#" class="button default m-t-2 db-txt" data-dbid="btn_webb">'+window.getText("btn_webb")+'</a>';
                        html+='</div>';
                        html+='<div class="col col-xs-100 col-sm-30 top-xs mob-margin">';
                            html+='<h3 class="strong db-txt" data-dbid="result_h3_3">'+window.getText("result_h3_3")+'</h3>';
                            html+='<div class="col col-xs-100 italic small db-txt" data-dbid="result_p_4">'+window.getText("result_p_4")+'</div>';
                            html+='<a href="#" class="button default m-t-2 db-txt" data-dbid="btn_inspo">'+window.getText("btn_inspo")+'</a>';
                        html+='</div>';
                        html+='<div class="col col-xs-100 col-sm-30 top-xs mob-margin">';
                            html+='<h3 class="strong db-txt" data-dbid="result_h3_4">'+window.getText("result_h3_4")+'</h3>';
                            html+='<div class="col col-xs-100 italic small db-txt" data-dbid="result_p_5">'+window.getText("result_p_5")+'</div>';
                            html+='<a href="#" class="button default m-t-2 db-txt" data-dbid="btn_about">'+window.getText("btn_about")+'</a>';
                        html+='</div>';

                        
                    html+='</div>';
                html+='</div>';
            html+='</div>';

        html+='</div>';
    html+='</div>';
    return html;
}
//-------------------------------------------------
//QUESTION TYPES
function getSingleQuestion(obj) {
    var html="";
    html+='<div class="survey-question">';
           html+=' <div class="top-part question q-'+qNr+'">';             
                html+='<div class="container">	';				
                    html+='<div class="question-wrapper col col-xs-100 middle-xs between-xs">';
                        html+='<div class="persp-icon small '+perspId+'-icon"><img src="img/icon-'+perspId+'.svg" alt=""></div>';
                        var progressTxt = (qNr+1)+' '+window.getText("gen_of")+' '+(nrOfQs);
                        html+='<div class="progress h3">'+progressTxt+'</div>';
                        html+='<div class="q h1 strong db-txt txtr-edit" data-dbid="'+obj.id+'">'+window.getText(obj.id)+'</div>'; 
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
function getRadio(obj) {
    var html="";
       
    html+='<div class="answer-wrapper radio row fluid col-xs-100 middle-xs start-sm" role="radiogroup">';
    for (var i=0; i<obj.qAlts; i++) {    
        var altTxtId = obj.id+"_alt_"+(i+1);
        var altTxt = window.getText(altTxtId);  
        if (obj.valueSelected==altTxtId) {
            //Is selected
            html+='<button class="btn-answer answer selected radio-'+(i+1)+'" role="radio" aria-checked="true" data-value="'+altTxtId+'" data-qid="'+obj.id+'">'; 
        } else {
            //Is not selected
           html+='<button class="btn-answer answer radio-'+(i+1)+'" role="radio" aria-checked="false" data-value="'+altTxtId+'" data-qid="'+obj.id+'">'; 
        } 
            html+='<span class="label db-txt" data-dbid="'+altTxtId+'">'+altTxt+'</span>';     
        html+='</button>'; 
    }                          
    html+='</div>';                   
    return html;
}
function getRespons(obj) {
    var html="";
    html+='<div class="answer-wrapper col col-xs-100 middle-xs start-sm">';
        html+='<p class="large db-txt" data-dbid="gen_others">'+window.getText("gen_others")+'</p>';
 
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
        html+='<p class="large max-width m-t-1 m-b-2 db-txt txtr-edit" data-dbid="'+altTxtId+'_fb">'+window.getText(altTxtId+"_fb")+'</p>';
        html+='<button class="default btn-nextQ db-txt" data-dbid="btn_goon">'+window.getText("btn_goon")+'</button>';
    html+='</div>';               
    return html;
}
function getSlider(obj) {

    var html="";       
    var startVal = 0, status="";
    if (obj.valueSelected!="") {
        startVal = obj.valueSelected.substr(-1);
        status = "disabled";
    }

    html+='<div class="answer-wrapper slider col col-xs-100 middle-xs" role="slider">';    

        html+='<div class="col col-xs-100 col-sm-90 middle-xs minH">';
            html+='<div class="col col-xs-100 middle-xs">';
                html+='<div class="progress-output col fluid col-xs-100 middle-xs">';
                    html+='<img id="fbimg" src="img/'+perspId+'-'+startVal+'.svg" alt=""/>';
                    html+='<p id="sliderfb" class="max-width large col-xs-100 text-center">'+window.getText(obj.id+"_alt_"+startVal)+'</p>';
                html+='</div>';
                html+='<div class="slider-wrapper row fluid col-xs-100 max-width">';
                    html+='<input type="range" min="0" max="'+obj.qAlts+'" step="1" value="'+startVal+'" name="rangeslider" data-id="'+obj.id+'" aria-valuetext="'+window.getText(obj.id+"_alt_"+startVal)+'" '+status+'>';
                   /* html+='<div class="rangeslider__ruler">';
                        for (var i=0; i<=obj.qAlts; i++) {
                            html+='<div role="button" class="range-item"></div>';
                        }
                    html+='</div>';*/
                html+='</div>';						
            html+='</div>';		
          	html+='<button class="default btn-nextQ db-txt" data-dbid="btn_goon">'+window.getText("btn_goon")+'</button>';
        html+='</div>';
    html+='</div>';
                   
    return html;

}
function getTreeStep(obj) {
    var html="";    
    var values = [0,0,3,2,2,1];
    var alt=1;
    
    var altArray = [];
    var hasanswered = "", currstep;
    if (obj.valueSelected!="") {
        hasanswered = "answered";
        var altSelected = obj.valueSelected.slice(-1);
        if (altSelected<5) {
            altArray.push(obj.id+"_alt_1");
            altArray.push(obj.valueSelected);
            currstep = 2;
        } else {
            altArray.push(obj.id+"_alt_2");
            altArray.push(obj.valueSelected);
            currstep = 3;
        }
    }
    
    for (var step=1; step<=3; step++) {
        var ishidden = "";
        var btnClass="btn-step1";
        if (step>1) {
            ishidden = "js-isHidden";
            btnClass="btn-step2";
        }
        var btnHidden = "js-isHidden";
        if (hasanswered!="") {
            btnHidden = "";
            if (step<2 || step==currstep) {
                ishidden=hasanswered;
            }
        }
         html+='<div id="step-'+step+'" class="answer-wrapper tree row fluid col-xs-100 center-xs '+ishidden+'" role="radiogroup">';

        for (var i=step; i<(step+2); i++) {    
            var altTxtId = obj.id+"_alt_"+alt;
            var altTxt = window.getText(altTxtId);              

            if (altArray.length>0) {
                if (altArray.indexOf(altTxtId)>-1) {
                    //Is selected
                    html+='<div class="current col middle-xs col-xs-100 tree-col">';
                    html+='<button class="'+btnClass+' answer radio-'+alt+' selected" role="radio" aria-checked="true" data-step="'+(step+i)+'" data-value="'+altTxtId+'" data-altvalue="'+values[alt-1]+'" data-qid="'+obj.id+'" disabled>';
                } else {
                    //Not selected
                    html+='<div class="col middle-xs col-xs-100 tree-col">';
                    html+='<button class="'+btnClass+' answer radio-'+alt+'" role="radio" aria-checked="false" data-step="'+(step+i)+'" data-value="'+altTxtId+'" data-altvalue="'+values[alt-1]+'" data-qid="'+obj.id+'" disabled>';
                }
            } else {
                //Question not answered
                html+='<div class="col middle-xs col-xs-100 tree-col">';
                html+='<button class="'+btnClass+' answer radio-'+alt+'" role="radio" aria-checked="false" data-step="'+(step+i)+'" data-value="'+altTxtId+'" data-altvalue="'+values[alt-1]+'" data-qid="'+obj.id+'">';
            }
                
                //Is selected
                // html+='<button class="btn-step'+step+' answer selected radio-'+i+'" role="radio" aria-checked="true" data-step="'+(step+i)+'" data-value="'+altTxtId+'" data-altvalue="'+values[i-1]+'" data-qid="'+obj.id+'">';                     
                
                html+='<span class="label db-txt" data-dbid="'+altTxtId+'">'+altTxt+'</span>';     
                html+='</button>'; 
                /*html+='<div class="reveal-item closed">';
                    html+='<button class="btn-more link db-txt" data-dbid="btn_desc">'+window.getText("btn_desc")+'</button>';
                    html+='<div class="reveal-content">';
                        html+='<p class="italic small db-txt txtr-edit" data-dbid="'+altTxtId+'_desc">'+window.getText(altTxtId+"_desc")+'</p>';
                    html+='</div>';
                html+='</div>';*/
            html+='</div>'; 
            alt++;
        }                          
        html+='</div>';  
    }
    

    html+='<div id="tree-fb" class="col fluid col-xs-100 middle-xs top-xs '+btnHidden+'">';
        html+='<button class="default btn-nextQ m-t-4 db-txt" data-dbid="btn_goon">'+window.getText("btn_goon")+'</button>'; 
    html+='</div>';
   //        
    return html;
}
//-------------------------------------------------
//SURVEY NAVIGATION
function getSurveyNav() {
    var html = "";
        html+='<div class="survey-nav">';
            html+='<button class="btn-survey-next" disabled><svg xmlns="http://www.w3.org/2000/svg" width="18.117" height="10.333" viewBox="0 0 18.117 10.333"><path  d="M0,0,7.777,7.919,15.289,0" transform="translate(1.414 1.414)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg></button>';
            html+='<button class="btn-survey-prev" disabled><svg xmlns="http://www.w3.org/2000/svg" width="18.117" height="10.333" viewBox="0 0 18.117 10.333"><path d="M0,0,7.777,7.919,15.289,0" transform="translate(16.703 8.919) rotate(180)" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg></button>';
        html+='</div>';

    return html;
 }

 function getInGroupBanner(groupname) {
     var html="";
        html+='<div class="ingroup-banner">';
            html+='<p class="italic xsmall db-txt" data-dbid="group_banner">'+window.getText("group_banner")+groupname+'</p>';
            html+='<button class="btn-close close-banner"></button>';
        html+='</div>';
     return html;
 }


(function ($) {
	"use strict";
	
	


	
})(jQuery);
