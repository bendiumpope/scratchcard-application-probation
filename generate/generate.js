$(function(){

    var $dbOut = $("#dbOut");

  
    // function dataBase(pin){
    //     $dbOut.append('<tr><td>'+pin.pin+'</td><td>'+pin.serial+
    //     '</td><td>'+pin.date+'</td><td><button id='+pin.id+'class="view">View</button></td><td><button id='+pin.id+'class="dlt">Delete</button></td></tr>');
    // }
    
    $.ajax({
        type:"GET",
        url:"http://localhost:3000/pin",
        success:function(pin){
            $.each(pin,function(i,pin){
                dataBase(pin);
            });
        },
        error:function(){
            alert("An Error was encountered");
        }
    });


$("#generate").on("click",function(e){
    e.preventDefault();

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
    var date = $("#date").val();
    var pin ={
        "pin": pin,
        "serial": serial,
        "date": date
    };

    

    $.ajax({
        type:"POST",
        url:"http://localhost:3000/pin",
        data:pin,
        success:function(pin){
            dataBase(pin);
            alert("Pin generated successful\n"+pin.pin+"\n"+pin.serial+""+pin.id);
            return window.location.href="#";
        },
        error:function(){
            return alert("An error occured");
        }
    });  
    });

    function dataBase(pin){
        $dbOut.append('<tr><td>'+pin.pin+'</td><td>'+pin.serial+
        '</td><td>'+pin.date+'</td><td><button id="'+pin.id+'"class="dlt">Delete</button></td></tr>');
       // console.log(pin.id);
    }
     
    $dbOut.delegate(".dlt","click",function(e){
        e.preventDefault();
        

        var id = $(this).attr("id");
        console.log(id); 
        $tr=(this).closest("tr");

        $.ajax({
            type:"DELETE",
            url:"http://localhost:3000/pin/"+id,
            success:function(){
                $tr.remove();
                alert("Recharge pin Deleted");
            },
            error:function(){
                alert("Invalid Recharge pin");
            }
        })
    })

    $("#getForm").on("submit",function(e){
        e.preventDefault();
        var pinId =$("#pinId").val();
        
        var pinArray=[];
        var serialArray=[];
        var idArray=[];
        $append = $("#append");

        $.getJSON('http://localhost:3000/pin',function(data){
            $.each(data,function(i,pin){
                idArray.push(pin.id);
                serialArray.push(pin.serial);
                pinArray.push(pin.pin);
            })

        for(var i=0; i<idArray.length; i++){
            if(idArray[i]==pinId){
               return $append.html("<h4>Recharge pin: "+pinArray[i]+"</h4><h4>Serial No: "+serialArray[i]+"</h4>");
                }
            }
            
            return alert("Invalid Recharge card");
    })
});

})
