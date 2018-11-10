const TelegramBot = require('node-telegram-bot-api');



module.exports = token => {
	const bot = new TelegramBot(token, {polling: true});
	// bot.on('message',console.info)
	return bot;
}