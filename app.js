let menu = document.querySelector('.menu');
let scrollable = document.querySelector('.scrollable');
let items = document.querySelectorAll('.menu-item');
let clones = [];
let disableScroll = false;
let scrollheight = 0;
let scrollpos = 0;
let clonesHeight = 0;


// SMOOTH SCROLLING

let current = 0;
let target = 0;
let ease = 0.075;

// Linear interpolation function

function lerp(start, end, t){
    return start = (1 - t) + end + t;
}

function smoothScroll(){
    target = window.scrollY;
    current = lerp(current, target, ease);
    scrollable.style.transform = `translate3d(0,${-current}px, 0)`;
    requestAnimationFrame(smoothScroll)
}

window.addEventListener('scroll', ()=>{
    yScrollPos = window.scrollY;
    console.log(yScrollPos);
})

// INFINITE SCROLLING

function getScrollPos(){
    return menu.scrollTop; // Amount window scrolled
}


function setScrollPos(pos){
    menu.scrollTop = pos;
}

function getClonesHeight(){
    clonesHeight = 0;

    clones.forEach(clone => {
        clonesHeight += clone.offsetHeight; // Returns height of element
    })

    return clonesHeight;
}

// Recalculate dimensions when screen is resized

function reCalc(){
    scrollpos = getScrollPos();
    scrollheight = menu.scrollHeight; // Height of an elements content, including content not visible on the screen
    clonesHeight = getClonesHeight();

    if(scrollpos <= 0){
        setScrollPos(1); // Initial set at 1px to enable upwards scrolling
    }
}

function scrollUpdate(){
    if(!disableScroll){
        scrollpos = getScrollPos();
        if(clonesHeight + scrollpos >= scrollheight){
            // Scroll back to top when we reach bottom
            setScrollPos(1);
            disableScroll = true;
        }else if (scrollpos <= 0){
            // SCroll to bottom when we reach the top
            setScrollPos(scrollheight - clonesHeight);
            disableScroll = true;
        }
    }
    if(disableScroll){
        // Disable scroll-jumping for a short period to avoid flickering

        window.setTimeout(() =>{
            disableScroll = false;
        }, 40);
    }
}

function onload(){
    items.forEach(item => {
        const clone = item.cloneNode(true);
        menu.appendChild(clone);
        clone.classList.add('js-clone');
    });

    clones = menu.querySelectorAll('.js-clone');

    reCalc();

    menu.addEventListener('scroll', () => {
        window.requestAnimationFrame(scrollUpdate);
    }, false);

    menu.addEventListener('resize', () => {
        window.requestAnimationFrame(reCalc);
    }, false);
}

window.onload = onload();

smoothScroll()

