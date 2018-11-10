const botApi = require('./bot_api')
const Mdv = require('./mdv')
const Msg = require('./msg')

// botApi(process.env.BOT_KEY, {polling:true}).on('message',console.log)

class Bot {
	constructor(name, token) {
		this.name = name;
		this.token = token;
		this.api = botApi(token)
		this.middlewares = [];
		this.init()
	}

	init() {
		this.api.on('message', msg => {
			const nMsg = new Msg(msg, this.api, this.name);
			this._call(0, nMsg);
		})

		this.api.on('error',console.error)
	}

	_call(index, msg) {
		try {
			if (!this.middlewares[index]) return;
			this.middlewares[index]._call(msg, err => {
				if(err) return console.error(err);
				this._call(index + 1, msg);
			})
		} catch(e) {console.error(e)}

	}

	use(type, command, cb) {
		this.middlewares.push(new Mdv(type, command, cb))
	}

	send(id, message) {
		this.api.sendMessage(id, message)
	}
}


module.exports = Bot