const express = require("express")
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/shortUrl")
const urlDatabase = require("./models/urlSchema")
const bodyParser = require("body-parser")
var validUrl = require('valid-url');
var shortUrl = require("node-url-shortener");

const app = express()
app.use(bodyParser())

app.get("/", (req, res) => {
    res.send("Hello from short url")
})

app.post("/url", async (req, res) => {
    let oriUrl = req.body.oriUrl;
    console.log(oriUrl)
    if (validUrl.isUri(oriUrl)) {
        shortUrl.short(oriUrl, async function (err, url) {
            if (url) {
                console.log(url);
                let data = await urlDatabase.create({
                    oriUrl: oriUrl,
                    shortUrl: url
                })
                res.status(200).json({
                    status: "Success",
                    data
                })
            }
            else{
                res.status(400).json({
                    status: "Failed",
                    message: err.message
                })
            }

        });
    } else {
        res.status(400).json({
            status: "Failed",
            message: "Not a valid URL"
        })
    }

})

app.listen(8080, () => {
    console.log("Server up at port 8080")
})