// libs
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CircleType from 'circletype';
import Lenis from 'lenis';
import {FastImageSequence} from '@mediamonks/fast-image-sequence';
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import {Howl, Howler} from 'howler';


Splitting();

const wrapElements = (elems, wrapType, wrapClass) => {
    elems.forEach(char => {
        const wrapEl = document.createElement(wrapType);
        wrapEl.classList = wrapClass;
        char.parentNode.appendChild(wrapEl);
        wrapEl.appendChild(char);
    });
}



// components
import { initCursor, initHovers } from './components/cursor';

// Import styles
import '../scss/styles.scss';

// cursor
if (window.innerWidth > 1024) {
  initCursor();
  initHovers();
}

const fxTitles = [...document.querySelectorAll('[data-splitting][data-effect]')];
const sliceTitles = [...document.querySelectorAll('[data-splitting][data-slice]')];


// scroll

window.lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

gsap.registerPlugin(ScrollTrigger);



// animate home head

const circle = document.querySelector('.circular-text');

gsap.fromTo(circle, {
  opacity: 0,
}, {
  opacity: 1,
  duration: 1,
  delay: .9,
  ease: "linear"
});

gsap.fromTo(document.querySelector('.home__head__content'), {
  opacity: 0,
}, {
  opacity: 1,
  duration: 1,
  delay: 1.2,
  ease: "linear"
});



const homeTitle = document.querySelector('.home__title');
const title = document.querySelector('.home__title__content h1');

const chars = title.querySelectorAll('.char');
wrapElements(chars, 'span', 'char-wrap');

setTimeout(function() {
  homeTitle.style.opacity = 1;
}, 100);

gsap.fromTo(chars, { 
    'will-change': 'transform', 
    yPercent: 600,
    rotationZ: 45,
    scaleY: 6,
    transformOrigin: '100% 50%'
},
{
    duration: 1,
    ease: 'power2',
    yPercent: 0,
    rotationZ: 0,
    scaleY: 1,
    stagger: 0.03
});









// AUDIO
const design1 = document.getElementById('design1');
const design2 = document.getElementById('design2');
//const click1 = document.getElementById('click1');
// const click2 = document.getElementById('click2');
// const hover1 = document.getElementById('hover1');
// const hover2 = document.getElementById('hover2');



const click1 = new Howl({
  src: ['audio/click1.mp3']
});


const click2 = new Howl({
  src: ['audio/click2.mp3']
});

const hover1 = new Howl({
  src: ['audio/hover1.mp3']
});

const hover2 = new Howl({
  src: ['audio/hover2.mp3']
});













const header__sound = document.querySelector('.header__sound');

let audioActivated = false;
let playing = false;
let firstClick = true;

document.addEventListener('click', function() {
  if(!audioActivated) {
    document.querySelector('.cursor').classList.add('clicked');
    document.querySelector('.mobile-sound').classList.add('clicked');

    design1.play();
    design1.volume = 0.3;

    audioActivated = true;

    header__sound.classList.add('playing');
    playing = true;
    firstClick = false;
  }
});

header__sound.addEventListener('click', function() {
  firstClick = false;
  header__sound.classList.toggle('playing');

  if(header__sound.classList.contains('playing')) {
    if(document.body.classList.contains('is-spiced')) {
      design2.play();
      design2.volume = 0.3;
    } else {
      design1.play();
      design1.volume = 0.3;
    }

    playing = true;
  } else {
    design2.pause();
    design1.pause();
    playing = false;
  }
});


const click1els = document.querySelectorAll('.service__title, .header__toggle, .header__burger, .menu-mobile .nav__item, .header__sound, .header__menu__item__link');

click1els.forEach(el => {
  el.addEventListener('click', function() {
    if(playing) {
      click1.currentTime = 0;
      click1.play();
    }
  });
});


const hover2els = document.querySelectorAll('.btn, .header__toggle, .header__sound, .header__menu__item__link, .service__title');

hover2els.forEach(el => {
  el.addEventListener('mouseenter', function() {
    if(playing) {
      hover2.currentTime = 0;
      hover2.play();
    }
  });
});

const hover1els = document.querySelectorAll('.service__content__row');

hover1els.forEach(el => {
  el.addEventListener('mouseenter', function() {
    if(playing) {
      hover1.currentTime = 0;
      hover1.play();
    }
  });
});





// header

const header = document.querySelector('.header');

