const Discord = require("discord.js");
const keepAlive = require('./server');

const bot = new Discord.Client();
const token = process.env.BOT_TOKEN;

["aliases", "commands"].forEach((x) => (bot[x] = new Discord.Collection()));
["console", "command", "event"].forEach((x) => require(`./handlers/${x}`)(bot));

keepAlive();
bot.login(token);