// SHOW MENU

const showMenu = (toggleId, navId) => {
      const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId)

      if(toggle && nav){
            toggle.addEventListener('click', () =>{
                  nav.classList.toggle('show')
            });
      }
}

showMenu('nav_toggle','nav_menu')

// ACTIVE & REMOVE ACTIVE
const navLink = document.querySelectorAll('.nav_link')
navLink.forEach(n => n.classList.remove('active'))

function linkAction(){
      navLink.forEach(n => n.classList.remove('active'))
      this.classList.add('active')

      const navMenu = document.getElementById('nav_menu')
      navMenu.classList.remove('show')
}

navLink.forEach(n => n.addEventListener('click', linkAction))

// COPY TO CLIPBOARD FOR CONTACT DETAILS
const copyButtons = document.querySelectorAll('.copy_btn');

copyButtons.forEach(btn => {
  btn.addEventListener('click', async () => {
    const value = btn.getAttribute('data-clipboard') || '';

    // Fallback to textarea copy if navigator.clipboard not available
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = value;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      const prevTitle = btn.title;
      btn.title = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.title = prevTitle;
        btn.classList.remove('copied');
      }, 2000);
    } catch (err) {
      btn.title = 'Copy failed';
      setTimeout(() => (btn.title = 'Copy'), 2000);
    }
  });
});

// Reveal contact blocks one-by-one when they enter the viewport
const contactBlocks = document.querySelectorAll('.contact_block');
if (contactBlocks.length) {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    contactBlocks.forEach(cb => observer.observe(cb));
  } else {
    // Fallback: reveal all immediately
    contactBlocks.forEach(cb => cb.classList.add('in-view'));
  }
}