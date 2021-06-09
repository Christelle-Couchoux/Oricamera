// scroll to top button

const btnScroll = document.getElementById('scroll-to-top');


// show scroll-to-top button

function showBtnScroll(btnScroll) {
    document.addEventListener('scroll', function(event) {
        if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            btnScroll.style.display = 'block'; // show button
        } else {
            btnScroll.style.display = 'none'; // otherwise hide
        }
    })
}


// go to top of page

function scrollToTop(btnScroll) {
    btnScroll.addEventListener('click', function(event) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    })
}


// call functions

showBtnScroll(btnScroll);
scrollToTop(btnScroll);