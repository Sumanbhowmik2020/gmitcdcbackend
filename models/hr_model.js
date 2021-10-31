// IMPORT MONGOOSE 
const model_mongoose = require('mongoose');

//CREATE MODEL Employee means Employee Information
let HrModel = model_mongoose.model('hrs', 
{
    hrname: { type: String },
    hremail: { type: String },
    hrmobile: { type: String },
    hrprofilepic: { type: String },
    hrcompany: { type: String },
   
    hrpassword: { type: String },
	regdatetime: { type: Date, default: Date.now }
});

//EXPORT MODULE Employee using BINDING
module.exports = HrModel ;
