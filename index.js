const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

// Listen for any kind of message. There are different kinds of
// messages.
// bot.on("message", (msg) => {
//   const chatId = msg.chat.id;

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, "Received your message");
// });

// Matches "/joke"
bot.onText(/\/joke/, async (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const response = await axios.get(
    "http://www.official-joke-api.appspot.com/random_joke"
  );

  const setup = response.data.setup;
  const punchLine = response.data.punchline;

  const chatId = msg.chat.id;
  //   const resp = match[1]; // the captured "whatever"

  // reply with joke
  bot.sendMessage(chatId, setup + "\n" + punchLine);
});