setTimeout(() => {
	header.classList.add('show');
}, 1000);



function unspice() {
  document.body.classList.remove('is-spiced');
  document.querySelector('.home').style.backgroundColor = '';
  document.querySelector('.footer').style.backgroundColor = '';
  document.querySelector('.header').style.backgroundColor = '';
  gsap.to(parallaxElems, {
    opacity: 0,
    duration: 0.5,
  });

  if(playing) {
    if(window.innerWidth <= 991) {
      design2.pause();
      design1.play();
    } else {
      design2.pause();
      design1.volume = 0.3;
    }
  }
}


// light / dark toggle
const toggle = document.querySelector('.header__toggle');

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  unspice();
});

// menu mobile
const burger = document.querySelector('.header__burger');
const menuMobile = document.querySelector('.menu-mobile');
const closeMenu = document.querySelector('.menu-close');

burger.addEventListener('click', function() {
  menuMobile.classList.add('show');
});
closeMenu.addEventListener('click', function() {
  menuMobile.classList.remove('show');
});



// buttons

function initButtons() {
  const btns = document.querySelectorAll('.btn');
  let btnsanims = [];

  btns.forEach((btn, index) => {
    if (!btnsanims[index])
      btnsanims[index] = btn.querySelector('.btn__anim');

    btn.addEventListener("mouseover", function(e) {
      btnsanims[index].style.left = e.pageX - btnsanims[index].parentElement.offsetLeft + "px";
    });

    btn.addEventListener("mouseout", function(e) {
      btnsanims[index].style.left = e.pageX - btnsanims[index].parentElement.offsetLeft + "px";
    });

    btn.addEventListener('click', function() {
      if(playing) {
        click2.currentTime = 0;
        click2.play();
      }
    });
  });

}

if(window.innerWidth >= 992) initButtons();




// services
const services = document.querySelectorAll('.service');
const heightRow = 45;

services.forEach(service => {
  const title = service.querySelector('.service__title');
  const content = service.querySelector('.service__content');

  if(service.classList.contains('active')) {
    const newHeight = content.querySelectorAll('.service__content__row').length * heightRow + 'px';

    gsap.to(content, {
      maxHeight: newHeight,
      duration: .1,
      ease: "power3.inOut",
      onComplete: function() {
        ScrollTrigger.refresh();
      }
    });
  }

  title.addEventListener('click', () => {
    service.classList.toggle('active');

    if(service.classList.contains('active')) {
      // open

      const newHeight = content.querySelectorAll('.service__content__row').length * heightRow + 'px';

      gsap.to(content, {
        maxHeight: newHeight,
        duration: 1,
        ease: "power3.inOut",
        onComplete: function() {
          ScrollTrigger.refresh();
        }
      });
    } else {
      // close

      gsap.to(content, {
        maxHeight: 0,
        duration: 1,
        ease: "power3.inOut",
        onComplete: function() {
          ScrollTrigger.refresh();
        }
      });
    }
  });
});

// is in viewport helper
window.isInViewport = function(element) {
  var rect = element.getBoundingClientRect();
  var html = document.documentElement;
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= ((window.innerHeight || html.clientHeight)) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  );
}

// CIRCULAR TEXT + ANIMATIONS

const circularText = document.querySelector('.circular-text .text');
const animations = document.querySelectorAll('.animate');
const animationsBtns = document.querySelectorAll('.animate-btn');

function checkAnims() { 
  animations.forEach(el => {
    if(!el.classList.contains('anim') && isInViewport(el)) {
      el.classList.add('anim');
    }
  });
  animationsBtns.forEach(el => {
    if(!el.classList.contains('anim') && isInViewport(el)) {
      el.classList.add('anim');
    }
  });
}

checkAnims();

const rotate = new CircleType(circularText).radius(65);



const circleLoop = gsap.fromTo(circle, {
  rotation: 0,
}, {
  repeat: -1,
  rotation: 360,
  duration: 20,
  ease: "linear"
});

let oldScrollY = 0;

lenis.on('scroll', (e) => {
  checkAnims();

  ScrollTrigger.update();

  circleLoop.timeScale(4);
  gsap.to(circleLoop, { timeScale: 1, ease: "power2.in", duration: .2 });

  const scrollY = window.scrollY;

  if(oldScrollY < scrollY && scrollY > 15){
    // down
    header.classList.remove('show');

  } else {
    // up
    header.classList.add('show');
  }

  oldScrollY = scrollY;

})



