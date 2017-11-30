//importing mongoose
const mongoose = require('mongoose');

//initialising mongoose model
var Scheme = mongoose.Schema;
var aptiQASchema = new Scheme({
    qid:String,
    question:String,
    ans1:String,
    ans2:String,
    ans3:String,
    c_ans:String
});

//exporting model
module.exports = mongoose.model('aptiqa',aptiQASchema);