var api = "http://administrator.wamenak.com/";  

// setInterval(otentikasi, 3000);
function otentikasi(){
    
    $(document).ready(function(e){  

        var bodyId = document.body.id;   
        var nilai = '{ "userid":"'+localStorage.userid+'", "log":"'+localStorage.log+'", "mobile":"1" }';
        $.ajax({
            type: 'POST',
            url: api+'customer/otentikasi',
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {   
              if (data.status == false){ logout(); }
              else if (data.status == true){ 
                  /*category(7);*/
                  alert('Welcome To Home');
              }
            },
            error: function (request, status, error) {
                console.log('Request Failed...!'+error);
                alert('Request Failed Otentikasi Request...! - '+request.responseText);
                alert('Request Failed Otentikasi Status...! - '+error);
                alert('Request Failed Otentikasi Error...! - '+status);
            }
        })
        return false;

    }); // end document ready

}

function logout(){

    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    localStorage.removeItem("log");
    window.location = "login.html";
}

// ----------------------------- acl --------------------------------------------------------