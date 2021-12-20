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

