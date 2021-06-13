var frequencies = [];
var musicNotes = [];
function parseMML(mml) {
	
	let octave = 4;
	// let musicNotes = [];
	for (let i = 0; i < mml.length; i++) {
		console.log(mml[i]);
		let note = null;
		let specialNote = null;
		let noteLength = "";
		let tempo = null;
		if (mml[i] == '<') { // check if character is octave increase operand
			if (octave != 8)
				octave++
		} else if (mml[i] == '>') { // check if character is octave decrease operand
			if (octave != 0)
				octave--;
		} else if (mml[i] == '@') { 
			if (i < mml.length-1) {
				let octaveNum = parseInt(mml[i+1]);
				if (octaveNum != undefined && octaveNum != null && octaveNum != Number.NaN) { // did parseInt actually get a number?
					if (octaveNum <= 8 && octaveNum >= 1) { // change lower limit to 0 if users wish for pedal tones.
						octave = octaveNum;
						
					} else {
						throw new RangeError("Octave can only be from 1 through 8.");
					}
				} else {
					throw new SyntaxError("Invalid syntax at position " + i + ". Unexpected or incomplete symbol '@'");
				}
			}
			++i;
			continue;
		} else if ((/[a-gA-G]/).test(mml[i].toString())) { // check if character is a character in the range of a through g, case-insensitive.
			note = mml[i];
			if (i+1 < mml.length) {
				if ((mml[i+1] == "#" || mml[i+1] == "+") || mml[i+1] == "-") { // check if a modifier exists afterwards;
					note = note + mml[i+1];
					++i;
				}
			}
			if (i+1 < mml.length) {
				while ((i+1 < mml.length) && (/[0-9]/).test(mml[i+1])) {
					noteLength = mml[i+1];
					++i;
				}
				if (noteLength == "") {
					noteLength = "4";
				}
				if (!(
					noteLength == "1" ||
					noteLength == "2" ||
					noteLength == "4" ||
					noteLength == "8" ||
					noteLength == "16" ||
					noteLength == "32" ||
					noteLength == "64" ||
					noteLength == "128" ||
					noteLength == "256" ||
					noteLength == "512")
				) {
					throw new ArgumentError("Note length must be between 1-512, and must also be a multiple of two, with the exception of 1");
				}
			}
		} else if (mml[i] == "t") {
			if (i+1 < mml.length) {
				while ((i+1 < mml.length) && (/[0-9]/).test(mml[i+1])) {
					tempo = mml[i+1];
					++i;
				}
				if (noteLength == "") {
					throw new SyntaxError("Incomplete syntax at position " + i + ". Expected a number following 't'");
				}
				specialNote = new SpecialNote('tempo', tempo);
			}
		} else {
			throw new SyntaxError("Invalid syntax at position " + i + ". Expected a musical note name or octave operand");
		}
		console.log(note)
		if (note != null)
			musicNotes[musicNotes.length] = new Note(note, octave, noteLength);
		if (specialNote != null)
			musicNotes[musicNotes.length] = specialNote;
	}
	console.log(musicNotes);
	return musicNotes;
}