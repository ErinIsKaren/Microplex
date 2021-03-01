const Discord = require("discord.js");
const { readdirSync } = require("fs");
const color = require("../../colors.json");
const config = require("../../config.json");
const clc = require("cli-color");

module.exports = {
  config: {
    name: "8ball",
    description: "",
    usage: "",
    category: "fun",
    accessableby: "Members",
    aliases: ["ball", "8b", "future"],
  },
  run: async (bot, message, args) => {
    try {
      if (!args[0])
        return message.reply("I can't give an awnser without a full question!");
      let replies = [
        "Yes!",
        "100%",
        "You got it!",
        "I don't know.",
        "That is very unclear!",
        "Can't say.",
        "Ask again later.",
        "No!",
      ];

      let result = Math.floor(Math.random() * replies.length);
      let question = args.slice(0).join(" ");

      let icon = message.author.displayAvatarURL();
      let ballembed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, icon)
        .setThumbnail(icon)
        .setTimestamp()
        .setColor("#FF9900")
        .addField("Question", question, true)
        .addField("Anwser", replies[result], true);

      message.channel.send(ballembed);
    } catch (e) {
      message.channel.send("Whoops, looks like that command is broken!");
      console.log(
        "New Error | " +
          clc.bold.underline.xterm(160)(`${module.exports.config.name}.js`)
      );
      fs.appendFileSync(
        "./logs/errorLog.md",
        `New Handler Error (8BALL.JS):\n${
          (e, e.stack.split("\n\n"))
        }\nRecorded At: ${Date()}\n\n`
      );
    }
  },
};