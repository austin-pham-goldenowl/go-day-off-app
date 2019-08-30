const express = require('express');
const http = require('http');
const path = require('path');
let app = express();
app.use(express.static(path.join(__dirname, 'build')));
const port = process.env.PORT || '3000';
app.set('port', port);
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));