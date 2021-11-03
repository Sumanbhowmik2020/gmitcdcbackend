const model_mongoose = require('mongoose');

//CREATE MODEL Employee means Employee Information
let SkillinfoModel = model_mongoose.model('Skillinfos', 
{
    studentname: { type: String },
    studentemail: { type: String },
    studentdepartment: {type: String},
    studentsession: { type: String },
    studentskillname: { type: String },
    studentorganization: { type: String },
    stdentprojectname: { type: String },
    studentprojecturl: { type: String },

    studentprojectnote: { type: String },
    status: { type: String },
 

    
	regdatetime: { type: Date, default: Date.now }
});

//EXPORT MODULE Employee using BINDING
module.exports = SkillinfoModel ;