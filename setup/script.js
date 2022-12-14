const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
console.log(ctx);

canvas.width = window.innerWidth
canvas.height = window.innerHeight
const particlesArray=[];
let hue=0;

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

})

const mouse = {
    x: undefined,
    y: undefined,
}

// click to get click position
canvas.addEventListener('click', function (event) {
    console.warn(event);
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i=0;i<10;i++)
    {
        particlesArray.push(new Particle())
    }
})

// paint brush click to get mouse move position
canvas.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i=0;i<5;i++)
    {
        particlesArray.push(new Particle())
    }
})



class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl('+hue+',100%,50%)';
    }
    // 2D Vector
    //positive move to right
    update() {                       //-ve move to left along horizontal x axis
        this.x += this.speedX; //+ or -
        this.y += this.speedY;
        // for shrink
        if(this.size>0.2) this.size-=0.1

    }
    draw() {
        ctx.fillStyle = this.color
        ctx.beginPath();
        //         X        Y    Size,startangle,end angle
        ctx.arc(this.x,this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
    }
}


function handleParticles()
{
    for(let i=0;i< particlesArray.length;i++)
    {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        for(let j=i;j<particlesArray.length;j++)
        {
            const dx=particlesArray[i].x - particlesArray[j].x;
            const dy=particlesArray[i].y - particlesArray[j].y;
            const distance=Math.sqrt(dx * dx + dy *dy)

            if(distance<100)
            {
                ctx.beginPath();
                ctx.strokeStyle=particlesArray[i].color;
                ctx.lineWidth=particlesArray[i].size;
                ctx.moveTo(particlesArray[i].x,particlesArray[i].y)
                ctx.lineTo(particlesArray[i].x,particlesArray[i].y)
                ctx.stroke();
            }

        }
        // for remove all till 0
        if(particlesArray[i].size<=0.3)
        {
            particlesArray.splice(i,1);
            console.warn(particlesArray.length);
            i--;
        }
    }
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // ctx.fillStyle='rgba(0,0,0,10)';
    // ctx.fillStyle='rgba(0,0,0,0.1)';
    // ctx.fillStyle='rgba(0,0,0,0.02)';
    // ctx.fillRect(0,0,canvas.width,canvas.height)
    handleParticles()

    // speed of color
    hue+=5;
    requestAnimationFrame(animate)

}
animate()

