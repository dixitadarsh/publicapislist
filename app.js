const fs = require('fs-extra');
const TelegramBot = require('node-telegram-bot-api')
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
const request = require('request');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

module.exports = ffmpeg;
// replace the value below with the Telegram token you receive from @BotFather
const token = '5171348681:AAHaHioqU04y7ncs3Hbz4koxq78j3b3kLy8';
const bot = new TelegramBot(token, { polling: true });
// Matches "/echo [whatever]"
bot.onText(/\/api (.+)/, (msg, match) => {

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
  const chatId = msg.chat.id;
  removoption = {
    reply_markup: JSON.stringify({
      remove_keyboard: true
    })
  }
  bot.sendMessage(chatId, 'loading....', removoption);
  var menu;
  var options;
  request('https://api.publicapis.org/categories', { json: true }, (err, res, body) => {
    if (err) {
      return callback(err);
    } else {
      menu = body.categories;
      options = {
        reply_markup: JSON.stringify({
          inline_keyboard: menu.map((x, xi) => ([{
            text: x,
            callback_data: x,
          }])),
        }),
      };
      bot.sendMessage(chatId, 'select category to get related API', options);
    }
  });
});
// Listener (handler) for callback data from /label command
bot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const category = callbackQuery.data;
  bot.sendMessage(chatId, `loading....${category}`);
  var menu;
  var options;
  request(`https://api.publicapis.org/entries?category=${category}`, { json: true }, (err, res, body) => {
    if (err) {
      return callback(err);
    } else {
      menu = body.entries;
      options = {
        reply_markup: JSON.stringify({
          inline_keyboard: menu.map((x) => ([{
            text: x.API,
            url: x.Link
          }])),
        }),
      };
      bot.sendMessage(chatId, 'Enjoy Now...', options);
    }
  })
});