const scrollEffects = () => {
    fxTitles.forEach(title => {
        
        const chars = title.querySelectorAll('.char');
        wrapElements(chars, 'span', 'char-wrap');
    
        gsap.fromTo(chars, { 
            'will-change': 'transform', 
            xPercent: -250,
            rotationZ: 45,
            scaleX: 6,
            transformOrigin: '100% 50%'
        },
        {
            duration: 1,
            ease: 'power2',
            xPercent: 0,
            rotationZ: 0,
            scaleX: 1,
            stagger: 0.02,
            scrollTrigger: {
                trigger: title,
                start: 'top bottom+=40%',
                end: 'bottom top+=40%',
                scrub: true
            }
        });
    
    });

    sliceTitles.forEach(title => {
        
        const words = title.querySelectorAll('.word');
        wrapElements(words, 'words', 'word-wrap');
    
        gsap.fromTo(words, { 
            'will-change': 'transform', 
            yPercent: 800,
            rotationZ: 45,
            transformOrigin: '100% 100%'
        },
        {
            duration: 1,
            ease: 'power2',
            yPercent: 0,
            rotationZ: 0,
            stagger: 0.02,
            scrollTrigger: {
                trigger: title,
                start: 'top bottom+=40%',
                end: 'bottom top+=40%',
                scrub: true
            }
        });
    
    });

};

scrollEffects();




// CONTACT

NiceSelect.bind(document.querySelector('select'), {placeholder: "Topic*", searchable: false});

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const inputs = document.querySelectorAll('.home__contact__form__field input');
const submit = document.querySelector('.home__contact__form__submit');
const errorMsg = document.querySelector('.error-message');
const dropdown = document.querySelector('.nice-select');
const select = document.querySelector('select');

function checkValid() {
  let isValid = true;

  inputs.forEach(input => {
    if(input.value == '') isValid = false;
    if(input.type == 'email') {
      if (!validateEmail(input.value)) {
        isValid = false;
      }
    }
  });

  if(dropdown.querySelector('.current').innerText == 'Topic*') {
    isValid = false;
  }

  if(isValid) {
    submit.classList.remove('disabled');
  } else {
    submit.classList.add('disabled');
  }
}

select.addEventListener('change', function() {
  checkValid();
});

inputs.forEach(input => {
  input.addEventListener('input', function() {

    if(input.type == 'email') {
      if (!validateEmail(input.value)) {
        input.classList.add('error');
        errorMsg.classList.add('show');
      } else {
        input.classList.remove('error');
        errorMsg.classList.remove('show');
      }
    }

    checkValid();
  });
});

submit.addEventListener('click', function(e) {
  e.preventDefault();

  const form = document.querySelector('.home__contact__form');

  submit.classList.add('sending');

  gsap.to(submit, {
    width: '14rem',
    duration: .4
  });

  

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "sendform.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState == 4 && xhr.status == 200){
      let response = xhr.response;

      if(response == "success") {
        setTimeout(function() {
          document.querySelector('.success').classList.add('show');
          submit.classList.add('sending');
          submit.classList.add('sent');

          gsap.to(submit, {
            width: '15.5rem',
            duration: .4
          });
        }, 2000);

        setTimeout(function() {
          document.querySelector('.success').classList.remove('show');
          submit.classList.remove('sending');
          submit.classList.remove('sent');

          gsap.to(submit, {
            width: '',
            duration: .4
          });

          inputs.forEach(input => {
            input.value = '';
          });

          submit.classList.add('disabled');

          select.value = '';
          document.querySelector('.current').innerText = 'Topic*';
        }, 5000);
      }
    }
  }
  let formData = new FormData(form);
  xhr.send(formData);

});



// MENU
const menuLinks = document.querySelectorAll('.header__menu__item__link,.nav__item__link');

menuLinks.forEach(menuLink => {
  menuLink.addEventListener('click', function(e) {
    e.preventDefault();

    menuMobile.classList.remove('show');

    lenis.scrollTo(document.querySelector(menuLink.hash), {
      duration: 2
    });
  });
});


// BACK TO TOP
const toTop = document.querySelector('.to-top');

toTop.addEventListener('click', function(e) {
  e.preventDefault();

  lenis.scrollTo(0, {
    duration: 2
  });
});



