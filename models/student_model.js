// IMPORT MONGOOSE 
const model_mongoose = require('mongoose');

//CREATE MODEL Employee means Employee Information
let StudentModel = model_mongoose.model('students', 
{
    studentname: { type: String },
    studentemail: { type: String },
    studentmobile: { type: String },
    studentdepartment: { type: String },
    studentrollnumber: { type: String },
    studentregnumber: { type: String },
    studentsession: { type: String },
    studentpassword: { type: String },
	regdatetime: { type: Date, default: Date.now }
});

//EXPORT MODULE Employee using BINDING
module.exports = StudentModel ;
