const os = require("os");
const { readdirSync } = require("fs");
const clc = require("cli-color");
const { token } = require("../config.json");

// Console Commands
module.exports = (bot) => {
    try {
        let prompt = process.openStdin();
        prompt.addListener("data", (res) => {
            let x = res.toString().trim();
            bot.channels.cache.get('767493765132320789').send(`Someone typed **${x}** into the console!`);
        });
        console.log(`[ ${clc.green("OK")} ] Console Loaded...`);
    } catch (e) {
        // Loading Failed
        console.log(`[ ${clc.red("ERR")} ] Console Failed...`);
        fs.appendFileSync(
            "./logs/errorLog.md",
            `New Handler Error (CONSOLE.JS):\n${
            (e, e.stack.split("\n\n"))
            }\nRecorded At: ${Date()}\n\n`
        );
        process.exit();
    }
};