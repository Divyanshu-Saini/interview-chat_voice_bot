//importing mongoose
const mongoose = require('mongoose');

//initialising mongoose model
var Scheme = mongoose.Schema;
var interQASchema = new Scheme({
    qid:String,
    question:String,
    ans:String
});

//exporting model
module.exports = mongoose.model('interqa',interQASchema);