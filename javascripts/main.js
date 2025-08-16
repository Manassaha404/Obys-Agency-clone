function mainLoading() {
    let tl3 = gsap.timeline();

    tl3.to(".main", {
        opacity: 1,
        visibility: "visible",
    },)

    tl3.to(".main .page1 .nav, .main .page2  .play-cursor, .main .page2 .video-contener", {
        opacity: 1,
        duration: .5,
    })



    tl3.from(".main .page1 .heading .lines h1", {
        y: 150,
        stagger: 0.25,
        duration: 0.5,
    }, "-=.5")
}
function loader() {

    let tl2 = gsap.timeline();
    tl2.from(".loader .content .line h1", {
        y: 150,
        stagger: 0.25,
        duration: 0.5,
        delay: .2
    })
    tl2.to(".loader .waiting-sms", {
        opacity: 1,
        duration: 0.5,
    })
    gsap.to(".loader .content .line .timer", {
        opacity: 1,
        delay: .5,
    })



    let tl = gsap.timeline()
    let count = 0;
    let inter = setInterval(function () {
        if (count < 100) {
            count++;
            document.querySelector(".loader .content .line .timer h5").textContent = count;
        } else {
            clearInterval(inter);
            tl.to(".loader .content , .waiting-sms", {
                opacity: 0,
                delay: .3,
                duration: 1,
            })
            tl.to(".loader", {
                y: -1050,
                duration: .5,
                display: "none",
                onComplete: () => {
                    locomotive();
                    sheryAnimetion();
                    mainLoading();
                    // document.body.style.overflow = "auto";
                }
            })
        }
    }, 40);
}
loader();
function locomotive() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });







    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
function cursorAnimetion() {
    let cursor = document.querySelector(".cursor");

    document.addEventListener("mousemove", (e) => {
        cursor.style.top = e.clientY + 'px';
        cursor.style.left = e.clientX + 'px';
    })
    let navItems = document.querySelectorAll('.nav-part1 i ,.nav-part2 h4');
    console.log(navItems)

    navItems.forEach((item) => {
        item.addEventListener("mousemove", (e) => {
            const rect = item.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) * 0.5 + 10;
            const deltaY = (e.clientY - centerY) * 0.5 + 10;

            item.style.transform = `translate(${deltaX}px , ${deltaY}px) scale(1.1)`;
        });
        item.addEventListener("mouseleave", () => {
            item.style.transform = `translate(0 , 0) scale(1)`;
        });
    })
}
cursorAnimetion();
function flagAnimetion() {
    let web = document.querySelector("#web-text");
    let graphic = document.querySelector("#graphic-text");
    let flag = document.querySelector("#flag")
    web.addEventListener("mousemove", (e) => {
        flag.style.opacity = 0.9;
        flag.style.top = e.clientY + 'px';
        flag.style.left = e.clientX + 'px';
    })

    web.addEventListener("mouseleave", () => {
        flag.style.opacity = 0;
    })

    graphic.addEventListener("mousemove", (e) => {
        flag.style.opacity = 0.9;
        flag.style.top = e.clientY + 'px';
        flag.style.left = e.clientX + 'px';
    })
    graphic.addEventListener("mouseleave", () => {
        flag.style.opacity = 0;
    })
}
flagAnimetion();
function videoAnimetion() {
    let videoContener = document.querySelector(".main .page2 .video-contener");
    let playCursor = document.querySelector(".main .page2 .play-cursor");
    let video = document.querySelector(".main .page2 .video-contener video")
    let videoBackground = document.querySelector(".main .page2 .video-contener img")
    videoContener.addEventListener("mousemove", (dets) => {
        playCursor.style.top = dets.clientY + 'px';
        playCursor.style.left = dets.clientX + 'px';
        document.querySelector(".cursor").style.opacity = 0
    })

    videoContener.addEventListener("mouseleave", () => {
        playCursor.style.top = "16%";
        playCursor.style.left = "80%";
        document.querySelector(".cursor").style.opacity = 1
    })
    let play = 0;
    videoContener.addEventListener("click", () => {
        if (window.innerWidth < 600 && play==0) {
           playCursor.innerHTML = '<i class="ri-pause-line"></i>'
            gsap.to(".main .page2 .play-cursor", {
                scale: 0.5,
                opacity:0
            })
            video.style.opacity = 1;
            videoBackground.style.opacity = 0;
            video.play();
            play = 1;
        }  else if(play==0) {

            playCursor.innerHTML = '<i class="ri-pause-line"></i>'
            gsap.to(".main .page2 .play-cursor", {
                scale: 0.5
            })
            video.style.opacity = 1;
            videoBackground.style.opacity = 0;
            video.play();
            play = 1;
        } else {
            playCursor.innerHTML = '<i class="ri-play-fill"></i>'
            gsap.to(".main .page2 .play-cursor", {
                opacity:1,
                scale: 1
            })
            video.style.opacity = 0;
            videoBackground.style.opacity = 1;
            video.pause();
            play = 0;
        }
    })
}
videoAnimetion();

