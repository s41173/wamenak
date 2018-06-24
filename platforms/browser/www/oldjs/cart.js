
$(document).ready(function(){ 


    // ajax loading

	$(document).ajaxStart(function(){
        $(".loader,.loaderdialog").css("display", "block");
    });
    $(document).ajaxComplete(function(){
        $(".loader,.loaderdialog").css("display", "none");
    });

    // edit qty di revision
    $(document).on('keyup','.tqtyrev',function(e)
    {	
        e.preventDefault();
        var element = $(this);
        var id = element.attr("id");
        var qty = $(this).val();
        var price = $("#hprice").val();

        var nilai = '{ "id":"'+id+'", "qty":"'+qty+'", "price":"'+price+'" }';

        var key = event.keyCode || event.charCode;
        if( key == 8 || key == 46 || qty == 0 ){ return false; }else{

            console.log(nilai);
            $.ajax({
                type: 'POST',
                url: cart_update,
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

// edit qty di cart
    $(document).on('keyup','.tqtycart',function(e)
    {	
        e.preventDefault();
        var element = $(this);
        var id = element.attr("id");
        var qty = $(this).val();

        var nilai = '{ "id":"'+id+'", "qty":"'+qty+'" }';

        var key = event.keyCode || event.charCode;
        if( key == 8 || key == 46 || qty == 0 ){ return false; }else{

            $.ajax({
                type: 'POST',
                url: cart_update,
                data : nilai,
                contentType: "application/json",
                dataType: 'json',
                success: function(data)
                {
                    if (data.status == true){

                        location.reload();

                    }
                    else{ swal('Failed to removed item!', "", "error"); }
                },
                error: function (request, status, error) {
                    swal('Request Failed...!', "", "error");
                }
            })
            return false;
        }

    });

    // customer shipping
    $(document).on('change','#ccust',function(e)
    {	
        e.preventDefault();
        var element = $(this);
        var id = $(this).val();

        var nilai = '{ "id":"'+id+'" }';

        if (id == ""){ $("#addbox").html(""); }

        $.ajax({
            type: 'POST',
            url: cust_details,
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {
                var datax = data.content[0];
        $("#addbox").html('<span style=\"margin-left: 25px;\"><b style=\"font-size: 14pt;\"> '+datax.name+' </b><br>'+
        '<p style=\"margin-left: 25px;\"> '+datax.shipping_address+' <br> '+datax.state+' - '+datax.city+' - '+datax.region+' - '+datax.zip+'<br> Hp : '+datax.phone+' </p> </span>');

        $("#taddress").val(datax.shipping_address+' - '+datax.state+' - '+datax.city+' - '+datax.region+' - '+datax.zip);

            },
            error: function (request, status, error) {
                swal('Request Failed...!', "", "error");
            }
        })
        return false;

    });

    $(document).on('click','#bgetcustdetails',function(e)
    {	
        e.preventDefault();
        var element = $(this);
        var id = $("#hcust").val();

        var nilai = '{ "id":"'+id+'" }';
        if (id == ""){ $("#addbox").html(""); }

        $.ajax({
            type: 'POST',
            url: cust_details,
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {
                var datax = data.content[0];
        $("#addbox").html('<span style=\"margin-left: 25px;\"><b style=\"font-size: 14pt;\"> '+datax.name+' </b><br>'+
        '<p style=\"margin-left: 25px;\"> '+datax.shipping_address+' <br> '+datax.state+' - '+datax.city+' - '+datax.region+' - '+datax.zip+'<br> Hp : '+datax.phone+' </p> </span>');

        $("#taddress").val(datax.shipping_address+' - '+datax.state+' - '+datax.city+' - '+datax.region+' - '+datax.zip);

            },
            error: function (request, status, error) {
                swal('Request Failed...!', "", "error");
            }
        })
        return false;

    });

    

    $(document).on('change','#ccity',function(e)
    {	
        var stts = $("#hstts").val();
        if (stts != 0){ calculate_weight(stts); }else{ calculate_weight(); }
        
        calculate_discount();

        e.preventDefault();
        var element = $(this);
        var val = $(this).val();
        var con = '<option value=""> -- District -- </option>';

        var nilai = '{ "city":"'+val+'" }';

        $.ajax({
            type: 'POST',
            url: district_url,
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {
                for (i=0; i<data.content.length; i++){
                    var datax = data.content[i];

    con = con+'<option value="'+datax.district+'"> '+datax.district+' </option>';

                }

        $("#distric_box").html('<select name="cdistrict" required id="cdistrict" > '+con+' </select>');

            },
            error: function (request, status, error) {
                swal('Request Failed...!', "", "error");
            }
        })
        return false;

    });

    $(document).on('change','#ccity_cust',function(e)
    {	

        e.preventDefault();
        var element = $(this);
        var val = $(this).val();

        $.ajax({
			type: 'POST',
			url: district_url+"/"+val,
    	    cache: false,
			headers: { "cache-control": "no-cache" },
			success: function(data) {
              $("#districtbox").html(data);
              $("#tdistrict").hide();
            },
            error: function (request, status, error) {
              swal('Request Failed...!', "", "error");
            }
		})
		return false;

    });


    $(document).on('change','#cdistrict',function(e)
    {	
        e.preventDefault();
        var element = $(this);
        var district = $(this).val();
        var city = $("#ccity").val();
        var con = '';

        var nilai = '{ "source":"'+cityid+'", "city":"'+city+'", "district":"'+district+'", "type":"weight", "courier":"ESL" }';

        $.ajax({
            type: 'POST',
            url: shiprate_url,
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {   
                var total = parseInt($("#httotal").val());
                var rate = parseInt(data.rate);
                
                var weight = $('#tweight').val();
                var shipping = rate*weight;
                total = parseInt(total+shipping);
                $("#boxrate").html('<i> '+weight+' x '+idr_formats(rate)+' /kg </i>'); 
                $("#landed").html(idr_formats(shipping));  
                $("#grdtotal").html(idr_formats(total));

            },
            error: function (request, status, error) {

                swal({
                    position: 'top-right',
                    type: 'error',
                    title: 'Request Failed...!',
                    showConfirmButton: false,
                    timer: 1000
                });

                $("#boxrate").html(''); 
                $("#landed").html('0');  
                $("#grdtotal").html('0');
                $("#cdistrict").hide();
                $("#ccity").val("");
            }
        })
        return false;
    });

    $(document).on('click','#cshiptype',function(e)
    {	
        var element = $(this);
        if (element.is(':checked')) { 
            st = 1;
            $('#taddress').prop('readonly', false);
        }else{ $('#taddress').prop('readonly', true); $("#ccity").val(''); $("#cdistrict").hide(); }
    
    });

    $(document).on('click','#bconfirm',function(e)
    {	
        e.preventDefault();
		var element = $(this);
		// var url = sites_assembly +"/"+ del_id;
		
        $("#payment_confirm_modal").modal('show');
        var orderid = $("#horderid").val();
        var total = $("#htotalorder").val();

        $("#tagentid").val('DA-0'+agent);    
    });

    $(document).on('click','#bhome',function(e)
    {	
        window.location.href = homepage_redirect;
    });

    // add cust modal hide
    $("#addcust").on('hidden.bs.modal', function () {
        $("#tdistrict,#hdistrict,#beditcustomer").hide();
        $("#bcustomer").show();
        $("#beditcustomer").hide();
    });

    $(document).on('click','.text-edit',function(e)
    {	
        e.preventDefault();
		var element = $(this);
		var id = element.attr("id");
        
        $("#addcust").modal('show');
        $("#tdistrict,#hdistrict,#beditcustomer").show();
        $("#bcustomer").hide();
        $("#modtitle").html("Customer Edit");
        
		// batas
        var nilai = '{ "id":"'+id+'" }';
        $.ajax({
            type: 'POST',
            url: edit_customer,
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {   
                var datax = data.content[0];
                phone = datax.phone.split("/");

                $("#hid").val(id);
                $("#fname").val(datax.name);
                $("#lname").val(datax.last_name);
                $("#temail").val(datax.email);
                $("#ctype").val(datax.type);
                $("#phone1").val(phone[0]);
                $("#phone2").val(phone[1]);
                $("#taddress").val(datax.address);
                
                $("#ccity_cust").val(datax.cityid);
                $("#cdistrict_customer").val(datax.regionid);
                $("#tdistrict").val(datax.region);
                $("#tzip").val(datax.zip);
            },
            error: function (request, status, error) {
                swal('Request Failed...!', error, "error");
            }
        })
        return false;    
    });
    

    $(document).on('click','.text-remove',function(e)
    {	
        e.preventDefault();
		var element = $(this);
		var id = element.attr("id");
        
        var nilai = '{ "id":"'+id+'" }';

        $.ajax({
            type: 'POST',
            url: remove_customer,
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {   
                if (data.status == true){

                    swal({
                        position: 'top-right',
                        type: 'success',
                        title: data.error,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    location.reload();
                }
                else{
                    swal(data.error, '', "error");
                }

            },
            error: function (request, status, error) {
                swal('Request Failed...!', error, "error");
            }
        })
        return false;    
    });

    // text edit
    $(document).on('click','.text-edit-offer',function(e)
    {	
        e.preventDefault();
		var element = $(this);
		var id = element.attr("id");
        
        $("#editcust").modal('show');

        var nilai = '{ "id":"'+id+'" }';

        $.ajax({
            type: 'POST',
            url: edit_offer,
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {   
                var datax = data.content[0];
                $("#ttext_update").val(datax.content);
                $("#imgoffer").attr("src",datax.image);
            },
            error: function (request, status, error) {
                swal('Request Failed...!', error, "error");
            }
        })
        return false;    

    });

    // text remove offer
    $(document).on('click','.text-remove-offer',function(e)
    {	
        e.preventDefault();
		var element = $(this);
		var id = element.attr("id");
        
        var nilai = '{ "id":"'+id+'" }';

        $.ajax({
            type: 'POST',
            url: remove_offer,
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {   
                if (data.status == true){

                    swal({
                        position: 'top-right',
                        type: 'success',
                        title: data.error,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    location.reload();
                }
                else{
                    swal(data.error, '', "error");
                }

            },
            error: function (request, status, error) {
                swal('Request Failed...!', error, "error");
            }
        })
        return false;    
    });

    $('#bsalesconfirm').click(function() {        
        
        var orderid = $("#horderid").val();
        var nilai = '{ "orderid":"'+orderid+'" }';

        $.ajax({
            type: 'POST',
            url: sales_post_url,
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {   
                var datax = data.status;
                if (datax.result == true){

                    swal({
                        position: 'top-right',
                        type: 'success',
                        title: datax.error,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                else{
                    swal(datax.error, '', "error");
                }

            },
            error: function (request, status, error) {
                swal('Request Failed...!', error, "error");
            }
        })
        return false;    

	});

    $('#bpaymentsubmit').click(function() {        
        
        var dates = $("#tdates").val();
        var accname = $("#taccname").val();
        var accno = $("#taccno").val();
        var bank = $("#cbank").val();
        var sourcebank = $("#tsourcebank").val();
        
        var amount = $("#tamount").val();
        var phase = $("#cphase").val();
        var orderid = $("#horderid").val();
        var mess = "";

        if (dates == ""){ mess = 'Transaction Dates Required..!!'; }
        else if (accname == ""){ mess = 'Source Account Name Required..!!'; }
        else if (accno == ""){ mess = 'Source Account No Required..!!'; }
        else if (bank == ""){ mess = 'Bank Destination Required..!!'; }
        else if (sourcebank == ""){ mess = 'Source Bank Required..!!'; }
        else if (amount == ""){ mess = 'Amount Required..!!'; }
        else if (phase == ""){ mess = 'Phase Transaction Required..!!'; }

        var nilai = '{ "phase":"'+phase+'", "sales_order":"'+orderid+'", "date":"'+dates+'", "acc_name":"'+accname+'", "acc_no":"'+accno+'", "acc_bank":"'+sourcebank+'", "amount":"'+amount+'", "bank":"'+bank+'" }';

        if (mess != ""){ swal(mess, '', "error");}else{ 
            
            $.ajax({
                type: 'POST',
                url: confirmation_url,
                data : nilai,
                contentType: "application/json",
                dataType: 'json',
                success: function(data)
                {   
                    var datax = data.status;
                    if (datax.result == true){

                        swal({
                            position: 'top-right',
                            type: 'success',
                            title: datax.error,
                            showConfirmButton: false,
                            timer: 1500
                        });

                        window.location.href = homepage_redirect;
                    }
                    else{
                        swal(datax.error, '', "error");
                    }

                },
                error: function (request, status, error) {
                    swal('Request Failed...!', error, "error");
                }
            })
            return false;    
        }

	});


    $(document).on('click','#bcheckout',function(e)
    {	
        e.preventDefault();
        var element = $(this);
        var ckbox = $("#cshiptype");
        var st = 0;
        var mess = null;
        var cust = $("#ccust").val();

        var address = $("#taddress").val();
        var city = $("#ccity").val();
        var district = $("#cdistrict").val();

        if (address == ""){ mess = 'Address Required';  }
        else if (city == ""){ mess = 'City Required';  }
        else if (district == ""){ mess = 'District Required';  }
        else if (cust == ""){ mess = 'Customer Required';  }

        if (ckbox.is(':checked')) {  st = 1; }

        var nilai = "status="+st+"&cust="+cust+"&r_address="+address+"&r_city="+city+"&r_district="+district;

        if (mess == null){

            // ajax start
            $.ajax({
                type: 'POST',
                url: checkout_process,
                data: nilai,
                cache: false,
                headers: { "cache-control": "no-cache" },
                success: function(data) {
                    res = data.split("|");
                    if (res[0] == 'true'){

                        swal({
                            position: 'top-right',
                            type: 'success',
                            title: res[1],
                            showConfirmButton: false,
                            timer: 1500
                        });

                        var url = checkout_redirect +"/"+ res[2];
                        window.location.href = url;
                        

                    }else{ swal(res[1], '', "error"); }
                },
                error: function (request, status, error) {
                    swal('Request Failed...!', error, "error");
                }
            })
            return false;	

        }else{

            // alert(mess);
            swal({
                position: 'top-right',
                type: 'error',
                title: mess,
                showConfirmButton: false,
                timer: 1500
            });
        }

    });

    // revision button
    $(document).on('click','#brevision',function(e)
    {	
        e.preventDefault();
        var element = $(this);
        var ckbox = $("#cshiptype");
        var st = 0;
        var mess = null;
        var order = $("#hstts").val();

        var address = $("#taddress").val();
        var city = $("#ccity").val();
        var district = $("#cdistrict").val();

        if (address == ""){ mess = 'Address Required';  }
        else if (city == ""){ mess = 'City Required';  }
        else if (district == ""){ mess = 'District Required';  }

        if (ckbox.is(':checked')) {  st = 1; }

        var nilai = "status="+st+"&orderid="+order+"&r_address="+address+"&r_city="+city+"&r_district="+district;
        // console.log(revision_process);

        if (mess == null){

            // ajax start
            $.ajax({
                type: 'POST',
                url: revision_process,
                data: nilai,
                cache: false,
                headers: { "cache-control": "no-cache" },
                success: function(data) {

                    res = data.split("|");
                    if (res[0] == 'true'){

                        swal({
                            position: 'top-right',
                            type: 'success',
                            title: res[1],
                            showConfirmButton: false,
                            timer: 1500
                        });

                        var url = checkout_redirect +"/"+ res[2];
                        window.location.href = url;
                        
                    }else{ swal(res[1], '', "error"); }
                },
                error: function (request, status, error) {
                    swal('Request Failed...!', error, "error");
                }
            })
            return false;	

        }else{

            // alert(mess);
            swal({
                position: 'top-right',
                type: 'error',
                title: mess,
                showConfirmButton: false,
                timer: 1500
            });
        }

    });

    $(document).on('click','#bnewcust',function(e)
    {	
        // e.preventDefault();
        $("#modtitle").html("Add New Customer");
        $("#addcust").modal('show');

        $("#fname,#lname,#temail,#phone1,#phone2,#taddress,#tzip,#ccity_cust").val('');

    });

    $(document).on('click','#bcustomer',function(e)
    {	
        e.preventDefault();
        var element = $(this);
        var ckbox = $("#cshipbox");
        var shipaddress = "";
        
        var fname = $("#fname").val();
        var lname = $("#lname").val();
        var email = $("#temail").val();
        var type = $("#ctype").val();
        var phone1 = $("#phone1").val();
        var phone2 = $("#phone2").val();
        var address = $("#taddress").val();
        
        var city = $("#ccity_cust").val();
        var district = $("#cdistrict_customer").val();
        var zip = $("#tzip").val();

        if (ckbox.is(':checked')) { shipaddress = address; }
        var mess = null;
        
        if (address == ""){ mess = 'Address Required';  }
        else if (city == ""){ mess = 'City Required';  }
        else if (district == ""){ mess = 'District Required';  }
        else if (fname == ""){ mess = 'First Name Required';  }
        else if (lname == ""){ mess = 'Last Name Required';  }
        else if (email == ""){ mess = 'Email Required';  }
        else if (type == ""){ mess = 'Customer Type Required';  }
        else if (phone1 == ""){ mess = 'Phone 1 Required';  }
        else if (phone2 == ""){ mess = 'Phone 2 Required';  }
        else if (zip == ""){ mess = 'Zip Required'; }

        var nilai = '{ "fname":"'+fname+'", "lname":"'+lname+'", "agent":"'+agent+'", "type":"'+type+'", "address":"'+address+'", "ship_address":"'+shipaddress+'", "phone1":"'+phone1+'", "phone2":"'+phone2+'", "email":"'+email+'", "region":"'+district+'", "city":"'+city+'", "zip":"'+zip+'" }';

        if (mess == null){

            $.ajax({
                type: 'POST',
                url: add_customer,
                data : nilai,
                contentType: "application/json",
                dataType: 'json',
                success: function(data)
                {   
                    if (data.status == true){
                        
                        swal({
                            position: 'top-right',
                            type: 'success',
                            title: data.error,
                            showConfirmButton: false,
                            timer: 1500
                        });

                        location.reload();

                    }else{ swal(data.error, '', "error"); }

                },
                error: function (request, status, error) {
                    swal('Request Failed...!', error, "error");
                }
            })
            return false;
        }else{

            // alert(mess);
            swal({
                position: 'top-right',
                type: 'error',
                title: mess,
                showConfirmButton: false,
                timer: 1500
            });
        }

    });

    $(document).on('click','#baddcustomer',function(e)
    {	
        window.location.href = add_cust;
    });

    $(document).on('click','#beditcustomer',function(e)
    {	
        e.preventDefault();
        var element = $(this);
        var ckbox = $("#cshipbox");
        var shipaddress = "";
        
        var fname = $("#fname").val();
        var lname = $("#lname").val();
        var email = $("#temail").val();
        var type = $("#ctype").val();
        var phone1 = $("#phone1").val();
        var phone2 = $("#phone2").val();
        var address = $("#taddress").val();
        var id = $("#hid").val();
        
        var city = $("#ccity_cust").val();
        var district = $("#cdistrict_customer").val();
        var zip = $("#tzip").val();
        var stts = 'null';

        if (ckbox.is(':checked')) { shipaddress = address; }
        if (district){ stts = 'update'; }
        var mess = null;
        
        if (address == ""){ mess = 'Address Required';  }
        else if (city == ""){ mess = 'City Required';  }
        else if (fname == ""){ mess = 'First Name Required';  }
        else if (lname == ""){ mess = 'Last Name Required';  }
        else if (email == ""){ mess = 'Email Required';  }
        else if (type == ""){ mess = 'Customer Type Required';  }
        else if (phone1 == ""){ mess = 'Phone 1 Required';  }
        else if (phone2 == ""){ mess = 'Phone 2 Required';  }
        else if (zip == ""){ mess = 'Zip Required'; }

        var nilai = '{ "id":"'+id+'", "fname":"'+fname+'", "lname":"'+lname+'", "agent":"'+agent+'", "type":"'+type+'", "address":"'+address+'", "ship_address":"'+shipaddress+'", "phone1":"'+phone1+'", "phone2":"'+phone2+'", "email":"'+email+'", "region":"'+district+'", "city":"'+city+'", "zip":"'+zip+'", "status":"'+stts+'" }';
        console.log(nilai);
        if (mess == null){

            $.ajax({
                type: 'POST',
                url: post_customer,
                data : nilai,
                contentType: "application/json",
                dataType: 'json',
                success: function(data)
                {   
                    if (data.status == true){
                        
                        swal({
                            position: 'top-right',
                            type: 'success',
                            title: data.error,
                            showConfirmButton: false,
                            timer: 1500
                        });

                        location.reload();

                    }else{ swal(data.error, '', "error"); }

                },
                error: function (request, status, error) {
                    swal('Request Failed...!', error, "error");
                }
            })
            return false;
        }else{

            // alert(mess);
            swal({
                position: 'top-right',
                type: 'error',
                title: mess,
                showConfirmButton: false,
                timer: 1500
            });
        }

    });


    $("#upload_form").on('submit',(function(e) {
		
		e.preventDefault();
		$.ajax({
		    url: $(this).attr('action'),
			type: "POST",
			data:  new FormData(this),
			contentType: false,
    	    cache: false,
			processData:false,
			beforeSend : function()
			{
				//$("#preview").fadeOut();
			},
			success: function(data)
		    {
				res = data.split("|");
				if(res[0]=='true')
				{
					swal({
                        position: 'top-right',
                        type: 'success',
                        title: res[1],
                        showConfirmButton: false,
                        timer: 1500
                    });

                    location.reload();
				}
				else if(res[0] == 'error'){ swal(res[1], '', "error"); }
		    },
		  	error: function(e) 
	    	{
				$("#error").html(e).fadeIn();
				console.log(e.responseText);	
	    	} 
				        
	   });
	     
	}));


}); // end document ready

function calculate_weight(val){

    $(document).ready(function(){ 

        if (val){ var nilai = '{ "orderid":"'+val+'" }'; }else{ var nilai = '{ "agent_id":"'+agent+'" }'; }
        var hasil = 0;

        if (agent != ""){
        
            $.ajax({
                type: 'POST',
                url: weight_url,
                data : nilai,
                contentType: "application/json",
                dataType: 'json',
                success: function(data)
                {   
                    hasil = data.status.weight;
                    $("#tweight").val(hasil);
                },
                error: function (request, status, error) {
                    swal('Request Failed...!', "", "error");
                }
            })
            return false;
      }else{ swal("Can't load cart...!", "", "error"); }

    }); // end document ready

}

function calculate_discount(){
    
    $(document).ready(function(){ 

        var total = $("#httotal").val();
        var date = $("#hdate").val();
        var vat = parseFloat(total*0.1);
        total = parseFloat(total-vat);
        var nilai = '{ "agent_id":"'+agent+'", "amount":"'+total+'", "date":"'+date+'" }';
        var hasil = 0;

        if (agent != "" && total != "" && date != ""){
        
            $.ajax({
                type: 'POST',
                url: discount_url,
                data : nilai,
                contentType: "application/json",
                dataType: 'json',
                success: function(data)
                {   
                    percent = parseFloat(data.result/100); // jumlah percent
                    disc = parseInt(total*percent); // jumlah discount
                    total = parseInt(total-disc); // total - discount
                    vat = parseInt(total*0.1); // vat total-disocunt
                    total = parseInt(total+vat); // total + vat
                    $("#hdiscount").html(idr_formats(disc));
                    $("#grdtotal").html(idr_formats(total));
                    $("#htdiscount").val(disc);
                    $("#httotal").val(total);
                    
                },
                error: function (request, status, error) {
                    swal('Request Failed...!', "", "error");
                }
            })
            return false;
        }else{ swal("Can't load cart...!", "", "error"); }

    }); // end document ready

}

load_cart();

function load_cart(){

    $(document).ready(function(){ 
        
            var nilai = '{ "agent_id":"'+agent+'" }';
            var con = "";
        
            if (agent != "" ){
            $.ajax({
                type: 'POST',
                url: cart,
                data : nilai,
                contentType: "application/json",
                dataType: 'json',
                success: function(data)
                {
                    if (data != null){ 
                    
                    var limit = 0;
                    var rest = 0;

                    if (data.content.length > 5){ limit = 5; rest = parseInt(data.content.length-limit); }
                    else{ limit = data.content.length; }

                    for (i=0; i<limit; i++){
                        var datax = data.content;

                        
size = datax[i].attribute.split("|");
con = con+'<tr>'+ 
'<td><img class="ordered" src="'+datax[i].image+'"></td>'+
    '<td class="detail"><b> '+datax[i].product+' </b> | ('+datax[i].qty+') <br>'+
        '<span>Size : '+size[0]+' m x '+size[1]+' m </span>'+
        '<span>Color : '+datax[i].color+' </span>'+
    '</td>'+
    '<td><span class="harga">Rp. '+idr_formats(datax[i].amount)+' </span> <br>'+
    '<a href="#" onclick="remove('+datax[i].id+')">Hapus</a> </td>'+
'</tr>';

                    }

                    $("#cartbox").empty(); 
                    $("#cartbox").html('<table class="table" id="cart">'+
                    '<tr> <td colspan="2"><p> Newly Added </p></td> </tr>'+ con +
                    // +'<tr>'+ 
                    // '<td><img class="ordered" src="'+base_url+'img/greystone.png"></td>'+
                    //     '<td class="detail"><b>Sliding Door Series 80</b> <br>'+
                    //         '<span>Size : 100 cm x 200 cm</span>'+
                    //         '<span>Color : Grey</span>'+
                    //     '</td>'+
                    //     '<td><span class="harga">Rp. 295.000</span> <br>'+
                    //     '<a>Hapus</a> </td>'+
                    // '</tr>'+
                    '</table>'+  
                    '<div class="row bawah" >'+
                    '<div class="col-md-6">'+
                        '<p><span>'+rest+'</span> Another Product </p>'+
                     '</div>'+
                     '<div class="col-md-6">'+
                        '<a class="btn" href="'+checkout+'"> View All Cart </a>'+
                     '</div> </div>'); 
                    
                    }else{
                        $("#cartbox").empty(); 
                        $("#cartbox").html("<center> <img class=\"img-responsive\" src=\""+base_url+"img/icon/cart-empty.png\"> <br> <p> Your cart is empty... </p> </center> ");                  
                    }


                },
                error: function (request, status, error) {
                  //  swal('Request Cart Failed...!', "", "error");
                  console.log('Request Cart Failed...!');
                  $("#cartbox").empty(); 
                  $("#cartbox").html("<center> <img class=\"img-responsive\" src=\""+base_url+"img/icon/cart-empty.png\"> <br> <p> Your cart is empty... </p> </center> ");
                }
            })
            return false;
            }else{ swal("Can't load cart...!", "", "error");  } // end validation
        
        }); // end document ready

}

function idr_formats(val){

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

// function remove sales item
function remove_trans(id,orderid){
    
    $(document).ready(function(){ 
        
        var nilai = '{ "id":"'+id+'", "orderid":"'+orderid+'" }';

        if (id != ""){
            $.ajax({
                type: 'POST',
                url: cart_remove,
                data : nilai,
                contentType: "application/json",
                dataType: 'json',
                success: function(data)
                {
                    if (data.status == true){

                        swal({
                            position: 'top-right',
                            type: 'success',
                            title: 'Item removed..!!',
                            showConfirmButton: false,
                            timer: 1500
                            })

                        if (data.reload == true){ window.location.href = base_url; }else{ location.reload(); }
                    }
                    else{ swal('Failed to removed item!', "", "error"); }
                },
                error: function (request, status, error) {
                    swal('Request Failed...!', "", "error");
                }
            })
            return false;
            }else{ swal('Cart ID Required...!', "", "error");  } // end validation


    }); // end document ready

}

function remove(id,type=null){

    $(document).ready(function(){ 
        
        var nilai = '{ "id":"'+id+'" }';

        if (id != ""){
            $.ajax({
                type: 'POST',
                url: cart_remove,
                data : nilai,
                contentType: "application/json",
                dataType: 'json',
                success: function(data)
                {
                    if (data.status == true){

                        swal({
                            position: 'top-right',
                            type: 'success',
                            title: 'Item removed..!!',
                            showConfirmButton: false,
                            timer: 1500
                          })

                        if (type == null){    
                            // fungsi untuk update cart status
                            load_cart();
                        }else{ location.reload(); }

                    }
                    else{ swal('Failed to removed item!', "", "error"); }
                },
                error: function (request, status, error) {
                    swal('Request Failed...!', "", "error");
                }
            })
            return false;
            }else{ swal('Item ID Required...!', "", "error");  } // end validation


    }); // end document ready

}

function order_revision(orderid){
    
  $(document).ready(function(){  

   window.location.href = revision_redirect+'/'+orderid;

  }); // end document ready

}

function order_posting(orderid){
    
  $(document).ready(function(){  

    var nilai = '{ "orderid":"'+orderid+'" }';
    $.ajax({
        type: 'POST',
        url: sales_post_url,
        data : nilai,
        contentType: "application/json",
        dataType: 'json',
        success: function(data)
        {   
            var datax = data.status;
            if (datax.result == true){

                swal({
                    position: 'top-right',
                    type: 'success',
                    title: datax.error,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            else{
                swal(datax.error, '', "error");
            }
            location.reload();
        },
        error: function (request, status, error) {
            swal('Request Failed...!', error, "error");
        }
    })
    return false;    

  }); // end document ready

}

function payment_confirmation(code){

  $(document).ready(function(){  
      
    $("#payment_confirm_modal").modal('show');
    $("#tagentid").val('DA-0'+agent);
    $("#horderid").val(code);

  }); // end document ready

}

function submit_payment(){

   $(document).ready(function(){

    var orderid = $("#horderid").val();
    
    var dates = $("#tdates").val();
    var accname = $("#taccname").val();
    var accno = $("#taccno").val();
    var bank = $("#cbank").val();
    var sourcebank = $("#tsourcebank").val();
    
    var amount = $("#tamount").val();
    var phase = $("#cphase").val();
    var orderid = $("#horderid").val();
    var mess = "";

    if (dates == ""){ mess = 'Transaction Dates Required..!!'; }
    else if (accname == ""){ mess = 'Source Account Name Required..!!'; }
    else if (accno == ""){ mess = 'Source Account No Required..!!'; }
    else if (bank == ""){ mess = 'Bank Destination Required..!!'; }
    else if (sourcebank == ""){ mess = 'Source Bank Required..!!'; }
    else if (amount == ""){ mess = 'Amount Required..!!'; }
    else if (phase == ""){ mess = 'Phase Transaction Required..!!'; }

    var nilai = '{ "phase":"'+phase+'", "sales_order":"'+orderid+'", "date":"'+dates+'", "acc_name":"'+accname+'", "acc_no":"'+accno+'", "acc_bank":"'+sourcebank+'", "amount":"'+amount+'", "bank":"'+bank+'" }';

    if (mess != ""){ swal(mess, '', "error");}else{ 
        
        $.ajax({
            type: 'POST',
            url: confirmation_url,
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {   
                var datax = data.status;
                if (datax.result == true){

                    swal({
                        position: 'top-right',
                        type: 'success',
                        title: datax.error,
                        showConfirmButton: false,
                        timer: 1500
                    });

                    location.reload();
                }
                else{
                    swal(datax.error, '', "error");
                }

            },
            error: function (request, status, error) {
                swal('Request Failed...!', error, "error");
            }
        })
        return false;    
    }

   }); // end document ready
}

function send_email(code){
    
    $(document).ready(function(){  

        var nilai = '{ "orderid":"'+code+'" }';
        
        $.ajax({
            type: 'POST',
            url: email_send_url,
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {   
                var datax = data.status;
                if (datax.status == true){

                    swal({
                        position: 'top-right',
                        type: 'success',
                        title: datax.error,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                else{
                    swal(datax.error, '', "error");
                }

            },
            error: function (request, status, error) {
                swal('Request Failed...!', error, "error");
            }
        })
        return false;    
        
    }); // end document ready

}
