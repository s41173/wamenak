function details(){
       
    $(document).ready(function (e) {   
    
        $.get(api+"product/product_detail/"+localStorage.pid, function(data, status){
            
            var datax = data.content[0];
            $("#proimage").attr("src",datax.image);
            $("#protitle").html(capitalizeFirstLetter(datax.name));
            $("#price").html("Rp "+idr_format(datax.price));
            $("#tab1").html(datax.description);
            $("#hname").val(datax.name);

            if (datax.restricted == 0){ $("#status").html(""); }else{ $("#status").html("Tersedia : "+datax.start+" - "+datax.end+" WIB"); }
        });
                
    });  // end document ready	    
}

$(document).ready(function (e) {  

    $('#tombol').click(function() {

        if (localStorage.userid){ 
            
          $("#myModal").modal('show');
          $("#prodesc").html(capitalizeFirstLetter($("#hname").val())+" : "+$("#tqty").val()+" pcs");

        }else{ toast("Silahkan masuk sebelum membeli produk ini"); }
    });
    
    $('#border').click(function() {
        
        var nilai = '{ "customer":"'+localStorage.userid+'", "product_id":"'+localStorage.pid+'", "qty":"'+$("#tqty").val()+'", "description":"'+$("#tdescription").val()+'", "attribute":"" }';
        
        $.ajax({
            type: 'POST',
            url: api+'cart/add',
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {   
              if (data.status == true){ 
                $("#tdescription").html = ""; 
                $("#myModal").modal('hide');
                  setTimeout(function(){ toast("Produk berhasil ditambahkan"); }, 1000);
              }else{ toast(data.error); }
            },
            error: function (request, status, error) {
                console.log('Request Failed...!'+error);
            }
        })
        return false;
        
    });

});  // end document ready
