const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/shortUrl")

const schema = mongoose.Schema;

const urlSchema = new schema({
    oriUrl:{type:String},
    shortUrl:{type:String}
})

const url = mongoose.model("url", urlSchema);

module.exports = url