const express = require('express')
const puppeteer = require('puppeteer')
const replace = require('absolutify')

const app = express()

app.get('/', async (req, res) => {
    const { url } = req.query

    if (!url) {
        return res.send(`<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
        <h1>This is backend . pls open a frontent :- <a href='https://pawitsahare-demo.vercel.app'>Click here to redirect frontent</a>  </h1>
        <h3>This build by pawitsahare full name pawitanandsahare from nagpur/lashkaribagh/5polipolicestation/Maharashtra/India/Asia
        <h4>https://github.com/0-ab</h4>
        <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar" style="width: 25%">25%</div>
      </div>`)
    } else {
        // generate puppeteer screenshot 
        try {
            // If headless Chrome is not launching on Debian, use the following line instead

            res.send(`
            <html>
            <body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>

            <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span > </body><html/>
  </div>
</div>
            `)
            const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })

            const page = await browser.newPage()
            
            await page.goto(`https://${url}`)

            let document = await page.evaluate(() => document.documentElement.outerHTML)
            document = replace(document, `/?url=${url.split('/')[0]}`)

            return res.send(document)
        } catch (err) {
            console.log(err)

            return res.send(`<html>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
            <h1>Something wrong too many request try agian or Open a your inspect console tab too see logs<h1/>
            <h2>Try agin with going to frontent :<a href='https://pawitsahare-demo.vercel.app'>Click here to redirect frontent</a>  
            </html>`)
        }
    }
})


app.listen()