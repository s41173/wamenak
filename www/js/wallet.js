function balance(){

    var nilai = '{ "customer":"'+localStorage.userid+'" }';
        
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