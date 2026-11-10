// Supplied simulation. You can use its functions without understanding the loop.
// Stylized alignment, separation and attraction; not a biological model.
const flock = (() => {
  const canvas = document.querySelector('#sky');
  const context = canvas.getContext('2d');
  let birds = [], wind = 0, target = null, color = '#315a55', width = 600, height = 350;
  const colors = {teal:'#315a55', coral:'#ad554b', gold:'#967017', violet:'#715496'};
  function number(value, min, max, label) {
    if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max)
      throw new Error(`${label} must be a number from ${min} to ${max}.`);
  }
  function addBirds(count) {
    number(count, 1, 20, 'count');
    if (!Number.isInteger(count)) throw new Error('count must be a whole number.');
    if (birds.length + count > 160) throw new Error('Flock limit: 160. Reset before releasing more.');
    for (let i=0; i<count; i++) birds.push({x:width*.2+Math.random()*40,y:height*.4+Math.random()*50,vx:1+Math.random(),vy:Math.random()-.5});
  }
  function resize() {
    const rect=canvas.getBoundingClientRect(); width=rect.width; height=rect.height;
    canvas.width=width*devicePixelRatio; canvas.height=height*devicePixelRatio;
    context.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  }
  new ResizeObserver(resize).observe(canvas);
  let last=0;
  function draw(time) {
    const step=Math.min((time-last)/16.67,2)||1;last=time;
    context.clearRect(0,0,width,height);
    if(target){context.strokeStyle='#788b66';context.beginPath();context.arc(target.x*width/100,target.y*height/100,12,0,Math.PI*2);context.stroke();}
    for(const bird of birds){
      let vx=0,vy=0,near=0;
      for(const other of birds){const dx=other.x-bird.x,dy=other.y-bird.y,d=dx*dx+dy*dy;
        if(d>0&&d<3600){vx+=other.vx;vy+=other.vy;near++;if(d<225){bird.vx-=dx/(d+1)*.1;bird.vy-=dy/(d+1)*.1;}}}
      if(near){bird.vx+=(vx/near-bird.vx)*.015;bird.vy+=(vy/near-bird.vy)*.015;}
      if(target){bird.vx+=(target.x*width/100-bird.x)*.00025;bird.vy+=(target.y*height/100-bird.y)*.00025;}
      const speed=Math.hypot(bird.vx,bird.vy);if(speed>2.5){bird.vx*=2.5/speed;bird.vy*=2.5/speed;}
      bird.x+=(bird.vx+wind*.45)*step;bird.y+=bird.vy*step;
      if(bird.x>width+8)bird.x=-8;if(bird.x< -8)bird.x=width+8;
      if(bird.y<15)bird.vy+=.03;if(bird.y>height-15)bird.vy-=.03;
      context.save();context.translate(bird.x,bird.y);context.rotate(Math.atan2(bird.vy,bird.vx+wind*.45));
      context.strokeStyle=color;context.lineWidth=2;context.beginPath();context.moveTo(-5,-3);context.lineTo(2,0);context.lineTo(-5,3);context.stroke();context.restore();
    }
    document.querySelector('#population').textContent=`${birds.length} birds · wind ${wind}`;
    requestAnimationFrame(draw);
  }
  resize();addBirds(12);requestAnimationFrame(draw);
  return {
    addBirds,
    count:()=>birds.length,
    setWind(speed){number(speed,-5,5,'speed');wind=speed;},
    setTarget(x,y){number(x,0,100,'x');number(y,0,100,'y');target={x,y};},
    scatter(strength){number(strength,0,5,'strength');target=null;for(const bird of birds){let angle=Math.atan2(bird.y-height/2,bird.x-width/2);bird.vx=Math.cos(angle)*strength;bird.vy=Math.sin(angle)*strength;}},
    setColor(name){if(!Object.hasOwn(colors,name))throw new Error('Choose teal, coral, gold, or violet.');color=colors[name];},
    reset(){birds=[];wind=0;target=null;color=colors.teal;addBirds(12);}
  };
})();
