function checkdigit(sText)
{
   var ValidChars = "0123456789.";
   var IsNumber = true;
   var Char;

   for (i = 0; i < sText.length && IsNumber == true;
   i ++ )
   {
      Char = sText.charAt(i);
      if (ValidChars.indexOf(Char) == - 1)
      {
         IsNumber = false;
        //  document.getElementById(nid).value = "0";
        //  alert("Format text must be numeric");
        return false;
      }
      else
      {
        //  document.getElementById(nid).value = sText;
         return true;
      }
   }
}

function update(id){
    var value = $("#"+id+"").val();

    if ( value.length > 2 ){ $("#"+id+"").val(1); }
    else if( value == '0'){ $("#"+id+"").val(1); }
    else{

        var key = event.keyCode || event.charCode;
        if( key == 8 || key == 46 || value == '0' ){ return false; }else{

            var nilai = '{ "id":"'+id+'", "qty":"'+value+'" }';
        
            $.ajax({
                type: 'POST',
                url: api+'cart/update',
                data : nilai,
                contentType: "application/json",
                dataType: 'json',
                success: function(data)
                {   
                if (data.status == true){ cart();
                }else{ toast(data.error); }
                },
                error: function (request, status, error) {
                    console.log('Request Failed...!'+error);
                }
            })
            return false;
        }
    }
}

function del_cart(uid){

    var nilai = '{ "id":"'+uid+'" }';
        
    $.ajax({
        type: 'POST',
        url: api+'cart/delete',
        data : nilai,
        contentType: "application/json",
        dataType: 'json',
        success: function(data)
        {   
          if (data.status == true){ cart();
              setTimeout(function(){ toast("1 produk berhasil dihapus"); }, 1000);
          }else{ toast(data.error); }
        },
        error: function (request, status, error) {
            console.log('Request Failed...!'+error);
        }
    })
    return false;
}

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
              $("#balancetext").html(idr_format(data.balance));
              $("#balance").val(parseInt(data.balance));
              cart();
          }else{ toast(data.error); }
        },
        error: function (request, status, error) {
            console.log('Request Failed Balance...!'+error);
        }
    })
    return false;

}

function cart(){

    $.get(api+"cart/get/"+localStorage.userid, function(data, status){
        
        var total = data.total;
        var con = "";

        if (data.content){
            
            for (i=0; i<data.content.length; i++){
            var datax = data.content;
            con = con+"<li class=\"list-group-item col-xs-12\">"+
            "<div class=\"col-xs-4\" style=\"padding: 0;\">"+
            "<img src=\""+datax[i].image+"\" class=\"img-responsive\">"+
            "</div>"+
            "<div class=\"col-xs-8 detail\">"+
                "<h4 class=\"list-group-item-heading\"> "+capitalizeFirstLetter(datax[i].product)+" "+ 
                "<button type=\"button\" onclick=\"del_cart("+datax[i].id+")\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></button> <br> <small> "+datax[i].description+" </small> "+
                "</h4>"+
                "<p class=\"list-group-item-text\">"+idr_format(datax[i].amount)+" </p>"+
                "<div class=\"input-group\" id=\"qty\">"+
            "<input type=\"number\" onkeyup=\"update("+datax[i].id+");\" class=\"form-control text-center\" id=\""+datax[i].id+"\" value=\""+datax[i].qty+"\">"+
                "</div>"+
            "</div>"+
            "</li>";
            }

            $("#ringkasan").html(con);
            $("#totalhidden").val(total.amount_publish); 
            $("#ttotal,#xttotal").html(idr_format(total.amount_publish));

            if ($("#balance").val() <= total.amount_publish){
                $("#rcash").prop("checked", true);
            }else{ $("#rwallet").prop("checked", true); }

        }else{ setTimeout(function(){ window.location = "index.html"; }, 2000); toast("Cart anda kosong");  $("#ringkasan").html(""); $("#ttotal,#xttotal").html("Rp 0"); $("#totalhidden").val('0'); }
    });   

}

