$(function(){

    var $dbOut = $("#dbOut");
   
    
    $.ajax({
        type:"GET",
        url:"http://localhost:3000/pin",
        success:function(pin){
            $.each(pin,function(i,pin){
                $dbOut.append("<li>Recharge-pin: "+pin.pin+"\t\t"+"Serial-No: "+pin.serial+"\t\t"+" Date: "+pin.date+"</li>");
            });
        },
        error:function(){
            alert("An Error was encountered");
        }
    });
});

$("#generate").on("click",function(e){

    var pinVal = '0123456789'; 
    var pin = '';
    
    for (let i = 0; i < 11; i++ ) { 
        pin += pinVal[Math.floor(Math.random() * 10)]; 
    } 

    //Generating Serial Number
     var serialVal = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
     var serial = ''; 

    for (let i = 0; i < 10; i++ ) { 
        serial += serialVal[Math.floor(Math.random() * serialVal.length)]; 
    }
    //Displaying Recharge Pin and Serial Number on Div on HTML page
    $('#display').html('<h4>Recharge pin:'+' '+pin+'</h4>'+' '+''+''+'<h4>Serial Number:'+" "+serial+'</h4>');

    var pin ={
        "pin": pin,
        "serial": serial,
        "date": $("input#date").val(),
    };

    $.ajax({
        type:"POST",
        url:"http://localhost:3000/pin",
        data:pin,
        success:function(pin){
            $dbOut.append("<li>Recharge-pin: "+pin.pin+"\t\t"+"Serial-No: "+pin.serial+"\t\t"+" Date: "+pin.date+"</li>");
        },
        error:function(){
            alert("An error occured");
        }
       
        
    })
    
})



