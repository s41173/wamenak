function home(){
    balance();
    combo_bank();
}

function balance(){

    var nilai = '{ "customer":"'+localStorage.userid+'" }';
    console.log(nilai);
        
    $.ajax({
        type: 'POST',
        url: api+'customer/balance',
        data : nilai,
        contentType: "application/json",
        dataType: 'json',
        success: function(data)
        {   
          if (data.status == true){ 
              $("#balancetext").html("Rp "+idr_format(data.balance));
          }else{ toast(data.error); }
        },
        error: function (request, status, error) {
            console.log('Request Failed...!'+error);
        }
    })
    return false;

}

function combo_bank(){  
        
        var select_start = "<select id=\"cbank\" class=\"form-control\">";
        var select_end = "</select>";
        var con = "";
        $.get(api+"api/bank_list", function(data, status){
            
            for (i=0; i<data.content.length; i++){
                var datax = data.content;
con = con+"<option value=\""+datax[i].id+"\"> "+datax[i].acc_no+" - "+datax[i].acc_bank+" </option>";

            }
            $("#bankbox").html(select_start+con+select_end);
            
        });   

}

$(document).ready(function(e){  

    $('#bsubmit').click(function() {

        var mess = null;
        var amount = $("#camount").val();
        var bank = $("#cbank").val();
        var sendername = $("#sender_name").val();
        var senderno = $("#sender_no").val();
        var senderbank = $("#sender_bank").val();

        if (amount == ""){ mess = "Nominal Diperlukan"; }
        // else if(date == ""){ mess = "Tanggal Diperlukan"; }
        else if( bank == "" ){ mess = "Bank Tujuan Diperlukan"; }
        else if( sendername == "" ){ mess = "Nama Akun Pengirim Diperlukan"; }
        else if( senderno == "" ){ mess = "No Akun Pengirim Diperlukan"; }
        else if( senderbank == "" ){ mess = "Bank Akun Pengirim Diperlukan"; }

        if (mess == null){
            
            var nilai = '{ "customer":"'+localStorage.userid+'", "type":"2", "amount":"'+amount+'", "bank":"'+bank+'", "sender_name":"'+sendername+'", "sender_acc":"'+senderno+'", "sender_bank":"'+senderbank+'" }';
            
            $.ajax({
                type: 'POST',
                url: api+'topup/add_json',
                data : nilai,
                contentType: "application/json",
                dataType: 'json',
                success: function(data)
                {   
                  if (data.status == true){ 
                      
                    res = data.error.split('|');
                    swal({
                        position: 'top-right',
                        type: 'success',
                        title: res[0]+" "+res[1],
                        text: "Mohon tunggu konfirmasi dari admin kami.",
                        showConfirmButton: false,
                        timer: 3000
                    });

                    setTimeout(function(){ location.reload(); }, 3300);

                  }else{ toast(data.error); }
                },
                error: function (request, status, error) {
                    console.log('Request Failed...!'+error);
                }
            })
            return false;


        }else{ toast(mess); }


    });

}); // end document ready