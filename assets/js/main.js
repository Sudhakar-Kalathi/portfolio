/* ===== SHOW MENU ===== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/* ===== REMOVE MENU MOBILE ===== */
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* ===== SCROLL SECTIONS ACTIVE LINK ===== */
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id')
        const currentMenuLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if(currentMenuLink) {
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                currentMenuLink.classList.add('active-link')
            }else{
                currentMenuLink.classList.remove('active-link')
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)

/* ===== CHANGE BACKGROUND HEADER ===== */ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)