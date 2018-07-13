document.addEventListener('deviceready', function () {


  // location
// onSuccess Callback
    //   This method accepts a `Position` object, which contains
    //   the current GPS coordinates
    //
    function onSuccess(position) {
      // var element = document.getElementById('geolocation');
      // element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
      //                     'Longitude: ' + position.coords.longitude     + '<br />' +
      //                     '<hr />'      + element.innerHTML;
      var coor = position.coords.latitude+','+position.coords.longitude;
      var nilai = '{ "coordinate":"'+coor+'" }';

      $.ajax({
          type: 'POST',
          url: api+'courier/post_loc',
          data : nilai,
          contentType: "application/json",
          dataType: 'json',
          success: function(data)
          {   
            if (data.status == true){ toast("Location updated");}else{ toast(data.error); }
          },
          error: function (request, status, error) {
              console.log('Request Failed...!'+error);
          }
      })
      return false;
  }

  // onError Callback receives a PositionError object
  //
  function onError(error) {
      alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
  }

  // Options: throw an error if no update is received every 30 seconds.
  //
  // var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
  // location

  // onesignal
  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal
  .startInit("95b026cd-a68a-42e4-bcb3-63d5bd93f341")
  .handleNotificationOpened(notificationOpenedCallback)
  .endInit();

  window.plugins.OneSignal.getPermissionSubscriptionState(function(status) {
    idapp = status.subscriptionStatus.userId;
    if (idapp != null){ localStorage.setItem("device", idapp); }
  });

  // onesignal
   
var lastTimeBackPress=0;
var timePeriodToExit=2000;

  document.addEventListener("backbutton", function(e){
    
      var bodyId = document.body.id;
//      alert(bodyId);
      
   if(bodyId == 'index'){
     
       e.preventDefault();
       e.stopPropagation();

       if(new Date().getTime() - lastTimeBackPress < timePeriodToExit){
        navigator.app.exitApp();
       }else{
            toast("Press again to exit");
            lastTimeBackPress=new Date().getTime();
        }

      //  navigator.notification.confirm('Press back again to exit'
      //               , function(button) {
      //                   if (button == 2 || button == 0) {
      //                       navigator.app.exitApp();
      //                   }
      //                 }
      //               , 'Exit App?'
      //               , ['No way', 'Exit']
      //           );

        return false;
       
//       navigator.app.exitApp();
   }
//   else if (bodyId == 'product'){ window.location.href = "series.html";  }
   else if (bodyId == 'register'){ window.location.href = "index.html";  }
  //  else if (bodyId == 'notif'){ window.location.href = "index.html";  }
   else {
       navigator.app.backHistory()
   }
      
//     alert("Hello Aq kembali");
  }, false);
  
  // Call syncHashedEmail anywhere in your app if you have the user's email.
  // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
  // window.plugins.OneSignal.syncHashedEmail(userEmail);
}, false);



   function series(cid,catname){

      localStorage.setItem("category", cid);
      localStorage.setItem("catname", catname);
      window.location.href = "series.html"; 
   }

   function product(mid,modelname){
     
      localStorage.setItem("model", mid);
      localStorage.setItem("modelname", modelname);
      window.location.href = "product.html"; 
   }

   function calculator(pid){
    localStorage.setItem("pid", pid);
    window.location.href = "calculator.html"; 
 }