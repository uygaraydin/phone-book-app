/* const express = require('express');
const path = require('path');
var app = require('http'); */

const express = require('express');
const app = express();
const router = express.Router();
const port = process.env.PORT || 4600;
const personel = require('./server/routes/personelRoute');
const http = require('http');


app.use('/personel', personel);


/* app.use(express.static(path.join(__dirname,'dist')));

app.use('/personel', personel); */

/* app.get('*',(req, res) => {
    res.sendFile(path.join(__dirname,'dist/index.html'));
}); */


const server = http.createServer(app);

server.listen(port);


module.exports = app;
