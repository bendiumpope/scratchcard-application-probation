$( document ).ready(function(){
    //Sign up Code
    $('#signupInput').on('submit',function(e){
        e.preventDefault();
        
        //Declearing Variables
    
        var userArray =[];
        const BASE_URL = 'http://localhost:3000/user';
         var users = {
             firstName:$("input#firstName").val(),
             lastName:$("input#lastName").val(),
             state:$("input#state").val(),
             local:$("input#local").val(),
             email:$("input#eMail").val(),
             password:$("input#passWord").val(),
         };
    
         //Getting already exisiting emails from the database (db.json)
        $.getJSON(BASE_URL,function(data){
            $.each(data,function(i,user){
               userArray.push(user.email);
            })
        //Checking if the email already exists
         for(var i=0; i<userArray.length; i++){
             if(userArray[i]==users.email){
                 return alert("User Already Exist!");
             }
         }
    
        //Post the email to the database if it dont Exist on it already
        $.post(BASE_URL, users, function(data, success){
            alert("Account created Successfully"+"\n\n"+"Login");
            window.location.href="index.html";
            },
    
            "json"
        )
        })
    })
    
    //Login Code
    $('#loginInput').on('submit',function(e){
        e.preventDefault();
    
        //Declearing variables
    
        var userArray =[];
        var passwordArray=[];
        // var email = $('#email').val();
        // var password=$('#password').val();
        const BASE_URL = 'http://localhost:3000/user';
         var user ={
             email: $("input#email").val(),
             password: $("input#password").val(),
         };
    
         //Getting already existing emails from the data base 
        $.getJSON(BASE_URL,function(data){
            $.each(data,function(i,user){
               userArray.push(user.email);
               passwordArray.push(user.password);
            })
        
        //Checking if the email already exists on the database and giving or restricting access
        for(var i=0; i<userArray.length; i++){
            if(userArray[i]==user.email){
                if(passwordArray[i]==user.password){
                return window.location.href="../generate/generate.html";
                }else{
                    return alert("Wrong login details");
                }
            }
        }
            return alert("Please Sign Up");
        })
    
    })
     })