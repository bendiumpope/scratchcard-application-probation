$(function(){
    
    //catching the DOM (table ID)
    var $dbOut = $("#dbOut");

    //Getting all details from the database and appending them on the table
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


    //Generating recharge pin and serial No.
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
    //Displaying Recharge Pin and Serial Number on a Div on HTML page once generated
    $('#display').html('<h4>Recharge pin:'+' '+pin+'</h4>'+' '+''+''+'<h4>Serial Number:'+" "+serial+'</h4>');
    
    var date = $("#date").val();
    var pin ={
        "pin": pin,
        "serial": serial,
        "date": date
    };

    
//posting Recharge Pin and its details to the database (db.json)
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


    //The function appending the recharge pins and details from the db.json file on the table.
    function dataBase(pin){
        $dbOut.append('<tr><td>'+pin.id+'</td><td>'+pin.pin+'</td><td>'+pin.serial+
        '</td><td id="'
        +pin.id+'"><span class=noEdit date>'+pin.date+'</span><input type="date" class="edit date"></td><td><button id="'
        +pin.id+'"class="dlt">Delete</button></td><td><button class="editDate noEdit">Edit</button>'+" "+'<button class="saveEdit edit" id="'
        +pin.id+'">save</button>'+" "+'<button class="cancelEdit edit">Cancel</button></td></tr>');
       // console.log(pin.id);
    }


    //Deleting recharge pin and details from the database (db.json) 
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


    //viewing individual recharge pin and serial number using ID
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

//Editing Recharge pin date
$dbOut.delegate(".editDate","click",function(e){
    e.preventDefault();
    
   var tr=(this).closest("tr");

    $(tr).find('input.date').val($(tr).find('span.date').html());
    $(tr).addClass("edit");
})

//cancling the edit mode
$dbOut.delegate(".cancelEdit","click",function(e){
    e.preventDefault();
 
    $(this).closest("tr").removeClass("edit");     
})

//saving the edited detail
$dbOut.delegate(".saveEdit","click",function(e){
    e.preventDefault();
 
    var tr = $(this).closest("tr"); 
    var date = $(tr).find('input.date').val();
    var id = $(this).attr("id");

    var pinArray=[];
    var serialArray=[];
    var idArray=[];
    var pin={};
    

    $.getJSON('http://localhost:3000/pin',function(data){
        $.each(data,function(i,pin){
            idArray.push(pin.id);
            pinArray.push(pin.pin);
            serialArray.push(pin.serial);
        })
        
        for(var i=0; i<idArray.length; i++){
             if(idArray[i]==id){
                 pin["pin"] = pinArray[i];
                 pin["serial"] = serialArray[i];
                 pin["date"]=date;
             }
             
        }

//posting Updated detail to database (db.json) using Ajax PUT command

    $.ajax({
        type:"PUT",
        url:"http://localhost:3000/pin/"+id,
        data:pin,
        success:function(pin){

            $(tr).find("span.date").html(date);
            $(tr).removeClass("edit");
            
            alert("Date Updated successfully");
            return window.location.href="generate.html";
        },
        error:function(){
            return alert("An error occured");
        }
    });  
})

})
})
