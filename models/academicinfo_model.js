const model_mongoose = require('mongoose');

//CREATE MODEL Employee means Employee Information
let AcademicinfoModel = model_mongoose.model('Academicinfos', 
{
    studentname: { type: String },
    studentemail: { type: String },
    studentdepartment: {type: String},
    studentsession: { type: String },
    studentsecschoolname: { type: String },
    studentsecboardname: { type: String },
    studentsecpassingyear: { type: String },
    studentsecpercentage: { type: String },

    studenthsschoolname: { type: String },
    studenthsboardname: { type: String },
    studenthspassingyear: { type: String },
    studenthspercentage: { type: String },

    studentcolschoolname: { type: String },
    studentcolboardname: { type: String },
    studentcolpassingyear: { type: String },
    studentcolpercentage: { type: String },

    
	regdatetime: { type: Date, default: Date.now }
});

//EXPORT MODULE Employee using BINDING
module.exports = AcademicinfoModel ;