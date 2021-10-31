const model_mongoose = require('mongoose');

//CREATE MODEL Employee means Employee Information
let BasicinfoModel = model_mongoose.model('Basicinfos', 
{
    studentname: { type: String },
    studentemail: { type: String },
    studentmobile: { type: String },
    studentdob: { type: String },
    studentgender: { type: String },
    studentgithub: { type: String },
    studentlinkedin: { type: String },
    studentprofilepic:{type:String},
    
	regdatetime: { type: Date, default: Date.now }
});

//EXPORT MODULE Employee using BINDING
module.exports = BasicinfoModel ;