function calculate_distance(){

    // var lat = 3.551989;
    // var long = 98.641050;
    // document.getElementById("hlat").value = lat;
    // document.getElementById("hlong").value = long;
    // initMap(lat,long);
    // $("#finish").css("display", "none");
    $("#finish").hide();
    var coor = document.getElementById("hlat").value+","+document.getElementById("hlong").value;
    var nilai = '{ "to":"'+coor+'" }';
        
    $.ajax({
        type: 'POST',
        url: api+'api/calculate_distance',
        data : nilai,
        contentType: "application/json",
        dataType: 'json',
        success: function(data)
        {   
           $("#delivery").val(data.result);
           calculate_shiprate();
        },
        error: function (request, status, error) {
            toast('Request Failed - Calculate-Distance'+error);
        }
    })
    return false;
  }

  function calculate_shiprate(){

     var distance = $("#delivery").val();
     var d = new Date();
     var period = d.getHours();
     var payment = 'CASH';
     var amount = parseInt($("#totalhidden").val());
     if ($("#rwallet").is(":checked")) { payment = "WALLET"; }

     var nilai = '{ "period":"'+period+'", "distance":"'+distance+'", "payment":"'+payment+'", "minimum":"'+amount+'" }';
     
     $.ajax({
        type: 'POST',
        url: api+'shiprate/calculate',
        data : nilai,
        contentType: "application/json",
        dataType: 'json',
        success: function(data)
        {   
            var res = parseInt(data.result);
            if (res == 1){ res = 0; $("#herror").val("Invalid Delivery"); }else{ $("#herror").val(''); }

            var rate = parseInt(res*distance);
            $("#hdeliveryrate").val(rate);
            $("#deliveryrate").html(idr_format(rate)); 
            calculate_discount();
            // $("#grandtotal").html(idr_format(parseInt(amount+rate)));
        },
        error: function (request, status, error) {
            // console.log('Request Failed...!'+error);
            toast('Request Failed - Calculate-Shiprate'+error);
        }
    })
    return false;
  }

  function calculate_discount(){

     var payment = 'CASH';
     var amount = parseInt($("#totalhidden").val());
     var rate = parseInt($("#hdeliveryrate").val());
     if ($("#rwallet").is(":checked")) { payment = "WALLET"; }

     var nilai = '{ "payment":"'+payment+'", "amount":"'+amount+'" }';
     
     $.ajax({
        type: 'POST',
        url: api+'discount/calculate',
        data : nilai,
        contentType: "application/json",
        dataType: 'json',
        success: function(data)
        {   
            var res = parseInt(data.amount);
            $("#hdiscount").val(res);
            $("#hgrandtotal").val(parseInt(amount+rate));
            $("#discount").html(idr_format(res)); 
            $("#grandtotal").html(idr_format(parseInt(amount+rate-res)));
            $("#finish").show();
        },
        error: function (request, status, error) {
            // console.log('Request Failed...!'+error);
            console.log('Request Failed - Calculate-Shiprate'+error);
        }
    })
    return false;

  }

  // fungsi untuk set address berdasarkan lat, long
  function getcoor(){

     var lat = document.getElementById("hlat").value;
     var long = document.getElementById("hlong").value;    

     var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+lat+","+long+"&key=AIzaSyAaCjY30PVJEpkf9mcZg8R6Rs5KepJQjOg&callback";

     $.get(url, function(data, status){
        var add = data.results[0].formatted_address;
        $("#taddress").val(add);
        calculate_distance();
     });   
  }

  function checkout(){

     var error = $("#herror").val();
     var payment = 'CASH';
     var amount = $("#hgrandtotal").val();
     var rate = parseInt($("#hdeliveryrate").val());
     var distance = $("#delivery").val();


    //  if ($("#balance").val() < amount ){ toast("Saldo Wallet Anda Tidak Mencukupi");  }
     if(error != "") { toast(error); }
     else 
     {
        if ($("#rwallet").is(":checked")) { payment = "WALLET"; } 
        var nilai = '{ "payment":"'+payment+'", "amount":"'+amount+'", "cust":"'+localStorage.userid+'" }';

        $.ajax({
           type: 'POST',
           url: api+'sales/add_order',
           data : nilai,
           contentType: "application/json",
           dataType: 'json',
           success: function(data)
           {   
               if (data.status == true){ 
                   checkout_process(data.orderid); 
                }else{ toast(data.error); }
           },
           error: function (request, status, error) {
               // console.log('Request Failed...!'+error);
               console.log('Request Failed - Calculate-Shiprate'+error);
           }
       })
       return false;
     }
  }

  function checkout_process(orderid){

     var rate = parseInt($("#hdeliveryrate").val());
     var distance = $("#delivery").val();
     var coordinate = $("#hlat").val()+","+$("#hlong").val();
     var address = $("#taddress").val();

     var nilai = '{ "status": { "orderid": "'+orderid+'" }, "shipping": { "courier": "0", "distance": "'+distance+'", "coordinate": "'+coordinate+'", "destination": "'+address+'", "amount": "'+rate+'"  } }';
     
     $.ajax({
        type: 'POST',
        url: api+'sales/add_item_mobile_json',
        data : nilai,
        contentType: "application/json",
        dataType: 'json',
        success: function(data)
        {   
            var res = data.status;
            if (res.result == true){ 

                swal({
                    position: 'top-right',
                    type: 'success',
                    title: 'Checkout Success - OrderId : '+orderid,
                    text: "Pesanan Anda Sedang Diproses, Mohon tunggu konfirmasi dari admin kami.",
                    showConfirmButton: false,
                    timer: 3000
                });
                setTimeout(function(){ window.location = "index.html"; }, 3300);

            }else{ toast(res.error); }
        },
        error: function (request, status, error) {
            // console.log('Request Failed...!'+error);
            console.log('Request Failed - checkout_process'+error);
        }
    })
    return false;

  }

  // autocomplete
    // function autocompletes(){

    //     var key = event.keyCode || event.charCode;
    //     if( key == 8 || key == 46 ){ return false; }else{
    //         var places = new google.maps.places.Autocomplete(document.getElementById('taddress'));
    //         google.maps.event.addListener(places, 'place_changed', function () {
    //                     var place = places.getPlace();
    //                     // var address = place.formatted_address;
    //                     var lat = place.geometry.location.lat();
    //                     var long = place.geometry.location.lng();
    //                     // var mesg = "Address: " + address;
    //                     var mesg = "LatitudeLongitude: " + lat+" - "+long;
                    
    //                     console.log(mesg);
    //                     initMap(lat,long);
    //                     document.getElementById("hlat").value = lat;                    
    //                     document.getElementById("hlong").value = long; 
    //                     calculate_distance();
    //                 });
    //     }
    // }