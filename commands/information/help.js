const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const { readdirSync } = require("fs");
const { stripIndents } = require("common-tags");
const color = require("../../colors.json");
const clc = require("cli-color");

module.exports = {
    config: {
        name: "help",
        aliases: ["command", "commands"],
        usage: `<command name>`,
        category: "information",
        description:
            "Displays every publicly avalable command that this bot has, can also show you info on how to use a command if you get confused.",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        try {
            var botIcon = bot.user.displayAvatarURL();
            const embed = new MessageEmbed().setColor(color.default).setThumbnail(botIcon);

            if (!args[0]) {
                const categories = readdirSync("./commands/");
                embed.setTitle(`${message.guild.me.displayName} Help | Main Menu`);
                // embed.setDescription(`**${message.guild.me.displayName}** currently has a total of **${bot.commands.size} commands**! The bot's prefix is **${config.prefix}**.`)
                embed.setFooter(
                    `©${config.ownerName} 2020 | Total Commands: ${bot.commands.size}`
                );

                categories.forEach((category) => {
                    const dir = bot.commands.filter(
                        (c) => c.config.category === category
                    );
                    const capitalise =
                        category.slice(0, 1).toUpperCase() + category.slice(1);
                    try {
                        embed.addField(
                            `${capitalise} - [${dir.size} Commands]`,
                            dir.map((c) => `\`${c.config.name}\``).join(" ")
                        );
                    } catch (e) {
                        console.log(e);
                        bot.channels.get(config.errorChannel).send(`${e}`);
                    }
                });

                return message.channel.send(embed);
            } else {
                let command = bot.commands.get(
                    bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase()
                );
                if (!command)
                    return message.channel.send(
                        embed
                            .setTitle(
                                `${message.guild.me.displayName} Help | Invalid Command`
                            )
                            .setDescription(
                                `Please check that you have typed in the command correctly or re-check the list using __**${config.prefix}help**__ to see all avalable commands.\n\nIf yuo keep seeing this error please DM __**${config.ownerName}**__.`
                            )
                            .setColor(color.red)
                    );
                command = command.config;

                embed.addField(
                    "Command",
                    `${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}`,
                    true
                );
                embed.addField(
                    "Description",
                    `${command.description || "*No description provided...*"}`
                );
                embed.addField(
                    "Usage",
                    `${
                    command.usage
                        ? `${config.prefix}${command.name} ${command.usage}`
                        : "*No Usage Provided...*"
                    }`
                );
                embed.addField(
                    "Accessibility",
                    `${command.accessableby || "Members"}`,
                    true
                );
                embed.addField(
                    "Aliases",
                    `${
                    command.aliases
                        ? command.aliases.join(", ")
                        : "*No Alias Provided...*"
                    }`,
                    true
                );

                return message.channel.send(embed);
            }
        } catch (e) {
            message.channel.send("Whoops, looks like that command is broken!");
            console.log(
                "New Error | " +
                clc.bold.underline.xterm(160)(`${module.exports.config.name}.js`)
            );
            fs.appendFileSync(
                "./logs/errorLog.md",
                `New Handler Error (HELP.JS):\n${
                (e, e.stack.split("\n\n"))
                }\nRecorded At: ${Date()}\n\n`
            );
        }
    },
};