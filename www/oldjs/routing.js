document.addEventListener('deviceready', function () {
    
  document.addEventListener("backbutton", function(e){
    
      var bodyId = document.body.id;
//      alert(bodyId);
      
   if(bodyId == 'index'){
       e.preventDefault();
       
       navigator.notification.confirm('Press back again to exit'
                    , function(button) {
                        if (button == 2 || button == 0) {
                            navigator.app.exitApp();
                        }
                      }
                    , 'Exit App?'
                    , ['No way', 'Exit']
                );
                return false;
       
//       navigator.app.exitApp();
   }
//   else if (bodyId == 'product'){ window.location.href = "series.html";  }
//   else if (bodyId == 'calculator'){ window.location.href = "product.html";  }
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