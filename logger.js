var url = 'http://www.baidu.com';
function log(message) {
    console.log(message);
}

const EventEmitter = require("events");
class Logger extends EventEmitter {
    log(message) {
        console.log(message);
        this.emit("MessageLogged", message);
    }
}
module.exports.log = log;
module.exports.endPoint = url;
module.exports.Logger = Logger;