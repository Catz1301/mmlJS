var frequencies = [];

function parseMML(mml) {
	
	let octave = 4;
	for (let i = 0; i < mml.length; i++) {
		console.log(mml[i]);
		let note = null;
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
				if ((mml[i+1] == "#" || mml[i+1] == "+") || mml[i] == "-") { // check if a modifier exists afterwards;
					note = note + mml[i+1];
					++i;
				}
			}
			
		} else {
			throw new SyntaxError("Invalid syntax at position " + i + ". Expected a musical note name or octave operand");
		}
		console.log(note)
		if (note != null)
			frequencies[frequencies.length] = Note.getNoteFrequency(note, octave);
	}
	console.log(frequencies);
	return frequencies;
}