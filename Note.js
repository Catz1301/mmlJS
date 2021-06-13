class Note {
	constructor(noteStr = "c", octave = 4, noteLength = 4) {
		if (typeof (noteStr) == Number) {
			this.frequency = noteStr;
		} else {
			let note = noteStr.toLowerCase()[0];
			let modifier;
			let octaveParsed = parseInt(octave);

			if (noteStr.length > 1) {
				if (noteStr.length > 2) {
					console.error("noteStr parameter should only be up to 2 characters long, and no less than one character long.");
					return -1;
				}
				modifier = noteStr.toLowerCase().charAt(1);
				if (!((modifier == '#' || modifier == '+') || modifier == '-')) {
					alert("Valid note modifiers are #, +, or -!");
					return (double) - 1;
				}
			}
			// console.log(note, "modifier:", modifier);
			if (!((note.charCodeAt(0) >= 65 && note.charCodeAt(0) <= 71) || (note.charCodeAt(0) >= 97 && note.charCodeAt(0) <= 103))) {
				alert("Valid note names are A - g!");
				return -1;
			}
			if (!(octaveParsed >= 1 && octaveParsed <= 8)) {
				alert("Valid octave range is 1 - 8 (inclusive)!");
				return -1;
			}
			this.frequency = Note.getNoteFrequency(noteStr, octaveParsed);
		}
		this.noteLength = noteLength;
	}

	static getNoteFrequency(noteStr, octave) {
		// console.log(noteStr);
		let note = noteStr.toLowerCase()[0];
		let modifier;
		octave = parseInt(octave);
		if (noteStr.length > 1) {
			if (noteStr.length > 2) {
				console.error("noteStr parameter should only be up to 2 characters long, and no less than one character long.");
				return -1;
			}
			modifier = noteStr.toLowerCase().charAt(1);
			if (!((modifier == '#' || modifier == '+') || modifier == '-')) {
				alert("Valid note modifiers are #, +, or -!");
				return (double) - 1;
			}
		}
		// console.log(note, "modifier:", modifier);
		if (!((note.charCodeAt(0) >= 65 && note.charCodeAt(0) <= 71) || (note.charCodeAt(0) >= 97 && note.charCodeAt(0) <= 103))) {
			alert("Valid note names are A - g!");
			return -1;
		}
		if (!(octave >= 1 && octave <= 8)) {
			alert("Valid octave range is 1 - 8 (inclusive)!");
			return -1;
		}
		let tuningPitch = 261.6255653005986;
		let tuningNote = 'c';
		let tuningOctave = 4;

		let halfSteps = 0;
		console.log("note:", note + ",", "charCode:", note.charCodeAt(0));
		console.log("tuningNote:", tuningNote + ",", "charCode:", tuningNote.charCodeAt(0));
		if (octave == tuningOctave) {
			// console.assert((note.charCodeAt(0) == "a".charCodeAt(0)), note, "is equal to", tuningNote + ", whos charCode is equal to", tuningNote.charCodeAt(0));
			if (note.charCodeAt(0) == tuningNote.charCodeAt(0)) {
				return 261.6255653005986;
			} else /* if (note.charCodeAt(0) > tuningNote.charCodeAt(0)) */ {
				if (note == 'd') {
					halfSteps += 2;
				} else if (note == 'e') {
					halfSteps += 4;
				} else if (note == 'f') {
					halfSteps += 5;
				} else if (note == 'g') {
					halfSteps += 7;
				} else if (note == 'a') {
					halfSteps += 9;
				} else if (note == 'b') {
					halfSteps += 11;
				}
			}
		} else if (octave > tuningOctave) {
			//halfSteps += 3;
			//if (octave - tuningOctave > 1) {
			for (let i = 0; i < (octave - tuningOctave); i++) {
				halfSteps += 12;
			}
			//}
			// if (note.charCodeAt(0) > tuningNote.charCodeAt(0)) {
			if (note == 'd') {
				halfSteps += 2;
			} else if (note == 'e') {
				halfSteps += 4;
			} else if (note == 'f') {
				halfSteps += 5;
			} else if (note == 'g') {
				halfSteps += 7;
			} else if (note == 'a') {
				halfSteps += 9;
			} else if (note == 'b') {
				halfSteps += 11;
			}
			// }
		} else {
			for (let i = 0; i < (tuningOctave - octave); i++) {
				halfSteps -= 12;
			}
			// if (note.charCodeAt(0) > tuningNote.charCodeAt(0)) {
			if (note == 'd') {
				halfSteps += 2;
			} else if (note == 'e') {
				halfSteps += 4;
			} else if (note == 'f') {
				halfSteps += 5;
			} else if (note == 'g') {
				halfSteps += 7;
			} else if (note == 'a') {
				halfSteps += 9;
			} else if (note == 'b') {
				halfSteps += 11;
			}
			// }
		}

		if (modifier == '-')
			halfSteps--;
		else if (modifier == '#' || modifier == '+')
			halfSteps++;
		console.log("Half Steps: " + halfSteps);

		let halfStepBase = Math.pow(2.0, (1.0 / 12.0));
		let frequency = tuningPitch * Math.pow(halfStepBase, halfSteps);

		return frequency;
	}
}