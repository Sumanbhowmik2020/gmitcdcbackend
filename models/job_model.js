const model_mongoose = require('mongoose');

//CREATE MODEL Employee means Employee Information
let JobinfoModel = model_mongoose.model('internships',
    {
        studentname: { type: String },
        studentemail: { type: String },
        studentcompany: { type: String },
        studentsession: { type: String },
        studentskillname: { type: String },
        studentdept: { type: String },
        studentdate: { type: String },
        
        studentprofilepic: { type: String },
        status: { type: String },

        regdatetime: { type: Date, default: Date.now }
    });

//EXPORT MODULE Employee using BINDING
module.exports = JobinfoModel;