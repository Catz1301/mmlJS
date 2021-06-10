function getNoteFrequency(noteStr, octave) {
    // console.log(noteStr);
    let note = noteStr.toUpperCase()[0];
    let modifier;
    octave = parseInt(octave);
    if (noteStr.length > 1) {
        if (noteStr.length > 2) {
            console.error("noteStr parameter should only be up to 2 characters long, and no less than one character long.");
            return -1;
        }
        modifier = noteStr.toLowerCase().charAt(1);
        if (!(modifier == '#' || modifier == 'b')) {
            alert("Valid note modifiers are # or b!");
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
    let tuningPitch = 440.0;
    let tuningNote = 'a';
    let tuningOctave = 4;

    let halfSteps = 0;

    if (octave == tuningOctave) {
        if (note.charCodeAt(0) == tuningNote.charCodeAt(0)) {
            return 440.0;
        } else if (note.charCodeAt(0) > tuningNote.charCodeAt(0)) {
            if (note == 'b') {
                halfSteps += 2;
            } else if (note == 'c') {
                halfSteps += 3;
            } else if (note == 'd') {
                halfSteps += 5;
            } else if (note == 'e') {
                halfSteps += 7;
            } else if (note == 'f') {
                halfSteps += 8;
            } else if (note == 'g') {
                halfSteps += 10;
            }
        }
    } else if (octave > tuningOctave) {
        //halfSteps += 3;
        //if (octave - tuningOctave > 1) {
        for (let i = 0; i < (octave - tuningOctave); i++) {
            halfSteps += 12;
        }
        //}
        if (note.charCodeAt(0) > tuningNote.charCodeAt(0)) {
            if (note == 'b') {
                halfSteps += 2;
            } else if (note == 'c') {
                halfSteps += 3;
            } else if (note == 'd') {
                halfSteps += 5;
            } else if (note == 'e') {
                halfSteps += 7;
            } else if (note == 'f') {
                halfSteps += 8;
            } else if (note == 'g') {
                halfSteps += 10;
            }
        }
    } else {
        for (let i = 0; i < (tuningOctave - octave); i++) {
            halfSteps -= 12;
        }
        if (note.charCodeAt(0) > tuningNote.charCodeAt(0)) {
            if (note == 'b') {
                halfSteps += 2;
            } else if (note == 'c') {
                halfSteps += 3;
            } else if (note == 'd') {
                halfSteps += 5;
            } else if (note == 'e') {
                halfSteps += 7;
            } else if (note == 'f') {
                halfSteps += 8;
            } else if (note == 'g') {
                halfSteps += 10;
            }
        }
    }

    if (modifier == 'b')
        halfSteps--;
    else if (modifier == '#')
        halfSteps++;
    console.log("Half Steps: " + halfSteps);

    let halfStepBase = Math.pow(2.0, (1.0 / 12.0));
    let frequency = tuningPitch * Math.pow(halfStepBase, halfSteps);

    return frequency;
}