const Discord = require("discord.js");
const fs = require("fs");
const clc = require("cli-color");
const color = require("../../colors.json");
const config = require("../../config.json");

module.exports = {
  config: {
    name: "suggest",
    description:
      "Let's you suggest new commands or features that you might want to see be added to my bot!",
    usage: "<title> | <suggestion>",
    category: "community",
    accessableby: "Members",
    aliases: ["request"],
  },
  run: async (bot, message, args) => {
    suggestID = Math.round(message.id / 2 - message.author.id / 2 / 5);
    let userIcon = message.author.displayAvatarURL();
    var botIcon = bot.user.displayAvatarURL();

    try {
        if (!args[0])
        return message.reply(
          "You didn't give anything to be suggested! You need a title and a description..."
        );
      let msg = args.join(" ").split(" |");

      let request = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, userIcon)
        .setThumbnail(botIcon)
        .setColor(color.default)
        .setTitle(msg[0])
        .setDescription(msg[1])
        .setFooter(`Suggestion ID: ${suggestID}`);

      let requestSent = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, userIcon)
        .setThumbnail(botIcon)
        .setColor(color.default)
        .setTitle('Your Request for "' + msg[0] + '" Has Been Sent')
        .setDescription(
          'Your request for "' +
            msg[0] +
            '" has been sent out and is waiting for aproval! If your suggestion is accepted you will recive a DM within the next week or month, and you will also be added to my **supporters** list.'
        )
        .setFooter(`Suggestion ID: ${suggestID}`);

      message.channel.send(requestSent);
      console.log(
        `"${msg[0]}" Suggestion by: ` +
          clc.bold.underline.xterm(75)(message.author.tag)
      );

      fs.appendFileSync(
        "./logs/suggestions.log",
        `New Suggestion, "${msg[0]}":\n${msg[1]}\nSuggested by: ${message.author.tag} | (Suggestion ID: ${suggestID}) | (Author ID: ${message.author.id})\n\n`
      );
    } catch (e) {
      message.channel.send("Whoops, looks like that command is broken!");
      console.log(
        "New Error | " +
          clc.bold.underline.xterm(160)(`${module.exports.config.name}.js`)
      );
      fs.appendFileSync(
        "./logs/error.log",
        `New Handler Error (SUGGEST.JS):\n${
          (e, e.stack.split("\n\n"))
        }\nRecorded At: ${Date()}\n\n`
      );
    }
  },
};