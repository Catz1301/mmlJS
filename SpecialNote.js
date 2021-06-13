class SpecialNote {
	constructor(key, value, extra = null) {
		if (key && value) {
			this.key = key;
			this.value = value;
			this.extra = extra;
		}
	}

	getKey() {
		return this.key;
	}
	
	getValue() {
		return this.value;
	}

	getExtra() {
		return this.extra;
	}
}