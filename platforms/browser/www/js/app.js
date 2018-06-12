var api = "http://calculator.dswip.com/";  

$(document).ready(function (e) {  

    $(document).on('keyup','.qtytext',function(e)
    {	
        e.preventDefault();
        var element = $(this);
        var id = element.attr("id");
        var qty = $(this).val();

        var nilai = '{ "id":"'+id+'", "qty":"'+qty+'" }';

        var key = event.keyCode || event.charCode;
        if( key == 8 || key == 46 || qty == 0 ){ return false; }else{

            console.log(nilai);
            $.ajax({
                type: 'POST',
                url: api+"cart/update",
                data : nilai,
                contentType: "application/json",
                dataType: 'json',
                success: function(data)
                {
                    if (data.status == true){
                        location.reload();
                    }
                    else{ swal('Failed to update items!', "", "error"); }
                },
                error: function (request, status, error) {
                    swal('Request Failed...!', "", "error");
                }
            })
            return false;
        }

    });

    $(document).on('click','#border',function(e)
    {	
        window.location.href = "order.html";
    });


$('#submit').click(function() {
    
    var width = $("#twidth").val();
    var height = $("#theight").val();
    var heightkm = $("#theightkm").val();
    var heightkm1 = $("#theightkm1").val();
    var color = $("#ccolor").val();
    var glasstype = $("#cglasstype").val();
    var glassid = $("#cglass").val();
    var kusen = $("#csills").val();
    var pid = localStorage.getItem("pid");
    var group = localStorage.getItem("group");

    var nilai = '{ "pid":"'+pid+'", "width":"'+width+'", "height": "'+height+'", "heightkmtop": "'+heightkm+'",'+
                  '"heightkmbot": "'+heightkm1+'", "color": "'+color+'", "type": "'+glasstype+'", "kusen": "'+kusen+'", "glass": "'+glassid+'", "group": "'+group+'"}';

    var con = "";

    if (width != "" && height != "" &&  heightkm != "" && heightkm1 != "" && color != "" && glasstype != "" && glassid != "" && glassid != "undefined" && kusen != "" ){
    $.ajax({
        type: 'POST',
        url: api+'api/calculator/',
        data : nilai,
        contentType: "application/json",
        dataType: 'json',
        success: function(data)
        {
            $("#material_table tbody").empty();
            for (i=0; i<data.content.length; i++){
                    var datax = data.content;
               
 con = "<tr> <td class=\"text-center\">"+datax[i].no+"</td> <td>"+datax[i].name+"</td> <td class=\"text-center\">"+datax[i].size+" m <sup>2</sup> </td> <td class=\"text-right\">"+datax[i].amount+"</td> </tr>"; 
//  $("#material_table").append(con);
                }

            $("#htotal").html(data.total);
            $("#hdtotal").val(data.total_unformat);
            $("#bcart").show();

        },
        error: function (request, status, error) {
            alert('Request Failed Calculator...!');
        }
    })
    return false;
   }else{ alert("Dimension Required..!!"); } // end validation
});

});  // end document ready	

 function get_series(){
       
    $(document).ready(function (e) {   
       
        var param = localStorage.getItem("category");
        
        var nilai = '{ "category":"'+param+'"}';
        $("#cattitle").html(localStorage.getItem("catname").toUpperCase());       
        
        $.ajax({
            type: 'POST',
            url: api+'api/series/',
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data) 
            {
              for (i=0; i<data.content.length; i++){
var datax = data.content;  
var con = "<a onclick=\"product("+datax[i].id+",'"+datax[i].name+"');\" href=\"#\" class=\"list-group-item\"> "+datax[i].name.toUpperCase()+" <span>&raquo;</span></a>";
                  
        $("#list").append(con);        
                  
              }
            },
            error: function (request, status, error) {
                alert('Request Failed Get Series...! - '+error);
            }
        }) 
        return false;
        
    });  // end document ready	
       
}

 function get_product(){
       
    $(document).ready(function (e) {   
       
        var category = localStorage.getItem("category");
        var model = localStorage.getItem("model");
        var nilai = '{ "category":"'+category+'", "model": "'+model+'"}';

        $("#pro_title").html(localStorage.getItem("catname").toUpperCase()+" - "+localStorage.getItem("modelname").toUpperCase());
        
        $.ajax({
            type: 'POST',
            url: api+'api/product/',
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data) 
            {
              for (i=0; i<data.content.length; i++){
var datax = data.content;  

//var con = "<a onclick=\"product("+datax[i].id+");\" href=\"#\" class=\"list-group-item\"> "+datax[i].name.toUpperCase()+" <span>&raquo;</span></a>";
                  
var con = "<a onclick=\"calculator("+datax[i].id+");\" href=\"#\" class=\"list-group-item row\">"+
             "<div class=\"col-xs-8 detail\">"+
                  "<h4 class=\"list-group-item-heading\"> "+datax[i].name.toUpperCase()+" </h4>"+
                  "<p class=\"list-group-item-text\"> "+datax[i].sku+" </p>"+
             "</div>"+
             "<div class=\"col-xs-4\">"+
                   "<img src=\""+datax[i].image+"\" class=\"img-responsive\">"+
             "</div>"+
         "</a>";
                  
       $("#pro-list").append(con);        
                  
              }

            },
            error: function (request, status, error) {
                alert('Request Failed Get Product...!');
            }
        }) 
        return false;
        
    });  // end document ready	  
}

   function get_product_details(){
    
 $(document).ready(function (e) {   
    
     var pid = localStorage.getItem("pid");
     var nilai = '{ "pid":"'+pid+'" }';
     
     $.ajax({
         type: 'POST',
         url: api+'api/product_detail/',
         data : nilai,
         contentType: "application/json",
         dataType: 'json',
         success: function(data) 
         {
           for (i=0; i<data.content.length; i++){
var datax = data.content;  

$("#protitle").html(datax[i].sku.toUpperCase()+" : "+datax[i].name.toUpperCase()); 
$("#proimg").attr("src",datax[i].image);        
// $("#material_table").hide();
combo_color(pid);

           }

         },
         error: function (request, status, error) {
             alert('Request Failed Get Product Details...!');
         }
     }) 
     return false;
     
 });  // end document ready	
    
}

