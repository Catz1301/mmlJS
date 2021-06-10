// TODO: Create gain obj

class Player {
	constructor() {
		this.audioContext = new AudioContext();
		this.osc = this.audioContext.createOscillator();
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
		}
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