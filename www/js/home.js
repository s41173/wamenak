function home(){

    localStorage.removeItem("pid"); // remove product id
    slider();
    recommended();
    sidemenu();
    var x = document.getElementById("usernamex");
    x.innerHTML=capitalizeFirstLetter(localStorage.username);
}

function slider(){
       
    $(document).ready(function (e) {   
    
        $("#sliderbox").html("");
        $.get(api+"api/slider", function(data, status){
            
            var con = "";
            var classname = "";
            for (i=0; i<data.content.length; i++){
                var datax = data.content;

if (i==0){ classname = "item active banner"; }else{ classname = "item banner"; }
con = con+"<div class=\""+classname+"\" style=\"background-image: url("+datax[i].image+")\">"+
"<div class=\"caption\">"+
"<div class=\"containerx\" id=\"capti\">"+
      "<p class=\"\" id=\"\"></p>"+
      "<br><br><br><br>"+
      "<a class=\"\">.</a>"+
  "</div>"+                
"</div>"+
"</div>";
            }

            $("#sliderbox").html(con);
        });
                
    });  // end document ready	    
}

function recommended(){

    $(document).ready(function (e) {   
        
        $("#recommendbox").html("");
        $.get(api+"product/get_list/0/recommend", function(data, status){
            
            var title = "<h1 class=\"text-center\" style=\"font-family:'Josefin Sans'; font-size: 18px;\">Recommended</h1>";
            var con = "";
            
            var titlecarousel = "<div class=\"owl-carousel owl-theme\">";
            var end = "</div> <hr>";

            for (i=0; i<data.content.length; i++){
                var datax = data.content;
con = con+
"<div>"+
  "<div id=\"img\">"+
      "<img class=\"img-responsive\" onclick=\"detail("+datax[i].id+");\" src=\""+datax[i].image+"\">"+
  "</div>"+
  "<div class=\"caption\">"+
      "<div class=\"title\">"+
          "<a>"+capitalizeFirstLetter(datax[i].name)+"</a>"+
          "<div id=\"rateYo\"><i class=\"fa fa-star\" aria-hidden=\"true\"></i><i class=\"fa fa-star\" aria-hidden=\"true\"></i><i class=\"fa fa-star\" aria-hidden=\"true\"></i><i class=\"fa fa-star\" aria-hidden=\"true\"></i></div>"+
          "<p> Rp "+idr_format(datax[i].price)+" </p>"+
      "</div>"+
      "<a class=\"btn btn-default\" id=\"tombol\" onclick=\"add_cart("+datax[i].id+");\">Tambahkan ke Cart </a>"+
  "</div>"+
"</div>";
            }

            con = titlecarousel+con+end;

           $("#recommendbox").html(title+con);
           category();
        });
                
    });  // end document ready	

}

function category(){
       
    $(document).ready(function (e) {   
        
        $("#catbox").html("");
        $.get(api+"api/category", function(data, status){
            
            var con = "";
            var classname = "";
            for (i=0; i<data.content.length; i++){
                var datax = data.content;

con = "<h1 class=\"text-center\" style=\"font-family:'Josefin Sans'; font-size: 18px;\">"+capitalizeFirstLetter(datax[i].name)+"</h1>";
itemlist(con,datax[i].id)
            }

        //    $("#catbox").html(con);
        //    carousel();
        }); // ajax cactegory end

        var itemlist = function(header,cat){

    var res = null;
    $.get(api+"product/get_list/"+cat, function(data, status){
    
        var con = "";
        var title = "<div class=\"owl-carousel owl-theme\">";
        var end = "</div> <hr>";

        for (i=0; i<data.content.length; i++){
            var datax = data.content;

con = con+
"<div>"+
    "<div id=\"img\">"+
        "<img class=\"img-responsive\" onclick=\"detail("+datax[i].id+");\" src=\""+datax[i].image+"\">"+
    "</div>"+
    "<div class=\"caption\">"+
        "<div class=\"title\">"+
            "<a>"+capitalizeFirstLetter(datax[i].name)+"</a>"+
            "<div id=\"rateYo\"><i class=\"fa fa-star\" aria-hidden=\"true\"></i><i class=\"fa fa-star\" aria-hidden=\"true\"></i><i class=\"fa fa-star\" aria-hidden=\"true\"></i><i class=\"fa fa-star\" aria-hidden=\"true\"></i></div>"+
            "<p> Rp "+idr_format(datax[i].price)+" </p>"+
        "</div>"+
        "<a class=\"btn btn-default\" id=\"tombol\" onclick=\"add_cart("+datax[i].id+");\">Tambahkan ke Cart</a>"+
    "</div>"+
"</div>";
        
        } // end looping
        con = title+con+end;
      
           $("#catbox").append(header+con);
           carousel();
    }); // ajax get request

  
      } // end function item list
                
    });  // end document ready	    
}

function carousel(){
  
    $(document).ready(function (e) {   

        $('.owl-carousel').owlCarousel({
            loop:true,
            margin:10,
            responsiveClass:true,
            responsive:{
                0:{
                    items:1,
                    nav:true
                },
                600:{
                    items:3,
                    nav:false
                },
                1000:{
                    items:5,
                    nav:true,
                    loop:false
                }
            }
        })

    });  // end document ready
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

function detail(pid){
    
    localStorage.setItem("pid", pid);
    window.location = "detail.html";
}

function sidemenu(){

    var con = "";
    if (localStorage.userid != undefined && localStorage.log != undefined){

con  = "<li><a onclick=\"otentikasi('profil');\">Akun Saya</a></li>"+
       "<li><a onclick=\"otentikasi('order');\"> Daftar Pesanan </a></li>"+
       "<li><a onclick=\"otentikasi('notif');\">Notifikasi</a></li>"+
       "<li><a href=\"cara-pesan.html\">Cara Pesan</a></li>"+
       "<li><a href=\"about.html\">Tentang Kami</a></li>"+
       "<li><a href=\"contact.html\">Hubungi Kami</a></li>";
    }else{

con  =  "<li><a href=\"login.html\">Login</a></li>"+
        "<li><a href=\"cara-pesan.html\">Cara Pesan</a></li>"+
        "<li><a href=\"tips.html\">Tips</a></li>"+
        "<li><a href=\"about.html\">Tentang Kami</a></li>"+
        "<li><a href=\"contact.html\">Hubungi Kami</a></li>";
    }
    $("#sidemenu").append(con);
}