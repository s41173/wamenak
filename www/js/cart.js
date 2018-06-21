$(document).ready(function(e){ 


}); // end document ready

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
        $("#ttotal").html("Rp "+idr_format(total.amount_publish)); 

        }else{  $("#ringkasan").html(""); $("#ttotal").html("Rp 0"); }
    });   

}