// TODO: Create gain obj

class Player {
	constructor() {
		this._initiated = false;
		this.audioContext = new AudioContext();
		this.osc = this.audioContext.createOscillator();
		if (document.getElementById("useTrombone").checked == true) {
			this.wave = this.audioContext.createPeriodicWave(tromboneWaveTable.real, tromboneWaveTable.imag);
			this.osc.setPeriodicWave(this.wave);
		}
	}

	init() {
		this.osc.connect(this.audioContext.destination);
	}

	play(frequency, duration = 1) {
		if (this.audioContext == null || this.osc == null) {
			throw new Error("Audio Context and OscillatorNode needs to be initialized first!", "UninitializedValueError");
		} else {
			this.osc.frequency.value = frequency;
			this.osc.start();
			this._initiated = true;
		}
	}
	hasBeenInitiated() {
		return this._initiated;
	}
	changeFrequency(newFrequency) {
		this.osc.frequency.value = newFrequency;
	}

	pause() {
		if (this.audioContext.state !== 'suspended')
			this.audioContext.suspend();
		else
			console.warn("Player is already paused");
	}

	resume() {
		if (this.audioContext.state === 'suspended')
			this.audioContext.resume();
		else
			console.warn("Player is already playing")
	}
}