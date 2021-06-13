// TODO: Create gain obj

class Player {
	constructor() {
		this._initialized = false;
		this._initiated = false;
		this.audioContext = new AudioContext();
		this._gain = null;
		//this._gain.gain.value = 1.0;
		this.wave = this.audioContext.createPeriodicWave(tromboneWaveTable.real, tromboneWaveTable.imag);
		this.oscillators = [];
		this.useTrombone = false;
		if (document.getElementById("useTrombone").checked == true)
			this.useTrombone = true;
		/* if (document.getElementById("useTrombone").checked == true) {
			this.wave = this.audioContext.createPeriodicWave(tromboneWaveTable.real, tromboneWaveTable.imag);
			this.osc.setPeriodicWave(this.wave);
		} */
	}

	init() {
		let osc = this.audioContext.createOscillator();
		this._gain = this.audioContext.createGain();
		this._gain.gain.value = 1.0;

		if (this.useTrombone) {
			// this.wave = this.audioContext.createPeriodicWave(tromboneWaveTable.real, tromboneWaveTable.imag);
			osc.setPeriodicWave(this.wave);
		}

		osc.connect(this._gain);
		this.oscillators.push(osc);
		this._gain.connect(this.audioContext.destination);
		this._initialized = true;
		console.log(this.oscillators.length)
	}

	setGain(newGainValue) {
		if (this._initiated)
			this._gain.gain.value = newGainValue;
	}

	addOscillator(frequency) {
		if (frequency == null || frequency == undefined) {
			frequency = 261.6255653005986;
		}
		let oscillator = this.audioContext.createOscillator();
		oscillator.frequency.value = frequency;
		if (this.useTrombone) {
			// this.wave = this.audioContext.createPeriodicWave(tromboneWaveTable.real, tromboneWaveTable.imag);
			oscillator.setPeriodicWave(this.wave);
		}
		oscillator.connect(this._gain);
		this.oscillators.push(oscillator);
	}

	play(frequency, duration = 1) {
		if (this.audioContext == null || this.oscillators.length == 0 || this._initialized == false) {
			throw new Error("Audio Context and OscillatorNode needs to be initialized first!", "UninitializedValueError");
		} else {
			this.oscillators.forEach((oscillator) => {
				oscillator.frequency.value = frequency;
				try {
					oscillator.start();
				} catch (e) {
					console.error(e);
				}
			})
			// this.osc.frequency.value = frequency;
			// this.osc.start();
			this._initiated = true;
		}
	}

	playMusic(musicObject) {
		if (!(frequency instanceof Music)) {
			throw new TypeError("musicObject must be an instance of Music");
		} else {
			// Change this later so that BPM can be dynamic
		}
	}

	hasBeenInitialized() {
		return this._initialized;
	}

	hasBeenInitiated() {
		return this._initiated;
	}

	ready() {
		return (this._initialized && this._initiated);
	}

	changeFrequency(oscillator, newFrequency) {
		if (oscillator instanceof OscillatorNode) {
			oscillator.frequency.value = newFrequency;
		}
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