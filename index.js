$(".loading").height($(window).height());
$(".loading").width($(window).width());

    
$(".loading img").css({
    paddingTop: ($(".loading").height() - $(".loading img").height()) / 2,
    paddingLeft: ($(".loading").width() - $(".loading img").width()) / 2
});

$(window).resize(function () {
   
    "use strict";
    
    $(".loading").height($(window).height());
    $(".loading").width($(window).width());


    $(".loading img").css({
        paddingTop: ($(".loading").height() - $(".loading img").height()) / 2,
        paddingLeft: ($(".loading").width() - $(".loading img").width()) / 2
    });
    
});

$(window).mousemove(function (e) {
   
    "use strict";
    
    $(".original").css({
        left: e.pageX - 16,
        top: e.pageY - 16
    });
    
});

$("body").on("click", function (e) {
   
    "use strict";
    
    $(".original").clone(true).appendTo("body").css({
        left: e.pageX - 16,
        top: e.pageY - 16
    }).removeClass("original");
    
});





let menu = document.querySelector('#menu-bars');
let header = document.querySelector('header');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    header.classList.toggle('active');
}

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    header.classList.remove('active');
}

// let cursor1 = document.querySelector('.cursor-1');
// let cursor2 = document.querySelector('.cursor-2');

// window.onmousemove = (e) =>{
//     cursor1.style.top = e.pageY + 'px';
//     cursor1.style.left = e.pageX + 'px';
//     cursor2.style.top = e.pageY + 'px';
//     cursor2.style.left = e.pageX + 'px';
// }

document.querySelectorAll('a').forEach(links =>{

    links.onmouseenter = () =>{
        cursor1.classList.add('active');
        cursor2.classList.add('active');
    }

    links.onmouseleave = () =>{
        cursor1.classList.remove('active');
        cursor2.classList.remove('active');
    }

});


var btn = document.getElementById('btn');
btn.addEventListener('click',function(e){
    e.preventDefault()
    var name=document.getElementById('Name').value;
    var email=document.getElementById('Email').value;
    var message=document.getElementById('Message').value;
    var body='Name: ' +name + '<br/> Email: ' +email + '<br/> Message' + message;


    Email.send({
    Host : "smtp.gmail.com",
    Username : "kamalikumarvidhya@gmail.com",
    Password : "Kamalikumar@123",
    To : 'kamalikumarvidhya@gmail.com',
    From : email,
    Subject : "This is the subject",
    Body : body
}).then(
  message => alert(message)
);
})