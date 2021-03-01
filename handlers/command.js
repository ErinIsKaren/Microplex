// Required Packages
const fs = require("fs");
const clc = require("cli-color");

// Find Command Dirs
module.exports = (bot) => {
  try {
    const load = (dirs) => {
      const commands = fs
        .readdirSync(`./commands/${dirs}/`)
        .filter((d) => d.endsWith(".js"));
      for (let file of commands) {
        let pull = require(`../commands/${dirs}/${file}`);
        bot.commands.set(pull.config.name, pull);
        if (pull.config.aliases)
          pull.config.aliases.forEach((a) =>
            bot.aliases.set(a, pull.config.name)
          );
      }
    };
    ["information", "fun", "community"].forEach((x) => load(x));
    console.log(`[ ${clc.green("OK")} ] Command Loaded...`);
  } catch (e) {
    // Loading Failed
    console.log(`[ ${clc.red("ERR")} ] Command Failed...`);
    fs.appendFileSync(
      "./logs/error.log",
      `New Handler Error (COMMAND.JS):\n${
        (e, e.stack.split("\n\n"))
      }\nRecorded At: ${Date()}\n\n`
    );
    process.exit();
  }
};