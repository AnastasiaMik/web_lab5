const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let messageSchema =new Schema({
    text:  String,
    user: String,

});

let message = mongoose.model("Message", messageSchema);

module.exports = message;

let Docs;

mongoose.connect(
    'mongodb://localhost:27017/docs',
    { useNewUrlParser: true}
).then(() => {
    Docs = mongoose.model('docs', new mongoose.Schema(messageSchema));
});