function sheryAnimetion() {
if (window.innerWidth < 600) {

} else {
    for (let i = 1; i <= 6; i++) {
        Shery.imageEffect(`.main .page3 .project-showcase .project${i} .img-contener`, {
            style: 5,
            config: { "a": { "value": 2, "range": [0, 30] }, "b": { "value": 0.75, "range": [-1, 1] }, "zindex": { "value": -9996999, "range": [-9999999, 9999999] }, "aspect": { "value": 0.78865040747485 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": true }, "infiniteGooey": { "value": false }, "growSize": { "value": 4, "range": [1, 15] }, "durationOut": { "value": 1, "range": [0.1, 5] }, "durationIn": { "value": 1.5, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": true }, "maskVal": { "value": 1.24, "range": [1, 5] }, "scrollType": { "value": 0 }, "geoVertex": { "range": [1, 64], "value": 1 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 1 }, "noise_speed": { "value": 0.2, "range": [0, 10] }, "metaball": { "value": 0.52, "range": [0, 2] }, "discard_threshold": { "value": 0.5, "range": [0, 1] }, "antialias_threshold": { "value": 0, "range": [0, 0.1] }, "noise_height": { "value": 0.5, "range": [0, 2] }, "noise_scale": { "value": 10.69, "range": [0, 100] } },
            gooey: true
        });
    }
}
    
}
function projectTitleAnimetion() {
    for (let i = 1; i <= 6; i++) {
        const container = document.querySelector(`.main .page3 .project-showcase .project${i}`);
        const heading = `.main .page3 .project-showcase .project${i} .pro-head h1`;

        container.addEventListener('mouseenter', () => {
            gsap.set(heading, { y: 0 });
            gsap.from(heading, { y: -60, duration: 0.6, overwrite: "auto", ease: "power3.out" });
        });

        container.addEventListener('mouseleave', () => {
            gsap.set(heading, { y: 0 });
            gsap.from(heading, { y: 60, duration: 0.6, overwrite: "auto", ease: "power3.out" });
        });
    }
}
projectTitleAnimetion();


for (let i = 1; i <= 6; i++) {
    const social = document.querySelector(`.main .page5 .footer .social .platfrom${i}`);
    const platfrom = `.main .page5 .footer .social .platfrom${i} h1`;

    let hoverTimer;
    let animationPlayed = false;

    social.addEventListener('mouseenter', () => {
        animationPlayed = false;

        hoverTimer = setTimeout(() => {
            animationPlayed = true;
            gsap.set(platfrom, { y: 0 });
            gsap.from(platfrom, {
                y: -60,
                duration: 0.6,
                ease: "power3.out",
                overwrite: "auto",
            });
        }, 100);
    });

    social.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimer);

        if (!animationPlayed) return;

        gsap.set(platfrom, { y: 0 });
        gsap.from(platfrom, {
            y: 60,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
        });
    });
}










