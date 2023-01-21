const express = require('express')
const puppeteer = require('puppeteer')
const replace = require('absolutify')
const path = require('path')
const app = express()

app.get('/', async (req, res) => {
    const {url} = req.query
    
    if (!url) {
        return res.sendFile(path.join(__dirname, '/one.html'));
    } else {
        // generate puppeteer screenshot 
        try {
          res.sendFile(path.join(__dirname, '/load.html'));
            // If headless Chrome is not launching on Debian, use the following line instead
            const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})
            const page = await browser.newPage()
            await page.goto(`https://${url}`)
            
            let document = await page.evaluate(() => document.documentElement.outerHTML)
            document = replace(document, `/?url=${url.split('/')[0]}`)
            
            return res.send(document)
        } catch(err) {
            console.log(err)
            return res.sendFile(path.join(__dirname, '/crash.html'));
        }
    }
})


app.listen(3000)
console.log('STARTED AND ENJOY')