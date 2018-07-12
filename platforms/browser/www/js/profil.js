function profile(){

    $(document).ready(function (e) {   
    
        $.get(api+"customer/detail/"+localStorage.userid, function(data, status){
            
            $("#name").html(data.first_name);
            $("#email").html(data.email);
            $("#phone").html(data.phone);

            $("#inputname").val(data.first_name);
            $("#inputemail").val(data.email);
            $("#inputphone").val(data.phone);

        });
                
    });  // end document ready	   
}


function edit_profile(uid){

    $(document).ready(function (e) {   
        $("#myModal").modal('show');
    });  // end document ready	 
}

function submit_save(){
    $(document).ready(function (e) {   
        var name = $("#inputname");
        var email = $("#inputemail");
        var phone = $("#inputphone");
        var mess = "";

        if (name.val() == ""){ mess = "Nama diperlukan"; name.focus(); }
        else if (email.val() == ""){ mess = "Email diperlukan"; email.focus(); }
        if (phone.val() == ""){ mess = "No handphone diperlukan"; phone.focus(); }

        if (mess == ""){
            
            var nilai = '{ "id":"'+localStorage.userid+'", "fname":"'+name.val()+'", "email":"'+email.val()+'" }';

            $.ajax({
                type: 'POST',
                url: api+'customer/edit_customer',
                data : nilai,
                contentType: "application/json",
                dataType: 'json',
                success: function(data)
                {   
                  if (data.status == true){ 
                      toast(data.error);
                      setTimeout(function(){ $("#myModal").modal('hide'); location.reload(); }, 2000);
                  }else{ toast(data.error); }
                },
                error: function (request, status, error) {
                    console.log('Request Failed...!'+error);
                }
            })
            return false;

        }else{ toast(mess); }
    });  // end document ready	 
}
