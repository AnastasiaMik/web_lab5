var mongoose = require("mongoose");

mongoose.connect(
    'mongodb://127.0.0.1:27017/docs',
     { useNewUrlParser: true}
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("Successfully connected to DB");
});

var mongoose = require("mongoose");

var docsSchema = new mongoose.Schema({
    title: String,
    markup: String
});

var Docs = mongoose.model("Docs", docsSchema);

module.exports.Docs = Docs;

