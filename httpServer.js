const http = require("http");
const server = http.createServer((req, resp) => {
    if (req.url === '/') {
        resp.write("Hello World");
        resp.end();
    }
    if (req.url == '/api/cources/') {
        resp.write(JSON.stringify([1, 2, 3]));
        resp.end();
    }
});
server.on("connection", (socket) => {
    console.log("connected...");
})
server.listen(3000);
console.log("Listening on the port 3000 ...");