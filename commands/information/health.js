// Used NPM Packages
const Discord = require("discord.js");
const Canvas = require("canvas");
const moment = require("memory");
const os = require("os");
const clc = require("cli-color");
const fs = require("fs");

// External JSON Files
const color = require("../../colors.json");
const config = require("../../config.json");

// MS Time Calculator
function msToTime(s) {
    function pad(n, z) {
        z = z || 2;
        return ("00" + n).slice(-z);
    }
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    return pad(hrs) + "h " + pad(mins) + "m " + pad(secs) + "s";
}

// Time to "00:00:00" Format
function convertTime(sec) {
    var hours = Math.floor(sec / 3600);
    hours >= 1 ? (sec = sec - hours * 3600) : (hours = "00");
    var min = Math.floor(sec / 60);
    min >= 1 ? (sec = sec - min * 60) : (min = "00");
    sec < 1 ? (sec = "00") : void 0;

    min.toString().length == 1 ? (min = "0" + min) : void 0;
    sec.toString().length == 1 ? (sec = "0" + sec) : void 0;

    return hours + ":" + min + ":" + sec;
}

const uptime = convertTime(os.uptime);

module.exports = {
    config: {
        name: "health",
        description: "Get stats and other information about the bot.",
        usage: " ",
        category: "information",
        accessableby: "Members",
        aliases: ["stats", "botinfo"],
    },

    run: async (bot, message, args) => {
        let mb = memory();
        var botIcon = bot.user.displayAvatarURL();

        let botPing = Date.now() - message.createdTimestamp;

        try {
            const botStats = new Discord.MessageEmbed()
                .setColor(color.default)
                .setTitle("Bot Info")
                .setThumbnail(botIcon)
                .addField("Uptime", msToTime(bot.uptime), true)
                .addField("Guilds", ` **${bot.guilds.cache.size}** server(s)`, true)
                .addField("Users", `**${bot.users.cache.size}** users`, true)
                .addField("Node.JS Version", `**${process.version}**`, true)
                .addField("Discord.JS Version", `**v${Discord.version}**`, true)
                .addField("Data Usage", `**${mb}** MB`, true)
                .addField("Bot Ping", `**${botPing}** ms`, true)
                .addField("Computer OS", `${os.type} | ${os.arch} arch`, true)
                .addField("Computer Uptime", `${uptime}`, true);

            if (botPing < 150) {
                botStats.setColor(color.green);
            } else {
                botStats.setColor(color.red);
            }

            message.channel.send(botStats);
        } catch (e) {
            message.channel.send("Whoops, looks like that command is broken!");
            console.log(
                "New Error | " +
                clc.bold.underline.xterm(160)(`${module.exports.config.name}.js`)
            );
            fs.appendFileSync(
                "./logs/error.log",
                `New Handler Error (HEALTH.JS):\n${
                (e, e.stack.split("\n\n"))
                }\nRecorded At: ${Date()}\n\n`
            );
        }
    },
};