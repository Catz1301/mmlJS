var noteString;
var player = new Player();
player.init();

var noteFreq = null;
var noteName = null;
var noteInputEl = document.getElementById('noteIn');
var notePlayer = null;
var currentNote = 0;
const timeBase = 60_000;

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
	musicNotes = [];
	let mmlArea = document.getElementById("mmlInput");
	let mml = mmlArea.value;
	// console.log(mml);
	parseMML(mml);
	
	
	let mmlControls = document.getElementById("mmlControls");
	mmlControls.style.display = "block";
}

function playMML() {
	let music = new Music(musicNotes);
	player.init();
	player.playMusic(music);
}

function playMML2() {
	if (notePlayer == null) {
		for (let note in musicNotes) {
			if (note instanceof Note) {
				frequencies[frequencies.length] = note.frequency;
			}
		}
		if (frequencies.length > 0) {
			currentNote = 0;
			player.resume();
			notePlayer = setInterval(() => {
				if (currentNote < frequencies.length) {
					player.changeFrequency(frequencies[currentNote]);
				}
				currentNote++;
			}, 500);
			let pauseBtn = document.getElementById('pauseMML');
			pauseBtn.disabled = false;
		}
	} else {
		console.error("There is already a player playing.");
		alert("Already playing!");
	}
}

function pauseMML() {
	if (notePlayer != null) {
		clearInterval(notePlayer);
		notePlayer = null;
		player.pause();
	} else {
		console.error("Player is already stopped.");
		alert("Already stopped!");
	}
}
//322 lines of code - 10/06/2021