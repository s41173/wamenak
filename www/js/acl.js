var api = "http://administrator.wamenak.com/";  

function toast(msg) {
    var x = document.getElementById("snackbar");
    x.innerHTML=msg;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function idr_format(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
        val = val.toString().replace(/(\d+)(\d{3})/, '$1'+'.'+'$2');
    }
    var val = val+',-';
    return val;
}

function otentikasi(page){
    
    $(document).ready(function(e){  

        var bodyId = document.body.id;   
        var nilai = '{ "userid":"'+localStorage.userid+'", "log":"'+localStorage.log+'", "mobile":"1" }';
        var mess = null;

        $.ajax({
            type: 'POST',
            url: api+'customer/otentikasi',
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {   
              if (data.status == false){ 
                
                if (page == 'cart'){ mess = "Silahkan login untuk melihat pesanan anda"; }
                else if (page == 'wallet'){ mess = "Silahkan login untuk melihat saldo anda"; }

                swal({
                    position: 'top-right',
                    type: 'warning',
                    title: mess,
                    showConfirmButton: false,
                    timer: 2000
                });
                setTimeout(function(){ window.location = "login.html"; }, 3000);

              }else{ /*window.location = page+".html";*/ alert('berhasil'); }
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