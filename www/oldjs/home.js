var api = "http://calculator.dswip.com/";  

function category(param){

    localStorage.removeItem("category");
    localStorage.removeItem("catname");
    localStorage.removeItem("model");
    localStorage.removeItem("modelname");
    localStorage.removeItem("pid");
       
    $(document).ready(function (e) {   
    
        var nilai = '{ "id":"'+param+'"}';
        
        $.ajax({
            type: 'POST',
            url: api+'api/category/',
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data) 
            {
              for (i=0; i<data.content.length; i++){
//                  alert(data.content[i].name.toUpperCase());
                  var datax = data.content;
                  var con = "<div class=\"col-xs-4\"> <div class=\"thumbnail shadow\">"+
"<a onclick=\"series("+datax[i].id+",'"+datax[i].name+"');\" href=\"#\"> <img class=\"img-responsive\" id=\"pict\" src=\""+datax[i].image+"\" alt=\"\"> </a>"+
                            "<div class=\"caption\"> <h5 class=\"judul strong\"> "+datax[i].name.toUpperCase()+" </h5>"+
                            "</div> </div> </div>";
                  if (param == 7){ $("#doorbox").append(con); }else{ $("#windowbox").append(con); }
              }
              if (param == 7){ category(16); }
            },
            error: function (request, status, error) {
               alert('Request Failed Category...!'+error);
                console.log('Request Failed Category...!');
            }
        }) 
        return false;
        
    });  // end document ready	
       
}