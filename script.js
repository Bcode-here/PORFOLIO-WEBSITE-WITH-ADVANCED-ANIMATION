const scroll = new LocomotiveScroll({
    // el means element 
    el: document.querySelector("#main"),
    smooth: true
});

var timeout;

function circleskew() {
    // define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener('mousemove', function (coordinates) {
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(.8, 1.2, coordinates.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, coordinates.clientY - yprev);
        
        xprev = coordinates.clientX;
        yprev = coordinates.clientY;

        circleMouseFollower(xscale, yscale);

        timeout = setTimeout(() => {
            document.querySelector("#minicircle").style.transform = `translate(${coordinates.clientX}px, ${coordinates.clientY}px) scale(1, 1)`;
        }, 100);
    });
    
}

function circleMouseFollower(xscale, yscale) {
    window.addEventListener('mousemove', function (coordinates) {
        document.querySelector("#minicircle").style.transform = `translate(${coordinates.clientX}px, ${coordinates.clientY}px) scale(${xscale}, ${yscale})`;
    });   
}


function firstPageAnimation() {
    var tl = gsap.timeline();
    tl.from("#nav", {
        y: -10,
        opacity: 0,
        ease: Expo.easeInOut,
        duration: 1.3
    })

    tl.to(".boundingelem", {
        y: 0,
        duration: 1.3,
        ease: Expo.easeInOut,
        stagger:.1 
    })

    tl.from("#homefooter", {
        opacity: 0,
        duration: 0.5,
        ease: Expo.easeIn,
    })
}



circleskew();
circleMouseFollower();
firstPageAnimation();

document.querySelectorAll(".element")
.forEach(function (element) {
    
    element.addEventListener("mouseleave", function (coordinates) {
        gsap.to(element.querySelector("img"), {
            opacity: 0,
            ease: Power3,
        });
    });
    var rotate = 0;
    var diffrot = 0;
    element.addEventListener("mousemove", function (coordinates) {
        // console.log(element.getBoundingClientRect().top) -- It provides details of div like height from top, bottom etc
        var difftop = coordinates.clientY - element.getBoundingClientRect().top;

        var diffrot = coordinates.clientX - rotate;
        rotate = coordinates.clientX;

        gsap.to(element.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: difftop, 
            left: coordinates.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
    });
});