// ANCHORS
const anchors = document.querySelectorAll('.anchor');

anchors.forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    lenis.scrollTo(document.querySelector(anchor.hash), {
      duration: 2
    });
  });
});




const optionsA = {
  frames: 150,
  src:    {
    imageURL: (index) => `peppers/pepperA/${index}.png`,
    maxCachedImages: 150
  },
  poster: 'peppers/pepperA/0.png',

  loop:      true,
  objectFit: 'cover',
  clearCanvas: true,
};


const optionsB = {
  frames: 150,
  src:    {
    imageURL: (index) => `peppers/pepperB/${index}.png`,
    maxCachedImages: 150
  },
  poster: 'peppers/pepperB/0.png',

  loop:      true,
  objectFit: 'cover',
  clearCanvas: true,
};

const optionsC = {
  frames: 150,
  src:    {
    imageURL: (index) => `peppers/pepperC/${index}.png`,
    maxCachedImages: 150
  },
  poster: 'peppers/pepperC/0.png',

  loop:      true,
  objectFit: 'cover',
  clearCanvas: true,
};

const optionsD = {
  frames: 150,
  src:    {
    imageURL: (index) => `peppers/pepperD/${index}.png`,
    maxCachedImages: 150
  },
  poster: 'peppers/pepperD/0.png',

  loop:      true,
  objectFit: 'cover',
  clearCanvas: true,
};

const optionsE = {
  frames: 150,
  src:    {
    imageURL: (index) => `peppers/pepperE/${index}.png`,
    maxCachedImages: 150
  },
  poster: 'peppers/pepperE/0.png',

  loop:      true,
  objectFit: 'cover',
  clearCanvas: true,
};

const optionsF = {
  frames: 150,
  src:    {
    imageURL: (index) => `peppers/pepperF/${index}.png`,
    maxCachedImages: 150
  },
  poster: 'peppers/pepperF/0.png',

  loop:      true,
  objectFit: 'cover',
  clearCanvas: true,
};

const optionsG = {
  frames: 150,
  src:    {
    imageURL: (index) => `peppers/pepperG/${index}.png`,
    maxCachedImages: 150
  },
  poster: 'peppers/pepperG/0.png',

  loop:      true,
  objectFit: 'cover',
  clearCanvas: true,
};


const parallaxElems = document.querySelectorAll('.parallax');


let images=gsap.utils.toArray('.parallax')

images.forEach((e) => {
  gsap.to(e, {
    yPercent: e.dataset.speed * 20,
    scrollTrigger:{
      trigger:e,
      scrub:true
    }
  })
})

setTimeout(function() {


  let imageSrcList = [];
  var loadedCount = 0;


  for(var i=0; i<150; i++) {
    imageSrcList.push(`peppers/pepperA/${i}.png`);
  }
  for(var i=0; i<150; i++) {
    imageSrcList.push(`peppers/pepperB/${i}.png`);
  }
  for(var i=0; i<150; i++) {
    imageSrcList.push(`peppers/pepperC/${i}.png`);
  }
  for(var i=0; i<150; i++) {
    imageSrcList.push(`peppers/pepperD/${i}.png`);
  }
  for(var i=0; i<150; i++) {
    imageSrcList.push(`peppers/pepperE/${i}.png`);
  }
  for(var i=0; i<150; i++) {
    imageSrcList.push(`peppers/pepperF/${i}.png`);
  }
  for(var i=0; i<150; i++) {
    imageSrcList.push(`peppers/pepperG/${i}.png`);
  }


  function PreloadImages(images) {
      function loadImage(src) {
          return new Promise((resolve, reject) => {
              const img = new Image();
              img.src = src;
              img.onload = function() 
              {
                  ++loadedCount;
                  resolve(img);
              };
              img.onerror = img.onabort = function() {
                  reject(src);
              };
          });
      }
      // Note that I removed Promise.all, let's just return a list of promises for the images passed
      return images.map((imgSrc, i)=> loadImage(imgSrc).catch((rejectedSrcError=> rejectedSrcError)));
  }

  // now let's create all promises for each image in images
  Promise.all(PreloadImages(imageSrcList)).then( resolvedSrcList =>
  {
    document.querySelector('.cursor').classList.add('loaded');
    document.querySelector('.cursor').classList.remove('loading');
    document.querySelector('.peppermobile').classList.remove('loading');
    if(document.body.classList.contains('loading-spice')) {
      spiceIt();
    }
  });



}, 1200);


