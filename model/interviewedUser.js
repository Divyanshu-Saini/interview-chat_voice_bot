//importing mongoose
const mongoose = require('mongoose');

//initialising mongoose model
var Scheme = mongoose.Schema;
var interviewedUserSchema = new Scheme({
    uid:String,
    name:String,
    qualification:String,    
    score:Number,
    interview_cleared:Boolean
});

//exporting model
module.exports = mongoose.model('intervieweduser',interviewedUserSchema);