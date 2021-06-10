var noteString;
var player = new Player();
player.init();
console.log("Meow");
var noteInput = prompt("Enter a note: ");
// console.log(noteInput);
var noteFreq = null;
var noteName = null;
var noteInputEl = document.getElementById('noteIn');

function doStuff() {
	if (noteInputEl.value == "") {
		console.log("Enter something in the box!");
		return;
	}
try {
    let note = "";
    let octave = -1;
    
    if (noteInput.split(' ').length > 1) {
        let noteOctaveArr = noteInput.split(' ');
        note = noteOctaveArr[0];
        octave = noteOctaveArr[1];
    } else {
        note = noteInput;
        octave = 6;
    }
    let noteFrequency = getNoteFrequency(note, octave);
    alert("Frequency of " + note + " on octave " + octave + " is: " + noteFrequency);
    noteFreq = noteFrequency;
    noteName = note;
} catch (e) {
    console.log(e.name);
    console.log(e)
}

if (noteFreq != null) {
    let startPlaying = confirm("Start playing the note " + noteName + "?");
    if (startPlaying) {
        player.play(noteFreq);
    }
}