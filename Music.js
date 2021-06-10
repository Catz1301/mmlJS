class Music {
	constructor(notes) {
		if (notes instanceof Array) {
			for (let note in notes) {
				if (!(note instanceof Note)) {
					throw new TypeError("Music constructor must be provided with array containing only objects that ar instances of Note.");
				}
			}
		}
	}
}