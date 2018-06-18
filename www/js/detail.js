function details(){
       
    $(document).ready(function (e) {   
    
        $.get(api+"product/product_detail/"+localStorage.pid, function(data, status){
            
            var datax = data.content[0];
            console.log(datax);
            $("#proimage").attr("src",datax.image);
            $("#protitle").html(capitalizeFirstLetter(datax.name));
            $("#price").html("Rp "+idr_format(datax.price));
        });
                
    });  // end document ready	    
}