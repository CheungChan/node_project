const logger = require("./logger")
logger.log("Hello")
logger.log(logger.endPoint);
logger.log(logger);
const path = require("path");
const pathObj = path.parse(__filename);
logger.log(pathObj);
const os = require("os");
const freeMem = os.freemem();
const totalMem = os.totalmem();
logger.log(`freeMem: ${freeMem}`);
logger.log(`totalMem: ${totalMem}`);
const fs = require("fs")
const files = fs.readdirSync("./");
console.log(files);
fs.readdir("./", function (err, files) {
    if (err) { console.log("Error:", err); }
    else {
        console.log('Result:', files);
    }
});
const EventEmitter = require("events");
const emitter = new EventEmitter();
emitter.on("MessageLogged", (arg) => {
    console.log("Message called", arg);
});
emitter.emit("MessageLogged", { id: 1, url: 'http://' });
const log = new logger.Logger();
log.on("MessageLogged",(arg)=>{
    console.log("extend EventEmitter Message called", arg);
});
log.log("Hello");