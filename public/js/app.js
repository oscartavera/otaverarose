//const axios = require('axios').default;
//console.log('loaded??');
$(document).ready(function(){
    $("#loginUser").click(function(e){
        e.preventDefault();
        var email = document.getElementById('username');
        var password = document.getElementById('password');
        var message = document.getElementById('message_log');
        if(email.value.length<2){
            $(message).html('');
            $(message).html('Please enter an Email');
            return email.focus();
        }
        if(password.value.length<5){
            $(message).html('');
            $(message).html('Please enter password');
            return password.focus();
        }
        loginUser(email.value, password.value, message);
    })
    $("#register_button").click(function(e){
        e.preventDefault();
        var username= document.getElementById('username');
        var email = document.getElementById('email');
        var company = document.getElementById('company');
        var password = document.getElementById('password');
        var message = document.getElementById('message_log');
        if(username.value.length<2){
            $(message).html('');
            $(message).html('Please enter your Name');
            return username.focus();
        }
        if(email.value.length<2){
            $(message).html('');
            $(message).html('Please enter an Email');
            return email.focus();
        }
        if(company.value.length<2){
            $(message).html('');
            $(message).html('Please enter company name');
            return company.focus();
        }
        if(password.value.length<5){
            $(message).html('');
            $(message).html('Please enter password');
            return password.focus();
        }
        registerUser(username.value, email.value, company.value,password.value, message);
    })
})

function loginUser(email, password, message){
    loginData = {};
    loginData.Email = email;
    loginData.Password = password;
    $.ajax({
        type: "POST",
        url:'/login',
        data: JSON.stringify(loginData),
        contentType: "application/json; charset=utf-8",
        beforeSend:function(){$(message).html('');$(message).html('Login in...');}
     }).done(function(response){
         if(response.status==200){
            window.location.href="/system";   
         }else{
            $(message).html('');$(message).html(response.message);
         }
    });
}
function registerUser(name, email,company, password, message){
    data = {};
    data.Name = name;
    data.Email = email;
    data.Company = company;
    data.Password = password;
    $.ajax({
        type: "POST",
        url:'/signup',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        beforeSend:function(){$(message).html('');$(message).html('Sending registration...');}
     }).done(function(response){
         if(response.status==200){
            window.location.href="/system";   
         }else{
            $(message).html('');$(message).html(response.message);
         }
    });
}