function combo_color(pid){
    
    $(document).ready(function (e) {
        
        $.ajax({
            type: 'POST',
            url: api+"api/get_color/"+pid,
            data: $(this).serialize(),
            success: function(data)
            {
                document.getElementById("colorbox").innerHTML = data;
            }
        })
        return false;
        
    });  // end document ready	
}

function combo_type(){
    
    $(document).ready(function (e) {
        
        $.ajax({
            type: 'POST',
            url: api+"api/get_type_combo/"+localStorage.model,
            data: $(this).serialize(),
            success: function(data)
            {
                document.getElementById("typebox").innerHTML = data;
            }
        })
        return false;
        
    });  // end document ready	
}

function get_glass(){
    
    $(document).ready(function (e) {
        var val = $("#cglasstype").val();
        $.ajax({
            type: 'POST',
            url: api+"api/get_glass/"+val,
            data: $(this).serialize(),
            success: function(data)
            {
                document.getElementById("glassbox").innerHTML = data;
                $("#bcart").hide();
            }
        })
        return false;

    });  // end document ready	
}

function get_cart(){
    
    $(document).ready(function (e) {

        var nilai = '{ "agent_id":"'+localStorage.getItem("userid")+'" }';

        $.ajax({
            type: 'POST',
            url: api+"cart/get/",
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data) 
            {
              var html = "";
              for (i=0; i<data.content.length; i++){
   var datax = data.content;  
   var res = datax[i].attribute.split("|");

   html = html+"<tr> <td> <img class=\"img-responsive\" src=\""+datax[i].image+"\"> </td>"+
   "<td> <h4 class=\"list-group-item-heading\"> "+datax[i].product.toUpperCase()+" </h4>"+
       
   "<p class=\"list-group-item-text\">Series : "+datax[i].model+" <br> size : "+res[0]+" m X "+res[1]+" m ("+res[2]+" - "+res[3]+") <br> Color : "+datax[i].color+" <br> "+res[5]+" GLASS SYSTEM <br> "+datax[i].glass+" </p>"+
   "<p class=\"pdesc\"> "+datax[i].description+" </p>"+
   "</td>"+
   "<td> <br> <input type=\"number\" id=\""+datax[i].id+"\" class=\"form-control qtytext\" maxlength=\"3\" value=\""+datax[i].qty+"\" > </td>"+
   "<td>"+
   "<h5 class=\"text-right cost\">Rp. "+idr_format(datax[i].amount)+" <br> </h5>"+
        "<button class=\"tombol\" onclick=\"remove_cart("+datax[i].id+");\" ><i class=\"fas fa-trash-alt\"></i> </button>"+
   "</td> </tr> ";
              }

              $("#carttable").html(html);

              var total = data.total;
              $("#gtotal").html(idr_format(parseInt(total.amount_unpublish+total.amount_publish)));
              $(".subtotal").show();

            },
            error: function (request, status, error) {
                console.log('Request Failed...!');
            }
        }) 
        return false;

    });  // end document ready	
}

