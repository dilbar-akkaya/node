import http from 'http'; 
import { createServer } from './src/functions/server';

/* const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!');
}); */
const server = createServer();
server.listen(8000, () => {
  console.log('Server is running on port 8000');
});