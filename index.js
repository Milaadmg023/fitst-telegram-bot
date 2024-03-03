const { Telegraf } = require("telegraf");
const http = require("http");
const fs = require("fs");
const request = require("request");

const bot = new Telegraf("6831885249:AAG39sQGzLYEbKVW3iW8Jnu73a2qe4lS_uU"); // Replace with your actual Telegram bot token

bot.on("error", (err, ctx) => {
  console.error("Error occurred:", err);

  // Handle specific errors
  if (err.code === 400) {
    // Bad Request
    ctx.reply("Bad request. Please try again.");
  } else if (err.code === 401) {
    // Unauthorized
    ctx.reply("Unauthorized. Please check your bot token.");
  } else if (err.code === 404) {
    // Not Found
    ctx.reply("Not found. Please try a different command.");
  } else {
    // Other errors
    ctx.reply("An error occurred. Please try again later.");
  }
});

bot.start((ctx) => ctx.reply("سلام! من یک ربات ساده هستم."));

bot.command("song", async (ctx) => {
  const response = await fetch("")
});

bot.on("text", async (ctx) => {
  function replaceSpaces(text) {
    return text.replace(/\s+/g, "+");
  }
  const songName = replaceSpaces(ctx.message.text);
  const response = await fetch(
    `https://saavn.dev/search/songs?query=${songName}`
  );
  const data = await response.json();
  ctx.reply(data.data.results[0].name);
  const url = `${data.data.results[0].downloadUrl[0].link}`; 
  const filePath = `${data.data.results[0].name}.mp3`; 
  request(url, { encoding: "binary" })
    .pipe(fs.createWriteStream(filePath))
    .on("finish", async() => {
      ctx.reply('download finished')
      await ctx.replyWithAudio({source : filePath})
    });
});

bot.launch();