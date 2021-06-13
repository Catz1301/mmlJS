class Music {
	constructor(notes) {
		this.tempo = 120;
		this.tempoMS = timeBase / this.tempo;
		if (notes instanceof Array) {
			for (let note in notes) {
				if (note instanceof Note || note instanceof SpecialNote) {
					throw new TypeError("Music constructor must be provided with array containing only objects that are instances of Note.");
				}
			}
			this.notes = notes;
		} else {
			throw new TypeError("Music constructor must be provided with array containing only objects that are instances of Note.");
		}
		this.note = null;
		this.currentNote = 0;
		this.time = 0;
	}

	start() {
		this.note = this.notes[0];
	}

	getNextNote() {
		this.currentNote++;
		if (this.currentNote < this.notes.length) {
			if (this.note instanceof Note) {
				this.note = this.notes[this.currentNote];
				this.time = (this.tempoMS * this.currentNote+1) - ((this.tempo/this.note.noteLength)*timeBase);
				return this.note;
			}
		}
	}

	hasNextNote() {
		return (this.currentNote + 1 < this.notes.length);
	}
}