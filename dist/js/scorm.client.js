(function ($) {

    //#region Vars
    window.hasAPI = false;

    var api = __findScormAPI__(window, "API");

    var console = window.console;
    if (!console) {
        console = {
            log: function () { },
            warn: function () { },
            info: function () { }
        };
    }

    //#endregion

    //#region ScoClient

    function ScoClient(api) {
        var cmi_suspend_data = "cmi.suspend_data",
        cmi_completion_status = "cmi.core.lesson_status",
        cmi_progress_measure = "cmi.progress_measure",
        cmi_location = "cmi.core.lesson_location";

       initFunctions();      

        function initFunctions() {

            window.loadCourseStatus = loadCourseStatus;
            window.saveCourseStatus = saveCourseStatus;
            window.getCompletionStatus = getCompletionStatus;
            window.setCompletionStatus = setCompletionStatus;
            window.initCompletionStatus = initCompletionStatus;
        }

        function loadCourseStatus() {
			var suspDataObj;
			if (api=="Session") {
				suspDataObj = JSON.parse(sessionStorage.getItem('suspendData'));
			} else {
				suspDataObj = api.LMSGetValue(cmi_suspend_data);
			}           
			////console.log("loadCourseStatus", suspDataObj);
            var status = false;
            if (!suspDataObj) {
                
            } else {
				if (api!=="Session") {
					//console.log("parseJSON", $.parseJSON(suspDataObj));
                	suspDataObj = $.parseJSON(suspDataObj);
				} 
               status = suspDataObj.done;
            }            
			
            if (!status && api!=="Session") {
                api.LMSSetValue(cmi_completion_status, "incomplete");
                api.LMSCommit('');
            }
           

			return suspDataObj;
        }

        function saveCourseStatus(obj) {
			//console.log("saveCourseStatus", obj); 

			var completeValue = "incomplete";
			if (obj.done) {
                //console.log("COURSE COMPLETED");
				completeValue = "completed";
			}
			
			if (api=="Session") {
				sessionStorage.setItem('suspendData', JSON.stringify(obj));
			} else {
				api.LMSSetValue(cmi_suspend_data, JSON.stringify(obj));
				api.LMSSetValue(cmi_completion_status, completeValue);
            	api.LMSCommit('');
			}			
            
        }
    

        function isCompletePages(arr) {
            if (arr) {
                for (var i = 0; i < arr.length; i++) {
                    var n = parseInt(arr[i], 10);
                    if (!n) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }

        function getCompletionStatus() {
            var isCompleted = false;
            var status = api.LMSGetValue(cmi_completion_status);
            //console.log(status);
            if (status == "passed" || status == "completed") {
                isCompleted = true;
            }
            return isCompleted;
        }

        function initCompletionStatus() {
            if (api!="Session") {	    
                var status = api.LMSGetValue(cmi_completion_status);            
                if (status=="not attempted") {
                    //console.log("REPORT AS INCOMPLETE!");
                    api.LMSSetValue(cmi_completion_status, "incomplete");
            	    api.LMSCommit('');
                } 	
			}            
        }

        function setCompletionStatus() {
            if (api!="Session") {	                
                if (!getCompletionStatus() ) {
                    //console.log("REPORT AS COMPLETED!");
                    api.LMSSetValue(cmi_completion_status, "completed");
            	    api.LMSCommit('');
                } 	
			}            
        }


        function initTerminate() {
            var $win = $(window);
            $win.on("beforeunload", onUnload);
            $win.unload(onUnload);
            function onUnload() {
                api.LMSFinish("");
            }
        }
    }

    //#endregion

    //#region Setup

    setup();

    function setup() {
        if (!api) {
            //console.log("Can't found scorm api - use Session storage");
            //  return;
			api = "Session";
        }
        var client = new ScoClient(api);
    }

    //#endregion

    //#region Find scorm api

    function __findScormAPI__(win, apiName) {
        var api = null;
        win = win ? win : window;
        apiName = apiName ? apiName : "API_1484_11";    //default find scorm1.3 api
        while (win != null) {
            api = win[apiName];
            if (api) {
                window.hasAPI = true;
                break;
            }
            win = (win.parent == win) ? win.opener : win.parent;
        }
        return api;
    }

    //#endregion

})(jQuery);