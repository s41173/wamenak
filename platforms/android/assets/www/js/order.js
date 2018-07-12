var start = 0;
var limit = 30;
var reachedMax = false;

var starts = 0;
var limits = 4;
var reachedMaxs = false;

$(document).ready(function (e) {   

    ongoing();
    successed();
    canceled();

});  // end document ready	

// function orders(){

//     ongoing();
//     successed();
//     canceled();
// }

$(window).scroll(function(){
         
    if ($(window).scrollTop() == $(document).height() - $(window).height()){
        successed();
    }
    
});


function ongoing(){
       
    $(document).ready(function (e) {   
        
        var nilai = '{ "customer":"'+localStorage.userid+'", "status":"0", "limit":"'+limit+'", "start":"'+start+'" }';
        
        if (reachedMax)
            return;

        $.ajax({
            type: 'POST',
            url: api+'sales/get_sales_by_customer_json',
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {   
                var con = "";
                var total = 0;
if (data.content != null && data.content != 'reachedMax'){

                for (i=0; i<data.content.length; i++){
                    var datax = data.content;
                    total = parseInt(datax[i].total)+parseInt(datax[i].shipping);

        
con = con+
"<div class=\"col-xs-12 orderlist\">"+
"<h5 class=\"list-group-item-heading\"> OrderId : "+datax[i].code+" </h5>"+
"<hr style=\"margin: 0 0 5px 0;border:1px solid #726b6b\">"+
"<p class=\"list-group-item-text\"><b> "+idr_format(total)+" </b></p>"+
"<p class=\"list-group-item-text\"><b> "+datax[i].dates+" WIB </b></p>"+
"</div>"+
"<div class=\"col-xs-12 cancel\"> <br>"+
"<a onclick=\"detailorder("+datax[i].code+");\" class=\"tombol\"> Detail </a> &nbsp;"+
"<a onclick=\"cancelorder("+datax[i].code+");\" class=\"tombol\"> Batalkan Pesanan </a>"+
"<hr> </div>";
                
                } // end looping

                start += limit;
                $("#ongoingbox").append(con);
}else{ reachedMax = true; }
            },
            error: function (request, status, error) {
                console.log('Request Failed...!'+error);
            }
        })
        return false;
                
    });  // end document ready	    
}

function successed(){
       
    $(document).ready(function (e) {   
        
        var nilai = '{ "customer":"'+localStorage.userid+'", "status":"1", "limit":"'+limits+'", "start":"'+starts+'" }';
        
        if (reachedMaxs)
            return;

        $.ajax({
            type: 'POST',
            url: api+'sales/get_sales_by_customer_json',
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {   
                var con = "";
                var total = 0;
if (data.content != null && data.content != 'reachedMax'){

                for (i=0; i<data.content.length; i++){
                    var datax = data.content;
                    total = parseInt(datax[i].total)+parseInt(datax[i].shipping);

        
con = con+
"<div class=\"col-xs-12 orderlist\">"+
"<h5 class=\"list-group-item-heading\"> OrderId : "+datax[i].code+" </h5>"+
"<hr style=\"margin: 0 0 5px 0;border:1px solid #726b6b\">"+
"<p class=\"list-group-item-text\"><b> "+idr_format(total)+" </b></p>"+
"<p class=\"list-group-item-text\"><b> "+datax[i].dates+" WIB </b></p>"+
"</div>"+
"<div class=\"col-xs-12 cancel\"> <br>"+
"<a onclick=\"detailorder("+datax[i].code+");\" class=\"tombol\"> Detail </a> &nbsp;"+
"<hr> </div>";
                
                } // end looping
                starts += limits;
                $("#successbox").append(con);
}else{ reachedMaxs = true; }
            },
            error: function (request, status, error) {
                console.log('Request Failed...!'+error);
            }
        })
        return false;
                
    });  // end document ready	    
}

