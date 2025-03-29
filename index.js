let menu = document.querySelector('#menu-bars');
let header = document.querySelector('header');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    header.classList.toggle('active'); // Toggle the active class for animation
}

window.onscroll = () => {
    menu.classList.remove('fa-times');
    header.classList.remove('active'); // Remove active class on scroll
}
