class Mdv {
	constructor(type, command, cb) {
		if (typeof type == 'function') {
			cb = type;
			type = 'all';
			command = null;
		} else if (typeof type == 'string' && typeof command == 'function') {
			cb = command;
			command = null;
		} else if (type !== 'command' || !typeof command == 'string' || !typeof cb == 'function') {
			cb = (msg, next) => {
				console.error(new Error(`Bad data: [${type}, ${command}, ${typeof cb}]`))
			}
			type = 'all';
			command = null;
			console.error(new Error(`Bad data: [${type}, ${command}, ${typeof cb}]`))
		}
		this.type = type;
		this.command = command
		this.cb = cb
	}

	is(msg) {
		if (this.type == 'all') return true;

		return msg.types.indexOf(this.type) >= 0 && (!this.command || msg.command == this.command);
	}

	_call(msg, next) {
		if (!this.is(msg)) return next();
		this.cb(msg, next);
	}
}


module.exports = Mdv
