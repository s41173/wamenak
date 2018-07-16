var start = 0;
var limit = 6;
var reachedMax = false;

$(window).scroll(function(){
         
    if ($(window).scrollTop() == $(document).height() - $(window).height()){
        getmore();
    }
    
});



function getmore(){
    
    $(document).ready(function (e) {   
            
        if (reachedMax) return;
        $.get(api+"product/get_list/"+localStorage.cat+"/null/"+limit+"/"+start, function(data, status){
            
if (data.content != null && data.content != 'reachedMax'){
            var con = "";
            for (i=0; i<data.content.length; i++){
                var datax = data.content;

con = con+"<div class=\"col-xs-6 vmenu\">"+
      "<img src=\""+datax[i].image+"\" onclick=\"detail("+datax[i].id+");\" class=\"img-responsive\">"+
      "<span class=\"ff2\">"+capitalizeFirstLetter(datax[i].name)+"</span><br>"+
      "<span class=\"fat\"> Rp "+idr_format(datax[i].price)+" </span><br>"+
      "<div id=\"rateYo\"><i class=\"fa fa-star\" aria-hidden=\"true\"></i><i class=\"fa fa-star\" aria-hidden=\"true\"></i><i class=\"fa fa-star\" aria-hidden=\"true\"></i><i class=\"fa fa-star\" aria-hidden=\"true\"></i></div>"+
      "<a class=\"btnct ff2\" onclick=\"add_cart("+datax[i].id+");\">Tambahkan ke cart</a>"+
      "</div>";
            }

            // $("#morebox").html(con);
            start += limit;
            $("#morebox").append(con);
}else{ reachedMax = true; }

            $("#cattitle").html(data.result);
        });
                
    });  // end document ready	    
}

function detail(pid){
    
    localStorage.setItem("pid", pid);
    window.location = "detail.html";
}

function add_cart(pid){

    if (localStorage.userid != undefined && localStorage.log != undefined){
        
        var nilai = '{ "customer":"'+localStorage.userid+'", "product_id":"'+pid+'", "qty":"1", "description":"", "attribute":"" }';
        
        $.ajax({
            type: 'POST',
            url: api+'cart/add',
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {   
              if (data.status == true){ toast("Produk berhasil ditambahkan");}else{ toast(data.error); }
            },
            error: function (request, status, error) {
                console.log('Request Failed...!'+error);
            }
        })
        return false;

    }else{ toast("Silahkan masuk sebelum membeli produk ini"); }

}