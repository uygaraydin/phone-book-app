/* const express = require('express');
const path = require('path');
var app = require('http'); */

const express = require('express');
const app = express();
const router = express.Router();
const port = process.env.PORT || 4600;
const personel = require('./server/routes/personelRoute');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/personel', personel);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});


/* app.use(express.static(path.join(__dirname,'dist')));

app.use('/personel', personel); */

/* app.get('*',(req, res) => {
    res.sendFile(path.join(__dirname,'dist/index.html'));
}); */


const server = http.createServer(app);

server.listen(port);


module.exports = app;
