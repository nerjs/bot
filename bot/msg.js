class Msg {
	constructor(msg, api, name) {
		this.types = [];
		this.command = null;
		this.name = name;
		Object.keys(msg).forEach(key => {
			this[key] = msg[key]
		})

		this._api = api;
		try {
		if (msg.text) {
			const match1 = msg.text.match(/^\/([a-z-_0-9]+)\s?$/)
			const match2 = msg.text.match(/^\/([a-z-_0-9]+) (.+)/)
			if (match1 && match1[1]) {
				this.types.push('command');
				this.command = match1[1]
				this.text = ''
			} else if (match2 && match2[1] && match2[2]) {
				this.types.push('command');
				this.command = match2[1]
				this.text = match2[2]
			}
		}
		} catch(e) {console.error(e)}


		if (msg.reply_to_message) {
			this.types.push('reply')
			if (msg.reply_to_message.from) {
				this.replyFrom = msg.reply_to_message.from.username;
				if (this.replyFrom == this.name) {
					this.types.push('reply_me')
				}
			}
		}

		if (this.text && this.entities) this.checkEntities(this.text, this.entities)

		if (this.caption && this.caption_entities) this.checkEntities(this.caption, this.caption_entities)

		if (this.photo) {
			this.types.push('photo')
		}


	}

	checkEntities(txt, ent) {
		if (!ent || !Array.isArray(ent)) return;
		this.entitiesFor = this.entitiesFor || [];
		this.entitiesMe = this.entitiesMe || false;
		
		ent.forEach(e => {
			const _ent = txt.substr(e.offset + 1, e.length - 1)

			if (e.type == 'bot_command') return;
			
			

			switch (e.type) {
				case 'hashtag':
					this.types.push('hashtag');
					this.hashtags = this.hashtags || [];
					this.hashtags.push(_ent)
				break;
				default:
					this.entitiesFor.push(_ent)
				break;
			}
			
		})

		if (this.entitiesFor.length == 0) return;
		this.types.push('entities');
		
		if (this.entitiesFor.indexOf(this.name) >= 0) {
			this.entitiesMe = true;
			this.types.push('entities_me')
		}

	}

	send(txt) {
		this._api.sendMessage(this.chat.id, txt)
	}
}

module.exports = Msg