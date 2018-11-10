require('colors')
require('dotenv').config()

// const Bot = require('./bot')
// const bot = new Bot('karifan_bot', process.env.BOT_KEY)
// console.log(process.env.BOT_KEY)

// bot.use('command','ping',(msg, next) => {
// 	console.log(msg)
// 	msg.send('pong')
// })


// bot.use('command', msg => {
// 	console.log('command'.blue, msg.command.yellow)
// })

// bot.use('entities_me', msg => {

// 	console.log(msg)
// })

// bot.use('entities', (msg, next) => {
// 	console.log('entities',msg.entitiesFor, msg.entitiesMe)
// 	next()
// })

// bot.use('hashtag', msg => {
// 	console.log('hashtag',msg.hashtags)
// })



// bot.use('reply_me', (msg, next) => {
// 	console.log('reply_me')
// 	next()
// })

// bot.use('reply', (msg, next) => {
// 	console.log('reply')
// 	next()
// })

// bot.use('photo', msg => {
// 	console.log('photo')
// })


// bot.use((msg, next) => {
// 	console.log('*/**************  END message  *******************')
// 	console.log(msg)
// 	msg.send('send')
// 	next()
// })



// console.log(Bot)
// console.log(new Bot())

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = 'YOUR_TELEGRAM_BOT_TOKEN';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(process.env.BOT_KEY, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
	bot._call(0,msg)
  const chatId = msg.chat.id;
	console.log(msg)
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});

// // console.log(bot)