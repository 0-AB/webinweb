const express = require('express');
const path = require('path');
const app = express();
    
app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '/one.html'));
      });

        // generate puppeteer screenshot 


app.listen(3000)
console.log('ENJOY!')