let spiceFirst = true;

function spiceIt() {

  gsap.to(spiceAnim, {
    scale: 1000,
    x: '-50%',
    y: '-50%',
    duration: 1,
    clearProps: 'all',
    ease: "power3.inOut",
    onComplete: function() {
      document.querySelector('.home').style.backgroundColor = '#FD2C2A';
      document.querySelector('.footer').style.backgroundColor = '#FD2C2A';
    }
  });

  gsap.to(header, {
    backgroundColor: '#FD2C2A',
    duration: .2,
    delay: .3,
    ease: "power3.inOut"
  });
  document.body.classList.add('is-spiced');

  const peppersA = document.querySelectorAll('.pepperA');
  const peppersB = document.querySelectorAll('.pepperB');
  const peppersC = document.querySelectorAll('.pepperC');
  const peppersD = document.querySelectorAll('.pepperD');
  const peppersE = document.querySelectorAll('.pepperE');
  const peppersF = document.querySelectorAll('.pepperF');
  const peppersG = document.querySelectorAll('.pepperG');

  lenis.scrollTo(0, {
    duration: 2
  });

  if(playing || firstClick) {
    design1.currentTime = 0;
    if(window.innerWidth <= 991) {
      design1.pause();
      design2.currentTime = 0;
      design2.play();
    } else {
      design1.volume = 0;
      design2.volume = 0.3;
      design2.currentTime = 0;
      design2.play();
    }
  }

  setTimeout(function() {
    document.body.classList.remove('dark');
  }, 500);

  if(spiceFirst) {
    peppersA.forEach(pepper => {
      const sequence = new FastImageSequence(pepper, optionsA);
      if(pepper.classList.contains('reverse')) {
        sequence.play(-30);
      } else {
        sequence.play();
      }
    });

    peppersB.forEach(pepper => {
      const sequence = new FastImageSequence(pepper, optionsB);
      if(pepper.classList.contains('reverse')) {
        sequence.play(-30);
      } else {
        sequence.play();
      }
    });

    peppersC.forEach(pepper => {
      const sequence = new FastImageSequence(pepper, optionsC);
      if(pepper.classList.contains('reverse')) {
        sequence.play(-30);
      } else {
        sequence.play();
      }
    });

    peppersD.forEach(pepper => {
      const sequence = new FastImageSequence(pepper, optionsD);
      if(pepper.classList.contains('reverse')) {
        sequence.play(-30);
      } else {
        sequence.play();
      }
    });

    peppersE.forEach(pepper => {
      const sequence = new FastImageSequence(pepper, optionsE);
      if(pepper.classList.contains('reverse')) {
        sequence.play(-30);
      } else {
        sequence.play();
      }
    });

    peppersF.forEach(pepper => {
      const sequence = new FastImageSequence(pepper, optionsF);
      if(pepper.classList.contains('reverse')) {
        sequence.play(-30);
      } else {
        sequence.play();
      }
    });

    peppersG.forEach(pepper => {
      const sequence = new FastImageSequence(pepper, optionsG);
      if(pepper.classList.contains('reverse')) {
        sequence.play(-30);
      } else {
        sequence.play();
      }
    });
  }

  gsap.to(parallaxElems, {
    opacity: 1,
    duration: 0.5,
    delay: .5
  });
  spiceFirst = false;
}

const spiceTriggers = document.querySelectorAll('.spice');
const spiceAnim = document.querySelector('.spice-anim');

spiceTriggers.forEach(trigger => {
  trigger.addEventListener('click', function(e) {
    e.preventDefault();

    if(!document.querySelector('.cursor').classList.contains('pepper')) {
      document.querySelector('.cursor').classList.add('pepper');
    }

    
    if(!document.querySelector('.cursor').classList.contains('loaded')) {
      document.body.classList.add('loading-spice');
      document.querySelector('.cursor').classList.add('loading');
      document.querySelector('.peppermobile').classList.add('loading');

      spiceAnim.style.left = e.clientX + 'px';
      spiceAnim.style.top = e.clientY + 'px';
      return false;
    }

    if(!document.body.classList.contains('is-spiced')) {

      spiceAnim.style.left = e.clientX + 'px';
      spiceAnim.style.top = e.clientY + 'px';
      spiceIt();
    } else {
      unspice();
    }
  });
});



