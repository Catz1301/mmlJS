class Player {
	constructor() {
		this._initialized = false;
		this._initiated = false;
		this.audioContext = new AudioContext();
		this._gain = this.audioContext.createGain();
		this._gain.gain.value = 1.0;
		this.wave = this.audioContext.createPeriodicWave(tromboneWaveTable.real, tromboneWaveTable.imag);
		this.oscillators = [];
		this._gains = [];
		this.useTrombone = false;
		// if (document.getElementById('useTrombone') != null) {
		if (document.getElementById("useTrombone").checked == true)
			this.useTrombone = true;
		//}
		/* if (document.getElementById("useTrombone").checked == true) {
				this.wave = this.audioContext.createPeriodicWave(tromboneWaveTable.real, tromboneWaveTable.imag);
				this.osc.setPeriodicWave(this.wave);
		} */
	}
	init() {
		this.oscillators = [];
		// let osc = this.audioContext.createOscillator();
		this.addOscillator(261.6255653005986);
		this._gain = this.audioContext.createGain();
		this._gain.gain.value = 1.0;
		if (this.useTrombone) {
			// this.wave = this.audioContext.createPeriodicWave(tromboneWaveTable.real, tromboneWaveTable.imag);
			this.oscillators[0].setPeriodicWave(this.wave);
		}
		this.oscillators[0].connect(this._gain);
		// this.oscillators.push(osc);
		this._gain.connect(this.audioContext.destination);
		this._initialized = true;
		console.log(this.oscillators.length);
	}
	setGain(newGainValue) {
		if (this._initiated)
			this._gain.gain.value = newGainValue;
	}
	addOscillator(x) {
		console.log(typeof x);
		let frequency = 0;
		let connectToGain = false;
		let waveType = "sine";
		let periodicWave = null;
		if (x.type == "OscillatorSettings") {
			frequency = x.frequency;
			connectToGain = x.connectToGain;
			if (x.waveType instanceof PeriodicWave)
				periodicWave = x.waveType;
			else
				waveType = x.waveType;
		} else if (typeof x === "number") {
			frequency = x;
		}
		if (x == null || x == undefined) {
			frequency = 261.6255653005986;
		}
		let oscillator = this.audioContext.createOscillator();
		let oscGain = this.audioContext.createGain();
		oscillator.connect(oscGain);
		oscillator.frequency.value = frequency;
		if (periodicWave !== null)
			oscillator.setPeriodicWave(periodicWave);
		else
			oscillator.type = waveType;
		if (this.useTrombone) {
			// this.wave = this.audioContext.createPeriodicWave(tromboneWaveTable.real, tromboneWaveTable.imag);
			oscillator.setPeriodicWave(this.wave);
		}
		// if (connectToGain)
		// 	oscillator.connect(this._gain);
		// else
		// 	oscillator.connect(this.audioContext.destination);
		oscGain.connect(this.audioContext.destination);
		this._gains.push(oscGain);
		this.oscillators.push(oscillator);
	}
	play() {
		if (this.audioContext == null || this.oscillators.length == 0 || this._initialized == false) {
			throw new Error("Audio Context and OscillatorNode needs to be initialized first!");
		} else {
			this.oscillators.forEach((oscillator) => {
				//oscillator.frequency.value = frequency;
				try {
					oscillator.start();
				} catch (e) {
					console.error(e);
				}
			});
			// this.osc.frequency.value = frequency;
			// this.osc.start();
			this._initiated = true;
		}
	}
	playMusic(musicObject) {
		if (!(musicObject instanceof Music)) {
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

	setMasterVolume(volume) {
		this._gain.gain.value = volume;
	}

	setOscillatorVolume(oscillator, volume) {
		if (oscillator.destination instanceof GainNode)
			oscillator.destination.gain.value = volume;
	}

	pause() {
		if (this.audioContext.state !== "suspended")
			this.audioContext.suspend();
		else
			console.warn("Player is already paused");
	}
	resume() {
		if (this.audioContext.state === "suspended")
			this.audioContext.resume();
		else
			console.warn("Player is already playing");
	}
}

/* -------------------------------------------------- */

/* // TODO: Create gain obj

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
		} *\/
	}

	init() {
		this.oscillators = [];
		// let osc = this.audioContext.createOscillator();
		this.addOscillator(261.6255653005986);
		this._gain = this.audioContext.createGain();
		this._gain.gain.value = 1.0;

		if (this.useTrombone) {
			// this.wave = this.audioContext.createPeriodicWave(tromboneWaveTable.real, tromboneWaveTable.imag);
			this.oscillators[0].setPeriodicWave(this.wave);
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

	addOscillator(frequencies) {
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
		oscillator.type = OscillatorType
	}

	play() {
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
} */