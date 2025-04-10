
const roles = ['Web Developer', 'Designer', 'Digital Marketing Expert (SEO)'];
let currentIndex = 0;
let charIndex = 0;
const typingSpeed = 120;
const erasingSpeed = 100;
const delayBetweenRoles = 500; // Delay between each role display

function typeRole() {
    const dynamicText = document.getElementById('dynamic-text');
    if (charIndex < roles[currentIndex].length) {
        dynamicText.textContent += roles[currentIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeRole, typingSpeed);
    } else {
        setTimeout(eraseRole, delayBetweenRoles);
    }
}

function eraseRole() {
    const dynamicText = document.getElementById('dynamic-text');
    if (charIndex > 0) {
        dynamicText.textContent = roles[currentIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseRole, erasingSpeed);
    } else {
        currentIndex = (currentIndex + 1) % roles.length;
        setTimeout(typeRole, delayBetweenRoles);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeRole, delayBetweenRoles);
});


// Function to update visit count
function updateVisitCount() {
    let count = localStorage.getItem('visitCount');

    // If there's no count in local storage, set it to 0
    if (!count) {
        count = 0;
    }

    // Increment the count
    count++;

    // Store the new count in local storage
    localStorage.setItem('visitCount', count);

    // Update the display
    document.getElementById('count').innerText = count;
}

// Call the function when the page loads
window.onload = updateVisitCount;













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




const text = "Here is a software developer";
let index = 0;
let isDeleting = false;

function typeEffect() {
    let typingText = document.getElementById("typing-text");

    if (!isDeleting) {
        typingText.innerHTML = text.substring(0, index);
        index++;
    } else {
        typingText.innerHTML = text.substring(0, index);
        index--;
    }

    if (index > text.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1000); // Pause before deleting
    } else if (index < 0) {
        isDeleting = false;
        setTimeout(typeEffect, 500); // Pause before restarting
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100); // Typing & deleting speed
    }
}

window.onload = typeEffect;


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
    var name=document.getElementById('name').value;
    var email=document.getElementById('email').value;
    var message=document.getElementById('message').value;
    var body='name: ' +name + '<br/> email: ' +email + '<br/> message' + message;


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


