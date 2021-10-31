const model_mongoose = require('mongoose');

//CREATE MODEL Employee means Employee Information
let PlacementinfoModel = model_mongoose.model('Placements',
    {
        studentname: { type: String },
        studentemail:{ type: String },
        studentcompany: { type: String },
        studentsalary: { type: String },
        studentpassout: { type: String },
        studedentdept: { type: String },
        studentdate: { type: String },
        studentprofilepic: { type: String },
        status: { type: String },

        regdatetime: { type: Date, default: Date.now }
    });

//EXPORT MODULE Employee using BINDING
module.exports = PlacementinfoModel;