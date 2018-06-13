$(document).ready(function(){ 
  
    $('#result').hide();
    
  // glass type
  $('#cglasstype').change(function() {

      var val = $("#cglasstype").val();
      $.ajax({
          type: 'POST',
          url: "http://calculator.dswip.com/api/get_glass/"+val+"/memilih",
          data: $(this).serialize(),
          success: function(data)
          {
             document.getElementById("glassbox").innerHTML = data;
          }
      })
      return false;
  }); 
  
   $('#tombol').click(function() {
    
        var width = $("#twidth").val();
        var height = $("#theight").val();
        var heightkm = $("#theightkm").val();
        var heightkm1 = $("#theightkm1").val();
        var color = $("#ccolor").val();
        var glasstype = $("#cglasstype").val();
        var glassid = $("#cglass").val();
        var kusen = $("#csills").val();

        var pid = $("#pid").val();
        var nilai = '{ "pid":"'+pid+'", "width":"'+width+'", "height": "'+height+'", "heightkmtop": "'+heightkm+'",'+
                        '"heightkmbot": "'+heightkm1+'", "color": "'+color+'", "type": "'+glasstype+'", "kusen": "'+kusen+'", "glass": "'+glassid+'", "group": "'+group+'" }';
        
        if (width != "" && height != "" &&  heightkm != "" && heightkm1 != "" && color != "" && glasstype != "" && glassid != "" && glassid != "undefined" && kusen != "" ){
        $.ajax({
            type: 'POST',
            url: urlx,
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {
                if (parseInt(data.total_unformat) <= 1000000){
                    // $("#total").html('0'); 
                    swal('No Result..!!', '', 'warning');  
                    $("#result").hide();                     
                }else{
                    $("#result").show();   
                    $("#lebar").html(width); 
                    $("#tinggi").html(height); 
                    $("#total").html(data.total); 

                    // set parameter hidden value
                    $("#width").val(width); $("#height").val(height); $("#fixed_top").val(heightkm); $("#fixed_bot").val(heightkm1); $("#color").val(color);
                    $("#glasstype").val(glasstype); $("#glass_id").val(glassid); $("#frame").val(kusen); $("#ttotal").val(data.total_unformat);      
                }
            },
            error: function (request, status, error) {
                swal('Request Failed...!', "", "error");
            }
        })
        return false;
        }else{ swal('Dimension & Attribute Required...!', "", "error");  } // end validation

    });

    $("#tqty").keyup(function(){

        var qty = $(this).val();
        var tot = $("#ttotal").val();
        var res = parseFloat(qty*tot);
        
        $("#total").html(idr_format(res)); 
    });

    $("#bcart").click(function(){
        
        var width = $("#width").val();
        var height = $("#height").val();
        var heightkm = $("#fixed_top").val();
        var heightkm1 = $("#fixed_bot").val();
        var color = $("#color").val();
        var glasstype = $("#glasstype").val();
        var glassid = $("#glass_id").val();
        var kusen = $("#frame").val();
        var desc = $("#tdesc").val();

        var attribute = width+'|'+height+'|'+heightkm+'|'+heightkm1+'|'+color+'|'+glasstype+'|'+glassid+'|'+kusen;
        var pid = $("#pid").val();
        var qty = $("#tqty").val();
        var tot = $("#ttotal").val();

        var nilai = '{ "agent_id":"'+agent+'", "product_id":"'+pid+'", "qty": "'+qty+'", "price": "'+tot+'",'+
                     '"attribute": "'+attribute+'", "description": "'+desc+'"}';

        if (tot != "0" && agent != "" &&  pid != "" && qty != "0" && attribute != "" ){
        $.ajax({
            type: 'POST',
            url: cart_url,
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {
                if (data.status == true){  

                    swal({
                        position: 'top-right',
                        type: 'success',
                        title: 'Item added to cart',
                        showConfirmButton: false,
                        timer: 1500
                      })

                    // fungsi untuk update cart status
                    $("#twidth,#theight,#theightkm,#theightkm1").val('');
                    $("#cglass").hide();
                    $("#result").hide();  
                    load_cart();
                }
                else{ swal('Failed to added cart!', "", "error"); }
            },
            error: function (request, status, error) {
                swal('Request Failed...!', "", "error");
            }
        })
        return false;
        }else{ swal('Dimension & Attribute Required...!', "", "error");  } // end validation

    });


}); // end document ready

function idr_format(val){

    var bilangan = val;
	
    var	number_string = bilangan.toString(),
        sisa 	= number_string.length % 3,
        rupiah 	= number_string.substr(0, sisa),
        ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
            
    if (ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    // Cetak hasil
    return rupiah;
}