function remove_cart(val){
  
    var pid = localStorage.getItem("pid");
    var nilai = '{ "id":"'+val+'" }';
    
    $.ajax({
        type: 'POST',
        url: api+'cart/delete/',
        data : nilai,
        contentType: "application/json",
        dataType: 'json',
        success: function(data) 
        {
            if (data.status == true){
                swal({
                    position: 'top-right',
                    type: 'success',
                    title: 'Item Removed',
                    showConfirmButton: false,
                    timer: 1500
                    });
                location.reload();    

            }else{ swal(data.error, "", "error"); }
        },
        error: function (request, status, error) {
            alert('Request Failed - Remove Cart...!');
        }
    }) 
    return false;

}

function set_attr_transaction(type=0){

    localStorage.setItem("ordertype", type);
    window.location.href = "complete_order.html";
}

function transaction(type=0,limit=10,storage=0){

    if (storage == 0){ var types = type; }else{ var types = localStorage.getItem("ordertype"); }
    if (types == 0){
        var nilai = '{ "agent_id":"'+localStorage.getItem("userid")+'", "confirm":"0", "limit":"'+limit+'" }';
        var status = 'Pending'; var table = "#table0";
        var url = 'sales/get_sales_by_agent_json/'; 
    }else if(types == 1){
        var nilai = '{ "agent_id":"'+localStorage.getItem("userid")+'", "status":"C", "limit":"'+limit+'" }';
        var status = 'Processed'; var table = "#table1";
        var url = 'sales/get_sales_status_by_agent_json/'; 
    } else if(types == 2){
        var nilai = '{ "agent_id":"'+localStorage.getItem("userid")+'", "status":"S", "limit":"'+limit+'" }';
        var status = 'Processed'; var table = "#table2";
        var url = 'sales/get_sales_status_by_agent_json/'; 
    } 
    if (storage == 1){ var table = "#table_complete"; }

    $.ajax({
        type: 'POST',
        url: api+url,
        data : nilai,
        contentType: "application/json",
        dataType: 'json',
        success: function(data) 
        {
            var html = "";
            if (data.content != null){
                for (i=0; i<data.content.length; i++){
                var datax = data.content;  
                html = html+" <tr> <td> <p> <b> "+datax[i].code+" </b> <br> "+datax[i].dates+" </p> </td>"+
                            " <td> <p> <b class=\"red\"> "+idr_format(datax[i].amount)+" </b> <br> "+status+" / "+datax[i].customer+" </p> </td> </tr>";
                }
                
                $(table).html(html);
            }
        },
        error: function (request, status, error) {
            alert('Request Failed Get Transaction...!');
        }
    }) 
    return false; 
    localStorage.removeItem("ordertype");
}

function idr_format(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
        val = val.toString().replace(/(\d+)(\d{3})/, '$1'+'.'+'$2');
    }
    var val = val+',-';
    return val;
}
