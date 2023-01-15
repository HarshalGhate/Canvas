const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
console.log(ctx);

canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

})

const mouse={
    x:undefined,
    y:undefined,
}

// click
canvas.addEventListener('click',function(event){
    console.warn(event);
    mouse.x=event.x;
    mouse.y=event.y;
    drawCircle();
})

// paint brush
canvas.addEventListener('mousemove',function(event){
    mouse.x=event.x;
    mouse.y=event.y;
    drawCircle();
})

function drawCircle()
{
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(mouse.x,mouse.y,20,0,Math.PI*2)
    // ctx.fillRect(mouse.x,mouse.y,100,100)
    ctx.fill()
}


