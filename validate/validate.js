$(function(){ 

    $("#form").on("submit",function(e){
        e.preventDefault();
        var input = $("input#validate").val();

        var serialArray=[];
        $.getJSON("http://localhost:3000/pin",function(data){
            $.each(data,function(i,pin){
               serialArray.push(pin.serial,);
            })

            for(var i=0; i<serialArray.length; i++){
                if(serialArray[i]==input){
                    return alert("Recharge pin is Valide");
                }
            }

            return alert("Recharge pin is Invalide");
            

    })
})
})