/// Change these to your liking.
const scrollSpeed = 300;
const scrollStep = 5;
const autoScrollScale = 1; /// auto scroll speed multiplier.

let clock = Date;
let scrollTarget = 0;
let autoScrolling = false;
let mouseClickY = 0;
let mousePos = 0;
let deltaTime = 0;
let oldTime = 0;

let deltaTimes = [0,0,0,0,0];
let deltaTimeIndex = 0;

function Average(array) {
    let sum = 0;
    for(let i = 0; i < array.length; i++)
        sum += array[i];
        
    return sum / array.length;
}

function GetDeltaTime() {
    let time = clock.now();
    deltaTimes[deltaTimeIndex] = time - oldTime;
    oldTime = time;
    deltaTimeIndex = (deltaTimeIndex += 1) % 5;
    return Average(deltaTimes);
}

window.addEventListener("mousewheel", function(e) { scrollTarget += e.deltaY * scrollStep; });
window.addEventListener("mousemove", function(e) { mousePos = e.screenY; });

window.addEventListener("click", function(e) {
    if(e.button == 1) {
        mouseClickY = e.screenY;
        autoScrolling = !autoScrolling;
    }
    else
        autoScrolling = false;
});

window.onload = function() {
    function myFunc(){
        deltaTime = GetDeltaTime();
        
        /// Auto scrolling
        if(autoScrolling) {
            window.scrollBy(0, (mousePos - mouseClickY) * autoScrollScale * deltaTime * 0.01);
        }
        
        /// Regular scrolling
        else if(scrollTarget != 0) {
            const absTarget = Math.abs(scrollTarget);
            const direction = scrollTarget / absTarget;
            const step = Math.min(deltaTime * 0.01 * scrollSpeed, absTarget) * direction;
            
            window.scrollBy(0, step);
            scrollTarget -= step;
        }
    }
    setInterval(myFunc, 8);
}
