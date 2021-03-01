// Require Packages
const { prefix } = require("../../config.json");
const { readdirSync } = require("fs");

module.exports = async (bot, message) => {
    // Only Users Arg
    if (message.author.bot) return;

    // Make Commands Not Case Sensitive
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    // Command Prefixs and Aliases
    if (!message.content.startsWith(prefix)) return;
    let commandfile =
        bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
    if (commandfile) commandfile.run(bot, message, args);
};