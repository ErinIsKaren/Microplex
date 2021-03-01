const express = require('express');
const server = express();

server.use(express.static(__dirname + '/public'));

function keepAlive(){
    server.listen(3000, ()=>{console.log("https://uptimerobot.com/ > Monitor Activated")});
}
module.exports = keepAlive;