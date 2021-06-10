var noteString;
var player = new Player();
player.init();
console.log("Meow");
// var noteInput = prompt("Enter a note: ");
// console.log(noteInput);
var noteFreq = null;
var noteName = null;
var noteInputEl = document.getElementById('noteIn');

function doStuff() {
	if (noteInputEl.value == "") {
		alert("Enter something in the note octave box!");
		return;
	} else {
		noteInput = noteInputEl.value;
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
		let noteFrequency = Note.getNoteFrequency(note, octave);
		document.write("Frequency of " + note + " on octave " + octave + " is: " + noteFrequency);
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
}

function doParsing() {
	frequencies = [];
	let mmlArea = document.getElementById("mmlInput");
	let mml = mmlArea.value;
	// console.log(mml);
	let freqs = parseMML(mml);
	player.init();
	if (!player.hasBeenInitiated())
		player.play(Note.getNoteFrequency("c", 4));
	let i = 0;
	//player.play();
	let notes = setInterval(() => {
		if (i < freqs.length) {
			player.changeFrequency(freqs[i]);
		}
		i++;
	}, 700);
}

//322 lines of code - 10/06/2021