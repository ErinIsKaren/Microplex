// Require Packages
const fs = require("fs");
const clc = require("cli-color");

module.exports = (bot) => {
  try {
    const load = (dirs) => {
      const events = fs
        .readdirSync(`./events/${dirs}/`)
        .filter((d) => d.endsWith(".js"));
      for (let file of events) {
        const evt = require(`../events/${dirs}/${file}`);
        let eName = file.split(".")[0];
        bot.on(eName, evt.bind(null, bot));
      }
    };
    ["client", "guild"].forEach((x) => load(x));
    console.log(`[ ${clc.green("OK")} ] Event Loaded...`);
  } catch (e) {
    // Loading Failed
    console.log(`[ ${clc.red("ERR")} ] Event Failed...`);
    fs.appendFileSync(
      "./logs/error.log",
      `New Event Error (EVENT.JS):\n${
        (e, e.stack.split("\n\n"))
      }\nRecorded At: ${Date()}\n\n`
    );
    process.exit();
  }
};