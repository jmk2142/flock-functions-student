const test=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
function setup(){
  let population=12;const effects=[];
  const context={flock:{addBirds(n){if(!Number.isInteger(n)||n<1||n>20||population+n>160)throw Error('Invalid count');population+=n;effects.push(['birds',n]);},setWind:n=>effects.push(['wind',n]),setTarget:(x,y)=>effects.push(['target',x,y]),scatter:n=>effects.push(['scatter',n]),setColor:c=>effects.push(['color',c]),count:()=>population},sound:{playTone:(f,d)=>effects.push(['tone',f,d])}};
  vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,'../functions.js'),'utf8'),context);return {context,effects};
}
test('two releases add to existing population; starter releases are silent',()=>{const {context:c,effects}=setup();c.releaseBirds(5);c.releaseBirds(5);assert.equal(c.getBirdCount(),22);assert.equal(effects.filter(e=>e[0]==='tone').length,0);});
test('preview uses the fixed tone without adding birds',()=>{const {context:c,effects}=setup();c.playChirp();assert.deepEqual(effects,[['tone',600,.15]]);assert.equal(c.getBirdCount(),12);});
test('exploration functions pass their inputs and preserve population',()=>{const {context:c,effects}=setup();c.setWind(-2);c.gatherAt(25,75);c.scatterFlock(4);c.setBirdColor('coral');assert.deepEqual(effects,[['wind',-2],['target',25,75],['scatter',4],['color','coral']]);assert.equal(c.getBirdCount(),12);});
test('invalid release is rejected without changing population',()=>{const {context:c}=setup();assert.throws(()=>c.releaseBirds(1.5));assert.equal(c.getBirdCount(),12);});
