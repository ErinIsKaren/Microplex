// Require Packages
const figlet = require("figlet");
const { readdirSync } = require("fs");
const config = require("../../config.json");
const color = require("../../colors.json");
const { RichEmbed } = require("discord.js");
const clc = require("cli-color");

module.exports = async (bot) => {
  try {
    // Variables
    const onlineDate = Date();

    // Sending Information (Terminal)
    figlet.text(
      `${bot.user.username}`,
      {
        font: "ANSI Shadow",
        horizontalLayout: "default",
        verticalLayout: "default",
      },
      function (err, data) {
        if (err) {
          console.log("Something went wrong...");
          console.dir(err);
          fs.appendFileSync(
            "/home/linuxlite/Documents/MicroPlex/logs/eventErrors.log",
            `\nNew error recorded at ${Date()}:\n${
              (err, err.stack.split("\n\n"))
            }\n`
          );
          return;
        }
        console.log(clc.blueBright(`\n${data}`));
        console.log(
          clc.xterm(7)(`Current Boot: ${onlineDate}\n`) +
            clc.underline.yellow("Notification Bay:\n")
        );
      }
    );
    console.log("[" + clc.green(" OK ") + "] Bot Loaded...");
  } catch (e) {
    console.log(`[ ${clc.red("ERR")} ] Bot Failed...`);
    fs.appendFileSync(
      "./logs/errorLog.md",
      `New Handler Error (READY.JS):\n${
        (e, e.stack.split("\n\n"))
      }\nRecorded At: ${Date()}\n\n`
    );
    process.exit();
  }
  bot.user.setPresence({ activity: {type: "PLAYING", name: 'on Repl.it\'s Servers' }, status: 'online' });
};