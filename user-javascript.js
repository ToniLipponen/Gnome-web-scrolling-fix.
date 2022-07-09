/// Change these to your liking.
const maxVelocity       = 200.0;    //!< Maximum velocity of the regular scrolling.
const deceleration      = 1.0;      //!< Deceleration multiplier (rate of slowing down)
const scrollStep        = 1.0;      //!< Multiplier for the mouse wheel step.
const autoScrollScale   = 1.0;      //!< auto scroll speed multiplier.
const frameRate         = 60.0;     //!< FPS target (animation smoothness)

let clock = Date;
let velocity = 0;
let autoScrolling = false;
let mouseClickY = 0;
let mousePos = 0;
let oldTime = 0;

function Step(edge, value)
{
    return value > edge;
}

function GetDeltaTime()
{
    let time = clock.now();
    const delta = (time - oldTime) * 0.01;
    oldTime = time;
    return delta;
}

window.addEventListener("mousewheel", function(e) 
{
    velocity = Math.max(Math.min(velocity += e.deltaY * scrollStep, maxVelocity), -maxVelocity);
});

window.addEventListener("mousemove", function(e)
{ 
    mousePos = e.screenY; 
});

window.addEventListener("click", function(e) 
{
    if(e.button == 1)
    {
        mouseClickY = e.screenY;
        autoScrolling = !autoScrolling;
    }
    else
    {
        autoScrolling = false;
    }
});

window.onload = function()
{
    function myFunc()
    {
        const deltaTime = GetDeltaTime();

        /// Auto scrolling
        if(autoScrolling)
        {
            const difference = mousePos - mouseClickY;
            window.scrollBy(0, difference * (Step(40, difference) | Step(40, -difference)) * autoScrollScale * deltaTime);
        }
        
        /// Regular scrolling
        else if(velocity > 0.1 || velocity < -0.1)
        {
            window.scrollBy(0, velocity * 10 * deltaTime);
            
            if(velocity < 0)
            {
                velocity = Math.min(velocity += -velocity * deceleration * deltaTime, 0);
            }
            else
            {
                velocity = Math.max(velocity -= velocity * deceleration * deltaTime, 0);
            }
        }
    }

    setInterval(myFunc, 1000.0 / frameRate);
}
