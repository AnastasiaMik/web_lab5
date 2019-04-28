const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let docsSchema =new Schema({
    title:  String,
    markup: String,

});


let Docs = mongoose.model("docs", docsSchema);

module.exports.Docs = Docs;

mongoose.connect(
    'mongodb://127.0.0.1:27017/docs',
    { useNewUrlParser: true}
).then(() => {
    Docs = mongoose.model('docs', new mongoose.Schema(docsSchema));
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("Successfully connected to DB");
});

