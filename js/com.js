var apiHandle = null;
var _Debug = false;  
/******************************************************************************************
******************************************************************************************/
function findAPI(win) 
{

   if (_Debug)
   {
      alert("win is: "+win.location.href);
   }


   if (win.API != null)
   {
      if (_Debug)
      {
         alert("found api in this window");
      }
      return win.API;
   }

   if (win.length > 0) 
   {
      if (_Debug)
      {
         alert("looking for api in windows frames");
      }

      for (var i=0;i<win.length;i++)
      {

         if (_Debug)
         {
            alert("looking for api in frames["+i+"]");
         }
         var theAPI = findAPI(win.frames[i]);
         if (theAPI != null)
         {
            return theAPI;
         }
      }
   }

   if (_Debug)
   {
      alert("didn't find api in this window (or its children)");
   }
   return null;

}


/******************************************************************************************
******************************************************************************************/

function getAPI()
{

   var theAPI = findAPI(this.top);

   if (theAPI == null)
   {

      if (_Debug)
      {
         alert("checking to see if this window has an opener");
         alert("window.opener typeof is> "+typeof(window.opener));
      }

      if (typeof(this.opener) != "undefined")
      {
         if (_Debug)
         {
            alert("checking this windows opener");
         }
         if (this.opener != null)
         {
            if (_Debug)
            {
               alert("this windows opener is NOT null - looking there");
            }
            theAPI = findAPI(this.opener.top);
         }
         else
         {
            if (_Debug)
            {
               alert("this windows opener is null");
            }
         }
      }
   }

   return theAPI;
}

/******************************************************************************************
******************************************************************************************/
function getAPIHandle() 
{
   if (apiHandle == null)
   {
      apiHandle = getAPI();
   } 

   return apiHandle;
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function initSCORM(){
	  var api = getAPIHandle();
 	  if (api == null)
  		 {
   		   alert("ERROR");
   		   return false;
 		  }
	   var initResult = api.LMSInitialize("");
      var statusCourse = get("cmi.core.lesson_status");
      if(statusCourse == "not attempted"){
          set("cmi.core.lesson_status","incomplete");
          save();
      }
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function endSCORM(){
	  var api = getAPIHandle();
 	  if (api == null)
  		 {
   		   alert("ERROR");
   		   return false;
 		  }
	   var endResult = api.LMSFinish("");
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function save(){
	  var api = getAPIHandle();
 	  if (api == null)
  		 {
   		   alert("ERROR");
   		   return false;
 		  }
	   var commitResult = api.LMSCommit("");
}


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function set(data,value){
	  var api = getAPIHandle();
 	  if (api == null)
  		 {
   		   alert("ERROR");
   		   return false;
 		  }
		var setResult= api.LMSSetValue(data, value);
      var numError = api.LMSGetLastError("");
      if(numError!="0"){
         var toText= api.LMSGetErrorString(numError);
         alert("abusado chato!!!! "+toText);
      }
      
	 
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function get(data){
	  var api = getAPIHandle();
 	  if (api == null)
  		 {
   		   alert("ERROR");
   		   return false;
 		  }
		var getResult= api.LMSGetValue(data); 
	return getResult;
}