function canceled(){
       
    $(document).ready(function (e) {   
        
        var nilai = '{ "customer":"'+localStorage.userid+'", "limit":"30" }';
        
        $.ajax({
            type: 'POST',
            url: api+'sales/get_canceled_by_customer_json',
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {   
                var con = "";
                var total = 0;
if (data.content != null){

                for (i=0; i<data.content.length; i++){
                    var datax = data.content;
                    total = parseInt(datax[i].total)+parseInt(datax[i].shipping);

con = con+
"<div class=\"col-xs-12 orderlist\">"+
"<h5 class=\"list-group-item-heading\"> OrderId : "+datax[i].code+" </h5>"+
"<hr style=\"margin: 0 0 5px 0;border:1px solid #726b6b\">"+
"<p class=\"list-group-item-text\"><b> "+idr_format(total)+" </b></p>"+
"<p class=\"list-group-item-text\"><b> "+datax[i].dates+" WIB </b></p>"+
"</div>"+
"<div class=\"col-xs-12 cancel\"> <br>"+
"<hr> </div>";
                
                } // end looping
              
                $("#canceledbox").html(con);
}
            },
            error: function (request, status, error) {
                console.log('Request Failed...!'+error);
            }
        })
        return false;
                
    });  // end document ready	    
}

function detailorder(code){

    $(document).ready(function (e) {   
      $("#myModal").modal('show');
      
    $.get(api+"sales/get_sales_transaction_json/"+code, function(data, status){
          
        var con = "";
        var sales = data.content[0];
        var shipping = data.shipping[0];
        var transaction = data.transaction;
        var total = parseInt(sales.total)+parseInt(sales.shipping);

        $("#transtitle").html(sales.code+" - "+sales.payment_type);
        $("#transdate").html(sales.dates+" WIB");
        $("#address").html(shipping.destination);
        $("#courrier").html(shipping.courier);
        $("#shipcost").html(idr_format(shipping.amount));
        $("#gtotal").html(idr_format(total));

        for (i=0; i<transaction.length; i++){

con = con+"<div style=\"width:40%; float:left;\">"+
          "<img src=\""+transaction[i].image+"\" class=\"img-responsive\">"+
          "</div>"+
          "<div style=\"width:55%; float:left; margin-left:10px;\">"+
          "<span class=\"prodetail\"> "+capitalizeFirstLetter(transaction[i].product)+" </span> <br>"+
          "<span class=\"prodetail\"> ("+transaction[i].qty+") - "+idr_format(transaction[i].amount)+" </span> <br>"+
          "<span class=\"prodetail\"> "+transaction[i].description+" </span>"+
          "</div> <div class=\"clear\"></div> <br>";
        }

       $("#prodetailbox").html(con);
    });


    });  // end document ready	 
}

function cancelorder(uid){

    $(document).ready(function (e) {   
        $("#myModal2").modal('show');
        $("#horder").val(uid);
        $("#cancelorder").html(uid);
      });  // end document ready	 
}

function submit_cancel(){
    $(document).ready(function (e) {   
        var order = $("#horder").val();
        var desc = $("#tdescription").val();
        if (desc != ""){
            
            var nilai = '{ "orderid":"'+order+'", "desc":"'+desc+'" }';
        
            $.ajax({
                type: 'POST',
                url: api+'sales/cancel_order_json',
                data : nilai,
                contentType: "application/json",
                dataType: 'json',
                success: function(data)
                {   
                  if (data.status == true){ 
                      toast(data.error);
                      $("#myModal2").modal('hide');
                      setTimeout(function(){ location.reload(); }, 1500);
                  }else{ toast(data.error); $("#tdescription").val(""); }
                },
                error: function (request, status, error) {
                    console.log('Request Failed...!'+error);
                }
            })
            return false;

        }else{ toast('Alasan Pembatalan Pesanan Diperlukan'); $("#tdescription").focus(); }
    });  // end document ready	 
}
