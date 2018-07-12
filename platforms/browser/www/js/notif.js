function notif(){

    localStorage.removeItem("notifid");
    $("#notifbox").html("");
    var con = "";
    var img = "notif.png";
    var mess = "";
    $.get(api+"/notif/get_notif/"+localStorage.userid, function(data, status){
        
        if (data){
            for (i=0; i<data.content.length; i++){
                var datax = data.content;
    
                if (datax[i].reading == 0){
                  mess = "<b>"+datax[i].subject+"</b> <br> <span class=\"unread\"><b> "+datax[i].created+" </b></span>";
                }else{
                  img = "notif-read.png";  
                  mess = "<span>"+datax[i].subject+"</span> <span class=\"read\"><p>"+datax[i].created+"</p></span>";  
                }
    con = con+"<a onclick=\"notif_set("+datax[i].id+")\" style=\"color:#000; text-decoration: none;\">"+
              "<div class=\"notif-icon\">"+
                "<img src=\"img/"+img+"\" width=\"25\">"+
              "</div>"+
    "<div class=\"notif-text\">"+mess+
    "</div>"+
    "<i class=\"fa fa-chevron-right notif-arrow\" aria-hidden=\"true\"></i>"+
    "</a>"+
    "<hr style=\"margin-top: -10px;\">";
    
            }
            $("#notifbox").html(con);
        }

    }); 
}

function notif_set(uid){
    localStorage.setItem("notifid", uid);
    window.location = "notif-message.html";
}

function notif_detail(){

    $.get(api+"/notif/detail/"+localStorage.notifid, function(data, status){
    
        $("#notif-title").html(data.subject);
        $("#notif-time").html(data.created);
        $("#notif-text").html(data.content);
        
    }); 
}

function remove_notif(){

    $.get(api+"/notif/remove/"+localStorage.userid, function(data, status){
        if (data.status == true){ setTimeout(function(){ location.reload(); }, 1000); toast("Notification Cleared"); }
    }); 
}

function remove_notif_id(){

    $.get(api+"/notif/remove_id/"+localStorage.notifid, function(data, status){
        if (data.status == true){ setTimeout(function(){ window.location='notif.html'; }, 1000); toast("Notification Removed"); }
    }); 
}