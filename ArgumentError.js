class ArgumentError extends Error {
	constructor(message) {
		super();
		this.message = message;
		this.name = "ArgumentError";
		this.stack = console.trace();
	}
}