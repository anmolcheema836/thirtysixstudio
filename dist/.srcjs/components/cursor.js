let clientX = -100;
let clientY = -100;
const innerCursor = document.querySelector('.cursor');


export function initHovers() {

  const handleMouseEnter = e => {
    innerCursor.classList.add('pepper');
  };
  
  const handleMouseLeave = () => {
    innerCursor.classList.remove('pepper');
  };
  
  // add event listeners to all items
  var linkItems = document.querySelectorAll('.pepper-link');

  linkItems.forEach(item => {
    item.addEventListener("mouseenter", handleMouseEnter);
    item.addEventListener("mouseleave", handleMouseLeave);
  });
  
};

export function initCursor() {

  document.addEventListener("mousemove", e => {
    clientX = e.clientX;
    clientY = e.clientY;
  });
  
  const render = () => {
    innerCursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
    
    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
}