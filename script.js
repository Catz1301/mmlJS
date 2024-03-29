var noteString;
var player = new Player();
player.init();

var noteFreq = null;
var noteName = null;
var noteInputEl = document.getElementById("noteIn");
var notePlayer = null;
var currentNote = 0;
//@ts-ignore
// eslint-disable-next-line no-unused-vars
const timeBase = 60000;
document.addEventListener("keydown", decGain);

function test() {
	let oscConfig = {
		type: "OscillatorSettings",
		waveType: "sine" /* player.wave */ ,
		frequency: 660,
		connectToGain: true
	}
	player.addOscillator(oscConfig);
	oscConfig.frequency = 440;
	player.addOscillator(440);
	player.play();
}

function toggleTrombone() {
	let usingTrombone = document.getElementById('useTrombone').checked;
	if (usingTrombone) {
		for (let i = 0; i < player.oscillators.length; i++) {
			player.oscillators[i].setPeriodicWave(player.wave);
		}
	} else {
		for (let i = 0; i < player.oscillators.length; i++) {
			player.oscillators[i].type = "sine"
		}
	}
}

function doStuff() {
	var noteInput;
	if (noteInputEl.value == "") {
		alert("Enter something in the note octave box!");
		return;
	} else {
		noteInput = noteInputEl.value;
	}
	try {
		let note = "";
		let octave = -1;

		if (noteInput.split(" ").length > 1) {
			let noteOctaveArr = noteInput.split(" ");
			note = noteOctaveArr[0];
			octave = noteOctaveArr[1];
		} else {
			note = noteInput;
			octave = 6;
		}
		let noteFrequency = Note.getNoteFrequency(note, octave);
		document.getElementById("status").innerText = "Frequency of " + note + " on octave " + octave + " is: " + noteFrequency;
		noteFreq = noteFrequency;
		noteName = note;
	} catch (e) {
		console.log(e.name);
		console.log(e);
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
	parseMML(mml);
	if (!player.hasBeenInitiated())
		player.play(Note.getNoteFrequency("c", 4));
	// player.init();
	let mmlControls = document.getElementById("mmlControls");
	mmlControls.style.display = "block";
}

function playMML() {
	if (notePlayer == null) {
		if (frequencies.length > 0) {
			currentNote = 0;
			player.resume();
			notePlayer = setInterval(() => {
				if (currentNote < frequencies.length) {
					player.changeFrequency(player.oscillators[0], frequencies[currentNote]);
				}
				currentNote++;
			}, 500);
			let pauseBtn = document.getElementById("pauseMML");
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

function decGain(e) {
	if (e.key == "g") {
		if (player != null && player != undefined && player.hasBeenInitiated()) {
			player.setGain(player._gain.gain.value -= 0.05);
		}
	}
}

//322 lines of code - 10/06/2021