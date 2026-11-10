// Start here. These functions are the student-editable layer.
// The supplied helpers draw birds and create quiet tones.
// All functions below change something unless a return value is documented.

function releaseBirds(count) {
  // count: a whole number from 1 to 20. Adds to the existing population.
  // A release beyond the 160-bird limit is rejected without partial changes.
  flock.addBirds(count);
}

function playChirp() {
  // Fixed values to investigate: frequency in Hz, duration in seconds.
  // This does not add birds. Sound must be enabled in the interface.
  sound.playTone(600, 0.15);
}

// Extra capabilities: investigate one, predict a result, then try it.
function setWind(speed) {
  // Number from -5 to 5. Negative moves left; positive moves right.
  // Replaces the wind setting; does not add to it.
  flock.setWind(speed);
}

function gatherAt(x, y) {
  // Coordinates from 0 to 100, as percentages of the sky's width/height.
  // (0, 0) is top left. Sets an attraction point; no teleporting.
  flock.setTarget(x, y);
}

function scatterFlock(strength) {
  // Number from 0 to 5. Gives birds an outward push and clears attraction.
  flock.scatter(strength);
}

function setBirdColor(color) {
  // One of: "teal", "coral", "gold", "violet". Changes all birds' color.
  flock.setColor(color);
}

function getBirdCount() {
  // Returns a number. Does not release birds or change the flock.
  return flock.count();
}
