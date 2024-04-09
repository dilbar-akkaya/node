"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./src/functions/server");
/* const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!');
}); */
const server = (0, server_1.createServer)();
server.listen(8000, () => {
    console.log('Server is running on port 8000');
});
