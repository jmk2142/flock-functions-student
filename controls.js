// Supplied button wiring. Read this to find the callers of functions.js.
// Add a new control here when you want another way to call your function.
const output=document.querySelector('#last-call');
function run(label,action){
  try {const result=action();output.textContent=label+(result===undefined?'':` → ${result}`);}
  catch(error){output.textContent=error.message;}
}
document.querySelector('#one').onclick=()=>run('releaseBirds(1)',()=>releaseBirds(1));
document.querySelector('#five').onclick=()=>run('releaseBirds(5)',()=>releaseBirds(5));
document.querySelector('#twenty').onclick=()=>run('releaseBirds(20)',()=>releaseBirds(20));
document.querySelector('#chirp').onclick=()=>run('playChirp()',()=>playChirp());
document.querySelector('#count').onclick=()=>run('getBirdCount()',()=>getBirdCount());
document.querySelector('#wind').onclick=()=>{const speed=Number(document.querySelector('#speed').value);run(`setWind(${speed})`,()=>setWind(speed));};
document.querySelector('#gather').onclick=()=>{const x=Number(document.querySelector('#x').value),y=Number(document.querySelector('#y').value);run(`gatherAt(${x}, ${y})`,()=>gatherAt(x,y));};
document.querySelector('#scatter').onclick=()=>run('scatterFlock(4)',()=>scatterFlock(4));
document.querySelector('#color').onchange=event=>run(`setBirdColor("${event.target.value}")`,()=>setBirdColor(event.target.value));
document.querySelector('#reset').onclick=()=>run('flock.reset()',()=>flock.reset());
document.querySelector('#enable').onclick=async()=>{try{await sound.enable();document.querySelector('#audio-status').textContent='Sound enabled. Try Preview chirp.';document.querySelector('#enable').textContent='Sound enabled';}catch(error){document.querySelector('#audio-status').textContent=error.message;}};
