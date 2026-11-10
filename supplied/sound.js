// Supplied browser audio helper. It never requests a microphone or network access.
const sound = (() => {
  let context, enabled=false;
  async function enable(){
    const Audio=window.AudioContext||window.webkitAudioContext;
    if(!Audio)throw new Error('This browser does not support Web Audio.');
    context ||= new Audio();
    await context.resume();
    if(context.state!=='running')throw new Error('Audio is blocked. Try Enable sound again.');
    enabled=true;
  }
  async function playTone(frequencyHz,durationSeconds){
    if(!Number.isFinite(frequencyHz)||frequencyHz<180||frequencyHz>1200)throw new Error('Pitch must be 180–1200 Hz.');
    if(!Number.isFinite(durationSeconds)||durationSeconds<.05||durationSeconds>.6)throw new Error('Duration must be 0.05–0.6 seconds.');
    if(!enabled)throw new Error('Enable sound first using the button above the sky.');
    await context.resume();
    const oscillator=context.createOscillator(),gain=context.createGain(),now=context.currentTime;
    oscillator.frequency.value=frequencyHz;
    gain.gain.setValueAtTime(0,now);
    gain.gain.linearRampToValueAtTime(.07,now+.01);
    gain.gain.exponentialRampToValueAtTime(.001,now+durationSeconds);
    oscillator.connect(gain);gain.connect(context.destination);
    oscillator.start(now);oscillator.stop(now+durationSeconds+.02);
    oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};
    document.querySelector('#audio-status').textContent=`Tone: ${frequencyHz} Hz for ${durationSeconds} s`;
  }
  return {enable, playTone};
})();
// Report asynchronous audio failures from simple student functions without hiding them.
window.addEventListener('unhandledrejection',event=>{
  document.querySelector('#audio-status').textContent=event.reason?.message||'Audio could not play.';
  event.preventDefault();
});
